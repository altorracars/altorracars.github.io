(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();function fy(n){let e={...n};const t=new Set;function r(){return e}function s(o){const c=typeof o=="function"?o(e):o;c&&(e={...e,...c},t.forEach(l=>l(e)))}function i(o){return t.add(o),()=>t.delete(o)}return{get:r,set:s,subscribe:i}}const G=fy({ready:!1,authError:null,user:null,profile:null,permissions:[],team:[],theme:"light",mock:!1,detailLeadId:null}),Dp="altorra-crm-theme";function py(){let n=localStorage.getItem(Dp);n!=="light"&&n!=="dark"&&(n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),document.documentElement.dataset.theme=n,G.set({theme:n})}function my(){const n=document.documentElement.dataset.theme==="dark"?"light":"dark";return document.documentElement.dataset.theme=n,localStorage.setItem(Dp,n),G.set({theme:n}),n}var ch={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vp=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},gy=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],o=n[t++],c=n[t++],l=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const i=n[t++],o=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},jl={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],o=s+1<n.length,c=o?n[s+1]:0,l=s+2<n.length,h=l?n[s+2]:0,p=i>>2,m=(i&3)<<4|c>>4;let g=(c&15)<<2|h>>6,E=h&63;l||(E=64,o||(g=64)),r.push(t[p],t[m],t[g],t[E])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Vp(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):gy(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const h=s<n.length?t[n.charAt(s)]:64;++s;const m=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||h==null||m==null)throw new _y;const g=i<<2|c>>4;if(r.push(g),h!==64){const E=c<<4&240|h>>2;if(r.push(E),m!==64){const S=h<<6&192|m;r.push(S)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class _y extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const vy=function(n){const e=Vp(n);return jl.encodeByteArray(e,!0)},Op=function(n){return vy(n).replace(/\./g,"")},Lp=function(n){try{return jl.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function Mp(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const yy=()=>Mp().__FIREBASE_DEFAULTS__,by=()=>{if(typeof process>"u"||typeof ch>"u")return;const n=ch.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},wy=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Lp(n[1]);return e&&JSON.parse(e)},ka=()=>{try{return yy()||by()||wy()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Fp=n=>{var e,t;return(t=(e=ka())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Iy=n=>{const e=Fp(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Up=()=>{var n;return(n=ka())===null||n===void 0?void 0:n.config},Bp=n=>{var e;return(e=ka())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class li{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function je(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Ey(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(je())}function Ty(){var n;const e=(n=ka())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Ay(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Sy(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Ry(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Cy(){const n=je();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function $p(){return!Ty()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Pa(){try{return typeof indexedDB=="object"}catch{return!1}}function ky(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Py="FirebaseError";class $t extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Py,Object.setPrototypeOf(this,$t.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ys.prototype.create)}}class ys{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?xy(i,r):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new $t(s,c,r)}}function xy(n,e){return n.replace(Ny,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Ny=/\{\$([^}]+)}/g;function Dy(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function ui(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],o=e[s];if(lh(i)&&lh(o)){if(!ui(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function lh(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Di(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Ks(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function Ws(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Vy(n,e){const t=new Oy(n,e);return t.subscribe.bind(t)}class Oy{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Ly(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=xc),s.error===void 0&&(s.error=xc),s.complete===void 0&&(s.complete=xc);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Ly(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function xc(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const My=1e3,Fy=2,Uy=4*60*60*1e3,By=.5;function $y(n,e=My,t=Fy){const r=e*Math.pow(t,n),s=Math.round(By*r*(Math.random()-.5)*2);return Math.min(Uy,r+s)}/**
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
 */function Ce(n){return n&&n._delegate?n._delegate:n}class Ut{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qy{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new li;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e?.identifier),s=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(zy(e))try{this.getOrInitializeService({instanceIdentifier:Kn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Kn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Kn){return this.instances.has(e)}getOptions(e=Kn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&o.resolve(s)}return s}onInit(e,t){var r;const s=this.normalizeInstanceIdentifier(t),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:jy(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Kn){return this.component?this.component.multipleInstances?e:Kn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function jy(n){return n===Kn?void 0:n}function zy(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gy{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new qy(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var me;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(me||(me={}));const Hy={debug:me.DEBUG,verbose:me.VERBOSE,info:me.INFO,warn:me.WARN,error:me.ERROR,silent:me.SILENT},Ky=me.INFO,Wy={[me.DEBUG]:"log",[me.VERBOSE]:"log",[me.INFO]:"info",[me.WARN]:"warn",[me.ERROR]:"error"},Qy=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=Wy[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class xa{constructor(e){this.name=e,this._logLevel=Ky,this._logHandler=Qy,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in me))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Hy[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,me.DEBUG,...e),this._logHandler(this,me.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,me.VERBOSE,...e),this._logHandler(this,me.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,me.INFO,...e),this._logHandler(this,me.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,me.WARN,...e),this._logHandler(this,me.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,me.ERROR,...e),this._logHandler(this,me.ERROR,...e)}}const Yy=(n,e)=>e.some(t=>n instanceof t);let uh,dh;function Jy(){return uh||(uh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Xy(){return dh||(dh=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const qp=new WeakMap,Jc=new WeakMap,jp=new WeakMap,Nc=new WeakMap,zl=new WeakMap;function Zy(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",o)},i=()=>{t(In(n.result)),s()},o=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&qp.set(t,n)}).catch(()=>{}),zl.set(e,n),e}function eb(n){if(Jc.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",o),n.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",o),n.addEventListener("abort",o)});Jc.set(n,e)}let Xc={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Jc.get(n);if(e==="objectStoreNames")return n.objectStoreNames||jp.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return In(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function tb(n){Xc=n(Xc)}function nb(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Dc(this),e,...t);return jp.set(r,e.sort?e.sort():[e]),In(r)}:Xy().includes(n)?function(...e){return n.apply(Dc(this),e),In(qp.get(this))}:function(...e){return In(n.apply(Dc(this),e))}}function rb(n){return typeof n=="function"?nb(n):(n instanceof IDBTransaction&&eb(n),Yy(n,Jy())?new Proxy(n,Xc):n)}function In(n){if(n instanceof IDBRequest)return Zy(n);if(Nc.has(n))return Nc.get(n);const e=rb(n);return e!==n&&(Nc.set(n,e),zl.set(e,n)),e}const Dc=n=>zl.get(n);function sb(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(n,e),c=In(o);return r&&o.addEventListener("upgradeneeded",l=>{r(In(o.result),l.oldVersion,l.newVersion,In(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{i&&l.addEventListener("close",()=>i()),s&&l.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const ib=["get","getKey","getAll","getAllKeys","count"],ob=["put","add","delete","clear"],Vc=new Map;function hh(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Vc.get(e))return Vc.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=ob.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||ib.includes(t)))return;const i=async function(o,...c){const l=this.transaction(o,s?"readwrite":"readonly");let h=l.store;return r&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),s&&l.done]))[0]};return Vc.set(e,i),i}tb(n=>({...n,get:(e,t,r)=>hh(e,t)||n.get(e,t,r),has:(e,t)=>!!hh(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ab{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(cb(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function cb(n){const e=n.getComponent();return e?.type==="VERSION"}const Zc="@firebase/app",fh="0.11.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jt=new xa("@firebase/app"),lb="@firebase/app-compat",ub="@firebase/analytics-compat",db="@firebase/analytics",hb="@firebase/app-check-compat",fb="@firebase/app-check",pb="@firebase/auth",mb="@firebase/auth-compat",gb="@firebase/database",_b="@firebase/data-connect",vb="@firebase/database-compat",yb="@firebase/functions",bb="@firebase/functions-compat",wb="@firebase/installations",Ib="@firebase/installations-compat",Eb="@firebase/messaging",Tb="@firebase/messaging-compat",Ab="@firebase/performance",Sb="@firebase/performance-compat",Rb="@firebase/remote-config",Cb="@firebase/remote-config-compat",kb="@firebase/storage",Pb="@firebase/storage-compat",xb="@firebase/firestore",Nb="@firebase/vertexai",Db="@firebase/firestore-compat",Vb="firebase",Ob="11.3.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const el="[DEFAULT]",Lb={[Zc]:"fire-core",[lb]:"fire-core-compat",[db]:"fire-analytics",[ub]:"fire-analytics-compat",[fb]:"fire-app-check",[hb]:"fire-app-check-compat",[pb]:"fire-auth",[mb]:"fire-auth-compat",[gb]:"fire-rtdb",[_b]:"fire-data-connect",[vb]:"fire-rtdb-compat",[yb]:"fire-fn",[bb]:"fire-fn-compat",[wb]:"fire-iid",[Ib]:"fire-iid-compat",[Eb]:"fire-fcm",[Tb]:"fire-fcm-compat",[Ab]:"fire-perf",[Sb]:"fire-perf-compat",[Rb]:"fire-rc",[Cb]:"fire-rc-compat",[kb]:"fire-gcs",[Pb]:"fire-gcs-compat",[xb]:"fire-fst",[Db]:"fire-fst-compat",[Nb]:"fire-vertex","fire-js":"fire-js",[Vb]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qo=new Map,Mb=new Map,tl=new Map;function ph(n,e){try{n.container.addComponent(e)}catch(t){Jt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Xt(n){const e=n.name;if(tl.has(e))return Jt.debug(`There were multiple attempts to register component ${e}.`),!1;tl.set(e,n);for(const t of Qo.values())ph(t,n);for(const t of Mb.values())ph(t,n);return!0}function bs(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Tt(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fb={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},En=new ys("app","Firebase",Fb);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ub{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Ut("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw En.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ws=Ob;function zp(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:el,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw En.create("bad-app-name",{appName:String(s)});if(t||(t=Up()),!t)throw En.create("no-options");const i=Qo.get(s);if(i){if(ui(t,i.options)&&ui(r,i.config))return i;throw En.create("duplicate-app",{appName:s})}const o=new Gy(s);for(const l of tl.values())o.addComponent(l);const c=new Ub(t,r,o);return Qo.set(s,c),c}function Gl(n=el){const e=Qo.get(n);if(!e&&n===el&&Up())return zp();if(!e)throw En.create("no-app",{appName:n});return e}function kt(n,e,t){var r;let s=(r=Lb[n])!==null&&r!==void 0?r:n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const c=[`Unable to register library "${s}" with version "${e}":`];i&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&c.push("and"),o&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Jt.warn(c.join(" "));return}Xt(new Ut(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const Bb="firebase-heartbeat-database",$b=1,di="firebase-heartbeat-store";let Oc=null;function Gp(){return Oc||(Oc=sb(Bb,$b,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(di)}catch(t){console.warn(t)}}}}).catch(n=>{throw En.create("idb-open",{originalErrorMessage:n.message})})),Oc}async function qb(n){try{const t=(await Gp()).transaction(di),r=await t.objectStore(di).get(Hp(n));return await t.done,r}catch(e){if(e instanceof $t)Jt.warn(e.message);else{const t=En.create("idb-get",{originalErrorMessage:e?.message});Jt.warn(t.message)}}}async function mh(n,e){try{const r=(await Gp()).transaction(di,"readwrite");await r.objectStore(di).put(e,Hp(n)),await r.done}catch(t){if(t instanceof $t)Jt.warn(t.message);else{const r=En.create("idb-set",{originalErrorMessage:t?.message});Jt.warn(r.message)}}}function Hp(n){return`${n.name}!${n.options.appId}`}/**
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
 */const jb=1024,zb=30;class Gb{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Kb(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=gh();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>zb){const o=Wb(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Jt.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=gh(),{heartbeatsToSend:r,unsentEntries:s}=Hb(this._heartbeatsCache.heartbeats),i=Op(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return Jt.warn(t),""}}}function gh(){return new Date().toISOString().substring(0,10)}function Hb(n,e=jb){const t=[];let r=n.slice();for(const s of n){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),_h(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),_h(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Kb{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Pa()?ky().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await qb(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return mh(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return mh(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function _h(n){return Op(JSON.stringify({version:2,heartbeats:n})).length}function Wb(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qb(n){Xt(new Ut("platform-logger",e=>new ab(e),"PRIVATE")),Xt(new Ut("heartbeat",e=>new Gb(e),"PRIVATE")),kt(Zc,fh,n),kt(Zc,fh,"esm2017"),kt("fire-js","")}Qb("");function Hl(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(t[r[s]]=n[r[s]]);return t}function Kp(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Yb=Kp,Wp=new ys("auth","Firebase",Kp());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yo=new xa("@firebase/auth");function Jb(n,...e){Yo.logLevel<=me.WARN&&Yo.warn(`Auth (${ws}): ${n}`,...e)}function ko(n,...e){Yo.logLevel<=me.ERROR&&Yo.error(`Auth (${ws}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xt(n,...e){throw Kl(n,...e)}function Lt(n,...e){return Kl(n,...e)}function Qp(n,e,t){const r=Object.assign(Object.assign({},Yb()),{[e]:t});return new ys("auth","Firebase",r).create(e,{appName:n.name})}function Tn(n){return Qp(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Kl(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Wp.create(n,...e)}function ae(n,e,...t){if(!n)throw Kl(e,...t)}function Kt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw ko(e),new Error(e)}function Zt(n,e){n||Kt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nl(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Xb(){return vh()==="http:"||vh()==="https:"}function vh(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zb(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Xb()||Sy()||"connection"in navigator)?navigator.onLine:!0}function ew(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vi{constructor(e,t){this.shortDelay=e,this.longDelay=t,Zt(t>e,"Short delay should be less than long delay!"),this.isMobile=Ey()||Ry()}get(){return Zb()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wl(n,e){Zt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yp{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Kt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Kt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Kt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tw={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nw=new Vi(3e4,6e4);function wr(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Vn(n,e,t,r,s={}){return Jp(n,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const c=Di(Object.assign({key:n.config.apiKey},o)).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const h=Object.assign({method:e,headers:l},i);return Ay()||(h.referrerPolicy="no-referrer"),Yp.fetch()(Xp(n,n.config.apiHost,t,c),h)})}async function Jp(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},tw),e);try{const s=new sw(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw ho(n,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[l,h]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw ho(n,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw ho(n,"email-already-in-use",o);if(l==="USER_DISABLED")throw ho(n,"user-disabled",o);const p=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Qp(n,p,h);xt(n,p)}}catch(s){if(s instanceof $t)throw s;xt(n,"network-request-failed",{message:String(s)})}}async function Na(n,e,t,r,s={}){const i=await Vn(n,e,t,r,s);return"mfaPendingCredential"in i&&xt(n,"multi-factor-auth-required",{_serverResponse:i}),i}function Xp(n,e,t,r){const s=`${e}${t}?${r}`;return n.config.emulator?Wl(n.config,s):`${n.config.apiScheme}://${s}`}function rw(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class sw{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Lt(this.auth,"network-request-failed")),nw.get())})}}function ho(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=Lt(n,e,r);return s.customData._tokenResponse=t,s}function yh(n){return n!==void 0&&n.enterprise!==void 0}class iw{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return rw(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function ow(n,e){return Vn(n,"GET","/v2/recaptchaConfig",wr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function aw(n,e){return Vn(n,"POST","/v1/accounts:delete",e)}async function Zp(n,e){return Vn(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ei(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function cw(n,e=!1){const t=Ce(n),r=await t.getIdToken(e),s=Ql(r);ae(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i?.sign_in_provider;return{claims:s,token:r,authTime:ei(Lc(s.auth_time)),issuedAtTime:ei(Lc(s.iat)),expirationTime:ei(Lc(s.exp)),signInProvider:o||null,signInSecondFactor:i?.sign_in_second_factor||null}}function Lc(n){return Number(n)*1e3}function Ql(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return ko("JWT malformed, contained fewer than 3 sections"),null;try{const s=Lp(t);return s?JSON.parse(s):(ko("Failed to decode base64 JWT payload"),null)}catch(s){return ko("Caught error parsing JWT payload as JSON",s?.toString()),null}}function bh(n){const e=Ql(n);return ae(e,"internal-error"),ae(typeof e.exp<"u","internal-error"),ae(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hi(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof $t&&lw(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function lw({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uw{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rl{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=ei(this.lastLoginAt),this.creationTime=ei(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Jo(n){var e;const t=n.auth,r=await n.getIdToken(),s=await hi(n,Zp(t,{idToken:r}));ae(s?.users.length,t,"internal-error");const i=s.users[0];n._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?em(i.providerUserInfo):[],c=hw(n.providerData,o),l=n.isAnonymous,h=!(n.email&&i.passwordHash)&&!c?.length,p=l?h:!1,m={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:c,metadata:new rl(i.createdAt,i.lastLoginAt),isAnonymous:p};Object.assign(n,m)}async function dw(n){const e=Ce(n);await Jo(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function hw(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function em(n){return n.map(e=>{var{providerId:t}=e,r=Hl(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fw(n,e){const t=await Jp(n,{},async()=>{const r=Di({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,o=Xp(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",Yp.fetch()(o,{method:"POST",headers:c,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function pw(n,e){return Vn(n,"POST","/v2/accounts:revokeToken",wr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){ae(e.idToken,"internal-error"),ae(typeof e.idToken<"u","internal-error"),ae(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):bh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){ae(e.length!==0,"internal-error");const t=bh(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(ae(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await fw(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,o=new Hr;return r&&(ae(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(ae(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(ae(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Hr,this.toJSON())}_performRefresh(){return Kt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dn(n,e){ae(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Wt{constructor(e){var{uid:t,auth:r,stsTokenManager:s}=e,i=Hl(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new uw(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new rl(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await hi(this,this.stsTokenManager.getToken(this.auth,e));return ae(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return cw(this,e)}reload(){return dw(this)}_assign(e){this!==e&&(ae(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Wt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){ae(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Jo(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Tt(this.auth.app))return Promise.reject(Tn(this.auth));const e=await this.getIdToken();return await hi(this,aw(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,s,i,o,c,l,h,p;const m=(r=t.displayName)!==null&&r!==void 0?r:void 0,g=(s=t.email)!==null&&s!==void 0?s:void 0,E=(i=t.phoneNumber)!==null&&i!==void 0?i:void 0,S=(o=t.photoURL)!==null&&o!==void 0?o:void 0,k=(c=t.tenantId)!==null&&c!==void 0?c:void 0,T=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,L=(h=t.createdAt)!==null&&h!==void 0?h:void 0,R=(p=t.lastLoginAt)!==null&&p!==void 0?p:void 0,{uid:N,emailVerified:B,isAnonymous:P,providerData:F,stsTokenManager:I}=t;ae(N&&I,e,"internal-error");const v=Hr.fromJSON(this.name,I);ae(typeof N=="string",e,"internal-error"),dn(m,e.name),dn(g,e.name),ae(typeof B=="boolean",e,"internal-error"),ae(typeof P=="boolean",e,"internal-error"),dn(E,e.name),dn(S,e.name),dn(k,e.name),dn(T,e.name),dn(L,e.name),dn(R,e.name);const w=new Wt({uid:N,auth:e,email:g,emailVerified:B,displayName:m,isAnonymous:P,photoURL:S,phoneNumber:E,tenantId:k,stsTokenManager:v,createdAt:L,lastLoginAt:R});return F&&Array.isArray(F)&&(w.providerData=F.map(A=>Object.assign({},A))),T&&(w._redirectEventId=T),w}static async _fromIdTokenResponse(e,t,r=!1){const s=new Hr;s.updateFromServerResponse(t);const i=new Wt({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Jo(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];ae(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?em(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!i?.length,c=new Hr;c.updateFromIdToken(r);const l=new Wt({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new rl(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(l,h),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wh=new Map;function Qt(n){Zt(n instanceof Function,"Expected a class definition");let e=wh.get(n);return e?(Zt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,wh.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tm{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}tm.type="NONE";const Ih=tm;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Po(n,e,t){return`firebase:${n}:${e}:${t}`}class Kr{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Po(this.userKey,s.apiKey,i),this.fullPersistenceKey=Po("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Wt._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Kr(Qt(Ih),e,r);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||Qt(Ih);const o=Po(r,e.config.apiKey,e.name);let c=null;for(const h of t)try{const p=await h._get(o);if(p){const m=Wt._fromJSON(e,p);h!==i&&(c=m),i=h;break}}catch{}const l=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new Kr(i,e,r):(i=l[0],c&&await i._set(o,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new Kr(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eh(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(im(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(nm(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(am(e))return"Blackberry";if(cm(e))return"Webos";if(rm(e))return"Safari";if((e.includes("chrome/")||sm(e))&&!e.includes("edge/"))return"Chrome";if(om(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function nm(n=je()){return/firefox\//i.test(n)}function rm(n=je()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function sm(n=je()){return/crios\//i.test(n)}function im(n=je()){return/iemobile/i.test(n)}function om(n=je()){return/android/i.test(n)}function am(n=je()){return/blackberry/i.test(n)}function cm(n=je()){return/webos/i.test(n)}function Yl(n=je()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function mw(n=je()){var e;return Yl(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function gw(){return Cy()&&document.documentMode===10}function lm(n=je()){return Yl(n)||om(n)||cm(n)||am(n)||/windows phone/i.test(n)||im(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function um(n,e=[]){let t;switch(n){case"Browser":t=Eh(je());break;case"Worker":t=`${Eh(je())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ws}/${r}`}/**
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
 */class _w{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((o,c)=>{try{const l=e(i);o(l)}catch(l){c(l)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
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
 */async function vw(n,e={}){return Vn(n,"GET","/v2/passwordPolicy",wr(n,e))}/**
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
 */const yw=6;class bw{constructor(e){var t,r,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:yw,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,s,i,o,c;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(r=l.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(s=l.containsLowercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(i=l.containsUppercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(o=l.containsNumericCharacter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(c=l.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),l}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ww{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Th(this),this.idTokenSubscription=new Th(this),this.beforeStateQueue=new _w(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Wp,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Qt(t)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await Kr.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Zp(this,{idToken:e}),r=await Wt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Tt(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=s?._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===c)&&l?.user&&(s=l.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return ae(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Jo(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=ew()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Tt(this.app))return Promise.reject(Tn(this));const t=e?Ce(e):null;return t&&ae(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&ae(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Tt(this.app)?Promise.reject(Tn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Tt(this.app)?Promise.reject(Tn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Qt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await vw(this),t=new bw(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new ys("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await pw(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Qt(e)||this._popupRedirectResolver;ae(t,this,"argument-error"),this.redirectPersistenceManager=await Kr.create(this,[Qt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(ae(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,r,s);return()=>{o=!0,l()}}else{const l=e.addObserver(t);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return ae(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=um(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;if(Tt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&Jb(`Error while retrieving App Check token: ${t.error}`),t?.token}}function Is(n){return Ce(n)}class Th{constructor(e){this.auth=e,this.observer=null,this.addObserver=Vy(t=>this.observer=t)}get next(){return ae(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Da={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Iw(n){Da=n}function dm(n){return Da.loadJS(n)}function Ew(){return Da.recaptchaEnterpriseScript}function Tw(){return Da.gapiScript}function Aw(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class Sw{constructor(){this.enterprise=new Rw}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class Rw{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const Cw="recaptcha-enterprise",hm="NO_RECAPTCHA";class kw{constructor(e){this.type=Cw,this.auth=Is(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,c)=>{ow(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const h=new iw(l);return i.tenantId==null?i._agentRecaptchaConfig=h:i._tenantRecaptchaConfigs[i.tenantId]=h,o(h.siteKey)}}).catch(l=>{c(l)})})}function s(i,o,c){const l=window.grecaptcha;yh(l)?l.enterprise.ready(()=>{l.enterprise.execute(i,{action:e}).then(h=>{o(h)}).catch(()=>{o(hm)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new Sw().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{r(this.auth).then(c=>{if(!t&&yh(window.grecaptcha))s(c,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let l=Ew();l.length!==0&&(l+=c),dm(l).then(()=>{s(c,i,o)}).catch(h=>{o(h)})}}).catch(c=>{o(c)})})}}async function Ah(n,e,t,r=!1,s=!1){const i=new kw(n);let o;if(s)o=hm;else try{o=await i.verify(t)}catch{o=await i.verify(t,!0)}const c=Object.assign({},e);if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const l=c.phoneEnrollmentInfo.phoneNumber,h=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:l,recaptchaToken:h,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const l=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function Sh(n,e,t,r,s){var i;if(!((i=n._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await Ah(n,e,t,t==="getOobCode");return r(n,o)}else return r(n,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await Ah(n,e,t,t==="getOobCode");return r(n,c)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pw(n,e){const t=bs(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(ui(i,e??{}))return s;xt(s,"already-initialized")}return t.initialize({options:e})}function xw(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(Qt);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function Nw(n,e,t){const r=Is(n);ae(r._canInitEmulator,r,"emulator-config-failed"),ae(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=fm(e),{host:o,port:c}=Dw(e),l=c===null?"":`:${c}`;r.config.emulator={url:`${i}//${o}${l}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),Vw()}function fm(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Dw(n){const e=fm(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Rh(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:Rh(o)}}}function Rh(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Vw(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jl{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Kt("not implemented")}_getIdTokenResponse(e){return Kt("not implemented")}_linkToIdToken(e,t){return Kt("not implemented")}_getReauthenticationResolver(e){return Kt("not implemented")}}async function Ow(n,e){return Vn(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lw(n,e){return Na(n,"POST","/v1/accounts:signInWithPassword",wr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mw(n,e){return Na(n,"POST","/v1/accounts:signInWithEmailLink",wr(n,e))}async function Fw(n,e){return Na(n,"POST","/v1/accounts:signInWithEmailLink",wr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fi extends Jl{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new fi(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new fi(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Sh(e,t,"signInWithPassword",Lw);case"emailLink":return Mw(e,{email:this._email,oobCode:this._password});default:xt(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Sh(e,r,"signUpPassword",Ow);case"emailLink":return Fw(e,{idToken:t,email:this._email,oobCode:this._password});default:xt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wr(n,e){return Na(n,"POST","/v1/accounts:signInWithIdp",wr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uw="http://localhost";class ur extends Jl{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new ur(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):xt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=t,i=Hl(t,["providerId","signInMethod"]);if(!r||!s)return null;const o=new ur(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Wr(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Wr(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Wr(e,t)}buildRequest(){const e={requestUri:Uw,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Di(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bw(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function $w(n){const e=Ks(Ws(n)).link,t=e?Ks(Ws(e)).deep_link_id:null,r=Ks(Ws(n)).deep_link_id;return(r?Ks(Ws(r)).link:null)||r||t||e||n}class Xl{constructor(e){var t,r,s,i,o,c;const l=Ks(Ws(e)),h=(t=l.apiKey)!==null&&t!==void 0?t:null,p=(r=l.oobCode)!==null&&r!==void 0?r:null,m=Bw((s=l.mode)!==null&&s!==void 0?s:null);ae(h&&p&&m,"argument-error"),this.apiKey=h,this.operation=m,this.code=p,this.continueUrl=(i=l.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(o=l.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(c=l.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const t=$w(e);try{return new Xl(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Es{constructor(){this.providerId=Es.PROVIDER_ID}static credential(e,t){return fi._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=Xl.parseLink(t);return ae(r,"argument-error"),fi._fromEmailAndCode(e,r.code,r.tenantId)}}Es.PROVIDER_ID="password";Es.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Es.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pm{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oi extends pm{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gn extends Oi{constructor(){super("facebook.com")}static credential(e){return ur._fromParams({providerId:gn.PROVIDER_ID,signInMethod:gn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return gn.credentialFromTaggedObject(e)}static credentialFromError(e){return gn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return gn.credential(e.oauthAccessToken)}catch{return null}}}gn.FACEBOOK_SIGN_IN_METHOD="facebook.com";gn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _n extends Oi{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return ur._fromParams({providerId:_n.PROVIDER_ID,signInMethod:_n.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return _n.credentialFromTaggedObject(e)}static credentialFromError(e){return _n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return _n.credential(t,r)}catch{return null}}}_n.GOOGLE_SIGN_IN_METHOD="google.com";_n.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vn extends Oi{constructor(){super("github.com")}static credential(e){return ur._fromParams({providerId:vn.PROVIDER_ID,signInMethod:vn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return vn.credentialFromTaggedObject(e)}static credentialFromError(e){return vn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return vn.credential(e.oauthAccessToken)}catch{return null}}}vn.GITHUB_SIGN_IN_METHOD="github.com";vn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn extends Oi{constructor(){super("twitter.com")}static credential(e,t){return ur._fromParams({providerId:yn.PROVIDER_ID,signInMethod:yn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return yn.credentialFromTaggedObject(e)}static credentialFromError(e){return yn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return yn.credential(t,r)}catch{return null}}}yn.TWITTER_SIGN_IN_METHOD="twitter.com";yn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class es{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await Wt._fromIdTokenResponse(e,r,s),o=Ch(r);return new es({user:i,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=Ch(r);return new es({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function Ch(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xo extends $t{constructor(e,t,r,s){var i;super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Xo.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new Xo(e,t,r,s)}}function mm(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Xo._fromErrorAndOperation(n,i,e,r):i})}async function qw(n,e,t=!1){const r=await hi(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return es._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jw(n,e,t=!1){const{auth:r}=n;if(Tt(r.app))return Promise.reject(Tn(r));const s="reauthenticate";try{const i=await hi(n,mm(r,s,e,n),t);ae(i.idToken,r,"internal-error");const o=Ql(i.idToken);ae(o,r,"internal-error");const{sub:c}=o;return ae(n.uid===c,r,"user-mismatch"),es._forOperation(n,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&xt(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gm(n,e,t=!1){if(Tt(n.app))return Promise.reject(Tn(n));const r="signIn",s=await mm(n,r,e),i=await es._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function zw(n,e){return gm(Is(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gw(n){const e=Is(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function Hw(n,e,t){return Tt(n.app)?Promise.reject(Tn(n)):zw(Ce(n),Es.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Gw(n),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kw(n,e){return Ce(n).setPersistence(e)}function Ww(n,e,t,r){return Ce(n).onIdTokenChanged(e,t,r)}function Qw(n,e,t){return Ce(n).beforeAuthStateChanged(e,t)}function Yw(n,e,t,r){return Ce(n).onAuthStateChanged(e,t,r)}function _m(n){return Ce(n).signOut()}const Zo="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vm{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Zo,"1"),this.storage.removeItem(Zo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jw=1e3,Xw=10;class ym extends vm{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=lm(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,l)=>{this.notifyListeners(o,l)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);gw()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Xw):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Jw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}ym.type="LOCAL";const bm=ym;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wm extends vm{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}wm.type="SESSION";const Im=wm;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zw(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Va{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Va(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(o).map(async h=>h(t.origin,i)),l=await Zw(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Va.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zl(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eI{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,l)=>{const h=Zl("",20);s.port1.start();const p=setTimeout(()=>{l(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(m){const g=m;if(g.data.eventId===h)switch(g.data.status){case"ack":clearTimeout(p),i=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(g.data.response);break;default:clearTimeout(p),clearTimeout(i),l(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mt(){return window}function tI(n){Mt().location.href=n}/**
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
 */function Em(){return typeof Mt().WorkerGlobalScope<"u"&&typeof Mt().importScripts=="function"}async function nI(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function rI(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function sI(){return Em()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tm="firebaseLocalStorageDb",iI=1,ea="firebaseLocalStorage",Am="fbase_key";class Li{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Oa(n,e){return n.transaction([ea],e?"readwrite":"readonly").objectStore(ea)}function oI(){const n=indexedDB.deleteDatabase(Tm);return new Li(n).toPromise()}function sl(){const n=indexedDB.open(Tm,iI);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(ea,{keyPath:Am})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(ea)?e(r):(r.close(),await oI(),e(await sl()))})})}async function kh(n,e,t){const r=Oa(n,!0).put({[Am]:e,value:t});return new Li(r).toPromise()}async function aI(n,e){const t=Oa(n,!1).get(e),r=await new Li(t).toPromise();return r===void 0?null:r.value}function Ph(n,e){const t=Oa(n,!0).delete(e);return new Li(t).toPromise()}const cI=800,lI=3;class Sm{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await sl(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>lI)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Em()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Va._getInstance(sI()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await nI(),!this.activeServiceWorker)return;this.sender=new eI(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||rI()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await sl();return await kh(e,Zo,"1"),await Ph(e,Zo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>kh(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>aI(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Ph(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Oa(s,!1).getAll();return new Li(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),cI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Sm.type="LOCAL";const uI=Sm;new Vi(3e4,6e4);/**
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
 */function dI(n,e){return e?Qt(e):(ae(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu extends Jl{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Wr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Wr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Wr(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function hI(n){return gm(n.auth,new eu(n),n.bypassAuthState)}function fI(n){const{auth:e,user:t}=n;return ae(t,e,"internal-error"),jw(t,new eu(n),n.bypassAuthState)}async function pI(n){const{auth:e,user:t}=n;return ae(t,e,"internal-error"),qw(t,new eu(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rm{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return hI;case"linkViaPopup":case"linkViaRedirect":return pI;case"reauthViaPopup":case"reauthViaRedirect":return fI;default:xt(this.auth,"internal-error")}}resolve(e){Zt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Zt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mI=new Vi(2e3,1e4);class zr extends Rm{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,zr.currentPopupAction&&zr.currentPopupAction.cancel(),zr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return ae(e,this.auth,"internal-error"),e}async onExecution(){Zt(this.filter.length===1,"Popup operations only handle one event");const e=Zl();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Lt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Lt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,zr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Lt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,mI.get())};e()}}zr.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gI="pendingRedirect",xo=new Map;class _I extends Rm{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=xo.get(this.auth._key());if(!e){try{const r=await vI(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}xo.set(this.auth._key(),e)}return this.bypassAuthState||xo.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function vI(n,e){const t=wI(e),r=bI(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function yI(n,e){xo.set(n._key(),e)}function bI(n){return Qt(n._redirectPersistence)}function wI(n){return Po(gI,n.config.apiKey,n.name)}async function II(n,e,t=!1){if(Tt(n.app))return Promise.reject(Tn(n));const r=Is(n),s=dI(r,e),o=await new _I(r,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const EI=10*60*1e3;class TI{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!AI(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Cm(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Lt(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=EI&&this.cachedEventUids.clear(),this.cachedEventUids.has(xh(e))}saveEventToCache(e){this.cachedEventUids.add(xh(e)),this.lastProcessedEventTime=Date.now()}}function xh(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Cm({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function AI(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Cm(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function SI(n,e={}){return Vn(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RI=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,CI=/^https?/;async function kI(n){if(n.config.emulator)return;const{authorizedDomains:e}=await SI(n);for(const t of e)try{if(PI(t))return}catch{}xt(n,"unauthorized-domain")}function PI(n){const e=nl(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!CI.test(t))return!1;if(RI.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const xI=new Vi(3e4,6e4);function Nh(){const n=Mt().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function NI(n){return new Promise((e,t)=>{var r,s,i;function o(){Nh(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Nh(),t(Lt(n,"network-request-failed"))},timeout:xI.get()})}if(!((s=(r=Mt().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=Mt().gapi)===null||i===void 0)&&i.load)o();else{const c=Aw("iframefcb");return Mt()[c]=()=>{gapi.load?o():t(Lt(n,"network-request-failed"))},dm(`${Tw()}?onload=${c}`).catch(l=>t(l))}}).catch(e=>{throw No=null,e})}let No=null;function DI(n){return No=No||NI(n),No}/**
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
 */const VI=new Vi(5e3,15e3),OI="__/auth/iframe",LI="emulator/auth/iframe",MI={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},FI=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function UI(n){const e=n.config;ae(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Wl(e,LI):`https://${n.config.authDomain}/${OI}`,r={apiKey:e.apiKey,appName:n.name,v:ws},s=FI.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${Di(r).slice(1)}`}async function BI(n){const e=await DI(n),t=Mt().gapi;return ae(t,n,"internal-error"),e.open({where:document.body,url:UI(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:MI,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=Lt(n,"network-request-failed"),c=Mt().setTimeout(()=>{i(o)},VI.get());function l(){Mt().clearTimeout(c),s(r)}r.ping(l).then(l,()=>{i(o)})}))}/**
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
 */const $I={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},qI=500,jI=600,zI="_blank",GI="http://localhost";class Dh{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function HI(n,e,t,r=qI,s=jI){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const l=Object.assign(Object.assign({},$I),{width:r.toString(),height:s.toString(),top:i,left:o}),h=je().toLowerCase();t&&(c=sm(h)?zI:t),nm(h)&&(e=e||GI,l.scrollbars="yes");const p=Object.entries(l).reduce((g,[E,S])=>`${g}${E}=${S},`,"");if(mw(h)&&c!=="_self")return KI(e||"",c),new Dh(null);const m=window.open(e||"",c,p);ae(m,n,"popup-blocked");try{m.focus()}catch{}return new Dh(m)}function KI(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const WI="__/auth/handler",QI="emulator/auth/handler",YI=encodeURIComponent("fac");async function Vh(n,e,t,r,s,i){ae(n.config.authDomain,n,"auth-domain-config-required"),ae(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:ws,eventId:s};if(e instanceof pm){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Dy(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,m]of Object.entries({}))o[p]=m}if(e instanceof Oi){const p=e.getScopes().filter(m=>m!=="");p.length>0&&(o.scopes=p.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const p of Object.keys(c))c[p]===void 0&&delete c[p];const l=await n._getAppCheckToken(),h=l?`#${YI}=${encodeURIComponent(l)}`:"";return`${JI(n)}?${Di(c).slice(1)}${h}`}function JI({config:n}){return n.emulator?Wl(n,QI):`https://${n.authDomain}/${WI}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mc="webStorageSupport";class XI{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Im,this._completeRedirectFn=II,this._overrideRedirectResult=yI}async _openPopup(e,t,r,s){var i;Zt((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await Vh(e,t,r,nl(),s);return HI(e,o,Zl())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await Vh(e,t,r,nl(),s);return tI(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(Zt(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await BI(e),r=new TI(e);return t.register("authEvent",s=>(ae(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Mc,{type:Mc},s=>{var i;const o=(i=s?.[0])===null||i===void 0?void 0:i[Mc];o!==void 0&&t(!!o),xt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=kI(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return lm()||rm()||Yl()}}const ZI=XI;var Oh="@firebase/auth",Lh="1.9.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eE{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){ae(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tE(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function nE(n){Xt(new Ut("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;ae(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:um(n)},h=new ww(r,s,i,l);return xw(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Xt(new Ut("auth-internal",e=>{const t=Is(e.getProvider("auth").getImmediate());return(r=>new eE(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),kt(Oh,Lh,tE(n)),kt(Oh,Lh,"esm2017")}/**
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
 */const rE=5*60,sE=Bp("authIdTokenMaxAge")||rE;let Mh=null;const iE=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>sE)return;const s=t?.token;Mh!==s&&(Mh=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function oE(n=Gl()){const e=bs(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Pw(n,{popupRedirectResolver:ZI,persistence:[uI,bm,Im]}),r=Bp("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=iE(i.toString());Qw(t,o,()=>o(t.currentUser)),Ww(t,c=>o(c))}}const s=Fp("auth");return s&&Nw(t,`http://${s}`),t}function aE(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}Iw({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=Lt("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",aE().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});nE("Browser");var Fh=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var An,km;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(I,v){function w(){}w.prototype=v.prototype,I.D=v.prototype,I.prototype=new w,I.prototype.constructor=I,I.C=function(A,b,C){for(var y=Array(arguments.length-2),le=2;le<arguments.length;le++)y[le-2]=arguments[le];return v.prototype[b].apply(A,y)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(I,v,w){w||(w=0);var A=Array(16);if(typeof v=="string")for(var b=0;16>b;++b)A[b]=v.charCodeAt(w++)|v.charCodeAt(w++)<<8|v.charCodeAt(w++)<<16|v.charCodeAt(w++)<<24;else for(b=0;16>b;++b)A[b]=v[w++]|v[w++]<<8|v[w++]<<16|v[w++]<<24;v=I.g[0],w=I.g[1],b=I.g[2];var C=I.g[3],y=v+(C^w&(b^C))+A[0]+3614090360&4294967295;v=w+(y<<7&4294967295|y>>>25),y=C+(b^v&(w^b))+A[1]+3905402710&4294967295,C=v+(y<<12&4294967295|y>>>20),y=b+(w^C&(v^w))+A[2]+606105819&4294967295,b=C+(y<<17&4294967295|y>>>15),y=w+(v^b&(C^v))+A[3]+3250441966&4294967295,w=b+(y<<22&4294967295|y>>>10),y=v+(C^w&(b^C))+A[4]+4118548399&4294967295,v=w+(y<<7&4294967295|y>>>25),y=C+(b^v&(w^b))+A[5]+1200080426&4294967295,C=v+(y<<12&4294967295|y>>>20),y=b+(w^C&(v^w))+A[6]+2821735955&4294967295,b=C+(y<<17&4294967295|y>>>15),y=w+(v^b&(C^v))+A[7]+4249261313&4294967295,w=b+(y<<22&4294967295|y>>>10),y=v+(C^w&(b^C))+A[8]+1770035416&4294967295,v=w+(y<<7&4294967295|y>>>25),y=C+(b^v&(w^b))+A[9]+2336552879&4294967295,C=v+(y<<12&4294967295|y>>>20),y=b+(w^C&(v^w))+A[10]+4294925233&4294967295,b=C+(y<<17&4294967295|y>>>15),y=w+(v^b&(C^v))+A[11]+2304563134&4294967295,w=b+(y<<22&4294967295|y>>>10),y=v+(C^w&(b^C))+A[12]+1804603682&4294967295,v=w+(y<<7&4294967295|y>>>25),y=C+(b^v&(w^b))+A[13]+4254626195&4294967295,C=v+(y<<12&4294967295|y>>>20),y=b+(w^C&(v^w))+A[14]+2792965006&4294967295,b=C+(y<<17&4294967295|y>>>15),y=w+(v^b&(C^v))+A[15]+1236535329&4294967295,w=b+(y<<22&4294967295|y>>>10),y=v+(b^C&(w^b))+A[1]+4129170786&4294967295,v=w+(y<<5&4294967295|y>>>27),y=C+(w^b&(v^w))+A[6]+3225465664&4294967295,C=v+(y<<9&4294967295|y>>>23),y=b+(v^w&(C^v))+A[11]+643717713&4294967295,b=C+(y<<14&4294967295|y>>>18),y=w+(C^v&(b^C))+A[0]+3921069994&4294967295,w=b+(y<<20&4294967295|y>>>12),y=v+(b^C&(w^b))+A[5]+3593408605&4294967295,v=w+(y<<5&4294967295|y>>>27),y=C+(w^b&(v^w))+A[10]+38016083&4294967295,C=v+(y<<9&4294967295|y>>>23),y=b+(v^w&(C^v))+A[15]+3634488961&4294967295,b=C+(y<<14&4294967295|y>>>18),y=w+(C^v&(b^C))+A[4]+3889429448&4294967295,w=b+(y<<20&4294967295|y>>>12),y=v+(b^C&(w^b))+A[9]+568446438&4294967295,v=w+(y<<5&4294967295|y>>>27),y=C+(w^b&(v^w))+A[14]+3275163606&4294967295,C=v+(y<<9&4294967295|y>>>23),y=b+(v^w&(C^v))+A[3]+4107603335&4294967295,b=C+(y<<14&4294967295|y>>>18),y=w+(C^v&(b^C))+A[8]+1163531501&4294967295,w=b+(y<<20&4294967295|y>>>12),y=v+(b^C&(w^b))+A[13]+2850285829&4294967295,v=w+(y<<5&4294967295|y>>>27),y=C+(w^b&(v^w))+A[2]+4243563512&4294967295,C=v+(y<<9&4294967295|y>>>23),y=b+(v^w&(C^v))+A[7]+1735328473&4294967295,b=C+(y<<14&4294967295|y>>>18),y=w+(C^v&(b^C))+A[12]+2368359562&4294967295,w=b+(y<<20&4294967295|y>>>12),y=v+(w^b^C)+A[5]+4294588738&4294967295,v=w+(y<<4&4294967295|y>>>28),y=C+(v^w^b)+A[8]+2272392833&4294967295,C=v+(y<<11&4294967295|y>>>21),y=b+(C^v^w)+A[11]+1839030562&4294967295,b=C+(y<<16&4294967295|y>>>16),y=w+(b^C^v)+A[14]+4259657740&4294967295,w=b+(y<<23&4294967295|y>>>9),y=v+(w^b^C)+A[1]+2763975236&4294967295,v=w+(y<<4&4294967295|y>>>28),y=C+(v^w^b)+A[4]+1272893353&4294967295,C=v+(y<<11&4294967295|y>>>21),y=b+(C^v^w)+A[7]+4139469664&4294967295,b=C+(y<<16&4294967295|y>>>16),y=w+(b^C^v)+A[10]+3200236656&4294967295,w=b+(y<<23&4294967295|y>>>9),y=v+(w^b^C)+A[13]+681279174&4294967295,v=w+(y<<4&4294967295|y>>>28),y=C+(v^w^b)+A[0]+3936430074&4294967295,C=v+(y<<11&4294967295|y>>>21),y=b+(C^v^w)+A[3]+3572445317&4294967295,b=C+(y<<16&4294967295|y>>>16),y=w+(b^C^v)+A[6]+76029189&4294967295,w=b+(y<<23&4294967295|y>>>9),y=v+(w^b^C)+A[9]+3654602809&4294967295,v=w+(y<<4&4294967295|y>>>28),y=C+(v^w^b)+A[12]+3873151461&4294967295,C=v+(y<<11&4294967295|y>>>21),y=b+(C^v^w)+A[15]+530742520&4294967295,b=C+(y<<16&4294967295|y>>>16),y=w+(b^C^v)+A[2]+3299628645&4294967295,w=b+(y<<23&4294967295|y>>>9),y=v+(b^(w|~C))+A[0]+4096336452&4294967295,v=w+(y<<6&4294967295|y>>>26),y=C+(w^(v|~b))+A[7]+1126891415&4294967295,C=v+(y<<10&4294967295|y>>>22),y=b+(v^(C|~w))+A[14]+2878612391&4294967295,b=C+(y<<15&4294967295|y>>>17),y=w+(C^(b|~v))+A[5]+4237533241&4294967295,w=b+(y<<21&4294967295|y>>>11),y=v+(b^(w|~C))+A[12]+1700485571&4294967295,v=w+(y<<6&4294967295|y>>>26),y=C+(w^(v|~b))+A[3]+2399980690&4294967295,C=v+(y<<10&4294967295|y>>>22),y=b+(v^(C|~w))+A[10]+4293915773&4294967295,b=C+(y<<15&4294967295|y>>>17),y=w+(C^(b|~v))+A[1]+2240044497&4294967295,w=b+(y<<21&4294967295|y>>>11),y=v+(b^(w|~C))+A[8]+1873313359&4294967295,v=w+(y<<6&4294967295|y>>>26),y=C+(w^(v|~b))+A[15]+4264355552&4294967295,C=v+(y<<10&4294967295|y>>>22),y=b+(v^(C|~w))+A[6]+2734768916&4294967295,b=C+(y<<15&4294967295|y>>>17),y=w+(C^(b|~v))+A[13]+1309151649&4294967295,w=b+(y<<21&4294967295|y>>>11),y=v+(b^(w|~C))+A[4]+4149444226&4294967295,v=w+(y<<6&4294967295|y>>>26),y=C+(w^(v|~b))+A[11]+3174756917&4294967295,C=v+(y<<10&4294967295|y>>>22),y=b+(v^(C|~w))+A[2]+718787259&4294967295,b=C+(y<<15&4294967295|y>>>17),y=w+(C^(b|~v))+A[9]+3951481745&4294967295,I.g[0]=I.g[0]+v&4294967295,I.g[1]=I.g[1]+(b+(y<<21&4294967295|y>>>11))&4294967295,I.g[2]=I.g[2]+b&4294967295,I.g[3]=I.g[3]+C&4294967295}r.prototype.u=function(I,v){v===void 0&&(v=I.length);for(var w=v-this.blockSize,A=this.B,b=this.h,C=0;C<v;){if(b==0)for(;C<=w;)s(this,I,C),C+=this.blockSize;if(typeof I=="string"){for(;C<v;)if(A[b++]=I.charCodeAt(C++),b==this.blockSize){s(this,A),b=0;break}}else for(;C<v;)if(A[b++]=I[C++],b==this.blockSize){s(this,A),b=0;break}}this.h=b,this.o+=v},r.prototype.v=function(){var I=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);I[0]=128;for(var v=1;v<I.length-8;++v)I[v]=0;var w=8*this.o;for(v=I.length-8;v<I.length;++v)I[v]=w&255,w/=256;for(this.u(I),I=Array(16),v=w=0;4>v;++v)for(var A=0;32>A;A+=8)I[w++]=this.g[v]>>>A&255;return I};function i(I,v){var w=c;return Object.prototype.hasOwnProperty.call(w,I)?w[I]:w[I]=v(I)}function o(I,v){this.h=v;for(var w=[],A=!0,b=I.length-1;0<=b;b--){var C=I[b]|0;A&&C==v||(w[b]=C,A=!1)}this.g=w}var c={};function l(I){return-128<=I&&128>I?i(I,function(v){return new o([v|0],0>v?-1:0)}):new o([I|0],0>I?-1:0)}function h(I){if(isNaN(I)||!isFinite(I))return m;if(0>I)return T(h(-I));for(var v=[],w=1,A=0;I>=w;A++)v[A]=I/w|0,w*=4294967296;return new o(v,0)}function p(I,v){if(I.length==0)throw Error("number format error: empty string");if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(I.charAt(0)=="-")return T(p(I.substring(1),v));if(0<=I.indexOf("-"))throw Error('number format error: interior "-" character');for(var w=h(Math.pow(v,8)),A=m,b=0;b<I.length;b+=8){var C=Math.min(8,I.length-b),y=parseInt(I.substring(b,b+C),v);8>C?(C=h(Math.pow(v,C)),A=A.j(C).add(h(y))):(A=A.j(w),A=A.add(h(y)))}return A}var m=l(0),g=l(1),E=l(16777216);n=o.prototype,n.m=function(){if(k(this))return-T(this).m();for(var I=0,v=1,w=0;w<this.g.length;w++){var A=this.i(w);I+=(0<=A?A:4294967296+A)*v,v*=4294967296}return I},n.toString=function(I){if(I=I||10,2>I||36<I)throw Error("radix out of range: "+I);if(S(this))return"0";if(k(this))return"-"+T(this).toString(I);for(var v=h(Math.pow(I,6)),w=this,A="";;){var b=B(w,v).g;w=L(w,b.j(v));var C=((0<w.g.length?w.g[0]:w.h)>>>0).toString(I);if(w=b,S(w))return C+A;for(;6>C.length;)C="0"+C;A=C+A}},n.i=function(I){return 0>I?0:I<this.g.length?this.g[I]:this.h};function S(I){if(I.h!=0)return!1;for(var v=0;v<I.g.length;v++)if(I.g[v]!=0)return!1;return!0}function k(I){return I.h==-1}n.l=function(I){return I=L(this,I),k(I)?-1:S(I)?0:1};function T(I){for(var v=I.g.length,w=[],A=0;A<v;A++)w[A]=~I.g[A];return new o(w,~I.h).add(g)}n.abs=function(){return k(this)?T(this):this},n.add=function(I){for(var v=Math.max(this.g.length,I.g.length),w=[],A=0,b=0;b<=v;b++){var C=A+(this.i(b)&65535)+(I.i(b)&65535),y=(C>>>16)+(this.i(b)>>>16)+(I.i(b)>>>16);A=y>>>16,C&=65535,y&=65535,w[b]=y<<16|C}return new o(w,w[w.length-1]&-2147483648?-1:0)};function L(I,v){return I.add(T(v))}n.j=function(I){if(S(this)||S(I))return m;if(k(this))return k(I)?T(this).j(T(I)):T(T(this).j(I));if(k(I))return T(this.j(T(I)));if(0>this.l(E)&&0>I.l(E))return h(this.m()*I.m());for(var v=this.g.length+I.g.length,w=[],A=0;A<2*v;A++)w[A]=0;for(A=0;A<this.g.length;A++)for(var b=0;b<I.g.length;b++){var C=this.i(A)>>>16,y=this.i(A)&65535,le=I.i(b)>>>16,fe=I.i(b)&65535;w[2*A+2*b]+=y*fe,R(w,2*A+2*b),w[2*A+2*b+1]+=C*fe,R(w,2*A+2*b+1),w[2*A+2*b+1]+=y*le,R(w,2*A+2*b+1),w[2*A+2*b+2]+=C*le,R(w,2*A+2*b+2)}for(A=0;A<v;A++)w[A]=w[2*A+1]<<16|w[2*A];for(A=v;A<2*v;A++)w[A]=0;return new o(w,0)};function R(I,v){for(;(I[v]&65535)!=I[v];)I[v+1]+=I[v]>>>16,I[v]&=65535,v++}function N(I,v){this.g=I,this.h=v}function B(I,v){if(S(v))throw Error("division by zero");if(S(I))return new N(m,m);if(k(I))return v=B(T(I),v),new N(T(v.g),T(v.h));if(k(v))return v=B(I,T(v)),new N(T(v.g),v.h);if(30<I.g.length){if(k(I)||k(v))throw Error("slowDivide_ only works with positive integers.");for(var w=g,A=v;0>=A.l(I);)w=P(w),A=P(A);var b=F(w,1),C=F(A,1);for(A=F(A,2),w=F(w,2);!S(A);){var y=C.add(A);0>=y.l(I)&&(b=b.add(w),C=y),A=F(A,1),w=F(w,1)}return v=L(I,b.j(v)),new N(b,v)}for(b=m;0<=I.l(v);){for(w=Math.max(1,Math.floor(I.m()/v.m())),A=Math.ceil(Math.log(w)/Math.LN2),A=48>=A?1:Math.pow(2,A-48),C=h(w),y=C.j(v);k(y)||0<y.l(I);)w-=A,C=h(w),y=C.j(v);S(C)&&(C=g),b=b.add(C),I=L(I,y)}return new N(b,I)}n.A=function(I){return B(this,I).h},n.and=function(I){for(var v=Math.max(this.g.length,I.g.length),w=[],A=0;A<v;A++)w[A]=this.i(A)&I.i(A);return new o(w,this.h&I.h)},n.or=function(I){for(var v=Math.max(this.g.length,I.g.length),w=[],A=0;A<v;A++)w[A]=this.i(A)|I.i(A);return new o(w,this.h|I.h)},n.xor=function(I){for(var v=Math.max(this.g.length,I.g.length),w=[],A=0;A<v;A++)w[A]=this.i(A)^I.i(A);return new o(w,this.h^I.h)};function P(I){for(var v=I.g.length+1,w=[],A=0;A<v;A++)w[A]=I.i(A)<<1|I.i(A-1)>>>31;return new o(w,I.h)}function F(I,v){var w=v>>5;v%=32;for(var A=I.g.length-w,b=[],C=0;C<A;C++)b[C]=0<v?I.i(C+w)>>>v|I.i(C+w+1)<<32-v:I.i(C+w);return new o(b,I.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,km=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=p,An=o}).apply(typeof Fh<"u"?Fh:typeof self<"u"?self:typeof window<"u"?window:{});var fo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Pm,Qs,xm,Do,il,Nm,Dm,Vm;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,d,f){return a==Array.prototype||a==Object.prototype||(a[d]=f.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof fo=="object"&&fo];for(var d=0;d<a.length;++d){var f=a[d];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=t(this);function s(a,d){if(d)e:{var f=r;a=a.split(".");for(var _=0;_<a.length-1;_++){var V=a[_];if(!(V in f))break e;f=f[V]}a=a[a.length-1],_=f[a],d=d(_),d!=_&&d!=null&&e(f,a,{configurable:!0,writable:!0,value:d})}}function i(a,d){a instanceof String&&(a+="");var f=0,_=!1,V={next:function(){if(!_&&f<a.length){var M=f++;return{value:d(M,a[M]),done:!1}}return _=!0,{done:!0,value:void 0}}};return V[Symbol.iterator]=function(){return V},V}s("Array.prototype.values",function(a){return a||function(){return i(this,function(d,f){return f})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},c=this||self;function l(a){var d=typeof a;return d=d!="object"?d:a?Array.isArray(a)?"array":d:"null",d=="array"||d=="object"&&typeof a.length=="number"}function h(a){var d=typeof a;return d=="object"&&a!=null||d=="function"}function p(a,d,f){return a.call.apply(a.bind,arguments)}function m(a,d,f){if(!a)throw Error();if(2<arguments.length){var _=Array.prototype.slice.call(arguments,2);return function(){var V=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(V,_),a.apply(d,V)}}return function(){return a.apply(d,arguments)}}function g(a,d,f){return g=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:m,g.apply(null,arguments)}function E(a,d){var f=Array.prototype.slice.call(arguments,1);return function(){var _=f.slice();return _.push.apply(_,arguments),a.apply(this,_)}}function S(a,d){function f(){}f.prototype=d.prototype,a.aa=d.prototype,a.prototype=new f,a.prototype.constructor=a,a.Qb=function(_,V,M){for(var Q=Array(arguments.length-2),Ae=2;Ae<arguments.length;Ae++)Q[Ae-2]=arguments[Ae];return d.prototype[V].apply(_,Q)}}function k(a){const d=a.length;if(0<d){const f=Array(d);for(let _=0;_<d;_++)f[_]=a[_];return f}return[]}function T(a,d){for(let f=1;f<arguments.length;f++){const _=arguments[f];if(l(_)){const V=a.length||0,M=_.length||0;a.length=V+M;for(let Q=0;Q<M;Q++)a[V+Q]=_[Q]}else a.push(_)}}class L{constructor(d,f){this.i=d,this.j=f,this.h=0,this.g=null}get(){let d;return 0<this.h?(this.h--,d=this.g,this.g=d.next,d.next=null):d=this.i(),d}}function R(a){return/^[\s\xa0]*$/.test(a)}function N(){var a=c.navigator;return a&&(a=a.userAgent)?a:""}function B(a){return B[" "](a),a}B[" "]=function(){};var P=N().indexOf("Gecko")!=-1&&!(N().toLowerCase().indexOf("webkit")!=-1&&N().indexOf("Edge")==-1)&&!(N().indexOf("Trident")!=-1||N().indexOf("MSIE")!=-1)&&N().indexOf("Edge")==-1;function F(a,d,f){for(const _ in a)d.call(f,a[_],_,a)}function I(a,d){for(const f in a)d.call(void 0,a[f],f,a)}function v(a){const d={};for(const f in a)d[f]=a[f];return d}const w="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function A(a,d){let f,_;for(let V=1;V<arguments.length;V++){_=arguments[V];for(f in _)a[f]=_[f];for(let M=0;M<w.length;M++)f=w[M],Object.prototype.hasOwnProperty.call(_,f)&&(a[f]=_[f])}}function b(a){var d=1;a=a.split(":");const f=[];for(;0<d&&a.length;)f.push(a.shift()),d--;return a.length&&f.push(a.join(":")),f}function C(a){c.setTimeout(()=>{throw a},0)}function y(){var a=x;let d=null;return a.g&&(d=a.g,a.g=a.g.next,a.g||(a.h=null),d.next=null),d}class le{constructor(){this.h=this.g=null}add(d,f){const _=fe.get();_.set(d,f),this.h?this.h.next=_:this.g=_,this.h=_}}var fe=new L(()=>new X,a=>a.reset());class X{constructor(){this.next=this.g=this.h=null}set(d,f){this.h=d,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let ye,Fe=!1,x=new le,z=()=>{const a=c.Promise.resolve(void 0);ye=()=>{a.then(q)}};var q=()=>{for(var a;a=y();){try{a.h.call(a.g)}catch(f){C(f)}var d=fe;d.j(a),100>d.h&&(d.h++,a.next=d.g,d.g=a)}Fe=!1};function Z(){this.s=this.s,this.C=this.C}Z.prototype.s=!1,Z.prototype.ma=function(){this.s||(this.s=!0,this.N())},Z.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function j(a,d){this.type=a,this.g=this.target=d,this.defaultPrevented=!1}j.prototype.h=function(){this.defaultPrevented=!0};var he=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var a=!1,d=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const f=()=>{};c.addEventListener("test",f,d),c.removeEventListener("test",f,d)}catch{}return a}();function O(a,d){if(j.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var f=this.type=a.type,_=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=d,d=a.relatedTarget){if(P){e:{try{B(d.nodeName);var V=!0;break e}catch{}V=!1}V||(d=null)}}else f=="mouseover"?d=a.fromElement:f=="mouseout"&&(d=a.toElement);this.relatedTarget=d,_?(this.clientX=_.clientX!==void 0?_.clientX:_.pageX,this.clientY=_.clientY!==void 0?_.clientY:_.pageY,this.screenX=_.screenX||0,this.screenY=_.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:$[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&O.aa.h.call(this)}}S(O,j);var $={2:"touch",3:"pen",4:"mouse"};O.prototype.h=function(){O.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Y="closure_listenable_"+(1e6*Math.random()|0),ce=0;function re(a,d,f,_,V){this.listener=a,this.proxy=null,this.src=d,this.type=f,this.capture=!!_,this.ha=V,this.key=++ce,this.da=this.fa=!1}function ne(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Te(a){this.src=a,this.g={},this.h=0}Te.prototype.add=function(a,d,f,_,V){var M=a.toString();a=this.g[M],a||(a=this.g[M]=[],this.h++);var Q=Ue(a,d,_,V);return-1<Q?(d=a[Q],f||(d.fa=!1)):(d=new re(d,this.src,M,!!_,V),d.fa=f,a.push(d)),d};function Ne(a,d){var f=d.type;if(f in a.g){var _=a.g[f],V=Array.prototype.indexOf.call(_,d,void 0),M;(M=0<=V)&&Array.prototype.splice.call(_,V,1),M&&(ne(d),a.g[f].length==0&&(delete a.g[f],a.h--))}}function Ue(a,d,f,_){for(var V=0;V<a.length;++V){var M=a[V];if(!M.da&&M.listener==d&&M.capture==!!f&&M.ha==_)return V}return-1}var rt="closure_lm_"+(1e6*Math.random()|0),Fn={};function Un(a,d,f,_,V){if(Array.isArray(d)){for(var M=0;M<d.length;M++)Un(a,d[M],f,_,V);return null}return f=hd(f),a&&a[Y]?a.K(d,f,h(_)?!!_.capture:!1,V):Rs(a,d,f,!1,_,V)}function Rs(a,d,f,_,V,M){if(!d)throw Error("Invalid event type");var Q=h(V)?!!V.capture:!!V,Ae=fc(a);if(Ae||(a[rt]=Ae=new Te(a)),f=Ae.add(d,f,_,Q,M),f.proxy)return f;if(_=Uv(),f.proxy=_,_.src=a,_.listener=f,a.addEventListener)he||(V=Q),V===void 0&&(V=!1),a.addEventListener(d.toString(),_,V);else if(a.attachEvent)a.attachEvent(dd(d.toString()),_);else if(a.addListener&&a.removeListener)a.addListener(_);else throw Error("addEventListener and attachEvent are unavailable.");return f}function Uv(){function a(f){return d.call(a.src,a.listener,f)}const d=Bv;return a}function ud(a,d,f,_,V){if(Array.isArray(d))for(var M=0;M<d.length;M++)ud(a,d[M],f,_,V);else _=h(_)?!!_.capture:!!_,f=hd(f),a&&a[Y]?(a=a.i,d=String(d).toString(),d in a.g&&(M=a.g[d],f=Ue(M,f,_,V),-1<f&&(ne(M[f]),Array.prototype.splice.call(M,f,1),M.length==0&&(delete a.g[d],a.h--)))):a&&(a=fc(a))&&(d=a.g[d.toString()],a=-1,d&&(a=Ue(d,f,_,V)),(f=-1<a?d[a]:null)&&hc(f))}function hc(a){if(typeof a!="number"&&a&&!a.da){var d=a.src;if(d&&d[Y])Ne(d.i,a);else{var f=a.type,_=a.proxy;d.removeEventListener?d.removeEventListener(f,_,a.capture):d.detachEvent?d.detachEvent(dd(f),_):d.addListener&&d.removeListener&&d.removeListener(_),(f=fc(d))?(Ne(f,a),f.h==0&&(f.src=null,d[rt]=null)):ne(a)}}}function dd(a){return a in Fn?Fn[a]:Fn[a]="on"+a}function Bv(a,d){if(a.da)a=!0;else{d=new O(d,this);var f=a.listener,_=a.ha||a.src;a.fa&&hc(a),a=f.call(_,d)}return a}function fc(a){return a=a[rt],a instanceof Te?a:null}var pc="__closure_events_fn_"+(1e9*Math.random()>>>0);function hd(a){return typeof a=="function"?a:(a[pc]||(a[pc]=function(d){return a.handleEvent(d)}),a[pc])}function We(){Z.call(this),this.i=new Te(this),this.M=this,this.F=null}S(We,Z),We.prototype[Y]=!0,We.prototype.removeEventListener=function(a,d,f,_){ud(this,a,d,f,_)};function st(a,d){var f,_=a.F;if(_)for(f=[];_;_=_.F)f.push(_);if(a=a.M,_=d.type||d,typeof d=="string")d=new j(d,a);else if(d instanceof j)d.target=d.target||a;else{var V=d;d=new j(_,a),A(d,V)}if(V=!0,f)for(var M=f.length-1;0<=M;M--){var Q=d.g=f[M];V=Qi(Q,_,!0,d)&&V}if(Q=d.g=a,V=Qi(Q,_,!0,d)&&V,V=Qi(Q,_,!1,d)&&V,f)for(M=0;M<f.length;M++)Q=d.g=f[M],V=Qi(Q,_,!1,d)&&V}We.prototype.N=function(){if(We.aa.N.call(this),this.i){var a=this.i,d;for(d in a.g){for(var f=a.g[d],_=0;_<f.length;_++)ne(f[_]);delete a.g[d],a.h--}}this.F=null},We.prototype.K=function(a,d,f,_){return this.i.add(String(a),d,!1,f,_)},We.prototype.L=function(a,d,f,_){return this.i.add(String(a),d,!0,f,_)};function Qi(a,d,f,_){if(d=a.i.g[String(d)],!d)return!0;d=d.concat();for(var V=!0,M=0;M<d.length;++M){var Q=d[M];if(Q&&!Q.da&&Q.capture==f){var Ae=Q.listener,He=Q.ha||Q.src;Q.fa&&Ne(a.i,Q),V=Ae.call(He,_)!==!1&&V}}return V&&!_.defaultPrevented}function fd(a,d,f){if(typeof a=="function")f&&(a=g(a,f));else if(a&&typeof a.handleEvent=="function")a=g(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(d)?-1:c.setTimeout(a,d||0)}function pd(a){a.g=fd(()=>{a.g=null,a.i&&(a.i=!1,pd(a))},a.l);const d=a.h;a.h=null,a.m.apply(null,d)}class $v extends Z{constructor(d,f){super(),this.m=d,this.l=f,this.h=null,this.i=!1,this.g=null}j(d){this.h=arguments,this.g?this.i=!0:pd(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Cs(a){Z.call(this),this.h=a,this.g={}}S(Cs,Z);var md=[];function gd(a){F(a.g,function(d,f){this.g.hasOwnProperty(f)&&hc(d)},a),a.g={}}Cs.prototype.N=function(){Cs.aa.N.call(this),gd(this)},Cs.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var mc=c.JSON.stringify,qv=c.JSON.parse,jv=class{stringify(a){return c.JSON.stringify(a,void 0)}parse(a){return c.JSON.parse(a,void 0)}};function gc(){}gc.prototype.h=null;function _d(a){return a.h||(a.h=a.i())}function vd(){}var ks={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function _c(){j.call(this,"d")}S(_c,j);function vc(){j.call(this,"c")}S(vc,j);var Bn={},yd=null;function Yi(){return yd=yd||new We}Bn.La="serverreachability";function bd(a){j.call(this,Bn.La,a)}S(bd,j);function Ps(a){const d=Yi();st(d,new bd(d))}Bn.STAT_EVENT="statevent";function wd(a,d){j.call(this,Bn.STAT_EVENT,a),this.stat=d}S(wd,j);function it(a){const d=Yi();st(d,new wd(d,a))}Bn.Ma="timingevent";function Id(a,d){j.call(this,Bn.Ma,a),this.size=d}S(Id,j);function xs(a,d){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){a()},d)}function Ns(){this.g=!0}Ns.prototype.xa=function(){this.g=!1};function zv(a,d,f,_,V,M){a.info(function(){if(a.g)if(M)for(var Q="",Ae=M.split("&"),He=0;He<Ae.length;He++){var be=Ae[He].split("=");if(1<be.length){var Qe=be[0];be=be[1];var Ye=Qe.split("_");Q=2<=Ye.length&&Ye[1]=="type"?Q+(Qe+"="+be+"&"):Q+(Qe+"=redacted&")}}else Q=null;else Q=M;return"XMLHTTP REQ ("+_+") [attempt "+V+"]: "+d+`
`+f+`
`+Q})}function Gv(a,d,f,_,V,M,Q){a.info(function(){return"XMLHTTP RESP ("+_+") [ attempt "+V+"]: "+d+`
`+f+`
`+M+" "+Q})}function Cr(a,d,f,_){a.info(function(){return"XMLHTTP TEXT ("+d+"): "+Kv(a,f)+(_?" "+_:"")})}function Hv(a,d){a.info(function(){return"TIMEOUT: "+d})}Ns.prototype.info=function(){};function Kv(a,d){if(!a.g)return d;if(!d)return null;try{var f=JSON.parse(d);if(f){for(a=0;a<f.length;a++)if(Array.isArray(f[a])){var _=f[a];if(!(2>_.length)){var V=_[1];if(Array.isArray(V)&&!(1>V.length)){var M=V[0];if(M!="noop"&&M!="stop"&&M!="close")for(var Q=1;Q<V.length;Q++)V[Q]=""}}}}return mc(f)}catch{return d}}var Ji={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Ed={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},yc;function Xi(){}S(Xi,gc),Xi.prototype.g=function(){return new XMLHttpRequest},Xi.prototype.i=function(){return{}},yc=new Xi;function cn(a,d,f,_){this.j=a,this.i=d,this.l=f,this.R=_||1,this.U=new Cs(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Td}function Td(){this.i=null,this.g="",this.h=!1}var Ad={},bc={};function wc(a,d,f){a.L=1,a.v=no(Gt(d)),a.m=f,a.P=!0,Sd(a,null)}function Sd(a,d){a.F=Date.now(),Zi(a),a.A=Gt(a.v);var f=a.A,_=a.R;Array.isArray(_)||(_=[String(_)]),Bd(f.i,"t",_),a.C=0,f=a.j.J,a.h=new Td,a.g=sh(a.j,f?d:null,!a.m),0<a.O&&(a.M=new $v(g(a.Y,a,a.g),a.O)),d=a.U,f=a.g,_=a.ca;var V="readystatechange";Array.isArray(V)||(V&&(md[0]=V.toString()),V=md);for(var M=0;M<V.length;M++){var Q=Un(f,V[M],_||d.handleEvent,!1,d.h||d);if(!Q)break;d.g[Q.key]=Q}d=a.H?v(a.H):{},a.m?(a.u||(a.u="POST"),d["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,d)):(a.u="GET",a.g.ea(a.A,a.u,null,d)),Ps(),zv(a.i,a.u,a.A,a.l,a.R,a.m)}cn.prototype.ca=function(a){a=a.target;const d=this.M;d&&Ht(a)==3?d.j():this.Y(a)},cn.prototype.Y=function(a){try{if(a==this.g)e:{const Ye=Ht(this.g);var d=this.g.Ba();const xr=this.g.Z();if(!(3>Ye)&&(Ye!=3||this.g&&(this.h.h||this.g.oa()||Kd(this.g)))){this.J||Ye!=4||d==7||(d==8||0>=xr?Ps(3):Ps(2)),Ic(this);var f=this.g.Z();this.X=f;t:if(Rd(this)){var _=Kd(this.g);a="";var V=_.length,M=Ht(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){$n(this),Ds(this);var Q="";break t}this.h.i=new c.TextDecoder}for(d=0;d<V;d++)this.h.h=!0,a+=this.h.i.decode(_[d],{stream:!(M&&d==V-1)});_.length=0,this.h.g+=a,this.C=0,Q=this.h.g}else Q=this.g.oa();if(this.o=f==200,Gv(this.i,this.u,this.A,this.l,this.R,Ye,f),this.o){if(this.T&&!this.K){t:{if(this.g){var Ae,He=this.g;if((Ae=He.g?He.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!R(Ae)){var be=Ae;break t}}be=null}if(f=be)Cr(this.i,this.l,f,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Ec(this,f);else{this.o=!1,this.s=3,it(12),$n(this),Ds(this);break e}}if(this.P){f=!0;let Rt;for(;!this.J&&this.C<Q.length;)if(Rt=Wv(this,Q),Rt==bc){Ye==4&&(this.s=4,it(14),f=!1),Cr(this.i,this.l,null,"[Incomplete Response]");break}else if(Rt==Ad){this.s=4,it(15),Cr(this.i,this.l,Q,"[Invalid Chunk]"),f=!1;break}else Cr(this.i,this.l,Rt,null),Ec(this,Rt);if(Rd(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ye!=4||Q.length!=0||this.h.h||(this.s=1,it(16),f=!1),this.o=this.o&&f,!f)Cr(this.i,this.l,Q,"[Invalid Chunked Response]"),$n(this),Ds(this);else if(0<Q.length&&!this.W){this.W=!0;var Qe=this.j;Qe.g==this&&Qe.ba&&!Qe.M&&(Qe.j.info("Great, no buffering proxy detected. Bytes received: "+Q.length),kc(Qe),Qe.M=!0,it(11))}}else Cr(this.i,this.l,Q,null),Ec(this,Q);Ye==4&&$n(this),this.o&&!this.J&&(Ye==4?eh(this.j,this):(this.o=!1,Zi(this)))}else dy(this.g),f==400&&0<Q.indexOf("Unknown SID")?(this.s=3,it(12)):(this.s=0,it(13)),$n(this),Ds(this)}}}catch{}finally{}};function Rd(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function Wv(a,d){var f=a.C,_=d.indexOf(`
`,f);return _==-1?bc:(f=Number(d.substring(f,_)),isNaN(f)?Ad:(_+=1,_+f>d.length?bc:(d=d.slice(_,_+f),a.C=_+f,d)))}cn.prototype.cancel=function(){this.J=!0,$n(this)};function Zi(a){a.S=Date.now()+a.I,Cd(a,a.I)}function Cd(a,d){if(a.B!=null)throw Error("WatchDog timer not null");a.B=xs(g(a.ba,a),d)}function Ic(a){a.B&&(c.clearTimeout(a.B),a.B=null)}cn.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(Hv(this.i,this.A),this.L!=2&&(Ps(),it(17)),$n(this),this.s=2,Ds(this)):Cd(this,this.S-a)};function Ds(a){a.j.G==0||a.J||eh(a.j,a)}function $n(a){Ic(a);var d=a.M;d&&typeof d.ma=="function"&&d.ma(),a.M=null,gd(a.U),a.g&&(d=a.g,a.g=null,d.abort(),d.ma())}function Ec(a,d){try{var f=a.j;if(f.G!=0&&(f.g==a||Tc(f.h,a))){if(!a.K&&Tc(f.h,a)&&f.G==3){try{var _=f.Da.g.parse(d)}catch{_=null}if(Array.isArray(_)&&_.length==3){var V=_;if(V[0]==0){e:if(!f.u){if(f.g)if(f.g.F+3e3<a.F)co(f),oo(f);else break e;Cc(f),it(18)}}else f.za=V[1],0<f.za-f.T&&37500>V[2]&&f.F&&f.v==0&&!f.C&&(f.C=xs(g(f.Za,f),6e3));if(1>=xd(f.h)&&f.ca){try{f.ca()}catch{}f.ca=void 0}}else jn(f,11)}else if((a.K||f.g==a)&&co(f),!R(d))for(V=f.Da.g.parse(d),d=0;d<V.length;d++){let be=V[d];if(f.T=be[0],be=be[1],f.G==2)if(be[0]=="c"){f.K=be[1],f.ia=be[2];const Qe=be[3];Qe!=null&&(f.la=Qe,f.j.info("VER="+f.la));const Ye=be[4];Ye!=null&&(f.Aa=Ye,f.j.info("SVER="+f.Aa));const xr=be[5];xr!=null&&typeof xr=="number"&&0<xr&&(_=1.5*xr,f.L=_,f.j.info("backChannelRequestTimeoutMs_="+_)),_=f;const Rt=a.g;if(Rt){const uo=Rt.g?Rt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(uo){var M=_.h;M.g||uo.indexOf("spdy")==-1&&uo.indexOf("quic")==-1&&uo.indexOf("h2")==-1||(M.j=M.l,M.g=new Set,M.h&&(Ac(M,M.h),M.h=null))}if(_.D){const Pc=Rt.g?Rt.g.getResponseHeader("X-HTTP-Session-Id"):null;Pc&&(_.ya=Pc,Re(_.I,_.D,Pc))}}f.G=3,f.l&&f.l.ua(),f.ba&&(f.R=Date.now()-a.F,f.j.info("Handshake RTT: "+f.R+"ms")),_=f;var Q=a;if(_.qa=rh(_,_.J?_.ia:null,_.W),Q.K){Nd(_.h,Q);var Ae=Q,He=_.L;He&&(Ae.I=He),Ae.B&&(Ic(Ae),Zi(Ae)),_.g=Q}else Xd(_);0<f.i.length&&ao(f)}else be[0]!="stop"&&be[0]!="close"||jn(f,7);else f.G==3&&(be[0]=="stop"||be[0]=="close"?be[0]=="stop"?jn(f,7):Rc(f):be[0]!="noop"&&f.l&&f.l.ta(be),f.v=0)}}Ps(4)}catch{}}var Qv=class{constructor(a,d){this.g=a,this.map=d}};function kd(a){this.l=a||10,c.PerformanceNavigationTiming?(a=c.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Pd(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function xd(a){return a.h?1:a.g?a.g.size:0}function Tc(a,d){return a.h?a.h==d:a.g?a.g.has(d):!1}function Ac(a,d){a.g?a.g.add(d):a.h=d}function Nd(a,d){a.h&&a.h==d?a.h=null:a.g&&a.g.has(d)&&a.g.delete(d)}kd.prototype.cancel=function(){if(this.i=Dd(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Dd(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let d=a.i;for(const f of a.g.values())d=d.concat(f.D);return d}return k(a.i)}function Yv(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(l(a)){for(var d=[],f=a.length,_=0;_<f;_++)d.push(a[_]);return d}d=[],f=0;for(_ in a)d[f++]=a[_];return d}function Jv(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(l(a)||typeof a=="string"){var d=[];a=a.length;for(var f=0;f<a;f++)d.push(f);return d}d=[],f=0;for(const _ in a)d[f++]=_;return d}}}function Vd(a,d){if(a.forEach&&typeof a.forEach=="function")a.forEach(d,void 0);else if(l(a)||typeof a=="string")Array.prototype.forEach.call(a,d,void 0);else for(var f=Jv(a),_=Yv(a),V=_.length,M=0;M<V;M++)d.call(void 0,_[M],f&&f[M],a)}var Od=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Xv(a,d){if(a){a=a.split("&");for(var f=0;f<a.length;f++){var _=a[f].indexOf("="),V=null;if(0<=_){var M=a[f].substring(0,_);V=a[f].substring(_+1)}else M=a[f];d(M,V?decodeURIComponent(V.replace(/\+/g," ")):"")}}}function qn(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof qn){this.h=a.h,eo(this,a.j),this.o=a.o,this.g=a.g,to(this,a.s),this.l=a.l;var d=a.i,f=new Ls;f.i=d.i,d.g&&(f.g=new Map(d.g),f.h=d.h),Ld(this,f),this.m=a.m}else a&&(d=String(a).match(Od))?(this.h=!1,eo(this,d[1]||"",!0),this.o=Vs(d[2]||""),this.g=Vs(d[3]||"",!0),to(this,d[4]),this.l=Vs(d[5]||"",!0),Ld(this,d[6]||"",!0),this.m=Vs(d[7]||"")):(this.h=!1,this.i=new Ls(null,this.h))}qn.prototype.toString=function(){var a=[],d=this.j;d&&a.push(Os(d,Md,!0),":");var f=this.g;return(f||d=="file")&&(a.push("//"),(d=this.o)&&a.push(Os(d,Md,!0),"@"),a.push(encodeURIComponent(String(f)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.s,f!=null&&a.push(":",String(f))),(f=this.l)&&(this.g&&f.charAt(0)!="/"&&a.push("/"),a.push(Os(f,f.charAt(0)=="/"?ty:ey,!0))),(f=this.i.toString())&&a.push("?",f),(f=this.m)&&a.push("#",Os(f,ry)),a.join("")};function Gt(a){return new qn(a)}function eo(a,d,f){a.j=f?Vs(d,!0):d,a.j&&(a.j=a.j.replace(/:$/,""))}function to(a,d){if(d){if(d=Number(d),isNaN(d)||0>d)throw Error("Bad port number "+d);a.s=d}else a.s=null}function Ld(a,d,f){d instanceof Ls?(a.i=d,sy(a.i,a.h)):(f||(d=Os(d,ny)),a.i=new Ls(d,a.h))}function Re(a,d,f){a.i.set(d,f)}function no(a){return Re(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Vs(a,d){return a?d?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Os(a,d,f){return typeof a=="string"?(a=encodeURI(a).replace(d,Zv),f&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Zv(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Md=/[#\/\?@]/g,ey=/[#\?:]/g,ty=/[#\?]/g,ny=/[#\?@]/g,ry=/#/g;function Ls(a,d){this.h=this.g=null,this.i=a||null,this.j=!!d}function ln(a){a.g||(a.g=new Map,a.h=0,a.i&&Xv(a.i,function(d,f){a.add(decodeURIComponent(d.replace(/\+/g," ")),f)}))}n=Ls.prototype,n.add=function(a,d){ln(this),this.i=null,a=kr(this,a);var f=this.g.get(a);return f||this.g.set(a,f=[]),f.push(d),this.h+=1,this};function Fd(a,d){ln(a),d=kr(a,d),a.g.has(d)&&(a.i=null,a.h-=a.g.get(d).length,a.g.delete(d))}function Ud(a,d){return ln(a),d=kr(a,d),a.g.has(d)}n.forEach=function(a,d){ln(this),this.g.forEach(function(f,_){f.forEach(function(V){a.call(d,V,_,this)},this)},this)},n.na=function(){ln(this);const a=Array.from(this.g.values()),d=Array.from(this.g.keys()),f=[];for(let _=0;_<d.length;_++){const V=a[_];for(let M=0;M<V.length;M++)f.push(d[_])}return f},n.V=function(a){ln(this);let d=[];if(typeof a=="string")Ud(this,a)&&(d=d.concat(this.g.get(kr(this,a))));else{a=Array.from(this.g.values());for(let f=0;f<a.length;f++)d=d.concat(a[f])}return d},n.set=function(a,d){return ln(this),this.i=null,a=kr(this,a),Ud(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[d]),this.h+=1,this},n.get=function(a,d){return a?(a=this.V(a),0<a.length?String(a[0]):d):d};function Bd(a,d,f){Fd(a,d),0<f.length&&(a.i=null,a.g.set(kr(a,d),k(f)),a.h+=f.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],d=Array.from(this.g.keys());for(var f=0;f<d.length;f++){var _=d[f];const M=encodeURIComponent(String(_)),Q=this.V(_);for(_=0;_<Q.length;_++){var V=M;Q[_]!==""&&(V+="="+encodeURIComponent(String(Q[_]))),a.push(V)}}return this.i=a.join("&")};function kr(a,d){return d=String(d),a.j&&(d=d.toLowerCase()),d}function sy(a,d){d&&!a.j&&(ln(a),a.i=null,a.g.forEach(function(f,_){var V=_.toLowerCase();_!=V&&(Fd(this,_),Bd(this,V,f))},a)),a.j=d}function iy(a,d){const f=new Ns;if(c.Image){const _=new Image;_.onload=E(un,f,"TestLoadImage: loaded",!0,d,_),_.onerror=E(un,f,"TestLoadImage: error",!1,d,_),_.onabort=E(un,f,"TestLoadImage: abort",!1,d,_),_.ontimeout=E(un,f,"TestLoadImage: timeout",!1,d,_),c.setTimeout(function(){_.ontimeout&&_.ontimeout()},1e4),_.src=a}else d(!1)}function oy(a,d){const f=new Ns,_=new AbortController,V=setTimeout(()=>{_.abort(),un(f,"TestPingServer: timeout",!1,d)},1e4);fetch(a,{signal:_.signal}).then(M=>{clearTimeout(V),M.ok?un(f,"TestPingServer: ok",!0,d):un(f,"TestPingServer: server error",!1,d)}).catch(()=>{clearTimeout(V),un(f,"TestPingServer: error",!1,d)})}function un(a,d,f,_,V){try{V&&(V.onload=null,V.onerror=null,V.onabort=null,V.ontimeout=null),_(f)}catch{}}function ay(){this.g=new jv}function cy(a,d,f){const _=f||"";try{Vd(a,function(V,M){let Q=V;h(V)&&(Q=mc(V)),d.push(_+M+"="+encodeURIComponent(Q))})}catch(V){throw d.push(_+"type="+encodeURIComponent("_badmap")),V}}function ro(a){this.l=a.Ub||null,this.j=a.eb||!1}S(ro,gc),ro.prototype.g=function(){return new so(this.l,this.j)},ro.prototype.i=function(a){return function(){return a}}({});function so(a,d){We.call(this),this.D=a,this.o=d,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}S(so,We),n=so.prototype,n.open=function(a,d){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=d,this.readyState=1,Fs(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const d={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(d.body=a),(this.D||c).fetch(new Request(this.A,d)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Ms(this)),this.readyState=0},n.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Fs(this)),this.g&&(this.readyState=3,Fs(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;$d(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function $d(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}n.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var d=a.value?a.value:new Uint8Array(0);(d=this.v.decode(d,{stream:!a.done}))&&(this.response=this.responseText+=d)}a.done?Ms(this):Fs(this),this.readyState==3&&$d(this)}},n.Ra=function(a){this.g&&(this.response=this.responseText=a,Ms(this))},n.Qa=function(a){this.g&&(this.response=a,Ms(this))},n.ga=function(){this.g&&Ms(this)};function Ms(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Fs(a)}n.setRequestHeader=function(a,d){this.u.append(a,d)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],d=this.h.entries();for(var f=d.next();!f.done;)f=f.value,a.push(f[0]+": "+f[1]),f=d.next();return a.join(`\r
`)};function Fs(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(so.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function qd(a){let d="";return F(a,function(f,_){d+=_,d+=":",d+=f,d+=`\r
`}),d}function Sc(a,d,f){e:{for(_ in f){var _=!1;break e}_=!0}_||(f=qd(f),typeof a=="string"?f!=null&&encodeURIComponent(String(f)):Re(a,d,f))}function Le(a){We.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}S(Le,We);var ly=/^https?$/i,uy=["POST","PUT"];n=Le.prototype,n.Ha=function(a){this.J=a},n.ea=function(a,d,f,_){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);d=d?d.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():yc.g(),this.v=this.o?_d(this.o):_d(yc),this.g.onreadystatechange=g(this.Ea,this);try{this.B=!0,this.g.open(d,String(a),!0),this.B=!1}catch(M){jd(this,M);return}if(a=f||"",f=new Map(this.headers),_)if(Object.getPrototypeOf(_)===Object.prototype)for(var V in _)f.set(V,_[V]);else if(typeof _.keys=="function"&&typeof _.get=="function")for(const M of _.keys())f.set(M,_.get(M));else throw Error("Unknown input type for opt_headers: "+String(_));_=Array.from(f.keys()).find(M=>M.toLowerCase()=="content-type"),V=c.FormData&&a instanceof c.FormData,!(0<=Array.prototype.indexOf.call(uy,d,void 0))||_||V||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[M,Q]of f)this.g.setRequestHeader(M,Q);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Hd(this),this.u=!0,this.g.send(a),this.u=!1}catch(M){jd(this,M)}};function jd(a,d){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=d,a.m=5,zd(a),io(a)}function zd(a){a.A||(a.A=!0,st(a,"complete"),st(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,st(this,"complete"),st(this,"abort"),io(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),io(this,!0)),Le.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Gd(this):this.bb())},n.bb=function(){Gd(this)};function Gd(a){if(a.h&&typeof o<"u"&&(!a.v[1]||Ht(a)!=4||a.Z()!=2)){if(a.u&&Ht(a)==4)fd(a.Ea,0,a);else if(st(a,"readystatechange"),Ht(a)==4){a.h=!1;try{const Q=a.Z();e:switch(Q){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var d=!0;break e;default:d=!1}var f;if(!(f=d)){var _;if(_=Q===0){var V=String(a.D).match(Od)[1]||null;!V&&c.self&&c.self.location&&(V=c.self.location.protocol.slice(0,-1)),_=!ly.test(V?V.toLowerCase():"")}f=_}if(f)st(a,"complete"),st(a,"success");else{a.m=6;try{var M=2<Ht(a)?a.g.statusText:""}catch{M=""}a.l=M+" ["+a.Z()+"]",zd(a)}}finally{io(a)}}}}function io(a,d){if(a.g){Hd(a);const f=a.g,_=a.v[0]?()=>{}:null;a.g=null,a.v=null,d||st(a,"ready");try{f.onreadystatechange=_}catch{}}}function Hd(a){a.I&&(c.clearTimeout(a.I),a.I=null)}n.isActive=function(){return!!this.g};function Ht(a){return a.g?a.g.readyState:0}n.Z=function(){try{return 2<Ht(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(a){if(this.g){var d=this.g.responseText;return a&&d.indexOf(a)==0&&(d=d.substring(a.length)),qv(d)}};function Kd(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function dy(a){const d={};a=(a.g&&2<=Ht(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let _=0;_<a.length;_++){if(R(a[_]))continue;var f=b(a[_]);const V=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const M=d[V]||[];d[V]=M,M.push(f)}I(d,function(_){return _.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Us(a,d,f){return f&&f.internalChannelParams&&f.internalChannelParams[a]||d}function Wd(a){this.Aa=0,this.i=[],this.j=new Ns,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Us("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Us("baseRetryDelayMs",5e3,a),this.cb=Us("retryDelaySeedMs",1e4,a),this.Wa=Us("forwardChannelMaxRetries",2,a),this.wa=Us("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new kd(a&&a.concurrentRequestLimit),this.Da=new ay,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Wd.prototype,n.la=8,n.G=1,n.connect=function(a,d,f,_){it(0),this.W=a,this.H=d||{},f&&_!==void 0&&(this.H.OSID=f,this.H.OAID=_),this.F=this.X,this.I=rh(this,null,this.W),ao(this)};function Rc(a){if(Qd(a),a.G==3){var d=a.U++,f=Gt(a.I);if(Re(f,"SID",a.K),Re(f,"RID",d),Re(f,"TYPE","terminate"),Bs(a,f),d=new cn(a,a.j,d),d.L=2,d.v=no(Gt(f)),f=!1,c.navigator&&c.navigator.sendBeacon)try{f=c.navigator.sendBeacon(d.v.toString(),"")}catch{}!f&&c.Image&&(new Image().src=d.v,f=!0),f||(d.g=sh(d.j,null),d.g.ea(d.v)),d.F=Date.now(),Zi(d)}nh(a)}function oo(a){a.g&&(kc(a),a.g.cancel(),a.g=null)}function Qd(a){oo(a),a.u&&(c.clearTimeout(a.u),a.u=null),co(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&c.clearTimeout(a.s),a.s=null)}function ao(a){if(!Pd(a.h)&&!a.s){a.s=!0;var d=a.Ga;ye||z(),Fe||(ye(),Fe=!0),x.add(d,a),a.B=0}}function hy(a,d){return xd(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=d.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=xs(g(a.Ga,a,d),th(a,a.B)),a.B++,!0)}n.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const V=new cn(this,this.j,a);let M=this.o;if(this.S&&(M?(M=v(M),A(M,this.S)):M=this.S),this.m!==null||this.O||(V.H=M,M=null),this.P)e:{for(var d=0,f=0;f<this.i.length;f++){t:{var _=this.i[f];if("__data__"in _.map&&(_=_.map.__data__,typeof _=="string")){_=_.length;break t}_=void 0}if(_===void 0)break;if(d+=_,4096<d){d=f;break e}if(d===4096||f===this.i.length-1){d=f+1;break e}}d=1e3}else d=1e3;d=Jd(this,V,d),f=Gt(this.I),Re(f,"RID",a),Re(f,"CVER",22),this.D&&Re(f,"X-HTTP-Session-Id",this.D),Bs(this,f),M&&(this.O?d="headers="+encodeURIComponent(String(qd(M)))+"&"+d:this.m&&Sc(f,this.m,M)),Ac(this.h,V),this.Ua&&Re(f,"TYPE","init"),this.P?(Re(f,"$req",d),Re(f,"SID","null"),V.T=!0,wc(V,f,null)):wc(V,f,d),this.G=2}}else this.G==3&&(a?Yd(this,a):this.i.length==0||Pd(this.h)||Yd(this))};function Yd(a,d){var f;d?f=d.l:f=a.U++;const _=Gt(a.I);Re(_,"SID",a.K),Re(_,"RID",f),Re(_,"AID",a.T),Bs(a,_),a.m&&a.o&&Sc(_,a.m,a.o),f=new cn(a,a.j,f,a.B+1),a.m===null&&(f.H=a.o),d&&(a.i=d.D.concat(a.i)),d=Jd(a,f,1e3),f.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),Ac(a.h,f),wc(f,_,d)}function Bs(a,d){a.H&&F(a.H,function(f,_){Re(d,_,f)}),a.l&&Vd({},function(f,_){Re(d,_,f)})}function Jd(a,d,f){f=Math.min(a.i.length,f);var _=a.l?g(a.l.Na,a.l,a):null;e:{var V=a.i;let M=-1;for(;;){const Q=["count="+f];M==-1?0<f?(M=V[0].g,Q.push("ofs="+M)):M=0:Q.push("ofs="+M);let Ae=!0;for(let He=0;He<f;He++){let be=V[He].g;const Qe=V[He].map;if(be-=M,0>be)M=Math.max(0,V[He].g-100),Ae=!1;else try{cy(Qe,Q,"req"+be+"_")}catch{_&&_(Qe)}}if(Ae){_=Q.join("&");break e}}}return a=a.i.splice(0,f),d.D=a,_}function Xd(a){if(!a.g&&!a.u){a.Y=1;var d=a.Fa;ye||z(),Fe||(ye(),Fe=!0),x.add(d,a),a.v=0}}function Cc(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=xs(g(a.Fa,a),th(a,a.v)),a.v++,!0)}n.Fa=function(){if(this.u=null,Zd(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=xs(g(this.ab,this),a)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,it(10),oo(this),Zd(this))};function kc(a){a.A!=null&&(c.clearTimeout(a.A),a.A=null)}function Zd(a){a.g=new cn(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var d=Gt(a.qa);Re(d,"RID","rpc"),Re(d,"SID",a.K),Re(d,"AID",a.T),Re(d,"CI",a.F?"0":"1"),!a.F&&a.ja&&Re(d,"TO",a.ja),Re(d,"TYPE","xmlhttp"),Bs(a,d),a.m&&a.o&&Sc(d,a.m,a.o),a.L&&(a.g.I=a.L);var f=a.g;a=a.ia,f.L=1,f.v=no(Gt(d)),f.m=null,f.P=!0,Sd(f,a)}n.Za=function(){this.C!=null&&(this.C=null,oo(this),Cc(this),it(19))};function co(a){a.C!=null&&(c.clearTimeout(a.C),a.C=null)}function eh(a,d){var f=null;if(a.g==d){co(a),kc(a),a.g=null;var _=2}else if(Tc(a.h,d))f=d.D,Nd(a.h,d),_=1;else return;if(a.G!=0){if(d.o)if(_==1){f=d.m?d.m.length:0,d=Date.now()-d.F;var V=a.B;_=Yi(),st(_,new Id(_,f)),ao(a)}else Xd(a);else if(V=d.s,V==3||V==0&&0<d.X||!(_==1&&hy(a,d)||_==2&&Cc(a)))switch(f&&0<f.length&&(d=a.h,d.i=d.i.concat(f)),V){case 1:jn(a,5);break;case 4:jn(a,10);break;case 3:jn(a,6);break;default:jn(a,2)}}}function th(a,d){let f=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(f*=2),f*d}function jn(a,d){if(a.j.info("Error code "+d),d==2){var f=g(a.fb,a),_=a.Xa;const V=!_;_=new qn(_||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||eo(_,"https"),no(_),V?iy(_.toString(),f):oy(_.toString(),f)}else it(2);a.G=0,a.l&&a.l.sa(d),nh(a),Qd(a)}n.fb=function(a){a?(this.j.info("Successfully pinged google.com"),it(2)):(this.j.info("Failed to ping google.com"),it(1))};function nh(a){if(a.G=0,a.ka=[],a.l){const d=Dd(a.h);(d.length!=0||a.i.length!=0)&&(T(a.ka,d),T(a.ka,a.i),a.h.i.length=0,k(a.i),a.i.length=0),a.l.ra()}}function rh(a,d,f){var _=f instanceof qn?Gt(f):new qn(f);if(_.g!="")d&&(_.g=d+"."+_.g),to(_,_.s);else{var V=c.location;_=V.protocol,d=d?d+"."+V.hostname:V.hostname,V=+V.port;var M=new qn(null);_&&eo(M,_),d&&(M.g=d),V&&to(M,V),f&&(M.l=f),_=M}return f=a.D,d=a.ya,f&&d&&Re(_,f,d),Re(_,"VER",a.la),Bs(a,_),_}function sh(a,d,f){if(d&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return d=a.Ca&&!a.pa?new Le(new ro({eb:f})):new Le(a.pa),d.Ha(a.J),d}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function ih(){}n=ih.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function lo(){}lo.prototype.g=function(a,d){return new mt(a,d)};function mt(a,d){We.call(this),this.g=new Wd(d),this.l=a,this.h=d&&d.messageUrlParams||null,a=d&&d.messageHeaders||null,d&&d.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=d&&d.initMessageHeaders||null,d&&d.messageContentType&&(a?a["X-WebChannel-Content-Type"]=d.messageContentType:a={"X-WebChannel-Content-Type":d.messageContentType}),d&&d.va&&(a?a["X-WebChannel-Client-Profile"]=d.va:a={"X-WebChannel-Client-Profile":d.va}),this.g.S=a,(a=d&&d.Sb)&&!R(a)&&(this.g.m=a),this.v=d&&d.supportsCrossDomainXhr||!1,this.u=d&&d.sendRawJson||!1,(d=d&&d.httpSessionIdParam)&&!R(d)&&(this.g.D=d,a=this.h,a!==null&&d in a&&(a=this.h,d in a&&delete a[d])),this.j=new Pr(this)}S(mt,We),mt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},mt.prototype.close=function(){Rc(this.g)},mt.prototype.o=function(a){var d=this.g;if(typeof a=="string"){var f={};f.__data__=a,a=f}else this.u&&(f={},f.__data__=mc(a),a=f);d.i.push(new Qv(d.Ya++,a)),d.G==3&&ao(d)},mt.prototype.N=function(){this.g.l=null,delete this.j,Rc(this.g),delete this.g,mt.aa.N.call(this)};function oh(a){_c.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var d=a.__sm__;if(d){e:{for(const f in d){a=f;break e}a=void 0}(this.i=a)&&(a=this.i,d=d!==null&&a in d?d[a]:void 0),this.data=d}else this.data=a}S(oh,_c);function ah(){vc.call(this),this.status=1}S(ah,vc);function Pr(a){this.g=a}S(Pr,ih),Pr.prototype.ua=function(){st(this.g,"a")},Pr.prototype.ta=function(a){st(this.g,new oh(a))},Pr.prototype.sa=function(a){st(this.g,new ah)},Pr.prototype.ra=function(){st(this.g,"b")},lo.prototype.createWebChannel=lo.prototype.g,mt.prototype.send=mt.prototype.o,mt.prototype.open=mt.prototype.m,mt.prototype.close=mt.prototype.close,Vm=function(){return new lo},Dm=function(){return Yi()},Nm=Bn,il={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Ji.NO_ERROR=0,Ji.TIMEOUT=8,Ji.HTTP_ERROR=6,Do=Ji,Ed.COMPLETE="complete",xm=Ed,vd.EventType=ks,ks.OPEN="a",ks.CLOSE="b",ks.ERROR="c",ks.MESSAGE="d",We.prototype.listen=We.prototype.K,Qs=vd,Le.prototype.listenOnce=Le.prototype.L,Le.prototype.getLastError=Le.prototype.Ka,Le.prototype.getLastErrorCode=Le.prototype.Ba,Le.prototype.getStatus=Le.prototype.Z,Le.prototype.getResponseJson=Le.prototype.Oa,Le.prototype.getResponseText=Le.prototype.oa,Le.prototype.send=Le.prototype.ea,Le.prototype.setWithCredentials=Le.prototype.Ha,Pm=Le}).apply(typeof fo<"u"?fo:typeof self<"u"?self:typeof window<"u"?window:{});const Uh="@firebase/firestore",Bh="4.7.7";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ot.UNAUTHENTICATED=new ot(null),ot.GOOGLE_CREDENTIALS=new ot("google-credentials-uid"),ot.FIRST_PARTY=new ot("first-party-uid"),ot.MOCK_USER=new ot("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ts="11.3.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dr=new xa("@firebase/firestore");function Fr(){return dr.logLevel}function H(n,...e){if(dr.logLevel<=me.DEBUG){const t=e.map(tu);dr.debug(`Firestore (${Ts}): ${n}`,...t)}}function at(n,...e){if(dr.logLevel<=me.ERROR){const t=e.map(tu);dr.error(`Firestore (${Ts}): ${n}`,...t)}}function pi(n,...e){if(dr.logLevel<=me.WARN){const t=e.map(tu);dr.warn(`Firestore (${Ts}): ${n}`,...t)}}function tu(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
 */function ee(n="Unexpected state"){const e=`FIRESTORE (${Ts}) INTERNAL ASSERTION FAILED: `+n;throw at(e),new Error(e)}function te(n,e){n||ee()}function de(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const U={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class W extends $t{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cE{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class lE{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(ot.UNAUTHENTICATED))}shutdown(){}}class uE{constructor(e){this.t=e,this.currentUser=ot.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){te(this.o===void 0);let r=this.i;const s=l=>this.i!==r?(r=this.i,t(l)):Promise.resolve();let i=new Ft;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Ft,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const l=i;e.enqueueRetryable(async()=>{await l.promise,await s(this.currentUser)})},c=l=>{H("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(l=>c(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):(H("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Ft)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(H("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(te(typeof r.accessToken=="string"),new cE(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return te(e===null||typeof e=="string"),new ot(e)}}class dE{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=ot.FIRST_PARTY,this.T=new Map}I(){return this.P?this.P():null}get headers(){this.T.set("X-Goog-AuthUser",this.l);const e=this.I();return e&&this.T.set("Authorization",e),this.h&&this.T.set("X-Goog-Iam-Authorization-Token",this.h),this.T}}class hE{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new dE(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(ot.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class $h{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class fE{constructor(e,t){this.A=t,this.forceRefresh=!1,this.appCheck=null,this.R=null,this.V=null,Tt(e)&&e.settings.appCheckToken&&(this.V=e.settings.appCheckToken)}start(e,t){te(this.o===void 0);const r=i=>{i.error!=null&&H("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.R;return this.R=i.token,H("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{H("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):H("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.V)return Promise.resolve(new $h(this.V));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(te(typeof t.token=="string"),this.R=t.token,new $h(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pE(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */function ol(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Om{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=pE(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function ue(n,e){return n<e?-1:n>e?1:0}function al(n,e){const t=ol().encode(n),r=ol().encode(e);for(let s=0;s<Math.min(t.length,r.length);s++){const i=ue(t[s],r[s]);if(i!==0)return i}return ue(t.length,r.length)}function ts(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}function Lm(n){return n+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qh=-62135596800,jh=1e6;class Oe{static now(){return Oe.fromMillis(Date.now())}static fromDate(e){return Oe.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*jh);return new Oe(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new W(U.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new W(U.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<qh)throw new W(U.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new W(U.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/jh}_compareTo(e){return this.seconds===e.seconds?ue(this.nanoseconds,e.nanoseconds):ue(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds-qh;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{static fromTimestamp(e){return new se(e)}static min(){return new se(new Oe(0,0))}static max(){return new se(new Oe(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zh="__name__";class Nt{constructor(e,t,r){t===void 0?t=0:t>e.length&&ee(),r===void 0?r=e.length-t:r>e.length-t&&ee(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Nt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Nt?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=Nt.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return ue(e.length,t.length)}static compareSegments(e,t){const r=Nt.isNumericId(e),s=Nt.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?Nt.extractNumericId(e).compare(Nt.extractNumericId(t)):al(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return An.fromString(e.substring(4,e.length-2))}}class we extends Nt{construct(e,t,r){return new we(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new W(U.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new we(t)}static emptyPath(){return new we([])}}const mE=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ve extends Nt{construct(e,t,r){return new Ve(e,t,r)}static isValidIdentifier(e){return mE.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ve.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===zh}static keyField(){return new Ve([zh])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new W(U.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new W(U.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[s+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new W(U.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(r+=c,s++):(i(),s++)}if(i(),o)throw new W(U.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ve(t)}static emptyPath(){return new Ve([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const mi=-1;class ta{constructor(e,t,r,s){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=s}}function cl(n){return n.fields.find(e=>e.kind===2)}function Wn(n){return n.fields.filter(e=>e.kind!==2)}ta.UNKNOWN_ID=-1;class Vo{constructor(e,t){this.fieldPath=e,this.kind=t}}class gi{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new gi(0,bt.min())}}function gE(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=se.fromTimestamp(r===1e9?new Oe(t+1,0):new Oe(t,r));return new bt(s,J.empty(),e)}function Mm(n){return new bt(n.readTime,n.key,mi)}class bt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new bt(se.min(),J.empty(),mi)}static max(){return new bt(se.max(),J.empty(),mi)}}function nu(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=J.comparator(n.documentKey,e.documentKey),t!==0?t:ue(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fm="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Um{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ir(n){if(n.code!==U.FAILED_PRECONDITION||n.message!==Fm)throw n;H("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&ee(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new D((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof D?t:D.resolve(t)}catch(t){return D.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):D.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):D.reject(t)}static resolve(e){return new D((t,r)=>{t(e)})}static reject(e){return new D((t,r)=>{r(e)})}static waitFor(e){return new D((t,r)=>{let s=0,i=0,o=!1;e.forEach(c=>{++s,c.next(()=>{++i,o&&i===s&&t()},l=>r(l))}),o=!0,i===s&&t()})}static or(e){let t=D.resolve(!1);for(const r of e)t=t.next(s=>s?D.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new D((r,s)=>{const i=e.length,o=new Array(i);let c=0;for(let l=0;l<i;l++){const h=l;t(e[h]).next(p=>{o[h]=p,++c,c===i&&r(o)},p=>s(p))}})}static doWhile(e,t){return new D((r,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _t="SimpleDb";class La{static open(e,t,r,s){try{return new La(t,e.transaction(s,r))}catch(i){throw new ti(t,i)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.m=new Ft,this.transaction.oncomplete=()=>{this.m.resolve()},this.transaction.onabort=()=>{t.error?this.m.reject(new ti(e,t.error)):this.m.resolve()},this.transaction.onerror=r=>{const s=ru(r.target.error);this.m.reject(new ti(e,s))}}get p(){return this.m.promise}abort(e){e&&this.m.reject(e),this.aborted||(H(_t,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}S(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new vE(t)}}class Sn{static delete(e){return H(_t,"Removing database:",e),Xn(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!Pa())return!1;if(Sn.v())return!0;const e=je(),t=Sn.C(e),r=0<t&&t<10,s=Bm(e),i=0<s&&s<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||i)}static v(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.F)==="YES"}static M(e,t){return e.store(t)}static C(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}constructor(e,t,r){this.name=e,this.version=t,this.O=r,Sn.C(je())===12.2&&at("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async N(e){return this.db||(H(_t,"Opening database:",this.name),this.db=await new Promise((t,r)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const o=i.target.result;t(o)},s.onblocked=()=>{r(new ti(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const o=i.target.error;o.name==="VersionError"?r(new W(U.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new W(U.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new ti(e,o))},s.onupgradeneeded=i=>{H(_t,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const o=i.target.result;this.O.B(o,s.transaction,i.oldVersion,this.version).next(()=>{H(_t,"Database upgrade to version "+this.version+" complete")})}})),this.L&&(this.db.onversionchange=t=>this.L(t)),this.db}k(e){this.L=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,s){const i=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.N(e);const c=La.open(this.db,e,i?"readonly":"readwrite",r),l=s(c).next(h=>(c.S(),h)).catch(h=>(c.abort(h),D.reject(h))).toPromise();return l.catch(()=>{}),await c.p,l}catch(c){const l=c,h=l.name!=="FirebaseError"&&o<3;if(H(_t,"Transaction failed with error:",l.message,"Retrying:",h),this.close(),!h)return Promise.reject(l)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Bm(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class _E{constructor(e){this.q=e,this.$=!1,this.U=null}get isDone(){return this.$}get K(){return this.U}set cursor(e){this.q=e}done(){this.$=!0}W(e){this.U=e}delete(){return Xn(this.q.delete())}}class ti extends W{constructor(e,t){super(U.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function On(n){return n.name==="IndexedDbTransactionError"}class vE{constructor(e){this.store=e}put(e,t){let r;return t!==void 0?(H(_t,"PUT",this.store.name,e,t),r=this.store.put(t,e)):(H(_t,"PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),Xn(r)}add(e){return H(_t,"ADD",this.store.name,e,e),Xn(this.store.add(e))}get(e){return Xn(this.store.get(e)).next(t=>(t===void 0&&(t=null),H(_t,"GET",this.store.name,e,t),t))}delete(e){return H(_t,"DELETE",this.store.name,e),Xn(this.store.delete(e))}count(){return H(_t,"COUNT",this.store.name),Xn(this.store.count())}G(e,t){const r=this.options(e,t),s=r.index?this.store.index(r.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(r.range);return new D((o,c)=>{i.onerror=l=>{c(l.target.error)},i.onsuccess=l=>{o(l.target.result)}})}{const i=this.cursor(r),o=[];return this.j(i,(c,l)=>{o.push(l)}).next(()=>o)}}H(e,t){const r=this.store.getAll(e,t===null?void 0:t);return new D((s,i)=>{r.onerror=o=>{i(o.target.error)},r.onsuccess=o=>{s(o.target.result)}})}J(e,t){H(_t,"DELETE ALL",this.store.name);const r=this.options(e,t);r.Y=!1;const s=this.cursor(r);return this.j(s,(i,o,c)=>c.delete())}Z(e,t){let r;t?r=e:(r={},t=e);const s=this.cursor(r);return this.j(s,t)}X(e){const t=this.cursor({});return new D((r,s)=>{t.onerror=i=>{const o=ru(i.target.error);s(o)},t.onsuccess=i=>{const o=i.target.result;o?e(o.primaryKey,o.value).next(c=>{c?o.continue():r()}):r()}})}j(e,t){const r=[];return new D((s,i)=>{e.onerror=o=>{i(o.target.error)},e.onsuccess=o=>{const c=o.target.result;if(!c)return void s();const l=new _E(c),h=t(c.primaryKey,c.value,l);if(h instanceof D){const p=h.catch(m=>(l.done(),D.reject(m)));r.push(p)}l.isDone?s():l.K===null?c.continue():c.continue(l.K)}}).next(()=>D.waitFor(r))}options(e,t){let r;return e!==void 0&&(typeof e=="string"?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const r=this.store.index(e.index);return e.Y?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function Xn(n){return new D((e,t)=>{n.onsuccess=r=>{const s=r.target.result;e(s)},n.onerror=r=>{const s=ru(r.target.error);t(s)}})}let Gh=!1;function ru(n){const e=Sn.C(je());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(t)>=0){const r=new W("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Gh||(Gh=!0,setTimeout(()=>{throw r},0)),r}}return n}const ni="IndexBackfiller";class yE{constructor(e,t){this.asyncQueue=e,this.ee=t,this.task=null}start(){this.te(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}te(e){H(ni,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{const t=await this.ee.ne();H(ni,`Documents written: ${t}`)}catch(t){On(t)?H(ni,"Ignoring IndexedDB error during index backfill: ",t):await Ir(t)}await this.te(6e4)})}}class bE{constructor(e,t){this.localStore=e,this.persistence=t}async ne(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.re(t,e))}re(e,t){const r=new Set;let s=t,i=!0;return D.doWhile(()=>i===!0&&s>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!r.has(o))return H(ni,`Processing collection: ${o}`),this.ie(e,o,s).next(c=>{s-=c,r.add(o)});i=!1})).next(()=>t-s)}ie(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(s=>this.localStore.localDocuments.getNextDocuments(e,t,s,r).next(i=>{const o=i.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this.se(s,i)).next(c=>(H(ni,`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c))).next(()=>o.size)}))}se(e,t){let r=e;return t.changes.forEach((s,i)=>{const o=Mm(i);nu(o,r)>0&&(r=o)}),new bt(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
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
 */class At{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.oe(r),this._e=r=>t.writeSequenceNumber(r))}oe(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this._e&&this._e(e),e}}At.ae=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const or=-1;function Ma(n){return n==null}function _i(n){return n===0&&1/n==-1/0}function wE(n){return typeof n=="number"&&Number.isInteger(n)&&!_i(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const na="";function tt(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Hh(e)),e=IE(n.get(t),e);return Hh(e)}function IE(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case na:t+="";break;default:t+=i}}return t}function Hh(n){return n+na+""}function Vt(n){const e=n.length;if(te(e>=2),e===2)return te(n.charAt(0)===na&&n.charAt(1)===""),we.emptyPath();const t=e-2,r=[];let s="";for(let i=0;i<e;){const o=n.indexOf(na,i);switch((o<0||o>t)&&ee(),n.charAt(o+1)){case"":const c=n.substring(i,o);let l;s.length===0?l=c:(s+=c,l=s,s=""),r.push(l);break;case"":s+=n.substring(i,o),s+="\0";break;case"":s+=n.substring(i,o+1);break;default:ee()}i=o+2}return new we(r)}/**
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
 */const Qn="remoteDocuments",Mi="owner",Nr="owner",vi="mutationQueues",EE="userId",Ct="mutations",Kh="batchId",nr="userMutationsIndex",Wh=["userId","batchId"];/**
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
 */function Oo(n,e){return[n,tt(e)]}function $m(n,e,t){return[n,tt(e),t]}const TE={},ns="documentMutations",ra="remoteDocumentsV14",AE=["prefixPath","collectionGroup","readTime","documentId"],Lo="documentKeyIndex",SE=["prefixPath","collectionGroup","documentId"],qm="collectionGroupIndex",RE=["collectionGroup","readTime","prefixPath","documentId"],yi="remoteDocumentGlobal",ll="remoteDocumentGlobalKey",rs="targets",jm="queryTargetsIndex",CE=["canonicalId","targetId"],ss="targetDocuments",kE=["targetId","path"],su="documentTargetsIndex",PE=["path","targetId"],sa="targetGlobalKey",ar="targetGlobal",bi="collectionParents",xE=["collectionId","parent"],is="clientMetadata",NE="clientId",Fa="bundles",DE="bundleId",Ua="namedQueries",VE="name",iu="indexConfiguration",OE="indexId",ul="collectionGroupIndex",LE="collectionGroup",ia="indexState",ME=["indexId","uid"],zm="sequenceNumberIndex",FE=["uid","sequenceNumber"],oa="indexEntries",UE=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],Gm="documentKeyIndex",BE=["indexId","uid","orderedDocumentKey"],Ba="documentOverlays",$E=["userId","collectionPath","documentId"],dl="collectionPathOverlayIndex",qE=["userId","collectionPath","largestBatchId"],Hm="collectionGroupOverlayIndex",jE=["userId","collectionGroup","largestBatchId"],ou="globals",zE="name",Km=[vi,Ct,ns,Qn,rs,Mi,ar,ss,is,yi,bi,Fa,Ua],GE=[...Km,Ba],Wm=[vi,Ct,ns,ra,rs,Mi,ar,ss,is,yi,bi,Fa,Ua,Ba],Qm=Wm,au=[...Qm,iu,ia,oa],HE=au,KE=[...au,ou];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hl extends Um{constructor(e,t){super(),this.ue=e,this.currentSequenceNumber=t}}function ze(n,e){const t=de(n);return Sn.M(t.ue,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qh(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Ln(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Ym(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e,t){this.comparator=e,this.root=t||Ke.EMPTY}insert(e,t){return new xe(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Ke.BLACK,null,null))}remove(e){return new xe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ke.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new po(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new po(this.root,e,this.comparator,!1)}getReverseIterator(){return new po(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new po(this.root,e,this.comparator,!0)}}class po{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ke{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??Ke.RED,this.left=s??Ke.EMPTY,this.right=i??Ke.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new Ke(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Ke.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Ke.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ke.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ke.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw ee();const e=this.left.check();if(e!==this.right.check())throw ee();return e+(this.isRed()?0:1)}}Ke.EMPTY=null,Ke.RED=!0,Ke.BLACK=!1;Ke.EMPTY=new class{constructor(){this.size=0}get key(){throw ee()}get value(){throw ee()}get color(){throw ee()}get left(){throw ee()}get right(){throw ee()}copy(e,t,r,s,i){return this}insert(e,t,r){return new Ke(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee{constructor(e){this.comparator=e,this.data=new xe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Yh(this.data.getIterator())}getIteratorFrom(e){return new Yh(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof Ee)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Ee(this.comparator);return t.data=e,t}}class Yh{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Dr(n){return n.hasNext()?n.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(e){this.fields=e,e.sort(Ve.comparator)}static empty(){return new ut([])}unionWith(e){let t=new Ee(Ve.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new ut(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return ts(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
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
 */class Jm extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $e{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Jm("Invalid base64 string: "+i):i}}(e);return new $e(t)}static fromUint8Array(e){const t=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(e);return new $e(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ue(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}$e.EMPTY_BYTE_STRING=new $e("");const WE=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function en(n){if(te(!!n),typeof n=="string"){let e=0;const t=WE.exec(n);if(te(!!t),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Pe(n.seconds),nanos:Pe(n.nanos)}}function Pe(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function tn(n){return typeof n=="string"?$e.fromBase64String(n):$e.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xm="server_timestamp",Zm="__type__",eg="__previous_value__",tg="__local_write_time__";function $a(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[Zm])===null||t===void 0?void 0:t.stringValue)===Xm}function qa(n){const e=n.mapValue.fields[eg];return $a(e)?qa(e):e}function wi(n){const e=en(n.mapValue.fields[tg].timestampValue);return new Oe(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QE{constructor(e,t,r,s,i,o,c,l,h){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=h}}const aa="(default)";class hr{constructor(e,t){this.projectId=e,this.database=t||aa}static empty(){return new hr("","")}get isDefaultDatabase(){return this.database===aa}isEqual(e){return e instanceof hr&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cu="__type__",ng="__max__",wn={mapValue:{fields:{__type__:{stringValue:ng}}}},lu="__vector__",os="value",Mo={nullValue:"NULL_VALUE"};function Cn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?$a(n)?4:rg(n)?9007199254740991:ja(n)?10:11:ee()}function Bt(n,e){if(n===e)return!0;const t=Cn(n);if(t!==Cn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return wi(n).isEqual(wi(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=en(s.timestampValue),c=en(i.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,i){return tn(s.bytesValue).isEqual(tn(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,i){return Pe(s.geoPointValue.latitude)===Pe(i.geoPointValue.latitude)&&Pe(s.geoPointValue.longitude)===Pe(i.geoPointValue.longitude)}(n,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return Pe(s.integerValue)===Pe(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=Pe(s.doubleValue),c=Pe(i.doubleValue);return o===c?_i(o)===_i(c):isNaN(o)&&isNaN(c)}return!1}(n,e);case 9:return ts(n.arrayValue.values||[],e.arrayValue.values||[],Bt);case 10:case 11:return function(s,i){const o=s.mapValue.fields||{},c=i.mapValue.fields||{};if(Qh(o)!==Qh(c))return!1;for(const l in o)if(o.hasOwnProperty(l)&&(c[l]===void 0||!Bt(o[l],c[l])))return!1;return!0}(n,e);default:return ee()}}function Ii(n,e){return(n.values||[]).find(t=>Bt(t,e))!==void 0}function kn(n,e){if(n===e)return 0;const t=Cn(n),r=Cn(e);if(t!==r)return ue(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return ue(n.booleanValue,e.booleanValue);case 2:return function(i,o){const c=Pe(i.integerValue||i.doubleValue),l=Pe(o.integerValue||o.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1}(n,e);case 3:return Jh(n.timestampValue,e.timestampValue);case 4:return Jh(wi(n),wi(e));case 5:return al(n.stringValue,e.stringValue);case 6:return function(i,o){const c=tn(i),l=tn(o);return c.compareTo(l)}(n.bytesValue,e.bytesValue);case 7:return function(i,o){const c=i.split("/"),l=o.split("/");for(let h=0;h<c.length&&h<l.length;h++){const p=ue(c[h],l[h]);if(p!==0)return p}return ue(c.length,l.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,o){const c=ue(Pe(i.latitude),Pe(o.latitude));return c!==0?c:ue(Pe(i.longitude),Pe(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Xh(n.arrayValue,e.arrayValue);case 10:return function(i,o){var c,l,h,p;const m=i.fields||{},g=o.fields||{},E=(c=m[os])===null||c===void 0?void 0:c.arrayValue,S=(l=g[os])===null||l===void 0?void 0:l.arrayValue,k=ue(((h=E?.values)===null||h===void 0?void 0:h.length)||0,((p=S?.values)===null||p===void 0?void 0:p.length)||0);return k!==0?k:Xh(E,S)}(n.mapValue,e.mapValue);case 11:return function(i,o){if(i===wn.mapValue&&o===wn.mapValue)return 0;if(i===wn.mapValue)return 1;if(o===wn.mapValue)return-1;const c=i.fields||{},l=Object.keys(c),h=o.fields||{},p=Object.keys(h);l.sort(),p.sort();for(let m=0;m<l.length&&m<p.length;++m){const g=al(l[m],p[m]);if(g!==0)return g;const E=kn(c[l[m]],h[p[m]]);if(E!==0)return E}return ue(l.length,p.length)}(n.mapValue,e.mapValue);default:throw ee()}}function Jh(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ue(n,e);const t=en(n),r=en(e),s=ue(t.seconds,r.seconds);return s!==0?s:ue(t.nanos,r.nanos)}function Xh(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=kn(t[s],r[s]);if(i)return i}return ue(t.length,r.length)}function as(n){return fl(n)}function fl(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=en(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return tn(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return J.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=fl(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${fl(t.fields[o])}`;return s+"}"}(n.mapValue):ee()}function Fo(n){switch(Cn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=qa(n);return e?16+Fo(e):16;case 5:return 2*n.stringValue.length;case 6:return tn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+Fo(i),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return Ln(r.fields,(i,o)=>{s+=i.length+Fo(o)}),s}(n.mapValue);default:throw ee()}}function fr(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function pl(n){return!!n&&"integerValue"in n}function Ei(n){return!!n&&"arrayValue"in n}function Zh(n){return!!n&&"nullValue"in n}function ef(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Uo(n){return!!n&&"mapValue"in n}function ja(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[cu])===null||t===void 0?void 0:t.stringValue)===lu}function ri(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return Ln(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=ri(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=ri(n.arrayValue.values[t]);return e}return Object.assign({},n)}function rg(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===ng}const sg={mapValue:{fields:{[cu]:{stringValue:lu},[os]:{arrayValue:{}}}}};function YE(n){return"nullValue"in n?Mo:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?fr(hr.empty(),J.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?ja(n)?sg:{mapValue:{}}:ee()}function JE(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?fr(hr.empty(),J.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?sg:"mapValue"in n?ja(n)?{mapValue:{}}:wn:ee()}function tf(n,e){const t=kn(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?-1:!n.inclusive&&e.inclusive?1:0}function nf(n,e){const t=kn(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?1:!n.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ze{constructor(e){this.value=e}static empty(){return new Ze({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Uo(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=ri(t)}setAll(e){let t=Ve.emptyPath(),r={},s=[];e.forEach((o,c)=>{if(!t.isImmediateParentOf(c)){const l=this.getFieldsMap(t);this.applyChanges(l,r,s),r={},s=[],t=c.popLast()}o?r[c.lastSegment()]=ri(o):s.push(c.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());Uo(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Bt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Uo(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){Ln(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new Ze(ri(this.value))}}function ig(n){const e=[];return Ln(n.fields,(t,r)=>{const s=new Ve([t]);if(Uo(r)){const i=ig(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new ut(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Me{constructor(e,t,r,s,i,o,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(e){return new Me(e,0,se.min(),se.min(),se.min(),Ze.empty(),0)}static newFoundDocument(e,t,r,s){return new Me(e,1,t,se.min(),r,s,0)}static newNoDocument(e,t){return new Me(e,2,t,se.min(),se.min(),Ze.empty(),0)}static newUnknownDocument(e,t){return new Me(e,3,t,se.min(),se.min(),Ze.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(se.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ze.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ze.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=se.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Me&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Me(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Pn{constructor(e,t){this.position=e,this.inclusive=t}}function rf(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],o=n.position[s];if(i.field.isKeyField()?r=J.comparator(J.fromName(o.referenceValue),t.key):r=kn(o,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function sf(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Bt(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class Ti{constructor(e,t="asc"){this.field=e,this.dir=t}}function XE(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class og{}class ge extends og{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new ZE(e,t,r):t==="array-contains"?new nT(e,r):t==="in"?new hg(e,r):t==="not-in"?new rT(e,r):t==="array-contains-any"?new sT(e,r):new ge(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new eT(e,r):new tT(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(kn(t,this.value)):t!==null&&Cn(this.value)===Cn(t)&&this.matchesComparison(kn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return ee()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ie extends og{constructor(e,t){super(),this.filters=e,this.op=t,this.ce=null}static create(e,t){return new Ie(e,t)}matches(e){return cs(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ce!==null||(this.ce=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ce}getFilters(){return Object.assign([],this.filters)}}function cs(n){return n.op==="and"}function ml(n){return n.op==="or"}function uu(n){return ag(n)&&cs(n)}function ag(n){for(const e of n.filters)if(e instanceof Ie)return!1;return!0}function gl(n){if(n instanceof ge)return n.field.canonicalString()+n.op.toString()+as(n.value);if(uu(n))return n.filters.map(e=>gl(e)).join(",");{const e=n.filters.map(t=>gl(t)).join(",");return`${n.op}(${e})`}}function cg(n,e){return n instanceof ge?function(r,s){return s instanceof ge&&r.op===s.op&&r.field.isEqual(s.field)&&Bt(r.value,s.value)}(n,e):n instanceof Ie?function(r,s){return s instanceof Ie&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,o,c)=>i&&cg(o,s.filters[c]),!0):!1}(n,e):void ee()}function lg(n,e){const t=n.filters.concat(e);return Ie.create(t,n.op)}function ug(n){return n instanceof ge?function(t){return`${t.field.canonicalString()} ${t.op} ${as(t.value)}`}(n):n instanceof Ie?function(t){return t.op.toString()+" {"+t.getFilters().map(ug).join(" ,")+"}"}(n):"Filter"}class ZE extends ge{constructor(e,t,r){super(e,t,r),this.key=J.fromName(r.referenceValue)}matches(e){const t=J.comparator(e.key,this.key);return this.matchesComparison(t)}}class eT extends ge{constructor(e,t){super(e,"in",t),this.keys=dg("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class tT extends ge{constructor(e,t){super(e,"not-in",t),this.keys=dg("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function dg(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>J.fromName(r.referenceValue))}class nT extends ge{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Ei(t)&&Ii(t.arrayValue,this.value)}}class hg extends ge{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Ii(this.value.arrayValue,t)}}class rT extends ge{constructor(e,t){super(e,"not-in",t)}matches(e){if(Ii(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!Ii(this.value.arrayValue,t)}}class sT extends ge{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Ei(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Ii(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iT{constructor(e,t=null,r=[],s=[],i=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.le=null}}function _l(n,e=null,t=[],r=[],s=null,i=null,o=null){return new iT(n,e,t,r,s,i,o)}function pr(n){const e=de(n);if(e.le===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>gl(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),Ma(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>as(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>as(r)).join(",")),e.le=t}return e.le}function Fi(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!XE(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!cg(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!sf(n.startAt,e.startAt)&&sf(n.endAt,e.endAt)}function ca(n){return J.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function la(n,e){return n.filters.filter(t=>t instanceof ge&&t.field.isEqual(e))}function of(n,e,t){let r=Mo,s=!0;for(const i of la(n,e)){let o=Mo,c=!0;switch(i.op){case"<":case"<=":o=YE(i.value);break;case"==":case"in":case">=":o=i.value;break;case">":o=i.value,c=!1;break;case"!=":case"not-in":o=Mo}tf({value:r,inclusive:s},{value:o,inclusive:c})<0&&(r=o,s=c)}if(t!==null){for(let i=0;i<n.orderBy.length;++i)if(n.orderBy[i].field.isEqual(e)){const o=t.position[i];tf({value:r,inclusive:s},{value:o,inclusive:t.inclusive})<0&&(r=o,s=t.inclusive);break}}return{value:r,inclusive:s}}function af(n,e,t){let r=wn,s=!0;for(const i of la(n,e)){let o=wn,c=!0;switch(i.op){case">=":case">":o=JE(i.value),c=!1;break;case"==":case"in":case"<=":o=i.value;break;case"<":o=i.value,c=!1;break;case"!=":case"not-in":o=wn}nf({value:r,inclusive:s},{value:o,inclusive:c})>0&&(r=o,s=c)}if(t!==null){for(let i=0;i<n.orderBy.length;++i)if(n.orderBy[i].field.isEqual(e)){const o=t.position[i];nf({value:r,inclusive:s},{value:o,inclusive:t.inclusive})>0&&(r=o,s=t.inclusive);break}}return{value:r,inclusive:s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Er{constructor(e,t=null,r=[],s=[],i=null,o="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=l,this.he=null,this.Pe=null,this.Te=null,this.startAt,this.endAt}}function oT(n,e,t,r,s,i,o,c){return new Er(n,e,t,r,s,i,o,c)}function Ui(n){return new Er(n)}function cf(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function du(n){return n.collectionGroup!==null}function Qr(n){const e=de(n);if(e.he===null){e.he=[];const t=new Set;for(const i of e.explicitOrderBy)e.he.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new Ee(Ve.comparator);return o.filters.forEach(l=>{l.getFlattenedFilters().forEach(h=>{h.isInequality()&&(c=c.add(h.field))})}),c})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.he.push(new Ti(i,r))}),t.has(Ve.keyField().canonicalString())||e.he.push(new Ti(Ve.keyField(),r))}return e.he}function St(n){const e=de(n);return e.Pe||(e.Pe=aT(e,Qr(n))),e.Pe}function aT(n,e){if(n.limitType==="F")return _l(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Ti(s.field,i)});const t=n.endAt?new Pn(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Pn(n.startAt.position,n.startAt.inclusive):null;return _l(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function vl(n,e){const t=n.filters.concat([e]);return new Er(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function ua(n,e,t){return new Er(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function za(n,e){return Fi(St(n),St(e))&&n.limitType===e.limitType}function fg(n){return`${pr(St(n))}|lt:${n.limitType}`}function Ur(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>ug(s)).join(", ")}]`),Ma(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>as(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>as(s)).join(",")),`Target(${r})`}(St(n))}; limitType=${n.limitType})`}function Bi(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):J.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of Qr(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(o,c,l){const h=rf(o,c,l);return o.inclusive?h<=0:h<0}(r.startAt,Qr(r),s)||r.endAt&&!function(o,c,l){const h=rf(o,c,l);return o.inclusive?h>=0:h>0}(r.endAt,Qr(r),s))}(n,e)}function cT(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function pg(n){return(e,t)=>{let r=!1;for(const s of Qr(n)){const i=lT(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function lT(n,e,t){const r=n.field.isKeyField()?J.comparator(e.key,t.key):function(i,o,c){const l=o.data.field(i),h=c.data.field(i);return l!==null&&h!==null?kn(l,h):ee()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return ee()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Ln(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return Ym(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uT=new xe(J.comparator);function vt(){return uT}const mg=new xe(J.comparator);function Ys(...n){let e=mg;for(const t of n)e=e.insert(t.key,t);return e}function gg(n){let e=mg;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function Ot(){return si()}function _g(){return si()}function si(){return new sn(n=>n.toString(),(n,e)=>n.isEqual(e))}const dT=new xe(J.comparator),hT=new Ee(J.comparator);function pe(...n){let e=hT;for(const t of n)e=e.add(t);return e}const fT=new Ee(ue);function pT(){return fT}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hu(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:_i(e)?"-0":e}}function vg(n){return{integerValue:""+n}}function yg(n,e){return wE(e)?vg(e):hu(n,e)}/**
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
 */class Ga{constructor(){this._=void 0}}function mT(n,e,t){return n instanceof Ai?function(s,i){const o={fields:{[Zm]:{stringValue:Xm},[tg]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&$a(i)&&(i=qa(i)),i&&(o.fields[eg]=i),{mapValue:o}}(t,e):n instanceof ls?wg(n,e):n instanceof us?Ig(n,e):function(s,i){const o=bg(s,i),c=lf(o)+lf(s.Ie);return pl(o)&&pl(s.Ie)?vg(c):hu(s.serializer,c)}(n,e)}function gT(n,e,t){return n instanceof ls?wg(n,e):n instanceof us?Ig(n,e):t}function bg(n,e){return n instanceof ds?function(r){return pl(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class Ai extends Ga{}class ls extends Ga{constructor(e){super(),this.elements=e}}function wg(n,e){const t=Eg(e);for(const r of n.elements)t.some(s=>Bt(s,r))||t.push(r);return{arrayValue:{values:t}}}class us extends Ga{constructor(e){super(),this.elements=e}}function Ig(n,e){let t=Eg(e);for(const r of n.elements)t=t.filter(s=>!Bt(s,r));return{arrayValue:{values:t}}}class ds extends Ga{constructor(e,t){super(),this.serializer=e,this.Ie=t}}function lf(n){return Pe(n.integerValue||n.doubleValue)}function Eg(n){return Ei(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tg{constructor(e,t){this.field=e,this.transform=t}}function _T(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof ls&&s instanceof ls||r instanceof us&&s instanceof us?ts(r.elements,s.elements,Bt):r instanceof ds&&s instanceof ds?Bt(r.Ie,s.Ie):r instanceof Ai&&s instanceof Ai}(n.transform,e.transform)}class vT{constructor(e,t){this.version=e,this.transformResults=t}}class et{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new et}static exists(e){return new et(void 0,e)}static updateTime(e){return new et(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Bo(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Ha{}function Ag(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Ka(n.key,et.none()):new As(n.key,n.data,et.none());{const t=n.data,r=Ze.empty();let s=new Ee(Ve.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new on(n.key,r,new ut(s.toArray()),et.none())}}function yT(n,e,t){n instanceof As?function(s,i,o){const c=s.value.clone(),l=df(s.fieldTransforms,i,o.transformResults);c.setAll(l),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(n,e,t):n instanceof on?function(s,i,o){if(!Bo(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=df(s.fieldTransforms,i,o.transformResults),l=i.data;l.setAll(Sg(s)),l.setAll(c),i.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(n,e,t):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function ii(n,e,t,r){return n instanceof As?function(i,o,c,l){if(!Bo(i.precondition,o))return c;const h=i.value.clone(),p=hf(i.fieldTransforms,l,o);return h.setAll(p),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null}(n,e,t,r):n instanceof on?function(i,o,c,l){if(!Bo(i.precondition,o))return c;const h=hf(i.fieldTransforms,l,o),p=o.data;return p.setAll(Sg(i)),p.setAll(h),o.convertToFoundDocument(o.version,p).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(m=>m.field))}(n,e,t,r):function(i,o,c){return Bo(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c}(n,e,t)}function bT(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=bg(r.transform,s||null);i!=null&&(t===null&&(t=Ze.empty()),t.set(r.field,i))}return t||null}function uf(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&ts(r,s,(i,o)=>_T(i,o))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class As extends Ha{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class on extends Ha{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Sg(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function df(n,e,t){const r=new Map;te(n.length===t.length);for(let s=0;s<t.length;s++){const i=n[s],o=i.transform,c=e.data.field(i.field);r.set(i.field,gT(o,c,t[s]))}return r}function hf(n,e,t){const r=new Map;for(const s of n){const i=s.transform,o=t.data.field(s.field);r.set(s.field,mT(i,o,e))}return r}class Ka extends Ha{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Rg extends Ha{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fu{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&yT(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=ii(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=ii(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=_g();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=t.has(s.key)?null:c;const l=Ag(o,c);l!==null&&r.set(s.key,l),o.isValidDocument()||o.convertToNoDocument(se.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),pe())}isEqual(e){return this.batchId===e.batchId&&ts(this.mutations,e.mutations,(t,r)=>uf(t,r))&&ts(this.baseMutations,e.baseMutations,(t,r)=>uf(t,r))}}class pu{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){te(e.mutations.length===r.length);let s=function(){return dT}();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new pu(e,t,r,s)}}/**
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
 */class mu{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class wT{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Be,ve;function IT(n){switch(n){case U.OK:return ee();case U.CANCELLED:case U.UNKNOWN:case U.DEADLINE_EXCEEDED:case U.RESOURCE_EXHAUSTED:case U.INTERNAL:case U.UNAVAILABLE:case U.UNAUTHENTICATED:return!1;case U.INVALID_ARGUMENT:case U.NOT_FOUND:case U.ALREADY_EXISTS:case U.PERMISSION_DENIED:case U.FAILED_PRECONDITION:case U.ABORTED:case U.OUT_OF_RANGE:case U.UNIMPLEMENTED:case U.DATA_LOSS:return!0;default:return ee()}}function Cg(n){if(n===void 0)return at("GRPC error has no .code"),U.UNKNOWN;switch(n){case Be.OK:return U.OK;case Be.CANCELLED:return U.CANCELLED;case Be.UNKNOWN:return U.UNKNOWN;case Be.DEADLINE_EXCEEDED:return U.DEADLINE_EXCEEDED;case Be.RESOURCE_EXHAUSTED:return U.RESOURCE_EXHAUSTED;case Be.INTERNAL:return U.INTERNAL;case Be.UNAVAILABLE:return U.UNAVAILABLE;case Be.UNAUTHENTICATED:return U.UNAUTHENTICATED;case Be.INVALID_ARGUMENT:return U.INVALID_ARGUMENT;case Be.NOT_FOUND:return U.NOT_FOUND;case Be.ALREADY_EXISTS:return U.ALREADY_EXISTS;case Be.PERMISSION_DENIED:return U.PERMISSION_DENIED;case Be.FAILED_PRECONDITION:return U.FAILED_PRECONDITION;case Be.ABORTED:return U.ABORTED;case Be.OUT_OF_RANGE:return U.OUT_OF_RANGE;case Be.UNIMPLEMENTED:return U.UNIMPLEMENTED;case Be.DATA_LOSS:return U.DATA_LOSS;default:return ee()}}(ve=Be||(Be={}))[ve.OK=0]="OK",ve[ve.CANCELLED=1]="CANCELLED",ve[ve.UNKNOWN=2]="UNKNOWN",ve[ve.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ve[ve.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ve[ve.NOT_FOUND=5]="NOT_FOUND",ve[ve.ALREADY_EXISTS=6]="ALREADY_EXISTS",ve[ve.PERMISSION_DENIED=7]="PERMISSION_DENIED",ve[ve.UNAUTHENTICATED=16]="UNAUTHENTICATED",ve[ve.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ve[ve.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ve[ve.ABORTED=10]="ABORTED",ve[ve.OUT_OF_RANGE=11]="OUT_OF_RANGE",ve[ve.UNIMPLEMENTED=12]="UNIMPLEMENTED",ve[ve.INTERNAL=13]="INTERNAL",ve[ve.UNAVAILABLE=14]="UNAVAILABLE",ve[ve.DATA_LOSS=15]="DATA_LOSS";/**
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
 */const ET=new An([4294967295,4294967295],0);function ff(n){const e=ol().encode(n),t=new km;return t.update(e),new Uint8Array(t.digest())}function pf(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new An([t,r],0),new An([s,i],0)]}class gu{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Js(`Invalid padding: ${t}`);if(r<0)throw new Js(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Js(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Js(`Invalid padding when bitmap length is 0: ${t}`);this.Ee=8*e.length-t,this.de=An.fromNumber(this.Ee)}Ae(e,t,r){let s=e.add(t.multiply(An.fromNumber(r)));return s.compare(ET)===1&&(s=new An([s.getBits(0),s.getBits(1)],0)),s.modulo(this.de).toNumber()}Re(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.Ee===0)return!1;const t=ff(e),[r,s]=pf(t);for(let i=0;i<this.hashCount;i++){const o=this.Ae(r,s,i);if(!this.Re(o))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new gu(i,s,t);return r.forEach(c=>o.insert(c)),o}insert(e){if(this.Ee===0)return;const t=ff(e),[r,s]=pf(t);for(let i=0;i<this.hashCount;i++){const o=this.Ae(r,s,i);this.Ve(o)}}Ve(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Js extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wa{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,$i.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Wa(se.min(),s,new xe(ue),vt(),pe())}}class $i{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new $i(r,t,pe(),pe(),pe())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $o{constructor(e,t,r,s){this.me=e,this.removedTargetIds=t,this.key=r,this.fe=s}}class kg{constructor(e,t){this.targetId=e,this.ge=t}}class Pg{constructor(e,t,r=$e.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class mf{constructor(){this.pe=0,this.ye=gf(),this.we=$e.EMPTY_BYTE_STRING,this.Se=!1,this.be=!0}get current(){return this.Se}get resumeToken(){return this.we}get De(){return this.pe!==0}get ve(){return this.be}Ce(e){e.approximateByteSize()>0&&(this.be=!0,this.we=e)}Fe(){let e=pe(),t=pe(),r=pe();return this.ye.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:ee()}}),new $i(this.we,this.Se,e,t,r)}Me(){this.be=!1,this.ye=gf()}xe(e,t){this.be=!0,this.ye=this.ye.insert(e,t)}Oe(e){this.be=!0,this.ye=this.ye.remove(e)}Ne(){this.pe+=1}Be(){this.pe-=1,te(this.pe>=0)}Le(){this.be=!0,this.Se=!0}}class TT{constructor(e){this.ke=e,this.qe=new Map,this.Qe=vt(),this.$e=mo(),this.Ue=mo(),this.Ke=new xe(ue)}We(e){for(const t of e.me)e.fe&&e.fe.isFoundDocument()?this.Ge(t,e.fe):this.ze(t,e.key,e.fe);for(const t of e.removedTargetIds)this.ze(t,e.key,e.fe)}je(e){this.forEachTarget(e,t=>{const r=this.He(t);switch(e.state){case 0:this.Je(t)&&r.Ce(e.resumeToken);break;case 1:r.Be(),r.De||r.Me(),r.Ce(e.resumeToken);break;case 2:r.Be(),r.De||this.removeTarget(t);break;case 3:this.Je(t)&&(r.Le(),r.Ce(e.resumeToken));break;case 4:this.Je(t)&&(this.Ye(t),r.Ce(e.resumeToken));break;default:ee()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.qe.forEach((r,s)=>{this.Je(s)&&t(s)})}Ze(e){const t=e.targetId,r=e.ge.count,s=this.Xe(t);if(s){const i=s.target;if(ca(i))if(r===0){const o=new J(i.path);this.ze(t,o,Me.newNoDocument(o,se.min()))}else te(r===1);else{const o=this.et(t);if(o!==r){const c=this.tt(e),l=c?this.nt(c,e,o):1;if(l!==0){this.Ye(t);const h=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ke=this.Ke.insert(t,h)}}}}}tt(e){const t=e.ge.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let o,c;try{o=tn(r).toUint8Array()}catch(l){if(l instanceof Jm)return pi("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new gu(o,s,i)}catch(l){return pi(l instanceof Js?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.Ee===0?null:c}nt(e,t,r){return t.ge.count===r-this.st(e,t.targetId)?0:2}st(e,t){const r=this.ke.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const o=this.ke.it(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.ze(t,i,null),s++)}),s}ot(e){const t=new Map;this.qe.forEach((i,o)=>{const c=this.Xe(o);if(c){if(i.current&&ca(c.target)){const l=new J(c.target.path);this._t(l).has(o)||this.ut(o,l)||this.ze(o,l,Me.newNoDocument(l,e))}i.ve&&(t.set(o,i.Fe()),i.Me())}});let r=pe();this.Ue.forEach((i,o)=>{let c=!0;o.forEachWhile(l=>{const h=this.Xe(l);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(i))}),this.Qe.forEach((i,o)=>o.setReadTime(e));const s=new Wa(e,t,this.Ke,this.Qe,r);return this.Qe=vt(),this.$e=mo(),this.Ue=mo(),this.Ke=new xe(ue),s}Ge(e,t){if(!this.Je(e))return;const r=this.ut(e,t.key)?2:0;this.He(e).xe(t.key,r),this.Qe=this.Qe.insert(t.key,t),this.$e=this.$e.insert(t.key,this._t(t.key).add(e)),this.Ue=this.Ue.insert(t.key,this.ct(t.key).add(e))}ze(e,t,r){if(!this.Je(e))return;const s=this.He(e);this.ut(e,t)?s.xe(t,1):s.Oe(t),this.Ue=this.Ue.insert(t,this.ct(t).delete(e)),this.Ue=this.Ue.insert(t,this.ct(t).add(e)),r&&(this.Qe=this.Qe.insert(t,r))}removeTarget(e){this.qe.delete(e)}et(e){const t=this.He(e).Fe();return this.ke.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ne(e){this.He(e).Ne()}He(e){let t=this.qe.get(e);return t||(t=new mf,this.qe.set(e,t)),t}ct(e){let t=this.Ue.get(e);return t||(t=new Ee(ue),this.Ue=this.Ue.insert(e,t)),t}_t(e){let t=this.$e.get(e);return t||(t=new Ee(ue),this.$e=this.$e.insert(e,t)),t}Je(e){const t=this.Xe(e)!==null;return t||H("WatchChangeAggregator","Detected inactive target",e),t}Xe(e){const t=this.qe.get(e);return t&&t.De?null:this.ke.lt(e)}Ye(e){this.qe.set(e,new mf),this.ke.getRemoteKeysForTarget(e).forEach(t=>{this.ze(e,t,null)})}ut(e,t){return this.ke.getRemoteKeysForTarget(e).has(t)}}function mo(){return new xe(J.comparator)}function gf(){return new xe(J.comparator)}const AT={asc:"ASCENDING",desc:"DESCENDING"},ST={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},RT={and:"AND",or:"OR"};class CT{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function yl(n,e){return n.useProto3Json||Ma(e)?e:{value:e}}function hs(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function xg(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function kT(n,e){return hs(n,e.toTimestamp())}function ct(n){return te(!!n),se.fromTimestamp(function(t){const r=en(t);return new Oe(r.seconds,r.nanos)}(n))}function _u(n,e){return bl(n,e).canonicalString()}function bl(n,e){const t=function(s){return new we(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Ng(n){const e=we.fromString(n);return te($g(e)),e}function da(n,e){return _u(n.databaseId,e.path)}function cr(n,e){const t=Ng(e);if(t.get(1)!==n.databaseId.projectId)throw new W(U.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new W(U.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new J(Og(t))}function Dg(n,e){return _u(n.databaseId,e)}function Vg(n){const e=Ng(n);return e.length===4?we.emptyPath():Og(e)}function wl(n){return new we(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Og(n){return te(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function _f(n,e,t){return{name:da(n,e),fields:t.value.mapValue.fields}}function PT(n,e,t){const r=cr(n,e.name),s=ct(e.updateTime),i=e.createTime?ct(e.createTime):se.min(),o=new Ze({mapValue:{fields:e.fields}}),c=Me.newFoundDocument(r,s,i,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function xT(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:ee()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(h,p){return h.useProto3Json?(te(p===void 0||typeof p=="string"),$e.fromBase64String(p||"")):(te(p===void 0||p instanceof Buffer||p instanceof Uint8Array),$e.fromUint8Array(p||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&function(h){const p=h.code===void 0?U.UNKNOWN:Cg(h.code);return new W(p,h.message||"")}(o);t=new Pg(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=cr(n,r.document.name),i=ct(r.document.updateTime),o=r.document.createTime?ct(r.document.createTime):se.min(),c=new Ze({mapValue:{fields:r.document.fields}}),l=Me.newFoundDocument(s,i,o,c),h=r.targetIds||[],p=r.removedTargetIds||[];t=new $o(h,p,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=cr(n,r.document),i=r.readTime?ct(r.readTime):se.min(),o=Me.newNoDocument(s,i),c=r.removedTargetIds||[];t=new $o([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=cr(n,r.document),i=r.removedTargetIds||[];t=new $o([],i,s,null)}else{if(!("filter"in e))return ee();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new wT(s,i),c=r.targetId;t=new kg(c,o)}}return t}function ha(n,e){let t;if(e instanceof As)t={update:_f(n,e.key,e.value)};else if(e instanceof Ka)t={delete:da(n,e.key)};else if(e instanceof on)t={update:_f(n,e.key,e.data),updateMask:MT(e.fieldMask)};else{if(!(e instanceof Rg))return ee();t={verify:da(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,o){const c=o.transform;if(c instanceof Ai)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof ls)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof us)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof ds)return{fieldPath:o.field.canonicalString(),increment:c.Ie};throw ee()}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:kT(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:ee()}(n,e.precondition)),t}function Il(n,e){const t=e.currentDocument?function(i){return i.updateTime!==void 0?et.updateTime(ct(i.updateTime)):i.exists!==void 0?et.exists(i.exists):et.none()}(e.currentDocument):et.none(),r=e.updateTransforms?e.updateTransforms.map(s=>function(o,c){let l=null;if("setToServerValue"in c)te(c.setToServerValue==="REQUEST_TIME"),l=new Ai;else if("appendMissingElements"in c){const p=c.appendMissingElements.values||[];l=new ls(p)}else if("removeAllFromArray"in c){const p=c.removeAllFromArray.values||[];l=new us(p)}else"increment"in c?l=new ds(o,c.increment):ee();const h=Ve.fromServerFormat(c.fieldPath);return new Tg(h,l)}(n,s)):[];if(e.update){e.update.name;const s=cr(n,e.update.name),i=new Ze({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(l){const h=l.fieldPaths||[];return new ut(h.map(p=>Ve.fromServerFormat(p)))}(e.updateMask);return new on(s,i,o,t,r)}return new As(s,i,t,r)}if(e.delete){const s=cr(n,e.delete);return new Ka(s,t)}if(e.verify){const s=cr(n,e.verify);return new Rg(s,t)}return ee()}function NT(n,e){return n&&n.length>0?(te(e!==void 0),n.map(t=>function(s,i){let o=s.updateTime?ct(s.updateTime):ct(i);return o.isEqual(se.min())&&(o=ct(i)),new vT(o,s.transformResults||[])}(t,e))):[]}function Lg(n,e){return{documents:[Dg(n,e.path)]}}function Mg(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Dg(n,s);const i=function(h){if(h.length!==0)return Bg(Ie.create(h,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const o=function(h){if(h.length!==0)return h.map(p=>function(g){return{field:Br(g.field),direction:VT(g.dir)}}(p))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=yl(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{ht:t,parent:s}}function Fg(n){let e=Vg(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){te(r===1);const p=t.from[0];p.allDescendants?s=p.collectionId:e=e.child(p.collectionId)}let i=[];t.where&&(i=function(m){const g=Ug(m);return g instanceof Ie&&uu(g)?g.getFilters():[g]}(t.where));let o=[];t.orderBy&&(o=function(m){return m.map(g=>function(S){return new Ti($r(S.field),function(T){switch(T){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(S.direction))}(g))}(t.orderBy));let c=null;t.limit&&(c=function(m){let g;return g=typeof m=="object"?m.value:m,Ma(g)?null:g}(t.limit));let l=null;t.startAt&&(l=function(m){const g=!!m.before,E=m.values||[];return new Pn(E,g)}(t.startAt));let h=null;return t.endAt&&(h=function(m){const g=!m.before,E=m.values||[];return new Pn(E,g)}(t.endAt)),oT(e,s,o,i,c,"F",l,h)}function DT(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return ee()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Ug(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=$r(t.unaryFilter.field);return ge.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=$r(t.unaryFilter.field);return ge.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=$r(t.unaryFilter.field);return ge.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=$r(t.unaryFilter.field);return ge.create(o,"!=",{nullValue:"NULL_VALUE"});default:return ee()}}(n):n.fieldFilter!==void 0?function(t){return ge.create($r(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return ee()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Ie.create(t.compositeFilter.filters.map(r=>Ug(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return ee()}}(t.compositeFilter.op))}(n):ee()}function VT(n){return AT[n]}function OT(n){return ST[n]}function LT(n){return RT[n]}function Br(n){return{fieldPath:n.canonicalString()}}function $r(n){return Ve.fromServerFormat(n.fieldPath)}function Bg(n){return n instanceof ge?function(t){if(t.op==="=="){if(ef(t.value))return{unaryFilter:{field:Br(t.field),op:"IS_NAN"}};if(Zh(t.value))return{unaryFilter:{field:Br(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(ef(t.value))return{unaryFilter:{field:Br(t.field),op:"IS_NOT_NAN"}};if(Zh(t.value))return{unaryFilter:{field:Br(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Br(t.field),op:OT(t.op),value:t.value}}}(n):n instanceof Ie?function(t){const r=t.getFilters().map(s=>Bg(s));return r.length===1?r[0]:{compositeFilter:{op:LT(t.op),filters:r}}}(n):ee()}function MT(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function $g(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yt{constructor(e,t,r,s,i=se.min(),o=se.min(),c=$e.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new Yt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Yt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Yt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Yt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qg{constructor(e){this.Tt=e}}function FT(n,e){let t;if(e.document)t=PT(n.Tt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const r=J.fromSegments(e.noDocument.path),s=gr(e.noDocument.readTime);t=Me.newNoDocument(r,s),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return ee();{const r=J.fromSegments(e.unknownDocument.path),s=gr(e.unknownDocument.version);t=Me.newUnknownDocument(r,s)}}return e.readTime&&t.setReadTime(function(s){const i=new Oe(s[0],s[1]);return se.fromTimestamp(i)}(e.readTime)),t}function vf(n,e){const t=e.key,r={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:fa(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=function(i,o){return{name:da(i,o.key),fields:o.data.value.mapValue.fields,updateTime:hs(i,o.version.toTimestamp()),createTime:hs(i,o.createTime.toTimestamp())}}(n.Tt,e);else if(e.isNoDocument())r.noDocument={path:t.path.toArray(),readTime:mr(e.version)};else{if(!e.isUnknownDocument())return ee();r.unknownDocument={path:t.path.toArray(),version:mr(e.version)}}return r}function fa(n){const e=n.toTimestamp();return[e.seconds,e.nanoseconds]}function mr(n){const e=n.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function gr(n){const e=new Oe(n.seconds,n.nanoseconds);return se.fromTimestamp(e)}function Zn(n,e){const t=(e.baseMutations||[]).map(i=>Il(n.Tt,i));for(let i=0;i<e.mutations.length-1;++i){const o=e.mutations[i];if(i+1<e.mutations.length&&e.mutations[i+1].transform!==void 0){const c=e.mutations[i+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(i+1,1),++i}}const r=e.mutations.map(i=>Il(n.Tt,i)),s=Oe.fromMillis(e.localWriteTimeMs);return new fu(e.batchId,s,t,r)}function Xs(n){const e=gr(n.readTime),t=n.lastLimboFreeSnapshotVersion!==void 0?gr(n.lastLimboFreeSnapshotVersion):se.min();let r;return r=function(i){return i.documents!==void 0}(n.query)?function(i){return te(i.documents.length===1),St(Ui(Vg(i.documents[0])))}(n.query):function(i){return St(Fg(i))}(n.query),new Yt(r,n.targetId,"TargetPurposeListen",n.lastListenSequenceNumber,e,t,$e.fromBase64String(n.resumeToken))}function jg(n,e){const t=mr(e.snapshotVersion),r=mr(e.lastLimboFreeSnapshotVersion);let s;s=ca(e.target)?Lg(n.Tt,e.target):Mg(n.Tt,e.target).ht;const i=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:pr(e.target),readTime:t,resumeToken:i,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:s}}function zg(n){const e=Fg({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?ua(e,e.limit,"L"):e}function Fc(n,e){return new mu(e.largestBatchId,Il(n.Tt,e.overlayMutation))}function yf(n,e){const t=e.path.lastSegment();return[n,tt(e.path.popLast()),t]}function bf(n,e,t,r){return{indexId:n,uid:e,sequenceNumber:t,readTime:mr(r.readTime),documentKey:tt(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UT{getBundleMetadata(e,t){return wf(e).get(t).next(r=>{if(r)return function(i){return{id:i.bundleId,createTime:gr(i.createTime),version:i.version}}(r)})}saveBundleMetadata(e,t){return wf(e).put(function(s){return{bundleId:s.id,createTime:mr(ct(s.createTime)),version:s.version}}(t))}getNamedQuery(e,t){return If(e).get(t).next(r=>{if(r)return function(i){return{name:i.name,query:zg(i.bundledQuery),readTime:gr(i.readTime)}}(r)})}saveNamedQuery(e,t){return If(e).put(function(s){return{name:s.name,readTime:mr(ct(s.readTime)),bundledQuery:s.bundledQuery}}(t))}}function wf(n){return ze(n,Fa)}function If(n){return ze(n,Ua)}/**
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
 */class Qa{constructor(e,t){this.serializer=e,this.userId=t}static It(e,t){const r=t.uid||"";return new Qa(e,r)}getOverlay(e,t){return $s(e).get(yf(this.userId,t)).next(r=>r?Fc(this.serializer,r):null)}getOverlays(e,t){const r=Ot();return D.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){const s=[];return r.forEach((i,o)=>{const c=new mu(t,o);s.push(this.Et(e,c))}),D.waitFor(s)}removeOverlaysForBatchId(e,t,r){const s=new Set;t.forEach(o=>s.add(tt(o.getCollectionPath())));const i=[];return s.forEach(o=>{const c=IDBKeyRange.bound([this.userId,o,r],[this.userId,o,r+1],!1,!0);i.push($s(e).J(dl,c))}),D.waitFor(i)}getOverlaysForCollection(e,t,r){const s=Ot(),i=tt(t),o=IDBKeyRange.bound([this.userId,i,r],[this.userId,i,Number.POSITIVE_INFINITY],!0);return $s(e).G(dl,o).next(c=>{for(const l of c){const h=Fc(this.serializer,l);s.set(h.getKey(),h)}return s})}getOverlaysForCollectionGroup(e,t,r,s){const i=Ot();let o;const c=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return $s(e).Z({index:Hm,range:c},(l,h,p)=>{const m=Fc(this.serializer,h);i.size()<s||m.largestBatchId===o?(i.set(m.getKey(),m),o=m.largestBatchId):p.done()}).next(()=>i)}Et(e,t){return $s(e).put(function(s,i,o){const[c,l,h]=yf(i,o.mutation.key);return{userId:i,collectionPath:l,documentId:h,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:ha(s.Tt,o.mutation)}}(this.serializer,this.userId,t))}}function $s(n){return ze(n,Ba)}/**
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
 */class BT{dt(e){return ze(e,ou)}getSessionToken(e){return this.dt(e).get("sessionToken").next(t=>{const r=t?.value;return r?$e.fromUint8Array(r):$e.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.dt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
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
 */class er{constructor(){}At(e,t){this.Rt(e,t),t.Vt()}Rt(e,t){if("nullValue"in e)this.ft(t,5);else if("booleanValue"in e)this.ft(t,10),t.gt(e.booleanValue?1:0);else if("integerValue"in e)this.ft(t,15),t.gt(Pe(e.integerValue));else if("doubleValue"in e){const r=Pe(e.doubleValue);isNaN(r)?this.ft(t,13):(this.ft(t,15),_i(r)?t.gt(0):t.gt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.ft(t,20),typeof r=="string"&&(r=en(r)),t.yt(`${r.seconds||""}`),t.gt(r.nanos||0)}else if("stringValue"in e)this.wt(e.stringValue,t),this.St(t);else if("bytesValue"in e)this.ft(t,30),t.bt(tn(e.bytesValue)),this.St(t);else if("referenceValue"in e)this.Dt(e.referenceValue,t);else if("geoPointValue"in e){const r=e.geoPointValue;this.ft(t,45),t.gt(r.latitude||0),t.gt(r.longitude||0)}else"mapValue"in e?rg(e)?this.ft(t,Number.MAX_SAFE_INTEGER):ja(e)?this.vt(e.mapValue,t):(this.Ct(e.mapValue,t),this.St(t)):"arrayValue"in e?(this.Ft(e.arrayValue,t),this.St(t)):ee()}wt(e,t){this.ft(t,25),this.Mt(e,t)}Mt(e,t){t.yt(e)}Ct(e,t){const r=e.fields||{};this.ft(t,55);for(const s of Object.keys(r))this.wt(s,t),this.Rt(r[s],t)}vt(e,t){var r,s;const i=e.fields||{};this.ft(t,53);const o=os,c=((s=(r=i[o].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.length)||0;this.ft(t,15),t.gt(Pe(c)),this.wt(o,t),this.Rt(i[o],t)}Ft(e,t){const r=e.values||[];this.ft(t,50);for(const s of r)this.Rt(s,t)}Dt(e,t){this.ft(t,37),J.fromName(e).path.forEach(r=>{this.ft(t,60),this.Mt(r,t)})}ft(e,t){e.gt(t)}St(e){e.gt(2)}}er.xt=new er;/**
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
 */const Vr=255;function $T(n){if(n===0)return 8;let e=0;return n>>4||(e+=4,n<<=4),n>>6||(e+=2,n<<=2),n>>7||(e+=1),e}function Ef(n){const e=64-function(r){let s=0;for(let i=0;i<8;++i){const o=$T(255&r[i]);if(s+=o,o!==8)break}return s}(n);return Math.ceil(e/8)}class qT{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ot(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Nt(r.value),r=t.next();this.Bt()}Lt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.kt(r.value),r=t.next();this.qt()}Qt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Nt(r);else if(r<2048)this.Nt(960|r>>>6),this.Nt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Nt(480|r>>>12),this.Nt(128|63&r>>>6),this.Nt(128|63&r);else{const s=t.codePointAt(0);this.Nt(240|s>>>18),this.Nt(128|63&s>>>12),this.Nt(128|63&s>>>6),this.Nt(128|63&s)}}this.Bt()}$t(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.kt(r);else if(r<2048)this.kt(960|r>>>6),this.kt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.kt(480|r>>>12),this.kt(128|63&r>>>6),this.kt(128|63&r);else{const s=t.codePointAt(0);this.kt(240|s>>>18),this.kt(128|63&s>>>12),this.kt(128|63&s>>>6),this.kt(128|63&s)}}this.qt()}Ut(e){const t=this.Kt(e),r=Ef(t);this.Wt(1+r),this.buffer[this.position++]=255&r;for(let s=t.length-r;s<t.length;++s)this.buffer[this.position++]=255&t[s]}Gt(e){const t=this.Kt(e),r=Ef(t);this.Wt(1+r),this.buffer[this.position++]=~(255&r);for(let s=t.length-r;s<t.length;++s)this.buffer[this.position++]=~(255&t[s])}zt(){this.jt(Vr),this.jt(255)}Ht(){this.Jt(Vr),this.Jt(255)}reset(){this.position=0}seed(e){this.Wt(e.length),this.buffer.set(e,this.position),this.position+=e.length}Yt(){return this.buffer.slice(0,this.position)}Kt(e){const t=function(i){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,i,!1),new Uint8Array(o.buffer)}(e),r=!!(128&t[0]);t[0]^=r?255:128;for(let s=1;s<t.length;++s)t[s]^=r?255:0;return t}Nt(e){const t=255&e;t===0?(this.jt(0),this.jt(255)):t===Vr?(this.jt(Vr),this.jt(0)):this.jt(t)}kt(e){const t=255&e;t===0?(this.Jt(0),this.Jt(255)):t===Vr?(this.Jt(Vr),this.Jt(0)):this.Jt(e)}Bt(){this.jt(0),this.jt(1)}qt(){this.Jt(0),this.Jt(1)}jt(e){this.Wt(1),this.buffer[this.position++]=e}Jt(e){this.Wt(1),this.buffer[this.position++]=~e}Wt(e){const t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);const s=new Uint8Array(r);s.set(this.buffer),this.buffer=s}}class jT{constructor(e){this.Zt=e}bt(e){this.Zt.Ot(e)}yt(e){this.Zt.Qt(e)}gt(e){this.Zt.Ut(e)}Vt(){this.Zt.zt()}}class zT{constructor(e){this.Zt=e}bt(e){this.Zt.Lt(e)}yt(e){this.Zt.$t(e)}gt(e){this.Zt.Gt(e)}Vt(){this.Zt.Ht()}}class qs{constructor(){this.Zt=new qT,this.Xt=new jT(this.Zt),this.en=new zT(this.Zt)}seed(e){this.Zt.seed(e)}tn(e){return e===0?this.Xt:this.en}Yt(){return this.Zt.Yt()}reset(){this.Zt.reset()}}/**
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
 */class tr{constructor(e,t,r,s){this.indexId=e,this.documentKey=t,this.arrayValue=r,this.directionalValue=s}nn(){const e=this.directionalValue.length,t=e===0||this.directionalValue[e-1]===255?e+1:e,r=new Uint8Array(t);return r.set(this.directionalValue,0),t!==e?r.set([0],this.directionalValue.length):++r[r.length-1],new tr(this.indexId,this.documentKey,this.arrayValue,r)}}function hn(n,e){let t=n.indexId-e.indexId;return t!==0?t:(t=Tf(n.arrayValue,e.arrayValue),t!==0?t:(t=Tf(n.directionalValue,e.directionalValue),t!==0?t:J.comparator(n.documentKey,e.documentKey)))}function Tf(n,e){for(let t=0;t<n.length&&t<e.length;++t){const r=n[t]-e[t];if(r!==0)return r}return n.length-e.length}/**
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
 */class Af{constructor(e){this.rn=new Ee((t,r)=>Ve.comparator(t.field,r.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.sn=e.orderBy,this._n=[];for(const t of e.filters){const r=t;r.isInequality()?this.rn=this.rn.add(r):this._n.push(r)}}get an(){return this.rn.size>1}un(e){if(te(e.collectionGroup===this.collectionId),this.an)return!1;const t=cl(e);if(t!==void 0&&!this.cn(t))return!1;const r=Wn(e);let s=new Set,i=0,o=0;for(;i<r.length&&this.cn(r[i]);++i)s=s.add(r[i].fieldPath.canonicalString());if(i===r.length)return!0;if(this.rn.size>0){const c=this.rn.getIterator().getNext();if(!s.has(c.field.canonicalString())){const l=r[i];if(!this.ln(c,l)||!this.hn(this.sn[o++],l))return!1}++i}for(;i<r.length;++i){const c=r[i];if(o>=this.sn.length||!this.hn(this.sn[o++],c))return!1}return!0}Pn(){if(this.an)return null;let e=new Ee(Ve.comparator);const t=[];for(const r of this._n)if(!r.field.isKeyField())if(r.op==="array-contains"||r.op==="array-contains-any")t.push(new Vo(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),t.push(new Vo(r.field,0))}for(const r of this.sn)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),t.push(new Vo(r.field,r.dir==="asc"?0:1)));return new ta(ta.UNKNOWN_ID,this.collectionId,t,gi.empty())}cn(e){for(const t of this._n)if(this.ln(t,e))return!0;return!1}ln(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const r=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===r}hn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
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
 */function Gg(n){var e,t;if(te(n instanceof ge||n instanceof Ie),n instanceof ge){if(n instanceof hg){const s=((t=(e=n.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map(i=>ge.create(n.field,"==",i)))||[];return Ie.create(s,"or")}return n}const r=n.filters.map(s=>Gg(s));return Ie.create(r,n.op)}function GT(n){if(n.getFilters().length===0)return[];const e=Al(Gg(n));return te(Hg(e)),El(e)||Tl(e)?[e]:e.getFilters()}function El(n){return n instanceof ge}function Tl(n){return n instanceof Ie&&uu(n)}function Hg(n){return El(n)||Tl(n)||function(t){if(t instanceof Ie&&ml(t)){for(const r of t.getFilters())if(!El(r)&&!Tl(r))return!1;return!0}return!1}(n)}function Al(n){if(te(n instanceof ge||n instanceof Ie),n instanceof ge)return n;if(n.filters.length===1)return Al(n.filters[0]);const e=n.filters.map(r=>Al(r));let t=Ie.create(e,n.op);return t=pa(t),Hg(t)?t:(te(t instanceof Ie),te(cs(t)),te(t.filters.length>1),t.filters.reduce((r,s)=>vu(r,s)))}function vu(n,e){let t;return te(n instanceof ge||n instanceof Ie),te(e instanceof ge||e instanceof Ie),t=n instanceof ge?e instanceof ge?function(s,i){return Ie.create([s,i],"and")}(n,e):Sf(n,e):e instanceof ge?Sf(e,n):function(s,i){if(te(s.filters.length>0&&i.filters.length>0),cs(s)&&cs(i))return lg(s,i.getFilters());const o=ml(s)?s:i,c=ml(s)?i:s,l=o.filters.map(h=>vu(h,c));return Ie.create(l,"or")}(n,e),pa(t)}function Sf(n,e){if(cs(e))return lg(e,n.getFilters());{const t=e.filters.map(r=>vu(n,r));return Ie.create(t,"or")}}function pa(n){if(te(n instanceof ge||n instanceof Ie),n instanceof ge)return n;const e=n.getFilters();if(e.length===1)return pa(e[0]);if(ag(n))return n;const t=e.map(s=>pa(s)),r=[];return t.forEach(s=>{s instanceof ge?r.push(s):s instanceof Ie&&(s.op===n.op?r.push(...s.filters):r.push(s))}),r.length===1?r[0]:Ie.create(r,n.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HT{constructor(){this.Tn=new yu}addToCollectionParentIndex(e,t){return this.Tn.add(t),D.resolve()}getCollectionParents(e,t){return D.resolve(this.Tn.getEntries(t))}addFieldIndex(e,t){return D.resolve()}deleteFieldIndex(e,t){return D.resolve()}deleteAllFieldIndexes(e){return D.resolve()}createTargetIndexes(e,t){return D.resolve()}getDocumentsMatchingTarget(e,t){return D.resolve(null)}getIndexType(e,t){return D.resolve(0)}getFieldIndexes(e,t){return D.resolve([])}getNextCollectionGroupToUpdate(e){return D.resolve(null)}getMinOffset(e,t){return D.resolve(bt.min())}getMinOffsetFromCollectionGroup(e,t){return D.resolve(bt.min())}updateCollectionGroup(e,t,r){return D.resolve()}updateIndexEntries(e,t){return D.resolve()}}class yu{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new Ee(we.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Ee(we.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rf="IndexedDbIndexManager",go=new Uint8Array(0);class KT{constructor(e,t){this.databaseId=t,this.In=new yu,this.En=new sn(r=>pr(r),(r,s)=>Fi(r,s)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.In.has(t)){const r=t.lastSegment(),s=t.popLast();e.addOnCommittedListener(()=>{this.In.add(t)});const i={collectionId:r,parent:tt(s)};return Cf(e).put(i)}return D.resolve()}getCollectionParents(e,t){const r=[],s=IDBKeyRange.bound([t,""],[Lm(t),""],!1,!0);return Cf(e).G(s).next(i=>{for(const o of i){if(o.collectionId!==t)break;r.push(Vt(o.parent))}return r})}addFieldIndex(e,t){const r=js(e),s=function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map(l=>[l.fieldPath.canonicalString(),l.kind])}}(t);delete s.indexId;const i=r.add(s);if(t.indexState){const o=Lr(e);return i.next(c=>{o.put(bf(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return i.next()}deleteFieldIndex(e,t){const r=js(e),s=Lr(e),i=Or(e);return r.delete(t.indexId).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=js(e),r=Or(e),s=Lr(e);return t.J().next(()=>r.J()).next(()=>s.J())}createTargetIndexes(e,t){return D.forEach(this.dn(t),r=>this.getIndexType(e,r).next(s=>{if(s===0||s===1){const i=new Af(r).Pn();if(i!=null)return this.addFieldIndex(e,i)}}))}getDocumentsMatchingTarget(e,t){const r=Or(e);let s=!0;const i=new Map;return D.forEach(this.dn(t),o=>this.An(e,o).next(c=>{s&&(s=!!c),i.set(o,c)})).next(()=>{if(s){let o=pe();const c=[];return D.forEach(i,(l,h)=>{H(Rf,`Using index ${function(N){return`id=${N.indexId}|cg=${N.collectionGroup}|f=${N.fields.map(B=>`${B.fieldPath}:${B.kind}`).join(",")}`}(l)} to execute ${pr(t)}`);const p=function(N,B){const P=cl(B);if(P===void 0)return null;for(const F of la(N,P.fieldPath))switch(F.op){case"array-contains-any":return F.value.arrayValue.values||[];case"array-contains":return[F.value]}return null}(h,l),m=function(N,B){const P=new Map;for(const F of Wn(B))for(const I of la(N,F.fieldPath))switch(I.op){case"==":case"in":P.set(F.fieldPath.canonicalString(),I.value);break;case"not-in":case"!=":return P.set(F.fieldPath.canonicalString(),I.value),Array.from(P.values())}return null}(h,l),g=function(N,B){const P=[];let F=!0;for(const I of Wn(B)){const v=I.kind===0?of(N,I.fieldPath,N.startAt):af(N,I.fieldPath,N.startAt);P.push(v.value),F&&(F=v.inclusive)}return new Pn(P,F)}(h,l),E=function(N,B){const P=[];let F=!0;for(const I of Wn(B)){const v=I.kind===0?af(N,I.fieldPath,N.endAt):of(N,I.fieldPath,N.endAt);P.push(v.value),F&&(F=v.inclusive)}return new Pn(P,F)}(h,l),S=this.Rn(l,h,g),k=this.Rn(l,h,E),T=this.Vn(l,h,m),L=this.mn(l.indexId,p,S,g.inclusive,k,E.inclusive,T);return D.forEach(L,R=>r.H(R,t.limit).next(N=>{N.forEach(B=>{const P=J.fromSegments(B.documentKey);o.has(P)||(o=o.add(P),c.push(P))})}))}).next(()=>c)}return D.resolve(null)})}dn(e){let t=this.En.get(e);return t||(e.filters.length===0?t=[e]:t=GT(Ie.create(e.filters,"and")).map(r=>_l(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt)),this.En.set(e,t),t)}mn(e,t,r,s,i,o,c){const l=(t!=null?t.length:1)*Math.max(r.length,i.length),h=l/(t!=null?t.length:1),p=[];for(let m=0;m<l;++m){const g=t?this.fn(t[m/h]):go,E=this.gn(e,g,r[m%h],s),S=this.pn(e,g,i[m%h],o),k=c.map(T=>this.gn(e,g,T,!0));p.push(...this.createRange(E,S,k))}return p}gn(e,t,r,s){const i=new tr(e,J.empty(),t,r);return s?i:i.nn()}pn(e,t,r,s){const i=new tr(e,J.empty(),t,r);return s?i.nn():i}An(e,t){const r=new Af(t),s=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,s).next(i=>{let o=null;for(const c of i)r.un(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o})}getIndexType(e,t){let r=2;const s=this.dn(t);return D.forEach(s,i=>this.An(e,i).next(o=>{o?r!==0&&o.fields.length<function(l){let h=new Ee(Ve.comparator),p=!1;for(const m of l.filters)for(const g of m.getFlattenedFilters())g.field.isKeyField()||(g.op==="array-contains"||g.op==="array-contains-any"?p=!0:h=h.add(g.field));for(const m of l.orderBy)m.field.isKeyField()||(h=h.add(m.field));return h.size+(p?1:0)}(i)&&(r=1):r=0})).next(()=>function(o){return o.limit!==null}(t)&&s.length>1&&r===2?1:r)}yn(e,t){const r=new qs;for(const s of Wn(e)){const i=t.data.field(s.fieldPath);if(i==null)return null;const o=r.tn(s.kind);er.xt.At(i,o)}return r.Yt()}fn(e){const t=new qs;return er.xt.At(e,t.tn(0)),t.Yt()}wn(e,t){const r=new qs;return er.xt.At(fr(this.databaseId,t),r.tn(function(i){const o=Wn(i);return o.length===0?0:o[o.length-1].kind}(e))),r.Yt()}Vn(e,t,r){if(r===null)return[];let s=[];s.push(new qs);let i=0;for(const o of Wn(e)){const c=r[i++];for(const l of s)if(this.Sn(t,o.fieldPath)&&Ei(c))s=this.bn(s,o,c);else{const h=l.tn(o.kind);er.xt.At(c,h)}}return this.Dn(s)}Rn(e,t,r){return this.Vn(e,t,r.position)}Dn(e){const t=[];for(let r=0;r<e.length;++r)t[r]=e[r].Yt();return t}bn(e,t,r){const s=[...e],i=[];for(const o of r.arrayValue.values||[])for(const c of s){const l=new qs;l.seed(c.Yt()),er.xt.At(o,l.tn(t.kind)),i.push(l)}return i}Sn(e,t){return!!e.filters.find(r=>r instanceof ge&&r.field.isEqual(t)&&(r.op==="in"||r.op==="not-in"))}getFieldIndexes(e,t){const r=js(e),s=Lr(e);return(t?r.G(ul,IDBKeyRange.bound(t,t)):r.G()).next(i=>{const o=[];return D.forEach(i,c=>s.get([c.indexId,this.uid]).next(l=>{o.push(function(p,m){const g=m?new gi(m.sequenceNumber,new bt(gr(m.readTime),new J(Vt(m.documentKey)),m.largestBatchId)):gi.empty(),E=p.fields.map(([S,k])=>new Vo(Ve.fromServerFormat(S),k));return new ta(p.indexId,p.collectionGroup,E,g)}(c,l))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((r,s)=>{const i=r.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:ue(r.collectionGroup,s.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,r){const s=js(e),i=Lr(e);return this.vn(e).next(o=>s.G(ul,IDBKeyRange.bound(t,t)).next(c=>D.forEach(c,l=>i.put(bf(l.indexId,this.uid,o,r)))))}updateIndexEntries(e,t){const r=new Map;return D.forEach(t,(s,i)=>{const o=r.get(s.collectionGroup);return(o?D.resolve(o):this.getFieldIndexes(e,s.collectionGroup)).next(c=>(r.set(s.collectionGroup,c),D.forEach(c,l=>this.Cn(e,s,l).next(h=>{const p=this.Fn(i,l);return h.isEqual(p)?D.resolve():this.Mn(e,i,l,h,p)}))))})}xn(e,t,r,s){return Or(e).put({indexId:s.indexId,uid:this.uid,arrayValue:s.arrayValue,directionalValue:s.directionalValue,orderedDocumentKey:this.wn(r,t.key),documentKey:t.key.path.toArray()})}On(e,t,r,s){return Or(e).delete([s.indexId,this.uid,s.arrayValue,s.directionalValue,this.wn(r,t.key),t.key.path.toArray()])}Cn(e,t,r){const s=Or(e);let i=new Ee(hn);return s.Z({index:Gm,range:IDBKeyRange.only([r.indexId,this.uid,this.wn(r,t)])},(o,c)=>{i=i.add(new tr(r.indexId,t,c.arrayValue,c.directionalValue))}).next(()=>i)}Fn(e,t){let r=new Ee(hn);const s=this.yn(t,e);if(s==null)return r;const i=cl(t);if(i!=null){const o=e.data.field(i.fieldPath);if(Ei(o))for(const c of o.arrayValue.values||[])r=r.add(new tr(t.indexId,e.key,this.fn(c),s))}else r=r.add(new tr(t.indexId,e.key,go,s));return r}Mn(e,t,r,s,i){H(Rf,"Updating index entries for document '%s'",t.key);const o=[];return function(l,h,p,m,g){const E=l.getIterator(),S=h.getIterator();let k=Dr(E),T=Dr(S);for(;k||T;){let L=!1,R=!1;if(k&&T){const N=p(k,T);N<0?R=!0:N>0&&(L=!0)}else k!=null?R=!0:L=!0;L?(m(T),T=Dr(S)):R?(g(k),k=Dr(E)):(k=Dr(E),T=Dr(S))}}(s,i,hn,c=>{o.push(this.xn(e,t,r,c))},c=>{o.push(this.On(e,t,r,c))}),D.waitFor(o)}vn(e){let t=1;return Lr(e).Z({index:zm,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(r,s,i)=>{i.done(),t=s.sequenceNumber+1}).next(()=>t)}createRange(e,t,r){r=r.sort((o,c)=>hn(o,c)).filter((o,c,l)=>!c||hn(o,l[c-1])!==0);const s=[];s.push(e);for(const o of r){const c=hn(o,e),l=hn(o,t);if(c===0)s[0]=e.nn();else if(c>0&&l<0)s.push(o),s.push(o.nn());else if(l>0)break}s.push(t);const i=[];for(let o=0;o<s.length;o+=2){if(this.Nn(s[o],s[o+1]))return[];const c=[s[o].indexId,this.uid,s[o].arrayValue,s[o].directionalValue,go,[]],l=[s[o+1].indexId,this.uid,s[o+1].arrayValue,s[o+1].directionalValue,go,[]];i.push(IDBKeyRange.bound(c,l))}return i}Nn(e,t){return hn(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(kf)}getMinOffset(e,t){return D.mapArray(this.dn(t),r=>this.An(e,r).next(s=>s||ee())).next(kf)}}function Cf(n){return ze(n,bi)}function Or(n){return ze(n,oa)}function js(n){return ze(n,iu)}function Lr(n){return ze(n,ia)}function kf(n){te(n.length!==0);let e=n[0].indexState.offset,t=e.largestBatchId;for(let r=1;r<n.length;r++){const s=n[r].indexState.offset;nu(s,e)<0&&(e=s),t<s.largestBatchId&&(t=s.largestBatchId)}return new bt(e.readTime,e.documentKey,t)}/**
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
 */const Pf={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Kg=41943040;class Xe{static withCacheSize(e){return new Xe(e,Xe.DEFAULT_COLLECTION_PERCENTILE,Xe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wg(n,e,t){const r=n.store(Ct),s=n.store(ns),i=[],o=IDBKeyRange.only(t.batchId);let c=0;const l=r.Z({range:o},(p,m,g)=>(c++,g.delete()));i.push(l.next(()=>{te(c===1)}));const h=[];for(const p of t.mutations){const m=$m(e,p.key.path,t.batchId);i.push(s.delete(m)),h.push(p.key)}return D.waitFor(i).next(()=>h)}function ma(n){if(!n)return 0;let e;if(n.document)e=n.document;else if(n.unknownDocument)e=n.unknownDocument;else{if(!n.noDocument)throw ee();e=n.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Xe.DEFAULT_COLLECTION_PERCENTILE=10,Xe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Xe.DEFAULT=new Xe(Kg,Xe.DEFAULT_COLLECTION_PERCENTILE,Xe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Xe.DISABLED=new Xe(-1,0,0);class Ya{constructor(e,t,r,s){this.userId=e,this.serializer=t,this.indexManager=r,this.referenceDelegate=s,this.Bn={}}static It(e,t,r,s){te(e.uid!=="");const i=e.isAuthenticated()?e.uid:"";return new Ya(i,t,r,s)}checkEmpty(e){let t=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return fn(e).Z({index:nr,range:r},(s,i,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,r,s){const i=qr(e),o=fn(e);return o.add({}).next(c=>{te(typeof c=="number");const l=new fu(c,t,r,s),h=function(E,S,k){const T=k.baseMutations.map(R=>ha(E.Tt,R)),L=k.mutations.map(R=>ha(E.Tt,R));return{userId:S,batchId:k.batchId,localWriteTimeMs:k.localWriteTime.toMillis(),baseMutations:T,mutations:L}}(this.serializer,this.userId,l),p=[];let m=new Ee((g,E)=>ue(g.canonicalString(),E.canonicalString()));for(const g of s){const E=$m(this.userId,g.key.path,c);m=m.add(g.key.path.popLast()),p.push(o.put(h)),p.push(i.put(E,TE))}return m.forEach(g=>{p.push(this.indexManager.addToCollectionParentIndex(e,g))}),e.addOnCommittedListener(()=>{this.Bn[c]=l.keys()}),D.waitFor(p).next(()=>l)})}lookupMutationBatch(e,t){return fn(e).get(t).next(r=>r?(te(r.userId===this.userId),Zn(this.serializer,r)):null)}Ln(e,t){return this.Bn[t]?D.resolve(this.Bn[t]):this.lookupMutationBatch(e,t).next(r=>{if(r){const s=r.keys();return this.Bn[t]=s,s}return null})}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=IDBKeyRange.lowerBound([this.userId,r]);let i=null;return fn(e).Z({index:nr,range:s},(o,c,l)=>{c.userId===this.userId&&(te(c.batchId>=r),i=Zn(this.serializer,c)),l.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=or;return fn(e).Z({index:nr,range:t,reverse:!0},(s,i,o)=>{r=i.batchId,o.done()}).next(()=>r)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,or],[this.userId,Number.POSITIVE_INFINITY]);return fn(e).G(nr,t).next(r=>r.map(s=>Zn(this.serializer,s)))}getAllMutationBatchesAffectingDocumentKey(e,t){const r=Oo(this.userId,t.path),s=IDBKeyRange.lowerBound(r),i=[];return qr(e).Z({range:s},(o,c,l)=>{const[h,p,m]=o,g=Vt(p);if(h===this.userId&&t.path.isEqual(g))return fn(e).get(m).next(E=>{if(!E)throw ee();te(E.userId===this.userId),i.push(Zn(this.serializer,E))});l.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Ee(ue);const s=[];return t.forEach(i=>{const o=Oo(this.userId,i.path),c=IDBKeyRange.lowerBound(o),l=qr(e).Z({range:c},(h,p,m)=>{const[g,E,S]=h,k=Vt(E);g===this.userId&&i.path.isEqual(k)?r=r.add(S):m.done()});s.push(l)}),D.waitFor(s).next(()=>this.kn(e,r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1,i=Oo(this.userId,r),o=IDBKeyRange.lowerBound(i);let c=new Ee(ue);return qr(e).Z({range:o},(l,h,p)=>{const[m,g,E]=l,S=Vt(g);m===this.userId&&r.isPrefixOf(S)?S.length===s&&(c=c.add(E)):p.done()}).next(()=>this.kn(e,c))}kn(e,t){const r=[],s=[];return t.forEach(i=>{s.push(fn(e).get(i).next(o=>{if(o===null)throw ee();te(o.userId===this.userId),r.push(Zn(this.serializer,o))}))}),D.waitFor(s).next(()=>r)}removeMutationBatch(e,t){return Wg(e.ue,this.userId,t).next(r=>(e.addOnCommittedListener(()=>{this.qn(t.batchId)}),D.forEach(r,s=>this.referenceDelegate.markPotentiallyOrphaned(e,s))))}qn(e){delete this.Bn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return D.resolve();const r=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),s=[];return qr(e).Z({range:r},(i,o,c)=>{if(i[0]===this.userId){const l=Vt(i[1]);s.push(l)}else c.done()}).next(()=>{te(s.length===0)})})}containsKey(e,t){return Qg(e,this.userId,t)}Qn(e){return Yg(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:or,lastStreamToken:""})}}function Qg(n,e,t){const r=Oo(e,t.path),s=r[1],i=IDBKeyRange.lowerBound(r);let o=!1;return qr(n).Z({range:i,Y:!0},(c,l,h)=>{const[p,m,g]=c;p===e&&m===s&&(o=!0),h.done()}).next(()=>o)}function fn(n){return ze(n,Ct)}function qr(n){return ze(n,ns)}function Yg(n){return ze(n,vi)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _r{constructor(e){this.$n=e}next(){return this.$n+=2,this.$n}static Un(){return new _r(0)}static Kn(){return new _r(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WT{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.Wn(e).next(t=>{const r=new _r(t.highestTargetId);return t.highestTargetId=r.next(),this.Gn(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.Wn(e).next(t=>se.fromTimestamp(new Oe(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.Wn(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,r){return this.Wn(e).next(s=>(s.highestListenSequenceNumber=t,r&&(s.lastRemoteSnapshotVersion=r.toTimestamp()),t>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=t),this.Gn(e,s)))}addTargetData(e,t){return this.zn(e,t).next(()=>this.Wn(e).next(r=>(r.targetCount+=1,this.jn(t,r),this.Gn(e,r))))}updateTargetData(e,t){return this.zn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>Mr(e).delete(t.targetId)).next(()=>this.Wn(e)).next(r=>(te(r.targetCount>0),r.targetCount-=1,this.Gn(e,r)))}removeTargets(e,t,r){let s=0;const i=[];return Mr(e).Z((o,c)=>{const l=Xs(c);l.sequenceNumber<=t&&r.get(l.targetId)===null&&(s++,i.push(this.removeTargetData(e,l)))}).next(()=>D.waitFor(i)).next(()=>s)}forEachTarget(e,t){return Mr(e).Z((r,s)=>{const i=Xs(s);t(i)})}Wn(e){return xf(e).get(sa).next(t=>(te(t!==null),t))}Gn(e,t){return xf(e).put(sa,t)}zn(e,t){return Mr(e).put(jg(this.serializer,t))}jn(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.Wn(e).next(t=>t.targetCount)}getTargetData(e,t){const r=pr(t),s=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let i=null;return Mr(e).Z({range:s,index:jm},(o,c,l)=>{const h=Xs(c);Fi(t,h.target)&&(i=h,l.done())}).next(()=>i)}addMatchingKeys(e,t,r){const s=[],i=bn(e);return t.forEach(o=>{const c=tt(o.path);s.push(i.put({targetId:r,path:c})),s.push(this.referenceDelegate.addReference(e,r,o))}),D.waitFor(s)}removeMatchingKeys(e,t,r){const s=bn(e);return D.forEach(t,i=>{const o=tt(i.path);return D.waitFor([s.delete([r,o]),this.referenceDelegate.removeReference(e,r,i)])})}removeMatchingKeysForTargetId(e,t){const r=bn(e),s=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(s)}getMatchingKeysForTargetId(e,t){const r=IDBKeyRange.bound([t],[t+1],!1,!0),s=bn(e);let i=pe();return s.Z({range:r,Y:!0},(o,c,l)=>{const h=Vt(o[1]),p=new J(h);i=i.add(p)}).next(()=>i)}containsKey(e,t){const r=tt(t.path),s=IDBKeyRange.bound([r],[Lm(r)],!1,!0);let i=0;return bn(e).Z({index:su,Y:!0,range:s},([o,c],l,h)=>{o!==0&&(i++,h.done())}).next(()=>i>0)}lt(e,t){return Mr(e).get(t).next(r=>r?Xs(r):null)}}function Mr(n){return ze(n,rs)}function xf(n){return ze(n,ar)}function bn(n){return ze(n,ss)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nf="LruGarbageCollector",Jg=1048576;function Df([n,e],[t,r]){const s=ue(n,t);return s===0?ue(e,r):s}class QT{constructor(e){this.Hn=e,this.buffer=new Ee(Df),this.Jn=0}Yn(){return++this.Jn}Zn(e){const t=[e,this.Yn()];if(this.buffer.size<this.Hn)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Df(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Xg{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Xn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.er(6e4)}stop(){this.Xn&&(this.Xn.cancel(),this.Xn=null)}get started(){return this.Xn!==null}er(e){H(Nf,`Garbage collection scheduled in ${e}ms`),this.Xn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Xn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){On(t)?H(Nf,"Ignoring IndexedDB error during garbage collection: ",t):await Ir(t)}await this.er(3e5)})}}class YT{constructor(e,t){this.tr=e,this.params=t}calculateTargetCount(e,t){return this.tr.nr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return D.resolve(At.ae);const r=new QT(t);return this.tr.forEachTarget(e,s=>r.Zn(s.sequenceNumber)).next(()=>this.tr.rr(e,s=>r.Zn(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.tr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.tr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(H("LruGarbageCollector","Garbage collection skipped; disabled"),D.resolve(Pf)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(H("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Pf):this.ir(e,t))}getCacheSize(e){return this.tr.getCacheSize(e)}ir(e,t){let r,s,i,o,c,l,h;const p=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(m=>(m>this.params.maximumSequenceNumbersToCollect?(H("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),s=this.params.maximumSequenceNumbersToCollect):s=m,o=Date.now(),this.nthSequenceNumber(e,s))).next(m=>(r=m,c=Date.now(),this.removeTargets(e,r,t))).next(m=>(i=m,l=Date.now(),this.removeOrphanedDocuments(e,r))).next(m=>(h=Date.now(),Fr()<=me.DEBUG&&H("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-p}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(l-c)+`ms
	Removed ${m} documents in `+(h-l)+`ms
Total Duration: ${h-p}ms`),D.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:m})))}}function Zg(n,e){return new YT(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JT{constructor(e,t){this.db=e,this.garbageCollector=Zg(this,t)}nr(e){const t=this.sr(e);return this.db.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}sr(e){let t=0;return this.rr(e,r=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}rr(e,t){return this._r(e,(r,s)=>t(s))}addReference(e,t,r){return _o(e,r)}removeReference(e,t,r){return _o(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return _o(e,t)}ar(e,t){return function(s,i){let o=!1;return Yg(s).X(c=>Qg(s,c,i).next(l=>(l&&(o=!0),D.resolve(!l)))).next(()=>o)}(e,t)}removeOrphanedDocuments(e,t){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this._r(e,(o,c)=>{if(c<=t){const l=this.ar(e,o).next(h=>{if(!h)return i++,r.getEntry(e,o).next(()=>(r.removeEntry(o,se.min()),bn(e).delete(function(m){return[0,tt(m.path)]}(o))))});s.push(l)}}).next(()=>D.waitFor(s)).next(()=>r.apply(e)).next(()=>i)}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return _o(e,t)}_r(e,t){const r=bn(e);let s,i=At.ae;return r.Z({index:su},([o,c],{path:l,sequenceNumber:h})=>{o===0?(i!==At.ae&&t(new J(Vt(s)),i),i=h,s=l):i=At.ae}).next(()=>{i!==At.ae&&t(new J(Vt(s)),i)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function _o(n,e){return bn(n).put(function(r,s){return{targetId:0,path:tt(r.path),sequenceNumber:s}}(e,n.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e_{constructor(){this.changes=new sn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Me.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?D.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XT{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return zn(e).put(r)}removeEntry(e,t,r){return zn(e).delete(function(i,o){const c=i.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],fa(o),c[c.length-1]]}(t,r))}updateMetadata(e,t){return this.getMetadata(e).next(r=>(r.byteSize+=t,this.ur(e,r)))}getEntry(e,t){let r=Me.newInvalidDocument(t);return zn(e).Z({index:Lo,range:IDBKeyRange.only(zs(t))},(s,i)=>{r=this.cr(t,i)}).next(()=>r)}lr(e,t){let r={size:0,document:Me.newInvalidDocument(t)};return zn(e).Z({index:Lo,range:IDBKeyRange.only(zs(t))},(s,i)=>{r={document:this.cr(t,i),size:ma(i)}}).next(()=>r)}getEntries(e,t){let r=vt();return this.hr(e,t,(s,i)=>{const o=this.cr(s,i);r=r.insert(s,o)}).next(()=>r)}Pr(e,t){let r=vt(),s=new xe(J.comparator);return this.hr(e,t,(i,o)=>{const c=this.cr(i,o);r=r.insert(i,c),s=s.insert(i,ma(o))}).next(()=>({documents:r,Tr:s}))}hr(e,t,r){if(t.isEmpty())return D.resolve();let s=new Ee(Lf);t.forEach(l=>s=s.add(l));const i=IDBKeyRange.bound(zs(s.first()),zs(s.last())),o=s.getIterator();let c=o.getNext();return zn(e).Z({index:Lo,range:i},(l,h,p)=>{const m=J.fromSegments([...h.prefixPath,h.collectionGroup,h.documentId]);for(;c&&Lf(c,m)<0;)r(c,null),c=o.getNext();c&&c.isEqual(m)&&(r(c,h),c=o.hasNext()?o.getNext():null),c?p.W(zs(c)):p.done()}).next(()=>{for(;c;)r(c,null),c=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,r,s,i){const o=t.path,c=[o.popLast().toArray(),o.lastSegment(),fa(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],l=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return zn(e).G(IDBKeyRange.bound(c,l,!0)).next(h=>{i?.incrementDocumentReadCount(h.length);let p=vt();for(const m of h){const g=this.cr(J.fromSegments(m.prefixPath.concat(m.collectionGroup,m.documentId)),m);g.isFoundDocument()&&(Bi(t,g)||s.has(g.key))&&(p=p.insert(g.key,g))}return p})}getAllFromCollectionGroup(e,t,r,s){let i=vt();const o=Of(t,r),c=Of(t,bt.max());return zn(e).Z({index:qm,range:IDBKeyRange.bound(o,c,!0)},(l,h,p)=>{const m=this.cr(J.fromSegments(h.prefixPath.concat(h.collectionGroup,h.documentId)),h);i=i.insert(m.key,m),i.size===s&&p.done()}).next(()=>i)}newChangeBuffer(e){return new ZT(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return Vf(e).get(ll).next(t=>(te(!!t),t))}ur(e,t){return Vf(e).put(ll,t)}cr(e,t){if(t){const r=FT(this.serializer,t);if(!(r.isNoDocument()&&r.version.isEqual(se.min())))return r}return Me.newInvalidDocument(e)}}function t_(n){return new XT(n)}class ZT extends e_{constructor(e,t){super(),this.Ir=e,this.trackRemovals=t,this.Er=new sn(r=>r.toString(),(r,s)=>r.isEqual(s))}applyChanges(e){const t=[];let r=0,s=new Ee((i,o)=>ue(i.canonicalString(),o.canonicalString()));return this.changes.forEach((i,o)=>{const c=this.Er.get(i);if(t.push(this.Ir.removeEntry(e,i,c.readTime)),o.isValidDocument()){const l=vf(this.Ir.serializer,o);s=s.add(i.path.popLast());const h=ma(l);r+=h-c.size,t.push(this.Ir.addEntry(e,i,l))}else if(r-=c.size,this.trackRemovals){const l=vf(this.Ir.serializer,o.convertToNoDocument(se.min()));t.push(this.Ir.addEntry(e,i,l))}}),s.forEach(i=>{t.push(this.Ir.indexManager.addToCollectionParentIndex(e,i))}),t.push(this.Ir.updateMetadata(e,r)),D.waitFor(t)}getFromCache(e,t){return this.Ir.lr(e,t).next(r=>(this.Er.set(t,{size:r.size,readTime:r.document.readTime}),r.document))}getAllFromCache(e,t){return this.Ir.Pr(e,t).next(({documents:r,Tr:s})=>(s.forEach((i,o)=>{this.Er.set(i,{size:o,readTime:r.get(i).readTime})}),r))}}function Vf(n){return ze(n,yi)}function zn(n){return ze(n,ra)}function zs(n){const e=n.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function Of(n,e){const t=e.documentKey.path.toArray();return[n,fa(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function Lf(n,e){const t=n.path.toArray(),r=e.path.toArray();let s=0;for(let i=0;i<t.length-2&&i<r.length-2;++i)if(s=ue(t[i],r[i]),s)return s;return s=ue(t.length,r.length),s||(s=ue(t[t.length-2],r[r.length-2]),s||ue(t[t.length-1],r[r.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class eA{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n_{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&ii(r.mutation,s,ut.empty(),Oe.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,pe()).next(()=>r))}getLocalViewOfDocuments(e,t,r=pe()){const s=Ot();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let o=Ys();return i.forEach((c,l)=>{o=o.insert(c,l.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const r=Ot();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,pe()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,c)=>{t.set(o,c)})})}computeViews(e,t,r,s){let i=vt();const o=si(),c=function(){return si()}();return t.forEach((l,h)=>{const p=r.get(h.key);s.has(h.key)&&(p===void 0||p.mutation instanceof on)?i=i.insert(h.key,h):p!==void 0?(o.set(h.key,p.mutation.getFieldMask()),ii(p.mutation,h,p.mutation.getFieldMask(),Oe.now())):o.set(h.key,ut.empty())}),this.recalculateAndSaveOverlays(e,i).next(l=>(l.forEach((h,p)=>o.set(h,p)),t.forEach((h,p)=>{var m;return c.set(h,new eA(p,(m=o.get(h))!==null&&m!==void 0?m:null))}),c))}recalculateAndSaveOverlays(e,t){const r=si();let s=new xe((o,c)=>o-c),i=pe();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const c of o)c.keys().forEach(l=>{const h=t.get(l);if(h===null)return;let p=r.get(l)||ut.empty();p=c.applyToLocalView(h,p),r.set(l,p);const m=(s.get(c.batchId)||pe()).add(l);s=s.insert(c.batchId,m)})}).next(()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),h=l.key,p=l.value,m=_g();p.forEach(g=>{if(!i.has(g)){const E=Ag(t.get(g),r.get(g));E!==null&&m.set(g,E),i=i.add(g)}}),o.push(this.documentOverlayCache.saveOverlays(e,h,m))}return D.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return function(o){return J.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):du(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):D.resolve(Ot());let c=mi,l=i;return o.next(h=>D.forEach(h,(p,m)=>(c<m.largestBatchId&&(c=m.largestBatchId),i.get(p)?D.resolve():this.remoteDocumentCache.getEntry(e,p).next(g=>{l=l.insert(p,g)}))).next(()=>this.populateOverlays(e,h,i)).next(()=>this.computeViews(e,l,h,pe())).next(p=>({batchId:c,changes:gg(p)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new J(t)).next(r=>{let s=Ys();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let o=Ys();return this.indexManager.getCollectionParents(e,i).next(c=>D.forEach(c,l=>{const h=function(m,g){return new Er(g,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(t,l.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next(p=>{p.forEach((m,g)=>{o=o.insert(m,g)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(o=>{i.forEach((l,h)=>{const p=h.getKey();o.get(p)===null&&(o=o.insert(p,Me.newInvalidDocument(p)))});let c=Ys();return o.forEach((l,h)=>{const p=i.get(l);p!==void 0&&ii(p.mutation,h,ut.empty(),Oe.now()),Bi(t,h)&&(c=c.insert(l,h))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tA{constructor(e){this.serializer=e,this.dr=new Map,this.Ar=new Map}getBundleMetadata(e,t){return D.resolve(this.dr.get(t))}saveBundleMetadata(e,t){return this.dr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:ct(s.createTime)}}(t)),D.resolve()}getNamedQuery(e,t){return D.resolve(this.Ar.get(t))}saveNamedQuery(e,t){return this.Ar.set(t.name,function(s){return{name:s.name,query:zg(s.bundledQuery),readTime:ct(s.readTime)}}(t)),D.resolve()}}/**
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
 */class nA{constructor(){this.overlays=new xe(J.comparator),this.Rr=new Map}getOverlay(e,t){return D.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Ot();return D.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.Et(e,t,i)}),D.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Rr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Rr.delete(r)),D.resolve()}getOverlaysForCollection(e,t,r){const s=Ot(),i=t.length+1,o=new J(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const l=c.getNext().value,h=l.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&l.largestBatchId>r&&s.set(l.getKey(),l)}return D.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new xe((h,p)=>h-p);const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let p=i.get(h.largestBatchId);p===null&&(p=Ot(),i=i.insert(h.largestBatchId,p)),p.set(h.getKey(),h)}}const c=Ot(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((h,p)=>c.set(h,p)),!(c.size()>=s)););return D.resolve(c)}Et(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Rr.get(s.largestBatchId).delete(r.key);this.Rr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new mu(t,r));let i=this.Rr.get(t);i===void 0&&(i=pe(),this.Rr.set(t,i)),this.Rr.set(t,i.add(r.key))}}/**
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
 */class rA{constructor(){this.sessionToken=$e.EMPTY_BYTE_STRING}getSessionToken(e){return D.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,D.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bu{constructor(){this.Vr=new Ee(Ge.mr),this.gr=new Ee(Ge.pr)}isEmpty(){return this.Vr.isEmpty()}addReference(e,t){const r=new Ge(e,t);this.Vr=this.Vr.add(r),this.gr=this.gr.add(r)}yr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.wr(new Ge(e,t))}Sr(e,t){e.forEach(r=>this.removeReference(r,t))}br(e){const t=new J(new we([])),r=new Ge(t,e),s=new Ge(t,e+1),i=[];return this.gr.forEachInRange([r,s],o=>{this.wr(o),i.push(o.key)}),i}Dr(){this.Vr.forEach(e=>this.wr(e))}wr(e){this.Vr=this.Vr.delete(e),this.gr=this.gr.delete(e)}vr(e){const t=new J(new we([])),r=new Ge(t,e),s=new Ge(t,e+1);let i=pe();return this.gr.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(e){const t=new Ge(e,0),r=this.Vr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Ge{constructor(e,t){this.key=e,this.Cr=t}static mr(e,t){return J.comparator(e.key,t.key)||ue(e.Cr,t.Cr)}static pr(e,t){return ue(e.Cr,t.Cr)||J.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sA{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Fr=1,this.Mr=new Ee(Ge.mr)}checkEmpty(e){return D.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Fr;this.Fr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new fu(i,t,r,s);this.mutationQueue.push(o);for(const c of s)this.Mr=this.Mr.add(new Ge(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return D.resolve(o)}lookupMutationBatch(e,t){return D.resolve(this.Or(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Nr(r),i=s<0?0:s;return D.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return D.resolve(this.mutationQueue.length===0?or:this.Fr-1)}getAllMutationBatches(e){return D.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Ge(t,0),s=new Ge(t,Number.POSITIVE_INFINITY),i=[];return this.Mr.forEachInRange([r,s],o=>{const c=this.Or(o.Cr);i.push(c)}),D.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Ee(ue);return t.forEach(s=>{const i=new Ge(s,0),o=new Ge(s,Number.POSITIVE_INFINITY);this.Mr.forEachInRange([i,o],c=>{r=r.add(c.Cr)})}),D.resolve(this.Br(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;J.isDocumentKey(i)||(i=i.child(""));const o=new Ge(new J(i),0);let c=new Ee(ue);return this.Mr.forEachWhile(l=>{const h=l.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(c=c.add(l.Cr)),!0)},o),D.resolve(this.Br(c))}Br(e){const t=[];return e.forEach(r=>{const s=this.Or(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){te(this.Lr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.Mr;return D.forEach(t.mutations,s=>{const i=new Ge(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Mr=r})}qn(e){}containsKey(e,t){const r=new Ge(t,0),s=this.Mr.firstAfterOrEqual(r);return D.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,D.resolve()}Lr(e,t){return this.Nr(e)}Nr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Or(e){const t=this.Nr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iA{constructor(e){this.kr=e,this.docs=function(){return new xe(J.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,o=this.kr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return D.resolve(r?r.document.mutableCopy():Me.newInvalidDocument(t))}getEntries(e,t){let r=vt();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Me.newInvalidDocument(s))}),D.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=vt();const o=t.path,c=new J(o.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:h,value:{document:p}}=l.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||nu(Mm(p),r)<=0||(s.has(p.key)||Bi(t,p))&&(i=i.insert(p.key,p.mutableCopy()))}return D.resolve(i)}getAllFromCollectionGroup(e,t,r,s){ee()}qr(e,t){return D.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new oA(this)}getSize(e){return D.resolve(this.size)}}class oA extends e_{constructor(e){super(),this.Ir=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.Ir.addEntry(e,s)):this.Ir.removeEntry(r)}),D.waitFor(t)}getFromCache(e,t){return this.Ir.getEntry(e,t)}getAllFromCache(e,t){return this.Ir.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aA{constructor(e){this.persistence=e,this.Qr=new sn(t=>pr(t),Fi),this.lastRemoteSnapshotVersion=se.min(),this.highestTargetId=0,this.$r=0,this.Ur=new bu,this.targetCount=0,this.Kr=_r.Un()}forEachTarget(e,t){return this.Qr.forEach((r,s)=>t(s)),D.resolve()}getLastRemoteSnapshotVersion(e){return D.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return D.resolve(this.$r)}allocateTargetId(e){return this.highestTargetId=this.Kr.next(),D.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.$r&&(this.$r=t),D.resolve()}zn(e){this.Qr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.Kr=new _r(t),this.highestTargetId=t),e.sequenceNumber>this.$r&&(this.$r=e.sequenceNumber)}addTargetData(e,t){return this.zn(t),this.targetCount+=1,D.resolve()}updateTargetData(e,t){return this.zn(t),D.resolve()}removeTargetData(e,t){return this.Qr.delete(t.target),this.Ur.br(t.targetId),this.targetCount-=1,D.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.Qr.forEach((o,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.Qr.delete(o),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)}),D.waitFor(i).next(()=>s)}getTargetCount(e){return D.resolve(this.targetCount)}getTargetData(e,t){const r=this.Qr.get(t)||null;return D.resolve(r)}addMatchingKeys(e,t,r){return this.Ur.yr(t,r),D.resolve()}removeMatchingKeys(e,t,r){this.Ur.Sr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),D.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Ur.br(t),D.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Ur.vr(t);return D.resolve(r)}containsKey(e,t){return D.resolve(this.Ur.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wu{constructor(e,t){this.Wr={},this.overlays={},this.Gr=new At(0),this.zr=!1,this.zr=!0,this.jr=new rA,this.referenceDelegate=e(this),this.Hr=new aA(this),this.indexManager=new HT,this.remoteDocumentCache=function(s){return new iA(s)}(r=>this.referenceDelegate.Jr(r)),this.serializer=new qg(t),this.Yr=new tA(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.zr=!1,Promise.resolve()}get started(){return this.zr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new nA,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.Wr[e.toKey()];return r||(r=new sA(t,this.referenceDelegate),this.Wr[e.toKey()]=r),r}getGlobalsCache(){return this.jr}getTargetCache(){return this.Hr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Yr}runTransaction(e,t,r){H("MemoryPersistence","Starting transaction:",e);const s=new cA(this.Gr.next());return this.referenceDelegate.Zr(),r(s).next(i=>this.referenceDelegate.Xr(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}ei(e,t){return D.or(Object.values(this.Wr).map(r=>()=>r.containsKey(e,t)))}}class cA extends Um{constructor(e){super(),this.currentSequenceNumber=e}}class Ja{constructor(e){this.persistence=e,this.ti=new bu,this.ni=null}static ri(e){return new Ja(e)}get ii(){if(this.ni)return this.ni;throw ee()}addReference(e,t,r){return this.ti.addReference(r,t),this.ii.delete(r.toString()),D.resolve()}removeReference(e,t,r){return this.ti.removeReference(r,t),this.ii.add(r.toString()),D.resolve()}markPotentiallyOrphaned(e,t){return this.ii.add(t.toString()),D.resolve()}removeTarget(e,t){this.ti.br(t.targetId).forEach(s=>this.ii.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.ii.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}Zr(){this.ni=new Set}Xr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return D.forEach(this.ii,r=>{const s=J.fromPath(r);return this.si(e,s).next(i=>{i||t.removeEntry(s,se.min())})}).next(()=>(this.ni=null,t.apply(e)))}updateLimboDocument(e,t){return this.si(e,t).next(r=>{r?this.ii.delete(t.toString()):this.ii.add(t.toString())})}Jr(e){return 0}si(e,t){return D.or([()=>D.resolve(this.ti.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.ei(e,t)])}}class ga{constructor(e,t){this.persistence=e,this.oi=new sn(r=>tt(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=Zg(this,t)}static ri(e,t){return new ga(e,t)}Zr(){}Xr(e){return D.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}nr(e){const t=this.sr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}sr(e){let t=0;return this.rr(e,r=>{t++}).next(()=>t)}rr(e,t){return D.forEach(this.oi,(r,s)=>this.ar(e,r,s).next(i=>i?D.resolve():t(s)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.qr(e,o=>this.ar(e,o,t).next(c=>{c||(r++,i.removeEntry(o,se.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.oi.set(t,e.currentSequenceNumber),D.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.oi.set(r,e.currentSequenceNumber),D.resolve()}removeReference(e,t,r){return this.oi.set(r,e.currentSequenceNumber),D.resolve()}updateLimboDocument(e,t){return this.oi.set(t,e.currentSequenceNumber),D.resolve()}Jr(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Fo(e.data.value)),t}ar(e,t,r){return D.or([()=>this.persistence.ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.oi.get(t);return D.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lA{constructor(e){this.serializer=e}B(e,t,r,s){const i=new La("createOrUpgrade",t);r<1&&s>=1&&(function(l){l.createObjectStore(Mi)}(e),function(l){l.createObjectStore(vi,{keyPath:EE}),l.createObjectStore(Ct,{keyPath:Kh,autoIncrement:!0}).createIndex(nr,Wh,{unique:!0}),l.createObjectStore(ns)}(e),Mf(e),function(l){l.createObjectStore(Qn)}(e));let o=D.resolve();return r<3&&s>=3&&(r!==0&&(function(l){l.deleteObjectStore(ss),l.deleteObjectStore(rs),l.deleteObjectStore(ar)}(e),Mf(e)),o=o.next(()=>function(l){const h=l.store(ar),p={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:se.min().toTimestamp(),targetCount:0};return h.put(sa,p)}(i))),r<4&&s>=4&&(r!==0&&(o=o.next(()=>function(l,h){return h.store(Ct).G().next(m=>{l.deleteObjectStore(Ct),l.createObjectStore(Ct,{keyPath:Kh,autoIncrement:!0}).createIndex(nr,Wh,{unique:!0});const g=h.store(Ct),E=m.map(S=>g.put(S));return D.waitFor(E)})}(e,i))),o=o.next(()=>{(function(l){l.createObjectStore(is,{keyPath:NE})})(e)})),r<5&&s>=5&&(o=o.next(()=>this._i(i))),r<6&&s>=6&&(o=o.next(()=>(function(l){l.createObjectStore(yi)}(e),this.ai(i)))),r<7&&s>=7&&(o=o.next(()=>this.ui(i))),r<8&&s>=8&&(o=o.next(()=>this.ci(e,i))),r<9&&s>=9&&(o=o.next(()=>{(function(l){l.objectStoreNames.contains("remoteDocumentChanges")&&l.deleteObjectStore("remoteDocumentChanges")})(e)})),r<10&&s>=10&&(o=o.next(()=>this.li(i))),r<11&&s>=11&&(o=o.next(()=>{(function(l){l.createObjectStore(Fa,{keyPath:DE})})(e),function(l){l.createObjectStore(Ua,{keyPath:VE})}(e)})),r<12&&s>=12&&(o=o.next(()=>{(function(l){const h=l.createObjectStore(Ba,{keyPath:$E});h.createIndex(dl,qE,{unique:!1}),h.createIndex(Hm,jE,{unique:!1})})(e)})),r<13&&s>=13&&(o=o.next(()=>function(l){const h=l.createObjectStore(ra,{keyPath:AE});h.createIndex(Lo,SE),h.createIndex(qm,RE)}(e)).next(()=>this.hi(e,i)).next(()=>e.deleteObjectStore(Qn))),r<14&&s>=14&&(o=o.next(()=>this.Pi(e,i))),r<15&&s>=15&&(o=o.next(()=>function(l){l.createObjectStore(iu,{keyPath:OE,autoIncrement:!0}).createIndex(ul,LE,{unique:!1}),l.createObjectStore(ia,{keyPath:ME}).createIndex(zm,FE,{unique:!1}),l.createObjectStore(oa,{keyPath:UE}).createIndex(Gm,BE,{unique:!1})}(e))),r<16&&s>=16&&(o=o.next(()=>{t.objectStore(ia).clear()}).next(()=>{t.objectStore(oa).clear()})),r<17&&s>=17&&(o=o.next(()=>{(function(l){l.createObjectStore(ou,{keyPath:zE})})(e)})),o}ai(e){let t=0;return e.store(Qn).Z((r,s)=>{t+=ma(s)}).next(()=>{const r={byteSize:t};return e.store(yi).put(ll,r)})}_i(e){const t=e.store(vi),r=e.store(Ct);return t.G().next(s=>D.forEach(s,i=>{const o=IDBKeyRange.bound([i.userId,or],[i.userId,i.lastAcknowledgedBatchId]);return r.G(nr,o).next(c=>D.forEach(c,l=>{te(l.userId===i.userId);const h=Zn(this.serializer,l);return Wg(e,i.userId,h).next(()=>{})}))}))}ui(e){const t=e.store(ss),r=e.store(Qn);return e.store(ar).get(sa).next(s=>{const i=[];return r.Z((o,c)=>{const l=new we(o),h=function(m){return[0,tt(m)]}(l);i.push(t.get(h).next(p=>p?D.resolve():(m=>t.put({targetId:0,path:tt(m),sequenceNumber:s.highestListenSequenceNumber}))(l)))}).next(()=>D.waitFor(i))})}ci(e,t){e.createObjectStore(bi,{keyPath:xE});const r=t.store(bi),s=new yu,i=o=>{if(s.add(o)){const c=o.lastSegment(),l=o.popLast();return r.put({collectionId:c,parent:tt(l)})}};return t.store(Qn).Z({Y:!0},(o,c)=>{const l=new we(o);return i(l.popLast())}).next(()=>t.store(ns).Z({Y:!0},([o,c,l],h)=>{const p=Vt(c);return i(p.popLast())}))}li(e){const t=e.store(rs);return t.Z((r,s)=>{const i=Xs(s),o=jg(this.serializer,i);return t.put(o)})}hi(e,t){const r=t.store(Qn),s=[];return r.Z((i,o)=>{const c=t.store(ra),l=function(m){return m.document?new J(we.fromString(m.document.name).popFirst(5)):m.noDocument?J.fromSegments(m.noDocument.path):m.unknownDocument?J.fromSegments(m.unknownDocument.path):ee()}(o).path.toArray(),h={prefixPath:l.slice(0,l.length-2),collectionGroup:l[l.length-2],documentId:l[l.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};s.push(c.put(h))}).next(()=>D.waitFor(s))}Pi(e,t){const r=t.store(Ct),s=t_(this.serializer),i=new wu(Ja.ri,this.serializer.Tt);return r.G().next(o=>{const c=new Map;return o.forEach(l=>{var h;let p=(h=c.get(l.userId))!==null&&h!==void 0?h:pe();Zn(this.serializer,l).keys().forEach(m=>p=p.add(m)),c.set(l.userId,p)}),D.forEach(c,(l,h)=>{const p=new ot(h),m=Qa.It(this.serializer,p),g=i.getIndexManager(p),E=Ya.It(p,this.serializer,g,i.referenceDelegate);return new n_(s,E,m,g).recalculateAndSaveOverlaysForDocumentKeys(new hl(t,At.ae),l).next()})})}}function Mf(n){n.createObjectStore(ss,{keyPath:kE}).createIndex(su,PE,{unique:!0}),n.createObjectStore(rs,{keyPath:"targetId"}).createIndex(jm,CE,{unique:!0}),n.createObjectStore(ar)}const pn="IndexedDbPersistence",Uc=18e5,Bc=5e3,$c="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",uA="main";class Iu{constructor(e,t,r,s,i,o,c,l,h,p,m=17){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.Ti=i,this.window=o,this.document=c,this.Ii=h,this.Ei=p,this.di=m,this.Gr=null,this.zr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Ai=null,this.inForeground=!1,this.Ri=null,this.Vi=null,this.mi=Number.NEGATIVE_INFINITY,this.fi=g=>Promise.resolve(),!Iu.D())throw new W(U.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new JT(this,s),this.gi=t+uA,this.serializer=new qg(l),this.pi=new Sn(this.gi,this.di,new lA(this.serializer)),this.jr=new BT,this.Hr=new WT(this.referenceDelegate,this.serializer),this.remoteDocumentCache=t_(this.serializer),this.Yr=new UT,this.window&&this.window.localStorage?this.yi=this.window.localStorage:(this.yi=null,p===!1&&at(pn,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.wi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new W(U.FAILED_PRECONDITION,$c);return this.Si(),this.bi(),this.Di(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Hr.getHighestSequenceNumber(e))}).then(e=>{this.Gr=new At(e,this.Ii)}).then(()=>{this.zr=!0}).catch(e=>(this.pi&&this.pi.close(),Promise.reject(e)))}Ci(e){return this.fi=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.pi.k(async t=>{t.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Ti.enqueueAndForget(async()=>{this.started&&await this.wi()}))}wi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>vo(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.Fi(e).next(t=>{t||(this.isPrimary=!1,this.Ti.enqueueRetryable(()=>this.fi(!1)))})}).next(()=>this.Mi(e)).next(t=>this.isPrimary&&!t?this.xi(e).next(()=>!1):!!t&&this.Oi(e).next(()=>!0))).catch(e=>{if(On(e))return H(pn,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return H(pn,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Ti.enqueueRetryable(()=>this.fi(e)),this.isPrimary=e})}Fi(e){return Gs(e).get(Nr).next(t=>D.resolve(this.Ni(t)))}Bi(e){return vo(e).delete(this.clientId)}async Li(){if(this.isPrimary&&!this.ki(this.mi,Uc)){this.mi=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{const r=ze(t,is);return r.G().next(s=>{const i=this.qi(s,Uc),o=s.filter(c=>i.indexOf(c)===-1);return D.forEach(o,c=>r.delete(c.clientId)).next(()=>o)})}).catch(()=>[]);if(this.yi)for(const t of e)this.yi.removeItem(this.Qi(t.clientId))}}Di(){this.Vi=this.Ti.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.wi().then(()=>this.Li()).then(()=>this.Di()))}Ni(e){return!!e&&e.ownerId===this.clientId}Mi(e){return this.Ei?D.resolve(!0):Gs(e).get(Nr).next(t=>{if(t!==null&&this.ki(t.leaseTimestampMs,Bc)&&!this.$i(t.ownerId)){if(this.Ni(t)&&this.networkEnabled)return!0;if(!this.Ni(t)){if(!t.allowTabSynchronization)throw new W(U.FAILED_PRECONDITION,$c);return!1}}return!(!this.networkEnabled||!this.inForeground)||vo(e).G().next(r=>this.qi(r,Bc).find(s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,o=!this.inForeground&&s.inForeground,c=this.networkEnabled===s.networkEnabled;if(i||o&&c)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&H(pn,`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.zr=!1,this.Ui(),this.Vi&&(this.Vi.cancel(),this.Vi=null),this.Ki(),this.Wi(),await this.pi.runTransaction("shutdown","readwrite",[Mi,is],e=>{const t=new hl(e,At.ae);return this.xi(t).next(()=>this.Bi(t))}),this.pi.close(),this.Gi()}qi(e,t){return e.filter(r=>this.ki(r.updateTimeMs,t)&&!this.$i(r.clientId))}zi(){return this.runTransaction("getActiveClients","readonly",e=>vo(e).G().next(t=>this.qi(t,Uc).map(r=>r.clientId)))}get started(){return this.zr}getGlobalsCache(){return this.jr}getMutationQueue(e,t){return Ya.It(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Hr}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new KT(e,this.serializer.Tt.databaseId)}getDocumentOverlayCache(e){return Qa.It(this.serializer,e)}getBundleCache(){return this.Yr}runTransaction(e,t,r){H(pn,"Starting transaction:",e);const s=t==="readonly"?"readonly":"readwrite",i=function(l){return l===17?KE:l===16?HE:l===15?au:l===14?Qm:l===13?Wm:l===12?GE:l===11?Km:void ee()}(this.di);let o;return this.pi.runTransaction(e,s,i,c=>(o=new hl(c,this.Gr?this.Gr.next():At.ae),t==="readwrite-primary"?this.Fi(o).next(l=>!!l||this.Mi(o)).next(l=>{if(!l)throw at(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Ti.enqueueRetryable(()=>this.fi(!1)),new W(U.FAILED_PRECONDITION,Fm);return r(o)}).next(l=>this.Oi(o).next(()=>l)):this.ji(o).next(()=>r(o)))).then(c=>(o.raiseOnCommittedEvent(),c))}ji(e){return Gs(e).get(Nr).next(t=>{if(t!==null&&this.ki(t.leaseTimestampMs,Bc)&&!this.$i(t.ownerId)&&!this.Ni(t)&&!(this.Ei||this.allowTabSynchronization&&t.allowTabSynchronization))throw new W(U.FAILED_PRECONDITION,$c)})}Oi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Gs(e).put(Nr,t)}static D(){return Sn.D()}xi(e){const t=Gs(e);return t.get(Nr).next(r=>this.Ni(r)?(H(pn,"Releasing primary lease."),t.delete(Nr)):D.resolve())}ki(e,t){const r=Date.now();return!(e<r-t)&&(!(e>r)||(at(`Detected an update time that is in the future: ${e} > ${r}`),!1))}Si(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ri=()=>{this.Ti.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.wi()))},this.document.addEventListener("visibilitychange",this.Ri),this.inForeground=this.document.visibilityState==="visible")}Ki(){this.Ri&&(this.document.removeEventListener("visibilitychange",this.Ri),this.Ri=null)}bi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Ai=()=>{this.Ui();const t=/(?:Version|Mobile)\/1[456]/;$p()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.Ti.enterRestrictedMode(!0),this.Ti.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Ai))}Wi(){this.Ai&&(this.window.removeEventListener("pagehide",this.Ai),this.Ai=null)}$i(e){var t;try{const r=((t=this.yi)===null||t===void 0?void 0:t.getItem(this.Qi(e)))!==null;return H(pn,`Client '${e}' ${r?"is":"is not"} zombied in LocalStorage`),r}catch(r){return at(pn,"Failed to get zombied client id.",r),!1}}Ui(){if(this.yi)try{this.yi.setItem(this.Qi(this.clientId),String(Date.now()))}catch(e){at("Failed to set zombie client id.",e)}}Gi(){if(this.yi)try{this.yi.removeItem(this.Qi(this.clientId))}catch{}}Qi(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Gs(n){return ze(n,Mi)}function vo(n){return ze(n,is)}function dA(n,e){let t=n.projectId;return n.isDefaultDatabase||(t+="."+n.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eu{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Hi=r,this.Ji=s}static Yi(e,t){let r=pe(),s=pe();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Eu(e,t.fromCache,r,s)}}/**
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
 */class hA{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r_{constructor(){this.Zi=!1,this.Xi=!1,this.es=100,this.ts=function(){return $p()?8:Bm(je())>0?6:4}()}initialize(e,t){this.ns=e,this.indexManager=t,this.Zi=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.rs(e,t).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.ss(e,t,s,r).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new hA;return this._s(e,t,o).next(c=>{if(i.result=c,this.Xi)return this.us(e,t,o,c.size)})}).next(()=>i.result)}us(e,t,r,s){return r.documentReadCount<this.es?(Fr()<=me.DEBUG&&H("QueryEngine","SDK will not create cache indexes for query:",Ur(t),"since it only creates cache indexes for collection contains","more than or equal to",this.es,"documents"),D.resolve()):(Fr()<=me.DEBUG&&H("QueryEngine","Query:",Ur(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.ts*s?(Fr()<=me.DEBUG&&H("QueryEngine","The SDK decides to create cache indexes for query:",Ur(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,St(t))):D.resolve())}rs(e,t){if(cf(t))return D.resolve(null);let r=St(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=ua(t,null,"F"),r=St(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const o=pe(...i);return this.ns.getDocuments(e,o).next(c=>this.indexManager.getMinOffset(e,r).next(l=>{const h=this.cs(t,c);return this.ls(t,h,o,l.readTime)?this.rs(e,ua(t,null,"F")):this.hs(e,h,t,l)}))})))}ss(e,t,r,s){return cf(t)||s.isEqual(se.min())?D.resolve(null):this.ns.getDocuments(e,r).next(i=>{const o=this.cs(t,i);return this.ls(t,o,r,s)?D.resolve(null):(Fr()<=me.DEBUG&&H("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Ur(t)),this.hs(e,o,t,gE(s,mi)).next(c=>c))})}cs(e,t){let r=new Ee(pg(e));return t.forEach((s,i)=>{Bi(e,i)&&(r=r.add(i))}),r}ls(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}_s(e,t,r){return Fr()<=me.DEBUG&&H("QueryEngine","Using full collection scan to execute query:",Ur(t)),this.ns.getDocumentsMatchingQuery(e,t,bt.min(),r)}hs(e,t,r,s){return this.ns.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tu="LocalStore",fA=3e8;class pA{constructor(e,t,r,s){this.persistence=e,this.Ps=t,this.serializer=s,this.Ts=new xe(ue),this.Is=new sn(i=>pr(i),Fi),this.Es=new Map,this.ds=e.getRemoteDocumentCache(),this.Hr=e.getTargetCache(),this.Yr=e.getBundleCache(),this.As(r)}As(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new n_(this.ds,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.ds.setIndexManager(this.indexManager),this.Ps.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ts))}}function s_(n,e,t,r){return new pA(n,e,t,r)}async function i_(n,e){const t=de(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.As(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const o=[],c=[];let l=pe();for(const h of s){o.push(h.batchId);for(const p of h.mutations)l=l.add(p.key)}for(const h of i){c.push(h.batchId);for(const p of h.mutations)l=l.add(p.key)}return t.localDocuments.getDocuments(r,l).next(h=>({Rs:h,removedBatchIds:o,addedBatchIds:c}))})})}function mA(n,e){const t=de(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.ds.newChangeBuffer({trackRemovals:!0});return function(c,l,h,p){const m=h.batch,g=m.keys();let E=D.resolve();return g.forEach(S=>{E=E.next(()=>p.getEntry(l,S)).next(k=>{const T=h.docVersions.get(S);te(T!==null),k.version.compareTo(T)<0&&(m.applyToRemoteDocument(k,h),k.isValidDocument()&&(k.setReadTime(h.commitVersion),p.addEntry(k)))})}),E.next(()=>c.mutationQueue.removeMutationBatch(l,m))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let l=pe();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(l=l.add(c.batch.mutations[h].key));return l}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function o_(n){const e=de(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Hr.getLastRemoteSnapshotVersion(t))}function gA(n,e){const t=de(n),r=e.snapshotVersion;let s=t.Ts;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=t.ds.newChangeBuffer({trackRemovals:!0});s=t.Ts;const c=[];e.targetChanges.forEach((p,m)=>{const g=s.get(m);if(!g)return;c.push(t.Hr.removeMatchingKeys(i,p.removedDocuments,m).next(()=>t.Hr.addMatchingKeys(i,p.addedDocuments,m)));let E=g.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(m)!==null?E=E.withResumeToken($e.EMPTY_BYTE_STRING,se.min()).withLastLimboFreeSnapshotVersion(se.min()):p.resumeToken.approximateByteSize()>0&&(E=E.withResumeToken(p.resumeToken,r)),s=s.insert(m,E),function(k,T,L){return k.resumeToken.approximateByteSize()===0||T.snapshotVersion.toMicroseconds()-k.snapshotVersion.toMicroseconds()>=fA?!0:L.addedDocuments.size+L.modifiedDocuments.size+L.removedDocuments.size>0}(g,E,p)&&c.push(t.Hr.updateTargetData(i,E))});let l=vt(),h=pe();if(e.documentUpdates.forEach(p=>{e.resolvedLimboDocuments.has(p)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,p))}),c.push(_A(i,o,e.documentUpdates).next(p=>{l=p.Vs,h=p.fs})),!r.isEqual(se.min())){const p=t.Hr.getLastRemoteSnapshotVersion(i).next(m=>t.Hr.setTargetsMetadata(i,i.currentSequenceNumber,r));c.push(p)}return D.waitFor(c).next(()=>o.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,l,h)).next(()=>l)}).then(i=>(t.Ts=s,i))}function _A(n,e,t){let r=pe(),s=pe();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let o=vt();return t.forEach((c,l)=>{const h=i.get(c);l.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),l.isNoDocument()&&l.version.isEqual(se.min())?(e.removeEntry(c,l.readTime),o=o.insert(c,l)):!h.isValidDocument()||l.version.compareTo(h.version)>0||l.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(l),o=o.insert(c,l)):H(Tu,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",l.version)}),{Vs:o,fs:s}})}function vA(n,e){const t=de(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=or),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function yA(n,e){const t=de(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.Hr.getTargetData(r,e).next(i=>i?(s=i,D.resolve(s)):t.Hr.allocateTargetId(r).next(o=>(s=new Yt(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.Hr.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.Ts.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Ts=t.Ts.insert(r.targetId,r),t.Is.set(e,r.targetId)),r})}async function Sl(n,e,t){const r=de(n),s=r.Ts.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!On(o))throw o;H(Tu,`Failed to update sequence numbers for target ${e}: ${o}`)}r.Ts=r.Ts.remove(e),r.Is.delete(s.target)}function Ff(n,e,t){const r=de(n);let s=se.min(),i=pe();return r.persistence.runTransaction("Execute query","readwrite",o=>function(l,h,p){const m=de(l),g=m.Is.get(p);return g!==void 0?D.resolve(m.Ts.get(g)):m.Hr.getTargetData(h,p)}(r,o,St(e)).next(c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.Hr.getMatchingKeysForTargetId(o,c.targetId).next(l=>{i=l})}).next(()=>r.Ps.getDocumentsMatchingQuery(o,e,t?s:se.min(),t?i:pe())).next(c=>(bA(r,cT(e),c),{documents:c,gs:i})))}function bA(n,e,t){let r=n.Es.get(e)||se.min();t.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.Es.set(e,r)}class Uf{constructor(){this.activeTargetIds=pT()}Ds(e){this.activeTargetIds=this.activeTargetIds.add(e)}vs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}bs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class a_{constructor(){this.ho=new Uf,this.Po={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.ho.Ds(e),this.Po[e]||"not-current"}updateQueryState(e,t,r){this.Po[e]=t}removeLocalQueryTarget(e){this.ho.vs(e)}isLocalQueryTarget(e){return this.ho.activeTargetIds.has(e)}clearQueryState(e){delete this.Po[e]}getAllActiveQueryTargets(){return this.ho.activeTargetIds}isActiveQueryTarget(e){return this.ho.activeTargetIds.has(e)}start(){return this.ho=new Uf,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wA{To(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bf="ConnectivityMonitor";class $f{constructor(){this.Io=()=>this.Eo(),this.Ao=()=>this.Ro(),this.Vo=[],this.mo()}To(e){this.Vo.push(e)}shutdown(){window.removeEventListener("online",this.Io),window.removeEventListener("offline",this.Ao)}mo(){window.addEventListener("online",this.Io),window.addEventListener("offline",this.Ao)}Eo(){H(Bf,"Network connectivity changed: AVAILABLE");for(const e of this.Vo)e(0)}Ro(){H(Bf,"Network connectivity changed: UNAVAILABLE");for(const e of this.Vo)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let yo=null;function Rl(){return yo===null?yo=function(){return 268435456+Math.round(2147483648*Math.random())}():yo++,"0x"+yo.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qc="RestConnection",IA={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class EA{get fo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.po=t+"://"+e.host,this.yo=`projects/${r}/databases/${s}`,this.wo=this.databaseId.database===aa?`project_id=${r}`:`project_id=${r}&database_id=${s}`}So(e,t,r,s,i){const o=Rl(),c=this.bo(e,t.toUriEncodedString());H(qc,`Sending RPC '${e}' ${o}:`,c,r);const l={"google-cloud-resource-prefix":this.yo,"x-goog-request-params":this.wo};return this.Do(l,s,i),this.vo(e,c,l,r).then(h=>(H(qc,`Received RPC '${e}' ${o}: `,h),h),h=>{throw pi(qc,`RPC '${e}' ${o} failed with error: `,h,"url: ",c,"request:",r),h})}Co(e,t,r,s,i,o){return this.So(e,t,r,s,i)}Do(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Ts}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}bo(e,t){const r=IA[e];return`${this.po}/v1/${t}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TA{constructor(e){this.Fo=e.Fo,this.Mo=e.Mo}xo(e){this.Oo=e}No(e){this.Bo=e}Lo(e){this.ko=e}onMessage(e){this.qo=e}close(){this.Mo()}send(e){this.Fo(e)}Qo(){this.Oo()}$o(){this.Bo()}Uo(e){this.ko(e)}Ko(e){this.qo(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Je="WebChannelConnection";class AA extends EA{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}vo(e,t,r,s){const i=Rl();return new Promise((o,c)=>{const l=new Pm;l.setWithCredentials(!0),l.listenOnce(xm.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case Do.NO_ERROR:const p=l.getResponseJson();H(Je,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(p)),o(p);break;case Do.TIMEOUT:H(Je,`RPC '${e}' ${i} timed out`),c(new W(U.DEADLINE_EXCEEDED,"Request time out"));break;case Do.HTTP_ERROR:const m=l.getStatus();if(H(Je,`RPC '${e}' ${i} failed with status:`,m,"response text:",l.getResponseText()),m>0){let g=l.getResponseJson();Array.isArray(g)&&(g=g[0]);const E=g?.error;if(E&&E.status&&E.message){const S=function(T){const L=T.toLowerCase().replace(/_/g,"-");return Object.values(U).indexOf(L)>=0?L:U.UNKNOWN}(E.status);c(new W(S,E.message))}else c(new W(U.UNKNOWN,"Server responded with status "+l.getStatus()))}else c(new W(U.UNAVAILABLE,"Connection failed."));break;default:ee()}}finally{H(Je,`RPC '${e}' ${i} completed.`)}});const h=JSON.stringify(s);H(Je,`RPC '${e}' ${i} sending request:`,s),l.send(t,"POST",h,r,15)})}Wo(e,t,r){const s=Rl(),i=[this.po,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=Vm(),c=Dm(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(l.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Do(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;const p=i.join("");H(Je,`Creating RPC '${e}' stream ${s}: ${p}`,l);const m=o.createWebChannel(p,l);let g=!1,E=!1;const S=new TA({Fo:T=>{E?H(Je,`Not sending because RPC '${e}' stream ${s} is closed:`,T):(g||(H(Je,`Opening RPC '${e}' stream ${s} transport.`),m.open(),g=!0),H(Je,`RPC '${e}' stream ${s} sending:`,T),m.send(T))},Mo:()=>m.close()}),k=(T,L,R)=>{T.listen(L,N=>{try{R(N)}catch(B){setTimeout(()=>{throw B},0)}})};return k(m,Qs.EventType.OPEN,()=>{E||(H(Je,`RPC '${e}' stream ${s} transport opened.`),S.Qo())}),k(m,Qs.EventType.CLOSE,()=>{E||(E=!0,H(Je,`RPC '${e}' stream ${s} transport closed`),S.Uo())}),k(m,Qs.EventType.ERROR,T=>{E||(E=!0,pi(Je,`RPC '${e}' stream ${s} transport errored:`,T),S.Uo(new W(U.UNAVAILABLE,"The operation could not be completed")))}),k(m,Qs.EventType.MESSAGE,T=>{var L;if(!E){const R=T.data[0];te(!!R);const N=R,B=N?.error||((L=N[0])===null||L===void 0?void 0:L.error);if(B){H(Je,`RPC '${e}' stream ${s} received error:`,B);const P=B.status;let F=function(w){const A=Be[w];if(A!==void 0)return Cg(A)}(P),I=B.message;F===void 0&&(F=U.INTERNAL,I="Unknown error status: "+P+" with message "+B.message),E=!0,S.Uo(new W(F,I)),m.close()}else H(Je,`RPC '${e}' stream ${s} received:`,R),S.Ko(R)}}),k(c,Nm.STAT_EVENT,T=>{T.stat===il.PROXY?H(Je,`RPC '${e}' stream ${s} detected buffering proxy`):T.stat===il.NOPROXY&&H(Je,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{S.$o()},0),S}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */function SA(){return typeof window<"u"?window:null}function qo(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xa(n){return new CT(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class c_{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Ti=e,this.timerId=t,this.Go=r,this.zo=s,this.jo=i,this.Ho=0,this.Jo=null,this.Yo=Date.now(),this.reset()}reset(){this.Ho=0}Zo(){this.Ho=this.jo}Xo(e){this.cancel();const t=Math.floor(this.Ho+this.e_()),r=Math.max(0,Date.now()-this.Yo),s=Math.max(0,t-r);s>0&&H("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ho} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Jo=this.Ti.enqueueAfterDelay(this.timerId,s,()=>(this.Yo=Date.now(),e())),this.Ho*=this.zo,this.Ho<this.Go&&(this.Ho=this.Go),this.Ho>this.jo&&(this.Ho=this.jo)}t_(){this.Jo!==null&&(this.Jo.skipDelay(),this.Jo=null)}cancel(){this.Jo!==null&&(this.Jo.cancel(),this.Jo=null)}e_(){return(Math.random()-.5)*this.Ho}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qf="PersistentStream";class l_{constructor(e,t,r,s,i,o,c,l){this.Ti=e,this.n_=r,this.r_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.i_=0,this.s_=null,this.o_=null,this.stream=null,this.__=0,this.a_=new c_(e,t)}u_(){return this.state===1||this.state===5||this.c_()}c_(){return this.state===2||this.state===3}start(){this.__=0,this.state!==4?this.auth():this.l_()}async stop(){this.u_()&&await this.close(0)}h_(){this.state=0,this.a_.reset()}P_(){this.c_()&&this.s_===null&&(this.s_=this.Ti.enqueueAfterDelay(this.n_,6e4,()=>this.T_()))}I_(e){this.E_(),this.stream.send(e)}async T_(){if(this.c_())return this.close(0)}E_(){this.s_&&(this.s_.cancel(),this.s_=null)}d_(){this.o_&&(this.o_.cancel(),this.o_=null)}async close(e,t){this.E_(),this.d_(),this.a_.cancel(),this.i_++,e!==4?this.a_.reset():t&&t.code===U.RESOURCE_EXHAUSTED?(at(t.toString()),at("Using maximum backoff delay to prevent overloading the backend."),this.a_.Zo()):t&&t.code===U.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.A_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Lo(t)}A_(){}auth(){this.state=1;const e=this.R_(this.i_),t=this.i_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.i_===t&&this.V_(r,s)},r=>{e(()=>{const s=new W(U.UNKNOWN,"Fetching auth token failed: "+r.message);return this.m_(s)})})}V_(e,t){const r=this.R_(this.i_);this.stream=this.f_(e,t),this.stream.xo(()=>{r(()=>this.listener.xo())}),this.stream.No(()=>{r(()=>(this.state=2,this.o_=this.Ti.enqueueAfterDelay(this.r_,1e4,()=>(this.c_()&&(this.state=3),Promise.resolve())),this.listener.No()))}),this.stream.Lo(s=>{r(()=>this.m_(s))}),this.stream.onMessage(s=>{r(()=>++this.__==1?this.g_(s):this.onNext(s))})}l_(){this.state=5,this.a_.Xo(async()=>{this.state=0,this.start()})}m_(e){return H(qf,`close with error: ${e}`),this.stream=null,this.close(4,e)}R_(e){return t=>{this.Ti.enqueueAndForget(()=>this.i_===e?t():(H(qf,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class RA extends l_{constructor(e,t,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}f_(e,t){return this.connection.Wo("Listen",e,t)}g_(e){return this.onNext(e)}onNext(e){this.a_.reset();const t=xT(this.serializer,e),r=function(i){if(!("targetChange"in i))return se.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?se.min():o.readTime?ct(o.readTime):se.min()}(e);return this.listener.p_(t,r)}y_(e){const t={};t.database=wl(this.serializer),t.addTarget=function(i,o){let c;const l=o.target;if(c=ca(l)?{documents:Lg(i,l)}:{query:Mg(i,l).ht},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=xg(i,o.resumeToken);const h=yl(i,o.expectedCount);h!==null&&(c.expectedCount=h)}else if(o.snapshotVersion.compareTo(se.min())>0){c.readTime=hs(i,o.snapshotVersion.toTimestamp());const h=yl(i,o.expectedCount);h!==null&&(c.expectedCount=h)}return c}(this.serializer,e);const r=DT(this.serializer,e);r&&(t.labels=r),this.I_(t)}w_(e){const t={};t.database=wl(this.serializer),t.removeTarget=e,this.I_(t)}}class CA extends l_{constructor(e,t,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}get S_(){return this.__>0}start(){this.lastStreamToken=void 0,super.start()}A_(){this.S_&&this.b_([])}f_(e,t){return this.connection.Wo("Write",e,t)}g_(e){return te(!!e.streamToken),this.lastStreamToken=e.streamToken,te(!e.writeResults||e.writeResults.length===0),this.listener.D_()}onNext(e){te(!!e.streamToken),this.lastStreamToken=e.streamToken,this.a_.reset();const t=NT(e.writeResults,e.commitTime),r=ct(e.commitTime);return this.listener.v_(r,t)}C_(){const e={};e.database=wl(this.serializer),this.I_(e)}b_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>ha(this.serializer,r))};this.I_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kA{}class PA extends kA{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.F_=!1}M_(){if(this.F_)throw new W(U.FAILED_PRECONDITION,"The client has already been terminated.")}So(e,t,r,s){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.So(e,bl(t,r),s,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===U.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new W(U.UNKNOWN,i.toString())})}Co(e,t,r,s,i){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.Co(e,bl(t,r),s,o,c,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===U.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new W(U.UNKNOWN,o.toString())})}terminate(){this.F_=!0,this.connection.terminate()}}class xA{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.x_=0,this.O_=null,this.N_=!0}B_(){this.x_===0&&(this.L_("Unknown"),this.O_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.O_=null,this.k_("Backend didn't respond within 10 seconds."),this.L_("Offline"),Promise.resolve())))}q_(e){this.state==="Online"?this.L_("Unknown"):(this.x_++,this.x_>=1&&(this.Q_(),this.k_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.L_("Offline")))}set(e){this.Q_(),this.x_=0,e==="Online"&&(this.N_=!1),this.L_(e)}L_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}k_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.N_?(at(t),this.N_=!1):H("OnlineStateTracker",t)}Q_(){this.O_!==null&&(this.O_.cancel(),this.O_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vr="RemoteStore";class NA{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.U_=[],this.K_=new Map,this.W_=new Set,this.G_=[],this.z_=i,this.z_.To(o=>{r.enqueueAndForget(async()=>{Tr(this)&&(H(vr,"Restarting streams for network reachability change."),await async function(l){const h=de(l);h.W_.add(4),await qi(h),h.j_.set("Unknown"),h.W_.delete(4),await Za(h)}(this))})}),this.j_=new xA(r,s)}}async function Za(n){if(Tr(n))for(const e of n.G_)await e(!0)}async function qi(n){for(const e of n.G_)await e(!1)}function u_(n,e){const t=de(n);t.K_.has(e.targetId)||(t.K_.set(e.targetId,e),Cu(t)?Ru(t):Ss(t).c_()&&Su(t,e))}function Au(n,e){const t=de(n),r=Ss(t);t.K_.delete(e),r.c_()&&d_(t,e),t.K_.size===0&&(r.c_()?r.P_():Tr(t)&&t.j_.set("Unknown"))}function Su(n,e){if(n.H_.Ne(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(se.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Ss(n).y_(e)}function d_(n,e){n.H_.Ne(e),Ss(n).w_(e)}function Ru(n){n.H_=new TT({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),lt:e=>n.K_.get(e)||null,it:()=>n.datastore.serializer.databaseId}),Ss(n).start(),n.j_.B_()}function Cu(n){return Tr(n)&&!Ss(n).u_()&&n.K_.size>0}function Tr(n){return de(n).W_.size===0}function h_(n){n.H_=void 0}async function DA(n){n.j_.set("Online")}async function VA(n){n.K_.forEach((e,t)=>{Su(n,e)})}async function OA(n,e){h_(n),Cu(n)?(n.j_.q_(e),Ru(n)):n.j_.set("Unknown")}async function LA(n,e,t){if(n.j_.set("Online"),e instanceof Pg&&e.state===2&&e.cause)try{await async function(s,i){const o=i.cause;for(const c of i.targetIds)s.K_.has(c)&&(await s.remoteSyncer.rejectListen(c,o),s.K_.delete(c),s.H_.removeTarget(c))}(n,e)}catch(r){H(vr,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await _a(n,r)}else if(e instanceof $o?n.H_.We(e):e instanceof kg?n.H_.Ze(e):n.H_.je(e),!t.isEqual(se.min()))try{const r=await o_(n.localStore);t.compareTo(r)>=0&&await function(i,o){const c=i.H_.ot(o);return c.targetChanges.forEach((l,h)=>{if(l.resumeToken.approximateByteSize()>0){const p=i.K_.get(h);p&&i.K_.set(h,p.withResumeToken(l.resumeToken,o))}}),c.targetMismatches.forEach((l,h)=>{const p=i.K_.get(l);if(!p)return;i.K_.set(l,p.withResumeToken($e.EMPTY_BYTE_STRING,p.snapshotVersion)),d_(i,l);const m=new Yt(p.target,l,h,p.sequenceNumber);Su(i,m)}),i.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){H(vr,"Failed to raise snapshot:",r),await _a(n,r)}}async function _a(n,e,t){if(!On(e))throw e;n.W_.add(1),await qi(n),n.j_.set("Offline"),t||(t=()=>o_(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{H(vr,"Retrying IndexedDB access"),await t(),n.W_.delete(1),await Za(n)})}function f_(n,e){return e().catch(t=>_a(n,t,e))}async function ji(n){const e=de(n),t=xn(e);let r=e.U_.length>0?e.U_[e.U_.length-1].batchId:or;for(;MA(e);)try{const s=await vA(e.localStore,r);if(s===null){e.U_.length===0&&t.P_();break}r=s.batchId,FA(e,s)}catch(s){await _a(e,s)}p_(e)&&m_(e)}function MA(n){return Tr(n)&&n.U_.length<10}function FA(n,e){n.U_.push(e);const t=xn(n);t.c_()&&t.S_&&t.b_(e.mutations)}function p_(n){return Tr(n)&&!xn(n).u_()&&n.U_.length>0}function m_(n){xn(n).start()}async function UA(n){xn(n).C_()}async function BA(n){const e=xn(n);for(const t of n.U_)e.b_(t.mutations)}async function $A(n,e,t){const r=n.U_.shift(),s=pu.from(r,e,t);await f_(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await ji(n)}async function qA(n,e){e&&xn(n).S_&&await async function(r,s){if(function(o){return IT(o)&&o!==U.ABORTED}(s.code)){const i=r.U_.shift();xn(r).h_(),await f_(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await ji(r)}}(n,e),p_(n)&&m_(n)}async function jf(n,e){const t=de(n);t.asyncQueue.verifyOperationInProgress(),H(vr,"RemoteStore received new credentials");const r=Tr(t);t.W_.add(3),await qi(t),r&&t.j_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.W_.delete(3),await Za(t)}async function jA(n,e){const t=de(n);e?(t.W_.delete(2),await Za(t)):e||(t.W_.add(2),await qi(t),t.j_.set("Unknown"))}function Ss(n){return n.J_||(n.J_=function(t,r,s){const i=de(t);return i.M_(),new RA(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{xo:DA.bind(null,n),No:VA.bind(null,n),Lo:OA.bind(null,n),p_:LA.bind(null,n)}),n.G_.push(async e=>{e?(n.J_.h_(),Cu(n)?Ru(n):n.j_.set("Unknown")):(await n.J_.stop(),h_(n))})),n.J_}function xn(n){return n.Y_||(n.Y_=function(t,r,s){const i=de(t);return i.M_(),new CA(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{xo:()=>Promise.resolve(),No:UA.bind(null,n),Lo:qA.bind(null,n),D_:BA.bind(null,n),v_:$A.bind(null,n)}),n.G_.push(async e=>{e?(n.Y_.h_(),await ji(n)):(await n.Y_.stop(),n.U_.length>0&&(H(vr,`Stopping write stream with ${n.U_.length} pending writes`),n.U_=[]))})),n.Y_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ku{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Ft,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const o=Date.now()+r,c=new ku(e,t,o,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new W(U.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Pu(n,e){if(at("AsyncQueue",`${e}: ${n}`),On(n))return new W(U.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yr{static emptySet(e){return new Yr(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||J.comparator(t.key,r.key):(t,r)=>J.comparator(t.key,r.key),this.keyedMap=Ys(),this.sortedSet=new xe(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Yr)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Yr;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zf{constructor(){this.Z_=new xe(J.comparator)}track(e){const t=e.doc.key,r=this.Z_.get(t);r?e.type!==0&&r.type===3?this.Z_=this.Z_.insert(t,e):e.type===3&&r.type!==1?this.Z_=this.Z_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.Z_=this.Z_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.Z_=this.Z_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.Z_=this.Z_.remove(t):e.type===1&&r.type===2?this.Z_=this.Z_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.Z_=this.Z_.insert(t,{type:2,doc:e.doc}):ee():this.Z_=this.Z_.insert(t,e)}X_(){const e=[];return this.Z_.inorderTraversal((t,r)=>{e.push(r)}),e}}class fs{constructor(e,t,r,s,i,o,c,l,h){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=h}static fromInitialDocuments(e,t,r,s,i){const o=[];return t.forEach(c=>{o.push({type:0,doc:c})}),new fs(e,t,Yr.emptySet(t),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&za(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zA{constructor(){this.ea=void 0,this.ta=[]}na(){return this.ta.some(e=>e.ra())}}class GA{constructor(){this.queries=Gf(),this.onlineState="Unknown",this.ia=new Set}terminate(){(function(t,r){const s=de(t),i=s.queries;s.queries=Gf(),i.forEach((o,c)=>{for(const l of c.ta)l.onError(r)})})(this,new W(U.ABORTED,"Firestore shutting down"))}}function Gf(){return new sn(n=>fg(n),za)}async function xu(n,e){const t=de(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.na()&&e.ra()&&(r=2):(i=new zA,r=e.ra()?0:1);try{switch(r){case 0:i.ea=await t.onListen(s,!0);break;case 1:i.ea=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const c=Pu(o,`Initialization of query '${Ur(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.ta.push(e),e.sa(t.onlineState),i.ea&&e.oa(i.ea)&&Du(t)}async function Nu(n,e){const t=de(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const o=i.ta.indexOf(e);o>=0&&(i.ta.splice(o,1),i.ta.length===0?s=e.ra()?0:1:!i.na()&&e.ra()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function HA(n,e){const t=de(n);let r=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const c of o.ta)c.oa(s)&&(r=!0);o.ea=s}}r&&Du(t)}function KA(n,e,t){const r=de(n),s=r.queries.get(e);if(s)for(const i of s.ta)i.onError(t);r.queries.delete(e)}function Du(n){n.ia.forEach(e=>{e.next()})}var Cl,Hf;(Hf=Cl||(Cl={}))._a="default",Hf.Cache="cache";class Vu{constructor(e,t,r){this.query=e,this.aa=t,this.ua=!1,this.ca=null,this.onlineState="Unknown",this.options=r||{}}oa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new fs(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.ua?this.la(e)&&(this.aa.next(e),t=!0):this.ha(e,this.onlineState)&&(this.Pa(e),t=!0),this.ca=e,t}onError(e){this.aa.error(e)}sa(e){this.onlineState=e;let t=!1;return this.ca&&!this.ua&&this.ha(this.ca,e)&&(this.Pa(this.ca),t=!0),t}ha(e,t){if(!e.fromCache||!this.ra())return!0;const r=t!=="Offline";return(!this.options.Ta||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}la(e){if(e.docChanges.length>0)return!0;const t=this.ca&&this.ca.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}Pa(e){e=fs.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.ua=!0,this.aa.next(e)}ra(){return this.options.source!==Cl.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g_{constructor(e){this.key=e}}class __{constructor(e){this.key=e}}class WA{constructor(e,t){this.query=e,this.fa=t,this.ga=null,this.hasCachedResults=!1,this.current=!1,this.pa=pe(),this.mutatedKeys=pe(),this.ya=pg(e),this.wa=new Yr(this.ya)}get Sa(){return this.fa}ba(e,t){const r=t?t.Da:new zf,s=t?t.wa:this.wa;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,c=!1;const l=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((p,m)=>{const g=s.get(p),E=Bi(this.query,m)?m:null,S=!!g&&this.mutatedKeys.has(g.key),k=!!E&&(E.hasLocalMutations||this.mutatedKeys.has(E.key)&&E.hasCommittedMutations);let T=!1;g&&E?g.data.isEqual(E.data)?S!==k&&(r.track({type:3,doc:E}),T=!0):this.va(g,E)||(r.track({type:2,doc:E}),T=!0,(l&&this.ya(E,l)>0||h&&this.ya(E,h)<0)&&(c=!0)):!g&&E?(r.track({type:0,doc:E}),T=!0):g&&!E&&(r.track({type:1,doc:g}),T=!0,(l||h)&&(c=!0)),T&&(E?(o=o.add(E),i=k?i.add(p):i.delete(p)):(o=o.delete(p),i=i.delete(p)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const p=this.query.limitType==="F"?o.last():o.first();o=o.delete(p.key),i=i.delete(p.key),r.track({type:1,doc:p})}return{wa:o,Da:r,ls:c,mutatedKeys:i}}va(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.wa;this.wa=e.wa,this.mutatedKeys=e.mutatedKeys;const o=e.Da.X_();o.sort((p,m)=>function(E,S){const k=T=>{switch(T){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return ee()}};return k(E)-k(S)}(p.type,m.type)||this.ya(p.doc,m.doc)),this.Ca(r),s=s!=null&&s;const c=t&&!s?this.Fa():[],l=this.pa.size===0&&this.current&&!s?1:0,h=l!==this.ga;return this.ga=l,o.length!==0||h?{snapshot:new fs(this.query,e.wa,i,o,e.mutatedKeys,l===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),Ma:c}:{Ma:c}}sa(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({wa:this.wa,Da:new zf,mutatedKeys:this.mutatedKeys,ls:!1},!1)):{Ma:[]}}xa(e){return!this.fa.has(e)&&!!this.wa.has(e)&&!this.wa.get(e).hasLocalMutations}Ca(e){e&&(e.addedDocuments.forEach(t=>this.fa=this.fa.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.fa=this.fa.delete(t)),this.current=e.current)}Fa(){if(!this.current)return[];const e=this.pa;this.pa=pe(),this.wa.forEach(r=>{this.xa(r.key)&&(this.pa=this.pa.add(r.key))});const t=[];return e.forEach(r=>{this.pa.has(r)||t.push(new __(r))}),this.pa.forEach(r=>{e.has(r)||t.push(new g_(r))}),t}Oa(e){this.fa=e.gs,this.pa=pe();const t=this.ba(e.documents);return this.applyChanges(t,!0)}Na(){return fs.fromInitialDocuments(this.query,this.wa,this.mutatedKeys,this.ga===0,this.hasCachedResults)}}const Ou="SyncEngine";class QA{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class YA{constructor(e){this.key=e,this.Ba=!1}}class JA{constructor(e,t,r,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.La={},this.ka=new sn(c=>fg(c),za),this.qa=new Map,this.Qa=new Set,this.$a=new xe(J.comparator),this.Ua=new Map,this.Ka=new bu,this.Wa={},this.Ga=new Map,this.za=_r.Kn(),this.onlineState="Unknown",this.ja=void 0}get isPrimaryClient(){return this.ja===!0}}async function XA(n,e,t=!0){const r=E_(n);let s;const i=r.ka.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Na()):s=await v_(r,e,t,!0),s}async function ZA(n,e){const t=E_(n);await v_(t,e,!0,!1)}async function v_(n,e,t,r){const s=await yA(n.localStore,St(e)),i=s.targetId,o=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await e0(n,e,i,o==="current",s.resumeToken)),n.isPrimaryClient&&t&&u_(n.remoteStore,s),c}async function e0(n,e,t,r,s){n.Ha=(m,g,E)=>async function(k,T,L,R){let N=T.view.ba(L);N.ls&&(N=await Ff(k.localStore,T.query,!1).then(({documents:I})=>T.view.ba(I,N)));const B=R&&R.targetChanges.get(T.targetId),P=R&&R.targetMismatches.get(T.targetId)!=null,F=T.view.applyChanges(N,k.isPrimaryClient,B,P);return Wf(k,T.targetId,F.Ma),F.snapshot}(n,m,g,E);const i=await Ff(n.localStore,e,!0),o=new WA(e,i.gs),c=o.ba(i.documents),l=$i.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),h=o.applyChanges(c,n.isPrimaryClient,l);Wf(n,t,h.Ma);const p=new QA(e,t,o);return n.ka.set(e,p),n.qa.has(t)?n.qa.get(t).push(e):n.qa.set(t,[e]),h.snapshot}async function t0(n,e,t){const r=de(n),s=r.ka.get(e),i=r.qa.get(s.targetId);if(i.length>1)return r.qa.set(s.targetId,i.filter(o=>!za(o,e))),void r.ka.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Sl(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&Au(r.remoteStore,s.targetId),kl(r,s.targetId)}).catch(Ir)):(kl(r,s.targetId),await Sl(r.localStore,s.targetId,!0))}async function n0(n,e){const t=de(n),r=t.ka.get(e),s=t.qa.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Au(t.remoteStore,r.targetId))}async function r0(n,e,t){const r=T_(n);try{const s=await function(o,c){const l=de(o),h=Oe.now(),p=c.reduce((E,S)=>E.add(S.key),pe());let m,g;return l.persistence.runTransaction("Locally write mutations","readwrite",E=>{let S=vt(),k=pe();return l.ds.getEntries(E,p).next(T=>{S=T,S.forEach((L,R)=>{R.isValidDocument()||(k=k.add(L))})}).next(()=>l.localDocuments.getOverlayedDocuments(E,S)).next(T=>{m=T;const L=[];for(const R of c){const N=bT(R,m.get(R.key).overlayedDocument);N!=null&&L.push(new on(R.key,N,ig(N.value.mapValue),et.exists(!0)))}return l.mutationQueue.addMutationBatch(E,h,L,c)}).next(T=>{g=T;const L=T.applyToLocalDocumentSet(m,k);return l.documentOverlayCache.saveOverlays(E,T.batchId,L)})}).then(()=>({batchId:g.batchId,changes:gg(m)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(o,c,l){let h=o.Wa[o.currentUser.toKey()];h||(h=new xe(ue)),h=h.insert(c,l),o.Wa[o.currentUser.toKey()]=h}(r,s.batchId,t),await zi(r,s.changes),await ji(r.remoteStore)}catch(s){const i=Pu(s,"Failed to persist write");t.reject(i)}}async function y_(n,e){const t=de(n);try{const r=await gA(t.localStore,e);e.targetChanges.forEach((s,i)=>{const o=t.Ua.get(i);o&&(te(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.Ba=!0:s.modifiedDocuments.size>0?te(o.Ba):s.removedDocuments.size>0&&(te(o.Ba),o.Ba=!1))}),await zi(t,r,e)}catch(r){await Ir(r)}}function Kf(n,e,t){const r=de(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.ka.forEach((i,o)=>{const c=o.view.sa(e);c.snapshot&&s.push(c.snapshot)}),function(o,c){const l=de(o);l.onlineState=c;let h=!1;l.queries.forEach((p,m)=>{for(const g of m.ta)g.sa(c)&&(h=!0)}),h&&Du(l)}(r.eventManager,e),s.length&&r.La.p_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function s0(n,e,t){const r=de(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Ua.get(e),i=s&&s.key;if(i){let o=new xe(J.comparator);o=o.insert(i,Me.newNoDocument(i,se.min()));const c=pe().add(i),l=new Wa(se.min(),new Map,new xe(ue),o,c);await y_(r,l),r.$a=r.$a.remove(i),r.Ua.delete(e),Lu(r)}else await Sl(r.localStore,e,!1).then(()=>kl(r,e,t)).catch(Ir)}async function i0(n,e){const t=de(n),r=e.batch.batchId;try{const s=await mA(t.localStore,e);w_(t,r,null),b_(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await zi(t,s)}catch(s){await Ir(s)}}async function o0(n,e,t){const r=de(n);try{const s=await function(o,c){const l=de(o);return l.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let p;return l.mutationQueue.lookupMutationBatch(h,c).next(m=>(te(m!==null),p=m.keys(),l.mutationQueue.removeMutationBatch(h,m))).next(()=>l.mutationQueue.performConsistencyCheck(h)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(h,p,c)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,p)).next(()=>l.localDocuments.getDocuments(h,p))})}(r.localStore,e);w_(r,e,t),b_(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await zi(r,s)}catch(s){await Ir(s)}}function b_(n,e){(n.Ga.get(e)||[]).forEach(t=>{t.resolve()}),n.Ga.delete(e)}function w_(n,e,t){const r=de(n);let s=r.Wa[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Wa[r.currentUser.toKey()]=s}}function kl(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.qa.get(e))n.ka.delete(r),t&&n.La.Ja(r,t);n.qa.delete(e),n.isPrimaryClient&&n.Ka.br(e).forEach(r=>{n.Ka.containsKey(r)||I_(n,r)})}function I_(n,e){n.Qa.delete(e.path.canonicalString());const t=n.$a.get(e);t!==null&&(Au(n.remoteStore,t),n.$a=n.$a.remove(e),n.Ua.delete(t),Lu(n))}function Wf(n,e,t){for(const r of t)r instanceof g_?(n.Ka.addReference(r.key,e),a0(n,r)):r instanceof __?(H(Ou,"Document no longer in limbo: "+r.key),n.Ka.removeReference(r.key,e),n.Ka.containsKey(r.key)||I_(n,r.key)):ee()}function a0(n,e){const t=e.key,r=t.path.canonicalString();n.$a.get(t)||n.Qa.has(r)||(H(Ou,"New document in limbo: "+t),n.Qa.add(r),Lu(n))}function Lu(n){for(;n.Qa.size>0&&n.$a.size<n.maxConcurrentLimboResolutions;){const e=n.Qa.values().next().value;n.Qa.delete(e);const t=new J(we.fromString(e)),r=n.za.next();n.Ua.set(r,new YA(t)),n.$a=n.$a.insert(t,r),u_(n.remoteStore,new Yt(St(Ui(t.path)),r,"TargetPurposeLimboResolution",At.ae))}}async function zi(n,e,t){const r=de(n),s=[],i=[],o=[];r.ka.isEmpty()||(r.ka.forEach((c,l)=>{o.push(r.Ha(l,e,t).then(h=>{var p;if((h||t)&&r.isPrimaryClient){const m=h?!h.fromCache:(p=t?.targetChanges.get(l.targetId))===null||p===void 0?void 0:p.current;r.sharedClientState.updateQueryState(l.targetId,m?"current":"not-current")}if(h){s.push(h);const m=Eu.Yi(l.targetId,h);i.push(m)}}))}),await Promise.all(o),r.La.p_(s),await async function(l,h){const p=de(l);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>D.forEach(h,g=>D.forEach(g.Hi,E=>p.persistence.referenceDelegate.addReference(m,g.targetId,E)).next(()=>D.forEach(g.Ji,E=>p.persistence.referenceDelegate.removeReference(m,g.targetId,E)))))}catch(m){if(!On(m))throw m;H(Tu,"Failed to update sequence numbers: "+m)}for(const m of h){const g=m.targetId;if(!m.fromCache){const E=p.Ts.get(g),S=E.snapshotVersion,k=E.withLastLimboFreeSnapshotVersion(S);p.Ts=p.Ts.insert(g,k)}}}(r.localStore,i))}async function c0(n,e){const t=de(n);if(!t.currentUser.isEqual(e)){H(Ou,"User change. New user:",e.toKey());const r=await i_(t.localStore,e);t.currentUser=e,function(i,o){i.Ga.forEach(c=>{c.forEach(l=>{l.reject(new W(U.CANCELLED,o))})}),i.Ga.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await zi(t,r.Rs)}}function l0(n,e){const t=de(n),r=t.Ua.get(e);if(r&&r.Ba)return pe().add(r.key);{let s=pe();const i=t.qa.get(e);if(!i)return s;for(const o of i){const c=t.ka.get(o);s=s.unionWith(c.view.Sa)}return s}}function E_(n){const e=de(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=y_.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=l0.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=s0.bind(null,e),e.La.p_=HA.bind(null,e.eventManager),e.La.Ja=KA.bind(null,e.eventManager),e}function T_(n){const e=de(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=i0.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=o0.bind(null,e),e}class Si{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Xa(e.databaseInfo.databaseId),this.sharedClientState=this.Za(e),this.persistence=this.Xa(e),await this.persistence.start(),this.localStore=this.eu(e),this.gcScheduler=this.tu(e,this.localStore),this.indexBackfillerScheduler=this.nu(e,this.localStore)}tu(e,t){return null}nu(e,t){return null}eu(e){return s_(this.persistence,new r_,e.initialUser,this.serializer)}Xa(e){return new wu(Ja.ri,this.serializer)}Za(e){return new a_}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Si.provider={build:()=>new Si};class u0 extends Si{constructor(e){super(),this.cacheSizeBytes=e}tu(e,t){te(this.persistence.referenceDelegate instanceof ga);const r=this.persistence.referenceDelegate.garbageCollector;return new Xg(r,e.asyncQueue,t)}Xa(e){const t=this.cacheSizeBytes!==void 0?Xe.withCacheSize(this.cacheSizeBytes):Xe.DEFAULT;return new wu(r=>ga.ri(r,t),this.serializer)}}class d0 extends Si{constructor(e,t,r){super(),this.ru=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.ru.initialize(this,e),await T_(this.ru.syncEngine),await ji(this.ru.remoteStore),await this.persistence.Ci(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}eu(e){return s_(this.persistence,new r_,e.initialUser,this.serializer)}tu(e,t){const r=this.persistence.referenceDelegate.garbageCollector;return new Xg(r,e.asyncQueue,t)}nu(e,t){const r=new bE(t,this.persistence);return new yE(e.asyncQueue,r)}Xa(e){const t=dA(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?Xe.withCacheSize(this.cacheSizeBytes):Xe.DEFAULT;return new Iu(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,SA(),qo(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Za(e){return new a_}}class va{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Kf(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=c0.bind(null,this.syncEngine),await jA(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new GA}()}createDatastore(e){const t=Xa(e.databaseInfo.databaseId),r=function(i){return new AA(i)}(e.databaseInfo);return function(i,o,c,l){return new PA(i,o,c,l)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,o,c){return new NA(r,s,i,o,c)}(this.localStore,this.datastore,e.asyncQueue,t=>Kf(this.syncEngine,t,0),function(){return $f.D()?new $f:new wA}())}createSyncEngine(e,t){return function(s,i,o,c,l,h,p){const m=new JA(s,i,o,c,l,h);return p&&(m.ja=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=de(s);H(vr,"RemoteStore shutting down."),i.W_.add(5),await qi(i),i.z_.shutdown(),i.j_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}va.provider={build:()=>new va};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Mu{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.iu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.iu(this.observer.error,e):at("Uncaught Error in snapshot listener:",e.toString()))}su(){this.muted=!0}iu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nn="FirestoreClient";class h0{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=ot.UNAUTHENTICATED,this.clientId=Om.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async o=>{H(Nn,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(H(Nn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Ft;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Pu(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function jc(n,e){n.asyncQueue.verifyOperationInProgress(),H(Nn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await i_(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Qf(n,e){n.asyncQueue.verifyOperationInProgress();const t=await f0(n);H(Nn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>jf(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>jf(e.remoteStore,s)),n._onlineComponents=e}async function f0(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){H(Nn,"Using user provided OfflineComponentProvider");try{await jc(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===U.FAILED_PRECONDITION||s.code===U.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;pi("Error using user provided cache. Falling back to memory cache: "+t),await jc(n,new Si)}}else H(Nn,"Using default OfflineComponentProvider"),await jc(n,new u0(void 0));return n._offlineComponents}async function A_(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(H(Nn,"Using user provided OnlineComponentProvider"),await Qf(n,n._uninitializedComponentsProvider._online)):(H(Nn,"Using default OnlineComponentProvider"),await Qf(n,new va))),n._onlineComponents}function p0(n){return A_(n).then(e=>e.syncEngine)}async function ya(n){const e=await A_(n),t=e.eventManager;return t.onListen=XA.bind(null,e.syncEngine),t.onUnlisten=t0.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=ZA.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=n0.bind(null,e.syncEngine),t}function m0(n,e,t={}){const r=new Ft;return n.asyncQueue.enqueueAndForget(async()=>function(i,o,c,l,h){const p=new Mu({next:g=>{p.su(),o.enqueueAndForget(()=>Nu(i,m));const E=g.docs.has(c);!E&&g.fromCache?h.reject(new W(U.UNAVAILABLE,"Failed to get document because the client is offline.")):E&&g.fromCache&&l&&l.source==="server"?h.reject(new W(U.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(g)},error:g=>h.reject(g)}),m=new Vu(Ui(c.path),p,{includeMetadataChanges:!0,Ta:!0});return xu(i,m)}(await ya(n),n.asyncQueue,e,t,r)),r.promise}function g0(n,e,t={}){const r=new Ft;return n.asyncQueue.enqueueAndForget(async()=>function(i,o,c,l,h){const p=new Mu({next:g=>{p.su(),o.enqueueAndForget(()=>Nu(i,m)),g.fromCache&&l.source==="server"?h.reject(new W(U.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(g)},error:g=>h.reject(g)}),m=new Vu(c,p,{includeMetadataChanges:!0,Ta:!0});return xu(i,m)}(await ya(n),n.asyncQueue,e,t,r)),r.promise}/**
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
 */function S_(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yf=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function R_(n,e,t){if(!t)throw new W(U.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function _0(n,e,t,r){if(e===!0&&r===!0)throw new W(U.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Jf(n){if(!J.isDocumentKey(n))throw new W(U.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Xf(n){if(J.isDocumentKey(n))throw new W(U.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function ec(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":ee()}function yt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new W(U.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=ec(n);throw new W(U.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function v0(n,e){if(e<=0)throw new W(U.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const y0="firestore.googleapis.com",Zf=!0;class ep{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new W(U.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=y0,this.ssl=Zf}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:Zf;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Kg;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Jg)throw new W(U.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}_0("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=S_((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new W(U.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new W(U.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new W(U.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Fu{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ep({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new W(U.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new W(U.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ep(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new lE;switch(r.type){case"firstParty":return new hE(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new W(U.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Yf.get(t);r&&(H("ComponentProvider","Removing Datastore"),Yf.delete(t),r.terminate())}(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new qt(this.firestore,e,this._query)}}class nt{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Rn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new nt(this.firestore,e,this._key)}}class Rn extends qt{constructor(e,t,r){super(e,t,Ui(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new nt(this.firestore,null,new J(e))}withConverter(e){return new Rn(this.firestore,e,this._path)}}function Se(n,e,...t){if(n=Ce(n),R_("collection","path",e),n instanceof Fu){const r=we.fromString(e,...t);return Xf(r),new Rn(n,null,r)}{if(!(n instanceof nt||n instanceof Rn))throw new W(U.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(we.fromString(e,...t));return Xf(r),new Rn(n.firestore,null,r)}}function ke(n,e,...t){if(n=Ce(n),arguments.length===1&&(e=Om.newId()),R_("doc","path",e),n instanceof Fu){const r=we.fromString(e,...t);return Jf(r),new nt(n,null,new J(r))}{if(!(n instanceof nt||n instanceof Rn))throw new W(U.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(we.fromString(e,...t));return Jf(r),new nt(n.firestore,n instanceof Rn?n.converter:null,new J(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tp="AsyncQueue";class np{constructor(e=Promise.resolve()){this.Vu=[],this.mu=!1,this.fu=[],this.gu=null,this.pu=!1,this.yu=!1,this.wu=[],this.a_=new c_(this,"async_queue_retry"),this.Su=()=>{const r=qo();r&&H(tp,"Visibility state changed to "+r.visibilityState),this.a_.t_()},this.bu=e;const t=qo();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Su)}get isShuttingDown(){return this.mu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Du(),this.vu(e)}enterRestrictedMode(e){if(!this.mu){this.mu=!0,this.yu=e||!1;const t=qo();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Su)}}enqueue(e){if(this.Du(),this.mu)return new Promise(()=>{});const t=new Ft;return this.vu(()=>this.mu&&this.yu?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Vu.push(e),this.Cu()))}async Cu(){if(this.Vu.length!==0){try{await this.Vu[0](),this.Vu.shift(),this.a_.reset()}catch(e){if(!On(e))throw e;H(tp,"Operation failed with retryable error: "+e)}this.Vu.length>0&&this.a_.Xo(()=>this.Cu())}}vu(e){const t=this.bu.then(()=>(this.pu=!0,e().catch(r=>{this.gu=r,this.pu=!1;const s=function(o){let c=o.message||"";return o.stack&&(c=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),c}(r);throw at("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.pu=!1,r))));return this.bu=t,t}enqueueAfterDelay(e,t,r){this.Du(),this.wu.indexOf(e)>-1&&(t=0);const s=ku.createAndSchedule(this,e,t,r,i=>this.Fu(i));return this.fu.push(s),s}Du(){this.gu&&ee()}verifyOperationInProgress(){}async Mu(){let e;do e=this.bu,await e;while(e!==this.bu)}xu(e){for(const t of this.fu)if(t.timerId===e)return!0;return!1}Ou(e){return this.Mu().then(()=>{this.fu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.fu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Mu()})}Nu(e){this.wu.push(e)}Fu(e){const t=this.fu.indexOf(e);this.fu.splice(t,1)}}function rp(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(n,["next","error","complete"])}class nn extends Fu{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new np,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new np(e),this._firestoreClient=void 0,await e}}}function b0(n,e,t){t||(t=aa);const r=bs(n,"firestore");if(r.isInitialized(t)){const s=r.getImmediate({identifier:t}),i=r.getOptions(t);if(ui(i,e))return s;throw new W(U.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new W(U.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Jg)throw new W(U.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return r.initialize({options:e,instanceIdentifier:t})}function tc(n){if(n._terminated)throw new W(U.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||w0(n),n._firestoreClient}function w0(n){var e,t,r;const s=n._freezeSettings(),i=function(c,l,h,p){return new QE(c,l,h,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,S_(p.experimentalLongPollingOptions),p.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((t=s.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new h0(n._authCredentials,n._appCheckCredentials,n._queue,i,n._componentsProvider&&function(c){const l=c?._online.build();return{_offline:c?._offline.build(l),_online:l}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ps{constructor(e){this._byteString=e}static fromBase64String(e){try{return new ps($e.fromBase64String(e))}catch(t){throw new W(U.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new ps($e.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nc{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new W(U.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ve(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rc{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uu{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new W(U.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new W(U.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return ue(this._lat,e._lat)||ue(this._long,e._long)}}/**
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
 */class Bu{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const I0=/^__.*__$/;class E0{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new on(e,this.data,this.fieldMask,t,this.fieldTransforms):new As(e,this.data,t,this.fieldTransforms)}}class C_{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new on(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function k_(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw ee()}}class $u{constructor(e,t,r,s,i,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Bu(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Lu(){return this.settings.Lu}ku(e){return new $u(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}qu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.ku({path:r,Qu:!1});return s.$u(e),s}Uu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.ku({path:r,Qu:!1});return s.Bu(),s}Ku(e){return this.ku({path:void 0,Qu:!0})}Wu(e){return ba(e,this.settings.methodName,this.settings.Gu||!1,this.path,this.settings.zu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Bu(){if(this.path)for(let e=0;e<this.path.length;e++)this.$u(this.path.get(e))}$u(e){if(e.length===0)throw this.Wu("Document fields must not be empty");if(k_(this.Lu)&&I0.test(e))throw this.Wu('Document fields cannot begin and end with "__"')}}class T0{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Xa(e)}ju(e,t,r,s=!1){return new $u({Lu:e,methodName:t,zu:r,path:Ve.emptyPath(),Qu:!1,Gu:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Gi(n){const e=n._freezeSettings(),t=Xa(n._databaseId);return new T0(n._databaseId,!!e.ignoreUndefinedProperties,t)}function P_(n,e,t,r,s,i={}){const o=n.ju(i.merge||i.mergeFields?2:0,e,t,s);ju("Data must be an object, but it was:",o,r);const c=N_(r,o);let l,h;if(i.merge)l=new ut(o.fieldMask),h=o.fieldTransforms;else if(i.mergeFields){const p=[];for(const m of i.mergeFields){const g=Pl(e,m,t);if(!o.contains(g))throw new W(U.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);V_(p,g)||p.push(g)}l=new ut(p),h=o.fieldTransforms.filter(m=>l.covers(m.field))}else l=null,h=o.fieldTransforms;return new E0(new Ze(c),l,h)}class Hi extends rc{_toFieldTransform(e){if(e.Lu!==2)throw e.Lu===1?e.Wu(`${this._methodName}() can only appear at the top level of your update data`):e.Wu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Hi}}class qu extends rc{constructor(e,t){super(e),this.Ju=t}_toFieldTransform(e){const t=new ds(e.serializer,yg(e.serializer,this.Ju));return new Tg(e.path,t)}isEqual(e){return e instanceof qu&&this.Ju===e.Ju}}function A0(n,e,t,r){const s=n.ju(1,e,t);ju("Data must be an object, but it was:",s,r);const i=[],o=Ze.empty();Ln(r,(l,h)=>{const p=zu(e,l,t);h=Ce(h);const m=s.Uu(p);if(h instanceof Hi)i.push(p);else{const g=Ki(h,m);g!=null&&(i.push(p),o.set(p,g))}});const c=new ut(i);return new C_(o,c,s.fieldTransforms)}function S0(n,e,t,r,s,i){const o=n.ju(1,e,t),c=[Pl(e,r,t)],l=[s];if(i.length%2!=0)throw new W(U.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<i.length;g+=2)c.push(Pl(e,i[g])),l.push(i[g+1]);const h=[],p=Ze.empty();for(let g=c.length-1;g>=0;--g)if(!V_(h,c[g])){const E=c[g];let S=l[g];S=Ce(S);const k=o.Uu(E);if(S instanceof Hi)h.push(E);else{const T=Ki(S,k);T!=null&&(h.push(E),p.set(E,T))}}const m=new ut(h);return new C_(p,m,o.fieldTransforms)}function x_(n,e,t,r=!1){return Ki(t,n.ju(r?4:3,e))}function Ki(n,e){if(D_(n=Ce(n)))return ju("Unsupported field value:",e,n),N_(n,e);if(n instanceof rc)return function(r,s){if(!k_(s.Lu))throw s.Wu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Wu(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.Qu&&e.Lu!==4)throw e.Wu("Nested arrays are not supported");return function(r,s){const i=[];let o=0;for(const c of r){let l=Ki(c,s.Ku(o));l==null&&(l={nullValue:"NULL_VALUE"}),i.push(l),o++}return{arrayValue:{values:i}}}(n,e)}return function(r,s){if((r=Ce(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return yg(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=Oe.fromDate(r);return{timestampValue:hs(s.serializer,i)}}if(r instanceof Oe){const i=new Oe(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:hs(s.serializer,i)}}if(r instanceof Uu)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof ps)return{bytesValue:xg(s.serializer,r._byteString)};if(r instanceof nt){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.Wu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:_u(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Bu)return function(o,c){return{mapValue:{fields:{[cu]:{stringValue:lu},[os]:{arrayValue:{values:o.toArray().map(h=>{if(typeof h!="number")throw c.Wu("VectorValues must only contain numeric values.");return hu(c.serializer,h)})}}}}}}(r,s);throw s.Wu(`Unsupported field value: ${ec(r)}`)}(n,e)}function N_(n,e){const t={};return Ym(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Ln(n,(r,s)=>{const i=Ki(s,e.qu(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function D_(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Oe||n instanceof Uu||n instanceof ps||n instanceof nt||n instanceof rc||n instanceof Bu)}function ju(n,e,t){if(!D_(t)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(t)){const r=ec(t);throw r==="an object"?e.Wu(n+" a custom object"):e.Wu(n+" "+r)}}function Pl(n,e,t){if((e=Ce(e))instanceof nc)return e._internalPath;if(typeof e=="string")return zu(n,e);throw ba("Field path arguments must be of type string or ",n,!1,void 0,t)}const R0=new RegExp("[~\\*/\\[\\]]");function zu(n,e,t){if(e.search(R0)>=0)throw ba(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new nc(...e.split("."))._internalPath}catch{throw ba(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function ba(n,e,t,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(i||o)&&(l+=" (found",i&&(l+=` in field ${r}`),o&&(l+=` in document ${s}`),l+=")"),new W(U.INVALID_ARGUMENT,c+n+l)}function V_(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gu{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new nt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new C0(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(sc("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class C0 extends Gu{data(){return super.data()}}function sc(n,e){return typeof e=="string"?zu(n,e):e instanceof nc?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function O_(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new W(U.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Hu{}class ic extends Hu{}function lt(n,e,...t){let r=[];e instanceof Hu&&r.push(e),r=r.concat(t),function(i){const o=i.filter(l=>l instanceof Ku).length,c=i.filter(l=>l instanceof oc).length;if(o>1||o>0&&c>0)throw new W(U.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class oc extends ic{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new oc(e,t,r)}_apply(e){const t=this._parse(e);return L_(e._query,t),new qt(e.firestore,e.converter,vl(e._query,t))}_parse(e){const t=Gi(e.firestore);return function(i,o,c,l,h,p,m){let g;if(h.isKeyField()){if(p==="array-contains"||p==="array-contains-any")throw new W(U.INVALID_ARGUMENT,`Invalid Query. You can't perform '${p}' queries on documentId().`);if(p==="in"||p==="not-in"){ip(m,p);const S=[];for(const k of m)S.push(sp(l,i,k));g={arrayValue:{values:S}}}else g=sp(l,i,m)}else p!=="in"&&p!=="not-in"&&p!=="array-contains-any"||ip(m,p),g=x_(c,o,m,p==="in"||p==="not-in");return ge.create(h,p,g)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function Dn(n,e,t){const r=e,s=sc("where",n);return oc._create(s,r,t)}class Ku extends Hu{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Ku(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:Ie.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let o=s;const c=i.getFlattenedFilters();for(const l of c)L_(o,l),o=vl(o,l)}(e._query,t),new qt(e.firestore,e.converter,vl(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Wu extends ic{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Wu(e,t)}_apply(e){const t=function(s,i,o){if(s.startAt!==null)throw new W(U.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new W(U.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Ti(i,o)}(e._query,this._field,this._direction);return new qt(e.firestore,e.converter,function(s,i){const o=s.explicitOrderBy.concat([i]);return new Er(s.path,s.collectionGroup,o,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,t))}}function wt(n,e="asc"){const t=e,r=sc("orderBy",n);return Wu._create(r,t)}class Qu extends ic{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new Qu(e,t,r)}_apply(e){return new qt(e.firestore,e.converter,ua(e._query,this._limit,this._limitType))}}function It(n){return v0("limit",n),Qu._create("limit",n,"F")}class Yu extends ic{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new Yu(e,t,r)}_apply(e){const t=P0(e,this.type,this._docOrFields,this._inclusive);return new qt(e.firestore,e.converter,function(s,i){return new Er(s.path,s.collectionGroup,s.explicitOrderBy.slice(),s.filters.slice(),s.limit,s.limitType,i,s.endAt)}(e._query,t))}}function k0(...n){return Yu._create("startAfter",n,!1)}function P0(n,e,t,r){if(t[0]=Ce(t[0]),t[0]instanceof Gu)return function(i,o,c,l,h){if(!l)throw new W(U.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${c}().`);const p=[];for(const m of Qr(i))if(m.field.isKeyField())p.push(fr(o,l.key));else{const g=l.data.field(m.field);if($a(g))throw new W(U.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+m.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(g===null){const E=m.field.canonicalString();throw new W(U.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${E}' (used as the orderBy) does not exist.`)}p.push(g)}return new Pn(p,h)}(n._query,n.firestore._databaseId,e,t[0]._document,r);{const s=Gi(n.firestore);return function(o,c,l,h,p,m){const g=o.explicitOrderBy;if(p.length>g.length)throw new W(U.INVALID_ARGUMENT,`Too many arguments provided to ${h}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const E=[];for(let S=0;S<p.length;S++){const k=p[S];if(g[S].field.isKeyField()){if(typeof k!="string")throw new W(U.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${h}(), but got a ${typeof k}`);if(!du(o)&&k.indexOf("/")!==-1)throw new W(U.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${h}() must be a plain document ID, but '${k}' contains a slash.`);const T=o.path.child(we.fromString(k));if(!J.isDocumentKey(T))throw new W(U.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${h}() must result in a valid document path, but '${T}' is not because it contains an odd number of segments.`);const L=new J(T);E.push(fr(c,L))}else{const T=x_(l,h,k);E.push(T)}}return new Pn(E,m)}(n._query,n.firestore._databaseId,s,e,t,r)}}function sp(n,e,t){if(typeof(t=Ce(t))=="string"){if(t==="")throw new W(U.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!du(e)&&t.indexOf("/")!==-1)throw new W(U.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(we.fromString(t));if(!J.isDocumentKey(r))throw new W(U.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return fr(n,new J(r))}if(t instanceof nt)return fr(n,t._key);throw new W(U.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ec(t)}.`)}function ip(n,e){if(!Array.isArray(n)||n.length===0)throw new W(U.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function L_(n,e){const t=function(s,i){for(const o of s)for(const c of o.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new W(U.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new W(U.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class x0{convertValue(e,t="none"){switch(Cn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Pe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(tn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw ee()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Ln(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){var t,r,s;const i=(s=(r=(t=e.fields)===null||t===void 0?void 0:t[os].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(o=>Pe(o.doubleValue));return new Bu(i)}convertGeoPoint(e){return new Uu(Pe(e.latitude),Pe(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=qa(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(wi(e));default:return null}}convertTimestamp(e){const t=en(e);return new Oe(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=we.fromString(e);te($g(r));const s=new hr(r.get(1),r.get(3)),i=new J(r.popFirst(5));return s.isEqual(t)||at(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M_(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zs{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class F_ extends Gu{constructor(e,t,r,s,i,o){super(e,t,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new jo(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(sc("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class jo extends F_{data(e={}){return super.data(e)}}class U_{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Zs(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new jo(this._firestore,this._userDataWriter,r.key,r,new Zs(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new W(U.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(c=>{const l=new jo(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Zs(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(c=>i||c.type!==3).map(c=>{const l=new jo(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Zs(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,p=-1;return c.type!==0&&(h=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),p=o.indexOf(c.doc.key)),{type:N0(c.type),doc:l,oldIndex:h,newIndex:p}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function N0(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return ee()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ar(n){n=yt(n,nt);const e=yt(n.firestore,nn);return m0(tc(e),n._key).then(t=>$_(e,n,t))}class Ju extends x0{constructor(e){super(),this.firestore=e}convertBytes(e){return new ps(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new nt(this.firestore,null,t)}}function rn(n){n=yt(n,qt);const e=yt(n.firestore,nn),t=tc(e),r=new Ju(e);return O_(n._query),g0(t,n._query).then(s=>new U_(e,r,n,s))}function B_(n,e,t){n=yt(n,nt);const r=yt(n.firestore,nn),s=M_(n.converter,e,t);return ac(r,[P_(Gi(r),"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,et.none())])}function pt(n,e,t,...r){n=yt(n,nt);const s=yt(n.firestore,nn),i=Gi(s);let o;return o=typeof(e=Ce(e))=="string"||e instanceof nc?S0(i,"updateDoc",n._key,e,t,r):A0(i,"updateDoc",n._key,e),ac(s,[o.toMutation(n._key,et.exists(!0))])}function D0(n){return ac(yt(n.firestore,nn),[new Ka(n._key,et.none())])}function jt(n,e){const t=yt(n.firestore,nn),r=ke(n),s=M_(n.converter,e);return ac(t,[P_(Gi(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,et.exists(!1))]).then(()=>r)}function an(n,...e){var t,r,s;n=Ce(n);let i={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||rp(e[o])||(i=e[o],o++);const c={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(rp(e[o])){const m=e[o];e[o]=(t=m.next)===null||t===void 0?void 0:t.bind(m),e[o+1]=(r=m.error)===null||r===void 0?void 0:r.bind(m),e[o+2]=(s=m.complete)===null||s===void 0?void 0:s.bind(m)}let l,h,p;if(n instanceof nt)h=yt(n.firestore,nn),p=Ui(n._key.path),l={next:m=>{e[o]&&e[o]($_(h,n,m))},error:e[o+1],complete:e[o+2]};else{const m=yt(n,qt);h=yt(m.firestore,nn),p=m._query;const g=new Ju(h);l={next:E=>{e[o]&&e[o](new U_(h,g,m,E))},error:e[o+1],complete:e[o+2]},O_(n._query)}return function(g,E,S,k){const T=new Mu(k),L=new Vu(E,T,S);return g.asyncQueue.enqueueAndForget(async()=>xu(await ya(g),L)),()=>{T.su(),g.asyncQueue.enqueueAndForget(async()=>Nu(await ya(g),L))}}(tc(h),p,c,l)}function ac(n,e){return function(r,s){const i=new Ft;return r.asyncQueue.enqueueAndForget(async()=>r0(await p0(r),s,i)),i.promise}(tc(n),e)}function $_(n,e,t){const r=t.docs.get(e._key),s=new Ju(n);return new F_(n,s,e._key,r,new Zs(t.hasPendingWrites,t.fromCache),e.converter)}class V0{constructor(e){let t;this.kind="persistent",e?.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=q_(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}function O0(n){return new V0(n)}class L0{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=va.provider,this._offlineComponentProvider={build:t=>new d0(t,e?.cacheSizeBytes,this.forceOwnership)}}}function q_(n){return new L0(n?.forceOwnership)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function op(){return new Hi("deleteField")}function zt(n){return new qu("increment",n)}(function(e,t=!0){(function(s){Ts=s})(ws),Xt(new Ut("firestore",(r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),c=new nn(new uE(r.getProvider("auth-internal")),new fE(o,r.getProvider("app-check-internal")),function(h,p){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new W(U.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new hr(h.options.projectId,p)}(o,s),o);return i=Object.assign({useFetchStreams:t},i),c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),kt(Uh,Bh,e),kt(Uh,Bh,"esm2017")})();var M0="firebase",F0="11.3.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */kt(M0,F0,"app");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xl=new Map,j_={activated:!1,tokenObservers:[]},U0={initialized:!1,enabled:!1};function qe(n){return xl.get(n)||Object.assign({},j_)}function B0(n,e){return xl.set(n,e),xl.get(n)}function cc(){return U0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const z_="https://content-firebaseappcheck.googleapis.com/v1",$0="exchangeRecaptchaV3Token",q0="exchangeDebugToken",ap={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:16*60*1e3},j0=24*60*60*1e3;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z0{constructor(e,t,r,s,i){if(this.operation=e,this.retryPolicy=t,this.getWaitDuration=r,this.lowerBound=s,this.upperBound=i,this.pending=null,this.nextErrorWaitInterval=s,s>i)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new li,this.pending.promise.catch(t=>{}),await G0(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new li,this.pending.promise.catch(t=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(t){this.retryPolicy(t)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const t=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),t}}}function G0(n){return new Promise(e=>{setTimeout(e,n)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const H0={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.",throttled:"Requests throttled due to {$httpStatus} error. Attempts allowed again after {$time}"},dt=new ys("appCheck","AppCheck",H0);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cp(n=!1){var e;return n?(e=self.grecaptcha)===null||e===void 0?void 0:e.enterprise:self.grecaptcha}function Xu(n){if(!qe(n).activated)throw dt.create("use-before-activation",{appName:n.name})}function G_(n){const e=Math.round(n/1e3),t=Math.floor(e/(3600*24)),r=Math.floor((e-t*3600*24)/3600),s=Math.floor((e-t*3600*24-r*3600)/60),i=e-t*3600*24-r*3600-s*60;let o="";return t&&(o+=bo(t)+"d:"),r&&(o+=bo(r)+"h:"),o+=bo(s)+"m:"+bo(i)+"s",o}function bo(n){return n===0?"00":n>=10?n.toString():"0"+n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zu({url:n,body:e},t){const r={"Content-Type":"application/json"},s=t.getImmediate({optional:!0});if(s){const m=await s.getHeartbeatsHeader();m&&(r["X-Firebase-Client"]=m)}const i={method:"POST",body:JSON.stringify(e),headers:r};let o;try{o=await fetch(n,i)}catch(m){throw dt.create("fetch-network-error",{originalErrorMessage:m?.message})}if(o.status!==200)throw dt.create("fetch-status-error",{httpStatus:o.status});let c;try{c=await o.json()}catch(m){throw dt.create("fetch-parse-error",{originalErrorMessage:m?.message})}const l=c.ttl.match(/^([\d.]+)(s)$/);if(!l||!l[2]||isNaN(Number(l[1])))throw dt.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${c.ttl}`});const h=Number(l[1])*1e3,p=Date.now();return{token:c.token,expireTimeMillis:p+h,issuedAtTimeMillis:p}}function K0(n,e){const{projectId:t,appId:r,apiKey:s}=n.options;return{url:`${z_}/projects/${t}/apps/${r}:${$0}?key=${s}`,body:{recaptcha_v3_token:e}}}function H_(n,e){const{projectId:t,appId:r,apiKey:s}=n.options;return{url:`${z_}/projects/${t}/apps/${r}:${q0}?key=${s}`,body:{debug_token:e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const W0="firebase-app-check-database",Q0=1,Ri="firebase-app-check-store",K_="debug-token";let wo=null;function W_(){return wo||(wo=new Promise((n,e)=>{try{const t=indexedDB.open(W0,Q0);t.onsuccess=r=>{n(r.target.result)},t.onerror=r=>{var s;e(dt.create("storage-open",{originalErrorMessage:(s=r.target.error)===null||s===void 0?void 0:s.message}))},t.onupgradeneeded=r=>{const s=r.target.result;switch(r.oldVersion){case 0:s.createObjectStore(Ri,{keyPath:"compositeKey"})}}}catch(t){e(dt.create("storage-open",{originalErrorMessage:t?.message}))}}),wo)}function Y0(n){return Y_(J_(n))}function J0(n,e){return Q_(J_(n),e)}function X0(n){return Q_(K_,n)}function Z0(){return Y_(K_)}async function Q_(n,e){const r=(await W_()).transaction(Ri,"readwrite"),i=r.objectStore(Ri).put({compositeKey:n,value:e});return new Promise((o,c)=>{i.onsuccess=l=>{o()},r.onerror=l=>{var h;c(dt.create("storage-set",{originalErrorMessage:(h=l.target.error)===null||h===void 0?void 0:h.message}))}})}async function Y_(n){const t=(await W_()).transaction(Ri,"readonly"),s=t.objectStore(Ri).get(n);return new Promise((i,o)=>{s.onsuccess=c=>{const l=c.target.result;i(l?l.value:void 0)},t.onerror=c=>{var l;o(dt.create("storage-get",{originalErrorMessage:(l=c.target.error)===null||l===void 0?void 0:l.message}))}})}function J_(n){return`${n.options.appId}-${n.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ci=new xa("@firebase/app-check");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eS(n){if(Pa()){let e;try{e=await Y0(n)}catch(t){Ci.warn(`Failed to read token from IndexedDB. Error: ${t}`)}return e}}function zc(n,e){return Pa()?J0(n,e).catch(t=>{Ci.warn(`Failed to write token to IndexedDB. Error: ${t}`)}):Promise.resolve()}async function tS(){let n;try{n=await Z0()}catch{}if(n)return n;{const e=crypto.randomUUID();return X0(e).catch(t=>Ci.warn(`Failed to persist debug token to IndexedDB. Error: ${t}`)),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ed(){return cc().enabled}async function td(){const n=cc();if(n.enabled&&n.token)return n.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function nS(){const n=Mp(),e=cc();if(e.initialized=!0,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&n.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const t=new li;e.token=t,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?t.resolve(n.FIREBASE_APPCHECK_DEBUG_TOKEN):t.resolve(tS())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rS={error:"UNKNOWN_ERROR"};function sS(n){return jl.encodeString(JSON.stringify(n),!1)}async function Nl(n,e=!1){const t=n.app;Xu(t);const r=qe(t);let s=r.token,i;if(s&&!Gr(s)&&(r.token=void 0,s=void 0),!s){const l=await r.cachedTokenPromise;l&&(Gr(l)?s=l:await zc(t,void 0))}if(!e&&s&&Gr(s))return{token:s.token};let o=!1;if(ed()){r.exchangeTokenPromise||(r.exchangeTokenPromise=Zu(H_(t,await td()),n.heartbeatServiceProvider).finally(()=>{r.exchangeTokenPromise=void 0}),o=!0);const l=await r.exchangeTokenPromise;return await zc(t,l),r.token=l,{token:l.token}}try{r.exchangeTokenPromise||(r.exchangeTokenPromise=r.provider.getToken().finally(()=>{r.exchangeTokenPromise=void 0}),o=!0),s=await qe(t).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"?Ci.warn(l.message):Ci.error(l),i=l}let c;return s?i?Gr(s)?c={token:s.token,internalError:i}:c=up(i):(c={token:s.token},r.token=s,await zc(t,s)):c=up(i),o&&ev(t,c),c}async function iS(n){const e=n.app;Xu(e);const{provider:t}=qe(e);if(ed()){const r=await td(),{token:s}=await Zu(H_(e,r),n.heartbeatServiceProvider);return{token:s}}else{const{token:r}=await t.getToken();return{token:r}}}function X_(n,e,t,r){const{app:s}=n,i=qe(s),o={next:t,error:r,type:e};if(i.tokenObservers=[...i.tokenObservers,o],i.token&&Gr(i.token)){const c=i.token;Promise.resolve().then(()=>{t({token:c.token}),lp(n)}).catch(()=>{})}i.cachedTokenPromise.then(()=>lp(n))}function Z_(n,e){const t=qe(n),r=t.tokenObservers.filter(s=>s.next!==e);r.length===0&&t.tokenRefresher&&t.tokenRefresher.isRunning()&&t.tokenRefresher.stop(),t.tokenObservers=r}function lp(n){const{app:e}=n,t=qe(e);let r=t.tokenRefresher;r||(r=oS(n),t.tokenRefresher=r),!r.isRunning()&&t.isTokenAutoRefreshEnabled&&r.start()}function oS(n){const{app:e}=n;return new z0(async()=>{const t=qe(e);let r;if(t.token?r=await Nl(n,!0):r=await Nl(n),r.error)throw r.error;if(r.internalError)throw r.internalError},()=>!0,()=>{const t=qe(e);if(t.token){let r=t.token.issuedAtTimeMillis+(t.token.expireTimeMillis-t.token.issuedAtTimeMillis)*.5+3e5;const s=t.token.expireTimeMillis-5*60*1e3;return r=Math.min(r,s),Math.max(0,r-Date.now())}else return 0},ap.RETRIAL_MIN_WAIT,ap.RETRIAL_MAX_WAIT)}function ev(n,e){const t=qe(n).tokenObservers;for(const r of t)try{r.type==="EXTERNAL"&&e.error!=null?r.error(e.error):r.next(e)}catch{}}function Gr(n){return n.expireTimeMillis-Date.now()>0}function up(n){return{token:sS(rS),error:n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aS{constructor(e,t){this.app=e,this.heartbeatServiceProvider=t}_delete(){const{tokenObservers:e}=qe(this.app);for(const t of e)Z_(this.app,t.next);return Promise.resolve()}}function cS(n,e){return new aS(n,e)}function lS(n){return{getToken:e=>Nl(n,e),getLimitedUseToken:()=>iS(n),addTokenListener:e=>X_(n,"INTERNAL",e),removeTokenListener:e=>Z_(n.app,e)}}const uS="@firebase/app-check",dS="0.8.11";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hS="https://www.google.com/recaptcha/api.js";function fS(n,e){const t=new li,r=qe(n);r.reCAPTCHAState={initialized:t};const s=pS(n),i=cp(!1);return i?dp(n,e,i,s,t):_S(()=>{const o=cp(!1);if(!o)throw new Error("no recaptcha");dp(n,e,o,s,t)}),t.promise}function dp(n,e,t,r,s){t.ready(()=>{gS(n,e,t,r),s.resolve(t)})}function pS(n){const e=`fire_app_check_${n.name}`,t=document.createElement("div");return t.id=e,t.style.display="none",document.body.appendChild(t),e}async function mS(n){Xu(n);const t=await qe(n).reCAPTCHAState.initialized.promise;return new Promise((r,s)=>{const i=qe(n).reCAPTCHAState;t.ready(()=>{r(t.execute(i.widgetId,{action:"fire_app_check"}))})})}function gS(n,e,t,r){const s=t.render(r,{sitekey:e,size:"invisible",callback:()=>{qe(n).reCAPTCHAState.succeeded=!0},"error-callback":()=>{qe(n).reCAPTCHAState.succeeded=!1}}),i=qe(n);i.reCAPTCHAState=Object.assign(Object.assign({},i.reCAPTCHAState),{widgetId:s})}function _S(n){const e=document.createElement("script");e.src=hS,e.onload=n,document.head.appendChild(e)}/**
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
 */class nd{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){var e,t,r;yS(this._throttleData);const s=await mS(this._app).catch(o=>{throw dt.create("recaptcha-error")});if(!(!((e=qe(this._app).reCAPTCHAState)===null||e===void 0)&&e.succeeded))throw dt.create("recaptcha-error");let i;try{i=await Zu(K0(this._app,s),this._heartbeatServiceProvider)}catch(o){throw!((t=o.code)===null||t===void 0)&&t.includes("fetch-status-error")?(this._throttleData=vS(Number((r=o.customData)===null||r===void 0?void 0:r.httpStatus),this._throttleData),dt.create("throttled",{time:G_(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):o}return this._throttleData=null,i}initialize(e){this._app=e,this._heartbeatServiceProvider=bs(e,"heartbeat"),fS(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof nd?this._siteKey===e._siteKey:!1}}function vS(n,e){if(n===404||n===403)return{backoffCount:1,allowRequestsAfter:Date.now()+j0,httpStatus:n};{const t=e?e.backoffCount:0,r=$y(t,1e3,2);return{backoffCount:t+1,allowRequestsAfter:Date.now()+r,httpStatus:n}}}function yS(n){if(n&&Date.now()-n.allowRequestsAfter<=0)throw dt.create("throttled",{time:G_(n.allowRequestsAfter-Date.now()),httpStatus:n.httpStatus})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bS(n=Gl(),e){n=Ce(n);const t=bs(n,"app-check");if(cc().initialized||nS(),ed()&&td().then(s=>console.log(`App Check debug token: ${s}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(i.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&i.provider.isEqual(e.provider))return s;throw dt.create("already-initialized",{appName:n.name})}const r=t.initialize({options:e});return wS(n,e.provider,e.isTokenAutoRefreshEnabled),qe(n).isTokenAutoRefreshEnabled&&X_(r,"INTERNAL",()=>{}),r}function wS(n,e,t){const r=B0(n,Object.assign({},j_));r.activated=!0,r.provider=e,r.cachedTokenPromise=eS(n).then(s=>(s&&Gr(s)&&(r.token=s,ev(n,{token:s.token})),s)),r.isTokenAutoRefreshEnabled=t===void 0?n.automaticDataCollectionEnabled:t,r.provider.initialize(n)}const IS="app-check",hp="app-check-internal";function ES(){Xt(new Ut(IS,n=>{const e=n.getProvider("app").getImmediate(),t=n.getProvider("heartbeat");return cS(e,t)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((n,e,t)=>{n.getProvider(hp).initialize()})),Xt(new Ut(hp,n=>{const e=n.getProvider("app-check").getImmediate();return lS(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),kt(uS,dS)}ES();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TS="type.googleapis.com/google.protobuf.Int64Value",AS="type.googleapis.com/google.protobuf.UInt64Value";function tv(n,e){const t={};for(const r in n)n.hasOwnProperty(r)&&(t[r]=e(n[r]));return t}function wa(n){if(n==null)return null;if(n instanceof Number&&(n=n.valueOf()),typeof n=="number"&&isFinite(n)||n===!0||n===!1||Object.prototype.toString.call(n)==="[object String]")return n;if(n instanceof Date)return n.toISOString();if(Array.isArray(n))return n.map(e=>wa(e));if(typeof n=="function"||typeof n=="object")return tv(n,e=>wa(e));throw new Error("Data cannot be encoded in JSON: "+n)}function ms(n){if(n==null)return n;if(n["@type"])switch(n["@type"]){case TS:case AS:{const e=Number(n.value);if(isNaN(e))throw new Error("Data cannot be decoded from JSON: "+n);return e}default:throw new Error("Data cannot be decoded from JSON: "+n)}return Array.isArray(n)?n.map(e=>ms(e)):typeof n=="function"||typeof n=="object"?tv(n,e=>ms(e)):n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rd="functions";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fp={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class ht extends $t{constructor(e,t,r){super(`${rd}/${e}`,t||""),this.details=r,Object.setPrototypeOf(this,ht.prototype)}}function SS(n){if(n>=200&&n<300)return"ok";switch(n){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function Ia(n,e){let t=SS(n),r=t,s;try{const i=e&&e.error;if(i){const o=i.status;if(typeof o=="string"){if(!fp[o])return new ht("internal","internal");t=fp[o],r=o}const c=i.message;typeof c=="string"&&(r=c),s=i.details,s!==void 0&&(s=ms(s))}}catch{}return t==="ok"?null:new ht(t,r,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RS{constructor(e,t,r,s){this.app=e,this.auth=null,this.messaging=null,this.appCheck=null,this.serverAppAppCheckToken=null,Tt(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.auth=t.getImmediate({optional:!0}),this.messaging=r.getImmediate({optional:!0}),this.auth||t.get().then(i=>this.auth=i,()=>{}),this.messaging||r.get().then(i=>this.messaging=i,()=>{}),this.appCheck||s?.get().then(i=>this.appCheck=i,()=>{})}async getAuthToken(){if(this.auth)try{const e=await this.auth.getToken();return e?.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(e){if(this.serverAppAppCheckToken)return this.serverAppAppCheckToken;if(this.appCheck){const t=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return t.error?null:t.token}return null}async getContext(e){const t=await this.getAuthToken(),r=await this.getMessagingToken(),s=await this.getAppCheckToken(e);return{authToken:t,messagingToken:r,appCheckToken:s}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dl="us-central1",CS=/^data: (.*?)(?:\n|$)/;function kS(n){let e=null;return{promise:new Promise((t,r)=>{e=setTimeout(()=>{r(new ht("deadline-exceeded","deadline-exceeded"))},n)}),cancel:()=>{e&&clearTimeout(e)}}}class PS{constructor(e,t,r,s,i=Dl,o=(...c)=>fetch(...c)){this.app=e,this.fetchImpl=o,this.emulatorOrigin=null,this.contextProvider=new RS(e,t,r,s),this.cancelAllRequests=new Promise(c=>{this.deleteService=()=>Promise.resolve(c())});try{const c=new URL(i);this.customDomain=c.origin+(c.pathname==="/"?"":c.pathname),this.region=Dl}catch{this.customDomain=null,this.region=i}}_delete(){return this.deleteService()}_url(e){const t=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${t}/${this.region}/${e}`:this.customDomain!==null?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`}}function xS(n,e,t){n.emulatorOrigin=`http://${e}:${t}`}function NS(n,e,t){const r=s=>VS(n,e,s,{});return r.stream=(s,i)=>LS(n,e,s,i),r}async function DS(n,e,t,r){t["Content-Type"]="application/json";let s;try{s=await r(n,{method:"POST",body:JSON.stringify(e),headers:t})}catch{return{status:0,json:null}}let i=null;try{i=await s.json()}catch{}return{status:s.status,json:i}}async function nv(n,e){const t={},r=await n.contextProvider.getContext(e.limitedUseAppCheckTokens);return r.authToken&&(t.Authorization="Bearer "+r.authToken),r.messagingToken&&(t["Firebase-Instance-ID-Token"]=r.messagingToken),r.appCheckToken!==null&&(t["X-Firebase-AppCheck"]=r.appCheckToken),t}function VS(n,e,t,r){const s=n._url(e);return OS(n,s,t,r)}async function OS(n,e,t,r){t=wa(t);const s={data:t},i=await nv(n,r),o=r.timeout||7e4,c=kS(o),l=await Promise.race([DS(e,s,i,n.fetchImpl),c.promise,n.cancelAllRequests]);if(c.cancel(),!l)throw new ht("cancelled","Firebase Functions instance was deleted.");const h=Ia(l.status,l.json);if(h)throw h;if(!l.json)throw new ht("internal","Response is not valid JSON object.");let p=l.json.data;if(typeof p>"u"&&(p=l.json.result),typeof p>"u")throw new ht("internal","Response is missing data field.");return{data:ms(p)}}function LS(n,e,t,r){const s=n._url(e);return MS(n,s,t,r||{})}async function MS(n,e,t,r){var s;t=wa(t);const i={data:t},o=await nv(n,r);o["Content-Type"]="application/json",o.Accept="text/event-stream";let c;try{c=await n.fetchImpl(e,{method:"POST",body:JSON.stringify(i),headers:o,signal:r?.signal})}catch(E){if(E instanceof Error&&E.name==="AbortError"){const k=new ht("cancelled","Request was cancelled.");return{data:Promise.reject(k),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(k)}}}}}}const S=Ia(0,null);return{data:Promise.reject(S),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(S)}}}}}}let l,h;const p=new Promise((E,S)=>{l=E,h=S});(s=r?.signal)===null||s===void 0||s.addEventListener("abort",()=>{const E=new ht("cancelled","Request was cancelled.");h(E)});const m=c.body.getReader(),g=FS(m,l,h,r?.signal);return{stream:{[Symbol.asyncIterator](){const E=g.getReader();return{async next(){const{value:S,done:k}=await E.read();return{value:S,done:k}},async return(){return await E.cancel(),{done:!0,value:void 0}}}}},data:p}}function FS(n,e,t,r){const s=(o,c)=>{const l=o.match(CS);if(!l)return;const h=l[1];try{const p=JSON.parse(h);if("result"in p){e(ms(p.result));return}if("message"in p){c.enqueue(ms(p.message));return}if("error"in p){const m=Ia(0,p);c.error(m),t(m);return}}catch(p){if(p instanceof ht){c.error(p),t(p);return}}},i=new TextDecoder;return new ReadableStream({start(o){let c="";return l();async function l(){if(r?.aborted){const h=new ht("cancelled","Request was cancelled");return o.error(h),t(h),Promise.resolve()}try{const{value:h,done:p}=await n.read();if(p){c.trim()&&s(c.trim(),o),o.close();return}if(r?.aborted){const g=new ht("cancelled","Request was cancelled");o.error(g),t(g),await n.cancel();return}c+=i.decode(h,{stream:!0});const m=c.split(`
`);c=m.pop()||"";for(const g of m)g.trim()&&s(g.trim(),o);return l()}catch(h){const p=h instanceof ht?h:Ia(0,null);o.error(p),t(p)}}},cancel(){return n.cancel()}})}const pp="@firebase/functions",mp="0.12.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const US="auth-internal",BS="app-check-internal",$S="messaging-internal";function qS(n){const e=(t,{instanceIdentifier:r})=>{const s=t.getProvider("app").getImmediate(),i=t.getProvider(US),o=t.getProvider($S),c=t.getProvider(BS);return new PS(s,i,o,c,r)};Xt(new Ut(rd,e,"PUBLIC").setMultipleInstances(!0)),kt(pp,mp,n),kt(pp,mp,"esm2017")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jS(n=Gl(),e=Dl){const r=bs(Ce(n),rd).getImmediate({identifier:e}),s=Iy("functions");return s&&zS(r,...s),r}function zS(n,e,t){xS(Ce(n),e,t)}function Sr(n,e,t){return NS(Ce(n),e)}qS();const GS={apiKey:"AIzaSyD9MJrON70mPqZxQqhndgQHNkTZUnnaQIs",authDomain:"altorra-cars.firebaseapp.com",databaseURL:"https://altorra-cars-default-rtdb.firebaseio.com",projectId:"altorra-cars",storageBucket:"altorra-cars.firebasestorage.app",messagingSenderId:"235148219730",appId:"1:235148219730:web:ceabdbc52fdcbe8b85168b",measurementId:"G-ZGZ6CVTB73"},HS="altorra-crm",lc=zp(GS,HS);bS(lc,{provider:new nd("6Lfz8BQtAAAAAILjn8GbHFT8u6dpg5rFvg5hGZzS"),isTokenAutoRefreshEnabled:!0});const ki=oE(lc),ie=b0(lc,{localCache:O0({tabManager:q_({})})}),Rr=jS(lc,"us-central1");function ft(n){const e=G.get().permissions||[];return e.includes("*")||e.includes(n)}function KS(n){return n?n.rol==="super_admin"||n.roleId==="system_super_admin"?["*"]:Array.isArray(n.permissions)&&n.permissions.length?n.permissions.slice():[]:[]}async function WS(n){try{const e=await Ar(ke(ie,"usuarios",n.uid)),t=e.exists()?e.data():null;if(t&&t.bloqueado===!0){await _m(ki),G.set({user:null,profile:null,permissions:[],ready:!0,authError:"Cuenta bloqueada. Contacta al administrador."});return}G.set({user:n,profile:t,permissions:KS(t),ready:!0,authError:null})}catch(e){console.warn("[auth] no se pudo hidratar el perfil:",e),G.set({user:n,profile:null,permissions:[],ready:!0})}}function QS(){Kw(ki,bm).catch(()=>{}),Yw(ki,n=>{n?WS(n):G.set({user:null,profile:null,permissions:[],ready:!0})})}const YS={"auth/invalid-email":"Correo inválido.","auth/user-disabled":"Esta cuenta está deshabilitada.","auth/user-not-found":"No existe una cuenta con ese correo.","auth/wrong-password":"Contraseña incorrecta.","auth/invalid-credential":"Credenciales incorrectas.","auth/too-many-requests":"Demasiados intentos. Espera unos minutos.","auth/network-request-failed":"Sin conexión. Revisa tu internet."};async function JS(n,e){G.set({authError:null});try{await Hw(ki,String(n).trim(),e)}catch(t){const r=YS[t&&t.code]||"No se pudo iniciar sesión.";throw G.set({authError:r}),t}}async function XS(){if(G.get().mock){G.set({user:null,profile:null,permissions:[]});return}await _m(ki)}function Gc(){const{profile:n,user:e}=G.get();return n&&(n.nombre||n.roleName)||e&&(e.displayName||e.email)||"Usuario"}function ZS(){const{profile:n}=G.get();return n&&(n.cargo||n.roleName)||"Asesor"}const eR=["bandeja","pipeline","agenda","reportes","contactos","config","resenas"];function rv(){const n=(location.hash||"").replace(/^#\/?/,""),[e]=n.split("/");return eR.includes(e)?e:"bandeja"}function tR(n){location.hash!==`#/${n}`&&(location.hash=`#/${n}`)}function nR(n){const e=()=>n(rv());return window.addEventListener("hashchange",e),()=>window.removeEventListener("hashchange",e)}function u(n,e={},t=[]){const r=document.createElement(n);for(const[s,i]of Object.entries(e))i==null||i===!1||(s==="class"?r.className=i:s==="html"?r.innerHTML=i:s==="text"?r.textContent=i:s==="dataset"?Object.assign(r.dataset,i):s==="style"&&typeof i=="object"?Object.assign(r.style,i):s.startsWith("on")&&typeof i=="function"?r.addEventListener(s.slice(2).toLowerCase(),i):r.setAttribute(s,i===!0?"":String(i)));for(const s of[].concat(t))s==null||s===!1||s===""||r.append(s.nodeType?s:document.createTextNode(String(s)));return r}function _e(n){for(;n&&n.firstChild;)n.removeChild(n.firstChild);return n}let Jr=null;function sv(n){Jr&&!Jr.contains(n.target)&&Ea()}function iv(n){n.key==="Escape"&&Ea()}function Ea(){Jr&&(Jr.remove(),Jr=null,document.removeEventListener("mousedown",sv,!0),window.removeEventListener("keydown",iv,!0))}function Dt(n,e,t,r={}){Ea();const s=u("div",{class:"popover",role:"menu"});r.title&&s.append(u("div",{class:"popover__title",text:r.title})),e.forEach(o=>{if(o.divider){s.append(u("div",{class:"popover__divider"}));return}const c=u("button",{class:"popover__item"+(o.active?" is-active":""),type:"button",role:"menuitem"},[o.icon?u("span",{class:"popover__icon",text:o.icon}):null,u("span",{class:"u-grow u-truncate",text:o.label}),o.hint?u("span",{class:"popover__hint u-caption",text:o.hint}):null]);c.addEventListener("click",l=>{l.stopPropagation(),Ea(),t(o)}),s.append(c)}),document.body.append(s),rR(s,n),Jr=s,setTimeout(()=>{document.addEventListener("mousedown",sv,!0),window.addEventListener("keydown",iv,!0)},0);const i=s.querySelector(".popover__item");i&&i.focus()}function rR(n,e){const t=e.getBoundingClientRect(),r=n.offsetWidth,s=n.offsetHeight;let i=t.bottom+6,o=t.right-r;o<8&&(o=8),o+r>window.innerWidth-8&&(o=window.innerWidth-r-8),i+s>window.innerHeight-8&&(i=t.top-s-6),n.style.top=`${Math.max(8,i)}px`,n.style.left=`${Math.max(8,o)}px`}function gs(n){const e=String(n||"").trim().split(/\s+/).filter(Boolean);return e.length?e.length===1?e[0].slice(0,2).toUpperCase():(e[0][0]+e[e.length-1][0]).toUpperCase():"?"}function sR(n){return String(n||"").replace(/\D/g,"")}function ov(n,e){const t=sR(n);if(!t)return"";const r=e?"?text="+encodeURIComponent(e):"";return"https://wa.me/"+t+r}function av(n){if(!n)return 1/0;const e=new Date(n).getTime();return Number.isNaN(e)?1/0:Date.now()-e}function _s(n){const e=av(n);return e===1/0?1/0:e/864e5}function lr(n){const e=av(n);if(e===1/0)return"—";const t=Math.floor(e/6e4);if(t<1)return"ahora";if(t<60)return`hace ${t} min`;const r=Math.floor(t/60);if(r<24)return`hace ${r} h`;const s=Math.floor(r/24);return s===1?"ayer":s<7?`hace ${s} d`:new Date(n).toLocaleDateString("es-CO",{day:"numeric",month:"short"})}function iR(n){if(!n)return"—";const e=new Date(n);return Number.isNaN(e.getTime())?"—":e.toLocaleString("es-CO",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}function Hc(n){const e=Math.abs(n),t=Math.round(e/6e4);if(t<60)return`${t} min`;const r=Math.floor(t/60),s=t%60;return s?`${r} h ${s} min`:`${r} h`}function Yn(n){const e=Number(n)||0;if(!e)return"";if(e>=1e6){const t=e/1e6;return"$"+(t%1?t.toFixed(1).replace(".",","):t.toFixed(0))+" M"}return e>=1e3?"$"+Math.round(e/1e3)+" K":"$"+e}function Ta(n){return String(n||"").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu,"")}const oR="0.4.1",aR=[{id:"bandeja",label:"Bandeja",icon:"📥",ready:!0},{id:"pipeline",label:"Pipeline",icon:"🎯",ready:!0},{id:"agenda",label:"Agenda",icon:"📅",ready:!0},{id:"reportes",label:"Reportes",icon:"📊",ready:!0},{id:"contactos",label:"Contactos",icon:"👤",ready:!0},{id:"config",label:"Disponibilidad",icon:"⚙️",ready:!0,perm:"calendar.config"},{id:"resenas",label:"Reseñas",icon:"⭐",ready:!0,perm:"reviews.read"}],Kc={bandeja:"Bandeja Inteligente",pipeline:"Pipeline de ventas",agenda:"Agenda",reportes:"Reportes y KPIs",contactos:"Contactos",config:"Disponibilidad de citas",resenas:"Reseñas del sitio"};function cR(n){const e={},t=u("div",{class:"sidebar__brand"},[u("span",{class:"sidebar__logo",text:"ALTORRA"}),u("span",{class:"sidebar__sub u-caption",text:"CRM"})]),r=u("nav",{class:"sidebar__nav","aria-label":"Secciones"});aR.filter(k=>!k.perm||ft(k.perm)).forEach(k=>{const T=u("button",{class:"navitem",type:"button",disabled:!k.ready},[u("span",{class:"navitem__icon","aria-hidden":"true",text:k.icon}),u("span",{class:"navitem__label",text:k.label}),k.ready?null:u("span",{class:"navitem__soon",text:"Pronto"})]);k.ready&&T.addEventListener("click",()=>tR(k.id)),e[k.id]=T,r.append(T)});const s=u("aside",{class:"sidebar"},[t,r,u("div",{class:"sidebar__foot u-caption u-faint"},[`v${oR} · Fase 4`])]),i=u("h1",{class:"topbar__h",text:Kc.bandeja}),o=u("span",{class:"topbar__crumb u-caption u-faint",text:G.get().mock?"modo demo":"tiempo real"}),c=u("div",{class:"topbar__title"},[i,o]),l=u("button",{class:"icon-btn",type:"button","aria-label":"Cambiar tema"},[u("span",{"aria-hidden":"true",text:G.get().theme==="dark"?"☀️":"🌙"})]);l.addEventListener("click",()=>{const k=my();l.firstChild.textContent=k==="dark"?"☀️":"🌙"});const h=u("button",{class:"usermenu",type:"button","aria-haspopup":"menu"},[u("span",{class:"avatar avatar--sm","aria-hidden":"true",text:gs(Gc())}),u("span",{class:"usermenu__meta"},[u("span",{class:"usermenu__name u-truncate",text:Gc()}),u("span",{class:"usermenu__role u-caption u-faint u-truncate",text:ZS()})])]);h.addEventListener("click",()=>{Dt(h,[{value:"logout",label:"Cerrar sesión",icon:"🚪"}],k=>{k.value==="logout"&&XS()},{title:Gc()})});const p=u("header",{class:"topbar"},[c,u("div",{class:"topbar__actions u-row"},[l,h])]),m=u("main",{class:"outlet",id:"outlet"}),g=u("div",{id:"detail-root"}),E=u("div",{class:"app-shell"},[s,u("div",{class:"app-main"},[p,m]),g]);_e(n),n.removeAttribute("aria-busy"),n.append(E);function S(k){Object.entries(e).forEach(([T,L])=>{const R=T===k;L.classList.toggle("is-active",R),R?L.setAttribute("aria-current","page"):L.removeAttribute("aria-current")}),i.textContent=Kc[k]||Kc.bandeja}return{outlet:m,detailRoot:g,setActive:S}}function lR(n){const e=u("input",{class:"input",type:"email",placeholder:"correo@altorracars.com",autocomplete:"username",required:!0,"aria-label":"Correo"}),t=u("input",{class:"input",type:"password",placeholder:"Contraseña",autocomplete:"current-password",required:!0,"aria-label":"Contraseña"}),r=u("div",{class:"login__error",role:"alert",hidden:!0}),s=u("button",{class:"btn btn--gold btn--block",type:"submit"},["Entrar"]),i=u("form",{class:"login__form"},[u("label",{class:"field"},[u("span",{class:"field__label",text:"Correo"}),e]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Contraseña"}),t]),r,s]);i.addEventListener("submit",async c=>{c.preventDefault(),r.hidden=!0,s.disabled=!0,s.textContent="Entrando…";try{await JS(e.value,t.value)}catch{r.textContent=G.get().authError||"No se pudo iniciar sesión.",r.hidden=!1,s.disabled=!1,s.textContent="Entrar"}});const o=u("div",{class:"login surface"},[u("div",{class:"login__brand"},[u("span",{class:"login__logo",text:"ALTORRA"}),u("span",{class:"login__tag u-caption u-faint",text:"CRM · Bandeja Inteligente"})]),u("h1",{class:"login__title",text:"Bienvenido"}),u("p",{class:"login__lead u-muted",text:"Inicia sesión para gestionar tus clientes."}),i,u("div",{class:"login__foot u-caption u-faint",text:"Acceso restringido al equipo de Altorra Cars."})]);_e(n),n.removeAttribute("aria-busy"),n.append(u("div",{class:"login-wrap"},[o])),setTimeout(()=>e.focus(),50)}const uR=()=>document.getElementById("toast-root"),gp={ok:"✓",error:"⚠",info:"ℹ"};function K(n,e="info",t=3200){const r=uR();if(!r)return;const s=document.createElement("div");s.className=`toast toast--${e}`,s.setAttribute("role",e==="error"?"alert":"status");const i=document.createElement("span");i.setAttribute("aria-hidden","true"),i.textContent=gp[e]||gp.info;const o=document.createElement("span");o.className="u-grow",o.textContent=n,s.append(i,o),r.appendChild(s);const c=()=>{s.classList.add("is-leaving"),s.addEventListener("animationend",()=>s.remove(),{once:!0})},l=setTimeout(c,t);s.addEventListener("click",()=>{clearTimeout(l),c()})}const dR=["financiacion","financiación","compra","test_drive","test-drive","cotizacion","cotización"],hR=["cita","test_drive","test-drive","visita","agendar","peritaje"],fR=["financiacion","financiación","consignacion","consignación","consignacion_venta","compra","venta","cotizacion","cotización"],pR=["pqr","reclamo","queja","peticion","petición","garantia","garantía","soporte"],mR={cita:{label:"Cita",icon:"📅",badge:"info"},solicitud:{label:"Solicitud",icon:"📝",badge:"gold"},pqr:{label:"PQR",icon:"⚠️",badge:"danger"},lead:{label:"Lead",icon:"✨",badge:""}};function uc(n){const e=String(n.sourceDetail||"").toLowerCase(),t=String(n.source||"").toLowerCase();let r="lead";return pR.some(s=>e.includes(s)||t.includes(s))?r="pqr":t.includes("cita")||hR.some(s=>e.includes(s))?r="cita":fR.some(s=>e.includes(s))&&(r="solicitud"),{type:r,...mR[r]}}function sd(n){const e=String(n.sourceDetail||"").toLowerCase();return dR.some(t=>e.includes(t))||!!n.vehicleOfInterestId}const gR={whatsapp:{label:"WhatsApp",icon:"🟢"},facebook:{label:"Facebook",icon:"📘"},instagram:{label:"Instagram",icon:"📸"},tiktok:{label:"TikTok",icon:"🎵"},marketplace:{label:"Marketplace",icon:"🛒"},llamada:{label:"Llamada",icon:"📞"},presencial:{label:"Presencial",icon:"🏬"},referido:{label:"Referido",icon:"🤝"},bot:{label:"ALTOR Bot",icon:"🤖"},cuenta:{label:"Cuenta",icon:"👤"},newsletter:{label:"Newsletter",icon:"✉️"},cita:{label:"Cita web",icon:"📅"},web:{label:"Web",icon:"🌐"}};function Pi(n){const e=String(n.source||"").toLowerCase();let t="web";return e.includes("whatsapp")||e.includes("wsp")||e.includes("wa.me")?t="whatsapp":e.includes("facebook")||e.includes("meta")||e==="fb"?t="facebook":e.includes("instagram")||e==="ig"?t="instagram":e.includes("tiktok")||e==="tt"?t="tiktok":e.includes("marketplace")||e.includes("mercadolibre")||e.includes("tucarro")?t="marketplace":e.includes("llamada")||e.includes("telefono")||e.includes("teléfono")||e.includes("call")?t="llamada":e.includes("presencial")||e.includes("walk")||e.includes("showroom")||e.includes("local")?t="presencial":e.includes("referido")||e.includes("referral")||e.includes("recomendado")?t="referido":e.includes("bot")||e.includes("concierge")||e.includes("altor")?t="bot":e.includes("cuenta")||e.includes("registro")||e.includes("account")||e.includes("signup")?t="cuenta":e.includes("news")||e.includes("subscri")||e.includes("suscri")?t="newsletter":e.includes("cita")&&(t="cita"),{key:t,...gR[t]}}const _R=[{id:"whatsapp",label:"WhatsApp",icon:"🟢"},{id:"facebook",label:"Facebook (Meta)",icon:"📘"},{id:"instagram",label:"Instagram",icon:"📸"},{id:"tiktok",label:"TikTok",icon:"🎵"},{id:"marketplace",label:"Marketplace",icon:"🛒"},{id:"llamada",label:"Llamada",icon:"📞"},{id:"presencial",label:"Presencial / Showroom",icon:"🏬"},{id:"referido",label:"Referido",icon:"🤝"},{id:"web",label:"Web (otro)",icon:"🌐"}],vR=[{id:"compra",label:"Compra"},{id:"financiacion",label:"Financiación"},{id:"cita",label:"Cita / Test drive"},{id:"consignacion_venta",label:"Vende su carro"},{id:"peritaje",label:"Peritaje"},{id:"consulta",label:"Consulta general"}],Io={cita:30*60*1e3,pqr:60*60*1e3,solicitud:2*60*60*1e3,lead:24*60*60*1e3};function cv(n){const e=vs(n.status),{type:t}=uc(n);let r=n.slaDueAt?new Date(n.slaDueAt).getTime():null;r||(r=(n.createdAt?new Date(n.createdAt).getTime():Date.now())+(Io[t]||Io.lead));const s=r-Date.now(),i=Io[t]||Io.lead;let o="ok";return e?o="ok":s<=0?o="late":s<i*.25&&(o="warn"),{state:o,dueAt:r,remainingMs:s,closed:e}}const Vl=[{id:"nuevo",label:"Nuevo",badge:"gold"},{id:"contactado",label:"Contactado",badge:"info"},{id:"convertido",label:"Convertido",badge:"ok"},{id:"descartado",label:"Descartado",badge:""}],yR=[{id:"inalcanzable",label:"Inalcanzable (no responde)"},{id:"no_califica",label:"No califica (sin presupuesto/intención)"},{id:"duplicado",label:"Duplicado"},{id:"ya_compro_en_otra_parte",label:"Ya compró en otra parte"},{id:"spam_prueba",label:"Spam / prueba"}],bR={calificado:{id:"calificado",label:"Calificado (v2)",badge:"ok"},no_calificado:{id:"no_calificado",label:"No calificado (v2)",badge:""},perdido:{id:"perdido",label:"Perdido (v2)",badge:"danger"}},wR=Vl.reduce((n,e)=>(n[e.id]=e,n),{});function zo(n){return wR[n]||bR[n]||{id:n||"nuevo",label:n||"Nuevo",badge:""}}function vs(n){return n==="convertido"||n==="descartado"||n==="perdido"||n==="no_calificado"}function lv(n){return!n.status||n.status==="nuevo"}const Ol={intent:.3,interactions:.18,recency:.22,frequency:.12,economic:.07,age:.06,engagement:.05},rr=n=>Math.max(0,Math.min(1,n));function IR(n){const e=String(n.sourceDetail||"").toLowerCase();let t=.25;return sd(n)?t=1:/(consignacion|consignación|peritaje|venta)/.test(e)?t=.6:(/(consulta|info|general)/.test(e)||!e)&&(t=.3),n.vehicleOfInterestId&&(t=Math.min(1,t+.15)),rr(t)}function ER(n){let e=0;for(const t of n){const r=`${t.subject||""} ${t.body||""}`;if(!/financ/i.test(r))continue;const s=(r.match(/\d[\d.,]{5,}/g)||[]).map(i=>parseInt(i.replace(/\D/g,""),10)).filter(i=>i>0);s.length&&(e=Math.max(e,Math.max(...s)/5e7))}return rr(e)}function TR(n){const e=new Set;for(const t of n){const r=t.createdAt;r&&(_s(r)>30||e.add(String(r).slice(0,10)))}return rr(e.size/8)}function uv(n,e=[],t=null){const r=Array.isArray(e)?e:[],s={intent:IR(n),interactions:rr(r.length/6),recency:n.lastActivityAt?rr(1-_s(n.lastActivityAt)/30):0,frequency:TR(r),economic:ER(r),age:n.createdAt?rr(_s(n.createdAt)/60):0,engagement:t&&Number(t.score)?rr(t.score/100):0};let i=0;for(const c of Object.keys(Ol))i+=s[c]*Ol[c];const o=Math.round(i*100);return{score:o,rating:AR(o),factors:s}}function AR(n){return n>=70?"hot":n>=40?"warm":"cold"}const Xr={hot:{label:"Caliente",icon:"🔥",cls:"temp--hot"},warm:{label:"Tibio",icon:"🌤️",cls:"temp--warm"},cold:{label:"Frío",icon:"❄️",cls:"temp--cold"}},_p={intent:"Intención",interactions:"Interacciones",recency:"Recencia",frequency:"Frecuencia",economic:"Capacidad econ.",age:"Antigüedad",engagement:"Engagement"},SR=Ol;function dv(n,e={}){const t=Number(e.score)||0,{type:r}=uc(n),s=_s(n.createdAt),i=_s(n.lastActivityAt),o=lv(n),c=vs(n.status),l=[{id:"confirm_appointment",priority:95,when:r==="cita"&&!c&&o,label:"Confirmar cita",reason:"Cita pendiente de confirmación",icon:"📅"},{id:"reach_hot_lead",priority:90,when:t>=70&&o&&!c,label:"Contactar ya",reason:"Lead caliente sin respuesta",icon:"🔥"},{id:"send_quote",priority:88,when:sd(n)&&t>=55&&!c,label:"Enviar cotización",reason:"Interés de compra/financiación",icon:"🧾"},{id:"assign_asesor",priority:85,when:!n.ownerId&&!c,label:"Asignar asesor",reason:"Sin asesor asignado",icon:"🙋"},{id:"first_touch",priority:70,when:o&&s<2&&!c,label:"Primer contacto",reason:"Lead nuevo sin trabajar",icon:"👋"},{id:"whatsapp_followup",priority:60,when:t>=40&&t<70&&i>=2&&i<30&&!c,label:"Seguimiento WhatsApp",reason:"Lead tibio enfriándose",icon:"💬"},{id:"reactivate",priority:50,when:i>=30&&i!==1/0&&!c,label:"Reactivar con oferta",reason:"Inactivo +30 días",icon:"🎯"},{id:"nurture",priority:15,when:!c,label:"Nutrir relación",reason:"Sin acción urgente",icon:"🌱"},{id:"archived",priority:5,when:c,label:"Cerrado",reason:"Lead cerrado",icon:"✅"}],p=l.filter(m=>m.when).sort((m,g)=>g.priority-m.priority)[0]||l[l.length-1];return{id:p.id,label:p.label,reason:p.reason,icon:p.icon,priority:p.priority}}function hv(n,e=[]){const{score:t,rating:r,factors:s}=uv(n,e,null);return{...n,_score:t,_rating:r,_factors:s,_type:uc(n),_channel:Pi(n),_sla:cv(n),_nba:dv(n,{score:t})}}function Eo(n){return n.map(e=>hv(e))}const Ll=[{id:"calientes",label:"Calientes sin contestar",icon:"🔥"},{id:"mios",label:"Mis asignados",icon:"👤"},{id:"sin_asignar",label:"Sin asignar",icon:"🆕"},{id:"todo",label:"Todo",icon:"📥"}];function fv(n,e,t){switch(e){case"calientes":return lv(n)&&!vs(n.status)&&(n._rating==="hot"||sd(n));case"mios":return n.ownerId===t;case"sin_asignar":return!n.ownerId&&!vs(n.status);case"todo":default:return!0}}function RR(n,e){const t={};for(const r of Ll)t[r.id]=0;for(const r of n)for(const s of Ll)fv(r,s.id,e)&&t[s.id]++;return t}const To={late:0,warn:1,ok:2};function CR(n,e){const t=n._sla&&n._sla.state||"ok",r=e._sla&&e._sla.state||"ok";return To[t]!==To[r]?To[t]-To[r]:e._score!==n._score?e._score-n._score:new Date(e.createdAt||0)-new Date(n.createdAt||0)}function kR(n,{type:e,channel:t,status:r}){return n.filter(s=>!(e&&s._type.type!==e||t&&s._channel.key!==t||r&&(s.status||"nuevo")!==r))}function PR(n,e){const t=Ta(e).trim();return t?n.filter(r=>Ta([r.fullName,r.email,r.phone,r.sourceDetail,r.source].join(" ")).includes(t)):n}function xR(n,e=Date.now()){if((n.status||"nuevo")!=="nuevo")return null;const t=new Date(n.createdAt||0).getTime();if(!t)return null;const r=Math.max(0,Math.floor((e-t)/6e4));return{mins:r,state:r>=60?"late":r>=45?"warn":"ok"}}function NR(n,{queue:e,uid:t,filters:r,search:s,showClosed:i=!1}){let o=n.filter(l=>fv(l,e,t));o=kR(o,r),o=PR(o,s);let c=0;if(!i&&!r.status){const l=o.filter(h=>!vs(h.status)&&!h.archived);c=o.length-l.length,o=l}return o.sort(CR),{rows:o,hiddenClosed:c}}const yr=()=>new Date().toISOString(),id=n=>({id:n.id,...n.data()});function DR({pageSize:n=40,onData:e,onError:t}){let r=null;const s=lt(Se(ie,"leads"),wt("createdAt","desc"),It(n));return{unsubscribe:an(s,o=>{const c=o.docs.map(id);r=o.docs[o.docs.length-1]||null,e(c,{hasMore:o.size>=n})},o=>{t&&t(o)}),getLastDoc:()=>r}}async function VR({pageSize:n=40,after:e}){if(!e)return{rows:[],lastDoc:null,hasMore:!1};const t=lt(Se(ie,"leads"),wt("createdAt","desc"),k0(e),It(n)),r=await rn(t);return{rows:r.docs.map(id),lastDoc:r.docs[r.docs.length-1]||null,hasMore:r.size>=n}}async function OR(){const e=(await rn(Se(ie,"usuarios"))).docs.map(t=>{const r=t.data();return{uid:t.id,nombre:r.nombre||r.email||"Usuario",cargo:r.cargo||r.roleName||""}}).sort((t,r)=>t.nombre.localeCompare(r.nombre,"es"));return G.set({team:e}),e}async function LR(n,e){await pt(ke(ie,"leads",n),{ownerId:e?e.uid:null,ownerName:e?e.nombre:null,updatedAt:yr(),updatedBy:br(),_version:zt(1)})}async function MR(n,e,t={},r={}){if(t&&t.convertedTo&&t.convertedTo.dealId)throw new Error("Este lead ya es un negocio: gestiónalo en el Pipeline.");const s=yr();await pt(ke(ie,"leads",n),{...r,status:e,lastActivityAt:s,updatedAt:s,updatedBy:br(),_version:zt(1)}),await jt(Se(ie,"activities"),{type:"status_change",subject:"Cambio de estado → "+e,body:"",status:"closed",direction:"outbound",relatedTo:{type:"lead",id:n,name:t.fullName||""},ownerId:br(),createdAt:s,_version:1})}async function vp(n,{type:e="nota",subject:t="",body:r="",direction:s="outbound",name:i=""}){await jt(Se(ie,"activities"),{type:e,subject:t,body:r,status:"closed",direction:s,relatedTo:{type:"lead",id:n,name:i},ownerId:br(),createdAt:yr(),_version:1})}async function FR(n,{subject:e,dueAt:t,name:r=""}){await jt(Se(ie,"activities"),{type:"tarea",subject:e,body:"",status:"open",direction:"outbound",dueAt:t,relatedTo:{type:"lead",id:n,name:r},ownerId:br(),createdAt:yr(),_version:1})}async function UR(){const n=new Date;n.setHours(23,59,59,999);const e=lt(Se(ie,"activities"),Dn("dueAt","<=",n.toISOString()),wt("dueAt","desc"),It(80));return(await rn(e)).docs.map(id).filter(r=>r.status==="open"&&(r.type==="tarea"||r.type==="cita")).sort((r,s)=>String(r.dueAt).localeCompare(String(s.dueAt)))}async function BR(n){await pt(ke(ie,"activities",n),{status:"closed",closedAt:yr(),closedBy:br()})}async function $R(n,e=!0){await pt(ke(ie,"leads",n),{archived:e,archivedAt:e?yr():null,updatedAt:yr(),updatedBy:br(),_version:zt(1)})}async function qR(n){return(await Sr(Rr,"crmPurgeLead")({leadId:n})).data}function br(){const n=G.get().user;return n?n.uid:null}async function jR(n){const e=G.get().user?G.get().user.uid:null,t=["manual",n.trafico,n.campana].filter(Boolean);return(await jt(Se(ie,"solicitudes"),{nombre:n.nombre||"",email:(n.email||"").trim().toLowerCase(),telefono:n.telefono||"",prefijoPais:n.prefijoPais||"+57",origen:n.canal||"manual",tipo:n.interes||"consulta",vehiculoId:n.vehiculoId||null,kind:"lead",comentarios:n.notas||"",consentGiven:n.consentGiven===!0,tags:t,source:{page:"manual",campaign:n.campana||null,traffic:n.trafico||null},clientCategory:"manual",createdAt:new Date().toISOString(),_manual:!0,_createdByUid:e})).id}const sr=n=>new Date(Date.now()-n*6e4).toISOString(),De=n=>sr(n*60),oe=n=>sr(n*60*24),zR=[{uid:"u_ceo",nombre:"Rodrigo (CEO)",cargo:"CEO"},{uid:"u_ana",nombre:"Ana Restrepo",cargo:"Asesora comercial"},{uid:"u_luis",nombre:"Luis Pérez",cargo:"Asesor comercial"}],od=[{id:"l1",fullName:"María Fernanda Gómez",email:"mafe.gomez@gmail.com",phone:"+573012345678",source:"financiacion",sourceDetail:"financiacion",vehicleOfInterestId:"mazda-cx5-2021",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:sr(-40),contactId:"email_mafe_gomez_gmail_com",createdAt:sr(18),lastActivityAt:sr(18),_version:1},{id:"l2",fullName:"Carlos Andrés Salcedo",email:"casalcedo@outlook.com",phone:"+573159876543",source:"cita",sourceDetail:"test_drive",vehicleOfInterestId:"toyota-corolla-2022",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:sr(5),contactId:"email_casalcedo_outlook_com",createdAt:De(1),lastActivityAt:De(1),_version:1},{id:"l3",fullName:"Diana Ramírez",email:"diana.r@hotmail.com",phone:"+573201112233",source:"web",sourceDetail:"compra",vehicleOfInterestId:"chevrolet-tracker-2023",status:"contactado",rating:"cold",score:0,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:De(-1),contactId:"email_diana_r_hotmail_com",createdAt:De(5),lastActivityAt:De(2),_version:2},{id:"l4",fullName:"Jhon Jairo Mosquera",email:"",phone:"+573044455667",source:"whatsapp",sourceDetail:"consulta",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:De(-3),contactId:"phone_573044455667",createdAt:De(8),lastActivityAt:De(8),_version:1},{id:"l5",fullName:"Laura Valentina Ortiz",email:"lauraortiz@gmail.com",phone:"+573186677889",source:"bot",sourceDetail:"financiacion",vehicleOfInterestId:"kia-sportage-2022",status:"contactado",rating:"cold",score:0,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:oe(-1),contactId:"email_lauraortiz_gmail_com",createdAt:oe(1),lastActivityAt:De(20),_version:3},{id:"l6",fullName:"Pedro Nel Arango",email:"pnarango@empresa.co",phone:"+573017788990",source:"cuenta",sourceDetail:"registro",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:oe(-1),contactId:"email_pnarango_empresa_co",createdAt:oe(2),lastActivityAt:oe(2),_version:1},{id:"l7",fullName:"Sofía Mejía",email:"sofia.mejia@gmail.com",phone:"+573123344556",source:"newsletter",sourceDetail:"suscripcion",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:oe(-3),contactId:"email_sofia_mejia_gmail_com",createdAt:oe(4),lastActivityAt:oe(4),_version:1},{id:"l8",fullName:"Andrés Felipe Cuesta",email:"afcuesta@gmail.com",phone:"+573009988776",source:"web",sourceDetail:"consignacion_venta",vehicleOfInterestId:null,status:"calificado",rating:"cold",score:0,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:oe(-2),contactId:"email_afcuesta_gmail_com",createdAt:oe(6),lastActivityAt:oe(1),_version:4},{id:"l9",fullName:"Catalina Ríos",email:"cata.rios@gmail.com",phone:"+573145566778",source:"web",sourceDetail:"peritaje",vehicleOfInterestId:"nissan-frontier-2020",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:oe(-10),contactId:"email_cata_rios_gmail_com",createdAt:oe(12),lastActivityAt:oe(35),_version:1},{id:"l10",fullName:"Gloria Patiño",email:"glopa@gmail.com",phone:"+573162233445",source:"web",sourceDetail:"reclamo",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:De(-2),contactId:"email_glopa_gmail_com",createdAt:De(3),lastActivityAt:De(3),_version:1},{id:"l11",fullName:"Mauricio Bedoya",email:"mbedoya@gmail.com",phone:"+573024455661",source:"facebook",sourceDetail:"compra",vehicleOfInterestId:"mazda-cx5-2021",status:"convertido",rating:"hot",score:78,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:oe(9),contactId:"email_mbedoya_gmail_com",convertedTo:{dealId:"d6"},createdAt:oe(10),lastActivityAt:oe(3),_version:5},{id:"l12",fullName:"Yuliana Castaño",email:"yulycastano@gmail.com",phone:"+573135566779",source:"whatsapp",sourceDetail:"financiacion",vehicleOfInterestId:"toyota-hilux-2020",status:"convertido",rating:"hot",score:82,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:oe(14),contactId:"email_yulycastano_gmail_com",convertedTo:{dealId:"d7"},createdAt:oe(15),lastActivityAt:oe(5),_version:6},{id:"l13",fullName:"Hernán Darío Loaiza",email:"hdloaiza@gmail.com",phone:"+573017788123",source:"web",sourceDetail:"compra",vehicleOfInterestId:"renault-duster-2022",status:"perdido",rating:"warm",score:45,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:oe(19),contactId:"email_hdloaiza_gmail_com",createdAt:oe(20),lastActivityAt:oe(8),_version:3},{id:"l14",fullName:"Paola Andrea Suárez",email:"pasuarez@gmail.com",phone:"+573156677001",source:"newsletter",sourceDetail:"suscripcion",vehicleOfInterestId:null,status:"no_calificado",rating:"cold",score:12,ownerId:null,ownerName:null,slaDueAt:oe(24),contactId:"email_pasuarez_gmail_com",createdAt:oe(25),lastActivityAt:oe(25),_version:2},{id:"l15",fullName:"Julián Marín",email:"julianmarin@gmail.com",phone:"+573008811223",source:"referido",sourceDetail:"compra",vehicleOfInterestId:"nissan-frontier-2020",status:"convertido",rating:"hot",score:74,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:oe(21),contactId:"email_julianmarin_gmail_com",convertedTo:{dealId:"d8"},createdAt:oe(22),lastActivityAt:oe(9),_version:4}],GR={l1:[{id:"a1",type:"solicitud_inbound",subject:"Nueva solicitud: financiacion",body:"Quiero financiar la Mazda CX-5. Cuota inicial 25.000.000, ingresos 6.000.000 mensuales.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l1",name:"María Fernanda Gómez"},createdAt:sr(18),_version:1}],l3:[{id:"a2",type:"solicitud_inbound",subject:"Nueva solicitud: compra",body:"Interesada en la Chevrolet Tracker.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:De(5),_version:1},{id:"a3",type:"whatsapp",subject:"WhatsApp enviado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:De(2),_version:1},{id:"a4",type:"status_change",subject:"Cambio de estado → contactado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:De(2),_version:1}],l5:[{id:"a5",type:"solicitud_inbound",subject:"Nueva lead: financiacion",body:"Bot ALTOR: pregunta por financiación de la Kia Sportage.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},createdAt:oe(1),_version:1},{id:"a6",type:"whatsapp",subject:"WhatsApp enviado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},createdAt:De(20),_version:1}]},xi={};od.forEach(n=>{const e=n.status==="convertido"?"customer":n.source==="newsletter"?"subscriber":"lead";xi[n.contactId]={id:n.contactId,fullName:n.fullName,email:n.email,phone:n.phone,type:e==="customer"?"cliente":"lead",source:n.source,score:0,rating:"cold",lifecycleStage:e,clienteUid:null,consent:{email:n.source!=="web",whatsapp:n.source!=="web",calls:!1,askedAt:n.createdAt,source:n.source,policyVersion:"v1"},doNotContact:n.source==="web",tags:[],createdAt:n.createdAt,lastActivityAt:n.lastActivityAt,_version:1}});xi.email_camila_lectora_gmail_com={id:"email_camila_lectora_gmail_com",fullName:"Camila Lectora",email:"camila.lectora@gmail.com",phone:"",type:"lead",source:"newsletter",score:0,rating:"cold",lifecycleStage:"subscriber",clienteUid:null,consent:{email:!0,whatsapp:!1,calls:!1,askedAt:oe(3),source:"newsletter",policyVersion:"v1"},doNotContact:!1,tags:["newsletter"],createdAt:oe(3),lastActivityAt:oe(3),_version:1};const Go={},Aa=()=>od.map(n=>({...n})),Ml=()=>zR.map(n=>({...n})),HR=n=>(GR[n]||[]).map(e=>({...e})),KR=n=>xi[n]?{...xi[n]}:null,WR=()=>Object.values(xi).map(n=>({...n})),yp=n=>(Go[n]||[]).map(e=>({...e}));function QR(n,e){Go[n]||(Go[n]=[]),Go[n].unshift({id:"n"+Date.now(),...e})}let YR=100;const oi=[{id:"d1",name:"Diana Ramírez · Chevrolet Tracker 2023",contactName:"Diana Ramírez",contactId:"email_diana_r_hotmail_com",leadId:"l3",vehicleId:"chevrolet-tracker-2023",vehicleName:"Chevrolet Tracker 2023",pipelineId:"ventas",stageId:"cuadrando_cita",stageName:"Cuadrando cita",status:"open",amount:82e6,currency:"COP",probability:.2,weightedAmount:164e5,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"web",lastActivityAt:De(2),createdAt:De(5),_version:2},{id:"d2",name:"Laura Valentina Ortiz · Kia Sportage 2022",contactName:"Laura Valentina Ortiz",contactId:"email_lauraortiz_gmail_com",leadId:"l5",vehicleId:"kia-sportage-2022",vehicleName:"Kia Sportage 2022",pipelineId:"ventas",stageId:"cita_fijada",stageName:"Cita fijada",status:"open",amount:95e6,currency:"COP",probability:.35,weightedAmount:3325e4,ownerId:"u_luis",ownerName:"Luis Pérez",source:"bot",lastActivityAt:De(20),createdAt:oe(1),_version:3},{id:"d3",name:"Andrés Felipe Cuesta · Mazda 3 2021",contactName:"Andrés Felipe Cuesta",contactId:"email_afcuesta_gmail_com",leadId:"l8",vehicleId:"mazda-3-2021",vehicleName:"Mazda 3 2021",pipelineId:"ventas",stageId:"visita_test_drive",stageName:"Visita / Test drive",status:"open",amount:68e6,currency:"COP",probability:.5,weightedAmount:34e6,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"web",lastActivityAt:oe(18),createdAt:oe(20),_version:5},{id:"d4",name:"Roberto Gómez · Toyota Hilux 2020",contactName:"Roberto Gómez",contactId:"phone_573001239876",leadId:null,vehicleId:"toyota-hilux-2020",vehicleName:"Toyota Hilux 2020",pipelineId:"ventas",stageId:"negociacion",stageName:"Negociación",status:"open",amount:135e6,currency:"COP",probability:.7,weightedAmount:945e5,ownerId:"u_luis",ownerName:"Luis Pérez",source:"whatsapp",lastActivityAt:De(6),createdAt:oe(8),_version:7},{id:"d5",name:"Sandra Milena Vélez · Renault Duster 2022",contactName:"Sandra Milena Vélez",contactId:"email_smvelez_gmail_com",leadId:null,vehicleId:"renault-duster-2022",vehicleName:"Renault Duster 2022",pipelineId:"ventas",stageId:"cuadrando_cita",stageName:"Cuadrando cita",status:"open",amount:0,currency:"COP",probability:.2,weightedAmount:0,ownerId:null,ownerName:null,source:"cuenta",lastActivityAt:De(1),createdAt:De(1),_version:1},{id:"d9",name:"Patricia Lemus · Toyota Hilux 2020",contactName:"Patricia Lemus",contactId:"phone_573009871234",leadId:null,vehicleId:"toyota-hilux-2020",vehicleName:"Toyota Hilux 2020",pipelineId:"ventas",stageId:"cita_fijada",stageName:"Cita fijada",status:"open",amount:132e6,currency:"COP",probability:.35,weightedAmount:462e5,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"walkin",lastActivityAt:De(3),createdAt:oe(2),_version:2},{id:"d6",name:"Mauricio Bedoya · Mazda CX-5 2021",contactName:"Mauricio Bedoya",contactId:"email_mbedoya_gmail_com",leadId:"l11",vehicleId:"mazda-cx5-2021",vehicleName:"Mazda CX-5 2021",pipelineId:"ventas",stageId:"vendido",stageName:"Vendido",status:"won",amount:78e6,currency:"COP",probability:1,weightedAmount:78e6,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"facebook",lastActivityAt:oe(3),createdAt:oe(10),_version:6,tipoPago:"financiado",wonAt:oe(3),postventa:{entrega:!0,traspaso_runt:!1,tramites:!1},commissionSnapshot:{amount:78e6,tipoPago:"financiado",ownerId:"u_ana",wonAt:oe(3)},recibeVehiculo:{marca:"chevrolet",modelo:"Spark GT",placa:"XYZ789",valorEstimado:28e6}},{id:"d7",name:"Yuliana Castaño · Toyota Hilux 2020",contactName:"Yuliana Castaño",contactId:"email_yulycastano_gmail_com",leadId:"l12",vehicleId:"toyota-hilux-2020",vehicleName:"Toyota Hilux 2020",pipelineId:"ventas",stageId:"vendido",stageName:"Vendido",status:"won",amount:112e6,currency:"COP",probability:1,weightedAmount:112e6,ownerId:"u_luis",ownerName:"Luis Pérez",source:"whatsapp",lastActivityAt:oe(5),createdAt:oe(15),_version:7,tipoPago:"contado",wonAt:oe(5),postventa:{entrega:!0,traspaso_runt:!0,tramites:!0},commissionSnapshot:{amount:112e6,tipoPago:"contado",ownerId:"u_luis",wonAt:oe(5)}},{id:"d8",name:"Julián Marín · Nissan Frontier 2020",contactName:"Julián Marín",contactId:"email_julianmarin_gmail_com",leadId:"l15",vehicleId:"nissan-frontier-2020",vehicleName:"Nissan Frontier 2020",pipelineId:"ventas",stageId:"perdido",stageName:"Perdido",status:"lost",amount:64e6,currency:"COP",probability:0,weightedAmount:0,lostReason:"Compró en otro lado",ownerId:"u_luis",ownerName:"Luis Pérez",source:"referido",lastActivityAt:oe(9),createdAt:oe(22),_version:4}],Fl=()=>oi.map(n=>({...n}));function JR(n){const e="d"+ ++YR;return oi.unshift({id:e,...n}),e}function XR(n,e){const t=oi.findIndex(r=>r.id===n);t>=0&&(oi[t]={...oi[t],...e})}const Gn=(n,e=10,t=0)=>{const r=new Date;return r.setDate(r.getDate()+n),r.setHours(e,t,0,0),r.toISOString()},Ul=[{id:"ag1",type:"cita",subject:"Test drive Toyota Corolla",dueAt:Gn(1,10),relatedTo:{type:"lead",id:"l2",name:"Carlos Andrés Salcedo"},status:"open"},{id:"ag2",type:"cita",subject:"Visita showroom",dueAt:Gn(1,12),relatedTo:{type:"lead",id:"l1",name:"María Fernanda Gómez"},status:"open"},{id:"ag3",type:"cita",subject:"Cierre financiación",dueAt:Gn(1,15),relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},status:"open"},{id:"ag4",type:"cita",subject:"Llamada de seguimiento",dueAt:Gn(1,17),relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},status:"open"},{id:"ag5",type:"cita",subject:"Entrega de vehículo",dueAt:Gn(3,9),relatedTo:{type:"lead",id:"l8",name:"Andrés Felipe Cuesta"},status:"open"},{id:"ag6",type:"cita",subject:"Peritaje",dueAt:Gn(5,11),relatedTo:{type:"lead",id:"l9",name:"Catalina Ríos"},status:"open"},{id:"ag7",type:"cita",subject:"Negociación precio",dueAt:Gn(-2,16),relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},status:"open"}],ZR=()=>Ul.map(n=>({...n}));function eC(n){Ul.push({id:"ag"+(Ul.length+1),...n})}let tC=100;function pv(n){const e="lm"+ ++tC,t=new Date().toISOString(),r=(n.telefono||"").replace(/\D/g,""),s=(n.prefijoPais||"+57").replace(/\D/g,""),i=r?"+"+(r.startsWith(s)?r:s+r):"",o=(n.email||"").trim().toLowerCase(),c={id:e,fullName:n.nombre||"Sin nombre",email:o,phone:i,source:n.canal||"manual",sourceDetail:n.interes||"consulta",vehicleOfInterestId:n.vehiculoId||null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:null,contactId:o?"email_"+o.replace(/[^a-z0-9]/gi,"_"):"phone_"+r,tags:["manual",n.trafico,n.campana].filter(Boolean),createdAt:t,lastActivityAt:t,_version:1};return od.unshift(c),e}function nC(){const n={},e=(m,g,E)=>u("label",{class:"field"},[u("span",{class:"field__label",text:m}),g,null]);n.nombre=u("input",{class:"input",type:"text",placeholder:"Nombre del cliente",autocomplete:"off"}),n.prefijo=u("input",{class:"input",type:"text",value:"+57",style:{width:"72px"}}),n.telefono=u("input",{class:"input",type:"tel",placeholder:"300 123 4567",autocomplete:"off"}),n.email=u("input",{class:"input",type:"email",placeholder:"correo@ejemplo.com (opcional)",autocomplete:"off"}),n.canal=u("select",{class:"select"},_R.map(m=>u("option",{value:m.id},[`${m.icon} ${m.label}`]))),n.interes=u("select",{class:"select"},vR.map(m=>u("option",{value:m.id},[m.label]))),n.trafico=u("select",{class:"select"},[u("option",{value:""},["— Tráfico —"]),u("option",{value:"organico"},["Orgánico"]),u("option",{value:"pauta"},["Pauta (pago)"])]),n.campana=u("input",{class:"input",type:"text",placeholder:"Campaña (opcional)",autocomplete:"off"}),n.vehiculo=u("input",{class:"input",type:"text",placeholder:"Vehículo de interés (opcional)",autocomplete:"off"}),n.notas=u("textarea",{class:"textarea",placeholder:"Notas / contexto del lead",rows:"2"}),n.consent=u("input",{type:"checkbox",checked:!0});const t=u("div",{class:"login__error",role:"alert",hidden:!0}),r=u("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),s=u("button",{class:"btn btn--gold",type:"submit"},["Agregar lead"]),i=u("form",{class:"nl-form"},[e("Nombre *",n.nombre),u("div",{class:"nl-row"},[u("label",{class:"field",style:{flex:"0 0 auto"}},[u("span",{class:"field__label",text:"Prefijo"}),n.prefijo]),u("label",{class:"field u-grow"},[u("span",{class:"field__label",text:"Teléfono"}),n.telefono])]),e("Correo",n.email),u("div",{class:"nl-row"},[e("Canal *",n.canal),e("Interés",n.interes)]),u("div",{class:"nl-row"},[e("Tráfico",n.trafico),e("Campaña",n.campana)]),e("Vehículo de interés",n.vehiculo),e("Notas",n.notas),u("label",{class:"nl-consent"},[n.consent,u("span",{class:"u-caption",text:"El cliente autorizó el tratamiento de sus datos (Ley 1581 · Habeas Data)."})]),t,u("div",{class:"nl-actions"},[r,s])]),o=u("div",{class:"modal"},[u("div",{class:"modal__head"},[u("h2",{class:"modal__title",text:"＋ Nuevo lead"}),u("span",{class:"u-caption u-faint",text:"Captura manual (Meta, WhatsApp, TikTok, llamada, referido…)"})]),i]),c=u("div",{class:"modal-overlay"},[o]);document.body.appendChild(c),setTimeout(()=>n.nombre.focus(),30);const l=()=>{c.remove(),window.removeEventListener("keydown",h)},h=m=>{m.key==="Escape"&&l()};window.addEventListener("keydown",h),c.addEventListener("mousedown",m=>{m.target===c&&l()}),r.addEventListener("click",l),i.addEventListener("submit",async m=>{m.preventDefault(),t.hidden=!0;const g={nombre:n.nombre.value.trim(),email:n.email.value.trim(),telefono:n.telefono.value.trim(),prefijoPais:n.prefijo.value.trim()||"+57",canal:n.canal.value,interes:n.interes.value,vehiculoId:n.vehiculo.value.trim()||null,trafico:n.trafico.value||null,campana:n.campana.value.trim()||null,consentGiven:n.consent.checked,notas:n.notas.value.trim()};if(!g.nombre)return p("Escribe el nombre del cliente.");if(!g.email&&!g.telefono)return p("Necesitas al menos un correo o un teléfono (para no duplicar el contacto).");s.disabled=!0,s.textContent="Guardando…";try{G.get().mock?(pv(g),window.dispatchEvent(new CustomEvent("altorra:leads-dirty"))):await jR(g),K("✓ Lead agregado a la Bandeja","ok"),l()}catch{s.disabled=!1,s.textContent="Agregar lead",p("No se pudo agregar. Intenta de nuevo.")}});function p(m){return t.textContent=m,t.hidden=!1,!1}}const Bl="altorra_friction_v1",rC=300;function Sa(n,e,t={}){try{const r=Math.max(0,Math.round(performance.now()-e)),s=JSON.parse(localStorage.getItem(Bl)||"[]");for(s.push({task:n,ms:r,at:new Date().toISOString(),...t});s.length>rC;)s.shift();localStorage.setItem(Bl,JSON.stringify(s))}catch{}}function sC(){try{const n=JSON.parse(localStorage.getItem(Bl)||"[]"),e={};for(const r of n)(e[r.task]=e[r.task]||[]).push(r.ms);const t={};for(const[r,s]of Object.entries(e)){const i=[...s].sort((o,c)=>o-c);t[r]={n:s.length,mediana_s:+(i[Math.floor(i.length/2)]/1e3).toFixed(1),p90_s:+(i[Math.floor(i.length*.9)]/1e3).toFixed(1)}}return t}catch{return{}}}typeof window<"u"&&(window.__friccion=sC);const iC=[{id:"whatsapp",label:"WhatsApp",icon:"💬"},{id:"walkin",label:"Walk-in",icon:"🚶"},{id:"llamada",label:"Llamada",icon:"📞"},{id:"referido",label:"Referido",icon:"🤝"}],oC="“¿Me autorizas guardar tu nombre y teléfono para contactarte sobre vehículos? (Ley 1581)”";function aC(){const n=performance.now(),e={fuente:"whatsapp",medio:"organico"},t=G.get().user||{},r=u("input",{class:"input",type:"text",placeholder:"Nombre",autocomplete:"off"}),s=u("input",{class:"input",type:"tel",placeholder:"300 123 4567",autocomplete:"off",inputmode:"tel"}),i=u("input",{class:"input",type:"text",placeholder:'Nota corta (opcional): "busca SUV blanca"',autocomplete:"off"}),o=u("input",{type:"checkbox"}),c=u("div",{class:"u-row",style:{flexWrap:"wrap",gap:"6px"}});function l(){c.replaceChildren(...iC.map(N=>{const B=u("button",{class:"chip"+(e.fuente===N.id?" chip--active":""),type:"button"},[`${N.icon} ${N.label}`]);return B.addEventListener("click",()=>{e.fuente=N.id,l()}),B}))}l();const h=u("button",{class:"chip",type:"button"},["Orgánico"]);h.addEventListener("click",()=>{e.medio=e.medio==="organico"?"pauta":"organico",h.textContent=e.medio==="organico"?"Orgánico":"Pauta (pago)"});const p=u("div",{class:"login__error",role:"alert",hidden:!0}),m=u("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),g=u("button",{class:"btn btn--gold",type:"submit"},["⚡ Registrar"]),E=u("form",{class:"nl-form"},[u("label",{class:"field"},[u("span",{class:"field__label",text:"Nombre *"}),r]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Teléfono / WhatsApp *"}),s]),u("div",{class:"u-row",style:{gap:"8px",alignItems:"center"}},[c,h]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Nota"}),i]),u("label",{class:"nl-consent"},[o,u("span",{class:"u-caption"},["Leí el guion y el cliente AUTORIZÓ de palabra: ",u("em",{text:oC})])]),p,u("div",{class:"nl-actions"},[m,g])]),S=u("div",{class:"modal"},[u("div",{class:"modal__head"},[u("h2",{class:"modal__title",text:"⚡ Lead rápido"}),u("span",{class:"u-caption u-faint",text:navigator.onLine?"El WhatsApp entrante o el cliente del patio, registrado en 30 segundos.":"📴 Sin señal: se guardará y sincronizará solo al volver la conexión."})]),E]),k=u("div",{class:"modal-overlay"},[S]);document.body.appendChild(k),setTimeout(()=>r.focus(),30);const T=()=>{k.remove(),window.removeEventListener("keydown",L)},L=N=>{N.key==="Escape"&&T()};window.addEventListener("keydown",L),k.addEventListener("mousedown",N=>{N.target===k&&T()}),m.addEventListener("click",T),E.addEventListener("submit",N=>{N.preventDefault(),p.hidden=!0;const B={nombre:r.value.trim(),telefono:s.value.trim(),fuente:e.fuente,medio:e.medio,nota:i.value.trim(),consentVerbal:o.checked,ownerId:t.uid||null,ownerName:t.nombre||t.email||null,createdAt:new Date().toISOString()};if(!B.nombre)return R("Escribe el nombre.");if(!B.telefono||B.telefono.replace(/\D/g,"").length<7)return R("Escribe un teléfono válido.");if(!B.ownerId&&!G.get().mock)return R("Sesión sin usuario — recarga el portal.");if(G.get().mock){pv({nombre:B.nombre,telefono:B.telefono,canal:B.fuente,trafico:B.medio,consentGiven:B.consentVerbal,notas:B.nota}),window.dispatchEvent(new CustomEvent("altorra:leads-dirty")),K("⚡ Lead registrado (mock)","ok"),T();return}jt(Se(ie,"lead_intake"),B).catch(P=>{console.error("[quick-lead] rechazo del servidor:",P),K('El lead "'+B.nombre+'" fue RECHAZADO al sincronizar: '+(P.code||P.message),"error")}),K(navigator.onLine?"⚡ Lead registrado — aparecerá en la Bandeja en segundos":"📴 Guardado local — se enviará al volver la señal","ok"),Sa("lead_rapido",n,{fuente:e.fuente,online:navigator.onLine}),T()});function R(N){return p.textContent=N,p.hidden=!1,!1}}const cC="ventas",Wi=[{id:"cuadrando_cita",label:"Cuadrando cita",prob:.2},{id:"cita_fijada",label:"Cita fijada",prob:.35},{id:"visita_test_drive",label:"Visita / Test drive",prob:.5},{id:"negociacion",label:"Negociación",prob:.7},{id:"apartado",label:"Apartado",prob:.9},{id:"vendido",label:"Vendido",prob:1,won:!0}],Ho={id:"perdido",label:"Perdido",prob:0,lost:!0},Ao={_exit_visita_test_drive:["huboTestDrive"],apartado:["montoApartado","venceEl"],vendido:["tipoPago"],perdido:["lostReason"]},Hs=Wi.map(n=>n.id);function bp(n,e){if(n===e)return{ok:!0,needsReason:!1,gates:[]};const t=i=>i===Ho.id||Hs.includes(i);if(!t(n)||!t(e))return{ok:!1,error:"etapa_desconocida"};if(n==="vendido")return{ok:!1,error:"vendido_es_terminal"};if(e===Ho.id)return{ok:!0,needsReason:!1,gates:Ao.perdido.slice()};if(n===Ho.id)return{ok:!0,needsReason:!0,gates:[]};const r=Hs.indexOf(n),s=Hs.indexOf(e);if(s>r){const i=[];for(let o=r;o<s;o++){Hs[o]==="visita_test_drive"&&i.push(...Ao._exit_visita_test_drive);const c=Hs[o+1];Ao[c]&&i.push(...Ao[c])}return{ok:!0,needsReason:!1,gates:[...new Set(i)]}}return{ok:!0,needsReason:!0,gates:[],recalcVehicle:n==="apartado"}}const wp=[{id:"precio",label:"Precio"},{id:"financiacion_negada",label:"Financiación negada"},{id:"compro_en_otro_lado",label:"Compró en otro lado"},{id:"no_responde",label:"No responde"},{id:"cambio_de_opinion",label:"Cambió de opinión"},{id:"error_de_registro",label:"Error de registro"},{id:"otro",label:"Otro motivo"}],ai=Wi.filter(n=>!n.won),mv=[...Wi,Ho].reduce((n,e)=>(n[e.id]=e,n),{});function jr(n){return mv[n]||Wi[0]}function ci(n){const e=mv[n];return e?e.prob:0}function ad(n){return Math.round((Number(n.amount)||0)*ci(n.stageId))}function gv(n){return n.reduce((e,t)=>e+(t.status==="open"?ad(t):0),0)}function lC(n){return n.reduce((e,t)=>e+(t.status==="open"&&Number(t.amount)||0),0)}function uC(n,e=14){return n.status==="open"&&_s(n.lastActivityAt)>e}function dC(n){const e={};for(const t of ai)e[t.id]=[];for(const t of n)t.status==="open"&&(e[t.stageId]||(e[t.stageId]=[])).push(t);return e}const _v=[{id:"entrega",label:"Entrega del vehículo",dueDays:3},{id:"traspaso_runt",label:"Traspaso / RUNT",dueDays:15},{id:"tramites",label:"Trámites (SOAT, impuestos, GPS)",dueDays:15}];function hC(n){const e={};for(const r of n||[])!r||r.status!=="open"||!r.vehicleId||(e[r.vehicleId]=e[r.vehicleId]||[]).push(r.id||null);const t=[];for(const r of Object.keys(e))e[r].length>1&&t.push({vehicleId:r,dealIds:e[r]});return t}function vv(n){if(!n||n.status!=="won")return!1;const e=n.postventa||{};return _v.every(t=>e[t.id]===!0)}function yv(n,e={}){const t=e.vehicleId!==void 0?e.vehicleId||"":n.vehicleOfInterestId||"",r=Wi[0];return{name:(n.fullName||"Oportunidad")+(t?" · "+(e.vehicleName||t):""),contactId:n.contactId||null,contactName:n.fullName||"",leadId:n.id||null,vehicleId:t||null,vehicleName:e.vehicleName||t||"",sinVehiculoAun:!t,pipelineId:cC,stageId:r.id,stageName:r.label,status:"open",amount:Number(e.amount)||0,currency:"COP",probability:r.prob,weightedAmount:Math.round((Number(e.amount)||0)*r.prob),expectedCloseDate:null,ownerId:e.ownerId!==void 0?e.ownerId:n.ownerId||null,ownerName:e.ownerName!==void 0?e.ownerName:n.ownerName||null,source:n.source||"web",nextStep:e.nota||""}}const Mn=()=>new Date().toISOString(),bv=n=>({id:n.id,...n.data()}),Pt=()=>G.get().user?G.get().user.uid:null;function fC(n,e,t){return jt(Se(ie,"activities"),{type:"deal",subject:t,body:"",status:"closed",direction:"outbound",relatedTo:{type:"deal",id:n,name:e||""},ownerId:Pt(),createdAt:Mn(),_version:1})}function pC({pageSize:n=100,onData:e,onError:t}){const r=lt(Se(ie,"deals"),Dn("status","==","open"),wt("lastActivityAt","desc"),It(n));return an(r,s=>e(s.docs.map(bv)),s=>t&&t(s))}async function mC(n,e={}){const t=Mn(),r=yv(n,e),s=await jt(Se(ie,"deals"),{...r,lastActivityAt:t,createdAt:t,updatedAt:t,createdBy:Pt(),updatedBy:Pt(),_version:1});return await pt(ke(ie,"leads",n.id),{status:"convertido",convertedTo:{dealId:s.id,prevStatus:n.status||"contactado"},lastActivityAt:t,updatedAt:t,updatedBy:Pt(),_version:zt(1)}),await fC(s.id,r.contactName,"Oportunidad creada desde lead"),s.id}async function gC(n){return(await Sr(Rr,"anularConversion")({dealId:n})).data}async function wv(){return(await rn(lt(Se(ie,"vehiculos"),Dn("estado","in",["disponible","apartado"]),It(60)))).docs.map(e=>{const t=e.data(),r=t.estado==="apartado";return{id:e.id,label:[t.marca,t.modelo,t.year].filter(Boolean).join(" ")+(r?" · ⚠ apartado":""),precio:Number(t.precioOferta||t.precio)||0,apartado:r}}).sort((e,t)=>e.label.localeCompare(t.label,"es"))}async function Ip(n,e,t={},r={}){const s=Mn(),i=jr(e),o={...r,stageId:e,stageName:i.label,probability:i.prob,weightedAmount:Math.round((Number(t.amount)||0)*i.prob),lastActivityAt:s,updatedAt:s,updatedBy:Pt(),_version:zt(1)};t.status==="lost"&&e!=="perdido"&&(o.status="open"),await pt(ke(ie,"deals",n),o)}async function _C(n,e,t={}){const r=Mn(),s=Math.max(0,Math.round(Number(e)||0));await pt(ke(ie,"deals",n),{amount:s,weightedAmount:Math.round(s*ci(t.stageId)),updatedAt:r,updatedBy:Pt(),_version:zt(1)})}async function vC(n,e={},t={}){const r=Mn();await pt(ke(ie,"deals",n),{...t,status:"won",stageId:"vendido",stageName:"Vendido",probability:1,weightedAmount:Number(e.amount)||0,lastActivityAt:r,updatedAt:r,updatedBy:Pt(),_version:zt(1)})}async function yC(n,e,t={}){const r=Mn();await pt(ke(ie,"deals",n),{status:"lost",stageId:"perdido",stageName:"Perdido",probability:0,weightedAmount:0,lostReason:String(e||"otro"),lastActivityAt:r,updatedAt:r,updatedBy:Pt(),_version:zt(1)})}function bC({pageSize:n=100,onData:e,onError:t}){const r=lt(Se(ie,"deals"),Dn("status","==","won"),wt("lastActivityAt","desc"),It(n));return an(r,s=>e(s.docs.map(bv)),s=>t&&t(s))}async function wC(n,e,t){const r=Mn();await pt(ke(ie,"deals",n),{["postventa."+e]:t===!0,lastActivityAt:r,updatedAt:r,updatedBy:Pt(),_version:zt(1)});try{await pt(ke(ie,"activities","postventa_"+n+"_"+e),t?{status:"closed",closedAt:r,closedBy:Pt()}:{status:"open",closedAt:null,closedBy:null})}catch{}}async function IC(n,e){const t=Mn();await pt(ke(ie,"deals",n),{recibeVehiculo:{marca:String(e.marca||"").trim(),modelo:String(e.modelo||"").trim(),year:Number(e.year)||null,placa:String(e.placa||"").trim().toUpperCase(),valorEstimado:Number(e.valorEstimado)||0},lastActivityAt:t,updatedAt:t,updatedBy:Pt(),_version:zt(1)})}async function EC(n){return(await Sr(Rr,"crmCrearBorradorRetoma")({dealId:n})).data}const Wc="__sin_vehiculo__";function Iv(n,{onDone:e}={}){const t=performance.now(),r=G.get().team||[],s=u("select",{class:"select"},[u("option",{value:""},["Cargando inventario…"])]),i=u("input",{class:"input",type:"number",min:"0",step:"100000",placeholder:"Valor estimado (COP) *"}),o=u("select",{class:"select"},r.length?r.map(R=>u("option",{value:R.uid,selected:R.uid===n.ownerId?"":void 0},[R.nombre])):[u("option",{value:n.ownerId||""},[n.ownerName||"Yo"])]),c=u("input",{class:"input",type:"text",placeholder:"Nota de contexto (opcional)"}),l=u("div",{class:"login__error",role:"alert",hidden:!0}),h=u("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),p=u("button",{class:"btn btn--gold",type:"submit"},["🎯 Crear negocio"]),m=u("form",{class:"nl-form"},[u("p",{class:"u-caption u-muted",style:{margin:"0"}},["✓ Hablaste con él · ✓ tiene presupuesto o forma de pago en mente · ✓ busca un carro concreto o una categoría"]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Vehículo *"}),s]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Valor estimado (COP) *"}),i]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Asesor responsable *"}),o]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Nota"}),c]),l,u("div",{class:"nl-actions"},[h,p])]),g=u("div",{class:"modal"},[u("div",{class:"modal__head"},[u("h2",{class:"modal__title",text:"Calificar → crear negocio"}),u("span",{class:"u-caption u-faint",text:(n.fullName||"Cliente")+" pasa al Pipeline; el lead queda congelado como histórico."})]),m]),E=u("div",{class:"modal-overlay"},[g]);document.body.appendChild(E);const S=()=>{E.remove(),window.removeEventListener("keydown",k)},k=R=>{R.key==="Escape"&&S()};window.addEventListener("keydown",k),E.addEventListener("mousedown",R=>{R.target===E&&S()}),h.addEventListener("click",S);let T=[];(G.get().mock?Promise.resolve([]):wv()).then(R=>{T=R,s.replaceChildren(u("option",{value:""},["— Elige un vehículo —"]),...R.map(N=>u("option",{value:N.id},[N.label+(N.precio?" · $"+N.precio.toLocaleString("es-CO"):"")])),u("option",{value:Wc},["Sin vehículo aún (buscando / retoma)"]))}).catch(()=>{s.replaceChildren(u("option",{value:Wc},["Sin vehículo aún"]))}),s.addEventListener("change",()=>{const R=T.find(N=>N.id===s.value);R&&R.precio&&!i.value&&(i.value=String(R.precio))}),m.addEventListener("submit",async R=>{R.preventDefault(),l.hidden=!0;const N=s.value,B=Math.round(Number(i.value)||0);if(!N)return L('Elige un vehículo o marca "Sin vehículo aún".');if(!(B>0))return L("El valor estimado es obligatorio (alimenta el pronóstico).");const P=o.value||n.ownerId;if(!P)return L("El negocio necesita un asesor responsable.");const F=r.find(w=>w.uid===P)?.nombre||n.ownerName||null,I=T.find(w=>w.id===N),v={vehicleId:N===Wc?null:N,vehicleName:I?I.label:"",amount:B,ownerId:P,ownerName:F,nota:c.value.trim()};p.disabled=!0,p.textContent="Creando…";try{if(G.get().mock){JR(yv(n,v)),K("🎯 Negocio creado (mock)","ok"),Sa("conversion",t,{mock:!0}),S(),e&&e({mock:!0});return}const w=await mC(n,v);Sa("conversion",t,{}),S(),TC(w,n),e&&e({dealId:w})}catch(w){p.disabled=!1,p.textContent="🎯 Crear negocio",L(w&&w.code==="permission-denied"?"Recarga el portal: tu versión está desactualizada.":"No se pudo crear el negocio. Intenta de nuevo.")}});function L(R){return l.textContent=R,l.hidden=!1,!1}}function TC(n,e){const t=u("button",{class:"btn btn--soft btn--sm",type:"button"},["Deshacer"]),r=u("div",{role:"status",style:{position:"fixed",bottom:"18px",left:"50%",transform:"translateX(-50%)",display:"flex",gap:"12px",alignItems:"center",zIndex:"99",padding:"10px 14px",borderRadius:"10px",background:"var(--bg-elev, #1c1a17)",border:"1px solid var(--line, #444)",boxShadow:"0 6px 24px rgba(0,0,0,.4)"}},[u("span",{text:`🎯 Negocio creado para ${(e.fullName||"el cliente").split(/\s+/)[0]}`}),t]);document.body.appendChild(r);const s=setTimeout(()=>r.remove(),1e4);t.addEventListener("click",async()=>{clearTimeout(s),t.disabled=!0,t.textContent="Anulando…";try{await gC(n),K("↩ Conversión anulada — el lead volvió a la Bandeja","ok")}catch(i){K("No se pudo anular: "+(i&&i.message||""),"error")}r.remove()})}const mn={wa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.477-.91zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>',person:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',flag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',expand:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',convert:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 12h6M13 9l3 3-3 3"/></svg>',call:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',more:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>'};function AC(){const n=(t,r)=>{const s=new Date;return s.setDate(s.getDate()+t),s.setHours(r,0,0,0),s.toISOString()},e=new Date(Date.now()+72e5).toISOString();return[{value:{subject:"Llamar al cliente",dueAt:n(1,9)},label:"Llamar mañana 9 am",icon:"📞"},{value:{subject:"Escribir por WhatsApp",dueAt:e},label:"WhatsApp en 2 horas",icon:"💬"},{value:{subject:"Hacer seguimiento",dueAt:n(3,9)},label:"Seguimiento en 3 días",icon:"🔁"},{value:"abrir360",label:"Agendar cita (abrir 360)",icon:"📅"},{value:null,label:"Sin próximo paso",icon:"⊘"}]}function Ev(n){const e={queue:"todo",filters:{type:"",channel:"",status:""},search:"",showClosed:!1,leads:[],loading:!0,error:null,hasMore:!1,cursor:null,sub:null},t=ft("crm.edit"),r=G.get().user&&G.get().user.uid,s=u("div",{class:"inbox__queues",role:"tablist","aria-label":"Colas"}),i=u("label",{class:"search","aria-label":"Buscar"},[u("span",{html:mn.search,"aria-hidden":"true"}),u("input",{type:"search",placeholder:"Buscar nombre, correo, teléfono…",autocomplete:"off"})]),o=u("div",{class:"inbox__filters"}),c=t?u("button",{class:"btn btn--gold btn--sm",type:"button",style:{marginLeft:"auto"}},["⚡ Lead rápido"]):null;c&&c.addEventListener("click",()=>aC());const l=t?u("button",{class:"btn btn--soft btn--sm",type:"button"},["＋ Completo"]):null;l&&l.addEventListener("click",()=>nC());const h=u("button",{class:"btn btn--soft btn--sm",type:"button"},["📋 Pendientes hoy"]);h.addEventListener("click",()=>F());const p=u("div",{class:"inbox__pendientes",hidden:!0}),m=u("div",{class:"inbox__toolbar"},[i,o,c,l,h]),g=u("div",{class:"inbox__list",role:"list",tabindex:"-1"}),E=u("p",{class:"u-muted u-caption",style:{margin:"0"}},["Aquí llegan los interesados: contacta y califica. Las ventas activas viven en el Pipeline."]),S=u("section",{class:"inbox"},[E,s,m,p,g]);_e(n),n.append(S);const k=i.querySelector("input");k.addEventListener("input",()=>{e.search=k.value,le()});async function T(O,$){if(A(O.id,{ownerId:$?$.uid:null,ownerName:$?$.nombre:null}),G.get().mock){K($?`Asignado a ${$.nombre}`:"Sin asignar","ok");return}try{await LR(O.id,$),K($?`Asignado a ${$.nombre}`:"Sin asignar","ok")}catch{K("No se pudo asignar","error")}}async function L(O,$,Y={}){if(A(O.id,{status:$,...Y,lastActivityAt:new Date().toISOString()}),G.get().mock){K(`Estado → ${zo($).label}`,"ok");return}try{await MR(O.id,$,O,Y),K(`Estado → ${zo($).label}`,"ok")}catch{K("No se pudo cambiar el estado","error")}}function R(O,$){const Y=ov(O.phone,SC(O));if(!Y){K("Este lead no tiene teléfono","error");return}window.open(Y,"_blank","noopener"),!G.get().mock&&t&&vp(O.id,{type:"whatsapp",subject:"WhatsApp enviado",direction:"outbound",name:O.fullName}).catch(()=>{}),B(O,$)}function N(O,$){!G.get().mock&&t&&vp(O.id,{type:"llamada",subject:"Llamada registrada",direction:"outbound",name:O.fullName}).catch(()=>{}),K("📞 Llamada registrada","ok"),B(O,$)}function B(O,$){if(!t)return;const Y=performance.now();Dt($||document.body,AC(),ce=>{if(Sa("proximo_paso",Y,{preset:ce.label}),!!ce.value){if(ce.value==="abrir360"){x(O.id);return}if(G.get().mock){K("Próximo paso anotado (mock)","ok");return}FR(O.id,{subject:ce.value.subject,dueAt:ce.value.dueAt,name:O.fullName}).then(()=>K("✓ Próximo paso: "+ce.label,"ok")).catch(()=>K("No se pudo guardar el próximo paso","error"))}},{title:"¿Próximo paso con "+(O.fullName||"el cliente").split(/\s+/)[0]+"?"})}let P=!1;async function F(){P=!P,p.hidden=!P,P&&await I()}async function I(){if(_e(p),G.get().mock){p.append(u("div",{class:"u-muted u-caption",style:{padding:"10px"},text:"Pendientes no disponible en modo demo."}));return}p.append(u("div",{class:"u-muted u-caption",style:{padding:"10px"},text:"Cargando pendientes…"}));let O=[];try{O=await UR()}catch{_e(p),p.append(u("div",{class:"u-muted u-caption",style:{padding:"10px"},text:"No se pudieron cargar los pendientes."}));return}if(_e(p),p.append(u("div",{class:"inbox__listhead"},[u("span",{class:"u-muted u-caption",text:`📋 ${O.length} pendiente${O.length===1?"":"s"} (hoy y vencidos)`})])),!O.length){p.append(u("div",{class:"u-muted u-caption",style:{padding:"0 10px 10px"},text:"¡Al día! Registra llamadas/WhatsApps y elige “próximo paso” para que aparezcan aquí."}));return}const $=Date.now();O.forEach(Y=>{const ce=new Date(Y.dueAt).getTime()<$,re=u("button",{class:"btn btn--soft btn--sm",type:"button",title:"Marcar hecho"},["✓ Hecho"]),ne=u("button",{class:"btn btn--ghost btn--sm",type:"button"},["Abrir 360"]),Te=u("div",{class:"lead-card",style:{alignItems:"center"}},[u("span",{class:`badge badge--${ce?"danger":"gold"}`,text:ce?"VENCIDO":"HOY"}),u("div",{class:"u-grow"},[u("div",{class:"lead-card__name",text:(Y.type==="cita"?"📅 ":"")+Y.subject}),u("div",{class:"u-caption u-muted",text:`${Y.relatedTo&&Y.relatedTo.name?Y.relatedTo.name+" · ":""}${lr(Y.dueAt)}`})]),u("div",{class:"u-row u-row--tight"},[ne,t?re:null])]);ne.addEventListener("click",()=>{Y.relatedTo&&Y.relatedTo.id&&x(Y.relatedTo.id)}),re.addEventListener("click",async()=>{re.disabled=!0;try{await BR(Y.id),K("✓ Hecho","ok"),await I(),Y.relatedTo&&Y.relatedTo.id&&B({id:Y.relatedTo.id,fullName:Y.relatedTo.name||""},h)}catch{re.disabled=!1,K("No se pudo completar","error")}}),p.append(Te)})}function v(O){if(O.status==="convertido"){K("Ya es un negocio: gestiónalo en el Pipeline","info");return}Iv(O,{onDone:()=>A(O.id,{status:"convertido"})})}function w(){G.set({leads:e.leads})}function A(O,$){const Y=e.leads.findIndex(ce=>ce.id===O);Y!==-1&&(e.leads[Y]=hv({...e.leads[Y],...$}),w(),b())}function b(){C(),y(),le()}function C(){const O=RR(e.leads,r);_e(s),Ll.forEach($=>{const Y=e.queue===$.id,ce=u("button",{class:"chip"+(Y?" chip--active":""),role:"tab","aria-selected":String(Y),type:"button"},[u("span",{"aria-hidden":"true",text:$.icon}),u("span",{text:$.label}),u("span",{class:"chip__count",text:String(O[$.id]||0)})]);ce.addEventListener("click",()=>{e.queue=$.id,b()}),s.append(ce)})}function y(){if(_e(o),[{key:"type",label:"Tipo",items:[["","Todos"],["lead","Lead"],["cita","Cita"],["solicitud","Solicitud"],["pqr","PQR"]]},{key:"channel",label:"Canal",items:[["","Todos"],["web","Web"],["whatsapp","WhatsApp"],["bot","ALTOR Bot"],["cuenta","Cuenta"],["newsletter","Newsletter"],["cita","Cita web"]]},{key:"status",label:"Estado",items:[["","Todos"],...Vl.map($=>[$.id,$.label])]}].forEach($=>{const Y=e.filters[$.key],ce=Y?($.items.find(ne=>ne[0]===Y)||[,$.label])[1]:$.label,re=u("button",{class:"chip"+(Y?" chip--active":""),type:"button","aria-haspopup":"menu"},[u("span",{text:ce}),u("span",{"aria-hidden":"true",text:"▾"})]);re.addEventListener("click",()=>{Dt(re,$.items.map(([ne,Te])=>({value:ne,label:Te,active:ne===Y})),ne=>{e.filters[$.key]=ne.value,b()},{title:$.label})}),o.append(re)}),e.filters.type||e.filters.channel||e.filters.status){const $=u("button",{class:"chip",type:"button"},["✕ Limpiar"]);$.addEventListener("click",()=>{e.filters={type:"",channel:"",status:""},b()}),o.append($)}}function le(){if(e.loading)return Z();if(e.error)return q("⚠️","No se pudo cargar",e.error);const{rows:O,hiddenClosed:$}=NR(e.leads,{queue:e.queue,uid:r,filters:e.filters,search:e.search,showClosed:e.showClosed});if(_e(g),!O.length&&!$){const re=e.search||e.filters.type||e.filters.channel||e.filters.status;g.append(z("🗂️",re?"Sin resultados":"¡Bandeja al día!",re?"Ajusta la búsqueda o los filtros.":"No hay clientes en esta cola."));return}const Y=$||e.showClosed?u("button",{class:"chip",type:"button",style:{marginLeft:"auto"}},[e.showClosed?"✕ Ocultar cerrados":`${$} ocultos · ver todos`]):null;Y&&Y.addEventListener("click",()=>{e.showClosed=!e.showClosed,le()});const ce=u("div",{class:"inbox__listhead"},[u("span",{class:"u-muted u-caption",text:`${O.length} ${O.length===1?"cliente":"clientes"} activos`}),u("span",{class:"u-faint u-caption",text:"Ordenado por urgencia"}),Y]);if(g.append(ce),!O.length&&$){g.append(z("🗂️","¡Bandeja al día!",`No hay clientes activos en esta cola (${$} cerrados ocultos).`));return}if(O.forEach(re=>g.append(fe(re))),e.hasMore&&e.queue==="todo"&&!e.search){const re=u("button",{class:"btn btn--soft btn--block",type:"button"},["Cargar más"]);re.addEventListener("click",()=>j(re)),g.append(u("div",{class:"inbox__more"},[re]))}}function fe(O){const $=Xr[O._rating],Y=zo(O.status),ce=!!(O.convertedTo&&O.convertedTo.dealId)||O.status==="convertido",re=xR(O),ne=re&&re.state!=="ok"?u("span",{class:`badge badge--${re.state==="late"?"danger":"gold"}`,title:"Tiempo sin primer contacto"},[`⏱ ${re.mins<120?re.mins+" min":Hc(re.mins*6e4)} sin contacto`]):null,Te=O._sla,Ne=`sla-dot sla-dot--${Te.state}`,Ue=Te.closed?"Cerrado":Te.state==="late"?`SLA vencido hace ${Hc(Te.remainingMs)}`:`Responder en ${Hc(Te.remainingMs)}`,rt=[O._type.icon+" "+O._type.label,O.sourceDetail,O.vehicleOfInterestId?"🚗 "+O.vehicleOfInterestId:""].filter(Boolean).join(" · "),Fn=u("article",{class:"lead-card",role:"listitem",tabindex:"0","data-id":O.id,"aria-label":`${O.fullName}, ${$.label}`},[u("span",{class:Ne,title:Ue,"aria-label":Ue}),u("span",{class:"avatar avatar--sm","aria-hidden":"true",text:gs(O.fullName)}),u("div",{class:"lead-card__main u-grow"},[u("div",{class:"lead-card__top"},[u("span",{class:"lead-card__name u-truncate",text:O.fullName}),u("span",{class:`temp ${$.cls}`,title:`Score ${O._score}/100`},[`${$.icon} ${O._score}`])]),u("div",{class:"lead-card__what u-truncate u-muted",text:rt}),u("div",{class:"lead-card__meta u-caption"},[u("span",{class:"lead-card__chan",text:`${O._channel.icon} ${O._channel.label}`}),u("span",{class:"lead-card__dot",text:"·"}),u("span",{text:lr(O.createdAt)}),u("span",{class:"lead-card__dot",text:"·"}),ce?u("button",{class:"badge badge--ok",type:"button","data-action":"pipeline",title:"Este lead ya es un negocio: gestiónalo en el Pipeline",style:{cursor:"pointer",border:"none"}},[O.convertedTo&&O.convertedTo.outcome==="perdido"?"✖ Negocio perdido → Pipeline":O.convertedTo&&O.convertedTo.outcome==="vendido"?"🏆 VENDIDO":`🎯 ${O.convertedTo&&O.convertedTo.stageName||"Convertido"} → Pipeline`]):u("span",{class:`badge badge--${Y.badge||""}`.trim(),text:Y.label}),O.archived?u("span",{class:"badge",text:"🗄 Archivado"}):null,ne?u("span",{class:"lead-card__dot",text:"·"}):null,ne,O.ownerName?u("span",{class:"lead-card__dot",text:"·"}):null,O.ownerName?u("span",{class:"u-faint",text:"👤 "+O.ownerName}):null]),u("div",{class:"lead-card__nba"},[u("span",{"aria-hidden":"true",text:O._nba.icon}),u("span",{class:"u-muted",text:"Próx: "}),u("strong",{text:O._nba.label})])]),u("div",{class:"lead-card__actions"},[X("wa",mn.wa,"WhatsApp","btn--wa"),t?X("call",mn.call,"Registrar llamada"):null,t?X("assign",mn.person,"Asignar"):null,t&&!ce?X("status",mn.flag,"Cambiar estado"):null,t&&!ce?X("convert",mn.convert,"Convertir a oportunidad"):null,t?X("more",mn.more,"Más acciones"):null,X("open",mn.expand,"Abrir 360")])]);return Fn.addEventListener("click",Un=>{const Rs=Un.target.closest("[data-action]");if(Rs){Fe(Rs.dataset.action,O,Rs);return}x(O.id)}),Fn.addEventListener("keydown",Un=>{Un.key==="Enter"?x(O.id):Un.key.toLowerCase()==="w"&&R(O)}),Fn}function X(O,$,Y,ce=""){return u("button",{class:`icon-btn ${ce}`.trim(),type:"button","data-action":O,title:Y,"aria-label":Y},[u("span",{html:$,"aria-hidden":"true"})])}const ye={nuevo:"Acaba de entrar, nadie le ha hablado",contactado:"Ya le escribiste o llamaste",descartado:"No va: inalcanzable, no califica, spam… (pide la razón)"};function Fe(O,$,Y){if(O==="open")return x($.id);if(O==="wa")return R($,Y);if(O==="call")return N($,Y);if(O==="convert")return v($);if(O==="pipeline"){window.location.hash="#/pipeline";return}if(O==="assign"){const ce=G.get().team||[],re=[{value:null,label:"Sin asignar",icon:"⊘",active:!$.ownerId},...ce.map(ne=>({value:ne,label:ne.nombre,hint:ne.cargo,icon:"👤",active:$.ownerId===ne.uid}))];return Dt(Y,re,ne=>T($,ne.value),{title:"Asignar a"})}if(O==="status"){if($.convertedTo&&$.convertedTo.dealId){K("Este lead ya es un negocio: gestiónalo en el Pipeline.","info");return}const ce=Vl.filter(re=>re.id!=="convertido").map(re=>({value:re.id,label:re.label,hint:ye[re.id]||"",active:($.status||"nuevo")===re.id}));return Dt(Y,ce,re=>{if(re.value==="descartado"){Dt(Y,yR.map(ne=>({value:ne.id,label:ne.label})),ne=>L($,"descartado",{discardReason:ne.value}),{title:"¿Por qué se descarta?"});return}L($,re.value)},{title:"Cambiar estado"})}if(O==="more"){const ce=[$.archived?{value:"unarchive",label:"Restaurar de archivados",icon:"↩️"}:{value:"archive",label:"Archivar",icon:"🗄",hint:"Sale de las vistas; reversible"},ft("crm.delete")?{value:"purge",label:"Eliminar definitivo",icon:"🗑",hint:"Solo pruebas/spam — borra TODO su rastro"}:null].filter(Boolean);return Dt(Y,ce,async re=>{if(re.value==="archive"||re.value==="unarchive"){const ne=re.value==="archive";if(A($.id,{archived:ne}),G.get().mock){K(ne?"🗄 Archivado":"↩️ Restaurado","ok");return}try{await $R($.id,ne),K(ne?"🗄 Archivado":"↩️ Restaurado","ok")}catch{A($.id,{archived:!ne}),K("No se pudo archivar","error")}return}if(re.value==="purge"){if(!navigator.onLine){K("Eliminar definitivo necesita señal.","error");return}if(!window.confirm('🗑 ¿Eliminar DEFINITIVAMENTE a "'+$.fullName+`"?

Borra el lead, sus actividades, negocios y su contacto si queda huérfano. Esto es SOLO para pruebas/spam — un cliente real se ARCHIVA.`)||!window.confirm("Última confirmación: esta acción NO se puede deshacer. ¿Eliminar?"))return;if(G.get().mock){K("Eliminado (mock)","ok");return}try{const ne=await qR($.id);K(`🗑 Eliminado: ${ne.activities} actividades, ${ne.deals} negocios${ne.contactDeleted?", contacto":""}`,"ok")}catch(ne){K(ne.message&&ne.message.includes("Super Admin")?"Solo el Super Admin puede eliminar.":"No se pudo eliminar: "+(ne.message||ne.code),"error")}}},{title:"Más acciones"})}}function x(O){G.set({detailLeadId:O})}function z(O,$,Y){return u("div",{class:"state"},[u("div",{class:"state__icon","aria-hidden":"true",text:O}),u("div",{class:"state__title",text:$}),u("div",{class:"state__msg",text:Y})])}function q(O,$,Y){_e(g),g.append(z(O,$,Y))}function Z(){_e(g);for(let O=0;O<6;O++)g.append(u("div",{class:"lead-card lead-card--skeleton"},[u("span",{class:"skeleton",style:{width:"30px",height:"30px",borderRadius:"50%"}}),u("div",{class:"u-grow u-stack",style:{gap:"8px"}},[u("span",{class:"skeleton",style:{width:"46%",height:"14px"}}),u("span",{class:"skeleton",style:{width:"70%",height:"12px"}})])]))}async function j(O){if(e.cursor){O.disabled=!0,O.textContent="Cargando…";try{const{rows:$,lastDoc:Y,hasMore:ce}=await VR({after:e.cursor}),re=Eo($),ne=new Set(e.leads.map(Te=>Te.id));e.leads.push(...re.filter(Te=>!ne.has(Te.id))),e.cursor=Y,e.hasMore=ce,w(),b()}catch{K("No se pudo cargar más","error"),O.disabled=!1,O.textContent="Cargar más"}}}function he(){if(G.get().mock){G.set({team:Ml()}),e.leads=Eo(Aa()),e.loading=!1,e.hasMore=!1,w(),b(),e.dirtyHandler=()=>{e.leads=Eo(Aa()),w(),b()},window.addEventListener("altorra:leads-dirty",e.dirtyHandler);return}OR().catch(()=>{}),e.sub=DR({pageSize:40,onData:(O,$)=>{e.leads=Eo(O),e.cursor=e.sub?e.sub.getLastDoc():null,e.hasMore=$.hasMore,e.loading=!1,e.error=null,w(),b()},onError:O=>{console.error("[inbox] error de suscripción:",O),e.loading=!1,e.error=O&&O.code==="permission-denied"?"Tu cuenta no tiene permiso para ver el CRM.":"Revisa tu conexión e inténtalo de nuevo.",b()}})}return b(),he(),function(){e.sub&&e.sub.unsubscribe&&e.sub.unsubscribe(),e.sub=null,e.dirtyHandler&&(window.removeEventListener("altorra:leads-dirty",e.dirtyHandler),e.dirtyHandler=null)}}function SC(n){const e=String(n.fullName||"").trim().split(/\s+/)[0]||"",t=n.vehicleOfInterestId?` por el vehículo ${n.vehicleOfInterestId}`:"";return`Hola ${e}, te saluda Altorra Cars 👋. Vimos tu interés${t}. ¿En qué te podemos ayudar?`}function RC(n){const e={deals:[],loading:!0,error:null,sub:null,dragId:null,view:"kanban",won:[],wonSub:null,wonLoading:!0,wonError:null,collisionByDeal:new Map},t=ft("crm.edit"),r=new Set,s=u("div",{class:"pipeline__bar"}),i=u("div",{class:"pipeline__board",role:"list","aria-label":"Embudo de ventas"}),o=u("p",{class:"u-muted u-caption",style:{margin:"0"}},["Aquí se trabajan las ventas activas. Los interesados nuevos llegan a la Bandeja."]),c=u("section",{class:"pipeline"},[o,s,i]);_e(n),n.append(c);function l(x,z){const q=e.deals.findIndex(Z=>Z.id===x);q!==-1&&(e.deals[q]={...e.deals[q],...z},G.get().mock&&XR(x,z),T())}async function h(x,z){if(x.stageId===z)return;const q=bp(x.stageId,z);if(!q.ok){K(q.error==="vendido_es_terminal"?"Un negocio vendido no se mueve (anulación = admin).":"Movimiento no válido","error");return}const Z=[...q.gates];q.needsReason&&Z.push("regressReason");const j=async he=>{const O=jr(z),$=x.stageId;if(l(x.id,{stageId:z,stageName:O.label,probability:O.prob,...he,lastActivityAt:new Date().toISOString()}),G.get().mock){K("Etapa → "+O.label,"ok");return}try{await Ip(x.id,z,x,he),m(x,$,O.label)}catch(Y){l(x.id,{stageId:$,stageName:jr($).label,probability:ci($)}),K(Y&&Y.code==="permission-denied"?"Movimiento rechazado por las reglas — recarga el portal si tu versión es vieja.":"No se pudo mover","error")}};if(!Z.length)return j({});g(x,z,Z,j)}let p=null;function m(x,z,q){p&&p.remove();const Z=u("button",{class:"btn btn--soft btn--sm",type:"button"},["Deshacer"]),j=u("div",{role:"status",style:{position:"fixed",bottom:"18px",left:"50%",transform:"translateX(-50%)",display:"flex",gap:"12px",alignItems:"center",zIndex:"99",padding:"10px 14px",borderRadius:"10px",background:"var(--bg-elev, #1c1a17)",border:"1px solid var(--line, #444)",boxShadow:"0 6px 24px rgba(0,0,0,.4)"}},[u("span",{text:`${(x.contactName||x.name||"Negocio").split(" · ")[0]} → ${q}`}),Z]);document.body.appendChild(j),p=j;const he=setTimeout(()=>{j.remove(),p===j&&(p=null)},1e4);Z.addEventListener("click",async()=>{clearTimeout(he),j.remove(),p===j&&(p=null);const O=jr(z);if(l(x.id,{stageId:z,stageName:O.label,probability:O.prob}),!G.get().mock)try{await Ip(x.id,z,x,{regressReason:"Deshacer (arrastre accidental)"})}catch{K("No se pudo deshacer","error")}})}function g(x,z,q,Z){const j={},he=[],O=(Ne,Ue)=>u("label",{class:"field"},[u("span",{class:"field__label",text:Ne}),Ue]);if(q.includes("huboTestDrive")&&(j.huboTestDrive=u("select",{class:"select"},[u("option",{value:"si"},["Sí, hubo test drive"]),u("option",{value:"no"},["No alcanzó a probarlo"])]),he.push(O("¿Hubo test drive?",j.huboTestDrive))),q.includes("montoApartado")){j.montoApartado=u("input",{class:"input",type:"number",min:"0",step:"50000",placeholder:"500000"});const Ne=new Date(Date.now()+72*3600*1e3);j.venceEl=u("input",{class:"input",type:"date",value:Ne.toISOString().slice(0,10)}),he.push(O("Monto del apartado (COP) *",j.montoApartado),O("Vence el (default 72h)",j.venceEl))}if(q.includes("tipoPago")&&(j.tipoPago=u("select",{class:"select"},[u("option",{value:"contado"},["De contado"]),u("option",{value:"financiado"},["Financiado"])]),j.estadoCredito=u("select",{class:"select"},[u("option",{value:""},["— Estado del crédito —"]),u("option",{value:"pre_aprobado"},["Pre-aprobado"]),u("option",{value:"en_estudio"},["En estudio"]),u("option",{value:"aprobado"},["Aprobado"]),u("option",{value:"rechazado"},["Rechazado"])]),he.push(O("Forma de pago *",j.tipoPago),O("Crédito (si aplica)",j.estadoCredito))),q.includes("lostReason")&&(j.lostReason=u("select",{class:"select"},wp.map(Ne=>u("option",{value:Ne.id},[Ne.label]))),he.push(O("¿Por qué se perdió? *",j.lostReason))),q.includes("regressReason")&&(j.regressReason=u("input",{class:"input",type:"text",placeholder:"¿Qué pasó? (obligatorio al retroceder)"}),he.push(O("Razón del retroceso *",j.regressReason))),z==="vendido"){j.retomaCheck=u("input",{type:"checkbox",class:"checkbox"}),j.retomaMarca=u("input",{class:"input",type:"text",placeholder:"Marca *"}),j.retomaModelo=u("input",{class:"input",type:"text",placeholder:"Modelo"}),j.retomaYear=u("input",{class:"input",type:"number",min:"1980",max:"2035",placeholder:"Año"}),j.retomaPlaca=u("input",{class:"input",type:"text",placeholder:"Placa",maxlength:"8"}),j.retomaValor=u("input",{class:"input",type:"number",min:"0",step:"500000",placeholder:"Valor estimado (COP)"});const Ne=u("div",{class:"nl-form",hidden:!0,style:{marginTop:"8px"}},[j.retomaMarca,j.retomaModelo,j.retomaYear,j.retomaPlaca,j.retomaValor]);j.retomaCheck.addEventListener("change",()=>{Ne.hidden=!j.retomaCheck.checked}),he.push(u("div",{},[u("label",{class:"u-row u-row--tight",style:{cursor:"pointer"}},[j.retomaCheck,u("span",{text:"🚙 Recibe vehículo en parte de pago (retoma)"})]),Ne]))}const $=u("div",{class:"login__error",role:"alert",hidden:!0}),Y=u("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),ce=u("button",{class:"btn btn--gold",type:"submit"},["Mover a "+jr(z).label]),re=u("form",{class:"nl-form"},[...he,$,u("div",{class:"nl-actions"},[Y,ce])]),ne=u("div",{class:"modal-overlay"},[u("div",{class:"modal"},[u("div",{class:"modal__head"},[u("h2",{class:"modal__title",text:jr(z).label})]),re])]);document.body.appendChild(ne),r.add(ne);const Te=()=>{r.delete(ne),ne.remove()};Y.addEventListener("click",Te),ne.addEventListener("mousedown",Ne=>{Ne.target===ne&&Te()}),re.addEventListener("submit",Ne=>{Ne.preventDefault();const Ue={};if(j.huboTestDrive&&(Ue.huboTestDrive=j.huboTestDrive.value==="si"),j.montoApartado){const rt=Math.round(Number(j.montoApartado.value)||0);if(!(rt>0)){$.textContent="El monto del apartado es obligatorio.",$.hidden=!1;return}Ue.montoApartado=rt,Ue.venceEl=new Date((j.venceEl.value||new Date().toISOString().slice(0,10))+"T18:00:00-05:00").toISOString()}if(j.tipoPago&&(Ue.tipoPago=j.tipoPago.value,j.estadoCredito&&j.estadoCredito.value&&(Ue.estadoCredito=j.estadoCredito.value)),j.lostReason&&(Ue.lostReason=j.lostReason.value),j.regressReason){const rt=j.regressReason.value.trim();if(!rt){$.textContent="Escribe la razón del retroceso.",$.hidden=!1;return}Ue.regressReason=rt}if(j.retomaCheck&&j.retomaCheck.checked){const rt=j.retomaMarca.value.trim();if(!rt){$.textContent="La marca del vehículo recibido es obligatoria.",$.hidden=!1;return}Ue.recibeVehiculo={marca:rt,modelo:j.retomaModelo.value.trim(),year:Number(j.retomaYear.value)||null,placa:j.retomaPlaca.value.trim().toUpperCase(),valorEstimado:Math.round(Number(j.retomaValor.value)||0)}}Te(),Z(Ue)})}async function E(x,z){if(l(x.id,{amount:z}),!G.get().mock)try{await _C(x.id,z,x)}catch{K("No se pudo guardar el monto","error")}}async function S(x){if(!(Number(x.amount)>0)){K("Ponle el monto al negocio antes de marcarlo ganado (con ese valor se congela la comisión).","error");return}const z=bp(x.stageId,"vendido");if(!z.ok){K("Movimiento no válido","error");return}const q={status:x.status,stageId:x.stageId},Z=async j=>{if(l(x.id,{status:"won",...j}),G.get().mock){K("🎉 ¡Venta ganada!","ok");return}try{await vC(x.id,x,j),K("🎉 ¡Venta ganada!","ok")}catch{l(x.id,q),K("No se pudo marcar — revisa los datos requeridos","error")}};if(!z.gates.length)return Z({});g(x,"vendido",z.gates,Z)}async function k(x,z){const q={status:x.status,lostReason:x.lostReason||null};if(l(x.id,{status:"lost",lostReason:z}),G.get().mock){K("Marcado perdido","info");return}try{await yC(x.id,z,x),K("Marcado perdido","info")}catch{l(x.id,q),K("Error","error")}}function T(){if(e.loading)return ye();if(e.error)return X("⚠️","No se pudo cargar",e.error);const x=e.deals.filter(q=>q.status==="open");e.collisionByDeal=new Map;for(const q of hC(x))for(const Z of q.dealIds)e.collisionByDeal.set(Z,q.dealIds.length);if(L(x),e.view==="postventa")return le();if(i.classList.remove("pipeline__board--list"),_e(i),!x.length){i.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:"🎯"}),u("div",{class:"state__title",text:"Embudo vacío"}),u("div",{class:"state__msg",text:"Convierte un lead en oportunidad desde la Bandeja para empezar."})]));return}const z=dC(x);ai.forEach(q=>{const Z=z[q.id]||[],j=Z.reduce((O,$)=>O+(Number($.amount)||0),0),he=u("div",{class:"pcol","data-stage":q.id},[u("div",{class:"pcol__head"},[u("div",{class:"u-row u-row--tight"},[u("span",{class:"pcol__dot",style:{background:CC(q.id)}}),u("strong",{text:q.label}),u("span",{class:"pcol__count",text:String(Z.length)})]),u("span",{class:"u-caption u-faint",text:`${Math.round(q.prob*100)}% · ${Yn(j)||"$0"}`})]),u("div",{class:"pcol__drop","data-stage":q.id,role:"list"},Z.map(B))]);v(he.querySelector(".pcol__drop"),q.id),i.append(he)})}function L(x){const z=gv(x),q=lC(x);_e(s);const Z=e.wonLoading?null:e.won.length,j=(he,O)=>{const $=u("button",{class:"btn btn--sm "+(e.view===he?"btn--gold":"btn--ghost"),type:"button","aria-pressed":e.view===he?"true":"false"},[O]);return $.addEventListener("click",()=>R(he)),$};s.append(u("div",{class:"pipeline__views",role:"group","aria-label":"Vista"},[j("kanban","🎯 Embudo"),j("postventa","🏁 Post-venta"+(Z===null||Z===0?"":" ("+Z+")"))]),N("Oportunidades",String(x.length)),N("Valor del embudo",Yn(q)||"$0"),N("Forecast ponderado",Yn(z)||"$0",!0))}function R(x){e.view!==x&&(e.view=x,x==="postventa"&&w(),T())}function N(x,z,q){return u("div",{class:"pstat"+(q?" pstat--hi":"")},[u("span",{class:"u-caption u-faint",text:x}),u("strong",{class:"pstat__v",text:z})])}function B(x){const z=uC(x),q=u("button",{class:"deal-card__amount",type:"button","data-action":"amount",title:"Editar monto"},[x.amount?Yn(x.amount):"+ monto"]),Z=u("article",{class:"deal-card"+(z?" is-rotting":""),draggable:"true",tabindex:"0","data-id":x.id,"data-stage":x.stageId,role:"listitem","aria-label":`${x.name}, ${Math.round(ci(x.stageId)*100)}%`},[u("div",{class:"deal-card__top"},[u("span",{class:"avatar avatar--sm","aria-hidden":"true",text:gs(x.contactName)}),u("span",{class:"deal-card__name u-grow u-truncate",text:x.name}),z?u("span",{class:"deal-card__rot",title:"Estancado >14 días",text:"🐌"}):null]),x.vehicleName?u("div",{class:"u-caption u-muted u-truncate",text:"🚗 "+x.vehicleName}):null,e.collisionByDeal.has(x.id)?u("div",{class:"deal-card__collision u-caption",title:"Otro negocio activo persigue este mismo carro. Coordinen quién va primero.",text:"🥊 "+e.collisionByDeal.get(x.id)+" negocios por este carro"}):null,u("div",{class:"deal-card__row"},[q,u("span",{class:"badge badge--gold",text:`${Math.round(ci(x.stageId)*100)}%`})]),u("div",{class:"deal-card__foot u-caption u-faint"},[u("span",{class:"u-grow u-truncate",text:x.ownerName?"👤 "+x.ownerName:"Sin asesor"}),u("span",{text:lr(x.lastActivityAt)})]),u("div",{class:"deal-card__actions"},t?[P("stage","↔","Mover etapa"),P("won","✓","Marcar ganado"),P("lost","✕","Marcar perdido"),P("open","⤢","Abrir 360")]:[P("open","⤢","Abrir 360")])]);return Z.addEventListener("dragstart",j=>{e.dragId=x.id,Z.classList.add("is-dragging");try{j.dataTransfer.setData("text/plain",x.id),j.dataTransfer.effectAllowed="move"}catch{}}),Z.addEventListener("dragend",()=>{e.dragId=null,Z.classList.remove("is-dragging")}),Z.addEventListener("click",j=>{const he=j.target.closest("[data-action]");if(he)return F(he.dataset.action,x,he)}),Z}function P(x,z,q){return u("button",{class:"icon-btn icon-btn--xs",type:"button","data-action":x,title:q,"aria-label":q,draggable:"false"},[z])}function F(x,z,q){if(x==="open")return G.set({detailLeadId:z.leadId});if(x==="amount")return I(z,q);if(x==="stage")return Dt(q,ai.map(Z=>({value:Z.id,label:Z.label,hint:Math.round(Z.prob*100)+"%",active:Z.id===z.stageId})),Z=>h(z,Z.value),{title:"Mover a etapa"});if(x==="won")return S(z);if(x==="lost")return Dt(q,wp.map(Z=>({value:Z.id,label:Z.label})),Z=>k(z,Z.value),{title:"Motivo de pérdida"})}function I(x,z){const q=u("input",{class:"deal-card__amount-input",type:"text",inputmode:"numeric",value:x.amount||"","aria-label":"Monto en COP"});z.replaceWith(q),q.focus(),q.select();const Z=()=>{const j=parseInt(String(q.value).replace(/\D/g,""),10)||0;E(x,j)};q.addEventListener("keydown",j=>{j.key==="Enter"?(j.preventDefault(),Z()):j.key==="Escape"&&T()}),q.addEventListener("blur",Z)}function v(x,z){x.addEventListener("dragover",q=>{q.preventDefault(),x.classList.add("is-over"),q.dataTransfer&&(q.dataTransfer.dropEffect="move")}),x.addEventListener("dragleave",()=>x.classList.remove("is-over")),x.addEventListener("drop",q=>{q.preventDefault(),x.classList.remove("is-over");const Z=e.dragId||q.dataTransfer&&q.dataTransfer.getData("text/plain"),j=e.deals.find(he=>he.id===Z);j&&h(j,z)})}function w(){if(G.get().mock){e.won=Fl().filter(x=>x.status==="won"),e.wonLoading=!1,e.wonError=null;return}e.wonSub||(e.wonSub=bC({pageSize:100,onData:x=>{e.won=x.slice().sort((z,q)=>String(q.wonAt||q.lastActivityAt||"").localeCompare(String(z.wonAt||z.lastActivityAt||""))),e.wonLoading=!1,e.wonError=null,T()},onError:x=>{if(e.wonSub)try{e.wonSub()}catch{}e.wonSub=null,e.wonLoading=!1,e.wonError=x&&x.code==="permission-denied"?"Sin permiso para ver los ganados.":"Revisa tu conexión.",e.view==="postventa"&&T()}}))}function A(x,z){const q=e.won.findIndex(Z=>Z.id===x);q!==-1&&(e.won[q]={...e.won[q],...z},T())}async function b(x,z,q){const Z=x.postventa||{};if(A(x.id,{postventa:{...Z,[z]:q}}),!G.get().mock)try{await wC(x.id,z,q)}catch{A(x.id,{postventa:Z}),K("No se pudo guardar el checklist","error")}}async function C(x,z){z.disabled=!0,z.textContent="Creando…";try{const q=await EC(x.id);A(x.id,{retomaVehicleId:q.vehicleId}),K("Borrador #"+q.vehicleId+" creado en inventario","ok")}catch(q){z.disabled=!1,z.textContent="Crear borrador en inventario",K(q&&q.message?q.message:"No se pudo crear el borrador","error")}}function y(x){const z=u("input",{class:"input",type:"text",placeholder:"Marca *"}),q=u("input",{class:"input",type:"text",placeholder:"Modelo"}),Z=u("input",{class:"input",type:"number",min:"1980",max:"2035",placeholder:"Año"}),j=u("input",{class:"input",type:"text",placeholder:"Placa",maxlength:"8"}),he=u("input",{class:"input",type:"number",min:"0",step:"500000",placeholder:"Valor estimado (COP)"}),O=u("div",{class:"login__error",role:"alert",hidden:!0}),$=u("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),Y=u("button",{class:"btn btn--gold",type:"submit"},["Guardar retoma"]),ce=u("form",{class:"nl-form"},[z,q,Z,j,he,O,u("div",{class:"nl-actions"},[$,Y])]),re=u("div",{class:"modal-overlay"},[u("div",{class:"modal"},[u("div",{class:"modal__head"},[u("h2",{class:"modal__title",text:"🚙 Vehículo recibido (retoma)"})]),ce])]);document.body.appendChild(re),r.add(re);const ne=()=>{r.delete(re),re.remove()};$.addEventListener("click",ne),re.addEventListener("mousedown",Te=>{Te.target===re&&ne()}),ce.addEventListener("submit",async Te=>{if(Te.preventDefault(),!z.value.trim()){O.textContent="La marca es obligatoria.",O.hidden=!1;return}const Ne={marca:z.value.trim(),modelo:q.value.trim(),year:Number(Z.value)||null,placa:j.value.trim().toUpperCase(),valorEstimado:Math.round(Number(he.value)||0)};ne();const Ue=x.recibeVehiculo||null;if(A(x.id,{recibeVehiculo:Ne}),!G.get().mock)try{await IC(x.id,Ne)}catch{A(x.id,{recibeVehiculo:Ue}),K("No se pudo guardar","error")}})}function le(){if(_e(i),i.classList.add("pipeline__board--list"),e.wonError){const x=u("button",{class:"btn btn--soft btn--sm",type:"button"},["↻ Reintentar"]);x.addEventListener("click",()=>{e.wonError=null,e.wonLoading=!0,w(),T()}),i.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:"⚠️"}),u("div",{class:"state__title",text:"No se pudieron cargar los ganados"}),u("div",{class:"state__msg",text:e.wonError}),x]));return}if(e.wonLoading){i.append(u("div",{class:"state"},[u("div",{class:"state__msg",text:"Cargando ganados…"})]));return}if(!e.won.length){i.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:"🏁"}),u("div",{class:"state__title",text:"Sin ventas ganadas aún"}),u("div",{class:"state__msg",text:"Cuando marques un negocio como ganado, su checklist de entrega vivirá aquí."})]));return}e.won.forEach(x=>i.append(fe(x)))}function fe(x){const z=vv(x),q=x.commissionSnapshot&&x.commissionSnapshot.amount||x.amount||0,Z=(x.wonAt||x.lastActivityAt||"").slice(0,10),j=_v.map($=>{const Y=!!(x.postventa&&x.postventa[$.id]),ce=u("input",{type:"checkbox",class:"checkbox"});return ce.checked=Y,t||(ce.disabled=!0),ce.addEventListener("change",()=>b(x,$.id,ce.checked)),u("label",{class:"pv-item"+(Y?" is-done":"")},[ce,u("span",{text:$.label})])}),he=x.recibeVehiculo;let O;if(he&&(he.marca||he.placa)){const $=[u("span",{class:"u-caption u-muted",text:"🚙 Retoma: "+[he.marca,he.modelo,he.placa].filter(Boolean).join(" ")+(he.valorEstimado?" · "+Yn(he.valorEstimado):"")})];if(x.retomaVehicleId)$.push(u("span",{class:"badge badge--gold",text:"Borrador #"+x.retomaVehicleId+" ✓"}));else if(t){const Y=u("button",{class:"btn btn--soft btn--sm",type:"button"},["Crear borrador en inventario"]);Y.addEventListener("click",()=>C(x,Y)),$.push(Y)}O=u("div",{class:"pv-retoma"},$)}else if(t){const $=u("button",{class:"btn btn--ghost btn--sm",type:"button"},["＋ Retoma"]);$.addEventListener("click",()=>y(x)),O=u("div",{class:"pv-retoma"},[$])}return u("article",{class:"deal-card deal-card--pv","data-id":x.id},[u("div",{class:"deal-card__top"},[u("span",{class:"avatar avatar--sm","aria-hidden":"true",text:gs(x.contactName)}),u("span",{class:"deal-card__name u-grow u-truncate",text:x.name}),u("span",{class:"badge "+(z?"badge--gold":""),title:z?"Checklist completo: entra a liquidación de comisiones (F42)":"La comisión se liquida cuando el checklist esté completo",text:z?"✓ Liquidable":"⏳ Pendiente"})]),u("div",{class:"u-caption u-muted"},[u("span",{text:(x.vehicleName?"🚗 "+x.vehicleName+" · ":"")+Yn(q)}),u("span",{class:"u-faint",text:(x.tipoPago?" · "+x.tipoPago:"")+(Z?" · ganado "+Z:"")})]),u("div",{class:"pv-checklist"},j),O||null,u("div",{class:"deal-card__foot u-caption u-faint"},[u("span",{class:"u-grow u-truncate",text:x.ownerName?"👤 "+x.ownerName:"Sin asesor"})])])}function X(x,z,q){_e(i),i.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:x}),u("div",{class:"state__title",text:z}),u("div",{class:"state__msg",text:q})]))}function ye(){_e(s),_e(i),ai.slice(0,5).forEach(()=>{i.append(u("div",{class:"pcol"},[u("div",{class:"pcol__head"},[u("span",{class:"skeleton",style:{width:"60%",height:"14px"}})]),u("div",{class:"pcol__drop"},[1,2].map(()=>u("div",{class:"deal-card",style:{pointerEvents:"none"}},[u("span",{class:"skeleton",style:{width:"100%",height:"52px"}})])))]))})}function Fe(){if(G.get().mock){e.deals=Fl().filter(x=>x.status==="open"),e.loading=!1,w(),T();return}e.sub=pC({pageSize:150,onData:x=>{e.deals=x,e.loading=!1,e.error=null,T()},onError:x=>{e.loading=!1,e.error=x&&x.code==="permission-denied"?"Sin permiso para ver el pipeline.":"Revisa tu conexión.",T()}}),w()}return T(),Fe(),function(){if(e.sub&&e.sub(),e.sub=null,e.wonSub&&e.wonSub(),e.wonSub=null,r.forEach(z=>{try{z.remove()}catch{}}),r.clear(),p){try{p.remove()}catch{}p=null}}}function CC(n){return{nuevo:"var(--temp-cold)",contactado:"var(--info)",cita_agendada:"#8A7CFF",visito:"var(--gold-500)",test_drive:"var(--gold-600)",negociacion:"var(--warning)",financiacion:"var(--success)"}[n]||"var(--ink-400)"}const kC=["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"],Ep=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];function Ni(n){const e=n.getFullYear(),t=String(n.getMonth()+1).padStart(2,"0"),r=String(n.getDate()).padStart(2,"0");return`${e}-${t}-${r}`}function Tv(n,e){const r=(new Date(n,e,1).getDay()+6)%7,s=new Date(n,e+1,0).getDate(),i=[];for(let c=0;c<r;c++)i.push({date:new Date(n,e,1-r+c),inMonth:!1});for(let c=1;c<=s;c++)i.push({date:new Date(n,e,c),inMonth:!0});for(;i.length%7!==0;){const c=i[i.length-1].date;i.push({date:new Date(c.getFullYear(),c.getMonth(),c.getDate()+1),inMonth:!1})}const o=[];for(let c=0;c<i.length;c+=7)o.push(i.slice(c,c+7));return o}function PC(n,e){const t=Tv(n,e),r=t[0][0].date,i=t[t.length-1][6].date,o=new Date(i.getFullYear(),i.getMonth(),i.getDate()+1);return{startISO:r.toISOString(),endISO:o.toISOString()}}function xC(n){const e={};for(const t of n){if(!t.dueAt)continue;const r=Ni(new Date(t.dueAt));(e[r]||(e[r]=[])).push(t)}for(const t of Object.keys(e))e[t].sort((r,s)=>new Date(r.dueAt)-new Date(s.dueAt));return e}function Tp(n){const e=new Date(n);return Number.isNaN(e.getTime())?"":e.toLocaleTimeString("es-CO",{hour:"2-digit",minute:"2-digit"})}function NC(n,e){return n.getFullYear()===e.getFullYear()&&n.getMonth()===e.getMonth()&&n.getDate()===e.getDate()}const DC=n=>({id:n.id,...n.data()});function VC(n,e,t,r){const s=lt(Se(ie,"activities"),Dn("dueAt",">=",n),Dn("dueAt","<",e),wt("dueAt","asc"));return an(s,i=>t(i.docs.map(DC)),i=>r&&r(i))}async function Jn(n,e,t){return(await Sr(Rr,"crmCitaAction")({action:n,solicitudId:e||null,payload:t||{}})).data}async function OC(n){const e=await Ar(ke(ie,"solicitudes",n));return e.exists()?{id:e.id,...e.data()}:null}async function Av(){const n=await Ar(ke(ie,"config","availability"));return n.exists()?n.data():{}}async function Sv(){const n=await Ar(ke(ie,"config","bookedSlots"));return n.exists()?n.data():{}}const LC=["super_admin","admin","editor","asesor","moderator"];let So=null;async function Rv(){if(So)return So;const n=G.get(),e=new Map;try{(await rn(lt(Se(ie,"usuarios"),It(50)))).docs.forEach(r=>{const s=r.data();s.bloqueado!==!0&&(!LC.includes(s.rol)&&!s.roleId||e.set(r.id,{uid:r.id,nombre:s.nombre||s.email||r.id,rol:s.rol||s.roleId||""}))})}catch{try{const r=await Ar(ke(ie,"config","crmIntake"));(r.exists()&&Array.isArray(r.data().rotation)?r.data().rotation:[]).forEach(i=>{const o=typeof i=="string"?i:i.uid;o&&e.set(o,{uid:o,nombre:typeof i=="object"&&i.nombre||o,rol:""})})}catch{}}return n.user&&!e.has(n.user.uid)&&e.set(n.user.uid,{uid:n.user.uid,nombre:n.profile&&n.profile.nombre||n.user.email||"Yo",rol:n.profile&&n.profile.rol||""}),So=Array.from(e.values()),So}const MC={pendiente:"🕐 Pendiente (sin confirmar)",confirmada:"✅ Confirmada",reprogramada:"🔁 Reprogramada (re-confirmar)",completada:"🏁 Completada",cancelada:"✖ Cancelada",no_show:"🚫 No asistió",caducada:"⏳ Caducada (no confirmó)"},FC=["pendiente","confirmada","reprogramada"],UC="";function BC(){const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`}function Cv(n,e,t){const r=u("div",{class:"modal"},[u("div",{class:"modal__head"},[u("h2",{class:"modal__title",text:n}),e?u("span",{class:"u-caption u-faint",text:e}):null]),...t]),s=u("div",{class:"modal-overlay"},[r]);document.body.appendChild(s);const i=()=>{s.remove(),window.removeEventListener("keydown",o)},o=c=>{c.key==="Escape"&&i()};return window.addEventListener("keydown",o),s.addEventListener("mousedown",c=>{c.target===s&&i()}),{overlay:s,card:r,close:i}}function Hn(n,e){return e?u("div",{class:"cita-row"},[u("span",{class:"cita-row__k u-caption u-muted",text:n}),u("span",{class:"cita-row__v",text:String(e)})]):null}function $C(n,e,t){if(!t)return[];if(Array.isArray(n.blockedDates)&&n.blockedDates.includes(t))return[];const r=new Date(t+"T12:00:00Z").getUTCDay();if(!(Array.isArray(n.days)?n.days:[1,2,3,4,5,6]).includes(r))return[];const s=Array.isArray(e[t])?e[t]:[],i=n.blockedHours&&n.blockedHours[t]||[],o=[],c=n.interval||60;for(let l=(n.startHour??9)*60;l<(n.endHour??17)*60;l+=c){const h=`${String(Math.floor(l/60)).padStart(2,"0")}:${String(l%60).padStart(2,"0")}`;!s.includes(h)&&!i.includes(h)&&o.push(h)}return o}function kv(n,e,{fecha:t,hora:r}={}){const s=u("input",{class:"input",type:"date",min:BC(),value:t||""}),i=u("select",{class:"select"},[u("option",{value:"",text:"— hora —"})]);function o(){const c=$C(n,e,s.value);i.replaceChildren(u("option",{value:"",text:c.length?"— hora —":"Sin horarios ese día"}),...c.map(l=>u("option",{value:l,text:l}))),r&&c.includes(r)&&(i.value=r)}return s.addEventListener("change",o),t&&o(),{dateIn:s,hourSel:i,value:()=>({fecha:s.value,hora:i.value})}}async function Pv(n){const e=u("select",{class:"select"},[u("option",{value:"",text:"Cargando…"})]),t=await Rv();e.replaceChildren(u("option",{value:"",text:"— asesor —"}),...t.map(s=>u("option",{value:s.uid,text:s.nombre})));const r=G.get().user;return e.value=n&&t.some(s=>s.uid===n)?n:r&&t.some(s=>s.uid===r.uid)?r.uid:"",e._advisors=t,e}async function xv(n){const e=u("select",{class:"select"},[u("option",{value:UC,text:"Sin vehículo asignado"})]);try{const t=await wv();e.append(...t.map(r=>u("option",{value:r.id,text:r.label}))),n&&(e.value=n),e._vehicles=t}catch{e._vehicles=[]}return e}function qC(n,e){const t=String(n.whatsapp||n.telefono||"").replace(/\D/g,"");if(!t)return null;const r=t.length===10&&t.startsWith("3")?"57"+t:t.startsWith("57")?t:String(n.prefijoPais||"57").replace(/\D/g,"")+t,s=`Hola ${n.nombre||""}! Te escribo de ALTORRA CARS por tu cita del ${n.fecha||""} a las ${n.hora||""}`+(n.vehiculo?` para ver el ${n.vehiculo}`:"")+`. Confírmala aquí 👉 ${e}`;return`https://wa.me/${r}?text=${encodeURIComponent(s)}`}async function jC(n,{onLead:e}={}){const t=n.sourceSolicitudId;if(!t)return;if(G.get().mock){K("En demo las citas web no tienen acciones.","info");return}let r;try{r=await OC(t)}catch{r=null}if(!r){K("No se pudo cargar la cita.","error");return}const s=ft("crm.edit"),i=FC.includes(r.estado),o=u("div",{class:"nl-form"}),c=u("div",{class:"login__error",role:"alert",hidden:!0}),l=E=>{c.textContent=E,c.hidden=!1},{close:h}=Cv("Cita · "+(r.nombre||"Cliente"),MC[r.estado]||r.estado,[o]);function p(){return u("div",{class:"cita-info"},[Hn("Cuándo",(r.fecha||"")+(r.hora?" · "+r.hora:"")),Hn("Tipo",r.tipo),Hn("Vehículo",r.vehiculo),Hn("Teléfono",(r.prefijoPais||"")+" "+(r.whatsapp||r.telefono||"")),Hn("Asesor",r.assignedToName||r.assignedTo),r.confirmedAt?Hn("Confirmó",(r.confirmedVia||"")+" · "+String(r.confirmedAt).slice(0,16).replace("T"," ")):null,r._tupleConflict?u("div",{class:"cita-conflict",text:"⚠️ El cliente confirmó pero el horario CHOCA con otra cita del asesor — reprograma una de las dos."}):null,r._requiereReagendar?u("div",{class:"cita-conflict",text:"🚗 El carro de esta cita ya no está disponible — ofrece otro o reagenda."}):null,Hn("Notas",r.comentarios||r.mensaje)])}async function m(E,S){c.hidden=!0;try{await S(),K(E,"ok"),h(),e&&r._leadId&&e(r._leadId)}catch(k){l(k&&k.message||"No se pudo completar la acción.")}}async function g(){if(o.replaceChildren(p(),c),!s||!i){if(r._leadId){const R=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"Ver cliente (360)"});R.addEventListener("click",()=>{h(),G.set({detailLeadId:r._leadId})}),o.append(R)}return}const E=u("div",{class:"cita-actions"}),S=u("button",{class:"btn btn--gold btn--sm",type:"button",text:"📲 Pedir confirmación por WhatsApp"});S.addEventListener("click",async()=>{S.disabled=!0;try{const R=await Jn("getConfirmLink",r.id),N=qC(r,R.url);if(!N){l("La cita no tiene teléfono."),S.disabled=!1;return}window.open(N,"_blank","noopener"),K("Mensaje listo en WhatsApp — el cliente confirma tocando el link.","ok"),S.disabled=!1}catch(R){l(R&&R.message||"No se pudo generar el link."),S.disabled=!1}});const k=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"✓ Confirmar (asignar asesor)"});k.addEventListener("click",async()=>{o.replaceChildren(p(),c,u("p",{class:"u-caption u-muted",text:"Confirmar reserva el bloque del asesor (y del carro si aplica)."}));const R=await Pv(r.assignedTo),N=await xv(r.vehicleAssignedId||r.vehiculoId),B=u("select",{class:"select"},[u("option",{value:"manual",text:"El cliente confirmó (llamada/persona)"}),u("option",{value:"whatsapp",text:"El cliente confirmó por WhatsApp"}),u("option",{value:"email",text:"El cliente confirmó por email"})]),P=u("button",{class:"btn btn--gold btn--sm",type:"button",text:"✓ Confirmar cita"}),F=u("button",{class:"btn btn--ghost btn--sm",type:"button",text:"‹ Volver"});F.addEventListener("click",g),P.addEventListener("click",()=>{if(!R.value){l("Elige el asesor.");return}const I=(R._advisors||[]).find(w=>w.uid===R.value)?.nombre||null,v=(N._vehicles||[]).find(w=>w.id===N.value);m("✅ Cita confirmada",()=>Jn("confirm",r.id,{asesorId:R.value,asesorName:I,canal:B.value,vehicleId:N.value||null,vehicleName:v?v.label:null}))}),o.append(u("label",{class:"field"},[u("span",{class:"field__label",text:"Asesor *"}),R]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Vehículo"}),N]),u("label",{class:"field"},[u("span",{class:"field__label",text:"¿Cómo confirmó?"}),B]),u("div",{class:"nl-actions"},[F,P]))});const T=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"🔁 Reprogramar"});T.addEventListener("click",async()=>{o.replaceChildren(p(),c,u("p",{class:"u-caption u-muted",text:"Al reprogramar, el link viejo de confirmación deja de servir y el cliente debe re-confirmar."}));let R,N;try{[R,N]=await Promise.all([Av(),Sv()])}catch{l("No se pudo cargar la disponibilidad — revisa tu conexión y reintenta.");return}const B=kv(R,N,{}),P=u("button",{class:"btn btn--gold btn--sm",type:"button",text:"🔁 Mover cita"}),F=u("button",{class:"btn btn--ghost btn--sm",type:"button",text:"‹ Volver"});F.addEventListener("click",g),P.addEventListener("click",()=>{const{fecha:I,hora:v}=B.value();if(!I||!v){l("Elige fecha y hora.");return}m("🔁 Cita reprogramada — pídele re-confirmar por WhatsApp",()=>Jn("reschedule",r.id,{fecha:I,hora:v}))}),o.append(u("div",{class:"cfg-row"},[B.dateIn,B.hourSel]),u("div",{class:"nl-actions"},[F,P]))});const L=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"✖ Cancelar cita"});if(L.addEventListener("click",()=>{o.replaceChildren(p(),c);const R=u("input",{class:"input",type:"text",placeholder:"Motivo (le llega al cliente por email)"}),N=u("button",{class:"btn btn--gold btn--sm",type:"button",text:"Confirmar cancelación"}),B=u("button",{class:"btn btn--ghost btn--sm",type:"button",text:"‹ Volver"});B.addEventListener("click",g),N.addEventListener("click",()=>m("✖ Cita cancelada (cupo liberado)",()=>Jn("cancel",r.id,{motivo:R.value.trim()}))),o.append(R,u("div",{class:"nl-actions"},[B,N]))}),E.append(S,k,T,L),r.estado!=="pendiente"){const R=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"🏁 Completada"});R.addEventListener("click",()=>m("🏁 Cita completada",()=>Jn("complete",r.id)));const N=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"🚫 No asistió"});N.addEventListener("click",()=>m("🚫 No-show registrado — mañana 9am te recuerda llamarlo",()=>Jn("no_show",r.id))),E.append(R,N)}if(r._leadId){const R=u("button",{class:"btn btn--ghost btn--sm",type:"button",text:"👤 Ver cliente (360)"});R.addEventListener("click",()=>{h(),G.set({detailLeadId:r._leadId})}),E.append(R)}o.append(E)}await g()}async function zC(n,{onDone:e}={}){if(G.get().mock){const T=new Date(Date.now()+864e5).toISOString();eC({type:"cita",subject:"Cita con "+(n.fullName||""),dueAt:T,relatedTo:{type:"lead",id:n.id,name:n.fullName},status:"open"}),K("📅 Cita agendada (demo)","ok");return}const t=u("div",{class:"login__error",role:"alert",hidden:!0}),r=T=>{t.textContent=T,t.hidden=!1},s=u("div",{class:"nl-form"},[u("p",{class:"u-caption u-muted",text:"La cita manual nace CONFIRMADA y reserva el bloque del asesor (y del carro). Necesitas señal."})]),{close:i}=Cv("📅 Agendar cita",n.fullName||"Cliente",[s]);let o,c,l,h;try{[o,c,l,h]=await Promise.all([Av(),Sv(),Pv(n.ownerId),xv(n.vehicleOfInterestId)])}catch{s.append(t),r("No se pudo cargar la disponibilidad — revisa tu conexión y vuelve a abrir el diálogo.");return}const p=kv(o,c,{}),m=u("select",{class:"select"},[u("option",{value:"visita",text:"Visita al concesionario"}),u("option",{value:"test_drive",text:"Test drive"}),u("option",{value:"llamada",text:"Llamada agendada"})]),g=u("select",{class:"select"},[u("option",{value:"30",text:"30 min"}),u("option",{value:"60",text:"1 hora",selected:""}),u("option",{value:"90",text:"1h 30"})]),E=u("input",{class:"input",type:"text",placeholder:"Nota (opcional)"}),S=u("button",{class:"btn btn--gold btn--sm",type:"button",text:"📅 Crear cita confirmada"}),k=u("button",{class:"btn btn--ghost btn--sm",type:"button",text:"Cancelar"});k.addEventListener("click",i),S.addEventListener("click",async()=>{t.hidden=!0;const{fecha:T,hora:L}=p.value();if(!T||!L)return r("Elige fecha y hora.");if(!l.value)return r("Elige el asesor que atiende.");S.disabled=!0,S.textContent="Creando…";const R=(l._advisors||[]).find(B=>B.uid===l.value)?.nombre||null,N=(h._vehicles||[]).find(B=>B.id===h.value);try{await Jn("create",null,{leadId:n.id||null,contactId:n.contactId||null,nombre:n.fullName||"Cliente",telefono:n.phone||null,email:n.email||null,fecha:T,hora:L,duracionMin:parseInt(g.value,10)||60,asesorId:l.value,asesorName:R,vehicleId:h.value||null,vehicleName:N?N.label:null,tipo:m.value,nota:E.value.trim()}),K("📅 Cita creada y confirmada — ya está en la Agenda","ok"),i(),e&&e()}catch(B){S.disabled=!1,S.textContent="📅 Crear cita confirmada",r(B&&B.message||"No se pudo crear la cita.")}}),s.append(u("div",{class:"cfg-row"},[p.dateIn,p.hourSel]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Asesor *"}),l]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Vehículo"}),h]),u("div",{class:"cfg-row"},[m,g]),E,t,u("div",{class:"nl-actions"},[k,S]))}function GC(n){const e=new Date,t={year:e.getFullYear(),month:e.getMonth(),events:[],loading:!0,error:null,sub:null},r=u("div",{class:"agenda__head"}),s=u("p",{class:"u-muted u-caption",style:{margin:"0",padding:"8px 10px",border:"1px dashed var(--line, #444)",borderRadius:"8px"}},["✅ Toca una cita para confirmarla (asignando asesor), pedir confirmación por WhatsApp, reprogramarla o cancelarla. ","Si el cliente no confirma, caduca sola 3h antes y libera el cupo. El ",u("a",{href:"/admin.html#solicitudes",target:"_blank",rel:"noopener",text:"calendario clásico"})," sigue de respaldo hasta el cambio definitivo."]),i=u("div",{class:"agenda__weekdays"},kC.map(T=>u("span",{class:"agenda__wd",text:T}))),o=u("div",{class:"agenda__grid"}),c=u("section",{class:"agenda"},[r,s,i,o]);_e(n),n.append(c);function l(T){let L=t.month+T,R=t.year;L<0?(L=11,R--):L>11&&(L=0,R++),t.year=R,t.month=L,k()}function h(){t.year=e.getFullYear(),t.month=e.getMonth(),k()}function p(){_e(r);const T=u("div",{class:"u-row u-row--tight"},[m("‹","Mes anterior",()=>l(-1)),u("button",{class:"btn btn--soft btn--sm",type:"button",onclick:h},["Hoy"]),m("›","Mes siguiente",()=>l(1))]);r.append(u("h2",{class:"agenda__title",text:`${Ep[t.month]} ${t.year}`}),T)}function m(T,L,R){const N=u("button",{class:"icon-btn",type:"button","aria-label":L},[T]);return N.addEventListener("click",R),N}function g(){if(p(),_e(o),t.error){o.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:"⚠️"}),u("div",{class:"state__title",text:"No se pudo cargar la agenda"}),u("div",{class:"state__msg",text:t.error})]));return}const T=xC(t.events);Tv(t.year,t.month).forEach(R=>{R.forEach(N=>{const B=Ni(N.date),P=T[B]||[],F=NC(N.date,e),I=u("div",{class:"agenda__day"+(N.inMonth?"":" is-out")+(F?" is-today":""),role:"gridcell"},[u("div",{class:"agenda__daynum",text:String(N.date.getDate())})]),v=u("div",{class:"agenda__events"});if(P.slice(0,3).forEach(w=>v.append(E(w))),P.length>3){const w=u("button",{class:"agenda__more",type:"button"},[`+${P.length-3} más`]);w.addEventListener("click",()=>Dt(w,P.map(A=>({value:A,label:`${Tp(A.dueAt)} · ${A.relatedTo?.name||A.subject||"Cita"}`})),A=>S(A.value),{title:`${N.date.getDate()} ${Ep[t.month]}`})),v.append(w)}I.append(v),o.append(I)})})}function E(T){const L=T.type==="cita"?T.estadoCita||"pendiente":null,R="agenda__chip"+(L?" agenda__chip--"+L:"")+(T.status==="closed"?" is-closed":""),N=u("button",{class:R,type:"button",title:T.subject||"Cita"},[u("span",{class:"agenda__chip-time",text:Tp(T.dueAt)}),u("span",{class:"u-truncate",text:T.relatedTo?.name||T.subject||"Cita"})]);return N.addEventListener("click",()=>S(T)),N}function S(T){if(T.type==="cita"&&T.sourceSolicitudId){jC(T,{onLead:R=>G.set({detailLeadId:R})});return}const L=T.relatedTo&&T.relatedTo.id;L&&G.set({detailLeadId:L})}function k(){if(g(),t.sub&&(t.sub(),t.sub=null),G.get().mock){t.events=ZR(),t.loading=!1,g();return}const{startISO:T,endISO:L}=PC(t.year,t.month);t.sub=VC(T,L,R=>{t.events=R,t.loading=!1,t.error=null,g()},R=>{t.loading=!1,t.error=R&&R.code==="permission-denied"?"Sin permiso.":"Revisa tu conexión.",g()})}return k(),function(){t.sub&&t.sub(),t.sub=null}}const HC=n=>{const e=new Date(n).getTime();return Number.isNaN(e)?0:e},dc=n=>n.status==="won",Nv=n=>n.status==="lost",cd=n=>n.status==="open",ld=n=>n.status==="convertido";function Ap(n,e){return e?n.filter(t=>HC(t.createdAt)>=e):n.slice()}function KC(n,e){const t=n.length,r=n.filter(ld).length,s=e.filter(dc),i=e.filter(Nv),o=s.reduce((l,h)=>l+(Number(h.amount)||0),0),c=s.length+i.length;return{leadsNew:t,convertidos:r,convRate:t?r/t:0,won:s.length,lost:i.length,winRate:c?s.length/c:0,wonValue:o}}function WC(n,e){const t=e.filter(cd),r=n.filter(i=>!vs(i.status)),s=r.filter(i=>{const o=cv(i);return!o.closed&&(o.state==="warn"||o.state==="late")}).length;return{leadsActive:r.length,dealsOpen:t.length,pipelineWeighted:gv(t),slaRisk:s}}function QC(n,e){const t=new Set(e.filter(dc).map(h=>h.id)),r=n.filter(h=>h.status==="contactado"||h.status==="calificado"||h.status==="convertido"),s=n.filter(h=>h.status==="calificado"||h.status==="convertido"),i=n.filter(ld),o=i.filter(h=>h.convertedTo&&t.has(h.convertedTo.dealId)),c=n.length||1,l=[{key:"leads",label:"Leads",count:n.length},{key:"contactados",label:"Contactados",count:r.length},{key:"calificados",label:"Calificados",count:s.length},{key:"convertidos",label:"Convertidos",count:i.length},{key:"ganados",label:"Ganados",count:o.length}];return l.map((h,p)=>({...h,pctTop:h.count/c,convFromPrev:p===0?1:l[p-1].count?h.count/l[p-1].count:0}))}function YC(n,e){const t={},r=s=>t[s.key]||(t[s.key]={key:s.key,label:s.label,icon:s.icon,leads:0,convertidos:0,deals:0,won:0,revenue:0});return n.forEach(s=>{const i=r(Pi(s));i.leads++,ld(s)&&i.convertidos++}),e.forEach(s=>{const i=r(Pi(s));i.deals++,dc(s)&&(i.won++,i.revenue+=Number(s.amount)||0)}),Object.values(t).map(s=>({...s,convRate:s.leads?s.convertidos/s.leads:0})).sort((s,i)=>i.leads-s.leads||i.revenue-s.revenue)}function JC(n){const e=n.filter(cd);return ai.map(t=>{const r=e.filter(s=>s.stageId===t.id);return{id:t.id,label:t.label,prob:t.prob,count:r.length,value:r.reduce((s,i)=>s+(Number(i.amount)||0),0),weighted:r.reduce((s,i)=>s+ad(i),0)}})}function XC(n,e,t=[]){const r={},s=(i,o)=>r[i]||(r[i]={ownerId:i,ownerName:o,leads:0,deals:0,won:0,lost:0,pipelineWeighted:0});return t.forEach(i=>s(i.uid,i.nombre)),n.forEach(i=>{const o=i.ownerId||"_none";s(o,i.ownerName||(o==="_none"?"Sin asignar":o)).leads++}),e.forEach(i=>{const o=i.ownerId||"_none",c=s(o,i.ownerName||(o==="_none"?"Sin asignar":o));c.deals++,dc(i)?c.won++:Nv(i)?c.lost++:cd(i)&&(c.pipelineWeighted+=ad(i))}),Object.values(r).filter(i=>i.leads||i.deals).map(i=>({...i,winRate:i.won+i.lost?i.won/(i.won+i.lost):0})).sort((i,o)=>o.won-i.won||o.pipelineWeighted-i.pipelineWeighted||o.leads-i.leads)}function ZC(n,e=30){const t=[],r={},s=new Date;for(let i=e-1;i>=0;i--){const o=new Date(s.getFullYear(),s.getMonth(),s.getDate()-i),c={key:Ni(o),date:o,count:0};t.push(c),r[c.key]=c}return n.forEach(i=>{if(!i.createdAt)return;const o=r[Ni(new Date(i.createdAt))];o&&o.count++}),t}function ek(n){const e=new Date(n);return Number.isNaN(e.getTime())?"":e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")}function tk(n=6){const e=[],t=new Date;for(let r=0;r<n;r++){const s=new Date(t.getFullYear(),t.getMonth()-r,1),i=s.getFullYear()+"-"+String(s.getMonth()+1).padStart(2,"0"),o=s.toLocaleDateString("es-CO",{month:"long",year:"numeric"});e.push({key:i,label:o.charAt(0).toUpperCase()+o.slice(1)})}return e}function nk(n,e,t=[]){const r=(n||[]).filter(i=>i.status==="won"&&ek(i.wonAt||i.lastActivityAt)===e),s={};return r.forEach(i=>{const o=i.commissionSnapshot||{},c=o.ownerId||i.ownerId||"_none",l=(t.find(g=>g.uid===c)||{}).nombre,h=s[c]||(s[c]={ownerId:c,ownerName:l||i.ownerName||(c==="_none"?"Sin asignar":c),vendidos:0,liquidables:0,pendientes:0,baseLiquidable:0,basePendiente:0,deals:[]}),p=Number(o.amount!=null?o.amount:i.amount)||0,m=vv(i);h.vendidos++,m?(h.liquidables++,h.baseLiquidable+=p):(h.pendientes++,h.basePendiente+=p),h.deals.push({id:i.id,name:i.name||"",base:p,liquidable:m,tipoPago:o.tipoPago||i.tipoPago||""})}),Object.values(s).sort((i,o)=>o.baseLiquidable-i.baseLiquidable||o.vendidos-i.vendidos)}const Sp=[{value:0,label:"Hoy"},{value:7,label:"7 días"},{value:30,label:"30 días"},{value:90,label:"90 días"},{value:null,label:"Todo"}];function rk(n){if(n==null)return null;const e=new Date;return new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime()-n*864e5}const Dv=n=>({id:n.id,...n.data()});async function Rp(n,e){return(await rn(lt(Se(ie,n),wt("createdAt","desc"),It(e)))).docs.map(Dv)}async function sk({pageSize:n=500}={}){if(G.get().mock){const i=Fl();return{leads:Aa(),deals:i,wons:i.filter(o=>o.status==="won"),capped:!1}}const[e,t,r]=await Promise.all([Rp("leads",n),Rp("deals",n),rn(lt(Se(ie,"deals"),Dn("status","==","won"),wt("lastActivityAt","desc"),It(300)))]);return{leads:e.filter(i=>!i.archived),deals:t,wons:r.docs.map(Dv),capped:e.length>=n||t.length>=n}}const ik="http://www.w3.org/2000/svg";function Qc(n,e={},t=[]){const r=document.createElementNS(ik,n);for(const[s,i]of Object.entries(e))i==null||i===!1||r.setAttribute(s,String(i));for(const s of[].concat(t))s==null||s===!1||s===""||r.append(s.nodeType?s:document.createTextNode(String(s)));return r}function ok(n,e={}){const t=e.max!=null?e.max:Math.max(1,...n.map(s=>Number(s.value)||0)),r=u("div",{class:"reportes__bars",role:"list"});return n.forEach(s=>{const i=s.pct!=null?s.pct:t?(Number(s.value)||0)/t:0,o=Math.max(0,Math.min(100,i*100));r.append(u("div",{class:"reportes__bar",role:"listitem"},[u("span",{class:"reportes__bar-label u-truncate",text:s.label}),u("span",{class:"reportes__bar-track","aria-hidden":"true"},[u("span",{class:"reportes__bar-fill",style:{width:o+"%",background:s.color||"var(--grad-gold)"}})]),u("span",{class:"reportes__bar-val u-mono",text:s.display!=null?s.display:String(s.value)})]))}),r}function ak(n){const s=n.map(S=>Number(S.value)||0),i=Math.max(...s,0),o=Math.max(1,i),c=n.length,l=S=>c<=1?600/2:6+S*(600-2*6)/(c-1),h=S=>134-S/o*(140-2*6),p=n.map((S,k)=>`${l(k).toFixed(1)},${h(s[k]).toFixed(1)}`).join(" "),m=`6,134 ${p} ${594 .toFixed(1)},134`,g=s.reduce((S,k)=>S+k,0),E=(n[s.indexOf(i)]||{}).label||"";return Qc("svg",{class:"reportes__spark",viewBox:"0 0 600 140",preserveAspectRatio:"none",role:"img","aria-label":`Tendencia: ${g} en total; pico de ${i}${E?" el "+E:""}.`},[Qc("polygon",{points:m,fill:"var(--gold-300)",opacity:"0.30"}),Qc("polyline",{points:p,fill:"none",stroke:"var(--gold-500)","stroke-width":"2","stroke-linejoin":"round","stroke-linecap":"round","vector-effect":"non-scaling-stroke"})])}const Et=n=>Math.round((n||0)*100)+"%",gt=n=>Yn(n)||"$0",Yc=n=>`${n.getDate()}/${n.getMonth()+1}`;function ck(n){const e=tk(6),t={leads:[],deals:[],wons:[],loading:!0,error:null,capped:!1,days:30,month:e[0].key};let r=!0;const s=u("div",{class:"reportes__chips",role:"group","aria-label":"Período"}),i=u("button",{class:"btn btn--soft btn--sm",type:"button"},["↻ Actualizar"]),o=u("button",{class:"btn btn--soft btn--sm",type:"button"},["⤓ CSV"]);i.addEventListener("click",A),o.addEventListener("click",w);const c=u("div",{class:"reportes__toolbar"},[s,u("div",{class:"u-row u-row--tight"},[i,o])]),l=u("div",{class:"reportes__body"}),h=u("section",{class:"reportes"},[c,l]);_e(n),n.append(h);function p(){_e(s),Sp.forEach(b=>{const C=t.days===b.value,y=u("button",{class:"chip",type:"button","aria-pressed":C?"true":"false"},[b.label]);y.addEventListener("click",()=>{t.days=b.value,g()}),s.append(y)})}function m(){const b=rk(t.days),C=Ap(t.leads,b),y=Ap(t.deals,b);return{pLeads:C,pDeals:y,pk:KC(C,y),ck:WC(t.leads,t.deals),fn:QC(C,t.deals),src:YC(C,y),stg:JC(t.deals),own:XC(C,y,G.get().mock?Ml():G.get().team||[]),tr:ZC(t.leads,30),com:nk(t.wons,t.month,G.get().mock?Ml():G.get().team||[])}}function g(){if(p(),t.loading)return v();if(t.error)return I("⚠️","No se pudieron cargar los reportes",t.error);if(!t.leads.length&&!t.deals.length)return I("📊","Aún no hay datos para reportar","Cuando entren leads y oportunidades, aquí verás tus KPIs, el embudo y el rendimiento por fuente.");const b=m();_e(l),t.capped&&l.append(u("div",{class:"reportes__notice u-caption"},["ℹ️ Mostrando los registros más recientes (tope por carga). Los totales históricos completos llegarán con los reportes acumulados."])),l.append(E("Del período",[S("Leads nuevos",String(b.pk.leadsNew)),S("Tasa de conversión",Et(b.pk.convRate),`${b.pk.convertidos} de ${b.pk.leadsNew}`),S("Win rate",Et(b.pk.winRate),`${b.pk.won} ganadas · ${b.pk.lost} perdidas`),S("Valor ganado",gt(b.pk.wonValue),null,!0)]),E("Estado actual",[S("Leads activos",String(b.ck.leadsActive)),S("Oportunidades abiertas",String(b.ck.dealsOpen)),S("Pipeline ponderado",gt(b.ck.pipelineWeighted),null,!0),S("SLA en riesgo",String(b.ck.slaRisk),b.ck.slaRisk?"requieren atención":"al día")]),k(b.fn),T(b.src),L(b.stg),R(b.tr),N(b.own),B(b.com))}function E(b,C){return u("div",{class:"reportes__section"},[u("h2",{class:"reportes__sec-title",text:b}),u("div",{class:"reportes__kpis"},C)])}function S(b,C,y,le){return u("div",{class:"reportes__kpi"+(le?" reportes__kpi--hi":"")},[u("span",{class:"reportes__kpi-label u-caption u-faint",text:b}),u("strong",{class:"reportes__kpi-val",text:C}),y?u("span",{class:"reportes__kpi-sub u-caption u-faint",text:y}):null])}function k(b){const C=b.map((y,le)=>({label:y.label,value:y.count,pct:y.pctTop,display:le===0?String(y.count):`${y.count} · ${Et(y.convFromPrev)}`,color:"var(--grad-gold)"}));return P("Embudo de ventas","De lead a venta — dónde se pierde el avance",ok(C,{max:b[0]?b[0].count:1}))}function T(b){const C=["Canal","Leads","Conv.","Oport.","Ganados","Ingresos"],y=b.map(fe=>[`${fe.icon||""} ${fe.label}`.trim(),String(fe.leads),Et(fe.convRate),String(fe.deals),String(fe.won),gt(fe.revenue)]),le=b.length?null:"Sin leads en el período.";return P("Rendimiento por canal","Atribución de fuente: de dónde vienen y cuánto rinden",F(C,y,le))}function L(b){const C=["Etapa","Prob.","Oport.","Valor","Ponderado"],y=b.map(X=>[X.label,Et(X.prob),String(X.count),gt(X.value),gt(X.weighted)]),le=b.reduce((X,ye)=>({count:X.count+ye.count,value:X.value+ye.value,weighted:X.weighted+ye.weighted}),{count:0,value:0,weighted:0}),fe=["Total","",String(le.count),gt(le.value),gt(le.weighted)];return P("Forecast por etapa","Pipeline abierto actual (no depende del período)",F(C,y,null,fe))}function R(b){const C=b.reduce((X,ye)=>X+ye.count,0),y=b.map(X=>({label:Yc(X.date),value:X.count})),le=b.length?`${Yc(b[0].date)} – ${Yc(b[b.length-1].date)}`:"",fe=u("div",{class:"reportes__chart"},[ak(y),u("div",{class:"reportes__axis u-caption u-faint"},[u("span",{text:le}),u("span",{text:`${C} leads`})])]);return P("Tendencia de captación","Nuevos leads · últimos 30 días",fe)}function N(b){const C=["Asesor","Leads","Oport.","Ganados","Win rate","Pipeline pond."],y=b.map(fe=>[fe.ownerName,String(fe.leads),String(fe.deals),String(fe.won),Et(fe.winRate),gt(fe.pipelineWeighted)]),le=b.length?null:"Sin actividad asignada en el período.";return P("Rendimiento del equipo","Por asesor, en el período seleccionado",F(C,y,le))}function B(b){const C=u("select",{class:"select","aria-label":"Mes de liquidación",style:{maxWidth:"220px"}},e.map(z=>{const q=u("option",{value:z.key},[z.label]);return z.key===t.month&&(q.selected=!0),q}));C.addEventListener("change",()=>{t.month=C.value,g()});const y=["Asesor","Vendidos","✓ Liquidables","Base liquidable","⏳ Pendientes","Base pendiente"],le=b.map(z=>[z.ownerName,String(z.vendidos),String(z.liquidables),gt(z.baseLiquidable),String(z.pendientes),gt(z.basePendiente)]),fe=b.reduce((z,q)=>({v:z.v+q.vendidos,l:z.l+q.liquidables,bl:z.bl+q.baseLiquidable,p:z.p+q.pendientes,bp:z.bp+q.basePendiente}),{v:0,l:0,bl:0,p:0,bp:0}),X=b.length?["Total",String(fe.v),String(fe.l),gt(fe.bl),String(fe.p),gt(fe.bp)]:null,ye=b.length?null:"Sin ventas ganadas en el mes seleccionado.",Fe=b.flatMap(z=>z.deals.map(q=>[q.name||q.id,z.ownerName,gt(q.base),q.tipoPago||"—",q.liquidable?"✓ liquidable":"⏳ checklist pendiente"])),x=u("div",{},[u("div",{class:"u-row",style:{marginBottom:"10px"}},[C]),F(y,le,ye,X),Fe.length?u("details",{style:{marginTop:"10px"}},[u("summary",{class:"u-caption u-muted",text:"Detalle por negocio ("+Fe.length+")"}),F(["Negocio","Asesor","Base","Pago","Estado"],Fe,null)]):null]);return P("Comisiones del mes",'"Si no está en el CRM, no entra a liquidación" — solo vendidos con checklist post-venta completo (F42)',x)}function P(b,C,y){return u("div",{class:"reportes__section"},[u("div",{class:"reportes__sec-head"},[u("h2",{class:"reportes__sec-title",text:b}),C?u("span",{class:"reportes__sec-cap u-caption u-faint",text:C}):null]),y])}function F(b,C,y,le){if(!C.length&&y)return u("div",{class:"reportes__empty u-caption u-faint",text:y});const fe=u("thead",{},[u("tr",{},b.map((Fe,x)=>u("th",{class:x===0?"":"is-num",scope:"col",text:Fe})))]),X=u("tbody",{},C.map(Fe=>u("tr",{},Fe.map((x,z)=>u("td",{class:z===0?"":"is-num",text:x}))))),ye=[fe,X];return le&&ye.push(u("tfoot",{},[u("tr",{},le.map((Fe,x)=>x===0?u("th",{scope:"row",text:Fe}):u("td",{class:"is-num",text:Fe})))])),u("div",{class:"reportes__tablewrap"},[u("table",{class:"reportes__table"},ye)])}function I(b,C,y){_e(l),l.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:b}),u("div",{class:"state__title",text:C}),u("div",{class:"state__msg",text:y})]))}function v(){_e(l);const b=u("div",{class:"reportes__kpis"},[1,2,3,4].map(()=>u("div",{class:"reportes__kpi"},[u("span",{class:"skeleton",style:{width:"100%",height:"46px"}})])));l.append(u("div",{class:"reportes__section"},[b])),l.append(u("div",{class:"reportes__section"},[u("span",{class:"skeleton",style:{width:"100%",height:"160px"}})]))}function w(){if(t.loading||t.error){K("Aún no hay datos para exportar","info");return}const b=m(),C=(Sp.find(X=>X.value===t.days)||{}).label||"",y=[],le=X=>{y.push([]),y.push([X])};y.push(["Reporte Altorra CRM"]),y.push(["Período",C]),y.push(["Generado",new Date().toLocaleString("es-CO")]),le("KPIs del período"),y.push(["Métrica","Valor"]),y.push(["Leads nuevos",b.pk.leadsNew]),y.push(["Conversión",Et(b.pk.convRate)]),y.push(["Win rate",Et(b.pk.winRate)]),y.push(["Ganadas",b.pk.won]),y.push(["Perdidas",b.pk.lost]),y.push(["Valor ganado (COP)",b.pk.wonValue]),y.push(["Leads activos (ahora)",b.ck.leadsActive]),y.push(["Oportunidades abiertas (ahora)",b.ck.dealsOpen]),y.push(["Pipeline ponderado COP (ahora)",b.ck.pipelineWeighted]),y.push(["SLA en riesgo (ahora)",b.ck.slaRisk]),le("Embudo"),y.push(["Etapa","Cantidad","Conversión desde anterior"]),b.fn.forEach((X,ye)=>y.push([X.label,X.count,ye===0?"":Et(X.convFromPrev)])),le("Rendimiento por canal"),y.push(["Canal","Leads","Conversión","Oportunidades","Ganados","Ingresos (COP)"]),b.src.forEach(X=>y.push([X.label,X.leads,Et(X.convRate),X.deals,X.won,X.revenue])),le("Forecast por etapa (pipeline actual)"),y.push(["Etapa","Probabilidad","Oportunidades","Valor (COP)","Ponderado (COP)"]),b.stg.forEach(X=>y.push([X.label,Et(X.prob),X.count,X.value,X.weighted])),le("Rendimiento del equipo"),y.push(["Asesor","Leads","Oportunidades","Ganados","Win rate","Pipeline ponderado (COP)"]),b.own.forEach(X=>y.push([X.ownerName,X.leads,X.deals,X.won,Et(X.winRate),X.pipelineWeighted]));const fe=(e.find(X=>X.key===t.month)||{}).label||t.month;le("Comisiones del mes — "+fe+" (F42: solo checklist completo entra a liquidación)"),y.push(["Asesor","Vendidos","Liquidables","Base liquidable (COP)","Pendientes","Base pendiente (COP)"]),b.com.forEach(X=>y.push([X.ownerName,X.vendidos,X.liquidables,X.baseLiquidable,X.pendientes,X.basePendiente])),y.push([]),y.push(["Negocio","Asesor","Base (COP)","Pago","Estado"]),b.com.forEach(X=>X.deals.forEach(ye=>y.push([ye.name||ye.id,X.ownerName,ye.base,ye.tipoPago||"",ye.liquidable?"liquidable":"checklist pendiente"]))),dk(`altorra-reportes-${Ni(new Date)}.csv`,uk(y)),K("Reporte exportado","ok")}async function A(){t.loading=!0,t.error=null,g();try{const b=await sk();if(!r)return;t.leads=b.leads,t.deals=b.deals,t.wons=b.wons||[],t.capped=!!b.capped,t.loading=!1}catch(b){if(!r)return;t.loading=!1,t.error=b&&b.code==="permission-denied"?"Sin permiso para ver los reportes.":"Revisa tu conexión e intenta de nuevo."}g()}return A(),function(){r=!1}}function lk(n){let e=n==null?"":String(n);return/^[=+\-@\t\r]/.test(e)&&!/^-?\d+([.,]\d+)?$/.test(e)&&(e="'"+e),/[",\n\r;]/.test(e)?'"'+e.replace(/"/g,'""')+'"':e}function uk(n){return"\uFEFF"+n.map(e=>e.map(lk).join(",")).join(`\r
`)}function dk(n,e){const t=new Blob([e],{type:"text/csv;charset=utf-8;"}),r=URL.createObjectURL(t),s=document.createElement("a");s.href=r,s.download=n,document.body.append(s),s.click(),s.remove(),setTimeout(()=>URL.revokeObjectURL(r),1e3)}function Vv(n,e){const t=String(n||"").trim();if(!t)return"";const r=t.replace(/[^\d+]/g,"").startsWith("+");let s=t.replace(/\D/g,"");if(!s)return"";const i=String(e||"").replace(/\D/g,"");return i&&!r&&!s.startsWith(i)?s=i+s:!i&&!r&&s.length===10&&s.startsWith("3")&&(s="57"+s),"+"+s}function Cp(n){return String(n||"").replace(/[^a-z0-9]/gi,"_").slice(0,480)}function hk({email:n,phone:e,prefijoPais:t}){const r=[],s=String(n||"").trim().toLowerCase();s&&r.push(Cp("email:"+s));const i=Vv(e,t);return i&&r.push(Cp("phone:"+i)),r}const Ra=n=>({id:n.id,...n.data()});async function fk({pageSize:n=500}={}){if(G.get().mock)return{contacts:WR(),leads:Aa()};const[e,t]=await Promise.all([rn(lt(Se(ie,"contacts"),wt("createdAt","desc"),It(n))).then(r=>r.docs.map(Ra)),rn(lt(Se(ie,"leads"),wt("createdAt","desc"),It(n))).then(r=>r.docs.map(Ra))]);return{contacts:e.filter(r=>!r._mergedInto&&!r._suppressed),leads:t}}async function Ca(n){if(!n)return null;const e=await Ar(ke(ie,"contacts",n));return e.exists()?{id:e.id,...e.data()}:null}function pk(n,e,t){const r=lt(Se(ie,"activities"),Dn("relatedTo.id","==",n),wt("createdAt","desc"),It(50));return an(r,s=>e(s.docs.map(Ra)),s=>t&&t(s))}function mk(n,e,t){const r=lt(Se(ie,"contacts",n,"crmNotes"),wt("createdAt","desc"),It(50));return an(r,s=>e(s.docs.map(Ra)),s=>t&&t(s))}async function gk({email:n,phone:e},t){for(const r of hk({email:n,phone:e})){const s=await Ar(ke(ie,"dedup",r));if(s.exists()&&s.data().contactId!==t)return{key:r,contactId:s.data().contactId}}return null}async function _k(n,e,t){const r=ke(ie,"contacts",n),s=async i=>{const o={...e,updatedAt:new Date().toISOString(),_version:i+1};return e.phone!==void 0&&(o.phone=Vv(e.phone,"+57")||null),pt(r,o)};try{return await s(t._version||0),{ok:!0}}catch(i){if(!i||i.code!=="permission-denied")throw i;const o=await Ca(n);if(!o)throw i;if(Object.keys(e).some(l=>String(o[l]??"")!==String(t[l]??""))){const l=new Error("conflict");throw l.code="conflict",l.fresh=o,l}return await s(o._version||0),{ok:!0,retried:!0}}}async function vk(n,e){return(await Sr(Rr,"crmMergeContacts")({survivorId:n,mergedId:e})).data}async function yk(n){return(await Sr(Rr,"crmSuppressContact")({contactId:n})).data}async function bk(n){return(await Sr(Rr,"crmCancelSuppression")({contactId:n})).data}async function wk(n,e){const t=G.get().user;await jt(Se(ie,"contacts",n,"crmNotes"),{body:String(e||"").trim(),authorId:t?t.uid:null,authorName:G.get().profile&&G.get().profile.nombre||t&&t.email||"Asesor",createdAt:new Date().toISOString()})}const Ik=[{id:"todos",label:"Todos"},{id:"lead",label:"Leads"},{id:"cliente",label:"Clientes"},{id:"suscriptor",label:"Suscriptores"}],Ek={lead:{label:"Lead",badge:"gold"},cliente:{label:"Cliente",badge:"ok"},suscriptor:{label:"Suscriptor",badge:"info"}};function kp(n){const e=String(n.lifecycleStage||n.type||"").toLowerCase();return e==="subscriber"||e==="suscriptor"?"suscriptor":e==="customer"||e==="cliente"?"cliente":"lead"}function Tk(n){const e={contacts:[],leads:[],loading:!0,error:null,q:"",filter:"todos"};let t=!0;const r=u("input",{type:"search",placeholder:"Buscar por nombre, correo o teléfono…","aria-label":"Buscar contactos"});r.addEventListener("input",()=>{e.q=r.value,S()});const s=u("div",{class:"search"},[u("span",{"aria-hidden":"true",text:"🔎"}),r]),i={},o=u("div",{class:"contactos__chips",role:"group","aria-label":"Filtrar por tipo"});Ik.forEach(R=>{const N=u("button",{class:"chip",type:"button","aria-pressed":R.id===e.filter?"true":"false"},[R.label]);N.addEventListener("click",()=>{e.filter=R.id,Object.entries(i).forEach(([B,P])=>P.setAttribute("aria-pressed",B===R.id?"true":"false")),S()}),i[R.id]=N,o.append(N)});const c=u("span",{class:"contactos__count u-caption u-faint"}),l=u("button",{class:"btn btn--soft btn--sm",type:"button"},["↻ Actualizar"]);l.addEventListener("click",L);const h=u("div",{class:"contactos__toolbar"},[s,o,u("div",{class:"u-row u-row--tight"},[c,l])]),p=u("div",{class:"contactos__list"}),m=u("section",{class:"contactos"},[h,p]);_e(n),n.append(m);function g(){const R={};for(const N of e.leads){if(!N.contactId)continue;const B=R[N.contactId];(!B||new Date(N.createdAt)>new Date(B.createdAt))&&(R[N.contactId]=N)}return R}function E(R){G.set({leads:e.leads,detailLeadId:R.id})}function S(){if(e.loading)return T("⏳","Cargando contactos…","");if(e.error)return T("⚠️","No se pudieron cargar los contactos",e.error);if(!e.contacts.length)return T("👥","Aún no hay contactos","Cuando entren leads, registros de cuenta o suscripciones, las personas aparecerán aquí.");const R=g(),N=Ta(e.q),B=e.contacts.filter(P=>e.filter!=="todos"&&kp(P)!==e.filter?!1:N?Ta(`${P.fullName||""} ${P.email||""} ${P.phone||""}`).includes(N):!0);if(c.textContent=`${B.length} de ${e.contacts.length}`,_e(p),!B.length){p.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:"🔍"}),u("div",{class:"state__title",text:"Sin resultados"}),u("div",{class:"state__msg",text:"Prueba con otro término o filtro."})]));return}B.forEach(P=>p.append(k(P,R[P.id])))}function k(R,N){const B=kp(R),P=Ek[B],F=Pi(R),I=Number(R.score)>0&&Xr[R.rating],v=u("div",{class:"contact-row__badges"},[u("span",{class:`badge badge--${P.badge}`,text:P.label}),u("span",{class:"badge",text:`${F.icon} ${F.label}`}),I?u("span",{class:`temp ${Xr[R.rating].cls}`,text:`${Xr[R.rating].icon} ${R.score}`}):null]),w=[R.email,R.phone].filter(Boolean).join(" · ")||"Sin datos de contacto",A=Array.isArray(R.tags)&&R.tags.length?u("span",{class:"contact-row__tags u-caption u-faint u-truncate",text:"🏷️ "+R.tags.join(", ")}):null,b=[u("span",{class:"avatar avatar--sm","aria-hidden":"true",text:gs(R.fullName)}),u("div",{class:"contact-row__main"},[u("span",{class:"contact-row__name u-truncate",text:R.fullName||"Sin nombre"}),u("span",{class:"contact-row__sub u-caption u-faint u-truncate",title:w,text:w}),A]),v,u("span",{class:"contact-row__time u-caption u-faint",text:lr(R.lastActivityAt)})];if(N){const C=u("button",{class:"contact-row",type:"button","aria-label":`Ver ficha de ${R.fullName||"contacto"}`},b);return C.addEventListener("click",()=>E(N)),C}return u("div",{class:"contact-row contact-row--nolead"},b)}function T(R,N,B){c.textContent="",_e(p),p.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:R}),u("div",{class:"state__title",text:N}),B?u("div",{class:"state__msg",text:B}):null]))}async function L(){e.loading=!0,e.error=null,S();try{const R=await fk();if(!t)return;e.contacts=R.contacts,e.leads=R.leads,e.loading=!1}catch(R){if(!t)return;e.loading=!1,e.error=R&&R.code==="permission-denied"?"Sin permiso para ver los contactos.":"Revisa tu conexión e intenta de nuevo."}S()}return L(),function(){t=!1}}function Ak(n,e,t){const r=u("div",{class:"modal"},[u("div",{class:"modal__head"},[u("h2",{class:"modal__title",text:n}),e?u("span",{class:"u-caption u-faint",text:e}):null]),...t]),s=u("div",{class:"modal-overlay"},[r]);document.body.appendChild(s);const i=()=>{s.remove(),window.removeEventListener("keydown",o)},o=c=>{c.key==="Escape"&&i()};return window.addEventListener("keydown",o),s.addEventListener("mousedown",c=>{c.target===s&&i()}),{close:i}}function Sk(n,{onChanged:e}={}){if(!n){K("El contacto aún no carga.","error");return}if(G.get().mock){K("En demo no se edita el directorio.","info");return}if(n._mergedInto){K("Este contacto está fusionado en otro.","info");return}const t=u("div",{class:"nl-form"}),r=u("div",{class:"login__error",role:"alert",hidden:!0}),s=k=>{r.textContent=k,r.hidden=!1},{close:i}=Ak("✏️ Editar contacto",n.fullName||"",[t]),o=n.suppressionStatus==="pendiente_supresion",c=u("input",{class:"input",type:"text",value:n.fullName||"",maxlength:"80"}),l=u("input",{class:"input",type:"email",value:n.email||"",placeholder:"correo@ejemplo.com"}),h=u("input",{class:"input",type:"tel",value:n.phone||"",placeholder:"+57 300 000 0000"}),p=u("button",{class:"btn btn--gold btn--sm",type:"button",text:"Guardar cambios"}),m=u("button",{class:"btn btn--ghost btn--sm",type:"button",text:"Cancelar"});m.addEventListener("click",i);async function g(k){r.hidden=!0;const T={};if(c.value.trim()!==(n.fullName||"")&&(T.fullName=c.value.trim()),l.value.trim().toLowerCase()!==(n.email||"")&&(T.email=l.value.trim().toLowerCase()||null),h.value.trim()!==(n.phone||"")&&(T.phone=h.value.trim()||null),!Object.keys(T).length){i();return}p.disabled=!0,p.textContent="Guardando…";try{if(T.email!==void 0||T.phone!==void 0){const L=await gk({email:T.email!==void 0?T.email:n.email,phone:T.phone!==void 0?T.phone:n.phone},n.id);if(L)return p.disabled=!1,p.textContent="Guardar cambios",E(L)}await _k(n.id,T,k||n),K("✓ Contacto actualizado","ok"),i(),e&&e()}catch(L){if(p.disabled=!1,p.textContent="Guardar cambios",L&&L.code==="conflict"&&L.fresh){s("Alguien actualizó este contacto mientras editabas. Valores actuales: "+(L.fresh.fullName||"—")+" · "+(L.fresh.email||"sin email")+" · "+(L.fresh.phone||"sin tel")+'. Pulsa "Guardar" de nuevo para PISAR con lo tuyo, o Cancelar para conservar lo del server.'),p.disabled=!1,p.onclick=()=>g(L.fresh);return}s(L&&L.message||"No se pudo guardar.")}}p.addEventListener("click",()=>g(null));async function E(k){const T=await Ca(k.contactId).catch(()=>null),L=T&&T.fullName||k.contactId;if(!ft("*")){s("Ese email/teléfono YA pertenece a otro contacto ("+L+"). Pídele al Super Admin fusionarlos — no se crean duplicados.");return}t.replaceChildren(u("p",{},["Ese dato ya pertenece a ",u("strong",{text:L}),". Son la misma persona → fusiónalos. Elige quién SOBREVIVE (el otro queda como histórico apuntando aquí):"]),r);const R=(N,B,P)=>{const F=u("button",{class:"btn btn--soft btn--sm",type:"button",text:N});return F.addEventListener("click",async()=>{if(confirm("¿Fusionar definitivamente? Re-apunta leads, negocios y notas. No se puede deshacer.")){F.disabled=!0;try{const I=await vk(B,P);K(`🔗 Fusionados: ${I.counts?I.counts.leads:0} lead(s), ${I.counts?I.counts.deals:0} negocio(s)`,"ok"),i(),e&&e()}catch(I){F.disabled=!1,s(I&&I.message||"No se pudo fusionar.")}}}),F};t.append(u("div",{class:"cita-actions"},[R("Sobrevive ESTE ("+(n.fullName||"actual")+")",n.id,k.contactId),R("Sobrevive el OTRO ("+L+")",k.contactId,n.id),u("button",{class:"btn btn--ghost btn--sm",type:"button",text:"Cancelar",onclick:i})]))}function S(){if(!ft("crm.delete"))return null;const k=u("div",{class:"cfg-card",style:{borderColor:"var(--danger, #e5484d)"}});if(k.append(u("h3",{class:"cfg-card__title",text:"🛡 Privacidad (Ley 1581)"})),o){k.append(u("p",{class:"u-caption",text:"⏳ Supresión programada: se ejecuta el "+String(n.suppressionExecuteAfter||"").slice(0,16).replace("T"," ")+". Hasta entonces es reversible."}));const T=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"↩️ Cancelar supresión"});T.addEventListener("click",async()=>{T.disabled=!0;try{const L=await bk(n.id);K(L.duplicates&&L.duplicates.length?"↩️ Supresión cancelada — OJO: nació un duplicado durante la espera, fusiónalos.":"↩️ Supresión cancelada","ok"),i(),e&&e()}catch(L){T.disabled=!1,s(L&&L.message||"No se pudo cancelar.")}}),k.append(T)}else{k.append(u("p",{class:"u-caption u-muted",text:"Derecho de supresión: borra los datos personales (nombre, contacto, notas) de forma DEFINITIVA tras 72h de gracia. El historial comercial (montos, fechas, carro) se conserva anónimo. Las copias ya enviadas por Telegram/email quedan fuera del alcance técnico."}));const T=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"🗑 Solicitar supresión definitiva…"});T.addEventListener("click",async()=>{const L=prompt("DOBLE CONFIRMACIÓN: escribe SUPRIMIR para programar el borrado de datos personales de "+(n.fullName||"este contacto")+" (72h de gracia, reversible hasta entonces).");if(L!=="SUPRIMIR"){L!==null&&K("Texto incorrecto — no se hizo nada.","info");return}T.disabled=!0;try{const R=await yk(n.id);K("🛡 Supresión programada para "+String(R.executeAfter||"").slice(0,16).replace("T"," "),"ok"),i(),e&&e()}catch(R){T.disabled=!1,s(R&&R.message||"No se pudo programar.")}}),k.append(T)}return k}o?t.append(u("p",{class:"cita-conflict",text:"⏳ Este contacto tiene una supresión Ley 1581 programada — no se puede editar (cancélala primero si fue un error)."}),r,S(),u("div",{class:"nl-actions"},[m])):t.append(u("label",{class:"field"},[u("span",{class:"field__label",text:"Nombre"}),c]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Email"}),l]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Teléfono"}),h]),r,u("div",{class:"nl-actions"},[m,p]),S())}const Rk={solicitud_inbound:"📥",whatsapp:"💬",status_change:"🔁",nota:"🗒️",email:"✉️",llamada:"📞"};function Ck(n){let e=null,t=null,r=null,s="resumen",i={lead:null,contact:null,activities:[],notes:[]};const o=u("aside",{class:"detail",role:"dialog","aria-modal":"true","aria-label":"Ficha del cliente"}),c=u("div",{class:"detail-overlay",hidden:!0},[o]);n.append(c),c.addEventListener("mousedown",P=>{P.target===c&&l()}),window.addEventListener("keydown",P=>{P.key==="Escape"&&e&&l()}),G.subscribe(P=>{P.detailLeadId!==e&&p(P.detailLeadId)});function l(){G.set({detailLeadId:null})}function h(){t&&(t(),t=null),r&&(r(),r=null)}function p(P){if(h(),e=P,!P){c.hidden=!0,document.body.classList.remove("has-detail"),_e(o);return}s="resumen",c.hidden=!1,document.body.classList.add("has-detail"),m(P)}function m(P){const F=(G.get().leads||[]).find(I=>I.id===P);if(i={lead:F||null,contact:null,activities:[],notes:[],loadError:null},g(),!!F)if(G.get().mock)i.contact=KR(F.contactId),i.activities=HR(P),i.notes=yp(F.contactId),g();else{const I=v=>{i.loadError=v&&v.code==="permission-denied"?"Sin permiso de CRM (crm.read) para ver la ficha completa.":"No se pudo cargar parte de la ficha — revisa tu conexión.",g()};Ca(F.contactId).then(v=>{i.contact=v,g()}).catch(I),t=pk(P,v=>{i.activities=v,g()},I),F.contactId&&(r=mk(F.contactId,v=>{i.notes=v,g()},I))}}function g(){_e(o);const P=i.lead;if(!P){o.append(E(null)),o.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:"🔍"}),u("div",{class:"state__title",text:"Lead no disponible"}),u("div",{class:"state__msg",text:"Recarga la Bandeja e inténtalo otra vez."})]));return}o.append(E(P)),o.append(S());const F=u("div",{class:"detail__body"});i.loadError&&F.append(u("div",{class:"u-caption",role:"alert",style:{padding:"8px 12px",borderRadius:"8px",margin:"0 0 10px",background:"rgba(229,115,26,0.12)",border:"1px solid rgba(229,115,26,0.45)"},text:"⚠️ "+i.loadError})),s==="resumen"?F.append(k(P)):s==="comms"?F.append(L()):s==="score"?F.append(R(P)):s==="notas"&&F.append(N(P)),o.append(F)}function E(P){const F=u("button",{class:"icon-btn",type:"button","aria-label":"Cerrar"},["✕"]);if(F.addEventListener("click",l),!P)return u("div",{class:"detail__header"},[u("div",{class:"u-grow"}),F]);const I=B(P),v=Xr[I.rating],w=zo(P.status),A=uc(P),b=Pi(P),C=u("button",{class:"btn btn--wa btn--sm",type:"button"},["💬 WhatsApp"]);C.addEventListener("click",()=>{const ye=ov(P.phone,`Hola ${String(P.fullName||"").split(" ")[0]||""}, te saluda Altorra Cars 👋`);if(!ye)return K("Sin teléfono","error");window.open(ye,"_blank","noopener")});const y=ft("crm.edit"),le=y&&P.status!=="convertido"?u("button",{class:"btn btn--soft btn--sm",type:"button"},["🎯 Convertir"]):null;le&&le.addEventListener("click",()=>Iv(P,{}));const fe=y?u("button",{class:"icon-btn",type:"button","aria-label":"Agendar cita",title:"Agendar cita"},["📅"]):null;fe&&fe.addEventListener("click",()=>zC(P,{}));const X=y?u("button",{class:"icon-btn",type:"button","aria-label":"Editar contacto",title:"Editar contacto"},["✏️"]):null;return X&&X.addEventListener("click",()=>Sk(i.contact,{onChanged:()=>{P.contactId&&Ca(P.contactId).then(ye=>{i.contact=ye,g()}).catch(()=>K("No se pudo recargar el contacto","error"))}})),u("div",{class:"detail__header"},[u("div",{class:"u-row u-grow",style:{minWidth:"0"}},[u("span",{class:"avatar","aria-hidden":"true",text:gs(P.fullName)}),u("div",{class:"u-grow",style:{minWidth:"0"}},[u("h2",{class:"detail__name u-truncate",text:P.fullName}),u("div",{class:"u-row u-row--tight",style:{flexWrap:"wrap"}},[u("span",{class:`temp ${v.cls}`,text:`${v.icon} ${v.label} · ${I.score}`}),u("span",{class:`badge badge--${w.badge||""}`.trim(),text:w.label}),u("span",{class:"badge",text:`${A.icon} ${A.label}`}),u("span",{class:"badge",text:`${b.icon} ${b.label}`})])])]),u("div",{class:"u-row u-row--tight"},[le,fe,X,C,F])])}function S(){const P=[["resumen","Resumen"],["comms","Comunicaciones"],["score","Score"],["notas","Notas"]],F=u("div",{class:"detail__tabs",role:"tablist"});return P.forEach(([I,v])=>{const w=u("button",{class:"detail__tab"+(s===I?" is-active":""),role:"tab","aria-selected":String(s===I),type:"button"},[v]);w.addEventListener("click",()=>{s=I,g()}),F.append(w)}),F}function k(P){const F=i.contact,I=F&&F.consent?F.consent:null,v=[["Correo",P.email||"—"],["Teléfono",P.phone||"—"],["Interés",P.sourceDetail||"—"],["Vehículo",P.vehicleOfInterestId||"—"],["Asesor",P.ownerName||"Sin asignar"],["Origen",P.source||"—"],["Capturado",iR(P.createdAt)],["Última actividad",lr(P.lastActivityAt)]],w=dv(P,{score:B(P).score});return u("div",{class:"u-stack"},[u("div",{class:"detail-card detail-card--nba"},[u("span",{class:"detail-card__icon","aria-hidden":"true",text:w.icon}),u("div",{class:"u-grow"},[u("div",{class:"u-caption u-muted",text:"Próxima mejor acción"}),u("strong",{text:w.label}),u("div",{class:"u-caption u-faint",text:w.reason})])]),u("dl",{class:"kv"},v.flatMap(([A,b])=>[u("dt",{text:A}),u("dd",{class:"u-truncate",text:b})])),I?T(I):null])}function T(P){const F=I=>I?"✅":"⛔";return u("div",{class:"detail-card"},[u("div",{class:"u-caption u-muted",text:"Consentimiento (Ley 1581)"}),u("div",{class:"u-row",style:{flexWrap:"wrap",gap:"12px"}},[u("span",{class:"u-caption",text:`${F(P.email)} Email`}),u("span",{class:"u-caption",text:`${F(P.whatsapp)} WhatsApp`}),u("span",{class:"u-caption",text:`${F(P.calls)} Llamadas`})]),u("div",{class:"u-caption u-faint",text:`Política ${P.policyVersion||"v1"} · origen ${P.source||"—"}`})])}function L(){if(!i.activities.length)return u("div",{class:"state"},[u("div",{class:"state__icon",text:"📭"}),u("div",{class:"state__title",text:"Sin comunicaciones"}),u("div",{class:"state__msg",text:"Aún no hay actividades registradas para este lead."})]);const P=u("ol",{class:"timeline"});return i.activities.forEach(F=>{P.append(u("li",{class:"timeline__item timeline__item--"+(F.direction||"inbound")},[u("span",{class:"timeline__icon","aria-hidden":"true",text:Rk[F.type]||"•"}),u("div",{class:"u-grow"},[u("div",{class:"u-spread"},[u("strong",{class:"u-truncate",text:F.subject||F.type||"Actividad"}),u("span",{class:"u-caption u-faint",text:lr(F.createdAt)})]),F.body?u("div",{class:"u-caption u-muted",text:F.body}):null])]))}),P}function R(P){const F=B(P),I=Xr[F.rating],v=Object.keys(_p).map(w=>{const A=Math.round((F.factors[w]||0)*100);return u("div",{class:"factor"},[u("div",{class:"u-spread u-caption"},[u("span",{text:_p[w]}),u("span",{class:"u-faint",text:`${A}% · peso ${Math.round(SR[w]*100)}%`})]),u("div",{class:"factor__track"},[u("div",{class:"factor__fill",style:{width:A+"%"}})])])});return u("div",{class:"u-stack"},[u("div",{class:"scorehero"},[u("div",{class:`scorehero__num ${I.cls}`,text:String(F.score)}),u("div",{class:"u-stack",style:{gap:"2px"}},[u("strong",{text:`${I.icon} ${I.label}`}),u("span",{class:"u-caption u-faint",text:"Heurística determinista (7 factores, sin IA)"})])]),u("div",{class:"u-stack",style:{gap:"10px"}},v)])}function N(P){const F=ft("crm.edit")||ft("crm.create"),I=u("textarea",{class:"textarea",placeholder:"Escribe una nota interna…",rows:"3"}),v=u("button",{class:"btn btn--gold btn--sm",type:"button"},["Agregar nota"]);v.addEventListener("click",async()=>{const A=I.value.trim();if(!A)return;v.disabled=!0;const b={body:A,authorName:"Tú",createdAt:new Date().toISOString()};try{G.get().mock?(QR(P.contactId,b),i.notes=yp(P.contactId),g()):(await wk(P.contactId,A),I.value=""),K("Nota agregada","ok")}catch{K("No se pudo guardar la nota","error")}finally{v.disabled=!1}});const w=u("div",{class:"u-stack"});return i.notes.length||w.append(u("div",{class:"u-caption u-faint",style:{padding:"8px 0"},text:"Aún no hay notas."})),i.notes.forEach(A=>w.append(u("div",{class:"detail-card"},[u("div",{class:"u-caption u-muted",text:A.body}),u("div",{class:"u-caption u-faint",text:`${A.authorName||"Asesor"} · ${lr(A.createdAt)}`})]))),u("div",{class:"u-stack"},[F?u("div",{class:"u-stack",style:{gap:"8px"}},[I,u("div",{class:"u-row",style:{justifyContent:"flex-end"}},[v])]):null,w])}function B(P){return uv(P,i.activities||[],i.contact)}}const Ov={days:[1,2,3,4,5,6],startHour:9,endHour:17,interval:60,maxPerSlot:1,bufferMin:15,blockedDates:[],blockedDateLabels:{},blockedHours:{}},kk=[["2026-01-01","Año Nuevo"],["2026-01-12","Reyes Magos"],["2026-03-23","San José"],["2026-04-02","Jueves Santo"],["2026-04-03","Viernes Santo"],["2026-05-01","Día del Trabajo"],["2026-05-18","Ascensión"],["2026-06-08","Corpus Christi"],["2026-06-15","Sagrado Corazón"],["2026-06-29","San Pedro y San Pablo"],["2026-07-20","Independencia"],["2026-08-07","Batalla de Boyacá"],["2026-08-17","Asunción de la Virgen"],["2026-10-12","Día de la Raza"],["2026-11-02","Todos los Santos"],["2026-11-16","Independencia de Cartagena"],["2026-12-08","Inmaculada Concepción"],["2026-12-25","Navidad"]],Lv=()=>ke(ie,"config","availability"),Mv=()=>ke(ie,"crm_config","advisorOverrides");function Pk(n,e){return an(Lv(),t=>{n({...Ov,...t.exists()?t.data():{}})},t=>e&&e(t))}async function xk(n,e){await B_(Lv(),{...n,updatedAt:new Date().toISOString(),updatedBy:e||null},{merge:!0})}function Nk(n,e){return an(Mv(),t=>{n(t.exists()&&t.data().overrides||{})},t=>e&&e(t))}async function Dk(n,e){await B_(Mv(),{overrides:n,updatedAt:new Date().toISOString(),updatedBy:e||null})}const Vk=["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"],Ro=()=>{const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`};function Ok(n){const e={av:{...Ov},overrides:{},advisors:[],sub:null,subOv:null,loaded:!1},t=ft("calendar.config"),r=u("section",{class:"cfg"});if(_e(n),n.append(r),!t){r.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:"🔒"}),u("div",{class:"state__title",text:"Sin permiso"}),u("div",{class:"state__msg",text:"Solo quien administra la disponibilidad (permiso calendar.config) puede editar esto."})]));return}async function s(g,E){if(G.get().mock){Object.assign(e.av,g),m(),K(E+" (demo)","ok");return}try{await xk(g,G.get().user&&G.get().user.uid),K(E,"ok")}catch(S){K("No se pudo guardar: "+(S.message||S.code),"error")}}function i(){const g=e.av,E=Vk.map((P,F)=>{const I=u("input",{type:"checkbox"});return I.checked=(g.days||[]).includes(F),I.dataset.dow=String(F),u("label",{class:"cfg-day"},[I,u("span",{text:P})])}),S=(P,F,I)=>{const v=u("select",{class:"select"});for(let w=F;w<=I;w++)v.append(u("option",{value:String(w),text:String(w).padStart(2,"0")+":00"}));return v.value=String(P),v},k=S(g.startHour,6,20),T=S(g.endHour,7,21),L=u("select",{class:"select"},[u("option",{value:"30",text:"Cada 30 min"}),u("option",{value:"60",text:"Cada hora"})]);L.value=String(g.interval||60);const R=u("input",{class:"input",type:"number",min:"1",max:"5",value:String(g.maxPerSlot||1)}),N=u("input",{class:"input",type:"number",min:"0",max:"60",step:"5",value:String(g.bufferMin!=null?g.bufferMin:15)}),B=u("button",{class:"btn btn--gold btn--sm",type:"button",text:"Guardar horario"});return B.addEventListener("click",()=>{const P=E.map(v=>v.querySelector("input")).filter(v=>v.checked).map(v=>parseInt(v.dataset.dow,10)).sort(),F=parseInt(k.value,10),I=parseInt(T.value,10);if(!P.length){K("Elige al menos un día.","error");return}if(F>=I){K("La hora de cierre debe ser mayor que la de apertura.","error");return}s({days:P,startHour:F,endHour:I,interval:parseInt(L.value,10)||60,maxPerSlot:Math.max(1,parseInt(R.value,10)||1),bufferMin:Math.max(0,parseInt(N.value,10)||0)},"✓ Horario guardado")}),u("div",{class:"cfg-card"},[u("h3",{class:"cfg-card__title",text:"🕘 Horario de atención"}),u("p",{class:"u-caption u-muted",text:"Esto es lo que el cliente ve en la web al pedir cita — los cambios aplican al instante."}),u("div",{class:"cfg-days"},E),u("div",{class:"cfg-grid"},[u("label",{class:"field"},[u("span",{class:"field__label",text:"Abre"}),k]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Cierra"}),T]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Citas web"}),L]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Citas por horario"}),R]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Colchón (min)"}),N])]),B])}function o(){const g=e.av,E=g.blockedDateLabels||{},S=Ro(),k=u("div",{class:"cfg-chips"}),T=(g.blockedDates||[]).slice().sort();T.length||k.append(u("span",{class:"u-caption u-muted",text:"Sin fechas bloqueadas — la web ofrece todos los días laborales."})),T.forEach(P=>{const F=P<S,I=u("button",{class:"cfg-chip__x",type:"button","aria-label":"Quitar",text:"✕"});I.addEventListener("click",()=>{const v=T.filter(w=>w!==P);s({blockedDates:v,blockedDateLabels:{[P]:op()}},"✓ Fecha desbloqueada: "+P)}),k.append(u("span",{class:"cfg-chip"+(F?" is-past":"")},[u("span",{text:P+(E[P]?" · "+E[P]:"")}),I]))});const L=u("input",{class:"input",type:"date",min:S}),R=u("input",{class:"input",type:"text",placeholder:"Motivo (opcional)",maxlength:"40"}),N=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"Bloquear fecha"});N.addEventListener("click",()=>{const P=L.value;if(!P){K("Elige una fecha.","error");return}if(T.includes(P)){K("Esa fecha ya está bloqueada.","error");return}const F={...E};R.value.trim()&&(F[P]=R.value.trim()),s({blockedDates:[...T,P].sort(),blockedDateLabels:F},"✓ Fecha bloqueada: "+P)});const B=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"🇨🇴 Cargar festivos de Colombia 2026"});return B.addEventListener("click",()=>{const P=kk.filter(([I])=>I>=S&&!T.includes(I));if(!P.length){K("Los festivos que faltan de 2026 ya están cargados.","ok");return}const F={...E};P.forEach(([I,v])=>{F[I]=v}),s({blockedDates:[...T,...P.map(([I])=>I)].sort(),blockedDateLabels:F},`✓ ${P.length} festivo(s) bloqueados`)}),u("div",{class:"cfg-card"},[u("h3",{class:"cfg-card__title",text:"📅 Fechas bloqueadas (festivos y cierres)"}),u("p",{class:"u-caption u-muted",text:"En estas fechas la web NO ofrece citas. Las fechas pasadas se limpian solas cada madrugada."}),k,u("div",{class:"cfg-row"},[L,R,N]),B])}function c(){const g=e.av,E=[],S=g.interval||60;for(let k=g.startHour*60;k<g.endHour*60;k+=S)E.push(String(Math.floor(k/60)).padStart(2,"0")+":"+String(k%60).padStart(2,"0"));return E}function l(){const E=e.av.blockedHours||{},S=u("div",{class:"cfg-bh"}),k=Object.entries(E).sort(([N],[B])=>N.localeCompare(B));k.length||S.append(u("span",{class:"u-caption u-muted",text:"Sin horas bloqueadas."})),k.forEach(([N,B])=>{const P=(B||[]).slice().sort().map(F=>{const I=u("button",{class:"cfg-chip__x",type:"button",text:"✕"});return I.addEventListener("click",()=>{const v=(E[N]||[]).filter(w=>w!==F);s({blockedHours:{[N]:v.length?v:op()}},`✓ ${N} ${F} desbloqueada`)}),u("span",{class:"cfg-chip"},[u("span",{text:F}),I])});S.append(u("div",{class:"cfg-bh__day"},[u("strong",{text:N}),u("div",{class:"cfg-chips"},P)]))});const T=u("input",{class:"input",type:"date",min:Ro()}),L=u("select",{class:"select"},c().map(N=>u("option",{value:N,text:N}))),R=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"Bloquear hora"});return R.addEventListener("click",()=>{const N=T.value,B=L.value;if(!N){K("Elige una fecha.","error");return}const P=E[N]||[];if(P.includes(B)){K("Esa hora ya está bloqueada.","error");return}s({blockedHours:{...E,[N]:[...P,B].sort()}},`✓ ${N} ${B} bloqueada`)}),u("div",{class:"cfg-card"},[u("h3",{class:"cfg-card__title",text:"⏰ Horas bloqueadas (un horario puntual)"}),S,u("div",{class:"cfg-row"},[T,L,R])])}async function h(g,E){if(G.get().mock){e.overrides=g,m(),K(E+" (demo)","ok");return}try{await Dk(g,G.get().user&&G.get().user.uid),K(E,"ok")}catch(S){K("No se pudo guardar: "+(S.message||S.code),"error")}}function p(){const g=e.overrides||{},E=u("div",{class:"cfg-advisors"});return e.advisors.length||E.append(u("span",{class:"u-caption u-muted",text:"Cargando asesores…"})),e.advisors.forEach(S=>{const k=g[S.uid],T=u("div",{class:"cfg-advisor"});if(T.append(u("div",{class:"cfg-advisor__name"},[u("strong",{text:S.nombre}),k?u("span",{class:"cfg-advisor__badge is-off",text:`🏖 ${k.reason||"ausente"} · ${k.from} → ${k.to}`}):u("span",{class:"cfg-advisor__badge",text:"✅ disponible"})])),k){const L=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"Quitar ausencia"});L.addEventListener("click",()=>{const R={...g};delete R[S.uid],h(R,`✓ ${S.nombre} disponible de nuevo`)}),T.append(L)}else{const L=u("input",{class:"input",type:"date",min:Ro()}),R=u("input",{class:"input",type:"date",min:Ro()}),N=u("select",{class:"select"},[u("option",{value:"vacaciones",text:"Vacaciones"}),u("option",{value:"incapacidad",text:"Incapacidad"}),u("option",{value:"otro",text:"Otro"})]),B=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"Marcar ausencia"});B.addEventListener("click",()=>{if(!L.value||!R.value||L.value>R.value){K("Revisa el rango de fechas.","error");return}h({...g,[S.uid]:{name:S.nombre,from:L.value,to:R.value,reason:N.value}},`✓ Ausencia de ${S.nombre} registrada`)}),T.append(u("div",{class:"cfg-row"},[L,R,N,B]))}E.append(T)}),u("div",{class:"cfg-card"},[u("h3",{class:"cfg-card__title",text:"👤 Excepciones por asesor"}),u("p",{class:"u-caption u-muted",text:"Un asesor ausente no recibe leads de la rotación ni citas confirmadas a su nombre en esas fechas."}),E])}function m(){_e(r),r.append(u("div",{class:"cfg-cols"},[i(),o()]),u("div",{class:"cfg-cols"},[l(),p()]))}return G.get().mock?(e.loaded=!0,m()):(e.sub=Pk(g=>{e.av=g,e.loaded=!0,m()},()=>{K("No se pudo cargar la configuración.","error")}),e.subOv=Nk(g=>{e.overrides=g,e.loaded&&m()},()=>{})),Rv().then(g=>{e.advisors=g,e.loaded&&m()}),function(){e.sub&&e.sub(),e.sub=null,e.subOv&&e.subOv(),e.subOv=null}}function $l(n,e,t){try{if(G.get().mock)return;const r=G.get().user;jt(Se(ie,"auditLog"),{action:n,target:e||"",details:t||"",user:r&&r.email||"unknown",timestamp:new Date().toISOString()}).catch(()=>{})}catch{}}const Pp={google_maps:"Google Maps",sitio_web:"Sitio Web",usuario_registrado:"Usuario Registrado"};function Ko(n){return(n||"NN").split(" ").map(e=>e.charAt(0)).join("").substring(0,2).toUpperCase()}function Lk(n,e){const t=lt(Se(ie,"resenas"),wt("createdAt","desc"));return an(t,r=>{n(r.docs.map(s=>({...s.data(),_docId:s.id})))},r=>e&&e(r))}async function Mk(n,e){const t=new Date().toISOString(),r={name:e.name,location:e.location||"Cartagena",rating:e.rating,vehicle:e.vehicle||"",text:e.text,source:e.source||"sitio_web",verified:!!e.verified,featured:!!e.featured,avatar:Ko(e.name),updatedAt:t};n?(await pt(ke(ie,"resenas",n),r),$l("review_update","resena "+r.name,r.name)):(r.createdAt=t,await jt(Se(ie,"resenas"),r),$l("review_create","resena "+r.name,r.name))}async function Fk(n,e){await D0(ke(ie,"resenas",n)),$l("review_delete","resena "+(e||n),"")}const Uk=[{_docId:"m1",name:"Carlos Pérez",location:"Cartagena",rating:5,vehicle:"Mazda CX-30 2023",text:"Excelente atención, el carro quedó impecable y el papeleo fue rapidísimo.",source:"google_maps",verified:!0,featured:!0,avatar:"CP",createdAt:"2026-06-01T10:00:00.000Z"},{_docId:"m2",name:"Laura Gómez",location:"Turbaco",rating:4,vehicle:"",text:"Buen servicio y asesoría honesta. El proceso de financiación tardó un poco.",source:"sitio_web",verified:!0,featured:!1,avatar:"LG",createdAt:"2026-05-20T15:30:00.000Z"},{_docId:"m3",name:"Andrés Llanos",location:"Cartagena",rating:5,vehicle:"Chevrolet Onix 2024",text:"Me recibieron mi carro usado como parte de pago sin vueltas. Recomendado.",source:"usuario_registrado",verified:!1,featured:!1,avatar:"AL",createdAt:"2026-05-02T09:10:00.000Z"}],Bk="★",$k="☆",xp=n=>Bk.repeat(Math.max(0,Math.min(5,n)))+$k.repeat(5-Math.max(0,Math.min(5,n)));function qk(n){const e={reviews:[],sub:null,loaded:!1},t=ft("reviews.create"),r=ft("reviews.edit"),s=ft("reviews.delete"),i=u("section",{class:"rev"});_e(n),n.append(i);function o(m){const g=!!m,E={name:u("input",{class:"input",type:"text",maxlength:"80",placeholder:"Nombre del cliente *"}),location:u("input",{class:"input",type:"text",maxlength:"60",placeholder:"Ciudad (default: Cartagena)"}),rating:u("select",{class:"select"},[5,4,3,2,1].map(R=>u("option",{value:String(R),text:xp(R)+"  ("+R+")"}))),vehicle:u("input",{class:"input",type:"text",maxlength:"80",placeholder:"Vehículo (opcional)"}),text:u("textarea",{class:"input rev-modal__text",maxlength:"600",rows:"4",placeholder:"Texto de la reseña *"}),source:u("select",{class:"select"},Object.entries(Pp).map(([R,N])=>u("option",{value:R,text:N}))),verified:u("input",{type:"checkbox"}),featured:u("input",{type:"checkbox"})};g?(E.name.value=m.name||"",E.location.value=m.location||"",E.rating.value=String(parseInt(m.rating,10)||5),E.vehicle.value=m.vehicle||"",E.text.value=m.text||"",E.source.value=m.source||"sitio_web",E.verified.checked=m.verified!==!1,E.featured.checked=!!m.featured):(E.source.value="sitio_web",E.verified.checked=!0);const S=u("button",{class:"btn btn--gold",type:"button",text:g?"Guardar cambios":"Crear reseña"}),k=u("button",{class:"btn btn--soft",type:"button",text:"Cancelar"}),T=u("div",{class:"rev-modal__overlay"},[u("div",{class:"rev-modal",role:"dialog","aria-modal":"true"},[u("h3",{class:"rev-modal__title",text:g?"Editar reseña":"Nueva reseña"}),u("div",{class:"rev-modal__grid"},[u("label",{class:"field"},[u("span",{class:"field__label",text:"Cliente *"}),E.name]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Ubicación"}),E.location]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Calificación"}),E.rating]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Vehículo"}),E.vehicle])]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Reseña *"}),E.text]),u("div",{class:"rev-modal__grid"},[u("label",{class:"field"},[u("span",{class:"field__label",text:"Fuente"}),E.source]),u("label",{class:"rev-check"},[E.verified,u("span",{text:"Verificada (cliente real)"})]),u("label",{class:"rev-check"},[E.featured,u("span",{text:"⭐ Destacada en el sitio"})])]),u("div",{class:"rev-modal__actions"},[k,S])])]),L=()=>T.remove();k.addEventListener("click",L),T.addEventListener("click",R=>{R.target===T&&L()}),S.addEventListener("click",async()=>{const R=E.name.value.trim(),N=E.text.value.trim();if(!R||!N){K("Completa nombre y texto de la reseña.","error");return}const B={name:R,text:N,location:E.location.value.trim(),rating:parseInt(E.rating.value,10)||5,vehicle:E.vehicle.value.trim(),source:E.source.value,verified:E.verified.checked,featured:E.featured.checked};if(G.get().mock){if(g){const P=e.reviews.findIndex(F=>F._docId===m._docId);P>=0&&(e.reviews[P]={...e.reviews[P],...B,avatar:Ko(R)})}else e.reviews.unshift({...B,_docId:"m"+Date.now(),avatar:Ko(R),createdAt:new Date().toISOString()});p(),L(),K(g?"Reseña actualizada (demo)":"Reseña creada (demo)","ok");return}S.disabled=!0,S.textContent="Guardando…";try{await Mk(g?m._docId:null,B),L(),K(g?"✓ Reseña actualizada":"✓ Reseña creada — ya está en el sitio","ok")}catch(P){S.disabled=!1,S.textContent=g?"Guardar cambios":"Crear reseña",K("No se pudo guardar: "+(P.message||P.code),"error")}}),document.body.append(T),E.name.focus()}function c(m){const g=u("button",{class:"btn btn--danger",type:"button",text:"Eliminar definitivamente"}),E=u("button",{class:"btn btn--soft",type:"button",text:"Cancelar"}),S=u("div",{class:"rev-modal__overlay"},[u("div",{class:"rev-modal rev-modal--sm",role:"alertdialog","aria-modal":"true"},[u("h3",{class:"rev-modal__title",text:"¿Eliminar esta reseña?"}),u("p",{class:"u-caption u-muted",text:`"${(m.text||"").slice(0,120)}…" — ${m.name}. Desaparece del sitio público al instante. No se puede deshacer.`}),u("div",{class:"rev-modal__actions"},[E,g])])]),k=()=>S.remove();E.addEventListener("click",k),S.addEventListener("click",T=>{T.target===S&&k()}),g.addEventListener("click",async()=>{if(G.get().mock){e.reviews=e.reviews.filter(T=>T._docId!==m._docId),p(),k(),K("Reseña eliminada (demo)","ok");return}g.disabled=!0;try{await Fk(m._docId,m.name),k(),K("✓ Reseña eliminada","ok")}catch(T){g.disabled=!1,K("No se pudo eliminar: "+(T.message||T.code),"error")}}),document.body.append(S)}function l(){const m=e.reviews.length,g=m?(e.reviews.reduce((k,T)=>k+(parseInt(T.rating,10)||0),0)/m).toFixed(1):"0.0",E=e.reviews.filter(k=>k.featured).length,S=t?u("button",{class:"btn btn--gold btn--sm",type:"button",text:"＋ Nueva reseña"}):null;return S&&S.addEventListener("click",()=>o(null)),u("div",{class:"rev-head"},[u("div",{class:"rev-stats"},[u("div",{class:"rev-stat"},[u("strong",{text:String(m)}),u("span",{class:"u-caption u-muted",text:"reseñas"})]),u("div",{class:"rev-stat"},[u("strong",{text:g+" ★"}),u("span",{class:"u-caption u-muted",text:"promedio"})]),u("div",{class:"rev-stat"},[u("strong",{text:String(E)}),u("span",{class:"u-caption u-muted",text:"destacadas"})])]),S])}function h(m){const g=[];if(r){const E=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"✏️ Editar"});E.addEventListener("click",()=>o(m)),g.push(E)}if(s){const E=u("button",{class:"btn btn--soft btn--sm rev-card__del",type:"button",text:"🗑","aria-label":"Eliminar"});E.addEventListener("click",()=>c(m)),g.push(E)}return u("article",{class:"rev-card"},[u("div",{class:"rev-card__top"},[u("span",{class:"avatar avatar--sm","aria-hidden":"true",text:m.avatar||Ko(m.name)}),u("div",{class:"rev-card__who"},[u("strong",{class:"u-truncate",text:(m.name||"")+(m.verified?" ✔":"")}),u("span",{class:"u-caption u-faint",text:m.location||"—"})]),u("span",{class:"rev-card__stars","aria-label":(m.rating||0)+" de 5",text:xp(parseInt(m.rating,10)||0)})]),m.text?u("p",{class:"rev-card__text",text:"“"+m.text+"”"}):null,u("div",{class:"rev-card__meta"},[m.vehicle?u("span",{class:"chip",text:"🚗 "+m.vehicle}):null,u("span",{class:"chip",text:Pp[m.source]||m.source||"—"}),m.featured?u("span",{class:"chip chip--gold",text:"⭐ Destacada"}):null]),g.length?u("div",{class:"rev-card__actions"},g):null])}function p(){if(_e(i),i.append(l()),!e.loaded){i.append(u("div",{class:"state"},[u("div",{class:"state__msg",text:"Cargando reseñas…"})]));return}if(!e.reviews.length){i.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:"💬"}),u("div",{class:"state__title",text:"Sin reseñas"}),u("div",{class:"state__msg",text:t?'Agrega la primera con "＋ Nueva reseña".':"Aún no hay reseñas registradas."})]));return}i.append(u("div",{class:"rev-grid"},e.reviews.map(h)))}return G.get().mock?(e.reviews=Uk.map(m=>({...m})),e.loaded=!0,p()):(p(),e.sub=Lk(m=>{e.reviews=m,e.loaded=!0,p()},()=>K("No se pudieron cargar las reseñas.","error"))),function(){e.sub&&e.sub(),e.sub=null}}const Fv=document.getElementById("app");py();const jk=new URLSearchParams(location.search).get("mock")==="1",zk={bandeja:Ev,pipeline:RC,agenda:GC,reportes:ck,contactos:Tk,config:Ok,resenas:qk};let Co=null,Zr=null,ir=null,ql=null,Wo=null;function Np(n){if(!Zr||n===ql)return;ir&&(ir(),ir=null),G.get().detailLeadId&&G.set({detailLeadId:null}),ir=(zk[n]||Ev)(Zr.outlet)||null,Zr.setActive(n),ql=n}function Gk(){Zr=cR(Fv),Ck(Zr.detailRoot),Np(rv()),Wo=nR(Np)}function Hk(){ir&&(ir(),ir=null),Wo&&(Wo(),Wo=null),Zr=null,ql=null}function Kk(n){n.ready&&(n.user&&Co!=="app"?(Co="app",Gk()):!n.user&&Co!=="login"&&(Hk(),Co="login",n.detailLeadId&&G.set({detailLeadId:null}),lR(Fv)))}G.subscribe(Kk);jk?G.set({mock:!0,ready:!0,user:{uid:"u_ceo",email:"demo@altorra.local"},profile:{nombre:"Rodrigo (CEO)",cargo:"CEO",rol:"super_admin"},permissions:["*"]}):QS();
