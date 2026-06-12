(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();function ab(n){let e={...n};const t=new Set;function r(){return e}function s(o){const c=typeof o=="function"?o(e):o;c&&(e={...e,...c},t.forEach(u=>u(e)))}function i(o){return t.add(o),()=>t.delete(o)}return{get:r,set:s,subscribe:i}}const H=ab({ready:!1,authError:null,user:null,profile:null,permissions:[],team:[],theme:"light",mock:!1,detailLeadId:null}),cm="altorra-crm-theme";function cb(){let n=localStorage.getItem(cm);n!=="light"&&n!=="dark"&&(n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),document.documentElement.dataset.theme=n,H.set({theme:n})}function lb(){const n=document.documentElement.dataset.theme==="dark"?"light":"dark";return document.documentElement.dataset.theme=n,localStorage.setItem(cm,n),H.set({theme:n}),n}var Nh={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lm=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},ub=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],o=n[t++],c=n[t++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],o=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},cu={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],o=s+1<n.length,c=o?n[s+1]:0,u=s+2<n.length,d=u?n[s+2]:0,f=i>>2,p=(i&3)<<4|c>>4;let g=(c&15)<<2|d>>6,b=d&63;u||(b=64,o||(g=64)),r.push(t[f],t[p],t[g],t[b])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(lm(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):ub(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const d=s<n.length?t[n.charAt(s)]:64;++s;const p=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||d==null||p==null)throw new db;const g=i<<2|c>>4;if(r.push(g),d!==64){const b=c<<4&240|d>>2;if(r.push(b),p!==64){const E=d<<6&192|p;r.push(E)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class db extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const hb=function(n){const e=lm(n);return cu.encodeByteArray(e,!0)},la=function(n){return hb(n).replace(/\./g,"")},um=function(n){try{return cu.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function dm(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const fb=()=>dm().__FIREBASE_DEFAULTS__,pb=()=>{if(typeof process>"u"||typeof Nh>"u")return;const n=Nh.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},mb=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&um(n[1]);return e&&JSON.parse(e)},za=()=>{try{return fb()||pb()||mb()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},hm=n=>{var e,t;return(t=(e=za())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},fm=n=>{const e=hm(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},pm=()=>{var n;return(n=za())===null||n===void 0?void 0:n.config},mm=n=>{var e;return(e=za())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bi{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function gb(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},n);return[la(JSON.stringify(t)),la(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ge(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function _b(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ge())}function vb(){var n;const e=(n=za())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function yb(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function bb(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function wb(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Ib(){const n=Ge();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function gm(){return!vb()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Ga(){try{return typeof indexedDB=="object"}catch{return!1}}function Eb(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tb="FirebaseError";class Mt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Tb,Object.setPrototypeOf(this,Mt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ps.prototype.create)}}class Ps{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?Ab(i,r):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new Mt(s,c,r)}}function Ab(n,e){return n.replace(Rb,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Rb=/\{\$([^}]+)}/g;function Sb(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function wi(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],o=e[s];if(Dh(i)&&Dh(o)){if(!wi(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Dh(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zi(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function ri(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function si(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function kb(n,e){const t=new Cb(n,e);return t.subscribe.bind(t)}class Cb{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Pb(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Kc),s.error===void 0&&(s.error=Kc),s.complete===void 0&&(s.complete=Kc);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Pb(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Kc(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xb=1e3,Nb=2,Db=4*60*60*1e3,Vb=.5;function Ob(n,e=xb,t=Nb){const r=e*Math.pow(t,n),s=Math.round(Vb*r*(Math.random()-.5)*2);return Math.min(Db,r+s)}/**
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
 */function Ie(n){return n&&n._delegate?n._delegate:n}class Ot{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lb{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new bi;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e?.identifier),s=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Fb(e))try{this.getOrInitializeService({instanceIdentifier:Zn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Zn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Zn){return this.instances.has(e)}getOptions(e=Zn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&o.resolve(s)}return s}onInit(e,t){var r;const s=this.normalizeInstanceIdentifier(t),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Mb(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Zn){return this.component?this.component.multipleInstances?e:Zn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Mb(n){return n===Zn?void 0:n}function Fb(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ub{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Lb(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ge;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ge||(ge={}));const Bb={debug:ge.DEBUG,verbose:ge.VERBOSE,info:ge.INFO,warn:ge.WARN,error:ge.ERROR,silent:ge.SILENT},$b=ge.INFO,qb={[ge.DEBUG]:"log",[ge.VERBOSE]:"log",[ge.INFO]:"info",[ge.WARN]:"warn",[ge.ERROR]:"error"},jb=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=qb[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ha{constructor(e){this.name=e,this._logLevel=$b,this._logHandler=jb,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ge))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Bb[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ge.DEBUG,...e),this._logHandler(this,ge.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ge.VERBOSE,...e),this._logHandler(this,ge.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ge.INFO,...e),this._logHandler(this,ge.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ge.WARN,...e),this._logHandler(this,ge.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ge.ERROR,...e),this._logHandler(this,ge.ERROR,...e)}}const zb=(n,e)=>e.some(t=>n instanceof t);let Vh,Oh;function Gb(){return Vh||(Vh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Hb(){return Oh||(Oh=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const _m=new WeakMap,ml=new WeakMap,vm=new WeakMap,Wc=new WeakMap,lu=new WeakMap;function Kb(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",o)},i=()=>{t(kn(n.result)),s()},o=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&_m.set(t,n)}).catch(()=>{}),lu.set(e,n),e}function Wb(n){if(ml.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",o),n.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",o),n.addEventListener("abort",o)});ml.set(n,e)}let gl={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return ml.get(n);if(e==="objectStoreNames")return n.objectStoreNames||vm.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return kn(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Qb(n){gl=n(gl)}function Yb(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Qc(this),e,...t);return vm.set(r,e.sort?e.sort():[e]),kn(r)}:Hb().includes(n)?function(...e){return n.apply(Qc(this),e),kn(_m.get(this))}:function(...e){return kn(n.apply(Qc(this),e))}}function Jb(n){return typeof n=="function"?Yb(n):(n instanceof IDBTransaction&&Wb(n),zb(n,Gb())?new Proxy(n,gl):n)}function kn(n){if(n instanceof IDBRequest)return Kb(n);if(Wc.has(n))return Wc.get(n);const e=Jb(n);return e!==n&&(Wc.set(n,e),lu.set(e,n)),e}const Qc=n=>lu.get(n);function Xb(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(n,e),c=kn(o);return r&&o.addEventListener("upgradeneeded",u=>{r(kn(o.result),u.oldVersion,u.newVersion,kn(o.transaction),u)}),t&&o.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const Zb=["get","getKey","getAll","getAllKeys","count"],ew=["put","add","delete","clear"],Yc=new Map;function Lh(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Yc.get(e))return Yc.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=ew.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Zb.includes(t)))return;const i=async function(o,...c){const u=this.transaction(o,s?"readwrite":"readonly");let d=u.store;return r&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),s&&u.done]))[0]};return Yc.set(e,i),i}Qb(n=>({...n,get:(e,t,r)=>Lh(e,t)||n.get(e,t,r),has:(e,t)=>!!Lh(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tw{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(nw(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function nw(n){const e=n.getComponent();return e?.type==="VERSION"}const _l="@firebase/app",Mh="0.11.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sn=new Ha("@firebase/app"),rw="@firebase/app-compat",sw="@firebase/analytics-compat",iw="@firebase/analytics",ow="@firebase/app-check-compat",aw="@firebase/app-check",cw="@firebase/auth",lw="@firebase/auth-compat",uw="@firebase/database",dw="@firebase/data-connect",hw="@firebase/database-compat",fw="@firebase/functions",pw="@firebase/functions-compat",mw="@firebase/installations",gw="@firebase/installations-compat",_w="@firebase/messaging",vw="@firebase/messaging-compat",yw="@firebase/performance",bw="@firebase/performance-compat",ww="@firebase/remote-config",Iw="@firebase/remote-config-compat",Ew="@firebase/storage",Tw="@firebase/storage-compat",Aw="@firebase/firestore",Rw="@firebase/vertexai",Sw="@firebase/firestore-compat",kw="firebase",Cw="11.3.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vl="[DEFAULT]",Pw={[_l]:"fire-core",[rw]:"fire-core-compat",[iw]:"fire-analytics",[sw]:"fire-analytics-compat",[aw]:"fire-app-check",[ow]:"fire-app-check-compat",[cw]:"fire-auth",[lw]:"fire-auth-compat",[uw]:"fire-rtdb",[dw]:"fire-data-connect",[hw]:"fire-rtdb-compat",[fw]:"fire-fn",[pw]:"fire-fn-compat",[mw]:"fire-iid",[gw]:"fire-iid-compat",[_w]:"fire-fcm",[vw]:"fire-fcm-compat",[yw]:"fire-perf",[bw]:"fire-perf-compat",[ww]:"fire-rc",[Iw]:"fire-rc-compat",[Ew]:"fire-gcs",[Tw]:"fire-gcs-compat",[Aw]:"fire-fst",[Sw]:"fire-fst-compat",[Rw]:"fire-vertex","fire-js":"fire-js",[kw]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ua=new Map,xw=new Map,yl=new Map;function Fh(n,e){try{n.container.addComponent(e)}catch(t){sn.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Kt(n){const e=n.name;if(yl.has(e))return sn.debug(`There were multiple attempts to register component ${e}.`),!1;yl.set(e,n);for(const t of ua.values())Fh(t,n);for(const t of xw.values())Fh(t,n);return!0}function Cr(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function It(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nw={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Cn=new Ps("app","Firebase",Nw);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dw{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Ot("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Cn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pr=Cw;function ym(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:vl,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw Cn.create("bad-app-name",{appName:String(s)});if(t||(t=pm()),!t)throw Cn.create("no-options");const i=ua.get(s);if(i){if(wi(t,i.options)&&wi(r,i.config))return i;throw Cn.create("duplicate-app",{appName:s})}const o=new Ub(s);for(const u of yl.values())o.addComponent(u);const c=new Dw(t,r,o);return ua.set(s,c),c}function Ka(n=vl){const e=ua.get(n);if(!e&&n===vl&&pm())return ym();if(!e)throw Cn.create("no-app",{appName:n});return e}function At(n,e,t){var r;let s=(r=Pw[n])!==null&&r!==void 0?r:n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const c=[`Unable to register library "${s}" with version "${e}":`];i&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&c.push("and"),o&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),sn.warn(c.join(" "));return}Kt(new Ot(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const Vw="firebase-heartbeat-database",Ow=1,Ii="firebase-heartbeat-store";let Jc=null;function bm(){return Jc||(Jc=Xb(Vw,Ow,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Ii)}catch(t){console.warn(t)}}}}).catch(n=>{throw Cn.create("idb-open",{originalErrorMessage:n.message})})),Jc}async function Lw(n){try{const t=(await bm()).transaction(Ii),r=await t.objectStore(Ii).get(wm(n));return await t.done,r}catch(e){if(e instanceof Mt)sn.warn(e.message);else{const t=Cn.create("idb-get",{originalErrorMessage:e?.message});sn.warn(t.message)}}}async function Uh(n,e){try{const r=(await bm()).transaction(Ii,"readwrite");await r.objectStore(Ii).put(e,wm(n)),await r.done}catch(t){if(t instanceof Mt)sn.warn(t.message);else{const r=Cn.create("idb-set",{originalErrorMessage:t?.message});sn.warn(r.message)}}}function wm(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Mw=1024,Fw=30;class Uw{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new $w(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Bh();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>Fw){const o=qw(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){sn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Bh(),{heartbeatsToSend:r,unsentEntries:s}=Bw(this._heartbeatsCache.heartbeats),i=la(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return sn.warn(t),""}}}function Bh(){return new Date().toISOString().substring(0,10)}function Bw(n,e=Mw){const t=[];let r=n.slice();for(const s of n){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),$h(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),$h(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class $w{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ga()?Eb().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Lw(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Uh(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Uh(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function $h(n){return la(JSON.stringify({version:2,heartbeats:n})).length}function qw(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jw(n){Kt(new Ot("platform-logger",e=>new tw(e),"PRIVATE")),Kt(new Ot("heartbeat",e=>new Uw(e),"PRIVATE")),At(_l,Mh,n),At(_l,Mh,"esm2017"),At("fire-js","")}jw("");function uu(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(t[r[s]]=n[r[s]]);return t}function Im(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const zw=Im,Em=new Ps("auth","Firebase",Im());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const da=new Ha("@firebase/auth");function Gw(n,...e){da.logLevel<=ge.WARN&&da.warn(`Auth (${Pr}): ${n}`,...e)}function jo(n,...e){da.logLevel<=ge.ERROR&&da.error(`Auth (${Pr}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lt(n,...e){throw du(n,...e)}function zt(n,...e){return du(n,...e)}function Tm(n,e,t){const r=Object.assign(Object.assign({},zw()),{[e]:t});return new Ps("auth","Firebase",r).create(e,{appName:n.name})}function Pn(n){return Tm(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function du(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Em.create(n,...e)}function ae(n,e,...t){if(!n)throw du(e,...t)}function en(n){const e="INTERNAL ASSERTION FAILED: "+n;throw jo(e),new Error(e)}function on(n,e){n||en(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bl(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Hw(){return qh()==="http:"||qh()==="https:"}function qh(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kw(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Hw()||bb()||"connection"in navigator)?navigator.onLine:!0}function Ww(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gi{constructor(e,t){this.shortDelay=e,this.longDelay=t,on(t>e,"Short delay should be less than long delay!"),this.isMobile=_b()||wb()}get(){return Kw()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hu(n,e){on(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Am{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;en("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;en("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;en("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qw={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yw=new Gi(3e4,6e4);function xr(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Bn(n,e,t,r,s={}){return Rm(n,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const c=zi(Object.assign({key:n.config.apiKey},o)).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const d=Object.assign({method:e,headers:u},i);return yb()||(d.referrerPolicy="no-referrer"),Am.fetch()(Sm(n,n.config.apiHost,t,c),d)})}async function Rm(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},Qw),e);try{const s=new Xw(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw To(n,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[u,d]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw To(n,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw To(n,"email-already-in-use",o);if(u==="USER_DISABLED")throw To(n,"user-disabled",o);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Tm(n,f,d);Lt(n,f)}}catch(s){if(s instanceof Mt)throw s;Lt(n,"network-request-failed",{message:String(s)})}}async function Wa(n,e,t,r,s={}){const i=await Bn(n,e,t,r,s);return"mfaPendingCredential"in i&&Lt(n,"multi-factor-auth-required",{_serverResponse:i}),i}function Sm(n,e,t,r){const s=`${e}${t}?${r}`;return n.config.emulator?hu(n.config,s):`${n.config.apiScheme}://${s}`}function Jw(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Xw{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(zt(this.auth,"network-request-failed")),Yw.get())})}}function To(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=zt(n,e,r);return s.customData._tokenResponse=t,s}function jh(n){return n!==void 0&&n.enterprise!==void 0}class Zw{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Jw(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function eI(n,e){return Bn(n,"GET","/v2/recaptchaConfig",xr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tI(n,e){return Bn(n,"POST","/v1/accounts:delete",e)}async function km(n,e){return Bn(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ui(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function nI(n,e=!1){const t=Ie(n),r=await t.getIdToken(e),s=fu(r);ae(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i?.sign_in_provider;return{claims:s,token:r,authTime:ui(Xc(s.auth_time)),issuedAtTime:ui(Xc(s.iat)),expirationTime:ui(Xc(s.exp)),signInProvider:o||null,signInSecondFactor:i?.sign_in_second_factor||null}}function Xc(n){return Number(n)*1e3}function fu(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return jo("JWT malformed, contained fewer than 3 sections"),null;try{const s=um(t);return s?JSON.parse(s):(jo("Failed to decode base64 JWT payload"),null)}catch(s){return jo("Caught error parsing JWT payload as JSON",s?.toString()),null}}function zh(n){const e=fu(n);return ae(e,"internal-error"),ae(typeof e.exp<"u","internal-error"),ae(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ei(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Mt&&rI(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function rI({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sI{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wl{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=ui(this.lastLoginAt),this.creationTime=ui(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ha(n){var e;const t=n.auth,r=await n.getIdToken(),s=await Ei(n,km(t,{idToken:r}));ae(s?.users.length,t,"internal-error");const i=s.users[0];n._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?Cm(i.providerUserInfo):[],c=oI(n.providerData,o),u=n.isAnonymous,d=!(n.email&&i.passwordHash)&&!c?.length,f=u?d:!1,p={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:c,metadata:new wl(i.createdAt,i.lastLoginAt),isAnonymous:f};Object.assign(n,p)}async function iI(n){const e=Ie(n);await ha(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function oI(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Cm(n){return n.map(e=>{var{providerId:t}=e,r=uu(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function aI(n,e){const t=await Rm(n,{},async()=>{const r=zi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,o=Sm(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",Am.fetch()(o,{method:"POST",headers:c,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function cI(n,e){return Bn(n,"POST","/v2/accounts:revokeToken",xr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ns{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){ae(e.idToken,"internal-error"),ae(typeof e.idToken<"u","internal-error"),ae(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):zh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){ae(e.length!==0,"internal-error");const t=zh(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(ae(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await aI(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,o=new ns;return r&&(ae(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(ae(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(ae(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ns,this.toJSON())}_performRefresh(){return en("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gn(n,e){ae(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class tn{constructor(e){var{uid:t,auth:r,stsTokenManager:s}=e,i=uu(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new sI(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new wl(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await Ei(this,this.stsTokenManager.getToken(this.auth,e));return ae(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return nI(this,e)}reload(){return iI(this)}_assign(e){this!==e&&(ae(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new tn(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){ae(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await ha(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(It(this.auth.app))return Promise.reject(Pn(this.auth));const e=await this.getIdToken();return await Ei(this,tI(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,s,i,o,c,u,d,f;const p=(r=t.displayName)!==null&&r!==void 0?r:void 0,g=(s=t.email)!==null&&s!==void 0?s:void 0,b=(i=t.phoneNumber)!==null&&i!==void 0?i:void 0,E=(o=t.photoURL)!==null&&o!==void 0?o:void 0,S=(c=t.tenantId)!==null&&c!==void 0?c:void 0,A=(u=t._redirectEventId)!==null&&u!==void 0?u:void 0,O=(d=t.createdAt)!==null&&d!==void 0?d:void 0,k=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:x,emailVerified:M,isAnonymous:P,providerData:F,stsTokenManager:T}=t;ae(x&&T,e,"internal-error");const v=ns.fromJSON(this.name,T);ae(typeof x=="string",e,"internal-error"),gn(p,e.name),gn(g,e.name),ae(typeof M=="boolean",e,"internal-error"),ae(typeof P=="boolean",e,"internal-error"),gn(b,e.name),gn(E,e.name),gn(S,e.name),gn(A,e.name),gn(O,e.name),gn(k,e.name);const w=new tn({uid:x,auth:e,email:g,emailVerified:M,displayName:p,isAnonymous:P,photoURL:E,phoneNumber:b,tenantId:S,stsTokenManager:v,createdAt:O,lastLoginAt:k});return F&&Array.isArray(F)&&(w.providerData=F.map(R=>Object.assign({},R))),A&&(w._redirectEventId=A),w}static async _fromIdTokenResponse(e,t,r=!1){const s=new ns;s.updateFromServerResponse(t);const i=new tn({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await ha(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];ae(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Cm(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!i?.length,c=new ns;c.updateFromIdToken(r);const u=new tn({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new wl(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(u,d),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gh=new Map;function nn(n){on(n instanceof Function,"Expected a class definition");let e=Gh.get(n);return e?(on(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Gh.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pm{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Pm.type="NONE";const Hh=Pm;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zo(n,e,t){return`firebase:${n}:${e}:${t}`}class rs{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=zo(this.userKey,s.apiKey,i),this.fullPersistenceKey=zo("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?tn._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new rs(nn(Hh),e,r);const s=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let i=s[0]||nn(Hh);const o=zo(r,e.config.apiKey,e.name);let c=null;for(const d of t)try{const f=await d._get(o);if(f){const p=tn._fromJSON(e,f);d!==i&&(c=p),i=d;break}}catch{}const u=s.filter(d=>d._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new rs(i,e,r):(i=u[0],c&&await i._set(o,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==i)try{await d._remove(o)}catch{}})),new rs(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kh(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Vm(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(xm(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Lm(e))return"Blackberry";if(Mm(e))return"Webos";if(Nm(e))return"Safari";if((e.includes("chrome/")||Dm(e))&&!e.includes("edge/"))return"Chrome";if(Om(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function xm(n=Ge()){return/firefox\//i.test(n)}function Nm(n=Ge()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Dm(n=Ge()){return/crios\//i.test(n)}function Vm(n=Ge()){return/iemobile/i.test(n)}function Om(n=Ge()){return/android/i.test(n)}function Lm(n=Ge()){return/blackberry/i.test(n)}function Mm(n=Ge()){return/webos/i.test(n)}function pu(n=Ge()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function lI(n=Ge()){var e;return pu(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function uI(){return Ib()&&document.documentMode===10}function Fm(n=Ge()){return pu(n)||Om(n)||Mm(n)||Lm(n)||/windows phone/i.test(n)||Vm(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Um(n,e=[]){let t;switch(n){case"Browser":t=Kh(Ge());break;case"Worker":t=`${Kh(Ge())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Pr}/${r}`}/**
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
 */class dI{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((o,c)=>{try{const u=e(i);o(u)}catch(u){c(u)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
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
 */async function hI(n,e={}){return Bn(n,"GET","/v2/passwordPolicy",xr(n,e))}/**
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
 */const fI=6;class pI{constructor(e){var t,r,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:fI,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,s,i,o,c;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(t=u.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(s=u.containsLowercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(i=u.containsUppercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(o=u.containsNumericCharacter)!==null&&o!==void 0?o:!0),u.isValid&&(u.isValid=(c=u.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),u}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mI{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Wh(this),this.idTokenSubscription=new Wh(this),this.beforeStateQueue=new dI(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Em,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=nn(t)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await rs.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await km(this,{idToken:e}),r=await tn._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(It(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=s?._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===c)&&u?.user&&(s=u.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return ae(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ha(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Ww()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(It(this.app))return Promise.reject(Pn(this));const t=e?Ie(e):null;return t&&ae(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&ae(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return It(this.app)?Promise.reject(Pn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return It(this.app)?Promise.reject(Pn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(nn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await hI(this),t=new pI(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Ps("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await cI(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&nn(e)||this._popupRedirectResolver;ae(t,this,"argument-error"),this.redirectPersistenceManager=await rs.create(this,[nn(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(ae(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{o=!0,u()}}else{const u=e.addObserver(t);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return ae(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Um(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;if(It(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&Gw(`Error while retrieving App Check token: ${t.error}`),t?.token}}function xs(n){return Ie(n)}class Wh{constructor(e){this.auth=e,this.observer=null,this.addObserver=kb(t=>this.observer=t)}get next(){return ae(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Qa={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function gI(n){Qa=n}function Bm(n){return Qa.loadJS(n)}function _I(){return Qa.recaptchaEnterpriseScript}function vI(){return Qa.gapiScript}function yI(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class bI{constructor(){this.enterprise=new wI}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class wI{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const II="recaptcha-enterprise",$m="NO_RECAPTCHA";class EI{constructor(e){this.type=II,this.auth=xs(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,c)=>{eI(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const d=new Zw(u);return i.tenantId==null?i._agentRecaptchaConfig=d:i._tenantRecaptchaConfigs[i.tenantId]=d,o(d.siteKey)}}).catch(u=>{c(u)})})}function s(i,o,c){const u=window.grecaptcha;jh(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(d=>{o(d)}).catch(()=>{o($m)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new bI().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{r(this.auth).then(c=>{if(!t&&jh(window.grecaptcha))s(c,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=_I();u.length!==0&&(u+=c),Bm(u).then(()=>{s(c,i,o)}).catch(d=>{o(d)})}}).catch(c=>{o(c)})})}}async function Qh(n,e,t,r=!1,s=!1){const i=new EI(n);let o;if(s)o=$m;else try{o=await i.verify(t)}catch{o=await i.verify(t,!0)}const c=Object.assign({},e);if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const u=c.phoneEnrollmentInfo.phoneNumber,d=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:d,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function Yh(n,e,t,r,s){var i;if(!((i=n._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await Qh(n,e,t,t==="getOobCode");return r(n,o)}else return r(n,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await Qh(n,e,t,t==="getOobCode");return r(n,c)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function TI(n,e){const t=Cr(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(wi(i,e??{}))return s;Lt(s,"already-initialized")}return t.initialize({options:e})}function AI(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(nn);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function RI(n,e,t){const r=xs(n);ae(r._canInitEmulator,r,"emulator-config-failed"),ae(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=qm(e),{host:o,port:c}=SI(e),u=c===null?"":`:${c}`;r.config.emulator={url:`${i}//${o}${u}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),kI()}function qm(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function SI(n){const e=qm(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Jh(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:Jh(o)}}}function Jh(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function kI(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mu{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return en("not implemented")}_getIdTokenResponse(e){return en("not implemented")}_linkToIdToken(e,t){return en("not implemented")}_getReauthenticationResolver(e){return en("not implemented")}}async function CI(n,e){return Bn(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function PI(n,e){return Wa(n,"POST","/v1/accounts:signInWithPassword",xr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xI(n,e){return Wa(n,"POST","/v1/accounts:signInWithEmailLink",xr(n,e))}async function NI(n,e){return Wa(n,"POST","/v1/accounts:signInWithEmailLink",xr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ti extends mu{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new Ti(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new Ti(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Yh(e,t,"signInWithPassword",PI);case"emailLink":return xI(e,{email:this._email,oobCode:this._password});default:Lt(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Yh(e,r,"signUpPassword",CI);case"emailLink":return NI(e,{idToken:t,email:this._email,oobCode:this._password});default:Lt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ss(n,e){return Wa(n,"POST","/v1/accounts:signInWithIdp",xr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DI="http://localhost";class _r extends mu{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new _r(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Lt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=t,i=uu(t,["providerId","signInMethod"]);if(!r||!s)return null;const o=new _r(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return ss(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,ss(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,ss(e,t)}buildRequest(){const e={requestUri:DI,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=zi(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function VI(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function OI(n){const e=ri(si(n)).link,t=e?ri(si(e)).deep_link_id:null,r=ri(si(n)).deep_link_id;return(r?ri(si(r)).link:null)||r||t||e||n}class gu{constructor(e){var t,r,s,i,o,c;const u=ri(si(e)),d=(t=u.apiKey)!==null&&t!==void 0?t:null,f=(r=u.oobCode)!==null&&r!==void 0?r:null,p=VI((s=u.mode)!==null&&s!==void 0?s:null);ae(d&&f&&p,"argument-error"),this.apiKey=d,this.operation=p,this.code=f,this.continueUrl=(i=u.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(o=u.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(c=u.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const t=OI(e);try{return new gu(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ns{constructor(){this.providerId=Ns.PROVIDER_ID}static credential(e,t){return Ti._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=gu.parseLink(t);return ae(r,"argument-error"),Ti._fromEmailAndCode(e,r.code,r.tenantId)}}Ns.PROVIDER_ID="password";Ns.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Ns.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jm{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hi extends jm{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wn extends Hi{constructor(){super("facebook.com")}static credential(e){return _r._fromParams({providerId:wn.PROVIDER_ID,signInMethod:wn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return wn.credentialFromTaggedObject(e)}static credentialFromError(e){return wn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return wn.credential(e.oauthAccessToken)}catch{return null}}}wn.FACEBOOK_SIGN_IN_METHOD="facebook.com";wn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class In extends Hi{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return _r._fromParams({providerId:In.PROVIDER_ID,signInMethod:In.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return In.credentialFromTaggedObject(e)}static credentialFromError(e){return In.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return In.credential(t,r)}catch{return null}}}In.GOOGLE_SIGN_IN_METHOD="google.com";In.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class En extends Hi{constructor(){super("github.com")}static credential(e){return _r._fromParams({providerId:En.PROVIDER_ID,signInMethod:En.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return En.credentialFromTaggedObject(e)}static credentialFromError(e){return En.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return En.credential(e.oauthAccessToken)}catch{return null}}}En.GITHUB_SIGN_IN_METHOD="github.com";En.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tn extends Hi{constructor(){super("twitter.com")}static credential(e,t){return _r._fromParams({providerId:Tn.PROVIDER_ID,signInMethod:Tn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Tn.credentialFromTaggedObject(e)}static credentialFromError(e){return Tn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Tn.credential(t,r)}catch{return null}}}Tn.TWITTER_SIGN_IN_METHOD="twitter.com";Tn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class us{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await tn._fromIdTokenResponse(e,r,s),o=Xh(r);return new us({user:i,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=Xh(r);return new us({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function Xh(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fa extends Mt{constructor(e,t,r,s){var i;super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,fa.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new fa(e,t,r,s)}}function zm(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?fa._fromErrorAndOperation(n,i,e,r):i})}async function LI(n,e,t=!1){const r=await Ei(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return us._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function MI(n,e,t=!1){const{auth:r}=n;if(It(r.app))return Promise.reject(Pn(r));const s="reauthenticate";try{const i=await Ei(n,zm(r,s,e,n),t);ae(i.idToken,r,"internal-error");const o=fu(i.idToken);ae(o,r,"internal-error");const{sub:c}=o;return ae(n.uid===c,r,"user-mismatch"),us._forOperation(n,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&Lt(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gm(n,e,t=!1){if(It(n.app))return Promise.reject(Pn(n));const r="signIn",s=await zm(n,r,e),i=await us._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function FI(n,e){return Gm(xs(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function UI(n){const e=xs(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function BI(n,e,t){return It(n.app)?Promise.reject(Pn(n)):FI(Ie(n),Ns.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&UI(n),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $I(n,e){return Ie(n).setPersistence(e)}function qI(n,e,t,r){return Ie(n).onIdTokenChanged(e,t,r)}function jI(n,e,t){return Ie(n).beforeAuthStateChanged(e,t)}function zI(n,e,t,r){return Ie(n).onAuthStateChanged(e,t,r)}function Hm(n){return Ie(n).signOut()}const pa="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Km{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(pa,"1"),this.storage.removeItem(pa),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GI=1e3,HI=10;class Wm extends Km{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Fm(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);uI()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,HI):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},GI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Wm.type="LOCAL";const Qm=Wm;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ym extends Km{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Ym.type="SESSION";const Jm=Ym;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function KI(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ya{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Ya(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(o).map(async d=>d(t.origin,i)),u=await KI(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ya.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _u(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WI{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,u)=>{const d=_u("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(p){const g=p;if(g.data.eventId===d)switch(g.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(g.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gt(){return window}function QI(n){Gt().location.href=n}/**
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
 */function Xm(){return typeof Gt().WorkerGlobalScope<"u"&&typeof Gt().importScripts=="function"}async function YI(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function JI(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function XI(){return Xm()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zm="firebaseLocalStorageDb",ZI=1,ma="firebaseLocalStorage",eg="fbase_key";class Ki{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Ja(n,e){return n.transaction([ma],e?"readwrite":"readonly").objectStore(ma)}function eE(){const n=indexedDB.deleteDatabase(Zm);return new Ki(n).toPromise()}function Il(){const n=indexedDB.open(Zm,ZI);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(ma,{keyPath:eg})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(ma)?e(r):(r.close(),await eE(),e(await Il()))})})}async function Zh(n,e,t){const r=Ja(n,!0).put({[eg]:e,value:t});return new Ki(r).toPromise()}async function tE(n,e){const t=Ja(n,!1).get(e),r=await new Ki(t).toPromise();return r===void 0?null:r.value}function ef(n,e){const t=Ja(n,!0).delete(e);return new Ki(t).toPromise()}const nE=800,rE=3;class tg{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Il(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>rE)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Xm()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ya._getInstance(XI()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await YI(),!this.activeServiceWorker)return;this.sender=new WI(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||JI()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Il();return await Zh(e,pa,"1"),await ef(e,pa),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Zh(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>tE(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>ef(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Ja(s,!1).getAll();return new Ki(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),nE)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}tg.type="LOCAL";const sE=tg;new Gi(3e4,6e4);/**
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
 */function iE(n,e){return e?nn(e):(ae(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vu extends mu{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return ss(e,this._buildIdpRequest())}_linkToIdToken(e,t){return ss(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return ss(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function oE(n){return Gm(n.auth,new vu(n),n.bypassAuthState)}function aE(n){const{auth:e,user:t}=n;return ae(t,e,"internal-error"),MI(t,new vu(n),n.bypassAuthState)}async function cE(n){const{auth:e,user:t}=n;return ae(t,e,"internal-error"),LI(t,new vu(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ng{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return oE;case"linkViaPopup":case"linkViaRedirect":return cE;case"reauthViaPopup":case"reauthViaRedirect":return aE;default:Lt(this.auth,"internal-error")}}resolve(e){on(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){on(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lE=new Gi(2e3,1e4);class es extends ng{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,es.currentPopupAction&&es.currentPopupAction.cancel(),es.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return ae(e,this.auth,"internal-error"),e}async onExecution(){on(this.filter.length===1,"Popup operations only handle one event");const e=_u();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(zt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(zt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,es.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(zt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,lE.get())};e()}}es.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uE="pendingRedirect",Go=new Map;class dE extends ng{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Go.get(this.auth._key());if(!e){try{const r=await hE(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Go.set(this.auth._key(),e)}return this.bypassAuthState||Go.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function hE(n,e){const t=mE(e),r=pE(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function fE(n,e){Go.set(n._key(),e)}function pE(n){return nn(n._redirectPersistence)}function mE(n){return zo(uE,n.config.apiKey,n.name)}async function gE(n,e,t=!1){if(It(n.app))return Promise.reject(Pn(n));const r=xs(n),s=iE(r,e),o=await new dE(r,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _E=10*60*1e3;class vE{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!yE(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!rg(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(zt(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=_E&&this.cachedEventUids.clear(),this.cachedEventUids.has(tf(e))}saveEventToCache(e){this.cachedEventUids.add(tf(e)),this.lastProcessedEventTime=Date.now()}}function tf(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function rg({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function yE(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return rg(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bE(n,e={}){return Bn(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wE=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,IE=/^https?/;async function EE(n){if(n.config.emulator)return;const{authorizedDomains:e}=await bE(n);for(const t of e)try{if(TE(t))return}catch{}Lt(n,"unauthorized-domain")}function TE(n){const e=bl(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!IE.test(t))return!1;if(wE.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const AE=new Gi(3e4,6e4);function nf(){const n=Gt().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function RE(n){return new Promise((e,t)=>{var r,s,i;function o(){nf(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{nf(),t(zt(n,"network-request-failed"))},timeout:AE.get()})}if(!((s=(r=Gt().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=Gt().gapi)===null||i===void 0)&&i.load)o();else{const c=yI("iframefcb");return Gt()[c]=()=>{gapi.load?o():t(zt(n,"network-request-failed"))},Bm(`${vI()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw Ho=null,e})}let Ho=null;function SE(n){return Ho=Ho||RE(n),Ho}/**
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
 */const kE=new Gi(5e3,15e3),CE="__/auth/iframe",PE="emulator/auth/iframe",xE={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},NE=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function DE(n){const e=n.config;ae(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?hu(e,PE):`https://${n.config.authDomain}/${CE}`,r={apiKey:e.apiKey,appName:n.name,v:Pr},s=NE.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${zi(r).slice(1)}`}async function VE(n){const e=await SE(n),t=Gt().gapi;return ae(t,n,"internal-error"),e.open({where:document.body,url:DE(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:xE,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=zt(n,"network-request-failed"),c=Gt().setTimeout(()=>{i(o)},kE.get());function u(){Gt().clearTimeout(c),s(r)}r.ping(u).then(u,()=>{i(o)})}))}/**
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
 */const OE={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},LE=500,ME=600,FE="_blank",UE="http://localhost";class rf{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function BE(n,e,t,r=LE,s=ME){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u=Object.assign(Object.assign({},OE),{width:r.toString(),height:s.toString(),top:i,left:o}),d=Ge().toLowerCase();t&&(c=Dm(d)?FE:t),xm(d)&&(e=e||UE,u.scrollbars="yes");const f=Object.entries(u).reduce((g,[b,E])=>`${g}${b}=${E},`,"");if(lI(d)&&c!=="_self")return $E(e||"",c),new rf(null);const p=window.open(e||"",c,f);ae(p,n,"popup-blocked");try{p.focus()}catch{}return new rf(p)}function $E(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const qE="__/auth/handler",jE="emulator/auth/handler",zE=encodeURIComponent("fac");async function sf(n,e,t,r,s,i){ae(n.config.authDomain,n,"auth-domain-config-required"),ae(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Pr,eventId:s};if(e instanceof jm){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Sb(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))o[f]=p}if(e instanceof Hi){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(o.scopes=f.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await n._getAppCheckToken(),d=u?`#${zE}=${encodeURIComponent(u)}`:"";return`${GE(n)}?${zi(c).slice(1)}${d}`}function GE({config:n}){return n.emulator?hu(n,jE):`https://${n.authDomain}/${qE}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zc="webStorageSupport";class HE{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Jm,this._completeRedirectFn=gE,this._overrideRedirectResult=fE}async _openPopup(e,t,r,s){var i;on((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await sf(e,t,r,bl(),s);return BE(e,o,_u())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await sf(e,t,r,bl(),s);return QI(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(on(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await VE(e),r=new vE(e);return t.register("authEvent",s=>(ae(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Zc,{type:Zc},s=>{var i;const o=(i=s?.[0])===null||i===void 0?void 0:i[Zc];o!==void 0&&t(!!o),Lt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=EE(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Fm()||Nm()||pu()}}const KE=HE;var of="@firebase/auth",af="1.9.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WE{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){ae(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function QE(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function YE(n){Kt(new Ot("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;ae(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Um(n)},d=new mI(r,s,i,u);return AI(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Kt(new Ot("auth-internal",e=>{const t=xs(e.getProvider("auth").getImmediate());return(r=>new WE(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),At(of,af,QE(n)),At(of,af,"esm2017")}/**
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
 */const JE=5*60,XE=mm("authIdTokenMaxAge")||JE;let cf=null;const ZE=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>XE)return;const s=t?.token;cf!==s&&(cf=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function eT(n=Ka()){const e=Cr(n,"auth");if(e.isInitialized())return e.getImmediate();const t=TI(n,{popupRedirectResolver:KE,persistence:[sE,Qm,Jm]}),r=mm("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=ZE(i.toString());jI(t,o,()=>o(t.currentUser)),qI(t,c=>o(c))}}const s=hm("auth");return s&&RI(t,`http://${s}`),t}function tT(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}gI({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=zt("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",tT().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});YE("Browser");var lf=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var xn,sg;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(T,v){function w(){}w.prototype=v.prototype,T.D=v.prototype,T.prototype=new w,T.prototype.constructor=T,T.C=function(R,y,C){for(var I=Array(arguments.length-2),le=2;le<arguments.length;le++)I[le-2]=arguments[le];return v.prototype[y].apply(R,I)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(T,v,w){w||(w=0);var R=Array(16);if(typeof v=="string")for(var y=0;16>y;++y)R[y]=v.charCodeAt(w++)|v.charCodeAt(w++)<<8|v.charCodeAt(w++)<<16|v.charCodeAt(w++)<<24;else for(y=0;16>y;++y)R[y]=v[w++]|v[w++]<<8|v[w++]<<16|v[w++]<<24;v=T.g[0],w=T.g[1],y=T.g[2];var C=T.g[3],I=v+(C^w&(y^C))+R[0]+3614090360&4294967295;v=w+(I<<7&4294967295|I>>>25),I=C+(y^v&(w^y))+R[1]+3905402710&4294967295,C=v+(I<<12&4294967295|I>>>20),I=y+(w^C&(v^w))+R[2]+606105819&4294967295,y=C+(I<<17&4294967295|I>>>15),I=w+(v^y&(C^v))+R[3]+3250441966&4294967295,w=y+(I<<22&4294967295|I>>>10),I=v+(C^w&(y^C))+R[4]+4118548399&4294967295,v=w+(I<<7&4294967295|I>>>25),I=C+(y^v&(w^y))+R[5]+1200080426&4294967295,C=v+(I<<12&4294967295|I>>>20),I=y+(w^C&(v^w))+R[6]+2821735955&4294967295,y=C+(I<<17&4294967295|I>>>15),I=w+(v^y&(C^v))+R[7]+4249261313&4294967295,w=y+(I<<22&4294967295|I>>>10),I=v+(C^w&(y^C))+R[8]+1770035416&4294967295,v=w+(I<<7&4294967295|I>>>25),I=C+(y^v&(w^y))+R[9]+2336552879&4294967295,C=v+(I<<12&4294967295|I>>>20),I=y+(w^C&(v^w))+R[10]+4294925233&4294967295,y=C+(I<<17&4294967295|I>>>15),I=w+(v^y&(C^v))+R[11]+2304563134&4294967295,w=y+(I<<22&4294967295|I>>>10),I=v+(C^w&(y^C))+R[12]+1804603682&4294967295,v=w+(I<<7&4294967295|I>>>25),I=C+(y^v&(w^y))+R[13]+4254626195&4294967295,C=v+(I<<12&4294967295|I>>>20),I=y+(w^C&(v^w))+R[14]+2792965006&4294967295,y=C+(I<<17&4294967295|I>>>15),I=w+(v^y&(C^v))+R[15]+1236535329&4294967295,w=y+(I<<22&4294967295|I>>>10),I=v+(y^C&(w^y))+R[1]+4129170786&4294967295,v=w+(I<<5&4294967295|I>>>27),I=C+(w^y&(v^w))+R[6]+3225465664&4294967295,C=v+(I<<9&4294967295|I>>>23),I=y+(v^w&(C^v))+R[11]+643717713&4294967295,y=C+(I<<14&4294967295|I>>>18),I=w+(C^v&(y^C))+R[0]+3921069994&4294967295,w=y+(I<<20&4294967295|I>>>12),I=v+(y^C&(w^y))+R[5]+3593408605&4294967295,v=w+(I<<5&4294967295|I>>>27),I=C+(w^y&(v^w))+R[10]+38016083&4294967295,C=v+(I<<9&4294967295|I>>>23),I=y+(v^w&(C^v))+R[15]+3634488961&4294967295,y=C+(I<<14&4294967295|I>>>18),I=w+(C^v&(y^C))+R[4]+3889429448&4294967295,w=y+(I<<20&4294967295|I>>>12),I=v+(y^C&(w^y))+R[9]+568446438&4294967295,v=w+(I<<5&4294967295|I>>>27),I=C+(w^y&(v^w))+R[14]+3275163606&4294967295,C=v+(I<<9&4294967295|I>>>23),I=y+(v^w&(C^v))+R[3]+4107603335&4294967295,y=C+(I<<14&4294967295|I>>>18),I=w+(C^v&(y^C))+R[8]+1163531501&4294967295,w=y+(I<<20&4294967295|I>>>12),I=v+(y^C&(w^y))+R[13]+2850285829&4294967295,v=w+(I<<5&4294967295|I>>>27),I=C+(w^y&(v^w))+R[2]+4243563512&4294967295,C=v+(I<<9&4294967295|I>>>23),I=y+(v^w&(C^v))+R[7]+1735328473&4294967295,y=C+(I<<14&4294967295|I>>>18),I=w+(C^v&(y^C))+R[12]+2368359562&4294967295,w=y+(I<<20&4294967295|I>>>12),I=v+(w^y^C)+R[5]+4294588738&4294967295,v=w+(I<<4&4294967295|I>>>28),I=C+(v^w^y)+R[8]+2272392833&4294967295,C=v+(I<<11&4294967295|I>>>21),I=y+(C^v^w)+R[11]+1839030562&4294967295,y=C+(I<<16&4294967295|I>>>16),I=w+(y^C^v)+R[14]+4259657740&4294967295,w=y+(I<<23&4294967295|I>>>9),I=v+(w^y^C)+R[1]+2763975236&4294967295,v=w+(I<<4&4294967295|I>>>28),I=C+(v^w^y)+R[4]+1272893353&4294967295,C=v+(I<<11&4294967295|I>>>21),I=y+(C^v^w)+R[7]+4139469664&4294967295,y=C+(I<<16&4294967295|I>>>16),I=w+(y^C^v)+R[10]+3200236656&4294967295,w=y+(I<<23&4294967295|I>>>9),I=v+(w^y^C)+R[13]+681279174&4294967295,v=w+(I<<4&4294967295|I>>>28),I=C+(v^w^y)+R[0]+3936430074&4294967295,C=v+(I<<11&4294967295|I>>>21),I=y+(C^v^w)+R[3]+3572445317&4294967295,y=C+(I<<16&4294967295|I>>>16),I=w+(y^C^v)+R[6]+76029189&4294967295,w=y+(I<<23&4294967295|I>>>9),I=v+(w^y^C)+R[9]+3654602809&4294967295,v=w+(I<<4&4294967295|I>>>28),I=C+(v^w^y)+R[12]+3873151461&4294967295,C=v+(I<<11&4294967295|I>>>21),I=y+(C^v^w)+R[15]+530742520&4294967295,y=C+(I<<16&4294967295|I>>>16),I=w+(y^C^v)+R[2]+3299628645&4294967295,w=y+(I<<23&4294967295|I>>>9),I=v+(y^(w|~C))+R[0]+4096336452&4294967295,v=w+(I<<6&4294967295|I>>>26),I=C+(w^(v|~y))+R[7]+1126891415&4294967295,C=v+(I<<10&4294967295|I>>>22),I=y+(v^(C|~w))+R[14]+2878612391&4294967295,y=C+(I<<15&4294967295|I>>>17),I=w+(C^(y|~v))+R[5]+4237533241&4294967295,w=y+(I<<21&4294967295|I>>>11),I=v+(y^(w|~C))+R[12]+1700485571&4294967295,v=w+(I<<6&4294967295|I>>>26),I=C+(w^(v|~y))+R[3]+2399980690&4294967295,C=v+(I<<10&4294967295|I>>>22),I=y+(v^(C|~w))+R[10]+4293915773&4294967295,y=C+(I<<15&4294967295|I>>>17),I=w+(C^(y|~v))+R[1]+2240044497&4294967295,w=y+(I<<21&4294967295|I>>>11),I=v+(y^(w|~C))+R[8]+1873313359&4294967295,v=w+(I<<6&4294967295|I>>>26),I=C+(w^(v|~y))+R[15]+4264355552&4294967295,C=v+(I<<10&4294967295|I>>>22),I=y+(v^(C|~w))+R[6]+2734768916&4294967295,y=C+(I<<15&4294967295|I>>>17),I=w+(C^(y|~v))+R[13]+1309151649&4294967295,w=y+(I<<21&4294967295|I>>>11),I=v+(y^(w|~C))+R[4]+4149444226&4294967295,v=w+(I<<6&4294967295|I>>>26),I=C+(w^(v|~y))+R[11]+3174756917&4294967295,C=v+(I<<10&4294967295|I>>>22),I=y+(v^(C|~w))+R[2]+718787259&4294967295,y=C+(I<<15&4294967295|I>>>17),I=w+(C^(y|~v))+R[9]+3951481745&4294967295,T.g[0]=T.g[0]+v&4294967295,T.g[1]=T.g[1]+(y+(I<<21&4294967295|I>>>11))&4294967295,T.g[2]=T.g[2]+y&4294967295,T.g[3]=T.g[3]+C&4294967295}r.prototype.u=function(T,v){v===void 0&&(v=T.length);for(var w=v-this.blockSize,R=this.B,y=this.h,C=0;C<v;){if(y==0)for(;C<=w;)s(this,T,C),C+=this.blockSize;if(typeof T=="string"){for(;C<v;)if(R[y++]=T.charCodeAt(C++),y==this.blockSize){s(this,R),y=0;break}}else for(;C<v;)if(R[y++]=T[C++],y==this.blockSize){s(this,R),y=0;break}}this.h=y,this.o+=v},r.prototype.v=function(){var T=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);T[0]=128;for(var v=1;v<T.length-8;++v)T[v]=0;var w=8*this.o;for(v=T.length-8;v<T.length;++v)T[v]=w&255,w/=256;for(this.u(T),T=Array(16),v=w=0;4>v;++v)for(var R=0;32>R;R+=8)T[w++]=this.g[v]>>>R&255;return T};function i(T,v){var w=c;return Object.prototype.hasOwnProperty.call(w,T)?w[T]:w[T]=v(T)}function o(T,v){this.h=v;for(var w=[],R=!0,y=T.length-1;0<=y;y--){var C=T[y]|0;R&&C==v||(w[y]=C,R=!1)}this.g=w}var c={};function u(T){return-128<=T&&128>T?i(T,function(v){return new o([v|0],0>v?-1:0)}):new o([T|0],0>T?-1:0)}function d(T){if(isNaN(T)||!isFinite(T))return p;if(0>T)return A(d(-T));for(var v=[],w=1,R=0;T>=w;R++)v[R]=T/w|0,w*=4294967296;return new o(v,0)}function f(T,v){if(T.length==0)throw Error("number format error: empty string");if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(T.charAt(0)=="-")return A(f(T.substring(1),v));if(0<=T.indexOf("-"))throw Error('number format error: interior "-" character');for(var w=d(Math.pow(v,8)),R=p,y=0;y<T.length;y+=8){var C=Math.min(8,T.length-y),I=parseInt(T.substring(y,y+C),v);8>C?(C=d(Math.pow(v,C)),R=R.j(C).add(d(I))):(R=R.j(w),R=R.add(d(I)))}return R}var p=u(0),g=u(1),b=u(16777216);n=o.prototype,n.m=function(){if(S(this))return-A(this).m();for(var T=0,v=1,w=0;w<this.g.length;w++){var R=this.i(w);T+=(0<=R?R:4294967296+R)*v,v*=4294967296}return T},n.toString=function(T){if(T=T||10,2>T||36<T)throw Error("radix out of range: "+T);if(E(this))return"0";if(S(this))return"-"+A(this).toString(T);for(var v=d(Math.pow(T,6)),w=this,R="";;){var y=M(w,v).g;w=O(w,y.j(v));var C=((0<w.g.length?w.g[0]:w.h)>>>0).toString(T);if(w=y,E(w))return C+R;for(;6>C.length;)C="0"+C;R=C+R}},n.i=function(T){return 0>T?0:T<this.g.length?this.g[T]:this.h};function E(T){if(T.h!=0)return!1;for(var v=0;v<T.g.length;v++)if(T.g[v]!=0)return!1;return!0}function S(T){return T.h==-1}n.l=function(T){return T=O(this,T),S(T)?-1:E(T)?0:1};function A(T){for(var v=T.g.length,w=[],R=0;R<v;R++)w[R]=~T.g[R];return new o(w,~T.h).add(g)}n.abs=function(){return S(this)?A(this):this},n.add=function(T){for(var v=Math.max(this.g.length,T.g.length),w=[],R=0,y=0;y<=v;y++){var C=R+(this.i(y)&65535)+(T.i(y)&65535),I=(C>>>16)+(this.i(y)>>>16)+(T.i(y)>>>16);R=I>>>16,C&=65535,I&=65535,w[y]=I<<16|C}return new o(w,w[w.length-1]&-2147483648?-1:0)};function O(T,v){return T.add(A(v))}n.j=function(T){if(E(this)||E(T))return p;if(S(this))return S(T)?A(this).j(A(T)):A(A(this).j(T));if(S(T))return A(this.j(A(T)));if(0>this.l(b)&&0>T.l(b))return d(this.m()*T.m());for(var v=this.g.length+T.g.length,w=[],R=0;R<2*v;R++)w[R]=0;for(R=0;R<this.g.length;R++)for(var y=0;y<T.g.length;y++){var C=this.i(R)>>>16,I=this.i(R)&65535,le=T.i(y)>>>16,fe=T.i(y)&65535;w[2*R+2*y]+=I*fe,k(w,2*R+2*y),w[2*R+2*y+1]+=C*fe,k(w,2*R+2*y+1),w[2*R+2*y+1]+=I*le,k(w,2*R+2*y+1),w[2*R+2*y+2]+=C*le,k(w,2*R+2*y+2)}for(R=0;R<v;R++)w[R]=w[2*R+1]<<16|w[2*R];for(R=v;R<2*v;R++)w[R]=0;return new o(w,0)};function k(T,v){for(;(T[v]&65535)!=T[v];)T[v+1]+=T[v]>>>16,T[v]&=65535,v++}function x(T,v){this.g=T,this.h=v}function M(T,v){if(E(v))throw Error("division by zero");if(E(T))return new x(p,p);if(S(T))return v=M(A(T),v),new x(A(v.g),A(v.h));if(S(v))return v=M(T,A(v)),new x(A(v.g),v.h);if(30<T.g.length){if(S(T)||S(v))throw Error("slowDivide_ only works with positive integers.");for(var w=g,R=v;0>=R.l(T);)w=P(w),R=P(R);var y=F(w,1),C=F(R,1);for(R=F(R,2),w=F(w,2);!E(R);){var I=C.add(R);0>=I.l(T)&&(y=y.add(w),C=I),R=F(R,1),w=F(w,1)}return v=O(T,y.j(v)),new x(y,v)}for(y=p;0<=T.l(v);){for(w=Math.max(1,Math.floor(T.m()/v.m())),R=Math.ceil(Math.log(w)/Math.LN2),R=48>=R?1:Math.pow(2,R-48),C=d(w),I=C.j(v);S(I)||0<I.l(T);)w-=R,C=d(w),I=C.j(v);E(C)&&(C=g),y=y.add(C),T=O(T,I)}return new x(y,T)}n.A=function(T){return M(this,T).h},n.and=function(T){for(var v=Math.max(this.g.length,T.g.length),w=[],R=0;R<v;R++)w[R]=this.i(R)&T.i(R);return new o(w,this.h&T.h)},n.or=function(T){for(var v=Math.max(this.g.length,T.g.length),w=[],R=0;R<v;R++)w[R]=this.i(R)|T.i(R);return new o(w,this.h|T.h)},n.xor=function(T){for(var v=Math.max(this.g.length,T.g.length),w=[],R=0;R<v;R++)w[R]=this.i(R)^T.i(R);return new o(w,this.h^T.h)};function P(T){for(var v=T.g.length+1,w=[],R=0;R<v;R++)w[R]=T.i(R)<<1|T.i(R-1)>>>31;return new o(w,T.h)}function F(T,v){var w=v>>5;v%=32;for(var R=T.g.length-w,y=[],C=0;C<R;C++)y[C]=0<v?T.i(C+w)>>>v|T.i(C+w+1)<<32-v:T.i(C+w);return new o(y,T.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,sg=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=d,o.fromString=f,xn=o}).apply(typeof lf<"u"?lf:typeof self<"u"?self:typeof window<"u"?window:{});var Ao=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ig,ii,og,Ko,El,ag,cg,lg;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,h,m){return a==Array.prototype||a==Object.prototype||(a[h]=m.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ao=="object"&&Ao];for(var h=0;h<a.length;++h){var m=a[h];if(m&&m.Math==Math)return m}throw Error("Cannot find global object")}var r=t(this);function s(a,h){if(h)e:{var m=r;a=a.split(".");for(var _=0;_<a.length-1;_++){var V=a[_];if(!(V in m))break e;m=m[V]}a=a[a.length-1],_=m[a],h=h(_),h!=_&&h!=null&&e(m,a,{configurable:!0,writable:!0,value:h})}}function i(a,h){a instanceof String&&(a+="");var m=0,_=!1,V={next:function(){if(!_&&m<a.length){var U=m++;return{value:h(U,a[U]),done:!1}}return _=!0,{done:!0,value:void 0}}};return V[Symbol.iterator]=function(){return V},V}s("Array.prototype.values",function(a){return a||function(){return i(this,function(h,m){return m})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},c=this||self;function u(a){var h=typeof a;return h=h!="object"?h:a?Array.isArray(a)?"array":h:"null",h=="array"||h=="object"&&typeof a.length=="number"}function d(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function f(a,h,m){return a.call.apply(a.bind,arguments)}function p(a,h,m){if(!a)throw Error();if(2<arguments.length){var _=Array.prototype.slice.call(arguments,2);return function(){var V=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(V,_),a.apply(h,V)}}return function(){return a.apply(h,arguments)}}function g(a,h,m){return g=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:p,g.apply(null,arguments)}function b(a,h){var m=Array.prototype.slice.call(arguments,1);return function(){var _=m.slice();return _.push.apply(_,arguments),a.apply(this,_)}}function E(a,h){function m(){}m.prototype=h.prototype,a.aa=h.prototype,a.prototype=new m,a.prototype.constructor=a,a.Qb=function(_,V,U){for(var Q=Array(arguments.length-2),ke=2;ke<arguments.length;ke++)Q[ke-2]=arguments[ke];return h.prototype[V].apply(_,Q)}}function S(a){const h=a.length;if(0<h){const m=Array(h);for(let _=0;_<h;_++)m[_]=a[_];return m}return[]}function A(a,h){for(let m=1;m<arguments.length;m++){const _=arguments[m];if(u(_)){const V=a.length||0,U=_.length||0;a.length=V+U;for(let Q=0;Q<U;Q++)a[V+Q]=_[Q]}else a.push(_)}}class O{constructor(h,m){this.i=h,this.j=m,this.h=0,this.g=null}get(){let h;return 0<this.h?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function k(a){return/^[\s\xa0]*$/.test(a)}function x(){var a=c.navigator;return a&&(a=a.userAgent)?a:""}function M(a){return M[" "](a),a}M[" "]=function(){};var P=x().indexOf("Gecko")!=-1&&!(x().toLowerCase().indexOf("webkit")!=-1&&x().indexOf("Edge")==-1)&&!(x().indexOf("Trident")!=-1||x().indexOf("MSIE")!=-1)&&x().indexOf("Edge")==-1;function F(a,h,m){for(const _ in a)h.call(m,a[_],_,a)}function T(a,h){for(const m in a)h.call(void 0,a[m],m,a)}function v(a){const h={};for(const m in a)h[m]=a[m];return h}const w="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function R(a,h){let m,_;for(let V=1;V<arguments.length;V++){_=arguments[V];for(m in _)a[m]=_[m];for(let U=0;U<w.length;U++)m=w[U],Object.prototype.hasOwnProperty.call(_,m)&&(a[m]=_[m])}}function y(a){var h=1;a=a.split(":");const m=[];for(;0<h&&a.length;)m.push(a.shift()),h--;return a.length&&m.push(a.join(":")),m}function C(a){c.setTimeout(()=>{throw a},0)}function I(){var a=N;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class le{constructor(){this.h=this.g=null}add(h,m){const _=fe.get();_.set(h,m),this.h?this.h.next=_:this.g=_,this.h=_}}var fe=new O(()=>new X,a=>a.reset());class X{constructor(){this.next=this.g=this.h=null}set(h,m){this.h=h,this.g=m,this.next=null}reset(){this.next=this.g=this.h=null}}let ye,Be=!1,N=new le,z=()=>{const a=c.Promise.resolve(void 0);ye=()=>{a.then(q)}};var q=()=>{for(var a;a=I();){try{a.h.call(a.g)}catch(m){C(m)}var h=fe;h.j(a),100>h.h&&(h.h++,a.next=h.g,h.g=a)}Be=!1};function Z(){this.s=this.s,this.C=this.C}Z.prototype.s=!1,Z.prototype.ma=function(){this.s||(this.s=!0,this.N())},Z.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function j(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}j.prototype.h=function(){this.defaultPrevented=!0};var he=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const m=()=>{};c.addEventListener("test",m,h),c.removeEventListener("test",m,h)}catch{}return a}();function L(a,h){if(j.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var m=this.type=a.type,_=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget){if(P){e:{try{M(h.nodeName);var V=!0;break e}catch{}V=!1}V||(h=null)}}else m=="mouseover"?h=a.fromElement:m=="mouseout"&&(h=a.toElement);this.relatedTarget=h,_?(this.clientX=_.clientX!==void 0?_.clientX:_.pageX,this.clientY=_.clientY!==void 0?_.clientY:_.pageY,this.screenX=_.screenX||0,this.screenY=_.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:$[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&L.aa.h.call(this)}}E(L,j);var $={2:"touch",3:"pen",4:"mouse"};L.prototype.h=function(){L.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Y="closure_listenable_"+(1e6*Math.random()|0),ce=0;function re(a,h,m,_,V){this.listener=a,this.proxy=null,this.src=h,this.type=m,this.capture=!!_,this.ha=V,this.key=++ce,this.da=this.fa=!1}function ne(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Se(a){this.src=a,this.g={},this.h=0}Se.prototype.add=function(a,h,m,_,V){var U=a.toString();a=this.g[U],a||(a=this.g[U]=[],this.h++);var Q=$e(a,h,_,V);return-1<Q?(h=a[Q],m||(h.fa=!1)):(h=new re(h,this.src,U,!!_,V),h.fa=m,a.push(h)),h};function Ne(a,h){var m=h.type;if(m in a.g){var _=a.g[m],V=Array.prototype.indexOf.call(_,h,void 0),U;(U=0<=V)&&Array.prototype.splice.call(_,V,1),U&&(ne(h),a.g[m].length==0&&(delete a.g[m],a.h--))}}function $e(a,h,m,_){for(var V=0;V<a.length;++V){var U=a[V];if(!U.da&&U.listener==h&&U.capture==!!m&&U.ha==_)return V}return-1}var ct="closure_lm_"+(1e6*Math.random()|0),zn={};function Gn(a,h,m,_,V){if(Array.isArray(h)){for(var U=0;U<h.length;U++)Gn(a,h[U],m,_,V);return null}return m=Ld(m),a&&a[Y]?a.K(h,m,d(_)?!!_.capture:!1,V):Ls(a,h,m,!1,_,V)}function Ls(a,h,m,_,V,U){if(!h)throw Error("Invalid event type");var Q=d(V)?!!V.capture:!!V,ke=Cc(a);if(ke||(a[ct]=ke=new Se(a)),m=ke.add(h,m,_,Q,U),m.proxy)return m;if(_=Dy(),m.proxy=_,_.src=a,_.listener=m,a.addEventListener)he||(V=Q),V===void 0&&(V=!1),a.addEventListener(h.toString(),_,V);else if(a.attachEvent)a.attachEvent(Od(h.toString()),_);else if(a.addListener&&a.removeListener)a.addListener(_);else throw Error("addEventListener and attachEvent are unavailable.");return m}function Dy(){function a(m){return h.call(a.src,a.listener,m)}const h=Vy;return a}function Vd(a,h,m,_,V){if(Array.isArray(h))for(var U=0;U<h.length;U++)Vd(a,h[U],m,_,V);else _=d(_)?!!_.capture:!!_,m=Ld(m),a&&a[Y]?(a=a.i,h=String(h).toString(),h in a.g&&(U=a.g[h],m=$e(U,m,_,V),-1<m&&(ne(U[m]),Array.prototype.splice.call(U,m,1),U.length==0&&(delete a.g[h],a.h--)))):a&&(a=Cc(a))&&(h=a.g[h.toString()],a=-1,h&&(a=$e(h,m,_,V)),(m=-1<a?h[a]:null)&&kc(m))}function kc(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[Y])Ne(h.i,a);else{var m=a.type,_=a.proxy;h.removeEventListener?h.removeEventListener(m,_,a.capture):h.detachEvent?h.detachEvent(Od(m),_):h.addListener&&h.removeListener&&h.removeListener(_),(m=Cc(h))?(Ne(m,a),m.h==0&&(m.src=null,h[ct]=null)):ne(a)}}}function Od(a){return a in zn?zn[a]:zn[a]="on"+a}function Vy(a,h){if(a.da)a=!0;else{h=new L(h,this);var m=a.listener,_=a.ha||a.src;a.fa&&kc(a),a=m.call(_,h)}return a}function Cc(a){return a=a[ct],a instanceof Se?a:null}var Pc="__closure_events_fn_"+(1e9*Math.random()>>>0);function Ld(a){return typeof a=="function"?a:(a[Pc]||(a[Pc]=function(h){return a.handleEvent(h)}),a[Pc])}function Je(){Z.call(this),this.i=new Se(this),this.M=this,this.F=null}E(Je,Z),Je.prototype[Y]=!0,Je.prototype.removeEventListener=function(a,h,m,_){Vd(this,a,h,m,_)};function lt(a,h){var m,_=a.F;if(_)for(m=[];_;_=_.F)m.push(_);if(a=a.M,_=h.type||h,typeof h=="string")h=new j(h,a);else if(h instanceof j)h.target=h.target||a;else{var V=h;h=new j(_,a),R(h,V)}if(V=!0,m)for(var U=m.length-1;0<=U;U--){var Q=h.g=m[U];V=ao(Q,_,!0,h)&&V}if(Q=h.g=a,V=ao(Q,_,!0,h)&&V,V=ao(Q,_,!1,h)&&V,m)for(U=0;U<m.length;U++)Q=h.g=m[U],V=ao(Q,_,!1,h)&&V}Je.prototype.N=function(){if(Je.aa.N.call(this),this.i){var a=this.i,h;for(h in a.g){for(var m=a.g[h],_=0;_<m.length;_++)ne(m[_]);delete a.g[h],a.h--}}this.F=null},Je.prototype.K=function(a,h,m,_){return this.i.add(String(a),h,!1,m,_)},Je.prototype.L=function(a,h,m,_){return this.i.add(String(a),h,!0,m,_)};function ao(a,h,m,_){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();for(var V=!0,U=0;U<h.length;++U){var Q=h[U];if(Q&&!Q.da&&Q.capture==m){var ke=Q.listener,We=Q.ha||Q.src;Q.fa&&Ne(a.i,Q),V=ke.call(We,_)!==!1&&V}}return V&&!_.defaultPrevented}function Md(a,h,m){if(typeof a=="function")m&&(a=g(a,m));else if(a&&typeof a.handleEvent=="function")a=g(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(h)?-1:c.setTimeout(a,h||0)}function Fd(a){a.g=Md(()=>{a.g=null,a.i&&(a.i=!1,Fd(a))},a.l);const h=a.h;a.h=null,a.m.apply(null,h)}class Oy extends Z{constructor(h,m){super(),this.m=h,this.l=m,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:Fd(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ms(a){Z.call(this),this.h=a,this.g={}}E(Ms,Z);var Ud=[];function Bd(a){F(a.g,function(h,m){this.g.hasOwnProperty(m)&&kc(h)},a),a.g={}}Ms.prototype.N=function(){Ms.aa.N.call(this),Bd(this)},Ms.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var xc=c.JSON.stringify,Ly=c.JSON.parse,My=class{stringify(a){return c.JSON.stringify(a,void 0)}parse(a){return c.JSON.parse(a,void 0)}};function Nc(){}Nc.prototype.h=null;function $d(a){return a.h||(a.h=a.i())}function qd(){}var Fs={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Dc(){j.call(this,"d")}E(Dc,j);function Vc(){j.call(this,"c")}E(Vc,j);var Hn={},jd=null;function co(){return jd=jd||new Je}Hn.La="serverreachability";function zd(a){j.call(this,Hn.La,a)}E(zd,j);function Us(a){const h=co();lt(h,new zd(h))}Hn.STAT_EVENT="statevent";function Gd(a,h){j.call(this,Hn.STAT_EVENT,a),this.stat=h}E(Gd,j);function ut(a){const h=co();lt(h,new Gd(h,a))}Hn.Ma="timingevent";function Hd(a,h){j.call(this,Hn.Ma,a),this.size=h}E(Hd,j);function Bs(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){a()},h)}function $s(){this.g=!0}$s.prototype.xa=function(){this.g=!1};function Fy(a,h,m,_,V,U){a.info(function(){if(a.g)if(U)for(var Q="",ke=U.split("&"),We=0;We<ke.length;We++){var be=ke[We].split("=");if(1<be.length){var Xe=be[0];be=be[1];var Ze=Xe.split("_");Q=2<=Ze.length&&Ze[1]=="type"?Q+(Xe+"="+be+"&"):Q+(Xe+"=redacted&")}}else Q=null;else Q=U;return"XMLHTTP REQ ("+_+") [attempt "+V+"]: "+h+`
`+m+`
`+Q})}function Uy(a,h,m,_,V,U,Q){a.info(function(){return"XMLHTTP RESP ("+_+") [ attempt "+V+"]: "+h+`
`+m+`
`+U+" "+Q})}function Fr(a,h,m,_){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+$y(a,m)+(_?" "+_:"")})}function By(a,h){a.info(function(){return"TIMEOUT: "+h})}$s.prototype.info=function(){};function $y(a,h){if(!a.g)return h;if(!h)return null;try{var m=JSON.parse(h);if(m){for(a=0;a<m.length;a++)if(Array.isArray(m[a])){var _=m[a];if(!(2>_.length)){var V=_[1];if(Array.isArray(V)&&!(1>V.length)){var U=V[0];if(U!="noop"&&U!="stop"&&U!="close")for(var Q=1;Q<V.length;Q++)V[Q]=""}}}}return xc(m)}catch{return h}}var lo={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Kd={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Oc;function uo(){}E(uo,Nc),uo.prototype.g=function(){return new XMLHttpRequest},uo.prototype.i=function(){return{}},Oc=new uo;function fn(a,h,m,_){this.j=a,this.i=h,this.l=m,this.R=_||1,this.U=new Ms(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Wd}function Wd(){this.i=null,this.g="",this.h=!1}var Qd={},Lc={};function Mc(a,h,m){a.L=1,a.v=mo(Xt(h)),a.m=m,a.P=!0,Yd(a,null)}function Yd(a,h){a.F=Date.now(),ho(a),a.A=Xt(a.v);var m=a.A,_=a.R;Array.isArray(_)||(_=[String(_)]),uh(m.i,"t",_),a.C=0,m=a.j.J,a.h=new Wd,a.g=kh(a.j,m?h:null,!a.m),0<a.O&&(a.M=new Oy(g(a.Y,a,a.g),a.O)),h=a.U,m=a.g,_=a.ca;var V="readystatechange";Array.isArray(V)||(V&&(Ud[0]=V.toString()),V=Ud);for(var U=0;U<V.length;U++){var Q=Gn(m,V[U],_||h.handleEvent,!1,h.h||h);if(!Q)break;h.g[Q.key]=Q}h=a.H?v(a.H):{},a.m?(a.u||(a.u="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,h)):(a.u="GET",a.g.ea(a.A,a.u,null,h)),Us(),Fy(a.i,a.u,a.A,a.l,a.R,a.m)}fn.prototype.ca=function(a){a=a.target;const h=this.M;h&&Zt(a)==3?h.j():this.Y(a)},fn.prototype.Y=function(a){try{if(a==this.g)e:{const Ze=Zt(this.g);var h=this.g.Ba();const $r=this.g.Z();if(!(3>Ze)&&(Ze!=3||this.g&&(this.h.h||this.g.oa()||_h(this.g)))){this.J||Ze!=4||h==7||(h==8||0>=$r?Us(3):Us(2)),Fc(this);var m=this.g.Z();this.X=m;t:if(Jd(this)){var _=_h(this.g);a="";var V=_.length,U=Zt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Kn(this),qs(this);var Q="";break t}this.h.i=new c.TextDecoder}for(h=0;h<V;h++)this.h.h=!0,a+=this.h.i.decode(_[h],{stream:!(U&&h==V-1)});_.length=0,this.h.g+=a,this.C=0,Q=this.h.g}else Q=this.g.oa();if(this.o=m==200,Uy(this.i,this.u,this.A,this.l,this.R,Ze,m),this.o){if(this.T&&!this.K){t:{if(this.g){var ke,We=this.g;if((ke=We.g?We.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!k(ke)){var be=ke;break t}}be=null}if(m=be)Fr(this.i,this.l,m,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Uc(this,m);else{this.o=!1,this.s=3,ut(12),Kn(this),qs(this);break e}}if(this.P){m=!0;let Nt;for(;!this.J&&this.C<Q.length;)if(Nt=qy(this,Q),Nt==Lc){Ze==4&&(this.s=4,ut(14),m=!1),Fr(this.i,this.l,null,"[Incomplete Response]");break}else if(Nt==Qd){this.s=4,ut(15),Fr(this.i,this.l,Q,"[Invalid Chunk]"),m=!1;break}else Fr(this.i,this.l,Nt,null),Uc(this,Nt);if(Jd(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ze!=4||Q.length!=0||this.h.h||(this.s=1,ut(16),m=!1),this.o=this.o&&m,!m)Fr(this.i,this.l,Q,"[Invalid Chunked Response]"),Kn(this),qs(this);else if(0<Q.length&&!this.W){this.W=!0;var Xe=this.j;Xe.g==this&&Xe.ba&&!Xe.M&&(Xe.j.info("Great, no buffering proxy detected. Bytes received: "+Q.length),Gc(Xe),Xe.M=!0,ut(11))}}else Fr(this.i,this.l,Q,null),Uc(this,Q);Ze==4&&Kn(this),this.o&&!this.J&&(Ze==4?Th(this.j,this):(this.o=!1,ho(this)))}else ib(this.g),m==400&&0<Q.indexOf("Unknown SID")?(this.s=3,ut(12)):(this.s=0,ut(13)),Kn(this),qs(this)}}}catch{}finally{}};function Jd(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function qy(a,h){var m=a.C,_=h.indexOf(`
`,m);return _==-1?Lc:(m=Number(h.substring(m,_)),isNaN(m)?Qd:(_+=1,_+m>h.length?Lc:(h=h.slice(_,_+m),a.C=_+m,h)))}fn.prototype.cancel=function(){this.J=!0,Kn(this)};function ho(a){a.S=Date.now()+a.I,Xd(a,a.I)}function Xd(a,h){if(a.B!=null)throw Error("WatchDog timer not null");a.B=Bs(g(a.ba,a),h)}function Fc(a){a.B&&(c.clearTimeout(a.B),a.B=null)}fn.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(By(this.i,this.A),this.L!=2&&(Us(),ut(17)),Kn(this),this.s=2,qs(this)):Xd(this,this.S-a)};function qs(a){a.j.G==0||a.J||Th(a.j,a)}function Kn(a){Fc(a);var h=a.M;h&&typeof h.ma=="function"&&h.ma(),a.M=null,Bd(a.U),a.g&&(h=a.g,a.g=null,h.abort(),h.ma())}function Uc(a,h){try{var m=a.j;if(m.G!=0&&(m.g==a||Bc(m.h,a))){if(!a.K&&Bc(m.h,a)&&m.G==3){try{var _=m.Da.g.parse(h)}catch{_=null}if(Array.isArray(_)&&_.length==3){var V=_;if(V[0]==0){e:if(!m.u){if(m.g)if(m.g.F+3e3<a.F)wo(m),yo(m);else break e;zc(m),ut(18)}}else m.za=V[1],0<m.za-m.T&&37500>V[2]&&m.F&&m.v==0&&!m.C&&(m.C=Bs(g(m.Za,m),6e3));if(1>=th(m.h)&&m.ca){try{m.ca()}catch{}m.ca=void 0}}else Qn(m,11)}else if((a.K||m.g==a)&&wo(m),!k(h))for(V=m.Da.g.parse(h),h=0;h<V.length;h++){let be=V[h];if(m.T=be[0],be=be[1],m.G==2)if(be[0]=="c"){m.K=be[1],m.ia=be[2];const Xe=be[3];Xe!=null&&(m.la=Xe,m.j.info("VER="+m.la));const Ze=be[4];Ze!=null&&(m.Aa=Ze,m.j.info("SVER="+m.Aa));const $r=be[5];$r!=null&&typeof $r=="number"&&0<$r&&(_=1.5*$r,m.L=_,m.j.info("backChannelRequestTimeoutMs_="+_)),_=m;const Nt=a.g;if(Nt){const Eo=Nt.g?Nt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Eo){var U=_.h;U.g||Eo.indexOf("spdy")==-1&&Eo.indexOf("quic")==-1&&Eo.indexOf("h2")==-1||(U.j=U.l,U.g=new Set,U.h&&($c(U,U.h),U.h=null))}if(_.D){const Hc=Nt.g?Nt.g.getResponseHeader("X-HTTP-Session-Id"):null;Hc&&(_.ya=Hc,Ce(_.I,_.D,Hc))}}m.G=3,m.l&&m.l.ua(),m.ba&&(m.R=Date.now()-a.F,m.j.info("Handshake RTT: "+m.R+"ms")),_=m;var Q=a;if(_.qa=Sh(_,_.J?_.ia:null,_.W),Q.K){nh(_.h,Q);var ke=Q,We=_.L;We&&(ke.I=We),ke.B&&(Fc(ke),ho(ke)),_.g=Q}else Ih(_);0<m.i.length&&bo(m)}else be[0]!="stop"&&be[0]!="close"||Qn(m,7);else m.G==3&&(be[0]=="stop"||be[0]=="close"?be[0]=="stop"?Qn(m,7):jc(m):be[0]!="noop"&&m.l&&m.l.ta(be),m.v=0)}}Us(4)}catch{}}var jy=class{constructor(a,h){this.g=a,this.map=h}};function Zd(a){this.l=a||10,c.PerformanceNavigationTiming?(a=c.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function eh(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function th(a){return a.h?1:a.g?a.g.size:0}function Bc(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function $c(a,h){a.g?a.g.add(h):a.h=h}function nh(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}Zd.prototype.cancel=function(){if(this.i=rh(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function rh(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let h=a.i;for(const m of a.g.values())h=h.concat(m.D);return h}return S(a.i)}function zy(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(u(a)){for(var h=[],m=a.length,_=0;_<m;_++)h.push(a[_]);return h}h=[],m=0;for(_ in a)h[m++]=a[_];return h}function Gy(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(u(a)||typeof a=="string"){var h=[];a=a.length;for(var m=0;m<a;m++)h.push(m);return h}h=[],m=0;for(const _ in a)h[m++]=_;return h}}}function sh(a,h){if(a.forEach&&typeof a.forEach=="function")a.forEach(h,void 0);else if(u(a)||typeof a=="string")Array.prototype.forEach.call(a,h,void 0);else for(var m=Gy(a),_=zy(a),V=_.length,U=0;U<V;U++)h.call(void 0,_[U],m&&m[U],a)}var ih=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Hy(a,h){if(a){a=a.split("&");for(var m=0;m<a.length;m++){var _=a[m].indexOf("="),V=null;if(0<=_){var U=a[m].substring(0,_);V=a[m].substring(_+1)}else U=a[m];h(U,V?decodeURIComponent(V.replace(/\+/g," ")):"")}}}function Wn(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof Wn){this.h=a.h,fo(this,a.j),this.o=a.o,this.g=a.g,po(this,a.s),this.l=a.l;var h=a.i,m=new Gs;m.i=h.i,h.g&&(m.g=new Map(h.g),m.h=h.h),oh(this,m),this.m=a.m}else a&&(h=String(a).match(ih))?(this.h=!1,fo(this,h[1]||"",!0),this.o=js(h[2]||""),this.g=js(h[3]||"",!0),po(this,h[4]),this.l=js(h[5]||"",!0),oh(this,h[6]||"",!0),this.m=js(h[7]||"")):(this.h=!1,this.i=new Gs(null,this.h))}Wn.prototype.toString=function(){var a=[],h=this.j;h&&a.push(zs(h,ah,!0),":");var m=this.g;return(m||h=="file")&&(a.push("//"),(h=this.o)&&a.push(zs(h,ah,!0),"@"),a.push(encodeURIComponent(String(m)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),m=this.s,m!=null&&a.push(":",String(m))),(m=this.l)&&(this.g&&m.charAt(0)!="/"&&a.push("/"),a.push(zs(m,m.charAt(0)=="/"?Qy:Wy,!0))),(m=this.i.toString())&&a.push("?",m),(m=this.m)&&a.push("#",zs(m,Jy)),a.join("")};function Xt(a){return new Wn(a)}function fo(a,h,m){a.j=m?js(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function po(a,h){if(h){if(h=Number(h),isNaN(h)||0>h)throw Error("Bad port number "+h);a.s=h}else a.s=null}function oh(a,h,m){h instanceof Gs?(a.i=h,Xy(a.i,a.h)):(m||(h=zs(h,Yy)),a.i=new Gs(h,a.h))}function Ce(a,h,m){a.i.set(h,m)}function mo(a){return Ce(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function js(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function zs(a,h,m){return typeof a=="string"?(a=encodeURI(a).replace(h,Ky),m&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Ky(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var ah=/[#\/\?@]/g,Wy=/[#\?:]/g,Qy=/[#\?]/g,Yy=/[#\?@]/g,Jy=/#/g;function Gs(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function pn(a){a.g||(a.g=new Map,a.h=0,a.i&&Hy(a.i,function(h,m){a.add(decodeURIComponent(h.replace(/\+/g," ")),m)}))}n=Gs.prototype,n.add=function(a,h){pn(this),this.i=null,a=Ur(this,a);var m=this.g.get(a);return m||this.g.set(a,m=[]),m.push(h),this.h+=1,this};function ch(a,h){pn(a),h=Ur(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function lh(a,h){return pn(a),h=Ur(a,h),a.g.has(h)}n.forEach=function(a,h){pn(this),this.g.forEach(function(m,_){m.forEach(function(V){a.call(h,V,_,this)},this)},this)},n.na=function(){pn(this);const a=Array.from(this.g.values()),h=Array.from(this.g.keys()),m=[];for(let _=0;_<h.length;_++){const V=a[_];for(let U=0;U<V.length;U++)m.push(h[_])}return m},n.V=function(a){pn(this);let h=[];if(typeof a=="string")lh(this,a)&&(h=h.concat(this.g.get(Ur(this,a))));else{a=Array.from(this.g.values());for(let m=0;m<a.length;m++)h=h.concat(a[m])}return h},n.set=function(a,h){return pn(this),this.i=null,a=Ur(this,a),lh(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},n.get=function(a,h){return a?(a=this.V(a),0<a.length?String(a[0]):h):h};function uh(a,h,m){ch(a,h),0<m.length&&(a.i=null,a.g.set(Ur(a,h),S(m)),a.h+=m.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],h=Array.from(this.g.keys());for(var m=0;m<h.length;m++){var _=h[m];const U=encodeURIComponent(String(_)),Q=this.V(_);for(_=0;_<Q.length;_++){var V=U;Q[_]!==""&&(V+="="+encodeURIComponent(String(Q[_]))),a.push(V)}}return this.i=a.join("&")};function Ur(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function Xy(a,h){h&&!a.j&&(pn(a),a.i=null,a.g.forEach(function(m,_){var V=_.toLowerCase();_!=V&&(ch(this,_),uh(this,V,m))},a)),a.j=h}function Zy(a,h){const m=new $s;if(c.Image){const _=new Image;_.onload=b(mn,m,"TestLoadImage: loaded",!0,h,_),_.onerror=b(mn,m,"TestLoadImage: error",!1,h,_),_.onabort=b(mn,m,"TestLoadImage: abort",!1,h,_),_.ontimeout=b(mn,m,"TestLoadImage: timeout",!1,h,_),c.setTimeout(function(){_.ontimeout&&_.ontimeout()},1e4),_.src=a}else h(!1)}function eb(a,h){const m=new $s,_=new AbortController,V=setTimeout(()=>{_.abort(),mn(m,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:_.signal}).then(U=>{clearTimeout(V),U.ok?mn(m,"TestPingServer: ok",!0,h):mn(m,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(V),mn(m,"TestPingServer: error",!1,h)})}function mn(a,h,m,_,V){try{V&&(V.onload=null,V.onerror=null,V.onabort=null,V.ontimeout=null),_(m)}catch{}}function tb(){this.g=new My}function nb(a,h,m){const _=m||"";try{sh(a,function(V,U){let Q=V;d(V)&&(Q=xc(V)),h.push(_+U+"="+encodeURIComponent(Q))})}catch(V){throw h.push(_+"type="+encodeURIComponent("_badmap")),V}}function go(a){this.l=a.Ub||null,this.j=a.eb||!1}E(go,Nc),go.prototype.g=function(){return new _o(this.l,this.j)},go.prototype.i=function(a){return function(){return a}}({});function _o(a,h){Je.call(this),this.D=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}E(_o,Je),n=_o.prototype,n.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=h,this.readyState=1,Ks(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const h={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(h.body=a),(this.D||c).fetch(new Request(this.A,h)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Hs(this)),this.readyState=0},n.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Ks(this)),this.g&&(this.readyState=3,Ks(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;dh(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function dh(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}n.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.v.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?Hs(this):Ks(this),this.readyState==3&&dh(this)}},n.Ra=function(a){this.g&&(this.response=this.responseText=a,Hs(this))},n.Qa=function(a){this.g&&(this.response=a,Hs(this))},n.ga=function(){this.g&&Hs(this)};function Hs(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Ks(a)}n.setRequestHeader=function(a,h){this.u.append(a,h)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],h=this.h.entries();for(var m=h.next();!m.done;)m=m.value,a.push(m[0]+": "+m[1]),m=h.next();return a.join(`\r
`)};function Ks(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(_o.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function hh(a){let h="";return F(a,function(m,_){h+=_,h+=":",h+=m,h+=`\r
`}),h}function qc(a,h,m){e:{for(_ in m){var _=!1;break e}_=!0}_||(m=hh(m),typeof a=="string"?m!=null&&encodeURIComponent(String(m)):Ce(a,h,m))}function Le(a){Je.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}E(Le,Je);var rb=/^https?$/i,sb=["POST","PUT"];n=Le.prototype,n.Ha=function(a){this.J=a},n.ea=function(a,h,m,_){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Oc.g(),this.v=this.o?$d(this.o):$d(Oc),this.g.onreadystatechange=g(this.Ea,this);try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(U){fh(this,U);return}if(a=m||"",m=new Map(this.headers),_)if(Object.getPrototypeOf(_)===Object.prototype)for(var V in _)m.set(V,_[V]);else if(typeof _.keys=="function"&&typeof _.get=="function")for(const U of _.keys())m.set(U,_.get(U));else throw Error("Unknown input type for opt_headers: "+String(_));_=Array.from(m.keys()).find(U=>U.toLowerCase()=="content-type"),V=c.FormData&&a instanceof c.FormData,!(0<=Array.prototype.indexOf.call(sb,h,void 0))||_||V||m.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[U,Q]of m)this.g.setRequestHeader(U,Q);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{gh(this),this.u=!0,this.g.send(a),this.u=!1}catch(U){fh(this,U)}};function fh(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.m=5,ph(a),vo(a)}function ph(a){a.A||(a.A=!0,lt(a,"complete"),lt(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,lt(this,"complete"),lt(this,"abort"),vo(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),vo(this,!0)),Le.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?mh(this):this.bb())},n.bb=function(){mh(this)};function mh(a){if(a.h&&typeof o<"u"&&(!a.v[1]||Zt(a)!=4||a.Z()!=2)){if(a.u&&Zt(a)==4)Md(a.Ea,0,a);else if(lt(a,"readystatechange"),Zt(a)==4){a.h=!1;try{const Q=a.Z();e:switch(Q){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var m;if(!(m=h)){var _;if(_=Q===0){var V=String(a.D).match(ih)[1]||null;!V&&c.self&&c.self.location&&(V=c.self.location.protocol.slice(0,-1)),_=!rb.test(V?V.toLowerCase():"")}m=_}if(m)lt(a,"complete"),lt(a,"success");else{a.m=6;try{var U=2<Zt(a)?a.g.statusText:""}catch{U=""}a.l=U+" ["+a.Z()+"]",ph(a)}}finally{vo(a)}}}}function vo(a,h){if(a.g){gh(a);const m=a.g,_=a.v[0]?()=>{}:null;a.g=null,a.v=null,h||lt(a,"ready");try{m.onreadystatechange=_}catch{}}}function gh(a){a.I&&(c.clearTimeout(a.I),a.I=null)}n.isActive=function(){return!!this.g};function Zt(a){return a.g?a.g.readyState:0}n.Z=function(){try{return 2<Zt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),Ly(h)}};function _h(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function ib(a){const h={};a=(a.g&&2<=Zt(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let _=0;_<a.length;_++){if(k(a[_]))continue;var m=y(a[_]);const V=m[0];if(m=m[1],typeof m!="string")continue;m=m.trim();const U=h[V]||[];h[V]=U,U.push(m)}T(h,function(_){return _.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Ws(a,h,m){return m&&m.internalChannelParams&&m.internalChannelParams[a]||h}function vh(a){this.Aa=0,this.i=[],this.j=new $s,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Ws("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Ws("baseRetryDelayMs",5e3,a),this.cb=Ws("retryDelaySeedMs",1e4,a),this.Wa=Ws("forwardChannelMaxRetries",2,a),this.wa=Ws("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new Zd(a&&a.concurrentRequestLimit),this.Da=new tb,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=vh.prototype,n.la=8,n.G=1,n.connect=function(a,h,m,_){ut(0),this.W=a,this.H=h||{},m&&_!==void 0&&(this.H.OSID=m,this.H.OAID=_),this.F=this.X,this.I=Sh(this,null,this.W),bo(this)};function jc(a){if(yh(a),a.G==3){var h=a.U++,m=Xt(a.I);if(Ce(m,"SID",a.K),Ce(m,"RID",h),Ce(m,"TYPE","terminate"),Qs(a,m),h=new fn(a,a.j,h),h.L=2,h.v=mo(Xt(m)),m=!1,c.navigator&&c.navigator.sendBeacon)try{m=c.navigator.sendBeacon(h.v.toString(),"")}catch{}!m&&c.Image&&(new Image().src=h.v,m=!0),m||(h.g=kh(h.j,null),h.g.ea(h.v)),h.F=Date.now(),ho(h)}Rh(a)}function yo(a){a.g&&(Gc(a),a.g.cancel(),a.g=null)}function yh(a){yo(a),a.u&&(c.clearTimeout(a.u),a.u=null),wo(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&c.clearTimeout(a.s),a.s=null)}function bo(a){if(!eh(a.h)&&!a.s){a.s=!0;var h=a.Ga;ye||z(),Be||(ye(),Be=!0),N.add(h,a),a.B=0}}function ob(a,h){return th(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=h.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=Bs(g(a.Ga,a,h),Ah(a,a.B)),a.B++,!0)}n.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const V=new fn(this,this.j,a);let U=this.o;if(this.S&&(U?(U=v(U),R(U,this.S)):U=this.S),this.m!==null||this.O||(V.H=U,U=null),this.P)e:{for(var h=0,m=0;m<this.i.length;m++){t:{var _=this.i[m];if("__data__"in _.map&&(_=_.map.__data__,typeof _=="string")){_=_.length;break t}_=void 0}if(_===void 0)break;if(h+=_,4096<h){h=m;break e}if(h===4096||m===this.i.length-1){h=m+1;break e}}h=1e3}else h=1e3;h=wh(this,V,h),m=Xt(this.I),Ce(m,"RID",a),Ce(m,"CVER",22),this.D&&Ce(m,"X-HTTP-Session-Id",this.D),Qs(this,m),U&&(this.O?h="headers="+encodeURIComponent(String(hh(U)))+"&"+h:this.m&&qc(m,this.m,U)),$c(this.h,V),this.Ua&&Ce(m,"TYPE","init"),this.P?(Ce(m,"$req",h),Ce(m,"SID","null"),V.T=!0,Mc(V,m,null)):Mc(V,m,h),this.G=2}}else this.G==3&&(a?bh(this,a):this.i.length==0||eh(this.h)||bh(this))};function bh(a,h){var m;h?m=h.l:m=a.U++;const _=Xt(a.I);Ce(_,"SID",a.K),Ce(_,"RID",m),Ce(_,"AID",a.T),Qs(a,_),a.m&&a.o&&qc(_,a.m,a.o),m=new fn(a,a.j,m,a.B+1),a.m===null&&(m.H=a.o),h&&(a.i=h.D.concat(a.i)),h=wh(a,m,1e3),m.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),$c(a.h,m),Mc(m,_,h)}function Qs(a,h){a.H&&F(a.H,function(m,_){Ce(h,_,m)}),a.l&&sh({},function(m,_){Ce(h,_,m)})}function wh(a,h,m){m=Math.min(a.i.length,m);var _=a.l?g(a.l.Na,a.l,a):null;e:{var V=a.i;let U=-1;for(;;){const Q=["count="+m];U==-1?0<m?(U=V[0].g,Q.push("ofs="+U)):U=0:Q.push("ofs="+U);let ke=!0;for(let We=0;We<m;We++){let be=V[We].g;const Xe=V[We].map;if(be-=U,0>be)U=Math.max(0,V[We].g-100),ke=!1;else try{nb(Xe,Q,"req"+be+"_")}catch{_&&_(Xe)}}if(ke){_=Q.join("&");break e}}}return a=a.i.splice(0,m),h.D=a,_}function Ih(a){if(!a.g&&!a.u){a.Y=1;var h=a.Fa;ye||z(),Be||(ye(),Be=!0),N.add(h,a),a.v=0}}function zc(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=Bs(g(a.Fa,a),Ah(a,a.v)),a.v++,!0)}n.Fa=function(){if(this.u=null,Eh(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=Bs(g(this.ab,this),a)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,ut(10),yo(this),Eh(this))};function Gc(a){a.A!=null&&(c.clearTimeout(a.A),a.A=null)}function Eh(a){a.g=new fn(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var h=Xt(a.qa);Ce(h,"RID","rpc"),Ce(h,"SID",a.K),Ce(h,"AID",a.T),Ce(h,"CI",a.F?"0":"1"),!a.F&&a.ja&&Ce(h,"TO",a.ja),Ce(h,"TYPE","xmlhttp"),Qs(a,h),a.m&&a.o&&qc(h,a.m,a.o),a.L&&(a.g.I=a.L);var m=a.g;a=a.ia,m.L=1,m.v=mo(Xt(h)),m.m=null,m.P=!0,Yd(m,a)}n.Za=function(){this.C!=null&&(this.C=null,yo(this),zc(this),ut(19))};function wo(a){a.C!=null&&(c.clearTimeout(a.C),a.C=null)}function Th(a,h){var m=null;if(a.g==h){wo(a),Gc(a),a.g=null;var _=2}else if(Bc(a.h,h))m=h.D,nh(a.h,h),_=1;else return;if(a.G!=0){if(h.o)if(_==1){m=h.m?h.m.length:0,h=Date.now()-h.F;var V=a.B;_=co(),lt(_,new Hd(_,m)),bo(a)}else Ih(a);else if(V=h.s,V==3||V==0&&0<h.X||!(_==1&&ob(a,h)||_==2&&zc(a)))switch(m&&0<m.length&&(h=a.h,h.i=h.i.concat(m)),V){case 1:Qn(a,5);break;case 4:Qn(a,10);break;case 3:Qn(a,6);break;default:Qn(a,2)}}}function Ah(a,h){let m=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(m*=2),m*h}function Qn(a,h){if(a.j.info("Error code "+h),h==2){var m=g(a.fb,a),_=a.Xa;const V=!_;_=new Wn(_||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||fo(_,"https"),mo(_),V?Zy(_.toString(),m):eb(_.toString(),m)}else ut(2);a.G=0,a.l&&a.l.sa(h),Rh(a),yh(a)}n.fb=function(a){a?(this.j.info("Successfully pinged google.com"),ut(2)):(this.j.info("Failed to ping google.com"),ut(1))};function Rh(a){if(a.G=0,a.ka=[],a.l){const h=rh(a.h);(h.length!=0||a.i.length!=0)&&(A(a.ka,h),A(a.ka,a.i),a.h.i.length=0,S(a.i),a.i.length=0),a.l.ra()}}function Sh(a,h,m){var _=m instanceof Wn?Xt(m):new Wn(m);if(_.g!="")h&&(_.g=h+"."+_.g),po(_,_.s);else{var V=c.location;_=V.protocol,h=h?h+"."+V.hostname:V.hostname,V=+V.port;var U=new Wn(null);_&&fo(U,_),h&&(U.g=h),V&&po(U,V),m&&(U.l=m),_=U}return m=a.D,h=a.ya,m&&h&&Ce(_,m,h),Ce(_,"VER",a.la),Qs(a,_),_}function kh(a,h,m){if(h&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Ca&&!a.pa?new Le(new go({eb:m})):new Le(a.pa),h.Ha(a.J),h}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Ch(){}n=Ch.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Io(){}Io.prototype.g=function(a,h){return new yt(a,h)};function yt(a,h){Je.call(this),this.g=new vh(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.va&&(a?a["X-WebChannel-Client-Profile"]=h.va:a={"X-WebChannel-Client-Profile":h.va}),this.g.S=a,(a=h&&h.Sb)&&!k(a)&&(this.g.m=a),this.v=h&&h.supportsCrossDomainXhr||!1,this.u=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!k(h)&&(this.g.D=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new Br(this)}E(yt,Je),yt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},yt.prototype.close=function(){jc(this.g)},yt.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var m={};m.__data__=a,a=m}else this.u&&(m={},m.__data__=xc(a),a=m);h.i.push(new jy(h.Ya++,a)),h.G==3&&bo(h)},yt.prototype.N=function(){this.g.l=null,delete this.j,jc(this.g),delete this.g,yt.aa.N.call(this)};function Ph(a){Dc.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(const m in h){a=m;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}E(Ph,Dc);function xh(){Vc.call(this),this.status=1}E(xh,Vc);function Br(a){this.g=a}E(Br,Ch),Br.prototype.ua=function(){lt(this.g,"a")},Br.prototype.ta=function(a){lt(this.g,new Ph(a))},Br.prototype.sa=function(a){lt(this.g,new xh)},Br.prototype.ra=function(){lt(this.g,"b")},Io.prototype.createWebChannel=Io.prototype.g,yt.prototype.send=yt.prototype.o,yt.prototype.open=yt.prototype.m,yt.prototype.close=yt.prototype.close,lg=function(){return new Io},cg=function(){return co()},ag=Hn,El={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},lo.NO_ERROR=0,lo.TIMEOUT=8,lo.HTTP_ERROR=6,Ko=lo,Kd.COMPLETE="complete",og=Kd,qd.EventType=Fs,Fs.OPEN="a",Fs.CLOSE="b",Fs.ERROR="c",Fs.MESSAGE="d",Je.prototype.listen=Je.prototype.K,ii=qd,Le.prototype.listenOnce=Le.prototype.L,Le.prototype.getLastError=Le.prototype.Ka,Le.prototype.getLastErrorCode=Le.prototype.Ba,Le.prototype.getStatus=Le.prototype.Z,Le.prototype.getResponseJson=Le.prototype.Oa,Le.prototype.getResponseText=Le.prototype.oa,Le.prototype.send=Le.prototype.ea,Le.prototype.setWithCredentials=Le.prototype.Ha,ig=Le}).apply(typeof Ao<"u"?Ao:typeof self<"u"?self:typeof window<"u"?window:{});const uf="@firebase/firestore",df="4.7.7";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */let Ds="11.3.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vr=new Ha("@firebase/firestore");function Wr(){return vr.logLevel}function K(n,...e){if(vr.logLevel<=ge.DEBUG){const t=e.map(yu);vr.debug(`Firestore (${Ds}): ${n}`,...t)}}function ft(n,...e){if(vr.logLevel<=ge.ERROR){const t=e.map(yu);vr.error(`Firestore (${Ds}): ${n}`,...t)}}function Ai(n,...e){if(vr.logLevel<=ge.WARN){const t=e.map(yu);vr.warn(`Firestore (${Ds}): ${n}`,...t)}}function yu(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
 */function ee(n="Unexpected state"){const e=`FIRESTORE (${Ds}) INTERNAL ASSERTION FAILED: `+n;throw ft(e),new Error(e)}function te(n,e){n||ee()}function de(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const B={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class W extends Mt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ht{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nT{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class rT{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(ht.UNAUTHENTICATED))}shutdown(){}}class sT{constructor(e){this.t=e,this.currentUser=ht.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){te(this.o===void 0);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new Ht;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Ht,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},c=u=>{K("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>c(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(K("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Ht)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(K("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(te(typeof r.accessToken=="string"),new nT(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return te(e===null||typeof e=="string"),new ht(e)}}class iT{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=ht.FIRST_PARTY,this.T=new Map}I(){return this.P?this.P():null}get headers(){this.T.set("X-Goog-AuthUser",this.l);const e=this.I();return e&&this.T.set("Authorization",e),this.h&&this.T.set("X-Goog-Iam-Authorization-Token",this.h),this.T}}class oT{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new iT(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(ht.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class hf{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class aT{constructor(e,t){this.A=t,this.forceRefresh=!1,this.appCheck=null,this.R=null,this.V=null,It(e)&&e.settings.appCheckToken&&(this.V=e.settings.appCheckToken)}start(e,t){te(this.o===void 0);const r=i=>{i.error!=null&&K("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.R;return this.R=i.token,K("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{K("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):K("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.V)return Promise.resolve(new hf(this.V));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(te(typeof t.token=="string"),this.R=t.token,new hf(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cT(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */function Tl(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ug{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=cT(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function ue(n,e){return n<e?-1:n>e?1:0}function Al(n,e){const t=Tl().encode(n),r=Tl().encode(e);for(let s=0;s<Math.min(t.length,r.length);s++){const i=ue(t[s],r[s]);if(i!==0)return i}return ue(t.length,r.length)}function ds(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}function dg(n){return n+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ff=-62135596800,pf=1e6;class Oe{static now(){return Oe.fromMillis(Date.now())}static fromDate(e){return Oe.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*pf);return new Oe(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new W(B.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new W(B.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<ff)throw new W(B.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new W(B.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/pf}_compareTo(e){return this.seconds===e.seconds?ue(this.nanoseconds,e.nanoseconds):ue(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds-ff;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const mf="__name__";class Ut{constructor(e,t,r){t===void 0?t=0:t>e.length&&ee(),r===void 0?r=e.length-t:r>e.length-t&&ee(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Ut.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Ut?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=Ut.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return ue(e.length,t.length)}static compareSegments(e,t){const r=Ut.isNumericId(e),s=Ut.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?Ut.extractNumericId(e).compare(Ut.extractNumericId(t)):Al(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return xn.fromString(e.substring(4,e.length-2))}}class we extends Ut{construct(e,t,r){return new we(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new W(B.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new we(t)}static emptyPath(){return new we([])}}const lT=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ve extends Ut{construct(e,t,r){return new Ve(e,t,r)}static isValidIdentifier(e){return lT.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ve.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===mf}static keyField(){return new Ve([mf])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new W(B.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new W(B.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new W(B.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(r+=c,s++):(i(),s++)}if(i(),o)throw new W(B.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ve(t)}static emptyPath(){return new Ve([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const Ri=-1;class ga{constructor(e,t,r,s){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=s}}function Rl(n){return n.fields.find(e=>e.kind===2)}function er(n){return n.fields.filter(e=>e.kind!==2)}ga.UNKNOWN_ID=-1;class Wo{constructor(e,t){this.fieldPath=e,this.kind=t}}class Si{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new Si(0,St.min())}}function uT(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=ie.fromTimestamp(r===1e9?new Oe(t+1,0):new Oe(t,r));return new St(s,J.empty(),e)}function hg(n){return new St(n.readTime,n.key,Ri)}class St{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new St(ie.min(),J.empty(),Ri)}static max(){return new St(ie.max(),J.empty(),Ri)}}function bu(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=J.comparator(n.documentKey,e.documentKey),t!==0?t:ue(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fg="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class pg{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Nr(n){if(n.code!==B.FAILED_PRECONDITION||n.message!==fg)throw n;K("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const wt="SimpleDb";class Xa{static open(e,t,r,s){try{return new Xa(t,e.transaction(s,r))}catch(i){throw new di(t,i)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.m=new Ht,this.transaction.oncomplete=()=>{this.m.resolve()},this.transaction.onabort=()=>{t.error?this.m.reject(new di(e,t.error)):this.m.resolve()},this.transaction.onerror=r=>{const s=wu(r.target.error);this.m.reject(new di(e,s))}}get p(){return this.m.promise}abort(e){e&&this.m.reject(e),this.aborted||(K(wt,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}S(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new hT(t)}}class Nn{static delete(e){return K(wt,"Removing database:",e),sr(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!Ga())return!1;if(Nn.v())return!0;const e=Ge(),t=Nn.C(e),r=0<t&&t<10,s=mg(e),i=0<s&&s<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||i)}static v(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.F)==="YES"}static M(e,t){return e.store(t)}static C(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}constructor(e,t,r){this.name=e,this.version=t,this.O=r,Nn.C(Ge())===12.2&&ft("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async N(e){return this.db||(K(wt,"Opening database:",this.name),this.db=await new Promise((t,r)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const o=i.target.result;t(o)},s.onblocked=()=>{r(new di(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const o=i.target.error;o.name==="VersionError"?r(new W(B.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new W(B.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new di(e,o))},s.onupgradeneeded=i=>{K(wt,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const o=i.target.result;this.O.B(o,s.transaction,i.oldVersion,this.version).next(()=>{K(wt,"Database upgrade to version "+this.version+" complete")})}})),this.L&&(this.db.onversionchange=t=>this.L(t)),this.db}k(e){this.L=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,s){const i=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.N(e);const c=Xa.open(this.db,e,i?"readonly":"readwrite",r),u=s(c).next(d=>(c.S(),d)).catch(d=>(c.abort(d),D.reject(d))).toPromise();return u.catch(()=>{}),await c.p,u}catch(c){const u=c,d=u.name!=="FirebaseError"&&o<3;if(K(wt,"Transaction failed with error:",u.message,"Retrying:",d),this.close(),!d)return Promise.reject(u)}}}close(){this.db&&this.db.close(),this.db=void 0}}function mg(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class dT{constructor(e){this.q=e,this.$=!1,this.U=null}get isDone(){return this.$}get K(){return this.U}set cursor(e){this.q=e}done(){this.$=!0}W(e){this.U=e}delete(){return sr(this.q.delete())}}class di extends W{constructor(e,t){super(B.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function $n(n){return n.name==="IndexedDbTransactionError"}class hT{constructor(e){this.store=e}put(e,t){let r;return t!==void 0?(K(wt,"PUT",this.store.name,e,t),r=this.store.put(t,e)):(K(wt,"PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),sr(r)}add(e){return K(wt,"ADD",this.store.name,e,e),sr(this.store.add(e))}get(e){return sr(this.store.get(e)).next(t=>(t===void 0&&(t=null),K(wt,"GET",this.store.name,e,t),t))}delete(e){return K(wt,"DELETE",this.store.name,e),sr(this.store.delete(e))}count(){return K(wt,"COUNT",this.store.name),sr(this.store.count())}G(e,t){const r=this.options(e,t),s=r.index?this.store.index(r.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(r.range);return new D((o,c)=>{i.onerror=u=>{c(u.target.error)},i.onsuccess=u=>{o(u.target.result)}})}{const i=this.cursor(r),o=[];return this.j(i,(c,u)=>{o.push(u)}).next(()=>o)}}H(e,t){const r=this.store.getAll(e,t===null?void 0:t);return new D((s,i)=>{r.onerror=o=>{i(o.target.error)},r.onsuccess=o=>{s(o.target.result)}})}J(e,t){K(wt,"DELETE ALL",this.store.name);const r=this.options(e,t);r.Y=!1;const s=this.cursor(r);return this.j(s,(i,o,c)=>c.delete())}Z(e,t){let r;t?r=e:(r={},t=e);const s=this.cursor(r);return this.j(s,t)}X(e){const t=this.cursor({});return new D((r,s)=>{t.onerror=i=>{const o=wu(i.target.error);s(o)},t.onsuccess=i=>{const o=i.target.result;o?e(o.primaryKey,o.value).next(c=>{c?o.continue():r()}):r()}})}j(e,t){const r=[];return new D((s,i)=>{e.onerror=o=>{i(o.target.error)},e.onsuccess=o=>{const c=o.target.result;if(!c)return void s();const u=new dT(c),d=t(c.primaryKey,c.value,u);if(d instanceof D){const f=d.catch(p=>(u.done(),D.reject(p)));r.push(f)}u.isDone?s():u.K===null?c.continue():c.continue(u.K)}}).next(()=>D.waitFor(r))}options(e,t){let r;return e!==void 0&&(typeof e=="string"?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const r=this.store.index(e.index);return e.Y?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function sr(n){return new D((e,t)=>{n.onsuccess=r=>{const s=r.target.result;e(s)},n.onerror=r=>{const s=wu(r.target.error);t(s)}})}let gf=!1;function wu(n){const e=Nn.C(Ge());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(t)>=0){const r=new W("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return gf||(gf=!0,setTimeout(()=>{throw r},0)),r}}return n}const hi="IndexBackfiller";class fT{constructor(e,t){this.asyncQueue=e,this.ee=t,this.task=null}start(){this.te(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}te(e){K(hi,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{const t=await this.ee.ne();K(hi,`Documents written: ${t}`)}catch(t){$n(t)?K(hi,"Ignoring IndexedDB error during index backfill: ",t):await Nr(t)}await this.te(6e4)})}}class pT{constructor(e,t){this.localStore=e,this.persistence=t}async ne(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.re(t,e))}re(e,t){const r=new Set;let s=t,i=!0;return D.doWhile(()=>i===!0&&s>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!r.has(o))return K(hi,`Processing collection: ${o}`),this.ie(e,o,s).next(c=>{s-=c,r.add(o)});i=!1})).next(()=>t-s)}ie(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(s=>this.localStore.localDocuments.getNextDocuments(e,t,s,r).next(i=>{const o=i.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this.se(s,i)).next(c=>(K(hi,`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c))).next(()=>o.size)}))}se(e,t){let r=e;return t.changes.forEach((s,i)=>{const o=hg(i);bu(o,r)>0&&(r=o)}),new St(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
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
 */const hr=-1;function Za(n){return n==null}function ki(n){return n===0&&1/n==-1/0}function mT(n){return typeof n=="number"&&Number.isInteger(n)&&!ki(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _a="";function st(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=_f(e)),e=gT(n.get(t),e);return _f(e)}function gT(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case _a:t+="";break;default:t+=i}}return t}function _f(n){return n+_a+""}function $t(n){const e=n.length;if(te(e>=2),e===2)return te(n.charAt(0)===_a&&n.charAt(1)===""),we.emptyPath();const t=e-2,r=[];let s="";for(let i=0;i<e;){const o=n.indexOf(_a,i);switch((o<0||o>t)&&ee(),n.charAt(o+1)){case"":const c=n.substring(i,o);let u;s.length===0?u=c:(s+=c,u=s,s=""),r.push(u);break;case"":s+=n.substring(i,o),s+="\0";break;case"":s+=n.substring(i,o+1);break;default:ee()}i=o+2}return new we(r)}/**
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
 */const tr="remoteDocuments",Wi="owner",qr="owner",Ci="mutationQueues",_T="userId",Dt="mutations",vf="batchId",cr="userMutationsIndex",yf=["userId","batchId"];/**
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
 */function Qo(n,e){return[n,st(e)]}function gg(n,e,t){return[n,st(e),t]}const vT={},hs="documentMutations",va="remoteDocumentsV14",yT=["prefixPath","collectionGroup","readTime","documentId"],Yo="documentKeyIndex",bT=["prefixPath","collectionGroup","documentId"],_g="collectionGroupIndex",wT=["collectionGroup","readTime","prefixPath","documentId"],Pi="remoteDocumentGlobal",Sl="remoteDocumentGlobalKey",fs="targets",vg="queryTargetsIndex",IT=["canonicalId","targetId"],ps="targetDocuments",ET=["targetId","path"],Iu="documentTargetsIndex",TT=["path","targetId"],ya="targetGlobalKey",fr="targetGlobal",xi="collectionParents",AT=["collectionId","parent"],ms="clientMetadata",RT="clientId",ec="bundles",ST="bundleId",tc="namedQueries",kT="name",Eu="indexConfiguration",CT="indexId",kl="collectionGroupIndex",PT="collectionGroup",ba="indexState",xT=["indexId","uid"],yg="sequenceNumberIndex",NT=["uid","sequenceNumber"],wa="indexEntries",DT=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],bg="documentKeyIndex",VT=["indexId","uid","orderedDocumentKey"],nc="documentOverlays",OT=["userId","collectionPath","documentId"],Cl="collectionPathOverlayIndex",LT=["userId","collectionPath","largestBatchId"],wg="collectionGroupOverlayIndex",MT=["userId","collectionGroup","largestBatchId"],Tu="globals",FT="name",Ig=[Ci,Dt,hs,tr,fs,Wi,fr,ps,ms,Pi,xi,ec,tc],UT=[...Ig,nc],Eg=[Ci,Dt,hs,va,fs,Wi,fr,ps,ms,Pi,xi,ec,tc,nc],Tg=Eg,Au=[...Tg,Eu,ba,wa],BT=Au,$T=[...Au,Tu];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pl extends pg{constructor(e,t){super(),this.ue=e,this.currentSequenceNumber=t}}function He(n,e){const t=de(n);return Nn.M(t.ue,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bf(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function qn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Ag(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e,t){this.comparator=e,this.root=t||Qe.EMPTY}insert(e,t){return new xe(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Qe.BLACK,null,null))}remove(e){return new xe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Qe.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Ro(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Ro(this.root,e,this.comparator,!1)}getReverseIterator(){return new Ro(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Ro(this.root,e,this.comparator,!0)}}class Ro{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Qe{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??Qe.RED,this.left=s??Qe.EMPTY,this.right=i??Qe.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new Qe(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Qe.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Qe.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Qe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Qe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw ee();const e=this.left.check();if(e!==this.right.check())throw ee();return e+(this.isRed()?0:1)}}Qe.EMPTY=null,Qe.RED=!0,Qe.BLACK=!1;Qe.EMPTY=new class{constructor(){this.size=0}get key(){throw ee()}get value(){throw ee()}get color(){throw ee()}get left(){throw ee()}get right(){throw ee()}copy(e,t,r,s,i){return this}insert(e,t,r){return new Qe(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Te{constructor(e){this.comparator=e,this.data=new xe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new wf(this.data.getIterator())}getIteratorFrom(e){return new wf(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof Te)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Te(this.comparator);return t.data=e,t}}class wf{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function jr(n){return n.hasNext()?n.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt{constructor(e){this.fields=e,e.sort(Ve.comparator)}static empty(){return new mt([])}unionWith(e){let t=new Te(Ve.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new mt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return ds(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
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
 */class Rg extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Rg("Invalid base64 string: "+i):i}}(e);return new je(t)}static fromUint8Array(e){const t=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(e);return new je(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ue(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}je.EMPTY_BYTE_STRING=new je("");const qT=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function an(n){if(te(!!n),typeof n=="string"){let e=0;const t=qT.exec(n);if(te(!!t),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Pe(n.seconds),nanos:Pe(n.nanos)}}function Pe(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function cn(n){return typeof n=="string"?je.fromBase64String(n):je.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sg="server_timestamp",kg="__type__",Cg="__previous_value__",Pg="__local_write_time__";function rc(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[kg])===null||t===void 0?void 0:t.stringValue)===Sg}function sc(n){const e=n.mapValue.fields[Cg];return rc(e)?sc(e):e}function Ni(n){const e=an(n.mapValue.fields[Pg].timestampValue);return new Oe(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jT{constructor(e,t,r,s,i,o,c,u,d){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=d}}const Ia="(default)";class yr{constructor(e,t){this.projectId=e,this.database=t||Ia}static empty(){return new yr("","")}get isDefaultDatabase(){return this.database===Ia}isEqual(e){return e instanceof yr&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ru="__type__",xg="__max__",Sn={mapValue:{fields:{__type__:{stringValue:xg}}}},Su="__vector__",gs="value",Jo={nullValue:"NULL_VALUE"};function Vn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?rc(n)?4:Ng(n)?9007199254740991:ic(n)?10:11:ee()}function Wt(n,e){if(n===e)return!0;const t=Vn(n);if(t!==Vn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Ni(n).isEqual(Ni(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=an(s.timestampValue),c=an(i.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,i){return cn(s.bytesValue).isEqual(cn(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,i){return Pe(s.geoPointValue.latitude)===Pe(i.geoPointValue.latitude)&&Pe(s.geoPointValue.longitude)===Pe(i.geoPointValue.longitude)}(n,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return Pe(s.integerValue)===Pe(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=Pe(s.doubleValue),c=Pe(i.doubleValue);return o===c?ki(o)===ki(c):isNaN(o)&&isNaN(c)}return!1}(n,e);case 9:return ds(n.arrayValue.values||[],e.arrayValue.values||[],Wt);case 10:case 11:return function(s,i){const o=s.mapValue.fields||{},c=i.mapValue.fields||{};if(bf(o)!==bf(c))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(c[u]===void 0||!Wt(o[u],c[u])))return!1;return!0}(n,e);default:return ee()}}function Di(n,e){return(n.values||[]).find(t=>Wt(t,e))!==void 0}function On(n,e){if(n===e)return 0;const t=Vn(n),r=Vn(e);if(t!==r)return ue(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return ue(n.booleanValue,e.booleanValue);case 2:return function(i,o){const c=Pe(i.integerValue||i.doubleValue),u=Pe(o.integerValue||o.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1}(n,e);case 3:return If(n.timestampValue,e.timestampValue);case 4:return If(Ni(n),Ni(e));case 5:return Al(n.stringValue,e.stringValue);case 6:return function(i,o){const c=cn(i),u=cn(o);return c.compareTo(u)}(n.bytesValue,e.bytesValue);case 7:return function(i,o){const c=i.split("/"),u=o.split("/");for(let d=0;d<c.length&&d<u.length;d++){const f=ue(c[d],u[d]);if(f!==0)return f}return ue(c.length,u.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,o){const c=ue(Pe(i.latitude),Pe(o.latitude));return c!==0?c:ue(Pe(i.longitude),Pe(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Ef(n.arrayValue,e.arrayValue);case 10:return function(i,o){var c,u,d,f;const p=i.fields||{},g=o.fields||{},b=(c=p[gs])===null||c===void 0?void 0:c.arrayValue,E=(u=g[gs])===null||u===void 0?void 0:u.arrayValue,S=ue(((d=b?.values)===null||d===void 0?void 0:d.length)||0,((f=E?.values)===null||f===void 0?void 0:f.length)||0);return S!==0?S:Ef(b,E)}(n.mapValue,e.mapValue);case 11:return function(i,o){if(i===Sn.mapValue&&o===Sn.mapValue)return 0;if(i===Sn.mapValue)return 1;if(o===Sn.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),d=o.fields||{},f=Object.keys(d);u.sort(),f.sort();for(let p=0;p<u.length&&p<f.length;++p){const g=Al(u[p],f[p]);if(g!==0)return g;const b=On(c[u[p]],d[f[p]]);if(b!==0)return b}return ue(u.length,f.length)}(n.mapValue,e.mapValue);default:throw ee()}}function If(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ue(n,e);const t=an(n),r=an(e),s=ue(t.seconds,r.seconds);return s!==0?s:ue(t.nanos,r.nanos)}function Ef(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=On(t[s],r[s]);if(i)return i}return ue(t.length,r.length)}function _s(n){return xl(n)}function xl(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=an(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return cn(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return J.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=xl(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${xl(t.fields[o])}`;return s+"}"}(n.mapValue):ee()}function Xo(n){switch(Vn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=sc(n);return e?16+Xo(e):16;case 5:return 2*n.stringValue.length;case 6:return cn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+Xo(i),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return qn(r.fields,(i,o)=>{s+=i.length+Xo(o)}),s}(n.mapValue);default:throw ee()}}function br(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Nl(n){return!!n&&"integerValue"in n}function Vi(n){return!!n&&"arrayValue"in n}function Tf(n){return!!n&&"nullValue"in n}function Af(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Zo(n){return!!n&&"mapValue"in n}function ic(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[Ru])===null||t===void 0?void 0:t.stringValue)===Su}function fi(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return qn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=fi(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=fi(n.arrayValue.values[t]);return e}return Object.assign({},n)}function Ng(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===xg}const Dg={mapValue:{fields:{[Ru]:{stringValue:Su},[gs]:{arrayValue:{}}}}};function zT(n){return"nullValue"in n?Jo:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?br(yr.empty(),J.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?ic(n)?Dg:{mapValue:{}}:ee()}function GT(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?br(yr.empty(),J.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?Dg:"mapValue"in n?ic(n)?{mapValue:{}}:Sn:ee()}function Rf(n,e){const t=On(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?-1:!n.inclusive&&e.inclusive?1:0}function Sf(n,e){const t=On(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?1:!n.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(e){this.value=e}static empty(){return new nt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Zo(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=fi(t)}setAll(e){let t=Ve.emptyPath(),r={},s=[];e.forEach((o,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=c.popLast()}o?r[c.lastSegment()]=fi(o):s.push(c.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());Zo(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Wt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Zo(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){qn(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new nt(fi(this.value))}}function Vg(n){const e=[];return qn(n.fields,(t,r)=>{const s=new Ve([t]);if(Zo(r)){const i=Vg(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new mt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Me{constructor(e,t,r,s,i,o,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(e){return new Me(e,0,ie.min(),ie.min(),ie.min(),nt.empty(),0)}static newFoundDocument(e,t,r,s){return new Me(e,1,t,ie.min(),r,s,0)}static newNoDocument(e,t){return new Me(e,2,t,ie.min(),ie.min(),nt.empty(),0)}static newUnknownDocument(e,t){return new Me(e,3,t,ie.min(),ie.min(),nt.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(ie.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=nt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=nt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ie.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Me&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Me(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Ln{constructor(e,t){this.position=e,this.inclusive=t}}function kf(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],o=n.position[s];if(i.field.isKeyField()?r=J.comparator(J.fromName(o.referenceValue),t.key):r=On(o,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Cf(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Wt(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class Oi{constructor(e,t="asc"){this.field=e,this.dir=t}}function HT(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class Og{}class _e extends Og{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new KT(e,t,r):t==="array-contains"?new YT(e,r):t==="in"?new $g(e,r):t==="not-in"?new JT(e,r):t==="array-contains-any"?new XT(e,r):new _e(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new WT(e,r):new QT(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(On(t,this.value)):t!==null&&Vn(this.value)===Vn(t)&&this.matchesComparison(On(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return ee()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ee extends Og{constructor(e,t){super(),this.filters=e,this.op=t,this.ce=null}static create(e,t){return new Ee(e,t)}matches(e){return vs(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ce!==null||(this.ce=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ce}getFilters(){return Object.assign([],this.filters)}}function vs(n){return n.op==="and"}function Dl(n){return n.op==="or"}function ku(n){return Lg(n)&&vs(n)}function Lg(n){for(const e of n.filters)if(e instanceof Ee)return!1;return!0}function Vl(n){if(n instanceof _e)return n.field.canonicalString()+n.op.toString()+_s(n.value);if(ku(n))return n.filters.map(e=>Vl(e)).join(",");{const e=n.filters.map(t=>Vl(t)).join(",");return`${n.op}(${e})`}}function Mg(n,e){return n instanceof _e?function(r,s){return s instanceof _e&&r.op===s.op&&r.field.isEqual(s.field)&&Wt(r.value,s.value)}(n,e):n instanceof Ee?function(r,s){return s instanceof Ee&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,o,c)=>i&&Mg(o,s.filters[c]),!0):!1}(n,e):void ee()}function Fg(n,e){const t=n.filters.concat(e);return Ee.create(t,n.op)}function Ug(n){return n instanceof _e?function(t){return`${t.field.canonicalString()} ${t.op} ${_s(t.value)}`}(n):n instanceof Ee?function(t){return t.op.toString()+" {"+t.getFilters().map(Ug).join(" ,")+"}"}(n):"Filter"}class KT extends _e{constructor(e,t,r){super(e,t,r),this.key=J.fromName(r.referenceValue)}matches(e){const t=J.comparator(e.key,this.key);return this.matchesComparison(t)}}class WT extends _e{constructor(e,t){super(e,"in",t),this.keys=Bg("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class QT extends _e{constructor(e,t){super(e,"not-in",t),this.keys=Bg("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Bg(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>J.fromName(r.referenceValue))}class YT extends _e{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Vi(t)&&Di(t.arrayValue,this.value)}}class $g extends _e{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Di(this.value.arrayValue,t)}}class JT extends _e{constructor(e,t){super(e,"not-in",t)}matches(e){if(Di(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!Di(this.value.arrayValue,t)}}class XT extends _e{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Vi(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Di(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZT{constructor(e,t=null,r=[],s=[],i=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.le=null}}function Ol(n,e=null,t=[],r=[],s=null,i=null,o=null){return new ZT(n,e,t,r,s,i,o)}function wr(n){const e=de(n);if(e.le===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Vl(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),Za(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>_s(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>_s(r)).join(",")),e.le=t}return e.le}function Qi(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!HT(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Mg(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Cf(n.startAt,e.startAt)&&Cf(n.endAt,e.endAt)}function Ea(n){return J.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Ta(n,e){return n.filters.filter(t=>t instanceof _e&&t.field.isEqual(e))}function Pf(n,e,t){let r=Jo,s=!0;for(const i of Ta(n,e)){let o=Jo,c=!0;switch(i.op){case"<":case"<=":o=zT(i.value);break;case"==":case"in":case">=":o=i.value;break;case">":o=i.value,c=!1;break;case"!=":case"not-in":o=Jo}Rf({value:r,inclusive:s},{value:o,inclusive:c})<0&&(r=o,s=c)}if(t!==null){for(let i=0;i<n.orderBy.length;++i)if(n.orderBy[i].field.isEqual(e)){const o=t.position[i];Rf({value:r,inclusive:s},{value:o,inclusive:t.inclusive})<0&&(r=o,s=t.inclusive);break}}return{value:r,inclusive:s}}function xf(n,e,t){let r=Sn,s=!0;for(const i of Ta(n,e)){let o=Sn,c=!0;switch(i.op){case">=":case">":o=GT(i.value),c=!1;break;case"==":case"in":case"<=":o=i.value;break;case"<":o=i.value,c=!1;break;case"!=":case"not-in":o=Sn}Sf({value:r,inclusive:s},{value:o,inclusive:c})>0&&(r=o,s=c)}if(t!==null){for(let i=0;i<n.orderBy.length;++i)if(n.orderBy[i].field.isEqual(e)){const o=t.position[i];Sf({value:r,inclusive:s},{value:o,inclusive:t.inclusive})>0&&(r=o,s=t.inclusive);break}}return{value:r,inclusive:s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dr{constructor(e,t=null,r=[],s=[],i=null,o="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=u,this.he=null,this.Pe=null,this.Te=null,this.startAt,this.endAt}}function eA(n,e,t,r,s,i,o,c){return new Dr(n,e,t,r,s,i,o,c)}function Yi(n){return new Dr(n)}function Nf(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Cu(n){return n.collectionGroup!==null}function is(n){const e=de(n);if(e.he===null){e.he=[];const t=new Set;for(const i of e.explicitOrderBy)e.he.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new Te(Ve.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.he.push(new Oi(i,r))}),t.has(Ve.keyField().canonicalString())||e.he.push(new Oi(Ve.keyField(),r))}return e.he}function xt(n){const e=de(n);return e.Pe||(e.Pe=tA(e,is(n))),e.Pe}function tA(n,e){if(n.limitType==="F")return Ol(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Oi(s.field,i)});const t=n.endAt?new Ln(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Ln(n.startAt.position,n.startAt.inclusive):null;return Ol(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Ll(n,e){const t=n.filters.concat([e]);return new Dr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Aa(n,e,t){return new Dr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function oc(n,e){return Qi(xt(n),xt(e))&&n.limitType===e.limitType}function qg(n){return`${wr(xt(n))}|lt:${n.limitType}`}function Qr(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>Ug(s)).join(", ")}]`),Za(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>_s(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>_s(s)).join(",")),`Target(${r})`}(xt(n))}; limitType=${n.limitType})`}function Ji(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):J.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of is(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(o,c,u){const d=kf(o,c,u);return o.inclusive?d<=0:d<0}(r.startAt,is(r),s)||r.endAt&&!function(o,c,u){const d=kf(o,c,u);return o.inclusive?d>=0:d>0}(r.endAt,is(r),s))}(n,e)}function nA(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function jg(n){return(e,t)=>{let r=!1;for(const s of is(n)){const i=rA(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function rA(n,e,t){const r=n.field.isKeyField()?J.comparator(e.key,t.key):function(i,o,c){const u=o.data.field(i),d=c.data.field(i);return u!==null&&d!==null?On(u,d):ee()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return ee()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){qn(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return Ag(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sA=new xe(J.comparator);function Et(){return sA}const zg=new xe(J.comparator);function oi(...n){let e=zg;for(const t of n)e=e.insert(t.key,t);return e}function Gg(n){let e=zg;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function qt(){return pi()}function Hg(){return pi()}function pi(){return new dn(n=>n.toString(),(n,e)=>n.isEqual(e))}const iA=new xe(J.comparator),oA=new Te(J.comparator);function pe(...n){let e=oA;for(const t of n)e=e.add(t);return e}const aA=new Te(ue);function cA(){return aA}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pu(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ki(e)?"-0":e}}function Kg(n){return{integerValue:""+n}}function Wg(n,e){return mT(e)?Kg(e):Pu(n,e)}/**
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
 */class ac{constructor(){this._=void 0}}function lA(n,e,t){return n instanceof Li?function(s,i){const o={fields:{[kg]:{stringValue:Sg},[Pg]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&rc(i)&&(i=sc(i)),i&&(o.fields[Cg]=i),{mapValue:o}}(t,e):n instanceof ys?Yg(n,e):n instanceof bs?Jg(n,e):function(s,i){const o=Qg(s,i),c=Df(o)+Df(s.Ie);return Nl(o)&&Nl(s.Ie)?Kg(c):Pu(s.serializer,c)}(n,e)}function uA(n,e,t){return n instanceof ys?Yg(n,e):n instanceof bs?Jg(n,e):t}function Qg(n,e){return n instanceof ws?function(r){return Nl(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class Li extends ac{}class ys extends ac{constructor(e){super(),this.elements=e}}function Yg(n,e){const t=Xg(e);for(const r of n.elements)t.some(s=>Wt(s,r))||t.push(r);return{arrayValue:{values:t}}}class bs extends ac{constructor(e){super(),this.elements=e}}function Jg(n,e){let t=Xg(e);for(const r of n.elements)t=t.filter(s=>!Wt(s,r));return{arrayValue:{values:t}}}class ws extends ac{constructor(e,t){super(),this.serializer=e,this.Ie=t}}function Df(n){return Pe(n.integerValue||n.doubleValue)}function Xg(n){return Vi(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zg{constructor(e,t){this.field=e,this.transform=t}}function dA(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof ys&&s instanceof ys||r instanceof bs&&s instanceof bs?ds(r.elements,s.elements,Wt):r instanceof ws&&s instanceof ws?Wt(r.Ie,s.Ie):r instanceof Li&&s instanceof Li}(n.transform,e.transform)}class hA{constructor(e,t){this.version=e,this.transformResults=t}}class rt{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new rt}static exists(e){return new rt(void 0,e)}static updateTime(e){return new rt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function ea(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class cc{}function e_(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new lc(n.key,rt.none()):new Vs(n.key,n.data,rt.none());{const t=n.data,r=nt.empty();let s=new Te(Ve.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new hn(n.key,r,new mt(s.toArray()),rt.none())}}function fA(n,e,t){n instanceof Vs?function(s,i,o){const c=s.value.clone(),u=Of(s.fieldTransforms,i,o.transformResults);c.setAll(u),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(n,e,t):n instanceof hn?function(s,i,o){if(!ea(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=Of(s.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(t_(s)),u.setAll(c),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(n,e,t):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function mi(n,e,t,r){return n instanceof Vs?function(i,o,c,u){if(!ea(i.precondition,o))return c;const d=i.value.clone(),f=Lf(i.fieldTransforms,u,o);return d.setAll(f),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),null}(n,e,t,r):n instanceof hn?function(i,o,c,u){if(!ea(i.precondition,o))return c;const d=Lf(i.fieldTransforms,u,o),f=o.data;return f.setAll(t_(i)),f.setAll(d),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(p=>p.field))}(n,e,t,r):function(i,o,c){return ea(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c}(n,e,t)}function pA(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=Qg(r.transform,s||null);i!=null&&(t===null&&(t=nt.empty()),t.set(r.field,i))}return t||null}function Vf(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&ds(r,s,(i,o)=>dA(i,o))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Vs extends cc{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class hn extends cc{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function t_(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function Of(n,e,t){const r=new Map;te(n.length===t.length);for(let s=0;s<t.length;s++){const i=n[s],o=i.transform,c=e.data.field(i.field);r.set(i.field,uA(o,c,t[s]))}return r}function Lf(n,e,t){const r=new Map;for(const s of n){const i=s.transform,o=t.data.field(s.field);r.set(s.field,lA(i,o,e))}return r}class lc extends cc{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class n_ extends cc{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xu{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&fA(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=mi(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=mi(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Hg();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=t.has(s.key)?null:c;const u=e_(o,c);u!==null&&r.set(s.key,u),o.isValidDocument()||o.convertToNoDocument(ie.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),pe())}isEqual(e){return this.batchId===e.batchId&&ds(this.mutations,e.mutations,(t,r)=>Vf(t,r))&&ds(this.baseMutations,e.baseMutations,(t,r)=>Vf(t,r))}}class Nu{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){te(e.mutations.length===r.length);let s=function(){return iA}();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new Nu(e,t,r,s)}}/**
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
 */class Du{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class mA{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var qe,ve;function gA(n){switch(n){case B.OK:return ee();case B.CANCELLED:case B.UNKNOWN:case B.DEADLINE_EXCEEDED:case B.RESOURCE_EXHAUSTED:case B.INTERNAL:case B.UNAVAILABLE:case B.UNAUTHENTICATED:return!1;case B.INVALID_ARGUMENT:case B.NOT_FOUND:case B.ALREADY_EXISTS:case B.PERMISSION_DENIED:case B.FAILED_PRECONDITION:case B.ABORTED:case B.OUT_OF_RANGE:case B.UNIMPLEMENTED:case B.DATA_LOSS:return!0;default:return ee()}}function r_(n){if(n===void 0)return ft("GRPC error has no .code"),B.UNKNOWN;switch(n){case qe.OK:return B.OK;case qe.CANCELLED:return B.CANCELLED;case qe.UNKNOWN:return B.UNKNOWN;case qe.DEADLINE_EXCEEDED:return B.DEADLINE_EXCEEDED;case qe.RESOURCE_EXHAUSTED:return B.RESOURCE_EXHAUSTED;case qe.INTERNAL:return B.INTERNAL;case qe.UNAVAILABLE:return B.UNAVAILABLE;case qe.UNAUTHENTICATED:return B.UNAUTHENTICATED;case qe.INVALID_ARGUMENT:return B.INVALID_ARGUMENT;case qe.NOT_FOUND:return B.NOT_FOUND;case qe.ALREADY_EXISTS:return B.ALREADY_EXISTS;case qe.PERMISSION_DENIED:return B.PERMISSION_DENIED;case qe.FAILED_PRECONDITION:return B.FAILED_PRECONDITION;case qe.ABORTED:return B.ABORTED;case qe.OUT_OF_RANGE:return B.OUT_OF_RANGE;case qe.UNIMPLEMENTED:return B.UNIMPLEMENTED;case qe.DATA_LOSS:return B.DATA_LOSS;default:return ee()}}(ve=qe||(qe={}))[ve.OK=0]="OK",ve[ve.CANCELLED=1]="CANCELLED",ve[ve.UNKNOWN=2]="UNKNOWN",ve[ve.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ve[ve.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ve[ve.NOT_FOUND=5]="NOT_FOUND",ve[ve.ALREADY_EXISTS=6]="ALREADY_EXISTS",ve[ve.PERMISSION_DENIED=7]="PERMISSION_DENIED",ve[ve.UNAUTHENTICATED=16]="UNAUTHENTICATED",ve[ve.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ve[ve.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ve[ve.ABORTED=10]="ABORTED",ve[ve.OUT_OF_RANGE=11]="OUT_OF_RANGE",ve[ve.UNIMPLEMENTED=12]="UNIMPLEMENTED",ve[ve.INTERNAL=13]="INTERNAL",ve[ve.UNAVAILABLE=14]="UNAVAILABLE",ve[ve.DATA_LOSS=15]="DATA_LOSS";/**
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
 */const _A=new xn([4294967295,4294967295],0);function Mf(n){const e=Tl().encode(n),t=new sg;return t.update(e),new Uint8Array(t.digest())}function Ff(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new xn([t,r],0),new xn([s,i],0)]}class Vu{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new ai(`Invalid padding: ${t}`);if(r<0)throw new ai(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new ai(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new ai(`Invalid padding when bitmap length is 0: ${t}`);this.Ee=8*e.length-t,this.de=xn.fromNumber(this.Ee)}Ae(e,t,r){let s=e.add(t.multiply(xn.fromNumber(r)));return s.compare(_A)===1&&(s=new xn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.de).toNumber()}Re(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.Ee===0)return!1;const t=Mf(e),[r,s]=Ff(t);for(let i=0;i<this.hashCount;i++){const o=this.Ae(r,s,i);if(!this.Re(o))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new Vu(i,s,t);return r.forEach(c=>o.insert(c)),o}insert(e){if(this.Ee===0)return;const t=Mf(e),[r,s]=Ff(t);for(let i=0;i<this.hashCount;i++){const o=this.Ae(r,s,i);this.Ve(o)}}Ve(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class ai extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uc{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,Xi.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new uc(ie.min(),s,new xe(ue),Et(),pe())}}class Xi{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Xi(r,t,pe(),pe(),pe())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ta{constructor(e,t,r,s){this.me=e,this.removedTargetIds=t,this.key=r,this.fe=s}}class s_{constructor(e,t){this.targetId=e,this.ge=t}}class i_{constructor(e,t,r=je.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class Uf{constructor(){this.pe=0,this.ye=Bf(),this.we=je.EMPTY_BYTE_STRING,this.Se=!1,this.be=!0}get current(){return this.Se}get resumeToken(){return this.we}get De(){return this.pe!==0}get ve(){return this.be}Ce(e){e.approximateByteSize()>0&&(this.be=!0,this.we=e)}Fe(){let e=pe(),t=pe(),r=pe();return this.ye.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:ee()}}),new Xi(this.we,this.Se,e,t,r)}Me(){this.be=!1,this.ye=Bf()}xe(e,t){this.be=!0,this.ye=this.ye.insert(e,t)}Oe(e){this.be=!0,this.ye=this.ye.remove(e)}Ne(){this.pe+=1}Be(){this.pe-=1,te(this.pe>=0)}Le(){this.be=!0,this.Se=!0}}class vA{constructor(e){this.ke=e,this.qe=new Map,this.Qe=Et(),this.$e=So(),this.Ue=So(),this.Ke=new xe(ue)}We(e){for(const t of e.me)e.fe&&e.fe.isFoundDocument()?this.Ge(t,e.fe):this.ze(t,e.key,e.fe);for(const t of e.removedTargetIds)this.ze(t,e.key,e.fe)}je(e){this.forEachTarget(e,t=>{const r=this.He(t);switch(e.state){case 0:this.Je(t)&&r.Ce(e.resumeToken);break;case 1:r.Be(),r.De||r.Me(),r.Ce(e.resumeToken);break;case 2:r.Be(),r.De||this.removeTarget(t);break;case 3:this.Je(t)&&(r.Le(),r.Ce(e.resumeToken));break;case 4:this.Je(t)&&(this.Ye(t),r.Ce(e.resumeToken));break;default:ee()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.qe.forEach((r,s)=>{this.Je(s)&&t(s)})}Ze(e){const t=e.targetId,r=e.ge.count,s=this.Xe(t);if(s){const i=s.target;if(Ea(i))if(r===0){const o=new J(i.path);this.ze(t,o,Me.newNoDocument(o,ie.min()))}else te(r===1);else{const o=this.et(t);if(o!==r){const c=this.tt(e),u=c?this.nt(c,e,o):1;if(u!==0){this.Ye(t);const d=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ke=this.Ke.insert(t,d)}}}}}tt(e){const t=e.ge.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let o,c;try{o=cn(r).toUint8Array()}catch(u){if(u instanceof Rg)return Ai("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new Vu(o,s,i)}catch(u){return Ai(u instanceof ai?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.Ee===0?null:c}nt(e,t,r){return t.ge.count===r-this.st(e,t.targetId)?0:2}st(e,t){const r=this.ke.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const o=this.ke.it(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.ze(t,i,null),s++)}),s}ot(e){const t=new Map;this.qe.forEach((i,o)=>{const c=this.Xe(o);if(c){if(i.current&&Ea(c.target)){const u=new J(c.target.path);this._t(u).has(o)||this.ut(o,u)||this.ze(o,u,Me.newNoDocument(u,e))}i.ve&&(t.set(o,i.Fe()),i.Me())}});let r=pe();this.Ue.forEach((i,o)=>{let c=!0;o.forEachWhile(u=>{const d=this.Xe(u);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(i))}),this.Qe.forEach((i,o)=>o.setReadTime(e));const s=new uc(e,t,this.Ke,this.Qe,r);return this.Qe=Et(),this.$e=So(),this.Ue=So(),this.Ke=new xe(ue),s}Ge(e,t){if(!this.Je(e))return;const r=this.ut(e,t.key)?2:0;this.He(e).xe(t.key,r),this.Qe=this.Qe.insert(t.key,t),this.$e=this.$e.insert(t.key,this._t(t.key).add(e)),this.Ue=this.Ue.insert(t.key,this.ct(t.key).add(e))}ze(e,t,r){if(!this.Je(e))return;const s=this.He(e);this.ut(e,t)?s.xe(t,1):s.Oe(t),this.Ue=this.Ue.insert(t,this.ct(t).delete(e)),this.Ue=this.Ue.insert(t,this.ct(t).add(e)),r&&(this.Qe=this.Qe.insert(t,r))}removeTarget(e){this.qe.delete(e)}et(e){const t=this.He(e).Fe();return this.ke.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ne(e){this.He(e).Ne()}He(e){let t=this.qe.get(e);return t||(t=new Uf,this.qe.set(e,t)),t}ct(e){let t=this.Ue.get(e);return t||(t=new Te(ue),this.Ue=this.Ue.insert(e,t)),t}_t(e){let t=this.$e.get(e);return t||(t=new Te(ue),this.$e=this.$e.insert(e,t)),t}Je(e){const t=this.Xe(e)!==null;return t||K("WatchChangeAggregator","Detected inactive target",e),t}Xe(e){const t=this.qe.get(e);return t&&t.De?null:this.ke.lt(e)}Ye(e){this.qe.set(e,new Uf),this.ke.getRemoteKeysForTarget(e).forEach(t=>{this.ze(e,t,null)})}ut(e,t){return this.ke.getRemoteKeysForTarget(e).has(t)}}function So(){return new xe(J.comparator)}function Bf(){return new xe(J.comparator)}const yA={asc:"ASCENDING",desc:"DESCENDING"},bA={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},wA={and:"AND",or:"OR"};class IA{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Ml(n,e){return n.useProto3Json||Za(e)?e:{value:e}}function Is(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function o_(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function EA(n,e){return Is(n,e.toTimestamp())}function pt(n){return te(!!n),ie.fromTimestamp(function(t){const r=an(t);return new Oe(r.seconds,r.nanos)}(n))}function Ou(n,e){return Fl(n,e).canonicalString()}function Fl(n,e){const t=function(s){return new we(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function a_(n){const e=we.fromString(n);return te(g_(e)),e}function Ra(n,e){return Ou(n.databaseId,e.path)}function pr(n,e){const t=a_(e);if(t.get(1)!==n.databaseId.projectId)throw new W(B.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new W(B.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new J(u_(t))}function c_(n,e){return Ou(n.databaseId,e)}function l_(n){const e=a_(n);return e.length===4?we.emptyPath():u_(e)}function Ul(n){return new we(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function u_(n){return te(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function $f(n,e,t){return{name:Ra(n,e),fields:t.value.mapValue.fields}}function TA(n,e,t){const r=pr(n,e.name),s=pt(e.updateTime),i=e.createTime?pt(e.createTime):ie.min(),o=new nt({mapValue:{fields:e.fields}}),c=Me.newFoundDocument(r,s,i,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function AA(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:ee()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(d,f){return d.useProto3Json?(te(f===void 0||typeof f=="string"),je.fromBase64String(f||"")):(te(f===void 0||f instanceof Buffer||f instanceof Uint8Array),je.fromUint8Array(f||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&function(d){const f=d.code===void 0?B.UNKNOWN:r_(d.code);return new W(f,d.message||"")}(o);t=new i_(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=pr(n,r.document.name),i=pt(r.document.updateTime),o=r.document.createTime?pt(r.document.createTime):ie.min(),c=new nt({mapValue:{fields:r.document.fields}}),u=Me.newFoundDocument(s,i,o,c),d=r.targetIds||[],f=r.removedTargetIds||[];t=new ta(d,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=pr(n,r.document),i=r.readTime?pt(r.readTime):ie.min(),o=Me.newNoDocument(s,i),c=r.removedTargetIds||[];t=new ta([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=pr(n,r.document),i=r.removedTargetIds||[];t=new ta([],i,s,null)}else{if(!("filter"in e))return ee();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new mA(s,i),c=r.targetId;t=new s_(c,o)}}return t}function Sa(n,e){let t;if(e instanceof Vs)t={update:$f(n,e.key,e.value)};else if(e instanceof lc)t={delete:Ra(n,e.key)};else if(e instanceof hn)t={update:$f(n,e.key,e.data),updateMask:xA(e.fieldMask)};else{if(!(e instanceof n_))return ee();t={verify:Ra(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,o){const c=o.transform;if(c instanceof Li)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof ys)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof bs)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof ws)return{fieldPath:o.field.canonicalString(),increment:c.Ie};throw ee()}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:EA(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:ee()}(n,e.precondition)),t}function Bl(n,e){const t=e.currentDocument?function(i){return i.updateTime!==void 0?rt.updateTime(pt(i.updateTime)):i.exists!==void 0?rt.exists(i.exists):rt.none()}(e.currentDocument):rt.none(),r=e.updateTransforms?e.updateTransforms.map(s=>function(o,c){let u=null;if("setToServerValue"in c)te(c.setToServerValue==="REQUEST_TIME"),u=new Li;else if("appendMissingElements"in c){const f=c.appendMissingElements.values||[];u=new ys(f)}else if("removeAllFromArray"in c){const f=c.removeAllFromArray.values||[];u=new bs(f)}else"increment"in c?u=new ws(o,c.increment):ee();const d=Ve.fromServerFormat(c.fieldPath);return new Zg(d,u)}(n,s)):[];if(e.update){e.update.name;const s=pr(n,e.update.name),i=new nt({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(u){const d=u.fieldPaths||[];return new mt(d.map(f=>Ve.fromServerFormat(f)))}(e.updateMask);return new hn(s,i,o,t,r)}return new Vs(s,i,t,r)}if(e.delete){const s=pr(n,e.delete);return new lc(s,t)}if(e.verify){const s=pr(n,e.verify);return new n_(s,t)}return ee()}function RA(n,e){return n&&n.length>0?(te(e!==void 0),n.map(t=>function(s,i){let o=s.updateTime?pt(s.updateTime):pt(i);return o.isEqual(ie.min())&&(o=pt(i)),new hA(o,s.transformResults||[])}(t,e))):[]}function d_(n,e){return{documents:[c_(n,e.path)]}}function h_(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=c_(n,s);const i=function(d){if(d.length!==0)return m_(Ee.create(d,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const o=function(d){if(d.length!==0)return d.map(f=>function(g){return{field:Yr(g.field),direction:kA(g.dir)}}(f))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=Ml(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{ht:t,parent:s}}function f_(n){let e=l_(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){te(r===1);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=function(p){const g=p_(p);return g instanceof Ee&&ku(g)?g.getFilters():[g]}(t.where));let o=[];t.orderBy&&(o=function(p){return p.map(g=>function(E){return new Oi(Jr(E.field),function(A){switch(A){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(E.direction))}(g))}(t.orderBy));let c=null;t.limit&&(c=function(p){let g;return g=typeof p=="object"?p.value:p,Za(g)?null:g}(t.limit));let u=null;t.startAt&&(u=function(p){const g=!!p.before,b=p.values||[];return new Ln(b,g)}(t.startAt));let d=null;return t.endAt&&(d=function(p){const g=!p.before,b=p.values||[];return new Ln(b,g)}(t.endAt)),eA(e,s,o,i,c,"F",u,d)}function SA(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return ee()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function p_(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Jr(t.unaryFilter.field);return _e.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Jr(t.unaryFilter.field);return _e.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Jr(t.unaryFilter.field);return _e.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Jr(t.unaryFilter.field);return _e.create(o,"!=",{nullValue:"NULL_VALUE"});default:return ee()}}(n):n.fieldFilter!==void 0?function(t){return _e.create(Jr(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return ee()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Ee.create(t.compositeFilter.filters.map(r=>p_(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return ee()}}(t.compositeFilter.op))}(n):ee()}function kA(n){return yA[n]}function CA(n){return bA[n]}function PA(n){return wA[n]}function Yr(n){return{fieldPath:n.canonicalString()}}function Jr(n){return Ve.fromServerFormat(n.fieldPath)}function m_(n){return n instanceof _e?function(t){if(t.op==="=="){if(Af(t.value))return{unaryFilter:{field:Yr(t.field),op:"IS_NAN"}};if(Tf(t.value))return{unaryFilter:{field:Yr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Af(t.value))return{unaryFilter:{field:Yr(t.field),op:"IS_NOT_NAN"}};if(Tf(t.value))return{unaryFilter:{field:Yr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Yr(t.field),op:CA(t.op),value:t.value}}}(n):n instanceof Ee?function(t){const r=t.getFilters().map(s=>m_(s));return r.length===1?r[0]:{compositeFilter:{op:PA(t.op),filters:r}}}(n):ee()}function xA(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function g_(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn{constructor(e,t,r,s,i=ie.min(),o=ie.min(),c=je.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new rn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new rn(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new rn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new rn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class __{constructor(e){this.Tt=e}}function NA(n,e){let t;if(e.document)t=TA(n.Tt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const r=J.fromSegments(e.noDocument.path),s=Er(e.noDocument.readTime);t=Me.newNoDocument(r,s),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return ee();{const r=J.fromSegments(e.unknownDocument.path),s=Er(e.unknownDocument.version);t=Me.newUnknownDocument(r,s)}}return e.readTime&&t.setReadTime(function(s){const i=new Oe(s[0],s[1]);return ie.fromTimestamp(i)}(e.readTime)),t}function qf(n,e){const t=e.key,r={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:ka(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=function(i,o){return{name:Ra(i,o.key),fields:o.data.value.mapValue.fields,updateTime:Is(i,o.version.toTimestamp()),createTime:Is(i,o.createTime.toTimestamp())}}(n.Tt,e);else if(e.isNoDocument())r.noDocument={path:t.path.toArray(),readTime:Ir(e.version)};else{if(!e.isUnknownDocument())return ee();r.unknownDocument={path:t.path.toArray(),version:Ir(e.version)}}return r}function ka(n){const e=n.toTimestamp();return[e.seconds,e.nanoseconds]}function Ir(n){const e=n.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function Er(n){const e=new Oe(n.seconds,n.nanoseconds);return ie.fromTimestamp(e)}function ir(n,e){const t=(e.baseMutations||[]).map(i=>Bl(n.Tt,i));for(let i=0;i<e.mutations.length-1;++i){const o=e.mutations[i];if(i+1<e.mutations.length&&e.mutations[i+1].transform!==void 0){const c=e.mutations[i+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(i+1,1),++i}}const r=e.mutations.map(i=>Bl(n.Tt,i)),s=Oe.fromMillis(e.localWriteTimeMs);return new xu(e.batchId,s,t,r)}function ci(n){const e=Er(n.readTime),t=n.lastLimboFreeSnapshotVersion!==void 0?Er(n.lastLimboFreeSnapshotVersion):ie.min();let r;return r=function(i){return i.documents!==void 0}(n.query)?function(i){return te(i.documents.length===1),xt(Yi(l_(i.documents[0])))}(n.query):function(i){return xt(f_(i))}(n.query),new rn(r,n.targetId,"TargetPurposeListen",n.lastListenSequenceNumber,e,t,je.fromBase64String(n.resumeToken))}function v_(n,e){const t=Ir(e.snapshotVersion),r=Ir(e.lastLimboFreeSnapshotVersion);let s;s=Ea(e.target)?d_(n.Tt,e.target):h_(n.Tt,e.target).ht;const i=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:wr(e.target),readTime:t,resumeToken:i,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:s}}function y_(n){const e=f_({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Aa(e,e.limit,"L"):e}function el(n,e){return new Du(e.largestBatchId,Bl(n.Tt,e.overlayMutation))}function jf(n,e){const t=e.path.lastSegment();return[n,st(e.path.popLast()),t]}function zf(n,e,t,r){return{indexId:n,uid:e,sequenceNumber:t,readTime:Ir(r.readTime),documentKey:st(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DA{getBundleMetadata(e,t){return Gf(e).get(t).next(r=>{if(r)return function(i){return{id:i.bundleId,createTime:Er(i.createTime),version:i.version}}(r)})}saveBundleMetadata(e,t){return Gf(e).put(function(s){return{bundleId:s.id,createTime:Ir(pt(s.createTime)),version:s.version}}(t))}getNamedQuery(e,t){return Hf(e).get(t).next(r=>{if(r)return function(i){return{name:i.name,query:y_(i.bundledQuery),readTime:Er(i.readTime)}}(r)})}saveNamedQuery(e,t){return Hf(e).put(function(s){return{name:s.name,readTime:Ir(pt(s.readTime)),bundledQuery:s.bundledQuery}}(t))}}function Gf(n){return He(n,ec)}function Hf(n){return He(n,tc)}/**
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
 */class dc{constructor(e,t){this.serializer=e,this.userId=t}static It(e,t){const r=t.uid||"";return new dc(e,r)}getOverlay(e,t){return Ys(e).get(jf(this.userId,t)).next(r=>r?el(this.serializer,r):null)}getOverlays(e,t){const r=qt();return D.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){const s=[];return r.forEach((i,o)=>{const c=new Du(t,o);s.push(this.Et(e,c))}),D.waitFor(s)}removeOverlaysForBatchId(e,t,r){const s=new Set;t.forEach(o=>s.add(st(o.getCollectionPath())));const i=[];return s.forEach(o=>{const c=IDBKeyRange.bound([this.userId,o,r],[this.userId,o,r+1],!1,!0);i.push(Ys(e).J(Cl,c))}),D.waitFor(i)}getOverlaysForCollection(e,t,r){const s=qt(),i=st(t),o=IDBKeyRange.bound([this.userId,i,r],[this.userId,i,Number.POSITIVE_INFINITY],!0);return Ys(e).G(Cl,o).next(c=>{for(const u of c){const d=el(this.serializer,u);s.set(d.getKey(),d)}return s})}getOverlaysForCollectionGroup(e,t,r,s){const i=qt();let o;const c=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Ys(e).Z({index:wg,range:c},(u,d,f)=>{const p=el(this.serializer,d);i.size()<s||p.largestBatchId===o?(i.set(p.getKey(),p),o=p.largestBatchId):f.done()}).next(()=>i)}Et(e,t){return Ys(e).put(function(s,i,o){const[c,u,d]=jf(i,o.mutation.key);return{userId:i,collectionPath:u,documentId:d,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:Sa(s.Tt,o.mutation)}}(this.serializer,this.userId,t))}}function Ys(n){return He(n,nc)}/**
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
 */class VA{dt(e){return He(e,Tu)}getSessionToken(e){return this.dt(e).get("sessionToken").next(t=>{const r=t?.value;return r?je.fromUint8Array(r):je.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.dt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
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
 */class or{constructor(){}At(e,t){this.Rt(e,t),t.Vt()}Rt(e,t){if("nullValue"in e)this.ft(t,5);else if("booleanValue"in e)this.ft(t,10),t.gt(e.booleanValue?1:0);else if("integerValue"in e)this.ft(t,15),t.gt(Pe(e.integerValue));else if("doubleValue"in e){const r=Pe(e.doubleValue);isNaN(r)?this.ft(t,13):(this.ft(t,15),ki(r)?t.gt(0):t.gt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.ft(t,20),typeof r=="string"&&(r=an(r)),t.yt(`${r.seconds||""}`),t.gt(r.nanos||0)}else if("stringValue"in e)this.wt(e.stringValue,t),this.St(t);else if("bytesValue"in e)this.ft(t,30),t.bt(cn(e.bytesValue)),this.St(t);else if("referenceValue"in e)this.Dt(e.referenceValue,t);else if("geoPointValue"in e){const r=e.geoPointValue;this.ft(t,45),t.gt(r.latitude||0),t.gt(r.longitude||0)}else"mapValue"in e?Ng(e)?this.ft(t,Number.MAX_SAFE_INTEGER):ic(e)?this.vt(e.mapValue,t):(this.Ct(e.mapValue,t),this.St(t)):"arrayValue"in e?(this.Ft(e.arrayValue,t),this.St(t)):ee()}wt(e,t){this.ft(t,25),this.Mt(e,t)}Mt(e,t){t.yt(e)}Ct(e,t){const r=e.fields||{};this.ft(t,55);for(const s of Object.keys(r))this.wt(s,t),this.Rt(r[s],t)}vt(e,t){var r,s;const i=e.fields||{};this.ft(t,53);const o=gs,c=((s=(r=i[o].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.length)||0;this.ft(t,15),t.gt(Pe(c)),this.wt(o,t),this.Rt(i[o],t)}Ft(e,t){const r=e.values||[];this.ft(t,50);for(const s of r)this.Rt(s,t)}Dt(e,t){this.ft(t,37),J.fromName(e).path.forEach(r=>{this.ft(t,60),this.Mt(r,t)})}ft(e,t){e.gt(t)}St(e){e.gt(2)}}or.xt=new or;/**
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
 */const zr=255;function OA(n){if(n===0)return 8;let e=0;return n>>4||(e+=4,n<<=4),n>>6||(e+=2,n<<=2),n>>7||(e+=1),e}function Kf(n){const e=64-function(r){let s=0;for(let i=0;i<8;++i){const o=OA(255&r[i]);if(s+=o,o!==8)break}return s}(n);return Math.ceil(e/8)}class LA{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ot(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Nt(r.value),r=t.next();this.Bt()}Lt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.kt(r.value),r=t.next();this.qt()}Qt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Nt(r);else if(r<2048)this.Nt(960|r>>>6),this.Nt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Nt(480|r>>>12),this.Nt(128|63&r>>>6),this.Nt(128|63&r);else{const s=t.codePointAt(0);this.Nt(240|s>>>18),this.Nt(128|63&s>>>12),this.Nt(128|63&s>>>6),this.Nt(128|63&s)}}this.Bt()}$t(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.kt(r);else if(r<2048)this.kt(960|r>>>6),this.kt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.kt(480|r>>>12),this.kt(128|63&r>>>6),this.kt(128|63&r);else{const s=t.codePointAt(0);this.kt(240|s>>>18),this.kt(128|63&s>>>12),this.kt(128|63&s>>>6),this.kt(128|63&s)}}this.qt()}Ut(e){const t=this.Kt(e),r=Kf(t);this.Wt(1+r),this.buffer[this.position++]=255&r;for(let s=t.length-r;s<t.length;++s)this.buffer[this.position++]=255&t[s]}Gt(e){const t=this.Kt(e),r=Kf(t);this.Wt(1+r),this.buffer[this.position++]=~(255&r);for(let s=t.length-r;s<t.length;++s)this.buffer[this.position++]=~(255&t[s])}zt(){this.jt(zr),this.jt(255)}Ht(){this.Jt(zr),this.Jt(255)}reset(){this.position=0}seed(e){this.Wt(e.length),this.buffer.set(e,this.position),this.position+=e.length}Yt(){return this.buffer.slice(0,this.position)}Kt(e){const t=function(i){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,i,!1),new Uint8Array(o.buffer)}(e),r=!!(128&t[0]);t[0]^=r?255:128;for(let s=1;s<t.length;++s)t[s]^=r?255:0;return t}Nt(e){const t=255&e;t===0?(this.jt(0),this.jt(255)):t===zr?(this.jt(zr),this.jt(0)):this.jt(t)}kt(e){const t=255&e;t===0?(this.Jt(0),this.Jt(255)):t===zr?(this.Jt(zr),this.Jt(0)):this.Jt(e)}Bt(){this.jt(0),this.jt(1)}qt(){this.Jt(0),this.Jt(1)}jt(e){this.Wt(1),this.buffer[this.position++]=e}Jt(e){this.Wt(1),this.buffer[this.position++]=~e}Wt(e){const t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);const s=new Uint8Array(r);s.set(this.buffer),this.buffer=s}}class MA{constructor(e){this.Zt=e}bt(e){this.Zt.Ot(e)}yt(e){this.Zt.Qt(e)}gt(e){this.Zt.Ut(e)}Vt(){this.Zt.zt()}}class FA{constructor(e){this.Zt=e}bt(e){this.Zt.Lt(e)}yt(e){this.Zt.$t(e)}gt(e){this.Zt.Gt(e)}Vt(){this.Zt.Ht()}}class Js{constructor(){this.Zt=new LA,this.Xt=new MA(this.Zt),this.en=new FA(this.Zt)}seed(e){this.Zt.seed(e)}tn(e){return e===0?this.Xt:this.en}Yt(){return this.Zt.Yt()}reset(){this.Zt.reset()}}/**
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
 */class ar{constructor(e,t,r,s){this.indexId=e,this.documentKey=t,this.arrayValue=r,this.directionalValue=s}nn(){const e=this.directionalValue.length,t=e===0||this.directionalValue[e-1]===255?e+1:e,r=new Uint8Array(t);return r.set(this.directionalValue,0),t!==e?r.set([0],this.directionalValue.length):++r[r.length-1],new ar(this.indexId,this.documentKey,this.arrayValue,r)}}function _n(n,e){let t=n.indexId-e.indexId;return t!==0?t:(t=Wf(n.arrayValue,e.arrayValue),t!==0?t:(t=Wf(n.directionalValue,e.directionalValue),t!==0?t:J.comparator(n.documentKey,e.documentKey)))}function Wf(n,e){for(let t=0;t<n.length&&t<e.length;++t){const r=n[t]-e[t];if(r!==0)return r}return n.length-e.length}/**
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
 */class Qf{constructor(e){this.rn=new Te((t,r)=>Ve.comparator(t.field,r.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.sn=e.orderBy,this._n=[];for(const t of e.filters){const r=t;r.isInequality()?this.rn=this.rn.add(r):this._n.push(r)}}get an(){return this.rn.size>1}un(e){if(te(e.collectionGroup===this.collectionId),this.an)return!1;const t=Rl(e);if(t!==void 0&&!this.cn(t))return!1;const r=er(e);let s=new Set,i=0,o=0;for(;i<r.length&&this.cn(r[i]);++i)s=s.add(r[i].fieldPath.canonicalString());if(i===r.length)return!0;if(this.rn.size>0){const c=this.rn.getIterator().getNext();if(!s.has(c.field.canonicalString())){const u=r[i];if(!this.ln(c,u)||!this.hn(this.sn[o++],u))return!1}++i}for(;i<r.length;++i){const c=r[i];if(o>=this.sn.length||!this.hn(this.sn[o++],c))return!1}return!0}Pn(){if(this.an)return null;let e=new Te(Ve.comparator);const t=[];for(const r of this._n)if(!r.field.isKeyField())if(r.op==="array-contains"||r.op==="array-contains-any")t.push(new Wo(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),t.push(new Wo(r.field,0))}for(const r of this.sn)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),t.push(new Wo(r.field,r.dir==="asc"?0:1)));return new ga(ga.UNKNOWN_ID,this.collectionId,t,Si.empty())}cn(e){for(const t of this._n)if(this.ln(t,e))return!0;return!1}ln(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const r=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===r}hn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
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
 */function b_(n){var e,t;if(te(n instanceof _e||n instanceof Ee),n instanceof _e){if(n instanceof $g){const s=((t=(e=n.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map(i=>_e.create(n.field,"==",i)))||[];return Ee.create(s,"or")}return n}const r=n.filters.map(s=>b_(s));return Ee.create(r,n.op)}function UA(n){if(n.getFilters().length===0)return[];const e=jl(b_(n));return te(w_(e)),$l(e)||ql(e)?[e]:e.getFilters()}function $l(n){return n instanceof _e}function ql(n){return n instanceof Ee&&ku(n)}function w_(n){return $l(n)||ql(n)||function(t){if(t instanceof Ee&&Dl(t)){for(const r of t.getFilters())if(!$l(r)&&!ql(r))return!1;return!0}return!1}(n)}function jl(n){if(te(n instanceof _e||n instanceof Ee),n instanceof _e)return n;if(n.filters.length===1)return jl(n.filters[0]);const e=n.filters.map(r=>jl(r));let t=Ee.create(e,n.op);return t=Ca(t),w_(t)?t:(te(t instanceof Ee),te(vs(t)),te(t.filters.length>1),t.filters.reduce((r,s)=>Lu(r,s)))}function Lu(n,e){let t;return te(n instanceof _e||n instanceof Ee),te(e instanceof _e||e instanceof Ee),t=n instanceof _e?e instanceof _e?function(s,i){return Ee.create([s,i],"and")}(n,e):Yf(n,e):e instanceof _e?Yf(e,n):function(s,i){if(te(s.filters.length>0&&i.filters.length>0),vs(s)&&vs(i))return Fg(s,i.getFilters());const o=Dl(s)?s:i,c=Dl(s)?i:s,u=o.filters.map(d=>Lu(d,c));return Ee.create(u,"or")}(n,e),Ca(t)}function Yf(n,e){if(vs(e))return Fg(e,n.getFilters());{const t=e.filters.map(r=>Lu(n,r));return Ee.create(t,"or")}}function Ca(n){if(te(n instanceof _e||n instanceof Ee),n instanceof _e)return n;const e=n.getFilters();if(e.length===1)return Ca(e[0]);if(Lg(n))return n;const t=e.map(s=>Ca(s)),r=[];return t.forEach(s=>{s instanceof _e?r.push(s):s instanceof Ee&&(s.op===n.op?r.push(...s.filters):r.push(s))}),r.length===1?r[0]:Ee.create(r,n.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BA{constructor(){this.Tn=new Mu}addToCollectionParentIndex(e,t){return this.Tn.add(t),D.resolve()}getCollectionParents(e,t){return D.resolve(this.Tn.getEntries(t))}addFieldIndex(e,t){return D.resolve()}deleteFieldIndex(e,t){return D.resolve()}deleteAllFieldIndexes(e){return D.resolve()}createTargetIndexes(e,t){return D.resolve()}getDocumentsMatchingTarget(e,t){return D.resolve(null)}getIndexType(e,t){return D.resolve(0)}getFieldIndexes(e,t){return D.resolve([])}getNextCollectionGroupToUpdate(e){return D.resolve(null)}getMinOffset(e,t){return D.resolve(St.min())}getMinOffsetFromCollectionGroup(e,t){return D.resolve(St.min())}updateCollectionGroup(e,t,r){return D.resolve()}updateIndexEntries(e,t){return D.resolve()}}class Mu{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new Te(we.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Te(we.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jf="IndexedDbIndexManager",ko=new Uint8Array(0);class $A{constructor(e,t){this.databaseId=t,this.In=new Mu,this.En=new dn(r=>wr(r),(r,s)=>Qi(r,s)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.In.has(t)){const r=t.lastSegment(),s=t.popLast();e.addOnCommittedListener(()=>{this.In.add(t)});const i={collectionId:r,parent:st(s)};return Xf(e).put(i)}return D.resolve()}getCollectionParents(e,t){const r=[],s=IDBKeyRange.bound([t,""],[dg(t),""],!1,!0);return Xf(e).G(s).next(i=>{for(const o of i){if(o.collectionId!==t)break;r.push($t(o.parent))}return r})}addFieldIndex(e,t){const r=Xs(e),s=function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map(u=>[u.fieldPath.canonicalString(),u.kind])}}(t);delete s.indexId;const i=r.add(s);if(t.indexState){const o=Hr(e);return i.next(c=>{o.put(zf(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return i.next()}deleteFieldIndex(e,t){const r=Xs(e),s=Hr(e),i=Gr(e);return r.delete(t.indexId).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=Xs(e),r=Gr(e),s=Hr(e);return t.J().next(()=>r.J()).next(()=>s.J())}createTargetIndexes(e,t){return D.forEach(this.dn(t),r=>this.getIndexType(e,r).next(s=>{if(s===0||s===1){const i=new Qf(r).Pn();if(i!=null)return this.addFieldIndex(e,i)}}))}getDocumentsMatchingTarget(e,t){const r=Gr(e);let s=!0;const i=new Map;return D.forEach(this.dn(t),o=>this.An(e,o).next(c=>{s&&(s=!!c),i.set(o,c)})).next(()=>{if(s){let o=pe();const c=[];return D.forEach(i,(u,d)=>{K(Jf,`Using index ${function(x){return`id=${x.indexId}|cg=${x.collectionGroup}|f=${x.fields.map(M=>`${M.fieldPath}:${M.kind}`).join(",")}`}(u)} to execute ${wr(t)}`);const f=function(x,M){const P=Rl(M);if(P===void 0)return null;for(const F of Ta(x,P.fieldPath))switch(F.op){case"array-contains-any":return F.value.arrayValue.values||[];case"array-contains":return[F.value]}return null}(d,u),p=function(x,M){const P=new Map;for(const F of er(M))for(const T of Ta(x,F.fieldPath))switch(T.op){case"==":case"in":P.set(F.fieldPath.canonicalString(),T.value);break;case"not-in":case"!=":return P.set(F.fieldPath.canonicalString(),T.value),Array.from(P.values())}return null}(d,u),g=function(x,M){const P=[];let F=!0;for(const T of er(M)){const v=T.kind===0?Pf(x,T.fieldPath,x.startAt):xf(x,T.fieldPath,x.startAt);P.push(v.value),F&&(F=v.inclusive)}return new Ln(P,F)}(d,u),b=function(x,M){const P=[];let F=!0;for(const T of er(M)){const v=T.kind===0?xf(x,T.fieldPath,x.endAt):Pf(x,T.fieldPath,x.endAt);P.push(v.value),F&&(F=v.inclusive)}return new Ln(P,F)}(d,u),E=this.Rn(u,d,g),S=this.Rn(u,d,b),A=this.Vn(u,d,p),O=this.mn(u.indexId,f,E,g.inclusive,S,b.inclusive,A);return D.forEach(O,k=>r.H(k,t.limit).next(x=>{x.forEach(M=>{const P=J.fromSegments(M.documentKey);o.has(P)||(o=o.add(P),c.push(P))})}))}).next(()=>c)}return D.resolve(null)})}dn(e){let t=this.En.get(e);return t||(e.filters.length===0?t=[e]:t=UA(Ee.create(e.filters,"and")).map(r=>Ol(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt)),this.En.set(e,t),t)}mn(e,t,r,s,i,o,c){const u=(t!=null?t.length:1)*Math.max(r.length,i.length),d=u/(t!=null?t.length:1),f=[];for(let p=0;p<u;++p){const g=t?this.fn(t[p/d]):ko,b=this.gn(e,g,r[p%d],s),E=this.pn(e,g,i[p%d],o),S=c.map(A=>this.gn(e,g,A,!0));f.push(...this.createRange(b,E,S))}return f}gn(e,t,r,s){const i=new ar(e,J.empty(),t,r);return s?i:i.nn()}pn(e,t,r,s){const i=new ar(e,J.empty(),t,r);return s?i.nn():i}An(e,t){const r=new Qf(t),s=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,s).next(i=>{let o=null;for(const c of i)r.un(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o})}getIndexType(e,t){let r=2;const s=this.dn(t);return D.forEach(s,i=>this.An(e,i).next(o=>{o?r!==0&&o.fields.length<function(u){let d=new Te(Ve.comparator),f=!1;for(const p of u.filters)for(const g of p.getFlattenedFilters())g.field.isKeyField()||(g.op==="array-contains"||g.op==="array-contains-any"?f=!0:d=d.add(g.field));for(const p of u.orderBy)p.field.isKeyField()||(d=d.add(p.field));return d.size+(f?1:0)}(i)&&(r=1):r=0})).next(()=>function(o){return o.limit!==null}(t)&&s.length>1&&r===2?1:r)}yn(e,t){const r=new Js;for(const s of er(e)){const i=t.data.field(s.fieldPath);if(i==null)return null;const o=r.tn(s.kind);or.xt.At(i,o)}return r.Yt()}fn(e){const t=new Js;return or.xt.At(e,t.tn(0)),t.Yt()}wn(e,t){const r=new Js;return or.xt.At(br(this.databaseId,t),r.tn(function(i){const o=er(i);return o.length===0?0:o[o.length-1].kind}(e))),r.Yt()}Vn(e,t,r){if(r===null)return[];let s=[];s.push(new Js);let i=0;for(const o of er(e)){const c=r[i++];for(const u of s)if(this.Sn(t,o.fieldPath)&&Vi(c))s=this.bn(s,o,c);else{const d=u.tn(o.kind);or.xt.At(c,d)}}return this.Dn(s)}Rn(e,t,r){return this.Vn(e,t,r.position)}Dn(e){const t=[];for(let r=0;r<e.length;++r)t[r]=e[r].Yt();return t}bn(e,t,r){const s=[...e],i=[];for(const o of r.arrayValue.values||[])for(const c of s){const u=new Js;u.seed(c.Yt()),or.xt.At(o,u.tn(t.kind)),i.push(u)}return i}Sn(e,t){return!!e.filters.find(r=>r instanceof _e&&r.field.isEqual(t)&&(r.op==="in"||r.op==="not-in"))}getFieldIndexes(e,t){const r=Xs(e),s=Hr(e);return(t?r.G(kl,IDBKeyRange.bound(t,t)):r.G()).next(i=>{const o=[];return D.forEach(i,c=>s.get([c.indexId,this.uid]).next(u=>{o.push(function(f,p){const g=p?new Si(p.sequenceNumber,new St(Er(p.readTime),new J($t(p.documentKey)),p.largestBatchId)):Si.empty(),b=f.fields.map(([E,S])=>new Wo(Ve.fromServerFormat(E),S));return new ga(f.indexId,f.collectionGroup,b,g)}(c,u))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((r,s)=>{const i=r.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:ue(r.collectionGroup,s.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,r){const s=Xs(e),i=Hr(e);return this.vn(e).next(o=>s.G(kl,IDBKeyRange.bound(t,t)).next(c=>D.forEach(c,u=>i.put(zf(u.indexId,this.uid,o,r)))))}updateIndexEntries(e,t){const r=new Map;return D.forEach(t,(s,i)=>{const o=r.get(s.collectionGroup);return(o?D.resolve(o):this.getFieldIndexes(e,s.collectionGroup)).next(c=>(r.set(s.collectionGroup,c),D.forEach(c,u=>this.Cn(e,s,u).next(d=>{const f=this.Fn(i,u);return d.isEqual(f)?D.resolve():this.Mn(e,i,u,d,f)}))))})}xn(e,t,r,s){return Gr(e).put({indexId:s.indexId,uid:this.uid,arrayValue:s.arrayValue,directionalValue:s.directionalValue,orderedDocumentKey:this.wn(r,t.key),documentKey:t.key.path.toArray()})}On(e,t,r,s){return Gr(e).delete([s.indexId,this.uid,s.arrayValue,s.directionalValue,this.wn(r,t.key),t.key.path.toArray()])}Cn(e,t,r){const s=Gr(e);let i=new Te(_n);return s.Z({index:bg,range:IDBKeyRange.only([r.indexId,this.uid,this.wn(r,t)])},(o,c)=>{i=i.add(new ar(r.indexId,t,c.arrayValue,c.directionalValue))}).next(()=>i)}Fn(e,t){let r=new Te(_n);const s=this.yn(t,e);if(s==null)return r;const i=Rl(t);if(i!=null){const o=e.data.field(i.fieldPath);if(Vi(o))for(const c of o.arrayValue.values||[])r=r.add(new ar(t.indexId,e.key,this.fn(c),s))}else r=r.add(new ar(t.indexId,e.key,ko,s));return r}Mn(e,t,r,s,i){K(Jf,"Updating index entries for document '%s'",t.key);const o=[];return function(u,d,f,p,g){const b=u.getIterator(),E=d.getIterator();let S=jr(b),A=jr(E);for(;S||A;){let O=!1,k=!1;if(S&&A){const x=f(S,A);x<0?k=!0:x>0&&(O=!0)}else S!=null?k=!0:O=!0;O?(p(A),A=jr(E)):k?(g(S),S=jr(b)):(S=jr(b),A=jr(E))}}(s,i,_n,c=>{o.push(this.xn(e,t,r,c))},c=>{o.push(this.On(e,t,r,c))}),D.waitFor(o)}vn(e){let t=1;return Hr(e).Z({index:yg,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(r,s,i)=>{i.done(),t=s.sequenceNumber+1}).next(()=>t)}createRange(e,t,r){r=r.sort((o,c)=>_n(o,c)).filter((o,c,u)=>!c||_n(o,u[c-1])!==0);const s=[];s.push(e);for(const o of r){const c=_n(o,e),u=_n(o,t);if(c===0)s[0]=e.nn();else if(c>0&&u<0)s.push(o),s.push(o.nn());else if(u>0)break}s.push(t);const i=[];for(let o=0;o<s.length;o+=2){if(this.Nn(s[o],s[o+1]))return[];const c=[s[o].indexId,this.uid,s[o].arrayValue,s[o].directionalValue,ko,[]],u=[s[o+1].indexId,this.uid,s[o+1].arrayValue,s[o+1].directionalValue,ko,[]];i.push(IDBKeyRange.bound(c,u))}return i}Nn(e,t){return _n(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(Zf)}getMinOffset(e,t){return D.mapArray(this.dn(t),r=>this.An(e,r).next(s=>s||ee())).next(Zf)}}function Xf(n){return He(n,xi)}function Gr(n){return He(n,wa)}function Xs(n){return He(n,Eu)}function Hr(n){return He(n,ba)}function Zf(n){te(n.length!==0);let e=n[0].indexState.offset,t=e.largestBatchId;for(let r=1;r<n.length;r++){const s=n[r].indexState.offset;bu(s,e)<0&&(e=s),t<s.largestBatchId&&(t=s.largestBatchId)}return new St(e.readTime,e.documentKey,t)}/**
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
 */const ep={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},I_=41943040;class tt{static withCacheSize(e){return new tt(e,tt.DEFAULT_COLLECTION_PERCENTILE,tt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function E_(n,e,t){const r=n.store(Dt),s=n.store(hs),i=[],o=IDBKeyRange.only(t.batchId);let c=0;const u=r.Z({range:o},(f,p,g)=>(c++,g.delete()));i.push(u.next(()=>{te(c===1)}));const d=[];for(const f of t.mutations){const p=gg(e,f.key.path,t.batchId);i.push(s.delete(p)),d.push(f.key)}return D.waitFor(i).next(()=>d)}function Pa(n){if(!n)return 0;let e;if(n.document)e=n.document;else if(n.unknownDocument)e=n.unknownDocument;else{if(!n.noDocument)throw ee();e=n.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */tt.DEFAULT_COLLECTION_PERCENTILE=10,tt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,tt.DEFAULT=new tt(I_,tt.DEFAULT_COLLECTION_PERCENTILE,tt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),tt.DISABLED=new tt(-1,0,0);class hc{constructor(e,t,r,s){this.userId=e,this.serializer=t,this.indexManager=r,this.referenceDelegate=s,this.Bn={}}static It(e,t,r,s){te(e.uid!=="");const i=e.isAuthenticated()?e.uid:"";return new hc(i,t,r,s)}checkEmpty(e){let t=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return vn(e).Z({index:cr,range:r},(s,i,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,r,s){const i=Xr(e),o=vn(e);return o.add({}).next(c=>{te(typeof c=="number");const u=new xu(c,t,r,s),d=function(b,E,S){const A=S.baseMutations.map(k=>Sa(b.Tt,k)),O=S.mutations.map(k=>Sa(b.Tt,k));return{userId:E,batchId:S.batchId,localWriteTimeMs:S.localWriteTime.toMillis(),baseMutations:A,mutations:O}}(this.serializer,this.userId,u),f=[];let p=new Te((g,b)=>ue(g.canonicalString(),b.canonicalString()));for(const g of s){const b=gg(this.userId,g.key.path,c);p=p.add(g.key.path.popLast()),f.push(o.put(d)),f.push(i.put(b,vT))}return p.forEach(g=>{f.push(this.indexManager.addToCollectionParentIndex(e,g))}),e.addOnCommittedListener(()=>{this.Bn[c]=u.keys()}),D.waitFor(f).next(()=>u)})}lookupMutationBatch(e,t){return vn(e).get(t).next(r=>r?(te(r.userId===this.userId),ir(this.serializer,r)):null)}Ln(e,t){return this.Bn[t]?D.resolve(this.Bn[t]):this.lookupMutationBatch(e,t).next(r=>{if(r){const s=r.keys();return this.Bn[t]=s,s}return null})}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=IDBKeyRange.lowerBound([this.userId,r]);let i=null;return vn(e).Z({index:cr,range:s},(o,c,u)=>{c.userId===this.userId&&(te(c.batchId>=r),i=ir(this.serializer,c)),u.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=hr;return vn(e).Z({index:cr,range:t,reverse:!0},(s,i,o)=>{r=i.batchId,o.done()}).next(()=>r)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,hr],[this.userId,Number.POSITIVE_INFINITY]);return vn(e).G(cr,t).next(r=>r.map(s=>ir(this.serializer,s)))}getAllMutationBatchesAffectingDocumentKey(e,t){const r=Qo(this.userId,t.path),s=IDBKeyRange.lowerBound(r),i=[];return Xr(e).Z({range:s},(o,c,u)=>{const[d,f,p]=o,g=$t(f);if(d===this.userId&&t.path.isEqual(g))return vn(e).get(p).next(b=>{if(!b)throw ee();te(b.userId===this.userId),i.push(ir(this.serializer,b))});u.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Te(ue);const s=[];return t.forEach(i=>{const o=Qo(this.userId,i.path),c=IDBKeyRange.lowerBound(o),u=Xr(e).Z({range:c},(d,f,p)=>{const[g,b,E]=d,S=$t(b);g===this.userId&&i.path.isEqual(S)?r=r.add(E):p.done()});s.push(u)}),D.waitFor(s).next(()=>this.kn(e,r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1,i=Qo(this.userId,r),o=IDBKeyRange.lowerBound(i);let c=new Te(ue);return Xr(e).Z({range:o},(u,d,f)=>{const[p,g,b]=u,E=$t(g);p===this.userId&&r.isPrefixOf(E)?E.length===s&&(c=c.add(b)):f.done()}).next(()=>this.kn(e,c))}kn(e,t){const r=[],s=[];return t.forEach(i=>{s.push(vn(e).get(i).next(o=>{if(o===null)throw ee();te(o.userId===this.userId),r.push(ir(this.serializer,o))}))}),D.waitFor(s).next(()=>r)}removeMutationBatch(e,t){return E_(e.ue,this.userId,t).next(r=>(e.addOnCommittedListener(()=>{this.qn(t.batchId)}),D.forEach(r,s=>this.referenceDelegate.markPotentiallyOrphaned(e,s))))}qn(e){delete this.Bn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return D.resolve();const r=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),s=[];return Xr(e).Z({range:r},(i,o,c)=>{if(i[0]===this.userId){const u=$t(i[1]);s.push(u)}else c.done()}).next(()=>{te(s.length===0)})})}containsKey(e,t){return T_(e,this.userId,t)}Qn(e){return A_(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:hr,lastStreamToken:""})}}function T_(n,e,t){const r=Qo(e,t.path),s=r[1],i=IDBKeyRange.lowerBound(r);let o=!1;return Xr(n).Z({range:i,Y:!0},(c,u,d)=>{const[f,p,g]=c;f===e&&p===s&&(o=!0),d.done()}).next(()=>o)}function vn(n){return He(n,Dt)}function Xr(n){return He(n,hs)}function A_(n){return He(n,Ci)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tr{constructor(e){this.$n=e}next(){return this.$n+=2,this.$n}static Un(){return new Tr(0)}static Kn(){return new Tr(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qA{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.Wn(e).next(t=>{const r=new Tr(t.highestTargetId);return t.highestTargetId=r.next(),this.Gn(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.Wn(e).next(t=>ie.fromTimestamp(new Oe(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.Wn(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,r){return this.Wn(e).next(s=>(s.highestListenSequenceNumber=t,r&&(s.lastRemoteSnapshotVersion=r.toTimestamp()),t>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=t),this.Gn(e,s)))}addTargetData(e,t){return this.zn(e,t).next(()=>this.Wn(e).next(r=>(r.targetCount+=1,this.jn(t,r),this.Gn(e,r))))}updateTargetData(e,t){return this.zn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>Kr(e).delete(t.targetId)).next(()=>this.Wn(e)).next(r=>(te(r.targetCount>0),r.targetCount-=1,this.Gn(e,r)))}removeTargets(e,t,r){let s=0;const i=[];return Kr(e).Z((o,c)=>{const u=ci(c);u.sequenceNumber<=t&&r.get(u.targetId)===null&&(s++,i.push(this.removeTargetData(e,u)))}).next(()=>D.waitFor(i)).next(()=>s)}forEachTarget(e,t){return Kr(e).Z((r,s)=>{const i=ci(s);t(i)})}Wn(e){return tp(e).get(ya).next(t=>(te(t!==null),t))}Gn(e,t){return tp(e).put(ya,t)}zn(e,t){return Kr(e).put(v_(this.serializer,t))}jn(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.Wn(e).next(t=>t.targetCount)}getTargetData(e,t){const r=wr(t),s=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let i=null;return Kr(e).Z({range:s,index:vg},(o,c,u)=>{const d=ci(c);Qi(t,d.target)&&(i=d,u.done())}).next(()=>i)}addMatchingKeys(e,t,r){const s=[],i=An(e);return t.forEach(o=>{const c=st(o.path);s.push(i.put({targetId:r,path:c})),s.push(this.referenceDelegate.addReference(e,r,o))}),D.waitFor(s)}removeMatchingKeys(e,t,r){const s=An(e);return D.forEach(t,i=>{const o=st(i.path);return D.waitFor([s.delete([r,o]),this.referenceDelegate.removeReference(e,r,i)])})}removeMatchingKeysForTargetId(e,t){const r=An(e),s=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(s)}getMatchingKeysForTargetId(e,t){const r=IDBKeyRange.bound([t],[t+1],!1,!0),s=An(e);let i=pe();return s.Z({range:r,Y:!0},(o,c,u)=>{const d=$t(o[1]),f=new J(d);i=i.add(f)}).next(()=>i)}containsKey(e,t){const r=st(t.path),s=IDBKeyRange.bound([r],[dg(r)],!1,!0);let i=0;return An(e).Z({index:Iu,Y:!0,range:s},([o,c],u,d)=>{o!==0&&(i++,d.done())}).next(()=>i>0)}lt(e,t){return Kr(e).get(t).next(r=>r?ci(r):null)}}function Kr(n){return He(n,fs)}function tp(n){return He(n,fr)}function An(n){return He(n,ps)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const np="LruGarbageCollector",R_=1048576;function rp([n,e],[t,r]){const s=ue(n,t);return s===0?ue(e,r):s}class jA{constructor(e){this.Hn=e,this.buffer=new Te(rp),this.Jn=0}Yn(){return++this.Jn}Zn(e){const t=[e,this.Yn()];if(this.buffer.size<this.Hn)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();rp(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class S_{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Xn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.er(6e4)}stop(){this.Xn&&(this.Xn.cancel(),this.Xn=null)}get started(){return this.Xn!==null}er(e){K(np,`Garbage collection scheduled in ${e}ms`),this.Xn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Xn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){$n(t)?K(np,"Ignoring IndexedDB error during garbage collection: ",t):await Nr(t)}await this.er(3e5)})}}class zA{constructor(e,t){this.tr=e,this.params=t}calculateTargetCount(e,t){return this.tr.nr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return D.resolve(Pt.ae);const r=new jA(t);return this.tr.forEachTarget(e,s=>r.Zn(s.sequenceNumber)).next(()=>this.tr.rr(e,s=>r.Zn(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.tr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.tr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(K("LruGarbageCollector","Garbage collection skipped; disabled"),D.resolve(ep)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(K("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),ep):this.ir(e,t))}getCacheSize(e){return this.tr.getCacheSize(e)}ir(e,t){let r,s,i,o,c,u,d;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(K("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,o=Date.now(),this.nthSequenceNumber(e,s))).next(p=>(r=p,c=Date.now(),this.removeTargets(e,r,t))).next(p=>(i=p,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(p=>(d=Date.now(),Wr()<=ge.DEBUG&&K("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${p} documents in `+(d-u)+`ms
Total Duration: ${d-f}ms`),D.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p})))}}function k_(n,e){return new zA(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GA{constructor(e,t){this.db=e,this.garbageCollector=k_(this,t)}nr(e){const t=this.sr(e);return this.db.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}sr(e){let t=0;return this.rr(e,r=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}rr(e,t){return this._r(e,(r,s)=>t(s))}addReference(e,t,r){return Co(e,r)}removeReference(e,t,r){return Co(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return Co(e,t)}ar(e,t){return function(s,i){let o=!1;return A_(s).X(c=>T_(s,c,i).next(u=>(u&&(o=!0),D.resolve(!u)))).next(()=>o)}(e,t)}removeOrphanedDocuments(e,t){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this._r(e,(o,c)=>{if(c<=t){const u=this.ar(e,o).next(d=>{if(!d)return i++,r.getEntry(e,o).next(()=>(r.removeEntry(o,ie.min()),An(e).delete(function(p){return[0,st(p.path)]}(o))))});s.push(u)}}).next(()=>D.waitFor(s)).next(()=>r.apply(e)).next(()=>i)}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return Co(e,t)}_r(e,t){const r=An(e);let s,i=Pt.ae;return r.Z({index:Iu},([o,c],{path:u,sequenceNumber:d})=>{o===0?(i!==Pt.ae&&t(new J($t(s)),i),i=d,s=u):i=Pt.ae}).next(()=>{i!==Pt.ae&&t(new J($t(s)),i)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Co(n,e){return An(n).put(function(r,s){return{targetId:0,path:st(r.path),sequenceNumber:s}}(e,n.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C_{constructor(){this.changes=new dn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Me.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?D.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HA{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return Yn(e).put(r)}removeEntry(e,t,r){return Yn(e).delete(function(i,o){const c=i.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],ka(o),c[c.length-1]]}(t,r))}updateMetadata(e,t){return this.getMetadata(e).next(r=>(r.byteSize+=t,this.ur(e,r)))}getEntry(e,t){let r=Me.newInvalidDocument(t);return Yn(e).Z({index:Yo,range:IDBKeyRange.only(Zs(t))},(s,i)=>{r=this.cr(t,i)}).next(()=>r)}lr(e,t){let r={size:0,document:Me.newInvalidDocument(t)};return Yn(e).Z({index:Yo,range:IDBKeyRange.only(Zs(t))},(s,i)=>{r={document:this.cr(t,i),size:Pa(i)}}).next(()=>r)}getEntries(e,t){let r=Et();return this.hr(e,t,(s,i)=>{const o=this.cr(s,i);r=r.insert(s,o)}).next(()=>r)}Pr(e,t){let r=Et(),s=new xe(J.comparator);return this.hr(e,t,(i,o)=>{const c=this.cr(i,o);r=r.insert(i,c),s=s.insert(i,Pa(o))}).next(()=>({documents:r,Tr:s}))}hr(e,t,r){if(t.isEmpty())return D.resolve();let s=new Te(op);t.forEach(u=>s=s.add(u));const i=IDBKeyRange.bound(Zs(s.first()),Zs(s.last())),o=s.getIterator();let c=o.getNext();return Yn(e).Z({index:Yo,range:i},(u,d,f)=>{const p=J.fromSegments([...d.prefixPath,d.collectionGroup,d.documentId]);for(;c&&op(c,p)<0;)r(c,null),c=o.getNext();c&&c.isEqual(p)&&(r(c,d),c=o.hasNext()?o.getNext():null),c?f.W(Zs(c)):f.done()}).next(()=>{for(;c;)r(c,null),c=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,r,s,i){const o=t.path,c=[o.popLast().toArray(),o.lastSegment(),ka(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],u=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Yn(e).G(IDBKeyRange.bound(c,u,!0)).next(d=>{i?.incrementDocumentReadCount(d.length);let f=Et();for(const p of d){const g=this.cr(J.fromSegments(p.prefixPath.concat(p.collectionGroup,p.documentId)),p);g.isFoundDocument()&&(Ji(t,g)||s.has(g.key))&&(f=f.insert(g.key,g))}return f})}getAllFromCollectionGroup(e,t,r,s){let i=Et();const o=ip(t,r),c=ip(t,St.max());return Yn(e).Z({index:_g,range:IDBKeyRange.bound(o,c,!0)},(u,d,f)=>{const p=this.cr(J.fromSegments(d.prefixPath.concat(d.collectionGroup,d.documentId)),d);i=i.insert(p.key,p),i.size===s&&f.done()}).next(()=>i)}newChangeBuffer(e){return new KA(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return sp(e).get(Sl).next(t=>(te(!!t),t))}ur(e,t){return sp(e).put(Sl,t)}cr(e,t){if(t){const r=NA(this.serializer,t);if(!(r.isNoDocument()&&r.version.isEqual(ie.min())))return r}return Me.newInvalidDocument(e)}}function P_(n){return new HA(n)}class KA extends C_{constructor(e,t){super(),this.Ir=e,this.trackRemovals=t,this.Er=new dn(r=>r.toString(),(r,s)=>r.isEqual(s))}applyChanges(e){const t=[];let r=0,s=new Te((i,o)=>ue(i.canonicalString(),o.canonicalString()));return this.changes.forEach((i,o)=>{const c=this.Er.get(i);if(t.push(this.Ir.removeEntry(e,i,c.readTime)),o.isValidDocument()){const u=qf(this.Ir.serializer,o);s=s.add(i.path.popLast());const d=Pa(u);r+=d-c.size,t.push(this.Ir.addEntry(e,i,u))}else if(r-=c.size,this.trackRemovals){const u=qf(this.Ir.serializer,o.convertToNoDocument(ie.min()));t.push(this.Ir.addEntry(e,i,u))}}),s.forEach(i=>{t.push(this.Ir.indexManager.addToCollectionParentIndex(e,i))}),t.push(this.Ir.updateMetadata(e,r)),D.waitFor(t)}getFromCache(e,t){return this.Ir.lr(e,t).next(r=>(this.Er.set(t,{size:r.size,readTime:r.document.readTime}),r.document))}getAllFromCache(e,t){return this.Ir.Pr(e,t).next(({documents:r,Tr:s})=>(s.forEach((i,o)=>{this.Er.set(i,{size:o,readTime:r.get(i).readTime})}),r))}}function sp(n){return He(n,Pi)}function Yn(n){return He(n,va)}function Zs(n){const e=n.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function ip(n,e){const t=e.documentKey.path.toArray();return[n,ka(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function op(n,e){const t=n.path.toArray(),r=e.path.toArray();let s=0;for(let i=0;i<t.length-2&&i<r.length-2;++i)if(s=ue(t[i],r[i]),s)return s;return s=ue(t.length,r.length),s||(s=ue(t[t.length-2],r[r.length-2]),s||ue(t[t.length-1],r[r.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class WA{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x_{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&mi(r.mutation,s,mt.empty(),Oe.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,pe()).next(()=>r))}getLocalViewOfDocuments(e,t,r=pe()){const s=qt();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let o=oi();return i.forEach((c,u)=>{o=o.insert(c,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const r=qt();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,pe()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,c)=>{t.set(o,c)})})}computeViews(e,t,r,s){let i=Et();const o=pi(),c=function(){return pi()}();return t.forEach((u,d)=>{const f=r.get(d.key);s.has(d.key)&&(f===void 0||f.mutation instanceof hn)?i=i.insert(d.key,d):f!==void 0?(o.set(d.key,f.mutation.getFieldMask()),mi(f.mutation,d,f.mutation.getFieldMask(),Oe.now())):o.set(d.key,mt.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((d,f)=>o.set(d,f)),t.forEach((d,f)=>{var p;return c.set(d,new WA(f,(p=o.get(d))!==null&&p!==void 0?p:null))}),c))}recalculateAndSaveOverlays(e,t){const r=pi();let s=new xe((o,c)=>o-c),i=pe();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const c of o)c.keys().forEach(u=>{const d=t.get(u);if(d===null)return;let f=r.get(u)||mt.empty();f=c.applyToLocalView(d,f),r.set(u,f);const p=(s.get(c.batchId)||pe()).add(u);s=s.insert(c.batchId,p)})}).next(()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),d=u.key,f=u.value,p=Hg();f.forEach(g=>{if(!i.has(g)){const b=e_(t.get(g),r.get(g));b!==null&&p.set(g,b),i=i.add(g)}}),o.push(this.documentOverlayCache.saveOverlays(e,d,p))}return D.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return function(o){return J.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Cu(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):D.resolve(qt());let c=Ri,u=i;return o.next(d=>D.forEach(d,(f,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),i.get(f)?D.resolve():this.remoteDocumentCache.getEntry(e,f).next(g=>{u=u.insert(f,g)}))).next(()=>this.populateOverlays(e,d,i)).next(()=>this.computeViews(e,u,d,pe())).next(f=>({batchId:c,changes:Gg(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new J(t)).next(r=>{let s=oi();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let o=oi();return this.indexManager.getCollectionParents(e,i).next(c=>D.forEach(c,u=>{const d=function(p,g){return new Dr(g,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,d,r,s).next(f=>{f.forEach((p,g)=>{o=o.insert(p,g)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(o=>{i.forEach((u,d)=>{const f=d.getKey();o.get(f)===null&&(o=o.insert(f,Me.newInvalidDocument(f)))});let c=oi();return o.forEach((u,d)=>{const f=i.get(u);f!==void 0&&mi(f.mutation,d,mt.empty(),Oe.now()),Ji(t,d)&&(c=c.insert(u,d))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QA{constructor(e){this.serializer=e,this.dr=new Map,this.Ar=new Map}getBundleMetadata(e,t){return D.resolve(this.dr.get(t))}saveBundleMetadata(e,t){return this.dr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:pt(s.createTime)}}(t)),D.resolve()}getNamedQuery(e,t){return D.resolve(this.Ar.get(t))}saveNamedQuery(e,t){return this.Ar.set(t.name,function(s){return{name:s.name,query:y_(s.bundledQuery),readTime:pt(s.readTime)}}(t)),D.resolve()}}/**
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
 */class YA{constructor(){this.overlays=new xe(J.comparator),this.Rr=new Map}getOverlay(e,t){return D.resolve(this.overlays.get(t))}getOverlays(e,t){const r=qt();return D.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.Et(e,t,i)}),D.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Rr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Rr.delete(r)),D.resolve()}getOverlaysForCollection(e,t,r){const s=qt(),i=t.length+1,o=new J(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const u=c.getNext().value,d=u.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return D.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new xe((d,f)=>d-f);const o=this.overlays.getIterator();for(;o.hasNext();){const d=o.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let f=i.get(d.largestBatchId);f===null&&(f=qt(),i=i.insert(d.largestBatchId,f)),f.set(d.getKey(),d)}}const c=qt(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((d,f)=>c.set(d,f)),!(c.size()>=s)););return D.resolve(c)}Et(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Rr.get(s.largestBatchId).delete(r.key);this.Rr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new Du(t,r));let i=this.Rr.get(t);i===void 0&&(i=pe(),this.Rr.set(t,i)),this.Rr.set(t,i.add(r.key))}}/**
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
 */class JA{constructor(){this.sessionToken=je.EMPTY_BYTE_STRING}getSessionToken(e){return D.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,D.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fu{constructor(){this.Vr=new Te(Ke.mr),this.gr=new Te(Ke.pr)}isEmpty(){return this.Vr.isEmpty()}addReference(e,t){const r=new Ke(e,t);this.Vr=this.Vr.add(r),this.gr=this.gr.add(r)}yr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.wr(new Ke(e,t))}Sr(e,t){e.forEach(r=>this.removeReference(r,t))}br(e){const t=new J(new we([])),r=new Ke(t,e),s=new Ke(t,e+1),i=[];return this.gr.forEachInRange([r,s],o=>{this.wr(o),i.push(o.key)}),i}Dr(){this.Vr.forEach(e=>this.wr(e))}wr(e){this.Vr=this.Vr.delete(e),this.gr=this.gr.delete(e)}vr(e){const t=new J(new we([])),r=new Ke(t,e),s=new Ke(t,e+1);let i=pe();return this.gr.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(e){const t=new Ke(e,0),r=this.Vr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Ke{constructor(e,t){this.key=e,this.Cr=t}static mr(e,t){return J.comparator(e.key,t.key)||ue(e.Cr,t.Cr)}static pr(e,t){return ue(e.Cr,t.Cr)||J.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XA{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Fr=1,this.Mr=new Te(Ke.mr)}checkEmpty(e){return D.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Fr;this.Fr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new xu(i,t,r,s);this.mutationQueue.push(o);for(const c of s)this.Mr=this.Mr.add(new Ke(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return D.resolve(o)}lookupMutationBatch(e,t){return D.resolve(this.Or(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Nr(r),i=s<0?0:s;return D.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return D.resolve(this.mutationQueue.length===0?hr:this.Fr-1)}getAllMutationBatches(e){return D.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Ke(t,0),s=new Ke(t,Number.POSITIVE_INFINITY),i=[];return this.Mr.forEachInRange([r,s],o=>{const c=this.Or(o.Cr);i.push(c)}),D.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Te(ue);return t.forEach(s=>{const i=new Ke(s,0),o=new Ke(s,Number.POSITIVE_INFINITY);this.Mr.forEachInRange([i,o],c=>{r=r.add(c.Cr)})}),D.resolve(this.Br(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;J.isDocumentKey(i)||(i=i.child(""));const o=new Ke(new J(i),0);let c=new Te(ue);return this.Mr.forEachWhile(u=>{const d=u.key.path;return!!r.isPrefixOf(d)&&(d.length===s&&(c=c.add(u.Cr)),!0)},o),D.resolve(this.Br(c))}Br(e){const t=[];return e.forEach(r=>{const s=this.Or(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){te(this.Lr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.Mr;return D.forEach(t.mutations,s=>{const i=new Ke(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Mr=r})}qn(e){}containsKey(e,t){const r=new Ke(t,0),s=this.Mr.firstAfterOrEqual(r);return D.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,D.resolve()}Lr(e,t){return this.Nr(e)}Nr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Or(e){const t=this.Nr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZA{constructor(e){this.kr=e,this.docs=function(){return new xe(J.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,o=this.kr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return D.resolve(r?r.document.mutableCopy():Me.newInvalidDocument(t))}getEntries(e,t){let r=Et();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Me.newInvalidDocument(s))}),D.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=Et();const o=t.path,c=new J(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:d,value:{document:f}}=u.getNext();if(!o.isPrefixOf(d.path))break;d.path.length>o.length+1||bu(hg(f),r)<=0||(s.has(f.key)||Ji(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return D.resolve(i)}getAllFromCollectionGroup(e,t,r,s){ee()}qr(e,t){return D.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new e0(this)}getSize(e){return D.resolve(this.size)}}class e0 extends C_{constructor(e){super(),this.Ir=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.Ir.addEntry(e,s)):this.Ir.removeEntry(r)}),D.waitFor(t)}getFromCache(e,t){return this.Ir.getEntry(e,t)}getAllFromCache(e,t){return this.Ir.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t0{constructor(e){this.persistence=e,this.Qr=new dn(t=>wr(t),Qi),this.lastRemoteSnapshotVersion=ie.min(),this.highestTargetId=0,this.$r=0,this.Ur=new Fu,this.targetCount=0,this.Kr=Tr.Un()}forEachTarget(e,t){return this.Qr.forEach((r,s)=>t(s)),D.resolve()}getLastRemoteSnapshotVersion(e){return D.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return D.resolve(this.$r)}allocateTargetId(e){return this.highestTargetId=this.Kr.next(),D.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.$r&&(this.$r=t),D.resolve()}zn(e){this.Qr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.Kr=new Tr(t),this.highestTargetId=t),e.sequenceNumber>this.$r&&(this.$r=e.sequenceNumber)}addTargetData(e,t){return this.zn(t),this.targetCount+=1,D.resolve()}updateTargetData(e,t){return this.zn(t),D.resolve()}removeTargetData(e,t){return this.Qr.delete(t.target),this.Ur.br(t.targetId),this.targetCount-=1,D.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.Qr.forEach((o,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.Qr.delete(o),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)}),D.waitFor(i).next(()=>s)}getTargetCount(e){return D.resolve(this.targetCount)}getTargetData(e,t){const r=this.Qr.get(t)||null;return D.resolve(r)}addMatchingKeys(e,t,r){return this.Ur.yr(t,r),D.resolve()}removeMatchingKeys(e,t,r){this.Ur.Sr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),D.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Ur.br(t),D.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Ur.vr(t);return D.resolve(r)}containsKey(e,t){return D.resolve(this.Ur.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uu{constructor(e,t){this.Wr={},this.overlays={},this.Gr=new Pt(0),this.zr=!1,this.zr=!0,this.jr=new JA,this.referenceDelegate=e(this),this.Hr=new t0(this),this.indexManager=new BA,this.remoteDocumentCache=function(s){return new ZA(s)}(r=>this.referenceDelegate.Jr(r)),this.serializer=new __(t),this.Yr=new QA(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.zr=!1,Promise.resolve()}get started(){return this.zr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new YA,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.Wr[e.toKey()];return r||(r=new XA(t,this.referenceDelegate),this.Wr[e.toKey()]=r),r}getGlobalsCache(){return this.jr}getTargetCache(){return this.Hr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Yr}runTransaction(e,t,r){K("MemoryPersistence","Starting transaction:",e);const s=new n0(this.Gr.next());return this.referenceDelegate.Zr(),r(s).next(i=>this.referenceDelegate.Xr(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}ei(e,t){return D.or(Object.values(this.Wr).map(r=>()=>r.containsKey(e,t)))}}class n0 extends pg{constructor(e){super(),this.currentSequenceNumber=e}}class fc{constructor(e){this.persistence=e,this.ti=new Fu,this.ni=null}static ri(e){return new fc(e)}get ii(){if(this.ni)return this.ni;throw ee()}addReference(e,t,r){return this.ti.addReference(r,t),this.ii.delete(r.toString()),D.resolve()}removeReference(e,t,r){return this.ti.removeReference(r,t),this.ii.add(r.toString()),D.resolve()}markPotentiallyOrphaned(e,t){return this.ii.add(t.toString()),D.resolve()}removeTarget(e,t){this.ti.br(t.targetId).forEach(s=>this.ii.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.ii.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}Zr(){this.ni=new Set}Xr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return D.forEach(this.ii,r=>{const s=J.fromPath(r);return this.si(e,s).next(i=>{i||t.removeEntry(s,ie.min())})}).next(()=>(this.ni=null,t.apply(e)))}updateLimboDocument(e,t){return this.si(e,t).next(r=>{r?this.ii.delete(t.toString()):this.ii.add(t.toString())})}Jr(e){return 0}si(e,t){return D.or([()=>D.resolve(this.ti.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.ei(e,t)])}}class xa{constructor(e,t){this.persistence=e,this.oi=new dn(r=>st(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=k_(this,t)}static ri(e,t){return new xa(e,t)}Zr(){}Xr(e){return D.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}nr(e){const t=this.sr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}sr(e){let t=0;return this.rr(e,r=>{t++}).next(()=>t)}rr(e,t){return D.forEach(this.oi,(r,s)=>this.ar(e,r,s).next(i=>i?D.resolve():t(s)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.qr(e,o=>this.ar(e,o,t).next(c=>{c||(r++,i.removeEntry(o,ie.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.oi.set(t,e.currentSequenceNumber),D.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.oi.set(r,e.currentSequenceNumber),D.resolve()}removeReference(e,t,r){return this.oi.set(r,e.currentSequenceNumber),D.resolve()}updateLimboDocument(e,t){return this.oi.set(t,e.currentSequenceNumber),D.resolve()}Jr(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Xo(e.data.value)),t}ar(e,t,r){return D.or([()=>this.persistence.ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.oi.get(t);return D.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r0{constructor(e){this.serializer=e}B(e,t,r,s){const i=new Xa("createOrUpgrade",t);r<1&&s>=1&&(function(u){u.createObjectStore(Wi)}(e),function(u){u.createObjectStore(Ci,{keyPath:_T}),u.createObjectStore(Dt,{keyPath:vf,autoIncrement:!0}).createIndex(cr,yf,{unique:!0}),u.createObjectStore(hs)}(e),ap(e),function(u){u.createObjectStore(tr)}(e));let o=D.resolve();return r<3&&s>=3&&(r!==0&&(function(u){u.deleteObjectStore(ps),u.deleteObjectStore(fs),u.deleteObjectStore(fr)}(e),ap(e)),o=o.next(()=>function(u){const d=u.store(fr),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:ie.min().toTimestamp(),targetCount:0};return d.put(ya,f)}(i))),r<4&&s>=4&&(r!==0&&(o=o.next(()=>function(u,d){return d.store(Dt).G().next(p=>{u.deleteObjectStore(Dt),u.createObjectStore(Dt,{keyPath:vf,autoIncrement:!0}).createIndex(cr,yf,{unique:!0});const g=d.store(Dt),b=p.map(E=>g.put(E));return D.waitFor(b)})}(e,i))),o=o.next(()=>{(function(u){u.createObjectStore(ms,{keyPath:RT})})(e)})),r<5&&s>=5&&(o=o.next(()=>this._i(i))),r<6&&s>=6&&(o=o.next(()=>(function(u){u.createObjectStore(Pi)}(e),this.ai(i)))),r<7&&s>=7&&(o=o.next(()=>this.ui(i))),r<8&&s>=8&&(o=o.next(()=>this.ci(e,i))),r<9&&s>=9&&(o=o.next(()=>{(function(u){u.objectStoreNames.contains("remoteDocumentChanges")&&u.deleteObjectStore("remoteDocumentChanges")})(e)})),r<10&&s>=10&&(o=o.next(()=>this.li(i))),r<11&&s>=11&&(o=o.next(()=>{(function(u){u.createObjectStore(ec,{keyPath:ST})})(e),function(u){u.createObjectStore(tc,{keyPath:kT})}(e)})),r<12&&s>=12&&(o=o.next(()=>{(function(u){const d=u.createObjectStore(nc,{keyPath:OT});d.createIndex(Cl,LT,{unique:!1}),d.createIndex(wg,MT,{unique:!1})})(e)})),r<13&&s>=13&&(o=o.next(()=>function(u){const d=u.createObjectStore(va,{keyPath:yT});d.createIndex(Yo,bT),d.createIndex(_g,wT)}(e)).next(()=>this.hi(e,i)).next(()=>e.deleteObjectStore(tr))),r<14&&s>=14&&(o=o.next(()=>this.Pi(e,i))),r<15&&s>=15&&(o=o.next(()=>function(u){u.createObjectStore(Eu,{keyPath:CT,autoIncrement:!0}).createIndex(kl,PT,{unique:!1}),u.createObjectStore(ba,{keyPath:xT}).createIndex(yg,NT,{unique:!1}),u.createObjectStore(wa,{keyPath:DT}).createIndex(bg,VT,{unique:!1})}(e))),r<16&&s>=16&&(o=o.next(()=>{t.objectStore(ba).clear()}).next(()=>{t.objectStore(wa).clear()})),r<17&&s>=17&&(o=o.next(()=>{(function(u){u.createObjectStore(Tu,{keyPath:FT})})(e)})),o}ai(e){let t=0;return e.store(tr).Z((r,s)=>{t+=Pa(s)}).next(()=>{const r={byteSize:t};return e.store(Pi).put(Sl,r)})}_i(e){const t=e.store(Ci),r=e.store(Dt);return t.G().next(s=>D.forEach(s,i=>{const o=IDBKeyRange.bound([i.userId,hr],[i.userId,i.lastAcknowledgedBatchId]);return r.G(cr,o).next(c=>D.forEach(c,u=>{te(u.userId===i.userId);const d=ir(this.serializer,u);return E_(e,i.userId,d).next(()=>{})}))}))}ui(e){const t=e.store(ps),r=e.store(tr);return e.store(fr).get(ya).next(s=>{const i=[];return r.Z((o,c)=>{const u=new we(o),d=function(p){return[0,st(p)]}(u);i.push(t.get(d).next(f=>f?D.resolve():(p=>t.put({targetId:0,path:st(p),sequenceNumber:s.highestListenSequenceNumber}))(u)))}).next(()=>D.waitFor(i))})}ci(e,t){e.createObjectStore(xi,{keyPath:AT});const r=t.store(xi),s=new Mu,i=o=>{if(s.add(o)){const c=o.lastSegment(),u=o.popLast();return r.put({collectionId:c,parent:st(u)})}};return t.store(tr).Z({Y:!0},(o,c)=>{const u=new we(o);return i(u.popLast())}).next(()=>t.store(hs).Z({Y:!0},([o,c,u],d)=>{const f=$t(c);return i(f.popLast())}))}li(e){const t=e.store(fs);return t.Z((r,s)=>{const i=ci(s),o=v_(this.serializer,i);return t.put(o)})}hi(e,t){const r=t.store(tr),s=[];return r.Z((i,o)=>{const c=t.store(va),u=function(p){return p.document?new J(we.fromString(p.document.name).popFirst(5)):p.noDocument?J.fromSegments(p.noDocument.path):p.unknownDocument?J.fromSegments(p.unknownDocument.path):ee()}(o).path.toArray(),d={prefixPath:u.slice(0,u.length-2),collectionGroup:u[u.length-2],documentId:u[u.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};s.push(c.put(d))}).next(()=>D.waitFor(s))}Pi(e,t){const r=t.store(Dt),s=P_(this.serializer),i=new Uu(fc.ri,this.serializer.Tt);return r.G().next(o=>{const c=new Map;return o.forEach(u=>{var d;let f=(d=c.get(u.userId))!==null&&d!==void 0?d:pe();ir(this.serializer,u).keys().forEach(p=>f=f.add(p)),c.set(u.userId,f)}),D.forEach(c,(u,d)=>{const f=new ht(d),p=dc.It(this.serializer,f),g=i.getIndexManager(f),b=hc.It(f,this.serializer,g,i.referenceDelegate);return new x_(s,b,p,g).recalculateAndSaveOverlaysForDocumentKeys(new Pl(t,Pt.ae),u).next()})})}}function ap(n){n.createObjectStore(ps,{keyPath:ET}).createIndex(Iu,TT,{unique:!0}),n.createObjectStore(fs,{keyPath:"targetId"}).createIndex(vg,IT,{unique:!0}),n.createObjectStore(fr)}const yn="IndexedDbPersistence",tl=18e5,nl=5e3,rl="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",s0="main";class Bu{constructor(e,t,r,s,i,o,c,u,d,f,p=17){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.Ti=i,this.window=o,this.document=c,this.Ii=d,this.Ei=f,this.di=p,this.Gr=null,this.zr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Ai=null,this.inForeground=!1,this.Ri=null,this.Vi=null,this.mi=Number.NEGATIVE_INFINITY,this.fi=g=>Promise.resolve(),!Bu.D())throw new W(B.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new GA(this,s),this.gi=t+s0,this.serializer=new __(u),this.pi=new Nn(this.gi,this.di,new r0(this.serializer)),this.jr=new VA,this.Hr=new qA(this.referenceDelegate,this.serializer),this.remoteDocumentCache=P_(this.serializer),this.Yr=new DA,this.window&&this.window.localStorage?this.yi=this.window.localStorage:(this.yi=null,f===!1&&ft(yn,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.wi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new W(B.FAILED_PRECONDITION,rl);return this.Si(),this.bi(),this.Di(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Hr.getHighestSequenceNumber(e))}).then(e=>{this.Gr=new Pt(e,this.Ii)}).then(()=>{this.zr=!0}).catch(e=>(this.pi&&this.pi.close(),Promise.reject(e)))}Ci(e){return this.fi=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.pi.k(async t=>{t.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Ti.enqueueAndForget(async()=>{this.started&&await this.wi()}))}wi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>Po(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.Fi(e).next(t=>{t||(this.isPrimary=!1,this.Ti.enqueueRetryable(()=>this.fi(!1)))})}).next(()=>this.Mi(e)).next(t=>this.isPrimary&&!t?this.xi(e).next(()=>!1):!!t&&this.Oi(e).next(()=>!0))).catch(e=>{if($n(e))return K(yn,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return K(yn,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Ti.enqueueRetryable(()=>this.fi(e)),this.isPrimary=e})}Fi(e){return ei(e).get(qr).next(t=>D.resolve(this.Ni(t)))}Bi(e){return Po(e).delete(this.clientId)}async Li(){if(this.isPrimary&&!this.ki(this.mi,tl)){this.mi=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{const r=He(t,ms);return r.G().next(s=>{const i=this.qi(s,tl),o=s.filter(c=>i.indexOf(c)===-1);return D.forEach(o,c=>r.delete(c.clientId)).next(()=>o)})}).catch(()=>[]);if(this.yi)for(const t of e)this.yi.removeItem(this.Qi(t.clientId))}}Di(){this.Vi=this.Ti.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.wi().then(()=>this.Li()).then(()=>this.Di()))}Ni(e){return!!e&&e.ownerId===this.clientId}Mi(e){return this.Ei?D.resolve(!0):ei(e).get(qr).next(t=>{if(t!==null&&this.ki(t.leaseTimestampMs,nl)&&!this.$i(t.ownerId)){if(this.Ni(t)&&this.networkEnabled)return!0;if(!this.Ni(t)){if(!t.allowTabSynchronization)throw new W(B.FAILED_PRECONDITION,rl);return!1}}return!(!this.networkEnabled||!this.inForeground)||Po(e).G().next(r=>this.qi(r,nl).find(s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,o=!this.inForeground&&s.inForeground,c=this.networkEnabled===s.networkEnabled;if(i||o&&c)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&K(yn,`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.zr=!1,this.Ui(),this.Vi&&(this.Vi.cancel(),this.Vi=null),this.Ki(),this.Wi(),await this.pi.runTransaction("shutdown","readwrite",[Wi,ms],e=>{const t=new Pl(e,Pt.ae);return this.xi(t).next(()=>this.Bi(t))}),this.pi.close(),this.Gi()}qi(e,t){return e.filter(r=>this.ki(r.updateTimeMs,t)&&!this.$i(r.clientId))}zi(){return this.runTransaction("getActiveClients","readonly",e=>Po(e).G().next(t=>this.qi(t,tl).map(r=>r.clientId)))}get started(){return this.zr}getGlobalsCache(){return this.jr}getMutationQueue(e,t){return hc.It(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Hr}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new $A(e,this.serializer.Tt.databaseId)}getDocumentOverlayCache(e){return dc.It(this.serializer,e)}getBundleCache(){return this.Yr}runTransaction(e,t,r){K(yn,"Starting transaction:",e);const s=t==="readonly"?"readonly":"readwrite",i=function(u){return u===17?$T:u===16?BT:u===15?Au:u===14?Tg:u===13?Eg:u===12?UT:u===11?Ig:void ee()}(this.di);let o;return this.pi.runTransaction(e,s,i,c=>(o=new Pl(c,this.Gr?this.Gr.next():Pt.ae),t==="readwrite-primary"?this.Fi(o).next(u=>!!u||this.Mi(o)).next(u=>{if(!u)throw ft(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Ti.enqueueRetryable(()=>this.fi(!1)),new W(B.FAILED_PRECONDITION,fg);return r(o)}).next(u=>this.Oi(o).next(()=>u)):this.ji(o).next(()=>r(o)))).then(c=>(o.raiseOnCommittedEvent(),c))}ji(e){return ei(e).get(qr).next(t=>{if(t!==null&&this.ki(t.leaseTimestampMs,nl)&&!this.$i(t.ownerId)&&!this.Ni(t)&&!(this.Ei||this.allowTabSynchronization&&t.allowTabSynchronization))throw new W(B.FAILED_PRECONDITION,rl)})}Oi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return ei(e).put(qr,t)}static D(){return Nn.D()}xi(e){const t=ei(e);return t.get(qr).next(r=>this.Ni(r)?(K(yn,"Releasing primary lease."),t.delete(qr)):D.resolve())}ki(e,t){const r=Date.now();return!(e<r-t)&&(!(e>r)||(ft(`Detected an update time that is in the future: ${e} > ${r}`),!1))}Si(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ri=()=>{this.Ti.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.wi()))},this.document.addEventListener("visibilitychange",this.Ri),this.inForeground=this.document.visibilityState==="visible")}Ki(){this.Ri&&(this.document.removeEventListener("visibilitychange",this.Ri),this.Ri=null)}bi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Ai=()=>{this.Ui();const t=/(?:Version|Mobile)\/1[456]/;gm()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.Ti.enterRestrictedMode(!0),this.Ti.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Ai))}Wi(){this.Ai&&(this.window.removeEventListener("pagehide",this.Ai),this.Ai=null)}$i(e){var t;try{const r=((t=this.yi)===null||t===void 0?void 0:t.getItem(this.Qi(e)))!==null;return K(yn,`Client '${e}' ${r?"is":"is not"} zombied in LocalStorage`),r}catch(r){return ft(yn,"Failed to get zombied client id.",r),!1}}Ui(){if(this.yi)try{this.yi.setItem(this.Qi(this.clientId),String(Date.now()))}catch(e){ft("Failed to set zombie client id.",e)}}Gi(){if(this.yi)try{this.yi.removeItem(this.Qi(this.clientId))}catch{}}Qi(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function ei(n){return He(n,Wi)}function Po(n){return He(n,ms)}function i0(n,e){let t=n.projectId;return n.isDefaultDatabase||(t+="."+n.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $u{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Hi=r,this.Ji=s}static Yi(e,t){let r=pe(),s=pe();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new $u(e,t.fromCache,r,s)}}/**
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
 */class o0{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N_{constructor(){this.Zi=!1,this.Xi=!1,this.es=100,this.ts=function(){return gm()?8:mg(Ge())>0?6:4}()}initialize(e,t){this.ns=e,this.indexManager=t,this.Zi=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.rs(e,t).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.ss(e,t,s,r).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new o0;return this._s(e,t,o).next(c=>{if(i.result=c,this.Xi)return this.us(e,t,o,c.size)})}).next(()=>i.result)}us(e,t,r,s){return r.documentReadCount<this.es?(Wr()<=ge.DEBUG&&K("QueryEngine","SDK will not create cache indexes for query:",Qr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.es,"documents"),D.resolve()):(Wr()<=ge.DEBUG&&K("QueryEngine","Query:",Qr(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.ts*s?(Wr()<=ge.DEBUG&&K("QueryEngine","The SDK decides to create cache indexes for query:",Qr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,xt(t))):D.resolve())}rs(e,t){if(Nf(t))return D.resolve(null);let r=xt(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=Aa(t,null,"F"),r=xt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const o=pe(...i);return this.ns.getDocuments(e,o).next(c=>this.indexManager.getMinOffset(e,r).next(u=>{const d=this.cs(t,c);return this.ls(t,d,o,u.readTime)?this.rs(e,Aa(t,null,"F")):this.hs(e,d,t,u)}))})))}ss(e,t,r,s){return Nf(t)||s.isEqual(ie.min())?D.resolve(null):this.ns.getDocuments(e,r).next(i=>{const o=this.cs(t,i);return this.ls(t,o,r,s)?D.resolve(null):(Wr()<=ge.DEBUG&&K("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Qr(t)),this.hs(e,o,t,uT(s,Ri)).next(c=>c))})}cs(e,t){let r=new Te(jg(e));return t.forEach((s,i)=>{Ji(e,i)&&(r=r.add(i))}),r}ls(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}_s(e,t,r){return Wr()<=ge.DEBUG&&K("QueryEngine","Using full collection scan to execute query:",Qr(t)),this.ns.getDocumentsMatchingQuery(e,t,St.min(),r)}hs(e,t,r,s){return this.ns.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qu="LocalStore",a0=3e8;class c0{constructor(e,t,r,s){this.persistence=e,this.Ps=t,this.serializer=s,this.Ts=new xe(ue),this.Is=new dn(i=>wr(i),Qi),this.Es=new Map,this.ds=e.getRemoteDocumentCache(),this.Hr=e.getTargetCache(),this.Yr=e.getBundleCache(),this.As(r)}As(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new x_(this.ds,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.ds.setIndexManager(this.indexManager),this.Ps.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ts))}}function D_(n,e,t,r){return new c0(n,e,t,r)}async function V_(n,e){const t=de(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.As(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const o=[],c=[];let u=pe();for(const d of s){o.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}for(const d of i){c.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(r,u).next(d=>({Rs:d,removedBatchIds:o,addedBatchIds:c}))})})}function l0(n,e){const t=de(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.ds.newChangeBuffer({trackRemovals:!0});return function(c,u,d,f){const p=d.batch,g=p.keys();let b=D.resolve();return g.forEach(E=>{b=b.next(()=>f.getEntry(u,E)).next(S=>{const A=d.docVersions.get(E);te(A!==null),S.version.compareTo(A)<0&&(p.applyToRemoteDocument(S,d),S.isValidDocument()&&(S.setReadTime(d.commitVersion),f.addEntry(S)))})}),b.next(()=>c.mutationQueue.removeMutationBatch(u,p))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let u=pe();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(u=u.add(c.batch.mutations[d].key));return u}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function O_(n){const e=de(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Hr.getLastRemoteSnapshotVersion(t))}function u0(n,e){const t=de(n),r=e.snapshotVersion;let s=t.Ts;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=t.ds.newChangeBuffer({trackRemovals:!0});s=t.Ts;const c=[];e.targetChanges.forEach((f,p)=>{const g=s.get(p);if(!g)return;c.push(t.Hr.removeMatchingKeys(i,f.removedDocuments,p).next(()=>t.Hr.addMatchingKeys(i,f.addedDocuments,p)));let b=g.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?b=b.withResumeToken(je.EMPTY_BYTE_STRING,ie.min()).withLastLimboFreeSnapshotVersion(ie.min()):f.resumeToken.approximateByteSize()>0&&(b=b.withResumeToken(f.resumeToken,r)),s=s.insert(p,b),function(S,A,O){return S.resumeToken.approximateByteSize()===0||A.snapshotVersion.toMicroseconds()-S.snapshotVersion.toMicroseconds()>=a0?!0:O.addedDocuments.size+O.modifiedDocuments.size+O.removedDocuments.size>0}(g,b,f)&&c.push(t.Hr.updateTargetData(i,b))});let u=Et(),d=pe();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))}),c.push(d0(i,o,e.documentUpdates).next(f=>{u=f.Vs,d=f.fs})),!r.isEqual(ie.min())){const f=t.Hr.getLastRemoteSnapshotVersion(i).next(p=>t.Hr.setTargetsMetadata(i,i.currentSequenceNumber,r));c.push(f)}return D.waitFor(c).next(()=>o.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,u,d)).next(()=>u)}).then(i=>(t.Ts=s,i))}function d0(n,e,t){let r=pe(),s=pe();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let o=Et();return t.forEach((c,u)=>{const d=i.get(c);u.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual(ie.min())?(e.removeEntry(c,u.readTime),o=o.insert(c,u)):!d.isValidDocument()||u.version.compareTo(d.version)>0||u.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(u),o=o.insert(c,u)):K(qu,"Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",u.version)}),{Vs:o,fs:s}})}function h0(n,e){const t=de(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=hr),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function f0(n,e){const t=de(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.Hr.getTargetData(r,e).next(i=>i?(s=i,D.resolve(s)):t.Hr.allocateTargetId(r).next(o=>(s=new rn(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.Hr.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.Ts.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Ts=t.Ts.insert(r.targetId,r),t.Is.set(e,r.targetId)),r})}async function zl(n,e,t){const r=de(n),s=r.Ts.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!$n(o))throw o;K(qu,`Failed to update sequence numbers for target ${e}: ${o}`)}r.Ts=r.Ts.remove(e),r.Is.delete(s.target)}function cp(n,e,t){const r=de(n);let s=ie.min(),i=pe();return r.persistence.runTransaction("Execute query","readwrite",o=>function(u,d,f){const p=de(u),g=p.Is.get(f);return g!==void 0?D.resolve(p.Ts.get(g)):p.Hr.getTargetData(d,f)}(r,o,xt(e)).next(c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.Hr.getMatchingKeysForTargetId(o,c.targetId).next(u=>{i=u})}).next(()=>r.Ps.getDocumentsMatchingQuery(o,e,t?s:ie.min(),t?i:pe())).next(c=>(p0(r,nA(e),c),{documents:c,gs:i})))}function p0(n,e,t){let r=n.Es.get(e)||ie.min();t.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.Es.set(e,r)}class lp{constructor(){this.activeTargetIds=cA()}Ds(e){this.activeTargetIds=this.activeTargetIds.add(e)}vs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}bs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class L_{constructor(){this.ho=new lp,this.Po={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.ho.Ds(e),this.Po[e]||"not-current"}updateQueryState(e,t,r){this.Po[e]=t}removeLocalQueryTarget(e){this.ho.vs(e)}isLocalQueryTarget(e){return this.ho.activeTargetIds.has(e)}clearQueryState(e){delete this.Po[e]}getAllActiveQueryTargets(){return this.ho.activeTargetIds}isActiveQueryTarget(e){return this.ho.activeTargetIds.has(e)}start(){return this.ho=new lp,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class m0{To(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const up="ConnectivityMonitor";class dp{constructor(){this.Io=()=>this.Eo(),this.Ao=()=>this.Ro(),this.Vo=[],this.mo()}To(e){this.Vo.push(e)}shutdown(){window.removeEventListener("online",this.Io),window.removeEventListener("offline",this.Ao)}mo(){window.addEventListener("online",this.Io),window.addEventListener("offline",this.Ao)}Eo(){K(up,"Network connectivity changed: AVAILABLE");for(const e of this.Vo)e(0)}Ro(){K(up,"Network connectivity changed: UNAVAILABLE");for(const e of this.Vo)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let xo=null;function Gl(){return xo===null?xo=function(){return 268435456+Math.round(2147483648*Math.random())}():xo++,"0x"+xo.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sl="RestConnection",g0={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class _0{get fo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.po=t+"://"+e.host,this.yo=`projects/${r}/databases/${s}`,this.wo=this.databaseId.database===Ia?`project_id=${r}`:`project_id=${r}&database_id=${s}`}So(e,t,r,s,i){const o=Gl(),c=this.bo(e,t.toUriEncodedString());K(sl,`Sending RPC '${e}' ${o}:`,c,r);const u={"google-cloud-resource-prefix":this.yo,"x-goog-request-params":this.wo};return this.Do(u,s,i),this.vo(e,c,u,r).then(d=>(K(sl,`Received RPC '${e}' ${o}: `,d),d),d=>{throw Ai(sl,`RPC '${e}' ${o} failed with error: `,d,"url: ",c,"request:",r),d})}Co(e,t,r,s,i,o){return this.So(e,t,r,s,i)}Do(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Ds}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}bo(e,t){const r=g0[e];return`${this.po}/v1/${t}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v0{constructor(e){this.Fo=e.Fo,this.Mo=e.Mo}xo(e){this.Oo=e}No(e){this.Bo=e}Lo(e){this.ko=e}onMessage(e){this.qo=e}close(){this.Mo()}send(e){this.Fo(e)}Qo(){this.Oo()}$o(){this.Bo()}Uo(e){this.ko(e)}Ko(e){this.qo(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const et="WebChannelConnection";class y0 extends _0{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}vo(e,t,r,s){const i=Gl();return new Promise((o,c)=>{const u=new ig;u.setWithCredentials(!0),u.listenOnce(og.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case Ko.NO_ERROR:const f=u.getResponseJson();K(et,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(f)),o(f);break;case Ko.TIMEOUT:K(et,`RPC '${e}' ${i} timed out`),c(new W(B.DEADLINE_EXCEEDED,"Request time out"));break;case Ko.HTTP_ERROR:const p=u.getStatus();if(K(et,`RPC '${e}' ${i} failed with status:`,p,"response text:",u.getResponseText()),p>0){let g=u.getResponseJson();Array.isArray(g)&&(g=g[0]);const b=g?.error;if(b&&b.status&&b.message){const E=function(A){const O=A.toLowerCase().replace(/_/g,"-");return Object.values(B).indexOf(O)>=0?O:B.UNKNOWN}(b.status);c(new W(E,b.message))}else c(new W(B.UNKNOWN,"Server responded with status "+u.getStatus()))}else c(new W(B.UNAVAILABLE,"Connection failed."));break;default:ee()}}finally{K(et,`RPC '${e}' ${i} completed.`)}});const d=JSON.stringify(s);K(et,`RPC '${e}' ${i} sending request:`,s),u.send(t,"POST",d,r,15)})}Wo(e,t,r){const s=Gl(),i=[this.po,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=lg(),c=cg(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(u.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Do(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;const f=i.join("");K(et,`Creating RPC '${e}' stream ${s}: ${f}`,u);const p=o.createWebChannel(f,u);let g=!1,b=!1;const E=new v0({Fo:A=>{b?K(et,`Not sending because RPC '${e}' stream ${s} is closed:`,A):(g||(K(et,`Opening RPC '${e}' stream ${s} transport.`),p.open(),g=!0),K(et,`RPC '${e}' stream ${s} sending:`,A),p.send(A))},Mo:()=>p.close()}),S=(A,O,k)=>{A.listen(O,x=>{try{k(x)}catch(M){setTimeout(()=>{throw M},0)}})};return S(p,ii.EventType.OPEN,()=>{b||(K(et,`RPC '${e}' stream ${s} transport opened.`),E.Qo())}),S(p,ii.EventType.CLOSE,()=>{b||(b=!0,K(et,`RPC '${e}' stream ${s} transport closed`),E.Uo())}),S(p,ii.EventType.ERROR,A=>{b||(b=!0,Ai(et,`RPC '${e}' stream ${s} transport errored:`,A),E.Uo(new W(B.UNAVAILABLE,"The operation could not be completed")))}),S(p,ii.EventType.MESSAGE,A=>{var O;if(!b){const k=A.data[0];te(!!k);const x=k,M=x?.error||((O=x[0])===null||O===void 0?void 0:O.error);if(M){K(et,`RPC '${e}' stream ${s} received error:`,M);const P=M.status;let F=function(w){const R=qe[w];if(R!==void 0)return r_(R)}(P),T=M.message;F===void 0&&(F=B.INTERNAL,T="Unknown error status: "+P+" with message "+M.message),b=!0,E.Uo(new W(F,T)),p.close()}else K(et,`RPC '${e}' stream ${s} received:`,k),E.Ko(k)}}),S(c,ag.STAT_EVENT,A=>{A.stat===El.PROXY?K(et,`RPC '${e}' stream ${s} detected buffering proxy`):A.stat===El.NOPROXY&&K(et,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{E.$o()},0),E}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */function b0(){return typeof window<"u"?window:null}function na(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pc(n){return new IA(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M_{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Ti=e,this.timerId=t,this.Go=r,this.zo=s,this.jo=i,this.Ho=0,this.Jo=null,this.Yo=Date.now(),this.reset()}reset(){this.Ho=0}Zo(){this.Ho=this.jo}Xo(e){this.cancel();const t=Math.floor(this.Ho+this.e_()),r=Math.max(0,Date.now()-this.Yo),s=Math.max(0,t-r);s>0&&K("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ho} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Jo=this.Ti.enqueueAfterDelay(this.timerId,s,()=>(this.Yo=Date.now(),e())),this.Ho*=this.zo,this.Ho<this.Go&&(this.Ho=this.Go),this.Ho>this.jo&&(this.Ho=this.jo)}t_(){this.Jo!==null&&(this.Jo.skipDelay(),this.Jo=null)}cancel(){this.Jo!==null&&(this.Jo.cancel(),this.Jo=null)}e_(){return(Math.random()-.5)*this.Ho}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hp="PersistentStream";class F_{constructor(e,t,r,s,i,o,c,u){this.Ti=e,this.n_=r,this.r_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.i_=0,this.s_=null,this.o_=null,this.stream=null,this.__=0,this.a_=new M_(e,t)}u_(){return this.state===1||this.state===5||this.c_()}c_(){return this.state===2||this.state===3}start(){this.__=0,this.state!==4?this.auth():this.l_()}async stop(){this.u_()&&await this.close(0)}h_(){this.state=0,this.a_.reset()}P_(){this.c_()&&this.s_===null&&(this.s_=this.Ti.enqueueAfterDelay(this.n_,6e4,()=>this.T_()))}I_(e){this.E_(),this.stream.send(e)}async T_(){if(this.c_())return this.close(0)}E_(){this.s_&&(this.s_.cancel(),this.s_=null)}d_(){this.o_&&(this.o_.cancel(),this.o_=null)}async close(e,t){this.E_(),this.d_(),this.a_.cancel(),this.i_++,e!==4?this.a_.reset():t&&t.code===B.RESOURCE_EXHAUSTED?(ft(t.toString()),ft("Using maximum backoff delay to prevent overloading the backend."),this.a_.Zo()):t&&t.code===B.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.A_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Lo(t)}A_(){}auth(){this.state=1;const e=this.R_(this.i_),t=this.i_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.i_===t&&this.V_(r,s)},r=>{e(()=>{const s=new W(B.UNKNOWN,"Fetching auth token failed: "+r.message);return this.m_(s)})})}V_(e,t){const r=this.R_(this.i_);this.stream=this.f_(e,t),this.stream.xo(()=>{r(()=>this.listener.xo())}),this.stream.No(()=>{r(()=>(this.state=2,this.o_=this.Ti.enqueueAfterDelay(this.r_,1e4,()=>(this.c_()&&(this.state=3),Promise.resolve())),this.listener.No()))}),this.stream.Lo(s=>{r(()=>this.m_(s))}),this.stream.onMessage(s=>{r(()=>++this.__==1?this.g_(s):this.onNext(s))})}l_(){this.state=5,this.a_.Xo(async()=>{this.state=0,this.start()})}m_(e){return K(hp,`close with error: ${e}`),this.stream=null,this.close(4,e)}R_(e){return t=>{this.Ti.enqueueAndForget(()=>this.i_===e?t():(K(hp,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class w0 extends F_{constructor(e,t,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}f_(e,t){return this.connection.Wo("Listen",e,t)}g_(e){return this.onNext(e)}onNext(e){this.a_.reset();const t=AA(this.serializer,e),r=function(i){if(!("targetChange"in i))return ie.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?ie.min():o.readTime?pt(o.readTime):ie.min()}(e);return this.listener.p_(t,r)}y_(e){const t={};t.database=Ul(this.serializer),t.addTarget=function(i,o){let c;const u=o.target;if(c=Ea(u)?{documents:d_(i,u)}:{query:h_(i,u).ht},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=o_(i,o.resumeToken);const d=Ml(i,o.expectedCount);d!==null&&(c.expectedCount=d)}else if(o.snapshotVersion.compareTo(ie.min())>0){c.readTime=Is(i,o.snapshotVersion.toTimestamp());const d=Ml(i,o.expectedCount);d!==null&&(c.expectedCount=d)}return c}(this.serializer,e);const r=SA(this.serializer,e);r&&(t.labels=r),this.I_(t)}w_(e){const t={};t.database=Ul(this.serializer),t.removeTarget=e,this.I_(t)}}class I0 extends F_{constructor(e,t,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}get S_(){return this.__>0}start(){this.lastStreamToken=void 0,super.start()}A_(){this.S_&&this.b_([])}f_(e,t){return this.connection.Wo("Write",e,t)}g_(e){return te(!!e.streamToken),this.lastStreamToken=e.streamToken,te(!e.writeResults||e.writeResults.length===0),this.listener.D_()}onNext(e){te(!!e.streamToken),this.lastStreamToken=e.streamToken,this.a_.reset();const t=RA(e.writeResults,e.commitTime),r=pt(e.commitTime);return this.listener.v_(r,t)}C_(){const e={};e.database=Ul(this.serializer),this.I_(e)}b_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>Sa(this.serializer,r))};this.I_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E0{}class T0 extends E0{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.F_=!1}M_(){if(this.F_)throw new W(B.FAILED_PRECONDITION,"The client has already been terminated.")}So(e,t,r,s){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.So(e,Fl(t,r),s,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===B.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new W(B.UNKNOWN,i.toString())})}Co(e,t,r,s,i){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.Co(e,Fl(t,r),s,o,c,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===B.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new W(B.UNKNOWN,o.toString())})}terminate(){this.F_=!0,this.connection.terminate()}}class A0{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.x_=0,this.O_=null,this.N_=!0}B_(){this.x_===0&&(this.L_("Unknown"),this.O_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.O_=null,this.k_("Backend didn't respond within 10 seconds."),this.L_("Offline"),Promise.resolve())))}q_(e){this.state==="Online"?this.L_("Unknown"):(this.x_++,this.x_>=1&&(this.Q_(),this.k_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.L_("Offline")))}set(e){this.Q_(),this.x_=0,e==="Online"&&(this.N_=!1),this.L_(e)}L_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}k_(e){const t=`Could not reach Cloud Firestore backend. ${e}
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
 */const Ar="RemoteStore";class R0{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.U_=[],this.K_=new Map,this.W_=new Set,this.G_=[],this.z_=i,this.z_.To(o=>{r.enqueueAndForget(async()=>{Vr(this)&&(K(Ar,"Restarting streams for network reachability change."),await async function(u){const d=de(u);d.W_.add(4),await Zi(d),d.j_.set("Unknown"),d.W_.delete(4),await mc(d)}(this))})}),this.j_=new A0(r,s)}}async function mc(n){if(Vr(n))for(const e of n.G_)await e(!0)}async function Zi(n){for(const e of n.G_)await e(!1)}function U_(n,e){const t=de(n);t.K_.has(e.targetId)||(t.K_.set(e.targetId,e),Hu(t)?Gu(t):Os(t).c_()&&zu(t,e))}function ju(n,e){const t=de(n),r=Os(t);t.K_.delete(e),r.c_()&&B_(t,e),t.K_.size===0&&(r.c_()?r.P_():Vr(t)&&t.j_.set("Unknown"))}function zu(n,e){if(n.H_.Ne(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(ie.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Os(n).y_(e)}function B_(n,e){n.H_.Ne(e),Os(n).w_(e)}function Gu(n){n.H_=new vA({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),lt:e=>n.K_.get(e)||null,it:()=>n.datastore.serializer.databaseId}),Os(n).start(),n.j_.B_()}function Hu(n){return Vr(n)&&!Os(n).u_()&&n.K_.size>0}function Vr(n){return de(n).W_.size===0}function $_(n){n.H_=void 0}async function S0(n){n.j_.set("Online")}async function k0(n){n.K_.forEach((e,t)=>{zu(n,e)})}async function C0(n,e){$_(n),Hu(n)?(n.j_.q_(e),Gu(n)):n.j_.set("Unknown")}async function P0(n,e,t){if(n.j_.set("Online"),e instanceof i_&&e.state===2&&e.cause)try{await async function(s,i){const o=i.cause;for(const c of i.targetIds)s.K_.has(c)&&(await s.remoteSyncer.rejectListen(c,o),s.K_.delete(c),s.H_.removeTarget(c))}(n,e)}catch(r){K(Ar,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Na(n,r)}else if(e instanceof ta?n.H_.We(e):e instanceof s_?n.H_.Ze(e):n.H_.je(e),!t.isEqual(ie.min()))try{const r=await O_(n.localStore);t.compareTo(r)>=0&&await function(i,o){const c=i.H_.ot(o);return c.targetChanges.forEach((u,d)=>{if(u.resumeToken.approximateByteSize()>0){const f=i.K_.get(d);f&&i.K_.set(d,f.withResumeToken(u.resumeToken,o))}}),c.targetMismatches.forEach((u,d)=>{const f=i.K_.get(u);if(!f)return;i.K_.set(u,f.withResumeToken(je.EMPTY_BYTE_STRING,f.snapshotVersion)),B_(i,u);const p=new rn(f.target,u,d,f.sequenceNumber);zu(i,p)}),i.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){K(Ar,"Failed to raise snapshot:",r),await Na(n,r)}}async function Na(n,e,t){if(!$n(e))throw e;n.W_.add(1),await Zi(n),n.j_.set("Offline"),t||(t=()=>O_(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{K(Ar,"Retrying IndexedDB access"),await t(),n.W_.delete(1),await mc(n)})}function q_(n,e){return e().catch(t=>Na(n,t,e))}async function eo(n){const e=de(n),t=Mn(e);let r=e.U_.length>0?e.U_[e.U_.length-1].batchId:hr;for(;x0(e);)try{const s=await h0(e.localStore,r);if(s===null){e.U_.length===0&&t.P_();break}r=s.batchId,N0(e,s)}catch(s){await Na(e,s)}j_(e)&&z_(e)}function x0(n){return Vr(n)&&n.U_.length<10}function N0(n,e){n.U_.push(e);const t=Mn(n);t.c_()&&t.S_&&t.b_(e.mutations)}function j_(n){return Vr(n)&&!Mn(n).u_()&&n.U_.length>0}function z_(n){Mn(n).start()}async function D0(n){Mn(n).C_()}async function V0(n){const e=Mn(n);for(const t of n.U_)e.b_(t.mutations)}async function O0(n,e,t){const r=n.U_.shift(),s=Nu.from(r,e,t);await q_(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await eo(n)}async function L0(n,e){e&&Mn(n).S_&&await async function(r,s){if(function(o){return gA(o)&&o!==B.ABORTED}(s.code)){const i=r.U_.shift();Mn(r).h_(),await q_(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await eo(r)}}(n,e),j_(n)&&z_(n)}async function fp(n,e){const t=de(n);t.asyncQueue.verifyOperationInProgress(),K(Ar,"RemoteStore received new credentials");const r=Vr(t);t.W_.add(3),await Zi(t),r&&t.j_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.W_.delete(3),await mc(t)}async function M0(n,e){const t=de(n);e?(t.W_.delete(2),await mc(t)):e||(t.W_.add(2),await Zi(t),t.j_.set("Unknown"))}function Os(n){return n.J_||(n.J_=function(t,r,s){const i=de(t);return i.M_(),new w0(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{xo:S0.bind(null,n),No:k0.bind(null,n),Lo:C0.bind(null,n),p_:P0.bind(null,n)}),n.G_.push(async e=>{e?(n.J_.h_(),Hu(n)?Gu(n):n.j_.set("Unknown")):(await n.J_.stop(),$_(n))})),n.J_}function Mn(n){return n.Y_||(n.Y_=function(t,r,s){const i=de(t);return i.M_(),new I0(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{xo:()=>Promise.resolve(),No:D0.bind(null,n),Lo:L0.bind(null,n),D_:V0.bind(null,n),v_:O0.bind(null,n)}),n.G_.push(async e=>{e?(n.Y_.h_(),await eo(n)):(await n.Y_.stop(),n.U_.length>0&&(K(Ar,`Stopping write stream with ${n.U_.length} pending writes`),n.U_=[]))})),n.Y_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ku{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Ht,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const o=Date.now()+r,c=new Ku(e,t,o,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new W(B.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Wu(n,e){if(ft("AsyncQueue",`${e}: ${n}`),$n(n))return new W(B.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class os{static emptySet(e){return new os(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||J.comparator(t.key,r.key):(t,r)=>J.comparator(t.key,r.key),this.keyedMap=oi(),this.sortedSet=new xe(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof os)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new os;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pp{constructor(){this.Z_=new xe(J.comparator)}track(e){const t=e.doc.key,r=this.Z_.get(t);r?e.type!==0&&r.type===3?this.Z_=this.Z_.insert(t,e):e.type===3&&r.type!==1?this.Z_=this.Z_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.Z_=this.Z_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.Z_=this.Z_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.Z_=this.Z_.remove(t):e.type===1&&r.type===2?this.Z_=this.Z_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.Z_=this.Z_.insert(t,{type:2,doc:e.doc}):ee():this.Z_=this.Z_.insert(t,e)}X_(){const e=[];return this.Z_.inorderTraversal((t,r)=>{e.push(r)}),e}}class Es{constructor(e,t,r,s,i,o,c,u,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,s,i){const o=[];return t.forEach(c=>{o.push({type:0,doc:c})}),new Es(e,t,os.emptySet(t),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&oc(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F0{constructor(){this.ea=void 0,this.ta=[]}na(){return this.ta.some(e=>e.ra())}}class U0{constructor(){this.queries=mp(),this.onlineState="Unknown",this.ia=new Set}terminate(){(function(t,r){const s=de(t),i=s.queries;s.queries=mp(),i.forEach((o,c)=>{for(const u of c.ta)u.onError(r)})})(this,new W(B.ABORTED,"Firestore shutting down"))}}function mp(){return new dn(n=>qg(n),oc)}async function Qu(n,e){const t=de(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.na()&&e.ra()&&(r=2):(i=new F0,r=e.ra()?0:1);try{switch(r){case 0:i.ea=await t.onListen(s,!0);break;case 1:i.ea=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const c=Wu(o,`Initialization of query '${Qr(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.ta.push(e),e.sa(t.onlineState),i.ea&&e.oa(i.ea)&&Ju(t)}async function Yu(n,e){const t=de(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const o=i.ta.indexOf(e);o>=0&&(i.ta.splice(o,1),i.ta.length===0?s=e.ra()?0:1:!i.na()&&e.ra()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function B0(n,e){const t=de(n);let r=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const c of o.ta)c.oa(s)&&(r=!0);o.ea=s}}r&&Ju(t)}function $0(n,e,t){const r=de(n),s=r.queries.get(e);if(s)for(const i of s.ta)i.onError(t);r.queries.delete(e)}function Ju(n){n.ia.forEach(e=>{e.next()})}var Hl,gp;(gp=Hl||(Hl={}))._a="default",gp.Cache="cache";class Xu{constructor(e,t,r){this.query=e,this.aa=t,this.ua=!1,this.ca=null,this.onlineState="Unknown",this.options=r||{}}oa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Es(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.ua?this.la(e)&&(this.aa.next(e),t=!0):this.ha(e,this.onlineState)&&(this.Pa(e),t=!0),this.ca=e,t}onError(e){this.aa.error(e)}sa(e){this.onlineState=e;let t=!1;return this.ca&&!this.ua&&this.ha(this.ca,e)&&(this.Pa(this.ca),t=!0),t}ha(e,t){if(!e.fromCache||!this.ra())return!0;const r=t!=="Offline";return(!this.options.Ta||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}la(e){if(e.docChanges.length>0)return!0;const t=this.ca&&this.ca.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}Pa(e){e=Es.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.ua=!0,this.aa.next(e)}ra(){return this.options.source!==Hl.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G_{constructor(e){this.key=e}}class H_{constructor(e){this.key=e}}class q0{constructor(e,t){this.query=e,this.fa=t,this.ga=null,this.hasCachedResults=!1,this.current=!1,this.pa=pe(),this.mutatedKeys=pe(),this.ya=jg(e),this.wa=new os(this.ya)}get Sa(){return this.fa}ba(e,t){const r=t?t.Da:new pp,s=t?t.wa:this.wa;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,c=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((f,p)=>{const g=s.get(f),b=Ji(this.query,p)?p:null,E=!!g&&this.mutatedKeys.has(g.key),S=!!b&&(b.hasLocalMutations||this.mutatedKeys.has(b.key)&&b.hasCommittedMutations);let A=!1;g&&b?g.data.isEqual(b.data)?E!==S&&(r.track({type:3,doc:b}),A=!0):this.va(g,b)||(r.track({type:2,doc:b}),A=!0,(u&&this.ya(b,u)>0||d&&this.ya(b,d)<0)&&(c=!0)):!g&&b?(r.track({type:0,doc:b}),A=!0):g&&!b&&(r.track({type:1,doc:g}),A=!0,(u||d)&&(c=!0)),A&&(b?(o=o.add(b),i=S?i.add(f):i.delete(f)):(o=o.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{wa:o,Da:r,ls:c,mutatedKeys:i}}va(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.wa;this.wa=e.wa,this.mutatedKeys=e.mutatedKeys;const o=e.Da.X_();o.sort((f,p)=>function(b,E){const S=A=>{switch(A){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return ee()}};return S(b)-S(E)}(f.type,p.type)||this.ya(f.doc,p.doc)),this.Ca(r),s=s!=null&&s;const c=t&&!s?this.Fa():[],u=this.pa.size===0&&this.current&&!s?1:0,d=u!==this.ga;return this.ga=u,o.length!==0||d?{snapshot:new Es(this.query,e.wa,i,o,e.mutatedKeys,u===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),Ma:c}:{Ma:c}}sa(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({wa:this.wa,Da:new pp,mutatedKeys:this.mutatedKeys,ls:!1},!1)):{Ma:[]}}xa(e){return!this.fa.has(e)&&!!this.wa.has(e)&&!this.wa.get(e).hasLocalMutations}Ca(e){e&&(e.addedDocuments.forEach(t=>this.fa=this.fa.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.fa=this.fa.delete(t)),this.current=e.current)}Fa(){if(!this.current)return[];const e=this.pa;this.pa=pe(),this.wa.forEach(r=>{this.xa(r.key)&&(this.pa=this.pa.add(r.key))});const t=[];return e.forEach(r=>{this.pa.has(r)||t.push(new H_(r))}),this.pa.forEach(r=>{e.has(r)||t.push(new G_(r))}),t}Oa(e){this.fa=e.gs,this.pa=pe();const t=this.ba(e.documents);return this.applyChanges(t,!0)}Na(){return Es.fromInitialDocuments(this.query,this.wa,this.mutatedKeys,this.ga===0,this.hasCachedResults)}}const Zu="SyncEngine";class j0{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class z0{constructor(e){this.key=e,this.Ba=!1}}class G0{constructor(e,t,r,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.La={},this.ka=new dn(c=>qg(c),oc),this.qa=new Map,this.Qa=new Set,this.$a=new xe(J.comparator),this.Ua=new Map,this.Ka=new Fu,this.Wa={},this.Ga=new Map,this.za=Tr.Kn(),this.onlineState="Unknown",this.ja=void 0}get isPrimaryClient(){return this.ja===!0}}async function H0(n,e,t=!0){const r=X_(n);let s;const i=r.ka.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Na()):s=await K_(r,e,t,!0),s}async function K0(n,e){const t=X_(n);await K_(t,e,!0,!1)}async function K_(n,e,t,r){const s=await f0(n.localStore,xt(e)),i=s.targetId,o=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await W0(n,e,i,o==="current",s.resumeToken)),n.isPrimaryClient&&t&&U_(n.remoteStore,s),c}async function W0(n,e,t,r,s){n.Ha=(p,g,b)=>async function(S,A,O,k){let x=A.view.ba(O);x.ls&&(x=await cp(S.localStore,A.query,!1).then(({documents:T})=>A.view.ba(T,x)));const M=k&&k.targetChanges.get(A.targetId),P=k&&k.targetMismatches.get(A.targetId)!=null,F=A.view.applyChanges(x,S.isPrimaryClient,M,P);return vp(S,A.targetId,F.Ma),F.snapshot}(n,p,g,b);const i=await cp(n.localStore,e,!0),o=new q0(e,i.gs),c=o.ba(i.documents),u=Xi.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),d=o.applyChanges(c,n.isPrimaryClient,u);vp(n,t,d.Ma);const f=new j0(e,t,o);return n.ka.set(e,f),n.qa.has(t)?n.qa.get(t).push(e):n.qa.set(t,[e]),d.snapshot}async function Q0(n,e,t){const r=de(n),s=r.ka.get(e),i=r.qa.get(s.targetId);if(i.length>1)return r.qa.set(s.targetId,i.filter(o=>!oc(o,e))),void r.ka.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await zl(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&ju(r.remoteStore,s.targetId),Kl(r,s.targetId)}).catch(Nr)):(Kl(r,s.targetId),await zl(r.localStore,s.targetId,!0))}async function Y0(n,e){const t=de(n),r=t.ka.get(e),s=t.qa.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),ju(t.remoteStore,r.targetId))}async function J0(n,e,t){const r=Z_(n);try{const s=await function(o,c){const u=de(o),d=Oe.now(),f=c.reduce((b,E)=>b.add(E.key),pe());let p,g;return u.persistence.runTransaction("Locally write mutations","readwrite",b=>{let E=Et(),S=pe();return u.ds.getEntries(b,f).next(A=>{E=A,E.forEach((O,k)=>{k.isValidDocument()||(S=S.add(O))})}).next(()=>u.localDocuments.getOverlayedDocuments(b,E)).next(A=>{p=A;const O=[];for(const k of c){const x=pA(k,p.get(k.key).overlayedDocument);x!=null&&O.push(new hn(k.key,x,Vg(x.value.mapValue),rt.exists(!0)))}return u.mutationQueue.addMutationBatch(b,d,O,c)}).next(A=>{g=A;const O=A.applyToLocalDocumentSet(p,S);return u.documentOverlayCache.saveOverlays(b,A.batchId,O)})}).then(()=>({batchId:g.batchId,changes:Gg(p)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(o,c,u){let d=o.Wa[o.currentUser.toKey()];d||(d=new xe(ue)),d=d.insert(c,u),o.Wa[o.currentUser.toKey()]=d}(r,s.batchId,t),await to(r,s.changes),await eo(r.remoteStore)}catch(s){const i=Wu(s,"Failed to persist write");t.reject(i)}}async function W_(n,e){const t=de(n);try{const r=await u0(t.localStore,e);e.targetChanges.forEach((s,i)=>{const o=t.Ua.get(i);o&&(te(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.Ba=!0:s.modifiedDocuments.size>0?te(o.Ba):s.removedDocuments.size>0&&(te(o.Ba),o.Ba=!1))}),await to(t,r,e)}catch(r){await Nr(r)}}function _p(n,e,t){const r=de(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.ka.forEach((i,o)=>{const c=o.view.sa(e);c.snapshot&&s.push(c.snapshot)}),function(o,c){const u=de(o);u.onlineState=c;let d=!1;u.queries.forEach((f,p)=>{for(const g of p.ta)g.sa(c)&&(d=!0)}),d&&Ju(u)}(r.eventManager,e),s.length&&r.La.p_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function X0(n,e,t){const r=de(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Ua.get(e),i=s&&s.key;if(i){let o=new xe(J.comparator);o=o.insert(i,Me.newNoDocument(i,ie.min()));const c=pe().add(i),u=new uc(ie.min(),new Map,new xe(ue),o,c);await W_(r,u),r.$a=r.$a.remove(i),r.Ua.delete(e),ed(r)}else await zl(r.localStore,e,!1).then(()=>Kl(r,e,t)).catch(Nr)}async function Z0(n,e){const t=de(n),r=e.batch.batchId;try{const s=await l0(t.localStore,e);Y_(t,r,null),Q_(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await to(t,s)}catch(s){await Nr(s)}}async function eR(n,e,t){const r=de(n);try{const s=await function(o,c){const u=de(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let f;return u.mutationQueue.lookupMutationBatch(d,c).next(p=>(te(p!==null),f=p.keys(),u.mutationQueue.removeMutationBatch(d,p))).next(()=>u.mutationQueue.performConsistencyCheck(d)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(d,f,c)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,f)).next(()=>u.localDocuments.getDocuments(d,f))})}(r.localStore,e);Y_(r,e,t),Q_(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await to(r,s)}catch(s){await Nr(s)}}function Q_(n,e){(n.Ga.get(e)||[]).forEach(t=>{t.resolve()}),n.Ga.delete(e)}function Y_(n,e,t){const r=de(n);let s=r.Wa[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Wa[r.currentUser.toKey()]=s}}function Kl(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.qa.get(e))n.ka.delete(r),t&&n.La.Ja(r,t);n.qa.delete(e),n.isPrimaryClient&&n.Ka.br(e).forEach(r=>{n.Ka.containsKey(r)||J_(n,r)})}function J_(n,e){n.Qa.delete(e.path.canonicalString());const t=n.$a.get(e);t!==null&&(ju(n.remoteStore,t),n.$a=n.$a.remove(e),n.Ua.delete(t),ed(n))}function vp(n,e,t){for(const r of t)r instanceof G_?(n.Ka.addReference(r.key,e),tR(n,r)):r instanceof H_?(K(Zu,"Document no longer in limbo: "+r.key),n.Ka.removeReference(r.key,e),n.Ka.containsKey(r.key)||J_(n,r.key)):ee()}function tR(n,e){const t=e.key,r=t.path.canonicalString();n.$a.get(t)||n.Qa.has(r)||(K(Zu,"New document in limbo: "+t),n.Qa.add(r),ed(n))}function ed(n){for(;n.Qa.size>0&&n.$a.size<n.maxConcurrentLimboResolutions;){const e=n.Qa.values().next().value;n.Qa.delete(e);const t=new J(we.fromString(e)),r=n.za.next();n.Ua.set(r,new z0(t)),n.$a=n.$a.insert(t,r),U_(n.remoteStore,new rn(xt(Yi(t.path)),r,"TargetPurposeLimboResolution",Pt.ae))}}async function to(n,e,t){const r=de(n),s=[],i=[],o=[];r.ka.isEmpty()||(r.ka.forEach((c,u)=>{o.push(r.Ha(u,e,t).then(d=>{var f;if((d||t)&&r.isPrimaryClient){const p=d?!d.fromCache:(f=t?.targetChanges.get(u.targetId))===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,p?"current":"not-current")}if(d){s.push(d);const p=$u.Yi(u.targetId,d);i.push(p)}}))}),await Promise.all(o),r.La.p_(s),await async function(u,d){const f=de(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>D.forEach(d,g=>D.forEach(g.Hi,b=>f.persistence.referenceDelegate.addReference(p,g.targetId,b)).next(()=>D.forEach(g.Ji,b=>f.persistence.referenceDelegate.removeReference(p,g.targetId,b)))))}catch(p){if(!$n(p))throw p;K(qu,"Failed to update sequence numbers: "+p)}for(const p of d){const g=p.targetId;if(!p.fromCache){const b=f.Ts.get(g),E=b.snapshotVersion,S=b.withLastLimboFreeSnapshotVersion(E);f.Ts=f.Ts.insert(g,S)}}}(r.localStore,i))}async function nR(n,e){const t=de(n);if(!t.currentUser.isEqual(e)){K(Zu,"User change. New user:",e.toKey());const r=await V_(t.localStore,e);t.currentUser=e,function(i,o){i.Ga.forEach(c=>{c.forEach(u=>{u.reject(new W(B.CANCELLED,o))})}),i.Ga.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await to(t,r.Rs)}}function rR(n,e){const t=de(n),r=t.Ua.get(e);if(r&&r.Ba)return pe().add(r.key);{let s=pe();const i=t.qa.get(e);if(!i)return s;for(const o of i){const c=t.ka.get(o);s=s.unionWith(c.view.Sa)}return s}}function X_(n){const e=de(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=W_.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=rR.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=X0.bind(null,e),e.La.p_=B0.bind(null,e.eventManager),e.La.Ja=$0.bind(null,e.eventManager),e}function Z_(n){const e=de(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Z0.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=eR.bind(null,e),e}class Mi{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=pc(e.databaseInfo.databaseId),this.sharedClientState=this.Za(e),this.persistence=this.Xa(e),await this.persistence.start(),this.localStore=this.eu(e),this.gcScheduler=this.tu(e,this.localStore),this.indexBackfillerScheduler=this.nu(e,this.localStore)}tu(e,t){return null}nu(e,t){return null}eu(e){return D_(this.persistence,new N_,e.initialUser,this.serializer)}Xa(e){return new Uu(fc.ri,this.serializer)}Za(e){return new L_}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Mi.provider={build:()=>new Mi};class sR extends Mi{constructor(e){super(),this.cacheSizeBytes=e}tu(e,t){te(this.persistence.referenceDelegate instanceof xa);const r=this.persistence.referenceDelegate.garbageCollector;return new S_(r,e.asyncQueue,t)}Xa(e){const t=this.cacheSizeBytes!==void 0?tt.withCacheSize(this.cacheSizeBytes):tt.DEFAULT;return new Uu(r=>xa.ri(r,t),this.serializer)}}class iR extends Mi{constructor(e,t,r){super(),this.ru=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.ru.initialize(this,e),await Z_(this.ru.syncEngine),await eo(this.ru.remoteStore),await this.persistence.Ci(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}eu(e){return D_(this.persistence,new N_,e.initialUser,this.serializer)}tu(e,t){const r=this.persistence.referenceDelegate.garbageCollector;return new S_(r,e.asyncQueue,t)}nu(e,t){const r=new pT(t,this.persistence);return new fT(e.asyncQueue,r)}Xa(e){const t=i0(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?tt.withCacheSize(this.cacheSizeBytes):tt.DEFAULT;return new Bu(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,b0(),na(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Za(e){return new L_}}class Da{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>_p(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=nR.bind(null,this.syncEngine),await M0(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new U0}()}createDatastore(e){const t=pc(e.databaseInfo.databaseId),r=function(i){return new y0(i)}(e.databaseInfo);return function(i,o,c,u){return new T0(i,o,c,u)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,o,c){return new R0(r,s,i,o,c)}(this.localStore,this.datastore,e.asyncQueue,t=>_p(this.syncEngine,t,0),function(){return dp.D()?new dp:new m0}())}createSyncEngine(e,t){return function(s,i,o,c,u,d,f){const p=new G0(s,i,o,c,u,d);return f&&(p.ja=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=de(s);K(Ar,"RemoteStore shutting down."),i.W_.add(5),await Zi(i),i.z_.shutdown(),i.j_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Da.provider={build:()=>new Da};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class td{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.iu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.iu(this.observer.error,e):ft("Uncaught Error in snapshot listener:",e.toString()))}su(){this.muted=!0}iu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fn="FirestoreClient";class oR{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=ht.UNAUTHENTICATED,this.clientId=ug.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async o=>{K(Fn,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(K(Fn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Ht;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Wu(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function il(n,e){n.asyncQueue.verifyOperationInProgress(),K(Fn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await V_(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function yp(n,e){n.asyncQueue.verifyOperationInProgress();const t=await aR(n);K(Fn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>fp(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>fp(e.remoteStore,s)),n._onlineComponents=e}async function aR(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){K(Fn,"Using user provided OfflineComponentProvider");try{await il(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===B.FAILED_PRECONDITION||s.code===B.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;Ai("Error using user provided cache. Falling back to memory cache: "+t),await il(n,new Mi)}}else K(Fn,"Using default OfflineComponentProvider"),await il(n,new sR(void 0));return n._offlineComponents}async function ev(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(K(Fn,"Using user provided OnlineComponentProvider"),await yp(n,n._uninitializedComponentsProvider._online)):(K(Fn,"Using default OnlineComponentProvider"),await yp(n,new Da))),n._onlineComponents}function cR(n){return ev(n).then(e=>e.syncEngine)}async function Va(n){const e=await ev(n),t=e.eventManager;return t.onListen=H0.bind(null,e.syncEngine),t.onUnlisten=Q0.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=K0.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=Y0.bind(null,e.syncEngine),t}function lR(n,e,t={}){const r=new Ht;return n.asyncQueue.enqueueAndForget(async()=>function(i,o,c,u,d){const f=new td({next:g=>{f.su(),o.enqueueAndForget(()=>Yu(i,p));const b=g.docs.has(c);!b&&g.fromCache?d.reject(new W(B.UNAVAILABLE,"Failed to get document because the client is offline.")):b&&g.fromCache&&u&&u.source==="server"?d.reject(new W(B.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(g)},error:g=>d.reject(g)}),p=new Xu(Yi(c.path),f,{includeMetadataChanges:!0,Ta:!0});return Qu(i,p)}(await Va(n),n.asyncQueue,e,t,r)),r.promise}function uR(n,e,t={}){const r=new Ht;return n.asyncQueue.enqueueAndForget(async()=>function(i,o,c,u,d){const f=new td({next:g=>{f.su(),o.enqueueAndForget(()=>Yu(i,p)),g.fromCache&&u.source==="server"?d.reject(new W(B.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(g)},error:g=>d.reject(g)}),p=new Xu(c,f,{includeMetadataChanges:!0,Ta:!0});return Qu(i,p)}(await Va(n),n.asyncQueue,e,t,r)),r.promise}/**
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
 */function tv(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bp=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nv(n,e,t){if(!t)throw new W(B.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function dR(n,e,t,r){if(e===!0&&r===!0)throw new W(B.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function wp(n){if(!J.isDocumentKey(n))throw new W(B.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Ip(n){if(J.isDocumentKey(n))throw new W(B.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function gc(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":ee()}function Rt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new W(B.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=gc(n);throw new W(B.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function hR(n,e){if(e<=0)throw new W(B.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fR="firestore.googleapis.com",Ep=!0;class Tp{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new W(B.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=fR,this.ssl=Ep}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:Ep;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=I_;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<R_)throw new W(B.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}dR("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=tv((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new W(B.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new W(B.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new W(B.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class nd{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Tp({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new W(B.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new W(B.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Tp(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new rT;switch(r.type){case"firstParty":return new oT(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new W(B.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=bp.get(t);r&&(K("ComponentProvider","Removing Datastore"),bp.delete(t),r.terminate())}(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qt{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Qt(this.firestore,e,this._query)}}class it{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Dn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new it(this.firestore,e,this._key)}}class Dn extends Qt{constructor(e,t,r){super(e,t,Yi(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new it(this.firestore,null,new J(e))}withConverter(e){return new Dn(this.firestore,e,this._path)}}function Ae(n,e,...t){if(n=Ie(n),nv("collection","path",e),n instanceof nd){const r=we.fromString(e,...t);return Ip(r),new Dn(n,null,r)}{if(!(n instanceof it||n instanceof Dn))throw new W(B.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(we.fromString(e,...t));return Ip(r),new Dn(n.firestore,null,r)}}function Re(n,e,...t){if(n=Ie(n),arguments.length===1&&(e=ug.newId()),nv("doc","path",e),n instanceof nd){const r=we.fromString(e,...t);return wp(r),new it(n,null,new J(r))}{if(!(n instanceof it||n instanceof Dn))throw new W(B.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(we.fromString(e,...t));return wp(r),new it(n.firestore,n instanceof Dn?n.converter:null,new J(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ap="AsyncQueue";class Rp{constructor(e=Promise.resolve()){this.Vu=[],this.mu=!1,this.fu=[],this.gu=null,this.pu=!1,this.yu=!1,this.wu=[],this.a_=new M_(this,"async_queue_retry"),this.Su=()=>{const r=na();r&&K(Ap,"Visibility state changed to "+r.visibilityState),this.a_.t_()},this.bu=e;const t=na();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Su)}get isShuttingDown(){return this.mu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Du(),this.vu(e)}enterRestrictedMode(e){if(!this.mu){this.mu=!0,this.yu=e||!1;const t=na();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Su)}}enqueue(e){if(this.Du(),this.mu)return new Promise(()=>{});const t=new Ht;return this.vu(()=>this.mu&&this.yu?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Vu.push(e),this.Cu()))}async Cu(){if(this.Vu.length!==0){try{await this.Vu[0](),this.Vu.shift(),this.a_.reset()}catch(e){if(!$n(e))throw e;K(Ap,"Operation failed with retryable error: "+e)}this.Vu.length>0&&this.a_.Xo(()=>this.Cu())}}vu(e){const t=this.bu.then(()=>(this.pu=!0,e().catch(r=>{this.gu=r,this.pu=!1;const s=function(o){let c=o.message||"";return o.stack&&(c=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),c}(r);throw ft("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.pu=!1,r))));return this.bu=t,t}enqueueAfterDelay(e,t,r){this.Du(),this.wu.indexOf(e)>-1&&(t=0);const s=Ku.createAndSchedule(this,e,t,r,i=>this.Fu(i));return this.fu.push(s),s}Du(){this.gu&&ee()}verifyOperationInProgress(){}async Mu(){let e;do e=this.bu,await e;while(e!==this.bu)}xu(e){for(const t of this.fu)if(t.timerId===e)return!0;return!1}Ou(e){return this.Mu().then(()=>{this.fu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.fu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Mu()})}Nu(e){this.wu.push(e)}Fu(e){const t=this.fu.indexOf(e);this.fu.splice(t,1)}}function Sp(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(n,["next","error","complete"])}class ln extends nd{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Rp,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Rp(e),this._firestoreClient=void 0,await e}}}function pR(n,e,t){t||(t=Ia);const r=Cr(n,"firestore");if(r.isInitialized(t)){const s=r.getImmediate({identifier:t}),i=r.getOptions(t);if(wi(i,e))return s;throw new W(B.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new W(B.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<R_)throw new W(B.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return r.initialize({options:e,instanceIdentifier:t})}function _c(n){if(n._terminated)throw new W(B.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||mR(n),n._firestoreClient}function mR(n){var e,t,r;const s=n._freezeSettings(),i=function(c,u,d,f){return new jT(c,u,d,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,tv(f.experimentalLongPollingOptions),f.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((t=s.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new oR(n._authCredentials,n._appCheckCredentials,n._queue,i,n._componentsProvider&&function(c){const u=c?._online.build();return{_offline:c?._offline.build(u),_online:u}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ts{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Ts(je.fromBase64String(e))}catch(t){throw new W(B.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Ts(je.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vc{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new W(B.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ve(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yc{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rd{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new W(B.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new W(B.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return ue(this._lat,e._lat)||ue(this._long,e._long)}}/**
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
 */class sd{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gR=/^__.*__$/;class _R{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new hn(e,this.data,this.fieldMask,t,this.fieldTransforms):new Vs(e,this.data,t,this.fieldTransforms)}}class rv{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new hn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function sv(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw ee()}}class id{constructor(e,t,r,s,i,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Bu(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Lu(){return this.settings.Lu}ku(e){return new id(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}qu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.ku({path:r,Qu:!1});return s.$u(e),s}Uu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.ku({path:r,Qu:!1});return s.Bu(),s}Ku(e){return this.ku({path:void 0,Qu:!0})}Wu(e){return Oa(e,this.settings.methodName,this.settings.Gu||!1,this.path,this.settings.zu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Bu(){if(this.path)for(let e=0;e<this.path.length;e++)this.$u(this.path.get(e))}$u(e){if(e.length===0)throw this.Wu("Document fields must not be empty");if(sv(this.Lu)&&gR.test(e))throw this.Wu('Document fields cannot begin and end with "__"')}}class vR{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||pc(e)}ju(e,t,r,s=!1){return new id({Lu:e,methodName:t,zu:r,path:Ve.emptyPath(),Qu:!1,Gu:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function no(n){const e=n._freezeSettings(),t=pc(n._databaseId);return new vR(n._databaseId,!!e.ignoreUndefinedProperties,t)}function iv(n,e,t,r,s,i={}){const o=n.ju(i.merge||i.mergeFields?2:0,e,t,s);ad("Data must be an object, but it was:",o,r);const c=av(r,o);let u,d;if(i.merge)u=new mt(o.fieldMask),d=o.fieldTransforms;else if(i.mergeFields){const f=[];for(const p of i.mergeFields){const g=Wl(e,p,t);if(!o.contains(g))throw new W(B.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);lv(f,g)||f.push(g)}u=new mt(f),d=o.fieldTransforms.filter(p=>u.covers(p.field))}else u=null,d=o.fieldTransforms;return new _R(new nt(c),u,d)}class ro extends yc{_toFieldTransform(e){if(e.Lu!==2)throw e.Lu===1?e.Wu(`${this._methodName}() can only appear at the top level of your update data`):e.Wu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof ro}}class od extends yc{constructor(e,t){super(e),this.Ju=t}_toFieldTransform(e){const t=new ws(e.serializer,Wg(e.serializer,this.Ju));return new Zg(e.path,t)}isEqual(e){return e instanceof od&&this.Ju===e.Ju}}function yR(n,e,t,r){const s=n.ju(1,e,t);ad("Data must be an object, but it was:",s,r);const i=[],o=nt.empty();qn(r,(u,d)=>{const f=cd(e,u,t);d=Ie(d);const p=s.Uu(f);if(d instanceof ro)i.push(f);else{const g=so(d,p);g!=null&&(i.push(f),o.set(f,g))}});const c=new mt(i);return new rv(o,c,s.fieldTransforms)}function bR(n,e,t,r,s,i){const o=n.ju(1,e,t),c=[Wl(e,r,t)],u=[s];if(i.length%2!=0)throw new W(B.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<i.length;g+=2)c.push(Wl(e,i[g])),u.push(i[g+1]);const d=[],f=nt.empty();for(let g=c.length-1;g>=0;--g)if(!lv(d,c[g])){const b=c[g];let E=u[g];E=Ie(E);const S=o.Uu(b);if(E instanceof ro)d.push(b);else{const A=so(E,S);A!=null&&(d.push(b),f.set(b,A))}}const p=new mt(d);return new rv(f,p,o.fieldTransforms)}function ov(n,e,t,r=!1){return so(t,n.ju(r?4:3,e))}function so(n,e){if(cv(n=Ie(n)))return ad("Unsupported field value:",e,n),av(n,e);if(n instanceof yc)return function(r,s){if(!sv(s.Lu))throw s.Wu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Wu(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.Qu&&e.Lu!==4)throw e.Wu("Nested arrays are not supported");return function(r,s){const i=[];let o=0;for(const c of r){let u=so(c,s.Ku(o));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),o++}return{arrayValue:{values:i}}}(n,e)}return function(r,s){if((r=Ie(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Wg(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=Oe.fromDate(r);return{timestampValue:Is(s.serializer,i)}}if(r instanceof Oe){const i=new Oe(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Is(s.serializer,i)}}if(r instanceof rd)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Ts)return{bytesValue:o_(s.serializer,r._byteString)};if(r instanceof it){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.Wu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Ou(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof sd)return function(o,c){return{mapValue:{fields:{[Ru]:{stringValue:Su},[gs]:{arrayValue:{values:o.toArray().map(d=>{if(typeof d!="number")throw c.Wu("VectorValues must only contain numeric values.");return Pu(c.serializer,d)})}}}}}}(r,s);throw s.Wu(`Unsupported field value: ${gc(r)}`)}(n,e)}function av(n,e){const t={};return Ag(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):qn(n,(r,s)=>{const i=so(s,e.qu(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function cv(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Oe||n instanceof rd||n instanceof Ts||n instanceof it||n instanceof yc||n instanceof sd)}function ad(n,e,t){if(!cv(t)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(t)){const r=gc(t);throw r==="an object"?e.Wu(n+" a custom object"):e.Wu(n+" "+r)}}function Wl(n,e,t){if((e=Ie(e))instanceof vc)return e._internalPath;if(typeof e=="string")return cd(n,e);throw Oa("Field path arguments must be of type string or ",n,!1,void 0,t)}const wR=new RegExp("[~\\*/\\[\\]]");function cd(n,e,t){if(e.search(wR)>=0)throw Oa(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new vc(...e.split("."))._internalPath}catch{throw Oa(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Oa(n,e,t,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${r}`),o&&(u+=` in document ${s}`),u+=")"),new W(B.INVALID_ARGUMENT,c+n+u)}function lv(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ld{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new it(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new IR(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(bc("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class IR extends ld{data(){return super.data()}}function bc(n,e){return typeof e=="string"?cd(n,e):e instanceof vc?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uv(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new W(B.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class ud{}class wc extends ud{}function ot(n,e,...t){let r=[];e instanceof ud&&r.push(e),r=r.concat(t),function(i){const o=i.filter(u=>u instanceof dd).length,c=i.filter(u=>u instanceof Ic).length;if(o>1||o>0&&c>0)throw new W(B.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class Ic extends wc{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Ic(e,t,r)}_apply(e){const t=this._parse(e);return dv(e._query,t),new Qt(e.firestore,e.converter,Ll(e._query,t))}_parse(e){const t=no(e.firestore);return function(i,o,c,u,d,f,p){let g;if(d.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new W(B.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Cp(p,f);const E=[];for(const S of p)E.push(kp(u,i,S));g={arrayValue:{values:E}}}else g=kp(u,i,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Cp(p,f),g=ov(c,o,p,f==="in"||f==="not-in");return _e.create(d,f,g)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function Un(n,e,t){const r=e,s=bc("where",n);return Ic._create(s,r,t)}class dd extends ud{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new dd(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:Ee.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let o=s;const c=i.getFlattenedFilters();for(const u of c)dv(o,u),o=Ll(o,u)}(e._query,t),new Qt(e.firestore,e.converter,Ll(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class hd extends wc{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new hd(e,t)}_apply(e){const t=function(s,i,o){if(s.startAt!==null)throw new W(B.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new W(B.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Oi(i,o)}(e._query,this._field,this._direction);return new Qt(e.firestore,e.converter,function(s,i){const o=s.explicitOrderBy.concat([i]);return new Dr(s.path,s.collectionGroup,o,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,t))}}function vt(n,e="asc"){const t=e,r=bc("orderBy",n);return hd._create(r,t)}class fd extends wc{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new fd(e,t,r)}_apply(e){return new Qt(e.firestore,e.converter,Aa(e._query,this._limit,this._limitType))}}function kt(n){return hR("limit",n),fd._create("limit",n,"F")}class pd extends wc{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new pd(e,t,r)}_apply(e){const t=TR(e,this.type,this._docOrFields,this._inclusive);return new Qt(e.firestore,e.converter,function(s,i){return new Dr(s.path,s.collectionGroup,s.explicitOrderBy.slice(),s.filters.slice(),s.limit,s.limitType,i,s.endAt)}(e._query,t))}}function ER(...n){return pd._create("startAfter",n,!1)}function TR(n,e,t,r){if(t[0]=Ie(t[0]),t[0]instanceof ld)return function(i,o,c,u,d){if(!u)throw new W(B.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${c}().`);const f=[];for(const p of is(i))if(p.field.isKeyField())f.push(br(o,u.key));else{const g=u.data.field(p.field);if(rc(g))throw new W(B.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+p.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(g===null){const b=p.field.canonicalString();throw new W(B.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${b}' (used as the orderBy) does not exist.`)}f.push(g)}return new Ln(f,d)}(n._query,n.firestore._databaseId,e,t[0]._document,r);{const s=no(n.firestore);return function(o,c,u,d,f,p){const g=o.explicitOrderBy;if(f.length>g.length)throw new W(B.INVALID_ARGUMENT,`Too many arguments provided to ${d}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const b=[];for(let E=0;E<f.length;E++){const S=f[E];if(g[E].field.isKeyField()){if(typeof S!="string")throw new W(B.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${d}(), but got a ${typeof S}`);if(!Cu(o)&&S.indexOf("/")!==-1)throw new W(B.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${d}() must be a plain document ID, but '${S}' contains a slash.`);const A=o.path.child(we.fromString(S));if(!J.isDocumentKey(A))throw new W(B.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${d}() must result in a valid document path, but '${A}' is not because it contains an odd number of segments.`);const O=new J(A);b.push(br(c,O))}else{const A=ov(u,d,S);b.push(A)}}return new Ln(b,p)}(n._query,n.firestore._databaseId,s,e,t,r)}}function kp(n,e,t){if(typeof(t=Ie(t))=="string"){if(t==="")throw new W(B.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Cu(e)&&t.indexOf("/")!==-1)throw new W(B.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(we.fromString(t));if(!J.isDocumentKey(r))throw new W(B.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return br(n,new J(r))}if(t instanceof it)return br(n,t._key);throw new W(B.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${gc(t)}.`)}function Cp(n,e){if(!Array.isArray(n)||n.length===0)throw new W(B.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function dv(n,e){const t=function(s,i){for(const o of s)for(const c of o.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new W(B.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new W(B.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class AR{convertValue(e,t="none"){switch(Vn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Pe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(cn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw ee()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return qn(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){var t,r,s;const i=(s=(r=(t=e.fields)===null||t===void 0?void 0:t[gs].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(o=>Pe(o.doubleValue));return new sd(i)}convertGeoPoint(e){return new rd(Pe(e.latitude),Pe(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=sc(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Ni(e));default:return null}}convertTimestamp(e){const t=an(e);return new Oe(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=we.fromString(e);te(g_(r));const s=new yr(r.get(1),r.get(3)),i=new J(r.popFirst(5));return s.isEqual(t)||ft(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hv(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class li{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class fv extends ld{constructor(e,t,r,s,i,o){super(e,t,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new ra(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(bc("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class ra extends fv{data(e={}){return super.data(e)}}class pv{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new li(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new ra(this._firestore,this._userDataWriter,r.key,r,new li(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new W(B.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(c=>{const u=new ra(s._firestore,s._userDataWriter,c.doc.key,c.doc,new li(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(c=>i||c.type!==3).map(c=>{const u=new ra(s._firestore,s._userDataWriter,c.doc.key,c.doc,new li(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let d=-1,f=-1;return c.type!==0&&(d=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),f=o.indexOf(c.doc.key)),{type:RR(c.type),doc:u,oldIndex:d,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function RR(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return ee()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Or(n){n=Rt(n,it);const e=Rt(n.firestore,ln);return lR(_c(e),n._key).then(t=>_v(e,n,t))}class md extends AR{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ts(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new it(this.firestore,null,t)}}function un(n){n=Rt(n,Qt);const e=Rt(n.firestore,ln),t=_c(e),r=new md(e);return uv(n._query),uR(t,n._query).then(s=>new pv(e,r,n,s))}function mv(n,e,t){n=Rt(n,it);const r=Rt(n.firestore,ln),s=hv(n.converter,e,t);return Ec(r,[iv(no(r),"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,rt.none())])}function at(n,e,t,...r){n=Rt(n,it);const s=Rt(n.firestore,ln),i=no(s);let o;return o=typeof(e=Ie(e))=="string"||e instanceof vc?bR(i,"updateDoc",n._key,e,t,r):yR(i,"updateDoc",n._key,e),Ec(s,[o.toMutation(n._key,rt.exists(!0))])}function gv(n){return Ec(Rt(n.firestore,ln),[new lc(n._key,rt.none())])}function Ft(n,e){const t=Rt(n.firestore,ln),r=Re(n),s=hv(n.converter,e);return Ec(t,[iv(no(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,rt.exists(!1))]).then(()=>r)}function Yt(n,...e){var t,r,s;n=Ie(n);let i={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||Sp(e[o])||(i=e[o],o++);const c={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(Sp(e[o])){const p=e[o];e[o]=(t=p.next)===null||t===void 0?void 0:t.bind(p),e[o+1]=(r=p.error)===null||r===void 0?void 0:r.bind(p),e[o+2]=(s=p.complete)===null||s===void 0?void 0:s.bind(p)}let u,d,f;if(n instanceof it)d=Rt(n.firestore,ln),f=Yi(n._key.path),u={next:p=>{e[o]&&e[o](_v(d,n,p))},error:e[o+1],complete:e[o+2]};else{const p=Rt(n,Qt);d=Rt(p.firestore,ln),f=p._query;const g=new md(d);u={next:b=>{e[o]&&e[o](new pv(d,g,p,b))},error:e[o+1],complete:e[o+2]},uv(n._query)}return function(g,b,E,S){const A=new td(S),O=new Xu(b,A,E);return g.asyncQueue.enqueueAndForget(async()=>Qu(await Va(g),O)),()=>{A.su(),g.asyncQueue.enqueueAndForget(async()=>Yu(await Va(g),O))}}(_c(d),f,c,u)}function Ec(n,e){return function(r,s){const i=new Ht;return r.asyncQueue.enqueueAndForget(async()=>J0(await cR(r),s,i)),i.promise}(_c(n),e)}function _v(n,e,t){const r=t.docs.get(e._key),s=new md(n);return new fv(n,s,e._key,r,new li(t.hasPendingWrites,t.fromCache),e.converter)}class SR{constructor(e){let t;this.kind="persistent",e?.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=vv(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}function kR(n){return new SR(n)}class CR{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Da.provider,this._offlineComponentProvider={build:t=>new iR(t,e?.cacheSizeBytes,this.forceOwnership)}}}function vv(n){return new CR(n?.forceOwnership)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pp(){return new ro("deleteField")}function Jt(n){return new od("increment",n)}(function(e,t=!0){(function(s){Ds=s})(Pr),Kt(new Ot("firestore",(r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),c=new ln(new sT(r.getProvider("auth-internal")),new aT(o,r.getProvider("app-check-internal")),function(d,f){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new W(B.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new yr(d.options.projectId,f)}(o,s),o);return i=Object.assign({useFetchStreams:t},i),c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),At(uf,df,e),At(uf,df,"esm2017")})();var PR="firebase",xR="11.3.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */At(PR,xR,"app");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ql=new Map,yv={activated:!1,tokenObservers:[]},NR={initialized:!1,enabled:!1};function ze(n){return Ql.get(n)||Object.assign({},yv)}function DR(n,e){return Ql.set(n,e),Ql.get(n)}function Tc(){return NR}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bv="https://content-firebaseappcheck.googleapis.com/v1",VR="exchangeRecaptchaV3Token",OR="exchangeDebugToken",xp={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:16*60*1e3},LR=24*60*60*1e3;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MR{constructor(e,t,r,s,i){if(this.operation=e,this.retryPolicy=t,this.getWaitDuration=r,this.lowerBound=s,this.upperBound=i,this.pending=null,this.nextErrorWaitInterval=s,s>i)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new bi,this.pending.promise.catch(t=>{}),await FR(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new bi,this.pending.promise.catch(t=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(t){this.retryPolicy(t)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const t=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),t}}}function FR(n){return new Promise(e=>{setTimeout(e,n)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UR={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.",throttled:"Requests throttled due to {$httpStatus} error. Attempts allowed again after {$time}"},gt=new Ps("appCheck","AppCheck",UR);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Np(n=!1){var e;return n?(e=self.grecaptcha)===null||e===void 0?void 0:e.enterprise:self.grecaptcha}function gd(n){if(!ze(n).activated)throw gt.create("use-before-activation",{appName:n.name})}function wv(n){const e=Math.round(n/1e3),t=Math.floor(e/(3600*24)),r=Math.floor((e-t*3600*24)/3600),s=Math.floor((e-t*3600*24-r*3600)/60),i=e-t*3600*24-r*3600-s*60;let o="";return t&&(o+=No(t)+"d:"),r&&(o+=No(r)+"h:"),o+=No(s)+"m:"+No(i)+"s",o}function No(n){return n===0?"00":n>=10?n.toString():"0"+n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _d({url:n,body:e},t){const r={"Content-Type":"application/json"},s=t.getImmediate({optional:!0});if(s){const p=await s.getHeartbeatsHeader();p&&(r["X-Firebase-Client"]=p)}const i={method:"POST",body:JSON.stringify(e),headers:r};let o;try{o=await fetch(n,i)}catch(p){throw gt.create("fetch-network-error",{originalErrorMessage:p?.message})}if(o.status!==200)throw gt.create("fetch-status-error",{httpStatus:o.status});let c;try{c=await o.json()}catch(p){throw gt.create("fetch-parse-error",{originalErrorMessage:p?.message})}const u=c.ttl.match(/^([\d.]+)(s)$/);if(!u||!u[2]||isNaN(Number(u[1])))throw gt.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${c.ttl}`});const d=Number(u[1])*1e3,f=Date.now();return{token:c.token,expireTimeMillis:f+d,issuedAtTimeMillis:f}}function BR(n,e){const{projectId:t,appId:r,apiKey:s}=n.options;return{url:`${bv}/projects/${t}/apps/${r}:${VR}?key=${s}`,body:{recaptcha_v3_token:e}}}function Iv(n,e){const{projectId:t,appId:r,apiKey:s}=n.options;return{url:`${bv}/projects/${t}/apps/${r}:${OR}?key=${s}`,body:{debug_token:e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $R="firebase-app-check-database",qR=1,Fi="firebase-app-check-store",Ev="debug-token";let Do=null;function Tv(){return Do||(Do=new Promise((n,e)=>{try{const t=indexedDB.open($R,qR);t.onsuccess=r=>{n(r.target.result)},t.onerror=r=>{var s;e(gt.create("storage-open",{originalErrorMessage:(s=r.target.error)===null||s===void 0?void 0:s.message}))},t.onupgradeneeded=r=>{const s=r.target.result;switch(r.oldVersion){case 0:s.createObjectStore(Fi,{keyPath:"compositeKey"})}}}catch(t){e(gt.create("storage-open",{originalErrorMessage:t?.message}))}}),Do)}function jR(n){return Rv(Sv(n))}function zR(n,e){return Av(Sv(n),e)}function GR(n){return Av(Ev,n)}function HR(){return Rv(Ev)}async function Av(n,e){const r=(await Tv()).transaction(Fi,"readwrite"),i=r.objectStore(Fi).put({compositeKey:n,value:e});return new Promise((o,c)=>{i.onsuccess=u=>{o()},r.onerror=u=>{var d;c(gt.create("storage-set",{originalErrorMessage:(d=u.target.error)===null||d===void 0?void 0:d.message}))}})}async function Rv(n){const t=(await Tv()).transaction(Fi,"readonly"),s=t.objectStore(Fi).get(n);return new Promise((i,o)=>{s.onsuccess=c=>{const u=c.target.result;i(u?u.value:void 0)},t.onerror=c=>{var u;o(gt.create("storage-get",{originalErrorMessage:(u=c.target.error)===null||u===void 0?void 0:u.message}))}})}function Sv(n){return`${n.options.appId}-${n.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ui=new Ha("@firebase/app-check");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function KR(n){if(Ga()){let e;try{e=await jR(n)}catch(t){Ui.warn(`Failed to read token from IndexedDB. Error: ${t}`)}return e}}function ol(n,e){return Ga()?zR(n,e).catch(t=>{Ui.warn(`Failed to write token to IndexedDB. Error: ${t}`)}):Promise.resolve()}async function WR(){let n;try{n=await HR()}catch{}if(n)return n;{const e=crypto.randomUUID();return GR(e).catch(t=>Ui.warn(`Failed to persist debug token to IndexedDB. Error: ${t}`)),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vd(){return Tc().enabled}async function yd(){const n=Tc();if(n.enabled&&n.token)return n.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function QR(){const n=dm(),e=Tc();if(e.initialized=!0,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&n.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const t=new bi;e.token=t,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?t.resolve(n.FIREBASE_APPCHECK_DEBUG_TOKEN):t.resolve(WR())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YR={error:"UNKNOWN_ERROR"};function JR(n){return cu.encodeString(JSON.stringify(n),!1)}async function Yl(n,e=!1){const t=n.app;gd(t);const r=ze(t);let s=r.token,i;if(s&&!ts(s)&&(r.token=void 0,s=void 0),!s){const u=await r.cachedTokenPromise;u&&(ts(u)?s=u:await ol(t,void 0))}if(!e&&s&&ts(s))return{token:s.token};let o=!1;if(vd()){r.exchangeTokenPromise||(r.exchangeTokenPromise=_d(Iv(t,await yd()),n.heartbeatServiceProvider).finally(()=>{r.exchangeTokenPromise=void 0}),o=!0);const u=await r.exchangeTokenPromise;return await ol(t,u),r.token=u,{token:u.token}}try{r.exchangeTokenPromise||(r.exchangeTokenPromise=r.provider.getToken().finally(()=>{r.exchangeTokenPromise=void 0}),o=!0),s=await ze(t).exchangeTokenPromise}catch(u){u.code==="appCheck/throttled"?Ui.warn(u.message):Ui.error(u),i=u}let c;return s?i?ts(s)?c={token:s.token,internalError:i}:c=Vp(i):(c={token:s.token},r.token=s,await ol(t,s)):c=Vp(i),o&&Pv(t,c),c}async function XR(n){const e=n.app;gd(e);const{provider:t}=ze(e);if(vd()){const r=await yd(),{token:s}=await _d(Iv(e,r),n.heartbeatServiceProvider);return{token:s}}else{const{token:r}=await t.getToken();return{token:r}}}function kv(n,e,t,r){const{app:s}=n,i=ze(s),o={next:t,error:r,type:e};if(i.tokenObservers=[...i.tokenObservers,o],i.token&&ts(i.token)){const c=i.token;Promise.resolve().then(()=>{t({token:c.token}),Dp(n)}).catch(()=>{})}i.cachedTokenPromise.then(()=>Dp(n))}function Cv(n,e){const t=ze(n),r=t.tokenObservers.filter(s=>s.next!==e);r.length===0&&t.tokenRefresher&&t.tokenRefresher.isRunning()&&t.tokenRefresher.stop(),t.tokenObservers=r}function Dp(n){const{app:e}=n,t=ze(e);let r=t.tokenRefresher;r||(r=ZR(n),t.tokenRefresher=r),!r.isRunning()&&t.isTokenAutoRefreshEnabled&&r.start()}function ZR(n){const{app:e}=n;return new MR(async()=>{const t=ze(e);let r;if(t.token?r=await Yl(n,!0):r=await Yl(n),r.error)throw r.error;if(r.internalError)throw r.internalError},()=>!0,()=>{const t=ze(e);if(t.token){let r=t.token.issuedAtTimeMillis+(t.token.expireTimeMillis-t.token.issuedAtTimeMillis)*.5+3e5;const s=t.token.expireTimeMillis-5*60*1e3;return r=Math.min(r,s),Math.max(0,r-Date.now())}else return 0},xp.RETRIAL_MIN_WAIT,xp.RETRIAL_MAX_WAIT)}function Pv(n,e){const t=ze(n).tokenObservers;for(const r of t)try{r.type==="EXTERNAL"&&e.error!=null?r.error(e.error):r.next(e)}catch{}}function ts(n){return n.expireTimeMillis-Date.now()>0}function Vp(n){return{token:JR(YR),error:n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eS{constructor(e,t){this.app=e,this.heartbeatServiceProvider=t}_delete(){const{tokenObservers:e}=ze(this.app);for(const t of e)Cv(this.app,t.next);return Promise.resolve()}}function tS(n,e){return new eS(n,e)}function nS(n){return{getToken:e=>Yl(n,e),getLimitedUseToken:()=>XR(n),addTokenListener:e=>kv(n,"INTERNAL",e),removeTokenListener:e=>Cv(n.app,e)}}const rS="@firebase/app-check",sS="0.8.11";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iS="https://www.google.com/recaptcha/api.js";function oS(n,e){const t=new bi,r=ze(n);r.reCAPTCHAState={initialized:t};const s=aS(n),i=Np(!1);return i?Op(n,e,i,s,t):uS(()=>{const o=Np(!1);if(!o)throw new Error("no recaptcha");Op(n,e,o,s,t)}),t.promise}function Op(n,e,t,r,s){t.ready(()=>{lS(n,e,t,r),s.resolve(t)})}function aS(n){const e=`fire_app_check_${n.name}`,t=document.createElement("div");return t.id=e,t.style.display="none",document.body.appendChild(t),e}async function cS(n){gd(n);const t=await ze(n).reCAPTCHAState.initialized.promise;return new Promise((r,s)=>{const i=ze(n).reCAPTCHAState;t.ready(()=>{r(t.execute(i.widgetId,{action:"fire_app_check"}))})})}function lS(n,e,t,r){const s=t.render(r,{sitekey:e,size:"invisible",callback:()=>{ze(n).reCAPTCHAState.succeeded=!0},"error-callback":()=>{ze(n).reCAPTCHAState.succeeded=!1}}),i=ze(n);i.reCAPTCHAState=Object.assign(Object.assign({},i.reCAPTCHAState),{widgetId:s})}function uS(n){const e=document.createElement("script");e.src=iS,e.onload=n,document.head.appendChild(e)}/**
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
 */class bd{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){var e,t,r;hS(this._throttleData);const s=await cS(this._app).catch(o=>{throw gt.create("recaptcha-error")});if(!(!((e=ze(this._app).reCAPTCHAState)===null||e===void 0)&&e.succeeded))throw gt.create("recaptcha-error");let i;try{i=await _d(BR(this._app,s),this._heartbeatServiceProvider)}catch(o){throw!((t=o.code)===null||t===void 0)&&t.includes("fetch-status-error")?(this._throttleData=dS(Number((r=o.customData)===null||r===void 0?void 0:r.httpStatus),this._throttleData),gt.create("throttled",{time:wv(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):o}return this._throttleData=null,i}initialize(e){this._app=e,this._heartbeatServiceProvider=Cr(e,"heartbeat"),oS(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof bd?this._siteKey===e._siteKey:!1}}function dS(n,e){if(n===404||n===403)return{backoffCount:1,allowRequestsAfter:Date.now()+LR,httpStatus:n};{const t=e?e.backoffCount:0,r=Ob(t,1e3,2);return{backoffCount:t+1,allowRequestsAfter:Date.now()+r,httpStatus:n}}}function hS(n){if(n&&Date.now()-n.allowRequestsAfter<=0)throw gt.create("throttled",{time:wv(n.allowRequestsAfter-Date.now()),httpStatus:n.httpStatus})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fS(n=Ka(),e){n=Ie(n);const t=Cr(n,"app-check");if(Tc().initialized||QR(),vd()&&yd().then(s=>console.log(`App Check debug token: ${s}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(i.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&i.provider.isEqual(e.provider))return s;throw gt.create("already-initialized",{appName:n.name})}const r=t.initialize({options:e});return pS(n,e.provider,e.isTokenAutoRefreshEnabled),ze(n).isTokenAutoRefreshEnabled&&kv(r,"INTERNAL",()=>{}),r}function pS(n,e,t){const r=DR(n,Object.assign({},yv));r.activated=!0,r.provider=e,r.cachedTokenPromise=KR(n).then(s=>(s&&ts(s)&&(r.token=s,Pv(n,{token:s.token})),s)),r.isTokenAutoRefreshEnabled=t===void 0?n.automaticDataCollectionEnabled:t,r.provider.initialize(n)}const mS="app-check",Lp="app-check-internal";function gS(){Kt(new Ot(mS,n=>{const e=n.getProvider("app").getImmediate(),t=n.getProvider("heartbeat");return tS(e,t)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((n,e,t)=>{n.getProvider(Lp).initialize()})),Kt(new Ot(Lp,n=>{const e=n.getProvider("app-check").getImmediate();return nS(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),At(rS,sS)}gS();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _S="type.googleapis.com/google.protobuf.Int64Value",vS="type.googleapis.com/google.protobuf.UInt64Value";function xv(n,e){const t={};for(const r in n)n.hasOwnProperty(r)&&(t[r]=e(n[r]));return t}function La(n){if(n==null)return null;if(n instanceof Number&&(n=n.valueOf()),typeof n=="number"&&isFinite(n)||n===!0||n===!1||Object.prototype.toString.call(n)==="[object String]")return n;if(n instanceof Date)return n.toISOString();if(Array.isArray(n))return n.map(e=>La(e));if(typeof n=="function"||typeof n=="object")return xv(n,e=>La(e));throw new Error("Data cannot be encoded in JSON: "+n)}function As(n){if(n==null)return n;if(n["@type"])switch(n["@type"]){case _S:case vS:{const e=Number(n.value);if(isNaN(e))throw new Error("Data cannot be decoded from JSON: "+n);return e}default:throw new Error("Data cannot be decoded from JSON: "+n)}return Array.isArray(n)?n.map(e=>As(e)):typeof n=="function"||typeof n=="object"?xv(n,e=>As(e)):n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wd="functions";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mp={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class _t extends Mt{constructor(e,t,r){super(`${wd}/${e}`,t||""),this.details=r,Object.setPrototypeOf(this,_t.prototype)}}function yS(n){if(n>=200&&n<300)return"ok";switch(n){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function Ma(n,e){let t=yS(n),r=t,s;try{const i=e&&e.error;if(i){const o=i.status;if(typeof o=="string"){if(!Mp[o])return new _t("internal","internal");t=Mp[o],r=o}const c=i.message;typeof c=="string"&&(r=c),s=i.details,s!==void 0&&(s=As(s))}}catch{}return t==="ok"?null:new _t(t,r,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bS{constructor(e,t,r,s){this.app=e,this.auth=null,this.messaging=null,this.appCheck=null,this.serverAppAppCheckToken=null,It(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.auth=t.getImmediate({optional:!0}),this.messaging=r.getImmediate({optional:!0}),this.auth||t.get().then(i=>this.auth=i,()=>{}),this.messaging||r.get().then(i=>this.messaging=i,()=>{}),this.appCheck||s?.get().then(i=>this.appCheck=i,()=>{})}async getAuthToken(){if(this.auth)try{const e=await this.auth.getToken();return e?.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(e){if(this.serverAppAppCheckToken)return this.serverAppAppCheckToken;if(this.appCheck){const t=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return t.error?null:t.token}return null}async getContext(e){const t=await this.getAuthToken(),r=await this.getMessagingToken(),s=await this.getAppCheckToken(e);return{authToken:t,messagingToken:r,appCheckToken:s}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jl="us-central1",wS=/^data: (.*?)(?:\n|$)/;function IS(n){let e=null;return{promise:new Promise((t,r)=>{e=setTimeout(()=>{r(new _t("deadline-exceeded","deadline-exceeded"))},n)}),cancel:()=>{e&&clearTimeout(e)}}}class ES{constructor(e,t,r,s,i=Jl,o=(...c)=>fetch(...c)){this.app=e,this.fetchImpl=o,this.emulatorOrigin=null,this.contextProvider=new bS(e,t,r,s),this.cancelAllRequests=new Promise(c=>{this.deleteService=()=>Promise.resolve(c())});try{const c=new URL(i);this.customDomain=c.origin+(c.pathname==="/"?"":c.pathname),this.region=Jl}catch{this.customDomain=null,this.region=i}}_delete(){return this.deleteService()}_url(e){const t=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${t}/${this.region}/${e}`:this.customDomain!==null?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`}}function TS(n,e,t){n.emulatorOrigin=`http://${e}:${t}`}function AS(n,e,t){const r=s=>SS(n,e,s,{});return r.stream=(s,i)=>CS(n,e,s,i),r}async function RS(n,e,t,r){t["Content-Type"]="application/json";let s;try{s=await r(n,{method:"POST",body:JSON.stringify(e),headers:t})}catch{return{status:0,json:null}}let i=null;try{i=await s.json()}catch{}return{status:s.status,json:i}}async function Nv(n,e){const t={},r=await n.contextProvider.getContext(e.limitedUseAppCheckTokens);return r.authToken&&(t.Authorization="Bearer "+r.authToken),r.messagingToken&&(t["Firebase-Instance-ID-Token"]=r.messagingToken),r.appCheckToken!==null&&(t["X-Firebase-AppCheck"]=r.appCheckToken),t}function SS(n,e,t,r){const s=n._url(e);return kS(n,s,t,r)}async function kS(n,e,t,r){t=La(t);const s={data:t},i=await Nv(n,r),o=r.timeout||7e4,c=IS(o),u=await Promise.race([RS(e,s,i,n.fetchImpl),c.promise,n.cancelAllRequests]);if(c.cancel(),!u)throw new _t("cancelled","Firebase Functions instance was deleted.");const d=Ma(u.status,u.json);if(d)throw d;if(!u.json)throw new _t("internal","Response is not valid JSON object.");let f=u.json.data;if(typeof f>"u"&&(f=u.json.result),typeof f>"u")throw new _t("internal","Response is missing data field.");return{data:As(f)}}function CS(n,e,t,r){const s=n._url(e);return PS(n,s,t,r||{})}async function PS(n,e,t,r){var s;t=La(t);const i={data:t},o=await Nv(n,r);o["Content-Type"]="application/json",o.Accept="text/event-stream";let c;try{c=await n.fetchImpl(e,{method:"POST",body:JSON.stringify(i),headers:o,signal:r?.signal})}catch(b){if(b instanceof Error&&b.name==="AbortError"){const S=new _t("cancelled","Request was cancelled.");return{data:Promise.reject(S),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(S)}}}}}}const E=Ma(0,null);return{data:Promise.reject(E),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(E)}}}}}}let u,d;const f=new Promise((b,E)=>{u=b,d=E});(s=r?.signal)===null||s===void 0||s.addEventListener("abort",()=>{const b=new _t("cancelled","Request was cancelled.");d(b)});const p=c.body.getReader(),g=xS(p,u,d,r?.signal);return{stream:{[Symbol.asyncIterator](){const b=g.getReader();return{async next(){const{value:E,done:S}=await b.read();return{value:E,done:S}},async return(){return await b.cancel(),{done:!0,value:void 0}}}}},data:f}}function xS(n,e,t,r){const s=(o,c)=>{const u=o.match(wS);if(!u)return;const d=u[1];try{const f=JSON.parse(d);if("result"in f){e(As(f.result));return}if("message"in f){c.enqueue(As(f.message));return}if("error"in f){const p=Ma(0,f);c.error(p),t(p);return}}catch(f){if(f instanceof _t){c.error(f),t(f);return}}},i=new TextDecoder;return new ReadableStream({start(o){let c="";return u();async function u(){if(r?.aborted){const d=new _t("cancelled","Request was cancelled");return o.error(d),t(d),Promise.resolve()}try{const{value:d,done:f}=await n.read();if(f){c.trim()&&s(c.trim(),o),o.close();return}if(r?.aborted){const g=new _t("cancelled","Request was cancelled");o.error(g),t(g),await n.cancel();return}c+=i.decode(d,{stream:!0});const p=c.split(`
`);c=p.pop()||"";for(const g of p)g.trim()&&s(g.trim(),o);return u()}catch(d){const f=d instanceof _t?d:Ma(0,null);o.error(f),t(f)}}},cancel(){return n.cancel()}})}const Fp="@firebase/functions",Up="0.12.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NS="auth-internal",DS="app-check-internal",VS="messaging-internal";function OS(n){const e=(t,{instanceIdentifier:r})=>{const s=t.getProvider("app").getImmediate(),i=t.getProvider(NS),o=t.getProvider(VS),c=t.getProvider(DS);return new ES(s,i,o,c,r)};Kt(new Ot(wd,e,"PUBLIC").setMultipleInstances(!0)),At(Fp,Up,n),At(Fp,Up,"esm2017")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function LS(n=Ka(),e=Jl){const r=Cr(Ie(n),wd).getImmediate({identifier:e}),s=fm("functions");return s&&MS(r,...s),r}function MS(n,e,t){TS(Ie(n),e,t)}function Lr(n,e,t){return AS(Ie(n),e)}OS();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dv="firebasestorage.googleapis.com",Vv="storageBucket",FS=2*60*1e3,US=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue extends Mt{constructor(e,t,r=0){super(al(e),`Firebase Storage: ${t} (${al(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,Ue.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return al(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var Fe;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(Fe||(Fe={}));function al(n){return"storage/"+n}function Id(){const n="An unknown error occurred, please check the error payload for server response.";return new Ue(Fe.UNKNOWN,n)}function BS(n){return new Ue(Fe.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function $S(n){return new Ue(Fe.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function qS(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new Ue(Fe.UNAUTHENTICATED,n)}function jS(){return new Ue(Fe.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function zS(n){return new Ue(Fe.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function GS(){return new Ue(Fe.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function HS(){return new Ue(Fe.CANCELED,"User canceled the upload/download.")}function KS(n){return new Ue(Fe.INVALID_URL,"Invalid URL '"+n+"'.")}function WS(n){return new Ue(Fe.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function QS(){return new Ue(Fe.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+Vv+"' property when initializing the app?")}function YS(){return new Ue(Fe.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function JS(){return new Ue(Fe.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function XS(n){return new Ue(Fe.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function Xl(n){return new Ue(Fe.INVALID_ARGUMENT,n)}function Ov(){return new Ue(Fe.APP_DELETED,"The Firebase app was deleted.")}function ZS(n){return new Ue(Fe.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function gi(n,e){return new Ue(Fe.INVALID_FORMAT,"String does not match format '"+n+"': "+e)}function ti(n){throw new Ue(Fe.INTERNAL_ERROR,"Internal error: "+n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=Tt.makeFromUrl(e,t)}catch{return new Tt(e,"")}if(r.path==="")return r;throw WS(e)}static makeFromUrl(e,t){let r=null;const s="([A-Za-z0-9.\\-_]+)";function i(M){M.path.charAt(M.path.length-1)==="/"&&(M.path_=M.path_.slice(0,-1))}const o="(/(.*))?$",c=new RegExp("^gs://"+s+o,"i"),u={bucket:1,path:3};function d(M){M.path_=decodeURIComponent(M.path)}const f="v[A-Za-z0-9_]+",p=t.replace(/[.]/g,"\\."),g="(/([^?#]*).*)?$",b=new RegExp(`^https?://${p}/${f}/b/${s}/o${g}`,"i"),E={bucket:1,path:3},S=t===Dv?"(?:storage.googleapis.com|storage.cloud.google.com)":t,A="([^?#]*)",O=new RegExp(`^https?://${S}/${s}/${A}`,"i"),x=[{regex:c,indices:u,postModify:i},{regex:b,indices:E,postModify:d},{regex:O,indices:{bucket:1,path:2},postModify:d}];for(let M=0;M<x.length;M++){const P=x[M],F=P.regex.exec(e);if(F){const T=F[P.indices.bucket];let v=F[P.indices.path];v||(v=""),r=new Tt(T,v),P.postModify(r);break}}if(r==null)throw KS(e);return r}}class ek{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tk(n,e,t){let r=1,s=null,i=null,o=!1,c=0;function u(){return c===2}let d=!1;function f(...A){d||(d=!0,e.apply(null,A))}function p(A){s=setTimeout(()=>{s=null,n(b,u())},A)}function g(){i&&clearTimeout(i)}function b(A,...O){if(d){g();return}if(A){g(),f.call(null,A,...O);return}if(u()||o){g(),f.call(null,A,...O);return}r<64&&(r*=2);let x;c===1?(c=2,x=0):x=(r+Math.random())*1e3,p(x)}let E=!1;function S(A){E||(E=!0,g(),!d&&(s!==null?(A||(c=2),clearTimeout(s),p(0)):A||(c=1)))}return p(0),i=setTimeout(()=>{o=!0,S(!0)},t),S}function nk(n){n(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rk(n){return n!==void 0}function sk(n){return typeof n=="object"&&!Array.isArray(n)}function Ed(n){return typeof n=="string"||n instanceof String}function Bp(n){return Td()&&n instanceof Blob}function Td(){return typeof Blob<"u"}function $p(n,e,t,r){if(r<e)throw Xl(`Invalid value for '${n}'. Expected ${e} or greater.`);if(r>t)throw Xl(`Invalid value for '${n}'. Expected ${t} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ac(n,e,t){let r=e;return t==null&&(r=`https://${e}`),`${t}://${r}/v0${n}`}function Lv(n){const e=encodeURIComponent;let t="?";for(const r in n)if(n.hasOwnProperty(r)){const s=e(r)+"="+e(n[r]);t=t+s+"&"}return t=t.slice(0,-1),t}var mr;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(mr||(mr={}));/**
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
 */function ik(n,e){const t=n>=500&&n<600,s=[408,429].indexOf(n)!==-1,i=e.indexOf(n)!==-1;return t||s||i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ok{constructor(e,t,r,s,i,o,c,u,d,f,p,g=!0){this.url_=e,this.method_=t,this.headers_=r,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=o,this.callback_=c,this.errorCallback_=u,this.timeout_=d,this.progressCallback_=f,this.connectionFactory_=p,this.retry=g,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((b,E)=>{this.resolve_=b,this.reject_=E,this.start_()})}start_(){const e=(r,s)=>{if(s){r(!1,new Vo(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const o=c=>{const u=c.loaded,d=c.lengthComputable?c.total:-1;this.progressCallback_!==null&&this.progressCallback_(u,d)};this.progressCallback_!==null&&i.addUploadProgressListener(o),i.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(o),this.pendingConnection_=null;const c=i.getErrorCode()===mr.NO_ERROR,u=i.getStatus();if(!c||ik(u,this.additionalRetryCodes_)&&this.retry){const f=i.getErrorCode()===mr.ABORT;r(!1,new Vo(!1,null,f));return}const d=this.successCodes_.indexOf(u)!==-1;r(!0,new Vo(d,i))})},t=(r,s)=>{const i=this.resolve_,o=this.reject_,c=s.connection;if(s.wasSuccessCode)try{const u=this.callback_(c,c.getResponse());rk(u)?i(u):i()}catch(u){o(u)}else if(c!==null){const u=Id();u.serverResponse=c.getErrorText(),this.errorCallback_?o(this.errorCallback_(c,u)):o(u)}else if(s.canceled){const u=this.appDelete_?Ov():HS();o(u)}else{const u=GS();o(u)}};this.canceled_?t(!1,new Vo(!1,null,!0)):this.backoffId_=tk(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&nk(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Vo{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}}function ak(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function ck(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function lk(n,e){e&&(n["X-Firebase-GMPID"]=e)}function uk(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function dk(n,e,t,r,s,i,o=!0){const c=Lv(n.urlParams),u=n.url+c,d=Object.assign({},n.headers);return lk(d,e),ak(d,t),ck(d,i),uk(d,r),new ok(u,n.method,d,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,s,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hk(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function fk(...n){const e=hk();if(e!==void 0){const t=new e;for(let r=0;r<n.length;r++)t.append(n[r]);return t.getBlob()}else{if(Td())return new Blob(n);throw new Ue(Fe.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function pk(n,e,t){return n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null}/**
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
 */function mk(n){if(typeof atob>"u")throw XS("base-64");return atob(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jt={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class cl{constructor(e,t){this.data=e,this.contentType=t||null}}function gk(n,e){switch(n){case jt.RAW:return new cl(Mv(e));case jt.BASE64:case jt.BASE64URL:return new cl(Fv(n,e));case jt.DATA_URL:return new cl(vk(e),yk(e))}throw Id()}function Mv(n){const e=[];for(let t=0;t<n.length;t++){let r=n.charCodeAt(t);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(t<n.length-1&&(n.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{const i=r,o=n.charCodeAt(++t);r=65536|(i&1023)<<10|o&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function _k(n){let e;try{e=decodeURIComponent(n)}catch{throw gi(jt.DATA_URL,"Malformed data URL.")}return Mv(e)}function Fv(n,e){switch(n){case jt.BASE64:{const s=e.indexOf("-")!==-1,i=e.indexOf("_")!==-1;if(s||i)throw gi(n,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case jt.BASE64URL:{const s=e.indexOf("+")!==-1,i=e.indexOf("/")!==-1;if(s||i)throw gi(n,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=mk(e)}catch(s){throw s.message.includes("polyfill")?s:gi(n,"Invalid character found")}const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}class Uv{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(t===null)throw gi(jt.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=t[1]||null;r!=null&&(this.base64=bk(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function vk(n){const e=new Uv(n);return e.base64?Fv(jt.BASE64,e.rest):_k(e.rest)}function yk(n){return new Uv(n).contentType}function bk(n,e){return n.length>=e.length?n.substring(n.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rn{constructor(e,t){let r=0,s="";Bp(e)?(this.data_=e,r=e.size,s=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=s}size(){return this.size_}type(){return this.type_}slice(e,t){if(Bp(this.data_)){const r=this.data_,s=pk(r,e,t);return s===null?null:new Rn(s)}else{const r=new Uint8Array(this.data_.buffer,e,t-e);return new Rn(r,!0)}}static getBlob(...e){if(Td()){const t=e.map(r=>r instanceof Rn?r.data_:r);return new Rn(fk.apply(null,t))}else{const t=e.map(o=>Ed(o)?gk(jt.RAW,o).data:o.data_);let r=0;t.forEach(o=>{r+=o.byteLength});const s=new Uint8Array(r);let i=0;return t.forEach(o=>{for(let c=0;c<o.length;c++)s[i++]=o[c]}),new Rn(s,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bv(n){let e;try{e=JSON.parse(n)}catch{return null}return sk(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wk(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function Ik(n,e){const t=e.split("/").filter(r=>r.length>0).join("/");return n.length===0?t:n+"/"+t}function $v(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ek(n,e){return e}class dt{constructor(e,t,r,s){this.server=e,this.local=t||e,this.writable=!!r,this.xform=s||Ek}}let Oo=null;function Tk(n){return!Ed(n)||n.length<2?n:$v(n)}function qv(){if(Oo)return Oo;const n=[];n.push(new dt("bucket")),n.push(new dt("generation")),n.push(new dt("metageneration")),n.push(new dt("name","fullPath",!0));function e(i,o){return Tk(o)}const t=new dt("name");t.xform=e,n.push(t);function r(i,o){return o!==void 0?Number(o):o}const s=new dt("size");return s.xform=r,n.push(s),n.push(new dt("timeCreated")),n.push(new dt("updated")),n.push(new dt("md5Hash",null,!0)),n.push(new dt("cacheControl",null,!0)),n.push(new dt("contentDisposition",null,!0)),n.push(new dt("contentEncoding",null,!0)),n.push(new dt("contentLanguage",null,!0)),n.push(new dt("contentType",null,!0)),n.push(new dt("metadata","customMetadata",!0)),Oo=n,Oo}function Ak(n,e){function t(){const r=n.bucket,s=n.fullPath,i=new Tt(r,s);return e._makeStorageReference(i)}Object.defineProperty(n,"ref",{get:t})}function Rk(n,e,t){const r={};r.type="file";const s=t.length;for(let i=0;i<s;i++){const o=t[i];r[o.local]=o.xform(r,e[o.server])}return Ak(r,n),r}function jv(n,e,t){const r=Bv(e);return r===null?null:Rk(n,r,t)}function Sk(n,e,t,r){const s=Bv(e);if(s===null||!Ed(s.downloadTokens))return null;const i=s.downloadTokens;if(i.length===0)return null;const o=encodeURIComponent;return i.split(",").map(d=>{const f=n.bucket,p=n.fullPath,g="/b/"+o(f)+"/o/"+o(p),b=Ac(g,t,r),E=Lv({alt:"media",token:d});return b+E})[0]}function kk(n,e){const t={},r=e.length;for(let s=0;s<r;s++){const i=e[s];i.writable&&(t[i.server]=n[i.local])}return JSON.stringify(t)}class Ad{constructor(e,t,r,s){this.url=e,this.method=t,this.handler=r,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zv(n){if(!n)throw Id()}function Ck(n,e){function t(r,s){const i=jv(n,s,e);return zv(i!==null),i}return t}function Pk(n,e){function t(r,s){const i=jv(n,s,e);return zv(i!==null),Sk(i,s,n.host,n._protocol)}return t}function Gv(n){function e(t,r){let s;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?s=jS():s=qS():t.getStatus()===402?s=$S(n.bucket):t.getStatus()===403?s=zS(n.path):s=r,s.status=t.getStatus(),s.serverResponse=r.serverResponse,s}return e}function Hv(n){const e=Gv(n);function t(r,s){let i=e(r,s);return r.getStatus()===404&&(i=BS(n.path)),i.serverResponse=s.serverResponse,i}return t}function xk(n,e,t){const r=e.fullServerUrl(),s=Ac(r,n.host,n._protocol),i="GET",o=n.maxOperationRetryTime,c=new Ad(s,i,Pk(n,t),o);return c.errorHandler=Hv(e),c}function Nk(n,e){const t=e.fullServerUrl(),r=Ac(t,n.host,n._protocol),s="DELETE",i=n.maxOperationRetryTime;function o(u,d){}const c=new Ad(r,s,o,i);return c.successCodes=[200,204],c.errorHandler=Hv(e),c}function Dk(n,e){return n&&n.contentType||e&&e.type()||"application/octet-stream"}function Vk(n,e,t){const r=Object.assign({},t);return r.fullPath=n.path,r.size=e.size(),r.contentType||(r.contentType=Dk(null,e)),r}function Ok(n,e,t,r,s){const i=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function c(){let x="";for(let M=0;M<2;M++)x=x+Math.random().toString().slice(2);return x}const u=c();o["Content-Type"]="multipart/related; boundary="+u;const d=Vk(e,r,s),f=kk(d,t),p="--"+u+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+f+`\r
--`+u+`\r
Content-Type: `+d.contentType+`\r
\r
`,g=`\r
--`+u+"--",b=Rn.getBlob(p,r,g);if(b===null)throw YS();const E={name:d.fullPath},S=Ac(i,n.host,n._protocol),A="POST",O=n.maxUploadRetryTime,k=new Ad(S,A,Ck(n,t),O);return k.urlParams=E,k.headers=o,k.body=b.uploadData(),k.errorHandler=Gv(e),k}class Lk{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=mr.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=mr.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=mr.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,r,s){if(this.sent_)throw ti("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(t,e,!0),s!==void 0)for(const i in s)s.hasOwnProperty(i)&&this.xhr_.setRequestHeader(i,s[i].toString());return r!==void 0?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw ti("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw ti("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw ti("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw ti("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class Mk extends Lk{initXhr(){this.xhr_.responseType="text"}}function Rd(){return new Mk}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rr{constructor(e,t){this._service=e,t instanceof Tt?this._location=t:this._location=Tt.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new Rr(e,t)}get root(){const e=new Tt(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return $v(this._location.path)}get storage(){return this._service}get parent(){const e=wk(this._location.path);if(e===null)return null;const t=new Tt(this._location.bucket,e);return new Rr(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw ZS(e)}}function Fk(n,e,t){n._throwIfRoot("uploadBytes");const r=Ok(n.storage,n._location,qv(),new Rn(e,!0),t);return n.storage.makeRequestWithTokens(r,Rd).then(s=>({metadata:s,ref:n}))}function Uk(n){n._throwIfRoot("getDownloadURL");const e=xk(n.storage,n._location,qv());return n.storage.makeRequestWithTokens(e,Rd).then(t=>{if(t===null)throw JS();return t})}function Bk(n){n._throwIfRoot("deleteObject");const e=Nk(n.storage,n._location);return n.storage.makeRequestWithTokens(e,Rd)}function $k(n,e){const t=Ik(n._location.path,e),r=new Tt(n._location.bucket,t);return new Rr(n.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qk(n){return/^[A-Za-z]+:\/\//.test(n)}function jk(n,e){return new Rr(n,e)}function Kv(n,e){if(n instanceof Sd){const t=n;if(t._bucket==null)throw QS();const r=new Rr(t,t._bucket);return e!=null?Kv(r,e):r}else return e!==void 0?$k(n,e):n}function zk(n,e){if(e&&qk(e)){if(n instanceof Sd)return jk(n,e);throw Xl("To use ref(service, url), the first argument must be a Storage instance.")}else return Kv(n,e)}function qp(n,e){const t=e?.[Vv];return t==null?null:Tt.makeFromBucketSpec(t,n)}function Gk(n,e,t,r={}){n.host=`${e}:${t}`,n._protocol="http";const{mockUserToken:s}=r;s&&(n._overrideAuthToken=typeof s=="string"?s:gb(s,n.app.options.projectId))}class Sd{constructor(e,t,r,s,i){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=s,this._firebaseVersion=i,this._bucket=null,this._host=Dv,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=FS,this._maxUploadRetryTime=US,this._requests=new Set,s!=null?this._bucket=Tt.makeFromBucketSpec(s,this._host):this._bucket=qp(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Tt.makeFromBucketSpec(this._url,e):this._bucket=qp(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){$p("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){$p("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){if(It(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Rr(this,e)}_makeRequest(e,t,r,s,i=!0){if(this._deleted)return new ek(Ov());{const o=dk(e,this._appId,r,s,t,this._firebaseVersion,i);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,s).getPromise()}}const jp="@firebase/storage",zp="0.13.6";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wv="storage";function Hk(n,e,t){return n=Ie(n),Fk(n,e,t)}function Kk(n){return n=Ie(n),Uk(n)}function Wk(n){return n=Ie(n),Bk(n)}function Qv(n,e){return n=Ie(n),zk(n,e)}function Qk(n=Ka(),e){n=Ie(n);const r=Cr(n,Wv).getImmediate({identifier:e}),s=fm("storage");return s&&Yk(r,...s),r}function Yk(n,e,t,r={}){Gk(n,e,t,r)}function Jk(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),s=n.getProvider("app-check-internal");return new Sd(t,r,s,e,Pr)}function Xk(){Kt(new Ot(Wv,Jk,"PUBLIC").setMultipleInstances(!0)),At(jp,zp,""),At(jp,zp,"esm2017")}Xk();const Zk={apiKey:"AIzaSyD9MJrON70mPqZxQqhndgQHNkTZUnnaQIs",authDomain:"altorra-cars.firebaseapp.com",databaseURL:"https://altorra-cars-default-rtdb.firebaseio.com",projectId:"altorra-cars",storageBucket:"altorra-cars.firebasestorage.app",messagingSenderId:"235148219730",appId:"1:235148219730:web:ceabdbc52fdcbe8b85168b",measurementId:"G-ZGZ6CVTB73"},eC="altorra-crm",io=ym(Zk,eC);fS(io,{provider:new bd("6Lfz8BQtAAAAAILjn8GbHFT8u6dpg5rFvg5hGZzS"),isTokenAutoRefreshEnabled:!0});const Bi=eT(io),se=pR(io,{localCache:kR({tabManager:vv({})})}),Mr=LS(io,"us-central1"),Yv=Qk(io);function Ye(n){const e=H.get().permissions||[];return e.includes("*")||e.includes(n)}function tC(n){return n?n.rol==="super_admin"||n.roleId==="system_super_admin"?["*"]:Array.isArray(n.permissions)&&n.permissions.length?n.permissions.slice():[]:[]}async function nC(n){try{const e=await Or(Re(se,"usuarios",n.uid)),t=e.exists()?e.data():null;if(t&&t.bloqueado===!0){await Hm(Bi),H.set({user:null,profile:null,permissions:[],ready:!0,authError:"Cuenta bloqueada. Contacta al administrador."});return}H.set({user:n,profile:t,permissions:tC(t),ready:!0,authError:null})}catch(e){console.warn("[auth] no se pudo hidratar el perfil:",e),H.set({user:n,profile:null,permissions:[],ready:!0})}}function rC(){$I(Bi,Qm).catch(()=>{}),zI(Bi,n=>{n?nC(n):H.set({user:null,profile:null,permissions:[],ready:!0})})}const sC={"auth/invalid-email":"Correo inválido.","auth/user-disabled":"Esta cuenta está deshabilitada.","auth/user-not-found":"No existe una cuenta con ese correo.","auth/wrong-password":"Contraseña incorrecta.","auth/invalid-credential":"Credenciales incorrectas.","auth/too-many-requests":"Demasiados intentos. Espera unos minutos.","auth/network-request-failed":"Sin conexión. Revisa tu internet."};async function iC(n,e){H.set({authError:null});try{await BI(Bi,String(n).trim(),e)}catch(t){const r=sC[t&&t.code]||"No se pudo iniciar sesión.";throw H.set({authError:r}),t}}async function oC(){if(H.get().mock){H.set({user:null,profile:null,permissions:[]});return}await Hm(Bi)}function ll(){const{profile:n,user:e}=H.get();return n&&(n.nombre||n.roleName)||e&&(e.displayName||e.email)||"Usuario"}function aC(){const{profile:n}=H.get();return n&&(n.cargo||n.roleName)||"Asesor"}const cC=["bandeja","pipeline","agenda","reportes","contactos","config","resenas","banners"];function Jv(){const n=(location.hash||"").replace(/^#\/?/,""),[e]=n.split("/");return cC.includes(e)?e:"bandeja"}function lC(n){location.hash!==`#/${n}`&&(location.hash=`#/${n}`)}function uC(n){const e=()=>n(Jv());return window.addEventListener("hashchange",e),()=>window.removeEventListener("hashchange",e)}function l(n,e={},t=[]){const r=document.createElement(n);for(const[s,i]of Object.entries(e))i==null||i===!1||(s==="class"?r.className=i:s==="html"?r.innerHTML=i:s==="text"?r.textContent=i:s==="dataset"?Object.assign(r.dataset,i):s==="style"&&typeof i=="object"?Object.assign(r.style,i):s.startsWith("on")&&typeof i=="function"?r.addEventListener(s.slice(2).toLowerCase(),i):r.setAttribute(s,i===!0?"":String(i)));for(const s of[].concat(t))s==null||s===!1||s===""||r.append(s.nodeType?s:document.createTextNode(String(s)));return r}function me(n){for(;n&&n.firstChild;)n.removeChild(n.firstChild);return n}let as=null;function Xv(n){as&&!as.contains(n.target)&&Fa()}function Zv(n){n.key==="Escape"&&Fa()}function Fa(){as&&(as.remove(),as=null,document.removeEventListener("mousedown",Xv,!0),window.removeEventListener("keydown",Zv,!0))}function Bt(n,e,t,r={}){Fa();const s=l("div",{class:"popover",role:"menu"});r.title&&s.append(l("div",{class:"popover__title",text:r.title})),e.forEach(o=>{if(o.divider){s.append(l("div",{class:"popover__divider"}));return}const c=l("button",{class:"popover__item"+(o.active?" is-active":""),type:"button",role:"menuitem"},[o.icon?l("span",{class:"popover__icon",text:o.icon}):null,l("span",{class:"u-grow u-truncate",text:o.label}),o.hint?l("span",{class:"popover__hint u-caption",text:o.hint}):null]);c.addEventListener("click",u=>{u.stopPropagation(),Fa(),t(o)}),s.append(c)}),document.body.append(s),dC(s,n),as=s,setTimeout(()=>{document.addEventListener("mousedown",Xv,!0),window.addEventListener("keydown",Zv,!0)},0);const i=s.querySelector(".popover__item");i&&i.focus()}function dC(n,e){const t=e.getBoundingClientRect(),r=n.offsetWidth,s=n.offsetHeight;let i=t.bottom+6,o=t.right-r;o<8&&(o=8),o+r>window.innerWidth-8&&(o=window.innerWidth-r-8),i+s>window.innerHeight-8&&(i=t.top-s-6),n.style.top=`${Math.max(8,i)}px`,n.style.left=`${Math.max(8,o)}px`}function Rs(n){const e=String(n||"").trim().split(/\s+/).filter(Boolean);return e.length?e.length===1?e[0].slice(0,2).toUpperCase():(e[0][0]+e[e.length-1][0]).toUpperCase():"?"}function hC(n){return String(n||"").replace(/\D/g,"")}function ey(n,e){const t=hC(n);if(!t)return"";const r=e?"?text="+encodeURIComponent(e):"";return"https://wa.me/"+t+r}function ty(n){if(!n)return 1/0;const e=new Date(n).getTime();return Number.isNaN(e)?1/0:Date.now()-e}function Ss(n){const e=ty(n);return e===1/0?1/0:e/864e5}function gr(n){const e=ty(n);if(e===1/0)return"—";const t=Math.floor(e/6e4);if(t<1)return"ahora";if(t<60)return`hace ${t} min`;const r=Math.floor(t/60);if(r<24)return`hace ${r} h`;const s=Math.floor(r/24);return s===1?"ayer":s<7?`hace ${s} d`:new Date(n).toLocaleDateString("es-CO",{day:"numeric",month:"short"})}function fC(n){if(!n)return"—";const e=new Date(n);return Number.isNaN(e.getTime())?"—":e.toLocaleString("es-CO",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}function ul(n){const e=Math.abs(n),t=Math.round(e/6e4);if(t<60)return`${t} min`;const r=Math.floor(t/60),s=t%60;return s?`${r} h ${s} min`:`${r} h`}function nr(n){const e=Number(n)||0;if(!e)return"";if(e>=1e6){const t=e/1e6;return"$"+(t%1?t.toFixed(1).replace(".",","):t.toFixed(0))+" M"}return e>=1e3?"$"+Math.round(e/1e3)+" K":"$"+e}function Ua(n){return String(n||"").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu,"")}const pC="0.4.1",mC=[{id:"bandeja",label:"Bandeja",icon:"📥",ready:!0},{id:"pipeline",label:"Pipeline",icon:"🎯",ready:!0},{id:"agenda",label:"Agenda",icon:"📅",ready:!0},{id:"reportes",label:"Reportes",icon:"📊",ready:!0},{id:"contactos",label:"Contactos",icon:"👤",ready:!0},{id:"config",label:"Disponibilidad",icon:"⚙️",ready:!0,perm:"calendar.config"},{id:"resenas",label:"Reseñas",icon:"⭐",ready:!0,perm:"reviews.read"},{id:"banners",label:"Banners",icon:"🖼️",ready:!0,perm:"banners.read"}],dl={bandeja:"Bandeja Inteligente",pipeline:"Pipeline de ventas",agenda:"Agenda",reportes:"Reportes y KPIs",contactos:"Contactos",config:"Disponibilidad de citas",resenas:"Reseñas del sitio",banners:"Banners del sitio"};function gC(n){const e={},t=l("div",{class:"sidebar__brand"},[l("span",{class:"sidebar__logo",text:"ALTORRA"}),l("span",{class:"sidebar__sub u-caption",text:"CRM"})]),r=l("nav",{class:"sidebar__nav","aria-label":"Secciones"});mC.filter(S=>!S.perm||Ye(S.perm)).forEach(S=>{const A=l("button",{class:"navitem",type:"button",disabled:!S.ready},[l("span",{class:"navitem__icon","aria-hidden":"true",text:S.icon}),l("span",{class:"navitem__label",text:S.label}),S.ready?null:l("span",{class:"navitem__soon",text:"Pronto"})]);S.ready&&A.addEventListener("click",()=>lC(S.id)),e[S.id]=A,r.append(A)});const s=l("aside",{class:"sidebar"},[t,r,l("div",{class:"sidebar__foot u-caption u-faint"},[`v${pC} · Fase 4`])]),i=l("h1",{class:"topbar__h",text:dl.bandeja}),o=l("span",{class:"topbar__crumb u-caption u-faint",text:H.get().mock?"modo demo":"tiempo real"}),c=l("div",{class:"topbar__title"},[i,o]),u=l("button",{class:"icon-btn",type:"button","aria-label":"Cambiar tema"},[l("span",{"aria-hidden":"true",text:H.get().theme==="dark"?"☀️":"🌙"})]);u.addEventListener("click",()=>{const S=lb();u.firstChild.textContent=S==="dark"?"☀️":"🌙"});const d=l("button",{class:"usermenu",type:"button","aria-haspopup":"menu"},[l("span",{class:"avatar avatar--sm","aria-hidden":"true",text:Rs(ll())}),l("span",{class:"usermenu__meta"},[l("span",{class:"usermenu__name u-truncate",text:ll()}),l("span",{class:"usermenu__role u-caption u-faint u-truncate",text:aC()})])]);d.addEventListener("click",()=>{Bt(d,[{value:"logout",label:"Cerrar sesión",icon:"🚪"}],S=>{S.value==="logout"&&oC()},{title:ll()})});const f=l("header",{class:"topbar"},[c,l("div",{class:"topbar__actions u-row"},[u,d])]),p=l("main",{class:"outlet",id:"outlet"}),g=l("div",{id:"detail-root"}),b=l("div",{class:"app-shell"},[s,l("div",{class:"app-main"},[f,p]),g]);me(n),n.removeAttribute("aria-busy"),n.append(b);function E(S){Object.entries(e).forEach(([A,O])=>{const k=A===S;O.classList.toggle("is-active",k),k?O.setAttribute("aria-current","page"):O.removeAttribute("aria-current")}),i.textContent=dl[S]||dl.bandeja}return{outlet:p,detailRoot:g,setActive:E}}function _C(n){const e=l("input",{class:"input",type:"email",placeholder:"correo@altorracars.com",autocomplete:"username",required:!0,"aria-label":"Correo"}),t=l("input",{class:"input",type:"password",placeholder:"Contraseña",autocomplete:"current-password",required:!0,"aria-label":"Contraseña"}),r=l("div",{class:"login__error",role:"alert",hidden:!0}),s=l("button",{class:"btn btn--gold btn--block",type:"submit"},["Entrar"]),i=l("form",{class:"login__form"},[l("label",{class:"field"},[l("span",{class:"field__label",text:"Correo"}),e]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Contraseña"}),t]),r,s]);i.addEventListener("submit",async c=>{c.preventDefault(),r.hidden=!0,s.disabled=!0,s.textContent="Entrando…";try{await iC(e.value,t.value)}catch{r.textContent=H.get().authError||"No se pudo iniciar sesión.",r.hidden=!1,s.disabled=!1,s.textContent="Entrar"}});const o=l("div",{class:"login surface"},[l("div",{class:"login__brand"},[l("span",{class:"login__logo",text:"ALTORRA"}),l("span",{class:"login__tag u-caption u-faint",text:"CRM · Bandeja Inteligente"})]),l("h1",{class:"login__title",text:"Bienvenido"}),l("p",{class:"login__lead u-muted",text:"Inicia sesión para gestionar tus clientes."}),i,l("div",{class:"login__foot u-caption u-faint",text:"Acceso restringido al equipo de Altorra Cars."})]);me(n),n.removeAttribute("aria-busy"),n.append(l("div",{class:"login-wrap"},[o])),setTimeout(()=>e.focus(),50)}const vC=()=>document.getElementById("toast-root"),Gp={ok:"✓",error:"⚠",info:"ℹ"};function G(n,e="info",t=3200){const r=vC();if(!r)return;const s=document.createElement("div");s.className=`toast toast--${e}`,s.setAttribute("role",e==="error"?"alert":"status");const i=document.createElement("span");i.setAttribute("aria-hidden","true"),i.textContent=Gp[e]||Gp.info;const o=document.createElement("span");o.className="u-grow",o.textContent=n,s.append(i,o),r.appendChild(s);const c=()=>{s.classList.add("is-leaving"),s.addEventListener("animationend",()=>s.remove(),{once:!0})},u=setTimeout(c,t);s.addEventListener("click",()=>{clearTimeout(u),c()})}const yC=["financiacion","financiación","compra","test_drive","test-drive","cotizacion","cotización"],bC=["cita","test_drive","test-drive","visita","agendar","peritaje"],wC=["financiacion","financiación","consignacion","consignación","consignacion_venta","compra","venta","cotizacion","cotización"],IC=["pqr","reclamo","queja","peticion","petición","garantia","garantía","soporte"],EC={cita:{label:"Cita",icon:"📅",badge:"info"},solicitud:{label:"Solicitud",icon:"📝",badge:"gold"},pqr:{label:"PQR",icon:"⚠️",badge:"danger"},lead:{label:"Lead",icon:"✨",badge:""}};function Rc(n){const e=String(n.sourceDetail||"").toLowerCase(),t=String(n.source||"").toLowerCase();let r="lead";return IC.some(s=>e.includes(s)||t.includes(s))?r="pqr":t.includes("cita")||bC.some(s=>e.includes(s))?r="cita":wC.some(s=>e.includes(s))&&(r="solicitud"),{type:r,...EC[r]}}function kd(n){const e=String(n.sourceDetail||"").toLowerCase();return yC.some(t=>e.includes(t))||!!n.vehicleOfInterestId}const TC={whatsapp:{label:"WhatsApp",icon:"🟢"},facebook:{label:"Facebook",icon:"📘"},instagram:{label:"Instagram",icon:"📸"},tiktok:{label:"TikTok",icon:"🎵"},marketplace:{label:"Marketplace",icon:"🛒"},llamada:{label:"Llamada",icon:"📞"},presencial:{label:"Presencial",icon:"🏬"},referido:{label:"Referido",icon:"🤝"},bot:{label:"ALTOR Bot",icon:"🤖"},cuenta:{label:"Cuenta",icon:"👤"},newsletter:{label:"Newsletter",icon:"✉️"},cita:{label:"Cita web",icon:"📅"},web:{label:"Web",icon:"🌐"}};function $i(n){const e=String(n.source||"").toLowerCase();let t="web";return e.includes("whatsapp")||e.includes("wsp")||e.includes("wa.me")?t="whatsapp":e.includes("facebook")||e.includes("meta")||e==="fb"?t="facebook":e.includes("instagram")||e==="ig"?t="instagram":e.includes("tiktok")||e==="tt"?t="tiktok":e.includes("marketplace")||e.includes("mercadolibre")||e.includes("tucarro")?t="marketplace":e.includes("llamada")||e.includes("telefono")||e.includes("teléfono")||e.includes("call")?t="llamada":e.includes("presencial")||e.includes("walk")||e.includes("showroom")||e.includes("local")?t="presencial":e.includes("referido")||e.includes("referral")||e.includes("recomendado")?t="referido":e.includes("bot")||e.includes("concierge")||e.includes("altor")?t="bot":e.includes("cuenta")||e.includes("registro")||e.includes("account")||e.includes("signup")?t="cuenta":e.includes("news")||e.includes("subscri")||e.includes("suscri")?t="newsletter":e.includes("cita")&&(t="cita"),{key:t,...TC[t]}}const AC=[{id:"whatsapp",label:"WhatsApp",icon:"🟢"},{id:"facebook",label:"Facebook (Meta)",icon:"📘"},{id:"instagram",label:"Instagram",icon:"📸"},{id:"tiktok",label:"TikTok",icon:"🎵"},{id:"marketplace",label:"Marketplace",icon:"🛒"},{id:"llamada",label:"Llamada",icon:"📞"},{id:"presencial",label:"Presencial / Showroom",icon:"🏬"},{id:"referido",label:"Referido",icon:"🤝"},{id:"web",label:"Web (otro)",icon:"🌐"}],RC=[{id:"compra",label:"Compra"},{id:"financiacion",label:"Financiación"},{id:"cita",label:"Cita / Test drive"},{id:"consignacion_venta",label:"Vende su carro"},{id:"peritaje",label:"Peritaje"},{id:"consulta",label:"Consulta general"}],Lo={cita:30*60*1e3,pqr:60*60*1e3,solicitud:2*60*60*1e3,lead:24*60*60*1e3};function ny(n){const e=ks(n.status),{type:t}=Rc(n);let r=n.slaDueAt?new Date(n.slaDueAt).getTime():null;r||(r=(n.createdAt?new Date(n.createdAt).getTime():Date.now())+(Lo[t]||Lo.lead));const s=r-Date.now(),i=Lo[t]||Lo.lead;let o="ok";return e?o="ok":s<=0?o="late":s<i*.25&&(o="warn"),{state:o,dueAt:r,remainingMs:s,closed:e}}const Zl=[{id:"nuevo",label:"Nuevo",badge:"gold"},{id:"contactado",label:"Contactado",badge:"info"},{id:"convertido",label:"Convertido",badge:"ok"},{id:"descartado",label:"Descartado",badge:""}],SC=[{id:"inalcanzable",label:"Inalcanzable (no responde)"},{id:"no_califica",label:"No califica (sin presupuesto/intención)"},{id:"duplicado",label:"Duplicado"},{id:"ya_compro_en_otra_parte",label:"Ya compró en otra parte"},{id:"spam_prueba",label:"Spam / prueba"}],kC={calificado:{id:"calificado",label:"Calificado (v2)",badge:"ok"},no_calificado:{id:"no_calificado",label:"No calificado (v2)",badge:""},perdido:{id:"perdido",label:"Perdido (v2)",badge:"danger"}},CC=Zl.reduce((n,e)=>(n[e.id]=e,n),{});function sa(n){return CC[n]||kC[n]||{id:n||"nuevo",label:n||"Nuevo",badge:""}}function ks(n){return n==="convertido"||n==="descartado"||n==="perdido"||n==="no_calificado"}function ry(n){return!n.status||n.status==="nuevo"}const eu={intent:.3,interactions:.18,recency:.22,frequency:.12,economic:.07,age:.06,engagement:.05},lr=n=>Math.max(0,Math.min(1,n));function PC(n){const e=String(n.sourceDetail||"").toLowerCase();let t=.25;return kd(n)?t=1:/(consignacion|consignación|peritaje|venta)/.test(e)?t=.6:(/(consulta|info|general)/.test(e)||!e)&&(t=.3),n.vehicleOfInterestId&&(t=Math.min(1,t+.15)),lr(t)}function xC(n){let e=0;for(const t of n){const r=`${t.subject||""} ${t.body||""}`;if(!/financ/i.test(r))continue;const s=(r.match(/\d[\d.,]{5,}/g)||[]).map(i=>parseInt(i.replace(/\D/g,""),10)).filter(i=>i>0);s.length&&(e=Math.max(e,Math.max(...s)/5e7))}return lr(e)}function NC(n){const e=new Set;for(const t of n){const r=t.createdAt;r&&(Ss(r)>30||e.add(String(r).slice(0,10)))}return lr(e.size/8)}function sy(n,e=[],t=null){const r=Array.isArray(e)?e:[],s={intent:PC(n),interactions:lr(r.length/6),recency:n.lastActivityAt?lr(1-Ss(n.lastActivityAt)/30):0,frequency:NC(r),economic:xC(r),age:n.createdAt?lr(Ss(n.createdAt)/60):0,engagement:t&&Number(t.score)?lr(t.score/100):0};let i=0;for(const c of Object.keys(eu))i+=s[c]*eu[c];const o=Math.round(i*100);return{score:o,rating:DC(o),factors:s}}function DC(n){return n>=70?"hot":n>=40?"warm":"cold"}const cs={hot:{label:"Caliente",icon:"🔥",cls:"temp--hot"},warm:{label:"Tibio",icon:"🌤️",cls:"temp--warm"},cold:{label:"Frío",icon:"❄️",cls:"temp--cold"}},Hp={intent:"Intención",interactions:"Interacciones",recency:"Recencia",frequency:"Frecuencia",economic:"Capacidad econ.",age:"Antigüedad",engagement:"Engagement"},VC=eu;function iy(n,e={}){const t=Number(e.score)||0,{type:r}=Rc(n),s=Ss(n.createdAt),i=Ss(n.lastActivityAt),o=ry(n),c=ks(n.status),u=[{id:"confirm_appointment",priority:95,when:r==="cita"&&!c&&o,label:"Confirmar cita",reason:"Cita pendiente de confirmación",icon:"📅"},{id:"reach_hot_lead",priority:90,when:t>=70&&o&&!c,label:"Contactar ya",reason:"Lead caliente sin respuesta",icon:"🔥"},{id:"send_quote",priority:88,when:kd(n)&&t>=55&&!c,label:"Enviar cotización",reason:"Interés de compra/financiación",icon:"🧾"},{id:"assign_asesor",priority:85,when:!n.ownerId&&!c,label:"Asignar asesor",reason:"Sin asesor asignado",icon:"🙋"},{id:"first_touch",priority:70,when:o&&s<2&&!c,label:"Primer contacto",reason:"Lead nuevo sin trabajar",icon:"👋"},{id:"whatsapp_followup",priority:60,when:t>=40&&t<70&&i>=2&&i<30&&!c,label:"Seguimiento WhatsApp",reason:"Lead tibio enfriándose",icon:"💬"},{id:"reactivate",priority:50,when:i>=30&&i!==1/0&&!c,label:"Reactivar con oferta",reason:"Inactivo +30 días",icon:"🎯"},{id:"nurture",priority:15,when:!c,label:"Nutrir relación",reason:"Sin acción urgente",icon:"🌱"},{id:"archived",priority:5,when:c,label:"Cerrado",reason:"Lead cerrado",icon:"✅"}],f=u.filter(p=>p.when).sort((p,g)=>g.priority-p.priority)[0]||u[u.length-1];return{id:f.id,label:f.label,reason:f.reason,icon:f.icon,priority:f.priority}}function oy(n,e=[]){const{score:t,rating:r,factors:s}=sy(n,e,null);return{...n,_score:t,_rating:r,_factors:s,_type:Rc(n),_channel:$i(n),_sla:ny(n),_nba:iy(n,{score:t})}}function Mo(n){return n.map(e=>oy(e))}const tu=[{id:"calientes",label:"Calientes sin contestar",icon:"🔥"},{id:"mios",label:"Mis asignados",icon:"👤"},{id:"sin_asignar",label:"Sin asignar",icon:"🆕"},{id:"todo",label:"Todo",icon:"📥"}];function ay(n,e,t){switch(e){case"calientes":return ry(n)&&!ks(n.status)&&(n._rating==="hot"||kd(n));case"mios":return n.ownerId===t;case"sin_asignar":return!n.ownerId&&!ks(n.status);case"todo":default:return!0}}function OC(n,e){const t={};for(const r of tu)t[r.id]=0;for(const r of n)for(const s of tu)ay(r,s.id,e)&&t[s.id]++;return t}const Fo={late:0,warn:1,ok:2};function LC(n,e){const t=n._sla&&n._sla.state||"ok",r=e._sla&&e._sla.state||"ok";return Fo[t]!==Fo[r]?Fo[t]-Fo[r]:e._score!==n._score?e._score-n._score:new Date(e.createdAt||0)-new Date(n.createdAt||0)}function MC(n,{type:e,channel:t,status:r}){return n.filter(s=>!(e&&s._type.type!==e||t&&s._channel.key!==t||r&&(s.status||"nuevo")!==r))}function FC(n,e){const t=Ua(e).trim();return t?n.filter(r=>Ua([r.fullName,r.email,r.phone,r.sourceDetail,r.source].join(" ")).includes(t)):n}function UC(n,e=Date.now()){if((n.status||"nuevo")!=="nuevo")return null;const t=new Date(n.createdAt||0).getTime();if(!t)return null;const r=Math.max(0,Math.floor((e-t)/6e4));return{mins:r,state:r>=60?"late":r>=45?"warn":"ok"}}function BC(n,{queue:e,uid:t,filters:r,search:s,showClosed:i=!1}){let o=n.filter(u=>ay(u,e,t));o=MC(o,r),o=FC(o,s);let c=0;if(!i&&!r.status){const u=o.filter(d=>!ks(d.status)&&!d.archived);c=o.length-u.length,o=u}return o.sort(LC),{rows:o,hiddenClosed:c}}const Sr=()=>new Date().toISOString(),Cd=n=>({id:n.id,...n.data()});function $C({pageSize:n=40,onData:e,onError:t}){let r=null;const s=ot(Ae(se,"leads"),vt("createdAt","desc"),kt(n));return{unsubscribe:Yt(s,o=>{const c=o.docs.map(Cd);r=o.docs[o.docs.length-1]||null,e(c,{hasMore:o.size>=n})},o=>{t&&t(o)}),getLastDoc:()=>r}}async function qC({pageSize:n=40,after:e}){if(!e)return{rows:[],lastDoc:null,hasMore:!1};const t=ot(Ae(se,"leads"),vt("createdAt","desc"),ER(e),kt(n)),r=await un(t);return{rows:r.docs.map(Cd),lastDoc:r.docs[r.docs.length-1]||null,hasMore:r.size>=n}}async function jC(){const e=(await un(Ae(se,"usuarios"))).docs.map(t=>{const r=t.data();return{uid:t.id,nombre:r.nombre||r.email||"Usuario",cargo:r.cargo||r.roleName||""}}).sort((t,r)=>t.nombre.localeCompare(r.nombre,"es"));return H.set({team:e}),e}async function zC(n,e){await at(Re(se,"leads",n),{ownerId:e?e.uid:null,ownerName:e?e.nombre:null,updatedAt:Sr(),updatedBy:kr(),_version:Jt(1)})}async function GC(n,e,t={},r={}){if(t&&t.convertedTo&&t.convertedTo.dealId)throw new Error("Este lead ya es un negocio: gestiónalo en el Pipeline.");const s=Sr();await at(Re(se,"leads",n),{...r,status:e,lastActivityAt:s,updatedAt:s,updatedBy:kr(),_version:Jt(1)}),await Ft(Ae(se,"activities"),{type:"status_change",subject:"Cambio de estado → "+e,body:"",status:"closed",direction:"outbound",relatedTo:{type:"lead",id:n,name:t.fullName||""},ownerId:kr(),createdAt:s,_version:1})}async function Kp(n,{type:e="nota",subject:t="",body:r="",direction:s="outbound",name:i=""}){await Ft(Ae(se,"activities"),{type:e,subject:t,body:r,status:"closed",direction:s,relatedTo:{type:"lead",id:n,name:i},ownerId:kr(),createdAt:Sr(),_version:1})}async function HC(n,{subject:e,dueAt:t,name:r=""}){await Ft(Ae(se,"activities"),{type:"tarea",subject:e,body:"",status:"open",direction:"outbound",dueAt:t,relatedTo:{type:"lead",id:n,name:r},ownerId:kr(),createdAt:Sr(),_version:1})}async function KC(){const n=new Date;n.setHours(23,59,59,999);const e=ot(Ae(se,"activities"),Un("dueAt","<=",n.toISOString()),vt("dueAt","desc"),kt(80));return(await un(e)).docs.map(Cd).filter(r=>r.status==="open"&&(r.type==="tarea"||r.type==="cita")).sort((r,s)=>String(r.dueAt).localeCompare(String(s.dueAt)))}async function WC(n){await at(Re(se,"activities",n),{status:"closed",closedAt:Sr(),closedBy:kr()})}async function QC(n,e=!0){await at(Re(se,"leads",n),{archived:e,archivedAt:e?Sr():null,updatedAt:Sr(),updatedBy:kr(),_version:Jt(1)})}async function YC(n){return(await Lr(Mr,"crmPurgeLead")({leadId:n})).data}function kr(){const n=H.get().user;return n?n.uid:null}async function JC(n){const e=H.get().user?H.get().user.uid:null,t=["manual",n.trafico,n.campana].filter(Boolean);return(await Ft(Ae(se,"solicitudes"),{nombre:n.nombre||"",email:(n.email||"").trim().toLowerCase(),telefono:n.telefono||"",prefijoPais:n.prefijoPais||"+57",origen:n.canal||"manual",tipo:n.interes||"consulta",vehiculoId:n.vehiculoId||null,kind:"lead",comentarios:n.notas||"",consentGiven:n.consentGiven===!0,tags:t,source:{page:"manual",campaign:n.campana||null,traffic:n.trafico||null},clientCategory:"manual",createdAt:new Date().toISOString(),_manual:!0,_createdByUid:e})).id}const ur=n=>new Date(Date.now()-n*6e4).toISOString(),De=n=>ur(n*60),oe=n=>ur(n*60*24),XC=[{uid:"u_ceo",nombre:"Rodrigo (CEO)",cargo:"CEO"},{uid:"u_ana",nombre:"Ana Restrepo",cargo:"Asesora comercial"},{uid:"u_luis",nombre:"Luis Pérez",cargo:"Asesor comercial"}],Pd=[{id:"l1",fullName:"María Fernanda Gómez",email:"mafe.gomez@gmail.com",phone:"+573012345678",source:"financiacion",sourceDetail:"financiacion",vehicleOfInterestId:"mazda-cx5-2021",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:ur(-40),contactId:"email_mafe_gomez_gmail_com",createdAt:ur(18),lastActivityAt:ur(18),_version:1},{id:"l2",fullName:"Carlos Andrés Salcedo",email:"casalcedo@outlook.com",phone:"+573159876543",source:"cita",sourceDetail:"test_drive",vehicleOfInterestId:"toyota-corolla-2022",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:ur(5),contactId:"email_casalcedo_outlook_com",createdAt:De(1),lastActivityAt:De(1),_version:1},{id:"l3",fullName:"Diana Ramírez",email:"diana.r@hotmail.com",phone:"+573201112233",source:"web",sourceDetail:"compra",vehicleOfInterestId:"chevrolet-tracker-2023",status:"contactado",rating:"cold",score:0,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:De(-1),contactId:"email_diana_r_hotmail_com",createdAt:De(5),lastActivityAt:De(2),_version:2},{id:"l4",fullName:"Jhon Jairo Mosquera",email:"",phone:"+573044455667",source:"whatsapp",sourceDetail:"consulta",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:De(-3),contactId:"phone_573044455667",createdAt:De(8),lastActivityAt:De(8),_version:1},{id:"l5",fullName:"Laura Valentina Ortiz",email:"lauraortiz@gmail.com",phone:"+573186677889",source:"bot",sourceDetail:"financiacion",vehicleOfInterestId:"kia-sportage-2022",status:"contactado",rating:"cold",score:0,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:oe(-1),contactId:"email_lauraortiz_gmail_com",createdAt:oe(1),lastActivityAt:De(20),_version:3},{id:"l6",fullName:"Pedro Nel Arango",email:"pnarango@empresa.co",phone:"+573017788990",source:"cuenta",sourceDetail:"registro",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:oe(-1),contactId:"email_pnarango_empresa_co",createdAt:oe(2),lastActivityAt:oe(2),_version:1},{id:"l7",fullName:"Sofía Mejía",email:"sofia.mejia@gmail.com",phone:"+573123344556",source:"newsletter",sourceDetail:"suscripcion",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:oe(-3),contactId:"email_sofia_mejia_gmail_com",createdAt:oe(4),lastActivityAt:oe(4),_version:1},{id:"l8",fullName:"Andrés Felipe Cuesta",email:"afcuesta@gmail.com",phone:"+573009988776",source:"web",sourceDetail:"consignacion_venta",vehicleOfInterestId:null,status:"calificado",rating:"cold",score:0,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:oe(-2),contactId:"email_afcuesta_gmail_com",createdAt:oe(6),lastActivityAt:oe(1),_version:4},{id:"l9",fullName:"Catalina Ríos",email:"cata.rios@gmail.com",phone:"+573145566778",source:"web",sourceDetail:"peritaje",vehicleOfInterestId:"nissan-frontier-2020",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:oe(-10),contactId:"email_cata_rios_gmail_com",createdAt:oe(12),lastActivityAt:oe(35),_version:1},{id:"l10",fullName:"Gloria Patiño",email:"glopa@gmail.com",phone:"+573162233445",source:"web",sourceDetail:"reclamo",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:De(-2),contactId:"email_glopa_gmail_com",createdAt:De(3),lastActivityAt:De(3),_version:1},{id:"l11",fullName:"Mauricio Bedoya",email:"mbedoya@gmail.com",phone:"+573024455661",source:"facebook",sourceDetail:"compra",vehicleOfInterestId:"mazda-cx5-2021",status:"convertido",rating:"hot",score:78,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:oe(9),contactId:"email_mbedoya_gmail_com",convertedTo:{dealId:"d6"},createdAt:oe(10),lastActivityAt:oe(3),_version:5},{id:"l12",fullName:"Yuliana Castaño",email:"yulycastano@gmail.com",phone:"+573135566779",source:"whatsapp",sourceDetail:"financiacion",vehicleOfInterestId:"toyota-hilux-2020",status:"convertido",rating:"hot",score:82,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:oe(14),contactId:"email_yulycastano_gmail_com",convertedTo:{dealId:"d7"},createdAt:oe(15),lastActivityAt:oe(5),_version:6},{id:"l13",fullName:"Hernán Darío Loaiza",email:"hdloaiza@gmail.com",phone:"+573017788123",source:"web",sourceDetail:"compra",vehicleOfInterestId:"renault-duster-2022",status:"perdido",rating:"warm",score:45,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:oe(19),contactId:"email_hdloaiza_gmail_com",createdAt:oe(20),lastActivityAt:oe(8),_version:3},{id:"l14",fullName:"Paola Andrea Suárez",email:"pasuarez@gmail.com",phone:"+573156677001",source:"newsletter",sourceDetail:"suscripcion",vehicleOfInterestId:null,status:"no_calificado",rating:"cold",score:12,ownerId:null,ownerName:null,slaDueAt:oe(24),contactId:"email_pasuarez_gmail_com",createdAt:oe(25),lastActivityAt:oe(25),_version:2},{id:"l15",fullName:"Julián Marín",email:"julianmarin@gmail.com",phone:"+573008811223",source:"referido",sourceDetail:"compra",vehicleOfInterestId:"nissan-frontier-2020",status:"convertido",rating:"hot",score:74,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:oe(21),contactId:"email_julianmarin_gmail_com",convertedTo:{dealId:"d8"},createdAt:oe(22),lastActivityAt:oe(9),_version:4}],ZC={l1:[{id:"a1",type:"solicitud_inbound",subject:"Nueva solicitud: financiacion",body:"Quiero financiar la Mazda CX-5. Cuota inicial 25.000.000, ingresos 6.000.000 mensuales.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l1",name:"María Fernanda Gómez"},createdAt:ur(18),_version:1}],l3:[{id:"a2",type:"solicitud_inbound",subject:"Nueva solicitud: compra",body:"Interesada en la Chevrolet Tracker.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:De(5),_version:1},{id:"a3",type:"whatsapp",subject:"WhatsApp enviado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:De(2),_version:1},{id:"a4",type:"status_change",subject:"Cambio de estado → contactado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:De(2),_version:1}],l5:[{id:"a5",type:"solicitud_inbound",subject:"Nueva lead: financiacion",body:"Bot ALTOR: pregunta por financiación de la Kia Sportage.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},createdAt:oe(1),_version:1},{id:"a6",type:"whatsapp",subject:"WhatsApp enviado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},createdAt:De(20),_version:1}]},qi={};Pd.forEach(n=>{const e=n.status==="convertido"?"customer":n.source==="newsletter"?"subscriber":"lead";qi[n.contactId]={id:n.contactId,fullName:n.fullName,email:n.email,phone:n.phone,type:e==="customer"?"cliente":"lead",source:n.source,score:0,rating:"cold",lifecycleStage:e,clienteUid:null,consent:{email:n.source!=="web",whatsapp:n.source!=="web",calls:!1,askedAt:n.createdAt,source:n.source,policyVersion:"v1"},doNotContact:n.source==="web",tags:[],createdAt:n.createdAt,lastActivityAt:n.lastActivityAt,_version:1}});qi.email_camila_lectora_gmail_com={id:"email_camila_lectora_gmail_com",fullName:"Camila Lectora",email:"camila.lectora@gmail.com",phone:"",type:"lead",source:"newsletter",score:0,rating:"cold",lifecycleStage:"subscriber",clienteUid:null,consent:{email:!0,whatsapp:!1,calls:!1,askedAt:oe(3),source:"newsletter",policyVersion:"v1"},doNotContact:!1,tags:["newsletter"],createdAt:oe(3),lastActivityAt:oe(3),_version:1};const ia={},Ba=()=>Pd.map(n=>({...n})),nu=()=>XC.map(n=>({...n})),eP=n=>(ZC[n]||[]).map(e=>({...e})),tP=n=>qi[n]?{...qi[n]}:null,nP=()=>Object.values(qi).map(n=>({...n})),Wp=n=>(ia[n]||[]).map(e=>({...e}));function rP(n,e){ia[n]||(ia[n]=[]),ia[n].unshift({id:"n"+Date.now(),...e})}let sP=100;const _i=[{id:"d1",name:"Diana Ramírez · Chevrolet Tracker 2023",contactName:"Diana Ramírez",contactId:"email_diana_r_hotmail_com",leadId:"l3",vehicleId:"chevrolet-tracker-2023",vehicleName:"Chevrolet Tracker 2023",pipelineId:"ventas",stageId:"cuadrando_cita",stageName:"Cuadrando cita",status:"open",amount:82e6,currency:"COP",probability:.2,weightedAmount:164e5,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"web",lastActivityAt:De(2),createdAt:De(5),_version:2},{id:"d2",name:"Laura Valentina Ortiz · Kia Sportage 2022",contactName:"Laura Valentina Ortiz",contactId:"email_lauraortiz_gmail_com",leadId:"l5",vehicleId:"kia-sportage-2022",vehicleName:"Kia Sportage 2022",pipelineId:"ventas",stageId:"cita_fijada",stageName:"Cita fijada",status:"open",amount:95e6,currency:"COP",probability:.35,weightedAmount:3325e4,ownerId:"u_luis",ownerName:"Luis Pérez",source:"bot",lastActivityAt:De(20),createdAt:oe(1),_version:3},{id:"d3",name:"Andrés Felipe Cuesta · Mazda 3 2021",contactName:"Andrés Felipe Cuesta",contactId:"email_afcuesta_gmail_com",leadId:"l8",vehicleId:"mazda-3-2021",vehicleName:"Mazda 3 2021",pipelineId:"ventas",stageId:"visita_test_drive",stageName:"Visita / Test drive",status:"open",amount:68e6,currency:"COP",probability:.5,weightedAmount:34e6,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"web",lastActivityAt:oe(18),createdAt:oe(20),_version:5},{id:"d4",name:"Roberto Gómez · Toyota Hilux 2020",contactName:"Roberto Gómez",contactId:"phone_573001239876",leadId:null,vehicleId:"toyota-hilux-2020",vehicleName:"Toyota Hilux 2020",pipelineId:"ventas",stageId:"negociacion",stageName:"Negociación",status:"open",amount:135e6,currency:"COP",probability:.7,weightedAmount:945e5,ownerId:"u_luis",ownerName:"Luis Pérez",source:"whatsapp",lastActivityAt:De(6),createdAt:oe(8),_version:7},{id:"d5",name:"Sandra Milena Vélez · Renault Duster 2022",contactName:"Sandra Milena Vélez",contactId:"email_smvelez_gmail_com",leadId:null,vehicleId:"renault-duster-2022",vehicleName:"Renault Duster 2022",pipelineId:"ventas",stageId:"cuadrando_cita",stageName:"Cuadrando cita",status:"open",amount:0,currency:"COP",probability:.2,weightedAmount:0,ownerId:null,ownerName:null,source:"cuenta",lastActivityAt:De(1),createdAt:De(1),_version:1},{id:"d9",name:"Patricia Lemus · Toyota Hilux 2020",contactName:"Patricia Lemus",contactId:"phone_573009871234",leadId:null,vehicleId:"toyota-hilux-2020",vehicleName:"Toyota Hilux 2020",pipelineId:"ventas",stageId:"cita_fijada",stageName:"Cita fijada",status:"open",amount:132e6,currency:"COP",probability:.35,weightedAmount:462e5,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"walkin",lastActivityAt:De(3),createdAt:oe(2),_version:2},{id:"d6",name:"Mauricio Bedoya · Mazda CX-5 2021",contactName:"Mauricio Bedoya",contactId:"email_mbedoya_gmail_com",leadId:"l11",vehicleId:"mazda-cx5-2021",vehicleName:"Mazda CX-5 2021",pipelineId:"ventas",stageId:"vendido",stageName:"Vendido",status:"won",amount:78e6,currency:"COP",probability:1,weightedAmount:78e6,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"facebook",lastActivityAt:oe(3),createdAt:oe(10),_version:6,tipoPago:"financiado",wonAt:oe(3),postventa:{entrega:!0,traspaso_runt:!1,tramites:!1},commissionSnapshot:{amount:78e6,tipoPago:"financiado",ownerId:"u_ana",wonAt:oe(3)},recibeVehiculo:{marca:"chevrolet",modelo:"Spark GT",placa:"XYZ789",valorEstimado:28e6}},{id:"d7",name:"Yuliana Castaño · Toyota Hilux 2020",contactName:"Yuliana Castaño",contactId:"email_yulycastano_gmail_com",leadId:"l12",vehicleId:"toyota-hilux-2020",vehicleName:"Toyota Hilux 2020",pipelineId:"ventas",stageId:"vendido",stageName:"Vendido",status:"won",amount:112e6,currency:"COP",probability:1,weightedAmount:112e6,ownerId:"u_luis",ownerName:"Luis Pérez",source:"whatsapp",lastActivityAt:oe(5),createdAt:oe(15),_version:7,tipoPago:"contado",wonAt:oe(5),postventa:{entrega:!0,traspaso_runt:!0,tramites:!0},commissionSnapshot:{amount:112e6,tipoPago:"contado",ownerId:"u_luis",wonAt:oe(5)}},{id:"d8",name:"Julián Marín · Nissan Frontier 2020",contactName:"Julián Marín",contactId:"email_julianmarin_gmail_com",leadId:"l15",vehicleId:"nissan-frontier-2020",vehicleName:"Nissan Frontier 2020",pipelineId:"ventas",stageId:"perdido",stageName:"Perdido",status:"lost",amount:64e6,currency:"COP",probability:0,weightedAmount:0,lostReason:"Compró en otro lado",ownerId:"u_luis",ownerName:"Luis Pérez",source:"referido",lastActivityAt:oe(9),createdAt:oe(22),_version:4}],ru=()=>_i.map(n=>({...n}));function iP(n){const e="d"+ ++sP;return _i.unshift({id:e,...n}),e}function oP(n,e){const t=_i.findIndex(r=>r.id===n);t>=0&&(_i[t]={..._i[t],...e})}const Jn=(n,e=10,t=0)=>{const r=new Date;return r.setDate(r.getDate()+n),r.setHours(e,t,0,0),r.toISOString()},su=[{id:"ag1",type:"cita",subject:"Test drive Toyota Corolla",dueAt:Jn(1,10),relatedTo:{type:"lead",id:"l2",name:"Carlos Andrés Salcedo"},status:"open"},{id:"ag2",type:"cita",subject:"Visita showroom",dueAt:Jn(1,12),relatedTo:{type:"lead",id:"l1",name:"María Fernanda Gómez"},status:"open"},{id:"ag3",type:"cita",subject:"Cierre financiación",dueAt:Jn(1,15),relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},status:"open"},{id:"ag4",type:"cita",subject:"Llamada de seguimiento",dueAt:Jn(1,17),relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},status:"open"},{id:"ag5",type:"cita",subject:"Entrega de vehículo",dueAt:Jn(3,9),relatedTo:{type:"lead",id:"l8",name:"Andrés Felipe Cuesta"},status:"open"},{id:"ag6",type:"cita",subject:"Peritaje",dueAt:Jn(5,11),relatedTo:{type:"lead",id:"l9",name:"Catalina Ríos"},status:"open"},{id:"ag7",type:"cita",subject:"Negociación precio",dueAt:Jn(-2,16),relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},status:"open"}],aP=()=>su.map(n=>({...n}));function cP(n){su.push({id:"ag"+(su.length+1),...n})}let lP=100;function cy(n){const e="lm"+ ++lP,t=new Date().toISOString(),r=(n.telefono||"").replace(/\D/g,""),s=(n.prefijoPais||"+57").replace(/\D/g,""),i=r?"+"+(r.startsWith(s)?r:s+r):"",o=(n.email||"").trim().toLowerCase(),c={id:e,fullName:n.nombre||"Sin nombre",email:o,phone:i,source:n.canal||"manual",sourceDetail:n.interes||"consulta",vehicleOfInterestId:n.vehiculoId||null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:null,contactId:o?"email_"+o.replace(/[^a-z0-9]/gi,"_"):"phone_"+r,tags:["manual",n.trafico,n.campana].filter(Boolean),createdAt:t,lastActivityAt:t,_version:1};return Pd.unshift(c),e}function uP(){const n={},e=(p,g,b)=>l("label",{class:"field"},[l("span",{class:"field__label",text:p}),g,null]);n.nombre=l("input",{class:"input",type:"text",placeholder:"Nombre del cliente",autocomplete:"off"}),n.prefijo=l("input",{class:"input",type:"text",value:"+57",style:{width:"72px"}}),n.telefono=l("input",{class:"input",type:"tel",placeholder:"300 123 4567",autocomplete:"off"}),n.email=l("input",{class:"input",type:"email",placeholder:"correo@ejemplo.com (opcional)",autocomplete:"off"}),n.canal=l("select",{class:"select"},AC.map(p=>l("option",{value:p.id},[`${p.icon} ${p.label}`]))),n.interes=l("select",{class:"select"},RC.map(p=>l("option",{value:p.id},[p.label]))),n.trafico=l("select",{class:"select"},[l("option",{value:""},["— Tráfico —"]),l("option",{value:"organico"},["Orgánico"]),l("option",{value:"pauta"},["Pauta (pago)"])]),n.campana=l("input",{class:"input",type:"text",placeholder:"Campaña (opcional)",autocomplete:"off"}),n.vehiculo=l("input",{class:"input",type:"text",placeholder:"Vehículo de interés (opcional)",autocomplete:"off"}),n.notas=l("textarea",{class:"textarea",placeholder:"Notas / contexto del lead",rows:"2"}),n.consent=l("input",{type:"checkbox",checked:!0});const t=l("div",{class:"login__error",role:"alert",hidden:!0}),r=l("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),s=l("button",{class:"btn btn--gold",type:"submit"},["Agregar lead"]),i=l("form",{class:"nl-form"},[e("Nombre *",n.nombre),l("div",{class:"nl-row"},[l("label",{class:"field",style:{flex:"0 0 auto"}},[l("span",{class:"field__label",text:"Prefijo"}),n.prefijo]),l("label",{class:"field u-grow"},[l("span",{class:"field__label",text:"Teléfono"}),n.telefono])]),e("Correo",n.email),l("div",{class:"nl-row"},[e("Canal *",n.canal),e("Interés",n.interes)]),l("div",{class:"nl-row"},[e("Tráfico",n.trafico),e("Campaña",n.campana)]),e("Vehículo de interés",n.vehiculo),e("Notas",n.notas),l("label",{class:"nl-consent"},[n.consent,l("span",{class:"u-caption",text:"El cliente autorizó el tratamiento de sus datos (Ley 1581 · Habeas Data)."})]),t,l("div",{class:"nl-actions"},[r,s])]),o=l("div",{class:"modal"},[l("div",{class:"modal__head"},[l("h2",{class:"modal__title",text:"＋ Nuevo lead"}),l("span",{class:"u-caption u-faint",text:"Captura manual (Meta, WhatsApp, TikTok, llamada, referido…)"})]),i]),c=l("div",{class:"modal-overlay"},[o]);document.body.appendChild(c),setTimeout(()=>n.nombre.focus(),30);const u=()=>{c.remove(),window.removeEventListener("keydown",d)},d=p=>{p.key==="Escape"&&u()};window.addEventListener("keydown",d),c.addEventListener("mousedown",p=>{p.target===c&&u()}),r.addEventListener("click",u),i.addEventListener("submit",async p=>{p.preventDefault(),t.hidden=!0;const g={nombre:n.nombre.value.trim(),email:n.email.value.trim(),telefono:n.telefono.value.trim(),prefijoPais:n.prefijo.value.trim()||"+57",canal:n.canal.value,interes:n.interes.value,vehiculoId:n.vehiculo.value.trim()||null,trafico:n.trafico.value||null,campana:n.campana.value.trim()||null,consentGiven:n.consent.checked,notas:n.notas.value.trim()};if(!g.nombre)return f("Escribe el nombre del cliente.");if(!g.email&&!g.telefono)return f("Necesitas al menos un correo o un teléfono (para no duplicar el contacto).");s.disabled=!0,s.textContent="Guardando…";try{H.get().mock?(cy(g),window.dispatchEvent(new CustomEvent("altorra:leads-dirty"))):await JC(g),G("✓ Lead agregado a la Bandeja","ok"),u()}catch{s.disabled=!1,s.textContent="Agregar lead",f("No se pudo agregar. Intenta de nuevo.")}});function f(p){return t.textContent=p,t.hidden=!1,!1}}const iu="altorra_friction_v1",dP=300;function $a(n,e,t={}){try{const r=Math.max(0,Math.round(performance.now()-e)),s=JSON.parse(localStorage.getItem(iu)||"[]");for(s.push({task:n,ms:r,at:new Date().toISOString(),...t});s.length>dP;)s.shift();localStorage.setItem(iu,JSON.stringify(s))}catch{}}function hP(){try{const n=JSON.parse(localStorage.getItem(iu)||"[]"),e={};for(const r of n)(e[r.task]=e[r.task]||[]).push(r.ms);const t={};for(const[r,s]of Object.entries(e)){const i=[...s].sort((o,c)=>o-c);t[r]={n:s.length,mediana_s:+(i[Math.floor(i.length/2)]/1e3).toFixed(1),p90_s:+(i[Math.floor(i.length*.9)]/1e3).toFixed(1)}}return t}catch{return{}}}typeof window<"u"&&(window.__friccion=hP);const fP=[{id:"whatsapp",label:"WhatsApp",icon:"💬"},{id:"walkin",label:"Walk-in",icon:"🚶"},{id:"llamada",label:"Llamada",icon:"📞"},{id:"referido",label:"Referido",icon:"🤝"}],pP="“¿Me autorizas guardar tu nombre y teléfono para contactarte sobre vehículos? (Ley 1581)”";function mP(){const n=performance.now(),e={fuente:"whatsapp",medio:"organico"},t=H.get().user||{},r=l("input",{class:"input",type:"text",placeholder:"Nombre",autocomplete:"off"}),s=l("input",{class:"input",type:"tel",placeholder:"300 123 4567",autocomplete:"off",inputmode:"tel"}),i=l("input",{class:"input",type:"text",placeholder:'Nota corta (opcional): "busca SUV blanca"',autocomplete:"off"}),o=l("input",{type:"checkbox"}),c=l("div",{class:"u-row",style:{flexWrap:"wrap",gap:"6px"}});function u(){c.replaceChildren(...fP.map(x=>{const M=l("button",{class:"chip"+(e.fuente===x.id?" chip--active":""),type:"button"},[`${x.icon} ${x.label}`]);return M.addEventListener("click",()=>{e.fuente=x.id,u()}),M}))}u();const d=l("button",{class:"chip",type:"button"},["Orgánico"]);d.addEventListener("click",()=>{e.medio=e.medio==="organico"?"pauta":"organico",d.textContent=e.medio==="organico"?"Orgánico":"Pauta (pago)"});const f=l("div",{class:"login__error",role:"alert",hidden:!0}),p=l("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),g=l("button",{class:"btn btn--gold",type:"submit"},["⚡ Registrar"]),b=l("form",{class:"nl-form"},[l("label",{class:"field"},[l("span",{class:"field__label",text:"Nombre *"}),r]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Teléfono / WhatsApp *"}),s]),l("div",{class:"u-row",style:{gap:"8px",alignItems:"center"}},[c,d]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Nota"}),i]),l("label",{class:"nl-consent"},[o,l("span",{class:"u-caption"},["Leí el guion y el cliente AUTORIZÓ de palabra: ",l("em",{text:pP})])]),f,l("div",{class:"nl-actions"},[p,g])]),E=l("div",{class:"modal"},[l("div",{class:"modal__head"},[l("h2",{class:"modal__title",text:"⚡ Lead rápido"}),l("span",{class:"u-caption u-faint",text:navigator.onLine?"El WhatsApp entrante o el cliente del patio, registrado en 30 segundos.":"📴 Sin señal: se guardará y sincronizará solo al volver la conexión."})]),b]),S=l("div",{class:"modal-overlay"},[E]);document.body.appendChild(S),setTimeout(()=>r.focus(),30);const A=()=>{S.remove(),window.removeEventListener("keydown",O)},O=x=>{x.key==="Escape"&&A()};window.addEventListener("keydown",O),S.addEventListener("mousedown",x=>{x.target===S&&A()}),p.addEventListener("click",A),b.addEventListener("submit",x=>{x.preventDefault(),f.hidden=!0;const M={nombre:r.value.trim(),telefono:s.value.trim(),fuente:e.fuente,medio:e.medio,nota:i.value.trim(),consentVerbal:o.checked,ownerId:t.uid||null,ownerName:t.nombre||t.email||null,createdAt:new Date().toISOString()};if(!M.nombre)return k("Escribe el nombre.");if(!M.telefono||M.telefono.replace(/\D/g,"").length<7)return k("Escribe un teléfono válido.");if(!M.ownerId&&!H.get().mock)return k("Sesión sin usuario — recarga el portal.");if(H.get().mock){cy({nombre:M.nombre,telefono:M.telefono,canal:M.fuente,trafico:M.medio,consentGiven:M.consentVerbal,notas:M.nota}),window.dispatchEvent(new CustomEvent("altorra:leads-dirty")),G("⚡ Lead registrado (mock)","ok"),A();return}Ft(Ae(se,"lead_intake"),M).catch(P=>{console.error("[quick-lead] rechazo del servidor:",P),G('El lead "'+M.nombre+'" fue RECHAZADO al sincronizar: '+(P.code||P.message),"error")}),G(navigator.onLine?"⚡ Lead registrado — aparecerá en la Bandeja en segundos":"📴 Guardado local — se enviará al volver la señal","ok"),$a("lead_rapido",n,{fuente:e.fuente,online:navigator.onLine}),A()});function k(x){return f.textContent=x,f.hidden=!1,!1}}const gP="ventas",oo=[{id:"cuadrando_cita",label:"Cuadrando cita",prob:.2},{id:"cita_fijada",label:"Cita fijada",prob:.35},{id:"visita_test_drive",label:"Visita / Test drive",prob:.5},{id:"negociacion",label:"Negociación",prob:.7},{id:"apartado",label:"Apartado",prob:.9},{id:"vendido",label:"Vendido",prob:1,won:!0}],oa={id:"perdido",label:"Perdido",prob:0,lost:!0},Uo={_exit_visita_test_drive:["huboTestDrive"],apartado:["montoApartado","venceEl"],vendido:["tipoPago"],perdido:["lostReason"]},ni=oo.map(n=>n.id);function Qp(n,e){if(n===e)return{ok:!0,needsReason:!1,gates:[]};const t=i=>i===oa.id||ni.includes(i);if(!t(n)||!t(e))return{ok:!1,error:"etapa_desconocida"};if(n==="vendido")return{ok:!1,error:"vendido_es_terminal"};if(e===oa.id)return{ok:!0,needsReason:!1,gates:Uo.perdido.slice()};if(n===oa.id)return{ok:!0,needsReason:!0,gates:[]};const r=ni.indexOf(n),s=ni.indexOf(e);if(s>r){const i=[];for(let o=r;o<s;o++){ni[o]==="visita_test_drive"&&i.push(...Uo._exit_visita_test_drive);const c=ni[o+1];Uo[c]&&i.push(...Uo[c])}return{ok:!0,needsReason:!1,gates:[...new Set(i)]}}return{ok:!0,needsReason:!0,gates:[],recalcVehicle:n==="apartado"}}const Yp=[{id:"precio",label:"Precio"},{id:"financiacion_negada",label:"Financiación negada"},{id:"compro_en_otro_lado",label:"Compró en otro lado"},{id:"no_responde",label:"No responde"},{id:"cambio_de_opinion",label:"Cambió de opinión"},{id:"error_de_registro",label:"Error de registro"},{id:"otro",label:"Otro motivo"}],vi=oo.filter(n=>!n.won),ly=[...oo,oa].reduce((n,e)=>(n[e.id]=e,n),{});function Zr(n){return ly[n]||oo[0]}function yi(n){const e=ly[n];return e?e.prob:0}function xd(n){return Math.round((Number(n.amount)||0)*yi(n.stageId))}function uy(n){return n.reduce((e,t)=>e+(t.status==="open"?xd(t):0),0)}function _P(n){return n.reduce((e,t)=>e+(t.status==="open"&&Number(t.amount)||0),0)}function vP(n,e=14){return n.status==="open"&&Ss(n.lastActivityAt)>e}function yP(n){const e={};for(const t of vi)e[t.id]=[];for(const t of n)t.status==="open"&&(e[t.stageId]||(e[t.stageId]=[])).push(t);return e}const dy=[{id:"entrega",label:"Entrega del vehículo",dueDays:3},{id:"traspaso_runt",label:"Traspaso / RUNT",dueDays:15},{id:"tramites",label:"Trámites (SOAT, impuestos, GPS)",dueDays:15}];function bP(n){const e={};for(const r of n||[])!r||r.status!=="open"||!r.vehicleId||(e[r.vehicleId]=e[r.vehicleId]||[]).push(r.id||null);const t=[];for(const r of Object.keys(e))e[r].length>1&&t.push({vehicleId:r,dealIds:e[r]});return t}function hy(n){if(!n||n.status!=="won")return!1;const e=n.postventa||{};return dy.every(t=>e[t.id]===!0)}function fy(n,e={}){const t=e.vehicleId!==void 0?e.vehicleId||"":n.vehicleOfInterestId||"",r=oo[0];return{name:(n.fullName||"Oportunidad")+(t?" · "+(e.vehicleName||t):""),contactId:n.contactId||null,contactName:n.fullName||"",leadId:n.id||null,vehicleId:t||null,vehicleName:e.vehicleName||t||"",sinVehiculoAun:!t,pipelineId:gP,stageId:r.id,stageName:r.label,status:"open",amount:Number(e.amount)||0,currency:"COP",probability:r.prob,weightedAmount:Math.round((Number(e.amount)||0)*r.prob),expectedCloseDate:null,ownerId:e.ownerId!==void 0?e.ownerId:n.ownerId||null,ownerName:e.ownerName!==void 0?e.ownerName:n.ownerName||null,source:n.source||"web",nextStep:e.nota||""}}const jn=()=>new Date().toISOString(),py=n=>({id:n.id,...n.data()}),Vt=()=>H.get().user?H.get().user.uid:null;function wP(n,e,t){return Ft(Ae(se,"activities"),{type:"deal",subject:t,body:"",status:"closed",direction:"outbound",relatedTo:{type:"deal",id:n,name:e||""},ownerId:Vt(),createdAt:jn(),_version:1})}function IP({pageSize:n=100,onData:e,onError:t}){const r=ot(Ae(se,"deals"),Un("status","==","open"),vt("lastActivityAt","desc"),kt(n));return Yt(r,s=>e(s.docs.map(py)),s=>t&&t(s))}async function EP(n,e={}){const t=jn(),r=fy(n,e),s=await Ft(Ae(se,"deals"),{...r,lastActivityAt:t,createdAt:t,updatedAt:t,createdBy:Vt(),updatedBy:Vt(),_version:1});return await at(Re(se,"leads",n.id),{status:"convertido",convertedTo:{dealId:s.id,prevStatus:n.status||"contactado"},lastActivityAt:t,updatedAt:t,updatedBy:Vt(),_version:Jt(1)}),await wP(s.id,r.contactName,"Oportunidad creada desde lead"),s.id}async function TP(n){return(await Lr(Mr,"anularConversion")({dealId:n})).data}async function my(){return(await un(ot(Ae(se,"vehiculos"),Un("estado","in",["disponible","apartado"]),kt(60)))).docs.map(e=>{const t=e.data(),r=t.estado==="apartado";return{id:e.id,label:[t.marca,t.modelo,t.year].filter(Boolean).join(" ")+(r?" · ⚠ apartado":""),precio:Number(t.precioOferta||t.precio)||0,apartado:r}}).sort((e,t)=>e.label.localeCompare(t.label,"es"))}async function Jp(n,e,t={},r={}){const s=jn(),i=Zr(e),o={...r,stageId:e,stageName:i.label,probability:i.prob,weightedAmount:Math.round((Number(t.amount)||0)*i.prob),lastActivityAt:s,updatedAt:s,updatedBy:Vt(),_version:Jt(1)};t.status==="lost"&&e!=="perdido"&&(o.status="open"),await at(Re(se,"deals",n),o)}async function AP(n,e,t={}){const r=jn(),s=Math.max(0,Math.round(Number(e)||0));await at(Re(se,"deals",n),{amount:s,weightedAmount:Math.round(s*yi(t.stageId)),updatedAt:r,updatedBy:Vt(),_version:Jt(1)})}async function RP(n,e={},t={}){const r=jn();await at(Re(se,"deals",n),{...t,status:"won",stageId:"vendido",stageName:"Vendido",probability:1,weightedAmount:Number(e.amount)||0,lastActivityAt:r,updatedAt:r,updatedBy:Vt(),_version:Jt(1)})}async function SP(n,e,t={}){const r=jn();await at(Re(se,"deals",n),{status:"lost",stageId:"perdido",stageName:"Perdido",probability:0,weightedAmount:0,lostReason:String(e||"otro"),lastActivityAt:r,updatedAt:r,updatedBy:Vt(),_version:Jt(1)})}function kP({pageSize:n=100,onData:e,onError:t}){const r=ot(Ae(se,"deals"),Un("status","==","won"),vt("lastActivityAt","desc"),kt(n));return Yt(r,s=>e(s.docs.map(py)),s=>t&&t(s))}async function CP(n,e,t){const r=jn();await at(Re(se,"deals",n),{["postventa."+e]:t===!0,lastActivityAt:r,updatedAt:r,updatedBy:Vt(),_version:Jt(1)});try{await at(Re(se,"activities","postventa_"+n+"_"+e),t?{status:"closed",closedAt:r,closedBy:Vt()}:{status:"open",closedAt:null,closedBy:null})}catch{}}async function PP(n,e){const t=jn();await at(Re(se,"deals",n),{recibeVehiculo:{marca:String(e.marca||"").trim(),modelo:String(e.modelo||"").trim(),year:Number(e.year)||null,placa:String(e.placa||"").trim().toUpperCase(),valorEstimado:Number(e.valorEstimado)||0},lastActivityAt:t,updatedAt:t,updatedBy:Vt(),_version:Jt(1)})}async function xP(n){return(await Lr(Mr,"crmCrearBorradorRetoma")({dealId:n})).data}const hl="__sin_vehiculo__";function gy(n,{onDone:e}={}){const t=performance.now(),r=H.get().team||[],s=l("select",{class:"select"},[l("option",{value:""},["Cargando inventario…"])]),i=l("input",{class:"input",type:"number",min:"0",step:"100000",placeholder:"Valor estimado (COP) *"}),o=l("select",{class:"select"},r.length?r.map(k=>l("option",{value:k.uid,selected:k.uid===n.ownerId?"":void 0},[k.nombre])):[l("option",{value:n.ownerId||""},[n.ownerName||"Yo"])]),c=l("input",{class:"input",type:"text",placeholder:"Nota de contexto (opcional)"}),u=l("div",{class:"login__error",role:"alert",hidden:!0}),d=l("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),f=l("button",{class:"btn btn--gold",type:"submit"},["🎯 Crear negocio"]),p=l("form",{class:"nl-form"},[l("p",{class:"u-caption u-muted",style:{margin:"0"}},["✓ Hablaste con él · ✓ tiene presupuesto o forma de pago en mente · ✓ busca un carro concreto o una categoría"]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Vehículo *"}),s]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Valor estimado (COP) *"}),i]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Asesor responsable *"}),o]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Nota"}),c]),u,l("div",{class:"nl-actions"},[d,f])]),g=l("div",{class:"modal"},[l("div",{class:"modal__head"},[l("h2",{class:"modal__title",text:"Calificar → crear negocio"}),l("span",{class:"u-caption u-faint",text:(n.fullName||"Cliente")+" pasa al Pipeline; el lead queda congelado como histórico."})]),p]),b=l("div",{class:"modal-overlay"},[g]);document.body.appendChild(b);const E=()=>{b.remove(),window.removeEventListener("keydown",S)},S=k=>{k.key==="Escape"&&E()};window.addEventListener("keydown",S),b.addEventListener("mousedown",k=>{k.target===b&&E()}),d.addEventListener("click",E);let A=[];(H.get().mock?Promise.resolve([]):my()).then(k=>{A=k,s.replaceChildren(l("option",{value:""},["— Elige un vehículo —"]),...k.map(x=>l("option",{value:x.id},[x.label+(x.precio?" · $"+x.precio.toLocaleString("es-CO"):"")])),l("option",{value:hl},["Sin vehículo aún (buscando / retoma)"]))}).catch(()=>{s.replaceChildren(l("option",{value:hl},["Sin vehículo aún"]))}),s.addEventListener("change",()=>{const k=A.find(x=>x.id===s.value);k&&k.precio&&!i.value&&(i.value=String(k.precio))}),p.addEventListener("submit",async k=>{k.preventDefault(),u.hidden=!0;const x=s.value,M=Math.round(Number(i.value)||0);if(!x)return O('Elige un vehículo o marca "Sin vehículo aún".');if(!(M>0))return O("El valor estimado es obligatorio (alimenta el pronóstico).");const P=o.value||n.ownerId;if(!P)return O("El negocio necesita un asesor responsable.");const F=r.find(w=>w.uid===P)?.nombre||n.ownerName||null,T=A.find(w=>w.id===x),v={vehicleId:x===hl?null:x,vehicleName:T?T.label:"",amount:M,ownerId:P,ownerName:F,nota:c.value.trim()};f.disabled=!0,f.textContent="Creando…";try{if(H.get().mock){iP(fy(n,v)),G("🎯 Negocio creado (mock)","ok"),$a("conversion",t,{mock:!0}),E(),e&&e({mock:!0});return}const w=await EP(n,v);$a("conversion",t,{}),E(),NP(w,n),e&&e({dealId:w})}catch(w){f.disabled=!1,f.textContent="🎯 Crear negocio",O(w&&w.code==="permission-denied"?"Recarga el portal: tu versión está desactualizada.":"No se pudo crear el negocio. Intenta de nuevo.")}});function O(k){return u.textContent=k,u.hidden=!1,!1}}function NP(n,e){const t=l("button",{class:"btn btn--soft btn--sm",type:"button"},["Deshacer"]),r=l("div",{role:"status",style:{position:"fixed",bottom:"18px",left:"50%",transform:"translateX(-50%)",display:"flex",gap:"12px",alignItems:"center",zIndex:"99",padding:"10px 14px",borderRadius:"10px",background:"var(--bg-elev, #1c1a17)",border:"1px solid var(--line, #444)",boxShadow:"0 6px 24px rgba(0,0,0,.4)"}},[l("span",{text:`🎯 Negocio creado para ${(e.fullName||"el cliente").split(/\s+/)[0]}`}),t]);document.body.appendChild(r);const s=setTimeout(()=>r.remove(),1e4);t.addEventListener("click",async()=>{clearTimeout(s),t.disabled=!0,t.textContent="Anulando…";try{await TP(n),G("↩ Conversión anulada — el lead volvió a la Bandeja","ok")}catch(i){G("No se pudo anular: "+(i&&i.message||""),"error")}r.remove()})}const bn={wa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.477-.91zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>',person:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',flag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',expand:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',convert:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 12h6M13 9l3 3-3 3"/></svg>',call:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',more:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>'};function DP(){const n=(t,r)=>{const s=new Date;return s.setDate(s.getDate()+t),s.setHours(r,0,0,0),s.toISOString()},e=new Date(Date.now()+72e5).toISOString();return[{value:{subject:"Llamar al cliente",dueAt:n(1,9)},label:"Llamar mañana 9 am",icon:"📞"},{value:{subject:"Escribir por WhatsApp",dueAt:e},label:"WhatsApp en 2 horas",icon:"💬"},{value:{subject:"Hacer seguimiento",dueAt:n(3,9)},label:"Seguimiento en 3 días",icon:"🔁"},{value:"abrir360",label:"Agendar cita (abrir 360)",icon:"📅"},{value:null,label:"Sin próximo paso",icon:"⊘"}]}function _y(n){const e={queue:"todo",filters:{type:"",channel:"",status:""},search:"",showClosed:!1,leads:[],loading:!0,error:null,hasMore:!1,cursor:null,sub:null},t=Ye("crm.edit"),r=H.get().user&&H.get().user.uid,s=l("div",{class:"inbox__queues",role:"tablist","aria-label":"Colas"}),i=l("label",{class:"search","aria-label":"Buscar"},[l("span",{html:bn.search,"aria-hidden":"true"}),l("input",{type:"search",placeholder:"Buscar nombre, correo, teléfono…",autocomplete:"off"})]),o=l("div",{class:"inbox__filters"}),c=t?l("button",{class:"btn btn--gold btn--sm",type:"button",style:{marginLeft:"auto"}},["⚡ Lead rápido"]):null;c&&c.addEventListener("click",()=>mP());const u=t?l("button",{class:"btn btn--soft btn--sm",type:"button"},["＋ Completo"]):null;u&&u.addEventListener("click",()=>uP());const d=l("button",{class:"btn btn--soft btn--sm",type:"button"},["📋 Pendientes hoy"]);d.addEventListener("click",()=>F());const f=l("div",{class:"inbox__pendientes",hidden:!0}),p=l("div",{class:"inbox__toolbar"},[i,o,c,u,d]),g=l("div",{class:"inbox__list",role:"list",tabindex:"-1"}),b=l("p",{class:"u-muted u-caption",style:{margin:"0"}},["Aquí llegan los interesados: contacta y califica. Las ventas activas viven en el Pipeline."]),E=l("section",{class:"inbox"},[b,s,p,f,g]);me(n),n.append(E);const S=i.querySelector("input");S.addEventListener("input",()=>{e.search=S.value,le()});async function A(L,$){if(R(L.id,{ownerId:$?$.uid:null,ownerName:$?$.nombre:null}),H.get().mock){G($?`Asignado a ${$.nombre}`:"Sin asignar","ok");return}try{await zC(L.id,$),G($?`Asignado a ${$.nombre}`:"Sin asignar","ok")}catch{G("No se pudo asignar","error")}}async function O(L,$,Y={}){if(R(L.id,{status:$,...Y,lastActivityAt:new Date().toISOString()}),H.get().mock){G(`Estado → ${sa($).label}`,"ok");return}try{await GC(L.id,$,L,Y),G(`Estado → ${sa($).label}`,"ok")}catch{G("No se pudo cambiar el estado","error")}}function k(L,$){const Y=ey(L.phone,VP(L));if(!Y){G("Este lead no tiene teléfono","error");return}window.open(Y,"_blank","noopener"),!H.get().mock&&t&&Kp(L.id,{type:"whatsapp",subject:"WhatsApp enviado",direction:"outbound",name:L.fullName}).catch(()=>{}),M(L,$)}function x(L,$){!H.get().mock&&t&&Kp(L.id,{type:"llamada",subject:"Llamada registrada",direction:"outbound",name:L.fullName}).catch(()=>{}),G("📞 Llamada registrada","ok"),M(L,$)}function M(L,$){if(!t)return;const Y=performance.now();Bt($||document.body,DP(),ce=>{if($a("proximo_paso",Y,{preset:ce.label}),!!ce.value){if(ce.value==="abrir360"){N(L.id);return}if(H.get().mock){G("Próximo paso anotado (mock)","ok");return}HC(L.id,{subject:ce.value.subject,dueAt:ce.value.dueAt,name:L.fullName}).then(()=>G("✓ Próximo paso: "+ce.label,"ok")).catch(()=>G("No se pudo guardar el próximo paso","error"))}},{title:"¿Próximo paso con "+(L.fullName||"el cliente").split(/\s+/)[0]+"?"})}let P=!1;async function F(){P=!P,f.hidden=!P,P&&await T()}async function T(){if(me(f),H.get().mock){f.append(l("div",{class:"u-muted u-caption",style:{padding:"10px"},text:"Pendientes no disponible en modo demo."}));return}f.append(l("div",{class:"u-muted u-caption",style:{padding:"10px"},text:"Cargando pendientes…"}));let L=[];try{L=await KC()}catch{me(f),f.append(l("div",{class:"u-muted u-caption",style:{padding:"10px"},text:"No se pudieron cargar los pendientes."}));return}if(me(f),f.append(l("div",{class:"inbox__listhead"},[l("span",{class:"u-muted u-caption",text:`📋 ${L.length} pendiente${L.length===1?"":"s"} (hoy y vencidos)`})])),!L.length){f.append(l("div",{class:"u-muted u-caption",style:{padding:"0 10px 10px"},text:"¡Al día! Registra llamadas/WhatsApps y elige “próximo paso” para que aparezcan aquí."}));return}const $=Date.now();L.forEach(Y=>{const ce=new Date(Y.dueAt).getTime()<$,re=l("button",{class:"btn btn--soft btn--sm",type:"button",title:"Marcar hecho"},["✓ Hecho"]),ne=l("button",{class:"btn btn--ghost btn--sm",type:"button"},["Abrir 360"]),Se=l("div",{class:"lead-card",style:{alignItems:"center"}},[l("span",{class:`badge badge--${ce?"danger":"gold"}`,text:ce?"VENCIDO":"HOY"}),l("div",{class:"u-grow"},[l("div",{class:"lead-card__name",text:(Y.type==="cita"?"📅 ":"")+Y.subject}),l("div",{class:"u-caption u-muted",text:`${Y.relatedTo&&Y.relatedTo.name?Y.relatedTo.name+" · ":""}${gr(Y.dueAt)}`})]),l("div",{class:"u-row u-row--tight"},[ne,t?re:null])]);ne.addEventListener("click",()=>{Y.relatedTo&&Y.relatedTo.id&&N(Y.relatedTo.id)}),re.addEventListener("click",async()=>{re.disabled=!0;try{await WC(Y.id),G("✓ Hecho","ok"),await T(),Y.relatedTo&&Y.relatedTo.id&&M({id:Y.relatedTo.id,fullName:Y.relatedTo.name||""},d)}catch{re.disabled=!1,G("No se pudo completar","error")}}),f.append(Se)})}function v(L){if(L.status==="convertido"){G("Ya es un negocio: gestiónalo en el Pipeline","info");return}gy(L,{onDone:()=>R(L.id,{status:"convertido"})})}function w(){H.set({leads:e.leads})}function R(L,$){const Y=e.leads.findIndex(ce=>ce.id===L);Y!==-1&&(e.leads[Y]=oy({...e.leads[Y],...$}),w(),y())}function y(){C(),I(),le()}function C(){const L=OC(e.leads,r);me(s),tu.forEach($=>{const Y=e.queue===$.id,ce=l("button",{class:"chip"+(Y?" chip--active":""),role:"tab","aria-selected":String(Y),type:"button"},[l("span",{"aria-hidden":"true",text:$.icon}),l("span",{text:$.label}),l("span",{class:"chip__count",text:String(L[$.id]||0)})]);ce.addEventListener("click",()=>{e.queue=$.id,y()}),s.append(ce)})}function I(){if(me(o),[{key:"type",label:"Tipo",items:[["","Todos"],["lead","Lead"],["cita","Cita"],["solicitud","Solicitud"],["pqr","PQR"]]},{key:"channel",label:"Canal",items:[["","Todos"],["web","Web"],["whatsapp","WhatsApp"],["bot","ALTOR Bot"],["cuenta","Cuenta"],["newsletter","Newsletter"],["cita","Cita web"]]},{key:"status",label:"Estado",items:[["","Todos"],...Zl.map($=>[$.id,$.label])]}].forEach($=>{const Y=e.filters[$.key],ce=Y?($.items.find(ne=>ne[0]===Y)||[,$.label])[1]:$.label,re=l("button",{class:"chip"+(Y?" chip--active":""),type:"button","aria-haspopup":"menu"},[l("span",{text:ce}),l("span",{"aria-hidden":"true",text:"▾"})]);re.addEventListener("click",()=>{Bt(re,$.items.map(([ne,Se])=>({value:ne,label:Se,active:ne===Y})),ne=>{e.filters[$.key]=ne.value,y()},{title:$.label})}),o.append(re)}),e.filters.type||e.filters.channel||e.filters.status){const $=l("button",{class:"chip",type:"button"},["✕ Limpiar"]);$.addEventListener("click",()=>{e.filters={type:"",channel:"",status:""},y()}),o.append($)}}function le(){if(e.loading)return Z();if(e.error)return q("⚠️","No se pudo cargar",e.error);const{rows:L,hiddenClosed:$}=BC(e.leads,{queue:e.queue,uid:r,filters:e.filters,search:e.search,showClosed:e.showClosed});if(me(g),!L.length&&!$){const re=e.search||e.filters.type||e.filters.channel||e.filters.status;g.append(z("🗂️",re?"Sin resultados":"¡Bandeja al día!",re?"Ajusta la búsqueda o los filtros.":"No hay clientes en esta cola."));return}const Y=$||e.showClosed?l("button",{class:"chip",type:"button",style:{marginLeft:"auto"}},[e.showClosed?"✕ Ocultar cerrados":`${$} ocultos · ver todos`]):null;Y&&Y.addEventListener("click",()=>{e.showClosed=!e.showClosed,le()});const ce=l("div",{class:"inbox__listhead"},[l("span",{class:"u-muted u-caption",text:`${L.length} ${L.length===1?"cliente":"clientes"} activos`}),l("span",{class:"u-faint u-caption",text:"Ordenado por urgencia"}),Y]);if(g.append(ce),!L.length&&$){g.append(z("🗂️","¡Bandeja al día!",`No hay clientes activos en esta cola (${$} cerrados ocultos).`));return}if(L.forEach(re=>g.append(fe(re))),e.hasMore&&e.queue==="todo"&&!e.search){const re=l("button",{class:"btn btn--soft btn--block",type:"button"},["Cargar más"]);re.addEventListener("click",()=>j(re)),g.append(l("div",{class:"inbox__more"},[re]))}}function fe(L){const $=cs[L._rating],Y=sa(L.status),ce=!!(L.convertedTo&&L.convertedTo.dealId)||L.status==="convertido",re=UC(L),ne=re&&re.state!=="ok"?l("span",{class:`badge badge--${re.state==="late"?"danger":"gold"}`,title:"Tiempo sin primer contacto"},[`⏱ ${re.mins<120?re.mins+" min":ul(re.mins*6e4)} sin contacto`]):null,Se=L._sla,Ne=`sla-dot sla-dot--${Se.state}`,$e=Se.closed?"Cerrado":Se.state==="late"?`SLA vencido hace ${ul(Se.remainingMs)}`:`Responder en ${ul(Se.remainingMs)}`,ct=[L._type.icon+" "+L._type.label,L.sourceDetail,L.vehicleOfInterestId?"🚗 "+L.vehicleOfInterestId:""].filter(Boolean).join(" · "),zn=l("article",{class:"lead-card",role:"listitem",tabindex:"0","data-id":L.id,"aria-label":`${L.fullName}, ${$.label}`},[l("span",{class:Ne,title:$e,"aria-label":$e}),l("span",{class:"avatar avatar--sm","aria-hidden":"true",text:Rs(L.fullName)}),l("div",{class:"lead-card__main u-grow"},[l("div",{class:"lead-card__top"},[l("span",{class:"lead-card__name u-truncate",text:L.fullName}),l("span",{class:`temp ${$.cls}`,title:`Score ${L._score}/100`},[`${$.icon} ${L._score}`])]),l("div",{class:"lead-card__what u-truncate u-muted",text:ct}),l("div",{class:"lead-card__meta u-caption"},[l("span",{class:"lead-card__chan",text:`${L._channel.icon} ${L._channel.label}`}),l("span",{class:"lead-card__dot",text:"·"}),l("span",{text:gr(L.createdAt)}),l("span",{class:"lead-card__dot",text:"·"}),ce?l("button",{class:"badge badge--ok",type:"button","data-action":"pipeline",title:"Este lead ya es un negocio: gestiónalo en el Pipeline",style:{cursor:"pointer",border:"none"}},[L.convertedTo&&L.convertedTo.outcome==="perdido"?"✖ Negocio perdido → Pipeline":L.convertedTo&&L.convertedTo.outcome==="vendido"?"🏆 VENDIDO":`🎯 ${L.convertedTo&&L.convertedTo.stageName||"Convertido"} → Pipeline`]):l("span",{class:`badge badge--${Y.badge||""}`.trim(),text:Y.label}),L.archived?l("span",{class:"badge",text:"🗄 Archivado"}):null,ne?l("span",{class:"lead-card__dot",text:"·"}):null,ne,L.ownerName?l("span",{class:"lead-card__dot",text:"·"}):null,L.ownerName?l("span",{class:"u-faint",text:"👤 "+L.ownerName}):null]),l("div",{class:"lead-card__nba"},[l("span",{"aria-hidden":"true",text:L._nba.icon}),l("span",{class:"u-muted",text:"Próx: "}),l("strong",{text:L._nba.label})])]),l("div",{class:"lead-card__actions"},[X("wa",bn.wa,"WhatsApp","btn--wa"),t?X("call",bn.call,"Registrar llamada"):null,t?X("assign",bn.person,"Asignar"):null,t&&!ce?X("status",bn.flag,"Cambiar estado"):null,t&&!ce?X("convert",bn.convert,"Convertir a oportunidad"):null,t?X("more",bn.more,"Más acciones"):null,X("open",bn.expand,"Abrir 360")])]);return zn.addEventListener("click",Gn=>{const Ls=Gn.target.closest("[data-action]");if(Ls){Be(Ls.dataset.action,L,Ls);return}N(L.id)}),zn.addEventListener("keydown",Gn=>{Gn.key==="Enter"?N(L.id):Gn.key.toLowerCase()==="w"&&k(L)}),zn}function X(L,$,Y,ce=""){return l("button",{class:`icon-btn ${ce}`.trim(),type:"button","data-action":L,title:Y,"aria-label":Y},[l("span",{html:$,"aria-hidden":"true"})])}const ye={nuevo:"Acaba de entrar, nadie le ha hablado",contactado:"Ya le escribiste o llamaste",descartado:"No va: inalcanzable, no califica, spam… (pide la razón)"};function Be(L,$,Y){if(L==="open")return N($.id);if(L==="wa")return k($,Y);if(L==="call")return x($,Y);if(L==="convert")return v($);if(L==="pipeline"){window.location.hash="#/pipeline";return}if(L==="assign"){const ce=H.get().team||[],re=[{value:null,label:"Sin asignar",icon:"⊘",active:!$.ownerId},...ce.map(ne=>({value:ne,label:ne.nombre,hint:ne.cargo,icon:"👤",active:$.ownerId===ne.uid}))];return Bt(Y,re,ne=>A($,ne.value),{title:"Asignar a"})}if(L==="status"){if($.convertedTo&&$.convertedTo.dealId){G("Este lead ya es un negocio: gestiónalo en el Pipeline.","info");return}const ce=Zl.filter(re=>re.id!=="convertido").map(re=>({value:re.id,label:re.label,hint:ye[re.id]||"",active:($.status||"nuevo")===re.id}));return Bt(Y,ce,re=>{if(re.value==="descartado"){Bt(Y,SC.map(ne=>({value:ne.id,label:ne.label})),ne=>O($,"descartado",{discardReason:ne.value}),{title:"¿Por qué se descarta?"});return}O($,re.value)},{title:"Cambiar estado"})}if(L==="more"){const ce=[$.archived?{value:"unarchive",label:"Restaurar de archivados",icon:"↩️"}:{value:"archive",label:"Archivar",icon:"🗄",hint:"Sale de las vistas; reversible"},Ye("crm.delete")?{value:"purge",label:"Eliminar definitivo",icon:"🗑",hint:"Solo pruebas/spam — borra TODO su rastro"}:null].filter(Boolean);return Bt(Y,ce,async re=>{if(re.value==="archive"||re.value==="unarchive"){const ne=re.value==="archive";if(R($.id,{archived:ne}),H.get().mock){G(ne?"🗄 Archivado":"↩️ Restaurado","ok");return}try{await QC($.id,ne),G(ne?"🗄 Archivado":"↩️ Restaurado","ok")}catch{R($.id,{archived:!ne}),G("No se pudo archivar","error")}return}if(re.value==="purge"){if(!navigator.onLine){G("Eliminar definitivo necesita señal.","error");return}if(!window.confirm('🗑 ¿Eliminar DEFINITIVAMENTE a "'+$.fullName+`"?

Borra el lead, sus actividades, negocios y su contacto si queda huérfano. Esto es SOLO para pruebas/spam — un cliente real se ARCHIVA.`)||!window.confirm("Última confirmación: esta acción NO se puede deshacer. ¿Eliminar?"))return;if(H.get().mock){G("Eliminado (mock)","ok");return}try{const ne=await YC($.id);G(`🗑 Eliminado: ${ne.activities} actividades, ${ne.deals} negocios${ne.contactDeleted?", contacto":""}`,"ok")}catch(ne){G(ne.message&&ne.message.includes("Super Admin")?"Solo el Super Admin puede eliminar.":"No se pudo eliminar: "+(ne.message||ne.code),"error")}}},{title:"Más acciones"})}}function N(L){H.set({detailLeadId:L})}function z(L,$,Y){return l("div",{class:"state"},[l("div",{class:"state__icon","aria-hidden":"true",text:L}),l("div",{class:"state__title",text:$}),l("div",{class:"state__msg",text:Y})])}function q(L,$,Y){me(g),g.append(z(L,$,Y))}function Z(){me(g);for(let L=0;L<6;L++)g.append(l("div",{class:"lead-card lead-card--skeleton"},[l("span",{class:"skeleton",style:{width:"30px",height:"30px",borderRadius:"50%"}}),l("div",{class:"u-grow u-stack",style:{gap:"8px"}},[l("span",{class:"skeleton",style:{width:"46%",height:"14px"}}),l("span",{class:"skeleton",style:{width:"70%",height:"12px"}})])]))}async function j(L){if(e.cursor){L.disabled=!0,L.textContent="Cargando…";try{const{rows:$,lastDoc:Y,hasMore:ce}=await qC({after:e.cursor}),re=Mo($),ne=new Set(e.leads.map(Se=>Se.id));e.leads.push(...re.filter(Se=>!ne.has(Se.id))),e.cursor=Y,e.hasMore=ce,w(),y()}catch{G("No se pudo cargar más","error"),L.disabled=!1,L.textContent="Cargar más"}}}function he(){if(H.get().mock){H.set({team:nu()}),e.leads=Mo(Ba()),e.loading=!1,e.hasMore=!1,w(),y(),e.dirtyHandler=()=>{e.leads=Mo(Ba()),w(),y()},window.addEventListener("altorra:leads-dirty",e.dirtyHandler);return}jC().catch(()=>{}),e.sub=$C({pageSize:40,onData:(L,$)=>{e.leads=Mo(L),e.cursor=e.sub?e.sub.getLastDoc():null,e.hasMore=$.hasMore,e.loading=!1,e.error=null,w(),y()},onError:L=>{console.error("[inbox] error de suscripción:",L),e.loading=!1,e.error=L&&L.code==="permission-denied"?"Tu cuenta no tiene permiso para ver el CRM.":"Revisa tu conexión e inténtalo de nuevo.",y()}})}return y(),he(),function(){e.sub&&e.sub.unsubscribe&&e.sub.unsubscribe(),e.sub=null,e.dirtyHandler&&(window.removeEventListener("altorra:leads-dirty",e.dirtyHandler),e.dirtyHandler=null)}}function VP(n){const e=String(n.fullName||"").trim().split(/\s+/)[0]||"",t=n.vehicleOfInterestId?` por el vehículo ${n.vehicleOfInterestId}`:"";return`Hola ${e}, te saluda Altorra Cars 👋. Vimos tu interés${t}. ¿En qué te podemos ayudar?`}function OP(n){const e={deals:[],loading:!0,error:null,sub:null,dragId:null,view:"kanban",won:[],wonSub:null,wonLoading:!0,wonError:null,collisionByDeal:new Map},t=Ye("crm.edit"),r=new Set,s=l("div",{class:"pipeline__bar"}),i=l("div",{class:"pipeline__board",role:"list","aria-label":"Embudo de ventas"}),o=l("p",{class:"u-muted u-caption",style:{margin:"0"}},["Aquí se trabajan las ventas activas. Los interesados nuevos llegan a la Bandeja."]),c=l("section",{class:"pipeline"},[o,s,i]);me(n),n.append(c);function u(N,z){const q=e.deals.findIndex(Z=>Z.id===N);q!==-1&&(e.deals[q]={...e.deals[q],...z},H.get().mock&&oP(N,z),A())}async function d(N,z){if(N.stageId===z)return;const q=Qp(N.stageId,z);if(!q.ok){G(q.error==="vendido_es_terminal"?"Un negocio vendido no se mueve (anulación = admin).":"Movimiento no válido","error");return}const Z=[...q.gates];q.needsReason&&Z.push("regressReason");const j=async he=>{const L=Zr(z),$=N.stageId;if(u(N.id,{stageId:z,stageName:L.label,probability:L.prob,...he,lastActivityAt:new Date().toISOString()}),H.get().mock){G("Etapa → "+L.label,"ok");return}try{await Jp(N.id,z,N,he),p(N,$,L.label)}catch(Y){u(N.id,{stageId:$,stageName:Zr($).label,probability:yi($)}),G(Y&&Y.code==="permission-denied"?"Movimiento rechazado por las reglas — recarga el portal si tu versión es vieja.":"No se pudo mover","error")}};if(!Z.length)return j({});g(N,z,Z,j)}let f=null;function p(N,z,q){f&&f.remove();const Z=l("button",{class:"btn btn--soft btn--sm",type:"button"},["Deshacer"]),j=l("div",{role:"status",style:{position:"fixed",bottom:"18px",left:"50%",transform:"translateX(-50%)",display:"flex",gap:"12px",alignItems:"center",zIndex:"99",padding:"10px 14px",borderRadius:"10px",background:"var(--bg-elev, #1c1a17)",border:"1px solid var(--line, #444)",boxShadow:"0 6px 24px rgba(0,0,0,.4)"}},[l("span",{text:`${(N.contactName||N.name||"Negocio").split(" · ")[0]} → ${q}`}),Z]);document.body.appendChild(j),f=j;const he=setTimeout(()=>{j.remove(),f===j&&(f=null)},1e4);Z.addEventListener("click",async()=>{clearTimeout(he),j.remove(),f===j&&(f=null);const L=Zr(z);if(u(N.id,{stageId:z,stageName:L.label,probability:L.prob}),!H.get().mock)try{await Jp(N.id,z,N,{regressReason:"Deshacer (arrastre accidental)"})}catch{G("No se pudo deshacer","error")}})}function g(N,z,q,Z){const j={},he=[],L=(Ne,$e)=>l("label",{class:"field"},[l("span",{class:"field__label",text:Ne}),$e]);if(q.includes("huboTestDrive")&&(j.huboTestDrive=l("select",{class:"select"},[l("option",{value:"si"},["Sí, hubo test drive"]),l("option",{value:"no"},["No alcanzó a probarlo"])]),he.push(L("¿Hubo test drive?",j.huboTestDrive))),q.includes("montoApartado")){j.montoApartado=l("input",{class:"input",type:"number",min:"0",step:"50000",placeholder:"500000"});const Ne=new Date(Date.now()+72*3600*1e3);j.venceEl=l("input",{class:"input",type:"date",value:Ne.toISOString().slice(0,10)}),he.push(L("Monto del apartado (COP) *",j.montoApartado),L("Vence el (default 72h)",j.venceEl))}if(q.includes("tipoPago")&&(j.tipoPago=l("select",{class:"select"},[l("option",{value:"contado"},["De contado"]),l("option",{value:"financiado"},["Financiado"])]),j.estadoCredito=l("select",{class:"select"},[l("option",{value:""},["— Estado del crédito —"]),l("option",{value:"pre_aprobado"},["Pre-aprobado"]),l("option",{value:"en_estudio"},["En estudio"]),l("option",{value:"aprobado"},["Aprobado"]),l("option",{value:"rechazado"},["Rechazado"])]),he.push(L("Forma de pago *",j.tipoPago),L("Crédito (si aplica)",j.estadoCredito))),q.includes("lostReason")&&(j.lostReason=l("select",{class:"select"},Yp.map(Ne=>l("option",{value:Ne.id},[Ne.label]))),he.push(L("¿Por qué se perdió? *",j.lostReason))),q.includes("regressReason")&&(j.regressReason=l("input",{class:"input",type:"text",placeholder:"¿Qué pasó? (obligatorio al retroceder)"}),he.push(L("Razón del retroceso *",j.regressReason))),z==="vendido"){j.retomaCheck=l("input",{type:"checkbox",class:"checkbox"}),j.retomaMarca=l("input",{class:"input",type:"text",placeholder:"Marca *"}),j.retomaModelo=l("input",{class:"input",type:"text",placeholder:"Modelo"}),j.retomaYear=l("input",{class:"input",type:"number",min:"1980",max:"2035",placeholder:"Año"}),j.retomaPlaca=l("input",{class:"input",type:"text",placeholder:"Placa",maxlength:"8"}),j.retomaValor=l("input",{class:"input",type:"number",min:"0",step:"500000",placeholder:"Valor estimado (COP)"});const Ne=l("div",{class:"nl-form",hidden:!0,style:{marginTop:"8px"}},[j.retomaMarca,j.retomaModelo,j.retomaYear,j.retomaPlaca,j.retomaValor]);j.retomaCheck.addEventListener("change",()=>{Ne.hidden=!j.retomaCheck.checked}),he.push(l("div",{},[l("label",{class:"u-row u-row--tight",style:{cursor:"pointer"}},[j.retomaCheck,l("span",{text:"🚙 Recibe vehículo en parte de pago (retoma)"})]),Ne]))}const $=l("div",{class:"login__error",role:"alert",hidden:!0}),Y=l("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),ce=l("button",{class:"btn btn--gold",type:"submit"},["Mover a "+Zr(z).label]),re=l("form",{class:"nl-form"},[...he,$,l("div",{class:"nl-actions"},[Y,ce])]),ne=l("div",{class:"modal-overlay"},[l("div",{class:"modal"},[l("div",{class:"modal__head"},[l("h2",{class:"modal__title",text:Zr(z).label})]),re])]);document.body.appendChild(ne),r.add(ne);const Se=()=>{r.delete(ne),ne.remove()};Y.addEventListener("click",Se),ne.addEventListener("mousedown",Ne=>{Ne.target===ne&&Se()}),re.addEventListener("submit",Ne=>{Ne.preventDefault();const $e={};if(j.huboTestDrive&&($e.huboTestDrive=j.huboTestDrive.value==="si"),j.montoApartado){const ct=Math.round(Number(j.montoApartado.value)||0);if(!(ct>0)){$.textContent="El monto del apartado es obligatorio.",$.hidden=!1;return}$e.montoApartado=ct,$e.venceEl=new Date((j.venceEl.value||new Date().toISOString().slice(0,10))+"T18:00:00-05:00").toISOString()}if(j.tipoPago&&($e.tipoPago=j.tipoPago.value,j.estadoCredito&&j.estadoCredito.value&&($e.estadoCredito=j.estadoCredito.value)),j.lostReason&&($e.lostReason=j.lostReason.value),j.regressReason){const ct=j.regressReason.value.trim();if(!ct){$.textContent="Escribe la razón del retroceso.",$.hidden=!1;return}$e.regressReason=ct}if(j.retomaCheck&&j.retomaCheck.checked){const ct=j.retomaMarca.value.trim();if(!ct){$.textContent="La marca del vehículo recibido es obligatoria.",$.hidden=!1;return}$e.recibeVehiculo={marca:ct,modelo:j.retomaModelo.value.trim(),year:Number(j.retomaYear.value)||null,placa:j.retomaPlaca.value.trim().toUpperCase(),valorEstimado:Math.round(Number(j.retomaValor.value)||0)}}Se(),Z($e)})}async function b(N,z){if(u(N.id,{amount:z}),!H.get().mock)try{await AP(N.id,z,N)}catch{G("No se pudo guardar el monto","error")}}async function E(N){if(!(Number(N.amount)>0)){G("Ponle el monto al negocio antes de marcarlo ganado (con ese valor se congela la comisión).","error");return}const z=Qp(N.stageId,"vendido");if(!z.ok){G("Movimiento no válido","error");return}const q={status:N.status,stageId:N.stageId},Z=async j=>{if(u(N.id,{status:"won",...j}),H.get().mock){G("🎉 ¡Venta ganada!","ok");return}try{await RP(N.id,N,j),G("🎉 ¡Venta ganada!","ok")}catch{u(N.id,q),G("No se pudo marcar — revisa los datos requeridos","error")}};if(!z.gates.length)return Z({});g(N,"vendido",z.gates,Z)}async function S(N,z){const q={status:N.status,lostReason:N.lostReason||null};if(u(N.id,{status:"lost",lostReason:z}),H.get().mock){G("Marcado perdido","info");return}try{await SP(N.id,z,N),G("Marcado perdido","info")}catch{u(N.id,q),G("Error","error")}}function A(){if(e.loading)return ye();if(e.error)return X("⚠️","No se pudo cargar",e.error);const N=e.deals.filter(q=>q.status==="open");e.collisionByDeal=new Map;for(const q of bP(N))for(const Z of q.dealIds)e.collisionByDeal.set(Z,q.dealIds.length);if(O(N),e.view==="postventa")return le();if(i.classList.remove("pipeline__board--list"),me(i),!N.length){i.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"🎯"}),l("div",{class:"state__title",text:"Embudo vacío"}),l("div",{class:"state__msg",text:"Convierte un lead en oportunidad desde la Bandeja para empezar."})]));return}const z=yP(N);vi.forEach(q=>{const Z=z[q.id]||[],j=Z.reduce((L,$)=>L+(Number($.amount)||0),0),he=l("div",{class:"pcol","data-stage":q.id},[l("div",{class:"pcol__head"},[l("div",{class:"u-row u-row--tight"},[l("span",{class:"pcol__dot",style:{background:LP(q.id)}}),l("strong",{text:q.label}),l("span",{class:"pcol__count",text:String(Z.length)})]),l("span",{class:"u-caption u-faint",text:`${Math.round(q.prob*100)}% · ${nr(j)||"$0"}`})]),l("div",{class:"pcol__drop","data-stage":q.id,role:"list"},Z.map(M))]);v(he.querySelector(".pcol__drop"),q.id),i.append(he)})}function O(N){const z=uy(N),q=_P(N);me(s);const Z=e.wonLoading?null:e.won.length,j=(he,L)=>{const $=l("button",{class:"btn btn--sm "+(e.view===he?"btn--gold":"btn--ghost"),type:"button","aria-pressed":e.view===he?"true":"false"},[L]);return $.addEventListener("click",()=>k(he)),$};s.append(l("div",{class:"pipeline__views",role:"group","aria-label":"Vista"},[j("kanban","🎯 Embudo"),j("postventa","🏁 Post-venta"+(Z===null||Z===0?"":" ("+Z+")"))]),x("Oportunidades",String(N.length)),x("Valor del embudo",nr(q)||"$0"),x("Forecast ponderado",nr(z)||"$0",!0))}function k(N){e.view!==N&&(e.view=N,N==="postventa"&&w(),A())}function x(N,z,q){return l("div",{class:"pstat"+(q?" pstat--hi":"")},[l("span",{class:"u-caption u-faint",text:N}),l("strong",{class:"pstat__v",text:z})])}function M(N){const z=vP(N),q=l("button",{class:"deal-card__amount",type:"button","data-action":"amount",title:"Editar monto"},[N.amount?nr(N.amount):"+ monto"]),Z=l("article",{class:"deal-card"+(z?" is-rotting":""),draggable:"true",tabindex:"0","data-id":N.id,"data-stage":N.stageId,role:"listitem","aria-label":`${N.name}, ${Math.round(yi(N.stageId)*100)}%`},[l("div",{class:"deal-card__top"},[l("span",{class:"avatar avatar--sm","aria-hidden":"true",text:Rs(N.contactName)}),l("span",{class:"deal-card__name u-grow u-truncate",text:N.name}),z?l("span",{class:"deal-card__rot",title:"Estancado >14 días",text:"🐌"}):null]),N.vehicleName?l("div",{class:"u-caption u-muted u-truncate",text:"🚗 "+N.vehicleName}):null,e.collisionByDeal.has(N.id)?l("div",{class:"deal-card__collision u-caption",title:"Otro negocio activo persigue este mismo carro. Coordinen quién va primero.",text:"🥊 "+e.collisionByDeal.get(N.id)+" negocios por este carro"}):null,l("div",{class:"deal-card__row"},[q,l("span",{class:"badge badge--gold",text:`${Math.round(yi(N.stageId)*100)}%`})]),l("div",{class:"deal-card__foot u-caption u-faint"},[l("span",{class:"u-grow u-truncate",text:N.ownerName?"👤 "+N.ownerName:"Sin asesor"}),l("span",{text:gr(N.lastActivityAt)})]),l("div",{class:"deal-card__actions"},t?[P("stage","↔","Mover etapa"),P("won","✓","Marcar ganado"),P("lost","✕","Marcar perdido"),P("open","⤢","Abrir 360")]:[P("open","⤢","Abrir 360")])]);return Z.addEventListener("dragstart",j=>{e.dragId=N.id,Z.classList.add("is-dragging");try{j.dataTransfer.setData("text/plain",N.id),j.dataTransfer.effectAllowed="move"}catch{}}),Z.addEventListener("dragend",()=>{e.dragId=null,Z.classList.remove("is-dragging")}),Z.addEventListener("click",j=>{const he=j.target.closest("[data-action]");if(he)return F(he.dataset.action,N,he)}),Z}function P(N,z,q){return l("button",{class:"icon-btn icon-btn--xs",type:"button","data-action":N,title:q,"aria-label":q,draggable:"false"},[z])}function F(N,z,q){if(N==="open")return H.set({detailLeadId:z.leadId});if(N==="amount")return T(z,q);if(N==="stage")return Bt(q,vi.map(Z=>({value:Z.id,label:Z.label,hint:Math.round(Z.prob*100)+"%",active:Z.id===z.stageId})),Z=>d(z,Z.value),{title:"Mover a etapa"});if(N==="won")return E(z);if(N==="lost")return Bt(q,Yp.map(Z=>({value:Z.id,label:Z.label})),Z=>S(z,Z.value),{title:"Motivo de pérdida"})}function T(N,z){const q=l("input",{class:"deal-card__amount-input",type:"text",inputmode:"numeric",value:N.amount||"","aria-label":"Monto en COP"});z.replaceWith(q),q.focus(),q.select();const Z=()=>{const j=parseInt(String(q.value).replace(/\D/g,""),10)||0;b(N,j)};q.addEventListener("keydown",j=>{j.key==="Enter"?(j.preventDefault(),Z()):j.key==="Escape"&&A()}),q.addEventListener("blur",Z)}function v(N,z){N.addEventListener("dragover",q=>{q.preventDefault(),N.classList.add("is-over"),q.dataTransfer&&(q.dataTransfer.dropEffect="move")}),N.addEventListener("dragleave",()=>N.classList.remove("is-over")),N.addEventListener("drop",q=>{q.preventDefault(),N.classList.remove("is-over");const Z=e.dragId||q.dataTransfer&&q.dataTransfer.getData("text/plain"),j=e.deals.find(he=>he.id===Z);j&&d(j,z)})}function w(){if(H.get().mock){e.won=ru().filter(N=>N.status==="won"),e.wonLoading=!1,e.wonError=null;return}e.wonSub||(e.wonSub=kP({pageSize:100,onData:N=>{e.won=N.slice().sort((z,q)=>String(q.wonAt||q.lastActivityAt||"").localeCompare(String(z.wonAt||z.lastActivityAt||""))),e.wonLoading=!1,e.wonError=null,A()},onError:N=>{if(e.wonSub)try{e.wonSub()}catch{}e.wonSub=null,e.wonLoading=!1,e.wonError=N&&N.code==="permission-denied"?"Sin permiso para ver los ganados.":"Revisa tu conexión.",e.view==="postventa"&&A()}}))}function R(N,z){const q=e.won.findIndex(Z=>Z.id===N);q!==-1&&(e.won[q]={...e.won[q],...z},A())}async function y(N,z,q){const Z=N.postventa||{};if(R(N.id,{postventa:{...Z,[z]:q}}),!H.get().mock)try{await CP(N.id,z,q)}catch{R(N.id,{postventa:Z}),G("No se pudo guardar el checklist","error")}}async function C(N,z){z.disabled=!0,z.textContent="Creando…";try{const q=await xP(N.id);R(N.id,{retomaVehicleId:q.vehicleId}),G("Borrador #"+q.vehicleId+" creado en inventario","ok")}catch(q){z.disabled=!1,z.textContent="Crear borrador en inventario",G(q&&q.message?q.message:"No se pudo crear el borrador","error")}}function I(N){const z=l("input",{class:"input",type:"text",placeholder:"Marca *"}),q=l("input",{class:"input",type:"text",placeholder:"Modelo"}),Z=l("input",{class:"input",type:"number",min:"1980",max:"2035",placeholder:"Año"}),j=l("input",{class:"input",type:"text",placeholder:"Placa",maxlength:"8"}),he=l("input",{class:"input",type:"number",min:"0",step:"500000",placeholder:"Valor estimado (COP)"}),L=l("div",{class:"login__error",role:"alert",hidden:!0}),$=l("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),Y=l("button",{class:"btn btn--gold",type:"submit"},["Guardar retoma"]),ce=l("form",{class:"nl-form"},[z,q,Z,j,he,L,l("div",{class:"nl-actions"},[$,Y])]),re=l("div",{class:"modal-overlay"},[l("div",{class:"modal"},[l("div",{class:"modal__head"},[l("h2",{class:"modal__title",text:"🚙 Vehículo recibido (retoma)"})]),ce])]);document.body.appendChild(re),r.add(re);const ne=()=>{r.delete(re),re.remove()};$.addEventListener("click",ne),re.addEventListener("mousedown",Se=>{Se.target===re&&ne()}),ce.addEventListener("submit",async Se=>{if(Se.preventDefault(),!z.value.trim()){L.textContent="La marca es obligatoria.",L.hidden=!1;return}const Ne={marca:z.value.trim(),modelo:q.value.trim(),year:Number(Z.value)||null,placa:j.value.trim().toUpperCase(),valorEstimado:Math.round(Number(he.value)||0)};ne();const $e=N.recibeVehiculo||null;if(R(N.id,{recibeVehiculo:Ne}),!H.get().mock)try{await PP(N.id,Ne)}catch{R(N.id,{recibeVehiculo:$e}),G("No se pudo guardar","error")}})}function le(){if(me(i),i.classList.add("pipeline__board--list"),e.wonError){const N=l("button",{class:"btn btn--soft btn--sm",type:"button"},["↻ Reintentar"]);N.addEventListener("click",()=>{e.wonError=null,e.wonLoading=!0,w(),A()}),i.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"⚠️"}),l("div",{class:"state__title",text:"No se pudieron cargar los ganados"}),l("div",{class:"state__msg",text:e.wonError}),N]));return}if(e.wonLoading){i.append(l("div",{class:"state"},[l("div",{class:"state__msg",text:"Cargando ganados…"})]));return}if(!e.won.length){i.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"🏁"}),l("div",{class:"state__title",text:"Sin ventas ganadas aún"}),l("div",{class:"state__msg",text:"Cuando marques un negocio como ganado, su checklist de entrega vivirá aquí."})]));return}e.won.forEach(N=>i.append(fe(N)))}function fe(N){const z=hy(N),q=N.commissionSnapshot&&N.commissionSnapshot.amount||N.amount||0,Z=(N.wonAt||N.lastActivityAt||"").slice(0,10),j=dy.map($=>{const Y=!!(N.postventa&&N.postventa[$.id]),ce=l("input",{type:"checkbox",class:"checkbox"});return ce.checked=Y,t||(ce.disabled=!0),ce.addEventListener("change",()=>y(N,$.id,ce.checked)),l("label",{class:"pv-item"+(Y?" is-done":"")},[ce,l("span",{text:$.label})])}),he=N.recibeVehiculo;let L;if(he&&(he.marca||he.placa)){const $=[l("span",{class:"u-caption u-muted",text:"🚙 Retoma: "+[he.marca,he.modelo,he.placa].filter(Boolean).join(" ")+(he.valorEstimado?" · "+nr(he.valorEstimado):"")})];if(N.retomaVehicleId)$.push(l("span",{class:"badge badge--gold",text:"Borrador #"+N.retomaVehicleId+" ✓"}));else if(t){const Y=l("button",{class:"btn btn--soft btn--sm",type:"button"},["Crear borrador en inventario"]);Y.addEventListener("click",()=>C(N,Y)),$.push(Y)}L=l("div",{class:"pv-retoma"},$)}else if(t){const $=l("button",{class:"btn btn--ghost btn--sm",type:"button"},["＋ Retoma"]);$.addEventListener("click",()=>I(N)),L=l("div",{class:"pv-retoma"},[$])}return l("article",{class:"deal-card deal-card--pv","data-id":N.id},[l("div",{class:"deal-card__top"},[l("span",{class:"avatar avatar--sm","aria-hidden":"true",text:Rs(N.contactName)}),l("span",{class:"deal-card__name u-grow u-truncate",text:N.name}),l("span",{class:"badge "+(z?"badge--gold":""),title:z?"Checklist completo: entra a liquidación de comisiones (F42)":"La comisión se liquida cuando el checklist esté completo",text:z?"✓ Liquidable":"⏳ Pendiente"})]),l("div",{class:"u-caption u-muted"},[l("span",{text:(N.vehicleName?"🚗 "+N.vehicleName+" · ":"")+nr(q)}),l("span",{class:"u-faint",text:(N.tipoPago?" · "+N.tipoPago:"")+(Z?" · ganado "+Z:"")})]),l("div",{class:"pv-checklist"},j),L||null,l("div",{class:"deal-card__foot u-caption u-faint"},[l("span",{class:"u-grow u-truncate",text:N.ownerName?"👤 "+N.ownerName:"Sin asesor"})])])}function X(N,z,q){me(i),i.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:N}),l("div",{class:"state__title",text:z}),l("div",{class:"state__msg",text:q})]))}function ye(){me(s),me(i),vi.slice(0,5).forEach(()=>{i.append(l("div",{class:"pcol"},[l("div",{class:"pcol__head"},[l("span",{class:"skeleton",style:{width:"60%",height:"14px"}})]),l("div",{class:"pcol__drop"},[1,2].map(()=>l("div",{class:"deal-card",style:{pointerEvents:"none"}},[l("span",{class:"skeleton",style:{width:"100%",height:"52px"}})])))]))})}function Be(){if(H.get().mock){e.deals=ru().filter(N=>N.status==="open"),e.loading=!1,w(),A();return}e.sub=IP({pageSize:150,onData:N=>{e.deals=N,e.loading=!1,e.error=null,A()},onError:N=>{e.loading=!1,e.error=N&&N.code==="permission-denied"?"Sin permiso para ver el pipeline.":"Revisa tu conexión.",A()}}),w()}return A(),Be(),function(){if(e.sub&&e.sub(),e.sub=null,e.wonSub&&e.wonSub(),e.wonSub=null,r.forEach(z=>{try{z.remove()}catch{}}),r.clear(),f){try{f.remove()}catch{}f=null}}}function LP(n){return{nuevo:"var(--temp-cold)",contactado:"var(--info)",cita_agendada:"#8A7CFF",visito:"var(--gold-500)",test_drive:"var(--gold-600)",negociacion:"var(--warning)",financiacion:"var(--success)"}[n]||"var(--ink-400)"}const MP=["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"],Xp=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];function ji(n){const e=n.getFullYear(),t=String(n.getMonth()+1).padStart(2,"0"),r=String(n.getDate()).padStart(2,"0");return`${e}-${t}-${r}`}function vy(n,e){const r=(new Date(n,e,1).getDay()+6)%7,s=new Date(n,e+1,0).getDate(),i=[];for(let c=0;c<r;c++)i.push({date:new Date(n,e,1-r+c),inMonth:!1});for(let c=1;c<=s;c++)i.push({date:new Date(n,e,c),inMonth:!0});for(;i.length%7!==0;){const c=i[i.length-1].date;i.push({date:new Date(c.getFullYear(),c.getMonth(),c.getDate()+1),inMonth:!1})}const o=[];for(let c=0;c<i.length;c+=7)o.push(i.slice(c,c+7));return o}function FP(n,e){const t=vy(n,e),r=t[0][0].date,i=t[t.length-1][6].date,o=new Date(i.getFullYear(),i.getMonth(),i.getDate()+1);return{startISO:r.toISOString(),endISO:o.toISOString()}}function UP(n){const e={};for(const t of n){if(!t.dueAt)continue;const r=ji(new Date(t.dueAt));(e[r]||(e[r]=[])).push(t)}for(const t of Object.keys(e))e[t].sort((r,s)=>new Date(r.dueAt)-new Date(s.dueAt));return e}function Zp(n){const e=new Date(n);return Number.isNaN(e.getTime())?"":e.toLocaleTimeString("es-CO",{hour:"2-digit",minute:"2-digit"})}function BP(n,e){return n.getFullYear()===e.getFullYear()&&n.getMonth()===e.getMonth()&&n.getDate()===e.getDate()}const $P=n=>({id:n.id,...n.data()});function qP(n,e,t,r){const s=ot(Ae(se,"activities"),Un("dueAt",">=",n),Un("dueAt","<",e),vt("dueAt","asc"));return Yt(s,i=>t(i.docs.map($P)),i=>r&&r(i))}async function rr(n,e,t){return(await Lr(Mr,"crmCitaAction")({action:n,solicitudId:e||null,payload:t||{}})).data}async function jP(n){const e=await Or(Re(se,"solicitudes",n));return e.exists()?{id:e.id,...e.data()}:null}async function yy(){const n=await Or(Re(se,"config","availability"));return n.exists()?n.data():{}}async function by(){const n=await Or(Re(se,"config","bookedSlots"));return n.exists()?n.data():{}}const zP=["super_admin","admin","editor","asesor","moderator"];let Bo=null;async function wy(){if(Bo)return Bo;const n=H.get(),e=new Map;try{(await un(ot(Ae(se,"usuarios"),kt(50)))).docs.forEach(r=>{const s=r.data();s.bloqueado!==!0&&(!zP.includes(s.rol)&&!s.roleId||e.set(r.id,{uid:r.id,nombre:s.nombre||s.email||r.id,rol:s.rol||s.roleId||""}))})}catch{try{const r=await Or(Re(se,"config","crmIntake"));(r.exists()&&Array.isArray(r.data().rotation)?r.data().rotation:[]).forEach(i=>{const o=typeof i=="string"?i:i.uid;o&&e.set(o,{uid:o,nombre:typeof i=="object"&&i.nombre||o,rol:""})})}catch{}}return n.user&&!e.has(n.user.uid)&&e.set(n.user.uid,{uid:n.user.uid,nombre:n.profile&&n.profile.nombre||n.user.email||"Yo",rol:n.profile&&n.profile.rol||""}),Bo=Array.from(e.values()),Bo}const GP={pendiente:"🕐 Pendiente (sin confirmar)",confirmada:"✅ Confirmada",reprogramada:"🔁 Reprogramada (re-confirmar)",completada:"🏁 Completada",cancelada:"✖ Cancelada",no_show:"🚫 No asistió",caducada:"⏳ Caducada (no confirmó)"},HP=["pendiente","confirmada","reprogramada"],KP="";function WP(){const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`}function Iy(n,e,t){const r=l("div",{class:"modal"},[l("div",{class:"modal__head"},[l("h2",{class:"modal__title",text:n}),e?l("span",{class:"u-caption u-faint",text:e}):null]),...t]),s=l("div",{class:"modal-overlay"},[r]);document.body.appendChild(s);const i=()=>{s.remove(),window.removeEventListener("keydown",o)},o=c=>{c.key==="Escape"&&i()};return window.addEventListener("keydown",o),s.addEventListener("mousedown",c=>{c.target===s&&i()}),{overlay:s,card:r,close:i}}function Xn(n,e){return e?l("div",{class:"cita-row"},[l("span",{class:"cita-row__k u-caption u-muted",text:n}),l("span",{class:"cita-row__v",text:String(e)})]):null}function QP(n,e,t){if(!t)return[];if(Array.isArray(n.blockedDates)&&n.blockedDates.includes(t))return[];const r=new Date(t+"T12:00:00Z").getUTCDay();if(!(Array.isArray(n.days)?n.days:[1,2,3,4,5,6]).includes(r))return[];const s=Array.isArray(e[t])?e[t]:[],i=n.blockedHours&&n.blockedHours[t]||[],o=[],c=n.interval||60;for(let u=(n.startHour??9)*60;u<(n.endHour??17)*60;u+=c){const d=`${String(Math.floor(u/60)).padStart(2,"0")}:${String(u%60).padStart(2,"0")}`;!s.includes(d)&&!i.includes(d)&&o.push(d)}return o}function Ey(n,e,{fecha:t,hora:r}={}){const s=l("input",{class:"input",type:"date",min:WP(),value:t||""}),i=l("select",{class:"select"},[l("option",{value:"",text:"— hora —"})]);function o(){const c=QP(n,e,s.value);i.replaceChildren(l("option",{value:"",text:c.length?"— hora —":"Sin horarios ese día"}),...c.map(u=>l("option",{value:u,text:u}))),r&&c.includes(r)&&(i.value=r)}return s.addEventListener("change",o),t&&o(),{dateIn:s,hourSel:i,value:()=>({fecha:s.value,hora:i.value})}}async function Ty(n){const e=l("select",{class:"select"},[l("option",{value:"",text:"Cargando…"})]),t=await wy();e.replaceChildren(l("option",{value:"",text:"— asesor —"}),...t.map(s=>l("option",{value:s.uid,text:s.nombre})));const r=H.get().user;return e.value=n&&t.some(s=>s.uid===n)?n:r&&t.some(s=>s.uid===r.uid)?r.uid:"",e._advisors=t,e}async function Ay(n){const e=l("select",{class:"select"},[l("option",{value:KP,text:"Sin vehículo asignado"})]);try{const t=await my();e.append(...t.map(r=>l("option",{value:r.id,text:r.label}))),n&&(e.value=n),e._vehicles=t}catch{e._vehicles=[]}return e}function YP(n,e){const t=String(n.whatsapp||n.telefono||"").replace(/\D/g,"");if(!t)return null;const r=t.length===10&&t.startsWith("3")?"57"+t:t.startsWith("57")?t:String(n.prefijoPais||"57").replace(/\D/g,"")+t,s=`Hola ${n.nombre||""}! Te escribo de ALTORRA CARS por tu cita del ${n.fecha||""} a las ${n.hora||""}`+(n.vehiculo?` para ver el ${n.vehiculo}`:"")+`. Confírmala aquí 👉 ${e}`;return`https://wa.me/${r}?text=${encodeURIComponent(s)}`}async function JP(n,{onLead:e}={}){const t=n.sourceSolicitudId;if(!t)return;if(H.get().mock){G("En demo las citas web no tienen acciones.","info");return}let r;try{r=await jP(t)}catch{r=null}if(!r){G("No se pudo cargar la cita.","error");return}const s=Ye("crm.edit"),i=HP.includes(r.estado),o=l("div",{class:"nl-form"}),c=l("div",{class:"login__error",role:"alert",hidden:!0}),u=b=>{c.textContent=b,c.hidden=!1},{close:d}=Iy("Cita · "+(r.nombre||"Cliente"),GP[r.estado]||r.estado,[o]);function f(){return l("div",{class:"cita-info"},[Xn("Cuándo",(r.fecha||"")+(r.hora?" · "+r.hora:"")),Xn("Tipo",r.tipo),Xn("Vehículo",r.vehiculo),Xn("Teléfono",(r.prefijoPais||"")+" "+(r.whatsapp||r.telefono||"")),Xn("Asesor",r.assignedToName||r.assignedTo),r.confirmedAt?Xn("Confirmó",(r.confirmedVia||"")+" · "+String(r.confirmedAt).slice(0,16).replace("T"," ")):null,r._tupleConflict?l("div",{class:"cita-conflict",text:"⚠️ El cliente confirmó pero el horario CHOCA con otra cita del asesor — reprograma una de las dos."}):null,r._requiereReagendar?l("div",{class:"cita-conflict",text:"🚗 El carro de esta cita ya no está disponible — ofrece otro o reagenda."}):null,Xn("Notas",r.comentarios||r.mensaje)])}async function p(b,E){c.hidden=!0;try{await E(),G(b,"ok"),d(),e&&r._leadId&&e(r._leadId)}catch(S){u(S&&S.message||"No se pudo completar la acción.")}}async function g(){if(o.replaceChildren(f(),c),!s||!i){if(r._leadId){const k=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"Ver cliente (360)"});k.addEventListener("click",()=>{d(),H.set({detailLeadId:r._leadId})}),o.append(k)}return}const b=l("div",{class:"cita-actions"}),E=l("button",{class:"btn btn--gold btn--sm",type:"button",text:"📲 Pedir confirmación por WhatsApp"});E.addEventListener("click",async()=>{E.disabled=!0;try{const k=await rr("getConfirmLink",r.id),x=YP(r,k.url);if(!x){u("La cita no tiene teléfono."),E.disabled=!1;return}window.open(x,"_blank","noopener"),G("Mensaje listo en WhatsApp — el cliente confirma tocando el link.","ok"),E.disabled=!1}catch(k){u(k&&k.message||"No se pudo generar el link."),E.disabled=!1}});const S=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"✓ Confirmar (asignar asesor)"});S.addEventListener("click",async()=>{o.replaceChildren(f(),c,l("p",{class:"u-caption u-muted",text:"Confirmar reserva el bloque del asesor (y del carro si aplica)."}));const k=await Ty(r.assignedTo),x=await Ay(r.vehicleAssignedId||r.vehiculoId),M=l("select",{class:"select"},[l("option",{value:"manual",text:"El cliente confirmó (llamada/persona)"}),l("option",{value:"whatsapp",text:"El cliente confirmó por WhatsApp"}),l("option",{value:"email",text:"El cliente confirmó por email"})]),P=l("button",{class:"btn btn--gold btn--sm",type:"button",text:"✓ Confirmar cita"}),F=l("button",{class:"btn btn--ghost btn--sm",type:"button",text:"‹ Volver"});F.addEventListener("click",g),P.addEventListener("click",()=>{if(!k.value){u("Elige el asesor.");return}const T=(k._advisors||[]).find(w=>w.uid===k.value)?.nombre||null,v=(x._vehicles||[]).find(w=>w.id===x.value);p("✅ Cita confirmada",()=>rr("confirm",r.id,{asesorId:k.value,asesorName:T,canal:M.value,vehicleId:x.value||null,vehicleName:v?v.label:null}))}),o.append(l("label",{class:"field"},[l("span",{class:"field__label",text:"Asesor *"}),k]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Vehículo"}),x]),l("label",{class:"field"},[l("span",{class:"field__label",text:"¿Cómo confirmó?"}),M]),l("div",{class:"nl-actions"},[F,P]))});const A=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"🔁 Reprogramar"});A.addEventListener("click",async()=>{o.replaceChildren(f(),c,l("p",{class:"u-caption u-muted",text:"Al reprogramar, el link viejo de confirmación deja de servir y el cliente debe re-confirmar."}));let k,x;try{[k,x]=await Promise.all([yy(),by()])}catch{u("No se pudo cargar la disponibilidad — revisa tu conexión y reintenta.");return}const M=Ey(k,x,{}),P=l("button",{class:"btn btn--gold btn--sm",type:"button",text:"🔁 Mover cita"}),F=l("button",{class:"btn btn--ghost btn--sm",type:"button",text:"‹ Volver"});F.addEventListener("click",g),P.addEventListener("click",()=>{const{fecha:T,hora:v}=M.value();if(!T||!v){u("Elige fecha y hora.");return}p("🔁 Cita reprogramada — pídele re-confirmar por WhatsApp",()=>rr("reschedule",r.id,{fecha:T,hora:v}))}),o.append(l("div",{class:"cfg-row"},[M.dateIn,M.hourSel]),l("div",{class:"nl-actions"},[F,P]))});const O=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"✖ Cancelar cita"});if(O.addEventListener("click",()=>{o.replaceChildren(f(),c);const k=l("input",{class:"input",type:"text",placeholder:"Motivo (le llega al cliente por email)"}),x=l("button",{class:"btn btn--gold btn--sm",type:"button",text:"Confirmar cancelación"}),M=l("button",{class:"btn btn--ghost btn--sm",type:"button",text:"‹ Volver"});M.addEventListener("click",g),x.addEventListener("click",()=>p("✖ Cita cancelada (cupo liberado)",()=>rr("cancel",r.id,{motivo:k.value.trim()}))),o.append(k,l("div",{class:"nl-actions"},[M,x]))}),b.append(E,S,A,O),r.estado!=="pendiente"){const k=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"🏁 Completada"});k.addEventListener("click",()=>p("🏁 Cita completada",()=>rr("complete",r.id)));const x=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"🚫 No asistió"});x.addEventListener("click",()=>p("🚫 No-show registrado — mañana 9am te recuerda llamarlo",()=>rr("no_show",r.id))),b.append(k,x)}if(r._leadId){const k=l("button",{class:"btn btn--ghost btn--sm",type:"button",text:"👤 Ver cliente (360)"});k.addEventListener("click",()=>{d(),H.set({detailLeadId:r._leadId})}),b.append(k)}o.append(b)}await g()}async function XP(n,{onDone:e}={}){if(H.get().mock){const A=new Date(Date.now()+864e5).toISOString();cP({type:"cita",subject:"Cita con "+(n.fullName||""),dueAt:A,relatedTo:{type:"lead",id:n.id,name:n.fullName},status:"open"}),G("📅 Cita agendada (demo)","ok");return}const t=l("div",{class:"login__error",role:"alert",hidden:!0}),r=A=>{t.textContent=A,t.hidden=!1},s=l("div",{class:"nl-form"},[l("p",{class:"u-caption u-muted",text:"La cita manual nace CONFIRMADA y reserva el bloque del asesor (y del carro). Necesitas señal."})]),{close:i}=Iy("📅 Agendar cita",n.fullName||"Cliente",[s]);let o,c,u,d;try{[o,c,u,d]=await Promise.all([yy(),by(),Ty(n.ownerId),Ay(n.vehicleOfInterestId)])}catch{s.append(t),r("No se pudo cargar la disponibilidad — revisa tu conexión y vuelve a abrir el diálogo.");return}const f=Ey(o,c,{}),p=l("select",{class:"select"},[l("option",{value:"visita",text:"Visita al concesionario"}),l("option",{value:"test_drive",text:"Test drive"}),l("option",{value:"llamada",text:"Llamada agendada"})]),g=l("select",{class:"select"},[l("option",{value:"30",text:"30 min"}),l("option",{value:"60",text:"1 hora",selected:""}),l("option",{value:"90",text:"1h 30"})]),b=l("input",{class:"input",type:"text",placeholder:"Nota (opcional)"}),E=l("button",{class:"btn btn--gold btn--sm",type:"button",text:"📅 Crear cita confirmada"}),S=l("button",{class:"btn btn--ghost btn--sm",type:"button",text:"Cancelar"});S.addEventListener("click",i),E.addEventListener("click",async()=>{t.hidden=!0;const{fecha:A,hora:O}=f.value();if(!A||!O)return r("Elige fecha y hora.");if(!u.value)return r("Elige el asesor que atiende.");E.disabled=!0,E.textContent="Creando…";const k=(u._advisors||[]).find(M=>M.uid===u.value)?.nombre||null,x=(d._vehicles||[]).find(M=>M.id===d.value);try{await rr("create",null,{leadId:n.id||null,contactId:n.contactId||null,nombre:n.fullName||"Cliente",telefono:n.phone||null,email:n.email||null,fecha:A,hora:O,duracionMin:parseInt(g.value,10)||60,asesorId:u.value,asesorName:k,vehicleId:d.value||null,vehicleName:x?x.label:null,tipo:p.value,nota:b.value.trim()}),G("📅 Cita creada y confirmada — ya está en la Agenda","ok"),i(),e&&e()}catch(M){E.disabled=!1,E.textContent="📅 Crear cita confirmada",r(M&&M.message||"No se pudo crear la cita.")}}),s.append(l("div",{class:"cfg-row"},[f.dateIn,f.hourSel]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Asesor *"}),u]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Vehículo"}),d]),l("div",{class:"cfg-row"},[p,g]),b,t,l("div",{class:"nl-actions"},[S,E]))}function ZP(n){const e=new Date,t={year:e.getFullYear(),month:e.getMonth(),events:[],loading:!0,error:null,sub:null},r=l("div",{class:"agenda__head"}),s=l("p",{class:"u-muted u-caption",style:{margin:"0",padding:"8px 10px",border:"1px dashed var(--line, #444)",borderRadius:"8px"}},["✅ Toca una cita para confirmarla (asignando asesor), pedir confirmación por WhatsApp, reprogramarla o cancelarla. ","Si el cliente no confirma, caduca sola 3h antes y libera el cupo. El ",l("a",{href:"/admin.html#solicitudes",target:"_blank",rel:"noopener",text:"calendario clásico"})," sigue de respaldo hasta el cambio definitivo."]),i=l("div",{class:"agenda__weekdays"},MP.map(A=>l("span",{class:"agenda__wd",text:A}))),o=l("div",{class:"agenda__grid"}),c=l("section",{class:"agenda"},[r,s,i,o]);me(n),n.append(c);function u(A){let O=t.month+A,k=t.year;O<0?(O=11,k--):O>11&&(O=0,k++),t.year=k,t.month=O,S()}function d(){t.year=e.getFullYear(),t.month=e.getMonth(),S()}function f(){me(r);const A=l("div",{class:"u-row u-row--tight"},[p("‹","Mes anterior",()=>u(-1)),l("button",{class:"btn btn--soft btn--sm",type:"button",onclick:d},["Hoy"]),p("›","Mes siguiente",()=>u(1))]);r.append(l("h2",{class:"agenda__title",text:`${Xp[t.month]} ${t.year}`}),A)}function p(A,O,k){const x=l("button",{class:"icon-btn",type:"button","aria-label":O},[A]);return x.addEventListener("click",k),x}function g(){if(f(),me(o),t.error){o.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"⚠️"}),l("div",{class:"state__title",text:"No se pudo cargar la agenda"}),l("div",{class:"state__msg",text:t.error})]));return}const A=UP(t.events);vy(t.year,t.month).forEach(k=>{k.forEach(x=>{const M=ji(x.date),P=A[M]||[],F=BP(x.date,e),T=l("div",{class:"agenda__day"+(x.inMonth?"":" is-out")+(F?" is-today":""),role:"gridcell"},[l("div",{class:"agenda__daynum",text:String(x.date.getDate())})]),v=l("div",{class:"agenda__events"});if(P.slice(0,3).forEach(w=>v.append(b(w))),P.length>3){const w=l("button",{class:"agenda__more",type:"button"},[`+${P.length-3} más`]);w.addEventListener("click",()=>Bt(w,P.map(R=>({value:R,label:`${Zp(R.dueAt)} · ${R.relatedTo?.name||R.subject||"Cita"}`})),R=>E(R.value),{title:`${x.date.getDate()} ${Xp[t.month]}`})),v.append(w)}T.append(v),o.append(T)})})}function b(A){const O=A.type==="cita"?A.estadoCita||"pendiente":null,k="agenda__chip"+(O?" agenda__chip--"+O:"")+(A.status==="closed"?" is-closed":""),x=l("button",{class:k,type:"button",title:A.subject||"Cita"},[l("span",{class:"agenda__chip-time",text:Zp(A.dueAt)}),l("span",{class:"u-truncate",text:A.relatedTo?.name||A.subject||"Cita"})]);return x.addEventListener("click",()=>E(A)),x}function E(A){if(A.type==="cita"&&A.sourceSolicitudId){JP(A,{onLead:k=>H.set({detailLeadId:k})});return}const O=A.relatedTo&&A.relatedTo.id;O&&H.set({detailLeadId:O})}function S(){if(g(),t.sub&&(t.sub(),t.sub=null),H.get().mock){t.events=aP(),t.loading=!1,g();return}const{startISO:A,endISO:O}=FP(t.year,t.month);t.sub=qP(A,O,k=>{t.events=k,t.loading=!1,t.error=null,g()},k=>{t.loading=!1,t.error=k&&k.code==="permission-denied"?"Sin permiso.":"Revisa tu conexión.",g()})}return S(),function(){t.sub&&t.sub(),t.sub=null}}const ex=n=>{const e=new Date(n).getTime();return Number.isNaN(e)?0:e},Sc=n=>n.status==="won",Ry=n=>n.status==="lost",Nd=n=>n.status==="open",Dd=n=>n.status==="convertido";function em(n,e){return e?n.filter(t=>ex(t.createdAt)>=e):n.slice()}function tx(n,e){const t=n.length,r=n.filter(Dd).length,s=e.filter(Sc),i=e.filter(Ry),o=s.reduce((u,d)=>u+(Number(d.amount)||0),0),c=s.length+i.length;return{leadsNew:t,convertidos:r,convRate:t?r/t:0,won:s.length,lost:i.length,winRate:c?s.length/c:0,wonValue:o}}function nx(n,e){const t=e.filter(Nd),r=n.filter(i=>!ks(i.status)),s=r.filter(i=>{const o=ny(i);return!o.closed&&(o.state==="warn"||o.state==="late")}).length;return{leadsActive:r.length,dealsOpen:t.length,pipelineWeighted:uy(t),slaRisk:s}}function rx(n,e){const t=new Set(e.filter(Sc).map(d=>d.id)),r=n.filter(d=>d.status==="contactado"||d.status==="calificado"||d.status==="convertido"),s=n.filter(d=>d.status==="calificado"||d.status==="convertido"),i=n.filter(Dd),o=i.filter(d=>d.convertedTo&&t.has(d.convertedTo.dealId)),c=n.length||1,u=[{key:"leads",label:"Leads",count:n.length},{key:"contactados",label:"Contactados",count:r.length},{key:"calificados",label:"Calificados",count:s.length},{key:"convertidos",label:"Convertidos",count:i.length},{key:"ganados",label:"Ganados",count:o.length}];return u.map((d,f)=>({...d,pctTop:d.count/c,convFromPrev:f===0?1:u[f-1].count?d.count/u[f-1].count:0}))}function sx(n,e){const t={},r=s=>t[s.key]||(t[s.key]={key:s.key,label:s.label,icon:s.icon,leads:0,convertidos:0,deals:0,won:0,revenue:0});return n.forEach(s=>{const i=r($i(s));i.leads++,Dd(s)&&i.convertidos++}),e.forEach(s=>{const i=r($i(s));i.deals++,Sc(s)&&(i.won++,i.revenue+=Number(s.amount)||0)}),Object.values(t).map(s=>({...s,convRate:s.leads?s.convertidos/s.leads:0})).sort((s,i)=>i.leads-s.leads||i.revenue-s.revenue)}function ix(n){const e=n.filter(Nd);return vi.map(t=>{const r=e.filter(s=>s.stageId===t.id);return{id:t.id,label:t.label,prob:t.prob,count:r.length,value:r.reduce((s,i)=>s+(Number(i.amount)||0),0),weighted:r.reduce((s,i)=>s+xd(i),0)}})}function ox(n,e,t=[]){const r={},s=(i,o)=>r[i]||(r[i]={ownerId:i,ownerName:o,leads:0,deals:0,won:0,lost:0,pipelineWeighted:0});return t.forEach(i=>s(i.uid,i.nombre)),n.forEach(i=>{const o=i.ownerId||"_none";s(o,i.ownerName||(o==="_none"?"Sin asignar":o)).leads++}),e.forEach(i=>{const o=i.ownerId||"_none",c=s(o,i.ownerName||(o==="_none"?"Sin asignar":o));c.deals++,Sc(i)?c.won++:Ry(i)?c.lost++:Nd(i)&&(c.pipelineWeighted+=xd(i))}),Object.values(r).filter(i=>i.leads||i.deals).map(i=>({...i,winRate:i.won+i.lost?i.won/(i.won+i.lost):0})).sort((i,o)=>o.won-i.won||o.pipelineWeighted-i.pipelineWeighted||o.leads-i.leads)}function ax(n,e=30){const t=[],r={},s=new Date;for(let i=e-1;i>=0;i--){const o=new Date(s.getFullYear(),s.getMonth(),s.getDate()-i),c={key:ji(o),date:o,count:0};t.push(c),r[c.key]=c}return n.forEach(i=>{if(!i.createdAt)return;const o=r[ji(new Date(i.createdAt))];o&&o.count++}),t}function cx(n){const e=new Date(n);return Number.isNaN(e.getTime())?"":e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")}function lx(n=6){const e=[],t=new Date;for(let r=0;r<n;r++){const s=new Date(t.getFullYear(),t.getMonth()-r,1),i=s.getFullYear()+"-"+String(s.getMonth()+1).padStart(2,"0"),o=s.toLocaleDateString("es-CO",{month:"long",year:"numeric"});e.push({key:i,label:o.charAt(0).toUpperCase()+o.slice(1)})}return e}function ux(n,e,t=[]){const r=(n||[]).filter(i=>i.status==="won"&&cx(i.wonAt||i.lastActivityAt)===e),s={};return r.forEach(i=>{const o=i.commissionSnapshot||{},c=o.ownerId||i.ownerId||"_none",u=(t.find(g=>g.uid===c)||{}).nombre,d=s[c]||(s[c]={ownerId:c,ownerName:u||i.ownerName||(c==="_none"?"Sin asignar":c),vendidos:0,liquidables:0,pendientes:0,baseLiquidable:0,basePendiente:0,deals:[]}),f=Number(o.amount!=null?o.amount:i.amount)||0,p=hy(i);d.vendidos++,p?(d.liquidables++,d.baseLiquidable+=f):(d.pendientes++,d.basePendiente+=f),d.deals.push({id:i.id,name:i.name||"",base:f,liquidable:p,tipoPago:o.tipoPago||i.tipoPago||""})}),Object.values(s).sort((i,o)=>o.baseLiquidable-i.baseLiquidable||o.vendidos-i.vendidos)}const tm=[{value:0,label:"Hoy"},{value:7,label:"7 días"},{value:30,label:"30 días"},{value:90,label:"90 días"},{value:null,label:"Todo"}];function dx(n){if(n==null)return null;const e=new Date;return new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime()-n*864e5}const Sy=n=>({id:n.id,...n.data()});async function nm(n,e){return(await un(ot(Ae(se,n),vt("createdAt","desc"),kt(e)))).docs.map(Sy)}async function hx({pageSize:n=500}={}){if(H.get().mock){const i=ru();return{leads:Ba(),deals:i,wons:i.filter(o=>o.status==="won"),capped:!1}}const[e,t,r]=await Promise.all([nm("leads",n),nm("deals",n),un(ot(Ae(se,"deals"),Un("status","==","won"),vt("lastActivityAt","desc"),kt(300)))]);return{leads:e.filter(i=>!i.archived),deals:t,wons:r.docs.map(Sy),capped:e.length>=n||t.length>=n}}const fx="http://www.w3.org/2000/svg";function fl(n,e={},t=[]){const r=document.createElementNS(fx,n);for(const[s,i]of Object.entries(e))i==null||i===!1||r.setAttribute(s,String(i));for(const s of[].concat(t))s==null||s===!1||s===""||r.append(s.nodeType?s:document.createTextNode(String(s)));return r}function px(n,e={}){const t=e.max!=null?e.max:Math.max(1,...n.map(s=>Number(s.value)||0)),r=l("div",{class:"reportes__bars",role:"list"});return n.forEach(s=>{const i=s.pct!=null?s.pct:t?(Number(s.value)||0)/t:0,o=Math.max(0,Math.min(100,i*100));r.append(l("div",{class:"reportes__bar",role:"listitem"},[l("span",{class:"reportes__bar-label u-truncate",text:s.label}),l("span",{class:"reportes__bar-track","aria-hidden":"true"},[l("span",{class:"reportes__bar-fill",style:{width:o+"%",background:s.color||"var(--grad-gold)"}})]),l("span",{class:"reportes__bar-val u-mono",text:s.display!=null?s.display:String(s.value)})]))}),r}function mx(n){const s=n.map(E=>Number(E.value)||0),i=Math.max(...s,0),o=Math.max(1,i),c=n.length,u=E=>c<=1?600/2:6+E*(600-2*6)/(c-1),d=E=>134-E/o*(140-2*6),f=n.map((E,S)=>`${u(S).toFixed(1)},${d(s[S]).toFixed(1)}`).join(" "),p=`6,134 ${f} ${594 .toFixed(1)},134`,g=s.reduce((E,S)=>E+S,0),b=(n[s.indexOf(i)]||{}).label||"";return fl("svg",{class:"reportes__spark",viewBox:"0 0 600 140",preserveAspectRatio:"none",role:"img","aria-label":`Tendencia: ${g} en total; pico de ${i}${b?" el "+b:""}.`},[fl("polygon",{points:p,fill:"var(--gold-300)",opacity:"0.30"}),fl("polyline",{points:f,fill:"none",stroke:"var(--gold-500)","stroke-width":"2","stroke-linejoin":"round","stroke-linecap":"round","vector-effect":"non-scaling-stroke"})])}const Ct=n=>Math.round((n||0)*100)+"%",bt=n=>nr(n)||"$0",pl=n=>`${n.getDate()}/${n.getMonth()+1}`;function gx(n){const e=lx(6),t={leads:[],deals:[],wons:[],loading:!0,error:null,capped:!1,days:30,month:e[0].key};let r=!0;const s=l("div",{class:"reportes__chips",role:"group","aria-label":"Período"}),i=l("button",{class:"btn btn--soft btn--sm",type:"button"},["↻ Actualizar"]),o=l("button",{class:"btn btn--soft btn--sm",type:"button"},["⤓ CSV"]);i.addEventListener("click",R),o.addEventListener("click",w);const c=l("div",{class:"reportes__toolbar"},[s,l("div",{class:"u-row u-row--tight"},[i,o])]),u=l("div",{class:"reportes__body"}),d=l("section",{class:"reportes"},[c,u]);me(n),n.append(d);function f(){me(s),tm.forEach(y=>{const C=t.days===y.value,I=l("button",{class:"chip",type:"button","aria-pressed":C?"true":"false"},[y.label]);I.addEventListener("click",()=>{t.days=y.value,g()}),s.append(I)})}function p(){const y=dx(t.days),C=em(t.leads,y),I=em(t.deals,y);return{pLeads:C,pDeals:I,pk:tx(C,I),ck:nx(t.leads,t.deals),fn:rx(C,t.deals),src:sx(C,I),stg:ix(t.deals),own:ox(C,I,H.get().mock?nu():H.get().team||[]),tr:ax(t.leads,30),com:ux(t.wons,t.month,H.get().mock?nu():H.get().team||[])}}function g(){if(f(),t.loading)return v();if(t.error)return T("⚠️","No se pudieron cargar los reportes",t.error);if(!t.leads.length&&!t.deals.length)return T("📊","Aún no hay datos para reportar","Cuando entren leads y oportunidades, aquí verás tus KPIs, el embudo y el rendimiento por fuente.");const y=p();me(u),t.capped&&u.append(l("div",{class:"reportes__notice u-caption"},["ℹ️ Mostrando los registros más recientes (tope por carga). Los totales históricos completos llegarán con los reportes acumulados."])),u.append(b("Del período",[E("Leads nuevos",String(y.pk.leadsNew)),E("Tasa de conversión",Ct(y.pk.convRate),`${y.pk.convertidos} de ${y.pk.leadsNew}`),E("Win rate",Ct(y.pk.winRate),`${y.pk.won} ganadas · ${y.pk.lost} perdidas`),E("Valor ganado",bt(y.pk.wonValue),null,!0)]),b("Estado actual",[E("Leads activos",String(y.ck.leadsActive)),E("Oportunidades abiertas",String(y.ck.dealsOpen)),E("Pipeline ponderado",bt(y.ck.pipelineWeighted),null,!0),E("SLA en riesgo",String(y.ck.slaRisk),y.ck.slaRisk?"requieren atención":"al día")]),S(y.fn),A(y.src),O(y.stg),k(y.tr),x(y.own),M(y.com))}function b(y,C){return l("div",{class:"reportes__section"},[l("h2",{class:"reportes__sec-title",text:y}),l("div",{class:"reportes__kpis"},C)])}function E(y,C,I,le){return l("div",{class:"reportes__kpi"+(le?" reportes__kpi--hi":"")},[l("span",{class:"reportes__kpi-label u-caption u-faint",text:y}),l("strong",{class:"reportes__kpi-val",text:C}),I?l("span",{class:"reportes__kpi-sub u-caption u-faint",text:I}):null])}function S(y){const C=y.map((I,le)=>({label:I.label,value:I.count,pct:I.pctTop,display:le===0?String(I.count):`${I.count} · ${Ct(I.convFromPrev)}`,color:"var(--grad-gold)"}));return P("Embudo de ventas","De lead a venta — dónde se pierde el avance",px(C,{max:y[0]?y[0].count:1}))}function A(y){const C=["Canal","Leads","Conv.","Oport.","Ganados","Ingresos"],I=y.map(fe=>[`${fe.icon||""} ${fe.label}`.trim(),String(fe.leads),Ct(fe.convRate),String(fe.deals),String(fe.won),bt(fe.revenue)]),le=y.length?null:"Sin leads en el período.";return P("Rendimiento por canal","Atribución de fuente: de dónde vienen y cuánto rinden",F(C,I,le))}function O(y){const C=["Etapa","Prob.","Oport.","Valor","Ponderado"],I=y.map(X=>[X.label,Ct(X.prob),String(X.count),bt(X.value),bt(X.weighted)]),le=y.reduce((X,ye)=>({count:X.count+ye.count,value:X.value+ye.value,weighted:X.weighted+ye.weighted}),{count:0,value:0,weighted:0}),fe=["Total","",String(le.count),bt(le.value),bt(le.weighted)];return P("Forecast por etapa","Pipeline abierto actual (no depende del período)",F(C,I,null,fe))}function k(y){const C=y.reduce((X,ye)=>X+ye.count,0),I=y.map(X=>({label:pl(X.date),value:X.count})),le=y.length?`${pl(y[0].date)} – ${pl(y[y.length-1].date)}`:"",fe=l("div",{class:"reportes__chart"},[mx(I),l("div",{class:"reportes__axis u-caption u-faint"},[l("span",{text:le}),l("span",{text:`${C} leads`})])]);return P("Tendencia de captación","Nuevos leads · últimos 30 días",fe)}function x(y){const C=["Asesor","Leads","Oport.","Ganados","Win rate","Pipeline pond."],I=y.map(fe=>[fe.ownerName,String(fe.leads),String(fe.deals),String(fe.won),Ct(fe.winRate),bt(fe.pipelineWeighted)]),le=y.length?null:"Sin actividad asignada en el período.";return P("Rendimiento del equipo","Por asesor, en el período seleccionado",F(C,I,le))}function M(y){const C=l("select",{class:"select","aria-label":"Mes de liquidación",style:{maxWidth:"220px"}},e.map(z=>{const q=l("option",{value:z.key},[z.label]);return z.key===t.month&&(q.selected=!0),q}));C.addEventListener("change",()=>{t.month=C.value,g()});const I=["Asesor","Vendidos","✓ Liquidables","Base liquidable","⏳ Pendientes","Base pendiente"],le=y.map(z=>[z.ownerName,String(z.vendidos),String(z.liquidables),bt(z.baseLiquidable),String(z.pendientes),bt(z.basePendiente)]),fe=y.reduce((z,q)=>({v:z.v+q.vendidos,l:z.l+q.liquidables,bl:z.bl+q.baseLiquidable,p:z.p+q.pendientes,bp:z.bp+q.basePendiente}),{v:0,l:0,bl:0,p:0,bp:0}),X=y.length?["Total",String(fe.v),String(fe.l),bt(fe.bl),String(fe.p),bt(fe.bp)]:null,ye=y.length?null:"Sin ventas ganadas en el mes seleccionado.",Be=y.flatMap(z=>z.deals.map(q=>[q.name||q.id,z.ownerName,bt(q.base),q.tipoPago||"—",q.liquidable?"✓ liquidable":"⏳ checklist pendiente"])),N=l("div",{},[l("div",{class:"u-row",style:{marginBottom:"10px"}},[C]),F(I,le,ye,X),Be.length?l("details",{style:{marginTop:"10px"}},[l("summary",{class:"u-caption u-muted",text:"Detalle por negocio ("+Be.length+")"}),F(["Negocio","Asesor","Base","Pago","Estado"],Be,null)]):null]);return P("Comisiones del mes",'"Si no está en el CRM, no entra a liquidación" — solo vendidos con checklist post-venta completo (F42)',N)}function P(y,C,I){return l("div",{class:"reportes__section"},[l("div",{class:"reportes__sec-head"},[l("h2",{class:"reportes__sec-title",text:y}),C?l("span",{class:"reportes__sec-cap u-caption u-faint",text:C}):null]),I])}function F(y,C,I,le){if(!C.length&&I)return l("div",{class:"reportes__empty u-caption u-faint",text:I});const fe=l("thead",{},[l("tr",{},y.map((Be,N)=>l("th",{class:N===0?"":"is-num",scope:"col",text:Be})))]),X=l("tbody",{},C.map(Be=>l("tr",{},Be.map((N,z)=>l("td",{class:z===0?"":"is-num",text:N}))))),ye=[fe,X];return le&&ye.push(l("tfoot",{},[l("tr",{},le.map((Be,N)=>N===0?l("th",{scope:"row",text:Be}):l("td",{class:"is-num",text:Be})))])),l("div",{class:"reportes__tablewrap"},[l("table",{class:"reportes__table"},ye)])}function T(y,C,I){me(u),u.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:y}),l("div",{class:"state__title",text:C}),l("div",{class:"state__msg",text:I})]))}function v(){me(u);const y=l("div",{class:"reportes__kpis"},[1,2,3,4].map(()=>l("div",{class:"reportes__kpi"},[l("span",{class:"skeleton",style:{width:"100%",height:"46px"}})])));u.append(l("div",{class:"reportes__section"},[y])),u.append(l("div",{class:"reportes__section"},[l("span",{class:"skeleton",style:{width:"100%",height:"160px"}})]))}function w(){if(t.loading||t.error){G("Aún no hay datos para exportar","info");return}const y=p(),C=(tm.find(X=>X.value===t.days)||{}).label||"",I=[],le=X=>{I.push([]),I.push([X])};I.push(["Reporte Altorra CRM"]),I.push(["Período",C]),I.push(["Generado",new Date().toLocaleString("es-CO")]),le("KPIs del período"),I.push(["Métrica","Valor"]),I.push(["Leads nuevos",y.pk.leadsNew]),I.push(["Conversión",Ct(y.pk.convRate)]),I.push(["Win rate",Ct(y.pk.winRate)]),I.push(["Ganadas",y.pk.won]),I.push(["Perdidas",y.pk.lost]),I.push(["Valor ganado (COP)",y.pk.wonValue]),I.push(["Leads activos (ahora)",y.ck.leadsActive]),I.push(["Oportunidades abiertas (ahora)",y.ck.dealsOpen]),I.push(["Pipeline ponderado COP (ahora)",y.ck.pipelineWeighted]),I.push(["SLA en riesgo (ahora)",y.ck.slaRisk]),le("Embudo"),I.push(["Etapa","Cantidad","Conversión desde anterior"]),y.fn.forEach((X,ye)=>I.push([X.label,X.count,ye===0?"":Ct(X.convFromPrev)])),le("Rendimiento por canal"),I.push(["Canal","Leads","Conversión","Oportunidades","Ganados","Ingresos (COP)"]),y.src.forEach(X=>I.push([X.label,X.leads,Ct(X.convRate),X.deals,X.won,X.revenue])),le("Forecast por etapa (pipeline actual)"),I.push(["Etapa","Probabilidad","Oportunidades","Valor (COP)","Ponderado (COP)"]),y.stg.forEach(X=>I.push([X.label,Ct(X.prob),X.count,X.value,X.weighted])),le("Rendimiento del equipo"),I.push(["Asesor","Leads","Oportunidades","Ganados","Win rate","Pipeline ponderado (COP)"]),y.own.forEach(X=>I.push([X.ownerName,X.leads,X.deals,X.won,Ct(X.winRate),X.pipelineWeighted]));const fe=(e.find(X=>X.key===t.month)||{}).label||t.month;le("Comisiones del mes — "+fe+" (F42: solo checklist completo entra a liquidación)"),I.push(["Asesor","Vendidos","Liquidables","Base liquidable (COP)","Pendientes","Base pendiente (COP)"]),y.com.forEach(X=>I.push([X.ownerName,X.vendidos,X.liquidables,X.baseLiquidable,X.pendientes,X.basePendiente])),I.push([]),I.push(["Negocio","Asesor","Base (COP)","Pago","Estado"]),y.com.forEach(X=>X.deals.forEach(ye=>I.push([ye.name||ye.id,X.ownerName,ye.base,ye.tipoPago||"",ye.liquidable?"liquidable":"checklist pendiente"]))),yx(`altorra-reportes-${ji(new Date)}.csv`,vx(I)),G("Reporte exportado","ok")}async function R(){t.loading=!0,t.error=null,g();try{const y=await hx();if(!r)return;t.leads=y.leads,t.deals=y.deals,t.wons=y.wons||[],t.capped=!!y.capped,t.loading=!1}catch(y){if(!r)return;t.loading=!1,t.error=y&&y.code==="permission-denied"?"Sin permiso para ver los reportes.":"Revisa tu conexión e intenta de nuevo."}g()}return R(),function(){r=!1}}function _x(n){let e=n==null?"":String(n);return/^[=+\-@\t\r]/.test(e)&&!/^-?\d+([.,]\d+)?$/.test(e)&&(e="'"+e),/[",\n\r;]/.test(e)?'"'+e.replace(/"/g,'""')+'"':e}function vx(n){return"\uFEFF"+n.map(e=>e.map(_x).join(",")).join(`\r
`)}function yx(n,e){const t=new Blob([e],{type:"text/csv;charset=utf-8;"}),r=URL.createObjectURL(t),s=document.createElement("a");s.href=r,s.download=n,document.body.append(s),s.click(),s.remove(),setTimeout(()=>URL.revokeObjectURL(r),1e3)}function ky(n,e){const t=String(n||"").trim();if(!t)return"";const r=t.replace(/[^\d+]/g,"").startsWith("+");let s=t.replace(/\D/g,"");if(!s)return"";const i=String(e||"").replace(/\D/g,"");return i&&!r&&!s.startsWith(i)?s=i+s:!i&&!r&&s.length===10&&s.startsWith("3")&&(s="57"+s),"+"+s}function rm(n){return String(n||"").replace(/[^a-z0-9]/gi,"_").slice(0,480)}function bx({email:n,phone:e,prefijoPais:t}){const r=[],s=String(n||"").trim().toLowerCase();s&&r.push(rm("email:"+s));const i=ky(e,t);return i&&r.push(rm("phone:"+i)),r}const qa=n=>({id:n.id,...n.data()});async function wx({pageSize:n=500}={}){if(H.get().mock)return{contacts:nP(),leads:Ba()};const[e,t]=await Promise.all([un(ot(Ae(se,"contacts"),vt("createdAt","desc"),kt(n))).then(r=>r.docs.map(qa)),un(ot(Ae(se,"leads"),vt("createdAt","desc"),kt(n))).then(r=>r.docs.map(qa))]);return{contacts:e.filter(r=>!r._mergedInto&&!r._suppressed),leads:t}}async function ja(n){if(!n)return null;const e=await Or(Re(se,"contacts",n));return e.exists()?{id:e.id,...e.data()}:null}function Ix(n,e,t){const r=ot(Ae(se,"activities"),Un("relatedTo.id","==",n),vt("createdAt","desc"),kt(50));return Yt(r,s=>e(s.docs.map(qa)),s=>t&&t(s))}function Ex(n,e,t){const r=ot(Ae(se,"contacts",n,"crmNotes"),vt("createdAt","desc"),kt(50));return Yt(r,s=>e(s.docs.map(qa)),s=>t&&t(s))}async function Tx({email:n,phone:e},t){for(const r of bx({email:n,phone:e})){const s=await Or(Re(se,"dedup",r));if(s.exists()&&s.data().contactId!==t)return{key:r,contactId:s.data().contactId}}return null}async function Ax(n,e,t){const r=Re(se,"contacts",n),s=async i=>{const o={...e,updatedAt:new Date().toISOString(),_version:i+1};return e.phone!==void 0&&(o.phone=ky(e.phone,"+57")||null),at(r,o)};try{return await s(t._version||0),{ok:!0}}catch(i){if(!i||i.code!=="permission-denied")throw i;const o=await ja(n);if(!o)throw i;if(Object.keys(e).some(u=>String(o[u]??"")!==String(t[u]??""))){const u=new Error("conflict");throw u.code="conflict",u.fresh=o,u}return await s(o._version||0),{ok:!0,retried:!0}}}async function Rx(n,e){return(await Lr(Mr,"crmMergeContacts")({survivorId:n,mergedId:e})).data}async function Sx(n){return(await Lr(Mr,"crmSuppressContact")({contactId:n})).data}async function kx(n){return(await Lr(Mr,"crmCancelSuppression")({contactId:n})).data}async function Cx(n,e){const t=H.get().user;await Ft(Ae(se,"contacts",n,"crmNotes"),{body:String(e||"").trim(),authorId:t?t.uid:null,authorName:H.get().profile&&H.get().profile.nombre||t&&t.email||"Asesor",createdAt:new Date().toISOString()})}const Px=[{id:"todos",label:"Todos"},{id:"lead",label:"Leads"},{id:"cliente",label:"Clientes"},{id:"suscriptor",label:"Suscriptores"}],xx={lead:{label:"Lead",badge:"gold"},cliente:{label:"Cliente",badge:"ok"},suscriptor:{label:"Suscriptor",badge:"info"}};function sm(n){const e=String(n.lifecycleStage||n.type||"").toLowerCase();return e==="subscriber"||e==="suscriptor"?"suscriptor":e==="customer"||e==="cliente"?"cliente":"lead"}function Nx(n){const e={contacts:[],leads:[],loading:!0,error:null,q:"",filter:"todos"};let t=!0;const r=l("input",{type:"search",placeholder:"Buscar por nombre, correo o teléfono…","aria-label":"Buscar contactos"});r.addEventListener("input",()=>{e.q=r.value,E()});const s=l("div",{class:"search"},[l("span",{"aria-hidden":"true",text:"🔎"}),r]),i={},o=l("div",{class:"contactos__chips",role:"group","aria-label":"Filtrar por tipo"});Px.forEach(k=>{const x=l("button",{class:"chip",type:"button","aria-pressed":k.id===e.filter?"true":"false"},[k.label]);x.addEventListener("click",()=>{e.filter=k.id,Object.entries(i).forEach(([M,P])=>P.setAttribute("aria-pressed",M===k.id?"true":"false")),E()}),i[k.id]=x,o.append(x)});const c=l("span",{class:"contactos__count u-caption u-faint"}),u=l("button",{class:"btn btn--soft btn--sm",type:"button"},["↻ Actualizar"]);u.addEventListener("click",O);const d=l("div",{class:"contactos__toolbar"},[s,o,l("div",{class:"u-row u-row--tight"},[c,u])]),f=l("div",{class:"contactos__list"}),p=l("section",{class:"contactos"},[d,f]);me(n),n.append(p);function g(){const k={};for(const x of e.leads){if(!x.contactId)continue;const M=k[x.contactId];(!M||new Date(x.createdAt)>new Date(M.createdAt))&&(k[x.contactId]=x)}return k}function b(k){H.set({leads:e.leads,detailLeadId:k.id})}function E(){if(e.loading)return A("⏳","Cargando contactos…","");if(e.error)return A("⚠️","No se pudieron cargar los contactos",e.error);if(!e.contacts.length)return A("👥","Aún no hay contactos","Cuando entren leads, registros de cuenta o suscripciones, las personas aparecerán aquí.");const k=g(),x=Ua(e.q),M=e.contacts.filter(P=>e.filter!=="todos"&&sm(P)!==e.filter?!1:x?Ua(`${P.fullName||""} ${P.email||""} ${P.phone||""}`).includes(x):!0);if(c.textContent=`${M.length} de ${e.contacts.length}`,me(f),!M.length){f.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"🔍"}),l("div",{class:"state__title",text:"Sin resultados"}),l("div",{class:"state__msg",text:"Prueba con otro término o filtro."})]));return}M.forEach(P=>f.append(S(P,k[P.id])))}function S(k,x){const M=sm(k),P=xx[M],F=$i(k),T=Number(k.score)>0&&cs[k.rating],v=l("div",{class:"contact-row__badges"},[l("span",{class:`badge badge--${P.badge}`,text:P.label}),l("span",{class:"badge",text:`${F.icon} ${F.label}`}),T?l("span",{class:`temp ${cs[k.rating].cls}`,text:`${cs[k.rating].icon} ${k.score}`}):null]),w=[k.email,k.phone].filter(Boolean).join(" · ")||"Sin datos de contacto",R=Array.isArray(k.tags)&&k.tags.length?l("span",{class:"contact-row__tags u-caption u-faint u-truncate",text:"🏷️ "+k.tags.join(", ")}):null,y=[l("span",{class:"avatar avatar--sm","aria-hidden":"true",text:Rs(k.fullName)}),l("div",{class:"contact-row__main"},[l("span",{class:"contact-row__name u-truncate",text:k.fullName||"Sin nombre"}),l("span",{class:"contact-row__sub u-caption u-faint u-truncate",title:w,text:w}),R]),v,l("span",{class:"contact-row__time u-caption u-faint",text:gr(k.lastActivityAt)})];if(x){const C=l("button",{class:"contact-row",type:"button","aria-label":`Ver ficha de ${k.fullName||"contacto"}`},y);return C.addEventListener("click",()=>b(x)),C}return l("div",{class:"contact-row contact-row--nolead"},y)}function A(k,x,M){c.textContent="",me(f),f.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:k}),l("div",{class:"state__title",text:x}),M?l("div",{class:"state__msg",text:M}):null]))}async function O(){e.loading=!0,e.error=null,E();try{const k=await wx();if(!t)return;e.contacts=k.contacts,e.leads=k.leads,e.loading=!1}catch(k){if(!t)return;e.loading=!1,e.error=k&&k.code==="permission-denied"?"Sin permiso para ver los contactos.":"Revisa tu conexión e intenta de nuevo."}E()}return O(),function(){t=!1}}function Dx(n,e,t){const r=l("div",{class:"modal"},[l("div",{class:"modal__head"},[l("h2",{class:"modal__title",text:n}),e?l("span",{class:"u-caption u-faint",text:e}):null]),...t]),s=l("div",{class:"modal-overlay"},[r]);document.body.appendChild(s);const i=()=>{s.remove(),window.removeEventListener("keydown",o)},o=c=>{c.key==="Escape"&&i()};return window.addEventListener("keydown",o),s.addEventListener("mousedown",c=>{c.target===s&&i()}),{close:i}}function Vx(n,{onChanged:e}={}){if(!n){G("El contacto aún no carga.","error");return}if(H.get().mock){G("En demo no se edita el directorio.","info");return}if(n._mergedInto){G("Este contacto está fusionado en otro.","info");return}const t=l("div",{class:"nl-form"}),r=l("div",{class:"login__error",role:"alert",hidden:!0}),s=S=>{r.textContent=S,r.hidden=!1},{close:i}=Dx("✏️ Editar contacto",n.fullName||"",[t]),o=n.suppressionStatus==="pendiente_supresion",c=l("input",{class:"input",type:"text",value:n.fullName||"",maxlength:"80"}),u=l("input",{class:"input",type:"email",value:n.email||"",placeholder:"correo@ejemplo.com"}),d=l("input",{class:"input",type:"tel",value:n.phone||"",placeholder:"+57 300 000 0000"}),f=l("button",{class:"btn btn--gold btn--sm",type:"button",text:"Guardar cambios"}),p=l("button",{class:"btn btn--ghost btn--sm",type:"button",text:"Cancelar"});p.addEventListener("click",i);async function g(S){r.hidden=!0;const A={};if(c.value.trim()!==(n.fullName||"")&&(A.fullName=c.value.trim()),u.value.trim().toLowerCase()!==(n.email||"")&&(A.email=u.value.trim().toLowerCase()||null),d.value.trim()!==(n.phone||"")&&(A.phone=d.value.trim()||null),!Object.keys(A).length){i();return}f.disabled=!0,f.textContent="Guardando…";try{if(A.email!==void 0||A.phone!==void 0){const O=await Tx({email:A.email!==void 0?A.email:n.email,phone:A.phone!==void 0?A.phone:n.phone},n.id);if(O)return f.disabled=!1,f.textContent="Guardar cambios",b(O)}await Ax(n.id,A,S||n),G("✓ Contacto actualizado","ok"),i(),e&&e()}catch(O){if(f.disabled=!1,f.textContent="Guardar cambios",O&&O.code==="conflict"&&O.fresh){s("Alguien actualizó este contacto mientras editabas. Valores actuales: "+(O.fresh.fullName||"—")+" · "+(O.fresh.email||"sin email")+" · "+(O.fresh.phone||"sin tel")+'. Pulsa "Guardar" de nuevo para PISAR con lo tuyo, o Cancelar para conservar lo del server.'),f.disabled=!1,f.onclick=()=>g(O.fresh);return}s(O&&O.message||"No se pudo guardar.")}}f.addEventListener("click",()=>g(null));async function b(S){const A=await ja(S.contactId).catch(()=>null),O=A&&A.fullName||S.contactId;if(!Ye("*")){s("Ese email/teléfono YA pertenece a otro contacto ("+O+"). Pídele al Super Admin fusionarlos — no se crean duplicados.");return}t.replaceChildren(l("p",{},["Ese dato ya pertenece a ",l("strong",{text:O}),". Son la misma persona → fusiónalos. Elige quién SOBREVIVE (el otro queda como histórico apuntando aquí):"]),r);const k=(x,M,P)=>{const F=l("button",{class:"btn btn--soft btn--sm",type:"button",text:x});return F.addEventListener("click",async()=>{if(confirm("¿Fusionar definitivamente? Re-apunta leads, negocios y notas. No se puede deshacer.")){F.disabled=!0;try{const T=await Rx(M,P);G(`🔗 Fusionados: ${T.counts?T.counts.leads:0} lead(s), ${T.counts?T.counts.deals:0} negocio(s)`,"ok"),i(),e&&e()}catch(T){F.disabled=!1,s(T&&T.message||"No se pudo fusionar.")}}}),F};t.append(l("div",{class:"cita-actions"},[k("Sobrevive ESTE ("+(n.fullName||"actual")+")",n.id,S.contactId),k("Sobrevive el OTRO ("+O+")",S.contactId,n.id),l("button",{class:"btn btn--ghost btn--sm",type:"button",text:"Cancelar",onclick:i})]))}function E(){if(!Ye("crm.delete"))return null;const S=l("div",{class:"cfg-card",style:{borderColor:"var(--danger, #e5484d)"}});if(S.append(l("h3",{class:"cfg-card__title",text:"🛡 Privacidad (Ley 1581)"})),o){S.append(l("p",{class:"u-caption",text:"⏳ Supresión programada: se ejecuta el "+String(n.suppressionExecuteAfter||"").slice(0,16).replace("T"," ")+". Hasta entonces es reversible."}));const A=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"↩️ Cancelar supresión"});A.addEventListener("click",async()=>{A.disabled=!0;try{const O=await kx(n.id);G(O.duplicates&&O.duplicates.length?"↩️ Supresión cancelada — OJO: nació un duplicado durante la espera, fusiónalos.":"↩️ Supresión cancelada","ok"),i(),e&&e()}catch(O){A.disabled=!1,s(O&&O.message||"No se pudo cancelar.")}}),S.append(A)}else{S.append(l("p",{class:"u-caption u-muted",text:"Derecho de supresión: borra los datos personales (nombre, contacto, notas) de forma DEFINITIVA tras 72h de gracia. El historial comercial (montos, fechas, carro) se conserva anónimo. Las copias ya enviadas por Telegram/email quedan fuera del alcance técnico."}));const A=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"🗑 Solicitar supresión definitiva…"});A.addEventListener("click",async()=>{const O=prompt("DOBLE CONFIRMACIÓN: escribe SUPRIMIR para programar el borrado de datos personales de "+(n.fullName||"este contacto")+" (72h de gracia, reversible hasta entonces).");if(O!=="SUPRIMIR"){O!==null&&G("Texto incorrecto — no se hizo nada.","info");return}A.disabled=!0;try{const k=await Sx(n.id);G("🛡 Supresión programada para "+String(k.executeAfter||"").slice(0,16).replace("T"," "),"ok"),i(),e&&e()}catch(k){A.disabled=!1,s(k&&k.message||"No se pudo programar.")}}),S.append(A)}return S}o?t.append(l("p",{class:"cita-conflict",text:"⏳ Este contacto tiene una supresión Ley 1581 programada — no se puede editar (cancélala primero si fue un error)."}),r,E(),l("div",{class:"nl-actions"},[p])):t.append(l("label",{class:"field"},[l("span",{class:"field__label",text:"Nombre"}),c]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Email"}),u]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Teléfono"}),d]),r,l("div",{class:"nl-actions"},[p,f]),E())}const Ox={solicitud_inbound:"📥",whatsapp:"💬",status_change:"🔁",nota:"🗒️",email:"✉️",llamada:"📞"};function Lx(n){let e=null,t=null,r=null,s="resumen",i={lead:null,contact:null,activities:[],notes:[]};const o=l("aside",{class:"detail",role:"dialog","aria-modal":"true","aria-label":"Ficha del cliente"}),c=l("div",{class:"detail-overlay",hidden:!0},[o]);n.append(c),c.addEventListener("mousedown",P=>{P.target===c&&u()}),window.addEventListener("keydown",P=>{P.key==="Escape"&&e&&u()}),H.subscribe(P=>{P.detailLeadId!==e&&f(P.detailLeadId)});function u(){H.set({detailLeadId:null})}function d(){t&&(t(),t=null),r&&(r(),r=null)}function f(P){if(d(),e=P,!P){c.hidden=!0,document.body.classList.remove("has-detail"),me(o);return}s="resumen",c.hidden=!1,document.body.classList.add("has-detail"),p(P)}function p(P){const F=(H.get().leads||[]).find(T=>T.id===P);if(i={lead:F||null,contact:null,activities:[],notes:[],loadError:null},g(),!!F)if(H.get().mock)i.contact=tP(F.contactId),i.activities=eP(P),i.notes=Wp(F.contactId),g();else{const T=v=>{i.loadError=v&&v.code==="permission-denied"?"Sin permiso de CRM (crm.read) para ver la ficha completa.":"No se pudo cargar parte de la ficha — revisa tu conexión.",g()};ja(F.contactId).then(v=>{i.contact=v,g()}).catch(T),t=Ix(P,v=>{i.activities=v,g()},T),F.contactId&&(r=Ex(F.contactId,v=>{i.notes=v,g()},T))}}function g(){me(o);const P=i.lead;if(!P){o.append(b(null)),o.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"🔍"}),l("div",{class:"state__title",text:"Lead no disponible"}),l("div",{class:"state__msg",text:"Recarga la Bandeja e inténtalo otra vez."})]));return}o.append(b(P)),o.append(E());const F=l("div",{class:"detail__body"});i.loadError&&F.append(l("div",{class:"u-caption",role:"alert",style:{padding:"8px 12px",borderRadius:"8px",margin:"0 0 10px",background:"rgba(229,115,26,0.12)",border:"1px solid rgba(229,115,26,0.45)"},text:"⚠️ "+i.loadError})),s==="resumen"?F.append(S(P)):s==="comms"?F.append(O()):s==="score"?F.append(k(P)):s==="notas"&&F.append(x(P)),o.append(F)}function b(P){const F=l("button",{class:"icon-btn",type:"button","aria-label":"Cerrar"},["✕"]);if(F.addEventListener("click",u),!P)return l("div",{class:"detail__header"},[l("div",{class:"u-grow"}),F]);const T=M(P),v=cs[T.rating],w=sa(P.status),R=Rc(P),y=$i(P),C=l("button",{class:"btn btn--wa btn--sm",type:"button"},["💬 WhatsApp"]);C.addEventListener("click",()=>{const ye=ey(P.phone,`Hola ${String(P.fullName||"").split(" ")[0]||""}, te saluda Altorra Cars 👋`);if(!ye)return G("Sin teléfono","error");window.open(ye,"_blank","noopener")});const I=Ye("crm.edit"),le=I&&P.status!=="convertido"?l("button",{class:"btn btn--soft btn--sm",type:"button"},["🎯 Convertir"]):null;le&&le.addEventListener("click",()=>gy(P,{}));const fe=I?l("button",{class:"icon-btn",type:"button","aria-label":"Agendar cita",title:"Agendar cita"},["📅"]):null;fe&&fe.addEventListener("click",()=>XP(P,{}));const X=I?l("button",{class:"icon-btn",type:"button","aria-label":"Editar contacto",title:"Editar contacto"},["✏️"]):null;return X&&X.addEventListener("click",()=>Vx(i.contact,{onChanged:()=>{P.contactId&&ja(P.contactId).then(ye=>{i.contact=ye,g()}).catch(()=>G("No se pudo recargar el contacto","error"))}})),l("div",{class:"detail__header"},[l("div",{class:"u-row u-grow",style:{minWidth:"0"}},[l("span",{class:"avatar","aria-hidden":"true",text:Rs(P.fullName)}),l("div",{class:"u-grow",style:{minWidth:"0"}},[l("h2",{class:"detail__name u-truncate",text:P.fullName}),l("div",{class:"u-row u-row--tight",style:{flexWrap:"wrap"}},[l("span",{class:`temp ${v.cls}`,text:`${v.icon} ${v.label} · ${T.score}`}),l("span",{class:`badge badge--${w.badge||""}`.trim(),text:w.label}),l("span",{class:"badge",text:`${R.icon} ${R.label}`}),l("span",{class:"badge",text:`${y.icon} ${y.label}`})])])]),l("div",{class:"u-row u-row--tight"},[le,fe,X,C,F])])}function E(){const P=[["resumen","Resumen"],["comms","Comunicaciones"],["score","Score"],["notas","Notas"]],F=l("div",{class:"detail__tabs",role:"tablist"});return P.forEach(([T,v])=>{const w=l("button",{class:"detail__tab"+(s===T?" is-active":""),role:"tab","aria-selected":String(s===T),type:"button"},[v]);w.addEventListener("click",()=>{s=T,g()}),F.append(w)}),F}function S(P){const F=i.contact,T=F&&F.consent?F.consent:null,v=[["Correo",P.email||"—"],["Teléfono",P.phone||"—"],["Interés",P.sourceDetail||"—"],["Vehículo",P.vehicleOfInterestId||"—"],["Asesor",P.ownerName||"Sin asignar"],["Origen",P.source||"—"],["Capturado",fC(P.createdAt)],["Última actividad",gr(P.lastActivityAt)]],w=iy(P,{score:M(P).score});return l("div",{class:"u-stack"},[l("div",{class:"detail-card detail-card--nba"},[l("span",{class:"detail-card__icon","aria-hidden":"true",text:w.icon}),l("div",{class:"u-grow"},[l("div",{class:"u-caption u-muted",text:"Próxima mejor acción"}),l("strong",{text:w.label}),l("div",{class:"u-caption u-faint",text:w.reason})])]),l("dl",{class:"kv"},v.flatMap(([R,y])=>[l("dt",{text:R}),l("dd",{class:"u-truncate",text:y})])),T?A(T):null])}function A(P){const F=T=>T?"✅":"⛔";return l("div",{class:"detail-card"},[l("div",{class:"u-caption u-muted",text:"Consentimiento (Ley 1581)"}),l("div",{class:"u-row",style:{flexWrap:"wrap",gap:"12px"}},[l("span",{class:"u-caption",text:`${F(P.email)} Email`}),l("span",{class:"u-caption",text:`${F(P.whatsapp)} WhatsApp`}),l("span",{class:"u-caption",text:`${F(P.calls)} Llamadas`})]),l("div",{class:"u-caption u-faint",text:`Política ${P.policyVersion||"v1"} · origen ${P.source||"—"}`})])}function O(){if(!i.activities.length)return l("div",{class:"state"},[l("div",{class:"state__icon",text:"📭"}),l("div",{class:"state__title",text:"Sin comunicaciones"}),l("div",{class:"state__msg",text:"Aún no hay actividades registradas para este lead."})]);const P=l("ol",{class:"timeline"});return i.activities.forEach(F=>{P.append(l("li",{class:"timeline__item timeline__item--"+(F.direction||"inbound")},[l("span",{class:"timeline__icon","aria-hidden":"true",text:Ox[F.type]||"•"}),l("div",{class:"u-grow"},[l("div",{class:"u-spread"},[l("strong",{class:"u-truncate",text:F.subject||F.type||"Actividad"}),l("span",{class:"u-caption u-faint",text:gr(F.createdAt)})]),F.body?l("div",{class:"u-caption u-muted",text:F.body}):null])]))}),P}function k(P){const F=M(P),T=cs[F.rating],v=Object.keys(Hp).map(w=>{const R=Math.round((F.factors[w]||0)*100);return l("div",{class:"factor"},[l("div",{class:"u-spread u-caption"},[l("span",{text:Hp[w]}),l("span",{class:"u-faint",text:`${R}% · peso ${Math.round(VC[w]*100)}%`})]),l("div",{class:"factor__track"},[l("div",{class:"factor__fill",style:{width:R+"%"}})])])});return l("div",{class:"u-stack"},[l("div",{class:"scorehero"},[l("div",{class:`scorehero__num ${T.cls}`,text:String(F.score)}),l("div",{class:"u-stack",style:{gap:"2px"}},[l("strong",{text:`${T.icon} ${T.label}`}),l("span",{class:"u-caption u-faint",text:"Heurística determinista (7 factores, sin IA)"})])]),l("div",{class:"u-stack",style:{gap:"10px"}},v)])}function x(P){const F=Ye("crm.edit")||Ye("crm.create"),T=l("textarea",{class:"textarea",placeholder:"Escribe una nota interna…",rows:"3"}),v=l("button",{class:"btn btn--gold btn--sm",type:"button"},["Agregar nota"]);v.addEventListener("click",async()=>{const R=T.value.trim();if(!R)return;v.disabled=!0;const y={body:R,authorName:"Tú",createdAt:new Date().toISOString()};try{H.get().mock?(rP(P.contactId,y),i.notes=Wp(P.contactId),g()):(await Cx(P.contactId,R),T.value=""),G("Nota agregada","ok")}catch{G("No se pudo guardar la nota","error")}finally{v.disabled=!1}});const w=l("div",{class:"u-stack"});return i.notes.length||w.append(l("div",{class:"u-caption u-faint",style:{padding:"8px 0"},text:"Aún no hay notas."})),i.notes.forEach(R=>w.append(l("div",{class:"detail-card"},[l("div",{class:"u-caption u-muted",text:R.body}),l("div",{class:"u-caption u-faint",text:`${R.authorName||"Asesor"} · ${gr(R.createdAt)}`})]))),l("div",{class:"u-stack"},[F?l("div",{class:"u-stack",style:{gap:"8px"}},[T,l("div",{class:"u-row",style:{justifyContent:"flex-end"}},[v])]):null,w])}function M(P){return sy(P,i.activities||[],i.contact)}}const Cy={days:[1,2,3,4,5,6],startHour:9,endHour:17,interval:60,maxPerSlot:1,bufferMin:15,blockedDates:[],blockedDateLabels:{},blockedHours:{}},Mx=[["2026-01-01","Año Nuevo"],["2026-01-12","Reyes Magos"],["2026-03-23","San José"],["2026-04-02","Jueves Santo"],["2026-04-03","Viernes Santo"],["2026-05-01","Día del Trabajo"],["2026-05-18","Ascensión"],["2026-06-08","Corpus Christi"],["2026-06-15","Sagrado Corazón"],["2026-06-29","San Pedro y San Pablo"],["2026-07-20","Independencia"],["2026-08-07","Batalla de Boyacá"],["2026-08-17","Asunción de la Virgen"],["2026-10-12","Día de la Raza"],["2026-11-02","Todos los Santos"],["2026-11-16","Independencia de Cartagena"],["2026-12-08","Inmaculada Concepción"],["2026-12-25","Navidad"]],Py=()=>Re(se,"config","availability"),xy=()=>Re(se,"crm_config","advisorOverrides");function Fx(n,e){return Yt(Py(),t=>{n({...Cy,...t.exists()?t.data():{}})},t=>e&&e(t))}async function Ux(n,e){await mv(Py(),{...n,updatedAt:new Date().toISOString(),updatedBy:e||null},{merge:!0})}function Bx(n,e){return Yt(xy(),t=>{n(t.exists()&&t.data().overrides||{})},t=>e&&e(t))}async function $x(n,e){await mv(xy(),{overrides:n,updatedAt:new Date().toISOString(),updatedBy:e||null})}const qx=["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"],$o=()=>{const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`};function jx(n){const e={av:{...Cy},overrides:{},advisors:[],sub:null,subOv:null,loaded:!1},t=Ye("calendar.config"),r=l("section",{class:"cfg"});if(me(n),n.append(r),!t){r.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"🔒"}),l("div",{class:"state__title",text:"Sin permiso"}),l("div",{class:"state__msg",text:"Solo quien administra la disponibilidad (permiso calendar.config) puede editar esto."})]));return}async function s(g,b){if(H.get().mock){Object.assign(e.av,g),p(),G(b+" (demo)","ok");return}try{await Ux(g,H.get().user&&H.get().user.uid),G(b,"ok")}catch(E){G("No se pudo guardar: "+(E.message||E.code),"error")}}function i(){const g=e.av,b=qx.map((P,F)=>{const T=l("input",{type:"checkbox"});return T.checked=(g.days||[]).includes(F),T.dataset.dow=String(F),l("label",{class:"cfg-day"},[T,l("span",{text:P})])}),E=(P,F,T)=>{const v=l("select",{class:"select"});for(let w=F;w<=T;w++)v.append(l("option",{value:String(w),text:String(w).padStart(2,"0")+":00"}));return v.value=String(P),v},S=E(g.startHour,6,20),A=E(g.endHour,7,21),O=l("select",{class:"select"},[l("option",{value:"30",text:"Cada 30 min"}),l("option",{value:"60",text:"Cada hora"})]);O.value=String(g.interval||60);const k=l("input",{class:"input",type:"number",min:"1",max:"5",value:String(g.maxPerSlot||1)}),x=l("input",{class:"input",type:"number",min:"0",max:"60",step:"5",value:String(g.bufferMin!=null?g.bufferMin:15)}),M=l("button",{class:"btn btn--gold btn--sm",type:"button",text:"Guardar horario"});return M.addEventListener("click",()=>{const P=b.map(v=>v.querySelector("input")).filter(v=>v.checked).map(v=>parseInt(v.dataset.dow,10)).sort(),F=parseInt(S.value,10),T=parseInt(A.value,10);if(!P.length){G("Elige al menos un día.","error");return}if(F>=T){G("La hora de cierre debe ser mayor que la de apertura.","error");return}s({days:P,startHour:F,endHour:T,interval:parseInt(O.value,10)||60,maxPerSlot:Math.max(1,parseInt(k.value,10)||1),bufferMin:Math.max(0,parseInt(x.value,10)||0)},"✓ Horario guardado")}),l("div",{class:"cfg-card"},[l("h3",{class:"cfg-card__title",text:"🕘 Horario de atención"}),l("p",{class:"u-caption u-muted",text:"Esto es lo que el cliente ve en la web al pedir cita — los cambios aplican al instante."}),l("div",{class:"cfg-days"},b),l("div",{class:"cfg-grid"},[l("label",{class:"field"},[l("span",{class:"field__label",text:"Abre"}),S]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Cierra"}),A]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Citas web"}),O]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Citas por horario"}),k]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Colchón (min)"}),x])]),M])}function o(){const g=e.av,b=g.blockedDateLabels||{},E=$o(),S=l("div",{class:"cfg-chips"}),A=(g.blockedDates||[]).slice().sort();A.length||S.append(l("span",{class:"u-caption u-muted",text:"Sin fechas bloqueadas — la web ofrece todos los días laborales."})),A.forEach(P=>{const F=P<E,T=l("button",{class:"cfg-chip__x",type:"button","aria-label":"Quitar",text:"✕"});T.addEventListener("click",()=>{const v=A.filter(w=>w!==P);s({blockedDates:v,blockedDateLabels:{[P]:Pp()}},"✓ Fecha desbloqueada: "+P)}),S.append(l("span",{class:"cfg-chip"+(F?" is-past":"")},[l("span",{text:P+(b[P]?" · "+b[P]:"")}),T]))});const O=l("input",{class:"input",type:"date",min:E}),k=l("input",{class:"input",type:"text",placeholder:"Motivo (opcional)",maxlength:"40"}),x=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"Bloquear fecha"});x.addEventListener("click",()=>{const P=O.value;if(!P){G("Elige una fecha.","error");return}if(A.includes(P)){G("Esa fecha ya está bloqueada.","error");return}const F={...b};k.value.trim()&&(F[P]=k.value.trim()),s({blockedDates:[...A,P].sort(),blockedDateLabels:F},"✓ Fecha bloqueada: "+P)});const M=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"🇨🇴 Cargar festivos de Colombia 2026"});return M.addEventListener("click",()=>{const P=Mx.filter(([T])=>T>=E&&!A.includes(T));if(!P.length){G("Los festivos que faltan de 2026 ya están cargados.","ok");return}const F={...b};P.forEach(([T,v])=>{F[T]=v}),s({blockedDates:[...A,...P.map(([T])=>T)].sort(),blockedDateLabels:F},`✓ ${P.length} festivo(s) bloqueados`)}),l("div",{class:"cfg-card"},[l("h3",{class:"cfg-card__title",text:"📅 Fechas bloqueadas (festivos y cierres)"}),l("p",{class:"u-caption u-muted",text:"En estas fechas la web NO ofrece citas. Las fechas pasadas se limpian solas cada madrugada."}),S,l("div",{class:"cfg-row"},[O,k,x]),M])}function c(){const g=e.av,b=[],E=g.interval||60;for(let S=g.startHour*60;S<g.endHour*60;S+=E)b.push(String(Math.floor(S/60)).padStart(2,"0")+":"+String(S%60).padStart(2,"0"));return b}function u(){const b=e.av.blockedHours||{},E=l("div",{class:"cfg-bh"}),S=Object.entries(b).sort(([x],[M])=>x.localeCompare(M));S.length||E.append(l("span",{class:"u-caption u-muted",text:"Sin horas bloqueadas."})),S.forEach(([x,M])=>{const P=(M||[]).slice().sort().map(F=>{const T=l("button",{class:"cfg-chip__x",type:"button",text:"✕"});return T.addEventListener("click",()=>{const v=(b[x]||[]).filter(w=>w!==F);s({blockedHours:{[x]:v.length?v:Pp()}},`✓ ${x} ${F} desbloqueada`)}),l("span",{class:"cfg-chip"},[l("span",{text:F}),T])});E.append(l("div",{class:"cfg-bh__day"},[l("strong",{text:x}),l("div",{class:"cfg-chips"},P)]))});const A=l("input",{class:"input",type:"date",min:$o()}),O=l("select",{class:"select"},c().map(x=>l("option",{value:x,text:x}))),k=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"Bloquear hora"});return k.addEventListener("click",()=>{const x=A.value,M=O.value;if(!x){G("Elige una fecha.","error");return}const P=b[x]||[];if(P.includes(M)){G("Esa hora ya está bloqueada.","error");return}s({blockedHours:{...b,[x]:[...P,M].sort()}},`✓ ${x} ${M} bloqueada`)}),l("div",{class:"cfg-card"},[l("h3",{class:"cfg-card__title",text:"⏰ Horas bloqueadas (un horario puntual)"}),E,l("div",{class:"cfg-row"},[A,O,k])])}async function d(g,b){if(H.get().mock){e.overrides=g,p(),G(b+" (demo)","ok");return}try{await $x(g,H.get().user&&H.get().user.uid),G(b,"ok")}catch(E){G("No se pudo guardar: "+(E.message||E.code),"error")}}function f(){const g=e.overrides||{},b=l("div",{class:"cfg-advisors"});return e.advisors.length||b.append(l("span",{class:"u-caption u-muted",text:"Cargando asesores…"})),e.advisors.forEach(E=>{const S=g[E.uid],A=l("div",{class:"cfg-advisor"});if(A.append(l("div",{class:"cfg-advisor__name"},[l("strong",{text:E.nombre}),S?l("span",{class:"cfg-advisor__badge is-off",text:`🏖 ${S.reason||"ausente"} · ${S.from} → ${S.to}`}):l("span",{class:"cfg-advisor__badge",text:"✅ disponible"})])),S){const O=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"Quitar ausencia"});O.addEventListener("click",()=>{const k={...g};delete k[E.uid],d(k,`✓ ${E.nombre} disponible de nuevo`)}),A.append(O)}else{const O=l("input",{class:"input",type:"date",min:$o()}),k=l("input",{class:"input",type:"date",min:$o()}),x=l("select",{class:"select"},[l("option",{value:"vacaciones",text:"Vacaciones"}),l("option",{value:"incapacidad",text:"Incapacidad"}),l("option",{value:"otro",text:"Otro"})]),M=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"Marcar ausencia"});M.addEventListener("click",()=>{if(!O.value||!k.value||O.value>k.value){G("Revisa el rango de fechas.","error");return}d({...g,[E.uid]:{name:E.nombre,from:O.value,to:k.value,reason:x.value}},`✓ Ausencia de ${E.nombre} registrada`)}),A.append(l("div",{class:"cfg-row"},[O,k,x,M]))}b.append(A)}),l("div",{class:"cfg-card"},[l("h3",{class:"cfg-card__title",text:"👤 Excepciones por asesor"}),l("p",{class:"u-caption u-muted",text:"Un asesor ausente no recibe leads de la rotación ni citas confirmadas a su nombre en esas fechas."}),b])}function p(){me(r),r.append(l("div",{class:"cfg-cols"},[i(),o()]),l("div",{class:"cfg-cols"},[u(),f()]))}return H.get().mock?(e.loaded=!0,p()):(e.sub=Fx(g=>{e.av=g,e.loaded=!0,p()},()=>{G("No se pudo cargar la configuración.","error")}),e.subOv=Bx(g=>{e.overrides=g,e.loaded&&p()},()=>{})),wy().then(g=>{e.advisors=g,e.loaded&&p()}),function(){e.sub&&e.sub(),e.sub=null,e.subOv&&e.subOv(),e.subOv=null}}function Cs(n,e,t){try{if(H.get().mock)return;const r=H.get().user;Ft(Ae(se,"auditLog"),{action:n,target:e||"",details:t||"",user:r&&r.email||"unknown",timestamp:new Date().toISOString()}).catch(()=>{})}catch{}}const im={google_maps:"Google Maps",sitio_web:"Sitio Web",usuario_registrado:"Usuario Registrado"};function aa(n){return(n||"NN").split(" ").map(e=>e.charAt(0)).join("").substring(0,2).toUpperCase()}function zx(n,e){const t=ot(Ae(se,"resenas"),vt("createdAt","desc"));return Yt(t,r=>{n(r.docs.map(s=>({...s.data(),_docId:s.id})))},r=>e&&e(r))}async function Gx(n,e){const t=new Date().toISOString(),r={name:e.name,location:e.location||"Cartagena",rating:e.rating,vehicle:e.vehicle||"",text:e.text,source:e.source||"sitio_web",verified:!!e.verified,featured:!!e.featured,avatar:aa(e.name),updatedAt:t};n?(await at(Re(se,"resenas",n),r),Cs("review_update","resena "+r.name,r.name)):(r.createdAt=t,await Ft(Ae(se,"resenas"),r),Cs("review_create","resena "+r.name,r.name))}async function Hx(n,e){await gv(Re(se,"resenas",n)),Cs("review_delete","resena "+(e||n),"")}const Kx=[{_docId:"m1",name:"Carlos Pérez",location:"Cartagena",rating:5,vehicle:"Mazda CX-30 2023",text:"Excelente atención, el carro quedó impecable y el papeleo fue rapidísimo.",source:"google_maps",verified:!0,featured:!0,avatar:"CP",createdAt:"2026-06-01T10:00:00.000Z"},{_docId:"m2",name:"Laura Gómez",location:"Turbaco",rating:4,vehicle:"",text:"Buen servicio y asesoría honesta. El proceso de financiación tardó un poco.",source:"sitio_web",verified:!0,featured:!1,avatar:"LG",createdAt:"2026-05-20T15:30:00.000Z"},{_docId:"m3",name:"Andrés Llanos",location:"Cartagena",rating:5,vehicle:"Chevrolet Onix 2024",text:"Me recibieron mi carro usado como parte de pago sin vueltas. Recomendado.",source:"usuario_registrado",verified:!1,featured:!1,avatar:"AL",createdAt:"2026-05-02T09:10:00.000Z"}],Wx="★",Qx="☆",om=n=>Wx.repeat(Math.max(0,Math.min(5,n)))+Qx.repeat(5-Math.max(0,Math.min(5,n)));function Yx(n){const e={reviews:[],sub:null,loaded:!1},t=Ye("reviews.create"),r=Ye("reviews.edit"),s=Ye("reviews.delete"),i=l("section",{class:"rev"});me(n),n.append(i);function o(p){const g=!!p,b={name:l("input",{class:"input",type:"text",maxlength:"80",placeholder:"Nombre del cliente *"}),location:l("input",{class:"input",type:"text",maxlength:"60",placeholder:"Ciudad (default: Cartagena)"}),rating:l("select",{class:"select"},[5,4,3,2,1].map(k=>l("option",{value:String(k),text:om(k)+"  ("+k+")"}))),vehicle:l("input",{class:"input",type:"text",maxlength:"80",placeholder:"Vehículo (opcional)"}),text:l("textarea",{class:"input rev-modal__text",maxlength:"600",rows:"4",placeholder:"Texto de la reseña *"}),source:l("select",{class:"select"},Object.entries(im).map(([k,x])=>l("option",{value:k,text:x}))),verified:l("input",{type:"checkbox"}),featured:l("input",{type:"checkbox"})};g?(b.name.value=p.name||"",b.location.value=p.location||"",b.rating.value=String(parseInt(p.rating,10)||5),b.vehicle.value=p.vehicle||"",b.text.value=p.text||"",b.source.value=p.source||"sitio_web",b.verified.checked=p.verified!==!1,b.featured.checked=!!p.featured):(b.source.value="sitio_web",b.verified.checked=!0);const E=l("button",{class:"btn btn--gold",type:"button",text:g?"Guardar cambios":"Crear reseña"}),S=l("button",{class:"btn btn--soft",type:"button",text:"Cancelar"}),A=l("div",{class:"rev-modal__overlay"},[l("div",{class:"rev-modal",role:"dialog","aria-modal":"true"},[l("h3",{class:"rev-modal__title",text:g?"Editar reseña":"Nueva reseña"}),l("div",{class:"rev-modal__grid"},[l("label",{class:"field"},[l("span",{class:"field__label",text:"Cliente *"}),b.name]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Ubicación"}),b.location]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Calificación"}),b.rating]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Vehículo"}),b.vehicle])]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Reseña *"}),b.text]),l("div",{class:"rev-modal__grid"},[l("label",{class:"field"},[l("span",{class:"field__label",text:"Fuente"}),b.source]),l("label",{class:"rev-check"},[b.verified,l("span",{text:"Verificada (cliente real)"})]),l("label",{class:"rev-check"},[b.featured,l("span",{text:"⭐ Destacada en el sitio"})])]),l("div",{class:"rev-modal__actions"},[S,E])])]),O=()=>A.remove();S.addEventListener("click",O),A.addEventListener("click",k=>{k.target===A&&O()}),E.addEventListener("click",async()=>{const k=b.name.value.trim(),x=b.text.value.trim();if(!k||!x){G("Completa nombre y texto de la reseña.","error");return}const M={name:k,text:x,location:b.location.value.trim(),rating:parseInt(b.rating.value,10)||5,vehicle:b.vehicle.value.trim(),source:b.source.value,verified:b.verified.checked,featured:b.featured.checked};if(H.get().mock){if(g){const P=e.reviews.findIndex(F=>F._docId===p._docId);P>=0&&(e.reviews[P]={...e.reviews[P],...M,avatar:aa(k)})}else e.reviews.unshift({...M,_docId:"m"+Date.now(),avatar:aa(k),createdAt:new Date().toISOString()});f(),O(),G(g?"Reseña actualizada (demo)":"Reseña creada (demo)","ok");return}E.disabled=!0,E.textContent="Guardando…";try{await Gx(g?p._docId:null,M),O(),G(g?"✓ Reseña actualizada":"✓ Reseña creada — ya está en el sitio","ok")}catch(P){E.disabled=!1,E.textContent=g?"Guardar cambios":"Crear reseña",G("No se pudo guardar: "+(P.message||P.code),"error")}}),document.body.append(A),b.name.focus()}function c(p){const g=l("button",{class:"btn btn--danger",type:"button",text:"Eliminar definitivamente"}),b=l("button",{class:"btn btn--soft",type:"button",text:"Cancelar"}),E=l("div",{class:"rev-modal__overlay"},[l("div",{class:"rev-modal rev-modal--sm",role:"alertdialog","aria-modal":"true"},[l("h3",{class:"rev-modal__title",text:"¿Eliminar esta reseña?"}),l("p",{class:"u-caption u-muted",text:`"${(p.text||"").slice(0,120)}…" — ${p.name}. Desaparece del sitio público al instante. No se puede deshacer.`}),l("div",{class:"rev-modal__actions"},[b,g])])]),S=()=>E.remove();b.addEventListener("click",S),E.addEventListener("click",A=>{A.target===E&&S()}),g.addEventListener("click",async()=>{if(H.get().mock){e.reviews=e.reviews.filter(A=>A._docId!==p._docId),f(),S(),G("Reseña eliminada (demo)","ok");return}g.disabled=!0;try{await Hx(p._docId,p.name),S(),G("✓ Reseña eliminada","ok")}catch(A){g.disabled=!1,G("No se pudo eliminar: "+(A.message||A.code),"error")}}),document.body.append(E)}function u(){const p=e.reviews.length,g=p?(e.reviews.reduce((S,A)=>S+(parseInt(A.rating,10)||0),0)/p).toFixed(1):"0.0",b=e.reviews.filter(S=>S.featured).length,E=t?l("button",{class:"btn btn--gold btn--sm",type:"button",text:"＋ Nueva reseña"}):null;return E&&E.addEventListener("click",()=>o(null)),l("div",{class:"rev-head"},[l("div",{class:"rev-stats"},[l("div",{class:"rev-stat"},[l("strong",{text:String(p)}),l("span",{class:"u-caption u-muted",text:"reseñas"})]),l("div",{class:"rev-stat"},[l("strong",{text:g+" ★"}),l("span",{class:"u-caption u-muted",text:"promedio"})]),l("div",{class:"rev-stat"},[l("strong",{text:String(b)}),l("span",{class:"u-caption u-muted",text:"destacadas"})])]),E])}function d(p){const g=[];if(r){const b=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"✏️ Editar"});b.addEventListener("click",()=>o(p)),g.push(b)}if(s){const b=l("button",{class:"btn btn--soft btn--sm rev-card__del",type:"button",text:"🗑","aria-label":"Eliminar"});b.addEventListener("click",()=>c(p)),g.push(b)}return l("article",{class:"rev-card"},[l("div",{class:"rev-card__top"},[l("span",{class:"avatar avatar--sm","aria-hidden":"true",text:p.avatar||aa(p.name)}),l("div",{class:"rev-card__who"},[l("strong",{class:"u-truncate",text:(p.name||"")+(p.verified?" ✔":"")}),l("span",{class:"u-caption u-faint",text:p.location||"—"})]),l("span",{class:"rev-card__stars","aria-label":(p.rating||0)+" de 5",text:om(parseInt(p.rating,10)||0)})]),p.text?l("p",{class:"rev-card__text",text:"“"+p.text+"”"}):null,l("div",{class:"rev-card__meta"},[p.vehicle?l("span",{class:"chip",text:"🚗 "+p.vehicle}):null,l("span",{class:"chip",text:im[p.source]||p.source||"—"}),p.featured?l("span",{class:"chip chip--gold",text:"⭐ Destacada"}):null]),g.length?l("div",{class:"rev-card__actions"},g):null])}function f(){if(me(i),i.append(u()),!e.loaded){i.append(l("div",{class:"state"},[l("div",{class:"state__msg",text:"Cargando reseñas…"})]));return}if(!e.reviews.length){i.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"💬"}),l("div",{class:"state__title",text:"Sin reseñas"}),l("div",{class:"state__msg",text:t?'Agrega la primera con "＋ Nueva reseña".':"Aún no hay reseñas registradas."})]));return}i.append(l("div",{class:"rev-grid"},e.reviews.map(d)))}return H.get().mock?(e.reviews=Kx.map(p=>({...p})),e.loaded=!0,f()):(f(),e.sub=zx(p=>{e.reviews=p,e.loaded=!0,f()},()=>G("No se pudieron cargar las reseñas.","error"))),function(){e.sub&&e.sub(),e.sub=null}}function Jx(n,{maxWidth:e=1920,quality:t=.85}={}){return new Promise((r,s)=>{const i=URL.createObjectURL(n),o=new Image;o.onload=()=>{URL.revokeObjectURL(i);const c=Math.min(1,e/o.naturalWidth),u=Math.round(o.naturalWidth*c),d=Math.round(o.naturalHeight*c),f=document.createElement("canvas");f.width=u,f.height=d,f.getContext("2d").drawImage(o,0,0,u,d),f.toBlob(p=>{p?r(p):s(new Error("No se pudo comprimir la imagen."))},"image/webp",t)},o.onerror=()=>{URL.revokeObjectURL(i),s(new Error("Archivo de imagen inválido."))},o.src=i})}const ou={promocional:{label:"Promocionales (home)",hint:"Franja entre secciones del home. La web muestra MÁXIMO 3 activos, en orden ascendente."},home_promo:{label:"Carrusel financiación (home)",hint:"Carrusel grande del home con cifra de tasa y pills. Todos los activos rotan, en orden."}};function Xx(n,e){const t=ot(Ae(se,"banners"),vt("order","asc"));return Yt(t,r=>{n(r.docs.map(s=>({...s.data(),_docId:s.id})).filter(s=>ou[s.position]))},r=>e&&e(r))}async function Zx(n,e){if(!["image/jpeg","image/png","image/webp"].includes(n.type))throw new Error("Formato no válido. Usa JPG, PNG o WebP.");if(n.size>10*1024*1024)throw new Error("Imagen demasiado grande (máx 10MB).");e&&e("Comprimiendo a WebP…");const r=await Jx(n,{maxWidth:1920,quality:.85});e&&e("Subiendo…");const s=n.name.replace(/[^a-zA-Z0-9._-]/g,"_").replace(/\.[^.]+$/,""),i="banners/"+Date.now()+"_"+s+".webp",o=await Hk(Qv(Yv,i),r,{contentType:"image/webp"});return Kk(o.ref)}async function eN(n,e,t){const r=new Date().toISOString(),s=e._userEmail||"unknown",i={title:e.title,subtitle:e.subtitle||"",position:e.position,order:e.order||0,link:e.link||"",cta:e.cta||"",active:!!e.active,updatedAt:r,updatedBy:s,_version:n?(t&&t._version||0)+1:1};e.image&&(i.image=e.image),e.position==="home_promo"&&(i.badge=e.badge||"",i.eyebrow=e.eyebrow||"",i.rateValue=e.rateValue||"",i.rateLabel=e.rateLabel||"",i.pills=(e.pills||[]).map(o=>(o||"").trim()).filter(Boolean).slice(0,3)),n?(await at(Re(se,"banners",n),i),Cs("banner_update","banner",i.title)):(i.createdAt=r,i.createdBy=s,await Ft(Ae(se,"banners"),i),Cs("banner_create","banner",i.title))}async function tN(n){await at(Re(se,"banners",n._docId),{active:!n.active,updatedAt:new Date().toISOString(),_version:(n._version||0)+1})}async function nN(n){if(await gv(Re(se,"banners",n._docId)),Cs("banner_delete","banner",n.title||n._docId),n.image&&n.image.indexOf("firebasestorage")!==-1)try{await Wk(Qv(Yv,n.image))}catch{}}const rN=[{_docId:"b1",title:"Feria de usados junio",subtitle:"Hasta 10% de descuento",position:"promocional",order:1,link:"busqueda.html",cta:"Ver ofertas",active:!0,image:"",_version:2,createdAt:"2026-06-01T10:00:00.000Z"},{_docId:"b2",title:"Financiación 90%",subtitle:"Tu carro con cuota inicial mínima",position:"home_promo",order:1,link:"simulador-credito.html",cta:"Simular crédito",active:!0,image:"",badge:"NUEVO",eyebrow:"Financiación ALTORRA",rateValue:"1.2%",rateLabel:"tasa mensual desde",pills:["Aprobación 24h","Sin codeudor","Tasa fija"],_version:1,createdAt:"2026-05-15T09:00:00.000Z"},{_docId:"b3",title:"Banner pausado",subtitle:"No visible en la web",position:"promocional",order:2,link:"",cta:"",active:!1,image:"",_version:1,createdAt:"2026-05-10T08:00:00.000Z"}];function sN(n){const e={banners:[],sub:null,loaded:!1},t=Ye("banners.create"),r=Ye("banners.edit"),s=Ye("banners.delete"),i=l("section",{class:"ban"});me(n),n.append(i);function o(p){const g=!!p;let b=p&&p.image||"";const E={title:l("input",{class:"input",type:"text",maxlength:"90",placeholder:"Título *"}),subtitle:l("input",{class:"input",type:"text",maxlength:"140",placeholder:"Subtítulo"}),position:l("select",{class:"select"},Object.entries(ou).map(([w,R])=>l("option",{value:w,text:R.label}))),order:l("input",{class:"input",type:"number",min:"0",max:"99",value:"0"}),link:l("input",{class:"input",type:"text",maxlength:"200",placeholder:"Enlace (ej: busqueda.html)"}),cta:l("input",{class:"input",type:"text",maxlength:"40",placeholder:"Texto del botón"}),active:l("input",{type:"checkbox"}),badge:l("input",{class:"input",type:"text",maxlength:"20",placeholder:"Badge (ej: NUEVO)"}),eyebrow:l("input",{class:"input",type:"text",maxlength:"60",placeholder:"Antetítulo"}),rateValue:l("input",{class:"input",type:"text",maxlength:"12",placeholder:"Cifra (ej: 1.2%)"}),rateLabel:l("input",{class:"input",type:"text",maxlength:"40",placeholder:"Etiqueta de la cifra"}),pills:[0,1,2].map(w=>l("input",{class:"input",type:"text",maxlength:"30",placeholder:"Pill "+(w+1)}))},S=l("input",{type:"file",accept:"image/jpeg,image/png,image/webp",class:"ban-file"}),A=l("div",{class:"ban-drop"}),O=l("span",{class:"u-caption u-muted",text:""});function k(){me(A),b?A.append(l("img",{src:b,alt:"Vista previa",class:"ban-drop__img"}),l("span",{class:"u-caption u-muted",text:"Click para cambiar la imagen"})):A.append(l("span",{text:"🖼️"}),l("span",{class:"u-caption u-muted",text:"Click para subir (JPG/PNG/WebP → se comprime a WebP). Recomendado 1200×400+."}))}k(),A.addEventListener("click",()=>S.click()),S.addEventListener("change",async()=>{const w=S.files&&S.files[0];if(S.value="",!!w){if(H.get().mock){b="data:demo",k(),G("Imagen simulada (demo)","ok");return}try{O.textContent="Comprimiendo…",b=await Zx(w,R=>{O.textContent=R}),O.textContent="✓ Imagen subida",k()}catch(R){O.textContent="",G(R.message||"No se pudo subir la imagen.","error")}}});const x=l("div",{class:"ban-hp"},[l("p",{class:"u-caption u-muted",text:"Campos del carrusel de financiación:"}),l("div",{class:"ban-modal__grid"},[l("label",{class:"field"},[l("span",{class:"field__label",text:"Badge"}),E.badge]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Antetítulo"}),E.eyebrow]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Cifra"}),E.rateValue]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Etiqueta cifra"}),E.rateLabel])]),l("div",{class:"ban-modal__grid ban-modal__grid--3"},E.pills.map((w,R)=>l("label",{class:"field"},[l("span",{class:"field__label",text:"Pill "+(R+1)}),w])))]),M=()=>{x.style.display=E.position.value==="home_promo"?"":"none"};E.position.addEventListener("change",M),g?(E.title.value=p.title||"",E.subtitle.value=p.subtitle||"",E.position.value=p.position,E.position.disabled=!0,E.order.value=String(p.order||0),E.link.value=p.link||"",E.cta.value=p.cta||"",E.active.checked=p.active!==!1,E.badge.value=p.badge||"",E.eyebrow.value=p.eyebrow||"",E.rateValue.value=p.rateValue||"",E.rateLabel.value=p.rateLabel||"",(p.pills||[]).forEach((w,R)=>{E.pills[R]&&(E.pills[R].value=w)})):E.active.checked=!0,M();const P=l("button",{class:"btn btn--gold",type:"button",text:g?"Guardar cambios":"Crear banner"}),F=l("button",{class:"btn btn--soft",type:"button",text:"Cancelar"}),T=l("div",{class:"rev-modal__overlay"},[l("div",{class:"rev-modal",role:"dialog","aria-modal":"true"},[l("h3",{class:"rev-modal__title",text:g?"Editar banner":"Nuevo banner"}),A,S,O,l("div",{class:"ban-modal__grid"},[l("label",{class:"field"},[l("span",{class:"field__label",text:"Título *"}),E.title]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Subtítulo"}),E.subtitle]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Ubicación"}),E.position]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Orden (menor = primero)"}),E.order]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Enlace"}),E.link]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Botón (CTA)"}),E.cta])]),x,l("label",{class:"rev-check"},[E.active,l("span",{text:"Activo (visible en la web)"})]),l("div",{class:"rev-modal__actions"},[F,P])])]),v=()=>T.remove();F.addEventListener("click",v),T.addEventListener("click",w=>{w.target===T&&v()}),P.addEventListener("click",async()=>{const w=E.title.value.trim();if(!w){G("El título es obligatorio.","error");return}if(!g&&!b){G("Sube la imagen del banner.","error");return}const R={title:w,subtitle:E.subtitle.value.trim(),position:E.position.value,order:parseInt(E.order.value,10)||0,link:E.link.value.trim(),cta:E.cta.value.trim(),active:E.active.checked,image:!g||b!==p.image?b:"",badge:E.badge.value,eyebrow:E.eyebrow.value,rateValue:E.rateValue.value,rateLabel:E.rateLabel.value,pills:E.pills.map(y=>y.value),_userEmail:H.get().user&&H.get().user.email||"unknown"};if(H.get().mock){if(g){const y=e.banners.findIndex(C=>C._docId===p._docId);y>=0&&(e.banners[y]={...e.banners[y],...R,image:b,_version:(e.banners[y]._version||0)+1})}else e.banners.push({...R,image:b,_docId:"b"+Date.now(),_version:1}),e.banners.sort((y,C)=>(y.order||0)-(C.order||0));f(),v(),G(g?"Banner actualizado (demo)":"Banner creado (demo)","ok");return}P.disabled=!0,P.textContent="Guardando…";try{await eN(g?p._docId:null,R,p),v(),G(g?"✓ Banner actualizado":"✓ Banner creado — ya está en el home","ok")}catch(y){P.disabled=!1,P.textContent=g?"Guardar cambios":"Crear banner",G("No se pudo guardar: "+(y.message||y.code),"error")}}),document.body.append(T),E.title.focus()}function c(p){const g=l("button",{class:"btn btn--danger",type:"button",text:"Eliminar definitivamente"}),b=l("button",{class:"btn btn--soft",type:"button",text:"Cancelar"}),E=l("div",{class:"rev-modal__overlay"},[l("div",{class:"rev-modal rev-modal--sm",role:"alertdialog","aria-modal":"true"},[l("h3",{class:"rev-modal__title",text:"¿Eliminar este banner?"}),l("p",{class:"u-caption u-muted",text:`"${p.title}" desaparece de la web al instante (su imagen también se borra). No se puede deshacer — si solo quieres pausarlo, usa Ocultar.`}),l("div",{class:"rev-modal__actions"},[b,g])])]),S=()=>E.remove();b.addEventListener("click",S),E.addEventListener("click",A=>{A.target===E&&S()}),g.addEventListener("click",async()=>{if(H.get().mock){e.banners=e.banners.filter(A=>A._docId!==p._docId),f(),S(),G("Banner eliminado (demo)","ok");return}g.disabled=!0;try{await nN(p),S(),G("✓ Banner eliminado","ok")}catch(A){g.disabled=!1,G("No se pudo eliminar: "+(A.message||A.code),"error")}}),document.body.append(E)}function u(p){const g=[];if(r){const b=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"✏️ Editar"});b.addEventListener("click",()=>o(p));const E=l("button",{class:"btn btn--soft btn--sm",type:"button",text:p.active?"🙈 Ocultar":"👁 Mostrar"});E.addEventListener("click",async()=>{if(H.get().mock){p.active=!p.active,f(),G(p.active?"Banner visible (demo)":"Banner pausado (demo)","ok");return}try{await tN(p),G(p.active?"✓ Banner pausado":"✓ Banner visible","ok")}catch(S){G("No se pudo cambiar: "+(S.message||S.code),"error")}}),g.push(b,E)}if(s){const b=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"🗑","aria-label":"Eliminar"});b.addEventListener("click",()=>c(p)),g.push(b)}return l("article",{class:"ban-card"+(p.active?"":" is-off")},[l("div",{class:"ban-card__thumb"},[p.image&&p.image!=="data:demo"?l("img",{src:p.image,alt:p.title||"",loading:"lazy"}):l("span",{class:"u-caption u-faint",text:p.image==="data:demo"?"🖼️ (demo)":"Sin imagen"})]),l("div",{class:"ban-card__body"},[l("div",{class:"ban-card__head"},[l("span",{class:"chip"+(p.active?" chip--gold":""),text:p.active?"Activo":"Pausado"}),l("span",{class:"u-caption u-faint",text:"Orden "+(p.order||0)})]),l("strong",{class:"u-truncate",text:p.title||"Sin título"}),p.subtitle?l("span",{class:"u-caption u-muted u-truncate",text:p.subtitle}):null,g.length?l("div",{class:"ban-card__actions"},g):null])])}function d(p){const g=ou[p],b=e.banners.filter(S=>S.position===p),E=b.filter(S=>S.active).length;return l("div",{class:"ban-group"},[l("div",{class:"ban-group__head"},[l("h3",{class:"ban-group__title",text:g.label+` (${E} activos)`}),l("p",{class:"u-caption u-muted",text:g.hint})]),b.length?l("div",{class:"ban-grid"},b.map(u)):l("div",{class:"state"},[l("div",{class:"state__msg",text:"Sin banners en esta ubicación."})])])}function f(){me(i);const p=t?l("button",{class:"btn btn--gold btn--sm",type:"button",text:"＋ Nuevo banner"}):null;if(p&&p.addEventListener("click",()=>o(null)),i.append(l("div",{class:"rev-head"},[l("span",{class:"u-caption u-muted",text:"Lo que ves aquí es lo que la web muestra — los cambios aplican al instante."}),p])),!e.loaded){i.append(l("div",{class:"state"},[l("div",{class:"state__msg",text:"Cargando banners…"})]));return}i.append(d("promocional"),d("home_promo"))}return H.get().mock?(e.banners=rN.map(p=>({...p})),e.loaded=!0,f()):(f(),e.sub=Xx(p=>{e.banners=p,e.loaded=!0,f()},()=>G("No se pudieron cargar los banners.","error"))),function(){e.sub&&e.sub(),e.sub=null}}const Ny=document.getElementById("app");cb();const iN=new URLSearchParams(location.search).get("mock")==="1",oN={bandeja:_y,pipeline:OP,agenda:ZP,reportes:gx,contactos:Nx,config:jx,resenas:Yx,banners:sN};let qo=null,ls=null,dr=null,au=null,ca=null;function am(n){if(!ls||n===au)return;dr&&(dr(),dr=null),H.get().detailLeadId&&H.set({detailLeadId:null}),dr=(oN[n]||_y)(ls.outlet)||null,ls.setActive(n),au=n}function aN(){ls=gC(Ny),Lx(ls.detailRoot),am(Jv()),ca=uC(am)}function cN(){dr&&(dr(),dr=null),ca&&(ca(),ca=null),ls=null,au=null}function lN(n){n.ready&&(n.user&&qo!=="app"?(qo="app",aN()):!n.user&&qo!=="login"&&(cN(),qo="login",n.detailLeadId&&H.set({detailLeadId:null}),_C(Ny)))}H.subscribe(lN);iN?H.set({mock:!0,ready:!0,user:{uid:"u_ceo",email:"demo@altorra.local"},profile:{nombre:"Rodrigo (CEO)",cargo:"CEO",rol:"super_admin"},permissions:["*"]}):rC();
