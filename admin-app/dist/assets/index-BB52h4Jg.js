(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();function sv(n){let e={...n};const t=new Set;function r(){return e}function s(o){const c=typeof o=="function"?o(e):o;c&&(e={...e,...c},t.forEach(l=>l(e)))}function i(o){return t.add(o),()=>t.delete(o)}return{get:r,set:s,subscribe:i}}const z=sv({ready:!1,authError:null,user:null,profile:null,permissions:[],team:[],theme:"light",mock:!1,detailLeadId:null}),Rp="altorra-crm-theme";function iv(){let n=localStorage.getItem(Rp);n!=="light"&&n!=="dark"&&(n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),document.documentElement.dataset.theme=n,z.set({theme:n})}function ov(){const n=document.documentElement.dataset.theme==="dark"?"light":"dark";return document.documentElement.dataset.theme=n,localStorage.setItem(Rp,n),z.set({theme:n}),n}var sh={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cp=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},av=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],o=n[t++],c=n[t++],l=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const i=n[t++],o=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Ml={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],o=s+1<n.length,c=o?n[s+1]:0,l=s+2<n.length,h=l?n[s+2]:0,p=i>>2,m=(i&3)<<4|c>>4;let b=(c&15)<<2|h>>6,A=h&63;l||(A=64,o||(b=64)),r.push(t[p],t[m],t[b],t[A])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Cp(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):av(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const h=s<n.length?t[n.charAt(s)]:64;++s;const m=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||h==null||m==null)throw new cv;const b=i<<2|c>>4;if(r.push(b),h!==64){const A=c<<4&240|h>>2;if(r.push(A),m!==64){const P=h<<6&192|m;r.push(P)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class cv extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const lv=function(n){const e=Cp(n);return Ml.encodeByteArray(e,!0)},Pp=function(n){return lv(n).replace(/\./g,"")},kp=function(n){try{return Ml.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function xp(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const uv=()=>xp().__FIREBASE_DEFAULTS__,dv=()=>{if(typeof process>"u"||typeof sh>"u")return;const n=sh.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},hv=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&kp(n[1]);return e&&JSON.parse(e)},Ca=()=>{try{return uv()||dv()||hv()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Dp=n=>{var e,t;return(t=(e=Ca())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},fv=n=>{const e=Dp(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Np=()=>{var n;return(n=Ca())===null||n===void 0?void 0:n.config},Vp=n=>{var e;return(e=Ca())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ci{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oe(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function pv(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Oe())}function mv(){var n;const e=(n=Ca())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function gv(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function _v(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function yv(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function vv(){const n=Oe();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Op(){return!mv()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Pa(){try{return typeof indexedDB=="object"}catch{return!1}}function bv(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Iv="FirebaseError";class Nt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Iv,Object.setPrototypeOf(this,Nt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,fs.prototype.create)}}class fs{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?wv(i,r):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new Nt(s,c,r)}}function wv(n,e){return n.replace(Ev,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Ev=/\{\$([^}]+)}/g;function Tv(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function li(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],o=e[s];if(ih(i)&&ih(o)){if(!li(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function ih(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xi(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Gs(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function Hs(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Av(n,e){const t=new Sv(n,e);return t.subscribe.bind(t)}class Sv{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Rv(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Cc),s.error===void 0&&(s.error=Cc),s.complete===void 0&&(s.complete=Cc);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Rv(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Cc(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cv=1e3,Pv=2,kv=4*60*60*1e3,xv=.5;function Dv(n,e=Cv,t=Pv){const r=e*Math.pow(t,n),s=Math.round(xv*r*(Math.random()-.5)*2);return Math.min(kv,r+s)}/**
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
 */function Ie(n){return n&&n._delegate?n._delegate:n}class kt{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Nv{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new ci;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e?.identifier),s=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Ov(e))try{this.getOrInitializeService({instanceIdentifier:$n})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=$n){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=$n){return this.instances.has(e)}getOptions(e=$n){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&o.resolve(s)}return s}onInit(e,t){var r;const s=this.normalizeInstanceIdentifier(t),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Vv(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=$n){return this.component?this.component.multipleInstances?e:$n:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Vv(n){return n===$n?void 0:n}function Ov(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lv{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Nv(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ce;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ce||(ce={}));const Mv={debug:ce.DEBUG,verbose:ce.VERBOSE,info:ce.INFO,warn:ce.WARN,error:ce.ERROR,silent:ce.SILENT},Fv=ce.INFO,Uv={[ce.DEBUG]:"log",[ce.VERBOSE]:"log",[ce.INFO]:"info",[ce.WARN]:"warn",[ce.ERROR]:"error"},Bv=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=Uv[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ka{constructor(e){this.name=e,this._logLevel=Fv,this._logHandler=Bv,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ce))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Mv[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ce.DEBUG,...e),this._logHandler(this,ce.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ce.VERBOSE,...e),this._logHandler(this,ce.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ce.INFO,...e),this._logHandler(this,ce.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ce.WARN,...e),this._logHandler(this,ce.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ce.ERROR,...e),this._logHandler(this,ce.ERROR,...e)}}const $v=(n,e)=>e.some(t=>n instanceof t);let oh,ah;function qv(){return oh||(oh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function jv(){return ah||(ah=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Lp=new WeakMap,Wc=new WeakMap,Mp=new WeakMap,Pc=new WeakMap,Fl=new WeakMap;function zv(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",o)},i=()=>{t(fn(n.result)),s()},o=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Lp.set(t,n)}).catch(()=>{}),Fl.set(e,n),e}function Gv(n){if(Wc.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",o),n.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",o),n.addEventListener("abort",o)});Wc.set(n,e)}let Qc={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Wc.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Mp.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return fn(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Hv(n){Qc=n(Qc)}function Kv(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(kc(this),e,...t);return Mp.set(r,e.sort?e.sort():[e]),fn(r)}:jv().includes(n)?function(...e){return n.apply(kc(this),e),fn(Lp.get(this))}:function(...e){return fn(n.apply(kc(this),e))}}function Wv(n){return typeof n=="function"?Kv(n):(n instanceof IDBTransaction&&Gv(n),$v(n,qv())?new Proxy(n,Qc):n)}function fn(n){if(n instanceof IDBRequest)return zv(n);if(Pc.has(n))return Pc.get(n);const e=Wv(n);return e!==n&&(Pc.set(n,e),Fl.set(e,n)),e}const kc=n=>Fl.get(n);function Qv(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(n,e),c=fn(o);return r&&o.addEventListener("upgradeneeded",l=>{r(fn(o.result),l.oldVersion,l.newVersion,fn(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{i&&l.addEventListener("close",()=>i()),s&&l.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const Yv=["get","getKey","getAll","getAllKeys","count"],Jv=["put","add","delete","clear"],xc=new Map;function ch(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(xc.get(e))return xc.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=Jv.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Yv.includes(t)))return;const i=async function(o,...c){const l=this.transaction(o,s?"readwrite":"readonly");let h=l.store;return r&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),s&&l.done]))[0]};return xc.set(e,i),i}Hv(n=>({...n,get:(e,t,r)=>ch(e,t)||n.get(e,t,r),has:(e,t)=>!!ch(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xv{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Zv(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function Zv(n){const e=n.getComponent();return e?.type==="VERSION"}const Yc="@firebase/app",lh="0.11.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jt=new ka("@firebase/app"),eb="@firebase/app-compat",tb="@firebase/analytics-compat",nb="@firebase/analytics",rb="@firebase/app-check-compat",sb="@firebase/app-check",ib="@firebase/auth",ob="@firebase/auth-compat",ab="@firebase/database",cb="@firebase/data-connect",lb="@firebase/database-compat",ub="@firebase/functions",db="@firebase/functions-compat",hb="@firebase/installations",fb="@firebase/installations-compat",pb="@firebase/messaging",mb="@firebase/messaging-compat",gb="@firebase/performance",_b="@firebase/performance-compat",yb="@firebase/remote-config",vb="@firebase/remote-config-compat",bb="@firebase/storage",Ib="@firebase/storage-compat",wb="@firebase/firestore",Eb="@firebase/vertexai",Tb="@firebase/firestore-compat",Ab="firebase",Sb="11.3.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jc="[DEFAULT]",Rb={[Yc]:"fire-core",[eb]:"fire-core-compat",[nb]:"fire-analytics",[tb]:"fire-analytics-compat",[sb]:"fire-app-check",[rb]:"fire-app-check-compat",[ib]:"fire-auth",[ob]:"fire-auth-compat",[ab]:"fire-rtdb",[cb]:"fire-data-connect",[lb]:"fire-rtdb-compat",[ub]:"fire-fn",[db]:"fire-fn-compat",[hb]:"fire-iid",[fb]:"fire-iid-compat",[pb]:"fire-fcm",[mb]:"fire-fcm-compat",[gb]:"fire-perf",[_b]:"fire-perf-compat",[yb]:"fire-rc",[vb]:"fire-rc-compat",[bb]:"fire-gcs",[Ib]:"fire-gcs-compat",[wb]:"fire-fst",[Tb]:"fire-fst-compat",[Eb]:"fire-vertex","fire-js":"fire-js",[Ab]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ko=new Map,Cb=new Map,Xc=new Map;function uh(n,e){try{n.container.addComponent(e)}catch(t){jt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function zt(n){const e=n.name;if(Xc.has(e))return jt.debug(`There were multiple attempts to register component ${e}.`),!1;Xc.set(e,n);for(const t of Ko.values())uh(t,n);for(const t of Cb.values())uh(t,n);return!0}function ps(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function dt(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pb={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},pn=new fs("app","Firebase",Pb);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kb{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new kt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw pn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ms=Sb;function Fp(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Jc,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw pn.create("bad-app-name",{appName:String(s)});if(t||(t=Np()),!t)throw pn.create("no-options");const i=Ko.get(s);if(i){if(li(t,i.options)&&li(r,i.config))return i;throw pn.create("duplicate-app",{appName:s})}const o=new Lv(s);for(const l of Xc.values())o.addComponent(l);const c=new kb(t,r,o);return Ko.set(s,c),c}function Ul(n=Jc){const e=Ko.get(n);if(!e&&n===Jc&&Np())return Fp();if(!e)throw pn.create("no-app",{appName:n});return e}function vt(n,e,t){var r;let s=(r=Rb[n])!==null&&r!==void 0?r:n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const c=[`Unable to register library "${s}" with version "${e}":`];i&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&c.push("and"),o&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),jt.warn(c.join(" "));return}zt(new kt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const xb="firebase-heartbeat-database",Db=1,ui="firebase-heartbeat-store";let Dc=null;function Up(){return Dc||(Dc=Qv(xb,Db,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(ui)}catch(t){console.warn(t)}}}}).catch(n=>{throw pn.create("idb-open",{originalErrorMessage:n.message})})),Dc}async function Nb(n){try{const t=(await Up()).transaction(ui),r=await t.objectStore(ui).get(Bp(n));return await t.done,r}catch(e){if(e instanceof Nt)jt.warn(e.message);else{const t=pn.create("idb-get",{originalErrorMessage:e?.message});jt.warn(t.message)}}}async function dh(n,e){try{const r=(await Up()).transaction(ui,"readwrite");await r.objectStore(ui).put(e,Bp(n)),await r.done}catch(t){if(t instanceof Nt)jt.warn(t.message);else{const r=pn.create("idb-set",{originalErrorMessage:t?.message});jt.warn(r.message)}}}function Bp(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Vb=1024,Ob=30;class Lb{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Fb(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=hh();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>Ob){const o=Ub(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){jt.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=hh(),{heartbeatsToSend:r,unsentEntries:s}=Mb(this._heartbeatsCache.heartbeats),i=Pp(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return jt.warn(t),""}}}function hh(){return new Date().toISOString().substring(0,10)}function Mb(n,e=Vb){const t=[];let r=n.slice();for(const s of n){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),fh(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),fh(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Fb{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Pa()?bv().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Nb(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return dh(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return dh(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function fh(n){return Pp(JSON.stringify({version:2,heartbeats:n})).length}function Ub(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bb(n){zt(new kt("platform-logger",e=>new Xv(e),"PRIVATE")),zt(new kt("heartbeat",e=>new Lb(e),"PRIVATE")),vt(Yc,lh,n),vt(Yc,lh,"esm2017"),vt("fire-js","")}Bb("");function Bl(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(t[r[s]]=n[r[s]]);return t}function $p(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const $b=$p,qp=new fs("auth","Firebase",$p());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wo=new ka("@firebase/auth");function qb(n,...e){Wo.logLevel<=ce.WARN&&Wo.warn(`Auth (${ms}): ${n}`,...e)}function Co(n,...e){Wo.logLevel<=ce.ERROR&&Wo.error(`Auth (${ms}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function It(n,...e){throw $l(n,...e)}function Rt(n,...e){return $l(n,...e)}function jp(n,e,t){const r=Object.assign(Object.assign({},$b()),{[e]:t});return new fs("auth","Firebase",r).create(e,{appName:n.name})}function mn(n){return jp(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function $l(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return qp.create(n,...e)}function X(n,e,...t){if(!n)throw $l(e,...t)}function Ut(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Co(e),new Error(e)}function Gt(n,e){n||Ut(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zc(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function jb(){return ph()==="http:"||ph()==="https:"}function ph(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zb(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(jb()||_v()||"connection"in navigator)?navigator.onLine:!0}function Gb(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Di{constructor(e,t){this.shortDelay=e,this.longDelay=t,Gt(t>e,"Short delay should be less than long delay!"),this.isMobile=pv()||yv()}get(){return zb()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ql(n,e){Gt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zp{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ut("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ut("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ut("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hb={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kb=new Di(3e4,6e4);function pr(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Rn(n,e,t,r,s={}){return Gp(n,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const c=xi(Object.assign({key:n.config.apiKey},o)).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const h=Object.assign({method:e,headers:l},i);return gv()||(h.referrerPolicy="no-referrer"),zp.fetch()(Hp(n,n.config.apiHost,t,c),h)})}async function Gp(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},Hb),e);try{const s=new Qb(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw uo(n,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[l,h]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw uo(n,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw uo(n,"email-already-in-use",o);if(l==="USER_DISABLED")throw uo(n,"user-disabled",o);const p=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw jp(n,p,h);It(n,p)}}catch(s){if(s instanceof Nt)throw s;It(n,"network-request-failed",{message:String(s)})}}async function xa(n,e,t,r,s={}){const i=await Rn(n,e,t,r,s);return"mfaPendingCredential"in i&&It(n,"multi-factor-auth-required",{_serverResponse:i}),i}function Hp(n,e,t,r){const s=`${e}${t}?${r}`;return n.config.emulator?ql(n.config,s):`${n.config.apiScheme}://${s}`}function Wb(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Qb{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Rt(this.auth,"network-request-failed")),Kb.get())})}}function uo(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=Rt(n,e,r);return s.customData._tokenResponse=t,s}function mh(n){return n!==void 0&&n.enterprise!==void 0}class Yb{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Wb(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function Jb(n,e){return Rn(n,"GET","/v2/recaptchaConfig",pr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xb(n,e){return Rn(n,"POST","/v1/accounts:delete",e)}async function Kp(n,e){return Rn(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zs(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Zb(n,e=!1){const t=Ie(n),r=await t.getIdToken(e),s=jl(r);X(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i?.sign_in_provider;return{claims:s,token:r,authTime:Zs(Nc(s.auth_time)),issuedAtTime:Zs(Nc(s.iat)),expirationTime:Zs(Nc(s.exp)),signInProvider:o||null,signInSecondFactor:i?.sign_in_second_factor||null}}function Nc(n){return Number(n)*1e3}function jl(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Co("JWT malformed, contained fewer than 3 sections"),null;try{const s=kp(t);return s?JSON.parse(s):(Co("Failed to decode base64 JWT payload"),null)}catch(s){return Co("Caught error parsing JWT payload as JSON",s?.toString()),null}}function gh(n){const e=jl(n);return X(e,"internal-error"),X(typeof e.exp<"u","internal-error"),X(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function di(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Nt&&eI(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function eI({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tI{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class el{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Zs(this.lastLoginAt),this.creationTime=Zs(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qo(n){var e;const t=n.auth,r=await n.getIdToken(),s=await di(n,Kp(t,{idToken:r}));X(s?.users.length,t,"internal-error");const i=s.users[0];n._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?Wp(i.providerUserInfo):[],c=rI(n.providerData,o),l=n.isAnonymous,h=!(n.email&&i.passwordHash)&&!c?.length,p=l?h:!1,m={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:c,metadata:new el(i.createdAt,i.lastLoginAt),isAnonymous:p};Object.assign(n,m)}async function nI(n){const e=Ie(n);await Qo(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function rI(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Wp(n){return n.map(e=>{var{providerId:t}=e,r=Bl(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sI(n,e){const t=await Gp(n,{},async()=>{const r=xi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,o=Hp(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",zp.fetch()(o,{method:"POST",headers:c,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function iI(n,e){return Rn(n,"POST","/v2/accounts:revokeToken",pr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Br{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){X(e.idToken,"internal-error"),X(typeof e.idToken<"u","internal-error"),X(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):gh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){X(e.length!==0,"internal-error");const t=gh(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(X(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await sI(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,o=new Br;return r&&(X(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(X(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(X(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Br,this.toJSON())}_performRefresh(){return Ut("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function en(n,e){X(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Bt{constructor(e){var{uid:t,auth:r,stsTokenManager:s}=e,i=Bl(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new tI(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new el(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await di(this,this.stsTokenManager.getToken(this.auth,e));return X(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Zb(this,e)}reload(){return nI(this)}_assign(e){this!==e&&(X(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Bt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){X(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Qo(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(dt(this.auth.app))return Promise.reject(mn(this.auth));const e=await this.getIdToken();return await di(this,Xb(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,s,i,o,c,l,h,p;const m=(r=t.displayName)!==null&&r!==void 0?r:void 0,b=(s=t.email)!==null&&s!==void 0?s:void 0,A=(i=t.phoneNumber)!==null&&i!==void 0?i:void 0,P=(o=t.photoURL)!==null&&o!==void 0?o:void 0,R=(c=t.tenantId)!==null&&c!==void 0?c:void 0,S=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,V=(h=t.createdAt)!==null&&h!==void 0?h:void 0,C=(p=t.lastLoginAt)!==null&&p!==void 0?p:void 0,{uid:k,emailVerified:U,isAnonymous:x,providerData:M,stsTokenManager:E}=t;X(k&&E,e,"internal-error");const w=Br.fromJSON(this.name,E);X(typeof k=="string",e,"internal-error"),en(m,e.name),en(b,e.name),X(typeof U=="boolean",e,"internal-error"),X(typeof x=="boolean",e,"internal-error"),en(A,e.name),en(P,e.name),en(R,e.name),en(S,e.name),en(V,e.name),en(C,e.name);const g=new Bt({uid:k,auth:e,email:b,emailVerified:U,displayName:m,isAnonymous:x,photoURL:P,phoneNumber:A,tenantId:R,stsTokenManager:w,createdAt:V,lastLoginAt:C});return M&&Array.isArray(M)&&(g.providerData=M.map(_=>Object.assign({},_))),S&&(g._redirectEventId=S),g}static async _fromIdTokenResponse(e,t,r=!1){const s=new Br;s.updateFromServerResponse(t);const i=new Bt({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Qo(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];X(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Wp(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!i?.length,c=new Br;c.updateFromIdToken(r);const l=new Bt({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new el(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(l,h),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _h=new Map;function $t(n){Gt(n instanceof Function,"Expected a class definition");let e=_h.get(n);return e?(Gt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,_h.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qp{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Qp.type="NONE";const yh=Qp;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Po(n,e,t){return`firebase:${n}:${e}:${t}`}class $r{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Po(this.userKey,s.apiKey,i),this.fullPersistenceKey=Po("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Bt._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new $r($t(yh),e,r);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||$t(yh);const o=Po(r,e.config.apiKey,e.name);let c=null;for(const h of t)try{const p=await h._get(o);if(p){const m=Bt._fromJSON(e,p);h!==i&&(c=m),i=h;break}}catch{}const l=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new $r(i,e,r):(i=l[0],c&&await i._set(o,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new $r(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vh(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Zp(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Yp(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(tm(e))return"Blackberry";if(nm(e))return"Webos";if(Jp(e))return"Safari";if((e.includes("chrome/")||Xp(e))&&!e.includes("edge/"))return"Chrome";if(em(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function Yp(n=Oe()){return/firefox\//i.test(n)}function Jp(n=Oe()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Xp(n=Oe()){return/crios\//i.test(n)}function Zp(n=Oe()){return/iemobile/i.test(n)}function em(n=Oe()){return/android/i.test(n)}function tm(n=Oe()){return/blackberry/i.test(n)}function nm(n=Oe()){return/webos/i.test(n)}function zl(n=Oe()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function oI(n=Oe()){var e;return zl(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function aI(){return vv()&&document.documentMode===10}function rm(n=Oe()){return zl(n)||em(n)||nm(n)||tm(n)||/windows phone/i.test(n)||Zp(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sm(n,e=[]){let t;switch(n){case"Browser":t=vh(Oe());break;case"Worker":t=`${vh(Oe())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ms}/${r}`}/**
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
 */class cI{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((o,c)=>{try{const l=e(i);o(l)}catch(l){c(l)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
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
 */async function lI(n,e={}){return Rn(n,"GET","/v2/passwordPolicy",pr(n,e))}/**
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
 */const uI=6;class dI{constructor(e){var t,r,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:uI,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,s,i,o,c;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(r=l.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(s=l.containsLowercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(i=l.containsUppercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(o=l.containsNumericCharacter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(c=l.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),l}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hI{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new bh(this),this.idTokenSubscription=new bh(this),this.beforeStateQueue=new cI(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=qp,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=$t(t)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await $r.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Kp(this,{idToken:e}),r=await Bt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(dt(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=s?._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===c)&&l?.user&&(s=l.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return X(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Qo(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Gb()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(dt(this.app))return Promise.reject(mn(this));const t=e?Ie(e):null;return t&&X(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&X(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return dt(this.app)?Promise.reject(mn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return dt(this.app)?Promise.reject(mn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence($t(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await lI(this),t=new dI(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new fs("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await iI(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&$t(e)||this._popupRedirectResolver;X(t,this,"argument-error"),this.redirectPersistenceManager=await $r.create(this,[$t(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(X(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,r,s);return()=>{o=!0,l()}}else{const l=e.addObserver(t);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return X(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=sm(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;if(dt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&qb(`Error while retrieving App Check token: ${t.error}`),t?.token}}function gs(n){return Ie(n)}class bh{constructor(e){this.auth=e,this.observer=null,this.addObserver=Av(t=>this.observer=t)}get next(){return X(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Da={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function fI(n){Da=n}function im(n){return Da.loadJS(n)}function pI(){return Da.recaptchaEnterpriseScript}function mI(){return Da.gapiScript}function gI(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class _I{constructor(){this.enterprise=new yI}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class yI{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const vI="recaptcha-enterprise",om="NO_RECAPTCHA";class bI{constructor(e){this.type=vI,this.auth=gs(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,c)=>{Jb(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const h=new Yb(l);return i.tenantId==null?i._agentRecaptchaConfig=h:i._tenantRecaptchaConfigs[i.tenantId]=h,o(h.siteKey)}}).catch(l=>{c(l)})})}function s(i,o,c){const l=window.grecaptcha;mh(l)?l.enterprise.ready(()=>{l.enterprise.execute(i,{action:e}).then(h=>{o(h)}).catch(()=>{o(om)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new _I().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{r(this.auth).then(c=>{if(!t&&mh(window.grecaptcha))s(c,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let l=pI();l.length!==0&&(l+=c),im(l).then(()=>{s(c,i,o)}).catch(h=>{o(h)})}}).catch(c=>{o(c)})})}}async function Ih(n,e,t,r=!1,s=!1){const i=new bI(n);let o;if(s)o=om;else try{o=await i.verify(t)}catch{o=await i.verify(t,!0)}const c=Object.assign({},e);if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const l=c.phoneEnrollmentInfo.phoneNumber,h=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:l,recaptchaToken:h,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const l=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function wh(n,e,t,r,s){var i;if(!((i=n._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await Ih(n,e,t,t==="getOobCode");return r(n,o)}else return r(n,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await Ih(n,e,t,t==="getOobCode");return r(n,c)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function II(n,e){const t=ps(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(li(i,e??{}))return s;It(s,"already-initialized")}return t.initialize({options:e})}function wI(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map($t);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function EI(n,e,t){const r=gs(n);X(r._canInitEmulator,r,"emulator-config-failed"),X(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=am(e),{host:o,port:c}=TI(e),l=c===null?"":`:${c}`;r.config.emulator={url:`${i}//${o}${l}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),AI()}function am(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function TI(n){const e=am(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Eh(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:Eh(o)}}}function Eh(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function AI(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gl{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Ut("not implemented")}_getIdTokenResponse(e){return Ut("not implemented")}_linkToIdToken(e,t){return Ut("not implemented")}_getReauthenticationResolver(e){return Ut("not implemented")}}async function SI(n,e){return Rn(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function RI(n,e){return xa(n,"POST","/v1/accounts:signInWithPassword",pr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function CI(n,e){return xa(n,"POST","/v1/accounts:signInWithEmailLink",pr(n,e))}async function PI(n,e){return xa(n,"POST","/v1/accounts:signInWithEmailLink",pr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hi extends Gl{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new hi(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new hi(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return wh(e,t,"signInWithPassword",RI);case"emailLink":return CI(e,{email:this._email,oobCode:this._password});default:It(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return wh(e,r,"signUpPassword",SI);case"emailLink":return PI(e,{idToken:t,email:this._email,oobCode:this._password});default:It(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qr(n,e){return xa(n,"POST","/v1/accounts:signInWithIdp",pr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kI="http://localhost";class rr extends Gl{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new rr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):It("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=t,i=Bl(t,["providerId","signInMethod"]);if(!r||!s)return null;const o=new rr(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return qr(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,qr(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,qr(e,t)}buildRequest(){const e={requestUri:kI,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=xi(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xI(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function DI(n){const e=Gs(Hs(n)).link,t=e?Gs(Hs(e)).deep_link_id:null,r=Gs(Hs(n)).deep_link_id;return(r?Gs(Hs(r)).link:null)||r||t||e||n}class Hl{constructor(e){var t,r,s,i,o,c;const l=Gs(Hs(e)),h=(t=l.apiKey)!==null&&t!==void 0?t:null,p=(r=l.oobCode)!==null&&r!==void 0?r:null,m=xI((s=l.mode)!==null&&s!==void 0?s:null);X(h&&p&&m,"argument-error"),this.apiKey=h,this.operation=m,this.code=p,this.continueUrl=(i=l.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(o=l.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(c=l.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const t=DI(e);try{return new Hl(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _s{constructor(){this.providerId=_s.PROVIDER_ID}static credential(e,t){return hi._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=Hl.parseLink(t);return X(r,"argument-error"),hi._fromEmailAndCode(e,r.code,r.tenantId)}}_s.PROVIDER_ID="password";_s.EMAIL_PASSWORD_SIGN_IN_METHOD="password";_s.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cm{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ni extends cm{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class an extends Ni{constructor(){super("facebook.com")}static credential(e){return rr._fromParams({providerId:an.PROVIDER_ID,signInMethod:an.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return an.credentialFromTaggedObject(e)}static credentialFromError(e){return an.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return an.credential(e.oauthAccessToken)}catch{return null}}}an.FACEBOOK_SIGN_IN_METHOD="facebook.com";an.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cn extends Ni{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return rr._fromParams({providerId:cn.PROVIDER_ID,signInMethod:cn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return cn.credentialFromTaggedObject(e)}static credentialFromError(e){return cn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return cn.credential(t,r)}catch{return null}}}cn.GOOGLE_SIGN_IN_METHOD="google.com";cn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ln extends Ni{constructor(){super("github.com")}static credential(e){return rr._fromParams({providerId:ln.PROVIDER_ID,signInMethod:ln.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ln.credentialFromTaggedObject(e)}static credentialFromError(e){return ln.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ln.credential(e.oauthAccessToken)}catch{return null}}}ln.GITHUB_SIGN_IN_METHOD="github.com";ln.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class un extends Ni{constructor(){super("twitter.com")}static credential(e,t){return rr._fromParams({providerId:un.PROVIDER_ID,signInMethod:un.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return un.credentialFromTaggedObject(e)}static credentialFromError(e){return un.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return un.credential(t,r)}catch{return null}}}un.TWITTER_SIGN_IN_METHOD="twitter.com";un.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await Bt._fromIdTokenResponse(e,r,s),o=Th(r);return new Wr({user:i,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=Th(r);return new Wr({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function Th(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yo extends Nt{constructor(e,t,r,s){var i;super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Yo.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new Yo(e,t,r,s)}}function lm(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Yo._fromErrorAndOperation(n,i,e,r):i})}async function NI(n,e,t=!1){const r=await di(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Wr._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function VI(n,e,t=!1){const{auth:r}=n;if(dt(r.app))return Promise.reject(mn(r));const s="reauthenticate";try{const i=await di(n,lm(r,s,e,n),t);X(i.idToken,r,"internal-error");const o=jl(i.idToken);X(o,r,"internal-error");const{sub:c}=o;return X(n.uid===c,r,"user-mismatch"),Wr._forOperation(n,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&It(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function um(n,e,t=!1){if(dt(n.app))return Promise.reject(mn(n));const r="signIn",s=await lm(n,r,e),i=await Wr._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function OI(n,e){return um(gs(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function LI(n){const e=gs(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function MI(n,e,t){return dt(n.app)?Promise.reject(mn(n)):OI(Ie(n),_s.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&LI(n),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function FI(n,e){return Ie(n).setPersistence(e)}function UI(n,e,t,r){return Ie(n).onIdTokenChanged(e,t,r)}function BI(n,e,t){return Ie(n).beforeAuthStateChanged(e,t)}function $I(n,e,t,r){return Ie(n).onAuthStateChanged(e,t,r)}function qI(n){return Ie(n).signOut()}const Jo="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dm{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Jo,"1"),this.storage.removeItem(Jo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jI=1e3,zI=10;class hm extends dm{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=rm(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,l)=>{this.notifyListeners(o,l)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);aI()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,zI):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},jI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}hm.type="LOCAL";const fm=hm;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pm extends dm{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}pm.type="SESSION";const mm=pm;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function GI(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Na{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Na(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(o).map(async h=>h(t.origin,i)),l=await GI(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Na.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kl(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HI{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,l)=>{const h=Kl("",20);s.port1.start();const p=setTimeout(()=>{l(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(m){const b=m;if(b.data.eventId===h)switch(b.data.status){case"ack":clearTimeout(p),i=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(b.data.response);break;default:clearTimeout(p),clearTimeout(i),l(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ct(){return window}function KI(n){Ct().location.href=n}/**
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
 */function gm(){return typeof Ct().WorkerGlobalScope<"u"&&typeof Ct().importScripts=="function"}async function WI(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function QI(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function YI(){return gm()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _m="firebaseLocalStorageDb",JI=1,Xo="firebaseLocalStorage",ym="fbase_key";class Vi{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Va(n,e){return n.transaction([Xo],e?"readwrite":"readonly").objectStore(Xo)}function XI(){const n=indexedDB.deleteDatabase(_m);return new Vi(n).toPromise()}function tl(){const n=indexedDB.open(_m,JI);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Xo,{keyPath:ym})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Xo)?e(r):(r.close(),await XI(),e(await tl()))})})}async function Ah(n,e,t){const r=Va(n,!0).put({[ym]:e,value:t});return new Vi(r).toPromise()}async function ZI(n,e){const t=Va(n,!1).get(e),r=await new Vi(t).toPromise();return r===void 0?null:r.value}function Sh(n,e){const t=Va(n,!0).delete(e);return new Vi(t).toPromise()}const ew=800,tw=3;class vm{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await tl(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>tw)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return gm()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Na._getInstance(YI()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await WI(),!this.activeServiceWorker)return;this.sender=new HI(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||QI()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await tl();return await Ah(e,Jo,"1"),await Sh(e,Jo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Ah(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>ZI(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Sh(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Va(s,!1).getAll();return new Vi(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),ew)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}vm.type="LOCAL";const nw=vm;new Di(3e4,6e4);/**
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
 */function rw(n,e){return e?$t(e):(X(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wl extends Gl{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return qr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return qr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return qr(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function sw(n){return um(n.auth,new Wl(n),n.bypassAuthState)}function iw(n){const{auth:e,user:t}=n;return X(t,e,"internal-error"),VI(t,new Wl(n),n.bypassAuthState)}async function ow(n){const{auth:e,user:t}=n;return X(t,e,"internal-error"),NI(t,new Wl(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bm{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return sw;case"linkViaPopup":case"linkViaRedirect":return ow;case"reauthViaPopup":case"reauthViaRedirect":return iw;default:It(this.auth,"internal-error")}}resolve(e){Gt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Gt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aw=new Di(2e3,1e4);class Fr extends bm{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Fr.currentPopupAction&&Fr.currentPopupAction.cancel(),Fr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return X(e,this.auth,"internal-error"),e}async onExecution(){Gt(this.filter.length===1,"Popup operations only handle one event");const e=Kl();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Rt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Rt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Fr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Rt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,aw.get())};e()}}Fr.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cw="pendingRedirect",ko=new Map;class lw extends bm{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=ko.get(this.auth._key());if(!e){try{const r=await uw(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}ko.set(this.auth._key(),e)}return this.bypassAuthState||ko.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function uw(n,e){const t=fw(e),r=hw(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function dw(n,e){ko.set(n._key(),e)}function hw(n){return $t(n._redirectPersistence)}function fw(n){return Po(cw,n.config.apiKey,n.name)}async function pw(n,e,t=!1){if(dt(n.app))return Promise.reject(mn(n));const r=gs(n),s=rw(r,e),o=await new lw(r,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mw=10*60*1e3;class gw{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!_w(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Im(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Rt(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=mw&&this.cachedEventUids.clear(),this.cachedEventUids.has(Rh(e))}saveEventToCache(e){this.cachedEventUids.add(Rh(e)),this.lastProcessedEventTime=Date.now()}}function Rh(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Im({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function _w(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Im(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yw(n,e={}){return Rn(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vw=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,bw=/^https?/;async function Iw(n){if(n.config.emulator)return;const{authorizedDomains:e}=await yw(n);for(const t of e)try{if(ww(t))return}catch{}It(n,"unauthorized-domain")}function ww(n){const e=Zc(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!bw.test(t))return!1;if(vw.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const Ew=new Di(3e4,6e4);function Ch(){const n=Ct().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Tw(n){return new Promise((e,t)=>{var r,s,i;function o(){Ch(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ch(),t(Rt(n,"network-request-failed"))},timeout:Ew.get()})}if(!((s=(r=Ct().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=Ct().gapi)===null||i===void 0)&&i.load)o();else{const c=gI("iframefcb");return Ct()[c]=()=>{gapi.load?o():t(Rt(n,"network-request-failed"))},im(`${mI()}?onload=${c}`).catch(l=>t(l))}}).catch(e=>{throw xo=null,e})}let xo=null;function Aw(n){return xo=xo||Tw(n),xo}/**
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
 */const Sw=new Di(5e3,15e3),Rw="__/auth/iframe",Cw="emulator/auth/iframe",Pw={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},kw=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function xw(n){const e=n.config;X(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?ql(e,Cw):`https://${n.config.authDomain}/${Rw}`,r={apiKey:e.apiKey,appName:n.name,v:ms},s=kw.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${xi(r).slice(1)}`}async function Dw(n){const e=await Aw(n),t=Ct().gapi;return X(t,n,"internal-error"),e.open({where:document.body,url:xw(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Pw,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=Rt(n,"network-request-failed"),c=Ct().setTimeout(()=>{i(o)},Sw.get());function l(){Ct().clearTimeout(c),s(r)}r.ping(l).then(l,()=>{i(o)})}))}/**
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
 */const Nw={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Vw=500,Ow=600,Lw="_blank",Mw="http://localhost";class Ph{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Fw(n,e,t,r=Vw,s=Ow){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const l=Object.assign(Object.assign({},Nw),{width:r.toString(),height:s.toString(),top:i,left:o}),h=Oe().toLowerCase();t&&(c=Xp(h)?Lw:t),Yp(h)&&(e=e||Mw,l.scrollbars="yes");const p=Object.entries(l).reduce((b,[A,P])=>`${b}${A}=${P},`,"");if(oI(h)&&c!=="_self")return Uw(e||"",c),new Ph(null);const m=window.open(e||"",c,p);X(m,n,"popup-blocked");try{m.focus()}catch{}return new Ph(m)}function Uw(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const Bw="__/auth/handler",$w="emulator/auth/handler",qw=encodeURIComponent("fac");async function kh(n,e,t,r,s,i){X(n.config.authDomain,n,"auth-domain-config-required"),X(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:ms,eventId:s};if(e instanceof cm){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Tv(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,m]of Object.entries({}))o[p]=m}if(e instanceof Ni){const p=e.getScopes().filter(m=>m!=="");p.length>0&&(o.scopes=p.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const p of Object.keys(c))c[p]===void 0&&delete c[p];const l=await n._getAppCheckToken(),h=l?`#${qw}=${encodeURIComponent(l)}`:"";return`${jw(n)}?${xi(c).slice(1)}${h}`}function jw({config:n}){return n.emulator?ql(n,$w):`https://${n.authDomain}/${Bw}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vc="webStorageSupport";class zw{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=mm,this._completeRedirectFn=pw,this._overrideRedirectResult=dw}async _openPopup(e,t,r,s){var i;Gt((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await kh(e,t,r,Zc(),s);return Fw(e,o,Kl())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await kh(e,t,r,Zc(),s);return KI(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(Gt(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await Dw(e),r=new gw(e);return t.register("authEvent",s=>(X(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Vc,{type:Vc},s=>{var i;const o=(i=s?.[0])===null||i===void 0?void 0:i[Vc];o!==void 0&&t(!!o),It(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Iw(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return rm()||Jp()||zl()}}const Gw=zw;var xh="@firebase/auth",Dh="1.9.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hw{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){X(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kw(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Ww(n){zt(new kt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;X(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:sm(n)},h=new hI(r,s,i,l);return wI(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),zt(new kt("auth-internal",e=>{const t=gs(e.getProvider("auth").getImmediate());return(r=>new Hw(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),vt(xh,Dh,Kw(n)),vt(xh,Dh,"esm2017")}/**
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
 */const Qw=5*60,Yw=Vp("authIdTokenMaxAge")||Qw;let Nh=null;const Jw=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>Yw)return;const s=t?.token;Nh!==s&&(Nh=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Xw(n=Ul()){const e=ps(n,"auth");if(e.isInitialized())return e.getImmediate();const t=II(n,{popupRedirectResolver:Gw,persistence:[nw,fm,mm]}),r=Vp("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=Jw(i.toString());BI(t,o,()=>o(t.currentUser)),UI(t,c=>o(c))}}const s=Dp("auth");return s&&EI(t,`http://${s}`),t}function Zw(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}fI({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=Rt("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",Zw().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Ww("Browser");var Vh=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var gn,wm;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,w){function g(){}g.prototype=w.prototype,E.D=w.prototype,E.prototype=new g,E.prototype.constructor=E,E.C=function(_,I,T){for(var v=Array(arguments.length-2),$=2;$<arguments.length;$++)v[$-2]=arguments[$];return w.prototype[I].apply(_,v)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,w,g){g||(g=0);var _=Array(16);if(typeof w=="string")for(var I=0;16>I;++I)_[I]=w.charCodeAt(g++)|w.charCodeAt(g++)<<8|w.charCodeAt(g++)<<16|w.charCodeAt(g++)<<24;else for(I=0;16>I;++I)_[I]=w[g++]|w[g++]<<8|w[g++]<<16|w[g++]<<24;w=E.g[0],g=E.g[1],I=E.g[2];var T=E.g[3],v=w+(T^g&(I^T))+_[0]+3614090360&4294967295;w=g+(v<<7&4294967295|v>>>25),v=T+(I^w&(g^I))+_[1]+3905402710&4294967295,T=w+(v<<12&4294967295|v>>>20),v=I+(g^T&(w^g))+_[2]+606105819&4294967295,I=T+(v<<17&4294967295|v>>>15),v=g+(w^I&(T^w))+_[3]+3250441966&4294967295,g=I+(v<<22&4294967295|v>>>10),v=w+(T^g&(I^T))+_[4]+4118548399&4294967295,w=g+(v<<7&4294967295|v>>>25),v=T+(I^w&(g^I))+_[5]+1200080426&4294967295,T=w+(v<<12&4294967295|v>>>20),v=I+(g^T&(w^g))+_[6]+2821735955&4294967295,I=T+(v<<17&4294967295|v>>>15),v=g+(w^I&(T^w))+_[7]+4249261313&4294967295,g=I+(v<<22&4294967295|v>>>10),v=w+(T^g&(I^T))+_[8]+1770035416&4294967295,w=g+(v<<7&4294967295|v>>>25),v=T+(I^w&(g^I))+_[9]+2336552879&4294967295,T=w+(v<<12&4294967295|v>>>20),v=I+(g^T&(w^g))+_[10]+4294925233&4294967295,I=T+(v<<17&4294967295|v>>>15),v=g+(w^I&(T^w))+_[11]+2304563134&4294967295,g=I+(v<<22&4294967295|v>>>10),v=w+(T^g&(I^T))+_[12]+1804603682&4294967295,w=g+(v<<7&4294967295|v>>>25),v=T+(I^w&(g^I))+_[13]+4254626195&4294967295,T=w+(v<<12&4294967295|v>>>20),v=I+(g^T&(w^g))+_[14]+2792965006&4294967295,I=T+(v<<17&4294967295|v>>>15),v=g+(w^I&(T^w))+_[15]+1236535329&4294967295,g=I+(v<<22&4294967295|v>>>10),v=w+(I^T&(g^I))+_[1]+4129170786&4294967295,w=g+(v<<5&4294967295|v>>>27),v=T+(g^I&(w^g))+_[6]+3225465664&4294967295,T=w+(v<<9&4294967295|v>>>23),v=I+(w^g&(T^w))+_[11]+643717713&4294967295,I=T+(v<<14&4294967295|v>>>18),v=g+(T^w&(I^T))+_[0]+3921069994&4294967295,g=I+(v<<20&4294967295|v>>>12),v=w+(I^T&(g^I))+_[5]+3593408605&4294967295,w=g+(v<<5&4294967295|v>>>27),v=T+(g^I&(w^g))+_[10]+38016083&4294967295,T=w+(v<<9&4294967295|v>>>23),v=I+(w^g&(T^w))+_[15]+3634488961&4294967295,I=T+(v<<14&4294967295|v>>>18),v=g+(T^w&(I^T))+_[4]+3889429448&4294967295,g=I+(v<<20&4294967295|v>>>12),v=w+(I^T&(g^I))+_[9]+568446438&4294967295,w=g+(v<<5&4294967295|v>>>27),v=T+(g^I&(w^g))+_[14]+3275163606&4294967295,T=w+(v<<9&4294967295|v>>>23),v=I+(w^g&(T^w))+_[3]+4107603335&4294967295,I=T+(v<<14&4294967295|v>>>18),v=g+(T^w&(I^T))+_[8]+1163531501&4294967295,g=I+(v<<20&4294967295|v>>>12),v=w+(I^T&(g^I))+_[13]+2850285829&4294967295,w=g+(v<<5&4294967295|v>>>27),v=T+(g^I&(w^g))+_[2]+4243563512&4294967295,T=w+(v<<9&4294967295|v>>>23),v=I+(w^g&(T^w))+_[7]+1735328473&4294967295,I=T+(v<<14&4294967295|v>>>18),v=g+(T^w&(I^T))+_[12]+2368359562&4294967295,g=I+(v<<20&4294967295|v>>>12),v=w+(g^I^T)+_[5]+4294588738&4294967295,w=g+(v<<4&4294967295|v>>>28),v=T+(w^g^I)+_[8]+2272392833&4294967295,T=w+(v<<11&4294967295|v>>>21),v=I+(T^w^g)+_[11]+1839030562&4294967295,I=T+(v<<16&4294967295|v>>>16),v=g+(I^T^w)+_[14]+4259657740&4294967295,g=I+(v<<23&4294967295|v>>>9),v=w+(g^I^T)+_[1]+2763975236&4294967295,w=g+(v<<4&4294967295|v>>>28),v=T+(w^g^I)+_[4]+1272893353&4294967295,T=w+(v<<11&4294967295|v>>>21),v=I+(T^w^g)+_[7]+4139469664&4294967295,I=T+(v<<16&4294967295|v>>>16),v=g+(I^T^w)+_[10]+3200236656&4294967295,g=I+(v<<23&4294967295|v>>>9),v=w+(g^I^T)+_[13]+681279174&4294967295,w=g+(v<<4&4294967295|v>>>28),v=T+(w^g^I)+_[0]+3936430074&4294967295,T=w+(v<<11&4294967295|v>>>21),v=I+(T^w^g)+_[3]+3572445317&4294967295,I=T+(v<<16&4294967295|v>>>16),v=g+(I^T^w)+_[6]+76029189&4294967295,g=I+(v<<23&4294967295|v>>>9),v=w+(g^I^T)+_[9]+3654602809&4294967295,w=g+(v<<4&4294967295|v>>>28),v=T+(w^g^I)+_[12]+3873151461&4294967295,T=w+(v<<11&4294967295|v>>>21),v=I+(T^w^g)+_[15]+530742520&4294967295,I=T+(v<<16&4294967295|v>>>16),v=g+(I^T^w)+_[2]+3299628645&4294967295,g=I+(v<<23&4294967295|v>>>9),v=w+(I^(g|~T))+_[0]+4096336452&4294967295,w=g+(v<<6&4294967295|v>>>26),v=T+(g^(w|~I))+_[7]+1126891415&4294967295,T=w+(v<<10&4294967295|v>>>22),v=I+(w^(T|~g))+_[14]+2878612391&4294967295,I=T+(v<<15&4294967295|v>>>17),v=g+(T^(I|~w))+_[5]+4237533241&4294967295,g=I+(v<<21&4294967295|v>>>11),v=w+(I^(g|~T))+_[12]+1700485571&4294967295,w=g+(v<<6&4294967295|v>>>26),v=T+(g^(w|~I))+_[3]+2399980690&4294967295,T=w+(v<<10&4294967295|v>>>22),v=I+(w^(T|~g))+_[10]+4293915773&4294967295,I=T+(v<<15&4294967295|v>>>17),v=g+(T^(I|~w))+_[1]+2240044497&4294967295,g=I+(v<<21&4294967295|v>>>11),v=w+(I^(g|~T))+_[8]+1873313359&4294967295,w=g+(v<<6&4294967295|v>>>26),v=T+(g^(w|~I))+_[15]+4264355552&4294967295,T=w+(v<<10&4294967295|v>>>22),v=I+(w^(T|~g))+_[6]+2734768916&4294967295,I=T+(v<<15&4294967295|v>>>17),v=g+(T^(I|~w))+_[13]+1309151649&4294967295,g=I+(v<<21&4294967295|v>>>11),v=w+(I^(g|~T))+_[4]+4149444226&4294967295,w=g+(v<<6&4294967295|v>>>26),v=T+(g^(w|~I))+_[11]+3174756917&4294967295,T=w+(v<<10&4294967295|v>>>22),v=I+(w^(T|~g))+_[2]+718787259&4294967295,I=T+(v<<15&4294967295|v>>>17),v=g+(T^(I|~w))+_[9]+3951481745&4294967295,E.g[0]=E.g[0]+w&4294967295,E.g[1]=E.g[1]+(I+(v<<21&4294967295|v>>>11))&4294967295,E.g[2]=E.g[2]+I&4294967295,E.g[3]=E.g[3]+T&4294967295}r.prototype.u=function(E,w){w===void 0&&(w=E.length);for(var g=w-this.blockSize,_=this.B,I=this.h,T=0;T<w;){if(I==0)for(;T<=g;)s(this,E,T),T+=this.blockSize;if(typeof E=="string"){for(;T<w;)if(_[I++]=E.charCodeAt(T++),I==this.blockSize){s(this,_),I=0;break}}else for(;T<w;)if(_[I++]=E[T++],I==this.blockSize){s(this,_),I=0;break}}this.h=I,this.o+=w},r.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var w=1;w<E.length-8;++w)E[w]=0;var g=8*this.o;for(w=E.length-8;w<E.length;++w)E[w]=g&255,g/=256;for(this.u(E),E=Array(16),w=g=0;4>w;++w)for(var _=0;32>_;_+=8)E[g++]=this.g[w]>>>_&255;return E};function i(E,w){var g=c;return Object.prototype.hasOwnProperty.call(g,E)?g[E]:g[E]=w(E)}function o(E,w){this.h=w;for(var g=[],_=!0,I=E.length-1;0<=I;I--){var T=E[I]|0;_&&T==w||(g[I]=T,_=!1)}this.g=g}var c={};function l(E){return-128<=E&&128>E?i(E,function(w){return new o([w|0],0>w?-1:0)}):new o([E|0],0>E?-1:0)}function h(E){if(isNaN(E)||!isFinite(E))return m;if(0>E)return S(h(-E));for(var w=[],g=1,_=0;E>=g;_++)w[_]=E/g|0,g*=4294967296;return new o(w,0)}function p(E,w){if(E.length==0)throw Error("number format error: empty string");if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(E.charAt(0)=="-")return S(p(E.substring(1),w));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var g=h(Math.pow(w,8)),_=m,I=0;I<E.length;I+=8){var T=Math.min(8,E.length-I),v=parseInt(E.substring(I,I+T),w);8>T?(T=h(Math.pow(w,T)),_=_.j(T).add(h(v))):(_=_.j(g),_=_.add(h(v)))}return _}var m=l(0),b=l(1),A=l(16777216);n=o.prototype,n.m=function(){if(R(this))return-S(this).m();for(var E=0,w=1,g=0;g<this.g.length;g++){var _=this.i(g);E+=(0<=_?_:4294967296+_)*w,w*=4294967296}return E},n.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(P(this))return"0";if(R(this))return"-"+S(this).toString(E);for(var w=h(Math.pow(E,6)),g=this,_="";;){var I=U(g,w).g;g=V(g,I.j(w));var T=((0<g.g.length?g.g[0]:g.h)>>>0).toString(E);if(g=I,P(g))return T+_;for(;6>T.length;)T="0"+T;_=T+_}},n.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function P(E){if(E.h!=0)return!1;for(var w=0;w<E.g.length;w++)if(E.g[w]!=0)return!1;return!0}function R(E){return E.h==-1}n.l=function(E){return E=V(this,E),R(E)?-1:P(E)?0:1};function S(E){for(var w=E.g.length,g=[],_=0;_<w;_++)g[_]=~E.g[_];return new o(g,~E.h).add(b)}n.abs=function(){return R(this)?S(this):this},n.add=function(E){for(var w=Math.max(this.g.length,E.g.length),g=[],_=0,I=0;I<=w;I++){var T=_+(this.i(I)&65535)+(E.i(I)&65535),v=(T>>>16)+(this.i(I)>>>16)+(E.i(I)>>>16);_=v>>>16,T&=65535,v&=65535,g[I]=v<<16|T}return new o(g,g[g.length-1]&-2147483648?-1:0)};function V(E,w){return E.add(S(w))}n.j=function(E){if(P(this)||P(E))return m;if(R(this))return R(E)?S(this).j(S(E)):S(S(this).j(E));if(R(E))return S(this.j(S(E)));if(0>this.l(A)&&0>E.l(A))return h(this.m()*E.m());for(var w=this.g.length+E.g.length,g=[],_=0;_<2*w;_++)g[_]=0;for(_=0;_<this.g.length;_++)for(var I=0;I<E.g.length;I++){var T=this.i(_)>>>16,v=this.i(_)&65535,$=E.i(I)>>>16,se=E.i(I)&65535;g[2*_+2*I]+=v*se,C(g,2*_+2*I),g[2*_+2*I+1]+=T*se,C(g,2*_+2*I+1),g[2*_+2*I+1]+=v*$,C(g,2*_+2*I+1),g[2*_+2*I+2]+=T*$,C(g,2*_+2*I+2)}for(_=0;_<w;_++)g[_]=g[2*_+1]<<16|g[2*_];for(_=w;_<2*w;_++)g[_]=0;return new o(g,0)};function C(E,w){for(;(E[w]&65535)!=E[w];)E[w+1]+=E[w]>>>16,E[w]&=65535,w++}function k(E,w){this.g=E,this.h=w}function U(E,w){if(P(w))throw Error("division by zero");if(P(E))return new k(m,m);if(R(E))return w=U(S(E),w),new k(S(w.g),S(w.h));if(R(w))return w=U(E,S(w)),new k(S(w.g),w.h);if(30<E.g.length){if(R(E)||R(w))throw Error("slowDivide_ only works with positive integers.");for(var g=b,_=w;0>=_.l(E);)g=x(g),_=x(_);var I=M(g,1),T=M(_,1);for(_=M(_,2),g=M(g,2);!P(_);){var v=T.add(_);0>=v.l(E)&&(I=I.add(g),T=v),_=M(_,1),g=M(g,1)}return w=V(E,I.j(w)),new k(I,w)}for(I=m;0<=E.l(w);){for(g=Math.max(1,Math.floor(E.m()/w.m())),_=Math.ceil(Math.log(g)/Math.LN2),_=48>=_?1:Math.pow(2,_-48),T=h(g),v=T.j(w);R(v)||0<v.l(E);)g-=_,T=h(g),v=T.j(w);P(T)&&(T=b),I=I.add(T),E=V(E,v)}return new k(I,E)}n.A=function(E){return U(this,E).h},n.and=function(E){for(var w=Math.max(this.g.length,E.g.length),g=[],_=0;_<w;_++)g[_]=this.i(_)&E.i(_);return new o(g,this.h&E.h)},n.or=function(E){for(var w=Math.max(this.g.length,E.g.length),g=[],_=0;_<w;_++)g[_]=this.i(_)|E.i(_);return new o(g,this.h|E.h)},n.xor=function(E){for(var w=Math.max(this.g.length,E.g.length),g=[],_=0;_<w;_++)g[_]=this.i(_)^E.i(_);return new o(g,this.h^E.h)};function x(E){for(var w=E.g.length+1,g=[],_=0;_<w;_++)g[_]=E.i(_)<<1|E.i(_-1)>>>31;return new o(g,E.h)}function M(E,w){var g=w>>5;w%=32;for(var _=E.g.length-g,I=[],T=0;T<_;T++)I[T]=0<w?E.i(T+g)>>>w|E.i(T+g+1)<<32-w:E.i(T+g);return new o(I,E.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,wm=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=p,gn=o}).apply(typeof Vh<"u"?Vh:typeof self<"u"?self:typeof window<"u"?window:{});var ho=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Em,Ks,Tm,Do,nl,Am,Sm,Rm;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,d,f){return a==Array.prototype||a==Object.prototype||(a[d]=f.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof ho=="object"&&ho];for(var d=0;d<a.length;++d){var f=a[d];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=t(this);function s(a,d){if(d)e:{var f=r;a=a.split(".");for(var y=0;y<a.length-1;y++){var N=a[y];if(!(N in f))break e;f=f[N]}a=a[a.length-1],y=f[a],d=d(y),d!=y&&d!=null&&e(f,a,{configurable:!0,writable:!0,value:d})}}function i(a,d){a instanceof String&&(a+="");var f=0,y=!1,N={next:function(){if(!y&&f<a.length){var O=f++;return{value:d(O,a[O]),done:!1}}return y=!0,{done:!0,value:void 0}}};return N[Symbol.iterator]=function(){return N},N}s("Array.prototype.values",function(a){return a||function(){return i(this,function(d,f){return f})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},c=this||self;function l(a){var d=typeof a;return d=d!="object"?d:a?Array.isArray(a)?"array":d:"null",d=="array"||d=="object"&&typeof a.length=="number"}function h(a){var d=typeof a;return d=="object"&&a!=null||d=="function"}function p(a,d,f){return a.call.apply(a.bind,arguments)}function m(a,d,f){if(!a)throw Error();if(2<arguments.length){var y=Array.prototype.slice.call(arguments,2);return function(){var N=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(N,y),a.apply(d,N)}}return function(){return a.apply(d,arguments)}}function b(a,d,f){return b=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:m,b.apply(null,arguments)}function A(a,d){var f=Array.prototype.slice.call(arguments,1);return function(){var y=f.slice();return y.push.apply(y,arguments),a.apply(this,y)}}function P(a,d){function f(){}f.prototype=d.prototype,a.aa=d.prototype,a.prototype=new f,a.prototype.constructor=a,a.Qb=function(y,N,O){for(var G=Array(arguments.length-2),ve=2;ve<arguments.length;ve++)G[ve-2]=arguments[ve];return d.prototype[N].apply(y,G)}}function R(a){const d=a.length;if(0<d){const f=Array(d);for(let y=0;y<d;y++)f[y]=a[y];return f}return[]}function S(a,d){for(let f=1;f<arguments.length;f++){const y=arguments[f];if(l(y)){const N=a.length||0,O=y.length||0;a.length=N+O;for(let G=0;G<O;G++)a[N+G]=y[G]}else a.push(y)}}class V{constructor(d,f){this.i=d,this.j=f,this.h=0,this.g=null}get(){let d;return 0<this.h?(this.h--,d=this.g,this.g=d.next,d.next=null):d=this.i(),d}}function C(a){return/^[\s\xa0]*$/.test(a)}function k(){var a=c.navigator;return a&&(a=a.userAgent)?a:""}function U(a){return U[" "](a),a}U[" "]=function(){};var x=k().indexOf("Gecko")!=-1&&!(k().toLowerCase().indexOf("webkit")!=-1&&k().indexOf("Edge")==-1)&&!(k().indexOf("Trident")!=-1||k().indexOf("MSIE")!=-1)&&k().indexOf("Edge")==-1;function M(a,d,f){for(const y in a)d.call(f,a[y],y,a)}function E(a,d){for(const f in a)d.call(void 0,a[f],f,a)}function w(a){const d={};for(const f in a)d[f]=a[f];return d}const g="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function _(a,d){let f,y;for(let N=1;N<arguments.length;N++){y=arguments[N];for(f in y)a[f]=y[f];for(let O=0;O<g.length;O++)f=g[O],Object.prototype.hasOwnProperty.call(y,f)&&(a[f]=y[f])}}function I(a){var d=1;a=a.split(":");const f=[];for(;0<d&&a.length;)f.push(a.shift()),d--;return a.length&&f.push(a.join(":")),f}function T(a){c.setTimeout(()=>{throw a},0)}function v(){var a=gt;let d=null;return a.g&&(d=a.g,a.g=a.g.next,a.g||(a.h=null),d.next=null),d}class ${constructor(){this.h=this.g=null}add(d,f){const y=se.get();y.set(d,f),this.h?this.h.next=y:this.g=y,this.h=y}}var se=new V(()=>new ae,a=>a.reset());class ae{constructor(){this.next=this.g=this.h=null}set(d,f){this.h=d,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let he,We=!1,gt=new $,Lt=()=>{const a=c.Promise.resolve(void 0);he=()=>{a.then(Yt)}};var Yt=()=>{for(var a;a=v();){try{a.h.call(a.g)}catch(f){T(f)}var d=se;d.j(a),100>d.h&&(d.h++,a.next=d.g,d.g=a)}We=!1};function tt(){this.s=this.s,this.C=this.C}tt.prototype.s=!1,tt.prototype.ma=function(){this.s||(this.s=!0,this.N())},tt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ge(a,d){this.type=a,this.g=this.target=d,this.defaultPrevented=!1}ge.prototype.h=function(){this.defaultPrevented=!0};var nt=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var a=!1,d=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const f=()=>{};c.addEventListener("test",f,d),c.removeEventListener("test",f,d)}catch{}return a}();function F(a,d){if(ge.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var f=this.type=a.type,y=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=d,d=a.relatedTarget){if(x){e:{try{U(d.nodeName);var N=!0;break e}catch{}N=!1}N||(d=null)}}else f=="mouseover"?d=a.fromElement:f=="mouseout"&&(d=a.toElement);this.relatedTarget=d,y?(this.clientX=y.clientX!==void 0?y.clientX:y.pageX,this.clientY=y.clientY!==void 0?y.clientY:y.pageY,this.screenX=y.screenX||0,this.screenY=y.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:j[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&F.aa.h.call(this)}}P(F,ge);var j={2:"touch",3:"pen",4:"mouse"};F.prototype.h=function(){F.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var W="closure_listenable_"+(1e6*Math.random()|0),ue=0;function ee(a,d,f,y,N){this.listener=a,this.proxy=null,this.src=d,this.type=f,this.capture=!!y,this.ha=N,this.key=++ue,this.da=this.fa=!1}function Z(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Ne(a){this.src=a,this.g={},this.h=0}Ne.prototype.add=function(a,d,f,y,N){var O=a.toString();a=this.g[O],a||(a=this.g[O]=[],this.h++);var G=Ir(a,d,y,N);return-1<G?(d=a[G],f||(d.fa=!1)):(d=new ee(d,this.src,O,!!y,N),d.fa=f,a.push(d)),d};function br(a,d){var f=d.type;if(f in a.g){var y=a.g[f],N=Array.prototype.indexOf.call(y,d,void 0),O;(O=0<=N)&&Array.prototype.splice.call(y,N,1),O&&(Z(d),a.g[f].length==0&&(delete a.g[f],a.h--))}}function Ir(a,d,f,y){for(var N=0;N<a.length;++N){var O=a[N];if(!O.da&&O.listener==d&&O.capture==!!f&&O.ha==y)return N}return-1}var Ts="closure_lm_"+(1e6*Math.random()|0),Dn={};function Nn(a,d,f,y,N){if(Array.isArray(d)){for(var O=0;O<d.length;O++)Nn(a,d[O],f,y,N);return null}return f=cd(f),a&&a[W]?a.K(d,f,h(y)?!!y.capture:!1,N):As(a,d,f,!1,y,N)}function As(a,d,f,y,N,O){if(!d)throw Error("Invalid event type");var G=h(N)?!!N.capture:!!N,ve=uc(a);if(ve||(a[Ts]=ve=new Ne(a)),f=ve.add(d,f,y,G,O),f.proxy)return f;if(y=ky(),f.proxy=y,y.src=a,y.listener=f,a.addEventListener)nt||(N=G),N===void 0&&(N=!1),a.addEventListener(d.toString(),y,N);else if(a.attachEvent)a.attachEvent(ad(d.toString()),y);else if(a.addListener&&a.removeListener)a.addListener(y);else throw Error("addEventListener and attachEvent are unavailable.");return f}function ky(){function a(f){return d.call(a.src,a.listener,f)}const d=xy;return a}function od(a,d,f,y,N){if(Array.isArray(d))for(var O=0;O<d.length;O++)od(a,d[O],f,y,N);else y=h(y)?!!y.capture:!!y,f=cd(f),a&&a[W]?(a=a.i,d=String(d).toString(),d in a.g&&(O=a.g[d],f=Ir(O,f,y,N),-1<f&&(Z(O[f]),Array.prototype.splice.call(O,f,1),O.length==0&&(delete a.g[d],a.h--)))):a&&(a=uc(a))&&(d=a.g[d.toString()],a=-1,d&&(a=Ir(d,f,y,N)),(f=-1<a?d[a]:null)&&lc(f))}function lc(a){if(typeof a!="number"&&a&&!a.da){var d=a.src;if(d&&d[W])br(d.i,a);else{var f=a.type,y=a.proxy;d.removeEventListener?d.removeEventListener(f,y,a.capture):d.detachEvent?d.detachEvent(ad(f),y):d.addListener&&d.removeListener&&d.removeListener(y),(f=uc(d))?(br(f,a),f.h==0&&(f.src=null,d[Ts]=null)):Z(a)}}}function ad(a){return a in Dn?Dn[a]:Dn[a]="on"+a}function xy(a,d){if(a.da)a=!0;else{d=new F(d,this);var f=a.listener,y=a.ha||a.src;a.fa&&lc(a),a=f.call(y,d)}return a}function uc(a){return a=a[Ts],a instanceof Ne?a:null}var dc="__closure_events_fn_"+(1e9*Math.random()>>>0);function cd(a){return typeof a=="function"?a:(a[dc]||(a[dc]=function(d){return a.handleEvent(d)}),a[dc])}function Be(){tt.call(this),this.i=new Ne(this),this.M=this,this.F=null}P(Be,tt),Be.prototype[W]=!0,Be.prototype.removeEventListener=function(a,d,f,y){od(this,a,d,f,y)};function Qe(a,d){var f,y=a.F;if(y)for(f=[];y;y=y.F)f.push(y);if(a=a.M,y=d.type||d,typeof d=="string")d=new ge(d,a);else if(d instanceof ge)d.target=d.target||a;else{var N=d;d=new ge(y,a),_(d,N)}if(N=!0,f)for(var O=f.length-1;0<=O;O--){var G=d.g=f[O];N=Wi(G,y,!0,d)&&N}if(G=d.g=a,N=Wi(G,y,!0,d)&&N,N=Wi(G,y,!1,d)&&N,f)for(O=0;O<f.length;O++)G=d.g=f[O],N=Wi(G,y,!1,d)&&N}Be.prototype.N=function(){if(Be.aa.N.call(this),this.i){var a=this.i,d;for(d in a.g){for(var f=a.g[d],y=0;y<f.length;y++)Z(f[y]);delete a.g[d],a.h--}}this.F=null},Be.prototype.K=function(a,d,f,y){return this.i.add(String(a),d,!1,f,y)},Be.prototype.L=function(a,d,f,y){return this.i.add(String(a),d,!0,f,y)};function Wi(a,d,f,y){if(d=a.i.g[String(d)],!d)return!0;d=d.concat();for(var N=!0,O=0;O<d.length;++O){var G=d[O];if(G&&!G.da&&G.capture==f){var ve=G.listener,Fe=G.ha||G.src;G.fa&&br(a.i,G),N=ve.call(Fe,y)!==!1&&N}}return N&&!y.defaultPrevented}function ld(a,d,f){if(typeof a=="function")f&&(a=b(a,f));else if(a&&typeof a.handleEvent=="function")a=b(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(d)?-1:c.setTimeout(a,d||0)}function ud(a){a.g=ld(()=>{a.g=null,a.i&&(a.i=!1,ud(a))},a.l);const d=a.h;a.h=null,a.m.apply(null,d)}class Dy extends tt{constructor(d,f){super(),this.m=d,this.l=f,this.h=null,this.i=!1,this.g=null}j(d){this.h=arguments,this.g?this.i=!0:ud(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ss(a){tt.call(this),this.h=a,this.g={}}P(Ss,tt);var dd=[];function hd(a){M(a.g,function(d,f){this.g.hasOwnProperty(f)&&lc(d)},a),a.g={}}Ss.prototype.N=function(){Ss.aa.N.call(this),hd(this)},Ss.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var hc=c.JSON.stringify,Ny=c.JSON.parse,Vy=class{stringify(a){return c.JSON.stringify(a,void 0)}parse(a){return c.JSON.parse(a,void 0)}};function fc(){}fc.prototype.h=null;function fd(a){return a.h||(a.h=a.i())}function pd(){}var Rs={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function pc(){ge.call(this,"d")}P(pc,ge);function mc(){ge.call(this,"c")}P(mc,ge);var Vn={},md=null;function Qi(){return md=md||new Be}Vn.La="serverreachability";function gd(a){ge.call(this,Vn.La,a)}P(gd,ge);function Cs(a){const d=Qi();Qe(d,new gd(d))}Vn.STAT_EVENT="statevent";function _d(a,d){ge.call(this,Vn.STAT_EVENT,a),this.stat=d}P(_d,ge);function Ye(a){const d=Qi();Qe(d,new _d(d,a))}Vn.Ma="timingevent";function yd(a,d){ge.call(this,Vn.Ma,a),this.size=d}P(yd,ge);function Ps(a,d){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){a()},d)}function ks(){this.g=!0}ks.prototype.xa=function(){this.g=!1};function Oy(a,d,f,y,N,O){a.info(function(){if(a.g)if(O)for(var G="",ve=O.split("&"),Fe=0;Fe<ve.length;Fe++){var fe=ve[Fe].split("=");if(1<fe.length){var $e=fe[0];fe=fe[1];var qe=$e.split("_");G=2<=qe.length&&qe[1]=="type"?G+($e+"="+fe+"&"):G+($e+"=redacted&")}}else G=null;else G=O;return"XMLHTTP REQ ("+y+") [attempt "+N+"]: "+d+`
`+f+`
`+G})}function Ly(a,d,f,y,N,O,G){a.info(function(){return"XMLHTTP RESP ("+y+") [ attempt "+N+"]: "+d+`
`+f+`
`+O+" "+G})}function wr(a,d,f,y){a.info(function(){return"XMLHTTP TEXT ("+d+"): "+Fy(a,f)+(y?" "+y:"")})}function My(a,d){a.info(function(){return"TIMEOUT: "+d})}ks.prototype.info=function(){};function Fy(a,d){if(!a.g)return d;if(!d)return null;try{var f=JSON.parse(d);if(f){for(a=0;a<f.length;a++)if(Array.isArray(f[a])){var y=f[a];if(!(2>y.length)){var N=y[1];if(Array.isArray(N)&&!(1>N.length)){var O=N[0];if(O!="noop"&&O!="stop"&&O!="close")for(var G=1;G<N.length;G++)N[G]=""}}}}return hc(f)}catch{return d}}var Yi={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},vd={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},gc;function Ji(){}P(Ji,fc),Ji.prototype.g=function(){return new XMLHttpRequest},Ji.prototype.i=function(){return{}},gc=new Ji;function Jt(a,d,f,y){this.j=a,this.i=d,this.l=f,this.R=y||1,this.U=new Ss(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new bd}function bd(){this.i=null,this.g="",this.h=!1}var Id={},_c={};function yc(a,d,f){a.L=1,a.v=to(Mt(d)),a.m=f,a.P=!0,wd(a,null)}function wd(a,d){a.F=Date.now(),Xi(a),a.A=Mt(a.v);var f=a.A,y=a.R;Array.isArray(y)||(y=[String(y)]),Ld(f.i,"t",y),a.C=0,f=a.j.J,a.h=new bd,a.g=eh(a.j,f?d:null,!a.m),0<a.O&&(a.M=new Dy(b(a.Y,a,a.g),a.O)),d=a.U,f=a.g,y=a.ca;var N="readystatechange";Array.isArray(N)||(N&&(dd[0]=N.toString()),N=dd);for(var O=0;O<N.length;O++){var G=Nn(f,N[O],y||d.handleEvent,!1,d.h||d);if(!G)break;d.g[G.key]=G}d=a.H?w(a.H):{},a.m?(a.u||(a.u="POST"),d["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,d)):(a.u="GET",a.g.ea(a.A,a.u,null,d)),Cs(),Oy(a.i,a.u,a.A,a.l,a.R,a.m)}Jt.prototype.ca=function(a){a=a.target;const d=this.M;d&&Ft(a)==3?d.j():this.Y(a)},Jt.prototype.Y=function(a){try{if(a==this.g)e:{const qe=Ft(this.g);var d=this.g.Ba();const Ar=this.g.Z();if(!(3>qe)&&(qe!=3||this.g&&(this.h.h||this.g.oa()||jd(this.g)))){this.J||qe!=4||d==7||(d==8||0>=Ar?Cs(3):Cs(2)),vc(this);var f=this.g.Z();this.X=f;t:if(Ed(this)){var y=jd(this.g);a="";var N=y.length,O=Ft(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){On(this),xs(this);var G="";break t}this.h.i=new c.TextDecoder}for(d=0;d<N;d++)this.h.h=!0,a+=this.h.i.decode(y[d],{stream:!(O&&d==N-1)});y.length=0,this.h.g+=a,this.C=0,G=this.h.g}else G=this.g.oa();if(this.o=f==200,Ly(this.i,this.u,this.A,this.l,this.R,qe,f),this.o){if(this.T&&!this.K){t:{if(this.g){var ve,Fe=this.g;if((ve=Fe.g?Fe.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!C(ve)){var fe=ve;break t}}fe=null}if(f=fe)wr(this.i,this.l,f,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,bc(this,f);else{this.o=!1,this.s=3,Ye(12),On(this),xs(this);break e}}if(this.P){f=!0;let _t;for(;!this.J&&this.C<G.length;)if(_t=Uy(this,G),_t==_c){qe==4&&(this.s=4,Ye(14),f=!1),wr(this.i,this.l,null,"[Incomplete Response]");break}else if(_t==Id){this.s=4,Ye(15),wr(this.i,this.l,G,"[Invalid Chunk]"),f=!1;break}else wr(this.i,this.l,_t,null),bc(this,_t);if(Ed(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),qe!=4||G.length!=0||this.h.h||(this.s=1,Ye(16),f=!1),this.o=this.o&&f,!f)wr(this.i,this.l,G,"[Invalid Chunked Response]"),On(this),xs(this);else if(0<G.length&&!this.W){this.W=!0;var $e=this.j;$e.g==this&&$e.ba&&!$e.M&&($e.j.info("Great, no buffering proxy detected. Bytes received: "+G.length),Sc($e),$e.M=!0,Ye(11))}}else wr(this.i,this.l,G,null),bc(this,G);qe==4&&On(this),this.o&&!this.J&&(qe==4?Yd(this.j,this):(this.o=!1,Xi(this)))}else nv(this.g),f==400&&0<G.indexOf("Unknown SID")?(this.s=3,Ye(12)):(this.s=0,Ye(13)),On(this),xs(this)}}}catch{}finally{}};function Ed(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function Uy(a,d){var f=a.C,y=d.indexOf(`
`,f);return y==-1?_c:(f=Number(d.substring(f,y)),isNaN(f)?Id:(y+=1,y+f>d.length?_c:(d=d.slice(y,y+f),a.C=y+f,d)))}Jt.prototype.cancel=function(){this.J=!0,On(this)};function Xi(a){a.S=Date.now()+a.I,Td(a,a.I)}function Td(a,d){if(a.B!=null)throw Error("WatchDog timer not null");a.B=Ps(b(a.ba,a),d)}function vc(a){a.B&&(c.clearTimeout(a.B),a.B=null)}Jt.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(My(this.i,this.A),this.L!=2&&(Cs(),Ye(17)),On(this),this.s=2,xs(this)):Td(this,this.S-a)};function xs(a){a.j.G==0||a.J||Yd(a.j,a)}function On(a){vc(a);var d=a.M;d&&typeof d.ma=="function"&&d.ma(),a.M=null,hd(a.U),a.g&&(d=a.g,a.g=null,d.abort(),d.ma())}function bc(a,d){try{var f=a.j;if(f.G!=0&&(f.g==a||Ic(f.h,a))){if(!a.K&&Ic(f.h,a)&&f.G==3){try{var y=f.Da.g.parse(d)}catch{y=null}if(Array.isArray(y)&&y.length==3){var N=y;if(N[0]==0){e:if(!f.u){if(f.g)if(f.g.F+3e3<a.F)ao(f),io(f);else break e;Ac(f),Ye(18)}}else f.za=N[1],0<f.za-f.T&&37500>N[2]&&f.F&&f.v==0&&!f.C&&(f.C=Ps(b(f.Za,f),6e3));if(1>=Rd(f.h)&&f.ca){try{f.ca()}catch{}f.ca=void 0}}else Mn(f,11)}else if((a.K||f.g==a)&&ao(f),!C(d))for(N=f.Da.g.parse(d),d=0;d<N.length;d++){let fe=N[d];if(f.T=fe[0],fe=fe[1],f.G==2)if(fe[0]=="c"){f.K=fe[1],f.ia=fe[2];const $e=fe[3];$e!=null&&(f.la=$e,f.j.info("VER="+f.la));const qe=fe[4];qe!=null&&(f.Aa=qe,f.j.info("SVER="+f.Aa));const Ar=fe[5];Ar!=null&&typeof Ar=="number"&&0<Ar&&(y=1.5*Ar,f.L=y,f.j.info("backChannelRequestTimeoutMs_="+y)),y=f;const _t=a.g;if(_t){const lo=_t.g?_t.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(lo){var O=y.h;O.g||lo.indexOf("spdy")==-1&&lo.indexOf("quic")==-1&&lo.indexOf("h2")==-1||(O.j=O.l,O.g=new Set,O.h&&(wc(O,O.h),O.h=null))}if(y.D){const Rc=_t.g?_t.g.getResponseHeader("X-HTTP-Session-Id"):null;Rc&&(y.ya=Rc,be(y.I,y.D,Rc))}}f.G=3,f.l&&f.l.ua(),f.ba&&(f.R=Date.now()-a.F,f.j.info("Handshake RTT: "+f.R+"ms")),y=f;var G=a;if(y.qa=Zd(y,y.J?y.ia:null,y.W),G.K){Cd(y.h,G);var ve=G,Fe=y.L;Fe&&(ve.I=Fe),ve.B&&(vc(ve),Xi(ve)),y.g=G}else Wd(y);0<f.i.length&&oo(f)}else fe[0]!="stop"&&fe[0]!="close"||Mn(f,7);else f.G==3&&(fe[0]=="stop"||fe[0]=="close"?fe[0]=="stop"?Mn(f,7):Tc(f):fe[0]!="noop"&&f.l&&f.l.ta(fe),f.v=0)}}Cs(4)}catch{}}var By=class{constructor(a,d){this.g=a,this.map=d}};function Ad(a){this.l=a||10,c.PerformanceNavigationTiming?(a=c.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Sd(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Rd(a){return a.h?1:a.g?a.g.size:0}function Ic(a,d){return a.h?a.h==d:a.g?a.g.has(d):!1}function wc(a,d){a.g?a.g.add(d):a.h=d}function Cd(a,d){a.h&&a.h==d?a.h=null:a.g&&a.g.has(d)&&a.g.delete(d)}Ad.prototype.cancel=function(){if(this.i=Pd(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Pd(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let d=a.i;for(const f of a.g.values())d=d.concat(f.D);return d}return R(a.i)}function $y(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(l(a)){for(var d=[],f=a.length,y=0;y<f;y++)d.push(a[y]);return d}d=[],f=0;for(y in a)d[f++]=a[y];return d}function qy(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(l(a)||typeof a=="string"){var d=[];a=a.length;for(var f=0;f<a;f++)d.push(f);return d}d=[],f=0;for(const y in a)d[f++]=y;return d}}}function kd(a,d){if(a.forEach&&typeof a.forEach=="function")a.forEach(d,void 0);else if(l(a)||typeof a=="string")Array.prototype.forEach.call(a,d,void 0);else for(var f=qy(a),y=$y(a),N=y.length,O=0;O<N;O++)d.call(void 0,y[O],f&&f[O],a)}var xd=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function jy(a,d){if(a){a=a.split("&");for(var f=0;f<a.length;f++){var y=a[f].indexOf("="),N=null;if(0<=y){var O=a[f].substring(0,y);N=a[f].substring(y+1)}else O=a[f];d(O,N?decodeURIComponent(N.replace(/\+/g," ")):"")}}}function Ln(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof Ln){this.h=a.h,Zi(this,a.j),this.o=a.o,this.g=a.g,eo(this,a.s),this.l=a.l;var d=a.i,f=new Vs;f.i=d.i,d.g&&(f.g=new Map(d.g),f.h=d.h),Dd(this,f),this.m=a.m}else a&&(d=String(a).match(xd))?(this.h=!1,Zi(this,d[1]||"",!0),this.o=Ds(d[2]||""),this.g=Ds(d[3]||"",!0),eo(this,d[4]),this.l=Ds(d[5]||"",!0),Dd(this,d[6]||"",!0),this.m=Ds(d[7]||"")):(this.h=!1,this.i=new Vs(null,this.h))}Ln.prototype.toString=function(){var a=[],d=this.j;d&&a.push(Ns(d,Nd,!0),":");var f=this.g;return(f||d=="file")&&(a.push("//"),(d=this.o)&&a.push(Ns(d,Nd,!0),"@"),a.push(encodeURIComponent(String(f)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.s,f!=null&&a.push(":",String(f))),(f=this.l)&&(this.g&&f.charAt(0)!="/"&&a.push("/"),a.push(Ns(f,f.charAt(0)=="/"?Hy:Gy,!0))),(f=this.i.toString())&&a.push("?",f),(f=this.m)&&a.push("#",Ns(f,Wy)),a.join("")};function Mt(a){return new Ln(a)}function Zi(a,d,f){a.j=f?Ds(d,!0):d,a.j&&(a.j=a.j.replace(/:$/,""))}function eo(a,d){if(d){if(d=Number(d),isNaN(d)||0>d)throw Error("Bad port number "+d);a.s=d}else a.s=null}function Dd(a,d,f){d instanceof Vs?(a.i=d,Qy(a.i,a.h)):(f||(d=Ns(d,Ky)),a.i=new Vs(d,a.h))}function be(a,d,f){a.i.set(d,f)}function to(a){return be(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Ds(a,d){return a?d?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Ns(a,d,f){return typeof a=="string"?(a=encodeURI(a).replace(d,zy),f&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function zy(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Nd=/[#\/\?@]/g,Gy=/[#\?:]/g,Hy=/[#\?]/g,Ky=/[#\?@]/g,Wy=/#/g;function Vs(a,d){this.h=this.g=null,this.i=a||null,this.j=!!d}function Xt(a){a.g||(a.g=new Map,a.h=0,a.i&&jy(a.i,function(d,f){a.add(decodeURIComponent(d.replace(/\+/g," ")),f)}))}n=Vs.prototype,n.add=function(a,d){Xt(this),this.i=null,a=Er(this,a);var f=this.g.get(a);return f||this.g.set(a,f=[]),f.push(d),this.h+=1,this};function Vd(a,d){Xt(a),d=Er(a,d),a.g.has(d)&&(a.i=null,a.h-=a.g.get(d).length,a.g.delete(d))}function Od(a,d){return Xt(a),d=Er(a,d),a.g.has(d)}n.forEach=function(a,d){Xt(this),this.g.forEach(function(f,y){f.forEach(function(N){a.call(d,N,y,this)},this)},this)},n.na=function(){Xt(this);const a=Array.from(this.g.values()),d=Array.from(this.g.keys()),f=[];for(let y=0;y<d.length;y++){const N=a[y];for(let O=0;O<N.length;O++)f.push(d[y])}return f},n.V=function(a){Xt(this);let d=[];if(typeof a=="string")Od(this,a)&&(d=d.concat(this.g.get(Er(this,a))));else{a=Array.from(this.g.values());for(let f=0;f<a.length;f++)d=d.concat(a[f])}return d},n.set=function(a,d){return Xt(this),this.i=null,a=Er(this,a),Od(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[d]),this.h+=1,this},n.get=function(a,d){return a?(a=this.V(a),0<a.length?String(a[0]):d):d};function Ld(a,d,f){Vd(a,d),0<f.length&&(a.i=null,a.g.set(Er(a,d),R(f)),a.h+=f.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],d=Array.from(this.g.keys());for(var f=0;f<d.length;f++){var y=d[f];const O=encodeURIComponent(String(y)),G=this.V(y);for(y=0;y<G.length;y++){var N=O;G[y]!==""&&(N+="="+encodeURIComponent(String(G[y]))),a.push(N)}}return this.i=a.join("&")};function Er(a,d){return d=String(d),a.j&&(d=d.toLowerCase()),d}function Qy(a,d){d&&!a.j&&(Xt(a),a.i=null,a.g.forEach(function(f,y){var N=y.toLowerCase();y!=N&&(Vd(this,y),Ld(this,N,f))},a)),a.j=d}function Yy(a,d){const f=new ks;if(c.Image){const y=new Image;y.onload=A(Zt,f,"TestLoadImage: loaded",!0,d,y),y.onerror=A(Zt,f,"TestLoadImage: error",!1,d,y),y.onabort=A(Zt,f,"TestLoadImage: abort",!1,d,y),y.ontimeout=A(Zt,f,"TestLoadImage: timeout",!1,d,y),c.setTimeout(function(){y.ontimeout&&y.ontimeout()},1e4),y.src=a}else d(!1)}function Jy(a,d){const f=new ks,y=new AbortController,N=setTimeout(()=>{y.abort(),Zt(f,"TestPingServer: timeout",!1,d)},1e4);fetch(a,{signal:y.signal}).then(O=>{clearTimeout(N),O.ok?Zt(f,"TestPingServer: ok",!0,d):Zt(f,"TestPingServer: server error",!1,d)}).catch(()=>{clearTimeout(N),Zt(f,"TestPingServer: error",!1,d)})}function Zt(a,d,f,y,N){try{N&&(N.onload=null,N.onerror=null,N.onabort=null,N.ontimeout=null),y(f)}catch{}}function Xy(){this.g=new Vy}function Zy(a,d,f){const y=f||"";try{kd(a,function(N,O){let G=N;h(N)&&(G=hc(N)),d.push(y+O+"="+encodeURIComponent(G))})}catch(N){throw d.push(y+"type="+encodeURIComponent("_badmap")),N}}function no(a){this.l=a.Ub||null,this.j=a.eb||!1}P(no,fc),no.prototype.g=function(){return new ro(this.l,this.j)},no.prototype.i=function(a){return function(){return a}}({});function ro(a,d){Be.call(this),this.D=a,this.o=d,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}P(ro,Be),n=ro.prototype,n.open=function(a,d){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=d,this.readyState=1,Ls(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const d={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(d.body=a),(this.D||c).fetch(new Request(this.A,d)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Os(this)),this.readyState=0},n.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Ls(this)),this.g&&(this.readyState=3,Ls(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Md(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function Md(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}n.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var d=a.value?a.value:new Uint8Array(0);(d=this.v.decode(d,{stream:!a.done}))&&(this.response=this.responseText+=d)}a.done?Os(this):Ls(this),this.readyState==3&&Md(this)}},n.Ra=function(a){this.g&&(this.response=this.responseText=a,Os(this))},n.Qa=function(a){this.g&&(this.response=a,Os(this))},n.ga=function(){this.g&&Os(this)};function Os(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Ls(a)}n.setRequestHeader=function(a,d){this.u.append(a,d)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],d=this.h.entries();for(var f=d.next();!f.done;)f=f.value,a.push(f[0]+": "+f[1]),f=d.next();return a.join(`\r
`)};function Ls(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(ro.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Fd(a){let d="";return M(a,function(f,y){d+=y,d+=":",d+=f,d+=`\r
`}),d}function Ec(a,d,f){e:{for(y in f){var y=!1;break e}y=!0}y||(f=Fd(f),typeof a=="string"?f!=null&&encodeURIComponent(String(f)):be(a,d,f))}function Se(a){Be.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}P(Se,Be);var ev=/^https?$/i,tv=["POST","PUT"];n=Se.prototype,n.Ha=function(a){this.J=a},n.ea=function(a,d,f,y){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);d=d?d.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():gc.g(),this.v=this.o?fd(this.o):fd(gc),this.g.onreadystatechange=b(this.Ea,this);try{this.B=!0,this.g.open(d,String(a),!0),this.B=!1}catch(O){Ud(this,O);return}if(a=f||"",f=new Map(this.headers),y)if(Object.getPrototypeOf(y)===Object.prototype)for(var N in y)f.set(N,y[N]);else if(typeof y.keys=="function"&&typeof y.get=="function")for(const O of y.keys())f.set(O,y.get(O));else throw Error("Unknown input type for opt_headers: "+String(y));y=Array.from(f.keys()).find(O=>O.toLowerCase()=="content-type"),N=c.FormData&&a instanceof c.FormData,!(0<=Array.prototype.indexOf.call(tv,d,void 0))||y||N||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[O,G]of f)this.g.setRequestHeader(O,G);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{qd(this),this.u=!0,this.g.send(a),this.u=!1}catch(O){Ud(this,O)}};function Ud(a,d){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=d,a.m=5,Bd(a),so(a)}function Bd(a){a.A||(a.A=!0,Qe(a,"complete"),Qe(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,Qe(this,"complete"),Qe(this,"abort"),so(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),so(this,!0)),Se.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?$d(this):this.bb())},n.bb=function(){$d(this)};function $d(a){if(a.h&&typeof o<"u"&&(!a.v[1]||Ft(a)!=4||a.Z()!=2)){if(a.u&&Ft(a)==4)ld(a.Ea,0,a);else if(Qe(a,"readystatechange"),Ft(a)==4){a.h=!1;try{const G=a.Z();e:switch(G){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var d=!0;break e;default:d=!1}var f;if(!(f=d)){var y;if(y=G===0){var N=String(a.D).match(xd)[1]||null;!N&&c.self&&c.self.location&&(N=c.self.location.protocol.slice(0,-1)),y=!ev.test(N?N.toLowerCase():"")}f=y}if(f)Qe(a,"complete"),Qe(a,"success");else{a.m=6;try{var O=2<Ft(a)?a.g.statusText:""}catch{O=""}a.l=O+" ["+a.Z()+"]",Bd(a)}}finally{so(a)}}}}function so(a,d){if(a.g){qd(a);const f=a.g,y=a.v[0]?()=>{}:null;a.g=null,a.v=null,d||Qe(a,"ready");try{f.onreadystatechange=y}catch{}}}function qd(a){a.I&&(c.clearTimeout(a.I),a.I=null)}n.isActive=function(){return!!this.g};function Ft(a){return a.g?a.g.readyState:0}n.Z=function(){try{return 2<Ft(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(a){if(this.g){var d=this.g.responseText;return a&&d.indexOf(a)==0&&(d=d.substring(a.length)),Ny(d)}};function jd(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function nv(a){const d={};a=(a.g&&2<=Ft(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let y=0;y<a.length;y++){if(C(a[y]))continue;var f=I(a[y]);const N=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const O=d[N]||[];d[N]=O,O.push(f)}E(d,function(y){return y.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Ms(a,d,f){return f&&f.internalChannelParams&&f.internalChannelParams[a]||d}function zd(a){this.Aa=0,this.i=[],this.j=new ks,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Ms("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Ms("baseRetryDelayMs",5e3,a),this.cb=Ms("retryDelaySeedMs",1e4,a),this.Wa=Ms("forwardChannelMaxRetries",2,a),this.wa=Ms("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new Ad(a&&a.concurrentRequestLimit),this.Da=new Xy,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=zd.prototype,n.la=8,n.G=1,n.connect=function(a,d,f,y){Ye(0),this.W=a,this.H=d||{},f&&y!==void 0&&(this.H.OSID=f,this.H.OAID=y),this.F=this.X,this.I=Zd(this,null,this.W),oo(this)};function Tc(a){if(Gd(a),a.G==3){var d=a.U++,f=Mt(a.I);if(be(f,"SID",a.K),be(f,"RID",d),be(f,"TYPE","terminate"),Fs(a,f),d=new Jt(a,a.j,d),d.L=2,d.v=to(Mt(f)),f=!1,c.navigator&&c.navigator.sendBeacon)try{f=c.navigator.sendBeacon(d.v.toString(),"")}catch{}!f&&c.Image&&(new Image().src=d.v,f=!0),f||(d.g=eh(d.j,null),d.g.ea(d.v)),d.F=Date.now(),Xi(d)}Xd(a)}function io(a){a.g&&(Sc(a),a.g.cancel(),a.g=null)}function Gd(a){io(a),a.u&&(c.clearTimeout(a.u),a.u=null),ao(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&c.clearTimeout(a.s),a.s=null)}function oo(a){if(!Sd(a.h)&&!a.s){a.s=!0;var d=a.Ga;he||Lt(),We||(he(),We=!0),gt.add(d,a),a.B=0}}function rv(a,d){return Rd(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=d.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=Ps(b(a.Ga,a,d),Jd(a,a.B)),a.B++,!0)}n.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const N=new Jt(this,this.j,a);let O=this.o;if(this.S&&(O?(O=w(O),_(O,this.S)):O=this.S),this.m!==null||this.O||(N.H=O,O=null),this.P)e:{for(var d=0,f=0;f<this.i.length;f++){t:{var y=this.i[f];if("__data__"in y.map&&(y=y.map.__data__,typeof y=="string")){y=y.length;break t}y=void 0}if(y===void 0)break;if(d+=y,4096<d){d=f;break e}if(d===4096||f===this.i.length-1){d=f+1;break e}}d=1e3}else d=1e3;d=Kd(this,N,d),f=Mt(this.I),be(f,"RID",a),be(f,"CVER",22),this.D&&be(f,"X-HTTP-Session-Id",this.D),Fs(this,f),O&&(this.O?d="headers="+encodeURIComponent(String(Fd(O)))+"&"+d:this.m&&Ec(f,this.m,O)),wc(this.h,N),this.Ua&&be(f,"TYPE","init"),this.P?(be(f,"$req",d),be(f,"SID","null"),N.T=!0,yc(N,f,null)):yc(N,f,d),this.G=2}}else this.G==3&&(a?Hd(this,a):this.i.length==0||Sd(this.h)||Hd(this))};function Hd(a,d){var f;d?f=d.l:f=a.U++;const y=Mt(a.I);be(y,"SID",a.K),be(y,"RID",f),be(y,"AID",a.T),Fs(a,y),a.m&&a.o&&Ec(y,a.m,a.o),f=new Jt(a,a.j,f,a.B+1),a.m===null&&(f.H=a.o),d&&(a.i=d.D.concat(a.i)),d=Kd(a,f,1e3),f.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),wc(a.h,f),yc(f,y,d)}function Fs(a,d){a.H&&M(a.H,function(f,y){be(d,y,f)}),a.l&&kd({},function(f,y){be(d,y,f)})}function Kd(a,d,f){f=Math.min(a.i.length,f);var y=a.l?b(a.l.Na,a.l,a):null;e:{var N=a.i;let O=-1;for(;;){const G=["count="+f];O==-1?0<f?(O=N[0].g,G.push("ofs="+O)):O=0:G.push("ofs="+O);let ve=!0;for(let Fe=0;Fe<f;Fe++){let fe=N[Fe].g;const $e=N[Fe].map;if(fe-=O,0>fe)O=Math.max(0,N[Fe].g-100),ve=!1;else try{Zy($e,G,"req"+fe+"_")}catch{y&&y($e)}}if(ve){y=G.join("&");break e}}}return a=a.i.splice(0,f),d.D=a,y}function Wd(a){if(!a.g&&!a.u){a.Y=1;var d=a.Fa;he||Lt(),We||(he(),We=!0),gt.add(d,a),a.v=0}}function Ac(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=Ps(b(a.Fa,a),Jd(a,a.v)),a.v++,!0)}n.Fa=function(){if(this.u=null,Qd(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=Ps(b(this.ab,this),a)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Ye(10),io(this),Qd(this))};function Sc(a){a.A!=null&&(c.clearTimeout(a.A),a.A=null)}function Qd(a){a.g=new Jt(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var d=Mt(a.qa);be(d,"RID","rpc"),be(d,"SID",a.K),be(d,"AID",a.T),be(d,"CI",a.F?"0":"1"),!a.F&&a.ja&&be(d,"TO",a.ja),be(d,"TYPE","xmlhttp"),Fs(a,d),a.m&&a.o&&Ec(d,a.m,a.o),a.L&&(a.g.I=a.L);var f=a.g;a=a.ia,f.L=1,f.v=to(Mt(d)),f.m=null,f.P=!0,wd(f,a)}n.Za=function(){this.C!=null&&(this.C=null,io(this),Ac(this),Ye(19))};function ao(a){a.C!=null&&(c.clearTimeout(a.C),a.C=null)}function Yd(a,d){var f=null;if(a.g==d){ao(a),Sc(a),a.g=null;var y=2}else if(Ic(a.h,d))f=d.D,Cd(a.h,d),y=1;else return;if(a.G!=0){if(d.o)if(y==1){f=d.m?d.m.length:0,d=Date.now()-d.F;var N=a.B;y=Qi(),Qe(y,new yd(y,f)),oo(a)}else Wd(a);else if(N=d.s,N==3||N==0&&0<d.X||!(y==1&&rv(a,d)||y==2&&Ac(a)))switch(f&&0<f.length&&(d=a.h,d.i=d.i.concat(f)),N){case 1:Mn(a,5);break;case 4:Mn(a,10);break;case 3:Mn(a,6);break;default:Mn(a,2)}}}function Jd(a,d){let f=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(f*=2),f*d}function Mn(a,d){if(a.j.info("Error code "+d),d==2){var f=b(a.fb,a),y=a.Xa;const N=!y;y=new Ln(y||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Zi(y,"https"),to(y),N?Yy(y.toString(),f):Jy(y.toString(),f)}else Ye(2);a.G=0,a.l&&a.l.sa(d),Xd(a),Gd(a)}n.fb=function(a){a?(this.j.info("Successfully pinged google.com"),Ye(2)):(this.j.info("Failed to ping google.com"),Ye(1))};function Xd(a){if(a.G=0,a.ka=[],a.l){const d=Pd(a.h);(d.length!=0||a.i.length!=0)&&(S(a.ka,d),S(a.ka,a.i),a.h.i.length=0,R(a.i),a.i.length=0),a.l.ra()}}function Zd(a,d,f){var y=f instanceof Ln?Mt(f):new Ln(f);if(y.g!="")d&&(y.g=d+"."+y.g),eo(y,y.s);else{var N=c.location;y=N.protocol,d=d?d+"."+N.hostname:N.hostname,N=+N.port;var O=new Ln(null);y&&Zi(O,y),d&&(O.g=d),N&&eo(O,N),f&&(O.l=f),y=O}return f=a.D,d=a.ya,f&&d&&be(y,f,d),be(y,"VER",a.la),Fs(a,y),y}function eh(a,d,f){if(d&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return d=a.Ca&&!a.pa?new Se(new no({eb:f})):new Se(a.pa),d.Ha(a.J),d}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function th(){}n=th.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function co(){}co.prototype.g=function(a,d){return new ot(a,d)};function ot(a,d){Be.call(this),this.g=new zd(d),this.l=a,this.h=d&&d.messageUrlParams||null,a=d&&d.messageHeaders||null,d&&d.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=d&&d.initMessageHeaders||null,d&&d.messageContentType&&(a?a["X-WebChannel-Content-Type"]=d.messageContentType:a={"X-WebChannel-Content-Type":d.messageContentType}),d&&d.va&&(a?a["X-WebChannel-Client-Profile"]=d.va:a={"X-WebChannel-Client-Profile":d.va}),this.g.S=a,(a=d&&d.Sb)&&!C(a)&&(this.g.m=a),this.v=d&&d.supportsCrossDomainXhr||!1,this.u=d&&d.sendRawJson||!1,(d=d&&d.httpSessionIdParam)&&!C(d)&&(this.g.D=d,a=this.h,a!==null&&d in a&&(a=this.h,d in a&&delete a[d])),this.j=new Tr(this)}P(ot,Be),ot.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},ot.prototype.close=function(){Tc(this.g)},ot.prototype.o=function(a){var d=this.g;if(typeof a=="string"){var f={};f.__data__=a,a=f}else this.u&&(f={},f.__data__=hc(a),a=f);d.i.push(new By(d.Ya++,a)),d.G==3&&oo(d)},ot.prototype.N=function(){this.g.l=null,delete this.j,Tc(this.g),delete this.g,ot.aa.N.call(this)};function nh(a){pc.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var d=a.__sm__;if(d){e:{for(const f in d){a=f;break e}a=void 0}(this.i=a)&&(a=this.i,d=d!==null&&a in d?d[a]:void 0),this.data=d}else this.data=a}P(nh,pc);function rh(){mc.call(this),this.status=1}P(rh,mc);function Tr(a){this.g=a}P(Tr,th),Tr.prototype.ua=function(){Qe(this.g,"a")},Tr.prototype.ta=function(a){Qe(this.g,new nh(a))},Tr.prototype.sa=function(a){Qe(this.g,new rh)},Tr.prototype.ra=function(){Qe(this.g,"b")},co.prototype.createWebChannel=co.prototype.g,ot.prototype.send=ot.prototype.o,ot.prototype.open=ot.prototype.m,ot.prototype.close=ot.prototype.close,Rm=function(){return new co},Sm=function(){return Qi()},Am=Vn,nl={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Yi.NO_ERROR=0,Yi.TIMEOUT=8,Yi.HTTP_ERROR=6,Do=Yi,vd.COMPLETE="complete",Tm=vd,pd.EventType=Rs,Rs.OPEN="a",Rs.CLOSE="b",Rs.ERROR="c",Rs.MESSAGE="d",Be.prototype.listen=Be.prototype.K,Ks=pd,Se.prototype.listenOnce=Se.prototype.L,Se.prototype.getLastError=Se.prototype.Ka,Se.prototype.getLastErrorCode=Se.prototype.Ba,Se.prototype.getStatus=Se.prototype.Z,Se.prototype.getResponseJson=Se.prototype.Oa,Se.prototype.getResponseText=Se.prototype.oa,Se.prototype.send=Se.prototype.ea,Se.prototype.setWithCredentials=Se.prototype.Ha,Em=Se}).apply(typeof ho<"u"?ho:typeof self<"u"?self:typeof window<"u"?window:{});const Oh="@firebase/firestore",Lh="4.7.7";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */let ys="11.3.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sr=new ka("@firebase/firestore");function Dr(){return sr.logLevel}function B(n,...e){if(sr.logLevel<=ce.DEBUG){const t=e.map(Ql);sr.debug(`Firestore (${ys}): ${n}`,...t)}}function Xe(n,...e){if(sr.logLevel<=ce.ERROR){const t=e.map(Ql);sr.error(`Firestore (${ys}): ${n}`,...t)}}function fi(n,...e){if(sr.logLevel<=ce.WARN){const t=e.map(Ql);sr.warn(`Firestore (${ys}): ${n}`,...t)}}function Ql(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
 */function Q(n="Unexpected state"){const e=`FIRESTORE (${ys}) INTERNAL ASSERTION FAILED: `+n;throw Xe(e),new Error(e)}function Y(n,e){n||Q()}function ne(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const L={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class q extends Nt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eE{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class tE{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Je.UNAUTHENTICATED))}shutdown(){}}class nE{constructor(e){this.t=e,this.currentUser=Je.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Y(this.o===void 0);let r=this.i;const s=l=>this.i!==r?(r=this.i,t(l)):Promise.resolve();let i=new Pt;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Pt,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const l=i;e.enqueueRetryable(async()=>{await l.promise,await s(this.currentUser)})},c=l=>{B("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(l=>c(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):(B("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Pt)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(B("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Y(typeof r.accessToken=="string"),new eE(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Y(e===null||typeof e=="string"),new Je(e)}}class rE{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=Je.FIRST_PARTY,this.T=new Map}I(){return this.P?this.P():null}get headers(){this.T.set("X-Goog-AuthUser",this.l);const e=this.I();return e&&this.T.set("Authorization",e),this.h&&this.T.set("X-Goog-Iam-Authorization-Token",this.h),this.T}}class sE{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new rE(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(Je.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Mh{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class iE{constructor(e,t){this.A=t,this.forceRefresh=!1,this.appCheck=null,this.R=null,this.V=null,dt(e)&&e.settings.appCheckToken&&(this.V=e.settings.appCheckToken)}start(e,t){Y(this.o===void 0);const r=i=>{i.error!=null&&B("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.R;return this.R=i.token,B("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{B("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):B("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.V)return Promise.resolve(new Mh(this.V));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(Y(typeof t.token=="string"),this.R=t.token,new Mh(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oE(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */class Cm{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=oE(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function te(n,e){return n<e?-1:n>e?1:0}function sl(n,e){const t=rl().encode(n),r=rl().encode(e);for(let s=0;s<Math.min(t.length,r.length);s++){const i=te(t[s],r[s]);if(i!==0)return i}return te(t.length,r.length)}function Qr(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}function Pm(n){return n+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fh=-62135596800,Uh=1e6;class Ae{static now(){return Ae.fromMillis(Date.now())}static fromDate(e){return Ae.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*Uh);return new Ae(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new q(L.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new q(L.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Fh)throw new q(L.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new q(L.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Uh}_compareTo(e){return this.seconds===e.seconds?te(this.nanoseconds,e.nanoseconds):te(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds-Fh;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const Bh="__name__";class Et{constructor(e,t,r){t===void 0?t=0:t>e.length&&Q(),r===void 0?r=e.length-t:r>e.length-t&&Q(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Et.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Et?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=Et.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return te(e.length,t.length)}static compareSegments(e,t){const r=Et.isNumericId(e),s=Et.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?Et.extractNumericId(e).compare(Et.extractNumericId(t)):sl(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return gn.fromString(e.substring(4,e.length-2))}}class me extends Et{construct(e,t,r){return new me(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new q(L.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new me(t)}static emptyPath(){return new me([])}}const aE=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Te extends Et{construct(e,t,r){return new Te(e,t,r)}static isValidIdentifier(e){return aE.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Te.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Bh}static keyField(){return new Te([Bh])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new q(L.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new q(L.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[s+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new q(L.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(r+=c,s++):(i(),s++)}if(i(),o)throw new q(L.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Te(t)}static emptyPath(){return new Te([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K{constructor(e){this.path=e}static fromPath(e){return new K(me.fromString(e))}static fromName(e){return new K(me.fromString(e).popFirst(5))}static empty(){return new K(me.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&me.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return me.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new K(new me(e.slice()))}}/**
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
 */const pi=-1;class Zo{constructor(e,t,r,s){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=s}}function il(n){return n.fields.find(e=>e.kind===2)}function qn(n){return n.fields.filter(e=>e.kind!==2)}Zo.UNKNOWN_ID=-1;class No{constructor(e,t){this.fieldPath=e,this.kind=t}}class mi{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new mi(0,lt.min())}}function cE(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=J.fromTimestamp(r===1e9?new Ae(t+1,0):new Ae(t,r));return new lt(s,K.empty(),e)}function km(n){return new lt(n.readTime,n.key,pi)}class lt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new lt(J.min(),K.empty(),pi)}static max(){return new lt(J.max(),K.empty(),pi)}}function Yl(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=K.comparator(n.documentKey,e.documentKey),t!==0?t:te(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xm="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Dm{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mr(n){if(n.code!==L.FAILED_PRECONDITION||n.message!==xm)throw n;B("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const at="SimpleDb";class Oa{static open(e,t,r,s){try{return new Oa(t,e.transaction(s,r))}catch(i){throw new ei(t,i)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.m=new Pt,this.transaction.oncomplete=()=>{this.m.resolve()},this.transaction.onabort=()=>{t.error?this.m.reject(new ei(e,t.error)):this.m.resolve()},this.transaction.onerror=r=>{const s=Jl(r.target.error);this.m.reject(new ei(e,s))}}get p(){return this.m.promise}abort(e){e&&this.m.reject(e),this.aborted||(B(at,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}S(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new uE(t)}}class _n{static delete(e){return B(at,"Removing database:",e),Gn(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!Pa())return!1;if(_n.v())return!0;const e=Oe(),t=_n.C(e),r=0<t&&t<10,s=Nm(e),i=0<s&&s<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||i)}static v(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.F)==="YES"}static M(e,t){return e.store(t)}static C(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}constructor(e,t,r){this.name=e,this.version=t,this.O=r,_n.C(Oe())===12.2&&Xe("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async N(e){return this.db||(B(at,"Opening database:",this.name),this.db=await new Promise((t,r)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const o=i.target.result;t(o)},s.onblocked=()=>{r(new ei(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const o=i.target.error;o.name==="VersionError"?r(new q(L.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new q(L.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new ei(e,o))},s.onupgradeneeded=i=>{B(at,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const o=i.target.result;this.O.B(o,s.transaction,i.oldVersion,this.version).next(()=>{B(at,"Database upgrade to version "+this.version+" complete")})}})),this.L&&(this.db.onversionchange=t=>this.L(t)),this.db}k(e){this.L=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,s){const i=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.N(e);const c=Oa.open(this.db,e,i?"readonly":"readwrite",r),l=s(c).next(h=>(c.S(),h)).catch(h=>(c.abort(h),D.reject(h))).toPromise();return l.catch(()=>{}),await c.p,l}catch(c){const l=c,h=l.name!=="FirebaseError"&&o<3;if(B(at,"Transaction failed with error:",l.message,"Retrying:",h),this.close(),!h)return Promise.reject(l)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Nm(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class lE{constructor(e){this.q=e,this.$=!1,this.U=null}get isDone(){return this.$}get K(){return this.U}set cursor(e){this.q=e}done(){this.$=!0}W(e){this.U=e}delete(){return Gn(this.q.delete())}}class ei extends q{constructor(e,t){super(L.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function Cn(n){return n.name==="IndexedDbTransactionError"}class uE{constructor(e){this.store=e}put(e,t){let r;return t!==void 0?(B(at,"PUT",this.store.name,e,t),r=this.store.put(t,e)):(B(at,"PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),Gn(r)}add(e){return B(at,"ADD",this.store.name,e,e),Gn(this.store.add(e))}get(e){return Gn(this.store.get(e)).next(t=>(t===void 0&&(t=null),B(at,"GET",this.store.name,e,t),t))}delete(e){return B(at,"DELETE",this.store.name,e),Gn(this.store.delete(e))}count(){return B(at,"COUNT",this.store.name),Gn(this.store.count())}G(e,t){const r=this.options(e,t),s=r.index?this.store.index(r.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(r.range);return new D((o,c)=>{i.onerror=l=>{c(l.target.error)},i.onsuccess=l=>{o(l.target.result)}})}{const i=this.cursor(r),o=[];return this.j(i,(c,l)=>{o.push(l)}).next(()=>o)}}H(e,t){const r=this.store.getAll(e,t===null?void 0:t);return new D((s,i)=>{r.onerror=o=>{i(o.target.error)},r.onsuccess=o=>{s(o.target.result)}})}J(e,t){B(at,"DELETE ALL",this.store.name);const r=this.options(e,t);r.Y=!1;const s=this.cursor(r);return this.j(s,(i,o,c)=>c.delete())}Z(e,t){let r;t?r=e:(r={},t=e);const s=this.cursor(r);return this.j(s,t)}X(e){const t=this.cursor({});return new D((r,s)=>{t.onerror=i=>{const o=Jl(i.target.error);s(o)},t.onsuccess=i=>{const o=i.target.result;o?e(o.primaryKey,o.value).next(c=>{c?o.continue():r()}):r()}})}j(e,t){const r=[];return new D((s,i)=>{e.onerror=o=>{i(o.target.error)},e.onsuccess=o=>{const c=o.target.result;if(!c)return void s();const l=new lE(c),h=t(c.primaryKey,c.value,l);if(h instanceof D){const p=h.catch(m=>(l.done(),D.reject(m)));r.push(p)}l.isDone?s():l.K===null?c.continue():c.continue(l.K)}}).next(()=>D.waitFor(r))}options(e,t){let r;return e!==void 0&&(typeof e=="string"?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const r=this.store.index(e.index);return e.Y?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function Gn(n){return new D((e,t)=>{n.onsuccess=r=>{const s=r.target.result;e(s)},n.onerror=r=>{const s=Jl(r.target.error);t(s)}})}let $h=!1;function Jl(n){const e=_n.C(Oe());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(t)>=0){const r=new q("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return $h||($h=!0,setTimeout(()=>{throw r},0)),r}}return n}const ti="IndexBackfiller";class dE{constructor(e,t){this.asyncQueue=e,this.ee=t,this.task=null}start(){this.te(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}te(e){B(ti,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{const t=await this.ee.ne();B(ti,`Documents written: ${t}`)}catch(t){Cn(t)?B(ti,"Ignoring IndexedDB error during index backfill: ",t):await mr(t)}await this.te(6e4)})}}class hE{constructor(e,t){this.localStore=e,this.persistence=t}async ne(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.re(t,e))}re(e,t){const r=new Set;let s=t,i=!0;return D.doWhile(()=>i===!0&&s>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!r.has(o))return B(ti,`Processing collection: ${o}`),this.ie(e,o,s).next(c=>{s-=c,r.add(o)});i=!1})).next(()=>t-s)}ie(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(s=>this.localStore.localDocuments.getNextDocuments(e,t,s,r).next(i=>{const o=i.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this.se(s,i)).next(c=>(B(ti,`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c))).next(()=>o.size)}))}se(e,t){let r=e;return t.changes.forEach((s,i)=>{const o=km(i);Yl(o,r)>0&&(r=o)}),new lt(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
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
 */const Zn=-1;function La(n){return n==null}function gi(n){return n===0&&1/n==-1/0}function fE(n){return typeof n=="number"&&Number.isInteger(n)&&!gi(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ea="";function He(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=qh(e)),e=pE(n.get(t),e);return qh(e)}function pE(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case ea:t+="";break;default:t+=i}}return t}function qh(n){return n+ea+""}function At(n){const e=n.length;if(Y(e>=2),e===2)return Y(n.charAt(0)===ea&&n.charAt(1)===""),me.emptyPath();const t=e-2,r=[];let s="";for(let i=0;i<e;){const o=n.indexOf(ea,i);switch((o<0||o>t)&&Q(),n.charAt(o+1)){case"":const c=n.substring(i,o);let l;s.length===0?l=c:(s+=c,l=s,s=""),r.push(l);break;case"":s+=n.substring(i,o),s+="\0";break;case"":s+=n.substring(i,o+1);break;default:Q()}i=o+2}return new me(r)}/**
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
 */const jn="remoteDocuments",Oi="owner",Sr="owner",_i="mutationQueues",mE="userId",yt="mutations",jh="batchId",Qn="userMutationsIndex",zh=["userId","batchId"];/**
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
 */function Vo(n,e){return[n,He(e)]}function Vm(n,e,t){return[n,He(e),t]}const gE={},Yr="documentMutations",ta="remoteDocumentsV14",_E=["prefixPath","collectionGroup","readTime","documentId"],Oo="documentKeyIndex",yE=["prefixPath","collectionGroup","documentId"],Om="collectionGroupIndex",vE=["collectionGroup","readTime","prefixPath","documentId"],yi="remoteDocumentGlobal",ol="remoteDocumentGlobalKey",Jr="targets",Lm="queryTargetsIndex",bE=["canonicalId","targetId"],Xr="targetDocuments",IE=["targetId","path"],Xl="documentTargetsIndex",wE=["path","targetId"],na="targetGlobalKey",er="targetGlobal",vi="collectionParents",EE=["collectionId","parent"],Zr="clientMetadata",TE="clientId",Ma="bundles",AE="bundleId",Fa="namedQueries",SE="name",Zl="indexConfiguration",RE="indexId",al="collectionGroupIndex",CE="collectionGroup",ra="indexState",PE=["indexId","uid"],Mm="sequenceNumberIndex",kE=["uid","sequenceNumber"],sa="indexEntries",xE=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],Fm="documentKeyIndex",DE=["indexId","uid","orderedDocumentKey"],Ua="documentOverlays",NE=["userId","collectionPath","documentId"],cl="collectionPathOverlayIndex",VE=["userId","collectionPath","largestBatchId"],Um="collectionGroupOverlayIndex",OE=["userId","collectionGroup","largestBatchId"],eu="globals",LE="name",Bm=[_i,yt,Yr,jn,Jr,Oi,er,Xr,Zr,yi,vi,Ma,Fa],ME=[...Bm,Ua],$m=[_i,yt,Yr,ta,Jr,Oi,er,Xr,Zr,yi,vi,Ma,Fa,Ua],qm=$m,tu=[...qm,Zl,ra,sa],FE=tu,UE=[...tu,eu];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ll extends Dm{constructor(e,t){super(),this.ue=e,this.currentSequenceNumber=t}}function Le(n,e){const t=ne(n);return _n.M(t.ue,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gh(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Pn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function jm(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee{constructor(e,t){this.comparator=e,this.root=t||Ue.EMPTY}insert(e,t){return new Ee(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Ue.BLACK,null,null))}remove(e){return new Ee(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ue.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new fo(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new fo(this.root,e,this.comparator,!1)}getReverseIterator(){return new fo(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new fo(this.root,e,this.comparator,!0)}}class fo{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ue{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??Ue.RED,this.left=s??Ue.EMPTY,this.right=i??Ue.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new Ue(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Ue.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Ue.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ue.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ue.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw Q();const e=this.left.check();if(e!==this.right.check())throw Q();return e+(this.isRed()?0:1)}}Ue.EMPTY=null,Ue.RED=!0,Ue.BLACK=!1;Ue.EMPTY=new class{constructor(){this.size=0}get key(){throw Q()}get value(){throw Q()}get color(){throw Q()}get left(){throw Q()}get right(){throw Q()}copy(e,t,r,s,i){return this}insert(e,t,r){return new Ue(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ye{constructor(e){this.comparator=e,this.data=new Ee(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Hh(this.data.getIterator())}getIteratorFrom(e){return new Hh(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof ye)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new ye(this.comparator);return t.data=e,t}}class Hh{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Rr(n){return n.hasNext()?n.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(e){this.fields=e,e.sort(Te.comparator)}static empty(){return new rt([])}unionWith(e){let t=new ye(Te.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new rt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Qr(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
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
 */class zm extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new zm("Invalid base64 string: "+i):i}}(e);return new xe(t)}static fromUint8Array(e){const t=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(e);return new xe(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return te(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}xe.EMPTY_BYTE_STRING=new xe("");const BE=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Ht(n){if(Y(!!n),typeof n=="string"){let e=0;const t=BE.exec(n);if(Y(!!t),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:we(n.seconds),nanos:we(n.nanos)}}function we(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Kt(n){return typeof n=="string"?xe.fromBase64String(n):xe.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gm="server_timestamp",Hm="__type__",Km="__previous_value__",Wm="__local_write_time__";function Ba(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[Hm])===null||t===void 0?void 0:t.stringValue)===Gm}function $a(n){const e=n.mapValue.fields[Km];return Ba(e)?$a(e):e}function bi(n){const e=Ht(n.mapValue.fields[Wm].timestampValue);return new Ae(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $E{constructor(e,t,r,s,i,o,c,l,h){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=h}}const ia="(default)";class ir{constructor(e,t){this.projectId=e,this.database=t||ia}static empty(){return new ir("","")}get isDefaultDatabase(){return this.database===ia}isEqual(e){return e instanceof ir&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nu="__type__",Qm="__max__",hn={mapValue:{fields:{__type__:{stringValue:Qm}}}},ru="__vector__",es="value",Lo={nullValue:"NULL_VALUE"};function bn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Ba(n)?4:Ym(n)?9007199254740991:qa(n)?10:11:Q()}function xt(n,e){if(n===e)return!0;const t=bn(n);if(t!==bn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return bi(n).isEqual(bi(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=Ht(s.timestampValue),c=Ht(i.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,i){return Kt(s.bytesValue).isEqual(Kt(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,i){return we(s.geoPointValue.latitude)===we(i.geoPointValue.latitude)&&we(s.geoPointValue.longitude)===we(i.geoPointValue.longitude)}(n,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return we(s.integerValue)===we(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=we(s.doubleValue),c=we(i.doubleValue);return o===c?gi(o)===gi(c):isNaN(o)&&isNaN(c)}return!1}(n,e);case 9:return Qr(n.arrayValue.values||[],e.arrayValue.values||[],xt);case 10:case 11:return function(s,i){const o=s.mapValue.fields||{},c=i.mapValue.fields||{};if(Gh(o)!==Gh(c))return!1;for(const l in o)if(o.hasOwnProperty(l)&&(c[l]===void 0||!xt(o[l],c[l])))return!1;return!0}(n,e);default:return Q()}}function Ii(n,e){return(n.values||[]).find(t=>xt(t,e))!==void 0}function In(n,e){if(n===e)return 0;const t=bn(n),r=bn(e);if(t!==r)return te(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return te(n.booleanValue,e.booleanValue);case 2:return function(i,o){const c=we(i.integerValue||i.doubleValue),l=we(o.integerValue||o.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1}(n,e);case 3:return Kh(n.timestampValue,e.timestampValue);case 4:return Kh(bi(n),bi(e));case 5:return sl(n.stringValue,e.stringValue);case 6:return function(i,o){const c=Kt(i),l=Kt(o);return c.compareTo(l)}(n.bytesValue,e.bytesValue);case 7:return function(i,o){const c=i.split("/"),l=o.split("/");for(let h=0;h<c.length&&h<l.length;h++){const p=te(c[h],l[h]);if(p!==0)return p}return te(c.length,l.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,o){const c=te(we(i.latitude),we(o.latitude));return c!==0?c:te(we(i.longitude),we(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Wh(n.arrayValue,e.arrayValue);case 10:return function(i,o){var c,l,h,p;const m=i.fields||{},b=o.fields||{},A=(c=m[es])===null||c===void 0?void 0:c.arrayValue,P=(l=b[es])===null||l===void 0?void 0:l.arrayValue,R=te(((h=A?.values)===null||h===void 0?void 0:h.length)||0,((p=P?.values)===null||p===void 0?void 0:p.length)||0);return R!==0?R:Wh(A,P)}(n.mapValue,e.mapValue);case 11:return function(i,o){if(i===hn.mapValue&&o===hn.mapValue)return 0;if(i===hn.mapValue)return 1;if(o===hn.mapValue)return-1;const c=i.fields||{},l=Object.keys(c),h=o.fields||{},p=Object.keys(h);l.sort(),p.sort();for(let m=0;m<l.length&&m<p.length;++m){const b=sl(l[m],p[m]);if(b!==0)return b;const A=In(c[l[m]],h[p[m]]);if(A!==0)return A}return te(l.length,p.length)}(n.mapValue,e.mapValue);default:throw Q()}}function Kh(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return te(n,e);const t=Ht(n),r=Ht(e),s=te(t.seconds,r.seconds);return s!==0?s:te(t.nanos,r.nanos)}function Wh(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=In(t[s],r[s]);if(i)return i}return te(t.length,r.length)}function ts(n){return ul(n)}function ul(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=Ht(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Kt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return K.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=ul(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${ul(t.fields[o])}`;return s+"}"}(n.mapValue):Q()}function Mo(n){switch(bn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=$a(n);return e?16+Mo(e):16;case 5:return 2*n.stringValue.length;case 6:return Kt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+Mo(i),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return Pn(r.fields,(i,o)=>{s+=i.length+Mo(o)}),s}(n.mapValue);default:throw Q()}}function or(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function dl(n){return!!n&&"integerValue"in n}function wi(n){return!!n&&"arrayValue"in n}function Qh(n){return!!n&&"nullValue"in n}function Yh(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Fo(n){return!!n&&"mapValue"in n}function qa(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[nu])===null||t===void 0?void 0:t.stringValue)===ru}function ni(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return Pn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=ni(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=ni(n.arrayValue.values[t]);return e}return Object.assign({},n)}function Ym(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Qm}const Jm={mapValue:{fields:{[nu]:{stringValue:ru},[es]:{arrayValue:{}}}}};function qE(n){return"nullValue"in n?Lo:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?or(ir.empty(),K.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?qa(n)?Jm:{mapValue:{}}:Q()}function jE(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?or(ir.empty(),K.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?Jm:"mapValue"in n?qa(n)?{mapValue:{}}:hn:Q()}function Jh(n,e){const t=In(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?-1:!n.inclusive&&e.inclusive?1:0}function Xh(n,e){const t=In(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?1:!n.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{constructor(e){this.value=e}static empty(){return new Ge({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Fo(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=ni(t)}setAll(e){let t=Te.emptyPath(),r={},s=[];e.forEach((o,c)=>{if(!t.isImmediateParentOf(c)){const l=this.getFieldsMap(t);this.applyChanges(l,r,s),r={},s=[],t=c.popLast()}o?r[c.lastSegment()]=ni(o):s.push(c.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());Fo(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return xt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Fo(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){Pn(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new Ge(ni(this.value))}}function Xm(n){const e=[];return Pn(n.fields,(t,r)=>{const s=new Te([t]);if(Fo(r)){const i=Xm(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new rt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class wn{constructor(e,t){this.position=e,this.inclusive=t}}function Zh(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],o=n.position[s];if(i.field.isKeyField()?r=K.comparator(K.fromName(o.referenceValue),t.key):r=In(o,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function ef(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!xt(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class Ei{constructor(e,t="asc"){this.field=e,this.dir=t}}function zE(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class Zm{}class le extends Zm{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new GE(e,t,r):t==="array-contains"?new WE(e,r):t==="in"?new ig(e,r):t==="not-in"?new QE(e,r):t==="array-contains-any"?new YE(e,r):new le(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new HE(e,r):new KE(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(In(t,this.value)):t!==null&&bn(this.value)===bn(t)&&this.matchesComparison(In(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return Q()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class _e extends Zm{constructor(e,t){super(),this.filters=e,this.op=t,this.ce=null}static create(e,t){return new _e(e,t)}matches(e){return ns(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ce!==null||(this.ce=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ce}getFilters(){return Object.assign([],this.filters)}}function ns(n){return n.op==="and"}function hl(n){return n.op==="or"}function su(n){return eg(n)&&ns(n)}function eg(n){for(const e of n.filters)if(e instanceof _e)return!1;return!0}function fl(n){if(n instanceof le)return n.field.canonicalString()+n.op.toString()+ts(n.value);if(su(n))return n.filters.map(e=>fl(e)).join(",");{const e=n.filters.map(t=>fl(t)).join(",");return`${n.op}(${e})`}}function tg(n,e){return n instanceof le?function(r,s){return s instanceof le&&r.op===s.op&&r.field.isEqual(s.field)&&xt(r.value,s.value)}(n,e):n instanceof _e?function(r,s){return s instanceof _e&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,o,c)=>i&&tg(o,s.filters[c]),!0):!1}(n,e):void Q()}function ng(n,e){const t=n.filters.concat(e);return _e.create(t,n.op)}function rg(n){return n instanceof le?function(t){return`${t.field.canonicalString()} ${t.op} ${ts(t.value)}`}(n):n instanceof _e?function(t){return t.op.toString()+" {"+t.getFilters().map(rg).join(" ,")+"}"}(n):"Filter"}class GE extends le{constructor(e,t,r){super(e,t,r),this.key=K.fromName(r.referenceValue)}matches(e){const t=K.comparator(e.key,this.key);return this.matchesComparison(t)}}class HE extends le{constructor(e,t){super(e,"in",t),this.keys=sg("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class KE extends le{constructor(e,t){super(e,"not-in",t),this.keys=sg("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function sg(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>K.fromName(r.referenceValue))}class WE extends le{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return wi(t)&&Ii(t.arrayValue,this.value)}}class ig extends le{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Ii(this.value.arrayValue,t)}}class QE extends le{constructor(e,t){super(e,"not-in",t)}matches(e){if(Ii(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!Ii(this.value.arrayValue,t)}}class YE extends le{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!wi(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Ii(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JE{constructor(e,t=null,r=[],s=[],i=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.le=null}}function pl(n,e=null,t=[],r=[],s=null,i=null,o=null){return new JE(n,e,t,r,s,i,o)}function ar(n){const e=ne(n);if(e.le===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>fl(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),La(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>ts(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>ts(r)).join(",")),e.le=t}return e.le}function Li(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!zE(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!tg(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!ef(n.startAt,e.startAt)&&ef(n.endAt,e.endAt)}function oa(n){return K.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function aa(n,e){return n.filters.filter(t=>t instanceof le&&t.field.isEqual(e))}function tf(n,e,t){let r=Lo,s=!0;for(const i of aa(n,e)){let o=Lo,c=!0;switch(i.op){case"<":case"<=":o=qE(i.value);break;case"==":case"in":case">=":o=i.value;break;case">":o=i.value,c=!1;break;case"!=":case"not-in":o=Lo}Jh({value:r,inclusive:s},{value:o,inclusive:c})<0&&(r=o,s=c)}if(t!==null){for(let i=0;i<n.orderBy.length;++i)if(n.orderBy[i].field.isEqual(e)){const o=t.position[i];Jh({value:r,inclusive:s},{value:o,inclusive:t.inclusive})<0&&(r=o,s=t.inclusive);break}}return{value:r,inclusive:s}}function nf(n,e,t){let r=hn,s=!0;for(const i of aa(n,e)){let o=hn,c=!0;switch(i.op){case">=":case">":o=jE(i.value),c=!1;break;case"==":case"in":case"<=":o=i.value;break;case"<":o=i.value,c=!1;break;case"!=":case"not-in":o=hn}Xh({value:r,inclusive:s},{value:o,inclusive:c})>0&&(r=o,s=c)}if(t!==null){for(let i=0;i<n.orderBy.length;++i)if(n.orderBy[i].field.isEqual(e)){const o=t.position[i];Xh({value:r,inclusive:s},{value:o,inclusive:t.inclusive})>0&&(r=o,s=t.inclusive);break}}return{value:r,inclusive:s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gr{constructor(e,t=null,r=[],s=[],i=null,o="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=l,this.he=null,this.Pe=null,this.Te=null,this.startAt,this.endAt}}function XE(n,e,t,r,s,i,o,c){return new gr(n,e,t,r,s,i,o,c)}function Mi(n){return new gr(n)}function rf(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function iu(n){return n.collectionGroup!==null}function jr(n){const e=ne(n);if(e.he===null){e.he=[];const t=new Set;for(const i of e.explicitOrderBy)e.he.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new ye(Te.comparator);return o.filters.forEach(l=>{l.getFlattenedFilters().forEach(h=>{h.isInequality()&&(c=c.add(h.field))})}),c})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.he.push(new Ei(i,r))}),t.has(Te.keyField().canonicalString())||e.he.push(new Ei(Te.keyField(),r))}return e.he}function ft(n){const e=ne(n);return e.Pe||(e.Pe=ZE(e,jr(n))),e.Pe}function ZE(n,e){if(n.limitType==="F")return pl(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Ei(s.field,i)});const t=n.endAt?new wn(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new wn(n.startAt.position,n.startAt.inclusive):null;return pl(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function ml(n,e){const t=n.filters.concat([e]);return new gr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function ca(n,e,t){return new gr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function ja(n,e){return Li(ft(n),ft(e))&&n.limitType===e.limitType}function og(n){return`${ar(ft(n))}|lt:${n.limitType}`}function Nr(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>rg(s)).join(", ")}]`),La(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>ts(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>ts(s)).join(",")),`Target(${r})`}(ft(n))}; limitType=${n.limitType})`}function Fi(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):K.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of jr(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(o,c,l){const h=Zh(o,c,l);return o.inclusive?h<=0:h<0}(r.startAt,jr(r),s)||r.endAt&&!function(o,c,l){const h=Zh(o,c,l);return o.inclusive?h>=0:h>0}(r.endAt,jr(r),s))}(n,e)}function eT(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function ag(n){return(e,t)=>{let r=!1;for(const s of jr(n)){const i=tT(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function tT(n,e,t){const r=n.field.isKeyField()?K.comparator(e.key,t.key):function(i,o,c){const l=o.data.field(i),h=c.data.field(i);return l!==null&&h!==null?In(l,h):Q()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return Q()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Pn(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return jm(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nT=new Ee(K.comparator);function ct(){return nT}const cg=new Ee(K.comparator);function Ws(...n){let e=cg;for(const t of n)e=e.insert(t.key,t);return e}function lg(n){let e=cg;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function St(){return ri()}function ug(){return ri()}function ri(){return new Wt(n=>n.toString(),(n,e)=>n.isEqual(e))}const rT=new Ee(K.comparator),sT=new ye(K.comparator);function oe(...n){let e=sT;for(const t of n)e=e.add(t);return e}const iT=new ye(te);function oT(){return iT}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ou(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:gi(e)?"-0":e}}function dg(n){return{integerValue:""+n}}function hg(n,e){return fE(e)?dg(e):ou(n,e)}/**
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
 */class za{constructor(){this._=void 0}}function aT(n,e,t){return n instanceof Ti?function(s,i){const o={fields:{[Hm]:{stringValue:Gm},[Wm]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Ba(i)&&(i=$a(i)),i&&(o.fields[Km]=i),{mapValue:o}}(t,e):n instanceof rs?pg(n,e):n instanceof ss?mg(n,e):function(s,i){const o=fg(s,i),c=sf(o)+sf(s.Ie);return dl(o)&&dl(s.Ie)?dg(c):ou(s.serializer,c)}(n,e)}function cT(n,e,t){return n instanceof rs?pg(n,e):n instanceof ss?mg(n,e):t}function fg(n,e){return n instanceof is?function(r){return dl(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class Ti extends za{}class rs extends za{constructor(e){super(),this.elements=e}}function pg(n,e){const t=gg(e);for(const r of n.elements)t.some(s=>xt(s,r))||t.push(r);return{arrayValue:{values:t}}}class ss extends za{constructor(e){super(),this.elements=e}}function mg(n,e){let t=gg(e);for(const r of n.elements)t=t.filter(s=>!xt(s,r));return{arrayValue:{values:t}}}class is extends za{constructor(e,t){super(),this.serializer=e,this.Ie=t}}function sf(n){return we(n.integerValue||n.doubleValue)}function gg(n){return wi(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _g{constructor(e,t){this.field=e,this.transform=t}}function lT(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof rs&&s instanceof rs||r instanceof ss&&s instanceof ss?Qr(r.elements,s.elements,xt):r instanceof is&&s instanceof is?xt(r.Ie,s.Ie):r instanceof Ti&&s instanceof Ti}(n.transform,e.transform)}class uT{constructor(e,t){this.version=e,this.transformResults=t}}class Ze{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Ze}static exists(e){return new Ze(void 0,e)}static updateTime(e){return new Ze(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Uo(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Ga{}function yg(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new au(n.key,Ze.none()):new vs(n.key,n.data,Ze.none());{const t=n.data,r=Ge.empty();let s=new ye(Te.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new Qt(n.key,r,new rt(s.toArray()),Ze.none())}}function dT(n,e,t){n instanceof vs?function(s,i,o){const c=s.value.clone(),l=af(s.fieldTransforms,i,o.transformResults);c.setAll(l),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(n,e,t):n instanceof Qt?function(s,i,o){if(!Uo(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=af(s.fieldTransforms,i,o.transformResults),l=i.data;l.setAll(vg(s)),l.setAll(c),i.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(n,e,t):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function si(n,e,t,r){return n instanceof vs?function(i,o,c,l){if(!Uo(i.precondition,o))return c;const h=i.value.clone(),p=cf(i.fieldTransforms,l,o);return h.setAll(p),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null}(n,e,t,r):n instanceof Qt?function(i,o,c,l){if(!Uo(i.precondition,o))return c;const h=cf(i.fieldTransforms,l,o),p=o.data;return p.setAll(vg(i)),p.setAll(h),o.convertToFoundDocument(o.version,p).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(m=>m.field))}(n,e,t,r):function(i,o,c){return Uo(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c}(n,e,t)}function hT(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=fg(r.transform,s||null);i!=null&&(t===null&&(t=Ge.empty()),t.set(r.field,i))}return t||null}function of(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Qr(r,s,(i,o)=>lT(i,o))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class vs extends Ga{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Qt extends Ga{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function vg(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function af(n,e,t){const r=new Map;Y(n.length===t.length);for(let s=0;s<t.length;s++){const i=n[s],o=i.transform,c=e.data.field(i.field);r.set(i.field,cT(o,c,t[s]))}return r}function cf(n,e,t){const r=new Map;for(const s of n){const i=s.transform,o=t.data.field(s.field);r.set(s.field,aT(i,o,e))}return r}class au extends Ga{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class bg extends Ga{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cu{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&dT(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=si(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=si(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=ug();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=t.has(s.key)?null:c;const l=yg(o,c);l!==null&&r.set(s.key,l),o.isValidDocument()||o.convertToNoDocument(J.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),oe())}isEqual(e){return this.batchId===e.batchId&&Qr(this.mutations,e.mutations,(t,r)=>of(t,r))&&Qr(this.baseMutations,e.baseMutations,(t,r)=>of(t,r))}}class lu{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){Y(e.mutations.length===r.length);let s=function(){return rT}();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new lu(e,t,r,s)}}/**
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
 */class uu{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class fT{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ke,de;function pT(n){switch(n){case L.OK:return Q();case L.CANCELLED:case L.UNKNOWN:case L.DEADLINE_EXCEEDED:case L.RESOURCE_EXHAUSTED:case L.INTERNAL:case L.UNAVAILABLE:case L.UNAUTHENTICATED:return!1;case L.INVALID_ARGUMENT:case L.NOT_FOUND:case L.ALREADY_EXISTS:case L.PERMISSION_DENIED:case L.FAILED_PRECONDITION:case L.ABORTED:case L.OUT_OF_RANGE:case L.UNIMPLEMENTED:case L.DATA_LOSS:return!0;default:return Q()}}function Ig(n){if(n===void 0)return Xe("GRPC error has no .code"),L.UNKNOWN;switch(n){case ke.OK:return L.OK;case ke.CANCELLED:return L.CANCELLED;case ke.UNKNOWN:return L.UNKNOWN;case ke.DEADLINE_EXCEEDED:return L.DEADLINE_EXCEEDED;case ke.RESOURCE_EXHAUSTED:return L.RESOURCE_EXHAUSTED;case ke.INTERNAL:return L.INTERNAL;case ke.UNAVAILABLE:return L.UNAVAILABLE;case ke.UNAUTHENTICATED:return L.UNAUTHENTICATED;case ke.INVALID_ARGUMENT:return L.INVALID_ARGUMENT;case ke.NOT_FOUND:return L.NOT_FOUND;case ke.ALREADY_EXISTS:return L.ALREADY_EXISTS;case ke.PERMISSION_DENIED:return L.PERMISSION_DENIED;case ke.FAILED_PRECONDITION:return L.FAILED_PRECONDITION;case ke.ABORTED:return L.ABORTED;case ke.OUT_OF_RANGE:return L.OUT_OF_RANGE;case ke.UNIMPLEMENTED:return L.UNIMPLEMENTED;case ke.DATA_LOSS:return L.DATA_LOSS;default:return Q()}}(de=ke||(ke={}))[de.OK=0]="OK",de[de.CANCELLED=1]="CANCELLED",de[de.UNKNOWN=2]="UNKNOWN",de[de.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",de[de.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",de[de.NOT_FOUND=5]="NOT_FOUND",de[de.ALREADY_EXISTS=6]="ALREADY_EXISTS",de[de.PERMISSION_DENIED=7]="PERMISSION_DENIED",de[de.UNAUTHENTICATED=16]="UNAUTHENTICATED",de[de.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",de[de.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",de[de.ABORTED=10]="ABORTED",de[de.OUT_OF_RANGE=11]="OUT_OF_RANGE",de[de.UNIMPLEMENTED=12]="UNIMPLEMENTED",de[de.INTERNAL=13]="INTERNAL",de[de.UNAVAILABLE=14]="UNAVAILABLE",de[de.DATA_LOSS=15]="DATA_LOSS";/**
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
 */const mT=new gn([4294967295,4294967295],0);function lf(n){const e=rl().encode(n),t=new wm;return t.update(e),new Uint8Array(t.digest())}function uf(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new gn([t,r],0),new gn([s,i],0)]}class du{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Qs(`Invalid padding: ${t}`);if(r<0)throw new Qs(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Qs(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Qs(`Invalid padding when bitmap length is 0: ${t}`);this.Ee=8*e.length-t,this.de=gn.fromNumber(this.Ee)}Ae(e,t,r){let s=e.add(t.multiply(gn.fromNumber(r)));return s.compare(mT)===1&&(s=new gn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.de).toNumber()}Re(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.Ee===0)return!1;const t=lf(e),[r,s]=uf(t);for(let i=0;i<this.hashCount;i++){const o=this.Ae(r,s,i);if(!this.Re(o))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new du(i,s,t);return r.forEach(c=>o.insert(c)),o}insert(e){if(this.Ee===0)return;const t=lf(e),[r,s]=uf(t);for(let i=0;i<this.hashCount;i++){const o=this.Ae(r,s,i);this.Ve(o)}}Ve(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Qs extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ha{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,Ui.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Ha(J.min(),s,new Ee(te),ct(),oe())}}class Ui{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Ui(r,t,oe(),oe(),oe())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bo{constructor(e,t,r,s){this.me=e,this.removedTargetIds=t,this.key=r,this.fe=s}}class wg{constructor(e,t){this.targetId=e,this.ge=t}}class Eg{constructor(e,t,r=xe.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class df{constructor(){this.pe=0,this.ye=hf(),this.we=xe.EMPTY_BYTE_STRING,this.Se=!1,this.be=!0}get current(){return this.Se}get resumeToken(){return this.we}get De(){return this.pe!==0}get ve(){return this.be}Ce(e){e.approximateByteSize()>0&&(this.be=!0,this.we=e)}Fe(){let e=oe(),t=oe(),r=oe();return this.ye.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:Q()}}),new Ui(this.we,this.Se,e,t,r)}Me(){this.be=!1,this.ye=hf()}xe(e,t){this.be=!0,this.ye=this.ye.insert(e,t)}Oe(e){this.be=!0,this.ye=this.ye.remove(e)}Ne(){this.pe+=1}Be(){this.pe-=1,Y(this.pe>=0)}Le(){this.be=!0,this.Se=!0}}class gT{constructor(e){this.ke=e,this.qe=new Map,this.Qe=ct(),this.$e=po(),this.Ue=po(),this.Ke=new Ee(te)}We(e){for(const t of e.me)e.fe&&e.fe.isFoundDocument()?this.Ge(t,e.fe):this.ze(t,e.key,e.fe);for(const t of e.removedTargetIds)this.ze(t,e.key,e.fe)}je(e){this.forEachTarget(e,t=>{const r=this.He(t);switch(e.state){case 0:this.Je(t)&&r.Ce(e.resumeToken);break;case 1:r.Be(),r.De||r.Me(),r.Ce(e.resumeToken);break;case 2:r.Be(),r.De||this.removeTarget(t);break;case 3:this.Je(t)&&(r.Le(),r.Ce(e.resumeToken));break;case 4:this.Je(t)&&(this.Ye(t),r.Ce(e.resumeToken));break;default:Q()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.qe.forEach((r,s)=>{this.Je(s)&&t(s)})}Ze(e){const t=e.targetId,r=e.ge.count,s=this.Xe(t);if(s){const i=s.target;if(oa(i))if(r===0){const o=new K(i.path);this.ze(t,o,Ce.newNoDocument(o,J.min()))}else Y(r===1);else{const o=this.et(t);if(o!==r){const c=this.tt(e),l=c?this.nt(c,e,o):1;if(l!==0){this.Ye(t);const h=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ke=this.Ke.insert(t,h)}}}}}tt(e){const t=e.ge.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let o,c;try{o=Kt(r).toUint8Array()}catch(l){if(l instanceof zm)return fi("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new du(o,s,i)}catch(l){return fi(l instanceof Qs?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.Ee===0?null:c}nt(e,t,r){return t.ge.count===r-this.st(e,t.targetId)?0:2}st(e,t){const r=this.ke.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const o=this.ke.it(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.ze(t,i,null),s++)}),s}ot(e){const t=new Map;this.qe.forEach((i,o)=>{const c=this.Xe(o);if(c){if(i.current&&oa(c.target)){const l=new K(c.target.path);this._t(l).has(o)||this.ut(o,l)||this.ze(o,l,Ce.newNoDocument(l,e))}i.ve&&(t.set(o,i.Fe()),i.Me())}});let r=oe();this.Ue.forEach((i,o)=>{let c=!0;o.forEachWhile(l=>{const h=this.Xe(l);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(i))}),this.Qe.forEach((i,o)=>o.setReadTime(e));const s=new Ha(e,t,this.Ke,this.Qe,r);return this.Qe=ct(),this.$e=po(),this.Ue=po(),this.Ke=new Ee(te),s}Ge(e,t){if(!this.Je(e))return;const r=this.ut(e,t.key)?2:0;this.He(e).xe(t.key,r),this.Qe=this.Qe.insert(t.key,t),this.$e=this.$e.insert(t.key,this._t(t.key).add(e)),this.Ue=this.Ue.insert(t.key,this.ct(t.key).add(e))}ze(e,t,r){if(!this.Je(e))return;const s=this.He(e);this.ut(e,t)?s.xe(t,1):s.Oe(t),this.Ue=this.Ue.insert(t,this.ct(t).delete(e)),this.Ue=this.Ue.insert(t,this.ct(t).add(e)),r&&(this.Qe=this.Qe.insert(t,r))}removeTarget(e){this.qe.delete(e)}et(e){const t=this.He(e).Fe();return this.ke.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ne(e){this.He(e).Ne()}He(e){let t=this.qe.get(e);return t||(t=new df,this.qe.set(e,t)),t}ct(e){let t=this.Ue.get(e);return t||(t=new ye(te),this.Ue=this.Ue.insert(e,t)),t}_t(e){let t=this.$e.get(e);return t||(t=new ye(te),this.$e=this.$e.insert(e,t)),t}Je(e){const t=this.Xe(e)!==null;return t||B("WatchChangeAggregator","Detected inactive target",e),t}Xe(e){const t=this.qe.get(e);return t&&t.De?null:this.ke.lt(e)}Ye(e){this.qe.set(e,new df),this.ke.getRemoteKeysForTarget(e).forEach(t=>{this.ze(e,t,null)})}ut(e,t){return this.ke.getRemoteKeysForTarget(e).has(t)}}function po(){return new Ee(K.comparator)}function hf(){return new Ee(K.comparator)}const _T={asc:"ASCENDING",desc:"DESCENDING"},yT={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},vT={and:"AND",or:"OR"};class bT{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function gl(n,e){return n.useProto3Json||La(e)?e:{value:e}}function os(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Tg(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function IT(n,e){return os(n,e.toTimestamp())}function et(n){return Y(!!n),J.fromTimestamp(function(t){const r=Ht(t);return new Ae(r.seconds,r.nanos)}(n))}function hu(n,e){return _l(n,e).canonicalString()}function _l(n,e){const t=function(s){return new me(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Ag(n){const e=me.fromString(n);return Y(Vg(e)),e}function la(n,e){return hu(n.databaseId,e.path)}function tr(n,e){const t=Ag(e);if(t.get(1)!==n.databaseId.projectId)throw new q(L.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new q(L.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new K(Cg(t))}function Sg(n,e){return hu(n.databaseId,e)}function Rg(n){const e=Ag(n);return e.length===4?me.emptyPath():Cg(e)}function yl(n){return new me(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Cg(n){return Y(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function ff(n,e,t){return{name:la(n,e),fields:t.value.mapValue.fields}}function wT(n,e,t){const r=tr(n,e.name),s=et(e.updateTime),i=e.createTime?et(e.createTime):J.min(),o=new Ge({mapValue:{fields:e.fields}}),c=Ce.newFoundDocument(r,s,i,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function ET(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:Q()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(h,p){return h.useProto3Json?(Y(p===void 0||typeof p=="string"),xe.fromBase64String(p||"")):(Y(p===void 0||p instanceof Buffer||p instanceof Uint8Array),xe.fromUint8Array(p||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&function(h){const p=h.code===void 0?L.UNKNOWN:Ig(h.code);return new q(p,h.message||"")}(o);t=new Eg(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=tr(n,r.document.name),i=et(r.document.updateTime),o=r.document.createTime?et(r.document.createTime):J.min(),c=new Ge({mapValue:{fields:r.document.fields}}),l=Ce.newFoundDocument(s,i,o,c),h=r.targetIds||[],p=r.removedTargetIds||[];t=new Bo(h,p,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=tr(n,r.document),i=r.readTime?et(r.readTime):J.min(),o=Ce.newNoDocument(s,i),c=r.removedTargetIds||[];t=new Bo([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=tr(n,r.document),i=r.removedTargetIds||[];t=new Bo([],i,s,null)}else{if(!("filter"in e))return Q();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new fT(s,i),c=r.targetId;t=new wg(c,o)}}return t}function ua(n,e){let t;if(e instanceof vs)t={update:ff(n,e.key,e.value)};else if(e instanceof au)t={delete:la(n,e.key)};else if(e instanceof Qt)t={update:ff(n,e.key,e.data),updateMask:PT(e.fieldMask)};else{if(!(e instanceof bg))return Q();t={verify:la(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,o){const c=o.transform;if(c instanceof Ti)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof rs)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof ss)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof is)return{fieldPath:o.field.canonicalString(),increment:c.Ie};throw Q()}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:IT(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:Q()}(n,e.precondition)),t}function vl(n,e){const t=e.currentDocument?function(i){return i.updateTime!==void 0?Ze.updateTime(et(i.updateTime)):i.exists!==void 0?Ze.exists(i.exists):Ze.none()}(e.currentDocument):Ze.none(),r=e.updateTransforms?e.updateTransforms.map(s=>function(o,c){let l=null;if("setToServerValue"in c)Y(c.setToServerValue==="REQUEST_TIME"),l=new Ti;else if("appendMissingElements"in c){const p=c.appendMissingElements.values||[];l=new rs(p)}else if("removeAllFromArray"in c){const p=c.removeAllFromArray.values||[];l=new ss(p)}else"increment"in c?l=new is(o,c.increment):Q();const h=Te.fromServerFormat(c.fieldPath);return new _g(h,l)}(n,s)):[];if(e.update){e.update.name;const s=tr(n,e.update.name),i=new Ge({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(l){const h=l.fieldPaths||[];return new rt(h.map(p=>Te.fromServerFormat(p)))}(e.updateMask);return new Qt(s,i,o,t,r)}return new vs(s,i,t,r)}if(e.delete){const s=tr(n,e.delete);return new au(s,t)}if(e.verify){const s=tr(n,e.verify);return new bg(s,t)}return Q()}function TT(n,e){return n&&n.length>0?(Y(e!==void 0),n.map(t=>function(s,i){let o=s.updateTime?et(s.updateTime):et(i);return o.isEqual(J.min())&&(o=et(i)),new uT(o,s.transformResults||[])}(t,e))):[]}function Pg(n,e){return{documents:[Sg(n,e.path)]}}function kg(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Sg(n,s);const i=function(h){if(h.length!==0)return Ng(_e.create(h,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const o=function(h){if(h.length!==0)return h.map(p=>function(b){return{field:Vr(b.field),direction:ST(b.dir)}}(p))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=gl(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{ht:t,parent:s}}function xg(n){let e=Rg(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){Y(r===1);const p=t.from[0];p.allDescendants?s=p.collectionId:e=e.child(p.collectionId)}let i=[];t.where&&(i=function(m){const b=Dg(m);return b instanceof _e&&su(b)?b.getFilters():[b]}(t.where));let o=[];t.orderBy&&(o=function(m){return m.map(b=>function(P){return new Ei(Or(P.field),function(S){switch(S){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(P.direction))}(b))}(t.orderBy));let c=null;t.limit&&(c=function(m){let b;return b=typeof m=="object"?m.value:m,La(b)?null:b}(t.limit));let l=null;t.startAt&&(l=function(m){const b=!!m.before,A=m.values||[];return new wn(A,b)}(t.startAt));let h=null;return t.endAt&&(h=function(m){const b=!m.before,A=m.values||[];return new wn(A,b)}(t.endAt)),XE(e,s,o,i,c,"F",l,h)}function AT(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return Q()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Dg(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Or(t.unaryFilter.field);return le.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Or(t.unaryFilter.field);return le.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Or(t.unaryFilter.field);return le.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Or(t.unaryFilter.field);return le.create(o,"!=",{nullValue:"NULL_VALUE"});default:return Q()}}(n):n.fieldFilter!==void 0?function(t){return le.create(Or(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return Q()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return _e.create(t.compositeFilter.filters.map(r=>Dg(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return Q()}}(t.compositeFilter.op))}(n):Q()}function ST(n){return _T[n]}function RT(n){return yT[n]}function CT(n){return vT[n]}function Vr(n){return{fieldPath:n.canonicalString()}}function Or(n){return Te.fromServerFormat(n.fieldPath)}function Ng(n){return n instanceof le?function(t){if(t.op==="=="){if(Yh(t.value))return{unaryFilter:{field:Vr(t.field),op:"IS_NAN"}};if(Qh(t.value))return{unaryFilter:{field:Vr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Yh(t.value))return{unaryFilter:{field:Vr(t.field),op:"IS_NOT_NAN"}};if(Qh(t.value))return{unaryFilter:{field:Vr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Vr(t.field),op:RT(t.op),value:t.value}}}(n):n instanceof _e?function(t){const r=t.getFilters().map(s=>Ng(s));return r.length===1?r[0]:{compositeFilter:{op:CT(t.op),filters:r}}}(n):Q()}function PT(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Vg(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt{constructor(e,t,r,s,i=J.min(),o=J.min(),c=xe.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new qt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new qt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new qt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new qt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Og{constructor(e){this.Tt=e}}function kT(n,e){let t;if(e.document)t=wT(n.Tt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const r=K.fromSegments(e.noDocument.path),s=lr(e.noDocument.readTime);t=Ce.newNoDocument(r,s),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return Q();{const r=K.fromSegments(e.unknownDocument.path),s=lr(e.unknownDocument.version);t=Ce.newUnknownDocument(r,s)}}return e.readTime&&t.setReadTime(function(s){const i=new Ae(s[0],s[1]);return J.fromTimestamp(i)}(e.readTime)),t}function pf(n,e){const t=e.key,r={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:da(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=function(i,o){return{name:la(i,o.key),fields:o.data.value.mapValue.fields,updateTime:os(i,o.version.toTimestamp()),createTime:os(i,o.createTime.toTimestamp())}}(n.Tt,e);else if(e.isNoDocument())r.noDocument={path:t.path.toArray(),readTime:cr(e.version)};else{if(!e.isUnknownDocument())return Q();r.unknownDocument={path:t.path.toArray(),version:cr(e.version)}}return r}function da(n){const e=n.toTimestamp();return[e.seconds,e.nanoseconds]}function cr(n){const e=n.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function lr(n){const e=new Ae(n.seconds,n.nanoseconds);return J.fromTimestamp(e)}function Hn(n,e){const t=(e.baseMutations||[]).map(i=>vl(n.Tt,i));for(let i=0;i<e.mutations.length-1;++i){const o=e.mutations[i];if(i+1<e.mutations.length&&e.mutations[i+1].transform!==void 0){const c=e.mutations[i+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(i+1,1),++i}}const r=e.mutations.map(i=>vl(n.Tt,i)),s=Ae.fromMillis(e.localWriteTimeMs);return new cu(e.batchId,s,t,r)}function Ys(n){const e=lr(n.readTime),t=n.lastLimboFreeSnapshotVersion!==void 0?lr(n.lastLimboFreeSnapshotVersion):J.min();let r;return r=function(i){return i.documents!==void 0}(n.query)?function(i){return Y(i.documents.length===1),ft(Mi(Rg(i.documents[0])))}(n.query):function(i){return ft(xg(i))}(n.query),new qt(r,n.targetId,"TargetPurposeListen",n.lastListenSequenceNumber,e,t,xe.fromBase64String(n.resumeToken))}function Lg(n,e){const t=cr(e.snapshotVersion),r=cr(e.lastLimboFreeSnapshotVersion);let s;s=oa(e.target)?Pg(n.Tt,e.target):kg(n.Tt,e.target).ht;const i=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:ar(e.target),readTime:t,resumeToken:i,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:s}}function Mg(n){const e=xg({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?ca(e,e.limit,"L"):e}function Oc(n,e){return new uu(e.largestBatchId,vl(n.Tt,e.overlayMutation))}function mf(n,e){const t=e.path.lastSegment();return[n,He(e.path.popLast()),t]}function gf(n,e,t,r){return{indexId:n,uid:e,sequenceNumber:t,readTime:cr(r.readTime),documentKey:He(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xT{getBundleMetadata(e,t){return _f(e).get(t).next(r=>{if(r)return function(i){return{id:i.bundleId,createTime:lr(i.createTime),version:i.version}}(r)})}saveBundleMetadata(e,t){return _f(e).put(function(s){return{bundleId:s.id,createTime:cr(et(s.createTime)),version:s.version}}(t))}getNamedQuery(e,t){return yf(e).get(t).next(r=>{if(r)return function(i){return{name:i.name,query:Mg(i.bundledQuery),readTime:lr(i.readTime)}}(r)})}saveNamedQuery(e,t){return yf(e).put(function(s){return{name:s.name,readTime:cr(et(s.readTime)),bundledQuery:s.bundledQuery}}(t))}}function _f(n){return Le(n,Ma)}function yf(n){return Le(n,Fa)}/**
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
 */class Ka{constructor(e,t){this.serializer=e,this.userId=t}static It(e,t){const r=t.uid||"";return new Ka(e,r)}getOverlay(e,t){return Us(e).get(mf(this.userId,t)).next(r=>r?Oc(this.serializer,r):null)}getOverlays(e,t){const r=St();return D.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){const s=[];return r.forEach((i,o)=>{const c=new uu(t,o);s.push(this.Et(e,c))}),D.waitFor(s)}removeOverlaysForBatchId(e,t,r){const s=new Set;t.forEach(o=>s.add(He(o.getCollectionPath())));const i=[];return s.forEach(o=>{const c=IDBKeyRange.bound([this.userId,o,r],[this.userId,o,r+1],!1,!0);i.push(Us(e).J(cl,c))}),D.waitFor(i)}getOverlaysForCollection(e,t,r){const s=St(),i=He(t),o=IDBKeyRange.bound([this.userId,i,r],[this.userId,i,Number.POSITIVE_INFINITY],!0);return Us(e).G(cl,o).next(c=>{for(const l of c){const h=Oc(this.serializer,l);s.set(h.getKey(),h)}return s})}getOverlaysForCollectionGroup(e,t,r,s){const i=St();let o;const c=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Us(e).Z({index:Um,range:c},(l,h,p)=>{const m=Oc(this.serializer,h);i.size()<s||m.largestBatchId===o?(i.set(m.getKey(),m),o=m.largestBatchId):p.done()}).next(()=>i)}Et(e,t){return Us(e).put(function(s,i,o){const[c,l,h]=mf(i,o.mutation.key);return{userId:i,collectionPath:l,documentId:h,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:ua(s.Tt,o.mutation)}}(this.serializer,this.userId,t))}}function Us(n){return Le(n,Ua)}/**
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
 */class DT{dt(e){return Le(e,eu)}getSessionToken(e){return this.dt(e).get("sessionToken").next(t=>{const r=t?.value;return r?xe.fromUint8Array(r):xe.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.dt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
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
 */class Kn{constructor(){}At(e,t){this.Rt(e,t),t.Vt()}Rt(e,t){if("nullValue"in e)this.ft(t,5);else if("booleanValue"in e)this.ft(t,10),t.gt(e.booleanValue?1:0);else if("integerValue"in e)this.ft(t,15),t.gt(we(e.integerValue));else if("doubleValue"in e){const r=we(e.doubleValue);isNaN(r)?this.ft(t,13):(this.ft(t,15),gi(r)?t.gt(0):t.gt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.ft(t,20),typeof r=="string"&&(r=Ht(r)),t.yt(`${r.seconds||""}`),t.gt(r.nanos||0)}else if("stringValue"in e)this.wt(e.stringValue,t),this.St(t);else if("bytesValue"in e)this.ft(t,30),t.bt(Kt(e.bytesValue)),this.St(t);else if("referenceValue"in e)this.Dt(e.referenceValue,t);else if("geoPointValue"in e){const r=e.geoPointValue;this.ft(t,45),t.gt(r.latitude||0),t.gt(r.longitude||0)}else"mapValue"in e?Ym(e)?this.ft(t,Number.MAX_SAFE_INTEGER):qa(e)?this.vt(e.mapValue,t):(this.Ct(e.mapValue,t),this.St(t)):"arrayValue"in e?(this.Ft(e.arrayValue,t),this.St(t)):Q()}wt(e,t){this.ft(t,25),this.Mt(e,t)}Mt(e,t){t.yt(e)}Ct(e,t){const r=e.fields||{};this.ft(t,55);for(const s of Object.keys(r))this.wt(s,t),this.Rt(r[s],t)}vt(e,t){var r,s;const i=e.fields||{};this.ft(t,53);const o=es,c=((s=(r=i[o].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.length)||0;this.ft(t,15),t.gt(we(c)),this.wt(o,t),this.Rt(i[o],t)}Ft(e,t){const r=e.values||[];this.ft(t,50);for(const s of r)this.Rt(s,t)}Dt(e,t){this.ft(t,37),K.fromName(e).path.forEach(r=>{this.ft(t,60),this.Mt(r,t)})}ft(e,t){e.gt(t)}St(e){e.gt(2)}}Kn.xt=new Kn;/**
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
 */const Cr=255;function NT(n){if(n===0)return 8;let e=0;return n>>4||(e+=4,n<<=4),n>>6||(e+=2,n<<=2),n>>7||(e+=1),e}function vf(n){const e=64-function(r){let s=0;for(let i=0;i<8;++i){const o=NT(255&r[i]);if(s+=o,o!==8)break}return s}(n);return Math.ceil(e/8)}class VT{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ot(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Nt(r.value),r=t.next();this.Bt()}Lt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.kt(r.value),r=t.next();this.qt()}Qt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Nt(r);else if(r<2048)this.Nt(960|r>>>6),this.Nt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Nt(480|r>>>12),this.Nt(128|63&r>>>6),this.Nt(128|63&r);else{const s=t.codePointAt(0);this.Nt(240|s>>>18),this.Nt(128|63&s>>>12),this.Nt(128|63&s>>>6),this.Nt(128|63&s)}}this.Bt()}$t(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.kt(r);else if(r<2048)this.kt(960|r>>>6),this.kt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.kt(480|r>>>12),this.kt(128|63&r>>>6),this.kt(128|63&r);else{const s=t.codePointAt(0);this.kt(240|s>>>18),this.kt(128|63&s>>>12),this.kt(128|63&s>>>6),this.kt(128|63&s)}}this.qt()}Ut(e){const t=this.Kt(e),r=vf(t);this.Wt(1+r),this.buffer[this.position++]=255&r;for(let s=t.length-r;s<t.length;++s)this.buffer[this.position++]=255&t[s]}Gt(e){const t=this.Kt(e),r=vf(t);this.Wt(1+r),this.buffer[this.position++]=~(255&r);for(let s=t.length-r;s<t.length;++s)this.buffer[this.position++]=~(255&t[s])}zt(){this.jt(Cr),this.jt(255)}Ht(){this.Jt(Cr),this.Jt(255)}reset(){this.position=0}seed(e){this.Wt(e.length),this.buffer.set(e,this.position),this.position+=e.length}Yt(){return this.buffer.slice(0,this.position)}Kt(e){const t=function(i){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,i,!1),new Uint8Array(o.buffer)}(e),r=!!(128&t[0]);t[0]^=r?255:128;for(let s=1;s<t.length;++s)t[s]^=r?255:0;return t}Nt(e){const t=255&e;t===0?(this.jt(0),this.jt(255)):t===Cr?(this.jt(Cr),this.jt(0)):this.jt(t)}kt(e){const t=255&e;t===0?(this.Jt(0),this.Jt(255)):t===Cr?(this.Jt(Cr),this.Jt(0)):this.Jt(e)}Bt(){this.jt(0),this.jt(1)}qt(){this.Jt(0),this.Jt(1)}jt(e){this.Wt(1),this.buffer[this.position++]=e}Jt(e){this.Wt(1),this.buffer[this.position++]=~e}Wt(e){const t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);const s=new Uint8Array(r);s.set(this.buffer),this.buffer=s}}class OT{constructor(e){this.Zt=e}bt(e){this.Zt.Ot(e)}yt(e){this.Zt.Qt(e)}gt(e){this.Zt.Ut(e)}Vt(){this.Zt.zt()}}class LT{constructor(e){this.Zt=e}bt(e){this.Zt.Lt(e)}yt(e){this.Zt.$t(e)}gt(e){this.Zt.Gt(e)}Vt(){this.Zt.Ht()}}class Bs{constructor(){this.Zt=new VT,this.Xt=new OT(this.Zt),this.en=new LT(this.Zt)}seed(e){this.Zt.seed(e)}tn(e){return e===0?this.Xt:this.en}Yt(){return this.Zt.Yt()}reset(){this.Zt.reset()}}/**
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
 */class Wn{constructor(e,t,r,s){this.indexId=e,this.documentKey=t,this.arrayValue=r,this.directionalValue=s}nn(){const e=this.directionalValue.length,t=e===0||this.directionalValue[e-1]===255?e+1:e,r=new Uint8Array(t);return r.set(this.directionalValue,0),t!==e?r.set([0],this.directionalValue.length):++r[r.length-1],new Wn(this.indexId,this.documentKey,this.arrayValue,r)}}function tn(n,e){let t=n.indexId-e.indexId;return t!==0?t:(t=bf(n.arrayValue,e.arrayValue),t!==0?t:(t=bf(n.directionalValue,e.directionalValue),t!==0?t:K.comparator(n.documentKey,e.documentKey)))}function bf(n,e){for(let t=0;t<n.length&&t<e.length;++t){const r=n[t]-e[t];if(r!==0)return r}return n.length-e.length}/**
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
 */class If{constructor(e){this.rn=new ye((t,r)=>Te.comparator(t.field,r.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.sn=e.orderBy,this._n=[];for(const t of e.filters){const r=t;r.isInequality()?this.rn=this.rn.add(r):this._n.push(r)}}get an(){return this.rn.size>1}un(e){if(Y(e.collectionGroup===this.collectionId),this.an)return!1;const t=il(e);if(t!==void 0&&!this.cn(t))return!1;const r=qn(e);let s=new Set,i=0,o=0;for(;i<r.length&&this.cn(r[i]);++i)s=s.add(r[i].fieldPath.canonicalString());if(i===r.length)return!0;if(this.rn.size>0){const c=this.rn.getIterator().getNext();if(!s.has(c.field.canonicalString())){const l=r[i];if(!this.ln(c,l)||!this.hn(this.sn[o++],l))return!1}++i}for(;i<r.length;++i){const c=r[i];if(o>=this.sn.length||!this.hn(this.sn[o++],c))return!1}return!0}Pn(){if(this.an)return null;let e=new ye(Te.comparator);const t=[];for(const r of this._n)if(!r.field.isKeyField())if(r.op==="array-contains"||r.op==="array-contains-any")t.push(new No(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),t.push(new No(r.field,0))}for(const r of this.sn)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),t.push(new No(r.field,r.dir==="asc"?0:1)));return new Zo(Zo.UNKNOWN_ID,this.collectionId,t,mi.empty())}cn(e){for(const t of this._n)if(this.ln(t,e))return!0;return!1}ln(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const r=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===r}hn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
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
 */function Fg(n){var e,t;if(Y(n instanceof le||n instanceof _e),n instanceof le){if(n instanceof ig){const s=((t=(e=n.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map(i=>le.create(n.field,"==",i)))||[];return _e.create(s,"or")}return n}const r=n.filters.map(s=>Fg(s));return _e.create(r,n.op)}function MT(n){if(n.getFilters().length===0)return[];const e=wl(Fg(n));return Y(Ug(e)),bl(e)||Il(e)?[e]:e.getFilters()}function bl(n){return n instanceof le}function Il(n){return n instanceof _e&&su(n)}function Ug(n){return bl(n)||Il(n)||function(t){if(t instanceof _e&&hl(t)){for(const r of t.getFilters())if(!bl(r)&&!Il(r))return!1;return!0}return!1}(n)}function wl(n){if(Y(n instanceof le||n instanceof _e),n instanceof le)return n;if(n.filters.length===1)return wl(n.filters[0]);const e=n.filters.map(r=>wl(r));let t=_e.create(e,n.op);return t=ha(t),Ug(t)?t:(Y(t instanceof _e),Y(ns(t)),Y(t.filters.length>1),t.filters.reduce((r,s)=>fu(r,s)))}function fu(n,e){let t;return Y(n instanceof le||n instanceof _e),Y(e instanceof le||e instanceof _e),t=n instanceof le?e instanceof le?function(s,i){return _e.create([s,i],"and")}(n,e):wf(n,e):e instanceof le?wf(e,n):function(s,i){if(Y(s.filters.length>0&&i.filters.length>0),ns(s)&&ns(i))return ng(s,i.getFilters());const o=hl(s)?s:i,c=hl(s)?i:s,l=o.filters.map(h=>fu(h,c));return _e.create(l,"or")}(n,e),ha(t)}function wf(n,e){if(ns(e))return ng(e,n.getFilters());{const t=e.filters.map(r=>fu(n,r));return _e.create(t,"or")}}function ha(n){if(Y(n instanceof le||n instanceof _e),n instanceof le)return n;const e=n.getFilters();if(e.length===1)return ha(e[0]);if(eg(n))return n;const t=e.map(s=>ha(s)),r=[];return t.forEach(s=>{s instanceof le?r.push(s):s instanceof _e&&(s.op===n.op?r.push(...s.filters):r.push(s))}),r.length===1?r[0]:_e.create(r,n.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FT{constructor(){this.Tn=new pu}addToCollectionParentIndex(e,t){return this.Tn.add(t),D.resolve()}getCollectionParents(e,t){return D.resolve(this.Tn.getEntries(t))}addFieldIndex(e,t){return D.resolve()}deleteFieldIndex(e,t){return D.resolve()}deleteAllFieldIndexes(e){return D.resolve()}createTargetIndexes(e,t){return D.resolve()}getDocumentsMatchingTarget(e,t){return D.resolve(null)}getIndexType(e,t){return D.resolve(0)}getFieldIndexes(e,t){return D.resolve([])}getNextCollectionGroupToUpdate(e){return D.resolve(null)}getMinOffset(e,t){return D.resolve(lt.min())}getMinOffsetFromCollectionGroup(e,t){return D.resolve(lt.min())}updateCollectionGroup(e,t,r){return D.resolve()}updateIndexEntries(e,t){return D.resolve()}}class pu{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new ye(me.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new ye(me.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ef="IndexedDbIndexManager",mo=new Uint8Array(0);class UT{constructor(e,t){this.databaseId=t,this.In=new pu,this.En=new Wt(r=>ar(r),(r,s)=>Li(r,s)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.In.has(t)){const r=t.lastSegment(),s=t.popLast();e.addOnCommittedListener(()=>{this.In.add(t)});const i={collectionId:r,parent:He(s)};return Tf(e).put(i)}return D.resolve()}getCollectionParents(e,t){const r=[],s=IDBKeyRange.bound([t,""],[Pm(t),""],!1,!0);return Tf(e).G(s).next(i=>{for(const o of i){if(o.collectionId!==t)break;r.push(At(o.parent))}return r})}addFieldIndex(e,t){const r=$s(e),s=function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map(l=>[l.fieldPath.canonicalString(),l.kind])}}(t);delete s.indexId;const i=r.add(s);if(t.indexState){const o=kr(e);return i.next(c=>{o.put(gf(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return i.next()}deleteFieldIndex(e,t){const r=$s(e),s=kr(e),i=Pr(e);return r.delete(t.indexId).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=$s(e),r=Pr(e),s=kr(e);return t.J().next(()=>r.J()).next(()=>s.J())}createTargetIndexes(e,t){return D.forEach(this.dn(t),r=>this.getIndexType(e,r).next(s=>{if(s===0||s===1){const i=new If(r).Pn();if(i!=null)return this.addFieldIndex(e,i)}}))}getDocumentsMatchingTarget(e,t){const r=Pr(e);let s=!0;const i=new Map;return D.forEach(this.dn(t),o=>this.An(e,o).next(c=>{s&&(s=!!c),i.set(o,c)})).next(()=>{if(s){let o=oe();const c=[];return D.forEach(i,(l,h)=>{B(Ef,`Using index ${function(k){return`id=${k.indexId}|cg=${k.collectionGroup}|f=${k.fields.map(U=>`${U.fieldPath}:${U.kind}`).join(",")}`}(l)} to execute ${ar(t)}`);const p=function(k,U){const x=il(U);if(x===void 0)return null;for(const M of aa(k,x.fieldPath))switch(M.op){case"array-contains-any":return M.value.arrayValue.values||[];case"array-contains":return[M.value]}return null}(h,l),m=function(k,U){const x=new Map;for(const M of qn(U))for(const E of aa(k,M.fieldPath))switch(E.op){case"==":case"in":x.set(M.fieldPath.canonicalString(),E.value);break;case"not-in":case"!=":return x.set(M.fieldPath.canonicalString(),E.value),Array.from(x.values())}return null}(h,l),b=function(k,U){const x=[];let M=!0;for(const E of qn(U)){const w=E.kind===0?tf(k,E.fieldPath,k.startAt):nf(k,E.fieldPath,k.startAt);x.push(w.value),M&&(M=w.inclusive)}return new wn(x,M)}(h,l),A=function(k,U){const x=[];let M=!0;for(const E of qn(U)){const w=E.kind===0?nf(k,E.fieldPath,k.endAt):tf(k,E.fieldPath,k.endAt);x.push(w.value),M&&(M=w.inclusive)}return new wn(x,M)}(h,l),P=this.Rn(l,h,b),R=this.Rn(l,h,A),S=this.Vn(l,h,m),V=this.mn(l.indexId,p,P,b.inclusive,R,A.inclusive,S);return D.forEach(V,C=>r.H(C,t.limit).next(k=>{k.forEach(U=>{const x=K.fromSegments(U.documentKey);o.has(x)||(o=o.add(x),c.push(x))})}))}).next(()=>c)}return D.resolve(null)})}dn(e){let t=this.En.get(e);return t||(e.filters.length===0?t=[e]:t=MT(_e.create(e.filters,"and")).map(r=>pl(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt)),this.En.set(e,t),t)}mn(e,t,r,s,i,o,c){const l=(t!=null?t.length:1)*Math.max(r.length,i.length),h=l/(t!=null?t.length:1),p=[];for(let m=0;m<l;++m){const b=t?this.fn(t[m/h]):mo,A=this.gn(e,b,r[m%h],s),P=this.pn(e,b,i[m%h],o),R=c.map(S=>this.gn(e,b,S,!0));p.push(...this.createRange(A,P,R))}return p}gn(e,t,r,s){const i=new Wn(e,K.empty(),t,r);return s?i:i.nn()}pn(e,t,r,s){const i=new Wn(e,K.empty(),t,r);return s?i.nn():i}An(e,t){const r=new If(t),s=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,s).next(i=>{let o=null;for(const c of i)r.un(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o})}getIndexType(e,t){let r=2;const s=this.dn(t);return D.forEach(s,i=>this.An(e,i).next(o=>{o?r!==0&&o.fields.length<function(l){let h=new ye(Te.comparator),p=!1;for(const m of l.filters)for(const b of m.getFlattenedFilters())b.field.isKeyField()||(b.op==="array-contains"||b.op==="array-contains-any"?p=!0:h=h.add(b.field));for(const m of l.orderBy)m.field.isKeyField()||(h=h.add(m.field));return h.size+(p?1:0)}(i)&&(r=1):r=0})).next(()=>function(o){return o.limit!==null}(t)&&s.length>1&&r===2?1:r)}yn(e,t){const r=new Bs;for(const s of qn(e)){const i=t.data.field(s.fieldPath);if(i==null)return null;const o=r.tn(s.kind);Kn.xt.At(i,o)}return r.Yt()}fn(e){const t=new Bs;return Kn.xt.At(e,t.tn(0)),t.Yt()}wn(e,t){const r=new Bs;return Kn.xt.At(or(this.databaseId,t),r.tn(function(i){const o=qn(i);return o.length===0?0:o[o.length-1].kind}(e))),r.Yt()}Vn(e,t,r){if(r===null)return[];let s=[];s.push(new Bs);let i=0;for(const o of qn(e)){const c=r[i++];for(const l of s)if(this.Sn(t,o.fieldPath)&&wi(c))s=this.bn(s,o,c);else{const h=l.tn(o.kind);Kn.xt.At(c,h)}}return this.Dn(s)}Rn(e,t,r){return this.Vn(e,t,r.position)}Dn(e){const t=[];for(let r=0;r<e.length;++r)t[r]=e[r].Yt();return t}bn(e,t,r){const s=[...e],i=[];for(const o of r.arrayValue.values||[])for(const c of s){const l=new Bs;l.seed(c.Yt()),Kn.xt.At(o,l.tn(t.kind)),i.push(l)}return i}Sn(e,t){return!!e.filters.find(r=>r instanceof le&&r.field.isEqual(t)&&(r.op==="in"||r.op==="not-in"))}getFieldIndexes(e,t){const r=$s(e),s=kr(e);return(t?r.G(al,IDBKeyRange.bound(t,t)):r.G()).next(i=>{const o=[];return D.forEach(i,c=>s.get([c.indexId,this.uid]).next(l=>{o.push(function(p,m){const b=m?new mi(m.sequenceNumber,new lt(lr(m.readTime),new K(At(m.documentKey)),m.largestBatchId)):mi.empty(),A=p.fields.map(([P,R])=>new No(Te.fromServerFormat(P),R));return new Zo(p.indexId,p.collectionGroup,A,b)}(c,l))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((r,s)=>{const i=r.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:te(r.collectionGroup,s.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,r){const s=$s(e),i=kr(e);return this.vn(e).next(o=>s.G(al,IDBKeyRange.bound(t,t)).next(c=>D.forEach(c,l=>i.put(gf(l.indexId,this.uid,o,r)))))}updateIndexEntries(e,t){const r=new Map;return D.forEach(t,(s,i)=>{const o=r.get(s.collectionGroup);return(o?D.resolve(o):this.getFieldIndexes(e,s.collectionGroup)).next(c=>(r.set(s.collectionGroup,c),D.forEach(c,l=>this.Cn(e,s,l).next(h=>{const p=this.Fn(i,l);return h.isEqual(p)?D.resolve():this.Mn(e,i,l,h,p)}))))})}xn(e,t,r,s){return Pr(e).put({indexId:s.indexId,uid:this.uid,arrayValue:s.arrayValue,directionalValue:s.directionalValue,orderedDocumentKey:this.wn(r,t.key),documentKey:t.key.path.toArray()})}On(e,t,r,s){return Pr(e).delete([s.indexId,this.uid,s.arrayValue,s.directionalValue,this.wn(r,t.key),t.key.path.toArray()])}Cn(e,t,r){const s=Pr(e);let i=new ye(tn);return s.Z({index:Fm,range:IDBKeyRange.only([r.indexId,this.uid,this.wn(r,t)])},(o,c)=>{i=i.add(new Wn(r.indexId,t,c.arrayValue,c.directionalValue))}).next(()=>i)}Fn(e,t){let r=new ye(tn);const s=this.yn(t,e);if(s==null)return r;const i=il(t);if(i!=null){const o=e.data.field(i.fieldPath);if(wi(o))for(const c of o.arrayValue.values||[])r=r.add(new Wn(t.indexId,e.key,this.fn(c),s))}else r=r.add(new Wn(t.indexId,e.key,mo,s));return r}Mn(e,t,r,s,i){B(Ef,"Updating index entries for document '%s'",t.key);const o=[];return function(l,h,p,m,b){const A=l.getIterator(),P=h.getIterator();let R=Rr(A),S=Rr(P);for(;R||S;){let V=!1,C=!1;if(R&&S){const k=p(R,S);k<0?C=!0:k>0&&(V=!0)}else R!=null?C=!0:V=!0;V?(m(S),S=Rr(P)):C?(b(R),R=Rr(A)):(R=Rr(A),S=Rr(P))}}(s,i,tn,c=>{o.push(this.xn(e,t,r,c))},c=>{o.push(this.On(e,t,r,c))}),D.waitFor(o)}vn(e){let t=1;return kr(e).Z({index:Mm,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(r,s,i)=>{i.done(),t=s.sequenceNumber+1}).next(()=>t)}createRange(e,t,r){r=r.sort((o,c)=>tn(o,c)).filter((o,c,l)=>!c||tn(o,l[c-1])!==0);const s=[];s.push(e);for(const o of r){const c=tn(o,e),l=tn(o,t);if(c===0)s[0]=e.nn();else if(c>0&&l<0)s.push(o),s.push(o.nn());else if(l>0)break}s.push(t);const i=[];for(let o=0;o<s.length;o+=2){if(this.Nn(s[o],s[o+1]))return[];const c=[s[o].indexId,this.uid,s[o].arrayValue,s[o].directionalValue,mo,[]],l=[s[o+1].indexId,this.uid,s[o+1].arrayValue,s[o+1].directionalValue,mo,[]];i.push(IDBKeyRange.bound(c,l))}return i}Nn(e,t){return tn(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(Af)}getMinOffset(e,t){return D.mapArray(this.dn(t),r=>this.An(e,r).next(s=>s||Q())).next(Af)}}function Tf(n){return Le(n,vi)}function Pr(n){return Le(n,sa)}function $s(n){return Le(n,Zl)}function kr(n){return Le(n,ra)}function Af(n){Y(n.length!==0);let e=n[0].indexState.offset,t=e.largestBatchId;for(let r=1;r<n.length;r++){const s=n[r].indexState.offset;Yl(s,e)<0&&(e=s),t<s.largestBatchId&&(t=s.largestBatchId)}return new lt(e.readTime,e.documentKey,t)}/**
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
 */const Sf={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Bg=41943040;class ze{static withCacheSize(e){return new ze(e,ze.DEFAULT_COLLECTION_PERCENTILE,ze.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $g(n,e,t){const r=n.store(yt),s=n.store(Yr),i=[],o=IDBKeyRange.only(t.batchId);let c=0;const l=r.Z({range:o},(p,m,b)=>(c++,b.delete()));i.push(l.next(()=>{Y(c===1)}));const h=[];for(const p of t.mutations){const m=Vm(e,p.key.path,t.batchId);i.push(s.delete(m)),h.push(p.key)}return D.waitFor(i).next(()=>h)}function fa(n){if(!n)return 0;let e;if(n.document)e=n.document;else if(n.unknownDocument)e=n.unknownDocument;else{if(!n.noDocument)throw Q();e=n.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ze.DEFAULT_COLLECTION_PERCENTILE=10,ze.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ze.DEFAULT=new ze(Bg,ze.DEFAULT_COLLECTION_PERCENTILE,ze.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ze.DISABLED=new ze(-1,0,0);class Wa{constructor(e,t,r,s){this.userId=e,this.serializer=t,this.indexManager=r,this.referenceDelegate=s,this.Bn={}}static It(e,t,r,s){Y(e.uid!=="");const i=e.isAuthenticated()?e.uid:"";return new Wa(i,t,r,s)}checkEmpty(e){let t=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return nn(e).Z({index:Qn,range:r},(s,i,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,r,s){const i=Lr(e),o=nn(e);return o.add({}).next(c=>{Y(typeof c=="number");const l=new cu(c,t,r,s),h=function(A,P,R){const S=R.baseMutations.map(C=>ua(A.Tt,C)),V=R.mutations.map(C=>ua(A.Tt,C));return{userId:P,batchId:R.batchId,localWriteTimeMs:R.localWriteTime.toMillis(),baseMutations:S,mutations:V}}(this.serializer,this.userId,l),p=[];let m=new ye((b,A)=>te(b.canonicalString(),A.canonicalString()));for(const b of s){const A=Vm(this.userId,b.key.path,c);m=m.add(b.key.path.popLast()),p.push(o.put(h)),p.push(i.put(A,gE))}return m.forEach(b=>{p.push(this.indexManager.addToCollectionParentIndex(e,b))}),e.addOnCommittedListener(()=>{this.Bn[c]=l.keys()}),D.waitFor(p).next(()=>l)})}lookupMutationBatch(e,t){return nn(e).get(t).next(r=>r?(Y(r.userId===this.userId),Hn(this.serializer,r)):null)}Ln(e,t){return this.Bn[t]?D.resolve(this.Bn[t]):this.lookupMutationBatch(e,t).next(r=>{if(r){const s=r.keys();return this.Bn[t]=s,s}return null})}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=IDBKeyRange.lowerBound([this.userId,r]);let i=null;return nn(e).Z({index:Qn,range:s},(o,c,l)=>{c.userId===this.userId&&(Y(c.batchId>=r),i=Hn(this.serializer,c)),l.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=Zn;return nn(e).Z({index:Qn,range:t,reverse:!0},(s,i,o)=>{r=i.batchId,o.done()}).next(()=>r)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,Zn],[this.userId,Number.POSITIVE_INFINITY]);return nn(e).G(Qn,t).next(r=>r.map(s=>Hn(this.serializer,s)))}getAllMutationBatchesAffectingDocumentKey(e,t){const r=Vo(this.userId,t.path),s=IDBKeyRange.lowerBound(r),i=[];return Lr(e).Z({range:s},(o,c,l)=>{const[h,p,m]=o,b=At(p);if(h===this.userId&&t.path.isEqual(b))return nn(e).get(m).next(A=>{if(!A)throw Q();Y(A.userId===this.userId),i.push(Hn(this.serializer,A))});l.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ye(te);const s=[];return t.forEach(i=>{const o=Vo(this.userId,i.path),c=IDBKeyRange.lowerBound(o),l=Lr(e).Z({range:c},(h,p,m)=>{const[b,A,P]=h,R=At(A);b===this.userId&&i.path.isEqual(R)?r=r.add(P):m.done()});s.push(l)}),D.waitFor(s).next(()=>this.kn(e,r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1,i=Vo(this.userId,r),o=IDBKeyRange.lowerBound(i);let c=new ye(te);return Lr(e).Z({range:o},(l,h,p)=>{const[m,b,A]=l,P=At(b);m===this.userId&&r.isPrefixOf(P)?P.length===s&&(c=c.add(A)):p.done()}).next(()=>this.kn(e,c))}kn(e,t){const r=[],s=[];return t.forEach(i=>{s.push(nn(e).get(i).next(o=>{if(o===null)throw Q();Y(o.userId===this.userId),r.push(Hn(this.serializer,o))}))}),D.waitFor(s).next(()=>r)}removeMutationBatch(e,t){return $g(e.ue,this.userId,t).next(r=>(e.addOnCommittedListener(()=>{this.qn(t.batchId)}),D.forEach(r,s=>this.referenceDelegate.markPotentiallyOrphaned(e,s))))}qn(e){delete this.Bn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return D.resolve();const r=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),s=[];return Lr(e).Z({range:r},(i,o,c)=>{if(i[0]===this.userId){const l=At(i[1]);s.push(l)}else c.done()}).next(()=>{Y(s.length===0)})})}containsKey(e,t){return qg(e,this.userId,t)}Qn(e){return jg(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:Zn,lastStreamToken:""})}}function qg(n,e,t){const r=Vo(e,t.path),s=r[1],i=IDBKeyRange.lowerBound(r);let o=!1;return Lr(n).Z({range:i,Y:!0},(c,l,h)=>{const[p,m,b]=c;p===e&&m===s&&(o=!0),h.done()}).next(()=>o)}function nn(n){return Le(n,yt)}function Lr(n){return Le(n,Yr)}function jg(n){return Le(n,_i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class BT{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.Wn(e).next(t=>{const r=new ur(t.highestTargetId);return t.highestTargetId=r.next(),this.Gn(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.Wn(e).next(t=>J.fromTimestamp(new Ae(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.Wn(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,r){return this.Wn(e).next(s=>(s.highestListenSequenceNumber=t,r&&(s.lastRemoteSnapshotVersion=r.toTimestamp()),t>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=t),this.Gn(e,s)))}addTargetData(e,t){return this.zn(e,t).next(()=>this.Wn(e).next(r=>(r.targetCount+=1,this.jn(t,r),this.Gn(e,r))))}updateTargetData(e,t){return this.zn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>xr(e).delete(t.targetId)).next(()=>this.Wn(e)).next(r=>(Y(r.targetCount>0),r.targetCount-=1,this.Gn(e,r)))}removeTargets(e,t,r){let s=0;const i=[];return xr(e).Z((o,c)=>{const l=Ys(c);l.sequenceNumber<=t&&r.get(l.targetId)===null&&(s++,i.push(this.removeTargetData(e,l)))}).next(()=>D.waitFor(i)).next(()=>s)}forEachTarget(e,t){return xr(e).Z((r,s)=>{const i=Ys(s);t(i)})}Wn(e){return Rf(e).get(na).next(t=>(Y(t!==null),t))}Gn(e,t){return Rf(e).put(na,t)}zn(e,t){return xr(e).put(Lg(this.serializer,t))}jn(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.Wn(e).next(t=>t.targetCount)}getTargetData(e,t){const r=ar(t),s=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let i=null;return xr(e).Z({range:s,index:Lm},(o,c,l)=>{const h=Ys(c);Li(t,h.target)&&(i=h,l.done())}).next(()=>i)}addMatchingKeys(e,t,r){const s=[],i=dn(e);return t.forEach(o=>{const c=He(o.path);s.push(i.put({targetId:r,path:c})),s.push(this.referenceDelegate.addReference(e,r,o))}),D.waitFor(s)}removeMatchingKeys(e,t,r){const s=dn(e);return D.forEach(t,i=>{const o=He(i.path);return D.waitFor([s.delete([r,o]),this.referenceDelegate.removeReference(e,r,i)])})}removeMatchingKeysForTargetId(e,t){const r=dn(e),s=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(s)}getMatchingKeysForTargetId(e,t){const r=IDBKeyRange.bound([t],[t+1],!1,!0),s=dn(e);let i=oe();return s.Z({range:r,Y:!0},(o,c,l)=>{const h=At(o[1]),p=new K(h);i=i.add(p)}).next(()=>i)}containsKey(e,t){const r=He(t.path),s=IDBKeyRange.bound([r],[Pm(r)],!1,!0);let i=0;return dn(e).Z({index:Xl,Y:!0,range:s},([o,c],l,h)=>{o!==0&&(i++,h.done())}).next(()=>i>0)}lt(e,t){return xr(e).get(t).next(r=>r?Ys(r):null)}}function xr(n){return Le(n,Jr)}function Rf(n){return Le(n,er)}function dn(n){return Le(n,Xr)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cf="LruGarbageCollector",zg=1048576;function Pf([n,e],[t,r]){const s=te(n,t);return s===0?te(e,r):s}class $T{constructor(e){this.Hn=e,this.buffer=new ye(Pf),this.Jn=0}Yn(){return++this.Jn}Zn(e){const t=[e,this.Yn()];if(this.buffer.size<this.Hn)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Pf(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Gg{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Xn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.er(6e4)}stop(){this.Xn&&(this.Xn.cancel(),this.Xn=null)}get started(){return this.Xn!==null}er(e){B(Cf,`Garbage collection scheduled in ${e}ms`),this.Xn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Xn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Cn(t)?B(Cf,"Ignoring IndexedDB error during garbage collection: ",t):await mr(t)}await this.er(3e5)})}}class qT{constructor(e,t){this.tr=e,this.params=t}calculateTargetCount(e,t){return this.tr.nr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return D.resolve(ht.ae);const r=new $T(t);return this.tr.forEachTarget(e,s=>r.Zn(s.sequenceNumber)).next(()=>this.tr.rr(e,s=>r.Zn(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.tr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.tr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(B("LruGarbageCollector","Garbage collection skipped; disabled"),D.resolve(Sf)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(B("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Sf):this.ir(e,t))}getCacheSize(e){return this.tr.getCacheSize(e)}ir(e,t){let r,s,i,o,c,l,h;const p=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(m=>(m>this.params.maximumSequenceNumbersToCollect?(B("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),s=this.params.maximumSequenceNumbersToCollect):s=m,o=Date.now(),this.nthSequenceNumber(e,s))).next(m=>(r=m,c=Date.now(),this.removeTargets(e,r,t))).next(m=>(i=m,l=Date.now(),this.removeOrphanedDocuments(e,r))).next(m=>(h=Date.now(),Dr()<=ce.DEBUG&&B("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-p}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(l-c)+`ms
	Removed ${m} documents in `+(h-l)+`ms
Total Duration: ${h-p}ms`),D.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:m})))}}function Hg(n,e){return new qT(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jT{constructor(e,t){this.db=e,this.garbageCollector=Hg(this,t)}nr(e){const t=this.sr(e);return this.db.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}sr(e){let t=0;return this.rr(e,r=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}rr(e,t){return this._r(e,(r,s)=>t(s))}addReference(e,t,r){return go(e,r)}removeReference(e,t,r){return go(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return go(e,t)}ar(e,t){return function(s,i){let o=!1;return jg(s).X(c=>qg(s,c,i).next(l=>(l&&(o=!0),D.resolve(!l)))).next(()=>o)}(e,t)}removeOrphanedDocuments(e,t){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this._r(e,(o,c)=>{if(c<=t){const l=this.ar(e,o).next(h=>{if(!h)return i++,r.getEntry(e,o).next(()=>(r.removeEntry(o,J.min()),dn(e).delete(function(m){return[0,He(m.path)]}(o))))});s.push(l)}}).next(()=>D.waitFor(s)).next(()=>r.apply(e)).next(()=>i)}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return go(e,t)}_r(e,t){const r=dn(e);let s,i=ht.ae;return r.Z({index:Xl},([o,c],{path:l,sequenceNumber:h})=>{o===0?(i!==ht.ae&&t(new K(At(s)),i),i=h,s=l):i=ht.ae}).next(()=>{i!==ht.ae&&t(new K(At(s)),i)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function go(n,e){return dn(n).put(function(r,s){return{targetId:0,path:He(r.path),sequenceNumber:s}}(e,n.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kg{constructor(){this.changes=new Wt(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ce.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?D.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zT{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return Fn(e).put(r)}removeEntry(e,t,r){return Fn(e).delete(function(i,o){const c=i.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],da(o),c[c.length-1]]}(t,r))}updateMetadata(e,t){return this.getMetadata(e).next(r=>(r.byteSize+=t,this.ur(e,r)))}getEntry(e,t){let r=Ce.newInvalidDocument(t);return Fn(e).Z({index:Oo,range:IDBKeyRange.only(qs(t))},(s,i)=>{r=this.cr(t,i)}).next(()=>r)}lr(e,t){let r={size:0,document:Ce.newInvalidDocument(t)};return Fn(e).Z({index:Oo,range:IDBKeyRange.only(qs(t))},(s,i)=>{r={document:this.cr(t,i),size:fa(i)}}).next(()=>r)}getEntries(e,t){let r=ct();return this.hr(e,t,(s,i)=>{const o=this.cr(s,i);r=r.insert(s,o)}).next(()=>r)}Pr(e,t){let r=ct(),s=new Ee(K.comparator);return this.hr(e,t,(i,o)=>{const c=this.cr(i,o);r=r.insert(i,c),s=s.insert(i,fa(o))}).next(()=>({documents:r,Tr:s}))}hr(e,t,r){if(t.isEmpty())return D.resolve();let s=new ye(Df);t.forEach(l=>s=s.add(l));const i=IDBKeyRange.bound(qs(s.first()),qs(s.last())),o=s.getIterator();let c=o.getNext();return Fn(e).Z({index:Oo,range:i},(l,h,p)=>{const m=K.fromSegments([...h.prefixPath,h.collectionGroup,h.documentId]);for(;c&&Df(c,m)<0;)r(c,null),c=o.getNext();c&&c.isEqual(m)&&(r(c,h),c=o.hasNext()?o.getNext():null),c?p.W(qs(c)):p.done()}).next(()=>{for(;c;)r(c,null),c=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,r,s,i){const o=t.path,c=[o.popLast().toArray(),o.lastSegment(),da(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],l=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Fn(e).G(IDBKeyRange.bound(c,l,!0)).next(h=>{i?.incrementDocumentReadCount(h.length);let p=ct();for(const m of h){const b=this.cr(K.fromSegments(m.prefixPath.concat(m.collectionGroup,m.documentId)),m);b.isFoundDocument()&&(Fi(t,b)||s.has(b.key))&&(p=p.insert(b.key,b))}return p})}getAllFromCollectionGroup(e,t,r,s){let i=ct();const o=xf(t,r),c=xf(t,lt.max());return Fn(e).Z({index:Om,range:IDBKeyRange.bound(o,c,!0)},(l,h,p)=>{const m=this.cr(K.fromSegments(h.prefixPath.concat(h.collectionGroup,h.documentId)),h);i=i.insert(m.key,m),i.size===s&&p.done()}).next(()=>i)}newChangeBuffer(e){return new GT(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return kf(e).get(ol).next(t=>(Y(!!t),t))}ur(e,t){return kf(e).put(ol,t)}cr(e,t){if(t){const r=kT(this.serializer,t);if(!(r.isNoDocument()&&r.version.isEqual(J.min())))return r}return Ce.newInvalidDocument(e)}}function Wg(n){return new zT(n)}class GT extends Kg{constructor(e,t){super(),this.Ir=e,this.trackRemovals=t,this.Er=new Wt(r=>r.toString(),(r,s)=>r.isEqual(s))}applyChanges(e){const t=[];let r=0,s=new ye((i,o)=>te(i.canonicalString(),o.canonicalString()));return this.changes.forEach((i,o)=>{const c=this.Er.get(i);if(t.push(this.Ir.removeEntry(e,i,c.readTime)),o.isValidDocument()){const l=pf(this.Ir.serializer,o);s=s.add(i.path.popLast());const h=fa(l);r+=h-c.size,t.push(this.Ir.addEntry(e,i,l))}else if(r-=c.size,this.trackRemovals){const l=pf(this.Ir.serializer,o.convertToNoDocument(J.min()));t.push(this.Ir.addEntry(e,i,l))}}),s.forEach(i=>{t.push(this.Ir.indexManager.addToCollectionParentIndex(e,i))}),t.push(this.Ir.updateMetadata(e,r)),D.waitFor(t)}getFromCache(e,t){return this.Ir.lr(e,t).next(r=>(this.Er.set(t,{size:r.size,readTime:r.document.readTime}),r.document))}getAllFromCache(e,t){return this.Ir.Pr(e,t).next(({documents:r,Tr:s})=>(s.forEach((i,o)=>{this.Er.set(i,{size:o,readTime:r.get(i).readTime})}),r))}}function kf(n){return Le(n,yi)}function Fn(n){return Le(n,ta)}function qs(n){const e=n.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function xf(n,e){const t=e.documentKey.path.toArray();return[n,da(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function Df(n,e){const t=n.path.toArray(),r=e.path.toArray();let s=0;for(let i=0;i<t.length-2&&i<r.length-2;++i)if(s=te(t[i],r[i]),s)return s;return s=te(t.length,r.length),s||(s=te(t[t.length-2],r[r.length-2]),s||te(t[t.length-1],r[r.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class HT{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qg{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&si(r.mutation,s,rt.empty(),Ae.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,oe()).next(()=>r))}getLocalViewOfDocuments(e,t,r=oe()){const s=St();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let o=Ws();return i.forEach((c,l)=>{o=o.insert(c,l.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const r=St();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,oe()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,c)=>{t.set(o,c)})})}computeViews(e,t,r,s){let i=ct();const o=ri(),c=function(){return ri()}();return t.forEach((l,h)=>{const p=r.get(h.key);s.has(h.key)&&(p===void 0||p.mutation instanceof Qt)?i=i.insert(h.key,h):p!==void 0?(o.set(h.key,p.mutation.getFieldMask()),si(p.mutation,h,p.mutation.getFieldMask(),Ae.now())):o.set(h.key,rt.empty())}),this.recalculateAndSaveOverlays(e,i).next(l=>(l.forEach((h,p)=>o.set(h,p)),t.forEach((h,p)=>{var m;return c.set(h,new HT(p,(m=o.get(h))!==null&&m!==void 0?m:null))}),c))}recalculateAndSaveOverlays(e,t){const r=ri();let s=new Ee((o,c)=>o-c),i=oe();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const c of o)c.keys().forEach(l=>{const h=t.get(l);if(h===null)return;let p=r.get(l)||rt.empty();p=c.applyToLocalView(h,p),r.set(l,p);const m=(s.get(c.batchId)||oe()).add(l);s=s.insert(c.batchId,m)})}).next(()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),h=l.key,p=l.value,m=ug();p.forEach(b=>{if(!i.has(b)){const A=yg(t.get(b),r.get(b));A!==null&&m.set(b,A),i=i.add(b)}}),o.push(this.documentOverlayCache.saveOverlays(e,h,m))}return D.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return function(o){return K.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):iu(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):D.resolve(St());let c=pi,l=i;return o.next(h=>D.forEach(h,(p,m)=>(c<m.largestBatchId&&(c=m.largestBatchId),i.get(p)?D.resolve():this.remoteDocumentCache.getEntry(e,p).next(b=>{l=l.insert(p,b)}))).next(()=>this.populateOverlays(e,h,i)).next(()=>this.computeViews(e,l,h,oe())).next(p=>({batchId:c,changes:lg(p)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new K(t)).next(r=>{let s=Ws();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let o=Ws();return this.indexManager.getCollectionParents(e,i).next(c=>D.forEach(c,l=>{const h=function(m,b){return new gr(b,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(t,l.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next(p=>{p.forEach((m,b)=>{o=o.insert(m,b)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(o=>{i.forEach((l,h)=>{const p=h.getKey();o.get(p)===null&&(o=o.insert(p,Ce.newInvalidDocument(p)))});let c=Ws();return o.forEach((l,h)=>{const p=i.get(l);p!==void 0&&si(p.mutation,h,rt.empty(),Ae.now()),Fi(t,h)&&(c=c.insert(l,h))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KT{constructor(e){this.serializer=e,this.dr=new Map,this.Ar=new Map}getBundleMetadata(e,t){return D.resolve(this.dr.get(t))}saveBundleMetadata(e,t){return this.dr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:et(s.createTime)}}(t)),D.resolve()}getNamedQuery(e,t){return D.resolve(this.Ar.get(t))}saveNamedQuery(e,t){return this.Ar.set(t.name,function(s){return{name:s.name,query:Mg(s.bundledQuery),readTime:et(s.readTime)}}(t)),D.resolve()}}/**
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
 */class WT{constructor(){this.overlays=new Ee(K.comparator),this.Rr=new Map}getOverlay(e,t){return D.resolve(this.overlays.get(t))}getOverlays(e,t){const r=St();return D.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.Et(e,t,i)}),D.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Rr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Rr.delete(r)),D.resolve()}getOverlaysForCollection(e,t,r){const s=St(),i=t.length+1,o=new K(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const l=c.getNext().value,h=l.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&l.largestBatchId>r&&s.set(l.getKey(),l)}return D.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new Ee((h,p)=>h-p);const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let p=i.get(h.largestBatchId);p===null&&(p=St(),i=i.insert(h.largestBatchId,p)),p.set(h.getKey(),h)}}const c=St(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((h,p)=>c.set(h,p)),!(c.size()>=s)););return D.resolve(c)}Et(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Rr.get(s.largestBatchId).delete(r.key);this.Rr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new uu(t,r));let i=this.Rr.get(t);i===void 0&&(i=oe(),this.Rr.set(t,i)),this.Rr.set(t,i.add(r.key))}}/**
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
 */class QT{constructor(){this.sessionToken=xe.EMPTY_BYTE_STRING}getSessionToken(e){return D.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,D.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mu{constructor(){this.Vr=new ye(Me.mr),this.gr=new ye(Me.pr)}isEmpty(){return this.Vr.isEmpty()}addReference(e,t){const r=new Me(e,t);this.Vr=this.Vr.add(r),this.gr=this.gr.add(r)}yr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.wr(new Me(e,t))}Sr(e,t){e.forEach(r=>this.removeReference(r,t))}br(e){const t=new K(new me([])),r=new Me(t,e),s=new Me(t,e+1),i=[];return this.gr.forEachInRange([r,s],o=>{this.wr(o),i.push(o.key)}),i}Dr(){this.Vr.forEach(e=>this.wr(e))}wr(e){this.Vr=this.Vr.delete(e),this.gr=this.gr.delete(e)}vr(e){const t=new K(new me([])),r=new Me(t,e),s=new Me(t,e+1);let i=oe();return this.gr.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(e){const t=new Me(e,0),r=this.Vr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Me{constructor(e,t){this.key=e,this.Cr=t}static mr(e,t){return K.comparator(e.key,t.key)||te(e.Cr,t.Cr)}static pr(e,t){return te(e.Cr,t.Cr)||K.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YT{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Fr=1,this.Mr=new ye(Me.mr)}checkEmpty(e){return D.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Fr;this.Fr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new cu(i,t,r,s);this.mutationQueue.push(o);for(const c of s)this.Mr=this.Mr.add(new Me(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return D.resolve(o)}lookupMutationBatch(e,t){return D.resolve(this.Or(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Nr(r),i=s<0?0:s;return D.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return D.resolve(this.mutationQueue.length===0?Zn:this.Fr-1)}getAllMutationBatches(e){return D.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Me(t,0),s=new Me(t,Number.POSITIVE_INFINITY),i=[];return this.Mr.forEachInRange([r,s],o=>{const c=this.Or(o.Cr);i.push(c)}),D.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ye(te);return t.forEach(s=>{const i=new Me(s,0),o=new Me(s,Number.POSITIVE_INFINITY);this.Mr.forEachInRange([i,o],c=>{r=r.add(c.Cr)})}),D.resolve(this.Br(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;K.isDocumentKey(i)||(i=i.child(""));const o=new Me(new K(i),0);let c=new ye(te);return this.Mr.forEachWhile(l=>{const h=l.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(c=c.add(l.Cr)),!0)},o),D.resolve(this.Br(c))}Br(e){const t=[];return e.forEach(r=>{const s=this.Or(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){Y(this.Lr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.Mr;return D.forEach(t.mutations,s=>{const i=new Me(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Mr=r})}qn(e){}containsKey(e,t){const r=new Me(t,0),s=this.Mr.firstAfterOrEqual(r);return D.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,D.resolve()}Lr(e,t){return this.Nr(e)}Nr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Or(e){const t=this.Nr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JT{constructor(e){this.kr=e,this.docs=function(){return new Ee(K.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,o=this.kr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return D.resolve(r?r.document.mutableCopy():Ce.newInvalidDocument(t))}getEntries(e,t){let r=ct();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Ce.newInvalidDocument(s))}),D.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=ct();const o=t.path,c=new K(o.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:h,value:{document:p}}=l.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||Yl(km(p),r)<=0||(s.has(p.key)||Fi(t,p))&&(i=i.insert(p.key,p.mutableCopy()))}return D.resolve(i)}getAllFromCollectionGroup(e,t,r,s){Q()}qr(e,t){return D.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new XT(this)}getSize(e){return D.resolve(this.size)}}class XT extends Kg{constructor(e){super(),this.Ir=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.Ir.addEntry(e,s)):this.Ir.removeEntry(r)}),D.waitFor(t)}getFromCache(e,t){return this.Ir.getEntry(e,t)}getAllFromCache(e,t){return this.Ir.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZT{constructor(e){this.persistence=e,this.Qr=new Wt(t=>ar(t),Li),this.lastRemoteSnapshotVersion=J.min(),this.highestTargetId=0,this.$r=0,this.Ur=new mu,this.targetCount=0,this.Kr=ur.Un()}forEachTarget(e,t){return this.Qr.forEach((r,s)=>t(s)),D.resolve()}getLastRemoteSnapshotVersion(e){return D.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return D.resolve(this.$r)}allocateTargetId(e){return this.highestTargetId=this.Kr.next(),D.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.$r&&(this.$r=t),D.resolve()}zn(e){this.Qr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.Kr=new ur(t),this.highestTargetId=t),e.sequenceNumber>this.$r&&(this.$r=e.sequenceNumber)}addTargetData(e,t){return this.zn(t),this.targetCount+=1,D.resolve()}updateTargetData(e,t){return this.zn(t),D.resolve()}removeTargetData(e,t){return this.Qr.delete(t.target),this.Ur.br(t.targetId),this.targetCount-=1,D.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.Qr.forEach((o,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.Qr.delete(o),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)}),D.waitFor(i).next(()=>s)}getTargetCount(e){return D.resolve(this.targetCount)}getTargetData(e,t){const r=this.Qr.get(t)||null;return D.resolve(r)}addMatchingKeys(e,t,r){return this.Ur.yr(t,r),D.resolve()}removeMatchingKeys(e,t,r){this.Ur.Sr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),D.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Ur.br(t),D.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Ur.vr(t);return D.resolve(r)}containsKey(e,t){return D.resolve(this.Ur.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gu{constructor(e,t){this.Wr={},this.overlays={},this.Gr=new ht(0),this.zr=!1,this.zr=!0,this.jr=new QT,this.referenceDelegate=e(this),this.Hr=new ZT(this),this.indexManager=new FT,this.remoteDocumentCache=function(s){return new JT(s)}(r=>this.referenceDelegate.Jr(r)),this.serializer=new Og(t),this.Yr=new KT(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.zr=!1,Promise.resolve()}get started(){return this.zr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new WT,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.Wr[e.toKey()];return r||(r=new YT(t,this.referenceDelegate),this.Wr[e.toKey()]=r),r}getGlobalsCache(){return this.jr}getTargetCache(){return this.Hr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Yr}runTransaction(e,t,r){B("MemoryPersistence","Starting transaction:",e);const s=new eA(this.Gr.next());return this.referenceDelegate.Zr(),r(s).next(i=>this.referenceDelegate.Xr(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}ei(e,t){return D.or(Object.values(this.Wr).map(r=>()=>r.containsKey(e,t)))}}class eA extends Dm{constructor(e){super(),this.currentSequenceNumber=e}}class Qa{constructor(e){this.persistence=e,this.ti=new mu,this.ni=null}static ri(e){return new Qa(e)}get ii(){if(this.ni)return this.ni;throw Q()}addReference(e,t,r){return this.ti.addReference(r,t),this.ii.delete(r.toString()),D.resolve()}removeReference(e,t,r){return this.ti.removeReference(r,t),this.ii.add(r.toString()),D.resolve()}markPotentiallyOrphaned(e,t){return this.ii.add(t.toString()),D.resolve()}removeTarget(e,t){this.ti.br(t.targetId).forEach(s=>this.ii.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.ii.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}Zr(){this.ni=new Set}Xr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return D.forEach(this.ii,r=>{const s=K.fromPath(r);return this.si(e,s).next(i=>{i||t.removeEntry(s,J.min())})}).next(()=>(this.ni=null,t.apply(e)))}updateLimboDocument(e,t){return this.si(e,t).next(r=>{r?this.ii.delete(t.toString()):this.ii.add(t.toString())})}Jr(e){return 0}si(e,t){return D.or([()=>D.resolve(this.ti.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.ei(e,t)])}}class pa{constructor(e,t){this.persistence=e,this.oi=new Wt(r=>He(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=Hg(this,t)}static ri(e,t){return new pa(e,t)}Zr(){}Xr(e){return D.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}nr(e){const t=this.sr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}sr(e){let t=0;return this.rr(e,r=>{t++}).next(()=>t)}rr(e,t){return D.forEach(this.oi,(r,s)=>this.ar(e,r,s).next(i=>i?D.resolve():t(s)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.qr(e,o=>this.ar(e,o,t).next(c=>{c||(r++,i.removeEntry(o,J.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.oi.set(t,e.currentSequenceNumber),D.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.oi.set(r,e.currentSequenceNumber),D.resolve()}removeReference(e,t,r){return this.oi.set(r,e.currentSequenceNumber),D.resolve()}updateLimboDocument(e,t){return this.oi.set(t,e.currentSequenceNumber),D.resolve()}Jr(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Mo(e.data.value)),t}ar(e,t,r){return D.or([()=>this.persistence.ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.oi.get(t);return D.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tA{constructor(e){this.serializer=e}B(e,t,r,s){const i=new Oa("createOrUpgrade",t);r<1&&s>=1&&(function(l){l.createObjectStore(Oi)}(e),function(l){l.createObjectStore(_i,{keyPath:mE}),l.createObjectStore(yt,{keyPath:jh,autoIncrement:!0}).createIndex(Qn,zh,{unique:!0}),l.createObjectStore(Yr)}(e),Nf(e),function(l){l.createObjectStore(jn)}(e));let o=D.resolve();return r<3&&s>=3&&(r!==0&&(function(l){l.deleteObjectStore(Xr),l.deleteObjectStore(Jr),l.deleteObjectStore(er)}(e),Nf(e)),o=o.next(()=>function(l){const h=l.store(er),p={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:J.min().toTimestamp(),targetCount:0};return h.put(na,p)}(i))),r<4&&s>=4&&(r!==0&&(o=o.next(()=>function(l,h){return h.store(yt).G().next(m=>{l.deleteObjectStore(yt),l.createObjectStore(yt,{keyPath:jh,autoIncrement:!0}).createIndex(Qn,zh,{unique:!0});const b=h.store(yt),A=m.map(P=>b.put(P));return D.waitFor(A)})}(e,i))),o=o.next(()=>{(function(l){l.createObjectStore(Zr,{keyPath:TE})})(e)})),r<5&&s>=5&&(o=o.next(()=>this._i(i))),r<6&&s>=6&&(o=o.next(()=>(function(l){l.createObjectStore(yi)}(e),this.ai(i)))),r<7&&s>=7&&(o=o.next(()=>this.ui(i))),r<8&&s>=8&&(o=o.next(()=>this.ci(e,i))),r<9&&s>=9&&(o=o.next(()=>{(function(l){l.objectStoreNames.contains("remoteDocumentChanges")&&l.deleteObjectStore("remoteDocumentChanges")})(e)})),r<10&&s>=10&&(o=o.next(()=>this.li(i))),r<11&&s>=11&&(o=o.next(()=>{(function(l){l.createObjectStore(Ma,{keyPath:AE})})(e),function(l){l.createObjectStore(Fa,{keyPath:SE})}(e)})),r<12&&s>=12&&(o=o.next(()=>{(function(l){const h=l.createObjectStore(Ua,{keyPath:NE});h.createIndex(cl,VE,{unique:!1}),h.createIndex(Um,OE,{unique:!1})})(e)})),r<13&&s>=13&&(o=o.next(()=>function(l){const h=l.createObjectStore(ta,{keyPath:_E});h.createIndex(Oo,yE),h.createIndex(Om,vE)}(e)).next(()=>this.hi(e,i)).next(()=>e.deleteObjectStore(jn))),r<14&&s>=14&&(o=o.next(()=>this.Pi(e,i))),r<15&&s>=15&&(o=o.next(()=>function(l){l.createObjectStore(Zl,{keyPath:RE,autoIncrement:!0}).createIndex(al,CE,{unique:!1}),l.createObjectStore(ra,{keyPath:PE}).createIndex(Mm,kE,{unique:!1}),l.createObjectStore(sa,{keyPath:xE}).createIndex(Fm,DE,{unique:!1})}(e))),r<16&&s>=16&&(o=o.next(()=>{t.objectStore(ra).clear()}).next(()=>{t.objectStore(sa).clear()})),r<17&&s>=17&&(o=o.next(()=>{(function(l){l.createObjectStore(eu,{keyPath:LE})})(e)})),o}ai(e){let t=0;return e.store(jn).Z((r,s)=>{t+=fa(s)}).next(()=>{const r={byteSize:t};return e.store(yi).put(ol,r)})}_i(e){const t=e.store(_i),r=e.store(yt);return t.G().next(s=>D.forEach(s,i=>{const o=IDBKeyRange.bound([i.userId,Zn],[i.userId,i.lastAcknowledgedBatchId]);return r.G(Qn,o).next(c=>D.forEach(c,l=>{Y(l.userId===i.userId);const h=Hn(this.serializer,l);return $g(e,i.userId,h).next(()=>{})}))}))}ui(e){const t=e.store(Xr),r=e.store(jn);return e.store(er).get(na).next(s=>{const i=[];return r.Z((o,c)=>{const l=new me(o),h=function(m){return[0,He(m)]}(l);i.push(t.get(h).next(p=>p?D.resolve():(m=>t.put({targetId:0,path:He(m),sequenceNumber:s.highestListenSequenceNumber}))(l)))}).next(()=>D.waitFor(i))})}ci(e,t){e.createObjectStore(vi,{keyPath:EE});const r=t.store(vi),s=new pu,i=o=>{if(s.add(o)){const c=o.lastSegment(),l=o.popLast();return r.put({collectionId:c,parent:He(l)})}};return t.store(jn).Z({Y:!0},(o,c)=>{const l=new me(o);return i(l.popLast())}).next(()=>t.store(Yr).Z({Y:!0},([o,c,l],h)=>{const p=At(c);return i(p.popLast())}))}li(e){const t=e.store(Jr);return t.Z((r,s)=>{const i=Ys(s),o=Lg(this.serializer,i);return t.put(o)})}hi(e,t){const r=t.store(jn),s=[];return r.Z((i,o)=>{const c=t.store(ta),l=function(m){return m.document?new K(me.fromString(m.document.name).popFirst(5)):m.noDocument?K.fromSegments(m.noDocument.path):m.unknownDocument?K.fromSegments(m.unknownDocument.path):Q()}(o).path.toArray(),h={prefixPath:l.slice(0,l.length-2),collectionGroup:l[l.length-2],documentId:l[l.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};s.push(c.put(h))}).next(()=>D.waitFor(s))}Pi(e,t){const r=t.store(yt),s=Wg(this.serializer),i=new gu(Qa.ri,this.serializer.Tt);return r.G().next(o=>{const c=new Map;return o.forEach(l=>{var h;let p=(h=c.get(l.userId))!==null&&h!==void 0?h:oe();Hn(this.serializer,l).keys().forEach(m=>p=p.add(m)),c.set(l.userId,p)}),D.forEach(c,(l,h)=>{const p=new Je(h),m=Ka.It(this.serializer,p),b=i.getIndexManager(p),A=Wa.It(p,this.serializer,b,i.referenceDelegate);return new Qg(s,A,m,b).recalculateAndSaveOverlaysForDocumentKeys(new ll(t,ht.ae),l).next()})})}}function Nf(n){n.createObjectStore(Xr,{keyPath:IE}).createIndex(Xl,wE,{unique:!0}),n.createObjectStore(Jr,{keyPath:"targetId"}).createIndex(Lm,bE,{unique:!0}),n.createObjectStore(er)}const rn="IndexedDbPersistence",Lc=18e5,Mc=5e3,Fc="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",nA="main";class _u{constructor(e,t,r,s,i,o,c,l,h,p,m=17){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.Ti=i,this.window=o,this.document=c,this.Ii=h,this.Ei=p,this.di=m,this.Gr=null,this.zr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Ai=null,this.inForeground=!1,this.Ri=null,this.Vi=null,this.mi=Number.NEGATIVE_INFINITY,this.fi=b=>Promise.resolve(),!_u.D())throw new q(L.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new jT(this,s),this.gi=t+nA,this.serializer=new Og(l),this.pi=new _n(this.gi,this.di,new tA(this.serializer)),this.jr=new DT,this.Hr=new BT(this.referenceDelegate,this.serializer),this.remoteDocumentCache=Wg(this.serializer),this.Yr=new xT,this.window&&this.window.localStorage?this.yi=this.window.localStorage:(this.yi=null,p===!1&&Xe(rn,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.wi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new q(L.FAILED_PRECONDITION,Fc);return this.Si(),this.bi(),this.Di(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Hr.getHighestSequenceNumber(e))}).then(e=>{this.Gr=new ht(e,this.Ii)}).then(()=>{this.zr=!0}).catch(e=>(this.pi&&this.pi.close(),Promise.reject(e)))}Ci(e){return this.fi=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.pi.k(async t=>{t.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Ti.enqueueAndForget(async()=>{this.started&&await this.wi()}))}wi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>_o(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.Fi(e).next(t=>{t||(this.isPrimary=!1,this.Ti.enqueueRetryable(()=>this.fi(!1)))})}).next(()=>this.Mi(e)).next(t=>this.isPrimary&&!t?this.xi(e).next(()=>!1):!!t&&this.Oi(e).next(()=>!0))).catch(e=>{if(Cn(e))return B(rn,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return B(rn,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Ti.enqueueRetryable(()=>this.fi(e)),this.isPrimary=e})}Fi(e){return js(e).get(Sr).next(t=>D.resolve(this.Ni(t)))}Bi(e){return _o(e).delete(this.clientId)}async Li(){if(this.isPrimary&&!this.ki(this.mi,Lc)){this.mi=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{const r=Le(t,Zr);return r.G().next(s=>{const i=this.qi(s,Lc),o=s.filter(c=>i.indexOf(c)===-1);return D.forEach(o,c=>r.delete(c.clientId)).next(()=>o)})}).catch(()=>[]);if(this.yi)for(const t of e)this.yi.removeItem(this.Qi(t.clientId))}}Di(){this.Vi=this.Ti.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.wi().then(()=>this.Li()).then(()=>this.Di()))}Ni(e){return!!e&&e.ownerId===this.clientId}Mi(e){return this.Ei?D.resolve(!0):js(e).get(Sr).next(t=>{if(t!==null&&this.ki(t.leaseTimestampMs,Mc)&&!this.$i(t.ownerId)){if(this.Ni(t)&&this.networkEnabled)return!0;if(!this.Ni(t)){if(!t.allowTabSynchronization)throw new q(L.FAILED_PRECONDITION,Fc);return!1}}return!(!this.networkEnabled||!this.inForeground)||_o(e).G().next(r=>this.qi(r,Mc).find(s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,o=!this.inForeground&&s.inForeground,c=this.networkEnabled===s.networkEnabled;if(i||o&&c)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&B(rn,`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.zr=!1,this.Ui(),this.Vi&&(this.Vi.cancel(),this.Vi=null),this.Ki(),this.Wi(),await this.pi.runTransaction("shutdown","readwrite",[Oi,Zr],e=>{const t=new ll(e,ht.ae);return this.xi(t).next(()=>this.Bi(t))}),this.pi.close(),this.Gi()}qi(e,t){return e.filter(r=>this.ki(r.updateTimeMs,t)&&!this.$i(r.clientId))}zi(){return this.runTransaction("getActiveClients","readonly",e=>_o(e).G().next(t=>this.qi(t,Lc).map(r=>r.clientId)))}get started(){return this.zr}getGlobalsCache(){return this.jr}getMutationQueue(e,t){return Wa.It(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Hr}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new UT(e,this.serializer.Tt.databaseId)}getDocumentOverlayCache(e){return Ka.It(this.serializer,e)}getBundleCache(){return this.Yr}runTransaction(e,t,r){B(rn,"Starting transaction:",e);const s=t==="readonly"?"readonly":"readwrite",i=function(l){return l===17?UE:l===16?FE:l===15?tu:l===14?qm:l===13?$m:l===12?ME:l===11?Bm:void Q()}(this.di);let o;return this.pi.runTransaction(e,s,i,c=>(o=new ll(c,this.Gr?this.Gr.next():ht.ae),t==="readwrite-primary"?this.Fi(o).next(l=>!!l||this.Mi(o)).next(l=>{if(!l)throw Xe(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Ti.enqueueRetryable(()=>this.fi(!1)),new q(L.FAILED_PRECONDITION,xm);return r(o)}).next(l=>this.Oi(o).next(()=>l)):this.ji(o).next(()=>r(o)))).then(c=>(o.raiseOnCommittedEvent(),c))}ji(e){return js(e).get(Sr).next(t=>{if(t!==null&&this.ki(t.leaseTimestampMs,Mc)&&!this.$i(t.ownerId)&&!this.Ni(t)&&!(this.Ei||this.allowTabSynchronization&&t.allowTabSynchronization))throw new q(L.FAILED_PRECONDITION,Fc)})}Oi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return js(e).put(Sr,t)}static D(){return _n.D()}xi(e){const t=js(e);return t.get(Sr).next(r=>this.Ni(r)?(B(rn,"Releasing primary lease."),t.delete(Sr)):D.resolve())}ki(e,t){const r=Date.now();return!(e<r-t)&&(!(e>r)||(Xe(`Detected an update time that is in the future: ${e} > ${r}`),!1))}Si(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ri=()=>{this.Ti.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.wi()))},this.document.addEventListener("visibilitychange",this.Ri),this.inForeground=this.document.visibilityState==="visible")}Ki(){this.Ri&&(this.document.removeEventListener("visibilitychange",this.Ri),this.Ri=null)}bi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Ai=()=>{this.Ui();const t=/(?:Version|Mobile)\/1[456]/;Op()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.Ti.enterRestrictedMode(!0),this.Ti.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Ai))}Wi(){this.Ai&&(this.window.removeEventListener("pagehide",this.Ai),this.Ai=null)}$i(e){var t;try{const r=((t=this.yi)===null||t===void 0?void 0:t.getItem(this.Qi(e)))!==null;return B(rn,`Client '${e}' ${r?"is":"is not"} zombied in LocalStorage`),r}catch(r){return Xe(rn,"Failed to get zombied client id.",r),!1}}Ui(){if(this.yi)try{this.yi.setItem(this.Qi(this.clientId),String(Date.now()))}catch(e){Xe("Failed to set zombie client id.",e)}}Gi(){if(this.yi)try{this.yi.removeItem(this.Qi(this.clientId))}catch{}}Qi(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function js(n){return Le(n,Oi)}function _o(n){return Le(n,Zr)}function rA(n,e){let t=n.projectId;return n.isDefaultDatabase||(t+="."+n.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yu{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Hi=r,this.Ji=s}static Yi(e,t){let r=oe(),s=oe();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new yu(e,t.fromCache,r,s)}}/**
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
 */class sA{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yg{constructor(){this.Zi=!1,this.Xi=!1,this.es=100,this.ts=function(){return Op()?8:Nm(Oe())>0?6:4}()}initialize(e,t){this.ns=e,this.indexManager=t,this.Zi=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.rs(e,t).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.ss(e,t,s,r).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new sA;return this._s(e,t,o).next(c=>{if(i.result=c,this.Xi)return this.us(e,t,o,c.size)})}).next(()=>i.result)}us(e,t,r,s){return r.documentReadCount<this.es?(Dr()<=ce.DEBUG&&B("QueryEngine","SDK will not create cache indexes for query:",Nr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.es,"documents"),D.resolve()):(Dr()<=ce.DEBUG&&B("QueryEngine","Query:",Nr(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.ts*s?(Dr()<=ce.DEBUG&&B("QueryEngine","The SDK decides to create cache indexes for query:",Nr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,ft(t))):D.resolve())}rs(e,t){if(rf(t))return D.resolve(null);let r=ft(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=ca(t,null,"F"),r=ft(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const o=oe(...i);return this.ns.getDocuments(e,o).next(c=>this.indexManager.getMinOffset(e,r).next(l=>{const h=this.cs(t,c);return this.ls(t,h,o,l.readTime)?this.rs(e,ca(t,null,"F")):this.hs(e,h,t,l)}))})))}ss(e,t,r,s){return rf(t)||s.isEqual(J.min())?D.resolve(null):this.ns.getDocuments(e,r).next(i=>{const o=this.cs(t,i);return this.ls(t,o,r,s)?D.resolve(null):(Dr()<=ce.DEBUG&&B("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Nr(t)),this.hs(e,o,t,cE(s,pi)).next(c=>c))})}cs(e,t){let r=new ye(ag(e));return t.forEach((s,i)=>{Fi(e,i)&&(r=r.add(i))}),r}ls(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}_s(e,t,r){return Dr()<=ce.DEBUG&&B("QueryEngine","Using full collection scan to execute query:",Nr(t)),this.ns.getDocumentsMatchingQuery(e,t,lt.min(),r)}hs(e,t,r,s){return this.ns.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vu="LocalStore",iA=3e8;class oA{constructor(e,t,r,s){this.persistence=e,this.Ps=t,this.serializer=s,this.Ts=new Ee(te),this.Is=new Wt(i=>ar(i),Li),this.Es=new Map,this.ds=e.getRemoteDocumentCache(),this.Hr=e.getTargetCache(),this.Yr=e.getBundleCache(),this.As(r)}As(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Qg(this.ds,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.ds.setIndexManager(this.indexManager),this.Ps.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ts))}}function Jg(n,e,t,r){return new oA(n,e,t,r)}async function Xg(n,e){const t=ne(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.As(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const o=[],c=[];let l=oe();for(const h of s){o.push(h.batchId);for(const p of h.mutations)l=l.add(p.key)}for(const h of i){c.push(h.batchId);for(const p of h.mutations)l=l.add(p.key)}return t.localDocuments.getDocuments(r,l).next(h=>({Rs:h,removedBatchIds:o,addedBatchIds:c}))})})}function aA(n,e){const t=ne(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.ds.newChangeBuffer({trackRemovals:!0});return function(c,l,h,p){const m=h.batch,b=m.keys();let A=D.resolve();return b.forEach(P=>{A=A.next(()=>p.getEntry(l,P)).next(R=>{const S=h.docVersions.get(P);Y(S!==null),R.version.compareTo(S)<0&&(m.applyToRemoteDocument(R,h),R.isValidDocument()&&(R.setReadTime(h.commitVersion),p.addEntry(R)))})}),A.next(()=>c.mutationQueue.removeMutationBatch(l,m))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let l=oe();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(l=l.add(c.batch.mutations[h].key));return l}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function Zg(n){const e=ne(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Hr.getLastRemoteSnapshotVersion(t))}function cA(n,e){const t=ne(n),r=e.snapshotVersion;let s=t.Ts;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=t.ds.newChangeBuffer({trackRemovals:!0});s=t.Ts;const c=[];e.targetChanges.forEach((p,m)=>{const b=s.get(m);if(!b)return;c.push(t.Hr.removeMatchingKeys(i,p.removedDocuments,m).next(()=>t.Hr.addMatchingKeys(i,p.addedDocuments,m)));let A=b.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(m)!==null?A=A.withResumeToken(xe.EMPTY_BYTE_STRING,J.min()).withLastLimboFreeSnapshotVersion(J.min()):p.resumeToken.approximateByteSize()>0&&(A=A.withResumeToken(p.resumeToken,r)),s=s.insert(m,A),function(R,S,V){return R.resumeToken.approximateByteSize()===0||S.snapshotVersion.toMicroseconds()-R.snapshotVersion.toMicroseconds()>=iA?!0:V.addedDocuments.size+V.modifiedDocuments.size+V.removedDocuments.size>0}(b,A,p)&&c.push(t.Hr.updateTargetData(i,A))});let l=ct(),h=oe();if(e.documentUpdates.forEach(p=>{e.resolvedLimboDocuments.has(p)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,p))}),c.push(lA(i,o,e.documentUpdates).next(p=>{l=p.Vs,h=p.fs})),!r.isEqual(J.min())){const p=t.Hr.getLastRemoteSnapshotVersion(i).next(m=>t.Hr.setTargetsMetadata(i,i.currentSequenceNumber,r));c.push(p)}return D.waitFor(c).next(()=>o.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,l,h)).next(()=>l)}).then(i=>(t.Ts=s,i))}function lA(n,e,t){let r=oe(),s=oe();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let o=ct();return t.forEach((c,l)=>{const h=i.get(c);l.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),l.isNoDocument()&&l.version.isEqual(J.min())?(e.removeEntry(c,l.readTime),o=o.insert(c,l)):!h.isValidDocument()||l.version.compareTo(h.version)>0||l.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(l),o=o.insert(c,l)):B(vu,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",l.version)}),{Vs:o,fs:s}})}function uA(n,e){const t=ne(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=Zn),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function dA(n,e){const t=ne(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.Hr.getTargetData(r,e).next(i=>i?(s=i,D.resolve(s)):t.Hr.allocateTargetId(r).next(o=>(s=new qt(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.Hr.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.Ts.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Ts=t.Ts.insert(r.targetId,r),t.Is.set(e,r.targetId)),r})}async function El(n,e,t){const r=ne(n),s=r.Ts.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!Cn(o))throw o;B(vu,`Failed to update sequence numbers for target ${e}: ${o}`)}r.Ts=r.Ts.remove(e),r.Is.delete(s.target)}function Vf(n,e,t){const r=ne(n);let s=J.min(),i=oe();return r.persistence.runTransaction("Execute query","readwrite",o=>function(l,h,p){const m=ne(l),b=m.Is.get(p);return b!==void 0?D.resolve(m.Ts.get(b)):m.Hr.getTargetData(h,p)}(r,o,ft(e)).next(c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.Hr.getMatchingKeysForTargetId(o,c.targetId).next(l=>{i=l})}).next(()=>r.Ps.getDocumentsMatchingQuery(o,e,t?s:J.min(),t?i:oe())).next(c=>(hA(r,eT(e),c),{documents:c,gs:i})))}function hA(n,e,t){let r=n.Es.get(e)||J.min();t.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.Es.set(e,r)}class Of{constructor(){this.activeTargetIds=oT()}Ds(e){this.activeTargetIds=this.activeTargetIds.add(e)}vs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}bs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class e_{constructor(){this.ho=new Of,this.Po={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.ho.Ds(e),this.Po[e]||"not-current"}updateQueryState(e,t,r){this.Po[e]=t}removeLocalQueryTarget(e){this.ho.vs(e)}isLocalQueryTarget(e){return this.ho.activeTargetIds.has(e)}clearQueryState(e){delete this.Po[e]}getAllActiveQueryTargets(){return this.ho.activeTargetIds}isActiveQueryTarget(e){return this.ho.activeTargetIds.has(e)}start(){return this.ho=new Of,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fA{To(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lf="ConnectivityMonitor";class Mf{constructor(){this.Io=()=>this.Eo(),this.Ao=()=>this.Ro(),this.Vo=[],this.mo()}To(e){this.Vo.push(e)}shutdown(){window.removeEventListener("online",this.Io),window.removeEventListener("offline",this.Ao)}mo(){window.addEventListener("online",this.Io),window.addEventListener("offline",this.Ao)}Eo(){B(Lf,"Network connectivity changed: AVAILABLE");for(const e of this.Vo)e(0)}Ro(){B(Lf,"Network connectivity changed: UNAVAILABLE");for(const e of this.Vo)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let yo=null;function Tl(){return yo===null?yo=function(){return 268435456+Math.round(2147483648*Math.random())}():yo++,"0x"+yo.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uc="RestConnection",pA={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class mA{get fo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.po=t+"://"+e.host,this.yo=`projects/${r}/databases/${s}`,this.wo=this.databaseId.database===ia?`project_id=${r}`:`project_id=${r}&database_id=${s}`}So(e,t,r,s,i){const o=Tl(),c=this.bo(e,t.toUriEncodedString());B(Uc,`Sending RPC '${e}' ${o}:`,c,r);const l={"google-cloud-resource-prefix":this.yo,"x-goog-request-params":this.wo};return this.Do(l,s,i),this.vo(e,c,l,r).then(h=>(B(Uc,`Received RPC '${e}' ${o}: `,h),h),h=>{throw fi(Uc,`RPC '${e}' ${o} failed with error: `,h,"url: ",c,"request:",r),h})}Co(e,t,r,s,i,o){return this.So(e,t,r,s,i)}Do(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+ys}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}bo(e,t){const r=pA[e];return`${this.po}/v1/${t}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gA{constructor(e){this.Fo=e.Fo,this.Mo=e.Mo}xo(e){this.Oo=e}No(e){this.Bo=e}Lo(e){this.ko=e}onMessage(e){this.qo=e}close(){this.Mo()}send(e){this.Fo(e)}Qo(){this.Oo()}$o(){this.Bo()}Uo(e){this.ko(e)}Ko(e){this.qo(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const je="WebChannelConnection";class _A extends mA{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}vo(e,t,r,s){const i=Tl();return new Promise((o,c)=>{const l=new Em;l.setWithCredentials(!0),l.listenOnce(Tm.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case Do.NO_ERROR:const p=l.getResponseJson();B(je,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(p)),o(p);break;case Do.TIMEOUT:B(je,`RPC '${e}' ${i} timed out`),c(new q(L.DEADLINE_EXCEEDED,"Request time out"));break;case Do.HTTP_ERROR:const m=l.getStatus();if(B(je,`RPC '${e}' ${i} failed with status:`,m,"response text:",l.getResponseText()),m>0){let b=l.getResponseJson();Array.isArray(b)&&(b=b[0]);const A=b?.error;if(A&&A.status&&A.message){const P=function(S){const V=S.toLowerCase().replace(/_/g,"-");return Object.values(L).indexOf(V)>=0?V:L.UNKNOWN}(A.status);c(new q(P,A.message))}else c(new q(L.UNKNOWN,"Server responded with status "+l.getStatus()))}else c(new q(L.UNAVAILABLE,"Connection failed."));break;default:Q()}}finally{B(je,`RPC '${e}' ${i} completed.`)}});const h=JSON.stringify(s);B(je,`RPC '${e}' ${i} sending request:`,s),l.send(t,"POST",h,r,15)})}Wo(e,t,r){const s=Tl(),i=[this.po,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=Rm(),c=Sm(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(l.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Do(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;const p=i.join("");B(je,`Creating RPC '${e}' stream ${s}: ${p}`,l);const m=o.createWebChannel(p,l);let b=!1,A=!1;const P=new gA({Fo:S=>{A?B(je,`Not sending because RPC '${e}' stream ${s} is closed:`,S):(b||(B(je,`Opening RPC '${e}' stream ${s} transport.`),m.open(),b=!0),B(je,`RPC '${e}' stream ${s} sending:`,S),m.send(S))},Mo:()=>m.close()}),R=(S,V,C)=>{S.listen(V,k=>{try{C(k)}catch(U){setTimeout(()=>{throw U},0)}})};return R(m,Ks.EventType.OPEN,()=>{A||(B(je,`RPC '${e}' stream ${s} transport opened.`),P.Qo())}),R(m,Ks.EventType.CLOSE,()=>{A||(A=!0,B(je,`RPC '${e}' stream ${s} transport closed`),P.Uo())}),R(m,Ks.EventType.ERROR,S=>{A||(A=!0,fi(je,`RPC '${e}' stream ${s} transport errored:`,S),P.Uo(new q(L.UNAVAILABLE,"The operation could not be completed")))}),R(m,Ks.EventType.MESSAGE,S=>{var V;if(!A){const C=S.data[0];Y(!!C);const k=C,U=k?.error||((V=k[0])===null||V===void 0?void 0:V.error);if(U){B(je,`RPC '${e}' stream ${s} received error:`,U);const x=U.status;let M=function(g){const _=ke[g];if(_!==void 0)return Ig(_)}(x),E=U.message;M===void 0&&(M=L.INTERNAL,E="Unknown error status: "+x+" with message "+U.message),A=!0,P.Uo(new q(M,E)),m.close()}else B(je,`RPC '${e}' stream ${s} received:`,C),P.Ko(C)}}),R(c,Am.STAT_EVENT,S=>{S.stat===nl.PROXY?B(je,`RPC '${e}' stream ${s} detected buffering proxy`):S.stat===nl.NOPROXY&&B(je,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{P.$o()},0),P}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */function yA(){return typeof window<"u"?window:null}function $o(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ya(n){return new bT(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t_{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Ti=e,this.timerId=t,this.Go=r,this.zo=s,this.jo=i,this.Ho=0,this.Jo=null,this.Yo=Date.now(),this.reset()}reset(){this.Ho=0}Zo(){this.Ho=this.jo}Xo(e){this.cancel();const t=Math.floor(this.Ho+this.e_()),r=Math.max(0,Date.now()-this.Yo),s=Math.max(0,t-r);s>0&&B("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ho} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Jo=this.Ti.enqueueAfterDelay(this.timerId,s,()=>(this.Yo=Date.now(),e())),this.Ho*=this.zo,this.Ho<this.Go&&(this.Ho=this.Go),this.Ho>this.jo&&(this.Ho=this.jo)}t_(){this.Jo!==null&&(this.Jo.skipDelay(),this.Jo=null)}cancel(){this.Jo!==null&&(this.Jo.cancel(),this.Jo=null)}e_(){return(Math.random()-.5)*this.Ho}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ff="PersistentStream";class n_{constructor(e,t,r,s,i,o,c,l){this.Ti=e,this.n_=r,this.r_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.i_=0,this.s_=null,this.o_=null,this.stream=null,this.__=0,this.a_=new t_(e,t)}u_(){return this.state===1||this.state===5||this.c_()}c_(){return this.state===2||this.state===3}start(){this.__=0,this.state!==4?this.auth():this.l_()}async stop(){this.u_()&&await this.close(0)}h_(){this.state=0,this.a_.reset()}P_(){this.c_()&&this.s_===null&&(this.s_=this.Ti.enqueueAfterDelay(this.n_,6e4,()=>this.T_()))}I_(e){this.E_(),this.stream.send(e)}async T_(){if(this.c_())return this.close(0)}E_(){this.s_&&(this.s_.cancel(),this.s_=null)}d_(){this.o_&&(this.o_.cancel(),this.o_=null)}async close(e,t){this.E_(),this.d_(),this.a_.cancel(),this.i_++,e!==4?this.a_.reset():t&&t.code===L.RESOURCE_EXHAUSTED?(Xe(t.toString()),Xe("Using maximum backoff delay to prevent overloading the backend."),this.a_.Zo()):t&&t.code===L.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.A_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Lo(t)}A_(){}auth(){this.state=1;const e=this.R_(this.i_),t=this.i_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.i_===t&&this.V_(r,s)},r=>{e(()=>{const s=new q(L.UNKNOWN,"Fetching auth token failed: "+r.message);return this.m_(s)})})}V_(e,t){const r=this.R_(this.i_);this.stream=this.f_(e,t),this.stream.xo(()=>{r(()=>this.listener.xo())}),this.stream.No(()=>{r(()=>(this.state=2,this.o_=this.Ti.enqueueAfterDelay(this.r_,1e4,()=>(this.c_()&&(this.state=3),Promise.resolve())),this.listener.No()))}),this.stream.Lo(s=>{r(()=>this.m_(s))}),this.stream.onMessage(s=>{r(()=>++this.__==1?this.g_(s):this.onNext(s))})}l_(){this.state=5,this.a_.Xo(async()=>{this.state=0,this.start()})}m_(e){return B(Ff,`close with error: ${e}`),this.stream=null,this.close(4,e)}R_(e){return t=>{this.Ti.enqueueAndForget(()=>this.i_===e?t():(B(Ff,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class vA extends n_{constructor(e,t,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}f_(e,t){return this.connection.Wo("Listen",e,t)}g_(e){return this.onNext(e)}onNext(e){this.a_.reset();const t=ET(this.serializer,e),r=function(i){if(!("targetChange"in i))return J.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?J.min():o.readTime?et(o.readTime):J.min()}(e);return this.listener.p_(t,r)}y_(e){const t={};t.database=yl(this.serializer),t.addTarget=function(i,o){let c;const l=o.target;if(c=oa(l)?{documents:Pg(i,l)}:{query:kg(i,l).ht},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=Tg(i,o.resumeToken);const h=gl(i,o.expectedCount);h!==null&&(c.expectedCount=h)}else if(o.snapshotVersion.compareTo(J.min())>0){c.readTime=os(i,o.snapshotVersion.toTimestamp());const h=gl(i,o.expectedCount);h!==null&&(c.expectedCount=h)}return c}(this.serializer,e);const r=AT(this.serializer,e);r&&(t.labels=r),this.I_(t)}w_(e){const t={};t.database=yl(this.serializer),t.removeTarget=e,this.I_(t)}}class bA extends n_{constructor(e,t,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}get S_(){return this.__>0}start(){this.lastStreamToken=void 0,super.start()}A_(){this.S_&&this.b_([])}f_(e,t){return this.connection.Wo("Write",e,t)}g_(e){return Y(!!e.streamToken),this.lastStreamToken=e.streamToken,Y(!e.writeResults||e.writeResults.length===0),this.listener.D_()}onNext(e){Y(!!e.streamToken),this.lastStreamToken=e.streamToken,this.a_.reset();const t=TT(e.writeResults,e.commitTime),r=et(e.commitTime);return this.listener.v_(r,t)}C_(){const e={};e.database=yl(this.serializer),this.I_(e)}b_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>ua(this.serializer,r))};this.I_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IA{}class wA extends IA{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.F_=!1}M_(){if(this.F_)throw new q(L.FAILED_PRECONDITION,"The client has already been terminated.")}So(e,t,r,s){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.So(e,_l(t,r),s,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===L.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new q(L.UNKNOWN,i.toString())})}Co(e,t,r,s,i){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.Co(e,_l(t,r),s,o,c,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===L.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new q(L.UNKNOWN,o.toString())})}terminate(){this.F_=!0,this.connection.terminate()}}class EA{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.x_=0,this.O_=null,this.N_=!0}B_(){this.x_===0&&(this.L_("Unknown"),this.O_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.O_=null,this.k_("Backend didn't respond within 10 seconds."),this.L_("Offline"),Promise.resolve())))}q_(e){this.state==="Online"?this.L_("Unknown"):(this.x_++,this.x_>=1&&(this.Q_(),this.k_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.L_("Offline")))}set(e){this.Q_(),this.x_=0,e==="Online"&&(this.N_=!1),this.L_(e)}L_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}k_(e){const t=`Could not reach Cloud Firestore backend. ${e}
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
 */const dr="RemoteStore";class TA{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.U_=[],this.K_=new Map,this.W_=new Set,this.G_=[],this.z_=i,this.z_.To(o=>{r.enqueueAndForget(async()=>{_r(this)&&(B(dr,"Restarting streams for network reachability change."),await async function(l){const h=ne(l);h.W_.add(4),await Bi(h),h.j_.set("Unknown"),h.W_.delete(4),await Ja(h)}(this))})}),this.j_=new EA(r,s)}}async function Ja(n){if(_r(n))for(const e of n.G_)await e(!0)}async function Bi(n){for(const e of n.G_)await e(!1)}function r_(n,e){const t=ne(n);t.K_.has(e.targetId)||(t.K_.set(e.targetId,e),Eu(t)?wu(t):bs(t).c_()&&Iu(t,e))}function bu(n,e){const t=ne(n),r=bs(t);t.K_.delete(e),r.c_()&&s_(t,e),t.K_.size===0&&(r.c_()?r.P_():_r(t)&&t.j_.set("Unknown"))}function Iu(n,e){if(n.H_.Ne(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(J.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}bs(n).y_(e)}function s_(n,e){n.H_.Ne(e),bs(n).w_(e)}function wu(n){n.H_=new gT({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),lt:e=>n.K_.get(e)||null,it:()=>n.datastore.serializer.databaseId}),bs(n).start(),n.j_.B_()}function Eu(n){return _r(n)&&!bs(n).u_()&&n.K_.size>0}function _r(n){return ne(n).W_.size===0}function i_(n){n.H_=void 0}async function AA(n){n.j_.set("Online")}async function SA(n){n.K_.forEach((e,t)=>{Iu(n,e)})}async function RA(n,e){i_(n),Eu(n)?(n.j_.q_(e),wu(n)):n.j_.set("Unknown")}async function CA(n,e,t){if(n.j_.set("Online"),e instanceof Eg&&e.state===2&&e.cause)try{await async function(s,i){const o=i.cause;for(const c of i.targetIds)s.K_.has(c)&&(await s.remoteSyncer.rejectListen(c,o),s.K_.delete(c),s.H_.removeTarget(c))}(n,e)}catch(r){B(dr,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await ma(n,r)}else if(e instanceof Bo?n.H_.We(e):e instanceof wg?n.H_.Ze(e):n.H_.je(e),!t.isEqual(J.min()))try{const r=await Zg(n.localStore);t.compareTo(r)>=0&&await function(i,o){const c=i.H_.ot(o);return c.targetChanges.forEach((l,h)=>{if(l.resumeToken.approximateByteSize()>0){const p=i.K_.get(h);p&&i.K_.set(h,p.withResumeToken(l.resumeToken,o))}}),c.targetMismatches.forEach((l,h)=>{const p=i.K_.get(l);if(!p)return;i.K_.set(l,p.withResumeToken(xe.EMPTY_BYTE_STRING,p.snapshotVersion)),s_(i,l);const m=new qt(p.target,l,h,p.sequenceNumber);Iu(i,m)}),i.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){B(dr,"Failed to raise snapshot:",r),await ma(n,r)}}async function ma(n,e,t){if(!Cn(e))throw e;n.W_.add(1),await Bi(n),n.j_.set("Offline"),t||(t=()=>Zg(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{B(dr,"Retrying IndexedDB access"),await t(),n.W_.delete(1),await Ja(n)})}function o_(n,e){return e().catch(t=>ma(n,t,e))}async function $i(n){const e=ne(n),t=En(e);let r=e.U_.length>0?e.U_[e.U_.length-1].batchId:Zn;for(;PA(e);)try{const s=await uA(e.localStore,r);if(s===null){e.U_.length===0&&t.P_();break}r=s.batchId,kA(e,s)}catch(s){await ma(e,s)}a_(e)&&c_(e)}function PA(n){return _r(n)&&n.U_.length<10}function kA(n,e){n.U_.push(e);const t=En(n);t.c_()&&t.S_&&t.b_(e.mutations)}function a_(n){return _r(n)&&!En(n).u_()&&n.U_.length>0}function c_(n){En(n).start()}async function xA(n){En(n).C_()}async function DA(n){const e=En(n);for(const t of n.U_)e.b_(t.mutations)}async function NA(n,e,t){const r=n.U_.shift(),s=lu.from(r,e,t);await o_(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await $i(n)}async function VA(n,e){e&&En(n).S_&&await async function(r,s){if(function(o){return pT(o)&&o!==L.ABORTED}(s.code)){const i=r.U_.shift();En(r).h_(),await o_(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await $i(r)}}(n,e),a_(n)&&c_(n)}async function Uf(n,e){const t=ne(n);t.asyncQueue.verifyOperationInProgress(),B(dr,"RemoteStore received new credentials");const r=_r(t);t.W_.add(3),await Bi(t),r&&t.j_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.W_.delete(3),await Ja(t)}async function OA(n,e){const t=ne(n);e?(t.W_.delete(2),await Ja(t)):e||(t.W_.add(2),await Bi(t),t.j_.set("Unknown"))}function bs(n){return n.J_||(n.J_=function(t,r,s){const i=ne(t);return i.M_(),new vA(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{xo:AA.bind(null,n),No:SA.bind(null,n),Lo:RA.bind(null,n),p_:CA.bind(null,n)}),n.G_.push(async e=>{e?(n.J_.h_(),Eu(n)?wu(n):n.j_.set("Unknown")):(await n.J_.stop(),i_(n))})),n.J_}function En(n){return n.Y_||(n.Y_=function(t,r,s){const i=ne(t);return i.M_(),new bA(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{xo:()=>Promise.resolve(),No:xA.bind(null,n),Lo:VA.bind(null,n),D_:DA.bind(null,n),v_:NA.bind(null,n)}),n.G_.push(async e=>{e?(n.Y_.h_(),await $i(n)):(await n.Y_.stop(),n.U_.length>0&&(B(dr,`Stopping write stream with ${n.U_.length} pending writes`),n.U_=[]))})),n.Y_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tu{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Pt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const o=Date.now()+r,c=new Tu(e,t,o,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new q(L.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Au(n,e){if(Xe("AsyncQueue",`${e}: ${n}`),Cn(n))return new q(L.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zr{static emptySet(e){return new zr(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||K.comparator(t.key,r.key):(t,r)=>K.comparator(t.key,r.key),this.keyedMap=Ws(),this.sortedSet=new Ee(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof zr)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new zr;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bf{constructor(){this.Z_=new Ee(K.comparator)}track(e){const t=e.doc.key,r=this.Z_.get(t);r?e.type!==0&&r.type===3?this.Z_=this.Z_.insert(t,e):e.type===3&&r.type!==1?this.Z_=this.Z_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.Z_=this.Z_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.Z_=this.Z_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.Z_=this.Z_.remove(t):e.type===1&&r.type===2?this.Z_=this.Z_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.Z_=this.Z_.insert(t,{type:2,doc:e.doc}):Q():this.Z_=this.Z_.insert(t,e)}X_(){const e=[];return this.Z_.inorderTraversal((t,r)=>{e.push(r)}),e}}class as{constructor(e,t,r,s,i,o,c,l,h){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=h}static fromInitialDocuments(e,t,r,s,i){const o=[];return t.forEach(c=>{o.push({type:0,doc:c})}),new as(e,t,zr.emptySet(t),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ja(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LA{constructor(){this.ea=void 0,this.ta=[]}na(){return this.ta.some(e=>e.ra())}}class MA{constructor(){this.queries=$f(),this.onlineState="Unknown",this.ia=new Set}terminate(){(function(t,r){const s=ne(t),i=s.queries;s.queries=$f(),i.forEach((o,c)=>{for(const l of c.ta)l.onError(r)})})(this,new q(L.ABORTED,"Firestore shutting down"))}}function $f(){return new Wt(n=>og(n),ja)}async function Su(n,e){const t=ne(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.na()&&e.ra()&&(r=2):(i=new LA,r=e.ra()?0:1);try{switch(r){case 0:i.ea=await t.onListen(s,!0);break;case 1:i.ea=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const c=Au(o,`Initialization of query '${Nr(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.ta.push(e),e.sa(t.onlineState),i.ea&&e.oa(i.ea)&&Cu(t)}async function Ru(n,e){const t=ne(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const o=i.ta.indexOf(e);o>=0&&(i.ta.splice(o,1),i.ta.length===0?s=e.ra()?0:1:!i.na()&&e.ra()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function FA(n,e){const t=ne(n);let r=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const c of o.ta)c.oa(s)&&(r=!0);o.ea=s}}r&&Cu(t)}function UA(n,e,t){const r=ne(n),s=r.queries.get(e);if(s)for(const i of s.ta)i.onError(t);r.queries.delete(e)}function Cu(n){n.ia.forEach(e=>{e.next()})}var Al,qf;(qf=Al||(Al={}))._a="default",qf.Cache="cache";class Pu{constructor(e,t,r){this.query=e,this.aa=t,this.ua=!1,this.ca=null,this.onlineState="Unknown",this.options=r||{}}oa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new as(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.ua?this.la(e)&&(this.aa.next(e),t=!0):this.ha(e,this.onlineState)&&(this.Pa(e),t=!0),this.ca=e,t}onError(e){this.aa.error(e)}sa(e){this.onlineState=e;let t=!1;return this.ca&&!this.ua&&this.ha(this.ca,e)&&(this.Pa(this.ca),t=!0),t}ha(e,t){if(!e.fromCache||!this.ra())return!0;const r=t!=="Offline";return(!this.options.Ta||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}la(e){if(e.docChanges.length>0)return!0;const t=this.ca&&this.ca.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}Pa(e){e=as.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.ua=!0,this.aa.next(e)}ra(){return this.options.source!==Al.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class l_{constructor(e){this.key=e}}class u_{constructor(e){this.key=e}}class BA{constructor(e,t){this.query=e,this.fa=t,this.ga=null,this.hasCachedResults=!1,this.current=!1,this.pa=oe(),this.mutatedKeys=oe(),this.ya=ag(e),this.wa=new zr(this.ya)}get Sa(){return this.fa}ba(e,t){const r=t?t.Da:new Bf,s=t?t.wa:this.wa;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,c=!1;const l=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((p,m)=>{const b=s.get(p),A=Fi(this.query,m)?m:null,P=!!b&&this.mutatedKeys.has(b.key),R=!!A&&(A.hasLocalMutations||this.mutatedKeys.has(A.key)&&A.hasCommittedMutations);let S=!1;b&&A?b.data.isEqual(A.data)?P!==R&&(r.track({type:3,doc:A}),S=!0):this.va(b,A)||(r.track({type:2,doc:A}),S=!0,(l&&this.ya(A,l)>0||h&&this.ya(A,h)<0)&&(c=!0)):!b&&A?(r.track({type:0,doc:A}),S=!0):b&&!A&&(r.track({type:1,doc:b}),S=!0,(l||h)&&(c=!0)),S&&(A?(o=o.add(A),i=R?i.add(p):i.delete(p)):(o=o.delete(p),i=i.delete(p)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const p=this.query.limitType==="F"?o.last():o.first();o=o.delete(p.key),i=i.delete(p.key),r.track({type:1,doc:p})}return{wa:o,Da:r,ls:c,mutatedKeys:i}}va(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.wa;this.wa=e.wa,this.mutatedKeys=e.mutatedKeys;const o=e.Da.X_();o.sort((p,m)=>function(A,P){const R=S=>{switch(S){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return Q()}};return R(A)-R(P)}(p.type,m.type)||this.ya(p.doc,m.doc)),this.Ca(r),s=s!=null&&s;const c=t&&!s?this.Fa():[],l=this.pa.size===0&&this.current&&!s?1:0,h=l!==this.ga;return this.ga=l,o.length!==0||h?{snapshot:new as(this.query,e.wa,i,o,e.mutatedKeys,l===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),Ma:c}:{Ma:c}}sa(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({wa:this.wa,Da:new Bf,mutatedKeys:this.mutatedKeys,ls:!1},!1)):{Ma:[]}}xa(e){return!this.fa.has(e)&&!!this.wa.has(e)&&!this.wa.get(e).hasLocalMutations}Ca(e){e&&(e.addedDocuments.forEach(t=>this.fa=this.fa.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.fa=this.fa.delete(t)),this.current=e.current)}Fa(){if(!this.current)return[];const e=this.pa;this.pa=oe(),this.wa.forEach(r=>{this.xa(r.key)&&(this.pa=this.pa.add(r.key))});const t=[];return e.forEach(r=>{this.pa.has(r)||t.push(new u_(r))}),this.pa.forEach(r=>{e.has(r)||t.push(new l_(r))}),t}Oa(e){this.fa=e.gs,this.pa=oe();const t=this.ba(e.documents);return this.applyChanges(t,!0)}Na(){return as.fromInitialDocuments(this.query,this.wa,this.mutatedKeys,this.ga===0,this.hasCachedResults)}}const ku="SyncEngine";class $A{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class qA{constructor(e){this.key=e,this.Ba=!1}}class jA{constructor(e,t,r,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.La={},this.ka=new Wt(c=>og(c),ja),this.qa=new Map,this.Qa=new Set,this.$a=new Ee(K.comparator),this.Ua=new Map,this.Ka=new mu,this.Wa={},this.Ga=new Map,this.za=ur.Kn(),this.onlineState="Unknown",this.ja=void 0}get isPrimaryClient(){return this.ja===!0}}async function zA(n,e,t=!0){const r=g_(n);let s;const i=r.ka.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Na()):s=await d_(r,e,t,!0),s}async function GA(n,e){const t=g_(n);await d_(t,e,!0,!1)}async function d_(n,e,t,r){const s=await dA(n.localStore,ft(e)),i=s.targetId,o=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await HA(n,e,i,o==="current",s.resumeToken)),n.isPrimaryClient&&t&&r_(n.remoteStore,s),c}async function HA(n,e,t,r,s){n.Ha=(m,b,A)=>async function(R,S,V,C){let k=S.view.ba(V);k.ls&&(k=await Vf(R.localStore,S.query,!1).then(({documents:E})=>S.view.ba(E,k)));const U=C&&C.targetChanges.get(S.targetId),x=C&&C.targetMismatches.get(S.targetId)!=null,M=S.view.applyChanges(k,R.isPrimaryClient,U,x);return zf(R,S.targetId,M.Ma),M.snapshot}(n,m,b,A);const i=await Vf(n.localStore,e,!0),o=new BA(e,i.gs),c=o.ba(i.documents),l=Ui.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),h=o.applyChanges(c,n.isPrimaryClient,l);zf(n,t,h.Ma);const p=new $A(e,t,o);return n.ka.set(e,p),n.qa.has(t)?n.qa.get(t).push(e):n.qa.set(t,[e]),h.snapshot}async function KA(n,e,t){const r=ne(n),s=r.ka.get(e),i=r.qa.get(s.targetId);if(i.length>1)return r.qa.set(s.targetId,i.filter(o=>!ja(o,e))),void r.ka.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await El(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&bu(r.remoteStore,s.targetId),Sl(r,s.targetId)}).catch(mr)):(Sl(r,s.targetId),await El(r.localStore,s.targetId,!0))}async function WA(n,e){const t=ne(n),r=t.ka.get(e),s=t.qa.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),bu(t.remoteStore,r.targetId))}async function QA(n,e,t){const r=__(n);try{const s=await function(o,c){const l=ne(o),h=Ae.now(),p=c.reduce((A,P)=>A.add(P.key),oe());let m,b;return l.persistence.runTransaction("Locally write mutations","readwrite",A=>{let P=ct(),R=oe();return l.ds.getEntries(A,p).next(S=>{P=S,P.forEach((V,C)=>{C.isValidDocument()||(R=R.add(V))})}).next(()=>l.localDocuments.getOverlayedDocuments(A,P)).next(S=>{m=S;const V=[];for(const C of c){const k=hT(C,m.get(C.key).overlayedDocument);k!=null&&V.push(new Qt(C.key,k,Xm(k.value.mapValue),Ze.exists(!0)))}return l.mutationQueue.addMutationBatch(A,h,V,c)}).next(S=>{b=S;const V=S.applyToLocalDocumentSet(m,R);return l.documentOverlayCache.saveOverlays(A,S.batchId,V)})}).then(()=>({batchId:b.batchId,changes:lg(m)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(o,c,l){let h=o.Wa[o.currentUser.toKey()];h||(h=new Ee(te)),h=h.insert(c,l),o.Wa[o.currentUser.toKey()]=h}(r,s.batchId,t),await qi(r,s.changes),await $i(r.remoteStore)}catch(s){const i=Au(s,"Failed to persist write");t.reject(i)}}async function h_(n,e){const t=ne(n);try{const r=await cA(t.localStore,e);e.targetChanges.forEach((s,i)=>{const o=t.Ua.get(i);o&&(Y(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.Ba=!0:s.modifiedDocuments.size>0?Y(o.Ba):s.removedDocuments.size>0&&(Y(o.Ba),o.Ba=!1))}),await qi(t,r,e)}catch(r){await mr(r)}}function jf(n,e,t){const r=ne(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.ka.forEach((i,o)=>{const c=o.view.sa(e);c.snapshot&&s.push(c.snapshot)}),function(o,c){const l=ne(o);l.onlineState=c;let h=!1;l.queries.forEach((p,m)=>{for(const b of m.ta)b.sa(c)&&(h=!0)}),h&&Cu(l)}(r.eventManager,e),s.length&&r.La.p_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function YA(n,e,t){const r=ne(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Ua.get(e),i=s&&s.key;if(i){let o=new Ee(K.comparator);o=o.insert(i,Ce.newNoDocument(i,J.min()));const c=oe().add(i),l=new Ha(J.min(),new Map,new Ee(te),o,c);await h_(r,l),r.$a=r.$a.remove(i),r.Ua.delete(e),xu(r)}else await El(r.localStore,e,!1).then(()=>Sl(r,e,t)).catch(mr)}async function JA(n,e){const t=ne(n),r=e.batch.batchId;try{const s=await aA(t.localStore,e);p_(t,r,null),f_(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await qi(t,s)}catch(s){await mr(s)}}async function XA(n,e,t){const r=ne(n);try{const s=await function(o,c){const l=ne(o);return l.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let p;return l.mutationQueue.lookupMutationBatch(h,c).next(m=>(Y(m!==null),p=m.keys(),l.mutationQueue.removeMutationBatch(h,m))).next(()=>l.mutationQueue.performConsistencyCheck(h)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(h,p,c)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,p)).next(()=>l.localDocuments.getDocuments(h,p))})}(r.localStore,e);p_(r,e,t),f_(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await qi(r,s)}catch(s){await mr(s)}}function f_(n,e){(n.Ga.get(e)||[]).forEach(t=>{t.resolve()}),n.Ga.delete(e)}function p_(n,e,t){const r=ne(n);let s=r.Wa[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Wa[r.currentUser.toKey()]=s}}function Sl(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.qa.get(e))n.ka.delete(r),t&&n.La.Ja(r,t);n.qa.delete(e),n.isPrimaryClient&&n.Ka.br(e).forEach(r=>{n.Ka.containsKey(r)||m_(n,r)})}function m_(n,e){n.Qa.delete(e.path.canonicalString());const t=n.$a.get(e);t!==null&&(bu(n.remoteStore,t),n.$a=n.$a.remove(e),n.Ua.delete(t),xu(n))}function zf(n,e,t){for(const r of t)r instanceof l_?(n.Ka.addReference(r.key,e),ZA(n,r)):r instanceof u_?(B(ku,"Document no longer in limbo: "+r.key),n.Ka.removeReference(r.key,e),n.Ka.containsKey(r.key)||m_(n,r.key)):Q()}function ZA(n,e){const t=e.key,r=t.path.canonicalString();n.$a.get(t)||n.Qa.has(r)||(B(ku,"New document in limbo: "+t),n.Qa.add(r),xu(n))}function xu(n){for(;n.Qa.size>0&&n.$a.size<n.maxConcurrentLimboResolutions;){const e=n.Qa.values().next().value;n.Qa.delete(e);const t=new K(me.fromString(e)),r=n.za.next();n.Ua.set(r,new qA(t)),n.$a=n.$a.insert(t,r),r_(n.remoteStore,new qt(ft(Mi(t.path)),r,"TargetPurposeLimboResolution",ht.ae))}}async function qi(n,e,t){const r=ne(n),s=[],i=[],o=[];r.ka.isEmpty()||(r.ka.forEach((c,l)=>{o.push(r.Ha(l,e,t).then(h=>{var p;if((h||t)&&r.isPrimaryClient){const m=h?!h.fromCache:(p=t?.targetChanges.get(l.targetId))===null||p===void 0?void 0:p.current;r.sharedClientState.updateQueryState(l.targetId,m?"current":"not-current")}if(h){s.push(h);const m=yu.Yi(l.targetId,h);i.push(m)}}))}),await Promise.all(o),r.La.p_(s),await async function(l,h){const p=ne(l);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>D.forEach(h,b=>D.forEach(b.Hi,A=>p.persistence.referenceDelegate.addReference(m,b.targetId,A)).next(()=>D.forEach(b.Ji,A=>p.persistence.referenceDelegate.removeReference(m,b.targetId,A)))))}catch(m){if(!Cn(m))throw m;B(vu,"Failed to update sequence numbers: "+m)}for(const m of h){const b=m.targetId;if(!m.fromCache){const A=p.Ts.get(b),P=A.snapshotVersion,R=A.withLastLimboFreeSnapshotVersion(P);p.Ts=p.Ts.insert(b,R)}}}(r.localStore,i))}async function e0(n,e){const t=ne(n);if(!t.currentUser.isEqual(e)){B(ku,"User change. New user:",e.toKey());const r=await Xg(t.localStore,e);t.currentUser=e,function(i,o){i.Ga.forEach(c=>{c.forEach(l=>{l.reject(new q(L.CANCELLED,o))})}),i.Ga.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await qi(t,r.Rs)}}function t0(n,e){const t=ne(n),r=t.Ua.get(e);if(r&&r.Ba)return oe().add(r.key);{let s=oe();const i=t.qa.get(e);if(!i)return s;for(const o of i){const c=t.ka.get(o);s=s.unionWith(c.view.Sa)}return s}}function g_(n){const e=ne(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=h_.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=t0.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=YA.bind(null,e),e.La.p_=FA.bind(null,e.eventManager),e.La.Ja=UA.bind(null,e.eventManager),e}function __(n){const e=ne(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=JA.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=XA.bind(null,e),e}class Ai{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Ya(e.databaseInfo.databaseId),this.sharedClientState=this.Za(e),this.persistence=this.Xa(e),await this.persistence.start(),this.localStore=this.eu(e),this.gcScheduler=this.tu(e,this.localStore),this.indexBackfillerScheduler=this.nu(e,this.localStore)}tu(e,t){return null}nu(e,t){return null}eu(e){return Jg(this.persistence,new Yg,e.initialUser,this.serializer)}Xa(e){return new gu(Qa.ri,this.serializer)}Za(e){return new e_}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ai.provider={build:()=>new Ai};class n0 extends Ai{constructor(e){super(),this.cacheSizeBytes=e}tu(e,t){Y(this.persistence.referenceDelegate instanceof pa);const r=this.persistence.referenceDelegate.garbageCollector;return new Gg(r,e.asyncQueue,t)}Xa(e){const t=this.cacheSizeBytes!==void 0?ze.withCacheSize(this.cacheSizeBytes):ze.DEFAULT;return new gu(r=>pa.ri(r,t),this.serializer)}}class r0 extends Ai{constructor(e,t,r){super(),this.ru=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.ru.initialize(this,e),await __(this.ru.syncEngine),await $i(this.ru.remoteStore),await this.persistence.Ci(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}eu(e){return Jg(this.persistence,new Yg,e.initialUser,this.serializer)}tu(e,t){const r=this.persistence.referenceDelegate.garbageCollector;return new Gg(r,e.asyncQueue,t)}nu(e,t){const r=new hE(t,this.persistence);return new dE(e.asyncQueue,r)}Xa(e){const t=rA(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?ze.withCacheSize(this.cacheSizeBytes):ze.DEFAULT;return new _u(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,yA(),$o(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Za(e){return new e_}}class ga{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>jf(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=e0.bind(null,this.syncEngine),await OA(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new MA}()}createDatastore(e){const t=Ya(e.databaseInfo.databaseId),r=function(i){return new _A(i)}(e.databaseInfo);return function(i,o,c,l){return new wA(i,o,c,l)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,o,c){return new TA(r,s,i,o,c)}(this.localStore,this.datastore,e.asyncQueue,t=>jf(this.syncEngine,t,0),function(){return Mf.D()?new Mf:new fA}())}createSyncEngine(e,t){return function(s,i,o,c,l,h,p){const m=new jA(s,i,o,c,l,h);return p&&(m.ja=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=ne(s);B(dr,"RemoteStore shutting down."),i.W_.add(5),await Bi(i),i.z_.shutdown(),i.j_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}ga.provider={build:()=>new ga};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Du{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.iu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.iu(this.observer.error,e):Xe("Uncaught Error in snapshot listener:",e.toString()))}su(){this.muted=!0}iu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tn="FirestoreClient";class s0{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=Je.UNAUTHENTICATED,this.clientId=Cm.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async o=>{B(Tn,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(B(Tn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Pt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Au(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Bc(n,e){n.asyncQueue.verifyOperationInProgress(),B(Tn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await Xg(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Gf(n,e){n.asyncQueue.verifyOperationInProgress();const t=await i0(n);B(Tn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>Uf(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>Uf(e.remoteStore,s)),n._onlineComponents=e}async function i0(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){B(Tn,"Using user provided OfflineComponentProvider");try{await Bc(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===L.FAILED_PRECONDITION||s.code===L.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;fi("Error using user provided cache. Falling back to memory cache: "+t),await Bc(n,new Ai)}}else B(Tn,"Using default OfflineComponentProvider"),await Bc(n,new n0(void 0));return n._offlineComponents}async function y_(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(B(Tn,"Using user provided OnlineComponentProvider"),await Gf(n,n._uninitializedComponentsProvider._online)):(B(Tn,"Using default OnlineComponentProvider"),await Gf(n,new ga))),n._onlineComponents}function o0(n){return y_(n).then(e=>e.syncEngine)}async function _a(n){const e=await y_(n),t=e.eventManager;return t.onListen=zA.bind(null,e.syncEngine),t.onUnlisten=KA.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=GA.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=WA.bind(null,e.syncEngine),t}function a0(n,e,t={}){const r=new Pt;return n.asyncQueue.enqueueAndForget(async()=>function(i,o,c,l,h){const p=new Du({next:b=>{p.su(),o.enqueueAndForget(()=>Ru(i,m));const A=b.docs.has(c);!A&&b.fromCache?h.reject(new q(L.UNAVAILABLE,"Failed to get document because the client is offline.")):A&&b.fromCache&&l&&l.source==="server"?h.reject(new q(L.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(b)},error:b=>h.reject(b)}),m=new Pu(Mi(c.path),p,{includeMetadataChanges:!0,Ta:!0});return Su(i,m)}(await _a(n),n.asyncQueue,e,t,r)),r.promise}function c0(n,e,t={}){const r=new Pt;return n.asyncQueue.enqueueAndForget(async()=>function(i,o,c,l,h){const p=new Du({next:b=>{p.su(),o.enqueueAndForget(()=>Ru(i,m)),b.fromCache&&l.source==="server"?h.reject(new q(L.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(b)},error:b=>h.reject(b)}),m=new Pu(c,p,{includeMetadataChanges:!0,Ta:!0});return Su(i,m)}(await _a(n),n.asyncQueue,e,t,r)),r.promise}/**
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
 */function v_(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hf=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b_(n,e,t){if(!t)throw new q(L.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function l0(n,e,t,r){if(e===!0&&r===!0)throw new q(L.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Kf(n){if(!K.isDocumentKey(n))throw new q(L.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Wf(n){if(K.isDocumentKey(n))throw new q(L.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Xa(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":Q()}function pt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new q(L.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Xa(n);throw new q(L.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function u0(n,e){if(e<=0)throw new q(L.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const d0="firestore.googleapis.com",Qf=!0;class Yf{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new q(L.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=d0,this.ssl=Qf}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:Qf;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Bg;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<zg)throw new q(L.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}l0("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=v_((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new q(L.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new q(L.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new q(L.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Nu{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Yf({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new q(L.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new q(L.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Yf(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new tE;switch(r.type){case"firstParty":return new sE(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new q(L.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Hf.get(t);r&&(B("ComponentProvider","Removing Datastore"),Hf.delete(t),r.terminate())}(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vt{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Vt(this.firestore,e,this._query)}}class Ke{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new yn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ke(this.firestore,e,this._key)}}class yn extends Vt{constructor(e,t,r){super(e,t,Mi(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ke(this.firestore,null,new K(e))}withConverter(e){return new yn(this.firestore,e,this._path)}}function Pe(n,e,...t){if(n=Ie(n),b_("collection","path",e),n instanceof Nu){const r=me.fromString(e,...t);return Wf(r),new yn(n,null,r)}{if(!(n instanceof Ke||n instanceof yn))throw new q(L.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(me.fromString(e,...t));return Wf(r),new yn(n.firestore,null,r)}}function De(n,e,...t){if(n=Ie(n),arguments.length===1&&(e=Cm.newId()),b_("doc","path",e),n instanceof Nu){const r=me.fromString(e,...t);return Kf(r),new Ke(n,null,new K(r))}{if(!(n instanceof Ke||n instanceof yn))throw new q(L.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(me.fromString(e,...t));return Kf(r),new Ke(n.firestore,n instanceof yn?n.converter:null,new K(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jf="AsyncQueue";class Xf{constructor(e=Promise.resolve()){this.Vu=[],this.mu=!1,this.fu=[],this.gu=null,this.pu=!1,this.yu=!1,this.wu=[],this.a_=new t_(this,"async_queue_retry"),this.Su=()=>{const r=$o();r&&B(Jf,"Visibility state changed to "+r.visibilityState),this.a_.t_()},this.bu=e;const t=$o();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Su)}get isShuttingDown(){return this.mu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Du(),this.vu(e)}enterRestrictedMode(e){if(!this.mu){this.mu=!0,this.yu=e||!1;const t=$o();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Su)}}enqueue(e){if(this.Du(),this.mu)return new Promise(()=>{});const t=new Pt;return this.vu(()=>this.mu&&this.yu?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Vu.push(e),this.Cu()))}async Cu(){if(this.Vu.length!==0){try{await this.Vu[0](),this.Vu.shift(),this.a_.reset()}catch(e){if(!Cn(e))throw e;B(Jf,"Operation failed with retryable error: "+e)}this.Vu.length>0&&this.a_.Xo(()=>this.Cu())}}vu(e){const t=this.bu.then(()=>(this.pu=!0,e().catch(r=>{this.gu=r,this.pu=!1;const s=function(o){let c=o.message||"";return o.stack&&(c=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),c}(r);throw Xe("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.pu=!1,r))));return this.bu=t,t}enqueueAfterDelay(e,t,r){this.Du(),this.wu.indexOf(e)>-1&&(t=0);const s=Tu.createAndSchedule(this,e,t,r,i=>this.Fu(i));return this.fu.push(s),s}Du(){this.gu&&Q()}verifyOperationInProgress(){}async Mu(){let e;do e=this.bu,await e;while(e!==this.bu)}xu(e){for(const t of this.fu)if(t.timerId===e)return!0;return!1}Ou(e){return this.Mu().then(()=>{this.fu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.fu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Mu()})}Nu(e){this.wu.push(e)}Fu(e){const t=this.fu.indexOf(e);this.fu.splice(t,1)}}function Zf(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(n,["next","error","complete"])}class An extends Nu{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Xf,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Xf(e),this._firestoreClient=void 0,await e}}}function h0(n,e,t){t||(t=ia);const r=ps(n,"firestore");if(r.isInitialized(t)){const s=r.getImmediate({identifier:t}),i=r.getOptions(t);if(li(i,e))return s;throw new q(L.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new q(L.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<zg)throw new q(L.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return r.initialize({options:e,instanceIdentifier:t})}function Za(n){if(n._terminated)throw new q(L.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||f0(n),n._firestoreClient}function f0(n){var e,t,r;const s=n._freezeSettings(),i=function(c,l,h,p){return new $E(c,l,h,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,v_(p.experimentalLongPollingOptions),p.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((t=s.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new s0(n._authCredentials,n._appCheckCredentials,n._queue,i,n._componentsProvider&&function(c){const l=c?._online.build();return{_offline:c?._offline.build(l),_online:l}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cs{constructor(e){this._byteString=e}static fromBase64String(e){try{return new cs(xe.fromBase64String(e))}catch(t){throw new q(L.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new cs(xe.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ec{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new q(L.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Te(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Vu{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new q(L.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new q(L.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return te(this._lat,e._lat)||te(this._long,e._long)}}/**
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
 */class Ou{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p0=/^__.*__$/;class m0{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Qt(e,this.data,this.fieldMask,t,this.fieldTransforms):new vs(e,this.data,t,this.fieldTransforms)}}class I_{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Qt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function w_(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Q()}}class Lu{constructor(e,t,r,s,i,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Bu(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Lu(){return this.settings.Lu}ku(e){return new Lu(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}qu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.ku({path:r,Qu:!1});return s.$u(e),s}Uu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.ku({path:r,Qu:!1});return s.Bu(),s}Ku(e){return this.ku({path:void 0,Qu:!0})}Wu(e){return ya(e,this.settings.methodName,this.settings.Gu||!1,this.path,this.settings.zu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Bu(){if(this.path)for(let e=0;e<this.path.length;e++)this.$u(this.path.get(e))}$u(e){if(e.length===0)throw this.Wu("Document fields must not be empty");if(w_(this.Lu)&&p0.test(e))throw this.Wu('Document fields cannot begin and end with "__"')}}class g0{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Ya(e)}ju(e,t,r,s=!1){return new Lu({Lu:e,methodName:t,zu:r,path:Te.emptyPath(),Qu:!1,Gu:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function ji(n){const e=n._freezeSettings(),t=Ya(n._databaseId);return new g0(n._databaseId,!!e.ignoreUndefinedProperties,t)}function E_(n,e,t,r,s,i={}){const o=n.ju(i.merge||i.mergeFields?2:0,e,t,s);Fu("Data must be an object, but it was:",o,r);const c=A_(r,o);let l,h;if(i.merge)l=new rt(o.fieldMask),h=o.fieldTransforms;else if(i.mergeFields){const p=[];for(const m of i.mergeFields){const b=Rl(e,m,t);if(!o.contains(b))throw new q(L.INVALID_ARGUMENT,`Field '${b}' is specified in your field mask but missing from your input data.`);R_(p,b)||p.push(b)}l=new rt(p),h=o.fieldTransforms.filter(m=>l.covers(m.field))}else l=null,h=o.fieldTransforms;return new m0(new Ge(c),l,h)}class zi extends tc{_toFieldTransform(e){if(e.Lu!==2)throw e.Lu===1?e.Wu(`${this._methodName}() can only appear at the top level of your update data`):e.Wu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof zi}}class Mu extends tc{constructor(e,t){super(e),this.Ju=t}_toFieldTransform(e){const t=new is(e.serializer,hg(e.serializer,this.Ju));return new _g(e.path,t)}isEqual(e){return e instanceof Mu&&this.Ju===e.Ju}}function _0(n,e,t,r){const s=n.ju(1,e,t);Fu("Data must be an object, but it was:",s,r);const i=[],o=Ge.empty();Pn(r,(l,h)=>{const p=Uu(e,l,t);h=Ie(h);const m=s.Uu(p);if(h instanceof zi)i.push(p);else{const b=Gi(h,m);b!=null&&(i.push(p),o.set(p,b))}});const c=new rt(i);return new I_(o,c,s.fieldTransforms)}function y0(n,e,t,r,s,i){const o=n.ju(1,e,t),c=[Rl(e,r,t)],l=[s];if(i.length%2!=0)throw new q(L.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let b=0;b<i.length;b+=2)c.push(Rl(e,i[b])),l.push(i[b+1]);const h=[],p=Ge.empty();for(let b=c.length-1;b>=0;--b)if(!R_(h,c[b])){const A=c[b];let P=l[b];P=Ie(P);const R=o.Uu(A);if(P instanceof zi)h.push(A);else{const S=Gi(P,R);S!=null&&(h.push(A),p.set(A,S))}}const m=new rt(h);return new I_(p,m,o.fieldTransforms)}function T_(n,e,t,r=!1){return Gi(t,n.ju(r?4:3,e))}function Gi(n,e){if(S_(n=Ie(n)))return Fu("Unsupported field value:",e,n),A_(n,e);if(n instanceof tc)return function(r,s){if(!w_(s.Lu))throw s.Wu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Wu(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.Qu&&e.Lu!==4)throw e.Wu("Nested arrays are not supported");return function(r,s){const i=[];let o=0;for(const c of r){let l=Gi(c,s.Ku(o));l==null&&(l={nullValue:"NULL_VALUE"}),i.push(l),o++}return{arrayValue:{values:i}}}(n,e)}return function(r,s){if((r=Ie(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return hg(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=Ae.fromDate(r);return{timestampValue:os(s.serializer,i)}}if(r instanceof Ae){const i=new Ae(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:os(s.serializer,i)}}if(r instanceof Vu)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof cs)return{bytesValue:Tg(s.serializer,r._byteString)};if(r instanceof Ke){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.Wu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:hu(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Ou)return function(o,c){return{mapValue:{fields:{[nu]:{stringValue:ru},[es]:{arrayValue:{values:o.toArray().map(h=>{if(typeof h!="number")throw c.Wu("VectorValues must only contain numeric values.");return ou(c.serializer,h)})}}}}}}(r,s);throw s.Wu(`Unsupported field value: ${Xa(r)}`)}(n,e)}function A_(n,e){const t={};return jm(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Pn(n,(r,s)=>{const i=Gi(s,e.qu(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function S_(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Ae||n instanceof Vu||n instanceof cs||n instanceof Ke||n instanceof tc||n instanceof Ou)}function Fu(n,e,t){if(!S_(t)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(t)){const r=Xa(t);throw r==="an object"?e.Wu(n+" a custom object"):e.Wu(n+" "+r)}}function Rl(n,e,t){if((e=Ie(e))instanceof ec)return e._internalPath;if(typeof e=="string")return Uu(n,e);throw ya("Field path arguments must be of type string or ",n,!1,void 0,t)}const v0=new RegExp("[~\\*/\\[\\]]");function Uu(n,e,t){if(e.search(v0)>=0)throw ya(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new ec(...e.split("."))._internalPath}catch{throw ya(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function ya(n,e,t,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(i||o)&&(l+=" (found",i&&(l+=` in field ${r}`),o&&(l+=` in document ${s}`),l+=")"),new q(L.INVALID_ARGUMENT,c+n+l)}function R_(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bu{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Ke(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new b0(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(nc("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class b0 extends Bu{data(){return super.data()}}function nc(n,e){return typeof e=="string"?Uu(n,e):e instanceof ec?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function C_(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new q(L.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class $u{}class rc extends $u{}function mt(n,e,...t){let r=[];e instanceof $u&&r.push(e),r=r.concat(t),function(i){const o=i.filter(l=>l instanceof qu).length,c=i.filter(l=>l instanceof sc).length;if(o>1||o>0&&c>0)throw new q(L.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class sc extends rc{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new sc(e,t,r)}_apply(e){const t=this._parse(e);return P_(e._query,t),new Vt(e.firestore,e.converter,ml(e._query,t))}_parse(e){const t=ji(e.firestore);return function(i,o,c,l,h,p,m){let b;if(h.isKeyField()){if(p==="array-contains"||p==="array-contains-any")throw new q(L.INVALID_ARGUMENT,`Invalid Query. You can't perform '${p}' queries on documentId().`);if(p==="in"||p==="not-in"){tp(m,p);const P=[];for(const R of m)P.push(ep(l,i,R));b={arrayValue:{values:P}}}else b=ep(l,i,m)}else p!=="in"&&p!=="not-in"&&p!=="array-contains-any"||tp(m,p),b=T_(c,o,m,p==="in"||p==="not-in");return le.create(h,p,b)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function ls(n,e,t){const r=e,s=nc("where",n);return sc._create(s,r,t)}class qu extends $u{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new qu(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:_e.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let o=s;const c=i.getFlattenedFilters();for(const l of c)P_(o,l),o=ml(o,l)}(e._query,t),new Vt(e.firestore,e.converter,ml(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class ju extends rc{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new ju(e,t)}_apply(e){const t=function(s,i,o){if(s.startAt!==null)throw new q(L.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new q(L.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Ei(i,o)}(e._query,this._field,this._direction);return new Vt(e.firestore,e.converter,function(s,i){const o=s.explicitOrderBy.concat([i]);return new gr(s.path,s.collectionGroup,o,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,t))}}function Dt(n,e="asc"){const t=e,r=nc("orderBy",n);return ju._create(r,t)}class zu extends rc{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new zu(e,t,r)}_apply(e){return new Vt(e.firestore,e.converter,ca(e._query,this._limit,this._limitType))}}function wt(n){return u0("limit",n),zu._create("limit",n,"F")}class Gu extends rc{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new Gu(e,t,r)}_apply(e){const t=w0(e,this.type,this._docOrFields,this._inclusive);return new Vt(e.firestore,e.converter,function(s,i){return new gr(s.path,s.collectionGroup,s.explicitOrderBy.slice(),s.filters.slice(),s.limit,s.limitType,i,s.endAt)}(e._query,t))}}function I0(...n){return Gu._create("startAfter",n,!1)}function w0(n,e,t,r){if(t[0]=Ie(t[0]),t[0]instanceof Bu)return function(i,o,c,l,h){if(!l)throw new q(L.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${c}().`);const p=[];for(const m of jr(i))if(m.field.isKeyField())p.push(or(o,l.key));else{const b=l.data.field(m.field);if(Ba(b))throw new q(L.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+m.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(b===null){const A=m.field.canonicalString();throw new q(L.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${A}' (used as the orderBy) does not exist.`)}p.push(b)}return new wn(p,h)}(n._query,n.firestore._databaseId,e,t[0]._document,r);{const s=ji(n.firestore);return function(o,c,l,h,p,m){const b=o.explicitOrderBy;if(p.length>b.length)throw new q(L.INVALID_ARGUMENT,`Too many arguments provided to ${h}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const A=[];for(let P=0;P<p.length;P++){const R=p[P];if(b[P].field.isKeyField()){if(typeof R!="string")throw new q(L.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${h}(), but got a ${typeof R}`);if(!iu(o)&&R.indexOf("/")!==-1)throw new q(L.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${h}() must be a plain document ID, but '${R}' contains a slash.`);const S=o.path.child(me.fromString(R));if(!K.isDocumentKey(S))throw new q(L.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${h}() must result in a valid document path, but '${S}' is not because it contains an odd number of segments.`);const V=new K(S);A.push(or(c,V))}else{const S=T_(l,h,R);A.push(S)}}return new wn(A,m)}(n._query,n.firestore._databaseId,s,e,t,r)}}function ep(n,e,t){if(typeof(t=Ie(t))=="string"){if(t==="")throw new q(L.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!iu(e)&&t.indexOf("/")!==-1)throw new q(L.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(me.fromString(t));if(!K.isDocumentKey(r))throw new q(L.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return or(n,new K(r))}if(t instanceof Ke)return or(n,t._key);throw new q(L.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Xa(t)}.`)}function tp(n,e){if(!Array.isArray(n)||n.length===0)throw new q(L.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function P_(n,e){const t=function(s,i){for(const o of s)for(const c of o.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new q(L.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new q(L.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class E0{convertValue(e,t="none"){switch(bn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return we(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Kt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw Q()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Pn(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){var t,r,s;const i=(s=(r=(t=e.fields)===null||t===void 0?void 0:t[es].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(o=>we(o.doubleValue));return new Ou(i)}convertGeoPoint(e){return new Vu(we(e.latitude),we(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=$a(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(bi(e));default:return null}}convertTimestamp(e){const t=Ht(e);return new Ae(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=me.fromString(e);Y(Vg(r));const s=new ir(r.get(1),r.get(3)),i=new K(r.popFirst(5));return s.isEqual(t)||Xe(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k_(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Js{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class x_ extends Bu{constructor(e,t,r,s,i,o){super(e,t,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new qo(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(nc("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class qo extends x_{data(e={}){return super.data(e)}}class D_{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Js(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new qo(this._firestore,this._userDataWriter,r.key,r,new Js(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new q(L.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(c=>{const l=new qo(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Js(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(c=>i||c.type!==3).map(c=>{const l=new qo(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Js(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,p=-1;return c.type!==0&&(h=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),p=o.indexOf(c.doc.key)),{type:T0(c.type),doc:l,oldIndex:h,newIndex:p}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function T0(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Q()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yr(n){n=pt(n,Ke);const e=pt(n.firestore,An);return a0(Za(e),n._key).then(t=>V_(e,n,t))}class Hu extends E0{constructor(e){super(),this.firestore=e}convertBytes(e){return new cs(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ke(this.firestore,null,t)}}function Sn(n){n=pt(n,Vt);const e=pt(n.firestore,An),t=Za(e),r=new Hu(e);return C_(n._query),c0(t,n._query).then(s=>new D_(e,r,n,s))}function N_(n,e,t){n=pt(n,Ke);const r=pt(n.firestore,An),s=k_(n.converter,e,t);return Ku(r,[E_(ji(r),"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,Ze.none())])}function Ot(n,e,t,...r){n=pt(n,Ke);const s=pt(n.firestore,An),i=ji(s);let o;return o=typeof(e=Ie(e))=="string"||e instanceof ec?y0(i,"updateDoc",n._key,e,t,r):_0(i,"updateDoc",n._key,e),Ku(s,[o.toMutation(n._key,Ze.exists(!0))])}function kn(n,e){const t=pt(n.firestore,An),r=De(n),s=k_(n.converter,e);return Ku(t,[E_(ji(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,Ze.exists(!1))]).then(()=>r)}function vr(n,...e){var t,r,s;n=Ie(n);let i={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||Zf(e[o])||(i=e[o],o++);const c={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(Zf(e[o])){const m=e[o];e[o]=(t=m.next)===null||t===void 0?void 0:t.bind(m),e[o+1]=(r=m.error)===null||r===void 0?void 0:r.bind(m),e[o+2]=(s=m.complete)===null||s===void 0?void 0:s.bind(m)}let l,h,p;if(n instanceof Ke)h=pt(n.firestore,An),p=Mi(n._key.path),l={next:m=>{e[o]&&e[o](V_(h,n,m))},error:e[o+1],complete:e[o+2]};else{const m=pt(n,Vt);h=pt(m.firestore,An),p=m._query;const b=new Hu(h);l={next:A=>{e[o]&&e[o](new D_(h,b,m,A))},error:e[o+1],complete:e[o+2]},C_(n._query)}return function(b,A,P,R){const S=new Du(R),V=new Pu(A,S,P);return b.asyncQueue.enqueueAndForget(async()=>Su(await _a(b),V)),()=>{S.su(),b.asyncQueue.enqueueAndForget(async()=>Ru(await _a(b),V))}}(Za(h),p,c,l)}function Ku(n,e){return function(r,s){const i=new Pt;return r.asyncQueue.enqueueAndForget(async()=>QA(await o0(r),s,i)),i.promise}(Za(n),e)}function V_(n,e,t){const r=t.docs.get(e._key),s=new Hu(n);return new x_(n,s,e._key,r,new Js(t.hasPendingWrites,t.fromCache),e.converter)}class A0{constructor(e){let t;this.kind="persistent",e?.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=O_(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}function S0(n){return new A0(n)}class R0{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=ga.provider,this._offlineComponentProvider={build:t=>new r0(t,e?.cacheSizeBytes,this.forceOwnership)}}}function O_(n){return new R0(n?.forceOwnership)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function np(){return new zi("deleteField")}function xn(n){return new Mu("increment",n)}(function(e,t=!0){(function(s){ys=s})(ms),zt(new kt("firestore",(r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),c=new An(new nE(r.getProvider("auth-internal")),new iE(o,r.getProvider("app-check-internal")),function(h,p){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new q(L.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ir(h.options.projectId,p)}(o,s),o);return i=Object.assign({useFetchStreams:t},i),c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),vt(Oh,Lh,e),vt(Oh,Lh,"esm2017")})();var C0="firebase",P0="11.3.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */vt(C0,P0,"app");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cl=new Map,L_={activated:!1,tokenObservers:[]},k0={initialized:!1,enabled:!1};function Ve(n){return Cl.get(n)||Object.assign({},L_)}function x0(n,e){return Cl.set(n,e),Cl.get(n)}function ic(){return k0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M_="https://content-firebaseappcheck.googleapis.com/v1",D0="exchangeRecaptchaV3Token",N0="exchangeDebugToken",rp={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:16*60*1e3},V0=24*60*60*1e3;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O0{constructor(e,t,r,s,i){if(this.operation=e,this.retryPolicy=t,this.getWaitDuration=r,this.lowerBound=s,this.upperBound=i,this.pending=null,this.nextErrorWaitInterval=s,s>i)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new ci,this.pending.promise.catch(t=>{}),await L0(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new ci,this.pending.promise.catch(t=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(t){this.retryPolicy(t)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const t=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),t}}}function L0(n){return new Promise(e=>{setTimeout(e,n)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M0={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.",throttled:"Requests throttled due to {$httpStatus} error. Attempts allowed again after {$time}"},st=new fs("appCheck","AppCheck",M0);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sp(n=!1){var e;return n?(e=self.grecaptcha)===null||e===void 0?void 0:e.enterprise:self.grecaptcha}function Wu(n){if(!Ve(n).activated)throw st.create("use-before-activation",{appName:n.name})}function F_(n){const e=Math.round(n/1e3),t=Math.floor(e/(3600*24)),r=Math.floor((e-t*3600*24)/3600),s=Math.floor((e-t*3600*24-r*3600)/60),i=e-t*3600*24-r*3600-s*60;let o="";return t&&(o+=vo(t)+"d:"),r&&(o+=vo(r)+"h:"),o+=vo(s)+"m:"+vo(i)+"s",o}function vo(n){return n===0?"00":n>=10?n.toString():"0"+n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qu({url:n,body:e},t){const r={"Content-Type":"application/json"},s=t.getImmediate({optional:!0});if(s){const m=await s.getHeartbeatsHeader();m&&(r["X-Firebase-Client"]=m)}const i={method:"POST",body:JSON.stringify(e),headers:r};let o;try{o=await fetch(n,i)}catch(m){throw st.create("fetch-network-error",{originalErrorMessage:m?.message})}if(o.status!==200)throw st.create("fetch-status-error",{httpStatus:o.status});let c;try{c=await o.json()}catch(m){throw st.create("fetch-parse-error",{originalErrorMessage:m?.message})}const l=c.ttl.match(/^([\d.]+)(s)$/);if(!l||!l[2]||isNaN(Number(l[1])))throw st.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${c.ttl}`});const h=Number(l[1])*1e3,p=Date.now();return{token:c.token,expireTimeMillis:p+h,issuedAtTimeMillis:p}}function F0(n,e){const{projectId:t,appId:r,apiKey:s}=n.options;return{url:`${M_}/projects/${t}/apps/${r}:${D0}?key=${s}`,body:{recaptcha_v3_token:e}}}function U_(n,e){const{projectId:t,appId:r,apiKey:s}=n.options;return{url:`${M_}/projects/${t}/apps/${r}:${N0}?key=${s}`,body:{debug_token:e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const U0="firebase-app-check-database",B0=1,Si="firebase-app-check-store",B_="debug-token";let bo=null;function $_(){return bo||(bo=new Promise((n,e)=>{try{const t=indexedDB.open(U0,B0);t.onsuccess=r=>{n(r.target.result)},t.onerror=r=>{var s;e(st.create("storage-open",{originalErrorMessage:(s=r.target.error)===null||s===void 0?void 0:s.message}))},t.onupgradeneeded=r=>{const s=r.target.result;switch(r.oldVersion){case 0:s.createObjectStore(Si,{keyPath:"compositeKey"})}}}catch(t){e(st.create("storage-open",{originalErrorMessage:t?.message}))}}),bo)}function $0(n){return j_(z_(n))}function q0(n,e){return q_(z_(n),e)}function j0(n){return q_(B_,n)}function z0(){return j_(B_)}async function q_(n,e){const r=(await $_()).transaction(Si,"readwrite"),i=r.objectStore(Si).put({compositeKey:n,value:e});return new Promise((o,c)=>{i.onsuccess=l=>{o()},r.onerror=l=>{var h;c(st.create("storage-set",{originalErrorMessage:(h=l.target.error)===null||h===void 0?void 0:h.message}))}})}async function j_(n){const t=(await $_()).transaction(Si,"readonly"),s=t.objectStore(Si).get(n);return new Promise((i,o)=>{s.onsuccess=c=>{const l=c.target.result;i(l?l.value:void 0)},t.onerror=c=>{var l;o(st.create("storage-get",{originalErrorMessage:(l=c.target.error)===null||l===void 0?void 0:l.message}))}})}function z_(n){return`${n.options.appId}-${n.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ri=new ka("@firebase/app-check");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function G0(n){if(Pa()){let e;try{e=await $0(n)}catch(t){Ri.warn(`Failed to read token from IndexedDB. Error: ${t}`)}return e}}function $c(n,e){return Pa()?q0(n,e).catch(t=>{Ri.warn(`Failed to write token to IndexedDB. Error: ${t}`)}):Promise.resolve()}async function H0(){let n;try{n=await z0()}catch{}if(n)return n;{const e=crypto.randomUUID();return j0(e).catch(t=>Ri.warn(`Failed to persist debug token to IndexedDB. Error: ${t}`)),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yu(){return ic().enabled}async function Ju(){const n=ic();if(n.enabled&&n.token)return n.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function K0(){const n=xp(),e=ic();if(e.initialized=!0,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&n.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const t=new ci;e.token=t,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?t.resolve(n.FIREBASE_APPCHECK_DEBUG_TOKEN):t.resolve(H0())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const W0={error:"UNKNOWN_ERROR"};function Q0(n){return Ml.encodeString(JSON.stringify(n),!1)}async function Pl(n,e=!1){const t=n.app;Wu(t);const r=Ve(t);let s=r.token,i;if(s&&!Ur(s)&&(r.token=void 0,s=void 0),!s){const l=await r.cachedTokenPromise;l&&(Ur(l)?s=l:await $c(t,void 0))}if(!e&&s&&Ur(s))return{token:s.token};let o=!1;if(Yu()){r.exchangeTokenPromise||(r.exchangeTokenPromise=Qu(U_(t,await Ju()),n.heartbeatServiceProvider).finally(()=>{r.exchangeTokenPromise=void 0}),o=!0);const l=await r.exchangeTokenPromise;return await $c(t,l),r.token=l,{token:l.token}}try{r.exchangeTokenPromise||(r.exchangeTokenPromise=r.provider.getToken().finally(()=>{r.exchangeTokenPromise=void 0}),o=!0),s=await Ve(t).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"?Ri.warn(l.message):Ri.error(l),i=l}let c;return s?i?Ur(s)?c={token:s.token,internalError:i}:c=op(i):(c={token:s.token},r.token=s,await $c(t,s)):c=op(i),o&&K_(t,c),c}async function Y0(n){const e=n.app;Wu(e);const{provider:t}=Ve(e);if(Yu()){const r=await Ju(),{token:s}=await Qu(U_(e,r),n.heartbeatServiceProvider);return{token:s}}else{const{token:r}=await t.getToken();return{token:r}}}function G_(n,e,t,r){const{app:s}=n,i=Ve(s),o={next:t,error:r,type:e};if(i.tokenObservers=[...i.tokenObservers,o],i.token&&Ur(i.token)){const c=i.token;Promise.resolve().then(()=>{t({token:c.token}),ip(n)}).catch(()=>{})}i.cachedTokenPromise.then(()=>ip(n))}function H_(n,e){const t=Ve(n),r=t.tokenObservers.filter(s=>s.next!==e);r.length===0&&t.tokenRefresher&&t.tokenRefresher.isRunning()&&t.tokenRefresher.stop(),t.tokenObservers=r}function ip(n){const{app:e}=n,t=Ve(e);let r=t.tokenRefresher;r||(r=J0(n),t.tokenRefresher=r),!r.isRunning()&&t.isTokenAutoRefreshEnabled&&r.start()}function J0(n){const{app:e}=n;return new O0(async()=>{const t=Ve(e);let r;if(t.token?r=await Pl(n,!0):r=await Pl(n),r.error)throw r.error;if(r.internalError)throw r.internalError},()=>!0,()=>{const t=Ve(e);if(t.token){let r=t.token.issuedAtTimeMillis+(t.token.expireTimeMillis-t.token.issuedAtTimeMillis)*.5+3e5;const s=t.token.expireTimeMillis-5*60*1e3;return r=Math.min(r,s),Math.max(0,r-Date.now())}else return 0},rp.RETRIAL_MIN_WAIT,rp.RETRIAL_MAX_WAIT)}function K_(n,e){const t=Ve(n).tokenObservers;for(const r of t)try{r.type==="EXTERNAL"&&e.error!=null?r.error(e.error):r.next(e)}catch{}}function Ur(n){return n.expireTimeMillis-Date.now()>0}function op(n){return{token:Q0(W0),error:n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X0{constructor(e,t){this.app=e,this.heartbeatServiceProvider=t}_delete(){const{tokenObservers:e}=Ve(this.app);for(const t of e)H_(this.app,t.next);return Promise.resolve()}}function Z0(n,e){return new X0(n,e)}function eS(n){return{getToken:e=>Pl(n,e),getLimitedUseToken:()=>Y0(n),addTokenListener:e=>G_(n,"INTERNAL",e),removeTokenListener:e=>H_(n.app,e)}}const tS="@firebase/app-check",nS="0.8.11";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rS="https://www.google.com/recaptcha/api.js";function sS(n,e){const t=new ci,r=Ve(n);r.reCAPTCHAState={initialized:t};const s=iS(n),i=sp(!1);return i?ap(n,e,i,s,t):cS(()=>{const o=sp(!1);if(!o)throw new Error("no recaptcha");ap(n,e,o,s,t)}),t.promise}function ap(n,e,t,r,s){t.ready(()=>{aS(n,e,t,r),s.resolve(t)})}function iS(n){const e=`fire_app_check_${n.name}`,t=document.createElement("div");return t.id=e,t.style.display="none",document.body.appendChild(t),e}async function oS(n){Wu(n);const t=await Ve(n).reCAPTCHAState.initialized.promise;return new Promise((r,s)=>{const i=Ve(n).reCAPTCHAState;t.ready(()=>{r(t.execute(i.widgetId,{action:"fire_app_check"}))})})}function aS(n,e,t,r){const s=t.render(r,{sitekey:e,size:"invisible",callback:()=>{Ve(n).reCAPTCHAState.succeeded=!0},"error-callback":()=>{Ve(n).reCAPTCHAState.succeeded=!1}}),i=Ve(n);i.reCAPTCHAState=Object.assign(Object.assign({},i.reCAPTCHAState),{widgetId:s})}function cS(n){const e=document.createElement("script");e.src=rS,e.onload=n,document.head.appendChild(e)}/**
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
 */class Xu{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){var e,t,r;uS(this._throttleData);const s=await oS(this._app).catch(o=>{throw st.create("recaptcha-error")});if(!(!((e=Ve(this._app).reCAPTCHAState)===null||e===void 0)&&e.succeeded))throw st.create("recaptcha-error");let i;try{i=await Qu(F0(this._app,s),this._heartbeatServiceProvider)}catch(o){throw!((t=o.code)===null||t===void 0)&&t.includes("fetch-status-error")?(this._throttleData=lS(Number((r=o.customData)===null||r===void 0?void 0:r.httpStatus),this._throttleData),st.create("throttled",{time:F_(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):o}return this._throttleData=null,i}initialize(e){this._app=e,this._heartbeatServiceProvider=ps(e,"heartbeat"),sS(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof Xu?this._siteKey===e._siteKey:!1}}function lS(n,e){if(n===404||n===403)return{backoffCount:1,allowRequestsAfter:Date.now()+V0,httpStatus:n};{const t=e?e.backoffCount:0,r=Dv(t,1e3,2);return{backoffCount:t+1,allowRequestsAfter:Date.now()+r,httpStatus:n}}}function uS(n){if(n&&Date.now()-n.allowRequestsAfter<=0)throw st.create("throttled",{time:F_(n.allowRequestsAfter-Date.now()),httpStatus:n.httpStatus})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dS(n=Ul(),e){n=Ie(n);const t=ps(n,"app-check");if(ic().initialized||K0(),Yu()&&Ju().then(s=>console.log(`App Check debug token: ${s}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(i.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&i.provider.isEqual(e.provider))return s;throw st.create("already-initialized",{appName:n.name})}const r=t.initialize({options:e});return hS(n,e.provider,e.isTokenAutoRefreshEnabled),Ve(n).isTokenAutoRefreshEnabled&&G_(r,"INTERNAL",()=>{}),r}function hS(n,e,t){const r=x0(n,Object.assign({},L_));r.activated=!0,r.provider=e,r.cachedTokenPromise=G0(n).then(s=>(s&&Ur(s)&&(r.token=s,K_(n,{token:s.token})),s)),r.isTokenAutoRefreshEnabled=t===void 0?n.automaticDataCollectionEnabled:t,r.provider.initialize(n)}const fS="app-check",cp="app-check-internal";function pS(){zt(new kt(fS,n=>{const e=n.getProvider("app").getImmediate(),t=n.getProvider("heartbeat");return Z0(e,t)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((n,e,t)=>{n.getProvider(cp).initialize()})),zt(new kt(cp,n=>{const e=n.getProvider("app-check").getImmediate();return eS(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),vt(tS,nS)}pS();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mS="type.googleapis.com/google.protobuf.Int64Value",gS="type.googleapis.com/google.protobuf.UInt64Value";function W_(n,e){const t={};for(const r in n)n.hasOwnProperty(r)&&(t[r]=e(n[r]));return t}function va(n){if(n==null)return null;if(n instanceof Number&&(n=n.valueOf()),typeof n=="number"&&isFinite(n)||n===!0||n===!1||Object.prototype.toString.call(n)==="[object String]")return n;if(n instanceof Date)return n.toISOString();if(Array.isArray(n))return n.map(e=>va(e));if(typeof n=="function"||typeof n=="object")return W_(n,e=>va(e));throw new Error("Data cannot be encoded in JSON: "+n)}function us(n){if(n==null)return n;if(n["@type"])switch(n["@type"]){case mS:case gS:{const e=Number(n.value);if(isNaN(e))throw new Error("Data cannot be decoded from JSON: "+n);return e}default:throw new Error("Data cannot be decoded from JSON: "+n)}return Array.isArray(n)?n.map(e=>us(e)):typeof n=="function"||typeof n=="object"?W_(n,e=>us(e)):n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zu="functions";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lp={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class it extends Nt{constructor(e,t,r){super(`${Zu}/${e}`,t||""),this.details=r,Object.setPrototypeOf(this,it.prototype)}}function _S(n){if(n>=200&&n<300)return"ok";switch(n){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function ba(n,e){let t=_S(n),r=t,s;try{const i=e&&e.error;if(i){const o=i.status;if(typeof o=="string"){if(!lp[o])return new it("internal","internal");t=lp[o],r=o}const c=i.message;typeof c=="string"&&(r=c),s=i.details,s!==void 0&&(s=us(s))}}catch{}return t==="ok"?null:new it(t,r,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yS{constructor(e,t,r,s){this.app=e,this.auth=null,this.messaging=null,this.appCheck=null,this.serverAppAppCheckToken=null,dt(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.auth=t.getImmediate({optional:!0}),this.messaging=r.getImmediate({optional:!0}),this.auth||t.get().then(i=>this.auth=i,()=>{}),this.messaging||r.get().then(i=>this.messaging=i,()=>{}),this.appCheck||s?.get().then(i=>this.appCheck=i,()=>{})}async getAuthToken(){if(this.auth)try{const e=await this.auth.getToken();return e?.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(e){if(this.serverAppAppCheckToken)return this.serverAppAppCheckToken;if(this.appCheck){const t=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return t.error?null:t.token}return null}async getContext(e){const t=await this.getAuthToken(),r=await this.getMessagingToken(),s=await this.getAppCheckToken(e);return{authToken:t,messagingToken:r,appCheckToken:s}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kl="us-central1",vS=/^data: (.*?)(?:\n|$)/;function bS(n){let e=null;return{promise:new Promise((t,r)=>{e=setTimeout(()=>{r(new it("deadline-exceeded","deadline-exceeded"))},n)}),cancel:()=>{e&&clearTimeout(e)}}}class IS{constructor(e,t,r,s,i=kl,o=(...c)=>fetch(...c)){this.app=e,this.fetchImpl=o,this.emulatorOrigin=null,this.contextProvider=new yS(e,t,r,s),this.cancelAllRequests=new Promise(c=>{this.deleteService=()=>Promise.resolve(c())});try{const c=new URL(i);this.customDomain=c.origin+(c.pathname==="/"?"":c.pathname),this.region=kl}catch{this.customDomain=null,this.region=i}}_delete(){return this.deleteService()}_url(e){const t=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${t}/${this.region}/${e}`:this.customDomain!==null?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`}}function wS(n,e,t){n.emulatorOrigin=`http://${e}:${t}`}function ES(n,e,t){const r=s=>AS(n,e,s,{});return r.stream=(s,i)=>RS(n,e,s,i),r}async function TS(n,e,t,r){t["Content-Type"]="application/json";let s;try{s=await r(n,{method:"POST",body:JSON.stringify(e),headers:t})}catch{return{status:0,json:null}}let i=null;try{i=await s.json()}catch{}return{status:s.status,json:i}}async function Q_(n,e){const t={},r=await n.contextProvider.getContext(e.limitedUseAppCheckTokens);return r.authToken&&(t.Authorization="Bearer "+r.authToken),r.messagingToken&&(t["Firebase-Instance-ID-Token"]=r.messagingToken),r.appCheckToken!==null&&(t["X-Firebase-AppCheck"]=r.appCheckToken),t}function AS(n,e,t,r){const s=n._url(e);return SS(n,s,t,r)}async function SS(n,e,t,r){t=va(t);const s={data:t},i=await Q_(n,r),o=r.timeout||7e4,c=bS(o),l=await Promise.race([TS(e,s,i,n.fetchImpl),c.promise,n.cancelAllRequests]);if(c.cancel(),!l)throw new it("cancelled","Firebase Functions instance was deleted.");const h=ba(l.status,l.json);if(h)throw h;if(!l.json)throw new it("internal","Response is not valid JSON object.");let p=l.json.data;if(typeof p>"u"&&(p=l.json.result),typeof p>"u")throw new it("internal","Response is missing data field.");return{data:us(p)}}function RS(n,e,t,r){const s=n._url(e);return CS(n,s,t,r||{})}async function CS(n,e,t,r){var s;t=va(t);const i={data:t},o=await Q_(n,r);o["Content-Type"]="application/json",o.Accept="text/event-stream";let c;try{c=await n.fetchImpl(e,{method:"POST",body:JSON.stringify(i),headers:o,signal:r?.signal})}catch(A){if(A instanceof Error&&A.name==="AbortError"){const R=new it("cancelled","Request was cancelled.");return{data:Promise.reject(R),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(R)}}}}}}const P=ba(0,null);return{data:Promise.reject(P),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(P)}}}}}}let l,h;const p=new Promise((A,P)=>{l=A,h=P});(s=r?.signal)===null||s===void 0||s.addEventListener("abort",()=>{const A=new it("cancelled","Request was cancelled.");h(A)});const m=c.body.getReader(),b=PS(m,l,h,r?.signal);return{stream:{[Symbol.asyncIterator](){const A=b.getReader();return{async next(){const{value:P,done:R}=await A.read();return{value:P,done:R}},async return(){return await A.cancel(),{done:!0,value:void 0}}}}},data:p}}function PS(n,e,t,r){const s=(o,c)=>{const l=o.match(vS);if(!l)return;const h=l[1];try{const p=JSON.parse(h);if("result"in p){e(us(p.result));return}if("message"in p){c.enqueue(us(p.message));return}if("error"in p){const m=ba(0,p);c.error(m),t(m);return}}catch(p){if(p instanceof it){c.error(p),t(p);return}}},i=new TextDecoder;return new ReadableStream({start(o){let c="";return l();async function l(){if(r?.aborted){const h=new it("cancelled","Request was cancelled");return o.error(h),t(h),Promise.resolve()}try{const{value:h,done:p}=await n.read();if(p){c.trim()&&s(c.trim(),o),o.close();return}if(r?.aborted){const b=new it("cancelled","Request was cancelled");o.error(b),t(b),await n.cancel();return}c+=i.decode(h,{stream:!0});const m=c.split(`
`);c=m.pop()||"";for(const b of m)b.trim()&&s(b.trim(),o);return l()}catch(h){const p=h instanceof it?h:ba(0,null);o.error(p),t(p)}}},cancel(){return n.cancel()}})}const up="@firebase/functions",dp="0.12.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kS="auth-internal",xS="app-check-internal",DS="messaging-internal";function NS(n){const e=(t,{instanceIdentifier:r})=>{const s=t.getProvider("app").getImmediate(),i=t.getProvider(kS),o=t.getProvider(DS),c=t.getProvider(xS);return new IS(s,i,o,c,r)};zt(new kt(Zu,e,"PUBLIC").setMultipleInstances(!0)),vt(up,dp,n),vt(up,dp,"esm2017")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function VS(n=Ul(),e=kl){const r=ps(Ie(n),Zu).getImmediate({identifier:e}),s=fv("functions");return s&&OS(r,...s),r}function OS(n,e,t){wS(Ie(n),e,t)}function Is(n,e,t){return ES(Ie(n),e)}NS();const LS={apiKey:"AIzaSyD9MJrON70mPqZxQqhndgQHNkTZUnnaQIs",authDomain:"altorra-cars.firebaseapp.com",databaseURL:"https://altorra-cars-default-rtdb.firebaseio.com",projectId:"altorra-cars",storageBucket:"altorra-cars.firebasestorage.app",messagingSenderId:"235148219730",appId:"1:235148219730:web:ceabdbc52fdcbe8b85168b",measurementId:"G-ZGZ6CVTB73"},MS="altorra-crm",oc=Fp(LS,MS);dS(oc,{provider:new Xu("6Lfz8BQtAAAAAILjn8GbHFT8u6dpg5rFvg5hGZzS"),isTokenAutoRefreshEnabled:!0});const Ia=Xw(oc),ie=h0(oc,{localCache:S0({tabManager:O_({})})}),ws=VS(oc,"us-central1");function bt(n){const e=z.get().permissions||[];return e.includes("*")||e.includes(n)}function FS(n){return n?n.rol==="super_admin"||n.roleId==="system_super_admin"?["*"]:Array.isArray(n.permissions)&&n.permissions.length?n.permissions.slice():[]:[]}async function US(n){try{const e=await yr(De(ie,"usuarios",n.uid)),t=e.exists()?e.data():null;z.set({user:n,profile:t,permissions:FS(t),ready:!0,authError:null})}catch(e){console.warn("[auth] no se pudo hidratar el perfil:",e),z.set({user:n,profile:null,permissions:[],ready:!0})}}function BS(){FI(Ia,fm).catch(()=>{}),$I(Ia,n=>{n?US(n):z.set({user:null,profile:null,permissions:[],ready:!0})})}const $S={"auth/invalid-email":"Correo inválido.","auth/user-disabled":"Esta cuenta está deshabilitada.","auth/user-not-found":"No existe una cuenta con ese correo.","auth/wrong-password":"Contraseña incorrecta.","auth/invalid-credential":"Credenciales incorrectas.","auth/too-many-requests":"Demasiados intentos. Espera unos minutos.","auth/network-request-failed":"Sin conexión. Revisa tu internet."};async function qS(n,e){z.set({authError:null});try{await MI(Ia,String(n).trim(),e)}catch(t){const r=$S[t&&t.code]||"No se pudo iniciar sesión.";throw z.set({authError:r}),t}}async function jS(){if(z.get().mock){z.set({user:null,profile:null,permissions:[]});return}await qI(Ia)}function qc(){const{profile:n,user:e}=z.get();return n&&(n.nombre||n.roleName)||e&&(e.displayName||e.email)||"Usuario"}function zS(){const{profile:n}=z.get();return n&&(n.cargo||n.roleName)||"Asesor"}const GS=["bandeja","pipeline","agenda","reportes","contactos","config"];function Y_(){const n=(location.hash||"").replace(/^#\/?/,""),[e]=n.split("/");return GS.includes(e)?e:"bandeja"}function HS(n){location.hash!==`#/${n}`&&(location.hash=`#/${n}`)}function KS(n){const e=()=>n(Y_());return window.addEventListener("hashchange",e),()=>window.removeEventListener("hashchange",e)}function u(n,e={},t=[]){const r=document.createElement(n);for(const[s,i]of Object.entries(e))i==null||i===!1||(s==="class"?r.className=i:s==="html"?r.innerHTML=i:s==="text"?r.textContent=i:s==="dataset"?Object.assign(r.dataset,i):s==="style"&&typeof i=="object"?Object.assign(r.style,i):s.startsWith("on")&&typeof i=="function"?r.addEventListener(s.slice(2).toLowerCase(),i):r.setAttribute(s,i===!0?"":String(i)));for(const s of[].concat(t))s==null||s===!1||s===""||r.append(s.nodeType?s:document.createTextNode(String(s)));return r}function pe(n){for(;n&&n.firstChild;)n.removeChild(n.firstChild);return n}let Gr=null;function J_(n){Gr&&!Gr.contains(n.target)&&wa()}function X_(n){n.key==="Escape"&&wa()}function wa(){Gr&&(Gr.remove(),Gr=null,document.removeEventListener("mousedown",J_,!0),window.removeEventListener("keydown",X_,!0))}function Tt(n,e,t,r={}){wa();const s=u("div",{class:"popover",role:"menu"});r.title&&s.append(u("div",{class:"popover__title",text:r.title})),e.forEach(o=>{if(o.divider){s.append(u("div",{class:"popover__divider"}));return}const c=u("button",{class:"popover__item"+(o.active?" is-active":""),type:"button",role:"menuitem"},[o.icon?u("span",{class:"popover__icon",text:o.icon}):null,u("span",{class:"u-grow u-truncate",text:o.label}),o.hint?u("span",{class:"popover__hint u-caption",text:o.hint}):null]);c.addEventListener("click",l=>{l.stopPropagation(),wa(),t(o)}),s.append(c)}),document.body.append(s),WS(s,n),Gr=s,setTimeout(()=>{document.addEventListener("mousedown",J_,!0),window.addEventListener("keydown",X_,!0)},0);const i=s.querySelector(".popover__item");i&&i.focus()}function WS(n,e){const t=e.getBoundingClientRect(),r=n.offsetWidth,s=n.offsetHeight;let i=t.bottom+6,o=t.right-r;o<8&&(o=8),o+r>window.innerWidth-8&&(o=window.innerWidth-r-8),i+s>window.innerHeight-8&&(i=t.top-s-6),n.style.top=`${Math.max(8,i)}px`,n.style.left=`${Math.max(8,o)}px`}function Hi(n){const e=String(n||"").trim().split(/\s+/).filter(Boolean);return e.length?e.length===1?e[0].slice(0,2).toUpperCase():(e[0][0]+e[e.length-1][0]).toUpperCase():"?"}function QS(n){return String(n||"").replace(/\D/g,"")}function Z_(n,e){const t=QS(n);if(!t)return"";const r=e?"?text="+encodeURIComponent(e):"";return"https://wa.me/"+t+r}function ey(n){if(!n)return 1/0;const e=new Date(n).getTime();return Number.isNaN(e)?1/0:Date.now()-e}function ds(n){const e=ey(n);return e===1/0?1/0:e/864e5}function nr(n){const e=ey(n);if(e===1/0)return"—";const t=Math.floor(e/6e4);if(t<1)return"ahora";if(t<60)return`hace ${t} min`;const r=Math.floor(t/60);if(r<24)return`hace ${r} h`;const s=Math.floor(r/24);return s===1?"ayer":s<7?`hace ${s} d`:new Date(n).toLocaleDateString("es-CO",{day:"numeric",month:"short"})}function YS(n){if(!n)return"—";const e=new Date(n);return Number.isNaN(e.getTime())?"—":e.toLocaleString("es-CO",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}function jc(n){const e=Math.abs(n),t=Math.round(e/6e4);if(t<60)return`${t} min`;const r=Math.floor(t/60),s=t%60;return s?`${r} h ${s} min`:`${r} h`}function Xs(n){const e=Number(n)||0;if(!e)return"";if(e>=1e6){const t=e/1e6;return"$"+(t%1?t.toFixed(1).replace(".",","):t.toFixed(0))+" M"}return e>=1e3?"$"+Math.round(e/1e3)+" K":"$"+e}function Ea(n){return String(n||"").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu,"")}const JS="0.4.1",XS=[{id:"bandeja",label:"Bandeja",icon:"📥",ready:!0},{id:"pipeline",label:"Pipeline",icon:"🎯",ready:!0},{id:"agenda",label:"Agenda",icon:"📅",ready:!0},{id:"reportes",label:"Reportes",icon:"📊",ready:!0},{id:"contactos",label:"Contactos",icon:"👤",ready:!0},{id:"config",label:"Disponibilidad",icon:"⚙️",ready:!0,perm:"calendar.config"}],zc={bandeja:"Bandeja Inteligente",pipeline:"Pipeline de ventas",agenda:"Agenda",reportes:"Reportes y KPIs",contactos:"Contactos",config:"Disponibilidad de citas"};function ZS(n){const e={},t=u("div",{class:"sidebar__brand"},[u("span",{class:"sidebar__logo",text:"ALTORRA"}),u("span",{class:"sidebar__sub u-caption",text:"CRM"})]),r=u("nav",{class:"sidebar__nav","aria-label":"Secciones"});XS.filter(R=>!R.perm||bt(R.perm)).forEach(R=>{const S=u("button",{class:"navitem",type:"button",disabled:!R.ready},[u("span",{class:"navitem__icon","aria-hidden":"true",text:R.icon}),u("span",{class:"navitem__label",text:R.label}),R.ready?null:u("span",{class:"navitem__soon",text:"Pronto"})]);R.ready&&S.addEventListener("click",()=>HS(R.id)),e[R.id]=S,r.append(S)});const s=u("aside",{class:"sidebar"},[t,r,u("div",{class:"sidebar__foot u-caption u-faint"},[`v${JS} · Fase 4`])]),i=u("h1",{class:"topbar__h",text:zc.bandeja}),o=u("span",{class:"topbar__crumb u-caption u-faint",text:z.get().mock?"modo demo":"tiempo real"}),c=u("div",{class:"topbar__title"},[i,o]),l=u("button",{class:"icon-btn",type:"button","aria-label":"Cambiar tema"},[u("span",{"aria-hidden":"true",text:z.get().theme==="dark"?"☀️":"🌙"})]);l.addEventListener("click",()=>{const R=ov();l.firstChild.textContent=R==="dark"?"☀️":"🌙"});const h=u("button",{class:"usermenu",type:"button","aria-haspopup":"menu"},[u("span",{class:"avatar avatar--sm","aria-hidden":"true",text:Hi(qc())}),u("span",{class:"usermenu__meta"},[u("span",{class:"usermenu__name u-truncate",text:qc()}),u("span",{class:"usermenu__role u-caption u-faint u-truncate",text:zS()})])]);h.addEventListener("click",()=>{Tt(h,[{value:"logout",label:"Cerrar sesión",icon:"🚪"}],R=>{R.value==="logout"&&jS()},{title:qc()})});const p=u("header",{class:"topbar"},[c,u("div",{class:"topbar__actions u-row"},[l,h])]),m=u("main",{class:"outlet",id:"outlet"}),b=u("div",{id:"detail-root"}),A=u("div",{class:"app-shell"},[s,u("div",{class:"app-main"},[p,m]),b]);pe(n),n.removeAttribute("aria-busy"),n.append(A);function P(R){Object.entries(e).forEach(([S,V])=>{const C=S===R;V.classList.toggle("is-active",C),C?V.setAttribute("aria-current","page"):V.removeAttribute("aria-current")}),i.textContent=zc[R]||zc.bandeja}return{outlet:m,detailRoot:b,setActive:P}}function eR(n){const e=u("input",{class:"input",type:"email",placeholder:"correo@altorracars.com",autocomplete:"username",required:!0,"aria-label":"Correo"}),t=u("input",{class:"input",type:"password",placeholder:"Contraseña",autocomplete:"current-password",required:!0,"aria-label":"Contraseña"}),r=u("div",{class:"login__error",role:"alert",hidden:!0}),s=u("button",{class:"btn btn--gold btn--block",type:"submit"},["Entrar"]),i=u("form",{class:"login__form"},[u("label",{class:"field"},[u("span",{class:"field__label",text:"Correo"}),e]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Contraseña"}),t]),r,s]);i.addEventListener("submit",async c=>{c.preventDefault(),r.hidden=!0,s.disabled=!0,s.textContent="Entrando…";try{await qS(e.value,t.value)}catch{r.textContent=z.get().authError||"No se pudo iniciar sesión.",r.hidden=!1,s.disabled=!1,s.textContent="Entrar"}});const o=u("div",{class:"login surface"},[u("div",{class:"login__brand"},[u("span",{class:"login__logo",text:"ALTORRA"}),u("span",{class:"login__tag u-caption u-faint",text:"CRM · Bandeja Inteligente"})]),u("h1",{class:"login__title",text:"Bienvenido"}),u("p",{class:"login__lead u-muted",text:"Inicia sesión para gestionar tus clientes."}),i,u("div",{class:"login__foot u-caption u-faint",text:"Acceso restringido al equipo de Altorra Cars."})]);pe(n),n.removeAttribute("aria-busy"),n.append(u("div",{class:"login-wrap"},[o])),setTimeout(()=>e.focus(),50)}const tR=()=>document.getElementById("toast-root"),hp={ok:"✓",error:"⚠",info:"ℹ"};function H(n,e="info",t=3200){const r=tR();if(!r)return;const s=document.createElement("div");s.className=`toast toast--${e}`,s.setAttribute("role",e==="error"?"alert":"status");const i=document.createElement("span");i.setAttribute("aria-hidden","true"),i.textContent=hp[e]||hp.info;const o=document.createElement("span");o.className="u-grow",o.textContent=n,s.append(i,o),r.appendChild(s);const c=()=>{s.classList.add("is-leaving"),s.addEventListener("animationend",()=>s.remove(),{once:!0})},l=setTimeout(c,t);s.addEventListener("click",()=>{clearTimeout(l),c()})}const nR=["financiacion","financiación","compra","test_drive","test-drive","cotizacion","cotización"],rR=["cita","test_drive","test-drive","visita","agendar","peritaje"],sR=["financiacion","financiación","consignacion","consignación","consignacion_venta","compra","venta","cotizacion","cotización"],iR=["pqr","reclamo","queja","peticion","petición","garantia","garantía","soporte"],oR={cita:{label:"Cita",icon:"📅",badge:"info"},solicitud:{label:"Solicitud",icon:"📝",badge:"gold"},pqr:{label:"PQR",icon:"⚠️",badge:"danger"},lead:{label:"Lead",icon:"✨",badge:""}};function ac(n){const e=String(n.sourceDetail||"").toLowerCase(),t=String(n.source||"").toLowerCase();let r="lead";return iR.some(s=>e.includes(s)||t.includes(s))?r="pqr":t.includes("cita")||rR.some(s=>e.includes(s))?r="cita":sR.some(s=>e.includes(s))&&(r="solicitud"),{type:r,...oR[r]}}function ed(n){const e=String(n.sourceDetail||"").toLowerCase();return nR.some(t=>e.includes(t))||!!n.vehicleOfInterestId}const aR={whatsapp:{label:"WhatsApp",icon:"🟢"},facebook:{label:"Facebook",icon:"📘"},instagram:{label:"Instagram",icon:"📸"},tiktok:{label:"TikTok",icon:"🎵"},marketplace:{label:"Marketplace",icon:"🛒"},llamada:{label:"Llamada",icon:"📞"},presencial:{label:"Presencial",icon:"🏬"},referido:{label:"Referido",icon:"🤝"},bot:{label:"ALTOR Bot",icon:"🤖"},cuenta:{label:"Cuenta",icon:"👤"},newsletter:{label:"Newsletter",icon:"✉️"},cita:{label:"Cita web",icon:"📅"},web:{label:"Web",icon:"🌐"}};function Ci(n){const e=String(n.source||"").toLowerCase();let t="web";return e.includes("whatsapp")||e.includes("wsp")||e.includes("wa.me")?t="whatsapp":e.includes("facebook")||e.includes("meta")||e==="fb"?t="facebook":e.includes("instagram")||e==="ig"?t="instagram":e.includes("tiktok")||e==="tt"?t="tiktok":e.includes("marketplace")||e.includes("mercadolibre")||e.includes("tucarro")?t="marketplace":e.includes("llamada")||e.includes("telefono")||e.includes("teléfono")||e.includes("call")?t="llamada":e.includes("presencial")||e.includes("walk")||e.includes("showroom")||e.includes("local")?t="presencial":e.includes("referido")||e.includes("referral")||e.includes("recomendado")?t="referido":e.includes("bot")||e.includes("concierge")||e.includes("altor")?t="bot":e.includes("cuenta")||e.includes("registro")||e.includes("account")||e.includes("signup")?t="cuenta":e.includes("news")||e.includes("subscri")||e.includes("suscri")?t="newsletter":e.includes("cita")&&(t="cita"),{key:t,...aR[t]}}const cR=[{id:"whatsapp",label:"WhatsApp",icon:"🟢"},{id:"facebook",label:"Facebook (Meta)",icon:"📘"},{id:"instagram",label:"Instagram",icon:"📸"},{id:"tiktok",label:"TikTok",icon:"🎵"},{id:"marketplace",label:"Marketplace",icon:"🛒"},{id:"llamada",label:"Llamada",icon:"📞"},{id:"presencial",label:"Presencial / Showroom",icon:"🏬"},{id:"referido",label:"Referido",icon:"🤝"},{id:"web",label:"Web (otro)",icon:"🌐"}],lR=[{id:"compra",label:"Compra"},{id:"financiacion",label:"Financiación"},{id:"cita",label:"Cita / Test drive"},{id:"consignacion_venta",label:"Vende su carro"},{id:"peritaje",label:"Peritaje"},{id:"consulta",label:"Consulta general"}],Io={cita:30*60*1e3,pqr:60*60*1e3,solicitud:2*60*60*1e3,lead:24*60*60*1e3};function ty(n){const e=hs(n.status),{type:t}=ac(n);let r=n.slaDueAt?new Date(n.slaDueAt).getTime():null;r||(r=(n.createdAt?new Date(n.createdAt).getTime():Date.now())+(Io[t]||Io.lead));const s=r-Date.now(),i=Io[t]||Io.lead;let o="ok";return e?o="ok":s<=0?o="late":s<i*.25&&(o="warn"),{state:o,dueAt:r,remainingMs:s,closed:e}}const xl=[{id:"nuevo",label:"Nuevo",badge:"gold"},{id:"contactado",label:"Contactado",badge:"info"},{id:"convertido",label:"Convertido",badge:"ok"},{id:"descartado",label:"Descartado",badge:""}],uR=[{id:"inalcanzable",label:"Inalcanzable (no responde)"},{id:"no_califica",label:"No califica (sin presupuesto/intención)"},{id:"duplicado",label:"Duplicado"},{id:"ya_compro_en_otra_parte",label:"Ya compró en otra parte"},{id:"spam_prueba",label:"Spam / prueba"}],dR={calificado:{id:"calificado",label:"Calificado (v2)",badge:"ok"},no_calificado:{id:"no_calificado",label:"No calificado (v2)",badge:""},perdido:{id:"perdido",label:"Perdido (v2)",badge:"danger"}},hR=xl.reduce((n,e)=>(n[e.id]=e,n),{});function jo(n){return hR[n]||dR[n]||{id:n||"nuevo",label:n||"Nuevo",badge:""}}function hs(n){return n==="convertido"||n==="descartado"||n==="perdido"||n==="no_calificado"}function ny(n){return!n.status||n.status==="nuevo"}const Dl={intent:.3,interactions:.18,recency:.22,frequency:.12,economic:.07,age:.06,engagement:.05},Yn=n=>Math.max(0,Math.min(1,n));function fR(n){const e=String(n.sourceDetail||"").toLowerCase();let t=.25;return ed(n)?t=1:/(consignacion|consignación|peritaje|venta)/.test(e)?t=.6:(/(consulta|info|general)/.test(e)||!e)&&(t=.3),n.vehicleOfInterestId&&(t=Math.min(1,t+.15)),Yn(t)}function pR(n){let e=0;for(const t of n){const r=`${t.subject||""} ${t.body||""}`;if(!/financ/i.test(r))continue;const s=(r.match(/\d[\d.,]{5,}/g)||[]).map(i=>parseInt(i.replace(/\D/g,""),10)).filter(i=>i>0);s.length&&(e=Math.max(e,Math.max(...s)/5e7))}return Yn(e)}function mR(n){const e=new Set;for(const t of n){const r=t.createdAt;r&&(ds(r)>30||e.add(String(r).slice(0,10)))}return Yn(e.size/8)}function ry(n,e=[],t=null){const r=Array.isArray(e)?e:[],s={intent:fR(n),interactions:Yn(r.length/6),recency:n.lastActivityAt?Yn(1-ds(n.lastActivityAt)/30):0,frequency:mR(r),economic:pR(r),age:n.createdAt?Yn(ds(n.createdAt)/60):0,engagement:t&&Number(t.score)?Yn(t.score/100):0};let i=0;for(const c of Object.keys(Dl))i+=s[c]*Dl[c];const o=Math.round(i*100);return{score:o,rating:gR(o),factors:s}}function gR(n){return n>=70?"hot":n>=40?"warm":"cold"}const Hr={hot:{label:"Caliente",icon:"🔥",cls:"temp--hot"},warm:{label:"Tibio",icon:"🌤️",cls:"temp--warm"},cold:{label:"Frío",icon:"❄️",cls:"temp--cold"}},fp={intent:"Intención",interactions:"Interacciones",recency:"Recencia",frequency:"Frecuencia",economic:"Capacidad econ.",age:"Antigüedad",engagement:"Engagement"},_R=Dl;function sy(n,e={}){const t=Number(e.score)||0,{type:r}=ac(n),s=ds(n.createdAt),i=ds(n.lastActivityAt),o=ny(n),c=hs(n.status),l=[{id:"confirm_appointment",priority:95,when:r==="cita"&&!c&&o,label:"Confirmar cita",reason:"Cita pendiente de confirmación",icon:"📅"},{id:"reach_hot_lead",priority:90,when:t>=70&&o&&!c,label:"Contactar ya",reason:"Lead caliente sin respuesta",icon:"🔥"},{id:"send_quote",priority:88,when:ed(n)&&t>=55&&!c,label:"Enviar cotización",reason:"Interés de compra/financiación",icon:"🧾"},{id:"assign_asesor",priority:85,when:!n.ownerId&&!c,label:"Asignar asesor",reason:"Sin asesor asignado",icon:"🙋"},{id:"first_touch",priority:70,when:o&&s<2&&!c,label:"Primer contacto",reason:"Lead nuevo sin trabajar",icon:"👋"},{id:"whatsapp_followup",priority:60,when:t>=40&&t<70&&i>=2&&i<30&&!c,label:"Seguimiento WhatsApp",reason:"Lead tibio enfriándose",icon:"💬"},{id:"reactivate",priority:50,when:i>=30&&i!==1/0&&!c,label:"Reactivar con oferta",reason:"Inactivo +30 días",icon:"🎯"},{id:"nurture",priority:15,when:!c,label:"Nutrir relación",reason:"Sin acción urgente",icon:"🌱"},{id:"archived",priority:5,when:c,label:"Cerrado",reason:"Lead cerrado",icon:"✅"}],p=l.filter(m=>m.when).sort((m,b)=>b.priority-m.priority)[0]||l[l.length-1];return{id:p.id,label:p.label,reason:p.reason,icon:p.icon,priority:p.priority}}function iy(n,e=[]){const{score:t,rating:r,factors:s}=ry(n,e,null);return{...n,_score:t,_rating:r,_factors:s,_type:ac(n),_channel:Ci(n),_sla:ty(n),_nba:sy(n,{score:t})}}function wo(n){return n.map(e=>iy(e))}const Nl=[{id:"calientes",label:"Calientes sin contestar",icon:"🔥"},{id:"mios",label:"Mis asignados",icon:"👤"},{id:"sin_asignar",label:"Sin asignar",icon:"🆕"},{id:"todo",label:"Todo",icon:"📥"}];function oy(n,e,t){switch(e){case"calientes":return ny(n)&&!hs(n.status)&&(n._rating==="hot"||ed(n));case"mios":return n.ownerId===t;case"sin_asignar":return!n.ownerId&&!hs(n.status);case"todo":default:return!0}}function yR(n,e){const t={};for(const r of Nl)t[r.id]=0;for(const r of n)for(const s of Nl)oy(r,s.id,e)&&t[s.id]++;return t}const Eo={late:0,warn:1,ok:2};function vR(n,e){const t=n._sla&&n._sla.state||"ok",r=e._sla&&e._sla.state||"ok";return Eo[t]!==Eo[r]?Eo[t]-Eo[r]:e._score!==n._score?e._score-n._score:new Date(e.createdAt||0)-new Date(n.createdAt||0)}function bR(n,{type:e,channel:t,status:r}){return n.filter(s=>!(e&&s._type.type!==e||t&&s._channel.key!==t||r&&(s.status||"nuevo")!==r))}function IR(n,e){const t=Ea(e).trim();return t?n.filter(r=>Ea([r.fullName,r.email,r.phone,r.sourceDetail,r.source].join(" ")).includes(t)):n}function wR(n,e=Date.now()){if((n.status||"nuevo")!=="nuevo")return null;const t=new Date(n.createdAt||0).getTime();if(!t)return null;const r=Math.max(0,Math.floor((e-t)/6e4));return{mins:r,state:r>=60?"late":r>=45?"warn":"ok"}}function ER(n,{queue:e,uid:t,filters:r,search:s,showClosed:i=!1}){let o=n.filter(l=>oy(l,e,t));o=bR(o,r),o=IR(o,s);let c=0;if(!i&&!r.status){const l=o.filter(h=>!hs(h.status)&&!h.archived);c=o.length-l.length,o=l}return o.sort(vR),{rows:o,hiddenClosed:c}}const hr=()=>new Date().toISOString(),td=n=>({id:n.id,...n.data()});function TR({pageSize:n=40,onData:e,onError:t}){let r=null;const s=mt(Pe(ie,"leads"),Dt("createdAt","desc"),wt(n));return{unsubscribe:vr(s,o=>{const c=o.docs.map(td);r=o.docs[o.docs.length-1]||null,e(c,{hasMore:o.size>=n})},o=>{t&&t(o)}),getLastDoc:()=>r}}async function AR({pageSize:n=40,after:e}){if(!e)return{rows:[],lastDoc:null,hasMore:!1};const t=mt(Pe(ie,"leads"),Dt("createdAt","desc"),I0(e),wt(n)),r=await Sn(t);return{rows:r.docs.map(td),lastDoc:r.docs[r.docs.length-1]||null,hasMore:r.size>=n}}async function SR(){const e=(await Sn(Pe(ie,"usuarios"))).docs.map(t=>{const r=t.data();return{uid:t.id,nombre:r.nombre||r.email||"Usuario",cargo:r.cargo||r.roleName||""}}).sort((t,r)=>t.nombre.localeCompare(r.nombre,"es"));return z.set({team:e}),e}async function RR(n,e){await Ot(De(ie,"leads",n),{ownerId:e?e.uid:null,ownerName:e?e.nombre:null,updatedAt:hr(),updatedBy:fr(),_version:xn(1)})}async function CR(n,e,t={},r={}){if(t&&t.convertedTo&&t.convertedTo.dealId)throw new Error("Este lead ya es un negocio: gestiónalo en el Pipeline.");const s=hr();await Ot(De(ie,"leads",n),{...r,status:e,lastActivityAt:s,updatedAt:s,updatedBy:fr(),_version:xn(1)}),await kn(Pe(ie,"activities"),{type:"status_change",subject:"Cambio de estado → "+e,body:"",status:"closed",direction:"outbound",relatedTo:{type:"lead",id:n,name:t.fullName||""},ownerId:fr(),createdAt:s,_version:1})}async function pp(n,{type:e="nota",subject:t="",body:r="",direction:s="outbound",name:i=""}){await kn(Pe(ie,"activities"),{type:e,subject:t,body:r,status:"closed",direction:s,relatedTo:{type:"lead",id:n,name:i},ownerId:fr(),createdAt:hr(),_version:1})}async function PR(n,{subject:e,dueAt:t,name:r=""}){await kn(Pe(ie,"activities"),{type:"tarea",subject:e,body:"",status:"open",direction:"outbound",dueAt:t,relatedTo:{type:"lead",id:n,name:r},ownerId:fr(),createdAt:hr(),_version:1})}async function kR(){const n=new Date;n.setHours(23,59,59,999);const e=mt(Pe(ie,"activities"),ls("dueAt","<=",n.toISOString()),Dt("dueAt","desc"),wt(80));return(await Sn(e)).docs.map(td).filter(r=>r.status==="open"&&(r.type==="tarea"||r.type==="cita")).sort((r,s)=>String(r.dueAt).localeCompare(String(s.dueAt)))}async function xR(n){await Ot(De(ie,"activities",n),{status:"closed",closedAt:hr(),closedBy:fr()})}async function DR(n,e=!0){await Ot(De(ie,"leads",n),{archived:e,archivedAt:e?hr():null,updatedAt:hr(),updatedBy:fr(),_version:xn(1)})}async function NR(n){return(await Is(ws,"crmPurgeLead")({leadId:n})).data}function fr(){const n=z.get().user;return n?n.uid:null}async function VR(n){const e=z.get().user?z.get().user.uid:null,t=["manual",n.trafico,n.campana].filter(Boolean);return(await kn(Pe(ie,"solicitudes"),{nombre:n.nombre||"",email:(n.email||"").trim().toLowerCase(),telefono:n.telefono||"",prefijoPais:n.prefijoPais||"+57",origen:n.canal||"manual",tipo:n.interes||"consulta",vehiculoId:n.vehiculoId||null,kind:"lead",comentarios:n.notas||"",consentGiven:n.consentGiven===!0,tags:t,source:{page:"manual",campaign:n.campana||null,traffic:n.trafico||null},clientCategory:"manual",createdAt:new Date().toISOString(),_manual:!0,_createdByUid:e})).id}const Jn=n=>new Date(Date.now()-n*6e4).toISOString(),Re=n=>Jn(n*60),re=n=>Jn(n*60*24),OR=[{uid:"u_ceo",nombre:"Rodrigo (CEO)",cargo:"CEO"},{uid:"u_ana",nombre:"Ana Restrepo",cargo:"Asesora comercial"},{uid:"u_luis",nombre:"Luis Pérez",cargo:"Asesor comercial"}],nd=[{id:"l1",fullName:"María Fernanda Gómez",email:"mafe.gomez@gmail.com",phone:"+573012345678",source:"financiacion",sourceDetail:"financiacion",vehicleOfInterestId:"mazda-cx5-2021",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:Jn(-40),contactId:"email_mafe_gomez_gmail_com",createdAt:Jn(18),lastActivityAt:Jn(18),_version:1},{id:"l2",fullName:"Carlos Andrés Salcedo",email:"casalcedo@outlook.com",phone:"+573159876543",source:"cita",sourceDetail:"test_drive",vehicleOfInterestId:"toyota-corolla-2022",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:Jn(5),contactId:"email_casalcedo_outlook_com",createdAt:Re(1),lastActivityAt:Re(1),_version:1},{id:"l3",fullName:"Diana Ramírez",email:"diana.r@hotmail.com",phone:"+573201112233",source:"web",sourceDetail:"compra",vehicleOfInterestId:"chevrolet-tracker-2023",status:"contactado",rating:"cold",score:0,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:Re(-1),contactId:"email_diana_r_hotmail_com",createdAt:Re(5),lastActivityAt:Re(2),_version:2},{id:"l4",fullName:"Jhon Jairo Mosquera",email:"",phone:"+573044455667",source:"whatsapp",sourceDetail:"consulta",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:Re(-3),contactId:"phone_573044455667",createdAt:Re(8),lastActivityAt:Re(8),_version:1},{id:"l5",fullName:"Laura Valentina Ortiz",email:"lauraortiz@gmail.com",phone:"+573186677889",source:"bot",sourceDetail:"financiacion",vehicleOfInterestId:"kia-sportage-2022",status:"contactado",rating:"cold",score:0,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:re(-1),contactId:"email_lauraortiz_gmail_com",createdAt:re(1),lastActivityAt:Re(20),_version:3},{id:"l6",fullName:"Pedro Nel Arango",email:"pnarango@empresa.co",phone:"+573017788990",source:"cuenta",sourceDetail:"registro",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:re(-1),contactId:"email_pnarango_empresa_co",createdAt:re(2),lastActivityAt:re(2),_version:1},{id:"l7",fullName:"Sofía Mejía",email:"sofia.mejia@gmail.com",phone:"+573123344556",source:"newsletter",sourceDetail:"suscripcion",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:re(-3),contactId:"email_sofia_mejia_gmail_com",createdAt:re(4),lastActivityAt:re(4),_version:1},{id:"l8",fullName:"Andrés Felipe Cuesta",email:"afcuesta@gmail.com",phone:"+573009988776",source:"web",sourceDetail:"consignacion_venta",vehicleOfInterestId:null,status:"calificado",rating:"cold",score:0,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:re(-2),contactId:"email_afcuesta_gmail_com",createdAt:re(6),lastActivityAt:re(1),_version:4},{id:"l9",fullName:"Catalina Ríos",email:"cata.rios@gmail.com",phone:"+573145566778",source:"web",sourceDetail:"peritaje",vehicleOfInterestId:"nissan-frontier-2020",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:re(-10),contactId:"email_cata_rios_gmail_com",createdAt:re(12),lastActivityAt:re(35),_version:1},{id:"l10",fullName:"Gloria Patiño",email:"glopa@gmail.com",phone:"+573162233445",source:"web",sourceDetail:"reclamo",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:Re(-2),contactId:"email_glopa_gmail_com",createdAt:Re(3),lastActivityAt:Re(3),_version:1},{id:"l11",fullName:"Mauricio Bedoya",email:"mbedoya@gmail.com",phone:"+573024455661",source:"facebook",sourceDetail:"compra",vehicleOfInterestId:"mazda-cx5-2021",status:"convertido",rating:"hot",score:78,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:re(9),contactId:"email_mbedoya_gmail_com",convertedTo:{dealId:"d6"},createdAt:re(10),lastActivityAt:re(3),_version:5},{id:"l12",fullName:"Yuliana Castaño",email:"yulycastano@gmail.com",phone:"+573135566779",source:"whatsapp",sourceDetail:"financiacion",vehicleOfInterestId:"toyota-hilux-2020",status:"convertido",rating:"hot",score:82,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:re(14),contactId:"email_yulycastano_gmail_com",convertedTo:{dealId:"d7"},createdAt:re(15),lastActivityAt:re(5),_version:6},{id:"l13",fullName:"Hernán Darío Loaiza",email:"hdloaiza@gmail.com",phone:"+573017788123",source:"web",sourceDetail:"compra",vehicleOfInterestId:"renault-duster-2022",status:"perdido",rating:"warm",score:45,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:re(19),contactId:"email_hdloaiza_gmail_com",createdAt:re(20),lastActivityAt:re(8),_version:3},{id:"l14",fullName:"Paola Andrea Suárez",email:"pasuarez@gmail.com",phone:"+573156677001",source:"newsletter",sourceDetail:"suscripcion",vehicleOfInterestId:null,status:"no_calificado",rating:"cold",score:12,ownerId:null,ownerName:null,slaDueAt:re(24),contactId:"email_pasuarez_gmail_com",createdAt:re(25),lastActivityAt:re(25),_version:2},{id:"l15",fullName:"Julián Marín",email:"julianmarin@gmail.com",phone:"+573008811223",source:"referido",sourceDetail:"compra",vehicleOfInterestId:"nissan-frontier-2020",status:"convertido",rating:"hot",score:74,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:re(21),contactId:"email_julianmarin_gmail_com",convertedTo:{dealId:"d8"},createdAt:re(22),lastActivityAt:re(9),_version:4}],LR={l1:[{id:"a1",type:"solicitud_inbound",subject:"Nueva solicitud: financiacion",body:"Quiero financiar la Mazda CX-5. Cuota inicial 25.000.000, ingresos 6.000.000 mensuales.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l1",name:"María Fernanda Gómez"},createdAt:Jn(18),_version:1}],l3:[{id:"a2",type:"solicitud_inbound",subject:"Nueva solicitud: compra",body:"Interesada en la Chevrolet Tracker.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:Re(5),_version:1},{id:"a3",type:"whatsapp",subject:"WhatsApp enviado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:Re(2),_version:1},{id:"a4",type:"status_change",subject:"Cambio de estado → contactado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:Re(2),_version:1}],l5:[{id:"a5",type:"solicitud_inbound",subject:"Nueva lead: financiacion",body:"Bot ALTOR: pregunta por financiación de la Kia Sportage.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},createdAt:re(1),_version:1},{id:"a6",type:"whatsapp",subject:"WhatsApp enviado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},createdAt:Re(20),_version:1}]},Pi={};nd.forEach(n=>{const e=n.status==="convertido"?"customer":n.source==="newsletter"?"subscriber":"lead";Pi[n.contactId]={id:n.contactId,fullName:n.fullName,email:n.email,phone:n.phone,type:e==="customer"?"cliente":"lead",source:n.source,score:0,rating:"cold",lifecycleStage:e,clienteUid:null,consent:{email:n.source!=="web",whatsapp:n.source!=="web",calls:!1,askedAt:n.createdAt,source:n.source,policyVersion:"v1"},doNotContact:n.source==="web",tags:[],createdAt:n.createdAt,lastActivityAt:n.lastActivityAt,_version:1}});Pi.email_camila_lectora_gmail_com={id:"email_camila_lectora_gmail_com",fullName:"Camila Lectora",email:"camila.lectora@gmail.com",phone:"",type:"lead",source:"newsletter",score:0,rating:"cold",lifecycleStage:"subscriber",clienteUid:null,consent:{email:!0,whatsapp:!1,calls:!1,askedAt:re(3),source:"newsletter",policyVersion:"v1"},doNotContact:!1,tags:["newsletter"],createdAt:re(3),lastActivityAt:re(3),_version:1};const zo={},Ta=()=>nd.map(n=>({...n})),ay=()=>OR.map(n=>({...n})),MR=n=>(LR[n]||[]).map(e=>({...e})),FR=n=>Pi[n]?{...Pi[n]}:null,UR=()=>Object.values(Pi).map(n=>({...n})),mp=n=>(zo[n]||[]).map(e=>({...e}));function BR(n,e){zo[n]||(zo[n]=[]),zo[n].unshift({id:"n"+Date.now(),...e})}let $R=100;const ii=[{id:"d1",name:"Diana Ramírez · Chevrolet Tracker 2023",contactName:"Diana Ramírez",contactId:"email_diana_r_hotmail_com",leadId:"l3",vehicleId:"chevrolet-tracker-2023",vehicleName:"Chevrolet Tracker 2023",pipelineId:"ventas",stageId:"cuadrando_cita",stageName:"Cuadrando cita",status:"open",amount:82e6,currency:"COP",probability:.2,weightedAmount:164e5,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"web",lastActivityAt:Re(2),createdAt:Re(5),_version:2},{id:"d2",name:"Laura Valentina Ortiz · Kia Sportage 2022",contactName:"Laura Valentina Ortiz",contactId:"email_lauraortiz_gmail_com",leadId:"l5",vehicleId:"kia-sportage-2022",vehicleName:"Kia Sportage 2022",pipelineId:"ventas",stageId:"cita_fijada",stageName:"Cita fijada",status:"open",amount:95e6,currency:"COP",probability:.35,weightedAmount:3325e4,ownerId:"u_luis",ownerName:"Luis Pérez",source:"bot",lastActivityAt:Re(20),createdAt:re(1),_version:3},{id:"d3",name:"Andrés Felipe Cuesta · Mazda 3 2021",contactName:"Andrés Felipe Cuesta",contactId:"email_afcuesta_gmail_com",leadId:"l8",vehicleId:"mazda-3-2021",vehicleName:"Mazda 3 2021",pipelineId:"ventas",stageId:"visita_test_drive",stageName:"Visita / Test drive",status:"open",amount:68e6,currency:"COP",probability:.5,weightedAmount:34e6,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"web",lastActivityAt:re(18),createdAt:re(20),_version:5},{id:"d4",name:"Roberto Gómez · Toyota Hilux 2020",contactName:"Roberto Gómez",contactId:"phone_573001239876",leadId:null,vehicleId:"toyota-hilux-2020",vehicleName:"Toyota Hilux 2020",pipelineId:"ventas",stageId:"negociacion",stageName:"Negociación",status:"open",amount:135e6,currency:"COP",probability:.7,weightedAmount:945e5,ownerId:"u_luis",ownerName:"Luis Pérez",source:"whatsapp",lastActivityAt:Re(6),createdAt:re(8),_version:7},{id:"d5",name:"Sandra Milena Vélez · Renault Duster 2022",contactName:"Sandra Milena Vélez",contactId:"email_smvelez_gmail_com",leadId:null,vehicleId:"renault-duster-2022",vehicleName:"Renault Duster 2022",pipelineId:"ventas",stageId:"cuadrando_cita",stageName:"Cuadrando cita",status:"open",amount:0,currency:"COP",probability:.2,weightedAmount:0,ownerId:null,ownerName:null,source:"cuenta",lastActivityAt:Re(1),createdAt:Re(1),_version:1},{id:"d6",name:"Mauricio Bedoya · Mazda CX-5 2021",contactName:"Mauricio Bedoya",contactId:"email_mbedoya_gmail_com",leadId:"l11",vehicleId:"mazda-cx5-2021",vehicleName:"Mazda CX-5 2021",pipelineId:"ventas",stageId:"vendido",stageName:"Vendido",status:"won",amount:78e6,currency:"COP",probability:1,weightedAmount:78e6,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"facebook",lastActivityAt:re(3),createdAt:re(10),_version:6},{id:"d7",name:"Yuliana Castaño · Toyota Hilux 2020",contactName:"Yuliana Castaño",contactId:"email_yulycastano_gmail_com",leadId:"l12",vehicleId:"toyota-hilux-2020",vehicleName:"Toyota Hilux 2020",pipelineId:"ventas",stageId:"vendido",stageName:"Vendido",status:"won",amount:112e6,currency:"COP",probability:1,weightedAmount:112e6,ownerId:"u_luis",ownerName:"Luis Pérez",source:"whatsapp",lastActivityAt:re(5),createdAt:re(15),_version:7},{id:"d8",name:"Julián Marín · Nissan Frontier 2020",contactName:"Julián Marín",contactId:"email_julianmarin_gmail_com",leadId:"l15",vehicleId:"nissan-frontier-2020",vehicleName:"Nissan Frontier 2020",pipelineId:"ventas",stageId:"perdido",stageName:"Perdido",status:"lost",amount:64e6,currency:"COP",probability:0,weightedAmount:0,lostReason:"Compró en otro lado",ownerId:"u_luis",ownerName:"Luis Pérez",source:"referido",lastActivityAt:re(9),createdAt:re(22),_version:4}],cy=()=>ii.map(n=>({...n}));function qR(n){const e="d"+ ++$R;return ii.unshift({id:e,...n}),e}function jR(n,e){const t=ii.findIndex(r=>r.id===n);t>=0&&(ii[t]={...ii[t],...e})}const Un=(n,e=10,t=0)=>{const r=new Date;return r.setDate(r.getDate()+n),r.setHours(e,t,0,0),r.toISOString()},Vl=[{id:"ag1",type:"cita",subject:"Test drive Toyota Corolla",dueAt:Un(1,10),relatedTo:{type:"lead",id:"l2",name:"Carlos Andrés Salcedo"},status:"open"},{id:"ag2",type:"cita",subject:"Visita showroom",dueAt:Un(1,12),relatedTo:{type:"lead",id:"l1",name:"María Fernanda Gómez"},status:"open"},{id:"ag3",type:"cita",subject:"Cierre financiación",dueAt:Un(1,15),relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},status:"open"},{id:"ag4",type:"cita",subject:"Llamada de seguimiento",dueAt:Un(1,17),relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},status:"open"},{id:"ag5",type:"cita",subject:"Entrega de vehículo",dueAt:Un(3,9),relatedTo:{type:"lead",id:"l8",name:"Andrés Felipe Cuesta"},status:"open"},{id:"ag6",type:"cita",subject:"Peritaje",dueAt:Un(5,11),relatedTo:{type:"lead",id:"l9",name:"Catalina Ríos"},status:"open"},{id:"ag7",type:"cita",subject:"Negociación precio",dueAt:Un(-2,16),relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},status:"open"}],zR=()=>Vl.map(n=>({...n}));function GR(n){Vl.push({id:"ag"+(Vl.length+1),...n})}let HR=100;function ly(n){const e="lm"+ ++HR,t=new Date().toISOString(),r=(n.telefono||"").replace(/\D/g,""),s=(n.prefijoPais||"+57").replace(/\D/g,""),i=r?"+"+(r.startsWith(s)?r:s+r):"",o=(n.email||"").trim().toLowerCase(),c={id:e,fullName:n.nombre||"Sin nombre",email:o,phone:i,source:n.canal||"manual",sourceDetail:n.interes||"consulta",vehicleOfInterestId:n.vehiculoId||null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:null,contactId:o?"email_"+o.replace(/[^a-z0-9]/gi,"_"):"phone_"+r,tags:["manual",n.trafico,n.campana].filter(Boolean),createdAt:t,lastActivityAt:t,_version:1};return nd.unshift(c),e}function KR(){const n={},e=(m,b,A)=>u("label",{class:"field"},[u("span",{class:"field__label",text:m}),b,null]);n.nombre=u("input",{class:"input",type:"text",placeholder:"Nombre del cliente",autocomplete:"off"}),n.prefijo=u("input",{class:"input",type:"text",value:"+57",style:{width:"72px"}}),n.telefono=u("input",{class:"input",type:"tel",placeholder:"300 123 4567",autocomplete:"off"}),n.email=u("input",{class:"input",type:"email",placeholder:"correo@ejemplo.com (opcional)",autocomplete:"off"}),n.canal=u("select",{class:"select"},cR.map(m=>u("option",{value:m.id},[`${m.icon} ${m.label}`]))),n.interes=u("select",{class:"select"},lR.map(m=>u("option",{value:m.id},[m.label]))),n.trafico=u("select",{class:"select"},[u("option",{value:""},["— Tráfico —"]),u("option",{value:"organico"},["Orgánico"]),u("option",{value:"pauta"},["Pauta (pago)"])]),n.campana=u("input",{class:"input",type:"text",placeholder:"Campaña (opcional)",autocomplete:"off"}),n.vehiculo=u("input",{class:"input",type:"text",placeholder:"Vehículo de interés (opcional)",autocomplete:"off"}),n.notas=u("textarea",{class:"textarea",placeholder:"Notas / contexto del lead",rows:"2"}),n.consent=u("input",{type:"checkbox",checked:!0});const t=u("div",{class:"login__error",role:"alert",hidden:!0}),r=u("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),s=u("button",{class:"btn btn--gold",type:"submit"},["Agregar lead"]),i=u("form",{class:"nl-form"},[e("Nombre *",n.nombre),u("div",{class:"nl-row"},[u("label",{class:"field",style:{flex:"0 0 auto"}},[u("span",{class:"field__label",text:"Prefijo"}),n.prefijo]),u("label",{class:"field u-grow"},[u("span",{class:"field__label",text:"Teléfono"}),n.telefono])]),e("Correo",n.email),u("div",{class:"nl-row"},[e("Canal *",n.canal),e("Interés",n.interes)]),u("div",{class:"nl-row"},[e("Tráfico",n.trafico),e("Campaña",n.campana)]),e("Vehículo de interés",n.vehiculo),e("Notas",n.notas),u("label",{class:"nl-consent"},[n.consent,u("span",{class:"u-caption",text:"El cliente autorizó el tratamiento de sus datos (Ley 1581 · Habeas Data)."})]),t,u("div",{class:"nl-actions"},[r,s])]),o=u("div",{class:"modal"},[u("div",{class:"modal__head"},[u("h2",{class:"modal__title",text:"＋ Nuevo lead"}),u("span",{class:"u-caption u-faint",text:"Captura manual (Meta, WhatsApp, TikTok, llamada, referido…)"})]),i]),c=u("div",{class:"modal-overlay"},[o]);document.body.appendChild(c),setTimeout(()=>n.nombre.focus(),30);const l=()=>{c.remove(),window.removeEventListener("keydown",h)},h=m=>{m.key==="Escape"&&l()};window.addEventListener("keydown",h),c.addEventListener("mousedown",m=>{m.target===c&&l()}),r.addEventListener("click",l),i.addEventListener("submit",async m=>{m.preventDefault(),t.hidden=!0;const b={nombre:n.nombre.value.trim(),email:n.email.value.trim(),telefono:n.telefono.value.trim(),prefijoPais:n.prefijo.value.trim()||"+57",canal:n.canal.value,interes:n.interes.value,vehiculoId:n.vehiculo.value.trim()||null,trafico:n.trafico.value||null,campana:n.campana.value.trim()||null,consentGiven:n.consent.checked,notas:n.notas.value.trim()};if(!b.nombre)return p("Escribe el nombre del cliente.");if(!b.email&&!b.telefono)return p("Necesitas al menos un correo o un teléfono (para no duplicar el contacto).");s.disabled=!0,s.textContent="Guardando…";try{z.get().mock?(ly(b),window.dispatchEvent(new CustomEvent("altorra:leads-dirty"))):await VR(b),H("✓ Lead agregado a la Bandeja","ok"),l()}catch{s.disabled=!1,s.textContent="Agregar lead",p("No se pudo agregar. Intenta de nuevo.")}});function p(m){return t.textContent=m,t.hidden=!1,!1}}const Ol="altorra_friction_v1",WR=300;function Aa(n,e,t={}){try{const r=Math.max(0,Math.round(performance.now()-e)),s=JSON.parse(localStorage.getItem(Ol)||"[]");for(s.push({task:n,ms:r,at:new Date().toISOString(),...t});s.length>WR;)s.shift();localStorage.setItem(Ol,JSON.stringify(s))}catch{}}function QR(){try{const n=JSON.parse(localStorage.getItem(Ol)||"[]"),e={};for(const r of n)(e[r.task]=e[r.task]||[]).push(r.ms);const t={};for(const[r,s]of Object.entries(e)){const i=[...s].sort((o,c)=>o-c);t[r]={n:s.length,mediana_s:+(i[Math.floor(i.length/2)]/1e3).toFixed(1),p90_s:+(i[Math.floor(i.length*.9)]/1e3).toFixed(1)}}return t}catch{return{}}}typeof window<"u"&&(window.__friccion=QR);const YR=[{id:"whatsapp",label:"WhatsApp",icon:"💬"},{id:"walkin",label:"Walk-in",icon:"🚶"},{id:"llamada",label:"Llamada",icon:"📞"},{id:"referido",label:"Referido",icon:"🤝"}],JR="“¿Me autorizas guardar tu nombre y teléfono para contactarte sobre vehículos? (Ley 1581)”";function XR(){const n=performance.now(),e={fuente:"whatsapp",medio:"organico"},t=z.get().user||{},r=u("input",{class:"input",type:"text",placeholder:"Nombre",autocomplete:"off"}),s=u("input",{class:"input",type:"tel",placeholder:"300 123 4567",autocomplete:"off",inputmode:"tel"}),i=u("input",{class:"input",type:"text",placeholder:'Nota corta (opcional): "busca SUV blanca"',autocomplete:"off"}),o=u("input",{type:"checkbox"}),c=u("div",{class:"u-row",style:{flexWrap:"wrap",gap:"6px"}});function l(){c.replaceChildren(...YR.map(k=>{const U=u("button",{class:"chip"+(e.fuente===k.id?" chip--active":""),type:"button"},[`${k.icon} ${k.label}`]);return U.addEventListener("click",()=>{e.fuente=k.id,l()}),U}))}l();const h=u("button",{class:"chip",type:"button"},["Orgánico"]);h.addEventListener("click",()=>{e.medio=e.medio==="organico"?"pauta":"organico",h.textContent=e.medio==="organico"?"Orgánico":"Pauta (pago)"});const p=u("div",{class:"login__error",role:"alert",hidden:!0}),m=u("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),b=u("button",{class:"btn btn--gold",type:"submit"},["⚡ Registrar"]),A=u("form",{class:"nl-form"},[u("label",{class:"field"},[u("span",{class:"field__label",text:"Nombre *"}),r]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Teléfono / WhatsApp *"}),s]),u("div",{class:"u-row",style:{gap:"8px",alignItems:"center"}},[c,h]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Nota"}),i]),u("label",{class:"nl-consent"},[o,u("span",{class:"u-caption"},["Leí el guion y el cliente AUTORIZÓ de palabra: ",u("em",{text:JR})])]),p,u("div",{class:"nl-actions"},[m,b])]),P=u("div",{class:"modal"},[u("div",{class:"modal__head"},[u("h2",{class:"modal__title",text:"⚡ Lead rápido"}),u("span",{class:"u-caption u-faint",text:navigator.onLine?"El WhatsApp entrante o el cliente del patio, registrado en 30 segundos.":"📴 Sin señal: se guardará y sincronizará solo al volver la conexión."})]),A]),R=u("div",{class:"modal-overlay"},[P]);document.body.appendChild(R),setTimeout(()=>r.focus(),30);const S=()=>{R.remove(),window.removeEventListener("keydown",V)},V=k=>{k.key==="Escape"&&S()};window.addEventListener("keydown",V),R.addEventListener("mousedown",k=>{k.target===R&&S()}),m.addEventListener("click",S),A.addEventListener("submit",k=>{k.preventDefault(),p.hidden=!0;const U={nombre:r.value.trim(),telefono:s.value.trim(),fuente:e.fuente,medio:e.medio,nota:i.value.trim(),consentVerbal:o.checked,ownerId:t.uid||null,ownerName:t.nombre||t.email||null,createdAt:new Date().toISOString()};if(!U.nombre)return C("Escribe el nombre.");if(!U.telefono||U.telefono.replace(/\D/g,"").length<7)return C("Escribe un teléfono válido.");if(!U.ownerId&&!z.get().mock)return C("Sesión sin usuario — recarga el portal.");if(z.get().mock){ly({nombre:U.nombre,telefono:U.telefono,canal:U.fuente,trafico:U.medio,consentGiven:U.consentVerbal,notas:U.nota}),window.dispatchEvent(new CustomEvent("altorra:leads-dirty")),H("⚡ Lead registrado (mock)","ok"),S();return}kn(Pe(ie,"lead_intake"),U).catch(x=>{console.error("[quick-lead] rechazo del servidor:",x),H('El lead "'+U.nombre+'" fue RECHAZADO al sincronizar: '+(x.code||x.message),"error")}),H(navigator.onLine?"⚡ Lead registrado — aparecerá en la Bandeja en segundos":"📴 Guardado local — se enviará al volver la señal","ok"),Aa("lead_rapido",n,{fuente:e.fuente,online:navigator.onLine}),S()});function C(k){return p.textContent=k,p.hidden=!1,!1}}const ZR="ventas",Ki=[{id:"cuadrando_cita",label:"Cuadrando cita",prob:.2},{id:"cita_fijada",label:"Cita fijada",prob:.35},{id:"visita_test_drive",label:"Visita / Test drive",prob:.5},{id:"negociacion",label:"Negociación",prob:.7},{id:"apartado",label:"Apartado",prob:.9},{id:"vendido",label:"Vendido",prob:1,won:!0}],Go={id:"perdido",label:"Perdido",prob:0,lost:!0},To={_exit_visita_test_drive:["huboTestDrive"],apartado:["montoApartado","venceEl"],vendido:["tipoPago"],perdido:["lostReason"]},zs=Ki.map(n=>n.id);function gp(n,e){if(n===e)return{ok:!0,needsReason:!1,gates:[]};const t=i=>i===Go.id||zs.includes(i);if(!t(n)||!t(e))return{ok:!1,error:"etapa_desconocida"};if(n==="vendido")return{ok:!1,error:"vendido_es_terminal"};if(e===Go.id)return{ok:!0,needsReason:!1,gates:To.perdido.slice()};if(n===Go.id)return{ok:!0,needsReason:!0,gates:[]};const r=zs.indexOf(n),s=zs.indexOf(e);if(s>r){const i=[];for(let o=r;o<s;o++){zs[o]==="visita_test_drive"&&i.push(...To._exit_visita_test_drive);const c=zs[o+1];To[c]&&i.push(...To[c])}return{ok:!0,needsReason:!1,gates:[...new Set(i)]}}return{ok:!0,needsReason:!0,gates:[],recalcVehicle:n==="apartado"}}const _p=[{id:"precio",label:"Precio"},{id:"financiacion_negada",label:"Financiación negada"},{id:"compro_en_otro_lado",label:"Compró en otro lado"},{id:"no_responde",label:"No responde"},{id:"cambio_de_opinion",label:"Cambió de opinión"},{id:"error_de_registro",label:"Error de registro"},{id:"otro",label:"Otro motivo"}],oi=Ki.filter(n=>!n.won),uy=[...Ki,Go].reduce((n,e)=>(n[e.id]=e,n),{});function Mr(n){return uy[n]||Ki[0]}function ai(n){const e=uy[n];return e?e.prob:0}function rd(n){return Math.round((Number(n.amount)||0)*ai(n.stageId))}function dy(n){return n.reduce((e,t)=>e+(t.status==="open"?rd(t):0),0)}function eC(n){return n.reduce((e,t)=>e+(t.status==="open"&&Number(t.amount)||0),0)}function tC(n,e=14){return n.status==="open"&&ds(n.lastActivityAt)>e}function nC(n){const e={};for(const t of oi)e[t.id]=[];for(const t of n)t.status==="open"&&(e[t.stageId]||(e[t.stageId]=[])).push(t);return e}function hy(n,e={}){const t=e.vehicleId!==void 0?e.vehicleId||"":n.vehicleOfInterestId||"",r=Ki[0];return{name:(n.fullName||"Oportunidad")+(t?" · "+(e.vehicleName||t):""),contactId:n.contactId||null,contactName:n.fullName||"",leadId:n.id||null,vehicleId:t||null,vehicleName:e.vehicleName||t||"",sinVehiculoAun:!t,pipelineId:ZR,stageId:r.id,stageName:r.label,status:"open",amount:Number(e.amount)||0,currency:"COP",probability:r.prob,weightedAmount:Math.round((Number(e.amount)||0)*r.prob),expectedCloseDate:null,ownerId:e.ownerId!==void 0?e.ownerId:n.ownerId||null,ownerName:e.ownerName!==void 0?e.ownerName:n.ownerName||null,source:n.source||"web",nextStep:e.nota||""}}const Es=()=>new Date().toISOString(),rC=n=>({id:n.id,...n.data()}),vn=()=>z.get().user?z.get().user.uid:null;function sC(n,e,t){return kn(Pe(ie,"activities"),{type:"deal",subject:t,body:"",status:"closed",direction:"outbound",relatedTo:{type:"deal",id:n,name:e||""},ownerId:vn(),createdAt:Es(),_version:1})}function iC({pageSize:n=100,onData:e,onError:t}){const r=mt(Pe(ie,"deals"),ls("status","==","open"),Dt("lastActivityAt","desc"),wt(n));return vr(r,s=>e(s.docs.map(rC)),s=>t&&t(s))}async function oC(n,e={}){const t=Es(),r=hy(n,e),s=await kn(Pe(ie,"deals"),{...r,lastActivityAt:t,createdAt:t,updatedAt:t,createdBy:vn(),updatedBy:vn(),_version:1});return await Ot(De(ie,"leads",n.id),{status:"convertido",convertedTo:{dealId:s.id,prevStatus:n.status||"contactado"},lastActivityAt:t,updatedAt:t,updatedBy:vn(),_version:xn(1)}),await sC(s.id,r.contactName,"Oportunidad creada desde lead"),s.id}async function aC(n){return(await Is(ws,"anularConversion")({dealId:n})).data}async function fy(){return(await Sn(mt(Pe(ie,"vehiculos"),ls("estado","==","disponible"),wt(60)))).docs.map(e=>{const t=e.data();return{id:e.id,label:[t.marca,t.modelo,t.year].filter(Boolean).join(" "),precio:Number(t.precioOferta||t.precio)||0}}).sort((e,t)=>e.label.localeCompare(t.label,"es"))}async function yp(n,e,t={},r={}){const s=Es(),i=Mr(e);await Ot(De(ie,"deals",n),{...r,stageId:e,stageName:i.label,probability:i.prob,weightedAmount:Math.round((Number(t.amount)||0)*i.prob),lastActivityAt:s,updatedAt:s,updatedBy:vn(),_version:xn(1)})}async function cC(n,e,t={}){const r=Es(),s=Math.max(0,Math.round(Number(e)||0));await Ot(De(ie,"deals",n),{amount:s,weightedAmount:Math.round(s*ai(t.stageId)),updatedAt:r,updatedBy:vn(),_version:xn(1)})}async function lC(n,e={},t={}){const r=Es();await Ot(De(ie,"deals",n),{...t,status:"won",stageId:"vendido",stageName:"Vendido",probability:1,weightedAmount:Number(e.amount)||0,lastActivityAt:r,updatedAt:r,updatedBy:vn(),_version:xn(1)})}async function uC(n,e,t={}){const r=Es();await Ot(De(ie,"deals",n),{status:"lost",stageId:"perdido",stageName:"Perdido",probability:0,weightedAmount:0,lostReason:String(e||"otro"),lastActivityAt:r,updatedAt:r,updatedBy:vn(),_version:xn(1)})}const Gc="__sin_vehiculo__";function py(n,{onDone:e}={}){const t=performance.now(),r=z.get().team||[],s=u("select",{class:"select"},[u("option",{value:""},["Cargando inventario…"])]),i=u("input",{class:"input",type:"number",min:"0",step:"100000",placeholder:"Valor estimado (COP) *"}),o=u("select",{class:"select"},r.length?r.map(C=>u("option",{value:C.uid,selected:C.uid===n.ownerId?"":void 0},[C.nombre])):[u("option",{value:n.ownerId||""},[n.ownerName||"Yo"])]),c=u("input",{class:"input",type:"text",placeholder:"Nota de contexto (opcional)"}),l=u("div",{class:"login__error",role:"alert",hidden:!0}),h=u("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),p=u("button",{class:"btn btn--gold",type:"submit"},["🎯 Crear negocio"]),m=u("form",{class:"nl-form"},[u("p",{class:"u-caption u-muted",style:{margin:"0"}},["✓ Hablaste con él · ✓ tiene presupuesto o forma de pago en mente · ✓ busca un carro concreto o una categoría"]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Vehículo *"}),s]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Valor estimado (COP) *"}),i]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Asesor responsable *"}),o]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Nota"}),c]),l,u("div",{class:"nl-actions"},[h,p])]),b=u("div",{class:"modal"},[u("div",{class:"modal__head"},[u("h2",{class:"modal__title",text:"Calificar → crear negocio"}),u("span",{class:"u-caption u-faint",text:(n.fullName||"Cliente")+" pasa al Pipeline; el lead queda congelado como histórico."})]),m]),A=u("div",{class:"modal-overlay"},[b]);document.body.appendChild(A);const P=()=>{A.remove(),window.removeEventListener("keydown",R)},R=C=>{C.key==="Escape"&&P()};window.addEventListener("keydown",R),A.addEventListener("mousedown",C=>{C.target===A&&P()}),h.addEventListener("click",P);let S=[];(z.get().mock?Promise.resolve([]):fy()).then(C=>{S=C,s.replaceChildren(u("option",{value:""},["— Elige un vehículo —"]),...C.map(k=>u("option",{value:k.id},[k.label+(k.precio?" · $"+k.precio.toLocaleString("es-CO"):"")])),u("option",{value:Gc},["Sin vehículo aún (buscando / retoma)"]))}).catch(()=>{s.replaceChildren(u("option",{value:Gc},["Sin vehículo aún"]))}),s.addEventListener("change",()=>{const C=S.find(k=>k.id===s.value);C&&C.precio&&!i.value&&(i.value=String(C.precio))}),m.addEventListener("submit",async C=>{C.preventDefault(),l.hidden=!0;const k=s.value,U=Math.round(Number(i.value)||0);if(!k)return V('Elige un vehículo o marca "Sin vehículo aún".');if(!(U>0))return V("El valor estimado es obligatorio (alimenta el pronóstico).");const x=o.value||n.ownerId;if(!x)return V("El negocio necesita un asesor responsable.");const M=r.find(g=>g.uid===x)?.nombre||n.ownerName||null,E=S.find(g=>g.id===k),w={vehicleId:k===Gc?null:k,vehicleName:E?E.label:"",amount:U,ownerId:x,ownerName:M,nota:c.value.trim()};p.disabled=!0,p.textContent="Creando…";try{if(z.get().mock){qR(hy(n,w)),H("🎯 Negocio creado (mock)","ok"),Aa("conversion",t,{mock:!0}),P(),e&&e({mock:!0});return}const g=await oC(n,w);Aa("conversion",t,{}),P(),dC(g,n),e&&e({dealId:g})}catch(g){p.disabled=!1,p.textContent="🎯 Crear negocio",V(g&&g.code==="permission-denied"?"Recarga el portal: tu versión está desactualizada.":"No se pudo crear el negocio. Intenta de nuevo.")}});function V(C){return l.textContent=C,l.hidden=!1,!1}}function dC(n,e){const t=u("button",{class:"btn btn--soft btn--sm",type:"button"},["Deshacer"]),r=u("div",{role:"status",style:{position:"fixed",bottom:"18px",left:"50%",transform:"translateX(-50%)",display:"flex",gap:"12px",alignItems:"center",zIndex:"99",padding:"10px 14px",borderRadius:"10px",background:"var(--bg-elev, #1c1a17)",border:"1px solid var(--line, #444)",boxShadow:"0 6px 24px rgba(0,0,0,.4)"}},[u("span",{text:`🎯 Negocio creado para ${(e.fullName||"el cliente").split(/\s+/)[0]}`}),t]);document.body.appendChild(r);const s=setTimeout(()=>r.remove(),1e4);t.addEventListener("click",async()=>{clearTimeout(s),t.disabled=!0,t.textContent="Anulando…";try{await aC(n),H("↩ Conversión anulada — el lead volvió a la Bandeja","ok")}catch(i){H("No se pudo anular: "+(i&&i.message||""),"error")}r.remove()})}const sn={wa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.477-.91zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>',person:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',flag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',expand:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',convert:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 12h6M13 9l3 3-3 3"/></svg>',call:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',more:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>'};function hC(){const n=(t,r)=>{const s=new Date;return s.setDate(s.getDate()+t),s.setHours(r,0,0,0),s.toISOString()},e=new Date(Date.now()+72e5).toISOString();return[{value:{subject:"Llamar al cliente",dueAt:n(1,9)},label:"Llamar mañana 9 am",icon:"📞"},{value:{subject:"Escribir por WhatsApp",dueAt:e},label:"WhatsApp en 2 horas",icon:"💬"},{value:{subject:"Hacer seguimiento",dueAt:n(3,9)},label:"Seguimiento en 3 días",icon:"🔁"},{value:"abrir360",label:"Agendar cita (abrir 360)",icon:"📅"},{value:null,label:"Sin próximo paso",icon:"⊘"}]}function my(n){const e={queue:"todo",filters:{type:"",channel:"",status:""},search:"",showClosed:!1,leads:[],loading:!0,error:null,hasMore:!1,cursor:null,sub:null},t=bt("crm.edit"),r=z.get().user&&z.get().user.uid,s=u("div",{class:"inbox__queues",role:"tablist","aria-label":"Colas"}),i=u("label",{class:"search","aria-label":"Buscar"},[u("span",{html:sn.search,"aria-hidden":"true"}),u("input",{type:"search",placeholder:"Buscar nombre, correo, teléfono…",autocomplete:"off"})]),o=u("div",{class:"inbox__filters"}),c=t?u("button",{class:"btn btn--gold btn--sm",type:"button",style:{marginLeft:"auto"}},["⚡ Lead rápido"]):null;c&&c.addEventListener("click",()=>XR());const l=t?u("button",{class:"btn btn--soft btn--sm",type:"button"},["＋ Completo"]):null;l&&l.addEventListener("click",()=>KR());const h=u("button",{class:"btn btn--soft btn--sm",type:"button"},["📋 Pendientes hoy"]);h.addEventListener("click",()=>M());const p=u("div",{class:"inbox__pendientes",hidden:!0}),m=u("div",{class:"inbox__toolbar"},[i,o,c,l,h]),b=u("div",{class:"inbox__list",role:"list",tabindex:"-1"}),A=u("p",{class:"u-muted u-caption",style:{margin:"0"}},["Aquí llegan los interesados: contacta y califica. Las ventas activas viven en el Pipeline."]),P=u("section",{class:"inbox"},[A,s,m,p,b]);pe(n),n.append(P);const R=i.querySelector("input");R.addEventListener("input",()=>{e.search=R.value,$()});async function S(F,j){if(_(F.id,{ownerId:j?j.uid:null,ownerName:j?j.nombre:null}),z.get().mock){H(j?`Asignado a ${j.nombre}`:"Sin asignar","ok");return}try{await RR(F.id,j),H(j?`Asignado a ${j.nombre}`:"Sin asignar","ok")}catch{H("No se pudo asignar","error")}}async function V(F,j,W={}){if(_(F.id,{status:j,...W,lastActivityAt:new Date().toISOString()}),z.get().mock){H(`Estado → ${jo(j).label}`,"ok");return}try{await CR(F.id,j,F,W),H(`Estado → ${jo(j).label}`,"ok")}catch{H("No se pudo cambiar el estado","error")}}function C(F,j){const W=Z_(F.phone,fC(F));if(!W){H("Este lead no tiene teléfono","error");return}window.open(W,"_blank","noopener"),!z.get().mock&&t&&pp(F.id,{type:"whatsapp",subject:"WhatsApp enviado",direction:"outbound",name:F.fullName}).catch(()=>{}),U(F,j)}function k(F,j){!z.get().mock&&t&&pp(F.id,{type:"llamada",subject:"Llamada registrada",direction:"outbound",name:F.fullName}).catch(()=>{}),H("📞 Llamada registrada","ok"),U(F,j)}function U(F,j){if(!t)return;const W=performance.now();Tt(j||document.body,hC(),ue=>{if(Aa("proximo_paso",W,{preset:ue.label}),!!ue.value){if(ue.value==="abrir360"){gt(F.id);return}if(z.get().mock){H("Próximo paso anotado (mock)","ok");return}PR(F.id,{subject:ue.value.subject,dueAt:ue.value.dueAt,name:F.fullName}).then(()=>H("✓ Próximo paso: "+ue.label,"ok")).catch(()=>H("No se pudo guardar el próximo paso","error"))}},{title:"¿Próximo paso con "+(F.fullName||"el cliente").split(/\s+/)[0]+"?"})}let x=!1;async function M(){x=!x,p.hidden=!x,x&&await E()}async function E(){if(pe(p),z.get().mock){p.append(u("div",{class:"u-muted u-caption",style:{padding:"10px"},text:"Pendientes no disponible en modo demo."}));return}p.append(u("div",{class:"u-muted u-caption",style:{padding:"10px"},text:"Cargando pendientes…"}));let F=[];try{F=await kR()}catch{pe(p),p.append(u("div",{class:"u-muted u-caption",style:{padding:"10px"},text:"No se pudieron cargar los pendientes."}));return}if(pe(p),p.append(u("div",{class:"inbox__listhead"},[u("span",{class:"u-muted u-caption",text:`📋 ${F.length} pendiente${F.length===1?"":"s"} (hoy y vencidos)`})])),!F.length){p.append(u("div",{class:"u-muted u-caption",style:{padding:"0 10px 10px"},text:"¡Al día! Registra llamadas/WhatsApps y elige “próximo paso” para que aparezcan aquí."}));return}const j=Date.now();F.forEach(W=>{const ue=new Date(W.dueAt).getTime()<j,ee=u("button",{class:"btn btn--soft btn--sm",type:"button",title:"Marcar hecho"},["✓ Hecho"]),Z=u("button",{class:"btn btn--ghost btn--sm",type:"button"},["Abrir 360"]),Ne=u("div",{class:"lead-card",style:{alignItems:"center"}},[u("span",{class:`badge badge--${ue?"danger":"gold"}`,text:ue?"VENCIDO":"HOY"}),u("div",{class:"u-grow"},[u("div",{class:"lead-card__name",text:(W.type==="cita"?"📅 ":"")+W.subject}),u("div",{class:"u-caption u-muted",text:`${W.relatedTo&&W.relatedTo.name?W.relatedTo.name+" · ":""}${nr(W.dueAt)}`})]),u("div",{class:"u-row u-row--tight"},[Z,t?ee:null])]);Z.addEventListener("click",()=>{W.relatedTo&&W.relatedTo.id&&gt(W.relatedTo.id)}),ee.addEventListener("click",async()=>{ee.disabled=!0;try{await xR(W.id),H("✓ Hecho","ok"),await E(),W.relatedTo&&W.relatedTo.id&&U({id:W.relatedTo.id,fullName:W.relatedTo.name||""},h)}catch{ee.disabled=!1,H("No se pudo completar","error")}}),p.append(Ne)})}function w(F){if(F.status==="convertido"){H("Ya es un negocio: gestiónalo en el Pipeline","info");return}py(F,{onDone:()=>_(F.id,{status:"convertido"})})}function g(){z.set({leads:e.leads})}function _(F,j){const W=e.leads.findIndex(ue=>ue.id===F);W!==-1&&(e.leads[W]=iy({...e.leads[W],...j}),g(),I())}function I(){T(),v(),$()}function T(){const F=yR(e.leads,r);pe(s),Nl.forEach(j=>{const W=e.queue===j.id,ue=u("button",{class:"chip"+(W?" chip--active":""),role:"tab","aria-selected":String(W),type:"button"},[u("span",{"aria-hidden":"true",text:j.icon}),u("span",{text:j.label}),u("span",{class:"chip__count",text:String(F[j.id]||0)})]);ue.addEventListener("click",()=>{e.queue=j.id,I()}),s.append(ue)})}function v(){if(pe(o),[{key:"type",label:"Tipo",items:[["","Todos"],["lead","Lead"],["cita","Cita"],["solicitud","Solicitud"],["pqr","PQR"]]},{key:"channel",label:"Canal",items:[["","Todos"],["web","Web"],["whatsapp","WhatsApp"],["bot","ALTOR Bot"],["cuenta","Cuenta"],["newsletter","Newsletter"],["cita","Cita web"]]},{key:"status",label:"Estado",items:[["","Todos"],...xl.map(j=>[j.id,j.label])]}].forEach(j=>{const W=e.filters[j.key],ue=W?(j.items.find(Z=>Z[0]===W)||[,j.label])[1]:j.label,ee=u("button",{class:"chip"+(W?" chip--active":""),type:"button","aria-haspopup":"menu"},[u("span",{text:ue}),u("span",{"aria-hidden":"true",text:"▾"})]);ee.addEventListener("click",()=>{Tt(ee,j.items.map(([Z,Ne])=>({value:Z,label:Ne,active:Z===W})),Z=>{e.filters[j.key]=Z.value,I()},{title:j.label})}),o.append(ee)}),e.filters.type||e.filters.channel||e.filters.status){const j=u("button",{class:"chip",type:"button"},["✕ Limpiar"]);j.addEventListener("click",()=>{e.filters={type:"",channel:"",status:""},I()}),o.append(j)}}function $(){if(e.loading)return tt();if(e.error)return Yt("⚠️","No se pudo cargar",e.error);const{rows:F,hiddenClosed:j}=ER(e.leads,{queue:e.queue,uid:r,filters:e.filters,search:e.search,showClosed:e.showClosed});if(pe(b),!F.length&&!j){const ee=e.search||e.filters.type||e.filters.channel||e.filters.status;b.append(Lt("🗂️",ee?"Sin resultados":"¡Bandeja al día!",ee?"Ajusta la búsqueda o los filtros.":"No hay clientes en esta cola."));return}const W=j||e.showClosed?u("button",{class:"chip",type:"button",style:{marginLeft:"auto"}},[e.showClosed?"✕ Ocultar cerrados":`${j} ocultos · ver todos`]):null;W&&W.addEventListener("click",()=>{e.showClosed=!e.showClosed,$()});const ue=u("div",{class:"inbox__listhead"},[u("span",{class:"u-muted u-caption",text:`${F.length} ${F.length===1?"cliente":"clientes"} activos`}),u("span",{class:"u-faint u-caption",text:"Ordenado por urgencia"}),W]);if(b.append(ue),!F.length&&j){b.append(Lt("🗂️","¡Bandeja al día!",`No hay clientes activos en esta cola (${j} cerrados ocultos).`));return}if(F.forEach(ee=>b.append(se(ee))),e.hasMore&&e.queue==="todo"&&!e.search){const ee=u("button",{class:"btn btn--soft btn--block",type:"button"},["Cargar más"]);ee.addEventListener("click",()=>ge(ee)),b.append(u("div",{class:"inbox__more"},[ee]))}}function se(F){const j=Hr[F._rating],W=jo(F.status),ue=!!(F.convertedTo&&F.convertedTo.dealId)||F.status==="convertido",ee=wR(F),Z=ee&&ee.state!=="ok"?u("span",{class:`badge badge--${ee.state==="late"?"danger":"gold"}`,title:"Tiempo sin primer contacto"},[`⏱ ${ee.mins<120?ee.mins+" min":jc(ee.mins*6e4)} sin contacto`]):null,Ne=F._sla,br=`sla-dot sla-dot--${Ne.state}`,Ir=Ne.closed?"Cerrado":Ne.state==="late"?`SLA vencido hace ${jc(Ne.remainingMs)}`:`Responder en ${jc(Ne.remainingMs)}`,Ts=[F._type.icon+" "+F._type.label,F.sourceDetail,F.vehicleOfInterestId?"🚗 "+F.vehicleOfInterestId:""].filter(Boolean).join(" · "),Dn=u("article",{class:"lead-card",role:"listitem",tabindex:"0","data-id":F.id,"aria-label":`${F.fullName}, ${j.label}`},[u("span",{class:br,title:Ir,"aria-label":Ir}),u("span",{class:"avatar avatar--sm","aria-hidden":"true",text:Hi(F.fullName)}),u("div",{class:"lead-card__main u-grow"},[u("div",{class:"lead-card__top"},[u("span",{class:"lead-card__name u-truncate",text:F.fullName}),u("span",{class:`temp ${j.cls}`,title:`Score ${F._score}/100`},[`${j.icon} ${F._score}`])]),u("div",{class:"lead-card__what u-truncate u-muted",text:Ts}),u("div",{class:"lead-card__meta u-caption"},[u("span",{class:"lead-card__chan",text:`${F._channel.icon} ${F._channel.label}`}),u("span",{class:"lead-card__dot",text:"·"}),u("span",{text:nr(F.createdAt)}),u("span",{class:"lead-card__dot",text:"·"}),ue?u("button",{class:"badge badge--ok",type:"button","data-action":"pipeline",title:"Este lead ya es un negocio: gestiónalo en el Pipeline",style:{cursor:"pointer",border:"none"}},[F.convertedTo&&F.convertedTo.outcome==="perdido"?"✖ Negocio perdido → Pipeline":F.convertedTo&&F.convertedTo.outcome==="vendido"?"🏆 VENDIDO":`🎯 ${F.convertedTo&&F.convertedTo.stageName||"Convertido"} → Pipeline`]):u("span",{class:`badge badge--${W.badge||""}`.trim(),text:W.label}),F.archived?u("span",{class:"badge",text:"🗄 Archivado"}):null,Z?u("span",{class:"lead-card__dot",text:"·"}):null,Z,F.ownerName?u("span",{class:"lead-card__dot",text:"·"}):null,F.ownerName?u("span",{class:"u-faint",text:"👤 "+F.ownerName}):null]),u("div",{class:"lead-card__nba"},[u("span",{"aria-hidden":"true",text:F._nba.icon}),u("span",{class:"u-muted",text:"Próx: "}),u("strong",{text:F._nba.label})])]),u("div",{class:"lead-card__actions"},[ae("wa",sn.wa,"WhatsApp","btn--wa"),t?ae("call",sn.call,"Registrar llamada"):null,t?ae("assign",sn.person,"Asignar"):null,t&&!ue?ae("status",sn.flag,"Cambiar estado"):null,t&&!ue?ae("convert",sn.convert,"Convertir a oportunidad"):null,t?ae("more",sn.more,"Más acciones"):null,ae("open",sn.expand,"Abrir 360")])]);return Dn.addEventListener("click",Nn=>{const As=Nn.target.closest("[data-action]");if(As){We(As.dataset.action,F,As);return}gt(F.id)}),Dn.addEventListener("keydown",Nn=>{Nn.key==="Enter"?gt(F.id):Nn.key.toLowerCase()==="w"&&C(F)}),Dn}function ae(F,j,W,ue=""){return u("button",{class:`icon-btn ${ue}`.trim(),type:"button","data-action":F,title:W,"aria-label":W},[u("span",{html:j,"aria-hidden":"true"})])}const he={nuevo:"Acaba de entrar, nadie le ha hablado",contactado:"Ya le escribiste o llamaste",descartado:"No va: inalcanzable, no califica, spam… (pide la razón)"};function We(F,j,W){if(F==="open")return gt(j.id);if(F==="wa")return C(j,W);if(F==="call")return k(j,W);if(F==="convert")return w(j);if(F==="pipeline"){window.location.hash="#/pipeline";return}if(F==="assign"){const ue=z.get().team||[],ee=[{value:null,label:"Sin asignar",icon:"⊘",active:!j.ownerId},...ue.map(Z=>({value:Z,label:Z.nombre,hint:Z.cargo,icon:"👤",active:j.ownerId===Z.uid}))];return Tt(W,ee,Z=>S(j,Z.value),{title:"Asignar a"})}if(F==="status"){if(j.convertedTo&&j.convertedTo.dealId){H("Este lead ya es un negocio: gestiónalo en el Pipeline.","info");return}const ue=xl.filter(ee=>ee.id!=="convertido").map(ee=>({value:ee.id,label:ee.label,hint:he[ee.id]||"",active:(j.status||"nuevo")===ee.id}));return Tt(W,ue,ee=>{if(ee.value==="descartado"){Tt(W,uR.map(Z=>({value:Z.id,label:Z.label})),Z=>V(j,"descartado",{discardReason:Z.value}),{title:"¿Por qué se descarta?"});return}V(j,ee.value)},{title:"Cambiar estado"})}if(F==="more"){const ue=[j.archived?{value:"unarchive",label:"Restaurar de archivados",icon:"↩️"}:{value:"archive",label:"Archivar",icon:"🗄",hint:"Sale de las vistas; reversible"},bt("crm.delete")?{value:"purge",label:"Eliminar definitivo",icon:"🗑",hint:"Solo pruebas/spam — borra TODO su rastro"}:null].filter(Boolean);return Tt(W,ue,async ee=>{if(ee.value==="archive"||ee.value==="unarchive"){const Z=ee.value==="archive";if(_(j.id,{archived:Z}),z.get().mock){H(Z?"🗄 Archivado":"↩️ Restaurado","ok");return}try{await DR(j.id,Z),H(Z?"🗄 Archivado":"↩️ Restaurado","ok")}catch{_(j.id,{archived:!Z}),H("No se pudo archivar","error")}return}if(ee.value==="purge"){if(!navigator.onLine){H("Eliminar definitivo necesita señal.","error");return}if(!window.confirm('🗑 ¿Eliminar DEFINITIVAMENTE a "'+j.fullName+`"?

Borra el lead, sus actividades, negocios y su contacto si queda huérfano. Esto es SOLO para pruebas/spam — un cliente real se ARCHIVA.`)||!window.confirm("Última confirmación: esta acción NO se puede deshacer. ¿Eliminar?"))return;if(z.get().mock){H("Eliminado (mock)","ok");return}try{const Z=await NR(j.id);H(`🗑 Eliminado: ${Z.activities} actividades, ${Z.deals} negocios${Z.contactDeleted?", contacto":""}`,"ok")}catch(Z){H(Z.message&&Z.message.includes("Super Admin")?"Solo el Super Admin puede eliminar.":"No se pudo eliminar: "+(Z.message||Z.code),"error")}}},{title:"Más acciones"})}}function gt(F){z.set({detailLeadId:F})}function Lt(F,j,W){return u("div",{class:"state"},[u("div",{class:"state__icon","aria-hidden":"true",text:F}),u("div",{class:"state__title",text:j}),u("div",{class:"state__msg",text:W})])}function Yt(F,j,W){pe(b),b.append(Lt(F,j,W))}function tt(){pe(b);for(let F=0;F<6;F++)b.append(u("div",{class:"lead-card lead-card--skeleton"},[u("span",{class:"skeleton",style:{width:"30px",height:"30px",borderRadius:"50%"}}),u("div",{class:"u-grow u-stack",style:{gap:"8px"}},[u("span",{class:"skeleton",style:{width:"46%",height:"14px"}}),u("span",{class:"skeleton",style:{width:"70%",height:"12px"}})])]))}async function ge(F){if(e.cursor){F.disabled=!0,F.textContent="Cargando…";try{const{rows:j,lastDoc:W,hasMore:ue}=await AR({after:e.cursor}),ee=wo(j),Z=new Set(e.leads.map(Ne=>Ne.id));e.leads.push(...ee.filter(Ne=>!Z.has(Ne.id))),e.cursor=W,e.hasMore=ue,g(),I()}catch{H("No se pudo cargar más","error"),F.disabled=!1,F.textContent="Cargar más"}}}function nt(){if(z.get().mock){z.set({team:ay()}),e.leads=wo(Ta()),e.loading=!1,e.hasMore=!1,g(),I(),e.dirtyHandler=()=>{e.leads=wo(Ta()),g(),I()},window.addEventListener("altorra:leads-dirty",e.dirtyHandler);return}SR().catch(()=>{}),e.sub=TR({pageSize:40,onData:(F,j)=>{e.leads=wo(F),e.cursor=e.sub?e.sub.getLastDoc():null,e.hasMore=j.hasMore,e.loading=!1,e.error=null,g(),I()},onError:F=>{console.error("[inbox] error de suscripción:",F),e.loading=!1,e.error=F&&F.code==="permission-denied"?"Tu cuenta no tiene permiso para ver el CRM.":"Revisa tu conexión e inténtalo de nuevo.",I()}})}return I(),nt(),function(){e.sub&&e.sub.unsubscribe&&e.sub.unsubscribe(),e.sub=null,e.dirtyHandler&&(window.removeEventListener("altorra:leads-dirty",e.dirtyHandler),e.dirtyHandler=null)}}function fC(n){const e=String(n.fullName||"").trim().split(/\s+/)[0]||"",t=n.vehicleOfInterestId?` por el vehículo ${n.vehicleOfInterestId}`:"";return`Hola ${e}, te saluda Altorra Cars 👋. Vimos tu interés${t}. ¿En qué te podemos ayudar?`}function pC(n){const e={deals:[],loading:!0,error:null,sub:null,dragId:null},t=bt("crm.edit"),r=u("div",{class:"pipeline__bar"}),s=u("div",{class:"pipeline__board",role:"list","aria-label":"Embudo de ventas"}),i=u("p",{class:"u-muted u-caption",style:{margin:"0"}},["Aquí se trabajan las ventas activas. Los interesados nuevos llegan a la Bandeja."]),o=u("section",{class:"pipeline"},[i,r,s]);pe(n),n.append(o);function c(_,I){const T=e.deals.findIndex(v=>v.id===_);T!==-1&&(e.deals[T]={...e.deals[T],...I},z.get().mock&&jR(_,I),R())}async function l(_,I){if(_.stageId===I)return;const T=gp(_.stageId,I);if(!T.ok){H(T.error==="vendido_es_terminal"?"Un negocio vendido no se mueve (anulación = admin).":"Movimiento no válido","error");return}const v=[...T.gates];T.needsReason&&v.push("regressReason");const $=async se=>{const ae=Mr(I),he=_.stageId;if(c(_.id,{stageId:I,stageName:ae.label,probability:ae.prob,...se,lastActivityAt:new Date().toISOString()}),z.get().mock){H("Etapa → "+ae.label,"ok");return}try{await yp(_.id,I,_,se),p(_,he,ae.label)}catch(We){c(_.id,{stageId:he,stageName:Mr(he).label,probability:ai(he)}),H(We&&We.code==="permission-denied"?"Movimiento rechazado por las reglas — recarga el portal si tu versión es vieja.":"No se pudo mover","error")}};if(!v.length)return $({});m(_,I,v,$)}let h=null;function p(_,I,T){h&&h.remove();const v=u("button",{class:"btn btn--soft btn--sm",type:"button"},["Deshacer"]),$=u("div",{role:"status",style:{position:"fixed",bottom:"18px",left:"50%",transform:"translateX(-50%)",display:"flex",gap:"12px",alignItems:"center",zIndex:"99",padding:"10px 14px",borderRadius:"10px",background:"var(--bg-elev, #1c1a17)",border:"1px solid var(--line, #444)",boxShadow:"0 6px 24px rgba(0,0,0,.4)"}},[u("span",{text:`${(_.contactName||_.name||"Negocio").split(" · ")[0]} → ${T}`}),v]);document.body.appendChild($),h=$;const se=setTimeout(()=>{$.remove(),h===$&&(h=null)},1e4);v.addEventListener("click",async()=>{clearTimeout(se),$.remove(),h===$&&(h=null);const ae=Mr(I);if(c(_.id,{stageId:I,stageName:ae.label,probability:ae.prob}),!z.get().mock)try{await yp(_.id,I,_,{regressReason:"Deshacer (arrastre accidental)"})}catch{H("No se pudo deshacer","error")}})}function m(_,I,T,v){const $={},se=[],ae=(ge,nt)=>u("label",{class:"field"},[u("span",{class:"field__label",text:ge}),nt]);if(T.includes("huboTestDrive")&&($.huboTestDrive=u("select",{class:"select"},[u("option",{value:"si"},["Sí, hubo test drive"]),u("option",{value:"no"},["No alcanzó a probarlo"])]),se.push(ae("¿Hubo test drive?",$.huboTestDrive))),T.includes("montoApartado")){$.montoApartado=u("input",{class:"input",type:"number",min:"0",step:"50000",placeholder:"500000"});const ge=new Date(Date.now()+72*3600*1e3);$.venceEl=u("input",{class:"input",type:"date",value:ge.toISOString().slice(0,10)}),se.push(ae("Monto del apartado (COP) *",$.montoApartado),ae("Vence el (default 72h)",$.venceEl))}T.includes("tipoPago")&&($.tipoPago=u("select",{class:"select"},[u("option",{value:"contado"},["De contado"]),u("option",{value:"financiado"},["Financiado"])]),$.estadoCredito=u("select",{class:"select"},[u("option",{value:""},["— Estado del crédito —"]),u("option",{value:"pre_aprobado"},["Pre-aprobado"]),u("option",{value:"en_estudio"},["En estudio"]),u("option",{value:"aprobado"},["Aprobado"]),u("option",{value:"rechazado"},["Rechazado"])]),se.push(ae("Forma de pago *",$.tipoPago),ae("Crédito (si aplica)",$.estadoCredito))),T.includes("lostReason")&&($.lostReason=u("select",{class:"select"},_p.map(ge=>u("option",{value:ge.id},[ge.label]))),se.push(ae("¿Por qué se perdió? *",$.lostReason))),T.includes("regressReason")&&($.regressReason=u("input",{class:"input",type:"text",placeholder:"¿Qué pasó? (obligatorio al retroceder)"}),se.push(ae("Razón del retroceso *",$.regressReason)));const he=u("div",{class:"login__error",role:"alert",hidden:!0}),We=u("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),gt=u("button",{class:"btn btn--gold",type:"submit"},["Mover a "+Mr(I).label]),Lt=u("form",{class:"nl-form"},[...se,he,u("div",{class:"nl-actions"},[We,gt])]),Yt=u("div",{class:"modal-overlay"},[u("div",{class:"modal"},[u("div",{class:"modal__head"},[u("h2",{class:"modal__title",text:Mr(I).label})]),Lt])]);document.body.appendChild(Yt);const tt=()=>Yt.remove();We.addEventListener("click",tt),Yt.addEventListener("mousedown",ge=>{ge.target===Yt&&tt()}),Lt.addEventListener("submit",ge=>{ge.preventDefault();const nt={};if($.huboTestDrive&&(nt.huboTestDrive=$.huboTestDrive.value==="si"),$.montoApartado){const F=Math.round(Number($.montoApartado.value)||0);if(!(F>0)){he.textContent="El monto del apartado es obligatorio.",he.hidden=!1;return}nt.montoApartado=F,nt.venceEl=new Date(($.venceEl.value||new Date().toISOString().slice(0,10))+"T18:00:00-05:00").toISOString()}if($.tipoPago&&(nt.tipoPago=$.tipoPago.value,$.estadoCredito&&$.estadoCredito.value&&(nt.estadoCredito=$.estadoCredito.value)),$.lostReason&&(nt.lostReason=$.lostReason.value),$.regressReason){const F=$.regressReason.value.trim();if(!F){he.textContent="Escribe la razón del retroceso.",he.hidden=!1;return}nt.regressReason=F}tt(),v(nt)})}async function b(_,I){if(c(_.id,{amount:I}),!z.get().mock)try{await cC(_.id,I,_)}catch{H("No se pudo guardar el monto","error")}}async function A(_){const I=gp(_.stageId,"vendido");if(!I.ok){H("Movimiento no válido","error");return}const T=async v=>{if(c(_.id,{status:"won",...v}),z.get().mock){H("🎉 ¡Venta ganada!","ok");return}try{await lC(_.id,_,v),H("🎉 ¡Venta ganada!","ok")}catch{H("No se pudo marcar — revisa los datos requeridos","error")}};if(!I.gates.length)return T({});m(_,"vendido",I.gates,T)}async function P(_,I){if(c(_.id,{status:"lost",lostReason:I}),z.get().mock){H("Marcado perdido","info");return}try{await uC(_.id,I,_),H("Marcado perdido","info")}catch{H("Error","error")}}function R(){if(e.loading)return w();if(e.error)return E("⚠️","No se pudo cargar",e.error);const _=e.deals.filter(T=>T.status==="open");if(S(_),pe(s),!_.length){s.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:"🎯"}),u("div",{class:"state__title",text:"Embudo vacío"}),u("div",{class:"state__msg",text:"Convierte un lead en oportunidad desde la Bandeja para empezar."})]));return}const I=nC(_);oi.forEach(T=>{const v=I[T.id]||[],$=v.reduce((ae,he)=>ae+(Number(he.amount)||0),0),se=u("div",{class:"pcol","data-stage":T.id},[u("div",{class:"pcol__head"},[u("div",{class:"u-row u-row--tight"},[u("span",{class:"pcol__dot",style:{background:mC(T.id)}}),u("strong",{text:T.label}),u("span",{class:"pcol__count",text:String(v.length)})]),u("span",{class:"u-caption u-faint",text:`${Math.round(T.prob*100)}% · ${Xs($)||"$0"}`})]),u("div",{class:"pcol__drop","data-stage":T.id,role:"list"},v.map(C))]);M(se.querySelector(".pcol__drop"),T.id),s.append(se)})}function S(_){const I=dy(_),T=eC(_);pe(r),r.append(V("Oportunidades",String(_.length)),V("Valor del embudo",Xs(T)||"$0"),V("Forecast ponderado",Xs(I)||"$0",!0))}function V(_,I,T){return u("div",{class:"pstat"+(T?" pstat--hi":"")},[u("span",{class:"u-caption u-faint",text:_}),u("strong",{class:"pstat__v",text:I})])}function C(_){const I=tC(_),T=u("button",{class:"deal-card__amount",type:"button","data-action":"amount",title:"Editar monto"},[_.amount?Xs(_.amount):"+ monto"]),v=u("article",{class:"deal-card"+(I?" is-rotting":""),draggable:"true",tabindex:"0","data-id":_.id,"data-stage":_.stageId,role:"listitem","aria-label":`${_.name}, ${Math.round(ai(_.stageId)*100)}%`},[u("div",{class:"deal-card__top"},[u("span",{class:"avatar avatar--sm","aria-hidden":"true",text:Hi(_.contactName)}),u("span",{class:"deal-card__name u-grow u-truncate",text:_.name}),I?u("span",{class:"deal-card__rot",title:"Estancado >14 días",text:"🐌"}):null]),_.vehicleName?u("div",{class:"u-caption u-muted u-truncate",text:"🚗 "+_.vehicleName}):null,u("div",{class:"deal-card__row"},[T,u("span",{class:"badge badge--gold",text:`${Math.round(ai(_.stageId)*100)}%`})]),u("div",{class:"deal-card__foot u-caption u-faint"},[u("span",{class:"u-grow u-truncate",text:_.ownerName?"👤 "+_.ownerName:"Sin asesor"}),u("span",{text:nr(_.lastActivityAt)})]),u("div",{class:"deal-card__actions"},t?[k("stage","↔","Mover etapa"),k("won","✓","Marcar ganado"),k("lost","✕","Marcar perdido"),k("open","⤢","Abrir 360")]:[k("open","⤢","Abrir 360")])]);return v.addEventListener("dragstart",$=>{e.dragId=_.id,v.classList.add("is-dragging");try{$.dataTransfer.setData("text/plain",_.id),$.dataTransfer.effectAllowed="move"}catch{}}),v.addEventListener("dragend",()=>{e.dragId=null,v.classList.remove("is-dragging")}),v.addEventListener("click",$=>{const se=$.target.closest("[data-action]");if(se)return U(se.dataset.action,_,se)}),v}function k(_,I,T){return u("button",{class:"icon-btn icon-btn--xs",type:"button","data-action":_,title:T,"aria-label":T,draggable:"false"},[I])}function U(_,I,T){if(_==="open")return z.set({detailLeadId:I.leadId});if(_==="amount")return x(I,T);if(_==="stage")return Tt(T,oi.map(v=>({value:v.id,label:v.label,hint:Math.round(v.prob*100)+"%",active:v.id===I.stageId})),v=>l(I,v.value),{title:"Mover a etapa"});if(_==="won")return A(I);if(_==="lost")return Tt(T,_p.map(v=>({value:v.id,label:v.label})),v=>P(I,v.value),{title:"Motivo de pérdida"})}function x(_,I){const T=u("input",{class:"deal-card__amount-input",type:"text",inputmode:"numeric",value:_.amount||"","aria-label":"Monto en COP"});I.replaceWith(T),T.focus(),T.select();const v=()=>{const $=parseInt(String(T.value).replace(/\D/g,""),10)||0;b(_,$)};T.addEventListener("keydown",$=>{$.key==="Enter"?($.preventDefault(),v()):$.key==="Escape"&&R()}),T.addEventListener("blur",v)}function M(_,I){_.addEventListener("dragover",T=>{T.preventDefault(),_.classList.add("is-over"),T.dataTransfer&&(T.dataTransfer.dropEffect="move")}),_.addEventListener("dragleave",()=>_.classList.remove("is-over")),_.addEventListener("drop",T=>{T.preventDefault(),_.classList.remove("is-over");const v=e.dragId||T.dataTransfer&&T.dataTransfer.getData("text/plain"),$=e.deals.find(se=>se.id===v);$&&l($,I)})}function E(_,I,T){pe(s),s.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:_}),u("div",{class:"state__title",text:I}),u("div",{class:"state__msg",text:T})]))}function w(){pe(r),pe(s),oi.slice(0,5).forEach(()=>{s.append(u("div",{class:"pcol"},[u("div",{class:"pcol__head"},[u("span",{class:"skeleton",style:{width:"60%",height:"14px"}})]),u("div",{class:"pcol__drop"},[1,2].map(()=>u("div",{class:"deal-card",style:{pointerEvents:"none"}},[u("span",{class:"skeleton",style:{width:"100%",height:"52px"}})])))]))})}function g(){if(z.get().mock){e.deals=cy(),e.loading=!1,R();return}e.sub=iC({pageSize:150,onData:_=>{e.deals=_,e.loading=!1,e.error=null,R()},onError:_=>{e.loading=!1,e.error=_&&_.code==="permission-denied"?"Sin permiso para ver el pipeline.":"Revisa tu conexión.",R()}})}return R(),g(),function(){e.sub&&e.sub(),e.sub=null}}function mC(n){return{nuevo:"var(--temp-cold)",contactado:"var(--info)",cita_agendada:"#8A7CFF",visito:"var(--gold-500)",test_drive:"var(--gold-600)",negociacion:"var(--warning)",financiacion:"var(--success)"}[n]||"var(--ink-400)"}const gC=["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"],vp=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];function ki(n){const e=n.getFullYear(),t=String(n.getMonth()+1).padStart(2,"0"),r=String(n.getDate()).padStart(2,"0");return`${e}-${t}-${r}`}function gy(n,e){const r=(new Date(n,e,1).getDay()+6)%7,s=new Date(n,e+1,0).getDate(),i=[];for(let c=0;c<r;c++)i.push({date:new Date(n,e,1-r+c),inMonth:!1});for(let c=1;c<=s;c++)i.push({date:new Date(n,e,c),inMonth:!0});for(;i.length%7!==0;){const c=i[i.length-1].date;i.push({date:new Date(c.getFullYear(),c.getMonth(),c.getDate()+1),inMonth:!1})}const o=[];for(let c=0;c<i.length;c+=7)o.push(i.slice(c,c+7));return o}function _C(n,e){const t=gy(n,e),r=t[0][0].date,i=t[t.length-1][6].date,o=new Date(i.getFullYear(),i.getMonth(),i.getDate()+1);return{startISO:r.toISOString(),endISO:o.toISOString()}}function yC(n){const e={};for(const t of n){if(!t.dueAt)continue;const r=ki(new Date(t.dueAt));(e[r]||(e[r]=[])).push(t)}for(const t of Object.keys(e))e[t].sort((r,s)=>new Date(r.dueAt)-new Date(s.dueAt));return e}function bp(n){const e=new Date(n);return Number.isNaN(e.getTime())?"":e.toLocaleTimeString("es-CO",{hour:"2-digit",minute:"2-digit"})}function vC(n,e){return n.getFullYear()===e.getFullYear()&&n.getMonth()===e.getMonth()&&n.getDate()===e.getDate()}const bC=n=>({id:n.id,...n.data()});function IC(n,e,t,r){const s=mt(Pe(ie,"activities"),ls("dueAt",">=",n),ls("dueAt","<",e),Dt("dueAt","asc"));return vr(s,i=>t(i.docs.map(bC)),i=>r&&r(i))}async function zn(n,e,t){return(await Is(ws,"crmCitaAction")({action:n,solicitudId:e||null,payload:t||{}})).data}async function wC(n){const e=await yr(De(ie,"solicitudes",n));return e.exists()?{id:e.id,...e.data()}:null}async function _y(){const n=await yr(De(ie,"config","availability"));return n.exists()?n.data():{}}async function yy(){const n=await yr(De(ie,"config","bookedSlots"));return n.exists()?n.data():{}}const EC=["super_admin","admin","editor","asesor","moderator"];let Ao=null;async function vy(){if(Ao)return Ao;const n=z.get(),e=new Map;try{(await Sn(mt(Pe(ie,"usuarios"),wt(50)))).docs.forEach(r=>{const s=r.data();s.bloqueado!==!0&&(!EC.includes(s.rol)&&!s.roleId||e.set(r.id,{uid:r.id,nombre:s.nombre||s.email||r.id,rol:s.rol||s.roleId||""}))})}catch{try{const r=await yr(De(ie,"config","crmIntake"));(r.exists()&&Array.isArray(r.data().rotation)?r.data().rotation:[]).forEach(i=>{const o=typeof i=="string"?i:i.uid;o&&e.set(o,{uid:o,nombre:typeof i=="object"&&i.nombre||o,rol:""})})}catch{}}return n.user&&!e.has(n.user.uid)&&e.set(n.user.uid,{uid:n.user.uid,nombre:n.profile&&n.profile.nombre||n.user.email||"Yo",rol:n.profile&&n.profile.rol||""}),Ao=Array.from(e.values()),Ao}const TC={pendiente:"🕐 Pendiente (sin confirmar)",confirmada:"✅ Confirmada",reprogramada:"🔁 Reprogramada (re-confirmar)",completada:"🏁 Completada",cancelada:"✖ Cancelada",no_show:"🚫 No asistió",caducada:"⏳ Caducada (no confirmó)"},AC=["pendiente","confirmada","reprogramada"],SC="";function RC(){const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`}function by(n,e,t){const r=u("div",{class:"modal"},[u("div",{class:"modal__head"},[u("h2",{class:"modal__title",text:n}),e?u("span",{class:"u-caption u-faint",text:e}):null]),...t]),s=u("div",{class:"modal-overlay"},[r]);document.body.appendChild(s);const i=()=>{s.remove(),window.removeEventListener("keydown",o)},o=c=>{c.key==="Escape"&&i()};return window.addEventListener("keydown",o),s.addEventListener("mousedown",c=>{c.target===s&&i()}),{overlay:s,card:r,close:i}}function Bn(n,e){return e?u("div",{class:"cita-row"},[u("span",{class:"cita-row__k u-caption u-muted",text:n}),u("span",{class:"cita-row__v",text:String(e)})]):null}function CC(n,e,t){if(!t)return[];if(Array.isArray(n.blockedDates)&&n.blockedDates.includes(t))return[];const r=new Date(t+"T12:00:00Z").getUTCDay();if(!(Array.isArray(n.days)?n.days:[1,2,3,4,5,6]).includes(r))return[];const s=Array.isArray(e[t])?e[t]:[],i=n.blockedHours&&n.blockedHours[t]||[],o=[],c=n.interval||60;for(let l=(n.startHour??9)*60;l<(n.endHour??17)*60;l+=c){const h=`${String(Math.floor(l/60)).padStart(2,"0")}:${String(l%60).padStart(2,"0")}`;!s.includes(h)&&!i.includes(h)&&o.push(h)}return o}function Iy(n,e,{fecha:t,hora:r}={}){const s=u("input",{class:"input",type:"date",min:RC(),value:t||""}),i=u("select",{class:"select"},[u("option",{value:"",text:"— hora —"})]);function o(){const c=CC(n,e,s.value);i.replaceChildren(u("option",{value:"",text:c.length?"— hora —":"Sin horarios ese día"}),...c.map(l=>u("option",{value:l,text:l}))),r&&c.includes(r)&&(i.value=r)}return s.addEventListener("change",o),t&&o(),{dateIn:s,hourSel:i,value:()=>({fecha:s.value,hora:i.value})}}async function wy(n){const e=u("select",{class:"select"},[u("option",{value:"",text:"Cargando…"})]),t=await vy();e.replaceChildren(u("option",{value:"",text:"— asesor —"}),...t.map(s=>u("option",{value:s.uid,text:s.nombre})));const r=z.get().user;return e.value=n&&t.some(s=>s.uid===n)?n:r&&t.some(s=>s.uid===r.uid)?r.uid:"",e._advisors=t,e}async function Ey(n){const e=u("select",{class:"select"},[u("option",{value:SC,text:"Sin vehículo asignado"})]);try{const t=await fy();e.append(...t.map(r=>u("option",{value:r.id,text:r.label}))),n&&(e.value=n),e._vehicles=t}catch{e._vehicles=[]}return e}function PC(n,e){const t=String(n.whatsapp||n.telefono||"").replace(/\D/g,"");if(!t)return null;const r=t.length===10&&t.startsWith("3")?"57"+t:t.startsWith("57")?t:String(n.prefijoPais||"57").replace(/\D/g,"")+t,s=`Hola ${n.nombre||""}! Te escribo de ALTORRA CARS por tu cita del ${n.fecha||""} a las ${n.hora||""}`+(n.vehiculo?` para ver el ${n.vehiculo}`:"")+`. Confírmala aquí 👉 ${e}`;return`https://wa.me/${r}?text=${encodeURIComponent(s)}`}async function kC(n,{onLead:e}={}){const t=n.sourceSolicitudId;if(!t)return;if(z.get().mock){H("En demo las citas web no tienen acciones.","info");return}let r;try{r=await wC(t)}catch{r=null}if(!r){H("No se pudo cargar la cita.","error");return}const s=bt("crm.edit"),i=AC.includes(r.estado),o=u("div",{class:"nl-form"}),c=u("div",{class:"login__error",role:"alert",hidden:!0}),l=A=>{c.textContent=A,c.hidden=!1},{close:h}=by("Cita · "+(r.nombre||"Cliente"),TC[r.estado]||r.estado,[o]);function p(){return u("div",{class:"cita-info"},[Bn("Cuándo",(r.fecha||"")+(r.hora?" · "+r.hora:"")),Bn("Tipo",r.tipo),Bn("Vehículo",r.vehiculo),Bn("Teléfono",(r.prefijoPais||"")+" "+(r.whatsapp||r.telefono||"")),Bn("Asesor",r.assignedToName||r.assignedTo),r.confirmedAt?Bn("Confirmó",(r.confirmedVia||"")+" · "+String(r.confirmedAt).slice(0,16).replace("T"," ")):null,r._tupleConflict?u("div",{class:"cita-conflict",text:"⚠️ El cliente confirmó pero el horario CHOCA con otra cita del asesor — reprograma una de las dos."}):null,r._requiereReagendar?u("div",{class:"cita-conflict",text:"🚗 El carro de esta cita ya no está disponible — ofrece otro o reagenda."}):null,Bn("Notas",r.comentarios||r.mensaje)])}async function m(A,P){c.hidden=!0;try{await P(),H(A,"ok"),h(),e&&r._leadId&&e(r._leadId)}catch(R){l(R&&R.message||"No se pudo completar la acción.")}}async function b(){if(o.replaceChildren(p(),c),!s||!i){if(r._leadId){const C=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"Ver cliente (360)"});C.addEventListener("click",()=>{h(),z.set({detailLeadId:r._leadId})}),o.append(C)}return}const A=u("div",{class:"cita-actions"}),P=u("button",{class:"btn btn--gold btn--sm",type:"button",text:"📲 Pedir confirmación por WhatsApp"});P.addEventListener("click",async()=>{P.disabled=!0;try{const C=await zn("getConfirmLink",r.id),k=PC(r,C.url);if(!k){l("La cita no tiene teléfono."),P.disabled=!1;return}window.open(k,"_blank","noopener"),H("Mensaje listo en WhatsApp — el cliente confirma tocando el link.","ok"),P.disabled=!1}catch(C){l(C&&C.message||"No se pudo generar el link."),P.disabled=!1}});const R=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"✓ Confirmar (asignar asesor)"});R.addEventListener("click",async()=>{o.replaceChildren(p(),c,u("p",{class:"u-caption u-muted",text:"Confirmar reserva el bloque del asesor (y del carro si aplica)."}));const C=await wy(r.assignedTo),k=await Ey(r.vehicleAssignedId||r.vehiculoId),U=u("select",{class:"select"},[u("option",{value:"manual",text:"El cliente confirmó (llamada/persona)"}),u("option",{value:"whatsapp",text:"El cliente confirmó por WhatsApp"}),u("option",{value:"email",text:"El cliente confirmó por email"})]),x=u("button",{class:"btn btn--gold btn--sm",type:"button",text:"✓ Confirmar cita"}),M=u("button",{class:"btn btn--ghost btn--sm",type:"button",text:"‹ Volver"});M.addEventListener("click",b),x.addEventListener("click",()=>{if(!C.value){l("Elige el asesor.");return}const E=(C._advisors||[]).find(g=>g.uid===C.value)?.nombre||null,w=(k._vehicles||[]).find(g=>g.id===k.value);m("✅ Cita confirmada",()=>zn("confirm",r.id,{asesorId:C.value,asesorName:E,canal:U.value,vehicleId:k.value||null,vehicleName:w?w.label:null}))}),o.append(u("label",{class:"field"},[u("span",{class:"field__label",text:"Asesor *"}),C]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Vehículo"}),k]),u("label",{class:"field"},[u("span",{class:"field__label",text:"¿Cómo confirmó?"}),U]),u("div",{class:"nl-actions"},[M,x]))});const S=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"🔁 Reprogramar"});S.addEventListener("click",async()=>{o.replaceChildren(p(),c,u("p",{class:"u-caption u-muted",text:"Al reprogramar, el link viejo de confirmación deja de servir y el cliente debe re-confirmar."}));const[C,k]=await Promise.all([_y(),yy()]),U=Iy(C,k,{}),x=u("button",{class:"btn btn--gold btn--sm",type:"button",text:"🔁 Mover cita"}),M=u("button",{class:"btn btn--ghost btn--sm",type:"button",text:"‹ Volver"});M.addEventListener("click",b),x.addEventListener("click",()=>{const{fecha:E,hora:w}=U.value();if(!E||!w){l("Elige fecha y hora.");return}m("🔁 Cita reprogramada — pídele re-confirmar por WhatsApp",()=>zn("reschedule",r.id,{fecha:E,hora:w}))}),o.append(u("div",{class:"cfg-row"},[U.dateIn,U.hourSel]),u("div",{class:"nl-actions"},[M,x]))});const V=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"✖ Cancelar cita"});if(V.addEventListener("click",()=>{o.replaceChildren(p(),c);const C=u("input",{class:"input",type:"text",placeholder:"Motivo (le llega al cliente por email)"}),k=u("button",{class:"btn btn--gold btn--sm",type:"button",text:"Confirmar cancelación"}),U=u("button",{class:"btn btn--ghost btn--sm",type:"button",text:"‹ Volver"});U.addEventListener("click",b),k.addEventListener("click",()=>m("✖ Cita cancelada (cupo liberado)",()=>zn("cancel",r.id,{motivo:C.value.trim()}))),o.append(C,u("div",{class:"nl-actions"},[U,k]))}),A.append(P,R,S,V),r.estado!=="pendiente"){const C=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"🏁 Completada"});C.addEventListener("click",()=>m("🏁 Cita completada",()=>zn("complete",r.id)));const k=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"🚫 No asistió"});k.addEventListener("click",()=>m("🚫 No-show registrado — mañana 9am te recuerda llamarlo",()=>zn("no_show",r.id))),A.append(C,k)}if(r._leadId){const C=u("button",{class:"btn btn--ghost btn--sm",type:"button",text:"👤 Ver cliente (360)"});C.addEventListener("click",()=>{h(),z.set({detailLeadId:r._leadId})}),A.append(C)}o.append(A)}await b()}async function xC(n,{onDone:e}={}){if(z.get().mock){const S=new Date(Date.now()+864e5).toISOString();GR({type:"cita",subject:"Cita con "+(n.fullName||""),dueAt:S,relatedTo:{type:"lead",id:n.id,name:n.fullName},status:"open"}),H("📅 Cita agendada (demo)","ok");return}const t=u("div",{class:"login__error",role:"alert",hidden:!0}),r=S=>{t.textContent=S,t.hidden=!1},s=u("div",{class:"nl-form"},[u("p",{class:"u-caption u-muted",text:"La cita manual nace CONFIRMADA y reserva el bloque del asesor (y del carro). Necesitas señal."})]),{close:i}=by("📅 Agendar cita",n.fullName||"Cliente",[s]),[o,c,l,h]=await Promise.all([_y(),yy(),wy(n.ownerId),Ey(n.vehicleOfInterestId)]),p=Iy(o,c,{}),m=u("select",{class:"select"},[u("option",{value:"visita",text:"Visita al concesionario"}),u("option",{value:"test_drive",text:"Test drive"}),u("option",{value:"llamada",text:"Llamada agendada"})]),b=u("select",{class:"select"},[u("option",{value:"30",text:"30 min"}),u("option",{value:"60",text:"1 hora",selected:""}),u("option",{value:"90",text:"1h 30"})]),A=u("input",{class:"input",type:"text",placeholder:"Nota (opcional)"}),P=u("button",{class:"btn btn--gold btn--sm",type:"button",text:"📅 Crear cita confirmada"}),R=u("button",{class:"btn btn--ghost btn--sm",type:"button",text:"Cancelar"});R.addEventListener("click",i),P.addEventListener("click",async()=>{t.hidden=!0;const{fecha:S,hora:V}=p.value();if(!S||!V)return r("Elige fecha y hora.");if(!l.value)return r("Elige el asesor que atiende.");P.disabled=!0,P.textContent="Creando…";const C=(l._advisors||[]).find(U=>U.uid===l.value)?.nombre||null,k=(h._vehicles||[]).find(U=>U.id===h.value);try{await zn("create",null,{leadId:n.id||null,contactId:n.contactId||null,nombre:n.fullName||"Cliente",telefono:n.phone||null,email:n.email||null,fecha:S,hora:V,duracionMin:parseInt(b.value,10)||60,asesorId:l.value,asesorName:C,vehicleId:h.value||null,vehicleName:k?k.label:null,tipo:m.value,nota:A.value.trim()}),H("📅 Cita creada y confirmada — ya está en la Agenda","ok"),i(),e&&e()}catch(U){P.disabled=!1,P.textContent="📅 Crear cita confirmada",r(U&&U.message||"No se pudo crear la cita.")}}),s.append(u("div",{class:"cfg-row"},[p.dateIn,p.hourSel]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Asesor *"}),l]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Vehículo"}),h]),u("div",{class:"cfg-row"},[m,b]),A,t,u("div",{class:"nl-actions"},[R,P]))}function DC(n){const e=new Date,t={year:e.getFullYear(),month:e.getMonth(),events:[],loading:!0,error:null,sub:null},r=u("div",{class:"agenda__head"}),s=u("p",{class:"u-muted u-caption",style:{margin:"0",padding:"8px 10px",border:"1px dashed var(--line, #444)",borderRadius:"8px"}},["✅ Toca una cita para confirmarla (asignando asesor), pedir confirmación por WhatsApp, reprogramarla o cancelarla. ","Si el cliente no confirma, caduca sola 3h antes y libera el cupo. El ",u("a",{href:"/admin.html#solicitudes",target:"_blank",rel:"noopener",text:"calendario clásico"})," sigue de respaldo hasta el cambio definitivo."]),i=u("div",{class:"agenda__weekdays"},gC.map(S=>u("span",{class:"agenda__wd",text:S}))),o=u("div",{class:"agenda__grid"}),c=u("section",{class:"agenda"},[r,s,i,o]);pe(n),n.append(c);function l(S){let V=t.month+S,C=t.year;V<0?(V=11,C--):V>11&&(V=0,C++),t.year=C,t.month=V,R()}function h(){t.year=e.getFullYear(),t.month=e.getMonth(),R()}function p(){pe(r);const S=u("div",{class:"u-row u-row--tight"},[m("‹","Mes anterior",()=>l(-1)),u("button",{class:"btn btn--soft btn--sm",type:"button",onclick:h},["Hoy"]),m("›","Mes siguiente",()=>l(1))]);r.append(u("h2",{class:"agenda__title",text:`${vp[t.month]} ${t.year}`}),S)}function m(S,V,C){const k=u("button",{class:"icon-btn",type:"button","aria-label":V},[S]);return k.addEventListener("click",C),k}function b(){if(p(),pe(o),t.error){o.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:"⚠️"}),u("div",{class:"state__title",text:"No se pudo cargar la agenda"}),u("div",{class:"state__msg",text:t.error})]));return}const S=yC(t.events);gy(t.year,t.month).forEach(C=>{C.forEach(k=>{const U=ki(k.date),x=S[U]||[],M=vC(k.date,e),E=u("div",{class:"agenda__day"+(k.inMonth?"":" is-out")+(M?" is-today":""),role:"gridcell"},[u("div",{class:"agenda__daynum",text:String(k.date.getDate())})]),w=u("div",{class:"agenda__events"});if(x.slice(0,3).forEach(g=>w.append(A(g))),x.length>3){const g=u("button",{class:"agenda__more",type:"button"},[`+${x.length-3} más`]);g.addEventListener("click",()=>Tt(g,x.map(_=>({value:_,label:`${bp(_.dueAt)} · ${_.relatedTo?.name||_.subject||"Cita"}`})),_=>P(_.value),{title:`${k.date.getDate()} ${vp[t.month]}`})),w.append(g)}E.append(w),o.append(E)})})}function A(S){const V=S.type==="cita"?S.estadoCita||"pendiente":null,C="agenda__chip"+(V?" agenda__chip--"+V:"")+(S.status==="closed"?" is-closed":""),k=u("button",{class:C,type:"button",title:S.subject||"Cita"},[u("span",{class:"agenda__chip-time",text:bp(S.dueAt)}),u("span",{class:"u-truncate",text:S.relatedTo?.name||S.subject||"Cita"})]);return k.addEventListener("click",()=>P(S)),k}function P(S){if(S.type==="cita"&&S.sourceSolicitudId){kC(S,{onLead:C=>z.set({detailLeadId:C})});return}const V=S.relatedTo&&S.relatedTo.id;V&&z.set({detailLeadId:V})}function R(){if(b(),t.sub&&(t.sub(),t.sub=null),z.get().mock){t.events=zR(),t.loading=!1,b();return}const{startISO:S,endISO:V}=_C(t.year,t.month);t.sub=IC(S,V,C=>{t.events=C,t.loading=!1,t.error=null,b()},C=>{t.loading=!1,t.error=C&&C.code==="permission-denied"?"Sin permiso.":"Revisa tu conexión.",b()})}return R(),function(){t.sub&&t.sub(),t.sub=null}}const NC=n=>{const e=new Date(n).getTime();return Number.isNaN(e)?0:e},cc=n=>n.status==="won",Ty=n=>n.status==="lost",sd=n=>n.status==="open",id=n=>n.status==="convertido";function Ip(n,e){return e?n.filter(t=>NC(t.createdAt)>=e):n.slice()}function VC(n,e){const t=n.length,r=n.filter(id).length,s=e.filter(cc),i=e.filter(Ty),o=s.reduce((l,h)=>l+(Number(h.amount)||0),0),c=s.length+i.length;return{leadsNew:t,convertidos:r,convRate:t?r/t:0,won:s.length,lost:i.length,winRate:c?s.length/c:0,wonValue:o}}function OC(n,e){const t=e.filter(sd),r=n.filter(i=>!hs(i.status)),s=r.filter(i=>{const o=ty(i);return!o.closed&&(o.state==="warn"||o.state==="late")}).length;return{leadsActive:r.length,dealsOpen:t.length,pipelineWeighted:dy(t),slaRisk:s}}function LC(n,e){const t=new Set(e.filter(cc).map(h=>h.id)),r=n.filter(h=>h.status==="contactado"||h.status==="calificado"||h.status==="convertido"),s=n.filter(h=>h.status==="calificado"||h.status==="convertido"),i=n.filter(id),o=i.filter(h=>h.convertedTo&&t.has(h.convertedTo.dealId)),c=n.length||1,l=[{key:"leads",label:"Leads",count:n.length},{key:"contactados",label:"Contactados",count:r.length},{key:"calificados",label:"Calificados",count:s.length},{key:"convertidos",label:"Convertidos",count:i.length},{key:"ganados",label:"Ganados",count:o.length}];return l.map((h,p)=>({...h,pctTop:h.count/c,convFromPrev:p===0?1:l[p-1].count?h.count/l[p-1].count:0}))}function MC(n,e){const t={},r=s=>t[s.key]||(t[s.key]={key:s.key,label:s.label,icon:s.icon,leads:0,convertidos:0,deals:0,won:0,revenue:0});return n.forEach(s=>{const i=r(Ci(s));i.leads++,id(s)&&i.convertidos++}),e.forEach(s=>{const i=r(Ci(s));i.deals++,cc(s)&&(i.won++,i.revenue+=Number(s.amount)||0)}),Object.values(t).map(s=>({...s,convRate:s.leads?s.convertidos/s.leads:0})).sort((s,i)=>i.leads-s.leads||i.revenue-s.revenue)}function FC(n){const e=n.filter(sd);return oi.map(t=>{const r=e.filter(s=>s.stageId===t.id);return{id:t.id,label:t.label,prob:t.prob,count:r.length,value:r.reduce((s,i)=>s+(Number(i.amount)||0),0),weighted:r.reduce((s,i)=>s+rd(i),0)}})}function UC(n,e,t=[]){const r={},s=(i,o)=>r[i]||(r[i]={ownerId:i,ownerName:o,leads:0,deals:0,won:0,lost:0,pipelineWeighted:0});return t.forEach(i=>s(i.uid,i.nombre)),n.forEach(i=>{const o=i.ownerId||"_none";s(o,i.ownerName||(o==="_none"?"Sin asignar":o)).leads++}),e.forEach(i=>{const o=i.ownerId||"_none",c=s(o,i.ownerName||(o==="_none"?"Sin asignar":o));c.deals++,cc(i)?c.won++:Ty(i)?c.lost++:sd(i)&&(c.pipelineWeighted+=rd(i))}),Object.values(r).filter(i=>i.leads||i.deals).map(i=>({...i,winRate:i.won+i.lost?i.won/(i.won+i.lost):0})).sort((i,o)=>o.won-i.won||o.pipelineWeighted-i.pipelineWeighted||o.leads-i.leads)}function BC(n,e=30){const t=[],r={},s=new Date;for(let i=e-1;i>=0;i--){const o=new Date(s.getFullYear(),s.getMonth(),s.getDate()-i),c={key:ki(o),date:o,count:0};t.push(c),r[c.key]=c}return n.forEach(i=>{if(!i.createdAt)return;const o=r[ki(new Date(i.createdAt))];o&&o.count++}),t}const wp=[{value:0,label:"Hoy"},{value:7,label:"7 días"},{value:30,label:"30 días"},{value:90,label:"90 días"},{value:null,label:"Todo"}];function $C(n){if(n==null)return null;const e=new Date;return new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime()-n*864e5}const qC=n=>({id:n.id,...n.data()});async function Ep(n,e){return(await Sn(mt(Pe(ie,n),Dt("createdAt","desc"),wt(e)))).docs.map(qC)}async function jC({pageSize:n=500}={}){if(z.get().mock)return{leads:Ta(),deals:cy(),capped:!1};const[e,t]=await Promise.all([Ep("leads",n),Ep("deals",n)]);return{leads:e.filter(s=>!s.archived),deals:t,capped:e.length>=n||t.length>=n}}const zC="http://www.w3.org/2000/svg";function Hc(n,e={},t=[]){const r=document.createElementNS(zC,n);for(const[s,i]of Object.entries(e))i==null||i===!1||r.setAttribute(s,String(i));for(const s of[].concat(t))s==null||s===!1||s===""||r.append(s.nodeType?s:document.createTextNode(String(s)));return r}function GC(n,e={}){const t=e.max!=null?e.max:Math.max(1,...n.map(s=>Number(s.value)||0)),r=u("div",{class:"reportes__bars",role:"list"});return n.forEach(s=>{const i=s.pct!=null?s.pct:t?(Number(s.value)||0)/t:0,o=Math.max(0,Math.min(100,i*100));r.append(u("div",{class:"reportes__bar",role:"listitem"},[u("span",{class:"reportes__bar-label u-truncate",text:s.label}),u("span",{class:"reportes__bar-track","aria-hidden":"true"},[u("span",{class:"reportes__bar-fill",style:{width:o+"%",background:s.color||"var(--grad-gold)"}})]),u("span",{class:"reportes__bar-val u-mono",text:s.display!=null?s.display:String(s.value)})]))}),r}function HC(n){const s=n.map(P=>Number(P.value)||0),i=Math.max(...s,0),o=Math.max(1,i),c=n.length,l=P=>c<=1?600/2:6+P*(600-2*6)/(c-1),h=P=>134-P/o*(140-2*6),p=n.map((P,R)=>`${l(R).toFixed(1)},${h(s[R]).toFixed(1)}`).join(" "),m=`6,134 ${p} ${594 .toFixed(1)},134`,b=s.reduce((P,R)=>P+R,0),A=(n[s.indexOf(i)]||{}).label||"";return Hc("svg",{class:"reportes__spark",viewBox:"0 0 600 140",preserveAspectRatio:"none",role:"img","aria-label":`Tendencia: ${b} en total; pico de ${i}${A?" el "+A:""}.`},[Hc("polygon",{points:m,fill:"var(--gold-300)",opacity:"0.30"}),Hc("polyline",{points:p,fill:"none",stroke:"var(--gold-500)","stroke-width":"2","stroke-linejoin":"round","stroke-linecap":"round","vector-effect":"non-scaling-stroke"})])}const ut=n=>Math.round((n||0)*100)+"%",on=n=>Xs(n)||"$0",Kc=n=>`${n.getDate()}/${n.getMonth()+1}`;function KC(n){const e={leads:[],deals:[],loading:!0,error:null,capped:!1,days:30};let t=!0;const r=u("div",{class:"reportes__chips",role:"group","aria-label":"Período"}),s=u("button",{class:"btn btn--soft btn--sm",type:"button"},["↻ Actualizar"]),i=u("button",{class:"btn btn--soft btn--sm",type:"button"},["⤓ CSV"]);s.addEventListener("click",w),i.addEventListener("click",E);const o=u("div",{class:"reportes__toolbar"},[r,u("div",{class:"u-row u-row--tight"},[s,i])]),c=u("div",{class:"reportes__body"}),l=u("section",{class:"reportes"},[o,c]);pe(n),n.append(l);function h(){pe(r),wp.forEach(g=>{const _=e.days===g.value,I=u("button",{class:"chip",type:"button","aria-pressed":_?"true":"false"},[g.label]);I.addEventListener("click",()=>{e.days=g.value,m()}),r.append(I)})}function p(){const g=$C(e.days),_=Ip(e.leads,g),I=Ip(e.deals,g);return{pLeads:_,pDeals:I,pk:VC(_,I),ck:OC(e.leads,e.deals),fn:LC(_,e.deals),src:MC(_,I),stg:FC(e.deals),own:UC(_,I,z.get().mock?ay():z.get().team||[]),tr:BC(e.leads,30)}}function m(){if(h(),e.loading)return M();if(e.error)return x("⚠️","No se pudieron cargar los reportes",e.error);if(!e.leads.length&&!e.deals.length)return x("📊","Aún no hay datos para reportar","Cuando entren leads y oportunidades, aquí verás tus KPIs, el embudo y el rendimiento por fuente.");const g=p();pe(c),e.capped&&c.append(u("div",{class:"reportes__notice u-caption"},["ℹ️ Mostrando los registros más recientes (tope por carga). Los totales históricos completos llegarán con los reportes acumulados."])),c.append(b("Del período",[A("Leads nuevos",String(g.pk.leadsNew)),A("Tasa de conversión",ut(g.pk.convRate),`${g.pk.convertidos} de ${g.pk.leadsNew}`),A("Win rate",ut(g.pk.winRate),`${g.pk.won} ganadas · ${g.pk.lost} perdidas`),A("Valor ganado",on(g.pk.wonValue),null,!0)]),b("Estado actual",[A("Leads activos",String(g.ck.leadsActive)),A("Oportunidades abiertas",String(g.ck.dealsOpen)),A("Pipeline ponderado",on(g.ck.pipelineWeighted),null,!0),A("SLA en riesgo",String(g.ck.slaRisk),g.ck.slaRisk?"requieren atención":"al día")]),P(g.fn),R(g.src),S(g.stg),V(g.tr),C(g.own))}function b(g,_){return u("div",{class:"reportes__section"},[u("h2",{class:"reportes__sec-title",text:g}),u("div",{class:"reportes__kpis"},_)])}function A(g,_,I,T){return u("div",{class:"reportes__kpi"+(T?" reportes__kpi--hi":"")},[u("span",{class:"reportes__kpi-label u-caption u-faint",text:g}),u("strong",{class:"reportes__kpi-val",text:_}),I?u("span",{class:"reportes__kpi-sub u-caption u-faint",text:I}):null])}function P(g){const _=g.map((I,T)=>({label:I.label,value:I.count,pct:I.pctTop,display:T===0?String(I.count):`${I.count} · ${ut(I.convFromPrev)}`,color:"var(--grad-gold)"}));return k("Embudo de ventas","De lead a venta — dónde se pierde el avance",GC(_,{max:g[0]?g[0].count:1}))}function R(g){const _=["Canal","Leads","Conv.","Oport.","Ganados","Ingresos"],I=g.map(v=>[`${v.icon||""} ${v.label}`.trim(),String(v.leads),ut(v.convRate),String(v.deals),String(v.won),on(v.revenue)]),T=g.length?null:"Sin leads en el período.";return k("Rendimiento por canal","Atribución de fuente: de dónde vienen y cuánto rinden",U(_,I,T))}function S(g){const _=["Etapa","Prob.","Oport.","Valor","Ponderado"],I=g.map($=>[$.label,ut($.prob),String($.count),on($.value),on($.weighted)]),T=g.reduce(($,se)=>({count:$.count+se.count,value:$.value+se.value,weighted:$.weighted+se.weighted}),{count:0,value:0,weighted:0}),v=["Total","",String(T.count),on(T.value),on(T.weighted)];return k("Forecast por etapa","Pipeline abierto actual (no depende del período)",U(_,I,null,v))}function V(g){const _=g.reduce(($,se)=>$+se.count,0),I=g.map($=>({label:Kc($.date),value:$.count})),T=g.length?`${Kc(g[0].date)} – ${Kc(g[g.length-1].date)}`:"",v=u("div",{class:"reportes__chart"},[HC(I),u("div",{class:"reportes__axis u-caption u-faint"},[u("span",{text:T}),u("span",{text:`${_} leads`})])]);return k("Tendencia de captación","Nuevos leads · últimos 30 días",v)}function C(g){const _=["Asesor","Leads","Oport.","Ganados","Win rate","Pipeline pond."],I=g.map(v=>[v.ownerName,String(v.leads),String(v.deals),String(v.won),ut(v.winRate),on(v.pipelineWeighted)]),T=g.length?null:"Sin actividad asignada en el período.";return k("Rendimiento del equipo","Por asesor, en el período seleccionado",U(_,I,T))}function k(g,_,I){return u("div",{class:"reportes__section"},[u("div",{class:"reportes__sec-head"},[u("h2",{class:"reportes__sec-title",text:g}),_?u("span",{class:"reportes__sec-cap u-caption u-faint",text:_}):null]),I])}function U(g,_,I,T){if(!_.length&&I)return u("div",{class:"reportes__empty u-caption u-faint",text:I});const v=u("thead",{},[u("tr",{},g.map((ae,he)=>u("th",{class:he===0?"":"is-num",scope:"col",text:ae})))]),$=u("tbody",{},_.map(ae=>u("tr",{},ae.map((he,We)=>u("td",{class:We===0?"":"is-num",text:he}))))),se=[v,$];return T&&se.push(u("tfoot",{},[u("tr",{},T.map((ae,he)=>he===0?u("th",{scope:"row",text:ae}):u("td",{class:"is-num",text:ae})))])),u("div",{class:"reportes__tablewrap"},[u("table",{class:"reportes__table"},se)])}function x(g,_,I){pe(c),c.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:g}),u("div",{class:"state__title",text:_}),u("div",{class:"state__msg",text:I})]))}function M(){pe(c);const g=u("div",{class:"reportes__kpis"},[1,2,3,4].map(()=>u("div",{class:"reportes__kpi"},[u("span",{class:"skeleton",style:{width:"100%",height:"46px"}})])));c.append(u("div",{class:"reportes__section"},[g])),c.append(u("div",{class:"reportes__section"},[u("span",{class:"skeleton",style:{width:"100%",height:"160px"}})]))}function E(){if(e.loading||e.error){H("Aún no hay datos para exportar","info");return}const g=p(),_=(wp.find(v=>v.value===e.days)||{}).label||"",I=[],T=v=>{I.push([]),I.push([v])};I.push(["Reporte Altorra CRM"]),I.push(["Período",_]),I.push(["Generado",new Date().toLocaleString("es-CO")]),T("KPIs del período"),I.push(["Métrica","Valor"]),I.push(["Leads nuevos",g.pk.leadsNew]),I.push(["Conversión",ut(g.pk.convRate)]),I.push(["Win rate",ut(g.pk.winRate)]),I.push(["Ganadas",g.pk.won]),I.push(["Perdidas",g.pk.lost]),I.push(["Valor ganado (COP)",g.pk.wonValue]),I.push(["Leads activos (ahora)",g.ck.leadsActive]),I.push(["Oportunidades abiertas (ahora)",g.ck.dealsOpen]),I.push(["Pipeline ponderado COP (ahora)",g.ck.pipelineWeighted]),I.push(["SLA en riesgo (ahora)",g.ck.slaRisk]),T("Embudo"),I.push(["Etapa","Cantidad","Conversión desde anterior"]),g.fn.forEach((v,$)=>I.push([v.label,v.count,$===0?"":ut(v.convFromPrev)])),T("Rendimiento por canal"),I.push(["Canal","Leads","Conversión","Oportunidades","Ganados","Ingresos (COP)"]),g.src.forEach(v=>I.push([v.label,v.leads,ut(v.convRate),v.deals,v.won,v.revenue])),T("Forecast por etapa (pipeline actual)"),I.push(["Etapa","Probabilidad","Oportunidades","Valor (COP)","Ponderado (COP)"]),g.stg.forEach(v=>I.push([v.label,ut(v.prob),v.count,v.value,v.weighted])),T("Rendimiento del equipo"),I.push(["Asesor","Leads","Oportunidades","Ganados","Win rate","Pipeline ponderado (COP)"]),g.own.forEach(v=>I.push([v.ownerName,v.leads,v.deals,v.won,ut(v.winRate),v.pipelineWeighted])),YC(`altorra-reportes-${ki(new Date)}.csv`,QC(I)),H("Reporte exportado","ok")}async function w(){e.loading=!0,e.error=null,m();try{const g=await jC();if(!t)return;e.leads=g.leads,e.deals=g.deals,e.capped=!!g.capped,e.loading=!1}catch(g){if(!t)return;e.loading=!1,e.error=g&&g.code==="permission-denied"?"Sin permiso para ver los reportes.":"Revisa tu conexión e intenta de nuevo."}m()}return w(),function(){t=!1}}function WC(n){const e=n==null?"":String(n);return/[",\n\r;]/.test(e)?'"'+e.replace(/"/g,'""')+'"':e}function QC(n){return"\uFEFF"+n.map(e=>e.map(WC).join(",")).join(`\r
`)}function YC(n,e){const t=new Blob([e],{type:"text/csv;charset=utf-8;"}),r=URL.createObjectURL(t),s=document.createElement("a");s.href=r,s.download=n,document.body.append(s),s.click(),s.remove(),setTimeout(()=>URL.revokeObjectURL(r),1e3)}function Ay(n,e){const t=String(n||"").trim();if(!t)return"";const r=t.replace(/[^\d+]/g,"").startsWith("+");let s=t.replace(/\D/g,"");if(!s)return"";const i=String(e||"").replace(/\D/g,"");return i&&!r&&!s.startsWith(i)?s=i+s:!i&&!r&&s.length===10&&s.startsWith("3")&&(s="57"+s),"+"+s}function Tp(n){return String(n||"").replace(/[^a-z0-9]/gi,"_").slice(0,480)}function JC({email:n,phone:e,prefijoPais:t}){const r=[],s=String(n||"").trim().toLowerCase();s&&r.push(Tp("email:"+s));const i=Ay(e,t);return i&&r.push(Tp("phone:"+i)),r}const Sa=n=>({id:n.id,...n.data()});async function XC({pageSize:n=500}={}){if(z.get().mock)return{contacts:UR(),leads:Ta()};const[e,t]=await Promise.all([Sn(mt(Pe(ie,"contacts"),Dt("createdAt","desc"),wt(n))).then(r=>r.docs.map(Sa)),Sn(mt(Pe(ie,"leads"),Dt("createdAt","desc"),wt(n))).then(r=>r.docs.map(Sa))]);return{contacts:e.filter(r=>!r._mergedInto&&!r._suppressed),leads:t}}async function Ra(n){if(!n)return null;const e=await yr(De(ie,"contacts",n));return e.exists()?{id:e.id,...e.data()}:null}function ZC(n,e,t){const r=mt(Pe(ie,"activities"),ls("relatedTo.id","==",n),Dt("createdAt","desc"),wt(50));return vr(r,s=>e(s.docs.map(Sa)),s=>t&&t(s))}function eP(n,e,t){const r=mt(Pe(ie,"contacts",n,"crmNotes"),Dt("createdAt","desc"),wt(50));return vr(r,s=>e(s.docs.map(Sa)),s=>t&&t(s))}async function tP({email:n,phone:e},t){for(const r of JC({email:n,phone:e})){const s=await yr(De(ie,"dedup",r));if(s.exists()&&s.data().contactId!==t)return{key:r,contactId:s.data().contactId}}return null}async function nP(n,e,t){const r=De(ie,"contacts",n),s=async i=>{const o={...e,updatedAt:new Date().toISOString(),_version:i+1};return e.phone!==void 0&&(o.phone=Ay(e.phone,"+57")||null),Ot(r,o)};try{return await s(t._version||0),{ok:!0}}catch(i){if(!i||i.code!=="permission-denied")throw i;const o=await Ra(n);if(!o)throw i;if(Object.keys(e).some(l=>String(o[l]??"")!==String(t[l]??""))){const l=new Error("conflict");throw l.code="conflict",l.fresh=o,l}return await s(o._version||0),{ok:!0,retried:!0}}}async function rP(n,e){return(await Is(ws,"crmMergeContacts")({survivorId:n,mergedId:e})).data}async function sP(n){return(await Is(ws,"crmSuppressContact")({contactId:n})).data}async function iP(n){return(await Is(ws,"crmCancelSuppression")({contactId:n})).data}async function oP(n,e){const t=z.get().user;await kn(Pe(ie,"contacts",n,"crmNotes"),{body:String(e||"").trim(),authorId:t?t.uid:null,authorName:z.get().profile&&z.get().profile.nombre||t&&t.email||"Asesor",createdAt:new Date().toISOString()})}const aP=[{id:"todos",label:"Todos"},{id:"lead",label:"Leads"},{id:"cliente",label:"Clientes"},{id:"suscriptor",label:"Suscriptores"}],cP={lead:{label:"Lead",badge:"gold"},cliente:{label:"Cliente",badge:"ok"},suscriptor:{label:"Suscriptor",badge:"info"}};function Ap(n){const e=String(n.lifecycleStage||n.type||"").toLowerCase();return e==="subscriber"||e==="suscriptor"?"suscriptor":e==="customer"||e==="cliente"?"cliente":"lead"}function lP(n){const e={contacts:[],leads:[],loading:!0,error:null,q:"",filter:"todos"};let t=!0;const r=u("input",{type:"search",placeholder:"Buscar por nombre, correo o teléfono…","aria-label":"Buscar contactos"});r.addEventListener("input",()=>{e.q=r.value,P()});const s=u("div",{class:"search"},[u("span",{"aria-hidden":"true",text:"🔎"}),r]),i={},o=u("div",{class:"contactos__chips",role:"group","aria-label":"Filtrar por tipo"});aP.forEach(C=>{const k=u("button",{class:"chip",type:"button","aria-pressed":C.id===e.filter?"true":"false"},[C.label]);k.addEventListener("click",()=>{e.filter=C.id,Object.entries(i).forEach(([U,x])=>x.setAttribute("aria-pressed",U===C.id?"true":"false")),P()}),i[C.id]=k,o.append(k)});const c=u("span",{class:"contactos__count u-caption u-faint"}),l=u("button",{class:"btn btn--soft btn--sm",type:"button"},["↻ Actualizar"]);l.addEventListener("click",V);const h=u("div",{class:"contactos__toolbar"},[s,o,u("div",{class:"u-row u-row--tight"},[c,l])]),p=u("div",{class:"contactos__list"}),m=u("section",{class:"contactos"},[h,p]);pe(n),n.append(m);function b(){const C={};for(const k of e.leads){if(!k.contactId)continue;const U=C[k.contactId];(!U||new Date(k.createdAt)>new Date(U.createdAt))&&(C[k.contactId]=k)}return C}function A(C){z.set({leads:e.leads,detailLeadId:C.id})}function P(){if(e.loading)return S("⏳","Cargando contactos…","");if(e.error)return S("⚠️","No se pudieron cargar los contactos",e.error);if(!e.contacts.length)return S("👥","Aún no hay contactos","Cuando entren leads, registros de cuenta o suscripciones, las personas aparecerán aquí.");const C=b(),k=Ea(e.q),U=e.contacts.filter(x=>e.filter!=="todos"&&Ap(x)!==e.filter?!1:k?Ea(`${x.fullName||""} ${x.email||""} ${x.phone||""}`).includes(k):!0);if(c.textContent=`${U.length} de ${e.contacts.length}`,pe(p),!U.length){p.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:"🔍"}),u("div",{class:"state__title",text:"Sin resultados"}),u("div",{class:"state__msg",text:"Prueba con otro término o filtro."})]));return}U.forEach(x=>p.append(R(x,C[x.id])))}function R(C,k){const U=Ap(C),x=cP[U],M=Ci(C),E=Number(C.score)>0&&Hr[C.rating],w=u("div",{class:"contact-row__badges"},[u("span",{class:`badge badge--${x.badge}`,text:x.label}),u("span",{class:"badge",text:`${M.icon} ${M.label}`}),E?u("span",{class:`temp ${Hr[C.rating].cls}`,text:`${Hr[C.rating].icon} ${C.score}`}):null]),g=[C.email,C.phone].filter(Boolean).join(" · ")||"Sin datos de contacto",_=Array.isArray(C.tags)&&C.tags.length?u("span",{class:"contact-row__tags u-caption u-faint u-truncate",text:"🏷️ "+C.tags.join(", ")}):null,I=[u("span",{class:"avatar avatar--sm","aria-hidden":"true",text:Hi(C.fullName)}),u("div",{class:"contact-row__main"},[u("span",{class:"contact-row__name u-truncate",text:C.fullName||"Sin nombre"}),u("span",{class:"contact-row__sub u-caption u-faint u-truncate",title:g,text:g}),_]),w,u("span",{class:"contact-row__time u-caption u-faint",text:nr(C.lastActivityAt)})];if(k){const T=u("button",{class:"contact-row",type:"button","aria-label":`Ver ficha de ${C.fullName||"contacto"}`},I);return T.addEventListener("click",()=>A(k)),T}return u("div",{class:"contact-row contact-row--nolead"},I)}function S(C,k,U){c.textContent="",pe(p),p.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:C}),u("div",{class:"state__title",text:k}),U?u("div",{class:"state__msg",text:U}):null]))}async function V(){e.loading=!0,e.error=null,P();try{const C=await XC();if(!t)return;e.contacts=C.contacts,e.leads=C.leads,e.loading=!1}catch(C){if(!t)return;e.loading=!1,e.error=C&&C.code==="permission-denied"?"Sin permiso para ver los contactos.":"Revisa tu conexión e intenta de nuevo."}P()}return V(),function(){t=!1}}function uP(n,e,t){const r=u("div",{class:"modal"},[u("div",{class:"modal__head"},[u("h2",{class:"modal__title",text:n}),e?u("span",{class:"u-caption u-faint",text:e}):null]),...t]),s=u("div",{class:"modal-overlay"},[r]);document.body.appendChild(s);const i=()=>{s.remove(),window.removeEventListener("keydown",o)},o=c=>{c.key==="Escape"&&i()};return window.addEventListener("keydown",o),s.addEventListener("mousedown",c=>{c.target===s&&i()}),{close:i}}function dP(n,{onChanged:e}={}){if(!n){H("El contacto aún no carga.","error");return}if(z.get().mock){H("En demo no se edita el directorio.","info");return}if(n._mergedInto){H("Este contacto está fusionado en otro.","info");return}const t=u("div",{class:"nl-form"}),r=u("div",{class:"login__error",role:"alert",hidden:!0}),s=R=>{r.textContent=R,r.hidden=!1},{close:i}=uP("✏️ Editar contacto",n.fullName||"",[t]),o=n.suppressionStatus==="pendiente_supresion",c=u("input",{class:"input",type:"text",value:n.fullName||"",maxlength:"80"}),l=u("input",{class:"input",type:"email",value:n.email||"",placeholder:"correo@ejemplo.com"}),h=u("input",{class:"input",type:"tel",value:n.phone||"",placeholder:"+57 300 000 0000"}),p=u("button",{class:"btn btn--gold btn--sm",type:"button",text:"Guardar cambios"}),m=u("button",{class:"btn btn--ghost btn--sm",type:"button",text:"Cancelar"});m.addEventListener("click",i);async function b(R){r.hidden=!0;const S={};if(c.value.trim()!==(n.fullName||"")&&(S.fullName=c.value.trim()),l.value.trim().toLowerCase()!==(n.email||"")&&(S.email=l.value.trim().toLowerCase()||null),h.value.trim()!==(n.phone||"")&&(S.phone=h.value.trim()||null),!Object.keys(S).length){i();return}p.disabled=!0,p.textContent="Guardando…";try{if(S.email!==void 0||S.phone!==void 0){const V=await tP({email:S.email!==void 0?S.email:n.email,phone:S.phone!==void 0?S.phone:n.phone},n.id);if(V)return p.disabled=!1,p.textContent="Guardar cambios",A(V)}await nP(n.id,S,R||n),H("✓ Contacto actualizado","ok"),i(),e&&e()}catch(V){if(p.disabled=!1,p.textContent="Guardar cambios",V&&V.code==="conflict"&&V.fresh){s("Alguien actualizó este contacto mientras editabas. Valores actuales: "+(V.fresh.fullName||"—")+" · "+(V.fresh.email||"sin email")+" · "+(V.fresh.phone||"sin tel")+'. Pulsa "Guardar" de nuevo para PISAR con lo tuyo, o Cancelar para conservar lo del server.'),p.disabled=!1,p.onclick=()=>b(V.fresh);return}s(V&&V.message||"No se pudo guardar.")}}p.addEventListener("click",()=>b(null));async function A(R){const S=await Ra(R.contactId).catch(()=>null),V=S&&S.fullName||R.contactId;if(!bt("*")){s("Ese email/teléfono YA pertenece a otro contacto ("+V+"). Pídele al Super Admin fusionarlos — no se crean duplicados.");return}t.replaceChildren(u("p",{},["Ese dato ya pertenece a ",u("strong",{text:V}),". Son la misma persona → fusiónalos. Elige quién SOBREVIVE (el otro queda como histórico apuntando aquí):"]),r);const C=(k,U,x)=>{const M=u("button",{class:"btn btn--soft btn--sm",type:"button",text:k});return M.addEventListener("click",async()=>{if(confirm("¿Fusionar definitivamente? Re-apunta leads, negocios y notas. No se puede deshacer.")){M.disabled=!0;try{const E=await rP(U,x);H(`🔗 Fusionados: ${E.counts?E.counts.leads:0} lead(s), ${E.counts?E.counts.deals:0} negocio(s)`,"ok"),i(),e&&e()}catch(E){M.disabled=!1,s(E&&E.message||"No se pudo fusionar.")}}}),M};t.append(u("div",{class:"cita-actions"},[C("Sobrevive ESTE ("+(n.fullName||"actual")+")",n.id,R.contactId),C("Sobrevive el OTRO ("+V+")",R.contactId,n.id),u("button",{class:"btn btn--ghost btn--sm",type:"button",text:"Cancelar",onclick:i})]))}function P(){if(!bt("crm.delete"))return null;const R=u("div",{class:"cfg-card",style:{borderColor:"var(--danger, #e5484d)"}});if(R.append(u("h3",{class:"cfg-card__title",text:"🛡 Privacidad (Ley 1581)"})),o){R.append(u("p",{class:"u-caption",text:"⏳ Supresión programada: se ejecuta el "+String(n.suppressionExecuteAfter||"").slice(0,16).replace("T"," ")+". Hasta entonces es reversible."}));const S=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"↩️ Cancelar supresión"});S.addEventListener("click",async()=>{S.disabled=!0;try{const V=await iP(n.id);H(V.duplicates&&V.duplicates.length?"↩️ Supresión cancelada — OJO: nació un duplicado durante la espera, fusiónalos.":"↩️ Supresión cancelada","ok"),i(),e&&e()}catch(V){S.disabled=!1,s(V&&V.message||"No se pudo cancelar.")}}),R.append(S)}else{R.append(u("p",{class:"u-caption u-muted",text:"Derecho de supresión: borra los datos personales (nombre, contacto, notas) de forma DEFINITIVA tras 72h de gracia. El historial comercial (montos, fechas, carro) se conserva anónimo. Las copias ya enviadas por Telegram/email quedan fuera del alcance técnico."}));const S=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"🗑 Solicitar supresión definitiva…"});S.addEventListener("click",async()=>{const V=prompt("DOBLE CONFIRMACIÓN: escribe SUPRIMIR para programar el borrado de datos personales de "+(n.fullName||"este contacto")+" (72h de gracia, reversible hasta entonces).");if(V!=="SUPRIMIR"){V!==null&&H("Texto incorrecto — no se hizo nada.","info");return}S.disabled=!0;try{const C=await sP(n.id);H("🛡 Supresión programada para "+String(C.executeAfter||"").slice(0,16).replace("T"," "),"ok"),i(),e&&e()}catch(C){S.disabled=!1,s(C&&C.message||"No se pudo programar.")}}),R.append(S)}return R}o?t.append(u("p",{class:"cita-conflict",text:"⏳ Este contacto tiene una supresión Ley 1581 programada — no se puede editar (cancélala primero si fue un error)."}),r,P(),u("div",{class:"nl-actions"},[m])):t.append(u("label",{class:"field"},[u("span",{class:"field__label",text:"Nombre"}),c]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Email"}),l]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Teléfono"}),h]),r,u("div",{class:"nl-actions"},[m,p]),P())}const hP={solicitud_inbound:"📥",whatsapp:"💬",status_change:"🔁",nota:"🗒️",email:"✉️",llamada:"📞"};function fP(n){let e=null,t=null,r=null,s="resumen",i={lead:null,contact:null,activities:[],notes:[]};const o=u("aside",{class:"detail",role:"dialog","aria-modal":"true","aria-label":"Ficha del cliente"}),c=u("div",{class:"detail-overlay",hidden:!0},[o]);n.append(c),c.addEventListener("mousedown",x=>{x.target===c&&l()}),window.addEventListener("keydown",x=>{x.key==="Escape"&&e&&l()}),z.subscribe(x=>{x.detailLeadId!==e&&p(x.detailLeadId)});function l(){z.set({detailLeadId:null})}function h(){t&&(t(),t=null),r&&(r(),r=null)}function p(x){if(h(),e=x,!x){c.hidden=!0,document.body.classList.remove("has-detail"),pe(o);return}s="resumen",c.hidden=!1,document.body.classList.add("has-detail"),m(x)}function m(x){const M=(z.get().leads||[]).find(E=>E.id===x);i={lead:M||null,contact:null,activities:[],notes:[]},b(),M&&(z.get().mock?(i.contact=FR(M.contactId),i.activities=MR(x),i.notes=mp(M.contactId),b()):(Ra(M.contactId).then(E=>{i.contact=E,b()}).catch(()=>{}),t=ZC(x,E=>{i.activities=E,b()},()=>{}),M.contactId&&(r=eP(M.contactId,E=>{i.notes=E,b()},()=>{}))))}function b(){pe(o);const x=i.lead;if(!x){o.append(A(null)),o.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:"🔍"}),u("div",{class:"state__title",text:"Lead no disponible"}),u("div",{class:"state__msg",text:"Recarga la Bandeja e inténtalo otra vez."})]));return}o.append(A(x)),o.append(P());const M=u("div",{class:"detail__body"});s==="resumen"?M.append(R(x)):s==="comms"?M.append(V()):s==="score"?M.append(C(x)):s==="notas"&&M.append(k(x)),o.append(M)}function A(x){const M=u("button",{class:"icon-btn",type:"button","aria-label":"Cerrar"},["✕"]);if(M.addEventListener("click",l),!x)return u("div",{class:"detail__header"},[u("div",{class:"u-grow"}),M]);const E=U(x),w=Hr[E.rating],g=jo(x.status),_=ac(x),I=Ci(x),T=u("button",{class:"btn btn--wa btn--sm",type:"button"},["💬 WhatsApp"]);T.addEventListener("click",()=>{const he=Z_(x.phone,`Hola ${String(x.fullName||"").split(" ")[0]||""}, te saluda Altorra Cars 👋`);if(!he)return H("Sin teléfono","error");window.open(he,"_blank","noopener")});const v=bt("crm.edit"),$=v&&x.status!=="convertido"?u("button",{class:"btn btn--soft btn--sm",type:"button"},["🎯 Convertir"]):null;$&&$.addEventListener("click",()=>py(x,{}));const se=v?u("button",{class:"icon-btn",type:"button","aria-label":"Agendar cita",title:"Agendar cita"},["📅"]):null;se&&se.addEventListener("click",()=>xC(x,{}));const ae=v?u("button",{class:"icon-btn",type:"button","aria-label":"Editar contacto",title:"Editar contacto"},["✏️"]):null;return ae&&ae.addEventListener("click",()=>dP(i.contact,{onChanged:()=>{x.contactId&&Ra(x.contactId).then(he=>{i.contact=he,b()}).catch(()=>{})}})),u("div",{class:"detail__header"},[u("div",{class:"u-row u-grow",style:{minWidth:"0"}},[u("span",{class:"avatar","aria-hidden":"true",text:Hi(x.fullName)}),u("div",{class:"u-grow",style:{minWidth:"0"}},[u("h2",{class:"detail__name u-truncate",text:x.fullName}),u("div",{class:"u-row u-row--tight",style:{flexWrap:"wrap"}},[u("span",{class:`temp ${w.cls}`,text:`${w.icon} ${w.label} · ${E.score}`}),u("span",{class:`badge badge--${g.badge||""}`.trim(),text:g.label}),u("span",{class:"badge",text:`${_.icon} ${_.label}`}),u("span",{class:"badge",text:`${I.icon} ${I.label}`})])])]),u("div",{class:"u-row u-row--tight"},[$,se,ae,T,M])])}function P(){const x=[["resumen","Resumen"],["comms","Comunicaciones"],["score","Score"],["notas","Notas"]],M=u("div",{class:"detail__tabs",role:"tablist"});return x.forEach(([E,w])=>{const g=u("button",{class:"detail__tab"+(s===E?" is-active":""),role:"tab","aria-selected":String(s===E),type:"button"},[w]);g.addEventListener("click",()=>{s=E,b()}),M.append(g)}),M}function R(x){const M=i.contact,E=M&&M.consent?M.consent:null,w=[["Correo",x.email||"—"],["Teléfono",x.phone||"—"],["Interés",x.sourceDetail||"—"],["Vehículo",x.vehicleOfInterestId||"—"],["Asesor",x.ownerName||"Sin asignar"],["Origen",x.source||"—"],["Capturado",YS(x.createdAt)],["Última actividad",nr(x.lastActivityAt)]],g=sy(x,{score:U(x).score});return u("div",{class:"u-stack"},[u("div",{class:"detail-card detail-card--nba"},[u("span",{class:"detail-card__icon","aria-hidden":"true",text:g.icon}),u("div",{class:"u-grow"},[u("div",{class:"u-caption u-muted",text:"Próxima mejor acción"}),u("strong",{text:g.label}),u("div",{class:"u-caption u-faint",text:g.reason})])]),u("dl",{class:"kv"},w.flatMap(([_,I])=>[u("dt",{text:_}),u("dd",{class:"u-truncate",text:I})])),E?S(E):null])}function S(x){const M=E=>E?"✅":"⛔";return u("div",{class:"detail-card"},[u("div",{class:"u-caption u-muted",text:"Consentimiento (Ley 1581)"}),u("div",{class:"u-row",style:{flexWrap:"wrap",gap:"12px"}},[u("span",{class:"u-caption",text:`${M(x.email)} Email`}),u("span",{class:"u-caption",text:`${M(x.whatsapp)} WhatsApp`}),u("span",{class:"u-caption",text:`${M(x.calls)} Llamadas`})]),u("div",{class:"u-caption u-faint",text:`Política ${x.policyVersion||"v1"} · origen ${x.source||"—"}`})])}function V(){if(!i.activities.length)return u("div",{class:"state"},[u("div",{class:"state__icon",text:"📭"}),u("div",{class:"state__title",text:"Sin comunicaciones"}),u("div",{class:"state__msg",text:"Aún no hay actividades registradas para este lead."})]);const x=u("ol",{class:"timeline"});return i.activities.forEach(M=>{x.append(u("li",{class:"timeline__item timeline__item--"+(M.direction||"inbound")},[u("span",{class:"timeline__icon","aria-hidden":"true",text:hP[M.type]||"•"}),u("div",{class:"u-grow"},[u("div",{class:"u-spread"},[u("strong",{class:"u-truncate",text:M.subject||M.type||"Actividad"}),u("span",{class:"u-caption u-faint",text:nr(M.createdAt)})]),M.body?u("div",{class:"u-caption u-muted",text:M.body}):null])]))}),x}function C(x){const M=U(x),E=Hr[M.rating],w=Object.keys(fp).map(g=>{const _=Math.round((M.factors[g]||0)*100);return u("div",{class:"factor"},[u("div",{class:"u-spread u-caption"},[u("span",{text:fp[g]}),u("span",{class:"u-faint",text:`${_}% · peso ${Math.round(_R[g]*100)}%`})]),u("div",{class:"factor__track"},[u("div",{class:"factor__fill",style:{width:_+"%"}})])])});return u("div",{class:"u-stack"},[u("div",{class:"scorehero"},[u("div",{class:`scorehero__num ${E.cls}`,text:String(M.score)}),u("div",{class:"u-stack",style:{gap:"2px"}},[u("strong",{text:`${E.icon} ${E.label}`}),u("span",{class:"u-caption u-faint",text:"Heurística determinista (7 factores, sin IA)"})])]),u("div",{class:"u-stack",style:{gap:"10px"}},w)])}function k(x){const M=bt("crm.edit")||bt("crm.create"),E=u("textarea",{class:"textarea",placeholder:"Escribe una nota interna…",rows:"3"}),w=u("button",{class:"btn btn--gold btn--sm",type:"button"},["Agregar nota"]);w.addEventListener("click",async()=>{const _=E.value.trim();if(!_)return;w.disabled=!0;const I={body:_,authorName:"Tú",createdAt:new Date().toISOString()};try{z.get().mock?(BR(x.contactId,I),i.notes=mp(x.contactId),b()):(await oP(x.contactId,_),E.value=""),H("Nota agregada","ok")}catch{H("No se pudo guardar la nota","error")}finally{w.disabled=!1}});const g=u("div",{class:"u-stack"});return i.notes.length||g.append(u("div",{class:"u-caption u-faint",style:{padding:"8px 0"},text:"Aún no hay notas."})),i.notes.forEach(_=>g.append(u("div",{class:"detail-card"},[u("div",{class:"u-caption u-muted",text:_.body}),u("div",{class:"u-caption u-faint",text:`${_.authorName||"Asesor"} · ${nr(_.createdAt)}`})]))),u("div",{class:"u-stack"},[M?u("div",{class:"u-stack",style:{gap:"8px"}},[E,u("div",{class:"u-row",style:{justifyContent:"flex-end"}},[w])]):null,g])}function U(x){return ry(x,i.activities||[],i.contact)}}const Sy={days:[1,2,3,4,5,6],startHour:9,endHour:17,interval:60,maxPerSlot:1,bufferMin:15,blockedDates:[],blockedDateLabels:{},blockedHours:{}},pP=[["2026-01-01","Año Nuevo"],["2026-01-12","Reyes Magos"],["2026-03-23","San José"],["2026-04-02","Jueves Santo"],["2026-04-03","Viernes Santo"],["2026-05-01","Día del Trabajo"],["2026-05-18","Ascensión"],["2026-06-08","Corpus Christi"],["2026-06-15","Sagrado Corazón"],["2026-06-29","San Pedro y San Pablo"],["2026-07-20","Independencia"],["2026-08-07","Batalla de Boyacá"],["2026-08-17","Asunción de la Virgen"],["2026-10-12","Día de la Raza"],["2026-11-02","Todos los Santos"],["2026-11-16","Independencia de Cartagena"],["2026-12-08","Inmaculada Concepción"],["2026-12-25","Navidad"]],Ry=()=>De(ie,"config","availability"),Cy=()=>De(ie,"crm_config","advisorOverrides");function mP(n,e){return vr(Ry(),t=>{n({...Sy,...t.exists()?t.data():{}})},t=>e&&e(t))}async function gP(n,e){await N_(Ry(),{...n,updatedAt:new Date().toISOString(),updatedBy:e||null},{merge:!0})}function _P(n,e){return vr(Cy(),t=>{n(t.exists()&&t.data().overrides||{})},t=>e&&e(t))}async function yP(n,e){await N_(Cy(),{overrides:n,updatedAt:new Date().toISOString(),updatedBy:e||null})}const vP=["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"],So=()=>{const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`};function bP(n){const e={av:{...Sy},overrides:{},advisors:[],sub:null,subOv:null,loaded:!1},t=bt("calendar.config"),r=u("section",{class:"cfg"});if(pe(n),n.append(r),!t){r.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:"🔒"}),u("div",{class:"state__title",text:"Sin permiso"}),u("div",{class:"state__msg",text:"Solo quien administra la disponibilidad (permiso calendar.config) puede editar esto."})]));return}async function s(b,A){if(z.get().mock){Object.assign(e.av,b),m(),H(A+" (demo)","ok");return}try{await gP(b,z.get().user&&z.get().user.uid),H(A,"ok")}catch(P){H("No se pudo guardar: "+(P.message||P.code),"error")}}function i(){const b=e.av,A=vP.map((x,M)=>{const E=u("input",{type:"checkbox"});return E.checked=(b.days||[]).includes(M),E.dataset.dow=String(M),u("label",{class:"cfg-day"},[E,u("span",{text:x})])}),P=(x,M,E)=>{const w=u("select",{class:"select"});for(let g=M;g<=E;g++)w.append(u("option",{value:String(g),text:String(g).padStart(2,"0")+":00"}));return w.value=String(x),w},R=P(b.startHour,6,20),S=P(b.endHour,7,21),V=u("select",{class:"select"},[u("option",{value:"30",text:"Cada 30 min"}),u("option",{value:"60",text:"Cada hora"})]);V.value=String(b.interval||60);const C=u("input",{class:"input",type:"number",min:"1",max:"5",value:String(b.maxPerSlot||1)}),k=u("input",{class:"input",type:"number",min:"0",max:"60",step:"5",value:String(b.bufferMin!=null?b.bufferMin:15)}),U=u("button",{class:"btn btn--gold btn--sm",type:"button",text:"Guardar horario"});return U.addEventListener("click",()=>{const x=A.map(w=>w.querySelector("input")).filter(w=>w.checked).map(w=>parseInt(w.dataset.dow,10)).sort(),M=parseInt(R.value,10),E=parseInt(S.value,10);if(!x.length){H("Elige al menos un día.","error");return}if(M>=E){H("La hora de cierre debe ser mayor que la de apertura.","error");return}s({days:x,startHour:M,endHour:E,interval:parseInt(V.value,10)||60,maxPerSlot:Math.max(1,parseInt(C.value,10)||1),bufferMin:Math.max(0,parseInt(k.value,10)||0)},"✓ Horario guardado")}),u("div",{class:"cfg-card"},[u("h3",{class:"cfg-card__title",text:"🕘 Horario de atención"}),u("p",{class:"u-caption u-muted",text:"Esto es lo que el cliente ve en la web al pedir cita — los cambios aplican al instante."}),u("div",{class:"cfg-days"},A),u("div",{class:"cfg-grid"},[u("label",{class:"field"},[u("span",{class:"field__label",text:"Abre"}),R]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Cierra"}),S]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Citas web"}),V]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Citas por horario"}),C]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Colchón (min)"}),k])]),U])}function o(){const b=e.av,A=b.blockedDateLabels||{},P=So(),R=u("div",{class:"cfg-chips"}),S=(b.blockedDates||[]).slice().sort();S.length||R.append(u("span",{class:"u-caption u-muted",text:"Sin fechas bloqueadas — la web ofrece todos los días laborales."})),S.forEach(x=>{const M=x<P,E=u("button",{class:"cfg-chip__x",type:"button","aria-label":"Quitar",text:"✕"});E.addEventListener("click",()=>{const w=S.filter(g=>g!==x);s({blockedDates:w,blockedDateLabels:{[x]:np()}},"✓ Fecha desbloqueada: "+x)}),R.append(u("span",{class:"cfg-chip"+(M?" is-past":"")},[u("span",{text:x+(A[x]?" · "+A[x]:"")}),E]))});const V=u("input",{class:"input",type:"date",min:P}),C=u("input",{class:"input",type:"text",placeholder:"Motivo (opcional)",maxlength:"40"}),k=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"Bloquear fecha"});k.addEventListener("click",()=>{const x=V.value;if(!x){H("Elige una fecha.","error");return}if(S.includes(x)){H("Esa fecha ya está bloqueada.","error");return}const M={...A};C.value.trim()&&(M[x]=C.value.trim()),s({blockedDates:[...S,x].sort(),blockedDateLabels:M},"✓ Fecha bloqueada: "+x)});const U=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"🇨🇴 Cargar festivos de Colombia 2026"});return U.addEventListener("click",()=>{const x=pP.filter(([E])=>E>=P&&!S.includes(E));if(!x.length){H("Los festivos que faltan de 2026 ya están cargados.","ok");return}const M={...A};x.forEach(([E,w])=>{M[E]=w}),s({blockedDates:[...S,...x.map(([E])=>E)].sort(),blockedDateLabels:M},`✓ ${x.length} festivo(s) bloqueados`)}),u("div",{class:"cfg-card"},[u("h3",{class:"cfg-card__title",text:"📅 Fechas bloqueadas (festivos y cierres)"}),u("p",{class:"u-caption u-muted",text:"En estas fechas la web NO ofrece citas. Las fechas pasadas se limpian solas cada madrugada."}),R,u("div",{class:"cfg-row"},[V,C,k]),U])}function c(){const b=e.av,A=[],P=b.interval||60;for(let R=b.startHour*60;R<b.endHour*60;R+=P)A.push(String(Math.floor(R/60)).padStart(2,"0")+":"+String(R%60).padStart(2,"0"));return A}function l(){const A=e.av.blockedHours||{},P=u("div",{class:"cfg-bh"}),R=Object.entries(A).sort(([k],[U])=>k.localeCompare(U));R.length||P.append(u("span",{class:"u-caption u-muted",text:"Sin horas bloqueadas."})),R.forEach(([k,U])=>{const x=(U||[]).slice().sort().map(M=>{const E=u("button",{class:"cfg-chip__x",type:"button",text:"✕"});return E.addEventListener("click",()=>{const w=(A[k]||[]).filter(g=>g!==M);s({blockedHours:{[k]:w.length?w:np()}},`✓ ${k} ${M} desbloqueada`)}),u("span",{class:"cfg-chip"},[u("span",{text:M}),E])});P.append(u("div",{class:"cfg-bh__day"},[u("strong",{text:k}),u("div",{class:"cfg-chips"},x)]))});const S=u("input",{class:"input",type:"date",min:So()}),V=u("select",{class:"select"},c().map(k=>u("option",{value:k,text:k}))),C=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"Bloquear hora"});return C.addEventListener("click",()=>{const k=S.value,U=V.value;if(!k){H("Elige una fecha.","error");return}const x=A[k]||[];if(x.includes(U)){H("Esa hora ya está bloqueada.","error");return}s({blockedHours:{...A,[k]:[...x,U].sort()}},`✓ ${k} ${U} bloqueada`)}),u("div",{class:"cfg-card"},[u("h3",{class:"cfg-card__title",text:"⏰ Horas bloqueadas (un horario puntual)"}),P,u("div",{class:"cfg-row"},[S,V,C])])}async function h(b,A){if(z.get().mock){e.overrides=b,m(),H(A+" (demo)","ok");return}try{await yP(b,z.get().user&&z.get().user.uid),H(A,"ok")}catch(P){H("No se pudo guardar: "+(P.message||P.code),"error")}}function p(){const b=e.overrides||{},A=u("div",{class:"cfg-advisors"});return e.advisors.length||A.append(u("span",{class:"u-caption u-muted",text:"Cargando asesores…"})),e.advisors.forEach(P=>{const R=b[P.uid],S=u("div",{class:"cfg-advisor"});if(S.append(u("div",{class:"cfg-advisor__name"},[u("strong",{text:P.nombre}),R?u("span",{class:"cfg-advisor__badge is-off",text:`🏖 ${R.reason||"ausente"} · ${R.from} → ${R.to}`}):u("span",{class:"cfg-advisor__badge",text:"✅ disponible"})])),R){const V=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"Quitar ausencia"});V.addEventListener("click",()=>{const C={...b};delete C[P.uid],h(C,`✓ ${P.nombre} disponible de nuevo`)}),S.append(V)}else{const V=u("input",{class:"input",type:"date",min:So()}),C=u("input",{class:"input",type:"date",min:So()}),k=u("select",{class:"select"},[u("option",{value:"vacaciones",text:"Vacaciones"}),u("option",{value:"incapacidad",text:"Incapacidad"}),u("option",{value:"otro",text:"Otro"})]),U=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"Marcar ausencia"});U.addEventListener("click",()=>{if(!V.value||!C.value||V.value>C.value){H("Revisa el rango de fechas.","error");return}h({...b,[P.uid]:{name:P.nombre,from:V.value,to:C.value,reason:k.value}},`✓ Ausencia de ${P.nombre} registrada`)}),S.append(u("div",{class:"cfg-row"},[V,C,k,U]))}A.append(S)}),u("div",{class:"cfg-card"},[u("h3",{class:"cfg-card__title",text:"👤 Excepciones por asesor"}),u("p",{class:"u-caption u-muted",text:"Un asesor ausente no recibe leads de la rotación ni citas confirmadas a su nombre en esas fechas."}),A])}function m(){pe(r),r.append(u("div",{class:"cfg-cols"},[i(),o()]),u("div",{class:"cfg-cols"},[l(),p()]))}return z.get().mock?(e.loaded=!0,m()):(e.sub=mP(b=>{e.av=b,e.loaded=!0,m()},()=>{H("No se pudo cargar la configuración.","error")}),e.subOv=_P(b=>{e.overrides=b,e.loaded&&m()},()=>{})),vy().then(b=>{e.advisors=b,e.loaded&&m()}),function(){e.sub&&e.sub(),e.sub=null,e.subOv&&e.subOv(),e.subOv=null}}const Py=document.getElementById("app");iv();const IP=new URLSearchParams(location.search).get("mock")==="1",wP={bandeja:my,pipeline:pC,agenda:DC,reportes:KC,contactos:lP,config:bP};let Ro=null,Kr=null,Xn=null,Ll=null,Ho=null;function Sp(n){if(!Kr||n===Ll)return;Xn&&(Xn(),Xn=null),z.get().detailLeadId&&z.set({detailLeadId:null}),Xn=(wP[n]||my)(Kr.outlet)||null,Kr.setActive(n),Ll=n}function EP(){Kr=ZS(Py),fP(Kr.detailRoot),Sp(Y_()),Ho=KS(Sp)}function TP(){Xn&&(Xn(),Xn=null),Ho&&(Ho(),Ho=null),Kr=null,Ll=null}function AP(n){n.ready&&(n.user&&Ro!=="app"?(Ro="app",EP()):!n.user&&Ro!=="login"&&(TP(),Ro="login",n.detailLeadId&&z.set({detailLeadId:null}),eR(Py)))}z.subscribe(AP);IP?z.set({mock:!0,ready:!0,user:{uid:"u_ceo",email:"demo@altorra.local"},profile:{nombre:"Rodrigo (CEO)",cargo:"CEO",rol:"super_admin"},permissions:["*"]}):BS();
