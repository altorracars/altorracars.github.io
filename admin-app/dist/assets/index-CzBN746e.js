(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();function pb(n){let e={...n};const t=new Set;function r(){return e}function s(o){const c=typeof o=="function"?o(e):o;c&&(e={...e,...c},t.forEach(u=>u(e)))}function i(o){return t.add(o),()=>t.delete(o)}return{get:r,set:s,subscribe:i}}const j=pb({ready:!1,authError:null,user:null,profile:null,permissions:[],team:[],theme:"light",mock:!1,detailLeadId:null}),mm="altorra-crm-theme";function mb(){let n=localStorage.getItem(mm);n!=="light"&&n!=="dark"&&(n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),document.documentElement.dataset.theme=n,j.set({theme:n})}function gb(){const n=document.documentElement.dataset.theme==="dark"?"light":"dark";return document.documentElement.dataset.theme=n,localStorage.setItem(mm,n),j.set({theme:n}),n}var Fh={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gm=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},_b=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],o=n[t++],c=n[t++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],o=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},uu={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],o=s+1<n.length,c=o?n[s+1]:0,u=s+2<n.length,d=u?n[s+2]:0,f=i>>2,p=(i&3)<<4|c>>4;let g=(c&15)<<2|d>>6,v=d&63;u||(v=64,o||(g=64)),r.push(t[f],t[p],t[g],t[v])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(gm(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):_b(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const d=s<n.length?t[n.charAt(s)]:64;++s;const p=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||d==null||p==null)throw new vb;const g=i<<2|c>>4;if(r.push(g),d!==64){const v=c<<4&240|d>>2;if(r.push(v),p!==64){const I=d<<6&192|p;r.push(I)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class vb extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const yb=function(n){const e=gm(n);return uu.encodeByteArray(e,!0)},ua=function(n){return yb(n).replace(/\./g,"")},_m=function(n){try{return uu.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function vm(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const bb=()=>vm().__FIREBASE_DEFAULTS__,wb=()=>{if(typeof process>"u"||typeof Fh>"u")return;const n=Fh.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Ib=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&_m(n[1]);return e&&JSON.parse(e)},Ha=()=>{try{return bb()||wb()||Ib()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},ym=n=>{var e,t;return(t=(e=Ha())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},bm=n=>{const e=ym(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},wm=()=>{var n;return(n=Ha())===null||n===void 0?void 0:n.config},Im=n=>{var e;return(e=Ha())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */function Eb(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},n);return[ua(JSON.stringify(t)),ua(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function He(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Tb(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(He())}function Ab(){var n;const e=(n=Ha())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Rb(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Sb(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function kb(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Cb(){const n=He();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Em(){return!Ab()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Ka(){try{return typeof indexedDB=="object"}catch{return!1}}function Pb(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xb="FirebaseError";class Mt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=xb,Object.setPrototypeOf(this,Mt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,xs.prototype.create)}}class xs{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?Nb(i,r):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new Mt(s,c,r)}}function Nb(n,e){return n.replace(Db,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Db=/\{\$([^}]+)}/g;function Vb(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Ii(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],o=e[s];if(Uh(i)&&Uh(o)){if(!Ii(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Uh(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gi(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function si(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function ii(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Ob(n,e){const t=new Lb(n,e);return t.subscribe.bind(t)}class Lb{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Mb(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Qc),s.error===void 0&&(s.error=Qc),s.complete===void 0&&(s.complete=Qc);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Mb(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Qc(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fb=1e3,Ub=2,Bb=4*60*60*1e3,$b=.5;function qb(n,e=Fb,t=Ub){const r=e*Math.pow(t,n),s=Math.round($b*r*(Math.random()-.5)*2);return Math.min(Bb,r+s)}/**
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
 */function Ee(n){return n&&n._delegate?n._delegate:n}class Ot{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const er="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jb{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new wi;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e?.identifier),s=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Gb(e))try{this.getOrInitializeService({instanceIdentifier:er})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=er){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=er){return this.instances.has(e)}getOptions(e=er){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&o.resolve(s)}return s}onInit(e,t){var r;const s=this.normalizeInstanceIdentifier(t),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:zb(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=er){return this.component?this.component.multipleInstances?e:er:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function zb(n){return n===er?void 0:n}function Gb(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hb{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new jb(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ge;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ge||(ge={}));const Kb={debug:ge.DEBUG,verbose:ge.VERBOSE,info:ge.INFO,warn:ge.WARN,error:ge.ERROR,silent:ge.SILENT},Wb=ge.INFO,Qb={[ge.DEBUG]:"log",[ge.VERBOSE]:"log",[ge.INFO]:"info",[ge.WARN]:"warn",[ge.ERROR]:"error"},Yb=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=Qb[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Wa{constructor(e){this.name=e,this._logLevel=Wb,this._logHandler=Yb,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ge))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Kb[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ge.DEBUG,...e),this._logHandler(this,ge.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ge.VERBOSE,...e),this._logHandler(this,ge.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ge.INFO,...e),this._logHandler(this,ge.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ge.WARN,...e),this._logHandler(this,ge.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ge.ERROR,...e),this._logHandler(this,ge.ERROR,...e)}}const Jb=(n,e)=>e.some(t=>n instanceof t);let Bh,$h;function Xb(){return Bh||(Bh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Zb(){return $h||($h=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Tm=new WeakMap,_l=new WeakMap,Am=new WeakMap,Yc=new WeakMap,du=new WeakMap;function ew(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",o)},i=()=>{t(Cn(n.result)),s()},o=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Tm.set(t,n)}).catch(()=>{}),du.set(e,n),e}function tw(n){if(_l.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",o),n.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",o),n.addEventListener("abort",o)});_l.set(n,e)}let vl={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return _l.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Am.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Cn(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function nw(n){vl=n(vl)}function rw(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Jc(this),e,...t);return Am.set(r,e.sort?e.sort():[e]),Cn(r)}:Zb().includes(n)?function(...e){return n.apply(Jc(this),e),Cn(Tm.get(this))}:function(...e){return Cn(n.apply(Jc(this),e))}}function sw(n){return typeof n=="function"?rw(n):(n instanceof IDBTransaction&&tw(n),Jb(n,Xb())?new Proxy(n,vl):n)}function Cn(n){if(n instanceof IDBRequest)return ew(n);if(Yc.has(n))return Yc.get(n);const e=sw(n);return e!==n&&(Yc.set(n,e),du.set(e,n)),e}const Jc=n=>du.get(n);function iw(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(n,e),c=Cn(o);return r&&o.addEventListener("upgradeneeded",u=>{r(Cn(o.result),u.oldVersion,u.newVersion,Cn(o.transaction),u)}),t&&o.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const ow=["get","getKey","getAll","getAllKeys","count"],aw=["put","add","delete","clear"],Xc=new Map;function qh(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Xc.get(e))return Xc.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=aw.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||ow.includes(t)))return;const i=async function(o,...c){const u=this.transaction(o,s?"readwrite":"readonly");let d=u.store;return r&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),s&&u.done]))[0]};return Xc.set(e,i),i}nw(n=>({...n,get:(e,t,r)=>qh(e,t)||n.get(e,t,r),has:(e,t)=>!!qh(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cw{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(lw(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function lw(n){const e=n.getComponent();return e?.type==="VERSION"}const yl="@firebase/app",jh="0.11.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const on=new Wa("@firebase/app"),uw="@firebase/app-compat",dw="@firebase/analytics-compat",hw="@firebase/analytics",fw="@firebase/app-check-compat",pw="@firebase/app-check",mw="@firebase/auth",gw="@firebase/auth-compat",_w="@firebase/database",vw="@firebase/data-connect",yw="@firebase/database-compat",bw="@firebase/functions",ww="@firebase/functions-compat",Iw="@firebase/installations",Ew="@firebase/installations-compat",Tw="@firebase/messaging",Aw="@firebase/messaging-compat",Rw="@firebase/performance",Sw="@firebase/performance-compat",kw="@firebase/remote-config",Cw="@firebase/remote-config-compat",Pw="@firebase/storage",xw="@firebase/storage-compat",Nw="@firebase/firestore",Dw="@firebase/vertexai",Vw="@firebase/firestore-compat",Ow="firebase",Lw="11.3.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bl="[DEFAULT]",Mw={[yl]:"fire-core",[uw]:"fire-core-compat",[hw]:"fire-analytics",[dw]:"fire-analytics-compat",[pw]:"fire-app-check",[fw]:"fire-app-check-compat",[mw]:"fire-auth",[gw]:"fire-auth-compat",[_w]:"fire-rtdb",[vw]:"fire-data-connect",[yw]:"fire-rtdb-compat",[bw]:"fire-fn",[ww]:"fire-fn-compat",[Iw]:"fire-iid",[Ew]:"fire-iid-compat",[Tw]:"fire-fcm",[Aw]:"fire-fcm-compat",[Rw]:"fire-perf",[Sw]:"fire-perf-compat",[kw]:"fire-rc",[Cw]:"fire-rc-compat",[Pw]:"fire-gcs",[xw]:"fire-gcs-compat",[Nw]:"fire-fst",[Vw]:"fire-fst-compat",[Dw]:"fire-vertex","fire-js":"fire-js",[Ow]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const da=new Map,Fw=new Map,wl=new Map;function zh(n,e){try{n.container.addComponent(e)}catch(t){on.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Wt(n){const e=n.name;if(wl.has(e))return on.debug(`There were multiple attempts to register component ${e}.`),!1;wl.set(e,n);for(const t of da.values())zh(t,n);for(const t of Fw.values())zh(t,n);return!0}function Pr(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function It(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uw={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Pn=new xs("app","Firebase",Uw);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bw{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Ot("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Pn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xr=Lw;function Rm(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:bl,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw Pn.create("bad-app-name",{appName:String(s)});if(t||(t=wm()),!t)throw Pn.create("no-options");const i=da.get(s);if(i){if(Ii(t,i.options)&&Ii(r,i.config))return i;throw Pn.create("duplicate-app",{appName:s})}const o=new Hb(s);for(const u of wl.values())o.addComponent(u);const c=new Bw(t,r,o);return da.set(s,c),c}function Qa(n=bl){const e=da.get(n);if(!e&&n===bl&&wm())return Rm();if(!e)throw Pn.create("no-app",{appName:n});return e}function At(n,e,t){var r;let s=(r=Mw[n])!==null&&r!==void 0?r:n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const c=[`Unable to register library "${s}" with version "${e}":`];i&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&c.push("and"),o&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),on.warn(c.join(" "));return}Wt(new Ot(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const $w="firebase-heartbeat-database",qw=1,Ei="firebase-heartbeat-store";let Zc=null;function Sm(){return Zc||(Zc=iw($w,qw,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Ei)}catch(t){console.warn(t)}}}}).catch(n=>{throw Pn.create("idb-open",{originalErrorMessage:n.message})})),Zc}async function jw(n){try{const t=(await Sm()).transaction(Ei),r=await t.objectStore(Ei).get(km(n));return await t.done,r}catch(e){if(e instanceof Mt)on.warn(e.message);else{const t=Pn.create("idb-get",{originalErrorMessage:e?.message});on.warn(t.message)}}}async function Gh(n,e){try{const r=(await Sm()).transaction(Ei,"readwrite");await r.objectStore(Ei).put(e,km(n)),await r.done}catch(t){if(t instanceof Mt)on.warn(t.message);else{const r=Pn.create("idb-set",{originalErrorMessage:t?.message});on.warn(r.message)}}}function km(n){return`${n.name}!${n.options.appId}`}/**
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
 */const zw=1024,Gw=30;class Hw{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Ww(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Hh();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>Gw){const o=Qw(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){on.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Hh(),{heartbeatsToSend:r,unsentEntries:s}=Kw(this._heartbeatsCache.heartbeats),i=ua(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return on.warn(t),""}}}function Hh(){return new Date().toISOString().substring(0,10)}function Kw(n,e=zw){const t=[];let r=n.slice();for(const s of n){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),Kh(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Kh(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Ww{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ka()?Pb().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await jw(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Gh(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Gh(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Kh(n){return ua(JSON.stringify({version:2,heartbeats:n})).length}function Qw(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yw(n){Wt(new Ot("platform-logger",e=>new cw(e),"PRIVATE")),Wt(new Ot("heartbeat",e=>new Hw(e),"PRIVATE")),At(yl,jh,n),At(yl,jh,"esm2017"),At("fire-js","")}Yw("");function hu(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(t[r[s]]=n[r[s]]);return t}function Cm(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Jw=Cm,Pm=new xs("auth","Firebase",Cm());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ha=new Wa("@firebase/auth");function Xw(n,...e){ha.logLevel<=ge.WARN&&ha.warn(`Auth (${xr}): ${n}`,...e)}function zo(n,...e){ha.logLevel<=ge.ERROR&&ha.error(`Auth (${xr}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lt(n,...e){throw fu(n,...e)}function Gt(n,...e){return fu(n,...e)}function xm(n,e,t){const r=Object.assign(Object.assign({},Jw()),{[e]:t});return new xs("auth","Firebase",r).create(e,{appName:n.name})}function xn(n){return xm(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function fu(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Pm.create(n,...e)}function ae(n,e,...t){if(!n)throw fu(e,...t)}function tn(n){const e="INTERNAL ASSERTION FAILED: "+n;throw zo(e),new Error(e)}function an(n,e){n||tn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Il(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Zw(){return Wh()==="http:"||Wh()==="https:"}function Wh(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eI(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Zw()||Sb()||"connection"in navigator)?navigator.onLine:!0}function tI(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hi{constructor(e,t){this.shortDelay=e,this.longDelay=t,an(t>e,"Short delay should be less than long delay!"),this.isMobile=Tb()||kb()}get(){return eI()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pu(n,e){an(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nm{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;tn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;tn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;tn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nI={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rI=new Hi(3e4,6e4);function Nr(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function $n(n,e,t,r,s={}){return Dm(n,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const c=Gi(Object.assign({key:n.config.apiKey},o)).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const d=Object.assign({method:e,headers:u},i);return Rb()||(d.referrerPolicy="no-referrer"),Nm.fetch()(Vm(n,n.config.apiHost,t,c),d)})}async function Dm(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},nI),e);try{const s=new iI(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw Ao(n,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[u,d]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ao(n,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw Ao(n,"email-already-in-use",o);if(u==="USER_DISABLED")throw Ao(n,"user-disabled",o);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw xm(n,f,d);Lt(n,f)}}catch(s){if(s instanceof Mt)throw s;Lt(n,"network-request-failed",{message:String(s)})}}async function Ya(n,e,t,r,s={}){const i=await $n(n,e,t,r,s);return"mfaPendingCredential"in i&&Lt(n,"multi-factor-auth-required",{_serverResponse:i}),i}function Vm(n,e,t,r){const s=`${e}${t}?${r}`;return n.config.emulator?pu(n.config,s):`${n.config.apiScheme}://${s}`}function sI(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class iI{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Gt(this.auth,"network-request-failed")),rI.get())})}}function Ao(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=Gt(n,e,r);return s.customData._tokenResponse=t,s}function Qh(n){return n!==void 0&&n.enterprise!==void 0}class oI{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return sI(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function aI(n,e){return $n(n,"GET","/v2/recaptchaConfig",Nr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cI(n,e){return $n(n,"POST","/v1/accounts:delete",e)}async function Om(n,e){return $n(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function di(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function lI(n,e=!1){const t=Ee(n),r=await t.getIdToken(e),s=mu(r);ae(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i?.sign_in_provider;return{claims:s,token:r,authTime:di(el(s.auth_time)),issuedAtTime:di(el(s.iat)),expirationTime:di(el(s.exp)),signInProvider:o||null,signInSecondFactor:i?.sign_in_second_factor||null}}function el(n){return Number(n)*1e3}function mu(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return zo("JWT malformed, contained fewer than 3 sections"),null;try{const s=_m(t);return s?JSON.parse(s):(zo("Failed to decode base64 JWT payload"),null)}catch(s){return zo("Caught error parsing JWT payload as JSON",s?.toString()),null}}function Yh(n){const e=mu(n);return ae(e,"internal-error"),ae(typeof e.exp<"u","internal-error"),ae(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ti(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Mt&&uI(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function uI({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dI{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class El{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=di(this.lastLoginAt),this.creationTime=di(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fa(n){var e;const t=n.auth,r=await n.getIdToken(),s=await Ti(n,Om(t,{idToken:r}));ae(s?.users.length,t,"internal-error");const i=s.users[0];n._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?Lm(i.providerUserInfo):[],c=fI(n.providerData,o),u=n.isAnonymous,d=!(n.email&&i.passwordHash)&&!c?.length,f=u?d:!1,p={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:c,metadata:new El(i.createdAt,i.lastLoginAt),isAnonymous:f};Object.assign(n,p)}async function hI(n){const e=Ee(n);await fa(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function fI(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Lm(n){return n.map(e=>{var{providerId:t}=e,r=hu(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pI(n,e){const t=await Dm(n,{},async()=>{const r=Gi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,o=Vm(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",Nm.fetch()(o,{method:"POST",headers:c,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function mI(n,e){return $n(n,"POST","/v2/accounts:revokeToken",Nr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ss{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){ae(e.idToken,"internal-error"),ae(typeof e.idToken<"u","internal-error"),ae(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Yh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){ae(e.length!==0,"internal-error");const t=Yh(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(ae(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await pI(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,o=new ss;return r&&(ae(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(ae(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(ae(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ss,this.toJSON())}_performRefresh(){return tn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _n(n,e){ae(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class nn{constructor(e){var{uid:t,auth:r,stsTokenManager:s}=e,i=hu(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new dI(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new El(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await Ti(this,this.stsTokenManager.getToken(this.auth,e));return ae(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return lI(this,e)}reload(){return hI(this)}_assign(e){this!==e&&(ae(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new nn(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){ae(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await fa(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(It(this.auth.app))return Promise.reject(xn(this.auth));const e=await this.getIdToken();return await Ti(this,cI(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,s,i,o,c,u,d,f;const p=(r=t.displayName)!==null&&r!==void 0?r:void 0,g=(s=t.email)!==null&&s!==void 0?s:void 0,v=(i=t.phoneNumber)!==null&&i!==void 0?i:void 0,I=(o=t.photoURL)!==null&&o!==void 0?o:void 0,S=(c=t.tenantId)!==null&&c!==void 0?c:void 0,A=(u=t._redirectEventId)!==null&&u!==void 0?u:void 0,O=(d=t.createdAt)!==null&&d!==void 0?d:void 0,k=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:x,emailVerified:F,isAnonymous:P,providerData:M,stsTokenManager:T}=t;ae(x&&T,e,"internal-error");const y=ss.fromJSON(this.name,T);ae(typeof x=="string",e,"internal-error"),_n(p,e.name),_n(g,e.name),ae(typeof F=="boolean",e,"internal-error"),ae(typeof P=="boolean",e,"internal-error"),_n(v,e.name),_n(I,e.name),_n(S,e.name),_n(A,e.name),_n(O,e.name),_n(k,e.name);const b=new nn({uid:x,auth:e,email:g,emailVerified:F,displayName:p,isAnonymous:P,photoURL:I,phoneNumber:v,tenantId:S,stsTokenManager:y,createdAt:O,lastLoginAt:k});return M&&Array.isArray(M)&&(b.providerData=M.map(R=>Object.assign({},R))),A&&(b._redirectEventId=A),b}static async _fromIdTokenResponse(e,t,r=!1){const s=new ss;s.updateFromServerResponse(t);const i=new nn({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await fa(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];ae(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Lm(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!i?.length,c=new ss;c.updateFromIdToken(r);const u=new nn({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new El(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(u,d),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jh=new Map;function rn(n){an(n instanceof Function,"Expected a class definition");let e=Jh.get(n);return e?(an(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Jh.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mm{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Mm.type="NONE";const Xh=Mm;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Go(n,e,t){return`firebase:${n}:${e}:${t}`}class is{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Go(this.userKey,s.apiKey,i),this.fullPersistenceKey=Go("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?nn._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new is(rn(Xh),e,r);const s=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let i=s[0]||rn(Xh);const o=Go(r,e.config.apiKey,e.name);let c=null;for(const d of t)try{const f=await d._get(o);if(f){const p=nn._fromJSON(e,f);d!==i&&(c=p),i=d;break}}catch{}const u=s.filter(d=>d._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new is(i,e,r):(i=u[0],c&&await i._set(o,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==i)try{await d._remove(o)}catch{}})),new is(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zh(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if($m(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Fm(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(jm(e))return"Blackberry";if(zm(e))return"Webos";if(Um(e))return"Safari";if((e.includes("chrome/")||Bm(e))&&!e.includes("edge/"))return"Chrome";if(qm(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function Fm(n=He()){return/firefox\//i.test(n)}function Um(n=He()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Bm(n=He()){return/crios\//i.test(n)}function $m(n=He()){return/iemobile/i.test(n)}function qm(n=He()){return/android/i.test(n)}function jm(n=He()){return/blackberry/i.test(n)}function zm(n=He()){return/webos/i.test(n)}function gu(n=He()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function gI(n=He()){var e;return gu(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function _I(){return Cb()&&document.documentMode===10}function Gm(n=He()){return gu(n)||qm(n)||zm(n)||jm(n)||/windows phone/i.test(n)||$m(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hm(n,e=[]){let t;switch(n){case"Browser":t=Zh(He());break;case"Worker":t=`${Zh(He())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${xr}/${r}`}/**
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
 */class vI{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((o,c)=>{try{const u=e(i);o(u)}catch(u){c(u)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
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
 */async function yI(n,e={}){return $n(n,"GET","/v2/passwordPolicy",Nr(n,e))}/**
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
 */const bI=6;class wI{constructor(e){var t,r,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:bI,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,s,i,o,c;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(t=u.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(s=u.containsLowercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(i=u.containsUppercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(o=u.containsNumericCharacter)!==null&&o!==void 0?o:!0),u.isValid&&(u.isValid=(c=u.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),u}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class II{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new ef(this),this.idTokenSubscription=new ef(this),this.beforeStateQueue=new vI(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Pm,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=rn(t)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await is.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Om(this,{idToken:e}),r=await nn._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(It(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=s?._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===c)&&u?.user&&(s=u.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return ae(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await fa(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=tI()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(It(this.app))return Promise.reject(xn(this));const t=e?Ee(e):null;return t&&ae(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&ae(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return It(this.app)?Promise.reject(xn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return It(this.app)?Promise.reject(xn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(rn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await yI(this),t=new wI(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new xs("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await mI(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&rn(e)||this._popupRedirectResolver;ae(t,this,"argument-error"),this.redirectPersistenceManager=await is.create(this,[rn(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(ae(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{o=!0,u()}}else{const u=e.addObserver(t);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return ae(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Hm(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;if(It(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&Xw(`Error while retrieving App Check token: ${t.error}`),t?.token}}function Ns(n){return Ee(n)}class ef{constructor(e){this.auth=e,this.observer=null,this.addObserver=Ob(t=>this.observer=t)}get next(){return ae(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ja={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function EI(n){Ja=n}function Km(n){return Ja.loadJS(n)}function TI(){return Ja.recaptchaEnterpriseScript}function AI(){return Ja.gapiScript}function RI(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class SI{constructor(){this.enterprise=new kI}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class kI{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const CI="recaptcha-enterprise",Wm="NO_RECAPTCHA";class PI{constructor(e){this.type=CI,this.auth=Ns(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,c)=>{aI(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const d=new oI(u);return i.tenantId==null?i._agentRecaptchaConfig=d:i._tenantRecaptchaConfigs[i.tenantId]=d,o(d.siteKey)}}).catch(u=>{c(u)})})}function s(i,o,c){const u=window.grecaptcha;Qh(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(d=>{o(d)}).catch(()=>{o(Wm)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new SI().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{r(this.auth).then(c=>{if(!t&&Qh(window.grecaptcha))s(c,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=TI();u.length!==0&&(u+=c),Km(u).then(()=>{s(c,i,o)}).catch(d=>{o(d)})}}).catch(c=>{o(c)})})}}async function tf(n,e,t,r=!1,s=!1){const i=new PI(n);let o;if(s)o=Wm;else try{o=await i.verify(t)}catch{o=await i.verify(t,!0)}const c=Object.assign({},e);if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const u=c.phoneEnrollmentInfo.phoneNumber,d=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:d,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function nf(n,e,t,r,s){var i;if(!((i=n._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await tf(n,e,t,t==="getOobCode");return r(n,o)}else return r(n,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await tf(n,e,t,t==="getOobCode");return r(n,c)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xI(n,e){const t=Pr(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(Ii(i,e??{}))return s;Lt(s,"already-initialized")}return t.initialize({options:e})}function NI(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(rn);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function DI(n,e,t){const r=Ns(n);ae(r._canInitEmulator,r,"emulator-config-failed"),ae(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Qm(e),{host:o,port:c}=VI(e),u=c===null?"":`:${c}`;r.config.emulator={url:`${i}//${o}${u}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),OI()}function Qm(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function VI(n){const e=Qm(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:rf(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:rf(o)}}}function rf(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function OI(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _u{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return tn("not implemented")}_getIdTokenResponse(e){return tn("not implemented")}_linkToIdToken(e,t){return tn("not implemented")}_getReauthenticationResolver(e){return tn("not implemented")}}async function LI(n,e){return $n(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function MI(n,e){return Ya(n,"POST","/v1/accounts:signInWithPassword",Nr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function FI(n,e){return Ya(n,"POST","/v1/accounts:signInWithEmailLink",Nr(n,e))}async function UI(n,e){return Ya(n,"POST","/v1/accounts:signInWithEmailLink",Nr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ai extends _u{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new Ai(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new Ai(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return nf(e,t,"signInWithPassword",MI);case"emailLink":return FI(e,{email:this._email,oobCode:this._password});default:Lt(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return nf(e,r,"signUpPassword",LI);case"emailLink":return UI(e,{idToken:t,email:this._email,oobCode:this._password});default:Lt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function os(n,e){return Ya(n,"POST","/v1/accounts:signInWithIdp",Nr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BI="http://localhost";class vr extends _u{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new vr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Lt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=t,i=hu(t,["providerId","signInMethod"]);if(!r||!s)return null;const o=new vr(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return os(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,os(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,os(e,t)}buildRequest(){const e={requestUri:BI,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Gi(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $I(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function qI(n){const e=si(ii(n)).link,t=e?si(ii(e)).deep_link_id:null,r=si(ii(n)).deep_link_id;return(r?si(ii(r)).link:null)||r||t||e||n}class vu{constructor(e){var t,r,s,i,o,c;const u=si(ii(e)),d=(t=u.apiKey)!==null&&t!==void 0?t:null,f=(r=u.oobCode)!==null&&r!==void 0?r:null,p=$I((s=u.mode)!==null&&s!==void 0?s:null);ae(d&&f&&p,"argument-error"),this.apiKey=d,this.operation=p,this.code=f,this.continueUrl=(i=u.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(o=u.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(c=u.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const t=qI(e);try{return new vu(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ds{constructor(){this.providerId=Ds.PROVIDER_ID}static credential(e,t){return Ai._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=vu.parseLink(t);return ae(r,"argument-error"),Ai._fromEmailAndCode(e,r.code,r.tenantId)}}Ds.PROVIDER_ID="password";Ds.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Ds.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ym{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ki extends Ym{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class In extends Ki{constructor(){super("facebook.com")}static credential(e){return vr._fromParams({providerId:In.PROVIDER_ID,signInMethod:In.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return In.credentialFromTaggedObject(e)}static credentialFromError(e){return In.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return In.credential(e.oauthAccessToken)}catch{return null}}}In.FACEBOOK_SIGN_IN_METHOD="facebook.com";In.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class En extends Ki{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return vr._fromParams({providerId:En.PROVIDER_ID,signInMethod:En.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return En.credentialFromTaggedObject(e)}static credentialFromError(e){return En.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return En.credential(t,r)}catch{return null}}}En.GOOGLE_SIGN_IN_METHOD="google.com";En.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tn extends Ki{constructor(){super("github.com")}static credential(e){return vr._fromParams({providerId:Tn.PROVIDER_ID,signInMethod:Tn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Tn.credentialFromTaggedObject(e)}static credentialFromError(e){return Tn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Tn.credential(e.oauthAccessToken)}catch{return null}}}Tn.GITHUB_SIGN_IN_METHOD="github.com";Tn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class An extends Ki{constructor(){super("twitter.com")}static credential(e,t){return vr._fromParams({providerId:An.PROVIDER_ID,signInMethod:An.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return An.credentialFromTaggedObject(e)}static credentialFromError(e){return An.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return An.credential(t,r)}catch{return null}}}An.TWITTER_SIGN_IN_METHOD="twitter.com";An.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hs{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await nn._fromIdTokenResponse(e,r,s),o=sf(r);return new hs({user:i,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=sf(r);return new hs({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function sf(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pa extends Mt{constructor(e,t,r,s){var i;super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,pa.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new pa(e,t,r,s)}}function Jm(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?pa._fromErrorAndOperation(n,i,e,r):i})}async function jI(n,e,t=!1){const r=await Ti(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return hs._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zI(n,e,t=!1){const{auth:r}=n;if(It(r.app))return Promise.reject(xn(r));const s="reauthenticate";try{const i=await Ti(n,Jm(r,s,e,n),t);ae(i.idToken,r,"internal-error");const o=mu(i.idToken);ae(o,r,"internal-error");const{sub:c}=o;return ae(n.uid===c,r,"user-mismatch"),hs._forOperation(n,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&Lt(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xm(n,e,t=!1){if(It(n.app))return Promise.reject(xn(n));const r="signIn",s=await Jm(n,r,e),i=await hs._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function GI(n,e){return Xm(Ns(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function HI(n){const e=Ns(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function KI(n,e,t){return It(n.app)?Promise.reject(xn(n)):GI(Ee(n),Ds.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&HI(n),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function WI(n,e){return Ee(n).setPersistence(e)}function QI(n,e,t,r){return Ee(n).onIdTokenChanged(e,t,r)}function YI(n,e,t){return Ee(n).beforeAuthStateChanged(e,t)}function JI(n,e,t,r){return Ee(n).onAuthStateChanged(e,t,r)}function Zm(n){return Ee(n).signOut()}const ma="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eg{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(ma,"1"),this.storage.removeItem(ma),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XI=1e3,ZI=10;class tg extends eg{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Gm(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);_I()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,ZI):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},XI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}tg.type="LOCAL";const ng=tg;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rg extends eg{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}rg.type="SESSION";const sg=rg;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eE(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xa{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Xa(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(o).map(async d=>d(t.origin,i)),u=await eE(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Xa.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yu(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tE{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,u)=>{const d=yu("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(p){const g=p;if(g.data.eventId===d)switch(g.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(g.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ht(){return window}function nE(n){Ht().location.href=n}/**
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
 */function ig(){return typeof Ht().WorkerGlobalScope<"u"&&typeof Ht().importScripts=="function"}async function rE(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function sE(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function iE(){return ig()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const og="firebaseLocalStorageDb",oE=1,ga="firebaseLocalStorage",ag="fbase_key";class Wi{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Za(n,e){return n.transaction([ga],e?"readwrite":"readonly").objectStore(ga)}function aE(){const n=indexedDB.deleteDatabase(og);return new Wi(n).toPromise()}function Tl(){const n=indexedDB.open(og,oE);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(ga,{keyPath:ag})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(ga)?e(r):(r.close(),await aE(),e(await Tl()))})})}async function of(n,e,t){const r=Za(n,!0).put({[ag]:e,value:t});return new Wi(r).toPromise()}async function cE(n,e){const t=Za(n,!1).get(e),r=await new Wi(t).toPromise();return r===void 0?null:r.value}function af(n,e){const t=Za(n,!0).delete(e);return new Wi(t).toPromise()}const lE=800,uE=3;class cg{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Tl(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>uE)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return ig()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Xa._getInstance(iE()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await rE(),!this.activeServiceWorker)return;this.sender=new tE(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||sE()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Tl();return await of(e,ma,"1"),await af(e,ma),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>of(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>cE(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>af(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Za(s,!1).getAll();return new Wi(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),lE)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}cg.type="LOCAL";const dE=cg;new Hi(3e4,6e4);/**
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
 */function hE(n,e){return e?rn(e):(ae(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bu extends _u{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return os(e,this._buildIdpRequest())}_linkToIdToken(e,t){return os(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return os(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function fE(n){return Xm(n.auth,new bu(n),n.bypassAuthState)}function pE(n){const{auth:e,user:t}=n;return ae(t,e,"internal-error"),zI(t,new bu(n),n.bypassAuthState)}async function mE(n){const{auth:e,user:t}=n;return ae(t,e,"internal-error"),jI(t,new bu(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lg{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return fE;case"linkViaPopup":case"linkViaRedirect":return mE;case"reauthViaPopup":case"reauthViaRedirect":return pE;default:Lt(this.auth,"internal-error")}}resolve(e){an(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){an(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gE=new Hi(2e3,1e4);class ns extends lg{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,ns.currentPopupAction&&ns.currentPopupAction.cancel(),ns.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return ae(e,this.auth,"internal-error"),e}async onExecution(){an(this.filter.length===1,"Popup operations only handle one event");const e=yu();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Gt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Gt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ns.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Gt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,gE.get())};e()}}ns.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _E="pendingRedirect",Ho=new Map;class vE extends lg{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Ho.get(this.auth._key());if(!e){try{const r=await yE(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Ho.set(this.auth._key(),e)}return this.bypassAuthState||Ho.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function yE(n,e){const t=IE(e),r=wE(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function bE(n,e){Ho.set(n._key(),e)}function wE(n){return rn(n._redirectPersistence)}function IE(n){return Go(_E,n.config.apiKey,n.name)}async function EE(n,e,t=!1){if(It(n.app))return Promise.reject(xn(n));const r=Ns(n),s=hE(r,e),o=await new vE(r,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TE=10*60*1e3;class AE{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!RE(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!ug(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Gt(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=TE&&this.cachedEventUids.clear(),this.cachedEventUids.has(cf(e))}saveEventToCache(e){this.cachedEventUids.add(cf(e)),this.lastProcessedEventTime=Date.now()}}function cf(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function ug({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function RE(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return ug(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function SE(n,e={}){return $n(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kE=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,CE=/^https?/;async function PE(n){if(n.config.emulator)return;const{authorizedDomains:e}=await SE(n);for(const t of e)try{if(xE(t))return}catch{}Lt(n,"unauthorized-domain")}function xE(n){const e=Il(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!CE.test(t))return!1;if(kE.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const NE=new Hi(3e4,6e4);function lf(){const n=Ht().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function DE(n){return new Promise((e,t)=>{var r,s,i;function o(){lf(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{lf(),t(Gt(n,"network-request-failed"))},timeout:NE.get()})}if(!((s=(r=Ht().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=Ht().gapi)===null||i===void 0)&&i.load)o();else{const c=RI("iframefcb");return Ht()[c]=()=>{gapi.load?o():t(Gt(n,"network-request-failed"))},Km(`${AI()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw Ko=null,e})}let Ko=null;function VE(n){return Ko=Ko||DE(n),Ko}/**
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
 */const OE=new Hi(5e3,15e3),LE="__/auth/iframe",ME="emulator/auth/iframe",FE={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},UE=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function BE(n){const e=n.config;ae(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?pu(e,ME):`https://${n.config.authDomain}/${LE}`,r={apiKey:e.apiKey,appName:n.name,v:xr},s=UE.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${Gi(r).slice(1)}`}async function $E(n){const e=await VE(n),t=Ht().gapi;return ae(t,n,"internal-error"),e.open({where:document.body,url:BE(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:FE,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=Gt(n,"network-request-failed"),c=Ht().setTimeout(()=>{i(o)},OE.get());function u(){Ht().clearTimeout(c),s(r)}r.ping(u).then(u,()=>{i(o)})}))}/**
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
 */const qE={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},jE=500,zE=600,GE="_blank",HE="http://localhost";class uf{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function KE(n,e,t,r=jE,s=zE){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u=Object.assign(Object.assign({},qE),{width:r.toString(),height:s.toString(),top:i,left:o}),d=He().toLowerCase();t&&(c=Bm(d)?GE:t),Fm(d)&&(e=e||HE,u.scrollbars="yes");const f=Object.entries(u).reduce((g,[v,I])=>`${g}${v}=${I},`,"");if(gI(d)&&c!=="_self")return WE(e||"",c),new uf(null);const p=window.open(e||"",c,f);ae(p,n,"popup-blocked");try{p.focus()}catch{}return new uf(p)}function WE(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const QE="__/auth/handler",YE="emulator/auth/handler",JE=encodeURIComponent("fac");async function df(n,e,t,r,s,i){ae(n.config.authDomain,n,"auth-domain-config-required"),ae(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:xr,eventId:s};if(e instanceof Ym){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Vb(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))o[f]=p}if(e instanceof Ki){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(o.scopes=f.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await n._getAppCheckToken(),d=u?`#${JE}=${encodeURIComponent(u)}`:"";return`${XE(n)}?${Gi(c).slice(1)}${d}`}function XE({config:n}){return n.emulator?pu(n,YE):`https://${n.authDomain}/${QE}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tl="webStorageSupport";class ZE{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=sg,this._completeRedirectFn=EE,this._overrideRedirectResult=bE}async _openPopup(e,t,r,s){var i;an((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await df(e,t,r,Il(),s);return KE(e,o,yu())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await df(e,t,r,Il(),s);return nE(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(an(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await $E(e),r=new AE(e);return t.register("authEvent",s=>(ae(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(tl,{type:tl},s=>{var i;const o=(i=s?.[0])===null||i===void 0?void 0:i[tl];o!==void 0&&t(!!o),Lt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=PE(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Gm()||Um()||gu()}}const eT=ZE;var hf="@firebase/auth",ff="1.9.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tT{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){ae(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nT(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function rT(n){Wt(new Ot("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;ae(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Hm(n)},d=new II(r,s,i,u);return NI(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Wt(new Ot("auth-internal",e=>{const t=Ns(e.getProvider("auth").getImmediate());return(r=>new tT(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),At(hf,ff,nT(n)),At(hf,ff,"esm2017")}/**
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
 */const sT=5*60,iT=Im("authIdTokenMaxAge")||sT;let pf=null;const oT=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>iT)return;const s=t?.token;pf!==s&&(pf=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function aT(n=Qa()){const e=Pr(n,"auth");if(e.isInitialized())return e.getImmediate();const t=xI(n,{popupRedirectResolver:eT,persistence:[dE,ng,sg]}),r=Im("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=oT(i.toString());YI(t,o,()=>o(t.currentUser)),QI(t,c=>o(c))}}const s=ym("auth");return s&&DI(t,`http://${s}`),t}function cT(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}EI({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=Gt("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",cT().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});rT("Browser");var mf=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Nn,dg;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(T,y){function b(){}b.prototype=y.prototype,T.D=y.prototype,T.prototype=new b,T.prototype.constructor=T,T.C=function(R,w,C){for(var E=Array(arguments.length-2),le=2;le<arguments.length;le++)E[le-2]=arguments[le];return y.prototype[w].apply(R,E)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(T,y,b){b||(b=0);var R=Array(16);if(typeof y=="string")for(var w=0;16>w;++w)R[w]=y.charCodeAt(b++)|y.charCodeAt(b++)<<8|y.charCodeAt(b++)<<16|y.charCodeAt(b++)<<24;else for(w=0;16>w;++w)R[w]=y[b++]|y[b++]<<8|y[b++]<<16|y[b++]<<24;y=T.g[0],b=T.g[1],w=T.g[2];var C=T.g[3],E=y+(C^b&(w^C))+R[0]+3614090360&4294967295;y=b+(E<<7&4294967295|E>>>25),E=C+(w^y&(b^w))+R[1]+3905402710&4294967295,C=y+(E<<12&4294967295|E>>>20),E=w+(b^C&(y^b))+R[2]+606105819&4294967295,w=C+(E<<17&4294967295|E>>>15),E=b+(y^w&(C^y))+R[3]+3250441966&4294967295,b=w+(E<<22&4294967295|E>>>10),E=y+(C^b&(w^C))+R[4]+4118548399&4294967295,y=b+(E<<7&4294967295|E>>>25),E=C+(w^y&(b^w))+R[5]+1200080426&4294967295,C=y+(E<<12&4294967295|E>>>20),E=w+(b^C&(y^b))+R[6]+2821735955&4294967295,w=C+(E<<17&4294967295|E>>>15),E=b+(y^w&(C^y))+R[7]+4249261313&4294967295,b=w+(E<<22&4294967295|E>>>10),E=y+(C^b&(w^C))+R[8]+1770035416&4294967295,y=b+(E<<7&4294967295|E>>>25),E=C+(w^y&(b^w))+R[9]+2336552879&4294967295,C=y+(E<<12&4294967295|E>>>20),E=w+(b^C&(y^b))+R[10]+4294925233&4294967295,w=C+(E<<17&4294967295|E>>>15),E=b+(y^w&(C^y))+R[11]+2304563134&4294967295,b=w+(E<<22&4294967295|E>>>10),E=y+(C^b&(w^C))+R[12]+1804603682&4294967295,y=b+(E<<7&4294967295|E>>>25),E=C+(w^y&(b^w))+R[13]+4254626195&4294967295,C=y+(E<<12&4294967295|E>>>20),E=w+(b^C&(y^b))+R[14]+2792965006&4294967295,w=C+(E<<17&4294967295|E>>>15),E=b+(y^w&(C^y))+R[15]+1236535329&4294967295,b=w+(E<<22&4294967295|E>>>10),E=y+(w^C&(b^w))+R[1]+4129170786&4294967295,y=b+(E<<5&4294967295|E>>>27),E=C+(b^w&(y^b))+R[6]+3225465664&4294967295,C=y+(E<<9&4294967295|E>>>23),E=w+(y^b&(C^y))+R[11]+643717713&4294967295,w=C+(E<<14&4294967295|E>>>18),E=b+(C^y&(w^C))+R[0]+3921069994&4294967295,b=w+(E<<20&4294967295|E>>>12),E=y+(w^C&(b^w))+R[5]+3593408605&4294967295,y=b+(E<<5&4294967295|E>>>27),E=C+(b^w&(y^b))+R[10]+38016083&4294967295,C=y+(E<<9&4294967295|E>>>23),E=w+(y^b&(C^y))+R[15]+3634488961&4294967295,w=C+(E<<14&4294967295|E>>>18),E=b+(C^y&(w^C))+R[4]+3889429448&4294967295,b=w+(E<<20&4294967295|E>>>12),E=y+(w^C&(b^w))+R[9]+568446438&4294967295,y=b+(E<<5&4294967295|E>>>27),E=C+(b^w&(y^b))+R[14]+3275163606&4294967295,C=y+(E<<9&4294967295|E>>>23),E=w+(y^b&(C^y))+R[3]+4107603335&4294967295,w=C+(E<<14&4294967295|E>>>18),E=b+(C^y&(w^C))+R[8]+1163531501&4294967295,b=w+(E<<20&4294967295|E>>>12),E=y+(w^C&(b^w))+R[13]+2850285829&4294967295,y=b+(E<<5&4294967295|E>>>27),E=C+(b^w&(y^b))+R[2]+4243563512&4294967295,C=y+(E<<9&4294967295|E>>>23),E=w+(y^b&(C^y))+R[7]+1735328473&4294967295,w=C+(E<<14&4294967295|E>>>18),E=b+(C^y&(w^C))+R[12]+2368359562&4294967295,b=w+(E<<20&4294967295|E>>>12),E=y+(b^w^C)+R[5]+4294588738&4294967295,y=b+(E<<4&4294967295|E>>>28),E=C+(y^b^w)+R[8]+2272392833&4294967295,C=y+(E<<11&4294967295|E>>>21),E=w+(C^y^b)+R[11]+1839030562&4294967295,w=C+(E<<16&4294967295|E>>>16),E=b+(w^C^y)+R[14]+4259657740&4294967295,b=w+(E<<23&4294967295|E>>>9),E=y+(b^w^C)+R[1]+2763975236&4294967295,y=b+(E<<4&4294967295|E>>>28),E=C+(y^b^w)+R[4]+1272893353&4294967295,C=y+(E<<11&4294967295|E>>>21),E=w+(C^y^b)+R[7]+4139469664&4294967295,w=C+(E<<16&4294967295|E>>>16),E=b+(w^C^y)+R[10]+3200236656&4294967295,b=w+(E<<23&4294967295|E>>>9),E=y+(b^w^C)+R[13]+681279174&4294967295,y=b+(E<<4&4294967295|E>>>28),E=C+(y^b^w)+R[0]+3936430074&4294967295,C=y+(E<<11&4294967295|E>>>21),E=w+(C^y^b)+R[3]+3572445317&4294967295,w=C+(E<<16&4294967295|E>>>16),E=b+(w^C^y)+R[6]+76029189&4294967295,b=w+(E<<23&4294967295|E>>>9),E=y+(b^w^C)+R[9]+3654602809&4294967295,y=b+(E<<4&4294967295|E>>>28),E=C+(y^b^w)+R[12]+3873151461&4294967295,C=y+(E<<11&4294967295|E>>>21),E=w+(C^y^b)+R[15]+530742520&4294967295,w=C+(E<<16&4294967295|E>>>16),E=b+(w^C^y)+R[2]+3299628645&4294967295,b=w+(E<<23&4294967295|E>>>9),E=y+(w^(b|~C))+R[0]+4096336452&4294967295,y=b+(E<<6&4294967295|E>>>26),E=C+(b^(y|~w))+R[7]+1126891415&4294967295,C=y+(E<<10&4294967295|E>>>22),E=w+(y^(C|~b))+R[14]+2878612391&4294967295,w=C+(E<<15&4294967295|E>>>17),E=b+(C^(w|~y))+R[5]+4237533241&4294967295,b=w+(E<<21&4294967295|E>>>11),E=y+(w^(b|~C))+R[12]+1700485571&4294967295,y=b+(E<<6&4294967295|E>>>26),E=C+(b^(y|~w))+R[3]+2399980690&4294967295,C=y+(E<<10&4294967295|E>>>22),E=w+(y^(C|~b))+R[10]+4293915773&4294967295,w=C+(E<<15&4294967295|E>>>17),E=b+(C^(w|~y))+R[1]+2240044497&4294967295,b=w+(E<<21&4294967295|E>>>11),E=y+(w^(b|~C))+R[8]+1873313359&4294967295,y=b+(E<<6&4294967295|E>>>26),E=C+(b^(y|~w))+R[15]+4264355552&4294967295,C=y+(E<<10&4294967295|E>>>22),E=w+(y^(C|~b))+R[6]+2734768916&4294967295,w=C+(E<<15&4294967295|E>>>17),E=b+(C^(w|~y))+R[13]+1309151649&4294967295,b=w+(E<<21&4294967295|E>>>11),E=y+(w^(b|~C))+R[4]+4149444226&4294967295,y=b+(E<<6&4294967295|E>>>26),E=C+(b^(y|~w))+R[11]+3174756917&4294967295,C=y+(E<<10&4294967295|E>>>22),E=w+(y^(C|~b))+R[2]+718787259&4294967295,w=C+(E<<15&4294967295|E>>>17),E=b+(C^(w|~y))+R[9]+3951481745&4294967295,T.g[0]=T.g[0]+y&4294967295,T.g[1]=T.g[1]+(w+(E<<21&4294967295|E>>>11))&4294967295,T.g[2]=T.g[2]+w&4294967295,T.g[3]=T.g[3]+C&4294967295}r.prototype.u=function(T,y){y===void 0&&(y=T.length);for(var b=y-this.blockSize,R=this.B,w=this.h,C=0;C<y;){if(w==0)for(;C<=b;)s(this,T,C),C+=this.blockSize;if(typeof T=="string"){for(;C<y;)if(R[w++]=T.charCodeAt(C++),w==this.blockSize){s(this,R),w=0;break}}else for(;C<y;)if(R[w++]=T[C++],w==this.blockSize){s(this,R),w=0;break}}this.h=w,this.o+=y},r.prototype.v=function(){var T=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);T[0]=128;for(var y=1;y<T.length-8;++y)T[y]=0;var b=8*this.o;for(y=T.length-8;y<T.length;++y)T[y]=b&255,b/=256;for(this.u(T),T=Array(16),y=b=0;4>y;++y)for(var R=0;32>R;R+=8)T[b++]=this.g[y]>>>R&255;return T};function i(T,y){var b=c;return Object.prototype.hasOwnProperty.call(b,T)?b[T]:b[T]=y(T)}function o(T,y){this.h=y;for(var b=[],R=!0,w=T.length-1;0<=w;w--){var C=T[w]|0;R&&C==y||(b[w]=C,R=!1)}this.g=b}var c={};function u(T){return-128<=T&&128>T?i(T,function(y){return new o([y|0],0>y?-1:0)}):new o([T|0],0>T?-1:0)}function d(T){if(isNaN(T)||!isFinite(T))return p;if(0>T)return A(d(-T));for(var y=[],b=1,R=0;T>=b;R++)y[R]=T/b|0,b*=4294967296;return new o(y,0)}function f(T,y){if(T.length==0)throw Error("number format error: empty string");if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(T.charAt(0)=="-")return A(f(T.substring(1),y));if(0<=T.indexOf("-"))throw Error('number format error: interior "-" character');for(var b=d(Math.pow(y,8)),R=p,w=0;w<T.length;w+=8){var C=Math.min(8,T.length-w),E=parseInt(T.substring(w,w+C),y);8>C?(C=d(Math.pow(y,C)),R=R.j(C).add(d(E))):(R=R.j(b),R=R.add(d(E)))}return R}var p=u(0),g=u(1),v=u(16777216);n=o.prototype,n.m=function(){if(S(this))return-A(this).m();for(var T=0,y=1,b=0;b<this.g.length;b++){var R=this.i(b);T+=(0<=R?R:4294967296+R)*y,y*=4294967296}return T},n.toString=function(T){if(T=T||10,2>T||36<T)throw Error("radix out of range: "+T);if(I(this))return"0";if(S(this))return"-"+A(this).toString(T);for(var y=d(Math.pow(T,6)),b=this,R="";;){var w=F(b,y).g;b=O(b,w.j(y));var C=((0<b.g.length?b.g[0]:b.h)>>>0).toString(T);if(b=w,I(b))return C+R;for(;6>C.length;)C="0"+C;R=C+R}},n.i=function(T){return 0>T?0:T<this.g.length?this.g[T]:this.h};function I(T){if(T.h!=0)return!1;for(var y=0;y<T.g.length;y++)if(T.g[y]!=0)return!1;return!0}function S(T){return T.h==-1}n.l=function(T){return T=O(this,T),S(T)?-1:I(T)?0:1};function A(T){for(var y=T.g.length,b=[],R=0;R<y;R++)b[R]=~T.g[R];return new o(b,~T.h).add(g)}n.abs=function(){return S(this)?A(this):this},n.add=function(T){for(var y=Math.max(this.g.length,T.g.length),b=[],R=0,w=0;w<=y;w++){var C=R+(this.i(w)&65535)+(T.i(w)&65535),E=(C>>>16)+(this.i(w)>>>16)+(T.i(w)>>>16);R=E>>>16,C&=65535,E&=65535,b[w]=E<<16|C}return new o(b,b[b.length-1]&-2147483648?-1:0)};function O(T,y){return T.add(A(y))}n.j=function(T){if(I(this)||I(T))return p;if(S(this))return S(T)?A(this).j(A(T)):A(A(this).j(T));if(S(T))return A(this.j(A(T)));if(0>this.l(v)&&0>T.l(v))return d(this.m()*T.m());for(var y=this.g.length+T.g.length,b=[],R=0;R<2*y;R++)b[R]=0;for(R=0;R<this.g.length;R++)for(var w=0;w<T.g.length;w++){var C=this.i(R)>>>16,E=this.i(R)&65535,le=T.i(w)>>>16,fe=T.i(w)&65535;b[2*R+2*w]+=E*fe,k(b,2*R+2*w),b[2*R+2*w+1]+=C*fe,k(b,2*R+2*w+1),b[2*R+2*w+1]+=E*le,k(b,2*R+2*w+1),b[2*R+2*w+2]+=C*le,k(b,2*R+2*w+2)}for(R=0;R<y;R++)b[R]=b[2*R+1]<<16|b[2*R];for(R=y;R<2*y;R++)b[R]=0;return new o(b,0)};function k(T,y){for(;(T[y]&65535)!=T[y];)T[y+1]+=T[y]>>>16,T[y]&=65535,y++}function x(T,y){this.g=T,this.h=y}function F(T,y){if(I(y))throw Error("division by zero");if(I(T))return new x(p,p);if(S(T))return y=F(A(T),y),new x(A(y.g),A(y.h));if(S(y))return y=F(T,A(y)),new x(A(y.g),y.h);if(30<T.g.length){if(S(T)||S(y))throw Error("slowDivide_ only works with positive integers.");for(var b=g,R=y;0>=R.l(T);)b=P(b),R=P(R);var w=M(b,1),C=M(R,1);for(R=M(R,2),b=M(b,2);!I(R);){var E=C.add(R);0>=E.l(T)&&(w=w.add(b),C=E),R=M(R,1),b=M(b,1)}return y=O(T,w.j(y)),new x(w,y)}for(w=p;0<=T.l(y);){for(b=Math.max(1,Math.floor(T.m()/y.m())),R=Math.ceil(Math.log(b)/Math.LN2),R=48>=R?1:Math.pow(2,R-48),C=d(b),E=C.j(y);S(E)||0<E.l(T);)b-=R,C=d(b),E=C.j(y);I(C)&&(C=g),w=w.add(C),T=O(T,E)}return new x(w,T)}n.A=function(T){return F(this,T).h},n.and=function(T){for(var y=Math.max(this.g.length,T.g.length),b=[],R=0;R<y;R++)b[R]=this.i(R)&T.i(R);return new o(b,this.h&T.h)},n.or=function(T){for(var y=Math.max(this.g.length,T.g.length),b=[],R=0;R<y;R++)b[R]=this.i(R)|T.i(R);return new o(b,this.h|T.h)},n.xor=function(T){for(var y=Math.max(this.g.length,T.g.length),b=[],R=0;R<y;R++)b[R]=this.i(R)^T.i(R);return new o(b,this.h^T.h)};function P(T){for(var y=T.g.length+1,b=[],R=0;R<y;R++)b[R]=T.i(R)<<1|T.i(R-1)>>>31;return new o(b,T.h)}function M(T,y){var b=y>>5;y%=32;for(var R=T.g.length-b,w=[],C=0;C<R;C++)w[C]=0<y?T.i(C+b)>>>y|T.i(C+b+1)<<32-y:T.i(C+b);return new o(w,T.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,dg=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=d,o.fromString=f,Nn=o}).apply(typeof mf<"u"?mf:typeof self<"u"?self:typeof window<"u"?window:{});var Ro=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var hg,oi,fg,Wo,Al,pg,mg,gg;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,h,m){return a==Array.prototype||a==Object.prototype||(a[h]=m.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ro=="object"&&Ro];for(var h=0;h<a.length;++h){var m=a[h];if(m&&m.Math==Math)return m}throw Error("Cannot find global object")}var r=t(this);function s(a,h){if(h)e:{var m=r;a=a.split(".");for(var _=0;_<a.length-1;_++){var V=a[_];if(!(V in m))break e;m=m[V]}a=a[a.length-1],_=m[a],h=h(_),h!=_&&h!=null&&e(m,a,{configurable:!0,writable:!0,value:h})}}function i(a,h){a instanceof String&&(a+="");var m=0,_=!1,V={next:function(){if(!_&&m<a.length){var U=m++;return{value:h(U,a[U]),done:!1}}return _=!0,{done:!0,value:void 0}}};return V[Symbol.iterator]=function(){return V},V}s("Array.prototype.values",function(a){return a||function(){return i(this,function(h,m){return m})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},c=this||self;function u(a){var h=typeof a;return h=h!="object"?h:a?Array.isArray(a)?"array":h:"null",h=="array"||h=="object"&&typeof a.length=="number"}function d(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function f(a,h,m){return a.call.apply(a.bind,arguments)}function p(a,h,m){if(!a)throw Error();if(2<arguments.length){var _=Array.prototype.slice.call(arguments,2);return function(){var V=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(V,_),a.apply(h,V)}}return function(){return a.apply(h,arguments)}}function g(a,h,m){return g=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:p,g.apply(null,arguments)}function v(a,h){var m=Array.prototype.slice.call(arguments,1);return function(){var _=m.slice();return _.push.apply(_,arguments),a.apply(this,_)}}function I(a,h){function m(){}m.prototype=h.prototype,a.aa=h.prototype,a.prototype=new m,a.prototype.constructor=a,a.Qb=function(_,V,U){for(var Q=Array(arguments.length-2),ke=2;ke<arguments.length;ke++)Q[ke-2]=arguments[ke];return h.prototype[V].apply(_,Q)}}function S(a){const h=a.length;if(0<h){const m=Array(h);for(let _=0;_<h;_++)m[_]=a[_];return m}return[]}function A(a,h){for(let m=1;m<arguments.length;m++){const _=arguments[m];if(u(_)){const V=a.length||0,U=_.length||0;a.length=V+U;for(let Q=0;Q<U;Q++)a[V+Q]=_[Q]}else a.push(_)}}class O{constructor(h,m){this.i=h,this.j=m,this.h=0,this.g=null}get(){let h;return 0<this.h?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function k(a){return/^[\s\xa0]*$/.test(a)}function x(){var a=c.navigator;return a&&(a=a.userAgent)?a:""}function F(a){return F[" "](a),a}F[" "]=function(){};var P=x().indexOf("Gecko")!=-1&&!(x().toLowerCase().indexOf("webkit")!=-1&&x().indexOf("Edge")==-1)&&!(x().indexOf("Trident")!=-1||x().indexOf("MSIE")!=-1)&&x().indexOf("Edge")==-1;function M(a,h,m){for(const _ in a)h.call(m,a[_],_,a)}function T(a,h){for(const m in a)h.call(void 0,a[m],m,a)}function y(a){const h={};for(const m in a)h[m]=a[m];return h}const b="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function R(a,h){let m,_;for(let V=1;V<arguments.length;V++){_=arguments[V];for(m in _)a[m]=_[m];for(let U=0;U<b.length;U++)m=b[U],Object.prototype.hasOwnProperty.call(_,m)&&(a[m]=_[m])}}function w(a){var h=1;a=a.split(":");const m=[];for(;0<h&&a.length;)m.push(a.shift()),h--;return a.length&&m.push(a.join(":")),m}function C(a){c.setTimeout(()=>{throw a},0)}function E(){var a=N;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class le{constructor(){this.h=this.g=null}add(h,m){const _=fe.get();_.set(h,m),this.h?this.h.next=_:this.g=_,this.h=_}}var fe=new O(()=>new X,a=>a.reset());class X{constructor(){this.next=this.g=this.h=null}set(h,m){this.h=h,this.g=m,this.next=null}reset(){this.next=this.g=this.h=null}}let ye,Be=!1,N=new le,H=()=>{const a=c.Promise.resolve(void 0);ye=()=>{a.then(z)}};var z=()=>{for(var a;a=E();){try{a.h.call(a.g)}catch(m){C(m)}var h=fe;h.j(a),100>h.h&&(h.h++,a.next=h.g,h.g=a)}Be=!1};function Z(){this.s=this.s,this.C=this.C}Z.prototype.s=!1,Z.prototype.ma=function(){this.s||(this.s=!0,this.N())},Z.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function G(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}G.prototype.h=function(){this.defaultPrevented=!0};var he=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const m=()=>{};c.addEventListener("test",m,h),c.removeEventListener("test",m,h)}catch{}return a}();function L(a,h){if(G.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var m=this.type=a.type,_=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget){if(P){e:{try{F(h.nodeName);var V=!0;break e}catch{}V=!1}V||(h=null)}}else m=="mouseover"?h=a.fromElement:m=="mouseout"&&(h=a.toElement);this.relatedTarget=h,_?(this.clientX=_.clientX!==void 0?_.clientX:_.pageX,this.clientY=_.clientY!==void 0?_.clientY:_.pageY,this.screenX=_.screenX||0,this.screenY=_.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:$[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&L.aa.h.call(this)}}I(L,G);var $={2:"touch",3:"pen",4:"mouse"};L.prototype.h=function(){L.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Y="closure_listenable_"+(1e6*Math.random()|0),ce=0;function se(a,h,m,_,V){this.listener=a,this.proxy=null,this.src=h,this.type=m,this.capture=!!_,this.ha=V,this.key=++ce,this.da=this.fa=!1}function re(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Se(a){this.src=a,this.g={},this.h=0}Se.prototype.add=function(a,h,m,_,V){var U=a.toString();a=this.g[U],a||(a=this.g[U]=[],this.h++);var Q=$e(a,h,_,V);return-1<Q?(h=a[Q],m||(h.fa=!1)):(h=new se(h,this.src,U,!!_,V),h.fa=m,a.push(h)),h};function Ne(a,h){var m=h.type;if(m in a.g){var _=a.g[m],V=Array.prototype.indexOf.call(_,h,void 0),U;(U=0<=V)&&Array.prototype.splice.call(_,V,1),U&&(re(h),a.g[m].length==0&&(delete a.g[m],a.h--))}}function $e(a,h,m,_){for(var V=0;V<a.length;++V){var U=a[V];if(!U.da&&U.listener==h&&U.capture==!!m&&U.ha==_)return V}return-1}var ct="closure_lm_"+(1e6*Math.random()|0),Gn={};function Hn(a,h,m,_,V){if(Array.isArray(h)){for(var U=0;U<h.length;U++)Hn(a,h[U],m,_,V);return null}return m=qd(m),a&&a[Y]?a.K(h,m,d(_)?!!_.capture:!1,V):Ms(a,h,m,!1,_,V)}function Ms(a,h,m,_,V,U){if(!h)throw Error("Invalid event type");var Q=d(V)?!!V.capture:!!V,ke=xc(a);if(ke||(a[ct]=ke=new Se(a)),m=ke.add(h,m,_,Q,U),m.proxy)return m;if(_=By(),m.proxy=_,_.src=a,_.listener=m,a.addEventListener)he||(V=Q),V===void 0&&(V=!1),a.addEventListener(h.toString(),_,V);else if(a.attachEvent)a.attachEvent($d(h.toString()),_);else if(a.addListener&&a.removeListener)a.addListener(_);else throw Error("addEventListener and attachEvent are unavailable.");return m}function By(){function a(m){return h.call(a.src,a.listener,m)}const h=$y;return a}function Bd(a,h,m,_,V){if(Array.isArray(h))for(var U=0;U<h.length;U++)Bd(a,h[U],m,_,V);else _=d(_)?!!_.capture:!!_,m=qd(m),a&&a[Y]?(a=a.i,h=String(h).toString(),h in a.g&&(U=a.g[h],m=$e(U,m,_,V),-1<m&&(re(U[m]),Array.prototype.splice.call(U,m,1),U.length==0&&(delete a.g[h],a.h--)))):a&&(a=xc(a))&&(h=a.g[h.toString()],a=-1,h&&(a=$e(h,m,_,V)),(m=-1<a?h[a]:null)&&Pc(m))}function Pc(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[Y])Ne(h.i,a);else{var m=a.type,_=a.proxy;h.removeEventListener?h.removeEventListener(m,_,a.capture):h.detachEvent?h.detachEvent($d(m),_):h.addListener&&h.removeListener&&h.removeListener(_),(m=xc(h))?(Ne(m,a),m.h==0&&(m.src=null,h[ct]=null)):re(a)}}}function $d(a){return a in Gn?Gn[a]:Gn[a]="on"+a}function $y(a,h){if(a.da)a=!0;else{h=new L(h,this);var m=a.listener,_=a.ha||a.src;a.fa&&Pc(a),a=m.call(_,h)}return a}function xc(a){return a=a[ct],a instanceof Se?a:null}var Nc="__closure_events_fn_"+(1e9*Math.random()>>>0);function qd(a){return typeof a=="function"?a:(a[Nc]||(a[Nc]=function(h){return a.handleEvent(h)}),a[Nc])}function Ze(){Z.call(this),this.i=new Se(this),this.M=this,this.F=null}I(Ze,Z),Ze.prototype[Y]=!0,Ze.prototype.removeEventListener=function(a,h,m,_){Bd(this,a,h,m,_)};function lt(a,h){var m,_=a.F;if(_)for(m=[];_;_=_.F)m.push(_);if(a=a.M,_=h.type||h,typeof h=="string")h=new G(h,a);else if(h instanceof G)h.target=h.target||a;else{var V=h;h=new G(_,a),R(h,V)}if(V=!0,m)for(var U=m.length-1;0<=U;U--){var Q=h.g=m[U];V=co(Q,_,!0,h)&&V}if(Q=h.g=a,V=co(Q,_,!0,h)&&V,V=co(Q,_,!1,h)&&V,m)for(U=0;U<m.length;U++)Q=h.g=m[U],V=co(Q,_,!1,h)&&V}Ze.prototype.N=function(){if(Ze.aa.N.call(this),this.i){var a=this.i,h;for(h in a.g){for(var m=a.g[h],_=0;_<m.length;_++)re(m[_]);delete a.g[h],a.h--}}this.F=null},Ze.prototype.K=function(a,h,m,_){return this.i.add(String(a),h,!1,m,_)},Ze.prototype.L=function(a,h,m,_){return this.i.add(String(a),h,!0,m,_)};function co(a,h,m,_){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();for(var V=!0,U=0;U<h.length;++U){var Q=h[U];if(Q&&!Q.da&&Q.capture==m){var ke=Q.listener,Qe=Q.ha||Q.src;Q.fa&&Ne(a.i,Q),V=ke.call(Qe,_)!==!1&&V}}return V&&!_.defaultPrevented}function jd(a,h,m){if(typeof a=="function")m&&(a=g(a,m));else if(a&&typeof a.handleEvent=="function")a=g(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(h)?-1:c.setTimeout(a,h||0)}function zd(a){a.g=jd(()=>{a.g=null,a.i&&(a.i=!1,zd(a))},a.l);const h=a.h;a.h=null,a.m.apply(null,h)}class qy extends Z{constructor(h,m){super(),this.m=h,this.l=m,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:zd(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Fs(a){Z.call(this),this.h=a,this.g={}}I(Fs,Z);var Gd=[];function Hd(a){M(a.g,function(h,m){this.g.hasOwnProperty(m)&&Pc(h)},a),a.g={}}Fs.prototype.N=function(){Fs.aa.N.call(this),Hd(this)},Fs.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Dc=c.JSON.stringify,jy=c.JSON.parse,zy=class{stringify(a){return c.JSON.stringify(a,void 0)}parse(a){return c.JSON.parse(a,void 0)}};function Vc(){}Vc.prototype.h=null;function Kd(a){return a.h||(a.h=a.i())}function Wd(){}var Us={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Oc(){G.call(this,"d")}I(Oc,G);function Lc(){G.call(this,"c")}I(Lc,G);var Kn={},Qd=null;function lo(){return Qd=Qd||new Ze}Kn.La="serverreachability";function Yd(a){G.call(this,Kn.La,a)}I(Yd,G);function Bs(a){const h=lo();lt(h,new Yd(h))}Kn.STAT_EVENT="statevent";function Jd(a,h){G.call(this,Kn.STAT_EVENT,a),this.stat=h}I(Jd,G);function ut(a){const h=lo();lt(h,new Jd(h,a))}Kn.Ma="timingevent";function Xd(a,h){G.call(this,Kn.Ma,a),this.size=h}I(Xd,G);function $s(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){a()},h)}function qs(){this.g=!0}qs.prototype.xa=function(){this.g=!1};function Gy(a,h,m,_,V,U){a.info(function(){if(a.g)if(U)for(var Q="",ke=U.split("&"),Qe=0;Qe<ke.length;Qe++){var be=ke[Qe].split("=");if(1<be.length){var et=be[0];be=be[1];var tt=et.split("_");Q=2<=tt.length&&tt[1]=="type"?Q+(et+"="+be+"&"):Q+(et+"=redacted&")}}else Q=null;else Q=U;return"XMLHTTP REQ ("+_+") [attempt "+V+"]: "+h+`
`+m+`
`+Q})}function Hy(a,h,m,_,V,U,Q){a.info(function(){return"XMLHTTP RESP ("+_+") [ attempt "+V+"]: "+h+`
`+m+`
`+U+" "+Q})}function Ur(a,h,m,_){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+Wy(a,m)+(_?" "+_:"")})}function Ky(a,h){a.info(function(){return"TIMEOUT: "+h})}qs.prototype.info=function(){};function Wy(a,h){if(!a.g)return h;if(!h)return null;try{var m=JSON.parse(h);if(m){for(a=0;a<m.length;a++)if(Array.isArray(m[a])){var _=m[a];if(!(2>_.length)){var V=_[1];if(Array.isArray(V)&&!(1>V.length)){var U=V[0];if(U!="noop"&&U!="stop"&&U!="close")for(var Q=1;Q<V.length;Q++)V[Q]=""}}}}return Dc(m)}catch{return h}}var uo={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Zd={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Mc;function ho(){}I(ho,Vc),ho.prototype.g=function(){return new XMLHttpRequest},ho.prototype.i=function(){return{}},Mc=new ho;function pn(a,h,m,_){this.j=a,this.i=h,this.l=m,this.R=_||1,this.U=new Fs(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new eh}function eh(){this.i=null,this.g="",this.h=!1}var th={},Fc={};function Uc(a,h,m){a.L=1,a.v=go(Zt(h)),a.m=m,a.P=!0,nh(a,null)}function nh(a,h){a.F=Date.now(),fo(a),a.A=Zt(a.v);var m=a.A,_=a.R;Array.isArray(_)||(_=[String(_)]),gh(m.i,"t",_),a.C=0,m=a.j.J,a.h=new eh,a.g=Vh(a.j,m?h:null,!a.m),0<a.O&&(a.M=new qy(g(a.Y,a,a.g),a.O)),h=a.U,m=a.g,_=a.ca;var V="readystatechange";Array.isArray(V)||(V&&(Gd[0]=V.toString()),V=Gd);for(var U=0;U<V.length;U++){var Q=Hn(m,V[U],_||h.handleEvent,!1,h.h||h);if(!Q)break;h.g[Q.key]=Q}h=a.H?y(a.H):{},a.m?(a.u||(a.u="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,h)):(a.u="GET",a.g.ea(a.A,a.u,null,h)),Bs(),Gy(a.i,a.u,a.A,a.l,a.R,a.m)}pn.prototype.ca=function(a){a=a.target;const h=this.M;h&&en(a)==3?h.j():this.Y(a)},pn.prototype.Y=function(a){try{if(a==this.g)e:{const tt=en(this.g);var h=this.g.Ba();const qr=this.g.Z();if(!(3>tt)&&(tt!=3||this.g&&(this.h.h||this.g.oa()||Eh(this.g)))){this.J||tt!=4||h==7||(h==8||0>=qr?Bs(3):Bs(2)),Bc(this);var m=this.g.Z();this.X=m;t:if(rh(this)){var _=Eh(this.g);a="";var V=_.length,U=en(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Wn(this),js(this);var Q="";break t}this.h.i=new c.TextDecoder}for(h=0;h<V;h++)this.h.h=!0,a+=this.h.i.decode(_[h],{stream:!(U&&h==V-1)});_.length=0,this.h.g+=a,this.C=0,Q=this.h.g}else Q=this.g.oa();if(this.o=m==200,Hy(this.i,this.u,this.A,this.l,this.R,tt,m),this.o){if(this.T&&!this.K){t:{if(this.g){var ke,Qe=this.g;if((ke=Qe.g?Qe.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!k(ke)){var be=ke;break t}}be=null}if(m=be)Ur(this.i,this.l,m,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,$c(this,m);else{this.o=!1,this.s=3,ut(12),Wn(this),js(this);break e}}if(this.P){m=!0;let Nt;for(;!this.J&&this.C<Q.length;)if(Nt=Qy(this,Q),Nt==Fc){tt==4&&(this.s=4,ut(14),m=!1),Ur(this.i,this.l,null,"[Incomplete Response]");break}else if(Nt==th){this.s=4,ut(15),Ur(this.i,this.l,Q,"[Invalid Chunk]"),m=!1;break}else Ur(this.i,this.l,Nt,null),$c(this,Nt);if(rh(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),tt!=4||Q.length!=0||this.h.h||(this.s=1,ut(16),m=!1),this.o=this.o&&m,!m)Ur(this.i,this.l,Q,"[Invalid Chunked Response]"),Wn(this),js(this);else if(0<Q.length&&!this.W){this.W=!0;var et=this.j;et.g==this&&et.ba&&!et.M&&(et.j.info("Great, no buffering proxy detected. Bytes received: "+Q.length),Kc(et),et.M=!0,ut(11))}}else Ur(this.i,this.l,Q,null),$c(this,Q);tt==4&&Wn(this),this.o&&!this.J&&(tt==4?Ph(this.j,this):(this.o=!1,fo(this)))}else hb(this.g),m==400&&0<Q.indexOf("Unknown SID")?(this.s=3,ut(12)):(this.s=0,ut(13)),Wn(this),js(this)}}}catch{}finally{}};function rh(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function Qy(a,h){var m=a.C,_=h.indexOf(`
`,m);return _==-1?Fc:(m=Number(h.substring(m,_)),isNaN(m)?th:(_+=1,_+m>h.length?Fc:(h=h.slice(_,_+m),a.C=_+m,h)))}pn.prototype.cancel=function(){this.J=!0,Wn(this)};function fo(a){a.S=Date.now()+a.I,sh(a,a.I)}function sh(a,h){if(a.B!=null)throw Error("WatchDog timer not null");a.B=$s(g(a.ba,a),h)}function Bc(a){a.B&&(c.clearTimeout(a.B),a.B=null)}pn.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(Ky(this.i,this.A),this.L!=2&&(Bs(),ut(17)),Wn(this),this.s=2,js(this)):sh(this,this.S-a)};function js(a){a.j.G==0||a.J||Ph(a.j,a)}function Wn(a){Bc(a);var h=a.M;h&&typeof h.ma=="function"&&h.ma(),a.M=null,Hd(a.U),a.g&&(h=a.g,a.g=null,h.abort(),h.ma())}function $c(a,h){try{var m=a.j;if(m.G!=0&&(m.g==a||qc(m.h,a))){if(!a.K&&qc(m.h,a)&&m.G==3){try{var _=m.Da.g.parse(h)}catch{_=null}if(Array.isArray(_)&&_.length==3){var V=_;if(V[0]==0){e:if(!m.u){if(m.g)if(m.g.F+3e3<a.F)Io(m),bo(m);else break e;Hc(m),ut(18)}}else m.za=V[1],0<m.za-m.T&&37500>V[2]&&m.F&&m.v==0&&!m.C&&(m.C=$s(g(m.Za,m),6e3));if(1>=ah(m.h)&&m.ca){try{m.ca()}catch{}m.ca=void 0}}else Yn(m,11)}else if((a.K||m.g==a)&&Io(m),!k(h))for(V=m.Da.g.parse(h),h=0;h<V.length;h++){let be=V[h];if(m.T=be[0],be=be[1],m.G==2)if(be[0]=="c"){m.K=be[1],m.ia=be[2];const et=be[3];et!=null&&(m.la=et,m.j.info("VER="+m.la));const tt=be[4];tt!=null&&(m.Aa=tt,m.j.info("SVER="+m.Aa));const qr=be[5];qr!=null&&typeof qr=="number"&&0<qr&&(_=1.5*qr,m.L=_,m.j.info("backChannelRequestTimeoutMs_="+_)),_=m;const Nt=a.g;if(Nt){const To=Nt.g?Nt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(To){var U=_.h;U.g||To.indexOf("spdy")==-1&&To.indexOf("quic")==-1&&To.indexOf("h2")==-1||(U.j=U.l,U.g=new Set,U.h&&(jc(U,U.h),U.h=null))}if(_.D){const Wc=Nt.g?Nt.g.getResponseHeader("X-HTTP-Session-Id"):null;Wc&&(_.ya=Wc,Ce(_.I,_.D,Wc))}}m.G=3,m.l&&m.l.ua(),m.ba&&(m.R=Date.now()-a.F,m.j.info("Handshake RTT: "+m.R+"ms")),_=m;var Q=a;if(_.qa=Dh(_,_.J?_.ia:null,_.W),Q.K){ch(_.h,Q);var ke=Q,Qe=_.L;Qe&&(ke.I=Qe),ke.B&&(Bc(ke),fo(ke)),_.g=Q}else kh(_);0<m.i.length&&wo(m)}else be[0]!="stop"&&be[0]!="close"||Yn(m,7);else m.G==3&&(be[0]=="stop"||be[0]=="close"?be[0]=="stop"?Yn(m,7):Gc(m):be[0]!="noop"&&m.l&&m.l.ta(be),m.v=0)}}Bs(4)}catch{}}var Yy=class{constructor(a,h){this.g=a,this.map=h}};function ih(a){this.l=a||10,c.PerformanceNavigationTiming?(a=c.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function oh(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function ah(a){return a.h?1:a.g?a.g.size:0}function qc(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function jc(a,h){a.g?a.g.add(h):a.h=h}function ch(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}ih.prototype.cancel=function(){if(this.i=lh(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function lh(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let h=a.i;for(const m of a.g.values())h=h.concat(m.D);return h}return S(a.i)}function Jy(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(u(a)){for(var h=[],m=a.length,_=0;_<m;_++)h.push(a[_]);return h}h=[],m=0;for(_ in a)h[m++]=a[_];return h}function Xy(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(u(a)||typeof a=="string"){var h=[];a=a.length;for(var m=0;m<a;m++)h.push(m);return h}h=[],m=0;for(const _ in a)h[m++]=_;return h}}}function uh(a,h){if(a.forEach&&typeof a.forEach=="function")a.forEach(h,void 0);else if(u(a)||typeof a=="string")Array.prototype.forEach.call(a,h,void 0);else for(var m=Xy(a),_=Jy(a),V=_.length,U=0;U<V;U++)h.call(void 0,_[U],m&&m[U],a)}var dh=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Zy(a,h){if(a){a=a.split("&");for(var m=0;m<a.length;m++){var _=a[m].indexOf("="),V=null;if(0<=_){var U=a[m].substring(0,_);V=a[m].substring(_+1)}else U=a[m];h(U,V?decodeURIComponent(V.replace(/\+/g," ")):"")}}}function Qn(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof Qn){this.h=a.h,po(this,a.j),this.o=a.o,this.g=a.g,mo(this,a.s),this.l=a.l;var h=a.i,m=new Hs;m.i=h.i,h.g&&(m.g=new Map(h.g),m.h=h.h),hh(this,m),this.m=a.m}else a&&(h=String(a).match(dh))?(this.h=!1,po(this,h[1]||"",!0),this.o=zs(h[2]||""),this.g=zs(h[3]||"",!0),mo(this,h[4]),this.l=zs(h[5]||"",!0),hh(this,h[6]||"",!0),this.m=zs(h[7]||"")):(this.h=!1,this.i=new Hs(null,this.h))}Qn.prototype.toString=function(){var a=[],h=this.j;h&&a.push(Gs(h,fh,!0),":");var m=this.g;return(m||h=="file")&&(a.push("//"),(h=this.o)&&a.push(Gs(h,fh,!0),"@"),a.push(encodeURIComponent(String(m)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),m=this.s,m!=null&&a.push(":",String(m))),(m=this.l)&&(this.g&&m.charAt(0)!="/"&&a.push("/"),a.push(Gs(m,m.charAt(0)=="/"?nb:tb,!0))),(m=this.i.toString())&&a.push("?",m),(m=this.m)&&a.push("#",Gs(m,sb)),a.join("")};function Zt(a){return new Qn(a)}function po(a,h,m){a.j=m?zs(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function mo(a,h){if(h){if(h=Number(h),isNaN(h)||0>h)throw Error("Bad port number "+h);a.s=h}else a.s=null}function hh(a,h,m){h instanceof Hs?(a.i=h,ib(a.i,a.h)):(m||(h=Gs(h,rb)),a.i=new Hs(h,a.h))}function Ce(a,h,m){a.i.set(h,m)}function go(a){return Ce(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function zs(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Gs(a,h,m){return typeof a=="string"?(a=encodeURI(a).replace(h,eb),m&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function eb(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var fh=/[#\/\?@]/g,tb=/[#\?:]/g,nb=/[#\?]/g,rb=/[#\?@]/g,sb=/#/g;function Hs(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function mn(a){a.g||(a.g=new Map,a.h=0,a.i&&Zy(a.i,function(h,m){a.add(decodeURIComponent(h.replace(/\+/g," ")),m)}))}n=Hs.prototype,n.add=function(a,h){mn(this),this.i=null,a=Br(this,a);var m=this.g.get(a);return m||this.g.set(a,m=[]),m.push(h),this.h+=1,this};function ph(a,h){mn(a),h=Br(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function mh(a,h){return mn(a),h=Br(a,h),a.g.has(h)}n.forEach=function(a,h){mn(this),this.g.forEach(function(m,_){m.forEach(function(V){a.call(h,V,_,this)},this)},this)},n.na=function(){mn(this);const a=Array.from(this.g.values()),h=Array.from(this.g.keys()),m=[];for(let _=0;_<h.length;_++){const V=a[_];for(let U=0;U<V.length;U++)m.push(h[_])}return m},n.V=function(a){mn(this);let h=[];if(typeof a=="string")mh(this,a)&&(h=h.concat(this.g.get(Br(this,a))));else{a=Array.from(this.g.values());for(let m=0;m<a.length;m++)h=h.concat(a[m])}return h},n.set=function(a,h){return mn(this),this.i=null,a=Br(this,a),mh(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},n.get=function(a,h){return a?(a=this.V(a),0<a.length?String(a[0]):h):h};function gh(a,h,m){ph(a,h),0<m.length&&(a.i=null,a.g.set(Br(a,h),S(m)),a.h+=m.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],h=Array.from(this.g.keys());for(var m=0;m<h.length;m++){var _=h[m];const U=encodeURIComponent(String(_)),Q=this.V(_);for(_=0;_<Q.length;_++){var V=U;Q[_]!==""&&(V+="="+encodeURIComponent(String(Q[_]))),a.push(V)}}return this.i=a.join("&")};function Br(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function ib(a,h){h&&!a.j&&(mn(a),a.i=null,a.g.forEach(function(m,_){var V=_.toLowerCase();_!=V&&(ph(this,_),gh(this,V,m))},a)),a.j=h}function ob(a,h){const m=new qs;if(c.Image){const _=new Image;_.onload=v(gn,m,"TestLoadImage: loaded",!0,h,_),_.onerror=v(gn,m,"TestLoadImage: error",!1,h,_),_.onabort=v(gn,m,"TestLoadImage: abort",!1,h,_),_.ontimeout=v(gn,m,"TestLoadImage: timeout",!1,h,_),c.setTimeout(function(){_.ontimeout&&_.ontimeout()},1e4),_.src=a}else h(!1)}function ab(a,h){const m=new qs,_=new AbortController,V=setTimeout(()=>{_.abort(),gn(m,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:_.signal}).then(U=>{clearTimeout(V),U.ok?gn(m,"TestPingServer: ok",!0,h):gn(m,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(V),gn(m,"TestPingServer: error",!1,h)})}function gn(a,h,m,_,V){try{V&&(V.onload=null,V.onerror=null,V.onabort=null,V.ontimeout=null),_(m)}catch{}}function cb(){this.g=new zy}function lb(a,h,m){const _=m||"";try{uh(a,function(V,U){let Q=V;d(V)&&(Q=Dc(V)),h.push(_+U+"="+encodeURIComponent(Q))})}catch(V){throw h.push(_+"type="+encodeURIComponent("_badmap")),V}}function _o(a){this.l=a.Ub||null,this.j=a.eb||!1}I(_o,Vc),_o.prototype.g=function(){return new vo(this.l,this.j)},_o.prototype.i=function(a){return function(){return a}}({});function vo(a,h){Ze.call(this),this.D=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}I(vo,Ze),n=vo.prototype,n.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=h,this.readyState=1,Ws(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const h={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(h.body=a),(this.D||c).fetch(new Request(this.A,h)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Ks(this)),this.readyState=0},n.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Ws(this)),this.g&&(this.readyState=3,Ws(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;_h(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function _h(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}n.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.v.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?Ks(this):Ws(this),this.readyState==3&&_h(this)}},n.Ra=function(a){this.g&&(this.response=this.responseText=a,Ks(this))},n.Qa=function(a){this.g&&(this.response=a,Ks(this))},n.ga=function(){this.g&&Ks(this)};function Ks(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Ws(a)}n.setRequestHeader=function(a,h){this.u.append(a,h)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],h=this.h.entries();for(var m=h.next();!m.done;)m=m.value,a.push(m[0]+": "+m[1]),m=h.next();return a.join(`\r
`)};function Ws(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(vo.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function vh(a){let h="";return M(a,function(m,_){h+=_,h+=":",h+=m,h+=`\r
`}),h}function zc(a,h,m){e:{for(_ in m){var _=!1;break e}_=!0}_||(m=vh(m),typeof a=="string"?m!=null&&encodeURIComponent(String(m)):Ce(a,h,m))}function Le(a){Ze.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}I(Le,Ze);var ub=/^https?$/i,db=["POST","PUT"];n=Le.prototype,n.Ha=function(a){this.J=a},n.ea=function(a,h,m,_){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Mc.g(),this.v=this.o?Kd(this.o):Kd(Mc),this.g.onreadystatechange=g(this.Ea,this);try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(U){yh(this,U);return}if(a=m||"",m=new Map(this.headers),_)if(Object.getPrototypeOf(_)===Object.prototype)for(var V in _)m.set(V,_[V]);else if(typeof _.keys=="function"&&typeof _.get=="function")for(const U of _.keys())m.set(U,_.get(U));else throw Error("Unknown input type for opt_headers: "+String(_));_=Array.from(m.keys()).find(U=>U.toLowerCase()=="content-type"),V=c.FormData&&a instanceof c.FormData,!(0<=Array.prototype.indexOf.call(db,h,void 0))||_||V||m.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[U,Q]of m)this.g.setRequestHeader(U,Q);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Ih(this),this.u=!0,this.g.send(a),this.u=!1}catch(U){yh(this,U)}};function yh(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.m=5,bh(a),yo(a)}function bh(a){a.A||(a.A=!0,lt(a,"complete"),lt(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,lt(this,"complete"),lt(this,"abort"),yo(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),yo(this,!0)),Le.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?wh(this):this.bb())},n.bb=function(){wh(this)};function wh(a){if(a.h&&typeof o<"u"&&(!a.v[1]||en(a)!=4||a.Z()!=2)){if(a.u&&en(a)==4)jd(a.Ea,0,a);else if(lt(a,"readystatechange"),en(a)==4){a.h=!1;try{const Q=a.Z();e:switch(Q){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var m;if(!(m=h)){var _;if(_=Q===0){var V=String(a.D).match(dh)[1]||null;!V&&c.self&&c.self.location&&(V=c.self.location.protocol.slice(0,-1)),_=!ub.test(V?V.toLowerCase():"")}m=_}if(m)lt(a,"complete"),lt(a,"success");else{a.m=6;try{var U=2<en(a)?a.g.statusText:""}catch{U=""}a.l=U+" ["+a.Z()+"]",bh(a)}}finally{yo(a)}}}}function yo(a,h){if(a.g){Ih(a);const m=a.g,_=a.v[0]?()=>{}:null;a.g=null,a.v=null,h||lt(a,"ready");try{m.onreadystatechange=_}catch{}}}function Ih(a){a.I&&(c.clearTimeout(a.I),a.I=null)}n.isActive=function(){return!!this.g};function en(a){return a.g?a.g.readyState:0}n.Z=function(){try{return 2<en(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),jy(h)}};function Eh(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function hb(a){const h={};a=(a.g&&2<=en(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let _=0;_<a.length;_++){if(k(a[_]))continue;var m=w(a[_]);const V=m[0];if(m=m[1],typeof m!="string")continue;m=m.trim();const U=h[V]||[];h[V]=U,U.push(m)}T(h,function(_){return _.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Qs(a,h,m){return m&&m.internalChannelParams&&m.internalChannelParams[a]||h}function Th(a){this.Aa=0,this.i=[],this.j=new qs,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Qs("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Qs("baseRetryDelayMs",5e3,a),this.cb=Qs("retryDelaySeedMs",1e4,a),this.Wa=Qs("forwardChannelMaxRetries",2,a),this.wa=Qs("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new ih(a&&a.concurrentRequestLimit),this.Da=new cb,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Th.prototype,n.la=8,n.G=1,n.connect=function(a,h,m,_){ut(0),this.W=a,this.H=h||{},m&&_!==void 0&&(this.H.OSID=m,this.H.OAID=_),this.F=this.X,this.I=Dh(this,null,this.W),wo(this)};function Gc(a){if(Ah(a),a.G==3){var h=a.U++,m=Zt(a.I);if(Ce(m,"SID",a.K),Ce(m,"RID",h),Ce(m,"TYPE","terminate"),Ys(a,m),h=new pn(a,a.j,h),h.L=2,h.v=go(Zt(m)),m=!1,c.navigator&&c.navigator.sendBeacon)try{m=c.navigator.sendBeacon(h.v.toString(),"")}catch{}!m&&c.Image&&(new Image().src=h.v,m=!0),m||(h.g=Vh(h.j,null),h.g.ea(h.v)),h.F=Date.now(),fo(h)}Nh(a)}function bo(a){a.g&&(Kc(a),a.g.cancel(),a.g=null)}function Ah(a){bo(a),a.u&&(c.clearTimeout(a.u),a.u=null),Io(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&c.clearTimeout(a.s),a.s=null)}function wo(a){if(!oh(a.h)&&!a.s){a.s=!0;var h=a.Ga;ye||H(),Be||(ye(),Be=!0),N.add(h,a),a.B=0}}function fb(a,h){return ah(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=h.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=$s(g(a.Ga,a,h),xh(a,a.B)),a.B++,!0)}n.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const V=new pn(this,this.j,a);let U=this.o;if(this.S&&(U?(U=y(U),R(U,this.S)):U=this.S),this.m!==null||this.O||(V.H=U,U=null),this.P)e:{for(var h=0,m=0;m<this.i.length;m++){t:{var _=this.i[m];if("__data__"in _.map&&(_=_.map.__data__,typeof _=="string")){_=_.length;break t}_=void 0}if(_===void 0)break;if(h+=_,4096<h){h=m;break e}if(h===4096||m===this.i.length-1){h=m+1;break e}}h=1e3}else h=1e3;h=Sh(this,V,h),m=Zt(this.I),Ce(m,"RID",a),Ce(m,"CVER",22),this.D&&Ce(m,"X-HTTP-Session-Id",this.D),Ys(this,m),U&&(this.O?h="headers="+encodeURIComponent(String(vh(U)))+"&"+h:this.m&&zc(m,this.m,U)),jc(this.h,V),this.Ua&&Ce(m,"TYPE","init"),this.P?(Ce(m,"$req",h),Ce(m,"SID","null"),V.T=!0,Uc(V,m,null)):Uc(V,m,h),this.G=2}}else this.G==3&&(a?Rh(this,a):this.i.length==0||oh(this.h)||Rh(this))};function Rh(a,h){var m;h?m=h.l:m=a.U++;const _=Zt(a.I);Ce(_,"SID",a.K),Ce(_,"RID",m),Ce(_,"AID",a.T),Ys(a,_),a.m&&a.o&&zc(_,a.m,a.o),m=new pn(a,a.j,m,a.B+1),a.m===null&&(m.H=a.o),h&&(a.i=h.D.concat(a.i)),h=Sh(a,m,1e3),m.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),jc(a.h,m),Uc(m,_,h)}function Ys(a,h){a.H&&M(a.H,function(m,_){Ce(h,_,m)}),a.l&&uh({},function(m,_){Ce(h,_,m)})}function Sh(a,h,m){m=Math.min(a.i.length,m);var _=a.l?g(a.l.Na,a.l,a):null;e:{var V=a.i;let U=-1;for(;;){const Q=["count="+m];U==-1?0<m?(U=V[0].g,Q.push("ofs="+U)):U=0:Q.push("ofs="+U);let ke=!0;for(let Qe=0;Qe<m;Qe++){let be=V[Qe].g;const et=V[Qe].map;if(be-=U,0>be)U=Math.max(0,V[Qe].g-100),ke=!1;else try{lb(et,Q,"req"+be+"_")}catch{_&&_(et)}}if(ke){_=Q.join("&");break e}}}return a=a.i.splice(0,m),h.D=a,_}function kh(a){if(!a.g&&!a.u){a.Y=1;var h=a.Fa;ye||H(),Be||(ye(),Be=!0),N.add(h,a),a.v=0}}function Hc(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=$s(g(a.Fa,a),xh(a,a.v)),a.v++,!0)}n.Fa=function(){if(this.u=null,Ch(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=$s(g(this.ab,this),a)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,ut(10),bo(this),Ch(this))};function Kc(a){a.A!=null&&(c.clearTimeout(a.A),a.A=null)}function Ch(a){a.g=new pn(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var h=Zt(a.qa);Ce(h,"RID","rpc"),Ce(h,"SID",a.K),Ce(h,"AID",a.T),Ce(h,"CI",a.F?"0":"1"),!a.F&&a.ja&&Ce(h,"TO",a.ja),Ce(h,"TYPE","xmlhttp"),Ys(a,h),a.m&&a.o&&zc(h,a.m,a.o),a.L&&(a.g.I=a.L);var m=a.g;a=a.ia,m.L=1,m.v=go(Zt(h)),m.m=null,m.P=!0,nh(m,a)}n.Za=function(){this.C!=null&&(this.C=null,bo(this),Hc(this),ut(19))};function Io(a){a.C!=null&&(c.clearTimeout(a.C),a.C=null)}function Ph(a,h){var m=null;if(a.g==h){Io(a),Kc(a),a.g=null;var _=2}else if(qc(a.h,h))m=h.D,ch(a.h,h),_=1;else return;if(a.G!=0){if(h.o)if(_==1){m=h.m?h.m.length:0,h=Date.now()-h.F;var V=a.B;_=lo(),lt(_,new Xd(_,m)),wo(a)}else kh(a);else if(V=h.s,V==3||V==0&&0<h.X||!(_==1&&fb(a,h)||_==2&&Hc(a)))switch(m&&0<m.length&&(h=a.h,h.i=h.i.concat(m)),V){case 1:Yn(a,5);break;case 4:Yn(a,10);break;case 3:Yn(a,6);break;default:Yn(a,2)}}}function xh(a,h){let m=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(m*=2),m*h}function Yn(a,h){if(a.j.info("Error code "+h),h==2){var m=g(a.fb,a),_=a.Xa;const V=!_;_=new Qn(_||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||po(_,"https"),go(_),V?ob(_.toString(),m):ab(_.toString(),m)}else ut(2);a.G=0,a.l&&a.l.sa(h),Nh(a),Ah(a)}n.fb=function(a){a?(this.j.info("Successfully pinged google.com"),ut(2)):(this.j.info("Failed to ping google.com"),ut(1))};function Nh(a){if(a.G=0,a.ka=[],a.l){const h=lh(a.h);(h.length!=0||a.i.length!=0)&&(A(a.ka,h),A(a.ka,a.i),a.h.i.length=0,S(a.i),a.i.length=0),a.l.ra()}}function Dh(a,h,m){var _=m instanceof Qn?Zt(m):new Qn(m);if(_.g!="")h&&(_.g=h+"."+_.g),mo(_,_.s);else{var V=c.location;_=V.protocol,h=h?h+"."+V.hostname:V.hostname,V=+V.port;var U=new Qn(null);_&&po(U,_),h&&(U.g=h),V&&mo(U,V),m&&(U.l=m),_=U}return m=a.D,h=a.ya,m&&h&&Ce(_,m,h),Ce(_,"VER",a.la),Ys(a,_),_}function Vh(a,h,m){if(h&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Ca&&!a.pa?new Le(new _o({eb:m})):new Le(a.pa),h.Ha(a.J),h}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Oh(){}n=Oh.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Eo(){}Eo.prototype.g=function(a,h){return new yt(a,h)};function yt(a,h){Ze.call(this),this.g=new Th(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.va&&(a?a["X-WebChannel-Client-Profile"]=h.va:a={"X-WebChannel-Client-Profile":h.va}),this.g.S=a,(a=h&&h.Sb)&&!k(a)&&(this.g.m=a),this.v=h&&h.supportsCrossDomainXhr||!1,this.u=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!k(h)&&(this.g.D=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new $r(this)}I(yt,Ze),yt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},yt.prototype.close=function(){Gc(this.g)},yt.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var m={};m.__data__=a,a=m}else this.u&&(m={},m.__data__=Dc(a),a=m);h.i.push(new Yy(h.Ya++,a)),h.G==3&&wo(h)},yt.prototype.N=function(){this.g.l=null,delete this.j,Gc(this.g),delete this.g,yt.aa.N.call(this)};function Lh(a){Oc.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(const m in h){a=m;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}I(Lh,Oc);function Mh(){Lc.call(this),this.status=1}I(Mh,Lc);function $r(a){this.g=a}I($r,Oh),$r.prototype.ua=function(){lt(this.g,"a")},$r.prototype.ta=function(a){lt(this.g,new Lh(a))},$r.prototype.sa=function(a){lt(this.g,new Mh)},$r.prototype.ra=function(){lt(this.g,"b")},Eo.prototype.createWebChannel=Eo.prototype.g,yt.prototype.send=yt.prototype.o,yt.prototype.open=yt.prototype.m,yt.prototype.close=yt.prototype.close,gg=function(){return new Eo},mg=function(){return lo()},pg=Kn,Al={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},uo.NO_ERROR=0,uo.TIMEOUT=8,uo.HTTP_ERROR=6,Wo=uo,Zd.COMPLETE="complete",fg=Zd,Wd.EventType=Us,Us.OPEN="a",Us.CLOSE="b",Us.ERROR="c",Us.MESSAGE="d",Ze.prototype.listen=Ze.prototype.K,oi=Wd,Le.prototype.listenOnce=Le.prototype.L,Le.prototype.getLastError=Le.prototype.Ka,Le.prototype.getLastErrorCode=Le.prototype.Ba,Le.prototype.getStatus=Le.prototype.Z,Le.prototype.getResponseJson=Le.prototype.Oa,Le.prototype.getResponseText=Le.prototype.oa,Le.prototype.send=Le.prototype.ea,Le.prototype.setWithCredentials=Le.prototype.Ha,hg=Le}).apply(typeof Ro<"u"?Ro:typeof self<"u"?self:typeof window<"u"?window:{});const gf="@firebase/firestore",_f="4.7.7";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const yr=new Wa("@firebase/firestore");function Qr(){return yr.logLevel}function K(n,...e){if(yr.logLevel<=ge.DEBUG){const t=e.map(wu);yr.debug(`Firestore (${Vs}): ${n}`,...t)}}function ft(n,...e){if(yr.logLevel<=ge.ERROR){const t=e.map(wu);yr.error(`Firestore (${Vs}): ${n}`,...t)}}function Ri(n,...e){if(yr.logLevel<=ge.WARN){const t=e.map(wu);yr.warn(`Firestore (${Vs}): ${n}`,...t)}}function wu(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
 */class Kt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lT{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class uT{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(ht.UNAUTHENTICATED))}shutdown(){}}class dT{constructor(e){this.t=e,this.currentUser=ht.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){ne(this.o===void 0);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new Kt;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Kt,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},c=u=>{K("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>c(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(K("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Kt)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(K("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ne(typeof r.accessToken=="string"),new lT(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ne(e===null||typeof e=="string"),new ht(e)}}class hT{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=ht.FIRST_PARTY,this.T=new Map}I(){return this.P?this.P():null}get headers(){this.T.set("X-Goog-AuthUser",this.l);const e=this.I();return e&&this.T.set("Authorization",e),this.h&&this.T.set("X-Goog-Iam-Authorization-Token",this.h),this.T}}class fT{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new hT(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(ht.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class vf{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class pT{constructor(e,t){this.A=t,this.forceRefresh=!1,this.appCheck=null,this.R=null,this.V=null,It(e)&&e.settings.appCheckToken&&(this.V=e.settings.appCheckToken)}start(e,t){ne(this.o===void 0);const r=i=>{i.error!=null&&K("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.R;return this.R=i.token,K("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{K("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):K("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.V)return Promise.resolve(new vf(this.V));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(ne(typeof t.token=="string"),this.R=t.token,new vf(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mT(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */class _g{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=mT(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function ue(n,e){return n<e?-1:n>e?1:0}function Sl(n,e){const t=Rl().encode(n),r=Rl().encode(e);for(let s=0;s<Math.min(t.length,r.length);s++){const i=ue(t[s],r[s]);if(i!==0)return i}return ue(t.length,r.length)}function fs(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}function vg(n){return n+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yf=-62135596800,bf=1e6;class Oe{static now(){return Oe.fromMillis(Date.now())}static fromDate(e){return Oe.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*bf);return new Oe(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new W(B.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new W(B.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<yf)throw new W(B.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new W(B.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/bf}_compareTo(e){return this.seconds===e.seconds?ue(this.nanoseconds,e.nanoseconds):ue(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds-yf;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const wf="__name__";class Bt{constructor(e,t,r){t===void 0?t=0:t>e.length&&ee(),r===void 0?r=e.length-t:r>e.length-t&&ee(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Bt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Bt?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=Bt.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return ue(e.length,t.length)}static compareSegments(e,t){const r=Bt.isNumericId(e),s=Bt.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?Bt.extractNumericId(e).compare(Bt.extractNumericId(t)):Sl(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Nn.fromString(e.substring(4,e.length-2))}}class we extends Bt{construct(e,t,r){return new we(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new W(B.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new we(t)}static emptyPath(){return new we([])}}const gT=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ve extends Bt{construct(e,t,r){return new Ve(e,t,r)}static isValidIdentifier(e){return gT.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ve.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===wf}static keyField(){return new Ve([wf])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new W(B.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new W(B.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new W(B.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(r+=c,s++):(i(),s++)}if(i(),o)throw new W(B.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ve(t)}static emptyPath(){return new Ve([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const Si=-1;class _a{constructor(e,t,r,s){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=s}}function kl(n){return n.fields.find(e=>e.kind===2)}function tr(n){return n.fields.filter(e=>e.kind!==2)}_a.UNKNOWN_ID=-1;class Qo{constructor(e,t){this.fieldPath=e,this.kind=t}}class ki{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new ki(0,St.min())}}function _T(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=ie.fromTimestamp(r===1e9?new Oe(t+1,0):new Oe(t,r));return new St(s,J.empty(),e)}function yg(n){return new St(n.readTime,n.key,Si)}class St{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new St(ie.min(),J.empty(),Si)}static max(){return new St(ie.max(),J.empty(),Si)}}function Iu(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=J.comparator(n.documentKey,e.documentKey),t!==0?t:ue(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bg="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class wg{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dr(n){if(n.code!==B.FAILED_PRECONDITION||n.message!==bg)throw n;K("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const wt="SimpleDb";class ec{static open(e,t,r,s){try{return new ec(t,e.transaction(s,r))}catch(i){throw new hi(t,i)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.m=new Kt,this.transaction.oncomplete=()=>{this.m.resolve()},this.transaction.onabort=()=>{t.error?this.m.reject(new hi(e,t.error)):this.m.resolve()},this.transaction.onerror=r=>{const s=Eu(r.target.error);this.m.reject(new hi(e,s))}}get p(){return this.m.promise}abort(e){e&&this.m.reject(e),this.aborted||(K(wt,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}S(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new yT(t)}}class Dn{static delete(e){return K(wt,"Removing database:",e),ir(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!Ka())return!1;if(Dn.v())return!0;const e=He(),t=Dn.C(e),r=0<t&&t<10,s=Ig(e),i=0<s&&s<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||i)}static v(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.F)==="YES"}static M(e,t){return e.store(t)}static C(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}constructor(e,t,r){this.name=e,this.version=t,this.O=r,Dn.C(He())===12.2&&ft("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async N(e){return this.db||(K(wt,"Opening database:",this.name),this.db=await new Promise((t,r)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const o=i.target.result;t(o)},s.onblocked=()=>{r(new hi(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const o=i.target.error;o.name==="VersionError"?r(new W(B.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new W(B.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new hi(e,o))},s.onupgradeneeded=i=>{K(wt,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const o=i.target.result;this.O.B(o,s.transaction,i.oldVersion,this.version).next(()=>{K(wt,"Database upgrade to version "+this.version+" complete")})}})),this.L&&(this.db.onversionchange=t=>this.L(t)),this.db}k(e){this.L=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,s){const i=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.N(e);const c=ec.open(this.db,e,i?"readonly":"readwrite",r),u=s(c).next(d=>(c.S(),d)).catch(d=>(c.abort(d),D.reject(d))).toPromise();return u.catch(()=>{}),await c.p,u}catch(c){const u=c,d=u.name!=="FirebaseError"&&o<3;if(K(wt,"Transaction failed with error:",u.message,"Retrying:",d),this.close(),!d)return Promise.reject(u)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Ig(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class vT{constructor(e){this.q=e,this.$=!1,this.U=null}get isDone(){return this.$}get K(){return this.U}set cursor(e){this.q=e}done(){this.$=!0}W(e){this.U=e}delete(){return ir(this.q.delete())}}class hi extends W{constructor(e,t){super(B.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function qn(n){return n.name==="IndexedDbTransactionError"}class yT{constructor(e){this.store=e}put(e,t){let r;return t!==void 0?(K(wt,"PUT",this.store.name,e,t),r=this.store.put(t,e)):(K(wt,"PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),ir(r)}add(e){return K(wt,"ADD",this.store.name,e,e),ir(this.store.add(e))}get(e){return ir(this.store.get(e)).next(t=>(t===void 0&&(t=null),K(wt,"GET",this.store.name,e,t),t))}delete(e){return K(wt,"DELETE",this.store.name,e),ir(this.store.delete(e))}count(){return K(wt,"COUNT",this.store.name),ir(this.store.count())}G(e,t){const r=this.options(e,t),s=r.index?this.store.index(r.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(r.range);return new D((o,c)=>{i.onerror=u=>{c(u.target.error)},i.onsuccess=u=>{o(u.target.result)}})}{const i=this.cursor(r),o=[];return this.j(i,(c,u)=>{o.push(u)}).next(()=>o)}}H(e,t){const r=this.store.getAll(e,t===null?void 0:t);return new D((s,i)=>{r.onerror=o=>{i(o.target.error)},r.onsuccess=o=>{s(o.target.result)}})}J(e,t){K(wt,"DELETE ALL",this.store.name);const r=this.options(e,t);r.Y=!1;const s=this.cursor(r);return this.j(s,(i,o,c)=>c.delete())}Z(e,t){let r;t?r=e:(r={},t=e);const s=this.cursor(r);return this.j(s,t)}X(e){const t=this.cursor({});return new D((r,s)=>{t.onerror=i=>{const o=Eu(i.target.error);s(o)},t.onsuccess=i=>{const o=i.target.result;o?e(o.primaryKey,o.value).next(c=>{c?o.continue():r()}):r()}})}j(e,t){const r=[];return new D((s,i)=>{e.onerror=o=>{i(o.target.error)},e.onsuccess=o=>{const c=o.target.result;if(!c)return void s();const u=new vT(c),d=t(c.primaryKey,c.value,u);if(d instanceof D){const f=d.catch(p=>(u.done(),D.reject(p)));r.push(f)}u.isDone?s():u.K===null?c.continue():c.continue(u.K)}}).next(()=>D.waitFor(r))}options(e,t){let r;return e!==void 0&&(typeof e=="string"?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const r=this.store.index(e.index);return e.Y?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function ir(n){return new D((e,t)=>{n.onsuccess=r=>{const s=r.target.result;e(s)},n.onerror=r=>{const s=Eu(r.target.error);t(s)}})}let If=!1;function Eu(n){const e=Dn.C(He());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(t)>=0){const r=new W("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return If||(If=!0,setTimeout(()=>{throw r},0)),r}}return n}const fi="IndexBackfiller";class bT{constructor(e,t){this.asyncQueue=e,this.ee=t,this.task=null}start(){this.te(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}te(e){K(fi,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{const t=await this.ee.ne();K(fi,`Documents written: ${t}`)}catch(t){qn(t)?K(fi,"Ignoring IndexedDB error during index backfill: ",t):await Dr(t)}await this.te(6e4)})}}class wT{constructor(e,t){this.localStore=e,this.persistence=t}async ne(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.re(t,e))}re(e,t){const r=new Set;let s=t,i=!0;return D.doWhile(()=>i===!0&&s>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!r.has(o))return K(fi,`Processing collection: ${o}`),this.ie(e,o,s).next(c=>{s-=c,r.add(o)});i=!1})).next(()=>t-s)}ie(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(s=>this.localStore.localDocuments.getNextDocuments(e,t,s,r).next(i=>{const o=i.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this.se(s,i)).next(c=>(K(fi,`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c))).next(()=>o.size)}))}se(e,t){let r=e;return t.changes.forEach((s,i)=>{const o=yg(i);Iu(o,r)>0&&(r=o)}),new St(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
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
 */const fr=-1;function tc(n){return n==null}function Ci(n){return n===0&&1/n==-1/0}function IT(n){return typeof n=="number"&&Number.isInteger(n)&&!Ci(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const va="";function ot(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Ef(e)),e=ET(n.get(t),e);return Ef(e)}function ET(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case va:t+="";break;default:t+=i}}return t}function Ef(n){return n+va+""}function qt(n){const e=n.length;if(ne(e>=2),e===2)return ne(n.charAt(0)===va&&n.charAt(1)===""),we.emptyPath();const t=e-2,r=[];let s="";for(let i=0;i<e;){const o=n.indexOf(va,i);switch((o<0||o>t)&&ee(),n.charAt(o+1)){case"":const c=n.substring(i,o);let u;s.length===0?u=c:(s+=c,u=s,s=""),r.push(u);break;case"":s+=n.substring(i,o),s+="\0";break;case"":s+=n.substring(i,o+1);break;default:ee()}i=o+2}return new we(r)}/**
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
 */const nr="remoteDocuments",Qi="owner",jr="owner",Pi="mutationQueues",TT="userId",Dt="mutations",Tf="batchId",lr="userMutationsIndex",Af=["userId","batchId"];/**
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
 */function Yo(n,e){return[n,ot(e)]}function Eg(n,e,t){return[n,ot(e),t]}const AT={},ps="documentMutations",ya="remoteDocumentsV14",RT=["prefixPath","collectionGroup","readTime","documentId"],Jo="documentKeyIndex",ST=["prefixPath","collectionGroup","documentId"],Tg="collectionGroupIndex",kT=["collectionGroup","readTime","prefixPath","documentId"],xi="remoteDocumentGlobal",Cl="remoteDocumentGlobalKey",ms="targets",Ag="queryTargetsIndex",CT=["canonicalId","targetId"],gs="targetDocuments",PT=["targetId","path"],Tu="documentTargetsIndex",xT=["path","targetId"],ba="targetGlobalKey",pr="targetGlobal",Ni="collectionParents",NT=["collectionId","parent"],_s="clientMetadata",DT="clientId",nc="bundles",VT="bundleId",rc="namedQueries",OT="name",Au="indexConfiguration",LT="indexId",Pl="collectionGroupIndex",MT="collectionGroup",wa="indexState",FT=["indexId","uid"],Rg="sequenceNumberIndex",UT=["uid","sequenceNumber"],Ia="indexEntries",BT=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],Sg="documentKeyIndex",$T=["indexId","uid","orderedDocumentKey"],sc="documentOverlays",qT=["userId","collectionPath","documentId"],xl="collectionPathOverlayIndex",jT=["userId","collectionPath","largestBatchId"],kg="collectionGroupOverlayIndex",zT=["userId","collectionGroup","largestBatchId"],Ru="globals",GT="name",Cg=[Pi,Dt,ps,nr,ms,Qi,pr,gs,_s,xi,Ni,nc,rc],HT=[...Cg,sc],Pg=[Pi,Dt,ps,ya,ms,Qi,pr,gs,_s,xi,Ni,nc,rc,sc],xg=Pg,Su=[...xg,Au,wa,Ia],KT=Su,WT=[...Su,Ru];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nl extends wg{constructor(e,t){super(),this.ue=e,this.currentSequenceNumber=t}}function Ke(n,e){const t=de(n);return Dn.M(t.ue,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rf(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function jn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Ng(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e,t){this.comparator=e,this.root=t||Ye.EMPTY}insert(e,t){return new xe(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Ye.BLACK,null,null))}remove(e){return new xe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ye.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new So(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new So(this.root,e,this.comparator,!1)}getReverseIterator(){return new So(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new So(this.root,e,this.comparator,!0)}}class So{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ye{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??Ye.RED,this.left=s??Ye.EMPTY,this.right=i??Ye.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new Ye(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Ye.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Ye.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ye.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ye.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw ee();const e=this.left.check();if(e!==this.right.check())throw ee();return e+(this.isRed()?0:1)}}Ye.EMPTY=null,Ye.RED=!0,Ye.BLACK=!1;Ye.EMPTY=new class{constructor(){this.size=0}get key(){throw ee()}get value(){throw ee()}get color(){throw ee()}get left(){throw ee()}get right(){throw ee()}copy(e,t,r,s,i){return this}insert(e,t,r){return new Ye(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re{constructor(e){this.comparator=e,this.data=new xe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Sf(this.data.getIterator())}getIteratorFrom(e){return new Sf(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof Re)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Re(this.comparator);return t.data=e,t}}class Sf{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function zr(n){return n.hasNext()?n.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(e){this.fields=e,e.sort(Ve.comparator)}static empty(){return new gt([])}unionWith(e){let t=new Re(Ve.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new gt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return fs(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
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
 */class Dg extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ze{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Dg("Invalid base64 string: "+i):i}}(e);return new ze(t)}static fromUint8Array(e){const t=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(e);return new ze(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ue(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ze.EMPTY_BYTE_STRING=new ze("");const QT=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function cn(n){if(ne(!!n),typeof n=="string"){let e=0;const t=QT.exec(n);if(ne(!!t),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Pe(n.seconds),nanos:Pe(n.nanos)}}function Pe(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function ln(n){return typeof n=="string"?ze.fromBase64String(n):ze.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vg="server_timestamp",Og="__type__",Lg="__previous_value__",Mg="__local_write_time__";function ic(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[Og])===null||t===void 0?void 0:t.stringValue)===Vg}function oc(n){const e=n.mapValue.fields[Lg];return ic(e)?oc(e):e}function Di(n){const e=cn(n.mapValue.fields[Mg].timestampValue);return new Oe(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YT{constructor(e,t,r,s,i,o,c,u,d){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=d}}const Ea="(default)";class br{constructor(e,t){this.projectId=e,this.database=t||Ea}static empty(){return new br("","")}get isDefaultDatabase(){return this.database===Ea}isEqual(e){return e instanceof br&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ku="__type__",Fg="__max__",kn={mapValue:{fields:{__type__:{stringValue:Fg}}}},Cu="__vector__",vs="value",Xo={nullValue:"NULL_VALUE"};function On(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?ic(n)?4:Ug(n)?9007199254740991:ac(n)?10:11:ee()}function Qt(n,e){if(n===e)return!0;const t=On(n);if(t!==On(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Di(n).isEqual(Di(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=cn(s.timestampValue),c=cn(i.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,i){return ln(s.bytesValue).isEqual(ln(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,i){return Pe(s.geoPointValue.latitude)===Pe(i.geoPointValue.latitude)&&Pe(s.geoPointValue.longitude)===Pe(i.geoPointValue.longitude)}(n,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return Pe(s.integerValue)===Pe(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=Pe(s.doubleValue),c=Pe(i.doubleValue);return o===c?Ci(o)===Ci(c):isNaN(o)&&isNaN(c)}return!1}(n,e);case 9:return fs(n.arrayValue.values||[],e.arrayValue.values||[],Qt);case 10:case 11:return function(s,i){const o=s.mapValue.fields||{},c=i.mapValue.fields||{};if(Rf(o)!==Rf(c))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(c[u]===void 0||!Qt(o[u],c[u])))return!1;return!0}(n,e);default:return ee()}}function Vi(n,e){return(n.values||[]).find(t=>Qt(t,e))!==void 0}function Ln(n,e){if(n===e)return 0;const t=On(n),r=On(e);if(t!==r)return ue(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return ue(n.booleanValue,e.booleanValue);case 2:return function(i,o){const c=Pe(i.integerValue||i.doubleValue),u=Pe(o.integerValue||o.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1}(n,e);case 3:return kf(n.timestampValue,e.timestampValue);case 4:return kf(Di(n),Di(e));case 5:return Sl(n.stringValue,e.stringValue);case 6:return function(i,o){const c=ln(i),u=ln(o);return c.compareTo(u)}(n.bytesValue,e.bytesValue);case 7:return function(i,o){const c=i.split("/"),u=o.split("/");for(let d=0;d<c.length&&d<u.length;d++){const f=ue(c[d],u[d]);if(f!==0)return f}return ue(c.length,u.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,o){const c=ue(Pe(i.latitude),Pe(o.latitude));return c!==0?c:ue(Pe(i.longitude),Pe(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Cf(n.arrayValue,e.arrayValue);case 10:return function(i,o){var c,u,d,f;const p=i.fields||{},g=o.fields||{},v=(c=p[vs])===null||c===void 0?void 0:c.arrayValue,I=(u=g[vs])===null||u===void 0?void 0:u.arrayValue,S=ue(((d=v?.values)===null||d===void 0?void 0:d.length)||0,((f=I?.values)===null||f===void 0?void 0:f.length)||0);return S!==0?S:Cf(v,I)}(n.mapValue,e.mapValue);case 11:return function(i,o){if(i===kn.mapValue&&o===kn.mapValue)return 0;if(i===kn.mapValue)return 1;if(o===kn.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),d=o.fields||{},f=Object.keys(d);u.sort(),f.sort();for(let p=0;p<u.length&&p<f.length;++p){const g=Sl(u[p],f[p]);if(g!==0)return g;const v=Ln(c[u[p]],d[f[p]]);if(v!==0)return v}return ue(u.length,f.length)}(n.mapValue,e.mapValue);default:throw ee()}}function kf(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ue(n,e);const t=cn(n),r=cn(e),s=ue(t.seconds,r.seconds);return s!==0?s:ue(t.nanos,r.nanos)}function Cf(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=Ln(t[s],r[s]);if(i)return i}return ue(t.length,r.length)}function ys(n){return Dl(n)}function Dl(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=cn(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return ln(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return J.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=Dl(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${Dl(t.fields[o])}`;return s+"}"}(n.mapValue):ee()}function Zo(n){switch(On(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=oc(n);return e?16+Zo(e):16;case 5:return 2*n.stringValue.length;case 6:return ln(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+Zo(i),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return jn(r.fields,(i,o)=>{s+=i.length+Zo(o)}),s}(n.mapValue);default:throw ee()}}function wr(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Vl(n){return!!n&&"integerValue"in n}function Oi(n){return!!n&&"arrayValue"in n}function Pf(n){return!!n&&"nullValue"in n}function xf(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function ea(n){return!!n&&"mapValue"in n}function ac(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[ku])===null||t===void 0?void 0:t.stringValue)===Cu}function pi(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return jn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=pi(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=pi(n.arrayValue.values[t]);return e}return Object.assign({},n)}function Ug(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Fg}const Bg={mapValue:{fields:{[ku]:{stringValue:Cu},[vs]:{arrayValue:{}}}}};function JT(n){return"nullValue"in n?Xo:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?wr(br.empty(),J.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?ac(n)?Bg:{mapValue:{}}:ee()}function XT(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?wr(br.empty(),J.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?Bg:"mapValue"in n?ac(n)?{mapValue:{}}:kn:ee()}function Nf(n,e){const t=Ln(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?-1:!n.inclusive&&e.inclusive?1:0}function Df(n,e){const t=Ln(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?1:!n.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class st{constructor(e){this.value=e}static empty(){return new st({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!ea(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=pi(t)}setAll(e){let t=Ve.emptyPath(),r={},s=[];e.forEach((o,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=c.popLast()}o?r[c.lastSegment()]=pi(o):s.push(c.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());ea(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Qt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];ea(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){jn(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new st(pi(this.value))}}function $g(n){const e=[];return jn(n.fields,(t,r)=>{const s=new Ve([t]);if(ea(r)){const i=$g(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new gt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Mn{constructor(e,t){this.position=e,this.inclusive=t}}function Vf(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],o=n.position[s];if(i.field.isKeyField()?r=J.comparator(J.fromName(o.referenceValue),t.key):r=Ln(o,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Of(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Qt(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class Li{constructor(e,t="asc"){this.field=e,this.dir=t}}function ZT(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class qg{}class _e extends qg{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new eA(e,t,r):t==="array-contains"?new rA(e,r):t==="in"?new Wg(e,r):t==="not-in"?new sA(e,r):t==="array-contains-any"?new iA(e,r):new _e(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new tA(e,r):new nA(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Ln(t,this.value)):t!==null&&On(this.value)===On(t)&&this.matchesComparison(Ln(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return ee()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ae extends qg{constructor(e,t){super(),this.filters=e,this.op=t,this.ce=null}static create(e,t){return new Ae(e,t)}matches(e){return bs(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ce!==null||(this.ce=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ce}getFilters(){return Object.assign([],this.filters)}}function bs(n){return n.op==="and"}function Ol(n){return n.op==="or"}function Pu(n){return jg(n)&&bs(n)}function jg(n){for(const e of n.filters)if(e instanceof Ae)return!1;return!0}function Ll(n){if(n instanceof _e)return n.field.canonicalString()+n.op.toString()+ys(n.value);if(Pu(n))return n.filters.map(e=>Ll(e)).join(",");{const e=n.filters.map(t=>Ll(t)).join(",");return`${n.op}(${e})`}}function zg(n,e){return n instanceof _e?function(r,s){return s instanceof _e&&r.op===s.op&&r.field.isEqual(s.field)&&Qt(r.value,s.value)}(n,e):n instanceof Ae?function(r,s){return s instanceof Ae&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,o,c)=>i&&zg(o,s.filters[c]),!0):!1}(n,e):void ee()}function Gg(n,e){const t=n.filters.concat(e);return Ae.create(t,n.op)}function Hg(n){return n instanceof _e?function(t){return`${t.field.canonicalString()} ${t.op} ${ys(t.value)}`}(n):n instanceof Ae?function(t){return t.op.toString()+" {"+t.getFilters().map(Hg).join(" ,")+"}"}(n):"Filter"}class eA extends _e{constructor(e,t,r){super(e,t,r),this.key=J.fromName(r.referenceValue)}matches(e){const t=J.comparator(e.key,this.key);return this.matchesComparison(t)}}class tA extends _e{constructor(e,t){super(e,"in",t),this.keys=Kg("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class nA extends _e{constructor(e,t){super(e,"not-in",t),this.keys=Kg("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Kg(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>J.fromName(r.referenceValue))}class rA extends _e{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Oi(t)&&Vi(t.arrayValue,this.value)}}class Wg extends _e{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Vi(this.value.arrayValue,t)}}class sA extends _e{constructor(e,t){super(e,"not-in",t)}matches(e){if(Vi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!Vi(this.value.arrayValue,t)}}class iA extends _e{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Oi(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Vi(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oA{constructor(e,t=null,r=[],s=[],i=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.le=null}}function Ml(n,e=null,t=[],r=[],s=null,i=null,o=null){return new oA(n,e,t,r,s,i,o)}function Ir(n){const e=de(n);if(e.le===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Ll(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),tc(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>ys(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>ys(r)).join(",")),e.le=t}return e.le}function Yi(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!ZT(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!zg(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Of(n.startAt,e.startAt)&&Of(n.endAt,e.endAt)}function Ta(n){return J.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Aa(n,e){return n.filters.filter(t=>t instanceof _e&&t.field.isEqual(e))}function Lf(n,e,t){let r=Xo,s=!0;for(const i of Aa(n,e)){let o=Xo,c=!0;switch(i.op){case"<":case"<=":o=JT(i.value);break;case"==":case"in":case">=":o=i.value;break;case">":o=i.value,c=!1;break;case"!=":case"not-in":o=Xo}Nf({value:r,inclusive:s},{value:o,inclusive:c})<0&&(r=o,s=c)}if(t!==null){for(let i=0;i<n.orderBy.length;++i)if(n.orderBy[i].field.isEqual(e)){const o=t.position[i];Nf({value:r,inclusive:s},{value:o,inclusive:t.inclusive})<0&&(r=o,s=t.inclusive);break}}return{value:r,inclusive:s}}function Mf(n,e,t){let r=kn,s=!0;for(const i of Aa(n,e)){let o=kn,c=!0;switch(i.op){case">=":case">":o=XT(i.value),c=!1;break;case"==":case"in":case"<=":o=i.value;break;case"<":o=i.value,c=!1;break;case"!=":case"not-in":o=kn}Df({value:r,inclusive:s},{value:o,inclusive:c})>0&&(r=o,s=c)}if(t!==null){for(let i=0;i<n.orderBy.length;++i)if(n.orderBy[i].field.isEqual(e)){const o=t.position[i];Df({value:r,inclusive:s},{value:o,inclusive:t.inclusive})>0&&(r=o,s=t.inclusive);break}}return{value:r,inclusive:s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vr{constructor(e,t=null,r=[],s=[],i=null,o="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=u,this.he=null,this.Pe=null,this.Te=null,this.startAt,this.endAt}}function aA(n,e,t,r,s,i,o,c){return new Vr(n,e,t,r,s,i,o,c)}function Ji(n){return new Vr(n)}function Ff(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function xu(n){return n.collectionGroup!==null}function as(n){const e=de(n);if(e.he===null){e.he=[];const t=new Set;for(const i of e.explicitOrderBy)e.he.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new Re(Ve.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.he.push(new Li(i,r))}),t.has(Ve.keyField().canonicalString())||e.he.push(new Li(Ve.keyField(),r))}return e.he}function xt(n){const e=de(n);return e.Pe||(e.Pe=cA(e,as(n))),e.Pe}function cA(n,e){if(n.limitType==="F")return Ml(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Li(s.field,i)});const t=n.endAt?new Mn(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Mn(n.startAt.position,n.startAt.inclusive):null;return Ml(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Fl(n,e){const t=n.filters.concat([e]);return new Vr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Ra(n,e,t){return new Vr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function cc(n,e){return Yi(xt(n),xt(e))&&n.limitType===e.limitType}function Qg(n){return`${Ir(xt(n))}|lt:${n.limitType}`}function Yr(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>Hg(s)).join(", ")}]`),tc(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>ys(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>ys(s)).join(",")),`Target(${r})`}(xt(n))}; limitType=${n.limitType})`}function Xi(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):J.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of as(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(o,c,u){const d=Vf(o,c,u);return o.inclusive?d<=0:d<0}(r.startAt,as(r),s)||r.endAt&&!function(o,c,u){const d=Vf(o,c,u);return o.inclusive?d>=0:d>0}(r.endAt,as(r),s))}(n,e)}function lA(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Yg(n){return(e,t)=>{let r=!1;for(const s of as(n)){const i=uA(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function uA(n,e,t){const r=n.field.isKeyField()?J.comparator(e.key,t.key):function(i,o,c){const u=o.data.field(i),d=c.data.field(i);return u!==null&&d!==null?Ln(u,d):ee()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return ee()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){jn(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return Ng(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dA=new xe(J.comparator);function Et(){return dA}const Jg=new xe(J.comparator);function ai(...n){let e=Jg;for(const t of n)e=e.insert(t.key,t);return e}function Xg(n){let e=Jg;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function jt(){return mi()}function Zg(){return mi()}function mi(){return new hn(n=>n.toString(),(n,e)=>n.isEqual(e))}const hA=new xe(J.comparator),fA=new Re(J.comparator);function me(...n){let e=fA;for(const t of n)e=e.add(t);return e}const pA=new Re(ue);function mA(){return pA}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nu(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ci(e)?"-0":e}}function e_(n){return{integerValue:""+n}}function t_(n,e){return IT(e)?e_(e):Nu(n,e)}/**
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
 */class lc{constructor(){this._=void 0}}function gA(n,e,t){return n instanceof Mi?function(s,i){const o={fields:{[Og]:{stringValue:Vg},[Mg]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&ic(i)&&(i=oc(i)),i&&(o.fields[Lg]=i),{mapValue:o}}(t,e):n instanceof ws?r_(n,e):n instanceof Is?s_(n,e):function(s,i){const o=n_(s,i),c=Uf(o)+Uf(s.Ie);return Vl(o)&&Vl(s.Ie)?e_(c):Nu(s.serializer,c)}(n,e)}function _A(n,e,t){return n instanceof ws?r_(n,e):n instanceof Is?s_(n,e):t}function n_(n,e){return n instanceof Es?function(r){return Vl(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class Mi extends lc{}class ws extends lc{constructor(e){super(),this.elements=e}}function r_(n,e){const t=i_(e);for(const r of n.elements)t.some(s=>Qt(s,r))||t.push(r);return{arrayValue:{values:t}}}class Is extends lc{constructor(e){super(),this.elements=e}}function s_(n,e){let t=i_(e);for(const r of n.elements)t=t.filter(s=>!Qt(s,r));return{arrayValue:{values:t}}}class Es extends lc{constructor(e,t){super(),this.serializer=e,this.Ie=t}}function Uf(n){return Pe(n.integerValue||n.doubleValue)}function i_(n){return Oi(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o_{constructor(e,t){this.field=e,this.transform=t}}function vA(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof ws&&s instanceof ws||r instanceof Is&&s instanceof Is?fs(r.elements,s.elements,Qt):r instanceof Es&&s instanceof Es?Qt(r.Ie,s.Ie):r instanceof Mi&&s instanceof Mi}(n.transform,e.transform)}class yA{constructor(e,t){this.version=e,this.transformResults=t}}class it{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new it}static exists(e){return new it(void 0,e)}static updateTime(e){return new it(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function ta(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class uc{}function a_(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new dc(n.key,it.none()):new Os(n.key,n.data,it.none());{const t=n.data,r=st.empty();let s=new Re(Ve.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new fn(n.key,r,new gt(s.toArray()),it.none())}}function bA(n,e,t){n instanceof Os?function(s,i,o){const c=s.value.clone(),u=$f(s.fieldTransforms,i,o.transformResults);c.setAll(u),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(n,e,t):n instanceof fn?function(s,i,o){if(!ta(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=$f(s.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(c_(s)),u.setAll(c),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(n,e,t):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function gi(n,e,t,r){return n instanceof Os?function(i,o,c,u){if(!ta(i.precondition,o))return c;const d=i.value.clone(),f=qf(i.fieldTransforms,u,o);return d.setAll(f),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),null}(n,e,t,r):n instanceof fn?function(i,o,c,u){if(!ta(i.precondition,o))return c;const d=qf(i.fieldTransforms,u,o),f=o.data;return f.setAll(c_(i)),f.setAll(d),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(p=>p.field))}(n,e,t,r):function(i,o,c){return ta(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c}(n,e,t)}function wA(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=n_(r.transform,s||null);i!=null&&(t===null&&(t=st.empty()),t.set(r.field,i))}return t||null}function Bf(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&fs(r,s,(i,o)=>vA(i,o))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Os extends uc{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class fn extends uc{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function c_(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function $f(n,e,t){const r=new Map;ne(n.length===t.length);for(let s=0;s<t.length;s++){const i=n[s],o=i.transform,c=e.data.field(i.field);r.set(i.field,_A(o,c,t[s]))}return r}function qf(n,e,t){const r=new Map;for(const s of n){const i=s.transform,o=t.data.field(s.field);r.set(s.field,gA(i,o,e))}return r}class dc extends uc{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class l_ extends uc{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Du{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&bA(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=gi(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=gi(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Zg();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=t.has(s.key)?null:c;const u=a_(o,c);u!==null&&r.set(s.key,u),o.isValidDocument()||o.convertToNoDocument(ie.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),me())}isEqual(e){return this.batchId===e.batchId&&fs(this.mutations,e.mutations,(t,r)=>Bf(t,r))&&fs(this.baseMutations,e.baseMutations,(t,r)=>Bf(t,r))}}class Vu{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){ne(e.mutations.length===r.length);let s=function(){return hA}();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new Vu(e,t,r,s)}}/**
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
 */class Ou{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class IA{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var qe,ve;function EA(n){switch(n){case B.OK:return ee();case B.CANCELLED:case B.UNKNOWN:case B.DEADLINE_EXCEEDED:case B.RESOURCE_EXHAUSTED:case B.INTERNAL:case B.UNAVAILABLE:case B.UNAUTHENTICATED:return!1;case B.INVALID_ARGUMENT:case B.NOT_FOUND:case B.ALREADY_EXISTS:case B.PERMISSION_DENIED:case B.FAILED_PRECONDITION:case B.ABORTED:case B.OUT_OF_RANGE:case B.UNIMPLEMENTED:case B.DATA_LOSS:return!0;default:return ee()}}function u_(n){if(n===void 0)return ft("GRPC error has no .code"),B.UNKNOWN;switch(n){case qe.OK:return B.OK;case qe.CANCELLED:return B.CANCELLED;case qe.UNKNOWN:return B.UNKNOWN;case qe.DEADLINE_EXCEEDED:return B.DEADLINE_EXCEEDED;case qe.RESOURCE_EXHAUSTED:return B.RESOURCE_EXHAUSTED;case qe.INTERNAL:return B.INTERNAL;case qe.UNAVAILABLE:return B.UNAVAILABLE;case qe.UNAUTHENTICATED:return B.UNAUTHENTICATED;case qe.INVALID_ARGUMENT:return B.INVALID_ARGUMENT;case qe.NOT_FOUND:return B.NOT_FOUND;case qe.ALREADY_EXISTS:return B.ALREADY_EXISTS;case qe.PERMISSION_DENIED:return B.PERMISSION_DENIED;case qe.FAILED_PRECONDITION:return B.FAILED_PRECONDITION;case qe.ABORTED:return B.ABORTED;case qe.OUT_OF_RANGE:return B.OUT_OF_RANGE;case qe.UNIMPLEMENTED:return B.UNIMPLEMENTED;case qe.DATA_LOSS:return B.DATA_LOSS;default:return ee()}}(ve=qe||(qe={}))[ve.OK=0]="OK",ve[ve.CANCELLED=1]="CANCELLED",ve[ve.UNKNOWN=2]="UNKNOWN",ve[ve.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ve[ve.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ve[ve.NOT_FOUND=5]="NOT_FOUND",ve[ve.ALREADY_EXISTS=6]="ALREADY_EXISTS",ve[ve.PERMISSION_DENIED=7]="PERMISSION_DENIED",ve[ve.UNAUTHENTICATED=16]="UNAUTHENTICATED",ve[ve.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ve[ve.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ve[ve.ABORTED=10]="ABORTED",ve[ve.OUT_OF_RANGE=11]="OUT_OF_RANGE",ve[ve.UNIMPLEMENTED=12]="UNIMPLEMENTED",ve[ve.INTERNAL=13]="INTERNAL",ve[ve.UNAVAILABLE=14]="UNAVAILABLE",ve[ve.DATA_LOSS=15]="DATA_LOSS";/**
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
 */const TA=new Nn([4294967295,4294967295],0);function jf(n){const e=Rl().encode(n),t=new dg;return t.update(e),new Uint8Array(t.digest())}function zf(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Nn([t,r],0),new Nn([s,i],0)]}class Lu{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new ci(`Invalid padding: ${t}`);if(r<0)throw new ci(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new ci(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new ci(`Invalid padding when bitmap length is 0: ${t}`);this.Ee=8*e.length-t,this.de=Nn.fromNumber(this.Ee)}Ae(e,t,r){let s=e.add(t.multiply(Nn.fromNumber(r)));return s.compare(TA)===1&&(s=new Nn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.de).toNumber()}Re(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.Ee===0)return!1;const t=jf(e),[r,s]=zf(t);for(let i=0;i<this.hashCount;i++){const o=this.Ae(r,s,i);if(!this.Re(o))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new Lu(i,s,t);return r.forEach(c=>o.insert(c)),o}insert(e){if(this.Ee===0)return;const t=jf(e),[r,s]=zf(t);for(let i=0;i<this.hashCount;i++){const o=this.Ae(r,s,i);this.Ve(o)}}Ve(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class ci extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class na{constructor(e,t,r,s){this.me=e,this.removedTargetIds=t,this.key=r,this.fe=s}}class d_{constructor(e,t){this.targetId=e,this.ge=t}}class h_{constructor(e,t,r=ze.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class Gf{constructor(){this.pe=0,this.ye=Hf(),this.we=ze.EMPTY_BYTE_STRING,this.Se=!1,this.be=!0}get current(){return this.Se}get resumeToken(){return this.we}get De(){return this.pe!==0}get ve(){return this.be}Ce(e){e.approximateByteSize()>0&&(this.be=!0,this.we=e)}Fe(){let e=me(),t=me(),r=me();return this.ye.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:ee()}}),new Zi(this.we,this.Se,e,t,r)}Me(){this.be=!1,this.ye=Hf()}xe(e,t){this.be=!0,this.ye=this.ye.insert(e,t)}Oe(e){this.be=!0,this.ye=this.ye.remove(e)}Ne(){this.pe+=1}Be(){this.pe-=1,ne(this.pe>=0)}Le(){this.be=!0,this.Se=!0}}class AA{constructor(e){this.ke=e,this.qe=new Map,this.Qe=Et(),this.$e=ko(),this.Ue=ko(),this.Ke=new xe(ue)}We(e){for(const t of e.me)e.fe&&e.fe.isFoundDocument()?this.Ge(t,e.fe):this.ze(t,e.key,e.fe);for(const t of e.removedTargetIds)this.ze(t,e.key,e.fe)}je(e){this.forEachTarget(e,t=>{const r=this.He(t);switch(e.state){case 0:this.Je(t)&&r.Ce(e.resumeToken);break;case 1:r.Be(),r.De||r.Me(),r.Ce(e.resumeToken);break;case 2:r.Be(),r.De||this.removeTarget(t);break;case 3:this.Je(t)&&(r.Le(),r.Ce(e.resumeToken));break;case 4:this.Je(t)&&(this.Ye(t),r.Ce(e.resumeToken));break;default:ee()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.qe.forEach((r,s)=>{this.Je(s)&&t(s)})}Ze(e){const t=e.targetId,r=e.ge.count,s=this.Xe(t);if(s){const i=s.target;if(Ta(i))if(r===0){const o=new J(i.path);this.ze(t,o,Me.newNoDocument(o,ie.min()))}else ne(r===1);else{const o=this.et(t);if(o!==r){const c=this.tt(e),u=c?this.nt(c,e,o):1;if(u!==0){this.Ye(t);const d=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ke=this.Ke.insert(t,d)}}}}}tt(e){const t=e.ge.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let o,c;try{o=ln(r).toUint8Array()}catch(u){if(u instanceof Dg)return Ri("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new Lu(o,s,i)}catch(u){return Ri(u instanceof ci?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.Ee===0?null:c}nt(e,t,r){return t.ge.count===r-this.st(e,t.targetId)?0:2}st(e,t){const r=this.ke.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const o=this.ke.it(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.ze(t,i,null),s++)}),s}ot(e){const t=new Map;this.qe.forEach((i,o)=>{const c=this.Xe(o);if(c){if(i.current&&Ta(c.target)){const u=new J(c.target.path);this._t(u).has(o)||this.ut(o,u)||this.ze(o,u,Me.newNoDocument(u,e))}i.ve&&(t.set(o,i.Fe()),i.Me())}});let r=me();this.Ue.forEach((i,o)=>{let c=!0;o.forEachWhile(u=>{const d=this.Xe(u);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(i))}),this.Qe.forEach((i,o)=>o.setReadTime(e));const s=new hc(e,t,this.Ke,this.Qe,r);return this.Qe=Et(),this.$e=ko(),this.Ue=ko(),this.Ke=new xe(ue),s}Ge(e,t){if(!this.Je(e))return;const r=this.ut(e,t.key)?2:0;this.He(e).xe(t.key,r),this.Qe=this.Qe.insert(t.key,t),this.$e=this.$e.insert(t.key,this._t(t.key).add(e)),this.Ue=this.Ue.insert(t.key,this.ct(t.key).add(e))}ze(e,t,r){if(!this.Je(e))return;const s=this.He(e);this.ut(e,t)?s.xe(t,1):s.Oe(t),this.Ue=this.Ue.insert(t,this.ct(t).delete(e)),this.Ue=this.Ue.insert(t,this.ct(t).add(e)),r&&(this.Qe=this.Qe.insert(t,r))}removeTarget(e){this.qe.delete(e)}et(e){const t=this.He(e).Fe();return this.ke.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ne(e){this.He(e).Ne()}He(e){let t=this.qe.get(e);return t||(t=new Gf,this.qe.set(e,t)),t}ct(e){let t=this.Ue.get(e);return t||(t=new Re(ue),this.Ue=this.Ue.insert(e,t)),t}_t(e){let t=this.$e.get(e);return t||(t=new Re(ue),this.$e=this.$e.insert(e,t)),t}Je(e){const t=this.Xe(e)!==null;return t||K("WatchChangeAggregator","Detected inactive target",e),t}Xe(e){const t=this.qe.get(e);return t&&t.De?null:this.ke.lt(e)}Ye(e){this.qe.set(e,new Gf),this.ke.getRemoteKeysForTarget(e).forEach(t=>{this.ze(e,t,null)})}ut(e,t){return this.ke.getRemoteKeysForTarget(e).has(t)}}function ko(){return new xe(J.comparator)}function Hf(){return new xe(J.comparator)}const RA={asc:"ASCENDING",desc:"DESCENDING"},SA={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},kA={and:"AND",or:"OR"};class CA{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Ul(n,e){return n.useProto3Json||tc(e)?e:{value:e}}function Ts(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function f_(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function PA(n,e){return Ts(n,e.toTimestamp())}function pt(n){return ne(!!n),ie.fromTimestamp(function(t){const r=cn(t);return new Oe(r.seconds,r.nanos)}(n))}function Mu(n,e){return Bl(n,e).canonicalString()}function Bl(n,e){const t=function(s){return new we(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function p_(n){const e=we.fromString(n);return ne(E_(e)),e}function Sa(n,e){return Mu(n.databaseId,e.path)}function mr(n,e){const t=p_(e);if(t.get(1)!==n.databaseId.projectId)throw new W(B.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new W(B.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new J(__(t))}function m_(n,e){return Mu(n.databaseId,e)}function g_(n){const e=p_(n);return e.length===4?we.emptyPath():__(e)}function $l(n){return new we(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function __(n){return ne(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function Kf(n,e,t){return{name:Sa(n,e),fields:t.value.mapValue.fields}}function xA(n,e,t){const r=mr(n,e.name),s=pt(e.updateTime),i=e.createTime?pt(e.createTime):ie.min(),o=new st({mapValue:{fields:e.fields}}),c=Me.newFoundDocument(r,s,i,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function NA(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:ee()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(d,f){return d.useProto3Json?(ne(f===void 0||typeof f=="string"),ze.fromBase64String(f||"")):(ne(f===void 0||f instanceof Buffer||f instanceof Uint8Array),ze.fromUint8Array(f||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&function(d){const f=d.code===void 0?B.UNKNOWN:u_(d.code);return new W(f,d.message||"")}(o);t=new h_(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=mr(n,r.document.name),i=pt(r.document.updateTime),o=r.document.createTime?pt(r.document.createTime):ie.min(),c=new st({mapValue:{fields:r.document.fields}}),u=Me.newFoundDocument(s,i,o,c),d=r.targetIds||[],f=r.removedTargetIds||[];t=new na(d,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=mr(n,r.document),i=r.readTime?pt(r.readTime):ie.min(),o=Me.newNoDocument(s,i),c=r.removedTargetIds||[];t=new na([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=mr(n,r.document),i=r.removedTargetIds||[];t=new na([],i,s,null)}else{if(!("filter"in e))return ee();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new IA(s,i),c=r.targetId;t=new d_(c,o)}}return t}function ka(n,e){let t;if(e instanceof Os)t={update:Kf(n,e.key,e.value)};else if(e instanceof dc)t={delete:Sa(n,e.key)};else if(e instanceof fn)t={update:Kf(n,e.key,e.data),updateMask:FA(e.fieldMask)};else{if(!(e instanceof l_))return ee();t={verify:Sa(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,o){const c=o.transform;if(c instanceof Mi)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof ws)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Is)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Es)return{fieldPath:o.field.canonicalString(),increment:c.Ie};throw ee()}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:PA(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:ee()}(n,e.precondition)),t}function ql(n,e){const t=e.currentDocument?function(i){return i.updateTime!==void 0?it.updateTime(pt(i.updateTime)):i.exists!==void 0?it.exists(i.exists):it.none()}(e.currentDocument):it.none(),r=e.updateTransforms?e.updateTransforms.map(s=>function(o,c){let u=null;if("setToServerValue"in c)ne(c.setToServerValue==="REQUEST_TIME"),u=new Mi;else if("appendMissingElements"in c){const f=c.appendMissingElements.values||[];u=new ws(f)}else if("removeAllFromArray"in c){const f=c.removeAllFromArray.values||[];u=new Is(f)}else"increment"in c?u=new Es(o,c.increment):ee();const d=Ve.fromServerFormat(c.fieldPath);return new o_(d,u)}(n,s)):[];if(e.update){e.update.name;const s=mr(n,e.update.name),i=new st({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(u){const d=u.fieldPaths||[];return new gt(d.map(f=>Ve.fromServerFormat(f)))}(e.updateMask);return new fn(s,i,o,t,r)}return new Os(s,i,t,r)}if(e.delete){const s=mr(n,e.delete);return new dc(s,t)}if(e.verify){const s=mr(n,e.verify);return new l_(s,t)}return ee()}function DA(n,e){return n&&n.length>0?(ne(e!==void 0),n.map(t=>function(s,i){let o=s.updateTime?pt(s.updateTime):pt(i);return o.isEqual(ie.min())&&(o=pt(i)),new yA(o,s.transformResults||[])}(t,e))):[]}function v_(n,e){return{documents:[m_(n,e.path)]}}function y_(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=m_(n,s);const i=function(d){if(d.length!==0)return I_(Ae.create(d,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const o=function(d){if(d.length!==0)return d.map(f=>function(g){return{field:Jr(g.field),direction:OA(g.dir)}}(f))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=Ul(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{ht:t,parent:s}}function b_(n){let e=g_(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){ne(r===1);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=function(p){const g=w_(p);return g instanceof Ae&&Pu(g)?g.getFilters():[g]}(t.where));let o=[];t.orderBy&&(o=function(p){return p.map(g=>function(I){return new Li(Xr(I.field),function(A){switch(A){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(I.direction))}(g))}(t.orderBy));let c=null;t.limit&&(c=function(p){let g;return g=typeof p=="object"?p.value:p,tc(g)?null:g}(t.limit));let u=null;t.startAt&&(u=function(p){const g=!!p.before,v=p.values||[];return new Mn(v,g)}(t.startAt));let d=null;return t.endAt&&(d=function(p){const g=!p.before,v=p.values||[];return new Mn(v,g)}(t.endAt)),aA(e,s,o,i,c,"F",u,d)}function VA(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return ee()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function w_(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Xr(t.unaryFilter.field);return _e.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Xr(t.unaryFilter.field);return _e.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Xr(t.unaryFilter.field);return _e.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Xr(t.unaryFilter.field);return _e.create(o,"!=",{nullValue:"NULL_VALUE"});default:return ee()}}(n):n.fieldFilter!==void 0?function(t){return _e.create(Xr(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return ee()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Ae.create(t.compositeFilter.filters.map(r=>w_(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return ee()}}(t.compositeFilter.op))}(n):ee()}function OA(n){return RA[n]}function LA(n){return SA[n]}function MA(n){return kA[n]}function Jr(n){return{fieldPath:n.canonicalString()}}function Xr(n){return Ve.fromServerFormat(n.fieldPath)}function I_(n){return n instanceof _e?function(t){if(t.op==="=="){if(xf(t.value))return{unaryFilter:{field:Jr(t.field),op:"IS_NAN"}};if(Pf(t.value))return{unaryFilter:{field:Jr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(xf(t.value))return{unaryFilter:{field:Jr(t.field),op:"IS_NOT_NAN"}};if(Pf(t.value))return{unaryFilter:{field:Jr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Jr(t.field),op:LA(t.op),value:t.value}}}(n):n instanceof Ae?function(t){const r=t.getFilters().map(s=>I_(s));return r.length===1?r[0]:{compositeFilter:{op:MA(t.op),filters:r}}}(n):ee()}function FA(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function E_(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn{constructor(e,t,r,s,i=ie.min(),o=ie.min(),c=ze.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new sn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new sn(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new sn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new sn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T_{constructor(e){this.Tt=e}}function UA(n,e){let t;if(e.document)t=xA(n.Tt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const r=J.fromSegments(e.noDocument.path),s=Tr(e.noDocument.readTime);t=Me.newNoDocument(r,s),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return ee();{const r=J.fromSegments(e.unknownDocument.path),s=Tr(e.unknownDocument.version);t=Me.newUnknownDocument(r,s)}}return e.readTime&&t.setReadTime(function(s){const i=new Oe(s[0],s[1]);return ie.fromTimestamp(i)}(e.readTime)),t}function Wf(n,e){const t=e.key,r={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:Ca(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=function(i,o){return{name:Sa(i,o.key),fields:o.data.value.mapValue.fields,updateTime:Ts(i,o.version.toTimestamp()),createTime:Ts(i,o.createTime.toTimestamp())}}(n.Tt,e);else if(e.isNoDocument())r.noDocument={path:t.path.toArray(),readTime:Er(e.version)};else{if(!e.isUnknownDocument())return ee();r.unknownDocument={path:t.path.toArray(),version:Er(e.version)}}return r}function Ca(n){const e=n.toTimestamp();return[e.seconds,e.nanoseconds]}function Er(n){const e=n.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function Tr(n){const e=new Oe(n.seconds,n.nanoseconds);return ie.fromTimestamp(e)}function or(n,e){const t=(e.baseMutations||[]).map(i=>ql(n.Tt,i));for(let i=0;i<e.mutations.length-1;++i){const o=e.mutations[i];if(i+1<e.mutations.length&&e.mutations[i+1].transform!==void 0){const c=e.mutations[i+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(i+1,1),++i}}const r=e.mutations.map(i=>ql(n.Tt,i)),s=Oe.fromMillis(e.localWriteTimeMs);return new Du(e.batchId,s,t,r)}function li(n){const e=Tr(n.readTime),t=n.lastLimboFreeSnapshotVersion!==void 0?Tr(n.lastLimboFreeSnapshotVersion):ie.min();let r;return r=function(i){return i.documents!==void 0}(n.query)?function(i){return ne(i.documents.length===1),xt(Ji(g_(i.documents[0])))}(n.query):function(i){return xt(b_(i))}(n.query),new sn(r,n.targetId,"TargetPurposeListen",n.lastListenSequenceNumber,e,t,ze.fromBase64String(n.resumeToken))}function A_(n,e){const t=Er(e.snapshotVersion),r=Er(e.lastLimboFreeSnapshotVersion);let s;s=Ta(e.target)?v_(n.Tt,e.target):y_(n.Tt,e.target).ht;const i=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:Ir(e.target),readTime:t,resumeToken:i,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:s}}function R_(n){const e=b_({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Ra(e,e.limit,"L"):e}function nl(n,e){return new Ou(e.largestBatchId,ql(n.Tt,e.overlayMutation))}function Qf(n,e){const t=e.path.lastSegment();return[n,ot(e.path.popLast()),t]}function Yf(n,e,t,r){return{indexId:n,uid:e,sequenceNumber:t,readTime:Er(r.readTime),documentKey:ot(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BA{getBundleMetadata(e,t){return Jf(e).get(t).next(r=>{if(r)return function(i){return{id:i.bundleId,createTime:Tr(i.createTime),version:i.version}}(r)})}saveBundleMetadata(e,t){return Jf(e).put(function(s){return{bundleId:s.id,createTime:Er(pt(s.createTime)),version:s.version}}(t))}getNamedQuery(e,t){return Xf(e).get(t).next(r=>{if(r)return function(i){return{name:i.name,query:R_(i.bundledQuery),readTime:Tr(i.readTime)}}(r)})}saveNamedQuery(e,t){return Xf(e).put(function(s){return{name:s.name,readTime:Er(pt(s.readTime)),bundledQuery:s.bundledQuery}}(t))}}function Jf(n){return Ke(n,nc)}function Xf(n){return Ke(n,rc)}/**
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
 */class fc{constructor(e,t){this.serializer=e,this.userId=t}static It(e,t){const r=t.uid||"";return new fc(e,r)}getOverlay(e,t){return Js(e).get(Qf(this.userId,t)).next(r=>r?nl(this.serializer,r):null)}getOverlays(e,t){const r=jt();return D.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){const s=[];return r.forEach((i,o)=>{const c=new Ou(t,o);s.push(this.Et(e,c))}),D.waitFor(s)}removeOverlaysForBatchId(e,t,r){const s=new Set;t.forEach(o=>s.add(ot(o.getCollectionPath())));const i=[];return s.forEach(o=>{const c=IDBKeyRange.bound([this.userId,o,r],[this.userId,o,r+1],!1,!0);i.push(Js(e).J(xl,c))}),D.waitFor(i)}getOverlaysForCollection(e,t,r){const s=jt(),i=ot(t),o=IDBKeyRange.bound([this.userId,i,r],[this.userId,i,Number.POSITIVE_INFINITY],!0);return Js(e).G(xl,o).next(c=>{for(const u of c){const d=nl(this.serializer,u);s.set(d.getKey(),d)}return s})}getOverlaysForCollectionGroup(e,t,r,s){const i=jt();let o;const c=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Js(e).Z({index:kg,range:c},(u,d,f)=>{const p=nl(this.serializer,d);i.size()<s||p.largestBatchId===o?(i.set(p.getKey(),p),o=p.largestBatchId):f.done()}).next(()=>i)}Et(e,t){return Js(e).put(function(s,i,o){const[c,u,d]=Qf(i,o.mutation.key);return{userId:i,collectionPath:u,documentId:d,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:ka(s.Tt,o.mutation)}}(this.serializer,this.userId,t))}}function Js(n){return Ke(n,sc)}/**
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
 */class $A{dt(e){return Ke(e,Ru)}getSessionToken(e){return this.dt(e).get("sessionToken").next(t=>{const r=t?.value;return r?ze.fromUint8Array(r):ze.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.dt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
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
 */class ar{constructor(){}At(e,t){this.Rt(e,t),t.Vt()}Rt(e,t){if("nullValue"in e)this.ft(t,5);else if("booleanValue"in e)this.ft(t,10),t.gt(e.booleanValue?1:0);else if("integerValue"in e)this.ft(t,15),t.gt(Pe(e.integerValue));else if("doubleValue"in e){const r=Pe(e.doubleValue);isNaN(r)?this.ft(t,13):(this.ft(t,15),Ci(r)?t.gt(0):t.gt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.ft(t,20),typeof r=="string"&&(r=cn(r)),t.yt(`${r.seconds||""}`),t.gt(r.nanos||0)}else if("stringValue"in e)this.wt(e.stringValue,t),this.St(t);else if("bytesValue"in e)this.ft(t,30),t.bt(ln(e.bytesValue)),this.St(t);else if("referenceValue"in e)this.Dt(e.referenceValue,t);else if("geoPointValue"in e){const r=e.geoPointValue;this.ft(t,45),t.gt(r.latitude||0),t.gt(r.longitude||0)}else"mapValue"in e?Ug(e)?this.ft(t,Number.MAX_SAFE_INTEGER):ac(e)?this.vt(e.mapValue,t):(this.Ct(e.mapValue,t),this.St(t)):"arrayValue"in e?(this.Ft(e.arrayValue,t),this.St(t)):ee()}wt(e,t){this.ft(t,25),this.Mt(e,t)}Mt(e,t){t.yt(e)}Ct(e,t){const r=e.fields||{};this.ft(t,55);for(const s of Object.keys(r))this.wt(s,t),this.Rt(r[s],t)}vt(e,t){var r,s;const i=e.fields||{};this.ft(t,53);const o=vs,c=((s=(r=i[o].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.length)||0;this.ft(t,15),t.gt(Pe(c)),this.wt(o,t),this.Rt(i[o],t)}Ft(e,t){const r=e.values||[];this.ft(t,50);for(const s of r)this.Rt(s,t)}Dt(e,t){this.ft(t,37),J.fromName(e).path.forEach(r=>{this.ft(t,60),this.Mt(r,t)})}ft(e,t){e.gt(t)}St(e){e.gt(2)}}ar.xt=new ar;/**
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
 */const Gr=255;function qA(n){if(n===0)return 8;let e=0;return n>>4||(e+=4,n<<=4),n>>6||(e+=2,n<<=2),n>>7||(e+=1),e}function Zf(n){const e=64-function(r){let s=0;for(let i=0;i<8;++i){const o=qA(255&r[i]);if(s+=o,o!==8)break}return s}(n);return Math.ceil(e/8)}class jA{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ot(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Nt(r.value),r=t.next();this.Bt()}Lt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.kt(r.value),r=t.next();this.qt()}Qt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Nt(r);else if(r<2048)this.Nt(960|r>>>6),this.Nt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Nt(480|r>>>12),this.Nt(128|63&r>>>6),this.Nt(128|63&r);else{const s=t.codePointAt(0);this.Nt(240|s>>>18),this.Nt(128|63&s>>>12),this.Nt(128|63&s>>>6),this.Nt(128|63&s)}}this.Bt()}$t(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.kt(r);else if(r<2048)this.kt(960|r>>>6),this.kt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.kt(480|r>>>12),this.kt(128|63&r>>>6),this.kt(128|63&r);else{const s=t.codePointAt(0);this.kt(240|s>>>18),this.kt(128|63&s>>>12),this.kt(128|63&s>>>6),this.kt(128|63&s)}}this.qt()}Ut(e){const t=this.Kt(e),r=Zf(t);this.Wt(1+r),this.buffer[this.position++]=255&r;for(let s=t.length-r;s<t.length;++s)this.buffer[this.position++]=255&t[s]}Gt(e){const t=this.Kt(e),r=Zf(t);this.Wt(1+r),this.buffer[this.position++]=~(255&r);for(let s=t.length-r;s<t.length;++s)this.buffer[this.position++]=~(255&t[s])}zt(){this.jt(Gr),this.jt(255)}Ht(){this.Jt(Gr),this.Jt(255)}reset(){this.position=0}seed(e){this.Wt(e.length),this.buffer.set(e,this.position),this.position+=e.length}Yt(){return this.buffer.slice(0,this.position)}Kt(e){const t=function(i){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,i,!1),new Uint8Array(o.buffer)}(e),r=!!(128&t[0]);t[0]^=r?255:128;for(let s=1;s<t.length;++s)t[s]^=r?255:0;return t}Nt(e){const t=255&e;t===0?(this.jt(0),this.jt(255)):t===Gr?(this.jt(Gr),this.jt(0)):this.jt(t)}kt(e){const t=255&e;t===0?(this.Jt(0),this.Jt(255)):t===Gr?(this.Jt(Gr),this.Jt(0)):this.Jt(e)}Bt(){this.jt(0),this.jt(1)}qt(){this.Jt(0),this.Jt(1)}jt(e){this.Wt(1),this.buffer[this.position++]=e}Jt(e){this.Wt(1),this.buffer[this.position++]=~e}Wt(e){const t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);const s=new Uint8Array(r);s.set(this.buffer),this.buffer=s}}class zA{constructor(e){this.Zt=e}bt(e){this.Zt.Ot(e)}yt(e){this.Zt.Qt(e)}gt(e){this.Zt.Ut(e)}Vt(){this.Zt.zt()}}class GA{constructor(e){this.Zt=e}bt(e){this.Zt.Lt(e)}yt(e){this.Zt.$t(e)}gt(e){this.Zt.Gt(e)}Vt(){this.Zt.Ht()}}class Xs{constructor(){this.Zt=new jA,this.Xt=new zA(this.Zt),this.en=new GA(this.Zt)}seed(e){this.Zt.seed(e)}tn(e){return e===0?this.Xt:this.en}Yt(){return this.Zt.Yt()}reset(){this.Zt.reset()}}/**
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
 */class cr{constructor(e,t,r,s){this.indexId=e,this.documentKey=t,this.arrayValue=r,this.directionalValue=s}nn(){const e=this.directionalValue.length,t=e===0||this.directionalValue[e-1]===255?e+1:e,r=new Uint8Array(t);return r.set(this.directionalValue,0),t!==e?r.set([0],this.directionalValue.length):++r[r.length-1],new cr(this.indexId,this.documentKey,this.arrayValue,r)}}function vn(n,e){let t=n.indexId-e.indexId;return t!==0?t:(t=ep(n.arrayValue,e.arrayValue),t!==0?t:(t=ep(n.directionalValue,e.directionalValue),t!==0?t:J.comparator(n.documentKey,e.documentKey)))}function ep(n,e){for(let t=0;t<n.length&&t<e.length;++t){const r=n[t]-e[t];if(r!==0)return r}return n.length-e.length}/**
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
 */class tp{constructor(e){this.rn=new Re((t,r)=>Ve.comparator(t.field,r.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.sn=e.orderBy,this._n=[];for(const t of e.filters){const r=t;r.isInequality()?this.rn=this.rn.add(r):this._n.push(r)}}get an(){return this.rn.size>1}un(e){if(ne(e.collectionGroup===this.collectionId),this.an)return!1;const t=kl(e);if(t!==void 0&&!this.cn(t))return!1;const r=tr(e);let s=new Set,i=0,o=0;for(;i<r.length&&this.cn(r[i]);++i)s=s.add(r[i].fieldPath.canonicalString());if(i===r.length)return!0;if(this.rn.size>0){const c=this.rn.getIterator().getNext();if(!s.has(c.field.canonicalString())){const u=r[i];if(!this.ln(c,u)||!this.hn(this.sn[o++],u))return!1}++i}for(;i<r.length;++i){const c=r[i];if(o>=this.sn.length||!this.hn(this.sn[o++],c))return!1}return!0}Pn(){if(this.an)return null;let e=new Re(Ve.comparator);const t=[];for(const r of this._n)if(!r.field.isKeyField())if(r.op==="array-contains"||r.op==="array-contains-any")t.push(new Qo(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),t.push(new Qo(r.field,0))}for(const r of this.sn)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),t.push(new Qo(r.field,r.dir==="asc"?0:1)));return new _a(_a.UNKNOWN_ID,this.collectionId,t,ki.empty())}cn(e){for(const t of this._n)if(this.ln(t,e))return!0;return!1}ln(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const r=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===r}hn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
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
 */function S_(n){var e,t;if(ne(n instanceof _e||n instanceof Ae),n instanceof _e){if(n instanceof Wg){const s=((t=(e=n.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map(i=>_e.create(n.field,"==",i)))||[];return Ae.create(s,"or")}return n}const r=n.filters.map(s=>S_(s));return Ae.create(r,n.op)}function HA(n){if(n.getFilters().length===0)return[];const e=Gl(S_(n));return ne(k_(e)),jl(e)||zl(e)?[e]:e.getFilters()}function jl(n){return n instanceof _e}function zl(n){return n instanceof Ae&&Pu(n)}function k_(n){return jl(n)||zl(n)||function(t){if(t instanceof Ae&&Ol(t)){for(const r of t.getFilters())if(!jl(r)&&!zl(r))return!1;return!0}return!1}(n)}function Gl(n){if(ne(n instanceof _e||n instanceof Ae),n instanceof _e)return n;if(n.filters.length===1)return Gl(n.filters[0]);const e=n.filters.map(r=>Gl(r));let t=Ae.create(e,n.op);return t=Pa(t),k_(t)?t:(ne(t instanceof Ae),ne(bs(t)),ne(t.filters.length>1),t.filters.reduce((r,s)=>Fu(r,s)))}function Fu(n,e){let t;return ne(n instanceof _e||n instanceof Ae),ne(e instanceof _e||e instanceof Ae),t=n instanceof _e?e instanceof _e?function(s,i){return Ae.create([s,i],"and")}(n,e):np(n,e):e instanceof _e?np(e,n):function(s,i){if(ne(s.filters.length>0&&i.filters.length>0),bs(s)&&bs(i))return Gg(s,i.getFilters());const o=Ol(s)?s:i,c=Ol(s)?i:s,u=o.filters.map(d=>Fu(d,c));return Ae.create(u,"or")}(n,e),Pa(t)}function np(n,e){if(bs(e))return Gg(e,n.getFilters());{const t=e.filters.map(r=>Fu(n,r));return Ae.create(t,"or")}}function Pa(n){if(ne(n instanceof _e||n instanceof Ae),n instanceof _e)return n;const e=n.getFilters();if(e.length===1)return Pa(e[0]);if(jg(n))return n;const t=e.map(s=>Pa(s)),r=[];return t.forEach(s=>{s instanceof _e?r.push(s):s instanceof Ae&&(s.op===n.op?r.push(...s.filters):r.push(s))}),r.length===1?r[0]:Ae.create(r,n.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KA{constructor(){this.Tn=new Uu}addToCollectionParentIndex(e,t){return this.Tn.add(t),D.resolve()}getCollectionParents(e,t){return D.resolve(this.Tn.getEntries(t))}addFieldIndex(e,t){return D.resolve()}deleteFieldIndex(e,t){return D.resolve()}deleteAllFieldIndexes(e){return D.resolve()}createTargetIndexes(e,t){return D.resolve()}getDocumentsMatchingTarget(e,t){return D.resolve(null)}getIndexType(e,t){return D.resolve(0)}getFieldIndexes(e,t){return D.resolve([])}getNextCollectionGroupToUpdate(e){return D.resolve(null)}getMinOffset(e,t){return D.resolve(St.min())}getMinOffsetFromCollectionGroup(e,t){return D.resolve(St.min())}updateCollectionGroup(e,t,r){return D.resolve()}updateIndexEntries(e,t){return D.resolve()}}class Uu{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new Re(we.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Re(we.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rp="IndexedDbIndexManager",Co=new Uint8Array(0);class WA{constructor(e,t){this.databaseId=t,this.In=new Uu,this.En=new hn(r=>Ir(r),(r,s)=>Yi(r,s)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.In.has(t)){const r=t.lastSegment(),s=t.popLast();e.addOnCommittedListener(()=>{this.In.add(t)});const i={collectionId:r,parent:ot(s)};return sp(e).put(i)}return D.resolve()}getCollectionParents(e,t){const r=[],s=IDBKeyRange.bound([t,""],[vg(t),""],!1,!0);return sp(e).G(s).next(i=>{for(const o of i){if(o.collectionId!==t)break;r.push(qt(o.parent))}return r})}addFieldIndex(e,t){const r=Zs(e),s=function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map(u=>[u.fieldPath.canonicalString(),u.kind])}}(t);delete s.indexId;const i=r.add(s);if(t.indexState){const o=Kr(e);return i.next(c=>{o.put(Yf(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return i.next()}deleteFieldIndex(e,t){const r=Zs(e),s=Kr(e),i=Hr(e);return r.delete(t.indexId).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=Zs(e),r=Hr(e),s=Kr(e);return t.J().next(()=>r.J()).next(()=>s.J())}createTargetIndexes(e,t){return D.forEach(this.dn(t),r=>this.getIndexType(e,r).next(s=>{if(s===0||s===1){const i=new tp(r).Pn();if(i!=null)return this.addFieldIndex(e,i)}}))}getDocumentsMatchingTarget(e,t){const r=Hr(e);let s=!0;const i=new Map;return D.forEach(this.dn(t),o=>this.An(e,o).next(c=>{s&&(s=!!c),i.set(o,c)})).next(()=>{if(s){let o=me();const c=[];return D.forEach(i,(u,d)=>{K(rp,`Using index ${function(x){return`id=${x.indexId}|cg=${x.collectionGroup}|f=${x.fields.map(F=>`${F.fieldPath}:${F.kind}`).join(",")}`}(u)} to execute ${Ir(t)}`);const f=function(x,F){const P=kl(F);if(P===void 0)return null;for(const M of Aa(x,P.fieldPath))switch(M.op){case"array-contains-any":return M.value.arrayValue.values||[];case"array-contains":return[M.value]}return null}(d,u),p=function(x,F){const P=new Map;for(const M of tr(F))for(const T of Aa(x,M.fieldPath))switch(T.op){case"==":case"in":P.set(M.fieldPath.canonicalString(),T.value);break;case"not-in":case"!=":return P.set(M.fieldPath.canonicalString(),T.value),Array.from(P.values())}return null}(d,u),g=function(x,F){const P=[];let M=!0;for(const T of tr(F)){const y=T.kind===0?Lf(x,T.fieldPath,x.startAt):Mf(x,T.fieldPath,x.startAt);P.push(y.value),M&&(M=y.inclusive)}return new Mn(P,M)}(d,u),v=function(x,F){const P=[];let M=!0;for(const T of tr(F)){const y=T.kind===0?Mf(x,T.fieldPath,x.endAt):Lf(x,T.fieldPath,x.endAt);P.push(y.value),M&&(M=y.inclusive)}return new Mn(P,M)}(d,u),I=this.Rn(u,d,g),S=this.Rn(u,d,v),A=this.Vn(u,d,p),O=this.mn(u.indexId,f,I,g.inclusive,S,v.inclusive,A);return D.forEach(O,k=>r.H(k,t.limit).next(x=>{x.forEach(F=>{const P=J.fromSegments(F.documentKey);o.has(P)||(o=o.add(P),c.push(P))})}))}).next(()=>c)}return D.resolve(null)})}dn(e){let t=this.En.get(e);return t||(e.filters.length===0?t=[e]:t=HA(Ae.create(e.filters,"and")).map(r=>Ml(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt)),this.En.set(e,t),t)}mn(e,t,r,s,i,o,c){const u=(t!=null?t.length:1)*Math.max(r.length,i.length),d=u/(t!=null?t.length:1),f=[];for(let p=0;p<u;++p){const g=t?this.fn(t[p/d]):Co,v=this.gn(e,g,r[p%d],s),I=this.pn(e,g,i[p%d],o),S=c.map(A=>this.gn(e,g,A,!0));f.push(...this.createRange(v,I,S))}return f}gn(e,t,r,s){const i=new cr(e,J.empty(),t,r);return s?i:i.nn()}pn(e,t,r,s){const i=new cr(e,J.empty(),t,r);return s?i.nn():i}An(e,t){const r=new tp(t),s=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,s).next(i=>{let o=null;for(const c of i)r.un(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o})}getIndexType(e,t){let r=2;const s=this.dn(t);return D.forEach(s,i=>this.An(e,i).next(o=>{o?r!==0&&o.fields.length<function(u){let d=new Re(Ve.comparator),f=!1;for(const p of u.filters)for(const g of p.getFlattenedFilters())g.field.isKeyField()||(g.op==="array-contains"||g.op==="array-contains-any"?f=!0:d=d.add(g.field));for(const p of u.orderBy)p.field.isKeyField()||(d=d.add(p.field));return d.size+(f?1:0)}(i)&&(r=1):r=0})).next(()=>function(o){return o.limit!==null}(t)&&s.length>1&&r===2?1:r)}yn(e,t){const r=new Xs;for(const s of tr(e)){const i=t.data.field(s.fieldPath);if(i==null)return null;const o=r.tn(s.kind);ar.xt.At(i,o)}return r.Yt()}fn(e){const t=new Xs;return ar.xt.At(e,t.tn(0)),t.Yt()}wn(e,t){const r=new Xs;return ar.xt.At(wr(this.databaseId,t),r.tn(function(i){const o=tr(i);return o.length===0?0:o[o.length-1].kind}(e))),r.Yt()}Vn(e,t,r){if(r===null)return[];let s=[];s.push(new Xs);let i=0;for(const o of tr(e)){const c=r[i++];for(const u of s)if(this.Sn(t,o.fieldPath)&&Oi(c))s=this.bn(s,o,c);else{const d=u.tn(o.kind);ar.xt.At(c,d)}}return this.Dn(s)}Rn(e,t,r){return this.Vn(e,t,r.position)}Dn(e){const t=[];for(let r=0;r<e.length;++r)t[r]=e[r].Yt();return t}bn(e,t,r){const s=[...e],i=[];for(const o of r.arrayValue.values||[])for(const c of s){const u=new Xs;u.seed(c.Yt()),ar.xt.At(o,u.tn(t.kind)),i.push(u)}return i}Sn(e,t){return!!e.filters.find(r=>r instanceof _e&&r.field.isEqual(t)&&(r.op==="in"||r.op==="not-in"))}getFieldIndexes(e,t){const r=Zs(e),s=Kr(e);return(t?r.G(Pl,IDBKeyRange.bound(t,t)):r.G()).next(i=>{const o=[];return D.forEach(i,c=>s.get([c.indexId,this.uid]).next(u=>{o.push(function(f,p){const g=p?new ki(p.sequenceNumber,new St(Tr(p.readTime),new J(qt(p.documentKey)),p.largestBatchId)):ki.empty(),v=f.fields.map(([I,S])=>new Qo(Ve.fromServerFormat(I),S));return new _a(f.indexId,f.collectionGroup,v,g)}(c,u))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((r,s)=>{const i=r.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:ue(r.collectionGroup,s.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,r){const s=Zs(e),i=Kr(e);return this.vn(e).next(o=>s.G(Pl,IDBKeyRange.bound(t,t)).next(c=>D.forEach(c,u=>i.put(Yf(u.indexId,this.uid,o,r)))))}updateIndexEntries(e,t){const r=new Map;return D.forEach(t,(s,i)=>{const o=r.get(s.collectionGroup);return(o?D.resolve(o):this.getFieldIndexes(e,s.collectionGroup)).next(c=>(r.set(s.collectionGroup,c),D.forEach(c,u=>this.Cn(e,s,u).next(d=>{const f=this.Fn(i,u);return d.isEqual(f)?D.resolve():this.Mn(e,i,u,d,f)}))))})}xn(e,t,r,s){return Hr(e).put({indexId:s.indexId,uid:this.uid,arrayValue:s.arrayValue,directionalValue:s.directionalValue,orderedDocumentKey:this.wn(r,t.key),documentKey:t.key.path.toArray()})}On(e,t,r,s){return Hr(e).delete([s.indexId,this.uid,s.arrayValue,s.directionalValue,this.wn(r,t.key),t.key.path.toArray()])}Cn(e,t,r){const s=Hr(e);let i=new Re(vn);return s.Z({index:Sg,range:IDBKeyRange.only([r.indexId,this.uid,this.wn(r,t)])},(o,c)=>{i=i.add(new cr(r.indexId,t,c.arrayValue,c.directionalValue))}).next(()=>i)}Fn(e,t){let r=new Re(vn);const s=this.yn(t,e);if(s==null)return r;const i=kl(t);if(i!=null){const o=e.data.field(i.fieldPath);if(Oi(o))for(const c of o.arrayValue.values||[])r=r.add(new cr(t.indexId,e.key,this.fn(c),s))}else r=r.add(new cr(t.indexId,e.key,Co,s));return r}Mn(e,t,r,s,i){K(rp,"Updating index entries for document '%s'",t.key);const o=[];return function(u,d,f,p,g){const v=u.getIterator(),I=d.getIterator();let S=zr(v),A=zr(I);for(;S||A;){let O=!1,k=!1;if(S&&A){const x=f(S,A);x<0?k=!0:x>0&&(O=!0)}else S!=null?k=!0:O=!0;O?(p(A),A=zr(I)):k?(g(S),S=zr(v)):(S=zr(v),A=zr(I))}}(s,i,vn,c=>{o.push(this.xn(e,t,r,c))},c=>{o.push(this.On(e,t,r,c))}),D.waitFor(o)}vn(e){let t=1;return Kr(e).Z({index:Rg,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(r,s,i)=>{i.done(),t=s.sequenceNumber+1}).next(()=>t)}createRange(e,t,r){r=r.sort((o,c)=>vn(o,c)).filter((o,c,u)=>!c||vn(o,u[c-1])!==0);const s=[];s.push(e);for(const o of r){const c=vn(o,e),u=vn(o,t);if(c===0)s[0]=e.nn();else if(c>0&&u<0)s.push(o),s.push(o.nn());else if(u>0)break}s.push(t);const i=[];for(let o=0;o<s.length;o+=2){if(this.Nn(s[o],s[o+1]))return[];const c=[s[o].indexId,this.uid,s[o].arrayValue,s[o].directionalValue,Co,[]],u=[s[o+1].indexId,this.uid,s[o+1].arrayValue,s[o+1].directionalValue,Co,[]];i.push(IDBKeyRange.bound(c,u))}return i}Nn(e,t){return vn(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(ip)}getMinOffset(e,t){return D.mapArray(this.dn(t),r=>this.An(e,r).next(s=>s||ee())).next(ip)}}function sp(n){return Ke(n,Ni)}function Hr(n){return Ke(n,Ia)}function Zs(n){return Ke(n,Au)}function Kr(n){return Ke(n,wa)}function ip(n){ne(n.length!==0);let e=n[0].indexState.offset,t=e.largestBatchId;for(let r=1;r<n.length;r++){const s=n[r].indexState.offset;Iu(s,e)<0&&(e=s),t<s.largestBatchId&&(t=s.largestBatchId)}return new St(e.readTime,e.documentKey,t)}/**
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
 */const op={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},C_=41943040;class rt{static withCacheSize(e){return new rt(e,rt.DEFAULT_COLLECTION_PERCENTILE,rt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function P_(n,e,t){const r=n.store(Dt),s=n.store(ps),i=[],o=IDBKeyRange.only(t.batchId);let c=0;const u=r.Z({range:o},(f,p,g)=>(c++,g.delete()));i.push(u.next(()=>{ne(c===1)}));const d=[];for(const f of t.mutations){const p=Eg(e,f.key.path,t.batchId);i.push(s.delete(p)),d.push(f.key)}return D.waitFor(i).next(()=>d)}function xa(n){if(!n)return 0;let e;if(n.document)e=n.document;else if(n.unknownDocument)e=n.unknownDocument;else{if(!n.noDocument)throw ee();e=n.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */rt.DEFAULT_COLLECTION_PERCENTILE=10,rt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,rt.DEFAULT=new rt(C_,rt.DEFAULT_COLLECTION_PERCENTILE,rt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),rt.DISABLED=new rt(-1,0,0);class pc{constructor(e,t,r,s){this.userId=e,this.serializer=t,this.indexManager=r,this.referenceDelegate=s,this.Bn={}}static It(e,t,r,s){ne(e.uid!=="");const i=e.isAuthenticated()?e.uid:"";return new pc(i,t,r,s)}checkEmpty(e){let t=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return yn(e).Z({index:lr,range:r},(s,i,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,r,s){const i=Zr(e),o=yn(e);return o.add({}).next(c=>{ne(typeof c=="number");const u=new Du(c,t,r,s),d=function(v,I,S){const A=S.baseMutations.map(k=>ka(v.Tt,k)),O=S.mutations.map(k=>ka(v.Tt,k));return{userId:I,batchId:S.batchId,localWriteTimeMs:S.localWriteTime.toMillis(),baseMutations:A,mutations:O}}(this.serializer,this.userId,u),f=[];let p=new Re((g,v)=>ue(g.canonicalString(),v.canonicalString()));for(const g of s){const v=Eg(this.userId,g.key.path,c);p=p.add(g.key.path.popLast()),f.push(o.put(d)),f.push(i.put(v,AT))}return p.forEach(g=>{f.push(this.indexManager.addToCollectionParentIndex(e,g))}),e.addOnCommittedListener(()=>{this.Bn[c]=u.keys()}),D.waitFor(f).next(()=>u)})}lookupMutationBatch(e,t){return yn(e).get(t).next(r=>r?(ne(r.userId===this.userId),or(this.serializer,r)):null)}Ln(e,t){return this.Bn[t]?D.resolve(this.Bn[t]):this.lookupMutationBatch(e,t).next(r=>{if(r){const s=r.keys();return this.Bn[t]=s,s}return null})}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=IDBKeyRange.lowerBound([this.userId,r]);let i=null;return yn(e).Z({index:lr,range:s},(o,c,u)=>{c.userId===this.userId&&(ne(c.batchId>=r),i=or(this.serializer,c)),u.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=fr;return yn(e).Z({index:lr,range:t,reverse:!0},(s,i,o)=>{r=i.batchId,o.done()}).next(()=>r)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,fr],[this.userId,Number.POSITIVE_INFINITY]);return yn(e).G(lr,t).next(r=>r.map(s=>or(this.serializer,s)))}getAllMutationBatchesAffectingDocumentKey(e,t){const r=Yo(this.userId,t.path),s=IDBKeyRange.lowerBound(r),i=[];return Zr(e).Z({range:s},(o,c,u)=>{const[d,f,p]=o,g=qt(f);if(d===this.userId&&t.path.isEqual(g))return yn(e).get(p).next(v=>{if(!v)throw ee();ne(v.userId===this.userId),i.push(or(this.serializer,v))});u.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Re(ue);const s=[];return t.forEach(i=>{const o=Yo(this.userId,i.path),c=IDBKeyRange.lowerBound(o),u=Zr(e).Z({range:c},(d,f,p)=>{const[g,v,I]=d,S=qt(v);g===this.userId&&i.path.isEqual(S)?r=r.add(I):p.done()});s.push(u)}),D.waitFor(s).next(()=>this.kn(e,r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1,i=Yo(this.userId,r),o=IDBKeyRange.lowerBound(i);let c=new Re(ue);return Zr(e).Z({range:o},(u,d,f)=>{const[p,g,v]=u,I=qt(g);p===this.userId&&r.isPrefixOf(I)?I.length===s&&(c=c.add(v)):f.done()}).next(()=>this.kn(e,c))}kn(e,t){const r=[],s=[];return t.forEach(i=>{s.push(yn(e).get(i).next(o=>{if(o===null)throw ee();ne(o.userId===this.userId),r.push(or(this.serializer,o))}))}),D.waitFor(s).next(()=>r)}removeMutationBatch(e,t){return P_(e.ue,this.userId,t).next(r=>(e.addOnCommittedListener(()=>{this.qn(t.batchId)}),D.forEach(r,s=>this.referenceDelegate.markPotentiallyOrphaned(e,s))))}qn(e){delete this.Bn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return D.resolve();const r=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),s=[];return Zr(e).Z({range:r},(i,o,c)=>{if(i[0]===this.userId){const u=qt(i[1]);s.push(u)}else c.done()}).next(()=>{ne(s.length===0)})})}containsKey(e,t){return x_(e,this.userId,t)}Qn(e){return N_(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:fr,lastStreamToken:""})}}function x_(n,e,t){const r=Yo(e,t.path),s=r[1],i=IDBKeyRange.lowerBound(r);let o=!1;return Zr(n).Z({range:i,Y:!0},(c,u,d)=>{const[f,p,g]=c;f===e&&p===s&&(o=!0),d.done()}).next(()=>o)}function yn(n){return Ke(n,Dt)}function Zr(n){return Ke(n,ps)}function N_(n){return Ke(n,Pi)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ar{constructor(e){this.$n=e}next(){return this.$n+=2,this.$n}static Un(){return new Ar(0)}static Kn(){return new Ar(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QA{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.Wn(e).next(t=>{const r=new Ar(t.highestTargetId);return t.highestTargetId=r.next(),this.Gn(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.Wn(e).next(t=>ie.fromTimestamp(new Oe(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.Wn(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,r){return this.Wn(e).next(s=>(s.highestListenSequenceNumber=t,r&&(s.lastRemoteSnapshotVersion=r.toTimestamp()),t>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=t),this.Gn(e,s)))}addTargetData(e,t){return this.zn(e,t).next(()=>this.Wn(e).next(r=>(r.targetCount+=1,this.jn(t,r),this.Gn(e,r))))}updateTargetData(e,t){return this.zn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>Wr(e).delete(t.targetId)).next(()=>this.Wn(e)).next(r=>(ne(r.targetCount>0),r.targetCount-=1,this.Gn(e,r)))}removeTargets(e,t,r){let s=0;const i=[];return Wr(e).Z((o,c)=>{const u=li(c);u.sequenceNumber<=t&&r.get(u.targetId)===null&&(s++,i.push(this.removeTargetData(e,u)))}).next(()=>D.waitFor(i)).next(()=>s)}forEachTarget(e,t){return Wr(e).Z((r,s)=>{const i=li(s);t(i)})}Wn(e){return ap(e).get(ba).next(t=>(ne(t!==null),t))}Gn(e,t){return ap(e).put(ba,t)}zn(e,t){return Wr(e).put(A_(this.serializer,t))}jn(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.Wn(e).next(t=>t.targetCount)}getTargetData(e,t){const r=Ir(t),s=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let i=null;return Wr(e).Z({range:s,index:Ag},(o,c,u)=>{const d=li(c);Yi(t,d.target)&&(i=d,u.done())}).next(()=>i)}addMatchingKeys(e,t,r){const s=[],i=Rn(e);return t.forEach(o=>{const c=ot(o.path);s.push(i.put({targetId:r,path:c})),s.push(this.referenceDelegate.addReference(e,r,o))}),D.waitFor(s)}removeMatchingKeys(e,t,r){const s=Rn(e);return D.forEach(t,i=>{const o=ot(i.path);return D.waitFor([s.delete([r,o]),this.referenceDelegate.removeReference(e,r,i)])})}removeMatchingKeysForTargetId(e,t){const r=Rn(e),s=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(s)}getMatchingKeysForTargetId(e,t){const r=IDBKeyRange.bound([t],[t+1],!1,!0),s=Rn(e);let i=me();return s.Z({range:r,Y:!0},(o,c,u)=>{const d=qt(o[1]),f=new J(d);i=i.add(f)}).next(()=>i)}containsKey(e,t){const r=ot(t.path),s=IDBKeyRange.bound([r],[vg(r)],!1,!0);let i=0;return Rn(e).Z({index:Tu,Y:!0,range:s},([o,c],u,d)=>{o!==0&&(i++,d.done())}).next(()=>i>0)}lt(e,t){return Wr(e).get(t).next(r=>r?li(r):null)}}function Wr(n){return Ke(n,ms)}function ap(n){return Ke(n,pr)}function Rn(n){return Ke(n,gs)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cp="LruGarbageCollector",D_=1048576;function lp([n,e],[t,r]){const s=ue(n,t);return s===0?ue(e,r):s}class YA{constructor(e){this.Hn=e,this.buffer=new Re(lp),this.Jn=0}Yn(){return++this.Jn}Zn(e){const t=[e,this.Yn()];if(this.buffer.size<this.Hn)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();lp(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class V_{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Xn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.er(6e4)}stop(){this.Xn&&(this.Xn.cancel(),this.Xn=null)}get started(){return this.Xn!==null}er(e){K(cp,`Garbage collection scheduled in ${e}ms`),this.Xn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Xn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){qn(t)?K(cp,"Ignoring IndexedDB error during garbage collection: ",t):await Dr(t)}await this.er(3e5)})}}class JA{constructor(e,t){this.tr=e,this.params=t}calculateTargetCount(e,t){return this.tr.nr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return D.resolve(Pt.ae);const r=new YA(t);return this.tr.forEachTarget(e,s=>r.Zn(s.sequenceNumber)).next(()=>this.tr.rr(e,s=>r.Zn(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.tr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.tr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(K("LruGarbageCollector","Garbage collection skipped; disabled"),D.resolve(op)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(K("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),op):this.ir(e,t))}getCacheSize(e){return this.tr.getCacheSize(e)}ir(e,t){let r,s,i,o,c,u,d;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(K("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,o=Date.now(),this.nthSequenceNumber(e,s))).next(p=>(r=p,c=Date.now(),this.removeTargets(e,r,t))).next(p=>(i=p,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(p=>(d=Date.now(),Qr()<=ge.DEBUG&&K("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${p} documents in `+(d-u)+`ms
Total Duration: ${d-f}ms`),D.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p})))}}function O_(n,e){return new JA(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XA{constructor(e,t){this.db=e,this.garbageCollector=O_(this,t)}nr(e){const t=this.sr(e);return this.db.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}sr(e){let t=0;return this.rr(e,r=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}rr(e,t){return this._r(e,(r,s)=>t(s))}addReference(e,t,r){return Po(e,r)}removeReference(e,t,r){return Po(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return Po(e,t)}ar(e,t){return function(s,i){let o=!1;return N_(s).X(c=>x_(s,c,i).next(u=>(u&&(o=!0),D.resolve(!u)))).next(()=>o)}(e,t)}removeOrphanedDocuments(e,t){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this._r(e,(o,c)=>{if(c<=t){const u=this.ar(e,o).next(d=>{if(!d)return i++,r.getEntry(e,o).next(()=>(r.removeEntry(o,ie.min()),Rn(e).delete(function(p){return[0,ot(p.path)]}(o))))});s.push(u)}}).next(()=>D.waitFor(s)).next(()=>r.apply(e)).next(()=>i)}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return Po(e,t)}_r(e,t){const r=Rn(e);let s,i=Pt.ae;return r.Z({index:Tu},([o,c],{path:u,sequenceNumber:d})=>{o===0?(i!==Pt.ae&&t(new J(qt(s)),i),i=d,s=u):i=Pt.ae}).next(()=>{i!==Pt.ae&&t(new J(qt(s)),i)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Po(n,e){return Rn(n).put(function(r,s){return{targetId:0,path:ot(r.path),sequenceNumber:s}}(e,n.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L_{constructor(){this.changes=new hn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Me.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?D.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZA{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return Jn(e).put(r)}removeEntry(e,t,r){return Jn(e).delete(function(i,o){const c=i.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],Ca(o),c[c.length-1]]}(t,r))}updateMetadata(e,t){return this.getMetadata(e).next(r=>(r.byteSize+=t,this.ur(e,r)))}getEntry(e,t){let r=Me.newInvalidDocument(t);return Jn(e).Z({index:Jo,range:IDBKeyRange.only(ei(t))},(s,i)=>{r=this.cr(t,i)}).next(()=>r)}lr(e,t){let r={size:0,document:Me.newInvalidDocument(t)};return Jn(e).Z({index:Jo,range:IDBKeyRange.only(ei(t))},(s,i)=>{r={document:this.cr(t,i),size:xa(i)}}).next(()=>r)}getEntries(e,t){let r=Et();return this.hr(e,t,(s,i)=>{const o=this.cr(s,i);r=r.insert(s,o)}).next(()=>r)}Pr(e,t){let r=Et(),s=new xe(J.comparator);return this.hr(e,t,(i,o)=>{const c=this.cr(i,o);r=r.insert(i,c),s=s.insert(i,xa(o))}).next(()=>({documents:r,Tr:s}))}hr(e,t,r){if(t.isEmpty())return D.resolve();let s=new Re(hp);t.forEach(u=>s=s.add(u));const i=IDBKeyRange.bound(ei(s.first()),ei(s.last())),o=s.getIterator();let c=o.getNext();return Jn(e).Z({index:Jo,range:i},(u,d,f)=>{const p=J.fromSegments([...d.prefixPath,d.collectionGroup,d.documentId]);for(;c&&hp(c,p)<0;)r(c,null),c=o.getNext();c&&c.isEqual(p)&&(r(c,d),c=o.hasNext()?o.getNext():null),c?f.W(ei(c)):f.done()}).next(()=>{for(;c;)r(c,null),c=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,r,s,i){const o=t.path,c=[o.popLast().toArray(),o.lastSegment(),Ca(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],u=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Jn(e).G(IDBKeyRange.bound(c,u,!0)).next(d=>{i?.incrementDocumentReadCount(d.length);let f=Et();for(const p of d){const g=this.cr(J.fromSegments(p.prefixPath.concat(p.collectionGroup,p.documentId)),p);g.isFoundDocument()&&(Xi(t,g)||s.has(g.key))&&(f=f.insert(g.key,g))}return f})}getAllFromCollectionGroup(e,t,r,s){let i=Et();const o=dp(t,r),c=dp(t,St.max());return Jn(e).Z({index:Tg,range:IDBKeyRange.bound(o,c,!0)},(u,d,f)=>{const p=this.cr(J.fromSegments(d.prefixPath.concat(d.collectionGroup,d.documentId)),d);i=i.insert(p.key,p),i.size===s&&f.done()}).next(()=>i)}newChangeBuffer(e){return new e0(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return up(e).get(Cl).next(t=>(ne(!!t),t))}ur(e,t){return up(e).put(Cl,t)}cr(e,t){if(t){const r=UA(this.serializer,t);if(!(r.isNoDocument()&&r.version.isEqual(ie.min())))return r}return Me.newInvalidDocument(e)}}function M_(n){return new ZA(n)}class e0 extends L_{constructor(e,t){super(),this.Ir=e,this.trackRemovals=t,this.Er=new hn(r=>r.toString(),(r,s)=>r.isEqual(s))}applyChanges(e){const t=[];let r=0,s=new Re((i,o)=>ue(i.canonicalString(),o.canonicalString()));return this.changes.forEach((i,o)=>{const c=this.Er.get(i);if(t.push(this.Ir.removeEntry(e,i,c.readTime)),o.isValidDocument()){const u=Wf(this.Ir.serializer,o);s=s.add(i.path.popLast());const d=xa(u);r+=d-c.size,t.push(this.Ir.addEntry(e,i,u))}else if(r-=c.size,this.trackRemovals){const u=Wf(this.Ir.serializer,o.convertToNoDocument(ie.min()));t.push(this.Ir.addEntry(e,i,u))}}),s.forEach(i=>{t.push(this.Ir.indexManager.addToCollectionParentIndex(e,i))}),t.push(this.Ir.updateMetadata(e,r)),D.waitFor(t)}getFromCache(e,t){return this.Ir.lr(e,t).next(r=>(this.Er.set(t,{size:r.size,readTime:r.document.readTime}),r.document))}getAllFromCache(e,t){return this.Ir.Pr(e,t).next(({documents:r,Tr:s})=>(s.forEach((i,o)=>{this.Er.set(i,{size:o,readTime:r.get(i).readTime})}),r))}}function up(n){return Ke(n,xi)}function Jn(n){return Ke(n,ya)}function ei(n){const e=n.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function dp(n,e){const t=e.documentKey.path.toArray();return[n,Ca(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function hp(n,e){const t=n.path.toArray(),r=e.path.toArray();let s=0;for(let i=0;i<t.length-2&&i<r.length-2;++i)if(s=ue(t[i],r[i]),s)return s;return s=ue(t.length,r.length),s||(s=ue(t[t.length-2],r[r.length-2]),s||ue(t[t.length-1],r[r.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class t0{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F_{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&gi(r.mutation,s,gt.empty(),Oe.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,me()).next(()=>r))}getLocalViewOfDocuments(e,t,r=me()){const s=jt();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let o=ai();return i.forEach((c,u)=>{o=o.insert(c,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const r=jt();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,me()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,c)=>{t.set(o,c)})})}computeViews(e,t,r,s){let i=Et();const o=mi(),c=function(){return mi()}();return t.forEach((u,d)=>{const f=r.get(d.key);s.has(d.key)&&(f===void 0||f.mutation instanceof fn)?i=i.insert(d.key,d):f!==void 0?(o.set(d.key,f.mutation.getFieldMask()),gi(f.mutation,d,f.mutation.getFieldMask(),Oe.now())):o.set(d.key,gt.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((d,f)=>o.set(d,f)),t.forEach((d,f)=>{var p;return c.set(d,new t0(f,(p=o.get(d))!==null&&p!==void 0?p:null))}),c))}recalculateAndSaveOverlays(e,t){const r=mi();let s=new xe((o,c)=>o-c),i=me();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const c of o)c.keys().forEach(u=>{const d=t.get(u);if(d===null)return;let f=r.get(u)||gt.empty();f=c.applyToLocalView(d,f),r.set(u,f);const p=(s.get(c.batchId)||me()).add(u);s=s.insert(c.batchId,p)})}).next(()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),d=u.key,f=u.value,p=Zg();f.forEach(g=>{if(!i.has(g)){const v=a_(t.get(g),r.get(g));v!==null&&p.set(g,v),i=i.add(g)}}),o.push(this.documentOverlayCache.saveOverlays(e,d,p))}return D.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return function(o){return J.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):xu(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):D.resolve(jt());let c=Si,u=i;return o.next(d=>D.forEach(d,(f,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),i.get(f)?D.resolve():this.remoteDocumentCache.getEntry(e,f).next(g=>{u=u.insert(f,g)}))).next(()=>this.populateOverlays(e,d,i)).next(()=>this.computeViews(e,u,d,me())).next(f=>({batchId:c,changes:Xg(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new J(t)).next(r=>{let s=ai();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let o=ai();return this.indexManager.getCollectionParents(e,i).next(c=>D.forEach(c,u=>{const d=function(p,g){return new Vr(g,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,d,r,s).next(f=>{f.forEach((p,g)=>{o=o.insert(p,g)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(o=>{i.forEach((u,d)=>{const f=d.getKey();o.get(f)===null&&(o=o.insert(f,Me.newInvalidDocument(f)))});let c=ai();return o.forEach((u,d)=>{const f=i.get(u);f!==void 0&&gi(f.mutation,d,gt.empty(),Oe.now()),Xi(t,d)&&(c=c.insert(u,d))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n0{constructor(e){this.serializer=e,this.dr=new Map,this.Ar=new Map}getBundleMetadata(e,t){return D.resolve(this.dr.get(t))}saveBundleMetadata(e,t){return this.dr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:pt(s.createTime)}}(t)),D.resolve()}getNamedQuery(e,t){return D.resolve(this.Ar.get(t))}saveNamedQuery(e,t){return this.Ar.set(t.name,function(s){return{name:s.name,query:R_(s.bundledQuery),readTime:pt(s.readTime)}}(t)),D.resolve()}}/**
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
 */class r0{constructor(){this.overlays=new xe(J.comparator),this.Rr=new Map}getOverlay(e,t){return D.resolve(this.overlays.get(t))}getOverlays(e,t){const r=jt();return D.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.Et(e,t,i)}),D.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Rr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Rr.delete(r)),D.resolve()}getOverlaysForCollection(e,t,r){const s=jt(),i=t.length+1,o=new J(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const u=c.getNext().value,d=u.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return D.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new xe((d,f)=>d-f);const o=this.overlays.getIterator();for(;o.hasNext();){const d=o.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let f=i.get(d.largestBatchId);f===null&&(f=jt(),i=i.insert(d.largestBatchId,f)),f.set(d.getKey(),d)}}const c=jt(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((d,f)=>c.set(d,f)),!(c.size()>=s)););return D.resolve(c)}Et(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Rr.get(s.largestBatchId).delete(r.key);this.Rr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new Ou(t,r));let i=this.Rr.get(t);i===void 0&&(i=me(),this.Rr.set(t,i)),this.Rr.set(t,i.add(r.key))}}/**
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
 */class s0{constructor(){this.sessionToken=ze.EMPTY_BYTE_STRING}getSessionToken(e){return D.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,D.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bu{constructor(){this.Vr=new Re(We.mr),this.gr=new Re(We.pr)}isEmpty(){return this.Vr.isEmpty()}addReference(e,t){const r=new We(e,t);this.Vr=this.Vr.add(r),this.gr=this.gr.add(r)}yr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.wr(new We(e,t))}Sr(e,t){e.forEach(r=>this.removeReference(r,t))}br(e){const t=new J(new we([])),r=new We(t,e),s=new We(t,e+1),i=[];return this.gr.forEachInRange([r,s],o=>{this.wr(o),i.push(o.key)}),i}Dr(){this.Vr.forEach(e=>this.wr(e))}wr(e){this.Vr=this.Vr.delete(e),this.gr=this.gr.delete(e)}vr(e){const t=new J(new we([])),r=new We(t,e),s=new We(t,e+1);let i=me();return this.gr.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(e){const t=new We(e,0),r=this.Vr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class We{constructor(e,t){this.key=e,this.Cr=t}static mr(e,t){return J.comparator(e.key,t.key)||ue(e.Cr,t.Cr)}static pr(e,t){return ue(e.Cr,t.Cr)||J.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i0{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Fr=1,this.Mr=new Re(We.mr)}checkEmpty(e){return D.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Fr;this.Fr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Du(i,t,r,s);this.mutationQueue.push(o);for(const c of s)this.Mr=this.Mr.add(new We(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return D.resolve(o)}lookupMutationBatch(e,t){return D.resolve(this.Or(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Nr(r),i=s<0?0:s;return D.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return D.resolve(this.mutationQueue.length===0?fr:this.Fr-1)}getAllMutationBatches(e){return D.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new We(t,0),s=new We(t,Number.POSITIVE_INFINITY),i=[];return this.Mr.forEachInRange([r,s],o=>{const c=this.Or(o.Cr);i.push(c)}),D.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Re(ue);return t.forEach(s=>{const i=new We(s,0),o=new We(s,Number.POSITIVE_INFINITY);this.Mr.forEachInRange([i,o],c=>{r=r.add(c.Cr)})}),D.resolve(this.Br(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;J.isDocumentKey(i)||(i=i.child(""));const o=new We(new J(i),0);let c=new Re(ue);return this.Mr.forEachWhile(u=>{const d=u.key.path;return!!r.isPrefixOf(d)&&(d.length===s&&(c=c.add(u.Cr)),!0)},o),D.resolve(this.Br(c))}Br(e){const t=[];return e.forEach(r=>{const s=this.Or(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){ne(this.Lr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.Mr;return D.forEach(t.mutations,s=>{const i=new We(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Mr=r})}qn(e){}containsKey(e,t){const r=new We(t,0),s=this.Mr.firstAfterOrEqual(r);return D.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,D.resolve()}Lr(e,t){return this.Nr(e)}Nr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Or(e){const t=this.Nr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o0{constructor(e){this.kr=e,this.docs=function(){return new xe(J.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,o=this.kr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return D.resolve(r?r.document.mutableCopy():Me.newInvalidDocument(t))}getEntries(e,t){let r=Et();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Me.newInvalidDocument(s))}),D.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=Et();const o=t.path,c=new J(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:d,value:{document:f}}=u.getNext();if(!o.isPrefixOf(d.path))break;d.path.length>o.length+1||Iu(yg(f),r)<=0||(s.has(f.key)||Xi(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return D.resolve(i)}getAllFromCollectionGroup(e,t,r,s){ee()}qr(e,t){return D.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new a0(this)}getSize(e){return D.resolve(this.size)}}class a0 extends L_{constructor(e){super(),this.Ir=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.Ir.addEntry(e,s)):this.Ir.removeEntry(r)}),D.waitFor(t)}getFromCache(e,t){return this.Ir.getEntry(e,t)}getAllFromCache(e,t){return this.Ir.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class c0{constructor(e){this.persistence=e,this.Qr=new hn(t=>Ir(t),Yi),this.lastRemoteSnapshotVersion=ie.min(),this.highestTargetId=0,this.$r=0,this.Ur=new Bu,this.targetCount=0,this.Kr=Ar.Un()}forEachTarget(e,t){return this.Qr.forEach((r,s)=>t(s)),D.resolve()}getLastRemoteSnapshotVersion(e){return D.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return D.resolve(this.$r)}allocateTargetId(e){return this.highestTargetId=this.Kr.next(),D.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.$r&&(this.$r=t),D.resolve()}zn(e){this.Qr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.Kr=new Ar(t),this.highestTargetId=t),e.sequenceNumber>this.$r&&(this.$r=e.sequenceNumber)}addTargetData(e,t){return this.zn(t),this.targetCount+=1,D.resolve()}updateTargetData(e,t){return this.zn(t),D.resolve()}removeTargetData(e,t){return this.Qr.delete(t.target),this.Ur.br(t.targetId),this.targetCount-=1,D.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.Qr.forEach((o,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.Qr.delete(o),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)}),D.waitFor(i).next(()=>s)}getTargetCount(e){return D.resolve(this.targetCount)}getTargetData(e,t){const r=this.Qr.get(t)||null;return D.resolve(r)}addMatchingKeys(e,t,r){return this.Ur.yr(t,r),D.resolve()}removeMatchingKeys(e,t,r){this.Ur.Sr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),D.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Ur.br(t),D.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Ur.vr(t);return D.resolve(r)}containsKey(e,t){return D.resolve(this.Ur.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $u{constructor(e,t){this.Wr={},this.overlays={},this.Gr=new Pt(0),this.zr=!1,this.zr=!0,this.jr=new s0,this.referenceDelegate=e(this),this.Hr=new c0(this),this.indexManager=new KA,this.remoteDocumentCache=function(s){return new o0(s)}(r=>this.referenceDelegate.Jr(r)),this.serializer=new T_(t),this.Yr=new n0(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.zr=!1,Promise.resolve()}get started(){return this.zr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new r0,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.Wr[e.toKey()];return r||(r=new i0(t,this.referenceDelegate),this.Wr[e.toKey()]=r),r}getGlobalsCache(){return this.jr}getTargetCache(){return this.Hr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Yr}runTransaction(e,t,r){K("MemoryPersistence","Starting transaction:",e);const s=new l0(this.Gr.next());return this.referenceDelegate.Zr(),r(s).next(i=>this.referenceDelegate.Xr(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}ei(e,t){return D.or(Object.values(this.Wr).map(r=>()=>r.containsKey(e,t)))}}class l0 extends wg{constructor(e){super(),this.currentSequenceNumber=e}}class mc{constructor(e){this.persistence=e,this.ti=new Bu,this.ni=null}static ri(e){return new mc(e)}get ii(){if(this.ni)return this.ni;throw ee()}addReference(e,t,r){return this.ti.addReference(r,t),this.ii.delete(r.toString()),D.resolve()}removeReference(e,t,r){return this.ti.removeReference(r,t),this.ii.add(r.toString()),D.resolve()}markPotentiallyOrphaned(e,t){return this.ii.add(t.toString()),D.resolve()}removeTarget(e,t){this.ti.br(t.targetId).forEach(s=>this.ii.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.ii.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}Zr(){this.ni=new Set}Xr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return D.forEach(this.ii,r=>{const s=J.fromPath(r);return this.si(e,s).next(i=>{i||t.removeEntry(s,ie.min())})}).next(()=>(this.ni=null,t.apply(e)))}updateLimboDocument(e,t){return this.si(e,t).next(r=>{r?this.ii.delete(t.toString()):this.ii.add(t.toString())})}Jr(e){return 0}si(e,t){return D.or([()=>D.resolve(this.ti.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.ei(e,t)])}}class Na{constructor(e,t){this.persistence=e,this.oi=new hn(r=>ot(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=O_(this,t)}static ri(e,t){return new Na(e,t)}Zr(){}Xr(e){return D.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}nr(e){const t=this.sr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}sr(e){let t=0;return this.rr(e,r=>{t++}).next(()=>t)}rr(e,t){return D.forEach(this.oi,(r,s)=>this.ar(e,r,s).next(i=>i?D.resolve():t(s)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.qr(e,o=>this.ar(e,o,t).next(c=>{c||(r++,i.removeEntry(o,ie.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.oi.set(t,e.currentSequenceNumber),D.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.oi.set(r,e.currentSequenceNumber),D.resolve()}removeReference(e,t,r){return this.oi.set(r,e.currentSequenceNumber),D.resolve()}updateLimboDocument(e,t){return this.oi.set(t,e.currentSequenceNumber),D.resolve()}Jr(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Zo(e.data.value)),t}ar(e,t,r){return D.or([()=>this.persistence.ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.oi.get(t);return D.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u0{constructor(e){this.serializer=e}B(e,t,r,s){const i=new ec("createOrUpgrade",t);r<1&&s>=1&&(function(u){u.createObjectStore(Qi)}(e),function(u){u.createObjectStore(Pi,{keyPath:TT}),u.createObjectStore(Dt,{keyPath:Tf,autoIncrement:!0}).createIndex(lr,Af,{unique:!0}),u.createObjectStore(ps)}(e),fp(e),function(u){u.createObjectStore(nr)}(e));let o=D.resolve();return r<3&&s>=3&&(r!==0&&(function(u){u.deleteObjectStore(gs),u.deleteObjectStore(ms),u.deleteObjectStore(pr)}(e),fp(e)),o=o.next(()=>function(u){const d=u.store(pr),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:ie.min().toTimestamp(),targetCount:0};return d.put(ba,f)}(i))),r<4&&s>=4&&(r!==0&&(o=o.next(()=>function(u,d){return d.store(Dt).G().next(p=>{u.deleteObjectStore(Dt),u.createObjectStore(Dt,{keyPath:Tf,autoIncrement:!0}).createIndex(lr,Af,{unique:!0});const g=d.store(Dt),v=p.map(I=>g.put(I));return D.waitFor(v)})}(e,i))),o=o.next(()=>{(function(u){u.createObjectStore(_s,{keyPath:DT})})(e)})),r<5&&s>=5&&(o=o.next(()=>this._i(i))),r<6&&s>=6&&(o=o.next(()=>(function(u){u.createObjectStore(xi)}(e),this.ai(i)))),r<7&&s>=7&&(o=o.next(()=>this.ui(i))),r<8&&s>=8&&(o=o.next(()=>this.ci(e,i))),r<9&&s>=9&&(o=o.next(()=>{(function(u){u.objectStoreNames.contains("remoteDocumentChanges")&&u.deleteObjectStore("remoteDocumentChanges")})(e)})),r<10&&s>=10&&(o=o.next(()=>this.li(i))),r<11&&s>=11&&(o=o.next(()=>{(function(u){u.createObjectStore(nc,{keyPath:VT})})(e),function(u){u.createObjectStore(rc,{keyPath:OT})}(e)})),r<12&&s>=12&&(o=o.next(()=>{(function(u){const d=u.createObjectStore(sc,{keyPath:qT});d.createIndex(xl,jT,{unique:!1}),d.createIndex(kg,zT,{unique:!1})})(e)})),r<13&&s>=13&&(o=o.next(()=>function(u){const d=u.createObjectStore(ya,{keyPath:RT});d.createIndex(Jo,ST),d.createIndex(Tg,kT)}(e)).next(()=>this.hi(e,i)).next(()=>e.deleteObjectStore(nr))),r<14&&s>=14&&(o=o.next(()=>this.Pi(e,i))),r<15&&s>=15&&(o=o.next(()=>function(u){u.createObjectStore(Au,{keyPath:LT,autoIncrement:!0}).createIndex(Pl,MT,{unique:!1}),u.createObjectStore(wa,{keyPath:FT}).createIndex(Rg,UT,{unique:!1}),u.createObjectStore(Ia,{keyPath:BT}).createIndex(Sg,$T,{unique:!1})}(e))),r<16&&s>=16&&(o=o.next(()=>{t.objectStore(wa).clear()}).next(()=>{t.objectStore(Ia).clear()})),r<17&&s>=17&&(o=o.next(()=>{(function(u){u.createObjectStore(Ru,{keyPath:GT})})(e)})),o}ai(e){let t=0;return e.store(nr).Z((r,s)=>{t+=xa(s)}).next(()=>{const r={byteSize:t};return e.store(xi).put(Cl,r)})}_i(e){const t=e.store(Pi),r=e.store(Dt);return t.G().next(s=>D.forEach(s,i=>{const o=IDBKeyRange.bound([i.userId,fr],[i.userId,i.lastAcknowledgedBatchId]);return r.G(lr,o).next(c=>D.forEach(c,u=>{ne(u.userId===i.userId);const d=or(this.serializer,u);return P_(e,i.userId,d).next(()=>{})}))}))}ui(e){const t=e.store(gs),r=e.store(nr);return e.store(pr).get(ba).next(s=>{const i=[];return r.Z((o,c)=>{const u=new we(o),d=function(p){return[0,ot(p)]}(u);i.push(t.get(d).next(f=>f?D.resolve():(p=>t.put({targetId:0,path:ot(p),sequenceNumber:s.highestListenSequenceNumber}))(u)))}).next(()=>D.waitFor(i))})}ci(e,t){e.createObjectStore(Ni,{keyPath:NT});const r=t.store(Ni),s=new Uu,i=o=>{if(s.add(o)){const c=o.lastSegment(),u=o.popLast();return r.put({collectionId:c,parent:ot(u)})}};return t.store(nr).Z({Y:!0},(o,c)=>{const u=new we(o);return i(u.popLast())}).next(()=>t.store(ps).Z({Y:!0},([o,c,u],d)=>{const f=qt(c);return i(f.popLast())}))}li(e){const t=e.store(ms);return t.Z((r,s)=>{const i=li(s),o=A_(this.serializer,i);return t.put(o)})}hi(e,t){const r=t.store(nr),s=[];return r.Z((i,o)=>{const c=t.store(ya),u=function(p){return p.document?new J(we.fromString(p.document.name).popFirst(5)):p.noDocument?J.fromSegments(p.noDocument.path):p.unknownDocument?J.fromSegments(p.unknownDocument.path):ee()}(o).path.toArray(),d={prefixPath:u.slice(0,u.length-2),collectionGroup:u[u.length-2],documentId:u[u.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};s.push(c.put(d))}).next(()=>D.waitFor(s))}Pi(e,t){const r=t.store(Dt),s=M_(this.serializer),i=new $u(mc.ri,this.serializer.Tt);return r.G().next(o=>{const c=new Map;return o.forEach(u=>{var d;let f=(d=c.get(u.userId))!==null&&d!==void 0?d:me();or(this.serializer,u).keys().forEach(p=>f=f.add(p)),c.set(u.userId,f)}),D.forEach(c,(u,d)=>{const f=new ht(d),p=fc.It(this.serializer,f),g=i.getIndexManager(f),v=pc.It(f,this.serializer,g,i.referenceDelegate);return new F_(s,v,p,g).recalculateAndSaveOverlaysForDocumentKeys(new Nl(t,Pt.ae),u).next()})})}}function fp(n){n.createObjectStore(gs,{keyPath:PT}).createIndex(Tu,xT,{unique:!0}),n.createObjectStore(ms,{keyPath:"targetId"}).createIndex(Ag,CT,{unique:!0}),n.createObjectStore(pr)}const bn="IndexedDbPersistence",rl=18e5,sl=5e3,il="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",d0="main";class qu{constructor(e,t,r,s,i,o,c,u,d,f,p=17){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.Ti=i,this.window=o,this.document=c,this.Ii=d,this.Ei=f,this.di=p,this.Gr=null,this.zr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Ai=null,this.inForeground=!1,this.Ri=null,this.Vi=null,this.mi=Number.NEGATIVE_INFINITY,this.fi=g=>Promise.resolve(),!qu.D())throw new W(B.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new XA(this,s),this.gi=t+d0,this.serializer=new T_(u),this.pi=new Dn(this.gi,this.di,new u0(this.serializer)),this.jr=new $A,this.Hr=new QA(this.referenceDelegate,this.serializer),this.remoteDocumentCache=M_(this.serializer),this.Yr=new BA,this.window&&this.window.localStorage?this.yi=this.window.localStorage:(this.yi=null,f===!1&&ft(bn,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.wi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new W(B.FAILED_PRECONDITION,il);return this.Si(),this.bi(),this.Di(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Hr.getHighestSequenceNumber(e))}).then(e=>{this.Gr=new Pt(e,this.Ii)}).then(()=>{this.zr=!0}).catch(e=>(this.pi&&this.pi.close(),Promise.reject(e)))}Ci(e){return this.fi=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.pi.k(async t=>{t.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Ti.enqueueAndForget(async()=>{this.started&&await this.wi()}))}wi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>xo(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.Fi(e).next(t=>{t||(this.isPrimary=!1,this.Ti.enqueueRetryable(()=>this.fi(!1)))})}).next(()=>this.Mi(e)).next(t=>this.isPrimary&&!t?this.xi(e).next(()=>!1):!!t&&this.Oi(e).next(()=>!0))).catch(e=>{if(qn(e))return K(bn,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return K(bn,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Ti.enqueueRetryable(()=>this.fi(e)),this.isPrimary=e})}Fi(e){return ti(e).get(jr).next(t=>D.resolve(this.Ni(t)))}Bi(e){return xo(e).delete(this.clientId)}async Li(){if(this.isPrimary&&!this.ki(this.mi,rl)){this.mi=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{const r=Ke(t,_s);return r.G().next(s=>{const i=this.qi(s,rl),o=s.filter(c=>i.indexOf(c)===-1);return D.forEach(o,c=>r.delete(c.clientId)).next(()=>o)})}).catch(()=>[]);if(this.yi)for(const t of e)this.yi.removeItem(this.Qi(t.clientId))}}Di(){this.Vi=this.Ti.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.wi().then(()=>this.Li()).then(()=>this.Di()))}Ni(e){return!!e&&e.ownerId===this.clientId}Mi(e){return this.Ei?D.resolve(!0):ti(e).get(jr).next(t=>{if(t!==null&&this.ki(t.leaseTimestampMs,sl)&&!this.$i(t.ownerId)){if(this.Ni(t)&&this.networkEnabled)return!0;if(!this.Ni(t)){if(!t.allowTabSynchronization)throw new W(B.FAILED_PRECONDITION,il);return!1}}return!(!this.networkEnabled||!this.inForeground)||xo(e).G().next(r=>this.qi(r,sl).find(s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,o=!this.inForeground&&s.inForeground,c=this.networkEnabled===s.networkEnabled;if(i||o&&c)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&K(bn,`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.zr=!1,this.Ui(),this.Vi&&(this.Vi.cancel(),this.Vi=null),this.Ki(),this.Wi(),await this.pi.runTransaction("shutdown","readwrite",[Qi,_s],e=>{const t=new Nl(e,Pt.ae);return this.xi(t).next(()=>this.Bi(t))}),this.pi.close(),this.Gi()}qi(e,t){return e.filter(r=>this.ki(r.updateTimeMs,t)&&!this.$i(r.clientId))}zi(){return this.runTransaction("getActiveClients","readonly",e=>xo(e).G().next(t=>this.qi(t,rl).map(r=>r.clientId)))}get started(){return this.zr}getGlobalsCache(){return this.jr}getMutationQueue(e,t){return pc.It(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Hr}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new WA(e,this.serializer.Tt.databaseId)}getDocumentOverlayCache(e){return fc.It(this.serializer,e)}getBundleCache(){return this.Yr}runTransaction(e,t,r){K(bn,"Starting transaction:",e);const s=t==="readonly"?"readonly":"readwrite",i=function(u){return u===17?WT:u===16?KT:u===15?Su:u===14?xg:u===13?Pg:u===12?HT:u===11?Cg:void ee()}(this.di);let o;return this.pi.runTransaction(e,s,i,c=>(o=new Nl(c,this.Gr?this.Gr.next():Pt.ae),t==="readwrite-primary"?this.Fi(o).next(u=>!!u||this.Mi(o)).next(u=>{if(!u)throw ft(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Ti.enqueueRetryable(()=>this.fi(!1)),new W(B.FAILED_PRECONDITION,bg);return r(o)}).next(u=>this.Oi(o).next(()=>u)):this.ji(o).next(()=>r(o)))).then(c=>(o.raiseOnCommittedEvent(),c))}ji(e){return ti(e).get(jr).next(t=>{if(t!==null&&this.ki(t.leaseTimestampMs,sl)&&!this.$i(t.ownerId)&&!this.Ni(t)&&!(this.Ei||this.allowTabSynchronization&&t.allowTabSynchronization))throw new W(B.FAILED_PRECONDITION,il)})}Oi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return ti(e).put(jr,t)}static D(){return Dn.D()}xi(e){const t=ti(e);return t.get(jr).next(r=>this.Ni(r)?(K(bn,"Releasing primary lease."),t.delete(jr)):D.resolve())}ki(e,t){const r=Date.now();return!(e<r-t)&&(!(e>r)||(ft(`Detected an update time that is in the future: ${e} > ${r}`),!1))}Si(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ri=()=>{this.Ti.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.wi()))},this.document.addEventListener("visibilitychange",this.Ri),this.inForeground=this.document.visibilityState==="visible")}Ki(){this.Ri&&(this.document.removeEventListener("visibilitychange",this.Ri),this.Ri=null)}bi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Ai=()=>{this.Ui();const t=/(?:Version|Mobile)\/1[456]/;Em()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.Ti.enterRestrictedMode(!0),this.Ti.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Ai))}Wi(){this.Ai&&(this.window.removeEventListener("pagehide",this.Ai),this.Ai=null)}$i(e){var t;try{const r=((t=this.yi)===null||t===void 0?void 0:t.getItem(this.Qi(e)))!==null;return K(bn,`Client '${e}' ${r?"is":"is not"} zombied in LocalStorage`),r}catch(r){return ft(bn,"Failed to get zombied client id.",r),!1}}Ui(){if(this.yi)try{this.yi.setItem(this.Qi(this.clientId),String(Date.now()))}catch(e){ft("Failed to set zombie client id.",e)}}Gi(){if(this.yi)try{this.yi.removeItem(this.Qi(this.clientId))}catch{}}Qi(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function ti(n){return Ke(n,Qi)}function xo(n){return Ke(n,_s)}function h0(n,e){let t=n.projectId;return n.isDefaultDatabase||(t+="."+n.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ju{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Hi=r,this.Ji=s}static Yi(e,t){let r=me(),s=me();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new ju(e,t.fromCache,r,s)}}/**
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
 */class f0{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U_{constructor(){this.Zi=!1,this.Xi=!1,this.es=100,this.ts=function(){return Em()?8:Ig(He())>0?6:4}()}initialize(e,t){this.ns=e,this.indexManager=t,this.Zi=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.rs(e,t).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.ss(e,t,s,r).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new f0;return this._s(e,t,o).next(c=>{if(i.result=c,this.Xi)return this.us(e,t,o,c.size)})}).next(()=>i.result)}us(e,t,r,s){return r.documentReadCount<this.es?(Qr()<=ge.DEBUG&&K("QueryEngine","SDK will not create cache indexes for query:",Yr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.es,"documents"),D.resolve()):(Qr()<=ge.DEBUG&&K("QueryEngine","Query:",Yr(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.ts*s?(Qr()<=ge.DEBUG&&K("QueryEngine","The SDK decides to create cache indexes for query:",Yr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,xt(t))):D.resolve())}rs(e,t){if(Ff(t))return D.resolve(null);let r=xt(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=Ra(t,null,"F"),r=xt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const o=me(...i);return this.ns.getDocuments(e,o).next(c=>this.indexManager.getMinOffset(e,r).next(u=>{const d=this.cs(t,c);return this.ls(t,d,o,u.readTime)?this.rs(e,Ra(t,null,"F")):this.hs(e,d,t,u)}))})))}ss(e,t,r,s){return Ff(t)||s.isEqual(ie.min())?D.resolve(null):this.ns.getDocuments(e,r).next(i=>{const o=this.cs(t,i);return this.ls(t,o,r,s)?D.resolve(null):(Qr()<=ge.DEBUG&&K("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Yr(t)),this.hs(e,o,t,_T(s,Si)).next(c=>c))})}cs(e,t){let r=new Re(Yg(e));return t.forEach((s,i)=>{Xi(e,i)&&(r=r.add(i))}),r}ls(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}_s(e,t,r){return Qr()<=ge.DEBUG&&K("QueryEngine","Using full collection scan to execute query:",Yr(t)),this.ns.getDocumentsMatchingQuery(e,t,St.min(),r)}hs(e,t,r,s){return this.ns.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zu="LocalStore",p0=3e8;class m0{constructor(e,t,r,s){this.persistence=e,this.Ps=t,this.serializer=s,this.Ts=new xe(ue),this.Is=new hn(i=>Ir(i),Yi),this.Es=new Map,this.ds=e.getRemoteDocumentCache(),this.Hr=e.getTargetCache(),this.Yr=e.getBundleCache(),this.As(r)}As(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new F_(this.ds,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.ds.setIndexManager(this.indexManager),this.Ps.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ts))}}function B_(n,e,t,r){return new m0(n,e,t,r)}async function $_(n,e){const t=de(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.As(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const o=[],c=[];let u=me();for(const d of s){o.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}for(const d of i){c.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(r,u).next(d=>({Rs:d,removedBatchIds:o,addedBatchIds:c}))})})}function g0(n,e){const t=de(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.ds.newChangeBuffer({trackRemovals:!0});return function(c,u,d,f){const p=d.batch,g=p.keys();let v=D.resolve();return g.forEach(I=>{v=v.next(()=>f.getEntry(u,I)).next(S=>{const A=d.docVersions.get(I);ne(A!==null),S.version.compareTo(A)<0&&(p.applyToRemoteDocument(S,d),S.isValidDocument()&&(S.setReadTime(d.commitVersion),f.addEntry(S)))})}),v.next(()=>c.mutationQueue.removeMutationBatch(u,p))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let u=me();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(u=u.add(c.batch.mutations[d].key));return u}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function q_(n){const e=de(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Hr.getLastRemoteSnapshotVersion(t))}function _0(n,e){const t=de(n),r=e.snapshotVersion;let s=t.Ts;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=t.ds.newChangeBuffer({trackRemovals:!0});s=t.Ts;const c=[];e.targetChanges.forEach((f,p)=>{const g=s.get(p);if(!g)return;c.push(t.Hr.removeMatchingKeys(i,f.removedDocuments,p).next(()=>t.Hr.addMatchingKeys(i,f.addedDocuments,p)));let v=g.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?v=v.withResumeToken(ze.EMPTY_BYTE_STRING,ie.min()).withLastLimboFreeSnapshotVersion(ie.min()):f.resumeToken.approximateByteSize()>0&&(v=v.withResumeToken(f.resumeToken,r)),s=s.insert(p,v),function(S,A,O){return S.resumeToken.approximateByteSize()===0||A.snapshotVersion.toMicroseconds()-S.snapshotVersion.toMicroseconds()>=p0?!0:O.addedDocuments.size+O.modifiedDocuments.size+O.removedDocuments.size>0}(g,v,f)&&c.push(t.Hr.updateTargetData(i,v))});let u=Et(),d=me();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))}),c.push(v0(i,o,e.documentUpdates).next(f=>{u=f.Vs,d=f.fs})),!r.isEqual(ie.min())){const f=t.Hr.getLastRemoteSnapshotVersion(i).next(p=>t.Hr.setTargetsMetadata(i,i.currentSequenceNumber,r));c.push(f)}return D.waitFor(c).next(()=>o.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,u,d)).next(()=>u)}).then(i=>(t.Ts=s,i))}function v0(n,e,t){let r=me(),s=me();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let o=Et();return t.forEach((c,u)=>{const d=i.get(c);u.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual(ie.min())?(e.removeEntry(c,u.readTime),o=o.insert(c,u)):!d.isValidDocument()||u.version.compareTo(d.version)>0||u.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(u),o=o.insert(c,u)):K(zu,"Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",u.version)}),{Vs:o,fs:s}})}function y0(n,e){const t=de(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=fr),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function b0(n,e){const t=de(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.Hr.getTargetData(r,e).next(i=>i?(s=i,D.resolve(s)):t.Hr.allocateTargetId(r).next(o=>(s=new sn(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.Hr.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.Ts.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Ts=t.Ts.insert(r.targetId,r),t.Is.set(e,r.targetId)),r})}async function Hl(n,e,t){const r=de(n),s=r.Ts.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!qn(o))throw o;K(zu,`Failed to update sequence numbers for target ${e}: ${o}`)}r.Ts=r.Ts.remove(e),r.Is.delete(s.target)}function pp(n,e,t){const r=de(n);let s=ie.min(),i=me();return r.persistence.runTransaction("Execute query","readwrite",o=>function(u,d,f){const p=de(u),g=p.Is.get(f);return g!==void 0?D.resolve(p.Ts.get(g)):p.Hr.getTargetData(d,f)}(r,o,xt(e)).next(c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.Hr.getMatchingKeysForTargetId(o,c.targetId).next(u=>{i=u})}).next(()=>r.Ps.getDocumentsMatchingQuery(o,e,t?s:ie.min(),t?i:me())).next(c=>(w0(r,lA(e),c),{documents:c,gs:i})))}function w0(n,e,t){let r=n.Es.get(e)||ie.min();t.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.Es.set(e,r)}class mp{constructor(){this.activeTargetIds=mA()}Ds(e){this.activeTargetIds=this.activeTargetIds.add(e)}vs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}bs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class j_{constructor(){this.ho=new mp,this.Po={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.ho.Ds(e),this.Po[e]||"not-current"}updateQueryState(e,t,r){this.Po[e]=t}removeLocalQueryTarget(e){this.ho.vs(e)}isLocalQueryTarget(e){return this.ho.activeTargetIds.has(e)}clearQueryState(e){delete this.Po[e]}getAllActiveQueryTargets(){return this.ho.activeTargetIds}isActiveQueryTarget(e){return this.ho.activeTargetIds.has(e)}start(){return this.ho=new mp,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I0{To(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gp="ConnectivityMonitor";class _p{constructor(){this.Io=()=>this.Eo(),this.Ao=()=>this.Ro(),this.Vo=[],this.mo()}To(e){this.Vo.push(e)}shutdown(){window.removeEventListener("online",this.Io),window.removeEventListener("offline",this.Ao)}mo(){window.addEventListener("online",this.Io),window.addEventListener("offline",this.Ao)}Eo(){K(gp,"Network connectivity changed: AVAILABLE");for(const e of this.Vo)e(0)}Ro(){K(gp,"Network connectivity changed: UNAVAILABLE");for(const e of this.Vo)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let No=null;function Kl(){return No===null?No=function(){return 268435456+Math.round(2147483648*Math.random())}():No++,"0x"+No.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ol="RestConnection",E0={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class T0{get fo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.po=t+"://"+e.host,this.yo=`projects/${r}/databases/${s}`,this.wo=this.databaseId.database===Ea?`project_id=${r}`:`project_id=${r}&database_id=${s}`}So(e,t,r,s,i){const o=Kl(),c=this.bo(e,t.toUriEncodedString());K(ol,`Sending RPC '${e}' ${o}:`,c,r);const u={"google-cloud-resource-prefix":this.yo,"x-goog-request-params":this.wo};return this.Do(u,s,i),this.vo(e,c,u,r).then(d=>(K(ol,`Received RPC '${e}' ${o}: `,d),d),d=>{throw Ri(ol,`RPC '${e}' ${o} failed with error: `,d,"url: ",c,"request:",r),d})}Co(e,t,r,s,i,o){return this.So(e,t,r,s,i)}Do(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Vs}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}bo(e,t){const r=E0[e];return`${this.po}/v1/${t}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A0{constructor(e){this.Fo=e.Fo,this.Mo=e.Mo}xo(e){this.Oo=e}No(e){this.Bo=e}Lo(e){this.ko=e}onMessage(e){this.qo=e}close(){this.Mo()}send(e){this.Fo(e)}Qo(){this.Oo()}$o(){this.Bo()}Uo(e){this.ko(e)}Ko(e){this.qo(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nt="WebChannelConnection";class R0 extends T0{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}vo(e,t,r,s){const i=Kl();return new Promise((o,c)=>{const u=new hg;u.setWithCredentials(!0),u.listenOnce(fg.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case Wo.NO_ERROR:const f=u.getResponseJson();K(nt,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(f)),o(f);break;case Wo.TIMEOUT:K(nt,`RPC '${e}' ${i} timed out`),c(new W(B.DEADLINE_EXCEEDED,"Request time out"));break;case Wo.HTTP_ERROR:const p=u.getStatus();if(K(nt,`RPC '${e}' ${i} failed with status:`,p,"response text:",u.getResponseText()),p>0){let g=u.getResponseJson();Array.isArray(g)&&(g=g[0]);const v=g?.error;if(v&&v.status&&v.message){const I=function(A){const O=A.toLowerCase().replace(/_/g,"-");return Object.values(B).indexOf(O)>=0?O:B.UNKNOWN}(v.status);c(new W(I,v.message))}else c(new W(B.UNKNOWN,"Server responded with status "+u.getStatus()))}else c(new W(B.UNAVAILABLE,"Connection failed."));break;default:ee()}}finally{K(nt,`RPC '${e}' ${i} completed.`)}});const d=JSON.stringify(s);K(nt,`RPC '${e}' ${i} sending request:`,s),u.send(t,"POST",d,r,15)})}Wo(e,t,r){const s=Kl(),i=[this.po,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=gg(),c=mg(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(u.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Do(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;const f=i.join("");K(nt,`Creating RPC '${e}' stream ${s}: ${f}`,u);const p=o.createWebChannel(f,u);let g=!1,v=!1;const I=new A0({Fo:A=>{v?K(nt,`Not sending because RPC '${e}' stream ${s} is closed:`,A):(g||(K(nt,`Opening RPC '${e}' stream ${s} transport.`),p.open(),g=!0),K(nt,`RPC '${e}' stream ${s} sending:`,A),p.send(A))},Mo:()=>p.close()}),S=(A,O,k)=>{A.listen(O,x=>{try{k(x)}catch(F){setTimeout(()=>{throw F},0)}})};return S(p,oi.EventType.OPEN,()=>{v||(K(nt,`RPC '${e}' stream ${s} transport opened.`),I.Qo())}),S(p,oi.EventType.CLOSE,()=>{v||(v=!0,K(nt,`RPC '${e}' stream ${s} transport closed`),I.Uo())}),S(p,oi.EventType.ERROR,A=>{v||(v=!0,Ri(nt,`RPC '${e}' stream ${s} transport errored:`,A),I.Uo(new W(B.UNAVAILABLE,"The operation could not be completed")))}),S(p,oi.EventType.MESSAGE,A=>{var O;if(!v){const k=A.data[0];ne(!!k);const x=k,F=x?.error||((O=x[0])===null||O===void 0?void 0:O.error);if(F){K(nt,`RPC '${e}' stream ${s} received error:`,F);const P=F.status;let M=function(b){const R=qe[b];if(R!==void 0)return u_(R)}(P),T=F.message;M===void 0&&(M=B.INTERNAL,T="Unknown error status: "+P+" with message "+F.message),v=!0,I.Uo(new W(M,T)),p.close()}else K(nt,`RPC '${e}' stream ${s} received:`,k),I.Ko(k)}}),S(c,pg.STAT_EVENT,A=>{A.stat===Al.PROXY?K(nt,`RPC '${e}' stream ${s} detected buffering proxy`):A.stat===Al.NOPROXY&&K(nt,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{I.$o()},0),I}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */function S0(){return typeof window<"u"?window:null}function ra(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gc(n){return new CA(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z_{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Ti=e,this.timerId=t,this.Go=r,this.zo=s,this.jo=i,this.Ho=0,this.Jo=null,this.Yo=Date.now(),this.reset()}reset(){this.Ho=0}Zo(){this.Ho=this.jo}Xo(e){this.cancel();const t=Math.floor(this.Ho+this.e_()),r=Math.max(0,Date.now()-this.Yo),s=Math.max(0,t-r);s>0&&K("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ho} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Jo=this.Ti.enqueueAfterDelay(this.timerId,s,()=>(this.Yo=Date.now(),e())),this.Ho*=this.zo,this.Ho<this.Go&&(this.Ho=this.Go),this.Ho>this.jo&&(this.Ho=this.jo)}t_(){this.Jo!==null&&(this.Jo.skipDelay(),this.Jo=null)}cancel(){this.Jo!==null&&(this.Jo.cancel(),this.Jo=null)}e_(){return(Math.random()-.5)*this.Ho}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vp="PersistentStream";class G_{constructor(e,t,r,s,i,o,c,u){this.Ti=e,this.n_=r,this.r_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.i_=0,this.s_=null,this.o_=null,this.stream=null,this.__=0,this.a_=new z_(e,t)}u_(){return this.state===1||this.state===5||this.c_()}c_(){return this.state===2||this.state===3}start(){this.__=0,this.state!==4?this.auth():this.l_()}async stop(){this.u_()&&await this.close(0)}h_(){this.state=0,this.a_.reset()}P_(){this.c_()&&this.s_===null&&(this.s_=this.Ti.enqueueAfterDelay(this.n_,6e4,()=>this.T_()))}I_(e){this.E_(),this.stream.send(e)}async T_(){if(this.c_())return this.close(0)}E_(){this.s_&&(this.s_.cancel(),this.s_=null)}d_(){this.o_&&(this.o_.cancel(),this.o_=null)}async close(e,t){this.E_(),this.d_(),this.a_.cancel(),this.i_++,e!==4?this.a_.reset():t&&t.code===B.RESOURCE_EXHAUSTED?(ft(t.toString()),ft("Using maximum backoff delay to prevent overloading the backend."),this.a_.Zo()):t&&t.code===B.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.A_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Lo(t)}A_(){}auth(){this.state=1;const e=this.R_(this.i_),t=this.i_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.i_===t&&this.V_(r,s)},r=>{e(()=>{const s=new W(B.UNKNOWN,"Fetching auth token failed: "+r.message);return this.m_(s)})})}V_(e,t){const r=this.R_(this.i_);this.stream=this.f_(e,t),this.stream.xo(()=>{r(()=>this.listener.xo())}),this.stream.No(()=>{r(()=>(this.state=2,this.o_=this.Ti.enqueueAfterDelay(this.r_,1e4,()=>(this.c_()&&(this.state=3),Promise.resolve())),this.listener.No()))}),this.stream.Lo(s=>{r(()=>this.m_(s))}),this.stream.onMessage(s=>{r(()=>++this.__==1?this.g_(s):this.onNext(s))})}l_(){this.state=5,this.a_.Xo(async()=>{this.state=0,this.start()})}m_(e){return K(vp,`close with error: ${e}`),this.stream=null,this.close(4,e)}R_(e){return t=>{this.Ti.enqueueAndForget(()=>this.i_===e?t():(K(vp,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class k0 extends G_{constructor(e,t,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}f_(e,t){return this.connection.Wo("Listen",e,t)}g_(e){return this.onNext(e)}onNext(e){this.a_.reset();const t=NA(this.serializer,e),r=function(i){if(!("targetChange"in i))return ie.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?ie.min():o.readTime?pt(o.readTime):ie.min()}(e);return this.listener.p_(t,r)}y_(e){const t={};t.database=$l(this.serializer),t.addTarget=function(i,o){let c;const u=o.target;if(c=Ta(u)?{documents:v_(i,u)}:{query:y_(i,u).ht},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=f_(i,o.resumeToken);const d=Ul(i,o.expectedCount);d!==null&&(c.expectedCount=d)}else if(o.snapshotVersion.compareTo(ie.min())>0){c.readTime=Ts(i,o.snapshotVersion.toTimestamp());const d=Ul(i,o.expectedCount);d!==null&&(c.expectedCount=d)}return c}(this.serializer,e);const r=VA(this.serializer,e);r&&(t.labels=r),this.I_(t)}w_(e){const t={};t.database=$l(this.serializer),t.removeTarget=e,this.I_(t)}}class C0 extends G_{constructor(e,t,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}get S_(){return this.__>0}start(){this.lastStreamToken=void 0,super.start()}A_(){this.S_&&this.b_([])}f_(e,t){return this.connection.Wo("Write",e,t)}g_(e){return ne(!!e.streamToken),this.lastStreamToken=e.streamToken,ne(!e.writeResults||e.writeResults.length===0),this.listener.D_()}onNext(e){ne(!!e.streamToken),this.lastStreamToken=e.streamToken,this.a_.reset();const t=DA(e.writeResults,e.commitTime),r=pt(e.commitTime);return this.listener.v_(r,t)}C_(){const e={};e.database=$l(this.serializer),this.I_(e)}b_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>ka(this.serializer,r))};this.I_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P0{}class x0 extends P0{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.F_=!1}M_(){if(this.F_)throw new W(B.FAILED_PRECONDITION,"The client has already been terminated.")}So(e,t,r,s){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.So(e,Bl(t,r),s,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===B.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new W(B.UNKNOWN,i.toString())})}Co(e,t,r,s,i){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.Co(e,Bl(t,r),s,o,c,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===B.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new W(B.UNKNOWN,o.toString())})}terminate(){this.F_=!0,this.connection.terminate()}}class N0{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.x_=0,this.O_=null,this.N_=!0}B_(){this.x_===0&&(this.L_("Unknown"),this.O_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.O_=null,this.k_("Backend didn't respond within 10 seconds."),this.L_("Offline"),Promise.resolve())))}q_(e){this.state==="Online"?this.L_("Unknown"):(this.x_++,this.x_>=1&&(this.Q_(),this.k_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.L_("Offline")))}set(e){this.Q_(),this.x_=0,e==="Online"&&(this.N_=!1),this.L_(e)}L_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}k_(e){const t=`Could not reach Cloud Firestore backend. ${e}
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
 */const Rr="RemoteStore";class D0{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.U_=[],this.K_=new Map,this.W_=new Set,this.G_=[],this.z_=i,this.z_.To(o=>{r.enqueueAndForget(async()=>{Or(this)&&(K(Rr,"Restarting streams for network reachability change."),await async function(u){const d=de(u);d.W_.add(4),await eo(d),d.j_.set("Unknown"),d.W_.delete(4),await _c(d)}(this))})}),this.j_=new N0(r,s)}}async function _c(n){if(Or(n))for(const e of n.G_)await e(!0)}async function eo(n){for(const e of n.G_)await e(!1)}function H_(n,e){const t=de(n);t.K_.has(e.targetId)||(t.K_.set(e.targetId,e),Wu(t)?Ku(t):Ls(t).c_()&&Hu(t,e))}function Gu(n,e){const t=de(n),r=Ls(t);t.K_.delete(e),r.c_()&&K_(t,e),t.K_.size===0&&(r.c_()?r.P_():Or(t)&&t.j_.set("Unknown"))}function Hu(n,e){if(n.H_.Ne(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(ie.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Ls(n).y_(e)}function K_(n,e){n.H_.Ne(e),Ls(n).w_(e)}function Ku(n){n.H_=new AA({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),lt:e=>n.K_.get(e)||null,it:()=>n.datastore.serializer.databaseId}),Ls(n).start(),n.j_.B_()}function Wu(n){return Or(n)&&!Ls(n).u_()&&n.K_.size>0}function Or(n){return de(n).W_.size===0}function W_(n){n.H_=void 0}async function V0(n){n.j_.set("Online")}async function O0(n){n.K_.forEach((e,t)=>{Hu(n,e)})}async function L0(n,e){W_(n),Wu(n)?(n.j_.q_(e),Ku(n)):n.j_.set("Unknown")}async function M0(n,e,t){if(n.j_.set("Online"),e instanceof h_&&e.state===2&&e.cause)try{await async function(s,i){const o=i.cause;for(const c of i.targetIds)s.K_.has(c)&&(await s.remoteSyncer.rejectListen(c,o),s.K_.delete(c),s.H_.removeTarget(c))}(n,e)}catch(r){K(Rr,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Da(n,r)}else if(e instanceof na?n.H_.We(e):e instanceof d_?n.H_.Ze(e):n.H_.je(e),!t.isEqual(ie.min()))try{const r=await q_(n.localStore);t.compareTo(r)>=0&&await function(i,o){const c=i.H_.ot(o);return c.targetChanges.forEach((u,d)=>{if(u.resumeToken.approximateByteSize()>0){const f=i.K_.get(d);f&&i.K_.set(d,f.withResumeToken(u.resumeToken,o))}}),c.targetMismatches.forEach((u,d)=>{const f=i.K_.get(u);if(!f)return;i.K_.set(u,f.withResumeToken(ze.EMPTY_BYTE_STRING,f.snapshotVersion)),K_(i,u);const p=new sn(f.target,u,d,f.sequenceNumber);Hu(i,p)}),i.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){K(Rr,"Failed to raise snapshot:",r),await Da(n,r)}}async function Da(n,e,t){if(!qn(e))throw e;n.W_.add(1),await eo(n),n.j_.set("Offline"),t||(t=()=>q_(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{K(Rr,"Retrying IndexedDB access"),await t(),n.W_.delete(1),await _c(n)})}function Q_(n,e){return e().catch(t=>Da(n,t,e))}async function to(n){const e=de(n),t=Fn(e);let r=e.U_.length>0?e.U_[e.U_.length-1].batchId:fr;for(;F0(e);)try{const s=await y0(e.localStore,r);if(s===null){e.U_.length===0&&t.P_();break}r=s.batchId,U0(e,s)}catch(s){await Da(e,s)}Y_(e)&&J_(e)}function F0(n){return Or(n)&&n.U_.length<10}function U0(n,e){n.U_.push(e);const t=Fn(n);t.c_()&&t.S_&&t.b_(e.mutations)}function Y_(n){return Or(n)&&!Fn(n).u_()&&n.U_.length>0}function J_(n){Fn(n).start()}async function B0(n){Fn(n).C_()}async function $0(n){const e=Fn(n);for(const t of n.U_)e.b_(t.mutations)}async function q0(n,e,t){const r=n.U_.shift(),s=Vu.from(r,e,t);await Q_(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await to(n)}async function j0(n,e){e&&Fn(n).S_&&await async function(r,s){if(function(o){return EA(o)&&o!==B.ABORTED}(s.code)){const i=r.U_.shift();Fn(r).h_(),await Q_(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await to(r)}}(n,e),Y_(n)&&J_(n)}async function yp(n,e){const t=de(n);t.asyncQueue.verifyOperationInProgress(),K(Rr,"RemoteStore received new credentials");const r=Or(t);t.W_.add(3),await eo(t),r&&t.j_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.W_.delete(3),await _c(t)}async function z0(n,e){const t=de(n);e?(t.W_.delete(2),await _c(t)):e||(t.W_.add(2),await eo(t),t.j_.set("Unknown"))}function Ls(n){return n.J_||(n.J_=function(t,r,s){const i=de(t);return i.M_(),new k0(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{xo:V0.bind(null,n),No:O0.bind(null,n),Lo:L0.bind(null,n),p_:M0.bind(null,n)}),n.G_.push(async e=>{e?(n.J_.h_(),Wu(n)?Ku(n):n.j_.set("Unknown")):(await n.J_.stop(),W_(n))})),n.J_}function Fn(n){return n.Y_||(n.Y_=function(t,r,s){const i=de(t);return i.M_(),new C0(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{xo:()=>Promise.resolve(),No:B0.bind(null,n),Lo:j0.bind(null,n),D_:$0.bind(null,n),v_:q0.bind(null,n)}),n.G_.push(async e=>{e?(n.Y_.h_(),await to(n)):(await n.Y_.stop(),n.U_.length>0&&(K(Rr,`Stopping write stream with ${n.U_.length} pending writes`),n.U_=[]))})),n.Y_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qu{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Kt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const o=Date.now()+r,c=new Qu(e,t,o,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new W(B.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Yu(n,e){if(ft("AsyncQueue",`${e}: ${n}`),qn(n))return new W(B.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class bp{constructor(){this.Z_=new xe(J.comparator)}track(e){const t=e.doc.key,r=this.Z_.get(t);r?e.type!==0&&r.type===3?this.Z_=this.Z_.insert(t,e):e.type===3&&r.type!==1?this.Z_=this.Z_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.Z_=this.Z_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.Z_=this.Z_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.Z_=this.Z_.remove(t):e.type===1&&r.type===2?this.Z_=this.Z_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.Z_=this.Z_.insert(t,{type:2,doc:e.doc}):ee():this.Z_=this.Z_.insert(t,e)}X_(){const e=[];return this.Z_.inorderTraversal((t,r)=>{e.push(r)}),e}}class As{constructor(e,t,r,s,i,o,c,u,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,s,i){const o=[];return t.forEach(c=>{o.push({type:0,doc:c})}),new As(e,t,cs.emptySet(t),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&cc(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G0{constructor(){this.ea=void 0,this.ta=[]}na(){return this.ta.some(e=>e.ra())}}class H0{constructor(){this.queries=wp(),this.onlineState="Unknown",this.ia=new Set}terminate(){(function(t,r){const s=de(t),i=s.queries;s.queries=wp(),i.forEach((o,c)=>{for(const u of c.ta)u.onError(r)})})(this,new W(B.ABORTED,"Firestore shutting down"))}}function wp(){return new hn(n=>Qg(n),cc)}async function Ju(n,e){const t=de(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.na()&&e.ra()&&(r=2):(i=new G0,r=e.ra()?0:1);try{switch(r){case 0:i.ea=await t.onListen(s,!0);break;case 1:i.ea=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const c=Yu(o,`Initialization of query '${Yr(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.ta.push(e),e.sa(t.onlineState),i.ea&&e.oa(i.ea)&&Zu(t)}async function Xu(n,e){const t=de(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const o=i.ta.indexOf(e);o>=0&&(i.ta.splice(o,1),i.ta.length===0?s=e.ra()?0:1:!i.na()&&e.ra()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function K0(n,e){const t=de(n);let r=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const c of o.ta)c.oa(s)&&(r=!0);o.ea=s}}r&&Zu(t)}function W0(n,e,t){const r=de(n),s=r.queries.get(e);if(s)for(const i of s.ta)i.onError(t);r.queries.delete(e)}function Zu(n){n.ia.forEach(e=>{e.next()})}var Wl,Ip;(Ip=Wl||(Wl={}))._a="default",Ip.Cache="cache";class ed{constructor(e,t,r){this.query=e,this.aa=t,this.ua=!1,this.ca=null,this.onlineState="Unknown",this.options=r||{}}oa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new As(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.ua?this.la(e)&&(this.aa.next(e),t=!0):this.ha(e,this.onlineState)&&(this.Pa(e),t=!0),this.ca=e,t}onError(e){this.aa.error(e)}sa(e){this.onlineState=e;let t=!1;return this.ca&&!this.ua&&this.ha(this.ca,e)&&(this.Pa(this.ca),t=!0),t}ha(e,t){if(!e.fromCache||!this.ra())return!0;const r=t!=="Offline";return(!this.options.Ta||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}la(e){if(e.docChanges.length>0)return!0;const t=this.ca&&this.ca.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}Pa(e){e=As.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.ua=!0,this.aa.next(e)}ra(){return this.options.source!==Wl.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X_{constructor(e){this.key=e}}class Z_{constructor(e){this.key=e}}class Q0{constructor(e,t){this.query=e,this.fa=t,this.ga=null,this.hasCachedResults=!1,this.current=!1,this.pa=me(),this.mutatedKeys=me(),this.ya=Yg(e),this.wa=new cs(this.ya)}get Sa(){return this.fa}ba(e,t){const r=t?t.Da:new bp,s=t?t.wa:this.wa;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,c=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((f,p)=>{const g=s.get(f),v=Xi(this.query,p)?p:null,I=!!g&&this.mutatedKeys.has(g.key),S=!!v&&(v.hasLocalMutations||this.mutatedKeys.has(v.key)&&v.hasCommittedMutations);let A=!1;g&&v?g.data.isEqual(v.data)?I!==S&&(r.track({type:3,doc:v}),A=!0):this.va(g,v)||(r.track({type:2,doc:v}),A=!0,(u&&this.ya(v,u)>0||d&&this.ya(v,d)<0)&&(c=!0)):!g&&v?(r.track({type:0,doc:v}),A=!0):g&&!v&&(r.track({type:1,doc:g}),A=!0,(u||d)&&(c=!0)),A&&(v?(o=o.add(v),i=S?i.add(f):i.delete(f)):(o=o.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{wa:o,Da:r,ls:c,mutatedKeys:i}}va(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.wa;this.wa=e.wa,this.mutatedKeys=e.mutatedKeys;const o=e.Da.X_();o.sort((f,p)=>function(v,I){const S=A=>{switch(A){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return ee()}};return S(v)-S(I)}(f.type,p.type)||this.ya(f.doc,p.doc)),this.Ca(r),s=s!=null&&s;const c=t&&!s?this.Fa():[],u=this.pa.size===0&&this.current&&!s?1:0,d=u!==this.ga;return this.ga=u,o.length!==0||d?{snapshot:new As(this.query,e.wa,i,o,e.mutatedKeys,u===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),Ma:c}:{Ma:c}}sa(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({wa:this.wa,Da:new bp,mutatedKeys:this.mutatedKeys,ls:!1},!1)):{Ma:[]}}xa(e){return!this.fa.has(e)&&!!this.wa.has(e)&&!this.wa.get(e).hasLocalMutations}Ca(e){e&&(e.addedDocuments.forEach(t=>this.fa=this.fa.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.fa=this.fa.delete(t)),this.current=e.current)}Fa(){if(!this.current)return[];const e=this.pa;this.pa=me(),this.wa.forEach(r=>{this.xa(r.key)&&(this.pa=this.pa.add(r.key))});const t=[];return e.forEach(r=>{this.pa.has(r)||t.push(new Z_(r))}),this.pa.forEach(r=>{e.has(r)||t.push(new X_(r))}),t}Oa(e){this.fa=e.gs,this.pa=me();const t=this.ba(e.documents);return this.applyChanges(t,!0)}Na(){return As.fromInitialDocuments(this.query,this.wa,this.mutatedKeys,this.ga===0,this.hasCachedResults)}}const td="SyncEngine";class Y0{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class J0{constructor(e){this.key=e,this.Ba=!1}}class X0{constructor(e,t,r,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.La={},this.ka=new hn(c=>Qg(c),cc),this.qa=new Map,this.Qa=new Set,this.$a=new xe(J.comparator),this.Ua=new Map,this.Ka=new Bu,this.Wa={},this.Ga=new Map,this.za=Ar.Kn(),this.onlineState="Unknown",this.ja=void 0}get isPrimaryClient(){return this.ja===!0}}async function Z0(n,e,t=!0){const r=iv(n);let s;const i=r.ka.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Na()):s=await ev(r,e,t,!0),s}async function eR(n,e){const t=iv(n);await ev(t,e,!0,!1)}async function ev(n,e,t,r){const s=await b0(n.localStore,xt(e)),i=s.targetId,o=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await tR(n,e,i,o==="current",s.resumeToken)),n.isPrimaryClient&&t&&H_(n.remoteStore,s),c}async function tR(n,e,t,r,s){n.Ha=(p,g,v)=>async function(S,A,O,k){let x=A.view.ba(O);x.ls&&(x=await pp(S.localStore,A.query,!1).then(({documents:T})=>A.view.ba(T,x)));const F=k&&k.targetChanges.get(A.targetId),P=k&&k.targetMismatches.get(A.targetId)!=null,M=A.view.applyChanges(x,S.isPrimaryClient,F,P);return Tp(S,A.targetId,M.Ma),M.snapshot}(n,p,g,v);const i=await pp(n.localStore,e,!0),o=new Q0(e,i.gs),c=o.ba(i.documents),u=Zi.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),d=o.applyChanges(c,n.isPrimaryClient,u);Tp(n,t,d.Ma);const f=new Y0(e,t,o);return n.ka.set(e,f),n.qa.has(t)?n.qa.get(t).push(e):n.qa.set(t,[e]),d.snapshot}async function nR(n,e,t){const r=de(n),s=r.ka.get(e),i=r.qa.get(s.targetId);if(i.length>1)return r.qa.set(s.targetId,i.filter(o=>!cc(o,e))),void r.ka.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Hl(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&Gu(r.remoteStore,s.targetId),Ql(r,s.targetId)}).catch(Dr)):(Ql(r,s.targetId),await Hl(r.localStore,s.targetId,!0))}async function rR(n,e){const t=de(n),r=t.ka.get(e),s=t.qa.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Gu(t.remoteStore,r.targetId))}async function sR(n,e,t){const r=ov(n);try{const s=await function(o,c){const u=de(o),d=Oe.now(),f=c.reduce((v,I)=>v.add(I.key),me());let p,g;return u.persistence.runTransaction("Locally write mutations","readwrite",v=>{let I=Et(),S=me();return u.ds.getEntries(v,f).next(A=>{I=A,I.forEach((O,k)=>{k.isValidDocument()||(S=S.add(O))})}).next(()=>u.localDocuments.getOverlayedDocuments(v,I)).next(A=>{p=A;const O=[];for(const k of c){const x=wA(k,p.get(k.key).overlayedDocument);x!=null&&O.push(new fn(k.key,x,$g(x.value.mapValue),it.exists(!0)))}return u.mutationQueue.addMutationBatch(v,d,O,c)}).next(A=>{g=A;const O=A.applyToLocalDocumentSet(p,S);return u.documentOverlayCache.saveOverlays(v,A.batchId,O)})}).then(()=>({batchId:g.batchId,changes:Xg(p)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(o,c,u){let d=o.Wa[o.currentUser.toKey()];d||(d=new xe(ue)),d=d.insert(c,u),o.Wa[o.currentUser.toKey()]=d}(r,s.batchId,t),await no(r,s.changes),await to(r.remoteStore)}catch(s){const i=Yu(s,"Failed to persist write");t.reject(i)}}async function tv(n,e){const t=de(n);try{const r=await _0(t.localStore,e);e.targetChanges.forEach((s,i)=>{const o=t.Ua.get(i);o&&(ne(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.Ba=!0:s.modifiedDocuments.size>0?ne(o.Ba):s.removedDocuments.size>0&&(ne(o.Ba),o.Ba=!1))}),await no(t,r,e)}catch(r){await Dr(r)}}function Ep(n,e,t){const r=de(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.ka.forEach((i,o)=>{const c=o.view.sa(e);c.snapshot&&s.push(c.snapshot)}),function(o,c){const u=de(o);u.onlineState=c;let d=!1;u.queries.forEach((f,p)=>{for(const g of p.ta)g.sa(c)&&(d=!0)}),d&&Zu(u)}(r.eventManager,e),s.length&&r.La.p_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function iR(n,e,t){const r=de(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Ua.get(e),i=s&&s.key;if(i){let o=new xe(J.comparator);o=o.insert(i,Me.newNoDocument(i,ie.min()));const c=me().add(i),u=new hc(ie.min(),new Map,new xe(ue),o,c);await tv(r,u),r.$a=r.$a.remove(i),r.Ua.delete(e),nd(r)}else await Hl(r.localStore,e,!1).then(()=>Ql(r,e,t)).catch(Dr)}async function oR(n,e){const t=de(n),r=e.batch.batchId;try{const s=await g0(t.localStore,e);rv(t,r,null),nv(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await no(t,s)}catch(s){await Dr(s)}}async function aR(n,e,t){const r=de(n);try{const s=await function(o,c){const u=de(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let f;return u.mutationQueue.lookupMutationBatch(d,c).next(p=>(ne(p!==null),f=p.keys(),u.mutationQueue.removeMutationBatch(d,p))).next(()=>u.mutationQueue.performConsistencyCheck(d)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(d,f,c)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,f)).next(()=>u.localDocuments.getDocuments(d,f))})}(r.localStore,e);rv(r,e,t),nv(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await no(r,s)}catch(s){await Dr(s)}}function nv(n,e){(n.Ga.get(e)||[]).forEach(t=>{t.resolve()}),n.Ga.delete(e)}function rv(n,e,t){const r=de(n);let s=r.Wa[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Wa[r.currentUser.toKey()]=s}}function Ql(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.qa.get(e))n.ka.delete(r),t&&n.La.Ja(r,t);n.qa.delete(e),n.isPrimaryClient&&n.Ka.br(e).forEach(r=>{n.Ka.containsKey(r)||sv(n,r)})}function sv(n,e){n.Qa.delete(e.path.canonicalString());const t=n.$a.get(e);t!==null&&(Gu(n.remoteStore,t),n.$a=n.$a.remove(e),n.Ua.delete(t),nd(n))}function Tp(n,e,t){for(const r of t)r instanceof X_?(n.Ka.addReference(r.key,e),cR(n,r)):r instanceof Z_?(K(td,"Document no longer in limbo: "+r.key),n.Ka.removeReference(r.key,e),n.Ka.containsKey(r.key)||sv(n,r.key)):ee()}function cR(n,e){const t=e.key,r=t.path.canonicalString();n.$a.get(t)||n.Qa.has(r)||(K(td,"New document in limbo: "+t),n.Qa.add(r),nd(n))}function nd(n){for(;n.Qa.size>0&&n.$a.size<n.maxConcurrentLimboResolutions;){const e=n.Qa.values().next().value;n.Qa.delete(e);const t=new J(we.fromString(e)),r=n.za.next();n.Ua.set(r,new J0(t)),n.$a=n.$a.insert(t,r),H_(n.remoteStore,new sn(xt(Ji(t.path)),r,"TargetPurposeLimboResolution",Pt.ae))}}async function no(n,e,t){const r=de(n),s=[],i=[],o=[];r.ka.isEmpty()||(r.ka.forEach((c,u)=>{o.push(r.Ha(u,e,t).then(d=>{var f;if((d||t)&&r.isPrimaryClient){const p=d?!d.fromCache:(f=t?.targetChanges.get(u.targetId))===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,p?"current":"not-current")}if(d){s.push(d);const p=ju.Yi(u.targetId,d);i.push(p)}}))}),await Promise.all(o),r.La.p_(s),await async function(u,d){const f=de(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>D.forEach(d,g=>D.forEach(g.Hi,v=>f.persistence.referenceDelegate.addReference(p,g.targetId,v)).next(()=>D.forEach(g.Ji,v=>f.persistence.referenceDelegate.removeReference(p,g.targetId,v)))))}catch(p){if(!qn(p))throw p;K(zu,"Failed to update sequence numbers: "+p)}for(const p of d){const g=p.targetId;if(!p.fromCache){const v=f.Ts.get(g),I=v.snapshotVersion,S=v.withLastLimboFreeSnapshotVersion(I);f.Ts=f.Ts.insert(g,S)}}}(r.localStore,i))}async function lR(n,e){const t=de(n);if(!t.currentUser.isEqual(e)){K(td,"User change. New user:",e.toKey());const r=await $_(t.localStore,e);t.currentUser=e,function(i,o){i.Ga.forEach(c=>{c.forEach(u=>{u.reject(new W(B.CANCELLED,o))})}),i.Ga.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await no(t,r.Rs)}}function uR(n,e){const t=de(n),r=t.Ua.get(e);if(r&&r.Ba)return me().add(r.key);{let s=me();const i=t.qa.get(e);if(!i)return s;for(const o of i){const c=t.ka.get(o);s=s.unionWith(c.view.Sa)}return s}}function iv(n){const e=de(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=tv.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=uR.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=iR.bind(null,e),e.La.p_=K0.bind(null,e.eventManager),e.La.Ja=W0.bind(null,e.eventManager),e}function ov(n){const e=de(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=oR.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=aR.bind(null,e),e}class Fi{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=gc(e.databaseInfo.databaseId),this.sharedClientState=this.Za(e),this.persistence=this.Xa(e),await this.persistence.start(),this.localStore=this.eu(e),this.gcScheduler=this.tu(e,this.localStore),this.indexBackfillerScheduler=this.nu(e,this.localStore)}tu(e,t){return null}nu(e,t){return null}eu(e){return B_(this.persistence,new U_,e.initialUser,this.serializer)}Xa(e){return new $u(mc.ri,this.serializer)}Za(e){return new j_}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Fi.provider={build:()=>new Fi};class dR extends Fi{constructor(e){super(),this.cacheSizeBytes=e}tu(e,t){ne(this.persistence.referenceDelegate instanceof Na);const r=this.persistence.referenceDelegate.garbageCollector;return new V_(r,e.asyncQueue,t)}Xa(e){const t=this.cacheSizeBytes!==void 0?rt.withCacheSize(this.cacheSizeBytes):rt.DEFAULT;return new $u(r=>Na.ri(r,t),this.serializer)}}class hR extends Fi{constructor(e,t,r){super(),this.ru=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.ru.initialize(this,e),await ov(this.ru.syncEngine),await to(this.ru.remoteStore),await this.persistence.Ci(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}eu(e){return B_(this.persistence,new U_,e.initialUser,this.serializer)}tu(e,t){const r=this.persistence.referenceDelegate.garbageCollector;return new V_(r,e.asyncQueue,t)}nu(e,t){const r=new wT(t,this.persistence);return new bT(e.asyncQueue,r)}Xa(e){const t=h0(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?rt.withCacheSize(this.cacheSizeBytes):rt.DEFAULT;return new qu(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,S0(),ra(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Za(e){return new j_}}class Va{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Ep(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=lR.bind(null,this.syncEngine),await z0(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new H0}()}createDatastore(e){const t=gc(e.databaseInfo.databaseId),r=function(i){return new R0(i)}(e.databaseInfo);return function(i,o,c,u){return new x0(i,o,c,u)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,o,c){return new D0(r,s,i,o,c)}(this.localStore,this.datastore,e.asyncQueue,t=>Ep(this.syncEngine,t,0),function(){return _p.D()?new _p:new I0}())}createSyncEngine(e,t){return function(s,i,o,c,u,d,f){const p=new X0(s,i,o,c,u,d);return f&&(p.ja=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=de(s);K(Rr,"RemoteStore shutting down."),i.W_.add(5),await eo(i),i.z_.shutdown(),i.j_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Va.provider={build:()=>new Va};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class rd{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.iu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.iu(this.observer.error,e):ft("Uncaught Error in snapshot listener:",e.toString()))}su(){this.muted=!0}iu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Un="FirestoreClient";class fR{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=ht.UNAUTHENTICATED,this.clientId=_g.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async o=>{K(Un,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(K(Un,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Kt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Yu(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function al(n,e){n.asyncQueue.verifyOperationInProgress(),K(Un,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await $_(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Ap(n,e){n.asyncQueue.verifyOperationInProgress();const t=await pR(n);K(Un,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>yp(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>yp(e.remoteStore,s)),n._onlineComponents=e}async function pR(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){K(Un,"Using user provided OfflineComponentProvider");try{await al(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===B.FAILED_PRECONDITION||s.code===B.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;Ri("Error using user provided cache. Falling back to memory cache: "+t),await al(n,new Fi)}}else K(Un,"Using default OfflineComponentProvider"),await al(n,new dR(void 0));return n._offlineComponents}async function av(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(K(Un,"Using user provided OnlineComponentProvider"),await Ap(n,n._uninitializedComponentsProvider._online)):(K(Un,"Using default OnlineComponentProvider"),await Ap(n,new Va))),n._onlineComponents}function mR(n){return av(n).then(e=>e.syncEngine)}async function Oa(n){const e=await av(n),t=e.eventManager;return t.onListen=Z0.bind(null,e.syncEngine),t.onUnlisten=nR.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=eR.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=rR.bind(null,e.syncEngine),t}function gR(n,e,t={}){const r=new Kt;return n.asyncQueue.enqueueAndForget(async()=>function(i,o,c,u,d){const f=new rd({next:g=>{f.su(),o.enqueueAndForget(()=>Xu(i,p));const v=g.docs.has(c);!v&&g.fromCache?d.reject(new W(B.UNAVAILABLE,"Failed to get document because the client is offline.")):v&&g.fromCache&&u&&u.source==="server"?d.reject(new W(B.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(g)},error:g=>d.reject(g)}),p=new ed(Ji(c.path),f,{includeMetadataChanges:!0,Ta:!0});return Ju(i,p)}(await Oa(n),n.asyncQueue,e,t,r)),r.promise}function _R(n,e,t={}){const r=new Kt;return n.asyncQueue.enqueueAndForget(async()=>function(i,o,c,u,d){const f=new rd({next:g=>{f.su(),o.enqueueAndForget(()=>Xu(i,p)),g.fromCache&&u.source==="server"?d.reject(new W(B.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(g)},error:g=>d.reject(g)}),p=new ed(c,f,{includeMetadataChanges:!0,Ta:!0});return Ju(i,p)}(await Oa(n),n.asyncQueue,e,t,r)),r.promise}/**
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
 */function cv(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */function lv(n,e,t){if(!t)throw new W(B.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function vR(n,e,t,r){if(e===!0&&r===!0)throw new W(B.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Sp(n){if(!J.isDocumentKey(n))throw new W(B.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function kp(n){if(J.isDocumentKey(n))throw new W(B.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function vc(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":ee()}function Rt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new W(B.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=vc(n);throw new W(B.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function yR(n,e){if(e<=0)throw new W(B.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bR="firestore.googleapis.com",Cp=!0;class Pp{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new W(B.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=bR,this.ssl=Cp}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:Cp;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=C_;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<D_)throw new W(B.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}vR("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=cv((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new W(B.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new W(B.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new W(B.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class sd{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Pp({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new W(B.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new W(B.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Pp(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new uT;switch(r.type){case"firstParty":return new fT(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new W(B.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Rp.get(t);r&&(K("ComponentProvider","Removing Datastore"),Rp.delete(t),r.terminate())}(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Jt(this.firestore,e,this._query)}}class at{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Vn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new at(this.firestore,e,this._key)}}class Vn extends Jt{constructor(e,t,r){super(e,t,Ji(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new at(this.firestore,null,new J(e))}withConverter(e){return new Vn(this.firestore,e,this._path)}}function Te(n,e,...t){if(n=Ee(n),lv("collection","path",e),n instanceof sd){const r=we.fromString(e,...t);return kp(r),new Vn(n,null,r)}{if(!(n instanceof at||n instanceof Vn))throw new W(B.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(we.fromString(e,...t));return kp(r),new Vn(n.firestore,null,r)}}function Ie(n,e,...t){if(n=Ee(n),arguments.length===1&&(e=_g.newId()),lv("doc","path",e),n instanceof sd){const r=we.fromString(e,...t);return Sp(r),new at(n,null,new J(r))}{if(!(n instanceof at||n instanceof Vn))throw new W(B.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(we.fromString(e,...t));return Sp(r),new at(n.firestore,n instanceof Vn?n.converter:null,new J(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xp="AsyncQueue";class Np{constructor(e=Promise.resolve()){this.Vu=[],this.mu=!1,this.fu=[],this.gu=null,this.pu=!1,this.yu=!1,this.wu=[],this.a_=new z_(this,"async_queue_retry"),this.Su=()=>{const r=ra();r&&K(xp,"Visibility state changed to "+r.visibilityState),this.a_.t_()},this.bu=e;const t=ra();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Su)}get isShuttingDown(){return this.mu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Du(),this.vu(e)}enterRestrictedMode(e){if(!this.mu){this.mu=!0,this.yu=e||!1;const t=ra();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Su)}}enqueue(e){if(this.Du(),this.mu)return new Promise(()=>{});const t=new Kt;return this.vu(()=>this.mu&&this.yu?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Vu.push(e),this.Cu()))}async Cu(){if(this.Vu.length!==0){try{await this.Vu[0](),this.Vu.shift(),this.a_.reset()}catch(e){if(!qn(e))throw e;K(xp,"Operation failed with retryable error: "+e)}this.Vu.length>0&&this.a_.Xo(()=>this.Cu())}}vu(e){const t=this.bu.then(()=>(this.pu=!0,e().catch(r=>{this.gu=r,this.pu=!1;const s=function(o){let c=o.message||"";return o.stack&&(c=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),c}(r);throw ft("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.pu=!1,r))));return this.bu=t,t}enqueueAfterDelay(e,t,r){this.Du(),this.wu.indexOf(e)>-1&&(t=0);const s=Qu.createAndSchedule(this,e,t,r,i=>this.Fu(i));return this.fu.push(s),s}Du(){this.gu&&ee()}verifyOperationInProgress(){}async Mu(){let e;do e=this.bu,await e;while(e!==this.bu)}xu(e){for(const t of this.fu)if(t.timerId===e)return!0;return!1}Ou(e){return this.Mu().then(()=>{this.fu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.fu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Mu()})}Nu(e){this.wu.push(e)}Fu(e){const t=this.fu.indexOf(e);this.fu.splice(t,1)}}function Dp(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(n,["next","error","complete"])}class un extends sd{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Np,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Np(e),this._firestoreClient=void 0,await e}}}function wR(n,e,t){t||(t=Ea);const r=Pr(n,"firestore");if(r.isInitialized(t)){const s=r.getImmediate({identifier:t}),i=r.getOptions(t);if(Ii(i,e))return s;throw new W(B.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new W(B.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<D_)throw new W(B.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return r.initialize({options:e,instanceIdentifier:t})}function yc(n){if(n._terminated)throw new W(B.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||IR(n),n._firestoreClient}function IR(n){var e,t,r;const s=n._freezeSettings(),i=function(c,u,d,f){return new YT(c,u,d,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,cv(f.experimentalLongPollingOptions),f.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((t=s.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new fR(n._authCredentials,n._appCheckCredentials,n._queue,i,n._componentsProvider&&function(c){const u=c?._online.build();return{_offline:c?._offline.build(u),_online:u}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rs{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Rs(ze.fromBase64String(e))}catch(t){throw new W(B.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Rs(ze.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class id{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new W(B.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new W(B.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return ue(this._lat,e._lat)||ue(this._long,e._long)}}/**
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
 */class od{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ER=/^__.*__$/;class TR{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new fn(e,this.data,this.fieldMask,t,this.fieldTransforms):new Os(e,this.data,t,this.fieldTransforms)}}class uv{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new fn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function dv(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw ee()}}class ad{constructor(e,t,r,s,i,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Bu(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Lu(){return this.settings.Lu}ku(e){return new ad(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}qu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.ku({path:r,Qu:!1});return s.$u(e),s}Uu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.ku({path:r,Qu:!1});return s.Bu(),s}Ku(e){return this.ku({path:void 0,Qu:!0})}Wu(e){return La(e,this.settings.methodName,this.settings.Gu||!1,this.path,this.settings.zu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Bu(){if(this.path)for(let e=0;e<this.path.length;e++)this.$u(this.path.get(e))}$u(e){if(e.length===0)throw this.Wu("Document fields must not be empty");if(dv(this.Lu)&&ER.test(e))throw this.Wu('Document fields cannot begin and end with "__"')}}class AR{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||gc(e)}ju(e,t,r,s=!1){return new ad({Lu:e,methodName:t,zu:r,path:Ve.emptyPath(),Qu:!1,Gu:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function ro(n){const e=n._freezeSettings(),t=gc(n._databaseId);return new AR(n._databaseId,!!e.ignoreUndefinedProperties,t)}function hv(n,e,t,r,s,i={}){const o=n.ju(i.merge||i.mergeFields?2:0,e,t,s);ld("Data must be an object, but it was:",o,r);const c=pv(r,o);let u,d;if(i.merge)u=new gt(o.fieldMask),d=o.fieldTransforms;else if(i.mergeFields){const f=[];for(const p of i.mergeFields){const g=Yl(e,p,t);if(!o.contains(g))throw new W(B.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);gv(f,g)||f.push(g)}u=new gt(f),d=o.fieldTransforms.filter(p=>u.covers(p.field))}else u=null,d=o.fieldTransforms;return new TR(new st(c),u,d)}class so extends wc{_toFieldTransform(e){if(e.Lu!==2)throw e.Lu===1?e.Wu(`${this._methodName}() can only appear at the top level of your update data`):e.Wu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof so}}class cd extends wc{constructor(e,t){super(e),this.Ju=t}_toFieldTransform(e){const t=new Es(e.serializer,t_(e.serializer,this.Ju));return new o_(e.path,t)}isEqual(e){return e instanceof cd&&this.Ju===e.Ju}}function RR(n,e,t,r){const s=n.ju(1,e,t);ld("Data must be an object, but it was:",s,r);const i=[],o=st.empty();jn(r,(u,d)=>{const f=ud(e,u,t);d=Ee(d);const p=s.Uu(f);if(d instanceof so)i.push(f);else{const g=io(d,p);g!=null&&(i.push(f),o.set(f,g))}});const c=new gt(i);return new uv(o,c,s.fieldTransforms)}function SR(n,e,t,r,s,i){const o=n.ju(1,e,t),c=[Yl(e,r,t)],u=[s];if(i.length%2!=0)throw new W(B.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<i.length;g+=2)c.push(Yl(e,i[g])),u.push(i[g+1]);const d=[],f=st.empty();for(let g=c.length-1;g>=0;--g)if(!gv(d,c[g])){const v=c[g];let I=u[g];I=Ee(I);const S=o.Uu(v);if(I instanceof so)d.push(v);else{const A=io(I,S);A!=null&&(d.push(v),f.set(v,A))}}const p=new gt(d);return new uv(f,p,o.fieldTransforms)}function fv(n,e,t,r=!1){return io(t,n.ju(r?4:3,e))}function io(n,e){if(mv(n=Ee(n)))return ld("Unsupported field value:",e,n),pv(n,e);if(n instanceof wc)return function(r,s){if(!dv(s.Lu))throw s.Wu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Wu(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.Qu&&e.Lu!==4)throw e.Wu("Nested arrays are not supported");return function(r,s){const i=[];let o=0;for(const c of r){let u=io(c,s.Ku(o));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),o++}return{arrayValue:{values:i}}}(n,e)}return function(r,s){if((r=Ee(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return t_(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=Oe.fromDate(r);return{timestampValue:Ts(s.serializer,i)}}if(r instanceof Oe){const i=new Oe(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Ts(s.serializer,i)}}if(r instanceof id)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Rs)return{bytesValue:f_(s.serializer,r._byteString)};if(r instanceof at){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.Wu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Mu(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof od)return function(o,c){return{mapValue:{fields:{[ku]:{stringValue:Cu},[vs]:{arrayValue:{values:o.toArray().map(d=>{if(typeof d!="number")throw c.Wu("VectorValues must only contain numeric values.");return Nu(c.serializer,d)})}}}}}}(r,s);throw s.Wu(`Unsupported field value: ${vc(r)}`)}(n,e)}function pv(n,e){const t={};return Ng(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):jn(n,(r,s)=>{const i=io(s,e.qu(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function mv(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Oe||n instanceof id||n instanceof Rs||n instanceof at||n instanceof wc||n instanceof od)}function ld(n,e,t){if(!mv(t)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(t)){const r=vc(t);throw r==="an object"?e.Wu(n+" a custom object"):e.Wu(n+" "+r)}}function Yl(n,e,t){if((e=Ee(e))instanceof bc)return e._internalPath;if(typeof e=="string")return ud(n,e);throw La("Field path arguments must be of type string or ",n,!1,void 0,t)}const kR=new RegExp("[~\\*/\\[\\]]");function ud(n,e,t){if(e.search(kR)>=0)throw La(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new bc(...e.split("."))._internalPath}catch{throw La(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function La(n,e,t,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${r}`),o&&(u+=` in document ${s}`),u+=")"),new W(B.INVALID_ARGUMENT,c+n+u)}function gv(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dd{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new at(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new CR(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Ic("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class CR extends dd{data(){return super.data()}}function Ic(n,e){return typeof e=="string"?ud(n,e):e instanceof bc?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _v(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new W(B.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class hd{}class Ec extends hd{}function Je(n,e,...t){let r=[];e instanceof hd&&r.push(e),r=r.concat(t),function(i){const o=i.filter(u=>u instanceof fd).length,c=i.filter(u=>u instanceof Tc).length;if(o>1||o>0&&c>0)throw new W(B.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class Tc extends Ec{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Tc(e,t,r)}_apply(e){const t=this._parse(e);return vv(e._query,t),new Jt(e.firestore,e.converter,Fl(e._query,t))}_parse(e){const t=ro(e.firestore);return function(i,o,c,u,d,f,p){let g;if(d.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new W(B.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Op(p,f);const I=[];for(const S of p)I.push(Vp(u,i,S));g={arrayValue:{values:I}}}else g=Vp(u,i,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Op(p,f),g=fv(c,o,p,f==="in"||f==="not-in");return _e.create(d,f,g)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function Bn(n,e,t){const r=e,s=Ic("where",n);return Tc._create(s,r,t)}class fd extends hd{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new fd(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:Ae.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let o=s;const c=i.getFlattenedFilters();for(const u of c)vv(o,u),o=Fl(o,u)}(e._query,t),new Jt(e.firestore,e.converter,Fl(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class pd extends Ec{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new pd(e,t)}_apply(e){const t=function(s,i,o){if(s.startAt!==null)throw new W(B.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new W(B.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Li(i,o)}(e._query,this._field,this._direction);return new Jt(e.firestore,e.converter,function(s,i){const o=s.explicitOrderBy.concat([i]);return new Vr(s.path,s.collectionGroup,o,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,t))}}function mt(n,e="asc"){const t=e,r=Ic("orderBy",n);return pd._create(r,t)}class md extends Ec{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new md(e,t,r)}_apply(e){return new Jt(e.firestore,e.converter,Ra(e._query,this._limit,this._limitType))}}function kt(n){return yR("limit",n),md._create("limit",n,"F")}class gd extends Ec{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new gd(e,t,r)}_apply(e){const t=xR(e,this.type,this._docOrFields,this._inclusive);return new Jt(e.firestore,e.converter,function(s,i){return new Vr(s.path,s.collectionGroup,s.explicitOrderBy.slice(),s.filters.slice(),s.limit,s.limitType,i,s.endAt)}(e._query,t))}}function PR(...n){return gd._create("startAfter",n,!1)}function xR(n,e,t,r){if(t[0]=Ee(t[0]),t[0]instanceof dd)return function(i,o,c,u,d){if(!u)throw new W(B.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${c}().`);const f=[];for(const p of as(i))if(p.field.isKeyField())f.push(wr(o,u.key));else{const g=u.data.field(p.field);if(ic(g))throw new W(B.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+p.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(g===null){const v=p.field.canonicalString();throw new W(B.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${v}' (used as the orderBy) does not exist.`)}f.push(g)}return new Mn(f,d)}(n._query,n.firestore._databaseId,e,t[0]._document,r);{const s=ro(n.firestore);return function(o,c,u,d,f,p){const g=o.explicitOrderBy;if(f.length>g.length)throw new W(B.INVALID_ARGUMENT,`Too many arguments provided to ${d}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const v=[];for(let I=0;I<f.length;I++){const S=f[I];if(g[I].field.isKeyField()){if(typeof S!="string")throw new W(B.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${d}(), but got a ${typeof S}`);if(!xu(o)&&S.indexOf("/")!==-1)throw new W(B.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${d}() must be a plain document ID, but '${S}' contains a slash.`);const A=o.path.child(we.fromString(S));if(!J.isDocumentKey(A))throw new W(B.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${d}() must result in a valid document path, but '${A}' is not because it contains an odd number of segments.`);const O=new J(A);v.push(wr(c,O))}else{const A=fv(u,d,S);v.push(A)}}return new Mn(v,p)}(n._query,n.firestore._databaseId,s,e,t,r)}}function Vp(n,e,t){if(typeof(t=Ee(t))=="string"){if(t==="")throw new W(B.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!xu(e)&&t.indexOf("/")!==-1)throw new W(B.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(we.fromString(t));if(!J.isDocumentKey(r))throw new W(B.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return wr(n,new J(r))}if(t instanceof at)return wr(n,t._key);throw new W(B.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${vc(t)}.`)}function Op(n,e){if(!Array.isArray(n)||n.length===0)throw new W(B.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function vv(n,e){const t=function(s,i){for(const o of s)for(const c of o.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new W(B.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new W(B.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class NR{convertValue(e,t="none"){switch(On(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Pe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(ln(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw ee()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return jn(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){var t,r,s;const i=(s=(r=(t=e.fields)===null||t===void 0?void 0:t[vs].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(o=>Pe(o.doubleValue));return new od(i)}convertGeoPoint(e){return new id(Pe(e.latitude),Pe(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=oc(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Di(e));default:return null}}convertTimestamp(e){const t=cn(e);return new Oe(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=we.fromString(e);ne(E_(r));const s=new br(r.get(1),r.get(3)),i=new J(r.popFirst(5));return s.isEqual(t)||ft(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yv(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ui{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class bv extends dd{constructor(e,t,r,s,i,o){super(e,t,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new sa(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Ic("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class sa extends bv{data(e={}){return super.data(e)}}class wv{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new ui(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new sa(this._firestore,this._userDataWriter,r.key,r,new ui(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new W(B.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(c=>{const u=new sa(s._firestore,s._userDataWriter,c.doc.key,c.doc,new ui(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(c=>i||c.type!==3).map(c=>{const u=new sa(s._firestore,s._userDataWriter,c.doc.key,c.doc,new ui(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let d=-1,f=-1;return c.type!==0&&(d=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),f=o.indexOf(c.doc.key)),{type:DR(c.type),doc:u,oldIndex:d,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function DR(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return ee()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lr(n){n=Rt(n,at);const e=Rt(n.firestore,un);return gR(yc(e),n._key).then(t=>Iv(e,n,t))}class _d extends NR{constructor(e){super(),this.firestore=e}convertBytes(e){return new Rs(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new at(this.firestore,null,t)}}function Yt(n){n=Rt(n,Jt);const e=Rt(n.firestore,un),t=yc(e),r=new _d(e);return _v(n._query),_R(t,n._query).then(s=>new wv(e,r,n,s))}function vd(n,e,t){n=Rt(n,at);const r=Rt(n.firestore,un),s=yv(n.converter,e,t);return Ac(r,[hv(ro(r),"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,it.none())])}function Xe(n,e,t,...r){n=Rt(n,at);const s=Rt(n.firestore,un),i=ro(s);let o;return o=typeof(e=Ee(e))=="string"||e instanceof bc?SR(i,"updateDoc",n._key,e,t,r):RR(i,"updateDoc",n._key,e),Ac(s,[o.toMutation(n._key,it.exists(!0))])}function yd(n){return Ac(Rt(n.firestore,un),[new dc(n._key,it.none())])}function Ft(n,e){const t=Rt(n.firestore,un),r=Ie(n),s=yv(n.converter,e);return Ac(t,[hv(ro(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,it.exists(!1))]).then(()=>r)}function Ut(n,...e){var t,r,s;n=Ee(n);let i={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||Dp(e[o])||(i=e[o],o++);const c={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(Dp(e[o])){const p=e[o];e[o]=(t=p.next)===null||t===void 0?void 0:t.bind(p),e[o+1]=(r=p.error)===null||r===void 0?void 0:r.bind(p),e[o+2]=(s=p.complete)===null||s===void 0?void 0:s.bind(p)}let u,d,f;if(n instanceof at)d=Rt(n.firestore,un),f=Ji(n._key.path),u={next:p=>{e[o]&&e[o](Iv(d,n,p))},error:e[o+1],complete:e[o+2]};else{const p=Rt(n,Jt);d=Rt(p.firestore,un),f=p._query;const g=new _d(d);u={next:v=>{e[o]&&e[o](new wv(d,g,p,v))},error:e[o+1],complete:e[o+2]},_v(n._query)}return function(g,v,I,S){const A=new rd(S),O=new ed(v,A,I);return g.asyncQueue.enqueueAndForget(async()=>Ju(await Oa(g),O)),()=>{A.su(),g.asyncQueue.enqueueAndForget(async()=>Xu(await Oa(g),O))}}(yc(d),f,c,u)}function Ac(n,e){return function(r,s){const i=new Kt;return r.asyncQueue.enqueueAndForget(async()=>sR(await mR(r),s,i)),i.promise}(yc(n),e)}function Iv(n,e,t){const r=t.docs.get(e._key),s=new _d(n);return new bv(n,s,e._key,r,new ui(t.hasPendingWrites,t.fromCache),e.converter)}class VR{constructor(e){let t;this.kind="persistent",e?.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=Ev(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}function OR(n){return new VR(n)}class LR{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Va.provider,this._offlineComponentProvider={build:t=>new hR(t,e?.cacheSizeBytes,this.forceOwnership)}}}function Ev(n){return new LR(n?.forceOwnership)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lp(){return new so("deleteField")}function Xt(n){return new cd("increment",n)}(function(e,t=!0){(function(s){Vs=s})(xr),Wt(new Ot("firestore",(r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),c=new un(new dT(r.getProvider("auth-internal")),new pT(o,r.getProvider("app-check-internal")),function(d,f){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new W(B.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new br(d.options.projectId,f)}(o,s),o);return i=Object.assign({useFetchStreams:t},i),c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),At(gf,_f,e),At(gf,_f,"esm2017")})();var MR="firebase",FR="11.3.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */At(MR,FR,"app");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jl=new Map,Tv={activated:!1,tokenObservers:[]},UR={initialized:!1,enabled:!1};function Ge(n){return Jl.get(n)||Object.assign({},Tv)}function BR(n,e){return Jl.set(n,e),Jl.get(n)}function Rc(){return UR}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Av="https://content-firebaseappcheck.googleapis.com/v1",$R="exchangeRecaptchaV3Token",qR="exchangeDebugToken",Mp={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:16*60*1e3},jR=24*60*60*1e3;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zR{constructor(e,t,r,s,i){if(this.operation=e,this.retryPolicy=t,this.getWaitDuration=r,this.lowerBound=s,this.upperBound=i,this.pending=null,this.nextErrorWaitInterval=s,s>i)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new wi,this.pending.promise.catch(t=>{}),await GR(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new wi,this.pending.promise.catch(t=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(t){this.retryPolicy(t)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const t=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),t}}}function GR(n){return new Promise(e=>{setTimeout(e,n)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HR={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.",throttled:"Requests throttled due to {$httpStatus} error. Attempts allowed again after {$time}"},_t=new xs("appCheck","AppCheck",HR);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fp(n=!1){var e;return n?(e=self.grecaptcha)===null||e===void 0?void 0:e.enterprise:self.grecaptcha}function bd(n){if(!Ge(n).activated)throw _t.create("use-before-activation",{appName:n.name})}function Rv(n){const e=Math.round(n/1e3),t=Math.floor(e/(3600*24)),r=Math.floor((e-t*3600*24)/3600),s=Math.floor((e-t*3600*24-r*3600)/60),i=e-t*3600*24-r*3600-s*60;let o="";return t&&(o+=Do(t)+"d:"),r&&(o+=Do(r)+"h:"),o+=Do(s)+"m:"+Do(i)+"s",o}function Do(n){return n===0?"00":n>=10?n.toString():"0"+n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wd({url:n,body:e},t){const r={"Content-Type":"application/json"},s=t.getImmediate({optional:!0});if(s){const p=await s.getHeartbeatsHeader();p&&(r["X-Firebase-Client"]=p)}const i={method:"POST",body:JSON.stringify(e),headers:r};let o;try{o=await fetch(n,i)}catch(p){throw _t.create("fetch-network-error",{originalErrorMessage:p?.message})}if(o.status!==200)throw _t.create("fetch-status-error",{httpStatus:o.status});let c;try{c=await o.json()}catch(p){throw _t.create("fetch-parse-error",{originalErrorMessage:p?.message})}const u=c.ttl.match(/^([\d.]+)(s)$/);if(!u||!u[2]||isNaN(Number(u[1])))throw _t.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${c.ttl}`});const d=Number(u[1])*1e3,f=Date.now();return{token:c.token,expireTimeMillis:f+d,issuedAtTimeMillis:f}}function KR(n,e){const{projectId:t,appId:r,apiKey:s}=n.options;return{url:`${Av}/projects/${t}/apps/${r}:${$R}?key=${s}`,body:{recaptcha_v3_token:e}}}function Sv(n,e){const{projectId:t,appId:r,apiKey:s}=n.options;return{url:`${Av}/projects/${t}/apps/${r}:${qR}?key=${s}`,body:{debug_token:e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WR="firebase-app-check-database",QR=1,Ui="firebase-app-check-store",kv="debug-token";let Vo=null;function Cv(){return Vo||(Vo=new Promise((n,e)=>{try{const t=indexedDB.open(WR,QR);t.onsuccess=r=>{n(r.target.result)},t.onerror=r=>{var s;e(_t.create("storage-open",{originalErrorMessage:(s=r.target.error)===null||s===void 0?void 0:s.message}))},t.onupgradeneeded=r=>{const s=r.target.result;switch(r.oldVersion){case 0:s.createObjectStore(Ui,{keyPath:"compositeKey"})}}}catch(t){e(_t.create("storage-open",{originalErrorMessage:t?.message}))}}),Vo)}function YR(n){return xv(Nv(n))}function JR(n,e){return Pv(Nv(n),e)}function XR(n){return Pv(kv,n)}function ZR(){return xv(kv)}async function Pv(n,e){const r=(await Cv()).transaction(Ui,"readwrite"),i=r.objectStore(Ui).put({compositeKey:n,value:e});return new Promise((o,c)=>{i.onsuccess=u=>{o()},r.onerror=u=>{var d;c(_t.create("storage-set",{originalErrorMessage:(d=u.target.error)===null||d===void 0?void 0:d.message}))}})}async function xv(n){const t=(await Cv()).transaction(Ui,"readonly"),s=t.objectStore(Ui).get(n);return new Promise((i,o)=>{s.onsuccess=c=>{const u=c.target.result;i(u?u.value:void 0)},t.onerror=c=>{var u;o(_t.create("storage-get",{originalErrorMessage:(u=c.target.error)===null||u===void 0?void 0:u.message}))}})}function Nv(n){return`${n.options.appId}-${n.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */async function eS(n){if(Ka()){let e;try{e=await YR(n)}catch(t){Bi.warn(`Failed to read token from IndexedDB. Error: ${t}`)}return e}}function cl(n,e){return Ka()?JR(n,e).catch(t=>{Bi.warn(`Failed to write token to IndexedDB. Error: ${t}`)}):Promise.resolve()}async function tS(){let n;try{n=await ZR()}catch{}if(n)return n;{const e=crypto.randomUUID();return XR(e).catch(t=>Bi.warn(`Failed to persist debug token to IndexedDB. Error: ${t}`)),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
        `)}function nS(){const n=vm(),e=Rc();if(e.initialized=!0,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&n.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const t=new wi;e.token=t,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?t.resolve(n.FIREBASE_APPCHECK_DEBUG_TOKEN):t.resolve(tS())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rS={error:"UNKNOWN_ERROR"};function sS(n){return uu.encodeString(JSON.stringify(n),!1)}async function Xl(n,e=!1){const t=n.app;bd(t);const r=Ge(t);let s=r.token,i;if(s&&!rs(s)&&(r.token=void 0,s=void 0),!s){const u=await r.cachedTokenPromise;u&&(rs(u)?s=u:await cl(t,void 0))}if(!e&&s&&rs(s))return{token:s.token};let o=!1;if(Id()){r.exchangeTokenPromise||(r.exchangeTokenPromise=wd(Sv(t,await Ed()),n.heartbeatServiceProvider).finally(()=>{r.exchangeTokenPromise=void 0}),o=!0);const u=await r.exchangeTokenPromise;return await cl(t,u),r.token=u,{token:u.token}}try{r.exchangeTokenPromise||(r.exchangeTokenPromise=r.provider.getToken().finally(()=>{r.exchangeTokenPromise=void 0}),o=!0),s=await Ge(t).exchangeTokenPromise}catch(u){u.code==="appCheck/throttled"?Bi.warn(u.message):Bi.error(u),i=u}let c;return s?i?rs(s)?c={token:s.token,internalError:i}:c=Bp(i):(c={token:s.token},r.token=s,await cl(t,s)):c=Bp(i),o&&Ov(t,c),c}async function iS(n){const e=n.app;bd(e);const{provider:t}=Ge(e);if(Id()){const r=await Ed(),{token:s}=await wd(Sv(e,r),n.heartbeatServiceProvider);return{token:s}}else{const{token:r}=await t.getToken();return{token:r}}}function Dv(n,e,t,r){const{app:s}=n,i=Ge(s),o={next:t,error:r,type:e};if(i.tokenObservers=[...i.tokenObservers,o],i.token&&rs(i.token)){const c=i.token;Promise.resolve().then(()=>{t({token:c.token}),Up(n)}).catch(()=>{})}i.cachedTokenPromise.then(()=>Up(n))}function Vv(n,e){const t=Ge(n),r=t.tokenObservers.filter(s=>s.next!==e);r.length===0&&t.tokenRefresher&&t.tokenRefresher.isRunning()&&t.tokenRefresher.stop(),t.tokenObservers=r}function Up(n){const{app:e}=n,t=Ge(e);let r=t.tokenRefresher;r||(r=oS(n),t.tokenRefresher=r),!r.isRunning()&&t.isTokenAutoRefreshEnabled&&r.start()}function oS(n){const{app:e}=n;return new zR(async()=>{const t=Ge(e);let r;if(t.token?r=await Xl(n,!0):r=await Xl(n),r.error)throw r.error;if(r.internalError)throw r.internalError},()=>!0,()=>{const t=Ge(e);if(t.token){let r=t.token.issuedAtTimeMillis+(t.token.expireTimeMillis-t.token.issuedAtTimeMillis)*.5+3e5;const s=t.token.expireTimeMillis-5*60*1e3;return r=Math.min(r,s),Math.max(0,r-Date.now())}else return 0},Mp.RETRIAL_MIN_WAIT,Mp.RETRIAL_MAX_WAIT)}function Ov(n,e){const t=Ge(n).tokenObservers;for(const r of t)try{r.type==="EXTERNAL"&&e.error!=null?r.error(e.error):r.next(e)}catch{}}function rs(n){return n.expireTimeMillis-Date.now()>0}function Bp(n){return{token:sS(rS),error:n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aS{constructor(e,t){this.app=e,this.heartbeatServiceProvider=t}_delete(){const{tokenObservers:e}=Ge(this.app);for(const t of e)Vv(this.app,t.next);return Promise.resolve()}}function cS(n,e){return new aS(n,e)}function lS(n){return{getToken:e=>Xl(n,e),getLimitedUseToken:()=>iS(n),addTokenListener:e=>Dv(n,"INTERNAL",e),removeTokenListener:e=>Vv(n.app,e)}}const uS="@firebase/app-check",dS="0.8.11";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hS="https://www.google.com/recaptcha/api.js";function fS(n,e){const t=new wi,r=Ge(n);r.reCAPTCHAState={initialized:t};const s=pS(n),i=Fp(!1);return i?$p(n,e,i,s,t):_S(()=>{const o=Fp(!1);if(!o)throw new Error("no recaptcha");$p(n,e,o,s,t)}),t.promise}function $p(n,e,t,r,s){t.ready(()=>{gS(n,e,t,r),s.resolve(t)})}function pS(n){const e=`fire_app_check_${n.name}`,t=document.createElement("div");return t.id=e,t.style.display="none",document.body.appendChild(t),e}async function mS(n){bd(n);const t=await Ge(n).reCAPTCHAState.initialized.promise;return new Promise((r,s)=>{const i=Ge(n).reCAPTCHAState;t.ready(()=>{r(t.execute(i.widgetId,{action:"fire_app_check"}))})})}function gS(n,e,t,r){const s=t.render(r,{sitekey:e,size:"invisible",callback:()=>{Ge(n).reCAPTCHAState.succeeded=!0},"error-callback":()=>{Ge(n).reCAPTCHAState.succeeded=!1}}),i=Ge(n);i.reCAPTCHAState=Object.assign(Object.assign({},i.reCAPTCHAState),{widgetId:s})}function _S(n){const e=document.createElement("script");e.src=hS,e.onload=n,document.head.appendChild(e)}/**
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
 */class Td{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){var e,t,r;yS(this._throttleData);const s=await mS(this._app).catch(o=>{throw _t.create("recaptcha-error")});if(!(!((e=Ge(this._app).reCAPTCHAState)===null||e===void 0)&&e.succeeded))throw _t.create("recaptcha-error");let i;try{i=await wd(KR(this._app,s),this._heartbeatServiceProvider)}catch(o){throw!((t=o.code)===null||t===void 0)&&t.includes("fetch-status-error")?(this._throttleData=vS(Number((r=o.customData)===null||r===void 0?void 0:r.httpStatus),this._throttleData),_t.create("throttled",{time:Rv(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):o}return this._throttleData=null,i}initialize(e){this._app=e,this._heartbeatServiceProvider=Pr(e,"heartbeat"),fS(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof Td?this._siteKey===e._siteKey:!1}}function vS(n,e){if(n===404||n===403)return{backoffCount:1,allowRequestsAfter:Date.now()+jR,httpStatus:n};{const t=e?e.backoffCount:0,r=qb(t,1e3,2);return{backoffCount:t+1,allowRequestsAfter:Date.now()+r,httpStatus:n}}}function yS(n){if(n&&Date.now()-n.allowRequestsAfter<=0)throw _t.create("throttled",{time:Rv(n.allowRequestsAfter-Date.now()),httpStatus:n.httpStatus})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bS(n=Qa(),e){n=Ee(n);const t=Pr(n,"app-check");if(Rc().initialized||nS(),Id()&&Ed().then(s=>console.log(`App Check debug token: ${s}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(i.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&i.provider.isEqual(e.provider))return s;throw _t.create("already-initialized",{appName:n.name})}const r=t.initialize({options:e});return wS(n,e.provider,e.isTokenAutoRefreshEnabled),Ge(n).isTokenAutoRefreshEnabled&&Dv(r,"INTERNAL",()=>{}),r}function wS(n,e,t){const r=BR(n,Object.assign({},Tv));r.activated=!0,r.provider=e,r.cachedTokenPromise=eS(n).then(s=>(s&&rs(s)&&(r.token=s,Ov(n,{token:s.token})),s)),r.isTokenAutoRefreshEnabled=t===void 0?n.automaticDataCollectionEnabled:t,r.provider.initialize(n)}const IS="app-check",qp="app-check-internal";function ES(){Wt(new Ot(IS,n=>{const e=n.getProvider("app").getImmediate(),t=n.getProvider("heartbeat");return cS(e,t)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((n,e,t)=>{n.getProvider(qp).initialize()})),Wt(new Ot(qp,n=>{const e=n.getProvider("app-check").getImmediate();return lS(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),At(uS,dS)}ES();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TS="type.googleapis.com/google.protobuf.Int64Value",AS="type.googleapis.com/google.protobuf.UInt64Value";function Lv(n,e){const t={};for(const r in n)n.hasOwnProperty(r)&&(t[r]=e(n[r]));return t}function Ma(n){if(n==null)return null;if(n instanceof Number&&(n=n.valueOf()),typeof n=="number"&&isFinite(n)||n===!0||n===!1||Object.prototype.toString.call(n)==="[object String]")return n;if(n instanceof Date)return n.toISOString();if(Array.isArray(n))return n.map(e=>Ma(e));if(typeof n=="function"||typeof n=="object")return Lv(n,e=>Ma(e));throw new Error("Data cannot be encoded in JSON: "+n)}function Ss(n){if(n==null)return n;if(n["@type"])switch(n["@type"]){case TS:case AS:{const e=Number(n.value);if(isNaN(e))throw new Error("Data cannot be decoded from JSON: "+n);return e}default:throw new Error("Data cannot be decoded from JSON: "+n)}return Array.isArray(n)?n.map(e=>Ss(e)):typeof n=="function"||typeof n=="object"?Lv(n,e=>Ss(e)):n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const jp={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class vt extends Mt{constructor(e,t,r){super(`${Ad}/${e}`,t||""),this.details=r,Object.setPrototypeOf(this,vt.prototype)}}function RS(n){if(n>=200&&n<300)return"ok";switch(n){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function Fa(n,e){let t=RS(n),r=t,s;try{const i=e&&e.error;if(i){const o=i.status;if(typeof o=="string"){if(!jp[o])return new vt("internal","internal");t=jp[o],r=o}const c=i.message;typeof c=="string"&&(r=c),s=i.details,s!==void 0&&(s=Ss(s))}}catch{}return t==="ok"?null:new vt(t,r,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SS{constructor(e,t,r,s){this.app=e,this.auth=null,this.messaging=null,this.appCheck=null,this.serverAppAppCheckToken=null,It(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.auth=t.getImmediate({optional:!0}),this.messaging=r.getImmediate({optional:!0}),this.auth||t.get().then(i=>this.auth=i,()=>{}),this.messaging||r.get().then(i=>this.messaging=i,()=>{}),this.appCheck||s?.get().then(i=>this.appCheck=i,()=>{})}async getAuthToken(){if(this.auth)try{const e=await this.auth.getToken();return e?.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(e){if(this.serverAppAppCheckToken)return this.serverAppAppCheckToken;if(this.appCheck){const t=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return t.error?null:t.token}return null}async getContext(e){const t=await this.getAuthToken(),r=await this.getMessagingToken(),s=await this.getAppCheckToken(e);return{authToken:t,messagingToken:r,appCheckToken:s}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zl="us-central1",kS=/^data: (.*?)(?:\n|$)/;function CS(n){let e=null;return{promise:new Promise((t,r)=>{e=setTimeout(()=>{r(new vt("deadline-exceeded","deadline-exceeded"))},n)}),cancel:()=>{e&&clearTimeout(e)}}}class PS{constructor(e,t,r,s,i=Zl,o=(...c)=>fetch(...c)){this.app=e,this.fetchImpl=o,this.emulatorOrigin=null,this.contextProvider=new SS(e,t,r,s),this.cancelAllRequests=new Promise(c=>{this.deleteService=()=>Promise.resolve(c())});try{const c=new URL(i);this.customDomain=c.origin+(c.pathname==="/"?"":c.pathname),this.region=Zl}catch{this.customDomain=null,this.region=i}}_delete(){return this.deleteService()}_url(e){const t=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${t}/${this.region}/${e}`:this.customDomain!==null?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`}}function xS(n,e,t){n.emulatorOrigin=`http://${e}:${t}`}function NS(n,e,t){const r=s=>VS(n,e,s,{});return r.stream=(s,i)=>LS(n,e,s,i),r}async function DS(n,e,t,r){t["Content-Type"]="application/json";let s;try{s=await r(n,{method:"POST",body:JSON.stringify(e),headers:t})}catch{return{status:0,json:null}}let i=null;try{i=await s.json()}catch{}return{status:s.status,json:i}}async function Mv(n,e){const t={},r=await n.contextProvider.getContext(e.limitedUseAppCheckTokens);return r.authToken&&(t.Authorization="Bearer "+r.authToken),r.messagingToken&&(t["Firebase-Instance-ID-Token"]=r.messagingToken),r.appCheckToken!==null&&(t["X-Firebase-AppCheck"]=r.appCheckToken),t}function VS(n,e,t,r){const s=n._url(e);return OS(n,s,t,r)}async function OS(n,e,t,r){t=Ma(t);const s={data:t},i=await Mv(n,r),o=r.timeout||7e4,c=CS(o),u=await Promise.race([DS(e,s,i,n.fetchImpl),c.promise,n.cancelAllRequests]);if(c.cancel(),!u)throw new vt("cancelled","Firebase Functions instance was deleted.");const d=Fa(u.status,u.json);if(d)throw d;if(!u.json)throw new vt("internal","Response is not valid JSON object.");let f=u.json.data;if(typeof f>"u"&&(f=u.json.result),typeof f>"u")throw new vt("internal","Response is missing data field.");return{data:Ss(f)}}function LS(n,e,t,r){const s=n._url(e);return MS(n,s,t,r||{})}async function MS(n,e,t,r){var s;t=Ma(t);const i={data:t},o=await Mv(n,r);o["Content-Type"]="application/json",o.Accept="text/event-stream";let c;try{c=await n.fetchImpl(e,{method:"POST",body:JSON.stringify(i),headers:o,signal:r?.signal})}catch(v){if(v instanceof Error&&v.name==="AbortError"){const S=new vt("cancelled","Request was cancelled.");return{data:Promise.reject(S),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(S)}}}}}}const I=Fa(0,null);return{data:Promise.reject(I),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(I)}}}}}}let u,d;const f=new Promise((v,I)=>{u=v,d=I});(s=r?.signal)===null||s===void 0||s.addEventListener("abort",()=>{const v=new vt("cancelled","Request was cancelled.");d(v)});const p=c.body.getReader(),g=FS(p,u,d,r?.signal);return{stream:{[Symbol.asyncIterator](){const v=g.getReader();return{async next(){const{value:I,done:S}=await v.read();return{value:I,done:S}},async return(){return await v.cancel(),{done:!0,value:void 0}}}}},data:f}}function FS(n,e,t,r){const s=(o,c)=>{const u=o.match(kS);if(!u)return;const d=u[1];try{const f=JSON.parse(d);if("result"in f){e(Ss(f.result));return}if("message"in f){c.enqueue(Ss(f.message));return}if("error"in f){const p=Fa(0,f);c.error(p),t(p);return}}catch(f){if(f instanceof vt){c.error(f),t(f);return}}},i=new TextDecoder;return new ReadableStream({start(o){let c="";return u();async function u(){if(r?.aborted){const d=new vt("cancelled","Request was cancelled");return o.error(d),t(d),Promise.resolve()}try{const{value:d,done:f}=await n.read();if(f){c.trim()&&s(c.trim(),o),o.close();return}if(r?.aborted){const g=new vt("cancelled","Request was cancelled");o.error(g),t(g),await n.cancel();return}c+=i.decode(d,{stream:!0});const p=c.split(`
`);c=p.pop()||"";for(const g of p)g.trim()&&s(g.trim(),o);return u()}catch(d){const f=d instanceof vt?d:Fa(0,null);o.error(f),t(f)}}},cancel(){return n.cancel()}})}const zp="@firebase/functions",Gp="0.12.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const US="auth-internal",BS="app-check-internal",$S="messaging-internal";function qS(n){const e=(t,{instanceIdentifier:r})=>{const s=t.getProvider("app").getImmediate(),i=t.getProvider(US),o=t.getProvider($S),c=t.getProvider(BS);return new PS(s,i,o,c,r)};Wt(new Ot(Ad,e,"PUBLIC").setMultipleInstances(!0)),At(zp,Gp,n),At(zp,Gp,"esm2017")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jS(n=Qa(),e=Zl){const r=Pr(Ee(n),Ad).getImmediate({identifier:e}),s=bm("functions");return s&&zS(r,...s),r}function zS(n,e,t){xS(Ee(n),e,t)}function Mr(n,e,t){return NS(Ee(n),e)}qS();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fv="firebasestorage.googleapis.com",Uv="storageBucket",GS=2*60*1e3,HS=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue extends Mt{constructor(e,t,r=0){super(ll(e),`Firebase Storage: ${t} (${ll(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,Ue.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return ll(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var Fe;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(Fe||(Fe={}));function ll(n){return"storage/"+n}function Rd(){const n="An unknown error occurred, please check the error payload for server response.";return new Ue(Fe.UNKNOWN,n)}function KS(n){return new Ue(Fe.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function WS(n){return new Ue(Fe.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function QS(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new Ue(Fe.UNAUTHENTICATED,n)}function YS(){return new Ue(Fe.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function JS(n){return new Ue(Fe.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function XS(){return new Ue(Fe.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function ZS(){return new Ue(Fe.CANCELED,"User canceled the upload/download.")}function ek(n){return new Ue(Fe.INVALID_URL,"Invalid URL '"+n+"'.")}function tk(n){return new Ue(Fe.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function nk(){return new Ue(Fe.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+Uv+"' property when initializing the app?")}function rk(){return new Ue(Fe.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function sk(){return new Ue(Fe.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function ik(n){return new Ue(Fe.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function eu(n){return new Ue(Fe.INVALID_ARGUMENT,n)}function Bv(){return new Ue(Fe.APP_DELETED,"The Firebase app was deleted.")}function ok(n){return new Ue(Fe.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function _i(n,e){return new Ue(Fe.INVALID_FORMAT,"String does not match format '"+n+"': "+e)}function ni(n){throw new Ue(Fe.INTERNAL_ERROR,"Internal error: "+n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=Tt.makeFromUrl(e,t)}catch{return new Tt(e,"")}if(r.path==="")return r;throw tk(e)}static makeFromUrl(e,t){let r=null;const s="([A-Za-z0-9.\\-_]+)";function i(F){F.path.charAt(F.path.length-1)==="/"&&(F.path_=F.path_.slice(0,-1))}const o="(/(.*))?$",c=new RegExp("^gs://"+s+o,"i"),u={bucket:1,path:3};function d(F){F.path_=decodeURIComponent(F.path)}const f="v[A-Za-z0-9_]+",p=t.replace(/[.]/g,"\\."),g="(/([^?#]*).*)?$",v=new RegExp(`^https?://${p}/${f}/b/${s}/o${g}`,"i"),I={bucket:1,path:3},S=t===Fv?"(?:storage.googleapis.com|storage.cloud.google.com)":t,A="([^?#]*)",O=new RegExp(`^https?://${S}/${s}/${A}`,"i"),x=[{regex:c,indices:u,postModify:i},{regex:v,indices:I,postModify:d},{regex:O,indices:{bucket:1,path:2},postModify:d}];for(let F=0;F<x.length;F++){const P=x[F],M=P.regex.exec(e);if(M){const T=M[P.indices.bucket];let y=M[P.indices.path];y||(y=""),r=new Tt(T,y),P.postModify(r);break}}if(r==null)throw ek(e);return r}}class ak{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ck(n,e,t){let r=1,s=null,i=null,o=!1,c=0;function u(){return c===2}let d=!1;function f(...A){d||(d=!0,e.apply(null,A))}function p(A){s=setTimeout(()=>{s=null,n(v,u())},A)}function g(){i&&clearTimeout(i)}function v(A,...O){if(d){g();return}if(A){g(),f.call(null,A,...O);return}if(u()||o){g(),f.call(null,A,...O);return}r<64&&(r*=2);let x;c===1?(c=2,x=0):x=(r+Math.random())*1e3,p(x)}let I=!1;function S(A){I||(I=!0,g(),!d&&(s!==null?(A||(c=2),clearTimeout(s),p(0)):A||(c=1)))}return p(0),i=setTimeout(()=>{o=!0,S(!0)},t),S}function lk(n){n(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uk(n){return n!==void 0}function dk(n){return typeof n=="object"&&!Array.isArray(n)}function Sd(n){return typeof n=="string"||n instanceof String}function Hp(n){return kd()&&n instanceof Blob}function kd(){return typeof Blob<"u"}function Kp(n,e,t,r){if(r<e)throw eu(`Invalid value for '${n}'. Expected ${e} or greater.`);if(r>t)throw eu(`Invalid value for '${n}'. Expected ${t} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sc(n,e,t){let r=e;return t==null&&(r=`https://${e}`),`${t}://${r}/v0${n}`}function $v(n){const e=encodeURIComponent;let t="?";for(const r in n)if(n.hasOwnProperty(r)){const s=e(r)+"="+e(n[r]);t=t+s+"&"}return t=t.slice(0,-1),t}var gr;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(gr||(gr={}));/**
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
 */function hk(n,e){const t=n>=500&&n<600,s=[408,429].indexOf(n)!==-1,i=e.indexOf(n)!==-1;return t||s||i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fk{constructor(e,t,r,s,i,o,c,u,d,f,p,g=!0){this.url_=e,this.method_=t,this.headers_=r,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=o,this.callback_=c,this.errorCallback_=u,this.timeout_=d,this.progressCallback_=f,this.connectionFactory_=p,this.retry=g,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((v,I)=>{this.resolve_=v,this.reject_=I,this.start_()})}start_(){const e=(r,s)=>{if(s){r(!1,new Oo(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const o=c=>{const u=c.loaded,d=c.lengthComputable?c.total:-1;this.progressCallback_!==null&&this.progressCallback_(u,d)};this.progressCallback_!==null&&i.addUploadProgressListener(o),i.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(o),this.pendingConnection_=null;const c=i.getErrorCode()===gr.NO_ERROR,u=i.getStatus();if(!c||hk(u,this.additionalRetryCodes_)&&this.retry){const f=i.getErrorCode()===gr.ABORT;r(!1,new Oo(!1,null,f));return}const d=this.successCodes_.indexOf(u)!==-1;r(!0,new Oo(d,i))})},t=(r,s)=>{const i=this.resolve_,o=this.reject_,c=s.connection;if(s.wasSuccessCode)try{const u=this.callback_(c,c.getResponse());uk(u)?i(u):i()}catch(u){o(u)}else if(c!==null){const u=Rd();u.serverResponse=c.getErrorText(),this.errorCallback_?o(this.errorCallback_(c,u)):o(u)}else if(s.canceled){const u=this.appDelete_?Bv():ZS();o(u)}else{const u=XS();o(u)}};this.canceled_?t(!1,new Oo(!1,null,!0)):this.backoffId_=ck(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&lk(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Oo{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}}function pk(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function mk(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function gk(n,e){e&&(n["X-Firebase-GMPID"]=e)}function _k(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function vk(n,e,t,r,s,i,o=!0){const c=$v(n.urlParams),u=n.url+c,d=Object.assign({},n.headers);return gk(d,e),pk(d,t),mk(d,i),_k(d,r),new fk(u,n.method,d,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,s,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yk(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function bk(...n){const e=yk();if(e!==void 0){const t=new e;for(let r=0;r<n.length;r++)t.append(n[r]);return t.getBlob()}else{if(kd())return new Blob(n);throw new Ue(Fe.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function wk(n,e,t){return n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null}/**
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
 */function Ik(n){if(typeof atob>"u")throw ik("base-64");return atob(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zt={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class ul{constructor(e,t){this.data=e,this.contentType=t||null}}function Ek(n,e){switch(n){case zt.RAW:return new ul(qv(e));case zt.BASE64:case zt.BASE64URL:return new ul(jv(n,e));case zt.DATA_URL:return new ul(Ak(e),Rk(e))}throw Rd()}function qv(n){const e=[];for(let t=0;t<n.length;t++){let r=n.charCodeAt(t);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(t<n.length-1&&(n.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{const i=r,o=n.charCodeAt(++t);r=65536|(i&1023)<<10|o&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function Tk(n){let e;try{e=decodeURIComponent(n)}catch{throw _i(zt.DATA_URL,"Malformed data URL.")}return qv(e)}function jv(n,e){switch(n){case zt.BASE64:{const s=e.indexOf("-")!==-1,i=e.indexOf("_")!==-1;if(s||i)throw _i(n,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case zt.BASE64URL:{const s=e.indexOf("+")!==-1,i=e.indexOf("/")!==-1;if(s||i)throw _i(n,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=Ik(e)}catch(s){throw s.message.includes("polyfill")?s:_i(n,"Invalid character found")}const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}class zv{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(t===null)throw _i(zt.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=t[1]||null;r!=null&&(this.base64=Sk(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function Ak(n){const e=new zv(n);return e.base64?jv(zt.BASE64,e.rest):Tk(e.rest)}function Rk(n){return new zv(n).contentType}function Sk(n,e){return n.length>=e.length?n.substring(n.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn{constructor(e,t){let r=0,s="";Hp(e)?(this.data_=e,r=e.size,s=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=s}size(){return this.size_}type(){return this.type_}slice(e,t){if(Hp(this.data_)){const r=this.data_,s=wk(r,e,t);return s===null?null:new Sn(s)}else{const r=new Uint8Array(this.data_.buffer,e,t-e);return new Sn(r,!0)}}static getBlob(...e){if(kd()){const t=e.map(r=>r instanceof Sn?r.data_:r);return new Sn(bk.apply(null,t))}else{const t=e.map(o=>Sd(o)?Ek(zt.RAW,o).data:o.data_);let r=0;t.forEach(o=>{r+=o.byteLength});const s=new Uint8Array(r);let i=0;return t.forEach(o=>{for(let c=0;c<o.length;c++)s[i++]=o[c]}),new Sn(s,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gv(n){let e;try{e=JSON.parse(n)}catch{return null}return dk(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kk(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function Ck(n,e){const t=e.split("/").filter(r=>r.length>0).join("/");return n.length===0?t:n+"/"+t}function Hv(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pk(n,e){return e}class dt{constructor(e,t,r,s){this.server=e,this.local=t||e,this.writable=!!r,this.xform=s||Pk}}let Lo=null;function xk(n){return!Sd(n)||n.length<2?n:Hv(n)}function Kv(){if(Lo)return Lo;const n=[];n.push(new dt("bucket")),n.push(new dt("generation")),n.push(new dt("metageneration")),n.push(new dt("name","fullPath",!0));function e(i,o){return xk(o)}const t=new dt("name");t.xform=e,n.push(t);function r(i,o){return o!==void 0?Number(o):o}const s=new dt("size");return s.xform=r,n.push(s),n.push(new dt("timeCreated")),n.push(new dt("updated")),n.push(new dt("md5Hash",null,!0)),n.push(new dt("cacheControl",null,!0)),n.push(new dt("contentDisposition",null,!0)),n.push(new dt("contentEncoding",null,!0)),n.push(new dt("contentLanguage",null,!0)),n.push(new dt("contentType",null,!0)),n.push(new dt("metadata","customMetadata",!0)),Lo=n,Lo}function Nk(n,e){function t(){const r=n.bucket,s=n.fullPath,i=new Tt(r,s);return e._makeStorageReference(i)}Object.defineProperty(n,"ref",{get:t})}function Dk(n,e,t){const r={};r.type="file";const s=t.length;for(let i=0;i<s;i++){const o=t[i];r[o.local]=o.xform(r,e[o.server])}return Nk(r,n),r}function Wv(n,e,t){const r=Gv(e);return r===null?null:Dk(n,r,t)}function Vk(n,e,t,r){const s=Gv(e);if(s===null||!Sd(s.downloadTokens))return null;const i=s.downloadTokens;if(i.length===0)return null;const o=encodeURIComponent;return i.split(",").map(d=>{const f=n.bucket,p=n.fullPath,g="/b/"+o(f)+"/o/"+o(p),v=Sc(g,t,r),I=$v({alt:"media",token:d});return v+I})[0]}function Ok(n,e){const t={},r=e.length;for(let s=0;s<r;s++){const i=e[s];i.writable&&(t[i.server]=n[i.local])}return JSON.stringify(t)}class Cd{constructor(e,t,r,s){this.url=e,this.method=t,this.handler=r,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qv(n){if(!n)throw Rd()}function Lk(n,e){function t(r,s){const i=Wv(n,s,e);return Qv(i!==null),i}return t}function Mk(n,e){function t(r,s){const i=Wv(n,s,e);return Qv(i!==null),Vk(i,s,n.host,n._protocol)}return t}function Yv(n){function e(t,r){let s;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?s=YS():s=QS():t.getStatus()===402?s=WS(n.bucket):t.getStatus()===403?s=JS(n.path):s=r,s.status=t.getStatus(),s.serverResponse=r.serverResponse,s}return e}function Jv(n){const e=Yv(n);function t(r,s){let i=e(r,s);return r.getStatus()===404&&(i=KS(n.path)),i.serverResponse=s.serverResponse,i}return t}function Fk(n,e,t){const r=e.fullServerUrl(),s=Sc(r,n.host,n._protocol),i="GET",o=n.maxOperationRetryTime,c=new Cd(s,i,Mk(n,t),o);return c.errorHandler=Jv(e),c}function Uk(n,e){const t=e.fullServerUrl(),r=Sc(t,n.host,n._protocol),s="DELETE",i=n.maxOperationRetryTime;function o(u,d){}const c=new Cd(r,s,o,i);return c.successCodes=[200,204],c.errorHandler=Jv(e),c}function Bk(n,e){return n&&n.contentType||e&&e.type()||"application/octet-stream"}function $k(n,e,t){const r=Object.assign({},t);return r.fullPath=n.path,r.size=e.size(),r.contentType||(r.contentType=Bk(null,e)),r}function qk(n,e,t,r,s){const i=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function c(){let x="";for(let F=0;F<2;F++)x=x+Math.random().toString().slice(2);return x}const u=c();o["Content-Type"]="multipart/related; boundary="+u;const d=$k(e,r,s),f=Ok(d,t),p="--"+u+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+f+`\r
--`+u+`\r
Content-Type: `+d.contentType+`\r
\r
`,g=`\r
--`+u+"--",v=Sn.getBlob(p,r,g);if(v===null)throw rk();const I={name:d.fullPath},S=Sc(i,n.host,n._protocol),A="POST",O=n.maxUploadRetryTime,k=new Cd(S,A,Lk(n,t),O);return k.urlParams=I,k.headers=o,k.body=v.uploadData(),k.errorHandler=Yv(e),k}class jk{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=gr.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=gr.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=gr.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,r,s){if(this.sent_)throw ni("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(t,e,!0),s!==void 0)for(const i in s)s.hasOwnProperty(i)&&this.xhr_.setRequestHeader(i,s[i].toString());return r!==void 0?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw ni("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw ni("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw ni("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw ni("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class zk extends jk{initXhr(){this.xhr_.responseType="text"}}function Pd(){return new zk}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sr{constructor(e,t){this._service=e,t instanceof Tt?this._location=t:this._location=Tt.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new Sr(e,t)}get root(){const e=new Tt(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Hv(this._location.path)}get storage(){return this._service}get parent(){const e=kk(this._location.path);if(e===null)return null;const t=new Tt(this._location.bucket,e);return new Sr(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw ok(e)}}function Gk(n,e,t){n._throwIfRoot("uploadBytes");const r=qk(n.storage,n._location,Kv(),new Sn(e,!0),t);return n.storage.makeRequestWithTokens(r,Pd).then(s=>({metadata:s,ref:n}))}function Hk(n){n._throwIfRoot("getDownloadURL");const e=Fk(n.storage,n._location,Kv());return n.storage.makeRequestWithTokens(e,Pd).then(t=>{if(t===null)throw sk();return t})}function Kk(n){n._throwIfRoot("deleteObject");const e=Uk(n.storage,n._location);return n.storage.makeRequestWithTokens(e,Pd)}function Wk(n,e){const t=Ck(n._location.path,e),r=new Tt(n._location.bucket,t);return new Sr(n.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qk(n){return/^[A-Za-z]+:\/\//.test(n)}function Yk(n,e){return new Sr(n,e)}function Xv(n,e){if(n instanceof xd){const t=n;if(t._bucket==null)throw nk();const r=new Sr(t,t._bucket);return e!=null?Xv(r,e):r}else return e!==void 0?Wk(n,e):n}function Jk(n,e){if(e&&Qk(e)){if(n instanceof xd)return Yk(n,e);throw eu("To use ref(service, url), the first argument must be a Storage instance.")}else return Xv(n,e)}function Wp(n,e){const t=e?.[Uv];return t==null?null:Tt.makeFromBucketSpec(t,n)}function Xk(n,e,t,r={}){n.host=`${e}:${t}`,n._protocol="http";const{mockUserToken:s}=r;s&&(n._overrideAuthToken=typeof s=="string"?s:Eb(s,n.app.options.projectId))}class xd{constructor(e,t,r,s,i){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=s,this._firebaseVersion=i,this._bucket=null,this._host=Fv,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=GS,this._maxUploadRetryTime=HS,this._requests=new Set,s!=null?this._bucket=Tt.makeFromBucketSpec(s,this._host):this._bucket=Wp(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Tt.makeFromBucketSpec(this._url,e):this._bucket=Wp(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Kp("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Kp("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){if(It(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Sr(this,e)}_makeRequest(e,t,r,s,i=!0){if(this._deleted)return new ak(Bv());{const o=vk(e,this._appId,r,s,t,this._firebaseVersion,i);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,s).getPromise()}}const Qp="@firebase/storage",Yp="0.13.6";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zv="storage";function ey(n,e,t){return n=Ee(n),Gk(n,e,t)}function ty(n){return n=Ee(n),Hk(n)}function Zk(n){return n=Ee(n),Kk(n)}function Nd(n,e){return n=Ee(n),Jk(n,e)}function eC(n=Qa(),e){n=Ee(n);const r=Pr(n,Zv).getImmediate({identifier:e}),s=bm("storage");return s&&tC(r,...s),r}function tC(n,e,t,r={}){Xk(n,e,t,r)}function nC(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),s=n.getProvider("app-check-internal");return new xd(t,r,s,e,xr)}function rC(){Wt(new Ot(Zv,nC,"PUBLIC").setMultipleInstances(!0)),At(Qp,Yp,""),At(Qp,Yp,"esm2017")}rC();const sC={apiKey:"AIzaSyD9MJrON70mPqZxQqhndgQHNkTZUnnaQIs",authDomain:"altorra-cars.firebaseapp.com",databaseURL:"https://altorra-cars-default-rtdb.firebaseio.com",projectId:"altorra-cars",storageBucket:"altorra-cars.firebasestorage.app",messagingSenderId:"235148219730",appId:"1:235148219730:web:ceabdbc52fdcbe8b85168b",measurementId:"G-ZGZ6CVTB73"},iC="altorra-crm",oo=Rm(sC,iC);bS(oo,{provider:new Td("6Lfz8BQtAAAAAILjn8GbHFT8u6dpg5rFvg5hGZzS"),isTokenAutoRefreshEnabled:!0});const $i=aT(oo),te=wR(oo,{localCache:OR({tabManager:Ev({})})}),Fr=jS(oo,"us-central1"),Dd=eC(oo);function je(n){const e=j.get().permissions||[];return e.includes("*")||e.includes(n)}function oC(n){return n?n.rol==="super_admin"||n.roleId==="system_super_admin"?["*"]:Array.isArray(n.permissions)&&n.permissions.length?n.permissions.slice():[]:[]}async function aC(n){try{const e=await Lr(Ie(te,"usuarios",n.uid)),t=e.exists()?e.data():null;if(t&&t.bloqueado===!0){await Zm($i),j.set({user:null,profile:null,permissions:[],ready:!0,authError:"Cuenta bloqueada. Contacta al administrador."});return}j.set({user:n,profile:t,permissions:oC(t),ready:!0,authError:null})}catch(e){console.warn("[auth] no se pudo hidratar el perfil:",e),j.set({user:n,profile:null,permissions:[],ready:!0})}}function cC(){WI($i,ng).catch(()=>{}),JI($i,n=>{n?aC(n):j.set({user:null,profile:null,permissions:[],ready:!0})})}const lC={"auth/invalid-email":"Correo inválido.","auth/user-disabled":"Esta cuenta está deshabilitada.","auth/user-not-found":"No existe una cuenta con ese correo.","auth/wrong-password":"Contraseña incorrecta.","auth/invalid-credential":"Credenciales incorrectas.","auth/too-many-requests":"Demasiados intentos. Espera unos minutos.","auth/network-request-failed":"Sin conexión. Revisa tu internet."};async function uC(n,e){j.set({authError:null});try{await KI($i,String(n).trim(),e)}catch(t){const r=lC[t&&t.code]||"No se pudo iniciar sesión.";throw j.set({authError:r}),t}}async function dC(){if(j.get().mock){j.set({user:null,profile:null,permissions:[]});return}await Zm($i)}function dl(){const{profile:n,user:e}=j.get();return n&&(n.nombre||n.roleName)||e&&(e.displayName||e.email)||"Usuario"}function hC(){const{profile:n}=j.get();return n&&(n.cargo||n.roleName)||"Asesor"}const fC=["bandeja","pipeline","agenda","reportes","contactos","config","resenas","banners","marcas"];function ny(){const n=(location.hash||"").replace(/^#\/?/,""),[e]=n.split("/");return fC.includes(e)?e:"bandeja"}function pC(n){location.hash!==`#/${n}`&&(location.hash=`#/${n}`)}function mC(n){const e=()=>n(ny());return window.addEventListener("hashchange",e),()=>window.removeEventListener("hashchange",e)}function l(n,e={},t=[]){const r=document.createElement(n);for(const[s,i]of Object.entries(e))i==null||i===!1||(s==="class"?r.className=i:s==="html"?r.innerHTML=i:s==="text"?r.textContent=i:s==="dataset"?Object.assign(r.dataset,i):s==="style"&&typeof i=="object"?Object.assign(r.style,i):s.startsWith("on")&&typeof i=="function"?r.addEventListener(s.slice(2).toLowerCase(),i):r.setAttribute(s,i===!0?"":String(i)));for(const s of[].concat(t))s==null||s===!1||s===""||r.append(s.nodeType?s:document.createTextNode(String(s)));return r}function pe(n){for(;n&&n.firstChild;)n.removeChild(n.firstChild);return n}let ls=null;function ry(n){ls&&!ls.contains(n.target)&&Ua()}function sy(n){n.key==="Escape"&&Ua()}function Ua(){ls&&(ls.remove(),ls=null,document.removeEventListener("mousedown",ry,!0),window.removeEventListener("keydown",sy,!0))}function $t(n,e,t,r={}){Ua();const s=l("div",{class:"popover",role:"menu"});r.title&&s.append(l("div",{class:"popover__title",text:r.title})),e.forEach(o=>{if(o.divider){s.append(l("div",{class:"popover__divider"}));return}const c=l("button",{class:"popover__item"+(o.active?" is-active":""),type:"button",role:"menuitem"},[o.icon?l("span",{class:"popover__icon",text:o.icon}):null,l("span",{class:"u-grow u-truncate",text:o.label}),o.hint?l("span",{class:"popover__hint u-caption",text:o.hint}):null]);c.addEventListener("click",u=>{u.stopPropagation(),Ua(),t(o)}),s.append(c)}),document.body.append(s),gC(s,n),ls=s,setTimeout(()=>{document.addEventListener("mousedown",ry,!0),window.addEventListener("keydown",sy,!0)},0);const i=s.querySelector(".popover__item");i&&i.focus()}function gC(n,e){const t=e.getBoundingClientRect(),r=n.offsetWidth,s=n.offsetHeight;let i=t.bottom+6,o=t.right-r;o<8&&(o=8),o+r>window.innerWidth-8&&(o=window.innerWidth-r-8),i+s>window.innerHeight-8&&(i=t.top-s-6),n.style.top=`${Math.max(8,i)}px`,n.style.left=`${Math.max(8,o)}px`}function ks(n){const e=String(n||"").trim().split(/\s+/).filter(Boolean);return e.length?e.length===1?e[0].slice(0,2).toUpperCase():(e[0][0]+e[e.length-1][0]).toUpperCase():"?"}function _C(n){return String(n||"").replace(/\D/g,"")}function iy(n,e){const t=_C(n);if(!t)return"";const r=e?"?text="+encodeURIComponent(e):"";return"https://wa.me/"+t+r}function oy(n){if(!n)return 1/0;const e=new Date(n).getTime();return Number.isNaN(e)?1/0:Date.now()-e}function Cs(n){const e=oy(n);return e===1/0?1/0:e/864e5}function _r(n){const e=oy(n);if(e===1/0)return"—";const t=Math.floor(e/6e4);if(t<1)return"ahora";if(t<60)return`hace ${t} min`;const r=Math.floor(t/60);if(r<24)return`hace ${r} h`;const s=Math.floor(r/24);return s===1?"ayer":s<7?`hace ${s} d`:new Date(n).toLocaleDateString("es-CO",{day:"numeric",month:"short"})}function vC(n){if(!n)return"—";const e=new Date(n);return Number.isNaN(e.getTime())?"—":e.toLocaleString("es-CO",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}function hl(n){const e=Math.abs(n),t=Math.round(e/6e4);if(t<60)return`${t} min`;const r=Math.floor(t/60),s=t%60;return s?`${r} h ${s} min`:`${r} h`}function rr(n){const e=Number(n)||0;if(!e)return"";if(e>=1e6){const t=e/1e6;return"$"+(t%1?t.toFixed(1).replace(".",","):t.toFixed(0))+" M"}return e>=1e3?"$"+Math.round(e/1e3)+" K":"$"+e}function Ba(n){return String(n||"").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu,"")}const yC="0.4.1",bC=[{id:"bandeja",label:"Bandeja",icon:"📥",ready:!0},{id:"pipeline",label:"Pipeline",icon:"🎯",ready:!0},{id:"agenda",label:"Agenda",icon:"📅",ready:!0},{id:"reportes",label:"Reportes",icon:"📊",ready:!0},{id:"contactos",label:"Contactos",icon:"👤",ready:!0},{id:"config",label:"Disponibilidad",icon:"⚙️",ready:!0,perm:"calendar.config"},{id:"resenas",label:"Reseñas",icon:"⭐",ready:!0,perm:"reviews.read"},{id:"banners",label:"Banners",icon:"🖼️",ready:!0,perm:"banners.read"},{id:"marcas",label:"Marcas",icon:"🏷️",ready:!0,perm:"brands.read"}],fl={bandeja:"Bandeja Inteligente",pipeline:"Pipeline de ventas",agenda:"Agenda",reportes:"Reportes y KPIs",contactos:"Contactos",config:"Disponibilidad de citas",resenas:"Reseñas del sitio",banners:"Banners del sitio",marcas:"Marcas del inventario"};function wC(n){const e={},t=l("div",{class:"sidebar__brand"},[l("span",{class:"sidebar__logo",text:"ALTORRA"}),l("span",{class:"sidebar__sub u-caption",text:"CRM"})]),r=l("nav",{class:"sidebar__nav","aria-label":"Secciones"});bC.filter(S=>!S.perm||je(S.perm)).forEach(S=>{const A=l("button",{class:"navitem",type:"button",disabled:!S.ready},[l("span",{class:"navitem__icon","aria-hidden":"true",text:S.icon}),l("span",{class:"navitem__label",text:S.label}),S.ready?null:l("span",{class:"navitem__soon",text:"Pronto"})]);S.ready&&A.addEventListener("click",()=>pC(S.id)),e[S.id]=A,r.append(A)});const s=l("aside",{class:"sidebar"},[t,r,l("div",{class:"sidebar__foot u-caption u-faint"},[`v${yC} · Fase 4`])]),i=l("h1",{class:"topbar__h",text:fl.bandeja}),o=l("span",{class:"topbar__crumb u-caption u-faint",text:j.get().mock?"modo demo":"tiempo real"}),c=l("div",{class:"topbar__title"},[i,o]),u=l("button",{class:"icon-btn",type:"button","aria-label":"Cambiar tema"},[l("span",{"aria-hidden":"true",text:j.get().theme==="dark"?"☀️":"🌙"})]);u.addEventListener("click",()=>{const S=gb();u.firstChild.textContent=S==="dark"?"☀️":"🌙"});const d=l("button",{class:"usermenu",type:"button","aria-haspopup":"menu"},[l("span",{class:"avatar avatar--sm","aria-hidden":"true",text:ks(dl())}),l("span",{class:"usermenu__meta"},[l("span",{class:"usermenu__name u-truncate",text:dl()}),l("span",{class:"usermenu__role u-caption u-faint u-truncate",text:hC()})])]);d.addEventListener("click",()=>{$t(d,[{value:"logout",label:"Cerrar sesión",icon:"🚪"}],S=>{S.value==="logout"&&dC()},{title:dl()})});const f=l("header",{class:"topbar"},[c,l("div",{class:"topbar__actions u-row"},[u,d])]),p=l("main",{class:"outlet",id:"outlet"}),g=l("div",{id:"detail-root"}),v=l("div",{class:"app-shell"},[s,l("div",{class:"app-main"},[f,p]),g]);pe(n),n.removeAttribute("aria-busy"),n.append(v);function I(S){Object.entries(e).forEach(([A,O])=>{const k=A===S;O.classList.toggle("is-active",k),k?O.setAttribute("aria-current","page"):O.removeAttribute("aria-current")}),i.textContent=fl[S]||fl.bandeja}return{outlet:p,detailRoot:g,setActive:I}}function IC(n){const e=l("input",{class:"input",type:"email",placeholder:"correo@altorracars.com",autocomplete:"username",required:!0,"aria-label":"Correo"}),t=l("input",{class:"input",type:"password",placeholder:"Contraseña",autocomplete:"current-password",required:!0,"aria-label":"Contraseña"}),r=l("div",{class:"login__error",role:"alert",hidden:!0}),s=l("button",{class:"btn btn--gold btn--block",type:"submit"},["Entrar"]),i=l("form",{class:"login__form"},[l("label",{class:"field"},[l("span",{class:"field__label",text:"Correo"}),e]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Contraseña"}),t]),r,s]);i.addEventListener("submit",async c=>{c.preventDefault(),r.hidden=!0,s.disabled=!0,s.textContent="Entrando…";try{await uC(e.value,t.value)}catch{r.textContent=j.get().authError||"No se pudo iniciar sesión.",r.hidden=!1,s.disabled=!1,s.textContent="Entrar"}});const o=l("div",{class:"login surface"},[l("div",{class:"login__brand"},[l("span",{class:"login__logo",text:"ALTORRA"}),l("span",{class:"login__tag u-caption u-faint",text:"CRM · Bandeja Inteligente"})]),l("h1",{class:"login__title",text:"Bienvenido"}),l("p",{class:"login__lead u-muted",text:"Inicia sesión para gestionar tus clientes."}),i,l("div",{class:"login__foot u-caption u-faint",text:"Acceso restringido al equipo de Altorra Cars."})]);pe(n),n.removeAttribute("aria-busy"),n.append(l("div",{class:"login-wrap"},[o])),setTimeout(()=>e.focus(),50)}const EC=()=>document.getElementById("toast-root"),Jp={ok:"✓",error:"⚠",info:"ℹ"};function q(n,e="info",t=3200){const r=EC();if(!r)return;const s=document.createElement("div");s.className=`toast toast--${e}`,s.setAttribute("role",e==="error"?"alert":"status");const i=document.createElement("span");i.setAttribute("aria-hidden","true"),i.textContent=Jp[e]||Jp.info;const o=document.createElement("span");o.className="u-grow",o.textContent=n,s.append(i,o),r.appendChild(s);const c=()=>{s.classList.add("is-leaving"),s.addEventListener("animationend",()=>s.remove(),{once:!0})},u=setTimeout(c,t);s.addEventListener("click",()=>{clearTimeout(u),c()})}const TC=["financiacion","financiación","compra","test_drive","test-drive","cotizacion","cotización"],AC=["cita","test_drive","test-drive","visita","agendar","peritaje"],RC=["financiacion","financiación","consignacion","consignación","consignacion_venta","compra","venta","cotizacion","cotización"],SC=["pqr","reclamo","queja","peticion","petición","garantia","garantía","soporte"],kC={cita:{label:"Cita",icon:"📅",badge:"info"},solicitud:{label:"Solicitud",icon:"📝",badge:"gold"},pqr:{label:"PQR",icon:"⚠️",badge:"danger"},lead:{label:"Lead",icon:"✨",badge:""}};function kc(n){const e=String(n.sourceDetail||"").toLowerCase(),t=String(n.source||"").toLowerCase();let r="lead";return SC.some(s=>e.includes(s)||t.includes(s))?r="pqr":t.includes("cita")||AC.some(s=>e.includes(s))?r="cita":RC.some(s=>e.includes(s))&&(r="solicitud"),{type:r,...kC[r]}}function Vd(n){const e=String(n.sourceDetail||"").toLowerCase();return TC.some(t=>e.includes(t))||!!n.vehicleOfInterestId}const CC={whatsapp:{label:"WhatsApp",icon:"🟢"},facebook:{label:"Facebook",icon:"📘"},instagram:{label:"Instagram",icon:"📸"},tiktok:{label:"TikTok",icon:"🎵"},marketplace:{label:"Marketplace",icon:"🛒"},llamada:{label:"Llamada",icon:"📞"},presencial:{label:"Presencial",icon:"🏬"},referido:{label:"Referido",icon:"🤝"},bot:{label:"ALTOR Bot",icon:"🤖"},cuenta:{label:"Cuenta",icon:"👤"},newsletter:{label:"Newsletter",icon:"✉️"},cita:{label:"Cita web",icon:"📅"},web:{label:"Web",icon:"🌐"}};function qi(n){const e=String(n.source||"").toLowerCase();let t="web";return e.includes("whatsapp")||e.includes("wsp")||e.includes("wa.me")?t="whatsapp":e.includes("facebook")||e.includes("meta")||e==="fb"?t="facebook":e.includes("instagram")||e==="ig"?t="instagram":e.includes("tiktok")||e==="tt"?t="tiktok":e.includes("marketplace")||e.includes("mercadolibre")||e.includes("tucarro")?t="marketplace":e.includes("llamada")||e.includes("telefono")||e.includes("teléfono")||e.includes("call")?t="llamada":e.includes("presencial")||e.includes("walk")||e.includes("showroom")||e.includes("local")?t="presencial":e.includes("referido")||e.includes("referral")||e.includes("recomendado")?t="referido":e.includes("bot")||e.includes("concierge")||e.includes("altor")?t="bot":e.includes("cuenta")||e.includes("registro")||e.includes("account")||e.includes("signup")?t="cuenta":e.includes("news")||e.includes("subscri")||e.includes("suscri")?t="newsletter":e.includes("cita")&&(t="cita"),{key:t,...CC[t]}}const PC=[{id:"whatsapp",label:"WhatsApp",icon:"🟢"},{id:"facebook",label:"Facebook (Meta)",icon:"📘"},{id:"instagram",label:"Instagram",icon:"📸"},{id:"tiktok",label:"TikTok",icon:"🎵"},{id:"marketplace",label:"Marketplace",icon:"🛒"},{id:"llamada",label:"Llamada",icon:"📞"},{id:"presencial",label:"Presencial / Showroom",icon:"🏬"},{id:"referido",label:"Referido",icon:"🤝"},{id:"web",label:"Web (otro)",icon:"🌐"}],xC=[{id:"compra",label:"Compra"},{id:"financiacion",label:"Financiación"},{id:"cita",label:"Cita / Test drive"},{id:"consignacion_venta",label:"Vende su carro"},{id:"peritaje",label:"Peritaje"},{id:"consulta",label:"Consulta general"}],Mo={cita:30*60*1e3,pqr:60*60*1e3,solicitud:2*60*60*1e3,lead:24*60*60*1e3};function ay(n){const e=Ps(n.status),{type:t}=kc(n);let r=n.slaDueAt?new Date(n.slaDueAt).getTime():null;r||(r=(n.createdAt?new Date(n.createdAt).getTime():Date.now())+(Mo[t]||Mo.lead));const s=r-Date.now(),i=Mo[t]||Mo.lead;let o="ok";return e?o="ok":s<=0?o="late":s<i*.25&&(o="warn"),{state:o,dueAt:r,remainingMs:s,closed:e}}const tu=[{id:"nuevo",label:"Nuevo",badge:"gold"},{id:"contactado",label:"Contactado",badge:"info"},{id:"convertido",label:"Convertido",badge:"ok"},{id:"descartado",label:"Descartado",badge:""}],NC=[{id:"inalcanzable",label:"Inalcanzable (no responde)"},{id:"no_califica",label:"No califica (sin presupuesto/intención)"},{id:"duplicado",label:"Duplicado"},{id:"ya_compro_en_otra_parte",label:"Ya compró en otra parte"},{id:"spam_prueba",label:"Spam / prueba"}],DC={calificado:{id:"calificado",label:"Calificado (v2)",badge:"ok"},no_calificado:{id:"no_calificado",label:"No calificado (v2)",badge:""},perdido:{id:"perdido",label:"Perdido (v2)",badge:"danger"}},VC=tu.reduce((n,e)=>(n[e.id]=e,n),{});function ia(n){return VC[n]||DC[n]||{id:n||"nuevo",label:n||"Nuevo",badge:""}}function Ps(n){return n==="convertido"||n==="descartado"||n==="perdido"||n==="no_calificado"}function cy(n){return!n.status||n.status==="nuevo"}const nu={intent:.3,interactions:.18,recency:.22,frequency:.12,economic:.07,age:.06,engagement:.05},ur=n=>Math.max(0,Math.min(1,n));function OC(n){const e=String(n.sourceDetail||"").toLowerCase();let t=.25;return Vd(n)?t=1:/(consignacion|consignación|peritaje|venta)/.test(e)?t=.6:(/(consulta|info|general)/.test(e)||!e)&&(t=.3),n.vehicleOfInterestId&&(t=Math.min(1,t+.15)),ur(t)}function LC(n){let e=0;for(const t of n){const r=`${t.subject||""} ${t.body||""}`;if(!/financ/i.test(r))continue;const s=(r.match(/\d[\d.,]{5,}/g)||[]).map(i=>parseInt(i.replace(/\D/g,""),10)).filter(i=>i>0);s.length&&(e=Math.max(e,Math.max(...s)/5e7))}return ur(e)}function MC(n){const e=new Set;for(const t of n){const r=t.createdAt;r&&(Cs(r)>30||e.add(String(r).slice(0,10)))}return ur(e.size/8)}function ly(n,e=[],t=null){const r=Array.isArray(e)?e:[],s={intent:OC(n),interactions:ur(r.length/6),recency:n.lastActivityAt?ur(1-Cs(n.lastActivityAt)/30):0,frequency:MC(r),economic:LC(r),age:n.createdAt?ur(Cs(n.createdAt)/60):0,engagement:t&&Number(t.score)?ur(t.score/100):0};let i=0;for(const c of Object.keys(nu))i+=s[c]*nu[c];const o=Math.round(i*100);return{score:o,rating:FC(o),factors:s}}function FC(n){return n>=70?"hot":n>=40?"warm":"cold"}const us={hot:{label:"Caliente",icon:"🔥",cls:"temp--hot"},warm:{label:"Tibio",icon:"🌤️",cls:"temp--warm"},cold:{label:"Frío",icon:"❄️",cls:"temp--cold"}},Xp={intent:"Intención",interactions:"Interacciones",recency:"Recencia",frequency:"Frecuencia",economic:"Capacidad econ.",age:"Antigüedad",engagement:"Engagement"},UC=nu;function uy(n,e={}){const t=Number(e.score)||0,{type:r}=kc(n),s=Cs(n.createdAt),i=Cs(n.lastActivityAt),o=cy(n),c=Ps(n.status),u=[{id:"confirm_appointment",priority:95,when:r==="cita"&&!c&&o,label:"Confirmar cita",reason:"Cita pendiente de confirmación",icon:"📅"},{id:"reach_hot_lead",priority:90,when:t>=70&&o&&!c,label:"Contactar ya",reason:"Lead caliente sin respuesta",icon:"🔥"},{id:"send_quote",priority:88,when:Vd(n)&&t>=55&&!c,label:"Enviar cotización",reason:"Interés de compra/financiación",icon:"🧾"},{id:"assign_asesor",priority:85,when:!n.ownerId&&!c,label:"Asignar asesor",reason:"Sin asesor asignado",icon:"🙋"},{id:"first_touch",priority:70,when:o&&s<2&&!c,label:"Primer contacto",reason:"Lead nuevo sin trabajar",icon:"👋"},{id:"whatsapp_followup",priority:60,when:t>=40&&t<70&&i>=2&&i<30&&!c,label:"Seguimiento WhatsApp",reason:"Lead tibio enfriándose",icon:"💬"},{id:"reactivate",priority:50,when:i>=30&&i!==1/0&&!c,label:"Reactivar con oferta",reason:"Inactivo +30 días",icon:"🎯"},{id:"nurture",priority:15,when:!c,label:"Nutrir relación",reason:"Sin acción urgente",icon:"🌱"},{id:"archived",priority:5,when:c,label:"Cerrado",reason:"Lead cerrado",icon:"✅"}],f=u.filter(p=>p.when).sort((p,g)=>g.priority-p.priority)[0]||u[u.length-1];return{id:f.id,label:f.label,reason:f.reason,icon:f.icon,priority:f.priority}}function dy(n,e=[]){const{score:t,rating:r,factors:s}=ly(n,e,null);return{...n,_score:t,_rating:r,_factors:s,_type:kc(n),_channel:qi(n),_sla:ay(n),_nba:uy(n,{score:t})}}function Fo(n){return n.map(e=>dy(e))}const ru=[{id:"calientes",label:"Calientes sin contestar",icon:"🔥"},{id:"mios",label:"Mis asignados",icon:"👤"},{id:"sin_asignar",label:"Sin asignar",icon:"🆕"},{id:"todo",label:"Todo",icon:"📥"}];function hy(n,e,t){switch(e){case"calientes":return cy(n)&&!Ps(n.status)&&(n._rating==="hot"||Vd(n));case"mios":return n.ownerId===t;case"sin_asignar":return!n.ownerId&&!Ps(n.status);case"todo":default:return!0}}function BC(n,e){const t={};for(const r of ru)t[r.id]=0;for(const r of n)for(const s of ru)hy(r,s.id,e)&&t[s.id]++;return t}const Uo={late:0,warn:1,ok:2};function $C(n,e){const t=n._sla&&n._sla.state||"ok",r=e._sla&&e._sla.state||"ok";return Uo[t]!==Uo[r]?Uo[t]-Uo[r]:e._score!==n._score?e._score-n._score:new Date(e.createdAt||0)-new Date(n.createdAt||0)}function qC(n,{type:e,channel:t,status:r}){return n.filter(s=>!(e&&s._type.type!==e||t&&s._channel.key!==t||r&&(s.status||"nuevo")!==r))}function jC(n,e){const t=Ba(e).trim();return t?n.filter(r=>Ba([r.fullName,r.email,r.phone,r.sourceDetail,r.source].join(" ")).includes(t)):n}function zC(n,e=Date.now()){if((n.status||"nuevo")!=="nuevo")return null;const t=new Date(n.createdAt||0).getTime();if(!t)return null;const r=Math.max(0,Math.floor((e-t)/6e4));return{mins:r,state:r>=60?"late":r>=45?"warn":"ok"}}function GC(n,{queue:e,uid:t,filters:r,search:s,showClosed:i=!1}){let o=n.filter(u=>hy(u,e,t));o=qC(o,r),o=jC(o,s);let c=0;if(!i&&!r.status){const u=o.filter(d=>!Ps(d.status)&&!d.archived);c=o.length-u.length,o=u}return o.sort($C),{rows:o,hiddenClosed:c}}const kr=()=>new Date().toISOString(),Od=n=>({id:n.id,...n.data()});function HC({pageSize:n=40,onData:e,onError:t}){let r=null;const s=Je(Te(te,"leads"),mt("createdAt","desc"),kt(n));return{unsubscribe:Ut(s,o=>{const c=o.docs.map(Od);r=o.docs[o.docs.length-1]||null,e(c,{hasMore:o.size>=n})},o=>{t&&t(o)}),getLastDoc:()=>r}}async function KC({pageSize:n=40,after:e}){if(!e)return{rows:[],lastDoc:null,hasMore:!1};const t=Je(Te(te,"leads"),mt("createdAt","desc"),PR(e),kt(n)),r=await Yt(t);return{rows:r.docs.map(Od),lastDoc:r.docs[r.docs.length-1]||null,hasMore:r.size>=n}}async function WC(){const e=(await Yt(Te(te,"usuarios"))).docs.map(t=>{const r=t.data();return{uid:t.id,nombre:r.nombre||r.email||"Usuario",cargo:r.cargo||r.roleName||""}}).sort((t,r)=>t.nombre.localeCompare(r.nombre,"es"));return j.set({team:e}),e}async function QC(n,e){await Xe(Ie(te,"leads",n),{ownerId:e?e.uid:null,ownerName:e?e.nombre:null,updatedAt:kr(),updatedBy:Cr(),_version:Xt(1)})}async function YC(n,e,t={},r={}){if(t&&t.convertedTo&&t.convertedTo.dealId)throw new Error("Este lead ya es un negocio: gestiónalo en el Pipeline.");const s=kr();await Xe(Ie(te,"leads",n),{...r,status:e,lastActivityAt:s,updatedAt:s,updatedBy:Cr(),_version:Xt(1)}),await Ft(Te(te,"activities"),{type:"status_change",subject:"Cambio de estado → "+e,body:"",status:"closed",direction:"outbound",relatedTo:{type:"lead",id:n,name:t.fullName||""},ownerId:Cr(),createdAt:s,_version:1})}async function Zp(n,{type:e="nota",subject:t="",body:r="",direction:s="outbound",name:i=""}){await Ft(Te(te,"activities"),{type:e,subject:t,body:r,status:"closed",direction:s,relatedTo:{type:"lead",id:n,name:i},ownerId:Cr(),createdAt:kr(),_version:1})}async function JC(n,{subject:e,dueAt:t,name:r=""}){await Ft(Te(te,"activities"),{type:"tarea",subject:e,body:"",status:"open",direction:"outbound",dueAt:t,relatedTo:{type:"lead",id:n,name:r},ownerId:Cr(),createdAt:kr(),_version:1})}async function XC(){const n=new Date;n.setHours(23,59,59,999);const e=Je(Te(te,"activities"),Bn("dueAt","<=",n.toISOString()),mt("dueAt","desc"),kt(80));return(await Yt(e)).docs.map(Od).filter(r=>r.status==="open"&&(r.type==="tarea"||r.type==="cita")).sort((r,s)=>String(r.dueAt).localeCompare(String(s.dueAt)))}async function ZC(n){await Xe(Ie(te,"activities",n),{status:"closed",closedAt:kr(),closedBy:Cr()})}async function eP(n,e=!0){await Xe(Ie(te,"leads",n),{archived:e,archivedAt:e?kr():null,updatedAt:kr(),updatedBy:Cr(),_version:Xt(1)})}async function tP(n){return(await Mr(Fr,"crmPurgeLead")({leadId:n})).data}function Cr(){const n=j.get().user;return n?n.uid:null}async function nP(n){const e=j.get().user?j.get().user.uid:null,t=["manual",n.trafico,n.campana].filter(Boolean);return(await Ft(Te(te,"solicitudes"),{nombre:n.nombre||"",email:(n.email||"").trim().toLowerCase(),telefono:n.telefono||"",prefijoPais:n.prefijoPais||"+57",origen:n.canal||"manual",tipo:n.interes||"consulta",vehiculoId:n.vehiculoId||null,kind:"lead",comentarios:n.notas||"",consentGiven:n.consentGiven===!0,tags:t,source:{page:"manual",campaign:n.campana||null,traffic:n.trafico||null},clientCategory:"manual",createdAt:new Date().toISOString(),_manual:!0,_createdByUid:e})).id}const dr=n=>new Date(Date.now()-n*6e4).toISOString(),De=n=>dr(n*60),oe=n=>dr(n*60*24),rP=[{uid:"u_ceo",nombre:"Rodrigo (CEO)",cargo:"CEO"},{uid:"u_ana",nombre:"Ana Restrepo",cargo:"Asesora comercial"},{uid:"u_luis",nombre:"Luis Pérez",cargo:"Asesor comercial"}],Ld=[{id:"l1",fullName:"María Fernanda Gómez",email:"mafe.gomez@gmail.com",phone:"+573012345678",source:"financiacion",sourceDetail:"financiacion",vehicleOfInterestId:"mazda-cx5-2021",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:dr(-40),contactId:"email_mafe_gomez_gmail_com",createdAt:dr(18),lastActivityAt:dr(18),_version:1},{id:"l2",fullName:"Carlos Andrés Salcedo",email:"casalcedo@outlook.com",phone:"+573159876543",source:"cita",sourceDetail:"test_drive",vehicleOfInterestId:"toyota-corolla-2022",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:dr(5),contactId:"email_casalcedo_outlook_com",createdAt:De(1),lastActivityAt:De(1),_version:1},{id:"l3",fullName:"Diana Ramírez",email:"diana.r@hotmail.com",phone:"+573201112233",source:"web",sourceDetail:"compra",vehicleOfInterestId:"chevrolet-tracker-2023",status:"contactado",rating:"cold",score:0,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:De(-1),contactId:"email_diana_r_hotmail_com",createdAt:De(5),lastActivityAt:De(2),_version:2},{id:"l4",fullName:"Jhon Jairo Mosquera",email:"",phone:"+573044455667",source:"whatsapp",sourceDetail:"consulta",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:De(-3),contactId:"phone_573044455667",createdAt:De(8),lastActivityAt:De(8),_version:1},{id:"l5",fullName:"Laura Valentina Ortiz",email:"lauraortiz@gmail.com",phone:"+573186677889",source:"bot",sourceDetail:"financiacion",vehicleOfInterestId:"kia-sportage-2022",status:"contactado",rating:"cold",score:0,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:oe(-1),contactId:"email_lauraortiz_gmail_com",createdAt:oe(1),lastActivityAt:De(20),_version:3},{id:"l6",fullName:"Pedro Nel Arango",email:"pnarango@empresa.co",phone:"+573017788990",source:"cuenta",sourceDetail:"registro",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:oe(-1),contactId:"email_pnarango_empresa_co",createdAt:oe(2),lastActivityAt:oe(2),_version:1},{id:"l7",fullName:"Sofía Mejía",email:"sofia.mejia@gmail.com",phone:"+573123344556",source:"newsletter",sourceDetail:"suscripcion",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:oe(-3),contactId:"email_sofia_mejia_gmail_com",createdAt:oe(4),lastActivityAt:oe(4),_version:1},{id:"l8",fullName:"Andrés Felipe Cuesta",email:"afcuesta@gmail.com",phone:"+573009988776",source:"web",sourceDetail:"consignacion_venta",vehicleOfInterestId:null,status:"calificado",rating:"cold",score:0,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:oe(-2),contactId:"email_afcuesta_gmail_com",createdAt:oe(6),lastActivityAt:oe(1),_version:4},{id:"l9",fullName:"Catalina Ríos",email:"cata.rios@gmail.com",phone:"+573145566778",source:"web",sourceDetail:"peritaje",vehicleOfInterestId:"nissan-frontier-2020",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:oe(-10),contactId:"email_cata_rios_gmail_com",createdAt:oe(12),lastActivityAt:oe(35),_version:1},{id:"l10",fullName:"Gloria Patiño",email:"glopa@gmail.com",phone:"+573162233445",source:"web",sourceDetail:"reclamo",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:De(-2),contactId:"email_glopa_gmail_com",createdAt:De(3),lastActivityAt:De(3),_version:1},{id:"l11",fullName:"Mauricio Bedoya",email:"mbedoya@gmail.com",phone:"+573024455661",source:"facebook",sourceDetail:"compra",vehicleOfInterestId:"mazda-cx5-2021",status:"convertido",rating:"hot",score:78,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:oe(9),contactId:"email_mbedoya_gmail_com",convertedTo:{dealId:"d6"},createdAt:oe(10),lastActivityAt:oe(3),_version:5},{id:"l12",fullName:"Yuliana Castaño",email:"yulycastano@gmail.com",phone:"+573135566779",source:"whatsapp",sourceDetail:"financiacion",vehicleOfInterestId:"toyota-hilux-2020",status:"convertido",rating:"hot",score:82,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:oe(14),contactId:"email_yulycastano_gmail_com",convertedTo:{dealId:"d7"},createdAt:oe(15),lastActivityAt:oe(5),_version:6},{id:"l13",fullName:"Hernán Darío Loaiza",email:"hdloaiza@gmail.com",phone:"+573017788123",source:"web",sourceDetail:"compra",vehicleOfInterestId:"renault-duster-2022",status:"perdido",rating:"warm",score:45,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:oe(19),contactId:"email_hdloaiza_gmail_com",createdAt:oe(20),lastActivityAt:oe(8),_version:3},{id:"l14",fullName:"Paola Andrea Suárez",email:"pasuarez@gmail.com",phone:"+573156677001",source:"newsletter",sourceDetail:"suscripcion",vehicleOfInterestId:null,status:"no_calificado",rating:"cold",score:12,ownerId:null,ownerName:null,slaDueAt:oe(24),contactId:"email_pasuarez_gmail_com",createdAt:oe(25),lastActivityAt:oe(25),_version:2},{id:"l15",fullName:"Julián Marín",email:"julianmarin@gmail.com",phone:"+573008811223",source:"referido",sourceDetail:"compra",vehicleOfInterestId:"nissan-frontier-2020",status:"convertido",rating:"hot",score:74,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:oe(21),contactId:"email_julianmarin_gmail_com",convertedTo:{dealId:"d8"},createdAt:oe(22),lastActivityAt:oe(9),_version:4}],sP={l1:[{id:"a1",type:"solicitud_inbound",subject:"Nueva solicitud: financiacion",body:"Quiero financiar la Mazda CX-5. Cuota inicial 25.000.000, ingresos 6.000.000 mensuales.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l1",name:"María Fernanda Gómez"},createdAt:dr(18),_version:1}],l3:[{id:"a2",type:"solicitud_inbound",subject:"Nueva solicitud: compra",body:"Interesada en la Chevrolet Tracker.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:De(5),_version:1},{id:"a3",type:"whatsapp",subject:"WhatsApp enviado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:De(2),_version:1},{id:"a4",type:"status_change",subject:"Cambio de estado → contactado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:De(2),_version:1}],l5:[{id:"a5",type:"solicitud_inbound",subject:"Nueva lead: financiacion",body:"Bot ALTOR: pregunta por financiación de la Kia Sportage.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},createdAt:oe(1),_version:1},{id:"a6",type:"whatsapp",subject:"WhatsApp enviado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},createdAt:De(20),_version:1}]},ji={};Ld.forEach(n=>{const e=n.status==="convertido"?"customer":n.source==="newsletter"?"subscriber":"lead";ji[n.contactId]={id:n.contactId,fullName:n.fullName,email:n.email,phone:n.phone,type:e==="customer"?"cliente":"lead",source:n.source,score:0,rating:"cold",lifecycleStage:e,clienteUid:null,consent:{email:n.source!=="web",whatsapp:n.source!=="web",calls:!1,askedAt:n.createdAt,source:n.source,policyVersion:"v1"},doNotContact:n.source==="web",tags:[],createdAt:n.createdAt,lastActivityAt:n.lastActivityAt,_version:1}});ji.email_camila_lectora_gmail_com={id:"email_camila_lectora_gmail_com",fullName:"Camila Lectora",email:"camila.lectora@gmail.com",phone:"",type:"lead",source:"newsletter",score:0,rating:"cold",lifecycleStage:"subscriber",clienteUid:null,consent:{email:!0,whatsapp:!1,calls:!1,askedAt:oe(3),source:"newsletter",policyVersion:"v1"},doNotContact:!1,tags:["newsletter"],createdAt:oe(3),lastActivityAt:oe(3),_version:1};const oa={},$a=()=>Ld.map(n=>({...n})),su=()=>rP.map(n=>({...n})),iP=n=>(sP[n]||[]).map(e=>({...e})),oP=n=>ji[n]?{...ji[n]}:null,aP=()=>Object.values(ji).map(n=>({...n})),em=n=>(oa[n]||[]).map(e=>({...e}));function cP(n,e){oa[n]||(oa[n]=[]),oa[n].unshift({id:"n"+Date.now(),...e})}let lP=100;const vi=[{id:"d1",name:"Diana Ramírez · Chevrolet Tracker 2023",contactName:"Diana Ramírez",contactId:"email_diana_r_hotmail_com",leadId:"l3",vehicleId:"chevrolet-tracker-2023",vehicleName:"Chevrolet Tracker 2023",pipelineId:"ventas",stageId:"cuadrando_cita",stageName:"Cuadrando cita",status:"open",amount:82e6,currency:"COP",probability:.2,weightedAmount:164e5,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"web",lastActivityAt:De(2),createdAt:De(5),_version:2},{id:"d2",name:"Laura Valentina Ortiz · Kia Sportage 2022",contactName:"Laura Valentina Ortiz",contactId:"email_lauraortiz_gmail_com",leadId:"l5",vehicleId:"kia-sportage-2022",vehicleName:"Kia Sportage 2022",pipelineId:"ventas",stageId:"cita_fijada",stageName:"Cita fijada",status:"open",amount:95e6,currency:"COP",probability:.35,weightedAmount:3325e4,ownerId:"u_luis",ownerName:"Luis Pérez",source:"bot",lastActivityAt:De(20),createdAt:oe(1),_version:3},{id:"d3",name:"Andrés Felipe Cuesta · Mazda 3 2021",contactName:"Andrés Felipe Cuesta",contactId:"email_afcuesta_gmail_com",leadId:"l8",vehicleId:"mazda-3-2021",vehicleName:"Mazda 3 2021",pipelineId:"ventas",stageId:"visita_test_drive",stageName:"Visita / Test drive",status:"open",amount:68e6,currency:"COP",probability:.5,weightedAmount:34e6,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"web",lastActivityAt:oe(18),createdAt:oe(20),_version:5},{id:"d4",name:"Roberto Gómez · Toyota Hilux 2020",contactName:"Roberto Gómez",contactId:"phone_573001239876",leadId:null,vehicleId:"toyota-hilux-2020",vehicleName:"Toyota Hilux 2020",pipelineId:"ventas",stageId:"negociacion",stageName:"Negociación",status:"open",amount:135e6,currency:"COP",probability:.7,weightedAmount:945e5,ownerId:"u_luis",ownerName:"Luis Pérez",source:"whatsapp",lastActivityAt:De(6),createdAt:oe(8),_version:7},{id:"d5",name:"Sandra Milena Vélez · Renault Duster 2022",contactName:"Sandra Milena Vélez",contactId:"email_smvelez_gmail_com",leadId:null,vehicleId:"renault-duster-2022",vehicleName:"Renault Duster 2022",pipelineId:"ventas",stageId:"cuadrando_cita",stageName:"Cuadrando cita",status:"open",amount:0,currency:"COP",probability:.2,weightedAmount:0,ownerId:null,ownerName:null,source:"cuenta",lastActivityAt:De(1),createdAt:De(1),_version:1},{id:"d9",name:"Patricia Lemus · Toyota Hilux 2020",contactName:"Patricia Lemus",contactId:"phone_573009871234",leadId:null,vehicleId:"toyota-hilux-2020",vehicleName:"Toyota Hilux 2020",pipelineId:"ventas",stageId:"cita_fijada",stageName:"Cita fijada",status:"open",amount:132e6,currency:"COP",probability:.35,weightedAmount:462e5,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"walkin",lastActivityAt:De(3),createdAt:oe(2),_version:2},{id:"d6",name:"Mauricio Bedoya · Mazda CX-5 2021",contactName:"Mauricio Bedoya",contactId:"email_mbedoya_gmail_com",leadId:"l11",vehicleId:"mazda-cx5-2021",vehicleName:"Mazda CX-5 2021",pipelineId:"ventas",stageId:"vendido",stageName:"Vendido",status:"won",amount:78e6,currency:"COP",probability:1,weightedAmount:78e6,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"facebook",lastActivityAt:oe(3),createdAt:oe(10),_version:6,tipoPago:"financiado",wonAt:oe(3),postventa:{entrega:!0,traspaso_runt:!1,tramites:!1},commissionSnapshot:{amount:78e6,tipoPago:"financiado",ownerId:"u_ana",wonAt:oe(3)},recibeVehiculo:{marca:"chevrolet",modelo:"Spark GT",placa:"XYZ789",valorEstimado:28e6}},{id:"d7",name:"Yuliana Castaño · Toyota Hilux 2020",contactName:"Yuliana Castaño",contactId:"email_yulycastano_gmail_com",leadId:"l12",vehicleId:"toyota-hilux-2020",vehicleName:"Toyota Hilux 2020",pipelineId:"ventas",stageId:"vendido",stageName:"Vendido",status:"won",amount:112e6,currency:"COP",probability:1,weightedAmount:112e6,ownerId:"u_luis",ownerName:"Luis Pérez",source:"whatsapp",lastActivityAt:oe(5),createdAt:oe(15),_version:7,tipoPago:"contado",wonAt:oe(5),postventa:{entrega:!0,traspaso_runt:!0,tramites:!0},commissionSnapshot:{amount:112e6,tipoPago:"contado",ownerId:"u_luis",wonAt:oe(5)}},{id:"d8",name:"Julián Marín · Nissan Frontier 2020",contactName:"Julián Marín",contactId:"email_julianmarin_gmail_com",leadId:"l15",vehicleId:"nissan-frontier-2020",vehicleName:"Nissan Frontier 2020",pipelineId:"ventas",stageId:"perdido",stageName:"Perdido",status:"lost",amount:64e6,currency:"COP",probability:0,weightedAmount:0,lostReason:"Compró en otro lado",ownerId:"u_luis",ownerName:"Luis Pérez",source:"referido",lastActivityAt:oe(9),createdAt:oe(22),_version:4}],iu=()=>vi.map(n=>({...n}));function uP(n){const e="d"+ ++lP;return vi.unshift({id:e,...n}),e}function dP(n,e){const t=vi.findIndex(r=>r.id===n);t>=0&&(vi[t]={...vi[t],...e})}const Xn=(n,e=10,t=0)=>{const r=new Date;return r.setDate(r.getDate()+n),r.setHours(e,t,0,0),r.toISOString()},ou=[{id:"ag1",type:"cita",subject:"Test drive Toyota Corolla",dueAt:Xn(1,10),relatedTo:{type:"lead",id:"l2",name:"Carlos Andrés Salcedo"},status:"open"},{id:"ag2",type:"cita",subject:"Visita showroom",dueAt:Xn(1,12),relatedTo:{type:"lead",id:"l1",name:"María Fernanda Gómez"},status:"open"},{id:"ag3",type:"cita",subject:"Cierre financiación",dueAt:Xn(1,15),relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},status:"open"},{id:"ag4",type:"cita",subject:"Llamada de seguimiento",dueAt:Xn(1,17),relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},status:"open"},{id:"ag5",type:"cita",subject:"Entrega de vehículo",dueAt:Xn(3,9),relatedTo:{type:"lead",id:"l8",name:"Andrés Felipe Cuesta"},status:"open"},{id:"ag6",type:"cita",subject:"Peritaje",dueAt:Xn(5,11),relatedTo:{type:"lead",id:"l9",name:"Catalina Ríos"},status:"open"},{id:"ag7",type:"cita",subject:"Negociación precio",dueAt:Xn(-2,16),relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},status:"open"}],hP=()=>ou.map(n=>({...n}));function fP(n){ou.push({id:"ag"+(ou.length+1),...n})}let pP=100;function fy(n){const e="lm"+ ++pP,t=new Date().toISOString(),r=(n.telefono||"").replace(/\D/g,""),s=(n.prefijoPais||"+57").replace(/\D/g,""),i=r?"+"+(r.startsWith(s)?r:s+r):"",o=(n.email||"").trim().toLowerCase(),c={id:e,fullName:n.nombre||"Sin nombre",email:o,phone:i,source:n.canal||"manual",sourceDetail:n.interes||"consulta",vehicleOfInterestId:n.vehiculoId||null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:null,contactId:o?"email_"+o.replace(/[^a-z0-9]/gi,"_"):"phone_"+r,tags:["manual",n.trafico,n.campana].filter(Boolean),createdAt:t,lastActivityAt:t,_version:1};return Ld.unshift(c),e}function mP(){const n={},e=(p,g,v)=>l("label",{class:"field"},[l("span",{class:"field__label",text:p}),g,null]);n.nombre=l("input",{class:"input",type:"text",placeholder:"Nombre del cliente",autocomplete:"off"}),n.prefijo=l("input",{class:"input",type:"text",value:"+57",style:{width:"72px"}}),n.telefono=l("input",{class:"input",type:"tel",placeholder:"300 123 4567",autocomplete:"off"}),n.email=l("input",{class:"input",type:"email",placeholder:"correo@ejemplo.com (opcional)",autocomplete:"off"}),n.canal=l("select",{class:"select"},PC.map(p=>l("option",{value:p.id},[`${p.icon} ${p.label}`]))),n.interes=l("select",{class:"select"},xC.map(p=>l("option",{value:p.id},[p.label]))),n.trafico=l("select",{class:"select"},[l("option",{value:""},["— Tráfico —"]),l("option",{value:"organico"},["Orgánico"]),l("option",{value:"pauta"},["Pauta (pago)"])]),n.campana=l("input",{class:"input",type:"text",placeholder:"Campaña (opcional)",autocomplete:"off"}),n.vehiculo=l("input",{class:"input",type:"text",placeholder:"Vehículo de interés (opcional)",autocomplete:"off"}),n.notas=l("textarea",{class:"textarea",placeholder:"Notas / contexto del lead",rows:"2"}),n.consent=l("input",{type:"checkbox",checked:!0});const t=l("div",{class:"login__error",role:"alert",hidden:!0}),r=l("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),s=l("button",{class:"btn btn--gold",type:"submit"},["Agregar lead"]),i=l("form",{class:"nl-form"},[e("Nombre *",n.nombre),l("div",{class:"nl-row"},[l("label",{class:"field",style:{flex:"0 0 auto"}},[l("span",{class:"field__label",text:"Prefijo"}),n.prefijo]),l("label",{class:"field u-grow"},[l("span",{class:"field__label",text:"Teléfono"}),n.telefono])]),e("Correo",n.email),l("div",{class:"nl-row"},[e("Canal *",n.canal),e("Interés",n.interes)]),l("div",{class:"nl-row"},[e("Tráfico",n.trafico),e("Campaña",n.campana)]),e("Vehículo de interés",n.vehiculo),e("Notas",n.notas),l("label",{class:"nl-consent"},[n.consent,l("span",{class:"u-caption",text:"El cliente autorizó el tratamiento de sus datos (Ley 1581 · Habeas Data)."})]),t,l("div",{class:"nl-actions"},[r,s])]),o=l("div",{class:"modal"},[l("div",{class:"modal__head"},[l("h2",{class:"modal__title",text:"＋ Nuevo lead"}),l("span",{class:"u-caption u-faint",text:"Captura manual (Meta, WhatsApp, TikTok, llamada, referido…)"})]),i]),c=l("div",{class:"modal-overlay"},[o]);document.body.appendChild(c),setTimeout(()=>n.nombre.focus(),30);const u=()=>{c.remove(),window.removeEventListener("keydown",d)},d=p=>{p.key==="Escape"&&u()};window.addEventListener("keydown",d),c.addEventListener("mousedown",p=>{p.target===c&&u()}),r.addEventListener("click",u),i.addEventListener("submit",async p=>{p.preventDefault(),t.hidden=!0;const g={nombre:n.nombre.value.trim(),email:n.email.value.trim(),telefono:n.telefono.value.trim(),prefijoPais:n.prefijo.value.trim()||"+57",canal:n.canal.value,interes:n.interes.value,vehiculoId:n.vehiculo.value.trim()||null,trafico:n.trafico.value||null,campana:n.campana.value.trim()||null,consentGiven:n.consent.checked,notas:n.notas.value.trim()};if(!g.nombre)return f("Escribe el nombre del cliente.");if(!g.email&&!g.telefono)return f("Necesitas al menos un correo o un teléfono (para no duplicar el contacto).");s.disabled=!0,s.textContent="Guardando…";try{j.get().mock?(fy(g),window.dispatchEvent(new CustomEvent("altorra:leads-dirty"))):await nP(g),q("✓ Lead agregado a la Bandeja","ok"),u()}catch{s.disabled=!1,s.textContent="Agregar lead",f("No se pudo agregar. Intenta de nuevo.")}});function f(p){return t.textContent=p,t.hidden=!1,!1}}const au="altorra_friction_v1",gP=300;function qa(n,e,t={}){try{const r=Math.max(0,Math.round(performance.now()-e)),s=JSON.parse(localStorage.getItem(au)||"[]");for(s.push({task:n,ms:r,at:new Date().toISOString(),...t});s.length>gP;)s.shift();localStorage.setItem(au,JSON.stringify(s))}catch{}}function _P(){try{const n=JSON.parse(localStorage.getItem(au)||"[]"),e={};for(const r of n)(e[r.task]=e[r.task]||[]).push(r.ms);const t={};for(const[r,s]of Object.entries(e)){const i=[...s].sort((o,c)=>o-c);t[r]={n:s.length,mediana_s:+(i[Math.floor(i.length/2)]/1e3).toFixed(1),p90_s:+(i[Math.floor(i.length*.9)]/1e3).toFixed(1)}}return t}catch{return{}}}typeof window<"u"&&(window.__friccion=_P);const vP=[{id:"whatsapp",label:"WhatsApp",icon:"💬"},{id:"walkin",label:"Walk-in",icon:"🚶"},{id:"llamada",label:"Llamada",icon:"📞"},{id:"referido",label:"Referido",icon:"🤝"}],yP="“¿Me autorizas guardar tu nombre y teléfono para contactarte sobre vehículos? (Ley 1581)”";function bP(){const n=performance.now(),e={fuente:"whatsapp",medio:"organico"},t=j.get().user||{},r=l("input",{class:"input",type:"text",placeholder:"Nombre",autocomplete:"off"}),s=l("input",{class:"input",type:"tel",placeholder:"300 123 4567",autocomplete:"off",inputmode:"tel"}),i=l("input",{class:"input",type:"text",placeholder:'Nota corta (opcional): "busca SUV blanca"',autocomplete:"off"}),o=l("input",{type:"checkbox"}),c=l("div",{class:"u-row",style:{flexWrap:"wrap",gap:"6px"}});function u(){c.replaceChildren(...vP.map(x=>{const F=l("button",{class:"chip"+(e.fuente===x.id?" chip--active":""),type:"button"},[`${x.icon} ${x.label}`]);return F.addEventListener("click",()=>{e.fuente=x.id,u()}),F}))}u();const d=l("button",{class:"chip",type:"button"},["Orgánico"]);d.addEventListener("click",()=>{e.medio=e.medio==="organico"?"pauta":"organico",d.textContent=e.medio==="organico"?"Orgánico":"Pauta (pago)"});const f=l("div",{class:"login__error",role:"alert",hidden:!0}),p=l("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),g=l("button",{class:"btn btn--gold",type:"submit"},["⚡ Registrar"]),v=l("form",{class:"nl-form"},[l("label",{class:"field"},[l("span",{class:"field__label",text:"Nombre *"}),r]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Teléfono / WhatsApp *"}),s]),l("div",{class:"u-row",style:{gap:"8px",alignItems:"center"}},[c,d]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Nota"}),i]),l("label",{class:"nl-consent"},[o,l("span",{class:"u-caption"},["Leí el guion y el cliente AUTORIZÓ de palabra: ",l("em",{text:yP})])]),f,l("div",{class:"nl-actions"},[p,g])]),I=l("div",{class:"modal"},[l("div",{class:"modal__head"},[l("h2",{class:"modal__title",text:"⚡ Lead rápido"}),l("span",{class:"u-caption u-faint",text:navigator.onLine?"El WhatsApp entrante o el cliente del patio, registrado en 30 segundos.":"📴 Sin señal: se guardará y sincronizará solo al volver la conexión."})]),v]),S=l("div",{class:"modal-overlay"},[I]);document.body.appendChild(S),setTimeout(()=>r.focus(),30);const A=()=>{S.remove(),window.removeEventListener("keydown",O)},O=x=>{x.key==="Escape"&&A()};window.addEventListener("keydown",O),S.addEventListener("mousedown",x=>{x.target===S&&A()}),p.addEventListener("click",A),v.addEventListener("submit",x=>{x.preventDefault(),f.hidden=!0;const F={nombre:r.value.trim(),telefono:s.value.trim(),fuente:e.fuente,medio:e.medio,nota:i.value.trim(),consentVerbal:o.checked,ownerId:t.uid||null,ownerName:t.nombre||t.email||null,createdAt:new Date().toISOString()};if(!F.nombre)return k("Escribe el nombre.");if(!F.telefono||F.telefono.replace(/\D/g,"").length<7)return k("Escribe un teléfono válido.");if(!F.ownerId&&!j.get().mock)return k("Sesión sin usuario — recarga el portal.");if(j.get().mock){fy({nombre:F.nombre,telefono:F.telefono,canal:F.fuente,trafico:F.medio,consentGiven:F.consentVerbal,notas:F.nota}),window.dispatchEvent(new CustomEvent("altorra:leads-dirty")),q("⚡ Lead registrado (mock)","ok"),A();return}Ft(Te(te,"lead_intake"),F).catch(P=>{console.error("[quick-lead] rechazo del servidor:",P),q('El lead "'+F.nombre+'" fue RECHAZADO al sincronizar: '+(P.code||P.message),"error")}),q(navigator.onLine?"⚡ Lead registrado — aparecerá en la Bandeja en segundos":"📴 Guardado local — se enviará al volver la señal","ok"),qa("lead_rapido",n,{fuente:e.fuente,online:navigator.onLine}),A()});function k(x){return f.textContent=x,f.hidden=!1,!1}}const wP="ventas",ao=[{id:"cuadrando_cita",label:"Cuadrando cita",prob:.2},{id:"cita_fijada",label:"Cita fijada",prob:.35},{id:"visita_test_drive",label:"Visita / Test drive",prob:.5},{id:"negociacion",label:"Negociación",prob:.7},{id:"apartado",label:"Apartado",prob:.9},{id:"vendido",label:"Vendido",prob:1,won:!0}],aa={id:"perdido",label:"Perdido",prob:0,lost:!0},Bo={_exit_visita_test_drive:["huboTestDrive"],apartado:["montoApartado","venceEl"],vendido:["tipoPago"],perdido:["lostReason"]},ri=ao.map(n=>n.id);function tm(n,e){if(n===e)return{ok:!0,needsReason:!1,gates:[]};const t=i=>i===aa.id||ri.includes(i);if(!t(n)||!t(e))return{ok:!1,error:"etapa_desconocida"};if(n==="vendido")return{ok:!1,error:"vendido_es_terminal"};if(e===aa.id)return{ok:!0,needsReason:!1,gates:Bo.perdido.slice()};if(n===aa.id)return{ok:!0,needsReason:!0,gates:[]};const r=ri.indexOf(n),s=ri.indexOf(e);if(s>r){const i=[];for(let o=r;o<s;o++){ri[o]==="visita_test_drive"&&i.push(...Bo._exit_visita_test_drive);const c=ri[o+1];Bo[c]&&i.push(...Bo[c])}return{ok:!0,needsReason:!1,gates:[...new Set(i)]}}return{ok:!0,needsReason:!0,gates:[],recalcVehicle:n==="apartado"}}const nm=[{id:"precio",label:"Precio"},{id:"financiacion_negada",label:"Financiación negada"},{id:"compro_en_otro_lado",label:"Compró en otro lado"},{id:"no_responde",label:"No responde"},{id:"cambio_de_opinion",label:"Cambió de opinión"},{id:"error_de_registro",label:"Error de registro"},{id:"otro",label:"Otro motivo"}],yi=ao.filter(n=>!n.won),py=[...ao,aa].reduce((n,e)=>(n[e.id]=e,n),{});function es(n){return py[n]||ao[0]}function bi(n){const e=py[n];return e?e.prob:0}function Md(n){return Math.round((Number(n.amount)||0)*bi(n.stageId))}function my(n){return n.reduce((e,t)=>e+(t.status==="open"?Md(t):0),0)}function IP(n){return n.reduce((e,t)=>e+(t.status==="open"&&Number(t.amount)||0),0)}function EP(n,e=14){return n.status==="open"&&Cs(n.lastActivityAt)>e}function TP(n){const e={};for(const t of yi)e[t.id]=[];for(const t of n)t.status==="open"&&(e[t.stageId]||(e[t.stageId]=[])).push(t);return e}const gy=[{id:"entrega",label:"Entrega del vehículo",dueDays:3},{id:"traspaso_runt",label:"Traspaso / RUNT",dueDays:15},{id:"tramites",label:"Trámites (SOAT, impuestos, GPS)",dueDays:15}];function AP(n){const e={};for(const r of n||[])!r||r.status!=="open"||!r.vehicleId||(e[r.vehicleId]=e[r.vehicleId]||[]).push(r.id||null);const t=[];for(const r of Object.keys(e))e[r].length>1&&t.push({vehicleId:r,dealIds:e[r]});return t}function _y(n){if(!n||n.status!=="won")return!1;const e=n.postventa||{};return gy.every(t=>e[t.id]===!0)}function vy(n,e={}){const t=e.vehicleId!==void 0?e.vehicleId||"":n.vehicleOfInterestId||"",r=ao[0];return{name:(n.fullName||"Oportunidad")+(t?" · "+(e.vehicleName||t):""),contactId:n.contactId||null,contactName:n.fullName||"",leadId:n.id||null,vehicleId:t||null,vehicleName:e.vehicleName||t||"",sinVehiculoAun:!t,pipelineId:wP,stageId:r.id,stageName:r.label,status:"open",amount:Number(e.amount)||0,currency:"COP",probability:r.prob,weightedAmount:Math.round((Number(e.amount)||0)*r.prob),expectedCloseDate:null,ownerId:e.ownerId!==void 0?e.ownerId:n.ownerId||null,ownerName:e.ownerName!==void 0?e.ownerName:n.ownerName||null,source:n.source||"web",nextStep:e.nota||""}}const zn=()=>new Date().toISOString(),yy=n=>({id:n.id,...n.data()}),Vt=()=>j.get().user?j.get().user.uid:null;function RP(n,e,t){return Ft(Te(te,"activities"),{type:"deal",subject:t,body:"",status:"closed",direction:"outbound",relatedTo:{type:"deal",id:n,name:e||""},ownerId:Vt(),createdAt:zn(),_version:1})}function SP({pageSize:n=100,onData:e,onError:t}){const r=Je(Te(te,"deals"),Bn("status","==","open"),mt("lastActivityAt","desc"),kt(n));return Ut(r,s=>e(s.docs.map(yy)),s=>t&&t(s))}async function kP(n,e={}){const t=zn(),r=vy(n,e),s=await Ft(Te(te,"deals"),{...r,lastActivityAt:t,createdAt:t,updatedAt:t,createdBy:Vt(),updatedBy:Vt(),_version:1});return await Xe(Ie(te,"leads",n.id),{status:"convertido",convertedTo:{dealId:s.id,prevStatus:n.status||"contactado"},lastActivityAt:t,updatedAt:t,updatedBy:Vt(),_version:Xt(1)}),await RP(s.id,r.contactName,"Oportunidad creada desde lead"),s.id}async function CP(n){return(await Mr(Fr,"anularConversion")({dealId:n})).data}async function by(){return(await Yt(Je(Te(te,"vehiculos"),Bn("estado","in",["disponible","apartado"]),kt(60)))).docs.map(e=>{const t=e.data(),r=t.estado==="apartado";return{id:e.id,label:[t.marca,t.modelo,t.year].filter(Boolean).join(" ")+(r?" · ⚠ apartado":""),precio:Number(t.precioOferta||t.precio)||0,apartado:r}}).sort((e,t)=>e.label.localeCompare(t.label,"es"))}async function rm(n,e,t={},r={}){const s=zn(),i=es(e),o={...r,stageId:e,stageName:i.label,probability:i.prob,weightedAmount:Math.round((Number(t.amount)||0)*i.prob),lastActivityAt:s,updatedAt:s,updatedBy:Vt(),_version:Xt(1)};t.status==="lost"&&e!=="perdido"&&(o.status="open"),await Xe(Ie(te,"deals",n),o)}async function PP(n,e,t={}){const r=zn(),s=Math.max(0,Math.round(Number(e)||0));await Xe(Ie(te,"deals",n),{amount:s,weightedAmount:Math.round(s*bi(t.stageId)),updatedAt:r,updatedBy:Vt(),_version:Xt(1)})}async function xP(n,e={},t={}){const r=zn();await Xe(Ie(te,"deals",n),{...t,status:"won",stageId:"vendido",stageName:"Vendido",probability:1,weightedAmount:Number(e.amount)||0,lastActivityAt:r,updatedAt:r,updatedBy:Vt(),_version:Xt(1)})}async function NP(n,e,t={}){const r=zn();await Xe(Ie(te,"deals",n),{status:"lost",stageId:"perdido",stageName:"Perdido",probability:0,weightedAmount:0,lostReason:String(e||"otro"),lastActivityAt:r,updatedAt:r,updatedBy:Vt(),_version:Xt(1)})}function DP({pageSize:n=100,onData:e,onError:t}){const r=Je(Te(te,"deals"),Bn("status","==","won"),mt("lastActivityAt","desc"),kt(n));return Ut(r,s=>e(s.docs.map(yy)),s=>t&&t(s))}async function VP(n,e,t){const r=zn();await Xe(Ie(te,"deals",n),{["postventa."+e]:t===!0,lastActivityAt:r,updatedAt:r,updatedBy:Vt(),_version:Xt(1)});try{await Xe(Ie(te,"activities","postventa_"+n+"_"+e),t?{status:"closed",closedAt:r,closedBy:Vt()}:{status:"open",closedAt:null,closedBy:null})}catch{}}async function OP(n,e){const t=zn();await Xe(Ie(te,"deals",n),{recibeVehiculo:{marca:String(e.marca||"").trim(),modelo:String(e.modelo||"").trim(),year:Number(e.year)||null,placa:String(e.placa||"").trim().toUpperCase(),valorEstimado:Number(e.valorEstimado)||0},lastActivityAt:t,updatedAt:t,updatedBy:Vt(),_version:Xt(1)})}async function LP(n){return(await Mr(Fr,"crmCrearBorradorRetoma")({dealId:n})).data}const pl="__sin_vehiculo__";function wy(n,{onDone:e}={}){const t=performance.now(),r=j.get().team||[],s=l("select",{class:"select"},[l("option",{value:""},["Cargando inventario…"])]),i=l("input",{class:"input",type:"number",min:"0",step:"100000",placeholder:"Valor estimado (COP) *"}),o=l("select",{class:"select"},r.length?r.map(k=>l("option",{value:k.uid,selected:k.uid===n.ownerId?"":void 0},[k.nombre])):[l("option",{value:n.ownerId||""},[n.ownerName||"Yo"])]),c=l("input",{class:"input",type:"text",placeholder:"Nota de contexto (opcional)"}),u=l("div",{class:"login__error",role:"alert",hidden:!0}),d=l("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),f=l("button",{class:"btn btn--gold",type:"submit"},["🎯 Crear negocio"]),p=l("form",{class:"nl-form"},[l("p",{class:"u-caption u-muted",style:{margin:"0"}},["✓ Hablaste con él · ✓ tiene presupuesto o forma de pago en mente · ✓ busca un carro concreto o una categoría"]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Vehículo *"}),s]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Valor estimado (COP) *"}),i]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Asesor responsable *"}),o]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Nota"}),c]),u,l("div",{class:"nl-actions"},[d,f])]),g=l("div",{class:"modal"},[l("div",{class:"modal__head"},[l("h2",{class:"modal__title",text:"Calificar → crear negocio"}),l("span",{class:"u-caption u-faint",text:(n.fullName||"Cliente")+" pasa al Pipeline; el lead queda congelado como histórico."})]),p]),v=l("div",{class:"modal-overlay"},[g]);document.body.appendChild(v);const I=()=>{v.remove(),window.removeEventListener("keydown",S)},S=k=>{k.key==="Escape"&&I()};window.addEventListener("keydown",S),v.addEventListener("mousedown",k=>{k.target===v&&I()}),d.addEventListener("click",I);let A=[];(j.get().mock?Promise.resolve([]):by()).then(k=>{A=k,s.replaceChildren(l("option",{value:""},["— Elige un vehículo —"]),...k.map(x=>l("option",{value:x.id},[x.label+(x.precio?" · $"+x.precio.toLocaleString("es-CO"):"")])),l("option",{value:pl},["Sin vehículo aún (buscando / retoma)"]))}).catch(()=>{s.replaceChildren(l("option",{value:pl},["Sin vehículo aún"]))}),s.addEventListener("change",()=>{const k=A.find(x=>x.id===s.value);k&&k.precio&&!i.value&&(i.value=String(k.precio))}),p.addEventListener("submit",async k=>{k.preventDefault(),u.hidden=!0;const x=s.value,F=Math.round(Number(i.value)||0);if(!x)return O('Elige un vehículo o marca "Sin vehículo aún".');if(!(F>0))return O("El valor estimado es obligatorio (alimenta el pronóstico).");const P=o.value||n.ownerId;if(!P)return O("El negocio necesita un asesor responsable.");const M=r.find(b=>b.uid===P)?.nombre||n.ownerName||null,T=A.find(b=>b.id===x),y={vehicleId:x===pl?null:x,vehicleName:T?T.label:"",amount:F,ownerId:P,ownerName:M,nota:c.value.trim()};f.disabled=!0,f.textContent="Creando…";try{if(j.get().mock){uP(vy(n,y)),q("🎯 Negocio creado (mock)","ok"),qa("conversion",t,{mock:!0}),I(),e&&e({mock:!0});return}const b=await kP(n,y);qa("conversion",t,{}),I(),MP(b,n),e&&e({dealId:b})}catch(b){f.disabled=!1,f.textContent="🎯 Crear negocio",O(b&&b.code==="permission-denied"?"Recarga el portal: tu versión está desactualizada.":"No se pudo crear el negocio. Intenta de nuevo.")}});function O(k){return u.textContent=k,u.hidden=!1,!1}}function MP(n,e){const t=l("button",{class:"btn btn--soft btn--sm",type:"button"},["Deshacer"]),r=l("div",{role:"status",style:{position:"fixed",bottom:"18px",left:"50%",transform:"translateX(-50%)",display:"flex",gap:"12px",alignItems:"center",zIndex:"99",padding:"10px 14px",borderRadius:"10px",background:"var(--bg-elev, #1c1a17)",border:"1px solid var(--line, #444)",boxShadow:"0 6px 24px rgba(0,0,0,.4)"}},[l("span",{text:`🎯 Negocio creado para ${(e.fullName||"el cliente").split(/\s+/)[0]}`}),t]);document.body.appendChild(r);const s=setTimeout(()=>r.remove(),1e4);t.addEventListener("click",async()=>{clearTimeout(s),t.disabled=!0,t.textContent="Anulando…";try{await CP(n),q("↩ Conversión anulada — el lead volvió a la Bandeja","ok")}catch(i){q("No se pudo anular: "+(i&&i.message||""),"error")}r.remove()})}const wn={wa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.477-.91zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>',person:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',flag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',expand:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',convert:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 12h6M13 9l3 3-3 3"/></svg>',call:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',more:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>'};function FP(){const n=(t,r)=>{const s=new Date;return s.setDate(s.getDate()+t),s.setHours(r,0,0,0),s.toISOString()},e=new Date(Date.now()+72e5).toISOString();return[{value:{subject:"Llamar al cliente",dueAt:n(1,9)},label:"Llamar mañana 9 am",icon:"📞"},{value:{subject:"Escribir por WhatsApp",dueAt:e},label:"WhatsApp en 2 horas",icon:"💬"},{value:{subject:"Hacer seguimiento",dueAt:n(3,9)},label:"Seguimiento en 3 días",icon:"🔁"},{value:"abrir360",label:"Agendar cita (abrir 360)",icon:"📅"},{value:null,label:"Sin próximo paso",icon:"⊘"}]}function Iy(n){const e={queue:"todo",filters:{type:"",channel:"",status:""},search:"",showClosed:!1,leads:[],loading:!0,error:null,hasMore:!1,cursor:null,sub:null},t=je("crm.edit"),r=j.get().user&&j.get().user.uid,s=l("div",{class:"inbox__queues",role:"tablist","aria-label":"Colas"}),i=l("label",{class:"search","aria-label":"Buscar"},[l("span",{html:wn.search,"aria-hidden":"true"}),l("input",{type:"search",placeholder:"Buscar nombre, correo, teléfono…",autocomplete:"off"})]),o=l("div",{class:"inbox__filters"}),c=t?l("button",{class:"btn btn--gold btn--sm",type:"button",style:{marginLeft:"auto"}},["⚡ Lead rápido"]):null;c&&c.addEventListener("click",()=>bP());const u=t?l("button",{class:"btn btn--soft btn--sm",type:"button"},["＋ Completo"]):null;u&&u.addEventListener("click",()=>mP());const d=l("button",{class:"btn btn--soft btn--sm",type:"button"},["📋 Pendientes hoy"]);d.addEventListener("click",()=>M());const f=l("div",{class:"inbox__pendientes",hidden:!0}),p=l("div",{class:"inbox__toolbar"},[i,o,c,u,d]),g=l("div",{class:"inbox__list",role:"list",tabindex:"-1"}),v=l("p",{class:"u-muted u-caption",style:{margin:"0"}},["Aquí llegan los interesados: contacta y califica. Las ventas activas viven en el Pipeline."]),I=l("section",{class:"inbox"},[v,s,p,f,g]);pe(n),n.append(I);const S=i.querySelector("input");S.addEventListener("input",()=>{e.search=S.value,le()});async function A(L,$){if(R(L.id,{ownerId:$?$.uid:null,ownerName:$?$.nombre:null}),j.get().mock){q($?`Asignado a ${$.nombre}`:"Sin asignar","ok");return}try{await QC(L.id,$),q($?`Asignado a ${$.nombre}`:"Sin asignar","ok")}catch{q("No se pudo asignar","error")}}async function O(L,$,Y={}){if(R(L.id,{status:$,...Y,lastActivityAt:new Date().toISOString()}),j.get().mock){q(`Estado → ${ia($).label}`,"ok");return}try{await YC(L.id,$,L,Y),q(`Estado → ${ia($).label}`,"ok")}catch{q("No se pudo cambiar el estado","error")}}function k(L,$){const Y=iy(L.phone,UP(L));if(!Y){q("Este lead no tiene teléfono","error");return}window.open(Y,"_blank","noopener"),!j.get().mock&&t&&Zp(L.id,{type:"whatsapp",subject:"WhatsApp enviado",direction:"outbound",name:L.fullName}).catch(()=>{}),F(L,$)}function x(L,$){!j.get().mock&&t&&Zp(L.id,{type:"llamada",subject:"Llamada registrada",direction:"outbound",name:L.fullName}).catch(()=>{}),q("📞 Llamada registrada","ok"),F(L,$)}function F(L,$){if(!t)return;const Y=performance.now();$t($||document.body,FP(),ce=>{if(qa("proximo_paso",Y,{preset:ce.label}),!!ce.value){if(ce.value==="abrir360"){N(L.id);return}if(j.get().mock){q("Próximo paso anotado (mock)","ok");return}JC(L.id,{subject:ce.value.subject,dueAt:ce.value.dueAt,name:L.fullName}).then(()=>q("✓ Próximo paso: "+ce.label,"ok")).catch(()=>q("No se pudo guardar el próximo paso","error"))}},{title:"¿Próximo paso con "+(L.fullName||"el cliente").split(/\s+/)[0]+"?"})}let P=!1;async function M(){P=!P,f.hidden=!P,P&&await T()}async function T(){if(pe(f),j.get().mock){f.append(l("div",{class:"u-muted u-caption",style:{padding:"10px"},text:"Pendientes no disponible en modo demo."}));return}f.append(l("div",{class:"u-muted u-caption",style:{padding:"10px"},text:"Cargando pendientes…"}));let L=[];try{L=await XC()}catch{pe(f),f.append(l("div",{class:"u-muted u-caption",style:{padding:"10px"},text:"No se pudieron cargar los pendientes."}));return}if(pe(f),f.append(l("div",{class:"inbox__listhead"},[l("span",{class:"u-muted u-caption",text:`📋 ${L.length} pendiente${L.length===1?"":"s"} (hoy y vencidos)`})])),!L.length){f.append(l("div",{class:"u-muted u-caption",style:{padding:"0 10px 10px"},text:"¡Al día! Registra llamadas/WhatsApps y elige “próximo paso” para que aparezcan aquí."}));return}const $=Date.now();L.forEach(Y=>{const ce=new Date(Y.dueAt).getTime()<$,se=l("button",{class:"btn btn--soft btn--sm",type:"button",title:"Marcar hecho"},["✓ Hecho"]),re=l("button",{class:"btn btn--ghost btn--sm",type:"button"},["Abrir 360"]),Se=l("div",{class:"lead-card",style:{alignItems:"center"}},[l("span",{class:`badge badge--${ce?"danger":"gold"}`,text:ce?"VENCIDO":"HOY"}),l("div",{class:"u-grow"},[l("div",{class:"lead-card__name",text:(Y.type==="cita"?"📅 ":"")+Y.subject}),l("div",{class:"u-caption u-muted",text:`${Y.relatedTo&&Y.relatedTo.name?Y.relatedTo.name+" · ":""}${_r(Y.dueAt)}`})]),l("div",{class:"u-row u-row--tight"},[re,t?se:null])]);re.addEventListener("click",()=>{Y.relatedTo&&Y.relatedTo.id&&N(Y.relatedTo.id)}),se.addEventListener("click",async()=>{se.disabled=!0;try{await ZC(Y.id),q("✓ Hecho","ok"),await T(),Y.relatedTo&&Y.relatedTo.id&&F({id:Y.relatedTo.id,fullName:Y.relatedTo.name||""},d)}catch{se.disabled=!1,q("No se pudo completar","error")}}),f.append(Se)})}function y(L){if(L.status==="convertido"){q("Ya es un negocio: gestiónalo en el Pipeline","info");return}wy(L,{onDone:()=>R(L.id,{status:"convertido"})})}function b(){j.set({leads:e.leads})}function R(L,$){const Y=e.leads.findIndex(ce=>ce.id===L);Y!==-1&&(e.leads[Y]=dy({...e.leads[Y],...$}),b(),w())}function w(){C(),E(),le()}function C(){const L=BC(e.leads,r);pe(s),ru.forEach($=>{const Y=e.queue===$.id,ce=l("button",{class:"chip"+(Y?" chip--active":""),role:"tab","aria-selected":String(Y),type:"button"},[l("span",{"aria-hidden":"true",text:$.icon}),l("span",{text:$.label}),l("span",{class:"chip__count",text:String(L[$.id]||0)})]);ce.addEventListener("click",()=>{e.queue=$.id,w()}),s.append(ce)})}function E(){if(pe(o),[{key:"type",label:"Tipo",items:[["","Todos"],["lead","Lead"],["cita","Cita"],["solicitud","Solicitud"],["pqr","PQR"]]},{key:"channel",label:"Canal",items:[["","Todos"],["web","Web"],["whatsapp","WhatsApp"],["bot","ALTOR Bot"],["cuenta","Cuenta"],["newsletter","Newsletter"],["cita","Cita web"]]},{key:"status",label:"Estado",items:[["","Todos"],...tu.map($=>[$.id,$.label])]}].forEach($=>{const Y=e.filters[$.key],ce=Y?($.items.find(re=>re[0]===Y)||[,$.label])[1]:$.label,se=l("button",{class:"chip"+(Y?" chip--active":""),type:"button","aria-haspopup":"menu"},[l("span",{text:ce}),l("span",{"aria-hidden":"true",text:"▾"})]);se.addEventListener("click",()=>{$t(se,$.items.map(([re,Se])=>({value:re,label:Se,active:re===Y})),re=>{e.filters[$.key]=re.value,w()},{title:$.label})}),o.append(se)}),e.filters.type||e.filters.channel||e.filters.status){const $=l("button",{class:"chip",type:"button"},["✕ Limpiar"]);$.addEventListener("click",()=>{e.filters={type:"",channel:"",status:""},w()}),o.append($)}}function le(){if(e.loading)return Z();if(e.error)return z("⚠️","No se pudo cargar",e.error);const{rows:L,hiddenClosed:$}=GC(e.leads,{queue:e.queue,uid:r,filters:e.filters,search:e.search,showClosed:e.showClosed});if(pe(g),!L.length&&!$){const se=e.search||e.filters.type||e.filters.channel||e.filters.status;g.append(H("🗂️",se?"Sin resultados":"¡Bandeja al día!",se?"Ajusta la búsqueda o los filtros.":"No hay clientes en esta cola."));return}const Y=$||e.showClosed?l("button",{class:"chip",type:"button",style:{marginLeft:"auto"}},[e.showClosed?"✕ Ocultar cerrados":`${$} ocultos · ver todos`]):null;Y&&Y.addEventListener("click",()=>{e.showClosed=!e.showClosed,le()});const ce=l("div",{class:"inbox__listhead"},[l("span",{class:"u-muted u-caption",text:`${L.length} ${L.length===1?"cliente":"clientes"} activos`}),l("span",{class:"u-faint u-caption",text:"Ordenado por urgencia"}),Y]);if(g.append(ce),!L.length&&$){g.append(H("🗂️","¡Bandeja al día!",`No hay clientes activos en esta cola (${$} cerrados ocultos).`));return}if(L.forEach(se=>g.append(fe(se))),e.hasMore&&e.queue==="todo"&&!e.search){const se=l("button",{class:"btn btn--soft btn--block",type:"button"},["Cargar más"]);se.addEventListener("click",()=>G(se)),g.append(l("div",{class:"inbox__more"},[se]))}}function fe(L){const $=us[L._rating],Y=ia(L.status),ce=!!(L.convertedTo&&L.convertedTo.dealId)||L.status==="convertido",se=zC(L),re=se&&se.state!=="ok"?l("span",{class:`badge badge--${se.state==="late"?"danger":"gold"}`,title:"Tiempo sin primer contacto"},[`⏱ ${se.mins<120?se.mins+" min":hl(se.mins*6e4)} sin contacto`]):null,Se=L._sla,Ne=`sla-dot sla-dot--${Se.state}`,$e=Se.closed?"Cerrado":Se.state==="late"?`SLA vencido hace ${hl(Se.remainingMs)}`:`Responder en ${hl(Se.remainingMs)}`,ct=[L._type.icon+" "+L._type.label,L.sourceDetail,L.vehicleOfInterestId?"🚗 "+L.vehicleOfInterestId:""].filter(Boolean).join(" · "),Gn=l("article",{class:"lead-card",role:"listitem",tabindex:"0","data-id":L.id,"aria-label":`${L.fullName}, ${$.label}`},[l("span",{class:Ne,title:$e,"aria-label":$e}),l("span",{class:"avatar avatar--sm","aria-hidden":"true",text:ks(L.fullName)}),l("div",{class:"lead-card__main u-grow"},[l("div",{class:"lead-card__top"},[l("span",{class:"lead-card__name u-truncate",text:L.fullName}),l("span",{class:`temp ${$.cls}`,title:`Score ${L._score}/100`},[`${$.icon} ${L._score}`])]),l("div",{class:"lead-card__what u-truncate u-muted",text:ct}),l("div",{class:"lead-card__meta u-caption"},[l("span",{class:"lead-card__chan",text:`${L._channel.icon} ${L._channel.label}`}),l("span",{class:"lead-card__dot",text:"·"}),l("span",{text:_r(L.createdAt)}),l("span",{class:"lead-card__dot",text:"·"}),ce?l("button",{class:"badge badge--ok",type:"button","data-action":"pipeline",title:"Este lead ya es un negocio: gestiónalo en el Pipeline",style:{cursor:"pointer",border:"none"}},[L.convertedTo&&L.convertedTo.outcome==="perdido"?"✖ Negocio perdido → Pipeline":L.convertedTo&&L.convertedTo.outcome==="vendido"?"🏆 VENDIDO":`🎯 ${L.convertedTo&&L.convertedTo.stageName||"Convertido"} → Pipeline`]):l("span",{class:`badge badge--${Y.badge||""}`.trim(),text:Y.label}),L.archived?l("span",{class:"badge",text:"🗄 Archivado"}):null,re?l("span",{class:"lead-card__dot",text:"·"}):null,re,L.ownerName?l("span",{class:"lead-card__dot",text:"·"}):null,L.ownerName?l("span",{class:"u-faint",text:"👤 "+L.ownerName}):null]),l("div",{class:"lead-card__nba"},[l("span",{"aria-hidden":"true",text:L._nba.icon}),l("span",{class:"u-muted",text:"Próx: "}),l("strong",{text:L._nba.label})])]),l("div",{class:"lead-card__actions"},[X("wa",wn.wa,"WhatsApp","btn--wa"),t?X("call",wn.call,"Registrar llamada"):null,t?X("assign",wn.person,"Asignar"):null,t&&!ce?X("status",wn.flag,"Cambiar estado"):null,t&&!ce?X("convert",wn.convert,"Convertir a oportunidad"):null,t?X("more",wn.more,"Más acciones"):null,X("open",wn.expand,"Abrir 360")])]);return Gn.addEventListener("click",Hn=>{const Ms=Hn.target.closest("[data-action]");if(Ms){Be(Ms.dataset.action,L,Ms);return}N(L.id)}),Gn.addEventListener("keydown",Hn=>{Hn.key==="Enter"?N(L.id):Hn.key.toLowerCase()==="w"&&k(L)}),Gn}function X(L,$,Y,ce=""){return l("button",{class:`icon-btn ${ce}`.trim(),type:"button","data-action":L,title:Y,"aria-label":Y},[l("span",{html:$,"aria-hidden":"true"})])}const ye={nuevo:"Acaba de entrar, nadie le ha hablado",contactado:"Ya le escribiste o llamaste",descartado:"No va: inalcanzable, no califica, spam… (pide la razón)"};function Be(L,$,Y){if(L==="open")return N($.id);if(L==="wa")return k($,Y);if(L==="call")return x($,Y);if(L==="convert")return y($);if(L==="pipeline"){window.location.hash="#/pipeline";return}if(L==="assign"){const ce=j.get().team||[],se=[{value:null,label:"Sin asignar",icon:"⊘",active:!$.ownerId},...ce.map(re=>({value:re,label:re.nombre,hint:re.cargo,icon:"👤",active:$.ownerId===re.uid}))];return $t(Y,se,re=>A($,re.value),{title:"Asignar a"})}if(L==="status"){if($.convertedTo&&$.convertedTo.dealId){q("Este lead ya es un negocio: gestiónalo en el Pipeline.","info");return}const ce=tu.filter(se=>se.id!=="convertido").map(se=>({value:se.id,label:se.label,hint:ye[se.id]||"",active:($.status||"nuevo")===se.id}));return $t(Y,ce,se=>{if(se.value==="descartado"){$t(Y,NC.map(re=>({value:re.id,label:re.label})),re=>O($,"descartado",{discardReason:re.value}),{title:"¿Por qué se descarta?"});return}O($,se.value)},{title:"Cambiar estado"})}if(L==="more"){const ce=[$.archived?{value:"unarchive",label:"Restaurar de archivados",icon:"↩️"}:{value:"archive",label:"Archivar",icon:"🗄",hint:"Sale de las vistas; reversible"},je("crm.delete")?{value:"purge",label:"Eliminar definitivo",icon:"🗑",hint:"Solo pruebas/spam — borra TODO su rastro"}:null].filter(Boolean);return $t(Y,ce,async se=>{if(se.value==="archive"||se.value==="unarchive"){const re=se.value==="archive";if(R($.id,{archived:re}),j.get().mock){q(re?"🗄 Archivado":"↩️ Restaurado","ok");return}try{await eP($.id,re),q(re?"🗄 Archivado":"↩️ Restaurado","ok")}catch{R($.id,{archived:!re}),q("No se pudo archivar","error")}return}if(se.value==="purge"){if(!navigator.onLine){q("Eliminar definitivo necesita señal.","error");return}if(!window.confirm('🗑 ¿Eliminar DEFINITIVAMENTE a "'+$.fullName+`"?

Borra el lead, sus actividades, negocios y su contacto si queda huérfano. Esto es SOLO para pruebas/spam — un cliente real se ARCHIVA.`)||!window.confirm("Última confirmación: esta acción NO se puede deshacer. ¿Eliminar?"))return;if(j.get().mock){q("Eliminado (mock)","ok");return}try{const re=await tP($.id);q(`🗑 Eliminado: ${re.activities} actividades, ${re.deals} negocios${re.contactDeleted?", contacto":""}`,"ok")}catch(re){q(re.message&&re.message.includes("Super Admin")?"Solo el Super Admin puede eliminar.":"No se pudo eliminar: "+(re.message||re.code),"error")}}},{title:"Más acciones"})}}function N(L){j.set({detailLeadId:L})}function H(L,$,Y){return l("div",{class:"state"},[l("div",{class:"state__icon","aria-hidden":"true",text:L}),l("div",{class:"state__title",text:$}),l("div",{class:"state__msg",text:Y})])}function z(L,$,Y){pe(g),g.append(H(L,$,Y))}function Z(){pe(g);for(let L=0;L<6;L++)g.append(l("div",{class:"lead-card lead-card--skeleton"},[l("span",{class:"skeleton",style:{width:"30px",height:"30px",borderRadius:"50%"}}),l("div",{class:"u-grow u-stack",style:{gap:"8px"}},[l("span",{class:"skeleton",style:{width:"46%",height:"14px"}}),l("span",{class:"skeleton",style:{width:"70%",height:"12px"}})])]))}async function G(L){if(e.cursor){L.disabled=!0,L.textContent="Cargando…";try{const{rows:$,lastDoc:Y,hasMore:ce}=await KC({after:e.cursor}),se=Fo($),re=new Set(e.leads.map(Se=>Se.id));e.leads.push(...se.filter(Se=>!re.has(Se.id))),e.cursor=Y,e.hasMore=ce,b(),w()}catch{q("No se pudo cargar más","error"),L.disabled=!1,L.textContent="Cargar más"}}}function he(){if(j.get().mock){j.set({team:su()}),e.leads=Fo($a()),e.loading=!1,e.hasMore=!1,b(),w(),e.dirtyHandler=()=>{e.leads=Fo($a()),b(),w()},window.addEventListener("altorra:leads-dirty",e.dirtyHandler);return}WC().catch(()=>{}),e.sub=HC({pageSize:40,onData:(L,$)=>{e.leads=Fo(L),e.cursor=e.sub?e.sub.getLastDoc():null,e.hasMore=$.hasMore,e.loading=!1,e.error=null,b(),w()},onError:L=>{console.error("[inbox] error de suscripción:",L),e.loading=!1,e.error=L&&L.code==="permission-denied"?"Tu cuenta no tiene permiso para ver el CRM.":"Revisa tu conexión e inténtalo de nuevo.",w()}})}return w(),he(),function(){e.sub&&e.sub.unsubscribe&&e.sub.unsubscribe(),e.sub=null,e.dirtyHandler&&(window.removeEventListener("altorra:leads-dirty",e.dirtyHandler),e.dirtyHandler=null)}}function UP(n){const e=String(n.fullName||"").trim().split(/\s+/)[0]||"",t=n.vehicleOfInterestId?` por el vehículo ${n.vehicleOfInterestId}`:"";return`Hola ${e}, te saluda Altorra Cars 👋. Vimos tu interés${t}. ¿En qué te podemos ayudar?`}function BP(n){const e={deals:[],loading:!0,error:null,sub:null,dragId:null,view:"kanban",won:[],wonSub:null,wonLoading:!0,wonError:null,collisionByDeal:new Map},t=je("crm.edit"),r=new Set,s=l("div",{class:"pipeline__bar"}),i=l("div",{class:"pipeline__board",role:"list","aria-label":"Embudo de ventas"}),o=l("p",{class:"u-muted u-caption",style:{margin:"0"}},["Aquí se trabajan las ventas activas. Los interesados nuevos llegan a la Bandeja."]),c=l("section",{class:"pipeline"},[o,s,i]);pe(n),n.append(c);function u(N,H){const z=e.deals.findIndex(Z=>Z.id===N);z!==-1&&(e.deals[z]={...e.deals[z],...H},j.get().mock&&dP(N,H),A())}async function d(N,H){if(N.stageId===H)return;const z=tm(N.stageId,H);if(!z.ok){q(z.error==="vendido_es_terminal"?"Un negocio vendido no se mueve (anulación = admin).":"Movimiento no válido","error");return}const Z=[...z.gates];z.needsReason&&Z.push("regressReason");const G=async he=>{const L=es(H),$=N.stageId;if(u(N.id,{stageId:H,stageName:L.label,probability:L.prob,...he,lastActivityAt:new Date().toISOString()}),j.get().mock){q("Etapa → "+L.label,"ok");return}try{await rm(N.id,H,N,he),p(N,$,L.label)}catch(Y){u(N.id,{stageId:$,stageName:es($).label,probability:bi($)}),q(Y&&Y.code==="permission-denied"?"Movimiento rechazado por las reglas — recarga el portal si tu versión es vieja.":"No se pudo mover","error")}};if(!Z.length)return G({});g(N,H,Z,G)}let f=null;function p(N,H,z){f&&f.remove();const Z=l("button",{class:"btn btn--soft btn--sm",type:"button"},["Deshacer"]),G=l("div",{role:"status",style:{position:"fixed",bottom:"18px",left:"50%",transform:"translateX(-50%)",display:"flex",gap:"12px",alignItems:"center",zIndex:"99",padding:"10px 14px",borderRadius:"10px",background:"var(--bg-elev, #1c1a17)",border:"1px solid var(--line, #444)",boxShadow:"0 6px 24px rgba(0,0,0,.4)"}},[l("span",{text:`${(N.contactName||N.name||"Negocio").split(" · ")[0]} → ${z}`}),Z]);document.body.appendChild(G),f=G;const he=setTimeout(()=>{G.remove(),f===G&&(f=null)},1e4);Z.addEventListener("click",async()=>{clearTimeout(he),G.remove(),f===G&&(f=null);const L=es(H);if(u(N.id,{stageId:H,stageName:L.label,probability:L.prob}),!j.get().mock)try{await rm(N.id,H,N,{regressReason:"Deshacer (arrastre accidental)"})}catch{q("No se pudo deshacer","error")}})}function g(N,H,z,Z){const G={},he=[],L=(Ne,$e)=>l("label",{class:"field"},[l("span",{class:"field__label",text:Ne}),$e]);if(z.includes("huboTestDrive")&&(G.huboTestDrive=l("select",{class:"select"},[l("option",{value:"si"},["Sí, hubo test drive"]),l("option",{value:"no"},["No alcanzó a probarlo"])]),he.push(L("¿Hubo test drive?",G.huboTestDrive))),z.includes("montoApartado")){G.montoApartado=l("input",{class:"input",type:"number",min:"0",step:"50000",placeholder:"500000"});const Ne=new Date(Date.now()+72*3600*1e3);G.venceEl=l("input",{class:"input",type:"date",value:Ne.toISOString().slice(0,10)}),he.push(L("Monto del apartado (COP) *",G.montoApartado),L("Vence el (default 72h)",G.venceEl))}if(z.includes("tipoPago")&&(G.tipoPago=l("select",{class:"select"},[l("option",{value:"contado"},["De contado"]),l("option",{value:"financiado"},["Financiado"])]),G.estadoCredito=l("select",{class:"select"},[l("option",{value:""},["— Estado del crédito —"]),l("option",{value:"pre_aprobado"},["Pre-aprobado"]),l("option",{value:"en_estudio"},["En estudio"]),l("option",{value:"aprobado"},["Aprobado"]),l("option",{value:"rechazado"},["Rechazado"])]),he.push(L("Forma de pago *",G.tipoPago),L("Crédito (si aplica)",G.estadoCredito))),z.includes("lostReason")&&(G.lostReason=l("select",{class:"select"},nm.map(Ne=>l("option",{value:Ne.id},[Ne.label]))),he.push(L("¿Por qué se perdió? *",G.lostReason))),z.includes("regressReason")&&(G.regressReason=l("input",{class:"input",type:"text",placeholder:"¿Qué pasó? (obligatorio al retroceder)"}),he.push(L("Razón del retroceso *",G.regressReason))),H==="vendido"){G.retomaCheck=l("input",{type:"checkbox",class:"checkbox"}),G.retomaMarca=l("input",{class:"input",type:"text",placeholder:"Marca *"}),G.retomaModelo=l("input",{class:"input",type:"text",placeholder:"Modelo"}),G.retomaYear=l("input",{class:"input",type:"number",min:"1980",max:"2035",placeholder:"Año"}),G.retomaPlaca=l("input",{class:"input",type:"text",placeholder:"Placa",maxlength:"8"}),G.retomaValor=l("input",{class:"input",type:"number",min:"0",step:"500000",placeholder:"Valor estimado (COP)"});const Ne=l("div",{class:"nl-form",hidden:!0,style:{marginTop:"8px"}},[G.retomaMarca,G.retomaModelo,G.retomaYear,G.retomaPlaca,G.retomaValor]);G.retomaCheck.addEventListener("change",()=>{Ne.hidden=!G.retomaCheck.checked}),he.push(l("div",{},[l("label",{class:"u-row u-row--tight",style:{cursor:"pointer"}},[G.retomaCheck,l("span",{text:"🚙 Recibe vehículo en parte de pago (retoma)"})]),Ne]))}const $=l("div",{class:"login__error",role:"alert",hidden:!0}),Y=l("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),ce=l("button",{class:"btn btn--gold",type:"submit"},["Mover a "+es(H).label]),se=l("form",{class:"nl-form"},[...he,$,l("div",{class:"nl-actions"},[Y,ce])]),re=l("div",{class:"modal-overlay"},[l("div",{class:"modal"},[l("div",{class:"modal__head"},[l("h2",{class:"modal__title",text:es(H).label})]),se])]);document.body.appendChild(re),r.add(re);const Se=()=>{r.delete(re),re.remove()};Y.addEventListener("click",Se),re.addEventListener("mousedown",Ne=>{Ne.target===re&&Se()}),se.addEventListener("submit",Ne=>{Ne.preventDefault();const $e={};if(G.huboTestDrive&&($e.huboTestDrive=G.huboTestDrive.value==="si"),G.montoApartado){const ct=Math.round(Number(G.montoApartado.value)||0);if(!(ct>0)){$.textContent="El monto del apartado es obligatorio.",$.hidden=!1;return}$e.montoApartado=ct,$e.venceEl=new Date((G.venceEl.value||new Date().toISOString().slice(0,10))+"T18:00:00-05:00").toISOString()}if(G.tipoPago&&($e.tipoPago=G.tipoPago.value,G.estadoCredito&&G.estadoCredito.value&&($e.estadoCredito=G.estadoCredito.value)),G.lostReason&&($e.lostReason=G.lostReason.value),G.regressReason){const ct=G.regressReason.value.trim();if(!ct){$.textContent="Escribe la razón del retroceso.",$.hidden=!1;return}$e.regressReason=ct}if(G.retomaCheck&&G.retomaCheck.checked){const ct=G.retomaMarca.value.trim();if(!ct){$.textContent="La marca del vehículo recibido es obligatoria.",$.hidden=!1;return}$e.recibeVehiculo={marca:ct,modelo:G.retomaModelo.value.trim(),year:Number(G.retomaYear.value)||null,placa:G.retomaPlaca.value.trim().toUpperCase(),valorEstimado:Math.round(Number(G.retomaValor.value)||0)}}Se(),Z($e)})}async function v(N,H){if(u(N.id,{amount:H}),!j.get().mock)try{await PP(N.id,H,N)}catch{q("No se pudo guardar el monto","error")}}async function I(N){if(!(Number(N.amount)>0)){q("Ponle el monto al negocio antes de marcarlo ganado (con ese valor se congela la comisión).","error");return}const H=tm(N.stageId,"vendido");if(!H.ok){q("Movimiento no válido","error");return}const z={status:N.status,stageId:N.stageId},Z=async G=>{if(u(N.id,{status:"won",...G}),j.get().mock){q("🎉 ¡Venta ganada!","ok");return}try{await xP(N.id,N,G),q("🎉 ¡Venta ganada!","ok")}catch{u(N.id,z),q("No se pudo marcar — revisa los datos requeridos","error")}};if(!H.gates.length)return Z({});g(N,"vendido",H.gates,Z)}async function S(N,H){const z={status:N.status,lostReason:N.lostReason||null};if(u(N.id,{status:"lost",lostReason:H}),j.get().mock){q("Marcado perdido","info");return}try{await NP(N.id,H,N),q("Marcado perdido","info")}catch{u(N.id,z),q("Error","error")}}function A(){if(e.loading)return ye();if(e.error)return X("⚠️","No se pudo cargar",e.error);const N=e.deals.filter(z=>z.status==="open");e.collisionByDeal=new Map;for(const z of AP(N))for(const Z of z.dealIds)e.collisionByDeal.set(Z,z.dealIds.length);if(O(N),e.view==="postventa")return le();if(i.classList.remove("pipeline__board--list"),pe(i),!N.length){i.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"🎯"}),l("div",{class:"state__title",text:"Embudo vacío"}),l("div",{class:"state__msg",text:"Convierte un lead en oportunidad desde la Bandeja para empezar."})]));return}const H=TP(N);yi.forEach(z=>{const Z=H[z.id]||[],G=Z.reduce((L,$)=>L+(Number($.amount)||0),0),he=l("div",{class:"pcol","data-stage":z.id},[l("div",{class:"pcol__head"},[l("div",{class:"u-row u-row--tight"},[l("span",{class:"pcol__dot",style:{background:$P(z.id)}}),l("strong",{text:z.label}),l("span",{class:"pcol__count",text:String(Z.length)})]),l("span",{class:"u-caption u-faint",text:`${Math.round(z.prob*100)}% · ${rr(G)||"$0"}`})]),l("div",{class:"pcol__drop","data-stage":z.id,role:"list"},Z.map(F))]);y(he.querySelector(".pcol__drop"),z.id),i.append(he)})}function O(N){const H=my(N),z=IP(N);pe(s);const Z=e.wonLoading?null:e.won.length,G=(he,L)=>{const $=l("button",{class:"btn btn--sm "+(e.view===he?"btn--gold":"btn--ghost"),type:"button","aria-pressed":e.view===he?"true":"false"},[L]);return $.addEventListener("click",()=>k(he)),$};s.append(l("div",{class:"pipeline__views",role:"group","aria-label":"Vista"},[G("kanban","🎯 Embudo"),G("postventa","🏁 Post-venta"+(Z===null||Z===0?"":" ("+Z+")"))]),x("Oportunidades",String(N.length)),x("Valor del embudo",rr(z)||"$0"),x("Forecast ponderado",rr(H)||"$0",!0))}function k(N){e.view!==N&&(e.view=N,N==="postventa"&&b(),A())}function x(N,H,z){return l("div",{class:"pstat"+(z?" pstat--hi":"")},[l("span",{class:"u-caption u-faint",text:N}),l("strong",{class:"pstat__v",text:H})])}function F(N){const H=EP(N),z=l("button",{class:"deal-card__amount",type:"button","data-action":"amount",title:"Editar monto"},[N.amount?rr(N.amount):"+ monto"]),Z=l("article",{class:"deal-card"+(H?" is-rotting":""),draggable:"true",tabindex:"0","data-id":N.id,"data-stage":N.stageId,role:"listitem","aria-label":`${N.name}, ${Math.round(bi(N.stageId)*100)}%`},[l("div",{class:"deal-card__top"},[l("span",{class:"avatar avatar--sm","aria-hidden":"true",text:ks(N.contactName)}),l("span",{class:"deal-card__name u-grow u-truncate",text:N.name}),H?l("span",{class:"deal-card__rot",title:"Estancado >14 días",text:"🐌"}):null]),N.vehicleName?l("div",{class:"u-caption u-muted u-truncate",text:"🚗 "+N.vehicleName}):null,e.collisionByDeal.has(N.id)?l("div",{class:"deal-card__collision u-caption",title:"Otro negocio activo persigue este mismo carro. Coordinen quién va primero.",text:"🥊 "+e.collisionByDeal.get(N.id)+" negocios por este carro"}):null,l("div",{class:"deal-card__row"},[z,l("span",{class:"badge badge--gold",text:`${Math.round(bi(N.stageId)*100)}%`})]),l("div",{class:"deal-card__foot u-caption u-faint"},[l("span",{class:"u-grow u-truncate",text:N.ownerName?"👤 "+N.ownerName:"Sin asesor"}),l("span",{text:_r(N.lastActivityAt)})]),l("div",{class:"deal-card__actions"},t?[P("stage","↔","Mover etapa"),P("won","✓","Marcar ganado"),P("lost","✕","Marcar perdido"),P("open","⤢","Abrir 360")]:[P("open","⤢","Abrir 360")])]);return Z.addEventListener("dragstart",G=>{e.dragId=N.id,Z.classList.add("is-dragging");try{G.dataTransfer.setData("text/plain",N.id),G.dataTransfer.effectAllowed="move"}catch{}}),Z.addEventListener("dragend",()=>{e.dragId=null,Z.classList.remove("is-dragging")}),Z.addEventListener("click",G=>{const he=G.target.closest("[data-action]");if(he)return M(he.dataset.action,N,he)}),Z}function P(N,H,z){return l("button",{class:"icon-btn icon-btn--xs",type:"button","data-action":N,title:z,"aria-label":z,draggable:"false"},[H])}function M(N,H,z){if(N==="open")return j.set({detailLeadId:H.leadId});if(N==="amount")return T(H,z);if(N==="stage")return $t(z,yi.map(Z=>({value:Z.id,label:Z.label,hint:Math.round(Z.prob*100)+"%",active:Z.id===H.stageId})),Z=>d(H,Z.value),{title:"Mover a etapa"});if(N==="won")return I(H);if(N==="lost")return $t(z,nm.map(Z=>({value:Z.id,label:Z.label})),Z=>S(H,Z.value),{title:"Motivo de pérdida"})}function T(N,H){const z=l("input",{class:"deal-card__amount-input",type:"text",inputmode:"numeric",value:N.amount||"","aria-label":"Monto en COP"});H.replaceWith(z),z.focus(),z.select();const Z=()=>{const G=parseInt(String(z.value).replace(/\D/g,""),10)||0;v(N,G)};z.addEventListener("keydown",G=>{G.key==="Enter"?(G.preventDefault(),Z()):G.key==="Escape"&&A()}),z.addEventListener("blur",Z)}function y(N,H){N.addEventListener("dragover",z=>{z.preventDefault(),N.classList.add("is-over"),z.dataTransfer&&(z.dataTransfer.dropEffect="move")}),N.addEventListener("dragleave",()=>N.classList.remove("is-over")),N.addEventListener("drop",z=>{z.preventDefault(),N.classList.remove("is-over");const Z=e.dragId||z.dataTransfer&&z.dataTransfer.getData("text/plain"),G=e.deals.find(he=>he.id===Z);G&&d(G,H)})}function b(){if(j.get().mock){e.won=iu().filter(N=>N.status==="won"),e.wonLoading=!1,e.wonError=null;return}e.wonSub||(e.wonSub=DP({pageSize:100,onData:N=>{e.won=N.slice().sort((H,z)=>String(z.wonAt||z.lastActivityAt||"").localeCompare(String(H.wonAt||H.lastActivityAt||""))),e.wonLoading=!1,e.wonError=null,A()},onError:N=>{if(e.wonSub)try{e.wonSub()}catch{}e.wonSub=null,e.wonLoading=!1,e.wonError=N&&N.code==="permission-denied"?"Sin permiso para ver los ganados.":"Revisa tu conexión.",e.view==="postventa"&&A()}}))}function R(N,H){const z=e.won.findIndex(Z=>Z.id===N);z!==-1&&(e.won[z]={...e.won[z],...H},A())}async function w(N,H,z){const Z=N.postventa||{};if(R(N.id,{postventa:{...Z,[H]:z}}),!j.get().mock)try{await VP(N.id,H,z)}catch{R(N.id,{postventa:Z}),q("No se pudo guardar el checklist","error")}}async function C(N,H){H.disabled=!0,H.textContent="Creando…";try{const z=await LP(N.id);R(N.id,{retomaVehicleId:z.vehicleId}),q("Borrador #"+z.vehicleId+" creado en inventario","ok")}catch(z){H.disabled=!1,H.textContent="Crear borrador en inventario",q(z&&z.message?z.message:"No se pudo crear el borrador","error")}}function E(N){const H=l("input",{class:"input",type:"text",placeholder:"Marca *"}),z=l("input",{class:"input",type:"text",placeholder:"Modelo"}),Z=l("input",{class:"input",type:"number",min:"1980",max:"2035",placeholder:"Año"}),G=l("input",{class:"input",type:"text",placeholder:"Placa",maxlength:"8"}),he=l("input",{class:"input",type:"number",min:"0",step:"500000",placeholder:"Valor estimado (COP)"}),L=l("div",{class:"login__error",role:"alert",hidden:!0}),$=l("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),Y=l("button",{class:"btn btn--gold",type:"submit"},["Guardar retoma"]),ce=l("form",{class:"nl-form"},[H,z,Z,G,he,L,l("div",{class:"nl-actions"},[$,Y])]),se=l("div",{class:"modal-overlay"},[l("div",{class:"modal"},[l("div",{class:"modal__head"},[l("h2",{class:"modal__title",text:"🚙 Vehículo recibido (retoma)"})]),ce])]);document.body.appendChild(se),r.add(se);const re=()=>{r.delete(se),se.remove()};$.addEventListener("click",re),se.addEventListener("mousedown",Se=>{Se.target===se&&re()}),ce.addEventListener("submit",async Se=>{if(Se.preventDefault(),!H.value.trim()){L.textContent="La marca es obligatoria.",L.hidden=!1;return}const Ne={marca:H.value.trim(),modelo:z.value.trim(),year:Number(Z.value)||null,placa:G.value.trim().toUpperCase(),valorEstimado:Math.round(Number(he.value)||0)};re();const $e=N.recibeVehiculo||null;if(R(N.id,{recibeVehiculo:Ne}),!j.get().mock)try{await OP(N.id,Ne)}catch{R(N.id,{recibeVehiculo:$e}),q("No se pudo guardar","error")}})}function le(){if(pe(i),i.classList.add("pipeline__board--list"),e.wonError){const N=l("button",{class:"btn btn--soft btn--sm",type:"button"},["↻ Reintentar"]);N.addEventListener("click",()=>{e.wonError=null,e.wonLoading=!0,b(),A()}),i.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"⚠️"}),l("div",{class:"state__title",text:"No se pudieron cargar los ganados"}),l("div",{class:"state__msg",text:e.wonError}),N]));return}if(e.wonLoading){i.append(l("div",{class:"state"},[l("div",{class:"state__msg",text:"Cargando ganados…"})]));return}if(!e.won.length){i.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"🏁"}),l("div",{class:"state__title",text:"Sin ventas ganadas aún"}),l("div",{class:"state__msg",text:"Cuando marques un negocio como ganado, su checklist de entrega vivirá aquí."})]));return}e.won.forEach(N=>i.append(fe(N)))}function fe(N){const H=_y(N),z=N.commissionSnapshot&&N.commissionSnapshot.amount||N.amount||0,Z=(N.wonAt||N.lastActivityAt||"").slice(0,10),G=gy.map($=>{const Y=!!(N.postventa&&N.postventa[$.id]),ce=l("input",{type:"checkbox",class:"checkbox"});return ce.checked=Y,t||(ce.disabled=!0),ce.addEventListener("change",()=>w(N,$.id,ce.checked)),l("label",{class:"pv-item"+(Y?" is-done":"")},[ce,l("span",{text:$.label})])}),he=N.recibeVehiculo;let L;if(he&&(he.marca||he.placa)){const $=[l("span",{class:"u-caption u-muted",text:"🚙 Retoma: "+[he.marca,he.modelo,he.placa].filter(Boolean).join(" ")+(he.valorEstimado?" · "+rr(he.valorEstimado):"")})];if(N.retomaVehicleId)$.push(l("span",{class:"badge badge--gold",text:"Borrador #"+N.retomaVehicleId+" ✓"}));else if(t){const Y=l("button",{class:"btn btn--soft btn--sm",type:"button"},["Crear borrador en inventario"]);Y.addEventListener("click",()=>C(N,Y)),$.push(Y)}L=l("div",{class:"pv-retoma"},$)}else if(t){const $=l("button",{class:"btn btn--ghost btn--sm",type:"button"},["＋ Retoma"]);$.addEventListener("click",()=>E(N)),L=l("div",{class:"pv-retoma"},[$])}return l("article",{class:"deal-card deal-card--pv","data-id":N.id},[l("div",{class:"deal-card__top"},[l("span",{class:"avatar avatar--sm","aria-hidden":"true",text:ks(N.contactName)}),l("span",{class:"deal-card__name u-grow u-truncate",text:N.name}),l("span",{class:"badge "+(H?"badge--gold":""),title:H?"Checklist completo: entra a liquidación de comisiones (F42)":"La comisión se liquida cuando el checklist esté completo",text:H?"✓ Liquidable":"⏳ Pendiente"})]),l("div",{class:"u-caption u-muted"},[l("span",{text:(N.vehicleName?"🚗 "+N.vehicleName+" · ":"")+rr(z)}),l("span",{class:"u-faint",text:(N.tipoPago?" · "+N.tipoPago:"")+(Z?" · ganado "+Z:"")})]),l("div",{class:"pv-checklist"},G),L||null,l("div",{class:"deal-card__foot u-caption u-faint"},[l("span",{class:"u-grow u-truncate",text:N.ownerName?"👤 "+N.ownerName:"Sin asesor"})])])}function X(N,H,z){pe(i),i.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:N}),l("div",{class:"state__title",text:H}),l("div",{class:"state__msg",text:z})]))}function ye(){pe(s),pe(i),yi.slice(0,5).forEach(()=>{i.append(l("div",{class:"pcol"},[l("div",{class:"pcol__head"},[l("span",{class:"skeleton",style:{width:"60%",height:"14px"}})]),l("div",{class:"pcol__drop"},[1,2].map(()=>l("div",{class:"deal-card",style:{pointerEvents:"none"}},[l("span",{class:"skeleton",style:{width:"100%",height:"52px"}})])))]))})}function Be(){if(j.get().mock){e.deals=iu().filter(N=>N.status==="open"),e.loading=!1,b(),A();return}e.sub=SP({pageSize:150,onData:N=>{e.deals=N,e.loading=!1,e.error=null,A()},onError:N=>{e.loading=!1,e.error=N&&N.code==="permission-denied"?"Sin permiso para ver el pipeline.":"Revisa tu conexión.",A()}}),b()}return A(),Be(),function(){if(e.sub&&e.sub(),e.sub=null,e.wonSub&&e.wonSub(),e.wonSub=null,r.forEach(H=>{try{H.remove()}catch{}}),r.clear(),f){try{f.remove()}catch{}f=null}}}function $P(n){return{nuevo:"var(--temp-cold)",contactado:"var(--info)",cita_agendada:"#8A7CFF",visito:"var(--gold-500)",test_drive:"var(--gold-600)",negociacion:"var(--warning)",financiacion:"var(--success)"}[n]||"var(--ink-400)"}const qP=["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"],sm=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];function zi(n){const e=n.getFullYear(),t=String(n.getMonth()+1).padStart(2,"0"),r=String(n.getDate()).padStart(2,"0");return`${e}-${t}-${r}`}function Ey(n,e){const r=(new Date(n,e,1).getDay()+6)%7,s=new Date(n,e+1,0).getDate(),i=[];for(let c=0;c<r;c++)i.push({date:new Date(n,e,1-r+c),inMonth:!1});for(let c=1;c<=s;c++)i.push({date:new Date(n,e,c),inMonth:!0});for(;i.length%7!==0;){const c=i[i.length-1].date;i.push({date:new Date(c.getFullYear(),c.getMonth(),c.getDate()+1),inMonth:!1})}const o=[];for(let c=0;c<i.length;c+=7)o.push(i.slice(c,c+7));return o}function jP(n,e){const t=Ey(n,e),r=t[0][0].date,i=t[t.length-1][6].date,o=new Date(i.getFullYear(),i.getMonth(),i.getDate()+1);return{startISO:r.toISOString(),endISO:o.toISOString()}}function zP(n){const e={};for(const t of n){if(!t.dueAt)continue;const r=zi(new Date(t.dueAt));(e[r]||(e[r]=[])).push(t)}for(const t of Object.keys(e))e[t].sort((r,s)=>new Date(r.dueAt)-new Date(s.dueAt));return e}function im(n){const e=new Date(n);return Number.isNaN(e.getTime())?"":e.toLocaleTimeString("es-CO",{hour:"2-digit",minute:"2-digit"})}function GP(n,e){return n.getFullYear()===e.getFullYear()&&n.getMonth()===e.getMonth()&&n.getDate()===e.getDate()}const HP=n=>({id:n.id,...n.data()});function KP(n,e,t,r){const s=Je(Te(te,"activities"),Bn("dueAt",">=",n),Bn("dueAt","<",e),mt("dueAt","asc"));return Ut(s,i=>t(i.docs.map(HP)),i=>r&&r(i))}async function sr(n,e,t){return(await Mr(Fr,"crmCitaAction")({action:n,solicitudId:e||null,payload:t||{}})).data}async function WP(n){const e=await Lr(Ie(te,"solicitudes",n));return e.exists()?{id:e.id,...e.data()}:null}async function Ty(){const n=await Lr(Ie(te,"config","availability"));return n.exists()?n.data():{}}async function Ay(){const n=await Lr(Ie(te,"config","bookedSlots"));return n.exists()?n.data():{}}const QP=["super_admin","admin","editor","asesor","moderator"];let $o=null;async function Ry(){if($o)return $o;const n=j.get(),e=new Map;try{(await Yt(Je(Te(te,"usuarios"),kt(50)))).docs.forEach(r=>{const s=r.data();s.bloqueado!==!0&&(!QP.includes(s.rol)&&!s.roleId||e.set(r.id,{uid:r.id,nombre:s.nombre||s.email||r.id,rol:s.rol||s.roleId||""}))})}catch{try{const r=await Lr(Ie(te,"config","crmIntake"));(r.exists()&&Array.isArray(r.data().rotation)?r.data().rotation:[]).forEach(i=>{const o=typeof i=="string"?i:i.uid;o&&e.set(o,{uid:o,nombre:typeof i=="object"&&i.nombre||o,rol:""})})}catch{}}return n.user&&!e.has(n.user.uid)&&e.set(n.user.uid,{uid:n.user.uid,nombre:n.profile&&n.profile.nombre||n.user.email||"Yo",rol:n.profile&&n.profile.rol||""}),$o=Array.from(e.values()),$o}const YP={pendiente:"🕐 Pendiente (sin confirmar)",confirmada:"✅ Confirmada",reprogramada:"🔁 Reprogramada (re-confirmar)",completada:"🏁 Completada",cancelada:"✖ Cancelada",no_show:"🚫 No asistió",caducada:"⏳ Caducada (no confirmó)"},JP=["pendiente","confirmada","reprogramada"],XP="";function ZP(){const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`}function Sy(n,e,t){const r=l("div",{class:"modal"},[l("div",{class:"modal__head"},[l("h2",{class:"modal__title",text:n}),e?l("span",{class:"u-caption u-faint",text:e}):null]),...t]),s=l("div",{class:"modal-overlay"},[r]);document.body.appendChild(s);const i=()=>{s.remove(),window.removeEventListener("keydown",o)},o=c=>{c.key==="Escape"&&i()};return window.addEventListener("keydown",o),s.addEventListener("mousedown",c=>{c.target===s&&i()}),{overlay:s,card:r,close:i}}function Zn(n,e){return e?l("div",{class:"cita-row"},[l("span",{class:"cita-row__k u-caption u-muted",text:n}),l("span",{class:"cita-row__v",text:String(e)})]):null}function ex(n,e,t){if(!t)return[];if(Array.isArray(n.blockedDates)&&n.blockedDates.includes(t))return[];const r=new Date(t+"T12:00:00Z").getUTCDay();if(!(Array.isArray(n.days)?n.days:[1,2,3,4,5,6]).includes(r))return[];const s=Array.isArray(e[t])?e[t]:[],i=n.blockedHours&&n.blockedHours[t]||[],o=[],c=n.interval||60;for(let u=(n.startHour??9)*60;u<(n.endHour??17)*60;u+=c){const d=`${String(Math.floor(u/60)).padStart(2,"0")}:${String(u%60).padStart(2,"0")}`;!s.includes(d)&&!i.includes(d)&&o.push(d)}return o}function ky(n,e,{fecha:t,hora:r}={}){const s=l("input",{class:"input",type:"date",min:ZP(),value:t||""}),i=l("select",{class:"select"},[l("option",{value:"",text:"— hora —"})]);function o(){const c=ex(n,e,s.value);i.replaceChildren(l("option",{value:"",text:c.length?"— hora —":"Sin horarios ese día"}),...c.map(u=>l("option",{value:u,text:u}))),r&&c.includes(r)&&(i.value=r)}return s.addEventListener("change",o),t&&o(),{dateIn:s,hourSel:i,value:()=>({fecha:s.value,hora:i.value})}}async function Cy(n){const e=l("select",{class:"select"},[l("option",{value:"",text:"Cargando…"})]),t=await Ry();e.replaceChildren(l("option",{value:"",text:"— asesor —"}),...t.map(s=>l("option",{value:s.uid,text:s.nombre})));const r=j.get().user;return e.value=n&&t.some(s=>s.uid===n)?n:r&&t.some(s=>s.uid===r.uid)?r.uid:"",e._advisors=t,e}async function Py(n){const e=l("select",{class:"select"},[l("option",{value:XP,text:"Sin vehículo asignado"})]);try{const t=await by();e.append(...t.map(r=>l("option",{value:r.id,text:r.label}))),n&&(e.value=n),e._vehicles=t}catch{e._vehicles=[]}return e}function tx(n,e){const t=String(n.whatsapp||n.telefono||"").replace(/\D/g,"");if(!t)return null;const r=t.length===10&&t.startsWith("3")?"57"+t:t.startsWith("57")?t:String(n.prefijoPais||"57").replace(/\D/g,"")+t,s=`Hola ${n.nombre||""}! Te escribo de ALTORRA CARS por tu cita del ${n.fecha||""} a las ${n.hora||""}`+(n.vehiculo?` para ver el ${n.vehiculo}`:"")+`. Confírmala aquí 👉 ${e}`;return`https://wa.me/${r}?text=${encodeURIComponent(s)}`}async function nx(n,{onLead:e}={}){const t=n.sourceSolicitudId;if(!t)return;if(j.get().mock){q("En demo las citas web no tienen acciones.","info");return}let r;try{r=await WP(t)}catch{r=null}if(!r){q("No se pudo cargar la cita.","error");return}const s=je("crm.edit"),i=JP.includes(r.estado),o=l("div",{class:"nl-form"}),c=l("div",{class:"login__error",role:"alert",hidden:!0}),u=v=>{c.textContent=v,c.hidden=!1},{close:d}=Sy("Cita · "+(r.nombre||"Cliente"),YP[r.estado]||r.estado,[o]);function f(){return l("div",{class:"cita-info"},[Zn("Cuándo",(r.fecha||"")+(r.hora?" · "+r.hora:"")),Zn("Tipo",r.tipo),Zn("Vehículo",r.vehiculo),Zn("Teléfono",(r.prefijoPais||"")+" "+(r.whatsapp||r.telefono||"")),Zn("Asesor",r.assignedToName||r.assignedTo),r.confirmedAt?Zn("Confirmó",(r.confirmedVia||"")+" · "+String(r.confirmedAt).slice(0,16).replace("T"," ")):null,r._tupleConflict?l("div",{class:"cita-conflict",text:"⚠️ El cliente confirmó pero el horario CHOCA con otra cita del asesor — reprograma una de las dos."}):null,r._requiereReagendar?l("div",{class:"cita-conflict",text:"🚗 El carro de esta cita ya no está disponible — ofrece otro o reagenda."}):null,Zn("Notas",r.comentarios||r.mensaje)])}async function p(v,I){c.hidden=!0;try{await I(),q(v,"ok"),d(),e&&r._leadId&&e(r._leadId)}catch(S){u(S&&S.message||"No se pudo completar la acción.")}}async function g(){if(o.replaceChildren(f(),c),!s||!i){if(r._leadId){const k=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"Ver cliente (360)"});k.addEventListener("click",()=>{d(),j.set({detailLeadId:r._leadId})}),o.append(k)}return}const v=l("div",{class:"cita-actions"}),I=l("button",{class:"btn btn--gold btn--sm",type:"button",text:"📲 Pedir confirmación por WhatsApp"});I.addEventListener("click",async()=>{I.disabled=!0;try{const k=await sr("getConfirmLink",r.id),x=tx(r,k.url);if(!x){u("La cita no tiene teléfono."),I.disabled=!1;return}window.open(x,"_blank","noopener"),q("Mensaje listo en WhatsApp — el cliente confirma tocando el link.","ok"),I.disabled=!1}catch(k){u(k&&k.message||"No se pudo generar el link."),I.disabled=!1}});const S=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"✓ Confirmar (asignar asesor)"});S.addEventListener("click",async()=>{o.replaceChildren(f(),c,l("p",{class:"u-caption u-muted",text:"Confirmar reserva el bloque del asesor (y del carro si aplica)."}));const k=await Cy(r.assignedTo),x=await Py(r.vehicleAssignedId||r.vehiculoId),F=l("select",{class:"select"},[l("option",{value:"manual",text:"El cliente confirmó (llamada/persona)"}),l("option",{value:"whatsapp",text:"El cliente confirmó por WhatsApp"}),l("option",{value:"email",text:"El cliente confirmó por email"})]),P=l("button",{class:"btn btn--gold btn--sm",type:"button",text:"✓ Confirmar cita"}),M=l("button",{class:"btn btn--ghost btn--sm",type:"button",text:"‹ Volver"});M.addEventListener("click",g),P.addEventListener("click",()=>{if(!k.value){u("Elige el asesor.");return}const T=(k._advisors||[]).find(b=>b.uid===k.value)?.nombre||null,y=(x._vehicles||[]).find(b=>b.id===x.value);p("✅ Cita confirmada",()=>sr("confirm",r.id,{asesorId:k.value,asesorName:T,canal:F.value,vehicleId:x.value||null,vehicleName:y?y.label:null}))}),o.append(l("label",{class:"field"},[l("span",{class:"field__label",text:"Asesor *"}),k]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Vehículo"}),x]),l("label",{class:"field"},[l("span",{class:"field__label",text:"¿Cómo confirmó?"}),F]),l("div",{class:"nl-actions"},[M,P]))});const A=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"🔁 Reprogramar"});A.addEventListener("click",async()=>{o.replaceChildren(f(),c,l("p",{class:"u-caption u-muted",text:"Al reprogramar, el link viejo de confirmación deja de servir y el cliente debe re-confirmar."}));let k,x;try{[k,x]=await Promise.all([Ty(),Ay()])}catch{u("No se pudo cargar la disponibilidad — revisa tu conexión y reintenta.");return}const F=ky(k,x,{}),P=l("button",{class:"btn btn--gold btn--sm",type:"button",text:"🔁 Mover cita"}),M=l("button",{class:"btn btn--ghost btn--sm",type:"button",text:"‹ Volver"});M.addEventListener("click",g),P.addEventListener("click",()=>{const{fecha:T,hora:y}=F.value();if(!T||!y){u("Elige fecha y hora.");return}p("🔁 Cita reprogramada — pídele re-confirmar por WhatsApp",()=>sr("reschedule",r.id,{fecha:T,hora:y}))}),o.append(l("div",{class:"cfg-row"},[F.dateIn,F.hourSel]),l("div",{class:"nl-actions"},[M,P]))});const O=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"✖ Cancelar cita"});if(O.addEventListener("click",()=>{o.replaceChildren(f(),c);const k=l("input",{class:"input",type:"text",placeholder:"Motivo (le llega al cliente por email)"}),x=l("button",{class:"btn btn--gold btn--sm",type:"button",text:"Confirmar cancelación"}),F=l("button",{class:"btn btn--ghost btn--sm",type:"button",text:"‹ Volver"});F.addEventListener("click",g),x.addEventListener("click",()=>p("✖ Cita cancelada (cupo liberado)",()=>sr("cancel",r.id,{motivo:k.value.trim()}))),o.append(k,l("div",{class:"nl-actions"},[F,x]))}),v.append(I,S,A,O),r.estado!=="pendiente"){const k=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"🏁 Completada"});k.addEventListener("click",()=>p("🏁 Cita completada",()=>sr("complete",r.id)));const x=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"🚫 No asistió"});x.addEventListener("click",()=>p("🚫 No-show registrado — mañana 9am te recuerda llamarlo",()=>sr("no_show",r.id))),v.append(k,x)}if(r._leadId){const k=l("button",{class:"btn btn--ghost btn--sm",type:"button",text:"👤 Ver cliente (360)"});k.addEventListener("click",()=>{d(),j.set({detailLeadId:r._leadId})}),v.append(k)}o.append(v)}await g()}async function rx(n,{onDone:e}={}){if(j.get().mock){const A=new Date(Date.now()+864e5).toISOString();fP({type:"cita",subject:"Cita con "+(n.fullName||""),dueAt:A,relatedTo:{type:"lead",id:n.id,name:n.fullName},status:"open"}),q("📅 Cita agendada (demo)","ok");return}const t=l("div",{class:"login__error",role:"alert",hidden:!0}),r=A=>{t.textContent=A,t.hidden=!1},s=l("div",{class:"nl-form"},[l("p",{class:"u-caption u-muted",text:"La cita manual nace CONFIRMADA y reserva el bloque del asesor (y del carro). Necesitas señal."})]),{close:i}=Sy("📅 Agendar cita",n.fullName||"Cliente",[s]);let o,c,u,d;try{[o,c,u,d]=await Promise.all([Ty(),Ay(),Cy(n.ownerId),Py(n.vehicleOfInterestId)])}catch{s.append(t),r("No se pudo cargar la disponibilidad — revisa tu conexión y vuelve a abrir el diálogo.");return}const f=ky(o,c,{}),p=l("select",{class:"select"},[l("option",{value:"visita",text:"Visita al concesionario"}),l("option",{value:"test_drive",text:"Test drive"}),l("option",{value:"llamada",text:"Llamada agendada"})]),g=l("select",{class:"select"},[l("option",{value:"30",text:"30 min"}),l("option",{value:"60",text:"1 hora",selected:""}),l("option",{value:"90",text:"1h 30"})]),v=l("input",{class:"input",type:"text",placeholder:"Nota (opcional)"}),I=l("button",{class:"btn btn--gold btn--sm",type:"button",text:"📅 Crear cita confirmada"}),S=l("button",{class:"btn btn--ghost btn--sm",type:"button",text:"Cancelar"});S.addEventListener("click",i),I.addEventListener("click",async()=>{t.hidden=!0;const{fecha:A,hora:O}=f.value();if(!A||!O)return r("Elige fecha y hora.");if(!u.value)return r("Elige el asesor que atiende.");I.disabled=!0,I.textContent="Creando…";const k=(u._advisors||[]).find(F=>F.uid===u.value)?.nombre||null,x=(d._vehicles||[]).find(F=>F.id===d.value);try{await sr("create",null,{leadId:n.id||null,contactId:n.contactId||null,nombre:n.fullName||"Cliente",telefono:n.phone||null,email:n.email||null,fecha:A,hora:O,duracionMin:parseInt(g.value,10)||60,asesorId:u.value,asesorName:k,vehicleId:d.value||null,vehicleName:x?x.label:null,tipo:p.value,nota:v.value.trim()}),q("📅 Cita creada y confirmada — ya está en la Agenda","ok"),i(),e&&e()}catch(F){I.disabled=!1,I.textContent="📅 Crear cita confirmada",r(F&&F.message||"No se pudo crear la cita.")}}),s.append(l("div",{class:"cfg-row"},[f.dateIn,f.hourSel]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Asesor *"}),u]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Vehículo"}),d]),l("div",{class:"cfg-row"},[p,g]),v,t,l("div",{class:"nl-actions"},[S,I]))}function sx(n){const e=new Date,t={year:e.getFullYear(),month:e.getMonth(),events:[],loading:!0,error:null,sub:null},r=l("div",{class:"agenda__head"}),s=l("p",{class:"u-muted u-caption",style:{margin:"0",padding:"8px 10px",border:"1px dashed var(--line, #444)",borderRadius:"8px"}},["✅ Toca una cita para confirmarla (asignando asesor), pedir confirmación por WhatsApp, reprogramarla o cancelarla. ","Si el cliente no confirma, caduca sola 3h antes y libera el cupo. El ",l("a",{href:"/admin.html#solicitudes",target:"_blank",rel:"noopener",text:"calendario clásico"})," sigue de respaldo hasta el cambio definitivo."]),i=l("div",{class:"agenda__weekdays"},qP.map(A=>l("span",{class:"agenda__wd",text:A}))),o=l("div",{class:"agenda__grid"}),c=l("section",{class:"agenda"},[r,s,i,o]);pe(n),n.append(c);function u(A){let O=t.month+A,k=t.year;O<0?(O=11,k--):O>11&&(O=0,k++),t.year=k,t.month=O,S()}function d(){t.year=e.getFullYear(),t.month=e.getMonth(),S()}function f(){pe(r);const A=l("div",{class:"u-row u-row--tight"},[p("‹","Mes anterior",()=>u(-1)),l("button",{class:"btn btn--soft btn--sm",type:"button",onclick:d},["Hoy"]),p("›","Mes siguiente",()=>u(1))]);r.append(l("h2",{class:"agenda__title",text:`${sm[t.month]} ${t.year}`}),A)}function p(A,O,k){const x=l("button",{class:"icon-btn",type:"button","aria-label":O},[A]);return x.addEventListener("click",k),x}function g(){if(f(),pe(o),t.error){o.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"⚠️"}),l("div",{class:"state__title",text:"No se pudo cargar la agenda"}),l("div",{class:"state__msg",text:t.error})]));return}const A=zP(t.events);Ey(t.year,t.month).forEach(k=>{k.forEach(x=>{const F=zi(x.date),P=A[F]||[],M=GP(x.date,e),T=l("div",{class:"agenda__day"+(x.inMonth?"":" is-out")+(M?" is-today":""),role:"gridcell"},[l("div",{class:"agenda__daynum",text:String(x.date.getDate())})]),y=l("div",{class:"agenda__events"});if(P.slice(0,3).forEach(b=>y.append(v(b))),P.length>3){const b=l("button",{class:"agenda__more",type:"button"},[`+${P.length-3} más`]);b.addEventListener("click",()=>$t(b,P.map(R=>({value:R,label:`${im(R.dueAt)} · ${R.relatedTo?.name||R.subject||"Cita"}`})),R=>I(R.value),{title:`${x.date.getDate()} ${sm[t.month]}`})),y.append(b)}T.append(y),o.append(T)})})}function v(A){const O=A.type==="cita"?A.estadoCita||"pendiente":null,k="agenda__chip"+(O?" agenda__chip--"+O:"")+(A.status==="closed"?" is-closed":""),x=l("button",{class:k,type:"button",title:A.subject||"Cita"},[l("span",{class:"agenda__chip-time",text:im(A.dueAt)}),l("span",{class:"u-truncate",text:A.relatedTo?.name||A.subject||"Cita"})]);return x.addEventListener("click",()=>I(A)),x}function I(A){if(A.type==="cita"&&A.sourceSolicitudId){nx(A,{onLead:k=>j.set({detailLeadId:k})});return}const O=A.relatedTo&&A.relatedTo.id;O&&j.set({detailLeadId:O})}function S(){if(g(),t.sub&&(t.sub(),t.sub=null),j.get().mock){t.events=hP(),t.loading=!1,g();return}const{startISO:A,endISO:O}=jP(t.year,t.month);t.sub=KP(A,O,k=>{t.events=k,t.loading=!1,t.error=null,g()},k=>{t.loading=!1,t.error=k&&k.code==="permission-denied"?"Sin permiso.":"Revisa tu conexión.",g()})}return S(),function(){t.sub&&t.sub(),t.sub=null}}const ix=n=>{const e=new Date(n).getTime();return Number.isNaN(e)?0:e},Cc=n=>n.status==="won",xy=n=>n.status==="lost",Fd=n=>n.status==="open",Ud=n=>n.status==="convertido";function om(n,e){return e?n.filter(t=>ix(t.createdAt)>=e):n.slice()}function ox(n,e){const t=n.length,r=n.filter(Ud).length,s=e.filter(Cc),i=e.filter(xy),o=s.reduce((u,d)=>u+(Number(d.amount)||0),0),c=s.length+i.length;return{leadsNew:t,convertidos:r,convRate:t?r/t:0,won:s.length,lost:i.length,winRate:c?s.length/c:0,wonValue:o}}function ax(n,e){const t=e.filter(Fd),r=n.filter(i=>!Ps(i.status)),s=r.filter(i=>{const o=ay(i);return!o.closed&&(o.state==="warn"||o.state==="late")}).length;return{leadsActive:r.length,dealsOpen:t.length,pipelineWeighted:my(t),slaRisk:s}}function cx(n,e){const t=new Set(e.filter(Cc).map(d=>d.id)),r=n.filter(d=>d.status==="contactado"||d.status==="calificado"||d.status==="convertido"),s=n.filter(d=>d.status==="calificado"||d.status==="convertido"),i=n.filter(Ud),o=i.filter(d=>d.convertedTo&&t.has(d.convertedTo.dealId)),c=n.length||1,u=[{key:"leads",label:"Leads",count:n.length},{key:"contactados",label:"Contactados",count:r.length},{key:"calificados",label:"Calificados",count:s.length},{key:"convertidos",label:"Convertidos",count:i.length},{key:"ganados",label:"Ganados",count:o.length}];return u.map((d,f)=>({...d,pctTop:d.count/c,convFromPrev:f===0?1:u[f-1].count?d.count/u[f-1].count:0}))}function lx(n,e){const t={},r=s=>t[s.key]||(t[s.key]={key:s.key,label:s.label,icon:s.icon,leads:0,convertidos:0,deals:0,won:0,revenue:0});return n.forEach(s=>{const i=r(qi(s));i.leads++,Ud(s)&&i.convertidos++}),e.forEach(s=>{const i=r(qi(s));i.deals++,Cc(s)&&(i.won++,i.revenue+=Number(s.amount)||0)}),Object.values(t).map(s=>({...s,convRate:s.leads?s.convertidos/s.leads:0})).sort((s,i)=>i.leads-s.leads||i.revenue-s.revenue)}function ux(n){const e=n.filter(Fd);return yi.map(t=>{const r=e.filter(s=>s.stageId===t.id);return{id:t.id,label:t.label,prob:t.prob,count:r.length,value:r.reduce((s,i)=>s+(Number(i.amount)||0),0),weighted:r.reduce((s,i)=>s+Md(i),0)}})}function dx(n,e,t=[]){const r={},s=(i,o)=>r[i]||(r[i]={ownerId:i,ownerName:o,leads:0,deals:0,won:0,lost:0,pipelineWeighted:0});return t.forEach(i=>s(i.uid,i.nombre)),n.forEach(i=>{const o=i.ownerId||"_none";s(o,i.ownerName||(o==="_none"?"Sin asignar":o)).leads++}),e.forEach(i=>{const o=i.ownerId||"_none",c=s(o,i.ownerName||(o==="_none"?"Sin asignar":o));c.deals++,Cc(i)?c.won++:xy(i)?c.lost++:Fd(i)&&(c.pipelineWeighted+=Md(i))}),Object.values(r).filter(i=>i.leads||i.deals).map(i=>({...i,winRate:i.won+i.lost?i.won/(i.won+i.lost):0})).sort((i,o)=>o.won-i.won||o.pipelineWeighted-i.pipelineWeighted||o.leads-i.leads)}function hx(n,e=30){const t=[],r={},s=new Date;for(let i=e-1;i>=0;i--){const o=new Date(s.getFullYear(),s.getMonth(),s.getDate()-i),c={key:zi(o),date:o,count:0};t.push(c),r[c.key]=c}return n.forEach(i=>{if(!i.createdAt)return;const o=r[zi(new Date(i.createdAt))];o&&o.count++}),t}function fx(n){const e=new Date(n);return Number.isNaN(e.getTime())?"":e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")}function px(n=6){const e=[],t=new Date;for(let r=0;r<n;r++){const s=new Date(t.getFullYear(),t.getMonth()-r,1),i=s.getFullYear()+"-"+String(s.getMonth()+1).padStart(2,"0"),o=s.toLocaleDateString("es-CO",{month:"long",year:"numeric"});e.push({key:i,label:o.charAt(0).toUpperCase()+o.slice(1)})}return e}function mx(n,e,t=[]){const r=(n||[]).filter(i=>i.status==="won"&&fx(i.wonAt||i.lastActivityAt)===e),s={};return r.forEach(i=>{const o=i.commissionSnapshot||{},c=o.ownerId||i.ownerId||"_none",u=(t.find(g=>g.uid===c)||{}).nombre,d=s[c]||(s[c]={ownerId:c,ownerName:u||i.ownerName||(c==="_none"?"Sin asignar":c),vendidos:0,liquidables:0,pendientes:0,baseLiquidable:0,basePendiente:0,deals:[]}),f=Number(o.amount!=null?o.amount:i.amount)||0,p=_y(i);d.vendidos++,p?(d.liquidables++,d.baseLiquidable+=f):(d.pendientes++,d.basePendiente+=f),d.deals.push({id:i.id,name:i.name||"",base:f,liquidable:p,tipoPago:o.tipoPago||i.tipoPago||""})}),Object.values(s).sort((i,o)=>o.baseLiquidable-i.baseLiquidable||o.vendidos-i.vendidos)}const am=[{value:0,label:"Hoy"},{value:7,label:"7 días"},{value:30,label:"30 días"},{value:90,label:"90 días"},{value:null,label:"Todo"}];function gx(n){if(n==null)return null;const e=new Date;return new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime()-n*864e5}const Ny=n=>({id:n.id,...n.data()});async function cm(n,e){return(await Yt(Je(Te(te,n),mt("createdAt","desc"),kt(e)))).docs.map(Ny)}async function _x({pageSize:n=500}={}){if(j.get().mock){const i=iu();return{leads:$a(),deals:i,wons:i.filter(o=>o.status==="won"),capped:!1}}const[e,t,r]=await Promise.all([cm("leads",n),cm("deals",n),Yt(Je(Te(te,"deals"),Bn("status","==","won"),mt("lastActivityAt","desc"),kt(300)))]);return{leads:e.filter(i=>!i.archived),deals:t,wons:r.docs.map(Ny),capped:e.length>=n||t.length>=n}}const vx="http://www.w3.org/2000/svg";function ml(n,e={},t=[]){const r=document.createElementNS(vx,n);for(const[s,i]of Object.entries(e))i==null||i===!1||r.setAttribute(s,String(i));for(const s of[].concat(t))s==null||s===!1||s===""||r.append(s.nodeType?s:document.createTextNode(String(s)));return r}function yx(n,e={}){const t=e.max!=null?e.max:Math.max(1,...n.map(s=>Number(s.value)||0)),r=l("div",{class:"reportes__bars",role:"list"});return n.forEach(s=>{const i=s.pct!=null?s.pct:t?(Number(s.value)||0)/t:0,o=Math.max(0,Math.min(100,i*100));r.append(l("div",{class:"reportes__bar",role:"listitem"},[l("span",{class:"reportes__bar-label u-truncate",text:s.label}),l("span",{class:"reportes__bar-track","aria-hidden":"true"},[l("span",{class:"reportes__bar-fill",style:{width:o+"%",background:s.color||"var(--grad-gold)"}})]),l("span",{class:"reportes__bar-val u-mono",text:s.display!=null?s.display:String(s.value)})]))}),r}function bx(n){const s=n.map(I=>Number(I.value)||0),i=Math.max(...s,0),o=Math.max(1,i),c=n.length,u=I=>c<=1?600/2:6+I*(600-2*6)/(c-1),d=I=>134-I/o*(140-2*6),f=n.map((I,S)=>`${u(S).toFixed(1)},${d(s[S]).toFixed(1)}`).join(" "),p=`6,134 ${f} ${594 .toFixed(1)},134`,g=s.reduce((I,S)=>I+S,0),v=(n[s.indexOf(i)]||{}).label||"";return ml("svg",{class:"reportes__spark",viewBox:"0 0 600 140",preserveAspectRatio:"none",role:"img","aria-label":`Tendencia: ${g} en total; pico de ${i}${v?" el "+v:""}.`},[ml("polygon",{points:p,fill:"var(--gold-300)",opacity:"0.30"}),ml("polyline",{points:f,fill:"none",stroke:"var(--gold-500)","stroke-width":"2","stroke-linejoin":"round","stroke-linecap":"round","vector-effect":"non-scaling-stroke"})])}const Ct=n=>Math.round((n||0)*100)+"%",bt=n=>rr(n)||"$0",gl=n=>`${n.getDate()}/${n.getMonth()+1}`;function wx(n){const e=px(6),t={leads:[],deals:[],wons:[],loading:!0,error:null,capped:!1,days:30,month:e[0].key};let r=!0;const s=l("div",{class:"reportes__chips",role:"group","aria-label":"Período"}),i=l("button",{class:"btn btn--soft btn--sm",type:"button"},["↻ Actualizar"]),o=l("button",{class:"btn btn--soft btn--sm",type:"button"},["⤓ CSV"]);i.addEventListener("click",R),o.addEventListener("click",b);const c=l("div",{class:"reportes__toolbar"},[s,l("div",{class:"u-row u-row--tight"},[i,o])]),u=l("div",{class:"reportes__body"}),d=l("section",{class:"reportes"},[c,u]);pe(n),n.append(d);function f(){pe(s),am.forEach(w=>{const C=t.days===w.value,E=l("button",{class:"chip",type:"button","aria-pressed":C?"true":"false"},[w.label]);E.addEventListener("click",()=>{t.days=w.value,g()}),s.append(E)})}function p(){const w=gx(t.days),C=om(t.leads,w),E=om(t.deals,w);return{pLeads:C,pDeals:E,pk:ox(C,E),ck:ax(t.leads,t.deals),fn:cx(C,t.deals),src:lx(C,E),stg:ux(t.deals),own:dx(C,E,j.get().mock?su():j.get().team||[]),tr:hx(t.leads,30),com:mx(t.wons,t.month,j.get().mock?su():j.get().team||[])}}function g(){if(f(),t.loading)return y();if(t.error)return T("⚠️","No se pudieron cargar los reportes",t.error);if(!t.leads.length&&!t.deals.length)return T("📊","Aún no hay datos para reportar","Cuando entren leads y oportunidades, aquí verás tus KPIs, el embudo y el rendimiento por fuente.");const w=p();pe(u),t.capped&&u.append(l("div",{class:"reportes__notice u-caption"},["ℹ️ Mostrando los registros más recientes (tope por carga). Los totales históricos completos llegarán con los reportes acumulados."])),u.append(v("Del período",[I("Leads nuevos",String(w.pk.leadsNew)),I("Tasa de conversión",Ct(w.pk.convRate),`${w.pk.convertidos} de ${w.pk.leadsNew}`),I("Win rate",Ct(w.pk.winRate),`${w.pk.won} ganadas · ${w.pk.lost} perdidas`),I("Valor ganado",bt(w.pk.wonValue),null,!0)]),v("Estado actual",[I("Leads activos",String(w.ck.leadsActive)),I("Oportunidades abiertas",String(w.ck.dealsOpen)),I("Pipeline ponderado",bt(w.ck.pipelineWeighted),null,!0),I("SLA en riesgo",String(w.ck.slaRisk),w.ck.slaRisk?"requieren atención":"al día")]),S(w.fn),A(w.src),O(w.stg),k(w.tr),x(w.own),F(w.com))}function v(w,C){return l("div",{class:"reportes__section"},[l("h2",{class:"reportes__sec-title",text:w}),l("div",{class:"reportes__kpis"},C)])}function I(w,C,E,le){return l("div",{class:"reportes__kpi"+(le?" reportes__kpi--hi":"")},[l("span",{class:"reportes__kpi-label u-caption u-faint",text:w}),l("strong",{class:"reportes__kpi-val",text:C}),E?l("span",{class:"reportes__kpi-sub u-caption u-faint",text:E}):null])}function S(w){const C=w.map((E,le)=>({label:E.label,value:E.count,pct:E.pctTop,display:le===0?String(E.count):`${E.count} · ${Ct(E.convFromPrev)}`,color:"var(--grad-gold)"}));return P("Embudo de ventas","De lead a venta — dónde se pierde el avance",yx(C,{max:w[0]?w[0].count:1}))}function A(w){const C=["Canal","Leads","Conv.","Oport.","Ganados","Ingresos"],E=w.map(fe=>[`${fe.icon||""} ${fe.label}`.trim(),String(fe.leads),Ct(fe.convRate),String(fe.deals),String(fe.won),bt(fe.revenue)]),le=w.length?null:"Sin leads en el período.";return P("Rendimiento por canal","Atribución de fuente: de dónde vienen y cuánto rinden",M(C,E,le))}function O(w){const C=["Etapa","Prob.","Oport.","Valor","Ponderado"],E=w.map(X=>[X.label,Ct(X.prob),String(X.count),bt(X.value),bt(X.weighted)]),le=w.reduce((X,ye)=>({count:X.count+ye.count,value:X.value+ye.value,weighted:X.weighted+ye.weighted}),{count:0,value:0,weighted:0}),fe=["Total","",String(le.count),bt(le.value),bt(le.weighted)];return P("Forecast por etapa","Pipeline abierto actual (no depende del período)",M(C,E,null,fe))}function k(w){const C=w.reduce((X,ye)=>X+ye.count,0),E=w.map(X=>({label:gl(X.date),value:X.count})),le=w.length?`${gl(w[0].date)} – ${gl(w[w.length-1].date)}`:"",fe=l("div",{class:"reportes__chart"},[bx(E),l("div",{class:"reportes__axis u-caption u-faint"},[l("span",{text:le}),l("span",{text:`${C} leads`})])]);return P("Tendencia de captación","Nuevos leads · últimos 30 días",fe)}function x(w){const C=["Asesor","Leads","Oport.","Ganados","Win rate","Pipeline pond."],E=w.map(fe=>[fe.ownerName,String(fe.leads),String(fe.deals),String(fe.won),Ct(fe.winRate),bt(fe.pipelineWeighted)]),le=w.length?null:"Sin actividad asignada en el período.";return P("Rendimiento del equipo","Por asesor, en el período seleccionado",M(C,E,le))}function F(w){const C=l("select",{class:"select","aria-label":"Mes de liquidación",style:{maxWidth:"220px"}},e.map(H=>{const z=l("option",{value:H.key},[H.label]);return H.key===t.month&&(z.selected=!0),z}));C.addEventListener("change",()=>{t.month=C.value,g()});const E=["Asesor","Vendidos","✓ Liquidables","Base liquidable","⏳ Pendientes","Base pendiente"],le=w.map(H=>[H.ownerName,String(H.vendidos),String(H.liquidables),bt(H.baseLiquidable),String(H.pendientes),bt(H.basePendiente)]),fe=w.reduce((H,z)=>({v:H.v+z.vendidos,l:H.l+z.liquidables,bl:H.bl+z.baseLiquidable,p:H.p+z.pendientes,bp:H.bp+z.basePendiente}),{v:0,l:0,bl:0,p:0,bp:0}),X=w.length?["Total",String(fe.v),String(fe.l),bt(fe.bl),String(fe.p),bt(fe.bp)]:null,ye=w.length?null:"Sin ventas ganadas en el mes seleccionado.",Be=w.flatMap(H=>H.deals.map(z=>[z.name||z.id,H.ownerName,bt(z.base),z.tipoPago||"—",z.liquidable?"✓ liquidable":"⏳ checklist pendiente"])),N=l("div",{},[l("div",{class:"u-row",style:{marginBottom:"10px"}},[C]),M(E,le,ye,X),Be.length?l("details",{style:{marginTop:"10px"}},[l("summary",{class:"u-caption u-muted",text:"Detalle por negocio ("+Be.length+")"}),M(["Negocio","Asesor","Base","Pago","Estado"],Be,null)]):null]);return P("Comisiones del mes",'"Si no está en el CRM, no entra a liquidación" — solo vendidos con checklist post-venta completo (F42)',N)}function P(w,C,E){return l("div",{class:"reportes__section"},[l("div",{class:"reportes__sec-head"},[l("h2",{class:"reportes__sec-title",text:w}),C?l("span",{class:"reportes__sec-cap u-caption u-faint",text:C}):null]),E])}function M(w,C,E,le){if(!C.length&&E)return l("div",{class:"reportes__empty u-caption u-faint",text:E});const fe=l("thead",{},[l("tr",{},w.map((Be,N)=>l("th",{class:N===0?"":"is-num",scope:"col",text:Be})))]),X=l("tbody",{},C.map(Be=>l("tr",{},Be.map((N,H)=>l("td",{class:H===0?"":"is-num",text:N}))))),ye=[fe,X];return le&&ye.push(l("tfoot",{},[l("tr",{},le.map((Be,N)=>N===0?l("th",{scope:"row",text:Be}):l("td",{class:"is-num",text:Be})))])),l("div",{class:"reportes__tablewrap"},[l("table",{class:"reportes__table"},ye)])}function T(w,C,E){pe(u),u.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:w}),l("div",{class:"state__title",text:C}),l("div",{class:"state__msg",text:E})]))}function y(){pe(u);const w=l("div",{class:"reportes__kpis"},[1,2,3,4].map(()=>l("div",{class:"reportes__kpi"},[l("span",{class:"skeleton",style:{width:"100%",height:"46px"}})])));u.append(l("div",{class:"reportes__section"},[w])),u.append(l("div",{class:"reportes__section"},[l("span",{class:"skeleton",style:{width:"100%",height:"160px"}})]))}function b(){if(t.loading||t.error){q("Aún no hay datos para exportar","info");return}const w=p(),C=(am.find(X=>X.value===t.days)||{}).label||"",E=[],le=X=>{E.push([]),E.push([X])};E.push(["Reporte Altorra CRM"]),E.push(["Período",C]),E.push(["Generado",new Date().toLocaleString("es-CO")]),le("KPIs del período"),E.push(["Métrica","Valor"]),E.push(["Leads nuevos",w.pk.leadsNew]),E.push(["Conversión",Ct(w.pk.convRate)]),E.push(["Win rate",Ct(w.pk.winRate)]),E.push(["Ganadas",w.pk.won]),E.push(["Perdidas",w.pk.lost]),E.push(["Valor ganado (COP)",w.pk.wonValue]),E.push(["Leads activos (ahora)",w.ck.leadsActive]),E.push(["Oportunidades abiertas (ahora)",w.ck.dealsOpen]),E.push(["Pipeline ponderado COP (ahora)",w.ck.pipelineWeighted]),E.push(["SLA en riesgo (ahora)",w.ck.slaRisk]),le("Embudo"),E.push(["Etapa","Cantidad","Conversión desde anterior"]),w.fn.forEach((X,ye)=>E.push([X.label,X.count,ye===0?"":Ct(X.convFromPrev)])),le("Rendimiento por canal"),E.push(["Canal","Leads","Conversión","Oportunidades","Ganados","Ingresos (COP)"]),w.src.forEach(X=>E.push([X.label,X.leads,Ct(X.convRate),X.deals,X.won,X.revenue])),le("Forecast por etapa (pipeline actual)"),E.push(["Etapa","Probabilidad","Oportunidades","Valor (COP)","Ponderado (COP)"]),w.stg.forEach(X=>E.push([X.label,Ct(X.prob),X.count,X.value,X.weighted])),le("Rendimiento del equipo"),E.push(["Asesor","Leads","Oportunidades","Ganados","Win rate","Pipeline ponderado (COP)"]),w.own.forEach(X=>E.push([X.ownerName,X.leads,X.deals,X.won,Ct(X.winRate),X.pipelineWeighted]));const fe=(e.find(X=>X.key===t.month)||{}).label||t.month;le("Comisiones del mes — "+fe+" (F42: solo checklist completo entra a liquidación)"),E.push(["Asesor","Vendidos","Liquidables","Base liquidable (COP)","Pendientes","Base pendiente (COP)"]),w.com.forEach(X=>E.push([X.ownerName,X.vendidos,X.liquidables,X.baseLiquidable,X.pendientes,X.basePendiente])),E.push([]),E.push(["Negocio","Asesor","Base (COP)","Pago","Estado"]),w.com.forEach(X=>X.deals.forEach(ye=>E.push([ye.name||ye.id,X.ownerName,ye.base,ye.tipoPago||"",ye.liquidable?"liquidable":"checklist pendiente"]))),Tx(`altorra-reportes-${zi(new Date)}.csv`,Ex(E)),q("Reporte exportado","ok")}async function R(){t.loading=!0,t.error=null,g();try{const w=await _x();if(!r)return;t.leads=w.leads,t.deals=w.deals,t.wons=w.wons||[],t.capped=!!w.capped,t.loading=!1}catch(w){if(!r)return;t.loading=!1,t.error=w&&w.code==="permission-denied"?"Sin permiso para ver los reportes.":"Revisa tu conexión e intenta de nuevo."}g()}return R(),function(){r=!1}}function Ix(n){let e=n==null?"":String(n);return/^[=+\-@\t\r]/.test(e)&&!/^-?\d+([.,]\d+)?$/.test(e)&&(e="'"+e),/[",\n\r;]/.test(e)?'"'+e.replace(/"/g,'""')+'"':e}function Ex(n){return"\uFEFF"+n.map(e=>e.map(Ix).join(",")).join(`\r
`)}function Tx(n,e){const t=new Blob([e],{type:"text/csv;charset=utf-8;"}),r=URL.createObjectURL(t),s=document.createElement("a");s.href=r,s.download=n,document.body.append(s),s.click(),s.remove(),setTimeout(()=>URL.revokeObjectURL(r),1e3)}function Dy(n,e){const t=String(n||"").trim();if(!t)return"";const r=t.replace(/[^\d+]/g,"").startsWith("+");let s=t.replace(/\D/g,"");if(!s)return"";const i=String(e||"").replace(/\D/g,"");return i&&!r&&!s.startsWith(i)?s=i+s:!i&&!r&&s.length===10&&s.startsWith("3")&&(s="57"+s),"+"+s}function lm(n){return String(n||"").replace(/[^a-z0-9]/gi,"_").slice(0,480)}function Ax({email:n,phone:e,prefijoPais:t}){const r=[],s=String(n||"").trim().toLowerCase();s&&r.push(lm("email:"+s));const i=Dy(e,t);return i&&r.push(lm("phone:"+i)),r}const ja=n=>({id:n.id,...n.data()});async function Rx({pageSize:n=500}={}){if(j.get().mock)return{contacts:aP(),leads:$a()};const[e,t]=await Promise.all([Yt(Je(Te(te,"contacts"),mt("createdAt","desc"),kt(n))).then(r=>r.docs.map(ja)),Yt(Je(Te(te,"leads"),mt("createdAt","desc"),kt(n))).then(r=>r.docs.map(ja))]);return{contacts:e.filter(r=>!r._mergedInto&&!r._suppressed),leads:t}}async function za(n){if(!n)return null;const e=await Lr(Ie(te,"contacts",n));return e.exists()?{id:e.id,...e.data()}:null}function Sx(n,e,t){const r=Je(Te(te,"activities"),Bn("relatedTo.id","==",n),mt("createdAt","desc"),kt(50));return Ut(r,s=>e(s.docs.map(ja)),s=>t&&t(s))}function kx(n,e,t){const r=Je(Te(te,"contacts",n,"crmNotes"),mt("createdAt","desc"),kt(50));return Ut(r,s=>e(s.docs.map(ja)),s=>t&&t(s))}async function Cx({email:n,phone:e},t){for(const r of Ax({email:n,phone:e})){const s=await Lr(Ie(te,"dedup",r));if(s.exists()&&s.data().contactId!==t)return{key:r,contactId:s.data().contactId}}return null}async function Px(n,e,t){const r=Ie(te,"contacts",n),s=async i=>{const o={...e,updatedAt:new Date().toISOString(),_version:i+1};return e.phone!==void 0&&(o.phone=Dy(e.phone,"+57")||null),Xe(r,o)};try{return await s(t._version||0),{ok:!0}}catch(i){if(!i||i.code!=="permission-denied")throw i;const o=await za(n);if(!o)throw i;if(Object.keys(e).some(u=>String(o[u]??"")!==String(t[u]??""))){const u=new Error("conflict");throw u.code="conflict",u.fresh=o,u}return await s(o._version||0),{ok:!0,retried:!0}}}async function xx(n,e){return(await Mr(Fr,"crmMergeContacts")({survivorId:n,mergedId:e})).data}async function Nx(n){return(await Mr(Fr,"crmSuppressContact")({contactId:n})).data}async function Dx(n){return(await Mr(Fr,"crmCancelSuppression")({contactId:n})).data}async function Vx(n,e){const t=j.get().user;await Ft(Te(te,"contacts",n,"crmNotes"),{body:String(e||"").trim(),authorId:t?t.uid:null,authorName:j.get().profile&&j.get().profile.nombre||t&&t.email||"Asesor",createdAt:new Date().toISOString()})}const Ox=[{id:"todos",label:"Todos"},{id:"lead",label:"Leads"},{id:"cliente",label:"Clientes"},{id:"suscriptor",label:"Suscriptores"}],Lx={lead:{label:"Lead",badge:"gold"},cliente:{label:"Cliente",badge:"ok"},suscriptor:{label:"Suscriptor",badge:"info"}};function um(n){const e=String(n.lifecycleStage||n.type||"").toLowerCase();return e==="subscriber"||e==="suscriptor"?"suscriptor":e==="customer"||e==="cliente"?"cliente":"lead"}function Mx(n){const e={contacts:[],leads:[],loading:!0,error:null,q:"",filter:"todos"};let t=!0;const r=l("input",{type:"search",placeholder:"Buscar por nombre, correo o teléfono…","aria-label":"Buscar contactos"});r.addEventListener("input",()=>{e.q=r.value,I()});const s=l("div",{class:"search"},[l("span",{"aria-hidden":"true",text:"🔎"}),r]),i={},o=l("div",{class:"contactos__chips",role:"group","aria-label":"Filtrar por tipo"});Ox.forEach(k=>{const x=l("button",{class:"chip",type:"button","aria-pressed":k.id===e.filter?"true":"false"},[k.label]);x.addEventListener("click",()=>{e.filter=k.id,Object.entries(i).forEach(([F,P])=>P.setAttribute("aria-pressed",F===k.id?"true":"false")),I()}),i[k.id]=x,o.append(x)});const c=l("span",{class:"contactos__count u-caption u-faint"}),u=l("button",{class:"btn btn--soft btn--sm",type:"button"},["↻ Actualizar"]);u.addEventListener("click",O);const d=l("div",{class:"contactos__toolbar"},[s,o,l("div",{class:"u-row u-row--tight"},[c,u])]),f=l("div",{class:"contactos__list"}),p=l("section",{class:"contactos"},[d,f]);pe(n),n.append(p);function g(){const k={};for(const x of e.leads){if(!x.contactId)continue;const F=k[x.contactId];(!F||new Date(x.createdAt)>new Date(F.createdAt))&&(k[x.contactId]=x)}return k}function v(k){j.set({leads:e.leads,detailLeadId:k.id})}function I(){if(e.loading)return A("⏳","Cargando contactos…","");if(e.error)return A("⚠️","No se pudieron cargar los contactos",e.error);if(!e.contacts.length)return A("👥","Aún no hay contactos","Cuando entren leads, registros de cuenta o suscripciones, las personas aparecerán aquí.");const k=g(),x=Ba(e.q),F=e.contacts.filter(P=>e.filter!=="todos"&&um(P)!==e.filter?!1:x?Ba(`${P.fullName||""} ${P.email||""} ${P.phone||""}`).includes(x):!0);if(c.textContent=`${F.length} de ${e.contacts.length}`,pe(f),!F.length){f.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"🔍"}),l("div",{class:"state__title",text:"Sin resultados"}),l("div",{class:"state__msg",text:"Prueba con otro término o filtro."})]));return}F.forEach(P=>f.append(S(P,k[P.id])))}function S(k,x){const F=um(k),P=Lx[F],M=qi(k),T=Number(k.score)>0&&us[k.rating],y=l("div",{class:"contact-row__badges"},[l("span",{class:`badge badge--${P.badge}`,text:P.label}),l("span",{class:"badge",text:`${M.icon} ${M.label}`}),T?l("span",{class:`temp ${us[k.rating].cls}`,text:`${us[k.rating].icon} ${k.score}`}):null]),b=[k.email,k.phone].filter(Boolean).join(" · ")||"Sin datos de contacto",R=Array.isArray(k.tags)&&k.tags.length?l("span",{class:"contact-row__tags u-caption u-faint u-truncate",text:"🏷️ "+k.tags.join(", ")}):null,w=[l("span",{class:"avatar avatar--sm","aria-hidden":"true",text:ks(k.fullName)}),l("div",{class:"contact-row__main"},[l("span",{class:"contact-row__name u-truncate",text:k.fullName||"Sin nombre"}),l("span",{class:"contact-row__sub u-caption u-faint u-truncate",title:b,text:b}),R]),y,l("span",{class:"contact-row__time u-caption u-faint",text:_r(k.lastActivityAt)})];if(x){const C=l("button",{class:"contact-row",type:"button","aria-label":`Ver ficha de ${k.fullName||"contacto"}`},w);return C.addEventListener("click",()=>v(x)),C}return l("div",{class:"contact-row contact-row--nolead"},w)}function A(k,x,F){c.textContent="",pe(f),f.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:k}),l("div",{class:"state__title",text:x}),F?l("div",{class:"state__msg",text:F}):null]))}async function O(){e.loading=!0,e.error=null,I();try{const k=await Rx();if(!t)return;e.contacts=k.contacts,e.leads=k.leads,e.loading=!1}catch(k){if(!t)return;e.loading=!1,e.error=k&&k.code==="permission-denied"?"Sin permiso para ver los contactos.":"Revisa tu conexión e intenta de nuevo."}I()}return O(),function(){t=!1}}function Fx(n,e,t){const r=l("div",{class:"modal"},[l("div",{class:"modal__head"},[l("h2",{class:"modal__title",text:n}),e?l("span",{class:"u-caption u-faint",text:e}):null]),...t]),s=l("div",{class:"modal-overlay"},[r]);document.body.appendChild(s);const i=()=>{s.remove(),window.removeEventListener("keydown",o)},o=c=>{c.key==="Escape"&&i()};return window.addEventListener("keydown",o),s.addEventListener("mousedown",c=>{c.target===s&&i()}),{close:i}}function Ux(n,{onChanged:e}={}){if(!n){q("El contacto aún no carga.","error");return}if(j.get().mock){q("En demo no se edita el directorio.","info");return}if(n._mergedInto){q("Este contacto está fusionado en otro.","info");return}const t=l("div",{class:"nl-form"}),r=l("div",{class:"login__error",role:"alert",hidden:!0}),s=S=>{r.textContent=S,r.hidden=!1},{close:i}=Fx("✏️ Editar contacto",n.fullName||"",[t]),o=n.suppressionStatus==="pendiente_supresion",c=l("input",{class:"input",type:"text",value:n.fullName||"",maxlength:"80"}),u=l("input",{class:"input",type:"email",value:n.email||"",placeholder:"correo@ejemplo.com"}),d=l("input",{class:"input",type:"tel",value:n.phone||"",placeholder:"+57 300 000 0000"}),f=l("button",{class:"btn btn--gold btn--sm",type:"button",text:"Guardar cambios"}),p=l("button",{class:"btn btn--ghost btn--sm",type:"button",text:"Cancelar"});p.addEventListener("click",i);async function g(S){r.hidden=!0;const A={};if(c.value.trim()!==(n.fullName||"")&&(A.fullName=c.value.trim()),u.value.trim().toLowerCase()!==(n.email||"")&&(A.email=u.value.trim().toLowerCase()||null),d.value.trim()!==(n.phone||"")&&(A.phone=d.value.trim()||null),!Object.keys(A).length){i();return}f.disabled=!0,f.textContent="Guardando…";try{if(A.email!==void 0||A.phone!==void 0){const O=await Cx({email:A.email!==void 0?A.email:n.email,phone:A.phone!==void 0?A.phone:n.phone},n.id);if(O)return f.disabled=!1,f.textContent="Guardar cambios",v(O)}await Px(n.id,A,S||n),q("✓ Contacto actualizado","ok"),i(),e&&e()}catch(O){if(f.disabled=!1,f.textContent="Guardar cambios",O&&O.code==="conflict"&&O.fresh){s("Alguien actualizó este contacto mientras editabas. Valores actuales: "+(O.fresh.fullName||"—")+" · "+(O.fresh.email||"sin email")+" · "+(O.fresh.phone||"sin tel")+'. Pulsa "Guardar" de nuevo para PISAR con lo tuyo, o Cancelar para conservar lo del server.'),f.disabled=!1,f.onclick=()=>g(O.fresh);return}s(O&&O.message||"No se pudo guardar.")}}f.addEventListener("click",()=>g(null));async function v(S){const A=await za(S.contactId).catch(()=>null),O=A&&A.fullName||S.contactId;if(!je("*")){s("Ese email/teléfono YA pertenece a otro contacto ("+O+"). Pídele al Super Admin fusionarlos — no se crean duplicados.");return}t.replaceChildren(l("p",{},["Ese dato ya pertenece a ",l("strong",{text:O}),". Son la misma persona → fusiónalos. Elige quién SOBREVIVE (el otro queda como histórico apuntando aquí):"]),r);const k=(x,F,P)=>{const M=l("button",{class:"btn btn--soft btn--sm",type:"button",text:x});return M.addEventListener("click",async()=>{if(confirm("¿Fusionar definitivamente? Re-apunta leads, negocios y notas. No se puede deshacer.")){M.disabled=!0;try{const T=await xx(F,P);q(`🔗 Fusionados: ${T.counts?T.counts.leads:0} lead(s), ${T.counts?T.counts.deals:0} negocio(s)`,"ok"),i(),e&&e()}catch(T){M.disabled=!1,s(T&&T.message||"No se pudo fusionar.")}}}),M};t.append(l("div",{class:"cita-actions"},[k("Sobrevive ESTE ("+(n.fullName||"actual")+")",n.id,S.contactId),k("Sobrevive el OTRO ("+O+")",S.contactId,n.id),l("button",{class:"btn btn--ghost btn--sm",type:"button",text:"Cancelar",onclick:i})]))}function I(){if(!je("crm.delete"))return null;const S=l("div",{class:"cfg-card",style:{borderColor:"var(--danger, #e5484d)"}});if(S.append(l("h3",{class:"cfg-card__title",text:"🛡 Privacidad (Ley 1581)"})),o){S.append(l("p",{class:"u-caption",text:"⏳ Supresión programada: se ejecuta el "+String(n.suppressionExecuteAfter||"").slice(0,16).replace("T"," ")+". Hasta entonces es reversible."}));const A=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"↩️ Cancelar supresión"});A.addEventListener("click",async()=>{A.disabled=!0;try{const O=await Dx(n.id);q(O.duplicates&&O.duplicates.length?"↩️ Supresión cancelada — OJO: nació un duplicado durante la espera, fusiónalos.":"↩️ Supresión cancelada","ok"),i(),e&&e()}catch(O){A.disabled=!1,s(O&&O.message||"No se pudo cancelar.")}}),S.append(A)}else{S.append(l("p",{class:"u-caption u-muted",text:"Derecho de supresión: borra los datos personales (nombre, contacto, notas) de forma DEFINITIVA tras 72h de gracia. El historial comercial (montos, fechas, carro) se conserva anónimo. Las copias ya enviadas por Telegram/email quedan fuera del alcance técnico."}));const A=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"🗑 Solicitar supresión definitiva…"});A.addEventListener("click",async()=>{const O=prompt("DOBLE CONFIRMACIÓN: escribe SUPRIMIR para programar el borrado de datos personales de "+(n.fullName||"este contacto")+" (72h de gracia, reversible hasta entonces).");if(O!=="SUPRIMIR"){O!==null&&q("Texto incorrecto — no se hizo nada.","info");return}A.disabled=!0;try{const k=await Nx(n.id);q("🛡 Supresión programada para "+String(k.executeAfter||"").slice(0,16).replace("T"," "),"ok"),i(),e&&e()}catch(k){A.disabled=!1,s(k&&k.message||"No se pudo programar.")}}),S.append(A)}return S}o?t.append(l("p",{class:"cita-conflict",text:"⏳ Este contacto tiene una supresión Ley 1581 programada — no se puede editar (cancélala primero si fue un error)."}),r,I(),l("div",{class:"nl-actions"},[p])):t.append(l("label",{class:"field"},[l("span",{class:"field__label",text:"Nombre"}),c]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Email"}),u]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Teléfono"}),d]),r,l("div",{class:"nl-actions"},[p,f]),I())}const Bx={solicitud_inbound:"📥",whatsapp:"💬",status_change:"🔁",nota:"🗒️",email:"✉️",llamada:"📞"};function $x(n){let e=null,t=null,r=null,s="resumen",i={lead:null,contact:null,activities:[],notes:[]};const o=l("aside",{class:"detail",role:"dialog","aria-modal":"true","aria-label":"Ficha del cliente"}),c=l("div",{class:"detail-overlay",hidden:!0},[o]);n.append(c),c.addEventListener("mousedown",P=>{P.target===c&&u()}),window.addEventListener("keydown",P=>{P.key==="Escape"&&e&&u()}),j.subscribe(P=>{P.detailLeadId!==e&&f(P.detailLeadId)});function u(){j.set({detailLeadId:null})}function d(){t&&(t(),t=null),r&&(r(),r=null)}function f(P){if(d(),e=P,!P){c.hidden=!0,document.body.classList.remove("has-detail"),pe(o);return}s="resumen",c.hidden=!1,document.body.classList.add("has-detail"),p(P)}function p(P){const M=(j.get().leads||[]).find(T=>T.id===P);if(i={lead:M||null,contact:null,activities:[],notes:[],loadError:null},g(),!!M)if(j.get().mock)i.contact=oP(M.contactId),i.activities=iP(P),i.notes=em(M.contactId),g();else{const T=y=>{i.loadError=y&&y.code==="permission-denied"?"Sin permiso de CRM (crm.read) para ver la ficha completa.":"No se pudo cargar parte de la ficha — revisa tu conexión.",g()};za(M.contactId).then(y=>{i.contact=y,g()}).catch(T),t=Sx(P,y=>{i.activities=y,g()},T),M.contactId&&(r=kx(M.contactId,y=>{i.notes=y,g()},T))}}function g(){pe(o);const P=i.lead;if(!P){o.append(v(null)),o.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"🔍"}),l("div",{class:"state__title",text:"Lead no disponible"}),l("div",{class:"state__msg",text:"Recarga la Bandeja e inténtalo otra vez."})]));return}o.append(v(P)),o.append(I());const M=l("div",{class:"detail__body"});i.loadError&&M.append(l("div",{class:"u-caption",role:"alert",style:{padding:"8px 12px",borderRadius:"8px",margin:"0 0 10px",background:"rgba(229,115,26,0.12)",border:"1px solid rgba(229,115,26,0.45)"},text:"⚠️ "+i.loadError})),s==="resumen"?M.append(S(P)):s==="comms"?M.append(O()):s==="score"?M.append(k(P)):s==="notas"&&M.append(x(P)),o.append(M)}function v(P){const M=l("button",{class:"icon-btn",type:"button","aria-label":"Cerrar"},["✕"]);if(M.addEventListener("click",u),!P)return l("div",{class:"detail__header"},[l("div",{class:"u-grow"}),M]);const T=F(P),y=us[T.rating],b=ia(P.status),R=kc(P),w=qi(P),C=l("button",{class:"btn btn--wa btn--sm",type:"button"},["💬 WhatsApp"]);C.addEventListener("click",()=>{const ye=iy(P.phone,`Hola ${String(P.fullName||"").split(" ")[0]||""}, te saluda Altorra Cars 👋`);if(!ye)return q("Sin teléfono","error");window.open(ye,"_blank","noopener")});const E=je("crm.edit"),le=E&&P.status!=="convertido"?l("button",{class:"btn btn--soft btn--sm",type:"button"},["🎯 Convertir"]):null;le&&le.addEventListener("click",()=>wy(P,{}));const fe=E?l("button",{class:"icon-btn",type:"button","aria-label":"Agendar cita",title:"Agendar cita"},["📅"]):null;fe&&fe.addEventListener("click",()=>rx(P,{}));const X=E?l("button",{class:"icon-btn",type:"button","aria-label":"Editar contacto",title:"Editar contacto"},["✏️"]):null;return X&&X.addEventListener("click",()=>Ux(i.contact,{onChanged:()=>{P.contactId&&za(P.contactId).then(ye=>{i.contact=ye,g()}).catch(()=>q("No se pudo recargar el contacto","error"))}})),l("div",{class:"detail__header"},[l("div",{class:"u-row u-grow",style:{minWidth:"0"}},[l("span",{class:"avatar","aria-hidden":"true",text:ks(P.fullName)}),l("div",{class:"u-grow",style:{minWidth:"0"}},[l("h2",{class:"detail__name u-truncate",text:P.fullName}),l("div",{class:"u-row u-row--tight",style:{flexWrap:"wrap"}},[l("span",{class:`temp ${y.cls}`,text:`${y.icon} ${y.label} · ${T.score}`}),l("span",{class:`badge badge--${b.badge||""}`.trim(),text:b.label}),l("span",{class:"badge",text:`${R.icon} ${R.label}`}),l("span",{class:"badge",text:`${w.icon} ${w.label}`})])])]),l("div",{class:"u-row u-row--tight"},[le,fe,X,C,M])])}function I(){const P=[["resumen","Resumen"],["comms","Comunicaciones"],["score","Score"],["notas","Notas"]],M=l("div",{class:"detail__tabs",role:"tablist"});return P.forEach(([T,y])=>{const b=l("button",{class:"detail__tab"+(s===T?" is-active":""),role:"tab","aria-selected":String(s===T),type:"button"},[y]);b.addEventListener("click",()=>{s=T,g()}),M.append(b)}),M}function S(P){const M=i.contact,T=M&&M.consent?M.consent:null,y=[["Correo",P.email||"—"],["Teléfono",P.phone||"—"],["Interés",P.sourceDetail||"—"],["Vehículo",P.vehicleOfInterestId||"—"],["Asesor",P.ownerName||"Sin asignar"],["Origen",P.source||"—"],["Capturado",vC(P.createdAt)],["Última actividad",_r(P.lastActivityAt)]],b=uy(P,{score:F(P).score});return l("div",{class:"u-stack"},[l("div",{class:"detail-card detail-card--nba"},[l("span",{class:"detail-card__icon","aria-hidden":"true",text:b.icon}),l("div",{class:"u-grow"},[l("div",{class:"u-caption u-muted",text:"Próxima mejor acción"}),l("strong",{text:b.label}),l("div",{class:"u-caption u-faint",text:b.reason})])]),l("dl",{class:"kv"},y.flatMap(([R,w])=>[l("dt",{text:R}),l("dd",{class:"u-truncate",text:w})])),T?A(T):null])}function A(P){const M=T=>T?"✅":"⛔";return l("div",{class:"detail-card"},[l("div",{class:"u-caption u-muted",text:"Consentimiento (Ley 1581)"}),l("div",{class:"u-row",style:{flexWrap:"wrap",gap:"12px"}},[l("span",{class:"u-caption",text:`${M(P.email)} Email`}),l("span",{class:"u-caption",text:`${M(P.whatsapp)} WhatsApp`}),l("span",{class:"u-caption",text:`${M(P.calls)} Llamadas`})]),l("div",{class:"u-caption u-faint",text:`Política ${P.policyVersion||"v1"} · origen ${P.source||"—"}`})])}function O(){if(!i.activities.length)return l("div",{class:"state"},[l("div",{class:"state__icon",text:"📭"}),l("div",{class:"state__title",text:"Sin comunicaciones"}),l("div",{class:"state__msg",text:"Aún no hay actividades registradas para este lead."})]);const P=l("ol",{class:"timeline"});return i.activities.forEach(M=>{P.append(l("li",{class:"timeline__item timeline__item--"+(M.direction||"inbound")},[l("span",{class:"timeline__icon","aria-hidden":"true",text:Bx[M.type]||"•"}),l("div",{class:"u-grow"},[l("div",{class:"u-spread"},[l("strong",{class:"u-truncate",text:M.subject||M.type||"Actividad"}),l("span",{class:"u-caption u-faint",text:_r(M.createdAt)})]),M.body?l("div",{class:"u-caption u-muted",text:M.body}):null])]))}),P}function k(P){const M=F(P),T=us[M.rating],y=Object.keys(Xp).map(b=>{const R=Math.round((M.factors[b]||0)*100);return l("div",{class:"factor"},[l("div",{class:"u-spread u-caption"},[l("span",{text:Xp[b]}),l("span",{class:"u-faint",text:`${R}% · peso ${Math.round(UC[b]*100)}%`})]),l("div",{class:"factor__track"},[l("div",{class:"factor__fill",style:{width:R+"%"}})])])});return l("div",{class:"u-stack"},[l("div",{class:"scorehero"},[l("div",{class:`scorehero__num ${T.cls}`,text:String(M.score)}),l("div",{class:"u-stack",style:{gap:"2px"}},[l("strong",{text:`${T.icon} ${T.label}`}),l("span",{class:"u-caption u-faint",text:"Heurística determinista (7 factores, sin IA)"})])]),l("div",{class:"u-stack",style:{gap:"10px"}},y)])}function x(P){const M=je("crm.edit")||je("crm.create"),T=l("textarea",{class:"textarea",placeholder:"Escribe una nota interna…",rows:"3"}),y=l("button",{class:"btn btn--gold btn--sm",type:"button"},["Agregar nota"]);y.addEventListener("click",async()=>{const R=T.value.trim();if(!R)return;y.disabled=!0;const w={body:R,authorName:"Tú",createdAt:new Date().toISOString()};try{j.get().mock?(cP(P.contactId,w),i.notes=em(P.contactId),g()):(await Vx(P.contactId,R),T.value=""),q("Nota agregada","ok")}catch{q("No se pudo guardar la nota","error")}finally{y.disabled=!1}});const b=l("div",{class:"u-stack"});return i.notes.length||b.append(l("div",{class:"u-caption u-faint",style:{padding:"8px 0"},text:"Aún no hay notas."})),i.notes.forEach(R=>b.append(l("div",{class:"detail-card"},[l("div",{class:"u-caption u-muted",text:R.body}),l("div",{class:"u-caption u-faint",text:`${R.authorName||"Asesor"} · ${_r(R.createdAt)}`})]))),l("div",{class:"u-stack"},[M?l("div",{class:"u-stack",style:{gap:"8px"}},[T,l("div",{class:"u-row",style:{justifyContent:"flex-end"}},[y])]):null,b])}function F(P){return ly(P,i.activities||[],i.contact)}}const Vy={days:[1,2,3,4,5,6],startHour:9,endHour:17,interval:60,maxPerSlot:1,bufferMin:15,blockedDates:[],blockedDateLabels:{},blockedHours:{}},qx=[["2026-01-01","Año Nuevo"],["2026-01-12","Reyes Magos"],["2026-03-23","San José"],["2026-04-02","Jueves Santo"],["2026-04-03","Viernes Santo"],["2026-05-01","Día del Trabajo"],["2026-05-18","Ascensión"],["2026-06-08","Corpus Christi"],["2026-06-15","Sagrado Corazón"],["2026-06-29","San Pedro y San Pablo"],["2026-07-20","Independencia"],["2026-08-07","Batalla de Boyacá"],["2026-08-17","Asunción de la Virgen"],["2026-10-12","Día de la Raza"],["2026-11-02","Todos los Santos"],["2026-11-16","Independencia de Cartagena"],["2026-12-08","Inmaculada Concepción"],["2026-12-25","Navidad"]],Oy=()=>Ie(te,"config","availability"),Ly=()=>Ie(te,"crm_config","advisorOverrides");function jx(n,e){return Ut(Oy(),t=>{n({...Vy,...t.exists()?t.data():{}})},t=>e&&e(t))}async function zx(n,e){await vd(Oy(),{...n,updatedAt:new Date().toISOString(),updatedBy:e||null},{merge:!0})}function Gx(n,e){return Ut(Ly(),t=>{n(t.exists()&&t.data().overrides||{})},t=>e&&e(t))}async function Hx(n,e){await vd(Ly(),{overrides:n,updatedAt:new Date().toISOString(),updatedBy:e||null})}const Kx=["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"],qo=()=>{const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`};function Wx(n){const e={av:{...Vy},overrides:{},advisors:[],sub:null,subOv:null,loaded:!1},t=je("calendar.config"),r=l("section",{class:"cfg"});if(pe(n),n.append(r),!t){r.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"🔒"}),l("div",{class:"state__title",text:"Sin permiso"}),l("div",{class:"state__msg",text:"Solo quien administra la disponibilidad (permiso calendar.config) puede editar esto."})]));return}async function s(g,v){if(j.get().mock){Object.assign(e.av,g),p(),q(v+" (demo)","ok");return}try{await zx(g,j.get().user&&j.get().user.uid),q(v,"ok")}catch(I){q("No se pudo guardar: "+(I.message||I.code),"error")}}function i(){const g=e.av,v=Kx.map((P,M)=>{const T=l("input",{type:"checkbox"});return T.checked=(g.days||[]).includes(M),T.dataset.dow=String(M),l("label",{class:"cfg-day"},[T,l("span",{text:P})])}),I=(P,M,T)=>{const y=l("select",{class:"select"});for(let b=M;b<=T;b++)y.append(l("option",{value:String(b),text:String(b).padStart(2,"0")+":00"}));return y.value=String(P),y},S=I(g.startHour,6,20),A=I(g.endHour,7,21),O=l("select",{class:"select"},[l("option",{value:"30",text:"Cada 30 min"}),l("option",{value:"60",text:"Cada hora"})]);O.value=String(g.interval||60);const k=l("input",{class:"input",type:"number",min:"1",max:"5",value:String(g.maxPerSlot||1)}),x=l("input",{class:"input",type:"number",min:"0",max:"60",step:"5",value:String(g.bufferMin!=null?g.bufferMin:15)}),F=l("button",{class:"btn btn--gold btn--sm",type:"button",text:"Guardar horario"});return F.addEventListener("click",()=>{const P=v.map(y=>y.querySelector("input")).filter(y=>y.checked).map(y=>parseInt(y.dataset.dow,10)).sort(),M=parseInt(S.value,10),T=parseInt(A.value,10);if(!P.length){q("Elige al menos un día.","error");return}if(M>=T){q("La hora de cierre debe ser mayor que la de apertura.","error");return}s({days:P,startHour:M,endHour:T,interval:parseInt(O.value,10)||60,maxPerSlot:Math.max(1,parseInt(k.value,10)||1),bufferMin:Math.max(0,parseInt(x.value,10)||0)},"✓ Horario guardado")}),l("div",{class:"cfg-card"},[l("h3",{class:"cfg-card__title",text:"🕘 Horario de atención"}),l("p",{class:"u-caption u-muted",text:"Esto es lo que el cliente ve en la web al pedir cita — los cambios aplican al instante."}),l("div",{class:"cfg-days"},v),l("div",{class:"cfg-grid"},[l("label",{class:"field"},[l("span",{class:"field__label",text:"Abre"}),S]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Cierra"}),A]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Citas web"}),O]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Citas por horario"}),k]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Colchón (min)"}),x])]),F])}function o(){const g=e.av,v=g.blockedDateLabels||{},I=qo(),S=l("div",{class:"cfg-chips"}),A=(g.blockedDates||[]).slice().sort();A.length||S.append(l("span",{class:"u-caption u-muted",text:"Sin fechas bloqueadas — la web ofrece todos los días laborales."})),A.forEach(P=>{const M=P<I,T=l("button",{class:"cfg-chip__x",type:"button","aria-label":"Quitar",text:"✕"});T.addEventListener("click",()=>{const y=A.filter(b=>b!==P);s({blockedDates:y,blockedDateLabels:{[P]:Lp()}},"✓ Fecha desbloqueada: "+P)}),S.append(l("span",{class:"cfg-chip"+(M?" is-past":"")},[l("span",{text:P+(v[P]?" · "+v[P]:"")}),T]))});const O=l("input",{class:"input",type:"date",min:I}),k=l("input",{class:"input",type:"text",placeholder:"Motivo (opcional)",maxlength:"40"}),x=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"Bloquear fecha"});x.addEventListener("click",()=>{const P=O.value;if(!P){q("Elige una fecha.","error");return}if(A.includes(P)){q("Esa fecha ya está bloqueada.","error");return}const M={...v};k.value.trim()&&(M[P]=k.value.trim()),s({blockedDates:[...A,P].sort(),blockedDateLabels:M},"✓ Fecha bloqueada: "+P)});const F=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"🇨🇴 Cargar festivos de Colombia 2026"});return F.addEventListener("click",()=>{const P=qx.filter(([T])=>T>=I&&!A.includes(T));if(!P.length){q("Los festivos que faltan de 2026 ya están cargados.","ok");return}const M={...v};P.forEach(([T,y])=>{M[T]=y}),s({blockedDates:[...A,...P.map(([T])=>T)].sort(),blockedDateLabels:M},`✓ ${P.length} festivo(s) bloqueados`)}),l("div",{class:"cfg-card"},[l("h3",{class:"cfg-card__title",text:"📅 Fechas bloqueadas (festivos y cierres)"}),l("p",{class:"u-caption u-muted",text:"En estas fechas la web NO ofrece citas. Las fechas pasadas se limpian solas cada madrugada."}),S,l("div",{class:"cfg-row"},[O,k,x]),F])}function c(){const g=e.av,v=[],I=g.interval||60;for(let S=g.startHour*60;S<g.endHour*60;S+=I)v.push(String(Math.floor(S/60)).padStart(2,"0")+":"+String(S%60).padStart(2,"0"));return v}function u(){const v=e.av.blockedHours||{},I=l("div",{class:"cfg-bh"}),S=Object.entries(v).sort(([x],[F])=>x.localeCompare(F));S.length||I.append(l("span",{class:"u-caption u-muted",text:"Sin horas bloqueadas."})),S.forEach(([x,F])=>{const P=(F||[]).slice().sort().map(M=>{const T=l("button",{class:"cfg-chip__x",type:"button",text:"✕"});return T.addEventListener("click",()=>{const y=(v[x]||[]).filter(b=>b!==M);s({blockedHours:{[x]:y.length?y:Lp()}},`✓ ${x} ${M} desbloqueada`)}),l("span",{class:"cfg-chip"},[l("span",{text:M}),T])});I.append(l("div",{class:"cfg-bh__day"},[l("strong",{text:x}),l("div",{class:"cfg-chips"},P)]))});const A=l("input",{class:"input",type:"date",min:qo()}),O=l("select",{class:"select"},c().map(x=>l("option",{value:x,text:x}))),k=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"Bloquear hora"});return k.addEventListener("click",()=>{const x=A.value,F=O.value;if(!x){q("Elige una fecha.","error");return}const P=v[x]||[];if(P.includes(F)){q("Esa hora ya está bloqueada.","error");return}s({blockedHours:{...v,[x]:[...P,F].sort()}},`✓ ${x} ${F} bloqueada`)}),l("div",{class:"cfg-card"},[l("h3",{class:"cfg-card__title",text:"⏰ Horas bloqueadas (un horario puntual)"}),I,l("div",{class:"cfg-row"},[A,O,k])])}async function d(g,v){if(j.get().mock){e.overrides=g,p(),q(v+" (demo)","ok");return}try{await Hx(g,j.get().user&&j.get().user.uid),q(v,"ok")}catch(I){q("No se pudo guardar: "+(I.message||I.code),"error")}}function f(){const g=e.overrides||{},v=l("div",{class:"cfg-advisors"});return e.advisors.length||v.append(l("span",{class:"u-caption u-muted",text:"Cargando asesores…"})),e.advisors.forEach(I=>{const S=g[I.uid],A=l("div",{class:"cfg-advisor"});if(A.append(l("div",{class:"cfg-advisor__name"},[l("strong",{text:I.nombre}),S?l("span",{class:"cfg-advisor__badge is-off",text:`🏖 ${S.reason||"ausente"} · ${S.from} → ${S.to}`}):l("span",{class:"cfg-advisor__badge",text:"✅ disponible"})])),S){const O=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"Quitar ausencia"});O.addEventListener("click",()=>{const k={...g};delete k[I.uid],d(k,`✓ ${I.nombre} disponible de nuevo`)}),A.append(O)}else{const O=l("input",{class:"input",type:"date",min:qo()}),k=l("input",{class:"input",type:"date",min:qo()}),x=l("select",{class:"select"},[l("option",{value:"vacaciones",text:"Vacaciones"}),l("option",{value:"incapacidad",text:"Incapacidad"}),l("option",{value:"otro",text:"Otro"})]),F=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"Marcar ausencia"});F.addEventListener("click",()=>{if(!O.value||!k.value||O.value>k.value){q("Revisa el rango de fechas.","error");return}d({...g,[I.uid]:{name:I.nombre,from:O.value,to:k.value,reason:x.value}},`✓ Ausencia de ${I.nombre} registrada`)}),A.append(l("div",{class:"cfg-row"},[O,k,x,F]))}v.append(A)}),l("div",{class:"cfg-card"},[l("h3",{class:"cfg-card__title",text:"👤 Excepciones por asesor"}),l("p",{class:"u-caption u-muted",text:"Un asesor ausente no recibe leads de la rotación ni citas confirmadas a su nombre en esas fechas."}),v])}function p(){pe(r),r.append(l("div",{class:"cfg-cols"},[i(),o()]),l("div",{class:"cfg-cols"},[u(),f()]))}return j.get().mock?(e.loaded=!0,p()):(e.sub=jx(g=>{e.av=g,e.loaded=!0,p()},()=>{q("No se pudo cargar la configuración.","error")}),e.subOv=Gx(g=>{e.overrides=g,e.loaded&&p()},()=>{})),Ry().then(g=>{e.advisors=g,e.loaded&&p()}),function(){e.sub&&e.sub(),e.sub=null,e.subOv&&e.subOv(),e.subOv=null}}function dn(n,e,t){try{if(j.get().mock)return;const r=j.get().user;Ft(Te(te,"auditLog"),{action:n,target:e||"",details:t||"",user:r&&r.email||"unknown",timestamp:new Date().toISOString()}).catch(()=>{})}catch{}}const dm={google_maps:"Google Maps",sitio_web:"Sitio Web",usuario_registrado:"Usuario Registrado"};function ca(n){return(n||"NN").split(" ").map(e=>e.charAt(0)).join("").substring(0,2).toUpperCase()}function Qx(n,e){const t=Je(Te(te,"resenas"),mt("createdAt","desc"));return Ut(t,r=>{n(r.docs.map(s=>({...s.data(),_docId:s.id})))},r=>e&&e(r))}async function Yx(n,e){const t=new Date().toISOString(),r={name:e.name,location:e.location||"Cartagena",rating:e.rating,vehicle:e.vehicle||"",text:e.text,source:e.source||"sitio_web",verified:!!e.verified,featured:!!e.featured,avatar:ca(e.name),updatedAt:t};n?(await Xe(Ie(te,"resenas",n),r),dn("review_update","resena "+r.name,r.name)):(r.createdAt=t,await Ft(Te(te,"resenas"),r),dn("review_create","resena "+r.name,r.name))}async function Jx(n,e){await yd(Ie(te,"resenas",n)),dn("review_delete","resena "+(e||n),"")}const Xx=[{_docId:"m1",name:"Carlos Pérez",location:"Cartagena",rating:5,vehicle:"Mazda CX-30 2023",text:"Excelente atención, el carro quedó impecable y el papeleo fue rapidísimo.",source:"google_maps",verified:!0,featured:!0,avatar:"CP",createdAt:"2026-06-01T10:00:00.000Z"},{_docId:"m2",name:"Laura Gómez",location:"Turbaco",rating:4,vehicle:"",text:"Buen servicio y asesoría honesta. El proceso de financiación tardó un poco.",source:"sitio_web",verified:!0,featured:!1,avatar:"LG",createdAt:"2026-05-20T15:30:00.000Z"},{_docId:"m3",name:"Andrés Llanos",location:"Cartagena",rating:5,vehicle:"Chevrolet Onix 2024",text:"Me recibieron mi carro usado como parte de pago sin vueltas. Recomendado.",source:"usuario_registrado",verified:!1,featured:!1,avatar:"AL",createdAt:"2026-05-02T09:10:00.000Z"}],Zx="★",eN="☆",hm=n=>Zx.repeat(Math.max(0,Math.min(5,n)))+eN.repeat(5-Math.max(0,Math.min(5,n)));function tN(n){const e={reviews:[],sub:null,loaded:!1},t=je("reviews.create"),r=je("reviews.edit"),s=je("reviews.delete"),i=l("section",{class:"rev"});pe(n),n.append(i);function o(p){const g=!!p,v={name:l("input",{class:"input",type:"text",maxlength:"80",placeholder:"Nombre del cliente *"}),location:l("input",{class:"input",type:"text",maxlength:"60",placeholder:"Ciudad (default: Cartagena)"}),rating:l("select",{class:"select"},[5,4,3,2,1].map(k=>l("option",{value:String(k),text:hm(k)+"  ("+k+")"}))),vehicle:l("input",{class:"input",type:"text",maxlength:"80",placeholder:"Vehículo (opcional)"}),text:l("textarea",{class:"input rev-modal__text",maxlength:"600",rows:"4",placeholder:"Texto de la reseña *"}),source:l("select",{class:"select"},Object.entries(dm).map(([k,x])=>l("option",{value:k,text:x}))),verified:l("input",{type:"checkbox"}),featured:l("input",{type:"checkbox"})};g?(v.name.value=p.name||"",v.location.value=p.location||"",v.rating.value=String(parseInt(p.rating,10)||5),v.vehicle.value=p.vehicle||"",v.text.value=p.text||"",v.source.value=p.source||"sitio_web",v.verified.checked=p.verified!==!1,v.featured.checked=!!p.featured):(v.source.value="sitio_web",v.verified.checked=!0);const I=l("button",{class:"btn btn--gold",type:"button",text:g?"Guardar cambios":"Crear reseña"}),S=l("button",{class:"btn btn--soft",type:"button",text:"Cancelar"}),A=l("div",{class:"rev-modal__overlay"},[l("div",{class:"rev-modal",role:"dialog","aria-modal":"true"},[l("h3",{class:"rev-modal__title",text:g?"Editar reseña":"Nueva reseña"}),l("div",{class:"rev-modal__grid"},[l("label",{class:"field"},[l("span",{class:"field__label",text:"Cliente *"}),v.name]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Ubicación"}),v.location]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Calificación"}),v.rating]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Vehículo"}),v.vehicle])]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Reseña *"}),v.text]),l("div",{class:"rev-modal__grid"},[l("label",{class:"field"},[l("span",{class:"field__label",text:"Fuente"}),v.source]),l("label",{class:"rev-check"},[v.verified,l("span",{text:"Verificada (cliente real)"})]),l("label",{class:"rev-check"},[v.featured,l("span",{text:"⭐ Destacada en el sitio"})])]),l("div",{class:"rev-modal__actions"},[S,I])])]),O=()=>A.remove();S.addEventListener("click",O),A.addEventListener("click",k=>{k.target===A&&O()}),I.addEventListener("click",async()=>{const k=v.name.value.trim(),x=v.text.value.trim();if(!k||!x){q("Completa nombre y texto de la reseña.","error");return}const F={name:k,text:x,location:v.location.value.trim(),rating:parseInt(v.rating.value,10)||5,vehicle:v.vehicle.value.trim(),source:v.source.value,verified:v.verified.checked,featured:v.featured.checked};if(j.get().mock){if(g){const P=e.reviews.findIndex(M=>M._docId===p._docId);P>=0&&(e.reviews[P]={...e.reviews[P],...F,avatar:ca(k)})}else e.reviews.unshift({...F,_docId:"m"+Date.now(),avatar:ca(k),createdAt:new Date().toISOString()});f(),O(),q(g?"Reseña actualizada (demo)":"Reseña creada (demo)","ok");return}I.disabled=!0,I.textContent="Guardando…";try{await Yx(g?p._docId:null,F),O(),q(g?"✓ Reseña actualizada":"✓ Reseña creada — ya está en el sitio","ok")}catch(P){I.disabled=!1,I.textContent=g?"Guardar cambios":"Crear reseña",q("No se pudo guardar: "+(P.message||P.code),"error")}}),document.body.append(A),v.name.focus()}function c(p){const g=l("button",{class:"btn btn--danger",type:"button",text:"Eliminar definitivamente"}),v=l("button",{class:"btn btn--soft",type:"button",text:"Cancelar"}),I=l("div",{class:"rev-modal__overlay"},[l("div",{class:"rev-modal rev-modal--sm",role:"alertdialog","aria-modal":"true"},[l("h3",{class:"rev-modal__title",text:"¿Eliminar esta reseña?"}),l("p",{class:"u-caption u-muted",text:`"${(p.text||"").slice(0,120)}…" — ${p.name}. Desaparece del sitio público al instante. No se puede deshacer.`}),l("div",{class:"rev-modal__actions"},[v,g])])]),S=()=>I.remove();v.addEventListener("click",S),I.addEventListener("click",A=>{A.target===I&&S()}),g.addEventListener("click",async()=>{if(j.get().mock){e.reviews=e.reviews.filter(A=>A._docId!==p._docId),f(),S(),q("Reseña eliminada (demo)","ok");return}g.disabled=!0;try{await Jx(p._docId,p.name),S(),q("✓ Reseña eliminada","ok")}catch(A){g.disabled=!1,q("No se pudo eliminar: "+(A.message||A.code),"error")}}),document.body.append(I)}function u(){const p=e.reviews.length,g=p?(e.reviews.reduce((S,A)=>S+(parseInt(A.rating,10)||0),0)/p).toFixed(1):"0.0",v=e.reviews.filter(S=>S.featured).length,I=t?l("button",{class:"btn btn--gold btn--sm",type:"button",text:"＋ Nueva reseña"}):null;return I&&I.addEventListener("click",()=>o(null)),l("div",{class:"rev-head"},[l("div",{class:"rev-stats"},[l("div",{class:"rev-stat"},[l("strong",{text:String(p)}),l("span",{class:"u-caption u-muted",text:"reseñas"})]),l("div",{class:"rev-stat"},[l("strong",{text:g+" ★"}),l("span",{class:"u-caption u-muted",text:"promedio"})]),l("div",{class:"rev-stat"},[l("strong",{text:String(v)}),l("span",{class:"u-caption u-muted",text:"destacadas"})])]),I])}function d(p){const g=[];if(r){const v=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"✏️ Editar"});v.addEventListener("click",()=>o(p)),g.push(v)}if(s){const v=l("button",{class:"btn btn--soft btn--sm rev-card__del",type:"button",text:"🗑","aria-label":"Eliminar"});v.addEventListener("click",()=>c(p)),g.push(v)}return l("article",{class:"rev-card"},[l("div",{class:"rev-card__top"},[l("span",{class:"avatar avatar--sm","aria-hidden":"true",text:p.avatar||ca(p.name)}),l("div",{class:"rev-card__who"},[l("strong",{class:"u-truncate",text:(p.name||"")+(p.verified?" ✔":"")}),l("span",{class:"u-caption u-faint",text:p.location||"—"})]),l("span",{class:"rev-card__stars","aria-label":(p.rating||0)+" de 5",text:hm(parseInt(p.rating,10)||0)})]),p.text?l("p",{class:"rev-card__text",text:"“"+p.text+"”"}):null,l("div",{class:"rev-card__meta"},[p.vehicle?l("span",{class:"chip",text:"🚗 "+p.vehicle}):null,l("span",{class:"chip",text:dm[p.source]||p.source||"—"}),p.featured?l("span",{class:"chip chip--gold",text:"⭐ Destacada"}):null]),g.length?l("div",{class:"rev-card__actions"},g):null])}function f(){if(pe(i),i.append(u()),!e.loaded){i.append(l("div",{class:"state"},[l("div",{class:"state__msg",text:"Cargando reseñas…"})]));return}if(!e.reviews.length){i.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"💬"}),l("div",{class:"state__title",text:"Sin reseñas"}),l("div",{class:"state__msg",text:t?'Agrega la primera con "＋ Nueva reseña".':"Aún no hay reseñas registradas."})]));return}i.append(l("div",{class:"rev-grid"},e.reviews.map(d)))}return j.get().mock?(e.reviews=Xx.map(p=>({...p})),e.loaded=!0,f()):(f(),e.sub=Qx(p=>{e.reviews=p,e.loaded=!0,f()},()=>q("No se pudieron cargar las reseñas.","error"))),function(){e.sub&&e.sub(),e.sub=null}}function My(n,{maxWidth:e=1920,quality:t=.85}={}){return new Promise((r,s)=>{const i=URL.createObjectURL(n),o=new Image;o.onload=()=>{URL.revokeObjectURL(i);const c=Math.min(1,e/o.naturalWidth),u=Math.round(o.naturalWidth*c),d=Math.round(o.naturalHeight*c),f=document.createElement("canvas");f.width=u,f.height=d,f.getContext("2d").drawImage(o,0,0,u,d),f.toBlob(p=>{p?r(p):s(new Error("No se pudo comprimir la imagen."))},"image/webp",t)},o.onerror=()=>{URL.revokeObjectURL(i),s(new Error("Archivo de imagen inválido."))},o.src=i})}const cu={promocional:{label:"Promocionales (home)",hint:"Franja entre secciones del home. La web muestra MÁXIMO 3 activos, en orden ascendente."},home_promo:{label:"Carrusel financiación (home)",hint:"Carrusel grande del home con cifra de tasa y pills. Todos los activos rotan, en orden."}};function nN(n,e){const t=Je(Te(te,"banners"),mt("order","asc"));return Ut(t,r=>{n(r.docs.map(s=>({...s.data(),_docId:s.id})).filter(s=>cu[s.position]))},r=>e&&e(r))}async function rN(n,e){if(!["image/jpeg","image/png","image/webp"].includes(n.type))throw new Error("Formato no válido. Usa JPG, PNG o WebP.");if(n.size>10*1024*1024)throw new Error("Imagen demasiado grande (máx 10MB).");e&&e("Comprimiendo a WebP…");const r=await My(n,{maxWidth:1920,quality:.85});e&&e("Subiendo…");const s=n.name.replace(/[^a-zA-Z0-9._-]/g,"_").replace(/\.[^.]+$/,""),i="banners/"+Date.now()+"_"+s+".webp",o=await ey(Nd(Dd,i),r,{contentType:"image/webp"});return ty(o.ref)}async function sN(n,e,t){const r=new Date().toISOString(),s=e._userEmail||"unknown",i={title:e.title,subtitle:e.subtitle||"",position:e.position,order:e.order||0,link:e.link||"",cta:e.cta||"",active:!!e.active,updatedAt:r,updatedBy:s,_version:n?(t&&t._version||0)+1:1};e.image&&(i.image=e.image),e.position==="home_promo"&&(i.badge=e.badge||"",i.eyebrow=e.eyebrow||"",i.rateValue=e.rateValue||"",i.rateLabel=e.rateLabel||"",i.pills=(e.pills||[]).map(o=>(o||"").trim()).filter(Boolean).slice(0,3)),n?(await Xe(Ie(te,"banners",n),i),dn("banner_update","banner",i.title)):(i.createdAt=r,i.createdBy=s,await Ft(Te(te,"banners"),i),dn("banner_create","banner",i.title))}async function iN(n){await Xe(Ie(te,"banners",n._docId),{active:!n.active,updatedAt:new Date().toISOString(),_version:(n._version||0)+1})}async function oN(n){if(await yd(Ie(te,"banners",n._docId)),dn("banner_delete","banner",n.title||n._docId),n.image&&n.image.indexOf("firebasestorage")!==-1)try{await Zk(Nd(Dd,n.image))}catch{}}const aN=[{_docId:"b1",title:"Feria de usados junio",subtitle:"Hasta 10% de descuento",position:"promocional",order:1,link:"busqueda.html",cta:"Ver ofertas",active:!0,image:"",_version:2,createdAt:"2026-06-01T10:00:00.000Z"},{_docId:"b2",title:"Financiación 90%",subtitle:"Tu carro con cuota inicial mínima",position:"home_promo",order:1,link:"simulador-credito.html",cta:"Simular crédito",active:!0,image:"",badge:"NUEVO",eyebrow:"Financiación ALTORRA",rateValue:"1.2%",rateLabel:"tasa mensual desde",pills:["Aprobación 24h","Sin codeudor","Tasa fija"],_version:1,createdAt:"2026-05-15T09:00:00.000Z"},{_docId:"b3",title:"Banner pausado",subtitle:"No visible en la web",position:"promocional",order:2,link:"",cta:"",active:!1,image:"",_version:1,createdAt:"2026-05-10T08:00:00.000Z"}];function cN(n){const e={banners:[],sub:null,loaded:!1},t=je("banners.create"),r=je("banners.edit"),s=je("banners.delete"),i=l("section",{class:"ban"});pe(n),n.append(i);function o(p){const g=!!p;let v=p&&p.image||"";const I={title:l("input",{class:"input",type:"text",maxlength:"90",placeholder:"Título *"}),subtitle:l("input",{class:"input",type:"text",maxlength:"140",placeholder:"Subtítulo"}),position:l("select",{class:"select"},Object.entries(cu).map(([b,R])=>l("option",{value:b,text:R.label}))),order:l("input",{class:"input",type:"number",min:"0",max:"99",value:"0"}),link:l("input",{class:"input",type:"text",maxlength:"200",placeholder:"Enlace (ej: busqueda.html)"}),cta:l("input",{class:"input",type:"text",maxlength:"40",placeholder:"Texto del botón"}),active:l("input",{type:"checkbox"}),badge:l("input",{class:"input",type:"text",maxlength:"20",placeholder:"Badge (ej: NUEVO)"}),eyebrow:l("input",{class:"input",type:"text",maxlength:"60",placeholder:"Antetítulo"}),rateValue:l("input",{class:"input",type:"text",maxlength:"12",placeholder:"Cifra (ej: 1.2%)"}),rateLabel:l("input",{class:"input",type:"text",maxlength:"40",placeholder:"Etiqueta de la cifra"}),pills:[0,1,2].map(b=>l("input",{class:"input",type:"text",maxlength:"30",placeholder:"Pill "+(b+1)}))},S=l("input",{type:"file",accept:"image/jpeg,image/png,image/webp",class:"ban-file"}),A=l("div",{class:"ban-drop"}),O=l("span",{class:"u-caption u-muted",text:""});function k(){pe(A),v?A.append(l("img",{src:v,alt:"Vista previa",class:"ban-drop__img"}),l("span",{class:"u-caption u-muted",text:"Click para cambiar la imagen"})):A.append(l("span",{text:"🖼️"}),l("span",{class:"u-caption u-muted",text:"Click para subir (JPG/PNG/WebP → se comprime a WebP). Recomendado 1200×400+."}))}k(),A.addEventListener("click",()=>S.click()),S.addEventListener("change",async()=>{const b=S.files&&S.files[0];if(S.value="",!!b){if(j.get().mock){v="data:demo",k(),q("Imagen simulada (demo)","ok");return}try{O.textContent="Comprimiendo…",v=await rN(b,R=>{O.textContent=R}),O.textContent="✓ Imagen subida",k()}catch(R){O.textContent="",q(R.message||"No se pudo subir la imagen.","error")}}});const x=l("div",{class:"ban-hp"},[l("p",{class:"u-caption u-muted",text:"Campos del carrusel de financiación:"}),l("div",{class:"ban-modal__grid"},[l("label",{class:"field"},[l("span",{class:"field__label",text:"Badge"}),I.badge]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Antetítulo"}),I.eyebrow]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Cifra"}),I.rateValue]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Etiqueta cifra"}),I.rateLabel])]),l("div",{class:"ban-modal__grid ban-modal__grid--3"},I.pills.map((b,R)=>l("label",{class:"field"},[l("span",{class:"field__label",text:"Pill "+(R+1)}),b])))]),F=()=>{x.style.display=I.position.value==="home_promo"?"":"none"};I.position.addEventListener("change",F),g?(I.title.value=p.title||"",I.subtitle.value=p.subtitle||"",I.position.value=p.position,I.position.disabled=!0,I.order.value=String(p.order||0),I.link.value=p.link||"",I.cta.value=p.cta||"",I.active.checked=p.active!==!1,I.badge.value=p.badge||"",I.eyebrow.value=p.eyebrow||"",I.rateValue.value=p.rateValue||"",I.rateLabel.value=p.rateLabel||"",(p.pills||[]).forEach((b,R)=>{I.pills[R]&&(I.pills[R].value=b)})):I.active.checked=!0,F();const P=l("button",{class:"btn btn--gold",type:"button",text:g?"Guardar cambios":"Crear banner"}),M=l("button",{class:"btn btn--soft",type:"button",text:"Cancelar"}),T=l("div",{class:"rev-modal__overlay"},[l("div",{class:"rev-modal",role:"dialog","aria-modal":"true"},[l("h3",{class:"rev-modal__title",text:g?"Editar banner":"Nuevo banner"}),A,S,O,l("div",{class:"ban-modal__grid"},[l("label",{class:"field"},[l("span",{class:"field__label",text:"Título *"}),I.title]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Subtítulo"}),I.subtitle]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Ubicación"}),I.position]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Orden (menor = primero)"}),I.order]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Enlace"}),I.link]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Botón (CTA)"}),I.cta])]),x,l("label",{class:"rev-check"},[I.active,l("span",{text:"Activo (visible en la web)"})]),l("div",{class:"rev-modal__actions"},[M,P])])]),y=()=>T.remove();M.addEventListener("click",y),T.addEventListener("click",b=>{b.target===T&&y()}),P.addEventListener("click",async()=>{const b=I.title.value.trim();if(!b){q("El título es obligatorio.","error");return}if(!g&&!v){q("Sube la imagen del banner.","error");return}const R={title:b,subtitle:I.subtitle.value.trim(),position:I.position.value,order:parseInt(I.order.value,10)||0,link:I.link.value.trim(),cta:I.cta.value.trim(),active:I.active.checked,image:!g||v!==p.image?v:"",badge:I.badge.value,eyebrow:I.eyebrow.value,rateValue:I.rateValue.value,rateLabel:I.rateLabel.value,pills:I.pills.map(w=>w.value),_userEmail:j.get().user&&j.get().user.email||"unknown"};if(j.get().mock){if(g){const w=e.banners.findIndex(C=>C._docId===p._docId);w>=0&&(e.banners[w]={...e.banners[w],...R,image:v,_version:(e.banners[w]._version||0)+1})}else e.banners.push({...R,image:v,_docId:"b"+Date.now(),_version:1}),e.banners.sort((w,C)=>(w.order||0)-(C.order||0));f(),y(),q(g?"Banner actualizado (demo)":"Banner creado (demo)","ok");return}P.disabled=!0,P.textContent="Guardando…";try{await sN(g?p._docId:null,R,p),y(),q(g?"✓ Banner actualizado":"✓ Banner creado — ya está en el home","ok")}catch(w){P.disabled=!1,P.textContent=g?"Guardar cambios":"Crear banner",q("No se pudo guardar: "+(w.message||w.code),"error")}}),document.body.append(T),I.title.focus()}function c(p){const g=l("button",{class:"btn btn--danger",type:"button",text:"Eliminar definitivamente"}),v=l("button",{class:"btn btn--soft",type:"button",text:"Cancelar"}),I=l("div",{class:"rev-modal__overlay"},[l("div",{class:"rev-modal rev-modal--sm",role:"alertdialog","aria-modal":"true"},[l("h3",{class:"rev-modal__title",text:"¿Eliminar este banner?"}),l("p",{class:"u-caption u-muted",text:`"${p.title}" desaparece de la web al instante (su imagen también se borra). No se puede deshacer — si solo quieres pausarlo, usa Ocultar.`}),l("div",{class:"rev-modal__actions"},[v,g])])]),S=()=>I.remove();v.addEventListener("click",S),I.addEventListener("click",A=>{A.target===I&&S()}),g.addEventListener("click",async()=>{if(j.get().mock){e.banners=e.banners.filter(A=>A._docId!==p._docId),f(),S(),q("Banner eliminado (demo)","ok");return}g.disabled=!0;try{await oN(p),S(),q("✓ Banner eliminado","ok")}catch(A){g.disabled=!1,q("No se pudo eliminar: "+(A.message||A.code),"error")}}),document.body.append(I)}function u(p){const g=[];if(r){const v=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"✏️ Editar"});v.addEventListener("click",()=>o(p));const I=l("button",{class:"btn btn--soft btn--sm",type:"button",text:p.active?"🙈 Ocultar":"👁 Mostrar"});I.addEventListener("click",async()=>{if(j.get().mock){p.active=!p.active,f(),q(p.active?"Banner visible (demo)":"Banner pausado (demo)","ok");return}try{await iN(p),q(p.active?"✓ Banner pausado":"✓ Banner visible","ok")}catch(S){q("No se pudo cambiar: "+(S.message||S.code),"error")}}),g.push(v,I)}if(s){const v=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"🗑","aria-label":"Eliminar"});v.addEventListener("click",()=>c(p)),g.push(v)}return l("article",{class:"ban-card"+(p.active?"":" is-off")},[l("div",{class:"ban-card__thumb"},[p.image&&p.image!=="data:demo"?l("img",{src:p.image,alt:p.title||"",loading:"lazy"}):l("span",{class:"u-caption u-faint",text:p.image==="data:demo"?"🖼️ (demo)":"Sin imagen"})]),l("div",{class:"ban-card__body"},[l("div",{class:"ban-card__head"},[l("span",{class:"chip"+(p.active?" chip--gold":""),text:p.active?"Activo":"Pausado"}),l("span",{class:"u-caption u-faint",text:"Orden "+(p.order||0)})]),l("strong",{class:"u-truncate",text:p.title||"Sin título"}),p.subtitle?l("span",{class:"u-caption u-muted u-truncate",text:p.subtitle}):null,g.length?l("div",{class:"ban-card__actions"},g):null])])}function d(p){const g=cu[p],v=e.banners.filter(S=>S.position===p),I=v.filter(S=>S.active).length;return l("div",{class:"ban-group"},[l("div",{class:"ban-group__head"},[l("h3",{class:"ban-group__title",text:g.label+` (${I} activos)`}),l("p",{class:"u-caption u-muted",text:g.hint})]),v.length?l("div",{class:"ban-grid"},v.map(u)):l("div",{class:"state"},[l("div",{class:"state__msg",text:"Sin banners en esta ubicación."})])])}function f(){pe(i);const p=t?l("button",{class:"btn btn--gold btn--sm",type:"button",text:"＋ Nuevo banner"}):null;if(p&&p.addEventListener("click",()=>o(null)),i.append(l("div",{class:"rev-head"},[l("span",{class:"u-caption u-muted",text:"Lo que ves aquí es lo que la web muestra — los cambios aplican al instante."}),p])),!e.loaded){i.append(l("div",{class:"state"},[l("div",{class:"state__msg",text:"Cargando banners…"})]));return}i.append(d("promocional"),d("home_promo"))}return j.get().mock?(e.banners=aN.map(p=>({...p})),e.loaded=!0,f()):(f(),e.sub=nN(p=>{e.banners=p,e.loaded=!0,f()},()=>q("No se pudieron cargar los banners.","error"))),function(){e.sub&&e.sub(),e.sub=null}}const Ga={};["Audi","BMW","Chevrolet","FIAT","Ford","Honda","Hyundai","Jeep","Kia","Mazda","Mitsubishi","Nissan","Renault","Suzuki","Toyota","Volkswagen"].forEach(n=>{Ga[n.toLowerCase()]="multimedia/Logos/"+n+".webp"});Ga.fiat="multimedia/Logos/FIAT.webp";function Fy(n){return n?(n.indexOf("multimedia/Logo/")===0&&(n=n.replace("multimedia/Logo/","multimedia/Logos/")),n.indexOf("multimedia/Logos/")>=0&&/\.png$/i.test(n)&&(n=n.replace(/\.png$/i,".webp")),n):""}function fm(n){const e=Fy(n.logo);if(e&&e.indexOf("http")===0)return e;if(e&&e.indexOf("multimedia/Logos/")>=0&&/\.webp$/i.test(e))return"/"+e.replace(/^\//,"");const t=Ga[n.id]||Ga[(n.nombre||"").toLowerCase()];return t?"/"+t:e||""}function ts(n){return n.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,"")}function lN(n,e){const t=Je(Te(te,"marcas"),mt("nombre","asc"));return Ut(t,r=>{n(r.docs.map(s=>({...s.data(),_docId:s.id})))},r=>e&&e(r))}async function uN(){const n=await Yt(Te(te,"vehiculos")),e={};return n.forEach(t=>{const r=t.data().marca;r&&(e[r]=(e[r]||0)+1)}),e}async function dN(n,e){if(!["image/jpeg","image/png","image/webp","image/svg+xml"].includes(n.type))throw new Error("Formato no válido. Usa JPG, PNG, WebP o SVG.");const r=n.name.replace(/[^a-zA-Z0-9._-]/g,"_").replace(/\.[^.]+$/,"");let s=n,i="svg";n.type!=="image/svg+xml"&&(e&&e("Comprimiendo a WebP…"),s=await My(n,{maxWidth:512,quality:.9}),i="webp"),e&&e("Subiendo logo…");const o="cars/brand_logo_"+Date.now()+"_"+r+"."+i,c=await ey(Nd(Dd,o),s,{contentType:i==="svg"?"image/svg+xml":"image/webp"});return ty(c.ref)}async function hN(n,e,t){const r=!!n,s=r?n:ts(e.nombre);if(!s)throw new Error("Nombre inválido.");const i={id:s,nombre:e.nombre,descripcion:e.nombre,logo:Fy(e.logo||""),updatedAt:new Date().toISOString(),updatedBy:e._userEmail||"unknown",_type:"marca",_version:r?(t&&t._version||0)+1:1};return r?(await Xe(Ie(te,"marcas",s),i),dn("brand_update","marca "+s,i.nombre)):(await vd(Ie(te,"marcas",s),i),dn("brand_create","marca "+s,i.nombre)),s}async function fN(n){await yd(Ie(te,"marcas",n._docId)),dn("brand_delete","marca "+n._docId,"")}const pN=[{_docId:"chevrolet",id:"chevrolet",nombre:"Chevrolet",descripcion:"Chevrolet",logo:"multimedia/Logos/Chevrolet.webp",_version:3},{_docId:"mazda",id:"mazda",nombre:"Mazda",descripcion:"Mazda",logo:"multimedia/Logos/Mazda.webp",_version:1},{_docId:"renault",id:"renault",nombre:"Renault",descripcion:"Renault",logo:"",_version:1}],mN={chevrolet:9,mazda:5,renault:0};function gN(n){const e={brands:[],counts:{},sub:null,loaded:!1},t=je("brands.create"),r=je("brands.edit"),s=je("brands.delete"),i=l("section",{class:"brd"});pe(n),n.append(i);function o(f){const p=!!f;let g=f&&f.logo||"";const v=l("input",{class:"input",type:"text",maxlength:"40",placeholder:"Nombre de la marca *"}),I=l("span",{class:"u-caption u-faint",text:p?"ID: "+f.id+" (fijo)":"ID: —"});p?v.value=f.nombre||"":v.addEventListener("input",()=>{I.textContent="ID: "+(ts(v.value)||"—")});const S=l("input",{type:"file",accept:"image/jpeg,image/png,image/webp,image/svg+xml",class:"ban-file"}),A=l("div",{class:"ban-drop brd-drop"}),O=l("span",{class:"u-caption u-muted",text:""});function k(){pe(A);const T=g?fm({id:p?f.id:ts(v.value),nombre:v.value,logo:g}):"";T&&T!=="data:demo"?A.append(l("img",{src:T,alt:"Logo",class:"brd-drop__img"}),l("span",{class:"u-caption u-muted",text:"Click para cambiar el logo"})):g==="data:demo"?A.append(l("span",{text:"🏷️ (demo)"})):A.append(l("span",{text:"🏷️"}),l("span",{class:"u-caption u-muted",text:"Click para subir logo (JPG/PNG/WebP/SVG → WebP 512px)"}))}k(),A.addEventListener("click",()=>S.click()),S.addEventListener("change",async()=>{const T=S.files&&S.files[0];if(S.value="",!!T){if(j.get().mock){g="data:demo",k(),q("Logo simulado (demo)","ok");return}try{g=await dN(T,y=>{O.textContent=y}),O.textContent="✓ Logo subido",k()}catch(y){O.textContent="",q(y.message||"No se pudo subir el logo.","error")}}});const x=l("button",{class:"btn btn--gold",type:"button",text:p?"Guardar cambios":"Crear marca"}),F=l("button",{class:"btn btn--soft",type:"button",text:"Cancelar"}),P=l("div",{class:"rev-modal__overlay"},[l("div",{class:"rev-modal rev-modal--sm",role:"dialog","aria-modal":"true"},[l("h3",{class:"rev-modal__title",text:p?"Editar marca: "+f.nombre:"Nueva marca"}),A,S,O,l("label",{class:"field"},[l("span",{class:"field__label",text:"Nombre *"}),v,I]),l("div",{class:"rev-modal__actions"},[F,x])])]),M=()=>P.remove();F.addEventListener("click",M),P.addEventListener("click",T=>{T.target===P&&M()}),x.addEventListener("click",async()=>{const T=v.value.trim();if(!T){q("El nombre es obligatorio.","error");return}if(!p&&e.brands.some(b=>b.id===ts(T))){q("Ya existe una marca con ese ID ("+ts(T)+").","error");return}const y={nombre:T,logo:g,_userEmail:j.get().user&&j.get().user.email||"unknown"};if(j.get().mock){if(p){const b=e.brands.findIndex(R=>R._docId===f._docId);b>=0&&(e.brands[b]={...e.brands[b],nombre:T,logo:g,_version:(e.brands[b]._version||0)+1})}else{const b=ts(T);e.brands.push({_docId:b,id:b,nombre:T,logo:g,_version:1}),e.brands.sort((R,w)=>R.nombre.localeCompare(w.nombre))}d(),M(),q(p?"Marca actualizada (demo)":"Marca creada (demo)","ok");return}x.disabled=!0,x.textContent="Guardando…";try{await hN(p?f._docId:null,y,f),M(),q(p?"✓ Marca actualizada":"✓ Marca creada","ok")}catch(b){x.disabled=!1,x.textContent=p?"Guardar cambios":"Crear marca",q("No se pudo guardar: "+(b.message||b.code),"error")}}),document.body.append(P),v.focus()}function c(f){const p=e.counts[f.id]||0,g=l("button",{class:"btn btn--danger",type:"button",text:"Eliminar definitivamente"}),v=l("button",{class:"btn btn--soft",type:"button",text:"Cancelar"}),I=l("div",{class:"rev-modal__overlay"},[l("div",{class:"rev-modal rev-modal--sm",role:"alertdialog","aria-modal":"true"},[l("h3",{class:"rev-modal__title",text:'¿Eliminar la marca "'+f.nombre+'"?'}),p>0?l("p",{class:"u-caption brd-warn",text:`⚠️ Hay ${p} vehículo(s) con esta marca — sus filtros y página de marca quedarían huérfanos. Reasigna o vende esos vehículos antes de borrar.`}):l("p",{class:"u-caption u-muted",text:"Sin vehículos asociados. Desaparece de los filtros públicos al instante."}),l("div",{class:"rev-modal__actions"},[v,g])])]),S=()=>I.remove();v.addEventListener("click",S),I.addEventListener("click",A=>{A.target===I&&S()}),g.addEventListener("click",async()=>{if(j.get().mock){e.brands=e.brands.filter(A=>A._docId!==f._docId),d(),S(),q("Marca eliminada (demo)","ok");return}g.disabled=!0;try{await fN(f),S(),q("✓ Marca eliminada","ok")}catch(A){g.disabled=!1,q("No se pudo eliminar: "+(A.message||A.code),"error")}}),document.body.append(I)}function u(f){const p=e.counts[f.id]||0,g=fm(f),v=[];if(r){const I=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"✏️","aria-label":"Editar"});I.addEventListener("click",()=>o(f)),v.push(I)}if(s){const I=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"🗑","aria-label":"Eliminar"});I.addEventListener("click",()=>c(f)),v.push(I)}return l("article",{class:"brd-card"},[l("div",{class:"brd-card__logo"},[g&&g!=="data:demo"?l("img",{src:g,alt:"",loading:"lazy"}):l("span",{class:"u-caption u-faint",text:"Sin logo"})]),l("strong",{class:"u-truncate",text:f.nombre}),l("span",{class:"u-caption u-muted",text:p+(p===1?" vehículo":" vehículos")}),v.length?l("div",{class:"brd-card__actions"},v):null])}function d(){pe(i);const f=t?l("button",{class:"btn btn--gold btn--sm",type:"button",text:"＋ Nueva marca"}):null;if(f&&f.addEventListener("click",()=>o(null)),i.append(l("div",{class:"rev-head"},[l("span",{class:"u-caption u-muted",text:e.brands.length+" marcas — alimentan los filtros y páginas de marca del sitio."}),f])),!e.loaded){i.append(l("div",{class:"state"},[l("div",{class:"state__msg",text:"Cargando marcas…"})]));return}if(!e.brands.length){i.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"🏷️"}),l("div",{class:"state__title",text:"Sin marcas"})]));return}i.append(l("div",{class:"brd-grid"},e.brands.map(u)))}return j.get().mock?(e.brands=pN.map(f=>({...f})),e.counts={...mN},e.loaded=!0,d()):(d(),e.sub=lN(f=>{e.brands=f,e.loaded=!0,d()},()=>q("No se pudieron cargar las marcas.","error")),uN().then(f=>{e.counts=f,e.loaded&&d()}).catch(()=>{})),function(){e.sub&&e.sub(),e.sub=null}}const Uy=document.getElementById("app");mb();const _N=new URLSearchParams(location.search).get("mock")==="1",vN={bandeja:Iy,pipeline:BP,agenda:sx,reportes:wx,contactos:Mx,config:Wx,resenas:tN,banners:cN,marcas:gN};let jo=null,ds=null,hr=null,lu=null,la=null;function pm(n){if(!ds||n===lu)return;hr&&(hr(),hr=null),j.get().detailLeadId&&j.set({detailLeadId:null}),hr=(vN[n]||Iy)(ds.outlet)||null,ds.setActive(n),lu=n}function yN(){ds=wC(Uy),$x(ds.detailRoot),pm(ny()),la=mC(pm)}function bN(){hr&&(hr(),hr=null),la&&(la(),la=null),ds=null,lu=null}function wN(n){n.ready&&(n.user&&jo!=="app"?(jo="app",yN()):!n.user&&jo!=="login"&&(bN(),jo="login",n.detailLeadId&&j.set({detailLeadId:null}),IC(Uy)))}j.subscribe(wN);_N?j.set({mock:!0,ready:!0,user:{uid:"u_ceo",email:"demo@altorra.local"},profile:{nombre:"Rodrigo (CEO)",cargo:"CEO",rol:"super_admin"},permissions:["*"]}):cC();
