(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();function _b(n){let e={...n};const t=new Set;function r(){return e}function s(o){const c=typeof o=="function"?o(e):o;c&&(e={...e,...c},t.forEach(u=>u(e)))}function i(o){return t.add(o),()=>t.delete(o)}return{get:r,set:s,subscribe:i}}const j=_b({ready:!1,authError:null,user:null,profile:null,permissions:[],team:[],theme:"light",mock:!1,detailLeadId:null}),_m="altorra-crm-theme";function vb(){let n=localStorage.getItem(_m);n!=="light"&&n!=="dark"&&(n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),document.documentElement.dataset.theme=n,j.set({theme:n})}function yb(){const n=document.documentElement.dataset.theme==="dark"?"light":"dark";return document.documentElement.dataset.theme=n,localStorage.setItem(_m,n),j.set({theme:n}),n}var Uh={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vm=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},bb=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],o=n[t++],c=n[t++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],o=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},du={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],o=s+1<n.length,c=o?n[s+1]:0,u=s+2<n.length,d=u?n[s+2]:0,f=i>>2,p=(i&3)<<4|c>>4;let g=(c&15)<<2|d>>6,_=d&63;u||(_=64,o||(g=64)),r.push(t[f],t[p],t[g],t[_])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(vm(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):bb(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const d=s<n.length?t[n.charAt(s)]:64;++s;const p=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||d==null||p==null)throw new wb;const g=i<<2|c>>4;if(r.push(g),d!==64){const _=c<<4&240|d>>2;if(r.push(_),p!==64){const I=d<<6&192|p;r.push(I)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class wb extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Ib=function(n){const e=vm(n);return du.encodeByteArray(e,!0)},ua=function(n){return Ib(n).replace(/\./g,"")},ym=function(n){try{return du.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function bm(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Eb=()=>bm().__FIREBASE_DEFAULTS__,Tb=()=>{if(typeof process>"u"||typeof Uh>"u")return;const n=Uh.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Ab=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&ym(n[1]);return e&&JSON.parse(e)},Ha=()=>{try{return Eb()||Tb()||Ab()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},wm=n=>{var e,t;return(t=(e=Ha())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Im=n=>{const e=wm(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Em=()=>{var n;return(n=Ha())===null||n===void 0?void 0:n.config},Tm=n=>{var e;return(e=Ha())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */function Sb(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},n);return[ua(JSON.stringify(t)),ua(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function He(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Rb(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(He())}function kb(){var n;const e=(n=Ha())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Cb(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Pb(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function xb(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Nb(){const n=He();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Am(){return!kb()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Ka(){try{return typeof indexedDB=="object"}catch{return!1}}function Db(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vb="FirebaseError";class Ft extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Vb,Object.setPrototypeOf(this,Ft.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,xs.prototype.create)}}class xs{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?Ob(i,r):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new Ft(s,c,r)}}function Ob(n,e){return n.replace(Lb,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Lb=/\{\$([^}]+)}/g;function Mb(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Ii(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],o=e[s];if(Bh(i)&&Bh(o)){if(!Ii(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Bh(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gi(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function si(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function ii(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Fb(n,e){const t=new Ub(n,e);return t.subscribe.bind(t)}class Ub{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Bb(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Yc),s.error===void 0&&(s.error=Yc),s.complete===void 0&&(s.complete=Yc);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Bb(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Yc(){}/**
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
 */const $b=1e3,qb=2,jb=4*60*60*1e3,zb=.5;function Gb(n,e=$b,t=qb){const r=e*Math.pow(t,n),s=Math.round(zb*r*(Math.random()-.5)*2);return Math.min(jb,r+s)}/**
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
 */function Te(n){return n&&n._delegate?n._delegate:n}class Ot{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const tr="[DEFAULT]";/**
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
 */class Hb{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new wi;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e?.identifier),s=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Wb(e))try{this.getOrInitializeService({instanceIdentifier:tr})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=tr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=tr){return this.instances.has(e)}getOptions(e=tr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&o.resolve(s)}return s}onInit(e,t){var r;const s=this.normalizeInstanceIdentifier(t),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Kb(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=tr){return this.component?this.component.multipleInstances?e:tr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Kb(n){return n===tr?void 0:n}function Wb(n){return n.instantiationMode==="EAGER"}/**
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
 */class Qb{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Hb(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ge;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ge||(ge={}));const Yb={debug:ge.DEBUG,verbose:ge.VERBOSE,info:ge.INFO,warn:ge.WARN,error:ge.ERROR,silent:ge.SILENT},Jb=ge.INFO,Xb={[ge.DEBUG]:"log",[ge.VERBOSE]:"log",[ge.INFO]:"info",[ge.WARN]:"warn",[ge.ERROR]:"error"},Zb=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=Xb[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Wa{constructor(e){this.name=e,this._logLevel=Jb,this._logHandler=Zb,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ge))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Yb[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ge.DEBUG,...e),this._logHandler(this,ge.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ge.VERBOSE,...e),this._logHandler(this,ge.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ge.INFO,...e),this._logHandler(this,ge.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ge.WARN,...e),this._logHandler(this,ge.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ge.ERROR,...e),this._logHandler(this,ge.ERROR,...e)}}const ew=(n,e)=>e.some(t=>n instanceof t);let $h,qh;function tw(){return $h||($h=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function nw(){return qh||(qh=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Sm=new WeakMap,vl=new WeakMap,Rm=new WeakMap,Jc=new WeakMap,hu=new WeakMap;function rw(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",o)},i=()=>{t(Cn(n.result)),s()},o=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Sm.set(t,n)}).catch(()=>{}),hu.set(e,n),e}function sw(n){if(vl.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",o),n.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",o),n.addEventListener("abort",o)});vl.set(n,e)}let yl={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return vl.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Rm.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Cn(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function iw(n){yl=n(yl)}function ow(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Xc(this),e,...t);return Rm.set(r,e.sort?e.sort():[e]),Cn(r)}:nw().includes(n)?function(...e){return n.apply(Xc(this),e),Cn(Sm.get(this))}:function(...e){return Cn(n.apply(Xc(this),e))}}function aw(n){return typeof n=="function"?ow(n):(n instanceof IDBTransaction&&sw(n),ew(n,tw())?new Proxy(n,yl):n)}function Cn(n){if(n instanceof IDBRequest)return rw(n);if(Jc.has(n))return Jc.get(n);const e=aw(n);return e!==n&&(Jc.set(n,e),hu.set(e,n)),e}const Xc=n=>hu.get(n);function cw(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(n,e),c=Cn(o);return r&&o.addEventListener("upgradeneeded",u=>{r(Cn(o.result),u.oldVersion,u.newVersion,Cn(o.transaction),u)}),t&&o.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const lw=["get","getKey","getAll","getAllKeys","count"],uw=["put","add","delete","clear"],Zc=new Map;function jh(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Zc.get(e))return Zc.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=uw.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||lw.includes(t)))return;const i=async function(o,...c){const u=this.transaction(o,s?"readwrite":"readonly");let d=u.store;return r&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),s&&u.done]))[0]};return Zc.set(e,i),i}iw(n=>({...n,get:(e,t,r)=>jh(e,t)||n.get(e,t,r),has:(e,t)=>!!jh(e,t)||n.has(e,t)}));/**
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
 */class dw{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(hw(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function hw(n){const e=n.getComponent();return e?.type==="VERSION"}const bl="@firebase/app",zh="0.11.0";/**
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
 */const an=new Wa("@firebase/app"),fw="@firebase/app-compat",pw="@firebase/analytics-compat",mw="@firebase/analytics",gw="@firebase/app-check-compat",_w="@firebase/app-check",vw="@firebase/auth",yw="@firebase/auth-compat",bw="@firebase/database",ww="@firebase/data-connect",Iw="@firebase/database-compat",Ew="@firebase/functions",Tw="@firebase/functions-compat",Aw="@firebase/installations",Sw="@firebase/installations-compat",Rw="@firebase/messaging",kw="@firebase/messaging-compat",Cw="@firebase/performance",Pw="@firebase/performance-compat",xw="@firebase/remote-config",Nw="@firebase/remote-config-compat",Dw="@firebase/storage",Vw="@firebase/storage-compat",Ow="@firebase/firestore",Lw="@firebase/vertexai",Mw="@firebase/firestore-compat",Fw="firebase",Uw="11.3.0";/**
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
 */const wl="[DEFAULT]",Bw={[bl]:"fire-core",[fw]:"fire-core-compat",[mw]:"fire-analytics",[pw]:"fire-analytics-compat",[_w]:"fire-app-check",[gw]:"fire-app-check-compat",[vw]:"fire-auth",[yw]:"fire-auth-compat",[bw]:"fire-rtdb",[ww]:"fire-data-connect",[Iw]:"fire-rtdb-compat",[Ew]:"fire-fn",[Tw]:"fire-fn-compat",[Aw]:"fire-iid",[Sw]:"fire-iid-compat",[Rw]:"fire-fcm",[kw]:"fire-fcm-compat",[Cw]:"fire-perf",[Pw]:"fire-perf-compat",[xw]:"fire-rc",[Nw]:"fire-rc-compat",[Dw]:"fire-gcs",[Vw]:"fire-gcs-compat",[Ow]:"fire-fst",[Mw]:"fire-fst-compat",[Lw]:"fire-vertex","fire-js":"fire-js",[Fw]:"fire-js-all"};/**
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
 */const da=new Map,$w=new Map,Il=new Map;function Gh(n,e){try{n.container.addComponent(e)}catch(t){an.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Qt(n){const e=n.name;if(Il.has(e))return an.debug(`There were multiple attempts to register component ${e}.`),!1;Il.set(e,n);for(const t of da.values())Gh(t,n);for(const t of $w.values())Gh(t,n);return!0}function xr(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function It(n){return n==null?!1:n.settings!==void 0}/**
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
 */const qw={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Pn=new xs("app","Firebase",qw);/**
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
 */class jw{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Ot("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Pn.create("app-deleted",{appName:this._name})}}/**
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
 */const Nr=Uw;function km(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:wl,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw Pn.create("bad-app-name",{appName:String(s)});if(t||(t=Em()),!t)throw Pn.create("no-options");const i=da.get(s);if(i){if(Ii(t,i.options)&&Ii(r,i.config))return i;throw Pn.create("duplicate-app",{appName:s})}const o=new Qb(s);for(const u of Il.values())o.addComponent(u);const c=new jw(t,r,o);return da.set(s,c),c}function Qa(n=wl){const e=da.get(n);if(!e&&n===wl&&Em())return km();if(!e)throw Pn.create("no-app",{appName:n});return e}function At(n,e,t){var r;let s=(r=Bw[n])!==null&&r!==void 0?r:n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const c=[`Unable to register library "${s}" with version "${e}":`];i&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&c.push("and"),o&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),an.warn(c.join(" "));return}Qt(new Ot(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const zw="firebase-heartbeat-database",Gw=1,Ei="firebase-heartbeat-store";let el=null;function Cm(){return el||(el=cw(zw,Gw,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Ei)}catch(t){console.warn(t)}}}}).catch(n=>{throw Pn.create("idb-open",{originalErrorMessage:n.message})})),el}async function Hw(n){try{const t=(await Cm()).transaction(Ei),r=await t.objectStore(Ei).get(Pm(n));return await t.done,r}catch(e){if(e instanceof Ft)an.warn(e.message);else{const t=Pn.create("idb-get",{originalErrorMessage:e?.message});an.warn(t.message)}}}async function Hh(n,e){try{const r=(await Cm()).transaction(Ei,"readwrite");await r.objectStore(Ei).put(e,Pm(n)),await r.done}catch(t){if(t instanceof Ft)an.warn(t.message);else{const r=Pn.create("idb-set",{originalErrorMessage:t?.message});an.warn(r.message)}}}function Pm(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Kw=1024,Ww=30;class Qw{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Jw(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Kh();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>Ww){const o=Xw(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){an.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Kh(),{heartbeatsToSend:r,unsentEntries:s}=Yw(this._heartbeatsCache.heartbeats),i=ua(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return an.warn(t),""}}}function Kh(){return new Date().toISOString().substring(0,10)}function Yw(n,e=Kw){const t=[];let r=n.slice();for(const s of n){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),Wh(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Wh(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Jw{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ka()?Db().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Hw(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Hh(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Hh(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Wh(n){return ua(JSON.stringify({version:2,heartbeats:n})).length}function Xw(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
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
 */function Zw(n){Qt(new Ot("platform-logger",e=>new dw(e),"PRIVATE")),Qt(new Ot("heartbeat",e=>new Qw(e),"PRIVATE")),At(bl,zh,n),At(bl,zh,"esm2017"),At("fire-js","")}Zw("");function fu(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(t[r[s]]=n[r[s]]);return t}function xm(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const eI=xm,Nm=new xs("auth","Firebase",xm());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ha=new Wa("@firebase/auth");function tI(n,...e){ha.logLevel<=ge.WARN&&ha.warn(`Auth (${Nr}): ${n}`,...e)}function zo(n,...e){ha.logLevel<=ge.ERROR&&ha.error(`Auth (${Nr}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lt(n,...e){throw pu(n,...e)}function Ht(n,...e){return pu(n,...e)}function Dm(n,e,t){const r=Object.assign(Object.assign({},eI()),{[e]:t});return new xs("auth","Firebase",r).create(e,{appName:n.name})}function xn(n){return Dm(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function pu(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Nm.create(n,...e)}function ae(n,e,...t){if(!n)throw pu(e,...t)}function nn(n){const e="INTERNAL ASSERTION FAILED: "+n;throw zo(e),new Error(e)}function cn(n,e){n||nn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function El(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function nI(){return Qh()==="http:"||Qh()==="https:"}function Qh(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rI(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(nI()||Pb()||"connection"in navigator)?navigator.onLine:!0}function sI(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hi{constructor(e,t){this.shortDelay=e,this.longDelay=t,cn(t>e,"Short delay should be less than long delay!"),this.isMobile=Rb()||xb()}get(){return rI()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mu(n,e){cn(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vm{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;nn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;nn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;nn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iI={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oI=new Hi(3e4,6e4);function Dr(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function $n(n,e,t,r,s={}){return Om(n,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const c=Gi(Object.assign({key:n.config.apiKey},o)).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const d=Object.assign({method:e,headers:u},i);return Cb()||(d.referrerPolicy="no-referrer"),Vm.fetch()(Lm(n,n.config.apiHost,t,c),d)})}async function Om(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},iI),e);try{const s=new cI(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw Ao(n,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[u,d]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ao(n,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw Ao(n,"email-already-in-use",o);if(u==="USER_DISABLED")throw Ao(n,"user-disabled",o);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Dm(n,f,d);Lt(n,f)}}catch(s){if(s instanceof Ft)throw s;Lt(n,"network-request-failed",{message:String(s)})}}async function Ya(n,e,t,r,s={}){const i=await $n(n,e,t,r,s);return"mfaPendingCredential"in i&&Lt(n,"multi-factor-auth-required",{_serverResponse:i}),i}function Lm(n,e,t,r){const s=`${e}${t}?${r}`;return n.config.emulator?mu(n.config,s):`${n.config.apiScheme}://${s}`}function aI(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class cI{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Ht(this.auth,"network-request-failed")),oI.get())})}}function Ao(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=Ht(n,e,r);return s.customData._tokenResponse=t,s}function Yh(n){return n!==void 0&&n.enterprise!==void 0}class lI{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return aI(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function uI(n,e){return $n(n,"GET","/v2/recaptchaConfig",Dr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dI(n,e){return $n(n,"POST","/v1/accounts:delete",e)}async function Mm(n,e){return $n(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function di(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function hI(n,e=!1){const t=Te(n),r=await t.getIdToken(e),s=gu(r);ae(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i?.sign_in_provider;return{claims:s,token:r,authTime:di(tl(s.auth_time)),issuedAtTime:di(tl(s.iat)),expirationTime:di(tl(s.exp)),signInProvider:o||null,signInSecondFactor:i?.sign_in_second_factor||null}}function tl(n){return Number(n)*1e3}function gu(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return zo("JWT malformed, contained fewer than 3 sections"),null;try{const s=ym(t);return s?JSON.parse(s):(zo("Failed to decode base64 JWT payload"),null)}catch(s){return zo("Caught error parsing JWT payload as JSON",s?.toString()),null}}function Jh(n){const e=gu(n);return ae(e,"internal-error"),ae(typeof e.exp<"u","internal-error"),ae(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ti(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Ft&&fI(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function fI({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pI{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */async function fa(n){var e;const t=n.auth,r=await n.getIdToken(),s=await Ti(n,Mm(t,{idToken:r}));ae(s?.users.length,t,"internal-error");const i=s.users[0];n._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?Fm(i.providerUserInfo):[],c=gI(n.providerData,o),u=n.isAnonymous,d=!(n.email&&i.passwordHash)&&!c?.length,f=u?d:!1,p={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:c,metadata:new Tl(i.createdAt,i.lastLoginAt),isAnonymous:f};Object.assign(n,p)}async function mI(n){const e=Te(n);await fa(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function gI(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Fm(n){return n.map(e=>{var{providerId:t}=e,r=fu(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _I(n,e){const t=await Om(n,{},async()=>{const r=Gi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,o=Lm(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",Vm.fetch()(o,{method:"POST",headers:c,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function vI(n,e){return $n(n,"POST","/v2/accounts:revokeToken",Dr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ss{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){ae(e.idToken,"internal-error"),ae(typeof e.idToken<"u","internal-error"),ae(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Jh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){ae(e.length!==0,"internal-error");const t=Jh(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(ae(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await _I(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,o=new ss;return r&&(ae(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(ae(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(ae(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ss,this.toJSON())}_performRefresh(){return nn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _n(n,e){ae(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class rn{constructor(e){var{uid:t,auth:r,stsTokenManager:s}=e,i=fu(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new pI(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Tl(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await Ti(this,this.stsTokenManager.getToken(this.auth,e));return ae(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return hI(this,e)}reload(){return mI(this)}_assign(e){this!==e&&(ae(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new rn(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){ae(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await fa(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(It(this.auth.app))return Promise.reject(xn(this.auth));const e=await this.getIdToken();return await Ti(this,dI(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,s,i,o,c,u,d,f;const p=(r=t.displayName)!==null&&r!==void 0?r:void 0,g=(s=t.email)!==null&&s!==void 0?s:void 0,_=(i=t.phoneNumber)!==null&&i!==void 0?i:void 0,I=(o=t.photoURL)!==null&&o!==void 0?o:void 0,S=(c=t.tenantId)!==null&&c!==void 0?c:void 0,A=(u=t._redirectEventId)!==null&&u!==void 0?u:void 0,V=(d=t.createdAt)!==null&&d!==void 0?d:void 0,k=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:P,emailVerified:L,isAnonymous:C,providerData:M,stsTokenManager:E}=t;ae(P&&E,e,"internal-error");const v=ss.fromJSON(this.name,E);ae(typeof P=="string",e,"internal-error"),_n(p,e.name),_n(g,e.name),ae(typeof L=="boolean",e,"internal-error"),ae(typeof C=="boolean",e,"internal-error"),_n(_,e.name),_n(I,e.name),_n(S,e.name),_n(A,e.name),_n(V,e.name),_n(k,e.name);const b=new rn({uid:P,auth:e,email:g,emailVerified:L,displayName:p,isAnonymous:C,photoURL:I,phoneNumber:_,tenantId:S,stsTokenManager:v,createdAt:V,lastLoginAt:k});return M&&Array.isArray(M)&&(b.providerData=M.map(R=>Object.assign({},R))),A&&(b._redirectEventId=A),b}static async _fromIdTokenResponse(e,t,r=!1){const s=new ss;s.updateFromServerResponse(t);const i=new rn({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await fa(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];ae(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Fm(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!i?.length,c=new ss;c.updateFromIdToken(r);const u=new rn({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Tl(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(u,d),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xh=new Map;function sn(n){cn(n instanceof Function,"Expected a class definition");let e=Xh.get(n);return e?(cn(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Xh.set(n,e),e)}/**
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
 */class Um{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Um.type="NONE";const Zh=Um;/**
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
 */function Go(n,e,t){return`firebase:${n}:${e}:${t}`}class is{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Go(this.userKey,s.apiKey,i),this.fullPersistenceKey=Go("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?rn._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new is(sn(Zh),e,r);const s=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let i=s[0]||sn(Zh);const o=Go(r,e.config.apiKey,e.name);let c=null;for(const d of t)try{const f=await d._get(o);if(f){const p=rn._fromJSON(e,f);d!==i&&(c=p),i=d;break}}catch{}const u=s.filter(d=>d._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new is(i,e,r):(i=u[0],c&&await i._set(o,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==i)try{await d._remove(o)}catch{}})),new is(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ef(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(jm(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Bm(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Gm(e))return"Blackberry";if(Hm(e))return"Webos";if($m(e))return"Safari";if((e.includes("chrome/")||qm(e))&&!e.includes("edge/"))return"Chrome";if(zm(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function Bm(n=He()){return/firefox\//i.test(n)}function $m(n=He()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function qm(n=He()){return/crios\//i.test(n)}function jm(n=He()){return/iemobile/i.test(n)}function zm(n=He()){return/android/i.test(n)}function Gm(n=He()){return/blackberry/i.test(n)}function Hm(n=He()){return/webos/i.test(n)}function _u(n=He()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function yI(n=He()){var e;return _u(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function bI(){return Nb()&&document.documentMode===10}function Km(n=He()){return _u(n)||zm(n)||Hm(n)||Gm(n)||/windows phone/i.test(n)||jm(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wm(n,e=[]){let t;switch(n){case"Browser":t=ef(He());break;case"Worker":t=`${ef(He())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Nr}/${r}`}/**
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
 */class wI{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((o,c)=>{try{const u=e(i);o(u)}catch(u){c(u)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
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
 */async function II(n,e={}){return $n(n,"GET","/v2/passwordPolicy",Dr(n,e))}/**
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
 */const EI=6;class TI{constructor(e){var t,r,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:EI,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,s,i,o,c;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(t=u.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(s=u.containsLowercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(i=u.containsUppercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(o=u.containsNumericCharacter)!==null&&o!==void 0?o:!0),u.isValid&&(u.isValid=(c=u.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),u}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AI{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new tf(this),this.idTokenSubscription=new tf(this),this.beforeStateQueue=new wI(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Nm,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=sn(t)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await is.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Mm(this,{idToken:e}),r=await rn._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(It(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=s?._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===c)&&u?.user&&(s=u.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return ae(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await fa(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=sI()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(It(this.app))return Promise.reject(xn(this));const t=e?Te(e):null;return t&&ae(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&ae(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return It(this.app)?Promise.reject(xn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return It(this.app)?Promise.reject(xn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(sn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await II(this),t=new TI(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new xs("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await vI(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&sn(e)||this._popupRedirectResolver;ae(t,this,"argument-error"),this.redirectPersistenceManager=await is.create(this,[sn(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(ae(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{o=!0,u()}}else{const u=e.addObserver(t);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return ae(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Wm(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;if(It(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&tI(`Error while retrieving App Check token: ${t.error}`),t?.token}}function Ns(n){return Te(n)}class tf{constructor(e){this.auth=e,this.observer=null,this.addObserver=Fb(t=>this.observer=t)}get next(){return ae(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ja={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function SI(n){Ja=n}function Qm(n){return Ja.loadJS(n)}function RI(){return Ja.recaptchaEnterpriseScript}function kI(){return Ja.gapiScript}function CI(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class PI{constructor(){this.enterprise=new xI}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class xI{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const NI="recaptcha-enterprise",Ym="NO_RECAPTCHA";class DI{constructor(e){this.type=NI,this.auth=Ns(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,c)=>{uI(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const d=new lI(u);return i.tenantId==null?i._agentRecaptchaConfig=d:i._tenantRecaptchaConfigs[i.tenantId]=d,o(d.siteKey)}}).catch(u=>{c(u)})})}function s(i,o,c){const u=window.grecaptcha;Yh(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(d=>{o(d)}).catch(()=>{o(Ym)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new PI().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{r(this.auth).then(c=>{if(!t&&Yh(window.grecaptcha))s(c,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=RI();u.length!==0&&(u+=c),Qm(u).then(()=>{s(c,i,o)}).catch(d=>{o(d)})}}).catch(c=>{o(c)})})}}async function nf(n,e,t,r=!1,s=!1){const i=new DI(n);let o;if(s)o=Ym;else try{o=await i.verify(t)}catch{o=await i.verify(t,!0)}const c=Object.assign({},e);if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const u=c.phoneEnrollmentInfo.phoneNumber,d=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:d,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function rf(n,e,t,r,s){var i;if(!((i=n._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await nf(n,e,t,t==="getOobCode");return r(n,o)}else return r(n,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await nf(n,e,t,t==="getOobCode");return r(n,c)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function VI(n,e){const t=xr(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(Ii(i,e??{}))return s;Lt(s,"already-initialized")}return t.initialize({options:e})}function OI(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(sn);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function LI(n,e,t){const r=Ns(n);ae(r._canInitEmulator,r,"emulator-config-failed"),ae(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Jm(e),{host:o,port:c}=MI(e),u=c===null?"":`:${c}`;r.config.emulator={url:`${i}//${o}${u}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),FI()}function Jm(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function MI(n){const e=Jm(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:sf(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:sf(o)}}}function sf(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function FI(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vu{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return nn("not implemented")}_getIdTokenResponse(e){return nn("not implemented")}_linkToIdToken(e,t){return nn("not implemented")}_getReauthenticationResolver(e){return nn("not implemented")}}async function UI(n,e){return $n(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function BI(n,e){return Ya(n,"POST","/v1/accounts:signInWithPassword",Dr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $I(n,e){return Ya(n,"POST","/v1/accounts:signInWithEmailLink",Dr(n,e))}async function qI(n,e){return Ya(n,"POST","/v1/accounts:signInWithEmailLink",Dr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ai extends vu{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new Ai(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new Ai(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return rf(e,t,"signInWithPassword",BI);case"emailLink":return $I(e,{email:this._email,oobCode:this._password});default:Lt(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return rf(e,r,"signUpPassword",UI);case"emailLink":return qI(e,{idToken:t,email:this._email,oobCode:this._password});default:Lt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function os(n,e){return Ya(n,"POST","/v1/accounts:signInWithIdp",Dr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jI="http://localhost";class yr extends vu{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new yr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Lt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=t,i=fu(t,["providerId","signInMethod"]);if(!r||!s)return null;const o=new yr(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return os(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,os(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,os(e,t)}buildRequest(){const e={requestUri:jI,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Gi(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zI(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function GI(n){const e=si(ii(n)).link,t=e?si(ii(e)).deep_link_id:null,r=si(ii(n)).deep_link_id;return(r?si(ii(r)).link:null)||r||t||e||n}class yu{constructor(e){var t,r,s,i,o,c;const u=si(ii(e)),d=(t=u.apiKey)!==null&&t!==void 0?t:null,f=(r=u.oobCode)!==null&&r!==void 0?r:null,p=zI((s=u.mode)!==null&&s!==void 0?s:null);ae(d&&f&&p,"argument-error"),this.apiKey=d,this.operation=p,this.code=f,this.continueUrl=(i=u.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(o=u.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(c=u.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const t=GI(e);try{return new yu(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ds{constructor(){this.providerId=Ds.PROVIDER_ID}static credential(e,t){return Ai._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=yu.parseLink(t);return ae(r,"argument-error"),Ai._fromEmailAndCode(e,r.code,r.tenantId)}}Ds.PROVIDER_ID="password";Ds.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Ds.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xm{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Ki extends Xm{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class In extends Ki{constructor(){super("facebook.com")}static credential(e){return yr._fromParams({providerId:In.PROVIDER_ID,signInMethod:In.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return In.credentialFromTaggedObject(e)}static credentialFromError(e){return In.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return In.credential(e.oauthAccessToken)}catch{return null}}}In.FACEBOOK_SIGN_IN_METHOD="facebook.com";In.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class En extends Ki{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return yr._fromParams({providerId:En.PROVIDER_ID,signInMethod:En.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return En.credentialFromTaggedObject(e)}static credentialFromError(e){return En.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return En.credential(t,r)}catch{return null}}}En.GOOGLE_SIGN_IN_METHOD="google.com";En.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tn extends Ki{constructor(){super("github.com")}static credential(e){return yr._fromParams({providerId:Tn.PROVIDER_ID,signInMethod:Tn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Tn.credentialFromTaggedObject(e)}static credentialFromError(e){return Tn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Tn.credential(e.oauthAccessToken)}catch{return null}}}Tn.GITHUB_SIGN_IN_METHOD="github.com";Tn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class An extends Ki{constructor(){super("twitter.com")}static credential(e,t){return yr._fromParams({providerId:An.PROVIDER_ID,signInMethod:An.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return An.credentialFromTaggedObject(e)}static credentialFromError(e){return An.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return An.credential(t,r)}catch{return null}}}An.TWITTER_SIGN_IN_METHOD="twitter.com";An.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hs{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await rn._fromIdTokenResponse(e,r,s),o=of(r);return new hs({user:i,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=of(r);return new hs({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function of(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pa extends Ft{constructor(e,t,r,s){var i;super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,pa.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new pa(e,t,r,s)}}function Zm(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?pa._fromErrorAndOperation(n,i,e,r):i})}async function HI(n,e,t=!1){const r=await Ti(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return hs._forOperation(n,"link",r)}/**
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
 */async function KI(n,e,t=!1){const{auth:r}=n;if(It(r.app))return Promise.reject(xn(r));const s="reauthenticate";try{const i=await Ti(n,Zm(r,s,e,n),t);ae(i.idToken,r,"internal-error");const o=gu(i.idToken);ae(o,r,"internal-error");const{sub:c}=o;return ae(n.uid===c,r,"user-mismatch"),hs._forOperation(n,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&Lt(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eg(n,e,t=!1){if(It(n.app))return Promise.reject(xn(n));const r="signIn",s=await Zm(n,r,e),i=await hs._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function WI(n,e){return eg(Ns(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function QI(n){const e=Ns(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function YI(n,e,t){return It(n.app)?Promise.reject(xn(n)):WI(Te(n),Ds.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&QI(n),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function JI(n,e){return Te(n).setPersistence(e)}function XI(n,e,t,r){return Te(n).onIdTokenChanged(e,t,r)}function ZI(n,e,t){return Te(n).beforeAuthStateChanged(e,t)}function eE(n,e,t,r){return Te(n).onAuthStateChanged(e,t,r)}function tg(n){return Te(n).signOut()}const ma="__sak";/**
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
 */class ng{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(ma,"1"),this.storage.removeItem(ma),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tE=1e3,nE=10;class rg extends ng{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Km(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);bI()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,nE):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},tE)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}rg.type="LOCAL";const sg=rg;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ig extends ng{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}ig.type="SESSION";const og=ig;/**
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
 */function rE(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class Xa{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Xa(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(o).map(async d=>d(t.origin,i)),u=await rE(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Xa.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bu(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class sE{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,u)=>{const d=bu("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(p){const g=p;if(g.data.eventId===d)switch(g.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(g.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kt(){return window}function iE(n){Kt().location.href=n}/**
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
 */function ag(){return typeof Kt().WorkerGlobalScope<"u"&&typeof Kt().importScripts=="function"}async function oE(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function aE(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function cE(){return ag()?self:null}/**
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
 */const cg="firebaseLocalStorageDb",lE=1,ga="firebaseLocalStorage",lg="fbase_key";class Wi{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Za(n,e){return n.transaction([ga],e?"readwrite":"readonly").objectStore(ga)}function uE(){const n=indexedDB.deleteDatabase(cg);return new Wi(n).toPromise()}function Al(){const n=indexedDB.open(cg,lE);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(ga,{keyPath:lg})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(ga)?e(r):(r.close(),await uE(),e(await Al()))})})}async function af(n,e,t){const r=Za(n,!0).put({[lg]:e,value:t});return new Wi(r).toPromise()}async function dE(n,e){const t=Za(n,!1).get(e),r=await new Wi(t).toPromise();return r===void 0?null:r.value}function cf(n,e){const t=Za(n,!0).delete(e);return new Wi(t).toPromise()}const hE=800,fE=3;class ug{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Al(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>fE)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return ag()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Xa._getInstance(cE()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await oE(),!this.activeServiceWorker)return;this.sender=new sE(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||aE()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Al();return await af(e,ma,"1"),await cf(e,ma),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>af(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>dE(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>cf(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Za(s,!1).getAll();return new Wi(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),hE)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}ug.type="LOCAL";const pE=ug;new Hi(3e4,6e4);/**
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
 */function mE(n,e){return e?sn(e):(ae(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class wu extends vu{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return os(e,this._buildIdpRequest())}_linkToIdToken(e,t){return os(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return os(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function gE(n){return eg(n.auth,new wu(n),n.bypassAuthState)}function _E(n){const{auth:e,user:t}=n;return ae(t,e,"internal-error"),KI(t,new wu(n),n.bypassAuthState)}async function vE(n){const{auth:e,user:t}=n;return ae(t,e,"internal-error"),HI(t,new wu(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dg{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return gE;case"linkViaPopup":case"linkViaRedirect":return vE;case"reauthViaPopup":case"reauthViaRedirect":return _E;default:Lt(this.auth,"internal-error")}}resolve(e){cn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){cn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yE=new Hi(2e3,1e4);class ns extends dg{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,ns.currentPopupAction&&ns.currentPopupAction.cancel(),ns.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return ae(e,this.auth,"internal-error"),e}async onExecution(){cn(this.filter.length===1,"Popup operations only handle one event");const e=bu();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ht(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Ht(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ns.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ht(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,yE.get())};e()}}ns.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bE="pendingRedirect",Ho=new Map;class wE extends dg{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Ho.get(this.auth._key());if(!e){try{const r=await IE(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Ho.set(this.auth._key(),e)}return this.bypassAuthState||Ho.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function IE(n,e){const t=AE(e),r=TE(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function EE(n,e){Ho.set(n._key(),e)}function TE(n){return sn(n._redirectPersistence)}function AE(n){return Go(bE,n.config.apiKey,n.name)}async function SE(n,e,t=!1){if(It(n.app))return Promise.reject(xn(n));const r=Ns(n),s=mE(r,e),o=await new wE(r,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RE=10*60*1e3;class kE{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!CE(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!hg(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Ht(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=RE&&this.cachedEventUids.clear(),this.cachedEventUids.has(lf(e))}saveEventToCache(e){this.cachedEventUids.add(lf(e)),this.lastProcessedEventTime=Date.now()}}function lf(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function hg({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function CE(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return hg(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function PE(n,e={}){return $n(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xE=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,NE=/^https?/;async function DE(n){if(n.config.emulator)return;const{authorizedDomains:e}=await PE(n);for(const t of e)try{if(VE(t))return}catch{}Lt(n,"unauthorized-domain")}function VE(n){const e=El(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!NE.test(t))return!1;if(xE.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const OE=new Hi(3e4,6e4);function uf(){const n=Kt().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function LE(n){return new Promise((e,t)=>{var r,s,i;function o(){uf(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{uf(),t(Ht(n,"network-request-failed"))},timeout:OE.get()})}if(!((s=(r=Kt().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=Kt().gapi)===null||i===void 0)&&i.load)o();else{const c=CI("iframefcb");return Kt()[c]=()=>{gapi.load?o():t(Ht(n,"network-request-failed"))},Qm(`${kI()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw Ko=null,e})}let Ko=null;function ME(n){return Ko=Ko||LE(n),Ko}/**
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
 */const FE=new Hi(5e3,15e3),UE="__/auth/iframe",BE="emulator/auth/iframe",$E={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},qE=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function jE(n){const e=n.config;ae(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?mu(e,BE):`https://${n.config.authDomain}/${UE}`,r={apiKey:e.apiKey,appName:n.name,v:Nr},s=qE.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${Gi(r).slice(1)}`}async function zE(n){const e=await ME(n),t=Kt().gapi;return ae(t,n,"internal-error"),e.open({where:document.body,url:jE(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:$E,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=Ht(n,"network-request-failed"),c=Kt().setTimeout(()=>{i(o)},FE.get());function u(){Kt().clearTimeout(c),s(r)}r.ping(u).then(u,()=>{i(o)})}))}/**
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
 */const GE={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},HE=500,KE=600,WE="_blank",QE="http://localhost";class df{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function YE(n,e,t,r=HE,s=KE){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u=Object.assign(Object.assign({},GE),{width:r.toString(),height:s.toString(),top:i,left:o}),d=He().toLowerCase();t&&(c=qm(d)?WE:t),Bm(d)&&(e=e||QE,u.scrollbars="yes");const f=Object.entries(u).reduce((g,[_,I])=>`${g}${_}=${I},`,"");if(yI(d)&&c!=="_self")return JE(e||"",c),new df(null);const p=window.open(e||"",c,f);ae(p,n,"popup-blocked");try{p.focus()}catch{}return new df(p)}function JE(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const XE="__/auth/handler",ZE="emulator/auth/handler",eT=encodeURIComponent("fac");async function hf(n,e,t,r,s,i){ae(n.config.authDomain,n,"auth-domain-config-required"),ae(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Nr,eventId:s};if(e instanceof Xm){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Mb(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))o[f]=p}if(e instanceof Ki){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(o.scopes=f.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await n._getAppCheckToken(),d=u?`#${eT}=${encodeURIComponent(u)}`:"";return`${tT(n)}?${Gi(c).slice(1)}${d}`}function tT({config:n}){return n.emulator?mu(n,ZE):`https://${n.authDomain}/${XE}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nl="webStorageSupport";class nT{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=og,this._completeRedirectFn=SE,this._overrideRedirectResult=EE}async _openPopup(e,t,r,s){var i;cn((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await hf(e,t,r,El(),s);return YE(e,o,bu())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await hf(e,t,r,El(),s);return iE(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(cn(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await zE(e),r=new kE(e);return t.register("authEvent",s=>(ae(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(nl,{type:nl},s=>{var i;const o=(i=s?.[0])===null||i===void 0?void 0:i[nl];o!==void 0&&t(!!o),Lt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=DE(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Km()||$m()||_u()}}const rT=nT;var ff="@firebase/auth",pf="1.9.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sT{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){ae(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iT(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function oT(n){Qt(new Ot("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;ae(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Wm(n)},d=new AI(r,s,i,u);return OI(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Qt(new Ot("auth-internal",e=>{const t=Ns(e.getProvider("auth").getImmediate());return(r=>new sT(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),At(ff,pf,iT(n)),At(ff,pf,"esm2017")}/**
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
 */const aT=5*60,cT=Tm("authIdTokenMaxAge")||aT;let mf=null;const lT=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>cT)return;const s=t?.token;mf!==s&&(mf=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function uT(n=Qa()){const e=xr(n,"auth");if(e.isInitialized())return e.getImmediate();const t=VI(n,{popupRedirectResolver:rT,persistence:[pE,sg,og]}),r=Tm("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=lT(i.toString());ZI(t,o,()=>o(t.currentUser)),XI(t,c=>o(c))}}const s=wm("auth");return s&&LI(t,`http://${s}`),t}function dT(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}SI({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=Ht("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",dT().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});oT("Browser");var gf=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Nn,fg;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,v){function b(){}b.prototype=v.prototype,E.D=v.prototype,E.prototype=new b,E.prototype.constructor=E,E.C=function(R,w,x){for(var T=Array(arguments.length-2),le=2;le<arguments.length;le++)T[le-2]=arguments[le];return v.prototype[w].apply(R,T)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,v,b){b||(b=0);var R=Array(16);if(typeof v=="string")for(var w=0;16>w;++w)R[w]=v.charCodeAt(b++)|v.charCodeAt(b++)<<8|v.charCodeAt(b++)<<16|v.charCodeAt(b++)<<24;else for(w=0;16>w;++w)R[w]=v[b++]|v[b++]<<8|v[b++]<<16|v[b++]<<24;v=E.g[0],b=E.g[1],w=E.g[2];var x=E.g[3],T=v+(x^b&(w^x))+R[0]+3614090360&4294967295;v=b+(T<<7&4294967295|T>>>25),T=x+(w^v&(b^w))+R[1]+3905402710&4294967295,x=v+(T<<12&4294967295|T>>>20),T=w+(b^x&(v^b))+R[2]+606105819&4294967295,w=x+(T<<17&4294967295|T>>>15),T=b+(v^w&(x^v))+R[3]+3250441966&4294967295,b=w+(T<<22&4294967295|T>>>10),T=v+(x^b&(w^x))+R[4]+4118548399&4294967295,v=b+(T<<7&4294967295|T>>>25),T=x+(w^v&(b^w))+R[5]+1200080426&4294967295,x=v+(T<<12&4294967295|T>>>20),T=w+(b^x&(v^b))+R[6]+2821735955&4294967295,w=x+(T<<17&4294967295|T>>>15),T=b+(v^w&(x^v))+R[7]+4249261313&4294967295,b=w+(T<<22&4294967295|T>>>10),T=v+(x^b&(w^x))+R[8]+1770035416&4294967295,v=b+(T<<7&4294967295|T>>>25),T=x+(w^v&(b^w))+R[9]+2336552879&4294967295,x=v+(T<<12&4294967295|T>>>20),T=w+(b^x&(v^b))+R[10]+4294925233&4294967295,w=x+(T<<17&4294967295|T>>>15),T=b+(v^w&(x^v))+R[11]+2304563134&4294967295,b=w+(T<<22&4294967295|T>>>10),T=v+(x^b&(w^x))+R[12]+1804603682&4294967295,v=b+(T<<7&4294967295|T>>>25),T=x+(w^v&(b^w))+R[13]+4254626195&4294967295,x=v+(T<<12&4294967295|T>>>20),T=w+(b^x&(v^b))+R[14]+2792965006&4294967295,w=x+(T<<17&4294967295|T>>>15),T=b+(v^w&(x^v))+R[15]+1236535329&4294967295,b=w+(T<<22&4294967295|T>>>10),T=v+(w^x&(b^w))+R[1]+4129170786&4294967295,v=b+(T<<5&4294967295|T>>>27),T=x+(b^w&(v^b))+R[6]+3225465664&4294967295,x=v+(T<<9&4294967295|T>>>23),T=w+(v^b&(x^v))+R[11]+643717713&4294967295,w=x+(T<<14&4294967295|T>>>18),T=b+(x^v&(w^x))+R[0]+3921069994&4294967295,b=w+(T<<20&4294967295|T>>>12),T=v+(w^x&(b^w))+R[5]+3593408605&4294967295,v=b+(T<<5&4294967295|T>>>27),T=x+(b^w&(v^b))+R[10]+38016083&4294967295,x=v+(T<<9&4294967295|T>>>23),T=w+(v^b&(x^v))+R[15]+3634488961&4294967295,w=x+(T<<14&4294967295|T>>>18),T=b+(x^v&(w^x))+R[4]+3889429448&4294967295,b=w+(T<<20&4294967295|T>>>12),T=v+(w^x&(b^w))+R[9]+568446438&4294967295,v=b+(T<<5&4294967295|T>>>27),T=x+(b^w&(v^b))+R[14]+3275163606&4294967295,x=v+(T<<9&4294967295|T>>>23),T=w+(v^b&(x^v))+R[3]+4107603335&4294967295,w=x+(T<<14&4294967295|T>>>18),T=b+(x^v&(w^x))+R[8]+1163531501&4294967295,b=w+(T<<20&4294967295|T>>>12),T=v+(w^x&(b^w))+R[13]+2850285829&4294967295,v=b+(T<<5&4294967295|T>>>27),T=x+(b^w&(v^b))+R[2]+4243563512&4294967295,x=v+(T<<9&4294967295|T>>>23),T=w+(v^b&(x^v))+R[7]+1735328473&4294967295,w=x+(T<<14&4294967295|T>>>18),T=b+(x^v&(w^x))+R[12]+2368359562&4294967295,b=w+(T<<20&4294967295|T>>>12),T=v+(b^w^x)+R[5]+4294588738&4294967295,v=b+(T<<4&4294967295|T>>>28),T=x+(v^b^w)+R[8]+2272392833&4294967295,x=v+(T<<11&4294967295|T>>>21),T=w+(x^v^b)+R[11]+1839030562&4294967295,w=x+(T<<16&4294967295|T>>>16),T=b+(w^x^v)+R[14]+4259657740&4294967295,b=w+(T<<23&4294967295|T>>>9),T=v+(b^w^x)+R[1]+2763975236&4294967295,v=b+(T<<4&4294967295|T>>>28),T=x+(v^b^w)+R[4]+1272893353&4294967295,x=v+(T<<11&4294967295|T>>>21),T=w+(x^v^b)+R[7]+4139469664&4294967295,w=x+(T<<16&4294967295|T>>>16),T=b+(w^x^v)+R[10]+3200236656&4294967295,b=w+(T<<23&4294967295|T>>>9),T=v+(b^w^x)+R[13]+681279174&4294967295,v=b+(T<<4&4294967295|T>>>28),T=x+(v^b^w)+R[0]+3936430074&4294967295,x=v+(T<<11&4294967295|T>>>21),T=w+(x^v^b)+R[3]+3572445317&4294967295,w=x+(T<<16&4294967295|T>>>16),T=b+(w^x^v)+R[6]+76029189&4294967295,b=w+(T<<23&4294967295|T>>>9),T=v+(b^w^x)+R[9]+3654602809&4294967295,v=b+(T<<4&4294967295|T>>>28),T=x+(v^b^w)+R[12]+3873151461&4294967295,x=v+(T<<11&4294967295|T>>>21),T=w+(x^v^b)+R[15]+530742520&4294967295,w=x+(T<<16&4294967295|T>>>16),T=b+(w^x^v)+R[2]+3299628645&4294967295,b=w+(T<<23&4294967295|T>>>9),T=v+(w^(b|~x))+R[0]+4096336452&4294967295,v=b+(T<<6&4294967295|T>>>26),T=x+(b^(v|~w))+R[7]+1126891415&4294967295,x=v+(T<<10&4294967295|T>>>22),T=w+(v^(x|~b))+R[14]+2878612391&4294967295,w=x+(T<<15&4294967295|T>>>17),T=b+(x^(w|~v))+R[5]+4237533241&4294967295,b=w+(T<<21&4294967295|T>>>11),T=v+(w^(b|~x))+R[12]+1700485571&4294967295,v=b+(T<<6&4294967295|T>>>26),T=x+(b^(v|~w))+R[3]+2399980690&4294967295,x=v+(T<<10&4294967295|T>>>22),T=w+(v^(x|~b))+R[10]+4293915773&4294967295,w=x+(T<<15&4294967295|T>>>17),T=b+(x^(w|~v))+R[1]+2240044497&4294967295,b=w+(T<<21&4294967295|T>>>11),T=v+(w^(b|~x))+R[8]+1873313359&4294967295,v=b+(T<<6&4294967295|T>>>26),T=x+(b^(v|~w))+R[15]+4264355552&4294967295,x=v+(T<<10&4294967295|T>>>22),T=w+(v^(x|~b))+R[6]+2734768916&4294967295,w=x+(T<<15&4294967295|T>>>17),T=b+(x^(w|~v))+R[13]+1309151649&4294967295,b=w+(T<<21&4294967295|T>>>11),T=v+(w^(b|~x))+R[4]+4149444226&4294967295,v=b+(T<<6&4294967295|T>>>26),T=x+(b^(v|~w))+R[11]+3174756917&4294967295,x=v+(T<<10&4294967295|T>>>22),T=w+(v^(x|~b))+R[2]+718787259&4294967295,w=x+(T<<15&4294967295|T>>>17),T=b+(x^(w|~v))+R[9]+3951481745&4294967295,E.g[0]=E.g[0]+v&4294967295,E.g[1]=E.g[1]+(w+(T<<21&4294967295|T>>>11))&4294967295,E.g[2]=E.g[2]+w&4294967295,E.g[3]=E.g[3]+x&4294967295}r.prototype.u=function(E,v){v===void 0&&(v=E.length);for(var b=v-this.blockSize,R=this.B,w=this.h,x=0;x<v;){if(w==0)for(;x<=b;)s(this,E,x),x+=this.blockSize;if(typeof E=="string"){for(;x<v;)if(R[w++]=E.charCodeAt(x++),w==this.blockSize){s(this,R),w=0;break}}else for(;x<v;)if(R[w++]=E[x++],w==this.blockSize){s(this,R),w=0;break}}this.h=w,this.o+=v},r.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var v=1;v<E.length-8;++v)E[v]=0;var b=8*this.o;for(v=E.length-8;v<E.length;++v)E[v]=b&255,b/=256;for(this.u(E),E=Array(16),v=b=0;4>v;++v)for(var R=0;32>R;R+=8)E[b++]=this.g[v]>>>R&255;return E};function i(E,v){var b=c;return Object.prototype.hasOwnProperty.call(b,E)?b[E]:b[E]=v(E)}function o(E,v){this.h=v;for(var b=[],R=!0,w=E.length-1;0<=w;w--){var x=E[w]|0;R&&x==v||(b[w]=x,R=!1)}this.g=b}var c={};function u(E){return-128<=E&&128>E?i(E,function(v){return new o([v|0],0>v?-1:0)}):new o([E|0],0>E?-1:0)}function d(E){if(isNaN(E)||!isFinite(E))return p;if(0>E)return A(d(-E));for(var v=[],b=1,R=0;E>=b;R++)v[R]=E/b|0,b*=4294967296;return new o(v,0)}function f(E,v){if(E.length==0)throw Error("number format error: empty string");if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(E.charAt(0)=="-")return A(f(E.substring(1),v));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var b=d(Math.pow(v,8)),R=p,w=0;w<E.length;w+=8){var x=Math.min(8,E.length-w),T=parseInt(E.substring(w,w+x),v);8>x?(x=d(Math.pow(v,x)),R=R.j(x).add(d(T))):(R=R.j(b),R=R.add(d(T)))}return R}var p=u(0),g=u(1),_=u(16777216);n=o.prototype,n.m=function(){if(S(this))return-A(this).m();for(var E=0,v=1,b=0;b<this.g.length;b++){var R=this.i(b);E+=(0<=R?R:4294967296+R)*v,v*=4294967296}return E},n.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(I(this))return"0";if(S(this))return"-"+A(this).toString(E);for(var v=d(Math.pow(E,6)),b=this,R="";;){var w=L(b,v).g;b=V(b,w.j(v));var x=((0<b.g.length?b.g[0]:b.h)>>>0).toString(E);if(b=w,I(b))return x+R;for(;6>x.length;)x="0"+x;R=x+R}},n.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function I(E){if(E.h!=0)return!1;for(var v=0;v<E.g.length;v++)if(E.g[v]!=0)return!1;return!0}function S(E){return E.h==-1}n.l=function(E){return E=V(this,E),S(E)?-1:I(E)?0:1};function A(E){for(var v=E.g.length,b=[],R=0;R<v;R++)b[R]=~E.g[R];return new o(b,~E.h).add(g)}n.abs=function(){return S(this)?A(this):this},n.add=function(E){for(var v=Math.max(this.g.length,E.g.length),b=[],R=0,w=0;w<=v;w++){var x=R+(this.i(w)&65535)+(E.i(w)&65535),T=(x>>>16)+(this.i(w)>>>16)+(E.i(w)>>>16);R=T>>>16,x&=65535,T&=65535,b[w]=T<<16|x}return new o(b,b[b.length-1]&-2147483648?-1:0)};function V(E,v){return E.add(A(v))}n.j=function(E){if(I(this)||I(E))return p;if(S(this))return S(E)?A(this).j(A(E)):A(A(this).j(E));if(S(E))return A(this.j(A(E)));if(0>this.l(_)&&0>E.l(_))return d(this.m()*E.m());for(var v=this.g.length+E.g.length,b=[],R=0;R<2*v;R++)b[R]=0;for(R=0;R<this.g.length;R++)for(var w=0;w<E.g.length;w++){var x=this.i(R)>>>16,T=this.i(R)&65535,le=E.i(w)>>>16,pe=E.i(w)&65535;b[2*R+2*w]+=T*pe,k(b,2*R+2*w),b[2*R+2*w+1]+=x*pe,k(b,2*R+2*w+1),b[2*R+2*w+1]+=T*le,k(b,2*R+2*w+1),b[2*R+2*w+2]+=x*le,k(b,2*R+2*w+2)}for(R=0;R<v;R++)b[R]=b[2*R+1]<<16|b[2*R];for(R=v;R<2*v;R++)b[R]=0;return new o(b,0)};function k(E,v){for(;(E[v]&65535)!=E[v];)E[v+1]+=E[v]>>>16,E[v]&=65535,v++}function P(E,v){this.g=E,this.h=v}function L(E,v){if(I(v))throw Error("division by zero");if(I(E))return new P(p,p);if(S(E))return v=L(A(E),v),new P(A(v.g),A(v.h));if(S(v))return v=L(E,A(v)),new P(A(v.g),v.h);if(30<E.g.length){if(S(E)||S(v))throw Error("slowDivide_ only works with positive integers.");for(var b=g,R=v;0>=R.l(E);)b=C(b),R=C(R);var w=M(b,1),x=M(R,1);for(R=M(R,2),b=M(b,2);!I(R);){var T=x.add(R);0>=T.l(E)&&(w=w.add(b),x=T),R=M(R,1),b=M(b,1)}return v=V(E,w.j(v)),new P(w,v)}for(w=p;0<=E.l(v);){for(b=Math.max(1,Math.floor(E.m()/v.m())),R=Math.ceil(Math.log(b)/Math.LN2),R=48>=R?1:Math.pow(2,R-48),x=d(b),T=x.j(v);S(T)||0<T.l(E);)b-=R,x=d(b),T=x.j(v);I(x)&&(x=g),w=w.add(x),E=V(E,T)}return new P(w,E)}n.A=function(E){return L(this,E).h},n.and=function(E){for(var v=Math.max(this.g.length,E.g.length),b=[],R=0;R<v;R++)b[R]=this.i(R)&E.i(R);return new o(b,this.h&E.h)},n.or=function(E){for(var v=Math.max(this.g.length,E.g.length),b=[],R=0;R<v;R++)b[R]=this.i(R)|E.i(R);return new o(b,this.h|E.h)},n.xor=function(E){for(var v=Math.max(this.g.length,E.g.length),b=[],R=0;R<v;R++)b[R]=this.i(R)^E.i(R);return new o(b,this.h^E.h)};function C(E){for(var v=E.g.length+1,b=[],R=0;R<v;R++)b[R]=E.i(R)<<1|E.i(R-1)>>>31;return new o(b,E.h)}function M(E,v){var b=v>>5;v%=32;for(var R=E.g.length-b,w=[],x=0;x<R;x++)w[x]=0<v?E.i(x+b)>>>v|E.i(x+b+1)<<32-v:E.i(x+b);return new o(w,E.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,fg=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=d,o.fromString=f,Nn=o}).apply(typeof gf<"u"?gf:typeof self<"u"?self:typeof window<"u"?window:{});var So=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var pg,oi,mg,Wo,Sl,gg,_g,vg;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,h,m){return a==Array.prototype||a==Object.prototype||(a[h]=m.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof So=="object"&&So];for(var h=0;h<a.length;++h){var m=a[h];if(m&&m.Math==Math)return m}throw Error("Cannot find global object")}var r=t(this);function s(a,h){if(h)e:{var m=r;a=a.split(".");for(var y=0;y<a.length-1;y++){var O=a[y];if(!(O in m))break e;m=m[O]}a=a[a.length-1],y=m[a],h=h(y),h!=y&&h!=null&&e(m,a,{configurable:!0,writable:!0,value:h})}}function i(a,h){a instanceof String&&(a+="");var m=0,y=!1,O={next:function(){if(!y&&m<a.length){var U=m++;return{value:h(U,a[U]),done:!1}}return y=!0,{done:!0,value:void 0}}};return O[Symbol.iterator]=function(){return O},O}s("Array.prototype.values",function(a){return a||function(){return i(this,function(h,m){return m})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},c=this||self;function u(a){var h=typeof a;return h=h!="object"?h:a?Array.isArray(a)?"array":h:"null",h=="array"||h=="object"&&typeof a.length=="number"}function d(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function f(a,h,m){return a.call.apply(a.bind,arguments)}function p(a,h,m){if(!a)throw Error();if(2<arguments.length){var y=Array.prototype.slice.call(arguments,2);return function(){var O=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(O,y),a.apply(h,O)}}return function(){return a.apply(h,arguments)}}function g(a,h,m){return g=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:p,g.apply(null,arguments)}function _(a,h){var m=Array.prototype.slice.call(arguments,1);return function(){var y=m.slice();return y.push.apply(y,arguments),a.apply(this,y)}}function I(a,h){function m(){}m.prototype=h.prototype,a.aa=h.prototype,a.prototype=new m,a.prototype.constructor=a,a.Qb=function(y,O,U){for(var Q=Array(arguments.length-2),ke=2;ke<arguments.length;ke++)Q[ke-2]=arguments[ke];return h.prototype[O].apply(y,Q)}}function S(a){const h=a.length;if(0<h){const m=Array(h);for(let y=0;y<h;y++)m[y]=a[y];return m}return[]}function A(a,h){for(let m=1;m<arguments.length;m++){const y=arguments[m];if(u(y)){const O=a.length||0,U=y.length||0;a.length=O+U;for(let Q=0;Q<U;Q++)a[O+Q]=y[Q]}else a.push(y)}}class V{constructor(h,m){this.i=h,this.j=m,this.h=0,this.g=null}get(){let h;return 0<this.h?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function k(a){return/^[\s\xa0]*$/.test(a)}function P(){var a=c.navigator;return a&&(a=a.userAgent)?a:""}function L(a){return L[" "](a),a}L[" "]=function(){};var C=P().indexOf("Gecko")!=-1&&!(P().toLowerCase().indexOf("webkit")!=-1&&P().indexOf("Edge")==-1)&&!(P().indexOf("Trident")!=-1||P().indexOf("MSIE")!=-1)&&P().indexOf("Edge")==-1;function M(a,h,m){for(const y in a)h.call(m,a[y],y,a)}function E(a,h){for(const m in a)h.call(void 0,a[m],m,a)}function v(a){const h={};for(const m in a)h[m]=a[m];return h}const b="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function R(a,h){let m,y;for(let O=1;O<arguments.length;O++){y=arguments[O];for(m in y)a[m]=y[m];for(let U=0;U<b.length;U++)m=b[U],Object.prototype.hasOwnProperty.call(y,m)&&(a[m]=y[m])}}function w(a){var h=1;a=a.split(":");const m=[];for(;0<h&&a.length;)m.push(a.shift()),h--;return a.length&&m.push(a.join(":")),m}function x(a){c.setTimeout(()=>{throw a},0)}function T(){var a=N;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class le{constructor(){this.h=this.g=null}add(h,m){const y=pe.get();y.set(h,m),this.h?this.h.next=y:this.g=y,this.h=y}}var pe=new V(()=>new X,a=>a.reset());class X{constructor(){this.next=this.g=this.h=null}set(h,m){this.h=h,this.g=m,this.next=null}reset(){this.next=this.g=this.h=null}}let ye,$e=!1,N=new le,H=()=>{const a=c.Promise.resolve(void 0);ye=()=>{a.then(z)}};var z=()=>{for(var a;a=T();){try{a.h.call(a.g)}catch(m){x(m)}var h=pe;h.j(a),100>h.h&&(h.h++,a.next=h.g,h.g=a)}$e=!1};function Z(){this.s=this.s,this.C=this.C}Z.prototype.s=!1,Z.prototype.ma=function(){this.s||(this.s=!0,this.N())},Z.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function G(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}G.prototype.h=function(){this.defaultPrevented=!0};var he=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const m=()=>{};c.addEventListener("test",m,h),c.removeEventListener("test",m,h)}catch{}return a}();function F(a,h){if(G.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var m=this.type=a.type,y=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget){if(C){e:{try{L(h.nodeName);var O=!0;break e}catch{}O=!1}O||(h=null)}}else m=="mouseover"?h=a.fromElement:m=="mouseout"&&(h=a.toElement);this.relatedTarget=h,y?(this.clientX=y.clientX!==void 0?y.clientX:y.pageX,this.clientY=y.clientY!==void 0?y.clientY:y.pageY,this.screenX=y.screenX||0,this.screenY=y.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:q[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&F.aa.h.call(this)}}I(F,G);var q={2:"touch",3:"pen",4:"mouse"};F.prototype.h=function(){F.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Y="closure_listenable_"+(1e6*Math.random()|0),ce=0;function se(a,h,m,y,O){this.listener=a,this.proxy=null,this.src=h,this.type=m,this.capture=!!y,this.ha=O,this.key=++ce,this.da=this.fa=!1}function re(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Re(a){this.src=a,this.g={},this.h=0}Re.prototype.add=function(a,h,m,y,O){var U=a.toString();a=this.g[U],a||(a=this.g[U]=[],this.h++);var Q=qe(a,h,y,O);return-1<Q?(h=a[Q],m||(h.fa=!1)):(h=new se(h,this.src,U,!!y,O),h.fa=m,a.push(h)),h};function Ne(a,h){var m=h.type;if(m in a.g){var y=a.g[m],O=Array.prototype.indexOf.call(y,h,void 0),U;(U=0<=O)&&Array.prototype.splice.call(y,O,1),U&&(re(h),a.g[m].length==0&&(delete a.g[m],a.h--))}}function qe(a,h,m,y){for(var O=0;O<a.length;++O){var U=a[O];if(!U.da&&U.listener==h&&U.capture==!!m&&U.ha==y)return O}return-1}var ct="closure_lm_"+(1e6*Math.random()|0),Hn={};function Kn(a,h,m,y,O){if(Array.isArray(h)){for(var U=0;U<h.length;U++)Kn(a,h[U],m,y,O);return null}return m=jd(m),a&&a[Y]?a.K(h,m,d(y)?!!y.capture:!1,O):Ms(a,h,m,!1,y,O)}function Ms(a,h,m,y,O,U){if(!h)throw Error("Invalid event type");var Q=d(O)?!!O.capture:!!O,ke=Nc(a);if(ke||(a[ct]=ke=new Re(a)),m=ke.add(h,m,y,Q,U),m.proxy)return m;if(y=jy(),m.proxy=y,y.src=a,y.listener=m,a.addEventListener)he||(O=Q),O===void 0&&(O=!1),a.addEventListener(h.toString(),y,O);else if(a.attachEvent)a.attachEvent(qd(h.toString()),y);else if(a.addListener&&a.removeListener)a.addListener(y);else throw Error("addEventListener and attachEvent are unavailable.");return m}function jy(){function a(m){return h.call(a.src,a.listener,m)}const h=zy;return a}function $d(a,h,m,y,O){if(Array.isArray(h))for(var U=0;U<h.length;U++)$d(a,h[U],m,y,O);else y=d(y)?!!y.capture:!!y,m=jd(m),a&&a[Y]?(a=a.i,h=String(h).toString(),h in a.g&&(U=a.g[h],m=qe(U,m,y,O),-1<m&&(re(U[m]),Array.prototype.splice.call(U,m,1),U.length==0&&(delete a.g[h],a.h--)))):a&&(a=Nc(a))&&(h=a.g[h.toString()],a=-1,h&&(a=qe(h,m,y,O)),(m=-1<a?h[a]:null)&&xc(m))}function xc(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[Y])Ne(h.i,a);else{var m=a.type,y=a.proxy;h.removeEventListener?h.removeEventListener(m,y,a.capture):h.detachEvent?h.detachEvent(qd(m),y):h.addListener&&h.removeListener&&h.removeListener(y),(m=Nc(h))?(Ne(m,a),m.h==0&&(m.src=null,h[ct]=null)):re(a)}}}function qd(a){return a in Hn?Hn[a]:Hn[a]="on"+a}function zy(a,h){if(a.da)a=!0;else{h=new F(h,this);var m=a.listener,y=a.ha||a.src;a.fa&&xc(a),a=m.call(y,h)}return a}function Nc(a){return a=a[ct],a instanceof Re?a:null}var Dc="__closure_events_fn_"+(1e9*Math.random()>>>0);function jd(a){return typeof a=="function"?a:(a[Dc]||(a[Dc]=function(h){return a.handleEvent(h)}),a[Dc])}function Ze(){Z.call(this),this.i=new Re(this),this.M=this,this.F=null}I(Ze,Z),Ze.prototype[Y]=!0,Ze.prototype.removeEventListener=function(a,h,m,y){$d(this,a,h,m,y)};function lt(a,h){var m,y=a.F;if(y)for(m=[];y;y=y.F)m.push(y);if(a=a.M,y=h.type||h,typeof h=="string")h=new G(h,a);else if(h instanceof G)h.target=h.target||a;else{var O=h;h=new G(y,a),R(h,O)}if(O=!0,m)for(var U=m.length-1;0<=U;U--){var Q=h.g=m[U];O=co(Q,y,!0,h)&&O}if(Q=h.g=a,O=co(Q,y,!0,h)&&O,O=co(Q,y,!1,h)&&O,m)for(U=0;U<m.length;U++)Q=h.g=m[U],O=co(Q,y,!1,h)&&O}Ze.prototype.N=function(){if(Ze.aa.N.call(this),this.i){var a=this.i,h;for(h in a.g){for(var m=a.g[h],y=0;y<m.length;y++)re(m[y]);delete a.g[h],a.h--}}this.F=null},Ze.prototype.K=function(a,h,m,y){return this.i.add(String(a),h,!1,m,y)},Ze.prototype.L=function(a,h,m,y){return this.i.add(String(a),h,!0,m,y)};function co(a,h,m,y){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();for(var O=!0,U=0;U<h.length;++U){var Q=h[U];if(Q&&!Q.da&&Q.capture==m){var ke=Q.listener,Qe=Q.ha||Q.src;Q.fa&&Ne(a.i,Q),O=ke.call(Qe,y)!==!1&&O}}return O&&!y.defaultPrevented}function zd(a,h,m){if(typeof a=="function")m&&(a=g(a,m));else if(a&&typeof a.handleEvent=="function")a=g(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(h)?-1:c.setTimeout(a,h||0)}function Gd(a){a.g=zd(()=>{a.g=null,a.i&&(a.i=!1,Gd(a))},a.l);const h=a.h;a.h=null,a.m.apply(null,h)}class Gy extends Z{constructor(h,m){super(),this.m=h,this.l=m,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:Gd(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Fs(a){Z.call(this),this.h=a,this.g={}}I(Fs,Z);var Hd=[];function Kd(a){M(a.g,function(h,m){this.g.hasOwnProperty(m)&&xc(h)},a),a.g={}}Fs.prototype.N=function(){Fs.aa.N.call(this),Kd(this)},Fs.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Vc=c.JSON.stringify,Hy=c.JSON.parse,Ky=class{stringify(a){return c.JSON.stringify(a,void 0)}parse(a){return c.JSON.parse(a,void 0)}};function Oc(){}Oc.prototype.h=null;function Wd(a){return a.h||(a.h=a.i())}function Qd(){}var Us={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Lc(){G.call(this,"d")}I(Lc,G);function Mc(){G.call(this,"c")}I(Mc,G);var Wn={},Yd=null;function lo(){return Yd=Yd||new Ze}Wn.La="serverreachability";function Jd(a){G.call(this,Wn.La,a)}I(Jd,G);function Bs(a){const h=lo();lt(h,new Jd(h))}Wn.STAT_EVENT="statevent";function Xd(a,h){G.call(this,Wn.STAT_EVENT,a),this.stat=h}I(Xd,G);function ut(a){const h=lo();lt(h,new Xd(h,a))}Wn.Ma="timingevent";function Zd(a,h){G.call(this,Wn.Ma,a),this.size=h}I(Zd,G);function $s(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){a()},h)}function qs(){this.g=!0}qs.prototype.xa=function(){this.g=!1};function Wy(a,h,m,y,O,U){a.info(function(){if(a.g)if(U)for(var Q="",ke=U.split("&"),Qe=0;Qe<ke.length;Qe++){var we=ke[Qe].split("=");if(1<we.length){var et=we[0];we=we[1];var tt=et.split("_");Q=2<=tt.length&&tt[1]=="type"?Q+(et+"="+we+"&"):Q+(et+"=redacted&")}}else Q=null;else Q=U;return"XMLHTTP REQ ("+y+") [attempt "+O+"]: "+h+`
`+m+`
`+Q})}function Qy(a,h,m,y,O,U,Q){a.info(function(){return"XMLHTTP RESP ("+y+") [ attempt "+O+"]: "+h+`
`+m+`
`+U+" "+Q})}function Ur(a,h,m,y){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+Jy(a,m)+(y?" "+y:"")})}function Yy(a,h){a.info(function(){return"TIMEOUT: "+h})}qs.prototype.info=function(){};function Jy(a,h){if(!a.g)return h;if(!h)return null;try{var m=JSON.parse(h);if(m){for(a=0;a<m.length;a++)if(Array.isArray(m[a])){var y=m[a];if(!(2>y.length)){var O=y[1];if(Array.isArray(O)&&!(1>O.length)){var U=O[0];if(U!="noop"&&U!="stop"&&U!="close")for(var Q=1;Q<O.length;Q++)O[Q]=""}}}}return Vc(m)}catch{return h}}var uo={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},eh={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Fc;function ho(){}I(ho,Oc),ho.prototype.g=function(){return new XMLHttpRequest},ho.prototype.i=function(){return{}},Fc=new ho;function pn(a,h,m,y){this.j=a,this.i=h,this.l=m,this.R=y||1,this.U=new Fs(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new th}function th(){this.i=null,this.g="",this.h=!1}var nh={},Uc={};function Bc(a,h,m){a.L=1,a.v=go(en(h)),a.m=m,a.P=!0,rh(a,null)}function rh(a,h){a.F=Date.now(),fo(a),a.A=en(a.v);var m=a.A,y=a.R;Array.isArray(y)||(y=[String(y)]),_h(m.i,"t",y),a.C=0,m=a.j.J,a.h=new th,a.g=Oh(a.j,m?h:null,!a.m),0<a.O&&(a.M=new Gy(g(a.Y,a,a.g),a.O)),h=a.U,m=a.g,y=a.ca;var O="readystatechange";Array.isArray(O)||(O&&(Hd[0]=O.toString()),O=Hd);for(var U=0;U<O.length;U++){var Q=Kn(m,O[U],y||h.handleEvent,!1,h.h||h);if(!Q)break;h.g[Q.key]=Q}h=a.H?v(a.H):{},a.m?(a.u||(a.u="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,h)):(a.u="GET",a.g.ea(a.A,a.u,null,h)),Bs(),Wy(a.i,a.u,a.A,a.l,a.R,a.m)}pn.prototype.ca=function(a){a=a.target;const h=this.M;h&&tn(a)==3?h.j():this.Y(a)},pn.prototype.Y=function(a){try{if(a==this.g)e:{const tt=tn(this.g);var h=this.g.Ba();const qr=this.g.Z();if(!(3>tt)&&(tt!=3||this.g&&(this.h.h||this.g.oa()||Th(this.g)))){this.J||tt!=4||h==7||(h==8||0>=qr?Bs(3):Bs(2)),$c(this);var m=this.g.Z();this.X=m;t:if(sh(this)){var y=Th(this.g);a="";var O=y.length,U=tn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Qn(this),js(this);var Q="";break t}this.h.i=new c.TextDecoder}for(h=0;h<O;h++)this.h.h=!0,a+=this.h.i.decode(y[h],{stream:!(U&&h==O-1)});y.length=0,this.h.g+=a,this.C=0,Q=this.h.g}else Q=this.g.oa();if(this.o=m==200,Qy(this.i,this.u,this.A,this.l,this.R,tt,m),this.o){if(this.T&&!this.K){t:{if(this.g){var ke,Qe=this.g;if((ke=Qe.g?Qe.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!k(ke)){var we=ke;break t}}we=null}if(m=we)Ur(this.i,this.l,m,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,qc(this,m);else{this.o=!1,this.s=3,ut(12),Qn(this),js(this);break e}}if(this.P){m=!0;let Nt;for(;!this.J&&this.C<Q.length;)if(Nt=Xy(this,Q),Nt==Uc){tt==4&&(this.s=4,ut(14),m=!1),Ur(this.i,this.l,null,"[Incomplete Response]");break}else if(Nt==nh){this.s=4,ut(15),Ur(this.i,this.l,Q,"[Invalid Chunk]"),m=!1;break}else Ur(this.i,this.l,Nt,null),qc(this,Nt);if(sh(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),tt!=4||Q.length!=0||this.h.h||(this.s=1,ut(16),m=!1),this.o=this.o&&m,!m)Ur(this.i,this.l,Q,"[Invalid Chunked Response]"),Qn(this),js(this);else if(0<Q.length&&!this.W){this.W=!0;var et=this.j;et.g==this&&et.ba&&!et.M&&(et.j.info("Great, no buffering proxy detected. Bytes received: "+Q.length),Wc(et),et.M=!0,ut(11))}}else Ur(this.i,this.l,Q,null),qc(this,Q);tt==4&&Qn(this),this.o&&!this.J&&(tt==4?xh(this.j,this):(this.o=!1,fo(this)))}else mb(this.g),m==400&&0<Q.indexOf("Unknown SID")?(this.s=3,ut(12)):(this.s=0,ut(13)),Qn(this),js(this)}}}catch{}finally{}};function sh(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function Xy(a,h){var m=a.C,y=h.indexOf(`
`,m);return y==-1?Uc:(m=Number(h.substring(m,y)),isNaN(m)?nh:(y+=1,y+m>h.length?Uc:(h=h.slice(y,y+m),a.C=y+m,h)))}pn.prototype.cancel=function(){this.J=!0,Qn(this)};function fo(a){a.S=Date.now()+a.I,ih(a,a.I)}function ih(a,h){if(a.B!=null)throw Error("WatchDog timer not null");a.B=$s(g(a.ba,a),h)}function $c(a){a.B&&(c.clearTimeout(a.B),a.B=null)}pn.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(Yy(this.i,this.A),this.L!=2&&(Bs(),ut(17)),Qn(this),this.s=2,js(this)):ih(this,this.S-a)};function js(a){a.j.G==0||a.J||xh(a.j,a)}function Qn(a){$c(a);var h=a.M;h&&typeof h.ma=="function"&&h.ma(),a.M=null,Kd(a.U),a.g&&(h=a.g,a.g=null,h.abort(),h.ma())}function qc(a,h){try{var m=a.j;if(m.G!=0&&(m.g==a||jc(m.h,a))){if(!a.K&&jc(m.h,a)&&m.G==3){try{var y=m.Da.g.parse(h)}catch{y=null}if(Array.isArray(y)&&y.length==3){var O=y;if(O[0]==0){e:if(!m.u){if(m.g)if(m.g.F+3e3<a.F)Io(m),bo(m);else break e;Kc(m),ut(18)}}else m.za=O[1],0<m.za-m.T&&37500>O[2]&&m.F&&m.v==0&&!m.C&&(m.C=$s(g(m.Za,m),6e3));if(1>=ch(m.h)&&m.ca){try{m.ca()}catch{}m.ca=void 0}}else Jn(m,11)}else if((a.K||m.g==a)&&Io(m),!k(h))for(O=m.Da.g.parse(h),h=0;h<O.length;h++){let we=O[h];if(m.T=we[0],we=we[1],m.G==2)if(we[0]=="c"){m.K=we[1],m.ia=we[2];const et=we[3];et!=null&&(m.la=et,m.j.info("VER="+m.la));const tt=we[4];tt!=null&&(m.Aa=tt,m.j.info("SVER="+m.Aa));const qr=we[5];qr!=null&&typeof qr=="number"&&0<qr&&(y=1.5*qr,m.L=y,m.j.info("backChannelRequestTimeoutMs_="+y)),y=m;const Nt=a.g;if(Nt){const To=Nt.g?Nt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(To){var U=y.h;U.g||To.indexOf("spdy")==-1&&To.indexOf("quic")==-1&&To.indexOf("h2")==-1||(U.j=U.l,U.g=new Set,U.h&&(zc(U,U.h),U.h=null))}if(y.D){const Qc=Nt.g?Nt.g.getResponseHeader("X-HTTP-Session-Id"):null;Qc&&(y.ya=Qc,Ce(y.I,y.D,Qc))}}m.G=3,m.l&&m.l.ua(),m.ba&&(m.R=Date.now()-a.F,m.j.info("Handshake RTT: "+m.R+"ms")),y=m;var Q=a;if(y.qa=Vh(y,y.J?y.ia:null,y.W),Q.K){lh(y.h,Q);var ke=Q,Qe=y.L;Qe&&(ke.I=Qe),ke.B&&($c(ke),fo(ke)),y.g=Q}else Ch(y);0<m.i.length&&wo(m)}else we[0]!="stop"&&we[0]!="close"||Jn(m,7);else m.G==3&&(we[0]=="stop"||we[0]=="close"?we[0]=="stop"?Jn(m,7):Hc(m):we[0]!="noop"&&m.l&&m.l.ta(we),m.v=0)}}Bs(4)}catch{}}var Zy=class{constructor(a,h){this.g=a,this.map=h}};function oh(a){this.l=a||10,c.PerformanceNavigationTiming?(a=c.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function ah(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function ch(a){return a.h?1:a.g?a.g.size:0}function jc(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function zc(a,h){a.g?a.g.add(h):a.h=h}function lh(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}oh.prototype.cancel=function(){if(this.i=uh(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function uh(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let h=a.i;for(const m of a.g.values())h=h.concat(m.D);return h}return S(a.i)}function eb(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(u(a)){for(var h=[],m=a.length,y=0;y<m;y++)h.push(a[y]);return h}h=[],m=0;for(y in a)h[m++]=a[y];return h}function tb(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(u(a)||typeof a=="string"){var h=[];a=a.length;for(var m=0;m<a;m++)h.push(m);return h}h=[],m=0;for(const y in a)h[m++]=y;return h}}}function dh(a,h){if(a.forEach&&typeof a.forEach=="function")a.forEach(h,void 0);else if(u(a)||typeof a=="string")Array.prototype.forEach.call(a,h,void 0);else for(var m=tb(a),y=eb(a),O=y.length,U=0;U<O;U++)h.call(void 0,y[U],m&&m[U],a)}var hh=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function nb(a,h){if(a){a=a.split("&");for(var m=0;m<a.length;m++){var y=a[m].indexOf("="),O=null;if(0<=y){var U=a[m].substring(0,y);O=a[m].substring(y+1)}else U=a[m];h(U,O?decodeURIComponent(O.replace(/\+/g," ")):"")}}}function Yn(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof Yn){this.h=a.h,po(this,a.j),this.o=a.o,this.g=a.g,mo(this,a.s),this.l=a.l;var h=a.i,m=new Hs;m.i=h.i,h.g&&(m.g=new Map(h.g),m.h=h.h),fh(this,m),this.m=a.m}else a&&(h=String(a).match(hh))?(this.h=!1,po(this,h[1]||"",!0),this.o=zs(h[2]||""),this.g=zs(h[3]||"",!0),mo(this,h[4]),this.l=zs(h[5]||"",!0),fh(this,h[6]||"",!0),this.m=zs(h[7]||"")):(this.h=!1,this.i=new Hs(null,this.h))}Yn.prototype.toString=function(){var a=[],h=this.j;h&&a.push(Gs(h,ph,!0),":");var m=this.g;return(m||h=="file")&&(a.push("//"),(h=this.o)&&a.push(Gs(h,ph,!0),"@"),a.push(encodeURIComponent(String(m)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),m=this.s,m!=null&&a.push(":",String(m))),(m=this.l)&&(this.g&&m.charAt(0)!="/"&&a.push("/"),a.push(Gs(m,m.charAt(0)=="/"?ib:sb,!0))),(m=this.i.toString())&&a.push("?",m),(m=this.m)&&a.push("#",Gs(m,ab)),a.join("")};function en(a){return new Yn(a)}function po(a,h,m){a.j=m?zs(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function mo(a,h){if(h){if(h=Number(h),isNaN(h)||0>h)throw Error("Bad port number "+h);a.s=h}else a.s=null}function fh(a,h,m){h instanceof Hs?(a.i=h,cb(a.i,a.h)):(m||(h=Gs(h,ob)),a.i=new Hs(h,a.h))}function Ce(a,h,m){a.i.set(h,m)}function go(a){return Ce(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function zs(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Gs(a,h,m){return typeof a=="string"?(a=encodeURI(a).replace(h,rb),m&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function rb(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var ph=/[#\/\?@]/g,sb=/[#\?:]/g,ib=/[#\?]/g,ob=/[#\?@]/g,ab=/#/g;function Hs(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function mn(a){a.g||(a.g=new Map,a.h=0,a.i&&nb(a.i,function(h,m){a.add(decodeURIComponent(h.replace(/\+/g," ")),m)}))}n=Hs.prototype,n.add=function(a,h){mn(this),this.i=null,a=Br(this,a);var m=this.g.get(a);return m||this.g.set(a,m=[]),m.push(h),this.h+=1,this};function mh(a,h){mn(a),h=Br(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function gh(a,h){return mn(a),h=Br(a,h),a.g.has(h)}n.forEach=function(a,h){mn(this),this.g.forEach(function(m,y){m.forEach(function(O){a.call(h,O,y,this)},this)},this)},n.na=function(){mn(this);const a=Array.from(this.g.values()),h=Array.from(this.g.keys()),m=[];for(let y=0;y<h.length;y++){const O=a[y];for(let U=0;U<O.length;U++)m.push(h[y])}return m},n.V=function(a){mn(this);let h=[];if(typeof a=="string")gh(this,a)&&(h=h.concat(this.g.get(Br(this,a))));else{a=Array.from(this.g.values());for(let m=0;m<a.length;m++)h=h.concat(a[m])}return h},n.set=function(a,h){return mn(this),this.i=null,a=Br(this,a),gh(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},n.get=function(a,h){return a?(a=this.V(a),0<a.length?String(a[0]):h):h};function _h(a,h,m){mh(a,h),0<m.length&&(a.i=null,a.g.set(Br(a,h),S(m)),a.h+=m.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],h=Array.from(this.g.keys());for(var m=0;m<h.length;m++){var y=h[m];const U=encodeURIComponent(String(y)),Q=this.V(y);for(y=0;y<Q.length;y++){var O=U;Q[y]!==""&&(O+="="+encodeURIComponent(String(Q[y]))),a.push(O)}}return this.i=a.join("&")};function Br(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function cb(a,h){h&&!a.j&&(mn(a),a.i=null,a.g.forEach(function(m,y){var O=y.toLowerCase();y!=O&&(mh(this,y),_h(this,O,m))},a)),a.j=h}function lb(a,h){const m=new qs;if(c.Image){const y=new Image;y.onload=_(gn,m,"TestLoadImage: loaded",!0,h,y),y.onerror=_(gn,m,"TestLoadImage: error",!1,h,y),y.onabort=_(gn,m,"TestLoadImage: abort",!1,h,y),y.ontimeout=_(gn,m,"TestLoadImage: timeout",!1,h,y),c.setTimeout(function(){y.ontimeout&&y.ontimeout()},1e4),y.src=a}else h(!1)}function ub(a,h){const m=new qs,y=new AbortController,O=setTimeout(()=>{y.abort(),gn(m,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:y.signal}).then(U=>{clearTimeout(O),U.ok?gn(m,"TestPingServer: ok",!0,h):gn(m,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(O),gn(m,"TestPingServer: error",!1,h)})}function gn(a,h,m,y,O){try{O&&(O.onload=null,O.onerror=null,O.onabort=null,O.ontimeout=null),y(m)}catch{}}function db(){this.g=new Ky}function hb(a,h,m){const y=m||"";try{dh(a,function(O,U){let Q=O;d(O)&&(Q=Vc(O)),h.push(y+U+"="+encodeURIComponent(Q))})}catch(O){throw h.push(y+"type="+encodeURIComponent("_badmap")),O}}function _o(a){this.l=a.Ub||null,this.j=a.eb||!1}I(_o,Oc),_o.prototype.g=function(){return new vo(this.l,this.j)},_o.prototype.i=function(a){return function(){return a}}({});function vo(a,h){Ze.call(this),this.D=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}I(vo,Ze),n=vo.prototype,n.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=h,this.readyState=1,Ws(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const h={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(h.body=a),(this.D||c).fetch(new Request(this.A,h)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Ks(this)),this.readyState=0},n.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Ws(this)),this.g&&(this.readyState=3,Ws(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;vh(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function vh(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}n.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.v.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?Ks(this):Ws(this),this.readyState==3&&vh(this)}},n.Ra=function(a){this.g&&(this.response=this.responseText=a,Ks(this))},n.Qa=function(a){this.g&&(this.response=a,Ks(this))},n.ga=function(){this.g&&Ks(this)};function Ks(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Ws(a)}n.setRequestHeader=function(a,h){this.u.append(a,h)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],h=this.h.entries();for(var m=h.next();!m.done;)m=m.value,a.push(m[0]+": "+m[1]),m=h.next();return a.join(`\r
`)};function Ws(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(vo.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function yh(a){let h="";return M(a,function(m,y){h+=y,h+=":",h+=m,h+=`\r
`}),h}function Gc(a,h,m){e:{for(y in m){var y=!1;break e}y=!0}y||(m=yh(m),typeof a=="string"?m!=null&&encodeURIComponent(String(m)):Ce(a,h,m))}function Le(a){Ze.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}I(Le,Ze);var fb=/^https?$/i,pb=["POST","PUT"];n=Le.prototype,n.Ha=function(a){this.J=a},n.ea=function(a,h,m,y){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Fc.g(),this.v=this.o?Wd(this.o):Wd(Fc),this.g.onreadystatechange=g(this.Ea,this);try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(U){bh(this,U);return}if(a=m||"",m=new Map(this.headers),y)if(Object.getPrototypeOf(y)===Object.prototype)for(var O in y)m.set(O,y[O]);else if(typeof y.keys=="function"&&typeof y.get=="function")for(const U of y.keys())m.set(U,y.get(U));else throw Error("Unknown input type for opt_headers: "+String(y));y=Array.from(m.keys()).find(U=>U.toLowerCase()=="content-type"),O=c.FormData&&a instanceof c.FormData,!(0<=Array.prototype.indexOf.call(pb,h,void 0))||y||O||m.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[U,Q]of m)this.g.setRequestHeader(U,Q);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Eh(this),this.u=!0,this.g.send(a),this.u=!1}catch(U){bh(this,U)}};function bh(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.m=5,wh(a),yo(a)}function wh(a){a.A||(a.A=!0,lt(a,"complete"),lt(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,lt(this,"complete"),lt(this,"abort"),yo(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),yo(this,!0)),Le.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Ih(this):this.bb())},n.bb=function(){Ih(this)};function Ih(a){if(a.h&&typeof o<"u"&&(!a.v[1]||tn(a)!=4||a.Z()!=2)){if(a.u&&tn(a)==4)zd(a.Ea,0,a);else if(lt(a,"readystatechange"),tn(a)==4){a.h=!1;try{const Q=a.Z();e:switch(Q){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var m;if(!(m=h)){var y;if(y=Q===0){var O=String(a.D).match(hh)[1]||null;!O&&c.self&&c.self.location&&(O=c.self.location.protocol.slice(0,-1)),y=!fb.test(O?O.toLowerCase():"")}m=y}if(m)lt(a,"complete"),lt(a,"success");else{a.m=6;try{var U=2<tn(a)?a.g.statusText:""}catch{U=""}a.l=U+" ["+a.Z()+"]",wh(a)}}finally{yo(a)}}}}function yo(a,h){if(a.g){Eh(a);const m=a.g,y=a.v[0]?()=>{}:null;a.g=null,a.v=null,h||lt(a,"ready");try{m.onreadystatechange=y}catch{}}}function Eh(a){a.I&&(c.clearTimeout(a.I),a.I=null)}n.isActive=function(){return!!this.g};function tn(a){return a.g?a.g.readyState:0}n.Z=function(){try{return 2<tn(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),Hy(h)}};function Th(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function mb(a){const h={};a=(a.g&&2<=tn(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let y=0;y<a.length;y++){if(k(a[y]))continue;var m=w(a[y]);const O=m[0];if(m=m[1],typeof m!="string")continue;m=m.trim();const U=h[O]||[];h[O]=U,U.push(m)}E(h,function(y){return y.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Qs(a,h,m){return m&&m.internalChannelParams&&m.internalChannelParams[a]||h}function Ah(a){this.Aa=0,this.i=[],this.j=new qs,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Qs("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Qs("baseRetryDelayMs",5e3,a),this.cb=Qs("retryDelaySeedMs",1e4,a),this.Wa=Qs("forwardChannelMaxRetries",2,a),this.wa=Qs("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new oh(a&&a.concurrentRequestLimit),this.Da=new db,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Ah.prototype,n.la=8,n.G=1,n.connect=function(a,h,m,y){ut(0),this.W=a,this.H=h||{},m&&y!==void 0&&(this.H.OSID=m,this.H.OAID=y),this.F=this.X,this.I=Vh(this,null,this.W),wo(this)};function Hc(a){if(Sh(a),a.G==3){var h=a.U++,m=en(a.I);if(Ce(m,"SID",a.K),Ce(m,"RID",h),Ce(m,"TYPE","terminate"),Ys(a,m),h=new pn(a,a.j,h),h.L=2,h.v=go(en(m)),m=!1,c.navigator&&c.navigator.sendBeacon)try{m=c.navigator.sendBeacon(h.v.toString(),"")}catch{}!m&&c.Image&&(new Image().src=h.v,m=!0),m||(h.g=Oh(h.j,null),h.g.ea(h.v)),h.F=Date.now(),fo(h)}Dh(a)}function bo(a){a.g&&(Wc(a),a.g.cancel(),a.g=null)}function Sh(a){bo(a),a.u&&(c.clearTimeout(a.u),a.u=null),Io(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&c.clearTimeout(a.s),a.s=null)}function wo(a){if(!ah(a.h)&&!a.s){a.s=!0;var h=a.Ga;ye||H(),$e||(ye(),$e=!0),N.add(h,a),a.B=0}}function gb(a,h){return ch(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=h.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=$s(g(a.Ga,a,h),Nh(a,a.B)),a.B++,!0)}n.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const O=new pn(this,this.j,a);let U=this.o;if(this.S&&(U?(U=v(U),R(U,this.S)):U=this.S),this.m!==null||this.O||(O.H=U,U=null),this.P)e:{for(var h=0,m=0;m<this.i.length;m++){t:{var y=this.i[m];if("__data__"in y.map&&(y=y.map.__data__,typeof y=="string")){y=y.length;break t}y=void 0}if(y===void 0)break;if(h+=y,4096<h){h=m;break e}if(h===4096||m===this.i.length-1){h=m+1;break e}}h=1e3}else h=1e3;h=kh(this,O,h),m=en(this.I),Ce(m,"RID",a),Ce(m,"CVER",22),this.D&&Ce(m,"X-HTTP-Session-Id",this.D),Ys(this,m),U&&(this.O?h="headers="+encodeURIComponent(String(yh(U)))+"&"+h:this.m&&Gc(m,this.m,U)),zc(this.h,O),this.Ua&&Ce(m,"TYPE","init"),this.P?(Ce(m,"$req",h),Ce(m,"SID","null"),O.T=!0,Bc(O,m,null)):Bc(O,m,h),this.G=2}}else this.G==3&&(a?Rh(this,a):this.i.length==0||ah(this.h)||Rh(this))};function Rh(a,h){var m;h?m=h.l:m=a.U++;const y=en(a.I);Ce(y,"SID",a.K),Ce(y,"RID",m),Ce(y,"AID",a.T),Ys(a,y),a.m&&a.o&&Gc(y,a.m,a.o),m=new pn(a,a.j,m,a.B+1),a.m===null&&(m.H=a.o),h&&(a.i=h.D.concat(a.i)),h=kh(a,m,1e3),m.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),zc(a.h,m),Bc(m,y,h)}function Ys(a,h){a.H&&M(a.H,function(m,y){Ce(h,y,m)}),a.l&&dh({},function(m,y){Ce(h,y,m)})}function kh(a,h,m){m=Math.min(a.i.length,m);var y=a.l?g(a.l.Na,a.l,a):null;e:{var O=a.i;let U=-1;for(;;){const Q=["count="+m];U==-1?0<m?(U=O[0].g,Q.push("ofs="+U)):U=0:Q.push("ofs="+U);let ke=!0;for(let Qe=0;Qe<m;Qe++){let we=O[Qe].g;const et=O[Qe].map;if(we-=U,0>we)U=Math.max(0,O[Qe].g-100),ke=!1;else try{hb(et,Q,"req"+we+"_")}catch{y&&y(et)}}if(ke){y=Q.join("&");break e}}}return a=a.i.splice(0,m),h.D=a,y}function Ch(a){if(!a.g&&!a.u){a.Y=1;var h=a.Fa;ye||H(),$e||(ye(),$e=!0),N.add(h,a),a.v=0}}function Kc(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=$s(g(a.Fa,a),Nh(a,a.v)),a.v++,!0)}n.Fa=function(){if(this.u=null,Ph(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=$s(g(this.ab,this),a)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,ut(10),bo(this),Ph(this))};function Wc(a){a.A!=null&&(c.clearTimeout(a.A),a.A=null)}function Ph(a){a.g=new pn(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var h=en(a.qa);Ce(h,"RID","rpc"),Ce(h,"SID",a.K),Ce(h,"AID",a.T),Ce(h,"CI",a.F?"0":"1"),!a.F&&a.ja&&Ce(h,"TO",a.ja),Ce(h,"TYPE","xmlhttp"),Ys(a,h),a.m&&a.o&&Gc(h,a.m,a.o),a.L&&(a.g.I=a.L);var m=a.g;a=a.ia,m.L=1,m.v=go(en(h)),m.m=null,m.P=!0,rh(m,a)}n.Za=function(){this.C!=null&&(this.C=null,bo(this),Kc(this),ut(19))};function Io(a){a.C!=null&&(c.clearTimeout(a.C),a.C=null)}function xh(a,h){var m=null;if(a.g==h){Io(a),Wc(a),a.g=null;var y=2}else if(jc(a.h,h))m=h.D,lh(a.h,h),y=1;else return;if(a.G!=0){if(h.o)if(y==1){m=h.m?h.m.length:0,h=Date.now()-h.F;var O=a.B;y=lo(),lt(y,new Zd(y,m)),wo(a)}else Ch(a);else if(O=h.s,O==3||O==0&&0<h.X||!(y==1&&gb(a,h)||y==2&&Kc(a)))switch(m&&0<m.length&&(h=a.h,h.i=h.i.concat(m)),O){case 1:Jn(a,5);break;case 4:Jn(a,10);break;case 3:Jn(a,6);break;default:Jn(a,2)}}}function Nh(a,h){let m=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(m*=2),m*h}function Jn(a,h){if(a.j.info("Error code "+h),h==2){var m=g(a.fb,a),y=a.Xa;const O=!y;y=new Yn(y||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||po(y,"https"),go(y),O?lb(y.toString(),m):ub(y.toString(),m)}else ut(2);a.G=0,a.l&&a.l.sa(h),Dh(a),Sh(a)}n.fb=function(a){a?(this.j.info("Successfully pinged google.com"),ut(2)):(this.j.info("Failed to ping google.com"),ut(1))};function Dh(a){if(a.G=0,a.ka=[],a.l){const h=uh(a.h);(h.length!=0||a.i.length!=0)&&(A(a.ka,h),A(a.ka,a.i),a.h.i.length=0,S(a.i),a.i.length=0),a.l.ra()}}function Vh(a,h,m){var y=m instanceof Yn?en(m):new Yn(m);if(y.g!="")h&&(y.g=h+"."+y.g),mo(y,y.s);else{var O=c.location;y=O.protocol,h=h?h+"."+O.hostname:O.hostname,O=+O.port;var U=new Yn(null);y&&po(U,y),h&&(U.g=h),O&&mo(U,O),m&&(U.l=m),y=U}return m=a.D,h=a.ya,m&&h&&Ce(y,m,h),Ce(y,"VER",a.la),Ys(a,y),y}function Oh(a,h,m){if(h&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Ca&&!a.pa?new Le(new _o({eb:m})):new Le(a.pa),h.Ha(a.J),h}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Lh(){}n=Lh.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Eo(){}Eo.prototype.g=function(a,h){return new yt(a,h)};function yt(a,h){Ze.call(this),this.g=new Ah(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.va&&(a?a["X-WebChannel-Client-Profile"]=h.va:a={"X-WebChannel-Client-Profile":h.va}),this.g.S=a,(a=h&&h.Sb)&&!k(a)&&(this.g.m=a),this.v=h&&h.supportsCrossDomainXhr||!1,this.u=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!k(h)&&(this.g.D=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new $r(this)}I(yt,Ze),yt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},yt.prototype.close=function(){Hc(this.g)},yt.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var m={};m.__data__=a,a=m}else this.u&&(m={},m.__data__=Vc(a),a=m);h.i.push(new Zy(h.Ya++,a)),h.G==3&&wo(h)},yt.prototype.N=function(){this.g.l=null,delete this.j,Hc(this.g),delete this.g,yt.aa.N.call(this)};function Mh(a){Lc.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(const m in h){a=m;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}I(Mh,Lc);function Fh(){Mc.call(this),this.status=1}I(Fh,Mc);function $r(a){this.g=a}I($r,Lh),$r.prototype.ua=function(){lt(this.g,"a")},$r.prototype.ta=function(a){lt(this.g,new Mh(a))},$r.prototype.sa=function(a){lt(this.g,new Fh)},$r.prototype.ra=function(){lt(this.g,"b")},Eo.prototype.createWebChannel=Eo.prototype.g,yt.prototype.send=yt.prototype.o,yt.prototype.open=yt.prototype.m,yt.prototype.close=yt.prototype.close,vg=function(){return new Eo},_g=function(){return lo()},gg=Wn,Sl={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},uo.NO_ERROR=0,uo.TIMEOUT=8,uo.HTTP_ERROR=6,Wo=uo,eh.COMPLETE="complete",mg=eh,Qd.EventType=Us,Us.OPEN="a",Us.CLOSE="b",Us.ERROR="c",Us.MESSAGE="d",Ze.prototype.listen=Ze.prototype.K,oi=Qd,Le.prototype.listenOnce=Le.prototype.L,Le.prototype.getLastError=Le.prototype.Ka,Le.prototype.getLastErrorCode=Le.prototype.Ba,Le.prototype.getStatus=Le.prototype.Z,Le.prototype.getResponseJson=Le.prototype.Oa,Le.prototype.getResponseText=Le.prototype.oa,Le.prototype.send=Le.prototype.ea,Le.prototype.setWithCredentials=Le.prototype.Ha,pg=Le}).apply(typeof So<"u"?So:typeof self<"u"?self:typeof window<"u"?window:{});const _f="@firebase/firestore",vf="4.7.7";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ht.UNAUTHENTICATED=new ht(null),ht.GOOGLE_CREDENTIALS=new ht("google-credentials-uid"),ht.FIRST_PARTY=new ht("first-party-uid"),ht.MOCK_USER=new ht("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const br=new Wa("@firebase/firestore");function Qr(){return br.logLevel}function K(n,...e){if(br.logLevel<=ge.DEBUG){const t=e.map(Iu);br.debug(`Firestore (${Vs}): ${n}`,...t)}}function ft(n,...e){if(br.logLevel<=ge.ERROR){const t=e.map(Iu);br.error(`Firestore (${Vs}): ${n}`,...t)}}function Si(n,...e){if(br.logLevel<=ge.WARN){const t=e.map(Iu);br.warn(`Firestore (${Vs}): ${n}`,...t)}}function Iu(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
 */function ee(n="Unexpected state"){const e=`FIRESTORE (${Vs}) INTERNAL ASSERTION FAILED: `+n;throw ft(e),new Error(e)}function ne(n,e){n||ee()}function de(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const B={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class W extends Ft{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hT{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class fT{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(ht.UNAUTHENTICATED))}shutdown(){}}class pT{constructor(e){this.t=e,this.currentUser=ht.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){ne(this.o===void 0);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new Wt;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Wt,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},c=u=>{K("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>c(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(K("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Wt)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(K("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ne(typeof r.accessToken=="string"),new hT(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ne(e===null||typeof e=="string"),new ht(e)}}class mT{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=ht.FIRST_PARTY,this.T=new Map}I(){return this.P?this.P():null}get headers(){this.T.set("X-Goog-AuthUser",this.l);const e=this.I();return e&&this.T.set("Authorization",e),this.h&&this.T.set("X-Goog-Iam-Authorization-Token",this.h),this.T}}class gT{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new mT(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(ht.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class yf{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class _T{constructor(e,t){this.A=t,this.forceRefresh=!1,this.appCheck=null,this.R=null,this.V=null,It(e)&&e.settings.appCheckToken&&(this.V=e.settings.appCheckToken)}start(e,t){ne(this.o===void 0);const r=i=>{i.error!=null&&K("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.R;return this.R=i.token,K("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{K("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):K("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.V)return Promise.resolve(new yf(this.V));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(ne(typeof t.token=="string"),this.R=t.token,new yf(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vT(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */class yg{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=vT(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function ue(n,e){return n<e?-1:n>e?1:0}function kl(n,e){const t=Rl().encode(n),r=Rl().encode(e);for(let s=0;s<Math.min(t.length,r.length);s++){const i=ue(t[s],r[s]);if(i!==0)return i}return ue(t.length,r.length)}function fs(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}function bg(n){return n+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bf=-62135596800,wf=1e6;class Oe{static now(){return Oe.fromMillis(Date.now())}static fromDate(e){return Oe.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*wf);return new Oe(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new W(B.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new W(B.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<bf)throw new W(B.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new W(B.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/wf}_compareTo(e){return this.seconds===e.seconds?ue(this.nanoseconds,e.nanoseconds):ue(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds-bf;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const If="__name__";class $t{constructor(e,t,r){t===void 0?t=0:t>e.length&&ee(),r===void 0?r=e.length-t:r>e.length-t&&ee(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return $t.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof $t?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=$t.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return ue(e.length,t.length)}static compareSegments(e,t){const r=$t.isNumericId(e),s=$t.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?$t.extractNumericId(e).compare($t.extractNumericId(t)):kl(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Nn.fromString(e.substring(4,e.length-2))}}class Ie extends $t{construct(e,t,r){return new Ie(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new W(B.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new Ie(t)}static emptyPath(){return new Ie([])}}const yT=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ve extends $t{construct(e,t,r){return new Ve(e,t,r)}static isValidIdentifier(e){return yT.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ve.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===If}static keyField(){return new Ve([If])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new W(B.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new W(B.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new W(B.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(r+=c,s++):(i(),s++)}if(i(),o)throw new W(B.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ve(t)}static emptyPath(){return new Ve([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J{constructor(e){this.path=e}static fromPath(e){return new J(Ie.fromString(e))}static fromName(e){return new J(Ie.fromString(e).popFirst(5))}static empty(){return new J(Ie.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Ie.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Ie.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new J(new Ie(e.slice()))}}/**
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
 */const Ri=-1;class _a{constructor(e,t,r,s){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=s}}function Cl(n){return n.fields.find(e=>e.kind===2)}function nr(n){return n.fields.filter(e=>e.kind!==2)}_a.UNKNOWN_ID=-1;class Qo{constructor(e,t){this.fieldPath=e,this.kind=t}}class ki{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new ki(0,Rt.min())}}function bT(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=ie.fromTimestamp(r===1e9?new Oe(t+1,0):new Oe(t,r));return new Rt(s,J.empty(),e)}function wg(n){return new Rt(n.readTime,n.key,Ri)}class Rt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Rt(ie.min(),J.empty(),Ri)}static max(){return new Rt(ie.max(),J.empty(),Ri)}}function Eu(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=J.comparator(n.documentKey,e.documentKey),t!==0?t:ue(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ig="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Eg{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vr(n){if(n.code!==B.FAILED_PRECONDITION||n.message!==Ig)throw n;K("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&ee(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new D((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof D?t:D.resolve(t)}catch(t){return D.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):D.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):D.reject(t)}static resolve(e){return new D((t,r)=>{t(e)})}static reject(e){return new D((t,r)=>{r(e)})}static waitFor(e){return new D((t,r)=>{let s=0,i=0,o=!1;e.forEach(c=>{++s,c.next(()=>{++i,o&&i===s&&t()},u=>r(u))}),o=!0,i===s&&t()})}static or(e){let t=D.resolve(!1);for(const r of e)t=t.next(s=>s?D.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new D((r,s)=>{const i=e.length,o=new Array(i);let c=0;for(let u=0;u<i;u++){const d=u;t(e[d]).next(f=>{o[d]=f,++c,c===i&&r(o)},f=>s(f))}})}static doWhile(e,t){return new D((r,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wt="SimpleDb";class ec{static open(e,t,r,s){try{return new ec(t,e.transaction(s,r))}catch(i){throw new hi(t,i)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.m=new Wt,this.transaction.oncomplete=()=>{this.m.resolve()},this.transaction.onabort=()=>{t.error?this.m.reject(new hi(e,t.error)):this.m.resolve()},this.transaction.onerror=r=>{const s=Tu(r.target.error);this.m.reject(new hi(e,s))}}get p(){return this.m.promise}abort(e){e&&this.m.reject(e),this.aborted||(K(wt,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}S(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new IT(t)}}class Dn{static delete(e){return K(wt,"Removing database:",e),or(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!Ka())return!1;if(Dn.v())return!0;const e=He(),t=Dn.C(e),r=0<t&&t<10,s=Tg(e),i=0<s&&s<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||i)}static v(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.F)==="YES"}static M(e,t){return e.store(t)}static C(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}constructor(e,t,r){this.name=e,this.version=t,this.O=r,Dn.C(He())===12.2&&ft("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async N(e){return this.db||(K(wt,"Opening database:",this.name),this.db=await new Promise((t,r)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const o=i.target.result;t(o)},s.onblocked=()=>{r(new hi(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const o=i.target.error;o.name==="VersionError"?r(new W(B.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new W(B.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new hi(e,o))},s.onupgradeneeded=i=>{K(wt,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const o=i.target.result;this.O.B(o,s.transaction,i.oldVersion,this.version).next(()=>{K(wt,"Database upgrade to version "+this.version+" complete")})}})),this.L&&(this.db.onversionchange=t=>this.L(t)),this.db}k(e){this.L=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,s){const i=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.N(e);const c=ec.open(this.db,e,i?"readonly":"readwrite",r),u=s(c).next(d=>(c.S(),d)).catch(d=>(c.abort(d),D.reject(d))).toPromise();return u.catch(()=>{}),await c.p,u}catch(c){const u=c,d=u.name!=="FirebaseError"&&o<3;if(K(wt,"Transaction failed with error:",u.message,"Retrying:",d),this.close(),!d)return Promise.reject(u)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Tg(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class wT{constructor(e){this.q=e,this.$=!1,this.U=null}get isDone(){return this.$}get K(){return this.U}set cursor(e){this.q=e}done(){this.$=!0}W(e){this.U=e}delete(){return or(this.q.delete())}}class hi extends W{constructor(e,t){super(B.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function qn(n){return n.name==="IndexedDbTransactionError"}class IT{constructor(e){this.store=e}put(e,t){let r;return t!==void 0?(K(wt,"PUT",this.store.name,e,t),r=this.store.put(t,e)):(K(wt,"PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),or(r)}add(e){return K(wt,"ADD",this.store.name,e,e),or(this.store.add(e))}get(e){return or(this.store.get(e)).next(t=>(t===void 0&&(t=null),K(wt,"GET",this.store.name,e,t),t))}delete(e){return K(wt,"DELETE",this.store.name,e),or(this.store.delete(e))}count(){return K(wt,"COUNT",this.store.name),or(this.store.count())}G(e,t){const r=this.options(e,t),s=r.index?this.store.index(r.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(r.range);return new D((o,c)=>{i.onerror=u=>{c(u.target.error)},i.onsuccess=u=>{o(u.target.result)}})}{const i=this.cursor(r),o=[];return this.j(i,(c,u)=>{o.push(u)}).next(()=>o)}}H(e,t){const r=this.store.getAll(e,t===null?void 0:t);return new D((s,i)=>{r.onerror=o=>{i(o.target.error)},r.onsuccess=o=>{s(o.target.result)}})}J(e,t){K(wt,"DELETE ALL",this.store.name);const r=this.options(e,t);r.Y=!1;const s=this.cursor(r);return this.j(s,(i,o,c)=>c.delete())}Z(e,t){let r;t?r=e:(r={},t=e);const s=this.cursor(r);return this.j(s,t)}X(e){const t=this.cursor({});return new D((r,s)=>{t.onerror=i=>{const o=Tu(i.target.error);s(o)},t.onsuccess=i=>{const o=i.target.result;o?e(o.primaryKey,o.value).next(c=>{c?o.continue():r()}):r()}})}j(e,t){const r=[];return new D((s,i)=>{e.onerror=o=>{i(o.target.error)},e.onsuccess=o=>{const c=o.target.result;if(!c)return void s();const u=new wT(c),d=t(c.primaryKey,c.value,u);if(d instanceof D){const f=d.catch(p=>(u.done(),D.reject(p)));r.push(f)}u.isDone?s():u.K===null?c.continue():c.continue(u.K)}}).next(()=>D.waitFor(r))}options(e,t){let r;return e!==void 0&&(typeof e=="string"?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const r=this.store.index(e.index);return e.Y?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function or(n){return new D((e,t)=>{n.onsuccess=r=>{const s=r.target.result;e(s)},n.onerror=r=>{const s=Tu(r.target.error);t(s)}})}let Ef=!1;function Tu(n){const e=Dn.C(He());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(t)>=0){const r=new W("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Ef||(Ef=!0,setTimeout(()=>{throw r},0)),r}}return n}const fi="IndexBackfiller";class ET{constructor(e,t){this.asyncQueue=e,this.ee=t,this.task=null}start(){this.te(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}te(e){K(fi,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{const t=await this.ee.ne();K(fi,`Documents written: ${t}`)}catch(t){qn(t)?K(fi,"Ignoring IndexedDB error during index backfill: ",t):await Vr(t)}await this.te(6e4)})}}class TT{constructor(e,t){this.localStore=e,this.persistence=t}async ne(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.re(t,e))}re(e,t){const r=new Set;let s=t,i=!0;return D.doWhile(()=>i===!0&&s>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!r.has(o))return K(fi,`Processing collection: ${o}`),this.ie(e,o,s).next(c=>{s-=c,r.add(o)});i=!1})).next(()=>t-s)}ie(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(s=>this.localStore.localDocuments.getNextDocuments(e,t,s,r).next(i=>{const o=i.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this.se(s,i)).next(c=>(K(fi,`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c))).next(()=>o.size)}))}se(e,t){let r=e;return t.changes.forEach((s,i)=>{const o=wg(i);Eu(o,r)>0&&(r=o)}),new Rt(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
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
 */class Pt{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.oe(r),this._e=r=>t.writeSequenceNumber(r))}oe(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this._e&&this._e(e),e}}Pt.ae=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pr=-1;function tc(n){return n==null}function Ci(n){return n===0&&1/n==-1/0}function AT(n){return typeof n=="number"&&Number.isInteger(n)&&!Ci(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const va="";function ot(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Tf(e)),e=ST(n.get(t),e);return Tf(e)}function ST(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case va:t+="";break;default:t+=i}}return t}function Tf(n){return n+va+""}function jt(n){const e=n.length;if(ne(e>=2),e===2)return ne(n.charAt(0)===va&&n.charAt(1)===""),Ie.emptyPath();const t=e-2,r=[];let s="";for(let i=0;i<e;){const o=n.indexOf(va,i);switch((o<0||o>t)&&ee(),n.charAt(o+1)){case"":const c=n.substring(i,o);let u;s.length===0?u=c:(s+=c,u=s,s=""),r.push(u);break;case"":s+=n.substring(i,o),s+="\0";break;case"":s+=n.substring(i,o+1);break;default:ee()}i=o+2}return new Ie(r)}/**
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
 */const rr="remoteDocuments",Qi="owner",jr="owner",Pi="mutationQueues",RT="userId",Dt="mutations",Af="batchId",ur="userMutationsIndex",Sf=["userId","batchId"];/**
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
 */function Yo(n,e){return[n,ot(e)]}function Ag(n,e,t){return[n,ot(e),t]}const kT={},ps="documentMutations",ya="remoteDocumentsV14",CT=["prefixPath","collectionGroup","readTime","documentId"],Jo="documentKeyIndex",PT=["prefixPath","collectionGroup","documentId"],Sg="collectionGroupIndex",xT=["collectionGroup","readTime","prefixPath","documentId"],xi="remoteDocumentGlobal",Pl="remoteDocumentGlobalKey",ms="targets",Rg="queryTargetsIndex",NT=["canonicalId","targetId"],gs="targetDocuments",DT=["targetId","path"],Au="documentTargetsIndex",VT=["path","targetId"],ba="targetGlobalKey",mr="targetGlobal",Ni="collectionParents",OT=["collectionId","parent"],_s="clientMetadata",LT="clientId",nc="bundles",MT="bundleId",rc="namedQueries",FT="name",Su="indexConfiguration",UT="indexId",xl="collectionGroupIndex",BT="collectionGroup",wa="indexState",$T=["indexId","uid"],kg="sequenceNumberIndex",qT=["uid","sequenceNumber"],Ia="indexEntries",jT=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],Cg="documentKeyIndex",zT=["indexId","uid","orderedDocumentKey"],sc="documentOverlays",GT=["userId","collectionPath","documentId"],Nl="collectionPathOverlayIndex",HT=["userId","collectionPath","largestBatchId"],Pg="collectionGroupOverlayIndex",KT=["userId","collectionGroup","largestBatchId"],Ru="globals",WT="name",xg=[Pi,Dt,ps,rr,ms,Qi,mr,gs,_s,xi,Ni,nc,rc],QT=[...xg,sc],Ng=[Pi,Dt,ps,ya,ms,Qi,mr,gs,_s,xi,Ni,nc,rc,sc],Dg=Ng,ku=[...Dg,Su,wa,Ia],YT=ku,JT=[...ku,Ru];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dl extends Eg{constructor(e,t){super(),this.ue=e,this.currentSequenceNumber=t}}function Ke(n,e){const t=de(n);return Dn.M(t.ue,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rf(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function jn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Vg(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e,t){this.comparator=e,this.root=t||Ye.EMPTY}insert(e,t){return new xe(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Ye.BLACK,null,null))}remove(e){return new xe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ye.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Ro(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Ro(this.root,e,this.comparator,!1)}getReverseIterator(){return new Ro(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Ro(this.root,e,this.comparator,!0)}}class Ro{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ye{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??Ye.RED,this.left=s??Ye.EMPTY,this.right=i??Ye.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new Ye(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Ye.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Ye.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ye.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ye.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw ee();const e=this.left.check();if(e!==this.right.check())throw ee();return e+(this.isRed()?0:1)}}Ye.EMPTY=null,Ye.RED=!0,Ye.BLACK=!1;Ye.EMPTY=new class{constructor(){this.size=0}get key(){throw ee()}get value(){throw ee()}get color(){throw ee()}get left(){throw ee()}get right(){throw ee()}copy(e,t,r,s,i){return this}insert(e,t,r){return new Ye(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se{constructor(e){this.comparator=e,this.data=new xe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new kf(this.data.getIterator())}getIteratorFrom(e){return new kf(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof Se)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Se(this.comparator);return t.data=e,t}}class kf{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function zr(n){return n.hasNext()?n.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Og extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ze{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Og("Invalid base64 string: "+i):i}}(e);return new ze(t)}static fromUint8Array(e){const t=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(e);return new ze(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ue(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ze.EMPTY_BYTE_STRING=new ze("");const XT=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ln(n){if(ne(!!n),typeof n=="string"){let e=0;const t=XT.exec(n);if(ne(!!t),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Pe(n.seconds),nanos:Pe(n.nanos)}}function Pe(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function un(n){return typeof n=="string"?ze.fromBase64String(n):ze.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lg="server_timestamp",Mg="__type__",Fg="__previous_value__",Ug="__local_write_time__";function ic(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[Mg])===null||t===void 0?void 0:t.stringValue)===Lg}function oc(n){const e=n.mapValue.fields[Fg];return ic(e)?oc(e):e}function Di(n){const e=ln(n.mapValue.fields[Ug].timestampValue);return new Oe(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZT{constructor(e,t,r,s,i,o,c,u,d){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=d}}const Ea="(default)";class wr{constructor(e,t){this.projectId=e,this.database=t||Ea}static empty(){return new wr("","")}get isDefaultDatabase(){return this.database===Ea}isEqual(e){return e instanceof wr&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cu="__type__",Bg="__max__",kn={mapValue:{fields:{__type__:{stringValue:Bg}}}},Pu="__vector__",vs="value",Xo={nullValue:"NULL_VALUE"};function On(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?ic(n)?4:$g(n)?9007199254740991:ac(n)?10:11:ee()}function Yt(n,e){if(n===e)return!0;const t=On(n);if(t!==On(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Di(n).isEqual(Di(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=ln(s.timestampValue),c=ln(i.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,i){return un(s.bytesValue).isEqual(un(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,i){return Pe(s.geoPointValue.latitude)===Pe(i.geoPointValue.latitude)&&Pe(s.geoPointValue.longitude)===Pe(i.geoPointValue.longitude)}(n,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return Pe(s.integerValue)===Pe(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=Pe(s.doubleValue),c=Pe(i.doubleValue);return o===c?Ci(o)===Ci(c):isNaN(o)&&isNaN(c)}return!1}(n,e);case 9:return fs(n.arrayValue.values||[],e.arrayValue.values||[],Yt);case 10:case 11:return function(s,i){const o=s.mapValue.fields||{},c=i.mapValue.fields||{};if(Rf(o)!==Rf(c))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(c[u]===void 0||!Yt(o[u],c[u])))return!1;return!0}(n,e);default:return ee()}}function Vi(n,e){return(n.values||[]).find(t=>Yt(t,e))!==void 0}function Ln(n,e){if(n===e)return 0;const t=On(n),r=On(e);if(t!==r)return ue(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return ue(n.booleanValue,e.booleanValue);case 2:return function(i,o){const c=Pe(i.integerValue||i.doubleValue),u=Pe(o.integerValue||o.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1}(n,e);case 3:return Cf(n.timestampValue,e.timestampValue);case 4:return Cf(Di(n),Di(e));case 5:return kl(n.stringValue,e.stringValue);case 6:return function(i,o){const c=un(i),u=un(o);return c.compareTo(u)}(n.bytesValue,e.bytesValue);case 7:return function(i,o){const c=i.split("/"),u=o.split("/");for(let d=0;d<c.length&&d<u.length;d++){const f=ue(c[d],u[d]);if(f!==0)return f}return ue(c.length,u.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,o){const c=ue(Pe(i.latitude),Pe(o.latitude));return c!==0?c:ue(Pe(i.longitude),Pe(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Pf(n.arrayValue,e.arrayValue);case 10:return function(i,o){var c,u,d,f;const p=i.fields||{},g=o.fields||{},_=(c=p[vs])===null||c===void 0?void 0:c.arrayValue,I=(u=g[vs])===null||u===void 0?void 0:u.arrayValue,S=ue(((d=_?.values)===null||d===void 0?void 0:d.length)||0,((f=I?.values)===null||f===void 0?void 0:f.length)||0);return S!==0?S:Pf(_,I)}(n.mapValue,e.mapValue);case 11:return function(i,o){if(i===kn.mapValue&&o===kn.mapValue)return 0;if(i===kn.mapValue)return 1;if(o===kn.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),d=o.fields||{},f=Object.keys(d);u.sort(),f.sort();for(let p=0;p<u.length&&p<f.length;++p){const g=kl(u[p],f[p]);if(g!==0)return g;const _=Ln(c[u[p]],d[f[p]]);if(_!==0)return _}return ue(u.length,f.length)}(n.mapValue,e.mapValue);default:throw ee()}}function Cf(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ue(n,e);const t=ln(n),r=ln(e),s=ue(t.seconds,r.seconds);return s!==0?s:ue(t.nanos,r.nanos)}function Pf(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=Ln(t[s],r[s]);if(i)return i}return ue(t.length,r.length)}function ys(n){return Vl(n)}function Vl(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=ln(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return un(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return J.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=Vl(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${Vl(t.fields[o])}`;return s+"}"}(n.mapValue):ee()}function Zo(n){switch(On(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=oc(n);return e?16+Zo(e):16;case 5:return 2*n.stringValue.length;case 6:return un(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+Zo(i),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return jn(r.fields,(i,o)=>{s+=i.length+Zo(o)}),s}(n.mapValue);default:throw ee()}}function Ir(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Ol(n){return!!n&&"integerValue"in n}function Oi(n){return!!n&&"arrayValue"in n}function xf(n){return!!n&&"nullValue"in n}function Nf(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function ea(n){return!!n&&"mapValue"in n}function ac(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[Cu])===null||t===void 0?void 0:t.stringValue)===Pu}function pi(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return jn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=pi(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=pi(n.arrayValue.values[t]);return e}return Object.assign({},n)}function $g(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Bg}const qg={mapValue:{fields:{[Cu]:{stringValue:Pu},[vs]:{arrayValue:{}}}}};function eA(n){return"nullValue"in n?Xo:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?Ir(wr.empty(),J.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?ac(n)?qg:{mapValue:{}}:ee()}function tA(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?Ir(wr.empty(),J.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?qg:"mapValue"in n?ac(n)?{mapValue:{}}:kn:ee()}function Df(n,e){const t=Ln(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?-1:!n.inclusive&&e.inclusive?1:0}function Vf(n,e){const t=Ln(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?1:!n.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class st{constructor(e){this.value=e}static empty(){return new st({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!ea(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=pi(t)}setAll(e){let t=Ve.emptyPath(),r={},s=[];e.forEach((o,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=c.popLast()}o?r[c.lastSegment()]=pi(o):s.push(c.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());ea(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Yt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];ea(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){jn(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new st(pi(this.value))}}function jg(n){const e=[];return jn(n.fields,(t,r)=>{const s=new Ve([t]);if(ea(r)){const i=jg(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new gt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Me{constructor(e,t,r,s,i,o,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(e){return new Me(e,0,ie.min(),ie.min(),ie.min(),st.empty(),0)}static newFoundDocument(e,t,r,s){return new Me(e,1,t,ie.min(),r,s,0)}static newNoDocument(e,t){return new Me(e,2,t,ie.min(),ie.min(),st.empty(),0)}static newUnknownDocument(e,t){return new Me(e,3,t,ie.min(),ie.min(),st.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(ie.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=st.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=st.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ie.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Me&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Me(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Mn{constructor(e,t){this.position=e,this.inclusive=t}}function Of(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],o=n.position[s];if(i.field.isKeyField()?r=J.comparator(J.fromName(o.referenceValue),t.key):r=Ln(o,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Lf(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Yt(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class Li{constructor(e,t="asc"){this.field=e,this.dir=t}}function nA(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class zg{}class _e extends zg{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new rA(e,t,r):t==="array-contains"?new oA(e,r):t==="in"?new Yg(e,r):t==="not-in"?new aA(e,r):t==="array-contains-any"?new cA(e,r):new _e(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new sA(e,r):new iA(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Ln(t,this.value)):t!==null&&On(this.value)===On(t)&&this.matchesComparison(Ln(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return ee()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ae extends zg{constructor(e,t){super(),this.filters=e,this.op=t,this.ce=null}static create(e,t){return new Ae(e,t)}matches(e){return bs(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ce!==null||(this.ce=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ce}getFilters(){return Object.assign([],this.filters)}}function bs(n){return n.op==="and"}function Ll(n){return n.op==="or"}function xu(n){return Gg(n)&&bs(n)}function Gg(n){for(const e of n.filters)if(e instanceof Ae)return!1;return!0}function Ml(n){if(n instanceof _e)return n.field.canonicalString()+n.op.toString()+ys(n.value);if(xu(n))return n.filters.map(e=>Ml(e)).join(",");{const e=n.filters.map(t=>Ml(t)).join(",");return`${n.op}(${e})`}}function Hg(n,e){return n instanceof _e?function(r,s){return s instanceof _e&&r.op===s.op&&r.field.isEqual(s.field)&&Yt(r.value,s.value)}(n,e):n instanceof Ae?function(r,s){return s instanceof Ae&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,o,c)=>i&&Hg(o,s.filters[c]),!0):!1}(n,e):void ee()}function Kg(n,e){const t=n.filters.concat(e);return Ae.create(t,n.op)}function Wg(n){return n instanceof _e?function(t){return`${t.field.canonicalString()} ${t.op} ${ys(t.value)}`}(n):n instanceof Ae?function(t){return t.op.toString()+" {"+t.getFilters().map(Wg).join(" ,")+"}"}(n):"Filter"}class rA extends _e{constructor(e,t,r){super(e,t,r),this.key=J.fromName(r.referenceValue)}matches(e){const t=J.comparator(e.key,this.key);return this.matchesComparison(t)}}class sA extends _e{constructor(e,t){super(e,"in",t),this.keys=Qg("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class iA extends _e{constructor(e,t){super(e,"not-in",t),this.keys=Qg("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Qg(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>J.fromName(r.referenceValue))}class oA extends _e{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Oi(t)&&Vi(t.arrayValue,this.value)}}class Yg extends _e{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Vi(this.value.arrayValue,t)}}class aA extends _e{constructor(e,t){super(e,"not-in",t)}matches(e){if(Vi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!Vi(this.value.arrayValue,t)}}class cA extends _e{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Oi(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Vi(this.value.arrayValue,r))}}/**
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
 */class lA{constructor(e,t=null,r=[],s=[],i=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.le=null}}function Fl(n,e=null,t=[],r=[],s=null,i=null,o=null){return new lA(n,e,t,r,s,i,o)}function Er(n){const e=de(n);if(e.le===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Ml(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),tc(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>ys(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>ys(r)).join(",")),e.le=t}return e.le}function Yi(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!nA(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Hg(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Lf(n.startAt,e.startAt)&&Lf(n.endAt,e.endAt)}function Ta(n){return J.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Aa(n,e){return n.filters.filter(t=>t instanceof _e&&t.field.isEqual(e))}function Mf(n,e,t){let r=Xo,s=!0;for(const i of Aa(n,e)){let o=Xo,c=!0;switch(i.op){case"<":case"<=":o=eA(i.value);break;case"==":case"in":case">=":o=i.value;break;case">":o=i.value,c=!1;break;case"!=":case"not-in":o=Xo}Df({value:r,inclusive:s},{value:o,inclusive:c})<0&&(r=o,s=c)}if(t!==null){for(let i=0;i<n.orderBy.length;++i)if(n.orderBy[i].field.isEqual(e)){const o=t.position[i];Df({value:r,inclusive:s},{value:o,inclusive:t.inclusive})<0&&(r=o,s=t.inclusive);break}}return{value:r,inclusive:s}}function Ff(n,e,t){let r=kn,s=!0;for(const i of Aa(n,e)){let o=kn,c=!0;switch(i.op){case">=":case">":o=tA(i.value),c=!1;break;case"==":case"in":case"<=":o=i.value;break;case"<":o=i.value,c=!1;break;case"!=":case"not-in":o=kn}Vf({value:r,inclusive:s},{value:o,inclusive:c})>0&&(r=o,s=c)}if(t!==null){for(let i=0;i<n.orderBy.length;++i)if(n.orderBy[i].field.isEqual(e)){const o=t.position[i];Vf({value:r,inclusive:s},{value:o,inclusive:t.inclusive})>0&&(r=o,s=t.inclusive);break}}return{value:r,inclusive:s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Or{constructor(e,t=null,r=[],s=[],i=null,o="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=u,this.he=null,this.Pe=null,this.Te=null,this.startAt,this.endAt}}function uA(n,e,t,r,s,i,o,c){return new Or(n,e,t,r,s,i,o,c)}function Ji(n){return new Or(n)}function Uf(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Nu(n){return n.collectionGroup!==null}function as(n){const e=de(n);if(e.he===null){e.he=[];const t=new Set;for(const i of e.explicitOrderBy)e.he.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new Se(Ve.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.he.push(new Li(i,r))}),t.has(Ve.keyField().canonicalString())||e.he.push(new Li(Ve.keyField(),r))}return e.he}function xt(n){const e=de(n);return e.Pe||(e.Pe=dA(e,as(n))),e.Pe}function dA(n,e){if(n.limitType==="F")return Fl(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Li(s.field,i)});const t=n.endAt?new Mn(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Mn(n.startAt.position,n.startAt.inclusive):null;return Fl(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Ul(n,e){const t=n.filters.concat([e]);return new Or(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Sa(n,e,t){return new Or(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function cc(n,e){return Yi(xt(n),xt(e))&&n.limitType===e.limitType}function Jg(n){return`${Er(xt(n))}|lt:${n.limitType}`}function Yr(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>Wg(s)).join(", ")}]`),tc(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>ys(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>ys(s)).join(",")),`Target(${r})`}(xt(n))}; limitType=${n.limitType})`}function Xi(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):J.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of as(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(o,c,u){const d=Of(o,c,u);return o.inclusive?d<=0:d<0}(r.startAt,as(r),s)||r.endAt&&!function(o,c,u){const d=Of(o,c,u);return o.inclusive?d>=0:d>0}(r.endAt,as(r),s))}(n,e)}function hA(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Xg(n){return(e,t)=>{let r=!1;for(const s of as(n)){const i=fA(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function fA(n,e,t){const r=n.field.isKeyField()?J.comparator(e.key,t.key):function(i,o,c){const u=o.data.field(i),d=c.data.field(i);return u!==null&&d!==null?Ln(u,d):ee()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return ee()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){jn(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return Vg(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pA=new xe(J.comparator);function Et(){return pA}const Zg=new xe(J.comparator);function ai(...n){let e=Zg;for(const t of n)e=e.insert(t.key,t);return e}function e_(n){let e=Zg;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function zt(){return mi()}function t_(){return mi()}function mi(){return new hn(n=>n.toString(),(n,e)=>n.isEqual(e))}const mA=new xe(J.comparator),gA=new Se(J.comparator);function me(...n){let e=gA;for(const t of n)e=e.add(t);return e}const _A=new Se(ue);function vA(){return _A}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Du(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ci(e)?"-0":e}}function n_(n){return{integerValue:""+n}}function r_(n,e){return AT(e)?n_(e):Du(n,e)}/**
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
 */class lc{constructor(){this._=void 0}}function yA(n,e,t){return n instanceof Mi?function(s,i){const o={fields:{[Mg]:{stringValue:Lg},[Ug]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&ic(i)&&(i=oc(i)),i&&(o.fields[Fg]=i),{mapValue:o}}(t,e):n instanceof ws?i_(n,e):n instanceof Is?o_(n,e):function(s,i){const o=s_(s,i),c=Bf(o)+Bf(s.Ie);return Ol(o)&&Ol(s.Ie)?n_(c):Du(s.serializer,c)}(n,e)}function bA(n,e,t){return n instanceof ws?i_(n,e):n instanceof Is?o_(n,e):t}function s_(n,e){return n instanceof Es?function(r){return Ol(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class Mi extends lc{}class ws extends lc{constructor(e){super(),this.elements=e}}function i_(n,e){const t=a_(e);for(const r of n.elements)t.some(s=>Yt(s,r))||t.push(r);return{arrayValue:{values:t}}}class Is extends lc{constructor(e){super(),this.elements=e}}function o_(n,e){let t=a_(e);for(const r of n.elements)t=t.filter(s=>!Yt(s,r));return{arrayValue:{values:t}}}class Es extends lc{constructor(e,t){super(),this.serializer=e,this.Ie=t}}function Bf(n){return Pe(n.integerValue||n.doubleValue)}function a_(n){return Oi(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class c_{constructor(e,t){this.field=e,this.transform=t}}function wA(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof ws&&s instanceof ws||r instanceof Is&&s instanceof Is?fs(r.elements,s.elements,Yt):r instanceof Es&&s instanceof Es?Yt(r.Ie,s.Ie):r instanceof Mi&&s instanceof Mi}(n.transform,e.transform)}class IA{constructor(e,t){this.version=e,this.transformResults=t}}class it{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new it}static exists(e){return new it(void 0,e)}static updateTime(e){return new it(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function ta(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class uc{}function l_(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new dc(n.key,it.none()):new Os(n.key,n.data,it.none());{const t=n.data,r=st.empty();let s=new Se(Ve.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new fn(n.key,r,new gt(s.toArray()),it.none())}}function EA(n,e,t){n instanceof Os?function(s,i,o){const c=s.value.clone(),u=qf(s.fieldTransforms,i,o.transformResults);c.setAll(u),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(n,e,t):n instanceof fn?function(s,i,o){if(!ta(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=qf(s.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(u_(s)),u.setAll(c),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(n,e,t):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function gi(n,e,t,r){return n instanceof Os?function(i,o,c,u){if(!ta(i.precondition,o))return c;const d=i.value.clone(),f=jf(i.fieldTransforms,u,o);return d.setAll(f),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),null}(n,e,t,r):n instanceof fn?function(i,o,c,u){if(!ta(i.precondition,o))return c;const d=jf(i.fieldTransforms,u,o),f=o.data;return f.setAll(u_(i)),f.setAll(d),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(p=>p.field))}(n,e,t,r):function(i,o,c){return ta(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c}(n,e,t)}function TA(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=s_(r.transform,s||null);i!=null&&(t===null&&(t=st.empty()),t.set(r.field,i))}return t||null}function $f(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&fs(r,s,(i,o)=>wA(i,o))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Os extends uc{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class fn extends uc{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function u_(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function qf(n,e,t){const r=new Map;ne(n.length===t.length);for(let s=0;s<t.length;s++){const i=n[s],o=i.transform,c=e.data.field(i.field);r.set(i.field,bA(o,c,t[s]))}return r}function jf(n,e,t){const r=new Map;for(const s of n){const i=s.transform,o=t.data.field(s.field);r.set(s.field,yA(i,o,e))}return r}class dc extends uc{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class d_ extends uc{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vu{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&EA(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=gi(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=gi(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=t_();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=t.has(s.key)?null:c;const u=l_(o,c);u!==null&&r.set(s.key,u),o.isValidDocument()||o.convertToNoDocument(ie.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),me())}isEqual(e){return this.batchId===e.batchId&&fs(this.mutations,e.mutations,(t,r)=>$f(t,r))&&fs(this.baseMutations,e.baseMutations,(t,r)=>$f(t,r))}}class Ou{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){ne(e.mutations.length===r.length);let s=function(){return mA}();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new Ou(e,t,r,s)}}/**
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
 */class Lu{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class AA{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var je,ve;function SA(n){switch(n){case B.OK:return ee();case B.CANCELLED:case B.UNKNOWN:case B.DEADLINE_EXCEEDED:case B.RESOURCE_EXHAUSTED:case B.INTERNAL:case B.UNAVAILABLE:case B.UNAUTHENTICATED:return!1;case B.INVALID_ARGUMENT:case B.NOT_FOUND:case B.ALREADY_EXISTS:case B.PERMISSION_DENIED:case B.FAILED_PRECONDITION:case B.ABORTED:case B.OUT_OF_RANGE:case B.UNIMPLEMENTED:case B.DATA_LOSS:return!0;default:return ee()}}function h_(n){if(n===void 0)return ft("GRPC error has no .code"),B.UNKNOWN;switch(n){case je.OK:return B.OK;case je.CANCELLED:return B.CANCELLED;case je.UNKNOWN:return B.UNKNOWN;case je.DEADLINE_EXCEEDED:return B.DEADLINE_EXCEEDED;case je.RESOURCE_EXHAUSTED:return B.RESOURCE_EXHAUSTED;case je.INTERNAL:return B.INTERNAL;case je.UNAVAILABLE:return B.UNAVAILABLE;case je.UNAUTHENTICATED:return B.UNAUTHENTICATED;case je.INVALID_ARGUMENT:return B.INVALID_ARGUMENT;case je.NOT_FOUND:return B.NOT_FOUND;case je.ALREADY_EXISTS:return B.ALREADY_EXISTS;case je.PERMISSION_DENIED:return B.PERMISSION_DENIED;case je.FAILED_PRECONDITION:return B.FAILED_PRECONDITION;case je.ABORTED:return B.ABORTED;case je.OUT_OF_RANGE:return B.OUT_OF_RANGE;case je.UNIMPLEMENTED:return B.UNIMPLEMENTED;case je.DATA_LOSS:return B.DATA_LOSS;default:return ee()}}(ve=je||(je={}))[ve.OK=0]="OK",ve[ve.CANCELLED=1]="CANCELLED",ve[ve.UNKNOWN=2]="UNKNOWN",ve[ve.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ve[ve.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ve[ve.NOT_FOUND=5]="NOT_FOUND",ve[ve.ALREADY_EXISTS=6]="ALREADY_EXISTS",ve[ve.PERMISSION_DENIED=7]="PERMISSION_DENIED",ve[ve.UNAUTHENTICATED=16]="UNAUTHENTICATED",ve[ve.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ve[ve.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ve[ve.ABORTED=10]="ABORTED",ve[ve.OUT_OF_RANGE=11]="OUT_OF_RANGE",ve[ve.UNIMPLEMENTED=12]="UNIMPLEMENTED",ve[ve.INTERNAL=13]="INTERNAL",ve[ve.UNAVAILABLE=14]="UNAVAILABLE",ve[ve.DATA_LOSS=15]="DATA_LOSS";/**
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
 */const RA=new Nn([4294967295,4294967295],0);function zf(n){const e=Rl().encode(n),t=new fg;return t.update(e),new Uint8Array(t.digest())}function Gf(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Nn([t,r],0),new Nn([s,i],0)]}class Mu{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new ci(`Invalid padding: ${t}`);if(r<0)throw new ci(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new ci(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new ci(`Invalid padding when bitmap length is 0: ${t}`);this.Ee=8*e.length-t,this.de=Nn.fromNumber(this.Ee)}Ae(e,t,r){let s=e.add(t.multiply(Nn.fromNumber(r)));return s.compare(RA)===1&&(s=new Nn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.de).toNumber()}Re(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.Ee===0)return!1;const t=zf(e),[r,s]=Gf(t);for(let i=0;i<this.hashCount;i++){const o=this.Ae(r,s,i);if(!this.Re(o))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new Mu(i,s,t);return r.forEach(c=>o.insert(c)),o}insert(e){if(this.Ee===0)return;const t=zf(e),[r,s]=Gf(t);for(let i=0;i<this.hashCount;i++){const o=this.Ae(r,s,i);this.Ve(o)}}Ve(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class ci extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hc{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,Zi.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new hc(ie.min(),s,new xe(ue),Et(),me())}}class Zi{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Zi(r,t,me(),me(),me())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class na{constructor(e,t,r,s){this.me=e,this.removedTargetIds=t,this.key=r,this.fe=s}}class f_{constructor(e,t){this.targetId=e,this.ge=t}}class p_{constructor(e,t,r=ze.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class Hf{constructor(){this.pe=0,this.ye=Kf(),this.we=ze.EMPTY_BYTE_STRING,this.Se=!1,this.be=!0}get current(){return this.Se}get resumeToken(){return this.we}get De(){return this.pe!==0}get ve(){return this.be}Ce(e){e.approximateByteSize()>0&&(this.be=!0,this.we=e)}Fe(){let e=me(),t=me(),r=me();return this.ye.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:ee()}}),new Zi(this.we,this.Se,e,t,r)}Me(){this.be=!1,this.ye=Kf()}xe(e,t){this.be=!0,this.ye=this.ye.insert(e,t)}Oe(e){this.be=!0,this.ye=this.ye.remove(e)}Ne(){this.pe+=1}Be(){this.pe-=1,ne(this.pe>=0)}Le(){this.be=!0,this.Se=!0}}class kA{constructor(e){this.ke=e,this.qe=new Map,this.Qe=Et(),this.$e=ko(),this.Ue=ko(),this.Ke=new xe(ue)}We(e){for(const t of e.me)e.fe&&e.fe.isFoundDocument()?this.Ge(t,e.fe):this.ze(t,e.key,e.fe);for(const t of e.removedTargetIds)this.ze(t,e.key,e.fe)}je(e){this.forEachTarget(e,t=>{const r=this.He(t);switch(e.state){case 0:this.Je(t)&&r.Ce(e.resumeToken);break;case 1:r.Be(),r.De||r.Me(),r.Ce(e.resumeToken);break;case 2:r.Be(),r.De||this.removeTarget(t);break;case 3:this.Je(t)&&(r.Le(),r.Ce(e.resumeToken));break;case 4:this.Je(t)&&(this.Ye(t),r.Ce(e.resumeToken));break;default:ee()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.qe.forEach((r,s)=>{this.Je(s)&&t(s)})}Ze(e){const t=e.targetId,r=e.ge.count,s=this.Xe(t);if(s){const i=s.target;if(Ta(i))if(r===0){const o=new J(i.path);this.ze(t,o,Me.newNoDocument(o,ie.min()))}else ne(r===1);else{const o=this.et(t);if(o!==r){const c=this.tt(e),u=c?this.nt(c,e,o):1;if(u!==0){this.Ye(t);const d=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ke=this.Ke.insert(t,d)}}}}}tt(e){const t=e.ge.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let o,c;try{o=un(r).toUint8Array()}catch(u){if(u instanceof Og)return Si("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new Mu(o,s,i)}catch(u){return Si(u instanceof ci?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.Ee===0?null:c}nt(e,t,r){return t.ge.count===r-this.st(e,t.targetId)?0:2}st(e,t){const r=this.ke.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const o=this.ke.it(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.ze(t,i,null),s++)}),s}ot(e){const t=new Map;this.qe.forEach((i,o)=>{const c=this.Xe(o);if(c){if(i.current&&Ta(c.target)){const u=new J(c.target.path);this._t(u).has(o)||this.ut(o,u)||this.ze(o,u,Me.newNoDocument(u,e))}i.ve&&(t.set(o,i.Fe()),i.Me())}});let r=me();this.Ue.forEach((i,o)=>{let c=!0;o.forEachWhile(u=>{const d=this.Xe(u);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(i))}),this.Qe.forEach((i,o)=>o.setReadTime(e));const s=new hc(e,t,this.Ke,this.Qe,r);return this.Qe=Et(),this.$e=ko(),this.Ue=ko(),this.Ke=new xe(ue),s}Ge(e,t){if(!this.Je(e))return;const r=this.ut(e,t.key)?2:0;this.He(e).xe(t.key,r),this.Qe=this.Qe.insert(t.key,t),this.$e=this.$e.insert(t.key,this._t(t.key).add(e)),this.Ue=this.Ue.insert(t.key,this.ct(t.key).add(e))}ze(e,t,r){if(!this.Je(e))return;const s=this.He(e);this.ut(e,t)?s.xe(t,1):s.Oe(t),this.Ue=this.Ue.insert(t,this.ct(t).delete(e)),this.Ue=this.Ue.insert(t,this.ct(t).add(e)),r&&(this.Qe=this.Qe.insert(t,r))}removeTarget(e){this.qe.delete(e)}et(e){const t=this.He(e).Fe();return this.ke.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ne(e){this.He(e).Ne()}He(e){let t=this.qe.get(e);return t||(t=new Hf,this.qe.set(e,t)),t}ct(e){let t=this.Ue.get(e);return t||(t=new Se(ue),this.Ue=this.Ue.insert(e,t)),t}_t(e){let t=this.$e.get(e);return t||(t=new Se(ue),this.$e=this.$e.insert(e,t)),t}Je(e){const t=this.Xe(e)!==null;return t||K("WatchChangeAggregator","Detected inactive target",e),t}Xe(e){const t=this.qe.get(e);return t&&t.De?null:this.ke.lt(e)}Ye(e){this.qe.set(e,new Hf),this.ke.getRemoteKeysForTarget(e).forEach(t=>{this.ze(e,t,null)})}ut(e,t){return this.ke.getRemoteKeysForTarget(e).has(t)}}function ko(){return new xe(J.comparator)}function Kf(){return new xe(J.comparator)}const CA={asc:"ASCENDING",desc:"DESCENDING"},PA={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},xA={and:"AND",or:"OR"};class NA{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Bl(n,e){return n.useProto3Json||tc(e)?e:{value:e}}function Ts(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function m_(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function DA(n,e){return Ts(n,e.toTimestamp())}function pt(n){return ne(!!n),ie.fromTimestamp(function(t){const r=ln(t);return new Oe(r.seconds,r.nanos)}(n))}function Fu(n,e){return $l(n,e).canonicalString()}function $l(n,e){const t=function(s){return new Ie(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function g_(n){const e=Ie.fromString(n);return ne(A_(e)),e}function Ra(n,e){return Fu(n.databaseId,e.path)}function gr(n,e){const t=g_(e);if(t.get(1)!==n.databaseId.projectId)throw new W(B.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new W(B.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new J(y_(t))}function __(n,e){return Fu(n.databaseId,e)}function v_(n){const e=g_(n);return e.length===4?Ie.emptyPath():y_(e)}function ql(n){return new Ie(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function y_(n){return ne(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function Wf(n,e,t){return{name:Ra(n,e),fields:t.value.mapValue.fields}}function VA(n,e,t){const r=gr(n,e.name),s=pt(e.updateTime),i=e.createTime?pt(e.createTime):ie.min(),o=new st({mapValue:{fields:e.fields}}),c=Me.newFoundDocument(r,s,i,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function OA(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:ee()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(d,f){return d.useProto3Json?(ne(f===void 0||typeof f=="string"),ze.fromBase64String(f||"")):(ne(f===void 0||f instanceof Buffer||f instanceof Uint8Array),ze.fromUint8Array(f||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&function(d){const f=d.code===void 0?B.UNKNOWN:h_(d.code);return new W(f,d.message||"")}(o);t=new p_(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=gr(n,r.document.name),i=pt(r.document.updateTime),o=r.document.createTime?pt(r.document.createTime):ie.min(),c=new st({mapValue:{fields:r.document.fields}}),u=Me.newFoundDocument(s,i,o,c),d=r.targetIds||[],f=r.removedTargetIds||[];t=new na(d,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=gr(n,r.document),i=r.readTime?pt(r.readTime):ie.min(),o=Me.newNoDocument(s,i),c=r.removedTargetIds||[];t=new na([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=gr(n,r.document),i=r.removedTargetIds||[];t=new na([],i,s,null)}else{if(!("filter"in e))return ee();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new AA(s,i),c=r.targetId;t=new f_(c,o)}}return t}function ka(n,e){let t;if(e instanceof Os)t={update:Wf(n,e.key,e.value)};else if(e instanceof dc)t={delete:Ra(n,e.key)};else if(e instanceof fn)t={update:Wf(n,e.key,e.data),updateMask:$A(e.fieldMask)};else{if(!(e instanceof d_))return ee();t={verify:Ra(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,o){const c=o.transform;if(c instanceof Mi)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof ws)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Is)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Es)return{fieldPath:o.field.canonicalString(),increment:c.Ie};throw ee()}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:DA(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:ee()}(n,e.precondition)),t}function jl(n,e){const t=e.currentDocument?function(i){return i.updateTime!==void 0?it.updateTime(pt(i.updateTime)):i.exists!==void 0?it.exists(i.exists):it.none()}(e.currentDocument):it.none(),r=e.updateTransforms?e.updateTransforms.map(s=>function(o,c){let u=null;if("setToServerValue"in c)ne(c.setToServerValue==="REQUEST_TIME"),u=new Mi;else if("appendMissingElements"in c){const f=c.appendMissingElements.values||[];u=new ws(f)}else if("removeAllFromArray"in c){const f=c.removeAllFromArray.values||[];u=new Is(f)}else"increment"in c?u=new Es(o,c.increment):ee();const d=Ve.fromServerFormat(c.fieldPath);return new c_(d,u)}(n,s)):[];if(e.update){e.update.name;const s=gr(n,e.update.name),i=new st({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(u){const d=u.fieldPaths||[];return new gt(d.map(f=>Ve.fromServerFormat(f)))}(e.updateMask);return new fn(s,i,o,t,r)}return new Os(s,i,t,r)}if(e.delete){const s=gr(n,e.delete);return new dc(s,t)}if(e.verify){const s=gr(n,e.verify);return new d_(s,t)}return ee()}function LA(n,e){return n&&n.length>0?(ne(e!==void 0),n.map(t=>function(s,i){let o=s.updateTime?pt(s.updateTime):pt(i);return o.isEqual(ie.min())&&(o=pt(i)),new IA(o,s.transformResults||[])}(t,e))):[]}function b_(n,e){return{documents:[__(n,e.path)]}}function w_(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=__(n,s);const i=function(d){if(d.length!==0)return T_(Ae.create(d,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const o=function(d){if(d.length!==0)return d.map(f=>function(g){return{field:Jr(g.field),direction:FA(g.dir)}}(f))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=Bl(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{ht:t,parent:s}}function I_(n){let e=v_(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){ne(r===1);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=function(p){const g=E_(p);return g instanceof Ae&&xu(g)?g.getFilters():[g]}(t.where));let o=[];t.orderBy&&(o=function(p){return p.map(g=>function(I){return new Li(Xr(I.field),function(A){switch(A){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(I.direction))}(g))}(t.orderBy));let c=null;t.limit&&(c=function(p){let g;return g=typeof p=="object"?p.value:p,tc(g)?null:g}(t.limit));let u=null;t.startAt&&(u=function(p){const g=!!p.before,_=p.values||[];return new Mn(_,g)}(t.startAt));let d=null;return t.endAt&&(d=function(p){const g=!p.before,_=p.values||[];return new Mn(_,g)}(t.endAt)),uA(e,s,o,i,c,"F",u,d)}function MA(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return ee()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function E_(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Xr(t.unaryFilter.field);return _e.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Xr(t.unaryFilter.field);return _e.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Xr(t.unaryFilter.field);return _e.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Xr(t.unaryFilter.field);return _e.create(o,"!=",{nullValue:"NULL_VALUE"});default:return ee()}}(n):n.fieldFilter!==void 0?function(t){return _e.create(Xr(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return ee()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Ae.create(t.compositeFilter.filters.map(r=>E_(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return ee()}}(t.compositeFilter.op))}(n):ee()}function FA(n){return CA[n]}function UA(n){return PA[n]}function BA(n){return xA[n]}function Jr(n){return{fieldPath:n.canonicalString()}}function Xr(n){return Ve.fromServerFormat(n.fieldPath)}function T_(n){return n instanceof _e?function(t){if(t.op==="=="){if(Nf(t.value))return{unaryFilter:{field:Jr(t.field),op:"IS_NAN"}};if(xf(t.value))return{unaryFilter:{field:Jr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Nf(t.value))return{unaryFilter:{field:Jr(t.field),op:"IS_NOT_NAN"}};if(xf(t.value))return{unaryFilter:{field:Jr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Jr(t.field),op:UA(t.op),value:t.value}}}(n):n instanceof Ae?function(t){const r=t.getFilters().map(s=>T_(s));return r.length===1?r[0]:{compositeFilter:{op:BA(t.op),filters:r}}}(n):ee()}function $A(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function A_(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class on{constructor(e,t,r,s,i=ie.min(),o=ie.min(),c=ze.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new on(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new on(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new on(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new on(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S_{constructor(e){this.Tt=e}}function qA(n,e){let t;if(e.document)t=VA(n.Tt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const r=J.fromSegments(e.noDocument.path),s=Ar(e.noDocument.readTime);t=Me.newNoDocument(r,s),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return ee();{const r=J.fromSegments(e.unknownDocument.path),s=Ar(e.unknownDocument.version);t=Me.newUnknownDocument(r,s)}}return e.readTime&&t.setReadTime(function(s){const i=new Oe(s[0],s[1]);return ie.fromTimestamp(i)}(e.readTime)),t}function Qf(n,e){const t=e.key,r={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:Ca(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=function(i,o){return{name:Ra(i,o.key),fields:o.data.value.mapValue.fields,updateTime:Ts(i,o.version.toTimestamp()),createTime:Ts(i,o.createTime.toTimestamp())}}(n.Tt,e);else if(e.isNoDocument())r.noDocument={path:t.path.toArray(),readTime:Tr(e.version)};else{if(!e.isUnknownDocument())return ee();r.unknownDocument={path:t.path.toArray(),version:Tr(e.version)}}return r}function Ca(n){const e=n.toTimestamp();return[e.seconds,e.nanoseconds]}function Tr(n){const e=n.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function Ar(n){const e=new Oe(n.seconds,n.nanoseconds);return ie.fromTimestamp(e)}function ar(n,e){const t=(e.baseMutations||[]).map(i=>jl(n.Tt,i));for(let i=0;i<e.mutations.length-1;++i){const o=e.mutations[i];if(i+1<e.mutations.length&&e.mutations[i+1].transform!==void 0){const c=e.mutations[i+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(i+1,1),++i}}const r=e.mutations.map(i=>jl(n.Tt,i)),s=Oe.fromMillis(e.localWriteTimeMs);return new Vu(e.batchId,s,t,r)}function li(n){const e=Ar(n.readTime),t=n.lastLimboFreeSnapshotVersion!==void 0?Ar(n.lastLimboFreeSnapshotVersion):ie.min();let r;return r=function(i){return i.documents!==void 0}(n.query)?function(i){return ne(i.documents.length===1),xt(Ji(v_(i.documents[0])))}(n.query):function(i){return xt(I_(i))}(n.query),new on(r,n.targetId,"TargetPurposeListen",n.lastListenSequenceNumber,e,t,ze.fromBase64String(n.resumeToken))}function R_(n,e){const t=Tr(e.snapshotVersion),r=Tr(e.lastLimboFreeSnapshotVersion);let s;s=Ta(e.target)?b_(n.Tt,e.target):w_(n.Tt,e.target).ht;const i=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:Er(e.target),readTime:t,resumeToken:i,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:s}}function k_(n){const e=I_({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Sa(e,e.limit,"L"):e}function rl(n,e){return new Lu(e.largestBatchId,jl(n.Tt,e.overlayMutation))}function Yf(n,e){const t=e.path.lastSegment();return[n,ot(e.path.popLast()),t]}function Jf(n,e,t,r){return{indexId:n,uid:e,sequenceNumber:t,readTime:Tr(r.readTime),documentKey:ot(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jA{getBundleMetadata(e,t){return Xf(e).get(t).next(r=>{if(r)return function(i){return{id:i.bundleId,createTime:Ar(i.createTime),version:i.version}}(r)})}saveBundleMetadata(e,t){return Xf(e).put(function(s){return{bundleId:s.id,createTime:Tr(pt(s.createTime)),version:s.version}}(t))}getNamedQuery(e,t){return Zf(e).get(t).next(r=>{if(r)return function(i){return{name:i.name,query:k_(i.bundledQuery),readTime:Ar(i.readTime)}}(r)})}saveNamedQuery(e,t){return Zf(e).put(function(s){return{name:s.name,readTime:Tr(pt(s.readTime)),bundledQuery:s.bundledQuery}}(t))}}function Xf(n){return Ke(n,nc)}function Zf(n){return Ke(n,rc)}/**
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
 */class fc{constructor(e,t){this.serializer=e,this.userId=t}static It(e,t){const r=t.uid||"";return new fc(e,r)}getOverlay(e,t){return Js(e).get(Yf(this.userId,t)).next(r=>r?rl(this.serializer,r):null)}getOverlays(e,t){const r=zt();return D.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){const s=[];return r.forEach((i,o)=>{const c=new Lu(t,o);s.push(this.Et(e,c))}),D.waitFor(s)}removeOverlaysForBatchId(e,t,r){const s=new Set;t.forEach(o=>s.add(ot(o.getCollectionPath())));const i=[];return s.forEach(o=>{const c=IDBKeyRange.bound([this.userId,o,r],[this.userId,o,r+1],!1,!0);i.push(Js(e).J(Nl,c))}),D.waitFor(i)}getOverlaysForCollection(e,t,r){const s=zt(),i=ot(t),o=IDBKeyRange.bound([this.userId,i,r],[this.userId,i,Number.POSITIVE_INFINITY],!0);return Js(e).G(Nl,o).next(c=>{for(const u of c){const d=rl(this.serializer,u);s.set(d.getKey(),d)}return s})}getOverlaysForCollectionGroup(e,t,r,s){const i=zt();let o;const c=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Js(e).Z({index:Pg,range:c},(u,d,f)=>{const p=rl(this.serializer,d);i.size()<s||p.largestBatchId===o?(i.set(p.getKey(),p),o=p.largestBatchId):f.done()}).next(()=>i)}Et(e,t){return Js(e).put(function(s,i,o){const[c,u,d]=Yf(i,o.mutation.key);return{userId:i,collectionPath:u,documentId:d,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:ka(s.Tt,o.mutation)}}(this.serializer,this.userId,t))}}function Js(n){return Ke(n,sc)}/**
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
 */class zA{dt(e){return Ke(e,Ru)}getSessionToken(e){return this.dt(e).get("sessionToken").next(t=>{const r=t?.value;return r?ze.fromUint8Array(r):ze.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.dt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
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
 */class cr{constructor(){}At(e,t){this.Rt(e,t),t.Vt()}Rt(e,t){if("nullValue"in e)this.ft(t,5);else if("booleanValue"in e)this.ft(t,10),t.gt(e.booleanValue?1:0);else if("integerValue"in e)this.ft(t,15),t.gt(Pe(e.integerValue));else if("doubleValue"in e){const r=Pe(e.doubleValue);isNaN(r)?this.ft(t,13):(this.ft(t,15),Ci(r)?t.gt(0):t.gt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.ft(t,20),typeof r=="string"&&(r=ln(r)),t.yt(`${r.seconds||""}`),t.gt(r.nanos||0)}else if("stringValue"in e)this.wt(e.stringValue,t),this.St(t);else if("bytesValue"in e)this.ft(t,30),t.bt(un(e.bytesValue)),this.St(t);else if("referenceValue"in e)this.Dt(e.referenceValue,t);else if("geoPointValue"in e){const r=e.geoPointValue;this.ft(t,45),t.gt(r.latitude||0),t.gt(r.longitude||0)}else"mapValue"in e?$g(e)?this.ft(t,Number.MAX_SAFE_INTEGER):ac(e)?this.vt(e.mapValue,t):(this.Ct(e.mapValue,t),this.St(t)):"arrayValue"in e?(this.Ft(e.arrayValue,t),this.St(t)):ee()}wt(e,t){this.ft(t,25),this.Mt(e,t)}Mt(e,t){t.yt(e)}Ct(e,t){const r=e.fields||{};this.ft(t,55);for(const s of Object.keys(r))this.wt(s,t),this.Rt(r[s],t)}vt(e,t){var r,s;const i=e.fields||{};this.ft(t,53);const o=vs,c=((s=(r=i[o].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.length)||0;this.ft(t,15),t.gt(Pe(c)),this.wt(o,t),this.Rt(i[o],t)}Ft(e,t){const r=e.values||[];this.ft(t,50);for(const s of r)this.Rt(s,t)}Dt(e,t){this.ft(t,37),J.fromName(e).path.forEach(r=>{this.ft(t,60),this.Mt(r,t)})}ft(e,t){e.gt(t)}St(e){e.gt(2)}}cr.xt=new cr;/**
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
 */const Gr=255;function GA(n){if(n===0)return 8;let e=0;return n>>4||(e+=4,n<<=4),n>>6||(e+=2,n<<=2),n>>7||(e+=1),e}function ep(n){const e=64-function(r){let s=0;for(let i=0;i<8;++i){const o=GA(255&r[i]);if(s+=o,o!==8)break}return s}(n);return Math.ceil(e/8)}class HA{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ot(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Nt(r.value),r=t.next();this.Bt()}Lt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.kt(r.value),r=t.next();this.qt()}Qt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Nt(r);else if(r<2048)this.Nt(960|r>>>6),this.Nt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Nt(480|r>>>12),this.Nt(128|63&r>>>6),this.Nt(128|63&r);else{const s=t.codePointAt(0);this.Nt(240|s>>>18),this.Nt(128|63&s>>>12),this.Nt(128|63&s>>>6),this.Nt(128|63&s)}}this.Bt()}$t(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.kt(r);else if(r<2048)this.kt(960|r>>>6),this.kt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.kt(480|r>>>12),this.kt(128|63&r>>>6),this.kt(128|63&r);else{const s=t.codePointAt(0);this.kt(240|s>>>18),this.kt(128|63&s>>>12),this.kt(128|63&s>>>6),this.kt(128|63&s)}}this.qt()}Ut(e){const t=this.Kt(e),r=ep(t);this.Wt(1+r),this.buffer[this.position++]=255&r;for(let s=t.length-r;s<t.length;++s)this.buffer[this.position++]=255&t[s]}Gt(e){const t=this.Kt(e),r=ep(t);this.Wt(1+r),this.buffer[this.position++]=~(255&r);for(let s=t.length-r;s<t.length;++s)this.buffer[this.position++]=~(255&t[s])}zt(){this.jt(Gr),this.jt(255)}Ht(){this.Jt(Gr),this.Jt(255)}reset(){this.position=0}seed(e){this.Wt(e.length),this.buffer.set(e,this.position),this.position+=e.length}Yt(){return this.buffer.slice(0,this.position)}Kt(e){const t=function(i){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,i,!1),new Uint8Array(o.buffer)}(e),r=!!(128&t[0]);t[0]^=r?255:128;for(let s=1;s<t.length;++s)t[s]^=r?255:0;return t}Nt(e){const t=255&e;t===0?(this.jt(0),this.jt(255)):t===Gr?(this.jt(Gr),this.jt(0)):this.jt(t)}kt(e){const t=255&e;t===0?(this.Jt(0),this.Jt(255)):t===Gr?(this.Jt(Gr),this.Jt(0)):this.Jt(e)}Bt(){this.jt(0),this.jt(1)}qt(){this.Jt(0),this.Jt(1)}jt(e){this.Wt(1),this.buffer[this.position++]=e}Jt(e){this.Wt(1),this.buffer[this.position++]=~e}Wt(e){const t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);const s=new Uint8Array(r);s.set(this.buffer),this.buffer=s}}class KA{constructor(e){this.Zt=e}bt(e){this.Zt.Ot(e)}yt(e){this.Zt.Qt(e)}gt(e){this.Zt.Ut(e)}Vt(){this.Zt.zt()}}class WA{constructor(e){this.Zt=e}bt(e){this.Zt.Lt(e)}yt(e){this.Zt.$t(e)}gt(e){this.Zt.Gt(e)}Vt(){this.Zt.Ht()}}class Xs{constructor(){this.Zt=new HA,this.Xt=new KA(this.Zt),this.en=new WA(this.Zt)}seed(e){this.Zt.seed(e)}tn(e){return e===0?this.Xt:this.en}Yt(){return this.Zt.Yt()}reset(){this.Zt.reset()}}/**
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
 */class lr{constructor(e,t,r,s){this.indexId=e,this.documentKey=t,this.arrayValue=r,this.directionalValue=s}nn(){const e=this.directionalValue.length,t=e===0||this.directionalValue[e-1]===255?e+1:e,r=new Uint8Array(t);return r.set(this.directionalValue,0),t!==e?r.set([0],this.directionalValue.length):++r[r.length-1],new lr(this.indexId,this.documentKey,this.arrayValue,r)}}function vn(n,e){let t=n.indexId-e.indexId;return t!==0?t:(t=tp(n.arrayValue,e.arrayValue),t!==0?t:(t=tp(n.directionalValue,e.directionalValue),t!==0?t:J.comparator(n.documentKey,e.documentKey)))}function tp(n,e){for(let t=0;t<n.length&&t<e.length;++t){const r=n[t]-e[t];if(r!==0)return r}return n.length-e.length}/**
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
 */class np{constructor(e){this.rn=new Se((t,r)=>Ve.comparator(t.field,r.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.sn=e.orderBy,this._n=[];for(const t of e.filters){const r=t;r.isInequality()?this.rn=this.rn.add(r):this._n.push(r)}}get an(){return this.rn.size>1}un(e){if(ne(e.collectionGroup===this.collectionId),this.an)return!1;const t=Cl(e);if(t!==void 0&&!this.cn(t))return!1;const r=nr(e);let s=new Set,i=0,o=0;for(;i<r.length&&this.cn(r[i]);++i)s=s.add(r[i].fieldPath.canonicalString());if(i===r.length)return!0;if(this.rn.size>0){const c=this.rn.getIterator().getNext();if(!s.has(c.field.canonicalString())){const u=r[i];if(!this.ln(c,u)||!this.hn(this.sn[o++],u))return!1}++i}for(;i<r.length;++i){const c=r[i];if(o>=this.sn.length||!this.hn(this.sn[o++],c))return!1}return!0}Pn(){if(this.an)return null;let e=new Se(Ve.comparator);const t=[];for(const r of this._n)if(!r.field.isKeyField())if(r.op==="array-contains"||r.op==="array-contains-any")t.push(new Qo(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),t.push(new Qo(r.field,0))}for(const r of this.sn)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),t.push(new Qo(r.field,r.dir==="asc"?0:1)));return new _a(_a.UNKNOWN_ID,this.collectionId,t,ki.empty())}cn(e){for(const t of this._n)if(this.ln(t,e))return!0;return!1}ln(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const r=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===r}hn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
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
 */function C_(n){var e,t;if(ne(n instanceof _e||n instanceof Ae),n instanceof _e){if(n instanceof Yg){const s=((t=(e=n.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map(i=>_e.create(n.field,"==",i)))||[];return Ae.create(s,"or")}return n}const r=n.filters.map(s=>C_(s));return Ae.create(r,n.op)}function QA(n){if(n.getFilters().length===0)return[];const e=Hl(C_(n));return ne(P_(e)),zl(e)||Gl(e)?[e]:e.getFilters()}function zl(n){return n instanceof _e}function Gl(n){return n instanceof Ae&&xu(n)}function P_(n){return zl(n)||Gl(n)||function(t){if(t instanceof Ae&&Ll(t)){for(const r of t.getFilters())if(!zl(r)&&!Gl(r))return!1;return!0}return!1}(n)}function Hl(n){if(ne(n instanceof _e||n instanceof Ae),n instanceof _e)return n;if(n.filters.length===1)return Hl(n.filters[0]);const e=n.filters.map(r=>Hl(r));let t=Ae.create(e,n.op);return t=Pa(t),P_(t)?t:(ne(t instanceof Ae),ne(bs(t)),ne(t.filters.length>1),t.filters.reduce((r,s)=>Uu(r,s)))}function Uu(n,e){let t;return ne(n instanceof _e||n instanceof Ae),ne(e instanceof _e||e instanceof Ae),t=n instanceof _e?e instanceof _e?function(s,i){return Ae.create([s,i],"and")}(n,e):rp(n,e):e instanceof _e?rp(e,n):function(s,i){if(ne(s.filters.length>0&&i.filters.length>0),bs(s)&&bs(i))return Kg(s,i.getFilters());const o=Ll(s)?s:i,c=Ll(s)?i:s,u=o.filters.map(d=>Uu(d,c));return Ae.create(u,"or")}(n,e),Pa(t)}function rp(n,e){if(bs(e))return Kg(e,n.getFilters());{const t=e.filters.map(r=>Uu(n,r));return Ae.create(t,"or")}}function Pa(n){if(ne(n instanceof _e||n instanceof Ae),n instanceof _e)return n;const e=n.getFilters();if(e.length===1)return Pa(e[0]);if(Gg(n))return n;const t=e.map(s=>Pa(s)),r=[];return t.forEach(s=>{s instanceof _e?r.push(s):s instanceof Ae&&(s.op===n.op?r.push(...s.filters):r.push(s))}),r.length===1?r[0]:Ae.create(r,n.op)}/**
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
 */class YA{constructor(){this.Tn=new Bu}addToCollectionParentIndex(e,t){return this.Tn.add(t),D.resolve()}getCollectionParents(e,t){return D.resolve(this.Tn.getEntries(t))}addFieldIndex(e,t){return D.resolve()}deleteFieldIndex(e,t){return D.resolve()}deleteAllFieldIndexes(e){return D.resolve()}createTargetIndexes(e,t){return D.resolve()}getDocumentsMatchingTarget(e,t){return D.resolve(null)}getIndexType(e,t){return D.resolve(0)}getFieldIndexes(e,t){return D.resolve([])}getNextCollectionGroupToUpdate(e){return D.resolve(null)}getMinOffset(e,t){return D.resolve(Rt.min())}getMinOffsetFromCollectionGroup(e,t){return D.resolve(Rt.min())}updateCollectionGroup(e,t,r){return D.resolve()}updateIndexEntries(e,t){return D.resolve()}}class Bu{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new Se(Ie.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Se(Ie.comparator)).toArray()}}/**
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
 */const sp="IndexedDbIndexManager",Co=new Uint8Array(0);class JA{constructor(e,t){this.databaseId=t,this.In=new Bu,this.En=new hn(r=>Er(r),(r,s)=>Yi(r,s)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.In.has(t)){const r=t.lastSegment(),s=t.popLast();e.addOnCommittedListener(()=>{this.In.add(t)});const i={collectionId:r,parent:ot(s)};return ip(e).put(i)}return D.resolve()}getCollectionParents(e,t){const r=[],s=IDBKeyRange.bound([t,""],[bg(t),""],!1,!0);return ip(e).G(s).next(i=>{for(const o of i){if(o.collectionId!==t)break;r.push(jt(o.parent))}return r})}addFieldIndex(e,t){const r=Zs(e),s=function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map(u=>[u.fieldPath.canonicalString(),u.kind])}}(t);delete s.indexId;const i=r.add(s);if(t.indexState){const o=Kr(e);return i.next(c=>{o.put(Jf(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return i.next()}deleteFieldIndex(e,t){const r=Zs(e),s=Kr(e),i=Hr(e);return r.delete(t.indexId).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=Zs(e),r=Hr(e),s=Kr(e);return t.J().next(()=>r.J()).next(()=>s.J())}createTargetIndexes(e,t){return D.forEach(this.dn(t),r=>this.getIndexType(e,r).next(s=>{if(s===0||s===1){const i=new np(r).Pn();if(i!=null)return this.addFieldIndex(e,i)}}))}getDocumentsMatchingTarget(e,t){const r=Hr(e);let s=!0;const i=new Map;return D.forEach(this.dn(t),o=>this.An(e,o).next(c=>{s&&(s=!!c),i.set(o,c)})).next(()=>{if(s){let o=me();const c=[];return D.forEach(i,(u,d)=>{K(sp,`Using index ${function(P){return`id=${P.indexId}|cg=${P.collectionGroup}|f=${P.fields.map(L=>`${L.fieldPath}:${L.kind}`).join(",")}`}(u)} to execute ${Er(t)}`);const f=function(P,L){const C=Cl(L);if(C===void 0)return null;for(const M of Aa(P,C.fieldPath))switch(M.op){case"array-contains-any":return M.value.arrayValue.values||[];case"array-contains":return[M.value]}return null}(d,u),p=function(P,L){const C=new Map;for(const M of nr(L))for(const E of Aa(P,M.fieldPath))switch(E.op){case"==":case"in":C.set(M.fieldPath.canonicalString(),E.value);break;case"not-in":case"!=":return C.set(M.fieldPath.canonicalString(),E.value),Array.from(C.values())}return null}(d,u),g=function(P,L){const C=[];let M=!0;for(const E of nr(L)){const v=E.kind===0?Mf(P,E.fieldPath,P.startAt):Ff(P,E.fieldPath,P.startAt);C.push(v.value),M&&(M=v.inclusive)}return new Mn(C,M)}(d,u),_=function(P,L){const C=[];let M=!0;for(const E of nr(L)){const v=E.kind===0?Ff(P,E.fieldPath,P.endAt):Mf(P,E.fieldPath,P.endAt);C.push(v.value),M&&(M=v.inclusive)}return new Mn(C,M)}(d,u),I=this.Rn(u,d,g),S=this.Rn(u,d,_),A=this.Vn(u,d,p),V=this.mn(u.indexId,f,I,g.inclusive,S,_.inclusive,A);return D.forEach(V,k=>r.H(k,t.limit).next(P=>{P.forEach(L=>{const C=J.fromSegments(L.documentKey);o.has(C)||(o=o.add(C),c.push(C))})}))}).next(()=>c)}return D.resolve(null)})}dn(e){let t=this.En.get(e);return t||(e.filters.length===0?t=[e]:t=QA(Ae.create(e.filters,"and")).map(r=>Fl(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt)),this.En.set(e,t),t)}mn(e,t,r,s,i,o,c){const u=(t!=null?t.length:1)*Math.max(r.length,i.length),d=u/(t!=null?t.length:1),f=[];for(let p=0;p<u;++p){const g=t?this.fn(t[p/d]):Co,_=this.gn(e,g,r[p%d],s),I=this.pn(e,g,i[p%d],o),S=c.map(A=>this.gn(e,g,A,!0));f.push(...this.createRange(_,I,S))}return f}gn(e,t,r,s){const i=new lr(e,J.empty(),t,r);return s?i:i.nn()}pn(e,t,r,s){const i=new lr(e,J.empty(),t,r);return s?i.nn():i}An(e,t){const r=new np(t),s=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,s).next(i=>{let o=null;for(const c of i)r.un(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o})}getIndexType(e,t){let r=2;const s=this.dn(t);return D.forEach(s,i=>this.An(e,i).next(o=>{o?r!==0&&o.fields.length<function(u){let d=new Se(Ve.comparator),f=!1;for(const p of u.filters)for(const g of p.getFlattenedFilters())g.field.isKeyField()||(g.op==="array-contains"||g.op==="array-contains-any"?f=!0:d=d.add(g.field));for(const p of u.orderBy)p.field.isKeyField()||(d=d.add(p.field));return d.size+(f?1:0)}(i)&&(r=1):r=0})).next(()=>function(o){return o.limit!==null}(t)&&s.length>1&&r===2?1:r)}yn(e,t){const r=new Xs;for(const s of nr(e)){const i=t.data.field(s.fieldPath);if(i==null)return null;const o=r.tn(s.kind);cr.xt.At(i,o)}return r.Yt()}fn(e){const t=new Xs;return cr.xt.At(e,t.tn(0)),t.Yt()}wn(e,t){const r=new Xs;return cr.xt.At(Ir(this.databaseId,t),r.tn(function(i){const o=nr(i);return o.length===0?0:o[o.length-1].kind}(e))),r.Yt()}Vn(e,t,r){if(r===null)return[];let s=[];s.push(new Xs);let i=0;for(const o of nr(e)){const c=r[i++];for(const u of s)if(this.Sn(t,o.fieldPath)&&Oi(c))s=this.bn(s,o,c);else{const d=u.tn(o.kind);cr.xt.At(c,d)}}return this.Dn(s)}Rn(e,t,r){return this.Vn(e,t,r.position)}Dn(e){const t=[];for(let r=0;r<e.length;++r)t[r]=e[r].Yt();return t}bn(e,t,r){const s=[...e],i=[];for(const o of r.arrayValue.values||[])for(const c of s){const u=new Xs;u.seed(c.Yt()),cr.xt.At(o,u.tn(t.kind)),i.push(u)}return i}Sn(e,t){return!!e.filters.find(r=>r instanceof _e&&r.field.isEqual(t)&&(r.op==="in"||r.op==="not-in"))}getFieldIndexes(e,t){const r=Zs(e),s=Kr(e);return(t?r.G(xl,IDBKeyRange.bound(t,t)):r.G()).next(i=>{const o=[];return D.forEach(i,c=>s.get([c.indexId,this.uid]).next(u=>{o.push(function(f,p){const g=p?new ki(p.sequenceNumber,new Rt(Ar(p.readTime),new J(jt(p.documentKey)),p.largestBatchId)):ki.empty(),_=f.fields.map(([I,S])=>new Qo(Ve.fromServerFormat(I),S));return new _a(f.indexId,f.collectionGroup,_,g)}(c,u))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((r,s)=>{const i=r.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:ue(r.collectionGroup,s.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,r){const s=Zs(e),i=Kr(e);return this.vn(e).next(o=>s.G(xl,IDBKeyRange.bound(t,t)).next(c=>D.forEach(c,u=>i.put(Jf(u.indexId,this.uid,o,r)))))}updateIndexEntries(e,t){const r=new Map;return D.forEach(t,(s,i)=>{const o=r.get(s.collectionGroup);return(o?D.resolve(o):this.getFieldIndexes(e,s.collectionGroup)).next(c=>(r.set(s.collectionGroup,c),D.forEach(c,u=>this.Cn(e,s,u).next(d=>{const f=this.Fn(i,u);return d.isEqual(f)?D.resolve():this.Mn(e,i,u,d,f)}))))})}xn(e,t,r,s){return Hr(e).put({indexId:s.indexId,uid:this.uid,arrayValue:s.arrayValue,directionalValue:s.directionalValue,orderedDocumentKey:this.wn(r,t.key),documentKey:t.key.path.toArray()})}On(e,t,r,s){return Hr(e).delete([s.indexId,this.uid,s.arrayValue,s.directionalValue,this.wn(r,t.key),t.key.path.toArray()])}Cn(e,t,r){const s=Hr(e);let i=new Se(vn);return s.Z({index:Cg,range:IDBKeyRange.only([r.indexId,this.uid,this.wn(r,t)])},(o,c)=>{i=i.add(new lr(r.indexId,t,c.arrayValue,c.directionalValue))}).next(()=>i)}Fn(e,t){let r=new Se(vn);const s=this.yn(t,e);if(s==null)return r;const i=Cl(t);if(i!=null){const o=e.data.field(i.fieldPath);if(Oi(o))for(const c of o.arrayValue.values||[])r=r.add(new lr(t.indexId,e.key,this.fn(c),s))}else r=r.add(new lr(t.indexId,e.key,Co,s));return r}Mn(e,t,r,s,i){K(sp,"Updating index entries for document '%s'",t.key);const o=[];return function(u,d,f,p,g){const _=u.getIterator(),I=d.getIterator();let S=zr(_),A=zr(I);for(;S||A;){let V=!1,k=!1;if(S&&A){const P=f(S,A);P<0?k=!0:P>0&&(V=!0)}else S!=null?k=!0:V=!0;V?(p(A),A=zr(I)):k?(g(S),S=zr(_)):(S=zr(_),A=zr(I))}}(s,i,vn,c=>{o.push(this.xn(e,t,r,c))},c=>{o.push(this.On(e,t,r,c))}),D.waitFor(o)}vn(e){let t=1;return Kr(e).Z({index:kg,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(r,s,i)=>{i.done(),t=s.sequenceNumber+1}).next(()=>t)}createRange(e,t,r){r=r.sort((o,c)=>vn(o,c)).filter((o,c,u)=>!c||vn(o,u[c-1])!==0);const s=[];s.push(e);for(const o of r){const c=vn(o,e),u=vn(o,t);if(c===0)s[0]=e.nn();else if(c>0&&u<0)s.push(o),s.push(o.nn());else if(u>0)break}s.push(t);const i=[];for(let o=0;o<s.length;o+=2){if(this.Nn(s[o],s[o+1]))return[];const c=[s[o].indexId,this.uid,s[o].arrayValue,s[o].directionalValue,Co,[]],u=[s[o+1].indexId,this.uid,s[o+1].arrayValue,s[o+1].directionalValue,Co,[]];i.push(IDBKeyRange.bound(c,u))}return i}Nn(e,t){return vn(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(op)}getMinOffset(e,t){return D.mapArray(this.dn(t),r=>this.An(e,r).next(s=>s||ee())).next(op)}}function ip(n){return Ke(n,Ni)}function Hr(n){return Ke(n,Ia)}function Zs(n){return Ke(n,Su)}function Kr(n){return Ke(n,wa)}function op(n){ne(n.length!==0);let e=n[0].indexState.offset,t=e.largestBatchId;for(let r=1;r<n.length;r++){const s=n[r].indexState.offset;Eu(s,e)<0&&(e=s),t<s.largestBatchId&&(t=s.largestBatchId)}return new Rt(e.readTime,e.documentKey,t)}/**
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
 */const ap={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},x_=41943040;class rt{static withCacheSize(e){return new rt(e,rt.DEFAULT_COLLECTION_PERCENTILE,rt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function N_(n,e,t){const r=n.store(Dt),s=n.store(ps),i=[],o=IDBKeyRange.only(t.batchId);let c=0;const u=r.Z({range:o},(f,p,g)=>(c++,g.delete()));i.push(u.next(()=>{ne(c===1)}));const d=[];for(const f of t.mutations){const p=Ag(e,f.key.path,t.batchId);i.push(s.delete(p)),d.push(f.key)}return D.waitFor(i).next(()=>d)}function xa(n){if(!n)return 0;let e;if(n.document)e=n.document;else if(n.unknownDocument)e=n.unknownDocument;else{if(!n.noDocument)throw ee();e=n.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */rt.DEFAULT_COLLECTION_PERCENTILE=10,rt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,rt.DEFAULT=new rt(x_,rt.DEFAULT_COLLECTION_PERCENTILE,rt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),rt.DISABLED=new rt(-1,0,0);class pc{constructor(e,t,r,s){this.userId=e,this.serializer=t,this.indexManager=r,this.referenceDelegate=s,this.Bn={}}static It(e,t,r,s){ne(e.uid!=="");const i=e.isAuthenticated()?e.uid:"";return new pc(i,t,r,s)}checkEmpty(e){let t=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return yn(e).Z({index:ur,range:r},(s,i,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,r,s){const i=Zr(e),o=yn(e);return o.add({}).next(c=>{ne(typeof c=="number");const u=new Vu(c,t,r,s),d=function(_,I,S){const A=S.baseMutations.map(k=>ka(_.Tt,k)),V=S.mutations.map(k=>ka(_.Tt,k));return{userId:I,batchId:S.batchId,localWriteTimeMs:S.localWriteTime.toMillis(),baseMutations:A,mutations:V}}(this.serializer,this.userId,u),f=[];let p=new Se((g,_)=>ue(g.canonicalString(),_.canonicalString()));for(const g of s){const _=Ag(this.userId,g.key.path,c);p=p.add(g.key.path.popLast()),f.push(o.put(d)),f.push(i.put(_,kT))}return p.forEach(g=>{f.push(this.indexManager.addToCollectionParentIndex(e,g))}),e.addOnCommittedListener(()=>{this.Bn[c]=u.keys()}),D.waitFor(f).next(()=>u)})}lookupMutationBatch(e,t){return yn(e).get(t).next(r=>r?(ne(r.userId===this.userId),ar(this.serializer,r)):null)}Ln(e,t){return this.Bn[t]?D.resolve(this.Bn[t]):this.lookupMutationBatch(e,t).next(r=>{if(r){const s=r.keys();return this.Bn[t]=s,s}return null})}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=IDBKeyRange.lowerBound([this.userId,r]);let i=null;return yn(e).Z({index:ur,range:s},(o,c,u)=>{c.userId===this.userId&&(ne(c.batchId>=r),i=ar(this.serializer,c)),u.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=pr;return yn(e).Z({index:ur,range:t,reverse:!0},(s,i,o)=>{r=i.batchId,o.done()}).next(()=>r)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,pr],[this.userId,Number.POSITIVE_INFINITY]);return yn(e).G(ur,t).next(r=>r.map(s=>ar(this.serializer,s)))}getAllMutationBatchesAffectingDocumentKey(e,t){const r=Yo(this.userId,t.path),s=IDBKeyRange.lowerBound(r),i=[];return Zr(e).Z({range:s},(o,c,u)=>{const[d,f,p]=o,g=jt(f);if(d===this.userId&&t.path.isEqual(g))return yn(e).get(p).next(_=>{if(!_)throw ee();ne(_.userId===this.userId),i.push(ar(this.serializer,_))});u.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Se(ue);const s=[];return t.forEach(i=>{const o=Yo(this.userId,i.path),c=IDBKeyRange.lowerBound(o),u=Zr(e).Z({range:c},(d,f,p)=>{const[g,_,I]=d,S=jt(_);g===this.userId&&i.path.isEqual(S)?r=r.add(I):p.done()});s.push(u)}),D.waitFor(s).next(()=>this.kn(e,r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1,i=Yo(this.userId,r),o=IDBKeyRange.lowerBound(i);let c=new Se(ue);return Zr(e).Z({range:o},(u,d,f)=>{const[p,g,_]=u,I=jt(g);p===this.userId&&r.isPrefixOf(I)?I.length===s&&(c=c.add(_)):f.done()}).next(()=>this.kn(e,c))}kn(e,t){const r=[],s=[];return t.forEach(i=>{s.push(yn(e).get(i).next(o=>{if(o===null)throw ee();ne(o.userId===this.userId),r.push(ar(this.serializer,o))}))}),D.waitFor(s).next(()=>r)}removeMutationBatch(e,t){return N_(e.ue,this.userId,t).next(r=>(e.addOnCommittedListener(()=>{this.qn(t.batchId)}),D.forEach(r,s=>this.referenceDelegate.markPotentiallyOrphaned(e,s))))}qn(e){delete this.Bn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return D.resolve();const r=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),s=[];return Zr(e).Z({range:r},(i,o,c)=>{if(i[0]===this.userId){const u=jt(i[1]);s.push(u)}else c.done()}).next(()=>{ne(s.length===0)})})}containsKey(e,t){return D_(e,this.userId,t)}Qn(e){return V_(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:pr,lastStreamToken:""})}}function D_(n,e,t){const r=Yo(e,t.path),s=r[1],i=IDBKeyRange.lowerBound(r);let o=!1;return Zr(n).Z({range:i,Y:!0},(c,u,d)=>{const[f,p,g]=c;f===e&&p===s&&(o=!0),d.done()}).next(()=>o)}function yn(n){return Ke(n,Dt)}function Zr(n){return Ke(n,ps)}function V_(n){return Ke(n,Pi)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sr{constructor(e){this.$n=e}next(){return this.$n+=2,this.$n}static Un(){return new Sr(0)}static Kn(){return new Sr(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XA{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.Wn(e).next(t=>{const r=new Sr(t.highestTargetId);return t.highestTargetId=r.next(),this.Gn(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.Wn(e).next(t=>ie.fromTimestamp(new Oe(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.Wn(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,r){return this.Wn(e).next(s=>(s.highestListenSequenceNumber=t,r&&(s.lastRemoteSnapshotVersion=r.toTimestamp()),t>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=t),this.Gn(e,s)))}addTargetData(e,t){return this.zn(e,t).next(()=>this.Wn(e).next(r=>(r.targetCount+=1,this.jn(t,r),this.Gn(e,r))))}updateTargetData(e,t){return this.zn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>Wr(e).delete(t.targetId)).next(()=>this.Wn(e)).next(r=>(ne(r.targetCount>0),r.targetCount-=1,this.Gn(e,r)))}removeTargets(e,t,r){let s=0;const i=[];return Wr(e).Z((o,c)=>{const u=li(c);u.sequenceNumber<=t&&r.get(u.targetId)===null&&(s++,i.push(this.removeTargetData(e,u)))}).next(()=>D.waitFor(i)).next(()=>s)}forEachTarget(e,t){return Wr(e).Z((r,s)=>{const i=li(s);t(i)})}Wn(e){return cp(e).get(ba).next(t=>(ne(t!==null),t))}Gn(e,t){return cp(e).put(ba,t)}zn(e,t){return Wr(e).put(R_(this.serializer,t))}jn(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.Wn(e).next(t=>t.targetCount)}getTargetData(e,t){const r=Er(t),s=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let i=null;return Wr(e).Z({range:s,index:Rg},(o,c,u)=>{const d=li(c);Yi(t,d.target)&&(i=d,u.done())}).next(()=>i)}addMatchingKeys(e,t,r){const s=[],i=Sn(e);return t.forEach(o=>{const c=ot(o.path);s.push(i.put({targetId:r,path:c})),s.push(this.referenceDelegate.addReference(e,r,o))}),D.waitFor(s)}removeMatchingKeys(e,t,r){const s=Sn(e);return D.forEach(t,i=>{const o=ot(i.path);return D.waitFor([s.delete([r,o]),this.referenceDelegate.removeReference(e,r,i)])})}removeMatchingKeysForTargetId(e,t){const r=Sn(e),s=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(s)}getMatchingKeysForTargetId(e,t){const r=IDBKeyRange.bound([t],[t+1],!1,!0),s=Sn(e);let i=me();return s.Z({range:r,Y:!0},(o,c,u)=>{const d=jt(o[1]),f=new J(d);i=i.add(f)}).next(()=>i)}containsKey(e,t){const r=ot(t.path),s=IDBKeyRange.bound([r],[bg(r)],!1,!0);let i=0;return Sn(e).Z({index:Au,Y:!0,range:s},([o,c],u,d)=>{o!==0&&(i++,d.done())}).next(()=>i>0)}lt(e,t){return Wr(e).get(t).next(r=>r?li(r):null)}}function Wr(n){return Ke(n,ms)}function cp(n){return Ke(n,mr)}function Sn(n){return Ke(n,gs)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lp="LruGarbageCollector",O_=1048576;function up([n,e],[t,r]){const s=ue(n,t);return s===0?ue(e,r):s}class ZA{constructor(e){this.Hn=e,this.buffer=new Se(up),this.Jn=0}Yn(){return++this.Jn}Zn(e){const t=[e,this.Yn()];if(this.buffer.size<this.Hn)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();up(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class L_{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Xn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.er(6e4)}stop(){this.Xn&&(this.Xn.cancel(),this.Xn=null)}get started(){return this.Xn!==null}er(e){K(lp,`Garbage collection scheduled in ${e}ms`),this.Xn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Xn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){qn(t)?K(lp,"Ignoring IndexedDB error during garbage collection: ",t):await Vr(t)}await this.er(3e5)})}}class e0{constructor(e,t){this.tr=e,this.params=t}calculateTargetCount(e,t){return this.tr.nr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return D.resolve(Pt.ae);const r=new ZA(t);return this.tr.forEachTarget(e,s=>r.Zn(s.sequenceNumber)).next(()=>this.tr.rr(e,s=>r.Zn(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.tr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.tr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(K("LruGarbageCollector","Garbage collection skipped; disabled"),D.resolve(ap)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(K("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),ap):this.ir(e,t))}getCacheSize(e){return this.tr.getCacheSize(e)}ir(e,t){let r,s,i,o,c,u,d;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(K("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,o=Date.now(),this.nthSequenceNumber(e,s))).next(p=>(r=p,c=Date.now(),this.removeTargets(e,r,t))).next(p=>(i=p,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(p=>(d=Date.now(),Qr()<=ge.DEBUG&&K("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${p} documents in `+(d-u)+`ms
Total Duration: ${d-f}ms`),D.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p})))}}function M_(n,e){return new e0(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t0{constructor(e,t){this.db=e,this.garbageCollector=M_(this,t)}nr(e){const t=this.sr(e);return this.db.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}sr(e){let t=0;return this.rr(e,r=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}rr(e,t){return this._r(e,(r,s)=>t(s))}addReference(e,t,r){return Po(e,r)}removeReference(e,t,r){return Po(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return Po(e,t)}ar(e,t){return function(s,i){let o=!1;return V_(s).X(c=>D_(s,c,i).next(u=>(u&&(o=!0),D.resolve(!u)))).next(()=>o)}(e,t)}removeOrphanedDocuments(e,t){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this._r(e,(o,c)=>{if(c<=t){const u=this.ar(e,o).next(d=>{if(!d)return i++,r.getEntry(e,o).next(()=>(r.removeEntry(o,ie.min()),Sn(e).delete(function(p){return[0,ot(p.path)]}(o))))});s.push(u)}}).next(()=>D.waitFor(s)).next(()=>r.apply(e)).next(()=>i)}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return Po(e,t)}_r(e,t){const r=Sn(e);let s,i=Pt.ae;return r.Z({index:Au},([o,c],{path:u,sequenceNumber:d})=>{o===0?(i!==Pt.ae&&t(new J(jt(s)),i),i=d,s=u):i=Pt.ae}).next(()=>{i!==Pt.ae&&t(new J(jt(s)),i)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Po(n,e){return Sn(n).put(function(r,s){return{targetId:0,path:ot(r.path),sequenceNumber:s}}(e,n.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F_{constructor(){this.changes=new hn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Me.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?D.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n0{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return Xn(e).put(r)}removeEntry(e,t,r){return Xn(e).delete(function(i,o){const c=i.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],Ca(o),c[c.length-1]]}(t,r))}updateMetadata(e,t){return this.getMetadata(e).next(r=>(r.byteSize+=t,this.ur(e,r)))}getEntry(e,t){let r=Me.newInvalidDocument(t);return Xn(e).Z({index:Jo,range:IDBKeyRange.only(ei(t))},(s,i)=>{r=this.cr(t,i)}).next(()=>r)}lr(e,t){let r={size:0,document:Me.newInvalidDocument(t)};return Xn(e).Z({index:Jo,range:IDBKeyRange.only(ei(t))},(s,i)=>{r={document:this.cr(t,i),size:xa(i)}}).next(()=>r)}getEntries(e,t){let r=Et();return this.hr(e,t,(s,i)=>{const o=this.cr(s,i);r=r.insert(s,o)}).next(()=>r)}Pr(e,t){let r=Et(),s=new xe(J.comparator);return this.hr(e,t,(i,o)=>{const c=this.cr(i,o);r=r.insert(i,c),s=s.insert(i,xa(o))}).next(()=>({documents:r,Tr:s}))}hr(e,t,r){if(t.isEmpty())return D.resolve();let s=new Se(fp);t.forEach(u=>s=s.add(u));const i=IDBKeyRange.bound(ei(s.first()),ei(s.last())),o=s.getIterator();let c=o.getNext();return Xn(e).Z({index:Jo,range:i},(u,d,f)=>{const p=J.fromSegments([...d.prefixPath,d.collectionGroup,d.documentId]);for(;c&&fp(c,p)<0;)r(c,null),c=o.getNext();c&&c.isEqual(p)&&(r(c,d),c=o.hasNext()?o.getNext():null),c?f.W(ei(c)):f.done()}).next(()=>{for(;c;)r(c,null),c=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,r,s,i){const o=t.path,c=[o.popLast().toArray(),o.lastSegment(),Ca(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],u=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Xn(e).G(IDBKeyRange.bound(c,u,!0)).next(d=>{i?.incrementDocumentReadCount(d.length);let f=Et();for(const p of d){const g=this.cr(J.fromSegments(p.prefixPath.concat(p.collectionGroup,p.documentId)),p);g.isFoundDocument()&&(Xi(t,g)||s.has(g.key))&&(f=f.insert(g.key,g))}return f})}getAllFromCollectionGroup(e,t,r,s){let i=Et();const o=hp(t,r),c=hp(t,Rt.max());return Xn(e).Z({index:Sg,range:IDBKeyRange.bound(o,c,!0)},(u,d,f)=>{const p=this.cr(J.fromSegments(d.prefixPath.concat(d.collectionGroup,d.documentId)),d);i=i.insert(p.key,p),i.size===s&&f.done()}).next(()=>i)}newChangeBuffer(e){return new r0(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return dp(e).get(Pl).next(t=>(ne(!!t),t))}ur(e,t){return dp(e).put(Pl,t)}cr(e,t){if(t){const r=qA(this.serializer,t);if(!(r.isNoDocument()&&r.version.isEqual(ie.min())))return r}return Me.newInvalidDocument(e)}}function U_(n){return new n0(n)}class r0 extends F_{constructor(e,t){super(),this.Ir=e,this.trackRemovals=t,this.Er=new hn(r=>r.toString(),(r,s)=>r.isEqual(s))}applyChanges(e){const t=[];let r=0,s=new Se((i,o)=>ue(i.canonicalString(),o.canonicalString()));return this.changes.forEach((i,o)=>{const c=this.Er.get(i);if(t.push(this.Ir.removeEntry(e,i,c.readTime)),o.isValidDocument()){const u=Qf(this.Ir.serializer,o);s=s.add(i.path.popLast());const d=xa(u);r+=d-c.size,t.push(this.Ir.addEntry(e,i,u))}else if(r-=c.size,this.trackRemovals){const u=Qf(this.Ir.serializer,o.convertToNoDocument(ie.min()));t.push(this.Ir.addEntry(e,i,u))}}),s.forEach(i=>{t.push(this.Ir.indexManager.addToCollectionParentIndex(e,i))}),t.push(this.Ir.updateMetadata(e,r)),D.waitFor(t)}getFromCache(e,t){return this.Ir.lr(e,t).next(r=>(this.Er.set(t,{size:r.size,readTime:r.document.readTime}),r.document))}getAllFromCache(e,t){return this.Ir.Pr(e,t).next(({documents:r,Tr:s})=>(s.forEach((i,o)=>{this.Er.set(i,{size:o,readTime:r.get(i).readTime})}),r))}}function dp(n){return Ke(n,xi)}function Xn(n){return Ke(n,ya)}function ei(n){const e=n.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function hp(n,e){const t=e.documentKey.path.toArray();return[n,Ca(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function fp(n,e){const t=n.path.toArray(),r=e.path.toArray();let s=0;for(let i=0;i<t.length-2&&i<r.length-2;++i)if(s=ue(t[i],r[i]),s)return s;return s=ue(t.length,r.length),s||(s=ue(t[t.length-2],r[r.length-2]),s||ue(t[t.length-1],r[r.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class s0{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B_{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&gi(r.mutation,s,gt.empty(),Oe.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,me()).next(()=>r))}getLocalViewOfDocuments(e,t,r=me()){const s=zt();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let o=ai();return i.forEach((c,u)=>{o=o.insert(c,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const r=zt();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,me()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,c)=>{t.set(o,c)})})}computeViews(e,t,r,s){let i=Et();const o=mi(),c=function(){return mi()}();return t.forEach((u,d)=>{const f=r.get(d.key);s.has(d.key)&&(f===void 0||f.mutation instanceof fn)?i=i.insert(d.key,d):f!==void 0?(o.set(d.key,f.mutation.getFieldMask()),gi(f.mutation,d,f.mutation.getFieldMask(),Oe.now())):o.set(d.key,gt.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((d,f)=>o.set(d,f)),t.forEach((d,f)=>{var p;return c.set(d,new s0(f,(p=o.get(d))!==null&&p!==void 0?p:null))}),c))}recalculateAndSaveOverlays(e,t){const r=mi();let s=new xe((o,c)=>o-c),i=me();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const c of o)c.keys().forEach(u=>{const d=t.get(u);if(d===null)return;let f=r.get(u)||gt.empty();f=c.applyToLocalView(d,f),r.set(u,f);const p=(s.get(c.batchId)||me()).add(u);s=s.insert(c.batchId,p)})}).next(()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),d=u.key,f=u.value,p=t_();f.forEach(g=>{if(!i.has(g)){const _=l_(t.get(g),r.get(g));_!==null&&p.set(g,_),i=i.add(g)}}),o.push(this.documentOverlayCache.saveOverlays(e,d,p))}return D.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return function(o){return J.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Nu(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):D.resolve(zt());let c=Ri,u=i;return o.next(d=>D.forEach(d,(f,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),i.get(f)?D.resolve():this.remoteDocumentCache.getEntry(e,f).next(g=>{u=u.insert(f,g)}))).next(()=>this.populateOverlays(e,d,i)).next(()=>this.computeViews(e,u,d,me())).next(f=>({batchId:c,changes:e_(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new J(t)).next(r=>{let s=ai();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let o=ai();return this.indexManager.getCollectionParents(e,i).next(c=>D.forEach(c,u=>{const d=function(p,g){return new Or(g,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,d,r,s).next(f=>{f.forEach((p,g)=>{o=o.insert(p,g)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(o=>{i.forEach((u,d)=>{const f=d.getKey();o.get(f)===null&&(o=o.insert(f,Me.newInvalidDocument(f)))});let c=ai();return o.forEach((u,d)=>{const f=i.get(u);f!==void 0&&gi(f.mutation,d,gt.empty(),Oe.now()),Xi(t,d)&&(c=c.insert(u,d))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i0{constructor(e){this.serializer=e,this.dr=new Map,this.Ar=new Map}getBundleMetadata(e,t){return D.resolve(this.dr.get(t))}saveBundleMetadata(e,t){return this.dr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:pt(s.createTime)}}(t)),D.resolve()}getNamedQuery(e,t){return D.resolve(this.Ar.get(t))}saveNamedQuery(e,t){return this.Ar.set(t.name,function(s){return{name:s.name,query:k_(s.bundledQuery),readTime:pt(s.readTime)}}(t)),D.resolve()}}/**
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
 */class o0{constructor(){this.overlays=new xe(J.comparator),this.Rr=new Map}getOverlay(e,t){return D.resolve(this.overlays.get(t))}getOverlays(e,t){const r=zt();return D.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.Et(e,t,i)}),D.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Rr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Rr.delete(r)),D.resolve()}getOverlaysForCollection(e,t,r){const s=zt(),i=t.length+1,o=new J(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const u=c.getNext().value,d=u.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return D.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new xe((d,f)=>d-f);const o=this.overlays.getIterator();for(;o.hasNext();){const d=o.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let f=i.get(d.largestBatchId);f===null&&(f=zt(),i=i.insert(d.largestBatchId,f)),f.set(d.getKey(),d)}}const c=zt(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((d,f)=>c.set(d,f)),!(c.size()>=s)););return D.resolve(c)}Et(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Rr.get(s.largestBatchId).delete(r.key);this.Rr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new Lu(t,r));let i=this.Rr.get(t);i===void 0&&(i=me(),this.Rr.set(t,i)),this.Rr.set(t,i.add(r.key))}}/**
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
 */class a0{constructor(){this.sessionToken=ze.EMPTY_BYTE_STRING}getSessionToken(e){return D.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,D.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $u{constructor(){this.Vr=new Se(We.mr),this.gr=new Se(We.pr)}isEmpty(){return this.Vr.isEmpty()}addReference(e,t){const r=new We(e,t);this.Vr=this.Vr.add(r),this.gr=this.gr.add(r)}yr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.wr(new We(e,t))}Sr(e,t){e.forEach(r=>this.removeReference(r,t))}br(e){const t=new J(new Ie([])),r=new We(t,e),s=new We(t,e+1),i=[];return this.gr.forEachInRange([r,s],o=>{this.wr(o),i.push(o.key)}),i}Dr(){this.Vr.forEach(e=>this.wr(e))}wr(e){this.Vr=this.Vr.delete(e),this.gr=this.gr.delete(e)}vr(e){const t=new J(new Ie([])),r=new We(t,e),s=new We(t,e+1);let i=me();return this.gr.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(e){const t=new We(e,0),r=this.Vr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class We{constructor(e,t){this.key=e,this.Cr=t}static mr(e,t){return J.comparator(e.key,t.key)||ue(e.Cr,t.Cr)}static pr(e,t){return ue(e.Cr,t.Cr)||J.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class c0{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Fr=1,this.Mr=new Se(We.mr)}checkEmpty(e){return D.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Fr;this.Fr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Vu(i,t,r,s);this.mutationQueue.push(o);for(const c of s)this.Mr=this.Mr.add(new We(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return D.resolve(o)}lookupMutationBatch(e,t){return D.resolve(this.Or(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Nr(r),i=s<0?0:s;return D.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return D.resolve(this.mutationQueue.length===0?pr:this.Fr-1)}getAllMutationBatches(e){return D.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new We(t,0),s=new We(t,Number.POSITIVE_INFINITY),i=[];return this.Mr.forEachInRange([r,s],o=>{const c=this.Or(o.Cr);i.push(c)}),D.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Se(ue);return t.forEach(s=>{const i=new We(s,0),o=new We(s,Number.POSITIVE_INFINITY);this.Mr.forEachInRange([i,o],c=>{r=r.add(c.Cr)})}),D.resolve(this.Br(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;J.isDocumentKey(i)||(i=i.child(""));const o=new We(new J(i),0);let c=new Se(ue);return this.Mr.forEachWhile(u=>{const d=u.key.path;return!!r.isPrefixOf(d)&&(d.length===s&&(c=c.add(u.Cr)),!0)},o),D.resolve(this.Br(c))}Br(e){const t=[];return e.forEach(r=>{const s=this.Or(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){ne(this.Lr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.Mr;return D.forEach(t.mutations,s=>{const i=new We(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Mr=r})}qn(e){}containsKey(e,t){const r=new We(t,0),s=this.Mr.firstAfterOrEqual(r);return D.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,D.resolve()}Lr(e,t){return this.Nr(e)}Nr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Or(e){const t=this.Nr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class l0{constructor(e){this.kr=e,this.docs=function(){return new xe(J.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,o=this.kr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return D.resolve(r?r.document.mutableCopy():Me.newInvalidDocument(t))}getEntries(e,t){let r=Et();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Me.newInvalidDocument(s))}),D.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=Et();const o=t.path,c=new J(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:d,value:{document:f}}=u.getNext();if(!o.isPrefixOf(d.path))break;d.path.length>o.length+1||Eu(wg(f),r)<=0||(s.has(f.key)||Xi(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return D.resolve(i)}getAllFromCollectionGroup(e,t,r,s){ee()}qr(e,t){return D.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new u0(this)}getSize(e){return D.resolve(this.size)}}class u0 extends F_{constructor(e){super(),this.Ir=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.Ir.addEntry(e,s)):this.Ir.removeEntry(r)}),D.waitFor(t)}getFromCache(e,t){return this.Ir.getEntry(e,t)}getAllFromCache(e,t){return this.Ir.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d0{constructor(e){this.persistence=e,this.Qr=new hn(t=>Er(t),Yi),this.lastRemoteSnapshotVersion=ie.min(),this.highestTargetId=0,this.$r=0,this.Ur=new $u,this.targetCount=0,this.Kr=Sr.Un()}forEachTarget(e,t){return this.Qr.forEach((r,s)=>t(s)),D.resolve()}getLastRemoteSnapshotVersion(e){return D.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return D.resolve(this.$r)}allocateTargetId(e){return this.highestTargetId=this.Kr.next(),D.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.$r&&(this.$r=t),D.resolve()}zn(e){this.Qr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.Kr=new Sr(t),this.highestTargetId=t),e.sequenceNumber>this.$r&&(this.$r=e.sequenceNumber)}addTargetData(e,t){return this.zn(t),this.targetCount+=1,D.resolve()}updateTargetData(e,t){return this.zn(t),D.resolve()}removeTargetData(e,t){return this.Qr.delete(t.target),this.Ur.br(t.targetId),this.targetCount-=1,D.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.Qr.forEach((o,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.Qr.delete(o),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)}),D.waitFor(i).next(()=>s)}getTargetCount(e){return D.resolve(this.targetCount)}getTargetData(e,t){const r=this.Qr.get(t)||null;return D.resolve(r)}addMatchingKeys(e,t,r){return this.Ur.yr(t,r),D.resolve()}removeMatchingKeys(e,t,r){this.Ur.Sr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),D.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Ur.br(t),D.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Ur.vr(t);return D.resolve(r)}containsKey(e,t){return D.resolve(this.Ur.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qu{constructor(e,t){this.Wr={},this.overlays={},this.Gr=new Pt(0),this.zr=!1,this.zr=!0,this.jr=new a0,this.referenceDelegate=e(this),this.Hr=new d0(this),this.indexManager=new YA,this.remoteDocumentCache=function(s){return new l0(s)}(r=>this.referenceDelegate.Jr(r)),this.serializer=new S_(t),this.Yr=new i0(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.zr=!1,Promise.resolve()}get started(){return this.zr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new o0,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.Wr[e.toKey()];return r||(r=new c0(t,this.referenceDelegate),this.Wr[e.toKey()]=r),r}getGlobalsCache(){return this.jr}getTargetCache(){return this.Hr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Yr}runTransaction(e,t,r){K("MemoryPersistence","Starting transaction:",e);const s=new h0(this.Gr.next());return this.referenceDelegate.Zr(),r(s).next(i=>this.referenceDelegate.Xr(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}ei(e,t){return D.or(Object.values(this.Wr).map(r=>()=>r.containsKey(e,t)))}}class h0 extends Eg{constructor(e){super(),this.currentSequenceNumber=e}}class mc{constructor(e){this.persistence=e,this.ti=new $u,this.ni=null}static ri(e){return new mc(e)}get ii(){if(this.ni)return this.ni;throw ee()}addReference(e,t,r){return this.ti.addReference(r,t),this.ii.delete(r.toString()),D.resolve()}removeReference(e,t,r){return this.ti.removeReference(r,t),this.ii.add(r.toString()),D.resolve()}markPotentiallyOrphaned(e,t){return this.ii.add(t.toString()),D.resolve()}removeTarget(e,t){this.ti.br(t.targetId).forEach(s=>this.ii.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.ii.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}Zr(){this.ni=new Set}Xr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return D.forEach(this.ii,r=>{const s=J.fromPath(r);return this.si(e,s).next(i=>{i||t.removeEntry(s,ie.min())})}).next(()=>(this.ni=null,t.apply(e)))}updateLimboDocument(e,t){return this.si(e,t).next(r=>{r?this.ii.delete(t.toString()):this.ii.add(t.toString())})}Jr(e){return 0}si(e,t){return D.or([()=>D.resolve(this.ti.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.ei(e,t)])}}class Na{constructor(e,t){this.persistence=e,this.oi=new hn(r=>ot(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=M_(this,t)}static ri(e,t){return new Na(e,t)}Zr(){}Xr(e){return D.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}nr(e){const t=this.sr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}sr(e){let t=0;return this.rr(e,r=>{t++}).next(()=>t)}rr(e,t){return D.forEach(this.oi,(r,s)=>this.ar(e,r,s).next(i=>i?D.resolve():t(s)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.qr(e,o=>this.ar(e,o,t).next(c=>{c||(r++,i.removeEntry(o,ie.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.oi.set(t,e.currentSequenceNumber),D.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.oi.set(r,e.currentSequenceNumber),D.resolve()}removeReference(e,t,r){return this.oi.set(r,e.currentSequenceNumber),D.resolve()}updateLimboDocument(e,t){return this.oi.set(t,e.currentSequenceNumber),D.resolve()}Jr(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Zo(e.data.value)),t}ar(e,t,r){return D.or([()=>this.persistence.ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.oi.get(t);return D.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class f0{constructor(e){this.serializer=e}B(e,t,r,s){const i=new ec("createOrUpgrade",t);r<1&&s>=1&&(function(u){u.createObjectStore(Qi)}(e),function(u){u.createObjectStore(Pi,{keyPath:RT}),u.createObjectStore(Dt,{keyPath:Af,autoIncrement:!0}).createIndex(ur,Sf,{unique:!0}),u.createObjectStore(ps)}(e),pp(e),function(u){u.createObjectStore(rr)}(e));let o=D.resolve();return r<3&&s>=3&&(r!==0&&(function(u){u.deleteObjectStore(gs),u.deleteObjectStore(ms),u.deleteObjectStore(mr)}(e),pp(e)),o=o.next(()=>function(u){const d=u.store(mr),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:ie.min().toTimestamp(),targetCount:0};return d.put(ba,f)}(i))),r<4&&s>=4&&(r!==0&&(o=o.next(()=>function(u,d){return d.store(Dt).G().next(p=>{u.deleteObjectStore(Dt),u.createObjectStore(Dt,{keyPath:Af,autoIncrement:!0}).createIndex(ur,Sf,{unique:!0});const g=d.store(Dt),_=p.map(I=>g.put(I));return D.waitFor(_)})}(e,i))),o=o.next(()=>{(function(u){u.createObjectStore(_s,{keyPath:LT})})(e)})),r<5&&s>=5&&(o=o.next(()=>this._i(i))),r<6&&s>=6&&(o=o.next(()=>(function(u){u.createObjectStore(xi)}(e),this.ai(i)))),r<7&&s>=7&&(o=o.next(()=>this.ui(i))),r<8&&s>=8&&(o=o.next(()=>this.ci(e,i))),r<9&&s>=9&&(o=o.next(()=>{(function(u){u.objectStoreNames.contains("remoteDocumentChanges")&&u.deleteObjectStore("remoteDocumentChanges")})(e)})),r<10&&s>=10&&(o=o.next(()=>this.li(i))),r<11&&s>=11&&(o=o.next(()=>{(function(u){u.createObjectStore(nc,{keyPath:MT})})(e),function(u){u.createObjectStore(rc,{keyPath:FT})}(e)})),r<12&&s>=12&&(o=o.next(()=>{(function(u){const d=u.createObjectStore(sc,{keyPath:GT});d.createIndex(Nl,HT,{unique:!1}),d.createIndex(Pg,KT,{unique:!1})})(e)})),r<13&&s>=13&&(o=o.next(()=>function(u){const d=u.createObjectStore(ya,{keyPath:CT});d.createIndex(Jo,PT),d.createIndex(Sg,xT)}(e)).next(()=>this.hi(e,i)).next(()=>e.deleteObjectStore(rr))),r<14&&s>=14&&(o=o.next(()=>this.Pi(e,i))),r<15&&s>=15&&(o=o.next(()=>function(u){u.createObjectStore(Su,{keyPath:UT,autoIncrement:!0}).createIndex(xl,BT,{unique:!1}),u.createObjectStore(wa,{keyPath:$T}).createIndex(kg,qT,{unique:!1}),u.createObjectStore(Ia,{keyPath:jT}).createIndex(Cg,zT,{unique:!1})}(e))),r<16&&s>=16&&(o=o.next(()=>{t.objectStore(wa).clear()}).next(()=>{t.objectStore(Ia).clear()})),r<17&&s>=17&&(o=o.next(()=>{(function(u){u.createObjectStore(Ru,{keyPath:WT})})(e)})),o}ai(e){let t=0;return e.store(rr).Z((r,s)=>{t+=xa(s)}).next(()=>{const r={byteSize:t};return e.store(xi).put(Pl,r)})}_i(e){const t=e.store(Pi),r=e.store(Dt);return t.G().next(s=>D.forEach(s,i=>{const o=IDBKeyRange.bound([i.userId,pr],[i.userId,i.lastAcknowledgedBatchId]);return r.G(ur,o).next(c=>D.forEach(c,u=>{ne(u.userId===i.userId);const d=ar(this.serializer,u);return N_(e,i.userId,d).next(()=>{})}))}))}ui(e){const t=e.store(gs),r=e.store(rr);return e.store(mr).get(ba).next(s=>{const i=[];return r.Z((o,c)=>{const u=new Ie(o),d=function(p){return[0,ot(p)]}(u);i.push(t.get(d).next(f=>f?D.resolve():(p=>t.put({targetId:0,path:ot(p),sequenceNumber:s.highestListenSequenceNumber}))(u)))}).next(()=>D.waitFor(i))})}ci(e,t){e.createObjectStore(Ni,{keyPath:OT});const r=t.store(Ni),s=new Bu,i=o=>{if(s.add(o)){const c=o.lastSegment(),u=o.popLast();return r.put({collectionId:c,parent:ot(u)})}};return t.store(rr).Z({Y:!0},(o,c)=>{const u=new Ie(o);return i(u.popLast())}).next(()=>t.store(ps).Z({Y:!0},([o,c,u],d)=>{const f=jt(c);return i(f.popLast())}))}li(e){const t=e.store(ms);return t.Z((r,s)=>{const i=li(s),o=R_(this.serializer,i);return t.put(o)})}hi(e,t){const r=t.store(rr),s=[];return r.Z((i,o)=>{const c=t.store(ya),u=function(p){return p.document?new J(Ie.fromString(p.document.name).popFirst(5)):p.noDocument?J.fromSegments(p.noDocument.path):p.unknownDocument?J.fromSegments(p.unknownDocument.path):ee()}(o).path.toArray(),d={prefixPath:u.slice(0,u.length-2),collectionGroup:u[u.length-2],documentId:u[u.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};s.push(c.put(d))}).next(()=>D.waitFor(s))}Pi(e,t){const r=t.store(Dt),s=U_(this.serializer),i=new qu(mc.ri,this.serializer.Tt);return r.G().next(o=>{const c=new Map;return o.forEach(u=>{var d;let f=(d=c.get(u.userId))!==null&&d!==void 0?d:me();ar(this.serializer,u).keys().forEach(p=>f=f.add(p)),c.set(u.userId,f)}),D.forEach(c,(u,d)=>{const f=new ht(d),p=fc.It(this.serializer,f),g=i.getIndexManager(f),_=pc.It(f,this.serializer,g,i.referenceDelegate);return new B_(s,_,p,g).recalculateAndSaveOverlaysForDocumentKeys(new Dl(t,Pt.ae),u).next()})})}}function pp(n){n.createObjectStore(gs,{keyPath:DT}).createIndex(Au,VT,{unique:!0}),n.createObjectStore(ms,{keyPath:"targetId"}).createIndex(Rg,NT,{unique:!0}),n.createObjectStore(mr)}const bn="IndexedDbPersistence",sl=18e5,il=5e3,ol="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",p0="main";class ju{constructor(e,t,r,s,i,o,c,u,d,f,p=17){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.Ti=i,this.window=o,this.document=c,this.Ii=d,this.Ei=f,this.di=p,this.Gr=null,this.zr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Ai=null,this.inForeground=!1,this.Ri=null,this.Vi=null,this.mi=Number.NEGATIVE_INFINITY,this.fi=g=>Promise.resolve(),!ju.D())throw new W(B.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new t0(this,s),this.gi=t+p0,this.serializer=new S_(u),this.pi=new Dn(this.gi,this.di,new f0(this.serializer)),this.jr=new zA,this.Hr=new XA(this.referenceDelegate,this.serializer),this.remoteDocumentCache=U_(this.serializer),this.Yr=new jA,this.window&&this.window.localStorage?this.yi=this.window.localStorage:(this.yi=null,f===!1&&ft(bn,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.wi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new W(B.FAILED_PRECONDITION,ol);return this.Si(),this.bi(),this.Di(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Hr.getHighestSequenceNumber(e))}).then(e=>{this.Gr=new Pt(e,this.Ii)}).then(()=>{this.zr=!0}).catch(e=>(this.pi&&this.pi.close(),Promise.reject(e)))}Ci(e){return this.fi=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.pi.k(async t=>{t.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Ti.enqueueAndForget(async()=>{this.started&&await this.wi()}))}wi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>xo(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.Fi(e).next(t=>{t||(this.isPrimary=!1,this.Ti.enqueueRetryable(()=>this.fi(!1)))})}).next(()=>this.Mi(e)).next(t=>this.isPrimary&&!t?this.xi(e).next(()=>!1):!!t&&this.Oi(e).next(()=>!0))).catch(e=>{if(qn(e))return K(bn,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return K(bn,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Ti.enqueueRetryable(()=>this.fi(e)),this.isPrimary=e})}Fi(e){return ti(e).get(jr).next(t=>D.resolve(this.Ni(t)))}Bi(e){return xo(e).delete(this.clientId)}async Li(){if(this.isPrimary&&!this.ki(this.mi,sl)){this.mi=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{const r=Ke(t,_s);return r.G().next(s=>{const i=this.qi(s,sl),o=s.filter(c=>i.indexOf(c)===-1);return D.forEach(o,c=>r.delete(c.clientId)).next(()=>o)})}).catch(()=>[]);if(this.yi)for(const t of e)this.yi.removeItem(this.Qi(t.clientId))}}Di(){this.Vi=this.Ti.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.wi().then(()=>this.Li()).then(()=>this.Di()))}Ni(e){return!!e&&e.ownerId===this.clientId}Mi(e){return this.Ei?D.resolve(!0):ti(e).get(jr).next(t=>{if(t!==null&&this.ki(t.leaseTimestampMs,il)&&!this.$i(t.ownerId)){if(this.Ni(t)&&this.networkEnabled)return!0;if(!this.Ni(t)){if(!t.allowTabSynchronization)throw new W(B.FAILED_PRECONDITION,ol);return!1}}return!(!this.networkEnabled||!this.inForeground)||xo(e).G().next(r=>this.qi(r,il).find(s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,o=!this.inForeground&&s.inForeground,c=this.networkEnabled===s.networkEnabled;if(i||o&&c)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&K(bn,`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.zr=!1,this.Ui(),this.Vi&&(this.Vi.cancel(),this.Vi=null),this.Ki(),this.Wi(),await this.pi.runTransaction("shutdown","readwrite",[Qi,_s],e=>{const t=new Dl(e,Pt.ae);return this.xi(t).next(()=>this.Bi(t))}),this.pi.close(),this.Gi()}qi(e,t){return e.filter(r=>this.ki(r.updateTimeMs,t)&&!this.$i(r.clientId))}zi(){return this.runTransaction("getActiveClients","readonly",e=>xo(e).G().next(t=>this.qi(t,sl).map(r=>r.clientId)))}get started(){return this.zr}getGlobalsCache(){return this.jr}getMutationQueue(e,t){return pc.It(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Hr}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new JA(e,this.serializer.Tt.databaseId)}getDocumentOverlayCache(e){return fc.It(this.serializer,e)}getBundleCache(){return this.Yr}runTransaction(e,t,r){K(bn,"Starting transaction:",e);const s=t==="readonly"?"readonly":"readwrite",i=function(u){return u===17?JT:u===16?YT:u===15?ku:u===14?Dg:u===13?Ng:u===12?QT:u===11?xg:void ee()}(this.di);let o;return this.pi.runTransaction(e,s,i,c=>(o=new Dl(c,this.Gr?this.Gr.next():Pt.ae),t==="readwrite-primary"?this.Fi(o).next(u=>!!u||this.Mi(o)).next(u=>{if(!u)throw ft(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Ti.enqueueRetryable(()=>this.fi(!1)),new W(B.FAILED_PRECONDITION,Ig);return r(o)}).next(u=>this.Oi(o).next(()=>u)):this.ji(o).next(()=>r(o)))).then(c=>(o.raiseOnCommittedEvent(),c))}ji(e){return ti(e).get(jr).next(t=>{if(t!==null&&this.ki(t.leaseTimestampMs,il)&&!this.$i(t.ownerId)&&!this.Ni(t)&&!(this.Ei||this.allowTabSynchronization&&t.allowTabSynchronization))throw new W(B.FAILED_PRECONDITION,ol)})}Oi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return ti(e).put(jr,t)}static D(){return Dn.D()}xi(e){const t=ti(e);return t.get(jr).next(r=>this.Ni(r)?(K(bn,"Releasing primary lease."),t.delete(jr)):D.resolve())}ki(e,t){const r=Date.now();return!(e<r-t)&&(!(e>r)||(ft(`Detected an update time that is in the future: ${e} > ${r}`),!1))}Si(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ri=()=>{this.Ti.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.wi()))},this.document.addEventListener("visibilitychange",this.Ri),this.inForeground=this.document.visibilityState==="visible")}Ki(){this.Ri&&(this.document.removeEventListener("visibilitychange",this.Ri),this.Ri=null)}bi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Ai=()=>{this.Ui();const t=/(?:Version|Mobile)\/1[456]/;Am()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.Ti.enterRestrictedMode(!0),this.Ti.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Ai))}Wi(){this.Ai&&(this.window.removeEventListener("pagehide",this.Ai),this.Ai=null)}$i(e){var t;try{const r=((t=this.yi)===null||t===void 0?void 0:t.getItem(this.Qi(e)))!==null;return K(bn,`Client '${e}' ${r?"is":"is not"} zombied in LocalStorage`),r}catch(r){return ft(bn,"Failed to get zombied client id.",r),!1}}Ui(){if(this.yi)try{this.yi.setItem(this.Qi(this.clientId),String(Date.now()))}catch(e){ft("Failed to set zombie client id.",e)}}Gi(){if(this.yi)try{this.yi.removeItem(this.Qi(this.clientId))}catch{}}Qi(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function ti(n){return Ke(n,Qi)}function xo(n){return Ke(n,_s)}function m0(n,e){let t=n.projectId;return n.isDefaultDatabase||(t+="."+n.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zu{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Hi=r,this.Ji=s}static Yi(e,t){let r=me(),s=me();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new zu(e,t.fromCache,r,s)}}/**
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
 */class g0{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class $_{constructor(){this.Zi=!1,this.Xi=!1,this.es=100,this.ts=function(){return Am()?8:Tg(He())>0?6:4}()}initialize(e,t){this.ns=e,this.indexManager=t,this.Zi=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.rs(e,t).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.ss(e,t,s,r).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new g0;return this._s(e,t,o).next(c=>{if(i.result=c,this.Xi)return this.us(e,t,o,c.size)})}).next(()=>i.result)}us(e,t,r,s){return r.documentReadCount<this.es?(Qr()<=ge.DEBUG&&K("QueryEngine","SDK will not create cache indexes for query:",Yr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.es,"documents"),D.resolve()):(Qr()<=ge.DEBUG&&K("QueryEngine","Query:",Yr(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.ts*s?(Qr()<=ge.DEBUG&&K("QueryEngine","The SDK decides to create cache indexes for query:",Yr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,xt(t))):D.resolve())}rs(e,t){if(Uf(t))return D.resolve(null);let r=xt(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=Sa(t,null,"F"),r=xt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const o=me(...i);return this.ns.getDocuments(e,o).next(c=>this.indexManager.getMinOffset(e,r).next(u=>{const d=this.cs(t,c);return this.ls(t,d,o,u.readTime)?this.rs(e,Sa(t,null,"F")):this.hs(e,d,t,u)}))})))}ss(e,t,r,s){return Uf(t)||s.isEqual(ie.min())?D.resolve(null):this.ns.getDocuments(e,r).next(i=>{const o=this.cs(t,i);return this.ls(t,o,r,s)?D.resolve(null):(Qr()<=ge.DEBUG&&K("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Yr(t)),this.hs(e,o,t,bT(s,Ri)).next(c=>c))})}cs(e,t){let r=new Se(Xg(e));return t.forEach((s,i)=>{Xi(e,i)&&(r=r.add(i))}),r}ls(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}_s(e,t,r){return Qr()<=ge.DEBUG&&K("QueryEngine","Using full collection scan to execute query:",Yr(t)),this.ns.getDocumentsMatchingQuery(e,t,Rt.min(),r)}hs(e,t,r,s){return this.ns.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gu="LocalStore",_0=3e8;class v0{constructor(e,t,r,s){this.persistence=e,this.Ps=t,this.serializer=s,this.Ts=new xe(ue),this.Is=new hn(i=>Er(i),Yi),this.Es=new Map,this.ds=e.getRemoteDocumentCache(),this.Hr=e.getTargetCache(),this.Yr=e.getBundleCache(),this.As(r)}As(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new B_(this.ds,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.ds.setIndexManager(this.indexManager),this.Ps.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ts))}}function q_(n,e,t,r){return new v0(n,e,t,r)}async function j_(n,e){const t=de(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.As(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const o=[],c=[];let u=me();for(const d of s){o.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}for(const d of i){c.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(r,u).next(d=>({Rs:d,removedBatchIds:o,addedBatchIds:c}))})})}function y0(n,e){const t=de(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.ds.newChangeBuffer({trackRemovals:!0});return function(c,u,d,f){const p=d.batch,g=p.keys();let _=D.resolve();return g.forEach(I=>{_=_.next(()=>f.getEntry(u,I)).next(S=>{const A=d.docVersions.get(I);ne(A!==null),S.version.compareTo(A)<0&&(p.applyToRemoteDocument(S,d),S.isValidDocument()&&(S.setReadTime(d.commitVersion),f.addEntry(S)))})}),_.next(()=>c.mutationQueue.removeMutationBatch(u,p))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let u=me();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(u=u.add(c.batch.mutations[d].key));return u}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function z_(n){const e=de(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Hr.getLastRemoteSnapshotVersion(t))}function b0(n,e){const t=de(n),r=e.snapshotVersion;let s=t.Ts;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=t.ds.newChangeBuffer({trackRemovals:!0});s=t.Ts;const c=[];e.targetChanges.forEach((f,p)=>{const g=s.get(p);if(!g)return;c.push(t.Hr.removeMatchingKeys(i,f.removedDocuments,p).next(()=>t.Hr.addMatchingKeys(i,f.addedDocuments,p)));let _=g.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?_=_.withResumeToken(ze.EMPTY_BYTE_STRING,ie.min()).withLastLimboFreeSnapshotVersion(ie.min()):f.resumeToken.approximateByteSize()>0&&(_=_.withResumeToken(f.resumeToken,r)),s=s.insert(p,_),function(S,A,V){return S.resumeToken.approximateByteSize()===0||A.snapshotVersion.toMicroseconds()-S.snapshotVersion.toMicroseconds()>=_0?!0:V.addedDocuments.size+V.modifiedDocuments.size+V.removedDocuments.size>0}(g,_,f)&&c.push(t.Hr.updateTargetData(i,_))});let u=Et(),d=me();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))}),c.push(w0(i,o,e.documentUpdates).next(f=>{u=f.Vs,d=f.fs})),!r.isEqual(ie.min())){const f=t.Hr.getLastRemoteSnapshotVersion(i).next(p=>t.Hr.setTargetsMetadata(i,i.currentSequenceNumber,r));c.push(f)}return D.waitFor(c).next(()=>o.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,u,d)).next(()=>u)}).then(i=>(t.Ts=s,i))}function w0(n,e,t){let r=me(),s=me();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let o=Et();return t.forEach((c,u)=>{const d=i.get(c);u.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual(ie.min())?(e.removeEntry(c,u.readTime),o=o.insert(c,u)):!d.isValidDocument()||u.version.compareTo(d.version)>0||u.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(u),o=o.insert(c,u)):K(Gu,"Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",u.version)}),{Vs:o,fs:s}})}function I0(n,e){const t=de(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=pr),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function E0(n,e){const t=de(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.Hr.getTargetData(r,e).next(i=>i?(s=i,D.resolve(s)):t.Hr.allocateTargetId(r).next(o=>(s=new on(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.Hr.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.Ts.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Ts=t.Ts.insert(r.targetId,r),t.Is.set(e,r.targetId)),r})}async function Kl(n,e,t){const r=de(n),s=r.Ts.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!qn(o))throw o;K(Gu,`Failed to update sequence numbers for target ${e}: ${o}`)}r.Ts=r.Ts.remove(e),r.Is.delete(s.target)}function mp(n,e,t){const r=de(n);let s=ie.min(),i=me();return r.persistence.runTransaction("Execute query","readwrite",o=>function(u,d,f){const p=de(u),g=p.Is.get(f);return g!==void 0?D.resolve(p.Ts.get(g)):p.Hr.getTargetData(d,f)}(r,o,xt(e)).next(c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.Hr.getMatchingKeysForTargetId(o,c.targetId).next(u=>{i=u})}).next(()=>r.Ps.getDocumentsMatchingQuery(o,e,t?s:ie.min(),t?i:me())).next(c=>(T0(r,hA(e),c),{documents:c,gs:i})))}function T0(n,e,t){let r=n.Es.get(e)||ie.min();t.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.Es.set(e,r)}class gp{constructor(){this.activeTargetIds=vA()}Ds(e){this.activeTargetIds=this.activeTargetIds.add(e)}vs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}bs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class G_{constructor(){this.ho=new gp,this.Po={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.ho.Ds(e),this.Po[e]||"not-current"}updateQueryState(e,t,r){this.Po[e]=t}removeLocalQueryTarget(e){this.ho.vs(e)}isLocalQueryTarget(e){return this.ho.activeTargetIds.has(e)}clearQueryState(e){delete this.Po[e]}getAllActiveQueryTargets(){return this.ho.activeTargetIds}isActiveQueryTarget(e){return this.ho.activeTargetIds.has(e)}start(){return this.ho=new gp,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class A0{To(e){}shutdown(){}}/**
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
 */const _p="ConnectivityMonitor";class vp{constructor(){this.Io=()=>this.Eo(),this.Ao=()=>this.Ro(),this.Vo=[],this.mo()}To(e){this.Vo.push(e)}shutdown(){window.removeEventListener("online",this.Io),window.removeEventListener("offline",this.Ao)}mo(){window.addEventListener("online",this.Io),window.addEventListener("offline",this.Ao)}Eo(){K(_p,"Network connectivity changed: AVAILABLE");for(const e of this.Vo)e(0)}Ro(){K(_p,"Network connectivity changed: UNAVAILABLE");for(const e of this.Vo)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let No=null;function Wl(){return No===null?No=function(){return 268435456+Math.round(2147483648*Math.random())}():No++,"0x"+No.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const al="RestConnection",S0={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class R0{get fo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.po=t+"://"+e.host,this.yo=`projects/${r}/databases/${s}`,this.wo=this.databaseId.database===Ea?`project_id=${r}`:`project_id=${r}&database_id=${s}`}So(e,t,r,s,i){const o=Wl(),c=this.bo(e,t.toUriEncodedString());K(al,`Sending RPC '${e}' ${o}:`,c,r);const u={"google-cloud-resource-prefix":this.yo,"x-goog-request-params":this.wo};return this.Do(u,s,i),this.vo(e,c,u,r).then(d=>(K(al,`Received RPC '${e}' ${o}: `,d),d),d=>{throw Si(al,`RPC '${e}' ${o} failed with error: `,d,"url: ",c,"request:",r),d})}Co(e,t,r,s,i,o){return this.So(e,t,r,s,i)}Do(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Vs}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}bo(e,t){const r=S0[e];return`${this.po}/v1/${t}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k0{constructor(e){this.Fo=e.Fo,this.Mo=e.Mo}xo(e){this.Oo=e}No(e){this.Bo=e}Lo(e){this.ko=e}onMessage(e){this.qo=e}close(){this.Mo()}send(e){this.Fo(e)}Qo(){this.Oo()}$o(){this.Bo()}Uo(e){this.ko(e)}Ko(e){this.qo(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nt="WebChannelConnection";class C0 extends R0{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}vo(e,t,r,s){const i=Wl();return new Promise((o,c)=>{const u=new pg;u.setWithCredentials(!0),u.listenOnce(mg.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case Wo.NO_ERROR:const f=u.getResponseJson();K(nt,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(f)),o(f);break;case Wo.TIMEOUT:K(nt,`RPC '${e}' ${i} timed out`),c(new W(B.DEADLINE_EXCEEDED,"Request time out"));break;case Wo.HTTP_ERROR:const p=u.getStatus();if(K(nt,`RPC '${e}' ${i} failed with status:`,p,"response text:",u.getResponseText()),p>0){let g=u.getResponseJson();Array.isArray(g)&&(g=g[0]);const _=g?.error;if(_&&_.status&&_.message){const I=function(A){const V=A.toLowerCase().replace(/_/g,"-");return Object.values(B).indexOf(V)>=0?V:B.UNKNOWN}(_.status);c(new W(I,_.message))}else c(new W(B.UNKNOWN,"Server responded with status "+u.getStatus()))}else c(new W(B.UNAVAILABLE,"Connection failed."));break;default:ee()}}finally{K(nt,`RPC '${e}' ${i} completed.`)}});const d=JSON.stringify(s);K(nt,`RPC '${e}' ${i} sending request:`,s),u.send(t,"POST",d,r,15)})}Wo(e,t,r){const s=Wl(),i=[this.po,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=vg(),c=_g(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(u.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Do(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;const f=i.join("");K(nt,`Creating RPC '${e}' stream ${s}: ${f}`,u);const p=o.createWebChannel(f,u);let g=!1,_=!1;const I=new k0({Fo:A=>{_?K(nt,`Not sending because RPC '${e}' stream ${s} is closed:`,A):(g||(K(nt,`Opening RPC '${e}' stream ${s} transport.`),p.open(),g=!0),K(nt,`RPC '${e}' stream ${s} sending:`,A),p.send(A))},Mo:()=>p.close()}),S=(A,V,k)=>{A.listen(V,P=>{try{k(P)}catch(L){setTimeout(()=>{throw L},0)}})};return S(p,oi.EventType.OPEN,()=>{_||(K(nt,`RPC '${e}' stream ${s} transport opened.`),I.Qo())}),S(p,oi.EventType.CLOSE,()=>{_||(_=!0,K(nt,`RPC '${e}' stream ${s} transport closed`),I.Uo())}),S(p,oi.EventType.ERROR,A=>{_||(_=!0,Si(nt,`RPC '${e}' stream ${s} transport errored:`,A),I.Uo(new W(B.UNAVAILABLE,"The operation could not be completed")))}),S(p,oi.EventType.MESSAGE,A=>{var V;if(!_){const k=A.data[0];ne(!!k);const P=k,L=P?.error||((V=P[0])===null||V===void 0?void 0:V.error);if(L){K(nt,`RPC '${e}' stream ${s} received error:`,L);const C=L.status;let M=function(b){const R=je[b];if(R!==void 0)return h_(R)}(C),E=L.message;M===void 0&&(M=B.INTERNAL,E="Unknown error status: "+C+" with message "+L.message),_=!0,I.Uo(new W(M,E)),p.close()}else K(nt,`RPC '${e}' stream ${s} received:`,k),I.Ko(k)}}),S(c,gg.STAT_EVENT,A=>{A.stat===Sl.PROXY?K(nt,`RPC '${e}' stream ${s} detected buffering proxy`):A.stat===Sl.NOPROXY&&K(nt,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{I.$o()},0),I}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */function P0(){return typeof window<"u"?window:null}function ra(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gc(n){return new NA(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H_{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Ti=e,this.timerId=t,this.Go=r,this.zo=s,this.jo=i,this.Ho=0,this.Jo=null,this.Yo=Date.now(),this.reset()}reset(){this.Ho=0}Zo(){this.Ho=this.jo}Xo(e){this.cancel();const t=Math.floor(this.Ho+this.e_()),r=Math.max(0,Date.now()-this.Yo),s=Math.max(0,t-r);s>0&&K("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ho} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Jo=this.Ti.enqueueAfterDelay(this.timerId,s,()=>(this.Yo=Date.now(),e())),this.Ho*=this.zo,this.Ho<this.Go&&(this.Ho=this.Go),this.Ho>this.jo&&(this.Ho=this.jo)}t_(){this.Jo!==null&&(this.Jo.skipDelay(),this.Jo=null)}cancel(){this.Jo!==null&&(this.Jo.cancel(),this.Jo=null)}e_(){return(Math.random()-.5)*this.Ho}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yp="PersistentStream";class K_{constructor(e,t,r,s,i,o,c,u){this.Ti=e,this.n_=r,this.r_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.i_=0,this.s_=null,this.o_=null,this.stream=null,this.__=0,this.a_=new H_(e,t)}u_(){return this.state===1||this.state===5||this.c_()}c_(){return this.state===2||this.state===3}start(){this.__=0,this.state!==4?this.auth():this.l_()}async stop(){this.u_()&&await this.close(0)}h_(){this.state=0,this.a_.reset()}P_(){this.c_()&&this.s_===null&&(this.s_=this.Ti.enqueueAfterDelay(this.n_,6e4,()=>this.T_()))}I_(e){this.E_(),this.stream.send(e)}async T_(){if(this.c_())return this.close(0)}E_(){this.s_&&(this.s_.cancel(),this.s_=null)}d_(){this.o_&&(this.o_.cancel(),this.o_=null)}async close(e,t){this.E_(),this.d_(),this.a_.cancel(),this.i_++,e!==4?this.a_.reset():t&&t.code===B.RESOURCE_EXHAUSTED?(ft(t.toString()),ft("Using maximum backoff delay to prevent overloading the backend."),this.a_.Zo()):t&&t.code===B.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.A_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Lo(t)}A_(){}auth(){this.state=1;const e=this.R_(this.i_),t=this.i_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.i_===t&&this.V_(r,s)},r=>{e(()=>{const s=new W(B.UNKNOWN,"Fetching auth token failed: "+r.message);return this.m_(s)})})}V_(e,t){const r=this.R_(this.i_);this.stream=this.f_(e,t),this.stream.xo(()=>{r(()=>this.listener.xo())}),this.stream.No(()=>{r(()=>(this.state=2,this.o_=this.Ti.enqueueAfterDelay(this.r_,1e4,()=>(this.c_()&&(this.state=3),Promise.resolve())),this.listener.No()))}),this.stream.Lo(s=>{r(()=>this.m_(s))}),this.stream.onMessage(s=>{r(()=>++this.__==1?this.g_(s):this.onNext(s))})}l_(){this.state=5,this.a_.Xo(async()=>{this.state=0,this.start()})}m_(e){return K(yp,`close with error: ${e}`),this.stream=null,this.close(4,e)}R_(e){return t=>{this.Ti.enqueueAndForget(()=>this.i_===e?t():(K(yp,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class x0 extends K_{constructor(e,t,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}f_(e,t){return this.connection.Wo("Listen",e,t)}g_(e){return this.onNext(e)}onNext(e){this.a_.reset();const t=OA(this.serializer,e),r=function(i){if(!("targetChange"in i))return ie.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?ie.min():o.readTime?pt(o.readTime):ie.min()}(e);return this.listener.p_(t,r)}y_(e){const t={};t.database=ql(this.serializer),t.addTarget=function(i,o){let c;const u=o.target;if(c=Ta(u)?{documents:b_(i,u)}:{query:w_(i,u).ht},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=m_(i,o.resumeToken);const d=Bl(i,o.expectedCount);d!==null&&(c.expectedCount=d)}else if(o.snapshotVersion.compareTo(ie.min())>0){c.readTime=Ts(i,o.snapshotVersion.toTimestamp());const d=Bl(i,o.expectedCount);d!==null&&(c.expectedCount=d)}return c}(this.serializer,e);const r=MA(this.serializer,e);r&&(t.labels=r),this.I_(t)}w_(e){const t={};t.database=ql(this.serializer),t.removeTarget=e,this.I_(t)}}class N0 extends K_{constructor(e,t,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}get S_(){return this.__>0}start(){this.lastStreamToken=void 0,super.start()}A_(){this.S_&&this.b_([])}f_(e,t){return this.connection.Wo("Write",e,t)}g_(e){return ne(!!e.streamToken),this.lastStreamToken=e.streamToken,ne(!e.writeResults||e.writeResults.length===0),this.listener.D_()}onNext(e){ne(!!e.streamToken),this.lastStreamToken=e.streamToken,this.a_.reset();const t=LA(e.writeResults,e.commitTime),r=pt(e.commitTime);return this.listener.v_(r,t)}C_(){const e={};e.database=ql(this.serializer),this.I_(e)}b_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>ka(this.serializer,r))};this.I_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D0{}class V0 extends D0{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.F_=!1}M_(){if(this.F_)throw new W(B.FAILED_PRECONDITION,"The client has already been terminated.")}So(e,t,r,s){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.So(e,$l(t,r),s,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===B.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new W(B.UNKNOWN,i.toString())})}Co(e,t,r,s,i){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.Co(e,$l(t,r),s,o,c,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===B.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new W(B.UNKNOWN,o.toString())})}terminate(){this.F_=!0,this.connection.terminate()}}class O0{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.x_=0,this.O_=null,this.N_=!0}B_(){this.x_===0&&(this.L_("Unknown"),this.O_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.O_=null,this.k_("Backend didn't respond within 10 seconds."),this.L_("Offline"),Promise.resolve())))}q_(e){this.state==="Online"?this.L_("Unknown"):(this.x_++,this.x_>=1&&(this.Q_(),this.k_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.L_("Offline")))}set(e){this.Q_(),this.x_=0,e==="Online"&&(this.N_=!1),this.L_(e)}L_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}k_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.N_?(ft(t),this.N_=!1):K("OnlineStateTracker",t)}Q_(){this.O_!==null&&(this.O_.cancel(),this.O_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rr="RemoteStore";class L0{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.U_=[],this.K_=new Map,this.W_=new Set,this.G_=[],this.z_=i,this.z_.To(o=>{r.enqueueAndForget(async()=>{Lr(this)&&(K(Rr,"Restarting streams for network reachability change."),await async function(u){const d=de(u);d.W_.add(4),await eo(d),d.j_.set("Unknown"),d.W_.delete(4),await _c(d)}(this))})}),this.j_=new O0(r,s)}}async function _c(n){if(Lr(n))for(const e of n.G_)await e(!0)}async function eo(n){for(const e of n.G_)await e(!1)}function W_(n,e){const t=de(n);t.K_.has(e.targetId)||(t.K_.set(e.targetId,e),Qu(t)?Wu(t):Ls(t).c_()&&Ku(t,e))}function Hu(n,e){const t=de(n),r=Ls(t);t.K_.delete(e),r.c_()&&Q_(t,e),t.K_.size===0&&(r.c_()?r.P_():Lr(t)&&t.j_.set("Unknown"))}function Ku(n,e){if(n.H_.Ne(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(ie.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Ls(n).y_(e)}function Q_(n,e){n.H_.Ne(e),Ls(n).w_(e)}function Wu(n){n.H_=new kA({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),lt:e=>n.K_.get(e)||null,it:()=>n.datastore.serializer.databaseId}),Ls(n).start(),n.j_.B_()}function Qu(n){return Lr(n)&&!Ls(n).u_()&&n.K_.size>0}function Lr(n){return de(n).W_.size===0}function Y_(n){n.H_=void 0}async function M0(n){n.j_.set("Online")}async function F0(n){n.K_.forEach((e,t)=>{Ku(n,e)})}async function U0(n,e){Y_(n),Qu(n)?(n.j_.q_(e),Wu(n)):n.j_.set("Unknown")}async function B0(n,e,t){if(n.j_.set("Online"),e instanceof p_&&e.state===2&&e.cause)try{await async function(s,i){const o=i.cause;for(const c of i.targetIds)s.K_.has(c)&&(await s.remoteSyncer.rejectListen(c,o),s.K_.delete(c),s.H_.removeTarget(c))}(n,e)}catch(r){K(Rr,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Da(n,r)}else if(e instanceof na?n.H_.We(e):e instanceof f_?n.H_.Ze(e):n.H_.je(e),!t.isEqual(ie.min()))try{const r=await z_(n.localStore);t.compareTo(r)>=0&&await function(i,o){const c=i.H_.ot(o);return c.targetChanges.forEach((u,d)=>{if(u.resumeToken.approximateByteSize()>0){const f=i.K_.get(d);f&&i.K_.set(d,f.withResumeToken(u.resumeToken,o))}}),c.targetMismatches.forEach((u,d)=>{const f=i.K_.get(u);if(!f)return;i.K_.set(u,f.withResumeToken(ze.EMPTY_BYTE_STRING,f.snapshotVersion)),Q_(i,u);const p=new on(f.target,u,d,f.sequenceNumber);Ku(i,p)}),i.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){K(Rr,"Failed to raise snapshot:",r),await Da(n,r)}}async function Da(n,e,t){if(!qn(e))throw e;n.W_.add(1),await eo(n),n.j_.set("Offline"),t||(t=()=>z_(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{K(Rr,"Retrying IndexedDB access"),await t(),n.W_.delete(1),await _c(n)})}function J_(n,e){return e().catch(t=>Da(n,t,e))}async function to(n){const e=de(n),t=Fn(e);let r=e.U_.length>0?e.U_[e.U_.length-1].batchId:pr;for(;$0(e);)try{const s=await I0(e.localStore,r);if(s===null){e.U_.length===0&&t.P_();break}r=s.batchId,q0(e,s)}catch(s){await Da(e,s)}X_(e)&&Z_(e)}function $0(n){return Lr(n)&&n.U_.length<10}function q0(n,e){n.U_.push(e);const t=Fn(n);t.c_()&&t.S_&&t.b_(e.mutations)}function X_(n){return Lr(n)&&!Fn(n).u_()&&n.U_.length>0}function Z_(n){Fn(n).start()}async function j0(n){Fn(n).C_()}async function z0(n){const e=Fn(n);for(const t of n.U_)e.b_(t.mutations)}async function G0(n,e,t){const r=n.U_.shift(),s=Ou.from(r,e,t);await J_(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await to(n)}async function H0(n,e){e&&Fn(n).S_&&await async function(r,s){if(function(o){return SA(o)&&o!==B.ABORTED}(s.code)){const i=r.U_.shift();Fn(r).h_(),await J_(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await to(r)}}(n,e),X_(n)&&Z_(n)}async function bp(n,e){const t=de(n);t.asyncQueue.verifyOperationInProgress(),K(Rr,"RemoteStore received new credentials");const r=Lr(t);t.W_.add(3),await eo(t),r&&t.j_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.W_.delete(3),await _c(t)}async function K0(n,e){const t=de(n);e?(t.W_.delete(2),await _c(t)):e||(t.W_.add(2),await eo(t),t.j_.set("Unknown"))}function Ls(n){return n.J_||(n.J_=function(t,r,s){const i=de(t);return i.M_(),new x0(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{xo:M0.bind(null,n),No:F0.bind(null,n),Lo:U0.bind(null,n),p_:B0.bind(null,n)}),n.G_.push(async e=>{e?(n.J_.h_(),Qu(n)?Wu(n):n.j_.set("Unknown")):(await n.J_.stop(),Y_(n))})),n.J_}function Fn(n){return n.Y_||(n.Y_=function(t,r,s){const i=de(t);return i.M_(),new N0(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{xo:()=>Promise.resolve(),No:j0.bind(null,n),Lo:H0.bind(null,n),D_:z0.bind(null,n),v_:G0.bind(null,n)}),n.G_.push(async e=>{e?(n.Y_.h_(),await to(n)):(await n.Y_.stop(),n.U_.length>0&&(K(Rr,`Stopping write stream with ${n.U_.length} pending writes`),n.U_=[]))})),n.Y_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yu{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Wt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const o=Date.now()+r,c=new Yu(e,t,o,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new W(B.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ju(n,e){if(ft("AsyncQueue",`${e}: ${n}`),qn(n))return new W(B.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cs{static emptySet(e){return new cs(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||J.comparator(t.key,r.key):(t,r)=>J.comparator(t.key,r.key),this.keyedMap=ai(),this.sortedSet=new xe(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof cs)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
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
 */class wp{constructor(){this.Z_=new xe(J.comparator)}track(e){const t=e.doc.key,r=this.Z_.get(t);r?e.type!==0&&r.type===3?this.Z_=this.Z_.insert(t,e):e.type===3&&r.type!==1?this.Z_=this.Z_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.Z_=this.Z_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.Z_=this.Z_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.Z_=this.Z_.remove(t):e.type===1&&r.type===2?this.Z_=this.Z_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.Z_=this.Z_.insert(t,{type:2,doc:e.doc}):ee():this.Z_=this.Z_.insert(t,e)}X_(){const e=[];return this.Z_.inorderTraversal((t,r)=>{e.push(r)}),e}}class As{constructor(e,t,r,s,i,o,c,u,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,s,i){const o=[];return t.forEach(c=>{o.push({type:0,doc:c})}),new As(e,t,cs.emptySet(t),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&cc(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W0{constructor(){this.ea=void 0,this.ta=[]}na(){return this.ta.some(e=>e.ra())}}class Q0{constructor(){this.queries=Ip(),this.onlineState="Unknown",this.ia=new Set}terminate(){(function(t,r){const s=de(t),i=s.queries;s.queries=Ip(),i.forEach((o,c)=>{for(const u of c.ta)u.onError(r)})})(this,new W(B.ABORTED,"Firestore shutting down"))}}function Ip(){return new hn(n=>Jg(n),cc)}async function Xu(n,e){const t=de(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.na()&&e.ra()&&(r=2):(i=new W0,r=e.ra()?0:1);try{switch(r){case 0:i.ea=await t.onListen(s,!0);break;case 1:i.ea=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const c=Ju(o,`Initialization of query '${Yr(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.ta.push(e),e.sa(t.onlineState),i.ea&&e.oa(i.ea)&&ed(t)}async function Zu(n,e){const t=de(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const o=i.ta.indexOf(e);o>=0&&(i.ta.splice(o,1),i.ta.length===0?s=e.ra()?0:1:!i.na()&&e.ra()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function Y0(n,e){const t=de(n);let r=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const c of o.ta)c.oa(s)&&(r=!0);o.ea=s}}r&&ed(t)}function J0(n,e,t){const r=de(n),s=r.queries.get(e);if(s)for(const i of s.ta)i.onError(t);r.queries.delete(e)}function ed(n){n.ia.forEach(e=>{e.next()})}var Ql,Ep;(Ep=Ql||(Ql={}))._a="default",Ep.Cache="cache";class td{constructor(e,t,r){this.query=e,this.aa=t,this.ua=!1,this.ca=null,this.onlineState="Unknown",this.options=r||{}}oa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new As(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.ua?this.la(e)&&(this.aa.next(e),t=!0):this.ha(e,this.onlineState)&&(this.Pa(e),t=!0),this.ca=e,t}onError(e){this.aa.error(e)}sa(e){this.onlineState=e;let t=!1;return this.ca&&!this.ua&&this.ha(this.ca,e)&&(this.Pa(this.ca),t=!0),t}ha(e,t){if(!e.fromCache||!this.ra())return!0;const r=t!=="Offline";return(!this.options.Ta||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}la(e){if(e.docChanges.length>0)return!0;const t=this.ca&&this.ca.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}Pa(e){e=As.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.ua=!0,this.aa.next(e)}ra(){return this.options.source!==Ql.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ev{constructor(e){this.key=e}}class tv{constructor(e){this.key=e}}class X0{constructor(e,t){this.query=e,this.fa=t,this.ga=null,this.hasCachedResults=!1,this.current=!1,this.pa=me(),this.mutatedKeys=me(),this.ya=Xg(e),this.wa=new cs(this.ya)}get Sa(){return this.fa}ba(e,t){const r=t?t.Da:new wp,s=t?t.wa:this.wa;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,c=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((f,p)=>{const g=s.get(f),_=Xi(this.query,p)?p:null,I=!!g&&this.mutatedKeys.has(g.key),S=!!_&&(_.hasLocalMutations||this.mutatedKeys.has(_.key)&&_.hasCommittedMutations);let A=!1;g&&_?g.data.isEqual(_.data)?I!==S&&(r.track({type:3,doc:_}),A=!0):this.va(g,_)||(r.track({type:2,doc:_}),A=!0,(u&&this.ya(_,u)>0||d&&this.ya(_,d)<0)&&(c=!0)):!g&&_?(r.track({type:0,doc:_}),A=!0):g&&!_&&(r.track({type:1,doc:g}),A=!0,(u||d)&&(c=!0)),A&&(_?(o=o.add(_),i=S?i.add(f):i.delete(f)):(o=o.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{wa:o,Da:r,ls:c,mutatedKeys:i}}va(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.wa;this.wa=e.wa,this.mutatedKeys=e.mutatedKeys;const o=e.Da.X_();o.sort((f,p)=>function(_,I){const S=A=>{switch(A){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return ee()}};return S(_)-S(I)}(f.type,p.type)||this.ya(f.doc,p.doc)),this.Ca(r),s=s!=null&&s;const c=t&&!s?this.Fa():[],u=this.pa.size===0&&this.current&&!s?1:0,d=u!==this.ga;return this.ga=u,o.length!==0||d?{snapshot:new As(this.query,e.wa,i,o,e.mutatedKeys,u===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),Ma:c}:{Ma:c}}sa(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({wa:this.wa,Da:new wp,mutatedKeys:this.mutatedKeys,ls:!1},!1)):{Ma:[]}}xa(e){return!this.fa.has(e)&&!!this.wa.has(e)&&!this.wa.get(e).hasLocalMutations}Ca(e){e&&(e.addedDocuments.forEach(t=>this.fa=this.fa.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.fa=this.fa.delete(t)),this.current=e.current)}Fa(){if(!this.current)return[];const e=this.pa;this.pa=me(),this.wa.forEach(r=>{this.xa(r.key)&&(this.pa=this.pa.add(r.key))});const t=[];return e.forEach(r=>{this.pa.has(r)||t.push(new tv(r))}),this.pa.forEach(r=>{e.has(r)||t.push(new ev(r))}),t}Oa(e){this.fa=e.gs,this.pa=me();const t=this.ba(e.documents);return this.applyChanges(t,!0)}Na(){return As.fromInitialDocuments(this.query,this.wa,this.mutatedKeys,this.ga===0,this.hasCachedResults)}}const nd="SyncEngine";class Z0{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class eS{constructor(e){this.key=e,this.Ba=!1}}class tS{constructor(e,t,r,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.La={},this.ka=new hn(c=>Jg(c),cc),this.qa=new Map,this.Qa=new Set,this.$a=new xe(J.comparator),this.Ua=new Map,this.Ka=new $u,this.Wa={},this.Ga=new Map,this.za=Sr.Kn(),this.onlineState="Unknown",this.ja=void 0}get isPrimaryClient(){return this.ja===!0}}async function nS(n,e,t=!0){const r=av(n);let s;const i=r.ka.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Na()):s=await nv(r,e,t,!0),s}async function rS(n,e){const t=av(n);await nv(t,e,!0,!1)}async function nv(n,e,t,r){const s=await E0(n.localStore,xt(e)),i=s.targetId,o=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await sS(n,e,i,o==="current",s.resumeToken)),n.isPrimaryClient&&t&&W_(n.remoteStore,s),c}async function sS(n,e,t,r,s){n.Ha=(p,g,_)=>async function(S,A,V,k){let P=A.view.ba(V);P.ls&&(P=await mp(S.localStore,A.query,!1).then(({documents:E})=>A.view.ba(E,P)));const L=k&&k.targetChanges.get(A.targetId),C=k&&k.targetMismatches.get(A.targetId)!=null,M=A.view.applyChanges(P,S.isPrimaryClient,L,C);return Ap(S,A.targetId,M.Ma),M.snapshot}(n,p,g,_);const i=await mp(n.localStore,e,!0),o=new X0(e,i.gs),c=o.ba(i.documents),u=Zi.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),d=o.applyChanges(c,n.isPrimaryClient,u);Ap(n,t,d.Ma);const f=new Z0(e,t,o);return n.ka.set(e,f),n.qa.has(t)?n.qa.get(t).push(e):n.qa.set(t,[e]),d.snapshot}async function iS(n,e,t){const r=de(n),s=r.ka.get(e),i=r.qa.get(s.targetId);if(i.length>1)return r.qa.set(s.targetId,i.filter(o=>!cc(o,e))),void r.ka.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Kl(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&Hu(r.remoteStore,s.targetId),Yl(r,s.targetId)}).catch(Vr)):(Yl(r,s.targetId),await Kl(r.localStore,s.targetId,!0))}async function oS(n,e){const t=de(n),r=t.ka.get(e),s=t.qa.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Hu(t.remoteStore,r.targetId))}async function aS(n,e,t){const r=cv(n);try{const s=await function(o,c){const u=de(o),d=Oe.now(),f=c.reduce((_,I)=>_.add(I.key),me());let p,g;return u.persistence.runTransaction("Locally write mutations","readwrite",_=>{let I=Et(),S=me();return u.ds.getEntries(_,f).next(A=>{I=A,I.forEach((V,k)=>{k.isValidDocument()||(S=S.add(V))})}).next(()=>u.localDocuments.getOverlayedDocuments(_,I)).next(A=>{p=A;const V=[];for(const k of c){const P=TA(k,p.get(k.key).overlayedDocument);P!=null&&V.push(new fn(k.key,P,jg(P.value.mapValue),it.exists(!0)))}return u.mutationQueue.addMutationBatch(_,d,V,c)}).next(A=>{g=A;const V=A.applyToLocalDocumentSet(p,S);return u.documentOverlayCache.saveOverlays(_,A.batchId,V)})}).then(()=>({batchId:g.batchId,changes:e_(p)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(o,c,u){let d=o.Wa[o.currentUser.toKey()];d||(d=new xe(ue)),d=d.insert(c,u),o.Wa[o.currentUser.toKey()]=d}(r,s.batchId,t),await no(r,s.changes),await to(r.remoteStore)}catch(s){const i=Ju(s,"Failed to persist write");t.reject(i)}}async function rv(n,e){const t=de(n);try{const r=await b0(t.localStore,e);e.targetChanges.forEach((s,i)=>{const o=t.Ua.get(i);o&&(ne(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.Ba=!0:s.modifiedDocuments.size>0?ne(o.Ba):s.removedDocuments.size>0&&(ne(o.Ba),o.Ba=!1))}),await no(t,r,e)}catch(r){await Vr(r)}}function Tp(n,e,t){const r=de(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.ka.forEach((i,o)=>{const c=o.view.sa(e);c.snapshot&&s.push(c.snapshot)}),function(o,c){const u=de(o);u.onlineState=c;let d=!1;u.queries.forEach((f,p)=>{for(const g of p.ta)g.sa(c)&&(d=!0)}),d&&ed(u)}(r.eventManager,e),s.length&&r.La.p_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function cS(n,e,t){const r=de(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Ua.get(e),i=s&&s.key;if(i){let o=new xe(J.comparator);o=o.insert(i,Me.newNoDocument(i,ie.min()));const c=me().add(i),u=new hc(ie.min(),new Map,new xe(ue),o,c);await rv(r,u),r.$a=r.$a.remove(i),r.Ua.delete(e),rd(r)}else await Kl(r.localStore,e,!1).then(()=>Yl(r,e,t)).catch(Vr)}async function lS(n,e){const t=de(n),r=e.batch.batchId;try{const s=await y0(t.localStore,e);iv(t,r,null),sv(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await no(t,s)}catch(s){await Vr(s)}}async function uS(n,e,t){const r=de(n);try{const s=await function(o,c){const u=de(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let f;return u.mutationQueue.lookupMutationBatch(d,c).next(p=>(ne(p!==null),f=p.keys(),u.mutationQueue.removeMutationBatch(d,p))).next(()=>u.mutationQueue.performConsistencyCheck(d)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(d,f,c)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,f)).next(()=>u.localDocuments.getDocuments(d,f))})}(r.localStore,e);iv(r,e,t),sv(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await no(r,s)}catch(s){await Vr(s)}}function sv(n,e){(n.Ga.get(e)||[]).forEach(t=>{t.resolve()}),n.Ga.delete(e)}function iv(n,e,t){const r=de(n);let s=r.Wa[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Wa[r.currentUser.toKey()]=s}}function Yl(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.qa.get(e))n.ka.delete(r),t&&n.La.Ja(r,t);n.qa.delete(e),n.isPrimaryClient&&n.Ka.br(e).forEach(r=>{n.Ka.containsKey(r)||ov(n,r)})}function ov(n,e){n.Qa.delete(e.path.canonicalString());const t=n.$a.get(e);t!==null&&(Hu(n.remoteStore,t),n.$a=n.$a.remove(e),n.Ua.delete(t),rd(n))}function Ap(n,e,t){for(const r of t)r instanceof ev?(n.Ka.addReference(r.key,e),dS(n,r)):r instanceof tv?(K(nd,"Document no longer in limbo: "+r.key),n.Ka.removeReference(r.key,e),n.Ka.containsKey(r.key)||ov(n,r.key)):ee()}function dS(n,e){const t=e.key,r=t.path.canonicalString();n.$a.get(t)||n.Qa.has(r)||(K(nd,"New document in limbo: "+t),n.Qa.add(r),rd(n))}function rd(n){for(;n.Qa.size>0&&n.$a.size<n.maxConcurrentLimboResolutions;){const e=n.Qa.values().next().value;n.Qa.delete(e);const t=new J(Ie.fromString(e)),r=n.za.next();n.Ua.set(r,new eS(t)),n.$a=n.$a.insert(t,r),W_(n.remoteStore,new on(xt(Ji(t.path)),r,"TargetPurposeLimboResolution",Pt.ae))}}async function no(n,e,t){const r=de(n),s=[],i=[],o=[];r.ka.isEmpty()||(r.ka.forEach((c,u)=>{o.push(r.Ha(u,e,t).then(d=>{var f;if((d||t)&&r.isPrimaryClient){const p=d?!d.fromCache:(f=t?.targetChanges.get(u.targetId))===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,p?"current":"not-current")}if(d){s.push(d);const p=zu.Yi(u.targetId,d);i.push(p)}}))}),await Promise.all(o),r.La.p_(s),await async function(u,d){const f=de(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>D.forEach(d,g=>D.forEach(g.Hi,_=>f.persistence.referenceDelegate.addReference(p,g.targetId,_)).next(()=>D.forEach(g.Ji,_=>f.persistence.referenceDelegate.removeReference(p,g.targetId,_)))))}catch(p){if(!qn(p))throw p;K(Gu,"Failed to update sequence numbers: "+p)}for(const p of d){const g=p.targetId;if(!p.fromCache){const _=f.Ts.get(g),I=_.snapshotVersion,S=_.withLastLimboFreeSnapshotVersion(I);f.Ts=f.Ts.insert(g,S)}}}(r.localStore,i))}async function hS(n,e){const t=de(n);if(!t.currentUser.isEqual(e)){K(nd,"User change. New user:",e.toKey());const r=await j_(t.localStore,e);t.currentUser=e,function(i,o){i.Ga.forEach(c=>{c.forEach(u=>{u.reject(new W(B.CANCELLED,o))})}),i.Ga.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await no(t,r.Rs)}}function fS(n,e){const t=de(n),r=t.Ua.get(e);if(r&&r.Ba)return me().add(r.key);{let s=me();const i=t.qa.get(e);if(!i)return s;for(const o of i){const c=t.ka.get(o);s=s.unionWith(c.view.Sa)}return s}}function av(n){const e=de(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=rv.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=fS.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=cS.bind(null,e),e.La.p_=Y0.bind(null,e.eventManager),e.La.Ja=J0.bind(null,e.eventManager),e}function cv(n){const e=de(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=lS.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=uS.bind(null,e),e}class Fi{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=gc(e.databaseInfo.databaseId),this.sharedClientState=this.Za(e),this.persistence=this.Xa(e),await this.persistence.start(),this.localStore=this.eu(e),this.gcScheduler=this.tu(e,this.localStore),this.indexBackfillerScheduler=this.nu(e,this.localStore)}tu(e,t){return null}nu(e,t){return null}eu(e){return q_(this.persistence,new $_,e.initialUser,this.serializer)}Xa(e){return new qu(mc.ri,this.serializer)}Za(e){return new G_}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Fi.provider={build:()=>new Fi};class pS extends Fi{constructor(e){super(),this.cacheSizeBytes=e}tu(e,t){ne(this.persistence.referenceDelegate instanceof Na);const r=this.persistence.referenceDelegate.garbageCollector;return new L_(r,e.asyncQueue,t)}Xa(e){const t=this.cacheSizeBytes!==void 0?rt.withCacheSize(this.cacheSizeBytes):rt.DEFAULT;return new qu(r=>Na.ri(r,t),this.serializer)}}class mS extends Fi{constructor(e,t,r){super(),this.ru=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.ru.initialize(this,e),await cv(this.ru.syncEngine),await to(this.ru.remoteStore),await this.persistence.Ci(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}eu(e){return q_(this.persistence,new $_,e.initialUser,this.serializer)}tu(e,t){const r=this.persistence.referenceDelegate.garbageCollector;return new L_(r,e.asyncQueue,t)}nu(e,t){const r=new TT(t,this.persistence);return new ET(e.asyncQueue,r)}Xa(e){const t=m0(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?rt.withCacheSize(this.cacheSizeBytes):rt.DEFAULT;return new ju(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,P0(),ra(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Za(e){return new G_}}class Va{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Tp(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=hS.bind(null,this.syncEngine),await K0(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new Q0}()}createDatastore(e){const t=gc(e.databaseInfo.databaseId),r=function(i){return new C0(i)}(e.databaseInfo);return function(i,o,c,u){return new V0(i,o,c,u)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,o,c){return new L0(r,s,i,o,c)}(this.localStore,this.datastore,e.asyncQueue,t=>Tp(this.syncEngine,t,0),function(){return vp.D()?new vp:new A0}())}createSyncEngine(e,t){return function(s,i,o,c,u,d,f){const p=new tS(s,i,o,c,u,d);return f&&(p.ja=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=de(s);K(Rr,"RemoteStore shutting down."),i.W_.add(5),await eo(i),i.z_.shutdown(),i.j_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Va.provider={build:()=>new Va};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class sd{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.iu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.iu(this.observer.error,e):ft("Uncaught Error in snapshot listener:",e.toString()))}su(){this.muted=!0}iu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Un="FirestoreClient";class gS{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=ht.UNAUTHENTICATED,this.clientId=yg.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async o=>{K(Un,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(K(Un,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Wt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Ju(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function cl(n,e){n.asyncQueue.verifyOperationInProgress(),K(Un,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await j_(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Sp(n,e){n.asyncQueue.verifyOperationInProgress();const t=await _S(n);K(Un,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>bp(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>bp(e.remoteStore,s)),n._onlineComponents=e}async function _S(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){K(Un,"Using user provided OfflineComponentProvider");try{await cl(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===B.FAILED_PRECONDITION||s.code===B.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;Si("Error using user provided cache. Falling back to memory cache: "+t),await cl(n,new Fi)}}else K(Un,"Using default OfflineComponentProvider"),await cl(n,new pS(void 0));return n._offlineComponents}async function lv(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(K(Un,"Using user provided OnlineComponentProvider"),await Sp(n,n._uninitializedComponentsProvider._online)):(K(Un,"Using default OnlineComponentProvider"),await Sp(n,new Va))),n._onlineComponents}function vS(n){return lv(n).then(e=>e.syncEngine)}async function Oa(n){const e=await lv(n),t=e.eventManager;return t.onListen=nS.bind(null,e.syncEngine),t.onUnlisten=iS.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=rS.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=oS.bind(null,e.syncEngine),t}function yS(n,e,t={}){const r=new Wt;return n.asyncQueue.enqueueAndForget(async()=>function(i,o,c,u,d){const f=new sd({next:g=>{f.su(),o.enqueueAndForget(()=>Zu(i,p));const _=g.docs.has(c);!_&&g.fromCache?d.reject(new W(B.UNAVAILABLE,"Failed to get document because the client is offline.")):_&&g.fromCache&&u&&u.source==="server"?d.reject(new W(B.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(g)},error:g=>d.reject(g)}),p=new td(Ji(c.path),f,{includeMetadataChanges:!0,Ta:!0});return Xu(i,p)}(await Oa(n),n.asyncQueue,e,t,r)),r.promise}function bS(n,e,t={}){const r=new Wt;return n.asyncQueue.enqueueAndForget(async()=>function(i,o,c,u,d){const f=new sd({next:g=>{f.su(),o.enqueueAndForget(()=>Zu(i,p)),g.fromCache&&u.source==="server"?d.reject(new W(B.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(g)},error:g=>d.reject(g)}),p=new td(c,f,{includeMetadataChanges:!0,Ta:!0});return Xu(i,p)}(await Oa(n),n.asyncQueue,e,t,r)),r.promise}/**
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
 */function uv(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rp=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dv(n,e,t){if(!t)throw new W(B.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function wS(n,e,t,r){if(e===!0&&r===!0)throw new W(B.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function kp(n){if(!J.isDocumentKey(n))throw new W(B.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Cp(n){if(J.isDocumentKey(n))throw new W(B.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function vc(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":ee()}function St(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new W(B.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=vc(n);throw new W(B.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function IS(n,e){if(e<=0)throw new W(B.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ES="firestore.googleapis.com",Pp=!0;class xp{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new W(B.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=ES,this.ssl=Pp}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:Pp;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=x_;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<O_)throw new W(B.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}wS("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=uv((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new W(B.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new W(B.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new W(B.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class id{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new xp({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new W(B.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new W(B.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new xp(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new fT;switch(r.type){case"firstParty":return new gT(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new W(B.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Rp.get(t);r&&(K("ComponentProvider","Removing Datastore"),Rp.delete(t),r.terminate())}(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xt{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Xt(this.firestore,e,this._query)}}class at{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Vn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new at(this.firestore,e,this._key)}}class Vn extends Xt{constructor(e,t,r){super(e,t,Ji(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new at(this.firestore,null,new J(e))}withConverter(e){return new Vn(this.firestore,e,this._path)}}function Ee(n,e,...t){if(n=Te(n),dv("collection","path",e),n instanceof id){const r=Ie.fromString(e,...t);return Cp(r),new Vn(n,null,r)}{if(!(n instanceof at||n instanceof Vn))throw new W(B.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Ie.fromString(e,...t));return Cp(r),new Vn(n.firestore,null,r)}}function be(n,e,...t){if(n=Te(n),arguments.length===1&&(e=yg.newId()),dv("doc","path",e),n instanceof id){const r=Ie.fromString(e,...t);return kp(r),new at(n,null,new J(r))}{if(!(n instanceof at||n instanceof Vn))throw new W(B.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Ie.fromString(e,...t));return kp(r),new at(n.firestore,n instanceof Vn?n.converter:null,new J(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Np="AsyncQueue";class Dp{constructor(e=Promise.resolve()){this.Vu=[],this.mu=!1,this.fu=[],this.gu=null,this.pu=!1,this.yu=!1,this.wu=[],this.a_=new H_(this,"async_queue_retry"),this.Su=()=>{const r=ra();r&&K(Np,"Visibility state changed to "+r.visibilityState),this.a_.t_()},this.bu=e;const t=ra();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Su)}get isShuttingDown(){return this.mu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Du(),this.vu(e)}enterRestrictedMode(e){if(!this.mu){this.mu=!0,this.yu=e||!1;const t=ra();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Su)}}enqueue(e){if(this.Du(),this.mu)return new Promise(()=>{});const t=new Wt;return this.vu(()=>this.mu&&this.yu?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Vu.push(e),this.Cu()))}async Cu(){if(this.Vu.length!==0){try{await this.Vu[0](),this.Vu.shift(),this.a_.reset()}catch(e){if(!qn(e))throw e;K(Np,"Operation failed with retryable error: "+e)}this.Vu.length>0&&this.a_.Xo(()=>this.Cu())}}vu(e){const t=this.bu.then(()=>(this.pu=!0,e().catch(r=>{this.gu=r,this.pu=!1;const s=function(o){let c=o.message||"";return o.stack&&(c=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),c}(r);throw ft("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.pu=!1,r))));return this.bu=t,t}enqueueAfterDelay(e,t,r){this.Du(),this.wu.indexOf(e)>-1&&(t=0);const s=Yu.createAndSchedule(this,e,t,r,i=>this.Fu(i));return this.fu.push(s),s}Du(){this.gu&&ee()}verifyOperationInProgress(){}async Mu(){let e;do e=this.bu,await e;while(e!==this.bu)}xu(e){for(const t of this.fu)if(t.timerId===e)return!0;return!1}Ou(e){return this.Mu().then(()=>{this.fu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.fu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Mu()})}Nu(e){this.wu.push(e)}Fu(e){const t=this.fu.indexOf(e);this.fu.splice(t,1)}}function Vp(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(n,["next","error","complete"])}class dn extends id{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Dp,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Dp(e),this._firestoreClient=void 0,await e}}}function TS(n,e,t){t||(t=Ea);const r=xr(n,"firestore");if(r.isInitialized(t)){const s=r.getImmediate({identifier:t}),i=r.getOptions(t);if(Ii(i,e))return s;throw new W(B.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new W(B.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<O_)throw new W(B.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return r.initialize({options:e,instanceIdentifier:t})}function yc(n){if(n._terminated)throw new W(B.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||AS(n),n._firestoreClient}function AS(n){var e,t,r;const s=n._freezeSettings(),i=function(c,u,d,f){return new ZT(c,u,d,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,uv(f.experimentalLongPollingOptions),f.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((t=s.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new gS(n._authCredentials,n._appCheckCredentials,n._queue,i,n._componentsProvider&&function(c){const u=c?._online.build();return{_offline:c?._offline.build(u),_online:u}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ss{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Ss(ze.fromBase64String(e))}catch(t){throw new W(B.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Ss(ze.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bc{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new W(B.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ve(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class od{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new W(B.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new W(B.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return ue(this._lat,e._lat)||ue(this._long,e._long)}}/**
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
 */class ad{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const SS=/^__.*__$/;class RS{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new fn(e,this.data,this.fieldMask,t,this.fieldTransforms):new Os(e,this.data,t,this.fieldTransforms)}}class hv{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new fn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function fv(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw ee()}}class cd{constructor(e,t,r,s,i,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Bu(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Lu(){return this.settings.Lu}ku(e){return new cd(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}qu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.ku({path:r,Qu:!1});return s.$u(e),s}Uu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.ku({path:r,Qu:!1});return s.Bu(),s}Ku(e){return this.ku({path:void 0,Qu:!0})}Wu(e){return La(e,this.settings.methodName,this.settings.Gu||!1,this.path,this.settings.zu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Bu(){if(this.path)for(let e=0;e<this.path.length;e++)this.$u(this.path.get(e))}$u(e){if(e.length===0)throw this.Wu("Document fields must not be empty");if(fv(this.Lu)&&SS.test(e))throw this.Wu('Document fields cannot begin and end with "__"')}}class kS{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||gc(e)}ju(e,t,r,s=!1){return new cd({Lu:e,methodName:t,zu:r,path:Ve.emptyPath(),Qu:!1,Gu:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function ro(n){const e=n._freezeSettings(),t=gc(n._databaseId);return new kS(n._databaseId,!!e.ignoreUndefinedProperties,t)}function pv(n,e,t,r,s,i={}){const o=n.ju(i.merge||i.mergeFields?2:0,e,t,s);ud("Data must be an object, but it was:",o,r);const c=gv(r,o);let u,d;if(i.merge)u=new gt(o.fieldMask),d=o.fieldTransforms;else if(i.mergeFields){const f=[];for(const p of i.mergeFields){const g=Jl(e,p,t);if(!o.contains(g))throw new W(B.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);vv(f,g)||f.push(g)}u=new gt(f),d=o.fieldTransforms.filter(p=>u.covers(p.field))}else u=null,d=o.fieldTransforms;return new RS(new st(c),u,d)}class so extends wc{_toFieldTransform(e){if(e.Lu!==2)throw e.Lu===1?e.Wu(`${this._methodName}() can only appear at the top level of your update data`):e.Wu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof so}}class ld extends wc{constructor(e,t){super(e),this.Ju=t}_toFieldTransform(e){const t=new Es(e.serializer,r_(e.serializer,this.Ju));return new c_(e.path,t)}isEqual(e){return e instanceof ld&&this.Ju===e.Ju}}function CS(n,e,t,r){const s=n.ju(1,e,t);ud("Data must be an object, but it was:",s,r);const i=[],o=st.empty();jn(r,(u,d)=>{const f=dd(e,u,t);d=Te(d);const p=s.Uu(f);if(d instanceof so)i.push(f);else{const g=io(d,p);g!=null&&(i.push(f),o.set(f,g))}});const c=new gt(i);return new hv(o,c,s.fieldTransforms)}function PS(n,e,t,r,s,i){const o=n.ju(1,e,t),c=[Jl(e,r,t)],u=[s];if(i.length%2!=0)throw new W(B.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<i.length;g+=2)c.push(Jl(e,i[g])),u.push(i[g+1]);const d=[],f=st.empty();for(let g=c.length-1;g>=0;--g)if(!vv(d,c[g])){const _=c[g];let I=u[g];I=Te(I);const S=o.Uu(_);if(I instanceof so)d.push(_);else{const A=io(I,S);A!=null&&(d.push(_),f.set(_,A))}}const p=new gt(d);return new hv(f,p,o.fieldTransforms)}function mv(n,e,t,r=!1){return io(t,n.ju(r?4:3,e))}function io(n,e){if(_v(n=Te(n)))return ud("Unsupported field value:",e,n),gv(n,e);if(n instanceof wc)return function(r,s){if(!fv(s.Lu))throw s.Wu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Wu(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.Qu&&e.Lu!==4)throw e.Wu("Nested arrays are not supported");return function(r,s){const i=[];let o=0;for(const c of r){let u=io(c,s.Ku(o));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),o++}return{arrayValue:{values:i}}}(n,e)}return function(r,s){if((r=Te(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return r_(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=Oe.fromDate(r);return{timestampValue:Ts(s.serializer,i)}}if(r instanceof Oe){const i=new Oe(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Ts(s.serializer,i)}}if(r instanceof od)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Ss)return{bytesValue:m_(s.serializer,r._byteString)};if(r instanceof at){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.Wu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Fu(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof ad)return function(o,c){return{mapValue:{fields:{[Cu]:{stringValue:Pu},[vs]:{arrayValue:{values:o.toArray().map(d=>{if(typeof d!="number")throw c.Wu("VectorValues must only contain numeric values.");return Du(c.serializer,d)})}}}}}}(r,s);throw s.Wu(`Unsupported field value: ${vc(r)}`)}(n,e)}function gv(n,e){const t={};return Vg(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):jn(n,(r,s)=>{const i=io(s,e.qu(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function _v(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Oe||n instanceof od||n instanceof Ss||n instanceof at||n instanceof wc||n instanceof ad)}function ud(n,e,t){if(!_v(t)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(t)){const r=vc(t);throw r==="an object"?e.Wu(n+" a custom object"):e.Wu(n+" "+r)}}function Jl(n,e,t){if((e=Te(e))instanceof bc)return e._internalPath;if(typeof e=="string")return dd(n,e);throw La("Field path arguments must be of type string or ",n,!1,void 0,t)}const xS=new RegExp("[~\\*/\\[\\]]");function dd(n,e,t){if(e.search(xS)>=0)throw La(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new bc(...e.split("."))._internalPath}catch{throw La(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function La(n,e,t,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${r}`),o&&(u+=` in document ${s}`),u+=")"),new W(B.INVALID_ARGUMENT,c+n+u)}function vv(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hd{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new at(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new NS(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Ic("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class NS extends hd{data(){return super.data()}}function Ic(n,e){return typeof e=="string"?dd(n,e):e instanceof bc?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yv(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new W(B.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class fd{}class Ec extends fd{}function Je(n,e,...t){let r=[];e instanceof fd&&r.push(e),r=r.concat(t),function(i){const o=i.filter(u=>u instanceof pd).length,c=i.filter(u=>u instanceof Tc).length;if(o>1||o>0&&c>0)throw new W(B.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class Tc extends Ec{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Tc(e,t,r)}_apply(e){const t=this._parse(e);return bv(e._query,t),new Xt(e.firestore,e.converter,Ul(e._query,t))}_parse(e){const t=ro(e.firestore);return function(i,o,c,u,d,f,p){let g;if(d.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new W(B.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Lp(p,f);const I=[];for(const S of p)I.push(Op(u,i,S));g={arrayValue:{values:I}}}else g=Op(u,i,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Lp(p,f),g=mv(c,o,p,f==="in"||f==="not-in");return _e.create(d,f,g)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function Bn(n,e,t){const r=e,s=Ic("where",n);return Tc._create(s,r,t)}class pd extends fd{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new pd(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:Ae.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let o=s;const c=i.getFlattenedFilters();for(const u of c)bv(o,u),o=Ul(o,u)}(e._query,t),new Xt(e.firestore,e.converter,Ul(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class md extends Ec{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new md(e,t)}_apply(e){const t=function(s,i,o){if(s.startAt!==null)throw new W(B.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new W(B.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Li(i,o)}(e._query,this._field,this._direction);return new Xt(e.firestore,e.converter,function(s,i){const o=s.explicitOrderBy.concat([i]);return new Or(s.path,s.collectionGroup,o,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,t))}}function mt(n,e="asc"){const t=e,r=Ic("orderBy",n);return md._create(r,t)}class gd extends Ec{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new gd(e,t,r)}_apply(e){return new Xt(e.firestore,e.converter,Sa(e._query,this._limit,this._limitType))}}function kt(n){return IS("limit",n),gd._create("limit",n,"F")}class _d extends Ec{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new _d(e,t,r)}_apply(e){const t=VS(e,this.type,this._docOrFields,this._inclusive);return new Xt(e.firestore,e.converter,function(s,i){return new Or(s.path,s.collectionGroup,s.explicitOrderBy.slice(),s.filters.slice(),s.limit,s.limitType,i,s.endAt)}(e._query,t))}}function DS(...n){return _d._create("startAfter",n,!1)}function VS(n,e,t,r){if(t[0]=Te(t[0]),t[0]instanceof hd)return function(i,o,c,u,d){if(!u)throw new W(B.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${c}().`);const f=[];for(const p of as(i))if(p.field.isKeyField())f.push(Ir(o,u.key));else{const g=u.data.field(p.field);if(ic(g))throw new W(B.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+p.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(g===null){const _=p.field.canonicalString();throw new W(B.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${_}' (used as the orderBy) does not exist.`)}f.push(g)}return new Mn(f,d)}(n._query,n.firestore._databaseId,e,t[0]._document,r);{const s=ro(n.firestore);return function(o,c,u,d,f,p){const g=o.explicitOrderBy;if(f.length>g.length)throw new W(B.INVALID_ARGUMENT,`Too many arguments provided to ${d}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const _=[];for(let I=0;I<f.length;I++){const S=f[I];if(g[I].field.isKeyField()){if(typeof S!="string")throw new W(B.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${d}(), but got a ${typeof S}`);if(!Nu(o)&&S.indexOf("/")!==-1)throw new W(B.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${d}() must be a plain document ID, but '${S}' contains a slash.`);const A=o.path.child(Ie.fromString(S));if(!J.isDocumentKey(A))throw new W(B.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${d}() must result in a valid document path, but '${A}' is not because it contains an odd number of segments.`);const V=new J(A);_.push(Ir(c,V))}else{const A=mv(u,d,S);_.push(A)}}return new Mn(_,p)}(n._query,n.firestore._databaseId,s,e,t,r)}}function Op(n,e,t){if(typeof(t=Te(t))=="string"){if(t==="")throw new W(B.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Nu(e)&&t.indexOf("/")!==-1)throw new W(B.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(Ie.fromString(t));if(!J.isDocumentKey(r))throw new W(B.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Ir(n,new J(r))}if(t instanceof at)return Ir(n,t._key);throw new W(B.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${vc(t)}.`)}function Lp(n,e){if(!Array.isArray(n)||n.length===0)throw new W(B.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function bv(n,e){const t=function(s,i){for(const o of s)for(const c of o.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new W(B.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new W(B.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class OS{convertValue(e,t="none"){switch(On(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Pe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(un(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw ee()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return jn(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){var t,r,s;const i=(s=(r=(t=e.fields)===null||t===void 0?void 0:t[vs].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(o=>Pe(o.doubleValue));return new ad(i)}convertGeoPoint(e){return new od(Pe(e.latitude),Pe(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=oc(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Di(e));default:return null}}convertTimestamp(e){const t=ln(e);return new Oe(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=Ie.fromString(e);ne(A_(r));const s=new wr(r.get(1),r.get(3)),i=new J(r.popFirst(5));return s.isEqual(t)||ft(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wv(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ui{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Iv extends hd{constructor(e,t,r,s,i,o){super(e,t,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new sa(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Ic("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class sa extends Iv{data(e={}){return super.data(e)}}class Ev{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new ui(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new sa(this._firestore,this._userDataWriter,r.key,r,new ui(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new W(B.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(c=>{const u=new sa(s._firestore,s._userDataWriter,c.doc.key,c.doc,new ui(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(c=>i||c.type!==3).map(c=>{const u=new sa(s._firestore,s._userDataWriter,c.doc.key,c.doc,new ui(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let d=-1,f=-1;return c.type!==0&&(d=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),f=o.indexOf(c.doc.key)),{type:LS(c.type),doc:u,oldIndex:d,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function LS(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return ee()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zn(n){n=St(n,at);const e=St(n.firestore,dn);return yS(yc(e),n._key).then(t=>Tv(e,n,t))}class vd extends OS{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ss(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new at(this.firestore,null,t)}}function Mt(n){n=St(n,Xt);const e=St(n.firestore,dn),t=yc(e),r=new vd(e);return yv(n._query),bS(t,n._query).then(s=>new Ev(e,r,n,s))}function Ac(n,e,t){n=St(n,at);const r=St(n.firestore,dn),s=wv(n.converter,e,t);return Sc(r,[pv(ro(r),"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,it.none())])}function Xe(n,e,t,...r){n=St(n,at);const s=St(n.firestore,dn),i=ro(s);let o;return o=typeof(e=Te(e))=="string"||e instanceof bc?PS(i,"updateDoc",n._key,e,t,r):CS(i,"updateDoc",n._key,e),Sc(s,[o.toMutation(n._key,it.exists(!0))])}function yd(n){return Sc(St(n.firestore,dn),[new dc(n._key,it.none())])}function Ut(n,e){const t=St(n.firestore,dn),r=be(n),s=wv(n.converter,e);return Sc(t,[pv(ro(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,it.exists(!1))]).then(()=>r)}function Bt(n,...e){var t,r,s;n=Te(n);let i={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||Vp(e[o])||(i=e[o],o++);const c={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(Vp(e[o])){const p=e[o];e[o]=(t=p.next)===null||t===void 0?void 0:t.bind(p),e[o+1]=(r=p.error)===null||r===void 0?void 0:r.bind(p),e[o+2]=(s=p.complete)===null||s===void 0?void 0:s.bind(p)}let u,d,f;if(n instanceof at)d=St(n.firestore,dn),f=Ji(n._key.path),u={next:p=>{e[o]&&e[o](Tv(d,n,p))},error:e[o+1],complete:e[o+2]};else{const p=St(n,Xt);d=St(p.firestore,dn),f=p._query;const g=new vd(d);u={next:_=>{e[o]&&e[o](new Ev(d,g,p,_))},error:e[o+1],complete:e[o+2]},yv(n._query)}return function(g,_,I,S){const A=new sd(S),V=new td(_,A,I);return g.asyncQueue.enqueueAndForget(async()=>Xu(await Oa(g),V)),()=>{A.su(),g.asyncQueue.enqueueAndForget(async()=>Zu(await Oa(g),V))}}(yc(d),f,c,u)}function Sc(n,e){return function(r,s){const i=new Wt;return r.asyncQueue.enqueueAndForget(async()=>aS(await vS(r),s,i)),i.promise}(yc(n),e)}function Tv(n,e,t){const r=t.docs.get(e._key),s=new vd(n);return new Iv(n,s,e._key,r,new ui(t.hasPendingWrites,t.fromCache),e.converter)}class MS{constructor(e){let t;this.kind="persistent",e?.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=Av(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}function FS(n){return new MS(n)}class US{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Va.provider,this._offlineComponentProvider={build:t=>new mS(t,e?.cacheSizeBytes,this.forceOwnership)}}}function Av(n){return new US(n?.forceOwnership)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mp(){return new so("deleteField")}function Zt(n){return new ld("increment",n)}(function(e,t=!0){(function(s){Vs=s})(Nr),Qt(new Ot("firestore",(r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),c=new dn(new pT(r.getProvider("auth-internal")),new _T(o,r.getProvider("app-check-internal")),function(d,f){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new W(B.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new wr(d.options.projectId,f)}(o,s),o);return i=Object.assign({useFetchStreams:t},i),c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),At(_f,vf,e),At(_f,vf,"esm2017")})();var BS="firebase",$S="11.3.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */At(BS,$S,"app");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xl=new Map,Sv={activated:!1,tokenObservers:[]},qS={initialized:!1,enabled:!1};function Ge(n){return Xl.get(n)||Object.assign({},Sv)}function jS(n,e){return Xl.set(n,e),Xl.get(n)}function Rc(){return qS}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rv="https://content-firebaseappcheck.googleapis.com/v1",zS="exchangeRecaptchaV3Token",GS="exchangeDebugToken",Fp={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:16*60*1e3},HS=24*60*60*1e3;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KS{constructor(e,t,r,s,i){if(this.operation=e,this.retryPolicy=t,this.getWaitDuration=r,this.lowerBound=s,this.upperBound=i,this.pending=null,this.nextErrorWaitInterval=s,s>i)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new wi,this.pending.promise.catch(t=>{}),await WS(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new wi,this.pending.promise.catch(t=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(t){this.retryPolicy(t)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const t=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),t}}}function WS(n){return new Promise(e=>{setTimeout(e,n)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QS={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.",throttled:"Requests throttled due to {$httpStatus} error. Attempts allowed again after {$time}"},_t=new xs("appCheck","AppCheck",QS);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Up(n=!1){var e;return n?(e=self.grecaptcha)===null||e===void 0?void 0:e.enterprise:self.grecaptcha}function bd(n){if(!Ge(n).activated)throw _t.create("use-before-activation",{appName:n.name})}function kv(n){const e=Math.round(n/1e3),t=Math.floor(e/(3600*24)),r=Math.floor((e-t*3600*24)/3600),s=Math.floor((e-t*3600*24-r*3600)/60),i=e-t*3600*24-r*3600-s*60;let o="";return t&&(o+=Do(t)+"d:"),r&&(o+=Do(r)+"h:"),o+=Do(s)+"m:"+Do(i)+"s",o}function Do(n){return n===0?"00":n>=10?n.toString():"0"+n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wd({url:n,body:e},t){const r={"Content-Type":"application/json"},s=t.getImmediate({optional:!0});if(s){const p=await s.getHeartbeatsHeader();p&&(r["X-Firebase-Client"]=p)}const i={method:"POST",body:JSON.stringify(e),headers:r};let o;try{o=await fetch(n,i)}catch(p){throw _t.create("fetch-network-error",{originalErrorMessage:p?.message})}if(o.status!==200)throw _t.create("fetch-status-error",{httpStatus:o.status});let c;try{c=await o.json()}catch(p){throw _t.create("fetch-parse-error",{originalErrorMessage:p?.message})}const u=c.ttl.match(/^([\d.]+)(s)$/);if(!u||!u[2]||isNaN(Number(u[1])))throw _t.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${c.ttl}`});const d=Number(u[1])*1e3,f=Date.now();return{token:c.token,expireTimeMillis:f+d,issuedAtTimeMillis:f}}function YS(n,e){const{projectId:t,appId:r,apiKey:s}=n.options;return{url:`${Rv}/projects/${t}/apps/${r}:${zS}?key=${s}`,body:{recaptcha_v3_token:e}}}function Cv(n,e){const{projectId:t,appId:r,apiKey:s}=n.options;return{url:`${Rv}/projects/${t}/apps/${r}:${GS}?key=${s}`,body:{debug_token:e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JS="firebase-app-check-database",XS=1,Ui="firebase-app-check-store",Pv="debug-token";let Vo=null;function xv(){return Vo||(Vo=new Promise((n,e)=>{try{const t=indexedDB.open(JS,XS);t.onsuccess=r=>{n(r.target.result)},t.onerror=r=>{var s;e(_t.create("storage-open",{originalErrorMessage:(s=r.target.error)===null||s===void 0?void 0:s.message}))},t.onupgradeneeded=r=>{const s=r.target.result;switch(r.oldVersion){case 0:s.createObjectStore(Ui,{keyPath:"compositeKey"})}}}catch(t){e(_t.create("storage-open",{originalErrorMessage:t?.message}))}}),Vo)}function ZS(n){return Dv(Vv(n))}function eR(n,e){return Nv(Vv(n),e)}function tR(n){return Nv(Pv,n)}function nR(){return Dv(Pv)}async function Nv(n,e){const r=(await xv()).transaction(Ui,"readwrite"),i=r.objectStore(Ui).put({compositeKey:n,value:e});return new Promise((o,c)=>{i.onsuccess=u=>{o()},r.onerror=u=>{var d;c(_t.create("storage-set",{originalErrorMessage:(d=u.target.error)===null||d===void 0?void 0:d.message}))}})}async function Dv(n){const t=(await xv()).transaction(Ui,"readonly"),s=t.objectStore(Ui).get(n);return new Promise((i,o)=>{s.onsuccess=c=>{const u=c.target.result;i(u?u.value:void 0)},t.onerror=c=>{var u;o(_t.create("storage-get",{originalErrorMessage:(u=c.target.error)===null||u===void 0?void 0:u.message}))}})}function Vv(n){return`${n.options.appId}-${n.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bi=new Wa("@firebase/app-check");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rR(n){if(Ka()){let e;try{e=await ZS(n)}catch(t){Bi.warn(`Failed to read token from IndexedDB. Error: ${t}`)}return e}}function ll(n,e){return Ka()?eR(n,e).catch(t=>{Bi.warn(`Failed to write token to IndexedDB. Error: ${t}`)}):Promise.resolve()}async function sR(){let n;try{n=await nR()}catch{}if(n)return n;{const e=crypto.randomUUID();return tR(e).catch(t=>Bi.warn(`Failed to persist debug token to IndexedDB. Error: ${t}`)),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Id(){return Rc().enabled}async function Ed(){const n=Rc();if(n.enabled&&n.token)return n.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function iR(){const n=bm(),e=Rc();if(e.initialized=!0,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&n.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const t=new wi;e.token=t,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?t.resolve(n.FIREBASE_APPCHECK_DEBUG_TOKEN):t.resolve(sR())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oR={error:"UNKNOWN_ERROR"};function aR(n){return du.encodeString(JSON.stringify(n),!1)}async function Zl(n,e=!1){const t=n.app;bd(t);const r=Ge(t);let s=r.token,i;if(s&&!rs(s)&&(r.token=void 0,s=void 0),!s){const u=await r.cachedTokenPromise;u&&(rs(u)?s=u:await ll(t,void 0))}if(!e&&s&&rs(s))return{token:s.token};let o=!1;if(Id()){r.exchangeTokenPromise||(r.exchangeTokenPromise=wd(Cv(t,await Ed()),n.heartbeatServiceProvider).finally(()=>{r.exchangeTokenPromise=void 0}),o=!0);const u=await r.exchangeTokenPromise;return await ll(t,u),r.token=u,{token:u.token}}try{r.exchangeTokenPromise||(r.exchangeTokenPromise=r.provider.getToken().finally(()=>{r.exchangeTokenPromise=void 0}),o=!0),s=await Ge(t).exchangeTokenPromise}catch(u){u.code==="appCheck/throttled"?Bi.warn(u.message):Bi.error(u),i=u}let c;return s?i?rs(s)?c={token:s.token,internalError:i}:c=$p(i):(c={token:s.token},r.token=s,await ll(t,s)):c=$p(i),o&&Mv(t,c),c}async function cR(n){const e=n.app;bd(e);const{provider:t}=Ge(e);if(Id()){const r=await Ed(),{token:s}=await wd(Cv(e,r),n.heartbeatServiceProvider);return{token:s}}else{const{token:r}=await t.getToken();return{token:r}}}function Ov(n,e,t,r){const{app:s}=n,i=Ge(s),o={next:t,error:r,type:e};if(i.tokenObservers=[...i.tokenObservers,o],i.token&&rs(i.token)){const c=i.token;Promise.resolve().then(()=>{t({token:c.token}),Bp(n)}).catch(()=>{})}i.cachedTokenPromise.then(()=>Bp(n))}function Lv(n,e){const t=Ge(n),r=t.tokenObservers.filter(s=>s.next!==e);r.length===0&&t.tokenRefresher&&t.tokenRefresher.isRunning()&&t.tokenRefresher.stop(),t.tokenObservers=r}function Bp(n){const{app:e}=n,t=Ge(e);let r=t.tokenRefresher;r||(r=lR(n),t.tokenRefresher=r),!r.isRunning()&&t.isTokenAutoRefreshEnabled&&r.start()}function lR(n){const{app:e}=n;return new KS(async()=>{const t=Ge(e);let r;if(t.token?r=await Zl(n,!0):r=await Zl(n),r.error)throw r.error;if(r.internalError)throw r.internalError},()=>!0,()=>{const t=Ge(e);if(t.token){let r=t.token.issuedAtTimeMillis+(t.token.expireTimeMillis-t.token.issuedAtTimeMillis)*.5+3e5;const s=t.token.expireTimeMillis-5*60*1e3;return r=Math.min(r,s),Math.max(0,r-Date.now())}else return 0},Fp.RETRIAL_MIN_WAIT,Fp.RETRIAL_MAX_WAIT)}function Mv(n,e){const t=Ge(n).tokenObservers;for(const r of t)try{r.type==="EXTERNAL"&&e.error!=null?r.error(e.error):r.next(e)}catch{}}function rs(n){return n.expireTimeMillis-Date.now()>0}function $p(n){return{token:aR(oR),error:n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uR{constructor(e,t){this.app=e,this.heartbeatServiceProvider=t}_delete(){const{tokenObservers:e}=Ge(this.app);for(const t of e)Lv(this.app,t.next);return Promise.resolve()}}function dR(n,e){return new uR(n,e)}function hR(n){return{getToken:e=>Zl(n,e),getLimitedUseToken:()=>cR(n),addTokenListener:e=>Ov(n,"INTERNAL",e),removeTokenListener:e=>Lv(n.app,e)}}const fR="@firebase/app-check",pR="0.8.11";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mR="https://www.google.com/recaptcha/api.js";function gR(n,e){const t=new wi,r=Ge(n);r.reCAPTCHAState={initialized:t};const s=_R(n),i=Up(!1);return i?qp(n,e,i,s,t):bR(()=>{const o=Up(!1);if(!o)throw new Error("no recaptcha");qp(n,e,o,s,t)}),t.promise}function qp(n,e,t,r,s){t.ready(()=>{yR(n,e,t,r),s.resolve(t)})}function _R(n){const e=`fire_app_check_${n.name}`,t=document.createElement("div");return t.id=e,t.style.display="none",document.body.appendChild(t),e}async function vR(n){bd(n);const t=await Ge(n).reCAPTCHAState.initialized.promise;return new Promise((r,s)=>{const i=Ge(n).reCAPTCHAState;t.ready(()=>{r(t.execute(i.widgetId,{action:"fire_app_check"}))})})}function yR(n,e,t,r){const s=t.render(r,{sitekey:e,size:"invisible",callback:()=>{Ge(n).reCAPTCHAState.succeeded=!0},"error-callback":()=>{Ge(n).reCAPTCHAState.succeeded=!1}}),i=Ge(n);i.reCAPTCHAState=Object.assign(Object.assign({},i.reCAPTCHAState),{widgetId:s})}function bR(n){const e=document.createElement("script");e.src=mR,e.onload=n,document.head.appendChild(e)}/**
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
 */class Td{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){var e,t,r;IR(this._throttleData);const s=await vR(this._app).catch(o=>{throw _t.create("recaptcha-error")});if(!(!((e=Ge(this._app).reCAPTCHAState)===null||e===void 0)&&e.succeeded))throw _t.create("recaptcha-error");let i;try{i=await wd(YS(this._app,s),this._heartbeatServiceProvider)}catch(o){throw!((t=o.code)===null||t===void 0)&&t.includes("fetch-status-error")?(this._throttleData=wR(Number((r=o.customData)===null||r===void 0?void 0:r.httpStatus),this._throttleData),_t.create("throttled",{time:kv(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):o}return this._throttleData=null,i}initialize(e){this._app=e,this._heartbeatServiceProvider=xr(e,"heartbeat"),gR(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof Td?this._siteKey===e._siteKey:!1}}function wR(n,e){if(n===404||n===403)return{backoffCount:1,allowRequestsAfter:Date.now()+HS,httpStatus:n};{const t=e?e.backoffCount:0,r=Gb(t,1e3,2);return{backoffCount:t+1,allowRequestsAfter:Date.now()+r,httpStatus:n}}}function IR(n){if(n&&Date.now()-n.allowRequestsAfter<=0)throw _t.create("throttled",{time:kv(n.allowRequestsAfter-Date.now()),httpStatus:n.httpStatus})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ER(n=Qa(),e){n=Te(n);const t=xr(n,"app-check");if(Rc().initialized||iR(),Id()&&Ed().then(s=>console.log(`App Check debug token: ${s}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(i.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&i.provider.isEqual(e.provider))return s;throw _t.create("already-initialized",{appName:n.name})}const r=t.initialize({options:e});return TR(n,e.provider,e.isTokenAutoRefreshEnabled),Ge(n).isTokenAutoRefreshEnabled&&Ov(r,"INTERNAL",()=>{}),r}function TR(n,e,t){const r=jS(n,Object.assign({},Sv));r.activated=!0,r.provider=e,r.cachedTokenPromise=rR(n).then(s=>(s&&rs(s)&&(r.token=s,Mv(n,{token:s.token})),s)),r.isTokenAutoRefreshEnabled=t===void 0?n.automaticDataCollectionEnabled:t,r.provider.initialize(n)}const AR="app-check",jp="app-check-internal";function SR(){Qt(new Ot(AR,n=>{const e=n.getProvider("app").getImmediate(),t=n.getProvider("heartbeat");return dR(e,t)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((n,e,t)=>{n.getProvider(jp).initialize()})),Qt(new Ot(jp,n=>{const e=n.getProvider("app-check").getImmediate();return hR(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),At(fR,pR)}SR();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RR="type.googleapis.com/google.protobuf.Int64Value",kR="type.googleapis.com/google.protobuf.UInt64Value";function Fv(n,e){const t={};for(const r in n)n.hasOwnProperty(r)&&(t[r]=e(n[r]));return t}function Ma(n){if(n==null)return null;if(n instanceof Number&&(n=n.valueOf()),typeof n=="number"&&isFinite(n)||n===!0||n===!1||Object.prototype.toString.call(n)==="[object String]")return n;if(n instanceof Date)return n.toISOString();if(Array.isArray(n))return n.map(e=>Ma(e));if(typeof n=="function"||typeof n=="object")return Fv(n,e=>Ma(e));throw new Error("Data cannot be encoded in JSON: "+n)}function Rs(n){if(n==null)return n;if(n["@type"])switch(n["@type"]){case RR:case kR:{const e=Number(n.value);if(isNaN(e))throw new Error("Data cannot be decoded from JSON: "+n);return e}default:throw new Error("Data cannot be decoded from JSON: "+n)}return Array.isArray(n)?n.map(e=>Rs(e)):typeof n=="function"||typeof n=="object"?Fv(n,e=>Rs(e)):n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ad="functions";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zp={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class vt extends Ft{constructor(e,t,r){super(`${Ad}/${e}`,t||""),this.details=r,Object.setPrototypeOf(this,vt.prototype)}}function CR(n){if(n>=200&&n<300)return"ok";switch(n){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function Fa(n,e){let t=CR(n),r=t,s;try{const i=e&&e.error;if(i){const o=i.status;if(typeof o=="string"){if(!zp[o])return new vt("internal","internal");t=zp[o],r=o}const c=i.message;typeof c=="string"&&(r=c),s=i.details,s!==void 0&&(s=Rs(s))}}catch{}return t==="ok"?null:new vt(t,r,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PR{constructor(e,t,r,s){this.app=e,this.auth=null,this.messaging=null,this.appCheck=null,this.serverAppAppCheckToken=null,It(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.auth=t.getImmediate({optional:!0}),this.messaging=r.getImmediate({optional:!0}),this.auth||t.get().then(i=>this.auth=i,()=>{}),this.messaging||r.get().then(i=>this.messaging=i,()=>{}),this.appCheck||s?.get().then(i=>this.appCheck=i,()=>{})}async getAuthToken(){if(this.auth)try{const e=await this.auth.getToken();return e?.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(e){if(this.serverAppAppCheckToken)return this.serverAppAppCheckToken;if(this.appCheck){const t=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return t.error?null:t.token}return null}async getContext(e){const t=await this.getAuthToken(),r=await this.getMessagingToken(),s=await this.getAppCheckToken(e);return{authToken:t,messagingToken:r,appCheckToken:s}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eu="us-central1",xR=/^data: (.*?)(?:\n|$)/;function NR(n){let e=null;return{promise:new Promise((t,r)=>{e=setTimeout(()=>{r(new vt("deadline-exceeded","deadline-exceeded"))},n)}),cancel:()=>{e&&clearTimeout(e)}}}class DR{constructor(e,t,r,s,i=eu,o=(...c)=>fetch(...c)){this.app=e,this.fetchImpl=o,this.emulatorOrigin=null,this.contextProvider=new PR(e,t,r,s),this.cancelAllRequests=new Promise(c=>{this.deleteService=()=>Promise.resolve(c())});try{const c=new URL(i);this.customDomain=c.origin+(c.pathname==="/"?"":c.pathname),this.region=eu}catch{this.customDomain=null,this.region=i}}_delete(){return this.deleteService()}_url(e){const t=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${t}/${this.region}/${e}`:this.customDomain!==null?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`}}function VR(n,e,t){n.emulatorOrigin=`http://${e}:${t}`}function OR(n,e,t){const r=s=>MR(n,e,s,{});return r.stream=(s,i)=>UR(n,e,s,i),r}async function LR(n,e,t,r){t["Content-Type"]="application/json";let s;try{s=await r(n,{method:"POST",body:JSON.stringify(e),headers:t})}catch{return{status:0,json:null}}let i=null;try{i=await s.json()}catch{}return{status:s.status,json:i}}async function Uv(n,e){const t={},r=await n.contextProvider.getContext(e.limitedUseAppCheckTokens);return r.authToken&&(t.Authorization="Bearer "+r.authToken),r.messagingToken&&(t["Firebase-Instance-ID-Token"]=r.messagingToken),r.appCheckToken!==null&&(t["X-Firebase-AppCheck"]=r.appCheckToken),t}function MR(n,e,t,r){const s=n._url(e);return FR(n,s,t,r)}async function FR(n,e,t,r){t=Ma(t);const s={data:t},i=await Uv(n,r),o=r.timeout||7e4,c=NR(o),u=await Promise.race([LR(e,s,i,n.fetchImpl),c.promise,n.cancelAllRequests]);if(c.cancel(),!u)throw new vt("cancelled","Firebase Functions instance was deleted.");const d=Fa(u.status,u.json);if(d)throw d;if(!u.json)throw new vt("internal","Response is not valid JSON object.");let f=u.json.data;if(typeof f>"u"&&(f=u.json.result),typeof f>"u")throw new vt("internal","Response is missing data field.");return{data:Rs(f)}}function UR(n,e,t,r){const s=n._url(e);return BR(n,s,t,r||{})}async function BR(n,e,t,r){var s;t=Ma(t);const i={data:t},o=await Uv(n,r);o["Content-Type"]="application/json",o.Accept="text/event-stream";let c;try{c=await n.fetchImpl(e,{method:"POST",body:JSON.stringify(i),headers:o,signal:r?.signal})}catch(_){if(_ instanceof Error&&_.name==="AbortError"){const S=new vt("cancelled","Request was cancelled.");return{data:Promise.reject(S),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(S)}}}}}}const I=Fa(0,null);return{data:Promise.reject(I),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(I)}}}}}}let u,d;const f=new Promise((_,I)=>{u=_,d=I});(s=r?.signal)===null||s===void 0||s.addEventListener("abort",()=>{const _=new vt("cancelled","Request was cancelled.");d(_)});const p=c.body.getReader(),g=$R(p,u,d,r?.signal);return{stream:{[Symbol.asyncIterator](){const _=g.getReader();return{async next(){const{value:I,done:S}=await _.read();return{value:I,done:S}},async return(){return await _.cancel(),{done:!0,value:void 0}}}}},data:f}}function $R(n,e,t,r){const s=(o,c)=>{const u=o.match(xR);if(!u)return;const d=u[1];try{const f=JSON.parse(d);if("result"in f){e(Rs(f.result));return}if("message"in f){c.enqueue(Rs(f.message));return}if("error"in f){const p=Fa(0,f);c.error(p),t(p);return}}catch(f){if(f instanceof vt){c.error(f),t(f);return}}},i=new TextDecoder;return new ReadableStream({start(o){let c="";return u();async function u(){if(r?.aborted){const d=new vt("cancelled","Request was cancelled");return o.error(d),t(d),Promise.resolve()}try{const{value:d,done:f}=await n.read();if(f){c.trim()&&s(c.trim(),o),o.close();return}if(r?.aborted){const g=new vt("cancelled","Request was cancelled");o.error(g),t(g),await n.cancel();return}c+=i.decode(d,{stream:!0});const p=c.split(`
`);c=p.pop()||"";for(const g of p)g.trim()&&s(g.trim(),o);return u()}catch(d){const f=d instanceof vt?d:Fa(0,null);o.error(f),t(f)}}},cancel(){return n.cancel()}})}const Gp="@firebase/functions",Hp="0.12.2";/**
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
 */const qR="auth-internal",jR="app-check-internal",zR="messaging-internal";function GR(n){const e=(t,{instanceIdentifier:r})=>{const s=t.getProvider("app").getImmediate(),i=t.getProvider(qR),o=t.getProvider(zR),c=t.getProvider(jR);return new DR(s,i,o,c,r)};Qt(new Ot(Ad,e,"PUBLIC").setMultipleInstances(!0)),At(Gp,Hp,n),At(Gp,Hp,"esm2017")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function HR(n=Qa(),e=eu){const r=xr(Te(n),Ad).getImmediate({identifier:e}),s=Im("functions");return s&&KR(r,...s),r}function KR(n,e,t){VR(Te(n),e,t)}function Mr(n,e,t){return OR(Te(n),e)}GR();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bv="firebasestorage.googleapis.com",$v="storageBucket",WR=2*60*1e3,QR=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue extends Ft{constructor(e,t,r=0){super(ul(e),`Firebase Storage: ${t} (${ul(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,Ue.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return ul(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var Fe;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(Fe||(Fe={}));function ul(n){return"storage/"+n}function Sd(){const n="An unknown error occurred, please check the error payload for server response.";return new Ue(Fe.UNKNOWN,n)}function YR(n){return new Ue(Fe.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function JR(n){return new Ue(Fe.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function XR(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new Ue(Fe.UNAUTHENTICATED,n)}function ZR(){return new Ue(Fe.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function ek(n){return new Ue(Fe.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function tk(){return new Ue(Fe.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function nk(){return new Ue(Fe.CANCELED,"User canceled the upload/download.")}function rk(n){return new Ue(Fe.INVALID_URL,"Invalid URL '"+n+"'.")}function sk(n){return new Ue(Fe.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function ik(){return new Ue(Fe.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+$v+"' property when initializing the app?")}function ok(){return new Ue(Fe.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function ak(){return new Ue(Fe.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function ck(n){return new Ue(Fe.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function tu(n){return new Ue(Fe.INVALID_ARGUMENT,n)}function qv(){return new Ue(Fe.APP_DELETED,"The Firebase app was deleted.")}function lk(n){return new Ue(Fe.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function _i(n,e){return new Ue(Fe.INVALID_FORMAT,"String does not match format '"+n+"': "+e)}function ni(n){throw new Ue(Fe.INTERNAL_ERROR,"Internal error: "+n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=Tt.makeFromUrl(e,t)}catch{return new Tt(e,"")}if(r.path==="")return r;throw sk(e)}static makeFromUrl(e,t){let r=null;const s="([A-Za-z0-9.\\-_]+)";function i(L){L.path.charAt(L.path.length-1)==="/"&&(L.path_=L.path_.slice(0,-1))}const o="(/(.*))?$",c=new RegExp("^gs://"+s+o,"i"),u={bucket:1,path:3};function d(L){L.path_=decodeURIComponent(L.path)}const f="v[A-Za-z0-9_]+",p=t.replace(/[.]/g,"\\."),g="(/([^?#]*).*)?$",_=new RegExp(`^https?://${p}/${f}/b/${s}/o${g}`,"i"),I={bucket:1,path:3},S=t===Bv?"(?:storage.googleapis.com|storage.cloud.google.com)":t,A="([^?#]*)",V=new RegExp(`^https?://${S}/${s}/${A}`,"i"),P=[{regex:c,indices:u,postModify:i},{regex:_,indices:I,postModify:d},{regex:V,indices:{bucket:1,path:2},postModify:d}];for(let L=0;L<P.length;L++){const C=P[L],M=C.regex.exec(e);if(M){const E=M[C.indices.bucket];let v=M[C.indices.path];v||(v=""),r=new Tt(E,v),C.postModify(r);break}}if(r==null)throw rk(e);return r}}class uk{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dk(n,e,t){let r=1,s=null,i=null,o=!1,c=0;function u(){return c===2}let d=!1;function f(...A){d||(d=!0,e.apply(null,A))}function p(A){s=setTimeout(()=>{s=null,n(_,u())},A)}function g(){i&&clearTimeout(i)}function _(A,...V){if(d){g();return}if(A){g(),f.call(null,A,...V);return}if(u()||o){g(),f.call(null,A,...V);return}r<64&&(r*=2);let P;c===1?(c=2,P=0):P=(r+Math.random())*1e3,p(P)}let I=!1;function S(A){I||(I=!0,g(),!d&&(s!==null?(A||(c=2),clearTimeout(s),p(0)):A||(c=1)))}return p(0),i=setTimeout(()=>{o=!0,S(!0)},t),S}function hk(n){n(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fk(n){return n!==void 0}function pk(n){return typeof n=="object"&&!Array.isArray(n)}function Rd(n){return typeof n=="string"||n instanceof String}function Kp(n){return kd()&&n instanceof Blob}function kd(){return typeof Blob<"u"}function Wp(n,e,t,r){if(r<e)throw tu(`Invalid value for '${n}'. Expected ${e} or greater.`);if(r>t)throw tu(`Invalid value for '${n}'. Expected ${t} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kc(n,e,t){let r=e;return t==null&&(r=`https://${e}`),`${t}://${r}/v0${n}`}function jv(n){const e=encodeURIComponent;let t="?";for(const r in n)if(n.hasOwnProperty(r)){const s=e(r)+"="+e(n[r]);t=t+s+"&"}return t=t.slice(0,-1),t}var _r;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(_r||(_r={}));/**
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
 */function mk(n,e){const t=n>=500&&n<600,s=[408,429].indexOf(n)!==-1,i=e.indexOf(n)!==-1;return t||s||i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gk{constructor(e,t,r,s,i,o,c,u,d,f,p,g=!0){this.url_=e,this.method_=t,this.headers_=r,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=o,this.callback_=c,this.errorCallback_=u,this.timeout_=d,this.progressCallback_=f,this.connectionFactory_=p,this.retry=g,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((_,I)=>{this.resolve_=_,this.reject_=I,this.start_()})}start_(){const e=(r,s)=>{if(s){r(!1,new Oo(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const o=c=>{const u=c.loaded,d=c.lengthComputable?c.total:-1;this.progressCallback_!==null&&this.progressCallback_(u,d)};this.progressCallback_!==null&&i.addUploadProgressListener(o),i.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(o),this.pendingConnection_=null;const c=i.getErrorCode()===_r.NO_ERROR,u=i.getStatus();if(!c||mk(u,this.additionalRetryCodes_)&&this.retry){const f=i.getErrorCode()===_r.ABORT;r(!1,new Oo(!1,null,f));return}const d=this.successCodes_.indexOf(u)!==-1;r(!0,new Oo(d,i))})},t=(r,s)=>{const i=this.resolve_,o=this.reject_,c=s.connection;if(s.wasSuccessCode)try{const u=this.callback_(c,c.getResponse());fk(u)?i(u):i()}catch(u){o(u)}else if(c!==null){const u=Sd();u.serverResponse=c.getErrorText(),this.errorCallback_?o(this.errorCallback_(c,u)):o(u)}else if(s.canceled){const u=this.appDelete_?qv():nk();o(u)}else{const u=tk();o(u)}};this.canceled_?t(!1,new Oo(!1,null,!0)):this.backoffId_=dk(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&hk(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Oo{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}}function _k(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function vk(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function yk(n,e){e&&(n["X-Firebase-GMPID"]=e)}function bk(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function wk(n,e,t,r,s,i,o=!0){const c=jv(n.urlParams),u=n.url+c,d=Object.assign({},n.headers);return yk(d,e),_k(d,t),vk(d,i),bk(d,r),new gk(u,n.method,d,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,s,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ik(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function Ek(...n){const e=Ik();if(e!==void 0){const t=new e;for(let r=0;r<n.length;r++)t.append(n[r]);return t.getBlob()}else{if(kd())return new Blob(n);throw new Ue(Fe.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function Tk(n,e,t){return n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null}/**
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
 */function Ak(n){if(typeof atob>"u")throw ck("base-64");return atob(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gt={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class dl{constructor(e,t){this.data=e,this.contentType=t||null}}function Sk(n,e){switch(n){case Gt.RAW:return new dl(zv(e));case Gt.BASE64:case Gt.BASE64URL:return new dl(Gv(n,e));case Gt.DATA_URL:return new dl(kk(e),Ck(e))}throw Sd()}function zv(n){const e=[];for(let t=0;t<n.length;t++){let r=n.charCodeAt(t);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(t<n.length-1&&(n.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{const i=r,o=n.charCodeAt(++t);r=65536|(i&1023)<<10|o&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function Rk(n){let e;try{e=decodeURIComponent(n)}catch{throw _i(Gt.DATA_URL,"Malformed data URL.")}return zv(e)}function Gv(n,e){switch(n){case Gt.BASE64:{const s=e.indexOf("-")!==-1,i=e.indexOf("_")!==-1;if(s||i)throw _i(n,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case Gt.BASE64URL:{const s=e.indexOf("+")!==-1,i=e.indexOf("/")!==-1;if(s||i)throw _i(n,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=Ak(e)}catch(s){throw s.message.includes("polyfill")?s:_i(n,"Invalid character found")}const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}class Hv{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(t===null)throw _i(Gt.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=t[1]||null;r!=null&&(this.base64=Pk(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function kk(n){const e=new Hv(n);return e.base64?Gv(Gt.BASE64,e.rest):Rk(e.rest)}function Ck(n){return new Hv(n).contentType}function Pk(n,e){return n.length>=e.length?n.substring(n.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rn{constructor(e,t){let r=0,s="";Kp(e)?(this.data_=e,r=e.size,s=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=s}size(){return this.size_}type(){return this.type_}slice(e,t){if(Kp(this.data_)){const r=this.data_,s=Tk(r,e,t);return s===null?null:new Rn(s)}else{const r=new Uint8Array(this.data_.buffer,e,t-e);return new Rn(r,!0)}}static getBlob(...e){if(kd()){const t=e.map(r=>r instanceof Rn?r.data_:r);return new Rn(Ek.apply(null,t))}else{const t=e.map(o=>Rd(o)?Sk(Gt.RAW,o).data:o.data_);let r=0;t.forEach(o=>{r+=o.byteLength});const s=new Uint8Array(r);let i=0;return t.forEach(o=>{for(let c=0;c<o.length;c++)s[i++]=o[c]}),new Rn(s,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kv(n){let e;try{e=JSON.parse(n)}catch{return null}return pk(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xk(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function Nk(n,e){const t=e.split("/").filter(r=>r.length>0).join("/");return n.length===0?t:n+"/"+t}function Wv(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dk(n,e){return e}class dt{constructor(e,t,r,s){this.server=e,this.local=t||e,this.writable=!!r,this.xform=s||Dk}}let Lo=null;function Vk(n){return!Rd(n)||n.length<2?n:Wv(n)}function Qv(){if(Lo)return Lo;const n=[];n.push(new dt("bucket")),n.push(new dt("generation")),n.push(new dt("metageneration")),n.push(new dt("name","fullPath",!0));function e(i,o){return Vk(o)}const t=new dt("name");t.xform=e,n.push(t);function r(i,o){return o!==void 0?Number(o):o}const s=new dt("size");return s.xform=r,n.push(s),n.push(new dt("timeCreated")),n.push(new dt("updated")),n.push(new dt("md5Hash",null,!0)),n.push(new dt("cacheControl",null,!0)),n.push(new dt("contentDisposition",null,!0)),n.push(new dt("contentEncoding",null,!0)),n.push(new dt("contentLanguage",null,!0)),n.push(new dt("contentType",null,!0)),n.push(new dt("metadata","customMetadata",!0)),Lo=n,Lo}function Ok(n,e){function t(){const r=n.bucket,s=n.fullPath,i=new Tt(r,s);return e._makeStorageReference(i)}Object.defineProperty(n,"ref",{get:t})}function Lk(n,e,t){const r={};r.type="file";const s=t.length;for(let i=0;i<s;i++){const o=t[i];r[o.local]=o.xform(r,e[o.server])}return Ok(r,n),r}function Yv(n,e,t){const r=Kv(e);return r===null?null:Lk(n,r,t)}function Mk(n,e,t,r){const s=Kv(e);if(s===null||!Rd(s.downloadTokens))return null;const i=s.downloadTokens;if(i.length===0)return null;const o=encodeURIComponent;return i.split(",").map(d=>{const f=n.bucket,p=n.fullPath,g="/b/"+o(f)+"/o/"+o(p),_=kc(g,t,r),I=jv({alt:"media",token:d});return _+I})[0]}function Fk(n,e){const t={},r=e.length;for(let s=0;s<r;s++){const i=e[s];i.writable&&(t[i.server]=n[i.local])}return JSON.stringify(t)}class Cd{constructor(e,t,r,s){this.url=e,this.method=t,this.handler=r,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jv(n){if(!n)throw Sd()}function Uk(n,e){function t(r,s){const i=Yv(n,s,e);return Jv(i!==null),i}return t}function Bk(n,e){function t(r,s){const i=Yv(n,s,e);return Jv(i!==null),Mk(i,s,n.host,n._protocol)}return t}function Xv(n){function e(t,r){let s;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?s=ZR():s=XR():t.getStatus()===402?s=JR(n.bucket):t.getStatus()===403?s=ek(n.path):s=r,s.status=t.getStatus(),s.serverResponse=r.serverResponse,s}return e}function Zv(n){const e=Xv(n);function t(r,s){let i=e(r,s);return r.getStatus()===404&&(i=YR(n.path)),i.serverResponse=s.serverResponse,i}return t}function $k(n,e,t){const r=e.fullServerUrl(),s=kc(r,n.host,n._protocol),i="GET",o=n.maxOperationRetryTime,c=new Cd(s,i,Bk(n,t),o);return c.errorHandler=Zv(e),c}function qk(n,e){const t=e.fullServerUrl(),r=kc(t,n.host,n._protocol),s="DELETE",i=n.maxOperationRetryTime;function o(u,d){}const c=new Cd(r,s,o,i);return c.successCodes=[200,204],c.errorHandler=Zv(e),c}function jk(n,e){return n&&n.contentType||e&&e.type()||"application/octet-stream"}function zk(n,e,t){const r=Object.assign({},t);return r.fullPath=n.path,r.size=e.size(),r.contentType||(r.contentType=jk(null,e)),r}function Gk(n,e,t,r,s){const i=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function c(){let P="";for(let L=0;L<2;L++)P=P+Math.random().toString().slice(2);return P}const u=c();o["Content-Type"]="multipart/related; boundary="+u;const d=zk(e,r,s),f=Fk(d,t),p="--"+u+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+f+`\r
--`+u+`\r
Content-Type: `+d.contentType+`\r
\r
`,g=`\r
--`+u+"--",_=Rn.getBlob(p,r,g);if(_===null)throw ok();const I={name:d.fullPath},S=kc(i,n.host,n._protocol),A="POST",V=n.maxUploadRetryTime,k=new Cd(S,A,Uk(n,t),V);return k.urlParams=I,k.headers=o,k.body=_.uploadData(),k.errorHandler=Xv(e),k}class Hk{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=_r.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=_r.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=_r.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,r,s){if(this.sent_)throw ni("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(t,e,!0),s!==void 0)for(const i in s)s.hasOwnProperty(i)&&this.xhr_.setRequestHeader(i,s[i].toString());return r!==void 0?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw ni("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw ni("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw ni("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw ni("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class Kk extends Hk{initXhr(){this.xhr_.responseType="text"}}function Pd(){return new Kk}/**
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
 */class kr{constructor(e,t){this._service=e,t instanceof Tt?this._location=t:this._location=Tt.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new kr(e,t)}get root(){const e=new Tt(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Wv(this._location.path)}get storage(){return this._service}get parent(){const e=xk(this._location.path);if(e===null)return null;const t=new Tt(this._location.bucket,e);return new kr(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw lk(e)}}function Wk(n,e,t){n._throwIfRoot("uploadBytes");const r=Gk(n.storage,n._location,Qv(),new Rn(e,!0),t);return n.storage.makeRequestWithTokens(r,Pd).then(s=>({metadata:s,ref:n}))}function Qk(n){n._throwIfRoot("getDownloadURL");const e=$k(n.storage,n._location,Qv());return n.storage.makeRequestWithTokens(e,Pd).then(t=>{if(t===null)throw ak();return t})}function Yk(n){n._throwIfRoot("deleteObject");const e=qk(n.storage,n._location);return n.storage.makeRequestWithTokens(e,Pd)}function Jk(n,e){const t=Nk(n._location.path,e),r=new Tt(n._location.bucket,t);return new kr(n.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xk(n){return/^[A-Za-z]+:\/\//.test(n)}function Zk(n,e){return new kr(n,e)}function ey(n,e){if(n instanceof xd){const t=n;if(t._bucket==null)throw ik();const r=new kr(t,t._bucket);return e!=null?ey(r,e):r}else return e!==void 0?Jk(n,e):n}function eC(n,e){if(e&&Xk(e)){if(n instanceof xd)return Zk(n,e);throw tu("To use ref(service, url), the first argument must be a Storage instance.")}else return ey(n,e)}function Qp(n,e){const t=e?.[$v];return t==null?null:Tt.makeFromBucketSpec(t,n)}function tC(n,e,t,r={}){n.host=`${e}:${t}`,n._protocol="http";const{mockUserToken:s}=r;s&&(n._overrideAuthToken=typeof s=="string"?s:Sb(s,n.app.options.projectId))}class xd{constructor(e,t,r,s,i){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=s,this._firebaseVersion=i,this._bucket=null,this._host=Bv,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=WR,this._maxUploadRetryTime=QR,this._requests=new Set,s!=null?this._bucket=Tt.makeFromBucketSpec(s,this._host):this._bucket=Qp(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Tt.makeFromBucketSpec(this._url,e):this._bucket=Qp(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Wp("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Wp("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){if(It(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new kr(this,e)}_makeRequest(e,t,r,s,i=!0){if(this._deleted)return new uk(qv());{const o=wk(e,this._appId,r,s,t,this._firebaseVersion,i);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,s).getPromise()}}const Yp="@firebase/storage",Jp="0.13.6";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ty="storage";function ny(n,e,t){return n=Te(n),Wk(n,e,t)}function ry(n){return n=Te(n),Qk(n)}function nC(n){return n=Te(n),Yk(n)}function Nd(n,e){return n=Te(n),eC(n,e)}function rC(n=Qa(),e){n=Te(n);const r=xr(n,ty).getImmediate({identifier:e}),s=Im("storage");return s&&sC(r,...s),r}function sC(n,e,t,r={}){tC(n,e,t,r)}function iC(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),s=n.getProvider("app-check-internal");return new xd(t,r,s,e,Nr)}function oC(){Qt(new Ot(ty,iC,"PUBLIC").setMultipleInstances(!0)),At(Yp,Jp,""),At(Yp,Jp,"esm2017")}oC();const aC={apiKey:"AIzaSyD9MJrON70mPqZxQqhndgQHNkTZUnnaQIs",authDomain:"altorra-cars.firebaseapp.com",databaseURL:"https://altorra-cars-default-rtdb.firebaseio.com",projectId:"altorra-cars",storageBucket:"altorra-cars.firebasestorage.app",messagingSenderId:"235148219730",appId:"1:235148219730:web:ceabdbc52fdcbe8b85168b",measurementId:"G-ZGZ6CVTB73"},cC="altorra-crm",oo=km(aC,cC);ER(oo,{provider:new Td("6Lfz8BQtAAAAAILjn8GbHFT8u6dpg5rFvg5hGZzS"),isTokenAutoRefreshEnabled:!0});const $i=uT(oo),te=TS(oo,{localCache:FS({tabManager:Av({})})}),Fr=HR(oo,"us-central1"),Dd=rC(oo);function Be(n){const e=j.get().permissions||[];return e.includes("*")||e.includes(n)}function lC(n){return n?n.rol==="super_admin"||n.roleId==="system_super_admin"?["*"]:Array.isArray(n.permissions)&&n.permissions.length?n.permissions.slice():[]:[]}async function uC(n){try{const e=await zn(be(te,"usuarios",n.uid)),t=e.exists()?e.data():null;if(t&&t.bloqueado===!0){await tg($i),j.set({user:null,profile:null,permissions:[],ready:!0,authError:"Cuenta bloqueada. Contacta al administrador."});return}j.set({user:n,profile:t,permissions:lC(t),ready:!0,authError:null})}catch(e){console.warn("[auth] no se pudo hidratar el perfil:",e),j.set({user:n,profile:null,permissions:[],ready:!0})}}function dC(){JI($i,sg).catch(()=>{}),eE($i,n=>{n?uC(n):j.set({user:null,profile:null,permissions:[],ready:!0})})}const hC={"auth/invalid-email":"Correo inválido.","auth/user-disabled":"Esta cuenta está deshabilitada.","auth/user-not-found":"No existe una cuenta con ese correo.","auth/wrong-password":"Contraseña incorrecta.","auth/invalid-credential":"Credenciales incorrectas.","auth/too-many-requests":"Demasiados intentos. Espera unos minutos.","auth/network-request-failed":"Sin conexión. Revisa tu internet."};async function fC(n,e){j.set({authError:null});try{await YI($i,String(n).trim(),e)}catch(t){const r=hC[t&&t.code]||"No se pudo iniciar sesión.";throw j.set({authError:r}),t}}async function pC(){if(j.get().mock){j.set({user:null,profile:null,permissions:[]});return}await tg($i)}function hl(){const{profile:n,user:e}=j.get();return n&&(n.nombre||n.roleName)||e&&(e.displayName||e.email)||"Usuario"}function mC(){const{profile:n}=j.get();return n&&(n.cargo||n.roleName)||"Asesor"}const gC=["bandeja","pipeline","agenda","reportes","contactos","config","resenas","banners","marcas","atributos"];function sy(){const n=(location.hash||"").replace(/^#\/?/,""),[e]=n.split("/");return gC.includes(e)?e:"bandeja"}function _C(n){location.hash!==`#/${n}`&&(location.hash=`#/${n}`)}function vC(n){const e=()=>n(sy());return window.addEventListener("hashchange",e),()=>window.removeEventListener("hashchange",e)}function l(n,e={},t=[]){const r=document.createElement(n);for(const[s,i]of Object.entries(e))i==null||i===!1||(s==="class"?r.className=i:s==="html"?r.innerHTML=i:s==="text"?r.textContent=i:s==="dataset"?Object.assign(r.dataset,i):s==="style"&&typeof i=="object"?Object.assign(r.style,i):s.startsWith("on")&&typeof i=="function"?r.addEventListener(s.slice(2).toLowerCase(),i):r.setAttribute(s,i===!0?"":String(i)));for(const s of[].concat(t))s==null||s===!1||s===""||r.append(s.nodeType?s:document.createTextNode(String(s)));return r}function fe(n){for(;n&&n.firstChild;)n.removeChild(n.firstChild);return n}let ls=null;function iy(n){ls&&!ls.contains(n.target)&&Ua()}function oy(n){n.key==="Escape"&&Ua()}function Ua(){ls&&(ls.remove(),ls=null,document.removeEventListener("mousedown",iy,!0),window.removeEventListener("keydown",oy,!0))}function qt(n,e,t,r={}){Ua();const s=l("div",{class:"popover",role:"menu"});r.title&&s.append(l("div",{class:"popover__title",text:r.title})),e.forEach(o=>{if(o.divider){s.append(l("div",{class:"popover__divider"}));return}const c=l("button",{class:"popover__item"+(o.active?" is-active":""),type:"button",role:"menuitem"},[o.icon?l("span",{class:"popover__icon",text:o.icon}):null,l("span",{class:"u-grow u-truncate",text:o.label}),o.hint?l("span",{class:"popover__hint u-caption",text:o.hint}):null]);c.addEventListener("click",u=>{u.stopPropagation(),Ua(),t(o)}),s.append(c)}),document.body.append(s),yC(s,n),ls=s,setTimeout(()=>{document.addEventListener("mousedown",iy,!0),window.addEventListener("keydown",oy,!0)},0);const i=s.querySelector(".popover__item");i&&i.focus()}function yC(n,e){const t=e.getBoundingClientRect(),r=n.offsetWidth,s=n.offsetHeight;let i=t.bottom+6,o=t.right-r;o<8&&(o=8),o+r>window.innerWidth-8&&(o=window.innerWidth-r-8),i+s>window.innerHeight-8&&(i=t.top-s-6),n.style.top=`${Math.max(8,i)}px`,n.style.left=`${Math.max(8,o)}px`}function ks(n){const e=String(n||"").trim().split(/\s+/).filter(Boolean);return e.length?e.length===1?e[0].slice(0,2).toUpperCase():(e[0][0]+e[e.length-1][0]).toUpperCase():"?"}function bC(n){return String(n||"").replace(/\D/g,"")}function ay(n,e){const t=bC(n);if(!t)return"";const r=e?"?text="+encodeURIComponent(e):"";return"https://wa.me/"+t+r}function cy(n){if(!n)return 1/0;const e=new Date(n).getTime();return Number.isNaN(e)?1/0:Date.now()-e}function Cs(n){const e=cy(n);return e===1/0?1/0:e/864e5}function vr(n){const e=cy(n);if(e===1/0)return"—";const t=Math.floor(e/6e4);if(t<1)return"ahora";if(t<60)return`hace ${t} min`;const r=Math.floor(t/60);if(r<24)return`hace ${r} h`;const s=Math.floor(r/24);return s===1?"ayer":s<7?`hace ${s} d`:new Date(n).toLocaleDateString("es-CO",{day:"numeric",month:"short"})}function wC(n){if(!n)return"—";const e=new Date(n);return Number.isNaN(e.getTime())?"—":e.toLocaleString("es-CO",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}function fl(n){const e=Math.abs(n),t=Math.round(e/6e4);if(t<60)return`${t} min`;const r=Math.floor(t/60),s=t%60;return s?`${r} h ${s} min`:`${r} h`}function sr(n){const e=Number(n)||0;if(!e)return"";if(e>=1e6){const t=e/1e6;return"$"+(t%1?t.toFixed(1).replace(".",","):t.toFixed(0))+" M"}return e>=1e3?"$"+Math.round(e/1e3)+" K":"$"+e}function Ba(n){return String(n||"").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu,"")}const IC="0.4.1",EC=[{id:"bandeja",label:"Bandeja",icon:"📥",ready:!0},{id:"pipeline",label:"Pipeline",icon:"🎯",ready:!0},{id:"agenda",label:"Agenda",icon:"📅",ready:!0},{id:"reportes",label:"Reportes",icon:"📊",ready:!0},{id:"contactos",label:"Contactos",icon:"👤",ready:!0},{id:"config",label:"Disponibilidad",icon:"⚙️",ready:!0,perm:"calendar.config"},{id:"resenas",label:"Reseñas",icon:"⭐",ready:!0,perm:"reviews.read"},{id:"banners",label:"Banners",icon:"🖼️",ready:!0,perm:"banners.read"},{id:"marcas",label:"Marcas",icon:"🏷️",ready:!0,perm:"brands.read"},{id:"atributos",label:"Atributos",icon:"🧩",ready:!0,perm:["settings.theme","settings.seo","settings.backup"]}],pl={bandeja:"Bandeja Inteligente",pipeline:"Pipeline de ventas",agenda:"Agenda",reportes:"Reportes y KPIs",contactos:"Contactos",config:"Disponibilidad de citas",resenas:"Reseñas del sitio",banners:"Banners del sitio",marcas:"Marcas del inventario",atributos:"Atributos del inventario"};function TC(n){const e={},t=l("div",{class:"sidebar__brand"},[l("span",{class:"sidebar__logo",text:"ALTORRA"}),l("span",{class:"sidebar__sub u-caption",text:"CRM"})]),r=l("nav",{class:"sidebar__nav","aria-label":"Secciones"});EC.filter(S=>!S.perm||[].concat(S.perm).some(Be)).forEach(S=>{const A=l("button",{class:"navitem",type:"button",disabled:!S.ready},[l("span",{class:"navitem__icon","aria-hidden":"true",text:S.icon}),l("span",{class:"navitem__label",text:S.label}),S.ready?null:l("span",{class:"navitem__soon",text:"Pronto"})]);S.ready&&A.addEventListener("click",()=>_C(S.id)),e[S.id]=A,r.append(A)});const s=l("aside",{class:"sidebar"},[t,r,l("div",{class:"sidebar__foot u-caption u-faint"},[`v${IC} · Fase 4`])]),i=l("h1",{class:"topbar__h",text:pl.bandeja}),o=l("span",{class:"topbar__crumb u-caption u-faint",text:j.get().mock?"modo demo":"tiempo real"}),c=l("div",{class:"topbar__title"},[i,o]),u=l("button",{class:"icon-btn",type:"button","aria-label":"Cambiar tema"},[l("span",{"aria-hidden":"true",text:j.get().theme==="dark"?"☀️":"🌙"})]);u.addEventListener("click",()=>{const S=yb();u.firstChild.textContent=S==="dark"?"☀️":"🌙"});const d=l("button",{class:"usermenu",type:"button","aria-haspopup":"menu"},[l("span",{class:"avatar avatar--sm","aria-hidden":"true",text:ks(hl())}),l("span",{class:"usermenu__meta"},[l("span",{class:"usermenu__name u-truncate",text:hl()}),l("span",{class:"usermenu__role u-caption u-faint u-truncate",text:mC()})])]);d.addEventListener("click",()=>{qt(d,[{value:"logout",label:"Cerrar sesión",icon:"🚪"}],S=>{S.value==="logout"&&pC()},{title:hl()})});const f=l("header",{class:"topbar"},[c,l("div",{class:"topbar__actions u-row"},[u,d])]),p=l("main",{class:"outlet",id:"outlet"}),g=l("div",{id:"detail-root"}),_=l("div",{class:"app-shell"},[s,l("div",{class:"app-main"},[f,p]),g]);fe(n),n.removeAttribute("aria-busy"),n.append(_);function I(S){Object.entries(e).forEach(([A,V])=>{const k=A===S;V.classList.toggle("is-active",k),k?V.setAttribute("aria-current","page"):V.removeAttribute("aria-current")}),i.textContent=pl[S]||pl.bandeja}return{outlet:p,detailRoot:g,setActive:I}}function AC(n){const e=l("input",{class:"input",type:"email",placeholder:"correo@altorracars.com",autocomplete:"username",required:!0,"aria-label":"Correo"}),t=l("input",{class:"input",type:"password",placeholder:"Contraseña",autocomplete:"current-password",required:!0,"aria-label":"Contraseña"}),r=l("div",{class:"login__error",role:"alert",hidden:!0}),s=l("button",{class:"btn btn--gold btn--block",type:"submit"},["Entrar"]),i=l("form",{class:"login__form"},[l("label",{class:"field"},[l("span",{class:"field__label",text:"Correo"}),e]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Contraseña"}),t]),r,s]);i.addEventListener("submit",async c=>{c.preventDefault(),r.hidden=!0,s.disabled=!0,s.textContent="Entrando…";try{await fC(e.value,t.value)}catch{r.textContent=j.get().authError||"No se pudo iniciar sesión.",r.hidden=!1,s.disabled=!1,s.textContent="Entrar"}});const o=l("div",{class:"login surface"},[l("div",{class:"login__brand"},[l("span",{class:"login__logo",text:"ALTORRA"}),l("span",{class:"login__tag u-caption u-faint",text:"CRM · Bandeja Inteligente"})]),l("h1",{class:"login__title",text:"Bienvenido"}),l("p",{class:"login__lead u-muted",text:"Inicia sesión para gestionar tus clientes."}),i,l("div",{class:"login__foot u-caption u-faint",text:"Acceso restringido al equipo de Altorra Cars."})]);fe(n),n.removeAttribute("aria-busy"),n.append(l("div",{class:"login-wrap"},[o])),setTimeout(()=>e.focus(),50)}const SC=()=>document.getElementById("toast-root"),Xp={ok:"✓",error:"⚠",info:"ℹ"};function $(n,e="info",t=3200){const r=SC();if(!r)return;const s=document.createElement("div");s.className=`toast toast--${e}`,s.setAttribute("role",e==="error"?"alert":"status");const i=document.createElement("span");i.setAttribute("aria-hidden","true"),i.textContent=Xp[e]||Xp.info;const o=document.createElement("span");o.className="u-grow",o.textContent=n,s.append(i,o),r.appendChild(s);const c=()=>{s.classList.add("is-leaving"),s.addEventListener("animationend",()=>s.remove(),{once:!0})},u=setTimeout(c,t);s.addEventListener("click",()=>{clearTimeout(u),c()})}const RC=["financiacion","financiación","compra","test_drive","test-drive","cotizacion","cotización"],kC=["cita","test_drive","test-drive","visita","agendar","peritaje"],CC=["financiacion","financiación","consignacion","consignación","consignacion_venta","compra","venta","cotizacion","cotización"],PC=["pqr","reclamo","queja","peticion","petición","garantia","garantía","soporte"],xC={cita:{label:"Cita",icon:"📅",badge:"info"},solicitud:{label:"Solicitud",icon:"📝",badge:"gold"},pqr:{label:"PQR",icon:"⚠️",badge:"danger"},lead:{label:"Lead",icon:"✨",badge:""}};function Cc(n){const e=String(n.sourceDetail||"").toLowerCase(),t=String(n.source||"").toLowerCase();let r="lead";return PC.some(s=>e.includes(s)||t.includes(s))?r="pqr":t.includes("cita")||kC.some(s=>e.includes(s))?r="cita":CC.some(s=>e.includes(s))&&(r="solicitud"),{type:r,...xC[r]}}function Vd(n){const e=String(n.sourceDetail||"").toLowerCase();return RC.some(t=>e.includes(t))||!!n.vehicleOfInterestId}const NC={whatsapp:{label:"WhatsApp",icon:"🟢"},facebook:{label:"Facebook",icon:"📘"},instagram:{label:"Instagram",icon:"📸"},tiktok:{label:"TikTok",icon:"🎵"},marketplace:{label:"Marketplace",icon:"🛒"},llamada:{label:"Llamada",icon:"📞"},presencial:{label:"Presencial",icon:"🏬"},referido:{label:"Referido",icon:"🤝"},bot:{label:"ALTOR Bot",icon:"🤖"},cuenta:{label:"Cuenta",icon:"👤"},newsletter:{label:"Newsletter",icon:"✉️"},cita:{label:"Cita web",icon:"📅"},web:{label:"Web",icon:"🌐"}};function qi(n){const e=String(n.source||"").toLowerCase();let t="web";return e.includes("whatsapp")||e.includes("wsp")||e.includes("wa.me")?t="whatsapp":e.includes("facebook")||e.includes("meta")||e==="fb"?t="facebook":e.includes("instagram")||e==="ig"?t="instagram":e.includes("tiktok")||e==="tt"?t="tiktok":e.includes("marketplace")||e.includes("mercadolibre")||e.includes("tucarro")?t="marketplace":e.includes("llamada")||e.includes("telefono")||e.includes("teléfono")||e.includes("call")?t="llamada":e.includes("presencial")||e.includes("walk")||e.includes("showroom")||e.includes("local")?t="presencial":e.includes("referido")||e.includes("referral")||e.includes("recomendado")?t="referido":e.includes("bot")||e.includes("concierge")||e.includes("altor")?t="bot":e.includes("cuenta")||e.includes("registro")||e.includes("account")||e.includes("signup")?t="cuenta":e.includes("news")||e.includes("subscri")||e.includes("suscri")?t="newsletter":e.includes("cita")&&(t="cita"),{key:t,...NC[t]}}const DC=[{id:"whatsapp",label:"WhatsApp",icon:"🟢"},{id:"facebook",label:"Facebook (Meta)",icon:"📘"},{id:"instagram",label:"Instagram",icon:"📸"},{id:"tiktok",label:"TikTok",icon:"🎵"},{id:"marketplace",label:"Marketplace",icon:"🛒"},{id:"llamada",label:"Llamada",icon:"📞"},{id:"presencial",label:"Presencial / Showroom",icon:"🏬"},{id:"referido",label:"Referido",icon:"🤝"},{id:"web",label:"Web (otro)",icon:"🌐"}],VC=[{id:"compra",label:"Compra"},{id:"financiacion",label:"Financiación"},{id:"cita",label:"Cita / Test drive"},{id:"consignacion_venta",label:"Vende su carro"},{id:"peritaje",label:"Peritaje"},{id:"consulta",label:"Consulta general"}],Mo={cita:30*60*1e3,pqr:60*60*1e3,solicitud:2*60*60*1e3,lead:24*60*60*1e3};function ly(n){const e=Ps(n.status),{type:t}=Cc(n);let r=n.slaDueAt?new Date(n.slaDueAt).getTime():null;r||(r=(n.createdAt?new Date(n.createdAt).getTime():Date.now())+(Mo[t]||Mo.lead));const s=r-Date.now(),i=Mo[t]||Mo.lead;let o="ok";return e?o="ok":s<=0?o="late":s<i*.25&&(o="warn"),{state:o,dueAt:r,remainingMs:s,closed:e}}const nu=[{id:"nuevo",label:"Nuevo",badge:"gold"},{id:"contactado",label:"Contactado",badge:"info"},{id:"convertido",label:"Convertido",badge:"ok"},{id:"descartado",label:"Descartado",badge:""}],OC=[{id:"inalcanzable",label:"Inalcanzable (no responde)"},{id:"no_califica",label:"No califica (sin presupuesto/intención)"},{id:"duplicado",label:"Duplicado"},{id:"ya_compro_en_otra_parte",label:"Ya compró en otra parte"},{id:"spam_prueba",label:"Spam / prueba"}],LC={calificado:{id:"calificado",label:"Calificado (v2)",badge:"ok"},no_calificado:{id:"no_calificado",label:"No calificado (v2)",badge:""},perdido:{id:"perdido",label:"Perdido (v2)",badge:"danger"}},MC=nu.reduce((n,e)=>(n[e.id]=e,n),{});function ia(n){return MC[n]||LC[n]||{id:n||"nuevo",label:n||"Nuevo",badge:""}}function Ps(n){return n==="convertido"||n==="descartado"||n==="perdido"||n==="no_calificado"}function uy(n){return!n.status||n.status==="nuevo"}const ru={intent:.3,interactions:.18,recency:.22,frequency:.12,economic:.07,age:.06,engagement:.05},dr=n=>Math.max(0,Math.min(1,n));function FC(n){const e=String(n.sourceDetail||"").toLowerCase();let t=.25;return Vd(n)?t=1:/(consignacion|consignación|peritaje|venta)/.test(e)?t=.6:(/(consulta|info|general)/.test(e)||!e)&&(t=.3),n.vehicleOfInterestId&&(t=Math.min(1,t+.15)),dr(t)}function UC(n){let e=0;for(const t of n){const r=`${t.subject||""} ${t.body||""}`;if(!/financ/i.test(r))continue;const s=(r.match(/\d[\d.,]{5,}/g)||[]).map(i=>parseInt(i.replace(/\D/g,""),10)).filter(i=>i>0);s.length&&(e=Math.max(e,Math.max(...s)/5e7))}return dr(e)}function BC(n){const e=new Set;for(const t of n){const r=t.createdAt;r&&(Cs(r)>30||e.add(String(r).slice(0,10)))}return dr(e.size/8)}function dy(n,e=[],t=null){const r=Array.isArray(e)?e:[],s={intent:FC(n),interactions:dr(r.length/6),recency:n.lastActivityAt?dr(1-Cs(n.lastActivityAt)/30):0,frequency:BC(r),economic:UC(r),age:n.createdAt?dr(Cs(n.createdAt)/60):0,engagement:t&&Number(t.score)?dr(t.score/100):0};let i=0;for(const c of Object.keys(ru))i+=s[c]*ru[c];const o=Math.round(i*100);return{score:o,rating:$C(o),factors:s}}function $C(n){return n>=70?"hot":n>=40?"warm":"cold"}const us={hot:{label:"Caliente",icon:"🔥",cls:"temp--hot"},warm:{label:"Tibio",icon:"🌤️",cls:"temp--warm"},cold:{label:"Frío",icon:"❄️",cls:"temp--cold"}},Zp={intent:"Intención",interactions:"Interacciones",recency:"Recencia",frequency:"Frecuencia",economic:"Capacidad econ.",age:"Antigüedad",engagement:"Engagement"},qC=ru;function hy(n,e={}){const t=Number(e.score)||0,{type:r}=Cc(n),s=Cs(n.createdAt),i=Cs(n.lastActivityAt),o=uy(n),c=Ps(n.status),u=[{id:"confirm_appointment",priority:95,when:r==="cita"&&!c&&o,label:"Confirmar cita",reason:"Cita pendiente de confirmación",icon:"📅"},{id:"reach_hot_lead",priority:90,when:t>=70&&o&&!c,label:"Contactar ya",reason:"Lead caliente sin respuesta",icon:"🔥"},{id:"send_quote",priority:88,when:Vd(n)&&t>=55&&!c,label:"Enviar cotización",reason:"Interés de compra/financiación",icon:"🧾"},{id:"assign_asesor",priority:85,when:!n.ownerId&&!c,label:"Asignar asesor",reason:"Sin asesor asignado",icon:"🙋"},{id:"first_touch",priority:70,when:o&&s<2&&!c,label:"Primer contacto",reason:"Lead nuevo sin trabajar",icon:"👋"},{id:"whatsapp_followup",priority:60,when:t>=40&&t<70&&i>=2&&i<30&&!c,label:"Seguimiento WhatsApp",reason:"Lead tibio enfriándose",icon:"💬"},{id:"reactivate",priority:50,when:i>=30&&i!==1/0&&!c,label:"Reactivar con oferta",reason:"Inactivo +30 días",icon:"🎯"},{id:"nurture",priority:15,when:!c,label:"Nutrir relación",reason:"Sin acción urgente",icon:"🌱"},{id:"archived",priority:5,when:c,label:"Cerrado",reason:"Lead cerrado",icon:"✅"}],f=u.filter(p=>p.when).sort((p,g)=>g.priority-p.priority)[0]||u[u.length-1];return{id:f.id,label:f.label,reason:f.reason,icon:f.icon,priority:f.priority}}function fy(n,e=[]){const{score:t,rating:r,factors:s}=dy(n,e,null);return{...n,_score:t,_rating:r,_factors:s,_type:Cc(n),_channel:qi(n),_sla:ly(n),_nba:hy(n,{score:t})}}function Fo(n){return n.map(e=>fy(e))}const su=[{id:"calientes",label:"Calientes sin contestar",icon:"🔥"},{id:"mios",label:"Mis asignados",icon:"👤"},{id:"sin_asignar",label:"Sin asignar",icon:"🆕"},{id:"todo",label:"Todo",icon:"📥"}];function py(n,e,t){switch(e){case"calientes":return uy(n)&&!Ps(n.status)&&(n._rating==="hot"||Vd(n));case"mios":return n.ownerId===t;case"sin_asignar":return!n.ownerId&&!Ps(n.status);case"todo":default:return!0}}function jC(n,e){const t={};for(const r of su)t[r.id]=0;for(const r of n)for(const s of su)py(r,s.id,e)&&t[s.id]++;return t}const Uo={late:0,warn:1,ok:2};function zC(n,e){const t=n._sla&&n._sla.state||"ok",r=e._sla&&e._sla.state||"ok";return Uo[t]!==Uo[r]?Uo[t]-Uo[r]:e._score!==n._score?e._score-n._score:new Date(e.createdAt||0)-new Date(n.createdAt||0)}function GC(n,{type:e,channel:t,status:r}){return n.filter(s=>!(e&&s._type.type!==e||t&&s._channel.key!==t||r&&(s.status||"nuevo")!==r))}function HC(n,e){const t=Ba(e).trim();return t?n.filter(r=>Ba([r.fullName,r.email,r.phone,r.sourceDetail,r.source].join(" ")).includes(t)):n}function KC(n,e=Date.now()){if((n.status||"nuevo")!=="nuevo")return null;const t=new Date(n.createdAt||0).getTime();if(!t)return null;const r=Math.max(0,Math.floor((e-t)/6e4));return{mins:r,state:r>=60?"late":r>=45?"warn":"ok"}}function WC(n,{queue:e,uid:t,filters:r,search:s,showClosed:i=!1}){let o=n.filter(u=>py(u,e,t));o=GC(o,r),o=HC(o,s);let c=0;if(!i&&!r.status){const u=o.filter(d=>!Ps(d.status)&&!d.archived);c=o.length-u.length,o=u}return o.sort(zC),{rows:o,hiddenClosed:c}}const Cr=()=>new Date().toISOString(),Od=n=>({id:n.id,...n.data()});function QC({pageSize:n=40,onData:e,onError:t}){let r=null;const s=Je(Ee(te,"leads"),mt("createdAt","desc"),kt(n));return{unsubscribe:Bt(s,o=>{const c=o.docs.map(Od);r=o.docs[o.docs.length-1]||null,e(c,{hasMore:o.size>=n})},o=>{t&&t(o)}),getLastDoc:()=>r}}async function YC({pageSize:n=40,after:e}){if(!e)return{rows:[],lastDoc:null,hasMore:!1};const t=Je(Ee(te,"leads"),mt("createdAt","desc"),DS(e),kt(n)),r=await Mt(t);return{rows:r.docs.map(Od),lastDoc:r.docs[r.docs.length-1]||null,hasMore:r.size>=n}}async function JC(){const e=(await Mt(Ee(te,"usuarios"))).docs.map(t=>{const r=t.data();return{uid:t.id,nombre:r.nombre||r.email||"Usuario",cargo:r.cargo||r.roleName||""}}).sort((t,r)=>t.nombre.localeCompare(r.nombre,"es"));return j.set({team:e}),e}async function XC(n,e){await Xe(be(te,"leads",n),{ownerId:e?e.uid:null,ownerName:e?e.nombre:null,updatedAt:Cr(),updatedBy:Pr(),_version:Zt(1)})}async function ZC(n,e,t={},r={}){if(t&&t.convertedTo&&t.convertedTo.dealId)throw new Error("Este lead ya es un negocio: gestiónalo en el Pipeline.");const s=Cr();await Xe(be(te,"leads",n),{...r,status:e,lastActivityAt:s,updatedAt:s,updatedBy:Pr(),_version:Zt(1)}),await Ut(Ee(te,"activities"),{type:"status_change",subject:"Cambio de estado → "+e,body:"",status:"closed",direction:"outbound",relatedTo:{type:"lead",id:n,name:t.fullName||""},ownerId:Pr(),createdAt:s,_version:1})}async function em(n,{type:e="nota",subject:t="",body:r="",direction:s="outbound",name:i=""}){await Ut(Ee(te,"activities"),{type:e,subject:t,body:r,status:"closed",direction:s,relatedTo:{type:"lead",id:n,name:i},ownerId:Pr(),createdAt:Cr(),_version:1})}async function eP(n,{subject:e,dueAt:t,name:r=""}){await Ut(Ee(te,"activities"),{type:"tarea",subject:e,body:"",status:"open",direction:"outbound",dueAt:t,relatedTo:{type:"lead",id:n,name:r},ownerId:Pr(),createdAt:Cr(),_version:1})}async function tP(){const n=new Date;n.setHours(23,59,59,999);const e=Je(Ee(te,"activities"),Bn("dueAt","<=",n.toISOString()),mt("dueAt","desc"),kt(80));return(await Mt(e)).docs.map(Od).filter(r=>r.status==="open"&&(r.type==="tarea"||r.type==="cita")).sort((r,s)=>String(r.dueAt).localeCompare(String(s.dueAt)))}async function nP(n){await Xe(be(te,"activities",n),{status:"closed",closedAt:Cr(),closedBy:Pr()})}async function rP(n,e=!0){await Xe(be(te,"leads",n),{archived:e,archivedAt:e?Cr():null,updatedAt:Cr(),updatedBy:Pr(),_version:Zt(1)})}async function sP(n){return(await Mr(Fr,"crmPurgeLead")({leadId:n})).data}function Pr(){const n=j.get().user;return n?n.uid:null}async function iP(n){const e=j.get().user?j.get().user.uid:null,t=["manual",n.trafico,n.campana].filter(Boolean);return(await Ut(Ee(te,"solicitudes"),{nombre:n.nombre||"",email:(n.email||"").trim().toLowerCase(),telefono:n.telefono||"",prefijoPais:n.prefijoPais||"+57",origen:n.canal||"manual",tipo:n.interes||"consulta",vehiculoId:n.vehiculoId||null,kind:"lead",comentarios:n.notas||"",consentGiven:n.consentGiven===!0,tags:t,source:{page:"manual",campaign:n.campana||null,traffic:n.trafico||null},clientCategory:"manual",createdAt:new Date().toISOString(),_manual:!0,_createdByUid:e})).id}const hr=n=>new Date(Date.now()-n*6e4).toISOString(),De=n=>hr(n*60),oe=n=>hr(n*60*24),oP=[{uid:"u_ceo",nombre:"Rodrigo (CEO)",cargo:"CEO"},{uid:"u_ana",nombre:"Ana Restrepo",cargo:"Asesora comercial"},{uid:"u_luis",nombre:"Luis Pérez",cargo:"Asesor comercial"}],Ld=[{id:"l1",fullName:"María Fernanda Gómez",email:"mafe.gomez@gmail.com",phone:"+573012345678",source:"financiacion",sourceDetail:"financiacion",vehicleOfInterestId:"mazda-cx5-2021",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:hr(-40),contactId:"email_mafe_gomez_gmail_com",createdAt:hr(18),lastActivityAt:hr(18),_version:1},{id:"l2",fullName:"Carlos Andrés Salcedo",email:"casalcedo@outlook.com",phone:"+573159876543",source:"cita",sourceDetail:"test_drive",vehicleOfInterestId:"toyota-corolla-2022",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:hr(5),contactId:"email_casalcedo_outlook_com",createdAt:De(1),lastActivityAt:De(1),_version:1},{id:"l3",fullName:"Diana Ramírez",email:"diana.r@hotmail.com",phone:"+573201112233",source:"web",sourceDetail:"compra",vehicleOfInterestId:"chevrolet-tracker-2023",status:"contactado",rating:"cold",score:0,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:De(-1),contactId:"email_diana_r_hotmail_com",createdAt:De(5),lastActivityAt:De(2),_version:2},{id:"l4",fullName:"Jhon Jairo Mosquera",email:"",phone:"+573044455667",source:"whatsapp",sourceDetail:"consulta",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:De(-3),contactId:"phone_573044455667",createdAt:De(8),lastActivityAt:De(8),_version:1},{id:"l5",fullName:"Laura Valentina Ortiz",email:"lauraortiz@gmail.com",phone:"+573186677889",source:"bot",sourceDetail:"financiacion",vehicleOfInterestId:"kia-sportage-2022",status:"contactado",rating:"cold",score:0,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:oe(-1),contactId:"email_lauraortiz_gmail_com",createdAt:oe(1),lastActivityAt:De(20),_version:3},{id:"l6",fullName:"Pedro Nel Arango",email:"pnarango@empresa.co",phone:"+573017788990",source:"cuenta",sourceDetail:"registro",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:oe(-1),contactId:"email_pnarango_empresa_co",createdAt:oe(2),lastActivityAt:oe(2),_version:1},{id:"l7",fullName:"Sofía Mejía",email:"sofia.mejia@gmail.com",phone:"+573123344556",source:"newsletter",sourceDetail:"suscripcion",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:oe(-3),contactId:"email_sofia_mejia_gmail_com",createdAt:oe(4),lastActivityAt:oe(4),_version:1},{id:"l8",fullName:"Andrés Felipe Cuesta",email:"afcuesta@gmail.com",phone:"+573009988776",source:"web",sourceDetail:"consignacion_venta",vehicleOfInterestId:null,status:"calificado",rating:"cold",score:0,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:oe(-2),contactId:"email_afcuesta_gmail_com",createdAt:oe(6),lastActivityAt:oe(1),_version:4},{id:"l9",fullName:"Catalina Ríos",email:"cata.rios@gmail.com",phone:"+573145566778",source:"web",sourceDetail:"peritaje",vehicleOfInterestId:"nissan-frontier-2020",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:oe(-10),contactId:"email_cata_rios_gmail_com",createdAt:oe(12),lastActivityAt:oe(35),_version:1},{id:"l10",fullName:"Gloria Patiño",email:"glopa@gmail.com",phone:"+573162233445",source:"web",sourceDetail:"reclamo",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:De(-2),contactId:"email_glopa_gmail_com",createdAt:De(3),lastActivityAt:De(3),_version:1},{id:"l11",fullName:"Mauricio Bedoya",email:"mbedoya@gmail.com",phone:"+573024455661",source:"facebook",sourceDetail:"compra",vehicleOfInterestId:"mazda-cx5-2021",status:"convertido",rating:"hot",score:78,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:oe(9),contactId:"email_mbedoya_gmail_com",convertedTo:{dealId:"d6"},createdAt:oe(10),lastActivityAt:oe(3),_version:5},{id:"l12",fullName:"Yuliana Castaño",email:"yulycastano@gmail.com",phone:"+573135566779",source:"whatsapp",sourceDetail:"financiacion",vehicleOfInterestId:"toyota-hilux-2020",status:"convertido",rating:"hot",score:82,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:oe(14),contactId:"email_yulycastano_gmail_com",convertedTo:{dealId:"d7"},createdAt:oe(15),lastActivityAt:oe(5),_version:6},{id:"l13",fullName:"Hernán Darío Loaiza",email:"hdloaiza@gmail.com",phone:"+573017788123",source:"web",sourceDetail:"compra",vehicleOfInterestId:"renault-duster-2022",status:"perdido",rating:"warm",score:45,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:oe(19),contactId:"email_hdloaiza_gmail_com",createdAt:oe(20),lastActivityAt:oe(8),_version:3},{id:"l14",fullName:"Paola Andrea Suárez",email:"pasuarez@gmail.com",phone:"+573156677001",source:"newsletter",sourceDetail:"suscripcion",vehicleOfInterestId:null,status:"no_calificado",rating:"cold",score:12,ownerId:null,ownerName:null,slaDueAt:oe(24),contactId:"email_pasuarez_gmail_com",createdAt:oe(25),lastActivityAt:oe(25),_version:2},{id:"l15",fullName:"Julián Marín",email:"julianmarin@gmail.com",phone:"+573008811223",source:"referido",sourceDetail:"compra",vehicleOfInterestId:"nissan-frontier-2020",status:"convertido",rating:"hot",score:74,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:oe(21),contactId:"email_julianmarin_gmail_com",convertedTo:{dealId:"d8"},createdAt:oe(22),lastActivityAt:oe(9),_version:4}],aP={l1:[{id:"a1",type:"solicitud_inbound",subject:"Nueva solicitud: financiacion",body:"Quiero financiar la Mazda CX-5. Cuota inicial 25.000.000, ingresos 6.000.000 mensuales.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l1",name:"María Fernanda Gómez"},createdAt:hr(18),_version:1}],l3:[{id:"a2",type:"solicitud_inbound",subject:"Nueva solicitud: compra",body:"Interesada en la Chevrolet Tracker.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:De(5),_version:1},{id:"a3",type:"whatsapp",subject:"WhatsApp enviado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:De(2),_version:1},{id:"a4",type:"status_change",subject:"Cambio de estado → contactado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:De(2),_version:1}],l5:[{id:"a5",type:"solicitud_inbound",subject:"Nueva lead: financiacion",body:"Bot ALTOR: pregunta por financiación de la Kia Sportage.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},createdAt:oe(1),_version:1},{id:"a6",type:"whatsapp",subject:"WhatsApp enviado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},createdAt:De(20),_version:1}]},ji={};Ld.forEach(n=>{const e=n.status==="convertido"?"customer":n.source==="newsletter"?"subscriber":"lead";ji[n.contactId]={id:n.contactId,fullName:n.fullName,email:n.email,phone:n.phone,type:e==="customer"?"cliente":"lead",source:n.source,score:0,rating:"cold",lifecycleStage:e,clienteUid:null,consent:{email:n.source!=="web",whatsapp:n.source!=="web",calls:!1,askedAt:n.createdAt,source:n.source,policyVersion:"v1"},doNotContact:n.source==="web",tags:[],createdAt:n.createdAt,lastActivityAt:n.lastActivityAt,_version:1}});ji.email_camila_lectora_gmail_com={id:"email_camila_lectora_gmail_com",fullName:"Camila Lectora",email:"camila.lectora@gmail.com",phone:"",type:"lead",source:"newsletter",score:0,rating:"cold",lifecycleStage:"subscriber",clienteUid:null,consent:{email:!0,whatsapp:!1,calls:!1,askedAt:oe(3),source:"newsletter",policyVersion:"v1"},doNotContact:!1,tags:["newsletter"],createdAt:oe(3),lastActivityAt:oe(3),_version:1};const oa={},$a=()=>Ld.map(n=>({...n})),iu=()=>oP.map(n=>({...n})),cP=n=>(aP[n]||[]).map(e=>({...e})),lP=n=>ji[n]?{...ji[n]}:null,uP=()=>Object.values(ji).map(n=>({...n})),tm=n=>(oa[n]||[]).map(e=>({...e}));function dP(n,e){oa[n]||(oa[n]=[]),oa[n].unshift({id:"n"+Date.now(),...e})}let hP=100;const vi=[{id:"d1",name:"Diana Ramírez · Chevrolet Tracker 2023",contactName:"Diana Ramírez",contactId:"email_diana_r_hotmail_com",leadId:"l3",vehicleId:"chevrolet-tracker-2023",vehicleName:"Chevrolet Tracker 2023",pipelineId:"ventas",stageId:"cuadrando_cita",stageName:"Cuadrando cita",status:"open",amount:82e6,currency:"COP",probability:.2,weightedAmount:164e5,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"web",lastActivityAt:De(2),createdAt:De(5),_version:2},{id:"d2",name:"Laura Valentina Ortiz · Kia Sportage 2022",contactName:"Laura Valentina Ortiz",contactId:"email_lauraortiz_gmail_com",leadId:"l5",vehicleId:"kia-sportage-2022",vehicleName:"Kia Sportage 2022",pipelineId:"ventas",stageId:"cita_fijada",stageName:"Cita fijada",status:"open",amount:95e6,currency:"COP",probability:.35,weightedAmount:3325e4,ownerId:"u_luis",ownerName:"Luis Pérez",source:"bot",lastActivityAt:De(20),createdAt:oe(1),_version:3},{id:"d3",name:"Andrés Felipe Cuesta · Mazda 3 2021",contactName:"Andrés Felipe Cuesta",contactId:"email_afcuesta_gmail_com",leadId:"l8",vehicleId:"mazda-3-2021",vehicleName:"Mazda 3 2021",pipelineId:"ventas",stageId:"visita_test_drive",stageName:"Visita / Test drive",status:"open",amount:68e6,currency:"COP",probability:.5,weightedAmount:34e6,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"web",lastActivityAt:oe(18),createdAt:oe(20),_version:5},{id:"d4",name:"Roberto Gómez · Toyota Hilux 2020",contactName:"Roberto Gómez",contactId:"phone_573001239876",leadId:null,vehicleId:"toyota-hilux-2020",vehicleName:"Toyota Hilux 2020",pipelineId:"ventas",stageId:"negociacion",stageName:"Negociación",status:"open",amount:135e6,currency:"COP",probability:.7,weightedAmount:945e5,ownerId:"u_luis",ownerName:"Luis Pérez",source:"whatsapp",lastActivityAt:De(6),createdAt:oe(8),_version:7},{id:"d5",name:"Sandra Milena Vélez · Renault Duster 2022",contactName:"Sandra Milena Vélez",contactId:"email_smvelez_gmail_com",leadId:null,vehicleId:"renault-duster-2022",vehicleName:"Renault Duster 2022",pipelineId:"ventas",stageId:"cuadrando_cita",stageName:"Cuadrando cita",status:"open",amount:0,currency:"COP",probability:.2,weightedAmount:0,ownerId:null,ownerName:null,source:"cuenta",lastActivityAt:De(1),createdAt:De(1),_version:1},{id:"d9",name:"Patricia Lemus · Toyota Hilux 2020",contactName:"Patricia Lemus",contactId:"phone_573009871234",leadId:null,vehicleId:"toyota-hilux-2020",vehicleName:"Toyota Hilux 2020",pipelineId:"ventas",stageId:"cita_fijada",stageName:"Cita fijada",status:"open",amount:132e6,currency:"COP",probability:.35,weightedAmount:462e5,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"walkin",lastActivityAt:De(3),createdAt:oe(2),_version:2},{id:"d6",name:"Mauricio Bedoya · Mazda CX-5 2021",contactName:"Mauricio Bedoya",contactId:"email_mbedoya_gmail_com",leadId:"l11",vehicleId:"mazda-cx5-2021",vehicleName:"Mazda CX-5 2021",pipelineId:"ventas",stageId:"vendido",stageName:"Vendido",status:"won",amount:78e6,currency:"COP",probability:1,weightedAmount:78e6,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"facebook",lastActivityAt:oe(3),createdAt:oe(10),_version:6,tipoPago:"financiado",wonAt:oe(3),postventa:{entrega:!0,traspaso_runt:!1,tramites:!1},commissionSnapshot:{amount:78e6,tipoPago:"financiado",ownerId:"u_ana",wonAt:oe(3)},recibeVehiculo:{marca:"chevrolet",modelo:"Spark GT",placa:"XYZ789",valorEstimado:28e6}},{id:"d7",name:"Yuliana Castaño · Toyota Hilux 2020",contactName:"Yuliana Castaño",contactId:"email_yulycastano_gmail_com",leadId:"l12",vehicleId:"toyota-hilux-2020",vehicleName:"Toyota Hilux 2020",pipelineId:"ventas",stageId:"vendido",stageName:"Vendido",status:"won",amount:112e6,currency:"COP",probability:1,weightedAmount:112e6,ownerId:"u_luis",ownerName:"Luis Pérez",source:"whatsapp",lastActivityAt:oe(5),createdAt:oe(15),_version:7,tipoPago:"contado",wonAt:oe(5),postventa:{entrega:!0,traspaso_runt:!0,tramites:!0},commissionSnapshot:{amount:112e6,tipoPago:"contado",ownerId:"u_luis",wonAt:oe(5)}},{id:"d8",name:"Julián Marín · Nissan Frontier 2020",contactName:"Julián Marín",contactId:"email_julianmarin_gmail_com",leadId:"l15",vehicleId:"nissan-frontier-2020",vehicleName:"Nissan Frontier 2020",pipelineId:"ventas",stageId:"perdido",stageName:"Perdido",status:"lost",amount:64e6,currency:"COP",probability:0,weightedAmount:0,lostReason:"Compró en otro lado",ownerId:"u_luis",ownerName:"Luis Pérez",source:"referido",lastActivityAt:oe(9),createdAt:oe(22),_version:4}],ou=()=>vi.map(n=>({...n}));function fP(n){const e="d"+ ++hP;return vi.unshift({id:e,...n}),e}function pP(n,e){const t=vi.findIndex(r=>r.id===n);t>=0&&(vi[t]={...vi[t],...e})}const Zn=(n,e=10,t=0)=>{const r=new Date;return r.setDate(r.getDate()+n),r.setHours(e,t,0,0),r.toISOString()},au=[{id:"ag1",type:"cita",subject:"Test drive Toyota Corolla",dueAt:Zn(1,10),relatedTo:{type:"lead",id:"l2",name:"Carlos Andrés Salcedo"},status:"open"},{id:"ag2",type:"cita",subject:"Visita showroom",dueAt:Zn(1,12),relatedTo:{type:"lead",id:"l1",name:"María Fernanda Gómez"},status:"open"},{id:"ag3",type:"cita",subject:"Cierre financiación",dueAt:Zn(1,15),relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},status:"open"},{id:"ag4",type:"cita",subject:"Llamada de seguimiento",dueAt:Zn(1,17),relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},status:"open"},{id:"ag5",type:"cita",subject:"Entrega de vehículo",dueAt:Zn(3,9),relatedTo:{type:"lead",id:"l8",name:"Andrés Felipe Cuesta"},status:"open"},{id:"ag6",type:"cita",subject:"Peritaje",dueAt:Zn(5,11),relatedTo:{type:"lead",id:"l9",name:"Catalina Ríos"},status:"open"},{id:"ag7",type:"cita",subject:"Negociación precio",dueAt:Zn(-2,16),relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},status:"open"}],mP=()=>au.map(n=>({...n}));function gP(n){au.push({id:"ag"+(au.length+1),...n})}let _P=100;function my(n){const e="lm"+ ++_P,t=new Date().toISOString(),r=(n.telefono||"").replace(/\D/g,""),s=(n.prefijoPais||"+57").replace(/\D/g,""),i=r?"+"+(r.startsWith(s)?r:s+r):"",o=(n.email||"").trim().toLowerCase(),c={id:e,fullName:n.nombre||"Sin nombre",email:o,phone:i,source:n.canal||"manual",sourceDetail:n.interes||"consulta",vehicleOfInterestId:n.vehiculoId||null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:null,contactId:o?"email_"+o.replace(/[^a-z0-9]/gi,"_"):"phone_"+r,tags:["manual",n.trafico,n.campana].filter(Boolean),createdAt:t,lastActivityAt:t,_version:1};return Ld.unshift(c),e}function vP(){const n={},e=(p,g,_)=>l("label",{class:"field"},[l("span",{class:"field__label",text:p}),g,null]);n.nombre=l("input",{class:"input",type:"text",placeholder:"Nombre del cliente",autocomplete:"off"}),n.prefijo=l("input",{class:"input",type:"text",value:"+57",style:{width:"72px"}}),n.telefono=l("input",{class:"input",type:"tel",placeholder:"300 123 4567",autocomplete:"off"}),n.email=l("input",{class:"input",type:"email",placeholder:"correo@ejemplo.com (opcional)",autocomplete:"off"}),n.canal=l("select",{class:"select"},DC.map(p=>l("option",{value:p.id},[`${p.icon} ${p.label}`]))),n.interes=l("select",{class:"select"},VC.map(p=>l("option",{value:p.id},[p.label]))),n.trafico=l("select",{class:"select"},[l("option",{value:""},["— Tráfico —"]),l("option",{value:"organico"},["Orgánico"]),l("option",{value:"pauta"},["Pauta (pago)"])]),n.campana=l("input",{class:"input",type:"text",placeholder:"Campaña (opcional)",autocomplete:"off"}),n.vehiculo=l("input",{class:"input",type:"text",placeholder:"Vehículo de interés (opcional)",autocomplete:"off"}),n.notas=l("textarea",{class:"textarea",placeholder:"Notas / contexto del lead",rows:"2"}),n.consent=l("input",{type:"checkbox",checked:!0});const t=l("div",{class:"login__error",role:"alert",hidden:!0}),r=l("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),s=l("button",{class:"btn btn--gold",type:"submit"},["Agregar lead"]),i=l("form",{class:"nl-form"},[e("Nombre *",n.nombre),l("div",{class:"nl-row"},[l("label",{class:"field",style:{flex:"0 0 auto"}},[l("span",{class:"field__label",text:"Prefijo"}),n.prefijo]),l("label",{class:"field u-grow"},[l("span",{class:"field__label",text:"Teléfono"}),n.telefono])]),e("Correo",n.email),l("div",{class:"nl-row"},[e("Canal *",n.canal),e("Interés",n.interes)]),l("div",{class:"nl-row"},[e("Tráfico",n.trafico),e("Campaña",n.campana)]),e("Vehículo de interés",n.vehiculo),e("Notas",n.notas),l("label",{class:"nl-consent"},[n.consent,l("span",{class:"u-caption",text:"El cliente autorizó el tratamiento de sus datos (Ley 1581 · Habeas Data)."})]),t,l("div",{class:"nl-actions"},[r,s])]),o=l("div",{class:"modal"},[l("div",{class:"modal__head"},[l("h2",{class:"modal__title",text:"＋ Nuevo lead"}),l("span",{class:"u-caption u-faint",text:"Captura manual (Meta, WhatsApp, TikTok, llamada, referido…)"})]),i]),c=l("div",{class:"modal-overlay"},[o]);document.body.appendChild(c),setTimeout(()=>n.nombre.focus(),30);const u=()=>{c.remove(),window.removeEventListener("keydown",d)},d=p=>{p.key==="Escape"&&u()};window.addEventListener("keydown",d),c.addEventListener("mousedown",p=>{p.target===c&&u()}),r.addEventListener("click",u),i.addEventListener("submit",async p=>{p.preventDefault(),t.hidden=!0;const g={nombre:n.nombre.value.trim(),email:n.email.value.trim(),telefono:n.telefono.value.trim(),prefijoPais:n.prefijo.value.trim()||"+57",canal:n.canal.value,interes:n.interes.value,vehiculoId:n.vehiculo.value.trim()||null,trafico:n.trafico.value||null,campana:n.campana.value.trim()||null,consentGiven:n.consent.checked,notas:n.notas.value.trim()};if(!g.nombre)return f("Escribe el nombre del cliente.");if(!g.email&&!g.telefono)return f("Necesitas al menos un correo o un teléfono (para no duplicar el contacto).");s.disabled=!0,s.textContent="Guardando…";try{j.get().mock?(my(g),window.dispatchEvent(new CustomEvent("altorra:leads-dirty"))):await iP(g),$("✓ Lead agregado a la Bandeja","ok"),u()}catch{s.disabled=!1,s.textContent="Agregar lead",f("No se pudo agregar. Intenta de nuevo.")}});function f(p){return t.textContent=p,t.hidden=!1,!1}}const cu="altorra_friction_v1",yP=300;function qa(n,e,t={}){try{const r=Math.max(0,Math.round(performance.now()-e)),s=JSON.parse(localStorage.getItem(cu)||"[]");for(s.push({task:n,ms:r,at:new Date().toISOString(),...t});s.length>yP;)s.shift();localStorage.setItem(cu,JSON.stringify(s))}catch{}}function bP(){try{const n=JSON.parse(localStorage.getItem(cu)||"[]"),e={};for(const r of n)(e[r.task]=e[r.task]||[]).push(r.ms);const t={};for(const[r,s]of Object.entries(e)){const i=[...s].sort((o,c)=>o-c);t[r]={n:s.length,mediana_s:+(i[Math.floor(i.length/2)]/1e3).toFixed(1),p90_s:+(i[Math.floor(i.length*.9)]/1e3).toFixed(1)}}return t}catch{return{}}}typeof window<"u"&&(window.__friccion=bP);const wP=[{id:"whatsapp",label:"WhatsApp",icon:"💬"},{id:"walkin",label:"Walk-in",icon:"🚶"},{id:"llamada",label:"Llamada",icon:"📞"},{id:"referido",label:"Referido",icon:"🤝"}],IP="“¿Me autorizas guardar tu nombre y teléfono para contactarte sobre vehículos? (Ley 1581)”";function EP(){const n=performance.now(),e={fuente:"whatsapp",medio:"organico"},t=j.get().user||{},r=l("input",{class:"input",type:"text",placeholder:"Nombre",autocomplete:"off"}),s=l("input",{class:"input",type:"tel",placeholder:"300 123 4567",autocomplete:"off",inputmode:"tel"}),i=l("input",{class:"input",type:"text",placeholder:'Nota corta (opcional): "busca SUV blanca"',autocomplete:"off"}),o=l("input",{type:"checkbox"}),c=l("div",{class:"u-row",style:{flexWrap:"wrap",gap:"6px"}});function u(){c.replaceChildren(...wP.map(P=>{const L=l("button",{class:"chip"+(e.fuente===P.id?" chip--active":""),type:"button"},[`${P.icon} ${P.label}`]);return L.addEventListener("click",()=>{e.fuente=P.id,u()}),L}))}u();const d=l("button",{class:"chip",type:"button"},["Orgánico"]);d.addEventListener("click",()=>{e.medio=e.medio==="organico"?"pauta":"organico",d.textContent=e.medio==="organico"?"Orgánico":"Pauta (pago)"});const f=l("div",{class:"login__error",role:"alert",hidden:!0}),p=l("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),g=l("button",{class:"btn btn--gold",type:"submit"},["⚡ Registrar"]),_=l("form",{class:"nl-form"},[l("label",{class:"field"},[l("span",{class:"field__label",text:"Nombre *"}),r]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Teléfono / WhatsApp *"}),s]),l("div",{class:"u-row",style:{gap:"8px",alignItems:"center"}},[c,d]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Nota"}),i]),l("label",{class:"nl-consent"},[o,l("span",{class:"u-caption"},["Leí el guion y el cliente AUTORIZÓ de palabra: ",l("em",{text:IP})])]),f,l("div",{class:"nl-actions"},[p,g])]),I=l("div",{class:"modal"},[l("div",{class:"modal__head"},[l("h2",{class:"modal__title",text:"⚡ Lead rápido"}),l("span",{class:"u-caption u-faint",text:navigator.onLine?"El WhatsApp entrante o el cliente del patio, registrado en 30 segundos.":"📴 Sin señal: se guardará y sincronizará solo al volver la conexión."})]),_]),S=l("div",{class:"modal-overlay"},[I]);document.body.appendChild(S),setTimeout(()=>r.focus(),30);const A=()=>{S.remove(),window.removeEventListener("keydown",V)},V=P=>{P.key==="Escape"&&A()};window.addEventListener("keydown",V),S.addEventListener("mousedown",P=>{P.target===S&&A()}),p.addEventListener("click",A),_.addEventListener("submit",P=>{P.preventDefault(),f.hidden=!0;const L={nombre:r.value.trim(),telefono:s.value.trim(),fuente:e.fuente,medio:e.medio,nota:i.value.trim(),consentVerbal:o.checked,ownerId:t.uid||null,ownerName:t.nombre||t.email||null,createdAt:new Date().toISOString()};if(!L.nombre)return k("Escribe el nombre.");if(!L.telefono||L.telefono.replace(/\D/g,"").length<7)return k("Escribe un teléfono válido.");if(!L.ownerId&&!j.get().mock)return k("Sesión sin usuario — recarga el portal.");if(j.get().mock){my({nombre:L.nombre,telefono:L.telefono,canal:L.fuente,trafico:L.medio,consentGiven:L.consentVerbal,notas:L.nota}),window.dispatchEvent(new CustomEvent("altorra:leads-dirty")),$("⚡ Lead registrado (mock)","ok"),A();return}Ut(Ee(te,"lead_intake"),L).catch(C=>{console.error("[quick-lead] rechazo del servidor:",C),$('El lead "'+L.nombre+'" fue RECHAZADO al sincronizar: '+(C.code||C.message),"error")}),$(navigator.onLine?"⚡ Lead registrado — aparecerá en la Bandeja en segundos":"📴 Guardado local — se enviará al volver la señal","ok"),qa("lead_rapido",n,{fuente:e.fuente,online:navigator.onLine}),A()});function k(P){return f.textContent=P,f.hidden=!1,!1}}const TP="ventas",ao=[{id:"cuadrando_cita",label:"Cuadrando cita",prob:.2},{id:"cita_fijada",label:"Cita fijada",prob:.35},{id:"visita_test_drive",label:"Visita / Test drive",prob:.5},{id:"negociacion",label:"Negociación",prob:.7},{id:"apartado",label:"Apartado",prob:.9},{id:"vendido",label:"Vendido",prob:1,won:!0}],aa={id:"perdido",label:"Perdido",prob:0,lost:!0},Bo={_exit_visita_test_drive:["huboTestDrive"],apartado:["montoApartado","venceEl"],vendido:["tipoPago"],perdido:["lostReason"]},ri=ao.map(n=>n.id);function nm(n,e){if(n===e)return{ok:!0,needsReason:!1,gates:[]};const t=i=>i===aa.id||ri.includes(i);if(!t(n)||!t(e))return{ok:!1,error:"etapa_desconocida"};if(n==="vendido")return{ok:!1,error:"vendido_es_terminal"};if(e===aa.id)return{ok:!0,needsReason:!1,gates:Bo.perdido.slice()};if(n===aa.id)return{ok:!0,needsReason:!0,gates:[]};const r=ri.indexOf(n),s=ri.indexOf(e);if(s>r){const i=[];for(let o=r;o<s;o++){ri[o]==="visita_test_drive"&&i.push(...Bo._exit_visita_test_drive);const c=ri[o+1];Bo[c]&&i.push(...Bo[c])}return{ok:!0,needsReason:!1,gates:[...new Set(i)]}}return{ok:!0,needsReason:!0,gates:[],recalcVehicle:n==="apartado"}}const rm=[{id:"precio",label:"Precio"},{id:"financiacion_negada",label:"Financiación negada"},{id:"compro_en_otro_lado",label:"Compró en otro lado"},{id:"no_responde",label:"No responde"},{id:"cambio_de_opinion",label:"Cambió de opinión"},{id:"error_de_registro",label:"Error de registro"},{id:"otro",label:"Otro motivo"}],yi=ao.filter(n=>!n.won),gy=[...ao,aa].reduce((n,e)=>(n[e.id]=e,n),{});function es(n){return gy[n]||ao[0]}function bi(n){const e=gy[n];return e?e.prob:0}function Md(n){return Math.round((Number(n.amount)||0)*bi(n.stageId))}function _y(n){return n.reduce((e,t)=>e+(t.status==="open"?Md(t):0),0)}function AP(n){return n.reduce((e,t)=>e+(t.status==="open"&&Number(t.amount)||0),0)}function SP(n,e=14){return n.status==="open"&&Cs(n.lastActivityAt)>e}function RP(n){const e={};for(const t of yi)e[t.id]=[];for(const t of n)t.status==="open"&&(e[t.stageId]||(e[t.stageId]=[])).push(t);return e}const vy=[{id:"entrega",label:"Entrega del vehículo",dueDays:3},{id:"traspaso_runt",label:"Traspaso / RUNT",dueDays:15},{id:"tramites",label:"Trámites (SOAT, impuestos, GPS)",dueDays:15}];function kP(n){const e={};for(const r of n||[])!r||r.status!=="open"||!r.vehicleId||(e[r.vehicleId]=e[r.vehicleId]||[]).push(r.id||null);const t=[];for(const r of Object.keys(e))e[r].length>1&&t.push({vehicleId:r,dealIds:e[r]});return t}function yy(n){if(!n||n.status!=="won")return!1;const e=n.postventa||{};return vy.every(t=>e[t.id]===!0)}function by(n,e={}){const t=e.vehicleId!==void 0?e.vehicleId||"":n.vehicleOfInterestId||"",r=ao[0];return{name:(n.fullName||"Oportunidad")+(t?" · "+(e.vehicleName||t):""),contactId:n.contactId||null,contactName:n.fullName||"",leadId:n.id||null,vehicleId:t||null,vehicleName:e.vehicleName||t||"",sinVehiculoAun:!t,pipelineId:TP,stageId:r.id,stageName:r.label,status:"open",amount:Number(e.amount)||0,currency:"COP",probability:r.prob,weightedAmount:Math.round((Number(e.amount)||0)*r.prob),expectedCloseDate:null,ownerId:e.ownerId!==void 0?e.ownerId:n.ownerId||null,ownerName:e.ownerName!==void 0?e.ownerName:n.ownerName||null,source:n.source||"web",nextStep:e.nota||""}}const Gn=()=>new Date().toISOString(),wy=n=>({id:n.id,...n.data()}),Vt=()=>j.get().user?j.get().user.uid:null;function CP(n,e,t){return Ut(Ee(te,"activities"),{type:"deal",subject:t,body:"",status:"closed",direction:"outbound",relatedTo:{type:"deal",id:n,name:e||""},ownerId:Vt(),createdAt:Gn(),_version:1})}function PP({pageSize:n=100,onData:e,onError:t}){const r=Je(Ee(te,"deals"),Bn("status","==","open"),mt("lastActivityAt","desc"),kt(n));return Bt(r,s=>e(s.docs.map(wy)),s=>t&&t(s))}async function xP(n,e={}){const t=Gn(),r=by(n,e),s=await Ut(Ee(te,"deals"),{...r,lastActivityAt:t,createdAt:t,updatedAt:t,createdBy:Vt(),updatedBy:Vt(),_version:1});return await Xe(be(te,"leads",n.id),{status:"convertido",convertedTo:{dealId:s.id,prevStatus:n.status||"contactado"},lastActivityAt:t,updatedAt:t,updatedBy:Vt(),_version:Zt(1)}),await CP(s.id,r.contactName,"Oportunidad creada desde lead"),s.id}async function NP(n){return(await Mr(Fr,"anularConversion")({dealId:n})).data}async function Iy(){return(await Mt(Je(Ee(te,"vehiculos"),Bn("estado","in",["disponible","apartado"]),kt(60)))).docs.map(e=>{const t=e.data(),r=t.estado==="apartado";return{id:e.id,label:[t.marca,t.modelo,t.year].filter(Boolean).join(" ")+(r?" · ⚠ apartado":""),precio:Number(t.precioOferta||t.precio)||0,apartado:r}}).sort((e,t)=>e.label.localeCompare(t.label,"es"))}async function sm(n,e,t={},r={}){const s=Gn(),i=es(e),o={...r,stageId:e,stageName:i.label,probability:i.prob,weightedAmount:Math.round((Number(t.amount)||0)*i.prob),lastActivityAt:s,updatedAt:s,updatedBy:Vt(),_version:Zt(1)};t.status==="lost"&&e!=="perdido"&&(o.status="open"),await Xe(be(te,"deals",n),o)}async function DP(n,e,t={}){const r=Gn(),s=Math.max(0,Math.round(Number(e)||0));await Xe(be(te,"deals",n),{amount:s,weightedAmount:Math.round(s*bi(t.stageId)),updatedAt:r,updatedBy:Vt(),_version:Zt(1)})}async function VP(n,e={},t={}){const r=Gn();await Xe(be(te,"deals",n),{...t,status:"won",stageId:"vendido",stageName:"Vendido",probability:1,weightedAmount:Number(e.amount)||0,lastActivityAt:r,updatedAt:r,updatedBy:Vt(),_version:Zt(1)})}async function OP(n,e,t={}){const r=Gn();await Xe(be(te,"deals",n),{status:"lost",stageId:"perdido",stageName:"Perdido",probability:0,weightedAmount:0,lostReason:String(e||"otro"),lastActivityAt:r,updatedAt:r,updatedBy:Vt(),_version:Zt(1)})}function LP({pageSize:n=100,onData:e,onError:t}){const r=Je(Ee(te,"deals"),Bn("status","==","won"),mt("lastActivityAt","desc"),kt(n));return Bt(r,s=>e(s.docs.map(wy)),s=>t&&t(s))}async function MP(n,e,t){const r=Gn();await Xe(be(te,"deals",n),{["postventa."+e]:t===!0,lastActivityAt:r,updatedAt:r,updatedBy:Vt(),_version:Zt(1)});try{await Xe(be(te,"activities","postventa_"+n+"_"+e),t?{status:"closed",closedAt:r,closedBy:Vt()}:{status:"open",closedAt:null,closedBy:null})}catch{}}async function FP(n,e){const t=Gn();await Xe(be(te,"deals",n),{recibeVehiculo:{marca:String(e.marca||"").trim(),modelo:String(e.modelo||"").trim(),year:Number(e.year)||null,placa:String(e.placa||"").trim().toUpperCase(),valorEstimado:Number(e.valorEstimado)||0},lastActivityAt:t,updatedAt:t,updatedBy:Vt(),_version:Zt(1)})}async function UP(n){return(await Mr(Fr,"crmCrearBorradorRetoma")({dealId:n})).data}const ml="__sin_vehiculo__";function Ey(n,{onDone:e}={}){const t=performance.now(),r=j.get().team||[],s=l("select",{class:"select"},[l("option",{value:""},["Cargando inventario…"])]),i=l("input",{class:"input",type:"number",min:"0",step:"100000",placeholder:"Valor estimado (COP) *"}),o=l("select",{class:"select"},r.length?r.map(k=>l("option",{value:k.uid,selected:k.uid===n.ownerId?"":void 0},[k.nombre])):[l("option",{value:n.ownerId||""},[n.ownerName||"Yo"])]),c=l("input",{class:"input",type:"text",placeholder:"Nota de contexto (opcional)"}),u=l("div",{class:"login__error",role:"alert",hidden:!0}),d=l("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),f=l("button",{class:"btn btn--gold",type:"submit"},["🎯 Crear negocio"]),p=l("form",{class:"nl-form"},[l("p",{class:"u-caption u-muted",style:{margin:"0"}},["✓ Hablaste con él · ✓ tiene presupuesto o forma de pago en mente · ✓ busca un carro concreto o una categoría"]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Vehículo *"}),s]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Valor estimado (COP) *"}),i]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Asesor responsable *"}),o]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Nota"}),c]),u,l("div",{class:"nl-actions"},[d,f])]),g=l("div",{class:"modal"},[l("div",{class:"modal__head"},[l("h2",{class:"modal__title",text:"Calificar → crear negocio"}),l("span",{class:"u-caption u-faint",text:(n.fullName||"Cliente")+" pasa al Pipeline; el lead queda congelado como histórico."})]),p]),_=l("div",{class:"modal-overlay"},[g]);document.body.appendChild(_);const I=()=>{_.remove(),window.removeEventListener("keydown",S)},S=k=>{k.key==="Escape"&&I()};window.addEventListener("keydown",S),_.addEventListener("mousedown",k=>{k.target===_&&I()}),d.addEventListener("click",I);let A=[];(j.get().mock?Promise.resolve([]):Iy()).then(k=>{A=k,s.replaceChildren(l("option",{value:""},["— Elige un vehículo —"]),...k.map(P=>l("option",{value:P.id},[P.label+(P.precio?" · $"+P.precio.toLocaleString("es-CO"):"")])),l("option",{value:ml},["Sin vehículo aún (buscando / retoma)"]))}).catch(()=>{s.replaceChildren(l("option",{value:ml},["Sin vehículo aún"]))}),s.addEventListener("change",()=>{const k=A.find(P=>P.id===s.value);k&&k.precio&&!i.value&&(i.value=String(k.precio))}),p.addEventListener("submit",async k=>{k.preventDefault(),u.hidden=!0;const P=s.value,L=Math.round(Number(i.value)||0);if(!P)return V('Elige un vehículo o marca "Sin vehículo aún".');if(!(L>0))return V("El valor estimado es obligatorio (alimenta el pronóstico).");const C=o.value||n.ownerId;if(!C)return V("El negocio necesita un asesor responsable.");const M=r.find(b=>b.uid===C)?.nombre||n.ownerName||null,E=A.find(b=>b.id===P),v={vehicleId:P===ml?null:P,vehicleName:E?E.label:"",amount:L,ownerId:C,ownerName:M,nota:c.value.trim()};f.disabled=!0,f.textContent="Creando…";try{if(j.get().mock){fP(by(n,v)),$("🎯 Negocio creado (mock)","ok"),qa("conversion",t,{mock:!0}),I(),e&&e({mock:!0});return}const b=await xP(n,v);qa("conversion",t,{}),I(),BP(b,n),e&&e({dealId:b})}catch(b){f.disabled=!1,f.textContent="🎯 Crear negocio",V(b&&b.code==="permission-denied"?"Recarga el portal: tu versión está desactualizada.":"No se pudo crear el negocio. Intenta de nuevo.")}});function V(k){return u.textContent=k,u.hidden=!1,!1}}function BP(n,e){const t=l("button",{class:"btn btn--soft btn--sm",type:"button"},["Deshacer"]),r=l("div",{role:"status",style:{position:"fixed",bottom:"18px",left:"50%",transform:"translateX(-50%)",display:"flex",gap:"12px",alignItems:"center",zIndex:"99",padding:"10px 14px",borderRadius:"10px",background:"var(--bg-elev, #1c1a17)",border:"1px solid var(--line, #444)",boxShadow:"0 6px 24px rgba(0,0,0,.4)"}},[l("span",{text:`🎯 Negocio creado para ${(e.fullName||"el cliente").split(/\s+/)[0]}`}),t]);document.body.appendChild(r);const s=setTimeout(()=>r.remove(),1e4);t.addEventListener("click",async()=>{clearTimeout(s),t.disabled=!0,t.textContent="Anulando…";try{await NP(n),$("↩ Conversión anulada — el lead volvió a la Bandeja","ok")}catch(i){$("No se pudo anular: "+(i&&i.message||""),"error")}r.remove()})}const wn={wa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.477-.91zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>',person:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',flag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',expand:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',convert:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 12h6M13 9l3 3-3 3"/></svg>',call:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',more:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>'};function $P(){const n=(t,r)=>{const s=new Date;return s.setDate(s.getDate()+t),s.setHours(r,0,0,0),s.toISOString()},e=new Date(Date.now()+72e5).toISOString();return[{value:{subject:"Llamar al cliente",dueAt:n(1,9)},label:"Llamar mañana 9 am",icon:"📞"},{value:{subject:"Escribir por WhatsApp",dueAt:e},label:"WhatsApp en 2 horas",icon:"💬"},{value:{subject:"Hacer seguimiento",dueAt:n(3,9)},label:"Seguimiento en 3 días",icon:"🔁"},{value:"abrir360",label:"Agendar cita (abrir 360)",icon:"📅"},{value:null,label:"Sin próximo paso",icon:"⊘"}]}function Ty(n){const e={queue:"todo",filters:{type:"",channel:"",status:""},search:"",showClosed:!1,leads:[],loading:!0,error:null,hasMore:!1,cursor:null,sub:null},t=Be("crm.edit"),r=j.get().user&&j.get().user.uid,s=l("div",{class:"inbox__queues",role:"tablist","aria-label":"Colas"}),i=l("label",{class:"search","aria-label":"Buscar"},[l("span",{html:wn.search,"aria-hidden":"true"}),l("input",{type:"search",placeholder:"Buscar nombre, correo, teléfono…",autocomplete:"off"})]),o=l("div",{class:"inbox__filters"}),c=t?l("button",{class:"btn btn--gold btn--sm",type:"button",style:{marginLeft:"auto"}},["⚡ Lead rápido"]):null;c&&c.addEventListener("click",()=>EP());const u=t?l("button",{class:"btn btn--soft btn--sm",type:"button"},["＋ Completo"]):null;u&&u.addEventListener("click",()=>vP());const d=l("button",{class:"btn btn--soft btn--sm",type:"button"},["📋 Pendientes hoy"]);d.addEventListener("click",()=>M());const f=l("div",{class:"inbox__pendientes",hidden:!0}),p=l("div",{class:"inbox__toolbar"},[i,o,c,u,d]),g=l("div",{class:"inbox__list",role:"list",tabindex:"-1"}),_=l("p",{class:"u-muted u-caption",style:{margin:"0"}},["Aquí llegan los interesados: contacta y califica. Las ventas activas viven en el Pipeline."]),I=l("section",{class:"inbox"},[_,s,p,f,g]);fe(n),n.append(I);const S=i.querySelector("input");S.addEventListener("input",()=>{e.search=S.value,le()});async function A(F,q){if(R(F.id,{ownerId:q?q.uid:null,ownerName:q?q.nombre:null}),j.get().mock){$(q?`Asignado a ${q.nombre}`:"Sin asignar","ok");return}try{await XC(F.id,q),$(q?`Asignado a ${q.nombre}`:"Sin asignar","ok")}catch{$("No se pudo asignar","error")}}async function V(F,q,Y={}){if(R(F.id,{status:q,...Y,lastActivityAt:new Date().toISOString()}),j.get().mock){$(`Estado → ${ia(q).label}`,"ok");return}try{await ZC(F.id,q,F,Y),$(`Estado → ${ia(q).label}`,"ok")}catch{$("No se pudo cambiar el estado","error")}}function k(F,q){const Y=ay(F.phone,qP(F));if(!Y){$("Este lead no tiene teléfono","error");return}window.open(Y,"_blank","noopener"),!j.get().mock&&t&&em(F.id,{type:"whatsapp",subject:"WhatsApp enviado",direction:"outbound",name:F.fullName}).catch(()=>{}),L(F,q)}function P(F,q){!j.get().mock&&t&&em(F.id,{type:"llamada",subject:"Llamada registrada",direction:"outbound",name:F.fullName}).catch(()=>{}),$("📞 Llamada registrada","ok"),L(F,q)}function L(F,q){if(!t)return;const Y=performance.now();qt(q||document.body,$P(),ce=>{if(qa("proximo_paso",Y,{preset:ce.label}),!!ce.value){if(ce.value==="abrir360"){N(F.id);return}if(j.get().mock){$("Próximo paso anotado (mock)","ok");return}eP(F.id,{subject:ce.value.subject,dueAt:ce.value.dueAt,name:F.fullName}).then(()=>$("✓ Próximo paso: "+ce.label,"ok")).catch(()=>$("No se pudo guardar el próximo paso","error"))}},{title:"¿Próximo paso con "+(F.fullName||"el cliente").split(/\s+/)[0]+"?"})}let C=!1;async function M(){C=!C,f.hidden=!C,C&&await E()}async function E(){if(fe(f),j.get().mock){f.append(l("div",{class:"u-muted u-caption",style:{padding:"10px"},text:"Pendientes no disponible en modo demo."}));return}f.append(l("div",{class:"u-muted u-caption",style:{padding:"10px"},text:"Cargando pendientes…"}));let F=[];try{F=await tP()}catch{fe(f),f.append(l("div",{class:"u-muted u-caption",style:{padding:"10px"},text:"No se pudieron cargar los pendientes."}));return}if(fe(f),f.append(l("div",{class:"inbox__listhead"},[l("span",{class:"u-muted u-caption",text:`📋 ${F.length} pendiente${F.length===1?"":"s"} (hoy y vencidos)`})])),!F.length){f.append(l("div",{class:"u-muted u-caption",style:{padding:"0 10px 10px"},text:"¡Al día! Registra llamadas/WhatsApps y elige “próximo paso” para que aparezcan aquí."}));return}const q=Date.now();F.forEach(Y=>{const ce=new Date(Y.dueAt).getTime()<q,se=l("button",{class:"btn btn--soft btn--sm",type:"button",title:"Marcar hecho"},["✓ Hecho"]),re=l("button",{class:"btn btn--ghost btn--sm",type:"button"},["Abrir 360"]),Re=l("div",{class:"lead-card",style:{alignItems:"center"}},[l("span",{class:`badge badge--${ce?"danger":"gold"}`,text:ce?"VENCIDO":"HOY"}),l("div",{class:"u-grow"},[l("div",{class:"lead-card__name",text:(Y.type==="cita"?"📅 ":"")+Y.subject}),l("div",{class:"u-caption u-muted",text:`${Y.relatedTo&&Y.relatedTo.name?Y.relatedTo.name+" · ":""}${vr(Y.dueAt)}`})]),l("div",{class:"u-row u-row--tight"},[re,t?se:null])]);re.addEventListener("click",()=>{Y.relatedTo&&Y.relatedTo.id&&N(Y.relatedTo.id)}),se.addEventListener("click",async()=>{se.disabled=!0;try{await nP(Y.id),$("✓ Hecho","ok"),await E(),Y.relatedTo&&Y.relatedTo.id&&L({id:Y.relatedTo.id,fullName:Y.relatedTo.name||""},d)}catch{se.disabled=!1,$("No se pudo completar","error")}}),f.append(Re)})}function v(F){if(F.status==="convertido"){$("Ya es un negocio: gestiónalo en el Pipeline","info");return}Ey(F,{onDone:()=>R(F.id,{status:"convertido"})})}function b(){j.set({leads:e.leads})}function R(F,q){const Y=e.leads.findIndex(ce=>ce.id===F);Y!==-1&&(e.leads[Y]=fy({...e.leads[Y],...q}),b(),w())}function w(){x(),T(),le()}function x(){const F=jC(e.leads,r);fe(s),su.forEach(q=>{const Y=e.queue===q.id,ce=l("button",{class:"chip"+(Y?" chip--active":""),role:"tab","aria-selected":String(Y),type:"button"},[l("span",{"aria-hidden":"true",text:q.icon}),l("span",{text:q.label}),l("span",{class:"chip__count",text:String(F[q.id]||0)})]);ce.addEventListener("click",()=>{e.queue=q.id,w()}),s.append(ce)})}function T(){if(fe(o),[{key:"type",label:"Tipo",items:[["","Todos"],["lead","Lead"],["cita","Cita"],["solicitud","Solicitud"],["pqr","PQR"]]},{key:"channel",label:"Canal",items:[["","Todos"],["web","Web"],["whatsapp","WhatsApp"],["bot","ALTOR Bot"],["cuenta","Cuenta"],["newsletter","Newsletter"],["cita","Cita web"]]},{key:"status",label:"Estado",items:[["","Todos"],...nu.map(q=>[q.id,q.label])]}].forEach(q=>{const Y=e.filters[q.key],ce=Y?(q.items.find(re=>re[0]===Y)||[,q.label])[1]:q.label,se=l("button",{class:"chip"+(Y?" chip--active":""),type:"button","aria-haspopup":"menu"},[l("span",{text:ce}),l("span",{"aria-hidden":"true",text:"▾"})]);se.addEventListener("click",()=>{qt(se,q.items.map(([re,Re])=>({value:re,label:Re,active:re===Y})),re=>{e.filters[q.key]=re.value,w()},{title:q.label})}),o.append(se)}),e.filters.type||e.filters.channel||e.filters.status){const q=l("button",{class:"chip",type:"button"},["✕ Limpiar"]);q.addEventListener("click",()=>{e.filters={type:"",channel:"",status:""},w()}),o.append(q)}}function le(){if(e.loading)return Z();if(e.error)return z("⚠️","No se pudo cargar",e.error);const{rows:F,hiddenClosed:q}=WC(e.leads,{queue:e.queue,uid:r,filters:e.filters,search:e.search,showClosed:e.showClosed});if(fe(g),!F.length&&!q){const se=e.search||e.filters.type||e.filters.channel||e.filters.status;g.append(H("🗂️",se?"Sin resultados":"¡Bandeja al día!",se?"Ajusta la búsqueda o los filtros.":"No hay clientes en esta cola."));return}const Y=q||e.showClosed?l("button",{class:"chip",type:"button",style:{marginLeft:"auto"}},[e.showClosed?"✕ Ocultar cerrados":`${q} ocultos · ver todos`]):null;Y&&Y.addEventListener("click",()=>{e.showClosed=!e.showClosed,le()});const ce=l("div",{class:"inbox__listhead"},[l("span",{class:"u-muted u-caption",text:`${F.length} ${F.length===1?"cliente":"clientes"} activos`}),l("span",{class:"u-faint u-caption",text:"Ordenado por urgencia"}),Y]);if(g.append(ce),!F.length&&q){g.append(H("🗂️","¡Bandeja al día!",`No hay clientes activos en esta cola (${q} cerrados ocultos).`));return}if(F.forEach(se=>g.append(pe(se))),e.hasMore&&e.queue==="todo"&&!e.search){const se=l("button",{class:"btn btn--soft btn--block",type:"button"},["Cargar más"]);se.addEventListener("click",()=>G(se)),g.append(l("div",{class:"inbox__more"},[se]))}}function pe(F){const q=us[F._rating],Y=ia(F.status),ce=!!(F.convertedTo&&F.convertedTo.dealId)||F.status==="convertido",se=KC(F),re=se&&se.state!=="ok"?l("span",{class:`badge badge--${se.state==="late"?"danger":"gold"}`,title:"Tiempo sin primer contacto"},[`⏱ ${se.mins<120?se.mins+" min":fl(se.mins*6e4)} sin contacto`]):null,Re=F._sla,Ne=`sla-dot sla-dot--${Re.state}`,qe=Re.closed?"Cerrado":Re.state==="late"?`SLA vencido hace ${fl(Re.remainingMs)}`:`Responder en ${fl(Re.remainingMs)}`,ct=[F._type.icon+" "+F._type.label,F.sourceDetail,F.vehicleOfInterestId?"🚗 "+F.vehicleOfInterestId:""].filter(Boolean).join(" · "),Hn=l("article",{class:"lead-card",role:"listitem",tabindex:"0","data-id":F.id,"aria-label":`${F.fullName}, ${q.label}`},[l("span",{class:Ne,title:qe,"aria-label":qe}),l("span",{class:"avatar avatar--sm","aria-hidden":"true",text:ks(F.fullName)}),l("div",{class:"lead-card__main u-grow"},[l("div",{class:"lead-card__top"},[l("span",{class:"lead-card__name u-truncate",text:F.fullName}),l("span",{class:`temp ${q.cls}`,title:`Score ${F._score}/100`},[`${q.icon} ${F._score}`])]),l("div",{class:"lead-card__what u-truncate u-muted",text:ct}),l("div",{class:"lead-card__meta u-caption"},[l("span",{class:"lead-card__chan",text:`${F._channel.icon} ${F._channel.label}`}),l("span",{class:"lead-card__dot",text:"·"}),l("span",{text:vr(F.createdAt)}),l("span",{class:"lead-card__dot",text:"·"}),ce?l("button",{class:"badge badge--ok",type:"button","data-action":"pipeline",title:"Este lead ya es un negocio: gestiónalo en el Pipeline",style:{cursor:"pointer",border:"none"}},[F.convertedTo&&F.convertedTo.outcome==="perdido"?"✖ Negocio perdido → Pipeline":F.convertedTo&&F.convertedTo.outcome==="vendido"?"🏆 VENDIDO":`🎯 ${F.convertedTo&&F.convertedTo.stageName||"Convertido"} → Pipeline`]):l("span",{class:`badge badge--${Y.badge||""}`.trim(),text:Y.label}),F.archived?l("span",{class:"badge",text:"🗄 Archivado"}):null,re?l("span",{class:"lead-card__dot",text:"·"}):null,re,F.ownerName?l("span",{class:"lead-card__dot",text:"·"}):null,F.ownerName?l("span",{class:"u-faint",text:"👤 "+F.ownerName}):null]),l("div",{class:"lead-card__nba"},[l("span",{"aria-hidden":"true",text:F._nba.icon}),l("span",{class:"u-muted",text:"Próx: "}),l("strong",{text:F._nba.label})])]),l("div",{class:"lead-card__actions"},[X("wa",wn.wa,"WhatsApp","btn--wa"),t?X("call",wn.call,"Registrar llamada"):null,t?X("assign",wn.person,"Asignar"):null,t&&!ce?X("status",wn.flag,"Cambiar estado"):null,t&&!ce?X("convert",wn.convert,"Convertir a oportunidad"):null,t?X("more",wn.more,"Más acciones"):null,X("open",wn.expand,"Abrir 360")])]);return Hn.addEventListener("click",Kn=>{const Ms=Kn.target.closest("[data-action]");if(Ms){$e(Ms.dataset.action,F,Ms);return}N(F.id)}),Hn.addEventListener("keydown",Kn=>{Kn.key==="Enter"?N(F.id):Kn.key.toLowerCase()==="w"&&k(F)}),Hn}function X(F,q,Y,ce=""){return l("button",{class:`icon-btn ${ce}`.trim(),type:"button","data-action":F,title:Y,"aria-label":Y},[l("span",{html:q,"aria-hidden":"true"})])}const ye={nuevo:"Acaba de entrar, nadie le ha hablado",contactado:"Ya le escribiste o llamaste",descartado:"No va: inalcanzable, no califica, spam… (pide la razón)"};function $e(F,q,Y){if(F==="open")return N(q.id);if(F==="wa")return k(q,Y);if(F==="call")return P(q,Y);if(F==="convert")return v(q);if(F==="pipeline"){window.location.hash="#/pipeline";return}if(F==="assign"){const ce=j.get().team||[],se=[{value:null,label:"Sin asignar",icon:"⊘",active:!q.ownerId},...ce.map(re=>({value:re,label:re.nombre,hint:re.cargo,icon:"👤",active:q.ownerId===re.uid}))];return qt(Y,se,re=>A(q,re.value),{title:"Asignar a"})}if(F==="status"){if(q.convertedTo&&q.convertedTo.dealId){$("Este lead ya es un negocio: gestiónalo en el Pipeline.","info");return}const ce=nu.filter(se=>se.id!=="convertido").map(se=>({value:se.id,label:se.label,hint:ye[se.id]||"",active:(q.status||"nuevo")===se.id}));return qt(Y,ce,se=>{if(se.value==="descartado"){qt(Y,OC.map(re=>({value:re.id,label:re.label})),re=>V(q,"descartado",{discardReason:re.value}),{title:"¿Por qué se descarta?"});return}V(q,se.value)},{title:"Cambiar estado"})}if(F==="more"){const ce=[q.archived?{value:"unarchive",label:"Restaurar de archivados",icon:"↩️"}:{value:"archive",label:"Archivar",icon:"🗄",hint:"Sale de las vistas; reversible"},Be("crm.delete")?{value:"purge",label:"Eliminar definitivo",icon:"🗑",hint:"Solo pruebas/spam — borra TODO su rastro"}:null].filter(Boolean);return qt(Y,ce,async se=>{if(se.value==="archive"||se.value==="unarchive"){const re=se.value==="archive";if(R(q.id,{archived:re}),j.get().mock){$(re?"🗄 Archivado":"↩️ Restaurado","ok");return}try{await rP(q.id,re),$(re?"🗄 Archivado":"↩️ Restaurado","ok")}catch{R(q.id,{archived:!re}),$("No se pudo archivar","error")}return}if(se.value==="purge"){if(!navigator.onLine){$("Eliminar definitivo necesita señal.","error");return}if(!window.confirm('🗑 ¿Eliminar DEFINITIVAMENTE a "'+q.fullName+`"?

Borra el lead, sus actividades, negocios y su contacto si queda huérfano. Esto es SOLO para pruebas/spam — un cliente real se ARCHIVA.`)||!window.confirm("Última confirmación: esta acción NO se puede deshacer. ¿Eliminar?"))return;if(j.get().mock){$("Eliminado (mock)","ok");return}try{const re=await sP(q.id);$(`🗑 Eliminado: ${re.activities} actividades, ${re.deals} negocios${re.contactDeleted?", contacto":""}`,"ok")}catch(re){$(re.message&&re.message.includes("Super Admin")?"Solo el Super Admin puede eliminar.":"No se pudo eliminar: "+(re.message||re.code),"error")}}},{title:"Más acciones"})}}function N(F){j.set({detailLeadId:F})}function H(F,q,Y){return l("div",{class:"state"},[l("div",{class:"state__icon","aria-hidden":"true",text:F}),l("div",{class:"state__title",text:q}),l("div",{class:"state__msg",text:Y})])}function z(F,q,Y){fe(g),g.append(H(F,q,Y))}function Z(){fe(g);for(let F=0;F<6;F++)g.append(l("div",{class:"lead-card lead-card--skeleton"},[l("span",{class:"skeleton",style:{width:"30px",height:"30px",borderRadius:"50%"}}),l("div",{class:"u-grow u-stack",style:{gap:"8px"}},[l("span",{class:"skeleton",style:{width:"46%",height:"14px"}}),l("span",{class:"skeleton",style:{width:"70%",height:"12px"}})])]))}async function G(F){if(e.cursor){F.disabled=!0,F.textContent="Cargando…";try{const{rows:q,lastDoc:Y,hasMore:ce}=await YC({after:e.cursor}),se=Fo(q),re=new Set(e.leads.map(Re=>Re.id));e.leads.push(...se.filter(Re=>!re.has(Re.id))),e.cursor=Y,e.hasMore=ce,b(),w()}catch{$("No se pudo cargar más","error"),F.disabled=!1,F.textContent="Cargar más"}}}function he(){if(j.get().mock){j.set({team:iu()}),e.leads=Fo($a()),e.loading=!1,e.hasMore=!1,b(),w(),e.dirtyHandler=()=>{e.leads=Fo($a()),b(),w()},window.addEventListener("altorra:leads-dirty",e.dirtyHandler);return}JC().catch(()=>{}),e.sub=QC({pageSize:40,onData:(F,q)=>{e.leads=Fo(F),e.cursor=e.sub?e.sub.getLastDoc():null,e.hasMore=q.hasMore,e.loading=!1,e.error=null,b(),w()},onError:F=>{console.error("[inbox] error de suscripción:",F),e.loading=!1,e.error=F&&F.code==="permission-denied"?"Tu cuenta no tiene permiso para ver el CRM.":"Revisa tu conexión e inténtalo de nuevo.",w()}})}return w(),he(),function(){e.sub&&e.sub.unsubscribe&&e.sub.unsubscribe(),e.sub=null,e.dirtyHandler&&(window.removeEventListener("altorra:leads-dirty",e.dirtyHandler),e.dirtyHandler=null)}}function qP(n){const e=String(n.fullName||"").trim().split(/\s+/)[0]||"",t=n.vehicleOfInterestId?` por el vehículo ${n.vehicleOfInterestId}`:"";return`Hola ${e}, te saluda Altorra Cars 👋. Vimos tu interés${t}. ¿En qué te podemos ayudar?`}function jP(n){const e={deals:[],loading:!0,error:null,sub:null,dragId:null,view:"kanban",won:[],wonSub:null,wonLoading:!0,wonError:null,collisionByDeal:new Map},t=Be("crm.edit"),r=new Set,s=l("div",{class:"pipeline__bar"}),i=l("div",{class:"pipeline__board",role:"list","aria-label":"Embudo de ventas"}),o=l("p",{class:"u-muted u-caption",style:{margin:"0"}},["Aquí se trabajan las ventas activas. Los interesados nuevos llegan a la Bandeja."]),c=l("section",{class:"pipeline"},[o,s,i]);fe(n),n.append(c);function u(N,H){const z=e.deals.findIndex(Z=>Z.id===N);z!==-1&&(e.deals[z]={...e.deals[z],...H},j.get().mock&&pP(N,H),A())}async function d(N,H){if(N.stageId===H)return;const z=nm(N.stageId,H);if(!z.ok){$(z.error==="vendido_es_terminal"?"Un negocio vendido no se mueve (anulación = admin).":"Movimiento no válido","error");return}const Z=[...z.gates];z.needsReason&&Z.push("regressReason");const G=async he=>{const F=es(H),q=N.stageId;if(u(N.id,{stageId:H,stageName:F.label,probability:F.prob,...he,lastActivityAt:new Date().toISOString()}),j.get().mock){$("Etapa → "+F.label,"ok");return}try{await sm(N.id,H,N,he),p(N,q,F.label)}catch(Y){u(N.id,{stageId:q,stageName:es(q).label,probability:bi(q)}),$(Y&&Y.code==="permission-denied"?"Movimiento rechazado por las reglas — recarga el portal si tu versión es vieja.":"No se pudo mover","error")}};if(!Z.length)return G({});g(N,H,Z,G)}let f=null;function p(N,H,z){f&&f.remove();const Z=l("button",{class:"btn btn--soft btn--sm",type:"button"},["Deshacer"]),G=l("div",{role:"status",style:{position:"fixed",bottom:"18px",left:"50%",transform:"translateX(-50%)",display:"flex",gap:"12px",alignItems:"center",zIndex:"99",padding:"10px 14px",borderRadius:"10px",background:"var(--bg-elev, #1c1a17)",border:"1px solid var(--line, #444)",boxShadow:"0 6px 24px rgba(0,0,0,.4)"}},[l("span",{text:`${(N.contactName||N.name||"Negocio").split(" · ")[0]} → ${z}`}),Z]);document.body.appendChild(G),f=G;const he=setTimeout(()=>{G.remove(),f===G&&(f=null)},1e4);Z.addEventListener("click",async()=>{clearTimeout(he),G.remove(),f===G&&(f=null);const F=es(H);if(u(N.id,{stageId:H,stageName:F.label,probability:F.prob}),!j.get().mock)try{await sm(N.id,H,N,{regressReason:"Deshacer (arrastre accidental)"})}catch{$("No se pudo deshacer","error")}})}function g(N,H,z,Z){const G={},he=[],F=(Ne,qe)=>l("label",{class:"field"},[l("span",{class:"field__label",text:Ne}),qe]);if(z.includes("huboTestDrive")&&(G.huboTestDrive=l("select",{class:"select"},[l("option",{value:"si"},["Sí, hubo test drive"]),l("option",{value:"no"},["No alcanzó a probarlo"])]),he.push(F("¿Hubo test drive?",G.huboTestDrive))),z.includes("montoApartado")){G.montoApartado=l("input",{class:"input",type:"number",min:"0",step:"50000",placeholder:"500000"});const Ne=new Date(Date.now()+72*3600*1e3);G.venceEl=l("input",{class:"input",type:"date",value:Ne.toISOString().slice(0,10)}),he.push(F("Monto del apartado (COP) *",G.montoApartado),F("Vence el (default 72h)",G.venceEl))}if(z.includes("tipoPago")&&(G.tipoPago=l("select",{class:"select"},[l("option",{value:"contado"},["De contado"]),l("option",{value:"financiado"},["Financiado"])]),G.estadoCredito=l("select",{class:"select"},[l("option",{value:""},["— Estado del crédito —"]),l("option",{value:"pre_aprobado"},["Pre-aprobado"]),l("option",{value:"en_estudio"},["En estudio"]),l("option",{value:"aprobado"},["Aprobado"]),l("option",{value:"rechazado"},["Rechazado"])]),he.push(F("Forma de pago *",G.tipoPago),F("Crédito (si aplica)",G.estadoCredito))),z.includes("lostReason")&&(G.lostReason=l("select",{class:"select"},rm.map(Ne=>l("option",{value:Ne.id},[Ne.label]))),he.push(F("¿Por qué se perdió? *",G.lostReason))),z.includes("regressReason")&&(G.regressReason=l("input",{class:"input",type:"text",placeholder:"¿Qué pasó? (obligatorio al retroceder)"}),he.push(F("Razón del retroceso *",G.regressReason))),H==="vendido"){G.retomaCheck=l("input",{type:"checkbox",class:"checkbox"}),G.retomaMarca=l("input",{class:"input",type:"text",placeholder:"Marca *"}),G.retomaModelo=l("input",{class:"input",type:"text",placeholder:"Modelo"}),G.retomaYear=l("input",{class:"input",type:"number",min:"1980",max:"2035",placeholder:"Año"}),G.retomaPlaca=l("input",{class:"input",type:"text",placeholder:"Placa",maxlength:"8"}),G.retomaValor=l("input",{class:"input",type:"number",min:"0",step:"500000",placeholder:"Valor estimado (COP)"});const Ne=l("div",{class:"nl-form",hidden:!0,style:{marginTop:"8px"}},[G.retomaMarca,G.retomaModelo,G.retomaYear,G.retomaPlaca,G.retomaValor]);G.retomaCheck.addEventListener("change",()=>{Ne.hidden=!G.retomaCheck.checked}),he.push(l("div",{},[l("label",{class:"u-row u-row--tight",style:{cursor:"pointer"}},[G.retomaCheck,l("span",{text:"🚙 Recibe vehículo en parte de pago (retoma)"})]),Ne]))}const q=l("div",{class:"login__error",role:"alert",hidden:!0}),Y=l("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),ce=l("button",{class:"btn btn--gold",type:"submit"},["Mover a "+es(H).label]),se=l("form",{class:"nl-form"},[...he,q,l("div",{class:"nl-actions"},[Y,ce])]),re=l("div",{class:"modal-overlay"},[l("div",{class:"modal"},[l("div",{class:"modal__head"},[l("h2",{class:"modal__title",text:es(H).label})]),se])]);document.body.appendChild(re),r.add(re);const Re=()=>{r.delete(re),re.remove()};Y.addEventListener("click",Re),re.addEventListener("mousedown",Ne=>{Ne.target===re&&Re()}),se.addEventListener("submit",Ne=>{Ne.preventDefault();const qe={};if(G.huboTestDrive&&(qe.huboTestDrive=G.huboTestDrive.value==="si"),G.montoApartado){const ct=Math.round(Number(G.montoApartado.value)||0);if(!(ct>0)){q.textContent="El monto del apartado es obligatorio.",q.hidden=!1;return}qe.montoApartado=ct,qe.venceEl=new Date((G.venceEl.value||new Date().toISOString().slice(0,10))+"T18:00:00-05:00").toISOString()}if(G.tipoPago&&(qe.tipoPago=G.tipoPago.value,G.estadoCredito&&G.estadoCredito.value&&(qe.estadoCredito=G.estadoCredito.value)),G.lostReason&&(qe.lostReason=G.lostReason.value),G.regressReason){const ct=G.regressReason.value.trim();if(!ct){q.textContent="Escribe la razón del retroceso.",q.hidden=!1;return}qe.regressReason=ct}if(G.retomaCheck&&G.retomaCheck.checked){const ct=G.retomaMarca.value.trim();if(!ct){q.textContent="La marca del vehículo recibido es obligatoria.",q.hidden=!1;return}qe.recibeVehiculo={marca:ct,modelo:G.retomaModelo.value.trim(),year:Number(G.retomaYear.value)||null,placa:G.retomaPlaca.value.trim().toUpperCase(),valorEstimado:Math.round(Number(G.retomaValor.value)||0)}}Re(),Z(qe)})}async function _(N,H){if(u(N.id,{amount:H}),!j.get().mock)try{await DP(N.id,H,N)}catch{$("No se pudo guardar el monto","error")}}async function I(N){if(!(Number(N.amount)>0)){$("Ponle el monto al negocio antes de marcarlo ganado (con ese valor se congela la comisión).","error");return}const H=nm(N.stageId,"vendido");if(!H.ok){$("Movimiento no válido","error");return}const z={status:N.status,stageId:N.stageId},Z=async G=>{if(u(N.id,{status:"won",...G}),j.get().mock){$("🎉 ¡Venta ganada!","ok");return}try{await VP(N.id,N,G),$("🎉 ¡Venta ganada!","ok")}catch{u(N.id,z),$("No se pudo marcar — revisa los datos requeridos","error")}};if(!H.gates.length)return Z({});g(N,"vendido",H.gates,Z)}async function S(N,H){const z={status:N.status,lostReason:N.lostReason||null};if(u(N.id,{status:"lost",lostReason:H}),j.get().mock){$("Marcado perdido","info");return}try{await OP(N.id,H,N),$("Marcado perdido","info")}catch{u(N.id,z),$("Error","error")}}function A(){if(e.loading)return ye();if(e.error)return X("⚠️","No se pudo cargar",e.error);const N=e.deals.filter(z=>z.status==="open");e.collisionByDeal=new Map;for(const z of kP(N))for(const Z of z.dealIds)e.collisionByDeal.set(Z,z.dealIds.length);if(V(N),e.view==="postventa")return le();if(i.classList.remove("pipeline__board--list"),fe(i),!N.length){i.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"🎯"}),l("div",{class:"state__title",text:"Embudo vacío"}),l("div",{class:"state__msg",text:"Convierte un lead en oportunidad desde la Bandeja para empezar."})]));return}const H=RP(N);yi.forEach(z=>{const Z=H[z.id]||[],G=Z.reduce((F,q)=>F+(Number(q.amount)||0),0),he=l("div",{class:"pcol","data-stage":z.id},[l("div",{class:"pcol__head"},[l("div",{class:"u-row u-row--tight"},[l("span",{class:"pcol__dot",style:{background:zP(z.id)}}),l("strong",{text:z.label}),l("span",{class:"pcol__count",text:String(Z.length)})]),l("span",{class:"u-caption u-faint",text:`${Math.round(z.prob*100)}% · ${sr(G)||"$0"}`})]),l("div",{class:"pcol__drop","data-stage":z.id,role:"list"},Z.map(L))]);v(he.querySelector(".pcol__drop"),z.id),i.append(he)})}function V(N){const H=_y(N),z=AP(N);fe(s);const Z=e.wonLoading?null:e.won.length,G=(he,F)=>{const q=l("button",{class:"btn btn--sm "+(e.view===he?"btn--gold":"btn--ghost"),type:"button","aria-pressed":e.view===he?"true":"false"},[F]);return q.addEventListener("click",()=>k(he)),q};s.append(l("div",{class:"pipeline__views",role:"group","aria-label":"Vista"},[G("kanban","🎯 Embudo"),G("postventa","🏁 Post-venta"+(Z===null||Z===0?"":" ("+Z+")"))]),P("Oportunidades",String(N.length)),P("Valor del embudo",sr(z)||"$0"),P("Forecast ponderado",sr(H)||"$0",!0))}function k(N){e.view!==N&&(e.view=N,N==="postventa"&&b(),A())}function P(N,H,z){return l("div",{class:"pstat"+(z?" pstat--hi":"")},[l("span",{class:"u-caption u-faint",text:N}),l("strong",{class:"pstat__v",text:H})])}function L(N){const H=SP(N),z=l("button",{class:"deal-card__amount",type:"button","data-action":"amount",title:"Editar monto"},[N.amount?sr(N.amount):"+ monto"]),Z=l("article",{class:"deal-card"+(H?" is-rotting":""),draggable:"true",tabindex:"0","data-id":N.id,"data-stage":N.stageId,role:"listitem","aria-label":`${N.name}, ${Math.round(bi(N.stageId)*100)}%`},[l("div",{class:"deal-card__top"},[l("span",{class:"avatar avatar--sm","aria-hidden":"true",text:ks(N.contactName)}),l("span",{class:"deal-card__name u-grow u-truncate",text:N.name}),H?l("span",{class:"deal-card__rot",title:"Estancado >14 días",text:"🐌"}):null]),N.vehicleName?l("div",{class:"u-caption u-muted u-truncate",text:"🚗 "+N.vehicleName}):null,e.collisionByDeal.has(N.id)?l("div",{class:"deal-card__collision u-caption",title:"Otro negocio activo persigue este mismo carro. Coordinen quién va primero.",text:"🥊 "+e.collisionByDeal.get(N.id)+" negocios por este carro"}):null,l("div",{class:"deal-card__row"},[z,l("span",{class:"badge badge--gold",text:`${Math.round(bi(N.stageId)*100)}%`})]),l("div",{class:"deal-card__foot u-caption u-faint"},[l("span",{class:"u-grow u-truncate",text:N.ownerName?"👤 "+N.ownerName:"Sin asesor"}),l("span",{text:vr(N.lastActivityAt)})]),l("div",{class:"deal-card__actions"},t?[C("stage","↔","Mover etapa"),C("won","✓","Marcar ganado"),C("lost","✕","Marcar perdido"),C("open","⤢","Abrir 360")]:[C("open","⤢","Abrir 360")])]);return Z.addEventListener("dragstart",G=>{e.dragId=N.id,Z.classList.add("is-dragging");try{G.dataTransfer.setData("text/plain",N.id),G.dataTransfer.effectAllowed="move"}catch{}}),Z.addEventListener("dragend",()=>{e.dragId=null,Z.classList.remove("is-dragging")}),Z.addEventListener("click",G=>{const he=G.target.closest("[data-action]");if(he)return M(he.dataset.action,N,he)}),Z}function C(N,H,z){return l("button",{class:"icon-btn icon-btn--xs",type:"button","data-action":N,title:z,"aria-label":z,draggable:"false"},[H])}function M(N,H,z){if(N==="open")return j.set({detailLeadId:H.leadId});if(N==="amount")return E(H,z);if(N==="stage")return qt(z,yi.map(Z=>({value:Z.id,label:Z.label,hint:Math.round(Z.prob*100)+"%",active:Z.id===H.stageId})),Z=>d(H,Z.value),{title:"Mover a etapa"});if(N==="won")return I(H);if(N==="lost")return qt(z,rm.map(Z=>({value:Z.id,label:Z.label})),Z=>S(H,Z.value),{title:"Motivo de pérdida"})}function E(N,H){const z=l("input",{class:"deal-card__amount-input",type:"text",inputmode:"numeric",value:N.amount||"","aria-label":"Monto en COP"});H.replaceWith(z),z.focus(),z.select();const Z=()=>{const G=parseInt(String(z.value).replace(/\D/g,""),10)||0;_(N,G)};z.addEventListener("keydown",G=>{G.key==="Enter"?(G.preventDefault(),Z()):G.key==="Escape"&&A()}),z.addEventListener("blur",Z)}function v(N,H){N.addEventListener("dragover",z=>{z.preventDefault(),N.classList.add("is-over"),z.dataTransfer&&(z.dataTransfer.dropEffect="move")}),N.addEventListener("dragleave",()=>N.classList.remove("is-over")),N.addEventListener("drop",z=>{z.preventDefault(),N.classList.remove("is-over");const Z=e.dragId||z.dataTransfer&&z.dataTransfer.getData("text/plain"),G=e.deals.find(he=>he.id===Z);G&&d(G,H)})}function b(){if(j.get().mock){e.won=ou().filter(N=>N.status==="won"),e.wonLoading=!1,e.wonError=null;return}e.wonSub||(e.wonSub=LP({pageSize:100,onData:N=>{e.won=N.slice().sort((H,z)=>String(z.wonAt||z.lastActivityAt||"").localeCompare(String(H.wonAt||H.lastActivityAt||""))),e.wonLoading=!1,e.wonError=null,A()},onError:N=>{if(e.wonSub)try{e.wonSub()}catch{}e.wonSub=null,e.wonLoading=!1,e.wonError=N&&N.code==="permission-denied"?"Sin permiso para ver los ganados.":"Revisa tu conexión.",e.view==="postventa"&&A()}}))}function R(N,H){const z=e.won.findIndex(Z=>Z.id===N);z!==-1&&(e.won[z]={...e.won[z],...H},A())}async function w(N,H,z){const Z=N.postventa||{};if(R(N.id,{postventa:{...Z,[H]:z}}),!j.get().mock)try{await MP(N.id,H,z)}catch{R(N.id,{postventa:Z}),$("No se pudo guardar el checklist","error")}}async function x(N,H){H.disabled=!0,H.textContent="Creando…";try{const z=await UP(N.id);R(N.id,{retomaVehicleId:z.vehicleId}),$("Borrador #"+z.vehicleId+" creado en inventario","ok")}catch(z){H.disabled=!1,H.textContent="Crear borrador en inventario",$(z&&z.message?z.message:"No se pudo crear el borrador","error")}}function T(N){const H=l("input",{class:"input",type:"text",placeholder:"Marca *"}),z=l("input",{class:"input",type:"text",placeholder:"Modelo"}),Z=l("input",{class:"input",type:"number",min:"1980",max:"2035",placeholder:"Año"}),G=l("input",{class:"input",type:"text",placeholder:"Placa",maxlength:"8"}),he=l("input",{class:"input",type:"number",min:"0",step:"500000",placeholder:"Valor estimado (COP)"}),F=l("div",{class:"login__error",role:"alert",hidden:!0}),q=l("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),Y=l("button",{class:"btn btn--gold",type:"submit"},["Guardar retoma"]),ce=l("form",{class:"nl-form"},[H,z,Z,G,he,F,l("div",{class:"nl-actions"},[q,Y])]),se=l("div",{class:"modal-overlay"},[l("div",{class:"modal"},[l("div",{class:"modal__head"},[l("h2",{class:"modal__title",text:"🚙 Vehículo recibido (retoma)"})]),ce])]);document.body.appendChild(se),r.add(se);const re=()=>{r.delete(se),se.remove()};q.addEventListener("click",re),se.addEventListener("mousedown",Re=>{Re.target===se&&re()}),ce.addEventListener("submit",async Re=>{if(Re.preventDefault(),!H.value.trim()){F.textContent="La marca es obligatoria.",F.hidden=!1;return}const Ne={marca:H.value.trim(),modelo:z.value.trim(),year:Number(Z.value)||null,placa:G.value.trim().toUpperCase(),valorEstimado:Math.round(Number(he.value)||0)};re();const qe=N.recibeVehiculo||null;if(R(N.id,{recibeVehiculo:Ne}),!j.get().mock)try{await FP(N.id,Ne)}catch{R(N.id,{recibeVehiculo:qe}),$("No se pudo guardar","error")}})}function le(){if(fe(i),i.classList.add("pipeline__board--list"),e.wonError){const N=l("button",{class:"btn btn--soft btn--sm",type:"button"},["↻ Reintentar"]);N.addEventListener("click",()=>{e.wonError=null,e.wonLoading=!0,b(),A()}),i.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"⚠️"}),l("div",{class:"state__title",text:"No se pudieron cargar los ganados"}),l("div",{class:"state__msg",text:e.wonError}),N]));return}if(e.wonLoading){i.append(l("div",{class:"state"},[l("div",{class:"state__msg",text:"Cargando ganados…"})]));return}if(!e.won.length){i.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"🏁"}),l("div",{class:"state__title",text:"Sin ventas ganadas aún"}),l("div",{class:"state__msg",text:"Cuando marques un negocio como ganado, su checklist de entrega vivirá aquí."})]));return}e.won.forEach(N=>i.append(pe(N)))}function pe(N){const H=yy(N),z=N.commissionSnapshot&&N.commissionSnapshot.amount||N.amount||0,Z=(N.wonAt||N.lastActivityAt||"").slice(0,10),G=vy.map(q=>{const Y=!!(N.postventa&&N.postventa[q.id]),ce=l("input",{type:"checkbox",class:"checkbox"});return ce.checked=Y,t||(ce.disabled=!0),ce.addEventListener("change",()=>w(N,q.id,ce.checked)),l("label",{class:"pv-item"+(Y?" is-done":"")},[ce,l("span",{text:q.label})])}),he=N.recibeVehiculo;let F;if(he&&(he.marca||he.placa)){const q=[l("span",{class:"u-caption u-muted",text:"🚙 Retoma: "+[he.marca,he.modelo,he.placa].filter(Boolean).join(" ")+(he.valorEstimado?" · "+sr(he.valorEstimado):"")})];if(N.retomaVehicleId)q.push(l("span",{class:"badge badge--gold",text:"Borrador #"+N.retomaVehicleId+" ✓"}));else if(t){const Y=l("button",{class:"btn btn--soft btn--sm",type:"button"},["Crear borrador en inventario"]);Y.addEventListener("click",()=>x(N,Y)),q.push(Y)}F=l("div",{class:"pv-retoma"},q)}else if(t){const q=l("button",{class:"btn btn--ghost btn--sm",type:"button"},["＋ Retoma"]);q.addEventListener("click",()=>T(N)),F=l("div",{class:"pv-retoma"},[q])}return l("article",{class:"deal-card deal-card--pv","data-id":N.id},[l("div",{class:"deal-card__top"},[l("span",{class:"avatar avatar--sm","aria-hidden":"true",text:ks(N.contactName)}),l("span",{class:"deal-card__name u-grow u-truncate",text:N.name}),l("span",{class:"badge "+(H?"badge--gold":""),title:H?"Checklist completo: entra a liquidación de comisiones (F42)":"La comisión se liquida cuando el checklist esté completo",text:H?"✓ Liquidable":"⏳ Pendiente"})]),l("div",{class:"u-caption u-muted"},[l("span",{text:(N.vehicleName?"🚗 "+N.vehicleName+" · ":"")+sr(z)}),l("span",{class:"u-faint",text:(N.tipoPago?" · "+N.tipoPago:"")+(Z?" · ganado "+Z:"")})]),l("div",{class:"pv-checklist"},G),F||null,l("div",{class:"deal-card__foot u-caption u-faint"},[l("span",{class:"u-grow u-truncate",text:N.ownerName?"👤 "+N.ownerName:"Sin asesor"})])])}function X(N,H,z){fe(i),i.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:N}),l("div",{class:"state__title",text:H}),l("div",{class:"state__msg",text:z})]))}function ye(){fe(s),fe(i),yi.slice(0,5).forEach(()=>{i.append(l("div",{class:"pcol"},[l("div",{class:"pcol__head"},[l("span",{class:"skeleton",style:{width:"60%",height:"14px"}})]),l("div",{class:"pcol__drop"},[1,2].map(()=>l("div",{class:"deal-card",style:{pointerEvents:"none"}},[l("span",{class:"skeleton",style:{width:"100%",height:"52px"}})])))]))})}function $e(){if(j.get().mock){e.deals=ou().filter(N=>N.status==="open"),e.loading=!1,b(),A();return}e.sub=PP({pageSize:150,onData:N=>{e.deals=N,e.loading=!1,e.error=null,A()},onError:N=>{e.loading=!1,e.error=N&&N.code==="permission-denied"?"Sin permiso para ver el pipeline.":"Revisa tu conexión.",A()}}),b()}return A(),$e(),function(){if(e.sub&&e.sub(),e.sub=null,e.wonSub&&e.wonSub(),e.wonSub=null,r.forEach(H=>{try{H.remove()}catch{}}),r.clear(),f){try{f.remove()}catch{}f=null}}}function zP(n){return{nuevo:"var(--temp-cold)",contactado:"var(--info)",cita_agendada:"#8A7CFF",visito:"var(--gold-500)",test_drive:"var(--gold-600)",negociacion:"var(--warning)",financiacion:"var(--success)"}[n]||"var(--ink-400)"}const GP=["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"],im=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];function zi(n){const e=n.getFullYear(),t=String(n.getMonth()+1).padStart(2,"0"),r=String(n.getDate()).padStart(2,"0");return`${e}-${t}-${r}`}function Ay(n,e){const r=(new Date(n,e,1).getDay()+6)%7,s=new Date(n,e+1,0).getDate(),i=[];for(let c=0;c<r;c++)i.push({date:new Date(n,e,1-r+c),inMonth:!1});for(let c=1;c<=s;c++)i.push({date:new Date(n,e,c),inMonth:!0});for(;i.length%7!==0;){const c=i[i.length-1].date;i.push({date:new Date(c.getFullYear(),c.getMonth(),c.getDate()+1),inMonth:!1})}const o=[];for(let c=0;c<i.length;c+=7)o.push(i.slice(c,c+7));return o}function HP(n,e){const t=Ay(n,e),r=t[0][0].date,i=t[t.length-1][6].date,o=new Date(i.getFullYear(),i.getMonth(),i.getDate()+1);return{startISO:r.toISOString(),endISO:o.toISOString()}}function KP(n){const e={};for(const t of n){if(!t.dueAt)continue;const r=zi(new Date(t.dueAt));(e[r]||(e[r]=[])).push(t)}for(const t of Object.keys(e))e[t].sort((r,s)=>new Date(r.dueAt)-new Date(s.dueAt));return e}function om(n){const e=new Date(n);return Number.isNaN(e.getTime())?"":e.toLocaleTimeString("es-CO",{hour:"2-digit",minute:"2-digit"})}function WP(n,e){return n.getFullYear()===e.getFullYear()&&n.getMonth()===e.getMonth()&&n.getDate()===e.getDate()}const QP=n=>({id:n.id,...n.data()});function YP(n,e,t,r){const s=Je(Ee(te,"activities"),Bn("dueAt",">=",n),Bn("dueAt","<",e),mt("dueAt","asc"));return Bt(s,i=>t(i.docs.map(QP)),i=>r&&r(i))}async function ir(n,e,t){return(await Mr(Fr,"crmCitaAction")({action:n,solicitudId:e||null,payload:t||{}})).data}async function JP(n){const e=await zn(be(te,"solicitudes",n));return e.exists()?{id:e.id,...e.data()}:null}async function Sy(){const n=await zn(be(te,"config","availability"));return n.exists()?n.data():{}}async function Ry(){const n=await zn(be(te,"config","bookedSlots"));return n.exists()?n.data():{}}const XP=["super_admin","admin","editor","asesor","moderator"];let $o=null;async function ky(){if($o)return $o;const n=j.get(),e=new Map;try{(await Mt(Je(Ee(te,"usuarios"),kt(50)))).docs.forEach(r=>{const s=r.data();s.bloqueado!==!0&&(!XP.includes(s.rol)&&!s.roleId||e.set(r.id,{uid:r.id,nombre:s.nombre||s.email||r.id,rol:s.rol||s.roleId||""}))})}catch{try{const r=await zn(be(te,"config","crmIntake"));(r.exists()&&Array.isArray(r.data().rotation)?r.data().rotation:[]).forEach(i=>{const o=typeof i=="string"?i:i.uid;o&&e.set(o,{uid:o,nombre:typeof i=="object"&&i.nombre||o,rol:""})})}catch{}}return n.user&&!e.has(n.user.uid)&&e.set(n.user.uid,{uid:n.user.uid,nombre:n.profile&&n.profile.nombre||n.user.email||"Yo",rol:n.profile&&n.profile.rol||""}),$o=Array.from(e.values()),$o}const ZP={pendiente:"🕐 Pendiente (sin confirmar)",confirmada:"✅ Confirmada",reprogramada:"🔁 Reprogramada (re-confirmar)",completada:"🏁 Completada",cancelada:"✖ Cancelada",no_show:"🚫 No asistió",caducada:"⏳ Caducada (no confirmó)"},ex=["pendiente","confirmada","reprogramada"],tx="";function nx(){const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`}function Cy(n,e,t){const r=l("div",{class:"modal"},[l("div",{class:"modal__head"},[l("h2",{class:"modal__title",text:n}),e?l("span",{class:"u-caption u-faint",text:e}):null]),...t]),s=l("div",{class:"modal-overlay"},[r]);document.body.appendChild(s);const i=()=>{s.remove(),window.removeEventListener("keydown",o)},o=c=>{c.key==="Escape"&&i()};return window.addEventListener("keydown",o),s.addEventListener("mousedown",c=>{c.target===s&&i()}),{overlay:s,card:r,close:i}}function er(n,e){return e?l("div",{class:"cita-row"},[l("span",{class:"cita-row__k u-caption u-muted",text:n}),l("span",{class:"cita-row__v",text:String(e)})]):null}function rx(n,e,t){if(!t)return[];if(Array.isArray(n.blockedDates)&&n.blockedDates.includes(t))return[];const r=new Date(t+"T12:00:00Z").getUTCDay();if(!(Array.isArray(n.days)?n.days:[1,2,3,4,5,6]).includes(r))return[];const s=Array.isArray(e[t])?e[t]:[],i=n.blockedHours&&n.blockedHours[t]||[],o=[],c=n.interval||60;for(let u=(n.startHour??9)*60;u<(n.endHour??17)*60;u+=c){const d=`${String(Math.floor(u/60)).padStart(2,"0")}:${String(u%60).padStart(2,"0")}`;!s.includes(d)&&!i.includes(d)&&o.push(d)}return o}function Py(n,e,{fecha:t,hora:r}={}){const s=l("input",{class:"input",type:"date",min:nx(),value:t||""}),i=l("select",{class:"select"},[l("option",{value:"",text:"— hora —"})]);function o(){const c=rx(n,e,s.value);i.replaceChildren(l("option",{value:"",text:c.length?"— hora —":"Sin horarios ese día"}),...c.map(u=>l("option",{value:u,text:u}))),r&&c.includes(r)&&(i.value=r)}return s.addEventListener("change",o),t&&o(),{dateIn:s,hourSel:i,value:()=>({fecha:s.value,hora:i.value})}}async function xy(n){const e=l("select",{class:"select"},[l("option",{value:"",text:"Cargando…"})]),t=await ky();e.replaceChildren(l("option",{value:"",text:"— asesor —"}),...t.map(s=>l("option",{value:s.uid,text:s.nombre})));const r=j.get().user;return e.value=n&&t.some(s=>s.uid===n)?n:r&&t.some(s=>s.uid===r.uid)?r.uid:"",e._advisors=t,e}async function Ny(n){const e=l("select",{class:"select"},[l("option",{value:tx,text:"Sin vehículo asignado"})]);try{const t=await Iy();e.append(...t.map(r=>l("option",{value:r.id,text:r.label}))),n&&(e.value=n),e._vehicles=t}catch{e._vehicles=[]}return e}function sx(n,e){const t=String(n.whatsapp||n.telefono||"").replace(/\D/g,"");if(!t)return null;const r=t.length===10&&t.startsWith("3")?"57"+t:t.startsWith("57")?t:String(n.prefijoPais||"57").replace(/\D/g,"")+t,s=`Hola ${n.nombre||""}! Te escribo de ALTORRA CARS por tu cita del ${n.fecha||""} a las ${n.hora||""}`+(n.vehiculo?` para ver el ${n.vehiculo}`:"")+`. Confírmala aquí 👉 ${e}`;return`https://wa.me/${r}?text=${encodeURIComponent(s)}`}async function ix(n,{onLead:e}={}){const t=n.sourceSolicitudId;if(!t)return;if(j.get().mock){$("En demo las citas web no tienen acciones.","info");return}let r;try{r=await JP(t)}catch{r=null}if(!r){$("No se pudo cargar la cita.","error");return}const s=Be("crm.edit"),i=ex.includes(r.estado),o=l("div",{class:"nl-form"}),c=l("div",{class:"login__error",role:"alert",hidden:!0}),u=_=>{c.textContent=_,c.hidden=!1},{close:d}=Cy("Cita · "+(r.nombre||"Cliente"),ZP[r.estado]||r.estado,[o]);function f(){return l("div",{class:"cita-info"},[er("Cuándo",(r.fecha||"")+(r.hora?" · "+r.hora:"")),er("Tipo",r.tipo),er("Vehículo",r.vehiculo),er("Teléfono",(r.prefijoPais||"")+" "+(r.whatsapp||r.telefono||"")),er("Asesor",r.assignedToName||r.assignedTo),r.confirmedAt?er("Confirmó",(r.confirmedVia||"")+" · "+String(r.confirmedAt).slice(0,16).replace("T"," ")):null,r._tupleConflict?l("div",{class:"cita-conflict",text:"⚠️ El cliente confirmó pero el horario CHOCA con otra cita del asesor — reprograma una de las dos."}):null,r._requiereReagendar?l("div",{class:"cita-conflict",text:"🚗 El carro de esta cita ya no está disponible — ofrece otro o reagenda."}):null,er("Notas",r.comentarios||r.mensaje)])}async function p(_,I){c.hidden=!0;try{await I(),$(_,"ok"),d(),e&&r._leadId&&e(r._leadId)}catch(S){u(S&&S.message||"No se pudo completar la acción.")}}async function g(){if(o.replaceChildren(f(),c),!s||!i){if(r._leadId){const k=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"Ver cliente (360)"});k.addEventListener("click",()=>{d(),j.set({detailLeadId:r._leadId})}),o.append(k)}return}const _=l("div",{class:"cita-actions"}),I=l("button",{class:"btn btn--gold btn--sm",type:"button",text:"📲 Pedir confirmación por WhatsApp"});I.addEventListener("click",async()=>{I.disabled=!0;try{const k=await ir("getConfirmLink",r.id),P=sx(r,k.url);if(!P){u("La cita no tiene teléfono."),I.disabled=!1;return}window.open(P,"_blank","noopener"),$("Mensaje listo en WhatsApp — el cliente confirma tocando el link.","ok"),I.disabled=!1}catch(k){u(k&&k.message||"No se pudo generar el link."),I.disabled=!1}});const S=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"✓ Confirmar (asignar asesor)"});S.addEventListener("click",async()=>{o.replaceChildren(f(),c,l("p",{class:"u-caption u-muted",text:"Confirmar reserva el bloque del asesor (y del carro si aplica)."}));const k=await xy(r.assignedTo),P=await Ny(r.vehicleAssignedId||r.vehiculoId),L=l("select",{class:"select"},[l("option",{value:"manual",text:"El cliente confirmó (llamada/persona)"}),l("option",{value:"whatsapp",text:"El cliente confirmó por WhatsApp"}),l("option",{value:"email",text:"El cliente confirmó por email"})]),C=l("button",{class:"btn btn--gold btn--sm",type:"button",text:"✓ Confirmar cita"}),M=l("button",{class:"btn btn--ghost btn--sm",type:"button",text:"‹ Volver"});M.addEventListener("click",g),C.addEventListener("click",()=>{if(!k.value){u("Elige el asesor.");return}const E=(k._advisors||[]).find(b=>b.uid===k.value)?.nombre||null,v=(P._vehicles||[]).find(b=>b.id===P.value);p("✅ Cita confirmada",()=>ir("confirm",r.id,{asesorId:k.value,asesorName:E,canal:L.value,vehicleId:P.value||null,vehicleName:v?v.label:null}))}),o.append(l("label",{class:"field"},[l("span",{class:"field__label",text:"Asesor *"}),k]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Vehículo"}),P]),l("label",{class:"field"},[l("span",{class:"field__label",text:"¿Cómo confirmó?"}),L]),l("div",{class:"nl-actions"},[M,C]))});const A=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"🔁 Reprogramar"});A.addEventListener("click",async()=>{o.replaceChildren(f(),c,l("p",{class:"u-caption u-muted",text:"Al reprogramar, el link viejo de confirmación deja de servir y el cliente debe re-confirmar."}));let k,P;try{[k,P]=await Promise.all([Sy(),Ry()])}catch{u("No se pudo cargar la disponibilidad — revisa tu conexión y reintenta.");return}const L=Py(k,P,{}),C=l("button",{class:"btn btn--gold btn--sm",type:"button",text:"🔁 Mover cita"}),M=l("button",{class:"btn btn--ghost btn--sm",type:"button",text:"‹ Volver"});M.addEventListener("click",g),C.addEventListener("click",()=>{const{fecha:E,hora:v}=L.value();if(!E||!v){u("Elige fecha y hora.");return}p("🔁 Cita reprogramada — pídele re-confirmar por WhatsApp",()=>ir("reschedule",r.id,{fecha:E,hora:v}))}),o.append(l("div",{class:"cfg-row"},[L.dateIn,L.hourSel]),l("div",{class:"nl-actions"},[M,C]))});const V=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"✖ Cancelar cita"});if(V.addEventListener("click",()=>{o.replaceChildren(f(),c);const k=l("input",{class:"input",type:"text",placeholder:"Motivo (le llega al cliente por email)"}),P=l("button",{class:"btn btn--gold btn--sm",type:"button",text:"Confirmar cancelación"}),L=l("button",{class:"btn btn--ghost btn--sm",type:"button",text:"‹ Volver"});L.addEventListener("click",g),P.addEventListener("click",()=>p("✖ Cita cancelada (cupo liberado)",()=>ir("cancel",r.id,{motivo:k.value.trim()}))),o.append(k,l("div",{class:"nl-actions"},[L,P]))}),_.append(I,S,A,V),r.estado!=="pendiente"){const k=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"🏁 Completada"});k.addEventListener("click",()=>p("🏁 Cita completada",()=>ir("complete",r.id)));const P=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"🚫 No asistió"});P.addEventListener("click",()=>p("🚫 No-show registrado — mañana 9am te recuerda llamarlo",()=>ir("no_show",r.id))),_.append(k,P)}if(r._leadId){const k=l("button",{class:"btn btn--ghost btn--sm",type:"button",text:"👤 Ver cliente (360)"});k.addEventListener("click",()=>{d(),j.set({detailLeadId:r._leadId})}),_.append(k)}o.append(_)}await g()}async function ox(n,{onDone:e}={}){if(j.get().mock){const A=new Date(Date.now()+864e5).toISOString();gP({type:"cita",subject:"Cita con "+(n.fullName||""),dueAt:A,relatedTo:{type:"lead",id:n.id,name:n.fullName},status:"open"}),$("📅 Cita agendada (demo)","ok");return}const t=l("div",{class:"login__error",role:"alert",hidden:!0}),r=A=>{t.textContent=A,t.hidden=!1},s=l("div",{class:"nl-form"},[l("p",{class:"u-caption u-muted",text:"La cita manual nace CONFIRMADA y reserva el bloque del asesor (y del carro). Necesitas señal."})]),{close:i}=Cy("📅 Agendar cita",n.fullName||"Cliente",[s]);let o,c,u,d;try{[o,c,u,d]=await Promise.all([Sy(),Ry(),xy(n.ownerId),Ny(n.vehicleOfInterestId)])}catch{s.append(t),r("No se pudo cargar la disponibilidad — revisa tu conexión y vuelve a abrir el diálogo.");return}const f=Py(o,c,{}),p=l("select",{class:"select"},[l("option",{value:"visita",text:"Visita al concesionario"}),l("option",{value:"test_drive",text:"Test drive"}),l("option",{value:"llamada",text:"Llamada agendada"})]),g=l("select",{class:"select"},[l("option",{value:"30",text:"30 min"}),l("option",{value:"60",text:"1 hora",selected:""}),l("option",{value:"90",text:"1h 30"})]),_=l("input",{class:"input",type:"text",placeholder:"Nota (opcional)"}),I=l("button",{class:"btn btn--gold btn--sm",type:"button",text:"📅 Crear cita confirmada"}),S=l("button",{class:"btn btn--ghost btn--sm",type:"button",text:"Cancelar"});S.addEventListener("click",i),I.addEventListener("click",async()=>{t.hidden=!0;const{fecha:A,hora:V}=f.value();if(!A||!V)return r("Elige fecha y hora.");if(!u.value)return r("Elige el asesor que atiende.");I.disabled=!0,I.textContent="Creando…";const k=(u._advisors||[]).find(L=>L.uid===u.value)?.nombre||null,P=(d._vehicles||[]).find(L=>L.id===d.value);try{await ir("create",null,{leadId:n.id||null,contactId:n.contactId||null,nombre:n.fullName||"Cliente",telefono:n.phone||null,email:n.email||null,fecha:A,hora:V,duracionMin:parseInt(g.value,10)||60,asesorId:u.value,asesorName:k,vehicleId:d.value||null,vehicleName:P?P.label:null,tipo:p.value,nota:_.value.trim()}),$("📅 Cita creada y confirmada — ya está en la Agenda","ok"),i(),e&&e()}catch(L){I.disabled=!1,I.textContent="📅 Crear cita confirmada",r(L&&L.message||"No se pudo crear la cita.")}}),s.append(l("div",{class:"cfg-row"},[f.dateIn,f.hourSel]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Asesor *"}),u]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Vehículo"}),d]),l("div",{class:"cfg-row"},[p,g]),_,t,l("div",{class:"nl-actions"},[S,I]))}function ax(n){const e=new Date,t={year:e.getFullYear(),month:e.getMonth(),events:[],loading:!0,error:null,sub:null},r=l("div",{class:"agenda__head"}),s=l("p",{class:"u-muted u-caption",style:{margin:"0",padding:"8px 10px",border:"1px dashed var(--line, #444)",borderRadius:"8px"}},["✅ Toca una cita para confirmarla (asignando asesor), pedir confirmación por WhatsApp, reprogramarla o cancelarla. ","Si el cliente no confirma, caduca sola 3h antes y libera el cupo. El ",l("a",{href:"/admin.html#solicitudes",target:"_blank",rel:"noopener",text:"calendario clásico"})," sigue de respaldo hasta el cambio definitivo."]),i=l("div",{class:"agenda__weekdays"},GP.map(A=>l("span",{class:"agenda__wd",text:A}))),o=l("div",{class:"agenda__grid"}),c=l("section",{class:"agenda"},[r,s,i,o]);fe(n),n.append(c);function u(A){let V=t.month+A,k=t.year;V<0?(V=11,k--):V>11&&(V=0,k++),t.year=k,t.month=V,S()}function d(){t.year=e.getFullYear(),t.month=e.getMonth(),S()}function f(){fe(r);const A=l("div",{class:"u-row u-row--tight"},[p("‹","Mes anterior",()=>u(-1)),l("button",{class:"btn btn--soft btn--sm",type:"button",onclick:d},["Hoy"]),p("›","Mes siguiente",()=>u(1))]);r.append(l("h2",{class:"agenda__title",text:`${im[t.month]} ${t.year}`}),A)}function p(A,V,k){const P=l("button",{class:"icon-btn",type:"button","aria-label":V},[A]);return P.addEventListener("click",k),P}function g(){if(f(),fe(o),t.error){o.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"⚠️"}),l("div",{class:"state__title",text:"No se pudo cargar la agenda"}),l("div",{class:"state__msg",text:t.error})]));return}const A=KP(t.events);Ay(t.year,t.month).forEach(k=>{k.forEach(P=>{const L=zi(P.date),C=A[L]||[],M=WP(P.date,e),E=l("div",{class:"agenda__day"+(P.inMonth?"":" is-out")+(M?" is-today":""),role:"gridcell"},[l("div",{class:"agenda__daynum",text:String(P.date.getDate())})]),v=l("div",{class:"agenda__events"});if(C.slice(0,3).forEach(b=>v.append(_(b))),C.length>3){const b=l("button",{class:"agenda__more",type:"button"},[`+${C.length-3} más`]);b.addEventListener("click",()=>qt(b,C.map(R=>({value:R,label:`${om(R.dueAt)} · ${R.relatedTo?.name||R.subject||"Cita"}`})),R=>I(R.value),{title:`${P.date.getDate()} ${im[t.month]}`})),v.append(b)}E.append(v),o.append(E)})})}function _(A){const V=A.type==="cita"?A.estadoCita||"pendiente":null,k="agenda__chip"+(V?" agenda__chip--"+V:"")+(A.status==="closed"?" is-closed":""),P=l("button",{class:k,type:"button",title:A.subject||"Cita"},[l("span",{class:"agenda__chip-time",text:om(A.dueAt)}),l("span",{class:"u-truncate",text:A.relatedTo?.name||A.subject||"Cita"})]);return P.addEventListener("click",()=>I(A)),P}function I(A){if(A.type==="cita"&&A.sourceSolicitudId){ix(A,{onLead:k=>j.set({detailLeadId:k})});return}const V=A.relatedTo&&A.relatedTo.id;V&&j.set({detailLeadId:V})}function S(){if(g(),t.sub&&(t.sub(),t.sub=null),j.get().mock){t.events=mP(),t.loading=!1,g();return}const{startISO:A,endISO:V}=HP(t.year,t.month);t.sub=YP(A,V,k=>{t.events=k,t.loading=!1,t.error=null,g()},k=>{t.loading=!1,t.error=k&&k.code==="permission-denied"?"Sin permiso.":"Revisa tu conexión.",g()})}return S(),function(){t.sub&&t.sub(),t.sub=null}}const cx=n=>{const e=new Date(n).getTime();return Number.isNaN(e)?0:e},Pc=n=>n.status==="won",Dy=n=>n.status==="lost",Fd=n=>n.status==="open",Ud=n=>n.status==="convertido";function am(n,e){return e?n.filter(t=>cx(t.createdAt)>=e):n.slice()}function lx(n,e){const t=n.length,r=n.filter(Ud).length,s=e.filter(Pc),i=e.filter(Dy),o=s.reduce((u,d)=>u+(Number(d.amount)||0),0),c=s.length+i.length;return{leadsNew:t,convertidos:r,convRate:t?r/t:0,won:s.length,lost:i.length,winRate:c?s.length/c:0,wonValue:o}}function ux(n,e){const t=e.filter(Fd),r=n.filter(i=>!Ps(i.status)),s=r.filter(i=>{const o=ly(i);return!o.closed&&(o.state==="warn"||o.state==="late")}).length;return{leadsActive:r.length,dealsOpen:t.length,pipelineWeighted:_y(t),slaRisk:s}}function dx(n,e){const t=new Set(e.filter(Pc).map(d=>d.id)),r=n.filter(d=>d.status==="contactado"||d.status==="calificado"||d.status==="convertido"),s=n.filter(d=>d.status==="calificado"||d.status==="convertido"),i=n.filter(Ud),o=i.filter(d=>d.convertedTo&&t.has(d.convertedTo.dealId)),c=n.length||1,u=[{key:"leads",label:"Leads",count:n.length},{key:"contactados",label:"Contactados",count:r.length},{key:"calificados",label:"Calificados",count:s.length},{key:"convertidos",label:"Convertidos",count:i.length},{key:"ganados",label:"Ganados",count:o.length}];return u.map((d,f)=>({...d,pctTop:d.count/c,convFromPrev:f===0?1:u[f-1].count?d.count/u[f-1].count:0}))}function hx(n,e){const t={},r=s=>t[s.key]||(t[s.key]={key:s.key,label:s.label,icon:s.icon,leads:0,convertidos:0,deals:0,won:0,revenue:0});return n.forEach(s=>{const i=r(qi(s));i.leads++,Ud(s)&&i.convertidos++}),e.forEach(s=>{const i=r(qi(s));i.deals++,Pc(s)&&(i.won++,i.revenue+=Number(s.amount)||0)}),Object.values(t).map(s=>({...s,convRate:s.leads?s.convertidos/s.leads:0})).sort((s,i)=>i.leads-s.leads||i.revenue-s.revenue)}function fx(n){const e=n.filter(Fd);return yi.map(t=>{const r=e.filter(s=>s.stageId===t.id);return{id:t.id,label:t.label,prob:t.prob,count:r.length,value:r.reduce((s,i)=>s+(Number(i.amount)||0),0),weighted:r.reduce((s,i)=>s+Md(i),0)}})}function px(n,e,t=[]){const r={},s=(i,o)=>r[i]||(r[i]={ownerId:i,ownerName:o,leads:0,deals:0,won:0,lost:0,pipelineWeighted:0});return t.forEach(i=>s(i.uid,i.nombre)),n.forEach(i=>{const o=i.ownerId||"_none";s(o,i.ownerName||(o==="_none"?"Sin asignar":o)).leads++}),e.forEach(i=>{const o=i.ownerId||"_none",c=s(o,i.ownerName||(o==="_none"?"Sin asignar":o));c.deals++,Pc(i)?c.won++:Dy(i)?c.lost++:Fd(i)&&(c.pipelineWeighted+=Md(i))}),Object.values(r).filter(i=>i.leads||i.deals).map(i=>({...i,winRate:i.won+i.lost?i.won/(i.won+i.lost):0})).sort((i,o)=>o.won-i.won||o.pipelineWeighted-i.pipelineWeighted||o.leads-i.leads)}function mx(n,e=30){const t=[],r={},s=new Date;for(let i=e-1;i>=0;i--){const o=new Date(s.getFullYear(),s.getMonth(),s.getDate()-i),c={key:zi(o),date:o,count:0};t.push(c),r[c.key]=c}return n.forEach(i=>{if(!i.createdAt)return;const o=r[zi(new Date(i.createdAt))];o&&o.count++}),t}function gx(n){const e=new Date(n);return Number.isNaN(e.getTime())?"":e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")}function _x(n=6){const e=[],t=new Date;for(let r=0;r<n;r++){const s=new Date(t.getFullYear(),t.getMonth()-r,1),i=s.getFullYear()+"-"+String(s.getMonth()+1).padStart(2,"0"),o=s.toLocaleDateString("es-CO",{month:"long",year:"numeric"});e.push({key:i,label:o.charAt(0).toUpperCase()+o.slice(1)})}return e}function vx(n,e,t=[]){const r=(n||[]).filter(i=>i.status==="won"&&gx(i.wonAt||i.lastActivityAt)===e),s={};return r.forEach(i=>{const o=i.commissionSnapshot||{},c=o.ownerId||i.ownerId||"_none",u=(t.find(g=>g.uid===c)||{}).nombre,d=s[c]||(s[c]={ownerId:c,ownerName:u||i.ownerName||(c==="_none"?"Sin asignar":c),vendidos:0,liquidables:0,pendientes:0,baseLiquidable:0,basePendiente:0,deals:[]}),f=Number(o.amount!=null?o.amount:i.amount)||0,p=yy(i);d.vendidos++,p?(d.liquidables++,d.baseLiquidable+=f):(d.pendientes++,d.basePendiente+=f),d.deals.push({id:i.id,name:i.name||"",base:f,liquidable:p,tipoPago:o.tipoPago||i.tipoPago||""})}),Object.values(s).sort((i,o)=>o.baseLiquidable-i.baseLiquidable||o.vendidos-i.vendidos)}const cm=[{value:0,label:"Hoy"},{value:7,label:"7 días"},{value:30,label:"30 días"},{value:90,label:"90 días"},{value:null,label:"Todo"}];function yx(n){if(n==null)return null;const e=new Date;return new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime()-n*864e5}const Vy=n=>({id:n.id,...n.data()});async function lm(n,e){return(await Mt(Je(Ee(te,n),mt("createdAt","desc"),kt(e)))).docs.map(Vy)}async function bx({pageSize:n=500}={}){if(j.get().mock){const i=ou();return{leads:$a(),deals:i,wons:i.filter(o=>o.status==="won"),capped:!1}}const[e,t,r]=await Promise.all([lm("leads",n),lm("deals",n),Mt(Je(Ee(te,"deals"),Bn("status","==","won"),mt("lastActivityAt","desc"),kt(300)))]);return{leads:e.filter(i=>!i.archived),deals:t,wons:r.docs.map(Vy),capped:e.length>=n||t.length>=n}}const wx="http://www.w3.org/2000/svg";function gl(n,e={},t=[]){const r=document.createElementNS(wx,n);for(const[s,i]of Object.entries(e))i==null||i===!1||r.setAttribute(s,String(i));for(const s of[].concat(t))s==null||s===!1||s===""||r.append(s.nodeType?s:document.createTextNode(String(s)));return r}function Ix(n,e={}){const t=e.max!=null?e.max:Math.max(1,...n.map(s=>Number(s.value)||0)),r=l("div",{class:"reportes__bars",role:"list"});return n.forEach(s=>{const i=s.pct!=null?s.pct:t?(Number(s.value)||0)/t:0,o=Math.max(0,Math.min(100,i*100));r.append(l("div",{class:"reportes__bar",role:"listitem"},[l("span",{class:"reportes__bar-label u-truncate",text:s.label}),l("span",{class:"reportes__bar-track","aria-hidden":"true"},[l("span",{class:"reportes__bar-fill",style:{width:o+"%",background:s.color||"var(--grad-gold)"}})]),l("span",{class:"reportes__bar-val u-mono",text:s.display!=null?s.display:String(s.value)})]))}),r}function Ex(n){const s=n.map(I=>Number(I.value)||0),i=Math.max(...s,0),o=Math.max(1,i),c=n.length,u=I=>c<=1?600/2:6+I*(600-2*6)/(c-1),d=I=>134-I/o*(140-2*6),f=n.map((I,S)=>`${u(S).toFixed(1)},${d(s[S]).toFixed(1)}`).join(" "),p=`6,134 ${f} ${594 .toFixed(1)},134`,g=s.reduce((I,S)=>I+S,0),_=(n[s.indexOf(i)]||{}).label||"";return gl("svg",{class:"reportes__spark",viewBox:"0 0 600 140",preserveAspectRatio:"none",role:"img","aria-label":`Tendencia: ${g} en total; pico de ${i}${_?" el "+_:""}.`},[gl("polygon",{points:p,fill:"var(--gold-300)",opacity:"0.30"}),gl("polyline",{points:f,fill:"none",stroke:"var(--gold-500)","stroke-width":"2","stroke-linejoin":"round","stroke-linecap":"round","vector-effect":"non-scaling-stroke"})])}const Ct=n=>Math.round((n||0)*100)+"%",bt=n=>sr(n)||"$0",_l=n=>`${n.getDate()}/${n.getMonth()+1}`;function Tx(n){const e=_x(6),t={leads:[],deals:[],wons:[],loading:!0,error:null,capped:!1,days:30,month:e[0].key};let r=!0;const s=l("div",{class:"reportes__chips",role:"group","aria-label":"Período"}),i=l("button",{class:"btn btn--soft btn--sm",type:"button"},["↻ Actualizar"]),o=l("button",{class:"btn btn--soft btn--sm",type:"button"},["⤓ CSV"]);i.addEventListener("click",R),o.addEventListener("click",b);const c=l("div",{class:"reportes__toolbar"},[s,l("div",{class:"u-row u-row--tight"},[i,o])]),u=l("div",{class:"reportes__body"}),d=l("section",{class:"reportes"},[c,u]);fe(n),n.append(d);function f(){fe(s),cm.forEach(w=>{const x=t.days===w.value,T=l("button",{class:"chip",type:"button","aria-pressed":x?"true":"false"},[w.label]);T.addEventListener("click",()=>{t.days=w.value,g()}),s.append(T)})}function p(){const w=yx(t.days),x=am(t.leads,w),T=am(t.deals,w);return{pLeads:x,pDeals:T,pk:lx(x,T),ck:ux(t.leads,t.deals),fn:dx(x,t.deals),src:hx(x,T),stg:fx(t.deals),own:px(x,T,j.get().mock?iu():j.get().team||[]),tr:mx(t.leads,30),com:vx(t.wons,t.month,j.get().mock?iu():j.get().team||[])}}function g(){if(f(),t.loading)return v();if(t.error)return E("⚠️","No se pudieron cargar los reportes",t.error);if(!t.leads.length&&!t.deals.length)return E("📊","Aún no hay datos para reportar","Cuando entren leads y oportunidades, aquí verás tus KPIs, el embudo y el rendimiento por fuente.");const w=p();fe(u),t.capped&&u.append(l("div",{class:"reportes__notice u-caption"},["ℹ️ Mostrando los registros más recientes (tope por carga). Los totales históricos completos llegarán con los reportes acumulados."])),u.append(_("Del período",[I("Leads nuevos",String(w.pk.leadsNew)),I("Tasa de conversión",Ct(w.pk.convRate),`${w.pk.convertidos} de ${w.pk.leadsNew}`),I("Win rate",Ct(w.pk.winRate),`${w.pk.won} ganadas · ${w.pk.lost} perdidas`),I("Valor ganado",bt(w.pk.wonValue),null,!0)]),_("Estado actual",[I("Leads activos",String(w.ck.leadsActive)),I("Oportunidades abiertas",String(w.ck.dealsOpen)),I("Pipeline ponderado",bt(w.ck.pipelineWeighted),null,!0),I("SLA en riesgo",String(w.ck.slaRisk),w.ck.slaRisk?"requieren atención":"al día")]),S(w.fn),A(w.src),V(w.stg),k(w.tr),P(w.own),L(w.com))}function _(w,x){return l("div",{class:"reportes__section"},[l("h2",{class:"reportes__sec-title",text:w}),l("div",{class:"reportes__kpis"},x)])}function I(w,x,T,le){return l("div",{class:"reportes__kpi"+(le?" reportes__kpi--hi":"")},[l("span",{class:"reportes__kpi-label u-caption u-faint",text:w}),l("strong",{class:"reportes__kpi-val",text:x}),T?l("span",{class:"reportes__kpi-sub u-caption u-faint",text:T}):null])}function S(w){const x=w.map((T,le)=>({label:T.label,value:T.count,pct:T.pctTop,display:le===0?String(T.count):`${T.count} · ${Ct(T.convFromPrev)}`,color:"var(--grad-gold)"}));return C("Embudo de ventas","De lead a venta — dónde se pierde el avance",Ix(x,{max:w[0]?w[0].count:1}))}function A(w){const x=["Canal","Leads","Conv.","Oport.","Ganados","Ingresos"],T=w.map(pe=>[`${pe.icon||""} ${pe.label}`.trim(),String(pe.leads),Ct(pe.convRate),String(pe.deals),String(pe.won),bt(pe.revenue)]),le=w.length?null:"Sin leads en el período.";return C("Rendimiento por canal","Atribución de fuente: de dónde vienen y cuánto rinden",M(x,T,le))}function V(w){const x=["Etapa","Prob.","Oport.","Valor","Ponderado"],T=w.map(X=>[X.label,Ct(X.prob),String(X.count),bt(X.value),bt(X.weighted)]),le=w.reduce((X,ye)=>({count:X.count+ye.count,value:X.value+ye.value,weighted:X.weighted+ye.weighted}),{count:0,value:0,weighted:0}),pe=["Total","",String(le.count),bt(le.value),bt(le.weighted)];return C("Forecast por etapa","Pipeline abierto actual (no depende del período)",M(x,T,null,pe))}function k(w){const x=w.reduce((X,ye)=>X+ye.count,0),T=w.map(X=>({label:_l(X.date),value:X.count})),le=w.length?`${_l(w[0].date)} – ${_l(w[w.length-1].date)}`:"",pe=l("div",{class:"reportes__chart"},[Ex(T),l("div",{class:"reportes__axis u-caption u-faint"},[l("span",{text:le}),l("span",{text:`${x} leads`})])]);return C("Tendencia de captación","Nuevos leads · últimos 30 días",pe)}function P(w){const x=["Asesor","Leads","Oport.","Ganados","Win rate","Pipeline pond."],T=w.map(pe=>[pe.ownerName,String(pe.leads),String(pe.deals),String(pe.won),Ct(pe.winRate),bt(pe.pipelineWeighted)]),le=w.length?null:"Sin actividad asignada en el período.";return C("Rendimiento del equipo","Por asesor, en el período seleccionado",M(x,T,le))}function L(w){const x=l("select",{class:"select","aria-label":"Mes de liquidación",style:{maxWidth:"220px"}},e.map(H=>{const z=l("option",{value:H.key},[H.label]);return H.key===t.month&&(z.selected=!0),z}));x.addEventListener("change",()=>{t.month=x.value,g()});const T=["Asesor","Vendidos","✓ Liquidables","Base liquidable","⏳ Pendientes","Base pendiente"],le=w.map(H=>[H.ownerName,String(H.vendidos),String(H.liquidables),bt(H.baseLiquidable),String(H.pendientes),bt(H.basePendiente)]),pe=w.reduce((H,z)=>({v:H.v+z.vendidos,l:H.l+z.liquidables,bl:H.bl+z.baseLiquidable,p:H.p+z.pendientes,bp:H.bp+z.basePendiente}),{v:0,l:0,bl:0,p:0,bp:0}),X=w.length?["Total",String(pe.v),String(pe.l),bt(pe.bl),String(pe.p),bt(pe.bp)]:null,ye=w.length?null:"Sin ventas ganadas en el mes seleccionado.",$e=w.flatMap(H=>H.deals.map(z=>[z.name||z.id,H.ownerName,bt(z.base),z.tipoPago||"—",z.liquidable?"✓ liquidable":"⏳ checklist pendiente"])),N=l("div",{},[l("div",{class:"u-row",style:{marginBottom:"10px"}},[x]),M(T,le,ye,X),$e.length?l("details",{style:{marginTop:"10px"}},[l("summary",{class:"u-caption u-muted",text:"Detalle por negocio ("+$e.length+")"}),M(["Negocio","Asesor","Base","Pago","Estado"],$e,null)]):null]);return C("Comisiones del mes",'"Si no está en el CRM, no entra a liquidación" — solo vendidos con checklist post-venta completo (F42)',N)}function C(w,x,T){return l("div",{class:"reportes__section"},[l("div",{class:"reportes__sec-head"},[l("h2",{class:"reportes__sec-title",text:w}),x?l("span",{class:"reportes__sec-cap u-caption u-faint",text:x}):null]),T])}function M(w,x,T,le){if(!x.length&&T)return l("div",{class:"reportes__empty u-caption u-faint",text:T});const pe=l("thead",{},[l("tr",{},w.map(($e,N)=>l("th",{class:N===0?"":"is-num",scope:"col",text:$e})))]),X=l("tbody",{},x.map($e=>l("tr",{},$e.map((N,H)=>l("td",{class:H===0?"":"is-num",text:N}))))),ye=[pe,X];return le&&ye.push(l("tfoot",{},[l("tr",{},le.map(($e,N)=>N===0?l("th",{scope:"row",text:$e}):l("td",{class:"is-num",text:$e})))])),l("div",{class:"reportes__tablewrap"},[l("table",{class:"reportes__table"},ye)])}function E(w,x,T){fe(u),u.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:w}),l("div",{class:"state__title",text:x}),l("div",{class:"state__msg",text:T})]))}function v(){fe(u);const w=l("div",{class:"reportes__kpis"},[1,2,3,4].map(()=>l("div",{class:"reportes__kpi"},[l("span",{class:"skeleton",style:{width:"100%",height:"46px"}})])));u.append(l("div",{class:"reportes__section"},[w])),u.append(l("div",{class:"reportes__section"},[l("span",{class:"skeleton",style:{width:"100%",height:"160px"}})]))}function b(){if(t.loading||t.error){$("Aún no hay datos para exportar","info");return}const w=p(),x=(cm.find(X=>X.value===t.days)||{}).label||"",T=[],le=X=>{T.push([]),T.push([X])};T.push(["Reporte Altorra CRM"]),T.push(["Período",x]),T.push(["Generado",new Date().toLocaleString("es-CO")]),le("KPIs del período"),T.push(["Métrica","Valor"]),T.push(["Leads nuevos",w.pk.leadsNew]),T.push(["Conversión",Ct(w.pk.convRate)]),T.push(["Win rate",Ct(w.pk.winRate)]),T.push(["Ganadas",w.pk.won]),T.push(["Perdidas",w.pk.lost]),T.push(["Valor ganado (COP)",w.pk.wonValue]),T.push(["Leads activos (ahora)",w.ck.leadsActive]),T.push(["Oportunidades abiertas (ahora)",w.ck.dealsOpen]),T.push(["Pipeline ponderado COP (ahora)",w.ck.pipelineWeighted]),T.push(["SLA en riesgo (ahora)",w.ck.slaRisk]),le("Embudo"),T.push(["Etapa","Cantidad","Conversión desde anterior"]),w.fn.forEach((X,ye)=>T.push([X.label,X.count,ye===0?"":Ct(X.convFromPrev)])),le("Rendimiento por canal"),T.push(["Canal","Leads","Conversión","Oportunidades","Ganados","Ingresos (COP)"]),w.src.forEach(X=>T.push([X.label,X.leads,Ct(X.convRate),X.deals,X.won,X.revenue])),le("Forecast por etapa (pipeline actual)"),T.push(["Etapa","Probabilidad","Oportunidades","Valor (COP)","Ponderado (COP)"]),w.stg.forEach(X=>T.push([X.label,Ct(X.prob),X.count,X.value,X.weighted])),le("Rendimiento del equipo"),T.push(["Asesor","Leads","Oportunidades","Ganados","Win rate","Pipeline ponderado (COP)"]),w.own.forEach(X=>T.push([X.ownerName,X.leads,X.deals,X.won,Ct(X.winRate),X.pipelineWeighted]));const pe=(e.find(X=>X.key===t.month)||{}).label||t.month;le("Comisiones del mes — "+pe+" (F42: solo checklist completo entra a liquidación)"),T.push(["Asesor","Vendidos","Liquidables","Base liquidable (COP)","Pendientes","Base pendiente (COP)"]),w.com.forEach(X=>T.push([X.ownerName,X.vendidos,X.liquidables,X.baseLiquidable,X.pendientes,X.basePendiente])),T.push([]),T.push(["Negocio","Asesor","Base (COP)","Pago","Estado"]),w.com.forEach(X=>X.deals.forEach(ye=>T.push([ye.name||ye.id,X.ownerName,ye.base,ye.tipoPago||"",ye.liquidable?"liquidable":"checklist pendiente"]))),Rx(`altorra-reportes-${zi(new Date)}.csv`,Sx(T)),$("Reporte exportado","ok")}async function R(){t.loading=!0,t.error=null,g();try{const w=await bx();if(!r)return;t.leads=w.leads,t.deals=w.deals,t.wons=w.wons||[],t.capped=!!w.capped,t.loading=!1}catch(w){if(!r)return;t.loading=!1,t.error=w&&w.code==="permission-denied"?"Sin permiso para ver los reportes.":"Revisa tu conexión e intenta de nuevo."}g()}return R(),function(){r=!1}}function Ax(n){let e=n==null?"":String(n);return/^[=+\-@\t\r]/.test(e)&&!/^-?\d+([.,]\d+)?$/.test(e)&&(e="'"+e),/[",\n\r;]/.test(e)?'"'+e.replace(/"/g,'""')+'"':e}function Sx(n){return"\uFEFF"+n.map(e=>e.map(Ax).join(",")).join(`\r
`)}function Rx(n,e){const t=new Blob([e],{type:"text/csv;charset=utf-8;"}),r=URL.createObjectURL(t),s=document.createElement("a");s.href=r,s.download=n,document.body.append(s),s.click(),s.remove(),setTimeout(()=>URL.revokeObjectURL(r),1e3)}function Oy(n,e){const t=String(n||"").trim();if(!t)return"";const r=t.replace(/[^\d+]/g,"").startsWith("+");let s=t.replace(/\D/g,"");if(!s)return"";const i=String(e||"").replace(/\D/g,"");return i&&!r&&!s.startsWith(i)?s=i+s:!i&&!r&&s.length===10&&s.startsWith("3")&&(s="57"+s),"+"+s}function um(n){return String(n||"").replace(/[^a-z0-9]/gi,"_").slice(0,480)}function kx({email:n,phone:e,prefijoPais:t}){const r=[],s=String(n||"").trim().toLowerCase();s&&r.push(um("email:"+s));const i=Oy(e,t);return i&&r.push(um("phone:"+i)),r}const ja=n=>({id:n.id,...n.data()});async function Cx({pageSize:n=500}={}){if(j.get().mock)return{contacts:uP(),leads:$a()};const[e,t]=await Promise.all([Mt(Je(Ee(te,"contacts"),mt("createdAt","desc"),kt(n))).then(r=>r.docs.map(ja)),Mt(Je(Ee(te,"leads"),mt("createdAt","desc"),kt(n))).then(r=>r.docs.map(ja))]);return{contacts:e.filter(r=>!r._mergedInto&&!r._suppressed),leads:t}}async function za(n){if(!n)return null;const e=await zn(be(te,"contacts",n));return e.exists()?{id:e.id,...e.data()}:null}function Px(n,e,t){const r=Je(Ee(te,"activities"),Bn("relatedTo.id","==",n),mt("createdAt","desc"),kt(50));return Bt(r,s=>e(s.docs.map(ja)),s=>t&&t(s))}function xx(n,e,t){const r=Je(Ee(te,"contacts",n,"crmNotes"),mt("createdAt","desc"),kt(50));return Bt(r,s=>e(s.docs.map(ja)),s=>t&&t(s))}async function Nx({email:n,phone:e},t){for(const r of kx({email:n,phone:e})){const s=await zn(be(te,"dedup",r));if(s.exists()&&s.data().contactId!==t)return{key:r,contactId:s.data().contactId}}return null}async function Dx(n,e,t){const r=be(te,"contacts",n),s=async i=>{const o={...e,updatedAt:new Date().toISOString(),_version:i+1};return e.phone!==void 0&&(o.phone=Oy(e.phone,"+57")||null),Xe(r,o)};try{return await s(t._version||0),{ok:!0}}catch(i){if(!i||i.code!=="permission-denied")throw i;const o=await za(n);if(!o)throw i;if(Object.keys(e).some(u=>String(o[u]??"")!==String(t[u]??""))){const u=new Error("conflict");throw u.code="conflict",u.fresh=o,u}return await s(o._version||0),{ok:!0,retried:!0}}}async function Vx(n,e){return(await Mr(Fr,"crmMergeContacts")({survivorId:n,mergedId:e})).data}async function Ox(n){return(await Mr(Fr,"crmSuppressContact")({contactId:n})).data}async function Lx(n){return(await Mr(Fr,"crmCancelSuppression")({contactId:n})).data}async function Mx(n,e){const t=j.get().user;await Ut(Ee(te,"contacts",n,"crmNotes"),{body:String(e||"").trim(),authorId:t?t.uid:null,authorName:j.get().profile&&j.get().profile.nombre||t&&t.email||"Asesor",createdAt:new Date().toISOString()})}const Fx=[{id:"todos",label:"Todos"},{id:"lead",label:"Leads"},{id:"cliente",label:"Clientes"},{id:"suscriptor",label:"Suscriptores"}],Ux={lead:{label:"Lead",badge:"gold"},cliente:{label:"Cliente",badge:"ok"},suscriptor:{label:"Suscriptor",badge:"info"}};function dm(n){const e=String(n.lifecycleStage||n.type||"").toLowerCase();return e==="subscriber"||e==="suscriptor"?"suscriptor":e==="customer"||e==="cliente"?"cliente":"lead"}function Bx(n){const e={contacts:[],leads:[],loading:!0,error:null,q:"",filter:"todos"};let t=!0;const r=l("input",{type:"search",placeholder:"Buscar por nombre, correo o teléfono…","aria-label":"Buscar contactos"});r.addEventListener("input",()=>{e.q=r.value,I()});const s=l("div",{class:"search"},[l("span",{"aria-hidden":"true",text:"🔎"}),r]),i={},o=l("div",{class:"contactos__chips",role:"group","aria-label":"Filtrar por tipo"});Fx.forEach(k=>{const P=l("button",{class:"chip",type:"button","aria-pressed":k.id===e.filter?"true":"false"},[k.label]);P.addEventListener("click",()=>{e.filter=k.id,Object.entries(i).forEach(([L,C])=>C.setAttribute("aria-pressed",L===k.id?"true":"false")),I()}),i[k.id]=P,o.append(P)});const c=l("span",{class:"contactos__count u-caption u-faint"}),u=l("button",{class:"btn btn--soft btn--sm",type:"button"},["↻ Actualizar"]);u.addEventListener("click",V);const d=l("div",{class:"contactos__toolbar"},[s,o,l("div",{class:"u-row u-row--tight"},[c,u])]),f=l("div",{class:"contactos__list"}),p=l("section",{class:"contactos"},[d,f]);fe(n),n.append(p);function g(){const k={};for(const P of e.leads){if(!P.contactId)continue;const L=k[P.contactId];(!L||new Date(P.createdAt)>new Date(L.createdAt))&&(k[P.contactId]=P)}return k}function _(k){j.set({leads:e.leads,detailLeadId:k.id})}function I(){if(e.loading)return A("⏳","Cargando contactos…","");if(e.error)return A("⚠️","No se pudieron cargar los contactos",e.error);if(!e.contacts.length)return A("👥","Aún no hay contactos","Cuando entren leads, registros de cuenta o suscripciones, las personas aparecerán aquí.");const k=g(),P=Ba(e.q),L=e.contacts.filter(C=>e.filter!=="todos"&&dm(C)!==e.filter?!1:P?Ba(`${C.fullName||""} ${C.email||""} ${C.phone||""}`).includes(P):!0);if(c.textContent=`${L.length} de ${e.contacts.length}`,fe(f),!L.length){f.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"🔍"}),l("div",{class:"state__title",text:"Sin resultados"}),l("div",{class:"state__msg",text:"Prueba con otro término o filtro."})]));return}L.forEach(C=>f.append(S(C,k[C.id])))}function S(k,P){const L=dm(k),C=Ux[L],M=qi(k),E=Number(k.score)>0&&us[k.rating],v=l("div",{class:"contact-row__badges"},[l("span",{class:`badge badge--${C.badge}`,text:C.label}),l("span",{class:"badge",text:`${M.icon} ${M.label}`}),E?l("span",{class:`temp ${us[k.rating].cls}`,text:`${us[k.rating].icon} ${k.score}`}):null]),b=[k.email,k.phone].filter(Boolean).join(" · ")||"Sin datos de contacto",R=Array.isArray(k.tags)&&k.tags.length?l("span",{class:"contact-row__tags u-caption u-faint u-truncate",text:"🏷️ "+k.tags.join(", ")}):null,w=[l("span",{class:"avatar avatar--sm","aria-hidden":"true",text:ks(k.fullName)}),l("div",{class:"contact-row__main"},[l("span",{class:"contact-row__name u-truncate",text:k.fullName||"Sin nombre"}),l("span",{class:"contact-row__sub u-caption u-faint u-truncate",title:b,text:b}),R]),v,l("span",{class:"contact-row__time u-caption u-faint",text:vr(k.lastActivityAt)})];if(P){const x=l("button",{class:"contact-row",type:"button","aria-label":`Ver ficha de ${k.fullName||"contacto"}`},w);return x.addEventListener("click",()=>_(P)),x}return l("div",{class:"contact-row contact-row--nolead"},w)}function A(k,P,L){c.textContent="",fe(f),f.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:k}),l("div",{class:"state__title",text:P}),L?l("div",{class:"state__msg",text:L}):null]))}async function V(){e.loading=!0,e.error=null,I();try{const k=await Cx();if(!t)return;e.contacts=k.contacts,e.leads=k.leads,e.loading=!1}catch(k){if(!t)return;e.loading=!1,e.error=k&&k.code==="permission-denied"?"Sin permiso para ver los contactos.":"Revisa tu conexión e intenta de nuevo."}I()}return V(),function(){t=!1}}function $x(n,e,t){const r=l("div",{class:"modal"},[l("div",{class:"modal__head"},[l("h2",{class:"modal__title",text:n}),e?l("span",{class:"u-caption u-faint",text:e}):null]),...t]),s=l("div",{class:"modal-overlay"},[r]);document.body.appendChild(s);const i=()=>{s.remove(),window.removeEventListener("keydown",o)},o=c=>{c.key==="Escape"&&i()};return window.addEventListener("keydown",o),s.addEventListener("mousedown",c=>{c.target===s&&i()}),{close:i}}function qx(n,{onChanged:e}={}){if(!n){$("El contacto aún no carga.","error");return}if(j.get().mock){$("En demo no se edita el directorio.","info");return}if(n._mergedInto){$("Este contacto está fusionado en otro.","info");return}const t=l("div",{class:"nl-form"}),r=l("div",{class:"login__error",role:"alert",hidden:!0}),s=S=>{r.textContent=S,r.hidden=!1},{close:i}=$x("✏️ Editar contacto",n.fullName||"",[t]),o=n.suppressionStatus==="pendiente_supresion",c=l("input",{class:"input",type:"text",value:n.fullName||"",maxlength:"80"}),u=l("input",{class:"input",type:"email",value:n.email||"",placeholder:"correo@ejemplo.com"}),d=l("input",{class:"input",type:"tel",value:n.phone||"",placeholder:"+57 300 000 0000"}),f=l("button",{class:"btn btn--gold btn--sm",type:"button",text:"Guardar cambios"}),p=l("button",{class:"btn btn--ghost btn--sm",type:"button",text:"Cancelar"});p.addEventListener("click",i);async function g(S){r.hidden=!0;const A={};if(c.value.trim()!==(n.fullName||"")&&(A.fullName=c.value.trim()),u.value.trim().toLowerCase()!==(n.email||"")&&(A.email=u.value.trim().toLowerCase()||null),d.value.trim()!==(n.phone||"")&&(A.phone=d.value.trim()||null),!Object.keys(A).length){i();return}f.disabled=!0,f.textContent="Guardando…";try{if(A.email!==void 0||A.phone!==void 0){const V=await Nx({email:A.email!==void 0?A.email:n.email,phone:A.phone!==void 0?A.phone:n.phone},n.id);if(V)return f.disabled=!1,f.textContent="Guardar cambios",_(V)}await Dx(n.id,A,S||n),$("✓ Contacto actualizado","ok"),i(),e&&e()}catch(V){if(f.disabled=!1,f.textContent="Guardar cambios",V&&V.code==="conflict"&&V.fresh){s("Alguien actualizó este contacto mientras editabas. Valores actuales: "+(V.fresh.fullName||"—")+" · "+(V.fresh.email||"sin email")+" · "+(V.fresh.phone||"sin tel")+'. Pulsa "Guardar" de nuevo para PISAR con lo tuyo, o Cancelar para conservar lo del server.'),f.disabled=!1,f.onclick=()=>g(V.fresh);return}s(V&&V.message||"No se pudo guardar.")}}f.addEventListener("click",()=>g(null));async function _(S){const A=await za(S.contactId).catch(()=>null),V=A&&A.fullName||S.contactId;if(!Be("*")){s("Ese email/teléfono YA pertenece a otro contacto ("+V+"). Pídele al Super Admin fusionarlos — no se crean duplicados.");return}t.replaceChildren(l("p",{},["Ese dato ya pertenece a ",l("strong",{text:V}),". Son la misma persona → fusiónalos. Elige quién SOBREVIVE (el otro queda como histórico apuntando aquí):"]),r);const k=(P,L,C)=>{const M=l("button",{class:"btn btn--soft btn--sm",type:"button",text:P});return M.addEventListener("click",async()=>{if(confirm("¿Fusionar definitivamente? Re-apunta leads, negocios y notas. No se puede deshacer.")){M.disabled=!0;try{const E=await Vx(L,C);$(`🔗 Fusionados: ${E.counts?E.counts.leads:0} lead(s), ${E.counts?E.counts.deals:0} negocio(s)`,"ok"),i(),e&&e()}catch(E){M.disabled=!1,s(E&&E.message||"No se pudo fusionar.")}}}),M};t.append(l("div",{class:"cita-actions"},[k("Sobrevive ESTE ("+(n.fullName||"actual")+")",n.id,S.contactId),k("Sobrevive el OTRO ("+V+")",S.contactId,n.id),l("button",{class:"btn btn--ghost btn--sm",type:"button",text:"Cancelar",onclick:i})]))}function I(){if(!Be("crm.delete"))return null;const S=l("div",{class:"cfg-card",style:{borderColor:"var(--danger, #e5484d)"}});if(S.append(l("h3",{class:"cfg-card__title",text:"🛡 Privacidad (Ley 1581)"})),o){S.append(l("p",{class:"u-caption",text:"⏳ Supresión programada: se ejecuta el "+String(n.suppressionExecuteAfter||"").slice(0,16).replace("T"," ")+". Hasta entonces es reversible."}));const A=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"↩️ Cancelar supresión"});A.addEventListener("click",async()=>{A.disabled=!0;try{const V=await Lx(n.id);$(V.duplicates&&V.duplicates.length?"↩️ Supresión cancelada — OJO: nació un duplicado durante la espera, fusiónalos.":"↩️ Supresión cancelada","ok"),i(),e&&e()}catch(V){A.disabled=!1,s(V&&V.message||"No se pudo cancelar.")}}),S.append(A)}else{S.append(l("p",{class:"u-caption u-muted",text:"Derecho de supresión: borra los datos personales (nombre, contacto, notas) de forma DEFINITIVA tras 72h de gracia. El historial comercial (montos, fechas, carro) se conserva anónimo. Las copias ya enviadas por Telegram/email quedan fuera del alcance técnico."}));const A=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"🗑 Solicitar supresión definitiva…"});A.addEventListener("click",async()=>{const V=prompt("DOBLE CONFIRMACIÓN: escribe SUPRIMIR para programar el borrado de datos personales de "+(n.fullName||"este contacto")+" (72h de gracia, reversible hasta entonces).");if(V!=="SUPRIMIR"){V!==null&&$("Texto incorrecto — no se hizo nada.","info");return}A.disabled=!0;try{const k=await Ox(n.id);$("🛡 Supresión programada para "+String(k.executeAfter||"").slice(0,16).replace("T"," "),"ok"),i(),e&&e()}catch(k){A.disabled=!1,s(k&&k.message||"No se pudo programar.")}}),S.append(A)}return S}o?t.append(l("p",{class:"cita-conflict",text:"⏳ Este contacto tiene una supresión Ley 1581 programada — no se puede editar (cancélala primero si fue un error)."}),r,I(),l("div",{class:"nl-actions"},[p])):t.append(l("label",{class:"field"},[l("span",{class:"field__label",text:"Nombre"}),c]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Email"}),u]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Teléfono"}),d]),r,l("div",{class:"nl-actions"},[p,f]),I())}const jx={solicitud_inbound:"📥",whatsapp:"💬",status_change:"🔁",nota:"🗒️",email:"✉️",llamada:"📞"};function zx(n){let e=null,t=null,r=null,s="resumen",i={lead:null,contact:null,activities:[],notes:[]};const o=l("aside",{class:"detail",role:"dialog","aria-modal":"true","aria-label":"Ficha del cliente"}),c=l("div",{class:"detail-overlay",hidden:!0},[o]);n.append(c),c.addEventListener("mousedown",C=>{C.target===c&&u()}),window.addEventListener("keydown",C=>{C.key==="Escape"&&e&&u()}),j.subscribe(C=>{C.detailLeadId!==e&&f(C.detailLeadId)});function u(){j.set({detailLeadId:null})}function d(){t&&(t(),t=null),r&&(r(),r=null)}function f(C){if(d(),e=C,!C){c.hidden=!0,document.body.classList.remove("has-detail"),fe(o);return}s="resumen",c.hidden=!1,document.body.classList.add("has-detail"),p(C)}function p(C){const M=(j.get().leads||[]).find(E=>E.id===C);if(i={lead:M||null,contact:null,activities:[],notes:[],loadError:null},g(),!!M)if(j.get().mock)i.contact=lP(M.contactId),i.activities=cP(C),i.notes=tm(M.contactId),g();else{const E=v=>{i.loadError=v&&v.code==="permission-denied"?"Sin permiso de CRM (crm.read) para ver la ficha completa.":"No se pudo cargar parte de la ficha — revisa tu conexión.",g()};za(M.contactId).then(v=>{i.contact=v,g()}).catch(E),t=Px(C,v=>{i.activities=v,g()},E),M.contactId&&(r=xx(M.contactId,v=>{i.notes=v,g()},E))}}function g(){fe(o);const C=i.lead;if(!C){o.append(_(null)),o.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"🔍"}),l("div",{class:"state__title",text:"Lead no disponible"}),l("div",{class:"state__msg",text:"Recarga la Bandeja e inténtalo otra vez."})]));return}o.append(_(C)),o.append(I());const M=l("div",{class:"detail__body"});i.loadError&&M.append(l("div",{class:"u-caption",role:"alert",style:{padding:"8px 12px",borderRadius:"8px",margin:"0 0 10px",background:"rgba(229,115,26,0.12)",border:"1px solid rgba(229,115,26,0.45)"},text:"⚠️ "+i.loadError})),s==="resumen"?M.append(S(C)):s==="comms"?M.append(V()):s==="score"?M.append(k(C)):s==="notas"&&M.append(P(C)),o.append(M)}function _(C){const M=l("button",{class:"icon-btn",type:"button","aria-label":"Cerrar"},["✕"]);if(M.addEventListener("click",u),!C)return l("div",{class:"detail__header"},[l("div",{class:"u-grow"}),M]);const E=L(C),v=us[E.rating],b=ia(C.status),R=Cc(C),w=qi(C),x=l("button",{class:"btn btn--wa btn--sm",type:"button"},["💬 WhatsApp"]);x.addEventListener("click",()=>{const ye=ay(C.phone,`Hola ${String(C.fullName||"").split(" ")[0]||""}, te saluda Altorra Cars 👋`);if(!ye)return $("Sin teléfono","error");window.open(ye,"_blank","noopener")});const T=Be("crm.edit"),le=T&&C.status!=="convertido"?l("button",{class:"btn btn--soft btn--sm",type:"button"},["🎯 Convertir"]):null;le&&le.addEventListener("click",()=>Ey(C,{}));const pe=T?l("button",{class:"icon-btn",type:"button","aria-label":"Agendar cita",title:"Agendar cita"},["📅"]):null;pe&&pe.addEventListener("click",()=>ox(C,{}));const X=T?l("button",{class:"icon-btn",type:"button","aria-label":"Editar contacto",title:"Editar contacto"},["✏️"]):null;return X&&X.addEventListener("click",()=>qx(i.contact,{onChanged:()=>{C.contactId&&za(C.contactId).then(ye=>{i.contact=ye,g()}).catch(()=>$("No se pudo recargar el contacto","error"))}})),l("div",{class:"detail__header"},[l("div",{class:"u-row u-grow",style:{minWidth:"0"}},[l("span",{class:"avatar","aria-hidden":"true",text:ks(C.fullName)}),l("div",{class:"u-grow",style:{minWidth:"0"}},[l("h2",{class:"detail__name u-truncate",text:C.fullName}),l("div",{class:"u-row u-row--tight",style:{flexWrap:"wrap"}},[l("span",{class:`temp ${v.cls}`,text:`${v.icon} ${v.label} · ${E.score}`}),l("span",{class:`badge badge--${b.badge||""}`.trim(),text:b.label}),l("span",{class:"badge",text:`${R.icon} ${R.label}`}),l("span",{class:"badge",text:`${w.icon} ${w.label}`})])])]),l("div",{class:"u-row u-row--tight"},[le,pe,X,x,M])])}function I(){const C=[["resumen","Resumen"],["comms","Comunicaciones"],["score","Score"],["notas","Notas"]],M=l("div",{class:"detail__tabs",role:"tablist"});return C.forEach(([E,v])=>{const b=l("button",{class:"detail__tab"+(s===E?" is-active":""),role:"tab","aria-selected":String(s===E),type:"button"},[v]);b.addEventListener("click",()=>{s=E,g()}),M.append(b)}),M}function S(C){const M=i.contact,E=M&&M.consent?M.consent:null,v=[["Correo",C.email||"—"],["Teléfono",C.phone||"—"],["Interés",C.sourceDetail||"—"],["Vehículo",C.vehicleOfInterestId||"—"],["Asesor",C.ownerName||"Sin asignar"],["Origen",C.source||"—"],["Capturado",wC(C.createdAt)],["Última actividad",vr(C.lastActivityAt)]],b=hy(C,{score:L(C).score});return l("div",{class:"u-stack"},[l("div",{class:"detail-card detail-card--nba"},[l("span",{class:"detail-card__icon","aria-hidden":"true",text:b.icon}),l("div",{class:"u-grow"},[l("div",{class:"u-caption u-muted",text:"Próxima mejor acción"}),l("strong",{text:b.label}),l("div",{class:"u-caption u-faint",text:b.reason})])]),l("dl",{class:"kv"},v.flatMap(([R,w])=>[l("dt",{text:R}),l("dd",{class:"u-truncate",text:w})])),E?A(E):null])}function A(C){const M=E=>E?"✅":"⛔";return l("div",{class:"detail-card"},[l("div",{class:"u-caption u-muted",text:"Consentimiento (Ley 1581)"}),l("div",{class:"u-row",style:{flexWrap:"wrap",gap:"12px"}},[l("span",{class:"u-caption",text:`${M(C.email)} Email`}),l("span",{class:"u-caption",text:`${M(C.whatsapp)} WhatsApp`}),l("span",{class:"u-caption",text:`${M(C.calls)} Llamadas`})]),l("div",{class:"u-caption u-faint",text:`Política ${C.policyVersion||"v1"} · origen ${C.source||"—"}`})])}function V(){if(!i.activities.length)return l("div",{class:"state"},[l("div",{class:"state__icon",text:"📭"}),l("div",{class:"state__title",text:"Sin comunicaciones"}),l("div",{class:"state__msg",text:"Aún no hay actividades registradas para este lead."})]);const C=l("ol",{class:"timeline"});return i.activities.forEach(M=>{C.append(l("li",{class:"timeline__item timeline__item--"+(M.direction||"inbound")},[l("span",{class:"timeline__icon","aria-hidden":"true",text:jx[M.type]||"•"}),l("div",{class:"u-grow"},[l("div",{class:"u-spread"},[l("strong",{class:"u-truncate",text:M.subject||M.type||"Actividad"}),l("span",{class:"u-caption u-faint",text:vr(M.createdAt)})]),M.body?l("div",{class:"u-caption u-muted",text:M.body}):null])]))}),C}function k(C){const M=L(C),E=us[M.rating],v=Object.keys(Zp).map(b=>{const R=Math.round((M.factors[b]||0)*100);return l("div",{class:"factor"},[l("div",{class:"u-spread u-caption"},[l("span",{text:Zp[b]}),l("span",{class:"u-faint",text:`${R}% · peso ${Math.round(qC[b]*100)}%`})]),l("div",{class:"factor__track"},[l("div",{class:"factor__fill",style:{width:R+"%"}})])])});return l("div",{class:"u-stack"},[l("div",{class:"scorehero"},[l("div",{class:`scorehero__num ${E.cls}`,text:String(M.score)}),l("div",{class:"u-stack",style:{gap:"2px"}},[l("strong",{text:`${E.icon} ${E.label}`}),l("span",{class:"u-caption u-faint",text:"Heurística determinista (7 factores, sin IA)"})])]),l("div",{class:"u-stack",style:{gap:"10px"}},v)])}function P(C){const M=Be("crm.edit")||Be("crm.create"),E=l("textarea",{class:"textarea",placeholder:"Escribe una nota interna…",rows:"3"}),v=l("button",{class:"btn btn--gold btn--sm",type:"button"},["Agregar nota"]);v.addEventListener("click",async()=>{const R=E.value.trim();if(!R)return;v.disabled=!0;const w={body:R,authorName:"Tú",createdAt:new Date().toISOString()};try{j.get().mock?(dP(C.contactId,w),i.notes=tm(C.contactId),g()):(await Mx(C.contactId,R),E.value=""),$("Nota agregada","ok")}catch{$("No se pudo guardar la nota","error")}finally{v.disabled=!1}});const b=l("div",{class:"u-stack"});return i.notes.length||b.append(l("div",{class:"u-caption u-faint",style:{padding:"8px 0"},text:"Aún no hay notas."})),i.notes.forEach(R=>b.append(l("div",{class:"detail-card"},[l("div",{class:"u-caption u-muted",text:R.body}),l("div",{class:"u-caption u-faint",text:`${R.authorName||"Asesor"} · ${vr(R.createdAt)}`})]))),l("div",{class:"u-stack"},[M?l("div",{class:"u-stack",style:{gap:"8px"}},[E,l("div",{class:"u-row",style:{justifyContent:"flex-end"}},[v])]):null,b])}function L(C){return dy(C,i.activities||[],i.contact)}}const Ly={days:[1,2,3,4,5,6],startHour:9,endHour:17,interval:60,maxPerSlot:1,bufferMin:15,blockedDates:[],blockedDateLabels:{},blockedHours:{}},Gx=[["2026-01-01","Año Nuevo"],["2026-01-12","Reyes Magos"],["2026-03-23","San José"],["2026-04-02","Jueves Santo"],["2026-04-03","Viernes Santo"],["2026-05-01","Día del Trabajo"],["2026-05-18","Ascensión"],["2026-06-08","Corpus Christi"],["2026-06-15","Sagrado Corazón"],["2026-06-29","San Pedro y San Pablo"],["2026-07-20","Independencia"],["2026-08-07","Batalla de Boyacá"],["2026-08-17","Asunción de la Virgen"],["2026-10-12","Día de la Raza"],["2026-11-02","Todos los Santos"],["2026-11-16","Independencia de Cartagena"],["2026-12-08","Inmaculada Concepción"],["2026-12-25","Navidad"]],My=()=>be(te,"config","availability"),Fy=()=>be(te,"crm_config","advisorOverrides");function Hx(n,e){return Bt(My(),t=>{n({...Ly,...t.exists()?t.data():{}})},t=>e&&e(t))}async function Kx(n,e){await Ac(My(),{...n,updatedAt:new Date().toISOString(),updatedBy:e||null},{merge:!0})}function Wx(n,e){return Bt(Fy(),t=>{n(t.exists()&&t.data().overrides||{})},t=>e&&e(t))}async function Qx(n,e){await Ac(Fy(),{overrides:n,updatedAt:new Date().toISOString(),updatedBy:e||null})}const Yx=["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"],qo=()=>{const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`};function Jx(n){const e={av:{...Ly},overrides:{},advisors:[],sub:null,subOv:null,loaded:!1},t=Be("calendar.config"),r=l("section",{class:"cfg"});if(fe(n),n.append(r),!t){r.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"🔒"}),l("div",{class:"state__title",text:"Sin permiso"}),l("div",{class:"state__msg",text:"Solo quien administra la disponibilidad (permiso calendar.config) puede editar esto."})]));return}async function s(g,_){if(j.get().mock){Object.assign(e.av,g),p(),$(_+" (demo)","ok");return}try{await Kx(g,j.get().user&&j.get().user.uid),$(_,"ok")}catch(I){$("No se pudo guardar: "+(I.message||I.code),"error")}}function i(){const g=e.av,_=Yx.map((C,M)=>{const E=l("input",{type:"checkbox"});return E.checked=(g.days||[]).includes(M),E.dataset.dow=String(M),l("label",{class:"cfg-day"},[E,l("span",{text:C})])}),I=(C,M,E)=>{const v=l("select",{class:"select"});for(let b=M;b<=E;b++)v.append(l("option",{value:String(b),text:String(b).padStart(2,"0")+":00"}));return v.value=String(C),v},S=I(g.startHour,6,20),A=I(g.endHour,7,21),V=l("select",{class:"select"},[l("option",{value:"30",text:"Cada 30 min"}),l("option",{value:"60",text:"Cada hora"})]);V.value=String(g.interval||60);const k=l("input",{class:"input",type:"number",min:"1",max:"5",value:String(g.maxPerSlot||1)}),P=l("input",{class:"input",type:"number",min:"0",max:"60",step:"5",value:String(g.bufferMin!=null?g.bufferMin:15)}),L=l("button",{class:"btn btn--gold btn--sm",type:"button",text:"Guardar horario"});return L.addEventListener("click",()=>{const C=_.map(v=>v.querySelector("input")).filter(v=>v.checked).map(v=>parseInt(v.dataset.dow,10)).sort(),M=parseInt(S.value,10),E=parseInt(A.value,10);if(!C.length){$("Elige al menos un día.","error");return}if(M>=E){$("La hora de cierre debe ser mayor que la de apertura.","error");return}s({days:C,startHour:M,endHour:E,interval:parseInt(V.value,10)||60,maxPerSlot:Math.max(1,parseInt(k.value,10)||1),bufferMin:Math.max(0,parseInt(P.value,10)||0)},"✓ Horario guardado")}),l("div",{class:"cfg-card"},[l("h3",{class:"cfg-card__title",text:"🕘 Horario de atención"}),l("p",{class:"u-caption u-muted",text:"Esto es lo que el cliente ve en la web al pedir cita — los cambios aplican al instante."}),l("div",{class:"cfg-days"},_),l("div",{class:"cfg-grid"},[l("label",{class:"field"},[l("span",{class:"field__label",text:"Abre"}),S]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Cierra"}),A]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Citas web"}),V]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Citas por horario"}),k]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Colchón (min)"}),P])]),L])}function o(){const g=e.av,_=g.blockedDateLabels||{},I=qo(),S=l("div",{class:"cfg-chips"}),A=(g.blockedDates||[]).slice().sort();A.length||S.append(l("span",{class:"u-caption u-muted",text:"Sin fechas bloqueadas — la web ofrece todos los días laborales."})),A.forEach(C=>{const M=C<I,E=l("button",{class:"cfg-chip__x",type:"button","aria-label":"Quitar",text:"✕"});E.addEventListener("click",()=>{const v=A.filter(b=>b!==C);s({blockedDates:v,blockedDateLabels:{[C]:Mp()}},"✓ Fecha desbloqueada: "+C)}),S.append(l("span",{class:"cfg-chip"+(M?" is-past":"")},[l("span",{text:C+(_[C]?" · "+_[C]:"")}),E]))});const V=l("input",{class:"input",type:"date",min:I}),k=l("input",{class:"input",type:"text",placeholder:"Motivo (opcional)",maxlength:"40"}),P=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"Bloquear fecha"});P.addEventListener("click",()=>{const C=V.value;if(!C){$("Elige una fecha.","error");return}if(A.includes(C)){$("Esa fecha ya está bloqueada.","error");return}const M={..._};k.value.trim()&&(M[C]=k.value.trim()),s({blockedDates:[...A,C].sort(),blockedDateLabels:M},"✓ Fecha bloqueada: "+C)});const L=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"🇨🇴 Cargar festivos de Colombia 2026"});return L.addEventListener("click",()=>{const C=Gx.filter(([E])=>E>=I&&!A.includes(E));if(!C.length){$("Los festivos que faltan de 2026 ya están cargados.","ok");return}const M={..._};C.forEach(([E,v])=>{M[E]=v}),s({blockedDates:[...A,...C.map(([E])=>E)].sort(),blockedDateLabels:M},`✓ ${C.length} festivo(s) bloqueados`)}),l("div",{class:"cfg-card"},[l("h3",{class:"cfg-card__title",text:"📅 Fechas bloqueadas (festivos y cierres)"}),l("p",{class:"u-caption u-muted",text:"En estas fechas la web NO ofrece citas. Las fechas pasadas se limpian solas cada madrugada."}),S,l("div",{class:"cfg-row"},[V,k,P]),L])}function c(){const g=e.av,_=[],I=g.interval||60;for(let S=g.startHour*60;S<g.endHour*60;S+=I)_.push(String(Math.floor(S/60)).padStart(2,"0")+":"+String(S%60).padStart(2,"0"));return _}function u(){const _=e.av.blockedHours||{},I=l("div",{class:"cfg-bh"}),S=Object.entries(_).sort(([P],[L])=>P.localeCompare(L));S.length||I.append(l("span",{class:"u-caption u-muted",text:"Sin horas bloqueadas."})),S.forEach(([P,L])=>{const C=(L||[]).slice().sort().map(M=>{const E=l("button",{class:"cfg-chip__x",type:"button",text:"✕"});return E.addEventListener("click",()=>{const v=(_[P]||[]).filter(b=>b!==M);s({blockedHours:{[P]:v.length?v:Mp()}},`✓ ${P} ${M} desbloqueada`)}),l("span",{class:"cfg-chip"},[l("span",{text:M}),E])});I.append(l("div",{class:"cfg-bh__day"},[l("strong",{text:P}),l("div",{class:"cfg-chips"},C)]))});const A=l("input",{class:"input",type:"date",min:qo()}),V=l("select",{class:"select"},c().map(P=>l("option",{value:P,text:P}))),k=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"Bloquear hora"});return k.addEventListener("click",()=>{const P=A.value,L=V.value;if(!P){$("Elige una fecha.","error");return}const C=_[P]||[];if(C.includes(L)){$("Esa hora ya está bloqueada.","error");return}s({blockedHours:{..._,[P]:[...C,L].sort()}},`✓ ${P} ${L} bloqueada`)}),l("div",{class:"cfg-card"},[l("h3",{class:"cfg-card__title",text:"⏰ Horas bloqueadas (un horario puntual)"}),I,l("div",{class:"cfg-row"},[A,V,k])])}async function d(g,_){if(j.get().mock){e.overrides=g,p(),$(_+" (demo)","ok");return}try{await Qx(g,j.get().user&&j.get().user.uid),$(_,"ok")}catch(I){$("No se pudo guardar: "+(I.message||I.code),"error")}}function f(){const g=e.overrides||{},_=l("div",{class:"cfg-advisors"});return e.advisors.length||_.append(l("span",{class:"u-caption u-muted",text:"Cargando asesores…"})),e.advisors.forEach(I=>{const S=g[I.uid],A=l("div",{class:"cfg-advisor"});if(A.append(l("div",{class:"cfg-advisor__name"},[l("strong",{text:I.nombre}),S?l("span",{class:"cfg-advisor__badge is-off",text:`🏖 ${S.reason||"ausente"} · ${S.from} → ${S.to}`}):l("span",{class:"cfg-advisor__badge",text:"✅ disponible"})])),S){const V=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"Quitar ausencia"});V.addEventListener("click",()=>{const k={...g};delete k[I.uid],d(k,`✓ ${I.nombre} disponible de nuevo`)}),A.append(V)}else{const V=l("input",{class:"input",type:"date",min:qo()}),k=l("input",{class:"input",type:"date",min:qo()}),P=l("select",{class:"select"},[l("option",{value:"vacaciones",text:"Vacaciones"}),l("option",{value:"incapacidad",text:"Incapacidad"}),l("option",{value:"otro",text:"Otro"})]),L=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"Marcar ausencia"});L.addEventListener("click",()=>{if(!V.value||!k.value||V.value>k.value){$("Revisa el rango de fechas.","error");return}d({...g,[I.uid]:{name:I.nombre,from:V.value,to:k.value,reason:P.value}},`✓ Ausencia de ${I.nombre} registrada`)}),A.append(l("div",{class:"cfg-row"},[V,k,P,L]))}_.append(A)}),l("div",{class:"cfg-card"},[l("h3",{class:"cfg-card__title",text:"👤 Excepciones por asesor"}),l("p",{class:"u-caption u-muted",text:"Un asesor ausente no recibe leads de la rotación ni citas confirmadas a su nombre en esas fechas."}),_])}function p(){fe(r),r.append(l("div",{class:"cfg-cols"},[i(),o()]),l("div",{class:"cfg-cols"},[u(),f()]))}return j.get().mock?(e.loaded=!0,p()):(e.sub=Hx(g=>{e.av=g,e.loaded=!0,p()},()=>{$("No se pudo cargar la configuración.","error")}),e.subOv=Wx(g=>{e.overrides=g,e.loaded&&p()},()=>{})),ky().then(g=>{e.advisors=g,e.loaded&&p()}),function(){e.sub&&e.sub(),e.sub=null,e.subOv&&e.subOv(),e.subOv=null}}function Jt(n,e,t){try{if(j.get().mock)return;const r=j.get().user;Ut(Ee(te,"auditLog"),{action:n,target:e||"",details:t||"",user:r&&r.email||"unknown",timestamp:new Date().toISOString()}).catch(()=>{})}catch{}}const hm={google_maps:"Google Maps",sitio_web:"Sitio Web",usuario_registrado:"Usuario Registrado"};function ca(n){return(n||"NN").split(" ").map(e=>e.charAt(0)).join("").substring(0,2).toUpperCase()}function Xx(n,e){const t=Je(Ee(te,"resenas"),mt("createdAt","desc"));return Bt(t,r=>{n(r.docs.map(s=>({...s.data(),_docId:s.id})))},r=>e&&e(r))}async function Zx(n,e){const t=new Date().toISOString(),r={name:e.name,location:e.location||"Cartagena",rating:e.rating,vehicle:e.vehicle||"",text:e.text,source:e.source||"sitio_web",verified:!!e.verified,featured:!!e.featured,avatar:ca(e.name),updatedAt:t};n?(await Xe(be(te,"resenas",n),r),Jt("review_update","resena "+r.name,r.name)):(r.createdAt=t,await Ut(Ee(te,"resenas"),r),Jt("review_create","resena "+r.name,r.name))}async function eN(n,e){await yd(be(te,"resenas",n)),Jt("review_delete","resena "+(e||n),"")}const tN=[{_docId:"m1",name:"Carlos Pérez",location:"Cartagena",rating:5,vehicle:"Mazda CX-30 2023",text:"Excelente atención, el carro quedó impecable y el papeleo fue rapidísimo.",source:"google_maps",verified:!0,featured:!0,avatar:"CP",createdAt:"2026-06-01T10:00:00.000Z"},{_docId:"m2",name:"Laura Gómez",location:"Turbaco",rating:4,vehicle:"",text:"Buen servicio y asesoría honesta. El proceso de financiación tardó un poco.",source:"sitio_web",verified:!0,featured:!1,avatar:"LG",createdAt:"2026-05-20T15:30:00.000Z"},{_docId:"m3",name:"Andrés Llanos",location:"Cartagena",rating:5,vehicle:"Chevrolet Onix 2024",text:"Me recibieron mi carro usado como parte de pago sin vueltas. Recomendado.",source:"usuario_registrado",verified:!1,featured:!1,avatar:"AL",createdAt:"2026-05-02T09:10:00.000Z"}],nN="★",rN="☆",fm=n=>nN.repeat(Math.max(0,Math.min(5,n)))+rN.repeat(5-Math.max(0,Math.min(5,n)));function sN(n){const e={reviews:[],sub:null,loaded:!1},t=Be("reviews.create"),r=Be("reviews.edit"),s=Be("reviews.delete"),i=l("section",{class:"rev"});fe(n),n.append(i);function o(p){const g=!!p,_={name:l("input",{class:"input",type:"text",maxlength:"80",placeholder:"Nombre del cliente *"}),location:l("input",{class:"input",type:"text",maxlength:"60",placeholder:"Ciudad (default: Cartagena)"}),rating:l("select",{class:"select"},[5,4,3,2,1].map(k=>l("option",{value:String(k),text:fm(k)+"  ("+k+")"}))),vehicle:l("input",{class:"input",type:"text",maxlength:"80",placeholder:"Vehículo (opcional)"}),text:l("textarea",{class:"input rev-modal__text",maxlength:"600",rows:"4",placeholder:"Texto de la reseña *"}),source:l("select",{class:"select"},Object.entries(hm).map(([k,P])=>l("option",{value:k,text:P}))),verified:l("input",{type:"checkbox"}),featured:l("input",{type:"checkbox"})};g?(_.name.value=p.name||"",_.location.value=p.location||"",_.rating.value=String(parseInt(p.rating,10)||5),_.vehicle.value=p.vehicle||"",_.text.value=p.text||"",_.source.value=p.source||"sitio_web",_.verified.checked=p.verified!==!1,_.featured.checked=!!p.featured):(_.source.value="sitio_web",_.verified.checked=!0);const I=l("button",{class:"btn btn--gold",type:"button",text:g?"Guardar cambios":"Crear reseña"}),S=l("button",{class:"btn btn--soft",type:"button",text:"Cancelar"}),A=l("div",{class:"rev-modal__overlay"},[l("div",{class:"rev-modal",role:"dialog","aria-modal":"true"},[l("h3",{class:"rev-modal__title",text:g?"Editar reseña":"Nueva reseña"}),l("div",{class:"rev-modal__grid"},[l("label",{class:"field"},[l("span",{class:"field__label",text:"Cliente *"}),_.name]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Ubicación"}),_.location]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Calificación"}),_.rating]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Vehículo"}),_.vehicle])]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Reseña *"}),_.text]),l("div",{class:"rev-modal__grid"},[l("label",{class:"field"},[l("span",{class:"field__label",text:"Fuente"}),_.source]),l("label",{class:"rev-check"},[_.verified,l("span",{text:"Verificada (cliente real)"})]),l("label",{class:"rev-check"},[_.featured,l("span",{text:"⭐ Destacada en el sitio"})])]),l("div",{class:"rev-modal__actions"},[S,I])])]),V=()=>A.remove();S.addEventListener("click",V),A.addEventListener("click",k=>{k.target===A&&V()}),I.addEventListener("click",async()=>{const k=_.name.value.trim(),P=_.text.value.trim();if(!k||!P){$("Completa nombre y texto de la reseña.","error");return}const L={name:k,text:P,location:_.location.value.trim(),rating:parseInt(_.rating.value,10)||5,vehicle:_.vehicle.value.trim(),source:_.source.value,verified:_.verified.checked,featured:_.featured.checked};if(j.get().mock){if(g){const C=e.reviews.findIndex(M=>M._docId===p._docId);C>=0&&(e.reviews[C]={...e.reviews[C],...L,avatar:ca(k)})}else e.reviews.unshift({...L,_docId:"m"+Date.now(),avatar:ca(k),createdAt:new Date().toISOString()});f(),V(),$(g?"Reseña actualizada (demo)":"Reseña creada (demo)","ok");return}I.disabled=!0,I.textContent="Guardando…";try{await Zx(g?p._docId:null,L),V(),$(g?"✓ Reseña actualizada":"✓ Reseña creada — ya está en el sitio","ok")}catch(C){I.disabled=!1,I.textContent=g?"Guardar cambios":"Crear reseña",$("No se pudo guardar: "+(C.message||C.code),"error")}}),document.body.append(A),_.name.focus()}function c(p){const g=l("button",{class:"btn btn--danger",type:"button",text:"Eliminar definitivamente"}),_=l("button",{class:"btn btn--soft",type:"button",text:"Cancelar"}),I=l("div",{class:"rev-modal__overlay"},[l("div",{class:"rev-modal rev-modal--sm",role:"alertdialog","aria-modal":"true"},[l("h3",{class:"rev-modal__title",text:"¿Eliminar esta reseña?"}),l("p",{class:"u-caption u-muted",text:`"${(p.text||"").slice(0,120)}…" — ${p.name}. Desaparece del sitio público al instante. No se puede deshacer.`}),l("div",{class:"rev-modal__actions"},[_,g])])]),S=()=>I.remove();_.addEventListener("click",S),I.addEventListener("click",A=>{A.target===I&&S()}),g.addEventListener("click",async()=>{if(j.get().mock){e.reviews=e.reviews.filter(A=>A._docId!==p._docId),f(),S(),$("Reseña eliminada (demo)","ok");return}g.disabled=!0;try{await eN(p._docId,p.name),S(),$("✓ Reseña eliminada","ok")}catch(A){g.disabled=!1,$("No se pudo eliminar: "+(A.message||A.code),"error")}}),document.body.append(I)}function u(){const p=e.reviews.length,g=p?(e.reviews.reduce((S,A)=>S+(parseInt(A.rating,10)||0),0)/p).toFixed(1):"0.0",_=e.reviews.filter(S=>S.featured).length,I=t?l("button",{class:"btn btn--gold btn--sm",type:"button",text:"＋ Nueva reseña"}):null;return I&&I.addEventListener("click",()=>o(null)),l("div",{class:"rev-head"},[l("div",{class:"rev-stats"},[l("div",{class:"rev-stat"},[l("strong",{text:String(p)}),l("span",{class:"u-caption u-muted",text:"reseñas"})]),l("div",{class:"rev-stat"},[l("strong",{text:g+" ★"}),l("span",{class:"u-caption u-muted",text:"promedio"})]),l("div",{class:"rev-stat"},[l("strong",{text:String(_)}),l("span",{class:"u-caption u-muted",text:"destacadas"})])]),I])}function d(p){const g=[];if(r){const _=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"✏️ Editar"});_.addEventListener("click",()=>o(p)),g.push(_)}if(s){const _=l("button",{class:"btn btn--soft btn--sm rev-card__del",type:"button",text:"🗑","aria-label":"Eliminar"});_.addEventListener("click",()=>c(p)),g.push(_)}return l("article",{class:"rev-card"},[l("div",{class:"rev-card__top"},[l("span",{class:"avatar avatar--sm","aria-hidden":"true",text:p.avatar||ca(p.name)}),l("div",{class:"rev-card__who"},[l("strong",{class:"u-truncate",text:(p.name||"")+(p.verified?" ✔":"")}),l("span",{class:"u-caption u-faint",text:p.location||"—"})]),l("span",{class:"rev-card__stars","aria-label":(p.rating||0)+" de 5",text:fm(parseInt(p.rating,10)||0)})]),p.text?l("p",{class:"rev-card__text",text:"“"+p.text+"”"}):null,l("div",{class:"rev-card__meta"},[p.vehicle?l("span",{class:"chip",text:"🚗 "+p.vehicle}):null,l("span",{class:"chip",text:hm[p.source]||p.source||"—"}),p.featured?l("span",{class:"chip chip--gold",text:"⭐ Destacada"}):null]),g.length?l("div",{class:"rev-card__actions"},g):null])}function f(){if(fe(i),i.append(u()),!e.loaded){i.append(l("div",{class:"state"},[l("div",{class:"state__msg",text:"Cargando reseñas…"})]));return}if(!e.reviews.length){i.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"💬"}),l("div",{class:"state__title",text:"Sin reseñas"}),l("div",{class:"state__msg",text:t?'Agrega la primera con "＋ Nueva reseña".':"Aún no hay reseñas registradas."})]));return}i.append(l("div",{class:"rev-grid"},e.reviews.map(d)))}return j.get().mock?(e.reviews=tN.map(p=>({...p})),e.loaded=!0,f()):(f(),e.sub=Xx(p=>{e.reviews=p,e.loaded=!0,f()},()=>$("No se pudieron cargar las reseñas.","error"))),function(){e.sub&&e.sub(),e.sub=null}}function Uy(n,{maxWidth:e=1920,quality:t=.85}={}){return new Promise((r,s)=>{const i=URL.createObjectURL(n),o=new Image;o.onload=()=>{URL.revokeObjectURL(i);const c=Math.min(1,e/o.naturalWidth),u=Math.round(o.naturalWidth*c),d=Math.round(o.naturalHeight*c),f=document.createElement("canvas");f.width=u,f.height=d,f.getContext("2d").drawImage(o,0,0,u,d),f.toBlob(p=>{p?r(p):s(new Error("No se pudo comprimir la imagen."))},"image/webp",t)},o.onerror=()=>{URL.revokeObjectURL(i),s(new Error("Archivo de imagen inválido."))},o.src=i})}const lu={promocional:{label:"Promocionales (home)",hint:"Franja entre secciones del home. La web muestra MÁXIMO 3 activos, en orden ascendente."},home_promo:{label:"Carrusel financiación (home)",hint:"Carrusel grande del home con cifra de tasa y pills. Todos los activos rotan, en orden."}};function iN(n,e){const t=Je(Ee(te,"banners"),mt("order","asc"));return Bt(t,r=>{n(r.docs.map(s=>({...s.data(),_docId:s.id})).filter(s=>lu[s.position]))},r=>e&&e(r))}async function oN(n,e){if(!["image/jpeg","image/png","image/webp"].includes(n.type))throw new Error("Formato no válido. Usa JPG, PNG o WebP.");if(n.size>10*1024*1024)throw new Error("Imagen demasiado grande (máx 10MB).");e&&e("Comprimiendo a WebP…");const r=await Uy(n,{maxWidth:1920,quality:.85});e&&e("Subiendo…");const s=n.name.replace(/[^a-zA-Z0-9._-]/g,"_").replace(/\.[^.]+$/,""),i="banners/"+Date.now()+"_"+s+".webp",o=await ny(Nd(Dd,i),r,{contentType:"image/webp"});return ry(o.ref)}async function aN(n,e,t){const r=new Date().toISOString(),s=e._userEmail||"unknown",i={title:e.title,subtitle:e.subtitle||"",position:e.position,order:e.order||0,link:e.link||"",cta:e.cta||"",active:!!e.active,updatedAt:r,updatedBy:s,_version:n?(t&&t._version||0)+1:1};e.image&&(i.image=e.image),e.position==="home_promo"&&(i.badge=e.badge||"",i.eyebrow=e.eyebrow||"",i.rateValue=e.rateValue||"",i.rateLabel=e.rateLabel||"",i.pills=(e.pills||[]).map(o=>(o||"").trim()).filter(Boolean).slice(0,3)),n?(await Xe(be(te,"banners",n),i),Jt("banner_update","banner",i.title)):(i.createdAt=r,i.createdBy=s,await Ut(Ee(te,"banners"),i),Jt("banner_create","banner",i.title))}async function cN(n){await Xe(be(te,"banners",n._docId),{active:!n.active,updatedAt:new Date().toISOString(),_version:(n._version||0)+1})}async function lN(n){if(await yd(be(te,"banners",n._docId)),Jt("banner_delete","banner",n.title||n._docId),n.image&&n.image.indexOf("firebasestorage")!==-1)try{await nC(Nd(Dd,n.image))}catch{}}const uN=[{_docId:"b1",title:"Feria de usados junio",subtitle:"Hasta 10% de descuento",position:"promocional",order:1,link:"busqueda.html",cta:"Ver ofertas",active:!0,image:"",_version:2,createdAt:"2026-06-01T10:00:00.000Z"},{_docId:"b2",title:"Financiación 90%",subtitle:"Tu carro con cuota inicial mínima",position:"home_promo",order:1,link:"simulador-credito.html",cta:"Simular crédito",active:!0,image:"",badge:"NUEVO",eyebrow:"Financiación ALTORRA",rateValue:"1.2%",rateLabel:"tasa mensual desde",pills:["Aprobación 24h","Sin codeudor","Tasa fija"],_version:1,createdAt:"2026-05-15T09:00:00.000Z"},{_docId:"b3",title:"Banner pausado",subtitle:"No visible en la web",position:"promocional",order:2,link:"",cta:"",active:!1,image:"",_version:1,createdAt:"2026-05-10T08:00:00.000Z"}];function dN(n){const e={banners:[],sub:null,loaded:!1},t=Be("banners.create"),r=Be("banners.edit"),s=Be("banners.delete"),i=l("section",{class:"ban"});fe(n),n.append(i);function o(p){const g=!!p;let _=p&&p.image||"";const I={title:l("input",{class:"input",type:"text",maxlength:"90",placeholder:"Título *"}),subtitle:l("input",{class:"input",type:"text",maxlength:"140",placeholder:"Subtítulo"}),position:l("select",{class:"select"},Object.entries(lu).map(([b,R])=>l("option",{value:b,text:R.label}))),order:l("input",{class:"input",type:"number",min:"0",max:"99",value:"0"}),link:l("input",{class:"input",type:"text",maxlength:"200",placeholder:"Enlace (ej: busqueda.html)"}),cta:l("input",{class:"input",type:"text",maxlength:"40",placeholder:"Texto del botón"}),active:l("input",{type:"checkbox"}),badge:l("input",{class:"input",type:"text",maxlength:"20",placeholder:"Badge (ej: NUEVO)"}),eyebrow:l("input",{class:"input",type:"text",maxlength:"60",placeholder:"Antetítulo"}),rateValue:l("input",{class:"input",type:"text",maxlength:"12",placeholder:"Cifra (ej: 1.2%)"}),rateLabel:l("input",{class:"input",type:"text",maxlength:"40",placeholder:"Etiqueta de la cifra"}),pills:[0,1,2].map(b=>l("input",{class:"input",type:"text",maxlength:"30",placeholder:"Pill "+(b+1)}))},S=l("input",{type:"file",accept:"image/jpeg,image/png,image/webp",class:"ban-file"}),A=l("div",{class:"ban-drop"}),V=l("span",{class:"u-caption u-muted",text:""});function k(){fe(A),_?A.append(l("img",{src:_,alt:"Vista previa",class:"ban-drop__img"}),l("span",{class:"u-caption u-muted",text:"Click para cambiar la imagen"})):A.append(l("span",{text:"🖼️"}),l("span",{class:"u-caption u-muted",text:"Click para subir (JPG/PNG/WebP → se comprime a WebP). Recomendado 1200×400+."}))}k(),A.addEventListener("click",()=>S.click()),S.addEventListener("change",async()=>{const b=S.files&&S.files[0];if(S.value="",!!b){if(j.get().mock){_="data:demo",k(),$("Imagen simulada (demo)","ok");return}try{V.textContent="Comprimiendo…",_=await oN(b,R=>{V.textContent=R}),V.textContent="✓ Imagen subida",k()}catch(R){V.textContent="",$(R.message||"No se pudo subir la imagen.","error")}}});const P=l("div",{class:"ban-hp"},[l("p",{class:"u-caption u-muted",text:"Campos del carrusel de financiación:"}),l("div",{class:"ban-modal__grid"},[l("label",{class:"field"},[l("span",{class:"field__label",text:"Badge"}),I.badge]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Antetítulo"}),I.eyebrow]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Cifra"}),I.rateValue]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Etiqueta cifra"}),I.rateLabel])]),l("div",{class:"ban-modal__grid ban-modal__grid--3"},I.pills.map((b,R)=>l("label",{class:"field"},[l("span",{class:"field__label",text:"Pill "+(R+1)}),b])))]),L=()=>{P.style.display=I.position.value==="home_promo"?"":"none"};I.position.addEventListener("change",L),g?(I.title.value=p.title||"",I.subtitle.value=p.subtitle||"",I.position.value=p.position,I.position.disabled=!0,I.order.value=String(p.order||0),I.link.value=p.link||"",I.cta.value=p.cta||"",I.active.checked=p.active!==!1,I.badge.value=p.badge||"",I.eyebrow.value=p.eyebrow||"",I.rateValue.value=p.rateValue||"",I.rateLabel.value=p.rateLabel||"",(p.pills||[]).forEach((b,R)=>{I.pills[R]&&(I.pills[R].value=b)})):I.active.checked=!0,L();const C=l("button",{class:"btn btn--gold",type:"button",text:g?"Guardar cambios":"Crear banner"}),M=l("button",{class:"btn btn--soft",type:"button",text:"Cancelar"}),E=l("div",{class:"rev-modal__overlay"},[l("div",{class:"rev-modal",role:"dialog","aria-modal":"true"},[l("h3",{class:"rev-modal__title",text:g?"Editar banner":"Nuevo banner"}),A,S,V,l("div",{class:"ban-modal__grid"},[l("label",{class:"field"},[l("span",{class:"field__label",text:"Título *"}),I.title]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Subtítulo"}),I.subtitle]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Ubicación"}),I.position]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Orden (menor = primero)"}),I.order]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Enlace"}),I.link]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Botón (CTA)"}),I.cta])]),P,l("label",{class:"rev-check"},[I.active,l("span",{text:"Activo (visible en la web)"})]),l("div",{class:"rev-modal__actions"},[M,C])])]),v=()=>E.remove();M.addEventListener("click",v),E.addEventListener("click",b=>{b.target===E&&v()}),C.addEventListener("click",async()=>{const b=I.title.value.trim();if(!b){$("El título es obligatorio.","error");return}if(!g&&!_){$("Sube la imagen del banner.","error");return}const R={title:b,subtitle:I.subtitle.value.trim(),position:I.position.value,order:parseInt(I.order.value,10)||0,link:I.link.value.trim(),cta:I.cta.value.trim(),active:I.active.checked,image:!g||_!==p.image?_:"",badge:I.badge.value,eyebrow:I.eyebrow.value,rateValue:I.rateValue.value,rateLabel:I.rateLabel.value,pills:I.pills.map(w=>w.value),_userEmail:j.get().user&&j.get().user.email||"unknown"};if(j.get().mock){if(g){const w=e.banners.findIndex(x=>x._docId===p._docId);w>=0&&(e.banners[w]={...e.banners[w],...R,image:_,_version:(e.banners[w]._version||0)+1})}else e.banners.push({...R,image:_,_docId:"b"+Date.now(),_version:1}),e.banners.sort((w,x)=>(w.order||0)-(x.order||0));f(),v(),$(g?"Banner actualizado (demo)":"Banner creado (demo)","ok");return}C.disabled=!0,C.textContent="Guardando…";try{await aN(g?p._docId:null,R,p),v(),$(g?"✓ Banner actualizado":"✓ Banner creado — ya está en el home","ok")}catch(w){C.disabled=!1,C.textContent=g?"Guardar cambios":"Crear banner",$("No se pudo guardar: "+(w.message||w.code),"error")}}),document.body.append(E),I.title.focus()}function c(p){const g=l("button",{class:"btn btn--danger",type:"button",text:"Eliminar definitivamente"}),_=l("button",{class:"btn btn--soft",type:"button",text:"Cancelar"}),I=l("div",{class:"rev-modal__overlay"},[l("div",{class:"rev-modal rev-modal--sm",role:"alertdialog","aria-modal":"true"},[l("h3",{class:"rev-modal__title",text:"¿Eliminar este banner?"}),l("p",{class:"u-caption u-muted",text:`"${p.title}" desaparece de la web al instante (su imagen también se borra). No se puede deshacer — si solo quieres pausarlo, usa Ocultar.`}),l("div",{class:"rev-modal__actions"},[_,g])])]),S=()=>I.remove();_.addEventListener("click",S),I.addEventListener("click",A=>{A.target===I&&S()}),g.addEventListener("click",async()=>{if(j.get().mock){e.banners=e.banners.filter(A=>A._docId!==p._docId),f(),S(),$("Banner eliminado (demo)","ok");return}g.disabled=!0;try{await lN(p),S(),$("✓ Banner eliminado","ok")}catch(A){g.disabled=!1,$("No se pudo eliminar: "+(A.message||A.code),"error")}}),document.body.append(I)}function u(p){const g=[];if(r){const _=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"✏️ Editar"});_.addEventListener("click",()=>o(p));const I=l("button",{class:"btn btn--soft btn--sm",type:"button",text:p.active?"🙈 Ocultar":"👁 Mostrar"});I.addEventListener("click",async()=>{if(j.get().mock){p.active=!p.active,f(),$(p.active?"Banner visible (demo)":"Banner pausado (demo)","ok");return}try{await cN(p),$(p.active?"✓ Banner pausado":"✓ Banner visible","ok")}catch(S){$("No se pudo cambiar: "+(S.message||S.code),"error")}}),g.push(_,I)}if(s){const _=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"🗑","aria-label":"Eliminar"});_.addEventListener("click",()=>c(p)),g.push(_)}return l("article",{class:"ban-card"+(p.active?"":" is-off")},[l("div",{class:"ban-card__thumb"},[p.image&&p.image!=="data:demo"?l("img",{src:p.image,alt:p.title||"",loading:"lazy"}):l("span",{class:"u-caption u-faint",text:p.image==="data:demo"?"🖼️ (demo)":"Sin imagen"})]),l("div",{class:"ban-card__body"},[l("div",{class:"ban-card__head"},[l("span",{class:"chip"+(p.active?" chip--gold":""),text:p.active?"Activo":"Pausado"}),l("span",{class:"u-caption u-faint",text:"Orden "+(p.order||0)})]),l("strong",{class:"u-truncate",text:p.title||"Sin título"}),p.subtitle?l("span",{class:"u-caption u-muted u-truncate",text:p.subtitle}):null,g.length?l("div",{class:"ban-card__actions"},g):null])])}function d(p){const g=lu[p],_=e.banners.filter(S=>S.position===p),I=_.filter(S=>S.active).length;return l("div",{class:"ban-group"},[l("div",{class:"ban-group__head"},[l("h3",{class:"ban-group__title",text:g.label+` (${I} activos)`}),l("p",{class:"u-caption u-muted",text:g.hint})]),_.length?l("div",{class:"ban-grid"},_.map(u)):l("div",{class:"state"},[l("div",{class:"state__msg",text:"Sin banners en esta ubicación."})])])}function f(){fe(i);const p=t?l("button",{class:"btn btn--gold btn--sm",type:"button",text:"＋ Nuevo banner"}):null;if(p&&p.addEventListener("click",()=>o(null)),i.append(l("div",{class:"rev-head"},[l("span",{class:"u-caption u-muted",text:"Lo que ves aquí es lo que la web muestra — los cambios aplican al instante."}),p])),!e.loaded){i.append(l("div",{class:"state"},[l("div",{class:"state__msg",text:"Cargando banners…"})]));return}i.append(d("promocional"),d("home_promo"))}return j.get().mock?(e.banners=uN.map(p=>({...p})),e.loaded=!0,f()):(f(),e.sub=iN(p=>{e.banners=p,e.loaded=!0,f()},()=>$("No se pudieron cargar los banners.","error"))),function(){e.sub&&e.sub(),e.sub=null}}const Ga={};["Audi","BMW","Chevrolet","FIAT","Ford","Honda","Hyundai","Jeep","Kia","Mazda","Mitsubishi","Nissan","Renault","Suzuki","Toyota","Volkswagen"].forEach(n=>{Ga[n.toLowerCase()]="multimedia/Logos/"+n+".webp"});Ga.fiat="multimedia/Logos/FIAT.webp";function By(n){return n?(n.indexOf("multimedia/Logo/")===0&&(n=n.replace("multimedia/Logo/","multimedia/Logos/")),n.indexOf("multimedia/Logos/")>=0&&/\.png$/i.test(n)&&(n=n.replace(/\.png$/i,".webp")),n):""}function pm(n){const e=By(n.logo);if(e&&e.indexOf("http")===0)return e;if(e&&e.indexOf("multimedia/Logos/")>=0&&/\.webp$/i.test(e))return"/"+e.replace(/^\//,"");const t=Ga[n.id]||Ga[(n.nombre||"").toLowerCase()];return t?"/"+t:e||""}function ts(n){return n.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,"")}function hN(n,e){const t=Je(Ee(te,"marcas"),mt("nombre","asc"));return Bt(t,r=>{n(r.docs.map(s=>({...s.data(),_docId:s.id})))},r=>e&&e(r))}async function fN(){const n=await Mt(Ee(te,"vehiculos")),e={};return n.forEach(t=>{const r=t.data().marca;r&&(e[r]=(e[r]||0)+1)}),e}async function pN(n,e){if(!["image/jpeg","image/png","image/webp","image/svg+xml"].includes(n.type))throw new Error("Formato no válido. Usa JPG, PNG, WebP o SVG.");const r=n.name.replace(/[^a-zA-Z0-9._-]/g,"_").replace(/\.[^.]+$/,"");let s=n,i="svg";n.type!=="image/svg+xml"&&(e&&e("Comprimiendo a WebP…"),s=await Uy(n,{maxWidth:512,quality:.9}),i="webp"),e&&e("Subiendo logo…");const o="cars/brand_logo_"+Date.now()+"_"+r+"."+i,c=await ny(Nd(Dd,o),s,{contentType:i==="svg"?"image/svg+xml":"image/webp"});return ry(c.ref)}async function mN(n,e,t){const r=!!n,s=r?n:ts(e.nombre);if(!s)throw new Error("Nombre inválido.");const i={id:s,nombre:e.nombre,descripcion:e.nombre,logo:By(e.logo||""),updatedAt:new Date().toISOString(),updatedBy:e._userEmail||"unknown",_type:"marca",_version:r?(t&&t._version||0)+1:1};return r?(await Xe(be(te,"marcas",s),i),Jt("brand_update","marca "+s,i.nombre)):(await Ac(be(te,"marcas",s),i),Jt("brand_create","marca "+s,i.nombre)),s}async function gN(n){await yd(be(te,"marcas",n._docId)),Jt("brand_delete","marca "+n._docId,"")}const _N=[{_docId:"chevrolet",id:"chevrolet",nombre:"Chevrolet",descripcion:"Chevrolet",logo:"multimedia/Logos/Chevrolet.webp",_version:3},{_docId:"mazda",id:"mazda",nombre:"Mazda",descripcion:"Mazda",logo:"multimedia/Logos/Mazda.webp",_version:1},{_docId:"renault",id:"renault",nombre:"Renault",descripcion:"Renault",logo:"",_version:1}],vN={chevrolet:9,mazda:5,renault:0};function yN(n){const e={brands:[],counts:{},sub:null,loaded:!1},t=Be("brands.create"),r=Be("brands.edit"),s=Be("brands.delete"),i=l("section",{class:"brd"});fe(n),n.append(i);function o(f){const p=!!f;let g=f&&f.logo||"";const _=l("input",{class:"input",type:"text",maxlength:"40",placeholder:"Nombre de la marca *"}),I=l("span",{class:"u-caption u-faint",text:p?"ID: "+f.id+" (fijo)":"ID: —"});p?_.value=f.nombre||"":_.addEventListener("input",()=>{I.textContent="ID: "+(ts(_.value)||"—")});const S=l("input",{type:"file",accept:"image/jpeg,image/png,image/webp,image/svg+xml",class:"ban-file"}),A=l("div",{class:"ban-drop brd-drop"}),V=l("span",{class:"u-caption u-muted",text:""});function k(){fe(A);const E=g?pm({id:p?f.id:ts(_.value),nombre:_.value,logo:g}):"";E&&E!=="data:demo"?A.append(l("img",{src:E,alt:"Logo",class:"brd-drop__img"}),l("span",{class:"u-caption u-muted",text:"Click para cambiar el logo"})):g==="data:demo"?A.append(l("span",{text:"🏷️ (demo)"})):A.append(l("span",{text:"🏷️"}),l("span",{class:"u-caption u-muted",text:"Click para subir logo (JPG/PNG/WebP/SVG → WebP 512px)"}))}k(),A.addEventListener("click",()=>S.click()),S.addEventListener("change",async()=>{const E=S.files&&S.files[0];if(S.value="",!!E){if(j.get().mock){g="data:demo",k(),$("Logo simulado (demo)","ok");return}try{g=await pN(E,v=>{V.textContent=v}),V.textContent="✓ Logo subido",k()}catch(v){V.textContent="",$(v.message||"No se pudo subir el logo.","error")}}});const P=l("button",{class:"btn btn--gold",type:"button",text:p?"Guardar cambios":"Crear marca"}),L=l("button",{class:"btn btn--soft",type:"button",text:"Cancelar"}),C=l("div",{class:"rev-modal__overlay"},[l("div",{class:"rev-modal rev-modal--sm",role:"dialog","aria-modal":"true"},[l("h3",{class:"rev-modal__title",text:p?"Editar marca: "+f.nombre:"Nueva marca"}),A,S,V,l("label",{class:"field"},[l("span",{class:"field__label",text:"Nombre *"}),_,I]),l("div",{class:"rev-modal__actions"},[L,P])])]),M=()=>C.remove();L.addEventListener("click",M),C.addEventListener("click",E=>{E.target===C&&M()}),P.addEventListener("click",async()=>{const E=_.value.trim();if(!E){$("El nombre es obligatorio.","error");return}if(!p&&e.brands.some(b=>b.id===ts(E))){$("Ya existe una marca con ese ID ("+ts(E)+").","error");return}const v={nombre:E,logo:g,_userEmail:j.get().user&&j.get().user.email||"unknown"};if(j.get().mock){if(p){const b=e.brands.findIndex(R=>R._docId===f._docId);b>=0&&(e.brands[b]={...e.brands[b],nombre:E,logo:g,_version:(e.brands[b]._version||0)+1})}else{const b=ts(E);e.brands.push({_docId:b,id:b,nombre:E,logo:g,_version:1}),e.brands.sort((R,w)=>R.nombre.localeCompare(w.nombre))}d(),M(),$(p?"Marca actualizada (demo)":"Marca creada (demo)","ok");return}P.disabled=!0,P.textContent="Guardando…";try{await mN(p?f._docId:null,v,f),M(),$(p?"✓ Marca actualizada":"✓ Marca creada","ok")}catch(b){P.disabled=!1,P.textContent=p?"Guardar cambios":"Crear marca",$("No se pudo guardar: "+(b.message||b.code),"error")}}),document.body.append(C),_.focus()}function c(f){const p=e.counts[f.id]||0,g=l("button",{class:"btn btn--danger",type:"button",text:"Eliminar definitivamente"}),_=l("button",{class:"btn btn--soft",type:"button",text:"Cancelar"}),I=l("div",{class:"rev-modal__overlay"},[l("div",{class:"rev-modal rev-modal--sm",role:"alertdialog","aria-modal":"true"},[l("h3",{class:"rev-modal__title",text:'¿Eliminar la marca "'+f.nombre+'"?'}),p>0?l("p",{class:"u-caption brd-warn",text:`⚠️ Hay ${p} vehículo(s) con esta marca — sus filtros y página de marca quedarían huérfanos. Reasigna o vende esos vehículos antes de borrar.`}):l("p",{class:"u-caption u-muted",text:"Sin vehículos asociados. Desaparece de los filtros públicos al instante."}),l("div",{class:"rev-modal__actions"},[_,g])])]),S=()=>I.remove();_.addEventListener("click",S),I.addEventListener("click",A=>{A.target===I&&S()}),g.addEventListener("click",async()=>{if(j.get().mock){e.brands=e.brands.filter(A=>A._docId!==f._docId),d(),S(),$("Marca eliminada (demo)","ok");return}g.disabled=!0;try{await gN(f),S(),$("✓ Marca eliminada","ok")}catch(A){g.disabled=!1,$("No se pudo eliminar: "+(A.message||A.code),"error")}}),document.body.append(I)}function u(f){const p=e.counts[f.id]||0,g=pm(f),_=[];if(r){const I=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"✏️","aria-label":"Editar"});I.addEventListener("click",()=>o(f)),_.push(I)}if(s){const I=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"🗑","aria-label":"Eliminar"});I.addEventListener("click",()=>c(f)),_.push(I)}return l("article",{class:"brd-card"},[l("div",{class:"brd-card__logo"},[g&&g!=="data:demo"?l("img",{src:g,alt:"",loading:"lazy"}):l("span",{class:"u-caption u-faint",text:"Sin logo"})]),l("strong",{class:"u-truncate",text:f.nombre}),l("span",{class:"u-caption u-muted",text:p+(p===1?" vehículo":" vehículos")}),_.length?l("div",{class:"brd-card__actions"},_):null])}function d(){fe(i);const f=t?l("button",{class:"btn btn--gold btn--sm",type:"button",text:"＋ Nueva marca"}):null;if(f&&f.addEventListener("click",()=>o(null)),i.append(l("div",{class:"rev-head"},[l("span",{class:"u-caption u-muted",text:e.brands.length+" marcas — alimentan los filtros y páginas de marca del sitio."}),f])),!e.loaded){i.append(l("div",{class:"state"},[l("div",{class:"state__msg",text:"Cargando marcas…"})]));return}if(!e.brands.length){i.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"🏷️"}),l("div",{class:"state__title",text:"Sin marcas"})]));return}i.append(l("div",{class:"brd-grid"},e.brands.map(u)))}return j.get().mock?(e.brands=_N.map(f=>({...f})),e.counts={...vN},e.loaded=!0,d()):(d(),e.sub=hN(f=>{e.brands=f,e.loaded=!0,d()},()=>$("No se pudieron cargar las marcas.","error")),fN().then(f=>{e.counts=f,e.loaded&&d()}).catch(()=>{})),function(){e.sub&&e.sub(),e.sub=null}}const bN=["settings.theme","settings.seo","settings.backup"],Bd=[{key:"tipos",title:"Tipos de vehículo",desc:"Nuevo, Usado, etc.",field:"tipo"},{key:"categorias",title:"Categorías",desc:"Sedan, SUV, Pickup, etc.",field:"categoria"},{key:"transmisiones",title:"Transmisiones",desc:"Automática, Mecánica, etc.",field:"transmision"},{key:"combustibles",title:"Combustibles",desc:"Gasolina, Diesel, Eléctrico, etc.",field:"combustible"},{key:"direcciones",title:"Direcciones",desc:"Eléctrica, Hidráulica, etc.",field:"direccion"},{key:"tracciones",title:"Tracciones",desc:"Delantera, 4x4, AWD, etc.",field:"traccion"},{key:"colores",title:"Colores",desc:"Blanco, Negro, Rojo, etc.",field:"color"},{key:"canalesVenta",title:"Canales de venta",desc:"Presencial, WhatsApp, Redes — los usa el CRM al registrar ventas.",field:null},{key:"featSeguridad",title:"Características: Seguridad",desc:"ABS, Airbags, Alarma, etc.",field:"caracteristicas"},{key:"featConfort",title:"Características: Confort",desc:"Aire acondicionado, Asientos cuero, etc.",field:"caracteristicas"},{key:"featTecnologia",title:"Características: Tecnología",desc:"Pantalla táctil, Bluetooth, etc.",field:"caracteristicas"},{key:"featExterior",title:"Características: Exterior",desc:"Luces LED, Rines aluminio, etc.",field:"caracteristicas"},{key:"featInterior",title:"Características: Interior",desc:"Vidrios eléctricos, Tapizado, etc.",field:"caracteristicas"}],$y={tipos:[{value:"nuevo",label:"Nuevo"},{value:"usado",label:"Usado"}],categorias:[{value:"sedan",label:"Sedan"},{value:"suv",label:"SUV"},{value:"hatchback",label:"Hatchback"},{value:"pickup",label:"Pickup"}],transmisiones:[{value:"automatica",label:"Automatica"},{value:"mecanica",label:"Mecanica"}],combustibles:[{value:"gasolina",label:"Gasolina"},{value:"diesel",label:"Diesel"},{value:"electrico",label:"Electrico"},{value:"hibrido",label:"Hibrido"}],direcciones:[{value:"Electrica",label:"Electrica"},{value:"Hidraulica",label:"Hidraulica"},{value:"Mecanica",label:"Mecanica"},{value:"Electrohidraulica",label:"Electrohidraulica"}],tracciones:[{value:"Delantera",label:"Delantera"},{value:"Trasera",label:"Trasera"},{value:"4x4",label:"4x4"},{value:"AWD",label:"AWD"}],colores:[{value:"Blanco",label:"Blanco"},{value:"Negro",label:"Negro"},{value:"Gris",label:"Gris"},{value:"Plata",label:"Plata"},{value:"Rojo",label:"Rojo"},{value:"Azul",label:"Azul"},{value:"Verde",label:"Verde"},{value:"Beige",label:"Beige"}],canalesVenta:[{value:"presencial",label:"Visita presencial"},{value:"whatsapp",label:"WhatsApp"},{value:"redes",label:"Redes sociales"},{value:"referido",label:"Referido"},{value:"otro",label:"Otro"}],featSeguridad:[{value:"Sistema de frenos ABS",label:"ABS"},{value:"Airbags frontales",label:"Airbags frontales"},{value:"Airbags laterales",label:"Airbags laterales"},{value:"Alarma",label:"Alarma"},{value:"Bloqueo central",label:"Bloqueo central"},{value:"Control de estabilidad",label:"Control estabilidad"},{value:"Control de traccion",label:"Control traccion"},{value:"Sensor de reversa",label:"Sensor reversa"},{value:"Camara de reversa",label:"Camara reversa"},{value:"Camara 360",label:"Camara 360"}],featConfort:[{value:"Aire acondicionado",label:"Aire acondicionado"},{value:"Climatizador automatico",label:"Climatizador auto"},{value:"Asientos en cuero",label:"Asientos en cuero"},{value:"Asientos calefactados",label:"Asientos calefactados"},{value:"Asiento electrico",label:"Asiento electrico"},{value:"Volante multifuncional",label:"Volante multifuncional"},{value:"Tapizado en cuero",label:"Tapizado en cuero"},{value:"Techo panoramico",label:"Techo panoramico"}],featTecnologia:[{value:"Pantalla tactil",label:"Pantalla tactil"},{value:"Bluetooth",label:"Bluetooth"},{value:"USB / Auxiliar",label:"USB / Auxiliar"},{value:"Android Auto",label:"Android Auto"},{value:"Apple CarPlay",label:"Apple CarPlay"},{value:"GPS / Navegacion",label:"GPS / Navegacion"},{value:"Radio AM/FM",label:"Radio AM/FM"},{value:"Computador de viaje",label:"Computador de viaje"},{value:"Keyless entry",label:"Keyless entry"},{value:"Boton de encendido",label:"Boton de encendido"}],featExterior:[{value:"Luces LED",label:"Luces LED"},{value:"Luces DRL",label:"Luces DRL"},{value:"Rines de aluminio",label:"Rines de aluminio"},{value:"Barras de techo",label:"Barras de techo"},{value:"Exploradoras",label:"Exploradoras"},{value:"Espejos electricos",label:"Espejos electricos"}],featInterior:[{value:"Vidrios electricos",label:"Vidrios electricos"},{value:"Cierre centralizado",label:"Cierre centralizado"},{value:"Tablero digital",label:"Tablero digital"},{value:"Guantera refrigerada",label:"Guantera refrigerada"},{value:"Apoyabrazos central",label:"Apoyabrazos central"}]};async function wN(){const n=await zn(be(te,"config","listas")),e=n.exists()?n.data():{},t={};return Bd.forEach(({key:r})=>{const s=Array.isArray(e[r])&&e[r].length?e[r]:$y[r];t[r]=s.map(i=>typeof i=="string"?{value:i,label:i}:{value:i.value,label:i.label||i.value})}),t}async function IN(n,e,t){await Ac(be(te,"config","listas"),{[n]:e,updatedAt:new Date().toISOString(),updatedBy:t},{merge:!0}),Jt("list_update","lista "+n,e.length+" opciones")}async function EN(){const n=await Mt(Ee(te,"vehiculos")),e={};Bd.forEach(r=>{r.field&&r.field!=="caracteristicas"&&(e[r.field]={})});const t={};return n.forEach(r=>{const s=r.data();Object.keys(e).forEach(i=>{s[i]&&(e[i][s[i]]=(e[i][s[i]]||0)+1)}),(Array.isArray(s.caracteristicas)?s.caracteristicas:[]).forEach(i=>{t[i]=(t[i]||0)+1})}),{fields:e,features:t}}function mm(n,e,t){return!n.field||!e?0:n.field==="caracteristicas"?e.features[t]||0:e.fields[n.field]&&e.fields[n.field][t]||0}const TN=(()=>{const n=JSON.parse(JSON.stringify($y));return n.transmisiones.push({value:"triptonica",label:"Triptónica"}),n})(),AN={fields:{tipo:{usado:7,nuevo:2},categoria:{suv:4,sedan:3,pickup:2},transmision:{automatica:6,mecanica:3},combustible:{gasolina:8,hibrido:1},direccion:{Electrica:5,Hidraulica:4},traccion:{Delantera:6,"4x4":3},color:{Blanco:3,Negro:3,Gris:2,Rojo:1}},features:{"Aire acondicionado":8,Bluetooth:7,"Camara de reversa":5,"Luces LED":6,"Vidrios electricos":9}};function SN(n){const e={lists:null,counts:null,loaded:!1},t=bN.some(Be),r=l("section",{class:"lst"});if(fe(n),n.append(r),!t){r.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"🔒"}),l("div",{class:"state__title",text:"Sin permiso"}),l("div",{class:"state__msg",text:"Solo quien administra el sitio (permisos settings.*) puede editar los atributos del inventario."})]));return}function s(d,f,p){const g=l("input",{class:"input",type:"text",value:f?f.value:"",placeholder:"Valor (ej: hibrido)"}),_=l("input",{class:"input",type:"text",value:f?f.label:"",placeholder:"Etiqueta (ej: Híbrido)"}),I=f?mm(d,e.counts,f.value):0,S=I>0?l("span",{class:"lst-row__use u-caption u-faint",text:I+" veh."}):null,A=l("button",{class:"lst-row__x",type:"button","aria-label":"Quitar opción",text:"✕"}),V=l("div",{class:"lst-row"},[g,_,S,A]);return g.addEventListener("input",p),_.addEventListener("input",p),A.addEventListener("click",()=>{V.remove(),p()}),V}function i(d,f){const p=l("button",{class:"btn btn--danger",type:"button",text:"Guardar de todas formas"}),g=l("button",{class:"btn btn--soft",type:"button",text:"Cancelar"}),_=l("div",{class:"rev-modal__overlay"},[l("div",{class:"rev-modal rev-modal--sm",role:"alertdialog","aria-modal":"true"},[l("h3",{class:"rev-modal__title",text:"¿Quitar opciones que el inventario usa?"}),l("p",{class:"u-caption lst-warn",text:"⚠️ Estas opciones siguen asignadas a vehículos publicados — al quitarlas, esos vehículos quedan con un valor que ya no existe en los filtros de la web:"}),l("ul",{class:"lst-warn__list"},d.map(S=>l("li",{class:"u-caption",text:`${S.label||S.value} — ${S.n} vehículo(s)`}))),l("div",{class:"rev-modal__actions"},[g,p])])]),I=()=>_.remove();g.addEventListener("click",I),_.addEventListener("click",S=>{S.target===_&&I()}),p.addEventListener("click",()=>{I(),f()}),document.body.append(_)}function o(d){const f=e.lists[d.key],p=l("div",{class:"lst-rows"}),g=l("span",{class:"lst-dirty u-caption",text:"● sin guardar"}),_=l("button",{class:"btn btn--gold btn--sm",type:"button",text:"Guardar",disabled:!0});function I(){_.disabled=!1,g.classList.add("is-on")}f.forEach(P=>p.append(s(d,P,I)));const S=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"＋ Agregar opción"});S.addEventListener("click",()=>{const P=s(d,null,I);p.append(P),P.querySelector("input").focus()});function A(){const P=[];for(const L of p.children){const[C,M]=L.querySelectorAll("input"),E=C.value.trim(),v=M.value.trim();if(!(!E&&!v)){if(!E)return $("Hay una opción sin valor — complétala o quítala.","error"),C.focus(),null;if(P.some(b=>b.value===E))return $(`Valor duplicado: "${E}".`,"error"),C.focus(),null;P.push({value:E,label:v||E})}}return P.length?P:($("La lista no puede quedar vacía — la web volvería a los valores de fábrica.","error"),null)}async function V(P){if(j.get().mock){e.lists[d.key]=P,c(d),$(`Lista "${d.title}" guardada (demo)`,"ok");return}_.disabled=!0,_.textContent="Guardando…";try{await IN(d.key,P,j.get().user&&j.get().user.email||"unknown"),e.lists[d.key]=P,c(d),$(`✓ Lista "${d.title}" guardada`,"ok")}catch(L){_.disabled=!1,_.textContent="Guardar",$("No se pudo guardar: "+(L.message||L.code),"error")}}return _.addEventListener("click",()=>{const P=A();if(!P)return;const L=e.lists[d.key].filter(C=>P.every(M=>M.value!==C.value)).map(C=>({...C,n:mm(d,e.counts,C.value)})).filter(C=>C.n>0);L.length?i(L,()=>V(P)):V(P)}),l("div",{class:"cfg-card lst-card"},[l("div",{class:"lst-card__head"},[l("h3",{class:"cfg-card__title",text:d.title}),g]),l("p",{class:"u-caption u-muted",text:d.desc}),p,l("div",{class:"lst-card__foot"},[S,_])])}function c(d){const f=o(d);f.dataset.list=d.key;const p=r.querySelector(`[data-list="${d.key}"]`);p&&p.replaceWith(f)}function u(){if(fe(r),r.append(l("div",{class:"rev-head"},[l("span",{class:"u-caption u-muted",text:"13 listas alimentan el formulario de vehículos, los filtros públicos de la web y el CRM. Cada lista se guarda por separado; la web recoge el cambio en ≤5 min sin tocar nada."})])),!e.loaded){r.append(l("div",{class:"state"},[l("div",{class:"state__msg",text:"Cargando atributos…"})]));return}r.append(l("div",{class:"lst-grid"},Bd.map(d=>{const f=o(d);return f.dataset.list=d.key,f})))}j.get().mock?(e.lists=JSON.parse(JSON.stringify(TN)),e.counts=AN,e.loaded=!0,u()):(u(),Promise.all([wN(),EN().catch(()=>null)]).then(([d,f])=>{e.lists=d,e.counts=f,e.loaded=!0,u()}).catch(()=>$("No se pudieron cargar los atributos.","error")))}const qy=document.getElementById("app");vb();const RN=new URLSearchParams(location.search).get("mock")==="1",kN={bandeja:Ty,pipeline:jP,agenda:ax,reportes:Tx,contactos:Bx,config:Jx,resenas:sN,banners:dN,marcas:yN,atributos:SN};let jo=null,ds=null,fr=null,uu=null,la=null;function gm(n){if(!ds||n===uu)return;fr&&(fr(),fr=null),j.get().detailLeadId&&j.set({detailLeadId:null}),fr=(kN[n]||Ty)(ds.outlet)||null,ds.setActive(n),uu=n}function CN(){ds=TC(qy),zx(ds.detailRoot),gm(sy()),la=vC(gm)}function PN(){fr&&(fr(),fr=null),la&&(la(),la=null),ds=null,uu=null}function xN(n){n.ready&&(n.user&&jo!=="app"?(jo="app",CN()):!n.user&&jo!=="login"&&(PN(),jo="login",n.detailLeadId&&j.set({detailLeadId:null}),AC(qy)))}j.subscribe(xN);RN?j.set({mock:!0,ready:!0,user:{uid:"u_ceo",email:"demo@altorra.local"},profile:{nombre:"Rodrigo (CEO)",cargo:"CEO",rol:"super_admin"},permissions:["*"]}):dC();
