(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();function Ly(n){let e={...n};const t=new Set;function r(){return e}function i(o){const c=typeof o=="function"?o(e):o;c&&(e={...e,...c},t.forEach(l=>l(e)))}function s(o){return t.add(o),()=>t.delete(o)}return{get:r,set:i,subscribe:s}}const K=Ly({ready:!1,authError:null,user:null,profile:null,permissions:[],team:[],theme:"light",mock:!1,detailLeadId:null}),gp="altorra-crm-theme";function My(){let n=localStorage.getItem(gp);n!=="light"&&n!=="dark"&&(n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),document.documentElement.dataset.theme=n,K.set({theme:n})}function Fy(){const n=document.documentElement.dataset.theme==="dark"?"light":"dark";return document.documentElement.dataset.theme=n,localStorage.setItem(gp,n),K.set({theme:n}),n}var Qd={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _p=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Uy=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=n[t++],o=n[t++],c=n[t++],l=((i&7)<<18|(s&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const s=n[t++],o=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},Cl={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const s=n[i],o=i+1<n.length,c=o?n[i+1]:0,l=i+2<n.length,d=l?n[i+2]:0,p=s>>2,m=(s&3)<<4|c>>4;let w=(c&15)<<2|d>>6,A=d&63;l||(A=64,o||(w=64)),r.push(t[p],t[m],t[w],t[A])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(_p(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Uy(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const s=t[n.charAt(i++)],c=i<n.length?t[n.charAt(i)]:0;++i;const d=i<n.length?t[n.charAt(i)]:64;++i;const m=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||c==null||d==null||m==null)throw new By;const w=s<<2|c>>4;if(r.push(w),d!==64){const A=c<<4&240|d>>2;if(r.push(A),m!==64){const C=d<<6&192|m;r.push(C)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class By extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const $y=function(n){const e=_p(n);return Cl.encodeByteArray(e,!0)},yp=function(n){return $y(n).replace(/\./g,"")},vp=function(n){try{return Cl.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function Ip(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const jy=()=>Ip().__FIREBASE_DEFAULTS__,qy=()=>{if(typeof process>"u"||typeof Qd>"u")return;const n=Qd.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},zy=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&vp(n[1]);return e&&JSON.parse(e)},ya=()=>{try{return jy()||qy()||zy()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},wp=n=>{var e,t;return(t=(e=ya())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Gy=n=>{const e=wp(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Ep=()=>{var n;return(n=ya())===null||n===void 0?void 0:n.config},bp=n=>{var e;return(e=ya())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ns{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ve(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Ky(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ve())}function Hy(){var n;const e=(n=ya())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Wy(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Qy(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Yy(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Jy(){const n=Ve();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Tp(){return!Hy()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function va(){try{return typeof indexedDB=="object"}catch{return!1}}function Xy(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zy="FirebaseError";class Nt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Zy,Object.setPrototypeOf(this,Nt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,li.prototype.create)}}class li{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?ev(s,r):"Error",c=`${this.serviceName}: ${o} (${i}).`;return new Nt(i,c,r)}}function ev(n,e){return n.replace(tv,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const tv=/\{\$([^}]+)}/g;function nv(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function rs(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const s=n[i],o=e[i];if(Yd(s)&&Yd(o)){if(!rs(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function Yd(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function As(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Ui(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function Bi(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function rv(n,e){const t=new iv(n,e);return t.subscribe.bind(t)}class iv{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");sv(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=Ic),i.error===void 0&&(i.error=Ic),i.complete===void 0&&(i.complete=Ic);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function sv(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Ic(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ov=1e3,av=2,cv=4*60*60*1e3,lv=.5;function uv(n,e=ov,t=av){const r=e*Math.pow(t,n),i=Math.round(lv*r*(Math.random()-.5)*2);return Math.min(cv,r+i)}/**
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
 */function we(n){return n&&n._delegate?n._delegate:n}class Pt{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dv{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new ns;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e?.identifier),i=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(fv(e))try{this.getOrInitializeService({instanceIdentifier:Mn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=Mn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Mn){return this.instances.has(e)}getOptions(e=Mn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[s,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(s);r===c&&o.resolve(i)}return i}onInit(e,t){var r;const i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:hv(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Mn){return this.component?this.component.multipleInstances?e:Mn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function hv(n){return n===Mn?void 0:n}function fv(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pv{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new dv(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ae;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ae||(ae={}));const mv={debug:ae.DEBUG,verbose:ae.VERBOSE,info:ae.INFO,warn:ae.WARN,error:ae.ERROR,silent:ae.SILENT},gv=ae.INFO,_v={[ae.DEBUG]:"log",[ae.VERBOSE]:"log",[ae.INFO]:"info",[ae.WARN]:"warn",[ae.ERROR]:"error"},yv=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=_v[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ia{constructor(e){this.name=e,this._logLevel=gv,this._logHandler=yv,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ae))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?mv[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ae.DEBUG,...e),this._logHandler(this,ae.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ae.VERBOSE,...e),this._logHandler(this,ae.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ae.INFO,...e),this._logHandler(this,ae.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ae.WARN,...e),this._logHandler(this,ae.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ae.ERROR,...e),this._logHandler(this,ae.ERROR,...e)}}const vv=(n,e)=>e.some(t=>n instanceof t);let Jd,Xd;function Iv(){return Jd||(Jd=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function wv(){return Xd||(Xd=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Ap=new WeakMap,Bc=new WeakMap,Rp=new WeakMap,wc=new WeakMap,kl=new WeakMap;function Ev(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",o)},s=()=>{t(fn(n.result)),i()},o=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Ap.set(t,n)}).catch(()=>{}),kl.set(e,n),e}function bv(n){if(Bc.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",o),n.removeEventListener("abort",o)},s=()=>{t(),i()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",o),n.addEventListener("abort",o)});Bc.set(n,e)}let $c={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Bc.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Rp.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return fn(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Tv(n){$c=n($c)}function Av(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Ec(this),e,...t);return Rp.set(r,e.sort?e.sort():[e]),fn(r)}:wv().includes(n)?function(...e){return n.apply(Ec(this),e),fn(Ap.get(this))}:function(...e){return fn(n.apply(Ec(this),e))}}function Rv(n){return typeof n=="function"?Av(n):(n instanceof IDBTransaction&&bv(n),vv(n,Iv())?new Proxy(n,$c):n)}function fn(n){if(n instanceof IDBRequest)return Ev(n);if(wc.has(n))return wc.get(n);const e=Rv(n);return e!==n&&(wc.set(n,e),kl.set(e,n)),e}const Ec=n=>kl.get(n);function Sv(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(n,e),c=fn(o);return r&&o.addEventListener("upgradeneeded",l=>{r(fn(o.result),l.oldVersion,l.newVersion,fn(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{s&&l.addEventListener("close",()=>s()),i&&l.addEventListener("versionchange",d=>i(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const Pv=["get","getKey","getAll","getAllKeys","count"],Cv=["put","add","delete","clear"],bc=new Map;function Zd(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(bc.get(e))return bc.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=Cv.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Pv.includes(t)))return;const s=async function(o,...c){const l=this.transaction(o,i?"readwrite":"readonly");let d=l.store;return r&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),i&&l.done]))[0]};return bc.set(e,s),s}Tv(n=>({...n,get:(e,t,r)=>Zd(e,t)||n.get(e,t,r),has:(e,t)=>!!Zd(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kv{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Dv(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function Dv(n){const e=n.getComponent();return e?.type==="VERSION"}const jc="@firebase/app",eh="0.11.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $t=new Ia("@firebase/app"),Nv="@firebase/app-compat",xv="@firebase/analytics-compat",Vv="@firebase/analytics",Ov="@firebase/app-check-compat",Lv="@firebase/app-check",Mv="@firebase/auth",Fv="@firebase/auth-compat",Uv="@firebase/database",Bv="@firebase/data-connect",$v="@firebase/database-compat",jv="@firebase/functions",qv="@firebase/functions-compat",zv="@firebase/installations",Gv="@firebase/installations-compat",Kv="@firebase/messaging",Hv="@firebase/messaging-compat",Wv="@firebase/performance",Qv="@firebase/performance-compat",Yv="@firebase/remote-config",Jv="@firebase/remote-config-compat",Xv="@firebase/storage",Zv="@firebase/storage-compat",eI="@firebase/firestore",tI="@firebase/vertexai",nI="@firebase/firestore-compat",rI="firebase",iI="11.3.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qc="[DEFAULT]",sI={[jc]:"fire-core",[Nv]:"fire-core-compat",[Vv]:"fire-analytics",[xv]:"fire-analytics-compat",[Lv]:"fire-app-check",[Ov]:"fire-app-check-compat",[Mv]:"fire-auth",[Fv]:"fire-auth-compat",[Uv]:"fire-rtdb",[Bv]:"fire-data-connect",[$v]:"fire-rtdb-compat",[jv]:"fire-fn",[qv]:"fire-fn-compat",[zv]:"fire-iid",[Gv]:"fire-iid-compat",[Kv]:"fire-fcm",[Hv]:"fire-fcm-compat",[Wv]:"fire-perf",[Qv]:"fire-perf-compat",[Yv]:"fire-rc",[Jv]:"fire-rc-compat",[Xv]:"fire-gcs",[Zv]:"fire-gcs-compat",[eI]:"fire-fst",[nI]:"fire-fst-compat",[tI]:"fire-vertex","fire-js":"fire-js",[rI]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fo=new Map,oI=new Map,zc=new Map;function th(n,e){try{n.container.addComponent(e)}catch(t){$t.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function jt(n){const e=n.name;if(zc.has(e))return $t.debug(`There were multiple attempts to register component ${e}.`),!1;zc.set(e,n);for(const t of Fo.values())th(t,n);for(const t of oI.values())th(t,n);return!0}function ui(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function ut(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aI={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},pn=new li("app","Firebase",aI);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cI{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Pt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw pn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const di=iI;function Sp(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:qc,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw pn.create("bad-app-name",{appName:String(i)});if(t||(t=Ep()),!t)throw pn.create("no-options");const s=Fo.get(i);if(s){if(rs(t,s.options)&&rs(r,s.config))return s;throw pn.create("duplicate-app",{appName:i})}const o=new pv(i);for(const l of zc.values())o.addComponent(l);const c=new cI(t,r,o);return Fo.set(i,c),c}function Dl(n=qc){const e=Fo.get(n);if(!e&&n===qc&&Ep())return Sp();if(!e)throw pn.create("no-app",{appName:n});return e}function _t(n,e,t){var r;let i=(r=sI[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const c=[`Unable to register library "${i}" with version "${e}":`];s&&c.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&c.push("and"),o&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),$t.warn(c.join(" "));return}jt(new Pt(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const lI="firebase-heartbeat-database",uI=1,is="firebase-heartbeat-store";let Tc=null;function Pp(){return Tc||(Tc=Sv(lI,uI,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(is)}catch(t){console.warn(t)}}}}).catch(n=>{throw pn.create("idb-open",{originalErrorMessage:n.message})})),Tc}async function dI(n){try{const t=(await Pp()).transaction(is),r=await t.objectStore(is).get(Cp(n));return await t.done,r}catch(e){if(e instanceof Nt)$t.warn(e.message);else{const t=pn.create("idb-get",{originalErrorMessage:e?.message});$t.warn(t.message)}}}async function nh(n,e){try{const r=(await Pp()).transaction(is,"readwrite");await r.objectStore(is).put(e,Cp(n)),await r.done}catch(t){if(t instanceof Nt)$t.warn(t.message);else{const r=pn.create("idb-set",{originalErrorMessage:t?.message});$t.warn(r.message)}}}function Cp(n){return`${n.name}!${n.options.appId}`}/**
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
 */const hI=1024,fI=30;class pI{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new gI(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=rh();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats.length>fI){const o=_I(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){$t.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=rh(),{heartbeatsToSend:r,unsentEntries:i}=mI(this._heartbeatsCache.heartbeats),s=yp(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return $t.warn(t),""}}}function rh(){return new Date().toISOString().substring(0,10)}function mI(n,e=hI){const t=[];let r=n.slice();for(const i of n){const s=t.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),ih(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),ih(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class gI{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return va()?Xy().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await dI(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return nh(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return nh(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function ih(n){return yp(JSON.stringify({version:2,heartbeats:n})).length}function _I(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yI(n){jt(new Pt("platform-logger",e=>new kv(e),"PRIVATE")),jt(new Pt("heartbeat",e=>new pI(e),"PRIVATE")),_t(jc,eh,n),_t(jc,eh,"esm2017"),_t("fire-js","")}yI("");function Nl(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function kp(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const vI=kp,Dp=new li("auth","Firebase",kp());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uo=new Ia("@firebase/auth");function II(n,...e){Uo.logLevel<=ae.WARN&&Uo.warn(`Auth (${di}): ${n}`,...e)}function vo(n,...e){Uo.logLevel<=ae.ERROR&&Uo.error(`Auth (${di}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yt(n,...e){throw xl(n,...e)}function Tt(n,...e){return xl(n,...e)}function Np(n,e,t){const r=Object.assign(Object.assign({},vI()),{[e]:t});return new li("auth","Firebase",r).create(e,{appName:n.name})}function mn(n){return Np(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function xl(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Dp.create(n,...e)}function X(n,e,...t){if(!n)throw xl(e,...t)}function Mt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw vo(e),new Error(e)}function qt(n,e){n||Mt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gc(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function wI(){return sh()==="http:"||sh()==="https:"}function sh(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function EI(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(wI()||Qy()||"connection"in navigator)?navigator.onLine:!0}function bI(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rs{constructor(e,t){this.shortDelay=e,this.longDelay=t,qt(t>e,"Short delay should be less than long delay!"),this.isMobile=Ky()||Yy()}get(){return EI()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vl(n,e){qt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xp{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Mt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Mt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Mt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TI={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AI=new Rs(3e4,6e4);function dr(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function An(n,e,t,r,i={}){return Vp(n,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const c=As(Object.assign({key:n.config.apiKey},o)).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const d=Object.assign({method:e,headers:l},s);return Wy()||(d.referrerPolicy="no-referrer"),xp.fetch()(Op(n,n.config.apiHost,t,c),d)})}async function Vp(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},TI),e);try{const i=new SI(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw ro(n,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const c=s.ok?o.errorMessage:o.error.message,[l,d]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw ro(n,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw ro(n,"email-already-in-use",o);if(l==="USER_DISABLED")throw ro(n,"user-disabled",o);const p=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Np(n,p,d);yt(n,p)}}catch(i){if(i instanceof Nt)throw i;yt(n,"network-request-failed",{message:String(i)})}}async function wa(n,e,t,r,i={}){const s=await An(n,e,t,r,i);return"mfaPendingCredential"in s&&yt(n,"multi-factor-auth-required",{_serverResponse:s}),s}function Op(n,e,t,r){const i=`${e}${t}?${r}`;return n.config.emulator?Vl(n.config,i):`${n.config.apiScheme}://${i}`}function RI(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class SI{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Tt(this.auth,"network-request-failed")),AI.get())})}}function ro(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=Tt(n,e,r);return i.customData._tokenResponse=t,i}function oh(n){return n!==void 0&&n.enterprise!==void 0}class PI{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return RI(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function CI(n,e){return An(n,"GET","/v2/recaptchaConfig",dr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kI(n,e){return An(n,"POST","/v1/accounts:delete",e)}async function Lp(n,e){return An(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hi(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function DI(n,e=!1){const t=we(n),r=await t.getIdToken(e),i=Ol(r);X(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s?.sign_in_provider;return{claims:i,token:r,authTime:Hi(Ac(i.auth_time)),issuedAtTime:Hi(Ac(i.iat)),expirationTime:Hi(Ac(i.exp)),signInProvider:o||null,signInSecondFactor:s?.sign_in_second_factor||null}}function Ac(n){return Number(n)*1e3}function Ol(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return vo("JWT malformed, contained fewer than 3 sections"),null;try{const i=vp(t);return i?JSON.parse(i):(vo("Failed to decode base64 JWT payload"),null)}catch(i){return vo("Caught error parsing JWT payload as JSON",i?.toString()),null}}function ah(n){const e=Ol(n);return X(e,"internal-error"),X(typeof e.exp<"u","internal-error"),X(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ss(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Nt&&NI(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function NI({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xI{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kc{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Hi(this.lastLoginAt),this.creationTime=Hi(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bo(n){var e;const t=n.auth,r=await n.getIdToken(),i=await ss(n,Lp(t,{idToken:r}));X(i?.users.length,t,"internal-error");const s=i.users[0];n._notifyReloadListener(s);const o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?Mp(s.providerUserInfo):[],c=OI(n.providerData,o),l=n.isAnonymous,d=!(n.email&&s.passwordHash)&&!c?.length,p=l?d:!1,m={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:c,metadata:new Kc(s.createdAt,s.lastLoginAt),isAnonymous:p};Object.assign(n,m)}async function VI(n){const e=we(n);await Bo(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function OI(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function Mp(n){return n.map(e=>{var{providerId:t}=e,r=Nl(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function LI(n,e){const t=await Vp(n,{},async()=>{const r=As({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,o=Op(n,i,"/v1/token",`key=${s}`),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",xp.fetch()(o,{method:"POST",headers:c,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function MI(n,e){return An(n,"POST","/v2/accounts:revokeToken",dr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Or{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){X(e.idToken,"internal-error"),X(typeof e.idToken<"u","internal-error"),X(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):ah(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){X(e.length!==0,"internal-error");const t=ah(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(X(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:s}=await LI(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:s}=t,o=new Or;return r&&(X(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(X(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(X(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Or,this.toJSON())}_performRefresh(){return Mt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function en(n,e){X(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Ft{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=Nl(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new xI(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Kc(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await ss(this,this.stsTokenManager.getToken(this.auth,e));return X(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return DI(this,e)}reload(){return VI(this)}_assign(e){this!==e&&(X(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Ft(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){X(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Bo(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ut(this.auth.app))return Promise.reject(mn(this.auth));const e=await this.getIdToken();return await ss(this,kI(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,o,c,l,d,p;const m=(r=t.displayName)!==null&&r!==void 0?r:void 0,w=(i=t.email)!==null&&i!==void 0?i:void 0,A=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,C=(o=t.photoURL)!==null&&o!==void 0?o:void 0,k=(c=t.tenantId)!==null&&c!==void 0?c:void 0,P=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,B=(d=t.createdAt)!==null&&d!==void 0?d:void 0,D=(p=t.lastLoginAt)!==null&&p!==void 0?p:void 0,{uid:L,emailVerified:q,isAnonymous:V,providerData:F,stsTokenManager:T}=t;X(L&&T,e,"internal-error");const E=Or.fromJSON(this.name,T);X(typeof L=="string",e,"internal-error"),en(m,e.name),en(w,e.name),X(typeof q=="boolean",e,"internal-error"),X(typeof V=="boolean",e,"internal-error"),en(A,e.name),en(C,e.name),en(k,e.name),en(P,e.name),en(B,e.name),en(D,e.name);const g=new Ft({uid:L,auth:e,email:w,emailVerified:q,displayName:m,isAnonymous:V,photoURL:C,phoneNumber:A,tenantId:k,stsTokenManager:E,createdAt:B,lastLoginAt:D});return F&&Array.isArray(F)&&(g.providerData=F.map(_=>Object.assign({},_))),P&&(g._redirectEventId=P),g}static async _fromIdTokenResponse(e,t,r=!1){const i=new Or;i.updateFromServerResponse(t);const s=new Ft({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Bo(s),s}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];X(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?Mp(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!s?.length,c=new Or;c.updateFromIdToken(r);const l=new Ft({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:o}),d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new Kc(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!s?.length};return Object.assign(l,d),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ch=new Map;function Ut(n){qt(n instanceof Function,"Expected a class definition");let e=ch.get(n);return e?(qt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,ch.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fp{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Fp.type="NONE";const lh=Fp;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Io(n,e,t){return`firebase:${n}:${e}:${t}`}class Lr{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Io(this.userKey,i.apiKey,s),this.fullPersistenceKey=Io("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Ft._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Lr(Ut(lh),e,r);const i=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let s=i[0]||Ut(lh);const o=Io(r,e.config.apiKey,e.name);let c=null;for(const d of t)try{const p=await d._get(o);if(p){const m=Ft._fromJSON(e,p);d!==s&&(c=m),s=d;break}}catch{}const l=i.filter(d=>d._shouldAllowMigration);return!s._shouldAllowMigration||!l.length?new Lr(s,e,r):(s=l[0],c&&await s._set(o,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==s)try{await d._remove(o)}catch{}})),new Lr(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uh(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(jp(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Up(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(zp(e))return"Blackberry";if(Gp(e))return"Webos";if(Bp(e))return"Safari";if((e.includes("chrome/")||$p(e))&&!e.includes("edge/"))return"Chrome";if(qp(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function Up(n=Ve()){return/firefox\//i.test(n)}function Bp(n=Ve()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function $p(n=Ve()){return/crios\//i.test(n)}function jp(n=Ve()){return/iemobile/i.test(n)}function qp(n=Ve()){return/android/i.test(n)}function zp(n=Ve()){return/blackberry/i.test(n)}function Gp(n=Ve()){return/webos/i.test(n)}function Ll(n=Ve()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function FI(n=Ve()){var e;return Ll(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function UI(){return Jy()&&document.documentMode===10}function Kp(n=Ve()){return Ll(n)||qp(n)||Gp(n)||zp(n)||/windows phone/i.test(n)||jp(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hp(n,e=[]){let t;switch(n){case"Browser":t=uh(Ve());break;case"Worker":t=`${uh(Ve())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${di}/${r}`}/**
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
 */class BI{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=s=>new Promise((o,c)=>{try{const l=e(s);o(l)}catch(l){c(l)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
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
 */async function $I(n,e={}){return An(n,"GET","/v2/passwordPolicy",dr(n,e))}/**
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
 */const jI=6;class qI{constructor(e){var t,r,i,s;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:jI,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,s,o,c;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(r=l.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(i=l.containsLowercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(s=l.containsUppercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(o=l.containsNumericCharacter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(c=l.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),l}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zI{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new dh(this),this.idTokenSubscription=new dh(this),this.beforeStateQueue=new BI(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Dp,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Ut(t)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await Lr.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Lp(this,{idToken:e}),r=await Ft._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(ut(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=i?._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===c)&&l?.user&&(i=l.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return X(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Bo(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=bI()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ut(this.app))return Promise.reject(mn(this));const t=e?we(e):null;return t&&X(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&X(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ut(this.app)?Promise.reject(mn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ut(this.app)?Promise.reject(mn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Ut(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await $I(this),t=new qI(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new li("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await MI(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Ut(e)||this._popupRedirectResolver;X(t,this,"argument-error"),this.redirectPersistenceManager=await Lr.create(this,[Ut(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(X(c,this,"internal-error"),c.then(()=>{o||s(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,r,i);return()=>{o=!0,l()}}else{const l=e.addObserver(t);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return X(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Hp(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;if(ut(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&II(`Error while retrieving App Check token: ${t.error}`),t?.token}}function hi(n){return we(n)}class dh{constructor(e){this.auth=e,this.observer=null,this.addObserver=rv(t=>this.observer=t)}get next(){return X(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ea={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function GI(n){Ea=n}function Wp(n){return Ea.loadJS(n)}function KI(){return Ea.recaptchaEnterpriseScript}function HI(){return Ea.gapiScript}function WI(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class QI{constructor(){this.enterprise=new YI}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class YI{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const JI="recaptcha-enterprise",Qp="NO_RECAPTCHA";class XI{constructor(e){this.type=JI,this.auth=hi(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,c)=>{CI(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const d=new PI(l);return s.tenantId==null?s._agentRecaptchaConfig=d:s._tenantRecaptchaConfigs[s.tenantId]=d,o(d.siteKey)}}).catch(l=>{c(l)})})}function i(s,o,c){const l=window.grecaptcha;oh(l)?l.enterprise.ready(()=>{l.enterprise.execute(s,{action:e}).then(d=>{o(d)}).catch(()=>{o(Qp)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new QI().execute("siteKey",{action:"verify"}):new Promise((s,o)=>{r(this.auth).then(c=>{if(!t&&oh(window.grecaptcha))i(c,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let l=KI();l.length!==0&&(l+=c),Wp(l).then(()=>{i(c,s,o)}).catch(d=>{o(d)})}}).catch(c=>{o(c)})})}}async function hh(n,e,t,r=!1,i=!1){const s=new XI(n);let o;if(i)o=Qp;else try{o=await s.verify(t)}catch{o=await s.verify(t,!0)}const c=Object.assign({},e);if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const l=c.phoneEnrollmentInfo.phoneNumber,d=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:l,recaptchaToken:d,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const l=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function fh(n,e,t,r,i){var s;if(!((s=n._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await hh(n,e,t,t==="getOobCode");return r(n,o)}else return r(n,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await hh(n,e,t,t==="getOobCode");return r(n,c)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ZI(n,e){const t=ui(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(rs(s,e??{}))return i;yt(i,"already-initialized")}return t.initialize({options:e})}function ew(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(Ut);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function tw(n,e,t){const r=hi(n);X(r._canInitEmulator,r,"emulator-config-failed"),X(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=Yp(e),{host:o,port:c}=nw(e),l=c===null?"":`:${c}`;r.config.emulator={url:`${s}//${o}${l}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:c,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),rw()}function Yp(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function nw(n){const e=Yp(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:ph(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:ph(o)}}}function ph(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function rw(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ml{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Mt("not implemented")}_getIdTokenResponse(e){return Mt("not implemented")}_linkToIdToken(e,t){return Mt("not implemented")}_getReauthenticationResolver(e){return Mt("not implemented")}}async function iw(n,e){return An(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sw(n,e){return wa(n,"POST","/v1/accounts:signInWithPassword",dr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ow(n,e){return wa(n,"POST","/v1/accounts:signInWithEmailLink",dr(n,e))}async function aw(n,e){return wa(n,"POST","/v1/accounts:signInWithEmailLink",dr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class os extends Ml{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new os(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new os(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return fh(e,t,"signInWithPassword",sw);case"emailLink":return ow(e,{email:this._email,oobCode:this._password});default:yt(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return fh(e,r,"signUpPassword",iw);case"emailLink":return aw(e,{idToken:t,email:this._email,oobCode:this._password});default:yt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mr(n,e){return wa(n,"POST","/v1/accounts:signInWithIdp",dr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cw="http://localhost";class Xn extends Ml{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Xn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):yt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,s=Nl(t,["providerId","signInMethod"]);if(!r||!i)return null;const o=new Xn(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Mr(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Mr(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Mr(e,t)}buildRequest(){const e={requestUri:cw,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=As(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lw(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function uw(n){const e=Ui(Bi(n)).link,t=e?Ui(Bi(e)).deep_link_id:null,r=Ui(Bi(n)).deep_link_id;return(r?Ui(Bi(r)).link:null)||r||t||e||n}class Fl{constructor(e){var t,r,i,s,o,c;const l=Ui(Bi(e)),d=(t=l.apiKey)!==null&&t!==void 0?t:null,p=(r=l.oobCode)!==null&&r!==void 0?r:null,m=lw((i=l.mode)!==null&&i!==void 0?i:null);X(d&&p&&m,"argument-error"),this.apiKey=d,this.operation=m,this.code=p,this.continueUrl=(s=l.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=l.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(c=l.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const t=uw(e);try{return new Fl(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fi{constructor(){this.providerId=fi.PROVIDER_ID}static credential(e,t){return os._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=Fl.parseLink(t);return X(r,"argument-error"),os._fromEmailAndCode(e,r.code,r.tenantId)}}fi.PROVIDER_ID="password";fi.EMAIL_PASSWORD_SIGN_IN_METHOD="password";fi.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jp{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ss extends Jp{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class an extends Ss{constructor(){super("facebook.com")}static credential(e){return Xn._fromParams({providerId:an.PROVIDER_ID,signInMethod:an.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return an.credentialFromTaggedObject(e)}static credentialFromError(e){return an.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return an.credential(e.oauthAccessToken)}catch{return null}}}an.FACEBOOK_SIGN_IN_METHOD="facebook.com";an.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cn extends Ss{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Xn._fromParams({providerId:cn.PROVIDER_ID,signInMethod:cn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return cn.credentialFromTaggedObject(e)}static credentialFromError(e){return cn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return cn.credential(t,r)}catch{return null}}}cn.GOOGLE_SIGN_IN_METHOD="google.com";cn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ln extends Ss{constructor(){super("github.com")}static credential(e){return Xn._fromParams({providerId:ln.PROVIDER_ID,signInMethod:ln.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ln.credentialFromTaggedObject(e)}static credentialFromError(e){return ln.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ln.credential(e.oauthAccessToken)}catch{return null}}}ln.GITHUB_SIGN_IN_METHOD="github.com";ln.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class un extends Ss{constructor(){super("twitter.com")}static credential(e,t){return Xn._fromParams({providerId:un.PROVIDER_ID,signInMethod:un.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return un.credentialFromTaggedObject(e)}static credentialFromError(e){return un.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return un.credential(t,r)}catch{return null}}}un.TWITTER_SIGN_IN_METHOD="twitter.com";un.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const s=await Ft._fromIdTokenResponse(e,r,i),o=mh(r);return new zr({user:s,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=mh(r);return new zr({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function mh(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $o extends Nt{constructor(e,t,r,i){var s;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,$o.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new $o(e,t,r,i)}}function Xp(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?$o._fromErrorAndOperation(n,s,e,r):s})}async function dw(n,e,t=!1){const r=await ss(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return zr._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hw(n,e,t=!1){const{auth:r}=n;if(ut(r.app))return Promise.reject(mn(r));const i="reauthenticate";try{const s=await ss(n,Xp(r,i,e,n),t);X(s.idToken,r,"internal-error");const o=Ol(s.idToken);X(o,r,"internal-error");const{sub:c}=o;return X(n.uid===c,r,"user-mismatch"),zr._forOperation(n,i,s)}catch(s){throw s?.code==="auth/user-not-found"&&yt(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zp(n,e,t=!1){if(ut(n.app))return Promise.reject(mn(n));const r="signIn",i=await Xp(n,r,e),s=await zr._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function fw(n,e){return Zp(hi(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pw(n){const e=hi(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function mw(n,e,t){return ut(n.app)?Promise.reject(mn(n)):fw(we(n),fi.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&pw(n),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gw(n,e){return we(n).setPersistence(e)}function _w(n,e,t,r){return we(n).onIdTokenChanged(e,t,r)}function yw(n,e,t){return we(n).beforeAuthStateChanged(e,t)}function vw(n,e,t,r){return we(n).onAuthStateChanged(e,t,r)}function Iw(n){return we(n).signOut()}const jo="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class em{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(jo,"1"),this.storage.removeItem(jo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ww=1e3,Ew=10;class tm extends em{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Kp(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,l)=>{this.notifyListeners(o,l)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);UI()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Ew):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},ww)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}tm.type="LOCAL";const nm=tm;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rm extends em{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}rm.type="SESSION";const im=rm;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bw(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ba{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new ba(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:s}=t.data,o=this.handlersMap[i];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const c=Array.from(o).map(async d=>d(t.origin,s)),l=await bw(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ba.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ul(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tw{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((c,l)=>{const d=Ul("",20);i.port1.start();const p=setTimeout(()=>{l(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(m){const w=m;if(w.data.eventId===d)switch(w.data.status){case"ack":clearTimeout(p),s=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(w.data.response);break;default:clearTimeout(p),clearTimeout(s),l(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function At(){return window}function Aw(n){At().location.href=n}/**
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
 */function sm(){return typeof At().WorkerGlobalScope<"u"&&typeof At().importScripts=="function"}async function Rw(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Sw(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function Pw(){return sm()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const om="firebaseLocalStorageDb",Cw=1,qo="firebaseLocalStorage",am="fbase_key";class Ps{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Ta(n,e){return n.transaction([qo],e?"readwrite":"readonly").objectStore(qo)}function kw(){const n=indexedDB.deleteDatabase(om);return new Ps(n).toPromise()}function Hc(){const n=indexedDB.open(om,Cw);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(qo,{keyPath:am})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(qo)?e(r):(r.close(),await kw(),e(await Hc()))})})}async function gh(n,e,t){const r=Ta(n,!0).put({[am]:e,value:t});return new Ps(r).toPromise()}async function Dw(n,e){const t=Ta(n,!1).get(e),r=await new Ps(t).toPromise();return r===void 0?null:r.value}function _h(n,e){const t=Ta(n,!0).delete(e);return new Ps(t).toPromise()}const Nw=800,xw=3;class cm{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Hc(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>xw)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return sm()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ba._getInstance(Pw()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Rw(),!this.activeServiceWorker)return;this.sender=new Tw(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Sw()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Hc();return await gh(e,jo,"1"),await _h(e,jo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>gh(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>Dw(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>_h(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=Ta(i,!1).getAll();return new Ps(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Nw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}cm.type="LOCAL";const Vw=cm;new Rs(3e4,6e4);/**
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
 */function Ow(n,e){return e?Ut(e):(X(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bl extends Ml{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Mr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Mr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Mr(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Lw(n){return Zp(n.auth,new Bl(n),n.bypassAuthState)}function Mw(n){const{auth:e,user:t}=n;return X(t,e,"internal-error"),hw(t,new Bl(n),n.bypassAuthState)}async function Fw(n){const{auth:e,user:t}=n;return X(t,e,"internal-error"),dw(t,new Bl(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lm{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:o,type:c}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Lw;case"linkViaPopup":case"linkViaRedirect":return Fw;case"reauthViaPopup":case"reauthViaRedirect":return Mw;default:yt(this.auth,"internal-error")}}resolve(e){qt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){qt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uw=new Rs(2e3,1e4);class xr extends lm{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,xr.currentPopupAction&&xr.currentPopupAction.cancel(),xr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return X(e,this.auth,"internal-error"),e}async onExecution(){qt(this.filter.length===1,"Popup operations only handle one event");const e=Ul();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Tt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Tt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,xr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Tt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Uw.get())};e()}}xr.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bw="pendingRedirect",wo=new Map;class $w extends lm{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=wo.get(this.auth._key());if(!e){try{const r=await jw(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}wo.set(this.auth._key(),e)}return this.bypassAuthState||wo.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function jw(n,e){const t=Gw(e),r=zw(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}function qw(n,e){wo.set(n._key(),e)}function zw(n){return Ut(n._redirectPersistence)}function Gw(n){return Io(Bw,n.config.apiKey,n.name)}async function Kw(n,e,t=!1){if(ut(n.app))return Promise.reject(mn(n));const r=hi(n),i=Ow(r,e),o=await new $w(r,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hw=10*60*1e3;class Ww{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Qw(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!um(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Tt(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Hw&&this.cachedEventUids.clear(),this.cachedEventUids.has(yh(e))}saveEventToCache(e){this.cachedEventUids.add(yh(e)),this.lastProcessedEventTime=Date.now()}}function yh(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function um({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function Qw(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return um(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yw(n,e={}){return An(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jw=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Xw=/^https?/;async function Zw(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Yw(n);for(const t of e)try{if(eE(t))return}catch{}yt(n,"unauthorized-domain")}function eE(n){const e=Gc(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!Xw.test(t))return!1;if(Jw.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
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
 */const tE=new Rs(3e4,6e4);function vh(){const n=At().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function nE(n){return new Promise((e,t)=>{var r,i,s;function o(){vh(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{vh(),t(Tt(n,"network-request-failed"))},timeout:tE.get()})}if(!((i=(r=At().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=At().gapi)===null||s===void 0)&&s.load)o();else{const c=WI("iframefcb");return At()[c]=()=>{gapi.load?o():t(Tt(n,"network-request-failed"))},Wp(`${HI()}?onload=${c}`).catch(l=>t(l))}}).catch(e=>{throw Eo=null,e})}let Eo=null;function rE(n){return Eo=Eo||nE(n),Eo}/**
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
 */const iE=new Rs(5e3,15e3),sE="__/auth/iframe",oE="emulator/auth/iframe",aE={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},cE=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function lE(n){const e=n.config;X(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Vl(e,oE):`https://${n.config.authDomain}/${sE}`,r={apiKey:e.apiKey,appName:n.name,v:di},i=cE.get(n.config.apiHost);i&&(r.eid=i);const s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${As(r).slice(1)}`}async function uE(n){const e=await rE(n),t=At().gapi;return X(t,n,"internal-error"),e.open({where:document.body,url:lE(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:aE,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=Tt(n,"network-request-failed"),c=At().setTimeout(()=>{s(o)},iE.get());function l(){At().clearTimeout(c),i(r)}r.ping(l).then(l,()=>{s(o)})}))}/**
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
 */const dE={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},hE=500,fE=600,pE="_blank",mE="http://localhost";class Ih{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function gE(n,e,t,r=hE,i=fE){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const l=Object.assign(Object.assign({},dE),{width:r.toString(),height:i.toString(),top:s,left:o}),d=Ve().toLowerCase();t&&(c=$p(d)?pE:t),Up(d)&&(e=e||mE,l.scrollbars="yes");const p=Object.entries(l).reduce((w,[A,C])=>`${w}${A}=${C},`,"");if(FI(d)&&c!=="_self")return _E(e||"",c),new Ih(null);const m=window.open(e||"",c,p);X(m,n,"popup-blocked");try{m.focus()}catch{}return new Ih(m)}function _E(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const yE="__/auth/handler",vE="emulator/auth/handler",IE=encodeURIComponent("fac");async function wh(n,e,t,r,i,s){X(n.config.authDomain,n,"auth-domain-config-required"),X(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:di,eventId:i};if(e instanceof Jp){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",nv(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,m]of Object.entries({}))o[p]=m}if(e instanceof Ss){const p=e.getScopes().filter(m=>m!=="");p.length>0&&(o.scopes=p.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const p of Object.keys(c))c[p]===void 0&&delete c[p];const l=await n._getAppCheckToken(),d=l?`#${IE}=${encodeURIComponent(l)}`:"";return`${wE(n)}?${As(c).slice(1)}${d}`}function wE({config:n}){return n.emulator?Vl(n,vE):`https://${n.authDomain}/${yE}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rc="webStorageSupport";class EE{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=im,this._completeRedirectFn=Kw,this._overrideRedirectResult=qw}async _openPopup(e,t,r,i){var s;qt((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const o=await wh(e,t,r,Gc(),i);return gE(e,o,Ul())}async _openRedirect(e,t,r,i){await this._originValidation(e);const s=await wh(e,t,r,Gc(),i);return Aw(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(qt(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await uE(e),r=new Ww(e);return t.register("authEvent",i=>(X(i?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Rc,{type:Rc},i=>{var s;const o=(s=i?.[0])===null||s===void 0?void 0:s[Rc];o!==void 0&&t(!!o),yt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Zw(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Kp()||Bp()||Ll()}}const bE=EE;var Eh="@firebase/auth",bh="1.9.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TE{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){X(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AE(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function RE(n){jt(new Pt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;X(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Hp(n)},d=new zI(r,i,s,l);return ew(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),jt(new Pt("auth-internal",e=>{const t=hi(e.getProvider("auth").getImmediate());return(r=>new TE(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),_t(Eh,bh,AE(n)),_t(Eh,bh,"esm2017")}/**
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
 */const SE=5*60,PE=bp("authIdTokenMaxAge")||SE;let Th=null;const CE=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>PE)return;const i=t?.token;Th!==i&&(Th=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function kE(n=Dl()){const e=ui(n,"auth");if(e.isInitialized())return e.getImmediate();const t=ZI(n,{popupRedirectResolver:bE,persistence:[Vw,nm,im]}),r=bp("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=CE(s.toString());yw(t,o,()=>o(t.currentUser)),_w(t,c=>o(c))}}const i=wp("auth");return i&&tw(t,`http://${i}`),t}function DE(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}GI({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const s=Tt("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",DE().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});RE("Browser");var Ah=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var gn,dm;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(T,E){function g(){}g.prototype=E.prototype,T.D=E.prototype,T.prototype=new g,T.prototype.constructor=T,T.C=function(_,I,b){for(var v=Array(arguments.length-2),U=2;U<arguments.length;U++)v[U-2]=arguments[U];return E.prototype[I].apply(_,v)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(T,E,g){g||(g=0);var _=Array(16);if(typeof E=="string")for(var I=0;16>I;++I)_[I]=E.charCodeAt(g++)|E.charCodeAt(g++)<<8|E.charCodeAt(g++)<<16|E.charCodeAt(g++)<<24;else for(I=0;16>I;++I)_[I]=E[g++]|E[g++]<<8|E[g++]<<16|E[g++]<<24;E=T.g[0],g=T.g[1],I=T.g[2];var b=T.g[3],v=E+(b^g&(I^b))+_[0]+3614090360&4294967295;E=g+(v<<7&4294967295|v>>>25),v=b+(I^E&(g^I))+_[1]+3905402710&4294967295,b=E+(v<<12&4294967295|v>>>20),v=I+(g^b&(E^g))+_[2]+606105819&4294967295,I=b+(v<<17&4294967295|v>>>15),v=g+(E^I&(b^E))+_[3]+3250441966&4294967295,g=I+(v<<22&4294967295|v>>>10),v=E+(b^g&(I^b))+_[4]+4118548399&4294967295,E=g+(v<<7&4294967295|v>>>25),v=b+(I^E&(g^I))+_[5]+1200080426&4294967295,b=E+(v<<12&4294967295|v>>>20),v=I+(g^b&(E^g))+_[6]+2821735955&4294967295,I=b+(v<<17&4294967295|v>>>15),v=g+(E^I&(b^E))+_[7]+4249261313&4294967295,g=I+(v<<22&4294967295|v>>>10),v=E+(b^g&(I^b))+_[8]+1770035416&4294967295,E=g+(v<<7&4294967295|v>>>25),v=b+(I^E&(g^I))+_[9]+2336552879&4294967295,b=E+(v<<12&4294967295|v>>>20),v=I+(g^b&(E^g))+_[10]+4294925233&4294967295,I=b+(v<<17&4294967295|v>>>15),v=g+(E^I&(b^E))+_[11]+2304563134&4294967295,g=I+(v<<22&4294967295|v>>>10),v=E+(b^g&(I^b))+_[12]+1804603682&4294967295,E=g+(v<<7&4294967295|v>>>25),v=b+(I^E&(g^I))+_[13]+4254626195&4294967295,b=E+(v<<12&4294967295|v>>>20),v=I+(g^b&(E^g))+_[14]+2792965006&4294967295,I=b+(v<<17&4294967295|v>>>15),v=g+(E^I&(b^E))+_[15]+1236535329&4294967295,g=I+(v<<22&4294967295|v>>>10),v=E+(I^b&(g^I))+_[1]+4129170786&4294967295,E=g+(v<<5&4294967295|v>>>27),v=b+(g^I&(E^g))+_[6]+3225465664&4294967295,b=E+(v<<9&4294967295|v>>>23),v=I+(E^g&(b^E))+_[11]+643717713&4294967295,I=b+(v<<14&4294967295|v>>>18),v=g+(b^E&(I^b))+_[0]+3921069994&4294967295,g=I+(v<<20&4294967295|v>>>12),v=E+(I^b&(g^I))+_[5]+3593408605&4294967295,E=g+(v<<5&4294967295|v>>>27),v=b+(g^I&(E^g))+_[10]+38016083&4294967295,b=E+(v<<9&4294967295|v>>>23),v=I+(E^g&(b^E))+_[15]+3634488961&4294967295,I=b+(v<<14&4294967295|v>>>18),v=g+(b^E&(I^b))+_[4]+3889429448&4294967295,g=I+(v<<20&4294967295|v>>>12),v=E+(I^b&(g^I))+_[9]+568446438&4294967295,E=g+(v<<5&4294967295|v>>>27),v=b+(g^I&(E^g))+_[14]+3275163606&4294967295,b=E+(v<<9&4294967295|v>>>23),v=I+(E^g&(b^E))+_[3]+4107603335&4294967295,I=b+(v<<14&4294967295|v>>>18),v=g+(b^E&(I^b))+_[8]+1163531501&4294967295,g=I+(v<<20&4294967295|v>>>12),v=E+(I^b&(g^I))+_[13]+2850285829&4294967295,E=g+(v<<5&4294967295|v>>>27),v=b+(g^I&(E^g))+_[2]+4243563512&4294967295,b=E+(v<<9&4294967295|v>>>23),v=I+(E^g&(b^E))+_[7]+1735328473&4294967295,I=b+(v<<14&4294967295|v>>>18),v=g+(b^E&(I^b))+_[12]+2368359562&4294967295,g=I+(v<<20&4294967295|v>>>12),v=E+(g^I^b)+_[5]+4294588738&4294967295,E=g+(v<<4&4294967295|v>>>28),v=b+(E^g^I)+_[8]+2272392833&4294967295,b=E+(v<<11&4294967295|v>>>21),v=I+(b^E^g)+_[11]+1839030562&4294967295,I=b+(v<<16&4294967295|v>>>16),v=g+(I^b^E)+_[14]+4259657740&4294967295,g=I+(v<<23&4294967295|v>>>9),v=E+(g^I^b)+_[1]+2763975236&4294967295,E=g+(v<<4&4294967295|v>>>28),v=b+(E^g^I)+_[4]+1272893353&4294967295,b=E+(v<<11&4294967295|v>>>21),v=I+(b^E^g)+_[7]+4139469664&4294967295,I=b+(v<<16&4294967295|v>>>16),v=g+(I^b^E)+_[10]+3200236656&4294967295,g=I+(v<<23&4294967295|v>>>9),v=E+(g^I^b)+_[13]+681279174&4294967295,E=g+(v<<4&4294967295|v>>>28),v=b+(E^g^I)+_[0]+3936430074&4294967295,b=E+(v<<11&4294967295|v>>>21),v=I+(b^E^g)+_[3]+3572445317&4294967295,I=b+(v<<16&4294967295|v>>>16),v=g+(I^b^E)+_[6]+76029189&4294967295,g=I+(v<<23&4294967295|v>>>9),v=E+(g^I^b)+_[9]+3654602809&4294967295,E=g+(v<<4&4294967295|v>>>28),v=b+(E^g^I)+_[12]+3873151461&4294967295,b=E+(v<<11&4294967295|v>>>21),v=I+(b^E^g)+_[15]+530742520&4294967295,I=b+(v<<16&4294967295|v>>>16),v=g+(I^b^E)+_[2]+3299628645&4294967295,g=I+(v<<23&4294967295|v>>>9),v=E+(I^(g|~b))+_[0]+4096336452&4294967295,E=g+(v<<6&4294967295|v>>>26),v=b+(g^(E|~I))+_[7]+1126891415&4294967295,b=E+(v<<10&4294967295|v>>>22),v=I+(E^(b|~g))+_[14]+2878612391&4294967295,I=b+(v<<15&4294967295|v>>>17),v=g+(b^(I|~E))+_[5]+4237533241&4294967295,g=I+(v<<21&4294967295|v>>>11),v=E+(I^(g|~b))+_[12]+1700485571&4294967295,E=g+(v<<6&4294967295|v>>>26),v=b+(g^(E|~I))+_[3]+2399980690&4294967295,b=E+(v<<10&4294967295|v>>>22),v=I+(E^(b|~g))+_[10]+4293915773&4294967295,I=b+(v<<15&4294967295|v>>>17),v=g+(b^(I|~E))+_[1]+2240044497&4294967295,g=I+(v<<21&4294967295|v>>>11),v=E+(I^(g|~b))+_[8]+1873313359&4294967295,E=g+(v<<6&4294967295|v>>>26),v=b+(g^(E|~I))+_[15]+4264355552&4294967295,b=E+(v<<10&4294967295|v>>>22),v=I+(E^(b|~g))+_[6]+2734768916&4294967295,I=b+(v<<15&4294967295|v>>>17),v=g+(b^(I|~E))+_[13]+1309151649&4294967295,g=I+(v<<21&4294967295|v>>>11),v=E+(I^(g|~b))+_[4]+4149444226&4294967295,E=g+(v<<6&4294967295|v>>>26),v=b+(g^(E|~I))+_[11]+3174756917&4294967295,b=E+(v<<10&4294967295|v>>>22),v=I+(E^(b|~g))+_[2]+718787259&4294967295,I=b+(v<<15&4294967295|v>>>17),v=g+(b^(I|~E))+_[9]+3951481745&4294967295,T.g[0]=T.g[0]+E&4294967295,T.g[1]=T.g[1]+(I+(v<<21&4294967295|v>>>11))&4294967295,T.g[2]=T.g[2]+I&4294967295,T.g[3]=T.g[3]+b&4294967295}r.prototype.u=function(T,E){E===void 0&&(E=T.length);for(var g=E-this.blockSize,_=this.B,I=this.h,b=0;b<E;){if(I==0)for(;b<=g;)i(this,T,b),b+=this.blockSize;if(typeof T=="string"){for(;b<E;)if(_[I++]=T.charCodeAt(b++),I==this.blockSize){i(this,_),I=0;break}}else for(;b<E;)if(_[I++]=T[b++],I==this.blockSize){i(this,_),I=0;break}}this.h=I,this.o+=E},r.prototype.v=function(){var T=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);T[0]=128;for(var E=1;E<T.length-8;++E)T[E]=0;var g=8*this.o;for(E=T.length-8;E<T.length;++E)T[E]=g&255,g/=256;for(this.u(T),T=Array(16),E=g=0;4>E;++E)for(var _=0;32>_;_+=8)T[g++]=this.g[E]>>>_&255;return T};function s(T,E){var g=c;return Object.prototype.hasOwnProperty.call(g,T)?g[T]:g[T]=E(T)}function o(T,E){this.h=E;for(var g=[],_=!0,I=T.length-1;0<=I;I--){var b=T[I]|0;_&&b==E||(g[I]=b,_=!1)}this.g=g}var c={};function l(T){return-128<=T&&128>T?s(T,function(E){return new o([E|0],0>E?-1:0)}):new o([T|0],0>T?-1:0)}function d(T){if(isNaN(T)||!isFinite(T))return m;if(0>T)return P(d(-T));for(var E=[],g=1,_=0;T>=g;_++)E[_]=T/g|0,g*=4294967296;return new o(E,0)}function p(T,E){if(T.length==0)throw Error("number format error: empty string");if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(T.charAt(0)=="-")return P(p(T.substring(1),E));if(0<=T.indexOf("-"))throw Error('number format error: interior "-" character');for(var g=d(Math.pow(E,8)),_=m,I=0;I<T.length;I+=8){var b=Math.min(8,T.length-I),v=parseInt(T.substring(I,I+b),E);8>b?(b=d(Math.pow(E,b)),_=_.j(b).add(d(v))):(_=_.j(g),_=_.add(d(v)))}return _}var m=l(0),w=l(1),A=l(16777216);n=o.prototype,n.m=function(){if(k(this))return-P(this).m();for(var T=0,E=1,g=0;g<this.g.length;g++){var _=this.i(g);T+=(0<=_?_:4294967296+_)*E,E*=4294967296}return T},n.toString=function(T){if(T=T||10,2>T||36<T)throw Error("radix out of range: "+T);if(C(this))return"0";if(k(this))return"-"+P(this).toString(T);for(var E=d(Math.pow(T,6)),g=this,_="";;){var I=q(g,E).g;g=B(g,I.j(E));var b=((0<g.g.length?g.g[0]:g.h)>>>0).toString(T);if(g=I,C(g))return b+_;for(;6>b.length;)b="0"+b;_=b+_}},n.i=function(T){return 0>T?0:T<this.g.length?this.g[T]:this.h};function C(T){if(T.h!=0)return!1;for(var E=0;E<T.g.length;E++)if(T.g[E]!=0)return!1;return!0}function k(T){return T.h==-1}n.l=function(T){return T=B(this,T),k(T)?-1:C(T)?0:1};function P(T){for(var E=T.g.length,g=[],_=0;_<E;_++)g[_]=~T.g[_];return new o(g,~T.h).add(w)}n.abs=function(){return k(this)?P(this):this},n.add=function(T){for(var E=Math.max(this.g.length,T.g.length),g=[],_=0,I=0;I<=E;I++){var b=_+(this.i(I)&65535)+(T.i(I)&65535),v=(b>>>16)+(this.i(I)>>>16)+(T.i(I)>>>16);_=v>>>16,b&=65535,v&=65535,g[I]=v<<16|b}return new o(g,g[g.length-1]&-2147483648?-1:0)};function B(T,E){return T.add(P(E))}n.j=function(T){if(C(this)||C(T))return m;if(k(this))return k(T)?P(this).j(P(T)):P(P(this).j(T));if(k(T))return P(this.j(P(T)));if(0>this.l(A)&&0>T.l(A))return d(this.m()*T.m());for(var E=this.g.length+T.g.length,g=[],_=0;_<2*E;_++)g[_]=0;for(_=0;_<this.g.length;_++)for(var I=0;I<T.g.length;I++){var b=this.i(_)>>>16,v=this.i(_)&65535,U=T.i(I)>>>16,re=T.i(I)&65535;g[2*_+2*I]+=v*re,D(g,2*_+2*I),g[2*_+2*I+1]+=b*re,D(g,2*_+2*I+1),g[2*_+2*I+1]+=v*U,D(g,2*_+2*I+1),g[2*_+2*I+2]+=b*U,D(g,2*_+2*I+2)}for(_=0;_<E;_++)g[_]=g[2*_+1]<<16|g[2*_];for(_=E;_<2*E;_++)g[_]=0;return new o(g,0)};function D(T,E){for(;(T[E]&65535)!=T[E];)T[E+1]+=T[E]>>>16,T[E]&=65535,E++}function L(T,E){this.g=T,this.h=E}function q(T,E){if(C(E))throw Error("division by zero");if(C(T))return new L(m,m);if(k(T))return E=q(P(T),E),new L(P(E.g),P(E.h));if(k(E))return E=q(T,P(E)),new L(P(E.g),E.h);if(30<T.g.length){if(k(T)||k(E))throw Error("slowDivide_ only works with positive integers.");for(var g=w,_=E;0>=_.l(T);)g=V(g),_=V(_);var I=F(g,1),b=F(_,1);for(_=F(_,2),g=F(g,2);!C(_);){var v=b.add(_);0>=v.l(T)&&(I=I.add(g),b=v),_=F(_,1),g=F(g,1)}return E=B(T,I.j(E)),new L(I,E)}for(I=m;0<=T.l(E);){for(g=Math.max(1,Math.floor(T.m()/E.m())),_=Math.ceil(Math.log(g)/Math.LN2),_=48>=_?1:Math.pow(2,_-48),b=d(g),v=b.j(E);k(v)||0<v.l(T);)g-=_,b=d(g),v=b.j(E);C(b)&&(b=w),I=I.add(b),T=B(T,v)}return new L(I,T)}n.A=function(T){return q(this,T).h},n.and=function(T){for(var E=Math.max(this.g.length,T.g.length),g=[],_=0;_<E;_++)g[_]=this.i(_)&T.i(_);return new o(g,this.h&T.h)},n.or=function(T){for(var E=Math.max(this.g.length,T.g.length),g=[],_=0;_<E;_++)g[_]=this.i(_)|T.i(_);return new o(g,this.h|T.h)},n.xor=function(T){for(var E=Math.max(this.g.length,T.g.length),g=[],_=0;_<E;_++)g[_]=this.i(_)^T.i(_);return new o(g,this.h^T.h)};function V(T){for(var E=T.g.length+1,g=[],_=0;_<E;_++)g[_]=T.i(_)<<1|T.i(_-1)>>>31;return new o(g,T.h)}function F(T,E){var g=E>>5;E%=32;for(var _=T.g.length-g,I=[],b=0;b<_;b++)I[b]=0<E?T.i(b+g)>>>E|T.i(b+g+1)<<32-E:T.i(b+g);return new o(I,T.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,dm=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=d,o.fromString=p,gn=o}).apply(typeof Ah<"u"?Ah:typeof self<"u"?self:typeof window<"u"?window:{});var io=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var hm,$i,fm,bo,Wc,pm,mm,gm;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,u,f){return a==Array.prototype||a==Object.prototype||(a[u]=f.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof io=="object"&&io];for(var u=0;u<a.length;++u){var f=a[u];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=t(this);function i(a,u){if(u)e:{var f=r;a=a.split(".");for(var y=0;y<a.length-1;y++){var S=a[y];if(!(S in f))break e;f=f[S]}a=a[a.length-1],y=f[a],u=u(y),u!=y&&u!=null&&e(f,a,{configurable:!0,writable:!0,value:u})}}function s(a,u){a instanceof String&&(a+="");var f=0,y=!1,S={next:function(){if(!y&&f<a.length){var N=f++;return{value:u(N,a[N]),done:!1}}return y=!0,{done:!0,value:void 0}}};return S[Symbol.iterator]=function(){return S},S}i("Array.prototype.values",function(a){return a||function(){return s(this,function(u,f){return f})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},c=this||self;function l(a){var u=typeof a;return u=u!="object"?u:a?Array.isArray(a)?"array":u:"null",u=="array"||u=="object"&&typeof a.length=="number"}function d(a){var u=typeof a;return u=="object"&&a!=null||u=="function"}function p(a,u,f){return a.call.apply(a.bind,arguments)}function m(a,u,f){if(!a)throw Error();if(2<arguments.length){var y=Array.prototype.slice.call(arguments,2);return function(){var S=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(S,y),a.apply(u,S)}}return function(){return a.apply(u,arguments)}}function w(a,u,f){return w=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:m,w.apply(null,arguments)}function A(a,u){var f=Array.prototype.slice.call(arguments,1);return function(){var y=f.slice();return y.push.apply(y,arguments),a.apply(this,y)}}function C(a,u){function f(){}f.prototype=u.prototype,a.aa=u.prototype,a.prototype=new f,a.prototype.constructor=a,a.Qb=function(y,S,N){for(var z=Array(arguments.length-2),ve=2;ve<arguments.length;ve++)z[ve-2]=arguments[ve];return u.prototype[S].apply(y,z)}}function k(a){const u=a.length;if(0<u){const f=Array(u);for(let y=0;y<u;y++)f[y]=a[y];return f}return[]}function P(a,u){for(let f=1;f<arguments.length;f++){const y=arguments[f];if(l(y)){const S=a.length||0,N=y.length||0;a.length=S+N;for(let z=0;z<N;z++)a[S+z]=y[z]}else a.push(y)}}class B{constructor(u,f){this.i=u,this.j=f,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function D(a){return/^[\s\xa0]*$/.test(a)}function L(){var a=c.navigator;return a&&(a=a.userAgent)?a:""}function q(a){return q[" "](a),a}q[" "]=function(){};var V=L().indexOf("Gecko")!=-1&&!(L().toLowerCase().indexOf("webkit")!=-1&&L().indexOf("Edge")==-1)&&!(L().indexOf("Trident")!=-1||L().indexOf("MSIE")!=-1)&&L().indexOf("Edge")==-1;function F(a,u,f){for(const y in a)u.call(f,a[y],y,a)}function T(a,u){for(const f in a)u.call(void 0,a[f],f,a)}function E(a){const u={};for(const f in a)u[f]=a[f];return u}const g="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function _(a,u){let f,y;for(let S=1;S<arguments.length;S++){y=arguments[S];for(f in y)a[f]=y[f];for(let N=0;N<g.length;N++)f=g[N],Object.prototype.hasOwnProperty.call(y,f)&&(a[f]=y[f])}}function I(a){var u=1;a=a.split(":");const f=[];for(;0<u&&a.length;)f.push(a.shift()),u--;return a.length&&f.push(a.join(":")),f}function b(a){c.setTimeout(()=>{throw a},0)}function v(){var a=pt;let u=null;return a.g&&(u=a.g,a.g=a.g.next,a.g||(a.h=null),u.next=null),u}class U{constructor(){this.h=this.g=null}add(u,f){const y=re.get();y.set(u,f),this.h?this.h.next=y:this.g=y,this.h=y}}var re=new B(()=>new oe,a=>a.reset());class oe{constructor(){this.next=this.g=this.h=null}set(u,f){this.h=u,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let ye,Ke=!1,pt=new U,Vt=()=>{const a=c.Promise.resolve(void 0);ye=()=>{a.then(Yt)}};var Yt=()=>{for(var a;a=v();){try{a.h.call(a.g)}catch(f){b(f)}var u=re;u.j(a),100>u.h&&(u.h++,a.next=u.g,u.g=a)}Ke=!1};function Ze(){this.s=this.s,this.C=this.C}Ze.prototype.s=!1,Ze.prototype.ma=function(){this.s||(this.s=!0,this.N())},Ze.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function me(a,u){this.type=a,this.g=this.target=u,this.defaultPrevented=!1}me.prototype.h=function(){this.defaultPrevented=!0};var et=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var a=!1,u=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const f=()=>{};c.addEventListener("test",f,u),c.removeEventListener("test",f,u)}catch{}return a}();function O(a,u){if(me.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var f=this.type=a.type,y=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=u,u=a.relatedTarget){if(V){e:{try{q(u.nodeName);var S=!0;break e}catch{}S=!1}S||(u=null)}}else f=="mouseover"?u=a.fromElement:f=="mouseout"&&(u=a.toElement);this.relatedTarget=u,y?(this.clientX=y.clientX!==void 0?y.clientX:y.pageX,this.clientY=y.clientY!==void 0?y.clientY:y.pageY,this.screenX=y.screenX||0,this.screenY=y.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:j[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&O.aa.h.call(this)}}C(O,me);var j={2:"touch",3:"pen",4:"mouse"};O.prototype.h=function(){O.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var H="closure_listenable_"+(1e6*Math.random()|0),le=0;function ee(a,u,f,y,S){this.listener=a,this.proxy=null,this.src=u,this.type=f,this.capture=!!y,this.ha=S,this.key=++le,this.da=this.fa=!1}function Z(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Ne(a){this.src=a,this.g={},this.h=0}Ne.prototype.add=function(a,u,f,y,S){var N=a.toString();a=this.g[N],a||(a=this.g[N]=[],this.h++);var z=gr(a,u,y,S);return-1<z?(u=a[z],f||(u.fa=!1)):(u=new ee(u,this.src,N,!!y,S),u.fa=f,a.push(u)),u};function mr(a,u){var f=u.type;if(f in a.g){var y=a.g[f],S=Array.prototype.indexOf.call(y,u,void 0),N;(N=0<=S)&&Array.prototype.splice.call(y,S,1),N&&(Z(u),a.g[f].length==0&&(delete a.g[f],a.h--))}}function gr(a,u,f,y){for(var S=0;S<a.length;++S){var N=a[S];if(!N.da&&N.listener==u&&N.capture==!!f&&N.ha==y)return S}return-1}var yi="closure_lm_"+(1e6*Math.random()|0),Cn={};function kn(a,u,f,y,S){if(Array.isArray(u)){for(var N=0;N<u.length;N++)kn(a,u[N],f,y,S);return null}return f=Zu(f),a&&a[H]?a.K(u,f,d(y)?!!y.capture:!1,S):vi(a,u,f,!1,y,S)}function vi(a,u,f,y,S,N){if(!u)throw Error("Invalid event type");var z=d(S)?!!S.capture:!!S,ve=nc(a);if(ve||(a[yi]=ve=new Ne(a)),f=ve.add(u,f,y,z,N),f.proxy)return f;if(y=cy(),f.proxy=y,y.src=a,y.listener=f,a.addEventListener)et||(S=z),S===void 0&&(S=!1),a.addEventListener(u.toString(),y,S);else if(a.attachEvent)a.attachEvent(Xu(u.toString()),y);else if(a.addListener&&a.removeListener)a.addListener(y);else throw Error("addEventListener and attachEvent are unavailable.");return f}function cy(){function a(f){return u.call(a.src,a.listener,f)}const u=ly;return a}function Ju(a,u,f,y,S){if(Array.isArray(u))for(var N=0;N<u.length;N++)Ju(a,u[N],f,y,S);else y=d(y)?!!y.capture:!!y,f=Zu(f),a&&a[H]?(a=a.i,u=String(u).toString(),u in a.g&&(N=a.g[u],f=gr(N,f,y,S),-1<f&&(Z(N[f]),Array.prototype.splice.call(N,f,1),N.length==0&&(delete a.g[u],a.h--)))):a&&(a=nc(a))&&(u=a.g[u.toString()],a=-1,u&&(a=gr(u,f,y,S)),(f=-1<a?u[a]:null)&&tc(f))}function tc(a){if(typeof a!="number"&&a&&!a.da){var u=a.src;if(u&&u[H])mr(u.i,a);else{var f=a.type,y=a.proxy;u.removeEventListener?u.removeEventListener(f,y,a.capture):u.detachEvent?u.detachEvent(Xu(f),y):u.addListener&&u.removeListener&&u.removeListener(y),(f=nc(u))?(mr(f,a),f.h==0&&(f.src=null,u[yi]=null)):Z(a)}}}function Xu(a){return a in Cn?Cn[a]:Cn[a]="on"+a}function ly(a,u){if(a.da)a=!0;else{u=new O(u,this);var f=a.listener,y=a.ha||a.src;a.fa&&tc(a),a=f.call(y,u)}return a}function nc(a){return a=a[yi],a instanceof Ne?a:null}var rc="__closure_events_fn_"+(1e9*Math.random()>>>0);function Zu(a){return typeof a=="function"?a:(a[rc]||(a[rc]=function(u){return a.handleEvent(u)}),a[rc])}function Ue(){Ze.call(this),this.i=new Ne(this),this.M=this,this.F=null}C(Ue,Ze),Ue.prototype[H]=!0,Ue.prototype.removeEventListener=function(a,u,f,y){Ju(this,a,u,f,y)};function He(a,u){var f,y=a.F;if(y)for(f=[];y;y=y.F)f.push(y);if(a=a.M,y=u.type||u,typeof u=="string")u=new me(u,a);else if(u instanceof me)u.target=u.target||a;else{var S=u;u=new me(y,a),_(u,S)}if(S=!0,f)for(var N=f.length-1;0<=N;N--){var z=u.g=f[N];S=$s(z,y,!0,u)&&S}if(z=u.g=a,S=$s(z,y,!0,u)&&S,S=$s(z,y,!1,u)&&S,f)for(N=0;N<f.length;N++)z=u.g=f[N],S=$s(z,y,!1,u)&&S}Ue.prototype.N=function(){if(Ue.aa.N.call(this),this.i){var a=this.i,u;for(u in a.g){for(var f=a.g[u],y=0;y<f.length;y++)Z(f[y]);delete a.g[u],a.h--}}this.F=null},Ue.prototype.K=function(a,u,f,y){return this.i.add(String(a),u,!1,f,y)},Ue.prototype.L=function(a,u,f,y){return this.i.add(String(a),u,!0,f,y)};function $s(a,u,f,y){if(u=a.i.g[String(u)],!u)return!0;u=u.concat();for(var S=!0,N=0;N<u.length;++N){var z=u[N];if(z&&!z.da&&z.capture==f){var ve=z.listener,Me=z.ha||z.src;z.fa&&mr(a.i,z),S=ve.call(Me,y)!==!1&&S}}return S&&!y.defaultPrevented}function ed(a,u,f){if(typeof a=="function")f&&(a=w(a,f));else if(a&&typeof a.handleEvent=="function")a=w(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:c.setTimeout(a,u||0)}function td(a){a.g=ed(()=>{a.g=null,a.i&&(a.i=!1,td(a))},a.l);const u=a.h;a.h=null,a.m.apply(null,u)}class uy extends Ze{constructor(u,f){super(),this.m=u,this.l=f,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:td(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ii(a){Ze.call(this),this.h=a,this.g={}}C(Ii,Ze);var nd=[];function rd(a){F(a.g,function(u,f){this.g.hasOwnProperty(f)&&tc(u)},a),a.g={}}Ii.prototype.N=function(){Ii.aa.N.call(this),rd(this)},Ii.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ic=c.JSON.stringify,dy=c.JSON.parse,hy=class{stringify(a){return c.JSON.stringify(a,void 0)}parse(a){return c.JSON.parse(a,void 0)}};function sc(){}sc.prototype.h=null;function id(a){return a.h||(a.h=a.i())}function sd(){}var wi={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function oc(){me.call(this,"d")}C(oc,me);function ac(){me.call(this,"c")}C(ac,me);var Dn={},od=null;function js(){return od=od||new Ue}Dn.La="serverreachability";function ad(a){me.call(this,Dn.La,a)}C(ad,me);function Ei(a){const u=js();He(u,new ad(u))}Dn.STAT_EVENT="statevent";function cd(a,u){me.call(this,Dn.STAT_EVENT,a),this.stat=u}C(cd,me);function We(a){const u=js();He(u,new cd(u,a))}Dn.Ma="timingevent";function ld(a,u){me.call(this,Dn.Ma,a),this.size=u}C(ld,me);function bi(a,u){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){a()},u)}function Ti(){this.g=!0}Ti.prototype.xa=function(){this.g=!1};function fy(a,u,f,y,S,N){a.info(function(){if(a.g)if(N)for(var z="",ve=N.split("&"),Me=0;Me<ve.length;Me++){var de=ve[Me].split("=");if(1<de.length){var Be=de[0];de=de[1];var $e=Be.split("_");z=2<=$e.length&&$e[1]=="type"?z+(Be+"="+de+"&"):z+(Be+"=redacted&")}}else z=null;else z=N;return"XMLHTTP REQ ("+y+") [attempt "+S+"]: "+u+`
`+f+`
`+z})}function py(a,u,f,y,S,N,z){a.info(function(){return"XMLHTTP RESP ("+y+") [ attempt "+S+"]: "+u+`
`+f+`
`+N+" "+z})}function _r(a,u,f,y){a.info(function(){return"XMLHTTP TEXT ("+u+"): "+gy(a,f)+(y?" "+y:"")})}function my(a,u){a.info(function(){return"TIMEOUT: "+u})}Ti.prototype.info=function(){};function gy(a,u){if(!a.g)return u;if(!u)return null;try{var f=JSON.parse(u);if(f){for(a=0;a<f.length;a++)if(Array.isArray(f[a])){var y=f[a];if(!(2>y.length)){var S=y[1];if(Array.isArray(S)&&!(1>S.length)){var N=S[0];if(N!="noop"&&N!="stop"&&N!="close")for(var z=1;z<S.length;z++)S[z]=""}}}}return ic(f)}catch{return u}}var qs={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},ud={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},cc;function zs(){}C(zs,sc),zs.prototype.g=function(){return new XMLHttpRequest},zs.prototype.i=function(){return{}},cc=new zs;function Jt(a,u,f,y){this.j=a,this.i=u,this.l=f,this.R=y||1,this.U=new Ii(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new dd}function dd(){this.i=null,this.g="",this.h=!1}var hd={},lc={};function uc(a,u,f){a.L=1,a.v=Ws(Ot(u)),a.m=f,a.P=!0,fd(a,null)}function fd(a,u){a.F=Date.now(),Gs(a),a.A=Ot(a.v);var f=a.A,y=a.R;Array.isArray(y)||(y=[String(y)]),Sd(f.i,"t",y),a.C=0,f=a.j.J,a.h=new dd,a.g=Gd(a.j,f?u:null,!a.m),0<a.O&&(a.M=new uy(w(a.Y,a,a.g),a.O)),u=a.U,f=a.g,y=a.ca;var S="readystatechange";Array.isArray(S)||(S&&(nd[0]=S.toString()),S=nd);for(var N=0;N<S.length;N++){var z=kn(f,S[N],y||u.handleEvent,!1,u.h||u);if(!z)break;u.g[z.key]=z}u=a.H?E(a.H):{},a.m?(a.u||(a.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,u)):(a.u="GET",a.g.ea(a.A,a.u,null,u)),Ei(),fy(a.i,a.u,a.A,a.l,a.R,a.m)}Jt.prototype.ca=function(a){a=a.target;const u=this.M;u&&Lt(a)==3?u.j():this.Y(a)},Jt.prototype.Y=function(a){try{if(a==this.g)e:{const $e=Lt(this.g);var u=this.g.Ba();const Ir=this.g.Z();if(!(3>$e)&&($e!=3||this.g&&(this.h.h||this.g.oa()||Vd(this.g)))){this.J||$e!=4||u==7||(u==8||0>=Ir?Ei(3):Ei(2)),dc(this);var f=this.g.Z();this.X=f;t:if(pd(this)){var y=Vd(this.g);a="";var S=y.length,N=Lt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Nn(this),Ai(this);var z="";break t}this.h.i=new c.TextDecoder}for(u=0;u<S;u++)this.h.h=!0,a+=this.h.i.decode(y[u],{stream:!(N&&u==S-1)});y.length=0,this.h.g+=a,this.C=0,z=this.h.g}else z=this.g.oa();if(this.o=f==200,py(this.i,this.u,this.A,this.l,this.R,$e,f),this.o){if(this.T&&!this.K){t:{if(this.g){var ve,Me=this.g;if((ve=Me.g?Me.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!D(ve)){var de=ve;break t}}de=null}if(f=de)_r(this.i,this.l,f,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,hc(this,f);else{this.o=!1,this.s=3,We(12),Nn(this),Ai(this);break e}}if(this.P){f=!0;let mt;for(;!this.J&&this.C<z.length;)if(mt=_y(this,z),mt==lc){$e==4&&(this.s=4,We(14),f=!1),_r(this.i,this.l,null,"[Incomplete Response]");break}else if(mt==hd){this.s=4,We(15),_r(this.i,this.l,z,"[Invalid Chunk]"),f=!1;break}else _r(this.i,this.l,mt,null),hc(this,mt);if(pd(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),$e!=4||z.length!=0||this.h.h||(this.s=1,We(16),f=!1),this.o=this.o&&f,!f)_r(this.i,this.l,z,"[Invalid Chunked Response]"),Nn(this),Ai(this);else if(0<z.length&&!this.W){this.W=!0;var Be=this.j;Be.g==this&&Be.ba&&!Be.M&&(Be.j.info("Great, no buffering proxy detected. Bytes received: "+z.length),yc(Be),Be.M=!0,We(11))}}else _r(this.i,this.l,z,null),hc(this,z);$e==4&&Nn(this),this.o&&!this.J&&($e==4?$d(this.j,this):(this.o=!1,Gs(this)))}else Vy(this.g),f==400&&0<z.indexOf("Unknown SID")?(this.s=3,We(12)):(this.s=0,We(13)),Nn(this),Ai(this)}}}catch{}finally{}};function pd(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function _y(a,u){var f=a.C,y=u.indexOf(`
`,f);return y==-1?lc:(f=Number(u.substring(f,y)),isNaN(f)?hd:(y+=1,y+f>u.length?lc:(u=u.slice(y,y+f),a.C=y+f,u)))}Jt.prototype.cancel=function(){this.J=!0,Nn(this)};function Gs(a){a.S=Date.now()+a.I,md(a,a.I)}function md(a,u){if(a.B!=null)throw Error("WatchDog timer not null");a.B=bi(w(a.ba,a),u)}function dc(a){a.B&&(c.clearTimeout(a.B),a.B=null)}Jt.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(my(this.i,this.A),this.L!=2&&(Ei(),We(17)),Nn(this),this.s=2,Ai(this)):md(this,this.S-a)};function Ai(a){a.j.G==0||a.J||$d(a.j,a)}function Nn(a){dc(a);var u=a.M;u&&typeof u.ma=="function"&&u.ma(),a.M=null,rd(a.U),a.g&&(u=a.g,a.g=null,u.abort(),u.ma())}function hc(a,u){try{var f=a.j;if(f.G!=0&&(f.g==a||fc(f.h,a))){if(!a.K&&fc(f.h,a)&&f.G==3){try{var y=f.Da.g.parse(u)}catch{y=null}if(Array.isArray(y)&&y.length==3){var S=y;if(S[0]==0){e:if(!f.u){if(f.g)if(f.g.F+3e3<a.F)eo(f),Xs(f);else break e;_c(f),We(18)}}else f.za=S[1],0<f.za-f.T&&37500>S[2]&&f.F&&f.v==0&&!f.C&&(f.C=bi(w(f.Za,f),6e3));if(1>=yd(f.h)&&f.ca){try{f.ca()}catch{}f.ca=void 0}}else Vn(f,11)}else if((a.K||f.g==a)&&eo(f),!D(u))for(S=f.Da.g.parse(u),u=0;u<S.length;u++){let de=S[u];if(f.T=de[0],de=de[1],f.G==2)if(de[0]=="c"){f.K=de[1],f.ia=de[2];const Be=de[3];Be!=null&&(f.la=Be,f.j.info("VER="+f.la));const $e=de[4];$e!=null&&(f.Aa=$e,f.j.info("SVER="+f.Aa));const Ir=de[5];Ir!=null&&typeof Ir=="number"&&0<Ir&&(y=1.5*Ir,f.L=y,f.j.info("backChannelRequestTimeoutMs_="+y)),y=f;const mt=a.g;if(mt){const no=mt.g?mt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(no){var N=y.h;N.g||no.indexOf("spdy")==-1&&no.indexOf("quic")==-1&&no.indexOf("h2")==-1||(N.j=N.l,N.g=new Set,N.h&&(pc(N,N.h),N.h=null))}if(y.D){const vc=mt.g?mt.g.getResponseHeader("X-HTTP-Session-Id"):null;vc&&(y.ya=vc,Ie(y.I,y.D,vc))}}f.G=3,f.l&&f.l.ua(),f.ba&&(f.R=Date.now()-a.F,f.j.info("Handshake RTT: "+f.R+"ms")),y=f;var z=a;if(y.qa=zd(y,y.J?y.ia:null,y.W),z.K){vd(y.h,z);var ve=z,Me=y.L;Me&&(ve.I=Me),ve.B&&(dc(ve),Gs(ve)),y.g=z}else Ud(y);0<f.i.length&&Zs(f)}else de[0]!="stop"&&de[0]!="close"||Vn(f,7);else f.G==3&&(de[0]=="stop"||de[0]=="close"?de[0]=="stop"?Vn(f,7):gc(f):de[0]!="noop"&&f.l&&f.l.ta(de),f.v=0)}}Ei(4)}catch{}}var yy=class{constructor(a,u){this.g=a,this.map=u}};function gd(a){this.l=a||10,c.PerformanceNavigationTiming?(a=c.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function _d(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function yd(a){return a.h?1:a.g?a.g.size:0}function fc(a,u){return a.h?a.h==u:a.g?a.g.has(u):!1}function pc(a,u){a.g?a.g.add(u):a.h=u}function vd(a,u){a.h&&a.h==u?a.h=null:a.g&&a.g.has(u)&&a.g.delete(u)}gd.prototype.cancel=function(){if(this.i=Id(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Id(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let u=a.i;for(const f of a.g.values())u=u.concat(f.D);return u}return k(a.i)}function vy(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(l(a)){for(var u=[],f=a.length,y=0;y<f;y++)u.push(a[y]);return u}u=[],f=0;for(y in a)u[f++]=a[y];return u}function Iy(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(l(a)||typeof a=="string"){var u=[];a=a.length;for(var f=0;f<a;f++)u.push(f);return u}u=[],f=0;for(const y in a)u[f++]=y;return u}}}function wd(a,u){if(a.forEach&&typeof a.forEach=="function")a.forEach(u,void 0);else if(l(a)||typeof a=="string")Array.prototype.forEach.call(a,u,void 0);else for(var f=Iy(a),y=vy(a),S=y.length,N=0;N<S;N++)u.call(void 0,y[N],f&&f[N],a)}var Ed=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function wy(a,u){if(a){a=a.split("&");for(var f=0;f<a.length;f++){var y=a[f].indexOf("="),S=null;if(0<=y){var N=a[f].substring(0,y);S=a[f].substring(y+1)}else N=a[f];u(N,S?decodeURIComponent(S.replace(/\+/g," ")):"")}}}function xn(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof xn){this.h=a.h,Ks(this,a.j),this.o=a.o,this.g=a.g,Hs(this,a.s),this.l=a.l;var u=a.i,f=new Pi;f.i=u.i,u.g&&(f.g=new Map(u.g),f.h=u.h),bd(this,f),this.m=a.m}else a&&(u=String(a).match(Ed))?(this.h=!1,Ks(this,u[1]||"",!0),this.o=Ri(u[2]||""),this.g=Ri(u[3]||"",!0),Hs(this,u[4]),this.l=Ri(u[5]||"",!0),bd(this,u[6]||"",!0),this.m=Ri(u[7]||"")):(this.h=!1,this.i=new Pi(null,this.h))}xn.prototype.toString=function(){var a=[],u=this.j;u&&a.push(Si(u,Td,!0),":");var f=this.g;return(f||u=="file")&&(a.push("//"),(u=this.o)&&a.push(Si(u,Td,!0),"@"),a.push(encodeURIComponent(String(f)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.s,f!=null&&a.push(":",String(f))),(f=this.l)&&(this.g&&f.charAt(0)!="/"&&a.push("/"),a.push(Si(f,f.charAt(0)=="/"?Ty:by,!0))),(f=this.i.toString())&&a.push("?",f),(f=this.m)&&a.push("#",Si(f,Ry)),a.join("")};function Ot(a){return new xn(a)}function Ks(a,u,f){a.j=f?Ri(u,!0):u,a.j&&(a.j=a.j.replace(/:$/,""))}function Hs(a,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);a.s=u}else a.s=null}function bd(a,u,f){u instanceof Pi?(a.i=u,Sy(a.i,a.h)):(f||(u=Si(u,Ay)),a.i=new Pi(u,a.h))}function Ie(a,u,f){a.i.set(u,f)}function Ws(a){return Ie(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Ri(a,u){return a?u?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Si(a,u,f){return typeof a=="string"?(a=encodeURI(a).replace(u,Ey),f&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Ey(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Td=/[#\/\?@]/g,by=/[#\?:]/g,Ty=/[#\?]/g,Ay=/[#\?@]/g,Ry=/#/g;function Pi(a,u){this.h=this.g=null,this.i=a||null,this.j=!!u}function Xt(a){a.g||(a.g=new Map,a.h=0,a.i&&wy(a.i,function(u,f){a.add(decodeURIComponent(u.replace(/\+/g," ")),f)}))}n=Pi.prototype,n.add=function(a,u){Xt(this),this.i=null,a=yr(this,a);var f=this.g.get(a);return f||this.g.set(a,f=[]),f.push(u),this.h+=1,this};function Ad(a,u){Xt(a),u=yr(a,u),a.g.has(u)&&(a.i=null,a.h-=a.g.get(u).length,a.g.delete(u))}function Rd(a,u){return Xt(a),u=yr(a,u),a.g.has(u)}n.forEach=function(a,u){Xt(this),this.g.forEach(function(f,y){f.forEach(function(S){a.call(u,S,y,this)},this)},this)},n.na=function(){Xt(this);const a=Array.from(this.g.values()),u=Array.from(this.g.keys()),f=[];for(let y=0;y<u.length;y++){const S=a[y];for(let N=0;N<S.length;N++)f.push(u[y])}return f},n.V=function(a){Xt(this);let u=[];if(typeof a=="string")Rd(this,a)&&(u=u.concat(this.g.get(yr(this,a))));else{a=Array.from(this.g.values());for(let f=0;f<a.length;f++)u=u.concat(a[f])}return u},n.set=function(a,u){return Xt(this),this.i=null,a=yr(this,a),Rd(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[u]),this.h+=1,this},n.get=function(a,u){return a?(a=this.V(a),0<a.length?String(a[0]):u):u};function Sd(a,u,f){Ad(a,u),0<f.length&&(a.i=null,a.g.set(yr(a,u),k(f)),a.h+=f.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],u=Array.from(this.g.keys());for(var f=0;f<u.length;f++){var y=u[f];const N=encodeURIComponent(String(y)),z=this.V(y);for(y=0;y<z.length;y++){var S=N;z[y]!==""&&(S+="="+encodeURIComponent(String(z[y]))),a.push(S)}}return this.i=a.join("&")};function yr(a,u){return u=String(u),a.j&&(u=u.toLowerCase()),u}function Sy(a,u){u&&!a.j&&(Xt(a),a.i=null,a.g.forEach(function(f,y){var S=y.toLowerCase();y!=S&&(Ad(this,y),Sd(this,S,f))},a)),a.j=u}function Py(a,u){const f=new Ti;if(c.Image){const y=new Image;y.onload=A(Zt,f,"TestLoadImage: loaded",!0,u,y),y.onerror=A(Zt,f,"TestLoadImage: error",!1,u,y),y.onabort=A(Zt,f,"TestLoadImage: abort",!1,u,y),y.ontimeout=A(Zt,f,"TestLoadImage: timeout",!1,u,y),c.setTimeout(function(){y.ontimeout&&y.ontimeout()},1e4),y.src=a}else u(!1)}function Cy(a,u){const f=new Ti,y=new AbortController,S=setTimeout(()=>{y.abort(),Zt(f,"TestPingServer: timeout",!1,u)},1e4);fetch(a,{signal:y.signal}).then(N=>{clearTimeout(S),N.ok?Zt(f,"TestPingServer: ok",!0,u):Zt(f,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(S),Zt(f,"TestPingServer: error",!1,u)})}function Zt(a,u,f,y,S){try{S&&(S.onload=null,S.onerror=null,S.onabort=null,S.ontimeout=null),y(f)}catch{}}function ky(){this.g=new hy}function Dy(a,u,f){const y=f||"";try{wd(a,function(S,N){let z=S;d(S)&&(z=ic(S)),u.push(y+N+"="+encodeURIComponent(z))})}catch(S){throw u.push(y+"type="+encodeURIComponent("_badmap")),S}}function Qs(a){this.l=a.Ub||null,this.j=a.eb||!1}C(Qs,sc),Qs.prototype.g=function(){return new Ys(this.l,this.j)},Qs.prototype.i=function(a){return function(){return a}}({});function Ys(a,u){Ue.call(this),this.D=a,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}C(Ys,Ue),n=Ys.prototype,n.open=function(a,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=u,this.readyState=1,ki(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(u.body=a),(this.D||c).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Ci(this)),this.readyState=0},n.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,ki(this)),this.g&&(this.readyState=3,ki(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Pd(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function Pd(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}n.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var u=a.value?a.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!a.done}))&&(this.response=this.responseText+=u)}a.done?Ci(this):ki(this),this.readyState==3&&Pd(this)}},n.Ra=function(a){this.g&&(this.response=this.responseText=a,Ci(this))},n.Qa=function(a){this.g&&(this.response=a,Ci(this))},n.ga=function(){this.g&&Ci(this)};function Ci(a){a.readyState=4,a.l=null,a.j=null,a.v=null,ki(a)}n.setRequestHeader=function(a,u){this.u.append(a,u)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],u=this.h.entries();for(var f=u.next();!f.done;)f=f.value,a.push(f[0]+": "+f[1]),f=u.next();return a.join(`\r
`)};function ki(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Ys.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Cd(a){let u="";return F(a,function(f,y){u+=y,u+=":",u+=f,u+=`\r
`}),u}function mc(a,u,f){e:{for(y in f){var y=!1;break e}y=!0}y||(f=Cd(f),typeof a=="string"?f!=null&&encodeURIComponent(String(f)):Ie(a,u,f))}function Re(a){Ue.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}C(Re,Ue);var Ny=/^https?$/i,xy=["POST","PUT"];n=Re.prototype,n.Ha=function(a){this.J=a},n.ea=function(a,u,f,y){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);u=u?u.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():cc.g(),this.v=this.o?id(this.o):id(cc),this.g.onreadystatechange=w(this.Ea,this);try{this.B=!0,this.g.open(u,String(a),!0),this.B=!1}catch(N){kd(this,N);return}if(a=f||"",f=new Map(this.headers),y)if(Object.getPrototypeOf(y)===Object.prototype)for(var S in y)f.set(S,y[S]);else if(typeof y.keys=="function"&&typeof y.get=="function")for(const N of y.keys())f.set(N,y.get(N));else throw Error("Unknown input type for opt_headers: "+String(y));y=Array.from(f.keys()).find(N=>N.toLowerCase()=="content-type"),S=c.FormData&&a instanceof c.FormData,!(0<=Array.prototype.indexOf.call(xy,u,void 0))||y||S||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[N,z]of f)this.g.setRequestHeader(N,z);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{xd(this),this.u=!0,this.g.send(a),this.u=!1}catch(N){kd(this,N)}};function kd(a,u){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=u,a.m=5,Dd(a),Js(a)}function Dd(a){a.A||(a.A=!0,He(a,"complete"),He(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,He(this,"complete"),He(this,"abort"),Js(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Js(this,!0)),Re.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Nd(this):this.bb())},n.bb=function(){Nd(this)};function Nd(a){if(a.h&&typeof o<"u"&&(!a.v[1]||Lt(a)!=4||a.Z()!=2)){if(a.u&&Lt(a)==4)ed(a.Ea,0,a);else if(He(a,"readystatechange"),Lt(a)==4){a.h=!1;try{const z=a.Z();e:switch(z){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var f;if(!(f=u)){var y;if(y=z===0){var S=String(a.D).match(Ed)[1]||null;!S&&c.self&&c.self.location&&(S=c.self.location.protocol.slice(0,-1)),y=!Ny.test(S?S.toLowerCase():"")}f=y}if(f)He(a,"complete"),He(a,"success");else{a.m=6;try{var N=2<Lt(a)?a.g.statusText:""}catch{N=""}a.l=N+" ["+a.Z()+"]",Dd(a)}}finally{Js(a)}}}}function Js(a,u){if(a.g){xd(a);const f=a.g,y=a.v[0]?()=>{}:null;a.g=null,a.v=null,u||He(a,"ready");try{f.onreadystatechange=y}catch{}}}function xd(a){a.I&&(c.clearTimeout(a.I),a.I=null)}n.isActive=function(){return!!this.g};function Lt(a){return a.g?a.g.readyState:0}n.Z=function(){try{return 2<Lt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(a){if(this.g){var u=this.g.responseText;return a&&u.indexOf(a)==0&&(u=u.substring(a.length)),dy(u)}};function Vd(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function Vy(a){const u={};a=(a.g&&2<=Lt(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let y=0;y<a.length;y++){if(D(a[y]))continue;var f=I(a[y]);const S=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const N=u[S]||[];u[S]=N,N.push(f)}T(u,function(y){return y.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Di(a,u,f){return f&&f.internalChannelParams&&f.internalChannelParams[a]||u}function Od(a){this.Aa=0,this.i=[],this.j=new Ti,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Di("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Di("baseRetryDelayMs",5e3,a),this.cb=Di("retryDelaySeedMs",1e4,a),this.Wa=Di("forwardChannelMaxRetries",2,a),this.wa=Di("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new gd(a&&a.concurrentRequestLimit),this.Da=new ky,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Od.prototype,n.la=8,n.G=1,n.connect=function(a,u,f,y){We(0),this.W=a,this.H=u||{},f&&y!==void 0&&(this.H.OSID=f,this.H.OAID=y),this.F=this.X,this.I=zd(this,null,this.W),Zs(this)};function gc(a){if(Ld(a),a.G==3){var u=a.U++,f=Ot(a.I);if(Ie(f,"SID",a.K),Ie(f,"RID",u),Ie(f,"TYPE","terminate"),Ni(a,f),u=new Jt(a,a.j,u),u.L=2,u.v=Ws(Ot(f)),f=!1,c.navigator&&c.navigator.sendBeacon)try{f=c.navigator.sendBeacon(u.v.toString(),"")}catch{}!f&&c.Image&&(new Image().src=u.v,f=!0),f||(u.g=Gd(u.j,null),u.g.ea(u.v)),u.F=Date.now(),Gs(u)}qd(a)}function Xs(a){a.g&&(yc(a),a.g.cancel(),a.g=null)}function Ld(a){Xs(a),a.u&&(c.clearTimeout(a.u),a.u=null),eo(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&c.clearTimeout(a.s),a.s=null)}function Zs(a){if(!_d(a.h)&&!a.s){a.s=!0;var u=a.Ga;ye||Vt(),Ke||(ye(),Ke=!0),pt.add(u,a),a.B=0}}function Oy(a,u){return yd(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=u.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=bi(w(a.Ga,a,u),jd(a,a.B)),a.B++,!0)}n.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const S=new Jt(this,this.j,a);let N=this.o;if(this.S&&(N?(N=E(N),_(N,this.S)):N=this.S),this.m!==null||this.O||(S.H=N,N=null),this.P)e:{for(var u=0,f=0;f<this.i.length;f++){t:{var y=this.i[f];if("__data__"in y.map&&(y=y.map.__data__,typeof y=="string")){y=y.length;break t}y=void 0}if(y===void 0)break;if(u+=y,4096<u){u=f;break e}if(u===4096||f===this.i.length-1){u=f+1;break e}}u=1e3}else u=1e3;u=Fd(this,S,u),f=Ot(this.I),Ie(f,"RID",a),Ie(f,"CVER",22),this.D&&Ie(f,"X-HTTP-Session-Id",this.D),Ni(this,f),N&&(this.O?u="headers="+encodeURIComponent(String(Cd(N)))+"&"+u:this.m&&mc(f,this.m,N)),pc(this.h,S),this.Ua&&Ie(f,"TYPE","init"),this.P?(Ie(f,"$req",u),Ie(f,"SID","null"),S.T=!0,uc(S,f,null)):uc(S,f,u),this.G=2}}else this.G==3&&(a?Md(this,a):this.i.length==0||_d(this.h)||Md(this))};function Md(a,u){var f;u?f=u.l:f=a.U++;const y=Ot(a.I);Ie(y,"SID",a.K),Ie(y,"RID",f),Ie(y,"AID",a.T),Ni(a,y),a.m&&a.o&&mc(y,a.m,a.o),f=new Jt(a,a.j,f,a.B+1),a.m===null&&(f.H=a.o),u&&(a.i=u.D.concat(a.i)),u=Fd(a,f,1e3),f.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),pc(a.h,f),uc(f,y,u)}function Ni(a,u){a.H&&F(a.H,function(f,y){Ie(u,y,f)}),a.l&&wd({},function(f,y){Ie(u,y,f)})}function Fd(a,u,f){f=Math.min(a.i.length,f);var y=a.l?w(a.l.Na,a.l,a):null;e:{var S=a.i;let N=-1;for(;;){const z=["count="+f];N==-1?0<f?(N=S[0].g,z.push("ofs="+N)):N=0:z.push("ofs="+N);let ve=!0;for(let Me=0;Me<f;Me++){let de=S[Me].g;const Be=S[Me].map;if(de-=N,0>de)N=Math.max(0,S[Me].g-100),ve=!1;else try{Dy(Be,z,"req"+de+"_")}catch{y&&y(Be)}}if(ve){y=z.join("&");break e}}}return a=a.i.splice(0,f),u.D=a,y}function Ud(a){if(!a.g&&!a.u){a.Y=1;var u=a.Fa;ye||Vt(),Ke||(ye(),Ke=!0),pt.add(u,a),a.v=0}}function _c(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=bi(w(a.Fa,a),jd(a,a.v)),a.v++,!0)}n.Fa=function(){if(this.u=null,Bd(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=bi(w(this.ab,this),a)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,We(10),Xs(this),Bd(this))};function yc(a){a.A!=null&&(c.clearTimeout(a.A),a.A=null)}function Bd(a){a.g=new Jt(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var u=Ot(a.qa);Ie(u,"RID","rpc"),Ie(u,"SID",a.K),Ie(u,"AID",a.T),Ie(u,"CI",a.F?"0":"1"),!a.F&&a.ja&&Ie(u,"TO",a.ja),Ie(u,"TYPE","xmlhttp"),Ni(a,u),a.m&&a.o&&mc(u,a.m,a.o),a.L&&(a.g.I=a.L);var f=a.g;a=a.ia,f.L=1,f.v=Ws(Ot(u)),f.m=null,f.P=!0,fd(f,a)}n.Za=function(){this.C!=null&&(this.C=null,Xs(this),_c(this),We(19))};function eo(a){a.C!=null&&(c.clearTimeout(a.C),a.C=null)}function $d(a,u){var f=null;if(a.g==u){eo(a),yc(a),a.g=null;var y=2}else if(fc(a.h,u))f=u.D,vd(a.h,u),y=1;else return;if(a.G!=0){if(u.o)if(y==1){f=u.m?u.m.length:0,u=Date.now()-u.F;var S=a.B;y=js(),He(y,new ld(y,f)),Zs(a)}else Ud(a);else if(S=u.s,S==3||S==0&&0<u.X||!(y==1&&Oy(a,u)||y==2&&_c(a)))switch(f&&0<f.length&&(u=a.h,u.i=u.i.concat(f)),S){case 1:Vn(a,5);break;case 4:Vn(a,10);break;case 3:Vn(a,6);break;default:Vn(a,2)}}}function jd(a,u){let f=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(f*=2),f*u}function Vn(a,u){if(a.j.info("Error code "+u),u==2){var f=w(a.fb,a),y=a.Xa;const S=!y;y=new xn(y||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Ks(y,"https"),Ws(y),S?Py(y.toString(),f):Cy(y.toString(),f)}else We(2);a.G=0,a.l&&a.l.sa(u),qd(a),Ld(a)}n.fb=function(a){a?(this.j.info("Successfully pinged google.com"),We(2)):(this.j.info("Failed to ping google.com"),We(1))};function qd(a){if(a.G=0,a.ka=[],a.l){const u=Id(a.h);(u.length!=0||a.i.length!=0)&&(P(a.ka,u),P(a.ka,a.i),a.h.i.length=0,k(a.i),a.i.length=0),a.l.ra()}}function zd(a,u,f){var y=f instanceof xn?Ot(f):new xn(f);if(y.g!="")u&&(y.g=u+"."+y.g),Hs(y,y.s);else{var S=c.location;y=S.protocol,u=u?u+"."+S.hostname:S.hostname,S=+S.port;var N=new xn(null);y&&Ks(N,y),u&&(N.g=u),S&&Hs(N,S),f&&(N.l=f),y=N}return f=a.D,u=a.ya,f&&u&&Ie(y,f,u),Ie(y,"VER",a.la),Ni(a,y),y}function Gd(a,u,f){if(u&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=a.Ca&&!a.pa?new Re(new Qs({eb:f})):new Re(a.pa),u.Ha(a.J),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Kd(){}n=Kd.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function to(){}to.prototype.g=function(a,u){return new st(a,u)};function st(a,u){Ue.call(this),this.g=new Od(u),this.l=a,this.h=u&&u.messageUrlParams||null,a=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(a?a["X-WebChannel-Content-Type"]=u.messageContentType:a={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(a?a["X-WebChannel-Client-Profile"]=u.va:a={"X-WebChannel-Client-Profile":u.va}),this.g.S=a,(a=u&&u.Sb)&&!D(a)&&(this.g.m=a),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!D(u)&&(this.g.D=u,a=this.h,a!==null&&u in a&&(a=this.h,u in a&&delete a[u])),this.j=new vr(this)}C(st,Ue),st.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},st.prototype.close=function(){gc(this.g)},st.prototype.o=function(a){var u=this.g;if(typeof a=="string"){var f={};f.__data__=a,a=f}else this.u&&(f={},f.__data__=ic(a),a=f);u.i.push(new yy(u.Ya++,a)),u.G==3&&Zs(u)},st.prototype.N=function(){this.g.l=null,delete this.j,gc(this.g),delete this.g,st.aa.N.call(this)};function Hd(a){oc.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var u=a.__sm__;if(u){e:{for(const f in u){a=f;break e}a=void 0}(this.i=a)&&(a=this.i,u=u!==null&&a in u?u[a]:void 0),this.data=u}else this.data=a}C(Hd,oc);function Wd(){ac.call(this),this.status=1}C(Wd,ac);function vr(a){this.g=a}C(vr,Kd),vr.prototype.ua=function(){He(this.g,"a")},vr.prototype.ta=function(a){He(this.g,new Hd(a))},vr.prototype.sa=function(a){He(this.g,new Wd)},vr.prototype.ra=function(){He(this.g,"b")},to.prototype.createWebChannel=to.prototype.g,st.prototype.send=st.prototype.o,st.prototype.open=st.prototype.m,st.prototype.close=st.prototype.close,gm=function(){return new to},mm=function(){return js()},pm=Dn,Wc={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},qs.NO_ERROR=0,qs.TIMEOUT=8,qs.HTTP_ERROR=6,bo=qs,ud.COMPLETE="complete",fm=ud,sd.EventType=wi,wi.OPEN="a",wi.CLOSE="b",wi.ERROR="c",wi.MESSAGE="d",Ue.prototype.listen=Ue.prototype.K,$i=sd,Re.prototype.listenOnce=Re.prototype.L,Re.prototype.getLastError=Re.prototype.Ka,Re.prototype.getLastErrorCode=Re.prototype.Ba,Re.prototype.getStatus=Re.prototype.Z,Re.prototype.getResponseJson=Re.prototype.Oa,Re.prototype.getResponseText=Re.prototype.oa,Re.prototype.send=Re.prototype.ea,Re.prototype.setWithCredentials=Re.prototype.Ha,hm=Re}).apply(typeof io<"u"?io:typeof self<"u"?self:typeof window<"u"?window:{});const Rh="@firebase/firestore",Sh="4.7.7";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qe{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Qe.UNAUTHENTICATED=new Qe(null),Qe.GOOGLE_CREDENTIALS=new Qe("google-credentials-uid"),Qe.FIRST_PARTY=new Qe("first-party-uid"),Qe.MOCK_USER=new Qe("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let pi="11.3.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zn=new Ia("@firebase/firestore");function Sr(){return Zn.logLevel}function M(n,...e){if(Zn.logLevel<=ae.DEBUG){const t=e.map($l);Zn.debug(`Firestore (${pi}): ${n}`,...t)}}function Ye(n,...e){if(Zn.logLevel<=ae.ERROR){const t=e.map($l);Zn.error(`Firestore (${pi}): ${n}`,...t)}}function as(n,...e){if(Zn.logLevel<=ae.WARN){const t=e.map($l);Zn.warn(`Firestore (${pi}): ${n}`,...t)}}function $l(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
 */function W(n="Unexpected state"){const e=`FIRESTORE (${pi}) INTERNAL ASSERTION FAILED: `+n;throw Ye(e),new Error(e)}function Q(n,e){n||W()}function ne(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class $ extends Nt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NE{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class xE{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Qe.UNAUTHENTICATED))}shutdown(){}}class VE{constructor(e){this.t=e,this.currentUser=Qe.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Q(this.o===void 0);let r=this.i;const i=l=>this.i!==r?(r=this.i,t(l)):Promise.resolve();let s=new Rt;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new Rt,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const l=s;e.enqueueRetryable(async()=>{await l.promise,await i(this.currentUser)})},c=l=>{M("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(l=>c(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):(M("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new Rt)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(M("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Q(typeof r.accessToken=="string"),new NE(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Q(e===null||typeof e=="string"),new Qe(e)}}class OE{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=Qe.FIRST_PARTY,this.T=new Map}I(){return this.P?this.P():null}get headers(){this.T.set("X-Goog-AuthUser",this.l);const e=this.I();return e&&this.T.set("Authorization",e),this.h&&this.T.set("X-Goog-Iam-Authorization-Token",this.h),this.T}}class LE{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new OE(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(Qe.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Ph{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class ME{constructor(e,t){this.A=t,this.forceRefresh=!1,this.appCheck=null,this.R=null,this.V=null,ut(e)&&e.settings.appCheckToken&&(this.V=e.settings.appCheckToken)}start(e,t){Q(this.o===void 0);const r=s=>{s.error!=null&&M("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.R;return this.R=s.token,M("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{M("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.A.getImmediate({optional:!0});s?i(s):M("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.V)return Promise.resolve(new Ph(this.V));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(Q(typeof t.token=="string"),this.R=t.token,new Ph(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function FE(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */function Qc(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _m{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const i=FE(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%62))}return r}}function te(n,e){return n<e?-1:n>e?1:0}function Yc(n,e){const t=Qc().encode(n),r=Qc().encode(e);for(let i=0;i<Math.min(t.length,r.length);i++){const s=te(t[i],r[i]);if(s!==0)return s}return te(t.length,r.length)}function Gr(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}function ym(n){return n+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ch=-62135596800,kh=1e6;class Ae{static now(){return Ae.fromMillis(Date.now())}static fromDate(e){return Ae.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*kh);return new Ae(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new $(x.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new $(x.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Ch)throw new $(x.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new $(x.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/kh}_compareTo(e){return this.seconds===e.seconds?te(this.nanoseconds,e.nanoseconds):te(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds-Ch;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y{static fromTimestamp(e){return new Y(e)}static min(){return new Y(new Ae(0,0))}static max(){return new Y(new Ae(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dh="__name__";class It{constructor(e,t,r){t===void 0?t=0:t>e.length&&W(),r===void 0?r=e.length-t:r>e.length-t&&W(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return It.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof It?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let i=0;i<r;i++){const s=It.compareSegments(e.get(i),t.get(i));if(s!==0)return s}return te(e.length,t.length)}static compareSegments(e,t){const r=It.isNumericId(e),i=It.isNumericId(t);return r&&!i?-1:!r&&i?1:r&&i?It.extractNumericId(e).compare(It.extractNumericId(t)):Yc(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return gn.fromString(e.substring(4,e.length-2))}}class fe extends It{construct(e,t,r){return new fe(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new $(x.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new fe(t)}static emptyPath(){return new fe([])}}const UE=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Te extends It{construct(e,t,r){return new Te(e,t,r)}static isValidIdentifier(e){return UE.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Te.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Dh}static keyField(){return new Te([Dh])}static fromServerFormat(e){const t=[];let r="",i=0;const s=()=>{if(r.length===0)throw new $(x.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;i<e.length;){const c=e[i];if(c==="\\"){if(i+1===e.length)throw new $(x.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[i+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new $(x.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,i+=2}else c==="`"?(o=!o,i++):c!=="."||o?(r+=c,i++):(s(),i++)}if(s(),o)throw new $(x.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Te(t)}static emptyPath(){return new Te([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G{constructor(e){this.path=e}static fromPath(e){return new G(fe.fromString(e))}static fromName(e){return new G(fe.fromString(e).popFirst(5))}static empty(){return new G(fe.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&fe.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return fe.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new G(new fe(e.slice()))}}/**
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
 */const cs=-1;class zo{constructor(e,t,r,i){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=i}}function Jc(n){return n.fields.find(e=>e.kind===2)}function Fn(n){return n.fields.filter(e=>e.kind!==2)}zo.UNKNOWN_ID=-1;class To{constructor(e,t){this.fieldPath=e,this.kind=t}}class ls{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new ls(0,ct.min())}}function BE(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=Y.fromTimestamp(r===1e9?new Ae(t+1,0):new Ae(t,r));return new ct(i,G.empty(),e)}function vm(n){return new ct(n.readTime,n.key,cs)}class ct{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new ct(Y.min(),G.empty(),cs)}static max(){return new ct(Y.max(),G.empty(),cs)}}function jl(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=G.comparator(n.documentKey,e.documentKey),t!==0?t:te(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Im="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class wm{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hr(n){if(n.code!==x.FAILED_PRECONDITION||n.message!==Im)throw n;M("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&W(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new R((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof R?t:R.resolve(t)}catch(t){return R.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):R.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):R.reject(t)}static resolve(e){return new R((t,r)=>{t(e)})}static reject(e){return new R((t,r)=>{r(e)})}static waitFor(e){return new R((t,r)=>{let i=0,s=0,o=!1;e.forEach(c=>{++i,c.next(()=>{++s,o&&s===i&&t()},l=>r(l))}),o=!0,s===i&&t()})}static or(e){let t=R.resolve(!1);for(const r of e)t=t.next(i=>i?R.resolve(i):r());return t}static forEach(e,t){const r=[];return e.forEach((i,s)=>{r.push(t.call(this,i,s))}),this.waitFor(r)}static mapArray(e,t){return new R((r,i)=>{const s=e.length,o=new Array(s);let c=0;for(let l=0;l<s;l++){const d=l;t(e[d]).next(p=>{o[d]=p,++c,c===s&&r(o)},p=>i(p))}})}static doWhile(e,t){return new R((r,i)=>{const s=()=>{e()===!0?t().next(()=>{s()},i):r()};s()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ot="SimpleDb";class Aa{static open(e,t,r,i){try{return new Aa(t,e.transaction(i,r))}catch(s){throw new Wi(t,s)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.m=new Rt,this.transaction.oncomplete=()=>{this.m.resolve()},this.transaction.onabort=()=>{t.error?this.m.reject(new Wi(e,t.error)):this.m.resolve()},this.transaction.onerror=r=>{const i=ql(r.target.error);this.m.reject(new Wi(e,i))}}get p(){return this.m.promise}abort(e){e&&this.m.reject(e),this.aborted||(M(ot,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}S(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new jE(t)}}class _n{static delete(e){return M(ot,"Removing database:",e),Bn(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!va())return!1;if(_n.v())return!0;const e=Ve(),t=_n.C(e),r=0<t&&t<10,i=Em(e),s=0<i&&i<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||s)}static v(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.F)==="YES"}static M(e,t){return e.store(t)}static C(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}constructor(e,t,r){this.name=e,this.version=t,this.O=r,_n.C(Ve())===12.2&&Ye("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async N(e){return this.db||(M(ot,"Opening database:",this.name),this.db=await new Promise((t,r)=>{const i=indexedDB.open(this.name,this.version);i.onsuccess=s=>{const o=s.target.result;t(o)},i.onblocked=()=>{r(new Wi(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},i.onerror=s=>{const o=s.target.error;o.name==="VersionError"?r(new $(x.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new $(x.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new Wi(e,o))},i.onupgradeneeded=s=>{M(ot,'Database "'+this.name+'" requires upgrade from version:',s.oldVersion);const o=s.target.result;this.O.B(o,i.transaction,s.oldVersion,this.version).next(()=>{M(ot,"Database upgrade to version "+this.version+" complete")})}})),this.L&&(this.db.onversionchange=t=>this.L(t)),this.db}k(e){this.L=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,i){const s=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.N(e);const c=Aa.open(this.db,e,s?"readonly":"readwrite",r),l=i(c).next(d=>(c.S(),d)).catch(d=>(c.abort(d),R.reject(d))).toPromise();return l.catch(()=>{}),await c.p,l}catch(c){const l=c,d=l.name!=="FirebaseError"&&o<3;if(M(ot,"Transaction failed with error:",l.message,"Retrying:",d),this.close(),!d)return Promise.reject(l)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Em(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class $E{constructor(e){this.q=e,this.$=!1,this.U=null}get isDone(){return this.$}get K(){return this.U}set cursor(e){this.q=e}done(){this.$=!0}W(e){this.U=e}delete(){return Bn(this.q.delete())}}class Wi extends ${constructor(e,t){super(x.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function Rn(n){return n.name==="IndexedDbTransactionError"}class jE{constructor(e){this.store=e}put(e,t){let r;return t!==void 0?(M(ot,"PUT",this.store.name,e,t),r=this.store.put(t,e)):(M(ot,"PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),Bn(r)}add(e){return M(ot,"ADD",this.store.name,e,e),Bn(this.store.add(e))}get(e){return Bn(this.store.get(e)).next(t=>(t===void 0&&(t=null),M(ot,"GET",this.store.name,e,t),t))}delete(e){return M(ot,"DELETE",this.store.name,e),Bn(this.store.delete(e))}count(){return M(ot,"COUNT",this.store.name),Bn(this.store.count())}G(e,t){const r=this.options(e,t),i=r.index?this.store.index(r.index):this.store;if(typeof i.getAll=="function"){const s=i.getAll(r.range);return new R((o,c)=>{s.onerror=l=>{c(l.target.error)},s.onsuccess=l=>{o(l.target.result)}})}{const s=this.cursor(r),o=[];return this.j(s,(c,l)=>{o.push(l)}).next(()=>o)}}H(e,t){const r=this.store.getAll(e,t===null?void 0:t);return new R((i,s)=>{r.onerror=o=>{s(o.target.error)},r.onsuccess=o=>{i(o.target.result)}})}J(e,t){M(ot,"DELETE ALL",this.store.name);const r=this.options(e,t);r.Y=!1;const i=this.cursor(r);return this.j(i,(s,o,c)=>c.delete())}Z(e,t){let r;t?r=e:(r={},t=e);const i=this.cursor(r);return this.j(i,t)}X(e){const t=this.cursor({});return new R((r,i)=>{t.onerror=s=>{const o=ql(s.target.error);i(o)},t.onsuccess=s=>{const o=s.target.result;o?e(o.primaryKey,o.value).next(c=>{c?o.continue():r()}):r()}})}j(e,t){const r=[];return new R((i,s)=>{e.onerror=o=>{s(o.target.error)},e.onsuccess=o=>{const c=o.target.result;if(!c)return void i();const l=new $E(c),d=t(c.primaryKey,c.value,l);if(d instanceof R){const p=d.catch(m=>(l.done(),R.reject(m)));r.push(p)}l.isDone?i():l.K===null?c.continue():c.continue(l.K)}}).next(()=>R.waitFor(r))}options(e,t){let r;return e!==void 0&&(typeof e=="string"?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const r=this.store.index(e.index);return e.Y?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function Bn(n){return new R((e,t)=>{n.onsuccess=r=>{const i=r.target.result;e(i)},n.onerror=r=>{const i=ql(r.target.error);t(i)}})}let Nh=!1;function ql(n){const e=_n.C(Ve());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(t)>=0){const r=new $("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Nh||(Nh=!0,setTimeout(()=>{throw r},0)),r}}return n}const Qi="IndexBackfiller";class qE{constructor(e,t){this.asyncQueue=e,this.ee=t,this.task=null}start(){this.te(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}te(e){M(Qi,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{const t=await this.ee.ne();M(Qi,`Documents written: ${t}`)}catch(t){Rn(t)?M(Qi,"Ignoring IndexedDB error during index backfill: ",t):await hr(t)}await this.te(6e4)})}}class zE{constructor(e,t){this.localStore=e,this.persistence=t}async ne(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.re(t,e))}re(e,t){const r=new Set;let i=t,s=!0;return R.doWhile(()=>s===!0&&i>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!r.has(o))return M(Qi,`Processing collection: ${o}`),this.ie(e,o,i).next(c=>{i-=c,r.add(o)});s=!1})).next(()=>t-i)}ie(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(i=>this.localStore.localDocuments.getNextDocuments(e,t,i,r).next(s=>{const o=s.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this.se(i,s)).next(c=>(M(Qi,`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c))).next(()=>o.size)}))}se(e,t){let r=e;return t.changes.forEach((i,s)=>{const o=vm(s);jl(o,r)>0&&(r=o)}),new ct(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
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
 */class dt{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.oe(r),this._e=r=>t.writeSequenceNumber(r))}oe(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this._e&&this._e(e),e}}dt.ae=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wn=-1;function Ra(n){return n==null}function us(n){return n===0&&1/n==-1/0}function GE(n){return typeof n=="number"&&Number.isInteger(n)&&!us(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Go="";function Ge(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=xh(e)),e=KE(n.get(t),e);return xh(e)}function KE(n,e){let t=e;const r=n.length;for(let i=0;i<r;i++){const s=n.charAt(i);switch(s){case"\0":t+="";break;case Go:t+="";break;default:t+=s}}return t}function xh(n){return n+Go+""}function Et(n){const e=n.length;if(Q(e>=2),e===2)return Q(n.charAt(0)===Go&&n.charAt(1)===""),fe.emptyPath();const t=e-2,r=[];let i="";for(let s=0;s<e;){const o=n.indexOf(Go,s);switch((o<0||o>t)&&W(),n.charAt(o+1)){case"":const c=n.substring(s,o);let l;i.length===0?l=c:(i+=c,l=i,i=""),r.push(l);break;case"":i+=n.substring(s,o),i+="\0";break;case"":i+=n.substring(s,o+1);break;default:W()}s=o+2}return new fe(r)}/**
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
 */const Un="remoteDocuments",Cs="owner",wr="owner",ds="mutationQueues",HE="userId",gt="mutations",Vh="batchId",zn="userMutationsIndex",Oh=["userId","batchId"];/**
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
 */function Ao(n,e){return[n,Ge(e)]}function bm(n,e,t){return[n,Ge(e),t]}const WE={},Kr="documentMutations",Ko="remoteDocumentsV14",QE=["prefixPath","collectionGroup","readTime","documentId"],Ro="documentKeyIndex",YE=["prefixPath","collectionGroup","documentId"],Tm="collectionGroupIndex",JE=["collectionGroup","readTime","prefixPath","documentId"],hs="remoteDocumentGlobal",Xc="remoteDocumentGlobalKey",Hr="targets",Am="queryTargetsIndex",XE=["canonicalId","targetId"],Wr="targetDocuments",ZE=["targetId","path"],zl="documentTargetsIndex",eb=["path","targetId"],Ho="targetGlobalKey",Qn="targetGlobal",fs="collectionParents",tb=["collectionId","parent"],Qr="clientMetadata",nb="clientId",Sa="bundles",rb="bundleId",Pa="namedQueries",ib="name",Gl="indexConfiguration",sb="indexId",Zc="collectionGroupIndex",ob="collectionGroup",Wo="indexState",ab=["indexId","uid"],Rm="sequenceNumberIndex",cb=["uid","sequenceNumber"],Qo="indexEntries",lb=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],Sm="documentKeyIndex",ub=["indexId","uid","orderedDocumentKey"],Ca="documentOverlays",db=["userId","collectionPath","documentId"],el="collectionPathOverlayIndex",hb=["userId","collectionPath","largestBatchId"],Pm="collectionGroupOverlayIndex",fb=["userId","collectionGroup","largestBatchId"],Kl="globals",pb="name",Cm=[ds,gt,Kr,Un,Hr,Cs,Qn,Wr,Qr,hs,fs,Sa,Pa],mb=[...Cm,Ca],km=[ds,gt,Kr,Ko,Hr,Cs,Qn,Wr,Qr,hs,fs,Sa,Pa,Ca],Dm=km,Hl=[...Dm,Gl,Wo,Qo],gb=Hl,_b=[...Hl,Kl];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tl extends wm{constructor(e,t){super(),this.ue=e,this.currentSequenceNumber=t}}function Oe(n,e){const t=ne(n);return _n.M(t.ue,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lh(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Sn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Nm(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class be{constructor(e,t){this.comparator=e,this.root=t||Fe.EMPTY}insert(e,t){return new be(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Fe.BLACK,null,null))}remove(e){return new be(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Fe.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new so(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new so(this.root,e,this.comparator,!1)}getReverseIterator(){return new so(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new so(this.root,e,this.comparator,!0)}}class so{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Fe{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??Fe.RED,this.left=i??Fe.EMPTY,this.right=s??Fe.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new Fe(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return Fe.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return Fe.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Fe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Fe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw W();const e=this.left.check();if(e!==this.right.check())throw W();return e+(this.isRed()?0:1)}}Fe.EMPTY=null,Fe.RED=!0,Fe.BLACK=!1;Fe.EMPTY=new class{constructor(){this.size=0}get key(){throw W()}get value(){throw W()}get color(){throw W()}get left(){throw W()}get right(){throw W()}copy(e,t,r,i,s){return this}insert(e,t,r){return new Fe(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _e{constructor(e){this.comparator=e,this.data=new be(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Mh(this.data.getIterator())}getIteratorFrom(e){return new Mh(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof _e)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new _e(this.comparator);return t.data=e,t}}class Mh{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Er(n){return n.hasNext()?n.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tt{constructor(e){this.fields=e,e.sort(Te.comparator)}static empty(){return new tt([])}unionWith(e){let t=new _e(Te.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new tt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Gr(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
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
 */class xm extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new xm("Invalid base64 string: "+s):s}}(e);return new De(t)}static fromUint8Array(e){const t=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new De(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return te(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}De.EMPTY_BYTE_STRING=new De("");const yb=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function zt(n){if(Q(!!n),typeof n=="string"){let e=0;const t=yb.exec(n);if(Q(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Ee(n.seconds),nanos:Ee(n.nanos)}}function Ee(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Gt(n){return typeof n=="string"?De.fromBase64String(n):De.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vm="server_timestamp",Om="__type__",Lm="__previous_value__",Mm="__local_write_time__";function ka(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[Om])===null||t===void 0?void 0:t.stringValue)===Vm}function Da(n){const e=n.mapValue.fields[Lm];return ka(e)?Da(e):e}function ps(n){const e=zt(n.mapValue.fields[Mm].timestampValue);return new Ae(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vb{constructor(e,t,r,i,s,o,c,l,d){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=d}}const Yo="(default)";class er{constructor(e,t){this.projectId=e,this.database=t||Yo}static empty(){return new er("","")}get isDefaultDatabase(){return this.database===Yo}isEqual(e){return e instanceof er&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wl="__type__",Fm="__max__",hn={mapValue:{fields:{__type__:{stringValue:Fm}}}},Ql="__vector__",Yr="value",So={nullValue:"NULL_VALUE"};function In(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?ka(n)?4:Um(n)?9007199254740991:Na(n)?10:11:W()}function Ct(n,e){if(n===e)return!0;const t=In(n);if(t!==In(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return ps(n).isEqual(ps(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const o=zt(i.timestampValue),c=zt(s.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return Gt(i.bytesValue).isEqual(Gt(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return Ee(i.geoPointValue.latitude)===Ee(s.geoPointValue.latitude)&&Ee(i.geoPointValue.longitude)===Ee(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return Ee(i.integerValue)===Ee(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const o=Ee(i.doubleValue),c=Ee(s.doubleValue);return o===c?us(o)===us(c):isNaN(o)&&isNaN(c)}return!1}(n,e);case 9:return Gr(n.arrayValue.values||[],e.arrayValue.values||[],Ct);case 10:case 11:return function(i,s){const o=i.mapValue.fields||{},c=s.mapValue.fields||{};if(Lh(o)!==Lh(c))return!1;for(const l in o)if(o.hasOwnProperty(l)&&(c[l]===void 0||!Ct(o[l],c[l])))return!1;return!0}(n,e);default:return W()}}function ms(n,e){return(n.values||[]).find(t=>Ct(t,e))!==void 0}function wn(n,e){if(n===e)return 0;const t=In(n),r=In(e);if(t!==r)return te(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return te(n.booleanValue,e.booleanValue);case 2:return function(s,o){const c=Ee(s.integerValue||s.doubleValue),l=Ee(o.integerValue||o.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1}(n,e);case 3:return Fh(n.timestampValue,e.timestampValue);case 4:return Fh(ps(n),ps(e));case 5:return Yc(n.stringValue,e.stringValue);case 6:return function(s,o){const c=Gt(s),l=Gt(o);return c.compareTo(l)}(n.bytesValue,e.bytesValue);case 7:return function(s,o){const c=s.split("/"),l=o.split("/");for(let d=0;d<c.length&&d<l.length;d++){const p=te(c[d],l[d]);if(p!==0)return p}return te(c.length,l.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,o){const c=te(Ee(s.latitude),Ee(o.latitude));return c!==0?c:te(Ee(s.longitude),Ee(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Uh(n.arrayValue,e.arrayValue);case 10:return function(s,o){var c,l,d,p;const m=s.fields||{},w=o.fields||{},A=(c=m[Yr])===null||c===void 0?void 0:c.arrayValue,C=(l=w[Yr])===null||l===void 0?void 0:l.arrayValue,k=te(((d=A?.values)===null||d===void 0?void 0:d.length)||0,((p=C?.values)===null||p===void 0?void 0:p.length)||0);return k!==0?k:Uh(A,C)}(n.mapValue,e.mapValue);case 11:return function(s,o){if(s===hn.mapValue&&o===hn.mapValue)return 0;if(s===hn.mapValue)return 1;if(o===hn.mapValue)return-1;const c=s.fields||{},l=Object.keys(c),d=o.fields||{},p=Object.keys(d);l.sort(),p.sort();for(let m=0;m<l.length&&m<p.length;++m){const w=Yc(l[m],p[m]);if(w!==0)return w;const A=wn(c[l[m]],d[p[m]]);if(A!==0)return A}return te(l.length,p.length)}(n.mapValue,e.mapValue);default:throw W()}}function Fh(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return te(n,e);const t=zt(n),r=zt(e),i=te(t.seconds,r.seconds);return i!==0?i:te(t.nanos,r.nanos)}function Uh(n,e){const t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){const s=wn(t[i],r[i]);if(s)return s}return te(t.length,r.length)}function Jr(n){return nl(n)}function nl(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=zt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Gt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return G.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(const s of t.values||[])i?i=!1:r+=",",r+=nl(s);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let i="{",s=!0;for(const o of r)s?s=!1:i+=",",i+=`${o}:${nl(t.fields[o])}`;return i+"}"}(n.mapValue):W()}function Po(n){switch(In(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Da(n);return e?16+Po(e):16;case 5:return 2*n.stringValue.length;case 6:return Gt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((i,s)=>i+Po(s),0)}(n.arrayValue);case 10:case 11:return function(r){let i=0;return Sn(r.fields,(s,o)=>{i+=s.length+Po(o)}),i}(n.mapValue);default:throw W()}}function tr(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function rl(n){return!!n&&"integerValue"in n}function gs(n){return!!n&&"arrayValue"in n}function Bh(n){return!!n&&"nullValue"in n}function $h(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Co(n){return!!n&&"mapValue"in n}function Na(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[Wl])===null||t===void 0?void 0:t.stringValue)===Ql}function Yi(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return Sn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Yi(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Yi(n.arrayValue.values[t]);return e}return Object.assign({},n)}function Um(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Fm}const Bm={mapValue:{fields:{[Wl]:{stringValue:Ql},[Yr]:{arrayValue:{}}}}};function Ib(n){return"nullValue"in n?So:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?tr(er.empty(),G.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?Na(n)?Bm:{mapValue:{}}:W()}function wb(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?tr(er.empty(),G.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?Bm:"mapValue"in n?Na(n)?{mapValue:{}}:hn:W()}function jh(n,e){const t=wn(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?-1:!n.inclusive&&e.inclusive?1:0}function qh(n,e){const t=wn(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?1:!n.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ze{constructor(e){this.value=e}static empty(){return new ze({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Co(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Yi(t)}setAll(e){let t=Te.emptyPath(),r={},i=[];e.forEach((o,c)=>{if(!t.isImmediateParentOf(c)){const l=this.getFieldsMap(t);this.applyChanges(l,r,i),r={},i=[],t=c.popLast()}o?r[c.lastSegment()]=Yi(o):i.push(c.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){const t=this.field(e.popLast());Co(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Ct(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];Co(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){Sn(t,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new ze(Yi(this.value))}}function $m(n){const e=[];return Sn(n.fields,(t,r)=>{const i=new Te([t]);if(Co(r)){const s=$m(r.mapValue).fields;if(s.length===0)e.push(i);else for(const o of s)e.push(i.child(o))}else e.push(i)}),new tt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(e,t,r,i,s,o,c){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=c}static newInvalidDocument(e){return new Pe(e,0,Y.min(),Y.min(),Y.min(),ze.empty(),0)}static newFoundDocument(e,t,r,i){return new Pe(e,1,t,Y.min(),r,i,0)}static newNoDocument(e,t){return new Pe(e,2,t,Y.min(),Y.min(),ze.empty(),0)}static newUnknownDocument(e,t){return new Pe(e,3,t,Y.min(),Y.min(),ze.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(Y.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=ze.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=ze.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Y.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Pe&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Pe(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class En{constructor(e,t){this.position=e,this.inclusive=t}}function zh(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){const s=e[i],o=n.position[i];if(s.field.isKeyField()?r=G.comparator(G.fromName(o.referenceValue),t.key):r=wn(o,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function Gh(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Ct(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class _s{constructor(e,t="asc"){this.field=e,this.dir=t}}function Eb(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class jm{}class ce extends jm{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new bb(e,t,r):t==="array-contains"?new Rb(e,r):t==="in"?new Wm(e,r):t==="not-in"?new Sb(e,r):t==="array-contains-any"?new Pb(e,r):new ce(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Tb(e,r):new Ab(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(wn(t,this.value)):t!==null&&In(this.value)===In(t)&&this.matchesComparison(wn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return W()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ge extends jm{constructor(e,t){super(),this.filters=e,this.op=t,this.ce=null}static create(e,t){return new ge(e,t)}matches(e){return Xr(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ce!==null||(this.ce=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ce}getFilters(){return Object.assign([],this.filters)}}function Xr(n){return n.op==="and"}function il(n){return n.op==="or"}function Yl(n){return qm(n)&&Xr(n)}function qm(n){for(const e of n.filters)if(e instanceof ge)return!1;return!0}function sl(n){if(n instanceof ce)return n.field.canonicalString()+n.op.toString()+Jr(n.value);if(Yl(n))return n.filters.map(e=>sl(e)).join(",");{const e=n.filters.map(t=>sl(t)).join(",");return`${n.op}(${e})`}}function zm(n,e){return n instanceof ce?function(r,i){return i instanceof ce&&r.op===i.op&&r.field.isEqual(i.field)&&Ct(r.value,i.value)}(n,e):n instanceof ge?function(r,i){return i instanceof ge&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,o,c)=>s&&zm(o,i.filters[c]),!0):!1}(n,e):void W()}function Gm(n,e){const t=n.filters.concat(e);return ge.create(t,n.op)}function Km(n){return n instanceof ce?function(t){return`${t.field.canonicalString()} ${t.op} ${Jr(t.value)}`}(n):n instanceof ge?function(t){return t.op.toString()+" {"+t.getFilters().map(Km).join(" ,")+"}"}(n):"Filter"}class bb extends ce{constructor(e,t,r){super(e,t,r),this.key=G.fromName(r.referenceValue)}matches(e){const t=G.comparator(e.key,this.key);return this.matchesComparison(t)}}class Tb extends ce{constructor(e,t){super(e,"in",t),this.keys=Hm("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Ab extends ce{constructor(e,t){super(e,"not-in",t),this.keys=Hm("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Hm(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>G.fromName(r.referenceValue))}class Rb extends ce{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return gs(t)&&ms(t.arrayValue,this.value)}}class Wm extends ce{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&ms(this.value.arrayValue,t)}}class Sb extends ce{constructor(e,t){super(e,"not-in",t)}matches(e){if(ms(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!ms(this.value.arrayValue,t)}}class Pb extends ce{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!gs(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>ms(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cb{constructor(e,t=null,r=[],i=[],s=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=c,this.le=null}}function ol(n,e=null,t=[],r=[],i=null,s=null,o=null){return new Cb(n,e,t,r,i,s,o)}function nr(n){const e=ne(n);if(e.le===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>sl(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),Ra(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Jr(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Jr(r)).join(",")),e.le=t}return e.le}function ks(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Eb(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!zm(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Gh(n.startAt,e.startAt)&&Gh(n.endAt,e.endAt)}function Jo(n){return G.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Xo(n,e){return n.filters.filter(t=>t instanceof ce&&t.field.isEqual(e))}function Kh(n,e,t){let r=So,i=!0;for(const s of Xo(n,e)){let o=So,c=!0;switch(s.op){case"<":case"<=":o=Ib(s.value);break;case"==":case"in":case">=":o=s.value;break;case">":o=s.value,c=!1;break;case"!=":case"not-in":o=So}jh({value:r,inclusive:i},{value:o,inclusive:c})<0&&(r=o,i=c)}if(t!==null){for(let s=0;s<n.orderBy.length;++s)if(n.orderBy[s].field.isEqual(e)){const o=t.position[s];jh({value:r,inclusive:i},{value:o,inclusive:t.inclusive})<0&&(r=o,i=t.inclusive);break}}return{value:r,inclusive:i}}function Hh(n,e,t){let r=hn,i=!0;for(const s of Xo(n,e)){let o=hn,c=!0;switch(s.op){case">=":case">":o=wb(s.value),c=!1;break;case"==":case"in":case"<=":o=s.value;break;case"<":o=s.value,c=!1;break;case"!=":case"not-in":o=hn}qh({value:r,inclusive:i},{value:o,inclusive:c})>0&&(r=o,i=c)}if(t!==null){for(let s=0;s<n.orderBy.length;++s)if(n.orderBy[s].field.isEqual(e)){const o=t.position[s];qh({value:r,inclusive:i},{value:o,inclusive:t.inclusive})>0&&(r=o,i=t.inclusive);break}}return{value:r,inclusive:i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fr{constructor(e,t=null,r=[],i=[],s=null,o="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=c,this.endAt=l,this.he=null,this.Pe=null,this.Te=null,this.startAt,this.endAt}}function kb(n,e,t,r,i,s,o,c){return new fr(n,e,t,r,i,s,o,c)}function Ds(n){return new fr(n)}function Wh(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Jl(n){return n.collectionGroup!==null}function Fr(n){const e=ne(n);if(e.he===null){e.he=[];const t=new Set;for(const s of e.explicitOrderBy)e.he.push(s),t.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new _e(Te.comparator);return o.filters.forEach(l=>{l.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.he.push(new _s(s,r))}),t.has(Te.keyField().canonicalString())||e.he.push(new _s(Te.keyField(),r))}return e.he}function ht(n){const e=ne(n);return e.Pe||(e.Pe=Db(e,Fr(n))),e.Pe}function Db(n,e){if(n.limitType==="F")return ol(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new _s(i.field,s)});const t=n.endAt?new En(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new En(n.startAt.position,n.startAt.inclusive):null;return ol(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function al(n,e){const t=n.filters.concat([e]);return new fr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Zo(n,e,t){return new fr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function xa(n,e){return ks(ht(n),ht(e))&&n.limitType===e.limitType}function Qm(n){return`${nr(ht(n))}|lt:${n.limitType}`}function Pr(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>Km(i)).join(", ")}]`),Ra(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>Jr(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>Jr(i)).join(",")),`Target(${r})`}(ht(n))}; limitType=${n.limitType})`}function Ns(n,e){return e.isFoundDocument()&&function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):G.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(n,e)&&function(r,i){for(const s of Fr(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(n,e)&&function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(o,c,l){const d=zh(o,c,l);return o.inclusive?d<=0:d<0}(r.startAt,Fr(r),i)||r.endAt&&!function(o,c,l){const d=zh(o,c,l);return o.inclusive?d>=0:d>0}(r.endAt,Fr(r),i))}(n,e)}function Nb(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Ym(n){return(e,t)=>{let r=!1;for(const i of Fr(n)){const s=xb(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function xb(n,e,t){const r=n.field.isKeyField()?G.comparator(e.key,t.key):function(s,o,c){const l=o.data.field(s),d=c.data.field(s);return l!==null&&d!==null?wn(l,d):W()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return W()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){Sn(this.inner,(t,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return Nm(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vb=new be(G.comparator);function at(){return Vb}const Jm=new be(G.comparator);function ji(...n){let e=Jm;for(const t of n)e=e.insert(t.key,t);return e}function Xm(n){let e=Jm;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function bt(){return Ji()}function Zm(){return Ji()}function Ji(){return new Kt(n=>n.toString(),(n,e)=>n.isEqual(e))}const Ob=new be(G.comparator),Lb=new _e(G.comparator);function se(...n){let e=Lb;for(const t of n)e=e.add(t);return e}const Mb=new _e(te);function Fb(){return Mb}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xl(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:us(e)?"-0":e}}function eg(n){return{integerValue:""+n}}function tg(n,e){return GE(e)?eg(e):Xl(n,e)}/**
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
 */class Va{constructor(){this._=void 0}}function Ub(n,e,t){return n instanceof ys?function(i,s){const o={fields:{[Om]:{stringValue:Vm},[Mm]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&ka(s)&&(s=Da(s)),s&&(o.fields[Lm]=s),{mapValue:o}}(t,e):n instanceof Zr?rg(n,e):n instanceof ei?ig(n,e):function(i,s){const o=ng(i,s),c=Qh(o)+Qh(i.Ie);return rl(o)&&rl(i.Ie)?eg(c):Xl(i.serializer,c)}(n,e)}function Bb(n,e,t){return n instanceof Zr?rg(n,e):n instanceof ei?ig(n,e):t}function ng(n,e){return n instanceof ti?function(r){return rl(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class ys extends Va{}class Zr extends Va{constructor(e){super(),this.elements=e}}function rg(n,e){const t=sg(e);for(const r of n.elements)t.some(i=>Ct(i,r))||t.push(r);return{arrayValue:{values:t}}}class ei extends Va{constructor(e){super(),this.elements=e}}function ig(n,e){let t=sg(e);for(const r of n.elements)t=t.filter(i=>!Ct(i,r));return{arrayValue:{values:t}}}class ti extends Va{constructor(e,t){super(),this.serializer=e,this.Ie=t}}function Qh(n){return Ee(n.integerValue||n.doubleValue)}function sg(n){return gs(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class og{constructor(e,t){this.field=e,this.transform=t}}function $b(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof Zr&&i instanceof Zr||r instanceof ei&&i instanceof ei?Gr(r.elements,i.elements,Ct):r instanceof ti&&i instanceof ti?Ct(r.Ie,i.Ie):r instanceof ys&&i instanceof ys}(n.transform,e.transform)}class jb{constructor(e,t){this.version=e,this.transformResults=t}}class nt{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new nt}static exists(e){return new nt(void 0,e)}static updateTime(e){return new nt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function ko(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Oa{}function ag(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Zl(n.key,nt.none()):new mi(n.key,n.data,nt.none());{const t=n.data,r=ze.empty();let i=new _e(Te.comparator);for(let s of e.fields)if(!i.has(s)){let o=t.field(s);o===null&&s.length>1&&(s=s.popLast(),o=t.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new Ht(n.key,r,new tt(i.toArray()),nt.none())}}function qb(n,e,t){n instanceof mi?function(i,s,o){const c=i.value.clone(),l=Jh(i.fieldTransforms,s,o.transformResults);c.setAll(l),s.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(n,e,t):n instanceof Ht?function(i,s,o){if(!ko(i.precondition,s))return void s.convertToUnknownDocument(o.version);const c=Jh(i.fieldTransforms,s,o.transformResults),l=s.data;l.setAll(cg(i)),l.setAll(c),s.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(n,e,t):function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function Xi(n,e,t,r){return n instanceof mi?function(s,o,c,l){if(!ko(s.precondition,o))return c;const d=s.value.clone(),p=Xh(s.fieldTransforms,l,o);return d.setAll(p),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),null}(n,e,t,r):n instanceof Ht?function(s,o,c,l){if(!ko(s.precondition,o))return c;const d=Xh(s.fieldTransforms,l,o),p=o.data;return p.setAll(cg(s)),p.setAll(d),o.convertToFoundDocument(o.version,p).setHasLocalMutations(),c===null?null:c.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(m=>m.field))}(n,e,t,r):function(s,o,c){return ko(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c}(n,e,t)}function zb(n,e){let t=null;for(const r of n.fieldTransforms){const i=e.data.field(r.field),s=ng(r.transform,i||null);s!=null&&(t===null&&(t=ze.empty()),t.set(r.field,s))}return t||null}function Yh(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&Gr(r,i,(s,o)=>$b(s,o))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class mi extends Oa{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Ht extends Oa{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function cg(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function Jh(n,e,t){const r=new Map;Q(n.length===t.length);for(let i=0;i<t.length;i++){const s=n[i],o=s.transform,c=e.data.field(s.field);r.set(s.field,Bb(o,c,t[i]))}return r}function Xh(n,e,t){const r=new Map;for(const i of n){const s=i.transform,o=t.data.field(i.field);r.set(i.field,Ub(s,o,e))}return r}class Zl extends Oa{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class lg extends Oa{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&qb(s,e,r[i])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Xi(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Xi(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Zm();return this.mutations.forEach(i=>{const s=e.get(i.key),o=s.overlayedDocument;let c=this.applyToLocalView(o,s.mutatedFields);c=t.has(i.key)?null:c;const l=ag(o,c);l!==null&&r.set(i.key,l),o.isValidDocument()||o.convertToNoDocument(Y.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),se())}isEqual(e){return this.batchId===e.batchId&&Gr(this.mutations,e.mutations,(t,r)=>Yh(t,r))&&Gr(this.baseMutations,e.baseMutations,(t,r)=>Yh(t,r))}}class tu{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){Q(e.mutations.length===r.length);let i=function(){return Ob}();const s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new tu(e,t,r,i)}}/**
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
 */class nu{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class Gb{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ke,ue;function Kb(n){switch(n){case x.OK:return W();case x.CANCELLED:case x.UNKNOWN:case x.DEADLINE_EXCEEDED:case x.RESOURCE_EXHAUSTED:case x.INTERNAL:case x.UNAVAILABLE:case x.UNAUTHENTICATED:return!1;case x.INVALID_ARGUMENT:case x.NOT_FOUND:case x.ALREADY_EXISTS:case x.PERMISSION_DENIED:case x.FAILED_PRECONDITION:case x.ABORTED:case x.OUT_OF_RANGE:case x.UNIMPLEMENTED:case x.DATA_LOSS:return!0;default:return W()}}function ug(n){if(n===void 0)return Ye("GRPC error has no .code"),x.UNKNOWN;switch(n){case ke.OK:return x.OK;case ke.CANCELLED:return x.CANCELLED;case ke.UNKNOWN:return x.UNKNOWN;case ke.DEADLINE_EXCEEDED:return x.DEADLINE_EXCEEDED;case ke.RESOURCE_EXHAUSTED:return x.RESOURCE_EXHAUSTED;case ke.INTERNAL:return x.INTERNAL;case ke.UNAVAILABLE:return x.UNAVAILABLE;case ke.UNAUTHENTICATED:return x.UNAUTHENTICATED;case ke.INVALID_ARGUMENT:return x.INVALID_ARGUMENT;case ke.NOT_FOUND:return x.NOT_FOUND;case ke.ALREADY_EXISTS:return x.ALREADY_EXISTS;case ke.PERMISSION_DENIED:return x.PERMISSION_DENIED;case ke.FAILED_PRECONDITION:return x.FAILED_PRECONDITION;case ke.ABORTED:return x.ABORTED;case ke.OUT_OF_RANGE:return x.OUT_OF_RANGE;case ke.UNIMPLEMENTED:return x.UNIMPLEMENTED;case ke.DATA_LOSS:return x.DATA_LOSS;default:return W()}}(ue=ke||(ke={}))[ue.OK=0]="OK",ue[ue.CANCELLED=1]="CANCELLED",ue[ue.UNKNOWN=2]="UNKNOWN",ue[ue.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ue[ue.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ue[ue.NOT_FOUND=5]="NOT_FOUND",ue[ue.ALREADY_EXISTS=6]="ALREADY_EXISTS",ue[ue.PERMISSION_DENIED=7]="PERMISSION_DENIED",ue[ue.UNAUTHENTICATED=16]="UNAUTHENTICATED",ue[ue.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ue[ue.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ue[ue.ABORTED=10]="ABORTED",ue[ue.OUT_OF_RANGE=11]="OUT_OF_RANGE",ue[ue.UNIMPLEMENTED=12]="UNIMPLEMENTED",ue[ue.INTERNAL=13]="INTERNAL",ue[ue.UNAVAILABLE=14]="UNAVAILABLE",ue[ue.DATA_LOSS=15]="DATA_LOSS";/**
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
 */const Hb=new gn([4294967295,4294967295],0);function Zh(n){const e=Qc().encode(n),t=new dm;return t.update(e),new Uint8Array(t.digest())}function ef(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new gn([t,r],0),new gn([i,s],0)]}class ru{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new qi(`Invalid padding: ${t}`);if(r<0)throw new qi(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new qi(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new qi(`Invalid padding when bitmap length is 0: ${t}`);this.Ee=8*e.length-t,this.de=gn.fromNumber(this.Ee)}Ae(e,t,r){let i=e.add(t.multiply(gn.fromNumber(r)));return i.compare(Hb)===1&&(i=new gn([i.getBits(0),i.getBits(1)],0)),i.modulo(this.de).toNumber()}Re(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.Ee===0)return!1;const t=Zh(e),[r,i]=ef(t);for(let s=0;s<this.hashCount;s++){const o=this.Ae(r,i,s);if(!this.Re(o))return!1}return!0}static create(e,t,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new ru(s,i,t);return r.forEach(c=>o.insert(c)),o}insert(e){if(this.Ee===0)return;const t=Zh(e),[r,i]=ef(t);for(let s=0;s<this.hashCount;s++){const o=this.Ae(r,i,s);this.Ve(o)}}Ve(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class qi extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class La{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const i=new Map;return i.set(e,xs.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new La(Y.min(),i,new be(te),at(),se())}}class xs{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new xs(r,t,se(),se(),se())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Do{constructor(e,t,r,i){this.me=e,this.removedTargetIds=t,this.key=r,this.fe=i}}class dg{constructor(e,t){this.targetId=e,this.ge=t}}class hg{constructor(e,t,r=De.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}}class tf{constructor(){this.pe=0,this.ye=nf(),this.we=De.EMPTY_BYTE_STRING,this.Se=!1,this.be=!0}get current(){return this.Se}get resumeToken(){return this.we}get De(){return this.pe!==0}get ve(){return this.be}Ce(e){e.approximateByteSize()>0&&(this.be=!0,this.we=e)}Fe(){let e=se(),t=se(),r=se();return this.ye.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:W()}}),new xs(this.we,this.Se,e,t,r)}Me(){this.be=!1,this.ye=nf()}xe(e,t){this.be=!0,this.ye=this.ye.insert(e,t)}Oe(e){this.be=!0,this.ye=this.ye.remove(e)}Ne(){this.pe+=1}Be(){this.pe-=1,Q(this.pe>=0)}Le(){this.be=!0,this.Se=!0}}class Wb{constructor(e){this.ke=e,this.qe=new Map,this.Qe=at(),this.$e=oo(),this.Ue=oo(),this.Ke=new be(te)}We(e){for(const t of e.me)e.fe&&e.fe.isFoundDocument()?this.Ge(t,e.fe):this.ze(t,e.key,e.fe);for(const t of e.removedTargetIds)this.ze(t,e.key,e.fe)}je(e){this.forEachTarget(e,t=>{const r=this.He(t);switch(e.state){case 0:this.Je(t)&&r.Ce(e.resumeToken);break;case 1:r.Be(),r.De||r.Me(),r.Ce(e.resumeToken);break;case 2:r.Be(),r.De||this.removeTarget(t);break;case 3:this.Je(t)&&(r.Le(),r.Ce(e.resumeToken));break;case 4:this.Je(t)&&(this.Ye(t),r.Ce(e.resumeToken));break;default:W()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.qe.forEach((r,i)=>{this.Je(i)&&t(i)})}Ze(e){const t=e.targetId,r=e.ge.count,i=this.Xe(t);if(i){const s=i.target;if(Jo(s))if(r===0){const o=new G(s.path);this.ze(t,o,Pe.newNoDocument(o,Y.min()))}else Q(r===1);else{const o=this.et(t);if(o!==r){const c=this.tt(e),l=c?this.nt(c,e,o):1;if(l!==0){this.Ye(t);const d=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ke=this.Ke.insert(t,d)}}}}}tt(e){const t=e.ge.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t;let o,c;try{o=Gt(r).toUint8Array()}catch(l){if(l instanceof xm)return as("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new ru(o,i,s)}catch(l){return as(l instanceof qi?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.Ee===0?null:c}nt(e,t,r){return t.ge.count===r-this.st(e,t.targetId)?0:2}st(e,t){const r=this.ke.getRemoteKeysForTarget(t);let i=0;return r.forEach(s=>{const o=this.ke.it(),c=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(c)||(this.ze(t,s,null),i++)}),i}ot(e){const t=new Map;this.qe.forEach((s,o)=>{const c=this.Xe(o);if(c){if(s.current&&Jo(c.target)){const l=new G(c.target.path);this._t(l).has(o)||this.ut(o,l)||this.ze(o,l,Pe.newNoDocument(l,e))}s.ve&&(t.set(o,s.Fe()),s.Me())}});let r=se();this.Ue.forEach((s,o)=>{let c=!0;o.forEachWhile(l=>{const d=this.Xe(l);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(s))}),this.Qe.forEach((s,o)=>o.setReadTime(e));const i=new La(e,t,this.Ke,this.Qe,r);return this.Qe=at(),this.$e=oo(),this.Ue=oo(),this.Ke=new be(te),i}Ge(e,t){if(!this.Je(e))return;const r=this.ut(e,t.key)?2:0;this.He(e).xe(t.key,r),this.Qe=this.Qe.insert(t.key,t),this.$e=this.$e.insert(t.key,this._t(t.key).add(e)),this.Ue=this.Ue.insert(t.key,this.ct(t.key).add(e))}ze(e,t,r){if(!this.Je(e))return;const i=this.He(e);this.ut(e,t)?i.xe(t,1):i.Oe(t),this.Ue=this.Ue.insert(t,this.ct(t).delete(e)),this.Ue=this.Ue.insert(t,this.ct(t).add(e)),r&&(this.Qe=this.Qe.insert(t,r))}removeTarget(e){this.qe.delete(e)}et(e){const t=this.He(e).Fe();return this.ke.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ne(e){this.He(e).Ne()}He(e){let t=this.qe.get(e);return t||(t=new tf,this.qe.set(e,t)),t}ct(e){let t=this.Ue.get(e);return t||(t=new _e(te),this.Ue=this.Ue.insert(e,t)),t}_t(e){let t=this.$e.get(e);return t||(t=new _e(te),this.$e=this.$e.insert(e,t)),t}Je(e){const t=this.Xe(e)!==null;return t||M("WatchChangeAggregator","Detected inactive target",e),t}Xe(e){const t=this.qe.get(e);return t&&t.De?null:this.ke.lt(e)}Ye(e){this.qe.set(e,new tf),this.ke.getRemoteKeysForTarget(e).forEach(t=>{this.ze(e,t,null)})}ut(e,t){return this.ke.getRemoteKeysForTarget(e).has(t)}}function oo(){return new be(G.comparator)}function nf(){return new be(G.comparator)}const Qb={asc:"ASCENDING",desc:"DESCENDING"},Yb={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Jb={and:"AND",or:"OR"};class Xb{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function cl(n,e){return n.useProto3Json||Ra(e)?e:{value:e}}function ni(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function fg(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Zb(n,e){return ni(n,e.toTimestamp())}function Je(n){return Q(!!n),Y.fromTimestamp(function(t){const r=zt(t);return new Ae(r.seconds,r.nanos)}(n))}function iu(n,e){return ll(n,e).canonicalString()}function ll(n,e){const t=function(i){return new fe(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function pg(n){const e=fe.fromString(n);return Q(bg(e)),e}function ea(n,e){return iu(n.databaseId,e.path)}function Yn(n,e){const t=pg(e);if(t.get(1)!==n.databaseId.projectId)throw new $(x.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new $(x.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new G(_g(t))}function mg(n,e){return iu(n.databaseId,e)}function gg(n){const e=pg(n);return e.length===4?fe.emptyPath():_g(e)}function ul(n){return new fe(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function _g(n){return Q(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function rf(n,e,t){return{name:ea(n,e),fields:t.value.mapValue.fields}}function eT(n,e,t){const r=Yn(n,e.name),i=Je(e.updateTime),s=e.createTime?Je(e.createTime):Y.min(),o=new ze({mapValue:{fields:e.fields}}),c=Pe.newFoundDocument(r,i,s,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function tT(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:W()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(d,p){return d.useProto3Json?(Q(p===void 0||typeof p=="string"),De.fromBase64String(p||"")):(Q(p===void 0||p instanceof Buffer||p instanceof Uint8Array),De.fromUint8Array(p||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&function(d){const p=d.code===void 0?x.UNKNOWN:ug(d.code);return new $(p,d.message||"")}(o);t=new hg(r,i,s,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=Yn(n,r.document.name),s=Je(r.document.updateTime),o=r.document.createTime?Je(r.document.createTime):Y.min(),c=new ze({mapValue:{fields:r.document.fields}}),l=Pe.newFoundDocument(i,s,o,c),d=r.targetIds||[],p=r.removedTargetIds||[];t=new Do(d,p,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=Yn(n,r.document),s=r.readTime?Je(r.readTime):Y.min(),o=Pe.newNoDocument(i,s),c=r.removedTargetIds||[];t=new Do([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=Yn(n,r.document),s=r.removedTargetIds||[];t=new Do([],s,i,null)}else{if(!("filter"in e))return W();{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,o=new Gb(i,s),c=r.targetId;t=new dg(c,o)}}return t}function ta(n,e){let t;if(e instanceof mi)t={update:rf(n,e.key,e.value)};else if(e instanceof Zl)t={delete:ea(n,e.key)};else if(e instanceof Ht)t={update:rf(n,e.key,e.data),updateMask:aT(e.fieldMask)};else{if(!(e instanceof lg))return W();t={verify:ea(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,o){const c=o.transform;if(c instanceof ys)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Zr)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof ei)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof ti)return{fieldPath:o.field.canonicalString(),increment:c.Ie};throw W()}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:Zb(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:W()}(n,e.precondition)),t}function dl(n,e){const t=e.currentDocument?function(s){return s.updateTime!==void 0?nt.updateTime(Je(s.updateTime)):s.exists!==void 0?nt.exists(s.exists):nt.none()}(e.currentDocument):nt.none(),r=e.updateTransforms?e.updateTransforms.map(i=>function(o,c){let l=null;if("setToServerValue"in c)Q(c.setToServerValue==="REQUEST_TIME"),l=new ys;else if("appendMissingElements"in c){const p=c.appendMissingElements.values||[];l=new Zr(p)}else if("removeAllFromArray"in c){const p=c.removeAllFromArray.values||[];l=new ei(p)}else"increment"in c?l=new ti(o,c.increment):W();const d=Te.fromServerFormat(c.fieldPath);return new og(d,l)}(n,i)):[];if(e.update){e.update.name;const i=Yn(n,e.update.name),s=new ze({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(l){const d=l.fieldPaths||[];return new tt(d.map(p=>Te.fromServerFormat(p)))}(e.updateMask);return new Ht(i,s,o,t,r)}return new mi(i,s,t,r)}if(e.delete){const i=Yn(n,e.delete);return new Zl(i,t)}if(e.verify){const i=Yn(n,e.verify);return new lg(i,t)}return W()}function nT(n,e){return n&&n.length>0?(Q(e!==void 0),n.map(t=>function(i,s){let o=i.updateTime?Je(i.updateTime):Je(s);return o.isEqual(Y.min())&&(o=Je(s)),new jb(o,i.transformResults||[])}(t,e))):[]}function yg(n,e){return{documents:[mg(n,e.path)]}}function vg(n,e){const t={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=mg(n,i);const s=function(d){if(d.length!==0)return Eg(ge.create(d,"and"))}(e.filters);s&&(t.structuredQuery.where=s);const o=function(d){if(d.length!==0)return d.map(p=>function(w){return{field:Cr(w.field),direction:iT(w.dir)}}(p))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=cl(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{ht:t,parent:i}}function Ig(n){let e=gg(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let i=null;if(r>0){Q(r===1);const p=t.from[0];p.allDescendants?i=p.collectionId:e=e.child(p.collectionId)}let s=[];t.where&&(s=function(m){const w=wg(m);return w instanceof ge&&Yl(w)?w.getFilters():[w]}(t.where));let o=[];t.orderBy&&(o=function(m){return m.map(w=>function(C){return new _s(kr(C.field),function(P){switch(P){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(C.direction))}(w))}(t.orderBy));let c=null;t.limit&&(c=function(m){let w;return w=typeof m=="object"?m.value:m,Ra(w)?null:w}(t.limit));let l=null;t.startAt&&(l=function(m){const w=!!m.before,A=m.values||[];return new En(A,w)}(t.startAt));let d=null;return t.endAt&&(d=function(m){const w=!m.before,A=m.values||[];return new En(A,w)}(t.endAt)),kb(e,i,o,s,c,"F",l,d)}function rT(n,e){const t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return W()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function wg(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=kr(t.unaryFilter.field);return ce.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=kr(t.unaryFilter.field);return ce.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=kr(t.unaryFilter.field);return ce.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=kr(t.unaryFilter.field);return ce.create(o,"!=",{nullValue:"NULL_VALUE"});default:return W()}}(n):n.fieldFilter!==void 0?function(t){return ce.create(kr(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return W()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return ge.create(t.compositeFilter.filters.map(r=>wg(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return W()}}(t.compositeFilter.op))}(n):W()}function iT(n){return Qb[n]}function sT(n){return Yb[n]}function oT(n){return Jb[n]}function Cr(n){return{fieldPath:n.canonicalString()}}function kr(n){return Te.fromServerFormat(n.fieldPath)}function Eg(n){return n instanceof ce?function(t){if(t.op==="=="){if($h(t.value))return{unaryFilter:{field:Cr(t.field),op:"IS_NAN"}};if(Bh(t.value))return{unaryFilter:{field:Cr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if($h(t.value))return{unaryFilter:{field:Cr(t.field),op:"IS_NOT_NAN"}};if(Bh(t.value))return{unaryFilter:{field:Cr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Cr(t.field),op:sT(t.op),value:t.value}}}(n):n instanceof ge?function(t){const r=t.getFilters().map(i=>Eg(i));return r.length===1?r[0]:{compositeFilter:{op:oT(t.op),filters:r}}}(n):W()}function aT(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function bg(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(e,t,r,i,s=Y.min(),o=Y.min(),c=De.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new Bt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Bt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Bt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Bt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tg{constructor(e){this.Tt=e}}function cT(n,e){let t;if(e.document)t=eT(n.Tt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const r=G.fromSegments(e.noDocument.path),i=ir(e.noDocument.readTime);t=Pe.newNoDocument(r,i),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return W();{const r=G.fromSegments(e.unknownDocument.path),i=ir(e.unknownDocument.version);t=Pe.newUnknownDocument(r,i)}}return e.readTime&&t.setReadTime(function(i){const s=new Ae(i[0],i[1]);return Y.fromTimestamp(s)}(e.readTime)),t}function sf(n,e){const t=e.key,r={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:na(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=function(s,o){return{name:ea(s,o.key),fields:o.data.value.mapValue.fields,updateTime:ni(s,o.version.toTimestamp()),createTime:ni(s,o.createTime.toTimestamp())}}(n.Tt,e);else if(e.isNoDocument())r.noDocument={path:t.path.toArray(),readTime:rr(e.version)};else{if(!e.isUnknownDocument())return W();r.unknownDocument={path:t.path.toArray(),version:rr(e.version)}}return r}function na(n){const e=n.toTimestamp();return[e.seconds,e.nanoseconds]}function rr(n){const e=n.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function ir(n){const e=new Ae(n.seconds,n.nanoseconds);return Y.fromTimestamp(e)}function $n(n,e){const t=(e.baseMutations||[]).map(s=>dl(n.Tt,s));for(let s=0;s<e.mutations.length-1;++s){const o=e.mutations[s];if(s+1<e.mutations.length&&e.mutations[s+1].transform!==void 0){const c=e.mutations[s+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(s+1,1),++s}}const r=e.mutations.map(s=>dl(n.Tt,s)),i=Ae.fromMillis(e.localWriteTimeMs);return new eu(e.batchId,i,t,r)}function zi(n){const e=ir(n.readTime),t=n.lastLimboFreeSnapshotVersion!==void 0?ir(n.lastLimboFreeSnapshotVersion):Y.min();let r;return r=function(s){return s.documents!==void 0}(n.query)?function(s){return Q(s.documents.length===1),ht(Ds(gg(s.documents[0])))}(n.query):function(s){return ht(Ig(s))}(n.query),new Bt(r,n.targetId,"TargetPurposeListen",n.lastListenSequenceNumber,e,t,De.fromBase64String(n.resumeToken))}function Ag(n,e){const t=rr(e.snapshotVersion),r=rr(e.lastLimboFreeSnapshotVersion);let i;i=Jo(e.target)?yg(n.Tt,e.target):vg(n.Tt,e.target).ht;const s=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:nr(e.target),readTime:t,resumeToken:s,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:i}}function Rg(n){const e=Ig({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Zo(e,e.limit,"L"):e}function Sc(n,e){return new nu(e.largestBatchId,dl(n.Tt,e.overlayMutation))}function of(n,e){const t=e.path.lastSegment();return[n,Ge(e.path.popLast()),t]}function af(n,e,t,r){return{indexId:n,uid:e,sequenceNumber:t,readTime:rr(r.readTime),documentKey:Ge(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lT{getBundleMetadata(e,t){return cf(e).get(t).next(r=>{if(r)return function(s){return{id:s.bundleId,createTime:ir(s.createTime),version:s.version}}(r)})}saveBundleMetadata(e,t){return cf(e).put(function(i){return{bundleId:i.id,createTime:rr(Je(i.createTime)),version:i.version}}(t))}getNamedQuery(e,t){return lf(e).get(t).next(r=>{if(r)return function(s){return{name:s.name,query:Rg(s.bundledQuery),readTime:ir(s.readTime)}}(r)})}saveNamedQuery(e,t){return lf(e).put(function(i){return{name:i.name,readTime:rr(Je(i.readTime)),bundledQuery:i.bundledQuery}}(t))}}function cf(n){return Oe(n,Sa)}function lf(n){return Oe(n,Pa)}/**
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
 */class Ma{constructor(e,t){this.serializer=e,this.userId=t}static It(e,t){const r=t.uid||"";return new Ma(e,r)}getOverlay(e,t){return xi(e).get(of(this.userId,t)).next(r=>r?Sc(this.serializer,r):null)}getOverlays(e,t){const r=bt();return R.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){const i=[];return r.forEach((s,o)=>{const c=new nu(t,o);i.push(this.Et(e,c))}),R.waitFor(i)}removeOverlaysForBatchId(e,t,r){const i=new Set;t.forEach(o=>i.add(Ge(o.getCollectionPath())));const s=[];return i.forEach(o=>{const c=IDBKeyRange.bound([this.userId,o,r],[this.userId,o,r+1],!1,!0);s.push(xi(e).J(el,c))}),R.waitFor(s)}getOverlaysForCollection(e,t,r){const i=bt(),s=Ge(t),o=IDBKeyRange.bound([this.userId,s,r],[this.userId,s,Number.POSITIVE_INFINITY],!0);return xi(e).G(el,o).next(c=>{for(const l of c){const d=Sc(this.serializer,l);i.set(d.getKey(),d)}return i})}getOverlaysForCollectionGroup(e,t,r,i){const s=bt();let o;const c=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return xi(e).Z({index:Pm,range:c},(l,d,p)=>{const m=Sc(this.serializer,d);s.size()<i||m.largestBatchId===o?(s.set(m.getKey(),m),o=m.largestBatchId):p.done()}).next(()=>s)}Et(e,t){return xi(e).put(function(i,s,o){const[c,l,d]=of(s,o.mutation.key);return{userId:s,collectionPath:l,documentId:d,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:ta(i.Tt,o.mutation)}}(this.serializer,this.userId,t))}}function xi(n){return Oe(n,Ca)}/**
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
 */class uT{dt(e){return Oe(e,Kl)}getSessionToken(e){return this.dt(e).get("sessionToken").next(t=>{const r=t?.value;return r?De.fromUint8Array(r):De.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.dt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
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
 */class jn{constructor(){}At(e,t){this.Rt(e,t),t.Vt()}Rt(e,t){if("nullValue"in e)this.ft(t,5);else if("booleanValue"in e)this.ft(t,10),t.gt(e.booleanValue?1:0);else if("integerValue"in e)this.ft(t,15),t.gt(Ee(e.integerValue));else if("doubleValue"in e){const r=Ee(e.doubleValue);isNaN(r)?this.ft(t,13):(this.ft(t,15),us(r)?t.gt(0):t.gt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.ft(t,20),typeof r=="string"&&(r=zt(r)),t.yt(`${r.seconds||""}`),t.gt(r.nanos||0)}else if("stringValue"in e)this.wt(e.stringValue,t),this.St(t);else if("bytesValue"in e)this.ft(t,30),t.bt(Gt(e.bytesValue)),this.St(t);else if("referenceValue"in e)this.Dt(e.referenceValue,t);else if("geoPointValue"in e){const r=e.geoPointValue;this.ft(t,45),t.gt(r.latitude||0),t.gt(r.longitude||0)}else"mapValue"in e?Um(e)?this.ft(t,Number.MAX_SAFE_INTEGER):Na(e)?this.vt(e.mapValue,t):(this.Ct(e.mapValue,t),this.St(t)):"arrayValue"in e?(this.Ft(e.arrayValue,t),this.St(t)):W()}wt(e,t){this.ft(t,25),this.Mt(e,t)}Mt(e,t){t.yt(e)}Ct(e,t){const r=e.fields||{};this.ft(t,55);for(const i of Object.keys(r))this.wt(i,t),this.Rt(r[i],t)}vt(e,t){var r,i;const s=e.fields||{};this.ft(t,53);const o=Yr,c=((i=(r=s[o].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.length)||0;this.ft(t,15),t.gt(Ee(c)),this.wt(o,t),this.Rt(s[o],t)}Ft(e,t){const r=e.values||[];this.ft(t,50);for(const i of r)this.Rt(i,t)}Dt(e,t){this.ft(t,37),G.fromName(e).path.forEach(r=>{this.ft(t,60),this.Mt(r,t)})}ft(e,t){e.gt(t)}St(e){e.gt(2)}}jn.xt=new jn;/**
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
 */const br=255;function dT(n){if(n===0)return 8;let e=0;return n>>4||(e+=4,n<<=4),n>>6||(e+=2,n<<=2),n>>7||(e+=1),e}function uf(n){const e=64-function(r){let i=0;for(let s=0;s<8;++s){const o=dT(255&r[s]);if(i+=o,o!==8)break}return i}(n);return Math.ceil(e/8)}class hT{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ot(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Nt(r.value),r=t.next();this.Bt()}Lt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.kt(r.value),r=t.next();this.qt()}Qt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Nt(r);else if(r<2048)this.Nt(960|r>>>6),this.Nt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Nt(480|r>>>12),this.Nt(128|63&r>>>6),this.Nt(128|63&r);else{const i=t.codePointAt(0);this.Nt(240|i>>>18),this.Nt(128|63&i>>>12),this.Nt(128|63&i>>>6),this.Nt(128|63&i)}}this.Bt()}$t(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.kt(r);else if(r<2048)this.kt(960|r>>>6),this.kt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.kt(480|r>>>12),this.kt(128|63&r>>>6),this.kt(128|63&r);else{const i=t.codePointAt(0);this.kt(240|i>>>18),this.kt(128|63&i>>>12),this.kt(128|63&i>>>6),this.kt(128|63&i)}}this.qt()}Ut(e){const t=this.Kt(e),r=uf(t);this.Wt(1+r),this.buffer[this.position++]=255&r;for(let i=t.length-r;i<t.length;++i)this.buffer[this.position++]=255&t[i]}Gt(e){const t=this.Kt(e),r=uf(t);this.Wt(1+r),this.buffer[this.position++]=~(255&r);for(let i=t.length-r;i<t.length;++i)this.buffer[this.position++]=~(255&t[i])}zt(){this.jt(br),this.jt(255)}Ht(){this.Jt(br),this.Jt(255)}reset(){this.position=0}seed(e){this.Wt(e.length),this.buffer.set(e,this.position),this.position+=e.length}Yt(){return this.buffer.slice(0,this.position)}Kt(e){const t=function(s){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,s,!1),new Uint8Array(o.buffer)}(e),r=!!(128&t[0]);t[0]^=r?255:128;for(let i=1;i<t.length;++i)t[i]^=r?255:0;return t}Nt(e){const t=255&e;t===0?(this.jt(0),this.jt(255)):t===br?(this.jt(br),this.jt(0)):this.jt(t)}kt(e){const t=255&e;t===0?(this.Jt(0),this.Jt(255)):t===br?(this.Jt(br),this.Jt(0)):this.Jt(e)}Bt(){this.jt(0),this.jt(1)}qt(){this.Jt(0),this.Jt(1)}jt(e){this.Wt(1),this.buffer[this.position++]=e}Jt(e){this.Wt(1),this.buffer[this.position++]=~e}Wt(e){const t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);const i=new Uint8Array(r);i.set(this.buffer),this.buffer=i}}class fT{constructor(e){this.Zt=e}bt(e){this.Zt.Ot(e)}yt(e){this.Zt.Qt(e)}gt(e){this.Zt.Ut(e)}Vt(){this.Zt.zt()}}class pT{constructor(e){this.Zt=e}bt(e){this.Zt.Lt(e)}yt(e){this.Zt.$t(e)}gt(e){this.Zt.Gt(e)}Vt(){this.Zt.Ht()}}class Vi{constructor(){this.Zt=new hT,this.Xt=new fT(this.Zt),this.en=new pT(this.Zt)}seed(e){this.Zt.seed(e)}tn(e){return e===0?this.Xt:this.en}Yt(){return this.Zt.Yt()}reset(){this.Zt.reset()}}/**
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
 */class qn{constructor(e,t,r,i){this.indexId=e,this.documentKey=t,this.arrayValue=r,this.directionalValue=i}nn(){const e=this.directionalValue.length,t=e===0||this.directionalValue[e-1]===255?e+1:e,r=new Uint8Array(t);return r.set(this.directionalValue,0),t!==e?r.set([0],this.directionalValue.length):++r[r.length-1],new qn(this.indexId,this.documentKey,this.arrayValue,r)}}function tn(n,e){let t=n.indexId-e.indexId;return t!==0?t:(t=df(n.arrayValue,e.arrayValue),t!==0?t:(t=df(n.directionalValue,e.directionalValue),t!==0?t:G.comparator(n.documentKey,e.documentKey)))}function df(n,e){for(let t=0;t<n.length&&t<e.length;++t){const r=n[t]-e[t];if(r!==0)return r}return n.length-e.length}/**
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
 */class hf{constructor(e){this.rn=new _e((t,r)=>Te.comparator(t.field,r.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.sn=e.orderBy,this._n=[];for(const t of e.filters){const r=t;r.isInequality()?this.rn=this.rn.add(r):this._n.push(r)}}get an(){return this.rn.size>1}un(e){if(Q(e.collectionGroup===this.collectionId),this.an)return!1;const t=Jc(e);if(t!==void 0&&!this.cn(t))return!1;const r=Fn(e);let i=new Set,s=0,o=0;for(;s<r.length&&this.cn(r[s]);++s)i=i.add(r[s].fieldPath.canonicalString());if(s===r.length)return!0;if(this.rn.size>0){const c=this.rn.getIterator().getNext();if(!i.has(c.field.canonicalString())){const l=r[s];if(!this.ln(c,l)||!this.hn(this.sn[o++],l))return!1}++s}for(;s<r.length;++s){const c=r[s];if(o>=this.sn.length||!this.hn(this.sn[o++],c))return!1}return!0}Pn(){if(this.an)return null;let e=new _e(Te.comparator);const t=[];for(const r of this._n)if(!r.field.isKeyField())if(r.op==="array-contains"||r.op==="array-contains-any")t.push(new To(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),t.push(new To(r.field,0))}for(const r of this.sn)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),t.push(new To(r.field,r.dir==="asc"?0:1)));return new zo(zo.UNKNOWN_ID,this.collectionId,t,ls.empty())}cn(e){for(const t of this._n)if(this.ln(t,e))return!0;return!1}ln(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const r=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===r}hn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
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
 */function Sg(n){var e,t;if(Q(n instanceof ce||n instanceof ge),n instanceof ce){if(n instanceof Wm){const i=((t=(e=n.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map(s=>ce.create(n.field,"==",s)))||[];return ge.create(i,"or")}return n}const r=n.filters.map(i=>Sg(i));return ge.create(r,n.op)}function mT(n){if(n.getFilters().length===0)return[];const e=pl(Sg(n));return Q(Pg(e)),hl(e)||fl(e)?[e]:e.getFilters()}function hl(n){return n instanceof ce}function fl(n){return n instanceof ge&&Yl(n)}function Pg(n){return hl(n)||fl(n)||function(t){if(t instanceof ge&&il(t)){for(const r of t.getFilters())if(!hl(r)&&!fl(r))return!1;return!0}return!1}(n)}function pl(n){if(Q(n instanceof ce||n instanceof ge),n instanceof ce)return n;if(n.filters.length===1)return pl(n.filters[0]);const e=n.filters.map(r=>pl(r));let t=ge.create(e,n.op);return t=ra(t),Pg(t)?t:(Q(t instanceof ge),Q(Xr(t)),Q(t.filters.length>1),t.filters.reduce((r,i)=>su(r,i)))}function su(n,e){let t;return Q(n instanceof ce||n instanceof ge),Q(e instanceof ce||e instanceof ge),t=n instanceof ce?e instanceof ce?function(i,s){return ge.create([i,s],"and")}(n,e):ff(n,e):e instanceof ce?ff(e,n):function(i,s){if(Q(i.filters.length>0&&s.filters.length>0),Xr(i)&&Xr(s))return Gm(i,s.getFilters());const o=il(i)?i:s,c=il(i)?s:i,l=o.filters.map(d=>su(d,c));return ge.create(l,"or")}(n,e),ra(t)}function ff(n,e){if(Xr(e))return Gm(e,n.getFilters());{const t=e.filters.map(r=>su(n,r));return ge.create(t,"or")}}function ra(n){if(Q(n instanceof ce||n instanceof ge),n instanceof ce)return n;const e=n.getFilters();if(e.length===1)return ra(e[0]);if(qm(n))return n;const t=e.map(i=>ra(i)),r=[];return t.forEach(i=>{i instanceof ce?r.push(i):i instanceof ge&&(i.op===n.op?r.push(...i.filters):r.push(i))}),r.length===1?r[0]:ge.create(r,n.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gT{constructor(){this.Tn=new ou}addToCollectionParentIndex(e,t){return this.Tn.add(t),R.resolve()}getCollectionParents(e,t){return R.resolve(this.Tn.getEntries(t))}addFieldIndex(e,t){return R.resolve()}deleteFieldIndex(e,t){return R.resolve()}deleteAllFieldIndexes(e){return R.resolve()}createTargetIndexes(e,t){return R.resolve()}getDocumentsMatchingTarget(e,t){return R.resolve(null)}getIndexType(e,t){return R.resolve(0)}getFieldIndexes(e,t){return R.resolve([])}getNextCollectionGroupToUpdate(e){return R.resolve(null)}getMinOffset(e,t){return R.resolve(ct.min())}getMinOffsetFromCollectionGroup(e,t){return R.resolve(ct.min())}updateCollectionGroup(e,t,r){return R.resolve()}updateIndexEntries(e,t){return R.resolve()}}class ou{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new _e(fe.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new _e(fe.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pf="IndexedDbIndexManager",ao=new Uint8Array(0);class _T{constructor(e,t){this.databaseId=t,this.In=new ou,this.En=new Kt(r=>nr(r),(r,i)=>ks(r,i)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.In.has(t)){const r=t.lastSegment(),i=t.popLast();e.addOnCommittedListener(()=>{this.In.add(t)});const s={collectionId:r,parent:Ge(i)};return mf(e).put(s)}return R.resolve()}getCollectionParents(e,t){const r=[],i=IDBKeyRange.bound([t,""],[ym(t),""],!1,!0);return mf(e).G(i).next(s=>{for(const o of s){if(o.collectionId!==t)break;r.push(Et(o.parent))}return r})}addFieldIndex(e,t){const r=Oi(e),i=function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map(l=>[l.fieldPath.canonicalString(),l.kind])}}(t);delete i.indexId;const s=r.add(i);if(t.indexState){const o=Ar(e);return s.next(c=>{o.put(af(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return s.next()}deleteFieldIndex(e,t){const r=Oi(e),i=Ar(e),s=Tr(e);return r.delete(t.indexId).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=Oi(e),r=Tr(e),i=Ar(e);return t.J().next(()=>r.J()).next(()=>i.J())}createTargetIndexes(e,t){return R.forEach(this.dn(t),r=>this.getIndexType(e,r).next(i=>{if(i===0||i===1){const s=new hf(r).Pn();if(s!=null)return this.addFieldIndex(e,s)}}))}getDocumentsMatchingTarget(e,t){const r=Tr(e);let i=!0;const s=new Map;return R.forEach(this.dn(t),o=>this.An(e,o).next(c=>{i&&(i=!!c),s.set(o,c)})).next(()=>{if(i){let o=se();const c=[];return R.forEach(s,(l,d)=>{M(pf,`Using index ${function(L){return`id=${L.indexId}|cg=${L.collectionGroup}|f=${L.fields.map(q=>`${q.fieldPath}:${q.kind}`).join(",")}`}(l)} to execute ${nr(t)}`);const p=function(L,q){const V=Jc(q);if(V===void 0)return null;for(const F of Xo(L,V.fieldPath))switch(F.op){case"array-contains-any":return F.value.arrayValue.values||[];case"array-contains":return[F.value]}return null}(d,l),m=function(L,q){const V=new Map;for(const F of Fn(q))for(const T of Xo(L,F.fieldPath))switch(T.op){case"==":case"in":V.set(F.fieldPath.canonicalString(),T.value);break;case"not-in":case"!=":return V.set(F.fieldPath.canonicalString(),T.value),Array.from(V.values())}return null}(d,l),w=function(L,q){const V=[];let F=!0;for(const T of Fn(q)){const E=T.kind===0?Kh(L,T.fieldPath,L.startAt):Hh(L,T.fieldPath,L.startAt);V.push(E.value),F&&(F=E.inclusive)}return new En(V,F)}(d,l),A=function(L,q){const V=[];let F=!0;for(const T of Fn(q)){const E=T.kind===0?Hh(L,T.fieldPath,L.endAt):Kh(L,T.fieldPath,L.endAt);V.push(E.value),F&&(F=E.inclusive)}return new En(V,F)}(d,l),C=this.Rn(l,d,w),k=this.Rn(l,d,A),P=this.Vn(l,d,m),B=this.mn(l.indexId,p,C,w.inclusive,k,A.inclusive,P);return R.forEach(B,D=>r.H(D,t.limit).next(L=>{L.forEach(q=>{const V=G.fromSegments(q.documentKey);o.has(V)||(o=o.add(V),c.push(V))})}))}).next(()=>c)}return R.resolve(null)})}dn(e){let t=this.En.get(e);return t||(e.filters.length===0?t=[e]:t=mT(ge.create(e.filters,"and")).map(r=>ol(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt)),this.En.set(e,t),t)}mn(e,t,r,i,s,o,c){const l=(t!=null?t.length:1)*Math.max(r.length,s.length),d=l/(t!=null?t.length:1),p=[];for(let m=0;m<l;++m){const w=t?this.fn(t[m/d]):ao,A=this.gn(e,w,r[m%d],i),C=this.pn(e,w,s[m%d],o),k=c.map(P=>this.gn(e,w,P,!0));p.push(...this.createRange(A,C,k))}return p}gn(e,t,r,i){const s=new qn(e,G.empty(),t,r);return i?s:s.nn()}pn(e,t,r,i){const s=new qn(e,G.empty(),t,r);return i?s.nn():s}An(e,t){const r=new hf(t),i=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,i).next(s=>{let o=null;for(const c of s)r.un(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o})}getIndexType(e,t){let r=2;const i=this.dn(t);return R.forEach(i,s=>this.An(e,s).next(o=>{o?r!==0&&o.fields.length<function(l){let d=new _e(Te.comparator),p=!1;for(const m of l.filters)for(const w of m.getFlattenedFilters())w.field.isKeyField()||(w.op==="array-contains"||w.op==="array-contains-any"?p=!0:d=d.add(w.field));for(const m of l.orderBy)m.field.isKeyField()||(d=d.add(m.field));return d.size+(p?1:0)}(s)&&(r=1):r=0})).next(()=>function(o){return o.limit!==null}(t)&&i.length>1&&r===2?1:r)}yn(e,t){const r=new Vi;for(const i of Fn(e)){const s=t.data.field(i.fieldPath);if(s==null)return null;const o=r.tn(i.kind);jn.xt.At(s,o)}return r.Yt()}fn(e){const t=new Vi;return jn.xt.At(e,t.tn(0)),t.Yt()}wn(e,t){const r=new Vi;return jn.xt.At(tr(this.databaseId,t),r.tn(function(s){const o=Fn(s);return o.length===0?0:o[o.length-1].kind}(e))),r.Yt()}Vn(e,t,r){if(r===null)return[];let i=[];i.push(new Vi);let s=0;for(const o of Fn(e)){const c=r[s++];for(const l of i)if(this.Sn(t,o.fieldPath)&&gs(c))i=this.bn(i,o,c);else{const d=l.tn(o.kind);jn.xt.At(c,d)}}return this.Dn(i)}Rn(e,t,r){return this.Vn(e,t,r.position)}Dn(e){const t=[];for(let r=0;r<e.length;++r)t[r]=e[r].Yt();return t}bn(e,t,r){const i=[...e],s=[];for(const o of r.arrayValue.values||[])for(const c of i){const l=new Vi;l.seed(c.Yt()),jn.xt.At(o,l.tn(t.kind)),s.push(l)}return s}Sn(e,t){return!!e.filters.find(r=>r instanceof ce&&r.field.isEqual(t)&&(r.op==="in"||r.op==="not-in"))}getFieldIndexes(e,t){const r=Oi(e),i=Ar(e);return(t?r.G(Zc,IDBKeyRange.bound(t,t)):r.G()).next(s=>{const o=[];return R.forEach(s,c=>i.get([c.indexId,this.uid]).next(l=>{o.push(function(p,m){const w=m?new ls(m.sequenceNumber,new ct(ir(m.readTime),new G(Et(m.documentKey)),m.largestBatchId)):ls.empty(),A=p.fields.map(([C,k])=>new To(Te.fromServerFormat(C),k));return new zo(p.indexId,p.collectionGroup,A,w)}(c,l))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((r,i)=>{const s=r.indexState.sequenceNumber-i.indexState.sequenceNumber;return s!==0?s:te(r.collectionGroup,i.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,r){const i=Oi(e),s=Ar(e);return this.vn(e).next(o=>i.G(Zc,IDBKeyRange.bound(t,t)).next(c=>R.forEach(c,l=>s.put(af(l.indexId,this.uid,o,r)))))}updateIndexEntries(e,t){const r=new Map;return R.forEach(t,(i,s)=>{const o=r.get(i.collectionGroup);return(o?R.resolve(o):this.getFieldIndexes(e,i.collectionGroup)).next(c=>(r.set(i.collectionGroup,c),R.forEach(c,l=>this.Cn(e,i,l).next(d=>{const p=this.Fn(s,l);return d.isEqual(p)?R.resolve():this.Mn(e,s,l,d,p)}))))})}xn(e,t,r,i){return Tr(e).put({indexId:i.indexId,uid:this.uid,arrayValue:i.arrayValue,directionalValue:i.directionalValue,orderedDocumentKey:this.wn(r,t.key),documentKey:t.key.path.toArray()})}On(e,t,r,i){return Tr(e).delete([i.indexId,this.uid,i.arrayValue,i.directionalValue,this.wn(r,t.key),t.key.path.toArray()])}Cn(e,t,r){const i=Tr(e);let s=new _e(tn);return i.Z({index:Sm,range:IDBKeyRange.only([r.indexId,this.uid,this.wn(r,t)])},(o,c)=>{s=s.add(new qn(r.indexId,t,c.arrayValue,c.directionalValue))}).next(()=>s)}Fn(e,t){let r=new _e(tn);const i=this.yn(t,e);if(i==null)return r;const s=Jc(t);if(s!=null){const o=e.data.field(s.fieldPath);if(gs(o))for(const c of o.arrayValue.values||[])r=r.add(new qn(t.indexId,e.key,this.fn(c),i))}else r=r.add(new qn(t.indexId,e.key,ao,i));return r}Mn(e,t,r,i,s){M(pf,"Updating index entries for document '%s'",t.key);const o=[];return function(l,d,p,m,w){const A=l.getIterator(),C=d.getIterator();let k=Er(A),P=Er(C);for(;k||P;){let B=!1,D=!1;if(k&&P){const L=p(k,P);L<0?D=!0:L>0&&(B=!0)}else k!=null?D=!0:B=!0;B?(m(P),P=Er(C)):D?(w(k),k=Er(A)):(k=Er(A),P=Er(C))}}(i,s,tn,c=>{o.push(this.xn(e,t,r,c))},c=>{o.push(this.On(e,t,r,c))}),R.waitFor(o)}vn(e){let t=1;return Ar(e).Z({index:Rm,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(r,i,s)=>{s.done(),t=i.sequenceNumber+1}).next(()=>t)}createRange(e,t,r){r=r.sort((o,c)=>tn(o,c)).filter((o,c,l)=>!c||tn(o,l[c-1])!==0);const i=[];i.push(e);for(const o of r){const c=tn(o,e),l=tn(o,t);if(c===0)i[0]=e.nn();else if(c>0&&l<0)i.push(o),i.push(o.nn());else if(l>0)break}i.push(t);const s=[];for(let o=0;o<i.length;o+=2){if(this.Nn(i[o],i[o+1]))return[];const c=[i[o].indexId,this.uid,i[o].arrayValue,i[o].directionalValue,ao,[]],l=[i[o+1].indexId,this.uid,i[o+1].arrayValue,i[o+1].directionalValue,ao,[]];s.push(IDBKeyRange.bound(c,l))}return s}Nn(e,t){return tn(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(gf)}getMinOffset(e,t){return R.mapArray(this.dn(t),r=>this.An(e,r).next(i=>i||W())).next(gf)}}function mf(n){return Oe(n,fs)}function Tr(n){return Oe(n,Qo)}function Oi(n){return Oe(n,Gl)}function Ar(n){return Oe(n,Wo)}function gf(n){Q(n.length!==0);let e=n[0].indexState.offset,t=e.largestBatchId;for(let r=1;r<n.length;r++){const i=n[r].indexState.offset;jl(i,e)<0&&(e=i),t<i.largestBatchId&&(t=i.largestBatchId)}return new ct(e.readTime,e.documentKey,t)}/**
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
 */const _f={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Cg=41943040;class qe{static withCacheSize(e){return new qe(e,qe.DEFAULT_COLLECTION_PERCENTILE,qe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kg(n,e,t){const r=n.store(gt),i=n.store(Kr),s=[],o=IDBKeyRange.only(t.batchId);let c=0;const l=r.Z({range:o},(p,m,w)=>(c++,w.delete()));s.push(l.next(()=>{Q(c===1)}));const d=[];for(const p of t.mutations){const m=bm(e,p.key.path,t.batchId);s.push(i.delete(m)),d.push(p.key)}return R.waitFor(s).next(()=>d)}function ia(n){if(!n)return 0;let e;if(n.document)e=n.document;else if(n.unknownDocument)e=n.unknownDocument;else{if(!n.noDocument)throw W();e=n.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */qe.DEFAULT_COLLECTION_PERCENTILE=10,qe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,qe.DEFAULT=new qe(Cg,qe.DEFAULT_COLLECTION_PERCENTILE,qe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),qe.DISABLED=new qe(-1,0,0);class Fa{constructor(e,t,r,i){this.userId=e,this.serializer=t,this.indexManager=r,this.referenceDelegate=i,this.Bn={}}static It(e,t,r,i){Q(e.uid!=="");const s=e.isAuthenticated()?e.uid:"";return new Fa(s,t,r,i)}checkEmpty(e){let t=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return nn(e).Z({index:zn,range:r},(i,s,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,r,i){const s=Dr(e),o=nn(e);return o.add({}).next(c=>{Q(typeof c=="number");const l=new eu(c,t,r,i),d=function(A,C,k){const P=k.baseMutations.map(D=>ta(A.Tt,D)),B=k.mutations.map(D=>ta(A.Tt,D));return{userId:C,batchId:k.batchId,localWriteTimeMs:k.localWriteTime.toMillis(),baseMutations:P,mutations:B}}(this.serializer,this.userId,l),p=[];let m=new _e((w,A)=>te(w.canonicalString(),A.canonicalString()));for(const w of i){const A=bm(this.userId,w.key.path,c);m=m.add(w.key.path.popLast()),p.push(o.put(d)),p.push(s.put(A,WE))}return m.forEach(w=>{p.push(this.indexManager.addToCollectionParentIndex(e,w))}),e.addOnCommittedListener(()=>{this.Bn[c]=l.keys()}),R.waitFor(p).next(()=>l)})}lookupMutationBatch(e,t){return nn(e).get(t).next(r=>r?(Q(r.userId===this.userId),$n(this.serializer,r)):null)}Ln(e,t){return this.Bn[t]?R.resolve(this.Bn[t]):this.lookupMutationBatch(e,t).next(r=>{if(r){const i=r.keys();return this.Bn[t]=i,i}return null})}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=IDBKeyRange.lowerBound([this.userId,r]);let s=null;return nn(e).Z({index:zn,range:i},(o,c,l)=>{c.userId===this.userId&&(Q(c.batchId>=r),s=$n(this.serializer,c)),l.done()}).next(()=>s)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=Wn;return nn(e).Z({index:zn,range:t,reverse:!0},(i,s,o)=>{r=s.batchId,o.done()}).next(()=>r)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,Wn],[this.userId,Number.POSITIVE_INFINITY]);return nn(e).G(zn,t).next(r=>r.map(i=>$n(this.serializer,i)))}getAllMutationBatchesAffectingDocumentKey(e,t){const r=Ao(this.userId,t.path),i=IDBKeyRange.lowerBound(r),s=[];return Dr(e).Z({range:i},(o,c,l)=>{const[d,p,m]=o,w=Et(p);if(d===this.userId&&t.path.isEqual(w))return nn(e).get(m).next(A=>{if(!A)throw W();Q(A.userId===this.userId),s.push($n(this.serializer,A))});l.done()}).next(()=>s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new _e(te);const i=[];return t.forEach(s=>{const o=Ao(this.userId,s.path),c=IDBKeyRange.lowerBound(o),l=Dr(e).Z({range:c},(d,p,m)=>{const[w,A,C]=d,k=Et(A);w===this.userId&&s.path.isEqual(k)?r=r.add(C):m.done()});i.push(l)}),R.waitFor(i).next(()=>this.kn(e,r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1,s=Ao(this.userId,r),o=IDBKeyRange.lowerBound(s);let c=new _e(te);return Dr(e).Z({range:o},(l,d,p)=>{const[m,w,A]=l,C=Et(w);m===this.userId&&r.isPrefixOf(C)?C.length===i&&(c=c.add(A)):p.done()}).next(()=>this.kn(e,c))}kn(e,t){const r=[],i=[];return t.forEach(s=>{i.push(nn(e).get(s).next(o=>{if(o===null)throw W();Q(o.userId===this.userId),r.push($n(this.serializer,o))}))}),R.waitFor(i).next(()=>r)}removeMutationBatch(e,t){return kg(e.ue,this.userId,t).next(r=>(e.addOnCommittedListener(()=>{this.qn(t.batchId)}),R.forEach(r,i=>this.referenceDelegate.markPotentiallyOrphaned(e,i))))}qn(e){delete this.Bn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return R.resolve();const r=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),i=[];return Dr(e).Z({range:r},(s,o,c)=>{if(s[0]===this.userId){const l=Et(s[1]);i.push(l)}else c.done()}).next(()=>{Q(i.length===0)})})}containsKey(e,t){return Dg(e,this.userId,t)}Qn(e){return Ng(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:Wn,lastStreamToken:""})}}function Dg(n,e,t){const r=Ao(e,t.path),i=r[1],s=IDBKeyRange.lowerBound(r);let o=!1;return Dr(n).Z({range:s,Y:!0},(c,l,d)=>{const[p,m,w]=c;p===e&&m===i&&(o=!0),d.done()}).next(()=>o)}function nn(n){return Oe(n,gt)}function Dr(n){return Oe(n,Kr)}function Ng(n){return Oe(n,ds)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sr{constructor(e){this.$n=e}next(){return this.$n+=2,this.$n}static Un(){return new sr(0)}static Kn(){return new sr(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yT{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.Wn(e).next(t=>{const r=new sr(t.highestTargetId);return t.highestTargetId=r.next(),this.Gn(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.Wn(e).next(t=>Y.fromTimestamp(new Ae(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.Wn(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,r){return this.Wn(e).next(i=>(i.highestListenSequenceNumber=t,r&&(i.lastRemoteSnapshotVersion=r.toTimestamp()),t>i.highestListenSequenceNumber&&(i.highestListenSequenceNumber=t),this.Gn(e,i)))}addTargetData(e,t){return this.zn(e,t).next(()=>this.Wn(e).next(r=>(r.targetCount+=1,this.jn(t,r),this.Gn(e,r))))}updateTargetData(e,t){return this.zn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>Rr(e).delete(t.targetId)).next(()=>this.Wn(e)).next(r=>(Q(r.targetCount>0),r.targetCount-=1,this.Gn(e,r)))}removeTargets(e,t,r){let i=0;const s=[];return Rr(e).Z((o,c)=>{const l=zi(c);l.sequenceNumber<=t&&r.get(l.targetId)===null&&(i++,s.push(this.removeTargetData(e,l)))}).next(()=>R.waitFor(s)).next(()=>i)}forEachTarget(e,t){return Rr(e).Z((r,i)=>{const s=zi(i);t(s)})}Wn(e){return yf(e).get(Ho).next(t=>(Q(t!==null),t))}Gn(e,t){return yf(e).put(Ho,t)}zn(e,t){return Rr(e).put(Ag(this.serializer,t))}jn(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.Wn(e).next(t=>t.targetCount)}getTargetData(e,t){const r=nr(t),i=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let s=null;return Rr(e).Z({range:i,index:Am},(o,c,l)=>{const d=zi(c);ks(t,d.target)&&(s=d,l.done())}).next(()=>s)}addMatchingKeys(e,t,r){const i=[],s=dn(e);return t.forEach(o=>{const c=Ge(o.path);i.push(s.put({targetId:r,path:c})),i.push(this.referenceDelegate.addReference(e,r,o))}),R.waitFor(i)}removeMatchingKeys(e,t,r){const i=dn(e);return R.forEach(t,s=>{const o=Ge(s.path);return R.waitFor([i.delete([r,o]),this.referenceDelegate.removeReference(e,r,s)])})}removeMatchingKeysForTargetId(e,t){const r=dn(e),i=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(i)}getMatchingKeysForTargetId(e,t){const r=IDBKeyRange.bound([t],[t+1],!1,!0),i=dn(e);let s=se();return i.Z({range:r,Y:!0},(o,c,l)=>{const d=Et(o[1]),p=new G(d);s=s.add(p)}).next(()=>s)}containsKey(e,t){const r=Ge(t.path),i=IDBKeyRange.bound([r],[ym(r)],!1,!0);let s=0;return dn(e).Z({index:zl,Y:!0,range:i},([o,c],l,d)=>{o!==0&&(s++,d.done())}).next(()=>s>0)}lt(e,t){return Rr(e).get(t).next(r=>r?zi(r):null)}}function Rr(n){return Oe(n,Hr)}function yf(n){return Oe(n,Qn)}function dn(n){return Oe(n,Wr)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vf="LruGarbageCollector",xg=1048576;function If([n,e],[t,r]){const i=te(n,t);return i===0?te(e,r):i}class vT{constructor(e){this.Hn=e,this.buffer=new _e(If),this.Jn=0}Yn(){return++this.Jn}Zn(e){const t=[e,this.Yn()];if(this.buffer.size<this.Hn)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();If(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Vg{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Xn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.er(6e4)}stop(){this.Xn&&(this.Xn.cancel(),this.Xn=null)}get started(){return this.Xn!==null}er(e){M(vf,`Garbage collection scheduled in ${e}ms`),this.Xn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Xn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Rn(t)?M(vf,"Ignoring IndexedDB error during garbage collection: ",t):await hr(t)}await this.er(3e5)})}}class IT{constructor(e,t){this.tr=e,this.params=t}calculateTargetCount(e,t){return this.tr.nr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return R.resolve(dt.ae);const r=new vT(t);return this.tr.forEachTarget(e,i=>r.Zn(i.sequenceNumber)).next(()=>this.tr.rr(e,i=>r.Zn(i))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.tr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.tr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(M("LruGarbageCollector","Garbage collection skipped; disabled"),R.resolve(_f)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(M("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),_f):this.ir(e,t))}getCacheSize(e){return this.tr.getCacheSize(e)}ir(e,t){let r,i,s,o,c,l,d;const p=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(m=>(m>this.params.maximumSequenceNumbersToCollect?(M("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),i=this.params.maximumSequenceNumbersToCollect):i=m,o=Date.now(),this.nthSequenceNumber(e,i))).next(m=>(r=m,c=Date.now(),this.removeTargets(e,r,t))).next(m=>(s=m,l=Date.now(),this.removeOrphanedDocuments(e,r))).next(m=>(d=Date.now(),Sr()<=ae.DEBUG&&M("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-p}ms
	Determined least recently used ${i} in `+(c-o)+`ms
	Removed ${s} targets in `+(l-c)+`ms
	Removed ${m} documents in `+(d-l)+`ms
Total Duration: ${d-p}ms`),R.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:m})))}}function Og(n,e){return new IT(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wT{constructor(e,t){this.db=e,this.garbageCollector=Og(this,t)}nr(e){const t=this.sr(e);return this.db.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}sr(e){let t=0;return this.rr(e,r=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}rr(e,t){return this._r(e,(r,i)=>t(i))}addReference(e,t,r){return co(e,r)}removeReference(e,t,r){return co(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return co(e,t)}ar(e,t){return function(i,s){let o=!1;return Ng(i).X(c=>Dg(i,c,s).next(l=>(l&&(o=!0),R.resolve(!l)))).next(()=>o)}(e,t)}removeOrphanedDocuments(e,t){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),i=[];let s=0;return this._r(e,(o,c)=>{if(c<=t){const l=this.ar(e,o).next(d=>{if(!d)return s++,r.getEntry(e,o).next(()=>(r.removeEntry(o,Y.min()),dn(e).delete(function(m){return[0,Ge(m.path)]}(o))))});i.push(l)}}).next(()=>R.waitFor(i)).next(()=>r.apply(e)).next(()=>s)}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return co(e,t)}_r(e,t){const r=dn(e);let i,s=dt.ae;return r.Z({index:zl},([o,c],{path:l,sequenceNumber:d})=>{o===0?(s!==dt.ae&&t(new G(Et(i)),s),s=d,i=l):s=dt.ae}).next(()=>{s!==dt.ae&&t(new G(Et(i)),s)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function co(n,e){return dn(n).put(function(r,i){return{targetId:0,path:Ge(r.path),sequenceNumber:i}}(e,n.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lg{constructor(){this.changes=new Kt(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Pe.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?R.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ET{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return On(e).put(r)}removeEntry(e,t,r){return On(e).delete(function(s,o){const c=s.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],na(o),c[c.length-1]]}(t,r))}updateMetadata(e,t){return this.getMetadata(e).next(r=>(r.byteSize+=t,this.ur(e,r)))}getEntry(e,t){let r=Pe.newInvalidDocument(t);return On(e).Z({index:Ro,range:IDBKeyRange.only(Li(t))},(i,s)=>{r=this.cr(t,s)}).next(()=>r)}lr(e,t){let r={size:0,document:Pe.newInvalidDocument(t)};return On(e).Z({index:Ro,range:IDBKeyRange.only(Li(t))},(i,s)=>{r={document:this.cr(t,s),size:ia(s)}}).next(()=>r)}getEntries(e,t){let r=at();return this.hr(e,t,(i,s)=>{const o=this.cr(i,s);r=r.insert(i,o)}).next(()=>r)}Pr(e,t){let r=at(),i=new be(G.comparator);return this.hr(e,t,(s,o)=>{const c=this.cr(s,o);r=r.insert(s,c),i=i.insert(s,ia(o))}).next(()=>({documents:r,Tr:i}))}hr(e,t,r){if(t.isEmpty())return R.resolve();let i=new _e(bf);t.forEach(l=>i=i.add(l));const s=IDBKeyRange.bound(Li(i.first()),Li(i.last())),o=i.getIterator();let c=o.getNext();return On(e).Z({index:Ro,range:s},(l,d,p)=>{const m=G.fromSegments([...d.prefixPath,d.collectionGroup,d.documentId]);for(;c&&bf(c,m)<0;)r(c,null),c=o.getNext();c&&c.isEqual(m)&&(r(c,d),c=o.hasNext()?o.getNext():null),c?p.W(Li(c)):p.done()}).next(()=>{for(;c;)r(c,null),c=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,r,i,s){const o=t.path,c=[o.popLast().toArray(),o.lastSegment(),na(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],l=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return On(e).G(IDBKeyRange.bound(c,l,!0)).next(d=>{s?.incrementDocumentReadCount(d.length);let p=at();for(const m of d){const w=this.cr(G.fromSegments(m.prefixPath.concat(m.collectionGroup,m.documentId)),m);w.isFoundDocument()&&(Ns(t,w)||i.has(w.key))&&(p=p.insert(w.key,w))}return p})}getAllFromCollectionGroup(e,t,r,i){let s=at();const o=Ef(t,r),c=Ef(t,ct.max());return On(e).Z({index:Tm,range:IDBKeyRange.bound(o,c,!0)},(l,d,p)=>{const m=this.cr(G.fromSegments(d.prefixPath.concat(d.collectionGroup,d.documentId)),d);s=s.insert(m.key,m),s.size===i&&p.done()}).next(()=>s)}newChangeBuffer(e){return new bT(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return wf(e).get(Xc).next(t=>(Q(!!t),t))}ur(e,t){return wf(e).put(Xc,t)}cr(e,t){if(t){const r=cT(this.serializer,t);if(!(r.isNoDocument()&&r.version.isEqual(Y.min())))return r}return Pe.newInvalidDocument(e)}}function Mg(n){return new ET(n)}class bT extends Lg{constructor(e,t){super(),this.Ir=e,this.trackRemovals=t,this.Er=new Kt(r=>r.toString(),(r,i)=>r.isEqual(i))}applyChanges(e){const t=[];let r=0,i=new _e((s,o)=>te(s.canonicalString(),o.canonicalString()));return this.changes.forEach((s,o)=>{const c=this.Er.get(s);if(t.push(this.Ir.removeEntry(e,s,c.readTime)),o.isValidDocument()){const l=sf(this.Ir.serializer,o);i=i.add(s.path.popLast());const d=ia(l);r+=d-c.size,t.push(this.Ir.addEntry(e,s,l))}else if(r-=c.size,this.trackRemovals){const l=sf(this.Ir.serializer,o.convertToNoDocument(Y.min()));t.push(this.Ir.addEntry(e,s,l))}}),i.forEach(s=>{t.push(this.Ir.indexManager.addToCollectionParentIndex(e,s))}),t.push(this.Ir.updateMetadata(e,r)),R.waitFor(t)}getFromCache(e,t){return this.Ir.lr(e,t).next(r=>(this.Er.set(t,{size:r.size,readTime:r.document.readTime}),r.document))}getAllFromCache(e,t){return this.Ir.Pr(e,t).next(({documents:r,Tr:i})=>(i.forEach((s,o)=>{this.Er.set(s,{size:o,readTime:r.get(s).readTime})}),r))}}function wf(n){return Oe(n,hs)}function On(n){return Oe(n,Ko)}function Li(n){const e=n.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function Ef(n,e){const t=e.documentKey.path.toArray();return[n,na(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function bf(n,e){const t=n.path.toArray(),r=e.path.toArray();let i=0;for(let s=0;s<t.length-2&&s<r.length-2;++s)if(i=te(t[s],r[s]),i)return i;return i=te(t.length,r.length),i||(i=te(t[t.length-2],r[r.length-2]),i||te(t[t.length-1],r[r.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class TT{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fg{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&Xi(r.mutation,i,tt.empty(),Ae.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,se()).next(()=>r))}getLocalViewOfDocuments(e,t,r=se()){const i=bt();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(s=>{let o=ji();return s.forEach((c,l)=>{o=o.insert(c,l.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const r=bt();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,se()))}populateOverlays(e,t,r){const i=[];return r.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,c)=>{t.set(o,c)})})}computeViews(e,t,r,i){let s=at();const o=Ji(),c=function(){return Ji()}();return t.forEach((l,d)=>{const p=r.get(d.key);i.has(d.key)&&(p===void 0||p.mutation instanceof Ht)?s=s.insert(d.key,d):p!==void 0?(o.set(d.key,p.mutation.getFieldMask()),Xi(p.mutation,d,p.mutation.getFieldMask(),Ae.now())):o.set(d.key,tt.empty())}),this.recalculateAndSaveOverlays(e,s).next(l=>(l.forEach((d,p)=>o.set(d,p)),t.forEach((d,p)=>{var m;return c.set(d,new TT(p,(m=o.get(d))!==null&&m!==void 0?m:null))}),c))}recalculateAndSaveOverlays(e,t){const r=Ji();let i=new be((o,c)=>o-c),s=se();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const c of o)c.keys().forEach(l=>{const d=t.get(l);if(d===null)return;let p=r.get(l)||tt.empty();p=c.applyToLocalView(d,p),r.set(l,p);const m=(i.get(c.batchId)||se()).add(l);i=i.insert(c.batchId,m)})}).next(()=>{const o=[],c=i.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),d=l.key,p=l.value,m=Zm();p.forEach(w=>{if(!s.has(w)){const A=ag(t.get(w),r.get(w));A!==null&&m.set(w,A),s=s.add(w)}}),o.push(this.documentOverlayCache.saveOverlays(e,d,m))}return R.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return function(o){return G.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Jl(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):R.resolve(bt());let c=cs,l=s;return o.next(d=>R.forEach(d,(p,m)=>(c<m.largestBatchId&&(c=m.largestBatchId),s.get(p)?R.resolve():this.remoteDocumentCache.getEntry(e,p).next(w=>{l=l.insert(p,w)}))).next(()=>this.populateOverlays(e,d,s)).next(()=>this.computeViews(e,l,d,se())).next(p=>({batchId:c,changes:Xm(p)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new G(t)).next(r=>{let i=ji();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){const s=t.collectionGroup;let o=ji();return this.indexManager.getCollectionParents(e,s).next(c=>R.forEach(c,l=>{const d=function(m,w){return new fr(w,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(t,l.child(s));return this.getDocumentsMatchingCollectionQuery(e,d,r,i).next(p=>{p.forEach((m,w)=>{o=o.insert(m,w)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i))).next(o=>{s.forEach((l,d)=>{const p=d.getKey();o.get(p)===null&&(o=o.insert(p,Pe.newInvalidDocument(p)))});let c=ji();return o.forEach((l,d)=>{const p=s.get(l);p!==void 0&&Xi(p.mutation,d,tt.empty(),Ae.now()),Ns(t,d)&&(c=c.insert(l,d))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AT{constructor(e){this.serializer=e,this.dr=new Map,this.Ar=new Map}getBundleMetadata(e,t){return R.resolve(this.dr.get(t))}saveBundleMetadata(e,t){return this.dr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:Je(i.createTime)}}(t)),R.resolve()}getNamedQuery(e,t){return R.resolve(this.Ar.get(t))}saveNamedQuery(e,t){return this.Ar.set(t.name,function(i){return{name:i.name,query:Rg(i.bundledQuery),readTime:Je(i.readTime)}}(t)),R.resolve()}}/**
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
 */class RT{constructor(){this.overlays=new be(G.comparator),this.Rr=new Map}getOverlay(e,t){return R.resolve(this.overlays.get(t))}getOverlays(e,t){const r=bt();return R.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,s)=>{this.Et(e,t,s)}),R.resolve()}removeOverlaysForBatchId(e,t,r){const i=this.Rr.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.Rr.delete(r)),R.resolve()}getOverlaysForCollection(e,t,r){const i=bt(),s=t.length+1,o=new G(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const l=c.getNext().value,d=l.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===s&&l.largestBatchId>r&&i.set(l.getKey(),l)}return R.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new be((d,p)=>d-p);const o=this.overlays.getIterator();for(;o.hasNext();){const d=o.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let p=s.get(d.largestBatchId);p===null&&(p=bt(),s=s.insert(d.largestBatchId,p)),p.set(d.getKey(),d)}}const c=bt(),l=s.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((d,p)=>c.set(d,p)),!(c.size()>=i)););return R.resolve(c)}Et(e,t,r){const i=this.overlays.get(r.key);if(i!==null){const o=this.Rr.get(i.largestBatchId).delete(r.key);this.Rr.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new nu(t,r));let s=this.Rr.get(t);s===void 0&&(s=se(),this.Rr.set(t,s)),this.Rr.set(t,s.add(r.key))}}/**
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
 */class ST{constructor(){this.sessionToken=De.EMPTY_BYTE_STRING}getSessionToken(e){return R.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,R.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class au{constructor(){this.Vr=new _e(Le.mr),this.gr=new _e(Le.pr)}isEmpty(){return this.Vr.isEmpty()}addReference(e,t){const r=new Le(e,t);this.Vr=this.Vr.add(r),this.gr=this.gr.add(r)}yr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.wr(new Le(e,t))}Sr(e,t){e.forEach(r=>this.removeReference(r,t))}br(e){const t=new G(new fe([])),r=new Le(t,e),i=new Le(t,e+1),s=[];return this.gr.forEachInRange([r,i],o=>{this.wr(o),s.push(o.key)}),s}Dr(){this.Vr.forEach(e=>this.wr(e))}wr(e){this.Vr=this.Vr.delete(e),this.gr=this.gr.delete(e)}vr(e){const t=new G(new fe([])),r=new Le(t,e),i=new Le(t,e+1);let s=se();return this.gr.forEachInRange([r,i],o=>{s=s.add(o.key)}),s}containsKey(e){const t=new Le(e,0),r=this.Vr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Le{constructor(e,t){this.key=e,this.Cr=t}static mr(e,t){return G.comparator(e.key,t.key)||te(e.Cr,t.Cr)}static pr(e,t){return te(e.Cr,t.Cr)||G.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PT{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Fr=1,this.Mr=new _e(Le.mr)}checkEmpty(e){return R.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){const s=this.Fr;this.Fr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new eu(s,t,r,i);this.mutationQueue.push(o);for(const c of i)this.Mr=this.Mr.add(new Le(c.key,s)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return R.resolve(o)}lookupMutationBatch(e,t){return R.resolve(this.Or(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=this.Nr(r),s=i<0?0:i;return R.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return R.resolve(this.mutationQueue.length===0?Wn:this.Fr-1)}getAllMutationBatches(e){return R.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Le(t,0),i=new Le(t,Number.POSITIVE_INFINITY),s=[];return this.Mr.forEachInRange([r,i],o=>{const c=this.Or(o.Cr);s.push(c)}),R.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new _e(te);return t.forEach(i=>{const s=new Le(i,0),o=new Le(i,Number.POSITIVE_INFINITY);this.Mr.forEachInRange([s,o],c=>{r=r.add(c.Cr)})}),R.resolve(this.Br(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1;let s=r;G.isDocumentKey(s)||(s=s.child(""));const o=new Le(new G(s),0);let c=new _e(te);return this.Mr.forEachWhile(l=>{const d=l.key.path;return!!r.isPrefixOf(d)&&(d.length===i&&(c=c.add(l.Cr)),!0)},o),R.resolve(this.Br(c))}Br(e){const t=[];return e.forEach(r=>{const i=this.Or(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){Q(this.Lr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.Mr;return R.forEach(t.mutations,i=>{const s=new Le(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.Mr=r})}qn(e){}containsKey(e,t){const r=new Le(t,0),i=this.Mr.firstAfterOrEqual(r);return R.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,R.resolve()}Lr(e,t){return this.Nr(e)}Nr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Or(e){const t=this.Nr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CT{constructor(e){this.kr=e,this.docs=function(){return new be(G.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,i=this.docs.get(r),s=i?i.size:0,o=this.kr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return R.resolve(r?r.document.mutableCopy():Pe.newInvalidDocument(t))}getEntries(e,t){let r=at();return t.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():Pe.newInvalidDocument(i))}),R.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=at();const o=t.path,c=new G(o.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:d,value:{document:p}}=l.getNext();if(!o.isPrefixOf(d.path))break;d.path.length>o.length+1||jl(vm(p),r)<=0||(i.has(p.key)||Ns(t,p))&&(s=s.insert(p.key,p.mutableCopy()))}return R.resolve(s)}getAllFromCollectionGroup(e,t,r,i){W()}qr(e,t){return R.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new kT(this)}getSize(e){return R.resolve(this.size)}}class kT extends Lg{constructor(e){super(),this.Ir=e}applyChanges(e){const t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.Ir.addEntry(e,i)):this.Ir.removeEntry(r)}),R.waitFor(t)}getFromCache(e,t){return this.Ir.getEntry(e,t)}getAllFromCache(e,t){return this.Ir.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DT{constructor(e){this.persistence=e,this.Qr=new Kt(t=>nr(t),ks),this.lastRemoteSnapshotVersion=Y.min(),this.highestTargetId=0,this.$r=0,this.Ur=new au,this.targetCount=0,this.Kr=sr.Un()}forEachTarget(e,t){return this.Qr.forEach((r,i)=>t(i)),R.resolve()}getLastRemoteSnapshotVersion(e){return R.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return R.resolve(this.$r)}allocateTargetId(e){return this.highestTargetId=this.Kr.next(),R.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.$r&&(this.$r=t),R.resolve()}zn(e){this.Qr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.Kr=new sr(t),this.highestTargetId=t),e.sequenceNumber>this.$r&&(this.$r=e.sequenceNumber)}addTargetData(e,t){return this.zn(t),this.targetCount+=1,R.resolve()}updateTargetData(e,t){return this.zn(t),R.resolve()}removeTargetData(e,t){return this.Qr.delete(t.target),this.Ur.br(t.targetId),this.targetCount-=1,R.resolve()}removeTargets(e,t,r){let i=0;const s=[];return this.Qr.forEach((o,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.Qr.delete(o),s.push(this.removeMatchingKeysForTargetId(e,c.targetId)),i++)}),R.waitFor(s).next(()=>i)}getTargetCount(e){return R.resolve(this.targetCount)}getTargetData(e,t){const r=this.Qr.get(t)||null;return R.resolve(r)}addMatchingKeys(e,t,r){return this.Ur.yr(t,r),R.resolve()}removeMatchingKeys(e,t,r){this.Ur.Sr(t,r);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),R.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.Ur.br(t),R.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Ur.vr(t);return R.resolve(r)}containsKey(e,t){return R.resolve(this.Ur.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cu{constructor(e,t){this.Wr={},this.overlays={},this.Gr=new dt(0),this.zr=!1,this.zr=!0,this.jr=new ST,this.referenceDelegate=e(this),this.Hr=new DT(this),this.indexManager=new gT,this.remoteDocumentCache=function(i){return new CT(i)}(r=>this.referenceDelegate.Jr(r)),this.serializer=new Tg(t),this.Yr=new AT(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.zr=!1,Promise.resolve()}get started(){return this.zr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new RT,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.Wr[e.toKey()];return r||(r=new PT(t,this.referenceDelegate),this.Wr[e.toKey()]=r),r}getGlobalsCache(){return this.jr}getTargetCache(){return this.Hr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Yr}runTransaction(e,t,r){M("MemoryPersistence","Starting transaction:",e);const i=new NT(this.Gr.next());return this.referenceDelegate.Zr(),r(i).next(s=>this.referenceDelegate.Xr(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}ei(e,t){return R.or(Object.values(this.Wr).map(r=>()=>r.containsKey(e,t)))}}class NT extends wm{constructor(e){super(),this.currentSequenceNumber=e}}class Ua{constructor(e){this.persistence=e,this.ti=new au,this.ni=null}static ri(e){return new Ua(e)}get ii(){if(this.ni)return this.ni;throw W()}addReference(e,t,r){return this.ti.addReference(r,t),this.ii.delete(r.toString()),R.resolve()}removeReference(e,t,r){return this.ti.removeReference(r,t),this.ii.add(r.toString()),R.resolve()}markPotentiallyOrphaned(e,t){return this.ii.add(t.toString()),R.resolve()}removeTarget(e,t){this.ti.br(t.targetId).forEach(i=>this.ii.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.ii.add(s.toString()))}).next(()=>r.removeTargetData(e,t))}Zr(){this.ni=new Set}Xr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return R.forEach(this.ii,r=>{const i=G.fromPath(r);return this.si(e,i).next(s=>{s||t.removeEntry(i,Y.min())})}).next(()=>(this.ni=null,t.apply(e)))}updateLimboDocument(e,t){return this.si(e,t).next(r=>{r?this.ii.delete(t.toString()):this.ii.add(t.toString())})}Jr(e){return 0}si(e,t){return R.or([()=>R.resolve(this.ti.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.ei(e,t)])}}class sa{constructor(e,t){this.persistence=e,this.oi=new Kt(r=>Ge(r.path),(r,i)=>r.isEqual(i)),this.garbageCollector=Og(this,t)}static ri(e,t){return new sa(e,t)}Zr(){}Xr(e){return R.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}nr(e){const t=this.sr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}sr(e){let t=0;return this.rr(e,r=>{t++}).next(()=>t)}rr(e,t){return R.forEach(this.oi,(r,i)=>this.ar(e,r,i).next(s=>s?R.resolve():t(i)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.qr(e,o=>this.ar(e,o,t).next(c=>{c||(r++,s.removeEntry(o,Y.min()))})).next(()=>s.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.oi.set(t,e.currentSequenceNumber),R.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.oi.set(r,e.currentSequenceNumber),R.resolve()}removeReference(e,t,r){return this.oi.set(r,e.currentSequenceNumber),R.resolve()}updateLimboDocument(e,t){return this.oi.set(t,e.currentSequenceNumber),R.resolve()}Jr(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Po(e.data.value)),t}ar(e,t,r){return R.or([()=>this.persistence.ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const i=this.oi.get(t);return R.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xT{constructor(e){this.serializer=e}B(e,t,r,i){const s=new Aa("createOrUpgrade",t);r<1&&i>=1&&(function(l){l.createObjectStore(Cs)}(e),function(l){l.createObjectStore(ds,{keyPath:HE}),l.createObjectStore(gt,{keyPath:Vh,autoIncrement:!0}).createIndex(zn,Oh,{unique:!0}),l.createObjectStore(Kr)}(e),Tf(e),function(l){l.createObjectStore(Un)}(e));let o=R.resolve();return r<3&&i>=3&&(r!==0&&(function(l){l.deleteObjectStore(Wr),l.deleteObjectStore(Hr),l.deleteObjectStore(Qn)}(e),Tf(e)),o=o.next(()=>function(l){const d=l.store(Qn),p={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:Y.min().toTimestamp(),targetCount:0};return d.put(Ho,p)}(s))),r<4&&i>=4&&(r!==0&&(o=o.next(()=>function(l,d){return d.store(gt).G().next(m=>{l.deleteObjectStore(gt),l.createObjectStore(gt,{keyPath:Vh,autoIncrement:!0}).createIndex(zn,Oh,{unique:!0});const w=d.store(gt),A=m.map(C=>w.put(C));return R.waitFor(A)})}(e,s))),o=o.next(()=>{(function(l){l.createObjectStore(Qr,{keyPath:nb})})(e)})),r<5&&i>=5&&(o=o.next(()=>this._i(s))),r<6&&i>=6&&(o=o.next(()=>(function(l){l.createObjectStore(hs)}(e),this.ai(s)))),r<7&&i>=7&&(o=o.next(()=>this.ui(s))),r<8&&i>=8&&(o=o.next(()=>this.ci(e,s))),r<9&&i>=9&&(o=o.next(()=>{(function(l){l.objectStoreNames.contains("remoteDocumentChanges")&&l.deleteObjectStore("remoteDocumentChanges")})(e)})),r<10&&i>=10&&(o=o.next(()=>this.li(s))),r<11&&i>=11&&(o=o.next(()=>{(function(l){l.createObjectStore(Sa,{keyPath:rb})})(e),function(l){l.createObjectStore(Pa,{keyPath:ib})}(e)})),r<12&&i>=12&&(o=o.next(()=>{(function(l){const d=l.createObjectStore(Ca,{keyPath:db});d.createIndex(el,hb,{unique:!1}),d.createIndex(Pm,fb,{unique:!1})})(e)})),r<13&&i>=13&&(o=o.next(()=>function(l){const d=l.createObjectStore(Ko,{keyPath:QE});d.createIndex(Ro,YE),d.createIndex(Tm,JE)}(e)).next(()=>this.hi(e,s)).next(()=>e.deleteObjectStore(Un))),r<14&&i>=14&&(o=o.next(()=>this.Pi(e,s))),r<15&&i>=15&&(o=o.next(()=>function(l){l.createObjectStore(Gl,{keyPath:sb,autoIncrement:!0}).createIndex(Zc,ob,{unique:!1}),l.createObjectStore(Wo,{keyPath:ab}).createIndex(Rm,cb,{unique:!1}),l.createObjectStore(Qo,{keyPath:lb}).createIndex(Sm,ub,{unique:!1})}(e))),r<16&&i>=16&&(o=o.next(()=>{t.objectStore(Wo).clear()}).next(()=>{t.objectStore(Qo).clear()})),r<17&&i>=17&&(o=o.next(()=>{(function(l){l.createObjectStore(Kl,{keyPath:pb})})(e)})),o}ai(e){let t=0;return e.store(Un).Z((r,i)=>{t+=ia(i)}).next(()=>{const r={byteSize:t};return e.store(hs).put(Xc,r)})}_i(e){const t=e.store(ds),r=e.store(gt);return t.G().next(i=>R.forEach(i,s=>{const o=IDBKeyRange.bound([s.userId,Wn],[s.userId,s.lastAcknowledgedBatchId]);return r.G(zn,o).next(c=>R.forEach(c,l=>{Q(l.userId===s.userId);const d=$n(this.serializer,l);return kg(e,s.userId,d).next(()=>{})}))}))}ui(e){const t=e.store(Wr),r=e.store(Un);return e.store(Qn).get(Ho).next(i=>{const s=[];return r.Z((o,c)=>{const l=new fe(o),d=function(m){return[0,Ge(m)]}(l);s.push(t.get(d).next(p=>p?R.resolve():(m=>t.put({targetId:0,path:Ge(m),sequenceNumber:i.highestListenSequenceNumber}))(l)))}).next(()=>R.waitFor(s))})}ci(e,t){e.createObjectStore(fs,{keyPath:tb});const r=t.store(fs),i=new ou,s=o=>{if(i.add(o)){const c=o.lastSegment(),l=o.popLast();return r.put({collectionId:c,parent:Ge(l)})}};return t.store(Un).Z({Y:!0},(o,c)=>{const l=new fe(o);return s(l.popLast())}).next(()=>t.store(Kr).Z({Y:!0},([o,c,l],d)=>{const p=Et(c);return s(p.popLast())}))}li(e){const t=e.store(Hr);return t.Z((r,i)=>{const s=zi(i),o=Ag(this.serializer,s);return t.put(o)})}hi(e,t){const r=t.store(Un),i=[];return r.Z((s,o)=>{const c=t.store(Ko),l=function(m){return m.document?new G(fe.fromString(m.document.name).popFirst(5)):m.noDocument?G.fromSegments(m.noDocument.path):m.unknownDocument?G.fromSegments(m.unknownDocument.path):W()}(o).path.toArray(),d={prefixPath:l.slice(0,l.length-2),collectionGroup:l[l.length-2],documentId:l[l.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};i.push(c.put(d))}).next(()=>R.waitFor(i))}Pi(e,t){const r=t.store(gt),i=Mg(this.serializer),s=new cu(Ua.ri,this.serializer.Tt);return r.G().next(o=>{const c=new Map;return o.forEach(l=>{var d;let p=(d=c.get(l.userId))!==null&&d!==void 0?d:se();$n(this.serializer,l).keys().forEach(m=>p=p.add(m)),c.set(l.userId,p)}),R.forEach(c,(l,d)=>{const p=new Qe(d),m=Ma.It(this.serializer,p),w=s.getIndexManager(p),A=Fa.It(p,this.serializer,w,s.referenceDelegate);return new Fg(i,A,m,w).recalculateAndSaveOverlaysForDocumentKeys(new tl(t,dt.ae),l).next()})})}}function Tf(n){n.createObjectStore(Wr,{keyPath:ZE}).createIndex(zl,eb,{unique:!0}),n.createObjectStore(Hr,{keyPath:"targetId"}).createIndex(Am,XE,{unique:!0}),n.createObjectStore(Qn)}const rn="IndexedDbPersistence",Pc=18e5,Cc=5e3,kc="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",VT="main";class lu{constructor(e,t,r,i,s,o,c,l,d,p,m=17){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.Ti=s,this.window=o,this.document=c,this.Ii=d,this.Ei=p,this.di=m,this.Gr=null,this.zr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Ai=null,this.inForeground=!1,this.Ri=null,this.Vi=null,this.mi=Number.NEGATIVE_INFINITY,this.fi=w=>Promise.resolve(),!lu.D())throw new $(x.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new wT(this,i),this.gi=t+VT,this.serializer=new Tg(l),this.pi=new _n(this.gi,this.di,new xT(this.serializer)),this.jr=new uT,this.Hr=new yT(this.referenceDelegate,this.serializer),this.remoteDocumentCache=Mg(this.serializer),this.Yr=new lT,this.window&&this.window.localStorage?this.yi=this.window.localStorage:(this.yi=null,p===!1&&Ye(rn,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.wi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new $(x.FAILED_PRECONDITION,kc);return this.Si(),this.bi(),this.Di(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Hr.getHighestSequenceNumber(e))}).then(e=>{this.Gr=new dt(e,this.Ii)}).then(()=>{this.zr=!0}).catch(e=>(this.pi&&this.pi.close(),Promise.reject(e)))}Ci(e){return this.fi=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.pi.k(async t=>{t.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Ti.enqueueAndForget(async()=>{this.started&&await this.wi()}))}wi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>lo(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.Fi(e).next(t=>{t||(this.isPrimary=!1,this.Ti.enqueueRetryable(()=>this.fi(!1)))})}).next(()=>this.Mi(e)).next(t=>this.isPrimary&&!t?this.xi(e).next(()=>!1):!!t&&this.Oi(e).next(()=>!0))).catch(e=>{if(Rn(e))return M(rn,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return M(rn,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Ti.enqueueRetryable(()=>this.fi(e)),this.isPrimary=e})}Fi(e){return Mi(e).get(wr).next(t=>R.resolve(this.Ni(t)))}Bi(e){return lo(e).delete(this.clientId)}async Li(){if(this.isPrimary&&!this.ki(this.mi,Pc)){this.mi=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{const r=Oe(t,Qr);return r.G().next(i=>{const s=this.qi(i,Pc),o=i.filter(c=>s.indexOf(c)===-1);return R.forEach(o,c=>r.delete(c.clientId)).next(()=>o)})}).catch(()=>[]);if(this.yi)for(const t of e)this.yi.removeItem(this.Qi(t.clientId))}}Di(){this.Vi=this.Ti.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.wi().then(()=>this.Li()).then(()=>this.Di()))}Ni(e){return!!e&&e.ownerId===this.clientId}Mi(e){return this.Ei?R.resolve(!0):Mi(e).get(wr).next(t=>{if(t!==null&&this.ki(t.leaseTimestampMs,Cc)&&!this.$i(t.ownerId)){if(this.Ni(t)&&this.networkEnabled)return!0;if(!this.Ni(t)){if(!t.allowTabSynchronization)throw new $(x.FAILED_PRECONDITION,kc);return!1}}return!(!this.networkEnabled||!this.inForeground)||lo(e).G().next(r=>this.qi(r,Cc).find(i=>{if(this.clientId!==i.clientId){const s=!this.networkEnabled&&i.networkEnabled,o=!this.inForeground&&i.inForeground,c=this.networkEnabled===i.networkEnabled;if(s||o&&c)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&M(rn,`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.zr=!1,this.Ui(),this.Vi&&(this.Vi.cancel(),this.Vi=null),this.Ki(),this.Wi(),await this.pi.runTransaction("shutdown","readwrite",[Cs,Qr],e=>{const t=new tl(e,dt.ae);return this.xi(t).next(()=>this.Bi(t))}),this.pi.close(),this.Gi()}qi(e,t){return e.filter(r=>this.ki(r.updateTimeMs,t)&&!this.$i(r.clientId))}zi(){return this.runTransaction("getActiveClients","readonly",e=>lo(e).G().next(t=>this.qi(t,Pc).map(r=>r.clientId)))}get started(){return this.zr}getGlobalsCache(){return this.jr}getMutationQueue(e,t){return Fa.It(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Hr}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new _T(e,this.serializer.Tt.databaseId)}getDocumentOverlayCache(e){return Ma.It(this.serializer,e)}getBundleCache(){return this.Yr}runTransaction(e,t,r){M(rn,"Starting transaction:",e);const i=t==="readonly"?"readonly":"readwrite",s=function(l){return l===17?_b:l===16?gb:l===15?Hl:l===14?Dm:l===13?km:l===12?mb:l===11?Cm:void W()}(this.di);let o;return this.pi.runTransaction(e,i,s,c=>(o=new tl(c,this.Gr?this.Gr.next():dt.ae),t==="readwrite-primary"?this.Fi(o).next(l=>!!l||this.Mi(o)).next(l=>{if(!l)throw Ye(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Ti.enqueueRetryable(()=>this.fi(!1)),new $(x.FAILED_PRECONDITION,Im);return r(o)}).next(l=>this.Oi(o).next(()=>l)):this.ji(o).next(()=>r(o)))).then(c=>(o.raiseOnCommittedEvent(),c))}ji(e){return Mi(e).get(wr).next(t=>{if(t!==null&&this.ki(t.leaseTimestampMs,Cc)&&!this.$i(t.ownerId)&&!this.Ni(t)&&!(this.Ei||this.allowTabSynchronization&&t.allowTabSynchronization))throw new $(x.FAILED_PRECONDITION,kc)})}Oi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Mi(e).put(wr,t)}static D(){return _n.D()}xi(e){const t=Mi(e);return t.get(wr).next(r=>this.Ni(r)?(M(rn,"Releasing primary lease."),t.delete(wr)):R.resolve())}ki(e,t){const r=Date.now();return!(e<r-t)&&(!(e>r)||(Ye(`Detected an update time that is in the future: ${e} > ${r}`),!1))}Si(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ri=()=>{this.Ti.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.wi()))},this.document.addEventListener("visibilitychange",this.Ri),this.inForeground=this.document.visibilityState==="visible")}Ki(){this.Ri&&(this.document.removeEventListener("visibilitychange",this.Ri),this.Ri=null)}bi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Ai=()=>{this.Ui();const t=/(?:Version|Mobile)\/1[456]/;Tp()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.Ti.enterRestrictedMode(!0),this.Ti.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Ai))}Wi(){this.Ai&&(this.window.removeEventListener("pagehide",this.Ai),this.Ai=null)}$i(e){var t;try{const r=((t=this.yi)===null||t===void 0?void 0:t.getItem(this.Qi(e)))!==null;return M(rn,`Client '${e}' ${r?"is":"is not"} zombied in LocalStorage`),r}catch(r){return Ye(rn,"Failed to get zombied client id.",r),!1}}Ui(){if(this.yi)try{this.yi.setItem(this.Qi(this.clientId),String(Date.now()))}catch(e){Ye("Failed to set zombie client id.",e)}}Gi(){if(this.yi)try{this.yi.removeItem(this.Qi(this.clientId))}catch{}}Qi(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Mi(n){return Oe(n,Cs)}function lo(n){return Oe(n,Qr)}function OT(n,e){let t=n.projectId;return n.isDefaultDatabase||(t+="."+n.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uu{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.Hi=r,this.Ji=i}static Yi(e,t){let r=se(),i=se();for(const s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new uu(e,t.fromCache,r,i)}}/**
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
 */class LT{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ug{constructor(){this.Zi=!1,this.Xi=!1,this.es=100,this.ts=function(){return Tp()?8:Em(Ve())>0?6:4}()}initialize(e,t){this.ns=e,this.indexManager=t,this.Zi=!0}getDocumentsMatchingQuery(e,t,r,i){const s={result:null};return this.rs(e,t).next(o=>{s.result=o}).next(()=>{if(!s.result)return this.ss(e,t,i,r).next(o=>{s.result=o})}).next(()=>{if(s.result)return;const o=new LT;return this._s(e,t,o).next(c=>{if(s.result=c,this.Xi)return this.us(e,t,o,c.size)})}).next(()=>s.result)}us(e,t,r,i){return r.documentReadCount<this.es?(Sr()<=ae.DEBUG&&M("QueryEngine","SDK will not create cache indexes for query:",Pr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.es,"documents"),R.resolve()):(Sr()<=ae.DEBUG&&M("QueryEngine","Query:",Pr(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.ts*i?(Sr()<=ae.DEBUG&&M("QueryEngine","The SDK decides to create cache indexes for query:",Pr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,ht(t))):R.resolve())}rs(e,t){if(Wh(t))return R.resolve(null);let r=ht(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=Zo(t,null,"F"),r=ht(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const o=se(...s);return this.ns.getDocuments(e,o).next(c=>this.indexManager.getMinOffset(e,r).next(l=>{const d=this.cs(t,c);return this.ls(t,d,o,l.readTime)?this.rs(e,Zo(t,null,"F")):this.hs(e,d,t,l)}))})))}ss(e,t,r,i){return Wh(t)||i.isEqual(Y.min())?R.resolve(null):this.ns.getDocuments(e,r).next(s=>{const o=this.cs(t,s);return this.ls(t,o,r,i)?R.resolve(null):(Sr()<=ae.DEBUG&&M("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Pr(t)),this.hs(e,o,t,BE(i,cs)).next(c=>c))})}cs(e,t){let r=new _e(Ym(e));return t.forEach((i,s)=>{Ns(e,s)&&(r=r.add(s))}),r}ls(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}_s(e,t,r){return Sr()<=ae.DEBUG&&M("QueryEngine","Using full collection scan to execute query:",Pr(t)),this.ns.getDocumentsMatchingQuery(e,t,ct.min(),r)}hs(e,t,r,i){return this.ns.getDocumentsMatchingQuery(e,r,i).next(s=>(t.forEach(o=>{s=s.insert(o.key,o)}),s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const du="LocalStore",MT=3e8;class FT{constructor(e,t,r,i){this.persistence=e,this.Ps=t,this.serializer=i,this.Ts=new be(te),this.Is=new Kt(s=>nr(s),ks),this.Es=new Map,this.ds=e.getRemoteDocumentCache(),this.Hr=e.getTargetCache(),this.Yr=e.getBundleCache(),this.As(r)}As(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Fg(this.ds,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.ds.setIndexManager(this.indexManager),this.Ps.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ts))}}function Bg(n,e,t,r){return new FT(n,e,t,r)}async function $g(n,e){const t=ne(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,t.As(e),t.mutationQueue.getAllMutationBatches(r))).next(s=>{const o=[],c=[];let l=se();for(const d of i){o.push(d.batchId);for(const p of d.mutations)l=l.add(p.key)}for(const d of s){c.push(d.batchId);for(const p of d.mutations)l=l.add(p.key)}return t.localDocuments.getDocuments(r,l).next(d=>({Rs:d,removedBatchIds:o,addedBatchIds:c}))})})}function UT(n,e){const t=ne(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=t.ds.newChangeBuffer({trackRemovals:!0});return function(c,l,d,p){const m=d.batch,w=m.keys();let A=R.resolve();return w.forEach(C=>{A=A.next(()=>p.getEntry(l,C)).next(k=>{const P=d.docVersions.get(C);Q(P!==null),k.version.compareTo(P)<0&&(m.applyToRemoteDocument(k,d),k.isValidDocument()&&(k.setReadTime(d.commitVersion),p.addEntry(k)))})}),A.next(()=>c.mutationQueue.removeMutationBatch(l,m))}(t,r,e,s).next(()=>s.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let l=se();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(l=l.add(c.batch.mutations[d].key));return l}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function jg(n){const e=ne(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Hr.getLastRemoteSnapshotVersion(t))}function BT(n,e){const t=ne(n),r=e.snapshotVersion;let i=t.Ts;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const o=t.ds.newChangeBuffer({trackRemovals:!0});i=t.Ts;const c=[];e.targetChanges.forEach((p,m)=>{const w=i.get(m);if(!w)return;c.push(t.Hr.removeMatchingKeys(s,p.removedDocuments,m).next(()=>t.Hr.addMatchingKeys(s,p.addedDocuments,m)));let A=w.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(m)!==null?A=A.withResumeToken(De.EMPTY_BYTE_STRING,Y.min()).withLastLimboFreeSnapshotVersion(Y.min()):p.resumeToken.approximateByteSize()>0&&(A=A.withResumeToken(p.resumeToken,r)),i=i.insert(m,A),function(k,P,B){return k.resumeToken.approximateByteSize()===0||P.snapshotVersion.toMicroseconds()-k.snapshotVersion.toMicroseconds()>=MT?!0:B.addedDocuments.size+B.modifiedDocuments.size+B.removedDocuments.size>0}(w,A,p)&&c.push(t.Hr.updateTargetData(s,A))});let l=at(),d=se();if(e.documentUpdates.forEach(p=>{e.resolvedLimboDocuments.has(p)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(s,p))}),c.push($T(s,o,e.documentUpdates).next(p=>{l=p.Vs,d=p.fs})),!r.isEqual(Y.min())){const p=t.Hr.getLastRemoteSnapshotVersion(s).next(m=>t.Hr.setTargetsMetadata(s,s.currentSequenceNumber,r));c.push(p)}return R.waitFor(c).next(()=>o.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,l,d)).next(()=>l)}).then(s=>(t.Ts=i,s))}function $T(n,e,t){let r=se(),i=se();return t.forEach(s=>r=r.add(s)),e.getEntries(n,r).next(s=>{let o=at();return t.forEach((c,l)=>{const d=s.get(c);l.isFoundDocument()!==d.isFoundDocument()&&(i=i.add(c)),l.isNoDocument()&&l.version.isEqual(Y.min())?(e.removeEntry(c,l.readTime),o=o.insert(c,l)):!d.isValidDocument()||l.version.compareTo(d.version)>0||l.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(l),o=o.insert(c,l)):M(du,"Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",l.version)}),{Vs:o,fs:i}})}function jT(n,e){const t=ne(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=Wn),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function qT(n,e){const t=ne(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.Hr.getTargetData(r,e).next(s=>s?(i=s,R.resolve(i)):t.Hr.allocateTargetId(r).next(o=>(i=new Bt(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.Hr.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=t.Ts.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.Ts=t.Ts.insert(r.targetId,r),t.Is.set(e,r.targetId)),r})}async function ml(n,e,t){const r=ne(n),i=r.Ts.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,o=>r.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!Rn(o))throw o;M(du,`Failed to update sequence numbers for target ${e}: ${o}`)}r.Ts=r.Ts.remove(e),r.Is.delete(i.target)}function Af(n,e,t){const r=ne(n);let i=Y.min(),s=se();return r.persistence.runTransaction("Execute query","readwrite",o=>function(l,d,p){const m=ne(l),w=m.Is.get(p);return w!==void 0?R.resolve(m.Ts.get(w)):m.Hr.getTargetData(d,p)}(r,o,ht(e)).next(c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,r.Hr.getMatchingKeysForTargetId(o,c.targetId).next(l=>{s=l})}).next(()=>r.Ps.getDocumentsMatchingQuery(o,e,t?i:Y.min(),t?s:se())).next(c=>(zT(r,Nb(e),c),{documents:c,gs:s})))}function zT(n,e,t){let r=n.Es.get(e)||Y.min();t.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),n.Es.set(e,r)}class Rf{constructor(){this.activeTargetIds=Fb()}Ds(e){this.activeTargetIds=this.activeTargetIds.add(e)}vs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}bs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class qg{constructor(){this.ho=new Rf,this.Po={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.ho.Ds(e),this.Po[e]||"not-current"}updateQueryState(e,t,r){this.Po[e]=t}removeLocalQueryTarget(e){this.ho.vs(e)}isLocalQueryTarget(e){return this.ho.activeTargetIds.has(e)}clearQueryState(e){delete this.Po[e]}getAllActiveQueryTargets(){return this.ho.activeTargetIds}isActiveQueryTarget(e){return this.ho.activeTargetIds.has(e)}start(){return this.ho=new Rf,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GT{To(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sf="ConnectivityMonitor";class Pf{constructor(){this.Io=()=>this.Eo(),this.Ao=()=>this.Ro(),this.Vo=[],this.mo()}To(e){this.Vo.push(e)}shutdown(){window.removeEventListener("online",this.Io),window.removeEventListener("offline",this.Ao)}mo(){window.addEventListener("online",this.Io),window.addEventListener("offline",this.Ao)}Eo(){M(Sf,"Network connectivity changed: AVAILABLE");for(const e of this.Vo)e(0)}Ro(){M(Sf,"Network connectivity changed: UNAVAILABLE");for(const e of this.Vo)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let uo=null;function gl(){return uo===null?uo=function(){return 268435456+Math.round(2147483648*Math.random())}():uo++,"0x"+uo.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dc="RestConnection",KT={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class HT{get fo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.po=t+"://"+e.host,this.yo=`projects/${r}/databases/${i}`,this.wo=this.databaseId.database===Yo?`project_id=${r}`:`project_id=${r}&database_id=${i}`}So(e,t,r,i,s){const o=gl(),c=this.bo(e,t.toUriEncodedString());M(Dc,`Sending RPC '${e}' ${o}:`,c,r);const l={"google-cloud-resource-prefix":this.yo,"x-goog-request-params":this.wo};return this.Do(l,i,s),this.vo(e,c,l,r).then(d=>(M(Dc,`Received RPC '${e}' ${o}: `,d),d),d=>{throw as(Dc,`RPC '${e}' ${o} failed with error: `,d,"url: ",c,"request:",r),d})}Co(e,t,r,i,s,o){return this.So(e,t,r,i,s)}Do(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+pi}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((i,s)=>e[s]=i),r&&r.headers.forEach((i,s)=>e[s]=i)}bo(e,t){const r=KT[e];return`${this.po}/v1/${t}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WT{constructor(e){this.Fo=e.Fo,this.Mo=e.Mo}xo(e){this.Oo=e}No(e){this.Bo=e}Lo(e){this.ko=e}onMessage(e){this.qo=e}close(){this.Mo()}send(e){this.Fo(e)}Qo(){this.Oo()}$o(){this.Bo()}Uo(e){this.ko(e)}Ko(e){this.qo(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const je="WebChannelConnection";class QT extends HT{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}vo(e,t,r,i){const s=gl();return new Promise((o,c)=>{const l=new hm;l.setWithCredentials(!0),l.listenOnce(fm.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case bo.NO_ERROR:const p=l.getResponseJson();M(je,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(p)),o(p);break;case bo.TIMEOUT:M(je,`RPC '${e}' ${s} timed out`),c(new $(x.DEADLINE_EXCEEDED,"Request time out"));break;case bo.HTTP_ERROR:const m=l.getStatus();if(M(je,`RPC '${e}' ${s} failed with status:`,m,"response text:",l.getResponseText()),m>0){let w=l.getResponseJson();Array.isArray(w)&&(w=w[0]);const A=w?.error;if(A&&A.status&&A.message){const C=function(P){const B=P.toLowerCase().replace(/_/g,"-");return Object.values(x).indexOf(B)>=0?B:x.UNKNOWN}(A.status);c(new $(C,A.message))}else c(new $(x.UNKNOWN,"Server responded with status "+l.getStatus()))}else c(new $(x.UNAVAILABLE,"Connection failed."));break;default:W()}}finally{M(je,`RPC '${e}' ${s} completed.`)}});const d=JSON.stringify(i);M(je,`RPC '${e}' ${s} sending request:`,i),l.send(t,"POST",d,r,15)})}Wo(e,t,r){const i=gl(),s=[this.po,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=gm(),c=mm(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(l.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Do(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;const p=s.join("");M(je,`Creating RPC '${e}' stream ${i}: ${p}`,l);const m=o.createWebChannel(p,l);let w=!1,A=!1;const C=new WT({Fo:P=>{A?M(je,`Not sending because RPC '${e}' stream ${i} is closed:`,P):(w||(M(je,`Opening RPC '${e}' stream ${i} transport.`),m.open(),w=!0),M(je,`RPC '${e}' stream ${i} sending:`,P),m.send(P))},Mo:()=>m.close()}),k=(P,B,D)=>{P.listen(B,L=>{try{D(L)}catch(q){setTimeout(()=>{throw q},0)}})};return k(m,$i.EventType.OPEN,()=>{A||(M(je,`RPC '${e}' stream ${i} transport opened.`),C.Qo())}),k(m,$i.EventType.CLOSE,()=>{A||(A=!0,M(je,`RPC '${e}' stream ${i} transport closed`),C.Uo())}),k(m,$i.EventType.ERROR,P=>{A||(A=!0,as(je,`RPC '${e}' stream ${i} transport errored:`,P),C.Uo(new $(x.UNAVAILABLE,"The operation could not be completed")))}),k(m,$i.EventType.MESSAGE,P=>{var B;if(!A){const D=P.data[0];Q(!!D);const L=D,q=L?.error||((B=L[0])===null||B===void 0?void 0:B.error);if(q){M(je,`RPC '${e}' stream ${i} received error:`,q);const V=q.status;let F=function(g){const _=ke[g];if(_!==void 0)return ug(_)}(V),T=q.message;F===void 0&&(F=x.INTERNAL,T="Unknown error status: "+V+" with message "+q.message),A=!0,C.Uo(new $(F,T)),m.close()}else M(je,`RPC '${e}' stream ${i} received:`,D),C.Ko(D)}}),k(c,pm.STAT_EVENT,P=>{P.stat===Wc.PROXY?M(je,`RPC '${e}' stream ${i} detected buffering proxy`):P.stat===Wc.NOPROXY&&M(je,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{C.$o()},0),C}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */function YT(){return typeof window<"u"?window:null}function No(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ba(n){return new Xb(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zg{constructor(e,t,r=1e3,i=1.5,s=6e4){this.Ti=e,this.timerId=t,this.Go=r,this.zo=i,this.jo=s,this.Ho=0,this.Jo=null,this.Yo=Date.now(),this.reset()}reset(){this.Ho=0}Zo(){this.Ho=this.jo}Xo(e){this.cancel();const t=Math.floor(this.Ho+this.e_()),r=Math.max(0,Date.now()-this.Yo),i=Math.max(0,t-r);i>0&&M("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ho} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Jo=this.Ti.enqueueAfterDelay(this.timerId,i,()=>(this.Yo=Date.now(),e())),this.Ho*=this.zo,this.Ho<this.Go&&(this.Ho=this.Go),this.Ho>this.jo&&(this.Ho=this.jo)}t_(){this.Jo!==null&&(this.Jo.skipDelay(),this.Jo=null)}cancel(){this.Jo!==null&&(this.Jo.cancel(),this.Jo=null)}e_(){return(Math.random()-.5)*this.Ho}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cf="PersistentStream";class Gg{constructor(e,t,r,i,s,o,c,l){this.Ti=e,this.n_=r,this.r_=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.i_=0,this.s_=null,this.o_=null,this.stream=null,this.__=0,this.a_=new zg(e,t)}u_(){return this.state===1||this.state===5||this.c_()}c_(){return this.state===2||this.state===3}start(){this.__=0,this.state!==4?this.auth():this.l_()}async stop(){this.u_()&&await this.close(0)}h_(){this.state=0,this.a_.reset()}P_(){this.c_()&&this.s_===null&&(this.s_=this.Ti.enqueueAfterDelay(this.n_,6e4,()=>this.T_()))}I_(e){this.E_(),this.stream.send(e)}async T_(){if(this.c_())return this.close(0)}E_(){this.s_&&(this.s_.cancel(),this.s_=null)}d_(){this.o_&&(this.o_.cancel(),this.o_=null)}async close(e,t){this.E_(),this.d_(),this.a_.cancel(),this.i_++,e!==4?this.a_.reset():t&&t.code===x.RESOURCE_EXHAUSTED?(Ye(t.toString()),Ye("Using maximum backoff delay to prevent overloading the backend."),this.a_.Zo()):t&&t.code===x.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.A_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Lo(t)}A_(){}auth(){this.state=1;const e=this.R_(this.i_),t=this.i_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.i_===t&&this.V_(r,i)},r=>{e(()=>{const i=new $(x.UNKNOWN,"Fetching auth token failed: "+r.message);return this.m_(i)})})}V_(e,t){const r=this.R_(this.i_);this.stream=this.f_(e,t),this.stream.xo(()=>{r(()=>this.listener.xo())}),this.stream.No(()=>{r(()=>(this.state=2,this.o_=this.Ti.enqueueAfterDelay(this.r_,1e4,()=>(this.c_()&&(this.state=3),Promise.resolve())),this.listener.No()))}),this.stream.Lo(i=>{r(()=>this.m_(i))}),this.stream.onMessage(i=>{r(()=>++this.__==1?this.g_(i):this.onNext(i))})}l_(){this.state=5,this.a_.Xo(async()=>{this.state=0,this.start()})}m_(e){return M(Cf,`close with error: ${e}`),this.stream=null,this.close(4,e)}R_(e){return t=>{this.Ti.enqueueAndForget(()=>this.i_===e?t():(M(Cf,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class JT extends Gg{constructor(e,t,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}f_(e,t){return this.connection.Wo("Listen",e,t)}g_(e){return this.onNext(e)}onNext(e){this.a_.reset();const t=tT(this.serializer,e),r=function(s){if(!("targetChange"in s))return Y.min();const o=s.targetChange;return o.targetIds&&o.targetIds.length?Y.min():o.readTime?Je(o.readTime):Y.min()}(e);return this.listener.p_(t,r)}y_(e){const t={};t.database=ul(this.serializer),t.addTarget=function(s,o){let c;const l=o.target;if(c=Jo(l)?{documents:yg(s,l)}:{query:vg(s,l).ht},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=fg(s,o.resumeToken);const d=cl(s,o.expectedCount);d!==null&&(c.expectedCount=d)}else if(o.snapshotVersion.compareTo(Y.min())>0){c.readTime=ni(s,o.snapshotVersion.toTimestamp());const d=cl(s,o.expectedCount);d!==null&&(c.expectedCount=d)}return c}(this.serializer,e);const r=rT(this.serializer,e);r&&(t.labels=r),this.I_(t)}w_(e){const t={};t.database=ul(this.serializer),t.removeTarget=e,this.I_(t)}}class XT extends Gg{constructor(e,t,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}get S_(){return this.__>0}start(){this.lastStreamToken=void 0,super.start()}A_(){this.S_&&this.b_([])}f_(e,t){return this.connection.Wo("Write",e,t)}g_(e){return Q(!!e.streamToken),this.lastStreamToken=e.streamToken,Q(!e.writeResults||e.writeResults.length===0),this.listener.D_()}onNext(e){Q(!!e.streamToken),this.lastStreamToken=e.streamToken,this.a_.reset();const t=nT(e.writeResults,e.commitTime),r=Je(e.commitTime);return this.listener.v_(r,t)}C_(){const e={};e.database=ul(this.serializer),this.I_(e)}b_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>ta(this.serializer,r))};this.I_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZT{}class eA extends ZT{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.F_=!1}M_(){if(this.F_)throw new $(x.FAILED_PRECONDITION,"The client has already been terminated.")}So(e,t,r,i){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.So(e,ll(t,r),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===x.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new $(x.UNKNOWN,s.toString())})}Co(e,t,r,i,s){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.Co(e,ll(t,r),i,o,c,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===x.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new $(x.UNKNOWN,o.toString())})}terminate(){this.F_=!0,this.connection.terminate()}}class tA{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.x_=0,this.O_=null,this.N_=!0}B_(){this.x_===0&&(this.L_("Unknown"),this.O_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.O_=null,this.k_("Backend didn't respond within 10 seconds."),this.L_("Offline"),Promise.resolve())))}q_(e){this.state==="Online"?this.L_("Unknown"):(this.x_++,this.x_>=1&&(this.Q_(),this.k_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.L_("Offline")))}set(e){this.Q_(),this.x_=0,e==="Online"&&(this.N_=!1),this.L_(e)}L_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}k_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.N_?(Ye(t),this.N_=!1):M("OnlineStateTracker",t)}Q_(){this.O_!==null&&(this.O_.cancel(),this.O_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const or="RemoteStore";class nA{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.U_=[],this.K_=new Map,this.W_=new Set,this.G_=[],this.z_=s,this.z_.To(o=>{r.enqueueAndForget(async()=>{pr(this)&&(M(or,"Restarting streams for network reachability change."),await async function(l){const d=ne(l);d.W_.add(4),await Vs(d),d.j_.set("Unknown"),d.W_.delete(4),await $a(d)}(this))})}),this.j_=new tA(r,i)}}async function $a(n){if(pr(n))for(const e of n.G_)await e(!0)}async function Vs(n){for(const e of n.G_)await e(!1)}function Kg(n,e){const t=ne(n);t.K_.has(e.targetId)||(t.K_.set(e.targetId,e),mu(t)?pu(t):gi(t).c_()&&fu(t,e))}function hu(n,e){const t=ne(n),r=gi(t);t.K_.delete(e),r.c_()&&Hg(t,e),t.K_.size===0&&(r.c_()?r.P_():pr(t)&&t.j_.set("Unknown"))}function fu(n,e){if(n.H_.Ne(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(Y.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}gi(n).y_(e)}function Hg(n,e){n.H_.Ne(e),gi(n).w_(e)}function pu(n){n.H_=new Wb({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),lt:e=>n.K_.get(e)||null,it:()=>n.datastore.serializer.databaseId}),gi(n).start(),n.j_.B_()}function mu(n){return pr(n)&&!gi(n).u_()&&n.K_.size>0}function pr(n){return ne(n).W_.size===0}function Wg(n){n.H_=void 0}async function rA(n){n.j_.set("Online")}async function iA(n){n.K_.forEach((e,t)=>{fu(n,e)})}async function sA(n,e){Wg(n),mu(n)?(n.j_.q_(e),pu(n)):n.j_.set("Unknown")}async function oA(n,e,t){if(n.j_.set("Online"),e instanceof hg&&e.state===2&&e.cause)try{await async function(i,s){const o=s.cause;for(const c of s.targetIds)i.K_.has(c)&&(await i.remoteSyncer.rejectListen(c,o),i.K_.delete(c),i.H_.removeTarget(c))}(n,e)}catch(r){M(or,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await oa(n,r)}else if(e instanceof Do?n.H_.We(e):e instanceof dg?n.H_.Ze(e):n.H_.je(e),!t.isEqual(Y.min()))try{const r=await jg(n.localStore);t.compareTo(r)>=0&&await function(s,o){const c=s.H_.ot(o);return c.targetChanges.forEach((l,d)=>{if(l.resumeToken.approximateByteSize()>0){const p=s.K_.get(d);p&&s.K_.set(d,p.withResumeToken(l.resumeToken,o))}}),c.targetMismatches.forEach((l,d)=>{const p=s.K_.get(l);if(!p)return;s.K_.set(l,p.withResumeToken(De.EMPTY_BYTE_STRING,p.snapshotVersion)),Hg(s,l);const m=new Bt(p.target,l,d,p.sequenceNumber);fu(s,m)}),s.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){M(or,"Failed to raise snapshot:",r),await oa(n,r)}}async function oa(n,e,t){if(!Rn(e))throw e;n.W_.add(1),await Vs(n),n.j_.set("Offline"),t||(t=()=>jg(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{M(or,"Retrying IndexedDB access"),await t(),n.W_.delete(1),await $a(n)})}function Qg(n,e){return e().catch(t=>oa(n,t,e))}async function Os(n){const e=ne(n),t=bn(e);let r=e.U_.length>0?e.U_[e.U_.length-1].batchId:Wn;for(;aA(e);)try{const i=await jT(e.localStore,r);if(i===null){e.U_.length===0&&t.P_();break}r=i.batchId,cA(e,i)}catch(i){await oa(e,i)}Yg(e)&&Jg(e)}function aA(n){return pr(n)&&n.U_.length<10}function cA(n,e){n.U_.push(e);const t=bn(n);t.c_()&&t.S_&&t.b_(e.mutations)}function Yg(n){return pr(n)&&!bn(n).u_()&&n.U_.length>0}function Jg(n){bn(n).start()}async function lA(n){bn(n).C_()}async function uA(n){const e=bn(n);for(const t of n.U_)e.b_(t.mutations)}async function dA(n,e,t){const r=n.U_.shift(),i=tu.from(r,e,t);await Qg(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await Os(n)}async function hA(n,e){e&&bn(n).S_&&await async function(r,i){if(function(o){return Kb(o)&&o!==x.ABORTED}(i.code)){const s=r.U_.shift();bn(r).h_(),await Qg(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await Os(r)}}(n,e),Yg(n)&&Jg(n)}async function kf(n,e){const t=ne(n);t.asyncQueue.verifyOperationInProgress(),M(or,"RemoteStore received new credentials");const r=pr(t);t.W_.add(3),await Vs(t),r&&t.j_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.W_.delete(3),await $a(t)}async function fA(n,e){const t=ne(n);e?(t.W_.delete(2),await $a(t)):e||(t.W_.add(2),await Vs(t),t.j_.set("Unknown"))}function gi(n){return n.J_||(n.J_=function(t,r,i){const s=ne(t);return s.M_(),new JT(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{xo:rA.bind(null,n),No:iA.bind(null,n),Lo:sA.bind(null,n),p_:oA.bind(null,n)}),n.G_.push(async e=>{e?(n.J_.h_(),mu(n)?pu(n):n.j_.set("Unknown")):(await n.J_.stop(),Wg(n))})),n.J_}function bn(n){return n.Y_||(n.Y_=function(t,r,i){const s=ne(t);return s.M_(),new XT(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{xo:()=>Promise.resolve(),No:lA.bind(null,n),Lo:hA.bind(null,n),D_:uA.bind(null,n),v_:dA.bind(null,n)}),n.G_.push(async e=>{e?(n.Y_.h_(),await Os(n)):(await n.Y_.stop(),n.U_.length>0&&(M(or,`Stopping write stream with ${n.U_.length} pending writes`),n.U_=[]))})),n.Y_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gu{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new Rt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){const o=Date.now()+r,c=new gu(e,t,o,i,s);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new $(x.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function _u(n,e){if(Ye("AsyncQueue",`${e}: ${n}`),Rn(n))return new $(x.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur{static emptySet(e){return new Ur(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||G.comparator(t.key,r.key):(t,r)=>G.comparator(t.key,r.key),this.keyedMap=ji(),this.sortedSet=new be(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Ur)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Ur;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Df{constructor(){this.Z_=new be(G.comparator)}track(e){const t=e.doc.key,r=this.Z_.get(t);r?e.type!==0&&r.type===3?this.Z_=this.Z_.insert(t,e):e.type===3&&r.type!==1?this.Z_=this.Z_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.Z_=this.Z_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.Z_=this.Z_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.Z_=this.Z_.remove(t):e.type===1&&r.type===2?this.Z_=this.Z_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.Z_=this.Z_.insert(t,{type:2,doc:e.doc}):W():this.Z_=this.Z_.insert(t,e)}X_(){const e=[];return this.Z_.inorderTraversal((t,r)=>{e.push(r)}),e}}class ri{constructor(e,t,r,i,s,o,c,l,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,i,s){const o=[];return t.forEach(c=>{o.push({type:0,doc:c})}),new ri(e,t,Ur.emptySet(t),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&xa(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pA{constructor(){this.ea=void 0,this.ta=[]}na(){return this.ta.some(e=>e.ra())}}class mA{constructor(){this.queries=Nf(),this.onlineState="Unknown",this.ia=new Set}terminate(){(function(t,r){const i=ne(t),s=i.queries;i.queries=Nf(),s.forEach((o,c)=>{for(const l of c.ta)l.onError(r)})})(this,new $(x.ABORTED,"Firestore shutting down"))}}function Nf(){return new Kt(n=>Qm(n),xa)}async function yu(n,e){const t=ne(n);let r=3;const i=e.query;let s=t.queries.get(i);s?!s.na()&&e.ra()&&(r=2):(s=new pA,r=e.ra()?0:1);try{switch(r){case 0:s.ea=await t.onListen(i,!0);break;case 1:s.ea=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(o){const c=_u(o,`Initialization of query '${Pr(e.query)}' failed`);return void e.onError(c)}t.queries.set(i,s),s.ta.push(e),e.sa(t.onlineState),s.ea&&e.oa(s.ea)&&Iu(t)}async function vu(n,e){const t=ne(n),r=e.query;let i=3;const s=t.queries.get(r);if(s){const o=s.ta.indexOf(e);o>=0&&(s.ta.splice(o,1),s.ta.length===0?i=e.ra()?0:1:!s.na()&&e.ra()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function gA(n,e){const t=ne(n);let r=!1;for(const i of e){const s=i.query,o=t.queries.get(s);if(o){for(const c of o.ta)c.oa(i)&&(r=!0);o.ea=i}}r&&Iu(t)}function _A(n,e,t){const r=ne(n),i=r.queries.get(e);if(i)for(const s of i.ta)s.onError(t);r.queries.delete(e)}function Iu(n){n.ia.forEach(e=>{e.next()})}var _l,xf;(xf=_l||(_l={}))._a="default",xf.Cache="cache";class wu{constructor(e,t,r){this.query=e,this.aa=t,this.ua=!1,this.ca=null,this.onlineState="Unknown",this.options=r||{}}oa(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new ri(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.ua?this.la(e)&&(this.aa.next(e),t=!0):this.ha(e,this.onlineState)&&(this.Pa(e),t=!0),this.ca=e,t}onError(e){this.aa.error(e)}sa(e){this.onlineState=e;let t=!1;return this.ca&&!this.ua&&this.ha(this.ca,e)&&(this.Pa(this.ca),t=!0),t}ha(e,t){if(!e.fromCache||!this.ra())return!0;const r=t!=="Offline";return(!this.options.Ta||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}la(e){if(e.docChanges.length>0)return!0;const t=this.ca&&this.ca.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}Pa(e){e=ri.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.ua=!0,this.aa.next(e)}ra(){return this.options.source!==_l.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xg{constructor(e){this.key=e}}class Zg{constructor(e){this.key=e}}class yA{constructor(e,t){this.query=e,this.fa=t,this.ga=null,this.hasCachedResults=!1,this.current=!1,this.pa=se(),this.mutatedKeys=se(),this.ya=Ym(e),this.wa=new Ur(this.ya)}get Sa(){return this.fa}ba(e,t){const r=t?t.Da:new Df,i=t?t.wa:this.wa;let s=t?t.mutatedKeys:this.mutatedKeys,o=i,c=!1;const l=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,d=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((p,m)=>{const w=i.get(p),A=Ns(this.query,m)?m:null,C=!!w&&this.mutatedKeys.has(w.key),k=!!A&&(A.hasLocalMutations||this.mutatedKeys.has(A.key)&&A.hasCommittedMutations);let P=!1;w&&A?w.data.isEqual(A.data)?C!==k&&(r.track({type:3,doc:A}),P=!0):this.va(w,A)||(r.track({type:2,doc:A}),P=!0,(l&&this.ya(A,l)>0||d&&this.ya(A,d)<0)&&(c=!0)):!w&&A?(r.track({type:0,doc:A}),P=!0):w&&!A&&(r.track({type:1,doc:w}),P=!0,(l||d)&&(c=!0)),P&&(A?(o=o.add(A),s=k?s.add(p):s.delete(p)):(o=o.delete(p),s=s.delete(p)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const p=this.query.limitType==="F"?o.last():o.first();o=o.delete(p.key),s=s.delete(p.key),r.track({type:1,doc:p})}return{wa:o,Da:r,ls:c,mutatedKeys:s}}va(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){const s=this.wa;this.wa=e.wa,this.mutatedKeys=e.mutatedKeys;const o=e.Da.X_();o.sort((p,m)=>function(A,C){const k=P=>{switch(P){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return W()}};return k(A)-k(C)}(p.type,m.type)||this.ya(p.doc,m.doc)),this.Ca(r),i=i!=null&&i;const c=t&&!i?this.Fa():[],l=this.pa.size===0&&this.current&&!i?1:0,d=l!==this.ga;return this.ga=l,o.length!==0||d?{snapshot:new ri(this.query,e.wa,s,o,e.mutatedKeys,l===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),Ma:c}:{Ma:c}}sa(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({wa:this.wa,Da:new Df,mutatedKeys:this.mutatedKeys,ls:!1},!1)):{Ma:[]}}xa(e){return!this.fa.has(e)&&!!this.wa.has(e)&&!this.wa.get(e).hasLocalMutations}Ca(e){e&&(e.addedDocuments.forEach(t=>this.fa=this.fa.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.fa=this.fa.delete(t)),this.current=e.current)}Fa(){if(!this.current)return[];const e=this.pa;this.pa=se(),this.wa.forEach(r=>{this.xa(r.key)&&(this.pa=this.pa.add(r.key))});const t=[];return e.forEach(r=>{this.pa.has(r)||t.push(new Zg(r))}),this.pa.forEach(r=>{e.has(r)||t.push(new Xg(r))}),t}Oa(e){this.fa=e.gs,this.pa=se();const t=this.ba(e.documents);return this.applyChanges(t,!0)}Na(){return ri.fromInitialDocuments(this.query,this.wa,this.mutatedKeys,this.ga===0,this.hasCachedResults)}}const Eu="SyncEngine";class vA{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class IA{constructor(e){this.key=e,this.Ba=!1}}class wA{constructor(e,t,r,i,s,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.La={},this.ka=new Kt(c=>Qm(c),xa),this.qa=new Map,this.Qa=new Set,this.$a=new be(G.comparator),this.Ua=new Map,this.Ka=new au,this.Wa={},this.Ga=new Map,this.za=sr.Kn(),this.onlineState="Unknown",this.ja=void 0}get isPrimaryClient(){return this.ja===!0}}async function EA(n,e,t=!0){const r=s_(n);let i;const s=r.ka.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.Na()):i=await e_(r,e,t,!0),i}async function bA(n,e){const t=s_(n);await e_(t,e,!0,!1)}async function e_(n,e,t,r){const i=await qT(n.localStore,ht(e)),s=i.targetId,o=n.sharedClientState.addLocalQueryTarget(s,t);let c;return r&&(c=await TA(n,e,s,o==="current",i.resumeToken)),n.isPrimaryClient&&t&&Kg(n.remoteStore,i),c}async function TA(n,e,t,r,i){n.Ha=(m,w,A)=>async function(k,P,B,D){let L=P.view.ba(B);L.ls&&(L=await Af(k.localStore,P.query,!1).then(({documents:T})=>P.view.ba(T,L)));const q=D&&D.targetChanges.get(P.targetId),V=D&&D.targetMismatches.get(P.targetId)!=null,F=P.view.applyChanges(L,k.isPrimaryClient,q,V);return Of(k,P.targetId,F.Ma),F.snapshot}(n,m,w,A);const s=await Af(n.localStore,e,!0),o=new yA(e,s.gs),c=o.ba(s.documents),l=xs.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),d=o.applyChanges(c,n.isPrimaryClient,l);Of(n,t,d.Ma);const p=new vA(e,t,o);return n.ka.set(e,p),n.qa.has(t)?n.qa.get(t).push(e):n.qa.set(t,[e]),d.snapshot}async function AA(n,e,t){const r=ne(n),i=r.ka.get(e),s=r.qa.get(i.targetId);if(s.length>1)return r.qa.set(i.targetId,s.filter(o=>!xa(o,e))),void r.ka.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await ml(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),t&&hu(r.remoteStore,i.targetId),yl(r,i.targetId)}).catch(hr)):(yl(r,i.targetId),await ml(r.localStore,i.targetId,!0))}async function RA(n,e){const t=ne(n),r=t.ka.get(e),i=t.qa.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),hu(t.remoteStore,r.targetId))}async function SA(n,e,t){const r=o_(n);try{const i=await function(o,c){const l=ne(o),d=Ae.now(),p=c.reduce((A,C)=>A.add(C.key),se());let m,w;return l.persistence.runTransaction("Locally write mutations","readwrite",A=>{let C=at(),k=se();return l.ds.getEntries(A,p).next(P=>{C=P,C.forEach((B,D)=>{D.isValidDocument()||(k=k.add(B))})}).next(()=>l.localDocuments.getOverlayedDocuments(A,C)).next(P=>{m=P;const B=[];for(const D of c){const L=zb(D,m.get(D.key).overlayedDocument);L!=null&&B.push(new Ht(D.key,L,$m(L.value.mapValue),nt.exists(!0)))}return l.mutationQueue.addMutationBatch(A,d,B,c)}).next(P=>{w=P;const B=P.applyToLocalDocumentSet(m,k);return l.documentOverlayCache.saveOverlays(A,P.batchId,B)})}).then(()=>({batchId:w.batchId,changes:Xm(m)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(o,c,l){let d=o.Wa[o.currentUser.toKey()];d||(d=new be(te)),d=d.insert(c,l),o.Wa[o.currentUser.toKey()]=d}(r,i.batchId,t),await Ls(r,i.changes),await Os(r.remoteStore)}catch(i){const s=_u(i,"Failed to persist write");t.reject(s)}}async function t_(n,e){const t=ne(n);try{const r=await BT(t.localStore,e);e.targetChanges.forEach((i,s)=>{const o=t.Ua.get(s);o&&(Q(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?o.Ba=!0:i.modifiedDocuments.size>0?Q(o.Ba):i.removedDocuments.size>0&&(Q(o.Ba),o.Ba=!1))}),await Ls(t,r,e)}catch(r){await hr(r)}}function Vf(n,e,t){const r=ne(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const i=[];r.ka.forEach((s,o)=>{const c=o.view.sa(e);c.snapshot&&i.push(c.snapshot)}),function(o,c){const l=ne(o);l.onlineState=c;let d=!1;l.queries.forEach((p,m)=>{for(const w of m.ta)w.sa(c)&&(d=!0)}),d&&Iu(l)}(r.eventManager,e),i.length&&r.La.p_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function PA(n,e,t){const r=ne(n);r.sharedClientState.updateQueryState(e,"rejected",t);const i=r.Ua.get(e),s=i&&i.key;if(s){let o=new be(G.comparator);o=o.insert(s,Pe.newNoDocument(s,Y.min()));const c=se().add(s),l=new La(Y.min(),new Map,new be(te),o,c);await t_(r,l),r.$a=r.$a.remove(s),r.Ua.delete(e),bu(r)}else await ml(r.localStore,e,!1).then(()=>yl(r,e,t)).catch(hr)}async function CA(n,e){const t=ne(n),r=e.batch.batchId;try{const i=await UT(t.localStore,e);r_(t,r,null),n_(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Ls(t,i)}catch(i){await hr(i)}}async function kA(n,e,t){const r=ne(n);try{const i=await function(o,c){const l=ne(o);return l.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let p;return l.mutationQueue.lookupMutationBatch(d,c).next(m=>(Q(m!==null),p=m.keys(),l.mutationQueue.removeMutationBatch(d,m))).next(()=>l.mutationQueue.performConsistencyCheck(d)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(d,p,c)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,p)).next(()=>l.localDocuments.getDocuments(d,p))})}(r.localStore,e);r_(r,e,t),n_(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Ls(r,i)}catch(i){await hr(i)}}function n_(n,e){(n.Ga.get(e)||[]).forEach(t=>{t.resolve()}),n.Ga.delete(e)}function r_(n,e,t){const r=ne(n);let i=r.Wa[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.Wa[r.currentUser.toKey()]=i}}function yl(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.qa.get(e))n.ka.delete(r),t&&n.La.Ja(r,t);n.qa.delete(e),n.isPrimaryClient&&n.Ka.br(e).forEach(r=>{n.Ka.containsKey(r)||i_(n,r)})}function i_(n,e){n.Qa.delete(e.path.canonicalString());const t=n.$a.get(e);t!==null&&(hu(n.remoteStore,t),n.$a=n.$a.remove(e),n.Ua.delete(t),bu(n))}function Of(n,e,t){for(const r of t)r instanceof Xg?(n.Ka.addReference(r.key,e),DA(n,r)):r instanceof Zg?(M(Eu,"Document no longer in limbo: "+r.key),n.Ka.removeReference(r.key,e),n.Ka.containsKey(r.key)||i_(n,r.key)):W()}function DA(n,e){const t=e.key,r=t.path.canonicalString();n.$a.get(t)||n.Qa.has(r)||(M(Eu,"New document in limbo: "+t),n.Qa.add(r),bu(n))}function bu(n){for(;n.Qa.size>0&&n.$a.size<n.maxConcurrentLimboResolutions;){const e=n.Qa.values().next().value;n.Qa.delete(e);const t=new G(fe.fromString(e)),r=n.za.next();n.Ua.set(r,new IA(t)),n.$a=n.$a.insert(t,r),Kg(n.remoteStore,new Bt(ht(Ds(t.path)),r,"TargetPurposeLimboResolution",dt.ae))}}async function Ls(n,e,t){const r=ne(n),i=[],s=[],o=[];r.ka.isEmpty()||(r.ka.forEach((c,l)=>{o.push(r.Ha(l,e,t).then(d=>{var p;if((d||t)&&r.isPrimaryClient){const m=d?!d.fromCache:(p=t?.targetChanges.get(l.targetId))===null||p===void 0?void 0:p.current;r.sharedClientState.updateQueryState(l.targetId,m?"current":"not-current")}if(d){i.push(d);const m=uu.Yi(l.targetId,d);s.push(m)}}))}),await Promise.all(o),r.La.p_(i),await async function(l,d){const p=ne(l);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>R.forEach(d,w=>R.forEach(w.Hi,A=>p.persistence.referenceDelegate.addReference(m,w.targetId,A)).next(()=>R.forEach(w.Ji,A=>p.persistence.referenceDelegate.removeReference(m,w.targetId,A)))))}catch(m){if(!Rn(m))throw m;M(du,"Failed to update sequence numbers: "+m)}for(const m of d){const w=m.targetId;if(!m.fromCache){const A=p.Ts.get(w),C=A.snapshotVersion,k=A.withLastLimboFreeSnapshotVersion(C);p.Ts=p.Ts.insert(w,k)}}}(r.localStore,s))}async function NA(n,e){const t=ne(n);if(!t.currentUser.isEqual(e)){M(Eu,"User change. New user:",e.toKey());const r=await $g(t.localStore,e);t.currentUser=e,function(s,o){s.Ga.forEach(c=>{c.forEach(l=>{l.reject(new $(x.CANCELLED,o))})}),s.Ga.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Ls(t,r.Rs)}}function xA(n,e){const t=ne(n),r=t.Ua.get(e);if(r&&r.Ba)return se().add(r.key);{let i=se();const s=t.qa.get(e);if(!s)return i;for(const o of s){const c=t.ka.get(o);i=i.unionWith(c.view.Sa)}return i}}function s_(n){const e=ne(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=t_.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=xA.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=PA.bind(null,e),e.La.p_=gA.bind(null,e.eventManager),e.La.Ja=_A.bind(null,e.eventManager),e}function o_(n){const e=ne(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=CA.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=kA.bind(null,e),e}class vs{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Ba(e.databaseInfo.databaseId),this.sharedClientState=this.Za(e),this.persistence=this.Xa(e),await this.persistence.start(),this.localStore=this.eu(e),this.gcScheduler=this.tu(e,this.localStore),this.indexBackfillerScheduler=this.nu(e,this.localStore)}tu(e,t){return null}nu(e,t){return null}eu(e){return Bg(this.persistence,new Ug,e.initialUser,this.serializer)}Xa(e){return new cu(Ua.ri,this.serializer)}Za(e){return new qg}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}vs.provider={build:()=>new vs};class VA extends vs{constructor(e){super(),this.cacheSizeBytes=e}tu(e,t){Q(this.persistence.referenceDelegate instanceof sa);const r=this.persistence.referenceDelegate.garbageCollector;return new Vg(r,e.asyncQueue,t)}Xa(e){const t=this.cacheSizeBytes!==void 0?qe.withCacheSize(this.cacheSizeBytes):qe.DEFAULT;return new cu(r=>sa.ri(r,t),this.serializer)}}class OA extends vs{constructor(e,t,r){super(),this.ru=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.ru.initialize(this,e),await o_(this.ru.syncEngine),await Os(this.ru.remoteStore),await this.persistence.Ci(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}eu(e){return Bg(this.persistence,new Ug,e.initialUser,this.serializer)}tu(e,t){const r=this.persistence.referenceDelegate.garbageCollector;return new Vg(r,e.asyncQueue,t)}nu(e,t){const r=new zE(t,this.persistence);return new qE(e.asyncQueue,r)}Xa(e){const t=OT(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?qe.withCacheSize(this.cacheSizeBytes):qe.DEFAULT;return new lu(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,YT(),No(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Za(e){return new qg}}class aa{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Vf(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=NA.bind(null,this.syncEngine),await fA(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new mA}()}createDatastore(e){const t=Ba(e.databaseInfo.databaseId),r=function(s){return new QT(s)}(e.databaseInfo);return function(s,o,c,l){return new eA(s,o,c,l)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,s,o,c){return new nA(r,i,s,o,c)}(this.localStore,this.datastore,e.asyncQueue,t=>Vf(this.syncEngine,t,0),function(){return Pf.D()?new Pf:new GT}())}createSyncEngine(e,t){return function(i,s,o,c,l,d,p){const m=new wA(i,s,o,c,l,d);return p&&(m.ja=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){const s=ne(i);M(or,"RemoteStore shutting down."),s.W_.add(5),await Vs(s),s.z_.shutdown(),s.j_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}aa.provider={build:()=>new aa};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Tu{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.iu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.iu(this.observer.error,e):Ye("Uncaught Error in snapshot listener:",e.toString()))}su(){this.muted=!0}iu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tn="FirestoreClient";class LA{constructor(e,t,r,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=Qe.UNAUTHENTICATED,this.clientId=_m.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async o=>{M(Tn,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(M(Tn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Rt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=_u(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Nc(n,e){n.asyncQueue.verifyOperationInProgress(),M(Tn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await $g(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Lf(n,e){n.asyncQueue.verifyOperationInProgress();const t=await MA(n);M(Tn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>kf(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>kf(e.remoteStore,i)),n._onlineComponents=e}async function MA(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){M(Tn,"Using user provided OfflineComponentProvider");try{await Nc(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(i){return i.name==="FirebaseError"?i.code===x.FAILED_PRECONDITION||i.code===x.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;as("Error using user provided cache. Falling back to memory cache: "+t),await Nc(n,new vs)}}else M(Tn,"Using default OfflineComponentProvider"),await Nc(n,new VA(void 0));return n._offlineComponents}async function a_(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(M(Tn,"Using user provided OnlineComponentProvider"),await Lf(n,n._uninitializedComponentsProvider._online)):(M(Tn,"Using default OnlineComponentProvider"),await Lf(n,new aa))),n._onlineComponents}function FA(n){return a_(n).then(e=>e.syncEngine)}async function ca(n){const e=await a_(n),t=e.eventManager;return t.onListen=EA.bind(null,e.syncEngine),t.onUnlisten=AA.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=bA.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=RA.bind(null,e.syncEngine),t}function UA(n,e,t={}){const r=new Rt;return n.asyncQueue.enqueueAndForget(async()=>function(s,o,c,l,d){const p=new Tu({next:w=>{p.su(),o.enqueueAndForget(()=>vu(s,m));const A=w.docs.has(c);!A&&w.fromCache?d.reject(new $(x.UNAVAILABLE,"Failed to get document because the client is offline.")):A&&w.fromCache&&l&&l.source==="server"?d.reject(new $(x.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(w)},error:w=>d.reject(w)}),m=new wu(Ds(c.path),p,{includeMetadataChanges:!0,Ta:!0});return yu(s,m)}(await ca(n),n.asyncQueue,e,t,r)),r.promise}function BA(n,e,t={}){const r=new Rt;return n.asyncQueue.enqueueAndForget(async()=>function(s,o,c,l,d){const p=new Tu({next:w=>{p.su(),o.enqueueAndForget(()=>vu(s,m)),w.fromCache&&l.source==="server"?d.reject(new $(x.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(w)},error:w=>d.reject(w)}),m=new wu(c,p,{includeMetadataChanges:!0,Ta:!0});return yu(s,m)}(await ca(n),n.asyncQueue,e,t,r)),r.promise}/**
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
 */function c_(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mf=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function l_(n,e,t){if(!t)throw new $(x.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function $A(n,e,t,r){if(e===!0&&r===!0)throw new $(x.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Ff(n){if(!G.isDocumentKey(n))throw new $(x.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Uf(n){if(G.isDocumentKey(n))throw new $(x.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function ja(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":W()}function St(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new $(x.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=ja(n);throw new $(x.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function jA(n,e){if(e<=0)throw new $(x.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qA="firestore.googleapis.com",Bf=!0;class $f{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new $(x.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=qA,this.ssl=Bf}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:Bf;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Cg;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<xg)throw new $(x.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}$A("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=c_((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new $(x.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new $(x.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new $(x.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Au{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new $f({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new $(x.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new $(x.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new $f(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new xE;switch(r.type){case"firstParty":return new LE(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new $(x.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Mf.get(t);r&&(M("ComponentProvider","Removing Datastore"),Mf.delete(t),r.terminate())}(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new xt(this.firestore,e,this._query)}}class Xe{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new yn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Xe(this.firestore,e,this._key)}}class yn extends xt{constructor(e,t,r){super(e,t,Ds(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Xe(this.firestore,null,new G(e))}withConverter(e){return new yn(this.firestore,e,this._path)}}function Ce(n,e,...t){if(n=we(n),l_("collection","path",e),n instanceof Au){const r=fe.fromString(e,...t);return Uf(r),new yn(n,null,r)}{if(!(n instanceof Xe||n instanceof yn))throw new $(x.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(fe.fromString(e,...t));return Uf(r),new yn(n.firestore,null,r)}}function ft(n,e,...t){if(n=we(n),arguments.length===1&&(e=_m.newId()),l_("doc","path",e),n instanceof Au){const r=fe.fromString(e,...t);return Ff(r),new Xe(n,null,new G(r))}{if(!(n instanceof Xe||n instanceof yn))throw new $(x.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(fe.fromString(e,...t));return Ff(r),new Xe(n.firestore,n instanceof yn?n.converter:null,new G(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jf="AsyncQueue";class qf{constructor(e=Promise.resolve()){this.Vu=[],this.mu=!1,this.fu=[],this.gu=null,this.pu=!1,this.yu=!1,this.wu=[],this.a_=new zg(this,"async_queue_retry"),this.Su=()=>{const r=No();r&&M(jf,"Visibility state changed to "+r.visibilityState),this.a_.t_()},this.bu=e;const t=No();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Su)}get isShuttingDown(){return this.mu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Du(),this.vu(e)}enterRestrictedMode(e){if(!this.mu){this.mu=!0,this.yu=e||!1;const t=No();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Su)}}enqueue(e){if(this.Du(),this.mu)return new Promise(()=>{});const t=new Rt;return this.vu(()=>this.mu&&this.yu?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Vu.push(e),this.Cu()))}async Cu(){if(this.Vu.length!==0){try{await this.Vu[0](),this.Vu.shift(),this.a_.reset()}catch(e){if(!Rn(e))throw e;M(jf,"Operation failed with retryable error: "+e)}this.Vu.length>0&&this.a_.Xo(()=>this.Cu())}}vu(e){const t=this.bu.then(()=>(this.pu=!0,e().catch(r=>{this.gu=r,this.pu=!1;const i=function(o){let c=o.message||"";return o.stack&&(c=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),c}(r);throw Ye("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.pu=!1,r))));return this.bu=t,t}enqueueAfterDelay(e,t,r){this.Du(),this.wu.indexOf(e)>-1&&(t=0);const i=gu.createAndSchedule(this,e,t,r,s=>this.Fu(s));return this.fu.push(i),i}Du(){this.gu&&W()}verifyOperationInProgress(){}async Mu(){let e;do e=this.bu,await e;while(e!==this.bu)}xu(e){for(const t of this.fu)if(t.timerId===e)return!0;return!1}Ou(e){return this.Mu().then(()=>{this.fu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.fu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Mu()})}Nu(e){this.wu.push(e)}Fu(e){const t=this.fu.indexOf(e);this.fu.splice(t,1)}}function zf(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const i=t;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(n,["next","error","complete"])}class ar extends Au{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new qf,this._persistenceKey=i?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new qf(e),this._firestoreClient=void 0,await e}}}function zA(n,e,t){t||(t=Yo);const r=ui(n,"firestore");if(r.isInitialized(t)){const i=r.getImmediate({identifier:t}),s=r.getOptions(t);if(rs(s,e))return i;throw new $(x.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new $(x.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<xg)throw new $(x.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return r.initialize({options:e,instanceIdentifier:t})}function qa(n){if(n._terminated)throw new $(x.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||GA(n),n._firestoreClient}function GA(n){var e,t,r;const i=n._freezeSettings(),s=function(c,l,d,p){return new vb(c,l,d,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,c_(p.experimentalLongPollingOptions),p.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new LA(n._authCredentials,n._appCheckCredentials,n._queue,s,n._componentsProvider&&function(c){const l=c?._online.build();return{_offline:c?._offline.build(l),_online:l}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ii{constructor(e){this._byteString=e}static fromBase64String(e){try{return new ii(De.fromBase64String(e))}catch(t){throw new $(x.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new ii(De.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class za{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new $(x.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Te(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ga{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ru{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new $(x.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new $(x.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return te(this._lat,e._lat)||te(this._long,e._long)}}/**
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
 */class Su{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KA=/^__.*__$/;class HA{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Ht(e,this.data,this.fieldMask,t,this.fieldTransforms):new mi(e,this.data,t,this.fieldTransforms)}}class u_{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Ht(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function d_(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw W()}}class Pu{constructor(e,t,r,i,s,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.Bu(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Lu(){return this.settings.Lu}ku(e){return new Pu(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}qu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.ku({path:r,Qu:!1});return i.$u(e),i}Uu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.ku({path:r,Qu:!1});return i.Bu(),i}Ku(e){return this.ku({path:void 0,Qu:!0})}Wu(e){return la(e,this.settings.methodName,this.settings.Gu||!1,this.path,this.settings.zu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Bu(){if(this.path)for(let e=0;e<this.path.length;e++)this.$u(this.path.get(e))}$u(e){if(e.length===0)throw this.Wu("Document fields must not be empty");if(d_(this.Lu)&&KA.test(e))throw this.Wu('Document fields cannot begin and end with "__"')}}class WA{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Ba(e)}ju(e,t,r,i=!1){return new Pu({Lu:e,methodName:t,zu:r,path:Te.emptyPath(),Qu:!1,Gu:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Ka(n){const e=n._freezeSettings(),t=Ba(n._databaseId);return new WA(n._databaseId,!!e.ignoreUndefinedProperties,t)}function QA(n,e,t,r,i,s={}){const o=n.ju(s.merge||s.mergeFields?2:0,e,t,i);ku("Data must be an object, but it was:",o,r);const c=f_(r,o);let l,d;if(s.merge)l=new tt(o.fieldMask),d=o.fieldTransforms;else if(s.mergeFields){const p=[];for(const m of s.mergeFields){const w=vl(e,m,t);if(!o.contains(w))throw new $(x.INVALID_ARGUMENT,`Field '${w}' is specified in your field mask but missing from your input data.`);m_(p,w)||p.push(w)}l=new tt(p),d=o.fieldTransforms.filter(m=>l.covers(m.field))}else l=null,d=o.fieldTransforms;return new HA(new ze(c),l,d)}class Ha extends Ga{_toFieldTransform(e){if(e.Lu!==2)throw e.Lu===1?e.Wu(`${this._methodName}() can only appear at the top level of your update data`):e.Wu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Ha}}class Cu extends Ga{constructor(e,t){super(e),this.Ju=t}_toFieldTransform(e){const t=new ti(e.serializer,tg(e.serializer,this.Ju));return new og(e.path,t)}isEqual(e){return e instanceof Cu&&this.Ju===e.Ju}}function YA(n,e,t,r){const i=n.ju(1,e,t);ku("Data must be an object, but it was:",i,r);const s=[],o=ze.empty();Sn(r,(l,d)=>{const p=Du(e,l,t);d=we(d);const m=i.Uu(p);if(d instanceof Ha)s.push(p);else{const w=Ms(d,m);w!=null&&(s.push(p),o.set(p,w))}});const c=new tt(s);return new u_(o,c,i.fieldTransforms)}function JA(n,e,t,r,i,s){const o=n.ju(1,e,t),c=[vl(e,r,t)],l=[i];if(s.length%2!=0)throw new $(x.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let w=0;w<s.length;w+=2)c.push(vl(e,s[w])),l.push(s[w+1]);const d=[],p=ze.empty();for(let w=c.length-1;w>=0;--w)if(!m_(d,c[w])){const A=c[w];let C=l[w];C=we(C);const k=o.Uu(A);if(C instanceof Ha)d.push(A);else{const P=Ms(C,k);P!=null&&(d.push(A),p.set(A,P))}}const m=new tt(d);return new u_(p,m,o.fieldTransforms)}function h_(n,e,t,r=!1){return Ms(t,n.ju(r?4:3,e))}function Ms(n,e){if(p_(n=we(n)))return ku("Unsupported field value:",e,n),f_(n,e);if(n instanceof Ga)return function(r,i){if(!d_(i.Lu))throw i.Wu(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Wu(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.Qu&&e.Lu!==4)throw e.Wu("Nested arrays are not supported");return function(r,i){const s=[];let o=0;for(const c of r){let l=Ms(c,i.Ku(o));l==null&&(l={nullValue:"NULL_VALUE"}),s.push(l),o++}return{arrayValue:{values:s}}}(n,e)}return function(r,i){if((r=we(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return tg(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=Ae.fromDate(r);return{timestampValue:ni(i.serializer,s)}}if(r instanceof Ae){const s=new Ae(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:ni(i.serializer,s)}}if(r instanceof Ru)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof ii)return{bytesValue:fg(i.serializer,r._byteString)};if(r instanceof Xe){const s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i.Wu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:iu(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof Su)return function(o,c){return{mapValue:{fields:{[Wl]:{stringValue:Ql},[Yr]:{arrayValue:{values:o.toArray().map(d=>{if(typeof d!="number")throw c.Wu("VectorValues must only contain numeric values.");return Xl(c.serializer,d)})}}}}}}(r,i);throw i.Wu(`Unsupported field value: ${ja(r)}`)}(n,e)}function f_(n,e){const t={};return Nm(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Sn(n,(r,i)=>{const s=Ms(i,e.qu(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function p_(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Ae||n instanceof Ru||n instanceof ii||n instanceof Xe||n instanceof Ga||n instanceof Su)}function ku(n,e,t){if(!p_(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){const r=ja(t);throw r==="an object"?e.Wu(n+" a custom object"):e.Wu(n+" "+r)}}function vl(n,e,t){if((e=we(e))instanceof za)return e._internalPath;if(typeof e=="string")return Du(n,e);throw la("Field path arguments must be of type string or ",n,!1,void 0,t)}const XA=new RegExp("[~\\*/\\[\\]]");function Du(n,e,t){if(e.search(XA)>=0)throw la(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new za(...e.split("."))._internalPath}catch{throw la(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function la(n,e,t,r,i){const s=r&&!r.isEmpty(),o=i!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(s||o)&&(l+=" (found",s&&(l+=` in field ${r}`),o&&(l+=` in document ${i}`),l+=")"),new $(x.INVALID_ARGUMENT,c+n+l)}function m_(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nu{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Xe(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new ZA(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Wa("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class ZA extends Nu{data(){return super.data()}}function Wa(n,e){return typeof e=="string"?Du(n,e):e instanceof za?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function g_(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new $(x.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class xu{}class Qa extends xu{}function vt(n,e,...t){let r=[];e instanceof xu&&r.push(e),r=r.concat(t),function(s){const o=s.filter(l=>l instanceof Vu).length,c=s.filter(l=>l instanceof Ya).length;if(o>1||o>0&&c>0)throw new $(x.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const i of r)n=i._apply(n);return n}class Ya extends Qa{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Ya(e,t,r)}_apply(e){const t=this._parse(e);return __(e._query,t),new xt(e.firestore,e.converter,al(e._query,t))}_parse(e){const t=Ka(e.firestore);return function(s,o,c,l,d,p,m){let w;if(d.isKeyField()){if(p==="array-contains"||p==="array-contains-any")throw new $(x.INVALID_ARGUMENT,`Invalid Query. You can't perform '${p}' queries on documentId().`);if(p==="in"||p==="not-in"){Kf(m,p);const C=[];for(const k of m)C.push(Gf(l,s,k));w={arrayValue:{values:C}}}else w=Gf(l,s,m)}else p!=="in"&&p!=="not-in"&&p!=="array-contains-any"||Kf(m,p),w=h_(c,o,m,p==="in"||p==="not-in");return ce.create(d,p,w)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function si(n,e,t){const r=e,i=Wa("where",n);return Ya._create(i,r,t)}class Vu extends xu{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Vu(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:ge.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(i,s){let o=i;const c=s.getFlattenedFilters();for(const l of c)__(o,l),o=al(o,l)}(e._query,t),new xt(e.firestore,e.converter,al(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Ou extends Qa{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Ou(e,t)}_apply(e){const t=function(i,s,o){if(i.startAt!==null)throw new $(x.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new $(x.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new _s(s,o)}(e._query,this._field,this._direction);return new xt(e.firestore,e.converter,function(i,s){const o=i.explicitOrderBy.concat([s]);return new fr(i.path,i.collectionGroup,o,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,t))}}function kt(n,e="asc"){const t=e,r=Wa("orderBy",n);return Ou._create(r,t)}class Lu extends Qa{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new Lu(e,t,r)}_apply(e){return new xt(e.firestore,e.converter,Zo(e._query,this._limit,this._limitType))}}function Dt(n){return jA("limit",n),Lu._create("limit",n,"F")}class Mu extends Qa{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new Mu(e,t,r)}_apply(e){const t=t0(e,this.type,this._docOrFields,this._inclusive);return new xt(e.firestore,e.converter,function(i,s){return new fr(i.path,i.collectionGroup,i.explicitOrderBy.slice(),i.filters.slice(),i.limit,i.limitType,s,i.endAt)}(e._query,t))}}function e0(...n){return Mu._create("startAfter",n,!1)}function t0(n,e,t,r){if(t[0]=we(t[0]),t[0]instanceof Nu)return function(s,o,c,l,d){if(!l)throw new $(x.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${c}().`);const p=[];for(const m of Fr(s))if(m.field.isKeyField())p.push(tr(o,l.key));else{const w=l.data.field(m.field);if(ka(w))throw new $(x.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+m.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(w===null){const A=m.field.canonicalString();throw new $(x.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${A}' (used as the orderBy) does not exist.`)}p.push(w)}return new En(p,d)}(n._query,n.firestore._databaseId,e,t[0]._document,r);{const i=Ka(n.firestore);return function(o,c,l,d,p,m){const w=o.explicitOrderBy;if(p.length>w.length)throw new $(x.INVALID_ARGUMENT,`Too many arguments provided to ${d}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const A=[];for(let C=0;C<p.length;C++){const k=p[C];if(w[C].field.isKeyField()){if(typeof k!="string")throw new $(x.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${d}(), but got a ${typeof k}`);if(!Jl(o)&&k.indexOf("/")!==-1)throw new $(x.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${d}() must be a plain document ID, but '${k}' contains a slash.`);const P=o.path.child(fe.fromString(k));if(!G.isDocumentKey(P))throw new $(x.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${d}() must result in a valid document path, but '${P}' is not because it contains an odd number of segments.`);const B=new G(P);A.push(tr(c,B))}else{const P=h_(l,d,k);A.push(P)}}return new En(A,m)}(n._query,n.firestore._databaseId,i,e,t,r)}}function Gf(n,e,t){if(typeof(t=we(t))=="string"){if(t==="")throw new $(x.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Jl(e)&&t.indexOf("/")!==-1)throw new $(x.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(fe.fromString(t));if(!G.isDocumentKey(r))throw new $(x.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return tr(n,new G(r))}if(t instanceof Xe)return tr(n,t._key);throw new $(x.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ja(t)}.`)}function Kf(n,e){if(!Array.isArray(n)||n.length===0)throw new $(x.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function __(n,e){const t=function(i,s){for(const o of i)for(const c of o.getFlattenedFilters())if(s.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new $(x.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new $(x.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class n0{convertValue(e,t="none"){switch(In(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Ee(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Gt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw W()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Sn(e,(i,s)=>{r[i]=this.convertValue(s,t)}),r}convertVectorValue(e){var t,r,i;const s=(i=(r=(t=e.fields)===null||t===void 0?void 0:t[Yr].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(o=>Ee(o.doubleValue));return new Su(s)}convertGeoPoint(e){return new Ru(Ee(e.latitude),Ee(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Da(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(ps(e));default:return null}}convertTimestamp(e){const t=zt(e);return new Ae(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=fe.fromString(e);Q(bg(r));const i=new er(r.get(1),r.get(3)),s=new G(r.popFirst(5));return i.isEqual(t)||Ye(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function r0(n,e,t){let r;return r=n?n.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gi{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class y_ extends Nu{constructor(e,t,r,i,s,o){super(e,t,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new xo(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Wa("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class xo extends y_{data(e={}){return super.data(e)}}class v_{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new Gi(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new xo(this._firestore,this._userDataWriter,r.key,r,new Gi(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new $(x.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(c=>{const l=new xo(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Gi(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(c=>s||c.type!==3).map(c=>{const l=new xo(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Gi(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);let d=-1,p=-1;return c.type!==0&&(d=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),p=o.indexOf(c.doc.key)),{type:i0(c.type),doc:l,oldIndex:d,newIndex:p}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function i0(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return W()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function I_(n){n=St(n,Xe);const e=St(n.firestore,ar);return UA(qa(e),n._key).then(t=>E_(e,n,t))}class Fu extends n0{constructor(e){super(),this.firestore=e}convertBytes(e){return new ii(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Xe(this.firestore,null,t)}}function cr(n){n=St(n,xt);const e=St(n.firestore,ar),t=qa(e),r=new Fu(e);return g_(n._query),BA(t,n._query).then(i=>new v_(e,r,n,i))}function Wt(n,e,t,...r){n=St(n,Xe);const i=St(n.firestore,ar),s=Ka(i);let o;return o=typeof(e=we(e))=="string"||e instanceof za?JA(s,"updateDoc",n._key,e,t,r):YA(s,"updateDoc",n._key,e),w_(i,[o.toMutation(n._key,nt.exists(!0))])}function Qt(n,e){const t=St(n.firestore,ar),r=ft(n),i=r0(n.converter,e);return w_(t,[QA(Ka(n.firestore),"addDoc",r._key,i,n.converter!==null,{}).toMutation(r._key,nt.exists(!1))]).then(()=>r)}function Fs(n,...e){var t,r,i;n=we(n);let s={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||zf(e[o])||(s=e[o],o++);const c={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(zf(e[o])){const m=e[o];e[o]=(t=m.next)===null||t===void 0?void 0:t.bind(m),e[o+1]=(r=m.error)===null||r===void 0?void 0:r.bind(m),e[o+2]=(i=m.complete)===null||i===void 0?void 0:i.bind(m)}let l,d,p;if(n instanceof Xe)d=St(n.firestore,ar),p=Ds(n._key.path),l={next:m=>{e[o]&&e[o](E_(d,n,m))},error:e[o+1],complete:e[o+2]};else{const m=St(n,xt);d=St(m.firestore,ar),p=m._query;const w=new Fu(d);l={next:A=>{e[o]&&e[o](new v_(d,w,m,A))},error:e[o+1],complete:e[o+2]},g_(n._query)}return function(w,A,C,k){const P=new Tu(k),B=new wu(A,P,C);return w.asyncQueue.enqueueAndForget(async()=>yu(await ca(w),B)),()=>{P.su(),w.asyncQueue.enqueueAndForget(async()=>vu(await ca(w),B))}}(qa(d),p,c,l)}function w_(n,e){return function(r,i){const s=new Rt;return r.asyncQueue.enqueueAndForget(async()=>SA(await FA(r),i,s)),s.promise}(qa(n),e)}function E_(n,e,t){const r=t.docs.get(e._key),i=new Fu(n);return new y_(n,i,e._key,r,new Gi(t.hasPendingWrites,t.fromCache),e.converter)}class s0{constructor(e){let t;this.kind="persistent",e?.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=b_(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}function o0(n){return new s0(n)}class a0{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=aa.provider,this._offlineComponentProvider={build:t=>new OA(t,e?.cacheSizeBytes,this.forceOwnership)}}}function b_(n){return new a0(n?.forceOwnership)}function Pn(n){return new Cu("increment",n)}(function(e,t=!0){(function(i){pi=i})(di),jt(new Pt("firestore",(r,{instanceIdentifier:i,options:s})=>{const o=r.getProvider("app").getImmediate(),c=new ar(new VE(r.getProvider("auth-internal")),new ME(o,r.getProvider("app-check-internal")),function(d,p){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new $(x.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new er(d.options.projectId,p)}(o,i),o);return s=Object.assign({useFetchStreams:t},s),c._setSettings(s),c},"PUBLIC").setMultipleInstances(!0)),_t(Rh,Sh,e),_t(Rh,Sh,"esm2017")})();var c0="firebase",l0="11.3.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */_t(c0,l0,"app");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Il=new Map,T_={activated:!1,tokenObservers:[]},u0={initialized:!1,enabled:!1};function xe(n){return Il.get(n)||Object.assign({},T_)}function d0(n,e){return Il.set(n,e),Il.get(n)}function Ja(){return u0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const A_="https://content-firebaseappcheck.googleapis.com/v1",h0="exchangeRecaptchaV3Token",f0="exchangeDebugToken",Hf={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:16*60*1e3},p0=24*60*60*1e3;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class m0{constructor(e,t,r,i,s){if(this.operation=e,this.retryPolicy=t,this.getWaitDuration=r,this.lowerBound=i,this.upperBound=s,this.pending=null,this.nextErrorWaitInterval=i,i>s)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new ns,this.pending.promise.catch(t=>{}),await g0(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new ns,this.pending.promise.catch(t=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(t){this.retryPolicy(t)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const t=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),t}}}function g0(n){return new Promise(e=>{setTimeout(e,n)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _0={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.",throttled:"Requests throttled due to {$httpStatus} error. Attempts allowed again after {$time}"},rt=new li("appCheck","AppCheck",_0);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wf(n=!1){var e;return n?(e=self.grecaptcha)===null||e===void 0?void 0:e.enterprise:self.grecaptcha}function Uu(n){if(!xe(n).activated)throw rt.create("use-before-activation",{appName:n.name})}function R_(n){const e=Math.round(n/1e3),t=Math.floor(e/(3600*24)),r=Math.floor((e-t*3600*24)/3600),i=Math.floor((e-t*3600*24-r*3600)/60),s=e-t*3600*24-r*3600-i*60;let o="";return t&&(o+=ho(t)+"d:"),r&&(o+=ho(r)+"h:"),o+=ho(i)+"m:"+ho(s)+"s",o}function ho(n){return n===0?"00":n>=10?n.toString():"0"+n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bu({url:n,body:e},t){const r={"Content-Type":"application/json"},i=t.getImmediate({optional:!0});if(i){const m=await i.getHeartbeatsHeader();m&&(r["X-Firebase-Client"]=m)}const s={method:"POST",body:JSON.stringify(e),headers:r};let o;try{o=await fetch(n,s)}catch(m){throw rt.create("fetch-network-error",{originalErrorMessage:m?.message})}if(o.status!==200)throw rt.create("fetch-status-error",{httpStatus:o.status});let c;try{c=await o.json()}catch(m){throw rt.create("fetch-parse-error",{originalErrorMessage:m?.message})}const l=c.ttl.match(/^([\d.]+)(s)$/);if(!l||!l[2]||isNaN(Number(l[1])))throw rt.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${c.ttl}`});const d=Number(l[1])*1e3,p=Date.now();return{token:c.token,expireTimeMillis:p+d,issuedAtTimeMillis:p}}function y0(n,e){const{projectId:t,appId:r,apiKey:i}=n.options;return{url:`${A_}/projects/${t}/apps/${r}:${h0}?key=${i}`,body:{recaptcha_v3_token:e}}}function S_(n,e){const{projectId:t,appId:r,apiKey:i}=n.options;return{url:`${A_}/projects/${t}/apps/${r}:${f0}?key=${i}`,body:{debug_token:e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const v0="firebase-app-check-database",I0=1,Is="firebase-app-check-store",P_="debug-token";let fo=null;function C_(){return fo||(fo=new Promise((n,e)=>{try{const t=indexedDB.open(v0,I0);t.onsuccess=r=>{n(r.target.result)},t.onerror=r=>{var i;e(rt.create("storage-open",{originalErrorMessage:(i=r.target.error)===null||i===void 0?void 0:i.message}))},t.onupgradeneeded=r=>{const i=r.target.result;switch(r.oldVersion){case 0:i.createObjectStore(Is,{keyPath:"compositeKey"})}}}catch(t){e(rt.create("storage-open",{originalErrorMessage:t?.message}))}}),fo)}function w0(n){return D_(N_(n))}function E0(n,e){return k_(N_(n),e)}function b0(n){return k_(P_,n)}function T0(){return D_(P_)}async function k_(n,e){const r=(await C_()).transaction(Is,"readwrite"),s=r.objectStore(Is).put({compositeKey:n,value:e});return new Promise((o,c)=>{s.onsuccess=l=>{o()},r.onerror=l=>{var d;c(rt.create("storage-set",{originalErrorMessage:(d=l.target.error)===null||d===void 0?void 0:d.message}))}})}async function D_(n){const t=(await C_()).transaction(Is,"readonly"),i=t.objectStore(Is).get(n);return new Promise((s,o)=>{i.onsuccess=c=>{const l=c.target.result;s(l?l.value:void 0)},t.onerror=c=>{var l;o(rt.create("storage-get",{originalErrorMessage:(l=c.target.error)===null||l===void 0?void 0:l.message}))}})}function N_(n){return`${n.options.appId}-${n.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ws=new Ia("@firebase/app-check");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function A0(n){if(va()){let e;try{e=await w0(n)}catch(t){ws.warn(`Failed to read token from IndexedDB. Error: ${t}`)}return e}}function xc(n,e){return va()?E0(n,e).catch(t=>{ws.warn(`Failed to write token to IndexedDB. Error: ${t}`)}):Promise.resolve()}async function R0(){let n;try{n=await T0()}catch{}if(n)return n;{const e=crypto.randomUUID();return b0(e).catch(t=>ws.warn(`Failed to persist debug token to IndexedDB. Error: ${t}`)),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $u(){return Ja().enabled}async function ju(){const n=Ja();if(n.enabled&&n.token)return n.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function S0(){const n=Ip(),e=Ja();if(e.initialized=!0,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&n.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const t=new ns;e.token=t,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?t.resolve(n.FIREBASE_APPCHECK_DEBUG_TOKEN):t.resolve(R0())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P0={error:"UNKNOWN_ERROR"};function C0(n){return Cl.encodeString(JSON.stringify(n),!1)}async function wl(n,e=!1){const t=n.app;Uu(t);const r=xe(t);let i=r.token,s;if(i&&!Vr(i)&&(r.token=void 0,i=void 0),!i){const l=await r.cachedTokenPromise;l&&(Vr(l)?i=l:await xc(t,void 0))}if(!e&&i&&Vr(i))return{token:i.token};let o=!1;if($u()){r.exchangeTokenPromise||(r.exchangeTokenPromise=Bu(S_(t,await ju()),n.heartbeatServiceProvider).finally(()=>{r.exchangeTokenPromise=void 0}),o=!0);const l=await r.exchangeTokenPromise;return await xc(t,l),r.token=l,{token:l.token}}try{r.exchangeTokenPromise||(r.exchangeTokenPromise=r.provider.getToken().finally(()=>{r.exchangeTokenPromise=void 0}),o=!0),i=await xe(t).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"?ws.warn(l.message):ws.error(l),s=l}let c;return i?s?Vr(i)?c={token:i.token,internalError:s}:c=Yf(s):(c={token:i.token},r.token=i,await xc(t,i)):c=Yf(s),o&&O_(t,c),c}async function k0(n){const e=n.app;Uu(e);const{provider:t}=xe(e);if($u()){const r=await ju(),{token:i}=await Bu(S_(e,r),n.heartbeatServiceProvider);return{token:i}}else{const{token:r}=await t.getToken();return{token:r}}}function x_(n,e,t,r){const{app:i}=n,s=xe(i),o={next:t,error:r,type:e};if(s.tokenObservers=[...s.tokenObservers,o],s.token&&Vr(s.token)){const c=s.token;Promise.resolve().then(()=>{t({token:c.token}),Qf(n)}).catch(()=>{})}s.cachedTokenPromise.then(()=>Qf(n))}function V_(n,e){const t=xe(n),r=t.tokenObservers.filter(i=>i.next!==e);r.length===0&&t.tokenRefresher&&t.tokenRefresher.isRunning()&&t.tokenRefresher.stop(),t.tokenObservers=r}function Qf(n){const{app:e}=n,t=xe(e);let r=t.tokenRefresher;r||(r=D0(n),t.tokenRefresher=r),!r.isRunning()&&t.isTokenAutoRefreshEnabled&&r.start()}function D0(n){const{app:e}=n;return new m0(async()=>{const t=xe(e);let r;if(t.token?r=await wl(n,!0):r=await wl(n),r.error)throw r.error;if(r.internalError)throw r.internalError},()=>!0,()=>{const t=xe(e);if(t.token){let r=t.token.issuedAtTimeMillis+(t.token.expireTimeMillis-t.token.issuedAtTimeMillis)*.5+3e5;const i=t.token.expireTimeMillis-5*60*1e3;return r=Math.min(r,i),Math.max(0,r-Date.now())}else return 0},Hf.RETRIAL_MIN_WAIT,Hf.RETRIAL_MAX_WAIT)}function O_(n,e){const t=xe(n).tokenObservers;for(const r of t)try{r.type==="EXTERNAL"&&e.error!=null?r.error(e.error):r.next(e)}catch{}}function Vr(n){return n.expireTimeMillis-Date.now()>0}function Yf(n){return{token:C0(P0),error:n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N0{constructor(e,t){this.app=e,this.heartbeatServiceProvider=t}_delete(){const{tokenObservers:e}=xe(this.app);for(const t of e)V_(this.app,t.next);return Promise.resolve()}}function x0(n,e){return new N0(n,e)}function V0(n){return{getToken:e=>wl(n,e),getLimitedUseToken:()=>k0(n),addTokenListener:e=>x_(n,"INTERNAL",e),removeTokenListener:e=>V_(n.app,e)}}const O0="@firebase/app-check",L0="0.8.11";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M0="https://www.google.com/recaptcha/api.js";function F0(n,e){const t=new ns,r=xe(n);r.reCAPTCHAState={initialized:t};const i=U0(n),s=Wf(!1);return s?Jf(n,e,s,i,t):j0(()=>{const o=Wf(!1);if(!o)throw new Error("no recaptcha");Jf(n,e,o,i,t)}),t.promise}function Jf(n,e,t,r,i){t.ready(()=>{$0(n,e,t,r),i.resolve(t)})}function U0(n){const e=`fire_app_check_${n.name}`,t=document.createElement("div");return t.id=e,t.style.display="none",document.body.appendChild(t),e}async function B0(n){Uu(n);const t=await xe(n).reCAPTCHAState.initialized.promise;return new Promise((r,i)=>{const s=xe(n).reCAPTCHAState;t.ready(()=>{r(t.execute(s.widgetId,{action:"fire_app_check"}))})})}function $0(n,e,t,r){const i=t.render(r,{sitekey:e,size:"invisible",callback:()=>{xe(n).reCAPTCHAState.succeeded=!0},"error-callback":()=>{xe(n).reCAPTCHAState.succeeded=!1}}),s=xe(n);s.reCAPTCHAState=Object.assign(Object.assign({},s.reCAPTCHAState),{widgetId:i})}function j0(n){const e=document.createElement("script");e.src=M0,e.onload=n,document.head.appendChild(e)}/**
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
 */class qu{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){var e,t,r;z0(this._throttleData);const i=await B0(this._app).catch(o=>{throw rt.create("recaptcha-error")});if(!(!((e=xe(this._app).reCAPTCHAState)===null||e===void 0)&&e.succeeded))throw rt.create("recaptcha-error");let s;try{s=await Bu(y0(this._app,i),this._heartbeatServiceProvider)}catch(o){throw!((t=o.code)===null||t===void 0)&&t.includes("fetch-status-error")?(this._throttleData=q0(Number((r=o.customData)===null||r===void 0?void 0:r.httpStatus),this._throttleData),rt.create("throttled",{time:R_(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):o}return this._throttleData=null,s}initialize(e){this._app=e,this._heartbeatServiceProvider=ui(e,"heartbeat"),F0(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof qu?this._siteKey===e._siteKey:!1}}function q0(n,e){if(n===404||n===403)return{backoffCount:1,allowRequestsAfter:Date.now()+p0,httpStatus:n};{const t=e?e.backoffCount:0,r=uv(t,1e3,2);return{backoffCount:t+1,allowRequestsAfter:Date.now()+r,httpStatus:n}}}function z0(n){if(n&&Date.now()-n.allowRequestsAfter<=0)throw rt.create("throttled",{time:R_(n.allowRequestsAfter-Date.now()),httpStatus:n.httpStatus})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function G0(n=Dl(),e){n=we(n);const t=ui(n,"app-check");if(Ja().initialized||S0(),$u()&&ju().then(i=>console.log(`App Check debug token: ${i}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(s.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&s.provider.isEqual(e.provider))return i;throw rt.create("already-initialized",{appName:n.name})}const r=t.initialize({options:e});return K0(n,e.provider,e.isTokenAutoRefreshEnabled),xe(n).isTokenAutoRefreshEnabled&&x_(r,"INTERNAL",()=>{}),r}function K0(n,e,t){const r=d0(n,Object.assign({},T_));r.activated=!0,r.provider=e,r.cachedTokenPromise=A0(n).then(i=>(i&&Vr(i)&&(r.token=i,O_(n,{token:i.token})),i)),r.isTokenAutoRefreshEnabled=t===void 0?n.automaticDataCollectionEnabled:t,r.provider.initialize(n)}const H0="app-check",Xf="app-check-internal";function W0(){jt(new Pt(H0,n=>{const e=n.getProvider("app").getImmediate(),t=n.getProvider("heartbeat");return x0(e,t)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((n,e,t)=>{n.getProvider(Xf).initialize()})),jt(new Pt(Xf,n=>{const e=n.getProvider("app-check").getImmediate();return V0(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),_t(O0,L0)}W0();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Q0="type.googleapis.com/google.protobuf.Int64Value",Y0="type.googleapis.com/google.protobuf.UInt64Value";function L_(n,e){const t={};for(const r in n)n.hasOwnProperty(r)&&(t[r]=e(n[r]));return t}function ua(n){if(n==null)return null;if(n instanceof Number&&(n=n.valueOf()),typeof n=="number"&&isFinite(n)||n===!0||n===!1||Object.prototype.toString.call(n)==="[object String]")return n;if(n instanceof Date)return n.toISOString();if(Array.isArray(n))return n.map(e=>ua(e));if(typeof n=="function"||typeof n=="object")return L_(n,e=>ua(e));throw new Error("Data cannot be encoded in JSON: "+n)}function oi(n){if(n==null)return n;if(n["@type"])switch(n["@type"]){case Q0:case Y0:{const e=Number(n.value);if(isNaN(e))throw new Error("Data cannot be decoded from JSON: "+n);return e}default:throw new Error("Data cannot be decoded from JSON: "+n)}return Array.isArray(n)?n.map(e=>oi(e)):typeof n=="function"||typeof n=="object"?L_(n,e=>oi(e)):n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zu="functions";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zf={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class it extends Nt{constructor(e,t,r){super(`${zu}/${e}`,t||""),this.details=r,Object.setPrototypeOf(this,it.prototype)}}function J0(n){if(n>=200&&n<300)return"ok";switch(n){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function da(n,e){let t=J0(n),r=t,i;try{const s=e&&e.error;if(s){const o=s.status;if(typeof o=="string"){if(!Zf[o])return new it("internal","internal");t=Zf[o],r=o}const c=s.message;typeof c=="string"&&(r=c),i=s.details,i!==void 0&&(i=oi(i))}}catch{}return t==="ok"?null:new it(t,r,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X0{constructor(e,t,r,i){this.app=e,this.auth=null,this.messaging=null,this.appCheck=null,this.serverAppAppCheckToken=null,ut(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.auth=t.getImmediate({optional:!0}),this.messaging=r.getImmediate({optional:!0}),this.auth||t.get().then(s=>this.auth=s,()=>{}),this.messaging||r.get().then(s=>this.messaging=s,()=>{}),this.appCheck||i?.get().then(s=>this.appCheck=s,()=>{})}async getAuthToken(){if(this.auth)try{const e=await this.auth.getToken();return e?.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(e){if(this.serverAppAppCheckToken)return this.serverAppAppCheckToken;if(this.appCheck){const t=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return t.error?null:t.token}return null}async getContext(e){const t=await this.getAuthToken(),r=await this.getMessagingToken(),i=await this.getAppCheckToken(e);return{authToken:t,messagingToken:r,appCheckToken:i}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const El="us-central1",Z0=/^data: (.*?)(?:\n|$)/;function eR(n){let e=null;return{promise:new Promise((t,r)=>{e=setTimeout(()=>{r(new it("deadline-exceeded","deadline-exceeded"))},n)}),cancel:()=>{e&&clearTimeout(e)}}}class tR{constructor(e,t,r,i,s=El,o=(...c)=>fetch(...c)){this.app=e,this.fetchImpl=o,this.emulatorOrigin=null,this.contextProvider=new X0(e,t,r,i),this.cancelAllRequests=new Promise(c=>{this.deleteService=()=>Promise.resolve(c())});try{const c=new URL(s);this.customDomain=c.origin+(c.pathname==="/"?"":c.pathname),this.region=El}catch{this.customDomain=null,this.region=s}}_delete(){return this.deleteService()}_url(e){const t=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${t}/${this.region}/${e}`:this.customDomain!==null?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`}}function nR(n,e,t){n.emulatorOrigin=`http://${e}:${t}`}function rR(n,e,t){const r=i=>sR(n,e,i,{});return r.stream=(i,s)=>aR(n,e,i,s),r}async function iR(n,e,t,r){t["Content-Type"]="application/json";let i;try{i=await r(n,{method:"POST",body:JSON.stringify(e),headers:t})}catch{return{status:0,json:null}}let s=null;try{s=await i.json()}catch{}return{status:i.status,json:s}}async function M_(n,e){const t={},r=await n.contextProvider.getContext(e.limitedUseAppCheckTokens);return r.authToken&&(t.Authorization="Bearer "+r.authToken),r.messagingToken&&(t["Firebase-Instance-ID-Token"]=r.messagingToken),r.appCheckToken!==null&&(t["X-Firebase-AppCheck"]=r.appCheckToken),t}function sR(n,e,t,r){const i=n._url(e);return oR(n,i,t,r)}async function oR(n,e,t,r){t=ua(t);const i={data:t},s=await M_(n,r),o=r.timeout||7e4,c=eR(o),l=await Promise.race([iR(e,i,s,n.fetchImpl),c.promise,n.cancelAllRequests]);if(c.cancel(),!l)throw new it("cancelled","Firebase Functions instance was deleted.");const d=da(l.status,l.json);if(d)throw d;if(!l.json)throw new it("internal","Response is not valid JSON object.");let p=l.json.data;if(typeof p>"u"&&(p=l.json.result),typeof p>"u")throw new it("internal","Response is missing data field.");return{data:oi(p)}}function aR(n,e,t,r){const i=n._url(e);return cR(n,i,t,r||{})}async function cR(n,e,t,r){var i;t=ua(t);const s={data:t},o=await M_(n,r);o["Content-Type"]="application/json",o.Accept="text/event-stream";let c;try{c=await n.fetchImpl(e,{method:"POST",body:JSON.stringify(s),headers:o,signal:r?.signal})}catch(A){if(A instanceof Error&&A.name==="AbortError"){const k=new it("cancelled","Request was cancelled.");return{data:Promise.reject(k),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(k)}}}}}}const C=da(0,null);return{data:Promise.reject(C),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(C)}}}}}}let l,d;const p=new Promise((A,C)=>{l=A,d=C});(i=r?.signal)===null||i===void 0||i.addEventListener("abort",()=>{const A=new it("cancelled","Request was cancelled.");d(A)});const m=c.body.getReader(),w=lR(m,l,d,r?.signal);return{stream:{[Symbol.asyncIterator](){const A=w.getReader();return{async next(){const{value:C,done:k}=await A.read();return{value:C,done:k}},async return(){return await A.cancel(),{done:!0,value:void 0}}}}},data:p}}function lR(n,e,t,r){const i=(o,c)=>{const l=o.match(Z0);if(!l)return;const d=l[1];try{const p=JSON.parse(d);if("result"in p){e(oi(p.result));return}if("message"in p){c.enqueue(oi(p.message));return}if("error"in p){const m=da(0,p);c.error(m),t(m);return}}catch(p){if(p instanceof it){c.error(p),t(p);return}}},s=new TextDecoder;return new ReadableStream({start(o){let c="";return l();async function l(){if(r?.aborted){const d=new it("cancelled","Request was cancelled");return o.error(d),t(d),Promise.resolve()}try{const{value:d,done:p}=await n.read();if(p){c.trim()&&i(c.trim(),o),o.close();return}if(r?.aborted){const w=new it("cancelled","Request was cancelled");o.error(w),t(w),await n.cancel();return}c+=s.decode(d,{stream:!0});const m=c.split(`
`);c=m.pop()||"";for(const w of m)w.trim()&&i(w.trim(),o);return l()}catch(d){const p=d instanceof it?d:da(0,null);o.error(p),t(p)}}},cancel(){return n.cancel()}})}const ep="@firebase/functions",tp="0.12.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uR="auth-internal",dR="app-check-internal",hR="messaging-internal";function fR(n){const e=(t,{instanceIdentifier:r})=>{const i=t.getProvider("app").getImmediate(),s=t.getProvider(uR),o=t.getProvider(hR),c=t.getProvider(dR);return new tR(i,s,o,c,r)};jt(new Pt(zu,e,"PUBLIC").setMultipleInstances(!0)),_t(ep,tp,n),_t(ep,tp,"esm2017")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pR(n=Dl(),e=El){const r=ui(we(n),zu).getImmediate({identifier:e}),i=Gy("functions");return i&&mR(r,...i),r}function mR(n,e,t){nR(we(n),e,t)}function F_(n,e,t){return rR(we(n),e)}fR();const gR={apiKey:"AIzaSyD9MJrON70mPqZxQqhndgQHNkTZUnnaQIs",authDomain:"altorra-cars.firebaseapp.com",databaseURL:"https://altorra-cars-default-rtdb.firebaseio.com",projectId:"altorra-cars",storageBucket:"altorra-cars.firebasestorage.app",messagingSenderId:"235148219730",appId:"1:235148219730:web:ceabdbc52fdcbe8b85168b",measurementId:"G-ZGZ6CVTB73"},_R="altorra-crm",Xa=Sp(gR,_R);G0(Xa,{provider:new qu("6Lfz8BQtAAAAAILjn8GbHFT8u6dpg5rFvg5hGZzS"),isTokenAutoRefreshEnabled:!0});const ha=kE(Xa),he=zA(Xa,{localCache:o0({tabManager:b_({})})}),U_=pR(Xa,"us-central1");function Br(n){const e=K.get().permissions||[];return e.includes("*")||e.includes(n)}function yR(n){return n?n.rol==="super_admin"||n.roleId==="system_super_admin"?["*"]:Array.isArray(n.permissions)&&n.permissions.length?n.permissions.slice():[]:[]}async function vR(n){try{const e=await I_(ft(he,"usuarios",n.uid)),t=e.exists()?e.data():null;K.set({user:n,profile:t,permissions:yR(t),ready:!0,authError:null})}catch(e){console.warn("[auth] no se pudo hidratar el perfil:",e),K.set({user:n,profile:null,permissions:[],ready:!0})}}function IR(){gw(ha,nm).catch(()=>{}),vw(ha,n=>{n?vR(n):K.set({user:null,profile:null,permissions:[],ready:!0})})}const wR={"auth/invalid-email":"Correo inválido.","auth/user-disabled":"Esta cuenta está deshabilitada.","auth/user-not-found":"No existe una cuenta con ese correo.","auth/wrong-password":"Contraseña incorrecta.","auth/invalid-credential":"Credenciales incorrectas.","auth/too-many-requests":"Demasiados intentos. Espera unos minutos.","auth/network-request-failed":"Sin conexión. Revisa tu internet."};async function ER(n,e){K.set({authError:null});try{await mw(ha,String(n).trim(),e)}catch(t){const r=wR[t&&t.code]||"No se pudo iniciar sesión.";throw K.set({authError:r}),t}}async function bR(){if(K.get().mock){K.set({user:null,profile:null,permissions:[]});return}await Iw(ha)}function Vc(){const{profile:n,user:e}=K.get();return n&&(n.nombre||n.roleName)||e&&(e.displayName||e.email)||"Usuario"}function TR(){const{profile:n}=K.get();return n&&(n.cargo||n.roleName)||"Asesor"}const AR=["bandeja","pipeline","agenda","reportes","contactos"];function B_(){const n=(location.hash||"").replace(/^#\/?/,""),[e]=n.split("/");return AR.includes(e)?e:"bandeja"}function RR(n){location.hash!==`#/${n}`&&(location.hash=`#/${n}`)}function SR(n){const e=()=>n(B_());return window.addEventListener("hashchange",e),()=>window.removeEventListener("hashchange",e)}function h(n,e={},t=[]){const r=document.createElement(n);for(const[i,s]of Object.entries(e))s==null||s===!1||(i==="class"?r.className=s:i==="html"?r.innerHTML=s:i==="text"?r.textContent=s:i==="dataset"?Object.assign(r.dataset,s):i==="style"&&typeof s=="object"?Object.assign(r.style,s):i.startsWith("on")&&typeof s=="function"?r.addEventListener(i.slice(2).toLowerCase(),s):r.setAttribute(i,s===!0?"":String(s)));for(const i of[].concat(t))i==null||i===!1||i===""||r.append(i.nodeType?i:document.createTextNode(String(i)));return r}function pe(n){for(;n&&n.firstChild;)n.removeChild(n.firstChild);return n}let $r=null;function $_(n){$r&&!$r.contains(n.target)&&fa()}function j_(n){n.key==="Escape"&&fa()}function fa(){$r&&($r.remove(),$r=null,document.removeEventListener("mousedown",$_,!0),window.removeEventListener("keydown",j_,!0))}function wt(n,e,t,r={}){fa();const i=h("div",{class:"popover",role:"menu"});r.title&&i.append(h("div",{class:"popover__title",text:r.title})),e.forEach(o=>{if(o.divider){i.append(h("div",{class:"popover__divider"}));return}const c=h("button",{class:"popover__item"+(o.active?" is-active":""),type:"button",role:"menuitem"},[o.icon?h("span",{class:"popover__icon",text:o.icon}):null,h("span",{class:"u-grow u-truncate",text:o.label}),o.hint?h("span",{class:"popover__hint u-caption",text:o.hint}):null]);c.addEventListener("click",l=>{l.stopPropagation(),fa(),t(o)}),i.append(c)}),document.body.append(i),PR(i,n),$r=i,setTimeout(()=>{document.addEventListener("mousedown",$_,!0),window.addEventListener("keydown",j_,!0)},0);const s=i.querySelector(".popover__item");s&&s.focus()}function PR(n,e){const t=e.getBoundingClientRect(),r=n.offsetWidth,i=n.offsetHeight;let s=t.bottom+6,o=t.right-r;o<8&&(o=8),o+r>window.innerWidth-8&&(o=window.innerWidth-r-8),s+i>window.innerHeight-8&&(s=t.top-i-6),n.style.top=`${Math.max(8,s)}px`,n.style.left=`${Math.max(8,o)}px`}function Us(n){const e=String(n||"").trim().split(/\s+/).filter(Boolean);return e.length?e.length===1?e[0].slice(0,2).toUpperCase():(e[0][0]+e[e.length-1][0]).toUpperCase():"?"}function CR(n){return String(n||"").replace(/\D/g,"")}function q_(n,e){const t=CR(n);if(!t)return"";const r=e?"?text="+encodeURIComponent(e):"";return"https://wa.me/"+t+r}function z_(n){if(!n)return 1/0;const e=new Date(n).getTime();return Number.isNaN(e)?1/0:Date.now()-e}function ai(n){const e=z_(n);return e===1/0?1/0:e/864e5}function Jn(n){const e=z_(n);if(e===1/0)return"—";const t=Math.floor(e/6e4);if(t<1)return"ahora";if(t<60)return`hace ${t} min`;const r=Math.floor(t/60);if(r<24)return`hace ${r} h`;const i=Math.floor(r/24);return i===1?"ayer":i<7?`hace ${i} d`:new Date(n).toLocaleDateString("es-CO",{day:"numeric",month:"short"})}function kR(n){if(!n)return"—";const e=new Date(n);return Number.isNaN(e.getTime())?"—":e.toLocaleString("es-CO",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}function Oc(n){const e=Math.abs(n),t=Math.round(e/6e4);if(t<60)return`${t} min`;const r=Math.floor(t/60),i=t%60;return i?`${r} h ${i} min`:`${r} h`}function Ki(n){const e=Number(n)||0;if(!e)return"";if(e>=1e6){const t=e/1e6;return"$"+(t%1?t.toFixed(1).replace(".",","):t.toFixed(0))+" M"}return e>=1e3?"$"+Math.round(e/1e3)+" K":"$"+e}function pa(n){return String(n||"").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu,"")}const DR="0.4.1",NR=[{id:"bandeja",label:"Bandeja",icon:"📥",ready:!0},{id:"pipeline",label:"Pipeline",icon:"🎯",ready:!0},{id:"agenda",label:"Agenda",icon:"📅",ready:!0},{id:"reportes",label:"Reportes",icon:"📊",ready:!0},{id:"contactos",label:"Contactos",icon:"👤",ready:!0}],Lc={bandeja:"Bandeja Inteligente",pipeline:"Pipeline de ventas",agenda:"Agenda",reportes:"Reportes y KPIs",contactos:"Contactos"};function xR(n){const e={},t=h("div",{class:"sidebar__brand"},[h("span",{class:"sidebar__logo",text:"ALTORRA"}),h("span",{class:"sidebar__sub u-caption",text:"CRM"})]),r=h("nav",{class:"sidebar__nav","aria-label":"Secciones"});NR.forEach(k=>{const P=h("button",{class:"navitem",type:"button",disabled:!k.ready},[h("span",{class:"navitem__icon","aria-hidden":"true",text:k.icon}),h("span",{class:"navitem__label",text:k.label}),k.ready?null:h("span",{class:"navitem__soon",text:"Pronto"})]);k.ready&&P.addEventListener("click",()=>RR(k.id)),e[k.id]=P,r.append(P)});const i=h("aside",{class:"sidebar"},[t,r,h("div",{class:"sidebar__foot u-caption u-faint"},[`v${DR} · Fase 4`])]),s=h("h1",{class:"topbar__h",text:Lc.bandeja}),o=h("span",{class:"topbar__crumb u-caption u-faint",text:K.get().mock?"modo demo":"tiempo real"}),c=h("div",{class:"topbar__title"},[s,o]),l=h("button",{class:"icon-btn",type:"button","aria-label":"Cambiar tema"},[h("span",{"aria-hidden":"true",text:K.get().theme==="dark"?"☀️":"🌙"})]);l.addEventListener("click",()=>{const k=Fy();l.firstChild.textContent=k==="dark"?"☀️":"🌙"});const d=h("button",{class:"usermenu",type:"button","aria-haspopup":"menu"},[h("span",{class:"avatar avatar--sm","aria-hidden":"true",text:Us(Vc())}),h("span",{class:"usermenu__meta"},[h("span",{class:"usermenu__name u-truncate",text:Vc()}),h("span",{class:"usermenu__role u-caption u-faint u-truncate",text:TR()})])]);d.addEventListener("click",()=>{wt(d,[{value:"logout",label:"Cerrar sesión",icon:"🚪"}],k=>{k.value==="logout"&&bR()},{title:Vc()})});const p=h("header",{class:"topbar"},[c,h("div",{class:"topbar__actions u-row"},[l,d])]),m=h("main",{class:"outlet",id:"outlet"}),w=h("div",{id:"detail-root"}),A=h("div",{class:"app-shell"},[i,h("div",{class:"app-main"},[p,m]),w]);pe(n),n.removeAttribute("aria-busy"),n.append(A);function C(k){Object.entries(e).forEach(([P,B])=>{const D=P===k;B.classList.toggle("is-active",D),D?B.setAttribute("aria-current","page"):B.removeAttribute("aria-current")}),s.textContent=Lc[k]||Lc.bandeja}return{outlet:m,detailRoot:w,setActive:C}}function VR(n){const e=h("input",{class:"input",type:"email",placeholder:"correo@altorracars.com",autocomplete:"username",required:!0,"aria-label":"Correo"}),t=h("input",{class:"input",type:"password",placeholder:"Contraseña",autocomplete:"current-password",required:!0,"aria-label":"Contraseña"}),r=h("div",{class:"login__error",role:"alert",hidden:!0}),i=h("button",{class:"btn btn--gold btn--block",type:"submit"},["Entrar"]),s=h("form",{class:"login__form"},[h("label",{class:"field"},[h("span",{class:"field__label",text:"Correo"}),e]),h("label",{class:"field"},[h("span",{class:"field__label",text:"Contraseña"}),t]),r,i]);s.addEventListener("submit",async c=>{c.preventDefault(),r.hidden=!0,i.disabled=!0,i.textContent="Entrando…";try{await ER(e.value,t.value)}catch{r.textContent=K.get().authError||"No se pudo iniciar sesión.",r.hidden=!1,i.disabled=!1,i.textContent="Entrar"}});const o=h("div",{class:"login surface"},[h("div",{class:"login__brand"},[h("span",{class:"login__logo",text:"ALTORRA"}),h("span",{class:"login__tag u-caption u-faint",text:"CRM · Bandeja Inteligente"})]),h("h1",{class:"login__title",text:"Bienvenido"}),h("p",{class:"login__lead u-muted",text:"Inicia sesión para gestionar tus clientes."}),s,h("div",{class:"login__foot u-caption u-faint",text:"Acceso restringido al equipo de Altorra Cars."})]);pe(n),n.removeAttribute("aria-busy"),n.append(h("div",{class:"login-wrap"},[o])),setTimeout(()=>e.focus(),50)}const OR=()=>document.getElementById("toast-root"),np={ok:"✓",error:"⚠",info:"ℹ"};function J(n,e="info",t=3200){const r=OR();if(!r)return;const i=document.createElement("div");i.className=`toast toast--${e}`,i.setAttribute("role",e==="error"?"alert":"status");const s=document.createElement("span");s.setAttribute("aria-hidden","true"),s.textContent=np[e]||np.info;const o=document.createElement("span");o.className="u-grow",o.textContent=n,i.append(s,o),r.appendChild(i);const c=()=>{i.classList.add("is-leaving"),i.addEventListener("animationend",()=>i.remove(),{once:!0})},l=setTimeout(c,t);i.addEventListener("click",()=>{clearTimeout(l),c()})}const LR=["financiacion","financiación","compra","test_drive","test-drive","cotizacion","cotización"],MR=["cita","test_drive","test-drive","visita","agendar","peritaje"],FR=["financiacion","financiación","consignacion","consignación","consignacion_venta","compra","venta","cotizacion","cotización"],UR=["pqr","reclamo","queja","peticion","petición","garantia","garantía","soporte"],BR={cita:{label:"Cita",icon:"📅",badge:"info"},solicitud:{label:"Solicitud",icon:"📝",badge:"gold"},pqr:{label:"PQR",icon:"⚠️",badge:"danger"},lead:{label:"Lead",icon:"✨",badge:""}};function Za(n){const e=String(n.sourceDetail||"").toLowerCase(),t=String(n.source||"").toLowerCase();let r="lead";return UR.some(i=>e.includes(i)||t.includes(i))?r="pqr":t.includes("cita")||MR.some(i=>e.includes(i))?r="cita":FR.some(i=>e.includes(i))&&(r="solicitud"),{type:r,...BR[r]}}function Gu(n){const e=String(n.sourceDetail||"").toLowerCase();return LR.some(t=>e.includes(t))||!!n.vehicleOfInterestId}const $R={whatsapp:{label:"WhatsApp",icon:"🟢"},facebook:{label:"Facebook",icon:"📘"},instagram:{label:"Instagram",icon:"📸"},tiktok:{label:"TikTok",icon:"🎵"},marketplace:{label:"Marketplace",icon:"🛒"},llamada:{label:"Llamada",icon:"📞"},presencial:{label:"Presencial",icon:"🏬"},referido:{label:"Referido",icon:"🤝"},bot:{label:"ALTOR Bot",icon:"🤖"},cuenta:{label:"Cuenta",icon:"👤"},newsletter:{label:"Newsletter",icon:"✉️"},cita:{label:"Cita web",icon:"📅"},web:{label:"Web",icon:"🌐"}};function Es(n){const e=String(n.source||"").toLowerCase();let t="web";return e.includes("whatsapp")||e.includes("wsp")||e.includes("wa.me")?t="whatsapp":e.includes("facebook")||e.includes("meta")||e==="fb"?t="facebook":e.includes("instagram")||e==="ig"?t="instagram":e.includes("tiktok")||e==="tt"?t="tiktok":e.includes("marketplace")||e.includes("mercadolibre")||e.includes("tucarro")?t="marketplace":e.includes("llamada")||e.includes("telefono")||e.includes("teléfono")||e.includes("call")?t="llamada":e.includes("presencial")||e.includes("walk")||e.includes("showroom")||e.includes("local")?t="presencial":e.includes("referido")||e.includes("referral")||e.includes("recomendado")?t="referido":e.includes("bot")||e.includes("concierge")||e.includes("altor")?t="bot":e.includes("cuenta")||e.includes("registro")||e.includes("account")||e.includes("signup")?t="cuenta":e.includes("news")||e.includes("subscri")||e.includes("suscri")?t="newsletter":e.includes("cita")&&(t="cita"),{key:t,...$R[t]}}const jR=[{id:"whatsapp",label:"WhatsApp",icon:"🟢"},{id:"facebook",label:"Facebook (Meta)",icon:"📘"},{id:"instagram",label:"Instagram",icon:"📸"},{id:"tiktok",label:"TikTok",icon:"🎵"},{id:"marketplace",label:"Marketplace",icon:"🛒"},{id:"llamada",label:"Llamada",icon:"📞"},{id:"presencial",label:"Presencial / Showroom",icon:"🏬"},{id:"referido",label:"Referido",icon:"🤝"},{id:"web",label:"Web (otro)",icon:"🌐"}],qR=[{id:"compra",label:"Compra"},{id:"financiacion",label:"Financiación"},{id:"cita",label:"Cita / Test drive"},{id:"consignacion_venta",label:"Vende su carro"},{id:"peritaje",label:"Peritaje"},{id:"consulta",label:"Consulta general"}],po={cita:30*60*1e3,pqr:60*60*1e3,solicitud:2*60*60*1e3,lead:24*60*60*1e3};function G_(n){const e=ci(n.status),{type:t}=Za(n);let r=n.slaDueAt?new Date(n.slaDueAt).getTime():null;r||(r=(n.createdAt?new Date(n.createdAt).getTime():Date.now())+(po[t]||po.lead));const i=r-Date.now(),s=po[t]||po.lead;let o="ok";return e?o="ok":i<=0?o="late":i<s*.25&&(o="warn"),{state:o,dueAt:r,remainingMs:i,closed:e}}const bl=[{id:"nuevo",label:"Nuevo",badge:"gold"},{id:"contactado",label:"Contactado",badge:"info"},{id:"convertido",label:"Convertido",badge:"ok"},{id:"descartado",label:"Descartado",badge:""}],zR=[{id:"inalcanzable",label:"Inalcanzable (no responde)"},{id:"no_califica",label:"No califica (sin presupuesto/intención)"},{id:"duplicado",label:"Duplicado"},{id:"ya_compro_en_otra_parte",label:"Ya compró en otra parte"},{id:"spam_prueba",label:"Spam / prueba"}],GR={calificado:{id:"calificado",label:"Calificado (v2)",badge:"ok"},no_calificado:{id:"no_calificado",label:"No calificado (v2)",badge:""},perdido:{id:"perdido",label:"Perdido (v2)",badge:"danger"}},KR=bl.reduce((n,e)=>(n[e.id]=e,n),{});function Vo(n){return KR[n]||GR[n]||{id:n||"nuevo",label:n||"Nuevo",badge:""}}function ci(n){return n==="convertido"||n==="descartado"||n==="perdido"||n==="no_calificado"}function K_(n){return!n.status||n.status==="nuevo"}const Tl={intent:.3,interactions:.18,recency:.22,frequency:.12,economic:.07,age:.06,engagement:.05},Gn=n=>Math.max(0,Math.min(1,n));function HR(n){const e=String(n.sourceDetail||"").toLowerCase();let t=.25;return Gu(n)?t=1:/(consignacion|consignación|peritaje|venta)/.test(e)?t=.6:(/(consulta|info|general)/.test(e)||!e)&&(t=.3),n.vehicleOfInterestId&&(t=Math.min(1,t+.15)),Gn(t)}function WR(n){let e=0;for(const t of n){const r=`${t.subject||""} ${t.body||""}`;if(!/financ/i.test(r))continue;const i=(r.match(/\d[\d.,]{5,}/g)||[]).map(s=>parseInt(s.replace(/\D/g,""),10)).filter(s=>s>0);i.length&&(e=Math.max(e,Math.max(...i)/5e7))}return Gn(e)}function QR(n){const e=new Set;for(const t of n){const r=t.createdAt;r&&(ai(r)>30||e.add(String(r).slice(0,10)))}return Gn(e.size/8)}function H_(n,e=[],t=null){const r=Array.isArray(e)?e:[],i={intent:HR(n),interactions:Gn(r.length/6),recency:n.lastActivityAt?Gn(1-ai(n.lastActivityAt)/30):0,frequency:QR(r),economic:WR(r),age:n.createdAt?Gn(ai(n.createdAt)/60):0,engagement:t&&Number(t.score)?Gn(t.score/100):0};let s=0;for(const c of Object.keys(Tl))s+=i[c]*Tl[c];const o=Math.round(s*100);return{score:o,rating:YR(o),factors:i}}function YR(n){return n>=70?"hot":n>=40?"warm":"cold"}const jr={hot:{label:"Caliente",icon:"🔥",cls:"temp--hot"},warm:{label:"Tibio",icon:"🌤️",cls:"temp--warm"},cold:{label:"Frío",icon:"❄️",cls:"temp--cold"}},rp={intent:"Intención",interactions:"Interacciones",recency:"Recencia",frequency:"Frecuencia",economic:"Capacidad econ.",age:"Antigüedad",engagement:"Engagement"},JR=Tl;function W_(n,e={}){const t=Number(e.score)||0,{type:r}=Za(n),i=ai(n.createdAt),s=ai(n.lastActivityAt),o=K_(n),c=ci(n.status),l=[{id:"confirm_appointment",priority:95,when:r==="cita"&&!c&&o,label:"Confirmar cita",reason:"Cita pendiente de confirmación",icon:"📅"},{id:"reach_hot_lead",priority:90,when:t>=70&&o&&!c,label:"Contactar ya",reason:"Lead caliente sin respuesta",icon:"🔥"},{id:"send_quote",priority:88,when:Gu(n)&&t>=55&&!c,label:"Enviar cotización",reason:"Interés de compra/financiación",icon:"🧾"},{id:"assign_asesor",priority:85,when:!n.ownerId&&!c,label:"Asignar asesor",reason:"Sin asesor asignado",icon:"🙋"},{id:"first_touch",priority:70,when:o&&i<2&&!c,label:"Primer contacto",reason:"Lead nuevo sin trabajar",icon:"👋"},{id:"whatsapp_followup",priority:60,when:t>=40&&t<70&&s>=2&&s<30&&!c,label:"Seguimiento WhatsApp",reason:"Lead tibio enfriándose",icon:"💬"},{id:"reactivate",priority:50,when:s>=30&&s!==1/0&&!c,label:"Reactivar con oferta",reason:"Inactivo +30 días",icon:"🎯"},{id:"nurture",priority:15,when:!c,label:"Nutrir relación",reason:"Sin acción urgente",icon:"🌱"},{id:"archived",priority:5,when:c,label:"Cerrado",reason:"Lead cerrado",icon:"✅"}],p=l.filter(m=>m.when).sort((m,w)=>w.priority-m.priority)[0]||l[l.length-1];return{id:p.id,label:p.label,reason:p.reason,icon:p.icon,priority:p.priority}}function Q_(n,e=[]){const{score:t,rating:r,factors:i}=H_(n,e,null);return{...n,_score:t,_rating:r,_factors:i,_type:Za(n),_channel:Es(n),_sla:G_(n),_nba:W_(n,{score:t})}}function mo(n){return n.map(e=>Q_(e))}const Al=[{id:"calientes",label:"Calientes sin contestar",icon:"🔥"},{id:"mios",label:"Mis asignados",icon:"👤"},{id:"sin_asignar",label:"Sin asignar",icon:"🆕"},{id:"todo",label:"Todo",icon:"📥"}];function Y_(n,e,t){switch(e){case"calientes":return K_(n)&&!ci(n.status)&&(n._rating==="hot"||Gu(n));case"mios":return n.ownerId===t;case"sin_asignar":return!n.ownerId&&!ci(n.status);case"todo":default:return!0}}function XR(n,e){const t={};for(const r of Al)t[r.id]=0;for(const r of n)for(const i of Al)Y_(r,i.id,e)&&t[i.id]++;return t}const go={late:0,warn:1,ok:2};function ZR(n,e){const t=n._sla&&n._sla.state||"ok",r=e._sla&&e._sla.state||"ok";return go[t]!==go[r]?go[t]-go[r]:e._score!==n._score?e._score-n._score:new Date(e.createdAt||0)-new Date(n.createdAt||0)}function eS(n,{type:e,channel:t,status:r}){return n.filter(i=>!(e&&i._type.type!==e||t&&i._channel.key!==t||r&&(i.status||"nuevo")!==r))}function tS(n,e){const t=pa(e).trim();return t?n.filter(r=>pa([r.fullName,r.email,r.phone,r.sourceDetail,r.source].join(" ")).includes(t)):n}function nS(n,e=Date.now()){if((n.status||"nuevo")!=="nuevo")return null;const t=new Date(n.createdAt||0).getTime();if(!t)return null;const r=Math.max(0,Math.floor((e-t)/6e4));return{mins:r,state:r>=60?"late":r>=45?"warn":"ok"}}function rS(n,{queue:e,uid:t,filters:r,search:i,showClosed:s=!1}){let o=n.filter(l=>Y_(l,e,t));o=eS(o,r),o=tS(o,i);let c=0;if(!s&&!r.status){const l=o.filter(d=>!ci(d.status)&&!d.archived);c=o.length-l.length,o=l}return o.sort(ZR),{rows:o,hiddenClosed:c}}const lr=()=>new Date().toISOString(),Ku=n=>({id:n.id,...n.data()});function iS({pageSize:n=40,onData:e,onError:t}){let r=null;const i=vt(Ce(he,"leads"),kt("createdAt","desc"),Dt(n));return{unsubscribe:Fs(i,o=>{const c=o.docs.map(Ku);r=o.docs[o.docs.length-1]||null,e(c,{hasMore:o.size>=n})},o=>{t&&t(o)}),getLastDoc:()=>r}}async function sS({pageSize:n=40,after:e}){if(!e)return{rows:[],lastDoc:null,hasMore:!1};const t=vt(Ce(he,"leads"),kt("createdAt","desc"),e0(e),Dt(n)),r=await cr(t);return{rows:r.docs.map(Ku),lastDoc:r.docs[r.docs.length-1]||null,hasMore:r.size>=n}}async function oS(){const e=(await cr(Ce(he,"usuarios"))).docs.map(t=>{const r=t.data();return{uid:t.id,nombre:r.nombre||r.email||"Usuario",cargo:r.cargo||r.roleName||""}}).sort((t,r)=>t.nombre.localeCompare(r.nombre,"es"));return K.set({team:e}),e}async function aS(n,e){await Wt(ft(he,"leads",n),{ownerId:e?e.uid:null,ownerName:e?e.nombre:null,updatedAt:lr(),updatedBy:ur(),_version:Pn(1)})}async function cS(n,e,t={},r={}){if(t&&t.convertedTo&&t.convertedTo.dealId)throw new Error("Este lead ya es un negocio: gestiónalo en el Pipeline.");const i=lr();await Wt(ft(he,"leads",n),{...r,status:e,lastActivityAt:i,updatedAt:i,updatedBy:ur(),_version:Pn(1)}),await Qt(Ce(he,"activities"),{type:"status_change",subject:"Cambio de estado → "+e,body:"",status:"closed",direction:"outbound",relatedTo:{type:"lead",id:n,name:t.fullName||""},ownerId:ur(),createdAt:i,_version:1})}async function ip(n,{type:e="nota",subject:t="",body:r="",direction:i="outbound",name:s=""}){await Qt(Ce(he,"activities"),{type:e,subject:t,body:r,status:"closed",direction:i,relatedTo:{type:"lead",id:n,name:s},ownerId:ur(),createdAt:lr(),_version:1})}async function lS(n,{subject:e,dueAt:t,name:r=""}){await Qt(Ce(he,"activities"),{type:"tarea",subject:e,body:"",status:"open",direction:"outbound",dueAt:t,relatedTo:{type:"lead",id:n,name:r},ownerId:ur(),createdAt:lr(),_version:1})}async function uS(){const n=new Date;n.setHours(23,59,59,999);const e=vt(Ce(he,"activities"),si("dueAt","<=",n.toISOString()),kt("dueAt","desc"),Dt(80));return(await cr(e)).docs.map(Ku).filter(r=>r.status==="open"&&(r.type==="tarea"||r.type==="cita")).sort((r,i)=>String(r.dueAt).localeCompare(String(i.dueAt)))}async function dS(n){await Wt(ft(he,"activities",n),{status:"closed",closedAt:lr(),closedBy:ur()})}async function hS(n,e=!0){await Wt(ft(he,"leads",n),{archived:e,archivedAt:e?lr():null,updatedAt:lr(),updatedBy:ur(),_version:Pn(1)})}async function fS(n){return(await F_(U_,"crmPurgeLead")({leadId:n})).data}function ur(){const n=K.get().user;return n?n.uid:null}async function pS(n){const e=K.get().user?K.get().user.uid:null,t=["manual",n.trafico,n.campana].filter(Boolean);return(await Qt(Ce(he,"solicitudes"),{nombre:n.nombre||"",email:(n.email||"").trim().toLowerCase(),telefono:n.telefono||"",prefijoPais:n.prefijoPais||"+57",origen:n.canal||"manual",tipo:n.interes||"consulta",vehiculoId:n.vehiculoId||null,kind:"lead",comentarios:n.notas||"",consentGiven:n.consentGiven===!0,tags:t,source:{page:"manual",campaign:n.campana||null,traffic:n.trafico||null},clientCategory:"manual",createdAt:new Date().toISOString(),_manual:!0,_createdByUid:e})).id}const Kn=n=>new Date(Date.now()-n*6e4).toISOString(),Se=n=>Kn(n*60),ie=n=>Kn(n*60*24),mS=[{uid:"u_ceo",nombre:"Rodrigo (CEO)",cargo:"CEO"},{uid:"u_ana",nombre:"Ana Restrepo",cargo:"Asesora comercial"},{uid:"u_luis",nombre:"Luis Pérez",cargo:"Asesor comercial"}],Hu=[{id:"l1",fullName:"María Fernanda Gómez",email:"mafe.gomez@gmail.com",phone:"+573012345678",source:"financiacion",sourceDetail:"financiacion",vehicleOfInterestId:"mazda-cx5-2021",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:Kn(-40),contactId:"email_mafe_gomez_gmail_com",createdAt:Kn(18),lastActivityAt:Kn(18),_version:1},{id:"l2",fullName:"Carlos Andrés Salcedo",email:"casalcedo@outlook.com",phone:"+573159876543",source:"cita",sourceDetail:"test_drive",vehicleOfInterestId:"toyota-corolla-2022",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:Kn(5),contactId:"email_casalcedo_outlook_com",createdAt:Se(1),lastActivityAt:Se(1),_version:1},{id:"l3",fullName:"Diana Ramírez",email:"diana.r@hotmail.com",phone:"+573201112233",source:"web",sourceDetail:"compra",vehicleOfInterestId:"chevrolet-tracker-2023",status:"contactado",rating:"cold",score:0,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:Se(-1),contactId:"email_diana_r_hotmail_com",createdAt:Se(5),lastActivityAt:Se(2),_version:2},{id:"l4",fullName:"Jhon Jairo Mosquera",email:"",phone:"+573044455667",source:"whatsapp",sourceDetail:"consulta",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:Se(-3),contactId:"phone_573044455667",createdAt:Se(8),lastActivityAt:Se(8),_version:1},{id:"l5",fullName:"Laura Valentina Ortiz",email:"lauraortiz@gmail.com",phone:"+573186677889",source:"bot",sourceDetail:"financiacion",vehicleOfInterestId:"kia-sportage-2022",status:"contactado",rating:"cold",score:0,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:ie(-1),contactId:"email_lauraortiz_gmail_com",createdAt:ie(1),lastActivityAt:Se(20),_version:3},{id:"l6",fullName:"Pedro Nel Arango",email:"pnarango@empresa.co",phone:"+573017788990",source:"cuenta",sourceDetail:"registro",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:ie(-1),contactId:"email_pnarango_empresa_co",createdAt:ie(2),lastActivityAt:ie(2),_version:1},{id:"l7",fullName:"Sofía Mejía",email:"sofia.mejia@gmail.com",phone:"+573123344556",source:"newsletter",sourceDetail:"suscripcion",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:ie(-3),contactId:"email_sofia_mejia_gmail_com",createdAt:ie(4),lastActivityAt:ie(4),_version:1},{id:"l8",fullName:"Andrés Felipe Cuesta",email:"afcuesta@gmail.com",phone:"+573009988776",source:"web",sourceDetail:"consignacion_venta",vehicleOfInterestId:null,status:"calificado",rating:"cold",score:0,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:ie(-2),contactId:"email_afcuesta_gmail_com",createdAt:ie(6),lastActivityAt:ie(1),_version:4},{id:"l9",fullName:"Catalina Ríos",email:"cata.rios@gmail.com",phone:"+573145566778",source:"web",sourceDetail:"peritaje",vehicleOfInterestId:"nissan-frontier-2020",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:ie(-10),contactId:"email_cata_rios_gmail_com",createdAt:ie(12),lastActivityAt:ie(35),_version:1},{id:"l10",fullName:"Gloria Patiño",email:"glopa@gmail.com",phone:"+573162233445",source:"web",sourceDetail:"reclamo",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:Se(-2),contactId:"email_glopa_gmail_com",createdAt:Se(3),lastActivityAt:Se(3),_version:1},{id:"l11",fullName:"Mauricio Bedoya",email:"mbedoya@gmail.com",phone:"+573024455661",source:"facebook",sourceDetail:"compra",vehicleOfInterestId:"mazda-cx5-2021",status:"convertido",rating:"hot",score:78,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:ie(9),contactId:"email_mbedoya_gmail_com",convertedTo:{dealId:"d6"},createdAt:ie(10),lastActivityAt:ie(3),_version:5},{id:"l12",fullName:"Yuliana Castaño",email:"yulycastano@gmail.com",phone:"+573135566779",source:"whatsapp",sourceDetail:"financiacion",vehicleOfInterestId:"toyota-hilux-2020",status:"convertido",rating:"hot",score:82,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:ie(14),contactId:"email_yulycastano_gmail_com",convertedTo:{dealId:"d7"},createdAt:ie(15),lastActivityAt:ie(5),_version:6},{id:"l13",fullName:"Hernán Darío Loaiza",email:"hdloaiza@gmail.com",phone:"+573017788123",source:"web",sourceDetail:"compra",vehicleOfInterestId:"renault-duster-2022",status:"perdido",rating:"warm",score:45,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:ie(19),contactId:"email_hdloaiza_gmail_com",createdAt:ie(20),lastActivityAt:ie(8),_version:3},{id:"l14",fullName:"Paola Andrea Suárez",email:"pasuarez@gmail.com",phone:"+573156677001",source:"newsletter",sourceDetail:"suscripcion",vehicleOfInterestId:null,status:"no_calificado",rating:"cold",score:12,ownerId:null,ownerName:null,slaDueAt:ie(24),contactId:"email_pasuarez_gmail_com",createdAt:ie(25),lastActivityAt:ie(25),_version:2},{id:"l15",fullName:"Julián Marín",email:"julianmarin@gmail.com",phone:"+573008811223",source:"referido",sourceDetail:"compra",vehicleOfInterestId:"nissan-frontier-2020",status:"convertido",rating:"hot",score:74,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:ie(21),contactId:"email_julianmarin_gmail_com",convertedTo:{dealId:"d8"},createdAt:ie(22),lastActivityAt:ie(9),_version:4}],gS={l1:[{id:"a1",type:"solicitud_inbound",subject:"Nueva solicitud: financiacion",body:"Quiero financiar la Mazda CX-5. Cuota inicial 25.000.000, ingresos 6.000.000 mensuales.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l1",name:"María Fernanda Gómez"},createdAt:Kn(18),_version:1}],l3:[{id:"a2",type:"solicitud_inbound",subject:"Nueva solicitud: compra",body:"Interesada en la Chevrolet Tracker.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:Se(5),_version:1},{id:"a3",type:"whatsapp",subject:"WhatsApp enviado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:Se(2),_version:1},{id:"a4",type:"status_change",subject:"Cambio de estado → contactado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:Se(2),_version:1}],l5:[{id:"a5",type:"solicitud_inbound",subject:"Nueva lead: financiacion",body:"Bot ALTOR: pregunta por financiación de la Kia Sportage.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},createdAt:ie(1),_version:1},{id:"a6",type:"whatsapp",subject:"WhatsApp enviado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},createdAt:Se(20),_version:1}]},bs={};Hu.forEach(n=>{const e=n.status==="convertido"?"customer":n.source==="newsletter"?"subscriber":"lead";bs[n.contactId]={id:n.contactId,fullName:n.fullName,email:n.email,phone:n.phone,type:e==="customer"?"cliente":"lead",source:n.source,score:0,rating:"cold",lifecycleStage:e,clienteUid:null,consent:{email:n.source!=="web",whatsapp:n.source!=="web",calls:!1,askedAt:n.createdAt,source:n.source,policyVersion:"v1"},doNotContact:n.source==="web",tags:[],createdAt:n.createdAt,lastActivityAt:n.lastActivityAt,_version:1}});bs.email_camila_lectora_gmail_com={id:"email_camila_lectora_gmail_com",fullName:"Camila Lectora",email:"camila.lectora@gmail.com",phone:"",type:"lead",source:"newsletter",score:0,rating:"cold",lifecycleStage:"subscriber",clienteUid:null,consent:{email:!0,whatsapp:!1,calls:!1,askedAt:ie(3),source:"newsletter",policyVersion:"v1"},doNotContact:!1,tags:["newsletter"],createdAt:ie(3),lastActivityAt:ie(3),_version:1};const Oo={},ma=()=>Hu.map(n=>({...n})),J_=()=>mS.map(n=>({...n})),_S=n=>(gS[n]||[]).map(e=>({...e})),yS=n=>bs[n]?{...bs[n]}:null,vS=()=>Object.values(bs).map(n=>({...n})),sp=n=>(Oo[n]||[]).map(e=>({...e}));function IS(n,e){Oo[n]||(Oo[n]=[]),Oo[n].unshift({id:"n"+Date.now(),...e})}let wS=100;const Zi=[{id:"d1",name:"Diana Ramírez · Chevrolet Tracker 2023",contactName:"Diana Ramírez",contactId:"email_diana_r_hotmail_com",leadId:"l3",vehicleId:"chevrolet-tracker-2023",vehicleName:"Chevrolet Tracker 2023",pipelineId:"ventas",stageId:"cuadrando_cita",stageName:"Cuadrando cita",status:"open",amount:82e6,currency:"COP",probability:.2,weightedAmount:164e5,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"web",lastActivityAt:Se(2),createdAt:Se(5),_version:2},{id:"d2",name:"Laura Valentina Ortiz · Kia Sportage 2022",contactName:"Laura Valentina Ortiz",contactId:"email_lauraortiz_gmail_com",leadId:"l5",vehicleId:"kia-sportage-2022",vehicleName:"Kia Sportage 2022",pipelineId:"ventas",stageId:"cita_fijada",stageName:"Cita fijada",status:"open",amount:95e6,currency:"COP",probability:.35,weightedAmount:3325e4,ownerId:"u_luis",ownerName:"Luis Pérez",source:"bot",lastActivityAt:Se(20),createdAt:ie(1),_version:3},{id:"d3",name:"Andrés Felipe Cuesta · Mazda 3 2021",contactName:"Andrés Felipe Cuesta",contactId:"email_afcuesta_gmail_com",leadId:"l8",vehicleId:"mazda-3-2021",vehicleName:"Mazda 3 2021",pipelineId:"ventas",stageId:"visita_test_drive",stageName:"Visita / Test drive",status:"open",amount:68e6,currency:"COP",probability:.5,weightedAmount:34e6,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"web",lastActivityAt:ie(18),createdAt:ie(20),_version:5},{id:"d4",name:"Roberto Gómez · Toyota Hilux 2020",contactName:"Roberto Gómez",contactId:"phone_573001239876",leadId:null,vehicleId:"toyota-hilux-2020",vehicleName:"Toyota Hilux 2020",pipelineId:"ventas",stageId:"negociacion",stageName:"Negociación",status:"open",amount:135e6,currency:"COP",probability:.7,weightedAmount:945e5,ownerId:"u_luis",ownerName:"Luis Pérez",source:"whatsapp",lastActivityAt:Se(6),createdAt:ie(8),_version:7},{id:"d5",name:"Sandra Milena Vélez · Renault Duster 2022",contactName:"Sandra Milena Vélez",contactId:"email_smvelez_gmail_com",leadId:null,vehicleId:"renault-duster-2022",vehicleName:"Renault Duster 2022",pipelineId:"ventas",stageId:"cuadrando_cita",stageName:"Cuadrando cita",status:"open",amount:0,currency:"COP",probability:.2,weightedAmount:0,ownerId:null,ownerName:null,source:"cuenta",lastActivityAt:Se(1),createdAt:Se(1),_version:1},{id:"d6",name:"Mauricio Bedoya · Mazda CX-5 2021",contactName:"Mauricio Bedoya",contactId:"email_mbedoya_gmail_com",leadId:"l11",vehicleId:"mazda-cx5-2021",vehicleName:"Mazda CX-5 2021",pipelineId:"ventas",stageId:"vendido",stageName:"Vendido",status:"won",amount:78e6,currency:"COP",probability:1,weightedAmount:78e6,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"facebook",lastActivityAt:ie(3),createdAt:ie(10),_version:6},{id:"d7",name:"Yuliana Castaño · Toyota Hilux 2020",contactName:"Yuliana Castaño",contactId:"email_yulycastano_gmail_com",leadId:"l12",vehicleId:"toyota-hilux-2020",vehicleName:"Toyota Hilux 2020",pipelineId:"ventas",stageId:"vendido",stageName:"Vendido",status:"won",amount:112e6,currency:"COP",probability:1,weightedAmount:112e6,ownerId:"u_luis",ownerName:"Luis Pérez",source:"whatsapp",lastActivityAt:ie(5),createdAt:ie(15),_version:7},{id:"d8",name:"Julián Marín · Nissan Frontier 2020",contactName:"Julián Marín",contactId:"email_julianmarin_gmail_com",leadId:"l15",vehicleId:"nissan-frontier-2020",vehicleName:"Nissan Frontier 2020",pipelineId:"ventas",stageId:"perdido",stageName:"Perdido",status:"lost",amount:64e6,currency:"COP",probability:0,weightedAmount:0,lostReason:"Compró en otro lado",ownerId:"u_luis",ownerName:"Luis Pérez",source:"referido",lastActivityAt:ie(9),createdAt:ie(22),_version:4}],X_=()=>Zi.map(n=>({...n}));function ES(n){const e="d"+ ++wS;return Zi.unshift({id:e,...n}),e}function bS(n,e){const t=Zi.findIndex(r=>r.id===n);t>=0&&(Zi[t]={...Zi[t],...e})}const Ln=(n,e=10,t=0)=>{const r=new Date;return r.setDate(r.getDate()+n),r.setHours(e,t,0,0),r.toISOString()},Rl=[{id:"ag1",type:"cita",subject:"Test drive Toyota Corolla",dueAt:Ln(1,10),relatedTo:{type:"lead",id:"l2",name:"Carlos Andrés Salcedo"},status:"open"},{id:"ag2",type:"cita",subject:"Visita showroom",dueAt:Ln(1,12),relatedTo:{type:"lead",id:"l1",name:"María Fernanda Gómez"},status:"open"},{id:"ag3",type:"cita",subject:"Cierre financiación",dueAt:Ln(1,15),relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},status:"open"},{id:"ag4",type:"cita",subject:"Llamada de seguimiento",dueAt:Ln(1,17),relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},status:"open"},{id:"ag5",type:"cita",subject:"Entrega de vehículo",dueAt:Ln(3,9),relatedTo:{type:"lead",id:"l8",name:"Andrés Felipe Cuesta"},status:"open"},{id:"ag6",type:"cita",subject:"Peritaje",dueAt:Ln(5,11),relatedTo:{type:"lead",id:"l9",name:"Catalina Ríos"},status:"open"},{id:"ag7",type:"cita",subject:"Negociación precio",dueAt:Ln(-2,16),relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},status:"open"}],TS=()=>Rl.map(n=>({...n}));function AS(n){Rl.push({id:"ag"+(Rl.length+1),...n})}let RS=100;function Z_(n){const e="lm"+ ++RS,t=new Date().toISOString(),r=(n.telefono||"").replace(/\D/g,""),i=(n.prefijoPais||"+57").replace(/\D/g,""),s=r?"+"+(r.startsWith(i)?r:i+r):"",o=(n.email||"").trim().toLowerCase(),c={id:e,fullName:n.nombre||"Sin nombre",email:o,phone:s,source:n.canal||"manual",sourceDetail:n.interes||"consulta",vehicleOfInterestId:n.vehiculoId||null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:null,contactId:o?"email_"+o.replace(/[^a-z0-9]/gi,"_"):"phone_"+r,tags:["manual",n.trafico,n.campana].filter(Boolean),createdAt:t,lastActivityAt:t,_version:1};return Hu.unshift(c),e}function SS(){const n={},e=(m,w,A)=>h("label",{class:"field"},[h("span",{class:"field__label",text:m}),w,null]);n.nombre=h("input",{class:"input",type:"text",placeholder:"Nombre del cliente",autocomplete:"off"}),n.prefijo=h("input",{class:"input",type:"text",value:"+57",style:{width:"72px"}}),n.telefono=h("input",{class:"input",type:"tel",placeholder:"300 123 4567",autocomplete:"off"}),n.email=h("input",{class:"input",type:"email",placeholder:"correo@ejemplo.com (opcional)",autocomplete:"off"}),n.canal=h("select",{class:"select"},jR.map(m=>h("option",{value:m.id},[`${m.icon} ${m.label}`]))),n.interes=h("select",{class:"select"},qR.map(m=>h("option",{value:m.id},[m.label]))),n.trafico=h("select",{class:"select"},[h("option",{value:""},["— Tráfico —"]),h("option",{value:"organico"},["Orgánico"]),h("option",{value:"pauta"},["Pauta (pago)"])]),n.campana=h("input",{class:"input",type:"text",placeholder:"Campaña (opcional)",autocomplete:"off"}),n.vehiculo=h("input",{class:"input",type:"text",placeholder:"Vehículo de interés (opcional)",autocomplete:"off"}),n.notas=h("textarea",{class:"textarea",placeholder:"Notas / contexto del lead",rows:"2"}),n.consent=h("input",{type:"checkbox",checked:!0});const t=h("div",{class:"login__error",role:"alert",hidden:!0}),r=h("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),i=h("button",{class:"btn btn--gold",type:"submit"},["Agregar lead"]),s=h("form",{class:"nl-form"},[e("Nombre *",n.nombre),h("div",{class:"nl-row"},[h("label",{class:"field",style:{flex:"0 0 auto"}},[h("span",{class:"field__label",text:"Prefijo"}),n.prefijo]),h("label",{class:"field u-grow"},[h("span",{class:"field__label",text:"Teléfono"}),n.telefono])]),e("Correo",n.email),h("div",{class:"nl-row"},[e("Canal *",n.canal),e("Interés",n.interes)]),h("div",{class:"nl-row"},[e("Tráfico",n.trafico),e("Campaña",n.campana)]),e("Vehículo de interés",n.vehiculo),e("Notas",n.notas),h("label",{class:"nl-consent"},[n.consent,h("span",{class:"u-caption",text:"El cliente autorizó el tratamiento de sus datos (Ley 1581 · Habeas Data)."})]),t,h("div",{class:"nl-actions"},[r,i])]),o=h("div",{class:"modal"},[h("div",{class:"modal__head"},[h("h2",{class:"modal__title",text:"＋ Nuevo lead"}),h("span",{class:"u-caption u-faint",text:"Captura manual (Meta, WhatsApp, TikTok, llamada, referido…)"})]),s]),c=h("div",{class:"modal-overlay"},[o]);document.body.appendChild(c),setTimeout(()=>n.nombre.focus(),30);const l=()=>{c.remove(),window.removeEventListener("keydown",d)},d=m=>{m.key==="Escape"&&l()};window.addEventListener("keydown",d),c.addEventListener("mousedown",m=>{m.target===c&&l()}),r.addEventListener("click",l),s.addEventListener("submit",async m=>{m.preventDefault(),t.hidden=!0;const w={nombre:n.nombre.value.trim(),email:n.email.value.trim(),telefono:n.telefono.value.trim(),prefijoPais:n.prefijo.value.trim()||"+57",canal:n.canal.value,interes:n.interes.value,vehiculoId:n.vehiculo.value.trim()||null,trafico:n.trafico.value||null,campana:n.campana.value.trim()||null,consentGiven:n.consent.checked,notas:n.notas.value.trim()};if(!w.nombre)return p("Escribe el nombre del cliente.");if(!w.email&&!w.telefono)return p("Necesitas al menos un correo o un teléfono (para no duplicar el contacto).");i.disabled=!0,i.textContent="Guardando…";try{K.get().mock?(Z_(w),window.dispatchEvent(new CustomEvent("altorra:leads-dirty"))):await pS(w),J("✓ Lead agregado a la Bandeja","ok"),l()}catch{i.disabled=!1,i.textContent="Agregar lead",p("No se pudo agregar. Intenta de nuevo.")}});function p(m){return t.textContent=m,t.hidden=!1,!1}}const Sl="altorra_friction_v1",PS=300;function ga(n,e,t={}){try{const r=Math.max(0,Math.round(performance.now()-e)),i=JSON.parse(localStorage.getItem(Sl)||"[]");for(i.push({task:n,ms:r,at:new Date().toISOString(),...t});i.length>PS;)i.shift();localStorage.setItem(Sl,JSON.stringify(i))}catch{}}function CS(){try{const n=JSON.parse(localStorage.getItem(Sl)||"[]"),e={};for(const r of n)(e[r.task]=e[r.task]||[]).push(r.ms);const t={};for(const[r,i]of Object.entries(e)){const s=[...i].sort((o,c)=>o-c);t[r]={n:i.length,mediana_s:+(s[Math.floor(s.length/2)]/1e3).toFixed(1),p90_s:+(s[Math.floor(s.length*.9)]/1e3).toFixed(1)}}return t}catch{return{}}}typeof window<"u"&&(window.__friccion=CS);const kS=[{id:"whatsapp",label:"WhatsApp",icon:"💬"},{id:"walkin",label:"Walk-in",icon:"🚶"},{id:"llamada",label:"Llamada",icon:"📞"},{id:"referido",label:"Referido",icon:"🤝"}],DS="“¿Me autorizas guardar tu nombre y teléfono para contactarte sobre vehículos? (Ley 1581)”";function NS(){const n=performance.now(),e={fuente:"whatsapp",medio:"organico"},t=K.get().user||{},r=h("input",{class:"input",type:"text",placeholder:"Nombre",autocomplete:"off"}),i=h("input",{class:"input",type:"tel",placeholder:"300 123 4567",autocomplete:"off",inputmode:"tel"}),s=h("input",{class:"input",type:"text",placeholder:'Nota corta (opcional): "busca SUV blanca"',autocomplete:"off"}),o=h("input",{type:"checkbox"}),c=h("div",{class:"u-row",style:{flexWrap:"wrap",gap:"6px"}});function l(){c.replaceChildren(...kS.map(L=>{const q=h("button",{class:"chip"+(e.fuente===L.id?" chip--active":""),type:"button"},[`${L.icon} ${L.label}`]);return q.addEventListener("click",()=>{e.fuente=L.id,l()}),q}))}l();const d=h("button",{class:"chip",type:"button"},["Orgánico"]);d.addEventListener("click",()=>{e.medio=e.medio==="organico"?"pauta":"organico",d.textContent=e.medio==="organico"?"Orgánico":"Pauta (pago)"});const p=h("div",{class:"login__error",role:"alert",hidden:!0}),m=h("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),w=h("button",{class:"btn btn--gold",type:"submit"},["⚡ Registrar"]),A=h("form",{class:"nl-form"},[h("label",{class:"field"},[h("span",{class:"field__label",text:"Nombre *"}),r]),h("label",{class:"field"},[h("span",{class:"field__label",text:"Teléfono / WhatsApp *"}),i]),h("div",{class:"u-row",style:{gap:"8px",alignItems:"center"}},[c,d]),h("label",{class:"field"},[h("span",{class:"field__label",text:"Nota"}),s]),h("label",{class:"nl-consent"},[o,h("span",{class:"u-caption"},["Leí el guion y el cliente AUTORIZÓ de palabra: ",h("em",{text:DS})])]),p,h("div",{class:"nl-actions"},[m,w])]),C=h("div",{class:"modal"},[h("div",{class:"modal__head"},[h("h2",{class:"modal__title",text:"⚡ Lead rápido"}),h("span",{class:"u-caption u-faint",text:navigator.onLine?"El WhatsApp entrante o el cliente del patio, registrado en 30 segundos.":"📴 Sin señal: se guardará y sincronizará solo al volver la conexión."})]),A]),k=h("div",{class:"modal-overlay"},[C]);document.body.appendChild(k),setTimeout(()=>r.focus(),30);const P=()=>{k.remove(),window.removeEventListener("keydown",B)},B=L=>{L.key==="Escape"&&P()};window.addEventListener("keydown",B),k.addEventListener("mousedown",L=>{L.target===k&&P()}),m.addEventListener("click",P),A.addEventListener("submit",L=>{L.preventDefault(),p.hidden=!0;const q={nombre:r.value.trim(),telefono:i.value.trim(),fuente:e.fuente,medio:e.medio,nota:s.value.trim(),consentVerbal:o.checked,ownerId:t.uid||null,ownerName:t.nombre||t.email||null,createdAt:new Date().toISOString()};if(!q.nombre)return D("Escribe el nombre.");if(!q.telefono||q.telefono.replace(/\D/g,"").length<7)return D("Escribe un teléfono válido.");if(!q.ownerId&&!K.get().mock)return D("Sesión sin usuario — recarga el portal.");if(K.get().mock){Z_({nombre:q.nombre,telefono:q.telefono,canal:q.fuente,trafico:q.medio,consentGiven:q.consentVerbal,notas:q.nota}),window.dispatchEvent(new CustomEvent("altorra:leads-dirty")),J("⚡ Lead registrado (mock)","ok"),P();return}Qt(Ce(he,"lead_intake"),q).catch(V=>{console.error("[quick-lead] rechazo del servidor:",V),J('El lead "'+q.nombre+'" fue RECHAZADO al sincronizar: '+(V.code||V.message),"error")}),J(navigator.onLine?"⚡ Lead registrado — aparecerá en la Bandeja en segundos":"📴 Guardado local — se enviará al volver la señal","ok"),ga("lead_rapido",n,{fuente:e.fuente,online:navigator.onLine}),P()});function D(L){return p.textContent=L,p.hidden=!1,!1}}const xS="ventas",Bs=[{id:"cuadrando_cita",label:"Cuadrando cita",prob:.2},{id:"cita_fijada",label:"Cita fijada",prob:.35},{id:"visita_test_drive",label:"Visita / Test drive",prob:.5},{id:"negociacion",label:"Negociación",prob:.7},{id:"apartado",label:"Apartado",prob:.9},{id:"vendido",label:"Vendido",prob:1,won:!0}],Lo={id:"perdido",label:"Perdido",prob:0,lost:!0},_o={_exit_visita_test_drive:["huboTestDrive"],apartado:["montoApartado","venceEl"],vendido:["tipoPago"],perdido:["lostReason"]},Fi=Bs.map(n=>n.id);function op(n,e){if(n===e)return{ok:!0,needsReason:!1,gates:[]};const t=s=>s===Lo.id||Fi.includes(s);if(!t(n)||!t(e))return{ok:!1,error:"etapa_desconocida"};if(n==="vendido")return{ok:!1,error:"vendido_es_terminal"};if(e===Lo.id)return{ok:!0,needsReason:!1,gates:_o.perdido.slice()};if(n===Lo.id)return{ok:!0,needsReason:!0,gates:[]};const r=Fi.indexOf(n),i=Fi.indexOf(e);if(i>r){const s=[];for(let o=r;o<i;o++){Fi[o]==="visita_test_drive"&&s.push(..._o._exit_visita_test_drive);const c=Fi[o+1];_o[c]&&s.push(..._o[c])}return{ok:!0,needsReason:!1,gates:[...new Set(s)]}}return{ok:!0,needsReason:!0,gates:[],recalcVehicle:n==="apartado"}}const ap=[{id:"precio",label:"Precio"},{id:"financiacion_negada",label:"Financiación negada"},{id:"compro_en_otro_lado",label:"Compró en otro lado"},{id:"no_responde",label:"No responde"},{id:"cambio_de_opinion",label:"Cambió de opinión"},{id:"error_de_registro",label:"Error de registro"},{id:"otro",label:"Otro motivo"}],es=Bs.filter(n=>!n.won),ey=[...Bs,Lo].reduce((n,e)=>(n[e.id]=e,n),{});function Nr(n){return ey[n]||Bs[0]}function ts(n){const e=ey[n];return e?e.prob:0}function Wu(n){return Math.round((Number(n.amount)||0)*ts(n.stageId))}function ty(n){return n.reduce((e,t)=>e+(t.status==="open"?Wu(t):0),0)}function VS(n){return n.reduce((e,t)=>e+(t.status==="open"&&Number(t.amount)||0),0)}function OS(n,e=14){return n.status==="open"&&ai(n.lastActivityAt)>e}function LS(n){const e={};for(const t of es)e[t.id]=[];for(const t of n)t.status==="open"&&(e[t.stageId]||(e[t.stageId]=[])).push(t);return e}function ny(n,e={}){const t=e.vehicleId!==void 0?e.vehicleId||"":n.vehicleOfInterestId||"",r=Bs[0];return{name:(n.fullName||"Oportunidad")+(t?" · "+(e.vehicleName||t):""),contactId:n.contactId||null,contactName:n.fullName||"",leadId:n.id||null,vehicleId:t||null,vehicleName:e.vehicleName||t||"",sinVehiculoAun:!t,pipelineId:xS,stageId:r.id,stageName:r.label,status:"open",amount:Number(e.amount)||0,currency:"COP",probability:r.prob,weightedAmount:Math.round((Number(e.amount)||0)*r.prob),expectedCloseDate:null,ownerId:e.ownerId!==void 0?e.ownerId:n.ownerId||null,ownerName:e.ownerName!==void 0?e.ownerName:n.ownerName||null,source:n.source||"web",nextStep:e.nota||""}}const _i=()=>new Date().toISOString(),MS=n=>({id:n.id,...n.data()}),vn=()=>K.get().user?K.get().user.uid:null;function FS(n,e,t){return Qt(Ce(he,"activities"),{type:"deal",subject:t,body:"",status:"closed",direction:"outbound",relatedTo:{type:"deal",id:n,name:e||""},ownerId:vn(),createdAt:_i(),_version:1})}function US({pageSize:n=100,onData:e,onError:t}){const r=vt(Ce(he,"deals"),si("status","==","open"),kt("lastActivityAt","desc"),Dt(n));return Fs(r,i=>e(i.docs.map(MS)),i=>t&&t(i))}async function BS(n,e={}){const t=_i(),r=ny(n,e),i=await Qt(Ce(he,"deals"),{...r,lastActivityAt:t,createdAt:t,updatedAt:t,createdBy:vn(),updatedBy:vn(),_version:1});return await Wt(ft(he,"leads",n.id),{status:"convertido",convertedTo:{dealId:i.id,prevStatus:n.status||"contactado"},lastActivityAt:t,updatedAt:t,updatedBy:vn(),_version:Pn(1)}),await FS(i.id,r.contactName,"Oportunidad creada desde lead"),i.id}async function $S(n){return(await F_(U_,"anularConversion")({dealId:n})).data}async function jS(){return(await cr(vt(Ce(he,"vehiculos"),si("estado","==","disponible"),Dt(60)))).docs.map(e=>{const t=e.data();return{id:e.id,label:[t.marca,t.modelo,t.year].filter(Boolean).join(" "),precio:Number(t.precioOferta||t.precio)||0}}).sort((e,t)=>e.label.localeCompare(t.label,"es"))}async function cp(n,e,t={},r={}){const i=_i(),s=Nr(e);await Wt(ft(he,"deals",n),{...r,stageId:e,stageName:s.label,probability:s.prob,weightedAmount:Math.round((Number(t.amount)||0)*s.prob),lastActivityAt:i,updatedAt:i,updatedBy:vn(),_version:Pn(1)})}async function qS(n,e,t={}){const r=_i(),i=Math.max(0,Math.round(Number(e)||0));await Wt(ft(he,"deals",n),{amount:i,weightedAmount:Math.round(i*ts(t.stageId)),updatedAt:r,updatedBy:vn(),_version:Pn(1)})}async function zS(n,e={},t={}){const r=_i();await Wt(ft(he,"deals",n),{...t,status:"won",stageId:"vendido",stageName:"Vendido",probability:1,weightedAmount:Number(e.amount)||0,lastActivityAt:r,updatedAt:r,updatedBy:vn(),_version:Pn(1)})}async function GS(n,e,t={}){const r=_i();await Wt(ft(he,"deals",n),{status:"lost",stageId:"perdido",stageName:"Perdido",probability:0,weightedAmount:0,lostReason:String(e||"otro"),lastActivityAt:r,updatedAt:r,updatedBy:vn(),_version:Pn(1)})}const Mc="__sin_vehiculo__";function ry(n,{onDone:e}={}){const t=performance.now(),r=K.get().team||[],i=h("select",{class:"select"},[h("option",{value:""},["Cargando inventario…"])]),s=h("input",{class:"input",type:"number",min:"0",step:"100000",placeholder:"Valor estimado (COP) *"}),o=h("select",{class:"select"},r.length?r.map(D=>h("option",{value:D.uid,selected:D.uid===n.ownerId?"":void 0},[D.nombre])):[h("option",{value:n.ownerId||""},[n.ownerName||"Yo"])]),c=h("input",{class:"input",type:"text",placeholder:"Nota de contexto (opcional)"}),l=h("div",{class:"login__error",role:"alert",hidden:!0}),d=h("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),p=h("button",{class:"btn btn--gold",type:"submit"},["🎯 Crear negocio"]),m=h("form",{class:"nl-form"},[h("p",{class:"u-caption u-muted",style:{margin:"0"}},["✓ Hablaste con él · ✓ tiene presupuesto o forma de pago en mente · ✓ busca un carro concreto o una categoría"]),h("label",{class:"field"},[h("span",{class:"field__label",text:"Vehículo *"}),i]),h("label",{class:"field"},[h("span",{class:"field__label",text:"Valor estimado (COP) *"}),s]),h("label",{class:"field"},[h("span",{class:"field__label",text:"Asesor responsable *"}),o]),h("label",{class:"field"},[h("span",{class:"field__label",text:"Nota"}),c]),l,h("div",{class:"nl-actions"},[d,p])]),w=h("div",{class:"modal"},[h("div",{class:"modal__head"},[h("h2",{class:"modal__title",text:"Calificar → crear negocio"}),h("span",{class:"u-caption u-faint",text:(n.fullName||"Cliente")+" pasa al Pipeline; el lead queda congelado como histórico."})]),m]),A=h("div",{class:"modal-overlay"},[w]);document.body.appendChild(A);const C=()=>{A.remove(),window.removeEventListener("keydown",k)},k=D=>{D.key==="Escape"&&C()};window.addEventListener("keydown",k),A.addEventListener("mousedown",D=>{D.target===A&&C()}),d.addEventListener("click",C);let P=[];(K.get().mock?Promise.resolve([]):jS()).then(D=>{P=D,i.replaceChildren(h("option",{value:""},["— Elige un vehículo —"]),...D.map(L=>h("option",{value:L.id},[L.label+(L.precio?" · $"+L.precio.toLocaleString("es-CO"):"")])),h("option",{value:Mc},["Sin vehículo aún (buscando / retoma)"]))}).catch(()=>{i.replaceChildren(h("option",{value:Mc},["Sin vehículo aún"]))}),i.addEventListener("change",()=>{const D=P.find(L=>L.id===i.value);D&&D.precio&&!s.value&&(s.value=String(D.precio))}),m.addEventListener("submit",async D=>{D.preventDefault(),l.hidden=!0;const L=i.value,q=Math.round(Number(s.value)||0);if(!L)return B('Elige un vehículo o marca "Sin vehículo aún".');if(!(q>0))return B("El valor estimado es obligatorio (alimenta el pronóstico).");const V=o.value||n.ownerId;if(!V)return B("El negocio necesita un asesor responsable.");const F=r.find(g=>g.uid===V)?.nombre||n.ownerName||null,T=P.find(g=>g.id===L),E={vehicleId:L===Mc?null:L,vehicleName:T?T.label:"",amount:q,ownerId:V,ownerName:F,nota:c.value.trim()};p.disabled=!0,p.textContent="Creando…";try{if(K.get().mock){ES(ny(n,E)),J("🎯 Negocio creado (mock)","ok"),ga("conversion",t,{mock:!0}),C(),e&&e({mock:!0});return}const g=await BS(n,E);ga("conversion",t,{}),C(),KS(g,n),e&&e({dealId:g})}catch(g){p.disabled=!1,p.textContent="🎯 Crear negocio",B(g&&g.code==="permission-denied"?"Recarga el portal: tu versión está desactualizada.":"No se pudo crear el negocio. Intenta de nuevo.")}});function B(D){return l.textContent=D,l.hidden=!1,!1}}function KS(n,e){const t=h("button",{class:"btn btn--soft btn--sm",type:"button"},["Deshacer"]),r=h("div",{role:"status",style:{position:"fixed",bottom:"18px",left:"50%",transform:"translateX(-50%)",display:"flex",gap:"12px",alignItems:"center",zIndex:"99",padding:"10px 14px",borderRadius:"10px",background:"var(--bg-elev, #1c1a17)",border:"1px solid var(--line, #444)",boxShadow:"0 6px 24px rgba(0,0,0,.4)"}},[h("span",{text:`🎯 Negocio creado para ${(e.fullName||"el cliente").split(/\s+/)[0]}`}),t]);document.body.appendChild(r);const i=setTimeout(()=>r.remove(),1e4);t.addEventListener("click",async()=>{clearTimeout(i),t.disabled=!0,t.textContent="Anulando…";try{await $S(n),J("↩ Conversión anulada — el lead volvió a la Bandeja","ok")}catch(s){J("No se pudo anular: "+(s&&s.message||""),"error")}r.remove()})}const sn={wa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.477-.91zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>',person:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',flag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',expand:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',convert:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 12h6M13 9l3 3-3 3"/></svg>',call:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',more:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>'};function HS(){const n=(t,r)=>{const i=new Date;return i.setDate(i.getDate()+t),i.setHours(r,0,0,0),i.toISOString()},e=new Date(Date.now()+72e5).toISOString();return[{value:{subject:"Llamar al cliente",dueAt:n(1,9)},label:"Llamar mañana 9 am",icon:"📞"},{value:{subject:"Escribir por WhatsApp",dueAt:e},label:"WhatsApp en 2 horas",icon:"💬"},{value:{subject:"Hacer seguimiento",dueAt:n(3,9)},label:"Seguimiento en 3 días",icon:"🔁"},{value:"abrir360",label:"Agendar cita (abrir 360)",icon:"📅"},{value:null,label:"Sin próximo paso",icon:"⊘"}]}function iy(n){const e={queue:"todo",filters:{type:"",channel:"",status:""},search:"",showClosed:!1,leads:[],loading:!0,error:null,hasMore:!1,cursor:null,sub:null},t=Br("crm.edit"),r=K.get().user&&K.get().user.uid,i=h("div",{class:"inbox__queues",role:"tablist","aria-label":"Colas"}),s=h("label",{class:"search","aria-label":"Buscar"},[h("span",{html:sn.search,"aria-hidden":"true"}),h("input",{type:"search",placeholder:"Buscar nombre, correo, teléfono…",autocomplete:"off"})]),o=h("div",{class:"inbox__filters"}),c=t?h("button",{class:"btn btn--gold btn--sm",type:"button",style:{marginLeft:"auto"}},["⚡ Lead rápido"]):null;c&&c.addEventListener("click",()=>NS());const l=t?h("button",{class:"btn btn--soft btn--sm",type:"button"},["＋ Completo"]):null;l&&l.addEventListener("click",()=>SS());const d=h("button",{class:"btn btn--soft btn--sm",type:"button"},["📋 Pendientes hoy"]);d.addEventListener("click",()=>F());const p=h("div",{class:"inbox__pendientes",hidden:!0}),m=h("div",{class:"inbox__toolbar"},[s,o,c,l,d]),w=h("div",{class:"inbox__list",role:"list",tabindex:"-1"}),A=h("p",{class:"u-muted u-caption",style:{margin:"0"}},["Aquí llegan los interesados: contacta y califica. Las ventas activas viven en el Pipeline."]),C=h("section",{class:"inbox"},[A,i,m,p,w]);pe(n),n.append(C);const k=s.querySelector("input");k.addEventListener("input",()=>{e.search=k.value,U()});async function P(O,j){if(_(O.id,{ownerId:j?j.uid:null,ownerName:j?j.nombre:null}),K.get().mock){J(j?`Asignado a ${j.nombre}`:"Sin asignar","ok");return}try{await aS(O.id,j),J(j?`Asignado a ${j.nombre}`:"Sin asignar","ok")}catch{J("No se pudo asignar","error")}}async function B(O,j,H={}){if(_(O.id,{status:j,...H,lastActivityAt:new Date().toISOString()}),K.get().mock){J(`Estado → ${Vo(j).label}`,"ok");return}try{await cS(O.id,j,O,H),J(`Estado → ${Vo(j).label}`,"ok")}catch{J("No se pudo cambiar el estado","error")}}function D(O,j){const H=q_(O.phone,WS(O));if(!H){J("Este lead no tiene teléfono","error");return}window.open(H,"_blank","noopener"),!K.get().mock&&t&&ip(O.id,{type:"whatsapp",subject:"WhatsApp enviado",direction:"outbound",name:O.fullName}).catch(()=>{}),q(O,j)}function L(O,j){!K.get().mock&&t&&ip(O.id,{type:"llamada",subject:"Llamada registrada",direction:"outbound",name:O.fullName}).catch(()=>{}),J("📞 Llamada registrada","ok"),q(O,j)}function q(O,j){if(!t)return;const H=performance.now();wt(j||document.body,HS(),le=>{if(ga("proximo_paso",H,{preset:le.label}),!!le.value){if(le.value==="abrir360"){pt(O.id);return}if(K.get().mock){J("Próximo paso anotado (mock)","ok");return}lS(O.id,{subject:le.value.subject,dueAt:le.value.dueAt,name:O.fullName}).then(()=>J("✓ Próximo paso: "+le.label,"ok")).catch(()=>J("No se pudo guardar el próximo paso","error"))}},{title:"¿Próximo paso con "+(O.fullName||"el cliente").split(/\s+/)[0]+"?"})}let V=!1;async function F(){V=!V,p.hidden=!V,V&&await T()}async function T(){if(pe(p),K.get().mock){p.append(h("div",{class:"u-muted u-caption",style:{padding:"10px"},text:"Pendientes no disponible en modo demo."}));return}p.append(h("div",{class:"u-muted u-caption",style:{padding:"10px"},text:"Cargando pendientes…"}));let O=[];try{O=await uS()}catch{pe(p),p.append(h("div",{class:"u-muted u-caption",style:{padding:"10px"},text:"No se pudieron cargar los pendientes."}));return}if(pe(p),p.append(h("div",{class:"inbox__listhead"},[h("span",{class:"u-muted u-caption",text:`📋 ${O.length} pendiente${O.length===1?"":"s"} (hoy y vencidos)`})])),!O.length){p.append(h("div",{class:"u-muted u-caption",style:{padding:"0 10px 10px"},text:"¡Al día! Registra llamadas/WhatsApps y elige “próximo paso” para que aparezcan aquí."}));return}const j=Date.now();O.forEach(H=>{const le=new Date(H.dueAt).getTime()<j,ee=h("button",{class:"btn btn--soft btn--sm",type:"button",title:"Marcar hecho"},["✓ Hecho"]),Z=h("button",{class:"btn btn--ghost btn--sm",type:"button"},["Abrir 360"]),Ne=h("div",{class:"lead-card",style:{alignItems:"center"}},[h("span",{class:`badge badge--${le?"danger":"gold"}`,text:le?"VENCIDO":"HOY"}),h("div",{class:"u-grow"},[h("div",{class:"lead-card__name",text:(H.type==="cita"?"📅 ":"")+H.subject}),h("div",{class:"u-caption u-muted",text:`${H.relatedTo&&H.relatedTo.name?H.relatedTo.name+" · ":""}${Jn(H.dueAt)}`})]),h("div",{class:"u-row u-row--tight"},[Z,t?ee:null])]);Z.addEventListener("click",()=>{H.relatedTo&&H.relatedTo.id&&pt(H.relatedTo.id)}),ee.addEventListener("click",async()=>{ee.disabled=!0;try{await dS(H.id),J("✓ Hecho","ok"),await T(),H.relatedTo&&H.relatedTo.id&&q({id:H.relatedTo.id,fullName:H.relatedTo.name||""},d)}catch{ee.disabled=!1,J("No se pudo completar","error")}}),p.append(Ne)})}function E(O){if(O.status==="convertido"){J("Ya es un negocio: gestiónalo en el Pipeline","info");return}ry(O,{onDone:()=>_(O.id,{status:"convertido"})})}function g(){K.set({leads:e.leads})}function _(O,j){const H=e.leads.findIndex(le=>le.id===O);H!==-1&&(e.leads[H]=Q_({...e.leads[H],...j}),g(),I())}function I(){b(),v(),U()}function b(){const O=XR(e.leads,r);pe(i),Al.forEach(j=>{const H=e.queue===j.id,le=h("button",{class:"chip"+(H?" chip--active":""),role:"tab","aria-selected":String(H),type:"button"},[h("span",{"aria-hidden":"true",text:j.icon}),h("span",{text:j.label}),h("span",{class:"chip__count",text:String(O[j.id]||0)})]);le.addEventListener("click",()=>{e.queue=j.id,I()}),i.append(le)})}function v(){if(pe(o),[{key:"type",label:"Tipo",items:[["","Todos"],["lead","Lead"],["cita","Cita"],["solicitud","Solicitud"],["pqr","PQR"]]},{key:"channel",label:"Canal",items:[["","Todos"],["web","Web"],["whatsapp","WhatsApp"],["bot","ALTOR Bot"],["cuenta","Cuenta"],["newsletter","Newsletter"],["cita","Cita web"]]},{key:"status",label:"Estado",items:[["","Todos"],...bl.map(j=>[j.id,j.label])]}].forEach(j=>{const H=e.filters[j.key],le=H?(j.items.find(Z=>Z[0]===H)||[,j.label])[1]:j.label,ee=h("button",{class:"chip"+(H?" chip--active":""),type:"button","aria-haspopup":"menu"},[h("span",{text:le}),h("span",{"aria-hidden":"true",text:"▾"})]);ee.addEventListener("click",()=>{wt(ee,j.items.map(([Z,Ne])=>({value:Z,label:Ne,active:Z===H})),Z=>{e.filters[j.key]=Z.value,I()},{title:j.label})}),o.append(ee)}),e.filters.type||e.filters.channel||e.filters.status){const j=h("button",{class:"chip",type:"button"},["✕ Limpiar"]);j.addEventListener("click",()=>{e.filters={type:"",channel:"",status:""},I()}),o.append(j)}}function U(){if(e.loading)return Ze();if(e.error)return Yt("⚠️","No se pudo cargar",e.error);const{rows:O,hiddenClosed:j}=rS(e.leads,{queue:e.queue,uid:r,filters:e.filters,search:e.search,showClosed:e.showClosed});if(pe(w),!O.length&&!j){const ee=e.search||e.filters.type||e.filters.channel||e.filters.status;w.append(Vt("🗂️",ee?"Sin resultados":"¡Bandeja al día!",ee?"Ajusta la búsqueda o los filtros.":"No hay clientes en esta cola."));return}const H=j||e.showClosed?h("button",{class:"chip",type:"button",style:{marginLeft:"auto"}},[e.showClosed?"✕ Ocultar cerrados":`${j} ocultos · ver todos`]):null;H&&H.addEventListener("click",()=>{e.showClosed=!e.showClosed,U()});const le=h("div",{class:"inbox__listhead"},[h("span",{class:"u-muted u-caption",text:`${O.length} ${O.length===1?"cliente":"clientes"} activos`}),h("span",{class:"u-faint u-caption",text:"Ordenado por urgencia"}),H]);if(w.append(le),!O.length&&j){w.append(Vt("🗂️","¡Bandeja al día!",`No hay clientes activos en esta cola (${j} cerrados ocultos).`));return}if(O.forEach(ee=>w.append(re(ee))),e.hasMore&&e.queue==="todo"&&!e.search){const ee=h("button",{class:"btn btn--soft btn--block",type:"button"},["Cargar más"]);ee.addEventListener("click",()=>me(ee)),w.append(h("div",{class:"inbox__more"},[ee]))}}function re(O){const j=jr[O._rating],H=Vo(O.status),le=!!(O.convertedTo&&O.convertedTo.dealId)||O.status==="convertido",ee=nS(O),Z=ee&&ee.state!=="ok"?h("span",{class:`badge badge--${ee.state==="late"?"danger":"gold"}`,title:"Tiempo sin primer contacto"},[`⏱ ${ee.mins<120?ee.mins+" min":Oc(ee.mins*6e4)} sin contacto`]):null,Ne=O._sla,mr=`sla-dot sla-dot--${Ne.state}`,gr=Ne.closed?"Cerrado":Ne.state==="late"?`SLA vencido hace ${Oc(Ne.remainingMs)}`:`Responder en ${Oc(Ne.remainingMs)}`,yi=[O._type.icon+" "+O._type.label,O.sourceDetail,O.vehicleOfInterestId?"🚗 "+O.vehicleOfInterestId:""].filter(Boolean).join(" · "),Cn=h("article",{class:"lead-card",role:"listitem",tabindex:"0","data-id":O.id,"aria-label":`${O.fullName}, ${j.label}`},[h("span",{class:mr,title:gr,"aria-label":gr}),h("span",{class:"avatar avatar--sm","aria-hidden":"true",text:Us(O.fullName)}),h("div",{class:"lead-card__main u-grow"},[h("div",{class:"lead-card__top"},[h("span",{class:"lead-card__name u-truncate",text:O.fullName}),h("span",{class:`temp ${j.cls}`,title:`Score ${O._score}/100`},[`${j.icon} ${O._score}`])]),h("div",{class:"lead-card__what u-truncate u-muted",text:yi}),h("div",{class:"lead-card__meta u-caption"},[h("span",{class:"lead-card__chan",text:`${O._channel.icon} ${O._channel.label}`}),h("span",{class:"lead-card__dot",text:"·"}),h("span",{text:Jn(O.createdAt)}),h("span",{class:"lead-card__dot",text:"·"}),le?h("button",{class:"badge badge--ok",type:"button","data-action":"pipeline",title:"Este lead ya es un negocio: gestiónalo en el Pipeline",style:{cursor:"pointer",border:"none"}},[O.convertedTo&&O.convertedTo.outcome==="perdido"?"✖ Negocio perdido → Pipeline":O.convertedTo&&O.convertedTo.outcome==="vendido"?"🏆 VENDIDO":`🎯 ${O.convertedTo&&O.convertedTo.stageName||"Convertido"} → Pipeline`]):h("span",{class:`badge badge--${H.badge||""}`.trim(),text:H.label}),O.archived?h("span",{class:"badge",text:"🗄 Archivado"}):null,Z?h("span",{class:"lead-card__dot",text:"·"}):null,Z,O.ownerName?h("span",{class:"lead-card__dot",text:"·"}):null,O.ownerName?h("span",{class:"u-faint",text:"👤 "+O.ownerName}):null]),h("div",{class:"lead-card__nba"},[h("span",{"aria-hidden":"true",text:O._nba.icon}),h("span",{class:"u-muted",text:"Próx: "}),h("strong",{text:O._nba.label})])]),h("div",{class:"lead-card__actions"},[oe("wa",sn.wa,"WhatsApp","btn--wa"),t?oe("call",sn.call,"Registrar llamada"):null,t?oe("assign",sn.person,"Asignar"):null,t&&!le?oe("status",sn.flag,"Cambiar estado"):null,t&&!le?oe("convert",sn.convert,"Convertir a oportunidad"):null,t?oe("more",sn.more,"Más acciones"):null,oe("open",sn.expand,"Abrir 360")])]);return Cn.addEventListener("click",kn=>{const vi=kn.target.closest("[data-action]");if(vi){Ke(vi.dataset.action,O,vi);return}pt(O.id)}),Cn.addEventListener("keydown",kn=>{kn.key==="Enter"?pt(O.id):kn.key.toLowerCase()==="w"&&D(O)}),Cn}function oe(O,j,H,le=""){return h("button",{class:`icon-btn ${le}`.trim(),type:"button","data-action":O,title:H,"aria-label":H},[h("span",{html:j,"aria-hidden":"true"})])}const ye={nuevo:"Acaba de entrar, nadie le ha hablado",contactado:"Ya le escribiste o llamaste",descartado:"No va: inalcanzable, no califica, spam… (pide la razón)"};function Ke(O,j,H){if(O==="open")return pt(j.id);if(O==="wa")return D(j,H);if(O==="call")return L(j,H);if(O==="convert")return E(j);if(O==="pipeline"){window.location.hash="#/pipeline";return}if(O==="assign"){const le=K.get().team||[],ee=[{value:null,label:"Sin asignar",icon:"⊘",active:!j.ownerId},...le.map(Z=>({value:Z,label:Z.nombre,hint:Z.cargo,icon:"👤",active:j.ownerId===Z.uid}))];return wt(H,ee,Z=>P(j,Z.value),{title:"Asignar a"})}if(O==="status"){if(j.convertedTo&&j.convertedTo.dealId){J("Este lead ya es un negocio: gestiónalo en el Pipeline.","info");return}const le=bl.filter(ee=>ee.id!=="convertido").map(ee=>({value:ee.id,label:ee.label,hint:ye[ee.id]||"",active:(j.status||"nuevo")===ee.id}));return wt(H,le,ee=>{if(ee.value==="descartado"){wt(H,zR.map(Z=>({value:Z.id,label:Z.label})),Z=>B(j,"descartado",{discardReason:Z.value}),{title:"¿Por qué se descarta?"});return}B(j,ee.value)},{title:"Cambiar estado"})}if(O==="more"){const le=[j.archived?{value:"unarchive",label:"Restaurar de archivados",icon:"↩️"}:{value:"archive",label:"Archivar",icon:"🗄",hint:"Sale de las vistas; reversible"},Br("crm.delete")?{value:"purge",label:"Eliminar definitivo",icon:"🗑",hint:"Solo pruebas/spam — borra TODO su rastro"}:null].filter(Boolean);return wt(H,le,async ee=>{if(ee.value==="archive"||ee.value==="unarchive"){const Z=ee.value==="archive";if(_(j.id,{archived:Z}),K.get().mock){J(Z?"🗄 Archivado":"↩️ Restaurado","ok");return}try{await hS(j.id,Z),J(Z?"🗄 Archivado":"↩️ Restaurado","ok")}catch{_(j.id,{archived:!Z}),J("No se pudo archivar","error")}return}if(ee.value==="purge"){if(!navigator.onLine){J("Eliminar definitivo necesita señal.","error");return}if(!window.confirm('🗑 ¿Eliminar DEFINITIVAMENTE a "'+j.fullName+`"?

Borra el lead, sus actividades, negocios y su contacto si queda huérfano. Esto es SOLO para pruebas/spam — un cliente real se ARCHIVA.`)||!window.confirm("Última confirmación: esta acción NO se puede deshacer. ¿Eliminar?"))return;if(K.get().mock){J("Eliminado (mock)","ok");return}try{const Z=await fS(j.id);J(`🗑 Eliminado: ${Z.activities} actividades, ${Z.deals} negocios${Z.contactDeleted?", contacto":""}`,"ok")}catch(Z){J(Z.message&&Z.message.includes("Super Admin")?"Solo el Super Admin puede eliminar.":"No se pudo eliminar: "+(Z.message||Z.code),"error")}}},{title:"Más acciones"})}}function pt(O){K.set({detailLeadId:O})}function Vt(O,j,H){return h("div",{class:"state"},[h("div",{class:"state__icon","aria-hidden":"true",text:O}),h("div",{class:"state__title",text:j}),h("div",{class:"state__msg",text:H})])}function Yt(O,j,H){pe(w),w.append(Vt(O,j,H))}function Ze(){pe(w);for(let O=0;O<6;O++)w.append(h("div",{class:"lead-card lead-card--skeleton"},[h("span",{class:"skeleton",style:{width:"30px",height:"30px",borderRadius:"50%"}}),h("div",{class:"u-grow u-stack",style:{gap:"8px"}},[h("span",{class:"skeleton",style:{width:"46%",height:"14px"}}),h("span",{class:"skeleton",style:{width:"70%",height:"12px"}})])]))}async function me(O){if(e.cursor){O.disabled=!0,O.textContent="Cargando…";try{const{rows:j,lastDoc:H,hasMore:le}=await sS({after:e.cursor}),ee=mo(j),Z=new Set(e.leads.map(Ne=>Ne.id));e.leads.push(...ee.filter(Ne=>!Z.has(Ne.id))),e.cursor=H,e.hasMore=le,g(),I()}catch{J("No se pudo cargar más","error"),O.disabled=!1,O.textContent="Cargar más"}}}function et(){if(K.get().mock){K.set({team:J_()}),e.leads=mo(ma()),e.loading=!1,e.hasMore=!1,g(),I(),e.dirtyHandler=()=>{e.leads=mo(ma()),g(),I()},window.addEventListener("altorra:leads-dirty",e.dirtyHandler);return}oS().catch(()=>{}),e.sub=iS({pageSize:40,onData:(O,j)=>{e.leads=mo(O),e.cursor=e.sub?e.sub.getLastDoc():null,e.hasMore=j.hasMore,e.loading=!1,e.error=null,g(),I()},onError:O=>{console.error("[inbox] error de suscripción:",O),e.loading=!1,e.error=O&&O.code==="permission-denied"?"Tu cuenta no tiene permiso para ver el CRM.":"Revisa tu conexión e inténtalo de nuevo.",I()}})}return I(),et(),function(){e.sub&&e.sub.unsubscribe&&e.sub.unsubscribe(),e.sub=null,e.dirtyHandler&&(window.removeEventListener("altorra:leads-dirty",e.dirtyHandler),e.dirtyHandler=null)}}function WS(n){const e=String(n.fullName||"").trim().split(/\s+/)[0]||"",t=n.vehicleOfInterestId?` por el vehículo ${n.vehicleOfInterestId}`:"";return`Hola ${e}, te saluda Altorra Cars 👋. Vimos tu interés${t}. ¿En qué te podemos ayudar?`}function QS(n){const e={deals:[],loading:!0,error:null,sub:null,dragId:null},t=Br("crm.edit"),r=h("div",{class:"pipeline__bar"}),i=h("div",{class:"pipeline__board",role:"list","aria-label":"Embudo de ventas"}),s=h("p",{class:"u-muted u-caption",style:{margin:"0"}},["Aquí se trabajan las ventas activas. Los interesados nuevos llegan a la Bandeja."]),o=h("section",{class:"pipeline"},[s,r,i]);pe(n),n.append(o);function c(_,I){const b=e.deals.findIndex(v=>v.id===_);b!==-1&&(e.deals[b]={...e.deals[b],...I},K.get().mock&&bS(_,I),k())}async function l(_,I){if(_.stageId===I)return;const b=op(_.stageId,I);if(!b.ok){J(b.error==="vendido_es_terminal"?"Un negocio vendido no se mueve (anulación = admin).":"Movimiento no válido","error");return}const v=[...b.gates];b.needsReason&&v.push("regressReason");const U=async re=>{const oe=Nr(I),ye=_.stageId;if(c(_.id,{stageId:I,stageName:oe.label,probability:oe.prob,...re,lastActivityAt:new Date().toISOString()}),K.get().mock){J("Etapa → "+oe.label,"ok");return}try{await cp(_.id,I,_,re),p(_,ye,oe.label)}catch(Ke){c(_.id,{stageId:ye,stageName:Nr(ye).label,probability:ts(ye)}),J(Ke&&Ke.code==="permission-denied"?"Movimiento rechazado por las reglas — recarga el portal si tu versión es vieja.":"No se pudo mover","error")}};if(!v.length)return U({});m(_,I,v,U)}let d=null;function p(_,I,b){d&&d.remove();const v=h("button",{class:"btn btn--soft btn--sm",type:"button"},["Deshacer"]),U=h("div",{role:"status",style:{position:"fixed",bottom:"18px",left:"50%",transform:"translateX(-50%)",display:"flex",gap:"12px",alignItems:"center",zIndex:"99",padding:"10px 14px",borderRadius:"10px",background:"var(--bg-elev, #1c1a17)",border:"1px solid var(--line, #444)",boxShadow:"0 6px 24px rgba(0,0,0,.4)"}},[h("span",{text:`${(_.contactName||_.name||"Negocio").split(" · ")[0]} → ${b}`}),v]);document.body.appendChild(U),d=U;const re=setTimeout(()=>{U.remove(),d===U&&(d=null)},1e4);v.addEventListener("click",async()=>{clearTimeout(re),U.remove(),d===U&&(d=null);const oe=Nr(I);if(c(_.id,{stageId:I,stageName:oe.label,probability:oe.prob}),!K.get().mock)try{await cp(_.id,I,_,{regressReason:"Deshacer (arrastre accidental)"})}catch{J("No se pudo deshacer","error")}})}function m(_,I,b,v){const U={},re=[],oe=(me,et)=>h("label",{class:"field"},[h("span",{class:"field__label",text:me}),et]);if(b.includes("huboTestDrive")&&(U.huboTestDrive=h("select",{class:"select"},[h("option",{value:"si"},["Sí, hubo test drive"]),h("option",{value:"no"},["No alcanzó a probarlo"])]),re.push(oe("¿Hubo test drive?",U.huboTestDrive))),b.includes("montoApartado")){U.montoApartado=h("input",{class:"input",type:"number",min:"0",step:"50000",placeholder:"500000"});const me=new Date(Date.now()+72*3600*1e3);U.venceEl=h("input",{class:"input",type:"date",value:me.toISOString().slice(0,10)}),re.push(oe("Monto del apartado (COP) *",U.montoApartado),oe("Vence el (default 72h)",U.venceEl))}b.includes("tipoPago")&&(U.tipoPago=h("select",{class:"select"},[h("option",{value:"contado"},["De contado"]),h("option",{value:"financiado"},["Financiado"])]),U.estadoCredito=h("select",{class:"select"},[h("option",{value:""},["— Estado del crédito —"]),h("option",{value:"pre_aprobado"},["Pre-aprobado"]),h("option",{value:"en_estudio"},["En estudio"]),h("option",{value:"aprobado"},["Aprobado"]),h("option",{value:"rechazado"},["Rechazado"])]),re.push(oe("Forma de pago *",U.tipoPago),oe("Crédito (si aplica)",U.estadoCredito))),b.includes("lostReason")&&(U.lostReason=h("select",{class:"select"},ap.map(me=>h("option",{value:me.id},[me.label]))),re.push(oe("¿Por qué se perdió? *",U.lostReason))),b.includes("regressReason")&&(U.regressReason=h("input",{class:"input",type:"text",placeholder:"¿Qué pasó? (obligatorio al retroceder)"}),re.push(oe("Razón del retroceso *",U.regressReason)));const ye=h("div",{class:"login__error",role:"alert",hidden:!0}),Ke=h("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),pt=h("button",{class:"btn btn--gold",type:"submit"},["Mover a "+Nr(I).label]),Vt=h("form",{class:"nl-form"},[...re,ye,h("div",{class:"nl-actions"},[Ke,pt])]),Yt=h("div",{class:"modal-overlay"},[h("div",{class:"modal"},[h("div",{class:"modal__head"},[h("h2",{class:"modal__title",text:Nr(I).label})]),Vt])]);document.body.appendChild(Yt);const Ze=()=>Yt.remove();Ke.addEventListener("click",Ze),Yt.addEventListener("mousedown",me=>{me.target===Yt&&Ze()}),Vt.addEventListener("submit",me=>{me.preventDefault();const et={};if(U.huboTestDrive&&(et.huboTestDrive=U.huboTestDrive.value==="si"),U.montoApartado){const O=Math.round(Number(U.montoApartado.value)||0);if(!(O>0)){ye.textContent="El monto del apartado es obligatorio.",ye.hidden=!1;return}et.montoApartado=O,et.venceEl=new Date((U.venceEl.value||new Date().toISOString().slice(0,10))+"T18:00:00-05:00").toISOString()}if(U.tipoPago&&(et.tipoPago=U.tipoPago.value,U.estadoCredito&&U.estadoCredito.value&&(et.estadoCredito=U.estadoCredito.value)),U.lostReason&&(et.lostReason=U.lostReason.value),U.regressReason){const O=U.regressReason.value.trim();if(!O){ye.textContent="Escribe la razón del retroceso.",ye.hidden=!1;return}et.regressReason=O}Ze(),v(et)})}async function w(_,I){if(c(_.id,{amount:I}),!K.get().mock)try{await qS(_.id,I,_)}catch{J("No se pudo guardar el monto","error")}}async function A(_){const I=op(_.stageId,"vendido");if(!I.ok){J("Movimiento no válido","error");return}const b=async v=>{if(c(_.id,{status:"won",...v}),K.get().mock){J("🎉 ¡Venta ganada!","ok");return}try{await zS(_.id,_,v),J("🎉 ¡Venta ganada!","ok")}catch{J("No se pudo marcar — revisa los datos requeridos","error")}};if(!I.gates.length)return b({});m(_,"vendido",I.gates,b)}async function C(_,I){if(c(_.id,{status:"lost",lostReason:I}),K.get().mock){J("Marcado perdido","info");return}try{await GS(_.id,I,_),J("Marcado perdido","info")}catch{J("Error","error")}}function k(){if(e.loading)return E();if(e.error)return T("⚠️","No se pudo cargar",e.error);const _=e.deals.filter(b=>b.status==="open");if(P(_),pe(i),!_.length){i.append(h("div",{class:"state"},[h("div",{class:"state__icon",text:"🎯"}),h("div",{class:"state__title",text:"Embudo vacío"}),h("div",{class:"state__msg",text:"Convierte un lead en oportunidad desde la Bandeja para empezar."})]));return}const I=LS(_);es.forEach(b=>{const v=I[b.id]||[],U=v.reduce((oe,ye)=>oe+(Number(ye.amount)||0),0),re=h("div",{class:"pcol","data-stage":b.id},[h("div",{class:"pcol__head"},[h("div",{class:"u-row u-row--tight"},[h("span",{class:"pcol__dot",style:{background:YS(b.id)}}),h("strong",{text:b.label}),h("span",{class:"pcol__count",text:String(v.length)})]),h("span",{class:"u-caption u-faint",text:`${Math.round(b.prob*100)}% · ${Ki(U)||"$0"}`})]),h("div",{class:"pcol__drop","data-stage":b.id,role:"list"},v.map(D))]);F(re.querySelector(".pcol__drop"),b.id),i.append(re)})}function P(_){const I=ty(_),b=VS(_);pe(r),r.append(B("Oportunidades",String(_.length)),B("Valor del embudo",Ki(b)||"$0"),B("Forecast ponderado",Ki(I)||"$0",!0))}function B(_,I,b){return h("div",{class:"pstat"+(b?" pstat--hi":"")},[h("span",{class:"u-caption u-faint",text:_}),h("strong",{class:"pstat__v",text:I})])}function D(_){const I=OS(_),b=h("button",{class:"deal-card__amount",type:"button","data-action":"amount",title:"Editar monto"},[_.amount?Ki(_.amount):"+ monto"]),v=h("article",{class:"deal-card"+(I?" is-rotting":""),draggable:"true",tabindex:"0","data-id":_.id,"data-stage":_.stageId,role:"listitem","aria-label":`${_.name}, ${Math.round(ts(_.stageId)*100)}%`},[h("div",{class:"deal-card__top"},[h("span",{class:"avatar avatar--sm","aria-hidden":"true",text:Us(_.contactName)}),h("span",{class:"deal-card__name u-grow u-truncate",text:_.name}),I?h("span",{class:"deal-card__rot",title:"Estancado >14 días",text:"🐌"}):null]),_.vehicleName?h("div",{class:"u-caption u-muted u-truncate",text:"🚗 "+_.vehicleName}):null,h("div",{class:"deal-card__row"},[b,h("span",{class:"badge badge--gold",text:`${Math.round(ts(_.stageId)*100)}%`})]),h("div",{class:"deal-card__foot u-caption u-faint"},[h("span",{class:"u-grow u-truncate",text:_.ownerName?"👤 "+_.ownerName:"Sin asesor"}),h("span",{text:Jn(_.lastActivityAt)})]),h("div",{class:"deal-card__actions"},t?[L("stage","↔","Mover etapa"),L("won","✓","Marcar ganado"),L("lost","✕","Marcar perdido"),L("open","⤢","Abrir 360")]:[L("open","⤢","Abrir 360")])]);return v.addEventListener("dragstart",U=>{e.dragId=_.id,v.classList.add("is-dragging");try{U.dataTransfer.setData("text/plain",_.id),U.dataTransfer.effectAllowed="move"}catch{}}),v.addEventListener("dragend",()=>{e.dragId=null,v.classList.remove("is-dragging")}),v.addEventListener("click",U=>{const re=U.target.closest("[data-action]");if(re)return q(re.dataset.action,_,re)}),v}function L(_,I,b){return h("button",{class:"icon-btn icon-btn--xs",type:"button","data-action":_,title:b,"aria-label":b,draggable:"false"},[I])}function q(_,I,b){if(_==="open")return K.set({detailLeadId:I.leadId});if(_==="amount")return V(I,b);if(_==="stage")return wt(b,es.map(v=>({value:v.id,label:v.label,hint:Math.round(v.prob*100)+"%",active:v.id===I.stageId})),v=>l(I,v.value),{title:"Mover a etapa"});if(_==="won")return A(I);if(_==="lost")return wt(b,ap.map(v=>({value:v.id,label:v.label})),v=>C(I,v.value),{title:"Motivo de pérdida"})}function V(_,I){const b=h("input",{class:"deal-card__amount-input",type:"text",inputmode:"numeric",value:_.amount||"","aria-label":"Monto en COP"});I.replaceWith(b),b.focus(),b.select();const v=()=>{const U=parseInt(String(b.value).replace(/\D/g,""),10)||0;w(_,U)};b.addEventListener("keydown",U=>{U.key==="Enter"?(U.preventDefault(),v()):U.key==="Escape"&&k()}),b.addEventListener("blur",v)}function F(_,I){_.addEventListener("dragover",b=>{b.preventDefault(),_.classList.add("is-over"),b.dataTransfer&&(b.dataTransfer.dropEffect="move")}),_.addEventListener("dragleave",()=>_.classList.remove("is-over")),_.addEventListener("drop",b=>{b.preventDefault(),_.classList.remove("is-over");const v=e.dragId||b.dataTransfer&&b.dataTransfer.getData("text/plain"),U=e.deals.find(re=>re.id===v);U&&l(U,I)})}function T(_,I,b){pe(i),i.append(h("div",{class:"state"},[h("div",{class:"state__icon",text:_}),h("div",{class:"state__title",text:I}),h("div",{class:"state__msg",text:b})]))}function E(){pe(r),pe(i),es.slice(0,5).forEach(()=>{i.append(h("div",{class:"pcol"},[h("div",{class:"pcol__head"},[h("span",{class:"skeleton",style:{width:"60%",height:"14px"}})]),h("div",{class:"pcol__drop"},[1,2].map(()=>h("div",{class:"deal-card",style:{pointerEvents:"none"}},[h("span",{class:"skeleton",style:{width:"100%",height:"52px"}})])))]))})}function g(){if(K.get().mock){e.deals=X_(),e.loading=!1,k();return}e.sub=US({pageSize:150,onData:_=>{e.deals=_,e.loading=!1,e.error=null,k()},onError:_=>{e.loading=!1,e.error=_&&_.code==="permission-denied"?"Sin permiso para ver el pipeline.":"Revisa tu conexión.",k()}})}return k(),g(),function(){e.sub&&e.sub(),e.sub=null}}function YS(n){return{nuevo:"var(--temp-cold)",contactado:"var(--info)",cita_agendada:"#8A7CFF",visito:"var(--gold-500)",test_drive:"var(--gold-600)",negociacion:"var(--warning)",financiacion:"var(--success)"}[n]||"var(--ink-400)"}const JS=["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"],lp=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];function Ts(n){const e=n.getFullYear(),t=String(n.getMonth()+1).padStart(2,"0"),r=String(n.getDate()).padStart(2,"0");return`${e}-${t}-${r}`}function sy(n,e){const r=(new Date(n,e,1).getDay()+6)%7,i=new Date(n,e+1,0).getDate(),s=[];for(let c=0;c<r;c++)s.push({date:new Date(n,e,1-r+c),inMonth:!1});for(let c=1;c<=i;c++)s.push({date:new Date(n,e,c),inMonth:!0});for(;s.length%7!==0;){const c=s[s.length-1].date;s.push({date:new Date(c.getFullYear(),c.getMonth(),c.getDate()+1),inMonth:!1})}const o=[];for(let c=0;c<s.length;c+=7)o.push(s.slice(c,c+7));return o}function XS(n,e){const t=sy(n,e),r=t[0][0].date,s=t[t.length-1][6].date,o=new Date(s.getFullYear(),s.getMonth(),s.getDate()+1);return{startISO:r.toISOString(),endISO:o.toISOString()}}function ZS(n){const e={};for(const t of n){if(!t.dueAt)continue;const r=Ts(new Date(t.dueAt));(e[r]||(e[r]=[])).push(t)}for(const t of Object.keys(e))e[t].sort((r,i)=>new Date(r.dueAt)-new Date(i.dueAt));return e}function up(n){const e=new Date(n);return Number.isNaN(e.getTime())?"":e.toLocaleTimeString("es-CO",{hour:"2-digit",minute:"2-digit"})}function eP(n,e){return n.getFullYear()===e.getFullYear()&&n.getMonth()===e.getMonth()&&n.getDate()===e.getDate()}const tP=n=>({id:n.id,...n.data()}),nP=()=>K.get().user?K.get().user.uid:null;function rP(n,e,t,r){const i=vt(Ce(he,"activities"),si("dueAt",">=",n),si("dueAt","<",e),kt("dueAt","asc"));return Fs(i,s=>t(s.docs.map(tP)),s=>r&&r(s))}async function iP(n,e,t){return Qt(Ce(he,"activities"),{type:"cita",subject:t||"Cita con "+(n.fullName||""),body:"",status:"open",direction:"outbound",dueAt:e,relatedTo:{type:"lead",id:n.id||null,name:n.fullName||""},ownerId:n.ownerId||nP(),createdAt:new Date().toISOString(),_version:1})}function sP(n){const e=new Date,t={year:e.getFullYear(),month:e.getMonth(),events:[],loading:!0,error:null,sub:null},r=h("div",{class:"agenda__head"}),i=h("p",{class:"u-muted u-caption",style:{margin:"0",padding:"8px 10px",border:"1px dashed var(--line, #444)",borderRadius:"8px"}},["✅ Las citas que los clientes piden desde la web YA aparecen aquí (solo lectura). Para confirmar/reprogramar/cancelar usa el ",h("a",{href:"/admin.html#solicitudes",target:"_blank",rel:"noopener",text:"calendario del panel clásico"})," — esos botones llegan aquí en la siguiente entrega."]),s=h("div",{class:"agenda__weekdays"},JS.map(P=>h("span",{class:"agenda__wd",text:P}))),o=h("div",{class:"agenda__grid"}),c=h("section",{class:"agenda"},[r,i,s,o]);pe(n),n.append(c);function l(P){let B=t.month+P,D=t.year;B<0?(B=11,D--):B>11&&(B=0,D++),t.year=D,t.month=B,k()}function d(){t.year=e.getFullYear(),t.month=e.getMonth(),k()}function p(){pe(r);const P=h("div",{class:"u-row u-row--tight"},[m("‹","Mes anterior",()=>l(-1)),h("button",{class:"btn btn--soft btn--sm",type:"button",onclick:d},["Hoy"]),m("›","Mes siguiente",()=>l(1))]);r.append(h("h2",{class:"agenda__title",text:`${lp[t.month]} ${t.year}`}),P)}function m(P,B,D){const L=h("button",{class:"icon-btn",type:"button","aria-label":B},[P]);return L.addEventListener("click",D),L}function w(){if(p(),pe(o),t.error){o.append(h("div",{class:"state"},[h("div",{class:"state__icon",text:"⚠️"}),h("div",{class:"state__title",text:"No se pudo cargar la agenda"}),h("div",{class:"state__msg",text:t.error})]));return}const P=ZS(t.events);sy(t.year,t.month).forEach(D=>{D.forEach(L=>{const q=Ts(L.date),V=P[q]||[],F=eP(L.date,e),T=h("div",{class:"agenda__day"+(L.inMonth?"":" is-out")+(F?" is-today":""),role:"gridcell"},[h("div",{class:"agenda__daynum",text:String(L.date.getDate())})]),E=h("div",{class:"agenda__events"});if(V.slice(0,3).forEach(g=>E.append(A(g))),V.length>3){const g=h("button",{class:"agenda__more",type:"button"},[`+${V.length-3} más`]);g.addEventListener("click",()=>wt(g,V.map(_=>({value:_,label:`${up(_.dueAt)} · ${_.relatedTo?.name||_.subject||"Cita"}`})),_=>C(_.value),{title:`${L.date.getDate()} ${lp[t.month]}`})),E.append(g)}T.append(E),o.append(T)})})}function A(P){const B=h("button",{class:"agenda__chip",type:"button",title:P.subject||"Cita"},[h("span",{class:"agenda__chip-time",text:up(P.dueAt)}),h("span",{class:"u-truncate",text:P.relatedTo?.name||P.subject||"Cita"})]);return B.addEventListener("click",()=>C(P)),B}function C(P){const B=P.relatedTo&&P.relatedTo.id;B&&K.set({detailLeadId:B})}function k(){if(w(),t.sub&&(t.sub(),t.sub=null),K.get().mock){t.events=TS(),t.loading=!1,w();return}const{startISO:P,endISO:B}=XS(t.year,t.month);t.sub=rP(P,B,D=>{t.events=D,t.loading=!1,t.error=null,w()},D=>{t.loading=!1,t.error=D&&D.code==="permission-denied"?"Sin permiso.":"Revisa tu conexión.",w()})}return k(),function(){t.sub&&t.sub(),t.sub=null}}const oP=n=>{const e=new Date(n).getTime();return Number.isNaN(e)?0:e},ec=n=>n.status==="won",oy=n=>n.status==="lost",Qu=n=>n.status==="open",Yu=n=>n.status==="convertido";function dp(n,e){return e?n.filter(t=>oP(t.createdAt)>=e):n.slice()}function aP(n,e){const t=n.length,r=n.filter(Yu).length,i=e.filter(ec),s=e.filter(oy),o=i.reduce((l,d)=>l+(Number(d.amount)||0),0),c=i.length+s.length;return{leadsNew:t,convertidos:r,convRate:t?r/t:0,won:i.length,lost:s.length,winRate:c?i.length/c:0,wonValue:o}}function cP(n,e){const t=e.filter(Qu),r=n.filter(s=>!ci(s.status)),i=r.filter(s=>{const o=G_(s);return!o.closed&&(o.state==="warn"||o.state==="late")}).length;return{leadsActive:r.length,dealsOpen:t.length,pipelineWeighted:ty(t),slaRisk:i}}function lP(n,e){const t=new Set(e.filter(ec).map(d=>d.id)),r=n.filter(d=>d.status==="contactado"||d.status==="calificado"||d.status==="convertido"),i=n.filter(d=>d.status==="calificado"||d.status==="convertido"),s=n.filter(Yu),o=s.filter(d=>d.convertedTo&&t.has(d.convertedTo.dealId)),c=n.length||1,l=[{key:"leads",label:"Leads",count:n.length},{key:"contactados",label:"Contactados",count:r.length},{key:"calificados",label:"Calificados",count:i.length},{key:"convertidos",label:"Convertidos",count:s.length},{key:"ganados",label:"Ganados",count:o.length}];return l.map((d,p)=>({...d,pctTop:d.count/c,convFromPrev:p===0?1:l[p-1].count?d.count/l[p-1].count:0}))}function uP(n,e){const t={},r=i=>t[i.key]||(t[i.key]={key:i.key,label:i.label,icon:i.icon,leads:0,convertidos:0,deals:0,won:0,revenue:0});return n.forEach(i=>{const s=r(Es(i));s.leads++,Yu(i)&&s.convertidos++}),e.forEach(i=>{const s=r(Es(i));s.deals++,ec(i)&&(s.won++,s.revenue+=Number(i.amount)||0)}),Object.values(t).map(i=>({...i,convRate:i.leads?i.convertidos/i.leads:0})).sort((i,s)=>s.leads-i.leads||s.revenue-i.revenue)}function dP(n){const e=n.filter(Qu);return es.map(t=>{const r=e.filter(i=>i.stageId===t.id);return{id:t.id,label:t.label,prob:t.prob,count:r.length,value:r.reduce((i,s)=>i+(Number(s.amount)||0),0),weighted:r.reduce((i,s)=>i+Wu(s),0)}})}function hP(n,e,t=[]){const r={},i=(s,o)=>r[s]||(r[s]={ownerId:s,ownerName:o,leads:0,deals:0,won:0,lost:0,pipelineWeighted:0});return t.forEach(s=>i(s.uid,s.nombre)),n.forEach(s=>{const o=s.ownerId||"_none";i(o,s.ownerName||(o==="_none"?"Sin asignar":o)).leads++}),e.forEach(s=>{const o=s.ownerId||"_none",c=i(o,s.ownerName||(o==="_none"?"Sin asignar":o));c.deals++,ec(s)?c.won++:oy(s)?c.lost++:Qu(s)&&(c.pipelineWeighted+=Wu(s))}),Object.values(r).filter(s=>s.leads||s.deals).map(s=>({...s,winRate:s.won+s.lost?s.won/(s.won+s.lost):0})).sort((s,o)=>o.won-s.won||o.pipelineWeighted-s.pipelineWeighted||o.leads-s.leads)}function fP(n,e=30){const t=[],r={},i=new Date;for(let s=e-1;s>=0;s--){const o=new Date(i.getFullYear(),i.getMonth(),i.getDate()-s),c={key:Ts(o),date:o,count:0};t.push(c),r[c.key]=c}return n.forEach(s=>{if(!s.createdAt)return;const o=r[Ts(new Date(s.createdAt))];o&&o.count++}),t}const hp=[{value:0,label:"Hoy"},{value:7,label:"7 días"},{value:30,label:"30 días"},{value:90,label:"90 días"},{value:null,label:"Todo"}];function pP(n){if(n==null)return null;const e=new Date;return new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime()-n*864e5}const mP=n=>({id:n.id,...n.data()});async function fp(n,e){return(await cr(vt(Ce(he,n),kt("createdAt","desc"),Dt(e)))).docs.map(mP)}async function gP({pageSize:n=500}={}){if(K.get().mock)return{leads:ma(),deals:X_(),capped:!1};const[e,t]=await Promise.all([fp("leads",n),fp("deals",n)]);return{leads:e.filter(i=>!i.archived),deals:t,capped:e.length>=n||t.length>=n}}const _P="http://www.w3.org/2000/svg";function Fc(n,e={},t=[]){const r=document.createElementNS(_P,n);for(const[i,s]of Object.entries(e))s==null||s===!1||r.setAttribute(i,String(s));for(const i of[].concat(t))i==null||i===!1||i===""||r.append(i.nodeType?i:document.createTextNode(String(i)));return r}function yP(n,e={}){const t=e.max!=null?e.max:Math.max(1,...n.map(i=>Number(i.value)||0)),r=h("div",{class:"reportes__bars",role:"list"});return n.forEach(i=>{const s=i.pct!=null?i.pct:t?(Number(i.value)||0)/t:0,o=Math.max(0,Math.min(100,s*100));r.append(h("div",{class:"reportes__bar",role:"listitem"},[h("span",{class:"reportes__bar-label u-truncate",text:i.label}),h("span",{class:"reportes__bar-track","aria-hidden":"true"},[h("span",{class:"reportes__bar-fill",style:{width:o+"%",background:i.color||"var(--grad-gold)"}})]),h("span",{class:"reportes__bar-val u-mono",text:i.display!=null?i.display:String(i.value)})]))}),r}function vP(n){const i=n.map(C=>Number(C.value)||0),s=Math.max(...i,0),o=Math.max(1,s),c=n.length,l=C=>c<=1?600/2:6+C*(600-2*6)/(c-1),d=C=>134-C/o*(140-2*6),p=n.map((C,k)=>`${l(k).toFixed(1)},${d(i[k]).toFixed(1)}`).join(" "),m=`6,134 ${p} ${594 .toFixed(1)},134`,w=i.reduce((C,k)=>C+k,0),A=(n[i.indexOf(s)]||{}).label||"";return Fc("svg",{class:"reportes__spark",viewBox:"0 0 600 140",preserveAspectRatio:"none",role:"img","aria-label":`Tendencia: ${w} en total; pico de ${s}${A?" el "+A:""}.`},[Fc("polygon",{points:m,fill:"var(--gold-300)",opacity:"0.30"}),Fc("polyline",{points:p,fill:"none",stroke:"var(--gold-500)","stroke-width":"2","stroke-linejoin":"round","stroke-linecap":"round","vector-effect":"non-scaling-stroke"})])}const lt=n=>Math.round((n||0)*100)+"%",on=n=>Ki(n)||"$0",Uc=n=>`${n.getDate()}/${n.getMonth()+1}`;function IP(n){const e={leads:[],deals:[],loading:!0,error:null,capped:!1,days:30};let t=!0;const r=h("div",{class:"reportes__chips",role:"group","aria-label":"Período"}),i=h("button",{class:"btn btn--soft btn--sm",type:"button"},["↻ Actualizar"]),s=h("button",{class:"btn btn--soft btn--sm",type:"button"},["⤓ CSV"]);i.addEventListener("click",E),s.addEventListener("click",T);const o=h("div",{class:"reportes__toolbar"},[r,h("div",{class:"u-row u-row--tight"},[i,s])]),c=h("div",{class:"reportes__body"}),l=h("section",{class:"reportes"},[o,c]);pe(n),n.append(l);function d(){pe(r),hp.forEach(g=>{const _=e.days===g.value,I=h("button",{class:"chip",type:"button","aria-pressed":_?"true":"false"},[g.label]);I.addEventListener("click",()=>{e.days=g.value,m()}),r.append(I)})}function p(){const g=pP(e.days),_=dp(e.leads,g),I=dp(e.deals,g);return{pLeads:_,pDeals:I,pk:aP(_,I),ck:cP(e.leads,e.deals),fn:lP(_,e.deals),src:uP(_,I),stg:dP(e.deals),own:hP(_,I,K.get().mock?J_():K.get().team||[]),tr:fP(e.leads,30)}}function m(){if(d(),e.loading)return F();if(e.error)return V("⚠️","No se pudieron cargar los reportes",e.error);if(!e.leads.length&&!e.deals.length)return V("📊","Aún no hay datos para reportar","Cuando entren leads y oportunidades, aquí verás tus KPIs, el embudo y el rendimiento por fuente.");const g=p();pe(c),e.capped&&c.append(h("div",{class:"reportes__notice u-caption"},["ℹ️ Mostrando los registros más recientes (tope por carga). Los totales históricos completos llegarán con los reportes acumulados."])),c.append(w("Del período",[A("Leads nuevos",String(g.pk.leadsNew)),A("Tasa de conversión",lt(g.pk.convRate),`${g.pk.convertidos} de ${g.pk.leadsNew}`),A("Win rate",lt(g.pk.winRate),`${g.pk.won} ganadas · ${g.pk.lost} perdidas`),A("Valor ganado",on(g.pk.wonValue),null,!0)]),w("Estado actual",[A("Leads activos",String(g.ck.leadsActive)),A("Oportunidades abiertas",String(g.ck.dealsOpen)),A("Pipeline ponderado",on(g.ck.pipelineWeighted),null,!0),A("SLA en riesgo",String(g.ck.slaRisk),g.ck.slaRisk?"requieren atención":"al día")]),C(g.fn),k(g.src),P(g.stg),B(g.tr),D(g.own))}function w(g,_){return h("div",{class:"reportes__section"},[h("h2",{class:"reportes__sec-title",text:g}),h("div",{class:"reportes__kpis"},_)])}function A(g,_,I,b){return h("div",{class:"reportes__kpi"+(b?" reportes__kpi--hi":"")},[h("span",{class:"reportes__kpi-label u-caption u-faint",text:g}),h("strong",{class:"reportes__kpi-val",text:_}),I?h("span",{class:"reportes__kpi-sub u-caption u-faint",text:I}):null])}function C(g){const _=g.map((I,b)=>({label:I.label,value:I.count,pct:I.pctTop,display:b===0?String(I.count):`${I.count} · ${lt(I.convFromPrev)}`,color:"var(--grad-gold)"}));return L("Embudo de ventas","De lead a venta — dónde se pierde el avance",yP(_,{max:g[0]?g[0].count:1}))}function k(g){const _=["Canal","Leads","Conv.","Oport.","Ganados","Ingresos"],I=g.map(v=>[`${v.icon||""} ${v.label}`.trim(),String(v.leads),lt(v.convRate),String(v.deals),String(v.won),on(v.revenue)]),b=g.length?null:"Sin leads en el período.";return L("Rendimiento por canal","Atribución de fuente: de dónde vienen y cuánto rinden",q(_,I,b))}function P(g){const _=["Etapa","Prob.","Oport.","Valor","Ponderado"],I=g.map(U=>[U.label,lt(U.prob),String(U.count),on(U.value),on(U.weighted)]),b=g.reduce((U,re)=>({count:U.count+re.count,value:U.value+re.value,weighted:U.weighted+re.weighted}),{count:0,value:0,weighted:0}),v=["Total","",String(b.count),on(b.value),on(b.weighted)];return L("Forecast por etapa","Pipeline abierto actual (no depende del período)",q(_,I,null,v))}function B(g){const _=g.reduce((U,re)=>U+re.count,0),I=g.map(U=>({label:Uc(U.date),value:U.count})),b=g.length?`${Uc(g[0].date)} – ${Uc(g[g.length-1].date)}`:"",v=h("div",{class:"reportes__chart"},[vP(I),h("div",{class:"reportes__axis u-caption u-faint"},[h("span",{text:b}),h("span",{text:`${_} leads`})])]);return L("Tendencia de captación","Nuevos leads · últimos 30 días",v)}function D(g){const _=["Asesor","Leads","Oport.","Ganados","Win rate","Pipeline pond."],I=g.map(v=>[v.ownerName,String(v.leads),String(v.deals),String(v.won),lt(v.winRate),on(v.pipelineWeighted)]),b=g.length?null:"Sin actividad asignada en el período.";return L("Rendimiento del equipo","Por asesor, en el período seleccionado",q(_,I,b))}function L(g,_,I){return h("div",{class:"reportes__section"},[h("div",{class:"reportes__sec-head"},[h("h2",{class:"reportes__sec-title",text:g}),_?h("span",{class:"reportes__sec-cap u-caption u-faint",text:_}):null]),I])}function q(g,_,I,b){if(!_.length&&I)return h("div",{class:"reportes__empty u-caption u-faint",text:I});const v=h("thead",{},[h("tr",{},g.map((oe,ye)=>h("th",{class:ye===0?"":"is-num",scope:"col",text:oe})))]),U=h("tbody",{},_.map(oe=>h("tr",{},oe.map((ye,Ke)=>h("td",{class:Ke===0?"":"is-num",text:ye}))))),re=[v,U];return b&&re.push(h("tfoot",{},[h("tr",{},b.map((oe,ye)=>ye===0?h("th",{scope:"row",text:oe}):h("td",{class:"is-num",text:oe})))])),h("div",{class:"reportes__tablewrap"},[h("table",{class:"reportes__table"},re)])}function V(g,_,I){pe(c),c.append(h("div",{class:"state"},[h("div",{class:"state__icon",text:g}),h("div",{class:"state__title",text:_}),h("div",{class:"state__msg",text:I})]))}function F(){pe(c);const g=h("div",{class:"reportes__kpis"},[1,2,3,4].map(()=>h("div",{class:"reportes__kpi"},[h("span",{class:"skeleton",style:{width:"100%",height:"46px"}})])));c.append(h("div",{class:"reportes__section"},[g])),c.append(h("div",{class:"reportes__section"},[h("span",{class:"skeleton",style:{width:"100%",height:"160px"}})]))}function T(){if(e.loading||e.error){J("Aún no hay datos para exportar","info");return}const g=p(),_=(hp.find(v=>v.value===e.days)||{}).label||"",I=[],b=v=>{I.push([]),I.push([v])};I.push(["Reporte Altorra CRM"]),I.push(["Período",_]),I.push(["Generado",new Date().toLocaleString("es-CO")]),b("KPIs del período"),I.push(["Métrica","Valor"]),I.push(["Leads nuevos",g.pk.leadsNew]),I.push(["Conversión",lt(g.pk.convRate)]),I.push(["Win rate",lt(g.pk.winRate)]),I.push(["Ganadas",g.pk.won]),I.push(["Perdidas",g.pk.lost]),I.push(["Valor ganado (COP)",g.pk.wonValue]),I.push(["Leads activos (ahora)",g.ck.leadsActive]),I.push(["Oportunidades abiertas (ahora)",g.ck.dealsOpen]),I.push(["Pipeline ponderado COP (ahora)",g.ck.pipelineWeighted]),I.push(["SLA en riesgo (ahora)",g.ck.slaRisk]),b("Embudo"),I.push(["Etapa","Cantidad","Conversión desde anterior"]),g.fn.forEach((v,U)=>I.push([v.label,v.count,U===0?"":lt(v.convFromPrev)])),b("Rendimiento por canal"),I.push(["Canal","Leads","Conversión","Oportunidades","Ganados","Ingresos (COP)"]),g.src.forEach(v=>I.push([v.label,v.leads,lt(v.convRate),v.deals,v.won,v.revenue])),b("Forecast por etapa (pipeline actual)"),I.push(["Etapa","Probabilidad","Oportunidades","Valor (COP)","Ponderado (COP)"]),g.stg.forEach(v=>I.push([v.label,lt(v.prob),v.count,v.value,v.weighted])),b("Rendimiento del equipo"),I.push(["Asesor","Leads","Oportunidades","Ganados","Win rate","Pipeline ponderado (COP)"]),g.own.forEach(v=>I.push([v.ownerName,v.leads,v.deals,v.won,lt(v.winRate),v.pipelineWeighted])),bP(`altorra-reportes-${Ts(new Date)}.csv`,EP(I)),J("Reporte exportado","ok")}async function E(){e.loading=!0,e.error=null,m();try{const g=await gP();if(!t)return;e.leads=g.leads,e.deals=g.deals,e.capped=!!g.capped,e.loading=!1}catch(g){if(!t)return;e.loading=!1,e.error=g&&g.code==="permission-denied"?"Sin permiso para ver los reportes.":"Revisa tu conexión e intenta de nuevo."}m()}return E(),function(){t=!1}}function wP(n){const e=n==null?"":String(n);return/[",\n\r;]/.test(e)?'"'+e.replace(/"/g,'""')+'"':e}function EP(n){return"\uFEFF"+n.map(e=>e.map(wP).join(",")).join(`\r
`)}function bP(n,e){const t=new Blob([e],{type:"text/csv;charset=utf-8;"}),r=URL.createObjectURL(t),i=document.createElement("a");i.href=r,i.download=n,document.body.append(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(r),1e3)}const _a=n=>({id:n.id,...n.data()});async function TP({pageSize:n=500}={}){if(K.get().mock)return{contacts:vS(),leads:ma()};const[e,t]=await Promise.all([cr(vt(Ce(he,"contacts"),kt("createdAt","desc"),Dt(n))).then(r=>r.docs.map(_a)),cr(vt(Ce(he,"leads"),kt("createdAt","desc"),Dt(n))).then(r=>r.docs.map(_a))]);return{contacts:e,leads:t}}async function AP(n){if(!n)return null;const e=await I_(ft(he,"contacts",n));return e.exists()?{id:e.id,...e.data()}:null}function RP(n,e,t){const r=vt(Ce(he,"activities"),si("relatedTo.id","==",n),kt("createdAt","desc"),Dt(50));return Fs(r,i=>e(i.docs.map(_a)),i=>t&&t(i))}function SP(n,e,t){const r=vt(Ce(he,"contacts",n,"crmNotes"),kt("createdAt","desc"),Dt(50));return Fs(r,i=>e(i.docs.map(_a)),i=>t&&t(i))}async function PP(n,e){const t=K.get().user;await Qt(Ce(he,"contacts",n,"crmNotes"),{body:String(e||"").trim(),authorId:t?t.uid:null,authorName:K.get().profile&&K.get().profile.nombre||t&&t.email||"Asesor",createdAt:new Date().toISOString()})}const CP=[{id:"todos",label:"Todos"},{id:"lead",label:"Leads"},{id:"cliente",label:"Clientes"},{id:"suscriptor",label:"Suscriptores"}],kP={lead:{label:"Lead",badge:"gold"},cliente:{label:"Cliente",badge:"ok"},suscriptor:{label:"Suscriptor",badge:"info"}};function pp(n){const e=String(n.lifecycleStage||n.type||"").toLowerCase();return e==="subscriber"||e==="suscriptor"?"suscriptor":e==="customer"||e==="cliente"?"cliente":"lead"}function DP(n){const e={contacts:[],leads:[],loading:!0,error:null,q:"",filter:"todos"};let t=!0;const r=h("input",{type:"search",placeholder:"Buscar por nombre, correo o teléfono…","aria-label":"Buscar contactos"});r.addEventListener("input",()=>{e.q=r.value,C()});const i=h("div",{class:"search"},[h("span",{"aria-hidden":"true",text:"🔎"}),r]),s={},o=h("div",{class:"contactos__chips",role:"group","aria-label":"Filtrar por tipo"});CP.forEach(D=>{const L=h("button",{class:"chip",type:"button","aria-pressed":D.id===e.filter?"true":"false"},[D.label]);L.addEventListener("click",()=>{e.filter=D.id,Object.entries(s).forEach(([q,V])=>V.setAttribute("aria-pressed",q===D.id?"true":"false")),C()}),s[D.id]=L,o.append(L)});const c=h("span",{class:"contactos__count u-caption u-faint"}),l=h("button",{class:"btn btn--soft btn--sm",type:"button"},["↻ Actualizar"]);l.addEventListener("click",B);const d=h("div",{class:"contactos__toolbar"},[i,o,h("div",{class:"u-row u-row--tight"},[c,l])]),p=h("div",{class:"contactos__list"}),m=h("section",{class:"contactos"},[d,p]);pe(n),n.append(m);function w(){const D={};for(const L of e.leads){if(!L.contactId)continue;const q=D[L.contactId];(!q||new Date(L.createdAt)>new Date(q.createdAt))&&(D[L.contactId]=L)}return D}function A(D){K.set({leads:e.leads,detailLeadId:D.id})}function C(){if(e.loading)return P("⏳","Cargando contactos…","");if(e.error)return P("⚠️","No se pudieron cargar los contactos",e.error);if(!e.contacts.length)return P("👥","Aún no hay contactos","Cuando entren leads, registros de cuenta o suscripciones, las personas aparecerán aquí.");const D=w(),L=pa(e.q),q=e.contacts.filter(V=>e.filter!=="todos"&&pp(V)!==e.filter?!1:L?pa(`${V.fullName||""} ${V.email||""} ${V.phone||""}`).includes(L):!0);if(c.textContent=`${q.length} de ${e.contacts.length}`,pe(p),!q.length){p.append(h("div",{class:"state"},[h("div",{class:"state__icon",text:"🔍"}),h("div",{class:"state__title",text:"Sin resultados"}),h("div",{class:"state__msg",text:"Prueba con otro término o filtro."})]));return}q.forEach(V=>p.append(k(V,D[V.id])))}function k(D,L){const q=pp(D),V=kP[q],F=Es(D),T=Number(D.score)>0&&jr[D.rating],E=h("div",{class:"contact-row__badges"},[h("span",{class:`badge badge--${V.badge}`,text:V.label}),h("span",{class:"badge",text:`${F.icon} ${F.label}`}),T?h("span",{class:`temp ${jr[D.rating].cls}`,text:`${jr[D.rating].icon} ${D.score}`}):null]),g=[D.email,D.phone].filter(Boolean).join(" · ")||"Sin datos de contacto",_=Array.isArray(D.tags)&&D.tags.length?h("span",{class:"contact-row__tags u-caption u-faint u-truncate",text:"🏷️ "+D.tags.join(", ")}):null,I=[h("span",{class:"avatar avatar--sm","aria-hidden":"true",text:Us(D.fullName)}),h("div",{class:"contact-row__main"},[h("span",{class:"contact-row__name u-truncate",text:D.fullName||"Sin nombre"}),h("span",{class:"contact-row__sub u-caption u-faint u-truncate",title:g,text:g}),_]),E,h("span",{class:"contact-row__time u-caption u-faint",text:Jn(D.lastActivityAt)})];if(L){const b=h("button",{class:"contact-row",type:"button","aria-label":`Ver ficha de ${D.fullName||"contacto"}`},I);return b.addEventListener("click",()=>A(L)),b}return h("div",{class:"contact-row contact-row--nolead"},I)}function P(D,L,q){c.textContent="",pe(p),p.append(h("div",{class:"state"},[h("div",{class:"state__icon",text:D}),h("div",{class:"state__title",text:L}),q?h("div",{class:"state__msg",text:q}):null]))}async function B(){e.loading=!0,e.error=null,C();try{const D=await TP();if(!t)return;e.contacts=D.contacts,e.leads=D.leads,e.loading=!1}catch(D){if(!t)return;e.loading=!1,e.error=D&&D.code==="permission-denied"?"Sin permiso para ver los contactos.":"Revisa tu conexión e intenta de nuevo."}C()}return B(),function(){t=!1}}const NP={solicitud_inbound:"📥",whatsapp:"💬",status_change:"🔁",nota:"🗒️",email:"✉️",llamada:"📞"};function xP(n){let e=null,t=null,r=null,i="resumen",s={lead:null,contact:null,activities:[],notes:[]};const o=h("aside",{class:"detail",role:"dialog","aria-modal":"true","aria-label":"Ficha del cliente"}),c=h("div",{class:"detail-overlay",hidden:!0},[o]);n.append(c),c.addEventListener("mousedown",V=>{V.target===c&&l()}),window.addEventListener("keydown",V=>{V.key==="Escape"&&e&&l()}),K.subscribe(V=>{V.detailLeadId!==e&&p(V.detailLeadId)});function l(){K.set({detailLeadId:null})}function d(){t&&(t(),t=null),r&&(r(),r=null)}function p(V){if(d(),e=V,!V){c.hidden=!0,document.body.classList.remove("has-detail"),pe(o);return}i="resumen",c.hidden=!1,document.body.classList.add("has-detail"),m(V)}function m(V){const F=(K.get().leads||[]).find(T=>T.id===V);s={lead:F||null,contact:null,activities:[],notes:[]},w(),F&&(K.get().mock?(s.contact=yS(F.contactId),s.activities=_S(V),s.notes=sp(F.contactId),w()):(AP(F.contactId).then(T=>{s.contact=T,w()}).catch(()=>{}),t=RP(V,T=>{s.activities=T,w()},()=>{}),F.contactId&&(r=SP(F.contactId,T=>{s.notes=T,w()},()=>{}))))}function w(){pe(o);const V=s.lead;if(!V){o.append(A(null)),o.append(h("div",{class:"state"},[h("div",{class:"state__icon",text:"🔍"}),h("div",{class:"state__title",text:"Lead no disponible"}),h("div",{class:"state__msg",text:"Recarga la Bandeja e inténtalo otra vez."})]));return}o.append(A(V)),o.append(C());const F=h("div",{class:"detail__body"});i==="resumen"?F.append(k(V)):i==="comms"?F.append(B()):i==="score"?F.append(D(V)):i==="notas"&&F.append(L(V)),o.append(F)}function A(V){const F=h("button",{class:"icon-btn",type:"button","aria-label":"Cerrar"},["✕"]);if(F.addEventListener("click",l),!V)return h("div",{class:"detail__header"},[h("div",{class:"u-grow"}),F]);const T=q(V),E=jr[T.rating],g=Vo(V.status),_=Za(V),I=Es(V),b=h("button",{class:"btn btn--wa btn--sm",type:"button"},["💬 WhatsApp"]);b.addEventListener("click",()=>{const oe=q_(V.phone,`Hola ${String(V.fullName||"").split(" ")[0]||""}, te saluda Altorra Cars 👋`);if(!oe)return J("Sin teléfono","error");window.open(oe,"_blank","noopener")});const v=Br("crm.edit"),U=v&&V.status!=="convertido"?h("button",{class:"btn btn--soft btn--sm",type:"button"},["🎯 Convertir"]):null;U&&U.addEventListener("click",()=>ry(V,{}));const re=v?h("button",{class:"icon-btn",type:"button","aria-label":"Agendar cita",title:"Agendar cita"},["📅"]):null;return re&&re.addEventListener("click",()=>VP(V,re)),h("div",{class:"detail__header"},[h("div",{class:"u-row u-grow",style:{minWidth:"0"}},[h("span",{class:"avatar","aria-hidden":"true",text:Us(V.fullName)}),h("div",{class:"u-grow",style:{minWidth:"0"}},[h("h2",{class:"detail__name u-truncate",text:V.fullName}),h("div",{class:"u-row u-row--tight",style:{flexWrap:"wrap"}},[h("span",{class:`temp ${E.cls}`,text:`${E.icon} ${E.label} · ${T.score}`}),h("span",{class:`badge badge--${g.badge||""}`.trim(),text:g.label}),h("span",{class:"badge",text:`${_.icon} ${_.label}`}),h("span",{class:"badge",text:`${I.icon} ${I.label}`})])])]),h("div",{class:"u-row u-row--tight"},[U,re,b,F])])}function C(){const V=[["resumen","Resumen"],["comms","Comunicaciones"],["score","Score"],["notas","Notas"]],F=h("div",{class:"detail__tabs",role:"tablist"});return V.forEach(([T,E])=>{const g=h("button",{class:"detail__tab"+(i===T?" is-active":""),role:"tab","aria-selected":String(i===T),type:"button"},[E]);g.addEventListener("click",()=>{i=T,w()}),F.append(g)}),F}function k(V){const F=s.contact,T=F&&F.consent?F.consent:null,E=[["Correo",V.email||"—"],["Teléfono",V.phone||"—"],["Interés",V.sourceDetail||"—"],["Vehículo",V.vehicleOfInterestId||"—"],["Asesor",V.ownerName||"Sin asignar"],["Origen",V.source||"—"],["Capturado",kR(V.createdAt)],["Última actividad",Jn(V.lastActivityAt)]],g=W_(V,{score:q(V).score});return h("div",{class:"u-stack"},[h("div",{class:"detail-card detail-card--nba"},[h("span",{class:"detail-card__icon","aria-hidden":"true",text:g.icon}),h("div",{class:"u-grow"},[h("div",{class:"u-caption u-muted",text:"Próxima mejor acción"}),h("strong",{text:g.label}),h("div",{class:"u-caption u-faint",text:g.reason})])]),h("dl",{class:"kv"},E.flatMap(([_,I])=>[h("dt",{text:_}),h("dd",{class:"u-truncate",text:I})])),T?P(T):null])}function P(V){const F=T=>T?"✅":"⛔";return h("div",{class:"detail-card"},[h("div",{class:"u-caption u-muted",text:"Consentimiento (Ley 1581)"}),h("div",{class:"u-row",style:{flexWrap:"wrap",gap:"12px"}},[h("span",{class:"u-caption",text:`${F(V.email)} Email`}),h("span",{class:"u-caption",text:`${F(V.whatsapp)} WhatsApp`}),h("span",{class:"u-caption",text:`${F(V.calls)} Llamadas`})]),h("div",{class:"u-caption u-faint",text:`Política ${V.policyVersion||"v1"} · origen ${V.source||"—"}`})])}function B(){if(!s.activities.length)return h("div",{class:"state"},[h("div",{class:"state__icon",text:"📭"}),h("div",{class:"state__title",text:"Sin comunicaciones"}),h("div",{class:"state__msg",text:"Aún no hay actividades registradas para este lead."})]);const V=h("ol",{class:"timeline"});return s.activities.forEach(F=>{V.append(h("li",{class:"timeline__item timeline__item--"+(F.direction||"inbound")},[h("span",{class:"timeline__icon","aria-hidden":"true",text:NP[F.type]||"•"}),h("div",{class:"u-grow"},[h("div",{class:"u-spread"},[h("strong",{class:"u-truncate",text:F.subject||F.type||"Actividad"}),h("span",{class:"u-caption u-faint",text:Jn(F.createdAt)})]),F.body?h("div",{class:"u-caption u-muted",text:F.body}):null])]))}),V}function D(V){const F=q(V),T=jr[F.rating],E=Object.keys(rp).map(g=>{const _=Math.round((F.factors[g]||0)*100);return h("div",{class:"factor"},[h("div",{class:"u-spread u-caption"},[h("span",{text:rp[g]}),h("span",{class:"u-faint",text:`${_}% · peso ${Math.round(JR[g]*100)}%`})]),h("div",{class:"factor__track"},[h("div",{class:"factor__fill",style:{width:_+"%"}})])])});return h("div",{class:"u-stack"},[h("div",{class:"scorehero"},[h("div",{class:`scorehero__num ${T.cls}`,text:String(F.score)}),h("div",{class:"u-stack",style:{gap:"2px"}},[h("strong",{text:`${T.icon} ${T.label}`}),h("span",{class:"u-caption u-faint",text:"Heurística determinista (7 factores, sin IA)"})])]),h("div",{class:"u-stack",style:{gap:"10px"}},E)])}function L(V){const F=Br("crm.edit")||Br("crm.create"),T=h("textarea",{class:"textarea",placeholder:"Escribe una nota interna…",rows:"3"}),E=h("button",{class:"btn btn--gold btn--sm",type:"button"},["Agregar nota"]);E.addEventListener("click",async()=>{const _=T.value.trim();if(!_)return;E.disabled=!0;const I={body:_,authorName:"Tú",createdAt:new Date().toISOString()};try{K.get().mock?(IS(V.contactId,I),s.notes=sp(V.contactId),w()):(await PP(V.contactId,_),T.value=""),J("Nota agregada","ok")}catch{J("No se pudo guardar la nota","error")}finally{E.disabled=!1}});const g=h("div",{class:"u-stack"});return s.notes.length||g.append(h("div",{class:"u-caption u-faint",style:{padding:"8px 0"},text:"Aún no hay notas."})),s.notes.forEach(_=>g.append(h("div",{class:"detail-card"},[h("div",{class:"u-caption u-muted",text:_.body}),h("div",{class:"u-caption u-faint",text:`${_.authorName||"Asesor"} · ${Jn(_.createdAt)}`})]))),h("div",{class:"u-stack"},[F?h("div",{class:"u-stack",style:{gap:"8px"}},[T,h("div",{class:"u-row",style:{justifyContent:"flex-end"}},[E])]):null,g])}function q(V){return H_(V,s.activities||[],s.contact)}}function VP(n,e){const t=A=>String(A).padStart(2,"0"),r=new Date;r.setDate(r.getDate()+1),r.setHours(10,0,0,0);const i=`${r.getFullYear()}-${t(r.getMonth()+1)}-${t(r.getDate())}T${t(r.getHours())}:${t(r.getMinutes())}`,s=h("input",{class:"input",type:"text",value:"Cita con "+(n.fullName||""),"aria-label":"Asunto"}),o=h("input",{class:"input",type:"datetime-local",value:i,"aria-label":"Fecha y hora"}),c=h("button",{class:"btn btn--gold btn--sm btn--block",type:"button"},["Agendar"]),l=h("div",{class:"popover",role:"dialog","aria-label":"Agendar cita",style:{width:"260px",gap:"8px"}},[h("div",{class:"popover__title",text:"Agendar cita"}),s,o,c]);document.body.append(l);const d=e.getBoundingClientRect();l.style.top=`${Math.min(window.innerHeight-l.offsetHeight-8,d.bottom+6)}px`,l.style.left=`${Math.max(8,d.right-l.offsetWidth)}px`,setTimeout(()=>o.focus(),0);const p=()=>{l.remove(),document.removeEventListener("mousedown",m,!0),window.removeEventListener("keydown",w,!0)},m=A=>{l.contains(A.target)||p()},w=A=>{A.key==="Escape"&&p()};setTimeout(()=>{document.addEventListener("mousedown",m,!0),window.addEventListener("keydown",w,!0)},0),c.addEventListener("click",async()=>{const A=o.value?new Date(o.value).toISOString():null;if(!A){J("Elige fecha y hora","error");return}c.disabled=!0;try{K.get().mock?AS({type:"cita",subject:s.value,dueAt:A,relatedTo:{type:"lead",id:n.id,name:n.fullName},status:"open"}):await iP(n,A,s.value),J("📅 Cita agendada","ok"),p()}catch{J("No se pudo agendar","error"),c.disabled=!1}})}const ay=document.getElementById("app");My();const OP=new URLSearchParams(location.search).get("mock")==="1",LP={bandeja:iy,pipeline:QS,agenda:sP,reportes:IP,contactos:DP};let yo=null,qr=null,Hn=null,Pl=null,Mo=null;function mp(n){if(!qr||n===Pl)return;Hn&&(Hn(),Hn=null),K.get().detailLeadId&&K.set({detailLeadId:null}),Hn=(LP[n]||iy)(qr.outlet)||null,qr.setActive(n),Pl=n}function MP(){qr=xR(ay),xP(qr.detailRoot),mp(B_()),Mo=SR(mp)}function FP(){Hn&&(Hn(),Hn=null),Mo&&(Mo(),Mo=null),qr=null,Pl=null}function UP(n){n.ready&&(n.user&&yo!=="app"?(yo="app",MP()):!n.user&&yo!=="login"&&(FP(),yo="login",n.detailLeadId&&K.set({detailLeadId:null}),VR(ay)))}K.subscribe(UP);OP?K.set({mock:!0,ready:!0,user:{uid:"u_ceo",email:"demo@altorra.local"},profile:{nombre:"Rodrigo (CEO)",cargo:"CEO",rol:"super_admin"},permissions:["*"]}):IR();
