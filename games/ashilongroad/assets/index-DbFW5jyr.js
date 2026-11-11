var wh=s=>{throw TypeError(s)};var Xi=(s,t,e)=>t.has(s)?wh("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(s):t.set(s,e);function Ch(s,t){for(var e=0;e<t.length;e++){const n=t[e];if(typeof n!="string"&&!Array.isArray(n)){for(const i in n)if(i!=="default"&&!(i in s)){const r=Object.getOwnPropertyDescriptor(n,i);r&&Object.defineProperty(s,i,r.get?r:{enumerable:!0,get:()=>n[i]})}}}return Object.freeze(Object.defineProperty(s,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Qo="170",Ah=0,Pa=1,Rh=2,Kc=1,Jc=2,xn=3,On=0,Be=1,Ue=2,Un=0,Nn=1,Ye=2,Ia=3,La=4,Ph=5,jn=100,Ih=101,Lh=102,Dh=103,Uh=104,Nh=200,kh=201,Fh=202,Oh=203,Jr=204,Qr=205,Bh=206,zh=207,Gh=208,Vh=209,Hh=210,Wh=211,Xh=212,$h=213,qh=214,to=0,eo=1,no=2,Pi=3,io=4,so=5,ro=6,oo=7,Qc=0,Yh=1,jh=2,kn=0,Zh=1,Kh=2,Jh=3,tl=4,Qh=5,td=6,ed=7,el=300,Ii=301,Li=302,ao=303,co=304,or=306,ln=1e3,He=1001,lo=1002,We=1003,nd=1004,_s=1005,hn=1006,fr=1007,Jn=1008,Mn=1009,nl=1010,il=1011,ds=1012,ta=1013,Qn=1014,dn=1015,ps=1016,ea=1017,na=1018,Di=1020,sl=35902,rl=1021,ol=1022,sn=1023,al=1024,cl=1025,wi=1026,Ui=1027,ia=1028,sa=1029,ll=1030,ra=1031,oa=1033,Hs=33776,Ws=33777,Xs=33778,$s=33779,ho=35840,uo=35841,fo=35842,po=35843,mo=36196,go=37492,_o=37496,vo=37808,xo=37809,yo=37810,So=37811,Mo=37812,To=37813,bo=37814,Eo=37815,wo=37816,Co=37817,Ao=37818,Ro=37819,Po=37820,Io=37821,qs=36492,Lo=36494,Do=36495,hl=36283,Uo=36284,No=36285,ko=36286,id=3200,sd=3201,dl=0,rd=1,Ln="",pe="srgb",Fi="srgb-linear",ar="linear",oe="srgb",ai=7680,Da=519,od=512,ad=513,cd=514,ul=515,ld=516,hd=517,dd=518,ud=519,Ua=35044,Na="300 es",yn=2e3,er=2001;class Oi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null}}}const Ce=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ka=1234567;const ss=Math.PI/180,Ni=180/Math.PI;function Bi(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ce[s&255]+Ce[s>>8&255]+Ce[s>>16&255]+Ce[s>>24&255]+"-"+Ce[t&255]+Ce[t>>8&255]+"-"+Ce[t>>16&15|64]+Ce[t>>24&255]+"-"+Ce[e&63|128]+Ce[e>>8&255]+"-"+Ce[e>>16&255]+Ce[e>>24&255]+Ce[n&255]+Ce[n>>8&255]+Ce[n>>16&255]+Ce[n>>24&255]).toLowerCase()}function be(s,t,e){return Math.max(t,Math.min(e,s))}function aa(s,t){return(s%t+t)%t}function fd(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function pd(s,t,e){return s!==t?(e-s)/(t-s):0}function rs(s,t,e){return(1-e)*s+e*t}function md(s,t,e,n){return rs(s,t,1-Math.exp(-e*n))}function gd(s,t=1){return t-Math.abs(aa(s,t*2)-t)}function _d(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function vd(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function xd(s,t){return s+Math.floor(Math.random()*(t-s+1))}function yd(s,t){return s+Math.random()*(t-s)}function Sd(s){return s*(.5-Math.random())}function Md(s){s!==void 0&&(ka=s);let t=ka+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Td(s){return s*ss}function bd(s){return s*Ni}function Ed(s){return(s&s-1)===0&&s!==0}function wd(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Cd(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Ad(s,t,e,n,i){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),h=o((t+n)/2),d=r((t-n)/2),u=o((t-n)/2),f=r((n-t)/2),g=o((n-t)/2);switch(i){case"XYX":s.set(a*h,c*d,c*u,a*l);break;case"YZY":s.set(c*u,a*h,c*d,a*l);break;case"ZXZ":s.set(c*d,c*u,a*h,a*l);break;case"XZX":s.set(a*h,c*g,c*f,a*l);break;case"YXY":s.set(c*f,a*h,c*g,a*l);break;case"ZYZ":s.set(c*g,c*f,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Ti(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Le(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const en={DEG2RAD:ss,RAD2DEG:Ni,generateUUID:Bi,clamp:be,euclideanModulo:aa,mapLinear:fd,inverseLerp:pd,lerp:rs,damp:md,pingpong:gd,smoothstep:_d,smootherstep:vd,randInt:xd,randFloat:yd,randFloatSpread:Sd,seededRandom:Md,degToRad:Td,radToDeg:bd,isPowerOfTwo:Ed,ceilPowerOfTwo:wd,floorPowerOfTwo:Cd,setQuaternionFromProperEuler:Ad,normalize:Le,denormalize:Ti};class Ft{constructor(t=0,e=0){Ft.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(be(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Yt{constructor(t,e,n,i,r,o,a,c,l){Yt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,c,l)}set(t,e,n,i,r,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],_=i[0],m=i[3],p=i[6],x=i[1],S=i[4],v=i[7],L=i[2],E=i[5],C=i[8];return r[0]=o*_+a*x+c*L,r[3]=o*m+a*S+c*E,r[6]=o*p+a*v+c*C,r[1]=l*_+h*x+d*L,r[4]=l*m+h*S+d*E,r[7]=l*p+h*v+d*C,r[2]=u*_+f*x+g*L,r[5]=u*m+f*S+g*E,r[8]=u*p+f*v+g*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+i*r*l-i*o*c}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],d=h*o-a*l,u=a*c-h*r,f=l*r-o*c,g=e*d+n*u+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=d*_,t[1]=(i*l-h*n)*_,t[2]=(a*n-i*o)*_,t[3]=u*_,t[4]=(h*e-i*c)*_,t[5]=(i*r-a*e)*_,t[6]=f*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-i*l,i*c,-i*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(pr.makeScale(t,e)),this}rotate(t){return this.premultiply(pr.makeRotation(-t)),this}translate(t,e){return this.premultiply(pr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const pr=new Yt;function fl(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function us(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Rd(){const s=us("canvas");return s.style.display="block",s}const Fa={};function es(s){s in Fa||(Fa[s]=!0,console.warn(s))}function Pd(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Id(s){const t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Ld(s){const t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Jt={enabled:!0,workingColorSpace:Fi,spaces:{},convert:function(s,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===oe&&(s.r=Sn(s.r),s.g=Sn(s.g),s.b=Sn(s.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(s.applyMatrix3(this.spaces[t].toXYZ),s.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===oe&&(s.r=Ci(s.r),s.g=Ci(s.g),s.b=Ci(s.b))),s},fromWorkingColorSpace:function(s,t){return this.convert(s,this.workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ln?ar:this.spaces[s].transfer},getLuminanceCoefficients:function(s,t=this.workingColorSpace){return s.fromArray(this.spaces[t].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,t,e){return s.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function Sn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Ci(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const Oa=[.64,.33,.3,.6,.15,.06],Ba=[.2126,.7152,.0722],za=[.3127,.329],Ga=new Yt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Va=new Yt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Jt.define({[Fi]:{primaries:Oa,whitePoint:za,transfer:ar,toXYZ:Ga,fromXYZ:Va,luminanceCoefficients:Ba,workingColorSpaceConfig:{unpackColorSpace:pe},outputColorSpaceConfig:{drawingBufferColorSpace:pe}},[pe]:{primaries:Oa,whitePoint:za,transfer:oe,toXYZ:Ga,fromXYZ:Va,luminanceCoefficients:Ba,outputColorSpaceConfig:{drawingBufferColorSpace:pe}}});let ci;class Dd{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ci===void 0&&(ci=us("canvas")),ci.width=t.width,ci.height=t.height;const n=ci.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ci}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=us("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Sn(r[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Sn(e[n]/255)*255):e[n]=Sn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Ud=0;class pl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ud++}),this.uuid=Bi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(mr(i[o].image)):r.push(mr(i[o]))}else r=mr(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function mr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Dd.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Nd=0;class Ee extends Oi{constructor(t=Ee.DEFAULT_IMAGE,e=Ee.DEFAULT_MAPPING,n=He,i=He,r=hn,o=Jn,a=sn,c=Mn,l=Ee.DEFAULT_ANISOTROPY,h=Ln){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Nd++}),this.uuid=Bi(),this.name="",this.source=new pl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Ft(0,0),this.repeat=new Ft(1,1),this.center=new Ft(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Yt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==el)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ln:t.x=t.x-Math.floor(t.x);break;case He:t.x=t.x<0?0:1;break;case lo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ln:t.y=t.y-Math.floor(t.y);break;case He:t.y=t.y<0?0:1;break;case lo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ee.DEFAULT_IMAGE=null;Ee.DEFAULT_MAPPING=el;Ee.DEFAULT_ANISOTROPY=1;class ae{constructor(t=0,e=0,n=0,i=1){ae.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const c=t.elements,l=c[0],h=c[4],d=c[8],u=c[1],f=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const S=(l+1)/2,v=(f+1)/2,L=(p+1)/2,E=(h+u)/4,C=(d+_)/4,w=(g+m)/4;return S>v&&S>L?S<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(S),i=E/n,r=C/n):v>L?v<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(v),n=E/i,r=w/i):L<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(L),n=C/r,i=w/r),this.set(n,i,r,e),this}let x=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(x)<.001&&(x=1),this.x=(m-g)/x,this.y=(d-_)/x,this.z=(u-h)/x,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class kd extends Oi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ae(0,0,t,e),this.scissorTest=!1,this.viewport=new ae(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:hn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ee(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new pl(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ti extends kd{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class ml extends Ee{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=We,this.minFilter=We,this.wrapR=He,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Fd extends Ee{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=We,this.minFilter=We,this.wrapR=He,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ei{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,o,a){let c=n[i+0],l=n[i+1],h=n[i+2],d=n[i+3];const u=r[o+0],f=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d;return}if(a===1){t[e+0]=u,t[e+1]=f,t[e+2]=g,t[e+3]=_;return}if(d!==_||c!==u||l!==f||h!==g){let m=1-a;const p=c*u+l*f+h*g+d*_,x=p>=0?1:-1,S=1-p*p;if(S>Number.EPSILON){const L=Math.sqrt(S),E=Math.atan2(L,p*x);m=Math.sin(m*E)/L,a=Math.sin(a*E)/L}const v=a*x;if(c=c*m+u*v,l=l*m+f*v,h=h*m+g*v,d=d*m+_*v,m===1-a){const L=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=L,l*=L,h*=L,d*=L}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,r,o){const a=n[i],c=n[i+1],l=n[i+2],h=n[i+3],d=r[o],u=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+h*d+c*f-l*u,t[e+1]=c*g+h*u+l*d-a*f,t[e+2]=l*g+h*f+a*u-c*d,t[e+3]=h*g-a*d-c*u-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(i/2),d=a(r/2),u=c(n/2),f=c(i/2),g=c(r/2);switch(o){case"XYZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"YZX":this._x=u*h*d+l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d-u*f*g;break;case"XZY":this._x=u*h*d-l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d+u*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],d=e[10],u=n+a+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(o-i)*f}else if(n>a&&n>d){const f=2*Math.sqrt(1+n-a-d);this._w=(h-c)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+l)/f}else if(a>d){const f=2*Math.sqrt(1+a-n-d);this._w=(r-l)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+d-n-a);this._w=(o-i)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(be(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+i*l-r*c,this._y=i*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-i*a,this._w=o*h-n*a-i*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),d=Math.sin((1-e)*h)/l,u=Math.sin(e*h)/l;return this._w=o*d+this._w*u,this._x=n*d+this._x*u,this._y=i*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(t=0,e=0,n=0){P.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ha.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ha.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*i-a*n),h=2*(a*e-r*i),d=2*(r*n-o*e);return this.x=e+c*l+o*d-a*h,this.y=n+c*h+a*l-r*d,this.z=i+c*d+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=i*c-r*a,this.y=r*o-n*c,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return gr.copy(this).projectOnVector(t),this.sub(gr)}reflect(t){return this.sub(gr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(be(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const gr=new P,Ha=new ei;class ni{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Je.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Je.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Je.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Je):Je.fromBufferAttribute(r,o),Je.applyMatrix4(t.matrixWorld),this.expandByPoint(Je);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),vs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),vs.copy(n.boundingBox)),vs.applyMatrix4(t.matrixWorld),this.union(vs)}const i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Je),Je.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter($i),xs.subVectors(this.max,$i),li.subVectors(t.a,$i),hi.subVectors(t.b,$i),di.subVectors(t.c,$i),wn.subVectors(hi,li),Cn.subVectors(di,hi),Gn.subVectors(li,di);let e=[0,-wn.z,wn.y,0,-Cn.z,Cn.y,0,-Gn.z,Gn.y,wn.z,0,-wn.x,Cn.z,0,-Cn.x,Gn.z,0,-Gn.x,-wn.y,wn.x,0,-Cn.y,Cn.x,0,-Gn.y,Gn.x,0];return!_r(e,li,hi,di,xs)||(e=[1,0,0,0,1,0,0,0,1],!_r(e,li,hi,di,xs))?!1:(ys.crossVectors(wn,Cn),e=[ys.x,ys.y,ys.z],_r(e,li,hi,di,xs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Je).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Je).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(pn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),pn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),pn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),pn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),pn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),pn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),pn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),pn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(pn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const pn=[new P,new P,new P,new P,new P,new P,new P,new P],Je=new P,vs=new ni,li=new P,hi=new P,di=new P,wn=new P,Cn=new P,Gn=new P,$i=new P,xs=new P,ys=new P,Vn=new P;function _r(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){Vn.fromArray(s,r);const a=i.x*Math.abs(Vn.x)+i.y*Math.abs(Vn.y)+i.z*Math.abs(Vn.z),c=t.dot(Vn),l=e.dot(Vn),h=n.dot(Vn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const Od=new ni,qi=new P,vr=new P;class zi{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Od.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;qi.subVectors(t,this.center);const e=qi.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(qi,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(vr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(qi.copy(t.center).add(vr)),this.expandByPoint(qi.copy(t.center).sub(vr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const mn=new P,xr=new P,Ss=new P,An=new P,yr=new P,Ms=new P,Sr=new P;class gl{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,mn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=mn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(mn.copy(this.origin).addScaledVector(this.direction,e),mn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){xr.copy(t).add(e).multiplyScalar(.5),Ss.copy(e).sub(t).normalize(),An.copy(this.origin).sub(xr);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Ss),a=An.dot(this.direction),c=-An.dot(Ss),l=An.lengthSq(),h=Math.abs(1-o*o);let d,u,f,g;if(h>0)if(d=o*c-a,u=o*a-c,g=r*h,d>=0)if(u>=-g)if(u<=g){const _=1/h;d*=_,u*=_,f=d*(d+o*u+2*a)+u*(o*d+u+2*c)+l}else u=r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;else u=-r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;else u<=-g?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l):u<=g?(d=0,u=Math.min(Math.max(-r,-c),r),f=u*(u+2*c)+l):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(xr).addScaledVector(Ss,u),f}intersectSphere(t,e){mn.subVectors(t.center,this.origin);const n=mn.dot(this.direction),i=mn.dot(mn)-n*n,r=t.radius*t.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(n=(t.min.x-u.x)*l,i=(t.max.x-u.x)*l):(n=(t.max.x-u.x)*l,i=(t.min.x-u.x)*l),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),d>=0?(a=(t.min.z-u.z)*d,c=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,c=(t.min.z-u.z)*d),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,mn)!==null}intersectTriangle(t,e,n,i,r){yr.subVectors(e,t),Ms.subVectors(n,t),Sr.crossVectors(yr,Ms);let o=this.direction.dot(Sr),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;An.subVectors(this.origin,t);const c=a*this.direction.dot(Ms.crossVectors(An,Ms));if(c<0)return null;const l=a*this.direction.dot(yr.cross(An));if(l<0||c+l>o)return null;const h=-a*An.dot(Sr);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class te{constructor(t,e,n,i,r,o,a,c,l,h,d,u,f,g,_,m){te.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,c,l,h,d,u,f,g,_,m)}set(t,e,n,i,r,o,a,c,l,h,d,u,f,g,_,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new te().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/ui.setFromMatrixColumn(t,0).length(),r=1/ui.setFromMatrixColumn(t,1).length(),o=1/ui.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const u=o*h,f=o*d,g=a*h,_=a*d;e[0]=c*h,e[4]=-c*d,e[8]=l,e[1]=f+g*l,e[5]=u-_*l,e[9]=-a*c,e[2]=_-u*l,e[6]=g+f*l,e[10]=o*c}else if(t.order==="YXZ"){const u=c*h,f=c*d,g=l*h,_=l*d;e[0]=u+_*a,e[4]=g*a-f,e[8]=o*l,e[1]=o*d,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=_+u*a,e[10]=o*c}else if(t.order==="ZXY"){const u=c*h,f=c*d,g=l*h,_=l*d;e[0]=u-_*a,e[4]=-o*d,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=_-u*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const u=o*h,f=o*d,g=a*h,_=a*d;e[0]=c*h,e[4]=g*l-f,e[8]=u*l+_,e[1]=c*d,e[5]=_*l+u,e[9]=f*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const u=o*c,f=o*l,g=a*c,_=a*l;e[0]=c*h,e[4]=_-u*d,e[8]=g*d+f,e[1]=d,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=f*d+g,e[10]=u-_*d}else if(t.order==="XZY"){const u=o*c,f=o*l,g=a*c,_=a*l;e[0]=c*h,e[4]=-d,e[8]=l*h,e[1]=u*d+_,e[5]=o*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=a*h,e[10]=_*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Bd,t,zd)}lookAt(t,e,n){const i=this.elements;return Ge.subVectors(t,e),Ge.lengthSq()===0&&(Ge.z=1),Ge.normalize(),Rn.crossVectors(n,Ge),Rn.lengthSq()===0&&(Math.abs(n.z)===1?Ge.x+=1e-4:Ge.z+=1e-4,Ge.normalize(),Rn.crossVectors(n,Ge)),Rn.normalize(),Ts.crossVectors(Ge,Rn),i[0]=Rn.x,i[4]=Ts.x,i[8]=Ge.x,i[1]=Rn.y,i[5]=Ts.y,i[9]=Ge.y,i[2]=Rn.z,i[6]=Ts.z,i[10]=Ge.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],x=n[3],S=n[7],v=n[11],L=n[15],E=i[0],C=i[4],w=i[8],M=i[12],y=i[1],R=i[5],k=i[9],F=i[13],H=i[2],O=i[6],U=i[10],Y=i[14],W=i[3],ot=i[7],N=i[11],D=i[15];return r[0]=o*E+a*y+c*H+l*W,r[4]=o*C+a*R+c*O+l*ot,r[8]=o*w+a*k+c*U+l*N,r[12]=o*M+a*F+c*Y+l*D,r[1]=h*E+d*y+u*H+f*W,r[5]=h*C+d*R+u*O+f*ot,r[9]=h*w+d*k+u*U+f*N,r[13]=h*M+d*F+u*Y+f*D,r[2]=g*E+_*y+m*H+p*W,r[6]=g*C+_*R+m*O+p*ot,r[10]=g*w+_*k+m*U+p*N,r[14]=g*M+_*F+m*Y+p*D,r[3]=x*E+S*y+v*H+L*W,r[7]=x*C+S*R+v*O+L*ot,r[11]=x*w+S*k+v*U+L*N,r[15]=x*M+S*F+v*Y+L*D,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+r*c*d-i*l*d-r*a*u+n*l*u+i*a*f-n*c*f)+_*(+e*c*f-e*l*u+r*o*u-i*o*f+i*l*h-r*c*h)+m*(+e*l*d-e*a*f-r*o*d+n*o*f+r*a*h-n*l*h)+p*(-i*a*h-e*c*d+e*a*u+i*o*d-n*o*u+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],_=t[13],m=t[14],p=t[15],x=d*m*l-_*u*l+_*c*f-a*m*f-d*c*p+a*u*p,S=g*u*l-h*m*l-g*c*f+o*m*f+h*c*p-o*u*p,v=h*_*l-g*d*l+g*a*f-o*_*f-h*a*p+o*d*p,L=g*d*c-h*_*c-g*a*u+o*_*u+h*a*m-o*d*m,E=e*x+n*S+i*v+r*L;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/E;return t[0]=x*C,t[1]=(_*u*r-d*m*r-_*i*f+n*m*f+d*i*p-n*u*p)*C,t[2]=(a*m*r-_*c*r+_*i*l-n*m*l-a*i*p+n*c*p)*C,t[3]=(d*c*r-a*u*r-d*i*l+n*u*l+a*i*f-n*c*f)*C,t[4]=S*C,t[5]=(h*m*r-g*u*r+g*i*f-e*m*f-h*i*p+e*u*p)*C,t[6]=(g*c*r-o*m*r-g*i*l+e*m*l+o*i*p-e*c*p)*C,t[7]=(o*u*r-h*c*r+h*i*l-e*u*l-o*i*f+e*c*f)*C,t[8]=v*C,t[9]=(g*d*r-h*_*r-g*n*f+e*_*f+h*n*p-e*d*p)*C,t[10]=(o*_*r-g*a*r+g*n*l-e*_*l-o*n*p+e*a*p)*C,t[11]=(h*a*r-o*d*r-h*n*l+e*d*l+o*n*f-e*a*f)*C,t[12]=L*C,t[13]=(h*_*i-g*d*i+g*n*u-e*_*u-h*n*m+e*d*m)*C,t[14]=(g*a*i-o*_*i-g*n*c+e*_*c+o*n*m-e*a*m)*C,t[15]=(o*d*i-h*a*i+h*n*c-e*d*c-o*n*u+e*a*u)*C,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,h*a+n,h*c-i*o,0,l*c-i*a,h*c+i*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,d=a+a,u=r*l,f=r*h,g=r*d,_=o*h,m=o*d,p=a*d,x=c*l,S=c*h,v=c*d,L=n.x,E=n.y,C=n.z;return i[0]=(1-(_+p))*L,i[1]=(f+v)*L,i[2]=(g-S)*L,i[3]=0,i[4]=(f-v)*E,i[5]=(1-(u+p))*E,i[6]=(m+x)*E,i[7]=0,i[8]=(g+S)*C,i[9]=(m-x)*C,i[10]=(1-(u+_))*C,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=ui.set(i[0],i[1],i[2]).length();const o=ui.set(i[4],i[5],i[6]).length(),a=ui.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],Qe.copy(this);const l=1/r,h=1/o,d=1/a;return Qe.elements[0]*=l,Qe.elements[1]*=l,Qe.elements[2]*=l,Qe.elements[4]*=h,Qe.elements[5]*=h,Qe.elements[6]*=h,Qe.elements[8]*=d,Qe.elements[9]*=d,Qe.elements[10]*=d,e.setFromRotationMatrix(Qe),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,i,r,o,a=yn){const c=this.elements,l=2*r/(e-t),h=2*r/(n-i),d=(e+t)/(e-t),u=(n+i)/(n-i);let f,g;if(a===yn)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===er)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,o,a=yn){const c=this.elements,l=1/(e-t),h=1/(n-i),d=1/(o-r),u=(e+t)*l,f=(n+i)*h;let g,_;if(a===yn)g=(o+r)*d,_=-2*d;else if(a===er)g=r*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-u,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ui=new P,Qe=new te,Bd=new P(0,0,0),zd=new P(1,1,1),Rn=new P,Ts=new P,Ge=new P,Wa=new te,Xa=new ei;class on{constructor(t=0,e=0,n=0,i=on.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],o=i[4],a=i[8],c=i[1],l=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(be(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-be(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(be(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-be(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(be(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-be(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Wa.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Wa,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Xa.setFromEuler(this),this.setFromQuaternion(Xa,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}on.DEFAULT_ORDER="XYZ";class _l{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Gd=0;const $a=new P,fi=new ei,gn=new te,bs=new P,Yi=new P,Vd=new P,Hd=new ei,qa=new P(1,0,0),Ya=new P(0,1,0),ja=new P(0,0,1),Za={type:"added"},Wd={type:"removed"},pi={type:"childadded",child:null},Mr={type:"childremoved",child:null};class xe extends Oi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Gd++}),this.uuid=Bi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xe.DEFAULT_UP.clone();const t=new P,e=new on,n=new ei,i=new P(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new te},normalMatrix:{value:new Yt}}),this.matrix=new te,this.matrixWorld=new te,this.matrixAutoUpdate=xe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new _l,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return fi.setFromAxisAngle(t,e),this.quaternion.multiply(fi),this}rotateOnWorldAxis(t,e){return fi.setFromAxisAngle(t,e),this.quaternion.premultiply(fi),this}rotateX(t){return this.rotateOnAxis(qa,t)}rotateY(t){return this.rotateOnAxis(Ya,t)}rotateZ(t){return this.rotateOnAxis(ja,t)}translateOnAxis(t,e){return $a.copy(t).applyQuaternion(this.quaternion),this.position.add($a.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(qa,t)}translateY(t){return this.translateOnAxis(Ya,t)}translateZ(t){return this.translateOnAxis(ja,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(gn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?bs.copy(t):bs.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Yi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?gn.lookAt(Yi,bs,this.up):gn.lookAt(bs,Yi,this.up),this.quaternion.setFromRotationMatrix(gn),i&&(gn.extractRotation(i.matrixWorld),fi.setFromRotationMatrix(gn),this.quaternion.premultiply(fi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Za),pi.child=t,this.dispatchEvent(pi),pi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Wd),Mr.child=t,this.dispatchEvent(Mr),Mr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),gn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),gn.multiply(t.parent.matrixWorld)),t.applyMatrix4(gn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Za),pi.child=t,this.dispatchEvent(pi),pi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yi,t,Vd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yi,Hd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const d=c[l];r(t.shapes,d)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));i.material=a}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];i.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),d=o(t.shapes),u=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}xe.DEFAULT_UP=new P(0,1,0);xe.DEFAULT_MATRIX_AUTO_UPDATE=!0;xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const tn=new P,_n=new P,Tr=new P,vn=new P,mi=new P,gi=new P,Ka=new P,br=new P,Er=new P,wr=new P,Cr=new ae,Ar=new ae,Rr=new ae;class nn{constructor(t=new P,e=new P,n=new P){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),tn.subVectors(t,e),i.cross(tn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){tn.subVectors(i,e),_n.subVectors(n,e),Tr.subVectors(t,e);const o=tn.dot(tn),a=tn.dot(_n),c=tn.dot(Tr),l=_n.dot(_n),h=_n.dot(Tr),d=o*l-a*a;if(d===0)return r.set(0,0,0),null;const u=1/d,f=(l*c-a*h)*u,g=(o*h-a*c)*u;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,vn)===null?!1:vn.x>=0&&vn.y>=0&&vn.x+vn.y<=1}static getInterpolation(t,e,n,i,r,o,a,c){return this.getBarycoord(t,e,n,i,vn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,vn.x),c.addScaledVector(o,vn.y),c.addScaledVector(a,vn.z),c)}static getInterpolatedAttribute(t,e,n,i,r,o){return Cr.setScalar(0),Ar.setScalar(0),Rr.setScalar(0),Cr.fromBufferAttribute(t,e),Ar.fromBufferAttribute(t,n),Rr.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(Cr,r.x),o.addScaledVector(Ar,r.y),o.addScaledVector(Rr,r.z),o}static isFrontFacing(t,e,n,i){return tn.subVectors(n,e),_n.subVectors(t,e),tn.cross(_n).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return tn.subVectors(this.c,this.b),_n.subVectors(this.a,this.b),tn.cross(_n).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return nn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return nn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return nn.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return nn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return nn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let o,a;mi.subVectors(i,n),gi.subVectors(r,n),br.subVectors(t,n);const c=mi.dot(br),l=gi.dot(br);if(c<=0&&l<=0)return e.copy(n);Er.subVectors(t,i);const h=mi.dot(Er),d=gi.dot(Er);if(h>=0&&d<=h)return e.copy(i);const u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(mi,o);wr.subVectors(t,r);const f=mi.dot(wr),g=gi.dot(wr);if(g>=0&&f<=g)return e.copy(r);const _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(gi,a);const m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return Ka.subVectors(r,i),a=(d-h)/(d-h+(f-g)),e.copy(i).addScaledVector(Ka,a);const p=1/(m+_+u);return o=_*p,a=u*p,e.copy(n).addScaledVector(mi,o).addScaledVector(gi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const vl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Pn={h:0,s:0,l:0},Es={h:0,s:0,l:0};function Pr(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class Wt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=pe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Jt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=Jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Jt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=Jt.workingColorSpace){if(t=aa(t,1),e=be(e,0,1),n=be(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Pr(o,r,t+1/3),this.g=Pr(o,r,t),this.b=Pr(o,r,t-1/3)}return Jt.toWorkingColorSpace(this,i),this}setStyle(t,e=pe){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=pe){const n=vl[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Sn(t.r),this.g=Sn(t.g),this.b=Sn(t.b),this}copyLinearToSRGB(t){return this.r=Ci(t.r),this.g=Ci(t.g),this.b=Ci(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=pe){return Jt.fromWorkingColorSpace(Ae.copy(this),t),Math.round(be(Ae.r*255,0,255))*65536+Math.round(be(Ae.g*255,0,255))*256+Math.round(be(Ae.b*255,0,255))}getHexString(t=pe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Jt.workingColorSpace){Jt.fromWorkingColorSpace(Ae.copy(this),e);const n=Ae.r,i=Ae.g,r=Ae.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const d=o-a;switch(l=h<=.5?d/(o+a):d/(2-o-a),o){case n:c=(i-r)/d+(i<r?6:0);break;case i:c=(r-n)/d+2;break;case r:c=(n-i)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=Jt.workingColorSpace){return Jt.fromWorkingColorSpace(Ae.copy(this),e),t.r=Ae.r,t.g=Ae.g,t.b=Ae.b,t}getStyle(t=pe){Jt.fromWorkingColorSpace(Ae.copy(this),t);const e=Ae.r,n=Ae.g,i=Ae.b;return t!==pe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Pn),this.setHSL(Pn.h+t,Pn.s+e,Pn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Pn),t.getHSL(Es);const n=rs(Pn.h,Es.h,e),i=rs(Pn.s,Es.s,e),r=rs(Pn.l,Es.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ae=new Wt;Wt.NAMES=vl;let Xd=0;class Gi extends Oi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Xd++}),this.uuid=Bi(),this.name="",this.blending=Nn,this.side=On,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Jr,this.blendDst=Qr,this.blendEquation=jn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Wt(0,0,0),this.blendAlpha=0,this.depthFunc=Pi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Da,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ai,this.stencilZFail=ai,this.stencilZPass=ai,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Nn&&(n.blending=this.blending),this.side!==On&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Jr&&(n.blendSrc=this.blendSrc),this.blendDst!==Qr&&(n.blendDst=this.blendDst),this.blendEquation!==jn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Pi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Da&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ai&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ai&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ai&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Nt extends Gi{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.combine=Qc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const _e=new P,ws=new Ft;class je{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ua,this.updateRanges=[],this.gpuType=dn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)ws.fromBufferAttribute(this,e),ws.applyMatrix3(t),this.setXY(e,ws.x,ws.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix3(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix4(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyNormalMatrix(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.transformDirection(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ti(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Le(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ti(e,this.array)),e}setX(t,e){return this.normalized&&(e=Le(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ti(e,this.array)),e}setY(t,e){return this.normalized&&(e=Le(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ti(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Le(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ti(e,this.array)),e}setW(t,e){return this.normalized&&(e=Le(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Le(e,this.array),n=Le(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Le(e,this.array),n=Le(n,this.array),i=Le(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=Le(e,this.array),n=Le(n,this.array),i=Le(i,this.array),r=Le(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ua&&(t.usage=this.usage),t}}class xl extends je{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class yl extends je{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Zt extends je{constructor(t,e,n){super(new Float32Array(t),e,n)}}let $d=0;const $e=new te,Ir=new xe,_i=new P,Ve=new ni,ji=new ni,Me=new P;class ge extends Oi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:$d++}),this.uuid=Bi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(fl(t)?yl:xl)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Yt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return $e.makeRotationFromQuaternion(t),this.applyMatrix4($e),this}rotateX(t){return $e.makeRotationX(t),this.applyMatrix4($e),this}rotateY(t){return $e.makeRotationY(t),this.applyMatrix4($e),this}rotateZ(t){return $e.makeRotationZ(t),this.applyMatrix4($e),this}translate(t,e,n){return $e.makeTranslation(t,e,n),this.applyMatrix4($e),this}scale(t,e,n){return $e.makeScale(t,e,n),this.applyMatrix4($e),this}lookAt(t){return Ir.lookAt(t),Ir.updateMatrix(),this.applyMatrix4(Ir.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_i).negate(),this.translate(_i.x,_i.y,_i.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Zt(n,3))}else{for(let n=0,i=e.count;n<i;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ni);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];Ve.setFromBufferAttribute(r),this.morphTargetsRelative?(Me.addVectors(this.boundingBox.min,Ve.min),this.boundingBox.expandByPoint(Me),Me.addVectors(this.boundingBox.max,Ve.max),this.boundingBox.expandByPoint(Me)):(this.boundingBox.expandByPoint(Ve.min),this.boundingBox.expandByPoint(Ve.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new zi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){const n=this.boundingSphere.center;if(Ve.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];ji.setFromBufferAttribute(a),this.morphTargetsRelative?(Me.addVectors(Ve.min,ji.min),Ve.expandByPoint(Me),Me.addVectors(Ve.max,ji.max),Ve.expandByPoint(Me)):(Ve.expandByPoint(ji.min),Ve.expandByPoint(ji.max))}Ve.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)Me.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Me));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Me.fromBufferAttribute(a,l),c&&(_i.fromBufferAttribute(t,l),Me.add(_i)),i=Math.max(i,n.distanceToSquared(Me))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new je(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let w=0;w<n.count;w++)a[w]=new P,c[w]=new P;const l=new P,h=new P,d=new P,u=new Ft,f=new Ft,g=new Ft,_=new P,m=new P;function p(w,M,y){l.fromBufferAttribute(n,w),h.fromBufferAttribute(n,M),d.fromBufferAttribute(n,y),u.fromBufferAttribute(r,w),f.fromBufferAttribute(r,M),g.fromBufferAttribute(r,y),h.sub(l),d.sub(l),f.sub(u),g.sub(u);const R=1/(f.x*g.y-g.x*f.y);isFinite(R)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(R),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(R),a[w].add(_),a[M].add(_),a[y].add(_),c[w].add(m),c[M].add(m),c[y].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let w=0,M=x.length;w<M;++w){const y=x[w],R=y.start,k=y.count;for(let F=R,H=R+k;F<H;F+=3)p(t.getX(F+0),t.getX(F+1),t.getX(F+2))}const S=new P,v=new P,L=new P,E=new P;function C(w){L.fromBufferAttribute(i,w),E.copy(L);const M=a[w];S.copy(M),S.sub(L.multiplyScalar(L.dot(M))).normalize(),v.crossVectors(E,M);const R=v.dot(c[w])<0?-1:1;o.setXYZW(w,S.x,S.y,S.z,R)}for(let w=0,M=x.length;w<M;++w){const y=x[w],R=y.start,k=y.count;for(let F=R,H=R+k;F<H;F+=3)C(t.getX(F+0)),C(t.getX(F+1)),C(t.getX(F+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new je(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const i=new P,r=new P,o=new P,a=new P,c=new P,l=new P,h=new P,d=new P;if(t)for(let u=0,f=t.count;u<f;u+=3){const g=t.getX(u+0),_=t.getX(u+1),m=t.getX(u+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,r),d.subVectors(i,r),h.cross(d),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,f=e.count;u<f;u+=3)i.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),d.subVectors(i,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Me.fromBufferAttribute(t,e),Me.normalize(),t.setXYZ(e,Me.x,Me.y,Me.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,d=a.normalized,u=new l.constructor(c.length*h);let f=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?f=c[_]*a.data.stride+a.offset:f=c[_]*h;for(let p=0;p<h;p++)u[g++]=l[f++]}return new je(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ge,n=this.index.array,i=this.attributes;for(const a in i){const c=i[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,d=l.length;h<d;h++){const u=l[h],f=t(u,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const i={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){const f=l[d];h.push(f.toJSON(t.data))}h.length>0&&(i[c]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],d=r[l];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ja=new te,Hn=new gl,Cs=new zi,Qa=new P,As=new P,Rs=new P,Ps=new P,Lr=new P,Is=new P,tc=new P,Ls=new P;class A extends xe{constructor(t=new ge,e=new Nt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(r&&a){Is.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],d=r[c];h!==0&&(Lr.fromBufferAttribute(d,t),o?Is.addScaledVector(Lr,h):Is.addScaledVector(Lr.sub(e),h))}e.add(Is)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Cs.copy(n.boundingSphere),Cs.applyMatrix4(r),Hn.copy(t.ray).recast(t.near),!(Cs.containsPoint(Hn.origin)===!1&&(Hn.intersectSphere(Cs,Qa)===null||Hn.origin.distanceToSquared(Qa)>(t.far-t.near)**2))&&(Ja.copy(r).invert(),Hn.copy(t.ray).applyMatrix4(Ja),!(n.boundingBox!==null&&Hn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Hn)))}_computeIntersections(t,e,n){let i;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){const m=u[g],p=o[m.materialIndex],x=Math.max(m.start,f.start),S=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let v=x,L=S;v<L;v+=3){const E=a.getX(v),C=a.getX(v+1),w=a.getX(v+2);i=Ds(this,p,t,n,l,h,d,E,C,w),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const x=a.getX(m),S=a.getX(m+1),v=a.getX(m+2);i=Ds(this,o,t,n,l,h,d,x,S,v),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){const m=u[g],p=o[m.materialIndex],x=Math.max(m.start,f.start),S=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let v=x,L=S;v<L;v+=3){const E=v,C=v+1,w=v+2;i=Ds(this,p,t,n,l,h,d,E,C,w),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const x=m,S=m+1,v=m+2;i=Ds(this,o,t,n,l,h,d,x,S,v),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function qd(s,t,e,n,i,r,o,a){let c;if(t.side===Be?c=n.intersectTriangle(o,r,i,!0,a):c=n.intersectTriangle(i,r,o,t.side===On,a),c===null)return null;Ls.copy(a),Ls.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(Ls);return l<e.near||l>e.far?null:{distance:l,point:Ls.clone(),object:s}}function Ds(s,t,e,n,i,r,o,a,c,l){s.getVertexPosition(a,As),s.getVertexPosition(c,Rs),s.getVertexPosition(l,Ps);const h=qd(s,t,e,n,As,Rs,Ps,tc);if(h){const d=new P;nn.getBarycoord(tc,As,Rs,Ps,d),i&&(h.uv=nn.getInterpolatedAttribute(i,a,c,l,d,new Ft)),r&&(h.uv1=nn.getInterpolatedAttribute(r,a,c,l,d,new Ft)),o&&(h.normal=nn.getInterpolatedAttribute(o,a,c,l,d,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:c,c:l,normal:new P,materialIndex:0};nn.getNormal(As,Rs,Ps,u.normal),h.face=u,h.barycoord=d}return h}class $ extends ge{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],d=[];let u=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new Zt(l,3)),this.setAttribute("normal",new Zt(h,3)),this.setAttribute("uv",new Zt(d,2));function g(_,m,p,x,S,v,L,E,C,w,M){const y=v/C,R=L/w,k=v/2,F=L/2,H=E/2,O=C+1,U=w+1;let Y=0,W=0;const ot=new P;for(let N=0;N<U;N++){const D=N*R-F;for(let lt=0;lt<O;lt++){const ut=lt*y-k;ot[_]=ut*x,ot[m]=D*S,ot[p]=H,l.push(ot.x,ot.y,ot.z),ot[_]=0,ot[m]=0,ot[p]=E>0?1:-1,h.push(ot.x,ot.y,ot.z),d.push(lt/C),d.push(1-N/w),Y+=1}}for(let N=0;N<w;N++)for(let D=0;D<C;D++){const lt=u+D+O*N,ut=u+D+O*(N+1),X=u+(D+1)+O*(N+1),K=u+(D+1)+O*N;c.push(lt,ut,K),c.push(ut,X,K),W+=6}a.addGroup(f,W,M),f+=W,u+=Y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function ki(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function De(s){const t={};for(let e=0;e<s.length;e++){const n=ki(s[e]);for(const i in n)t[i]=n[i]}return t}function Yd(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Sl(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Jt.workingColorSpace}const jd={clone:ki,merge:De};var Zd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Kd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Bn extends Gi{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Zd,this.fragmentShader=Kd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ki(t.uniforms),this.uniformsGroups=Yd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Ml extends xe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new te,this.projectionMatrix=new te,this.projectionMatrixInverse=new te,this.coordinateSystem=yn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const In=new P,ec=new Ft,nc=new Ft;class Oe extends Ml{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ni*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ss*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ni*2*Math.atan(Math.tan(ss*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){In.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(In.x,In.y).multiplyScalar(-t/In.z),In.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(In.x,In.y).multiplyScalar(-t/In.z)}getViewSize(t,e){return this.getViewBounds(t,ec,nc),e.subVectors(nc,ec)}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ss*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*i/c,e-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const vi=-90,xi=1;class Jd extends xe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Oe(vi,xi,t,e);i.layers=this.layers,this.add(i);const r=new Oe(vi,xi,t,e);r.layers=this.layers,this.add(r);const o=new Oe(vi,xi,t,e);o.layers=this.layers,this.add(o);const a=new Oe(vi,xi,t,e);a.layers=this.layers,this.add(a);const c=new Oe(vi,xi,t,e);c.layers=this.layers,this.add(c);const l=new Oe(vi,xi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===yn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===er)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,c),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Tl extends Ee{constructor(t,e,n,i,r,o,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:Ii,super(t,e,n,i,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Qd extends ti{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Tl(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:hn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new $(5,5,5),r=new Bn({name:"CubemapFromEquirect",uniforms:ki(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Be,blending:Un});r.uniforms.tEquirect.value=e;const o=new A(i,r),a=e.minFilter;return e.minFilter===Jn&&(e.minFilter=hn),new Jd(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r)}}const Dr=new P,tu=new P,eu=new Yt;class qn{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Dr.subVectors(n,e).cross(tu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Dr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||eu.getNormalMatrix(t),i=this.coplanarPoint(Dr).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Wn=new zi,Us=new P;class ca{constructor(t=new qn,e=new qn,n=new qn,i=new qn,r=new qn,o=new qn){this.planes=[t,e,n,i,r,o]}set(t,e,n,i,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=yn){const n=this.planes,i=t.elements,r=i[0],o=i[1],a=i[2],c=i[3],l=i[4],h=i[5],d=i[6],u=i[7],f=i[8],g=i[9],_=i[10],m=i[11],p=i[12],x=i[13],S=i[14],v=i[15];if(n[0].setComponents(c-r,u-l,m-f,v-p).normalize(),n[1].setComponents(c+r,u+l,m+f,v+p).normalize(),n[2].setComponents(c+o,u+h,m+g,v+x).normalize(),n[3].setComponents(c-o,u-h,m-g,v-x).normalize(),n[4].setComponents(c-a,u-d,m-_,v-S).normalize(),e===yn)n[5].setComponents(c+a,u+d,m+_,v+S).normalize();else if(e===er)n[5].setComponents(a,d,_,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Wn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Wn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Wn)}intersectsSprite(t){return Wn.center.set(0,0,0),Wn.radius=.7071067811865476,Wn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Wn)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Us.x=i.normal.x>0?t.max.x:t.min.x,Us.y=i.normal.y>0?t.max.y:t.min.y,Us.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Us)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function bl(){let s=null,t=!1,e=null,n=null;function i(r,o){e(r,o),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function nu(s){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,d=l.byteLength,u=s.createBuffer();s.bindBuffer(c,u),s.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=s.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=s.SHORT;else if(l instanceof Uint32Array)f=s.UNSIGNED_INT;else if(l instanceof Int32Array)f=s.INT;else if(l instanceof Int8Array)f=s.BYTE;else if(l instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,c,l){const h=c.array,d=c.updateRanges;if(s.bindBuffer(l,a),d.length===0)s.bufferSubData(l,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){const g=d[u],_=d[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++u,d[u]=_)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){const _=d[f];s.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(s.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:i,remove:r,update:o}}class he extends ge{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(i),l=a+1,h=c+1,d=t/a,u=e/c,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const x=p*u-o;for(let S=0;S<l;S++){const v=S*d-r;g.push(v,-x,0),_.push(0,0,1),m.push(S/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let x=0;x<a;x++){const S=x+l*p,v=x+l*(p+1),L=x+1+l*(p+1),E=x+1+l*p;f.push(S,v,E),f.push(v,L,E)}this.setIndex(f),this.setAttribute("position",new Zt(g,3)),this.setAttribute("normal",new Zt(_,3)),this.setAttribute("uv",new Zt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new he(t.width,t.height,t.widthSegments,t.heightSegments)}}var iu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,su=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,ru=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ou=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,au=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,cu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,lu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,hu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,du=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,uu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,fu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,pu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,mu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,gu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,_u=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,vu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,xu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,yu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Su=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Mu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Tu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,bu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Eu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,wu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Cu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Au=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Ru=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Pu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Iu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Lu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Du="gl_FragColor = linearToOutputTexel( gl_FragColor );",Uu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Nu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ku=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Fu=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Ou=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Bu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,zu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Gu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Vu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Hu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Wu=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Xu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,$u=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,qu=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Yu=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,ju=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Zu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ku=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ju=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Qu=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,tf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ef=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,nf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,sf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,rf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,of=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,af=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cf=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,lf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,hf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,df=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,uf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ff=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,pf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,mf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,gf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,_f=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,vf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,yf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Sf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Mf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Tf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ef=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,wf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Cf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Af=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Rf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Pf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,If=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Lf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Df=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Uf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Nf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,kf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ff=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Of=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Bf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,zf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Gf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Vf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Hf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Wf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Xf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,$f=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,qf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Yf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,jf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Zf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Kf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Jf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Qf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,tp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ep=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,np=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ip=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,sp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,op=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ap=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,hp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,dp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,up=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,fp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,pp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,gp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_p=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,vp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Mp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,bp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Ep=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ap=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Pp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ip=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Lp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Dp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Up=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Np=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,kp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,jt={alphahash_fragment:iu,alphahash_pars_fragment:su,alphamap_fragment:ru,alphamap_pars_fragment:ou,alphatest_fragment:au,alphatest_pars_fragment:cu,aomap_fragment:lu,aomap_pars_fragment:hu,batching_pars_vertex:du,batching_vertex:uu,begin_vertex:fu,beginnormal_vertex:pu,bsdfs:mu,iridescence_fragment:gu,bumpmap_pars_fragment:_u,clipping_planes_fragment:vu,clipping_planes_pars_fragment:xu,clipping_planes_pars_vertex:yu,clipping_planes_vertex:Su,color_fragment:Mu,color_pars_fragment:Tu,color_pars_vertex:bu,color_vertex:Eu,common:wu,cube_uv_reflection_fragment:Cu,defaultnormal_vertex:Au,displacementmap_pars_vertex:Ru,displacementmap_vertex:Pu,emissivemap_fragment:Iu,emissivemap_pars_fragment:Lu,colorspace_fragment:Du,colorspace_pars_fragment:Uu,envmap_fragment:Nu,envmap_common_pars_fragment:ku,envmap_pars_fragment:Fu,envmap_pars_vertex:Ou,envmap_physical_pars_fragment:ju,envmap_vertex:Bu,fog_vertex:zu,fog_pars_vertex:Gu,fog_fragment:Vu,fog_pars_fragment:Hu,gradientmap_pars_fragment:Wu,lightmap_pars_fragment:Xu,lights_lambert_fragment:$u,lights_lambert_pars_fragment:qu,lights_pars_begin:Yu,lights_toon_fragment:Zu,lights_toon_pars_fragment:Ku,lights_phong_fragment:Ju,lights_phong_pars_fragment:Qu,lights_physical_fragment:tf,lights_physical_pars_fragment:ef,lights_fragment_begin:nf,lights_fragment_maps:sf,lights_fragment_end:rf,logdepthbuf_fragment:of,logdepthbuf_pars_fragment:af,logdepthbuf_pars_vertex:cf,logdepthbuf_vertex:lf,map_fragment:hf,map_pars_fragment:df,map_particle_fragment:uf,map_particle_pars_fragment:ff,metalnessmap_fragment:pf,metalnessmap_pars_fragment:mf,morphinstance_vertex:gf,morphcolor_vertex:_f,morphnormal_vertex:vf,morphtarget_pars_vertex:xf,morphtarget_vertex:yf,normal_fragment_begin:Sf,normal_fragment_maps:Mf,normal_pars_fragment:Tf,normal_pars_vertex:bf,normal_vertex:Ef,normalmap_pars_fragment:wf,clearcoat_normal_fragment_begin:Cf,clearcoat_normal_fragment_maps:Af,clearcoat_pars_fragment:Rf,iridescence_pars_fragment:Pf,opaque_fragment:If,packing:Lf,premultiplied_alpha_fragment:Df,project_vertex:Uf,dithering_fragment:Nf,dithering_pars_fragment:kf,roughnessmap_fragment:Ff,roughnessmap_pars_fragment:Of,shadowmap_pars_fragment:Bf,shadowmap_pars_vertex:zf,shadowmap_vertex:Gf,shadowmask_pars_fragment:Vf,skinbase_vertex:Hf,skinning_pars_vertex:Wf,skinning_vertex:Xf,skinnormal_vertex:$f,specularmap_fragment:qf,specularmap_pars_fragment:Yf,tonemapping_fragment:jf,tonemapping_pars_fragment:Zf,transmission_fragment:Kf,transmission_pars_fragment:Jf,uv_pars_fragment:Qf,uv_pars_vertex:tp,uv_vertex:ep,worldpos_vertex:np,background_vert:ip,background_frag:sp,backgroundCube_vert:rp,backgroundCube_frag:op,cube_vert:ap,cube_frag:cp,depth_vert:lp,depth_frag:hp,distanceRGBA_vert:dp,distanceRGBA_frag:up,equirect_vert:fp,equirect_frag:pp,linedashed_vert:mp,linedashed_frag:gp,meshbasic_vert:_p,meshbasic_frag:vp,meshlambert_vert:xp,meshlambert_frag:yp,meshmatcap_vert:Sp,meshmatcap_frag:Mp,meshnormal_vert:Tp,meshnormal_frag:bp,meshphong_vert:Ep,meshphong_frag:wp,meshphysical_vert:Cp,meshphysical_frag:Ap,meshtoon_vert:Rp,meshtoon_frag:Pp,points_vert:Ip,points_frag:Lp,shadow_vert:Dp,shadow_frag:Up,sprite_vert:Np,sprite_frag:kp},_t={common:{diffuse:{value:new Wt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Yt}},envmap:{envMap:{value:null},envMapRotation:{value:new Yt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Yt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Yt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Yt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Yt},normalScale:{value:new Ft(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Yt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Yt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Yt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Yt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Wt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Wt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0},uvTransform:{value:new Yt}},sprite:{diffuse:{value:new Wt(16777215)},opacity:{value:1},center:{value:new Ft(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}}},cn={basic:{uniforms:De([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.fog]),vertexShader:jt.meshbasic_vert,fragmentShader:jt.meshbasic_frag},lambert:{uniforms:De([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new Wt(0)}}]),vertexShader:jt.meshlambert_vert,fragmentShader:jt.meshlambert_frag},phong:{uniforms:De([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new Wt(0)},specular:{value:new Wt(1118481)},shininess:{value:30}}]),vertexShader:jt.meshphong_vert,fragmentShader:jt.meshphong_frag},standard:{uniforms:De([_t.common,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.roughnessmap,_t.metalnessmap,_t.fog,_t.lights,{emissive:{value:new Wt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:jt.meshphysical_vert,fragmentShader:jt.meshphysical_frag},toon:{uniforms:De([_t.common,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.gradientmap,_t.fog,_t.lights,{emissive:{value:new Wt(0)}}]),vertexShader:jt.meshtoon_vert,fragmentShader:jt.meshtoon_frag},matcap:{uniforms:De([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,{matcap:{value:null}}]),vertexShader:jt.meshmatcap_vert,fragmentShader:jt.meshmatcap_frag},points:{uniforms:De([_t.points,_t.fog]),vertexShader:jt.points_vert,fragmentShader:jt.points_frag},dashed:{uniforms:De([_t.common,_t.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:jt.linedashed_vert,fragmentShader:jt.linedashed_frag},depth:{uniforms:De([_t.common,_t.displacementmap]),vertexShader:jt.depth_vert,fragmentShader:jt.depth_frag},normal:{uniforms:De([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,{opacity:{value:1}}]),vertexShader:jt.meshnormal_vert,fragmentShader:jt.meshnormal_frag},sprite:{uniforms:De([_t.sprite,_t.fog]),vertexShader:jt.sprite_vert,fragmentShader:jt.sprite_frag},background:{uniforms:{uvTransform:{value:new Yt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:jt.background_vert,fragmentShader:jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Yt}},vertexShader:jt.backgroundCube_vert,fragmentShader:jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:jt.cube_vert,fragmentShader:jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:jt.equirect_vert,fragmentShader:jt.equirect_frag},distanceRGBA:{uniforms:De([_t.common,_t.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:jt.distanceRGBA_vert,fragmentShader:jt.distanceRGBA_frag},shadow:{uniforms:De([_t.lights,_t.fog,{color:{value:new Wt(0)},opacity:{value:1}}]),vertexShader:jt.shadow_vert,fragmentShader:jt.shadow_frag}};cn.physical={uniforms:De([cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Yt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Yt},clearcoatNormalScale:{value:new Ft(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Yt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Yt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Yt},sheen:{value:0},sheenColor:{value:new Wt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Yt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Yt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Yt},transmissionSamplerSize:{value:new Ft},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Yt},attenuationDistance:{value:0},attenuationColor:{value:new Wt(0)},specularColor:{value:new Wt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Yt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Yt},anisotropyVector:{value:new Ft},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Yt}}]),vertexShader:jt.meshphysical_vert,fragmentShader:jt.meshphysical_frag};const Ns={r:0,b:0,g:0},Xn=new on,Fp=new te;function Op(s,t,e,n,i,r,o){const a=new Wt(0);let c=r===!0?0:1,l,h,d=null,u=0,f=null;function g(x){let S=x.isScene===!0?x.background:null;return S&&S.isTexture&&(S=(x.backgroundBlurriness>0?e:t).get(S)),S}function _(x){let S=!1;const v=g(x);v===null?p(a,c):v&&v.isColor&&(p(v,1),S=!0);const L=s.xr.getEnvironmentBlendMode();L==="additive"?n.buffers.color.setClear(0,0,0,1,o):L==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(x,S){const v=g(S);v&&(v.isCubeTexture||v.mapping===or)?(h===void 0&&(h=new A(new $(1,1,1),new Bn({name:"BackgroundCubeMaterial",uniforms:ki(cn.backgroundCube.uniforms),vertexShader:cn.backgroundCube.vertexShader,fragmentShader:cn.backgroundCube.fragmentShader,side:Be,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(L,E,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Xn.copy(S.backgroundRotation),Xn.x*=-1,Xn.y*=-1,Xn.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Xn.y*=-1,Xn.z*=-1),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Fp.makeRotationFromEuler(Xn)),h.material.toneMapped=Jt.getTransfer(v.colorSpace)!==oe,(d!==v||u!==v.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,d=v,u=v.version,f=s.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new A(new he(2,2),new Bn({name:"BackgroundMaterial",uniforms:ki(cn.background.uniforms),vertexShader:cn.background.vertexShader,fragmentShader:cn.background.fragmentShader,side:On,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=Jt.getTransfer(v.colorSpace)!==oe,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(d!==v||u!==v.version||f!==s.toneMapping)&&(l.material.needsUpdate=!0,d=v,u=v.version,f=s.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function p(x,S){x.getRGB(Ns,Sl(s)),n.buffers.color.setClear(Ns.r,Ns.g,Ns.b,S,o)}return{getClearColor:function(){return a},setClearColor:function(x,S=1){a.set(x),c=S,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(x){c=x,p(a,c)},render:_,addToRenderList:m}}function Bp(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null);let r=i,o=!1;function a(y,R,k,F,H){let O=!1;const U=d(F,k,R);r!==U&&(r=U,l(r.object)),O=f(y,F,k,H),O&&g(y,F,k,H),H!==null&&t.update(H,s.ELEMENT_ARRAY_BUFFER),(O||o)&&(o=!1,v(y,R,k,F),H!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function c(){return s.createVertexArray()}function l(y){return s.bindVertexArray(y)}function h(y){return s.deleteVertexArray(y)}function d(y,R,k){const F=k.wireframe===!0;let H=n[y.id];H===void 0&&(H={},n[y.id]=H);let O=H[R.id];O===void 0&&(O={},H[R.id]=O);let U=O[F];return U===void 0&&(U=u(c()),O[F]=U),U}function u(y){const R=[],k=[],F=[];for(let H=0;H<e;H++)R[H]=0,k[H]=0,F[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:k,attributeDivisors:F,object:y,attributes:{},index:null}}function f(y,R,k,F){const H=r.attributes,O=R.attributes;let U=0;const Y=k.getAttributes();for(const W in Y)if(Y[W].location>=0){const N=H[W];let D=O[W];if(D===void 0&&(W==="instanceMatrix"&&y.instanceMatrix&&(D=y.instanceMatrix),W==="instanceColor"&&y.instanceColor&&(D=y.instanceColor)),N===void 0||N.attribute!==D||D&&N.data!==D.data)return!0;U++}return r.attributesNum!==U||r.index!==F}function g(y,R,k,F){const H={},O=R.attributes;let U=0;const Y=k.getAttributes();for(const W in Y)if(Y[W].location>=0){let N=O[W];N===void 0&&(W==="instanceMatrix"&&y.instanceMatrix&&(N=y.instanceMatrix),W==="instanceColor"&&y.instanceColor&&(N=y.instanceColor));const D={};D.attribute=N,N&&N.data&&(D.data=N.data),H[W]=D,U++}r.attributes=H,r.attributesNum=U,r.index=F}function _(){const y=r.newAttributes;for(let R=0,k=y.length;R<k;R++)y[R]=0}function m(y){p(y,0)}function p(y,R){const k=r.newAttributes,F=r.enabledAttributes,H=r.attributeDivisors;k[y]=1,F[y]===0&&(s.enableVertexAttribArray(y),F[y]=1),H[y]!==R&&(s.vertexAttribDivisor(y,R),H[y]=R)}function x(){const y=r.newAttributes,R=r.enabledAttributes;for(let k=0,F=R.length;k<F;k++)R[k]!==y[k]&&(s.disableVertexAttribArray(k),R[k]=0)}function S(y,R,k,F,H,O,U){U===!0?s.vertexAttribIPointer(y,R,k,H,O):s.vertexAttribPointer(y,R,k,F,H,O)}function v(y,R,k,F){_();const H=F.attributes,O=k.getAttributes(),U=R.defaultAttributeValues;for(const Y in O){const W=O[Y];if(W.location>=0){let ot=H[Y];if(ot===void 0&&(Y==="instanceMatrix"&&y.instanceMatrix&&(ot=y.instanceMatrix),Y==="instanceColor"&&y.instanceColor&&(ot=y.instanceColor)),ot!==void 0){const N=ot.normalized,D=ot.itemSize,lt=t.get(ot);if(lt===void 0)continue;const ut=lt.buffer,X=lt.type,K=lt.bytesPerElement,at=X===s.INT||X===s.UNSIGNED_INT||ot.gpuType===ta;if(ot.isInterleavedBufferAttribute){const Q=ot.data,dt=Q.stride,vt=ot.offset;if(Q.isInstancedInterleavedBuffer){for(let yt=0;yt<W.locationSize;yt++)p(W.location+yt,Q.meshPerAttribute);y.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let yt=0;yt<W.locationSize;yt++)m(W.location+yt);s.bindBuffer(s.ARRAY_BUFFER,ut);for(let yt=0;yt<W.locationSize;yt++)S(W.location+yt,D/W.locationSize,X,N,dt*K,(vt+D/W.locationSize*yt)*K,at)}else{if(ot.isInstancedBufferAttribute){for(let Q=0;Q<W.locationSize;Q++)p(W.location+Q,ot.meshPerAttribute);y.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let Q=0;Q<W.locationSize;Q++)m(W.location+Q);s.bindBuffer(s.ARRAY_BUFFER,ut);for(let Q=0;Q<W.locationSize;Q++)S(W.location+Q,D/W.locationSize,X,N,D*K,D/W.locationSize*Q*K,at)}}else if(U!==void 0){const N=U[Y];if(N!==void 0)switch(N.length){case 2:s.vertexAttrib2fv(W.location,N);break;case 3:s.vertexAttrib3fv(W.location,N);break;case 4:s.vertexAttrib4fv(W.location,N);break;default:s.vertexAttrib1fv(W.location,N)}}}}x()}function L(){w();for(const y in n){const R=n[y];for(const k in R){const F=R[k];for(const H in F)h(F[H].object),delete F[H];delete R[k]}delete n[y]}}function E(y){if(n[y.id]===void 0)return;const R=n[y.id];for(const k in R){const F=R[k];for(const H in F)h(F[H].object),delete F[H];delete R[k]}delete n[y.id]}function C(y){for(const R in n){const k=n[R];if(k[y.id]===void 0)continue;const F=k[y.id];for(const H in F)h(F[H].object),delete F[H];delete k[y.id]}}function w(){M(),o=!0,r!==i&&(r=i,l(r.object))}function M(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:w,resetDefaultState:M,dispose:L,releaseStatesOfGeometry:E,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:x}}function zp(s,t,e){let n;function i(l){n=l}function r(l,h){s.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,d){d!==0&&(s.drawArraysInstanced(n,l,h,d),e.update(h,n,d))}function a(l,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,d);let f=0;for(let g=0;g<d;g++)f+=h[g];e.update(f,n,1)}function c(l,h,d,u){if(d===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)o(l[g],h[g],u[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,u,0,d);let g=0;for(let _=0;_<d;_++)g+=h[_]*u[_];e.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Gp(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(C){return!(C!==sn&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const w=C===ps&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Mn&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==dn&&!w)}function c(C){if(C==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const d=e.logarithmicDepthBuffer===!0,u=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),x=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),S=s.getParameter(s.MAX_VARYING_VECTORS),v=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),L=g>0,E=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:x,maxVaryings:S,maxFragmentUniforms:v,vertexTextures:L,maxSamples:E}}function Vp(s){const t=this;let e=null,n=0,i=!1,r=!1;const o=new qn,a=new Yt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){const g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,p=s.get(d);if(!i||g===null||g.length===0||r&&!m)r?h(null):l();else{const x=r?0:n,S=x*4;let v=p.clippingState||null;c.value=v,v=h(g,u,S,f);for(let L=0;L!==S;++L)v[L]=e[L];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,g){const _=d!==null?d.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=f+_*4,x=u.matrixWorldInverse;a.getNormalMatrix(x),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,v=f;S!==_;++S,v+=4)o.copy(d[S]).applyMatrix4(x,a),o.normal.toArray(m,v),m[v+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function Hp(s){let t=new WeakMap;function e(o,a){return a===ao?o.mapping=Ii:a===co&&(o.mapping=Li),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===ao||a===co)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Qd(c.height);return l.fromEquirectangularTexture(s,o),t.set(o,l),o.addEventListener("dispose",i),e(l.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class El extends Ml{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=i+e,c=i-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const bi=4,ic=[.125,.215,.35,.446,.526,.582],Zn=20,Ur=new El,sc=new Wt;let Nr=null,kr=0,Fr=0,Or=!1;const Yn=(1+Math.sqrt(5))/2,yi=1/Yn,rc=[new P(-Yn,yi,0),new P(Yn,yi,0),new P(-yi,0,Yn),new P(yi,0,Yn),new P(0,Yn,-yi),new P(0,Yn,yi),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)];class oc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Nr=this._renderer.getRenderTarget(),kr=this._renderer.getActiveCubeFace(),Fr=this._renderer.getActiveMipmapLevel(),Or=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=lc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=cc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Nr,kr,Fr),this._renderer.xr.enabled=Or,t.scissorTest=!1,ks(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ii||t.mapping===Li?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Nr=this._renderer.getRenderTarget(),kr=this._renderer.getActiveCubeFace(),Fr=this._renderer.getActiveMipmapLevel(),Or=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:hn,minFilter:hn,generateMipmaps:!1,type:ps,format:sn,colorSpace:Fi,depthBuffer:!1},i=ac(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ac(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Wp(r)),this._blurMaterial=Xp(r,t,e)}return i}_compileMaterial(t){const e=new A(this._lodPlanes[0],t);this._renderer.compile(e,Ur)}_sceneToCubeUV(t,e,n,i){const a=new Oe(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(sc),h.toneMapping=kn,h.autoClear=!1;const f=new Nt({name:"PMREM.Background",side:Be,depthWrite:!1,depthTest:!1}),g=new A(new $,f);let _=!1;const m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,_=!0):(f.color.copy(sc),_=!0);for(let p=0;p<6;p++){const x=p%3;x===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):x===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));const S=this._cubeSize;ks(i,x*S,p>2?S:0,S,S),h.setRenderTarget(i),_&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Ii||t.mapping===Li;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=lc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=cc());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new A(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;ks(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Ur)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=rc[(i-r-1)%rc.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",r),this._halfBlur(o,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new A(this._lodPlanes[i],l),u=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Zn-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Zn;m>Zn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Zn}`);const p=[];let x=0;for(let C=0;C<Zn;++C){const w=C/_,M=Math.exp(-w*w/2);p.push(M),C===0?x+=M:C<m&&(x+=2*M)}for(let C=0;C<p.length;C++)p[C]=p[C]/x;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:S}=this;u.dTheta.value=g,u.mipInt.value=S-n;const v=this._sizeLods[i],L=3*v*(i>S-bi?i-S+bi:0),E=4*(this._cubeSize-v);ks(e,L,E,3*v,2*v),c.setRenderTarget(e),c.render(d,Ur)}}function Wp(s){const t=[],e=[],n=[];let i=s;const r=s-bi+1+ic.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);e.push(a);let c=1/a;o>s-bi?c=ic[o-s+bi-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,d=1+l,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,_=3,m=2,p=1,x=new Float32Array(_*g*f),S=new Float32Array(m*g*f),v=new Float32Array(p*g*f);for(let E=0;E<f;E++){const C=E%3*2/3-1,w=E>2?0:-1,M=[C,w,0,C+2/3,w,0,C+2/3,w+1,0,C,w,0,C+2/3,w+1,0,C,w+1,0];x.set(M,_*g*E),S.set(u,m*g*E);const y=[E,E,E,E,E,E];v.set(y,p*g*E)}const L=new ge;L.setAttribute("position",new je(x,_)),L.setAttribute("uv",new je(S,m)),L.setAttribute("faceIndex",new je(v,p)),t.push(L),i>bi&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function ac(s,t,e){const n=new ti(s,t,e);return n.texture.mapping=or,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ks(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function Xp(s,t,e){const n=new Float32Array(Zn),i=new P(0,1,0);return new Bn({name:"SphericalGaussianBlur",defines:{n:Zn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:la(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function cc(){return new Bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:la(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function lc(){return new Bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:la(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function la(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function $p(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===ao||c===co,h=c===Ii||c===Li;if(l||h){let d=t.get(a);const u=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return e===null&&(e=new oc(s)),d=l?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{const f=a.image;return l&&f&&f.height>0||h&&f&&i(f)?(e===null&&(e=new oc(s)),d=l?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function i(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function qp(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&es("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Yp(s,t,e,n){const i={},r=new WeakMap;function o(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);for(const g in u.morphAttributes){const _=u.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)t.remove(_[m])}u.removeEventListener("dispose",o),delete i[u.id];const f=r.get(u);f&&(t.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return i[u.id]===!0||(u.addEventListener("dispose",o),i[u.id]=!0,e.memory.geometries++),u}function c(d){const u=d.attributes;for(const g in u)t.update(u[g],s.ARRAY_BUFFER);const f=d.morphAttributes;for(const g in f){const _=f[g];for(let m=0,p=_.length;m<p;m++)t.update(_[m],s.ARRAY_BUFFER)}}function l(d){const u=[],f=d.index,g=d.attributes.position;let _=0;if(f!==null){const x=f.array;_=f.version;for(let S=0,v=x.length;S<v;S+=3){const L=x[S+0],E=x[S+1],C=x[S+2];u.push(L,E,E,C,C,L)}}else if(g!==void 0){const x=g.array;_=g.version;for(let S=0,v=x.length/3-1;S<v;S+=3){const L=S+0,E=S+1,C=S+2;u.push(L,E,E,C,C,L)}}else return;const m=new(fl(u)?yl:xl)(u,1);m.version=_;const p=r.get(d);p&&t.remove(p),r.set(d,m)}function h(d){const u=r.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&l(d)}else l(d);return r.get(d)}return{get:a,update:c,getWireframeAttribute:h}}function jp(s,t,e){let n;function i(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function c(u,f){s.drawElements(n,f,r,u*o),e.update(f,n,1)}function l(u,f,g){g!==0&&(s.drawElementsInstanced(n,f,r,u*o,g),e.update(f,n,g))}function h(u,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function d(u,f,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<u.length;p++)l(u[p]/o,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,u,0,_,0,g);let p=0;for(let x=0;x<g;x++)p+=f[x]*_[x];e.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Zp(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Kp(s,t,e){const n=new WeakMap,i=new ae;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(a);if(u===void 0||u.count!==d){let y=function(){w.dispose(),n.delete(a),a.removeEventListener("dispose",y)};var f=y;u!==void 0&&u.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],x=a.morphAttributes.normal||[],S=a.morphAttributes.color||[];let v=0;g===!0&&(v=1),_===!0&&(v=2),m===!0&&(v=3);let L=a.attributes.position.count*v,E=1;L>t.maxTextureSize&&(E=Math.ceil(L/t.maxTextureSize),L=t.maxTextureSize);const C=new Float32Array(L*E*4*d),w=new ml(C,L,E,d);w.type=dn,w.needsUpdate=!0;const M=v*4;for(let R=0;R<d;R++){const k=p[R],F=x[R],H=S[R],O=L*E*4*R;for(let U=0;U<k.count;U++){const Y=U*M;g===!0&&(i.fromBufferAttribute(k,U),C[O+Y+0]=i.x,C[O+Y+1]=i.y,C[O+Y+2]=i.z,C[O+Y+3]=0),_===!0&&(i.fromBufferAttribute(F,U),C[O+Y+4]=i.x,C[O+Y+5]=i.y,C[O+Y+6]=i.z,C[O+Y+7]=0),m===!0&&(i.fromBufferAttribute(H,U),C[O+Y+8]=i.x,C[O+Y+9]=i.y,C[O+Y+10]=i.z,C[O+Y+11]=H.itemSize===4?i.w:1)}}u={count:d,texture:w,size:new Ft(L,E)},n.set(a,u),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const _=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(s,"morphTargetBaseInfluence",_),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function Jp(s,t,e,n){let i=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,d=t.get(c,h);if(i.get(d)!==l&&(t.update(d),i.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const u=c.skeleton;i.get(u)!==l&&(u.update(),i.set(u,l))}return d}function o(){i=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}class wl extends Ee{constructor(t,e,n,i,r,o,a,c,l,h=wi){if(h!==wi&&h!==Ui)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===wi&&(n=Qn),n===void 0&&h===Ui&&(n=Di),super(null,i,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:We,this.minFilter=c!==void 0?c:We,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Cl=new Ee,hc=new wl(1,1),Al=new ml,Rl=new Fd,Pl=new Tl,dc=[],uc=[],fc=new Float32Array(16),pc=new Float32Array(9),mc=new Float32Array(4);function Vi(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=dc[i];if(r===void 0&&(r=new Float32Array(i),dc[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function ye(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Se(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function cr(s,t){let e=uc[t];e===void 0&&(e=new Int32Array(t),uc[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Qp(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function tm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;s.uniform2fv(this.addr,t),Se(e,t)}}function em(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ye(e,t))return;s.uniform3fv(this.addr,t),Se(e,t)}}function nm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;s.uniform4fv(this.addr,t),Se(e,t)}}function im(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(ye(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Se(e,t)}else{if(ye(e,n))return;mc.set(n),s.uniformMatrix2fv(this.addr,!1,mc),Se(e,n)}}function sm(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(ye(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Se(e,t)}else{if(ye(e,n))return;pc.set(n),s.uniformMatrix3fv(this.addr,!1,pc),Se(e,n)}}function rm(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(ye(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Se(e,t)}else{if(ye(e,n))return;fc.set(n),s.uniformMatrix4fv(this.addr,!1,fc),Se(e,n)}}function om(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function am(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;s.uniform2iv(this.addr,t),Se(e,t)}}function cm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ye(e,t))return;s.uniform3iv(this.addr,t),Se(e,t)}}function lm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;s.uniform4iv(this.addr,t),Se(e,t)}}function hm(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function dm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;s.uniform2uiv(this.addr,t),Se(e,t)}}function um(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ye(e,t))return;s.uniform3uiv(this.addr,t),Se(e,t)}}function fm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;s.uniform4uiv(this.addr,t),Se(e,t)}}function pm(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(hc.compareFunction=ul,r=hc):r=Cl,e.setTexture2D(t||r,i)}function mm(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Rl,i)}function gm(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Pl,i)}function _m(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Al,i)}function vm(s){switch(s){case 5126:return Qp;case 35664:return tm;case 35665:return em;case 35666:return nm;case 35674:return im;case 35675:return sm;case 35676:return rm;case 5124:case 35670:return om;case 35667:case 35671:return am;case 35668:case 35672:return cm;case 35669:case 35673:return lm;case 5125:return hm;case 36294:return dm;case 36295:return um;case 36296:return fm;case 35678:case 36198:case 36298:case 36306:case 35682:return pm;case 35679:case 36299:case 36307:return mm;case 35680:case 36300:case 36308:case 36293:return gm;case 36289:case 36303:case 36311:case 36292:return _m}}function xm(s,t){s.uniform1fv(this.addr,t)}function ym(s,t){const e=Vi(t,this.size,2);s.uniform2fv(this.addr,e)}function Sm(s,t){const e=Vi(t,this.size,3);s.uniform3fv(this.addr,e)}function Mm(s,t){const e=Vi(t,this.size,4);s.uniform4fv(this.addr,e)}function Tm(s,t){const e=Vi(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function bm(s,t){const e=Vi(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function Em(s,t){const e=Vi(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function wm(s,t){s.uniform1iv(this.addr,t)}function Cm(s,t){s.uniform2iv(this.addr,t)}function Am(s,t){s.uniform3iv(this.addr,t)}function Rm(s,t){s.uniform4iv(this.addr,t)}function Pm(s,t){s.uniform1uiv(this.addr,t)}function Im(s,t){s.uniform2uiv(this.addr,t)}function Lm(s,t){s.uniform3uiv(this.addr,t)}function Dm(s,t){s.uniform4uiv(this.addr,t)}function Um(s,t,e){const n=this.cache,i=t.length,r=cr(e,i);ye(n,r)||(s.uniform1iv(this.addr,r),Se(n,r));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||Cl,r[o])}function Nm(s,t,e){const n=this.cache,i=t.length,r=cr(e,i);ye(n,r)||(s.uniform1iv(this.addr,r),Se(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||Rl,r[o])}function km(s,t,e){const n=this.cache,i=t.length,r=cr(e,i);ye(n,r)||(s.uniform1iv(this.addr,r),Se(n,r));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||Pl,r[o])}function Fm(s,t,e){const n=this.cache,i=t.length,r=cr(e,i);ye(n,r)||(s.uniform1iv(this.addr,r),Se(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||Al,r[o])}function Om(s){switch(s){case 5126:return xm;case 35664:return ym;case 35665:return Sm;case 35666:return Mm;case 35674:return Tm;case 35675:return bm;case 35676:return Em;case 5124:case 35670:return wm;case 35667:case 35671:return Cm;case 35668:case 35672:return Am;case 35669:case 35673:return Rm;case 5125:return Pm;case 36294:return Im;case 36295:return Lm;case 36296:return Dm;case 35678:case 36198:case 36298:case 36306:case 35682:return Um;case 35679:case 36299:case 36307:return Nm;case 35680:case 36300:case 36308:case 36293:return km;case 36289:case 36303:case 36311:case 36292:return Fm}}class Bm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=vm(e.type)}}class zm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Om(e.type)}}class Gm{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(t,e[a.id],n)}}}const Br=/(\w+)(\])?(\[|\.)?/g;function gc(s,t){s.seq.push(t),s.map[t.id]=t}function Vm(s,t,e){const n=s.name,i=n.length;for(Br.lastIndex=0;;){const r=Br.exec(n),o=Br.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){gc(e,l===void 0?new Bm(a,s,t):new zm(a,s,t));break}else{let d=e.map[a];d===void 0&&(d=new Gm(a),gc(e,d)),e=d}}}class Ys{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),o=t.getUniformLocation(e,r.name);Vm(r,o,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function _c(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const Hm=37297;let Wm=0;function Xm(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const vc=new Yt;function $m(s){Jt._getMatrix(vc,Jt.workingColorSpace,s);const t=`mat3( ${vc.elements.map(e=>e.toFixed(4))} )`;switch(Jt.getTransfer(s)){case ar:return[t,"LinearTransferOETF"];case oe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function xc(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+Xm(s.getShaderSource(t),o)}else return i}function qm(s,t){const e=$m(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Ym(s,t){let e;switch(t){case Zh:e="Linear";break;case Kh:e="Reinhard";break;case Jh:e="Cineon";break;case tl:e="ACESFilmic";break;case td:e="AgX";break;case ed:e="Neutral";break;case Qh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Fs=new P;function jm(){Jt.getLuminanceCoefficients(Fs);const s=Fs.x.toFixed(4),t=Fs.y.toFixed(4),e=Fs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Zm(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ns).join(`
`)}function Km(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Jm(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function ns(s){return s!==""}function yc(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Sc(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Qm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Fo(s){return s.replace(Qm,e0)}const t0=new Map;function e0(s,t){let e=jt[t];if(e===void 0){const n=t0.get(t);if(n!==void 0)e=jt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Fo(e)}const n0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Mc(s){return s.replace(n0,i0)}function i0(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Tc(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function s0(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Kc?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===Jc?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===xn&&(t="SHADOWMAP_TYPE_VSM"),t}function r0(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Ii:case Li:t="ENVMAP_TYPE_CUBE";break;case or:t="ENVMAP_TYPE_CUBE_UV";break}return t}function o0(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Li:t="ENVMAP_MODE_REFRACTION";break}return t}function a0(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Qc:t="ENVMAP_BLENDING_MULTIPLY";break;case Yh:t="ENVMAP_BLENDING_MIX";break;case jh:t="ENVMAP_BLENDING_ADD";break}return t}function c0(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function l0(s,t,e,n){const i=s.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=s0(e),l=r0(e),h=o0(e),d=a0(e),u=c0(e),f=Zm(e),g=Km(r),_=i.createProgram();let m,p,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ns).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ns).join(`
`),p.length>0&&(p+=`
`)):(m=[Tc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ns).join(`
`),p=[Tc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==kn?"#define TONE_MAPPING":"",e.toneMapping!==kn?jt.tonemapping_pars_fragment:"",e.toneMapping!==kn?Ym("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",jt.colorspace_pars_fragment,qm("linearToOutputTexel",e.outputColorSpace),jm(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ns).join(`
`)),o=Fo(o),o=yc(o,e),o=Sc(o,e),a=Fo(a),a=yc(a,e),a=Sc(a,e),o=Mc(o),a=Mc(a),e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Na?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Na?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=x+m+o,v=x+p+a,L=_c(i,i.VERTEX_SHADER,S),E=_c(i,i.FRAGMENT_SHADER,v);i.attachShader(_,L),i.attachShader(_,E),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function C(R){if(s.debug.checkShaderErrors){const k=i.getProgramInfoLog(_).trim(),F=i.getShaderInfoLog(L).trim(),H=i.getShaderInfoLog(E).trim();let O=!0,U=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(O=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,L,E);else{const Y=xc(i,L,"vertex"),W=xc(i,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+k+`
`+Y+`
`+W)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(F===""||H==="")&&(U=!1);U&&(R.diagnostics={runnable:O,programLog:k,vertexShader:{log:F,prefix:m},fragmentShader:{log:H,prefix:p}})}i.deleteShader(L),i.deleteShader(E),w=new Ys(i,_),M=Jm(i,_)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let M;this.getAttributes=function(){return M===void 0&&C(this),M};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=i.getProgramParameter(_,Hm)),y},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Wm++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=L,this.fragmentShader=E,this}let h0=0;class d0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new u0(t),e.set(t,n)),n}}class u0{constructor(t){this.id=h0++,this.code=t,this.usedTimes=0}}function f0(s,t,e,n,i,r,o){const a=new _l,c=new d0,l=new Set,h=[],d=i.logarithmicDepthBuffer,u=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return l.add(M),M===0?"uv":`uv${M}`}function m(M,y,R,k,F){const H=k.fog,O=F.geometry,U=M.isMeshStandardMaterial?k.environment:null,Y=(M.isMeshStandardMaterial?e:t).get(M.envMap||U),W=Y&&Y.mapping===or?Y.image.height:null,ot=g[M.type];M.precision!==null&&(f=i.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const N=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,D=N!==void 0?N.length:0;let lt=0;O.morphAttributes.position!==void 0&&(lt=1),O.morphAttributes.normal!==void 0&&(lt=2),O.morphAttributes.color!==void 0&&(lt=3);let ut,X,K,at;if(ot){const re=cn[ot];ut=re.vertexShader,X=re.fragmentShader}else ut=M.vertexShader,X=M.fragmentShader,c.update(M),K=c.getVertexShaderID(M),at=c.getFragmentShaderID(M);const Q=s.getRenderTarget(),dt=s.state.buffers.depth.getReversed(),vt=F.isInstancedMesh===!0,yt=F.isBatchedMesh===!0,It=!!M.map,Rt=!!M.matcap,zt=!!Y,B=!!M.aoMap,se=!!M.lightMap,Ot=!!M.bumpMap,Bt=!!M.normalMap,wt=!!M.displacementMap,Kt=!!M.emissiveMap,Ct=!!M.metalnessMap,I=!!M.roughnessMap,T=M.anisotropy>0,q=M.clearcoat>0,st=M.dispersion>0,ct=M.iridescence>0,it=M.sheen>0,Pt=M.transmission>0,mt=T&&!!M.anisotropyMap,nt=q&&!!M.clearcoatMap,tt=q&&!!M.clearcoatNormalMap,et=q&&!!M.clearcoatRoughnessMap,ht=ct&&!!M.iridescenceMap,pt=ct&&!!M.iridescenceThicknessMap,bt=it&&!!M.sheenColorMap,gt=it&&!!M.sheenRoughnessMap,Xt=!!M.specularMap,Vt=!!M.specularColorMap,ee=!!M.specularIntensityMap,z=Pt&&!!M.transmissionMap,xt=Pt&&!!M.thicknessMap,J=!!M.gradientMap,rt=!!M.alphaMap,Tt=M.alphaTest>0,St=!!M.alphaHash,$t=!!M.extensions;let me=kn;M.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(me=s.toneMapping);const we={shaderID:ot,shaderType:M.type,shaderName:M.name,vertexShader:ut,fragmentShader:X,defines:M.defines,customVertexShaderID:K,customFragmentShaderID:at,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:yt,batchingColor:yt&&F._colorsTexture!==null,instancing:vt,instancingColor:vt&&F.instanceColor!==null,instancingMorph:vt&&F.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:Q===null?s.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:Fi,alphaToCoverage:!!M.alphaToCoverage,map:It,matcap:Rt,envMap:zt,envMapMode:zt&&Y.mapping,envMapCubeUVHeight:W,aoMap:B,lightMap:se,bumpMap:Ot,normalMap:Bt,displacementMap:u&&wt,emissiveMap:Kt,normalMapObjectSpace:Bt&&M.normalMapType===rd,normalMapTangentSpace:Bt&&M.normalMapType===dl,metalnessMap:Ct,roughnessMap:I,anisotropy:T,anisotropyMap:mt,clearcoat:q,clearcoatMap:nt,clearcoatNormalMap:tt,clearcoatRoughnessMap:et,dispersion:st,iridescence:ct,iridescenceMap:ht,iridescenceThicknessMap:pt,sheen:it,sheenColorMap:bt,sheenRoughnessMap:gt,specularMap:Xt,specularColorMap:Vt,specularIntensityMap:ee,transmission:Pt,transmissionMap:z,thicknessMap:xt,gradientMap:J,opaque:M.transparent===!1&&M.blending===Nn&&M.alphaToCoverage===!1,alphaMap:rt,alphaTest:Tt,alphaHash:St,combine:M.combine,mapUv:It&&_(M.map.channel),aoMapUv:B&&_(M.aoMap.channel),lightMapUv:se&&_(M.lightMap.channel),bumpMapUv:Ot&&_(M.bumpMap.channel),normalMapUv:Bt&&_(M.normalMap.channel),displacementMapUv:wt&&_(M.displacementMap.channel),emissiveMapUv:Kt&&_(M.emissiveMap.channel),metalnessMapUv:Ct&&_(M.metalnessMap.channel),roughnessMapUv:I&&_(M.roughnessMap.channel),anisotropyMapUv:mt&&_(M.anisotropyMap.channel),clearcoatMapUv:nt&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:tt&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:et&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:ht&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:pt&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:bt&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:gt&&_(M.sheenRoughnessMap.channel),specularMapUv:Xt&&_(M.specularMap.channel),specularColorMapUv:Vt&&_(M.specularColorMap.channel),specularIntensityMapUv:ee&&_(M.specularIntensityMap.channel),transmissionMapUv:z&&_(M.transmissionMap.channel),thicknessMapUv:xt&&_(M.thicknessMap.channel),alphaMapUv:rt&&_(M.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(Bt||T),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!O.attributes.uv&&(It||rt),fog:!!H,useFog:M.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:dt,skinning:F.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:D,morphTextureStride:lt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:s.shadowMap.enabled&&R.length>0,shadowMapType:s.shadowMap.type,toneMapping:me,decodeVideoTexture:It&&M.map.isVideoTexture===!0&&Jt.getTransfer(M.map.colorSpace)===oe,decodeVideoTextureEmissive:Kt&&M.emissiveMap.isVideoTexture===!0&&Jt.getTransfer(M.emissiveMap.colorSpace)===oe,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Ue,flipSided:M.side===Be,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:$t&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:($t&&M.extensions.multiDraw===!0||yt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return we.vertexUv1s=l.has(1),we.vertexUv2s=l.has(2),we.vertexUv3s=l.has(3),l.clear(),we}function p(M){const y=[];if(M.shaderID?y.push(M.shaderID):(y.push(M.customVertexShaderID),y.push(M.customFragmentShaderID)),M.defines!==void 0)for(const R in M.defines)y.push(R),y.push(M.defines[R]);return M.isRawShaderMaterial===!1&&(x(y,M),S(y,M),y.push(s.outputColorSpace)),y.push(M.customProgramCacheKey),y.join()}function x(M,y){M.push(y.precision),M.push(y.outputColorSpace),M.push(y.envMapMode),M.push(y.envMapCubeUVHeight),M.push(y.mapUv),M.push(y.alphaMapUv),M.push(y.lightMapUv),M.push(y.aoMapUv),M.push(y.bumpMapUv),M.push(y.normalMapUv),M.push(y.displacementMapUv),M.push(y.emissiveMapUv),M.push(y.metalnessMapUv),M.push(y.roughnessMapUv),M.push(y.anisotropyMapUv),M.push(y.clearcoatMapUv),M.push(y.clearcoatNormalMapUv),M.push(y.clearcoatRoughnessMapUv),M.push(y.iridescenceMapUv),M.push(y.iridescenceThicknessMapUv),M.push(y.sheenColorMapUv),M.push(y.sheenRoughnessMapUv),M.push(y.specularMapUv),M.push(y.specularColorMapUv),M.push(y.specularIntensityMapUv),M.push(y.transmissionMapUv),M.push(y.thicknessMapUv),M.push(y.combine),M.push(y.fogExp2),M.push(y.sizeAttenuation),M.push(y.morphTargetsCount),M.push(y.morphAttributeCount),M.push(y.numDirLights),M.push(y.numPointLights),M.push(y.numSpotLights),M.push(y.numSpotLightMaps),M.push(y.numHemiLights),M.push(y.numRectAreaLights),M.push(y.numDirLightShadows),M.push(y.numPointLightShadows),M.push(y.numSpotLightShadows),M.push(y.numSpotLightShadowsWithMaps),M.push(y.numLightProbes),M.push(y.shadowMapType),M.push(y.toneMapping),M.push(y.numClippingPlanes),M.push(y.numClipIntersection),M.push(y.depthPacking)}function S(M,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),M.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),M.push(a.mask)}function v(M){const y=g[M.type];let R;if(y){const k=cn[y];R=jd.clone(k.uniforms)}else R=M.uniforms;return R}function L(M,y){let R;for(let k=0,F=h.length;k<F;k++){const H=h[k];if(H.cacheKey===y){R=H,++R.usedTimes;break}}return R===void 0&&(R=new l0(s,y,M,r),h.push(R)),R}function E(M){if(--M.usedTimes===0){const y=h.indexOf(M);h[y]=h[h.length-1],h.pop(),M.destroy()}}function C(M){c.remove(M)}function w(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:L,releaseProgram:E,releaseShaderCache:C,programs:h,dispose:w}}function p0(){let s=new WeakMap;function t(o){return s.has(o)}function e(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,c){s.get(o)[a]=c}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function m0(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function bc(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Ec(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function o(d,u,f,g,_,m){let p=s[t];return p===void 0?(p={id:d.id,object:d,geometry:u,material:f,groupOrder:g,renderOrder:d.renderOrder,z:_,group:m},s[t]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=_,p.group=m),t++,p}function a(d,u,f,g,_,m){const p=o(d,u,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):e.push(p)}function c(d,u,f,g,_,m){const p=o(d,u,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):e.unshift(p)}function l(d,u){e.length>1&&e.sort(d||m0),n.length>1&&n.sort(u||bc),i.length>1&&i.sort(u||bc)}function h(){for(let d=t,u=s.length;d<u;d++){const f=s[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:a,unshift:c,finish:h,sort:l}}function g0(){let s=new WeakMap;function t(n,i){const r=s.get(n);let o;return r===void 0?(o=new Ec,s.set(n,[o])):i>=r.length?(o=new Ec,r.push(o)):o=r[i],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function _0(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new Wt};break;case"SpotLight":e={position:new P,direction:new P,color:new Wt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new Wt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new Wt,groundColor:new Wt};break;case"RectAreaLight":e={color:new Wt,position:new P,halfWidth:new P,halfHeight:new P};break}return s[t.id]=e,e}}}function v0(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let x0=0;function y0(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function S0(s){const t=new _0,e=v0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new P);const i=new P,r=new te,o=new te;function a(l){let h=0,d=0,u=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,x=0,S=0,v=0,L=0,E=0,C=0;l.sort(y0);for(let M=0,y=l.length;M<y;M++){const R=l[M],k=R.color,F=R.intensity,H=R.distance,O=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)h+=k.r*F,d+=k.g*F,u+=k.b*F;else if(R.isLightProbe){for(let U=0;U<9;U++)n.probe[U].addScaledVector(R.sh.coefficients[U],F);C++}else if(R.isDirectionalLight){const U=t.get(R);if(U.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const Y=R.shadow,W=e.get(R);W.shadowIntensity=Y.intensity,W.shadowBias=Y.bias,W.shadowNormalBias=Y.normalBias,W.shadowRadius=Y.radius,W.shadowMapSize=Y.mapSize,n.directionalShadow[f]=W,n.directionalShadowMap[f]=O,n.directionalShadowMatrix[f]=R.shadow.matrix,x++}n.directional[f]=U,f++}else if(R.isSpotLight){const U=t.get(R);U.position.setFromMatrixPosition(R.matrixWorld),U.color.copy(k).multiplyScalar(F),U.distance=H,U.coneCos=Math.cos(R.angle),U.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),U.decay=R.decay,n.spot[_]=U;const Y=R.shadow;if(R.map&&(n.spotLightMap[L]=R.map,L++,Y.updateMatrices(R),R.castShadow&&E++),n.spotLightMatrix[_]=Y.matrix,R.castShadow){const W=e.get(R);W.shadowIntensity=Y.intensity,W.shadowBias=Y.bias,W.shadowNormalBias=Y.normalBias,W.shadowRadius=Y.radius,W.shadowMapSize=Y.mapSize,n.spotShadow[_]=W,n.spotShadowMap[_]=O,v++}_++}else if(R.isRectAreaLight){const U=t.get(R);U.color.copy(k).multiplyScalar(F),U.halfWidth.set(R.width*.5,0,0),U.halfHeight.set(0,R.height*.5,0),n.rectArea[m]=U,m++}else if(R.isPointLight){const U=t.get(R);if(U.color.copy(R.color).multiplyScalar(R.intensity),U.distance=R.distance,U.decay=R.decay,R.castShadow){const Y=R.shadow,W=e.get(R);W.shadowIntensity=Y.intensity,W.shadowBias=Y.bias,W.shadowNormalBias=Y.normalBias,W.shadowRadius=Y.radius,W.shadowMapSize=Y.mapSize,W.shadowCameraNear=Y.camera.near,W.shadowCameraFar=Y.camera.far,n.pointShadow[g]=W,n.pointShadowMap[g]=O,n.pointShadowMatrix[g]=R.shadow.matrix,S++}n.point[g]=U,g++}else if(R.isHemisphereLight){const U=t.get(R);U.skyColor.copy(R.color).multiplyScalar(F),U.groundColor.copy(R.groundColor).multiplyScalar(F),n.hemi[p]=U,p++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=_t.LTC_FLOAT_1,n.rectAreaLTC2=_t.LTC_FLOAT_2):(n.rectAreaLTC1=_t.LTC_HALF_1,n.rectAreaLTC2=_t.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const w=n.hash;(w.directionalLength!==f||w.pointLength!==g||w.spotLength!==_||w.rectAreaLength!==m||w.hemiLength!==p||w.numDirectionalShadows!==x||w.numPointShadows!==S||w.numSpotShadows!==v||w.numSpotMaps!==L||w.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=v+L-E,n.spotLightMap.length=L,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=C,w.directionalLength=f,w.pointLength=g,w.spotLength=_,w.rectAreaLength=m,w.hemiLength=p,w.numDirectionalShadows=x,w.numPointShadows=S,w.numSpotShadows=v,w.numSpotMaps=L,w.numLightProbes=C,n.version=x0++)}function c(l,h){let d=0,u=0,f=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,x=l.length;p<x;p++){const S=l[p];if(S.isDirectionalLight){const v=n.directional[d];v.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),d++}else if(S.isSpotLight){const v=n.spot[f];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),f++}else if(S.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),o.identity(),r.copy(S.matrixWorld),r.premultiply(m),o.extractRotation(r),v.halfWidth.set(S.width*.5,0,0),v.halfHeight.set(0,S.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(S.isPointLight){const v=n.point[u];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),u++}else if(S.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(S.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:n}}function wc(s){const t=new S0(s),e=[],n=[];function i(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function M0(s){let t=new WeakMap;function e(i,r=0){const o=t.get(i);let a;return o===void 0?(a=new wc(s),t.set(i,[a])):r>=o.length?(a=new wc(s),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class T0 extends Gi{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=id,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class b0 extends Gi{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const E0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,w0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function C0(s,t,e){let n=new ca;const i=new Ft,r=new Ft,o=new ae,a=new T0({depthPacking:sd}),c=new b0,l={},h=e.maxTextureSize,d={[On]:Be,[Be]:On,[Ue]:Ue},u=new Bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ft},radius:{value:4}},vertexShader:E0,fragmentShader:w0}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new ge;g.setAttribute("position",new je(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new A(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Kc;let p=this.type;this.render=function(E,C,w){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;const M=s.getRenderTarget(),y=s.getActiveCubeFace(),R=s.getActiveMipmapLevel(),k=s.state;k.setBlending(Un),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const F=p!==xn&&this.type===xn,H=p===xn&&this.type!==xn;for(let O=0,U=E.length;O<U;O++){const Y=E[O],W=Y.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;i.copy(W.mapSize);const ot=W.getFrameExtents();if(i.multiply(ot),r.copy(W.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/ot.x),i.x=r.x*ot.x,W.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/ot.y),i.y=r.y*ot.y,W.mapSize.y=r.y)),W.map===null||F===!0||H===!0){const D=this.type!==xn?{minFilter:We,magFilter:We}:{};W.map!==null&&W.map.dispose(),W.map=new ti(i.x,i.y,D),W.map.texture.name=Y.name+".shadowMap",W.camera.updateProjectionMatrix()}s.setRenderTarget(W.map),s.clear();const N=W.getViewportCount();for(let D=0;D<N;D++){const lt=W.getViewport(D);o.set(r.x*lt.x,r.y*lt.y,r.x*lt.z,r.y*lt.w),k.viewport(o),W.updateMatrices(Y,D),n=W.getFrustum(),v(C,w,W.camera,Y,this.type)}W.isPointLightShadow!==!0&&this.type===xn&&x(W,w),W.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(M,y,R)};function x(E,C){const w=t.update(_);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new ti(i.x,i.y)),u.uniforms.shadow_pass.value=E.map.texture,u.uniforms.resolution.value=E.mapSize,u.uniforms.radius.value=E.radius,s.setRenderTarget(E.mapPass),s.clear(),s.renderBufferDirect(C,null,w,u,_,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,s.setRenderTarget(E.map),s.clear(),s.renderBufferDirect(C,null,w,f,_,null)}function S(E,C,w,M){let y=null;const R=w.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(R!==void 0)y=R;else if(y=w.isPointLight===!0?c:a,s.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const k=y.uuid,F=C.uuid;let H=l[k];H===void 0&&(H={},l[k]=H);let O=H[F];O===void 0&&(O=y.clone(),H[F]=O,C.addEventListener("dispose",L)),y=O}if(y.visible=C.visible,y.wireframe=C.wireframe,M===xn?y.side=C.shadowSide!==null?C.shadowSide:C.side:y.side=C.shadowSide!==null?C.shadowSide:d[C.side],y.alphaMap=C.alphaMap,y.alphaTest=C.alphaTest,y.map=C.map,y.clipShadows=C.clipShadows,y.clippingPlanes=C.clippingPlanes,y.clipIntersection=C.clipIntersection,y.displacementMap=C.displacementMap,y.displacementScale=C.displacementScale,y.displacementBias=C.displacementBias,y.wireframeLinewidth=C.wireframeLinewidth,y.linewidth=C.linewidth,w.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const k=s.properties.get(y);k.light=w}return y}function v(E,C,w,M,y){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&y===xn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,E.matrixWorld);const F=t.update(E),H=E.material;if(Array.isArray(H)){const O=F.groups;for(let U=0,Y=O.length;U<Y;U++){const W=O[U],ot=H[W.materialIndex];if(ot&&ot.visible){const N=S(E,ot,M,y);E.onBeforeShadow(s,E,C,w,F,N,W),s.renderBufferDirect(w,null,F,N,E,W),E.onAfterShadow(s,E,C,w,F,N,W)}}}else if(H.visible){const O=S(E,H,M,y);E.onBeforeShadow(s,E,C,w,F,O,null),s.renderBufferDirect(w,null,F,O,E,null),E.onAfterShadow(s,E,C,w,F,O,null)}}const k=E.children;for(let F=0,H=k.length;F<H;F++)v(k[F],C,w,M,y)}function L(E){E.target.removeEventListener("dispose",L);for(const w in l){const M=l[w],y=E.target.uuid;y in M&&(M[y].dispose(),delete M[y])}}}const A0={[to]:eo,[no]:ro,[io]:oo,[Pi]:so,[eo]:to,[ro]:no,[oo]:io,[so]:Pi};function R0(s,t){function e(){let z=!1;const xt=new ae;let J=null;const rt=new ae(0,0,0,0);return{setMask:function(Tt){J!==Tt&&!z&&(s.colorMask(Tt,Tt,Tt,Tt),J=Tt)},setLocked:function(Tt){z=Tt},setClear:function(Tt,St,$t,me,we){we===!0&&(Tt*=me,St*=me,$t*=me),xt.set(Tt,St,$t,me),rt.equals(xt)===!1&&(s.clearColor(Tt,St,$t,me),rt.copy(xt))},reset:function(){z=!1,J=null,rt.set(-1,0,0,0)}}}function n(){let z=!1,xt=!1,J=null,rt=null,Tt=null;return{setReversed:function(St){if(xt!==St){const $t=t.get("EXT_clip_control");xt?$t.clipControlEXT($t.LOWER_LEFT_EXT,$t.ZERO_TO_ONE_EXT):$t.clipControlEXT($t.LOWER_LEFT_EXT,$t.NEGATIVE_ONE_TO_ONE_EXT);const me=Tt;Tt=null,this.setClear(me)}xt=St},getReversed:function(){return xt},setTest:function(St){St?Q(s.DEPTH_TEST):dt(s.DEPTH_TEST)},setMask:function(St){J!==St&&!z&&(s.depthMask(St),J=St)},setFunc:function(St){if(xt&&(St=A0[St]),rt!==St){switch(St){case to:s.depthFunc(s.NEVER);break;case eo:s.depthFunc(s.ALWAYS);break;case no:s.depthFunc(s.LESS);break;case Pi:s.depthFunc(s.LEQUAL);break;case io:s.depthFunc(s.EQUAL);break;case so:s.depthFunc(s.GEQUAL);break;case ro:s.depthFunc(s.GREATER);break;case oo:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}rt=St}},setLocked:function(St){z=St},setClear:function(St){Tt!==St&&(xt&&(St=1-St),s.clearDepth(St),Tt=St)},reset:function(){z=!1,J=null,rt=null,Tt=null,xt=!1}}}function i(){let z=!1,xt=null,J=null,rt=null,Tt=null,St=null,$t=null,me=null,we=null;return{setTest:function(re){z||(re?Q(s.STENCIL_TEST):dt(s.STENCIL_TEST))},setMask:function(re){xt!==re&&!z&&(s.stencilMask(re),xt=re)},setFunc:function(re,Ze,un){(J!==re||rt!==Ze||Tt!==un)&&(s.stencilFunc(re,Ze,un),J=re,rt=Ze,Tt=un)},setOp:function(re,Ze,un){(St!==re||$t!==Ze||me!==un)&&(s.stencilOp(re,Ze,un),St=re,$t=Ze,me=un)},setLocked:function(re){z=re},setClear:function(re){we!==re&&(s.clearStencil(re),we=re)},reset:function(){z=!1,xt=null,J=null,rt=null,Tt=null,St=null,$t=null,me=null,we=null}}}const r=new e,o=new n,a=new i,c=new WeakMap,l=new WeakMap;let h={},d={},u=new WeakMap,f=[],g=null,_=!1,m=null,p=null,x=null,S=null,v=null,L=null,E=null,C=new Wt(0,0,0),w=0,M=!1,y=null,R=null,k=null,F=null,H=null;const O=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let U=!1,Y=0;const W=s.getParameter(s.VERSION);W.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(W)[1]),U=Y>=1):W.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),U=Y>=2);let ot=null,N={};const D=s.getParameter(s.SCISSOR_BOX),lt=s.getParameter(s.VIEWPORT),ut=new ae().fromArray(D),X=new ae().fromArray(lt);function K(z,xt,J,rt){const Tt=new Uint8Array(4),St=s.createTexture();s.bindTexture(z,St),s.texParameteri(z,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(z,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let $t=0;$t<J;$t++)z===s.TEXTURE_3D||z===s.TEXTURE_2D_ARRAY?s.texImage3D(xt,0,s.RGBA,1,1,rt,0,s.RGBA,s.UNSIGNED_BYTE,Tt):s.texImage2D(xt+$t,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Tt);return St}const at={};at[s.TEXTURE_2D]=K(s.TEXTURE_2D,s.TEXTURE_2D,1),at[s.TEXTURE_CUBE_MAP]=K(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),at[s.TEXTURE_2D_ARRAY]=K(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),at[s.TEXTURE_3D]=K(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Q(s.DEPTH_TEST),o.setFunc(Pi),Ot(!1),Bt(Pa),Q(s.CULL_FACE),B(Un);function Q(z){h[z]!==!0&&(s.enable(z),h[z]=!0)}function dt(z){h[z]!==!1&&(s.disable(z),h[z]=!1)}function vt(z,xt){return d[z]!==xt?(s.bindFramebuffer(z,xt),d[z]=xt,z===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=xt),z===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=xt),!0):!1}function yt(z,xt){let J=f,rt=!1;if(z){J=u.get(xt),J===void 0&&(J=[],u.set(xt,J));const Tt=z.textures;if(J.length!==Tt.length||J[0]!==s.COLOR_ATTACHMENT0){for(let St=0,$t=Tt.length;St<$t;St++)J[St]=s.COLOR_ATTACHMENT0+St;J.length=Tt.length,rt=!0}}else J[0]!==s.BACK&&(J[0]=s.BACK,rt=!0);rt&&s.drawBuffers(J)}function It(z){return g!==z?(s.useProgram(z),g=z,!0):!1}const Rt={[jn]:s.FUNC_ADD,[Ih]:s.FUNC_SUBTRACT,[Lh]:s.FUNC_REVERSE_SUBTRACT};Rt[Dh]=s.MIN,Rt[Uh]=s.MAX;const zt={[Nh]:s.ZERO,[kh]:s.ONE,[Fh]:s.SRC_COLOR,[Jr]:s.SRC_ALPHA,[Hh]:s.SRC_ALPHA_SATURATE,[Gh]:s.DST_COLOR,[Bh]:s.DST_ALPHA,[Oh]:s.ONE_MINUS_SRC_COLOR,[Qr]:s.ONE_MINUS_SRC_ALPHA,[Vh]:s.ONE_MINUS_DST_COLOR,[zh]:s.ONE_MINUS_DST_ALPHA,[Wh]:s.CONSTANT_COLOR,[Xh]:s.ONE_MINUS_CONSTANT_COLOR,[$h]:s.CONSTANT_ALPHA,[qh]:s.ONE_MINUS_CONSTANT_ALPHA};function B(z,xt,J,rt,Tt,St,$t,me,we,re){if(z===Un){_===!0&&(dt(s.BLEND),_=!1);return}if(_===!1&&(Q(s.BLEND),_=!0),z!==Ph){if(z!==m||re!==M){if((p!==jn||v!==jn)&&(s.blendEquation(s.FUNC_ADD),p=jn,v=jn),re)switch(z){case Nn:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ye:s.blendFunc(s.ONE,s.ONE);break;case Ia:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case La:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}else switch(z){case Nn:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ye:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Ia:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case La:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}x=null,S=null,L=null,E=null,C.set(0,0,0),w=0,m=z,M=re}return}Tt=Tt||xt,St=St||J,$t=$t||rt,(xt!==p||Tt!==v)&&(s.blendEquationSeparate(Rt[xt],Rt[Tt]),p=xt,v=Tt),(J!==x||rt!==S||St!==L||$t!==E)&&(s.blendFuncSeparate(zt[J],zt[rt],zt[St],zt[$t]),x=J,S=rt,L=St,E=$t),(me.equals(C)===!1||we!==w)&&(s.blendColor(me.r,me.g,me.b,we),C.copy(me),w=we),m=z,M=!1}function se(z,xt){z.side===Ue?dt(s.CULL_FACE):Q(s.CULL_FACE);let J=z.side===Be;xt&&(J=!J),Ot(J),z.blending===Nn&&z.transparent===!1?B(Un):B(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),o.setFunc(z.depthFunc),o.setTest(z.depthTest),o.setMask(z.depthWrite),r.setMask(z.colorWrite);const rt=z.stencilWrite;a.setTest(rt),rt&&(a.setMask(z.stencilWriteMask),a.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),a.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),Kt(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?Q(s.SAMPLE_ALPHA_TO_COVERAGE):dt(s.SAMPLE_ALPHA_TO_COVERAGE)}function Ot(z){y!==z&&(z?s.frontFace(s.CW):s.frontFace(s.CCW),y=z)}function Bt(z){z!==Ah?(Q(s.CULL_FACE),z!==R&&(z===Pa?s.cullFace(s.BACK):z===Rh?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):dt(s.CULL_FACE),R=z}function wt(z){z!==k&&(U&&s.lineWidth(z),k=z)}function Kt(z,xt,J){z?(Q(s.POLYGON_OFFSET_FILL),(F!==xt||H!==J)&&(s.polygonOffset(xt,J),F=xt,H=J)):dt(s.POLYGON_OFFSET_FILL)}function Ct(z){z?Q(s.SCISSOR_TEST):dt(s.SCISSOR_TEST)}function I(z){z===void 0&&(z=s.TEXTURE0+O-1),ot!==z&&(s.activeTexture(z),ot=z)}function T(z,xt,J){J===void 0&&(ot===null?J=s.TEXTURE0+O-1:J=ot);let rt=N[J];rt===void 0&&(rt={type:void 0,texture:void 0},N[J]=rt),(rt.type!==z||rt.texture!==xt)&&(ot!==J&&(s.activeTexture(J),ot=J),s.bindTexture(z,xt||at[z]),rt.type=z,rt.texture=xt)}function q(){const z=N[ot];z!==void 0&&z.type!==void 0&&(s.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function st(){try{s.compressedTexImage2D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ct(){try{s.compressedTexImage3D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function it(){try{s.texSubImage2D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Pt(){try{s.texSubImage3D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function mt(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function nt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function tt(){try{s.texStorage2D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function et(){try{s.texStorage3D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ht(){try{s.texImage2D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function pt(){try{s.texImage3D.apply(s,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function bt(z){ut.equals(z)===!1&&(s.scissor(z.x,z.y,z.z,z.w),ut.copy(z))}function gt(z){X.equals(z)===!1&&(s.viewport(z.x,z.y,z.z,z.w),X.copy(z))}function Xt(z,xt){let J=l.get(xt);J===void 0&&(J=new WeakMap,l.set(xt,J));let rt=J.get(z);rt===void 0&&(rt=s.getUniformBlockIndex(xt,z.name),J.set(z,rt))}function Vt(z,xt){const rt=l.get(xt).get(z);c.get(xt)!==rt&&(s.uniformBlockBinding(xt,rt,z.__bindingPointIndex),c.set(xt,rt))}function ee(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},ot=null,N={},d={},u=new WeakMap,f=[],g=null,_=!1,m=null,p=null,x=null,S=null,v=null,L=null,E=null,C=new Wt(0,0,0),w=0,M=!1,y=null,R=null,k=null,F=null,H=null,ut.set(0,0,s.canvas.width,s.canvas.height),X.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:Q,disable:dt,bindFramebuffer:vt,drawBuffers:yt,useProgram:It,setBlending:B,setMaterial:se,setFlipSided:Ot,setCullFace:Bt,setLineWidth:wt,setPolygonOffset:Kt,setScissorTest:Ct,activeTexture:I,bindTexture:T,unbindTexture:q,compressedTexImage2D:st,compressedTexImage3D:ct,texImage2D:ht,texImage3D:pt,updateUBOMapping:Xt,uniformBlockBinding:Vt,texStorage2D:tt,texStorage3D:et,texSubImage2D:it,texSubImage3D:Pt,compressedTexSubImage2D:mt,compressedTexSubImage3D:nt,scissor:bt,viewport:gt,reset:ee}}function Cc(s,t,e,n){const i=P0(n);switch(e){case rl:return s*t;case al:return s*t;case cl:return s*t*2;case ia:return s*t/i.components*i.byteLength;case sa:return s*t/i.components*i.byteLength;case ll:return s*t*2/i.components*i.byteLength;case ra:return s*t*2/i.components*i.byteLength;case ol:return s*t*3/i.components*i.byteLength;case sn:return s*t*4/i.components*i.byteLength;case oa:return s*t*4/i.components*i.byteLength;case Hs:case Ws:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Xs:case $s:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case uo:case po:return Math.max(s,16)*Math.max(t,8)/4;case ho:case fo:return Math.max(s,8)*Math.max(t,8)/2;case mo:case go:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case _o:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case vo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case xo:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case yo:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case So:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Mo:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case To:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case bo:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Eo:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case wo:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Co:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Ao:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Ro:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Po:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Io:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case qs:case Lo:case Do:return Math.ceil(s/4)*Math.ceil(t/4)*16;case hl:case Uo:return Math.ceil(s/4)*Math.ceil(t/4)*8;case No:case ko:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function P0(s){switch(s){case Mn:case nl:return{byteLength:1,components:1};case ds:case il:case ps:return{byteLength:2,components:1};case ea:case na:return{byteLength:2,components:4};case Qn:case ta:case dn:return{byteLength:4,components:1};case sl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function I0(s,t,e,n,i,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ft,h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(I,T){return f?new OffscreenCanvas(I,T):us("canvas")}function _(I,T,q){let st=1;const ct=Ct(I);if((ct.width>q||ct.height>q)&&(st=q/Math.max(ct.width,ct.height)),st<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const it=Math.floor(st*ct.width),Pt=Math.floor(st*ct.height);d===void 0&&(d=g(it,Pt));const mt=T?g(it,Pt):d;return mt.width=it,mt.height=Pt,mt.getContext("2d").drawImage(I,0,0,it,Pt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ct.width+"x"+ct.height+") to ("+it+"x"+Pt+")."),mt}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ct.width+"x"+ct.height+")."),I;return I}function m(I){return I.generateMipmaps}function p(I){s.generateMipmap(I)}function x(I){return I.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?s.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function S(I,T,q,st,ct=!1){if(I!==null){if(s[I]!==void 0)return s[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let it=T;if(T===s.RED&&(q===s.FLOAT&&(it=s.R32F),q===s.HALF_FLOAT&&(it=s.R16F),q===s.UNSIGNED_BYTE&&(it=s.R8)),T===s.RED_INTEGER&&(q===s.UNSIGNED_BYTE&&(it=s.R8UI),q===s.UNSIGNED_SHORT&&(it=s.R16UI),q===s.UNSIGNED_INT&&(it=s.R32UI),q===s.BYTE&&(it=s.R8I),q===s.SHORT&&(it=s.R16I),q===s.INT&&(it=s.R32I)),T===s.RG&&(q===s.FLOAT&&(it=s.RG32F),q===s.HALF_FLOAT&&(it=s.RG16F),q===s.UNSIGNED_BYTE&&(it=s.RG8)),T===s.RG_INTEGER&&(q===s.UNSIGNED_BYTE&&(it=s.RG8UI),q===s.UNSIGNED_SHORT&&(it=s.RG16UI),q===s.UNSIGNED_INT&&(it=s.RG32UI),q===s.BYTE&&(it=s.RG8I),q===s.SHORT&&(it=s.RG16I),q===s.INT&&(it=s.RG32I)),T===s.RGB_INTEGER&&(q===s.UNSIGNED_BYTE&&(it=s.RGB8UI),q===s.UNSIGNED_SHORT&&(it=s.RGB16UI),q===s.UNSIGNED_INT&&(it=s.RGB32UI),q===s.BYTE&&(it=s.RGB8I),q===s.SHORT&&(it=s.RGB16I),q===s.INT&&(it=s.RGB32I)),T===s.RGBA_INTEGER&&(q===s.UNSIGNED_BYTE&&(it=s.RGBA8UI),q===s.UNSIGNED_SHORT&&(it=s.RGBA16UI),q===s.UNSIGNED_INT&&(it=s.RGBA32UI),q===s.BYTE&&(it=s.RGBA8I),q===s.SHORT&&(it=s.RGBA16I),q===s.INT&&(it=s.RGBA32I)),T===s.RGB&&q===s.UNSIGNED_INT_5_9_9_9_REV&&(it=s.RGB9_E5),T===s.RGBA){const Pt=ct?ar:Jt.getTransfer(st);q===s.FLOAT&&(it=s.RGBA32F),q===s.HALF_FLOAT&&(it=s.RGBA16F),q===s.UNSIGNED_BYTE&&(it=Pt===oe?s.SRGB8_ALPHA8:s.RGBA8),q===s.UNSIGNED_SHORT_4_4_4_4&&(it=s.RGBA4),q===s.UNSIGNED_SHORT_5_5_5_1&&(it=s.RGB5_A1)}return(it===s.R16F||it===s.R32F||it===s.RG16F||it===s.RG32F||it===s.RGBA16F||it===s.RGBA32F)&&t.get("EXT_color_buffer_float"),it}function v(I,T){let q;return I?T===null||T===Qn||T===Di?q=s.DEPTH24_STENCIL8:T===dn?q=s.DEPTH32F_STENCIL8:T===ds&&(q=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===Qn||T===Di?q=s.DEPTH_COMPONENT24:T===dn?q=s.DEPTH_COMPONENT32F:T===ds&&(q=s.DEPTH_COMPONENT16),q}function L(I,T){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==We&&I.minFilter!==hn?Math.log2(Math.max(T.width,T.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?T.mipmaps.length:1}function E(I){const T=I.target;T.removeEventListener("dispose",E),w(T),T.isVideoTexture&&h.delete(T)}function C(I){const T=I.target;T.removeEventListener("dispose",C),y(T)}function w(I){const T=n.get(I);if(T.__webglInit===void 0)return;const q=I.source,st=u.get(q);if(st){const ct=st[T.__cacheKey];ct.usedTimes--,ct.usedTimes===0&&M(I),Object.keys(st).length===0&&u.delete(q)}n.remove(I)}function M(I){const T=n.get(I);s.deleteTexture(T.__webglTexture);const q=I.source,st=u.get(q);delete st[T.__cacheKey],o.memory.textures--}function y(I){const T=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let st=0;st<6;st++){if(Array.isArray(T.__webglFramebuffer[st]))for(let ct=0;ct<T.__webglFramebuffer[st].length;ct++)s.deleteFramebuffer(T.__webglFramebuffer[st][ct]);else s.deleteFramebuffer(T.__webglFramebuffer[st]);T.__webglDepthbuffer&&s.deleteRenderbuffer(T.__webglDepthbuffer[st])}else{if(Array.isArray(T.__webglFramebuffer))for(let st=0;st<T.__webglFramebuffer.length;st++)s.deleteFramebuffer(T.__webglFramebuffer[st]);else s.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&s.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&s.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let st=0;st<T.__webglColorRenderbuffer.length;st++)T.__webglColorRenderbuffer[st]&&s.deleteRenderbuffer(T.__webglColorRenderbuffer[st]);T.__webglDepthRenderbuffer&&s.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const q=I.textures;for(let st=0,ct=q.length;st<ct;st++){const it=n.get(q[st]);it.__webglTexture&&(s.deleteTexture(it.__webglTexture),o.memory.textures--),n.remove(q[st])}n.remove(I)}let R=0;function k(){R=0}function F(){const I=R;return I>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+i.maxTextures),R+=1,I}function H(I){const T=[];return T.push(I.wrapS),T.push(I.wrapT),T.push(I.wrapR||0),T.push(I.magFilter),T.push(I.minFilter),T.push(I.anisotropy),T.push(I.internalFormat),T.push(I.format),T.push(I.type),T.push(I.generateMipmaps),T.push(I.premultiplyAlpha),T.push(I.flipY),T.push(I.unpackAlignment),T.push(I.colorSpace),T.join()}function O(I,T){const q=n.get(I);if(I.isVideoTexture&&wt(I),I.isRenderTargetTexture===!1&&I.version>0&&q.__version!==I.version){const st=I.image;if(st===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(st.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(q,I,T);return}}e.bindTexture(s.TEXTURE_2D,q.__webglTexture,s.TEXTURE0+T)}function U(I,T){const q=n.get(I);if(I.version>0&&q.__version!==I.version){X(q,I,T);return}e.bindTexture(s.TEXTURE_2D_ARRAY,q.__webglTexture,s.TEXTURE0+T)}function Y(I,T){const q=n.get(I);if(I.version>0&&q.__version!==I.version){X(q,I,T);return}e.bindTexture(s.TEXTURE_3D,q.__webglTexture,s.TEXTURE0+T)}function W(I,T){const q=n.get(I);if(I.version>0&&q.__version!==I.version){K(q,I,T);return}e.bindTexture(s.TEXTURE_CUBE_MAP,q.__webglTexture,s.TEXTURE0+T)}const ot={[ln]:s.REPEAT,[He]:s.CLAMP_TO_EDGE,[lo]:s.MIRRORED_REPEAT},N={[We]:s.NEAREST,[nd]:s.NEAREST_MIPMAP_NEAREST,[_s]:s.NEAREST_MIPMAP_LINEAR,[hn]:s.LINEAR,[fr]:s.LINEAR_MIPMAP_NEAREST,[Jn]:s.LINEAR_MIPMAP_LINEAR},D={[od]:s.NEVER,[ud]:s.ALWAYS,[ad]:s.LESS,[ul]:s.LEQUAL,[cd]:s.EQUAL,[dd]:s.GEQUAL,[ld]:s.GREATER,[hd]:s.NOTEQUAL};function lt(I,T){if(T.type===dn&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===hn||T.magFilter===fr||T.magFilter===_s||T.magFilter===Jn||T.minFilter===hn||T.minFilter===fr||T.minFilter===_s||T.minFilter===Jn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(I,s.TEXTURE_WRAP_S,ot[T.wrapS]),s.texParameteri(I,s.TEXTURE_WRAP_T,ot[T.wrapT]),(I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY)&&s.texParameteri(I,s.TEXTURE_WRAP_R,ot[T.wrapR]),s.texParameteri(I,s.TEXTURE_MAG_FILTER,N[T.magFilter]),s.texParameteri(I,s.TEXTURE_MIN_FILTER,N[T.minFilter]),T.compareFunction&&(s.texParameteri(I,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(I,s.TEXTURE_COMPARE_FUNC,D[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===We||T.minFilter!==_s&&T.minFilter!==Jn||T.type===dn&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||n.get(T).__currentAnisotropy){const q=t.get("EXT_texture_filter_anisotropic");s.texParameterf(I,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,i.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy}}}function ut(I,T){let q=!1;I.__webglInit===void 0&&(I.__webglInit=!0,T.addEventListener("dispose",E));const st=T.source;let ct=u.get(st);ct===void 0&&(ct={},u.set(st,ct));const it=H(T);if(it!==I.__cacheKey){ct[it]===void 0&&(ct[it]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,q=!0),ct[it].usedTimes++;const Pt=ct[I.__cacheKey];Pt!==void 0&&(ct[I.__cacheKey].usedTimes--,Pt.usedTimes===0&&M(T)),I.__cacheKey=it,I.__webglTexture=ct[it].texture}return q}function X(I,T,q){let st=s.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(st=s.TEXTURE_2D_ARRAY),T.isData3DTexture&&(st=s.TEXTURE_3D);const ct=ut(I,T),it=T.source;e.bindTexture(st,I.__webglTexture,s.TEXTURE0+q);const Pt=n.get(it);if(it.version!==Pt.__version||ct===!0){e.activeTexture(s.TEXTURE0+q);const mt=Jt.getPrimaries(Jt.workingColorSpace),nt=T.colorSpace===Ln?null:Jt.getPrimaries(T.colorSpace),tt=T.colorSpace===Ln||mt===nt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,T.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,T.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,tt);let et=_(T.image,!1,i.maxTextureSize);et=Kt(T,et);const ht=r.convert(T.format,T.colorSpace),pt=r.convert(T.type);let bt=S(T.internalFormat,ht,pt,T.colorSpace,T.isVideoTexture);lt(st,T);let gt;const Xt=T.mipmaps,Vt=T.isVideoTexture!==!0,ee=Pt.__version===void 0||ct===!0,z=it.dataReady,xt=L(T,et);if(T.isDepthTexture)bt=v(T.format===Ui,T.type),ee&&(Vt?e.texStorage2D(s.TEXTURE_2D,1,bt,et.width,et.height):e.texImage2D(s.TEXTURE_2D,0,bt,et.width,et.height,0,ht,pt,null));else if(T.isDataTexture)if(Xt.length>0){Vt&&ee&&e.texStorage2D(s.TEXTURE_2D,xt,bt,Xt[0].width,Xt[0].height);for(let J=0,rt=Xt.length;J<rt;J++)gt=Xt[J],Vt?z&&e.texSubImage2D(s.TEXTURE_2D,J,0,0,gt.width,gt.height,ht,pt,gt.data):e.texImage2D(s.TEXTURE_2D,J,bt,gt.width,gt.height,0,ht,pt,gt.data);T.generateMipmaps=!1}else Vt?(ee&&e.texStorage2D(s.TEXTURE_2D,xt,bt,et.width,et.height),z&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,et.width,et.height,ht,pt,et.data)):e.texImage2D(s.TEXTURE_2D,0,bt,et.width,et.height,0,ht,pt,et.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){Vt&&ee&&e.texStorage3D(s.TEXTURE_2D_ARRAY,xt,bt,Xt[0].width,Xt[0].height,et.depth);for(let J=0,rt=Xt.length;J<rt;J++)if(gt=Xt[J],T.format!==sn)if(ht!==null)if(Vt){if(z)if(T.layerUpdates.size>0){const Tt=Cc(gt.width,gt.height,T.format,T.type);for(const St of T.layerUpdates){const $t=gt.data.subarray(St*Tt/gt.data.BYTES_PER_ELEMENT,(St+1)*Tt/gt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,J,0,0,St,gt.width,gt.height,1,ht,$t)}T.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,J,0,0,0,gt.width,gt.height,et.depth,ht,gt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,J,bt,gt.width,gt.height,et.depth,0,gt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Vt?z&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,J,0,0,0,gt.width,gt.height,et.depth,ht,pt,gt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,J,bt,gt.width,gt.height,et.depth,0,ht,pt,gt.data)}else{Vt&&ee&&e.texStorage2D(s.TEXTURE_2D,xt,bt,Xt[0].width,Xt[0].height);for(let J=0,rt=Xt.length;J<rt;J++)gt=Xt[J],T.format!==sn?ht!==null?Vt?z&&e.compressedTexSubImage2D(s.TEXTURE_2D,J,0,0,gt.width,gt.height,ht,gt.data):e.compressedTexImage2D(s.TEXTURE_2D,J,bt,gt.width,gt.height,0,gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?z&&e.texSubImage2D(s.TEXTURE_2D,J,0,0,gt.width,gt.height,ht,pt,gt.data):e.texImage2D(s.TEXTURE_2D,J,bt,gt.width,gt.height,0,ht,pt,gt.data)}else if(T.isDataArrayTexture)if(Vt){if(ee&&e.texStorage3D(s.TEXTURE_2D_ARRAY,xt,bt,et.width,et.height,et.depth),z)if(T.layerUpdates.size>0){const J=Cc(et.width,et.height,T.format,T.type);for(const rt of T.layerUpdates){const Tt=et.data.subarray(rt*J/et.data.BYTES_PER_ELEMENT,(rt+1)*J/et.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,rt,et.width,et.height,1,ht,pt,Tt)}T.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,ht,pt,et.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,bt,et.width,et.height,et.depth,0,ht,pt,et.data);else if(T.isData3DTexture)Vt?(ee&&e.texStorage3D(s.TEXTURE_3D,xt,bt,et.width,et.height,et.depth),z&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,ht,pt,et.data)):e.texImage3D(s.TEXTURE_3D,0,bt,et.width,et.height,et.depth,0,ht,pt,et.data);else if(T.isFramebufferTexture){if(ee)if(Vt)e.texStorage2D(s.TEXTURE_2D,xt,bt,et.width,et.height);else{let J=et.width,rt=et.height;for(let Tt=0;Tt<xt;Tt++)e.texImage2D(s.TEXTURE_2D,Tt,bt,J,rt,0,ht,pt,null),J>>=1,rt>>=1}}else if(Xt.length>0){if(Vt&&ee){const J=Ct(Xt[0]);e.texStorage2D(s.TEXTURE_2D,xt,bt,J.width,J.height)}for(let J=0,rt=Xt.length;J<rt;J++)gt=Xt[J],Vt?z&&e.texSubImage2D(s.TEXTURE_2D,J,0,0,ht,pt,gt):e.texImage2D(s.TEXTURE_2D,J,bt,ht,pt,gt);T.generateMipmaps=!1}else if(Vt){if(ee){const J=Ct(et);e.texStorage2D(s.TEXTURE_2D,xt,bt,J.width,J.height)}z&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,ht,pt,et)}else e.texImage2D(s.TEXTURE_2D,0,bt,ht,pt,et);m(T)&&p(st),Pt.__version=it.version,T.onUpdate&&T.onUpdate(T)}I.__version=T.version}function K(I,T,q){if(T.image.length!==6)return;const st=ut(I,T),ct=T.source;e.bindTexture(s.TEXTURE_CUBE_MAP,I.__webglTexture,s.TEXTURE0+q);const it=n.get(ct);if(ct.version!==it.__version||st===!0){e.activeTexture(s.TEXTURE0+q);const Pt=Jt.getPrimaries(Jt.workingColorSpace),mt=T.colorSpace===Ln?null:Jt.getPrimaries(T.colorSpace),nt=T.colorSpace===Ln||Pt===mt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,T.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,T.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,nt);const tt=T.isCompressedTexture||T.image[0].isCompressedTexture,et=T.image[0]&&T.image[0].isDataTexture,ht=[];for(let rt=0;rt<6;rt++)!tt&&!et?ht[rt]=_(T.image[rt],!0,i.maxCubemapSize):ht[rt]=et?T.image[rt].image:T.image[rt],ht[rt]=Kt(T,ht[rt]);const pt=ht[0],bt=r.convert(T.format,T.colorSpace),gt=r.convert(T.type),Xt=S(T.internalFormat,bt,gt,T.colorSpace),Vt=T.isVideoTexture!==!0,ee=it.__version===void 0||st===!0,z=ct.dataReady;let xt=L(T,pt);lt(s.TEXTURE_CUBE_MAP,T);let J;if(tt){Vt&&ee&&e.texStorage2D(s.TEXTURE_CUBE_MAP,xt,Xt,pt.width,pt.height);for(let rt=0;rt<6;rt++){J=ht[rt].mipmaps;for(let Tt=0;Tt<J.length;Tt++){const St=J[Tt];T.format!==sn?bt!==null?Vt?z&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Tt,0,0,St.width,St.height,bt,St.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Tt,Xt,St.width,St.height,0,St.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Vt?z&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Tt,0,0,St.width,St.height,bt,gt,St.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Tt,Xt,St.width,St.height,0,bt,gt,St.data)}}}else{if(J=T.mipmaps,Vt&&ee){J.length>0&&xt++;const rt=Ct(ht[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,xt,Xt,rt.width,rt.height)}for(let rt=0;rt<6;rt++)if(et){Vt?z&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,ht[rt].width,ht[rt].height,bt,gt,ht[rt].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,Xt,ht[rt].width,ht[rt].height,0,bt,gt,ht[rt].data);for(let Tt=0;Tt<J.length;Tt++){const $t=J[Tt].image[rt].image;Vt?z&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Tt+1,0,0,$t.width,$t.height,bt,gt,$t.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Tt+1,Xt,$t.width,$t.height,0,bt,gt,$t.data)}}else{Vt?z&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,bt,gt,ht[rt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,Xt,bt,gt,ht[rt]);for(let Tt=0;Tt<J.length;Tt++){const St=J[Tt];Vt?z&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Tt+1,0,0,bt,gt,St.image[rt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Tt+1,Xt,bt,gt,St.image[rt])}}}m(T)&&p(s.TEXTURE_CUBE_MAP),it.__version=ct.version,T.onUpdate&&T.onUpdate(T)}I.__version=T.version}function at(I,T,q,st,ct,it){const Pt=r.convert(q.format,q.colorSpace),mt=r.convert(q.type),nt=S(q.internalFormat,Pt,mt,q.colorSpace),tt=n.get(T),et=n.get(q);if(et.__renderTarget=T,!tt.__hasExternalTextures){const ht=Math.max(1,T.width>>it),pt=Math.max(1,T.height>>it);ct===s.TEXTURE_3D||ct===s.TEXTURE_2D_ARRAY?e.texImage3D(ct,it,nt,ht,pt,T.depth,0,Pt,mt,null):e.texImage2D(ct,it,nt,ht,pt,0,Pt,mt,null)}e.bindFramebuffer(s.FRAMEBUFFER,I),Bt(T)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,st,ct,et.__webglTexture,0,Ot(T)):(ct===s.TEXTURE_2D||ct>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ct<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,st,ct,et.__webglTexture,it),e.bindFramebuffer(s.FRAMEBUFFER,null)}function Q(I,T,q){if(s.bindRenderbuffer(s.RENDERBUFFER,I),T.depthBuffer){const st=T.depthTexture,ct=st&&st.isDepthTexture?st.type:null,it=v(T.stencilBuffer,ct),Pt=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,mt=Ot(T);Bt(T)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,mt,it,T.width,T.height):q?s.renderbufferStorageMultisample(s.RENDERBUFFER,mt,it,T.width,T.height):s.renderbufferStorage(s.RENDERBUFFER,it,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Pt,s.RENDERBUFFER,I)}else{const st=T.textures;for(let ct=0;ct<st.length;ct++){const it=st[ct],Pt=r.convert(it.format,it.colorSpace),mt=r.convert(it.type),nt=S(it.internalFormat,Pt,mt,it.colorSpace),tt=Ot(T);q&&Bt(T)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,tt,nt,T.width,T.height):Bt(T)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,tt,nt,T.width,T.height):s.renderbufferStorage(s.RENDERBUFFER,nt,T.width,T.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function dt(I,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,I),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const st=n.get(T.depthTexture);st.__renderTarget=T,(!st.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),O(T.depthTexture,0);const ct=st.__webglTexture,it=Ot(T);if(T.depthTexture.format===wi)Bt(T)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ct,0,it):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ct,0);else if(T.depthTexture.format===Ui)Bt(T)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ct,0,it):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ct,0);else throw new Error("Unknown depthTexture format")}function vt(I){const T=n.get(I),q=I.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==I.depthTexture){const st=I.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),st){const ct=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,st.removeEventListener("dispose",ct)};st.addEventListener("dispose",ct),T.__depthDisposeCallback=ct}T.__boundDepthTexture=st}if(I.depthTexture&&!T.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");dt(T.__webglFramebuffer,I)}else if(q){T.__webglDepthbuffer=[];for(let st=0;st<6;st++)if(e.bindFramebuffer(s.FRAMEBUFFER,T.__webglFramebuffer[st]),T.__webglDepthbuffer[st]===void 0)T.__webglDepthbuffer[st]=s.createRenderbuffer(),Q(T.__webglDepthbuffer[st],I,!1);else{const ct=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,it=T.__webglDepthbuffer[st];s.bindRenderbuffer(s.RENDERBUFFER,it),s.framebufferRenderbuffer(s.FRAMEBUFFER,ct,s.RENDERBUFFER,it)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=s.createRenderbuffer(),Q(T.__webglDepthbuffer,I,!1);else{const st=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ct=T.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ct),s.framebufferRenderbuffer(s.FRAMEBUFFER,st,s.RENDERBUFFER,ct)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function yt(I,T,q){const st=n.get(I);T!==void 0&&at(st.__webglFramebuffer,I,I.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),q!==void 0&&vt(I)}function It(I){const T=I.texture,q=n.get(I),st=n.get(T);I.addEventListener("dispose",C);const ct=I.textures,it=I.isWebGLCubeRenderTarget===!0,Pt=ct.length>1;if(Pt||(st.__webglTexture===void 0&&(st.__webglTexture=s.createTexture()),st.__version=T.version,o.memory.textures++),it){q.__webglFramebuffer=[];for(let mt=0;mt<6;mt++)if(T.mipmaps&&T.mipmaps.length>0){q.__webglFramebuffer[mt]=[];for(let nt=0;nt<T.mipmaps.length;nt++)q.__webglFramebuffer[mt][nt]=s.createFramebuffer()}else q.__webglFramebuffer[mt]=s.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){q.__webglFramebuffer=[];for(let mt=0;mt<T.mipmaps.length;mt++)q.__webglFramebuffer[mt]=s.createFramebuffer()}else q.__webglFramebuffer=s.createFramebuffer();if(Pt)for(let mt=0,nt=ct.length;mt<nt;mt++){const tt=n.get(ct[mt]);tt.__webglTexture===void 0&&(tt.__webglTexture=s.createTexture(),o.memory.textures++)}if(I.samples>0&&Bt(I)===!1){q.__webglMultisampledFramebuffer=s.createFramebuffer(),q.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let mt=0;mt<ct.length;mt++){const nt=ct[mt];q.__webglColorRenderbuffer[mt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,q.__webglColorRenderbuffer[mt]);const tt=r.convert(nt.format,nt.colorSpace),et=r.convert(nt.type),ht=S(nt.internalFormat,tt,et,nt.colorSpace,I.isXRRenderTarget===!0),pt=Ot(I);s.renderbufferStorageMultisample(s.RENDERBUFFER,pt,ht,I.width,I.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+mt,s.RENDERBUFFER,q.__webglColorRenderbuffer[mt])}s.bindRenderbuffer(s.RENDERBUFFER,null),I.depthBuffer&&(q.__webglDepthRenderbuffer=s.createRenderbuffer(),Q(q.__webglDepthRenderbuffer,I,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(it){e.bindTexture(s.TEXTURE_CUBE_MAP,st.__webglTexture),lt(s.TEXTURE_CUBE_MAP,T);for(let mt=0;mt<6;mt++)if(T.mipmaps&&T.mipmaps.length>0)for(let nt=0;nt<T.mipmaps.length;nt++)at(q.__webglFramebuffer[mt][nt],I,T,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+mt,nt);else at(q.__webglFramebuffer[mt],I,T,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0);m(T)&&p(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Pt){for(let mt=0,nt=ct.length;mt<nt;mt++){const tt=ct[mt],et=n.get(tt);e.bindTexture(s.TEXTURE_2D,et.__webglTexture),lt(s.TEXTURE_2D,tt),at(q.__webglFramebuffer,I,tt,s.COLOR_ATTACHMENT0+mt,s.TEXTURE_2D,0),m(tt)&&p(s.TEXTURE_2D)}e.unbindTexture()}else{let mt=s.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(mt=I.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(mt,st.__webglTexture),lt(mt,T),T.mipmaps&&T.mipmaps.length>0)for(let nt=0;nt<T.mipmaps.length;nt++)at(q.__webglFramebuffer[nt],I,T,s.COLOR_ATTACHMENT0,mt,nt);else at(q.__webglFramebuffer,I,T,s.COLOR_ATTACHMENT0,mt,0);m(T)&&p(mt),e.unbindTexture()}I.depthBuffer&&vt(I)}function Rt(I){const T=I.textures;for(let q=0,st=T.length;q<st;q++){const ct=T[q];if(m(ct)){const it=x(I),Pt=n.get(ct).__webglTexture;e.bindTexture(it,Pt),p(it),e.unbindTexture()}}}const zt=[],B=[];function se(I){if(I.samples>0){if(Bt(I)===!1){const T=I.textures,q=I.width,st=I.height;let ct=s.COLOR_BUFFER_BIT;const it=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Pt=n.get(I),mt=T.length>1;if(mt)for(let nt=0;nt<T.length;nt++)e.bindFramebuffer(s.FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+nt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Pt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+nt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Pt.__webglFramebuffer);for(let nt=0;nt<T.length;nt++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(ct|=s.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(ct|=s.STENCIL_BUFFER_BIT)),mt){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Pt.__webglColorRenderbuffer[nt]);const tt=n.get(T[nt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,tt,0)}s.blitFramebuffer(0,0,q,st,0,0,q,st,ct,s.NEAREST),c===!0&&(zt.length=0,B.length=0,zt.push(s.COLOR_ATTACHMENT0+nt),I.depthBuffer&&I.resolveDepthBuffer===!1&&(zt.push(it),B.push(it),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,B)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,zt))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),mt)for(let nt=0;nt<T.length;nt++){e.bindFramebuffer(s.FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+nt,s.RENDERBUFFER,Pt.__webglColorRenderbuffer[nt]);const tt=n.get(T[nt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Pt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+nt,s.TEXTURE_2D,tt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Pt.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&c){const T=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[T])}}}function Ot(I){return Math.min(i.maxSamples,I.samples)}function Bt(I){const T=n.get(I);return I.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function wt(I){const T=o.render.frame;h.get(I)!==T&&(h.set(I,T),I.update())}function Kt(I,T){const q=I.colorSpace,st=I.format,ct=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||q!==Fi&&q!==Ln&&(Jt.getTransfer(q)===oe?(st!==sn||ct!==Mn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",q)),T}function Ct(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(l.width=I.naturalWidth||I.width,l.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(l.width=I.displayWidth,l.height=I.displayHeight):(l.width=I.width,l.height=I.height),l}this.allocateTextureUnit=F,this.resetTextureUnits=k,this.setTexture2D=O,this.setTexture2DArray=U,this.setTexture3D=Y,this.setTextureCube=W,this.rebindTextures=yt,this.setupRenderTarget=It,this.updateRenderTargetMipmap=Rt,this.updateMultisampleRenderTarget=se,this.setupDepthRenderbuffer=vt,this.setupFrameBufferTexture=at,this.useMultisampledRTT=Bt}function L0(s,t){function e(n,i=Ln){let r;const o=Jt.getTransfer(i);if(n===Mn)return s.UNSIGNED_BYTE;if(n===ea)return s.UNSIGNED_SHORT_4_4_4_4;if(n===na)return s.UNSIGNED_SHORT_5_5_5_1;if(n===sl)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===nl)return s.BYTE;if(n===il)return s.SHORT;if(n===ds)return s.UNSIGNED_SHORT;if(n===ta)return s.INT;if(n===Qn)return s.UNSIGNED_INT;if(n===dn)return s.FLOAT;if(n===ps)return s.HALF_FLOAT;if(n===rl)return s.ALPHA;if(n===ol)return s.RGB;if(n===sn)return s.RGBA;if(n===al)return s.LUMINANCE;if(n===cl)return s.LUMINANCE_ALPHA;if(n===wi)return s.DEPTH_COMPONENT;if(n===Ui)return s.DEPTH_STENCIL;if(n===ia)return s.RED;if(n===sa)return s.RED_INTEGER;if(n===ll)return s.RG;if(n===ra)return s.RG_INTEGER;if(n===oa)return s.RGBA_INTEGER;if(n===Hs||n===Ws||n===Xs||n===$s)if(o===oe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Hs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ws)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Xs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===$s)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Hs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ws)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Xs)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===$s)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ho||n===uo||n===fo||n===po)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ho)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===uo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===fo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===po)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===mo||n===go||n===_o)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===mo||n===go)return o===oe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===_o)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===vo||n===xo||n===yo||n===So||n===Mo||n===To||n===bo||n===Eo||n===wo||n===Co||n===Ao||n===Ro||n===Po||n===Io)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===vo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===xo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===yo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===So)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Mo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===To)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===bo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Eo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===wo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Co)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ao)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ro)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Po)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Io)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===qs||n===Lo||n===Do)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===qs)return o===oe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Lo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Do)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===hl||n===Uo||n===No||n===ko)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===qs)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Uo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===No)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ko)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Di?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}class D0 extends Oe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class le extends xe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const U0={type:"move"};class zr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new le,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new le,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new le,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;l.inputState.pinching&&u>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(U0)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new le;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const N0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,k0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class F0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new Ee,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Bn({vertexShader:N0,fragmentShader:k0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new A(new he(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class O0 extends Oi{constructor(t,e){super();const n=this;let i=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,d=null,u=null,f=null,g=null;const _=new F0,m=e.getContextAttributes();let p=null,x=null;const S=[],v=[],L=new Ft;let E=null;const C=new Oe;C.viewport=new ae;const w=new Oe;w.viewport=new ae;const M=[C,w],y=new D0;let R=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let K=S[X];return K===void 0&&(K=new zr,S[X]=K),K.getTargetRaySpace()},this.getControllerGrip=function(X){let K=S[X];return K===void 0&&(K=new zr,S[X]=K),K.getGripSpace()},this.getHand=function(X){let K=S[X];return K===void 0&&(K=new zr,S[X]=K),K.getHandSpace()};function F(X){const K=v.indexOf(X.inputSource);if(K===-1)return;const at=S[K];at!==void 0&&(at.update(X.inputSource,X.frame,l||o),at.dispatchEvent({type:X.type,data:X.inputSource}))}function H(){i.removeEventListener("select",F),i.removeEventListener("selectstart",F),i.removeEventListener("selectend",F),i.removeEventListener("squeeze",F),i.removeEventListener("squeezestart",F),i.removeEventListener("squeezeend",F),i.removeEventListener("end",H),i.removeEventListener("inputsourceschange",O);for(let X=0;X<S.length;X++){const K=v[X];K!==null&&(v[X]=null,S[X].disconnect(K))}R=null,k=null,_.reset(),t.setRenderTarget(p),f=null,u=null,d=null,i=null,x=null,ut.stop(),n.isPresenting=!1,t.setPixelRatio(E),t.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(X){if(i=X,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",F),i.addEventListener("selectstart",F),i.addEventListener("selectend",F),i.addEventListener("squeeze",F),i.addEventListener("squeezestart",F),i.addEventListener("squeezeend",F),i.addEventListener("end",H),i.addEventListener("inputsourceschange",O),m.xrCompatible!==!0&&await e.makeXRCompatible(),E=t.getPixelRatio(),t.getSize(L),i.renderState.layers===void 0){const K={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,e,K),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new ti(f.framebufferWidth,f.framebufferHeight,{format:sn,type:Mn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let K=null,at=null,Q=null;m.depth&&(Q=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,K=m.stencil?Ui:wi,at=m.stencil?Di:Qn);const dt={colorFormat:e.RGBA8,depthFormat:Q,scaleFactor:r};d=new XRWebGLBinding(i,e),u=d.createProjectionLayer(dt),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),x=new ti(u.textureWidth,u.textureHeight,{format:sn,type:Mn,depthTexture:new wl(u.textureWidth,u.textureHeight,at,void 0,void 0,void 0,void 0,void 0,void 0,K),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),ut.setContext(i),ut.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function O(X){for(let K=0;K<X.removed.length;K++){const at=X.removed[K],Q=v.indexOf(at);Q>=0&&(v[Q]=null,S[Q].disconnect(at))}for(let K=0;K<X.added.length;K++){const at=X.added[K];let Q=v.indexOf(at);if(Q===-1){for(let vt=0;vt<S.length;vt++)if(vt>=v.length){v.push(at),Q=vt;break}else if(v[vt]===null){v[vt]=at,Q=vt;break}if(Q===-1)break}const dt=S[Q];dt&&dt.connect(at)}}const U=new P,Y=new P;function W(X,K,at){U.setFromMatrixPosition(K.matrixWorld),Y.setFromMatrixPosition(at.matrixWorld);const Q=U.distanceTo(Y),dt=K.projectionMatrix.elements,vt=at.projectionMatrix.elements,yt=dt[14]/(dt[10]-1),It=dt[14]/(dt[10]+1),Rt=(dt[9]+1)/dt[5],zt=(dt[9]-1)/dt[5],B=(dt[8]-1)/dt[0],se=(vt[8]+1)/vt[0],Ot=yt*B,Bt=yt*se,wt=Q/(-B+se),Kt=wt*-B;if(K.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Kt),X.translateZ(wt),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),dt[10]===-1)X.projectionMatrix.copy(K.projectionMatrix),X.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{const Ct=yt+wt,I=It+wt,T=Ot-Kt,q=Bt+(Q-Kt),st=Rt*It/I*Ct,ct=zt*It/I*Ct;X.projectionMatrix.makePerspective(T,q,st,ct,Ct,I),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function ot(X,K){K===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(K.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(i===null)return;let K=X.near,at=X.far;_.texture!==null&&(_.depthNear>0&&(K=_.depthNear),_.depthFar>0&&(at=_.depthFar)),y.near=w.near=C.near=K,y.far=w.far=C.far=at,(R!==y.near||k!==y.far)&&(i.updateRenderState({depthNear:y.near,depthFar:y.far}),R=y.near,k=y.far),C.layers.mask=X.layers.mask|2,w.layers.mask=X.layers.mask|4,y.layers.mask=C.layers.mask|w.layers.mask;const Q=X.parent,dt=y.cameras;ot(y,Q);for(let vt=0;vt<dt.length;vt++)ot(dt[vt],Q);dt.length===2?W(y,C,w):y.projectionMatrix.copy(C.projectionMatrix),N(X,y,Q)};function N(X,K,at){at===null?X.matrix.copy(K.matrixWorld):(X.matrix.copy(at.matrixWorld),X.matrix.invert(),X.matrix.multiply(K.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(K.projectionMatrix),X.projectionMatrixInverse.copy(K.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Ni*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function(X){c=X,u!==null&&(u.fixedFoveation=X),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=X)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(y)};let D=null;function lt(X,K){if(h=K.getViewerPose(l||o),g=K,h!==null){const at=h.views;f!==null&&(t.setRenderTargetFramebuffer(x,f.framebuffer),t.setRenderTarget(x));let Q=!1;at.length!==y.cameras.length&&(y.cameras.length=0,Q=!0);for(let vt=0;vt<at.length;vt++){const yt=at[vt];let It=null;if(f!==null)It=f.getViewport(yt);else{const zt=d.getViewSubImage(u,yt);It=zt.viewport,vt===0&&(t.setRenderTargetTextures(x,zt.colorTexture,u.ignoreDepthValues?void 0:zt.depthStencilTexture),t.setRenderTarget(x))}let Rt=M[vt];Rt===void 0&&(Rt=new Oe,Rt.layers.enable(vt),Rt.viewport=new ae,M[vt]=Rt),Rt.matrix.fromArray(yt.transform.matrix),Rt.matrix.decompose(Rt.position,Rt.quaternion,Rt.scale),Rt.projectionMatrix.fromArray(yt.projectionMatrix),Rt.projectionMatrixInverse.copy(Rt.projectionMatrix).invert(),Rt.viewport.set(It.x,It.y,It.width,It.height),vt===0&&(y.matrix.copy(Rt.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),Q===!0&&y.cameras.push(Rt)}const dt=i.enabledFeatures;if(dt&&dt.includes("depth-sensing")){const vt=d.getDepthInformation(at[0]);vt&&vt.isValid&&vt.texture&&_.init(t,vt,i.renderState)}}for(let at=0;at<S.length;at++){const Q=v[at],dt=S[at];Q!==null&&dt!==void 0&&dt.update(Q,K,l||o)}D&&D(X,K),K.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:K}),g=null}const ut=new bl;ut.setAnimationLoop(lt),this.setAnimationLoop=function(X){D=X},this.dispose=function(){}}}const $n=new on,B0=new te;function z0(s,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Sl(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,x,S,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,v)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,x,S):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Be&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Be&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const x=t.get(p),S=x.envMap,v=x.envMapRotation;S&&(m.envMap.value=S,$n.copy(v),$n.x*=-1,$n.y*=-1,$n.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&($n.y*=-1,$n.z*=-1),m.envMapRotation.value.setFromMatrix4(B0.makeRotationFromEuler($n)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,x,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*x,m.scale.value=S*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,x){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Be&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const x=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function G0(s,t,e,n){let i={},r={},o=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,S){const v=S.program;n.uniformBlockBinding(x,v)}function l(x,S){let v=i[x.id];v===void 0&&(g(x),v=h(x),i[x.id]=v,x.addEventListener("dispose",m));const L=S.program;n.updateUBOMapping(x,L);const E=t.render.frame;r[x.id]!==E&&(u(x),r[x.id]=E)}function h(x){const S=d();x.__bindingPointIndex=S;const v=s.createBuffer(),L=x.__size,E=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,v),s.bufferData(s.UNIFORM_BUFFER,L,E),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,S,v),v}function d(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){const S=i[x.id],v=x.uniforms,L=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,S);for(let E=0,C=v.length;E<C;E++){const w=Array.isArray(v[E])?v[E]:[v[E]];for(let M=0,y=w.length;M<y;M++){const R=w[M];if(f(R,E,M,L)===!0){const k=R.__offset,F=Array.isArray(R.value)?R.value:[R.value];let H=0;for(let O=0;O<F.length;O++){const U=F[O],Y=_(U);typeof U=="number"||typeof U=="boolean"?(R.__data[0]=U,s.bufferSubData(s.UNIFORM_BUFFER,k+H,R.__data)):U.isMatrix3?(R.__data[0]=U.elements[0],R.__data[1]=U.elements[1],R.__data[2]=U.elements[2],R.__data[3]=0,R.__data[4]=U.elements[3],R.__data[5]=U.elements[4],R.__data[6]=U.elements[5],R.__data[7]=0,R.__data[8]=U.elements[6],R.__data[9]=U.elements[7],R.__data[10]=U.elements[8],R.__data[11]=0):(U.toArray(R.__data,H),H+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,k,R.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(x,S,v,L){const E=x.value,C=S+"_"+v;if(L[C]===void 0)return typeof E=="number"||typeof E=="boolean"?L[C]=E:L[C]=E.clone(),!0;{const w=L[C];if(typeof E=="number"||typeof E=="boolean"){if(w!==E)return L[C]=E,!0}else if(w.equals(E)===!1)return w.copy(E),!0}return!1}function g(x){const S=x.uniforms;let v=0;const L=16;for(let C=0,w=S.length;C<w;C++){const M=Array.isArray(S[C])?S[C]:[S[C]];for(let y=0,R=M.length;y<R;y++){const k=M[y],F=Array.isArray(k.value)?k.value:[k.value];for(let H=0,O=F.length;H<O;H++){const U=F[H],Y=_(U),W=v%L,ot=W%Y.boundary,N=W+ot;v+=ot,N!==0&&L-N<Y.storage&&(v+=L-N),k.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=v,v+=Y.storage}}}const E=v%L;return E>0&&(v+=L-E),x.__size=v,x.__cache={},this}function _(x){const S={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(S.boundary=4,S.storage=4):x.isVector2?(S.boundary=8,S.storage=8):x.isVector3||x.isColor?(S.boundary=16,S.storage=12):x.isVector4?(S.boundary=16,S.storage=16):x.isMatrix3?(S.boundary=48,S.storage=48):x.isMatrix4?(S.boundary=64,S.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),S}function m(x){const S=x.target;S.removeEventListener("dispose",m);const v=o.indexOf(S.__bindingPointIndex);o.splice(v,1),s.deleteBuffer(i[S.id]),delete i[S.id],delete r[S.id]}function p(){for(const x in i)s.deleteBuffer(i[x]);o=[],i={},r={}}return{bind:c,update:l,dispose:p}}class V0{constructor(t={}){const{canvas:e=Rd(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const x=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=pe,this.toneMapping=kn,this.toneMappingExposure=1;const v=this;let L=!1,E=0,C=0,w=null,M=-1,y=null;const R=new ae,k=new ae;let F=null;const H=new Wt(0);let O=0,U=e.width,Y=e.height,W=1,ot=null,N=null;const D=new ae(0,0,U,Y),lt=new ae(0,0,U,Y);let ut=!1;const X=new ca;let K=!1,at=!1;const Q=new te,dt=new te,vt=new P,yt=new ae,It={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Rt=!1;function zt(){return w===null?W:1}let B=n;function se(b,G){return e.getContext(b,G)}try{const b={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Qo}`),e.addEventListener("webglcontextlost",rt,!1),e.addEventListener("webglcontextrestored",Tt,!1),e.addEventListener("webglcontextcreationerror",St,!1),B===null){const G="webgl2";if(B=se(G,b),B===null)throw se(G)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Ot,Bt,wt,Kt,Ct,I,T,q,st,ct,it,Pt,mt,nt,tt,et,ht,pt,bt,gt,Xt,Vt,ee,z;function xt(){Ot=new qp(B),Ot.init(),Vt=new L0(B,Ot),Bt=new Gp(B,Ot,t,Vt),wt=new R0(B,Ot),Bt.reverseDepthBuffer&&u&&wt.buffers.depth.setReversed(!0),Kt=new Zp(B),Ct=new p0,I=new I0(B,Ot,wt,Ct,Bt,Vt,Kt),T=new Hp(v),q=new $p(v),st=new nu(B),ee=new Bp(B,st),ct=new Yp(B,st,Kt,ee),it=new Jp(B,ct,st,Kt),bt=new Kp(B,Bt,I),et=new Vp(Ct),Pt=new f0(v,T,q,Ot,Bt,ee,et),mt=new z0(v,Ct),nt=new g0,tt=new M0(Ot),pt=new Op(v,T,q,wt,it,f,c),ht=new C0(v,it,Bt),z=new G0(B,Kt,Bt,wt),gt=new zp(B,Ot,Kt),Xt=new jp(B,Ot,Kt),Kt.programs=Pt.programs,v.capabilities=Bt,v.extensions=Ot,v.properties=Ct,v.renderLists=nt,v.shadowMap=ht,v.state=wt,v.info=Kt}xt();const J=new O0(v,B);this.xr=J,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const b=Ot.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Ot.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(b){b!==void 0&&(W=b,this.setSize(U,Y,!1))},this.getSize=function(b){return b.set(U,Y)},this.setSize=function(b,G,j=!0){if(J.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}U=b,Y=G,e.width=Math.floor(b*W),e.height=Math.floor(G*W),j===!0&&(e.style.width=b+"px",e.style.height=G+"px"),this.setViewport(0,0,b,G)},this.getDrawingBufferSize=function(b){return b.set(U*W,Y*W).floor()},this.setDrawingBufferSize=function(b,G,j){U=b,Y=G,W=j,e.width=Math.floor(b*j),e.height=Math.floor(G*j),this.setViewport(0,0,b,G)},this.getCurrentViewport=function(b){return b.copy(R)},this.getViewport=function(b){return b.copy(D)},this.setViewport=function(b,G,j,Z){b.isVector4?D.set(b.x,b.y,b.z,b.w):D.set(b,G,j,Z),wt.viewport(R.copy(D).multiplyScalar(W).round())},this.getScissor=function(b){return b.copy(lt)},this.setScissor=function(b,G,j,Z){b.isVector4?lt.set(b.x,b.y,b.z,b.w):lt.set(b,G,j,Z),wt.scissor(k.copy(lt).multiplyScalar(W).round())},this.getScissorTest=function(){return ut},this.setScissorTest=function(b){wt.setScissorTest(ut=b)},this.setOpaqueSort=function(b){ot=b},this.setTransparentSort=function(b){N=b},this.getClearColor=function(b){return b.copy(pt.getClearColor())},this.setClearColor=function(){pt.setClearColor.apply(pt,arguments)},this.getClearAlpha=function(){return pt.getClearAlpha()},this.setClearAlpha=function(){pt.setClearAlpha.apply(pt,arguments)},this.clear=function(b=!0,G=!0,j=!0){let Z=0;if(b){let V=!1;if(w!==null){const ft=w.texture.format;V=ft===oa||ft===ra||ft===sa}if(V){const ft=w.texture.type,Mt=ft===Mn||ft===Qn||ft===ds||ft===Di||ft===ea||ft===na,Lt=pt.getClearColor(),Dt=pt.getClearAlpha(),Ht=Lt.r,qt=Lt.g,Ut=Lt.b;Mt?(g[0]=Ht,g[1]=qt,g[2]=Ut,g[3]=Dt,B.clearBufferuiv(B.COLOR,0,g)):(_[0]=Ht,_[1]=qt,_[2]=Ut,_[3]=Dt,B.clearBufferiv(B.COLOR,0,_))}else Z|=B.COLOR_BUFFER_BIT}G&&(Z|=B.DEPTH_BUFFER_BIT),j&&(Z|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",rt,!1),e.removeEventListener("webglcontextrestored",Tt,!1),e.removeEventListener("webglcontextcreationerror",St,!1),nt.dispose(),tt.dispose(),Ct.dispose(),T.dispose(),q.dispose(),it.dispose(),ee.dispose(),z.dispose(),Pt.dispose(),J.dispose(),J.removeEventListener("sessionstart",Ma),J.removeEventListener("sessionend",Ta),zn.stop()};function rt(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function Tt(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;const b=Kt.autoReset,G=ht.enabled,j=ht.autoUpdate,Z=ht.needsUpdate,V=ht.type;xt(),Kt.autoReset=b,ht.enabled=G,ht.autoUpdate=j,ht.needsUpdate=Z,ht.type=V}function St(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function $t(b){const G=b.target;G.removeEventListener("dispose",$t),me(G)}function me(b){we(b),Ct.remove(b)}function we(b){const G=Ct.get(b).programs;G!==void 0&&(G.forEach(function(j){Pt.releaseProgram(j)}),b.isShaderMaterial&&Pt.releaseShaderCache(b))}this.renderBufferDirect=function(b,G,j,Z,V,ft){G===null&&(G=It);const Mt=V.isMesh&&V.matrixWorld.determinant()<0,Lt=Th(b,G,j,Z,V);wt.setMaterial(Z,Mt);let Dt=j.index,Ht=1;if(Z.wireframe===!0){if(Dt=ct.getWireframeAttribute(j),Dt===void 0)return;Ht=2}const qt=j.drawRange,Ut=j.attributes.position;let Qt=qt.start*Ht,de=(qt.start+qt.count)*Ht;ft!==null&&(Qt=Math.max(Qt,ft.start*Ht),de=Math.min(de,(ft.start+ft.count)*Ht)),Dt!==null?(Qt=Math.max(Qt,0),de=Math.min(de,Dt.count)):Ut!=null&&(Qt=Math.max(Qt,0),de=Math.min(de,Ut.count));const ue=de-Qt;if(ue<0||ue===1/0)return;ee.setup(V,Z,Lt,j,Dt);let ke,ne=gt;if(Dt!==null&&(ke=st.get(Dt),ne=Xt,ne.setIndex(ke)),V.isMesh)Z.wireframe===!0?(wt.setLineWidth(Z.wireframeLinewidth*zt()),ne.setMode(B.LINES)):ne.setMode(B.TRIANGLES);else if(V.isLine){let kt=Z.linewidth;kt===void 0&&(kt=1),wt.setLineWidth(kt*zt()),V.isLineSegments?ne.setMode(B.LINES):V.isLineLoop?ne.setMode(B.LINE_LOOP):ne.setMode(B.LINE_STRIP)}else V.isPoints?ne.setMode(B.POINTS):V.isSprite&&ne.setMode(B.TRIANGLES);if(V.isBatchedMesh)if(V._multiDrawInstances!==null)ne.renderMultiDrawInstances(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount,V._multiDrawInstances);else if(Ot.get("WEBGL_multi_draw"))ne.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const kt=V._multiDrawStarts,fn=V._multiDrawCounts,ie=V._multiDrawCount,Ke=Dt?st.get(Dt).bytesPerElement:1,oi=Ct.get(Z).currentProgram.getUniforms();for(let ze=0;ze<ie;ze++)oi.setValue(B,"_gl_DrawID",ze),ne.render(kt[ze]/Ke,fn[ze])}else if(V.isInstancedMesh)ne.renderInstances(Qt,ue,V.count);else if(j.isInstancedBufferGeometry){const kt=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,fn=Math.min(j.instanceCount,kt);ne.renderInstances(Qt,ue,fn)}else ne.render(Qt,ue)};function re(b,G,j){b.transparent===!0&&b.side===Ue&&b.forceSinglePass===!1?(b.side=Be,b.needsUpdate=!0,gs(b,G,j),b.side=On,b.needsUpdate=!0,gs(b,G,j),b.side=Ue):gs(b,G,j)}this.compile=function(b,G,j=null){j===null&&(j=b),p=tt.get(j),p.init(G),S.push(p),j.traverseVisible(function(V){V.isLight&&V.layers.test(G.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),b!==j&&b.traverseVisible(function(V){V.isLight&&V.layers.test(G.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),p.setupLights();const Z=new Set;return b.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const ft=V.material;if(ft)if(Array.isArray(ft))for(let Mt=0;Mt<ft.length;Mt++){const Lt=ft[Mt];re(Lt,j,V),Z.add(Lt)}else re(ft,j,V),Z.add(ft)}),S.pop(),p=null,Z},this.compileAsync=function(b,G,j=null){const Z=this.compile(b,G,j);return new Promise(V=>{function ft(){if(Z.forEach(function(Mt){Ct.get(Mt).currentProgram.isReady()&&Z.delete(Mt)}),Z.size===0){V(b);return}setTimeout(ft,10)}Ot.get("KHR_parallel_shader_compile")!==null?ft():setTimeout(ft,10)})};let Ze=null;function un(b){Ze&&Ze(b)}function Ma(){zn.stop()}function Ta(){zn.start()}const zn=new bl;zn.setAnimationLoop(un),typeof self<"u"&&zn.setContext(self),this.setAnimationLoop=function(b){Ze=b,J.setAnimationLoop(b),b===null?zn.stop():zn.start()},J.addEventListener("sessionstart",Ma),J.addEventListener("sessionend",Ta),this.render=function(b,G){if(G!==void 0&&G.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),J.enabled===!0&&J.isPresenting===!0&&(J.cameraAutoUpdate===!0&&J.updateCamera(G),G=J.getCamera()),b.isScene===!0&&b.onBeforeRender(v,b,G,w),p=tt.get(b,S.length),p.init(G),S.push(p),dt.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),X.setFromProjectionMatrix(dt),at=this.localClippingEnabled,K=et.init(this.clippingPlanes,at),m=nt.get(b,x.length),m.init(),x.push(m),J.enabled===!0&&J.isPresenting===!0){const ft=v.xr.getDepthSensingMesh();ft!==null&&ur(ft,G,-1/0,v.sortObjects)}ur(b,G,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(ot,N),Rt=J.enabled===!1||J.isPresenting===!1||J.hasDepthSensing()===!1,Rt&&pt.addToRenderList(m,b),this.info.render.frame++,K===!0&&et.beginShadows();const j=p.state.shadowsArray;ht.render(j,b,G),K===!0&&et.endShadows(),this.info.autoReset===!0&&this.info.reset();const Z=m.opaque,V=m.transmissive;if(p.setupLights(),G.isArrayCamera){const ft=G.cameras;if(V.length>0)for(let Mt=0,Lt=ft.length;Mt<Lt;Mt++){const Dt=ft[Mt];Ea(Z,V,b,Dt)}Rt&&pt.render(b);for(let Mt=0,Lt=ft.length;Mt<Lt;Mt++){const Dt=ft[Mt];ba(m,b,Dt,Dt.viewport)}}else V.length>0&&Ea(Z,V,b,G),Rt&&pt.render(b),ba(m,b,G);w!==null&&(I.updateMultisampleRenderTarget(w),I.updateRenderTargetMipmap(w)),b.isScene===!0&&b.onAfterRender(v,b,G),ee.resetDefaultState(),M=-1,y=null,S.pop(),S.length>0?(p=S[S.length-1],K===!0&&et.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,x.pop(),x.length>0?m=x[x.length-1]:m=null};function ur(b,G,j,Z){if(b.visible===!1)return;if(b.layers.test(G.layers)){if(b.isGroup)j=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(G);else if(b.isLight)p.pushLight(b),b.castShadow&&p.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||X.intersectsSprite(b)){Z&&yt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(dt);const Mt=it.update(b),Lt=b.material;Lt.visible&&m.push(b,Mt,Lt,j,yt.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||X.intersectsObject(b))){const Mt=it.update(b),Lt=b.material;if(Z&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),yt.copy(b.boundingSphere.center)):(Mt.boundingSphere===null&&Mt.computeBoundingSphere(),yt.copy(Mt.boundingSphere.center)),yt.applyMatrix4(b.matrixWorld).applyMatrix4(dt)),Array.isArray(Lt)){const Dt=Mt.groups;for(let Ht=0,qt=Dt.length;Ht<qt;Ht++){const Ut=Dt[Ht],Qt=Lt[Ut.materialIndex];Qt&&Qt.visible&&m.push(b,Mt,Qt,j,yt.z,Ut)}}else Lt.visible&&m.push(b,Mt,Lt,j,yt.z,null)}}const ft=b.children;for(let Mt=0,Lt=ft.length;Mt<Lt;Mt++)ur(ft[Mt],G,j,Z)}function ba(b,G,j,Z){const V=b.opaque,ft=b.transmissive,Mt=b.transparent;p.setupLightsView(j),K===!0&&et.setGlobalState(v.clippingPlanes,j),Z&&wt.viewport(R.copy(Z)),V.length>0&&ms(V,G,j),ft.length>0&&ms(ft,G,j),Mt.length>0&&ms(Mt,G,j),wt.buffers.depth.setTest(!0),wt.buffers.depth.setMask(!0),wt.buffers.color.setMask(!0),wt.setPolygonOffset(!1)}function Ea(b,G,j,Z){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[Z.id]===void 0&&(p.state.transmissionRenderTarget[Z.id]=new ti(1,1,{generateMipmaps:!0,type:Ot.has("EXT_color_buffer_half_float")||Ot.has("EXT_color_buffer_float")?ps:Mn,minFilter:Jn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Jt.workingColorSpace}));const ft=p.state.transmissionRenderTarget[Z.id],Mt=Z.viewport||R;ft.setSize(Mt.z,Mt.w);const Lt=v.getRenderTarget();v.setRenderTarget(ft),v.getClearColor(H),O=v.getClearAlpha(),O<1&&v.setClearColor(16777215,.5),v.clear(),Rt&&pt.render(j);const Dt=v.toneMapping;v.toneMapping=kn;const Ht=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),p.setupLightsView(Z),K===!0&&et.setGlobalState(v.clippingPlanes,Z),ms(b,j,Z),I.updateMultisampleRenderTarget(ft),I.updateRenderTargetMipmap(ft),Ot.has("WEBGL_multisampled_render_to_texture")===!1){let qt=!1;for(let Ut=0,Qt=G.length;Ut<Qt;Ut++){const de=G[Ut],ue=de.object,ke=de.geometry,ne=de.material,kt=de.group;if(ne.side===Ue&&ue.layers.test(Z.layers)){const fn=ne.side;ne.side=Be,ne.needsUpdate=!0,wa(ue,j,Z,ke,ne,kt),ne.side=fn,ne.needsUpdate=!0,qt=!0}}qt===!0&&(I.updateMultisampleRenderTarget(ft),I.updateRenderTargetMipmap(ft))}v.setRenderTarget(Lt),v.setClearColor(H,O),Ht!==void 0&&(Z.viewport=Ht),v.toneMapping=Dt}function ms(b,G,j){const Z=G.isScene===!0?G.overrideMaterial:null;for(let V=0,ft=b.length;V<ft;V++){const Mt=b[V],Lt=Mt.object,Dt=Mt.geometry,Ht=Z===null?Mt.material:Z,qt=Mt.group;Lt.layers.test(j.layers)&&wa(Lt,G,j,Dt,Ht,qt)}}function wa(b,G,j,Z,V,ft){b.onBeforeRender(v,G,j,Z,V,ft),b.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),V.onBeforeRender(v,G,j,Z,b,ft),V.transparent===!0&&V.side===Ue&&V.forceSinglePass===!1?(V.side=Be,V.needsUpdate=!0,v.renderBufferDirect(j,G,Z,V,b,ft),V.side=On,V.needsUpdate=!0,v.renderBufferDirect(j,G,Z,V,b,ft),V.side=Ue):v.renderBufferDirect(j,G,Z,V,b,ft),b.onAfterRender(v,G,j,Z,V,ft)}function gs(b,G,j){G.isScene!==!0&&(G=It);const Z=Ct.get(b),V=p.state.lights,ft=p.state.shadowsArray,Mt=V.state.version,Lt=Pt.getParameters(b,V.state,ft,G,j),Dt=Pt.getProgramCacheKey(Lt);let Ht=Z.programs;Z.environment=b.isMeshStandardMaterial?G.environment:null,Z.fog=G.fog,Z.envMap=(b.isMeshStandardMaterial?q:T).get(b.envMap||Z.environment),Z.envMapRotation=Z.environment!==null&&b.envMap===null?G.environmentRotation:b.envMapRotation,Ht===void 0&&(b.addEventListener("dispose",$t),Ht=new Map,Z.programs=Ht);let qt=Ht.get(Dt);if(qt!==void 0){if(Z.currentProgram===qt&&Z.lightsStateVersion===Mt)return Aa(b,Lt),qt}else Lt.uniforms=Pt.getUniforms(b),b.onBeforeCompile(Lt,v),qt=Pt.acquireProgram(Lt,Dt),Ht.set(Dt,qt),Z.uniforms=Lt.uniforms;const Ut=Z.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ut.clippingPlanes=et.uniform),Aa(b,Lt),Z.needsLights=Eh(b),Z.lightsStateVersion=Mt,Z.needsLights&&(Ut.ambientLightColor.value=V.state.ambient,Ut.lightProbe.value=V.state.probe,Ut.directionalLights.value=V.state.directional,Ut.directionalLightShadows.value=V.state.directionalShadow,Ut.spotLights.value=V.state.spot,Ut.spotLightShadows.value=V.state.spotShadow,Ut.rectAreaLights.value=V.state.rectArea,Ut.ltc_1.value=V.state.rectAreaLTC1,Ut.ltc_2.value=V.state.rectAreaLTC2,Ut.pointLights.value=V.state.point,Ut.pointLightShadows.value=V.state.pointShadow,Ut.hemisphereLights.value=V.state.hemi,Ut.directionalShadowMap.value=V.state.directionalShadowMap,Ut.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Ut.spotShadowMap.value=V.state.spotShadowMap,Ut.spotLightMatrix.value=V.state.spotLightMatrix,Ut.spotLightMap.value=V.state.spotLightMap,Ut.pointShadowMap.value=V.state.pointShadowMap,Ut.pointShadowMatrix.value=V.state.pointShadowMatrix),Z.currentProgram=qt,Z.uniformsList=null,qt}function Ca(b){if(b.uniformsList===null){const G=b.currentProgram.getUniforms();b.uniformsList=Ys.seqWithValue(G.seq,b.uniforms)}return b.uniformsList}function Aa(b,G){const j=Ct.get(b);j.outputColorSpace=G.outputColorSpace,j.batching=G.batching,j.batchingColor=G.batchingColor,j.instancing=G.instancing,j.instancingColor=G.instancingColor,j.instancingMorph=G.instancingMorph,j.skinning=G.skinning,j.morphTargets=G.morphTargets,j.morphNormals=G.morphNormals,j.morphColors=G.morphColors,j.morphTargetsCount=G.morphTargetsCount,j.numClippingPlanes=G.numClippingPlanes,j.numIntersection=G.numClipIntersection,j.vertexAlphas=G.vertexAlphas,j.vertexTangents=G.vertexTangents,j.toneMapping=G.toneMapping}function Th(b,G,j,Z,V){G.isScene!==!0&&(G=It),I.resetTextureUnits();const ft=G.fog,Mt=Z.isMeshStandardMaterial?G.environment:null,Lt=w===null?v.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:Fi,Dt=(Z.isMeshStandardMaterial?q:T).get(Z.envMap||Mt),Ht=Z.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,qt=!!j.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Ut=!!j.morphAttributes.position,Qt=!!j.morphAttributes.normal,de=!!j.morphAttributes.color;let ue=kn;Z.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(ue=v.toneMapping);const ke=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,ne=ke!==void 0?ke.length:0,kt=Ct.get(Z),fn=p.state.lights;if(K===!0&&(at===!0||b!==y)){const Xe=b===y&&Z.id===M;et.setState(Z,b,Xe)}let ie=!1;Z.version===kt.__version?(kt.needsLights&&kt.lightsStateVersion!==fn.state.version||kt.outputColorSpace!==Lt||V.isBatchedMesh&&kt.batching===!1||!V.isBatchedMesh&&kt.batching===!0||V.isBatchedMesh&&kt.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&kt.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&kt.instancing===!1||!V.isInstancedMesh&&kt.instancing===!0||V.isSkinnedMesh&&kt.skinning===!1||!V.isSkinnedMesh&&kt.skinning===!0||V.isInstancedMesh&&kt.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&kt.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&kt.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&kt.instancingMorph===!1&&V.morphTexture!==null||kt.envMap!==Dt||Z.fog===!0&&kt.fog!==ft||kt.numClippingPlanes!==void 0&&(kt.numClippingPlanes!==et.numPlanes||kt.numIntersection!==et.numIntersection)||kt.vertexAlphas!==Ht||kt.vertexTangents!==qt||kt.morphTargets!==Ut||kt.morphNormals!==Qt||kt.morphColors!==de||kt.toneMapping!==ue||kt.morphTargetsCount!==ne)&&(ie=!0):(ie=!0,kt.__version=Z.version);let Ke=kt.currentProgram;ie===!0&&(Ke=gs(Z,G,V));let oi=!1,ze=!1,Hi=!1;const fe=Ke.getUniforms(),an=kt.uniforms;if(wt.useProgram(Ke.program)&&(oi=!0,ze=!0,Hi=!0),Z.id!==M&&(M=Z.id,ze=!0),oi||y!==b){wt.buffers.depth.getReversed()?(Q.copy(b.projectionMatrix),Id(Q),Ld(Q),fe.setValue(B,"projectionMatrix",Q)):fe.setValue(B,"projectionMatrix",b.projectionMatrix),fe.setValue(B,"viewMatrix",b.matrixWorldInverse);const bn=fe.map.cameraPosition;bn!==void 0&&bn.setValue(B,vt.setFromMatrixPosition(b.matrixWorld)),Bt.logarithmicDepthBuffer&&fe.setValue(B,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&fe.setValue(B,"isOrthographic",b.isOrthographicCamera===!0),y!==b&&(y=b,ze=!0,Hi=!0)}if(V.isSkinnedMesh){fe.setOptional(B,V,"bindMatrix"),fe.setOptional(B,V,"bindMatrixInverse");const Xe=V.skeleton;Xe&&(Xe.boneTexture===null&&Xe.computeBoneTexture(),fe.setValue(B,"boneTexture",Xe.boneTexture,I))}V.isBatchedMesh&&(fe.setOptional(B,V,"batchingTexture"),fe.setValue(B,"batchingTexture",V._matricesTexture,I),fe.setOptional(B,V,"batchingIdTexture"),fe.setValue(B,"batchingIdTexture",V._indirectTexture,I),fe.setOptional(B,V,"batchingColorTexture"),V._colorsTexture!==null&&fe.setValue(B,"batchingColorTexture",V._colorsTexture,I));const Wi=j.morphAttributes;if((Wi.position!==void 0||Wi.normal!==void 0||Wi.color!==void 0)&&bt.update(V,j,Ke),(ze||kt.receiveShadow!==V.receiveShadow)&&(kt.receiveShadow=V.receiveShadow,fe.setValue(B,"receiveShadow",V.receiveShadow)),Z.isMeshGouraudMaterial&&Z.envMap!==null&&(an.envMap.value=Dt,an.flipEnvMap.value=Dt.isCubeTexture&&Dt.isRenderTargetTexture===!1?-1:1),Z.isMeshStandardMaterial&&Z.envMap===null&&G.environment!==null&&(an.envMapIntensity.value=G.environmentIntensity),ze&&(fe.setValue(B,"toneMappingExposure",v.toneMappingExposure),kt.needsLights&&bh(an,Hi),ft&&Z.fog===!0&&mt.refreshFogUniforms(an,ft),mt.refreshMaterialUniforms(an,Z,W,Y,p.state.transmissionRenderTarget[b.id]),Ys.upload(B,Ca(kt),an,I)),Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(Ys.upload(B,Ca(kt),an,I),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&fe.setValue(B,"center",V.center),fe.setValue(B,"modelViewMatrix",V.modelViewMatrix),fe.setValue(B,"normalMatrix",V.normalMatrix),fe.setValue(B,"modelMatrix",V.matrixWorld),Z.isShaderMaterial||Z.isRawShaderMaterial){const Xe=Z.uniformsGroups;for(let bn=0,En=Xe.length;bn<En;bn++){const Ra=Xe[bn];z.update(Ra,Ke),z.bind(Ra,Ke)}}return Ke}function bh(b,G){b.ambientLightColor.needsUpdate=G,b.lightProbe.needsUpdate=G,b.directionalLights.needsUpdate=G,b.directionalLightShadows.needsUpdate=G,b.pointLights.needsUpdate=G,b.pointLightShadows.needsUpdate=G,b.spotLights.needsUpdate=G,b.spotLightShadows.needsUpdate=G,b.rectAreaLights.needsUpdate=G,b.hemisphereLights.needsUpdate=G}function Eh(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(b,G,j){Ct.get(b.texture).__webglTexture=G,Ct.get(b.depthTexture).__webglTexture=j;const Z=Ct.get(b);Z.__hasExternalTextures=!0,Z.__autoAllocateDepthBuffer=j===void 0,Z.__autoAllocateDepthBuffer||Ot.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,G){const j=Ct.get(b);j.__webglFramebuffer=G,j.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(b,G=0,j=0){w=b,E=G,C=j;let Z=!0,V=null,ft=!1,Mt=!1;if(b){const Dt=Ct.get(b);if(Dt.__useDefaultFramebuffer!==void 0)wt.bindFramebuffer(B.FRAMEBUFFER,null),Z=!1;else if(Dt.__webglFramebuffer===void 0)I.setupRenderTarget(b);else if(Dt.__hasExternalTextures)I.rebindTextures(b,Ct.get(b.texture).__webglTexture,Ct.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Ut=b.depthTexture;if(Dt.__boundDepthTexture!==Ut){if(Ut!==null&&Ct.has(Ut)&&(b.width!==Ut.image.width||b.height!==Ut.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(b)}}const Ht=b.texture;(Ht.isData3DTexture||Ht.isDataArrayTexture||Ht.isCompressedArrayTexture)&&(Mt=!0);const qt=Ct.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(qt[G])?V=qt[G][j]:V=qt[G],ft=!0):b.samples>0&&I.useMultisampledRTT(b)===!1?V=Ct.get(b).__webglMultisampledFramebuffer:Array.isArray(qt)?V=qt[j]:V=qt,R.copy(b.viewport),k.copy(b.scissor),F=b.scissorTest}else R.copy(D).multiplyScalar(W).floor(),k.copy(lt).multiplyScalar(W).floor(),F=ut;if(wt.bindFramebuffer(B.FRAMEBUFFER,V)&&Z&&wt.drawBuffers(b,V),wt.viewport(R),wt.scissor(k),wt.setScissorTest(F),ft){const Dt=Ct.get(b.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+G,Dt.__webglTexture,j)}else if(Mt){const Dt=Ct.get(b.texture),Ht=G||0;B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,Dt.__webglTexture,j||0,Ht)}M=-1},this.readRenderTargetPixels=function(b,G,j,Z,V,ft,Mt){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Lt=Ct.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Mt!==void 0&&(Lt=Lt[Mt]),Lt){wt.bindFramebuffer(B.FRAMEBUFFER,Lt);try{const Dt=b.texture,Ht=Dt.format,qt=Dt.type;if(!Bt.textureFormatReadable(Ht)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Bt.textureTypeReadable(qt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=b.width-Z&&j>=0&&j<=b.height-V&&B.readPixels(G,j,Z,V,Vt.convert(Ht),Vt.convert(qt),ft)}finally{const Dt=w!==null?Ct.get(w).__webglFramebuffer:null;wt.bindFramebuffer(B.FRAMEBUFFER,Dt)}}},this.readRenderTargetPixelsAsync=async function(b,G,j,Z,V,ft,Mt){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Lt=Ct.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Mt!==void 0&&(Lt=Lt[Mt]),Lt){const Dt=b.texture,Ht=Dt.format,qt=Dt.type;if(!Bt.textureFormatReadable(Ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Bt.textureTypeReadable(qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(G>=0&&G<=b.width-Z&&j>=0&&j<=b.height-V){wt.bindFramebuffer(B.FRAMEBUFFER,Lt);const Ut=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,Ut),B.bufferData(B.PIXEL_PACK_BUFFER,ft.byteLength,B.STREAM_READ),B.readPixels(G,j,Z,V,Vt.convert(Ht),Vt.convert(qt),0);const Qt=w!==null?Ct.get(w).__webglFramebuffer:null;wt.bindFramebuffer(B.FRAMEBUFFER,Qt);const de=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await Pd(B,de,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,Ut),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,ft),B.deleteBuffer(Ut),B.deleteSync(de),ft}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,G=null,j=0){b.isTexture!==!0&&(es("WebGLRenderer: copyFramebufferToTexture function signature has changed."),G=arguments[0]||null,b=arguments[1]);const Z=Math.pow(2,-j),V=Math.floor(b.image.width*Z),ft=Math.floor(b.image.height*Z),Mt=G!==null?G.x:0,Lt=G!==null?G.y:0;I.setTexture2D(b,0),B.copyTexSubImage2D(B.TEXTURE_2D,j,0,0,Mt,Lt,V,ft),wt.unbindTexture()},this.copyTextureToTexture=function(b,G,j=null,Z=null,V=0){b.isTexture!==!0&&(es("WebGLRenderer: copyTextureToTexture function signature has changed."),Z=arguments[0]||null,b=arguments[1],G=arguments[2],V=arguments[3]||0,j=null);let ft,Mt,Lt,Dt,Ht,qt,Ut,Qt,de;const ue=b.isCompressedTexture?b.mipmaps[V]:b.image;j!==null?(ft=j.max.x-j.min.x,Mt=j.max.y-j.min.y,Lt=j.isBox3?j.max.z-j.min.z:1,Dt=j.min.x,Ht=j.min.y,qt=j.isBox3?j.min.z:0):(ft=ue.width,Mt=ue.height,Lt=ue.depth||1,Dt=0,Ht=0,qt=0),Z!==null?(Ut=Z.x,Qt=Z.y,de=Z.z):(Ut=0,Qt=0,de=0);const ke=Vt.convert(G.format),ne=Vt.convert(G.type);let kt;G.isData3DTexture?(I.setTexture3D(G,0),kt=B.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(I.setTexture2DArray(G,0),kt=B.TEXTURE_2D_ARRAY):(I.setTexture2D(G,0),kt=B.TEXTURE_2D),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,G.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,G.unpackAlignment);const fn=B.getParameter(B.UNPACK_ROW_LENGTH),ie=B.getParameter(B.UNPACK_IMAGE_HEIGHT),Ke=B.getParameter(B.UNPACK_SKIP_PIXELS),oi=B.getParameter(B.UNPACK_SKIP_ROWS),ze=B.getParameter(B.UNPACK_SKIP_IMAGES);B.pixelStorei(B.UNPACK_ROW_LENGTH,ue.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,ue.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Dt),B.pixelStorei(B.UNPACK_SKIP_ROWS,Ht),B.pixelStorei(B.UNPACK_SKIP_IMAGES,qt);const Hi=b.isDataArrayTexture||b.isData3DTexture,fe=G.isDataArrayTexture||G.isData3DTexture;if(b.isRenderTargetTexture||b.isDepthTexture){const an=Ct.get(b),Wi=Ct.get(G),Xe=Ct.get(an.__renderTarget),bn=Ct.get(Wi.__renderTarget);wt.bindFramebuffer(B.READ_FRAMEBUFFER,Xe.__webglFramebuffer),wt.bindFramebuffer(B.DRAW_FRAMEBUFFER,bn.__webglFramebuffer);for(let En=0;En<Lt;En++)Hi&&B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ct.get(b).__webglTexture,V,qt+En),b.isDepthTexture?(fe&&B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ct.get(G).__webglTexture,V,de+En),B.blitFramebuffer(Dt,Ht,ft,Mt,Ut,Qt,ft,Mt,B.DEPTH_BUFFER_BIT,B.NEAREST)):fe?B.copyTexSubImage3D(kt,V,Ut,Qt,de+En,Dt,Ht,ft,Mt):B.copyTexSubImage2D(kt,V,Ut,Qt,de+En,Dt,Ht,ft,Mt);wt.bindFramebuffer(B.READ_FRAMEBUFFER,null),wt.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else fe?b.isDataTexture||b.isData3DTexture?B.texSubImage3D(kt,V,Ut,Qt,de,ft,Mt,Lt,ke,ne,ue.data):G.isCompressedArrayTexture?B.compressedTexSubImage3D(kt,V,Ut,Qt,de,ft,Mt,Lt,ke,ue.data):B.texSubImage3D(kt,V,Ut,Qt,de,ft,Mt,Lt,ke,ne,ue):b.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,V,Ut,Qt,ft,Mt,ke,ne,ue.data):b.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,V,Ut,Qt,ue.width,ue.height,ke,ue.data):B.texSubImage2D(B.TEXTURE_2D,V,Ut,Qt,ft,Mt,ke,ne,ue);B.pixelStorei(B.UNPACK_ROW_LENGTH,fn),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,ie),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Ke),B.pixelStorei(B.UNPACK_SKIP_ROWS,oi),B.pixelStorei(B.UNPACK_SKIP_IMAGES,ze),V===0&&G.generateMipmaps&&B.generateMipmap(kt),wt.unbindTexture()},this.copyTextureToTexture3D=function(b,G,j=null,Z=null,V=0){return b.isTexture!==!0&&(es("WebGLRenderer: copyTextureToTexture3D function signature has changed."),j=arguments[0]||null,Z=arguments[1]||null,b=arguments[2],G=arguments[3],V=arguments[4]||0),es('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,G,j,Z,V)},this.initRenderTarget=function(b){Ct.get(b).__webglFramebuffer===void 0&&I.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?I.setTextureCube(b,0):b.isData3DTexture?I.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?I.setTexture2DArray(b,0):I.setTexture2D(b,0),wt.unbindTexture()},this.resetState=function(){E=0,C=0,w=null,wt.reset(),ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return yn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Jt._getUnpackColorSpace()}}class nr{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Wt(t),this.density=e}clone(){return new nr(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class H0 extends xe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new on,this.environmentIntensity=1,this.environmentRotation=new on,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class W0 extends Ee{constructor(t=null,e=1,n=1,i,r,o,a,c,l=We,h=We,d,u){super(null,o,a,c,l,h,i,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ac extends je{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Si=new te,Rc=new te,Os=[],Pc=new ni,X0=new te,Zi=new A,Ki=new zi;class Bs extends A{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Ac(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,X0)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new ni),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Si),Pc.copy(t.boundingBox).applyMatrix4(Si),this.boundingBox.union(Pc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new zi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Si),Ki.copy(t.boundingSphere).applyMatrix4(Si),this.boundingSphere.union(Ki)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(Zi.geometry=this.geometry,Zi.material=this.material,Zi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ki.copy(this.boundingSphere),Ki.applyMatrix4(n),t.ray.intersectsSphere(Ki)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Si),Rc.multiplyMatrices(n,Si),Zi.matrixWorld=Rc,Zi.raycast(t,Os);for(let o=0,a=Os.length;o<a;o++){const c=Os[o];c.instanceId=r,c.object=this,e.push(c)}Os.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Ac(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new W0(new Float32Array(i*this.count),i,this.count,ia,dn));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=i*t;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Il extends Gi{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Wt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Ic=new te,Oo=new gl,zs=new zi,Gs=new P;class $0 extends xe{constructor(t=new ge,e=new Il){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),zs.copy(n.boundingSphere),zs.applyMatrix4(i),zs.radius+=r,t.ray.intersectsSphere(zs)===!1)return;Ic.copy(i).invert(),Oo.copy(t.ray).applyMatrix4(Ic);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,d=n.attributes.position;if(l!==null){const u=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let g=u,_=f;g<_;g++){const m=l.getX(g);Gs.fromBufferAttribute(d,m),Lc(Gs,m,c,i,t,e,this)}}else{const u=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let g=u,_=f;g<_;g++)Gs.fromBufferAttribute(d,g),Lc(Gs,g,c,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Lc(s,t,e,n,i,r,o){const a=Oo.distanceSqToPoint(s);if(a<e){const c=new P;Oo.closestPointToPoint(s,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Re extends Ee{constructor(t,e,n,i,r,o,a,c,l){super(t,e,n,i,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Tn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-o,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===o)return i/(r-1);const h=n[i],u=n[i+1]-h,f=(o-h)/u;return(i+f)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const o=this.getPoint(i),a=this.getPoint(r),c=e||(o.isVector2?new Ft:new P);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new P,i=[],r=[],o=[],a=new P,c=new te;for(let f=0;f<=t;f++){const g=f/t;i[f]=this.getTangentAt(g,new P)}r[0]=new P,o[0]=new P;let l=Number.MAX_VALUE;const h=Math.abs(i[0].x),d=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),u<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(be(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,g))}o[f].crossVectors(i[f],r[f])}if(e===!0){let f=Math.acos(be(r[0].dot(r[t]),-1,1));f/=t,i[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(i[g],f*g)),o[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Ll extends Tn{constructor(t=0,e=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new Ft){const n=e,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=c-this.aX,f=l-this.aY;c=u*h-f*d+this.aX,l=u*d+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class q0 extends Ll{constructor(t,e,n,i,r,o){super(t,e,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function ha(){let s=0,t=0,e=0,n=0;function i(r,o,a,c){s=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){i(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,d){let u=(o-r)/l-(a-r)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+d)+(c-a)/d;u*=h,f*=h,i(o,a,u,f)},calc:function(r){const o=r*r,a=o*r;return s+t*r+e*o+n*a}}}const Vs=new P,Gr=new ha,Vr=new ha,Hr=new ha;class Bo extends Tn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new P){const n=e,i=this.points,r=i.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=i[(a-1)%r]:(Vs.subVectors(i[0],i[1]).add(i[0]),l=Vs);const d=i[a%r],u=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(Vs.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Vs),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Gr.initNonuniformCatmullRom(l.x,d.x,u.x,h.x,g,_,m),Vr.initNonuniformCatmullRom(l.y,d.y,u.y,h.y,g,_,m),Hr.initNonuniformCatmullRom(l.z,d.z,u.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(Gr.initCatmullRom(l.x,d.x,u.x,h.x,this.tension),Vr.initCatmullRom(l.y,d.y,u.y,h.y,this.tension),Hr.initCatmullRom(l.z,d.z,u.z,h.z,this.tension));return n.set(Gr.calc(c),Vr.calc(c),Hr.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new P().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Dc(s,t,e,n,i){const r=(n-t)*.5,o=(i-e)*.5,a=s*s,c=s*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*s+e}function Y0(s,t){const e=1-s;return e*e*t}function j0(s,t){return 2*(1-s)*s*t}function Z0(s,t){return s*s*t}function os(s,t,e,n){return Y0(s,t)+j0(s,e)+Z0(s,n)}function K0(s,t){const e=1-s;return e*e*e*t}function J0(s,t){const e=1-s;return 3*e*e*s*t}function Q0(s,t){return 3*(1-s)*s*s*t}function tg(s,t){return s*s*s*t}function as(s,t,e,n,i){return K0(s,t)+J0(s,e)+Q0(s,n)+tg(s,i)}class eg extends Tn{constructor(t=new Ft,e=new Ft,n=new Ft,i=new Ft){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new Ft){const n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(as(t,i.x,r.x,o.x,a.x),as(t,i.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class ng extends Tn{constructor(t=new P,e=new P,n=new P,i=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new P){const n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(as(t,i.x,r.x,o.x,a.x),as(t,i.y,r.y,o.y,a.y),as(t,i.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class ig extends Tn{constructor(t=new Ft,e=new Ft){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Ft){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Ft){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class sg extends Tn{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class rg extends Tn{constructor(t=new Ft,e=new Ft,n=new Ft){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Ft){const n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(os(t,i.x,r.x,o.x),os(t,i.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Dl extends Tn{constructor(t=new P,e=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new P){const n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(os(t,i.x,r.x,o.x),os(t,i.y,r.y,o.y),os(t,i.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class og extends Tn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Ft){const n=e,i=this.points,r=(i.length-1)*t,o=Math.floor(r),a=r-o,c=i[o===0?o:o-1],l=i[o],h=i[o>i.length-2?i.length-1:o+1],d=i[o>i.length-3?i.length-1:o+2];return n.set(Dc(a,c.x,l.x,h.x,d.x),Dc(a,c.y,l.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new Ft().fromArray(i))}return this}}var ag=Object.freeze({__proto__:null,ArcCurve:q0,CatmullRomCurve3:Bo,CubicBezierCurve:eg,CubicBezierCurve3:ng,EllipseCurve:Ll,LineCurve:ig,LineCurve3:sg,QuadraticBezierCurve:rg,QuadraticBezierCurve3:Dl,SplineCurve:og});class rn extends ge{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],o=[],a=[],c=[],l=new P,h=new Ft;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){const f=n+d/e*i;l.x=t*Math.cos(f),l.y=t*Math.sin(f),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[u]/t+1)/2,h.y=(o[u+1]/t+1)/2,c.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new Zt(o,3)),this.setAttribute("normal",new Zt(a,3)),this.setAttribute("uv",new Zt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new rn(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Gt extends ge{constructor(t=1,e=1,n=1,i=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;i=Math.floor(i),r=Math.floor(r);const h=[],d=[],u=[],f=[];let g=0;const _=[],m=n/2;let p=0;x(),o===!1&&(t>0&&S(!0),e>0&&S(!1)),this.setIndex(h),this.setAttribute("position",new Zt(d,3)),this.setAttribute("normal",new Zt(u,3)),this.setAttribute("uv",new Zt(f,2));function x(){const v=new P,L=new P;let E=0;const C=(e-t)/n;for(let w=0;w<=r;w++){const M=[],y=w/r,R=y*(e-t)+t;for(let k=0;k<=i;k++){const F=k/i,H=F*c+a,O=Math.sin(H),U=Math.cos(H);L.x=R*O,L.y=-y*n+m,L.z=R*U,d.push(L.x,L.y,L.z),v.set(O,C,U).normalize(),u.push(v.x,v.y,v.z),f.push(F,1-y),M.push(g++)}_.push(M)}for(let w=0;w<i;w++)for(let M=0;M<r;M++){const y=_[M][w],R=_[M+1][w],k=_[M+1][w+1],F=_[M][w+1];(t>0||M!==0)&&(h.push(y,R,F),E+=3),(e>0||M!==r-1)&&(h.push(R,k,F),E+=3)}l.addGroup(p,E,0),p+=E}function S(v){const L=g,E=new Ft,C=new P;let w=0;const M=v===!0?t:e,y=v===!0?1:-1;for(let k=1;k<=i;k++)d.push(0,m*y,0),u.push(0,y,0),f.push(.5,.5),g++;const R=g;for(let k=0;k<=i;k++){const H=k/i*c+a,O=Math.cos(H),U=Math.sin(H);C.x=M*U,C.y=m*y,C.z=M*O,d.push(C.x,C.y,C.z),u.push(0,y,0),E.x=O*.5+.5,E.y=U*.5*y+.5,f.push(E.x,E.y),g++}for(let k=0;k<i;k++){const F=L+k,H=R+k;v===!0?h.push(H,H+1,F):h.push(H+1,H,F),w+=3}l.addGroup(p,w,v===!0?1:2),p+=w}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Gt(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class qe extends Gt{constructor(t=1,e=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new qe(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class lr extends ge{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const r=[],o=[];a(i),l(n),h(),this.setAttribute("position",new Zt(r,3)),this.setAttribute("normal",new Zt(r.slice(),3)),this.setAttribute("uv",new Zt(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(x){const S=new P,v=new P,L=new P;for(let E=0;E<e.length;E+=3)f(e[E+0],S),f(e[E+1],v),f(e[E+2],L),c(S,v,L,x)}function c(x,S,v,L){const E=L+1,C=[];for(let w=0;w<=E;w++){C[w]=[];const M=x.clone().lerp(v,w/E),y=S.clone().lerp(v,w/E),R=E-w;for(let k=0;k<=R;k++)k===0&&w===E?C[w][k]=M:C[w][k]=M.clone().lerp(y,k/R)}for(let w=0;w<E;w++)for(let M=0;M<2*(E-w)-1;M++){const y=Math.floor(M/2);M%2===0?(u(C[w][y+1]),u(C[w+1][y]),u(C[w][y])):(u(C[w][y+1]),u(C[w+1][y+1]),u(C[w+1][y]))}}function l(x){const S=new P;for(let v=0;v<r.length;v+=3)S.x=r[v+0],S.y=r[v+1],S.z=r[v+2],S.normalize().multiplyScalar(x),r[v+0]=S.x,r[v+1]=S.y,r[v+2]=S.z}function h(){const x=new P;for(let S=0;S<r.length;S+=3){x.x=r[S+0],x.y=r[S+1],x.z=r[S+2];const v=m(x)/2/Math.PI+.5,L=p(x)/Math.PI+.5;o.push(v,1-L)}g(),d()}function d(){for(let x=0;x<o.length;x+=6){const S=o[x+0],v=o[x+2],L=o[x+4],E=Math.max(S,v,L),C=Math.min(S,v,L);E>.9&&C<.1&&(S<.2&&(o[x+0]+=1),v<.2&&(o[x+2]+=1),L<.2&&(o[x+4]+=1))}}function u(x){r.push(x.x,x.y,x.z)}function f(x,S){const v=x*3;S.x=t[v+0],S.y=t[v+1],S.z=t[v+2]}function g(){const x=new P,S=new P,v=new P,L=new P,E=new Ft,C=new Ft,w=new Ft;for(let M=0,y=0;M<r.length;M+=9,y+=6){x.set(r[M+0],r[M+1],r[M+2]),S.set(r[M+3],r[M+4],r[M+5]),v.set(r[M+6],r[M+7],r[M+8]),E.set(o[y+0],o[y+1]),C.set(o[y+2],o[y+3]),w.set(o[y+4],o[y+5]),L.copy(x).add(S).add(v).divideScalar(3);const R=m(L);_(E,y+0,x,R),_(C,y+2,S,R),_(w,y+4,v,R)}}function _(x,S,v,L){L<0&&x.x===1&&(o[S]=x.x-1),v.x===0&&v.z===0&&(o[S]=L/2/Math.PI+.5)}function m(x){return Math.atan2(x.z,-x.x)}function p(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new lr(t.vertices,t.indices,t.radius,t.details)}}class da extends lr{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new da(t.radius,t.detail)}}class ua extends lr{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new ua(t.radius,t.detail)}}class Ei extends ge{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],d=new P,u=new P,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const x=[],S=p/n;let v=0;p===0&&o===0?v=.5/e:p===n&&c===Math.PI&&(v=-.5/e);for(let L=0;L<=e;L++){const E=L/e;d.x=-t*Math.cos(i+E*r)*Math.sin(o+S*a),d.y=t*Math.cos(o+S*a),d.z=t*Math.sin(i+E*r)*Math.sin(o+S*a),g.push(d.x,d.y,d.z),u.copy(d).normalize(),_.push(u.x,u.y,u.z),m.push(E+v,1-S),x.push(l++)}h.push(x)}for(let p=0;p<n;p++)for(let x=0;x<e;x++){const S=h[p][x+1],v=h[p][x],L=h[p+1][x],E=h[p+1][x+1];(p!==0||o>0)&&f.push(S,v,E),(p!==n-1||c<Math.PI)&&f.push(v,L,E)}this.setIndex(f),this.setAttribute("position",new Zt(g,3)),this.setAttribute("normal",new Zt(_,3)),this.setAttribute("uv",new Zt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ei(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Te extends ge{constructor(t=1,e=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],c=[],l=[],h=new P,d=new P,u=new P;for(let f=0;f<=n;f++)for(let g=0;g<=i;g++){const _=g/i*r,m=f/n*Math.PI*2;d.x=(t+e*Math.cos(m))*Math.cos(_),d.y=(t+e*Math.cos(m))*Math.sin(_),d.z=e*Math.sin(m),a.push(d.x,d.y,d.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),u.subVectors(d,h).normalize(),c.push(u.x,u.y,u.z),l.push(g/i),l.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=i;g++){const _=(i+1)*f+g-1,m=(i+1)*(f-1)+g-1,p=(i+1)*(f-1)+g,x=(i+1)*f+g;o.push(_,m,x),o.push(m,p,x)}this.setIndex(o),this.setAttribute("position",new Zt(a,3)),this.setAttribute("normal",new Zt(c,3)),this.setAttribute("uv",new Zt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Te(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class fa extends ge{constructor(t=new Dl(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),e=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:i,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new P,c=new P,l=new Ft;let h=new P;const d=[],u=[],f=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new Zt(d,3)),this.setAttribute("normal",new Zt(u,3)),this.setAttribute("uv",new Zt(f,2));function _(){for(let S=0;S<e;S++)m(S);m(r===!1?e:0),x(),p()}function m(S){h=t.getPointAt(S/e,h);const v=o.normals[S],L=o.binormals[S];for(let E=0;E<=i;E++){const C=E/i*Math.PI*2,w=Math.sin(C),M=-Math.cos(C);c.x=M*v.x+w*L.x,c.y=M*v.y+w*L.y,c.z=M*v.z+w*L.z,c.normalize(),u.push(c.x,c.y,c.z),a.x=h.x+n*c.x,a.y=h.y+n*c.y,a.z=h.z+n*c.z,d.push(a.x,a.y,a.z)}}function p(){for(let S=1;S<=e;S++)for(let v=1;v<=i;v++){const L=(i+1)*(S-1)+(v-1),E=(i+1)*S+(v-1),C=(i+1)*S+v,w=(i+1)*(S-1)+v;g.push(L,E,w),g.push(E,C,w)}}function x(){for(let S=0;S<=e;S++)for(let v=0;v<=i;v++)l.x=S/e,l.y=v/i,f.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new fa(new ag[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class Et extends Gi{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Wt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Wt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=dl,this.normalScale=new Ft(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Wr extends Et{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ft(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return be(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Wt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Wt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Wt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}const Uc={enabled:!1,files:{},add:function(s,t){this.enabled!==!1&&(this.files[s]=t)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class cg{constructor(t,e,n){const i=this;let r=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,d){return l.push(h,d),this},this.removeHandler=function(h){const d=l.indexOf(h);return d!==-1&&l.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=l.length;d<u;d+=2){const f=l[d],g=l[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}}const lg=new cg;class pa{constructor(t){this.manager=t!==void 0?t:lg,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}pa.DEFAULT_MATERIAL_NAME="__DEFAULT";class hg extends pa{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=Uc.get(t);if(o!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o;const a=us("img");function c(){h(),Uc.add(t,this),e&&e(this),r.manager.itemEnd(t)}function l(d){h(),i&&i(d),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(t),a.src=t,a}}class Ul extends pa{constructor(t){super(t)}load(t,e,n,i){const r=new Ee,o=new hg(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,i),r}}class hr extends xe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Wt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const Xr=new te,Nc=new P,kc=new P;class ma{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ft(512,512),this.map=null,this.mapPass=null,this.matrix=new te,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ca,this._frameExtents=new Ft(1,1),this._viewportCount=1,this._viewports=[new ae(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Nc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Nc),kc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(kc),e.updateMatrixWorld(),Xr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Xr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Xr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class dg extends ma{constructor(){super(new Oe(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,n=Ni*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;(n!==e.fov||i!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=i,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class cs extends hr{constructor(t,e,n=0,i=Math.PI/3,r=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.target=new xe,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new dg}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const Fc=new te,Ji=new P,$r=new P;class ug extends ma{constructor(){super(new Oe(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ft(4,2),this._viewportCount=6,this._viewports=[new ae(2,1,1,1),new ae(0,1,1,1),new ae(3,1,1,1),new ae(1,1,1,1),new ae(3,0,1,1),new ae(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Ji.setFromMatrixPosition(t.matrixWorld),n.position.copy(Ji),$r.copy(n.position),$r.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt($r),n.updateMatrixWorld(),i.makeTranslation(-Ji.x,-Ji.y,-Ji.z),Fc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Fc)}}class qr extends hr{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new ug}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class fg extends ma{constructor(){super(new El(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Yr extends hr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.target=new xe,this.shadow=new fg}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Oc extends hr{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class pg{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Bc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Bc();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Bc(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Qo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Qo);const mg=new P(0,1,0),Mi=new P(0,0,1);class gg{constructor(t,e){this.scene=t,this.def=e,this.theme=e.theme||{},this.trackWidth=e.trackWidth||20,this.kerbWidth=1.2,this.roadWidth=this.trackWidth-this.kerbWidth*2,this.wallHeight=1,this.maxAllowedLateral=this.trackWidth/2-.9,this.group=new le,this.group.name=`Track:${e.id}`,this.scene.add(this.group),this.checkpoints=[],this.sectorCount=16,this.boostPads=[],this.startLightMats=[],this.brakeZones=[],this.initSpline(),this.buildSamples(),this.buildRoadMesh(),this.buildKerbs(),this.buildCrashBarriers(),this.buildStartFinishLine(),this.buildBrakeDistanceMarkers(),this.buildTireBarriers(),this.buildCheckpoints(),this.buildBoostPads()}initSpline(){const t=this.def.points.map(([e,n])=>new P(e,0,n));this.spline=new Bo(t,!0,"centripetal",.5),this.spline.arcLengthDivisions=3e3,this.trackLength=this.spline.getLength()}buildSamples(){const t=Math.max(400,Math.ceil(this.trackLength/2));this.sampleCount=t,this.sampleSpacing=this.trackLength/t,this.samplePos=new Array(t),this.sampleTan=new Array(t),this.sampleNorm=new Array(t),this.sampleCurv=new Float32Array(t);for(let i=0;i<t;i++){const r=i/t,o=this.spline.getPointAt(r);o.y=0;const a=this.spline.getTangentAt(r);a.y=0,a.normalize(),this.samplePos[i]=o,this.sampleTan[i]=a,this.sampleNorm[i]=new P().crossVectors(mg,a).normalize()}const e=new Float32Array(t),n=3;for(let i=0;i<t;i++){const r=this.sampleTan[(i-n+t)%t],o=this.sampleTan[(i+n)%t],a=Math.atan2(r.z*o.x-r.x*o.z,r.x*o.x+r.z*o.z);e[i]=a/(2*n*this.sampleSpacing)}for(let i=0;i<t;i++){let r=0;for(let o=-2;o<=2;o++)r+=e[(i+o+t)%t];this.sampleCurv[i]=r/5}}wrapIndex(t){const e=this.sampleCount;return(Math.round(t)%e+e)%e}indexFromT(t){return this.wrapIndex((t%1+1)%1*this.sampleCount)}getPositionAt(t,e=0,n=new P){const i=this.indexFromT(t);return n.copy(this.samplePos[i]).addScaledVector(this.sampleNorm[i],e)}getClosest(t,e=-1){const n=this.sampleCount,i=this.samplePos;let r=-1,o=1/0;if(e>=0){for(let S=-36;S<=36;S++){const v=(e+S+n)%n,L=t.x-i[v].x,E=t.z-i[v].z,C=L*L+E*E;C<o&&(o=C,r=v)}const x=this.trackWidth*2.5;o>x*x&&(r=-1)}if(r<0){o=1/0;for(let p=0;p<n;p++){const x=t.x-i[p].x,S=t.z-i[p].z,v=x*x+S*S;v<o&&(o=v,r=p)}}let a=r,c=this.projectFrac(t,r,(r+1)%n);c<0&&(a=(r-1+n)%n,c=this.projectFrac(t,a,r)),c=Math.min(1,Math.max(0,c));const l=i[a],h=i[(a+1)%n],d=new P(l.x+(h.x-l.x)*c,0,l.z+(h.z-l.z)*c),u=this.sampleTan[r],f=this.sampleNorm[r],g=t.x-d.x,_=t.z-d.z,m=g*f.x+_*f.z;return{index:r,t:(a+c)/n,point:d,tangent:u,normal:f,lateral:m,distance:Math.sqrt(g*g+_*_)}}projectFrac(t,e,n){const i=this.samplePos[e],r=this.samplePos[n],o=r.x-i.x,a=r.z-i.z,c=o*o+a*a||1;return((t.x-i.x)*o+(t.z-i.z)*a)/c}getClosestPointAndT(t,e=-1){return this.getClosest(t,e)}getRespawnTransform(t,e=0){const n=this.indexFromT(t),i=this.sampleTan[n],r=this.samplePos[n].clone().addScaledVector(this.sampleNorm[n],e);return r.y=.05,{position:r,rotationY:Math.atan2(i.x,i.z),index:n}}distanceToCentreLine(t,e,n=2){let i=1/0;for(let r=0;r<this.sampleCount;r+=n){const o=this.samplePos[r],a=t-o.x,c=e-o.z,l=a*a+c*c;l<i&&(i=l)}return Math.sqrt(i)}isClearOfTrack(t,e,n=6){return this.distanceToCentreLine(t,e)>this.trackWidth/2+n}getBounds(){let t=1/0,e=-1/0,n=1/0,i=-1/0;for(const r of this.samplePos)r.x<t&&(t=r.x),r.x>e&&(e=r.x),r.z<n&&(n=r.z),r.z>i&&(i=r.z);return{minX:t,maxX:e,minZ:n,maxZ:i,cx:(t+e)/2,cz:(n+i)/2}}buildStrip(t,e,n,i,r,o,a=!1){const c=this.sampleCount,l=[],h=[],d=[];let u=0;for(let _=0;_<=c;_++){const m=_%c;_>0&&(u+=this.sampleSpacing);const p=this.samplePos[m],x=this.sampleNorm[m],S=u/r;if(a){const v=p.x+x.x*t,L=p.z+x.z*t;l.push(v,n,L,v,i,L),h.push(S,0,S,1)}else l.push(p.x+x.x*t,n,p.z+x.z*t),l.push(p.x+x.x*e,i,p.z+x.z*e),h.push(0,S,1,S);if(_<c){const v=_*2;d.push(v,v+1,v+2,v+1,v+3,v+2)}}const f=new ge;f.setAttribute("position",new Zt(l,3)),f.setAttribute("uv",new Zt(h,2)),f.setIndex(d),f.computeVertexNormals();const g=new A(f,o);return this.group.add(g),g}buildRoadMesh(){const t=document.createElement("canvas");t.width=512,t.height=512;const e=t.getContext("2d");e.fillStyle=this.theme.tarmac||"#1c1e24",e.fillRect(0,0,512,512);for(let o=0;o<6e3;o++){const a=Math.random();e.fillStyle=a>.66?"rgba(0,0,0,0.35)":a>.33?"rgba(255,255,255,0.05)":"rgba(255,255,255,0.09)",e.fillRect(Math.random()*512,Math.random()*512,2,2)}[[110,190],[322,402]].forEach(([o,a])=>{const c=e.createLinearGradient(o,0,a,0);c.addColorStop(0,"rgba(0,0,0,0)"),c.addColorStop(.5,"rgba(0,0,0,0.35)"),c.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=c,e.fillRect(o,0,a-o,512)}),e.fillStyle="#f2f2f2",e.fillRect(14,0,10,512),e.fillRect(488,0,10,512),e.fillRect(250,0,12,256);const n=new Re(t);n.wrapS=He,n.wrapT=ln,n.colorSpace=pe,n.anisotropy=8;const i=new Et({map:n,roughness:.82,metalness:.05,side:Ue}),r=this.roadWidth/2;this.trackMesh=this.buildStrip(-r,r,.05,.05,14,i),this.trackMesh.receiveShadow=!0}buildKerbs(){const t=document.createElement("canvas");t.width=64,t.height=128;const e=t.getContext("2d");e.fillStyle="#d21424",e.fillRect(0,0,64,64),e.fillStyle="#f0f2f5",e.fillRect(0,64,64,64);const n=new Re(t);n.wrapS=He,n.wrapT=ln,n.colorSpace=pe;const i=new Et({map:n,roughness:.6,metalness:.1,side:Ue,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),r=this.roadWidth/2,o=this.kerbWidth;this.kerbMeshL=this.buildStrip(-r-o,-r,.055,.055,6,i),this.kerbMeshR=this.buildStrip(r,r+o,.055,.055,6,i),this.kerbMeshL.receiveShadow=!0,this.kerbMeshR.receiveShadow=!0}buildCrashBarriers(){const t=document.createElement("canvas");t.width=1024,t.height=256;const e=t.getContext("2d");e.fillStyle="#2f343f",e.fillRect(0,0,1024,256);for(let a=0;a<1024;a+=32)e.fillStyle=a/32%2===0?"#ffd700":"#111111",e.fillRect(a,0,32,36);[{text:"ASHI GRAND PRIX",bg:"#00f3ff",color:"#000000"},{text:this.def.name.toUpperCase(),bg:"#ff0055",color:"#ffffff"},{text:"PIRELLI RACING",bg:"#ffd700",color:"#d21424"},{text:"ASHI LANE 3D",bg:"#7928ca",color:"#00f3ff"}].forEach((a,c)=>{const h=c*256;e.fillStyle=a.bg,e.fillRect(h+8,60,240,150),e.fillStyle=a.color,e.font="bold 26px sans-serif",e.textAlign="center",e.textBaseline="middle";let d=26;for(;e.measureText(a.text).width>228&&d>12;)d-=2,e.font=`bold ${d}px sans-serif`;e.fillText(a.text,h+256/2,135)});const i=new Re(t);i.wrapS=ln,i.wrapT=He,i.colorSpace=pe;const r=new Et({map:i,roughness:.65,metalness:.25,side:Ue}),o=this.trackWidth/2;[-o,o].forEach((a,c)=>{const l=this.buildStrip(a,a,0,this.wallHeight,8,r,!0);l.castShadow=!0,l.receiveShadow=!0;const h=[];for(let g=0;g<this.sampleCount;g+=2){const _=this.samplePos[g],m=this.sampleNorm[g];h.push(new P(_.x+m.x*a,this.wallHeight,_.z+m.z*a))}const d=new Bo(h,!0),u=new fa(d,Math.min(1200,h.length),.08,5,!0),f=new Nt({color:c===0?this.theme.railA??16711765:this.theme.railB??62463});this.group.add(new A(u,f))})}buildStartFinishLine(){const t=this.samplePos[0],e=this.sampleTan[0],n=this.sampleNorm[0],i=document.createElement("canvas");i.width=512,i.height=128;const r=i.getContext("2d");for(let h=0;h<512;h+=32)for(let d=0;d<128;d+=32)r.fillStyle=(Math.floor(h/32)+Math.floor(d/32))%2===0?"#ffffff":"#111111",r.fillRect(h,d,32,32);const o=new Re(i);o.colorSpace=pe;const a=new he(this.roadWidth,4);a.rotateX(-Math.PI/2);const c=new A(a,new Et({map:o,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}));c.quaternion.setFromUnitVectors(Mi,e),c.position.set(t.x,.07,t.z),c.receiveShadow=!0,this.group.add(c);const l=new Nt({color:16777215,transparent:!0,opacity:.55});for(let h=0;h<8;h++){const d=Math.floor(h/2),f=(h%2===0?-1:1)*this.trackWidth*.2,g=12+d*10,_=t.clone().addScaledVector(e,-g).addScaledVector(n,f),m=new A(new he(3,.35).rotateX(-Math.PI/2),l);m.quaternion.setFromUnitVectors(Mi,e),m.position.set(_.x,.07,_.z).addScaledVector(e,2.6),this.group.add(m)}this.buildStartGantry(t,e,n)}buildStartGantry(t,e,n){const i=new le,r=this.trackWidth/2+1.2,o=e.clone().negate(),a=new Et({color:2040362,metalness:.85,roughness:.3}),c=new Et({color:1118484,metalness:.9,roughness:.2}),l=new Gt(.5,.6,9.5,12),h=new A(l,a);h.position.copy(t).addScaledVector(n,-r),h.position.y=4.75;const d=new A(l,a);d.position.copy(t).addScaledVector(n,r),d.position.y=4.75;const u=new A(new $(this.trackWidth+4,1.6,1.4),a);u.position.set(t.x,9.5,t.z),u.quaternion.setFromUnitVectors(new P(1,0,0),n);const f=new le,g=new rn(.35,16);for(let L=0;L<5;L++){const E=new Nt({color:2228228});this.startLightMats.push(E);const C=new A(new $(1.2,1.8,.5),c);C.position.set((L-2)*1.8,0,.8);const w=new A(g,E);w.position.set(0,.4,.26);const M=new A(g,E);M.position.set(0,-.4,.26),C.add(w,M),f.add(C)}f.position.set(t.x,8.4,t.z),f.quaternion.setFromUnitVectors(Mi,o);const _=document.createElement("canvas");_.width=512,_.height=128;const m=_.getContext("2d");m.fillStyle="#0a0d18",m.fillRect(0,0,512,128),m.strokeStyle="#00f3ff",m.lineWidth=6,m.strokeRect(6,6,500,116),m.textAlign="center";let p=36;m.font=`bold ${p}px sans-serif`;const x=this.def.name.toUpperCase();for(;m.measureText(x).width>470&&p>16;)p-=2,m.font=`bold ${p}px sans-serif`;m.fillStyle="#ff0055",m.fillText(x,256,56),m.font="bold 22px sans-serif",m.fillStyle="#00f3ff",m.fillText("START / FINISH",256,96);const S=new Re(_);S.colorSpace=pe;const v=new A(new he(12,2.2),new Nt({map:S}));v.position.set(t.x,10.9,t.z).addScaledVector(o,.75),v.quaternion.setFromUnitVectors(Mi,o),i.add(h,d,u,f,v),this.group.add(i)}setStartLights(t,e=!1){this.startLightMats.forEach((n,i)=>{e?n.color.setHex(65382):n.color.setHex(i<t?16711714:2228228)})}findCorners(t=5,e=.012){const n=this.sampleCount,i=Math.round(60/this.sampleSpacing),r=[];for(let o=0;o<n;o++){const a=Math.abs(this.sampleCurv[o]);if(a<e)continue;let c=!0;for(let l=-i;l<=i;l++)if(l!==0&&Math.abs(this.sampleCurv[(o+l+n)%n])>a){c=!1;break}c&&r.push({index:o,curv:this.sampleCurv[o]})}return r.sort((o,a)=>Math.abs(a.curv)-Math.abs(o.curv)),r.slice(0,t)}buildBrakeDistanceMarkers(){const t=this.findCorners(5,.015);this.brakeZones=t;const e=this.trackWidth/2,n=new $(1.6,1.4,.2),i={};t.forEach(r=>{const o=-Math.sign(r.curv)||1;[150,100,50].forEach(a=>{const c=this.wrapIndex(r.index-a/this.sampleSpacing-25/this.sampleSpacing),l=this.samplePos[c],h=this.sampleTan[c],d=this.sampleNorm[c];if(!i[a]){const f=document.createElement("canvas");f.width=128,f.height=128;const g=f.getContext("2d");g.fillStyle="#ffffff",g.fillRect(0,0,128,128),g.fillStyle="#000000",g.font="900 64px sans-serif",g.textAlign="center",g.textBaseline="middle",g.fillText(`${a}`,64,64),i[a]=new Re(f),i[a].colorSpace=pe}const u=new A(n,new Et({map:i[a]}));u.position.set(l.x+d.x*o*(e+1.4),1.2,l.z+d.z*o*(e+1.4)),u.quaternion.setFromUnitVectors(Mi,h.clone().negate()),this.group.add(u)})})}buildTireBarriers(){const t=new Et({color:1315862,roughness:.9}),e=new Te(.4,.16,6,12);e.rotateX(Math.PI/2);const n=this.trackWidth/2;this.brakeZones.forEach(i=>{const r=-Math.sign(i.curv)||1;for(let o=-3;o<=3;o++){const a=this.wrapIndex(i.index+o*(4/this.sampleSpacing)),c=this.samplePos[a],l=this.sampleNorm[a],h=new P(c.x+l.x*r*(n+1),0,c.z+l.z*r*(n+1));for(let d=0;d<3;d++){const u=new A(e,t);u.position.set(h.x,.16+d*.3,h.z),u.castShadow=d===2,this.group.add(u)}}})}buildCheckpoints(){this.checkpoints=[];for(let t=0;t<this.sectorCount;t++){const e=t/this.sectorCount,n=this.indexFromT(e);this.checkpoints.push({index:t,t:e,position:this.samplePos[n],tangent:this.sampleTan[n],normal:this.sampleNorm[n]})}}buildBoostPads(){const t=document.createElement("canvas");t.width=128,t.height=256;const e=t.getContext("2d");e.fillStyle="rgba(0,40,60,0.6)",e.fillRect(0,0,128,256),e.strokeStyle="#00ffff",e.lineWidth=12,e.lineCap="round";for(let o=40;o<240;o+=70)e.beginPath(),e.moveTo(25,o+30),e.lineTo(64,o),e.lineTo(103,o+30),e.stroke();const n=new Re(t);n.colorSpace=pe,n.wrapS=He,n.wrapT=ln;const i=new Nt({map:n,transparent:!0,blending:Ye,depthWrite:!1,side:Ue});this.boostPadMat=i;const r=new he(6,12);r.rotateX(Math.PI/2),(this.def.boostPads||[]).forEach((o,a)=>{const c=this.indexFromT(o),l=(a%3-1)*(this.roadWidth*.22),h=this.samplePos[c].clone().addScaledVector(this.sampleNorm[c],l),d=new A(r,i);d.quaternion.setFromUnitVectors(Mi,this.sampleTan[c]),d.position.set(h.x,.09,h.z),this.group.add(d),this.boostPads.push({mesh:d,position:new P(h.x,.35,h.z),tangent:this.sampleTan[c],radius:4.2})})}update(t){this.boostPadMat&&this.boostPadMat.map&&(this.boostPadMat.map.offset.y=(this.boostPadMat.map.offset.y-t*1.2)%1)}dispose(){Nl(this.group),this.scene.remove(this.group)}}function Nl(s){const t=new Set,e=new Set;s.traverse(n=>{n.geometry&&t.add(n.geometry),n.material&&(Array.isArray(n.material)?n.material:[n.material]).forEach(i=>e.add(i))}),t.forEach(n=>n.dispose()),e.forEach(n=>{["map","emissiveMap","alphaMap"].forEach(i=>{const r=n[i];r&&!(r.userData&&r.userData.shared)&&r.dispose()}),n.dispose()})}const Ai=[{id:"green_dress",name:"Ashi Green Dress",nameTh:"ชุดเดรสเขียวเหนี่ยวทรัพย์",file:"Gemini_Generated_Image_4g9dic4g9dic4g9d.jpg",rarity:"legendary",tag:"ICONIC",color:"#0d5c3a",desc:"สกินระดับตำนาน เดรสสีเขียวมรกต ลายรอบตัวถัง ฝากระโปรง และหลังคา เพิ่มความพริ้วไหว 100%"},{id:"red_bikini",name:"Ashi Red Bikini",nameTh:"บิกินี่แดงแรงฤทธิ์",file:"qwen_edit_20261004_234512.png",rarity:"legendary",tag:"HOT SPEED",color:"#e60026",desc:"สกินท้าลมร้อน สีแดงจัดจ้านสะดุดตาทุกโค้ง เพิ่มความดุดันและร้อนแรงรอบคัน"},{id:"shrek_ashi",name:"Shrek Ashi Ogre",nameTh:"ชเร็ค อาชิโอเกอร์",file:"Gemini_Generated_Image_9bccp39bccp39bcc.jpeg",rarity:"epic",tag:"OGRE POWER",color:"#4d7c0f",desc:"พลังแห่งหนองน้ำ ตัวเขียวหูแตร ปาดโค้งแบบไร้ความปรานี"},{id:"bomb_bird",name:"Angry Bomb Ashi",nameTh:"อาชินกดำระเบิดตู้ม",file:"Gemini_Generated_Image_w62h0zw62h0zw62h.jpg",rarity:"epic",tag:"EXPLOSIVE",color:"#dc2626",desc:"หน้านิ่งแต่ระเบิดพลังบูสต์ ชนใครมีกระเด็น"},{id:"chuck_bird",name:"Angry Chuck Ashi",nameTh:"อาชินกเหลืองติดสปีด",file:"Gemini_Generated_Image_r2mua9r2mua9r2mu.jpg",rarity:"epic",tag:"HYPER FAST",color:"#eab308",desc:"จงอยปากพุ่งทะยาน ความเร็วปลายไร้ขีดจำกัด"},{id:"tokyo_ghoul",name:"Tokyo Ghoul Ashi",nameTh:"อาชิกูล ตาแดงผมขาว",file:"Gemini_Generated_Image_ovar5lovar5lovar.jpeg",rarity:"epic",tag:"DARK MODE",color:"#6366f1",desc:"ตาแดงประกายเลือด ผมขาวสุดเท่ ซิ่งทะลุยามค่ำคืน"},{id:"big_boss",name:"Office Big Boss",nameTh:"เสี่ยอาชิ เยี่ยมยอด 👍",file:"Gemini_Generated_Image_t2e45ct2e45ct2e4.jpeg",rarity:"rare",tag:"BIG BOSS",color:"#0284c7",desc:"เสื้อเชิ้ตเนคไท ยกนิ้วโป้งให้กำลังใจคู่แข่งที่ตามหลัง"},{id:"larva_ashi",name:"Larva Ashi",nameTh:"อาชิ หนอนลาวา",file:"Gemini_Generated_Image_kwy6itkwy6itkwy6.jpeg",rarity:"rare",tag:"WIGGLE",color:"#f59e0b",desc:"คู่หูหนอนจอมกวน ดริฟต์ดึ๋งๆ สไลด์เข้าเส้นชัย"},{id:"ripped_shirt",name:"Ripped Warrior Ashi",nameTh:"อาชิเสื้อขาด สายบู๊",file:"Gemini_Generated_Image_nkpk4ynkpk4ynkpk.jpeg",rarity:"rare",tag:"FIGHTER",color:"#b91c1c",desc:"เสื้อขาดไม่ขาดใจ ดริฟต์สู้จนหยดสุดท้าย"},{id:"pizza_ashi",name:"Pizza Box Ashi",nameTh:"อาชิ กล่องพิซซ่าปริศนา",file:"Gemini_Generated_Image_8ffdat8ffdat8ffd.jpg",rarity:"rare",tag:"SECRET CHEF",color:"#ea580c",desc:"ส่งด่วนความเร็วสูง พิซซ่ายังร้อนๆ ถึงเส้นชัยก่อนใคร"},{id:"sleeping_deep",name:"Deep Sleep Ashi",nameTh:"อาชิ หลับลึกตึงๆ",file:"1.jpeg",rarity:"common",tag:"SLEEPY",color:"#6366f1",desc:"หลับตาก็ยังชนะ สกินสมาธิขั้นสูงสุด"},{id:"tired_chubby",name:"Tired Ashi",nameTh:"อาชิ อิ่มความสุข",file:"Gemini_Generated_Image_njs9nynjs9nynjs9.jpg",rarity:"common",tag:"CHILL",color:"#0284c7",desc:"นอนมองเพดานรอเพื่อนเข้าเส้นชัย"},{id:"style_2",name:"Ashi Smile 2",nameTh:"อาชิ หน้าหวานยิ้มพิมพ์ใจ",file:"2.jpeg",rarity:"common",tag:"SWEET",color:"#db2777",desc:"รอยยิ้มกระชากใจ แจกความสดใสบนสนามแข่ง"},{id:"style_3",name:"Ashi Chill 3",nameTh:"อาชิ ฟีลกู๊ด 3",file:"3.jpeg",rarity:"common",tag:"FRESH",color:"#059669",desc:"ความมั่นใจเกินร้อย เข้าโค้งไม่แตะเบรก"},{id:"style_4",name:"Ashi Cool 4",nameTh:"อาชิ หล่อเท่ 4",file:"4.jpeg",rarity:"common",tag:"COOL",color:"#7c3aed",desc:"มุมหล่อเหลาบาดตาคู่แข่ง"},{id:"style_5",name:"Ashi Vibe 5",nameTh:"อาชิ แววตานักซิ่ง 5",file:"5.jpeg",rarity:"common",tag:"RACING",color:"#dc2626",desc:"จ้องมองเส้นชัยข้างหน้า"},{id:"style_6",name:"Ashi Minion 6",nameTh:"อาชิ มินเนี่ยน 6",file:"6.jpeg",rarity:"common",tag:"BANANA",color:"#eab308",desc:"กวนโอ๊ยขั้นสุด ซิ่งแซงทุกคัน"},{id:"style_7",name:"Ashi Street 7",nameTh:"อาชิ สตรีทเรเซอร์ 7",file:"7.jpeg",rarity:"common",tag:"STREET",color:"#2563eb",desc:"สายสตรีทตัวจริงเสียงจริง"},{id:"style_glasses",name:"Ashi Shades",nameTh:"อาชิ แว่นเท่จัดจ้าน",file:"1000010497.jpg",rarity:"rare",tag:"SWAG",color:"#0891b2",desc:"แว่นตากันลมและแสงไฟสปอร์ตไลท์"},{id:"style_boss_look",name:"Ashi Stare",nameTh:"อาชิ จ้องเขม็ง",file:"9594C133-5E25-46D5-AFBF-57F4A9578910.jpg",rarity:"rare",tag:"STARE",color:"#0284c7",desc:"สายตาพิฆาตคู่แข่ง เสียวสันหลังวาบ"},{id:"style_selfie",name:"Ashi Selfie",nameTh:"อาชิ เซลฟี่น่ารัก",file:"A600349B-B25C-4CC0-98E5-E87A2CA8E409.jpg",rarity:"rare",tag:"KAWAII",color:"#f43f5e",desc:"รูปเซลฟี่น่ารักมุ้งมิ้งบนฝากระโปรง"},{id:"style_meme1",name:"Ashi Meme Supreme",nameTh:"อาชิ มีมระดับพระกาฬ",file:"image.jpg",rarity:"rare",tag:"MEME",color:"#d97706",desc:"มีมในตำนานที่ทุกคนต้องกราบ"}],zc=new P(0,0,1);class _g{constructor(t,e){this.scene=t,this.track=e,this.def=e.def,this.theme=e.def.theme||{},this.textureLoader=new Ul,this.group=new le,this.group.name="TrackDecorations",this.scene.add(this.group),this.holograms=[],this.weather=null,this.bounds=e.getBounds(),this.radius=Math.max(this.bounds.maxX-this.bounds.minX,this.bounds.maxZ-this.bounds.minZ)/2,this.buildGround(),this.buildSkyline(),this.buildRoadsideProps(),this.buildAshiBillboards(),this.buildTunnel(),this.buildGrandstands(),this.theme.holograms&&this.buildFloatingHolograms(),this.theme.weather&&this.buildWeather(this.theme.weather)}rand(t,e){return t+Math.random()*(e-t)}buildGround(){const t=document.createElement("canvas");t.width=512,t.height=512;const e=t.getContext("2d");e.fillStyle=this.theme.ground||"#0b0c14",e.fillRect(0,0,512,512);const n=this.theme.groundDetail||"#1b2238";if(this.theme.skyline==="city"){e.strokeStyle=n,e.lineWidth=2;for(let l=0;l<=512;l+=32)e.beginPath(),e.moveTo(l,0),e.lineTo(l,512),e.stroke(),e.beginPath(),e.moveTo(0,l),e.lineTo(512,l),e.stroke()}else if(this.theme.skyline==="volcano"){e.strokeStyle=n,e.lineWidth=2;for(let l=0;l<26;l++){let h=Math.random()*512,d=Math.random()*512;e.beginPath(),e.moveTo(h,d);for(let u=0;u<6;u++)h+=(Math.random()-.5)*60,d+=(Math.random()-.5)*60,e.lineTo(h,d);e.stroke()}}else for(let l=0;l<5e3;l++)e.fillStyle=Math.random()>.5?n:"rgba(255,255,255,0.08)",e.fillRect(Math.random()*512,Math.random()*512,3,3);const i=new Re(t);i.wrapS=ln,i.wrapT=ln,i.colorSpace=pe;const r=this.radius+220;i.repeat.set(r/18,r/18);const o=new A(new rn(r,64),new Et({map:i,roughness:.95,metalness:0}));o.rotation.x=-Math.PI/2,o.position.set(this.bounds.cx,-.02,this.bounds.cz),o.receiveShadow=!0,this.group.add(o);const a=this.theme.skyline==="volcano",c=new A(new he(6e3,6e3),a?new Nt({color:this.theme.farGround}):new Et({color:this.theme.farGround??329228,roughness:.4,metalness:.3}));c.rotation.x=-Math.PI/2,c.position.set(this.bounds.cx,-.4,this.bounds.cz),this.group.add(c)}findClearSpot(t,e,n){for(let i=0;i<25;i++){const r=Math.random()*Math.PI*2,o=this.rand(t,e),a=this.bounds.cx+Math.cos(r)*o,c=this.bounds.cz+Math.sin(r)*o;if(this.track.isClearOfTrack(a,c,n))return{x:a,z:c}}return null}buildSkyline(){const t=this.theme.skyline,e=this.radius;if(t==="city"||t==="resort"){const n=t==="city",i=n?90:45,r=new $(1,1,1),o=new Et({color:n?1184802:15852495,roughness:n?.5:.8,metalness:n?.8:.05}),a=new Bs(r,o,i),c=new Bs(r,new Nt({color:16777215}),i),l=n?[61695,16711850,16766720,65416]:[16743001,3065014,16760681,6983342],h=new te,d=new ei,u=new Wt;let f=0;for(let g=0;g<i;g++){const _=this.findClearSpot(e*.35,e+260,35);if(!_)continue;const m=this.rand(14,34),p=this.rand(14,34),x=n?this.rand(40,160):this.rand(12,45);d.setFromAxisAngle(new P(0,1,0),Math.random()*Math.PI),h.compose(new P(_.x,x/2-1,_.z),d,new P(m,x,p)),a.setMatrixAt(f,h),h.compose(new P(_.x,x-1,_.z),d,new P(m*1.03,n?1.2:2.2,p*1.03)),c.setMatrixAt(f,h),c.setColorAt(f,u.setHex(l[f%l.length])),f++}a.count=f,c.count=f,a.castShadow=!1,this.group.add(a,c)}else if(t==="mountains"){const n=new qe(1,1,7),i=new Et({color:7044239,roughness:.9,flatShading:!0}),r=new Et({color:16777215,roughness:.7,flatShading:!0});for(let o=0;o<34;o++){const a=this.findClearSpot(e+80,e+420,80);if(!a)continue;const c=this.rand(50,120),l=this.rand(80,210),h=new A(n,i);h.scale.set(c,l,c),h.position.set(a.x,l/2-2,a.z),h.rotation.y=Math.random()*Math.PI;const d=new A(n,r);d.scale.set(c*.42,l*.42,c*.42),d.position.set(a.x,l-l*.21-1.5,a.z),d.rotation.y=h.rotation.y,this.group.add(h,d)}}else if(t==="volcano"){const n=this.bounds.cx-(e+230),i=this.bounds.cz+80,r=new A(new Gt(55,210,190,18,1,!0),new Et({color:2757648,roughness:.95,flatShading:!0,side:Ue}));r.position.set(n,93,i);const o=new A(new rn(55,18),new Nt({color:16734720}));o.rotation.x=-Math.PI/2,o.position.set(n,175,i),this.group.add(r,o),this.lavaTop=o;const a=new Nt({color:16726528});for(let h=0;h<5;h++){const d=h/5*Math.PI*2,u=new A(new $(6,200,2),a);u.position.set(n+Math.cos(d)*130,90,i+Math.sin(d)*130),u.lookAt(n,90,i),u.rotateX(-.82),this.group.add(u)}const c=new qe(1,1,5),l=new Et({color:2036240,roughness:1,flatShading:!0});for(let h=0;h<40;h++){const d=this.findClearSpot(e*.4,e+300,30);if(!d)continue;const u=this.rand(8,22),f=this.rand(30,90),g=new A(c,l);g.scale.set(u,f,u),g.position.set(d.x,f/2-1,d.z),this.group.add(g)}}}buildRoadsideProps(){const t=this.theme.props;if(!t)return;const e=this.track,n=e.trackWidth/2,i=Math.round((t==="lamps"?34:18)/e.sampleSpacing),r=[];for(let u=0;u<e.sampleCount;u+=i)[-1,1].forEach(f=>{if(t==="lamps"&&f===-1&&u/i%2===1)return;const g=e.samplePos[u],_=e.sampleNorm[u],m=t==="lamps"?n+1.6:n+this.rand(5,16),p=g.x+_.x*f*m,x=g.z+_.z*f*m,S=t==="lamps"?1:3;e.distanceToCentreLine(p,x,1)>n+S&&r.push({x:p,z:x,side:f,i:u})});if(r.length===0)return;const o=new te,a=new ei,c=new P,l=new P,h=new P(0,1,0),d=(u,f,g,_=!1)=>{const m=new Bs(u,f,r.length);return r.forEach((p,x)=>{g(p,x),m.setMatrixAt(x,o)}),m.castShadow=_,this.group.add(m),m};if(t==="palms"){const u=r.map(()=>this.rand(.8,1.3)),f=new Gt(.25,.4,7,6);f.translate(0,3.5,0),d(f,new Et({color:9132587,roughness:1}),(_,m)=>{a.setFromAxisAngle(new P(1,0,0),this.rand(-.15,.15)),o.compose(l.set(_.x,0,_.z),a,c.setScalar(u[m]))},!0);const g=new qe(3.2,1.6,7);g.translate(0,7.4,0),d(g,new Et({color:3120708,roughness:.8,flatShading:!0}),(_,m)=>{a.setFromAxisAngle(h,Math.random()*Math.PI),o.compose(l.set(_.x,0,_.z),a,c.setScalar(u[m]))},!0)}else if(t==="pines"){const u=r.map(()=>this.rand(.8,1.5)),f=new Gt(.3,.4,2,6);f.translate(0,1,0),d(f,new Et({color:5978654}),(m,p)=>{o.compose(l.set(m.x,0,m.z),a.identity(),c.setScalar(u[p]))});const g=new qe(2.4,7,7);g.translate(0,5.2,0),d(g,new Et({color:2055999,roughness:.9,flatShading:!0}),(m,p)=>{o.compose(l.set(m.x,0,m.z),a.identity(),c.setScalar(u[p]))},!0);const _=new qe(1.3,2.6,7);_.translate(0,7.9,0),d(_,new Et({color:16777215,flatShading:!0}),(m,p)=>{o.compose(l.set(m.x,0,m.z),a.identity(),c.setScalar(u[p]))})}else if(t==="lamps"){const u=new Gt(.12,.16,8,6);u.translate(0,4,0),d(u,new Et({color:3355454,metalness:.8,roughness:.3}),g=>{o.compose(l.set(g.x,0,g.z),a.identity(),c.setScalar(1))});const f=new $(.6,.25,2.2);f.translate(0,8,0),d(f,new Nt({color:12577279}),g=>{const _=e.sampleNorm[g.i],m=Math.atan2(_.x,_.z);a.setFromAxisAngle(h,m),o.compose(l.set(g.x-_.x*g.side*1,0,g.z-_.z*g.side*1),a,c.setScalar(1))})}else if(t==="rocks"){const u=new da(1.4,0);d(u,new Et({color:2824726,roughness:1,flatShading:!0}),()=>{a.setFromEuler(new on(Math.random()*3,Math.random()*3,Math.random()*3));const _=this.rand(.6,1.8);o.compose(l.set(0,0,0),a,c.set(_,_*this.rand(.6,1.2),_))},!0);const f=this.group.children[this.group.children.length-1];r.forEach((_,m)=>{f.getMatrixAt(m,o),o.setPosition(_.x,.4,_.z),f.setMatrixAt(m,o)}),f.instanceMatrix.needsUpdate=!0;const g=new rn(1.6,10);g.rotateX(-Math.PI/2),d(g,new Nt({color:16730624}),(_,m)=>{o.compose(l.set(_.x+2.5,.03,_.z+1.5),a.identity(),c.setScalar(m%3===0?1:1e-4))})}}buildAshiBillboards(){const t=this.track,e=Ai.slice(0,12).map(c=>({file:c.file,title:c.name})),n=Math.max(6,Math.min(10,Math.round(t.trackLength/200))),i=new Et({color:1579552,metalness:.8,roughness:.3}),r=new Et({color:3355454,metalness:.9,roughness:.2}),o=new Nt({color:this.theme.railB??62463}),a=t.trackWidth/2;for(let c=0;c<n;c++){const l=(c+.35)/n,h=t.indexFromT(l),d=t.samplePos[h],u=t.sampleTan[h],f=t.sampleNorm[h],g=14,_=9,m=-Math.sign(t.sampleCurv[h])||(c%2===0?1:-1);let p=null;for(const k of[m,-m]){const F=a+9,H=d.x+f.x*k*F,O=d.z+f.z*k*F;if(t.distanceToCentreLine(H,O,1)>a+7.5){p=new P(H,0,O);break}}if(!p)continue;const x=e[c%e.length],S=new le;S.position.copy(p);const v=new Gt(.3,.35,10,10),L=new A(v,r);L.position.set(-g*.35,5,0);const E=new A(v,r);E.position.set(g*.35,5,0),S.add(L,E);const C=new A(new $(g+1,_+1,.8),i);C.position.set(0,8+_/2,0);const w=new A(new $(g+1.2,_+1.2,.2),o);w.position.set(0,8+_/2,-.35),S.add(C,w);const M=this.textureLoader.load(`../assets/ashi/${x.file}`);M.colorSpace=pe;const y=new A(new he(g,_),new Nt({map:M}));y.position.set(0,8+_/2,.42),S.add(y);const R=d.clone().addScaledVector(u,-30);S.lookAt(R.x,0,R.z),S.castShadow=!0,this.group.add(S)}}buildTunnel(){const t=this.def.tunnel;if(!t)return;const e=this.track,[n,i]=t,r=(i-n)*e.trackLength,o=Math.max(8,Math.round(r/7)),a=e.trackWidth/2+1.5,c=new Te(a,.35,6,24,Math.PI),l=new Nt({color:this.theme.railB??61695}),h=new Nt({color:this.theme.railA??16711782});for(let d=0;d<=o;d++){const u=n+d/o*(i-n),f=e.indexFromT(u),g=e.samplePos[f],_=new A(c,d%2===0?l:h);_.position.set(g.x,0,g.z),_.quaternion.setFromUnitVectors(zc,e.sampleTan[f]),this.group.add(_)}}buildGrandstands(){const t=this.track,e=t.trackWidth/2,n=new Et({color:2369590,roughness:.6}),i=new Et({color:this.theme.railA??16711748,roughness:.4}),r=[16720469,54015,16766720,65416,16777215,10309341],o=new $(.6,.9,.6),a=new Et({color:16777215,roughness:.8});[-1,1].forEach(c=>{const l=t.wrapIndex(30/t.sampleSpacing),h=t.samplePos[l],d=t.sampleNorm[l],u=t.sampleTan[l],f=e+11,g=new P(h.x+d.x*c*f,0,h.z+d.z*c*f);if(t.distanceToCentreLine(g.x,g.z,1)<e+8)return;const _=new le;_.position.copy(g),_.quaternion.setFromUnitVectors(zc,u);for(let L=0;L<4;L++){const E=new A(new $(14-L*0,1.5+L*1.5,3),n);E.geometry.dispose(),E.geometry=new $(3,1.5+L*1.5,56),E.position.set(c*L*3,(1.5+L*1.5)/2,0),E.receiveShadow=!0,_.add(E)}const m=new A(new $(14,.6,58),i);m.position.set(c*4.5,10,0),m.rotation.z=c*.12,m.castShadow=!0,_.add(m);const p=new Bs(o,a,160),x=new te,S=new Wt;let v=0;for(let L=0;L<4;L++)for(let E=0;E<40;E++)x.makeTranslation(c*L*3,1.5+L*1.5+.45,-26+E*1.3+Math.random()*.4),p.setMatrixAt(v,x),p.setColorAt(v,S.setHex(r[(v*7+L)%r.length])),v++;_.add(p),this.group.add(_)})}buildFloatingHolograms(){const t=new ua(1.2,0),e=new Nt({color:16768256,wireframe:!0,transparent:!0,opacity:.8});[.08,.26,.46,.68,.88].forEach(n=>{const i=this.track.getPositionAt(n),r=new A(t,e);r.position.set(i.x,6.5,i.z),this.group.add(r),this.holograms.push(r)})}buildWeather(t){const e=t==="snow"?2200:900,n=new Float32Array(e*3),i=new Float32Array(e);this.weatherBox={w:160,h:50};for(let u=0;u<e;u++)n[u*3]=(Math.random()-.5)*this.weatherBox.w,n[u*3+1]=Math.random()*this.weatherBox.h,n[u*3+2]=(Math.random()-.5)*this.weatherBox.w,i[u]=.6+Math.random()*.8;const r=new ge;r.setAttribute("position",new je(n,3));const o=document.createElement("canvas");o.width=32,o.height=32;const a=o.getContext("2d"),c=a.createRadialGradient(16,16,1,16,16,15);c.addColorStop(0,"rgba(255,255,255,1)"),c.addColorStop(1,"rgba(255,255,255,0)"),a.fillStyle=c,a.fillRect(0,0,32,32);const l=new Re(o),h=new Il({size:t==="snow"?.45:.35,map:l,color:t==="snow"?16777215:16742938,transparent:!0,depthWrite:!1,blending:t==="snow"?Nn:Ye}),d=new $0(r,h);d.frustumCulled=!1,this.group.add(d),this.weather={type:t,points:d,positions:n,speeds:i,count:e,time:0}}update(t,e){if(this.holograms.forEach(i=>{i.rotation.y+=t*2,i.rotation.x+=t*1.5}),this.lavaTop){const i=.75+Math.sin(performance.now()*.002)*.25;this.lavaTop.material.color.setRGB(1,.3*i+.05,0)}const n=this.weather;if(n&&e){n.time+=t;const i=n.positions,r=this.weatherBox,o=e.position.x,a=e.position.z,c=n.type==="snow"?-1:1;for(let l=0;l<n.count;l++){const h=l*3;i[h+1]+=c*n.speeds[l]*t*(n.type==="snow"?4:3),i[h]+=Math.sin(n.time+l)*t*.8,i[h+1]<0&&(i[h+1]+=r.h),i[h+1]>r.h&&(i[h+1]-=r.h)}n.points.position.set(o,0,a);for(let l=0;l<n.count;l++){const h=l*3;i[h]>r.w/2&&(i[h]-=r.w),i[h]<-r.w/2&&(i[h]+=r.w)}n.points.geometry.attributes.position.needsUpdate=!0}}dispose(){Nl(this.group),this.scene.remove(this.group)}}class vg{constructor(){this.textureLoader=new Ul,this.textureCache=new Map}loadSkinTexture(t){if(!t)return null;const e=`../assets/ashi/${t}`;if(this.textureCache.has(e))return this.textureCache.get(e);const n=this.textureLoader.load(e);return n.colorSpace=pe,n.wrapS=He,n.wrapT=He,this.textureCache.set(e,n),n}makeSideDecal(t,e,n=!1){const i=new he(t,e);if(n){const r=i.attributes.uv;for(let o=0;o<r.count;o++)r.setX(o,1-r.getX(o));r.needsUpdate=!0}return i}createCurvedHoodGeometry(t=1.48,e=1.28,n=1.55,i=.64,r=.36){const o=new ge,a=[],c=[],l=[],h=14,d=14;for(let u=0;u<=d;u++){const f=u/d,g=.4+f*n,_=t-f*(t-e),m=i-Math.pow(f,1.18)*(i-r);for(let p=0;p<=h;p++){const x=p/h*2-1,S=x*(_*.5),v=Math.exp(-Math.pow(Math.abs(x)-.72,2)*12)*.038,L=-Math.exp(-Math.pow(x,2)*9)*.026,E=-(x*x)*.028,C=m+v+L+E;a.push(S,C,g),c.push((x+1)*.5,1-f)}}for(let u=0;u<d;u++)for(let f=0;f<h;f++){const g=u*(h+1)+f,_=(u+1)*(h+1)+f,m=(u+1)*(h+1)+(f+1),p=u*(h+1)+(f+1);l.push(g,_,p),l.push(_,m,p)}return o.setAttribute("position",new Zt(a,3)),o.setAttribute("uv",new Zt(c,2)),o.setIndex(l),o.computeVertexNormals(),o}createCurvedDoorGeometry(t=!1,e=-.48,n=.68,i=.24,r=.62){const o=new ge,a=[],c=[],l=[],h=12,d=8,u=t?-1:1,f=n-e,g=r-i;for(let _=0;_<=h;_++){const m=_/h,p=e+m*f,x=Math.sin(m*Math.PI)*.095,S=.86-m*.02-x;for(let v=0;v<=d;v++){const L=v/d,E=i+L*g,C=u*(S-L*.035);a.push(C,E,p);const w=t?m:1-m,M=L;c.push(w,M)}}for(let _=0;_<h;_++)for(let m=0;m<d;m++){const p=_*(d+1)+m,x=(_+1)*(d+1)+m,S=(_+1)*(d+1)+(m+1),v=_*(d+1)+(m+1);t?(l.push(p,v,x),l.push(x,v,S)):(l.push(p,x,v),l.push(x,S,v))}return o.setAttribute("position",new Zt(a,3)),o.setAttribute("uv",new Zt(c,2)),o.setIndex(l),o.computeVertexNormals(),o}createCurvedWindshieldGeometry(){const t=new ge,e=[],n=[],i=[],r=10,o=8;for(let a=0;a<=o;a++){const c=a/o,l=.4-c*.46,h=1.32-c*.16,d=.63+Math.sin(c*(Math.PI/2))*.25;for(let u=0;u<=r;u++){const f=u/r*2-1,g=f*(h*.5),_=(1-f*f)*.045;e.push(g,d,l+_),n.push((f+1)*.5,c)}}for(let a=0;a<o;a++)for(let c=0;c<r;c++){const l=a*(r+1)+c,h=(a+1)*(r+1)+c,d=(a+1)*(r+1)+(c+1),u=a*(r+1)+(c+1);i.push(l,h,u),i.push(h,d,u)}return t.setAttribute("position",new Zt(e,3)),t.setAttribute("uv",new Zt(n,2)),t.setIndex(i),t.computeVertexNormals(),t}createCurvedFastbackGeometry(){const t=new ge,e=[],n=[],i=[],r=10,o=10;for(let a=0;a<=o;a++){const c=a/o,l=-.38-c*.95,h=1.16-c*.12,d=.88-Math.pow(c,1.2)*.3;for(let u=0;u<=r;u++){const f=u/r*2-1,g=f*(h*.5),_=-(f*f)*.025;e.push(g,d+_,l),n.push((f+1)*.5,1-c)}}for(let a=0;a<o;a++)for(let c=0;c<r;c++){const l=a*(r+1)+c,h=(a+1)*(r+1)+c,d=(a+1)*(r+1)+(c+1),u=a*(r+1)+(c+1);i.push(l,h,u),i.push(h,d,u)}return t.setAttribute("position",new Zt(e,3)),t.setAttribute("uv",new Zt(n,2)),t.setIndex(i),t.computeVertexNormals(),t}createUnibodyCarGeometry({length:t=4.1,noseZ:e=2.05,tailZ:n=-2.05,maxFrontWidth:i=1.8,waistWidth:r=1.56,maxRearWidth:o=1.86,frontWheelZ:a=1.25,rearWheelZ:c=-1.2,hoodCowlZ:l=.45,roofPeakZ:h=-.15,fastbackZ:d=-1.15,noseHeight:u=.32,cowlHeight:f=.64,roofHeight:g=.88,tailHeight:_=.54,sillHeight:m=.18,segZ:p=32,segRing:x=16}={}){const S=new ge,v=[],L=[],E=[];function C(k){const F=e-k*t;let H;if(F>a){const U=(F-a)/(e-a);H=i-U*.4}else if(F>0){const U=F/a;H=r+U*(i-r)}else if(F>c){const U=-F/-c;H=r+U*(o-r)}else{const U=(c-F)/(c-n);H=o-U*.22}let O;if(F>l){const U=(F-l)/(e-l);O=f-Math.pow(U,1.2)*(f-u)}else if(F>h){const U=(F-h)/(l-h);O=g-U*(g-f)}else if(F>d){const U=(h-F)/(h-d);O=g-Math.pow(U,1.1)*(g-.6)}else O=.6-(d-F)/(d-n)*(.6-_);return{z:F,halfW:H*.5,yCenter:O,ySill:m}}for(let k=0;k<=p;k++){const F=k/p,H=C(F);for(let O=0;O<=x;O++){const U=O/x*Math.PI,Y=Math.cos(U),W=Math.sin(U),ot=Y*H.halfW,N=H.ySill+Math.pow(W,.72)*(H.yCenter-H.ySill);v.push(ot,N,H.z);const D=O/x,lt=1-F;L.push(D,lt)}}for(let k=0;k<p;k++)for(let F=0;F<x;F++){const H=k*(x+1)+F,O=(k+1)*(x+1)+F,U=(k+1)*(x+1)+(F+1),Y=k*(x+1)+(F+1);E.push(H,O,Y),E.push(O,U,Y)}for(let k=0;k<p;k++){const F=k*(x+1)+0,H=(k+1)*(x+1)+0,O=(k+1)*(x+1)+x,U=k*(x+1)+x;E.push(F,U,H),E.push(H,U,O)}const w=C(0),M=v.length/3;v.push(0,(w.yCenter+w.ySill)*.5,w.z),L.push(.5,1);for(let k=0;k<x;k++){const F=0*(x+1)+k,H=0*(x+1)+(k+1);E.push(M,F,H)}const y=C(1),R=v.length/3;v.push(0,(y.yCenter+y.ySill)*.5,y.z),L.push(.5,0);for(let k=0;k<x;k++){const F=p*(x+1)+k,H=p*(x+1)+(k+1);E.push(R,H,F)}return S.setAttribute("position",new Zt(v,3)),S.setAttribute("uv",new Zt(L,2)),S.setIndex(E),S.computeVertexNormals(),S}makeFramedLivery(){return new le}createCar(t="gt",e=null,n="#ff2255",i=!1,r=null){typeof i=="object"&&i!==null&&r===null&&(r=i,i=!1);const o=new le;o.name="CarRoot";const a=e?this.loadSkinTexture(e):null,c=new Wt(n),l=new Wr({color:a?16777215:c,map:a,metalness:a?.28:.58,roughness:.18,clearcoat:1,clearcoatRoughness:.04,reflectivity:.96}),h=l,d=new Et({color:1315864,roughness:.4,metalness:.5}),u=new Et({color:1118484,roughness:.7,metalness:.2}),f=new Wr({color:1055784,metalness:.2,roughness:.06,transmission:.82,transparent:!0,opacity:.88,reflectivity:.95}),g=new Et({color:16316922,metalness:.98,roughness:.08}),_=new Et({color:16766720,metalness:.92,roughness:.18}),m=new Nt({color:14547199}),p=new Nt({color:61695}),x=new Nt({color:16711726}),S=new Nt({color:16755200}),v=new Et({color:1579035,roughness:.92,metalness:.1}),L=new Et({color:14870768,metalness:.94,roughness:.14}),E=new Et({color:11581636,metalness:.95,roughness:.25}),C=new Et({color:16715824,metalness:.75,roughness:.2}),w=new le;w.name="Chassis",o.add(w);const M={frontLeft:null,frontRight:null,rearLeft:null,rearRight:null},y=new le,R=new le;w.add(y),w.add(R);let k=n;r!=null&&r.underglow&&(r.underglow==="none"?k=null:r.underglow!=="body_match"&&(k=r.underglow));let F=null,H=null;if(k){const D=new Wt(k),lt=new he(1.8,3.6);if(H=new Nt({color:D,transparent:!0,opacity:.5,blending:Ye,depthWrite:!1}),typeof document<"u"){const ut=document.createElement("canvas");ut.width=128,ut.height=256;const X=ut.getContext("2d");if(X){const K=X.createRadialGradient(64,128,8,64,128,64);K.addColorStop(0,k),K.addColorStop(.55,k+"aa"),K.addColorStop(1,"#00000000"),X.fillStyle=K,X.fillRect(0,0,128,256);const at=new Re(ut);H=new Nt({map:at,transparent:!0,opacity:.85,blending:Ye,depthWrite:!1})}}F=new A(lt,H),F.rotation.x=-Math.PI/2,F.position.y=.08,o.add(F)}const O=(r==null?void 0:r.wheels)||"stock",U=(D,lt,ut,X,K,at)=>this.createWheel(v,L,D,lt,ut,X,K,at,E,C,O);t==="kart"?(this.buildKartBody(w,l,h,u,d,g,_,m,x),M.frontLeft=U(.24,.22,y,-.72,.24,.92),M.frontRight=U(.24,.22,R,.72,.24,.92),M.rearLeft=U(.32,.3,w,-.78,.32,-.85),M.rearRight=U(.32,.3,w,.78,.32,-.85)):t==="truck"?(this.buildTruckBody(w,l,h,u,d,f,g,m,p,x,S),M.frontLeft=U(.46,.34,y,-.96,.46,1.35),M.frontRight=U(.46,.34,R,.96,.46,1.35),M.rearLeft=U(.46,.34,w,-.96,.46,-1.35),M.rearRight=U(.46,.34,w,.96,.46,-1.35)):t==="f1"?(this.buildF1Body(w,l,h,u,d,g,m,x),M.frontLeft=U(.33,.28,y,-.92,.33,1.48),M.frontRight=U(.33,.28,R,.92,.33,1.48),M.rearLeft=U(.39,.38,w,-.96,.39,-1.32),M.rearRight=U(.39,.38,w,.96,.39,-1.32)):t==="muscle"?(this.buildMuscleBody(w,l,h,u,d,g,f,m,x),M.frontLeft=U(.36,.28,y,-.86,.36,1.25),M.frontRight=U(.36,.28,R,.86,.36,1.25),M.rearLeft=U(.41,.35,w,-.88,.41,-1.18),M.rearRight=U(.41,.35,w,.88,.41,-1.18)):t==="hyper"?(this.buildHyperBody(w,l,h,u,d,f,g,m,p,x),M.frontLeft=U(.35,.28,y,-.86,.35,1.3),M.frontRight=U(.35,.28,R,.86,.35,1.3),M.rearLeft=U(.4,.36,w,-.9,.4,-1.25),M.rearRight=U(.4,.36,w,.9,.4,-1.25)):t==="rally"?(this.buildRallyBody(w,l,h,u,d,f,m,S,x),M.frontLeft=U(.35,.28,y,-.86,.35,1.15),M.frontRight=U(.35,.28,R,.86,.35,1.15),M.rearLeft=U(.35,.28,w,-.86,.35,-1.15),M.rearRight=U(.35,.28,w,.86,.35,-1.15)):t==="speedster"?(this.buildSpeedsterBody(w,l,h,u,d,g,f,m,x),M.frontLeft=U(.34,.24,y,-.8,.34,1.2),M.frontRight=U(.34,.24,R,.8,.34,1.2),M.rearLeft=U(.36,.26,w,-.82,.36,-1.15),M.rearRight=U(.36,.26,w,.82,.36,-1.15)):(this.buildGTBody(w,l,h,u,d,f,g,m,p,x),M.frontLeft=U(.35,.26,y,-.84,.35,1.22),M.frontRight=U(.35,.26,R,.84,.35,1.22),M.rearLeft=U(.38,.3,w,-.86,.38,-1.18),M.rearRight=U(.38,.3,w,.86,.38,-1.18));const Y=(r==null?void 0:r.exhaust)||"stock",W=this.createExhaustPipes(w,t,g,Y);if(r){r.spoiler&&r.spoiler!=="stock"&&this.applySpoilerAddon(w,t,r.spoiler,l,d,g,h);const D=r.roof_hood||r.roofHood;D&&D!=="none"&&this.applyRoofHoodAddon(w,t,D,l,d,g)}const ot=new cs(16774885,2.2,38,Math.PI/4.8,.35);ot.position.set(-.6,.52,2),ot.target.position.set(-.6,0,16),w.add(ot),w.add(ot.target);const N=new cs(16774885,2.2,38,Math.PI/4.8,.35);return N.position.set(.6,.52,2),N.target.position.set(.6,0,16),w.add(N),w.add(N.target),{root:o,chassis:w,wheels:M,steerGroups:[y,R],exhaustPipes:W,brakeLightMat:x,underglowMat:H,bodyMat:l,decalMat:h}}createWheel(t,e,n,i,r,o,a,c,l,h,d="stock"){const u=new le;u.position.set(o,a,c);const f=new Gt(n,n,i*.92,28);f.rotateZ(Math.PI/2);const g=new A(f,t);g.castShadow=!0,u.add(g);const _=new Te(n*.94,i*.12,10,24);_.rotateY(Math.PI/2);const m=new A(_,t);u.add(m);let p=e;d==="gold_mesh"?p=new Et({color:16766720,metalness:.92,roughness:.22}):d==="deep_dish"&&(p=new Et({color:16054267,metalness:.98,roughness:.06}));const x=n*.68;if(d==="turbofan"){const C=new Gt(x,x,i*.98,28);C.rotateZ(Math.PI/2);const w=new A(C,new Et({color:1447970,metalness:.82,roughness:.3}));u.add(w);for(let y=0;y<12;y++){const R=y/12*Math.PI*2,k=new A(new $(i*1.02,x*.45,.02),p);k.position.set(0,Math.sin(R)*x*.55,Math.cos(R)*x*.55),k.rotation.x=R+.35,u.add(k)}const M=new A(new qe(x*.25,i*.4,16),p);M.rotateZ(o>0?-Math.PI/2:Math.PI/2),M.position.x=o>0?i*.45:-i*.45,u.add(M)}else if(d==="gold_mesh"){const C=new Gt(x,x*.88,i*.96,24);C.rotateZ(Math.PI/2),u.add(new A(C,p));for(let M=0;M<10;M++){const y=M/10*Math.PI*2,R=new A(new $(i*.98,x*.88,.022),p);R.rotation.x=y+.18;const k=new A(new $(i*.98,x*.88,.022),p);k.rotation.x=y-.18,u.add(R,k)}const w=new A(new Gt(x*.22,x*.22,i*1.04,12),new Et({color:16711731,metalness:.9,roughness:.2}));w.rotateZ(Math.PI/2),u.add(w)}else if(d==="deep_dish"){const C=x*1.02,w=new Gt(C,x*.72,i*.98,24);w.rotateZ(Math.PI/2),u.add(new A(w,p));for(let y=0;y<6;y++){const R=y/6*Math.PI*2,k=new A(new $(i*.92,x*.82,.038),p);k.rotation.x=R,u.add(k)}const M=new A(new Gt(x*.26,x*.26,i*.98,16),p);M.rotateZ(Math.PI/2),u.add(M)}else{const C=new Gt(x,x*.92,i*.96,20);C.rotateZ(Math.PI/2),u.add(new A(C,p));for(let M=0;M<5;M++){const y=M/5*Math.PI*2,R=new A(new $(i*.98,x*.92,.038),p);R.rotation.x=y,u.add(R)}const w=new A(new Gt(x*.28,x*.28,i*1.02,16),p);w.rotateZ(Math.PI/2),u.add(w)}if(l){const C=new Gt(n*.54,n*.54,.02,18);C.rotateZ(Math.PI/2);const w=new A(C,l);if(w.position.x=o>0?-i*.22:i*.22,u.add(w),h){const M=new $(.048,n*.32,n*.24),y=new A(M,h);y.position.set(o>0?-i*.22:i*.22,n*.34,0),u.add(y)}}const S=new Et({color:1579038,metalness:.85,roughness:.4}),v=.4,L=new Gt(n*.22,n*.22,v,12);L.rotateZ(Math.PI/2);const E=new A(L,S);return E.position.x=o>0?-i*.42-v*.5:i*.42+v*.5,u.add(E),r.add(u),u}addDriverBobblehead(t,e,n){return null}createExhaustPipes(t,e,n,i="stock"){const r=[];let o=n||new Et({color:14544639,metalness:.95,roughness:.1});i==="burnt_titanium"?o=new Wr({color:4024043,metalness:.95,roughness:.15,clearcoat:1,clearcoatRoughness:.08}):i==="quad_carbon"&&(o=new Et({color:1447450,metalness:.5,roughness:.4}));const a=(h,d,u,f=.07,g=.28)=>{const _=new Gt(f*.85,f,g,16);_.rotateX(Math.PI/2);const m=new A(_,o);m.position.set(h,d,u);const p=new Gt(f*.7,f*.7,.05,12);p.rotateX(Math.PI/2);const x=new A(p,new Nt({color:328965}));return x.position.set(0,0,g*.48),m.add(x),t.add(m),r.push(m),m},c={kart:{z:-1.12,y:.22,r:.05,len:.2},f1:{z:-2.12,y:.32,r:.07,len:.25},truck:{z:-2.22,y:.36,r:.09,len:.28},speedster:{z:-1.94,y:.32,r:.06,len:.26},rally:{z:-1.95,y:.28,r:.07,len:.26},muscle:{z:-2.08,y:.3,r:.08,len:.28},hyper:{z:-2.05,y:.36,r:.06,len:.26},gt:{z:-1.94,y:.28,r:.07,len:.26}},l=c[e]||c.gt;if(i==="side_pipes")return e==="kart"?(a(-.52,.16,.1,.045,.6),a(.52,.16,.1,.045,.6)):(a(-.84,.22,.3,.065,1.4),a(.84,.22,.3,.065,1.4)),r;if(i==="quad_carbon"){const h=e==="kart"?.6:1;return a(-.46*h,l.y,l.z,l.r,l.len),a(-.3*h,l.y,l.z,l.r,l.len),a(.3*h,l.y,l.z,l.r,l.len),a(.46*h,l.y,l.z,l.r,l.len),r}else if(i==="burnt_titanium"){const h=e==="kart"?.6:1;return a(-.36*h,l.y,l.z,l.r*1.2,l.len),a(.36*h,l.y,l.z,l.r*1.2,l.len),r}return e==="hyper"?(a(-.09,l.y+.12,l.z,.05,l.len),a(.09,l.y+.12,l.z,.05,l.len),a(0,l.y+.22,l.z,.055,l.len),a(0,l.y+.02,l.z,.055,l.len)):e==="gt"?(a(-.46,l.y,l.z,.065,l.len),a(-.32,l.y,l.z,.065,l.len),a(.32,l.y,l.z,.065,l.len),a(.46,l.y,l.z,.065,l.len)):e==="f1"?a(0,l.y+.1,l.z,.095,l.len):e==="speedster"?(a(-.84,.22,.3,.06,1.4),a(.84,.22,.3,.06,1.4)):e==="rally"?a(.48,l.y,l.z,.085,l.len):e==="truck"?(a(-.52,l.y,l.z,.09,l.len),a(.52,l.y,l.z,.09,l.len)):e==="kart"?a(.24,l.y,l.z,.045,l.len):(a(-.38,l.y,l.z,.075,l.len),a(.38,l.y,l.z,.075,l.len)),r}applySpoilerAddon(t,e,n,i,r,o,a=null){const c=t.getObjectByName("CarSpoiler");if(c&&t.remove(c),!n||n==="none")return;const l=new le;l.name="CarSpoiler";let h=.52,d=-1.82;if(e==="truck"?(h=.82,d=-2.15):e==="f1"?(h=.36,d=-1.85):e==="kart"?(h=.26,d=-1.05):e==="speedster"?(h=.48,d=-1.8):e==="muscle"?(h=.58,d=-1.95):e==="hyper"?(h=.48,d=-1.95):e==="rally"&&(h=.64,d=-1.8),n==="gt_wing"){const u=new A(new $(.04,.42,.2),r);u.position.set(-.52,h+.18,d);const f=new A(new $(.04,.42,.2),r);f.position.set(.52,h+.18,d);const g=new A(new $(1.82,.05,.42),i);if(g.position.set(0,h+.38,d-.04),g.rotation.x=.1,a){const p=new A(new he(1.72,.36),a);p.rotation.x=-Math.PI/2+.1,p.position.set(0,h+.41,d-.04),l.add(p)}const _=new A(new $(.03,.24,.46),i);_.position.set(-.91,h+.38,d-.04);const m=new A(new $(.03,.24,.46),i);m.position.set(.91,h+.38,d-.04),l.add(u,f,g,_,m)}else if(n==="ducktail"){const u=new A(new $(1.48,.14,.18),i);if(u.position.set(0,h+.04,d+.04),u.rotation.x=-.34,a){const g=new A(new he(1.42,.12),a);g.position.set(0,h+.055,d+.05),g.rotation.x=-.34,l.add(g)}const f=new A(new $(1.44,.03,.08),r);f.position.set(0,h+.1,d-.01),f.rotation.x=-.34,l.add(u,f)}else if(n==="hyper_fin"){const u=new A(new $(.04,.36,.85),i);u.position.set(-.62,h+.14,d+.3);const f=new A(new $(.04,.36,.85),i);f.position.set(.62,h+.14,d+.3);const g=new Nt({color:62463}),_=new A(new $(.045,.03,.82),g);_.position.set(-.62,h+.32,d+.3);const m=new A(new $(.045,.03,.82),g);m.position.set(.62,h+.32,d+.3),l.add(u,f,_,m)}else if(n==="drag_wing"){const u=new A(new $(1.58,.04,.62),i);if(u.position.set(0,h+.05,d-.22),u.rotation.x=.06,a){const p=new A(new he(1.5,.54),a);p.rotation.x=-Math.PI/2+.06,p.position.set(0,h+.075,d-.22),l.add(p)}const f=new A(new Gt(.02,.02,.42),o);f.position.set(-.5,h-.1,d-.3),f.rotation.x=.6;const g=new A(new Gt(.02,.02,.42),o);g.position.set(.5,h-.1,d-.3),g.rotation.x=.6;const _=new A(new $(.03,.24,.65),i);_.position.set(-.79,h+.11,d-.22);const m=new A(new $(.03,.24,.65),i);m.position.set(.79,h+.11,d-.22),l.add(u,f,g,_,m)}t.add(l)}applyRoofHoodAddon(t,e,n,i,r,o){const a=t.getObjectByName("CarRoofHood");if(a&&t.remove(a),!n||n==="none")return;const c=new le;c.name="CarRoofHood";let l=.88,h=-.15,d=.62,u=.85;if(e==="truck"?(l=1.15,h=.05,d=.78,u=1.15):e==="kart"?(l=.48,h=-.2,d=.38,u=.55):e==="f1"?(l=.68,h=-.4,d=.38,u=.95):e==="speedster"?(l=.66,h=.1,d=.54,u=.85):e==="muscle"?(l=.95,h=-.15,d=.66,u=.95):e==="hyper"?(l=.78,h=-.15,d=.48,u=.85):e==="rally"&&(l=.96,h=-.12,d=.65,u=.85),n==="roof_scoop"){const f=new A(new $(.38,.14,.62),i);f.position.set(0,l+.05,h),f.rotation.x=-.15;const g=new A(new $(.32,.08,.04),new Nt({color:328965}));g.position.set(0,l+.06,h+.3),c.add(f,g)}else if(n==="blower_scoop"){const f=new A(new $(.42,.24,.52),o);f.position.set(0,d+.1,u);const g=new Nt({color:16711714});[-.12,0,.12].forEach(_=>{const m=new A(new Gt(.045,.045,.02,16),g);m.rotateX(Math.PI/2),m.position.set(_,d+.14,u+.27),c.add(m)}),c.add(f)}else if(n==="rally_lightbar"){const f=new A(new $(.95,.05,.08),r);f.position.set(0,l+.02,h+.45);const g=new Nt({color:16775904});[-.36,-.12,.12,.36].forEach(_=>{const m=new A(new $(.14,.1,.08),r);m.position.set(_,l+.05,h+.46);const p=new A(new he(.12,.08),g);p.position.set(_,l+.05,h+.51),c.add(m,p)}),c.add(f)}t.add(c)}buildGTBody(t,e,n,i,r,o,a,c,l,h){const d=this.createUnibodyCarGeometry({length:4.1,noseZ:2.05,tailZ:-2.05,maxFrontWidth:1.82,waistWidth:1.56,maxRearWidth:1.88,roofHeight:.88,cowlHeight:.64,noseHeight:.32,tailHeight:.52,sillHeight:.16}),u=new A(d,e);t.add(u);const f=new A(new $(1.64,.06,4.08),r);f.position.set(0,.14,0);const g=new A(new $(.08,.08,2.35),r);g.position.set(-.82,.18,.05);const _=new A(new $(.08,.08,2.35),r);_.position.set(.82,.18,.05),t.add(f,g,_);const m=this.createCurvedWindshieldGeometry(),p=new A(m,o),x=this.createCurvedFastbackGeometry(),S=new A(x,o);t.add(p,S);const v=new A(new $(.06,.05,.54),r);v.position.set(-.62,.74,.16),v.rotation.set(-.52,-.28,.35);const L=new A(new $(.06,.05,.54),r);L.position.set(.62,.74,.16),L.rotation.set(-.52,.28,-.35),t.add(v,L);const E=new A(new $(.2,.025,.42),r);E.position.set(-.32,.56,.76),E.rotation.x=-.16;const C=new A(new $(.2,.025,.42),r);C.position.set(.32,.56,.76),C.rotation.x=-.16,t.add(E,C);const w=new Et({color:1579036,roughness:.8}),M=new Et({color:14487859,roughness:.5});for(const yt of[-.3,.3]){const It=new A(new $(.38,.12,.4),w);It.position.set(yt,.45,-.18);const Rt=new A(new $(.36,.38,.1),w);Rt.position.set(yt,.65,-.34),Rt.rotation.x=-.15;const zt=new A(new $(.2,.14,.08),M);zt.position.set(yt,.82,-.37),t.add(It,Rt,zt)}const y=new A(new Te(.12,.022,8,16),r);y.position.set(-.3,.68,.08),y.rotation.x=.35;const R=new A(new Gt(.022,.022,1.15,12),r);R.rotation.z=Math.PI/2,R.position.set(0,.78,-.45),t.add(y,R);const k=new A(new $(.18,.07,.1),r);k.position.set(-.76,.68,.38);const F=new A(new $(.18,.07,.1),r);F.position.set(.76,.68,.38),t.add(k,F);const H=new A(new $(1.72,.05,.48),r);H.position.set(0,.18,2.02);const O=new A(new $(.04,.18,.32),r);O.position.set(-.86,.26,1.98),O.rotation.y=.15;const U=new A(new $(.04,.18,.32),r);U.position.set(.86,.26,1.98),U.rotation.y=-.15,t.add(H,O,U);const Y=new A(new $(.24,.07,.12),c);Y.position.set(-.56,.34,1.93),Y.rotation.y=-.15;const W=new A(new $(.28,.025,.1),l);W.position.set(-.56,.38,1.94),W.rotation.y=-.15;const ot=new A(new $(.24,.07,.12),c);ot.position.set(.56,.34,1.93),ot.rotation.y=.15;const N=new A(new $(.28,.025,.1),l);N.position.set(.56,.38,1.94),N.rotation.y=.15,t.add(Y,W,ot,N);const D=new A(new $(1.52,.05,.06),h);D.position.set(0,.51,-1.94);const lt=new A(new $(1.54,.08,.04),new Nt({color:16715827,transparent:!0,opacity:.7}));lt.position.set(0,.51,-1.945),t.add(D,lt);const ut=new A(new $(1.48,.14,.48),r);ut.position.set(0,.19,-1.86),ut.rotation.x=.12;for(let yt=-.48;yt<=.48;yt+=.32){const It=new A(new $(.03,.18,.52),r);It.position.set(yt,.19,-1.86),It.rotation.x=.12,t.add(It)}t.add(ut);const X=new le;X.name="CarSpoiler";const K=new A(new $(.04,.38,.16),r);K.position.set(-.52,.74,-1.72),K.rotation.x=-.22;const at=new A(new $(.04,.38,.16),r);at.position.set(.52,.74,-1.72),at.rotation.x=-.22;const Q=new A(new $(1.78,.045,.42),e);Q.position.set(0,.89,-1.76),Q.rotation.x=.04;const dt=new A(new $(.04,.24,.46),e);dt.position.set(-.89,.89,-1.76);const vt=new A(new $(.04,.24,.46),e);vt.position.set(.89,.89,-1.76),X.add(K,at,Q,dt,vt),t.add(X)}buildKartBody(t,e,n,i,r,o,a,c,l){const h=this.createUnibodyCarGeometry({length:2.3,noseZ:1.15,tailZ:-1.15,maxFrontWidth:1.25,waistWidth:1.05,maxRearWidth:1.35,frontWheelZ:.88,rearWheelZ:-.85,hoodCowlZ:.35,roofPeakZ:.05,fastbackZ:-.55,noseHeight:.2,cowlHeight:.42,roofHeight:.48,tailHeight:.26,sillHeight:.1}),d=new A(h,e);t.add(d);const u=new A(new $(1.05,.04,2.2),r);u.position.set(0,.09,0),t.add(u);const f=new A(new Te(.6,.03,8,20,Math.PI),o);f.rotation.x=Math.PI/2,f.position.set(0,.18,1.12),t.add(f);const g=new A(new $(.5,.1,.45),i);g.position.set(0,.2,-.22);const _=new A(new $(.48,.52,.08),i);_.position.set(0,.46,-.42),_.rotation.x=.22,t.add(g,_);const m=new A(new Gt(.022,.022,.42),o);m.position.set(0,.42,.22),m.rotation.x=-.55;const p=new A(new Te(.13,.02,8,16),i);p.position.set(0,.55,.12),p.rotation.x=-.55,t.add(m,p);const x=new A(new $(.36,.3,.3),o);x.position.set(.28,.28,-.65);const S=new A(new Gt(.085,.085,.2,12),a);S.position.set(.28,.46,-.65);const v=new A(new qe(.075,.16,12),new Et({color:16711748}));v.rotateZ(Math.PI/2),v.position.set(.46,.36,-.65),t.add(x,S,v);const L=new A(new $(1.28,.06,.06),o);L.position.set(0,.24,-1.14);const E=new A(new $(.38,.05,.04),l);E.position.set(0,.28,-1.15),t.add(L,E)}buildTruckBody(t,e,n,i,r,o,a,c,l,h,d){const u=this.createUnibodyCarGeometry({length:4.45,noseZ:2.22,tailZ:-2.23,maxFrontWidth:1.88,waistWidth:1.84,maxRearWidth:1.88,frontWheelZ:1.35,rearWheelZ:-1.35,hoodCowlZ:.65,roofPeakZ:.05,fastbackZ:-.9,noseHeight:.52,cowlHeight:.82,roofHeight:1.15,tailHeight:.82,sillHeight:.22}),f=new A(u,e);t.add(f);const g=new A(new $(1.76,.08,4.4),r);g.position.set(0,.2,0);const _=new A(new $(.1,.12,2.5),i);_.position.set(-.92,.25,0);const m=new A(new $(.1,.12,2.5),i);m.position.set(.92,.25,0),t.add(g,_,m);const p=new A(new $(1.42,.04,.82),o);p.position.set(0,.98,.38),p.rotation.x=-.48;const x=new A(new $(.04,.32,1.2),o);x.position.set(-.72,.96,-.2),x.rotation.z=-.12;const S=new A(new $(.04,.32,1.2),o);S.position.set(.72,.96,-.2),S.rotation.z=.12,t.add(p,x,S);const v=new A(new $(1.76,.06,.06),c);v.position.set(0,.54,2.22);const L=new A(new $(1.78,.02,.08),l);L.position.set(0,.57,2.22),t.add(v,L);const E=new A(new $(1.65,.34,.12),i);E.position.set(0,.4,2.24);const C=new A(new Te(.06,.02,6,12),new Nt({color:16711731}));C.position.set(-.48,.32,2.3);const w=new A(new Te(.06,.02,6,12),new Nt({color:16711731}));w.position.set(.48,.32,2.3),t.add(E,C,w);const M=new A(new $(1.22,.06,.08),i);M.position.set(0,1.15,.05),t.add(M);for(let F=-.45;F<=.45;F+=.3){const H=new A(new $(.18,.05,.05),d);H.position.set(F,1.15,.09),t.add(H)}const y=new A(new $(1.76,.07,.06),h);y.position.set(0,.82,-2.23),t.add(y);const R=new A(new Gt(.035,.035,1.7),i);R.position.set(-.72,.98,-1.15),R.rotation.x=-.52;const k=new A(new Gt(.035,.035,1.7),i);k.position.set(.72,.98,-1.15),k.rotation.x=-.52,t.add(R,k)}buildF1Body(t,e,n,i,r,o,a,c){const l=this.createUnibodyCarGeometry({length:4.35,noseZ:2.18,tailZ:-2.17,maxFrontWidth:1.15,waistWidth:.84,maxRearWidth:1.32,frontWheelZ:1.48,rearWheelZ:-1.32,hoodCowlZ:.65,roofPeakZ:-.22,fastbackZ:-.95,noseHeight:.22,cowlHeight:.42,roofHeight:.68,tailHeight:.36,sillHeight:.12}),h=new A(l,e);t.add(h);const d=new A(new $(1.45,.05,3.8),r);d.position.set(0,.12,0),t.add(d);const u=new A(new $(1.88,.05,.52),r);u.position.set(0,.16,2.15);const f=new A(new $(1.78,.04,.35),e);f.position.set(0,.22,2.1);const g=new A(new $(.05,.24,.58),e);g.position.set(-.94,.24,2.15);const _=new A(new $(.05,.24,.58),e);_.position.set(.94,.24,2.15);const m=new A(new $(.04,.12,.24),r);m.position.set(-.16,.2,2.1);const p=new A(new $(.04,.12,.24),r);p.position.set(.16,.2,2.1),t.add(u,f,g,_,m,p);const x=new A(new Te(.3,.035,8,16,Math.PI),i);x.position.set(0,.66,.12),x.rotation.x=-Math.PI/2;const S=new A(new Gt(.022,.022,.28),i);S.position.set(0,.52,.38),t.add(x,S);const v=new A(new $(.34,.38,.6),e);v.position.set(0,.7,-.4),t.add(v);const L=new le;L.name="CarSpoiler";const E=new A(new $(1.76,.06,.42),e);E.position.set(0,.9,-1.88);const C=new A(new $(1.72,.04,.22),r);C.position.set(0,1,-1.94);const w=new A(new $(.05,.46,.14),r);w.position.set(-.42,.67,-1.82);const M=new A(new $(.05,.46,.14),r);M.position.set(.42,.67,-1.82);const y=new A(new $(.04,.32,.48),e);y.position.set(-.88,.92,-1.88);const R=new A(new $(.04,.32,.48),e);R.position.set(.88,.92,-1.88),L.add(E,C,w,M,y,R),t.add(L);const k=new A(new $(.16,.16,.06),c);k.position.set(0,.28,-2.14),t.add(k)}buildMuscleBody(t,e,n,i,r,o,a,c,l){const h=this.createUnibodyCarGeometry({length:4.22,noseZ:2.11,tailZ:-2.11,maxFrontWidth:1.84,waistWidth:1.7,maxRearWidth:1.88,frontWheelZ:1.25,rearWheelZ:-1.18,hoodCowlZ:.48,roofPeakZ:-.15,fastbackZ:-1.05,noseHeight:.42,cowlHeight:.68,roofHeight:.95,tailHeight:.58,sillHeight:.18}),d=new A(h,e);t.add(d);const u=new A(new $(1.68,.06,4.15),r);u.position.set(0,.16,0),t.add(u);const f=this.createCurvedWindshieldGeometry(),g=new A(f,a),_=this.createCurvedFastbackGeometry(),m=new A(_,a);t.add(g,m);const p=new A(new $(.44,.24,.46),o);p.position.set(0,.76,.92);const x=new A(new rn(.05,12),new Nt({color:16711723}));x.position.set(-.12,.78,1.16);const S=new A(new rn(.05,12),new Nt({color:16711723}));S.position.set(0,.78,1.16);const v=new A(new rn(.05,12),new Nt({color:16711723}));v.position.set(.12,.78,1.16),t.add(p,x,S,v);const L=new A(new $(1.5,.28,.08),i);L.position.set(0,.46,2.08),t.add(L);const E=y=>{const R=new A(new Gt(.1,.1,.06,16),c);R.rotateX(Math.PI/2),R.position.set(y,.46,2.11);const k=new A(new Te(.1,.02,8,16),o);k.position.set(y,.46,2.12),t.add(R,k)};E(-.58),E(-.36),E(.36),E(.58);const C=new le;C.name="CarSpoiler";const w=new A(new $(1.6,.12,.22),e);w.position.set(0,.68,-2.04),w.rotation.x=-.22,C.add(w),t.add(C);const M=new A(new $(1.46,.14,.06),l);M.position.set(0,.5,-2.08),t.add(M)}buildHyperBody(t,e,n,i,r,o,a,c,l,h){const d=this.createUnibodyCarGeometry({length:4.32,noseZ:2.16,tailZ:-2.16,maxFrontWidth:1.86,waistWidth:1.52,maxRearWidth:1.94,frontWheelZ:1.3,rearWheelZ:-1.25,hoodCowlZ:.44,roofPeakZ:-.15,fastbackZ:-1.15,noseHeight:.28,cowlHeight:.52,roofHeight:.78,tailHeight:.48,sillHeight:.14}),u=new A(d,e);t.add(u);const f=new A(new $(1.66,.05,4.25),r);f.position.set(0,.12,0);const g=new A(new $(.06,.1,2.2),r);g.position.set(-.84,.16,0);const _=new A(new $(.06,.1,2.2),r);_.position.set(.84,.16,0),t.add(f,g,_);const m=new Ei(.64,20,16);m.scale(.92,.58,2);const p=new A(m,o);p.position.set(0,.62,-.15),t.add(p);const x=new A(new $(.035,.42,1.7),r);x.position.set(0,.74,-.92),t.add(x);const S=new A(new $(1.78,.045,.52),r);S.position.set(0,.16,2.12),t.add(S);const v=new A(new $(.24,.04,.05),l);v.position.set(-.62,.3,2.06),v.rotation.z=.35;const L=new A(new $(.24,.04,.05),l);L.position.set(.62,.3,2.06),L.rotation.z=-.35,t.add(v,L);const E=new le;E.name="CarSpoiler";const C=new A(new $(1.86,.05,.42),e);C.position.set(0,.86,-1.94);const w=new A(new $(.04,.38,.16),r);w.position.set(-.48,.68,-1.9);const M=new A(new $(.04,.38,.16),r);M.position.set(.48,.68,-1.9);const y=new A(new $(.04,.22,.44),l);y.position.set(-.93,.86,-1.94);const R=new A(new $(.04,.22,.44),l);R.position.set(.93,.86,-1.94),E.add(C,w,M,y,R),t.add(E);const k=new A(new $(1.55,.12,.48),r);k.position.set(0,.18,-1.96),k.rotation.x=.1;const F=new A(new $(1.48,.04,.04),h);F.position.set(0,.38,-2.12),t.add(k,F)}buildRallyBody(t,e,n,i,r,o,a,c,l){const h=this.createUnibodyCarGeometry({length:4.02,noseZ:2.01,tailZ:-2.01,maxFrontWidth:1.84,waistWidth:1.68,maxRearWidth:1.86,frontWheelZ:1.15,rearWheelZ:-1.15,hoodCowlZ:.46,roofPeakZ:-.12,fastbackZ:-1.15,noseHeight:.4,cowlHeight:.68,roofHeight:.96,tailHeight:.64,sillHeight:.2}),d=new A(h,e);t.add(d);const u=new A(new $(1.42,.05,.52),r);u.position.set(0,.19,1.88),u.rotation.x=-.25;const f=new A(new $(1.66,.06,3.9),r);f.position.set(0,.18,0),t.add(u,f);const g=this.createCurvedWindshieldGeometry(),_=new A(g,o),m=this.createCurvedFastbackGeometry(),p=new A(m,o);t.add(_,p);const x=new A(new $(.88,.08,.16),i);x.position.set(0,.5,1.55),t.add(x);for(let O=-.36;O<=.36;O+=.24){const U=new A(new Gt(.085,.085,.06,16),a);U.rotateX(Math.PI/2),U.position.set(O,.5,1.64),t.add(U)}const S=new A(new $(.38,.12,.44),r);S.position.set(0,.98,.2),t.add(S);const v=new le;v.name="CarSpoiler";const L=new A(new $(1.62,.05,.32),r);L.position.set(0,.98,-1.72);const E=new A(new $(1.68,.05,.38),e);E.position.set(0,1.16,-1.84);const C=new A(new $(.04,.35,.32),r);C.position.set(-.65,1.05,-1.78);const w=new A(new $(.04,.35,.32),r);w.position.set(.65,1.05,-1.78),v.add(L,E,C,w),t.add(v);const M=new Nt({color:16711723}),y=(O,U)=>{const Y=new A(new $(.24,.28,.03),M);Y.position.set(O,.22,U),t.add(Y)};y(-.86,.85),y(.86,.85),y(-.88,-1.45),y(.88,-1.45);const R=new A(new $(.22,.08,.06),a);R.position.set(-.58,.4,1.95);const k=new A(new $(.22,.08,.06),a);k.position.set(.58,.4,1.95);const F=new A(new $(.18,.28,.06),l);F.position.set(-.65,.65,-1.96);const H=new A(new $(.18,.28,.06),l);H.position.set(.65,.65,-1.96),t.add(R,k,F,H)}buildSpeedsterBody(t,e,n,i,r,o,a,c,l){const h=this.createUnibodyCarGeometry({length:3.96,noseZ:1.98,tailZ:-1.98,maxFrontWidth:1.76,waistWidth:1.58,maxRearWidth:1.8,frontWheelZ:1.2,rearWheelZ:-1.15,hoodCowlZ:.4,roofPeakZ:-.1,fastbackZ:-.92,noseHeight:.34,cowlHeight:.6,roofHeight:.68,tailHeight:.48,sillHeight:.16}),d=new A(h,e);t.add(d);const u=new Gt(.38,.4,.28,16,1,!1,0,Math.PI);u.rotateZ(Math.PI/2);const f=new A(u,e);f.position.set(-.76,.34,1.2);const g=new A(u,e);g.position.set(.76,.34,1.2);const _=new A(u,e);_.position.set(-.78,.36,-1.15);const m=new A(u,e);m.position.set(.78,.36,-1.15),t.add(f,g,_,m);const p=new A(new $(1.6,.06,3.9),r);p.position.set(0,.15,0),t.add(p);const x=new A(new Gt(.68,.68,.22,16,1,!1,-Math.PI/3,2*Math.PI/3),a);x.position.set(0,.68,.25),x.rotation.x=.35,t.add(x);const S=new qe(.22,.82,16);S.rotateX(-Math.PI/2);const v=new A(S,e);v.position.set(-.3,.62,-.45),t.add(v);const L=new A(new Ei(.08,12,12),o);L.position.set(-.72,.62,.32);const E=new A(new Ei(.08,12,12),o);E.position.set(.72,.62,.32),t.add(L,E);const C=U=>{const Y=new A(new Ei(.13,16,12),o);Y.position.set(U,.36,1.8);const W=new A(new Te(.12,.022,8,16),o);W.position.set(U,.36,1.91);const ot=new A(new rn(.11,16),c);ot.position.set(U,.36,1.92),t.add(Y,W,ot)};C(-.52),C(.52);const w=new A(new $(.5,.2,.08),o);w.position.set(0,.26,1.95);const M=new A(new $(.46,.16,.04),new Nt({color:1118485}));M.position.set(0,.26,1.96);const y=new A(new $(1.42,.06,.08),o);y.position.set(0,.22,1.97),t.add(w,M,y);const R=new A(new $(.025,.025,1.35),o);R.position.set(0,.48,1.05),R.rotation.x=-.14,t.add(R);const k=new A(new Gt(.08,.08,.05,16),l);k.rotateX(Math.PI/2),k.position.set(-.54,.46,-1.94);const F=new A(new Gt(.08,.08,.05,16),l);F.rotateX(Math.PI/2),F.position.set(.54,.46,-1.94);const H=new A(new $(.08,.14,.08),o);H.position.set(-.42,.36,-1.96);const O=new A(new $(.08,.14,.08),o);O.position.set(.42,.36,-1.96),t.add(k,F,H,O)}}class zo{constructor(t,e,n,i=!0){this.config=t,this.physics=t.physics||{},this.isPlayer=i,this.skinFileName=e,this.bodyColor=n,this.game=null,this.position=new P(0,.05,0),this.velocity=new P(0,0,0),this.speed=0,this.steeringAngle=0,this.rotationY=0,this.pitch=0,this.roll=0,this.sampleIndexHint=-1,this.isFeathering=!1,this.featheringHistoryTimer=0,this.apexBonusTimer=0,this.isDrifting=!1,this.driftDirection=0,this.driftTimer=0,this.driftLevel=0,this.boostTimer=0,this.nitroFuel=100,this.isNitroActive=!1,this.currentItem=null,this.isInvincible=!1,this.isSpinning=!1,this.spinTimer=0,this.totalLaps=3,this.lap=1,this.currentCheckpoint=0,this.hasPassedHalfway=!1,this.totalDistance=0,this.lapTimes=[],this.currentLapTime=0,this.bestLapTime=null,this.isFinished=!1,this.finishRank=1,this.isHittingBarrier=!1,this.lastBounceTime=0,this.lastCarHitTime=0,this.model=null,this.wheels=null,this.steerGroups=null,this.exhaustPipes=null,this.brakeLightMat=null,this.underglowMat=null,this.inputs={throttle:0,steer:0,drift:!1,boost:!1,reset:!1},this.wheelRotation=0,this.lastBounceTime=0}setModel(t){this.model=t.root,this.chassis=t.chassis,this.wheels=t.wheels,this.steerGroups=t.steerGroups,this.exhaustPipes=t.exhaustPipes,this.brakeLightMat=t.brakeLightMat,this.underglowMat=t.underglowMat}update(t,e){if(this.isFinished&&this.speed>12&&(this.inputs.throttle=.25),this.spinTimer>0){this.spinTimer-=t,this.isSpinning=!0,this.rotationY+=t*14,this.speed=Math.max(0,this.speed-t*30),this.velocity.set(0,0,0),this.spinTimer<=0&&(this.isSpinning=!1),this.updateVisuals(t),this.updateTrackProgress(t,e);return}this.handleInputs(t,e),this.updatePhysics(t,e),this.updateVisuals(t),this.updateTrackProgress(t,e)}handleInputs(t,e){this.inputs.boost&&this.nitroFuel>12&&this.boostTimer<=0&&(this.boostTimer=2.2,this.nitroFuel=Math.max(0,this.nitroFuel-32),this.isNitroActive=!0),this.boostTimer>0?(this.boostTimer-=t,this.boostTimer<=0&&(this.isNitroActive=!1)):this.nitroFuel=Math.min(100,this.nitroFuel+t*6.5);const n=this.speed>10;if(this.inputs.drift&&n&&Math.abs(this.inputs.steer)>.08)this.isDrifting||(this.isDrifting=!0,this.driftDirection=Math.sign(this.inputs.steer),this.driftTimer=0),this.driftTimer+=t,this.driftTimer>2?this.driftLevel=3:this.driftTimer>1.2?this.driftLevel=2:this.driftTimer>.55?this.driftLevel=1:this.driftLevel=0;else if(this.isDrifting){if(this.driftLevel>0){const i=[0,.75,1.3,1.9];this.boostTimer=Math.max(this.boostTimer,i[this.driftLevel]),this.nitroFuel=Math.min(100,this.nitroFuel+this.driftLevel*14),this.game&&this.game.audio&&this.game.audio.playBoostSound()}this.isDrifting=!1,this.driftTimer=0,this.driftLevel=0}this.inputs.reset&&this.respawn(e)}updatePhysics(t,e){const n=this.physics,i=n.maxSpeed||50;let r=i,o=n.accelRate||23;if(this.boostTimer>0&&(r=i*1.45,o*=1.8),this.inputs.throttle>0){if(this.speed<r){const x=Math.min(1,Math.max(0,this.speed/r)),S=Math.max(.22,1-x*.65);this.speed+=this.inputs.throttle*o*S*t}this.featheringHistoryTimer>.35&&Math.abs(this.steeringAngle)<.25&&(this.apexBonusTimer=.6,this.featheringHistoryTimer=0,this.isPlayer&&this.game&&(this.game.audio&&this.game.audio.playBoostSound(),this.game.hud&&this.game.hud.showReaction("⚡ APEX EXIT! สปีดพุ่ง!",1200)))}else if(this.inputs.throttle<0)if(this.speed>0){const x=n.brakeRate||35;this.speed-=x*t,this.speed<0&&(this.speed=0)}else this.speed>-r*.3&&(this.speed-=o*.4*t);else{const x=this.isDrifting?4.5:2;this.speed>0?this.speed=Math.max(0,this.speed-x*t):this.speed<0&&(this.speed=Math.min(0,this.speed+x*t))}this.apexBonusTimer>0&&(this.apexBonusTimer-=t,this.speed=Math.min(r*1.15,this.speed+o*.7*t)),this.boostTimer<=0&&this.apexBonusTimer<=0&&this.speed>i&&(this.speed=Math.max(i,this.speed-28*t));const a=Math.abs(this.inputs.steer)>.15,c=this.inputs.throttle<=.3&&this.inputs.throttle>=0,l=this.speed>16;a&&c&&l&&!this.isDrifting?(this.isFeathering=!0,this.featheringHistoryTimer+=t):(this.isFeathering=!1,this.inputs.throttle<=0?this.featheringHistoryTimer=Math.max(0,this.featheringHistoryTimer-t*.5):this.apexBonusTimer<=0&&(this.featheringHistoryTimer=0));const h=this.inputs.steer;this.steeringAngle=en.lerp(this.steeringAngle,h,t*20);const d=Math.abs(this.steeringAngle);if(d>.08&&Math.abs(this.speed)>4){const S=Math.abs(this.speed)/i*4.8,v=d*(2.4+S),L=this.isFeathering?.6:this.isDrifting?.75:1;this.speed>0&&(this.speed=Math.max(0,this.speed-v*L*t))}const u=Math.min(1,.45+Math.abs(this.speed)/10*.55),f=n.turnRate||2.85;let g=1.05;this.isFeathering&&(g=1.3);let _=f*this.steeringAngle*u*g*Math.sign(this.speed||1);this.isDrifting&&(_*=1.65),this.rotationY+=_*t;const m=new P(Math.sin(this.rotationY),0,Math.cos(this.rotationY));let p=m.clone();if(this.isDrifting&&Math.abs(this.speed)>4){const x=this.driftDirection*.36;p.applyAxisAngle(new P(0,1,0),x)}if(this.velocity.copy(p).multiplyScalar(this.speed),this.position.addScaledVector(this.velocity,t),e){const x=e.getClosest(this.position,this.sampleIndexHint);this.sampleIndexHint=x.index;const S=e.maxAllowedLateral||e.trackWidth/2-.9,v=x.lateral;if(Math.abs(v)>S){const E=Math.sign(v),w=Math.abs(v)-S+.08;this.position.addScaledVector(x.normal,-E*w);const M=m.dot(x.normal)*E,y=performance.now();if(this.isHittingBarrier?this.speed=Math.max(0,this.speed-35*t):(this.isHittingBarrier=!0,M>.25?this.speed=Math.max(0,this.speed*.4):this.speed=Math.max(0,this.speed*.58),this.boostTimer=0,this.isNitroActive=!1,this.isPlayer&&this.game&&this.game.hud&&this.game.hud.showReaction("💥 ชนที่กั้น! ความเร็วตกฮวบ",1200)),this.game&&(this.game.audio&&(!this.lastBounceTime||y-this.lastBounceTime>280)&&(this.lastBounceTime=y,this.game.audio.playCollision()),this.game.particles&&Math.abs(this.speed)>4)){const R=this.position.clone().addScaledVector(x.normal,E*.6);this.game.particles.emitDriftSparks(R,2)}}else this.isHittingBarrier=!1;const L=x.point.y+.05;if(this.position.y=en.lerp(this.position.y,L,t*16),e.boostPads&&e.boostPads.length>0)for(let E=0;E<e.boostPads.length;E++){const C=e.boostPads[E];if(this.position.distanceTo(C.position)<C.radius&&this.boostTimer<2){this.boostTimer=2.6,this.speed=Math.max(this.speed,(n.maxSpeed||50)*1.35),this.nitroFuel=Math.min(100,this.nitroFuel+25),this.isPlayer&&this.game&&this.game.audio&&(this.game.audio.playBoostSound(),this.game.hud&&this.game.hud.showReaction("🚀 บูสต์เร่งความเร็ว!",1200));break}}}}updateVisuals(t){if(!this.model)return;this.model.position.copy(this.position);const e=this.isDrifting?-this.driftDirection*.12:-this.steeringAngle*.08*(Math.abs(this.speed)/30);this.roll=en.lerp(this.roll,e,t*8);const n=this.inputs.throttle>0?-.04:this.inputs.throttle<0?.06:0;if(this.pitch=en.lerp(this.pitch,n,t*8),this.model.rotation.set(this.pitch,this.rotationY,this.roll,"YXZ"),this.steerGroups){const r=this.steeringAngle*.45;this.steerGroups.forEach(o=>{o.rotation.y=r})}this.wheelRotation+=this.speed/.35*t,this.wheels&&Object.values(this.wheels).forEach(i=>{i&&i.children.length>=2&&(i.children[0].rotation.x=this.wheelRotation,i.children[1].rotation.x=this.wheelRotation)}),this.brakeLightMat&&(this.inputs.throttle<0||this.inputs.drift&&this.speed>5?this.brakeLightMat.color.setHex(16711714):this.brakeLightMat.color.setHex(5570577))}updateTrackProgress(t,e){if(!e||this.isFinished)return;this.currentLapTime+=t;const n=e.getClosest(this.position,this.sampleIndexHint);this.sampleIndexHint=n.index;const i=n.t;if(i>.4&&i<.6&&(this.hasPassedHalfway=!0),this.hasPassedHalfway&&i<.15){this.hasPassedHalfway=!1,this.lapTimes.push(this.currentLapTime),(!this.bestLapTime||this.currentLapTime<this.bestLapTime)&&(this.bestLapTime=this.currentLapTime),this.currentLapTime=0;const r=this.totalLaps||3;this.lap>=r?this.isFinished=!0:(this.lap+=1,this.isPlayer&&this.game&&this.game.hud&&this.game.hud.showNotification(`รอบที่ ${this.lap} / ${r}!`))}this.totalDistance=this.lap-1+i}respawn(t){if(!t)return;const e=t.getClosest(this.position,this.sampleIndexHint),n=t.getRespawnTransform(e.t);this.position.copy(n.position),this.rotationY=n.rotationY,this.speed=0,this.velocity.set(0,0,0),this.boostTimer=0,this.isDrifting=!1,this.isSpinning=!1,this.spinTimer=0,this.sampleIndexHint=n.index}getSpeedKmh(){return Math.max(0,Math.round(Math.abs(this.speed)*3.6))}}class Gc extends zo{constructor(t,e,n,i,r=0,o=.88){super(t,e,n,!1),this.name=i,this.laneOffset=r,this.skill=o,this.currentT=0,this.lookAheadDistance=.035,this.stuckTimer=0,this.itemThinkTimer=0,this.aiDifficultyMul=1}setDifficulty(t=1){this.aiDifficultyMul=t}updateAI(t,e,n,i=[]){var E;if(!e)return;if(this.game&&!this.game.isRacing){this.speed=0,this.inputs.throttle=0,this.inputs.steer=0,this.inputs.boost=!1,this.inputs.drift=!1,this.updateVisuals(t);return}const r=e.getClosest(this.position,this.sampleIndexHint);this.sampleIndexHint=r.index,this.currentT=r.t;const o=.026+Math.min(.042,Math.abs(this.speed)/55*.035),a=(r.t+o)%1,c=e.indexFromT(a),l=e.samplePos[c],h=e.sampleNorm[c],d=l.clone().addScaledVector(h,this.laneOffset);d.y=.05;const u=new P().subVectors(d,this.position);u.y=0;const f=new P(Math.sin(this.rotationY),0,Math.cos(this.rotationY)),g=u.clone().normalize(),_=new P().crossVectors(f,g),m=f.dot(g),p=Math.atan2(_.y,m);this.inputs.steer=en.clamp(p*2.5,-1,1);const x=Math.abs(e.sampleCurv[c]||0),S=Math.max(Math.abs(p),x*35),v=((E=e.def)==null?void 0:E.aiSpeedMul)||1,L=this.skill*this.aiDifficultyMul*v;S>.45?(this.inputs.throttle=.25*L,this.speed>22&&Math.random()<.2&&(this.inputs.drift=!0)):S>.22?(this.inputs.throttle=.65*L,this.inputs.drift=!1):(this.inputs.throttle=1*L,this.inputs.drift=!1,S<.12&&this.nitroFuel>40&&Math.random()<.02?this.inputs.boost=!0:this.inputs.boost=!1),this.itemThinkTimer+=t,this.itemThinkTimer>.8&&(this.itemThinkTimer=0,this.thinkAndUseItem(e,n,i)),Math.abs(this.speed)<2.5&&this.inputs.throttle>.3?(this.stuckTimer+=t,this.stuckTimer>2.5&&(this.respawn(e),this.stuckTimer=0)):this.stuckTimer=Math.max(0,this.stuckTimer-t*2),super.update(t,e)}thinkAndUseItem(t,e,n){if(!this.currentItem||!this.game||!this.game.items)return;const i=this.currentItem;i==="boost"?Math.abs(this.steeringAngle)<.2&&this.game.items.useItem(this):i==="banana"?(n.some(a=>a===this?!1:this.position.distanceTo(a.position)<18&&this.totalDistance>a.totalDistance)||Math.random()<.25)&&this.game.items.useItem(this):i==="missile"?(n.some(o=>o===this?!1:this.position.distanceTo(o.position)<40&&o.totalDistance>this.totalDistance)||Math.random()<.35)&&this.game.items.useItem(this):i==="shield"&&this.game.items.useItem(this)}}class xg{constructor(t){this.scene=t,this.particles=[];const e=document.createElement("canvas");e.width=64,e.height=64;const n=e.getContext("2d"),i=n.createRadialGradient(32,32,4,32,32,30);i.addColorStop(0,"rgba(255, 255, 255, 0.8)"),i.addColorStop(.5,"rgba(200, 200, 220, 0.4)"),i.addColorStop(1,"rgba(150, 150, 180, 0)"),n.fillStyle=i,n.fillRect(0,0,64,64),this.smokeTex=new Re(e),this.smokeGeo=new he(.8,.8),this.sparkGeo=new he(.18,.18),this.flameGeo=new qe(.15,.8,8),this.flameGeo.rotateX(Math.PI/2),this.flameMat=new Nt({color:65535,transparent:!0,opacity:.85,blending:Ye})}emitTireSmoke(t,e=14540253){const n=new Nt({map:this.smokeTex,transparent:!0,opacity:.45,depthWrite:!1,blending:Nn}),i=new A(this.smokeGeo,n);i.position.copy(t),i.position.y+=.1,i.rotation.z=Math.random()*Math.PI*2,this.scene.add(i),this.particles.push({mesh:i,velocity:new P((Math.random()-.5)*.5,.5+Math.random()*.5,(Math.random()-.5)*.5),scaleGrowth:2.5,life:.6,maxLife:.6})}emitCelebrationFirework(t){const e=[16766720,61695,16711765,65416,16777215,14483711],n=e[Math.floor(Math.random()*e.length)];for(let i=0;i<20;i++){const r=new Nt({color:n,transparent:!0,opacity:1,blending:Ye}),o=new A(this.sparkGeo,r);o.scale.setScalar(1.6+Math.random()*1.6),o.position.copy(t),this.scene.add(o);const a=Math.random()*Math.PI*2,c=3.5+Math.random()*6.5,l=2.5+Math.random()*6;this.particles.push({mesh:o,velocity:new P(Math.cos(a)*c,l,Math.sin(a)*c),scaleGrowth:-.6,life:.8+Math.random()*.4,maxLife:1.2})}}emitDriftSparks(t,e=1){const i=[61695,54015,16755200,14483711][e]||61695;for(let r=0;r<2;r++){const o=new Nt({color:i,transparent:!0,opacity:.9,blending:Ye}),a=new A(this.sparkGeo,o);a.position.copy(t),this.scene.add(a),this.particles.push({mesh:a,velocity:new P((Math.random()-.5)*3,1+Math.random()*2,(Math.random()-.5)*3),scaleGrowth:-.5,life:.35,maxLife:.35})}}emitExhaustFlame(t,e){!t||t.length===0||!e||t.forEach(n=>{const i=new P;n.getWorldPosition(i);const r=new Nt({color:Math.random()>.5?61695:16711867,transparent:!0,opacity:.85,blending:Ye}),o=new A(this.flameGeo,r);o.position.copy(i),o.quaternion.copy(n.parent.quaternion),this.scene.add(o),this.particles.push({mesh:o,velocity:new P(0,0,0),scaleGrowth:-1.2,life:.12,maxLife:.12})})}update(t,e){for(let n=this.particles.length-1;n>=0;n--){const i=this.particles[n];if(i.life-=t,i.life<=0){this.scene.remove(i.mesh),i.mesh.geometry.dispose(),i.mesh.material.dispose(),this.particles.splice(n,1);continue}e&&i.mesh.geometry===this.smokeGeo&&i.mesh.quaternion.copy(e.quaternion),i.mesh.position.addScaledVector(i.velocity,t);const r=1+i.scaleGrowth*t;i.mesh.scale.multiplyScalar(Math.max(.1,r)),i.mesh.material.opacity=i.life/i.maxLife*.6}}}class yg{constructor(){if(this.ctx=null,this.isMuted=!1,this.bgmPlaying=!1,this.engineGain=null,this.engineOsc=null,this.engineSub=null,this.screechGain=null,this.screechSource=null,this.bgmInterval=null,this.speechVoices=[],typeof window<"u"&&"speechSynthesis"in window){window.speechSynthesis.onvoiceschanged=()=>{try{this.speechVoices=window.speechSynthesis.getVoices()}catch{}};try{this.speechVoices=window.speechSynthesis.getVoices()}catch{}}}init(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}const t=window.AudioContext||window.webkitAudioContext;t&&(this.ctx=new t,this.setupEngineSynth(),this.setupScreechSynth())}setupEngineSynth(){this.ctx&&(this.engineGain=this.ctx.createGain(),this.engineGain.gain.setValueAtTime(0,this.ctx.currentTime),this.engineGain.connect(this.ctx.destination),this.engineOsc=this.ctx.createOscillator(),this.engineOsc.type="sawtooth",this.engineOsc.frequency.setValueAtTime(60,this.ctx.currentTime),this.engineSub=this.ctx.createOscillator(),this.engineSub.type="triangle",this.engineSub.frequency.setValueAtTime(30,this.ctx.currentTime),this.engineFilter=this.ctx.createBiquadFilter(),this.engineFilter.type="lowpass",this.engineFilter.frequency.setValueAtTime(800,this.ctx.currentTime),this.engineOsc.connect(this.engineFilter),this.engineSub.connect(this.engineFilter),this.engineFilter.connect(this.engineGain),this.engineOsc.start(),this.engineSub.start())}setupScreechSynth(){if(!this.ctx)return;const t=this.ctx.sampleRate*2,e=this.ctx.createBuffer(1,t,this.ctx.sampleRate),n=e.getChannelData(0);for(let o=0;o<t;o++)n[o]=Math.random()*2-1;const i=this.ctx.createBufferSource();i.buffer=e,i.loop=!0;const r=this.ctx.createBiquadFilter();r.type="bandpass",r.frequency.setValueAtTime(1400,this.ctx.currentTime),r.Q.setValueAtTime(4,this.ctx.currentTime),this.screechGain=this.ctx.createGain(),this.screechGain.gain.setValueAtTime(0,this.ctx.currentTime),i.connect(r),r.connect(this.screechGain),this.screechGain.connect(this.ctx.destination),i.start()}updateEngine(t,e,n,i){if(!this.ctx||this.isMuted)return;this.ctx.state==="suspended"&&this.ctx.resume();const r=55,o=t/280*190,a=e>0?30:0,c=i?60:0,l=r+o+a+c;this.engineOsc.frequency.setTargetAtTime(l,this.ctx.currentTime,.05),this.engineSub.frequency.setTargetAtTime(l*.5,this.ctx.currentTime,.05);const h=Math.min(.26,.06+t/280*.16+(e>0?.05:0));this.engineGain.gain.setTargetAtTime(h,this.ctx.currentTime,.08),n&&t>20?this.screechGain.gain.setTargetAtTime(.18,this.ctx.currentTime,.05):this.screechGain.gain.setTargetAtTime(0,this.ctx.currentTime,.05)}playGridIntroSwoosh(){if(!this.ctx||this.isMuted)return;const t=this.ctx.currentTime,e=this.ctx.createOscillator(),n=this.ctx.createGain();e.type="sawtooth",e.frequency.setValueAtTime(220,t),e.frequency.exponentialRampToValueAtTime(880,t+.7);const i=this.ctx.createBiquadFilter();i.type="lowpass",i.frequency.setValueAtTime(800,t),i.frequency.exponentialRampToValueAtTime(3200,t+.7),n.gain.setValueAtTime(.001,t),n.gain.exponentialRampToValueAtTime(.2,t+.12),n.gain.exponentialRampToValueAtTime(.001,t+1.1),e.connect(i),i.connect(n),n.connect(this.ctx.destination),e.start(t),e.stop(t+1.1)}playCountdown(t=440,e=.15){if(!this.ctx||this.isMuted)return;const n=this.ctx.createOscillator(),i=this.ctx.createGain();n.type="sine",n.frequency.setValueAtTime(t,this.ctx.currentTime),i.gain.setValueAtTime(.3,this.ctx.currentTime),i.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+e),n.connect(i),i.connect(this.ctx.destination),n.start(),n.stop(this.ctx.currentTime+e)}playBoostSound(){if(!this.ctx||this.isMuted)return;const t=this.ctx.createOscillator(),e=this.ctx.createGain();t.type="sawtooth",t.frequency.setValueAtTime(200,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(800,this.ctx.currentTime+.35),e.gain.setValueAtTime(.35,this.ctx.currentTime),e.gain.exponentialRampToValueAtTime(.01,this.ctx.currentTime+.5),t.connect(e),e.connect(this.ctx.destination),t.start(),t.stop(this.ctx.currentTime+.5)}playCollision(){this.playCollisionThud()}playCollisionThud(){if(!this.ctx||this.isMuted)return;const t=this.ctx.createOscillator(),e=this.ctx.createGain();t.type="triangle",t.frequency.setValueAtTime(140,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(30,this.ctx.currentTime+.2),e.gain.setValueAtTime(.4,this.ctx.currentTime),e.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.2),t.connect(e),e.connect(this.ctx.destination),t.start(),t.stop(this.ctx.currentTime+.2)}playItemPickup(){if(!this.ctx||this.isMuted)return;[587.33,880].forEach((e,n)=>{const i=this.ctx.createOscillator(),r=this.ctx.createGain(),o=this.ctx.currentTime+n*.08;i.type="sine",i.frequency.setValueAtTime(e,o),r.gain.setValueAtTime(.25,o),r.gain.exponentialRampToValueAtTime(.001,o+.15),i.connect(r),r.connect(this.ctx.destination),i.start(o),i.stop(o+.15)})}playSlip(){if(!this.ctx||this.isMuted)return;const t=this.ctx.createOscillator(),e=this.ctx.createGain();t.type="sawtooth",t.frequency.setValueAtTime(600,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(150,this.ctx.currentTime+.35),e.gain.setValueAtTime(.3,this.ctx.currentTime),e.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.35),t.connect(e),e.connect(this.ctx.destination),t.start(),t.stop(this.ctx.currentTime+.35)}playMissileShoot(){if(!this.ctx||this.isMuted)return;const t=this.ctx.createOscillator(),e=this.ctx.createGain();t.type="square",t.frequency.setValueAtTime(300,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(700,this.ctx.currentTime+.25),e.gain.setValueAtTime(.25,this.ctx.currentTime),e.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.25),t.connect(e),e.connect(this.ctx.destination),t.start(),t.stop(this.ctx.currentTime+.25)}playGridIntroSwoosh(){if(!this.ctx||this.isMuted)return;const t=this.ctx.currentTime;try{const e=Math.floor(this.ctx.sampleRate*1.8),n=this.ctx.createBuffer(1,e,this.ctx.sampleRate),i=n.getChannelData(0);for(let h=0;h<e;h++)i[h]=(Math.random()*2-1)*.7;const r=this.ctx.createBufferSource();r.buffer=n;const o=this.ctx.createBiquadFilter();o.type="bandpass",o.Q.value=3.5,o.frequency.setValueAtTime(260,t),o.frequency.exponentialRampToValueAtTime(3400,t+1.1),o.frequency.exponentialRampToValueAtTime(320,t+1.8);const a=this.ctx.createGain();a.gain.setValueAtTime(.01,t),a.gain.linearRampToValueAtTime(.3,t+.7),a.gain.exponentialRampToValueAtTime(.001,t+1.8),r.connect(o),o.connect(a),a.connect(this.ctx.destination),r.start(t),r.stop(t+1.8);const c=this.ctx.createOscillator(),l=this.ctx.createGain();c.type="sawtooth",c.frequency.setValueAtTime(55,t),c.frequency.exponentialRampToValueAtTime(140,t+1.4),l.gain.setValueAtTime(.18,t),l.gain.exponentialRampToValueAtTime(.001,t+1.8),c.connect(l),l.connect(this.ctx.destination),c.start(t),c.stop(t+1.8)}catch{}}playVictoryChime(){if(!this.ctx||this.isMuted)return;const t=this.ctx.currentTime;[{time:0,notes:[523.25,659.25]},{time:.16,notes:[587.33,698.46]},{time:.32,notes:[659.25,783.99]},{time:.48,notes:[783.99,987.77]},{time:.68,notes:[1046.5,1318.51,1567.98]}].forEach(n=>{n.notes.forEach(i=>{const r=this.ctx.createOscillator(),o=this.ctx.createGain(),a=t+n.time,c=n.time>=.68?1.8:.35;r.type="sawtooth",r.frequency.setValueAtTime(i,a),o.gain.setValueAtTime(.001,a),o.gain.exponentialRampToValueAtTime(.22,a+.04),o.gain.exponentialRampToValueAtTime(.001,a+c);const l=this.ctx.createBiquadFilter();l.type="lowpass",l.frequency.setValueAtTime(2600,a),r.connect(l),l.connect(o),o.connect(this.ctx.destination),r.start(a),r.stop(a+c)})});try{const n=this.ctx.sampleRate*2.2,i=this.ctx.createBuffer(1,n,this.ctx.sampleRate),r=i.getChannelData(0);for(let l=0;l<n;l++)r[l]=(Math.random()*2-1)*Math.exp(-l/(n*.7));const o=this.ctx.createBufferSource();o.buffer=i;const a=this.ctx.createBiquadFilter();a.type="bandpass",a.frequency.setValueAtTime(950,t+.6),a.Q.setValueAtTime(1.4,t+.6);const c=this.ctx.createGain();c.gain.setValueAtTime(.001,t+.6),c.gain.exponentialRampToValueAtTime(.25,t+.85),c.gain.exponentialRampToValueAtTime(.001,t+2.5),o.connect(a),a.connect(c),c.connect(this.ctx.destination),o.start(t+.6)}catch{}}toggleBgm(){return this.init(),this.bgmPlaying?this.stopBgm():this.startBgm(),this.bgmPlaying}startBgm(){if(!this.ctx||this.bgmPlaying)return;this.bgmPlaying=!0;const t=[110,110,130.81,146.83,110,110,164.81,146.83];let e=0;this.bgmInterval=setInterval(()=>{if(!this.bgmPlaying||this.isMuted)return;const n=t[e%t.length];e++;const i=this.ctx.createOscillator(),r=this.ctx.createGain();i.type="sawtooth",i.frequency.setValueAtTime(n,this.ctx.currentTime),r.gain.setValueAtTime(.12,this.ctx.currentTime),r.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.18);const o=this.ctx.createBiquadFilter();o.type="lowpass",o.frequency.setValueAtTime(700,this.ctx.currentTime),i.connect(o),o.connect(r),r.connect(this.ctx.destination),i.start(),i.stop(this.ctx.currentTime+.18)},160)}stopBgm(){this.bgmPlaying=!1,this.bgmInterval&&(clearInterval(this.bgmInterval),this.bgmInterval=null)}toggleMute(){return this.isMuted=!this.isMuted,this.isMuted&&this.stopSpeech(),this.engineGain&&this.engineGain.gain.setValueAtTime(this.isMuted?0:.1,this.ctx.currentTime),this.isMuted}announceRacer(t,e=!1,n=1){if(!(typeof window>"u"||!("speechSynthesis"in window)||this.isMuted))try{window.speechSynthesis.cancel();const i=this.speechVoices&&this.speechVoices.length>0?this.speechVoices:window.speechSynthesis.getVoices(),o=i.find(d=>{const u=(d.lang||"").toLowerCase(),f=(d.name||"").toLowerCase();return(u.startsWith("th")||f.includes("thai")||f.includes("ไทย"))&&(f.includes("niwat")||f.includes("male")||f.includes("ชาย"))})||i.find(d=>{const u=(d.lang||"").toLowerCase(),f=(d.name||"").toLowerCase();return u.startsWith("th")||f.includes("thai")||f.includes("ไทย")});let a=(t||"").replace(/\s*\([^)]*\)/g,"").replace(/#\d+/g,"").replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/gu,"").trim();!a&&e&&(a="นักซิ่งอาชิ");const c={1:"หนึ่ง",2:"สอง",3:"สาม",4:"สี่",5:"ห้า",6:"หก",7:"เจ็ด",8:"แปด"};let l="";if(o){const d=c[n]||`${n}`;l=a?`${d}, ${a}`:d}else l=a?`${n}, ${a}`:`${n}`;const h=new SpeechSynthesisUtterance(l);if(o)h.voice=o,h.lang="th-TH";else{const d=i.find(u=>{const f=(u.name||"").toLowerCase();return u.lang.startsWith("en")&&(f.includes("david")||f.includes("guy")||f.includes("male")||f.includes("natural"))})||i.find(u=>u.lang.startsWith("en"));d&&(h.voice=d),h.lang="en-US"}h.pitch=0,h.rate=.92,h.volume=1,window.speechSynthesis.speak(h)}catch(i){console.warn("Speech synthesis notice:",i)}}playAnnouncerImpact(t=!1){if(!this.ctx||this.isMuted)return;const e=this.ctx.currentTime;try{const n=this.ctx.createOscillator(),i=this.ctx.createGain();n.type="sine",n.frequency.setValueAtTime(t?95:75,e),n.frequency.exponentialRampToValueAtTime(20,e+.45),i.gain.setValueAtTime(.001,e),i.gain.linearRampToValueAtTime(t?.5:.42,e+.02),i.gain.exponentialRampToValueAtTime(.001,e+.52),n.connect(i),i.connect(this.ctx.destination),n.start(e),n.stop(e+.55);const r=this.ctx.createOscillator(),o=this.ctx.createGain();r.type="triangle",r.frequency.setValueAtTime(t?135:105,e),r.frequency.exponentialRampToValueAtTime(38,e+.3),o.gain.setValueAtTime(.001,e),o.gain.linearRampToValueAtTime(.28,e+.015),o.gain.exponentialRampToValueAtTime(.001,e+.34),r.connect(o),o.connect(this.ctx.destination),r.start(e),r.stop(e+.35);const a=this.ctx.createOscillator(),c=this.ctx.createGain();a.type="sine",a.frequency.setValueAtTime(1550,e),a.frequency.setValueAtTime(2100,e+.022),c.gain.setValueAtTime(.05,e),c.gain.exponentialRampToValueAtTime(.001,e+.045),a.connect(c),c.connect(this.ctx.destination),a.start(e),a.stop(e+.05)}catch{}}stopSpeech(){if(typeof window<"u"&&"speechSynthesis"in window)try{window.speechSynthesis.cancel()}catch{}}}class Sg{constructor(t,e){this.canvas=t,this.ctx=this.canvas.getContext("2d"),this.width=this.canvas.width,this.height=this.canvas.height,this.setTrack(e)}setTrack(t){this.track=t,this.bounds=this.computeBounds()}computeBounds(){if(!this.track||!this.track.samplePos)return{minX:-100,maxX:100,minZ:-100,maxZ:100,midX:0,midZ:0,maxRange:200};const t=this.track.getBounds(),e=30,n=t.maxX-t.minX+e*2,i=t.maxZ-t.minZ+e*2,r=Math.max(n,i,50);return{minX:t.minX,maxX:t.maxX,minZ:t.minZ,maxZ:t.maxZ,midX:t.cx,midZ:t.cz,maxRange:r}}worldToMap(t,e){const n=this.width-24,i=(t-(this.bounds.midX-this.bounds.maxRange/2))/this.bounds.maxRange,r=(this.bounds.midZ+this.bounds.maxRange/2-e)/this.bounds.maxRange;return{x:Math.max(4,Math.min(this.width-4,i*n+12)),y:Math.max(4,Math.min(this.height-4,r*n+12))}}render(t,e=[]){var r;if(!this.track)return;const n=this.ctx;n.clearRect(0,0,this.width,this.height),n.strokeStyle="#1a2238",n.lineWidth=14,n.lineCap="round",n.lineJoin="round",this.drawPath(n),n.strokeStyle=(r=this.track.theme)!=null&&r.railB?`#${this.track.theme.railB.toString(16).padStart(6,"0")}`:"#324060",n.lineWidth=6,this.drawPath(n);const i=this.track.samplePos[0];if(i){const o=this.worldToMap(i.x,i.z);n.fillStyle="#ffffff",n.fillRect(o.x-5,o.y-2,10,4)}if(e.forEach(o=>{if(!o||!o.position)return;const a=this.worldToMap(o.position.x,o.position.z);n.fillStyle=o.bodyColor||"#ffaa00",n.beginPath(),n.arc(a.x,a.y,4,0,Math.PI*2),n.fill(),n.strokeStyle="#000000",n.lineWidth=1.5,n.stroke()}),t&&t.position){const o=this.worldToMap(t.position.x,t.position.z);n.save(),n.translate(o.x,o.y),n.strokeStyle="#00f0ffaa",n.lineWidth=2,n.beginPath(),n.arc(0,0,7.5,0,Math.PI*2),n.stroke();const a=-t.rotationY;n.rotate(a),n.fillStyle="#00f3ff",n.beginPath(),n.moveTo(0,-7),n.lineTo(5,5),n.lineTo(0,3),n.lineTo(-5,5),n.closePath(),n.fill(),n.restore()}}drawPath(t){if(!this.track||!this.track.samplePos)return;const e=this.track.sampleCount,n=Math.max(1,Math.floor(e/120));t.beginPath();let i=!0;for(let r=0;r<e;r+=n){const o=this.track.samplePos[r],a=this.worldToMap(o.x,o.z);i?(t.moveTo(a.x,a.y),i=!1):t.lineTo(a.x,a.y)}t.closePath(),t.stroke()}}class Mg{constructor(t,e,n,i,r){this.scene=t,this.track=e,this.particles=n,this.audio=i,this.hud=r,this.itemBoxes=[],this.activeBananas=[],this.activeMissiles=[],this.itemTypes=["boost","banana","missile","shield"],this.initItemBoxes()}resetForTrack(t){this.itemBoxes.forEach(e=>{e.mesh&&(this.scene.remove(e.mesh),e.mesh.geometry.dispose(),e.mesh.material&&e.mesh.material.dispose())}),this.itemBoxes=[],this.activeBananas.forEach(e=>{e.mesh&&(this.scene.remove(e.mesh),e.mesh.geometry.dispose(),e.mesh.material&&e.mesh.material.dispose())}),this.activeBananas=[],this.activeMissiles.forEach(e=>{e.mesh&&(this.scene.remove(e.mesh),e.mesh.geometry.dispose(),e.mesh.material&&e.mesh.material.dispose())}),this.activeMissiles=[],this.track=t,this.initItemBoxes()}initItemBoxes(){var l;if(!this.track)return;const t=((l=this.track.def)==null?void 0:l.itemClusters)||[.2,.45,.75],e=new $(1.3,1.3,1.3),n=document.createElement("canvas");n.width=128,n.height=128;const i=n.getContext("2d");i.fillStyle="#ff0077aa",i.fillRect(0,0,128,128),i.strokeStyle="#00f3ff",i.lineWidth=8,i.strokeRect(4,4,120,120),i.font="bold 80px sans-serif",i.fillStyle="#ffd700",i.textAlign="center",i.textBaseline="middle",i.fillText("?",64,64);const r=new Re(n);r.colorSpace=pe;const o=new Nt({map:r,transparent:!0,opacity:.88}),a=(this.track.roadWidth||16)/2,c=[-a*.55,0,a*.55];t.forEach(h=>{const d=this.track.indexFromT(h),u=this.track.samplePos[d],f=this.track.sampleNorm[d];c.forEach(g=>{const _=u.clone().addScaledVector(f,g);_.y=1.1;const m=new A(e,o);m.position.copy(_),this.scene.add(m),this.itemBoxes.push({mesh:m,pos:_,active:!0,respawnTimer:0})})})}update(t,e,n=[]){this.itemBoxes.forEach(i=>{if(i.active){i.mesh.rotation.y+=t*2.5,i.mesh.rotation.x+=t*1.5,i.mesh.visible=!0,e&&!e.currentItem&&e.position.distanceTo(i.pos)<2.2&&this.pickupItem(e,i);for(let r=0;r<n.length;r++){const o=n[r];if(o&&!o.currentItem&&o.position.distanceTo(i.pos)<2.2){i.active=!1,i.respawnTimer=6,i.mesh.visible=!1,o.currentItem=this.itemTypes[Math.floor(Math.random()*this.itemTypes.length)];break}}}else i.respawnTimer-=t,i.respawnTimer<=0&&(i.active=!0,i.mesh.visible=!0)});for(let i=this.activeBananas.length-1;i>=0;i--){const r=this.activeBananas[i];if(r.mesh.rotation.y+=t*1.5,e&&!e.isInvincible&&e.position.distanceTo(r.pos)<2){this.triggerSpinOut(e),this.removeBanana(i);continue}let o=!1;for(const a of n)if(a&&!a.isInvincible&&a.position.distanceTo(r.pos)<2){this.triggerSpinOut(a),this.removeBanana(i),o=!0;break}}for(let i=this.activeMissiles.length-1;i>=0;i--){const r=this.activeMissiles[i];if(r.life-=t,r.life<=0){this.removeMissile(i);continue}if(r.pos.addScaledVector(r.velocity,t),r.mesh.position.copy(r.pos),r.owner!==e&&e&&!e.isInvincible&&e.position.distanceTo(r.pos)<2.6){this.triggerSpinOut(e),this.particles&&this.particles.emitExhaustFlame([r.mesh],!0),this.removeMissile(i);continue}let o=!1;for(const a of n)if(a&&r.owner!==a&&!a.isInvincible&&a.position.distanceTo(r.pos)<2.6){this.triggerSpinOut(a),this.particles&&this.particles.emitExhaustFlame([r.mesh],!0),o=!0;break}o&&this.removeMissile(i)}}pickupItem(t,e){e.active=!1,e.respawnTimer=6,e.mesh.visible=!1;const n=this.itemTypes[Math.floor(Math.random()*this.itemTypes.length)];if(t.currentItem=n,this.audio&&this.audio.playItemPickup(),this.hud&&t.isPlayer){this.hud.setItem(n);const i={boost:"⚡ ซูเปอร์ไนโตร",banana:"🍌 เปลือกกล้วยดักหลัง",missile:"🚀 มิสไซล์นำวิถี",shield:"🛡️ โล่ป้องกันบาเรีย"};this.hud.showNotification(`ได้รับ: ${i[n]||n}!`)}}useItem(t){if(!t||!t.currentItem)return;const e=t.currentItem;t.currentItem=null,t.isPlayer&&this.hud&&this.hud.setItem(null),e==="boost"?(t.boostTimer=3.6,t.isInvincible=!0,setTimeout(()=>{t.isInvincible=!1},3600),this.audio&&this.audio.playBoostSound(),t.isPlayer&&this.hud&&this.hud.showReaction("⚡ ซูเปอร์ไนโตรติดสปีด!",1500)):e==="banana"?(this.dropBanana(t),t.isPlayer&&this.hud&&this.hud.showReaction("🍌 วางกล้วยดักหลัง!",1500)):e==="missile"?(this.fireMissile(t),this.audio&&this.audio.playMissileShoot(),t.isPlayer&&this.hud&&this.hud.showReaction("🚀 ยิงจรวดมิสไซล์!",1500)):e==="shield"&&(t.isInvincible=!0,setTimeout(()=>{t.isInvincible=!1},5e3),t.isPlayer&&this.hud&&this.hud.showReaction("🛡️ โล่ป้องกัน 5 วินาที!",1500))}dropBanana(t){const e=new P(0,.2,-2.6).applyAxisAngle(new P(0,1,0),t.rotationY),n=t.position.clone().add(e);n.y=.25;const i=new qe(.35,.65,8);i.rotateZ(Math.PI/4);const r=new Et({color:16768256,roughness:.3}),o=new A(i,r);o.position.copy(n),this.scene.add(o),this.activeBananas.push({mesh:o,pos:n})}removeBanana(t){const e=this.activeBananas[t];e&&(this.scene.remove(e.mesh),e.mesh.geometry.dispose(),e.mesh.material.dispose(),this.activeBananas.splice(t,1))}fireMissile(t){const e=new P(Math.sin(t.rotationY),0,Math.cos(t.rotationY)).normalize(),n=t.position.clone().addScaledVector(e,2.8);n.y+=.45;const i=new Gt(.18,.18,1,12);i.rotateX(Math.PI/2);const r=new Et({color:16711748,metalness:.8}),o=new A(i,r);o.position.copy(n),o.rotation.y=t.rotationY,this.scene.add(o),this.activeMissiles.push({mesh:o,pos:n,velocity:e.clone().multiplyScalar(68),owner:t,life:4})}removeMissile(t){const e=this.activeMissiles[t];e&&(this.scene.remove(e.mesh),e.mesh.geometry.dispose(),e.mesh.material.dispose(),this.activeMissiles.splice(t,1))}triggerSpinOut(t){t.spinTimer>0||(t.spinTimer=1.25,t.speed*=.3,this.audio&&this.audio.playSlip(),t.isPlayer&&this.hud&&this.hud.showReaction("😵 รถหมุนติ้ว โดนไอเทม!",1500))}}class Tg{constructor(){this.container=document.getElementById("hud"),this.speedText=document.getElementById("hud-speed"),this.gearText=document.getElementById("hud-gear"),this.nitroBar=document.getElementById("hud-nitro-bar"),this.driftBar=document.getElementById("hud-drift-bar"),this.lapText=document.getElementById("hud-lap"),this.rankText=document.getElementById("hud-rank"),this.timeText=document.getElementById("hud-time"),this.bestText=document.getElementById("hud-best"),this.stageText=document.getElementById("hud-stage-name"),this.driverPortrait=document.getElementById("hud-driver-img"),this.driverName=document.getElementById("hud-driver-name"),this.reactionBubble=document.getElementById("hud-reaction-bubble"),this.itemSlot=document.getElementById("hud-item-slot"),this.itemIcon=document.getElementById("hud-item-icon"),this.countdownOverlay=document.getElementById("countdown-overlay"),this.countdownText=document.getElementById("countdown-text"),this.notificationBox=document.getElementById("hud-notifications"),this.momentumBadge=document.getElementById("hud-momentum-badge"),this.reactionTimeout=null}show(){this.container&&this.container.classList.remove("hidden")}hide(){this.container&&this.container.classList.add("hidden")}setStage(t){this.stageText&&(this.stageText.textContent=t||"")}setItem(t){if(!this.itemSlot||!this.itemIcon)return;if(!t){this.itemSlot.classList.add("hidden");return}this.itemSlot.classList.remove("hidden");const e={boost:"⚡",banana:"🍌",missile:"🚀",shield:"🛡️"};this.itemIcon.textContent=e[t]||"❓"}update(t,e=1,n=1){if(!t)return;const i=t.getSpeedKmh();this.speedText&&(this.speedText.textContent=i);let r="1";if(t.speed<0?r="R":i<1?r="N":i<48?r="1":i<95?r="2":i<140?r="3":i<185?r="4":i<230?r="5":i<270?r="6":r="7",this.gearText&&(this.gearText.textContent=r),this.momentumBadge&&(t.apexBonusTimer>0?(this.momentumBadge.textContent="⚡ APEX EXIT! สปีดพุ่ง!",this.momentumBadge.className="momentum-badge apex-active"):t.isFeathering?(this.momentumBadge.textContent="🎯 เลี้ยงความเร็ว (CARVING)",this.momentumBadge.className="momentum-badge feathering-active"):this.momentumBadge.className="momentum-badge hidden"),this.nitroBar&&(this.nitroBar.style.width=`${t.nitroFuel}%`,t.boostTimer>0?this.nitroBar.classList.add("boosting"):this.nitroBar.classList.remove("boosting")),this.driftBar)if(t.isDrifting){this.driftBar.parentElement.style.opacity="1";const a=Math.min(100,t.driftTimer/2*100);this.driftBar.style.width=`${a}%`,t.driftLevel===3?this.driftBar.style.background="#dd00ff":t.driftLevel===2?this.driftBar.style.background="#ff9900":t.driftLevel===1?this.driftBar.style.background="#00e5ff":this.driftBar.style.background="#ffffff"}else this.driftBar.parentElement.style.opacity="0",this.driftBar.style.width="0%";const o=t.totalLaps||3;if(this.lapText&&(this.lapText.textContent=`LAP ${Math.min(o,t.lap)} / ${o}`),this.rankText){const a=["th","st","nd","rd"],c=e<=3&&e>0?a[e]:"th";this.rankText.innerHTML=`${e}<span>${c}</span>`}this.timeText&&(this.timeText.textContent=this.formatTime(t.currentLapTime)),this.bestText&&t.bestLapTime&&(this.bestText.textContent=`BEST: ${this.formatTime(t.bestLapTime)}`)}showReaction(t,e=2e3){this.reactionBubble&&(this.reactionBubble.textContent=t,this.reactionBubble.classList.add("visible"),this.reactionTimeout&&clearTimeout(this.reactionTimeout),this.reactionTimeout=setTimeout(()=>{this.reactionBubble.classList.remove("visible")},e))}showNotification(t,e=3e3){if(!this.notificationBox)return;const n=document.createElement("div");n.className="notif-item",n.textContent=t,this.notificationBox.appendChild(n),setTimeout(()=>{n.remove()},e)}setDriverAvatar(t,e="Ashi"){this.driverPortrait&&t&&(this.driverPortrait.src=`../assets/ashi/${t}`),this.driverName&&(this.driverName.textContent=e)}playCountdown(t,e){if(!this.countdownOverlay||!this.countdownText){t&&t("GO"),e&&e();return}this.countdownOverlay.classList.remove("hidden");let n=3;const i=()=>{n>0?(this.countdownText.textContent=n,this.countdownText.className="countdown-num pulse",t&&t(n),n--,setTimeout(i,900)):n===0&&(this.countdownText.textContent="GO!",this.countdownText.className="countdown-num go pulse",t&&t("GO"),n--,e&&e(),setTimeout(()=>{this.countdownOverlay.classList.add("hidden")},1e3))};i()}formatTime(t){const e=Math.floor(t/60),n=Math.floor(t%60),i=Math.floor(t%1*100);return`${e.toString().padStart(2,"0")}:${n.toString().padStart(2,"0")}.${i.toString().padStart(2,"0")}`}}var ga={};(function s(t,e,n,i){var r=!!(t.Worker&&t.Blob&&t.Promise&&t.OffscreenCanvas&&t.OffscreenCanvasRenderingContext2D&&t.HTMLCanvasElement&&t.HTMLCanvasElement.prototype.transferControlToOffscreen&&t.URL&&t.URL.createObjectURL),o=typeof Path2D=="function"&&typeof DOMMatrix=="function",a=(function(){if(!t.OffscreenCanvas)return!1;try{var N=new OffscreenCanvas(1,1),D=N.getContext("2d");D.fillRect(0,0,1,1);var lt=N.transferToImageBitmap();D.createPattern(lt,"no-repeat")}catch{return!1}return!0})();function c(){}function l(N){var D=e.exports.Promise,lt=D!==void 0?D:t.Promise;return typeof lt=="function"?new lt(N):(N(c,c),null)}var h=(function(N,D){return{transform:function(lt){if(N)return lt;if(D.has(lt))return D.get(lt);var ut=new OffscreenCanvas(lt.width,lt.height),X=ut.getContext("2d");return X.drawImage(lt,0,0),D.set(lt,ut),ut},clear:function(){D.clear()}}})(a,new Map),d=(function(){var N=Math.floor(16.666666666666668),D,lt,ut={},X=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(D=function(K){var at=Math.random();return ut[at]=requestAnimationFrame(function Q(dt){X===dt||X+N-1<dt?(X=dt,delete ut[at],K()):ut[at]=requestAnimationFrame(Q)}),at},lt=function(K){ut[K]&&cancelAnimationFrame(ut[K])}):(D=function(K){return setTimeout(K,N)},lt=function(K){return clearTimeout(K)}),{frame:D,cancel:lt}})(),u=(function(){var N,D,lt={};function ut(X){function K(at,Q){X.postMessage({options:at||{},callback:Q})}X.init=function(Q){var dt=Q.transferControlToOffscreen();X.postMessage({canvas:dt},[dt])},X.fire=function(Q,dt,vt){if(D)return K(Q,null),D;var yt=Math.random().toString(36).slice(2);return D=l(function(It){function Rt(zt){zt.data.callback===yt&&(delete lt[yt],X.removeEventListener("message",Rt),D=null,h.clear(),vt(),It())}X.addEventListener("message",Rt),K(Q,yt),lt[yt]=Rt.bind(null,{data:{callback:yt}})}),D},X.reset=function(){X.postMessage({reset:!0});for(var Q in lt)lt[Q](),delete lt[Q]}}return function(){if(N)return N;if(!n&&r){var X=["var CONFETTI, SIZE = {}, module = {};","("+s.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{N=new Worker(URL.createObjectURL(new Blob([X])))}catch(K){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",K),null}ut(N)}return N}})(),f={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function g(N,D){return D?D(N):N}function _(N){return N!=null}function m(N,D,lt){return g(N&&_(N[D])?N[D]:f[D],lt)}function p(N){return N<0?0:Math.floor(N)}function x(N,D){return Math.floor(Math.random()*(D-N))+N}function S(N){return parseInt(N,16)}function v(N){return N.map(L)}function L(N){var D=String(N).replace(/[^0-9a-f]/gi,"");return D.length<6&&(D=D[0]+D[0]+D[1]+D[1]+D[2]+D[2]),{r:S(D.substring(0,2)),g:S(D.substring(2,4)),b:S(D.substring(4,6))}}function E(N){var D=m(N,"origin",Object);return D.x=m(D,"x",Number),D.y=m(D,"y",Number),D}function C(N){N.width=document.documentElement.clientWidth,N.height=document.documentElement.clientHeight}function w(N){var D=N.getBoundingClientRect();N.width=D.width,N.height=D.height}function M(N){var D=document.createElement("canvas");return D.style.position="fixed",D.style.top="0px",D.style.left="0px",D.style.pointerEvents="none",D.style.zIndex=N,D}function y(N,D,lt,ut,X,K,at,Q,dt){N.save(),N.translate(D,lt),N.rotate(K),N.scale(ut,X),N.arc(0,0,1,at,Q,dt),N.restore()}function R(N){var D=N.angle*(Math.PI/180),lt=N.spread*(Math.PI/180);return{x:N.x,y:N.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:N.startVelocity*.5+Math.random()*N.startVelocity,angle2D:-D+(.5*lt-Math.random()*lt),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:N.color,shape:N.shape,tick:0,totalTicks:N.ticks,decay:N.decay,drift:N.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:N.gravity*3,ovalScalar:.6,scalar:N.scalar,flat:N.flat}}function k(N,D){D.x+=Math.cos(D.angle2D)*D.velocity+D.drift,D.y+=Math.sin(D.angle2D)*D.velocity+D.gravity,D.velocity*=D.decay,D.flat?(D.wobble=0,D.wobbleX=D.x+10*D.scalar,D.wobbleY=D.y+10*D.scalar,D.tiltSin=0,D.tiltCos=0,D.random=1):(D.wobble+=D.wobbleSpeed,D.wobbleX=D.x+10*D.scalar*Math.cos(D.wobble),D.wobbleY=D.y+10*D.scalar*Math.sin(D.wobble),D.tiltAngle+=.1,D.tiltSin=Math.sin(D.tiltAngle),D.tiltCos=Math.cos(D.tiltAngle),D.random=Math.random()+2);var lt=D.tick++/D.totalTicks,ut=D.x+D.random*D.tiltCos,X=D.y+D.random*D.tiltSin,K=D.wobbleX+D.random*D.tiltCos,at=D.wobbleY+D.random*D.tiltSin;if(N.fillStyle="rgba("+D.color.r+", "+D.color.g+", "+D.color.b+", "+(1-lt)+")",N.beginPath(),o&&D.shape.type==="path"&&typeof D.shape.path=="string"&&Array.isArray(D.shape.matrix))N.fill(Y(D.shape.path,D.shape.matrix,D.x,D.y,Math.abs(K-ut)*.1,Math.abs(at-X)*.1,Math.PI/10*D.wobble));else if(D.shape.type==="bitmap"){var Q=Math.PI/10*D.wobble,dt=Math.abs(K-ut)*.1,vt=Math.abs(at-X)*.1,yt=D.shape.bitmap.width*D.scalar,It=D.shape.bitmap.height*D.scalar,Rt=new DOMMatrix([Math.cos(Q)*dt,Math.sin(Q)*dt,-Math.sin(Q)*vt,Math.cos(Q)*vt,D.x,D.y]);Rt.multiplySelf(new DOMMatrix(D.shape.matrix));var zt=N.createPattern(h.transform(D.shape.bitmap),"no-repeat");zt.setTransform(Rt),N.globalAlpha=1-lt,N.fillStyle=zt,N.fillRect(D.x-yt/2,D.y-It/2,yt,It),N.globalAlpha=1}else if(D.shape==="circle")N.ellipse?N.ellipse(D.x,D.y,Math.abs(K-ut)*D.ovalScalar,Math.abs(at-X)*D.ovalScalar,Math.PI/10*D.wobble,0,2*Math.PI):y(N,D.x,D.y,Math.abs(K-ut)*D.ovalScalar,Math.abs(at-X)*D.ovalScalar,Math.PI/10*D.wobble,0,2*Math.PI);else if(D.shape==="star")for(var B=Math.PI/2*3,se=4*D.scalar,Ot=8*D.scalar,Bt=D.x,wt=D.y,Kt=5,Ct=Math.PI/Kt;Kt--;)Bt=D.x+Math.cos(B)*Ot,wt=D.y+Math.sin(B)*Ot,N.lineTo(Bt,wt),B+=Ct,Bt=D.x+Math.cos(B)*se,wt=D.y+Math.sin(B)*se,N.lineTo(Bt,wt),B+=Ct;else N.moveTo(Math.floor(D.x),Math.floor(D.y)),N.lineTo(Math.floor(D.wobbleX),Math.floor(X)),N.lineTo(Math.floor(K),Math.floor(at)),N.lineTo(Math.floor(ut),Math.floor(D.wobbleY));return N.closePath(),N.fill(),D.tick<D.totalTicks}function F(N,D,lt,ut,X){var K=D.slice(),at=N.getContext("2d"),Q,dt,vt=l(function(yt){function It(){Q=dt=null,at.clearRect(0,0,ut.width,ut.height),h.clear(),X(),yt()}function Rt(){n&&!(ut.width===i.width&&ut.height===i.height)&&(ut.width=N.width=i.width,ut.height=N.height=i.height),!ut.width&&!ut.height&&(lt(N),ut.width=N.width,ut.height=N.height),at.clearRect(0,0,ut.width,ut.height),K=K.filter(function(zt){return k(at,zt)}),K.length?Q=d.frame(Rt):It()}Q=d.frame(Rt),dt=It});return{addFettis:function(yt){return K=K.concat(yt),vt},canvas:N,promise:vt,reset:function(){Q&&d.cancel(Q),dt&&dt()}}}function H(N,D){var lt=!N,ut=!!m(D||{},"resize"),X=!1,K=m(D,"disableForReducedMotion",Boolean),at=r&&!!m(D||{},"useWorker"),Q=at?u():null,dt=lt?C:w,vt=N&&Q?!!N.__confetti_initialized:!1,yt=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,It;function Rt(B,se,Ot){for(var Bt=m(B,"particleCount",p),wt=m(B,"angle",Number),Kt=m(B,"spread",Number),Ct=m(B,"startVelocity",Number),I=m(B,"decay",Number),T=m(B,"gravity",Number),q=m(B,"drift",Number),st=m(B,"colors",v),ct=m(B,"ticks",Number),it=m(B,"shapes"),Pt=m(B,"scalar"),mt=!!m(B,"flat"),nt=E(B),tt=Bt,et=[],ht=N.width*nt.x,pt=N.height*nt.y;tt--;)et.push(R({x:ht,y:pt,angle:wt,spread:Kt,startVelocity:Ct,color:st[tt%st.length],shape:it[x(0,it.length)],ticks:ct,decay:I,gravity:T,drift:q,scalar:Pt,flat:mt}));return It?It.addFettis(et):(It=F(N,et,dt,se,Ot),It.promise)}function zt(B){var se=K||m(B,"disableForReducedMotion",Boolean),Ot=m(B,"zIndex",Number);if(se&&yt)return l(function(Ct){Ct()});lt&&It?N=It.canvas:lt&&!N&&(N=M(Ot),document.body.appendChild(N)),ut&&!vt&&dt(N);var Bt={width:N.width,height:N.height};Q&&!vt&&Q.init(N),vt=!0,Q&&(N.__confetti_initialized=!0);function wt(){if(Q){var Ct={getBoundingClientRect:function(){if(!lt)return N.getBoundingClientRect()}};dt(Ct),Q.postMessage({resize:{width:Ct.width,height:Ct.height}});return}Bt.width=Bt.height=null}function Kt(){It=null,ut&&(X=!1,t.removeEventListener("resize",wt)),lt&&N&&(document.body.contains(N)&&document.body.removeChild(N),N=null,vt=!1)}return ut&&!X&&(X=!0,t.addEventListener("resize",wt,!1)),Q?Q.fire(B,Bt,Kt):Rt(B,Bt,Kt)}return zt.reset=function(){Q&&Q.reset(),It&&It.reset()},zt}var O;function U(){return O||(O=H(null,{useWorker:!0,resize:!0})),O}function Y(N,D,lt,ut,X,K,at){var Q=new Path2D(N),dt=new Path2D;dt.addPath(Q,new DOMMatrix(D));var vt=new Path2D;return vt.addPath(dt,new DOMMatrix([Math.cos(at)*X,Math.sin(at)*X,-Math.sin(at)*K,Math.cos(at)*K,lt,ut])),vt}function W(N){if(!o)throw new Error("path confetti are not supported in this browser");var D,lt;typeof N=="string"?D=N:(D=N.path,lt=N.matrix);var ut=new Path2D(D),X=document.createElement("canvas"),K=X.getContext("2d");if(!lt){for(var at=1e3,Q=at,dt=at,vt=0,yt=0,It,Rt,zt=0;zt<at;zt+=2)for(var B=0;B<at;B+=2)K.isPointInPath(ut,zt,B,"nonzero")&&(Q=Math.min(Q,zt),dt=Math.min(dt,B),vt=Math.max(vt,zt),yt=Math.max(yt,B));It=vt-Q,Rt=yt-dt;var se=10,Ot=Math.min(se/It,se/Rt);lt=[Ot,0,0,Ot,-Math.round(It/2+Q)*Ot,-Math.round(Rt/2+dt)*Ot]}return{type:"path",path:D,matrix:lt}}function ot(N){var D,lt=1,ut="#000000",X='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof N=="string"?D=N:(D=N.text,lt="scalar"in N?N.scalar:lt,X="fontFamily"in N?N.fontFamily:X,ut="color"in N?N.color:ut);var K=10*lt,at=""+K+"px "+X,Q=new OffscreenCanvas(K,K),dt=Q.getContext("2d");dt.font=at;var vt=dt.measureText(D),yt=Math.ceil(vt.actualBoundingBoxRight+vt.actualBoundingBoxLeft),It=Math.ceil(vt.actualBoundingBoxAscent+vt.actualBoundingBoxDescent),Rt=2,zt=vt.actualBoundingBoxLeft+Rt,B=vt.actualBoundingBoxAscent+Rt;yt+=Rt+Rt,It+=Rt+Rt,Q=new OffscreenCanvas(yt,It),dt=Q.getContext("2d"),dt.font=at,dt.fillStyle=ut,dt.fillText(D,zt,B);var se=1/lt;return{type:"bitmap",bitmap:Q.transferToImageBitmap(),matrix:[se,0,0,se,-yt*se/2,-It*se/2]}}e.exports=function(){return U().apply(this,arguments)},e.exports.reset=function(){U().reset()},e.exports.create=H,e.exports.shapeFromPath=W,e.exports.shapeFromText=ot})((function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}})(),ga,!1);const Qi=ga.exports;ga.exports.create;const ce=[{id:"gt",name:"Ashi GT Supercar",nameTh:"อาชิ GT ซูเปอร์คาร์",tag:"SPEED DEMON",desc:"รถสปอร์ตแอโรไดนามิกส์ทรงต่ำ ความเร็วปลายจัดจ้าน สมดุลทั้งทางตรงและเข้าโค้ง",stats:{speed:88,accel:80,handling:80,drift:84,boost:86},physics:{maxSpeed:50,accelRate:23,brakeRate:35,turnRate:2.85,grip:.94,driftGrip:.85,mass:1200},defaultColor:"#ff2255"},{id:"kart",name:"Ashi Kart 500",nameTh:"โกคาร์ท อาชิซิ่ง",tag:"DRIFT KING",desc:"ขนาดเล็กกระทัดรัด ออกตัวพุ่งไว เลี้ยวคมที่สุด เหมาะกับการเลี้ยงคันเร่งและดริฟต์แคบ",stats:{speed:76,accel:94,handling:92,drift:95,boost:82},physics:{maxSpeed:44,accelRate:27,brakeRate:38,turnRate:3.35,grip:.92,driftGrip:.88,mass:850},defaultColor:"#00d2ff"},{id:"truck",name:"Ashi Cyber Truck",nameTh:"อาชิ ไซเบอร์ทรัค",tag:"HEAVY BEAST",desc:"รถกระบะเหล็กกล้า แรงบิดมหาศาล น้ำหนักเยอะ ต้องเบรกกะระยะเข้าโค้งอย่างแม่นยำ",stats:{speed:82,accel:76,handling:68,drift:72,boost:88},physics:{maxSpeed:47,accelRate:21,brakeRate:32,turnRate:2.45,grip:.96,driftGrip:.82,mass:2200},defaultColor:"#00ff88"},{id:"f1",name:"Ashi Formula-X",nameTh:"อาชิ ฟอร์มูล่า วัน",tag:"ULTIMATE RACER",desc:"รถแข่งฟอร์มูล่าวัน ความเร็วสูงสุดทะลุ 200+ km/h ดาวน์ฟอร์ซสูง ควบคุมตามฝีมือผู้ขับ",stats:{speed:98,accel:90,handling:86,drift:75,boost:92},physics:{maxSpeed:56,accelRate:28,brakeRate:44,turnRate:3.15,grip:.98,driftGrip:.8,mass:950},defaultColor:"#ffd700"},{id:"muscle",name:"Ashi Muscle V8",nameTh:"มัสเซิลคาร์ V8 อาชิ",tag:"DRIFT MACHINE",desc:"เครื่องยนต์ V8 ทรงพลัง เสียงคำรามดุดัน ท้ายปัดสไตล์มัสเซิลคาร์ ดริฟต์ได้มันส์สะใจ",stats:{speed:85,accel:85,handling:74,drift:92,boost:85},physics:{maxSpeed:51,accelRate:24,brakeRate:34,turnRate:2.75,grip:.9,driftGrip:.86,mass:1500},defaultColor:"#9d4edd"},{id:"hyper",name:"Ashi Valkyrie Hypercar",nameTh:"ไฮเปอร์คาร์ อาชิ วัลคิรี",tag:"CYBER PROTOTYPE",desc:"ไฮเปอร์คาร์ต้นแบบพลังแม่เหล็กไฟฟ้า ครีบ Shark Fin รีดลมความเร็วสูง อัตราเร่งทะลุขีดจำกัด",stats:{speed:96,accel:95,handling:88,drift:82,boost:96},physics:{maxSpeed:55,accelRate:29,brakeRate:42,turnRate:3.1,grip:.97,driftGrip:.84,mass:1050},defaultColor:"#00f0ff"},{id:"rally",name:"Ashi WRC Rally Beast",nameTh:"แรลลี่ อสูร อาชิ WRC",tag:"ALL-TERRAIN BEAST",desc:"รถแข่งแรลลี่ไฟสปอตไลท์ 4 ดวง โป่งซุ้มล้อกว้าง ลุยได้ทุกสภาพผิว เข้าโค้งแคบคมดั่งใบมีด",stats:{speed:84,accel:92,handling:94,drift:90,boost:84},physics:{maxSpeed:48,accelRate:26,brakeRate:40,turnRate:3.25,grip:.95,driftGrip:.9,mass:1250},defaultColor:"#ff0055"},{id:"speedster",name:"Ashi Retro Speedster",nameTh:"อาชิ เรโทร สปีดสเตอร์",tag:"CLASSIC ELEGANCE",desc:"รถสปอร์ตคลาสสิกเปิดประทุนทรงโค้งมน ท่อไอเสียข้างโครเมียมคู่ สวยหรูเหนือกาลเวลา",stats:{speed:86,accel:88,handling:85,drift:88,boost:86},physics:{maxSpeed:49,accelRate:25,brakeRate:36,turnRate:2.95,grip:.93,driftGrip:.88,mass:1100},defaultColor:"#e0e7ff"}],Go=[{id:"beach",name:"Sunset Beach Speedway",nameTh:"ซันเซ็ตบีช สปีดเวย์",stageLabel:"ด่าน 1",difficulty:1,desc:"สนามริมทะเลยามเย็น ถนนกว้าง โค้งยาวไหลลื่น เหมาะกับการฝึกดริฟต์และจังหวะไนโตร",defaultLaps:3,trackWidth:24,aiSpeedMul:.88,points:[[0,0],[0,90],[10,170],[70,215],[150,215],[205,165],[215,80],[198,-10],[205,-100],[170,-170],[100,-195],[30,-175],[0,-120],[0,-60]],itemClusters:[.2,.47,.74],boostPads:[.1,.58,.9],tunnel:null,theme:{sky:16752235,fog:16759178,fogDensity:.0024,exposure:1.05,ambient:16769732,ambientIntensity:.75,hemiSky:16763034,hemiGround:6965802,sun:16765600,sunIntensity:1.6,ground:"#d8b47c",groundDetail:"#c9a066",farGround:2068403,tarmac:"#2a2a30",railA:16742912,railB:51455,skyline:"resort",props:"palms",weather:null,holograms:!1}},{id:"buriram",name:"Buriram Night GP",nameTh:"บุรีรัมย์ ไนท์ กรังด์ปรีซ์",stageLabel:"ด่าน 2",difficulty:2,desc:"สนามกลางคืนแสงนีออน มีอุโมงค์ไฟและแฮร์พินกลางสนาม ต้องเบรกให้ถูกจังหวะ",defaultLaps:3,trackWidth:20,aiSpeedMul:.95,points:[[0,0],[0,80],[0,160],[45,230],[120,250],[195,220],[260,150],[280,50],[260,-50],[220,-140],[150,-210],[60,-250],[-40,-250],[-130,-210],[-180,-130],[-190,-30],[-150,50],[-90,20],[-75,-40],[-62,-115],[-52,-162],[-28,-190],[2,-188],[14,-160],[6,-112],[0,-60]],itemClusters:[.18,.42,.65,.84],boostPads:[.03,.24,.48,.94],tunnel:[.47,.54],theme:{sky:658456,fog:658456,fogDensity:.0035,exposure:1.1,ambient:11584734,ambientIntensity:.6,hemiSky:3820170,hemiGround:1052696,sun:13622527,sunIntensity:1.2,ground:"#0b0c14",groundDetail:"#1b2238",farGround:329228,tarmac:"#1c1e24",railA:16711765,railB:62463,skyline:"city",props:"lamps",weather:null,holograms:!0}},{id:"snow",name:"Frosty Peak Circuit",nameTh:"ยอดเขาหิมะ เซอร์กิต",stageLabel:"ด่าน 3",difficulty:3,desc:"สนามเทคนิคบนภูเขาหิมะ โค้ง S ต่อเนื่องและแฮร์พินแคบ คู่แข่งเก่งขึ้นอย่างเห็นได้ชัด",defaultLaps:3,trackWidth:20,aiSpeedMul:1,points:[[0,0],[0,90],[30,140],[90,150],[120,110],[112,50],[150,10],[212,28],[248,82],[285,95],[318,58],[322,-20],[270,-70],[200,-60],[150,-100],[150,-170],[90,-210],[30,-190],[0,-130],[0,-60]],itemClusters:[.15,.4,.63,.85],boostPads:[.05,.33,.7],tunnel:[.74,.79],theme:{sky:12376046,fog:14083829,fogDensity:.0042,exposure:1,ambient:14412287,ambientIntensity:.8,hemiSky:15135487,hemiGround:8952234,sun:16777215,sunIntensity:1.3,ground:"#eef4fb",groundDetail:"#d5e2f0",farGround:15331834,tarmac:"#2b2e36",railA:3842303,railB:16777215,skyline:"mountains",props:"pines",weather:"snow",holograms:!1}},{id:"volcano",name:"Ashi Volcano Inferno",nameTh:"ภูเขาไฟอาชิ อินเฟอร์โน",stageLabel:"ด่าน 4",difficulty:4,desc:"ด่านสุดท้าย! ทางตรงยาวสุดโหดสลับแฮร์พินความเร็วสูงรอบภูเขาไฟ บอทระดับโปรไม่ยอมแพ้ง่ายๆ",defaultLaps:3,trackWidth:20,aiSpeedMul:1.06,points:[[0,0],[0,120],[0,240],[40,300],[110,310],[150,260],[140,180],[180,120],[260,120],[320,170],[380,140],[390,40],[340,-30],[340,-130],[380,-200],[340,-270],[240,-280],[165,-235],[128,-178],[92,-148],[48,-150],[10,-122],[0,-60]],itemClusters:[.12,.33,.55,.78],boostPads:[.04,.27,.6,.86],tunnel:[.4,.46],theme:{sky:2755594,fog:3805708,fogDensity:.0032,exposure:1.15,ambient:16751226,ambientIntensity:.55,hemiSky:16734762,hemiGround:1705992,sun:16756858,sunIntensity:1.25,ground:"#1b0f0d",groundDetail:"#ff4a12",farGround:16726538,tarmac:"#1a1a1e",railA:16724736,railB:16763904,skyline:"volcano",props:"rocks",weather:"embers",holograms:!1}}],bg={easy:{label:"ง่าย",aiMul:.9,rubberBand:.06},normal:{label:"ปกติ",aiMul:1,rubberBand:.05},hard:{label:"ยาก",aiMul:1.07,rubberBand:.04}};function Eg(s){return Go.find(t=>t.id===s)||Go[0]}class wg{constructor(t){this.game=t,this.viewMenu=document.getElementById("view-menu"),this.viewStageSelect=document.getElementById("view-stage-select"),this.viewGarage=document.getElementById("view-garage"),this.viewLobby=document.getElementById("view-lobby"),this.viewVictory=document.getElementById("view-victory"),this.viewGridIntro=document.getElementById("view-grid-intro"),this.gridIntroStageTitle=document.getElementById("grid-intro-stage-title"),this.gridBroadcastCard=document.getElementById("grid-broadcast-card"),this.gbPhoto=document.getElementById("gb-photo"),this.gbPos=document.getElementById("gb-pos"),this.gbName=document.getElementById("gb-name"),this.gbCarName=document.getElementById("gb-car-name"),this.gbCarTag=document.getElementById("gb-car-tag"),this.gbBadge=document.getElementById("gb-badge"),this.gbColorDot=document.getElementById("gb-color-dot"),this.btnSkipGridIntro=document.getElementById("btn-skip-grid-intro"),this.onGridIntroSkip=null,this.currentGridRacers=[],this.activeGridRacerIndex=-1;const e=parseInt(localStorage.getItem("ashilane_car_index")||"0",10);this.currentCarIndex=!isNaN(e)&&e>=0&&e<ce.length?e:0,this.currentSkinId=localStorage.getItem("ashilane_skin")||"green_dress";const n=Ai.find(r=>r.id===this.currentSkinId);this.currentColor=localStorage.getItem("ashilane_color")||(n==null?void 0:n.color)||"#0d5c3a",this.playerName=localStorage.getItem("ashilane_name")||"นักซิ่งอาชิ";const i=(()=>{try{return JSON.parse(localStorage.getItem("ashilane_addons")||"{}")}catch{return{}}})();this.currentAddons={spoiler:i.spoiler||"stock",rim:i.rim||"stock",exhaust:i.exhaust||"stock",roof_hood:i.roof_hood||"none",underglow:i.underglow||"body_match"},this.selectedTrackId="beach",this.selectedDifficulty="normal",this.selectedLaps=3,this.targetGameMode="gp",this.initEventListeners(),this.populateGarageSkins(),this.updateGarageStats(),this.populateStageCards()}initEventListeners(){var r,o,a,c,l,h,d,u,f,g,_,m,p,x,S,v,L,E,C,w,M,y,R,k,F,H;(r=document.getElementById("btn-play-single"))==null||r.addEventListener("click",()=>{this.openStageSelect("gp")}),(o=document.getElementById("btn-play-timeattack"))==null||o.addEventListener("click",()=>{this.openStageSelect("timeattack")}),(a=document.getElementById("btn-open-garage"))==null||a.addEventListener("click",()=>{this.showView("garage"),this.syncGarageAddonPills();const O=ce[this.currentCarIndex],U=document.getElementById("garage-car-name");U&&(U.textContent=O.nameTh);const Y=document.getElementById("garage-car-tag");Y&&(Y.textContent=O.tag);const W=document.getElementById("garage-car-desc");W&&(W.textContent=O.desc),this.updateGarageStats();const ot=document.getElementById("garage-color-input");ot&&(ot.value=this.currentColor);const N=document.getElementById("garage-color-hex");N&&(N.textContent=this.currentColor.toUpperCase()),this.game.enterGaragePreview(ce[this.currentCarIndex].id,this.getSelectedSkinFile(),this.currentColor,this.currentAddons)}),(c=document.getElementById("btn-open-create-room"))==null||c.addEventListener("click",()=>{this.showCreateRoomPrompt()}),(l=document.getElementById("btn-open-join-room"))==null||l.addEventListener("click",()=>{this.showJoinRoomPrompt()}),(h=document.getElementById("btn-toggle-bgm"))==null||h.addEventListener("click",()=>{const O=this.game.audio.toggleBgm(),U=document.getElementById("btn-toggle-bgm");U&&(U.textContent=O?"🎵 เพลง: เปิด":"🔇 เพลง: ปิด")}),(d=document.getElementById("btn-stage-back"))==null||d.addEventListener("click",()=>{this.showView("menu")}),(u=document.getElementById("btn-start-selected-race"))==null||u.addEventListener("click",()=>{this.triggerRaceStartTransition(()=>{this.game.startSinglePlayer(this.targetGameMode,this.selectedTrackId,this.selectedDifficulty,this.selectedLaps)})}),document.querySelectorAll(".diff-pill").forEach(O=>{O.addEventListener("click",U=>{const Y=O.dataset.diff;Y&&(this.selectedDifficulty=Y,document.querySelectorAll(".diff-pill").forEach(W=>W.classList.remove("active")),O.classList.add("active"))})}),document.querySelectorAll(".laps-pill").forEach(O=>{O.addEventListener("click",U=>{const Y=parseInt(O.dataset.laps||"3");this.selectedLaps=Y,document.querySelectorAll(".laps-pill").forEach(W=>W.classList.remove("active")),O.classList.add("active")})}),document.querySelectorAll(".garage-tab-btn").forEach(O=>{O.addEventListener("click",()=>{var Y;const U=O.dataset.tab;document.querySelectorAll(".garage-tab-btn").forEach(W=>W.classList.remove("active")),document.querySelectorAll(".garage-tab-content").forEach(W=>W.classList.remove("active")),O.classList.add("active"),(Y=document.getElementById(`tab-${U}`))==null||Y.classList.add("active")})}),document.querySelectorAll(".addon-pills-row").forEach(O=>{const U=O.dataset.category;O.querySelectorAll(".addon-pill").forEach(Y=>{Y.addEventListener("click",()=>{const W=Y.dataset.value;this.currentAddons[U]=W;try{localStorage.setItem("ashilane_addons",JSON.stringify(this.currentAddons))}catch{}O.querySelectorAll(".addon-pill").forEach(ot=>ot.classList.remove("active")),Y.classList.add("active"),this.game.updateGarageAddons(this.currentAddons)})})}),(f=document.getElementById("garage-car-prev"))==null||f.addEventListener("click",()=>{this.currentCarIndex=(this.currentCarIndex-1+ce.length)%ce.length,this.onGarageCarChanged()}),(g=document.getElementById("garage-car-next"))==null||g.addEventListener("click",()=>{this.currentCarIndex=(this.currentCarIndex+1)%ce.length,this.onGarageCarChanged()}),(_=document.getElementById("btn-garage-back"))==null||_.addEventListener("click",()=>{this.showView("menu"),this.game.exitGaragePreview()});const t=document.getElementById("garage-color-input"),e=document.getElementById("garage-color-hex");t&&(t.value=this.currentColor,t.addEventListener("input",O=>{this.currentColor=O.target.value;try{localStorage.setItem("ashilane_color",this.currentColor)}catch{}e&&(e.textContent=this.currentColor.toUpperCase()),this.game.updateGarageColor(this.currentColor)})),document.querySelectorAll(".color-swatch").forEach(O=>{O.addEventListener("click",U=>{const Y=U.target.dataset.color;if(Y){this.currentColor=Y;try{localStorage.setItem("ashilane_color",this.currentColor)}catch{}t&&(t.value=Y),e&&(e.textContent=Y.toUpperCase()),this.game.updateGarageColor(Y)}})}),[{id:"btn-tt-view-front",angle:Math.PI,pitch:.22,dist:5.4},{id:"btn-tt-view-side",angle:Math.PI/2,pitch:.18,dist:5.8},{id:"btn-tt-view-rear",angle:0,pitch:.22,dist:5.4},{id:"btn-tt-view-iso",angle:.65,pitch:.3,dist:6},{id:"btn-tt-view-top",angle:.65,pitch:1.15,dist:6.8}].forEach(O=>{var U;(U=document.getElementById(O.id))==null||U.addEventListener("click",()=>{var Y;document.querySelectorAll(".tt-quick-views .tt-btn").forEach(W=>W.classList.remove("active")),(Y=document.getElementById(O.id))==null||Y.classList.add("active"),this.game.setGarageCameraAngle(O.angle,O.pitch,O.dist)})}),(m=document.getElementById("btn-tt-left"))==null||m.addEventListener("click",()=>{this.game.rotateGarageBy(-Math.PI/6)}),(p=document.getElementById("btn-tt-right"))==null||p.addEventListener("click",()=>{this.game.rotateGarageBy(Math.PI/6)}),(x=document.getElementById("btn-tt-autospin"))==null||x.addEventListener("click",()=>{const O=document.getElementById("btn-tt-autospin"),U=this.game.toggleGarageAutoSpin();O==null||O.classList.toggle("active",U)}),(S=document.getElementById("btn-tt-zoom-in"))==null||S.addEventListener("click",()=>{this.game.zoomGarageBy(-.8)}),(v=document.getElementById("btn-tt-zoom-out"))==null||v.addEventListener("click",()=>{this.game.zoomGarageBy(.8)});const i=document.getElementById("player-name-input");i&&(i.value=this.playerName,i.addEventListener("input",O=>{this.playerName=O.target.value.trim()||"นักซิ่งอาชิ",localStorage.setItem("ashilane_name",this.playerName)})),(L=document.getElementById("btn-copy-code"))==null||L.addEventListener("click",()=>{var U;const O=(U=document.getElementById("lobby-room-code"))==null?void 0:U.textContent;O&&(navigator.clipboard.writeText(O),alert(`คัดลอกรหัสห้องแล้ว: ${O}`))}),(E=document.getElementById("btn-copy-link"))==null||E.addEventListener("click",()=>{var U;const O=(U=document.getElementById("lobby-room-code"))==null?void 0:U.textContent;if(O){const Y=`${window.location.origin}${window.location.pathname}?room=${O}`;navigator.clipboard.writeText(Y),alert(`คัดลอกลิงก์ชวนเพื่อนแล้ว!
${Y}`)}}),(C=document.getElementById("btn-start-race"))==null||C.addEventListener("click",()=>{var W,ot,N;const O=parseInt(((W=document.getElementById("lobby-laps-select"))==null?void 0:W.value)||"3"),U=parseInt(((ot=document.getElementById("lobby-ai-select"))==null?void 0:ot.value)||"2"),Y=((N=document.getElementById("lobby-stage-select"))==null?void 0:N.value)||"beach";this.triggerRaceStartTransition(()=>{this.game.multiplayer.startRace({laps:O,aiCount:U,trackId:Y})})}),(w=document.getElementById("btn-ready"))==null||w.addEventListener("click",()=>{const O=document.getElementById("btn-ready"),U=O.dataset.ready!=="true";O.dataset.ready=U?"true":"false",O.textContent=U?"✅ พร้อมแล้ว!":"⏳ กดพร้อม",O.classList.toggle("ready",U),this.game.multiplayer.updateLocalPlayer({isReady:U})}),(M=document.getElementById("btn-leave-lobby"))==null||M.addEventListener("click",()=>{this.game.multiplayer.disconnect(),this.showView("menu")}),document.querySelectorAll(".emote-btn").forEach(O=>{O.addEventListener("click",()=>{const U=O.textContent;this.game.sendEmote(U)})}),(y=document.getElementById("btn-victory-restart"))==null||y.addEventListener("click",()=>{this.showView("hud"),this.game.restartRace()}),(R=document.getElementById("btn-victory-stage"))==null||R.addEventListener("click",()=>{this.openStageSelect(this.game.gameMode||"gp")}),(k=document.getElementById("btn-victory-menu"))==null||k.addEventListener("click",()=>{this.showView("menu"),this.game.exitToMainMenu()}),(F=this.btnSkipGridIntro)==null||F.addEventListener("click",O=>{O.stopPropagation(),this.skipGridIntro()}),(H=this.viewGridIntro)==null||H.addEventListener("click",()=>{this.skipGridIntro()})}triggerRaceStartTransition(t){var i,r,o;const e=document.getElementById("cinematic-transition-curtain");if(!e){t&&t();return}try{(o=(r=(i=this.game)==null?void 0:i.audio)==null?void 0:r.playClick)==null||o.call(r)}catch{}const n=document.querySelector("#view-stage-select .stage-select-card, #view-lobby .lobby-card");n&&(n.style.transition="transform 0.18s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.18s cubic-bezier(0.4, 0, 0.2, 1)",n.style.transform="scale(0.96) translateY(8px)",n.style.opacity="0"),e.classList.remove("hidden"),e.offsetHeight,e.classList.add("active"),setTimeout(()=>{n&&(n.style.transform="",n.style.opacity="",n.style.transition=""),t&&t(),setTimeout(()=>{e.classList.remove("active"),setTimeout(()=>{e.classList.add("hidden")},250)},50)},180)}showView(t){var e,n,i,r,o,a;t!=="grid_intro"&&this.hideGridIntro(),[this.viewMenu,this.viewStageSelect,this.viewGarage,this.viewLobby,this.viewVictory].forEach(c=>{c&&c.classList.add("hidden")}),t==="menu"?(e=this.viewMenu)==null||e.classList.remove("hidden"):t==="stage_select"?(n=this.viewStageSelect)==null||n.classList.remove("hidden"):t==="garage"?(i=this.viewGarage)==null||i.classList.remove("hidden"):t==="lobby"?(r=this.viewLobby)==null||r.classList.remove("hidden"):t==="victory"?(o=this.viewVictory)==null||o.classList.remove("hidden"):t==="grid_intro"&&((a=this.viewGridIntro)==null||a.classList.remove("hidden")),t==="hud"?this.game.hud.show():this.game.hud.hide()}showGridIntro(t,e,n){var r;this.showView("grid_intro"),this.onGridIntroSkip=n,this.currentGridRacers=t||[],this.activeGridRacerIndex=-1,this.game.hud.hide(),this.gridIntroStageTitle&&(this.gridIntroStageTitle.textContent=e||"STARTING LINE");const i=this.currentGridRacers.length>0?this.currentGridRacers.length-1:0;this.updateGridBroadcast(i),(r=this.viewGridIntro)==null||r.classList.remove("hidden")}updateGridBroadcast(t){if(!this.currentGridRacers||t===this.activeGridRacerIndex||t<0||t>=this.currentGridRacers.length)return;this.activeGridRacerIndex=t;const e=this.currentGridRacers[t],n=t+1;if(this.gbPos&&(this.gbPos.textContent=n,this.gbPos.className=`grid-broadcast-pos-badge ${n===1?"p1":n===2?"p2":n===3?"p3":""}`),this.gbPhoto){const i=e.skinFileName||"Gemini_Generated_Image_4g9dic4g9dic4g9d.jpg";this.gbPhoto.src=`../assets/ashi/${i}`}this.gbName&&(this.gbName.innerHTML=`${e.name} ${e.isPlayer?'<span class="gb-you-badge">YOU (คุณ)</span>':""}`),this.gbCarName&&(this.gbCarName.textContent=e.carName||"รถซิ่งอาชิ"),this.gbCarTag&&(this.gbCarTag.textContent=e.carTag||"RACER"),this.gbColorDot&&(this.gbColorDot.style.backgroundColor=e.color||"#00f3ff"),this.gbBadge&&(this.gbBadge.textContent=e.isPlayer?"👑 POLE POSITION":"🏎️ RIVAL RACER",this.gbBadge.className=`gb-role-pill ${e.isPlayer?"pole":""}`),this.gridBroadcastCard&&(this.gridBroadcastCard.classList.toggle("is-player",!!e.isPlayer),this.gridBroadcastCard.style.borderColor=e.isPlayer?"#ffd700":e.color||"rgba(0, 243, 255, 0.5)",this.gridBroadcastCard.style.boxShadow=e.isPlayer?"0 14px 45px rgba(0, 0, 0, 0.85), 0 0 32px rgba(255, 215, 0, 0.5)":`0 14px 40px rgba(0, 0, 0, 0.8), 0 0 24px ${e.color?e.color+"55":"rgba(0, 243, 255, 0.3)"}`,this.gridBroadcastCard.style.animation="none",this.gridBroadcastCard.offsetHeight,this.gridBroadcastCard.style.animation="gbSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)")}skipGridIntro(){if(this.onGridIntroSkip){const t=this.onGridIntroSkip;this.onGridIntroSkip=null,this.hideGridIntro(),t()}}hideGridIntro(){var t;(t=this.viewGridIntro)==null||t.classList.add("hidden"),this.onGridIntroSkip=null}openStageSelect(t="gp"){this.targetGameMode=t;const e=document.getElementById("stage-select-title");e&&(e.textContent=t==="gp"?"🏆 เลือกด่านแข่งขัน (AI Grand Prix)":"⏱️ เลือกด่านจับเวลา (Time Attack)");const n=document.getElementById("stage-difficulty-row");n&&(n.style.display=t==="gp"?"flex":"none"),this.showView("stage_select")}populateStageCards(){const t=document.getElementById("stages-grid");if(!t)return;t.innerHTML="";const e={beach:"🏖️",buriram:"🌃",snow:"❄️",volcano:"🌋"},n={beach:"มือใหม่ & สปีด",buriram:"แสงสีนีออน",snow:"ดริฟต์หิมะ",volcano:"ความเร็วสูงสุด"};Go.forEach(i=>{const r=document.createElement("div"),o=i.id===this.selectedTrackId;r.className=`stage-card ${o?"selected":""} stage-${i.id}`,r.dataset.id=i.id;const a="★".repeat(i.difficulty)+"☆".repeat(4-i.difficulty);r.innerHTML=`
        <div class="stage-card-header">
          <span class="stage-num">${i.stageLabel}</span>
          <span class="stage-stars">${a}</span>
        </div>
        <div class="stage-card-visual">
          <span class="stage-icon">${e[i.id]||"🏎️"}</span>
          <div class="stage-tag">${n[i.id]||"GRAND PRIX"}</div>
        </div>
        <div class="stage-card-body">
          <h3 class="stage-name">${i.nameTh}</h3>
          <div class="stage-name-en">${i.name}</div>
          <p class="stage-desc">${i.desc}</p>
        </div>
      `,r.addEventListener("click",()=>{this.selectedTrackId=i.id,document.querySelectorAll(".stage-card").forEach(c=>c.classList.remove("selected")),r.classList.add("selected")}),t.appendChild(r)})}populateGarageSkins(){const t=document.getElementById("garage-skins-list");t&&(t.innerHTML="",Ai.forEach(e=>{const n=document.createElement("div");n.className=`skin-card ${e.id===this.currentSkinId?"selected":""} ${e.rarity}`,n.innerHTML=`
        <div class="skin-thumb-wrap">
          <img src="../assets/ashi/${e.file}" alt="${e.nameTh}" loading="lazy" />
          <span class="skin-tag">${e.tag}</span>
        </div>
        <div class="skin-info">
          <div class="skin-name">${e.nameTh}</div>
          <div class="skin-desc">${e.desc}</div>
        </div>
      `,n.addEventListener("click",()=>{this.currentSkinId=e.id;try{localStorage.setItem("ashilane_skin",this.currentSkinId)}catch{}if(document.querySelectorAll(".skin-card").forEach(i=>i.classList.remove("selected")),n.classList.add("selected"),e.color){this.currentColor=e.color;try{localStorage.setItem("ashilane_color",this.currentColor)}catch{}const i=document.getElementById("garage-color-input");i&&(i.value=this.currentColor);const r=document.getElementById("garage-color-hex");r&&(r.textContent=this.currentColor.toUpperCase())}this.game.updateGarageSkin(this.getSelectedSkinFile())}),t.appendChild(n)}))}syncGarageAddonPills(){document.querySelectorAll(".addon-pills-row").forEach(t=>{const e=t.dataset.category,n=this.currentAddons[e];t.querySelectorAll(".addon-pill").forEach(i=>{i.classList.toggle("active",i.dataset.value===n)})})}onGarageCarChanged(){try{localStorage.setItem("ashilane_car_index",this.currentCarIndex)}catch{}const t=ce[this.currentCarIndex];document.getElementById("garage-car-name").textContent=t.nameTh,document.getElementById("garage-car-tag").textContent=t.tag,document.getElementById("garage-car-desc").textContent=t.desc,this.updateGarageStats(),this.game.enterGaragePreview(t.id,this.getSelectedSkinFile(),this.currentColor,this.currentAddons)}updateGarageStats(){const e=ce[this.currentCarIndex].stats;document.getElementById("stat-speed-bar").style.width=`${e.speed}%`,document.getElementById("stat-accel-bar").style.width=`${e.accel}%`,document.getElementById("stat-drift-bar").style.width=`${e.drift}%`,document.getElementById("stat-handling-bar").style.width=`${e.handling}%`,document.getElementById("stat-boost-bar").style.width=`${e.boost}%`}getSelectedCar(){return ce[this.currentCarIndex]}getSelectedSkinFile(){const t=Ai.find(e=>e.id===this.currentSkinId);return t?t.file:"Gemini_Generated_Image_4g9dic4g9dic4g9d.jpg"}getPlayerConfig(){return{name:this.playerName,carId:ce[this.currentCarIndex].id,skinFileName:this.getSelectedSkinFile(),color:this.currentColor,addons:{...this.currentAddons}}}showCreateRoomPrompt(){const t=this.getPlayerConfig();this.game.multiplayer.createRoom(t,e=>{this.setupLobbyView(e,!0)},e=>{alert("เกิดข้อผิดพลาดในการสร้างห้อง: "+e.message)})}showJoinRoomPrompt(){const t=prompt("กรุณากรอกรหัสห้อง (Room Code เช่น ASHI-1234):");if(!t)return;const e=this.getPlayerConfig();this.game.multiplayer.joinRoom(t,e,n=>{this.setupLobbyView(n,!1)},n=>{alert("ไม่สามารถเชื่อมต่อห้องนี้ได้ ตรวจสอบรหัสห้องอีกครั้ง: "+n.message)})}setupLobbyView(t,e){this.showView("lobby"),document.getElementById("lobby-room-code").textContent=t;const n=document.getElementById("lobby-host-controls"),i=document.getElementById("btn-start-race"),r=document.getElementById("btn-ready");e?(n&&n.classList.remove("hidden"),i&&i.classList.remove("hidden"),r&&r.classList.add("hidden")):(n&&n.classList.add("hidden"),i&&i.classList.add("hidden"),r&&r.classList.remove("hidden"))}updateLobbyPlayers(t,e){const n=document.getElementById("lobby-players-grid");n&&(n.innerHTML="",t.forEach(i=>{const r=document.createElement("div"),o=i.id===e;r.className=`lobby-player-card ${o?"self":""}`;const a=ce.find(l=>l.id===i.carId)||ce[0],c=i.skinFileName||"Gemini_Generated_Image_4g9dic4g9dic4g9d.jpg";r.innerHTML=`
        <div class="player-avatar">
          <img src="../assets/ashi/${c}" alt="${i.name}" />
        </div>
        <div class="player-details">
          <div class="p-name">${i.name} ${i.isHost?"👑 (Host)":""} ${o?"(คุณ)":""}</div>
          <div class="p-car">${a.nameTh}</div>
          <div class="p-status ${i.isReady?"ready":"waiting"}">
            ${i.isReady?"✅ พร้อมแล้ว":"⏳ รอพร้อม"}
          </div>
        </div>
      `,n.appendChild(r)}))}showVictoryScreen(t){this.showView("victory");try{typeof Qi=="function"&&(Qi({particleCount:140,spread:85,origin:{y:.55}}),setTimeout(()=>Qi({particleCount:85,angle:60,spread:60,origin:{x:.12,y:.65}}),350),setTimeout(()=>Qi({particleCount:85,angle:120,spread:60,origin:{x:.88,y:.65}}),700),setTimeout(()=>Qi({particleCount:130,spread:110,origin:{y:.35},colors:["#ffd700","#ffaa00","#ffffff","#00f0ff"]}),1150))}catch{}const e=t.findIndex(a=>a.isPlayer)+1,n=document.getElementById("podium-headline"),i=document.getElementById("podium-subheadline");n&&i&&(e===1?(n.innerHTML="👑 ยินดีด้วย! คุณคว้าแชมป์อันดับ 1! 🏆",i.textContent="สุดยอดฝีมือไร้เทียมทาน คว้าถ้วยรางวัลชนะเลิศอันดับ 1 ครองโพเดียมทองคำ!"):e===2?(n.innerHTML="🥈 ยอดเยี่ยมมาก! คุณขึ้นโพเดียมอันดับ 2!",i.textContent="ขับเคี่ยวสุดมันส์ ก้าวขึ้นสู่โพเดียมเหรียญเงินแห่งเกียรติยศ!"):e===3?(n.innerHTML="🥉 เยี่ยมมาก! คุณขึ้นโพเดียมอันดับ 3!",i.textContent="ฝ่าฟันอุปสรรคจนเข้าเส้นชัยติด 1 ใน 3 โพเดียมเหรียญทองแดง!"):(n.innerHTML="🏁 การแข่งขันสิ้นสุด! โพเดียม 3 อันดับแรก",i.textContent=`คุณเข้าเส้นชัยในอันดับที่ ${e} — ซ้อมมือแล้วกลับมาท้าชิงแชมป์ใหม่!`)),[{rank:1,id:"1",result:t[0]},{rank:2,id:"2",result:t[1]},{rank:3,id:"3",result:t[2]}].forEach(({rank:a,id:c,result:l})=>{const h=document.getElementById(`podium-col-${c}`),d=document.getElementById(`podium-avatar-${c}`),u=document.getElementById(`podium-name-${c}`),f=document.getElementById(`podium-car-${c}`),g=document.getElementById(`podium-time-${c}`);if(h)if(l){if(h.style.display="flex",d&&(d.onerror=()=>{d.src="../assets/ashi/Gemini_Generated_Image_4g9dic4g9dic4g9d.jpg"},d.src=`../assets/ashi/${l.skinFileName||"Gemini_Generated_Image_4g9dic4g9dic4g9d.jpg"}`),u&&(u.innerHTML=`${l.name} ${l.isPlayer?'<span class="podium-you-pill">YOU</span>':""}`),f&&(f.textContent=l.carName||"รถซิ่งอาชิ"),g){const _=l.totalTime?this.game.hud.formatTime(l.totalTime):"DNF",m=l.bestLap?this.game.hud.formatTime(l.bestLap):"-";g.innerHTML=`<span>เวลา: <strong>${_}</strong></span> | <span>Best: <strong>${m}</strong></span>`}}else h.style.display="none"});const o=document.getElementById("victory-rankings-body");o&&(o.innerHTML="",t.forEach((a,c)=>{const l=document.createElement("tr");l.className=a.isPlayer?"player-row":"";const h=["1st 🏆","2nd 🥈","3rd 🥉"][c]||`${c+1}th`;l.innerHTML=`
          <td class="rank-col">${h}</td>
          <td class="name-col">
            <img src="../assets/ashi/${a.skinFileName||"Gemini_Generated_Image_4g9dic4g9dic4g9d.jpg"}" onerror="this.src='../assets/ashi/Gemini_Generated_Image_4g9dic4g9dic4g9d.jpg'" class="mini-avatar" />
            <span>${a.name}</span>
            ${a.isPlayer?'<span class="podium-you-pill mini">YOU</span>':""}
          </td>
          <td class="car-col">${a.carName}</td>
          <td class="time-col">${a.totalTime?this.game.hud.formatTime(a.totalTime):"DNF"}</td>
          <td class="best-col">${a.bestLap?this.game.hud.formatTime(a.bestLap):"-"}</td>
        `,o.appendChild(l)}))}}class Cg{constructor(){this.encoder=new TextEncoder,this._pieces=[],this._parts=[]}append_buffer(t){this.flush(),this._parts.push(t)}append(t){this._pieces.push(t)}flush(){if(this._pieces.length>0){const t=new Uint8Array(this._pieces);this._parts.push(t),this._pieces=[]}}toArrayBuffer(){const t=[];for(const e of this._parts)t.push(e);return Ag(t).buffer}}function Ag(s){let t=0;for(const i of s)t+=i.byteLength;const e=new Uint8Array(t);let n=0;for(const i of s){const r=new Uint8Array(i.buffer,i.byteOffset,i.byteLength);e.set(r,n),n+=i.byteLength}return e}function kl(s){return new Rg(s).unpack()}function Fl(s){const t=new Pg,e=t.pack(s);return e instanceof Promise?e.then(()=>t.getBuffer()):t.getBuffer()}class Rg{constructor(t){this.index=0,this.dataBuffer=t,this.dataView=new Uint8Array(this.dataBuffer),this.length=this.dataBuffer.byteLength}unpack(){const t=this.unpack_uint8();if(t<128)return t;if((t^224)<32)return(t^224)-32;let e;if((e=t^160)<=15)return this.unpack_raw(e);if((e=t^176)<=15)return this.unpack_string(e);if((e=t^144)<=15)return this.unpack_array(e);if((e=t^128)<=15)return this.unpack_map(e);switch(t){case 192:return null;case 193:return;case 194:return!1;case 195:return!0;case 202:return this.unpack_float();case 203:return this.unpack_double();case 204:return this.unpack_uint8();case 205:return this.unpack_uint16();case 206:return this.unpack_uint32();case 207:return this.unpack_uint64();case 208:return this.unpack_int8();case 209:return this.unpack_int16();case 210:return this.unpack_int32();case 211:return this.unpack_int64();case 212:return;case 213:return;case 214:return;case 215:return;case 216:return e=this.unpack_uint16(),this.unpack_string(e);case 217:return e=this.unpack_uint32(),this.unpack_string(e);case 218:return e=this.unpack_uint16(),this.unpack_raw(e);case 219:return e=this.unpack_uint32(),this.unpack_raw(e);case 220:return e=this.unpack_uint16(),this.unpack_array(e);case 221:return e=this.unpack_uint32(),this.unpack_array(e);case 222:return e=this.unpack_uint16(),this.unpack_map(e);case 223:return e=this.unpack_uint32(),this.unpack_map(e)}}unpack_uint8(){const t=this.dataView[this.index]&255;return this.index++,t}unpack_uint16(){const t=this.read(2),e=(t[0]&255)*256+(t[1]&255);return this.index+=2,e}unpack_uint32(){const t=this.read(4),e=((t[0]*256+t[1])*256+t[2])*256+t[3];return this.index+=4,e}unpack_uint64(){const t=this.read(8),e=((((((t[0]*256+t[1])*256+t[2])*256+t[3])*256+t[4])*256+t[5])*256+t[6])*256+t[7];return this.index+=8,e}unpack_int8(){const t=this.unpack_uint8();return t<128?t:t-256}unpack_int16(){const t=this.unpack_uint16();return t<32768?t:t-65536}unpack_int32(){const t=this.unpack_uint32();return t<2**31?t:t-2**32}unpack_int64(){const t=this.unpack_uint64();return t<2**63?t:t-2**64}unpack_raw(t){if(this.length<this.index+t)throw new Error(`BinaryPackFailure: index is out of range ${this.index} ${t} ${this.length}`);const e=this.dataBuffer.slice(this.index,this.index+t);return this.index+=t,e}unpack_string(t){const e=this.read(t);let n=0,i="",r,o;for(;n<t;)r=e[n],r<160?(o=r,n++):(r^192)<32?(o=(r&31)<<6|e[n+1]&63,n+=2):(r^224)<16?(o=(r&15)<<12|(e[n+1]&63)<<6|e[n+2]&63,n+=3):(o=(r&7)<<18|(e[n+1]&63)<<12|(e[n+2]&63)<<6|e[n+3]&63,n+=4),i+=String.fromCodePoint(o);return this.index+=t,i}unpack_array(t){const e=new Array(t);for(let n=0;n<t;n++)e[n]=this.unpack();return e}unpack_map(t){const e={};for(let n=0;n<t;n++){const i=this.unpack();e[i]=this.unpack()}return e}unpack_float(){const t=this.unpack_uint32(),e=t>>31,n=(t>>23&255)-127,i=t&8388607|8388608;return(e===0?1:-1)*i*2**(n-23)}unpack_double(){const t=this.unpack_uint32(),e=this.unpack_uint32(),n=t>>31,i=(t>>20&2047)-1023,o=(t&1048575|1048576)*2**(i-20)+e*2**(i-52);return(n===0?1:-1)*o}read(t){const e=this.index;if(e+t<=this.length)return this.dataView.subarray(e,e+t);throw new Error("BinaryPackFailure: read index out of range")}}class Pg{getBuffer(){return this._bufferBuilder.toArrayBuffer()}pack(t){if(typeof t=="string")this.pack_string(t);else if(typeof t=="number")Math.floor(t)===t?this.pack_integer(t):this.pack_double(t);else if(typeof t=="boolean")t===!0?this._bufferBuilder.append(195):t===!1&&this._bufferBuilder.append(194);else if(t===void 0)this._bufferBuilder.append(192);else if(typeof t=="object")if(t===null)this._bufferBuilder.append(192);else{const e=t.constructor;if(t instanceof Array){const n=this.pack_array(t);if(n instanceof Promise)return n.then(()=>this._bufferBuilder.flush())}else if(t instanceof ArrayBuffer)this.pack_bin(new Uint8Array(t));else if("BYTES_PER_ELEMENT"in t){const n=t;this.pack_bin(new Uint8Array(n.buffer,n.byteOffset,n.byteLength))}else if(t instanceof Date)this.pack_string(t.toString());else{if(t instanceof Blob)return t.arrayBuffer().then(n=>{this.pack_bin(new Uint8Array(n)),this._bufferBuilder.flush()});if(e==Object||e.toString().startsWith("class")){const n=this.pack_object(t);if(n instanceof Promise)return n.then(()=>this._bufferBuilder.flush())}else throw new Error(`Type "${e.toString()}" not yet supported`)}}else throw new Error(`Type "${typeof t}" not yet supported`);this._bufferBuilder.flush()}pack_bin(t){const e=t.length;if(e<=15)this.pack_uint8(160+e);else if(e<=65535)this._bufferBuilder.append(218),this.pack_uint16(e);else if(e<=4294967295)this._bufferBuilder.append(219),this.pack_uint32(e);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(t)}pack_string(t){const e=this._textEncoder.encode(t),n=e.length;if(n<=15)this.pack_uint8(176+n);else if(n<=65535)this._bufferBuilder.append(216),this.pack_uint16(n);else if(n<=4294967295)this._bufferBuilder.append(217),this.pack_uint32(n);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(e)}pack_array(t){const e=t.length;if(e<=15)this.pack_uint8(144+e);else if(e<=65535)this._bufferBuilder.append(220),this.pack_uint16(e);else if(e<=4294967295)this._bufferBuilder.append(221),this.pack_uint32(e);else throw new Error("Invalid length");const n=i=>{if(i<e){const r=this.pack(t[i]);return r instanceof Promise?r.then(()=>n(i+1)):n(i+1)}};return n(0)}pack_integer(t){if(t>=-32&&t<=127)this._bufferBuilder.append(t&255);else if(t>=0&&t<=255)this._bufferBuilder.append(204),this.pack_uint8(t);else if(t>=-128&&t<=127)this._bufferBuilder.append(208),this.pack_int8(t);else if(t>=0&&t<=65535)this._bufferBuilder.append(205),this.pack_uint16(t);else if(t>=-32768&&t<=32767)this._bufferBuilder.append(209),this.pack_int16(t);else if(t>=0&&t<=4294967295)this._bufferBuilder.append(206),this.pack_uint32(t);else if(t>=-2147483648&&t<=2147483647)this._bufferBuilder.append(210),this.pack_int32(t);else if(t>=-9223372036854776e3&&t<=9223372036854776e3)this._bufferBuilder.append(211),this.pack_int64(t);else if(t>=0&&t<=18446744073709552e3)this._bufferBuilder.append(207),this.pack_uint64(t);else throw new Error("Invalid integer")}pack_double(t){let e=0;t<0&&(e=1,t=-t);const n=Math.floor(Math.log(t)/Math.LN2),i=t/2**n-1,r=Math.floor(i*2**52),o=2**32,a=e<<31|n+1023<<20|r/o&1048575,c=r%o;this._bufferBuilder.append(203),this.pack_int32(a),this.pack_int32(c)}pack_object(t){const e=Object.keys(t),n=e.length;if(n<=15)this.pack_uint8(128+n);else if(n<=65535)this._bufferBuilder.append(222),this.pack_uint16(n);else if(n<=4294967295)this._bufferBuilder.append(223),this.pack_uint32(n);else throw new Error("Invalid length");const i=r=>{if(r<e.length){const o=e[r];if(t.hasOwnProperty(o)){this.pack(o);const a=this.pack(t[o]);if(a instanceof Promise)return a.then(()=>i(r+1))}return i(r+1)}};return i(0)}pack_uint8(t){this._bufferBuilder.append(t)}pack_uint16(t){this._bufferBuilder.append(t>>8),this._bufferBuilder.append(t&255)}pack_uint32(t){const e=t&4294967295;this._bufferBuilder.append((e&4278190080)>>>24),this._bufferBuilder.append((e&16711680)>>>16),this._bufferBuilder.append((e&65280)>>>8),this._bufferBuilder.append(e&255)}pack_uint64(t){const e=t/4294967296,n=t%2**32;this._bufferBuilder.append((e&4278190080)>>>24),this._bufferBuilder.append((e&16711680)>>>16),this._bufferBuilder.append((e&65280)>>>8),this._bufferBuilder.append(e&255),this._bufferBuilder.append((n&4278190080)>>>24),this._bufferBuilder.append((n&16711680)>>>16),this._bufferBuilder.append((n&65280)>>>8),this._bufferBuilder.append(n&255)}pack_int8(t){this._bufferBuilder.append(t&255)}pack_int16(t){this._bufferBuilder.append((t&65280)>>8),this._bufferBuilder.append(t&255)}pack_int32(t){this._bufferBuilder.append(t>>>24&255),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255)}pack_int64(t){const e=Math.floor(t/4294967296),n=t%2**32;this._bufferBuilder.append((e&4278190080)>>>24),this._bufferBuilder.append((e&16711680)>>>16),this._bufferBuilder.append((e&65280)>>>8),this._bufferBuilder.append(e&255),this._bufferBuilder.append((n&4278190080)>>>24),this._bufferBuilder.append((n&16711680)>>>16),this._bufferBuilder.append((n&65280)>>>8),this._bufferBuilder.append(n&255)}constructor(){this._bufferBuilder=new Cg,this._textEncoder=new TextEncoder}}let Ol=!0,Bl=!0;function is(s,t,e){const n=s.match(t);return n&&n.length>=e&&parseFloat(n[e],10)}function ii(s,t,e){if(!s.RTCPeerConnection)return;if(!Object.getOwnPropertyDescriptor(EventTarget.prototype,"addEventListener").writable){_a("Unable to polyfill events");return}const i=s.RTCPeerConnection.prototype,r=i.addEventListener;i.addEventListener=function(a,c){if(a!==t)return r.apply(this,arguments);const l=h=>{const d=e(h);d&&(c.handleEvent?c.handleEvent(d):c(d))};return this._eventMap=this._eventMap||{},this._eventMap[t]||(this._eventMap[t]=new Map),this._eventMap[t].set(c,l),r.apply(this,[a,l])};const o=i.removeEventListener;i.removeEventListener=function(a,c){if(a!==t||!this._eventMap||!this._eventMap[t])return o.apply(this,arguments);if(!this._eventMap[t].has(c))return o.apply(this,arguments);const l=this._eventMap[t].get(c);return this._eventMap[t].delete(c),this._eventMap[t].size===0&&delete this._eventMap[t],Object.keys(this._eventMap).length===0&&delete this._eventMap,o.apply(this,[a,l])},Object.defineProperty(i,"on"+t,{get(){return this["_on"+t]},set(a){this["_on"+t]&&(this.removeEventListener(t,this["_on"+t]),delete this["_on"+t]),a&&this.addEventListener(t,this["_on"+t]=a)},enumerable:!0,configurable:!0})}function Ig(s){return typeof s!="boolean"?new Error("Argument type: "+typeof s+". Please use a boolean."):(Ol=s,s?"adapter.js logging disabled":"adapter.js logging enabled")}function Lg(s){return typeof s!="boolean"?new Error("Argument type: "+typeof s+". Please use a boolean."):(Bl=!s,"adapter.js deprecation warnings "+(s?"disabled":"enabled"))}function _a(){if(typeof window=="object"){if(Ol)return;typeof console<"u"&&typeof console.log=="function"&&console.log.apply(console,arguments)}}function va(s,t){Bl&&console.warn(s+" is deprecated, please use "+t+" instead.")}function Dg(s){const t={browser:null,version:null};if(typeof s>"u"||!s.navigator||!s.navigator.userAgent)return t.browser="Not a browser.",t;const{navigator:e}=s;if(e.userAgentData&&e.userAgentData.brands){const n=e.userAgentData.brands.find(i=>i.brand==="Chromium");if(n){const i=parseInt(n.version,10);if(i>=90)return{browser:"chrome",version:i}}}if(e.mozGetUserMedia)t.browser="firefox",t.version=parseInt(is(e.userAgent,/Firefox\/(\d+)\./,1));else if(e.webkitGetUserMedia||s.isSecureContext===!1&&s.webkitRTCPeerConnection)t.browser="chrome",t.version=parseInt(is(e.userAgent,/Chrom(e|ium)\/(\d+)\./,2))||null;else if(s.RTCPeerConnection&&e.userAgent.match(/AppleWebKit\/(\d+)\./))t.browser="safari",t.version=parseInt(is(e.userAgent,/AppleWebKit\/(\d+)\./,1)),t.supportsUnifiedPlan=s.RTCRtpTransceiver&&"currentDirection"in s.RTCRtpTransceiver.prototype,t._safariVersion=is(e.userAgent,/Version\/(\d+(\.?\d+))/,1);else return t.browser="Not a supported browser.",t;return t}function Vc(s){return Object.prototype.toString.call(s)==="[object Object]"}function zl(s){return Vc(s)?Object.keys(s).reduce(function(t,e){const n=Vc(s[e]),i=n?zl(s[e]):s[e],r=n&&!Object.keys(i).length;return i===void 0||r?t:Object.assign(t,{[e]:i})},{}):s}function Vo(s,t,e){!t||e.has(t.id)||(e.set(t.id,t),Object.keys(t).forEach(n=>{n.endsWith("Id")?Vo(s,s.get(t[n]),e):n.endsWith("Ids")&&t[n].forEach(i=>{Vo(s,s.get(i),e)})}))}function Hc(s,t,e){const n=e?"outbound-rtp":"inbound-rtp",i=new Map;if(t===null)return i;const r=[];return s.forEach(o=>{o.type==="track"&&o.trackIdentifier===t.id&&r.push(o)}),r.forEach(o=>{s.forEach(a=>{a.type===n&&a.trackId===o.id&&Vo(s,a,i)})}),i}const Wc=_a;function Gl(s,t){if(t.version>=64)return;const e=s&&s.navigator;if(!e.mediaDevices)return;const n=function(a){if(typeof a!="object"||a.mandatory||a.optional)return a;const c={};return Object.keys(a).forEach(l=>{if(l==="require"||l==="advanced"||l==="mediaSource")return;const h=typeof a[l]=="object"?a[l]:{ideal:a[l]};h.exact!==void 0&&typeof h.exact=="number"&&(h.min=h.max=h.exact);const d=function(u,f){return u?u+f.charAt(0).toUpperCase()+f.slice(1):f==="deviceId"?"sourceId":f};if(h.ideal!==void 0){c.optional=c.optional||[];let u={};typeof h.ideal=="number"?(u[d("min",l)]=h.ideal,c.optional.push(u),u={},u[d("max",l)]=h.ideal,c.optional.push(u)):(u[d("",l)]=h.ideal,c.optional.push(u))}h.exact!==void 0&&typeof h.exact!="number"?(c.mandatory=c.mandatory||{},c.mandatory[d("",l)]=h.exact):["min","max"].forEach(u=>{h[u]!==void 0&&(c.mandatory=c.mandatory||{},c.mandatory[d(u,l)]=h[u])})}),a.advanced&&(c.optional=(c.optional||[]).concat(a.advanced)),c},i=function(a,c){if(t.version>=61)return c(a);if(a=JSON.parse(JSON.stringify(a)),a&&typeof a.audio=="object"){const l=function(h,d,u){d in h&&!(u in h)&&(h[u]=h[d],delete h[d])};a=JSON.parse(JSON.stringify(a)),l(a.audio,"autoGainControl","googAutoGainControl"),l(a.audio,"noiseSuppression","googNoiseSuppression"),a.audio=n(a.audio)}if(a&&typeof a.video=="object"){let l=a.video.facingMode;l=l&&(typeof l=="object"?l:{ideal:l});const h=t.version<66;if(l&&(l.exact==="user"||l.exact==="environment"||l.ideal==="user"||l.ideal==="environment")&&!(e.mediaDevices.getSupportedConstraints&&e.mediaDevices.getSupportedConstraints().facingMode&&!h)){delete a.video.facingMode;let d;if(l.exact==="environment"||l.ideal==="environment"?d=["back","rear"]:(l.exact==="user"||l.ideal==="user")&&(d=["front"]),d)return e.mediaDevices.enumerateDevices().then(u=>{u=u.filter(g=>g.kind==="videoinput");let f=u.find(g=>d.some(_=>g.label.toLowerCase().includes(_)));return!f&&u.length&&d.includes("back")&&(f=u[u.length-1]),f&&(a.video.deviceId=l.exact?{exact:f.deviceId}:{ideal:f.deviceId}),a.video=n(a.video),Wc("chrome: "+JSON.stringify(a)),c(a)})}a.video=n(a.video)}return Wc("chrome: "+JSON.stringify(a)),c(a)},r=function(a){return t.version>=64?a:{name:{PermissionDeniedError:"NotAllowedError",PermissionDismissedError:"NotAllowedError",InvalidStateError:"NotAllowedError",DevicesNotFoundError:"NotFoundError",ConstraintNotSatisfiedError:"OverconstrainedError",TrackStartError:"NotReadableError",MediaDeviceFailedDueToShutdown:"NotAllowedError",MediaDeviceKillSwitchOn:"NotAllowedError",TabCaptureError:"AbortError",ScreenCaptureError:"AbortError",DeviceCaptureError:"AbortError"}[a.name]||a.name,message:a.message,constraint:a.constraint||a.constraintName,toString(){return this.name+(this.message&&": ")+this.message}}},o=function(a,c,l){i(a,h=>{e.webkitGetUserMedia(h,c,d=>{l&&l(r(d))})})};if(e.getUserMedia=o.bind(e),e.mediaDevices.getUserMedia){const a=e.mediaDevices.getUserMedia.bind(e.mediaDevices);e.mediaDevices.getUserMedia=function(c){return i(c,l=>a(l).then(h=>{if(l.audio&&!h.getAudioTracks().length||l.video&&!h.getVideoTracks().length)throw h.getTracks().forEach(d=>{d.stop()}),new DOMException("","NotFoundError");return h},h=>Promise.reject(r(h))))}}}function Vl(s){s.MediaStream=s.MediaStream||s.webkitMediaStream}function Hl(s,t){if(!(t.version>102))if(typeof s=="object"&&s.RTCPeerConnection&&!("ontrack"in s.RTCPeerConnection.prototype)){Object.defineProperty(s.RTCPeerConnection.prototype,"ontrack",{get(){return this._ontrack},set(n){this._ontrack&&this.removeEventListener("track",this._ontrack),this.addEventListener("track",this._ontrack=n)},enumerable:!0,configurable:!0});const e=s.RTCPeerConnection.prototype.setRemoteDescription;s.RTCPeerConnection.prototype.setRemoteDescription=function(){return this._ontrackpoly||(this._ontrackpoly=i=>{i.stream.addEventListener("addtrack",r=>{let o;s.RTCPeerConnection.prototype.getReceivers?o=this.getReceivers().find(c=>c.track&&c.track.id===r.track.id):o={track:r.track};const a=new Event("track");a.track=r.track,a.receiver=o,a.transceiver={receiver:o},a.streams=[i.stream],this.dispatchEvent(a)}),i.stream.getTracks().forEach(r=>{let o;s.RTCPeerConnection.prototype.getReceivers?o=this.getReceivers().find(c=>c.track&&c.track.id===r.id):o={track:r};const a=new Event("track");a.track=r,a.receiver=o,a.transceiver={receiver:o},a.streams=[i.stream],this.dispatchEvent(a)})},this.addEventListener("addstream",this._ontrackpoly)),e.apply(this,arguments)}}else ii(s,"track",e=>(e.transceiver||Object.defineProperty(e,"transceiver",{value:{receiver:e.receiver}}),e))}function Wl(s){if(typeof s=="object"&&s.RTCPeerConnection&&!("getSenders"in s.RTCPeerConnection.prototype)&&"createDTMFSender"in s.RTCPeerConnection.prototype){const t=function(i,r){return{track:r,get dtmf(){return this._dtmf===void 0&&(r.kind==="audio"?this._dtmf=i.createDTMFSender(r):this._dtmf=null),this._dtmf},_pc:i}};if(!s.RTCPeerConnection.prototype.getSenders){s.RTCPeerConnection.prototype.getSenders=function(){return this._senders=this._senders||[],this._senders.slice()};const i=s.RTCPeerConnection.prototype.addTrack;s.RTCPeerConnection.prototype.addTrack=function(a,c){let l=i.apply(this,arguments);return l||(l=t(this,a),this._senders.push(l)),l};const r=s.RTCPeerConnection.prototype.removeTrack;s.RTCPeerConnection.prototype.removeTrack=function(a){r.apply(this,arguments);const c=this._senders.indexOf(a);c!==-1&&this._senders.splice(c,1)}}const e=s.RTCPeerConnection.prototype.addStream;s.RTCPeerConnection.prototype.addStream=function(r){this._senders=this._senders||[],e.apply(this,[r]),r.getTracks().forEach(o=>{this._senders.push(t(this,o))})};const n=s.RTCPeerConnection.prototype.removeStream;s.RTCPeerConnection.prototype.removeStream=function(r){this._senders=this._senders||[],n.apply(this,[r]),r.getTracks().forEach(o=>{const a=this._senders.find(c=>c.track===o);a&&this._senders.splice(this._senders.indexOf(a),1)})}}else if(typeof s=="object"&&s.RTCPeerConnection&&"getSenders"in s.RTCPeerConnection.prototype&&"createDTMFSender"in s.RTCPeerConnection.prototype&&s.RTCRtpSender&&!("dtmf"in s.RTCRtpSender.prototype)){const t=s.RTCPeerConnection.prototype.getSenders;s.RTCPeerConnection.prototype.getSenders=function(){const n=t.apply(this,[]);return n.forEach(i=>i._pc=this),n},Object.defineProperty(s.RTCRtpSender.prototype,"dtmf",{get(){return this._dtmf===void 0&&(this.track.kind==="audio"?this._dtmf=this._pc.createDTMFSender(this.track):this._dtmf=null),this._dtmf}})}}function Xl(s,t){if(t.version>=67||!(typeof s=="object"&&s.RTCPeerConnection&&s.RTCRtpSender&&s.RTCRtpReceiver))return;if(!("getStats"in s.RTCRtpSender.prototype)){const n=s.RTCPeerConnection.prototype.getSenders;n&&(s.RTCPeerConnection.prototype.getSenders=function(){const o=n.apply(this,[]);return o.forEach(a=>a._pc=this),o});const i=s.RTCPeerConnection.prototype.addTrack;i&&(s.RTCPeerConnection.prototype.addTrack=function(){const o=i.apply(this,arguments);return o._pc=this,o}),s.RTCRtpSender.prototype.getStats=function(){const o=this;return this._pc.getStats().then(a=>Hc(a,o.track,!0))}}if(!("getStats"in s.RTCRtpReceiver.prototype)){const n=s.RTCPeerConnection.prototype.getReceivers;n&&(s.RTCPeerConnection.prototype.getReceivers=function(){const r=n.apply(this,[]);return r.forEach(o=>o._pc=this),r}),ii(s,"track",i=>(i.receiver._pc=i.srcElement,i)),s.RTCRtpReceiver.prototype.getStats=function(){const r=this;return this._pc.getStats().then(o=>Hc(o,r.track,!1))}}if(!("getStats"in s.RTCRtpSender.prototype&&"getStats"in s.RTCRtpReceiver.prototype))return;const e=s.RTCPeerConnection.prototype.getStats;s.RTCPeerConnection.prototype.getStats=function(){if(arguments.length>0&&arguments[0]instanceof s.MediaStreamTrack){const i=arguments[0];let r,o,a;return this.getSenders().forEach(c=>{c.track===i&&(r?a=!0:r=c)}),this.getReceivers().forEach(c=>(c.track===i&&(o?a=!0:o=c),c.track===i)),a||r&&o?Promise.reject(new DOMException("There are more than one sender or receiver for the track.","InvalidAccessError")):r?r.getStats():o?o.getStats():Promise.reject(new DOMException("There is no sender or receiver for the track.","InvalidAccessError"))}return e.apply(this,arguments)}}function $l(s){s.RTCPeerConnection.prototype.getLocalStreams=function(){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},Object.keys(this._shimmedLocalStreams).map(o=>this._shimmedLocalStreams[o][0])};const t=s.RTCPeerConnection.prototype.addTrack;s.RTCPeerConnection.prototype.addTrack=function(o,a){if(!a)return t.apply(this,arguments);this._shimmedLocalStreams=this._shimmedLocalStreams||{};const c=t.apply(this,arguments);return this._shimmedLocalStreams[a.id]?this._shimmedLocalStreams[a.id].indexOf(c)===-1&&this._shimmedLocalStreams[a.id].push(c):this._shimmedLocalStreams[a.id]=[a,c],c};const e=s.RTCPeerConnection.prototype.addStream;s.RTCPeerConnection.prototype.addStream=function(o){this._shimmedLocalStreams=this._shimmedLocalStreams||{},o.getTracks().forEach(l=>{if(this.getSenders().find(d=>d.track===l))throw new DOMException("Track already exists.","InvalidAccessError")});const a=this.getSenders();e.apply(this,arguments);const c=this.getSenders().filter(l=>a.indexOf(l)===-1);this._shimmedLocalStreams[o.id]=[o].concat(c)};const n=s.RTCPeerConnection.prototype.removeStream;s.RTCPeerConnection.prototype.removeStream=function(o){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},delete this._shimmedLocalStreams[o.id],n.apply(this,arguments)};const i=s.RTCPeerConnection.prototype.removeTrack;s.RTCPeerConnection.prototype.removeTrack=function(o){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},o&&Object.keys(this._shimmedLocalStreams).forEach(a=>{const c=this._shimmedLocalStreams[a].indexOf(o);c!==-1&&this._shimmedLocalStreams[a].splice(c,1),this._shimmedLocalStreams[a].length===1&&delete this._shimmedLocalStreams[a]}),i.apply(this,arguments)}}function ql(s,t){if(!s.RTCPeerConnection)return;if(s.RTCPeerConnection.prototype.addTrack&&t.version>=65)return $l(s);const e=s.RTCPeerConnection.prototype.getLocalStreams;s.RTCPeerConnection.prototype.getLocalStreams=function(){const h=e.apply(this);return this._reverseStreams=this._reverseStreams||{},h.map(d=>this._reverseStreams[d.id])};const n=s.RTCPeerConnection.prototype.addStream;s.RTCPeerConnection.prototype.addStream=function(h){if(this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},h.getTracks().forEach(d=>{if(this.getSenders().find(f=>f.track===d))throw new DOMException("Track already exists.","InvalidAccessError")}),!this._reverseStreams[h.id]){const d=new s.MediaStream(h.getTracks());this._streams[h.id]=d,this._reverseStreams[d.id]=h,h=d}n.apply(this,[h])};const i=s.RTCPeerConnection.prototype.removeStream;s.RTCPeerConnection.prototype.removeStream=function(h){this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},i.apply(this,[this._streams[h.id]||h]),delete this._reverseStreams[this._streams[h.id]?this._streams[h.id].id:h.id],delete this._streams[h.id]},s.RTCPeerConnection.prototype.addTrack=function(h,d){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");const u=[].slice.call(arguments,1);if(u.length!==1||!u[0].getTracks().find(_=>_===h))throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.","NotSupportedError");if(this.getSenders().find(_=>_.track===h))throw new DOMException("Track already exists.","InvalidAccessError");this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{};const g=this._streams[d.id];if(g)g.addTrack(h),Promise.resolve().then(()=>{this.dispatchEvent(new Event("negotiationneeded"))});else{const _=new s.MediaStream([h]);this._streams[d.id]=_,this._reverseStreams[_.id]=d,this.addStream(_)}return this.getSenders().find(_=>_.track===h)};function r(l,h){let d=h.sdp;return Object.keys(l._reverseStreams||[]).forEach(u=>{const f=l._reverseStreams[u],g=l._streams[f.id];d=d.replace(new RegExp(g.id,"g"),f.id)}),new RTCSessionDescription({type:h.type,sdp:d})}function o(l,h){let d=h.sdp;return Object.keys(l._reverseStreams||[]).forEach(u=>{const f=l._reverseStreams[u],g=l._streams[f.id];d=d.replace(new RegExp(f.id,"g"),g.id)}),new RTCSessionDescription({type:h.type,sdp:d})}["createOffer","createAnswer"].forEach(function(l){const h=s.RTCPeerConnection.prototype[l],d={[l](){const u=arguments;return arguments.length&&typeof arguments[0]=="function"?h.apply(this,[g=>{const _=r(this,g);u[0].apply(null,[_])},g=>{u[1]&&u[1].apply(null,g)},arguments[2]]):h.apply(this,arguments).then(g=>r(this,g))}};s.RTCPeerConnection.prototype[l]=d[l]});const a=s.RTCPeerConnection.prototype.setLocalDescription;s.RTCPeerConnection.prototype.setLocalDescription=function(){return!arguments.length||!arguments[0].type?a.apply(this,arguments):(arguments[0]=o(this,arguments[0]),a.apply(this,arguments))};const c=Object.getOwnPropertyDescriptor(s.RTCPeerConnection.prototype,"localDescription");Object.defineProperty(s.RTCPeerConnection.prototype,"localDescription",{get(){const l=c.get.apply(this);return l.type===""?l:r(this,l)}}),s.RTCPeerConnection.prototype.removeTrack=function(h){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");if(!h._pc)throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.","TypeError");if(!(h._pc===this))throw new DOMException("Sender was not created by this connection.","InvalidAccessError");this._streams=this._streams||{};let u;Object.keys(this._streams).forEach(f=>{this._streams[f].getTracks().find(_=>h.track===_)&&(u=this._streams[f])}),u&&(u.getTracks().length===1?this.removeStream(this._reverseStreams[u.id]):u.removeTrack(h.track),this.dispatchEvent(new Event("negotiationneeded")))}}function Ho(s,t){!s.RTCPeerConnection&&s.webkitRTCPeerConnection&&(s.RTCPeerConnection=s.webkitRTCPeerConnection),s.RTCPeerConnection&&t.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(e){const n=s.RTCPeerConnection.prototype[e],i={[e](){return arguments[0]=new(e==="addIceCandidate"?s.RTCIceCandidate:s.RTCSessionDescription)(arguments[0]),n.apply(this,arguments)}};s.RTCPeerConnection.prototype[e]=i[e]})}function Yl(s,t){t.version>102||ii(s,"negotiationneeded",e=>{const n=e.target;if(!((t.version<72||n.getConfiguration&&n.getConfiguration().sdpSemantics==="plan-b")&&n.signalingState!=="stable"))return e})}const Xc=Object.freeze(Object.defineProperty({__proto__:null,fixNegotiationNeeded:Yl,shimAddTrackRemoveTrack:ql,shimAddTrackRemoveTrackWithNative:$l,shimGetSendersWithDtmf:Wl,shimGetUserMedia:Gl,shimMediaStream:Vl,shimOnTrack:Hl,shimPeerConnection:Ho,shimSenderReceiverGetStats:Xl},Symbol.toStringTag,{value:"Module"}));function jl(s,t){const e=s&&s.navigator;if(!e.mediaDevices)return;const n=s&&s.MediaStreamTrack;if(e.getUserMedia=function(i,r,o){va("navigator.getUserMedia","navigator.mediaDevices.getUserMedia"),e.mediaDevices.getUserMedia(i).then(r,o)},!(t.version>55&&"autoGainControl"in e.mediaDevices.getSupportedConstraints())){const i=function(o,a,c){a in o&&!(c in o)&&(o[c]=o[a],delete o[a])},r=e.mediaDevices.getUserMedia.bind(e.mediaDevices);if(e.mediaDevices.getUserMedia=function(o){return typeof o=="object"&&typeof o.audio=="object"&&(o=JSON.parse(JSON.stringify(o)),i(o.audio,"autoGainControl","mozAutoGainControl"),i(o.audio,"noiseSuppression","mozNoiseSuppression")),r(o)},n&&n.prototype.getSettings){const o=n.prototype.getSettings;n.prototype.getSettings=function(){const a=o.apply(this,arguments);return i(a,"mozAutoGainControl","autoGainControl"),i(a,"mozNoiseSuppression","noiseSuppression"),a}}if(n&&n.prototype.applyConstraints){const o=n.prototype.applyConstraints;n.prototype.applyConstraints=function(a){return this.kind==="audio"&&typeof a=="object"&&(a=JSON.parse(JSON.stringify(a)),i(a,"autoGainControl","mozAutoGainControl"),i(a,"noiseSuppression","mozNoiseSuppression")),o.apply(this,[a])}}}}function Ug(s,t){s.navigator.mediaDevices&&(s.navigator.mediaDevices&&"getDisplayMedia"in s.navigator.mediaDevices||(s.navigator.mediaDevices.getDisplayMedia=function(n){if(!(n&&n.video)){const i=new DOMException("getDisplayMedia without video constraints is undefined");return i.name="NotFoundError",i.code=8,Promise.reject(i)}return n.video===!0?n.video={mediaSource:t}:n.video.mediaSource=t,s.navigator.mediaDevices.getUserMedia(n)}))}function Zl(s){typeof s=="object"&&s.RTCTrackEvent&&"receiver"in s.RTCTrackEvent.prototype&&!("transceiver"in s.RTCTrackEvent.prototype)&&Object.defineProperty(s.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function Wo(s,t){typeof s!="object"||!(s.RTCPeerConnection||s.mozRTCPeerConnection)||(!s.RTCPeerConnection&&s.mozRTCPeerConnection&&(s.RTCPeerConnection=s.mozRTCPeerConnection),t.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(e){const n=s.RTCPeerConnection.prototype[e],i={[e](){return arguments[0]=new(e==="addIceCandidate"?s.RTCIceCandidate:s.RTCSessionDescription)(arguments[0]),n.apply(this,arguments)}};s.RTCPeerConnection.prototype[e]=i[e]}))}function Kl(s,t){if(typeof s!="object"||!(s.RTCPeerConnection||s.mozRTCPeerConnection)||t.version>=151)return;const e={inboundrtp:"inbound-rtp",outboundrtp:"outbound-rtp",candidatepair:"candidate-pair",localcandidate:"local-candidate",remotecandidate:"remote-candidate"},n=s.RTCPeerConnection.prototype.getStats;s.RTCPeerConnection.prototype.getStats=function(){const[r,o,a]=arguments;return this.signalingState==="closed"?Promise.resolve(new Map):n.apply(this,[r||null]).then(c=>{if(t.version<53&&!o)try{c.forEach(l=>{l.type=e[l.type]||l.type})}catch(l){if(l.name!=="TypeError")throw l;c.forEach((h,d)=>{c.set(d,Object.assign({},h,{type:e[h.type]||h.type}))})}return c}).then(o,a)}}function Jl(s){if(!(typeof s=="object"&&s.RTCPeerConnection&&s.RTCRtpSender)||s.RTCRtpSender&&"getStats"in s.RTCRtpSender.prototype)return;const t=s.RTCPeerConnection.prototype.getSenders;t&&(s.RTCPeerConnection.prototype.getSenders=function(){const i=t.apply(this,[]);return i.forEach(r=>r._pc=this),i});const e=s.RTCPeerConnection.prototype.addTrack;e&&(s.RTCPeerConnection.prototype.addTrack=function(){const i=e.apply(this,arguments);return i._pc=this,i}),s.RTCRtpSender.prototype.getStats=function(){return this.track?this._pc.getStats(this.track):Promise.resolve(new Map)}}function Ql(s){if(!(typeof s=="object"&&s.RTCPeerConnection&&s.RTCRtpSender)||s.RTCRtpSender&&"getStats"in s.RTCRtpReceiver.prototype)return;const t=s.RTCPeerConnection.prototype.getReceivers;t&&(s.RTCPeerConnection.prototype.getReceivers=function(){const n=t.apply(this,[]);return n.forEach(i=>i._pc=this),n}),ii(s,"track",e=>(e.receiver._pc=e.srcElement,e)),s.RTCRtpReceiver.prototype.getStats=function(){return this._pc.getStats(this.track)}}function th(s){!s.RTCPeerConnection||"removeStream"in s.RTCPeerConnection.prototype||(s.RTCPeerConnection.prototype.removeStream=function(e){va("removeStream","removeTrack"),this.getSenders().forEach(n=>{n.track&&e.getTracks().includes(n.track)&&this.removeTrack(n)})})}function eh(s){s.DataChannel&&!s.RTCDataChannel&&(s.RTCDataChannel=s.DataChannel)}function nh(s,t){if(!(typeof s=="object"&&s.RTCPeerConnection)||t.version>=110)return;const e=s.RTCPeerConnection.prototype.addTransceiver;e&&(s.RTCPeerConnection.prototype.addTransceiver=function(){this.setParametersPromises=[];let i=arguments[1]&&arguments[1].sendEncodings;i===void 0&&(i=[]),i=[...i];const r=i.length>0;r&&i.forEach(a=>{if("rid"in a&&!/^[a-z0-9]{0,16}$/i.test(a.rid))throw new TypeError("Invalid RID value provided.");if("scaleResolutionDownBy"in a&&!(parseFloat(a.scaleResolutionDownBy)>=1))throw new RangeError("scale_resolution_down_by must be >= 1.0");if("maxFramerate"in a&&!(parseFloat(a.maxFramerate)>=0))throw new RangeError("max_framerate must be >= 0.0")});const o=e.apply(this,arguments);if(r){const{sender:a}=o,c=a.getParameters();(!("encodings"in c)||c.encodings.length===1&&Object.keys(c.encodings[0]).length===0)&&(c.encodings=i,a.sendEncodings=i,this.setParametersPromises.push(a.setParameters(c).then(()=>{delete a.sendEncodings}).catch(()=>{delete a.sendEncodings})))}return o})}function ih(s,t){if(!(typeof s=="object"&&s.RTCRtpSender)||t.version>=110)return;const e=s.RTCRtpSender.prototype.getParameters;e&&(s.RTCRtpSender.prototype.getParameters=function(){const i=e.apply(this,arguments);return"encodings"in i||(i.encodings=[].concat(this.sendEncodings||[{}])),i})}function sh(s,t){if(!(typeof s=="object"&&s.RTCPeerConnection)||t.version>=110)return;const e=s.RTCPeerConnection.prototype.createOffer;s.RTCPeerConnection.prototype.createOffer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>e.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):e.apply(this,arguments)}}function rh(s,t){if(!(typeof s=="object"&&s.RTCPeerConnection)||t.version>=110)return;const e=s.RTCPeerConnection.prototype.createAnswer;s.RTCPeerConnection.prototype.createAnswer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>e.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):e.apply(this,arguments)}}const $c=Object.freeze(Object.defineProperty({__proto__:null,shimAddTransceiver:nh,shimCreateAnswer:rh,shimCreateOffer:sh,shimGetDisplayMedia:Ug,shimGetParameters:ih,shimGetStats:Kl,shimGetUserMedia:jl,shimOnTrack:Zl,shimPeerConnection:Wo,shimRTCDataChannel:eh,shimReceiverGetStats:Ql,shimRemoveStream:th,shimSenderGetStats:Jl},Symbol.toStringTag,{value:"Module"}));function oh(s){if(!(typeof s!="object"||!s.RTCPeerConnection)){if("getLocalStreams"in s.RTCPeerConnection.prototype||(s.RTCPeerConnection.prototype.getLocalStreams=function(){return this._localStreams||(this._localStreams=[]),this._localStreams}),!("addStream"in s.RTCPeerConnection.prototype)){const t=s.RTCPeerConnection.prototype.addTrack;s.RTCPeerConnection.prototype.addStream=function(n){this._localStreams||(this._localStreams=[]),this._localStreams.includes(n)||this._localStreams.push(n),n.getAudioTracks().forEach(i=>t.call(this,i,n)),n.getVideoTracks().forEach(i=>t.call(this,i,n))},s.RTCPeerConnection.prototype.addTrack=function(n,...i){return i&&i.forEach(r=>{this._localStreams?this._localStreams.includes(r)||this._localStreams.push(r):this._localStreams=[r]}),t.apply(this,arguments)}}"removeStream"in s.RTCPeerConnection.prototype||(s.RTCPeerConnection.prototype.removeStream=function(e){this._localStreams||(this._localStreams=[]);const n=this._localStreams.indexOf(e);if(n===-1)return;this._localStreams.splice(n,1);const i=e.getTracks();this.getSenders().forEach(r=>{i.includes(r.track)&&this.removeTrack(r)})})}}function ah(s){if(!(typeof s!="object"||!s.RTCPeerConnection)&&("getRemoteStreams"in s.RTCPeerConnection.prototype||(s.RTCPeerConnection.prototype.getRemoteStreams=function(){return this._remoteStreams?this._remoteStreams:[]}),!("onaddstream"in s.RTCPeerConnection.prototype))){Object.defineProperty(s.RTCPeerConnection.prototype,"onaddstream",{get(){return this._onaddstream},set(e){this._onaddstream&&(this.removeEventListener("addstream",this._onaddstream),this.removeEventListener("track",this._onaddstreampoly)),this.addEventListener("addstream",this._onaddstream=e),this.addEventListener("track",this._onaddstreampoly=n=>{n.streams.forEach(i=>{if(this._remoteStreams||(this._remoteStreams=[]),this._remoteStreams.includes(i))return;this._remoteStreams.push(i);const r=new Event("addstream");r.stream=i,this.dispatchEvent(r)})})}});const t=s.RTCPeerConnection.prototype.setRemoteDescription;s.RTCPeerConnection.prototype.setRemoteDescription=function(){const n=this;return this._onaddstreampoly||this.addEventListener("track",this._onaddstreampoly=function(i){i.streams.forEach(r=>{if(n._remoteStreams||(n._remoteStreams=[]),n._remoteStreams.indexOf(r)>=0)return;n._remoteStreams.push(r);const o=new Event("addstream");o.stream=r,n.dispatchEvent(o)})}),t.apply(n,arguments)}}}function ch(s){if(typeof s!="object"||!s.RTCPeerConnection)return;const t=s.RTCPeerConnection.prototype,e=t.createOffer,n=t.createAnswer,i=t.setLocalDescription,r=t.setRemoteDescription,o=t.addIceCandidate;t.createOffer=function(l,h){const d=arguments.length>=2?arguments[2]:arguments[0],u=e.apply(this,[d]);return h?(u.then(l,h),Promise.resolve()):u},t.createAnswer=function(l,h){const d=arguments.length>=2?arguments[2]:arguments[0],u=n.apply(this,[d]);return h?(u.then(l,h),Promise.resolve()):u};let a=function(c,l,h){const d=i.apply(this,[c]);return h?(d.then(l,h),Promise.resolve()):d};t.setLocalDescription=a,a=function(c,l,h){const d=r.apply(this,[c]);return h?(d.then(l,h),Promise.resolve()):d},t.setRemoteDescription=a,a=function(c,l,h){const d=o.apply(this,[c]);return h?(d.then(l,h),Promise.resolve()):d},t.addIceCandidate=a}function lh(s){const t=s&&s.navigator;if(t.mediaDevices&&t.mediaDevices.getUserMedia){const e=t.mediaDevices,n=e.getUserMedia.bind(e);t.mediaDevices.getUserMedia=i=>n(hh(i))}!t.getUserMedia&&t.mediaDevices&&t.mediaDevices.getUserMedia&&(t.getUserMedia=(function(n,i,r){t.mediaDevices.getUserMedia(n).then(i,r)}).bind(t))}function hh(s){return s&&s.video!==void 0?Object.assign({},s,{video:zl(s.video)}):s}function dh(s){if(!s.RTCPeerConnection)return;const t=s.RTCPeerConnection;s.RTCPeerConnection=function(n,i){if(n&&n.iceServers){const r=[];for(let o=0;o<n.iceServers.length;o++){let a=n.iceServers[o];a.urls===void 0&&a.url?(va("RTCIceServer.url","RTCIceServer.urls"),a=JSON.parse(JSON.stringify(a)),a.urls=a.url,delete a.url,r.push(a)):r.push(n.iceServers[o])}n.iceServers=r}return new t(n,i)},s.RTCPeerConnection.prototype=t.prototype,"generateCertificate"in t&&Object.defineProperty(s.RTCPeerConnection,"generateCertificate",{get(){return t.generateCertificate}})}function uh(s){typeof s=="object"&&s.RTCTrackEvent&&"receiver"in s.RTCTrackEvent.prototype&&!("transceiver"in s.RTCTrackEvent.prototype)&&Object.defineProperty(s.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function fh(s){const t=s.RTCPeerConnection.prototype.createOffer;s.RTCPeerConnection.prototype.createOffer=function(n){if(n){typeof n.offerToReceiveAudio<"u"&&(n.offerToReceiveAudio=!!n.offerToReceiveAudio);const i=this.getTransceivers().find(o=>o.receiver.track.kind==="audio");n.offerToReceiveAudio===!1&&i?i.direction==="sendrecv"?i.setDirection?i.setDirection("sendonly"):i.direction="sendonly":i.direction==="recvonly"&&(i.setDirection?i.setDirection("inactive"):i.direction="inactive"):n.offerToReceiveAudio===!0&&!i&&this.addTransceiver("audio",{direction:"recvonly"}),typeof n.offerToReceiveVideo<"u"&&(n.offerToReceiveVideo=!!n.offerToReceiveVideo);const r=this.getTransceivers().find(o=>o.receiver.track.kind==="video");n.offerToReceiveVideo===!1&&r?r.direction==="sendrecv"?r.setDirection?r.setDirection("sendonly"):r.direction="sendonly":r.direction==="recvonly"&&(r.setDirection?r.setDirection("inactive"):r.direction="inactive"):n.offerToReceiveVideo===!0&&!r&&this.addTransceiver("video",{direction:"recvonly"})}return t.apply(this,arguments)}}function ph(s){typeof s!="object"||s.AudioContext||(s.AudioContext=s.webkitAudioContext)}const qc=Object.freeze(Object.defineProperty({__proto__:null,shimAudioContext:ph,shimCallbacksAPI:ch,shimConstraints:hh,shimCreateOfferLegacy:fh,shimGetUserMedia:lh,shimLocalStreamsAPI:oh,shimRTCIceServerUrls:dh,shimRemoteStreamsAPI:ah,shimTrackEventTransceiver:uh},Symbol.toStringTag,{value:"Module"}));function Ng(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var jr={exports:{}},Yc;function kg(){return Yc||(Yc=1,(function(s){const t={};t.generateIdentifier=function(){return Math.random().toString(36).substring(2,12)},t.localCName=t.generateIdentifier(),t.splitLines=function(e){return e.trim().split(`
`).map(n=>n.trim())},t.splitSections=function(e){return e.split(`
m=`).map((i,r)=>(r>0?"m="+i:i).trim()+`\r
`)},t.getDescription=function(e){const n=t.splitSections(e);return n&&n[0]},t.getMediaSections=function(e){const n=t.splitSections(e);return n.shift(),n},t.matchPrefix=function(e,n){return t.splitLines(e).filter(i=>i.indexOf(n)===0)},t.parseCandidate=function(e){let n;e.indexOf("a=candidate:")===0?n=e.substring(12).split(" "):n=e.substring(10).split(" ");const i={foundation:n[0],component:{1:"rtp",2:"rtcp"}[n[1]]||n[1],protocol:n[2].toLowerCase(),priority:parseInt(n[3],10),ip:n[4],address:n[4],port:parseInt(n[5],10),type:n[7]};for(let r=8;r<n.length;r+=2)switch(n[r]){case"raddr":i.relatedAddress=n[r+1];break;case"rport":i.relatedPort=parseInt(n[r+1],10);break;case"tcptype":i.tcpType=n[r+1];break;case"ufrag":i.ufrag=n[r+1],i.usernameFragment=n[r+1];break;default:i[n[r]]===void 0&&(i[n[r]]=n[r+1]);break}return i},t.writeCandidate=function(e){const n=[];n.push(e.foundation);const i=e.component;i==="rtp"?n.push(1):i==="rtcp"?n.push(2):n.push(i),n.push(e.protocol.toUpperCase()),n.push(e.priority),n.push(e.address||e.ip),n.push(e.port);const r=e.type;return n.push("typ"),n.push(r),r!=="host"&&e.relatedAddress&&e.relatedPort!==void 0&&(n.push("raddr"),n.push(e.relatedAddress),n.push("rport"),n.push(e.relatedPort)),e.tcpType&&e.protocol.toLowerCase()==="tcp"&&(n.push("tcptype"),n.push(e.tcpType)),(e.usernameFragment||e.ufrag)&&(n.push("ufrag"),n.push(e.usernameFragment||e.ufrag)),"candidate:"+n.join(" ")},t.parseIceOptions=function(e){return e.substring(14).split(" ")},t.parseRtpMap=function(e){let n=e.substring(9).split(" ");const i={payloadType:parseInt(n.shift(),10)};return n=n[0].split("/"),i.name=n[0],i.clockRate=parseInt(n[1],10),i.channels=n.length===3?parseInt(n[2],10):1,i.numChannels=i.channels,i},t.writeRtpMap=function(e){let n=e.payloadType;e.preferredPayloadType!==void 0&&(n=e.preferredPayloadType);const i=e.channels||e.numChannels||1;return"a=rtpmap:"+n+" "+e.name+"/"+e.clockRate+(i!==1?"/"+i:"")+`\r
`},t.parseExtmap=function(e){const n=e.substring(9).split(" ");return{id:parseInt(n[0],10),direction:n[0].indexOf("/")>0?n[0].split("/")[1]:"sendrecv",uri:n[1],attributes:n.slice(2).join(" ")}},t.writeExtmap=function(e){return"a=extmap:"+(e.id||e.preferredId)+(e.direction&&e.direction!=="sendrecv"?"/"+e.direction:"")+" "+e.uri+(e.attributes?" "+e.attributes:"")+`\r
`},t.parseFmtp=function(e){const n={},i=e.substring(e.indexOf(" ")+1).split(";");for(let r=0;r<i.length;r++){const[o,...a]=i[r].trim().split("=");n[o.trim()]=a.length?a.join("="):void 0}return n},t.writeFmtp=function(e){let n="",i=e.payloadType;if(e.preferredPayloadType!==void 0&&(i=e.preferredPayloadType),e.parameters&&Object.keys(e.parameters).length){const r=[];Object.keys(e.parameters).forEach(o=>{e.parameters[o]!==void 0?r.push(o+"="+e.parameters[o]):r.push(o)}),n+="a=fmtp:"+i+" "+r.join(";")+`\r
`}return n},t.parseRtcpFb=function(e){const n=e.substring(e.indexOf(" ")+1).split(" ");return{type:n.shift(),parameter:n.join(" ")}},t.writeRtcpFb=function(e){let n="",i=e.payloadType;return e.preferredPayloadType!==void 0&&(i=e.preferredPayloadType),e.rtcpFeedback&&e.rtcpFeedback.length&&e.rtcpFeedback.forEach(r=>{n+="a=rtcp-fb:"+i+" "+r.type+(r.parameter&&r.parameter.length?" "+r.parameter:"")+`\r
`}),n},t.parseSsrcMedia=function(e){const n=e.indexOf(" "),i={ssrc:parseInt(e.substring(7,n),10)},r=e.indexOf(":",n);return r>-1?(i.attribute=e.substring(n+1,r),i.value=e.substring(r+1)):i.attribute=e.substring(n+1),i},t.parseSsrcGroup=function(e){const n=e.substring(13).split(" ");return{semantics:n.shift(),ssrcs:n.map(i=>parseInt(i,10))}},t.getMid=function(e){const n=t.matchPrefix(e,"a=mid:")[0];if(n)return n.substring(6)},t.parseFingerprint=function(e){const n=e.substring(14).split(" ");return{algorithm:n[0].toLowerCase(),value:n[1].toUpperCase()}},t.getDtlsParameters=function(e,n){return{role:"auto",fingerprints:t.matchPrefix(e+n,"a=fingerprint:").map(t.parseFingerprint)}},t.writeDtlsParameters=function(e,n){let i="a=setup:"+n+`\r
`;return e.fingerprints.forEach(r=>{i+="a=fingerprint:"+r.algorithm+" "+r.value+`\r
`}),i},t.parseCryptoLine=function(e){const n=e.substring(9).split(" ");return{tag:parseInt(n[0],10),cryptoSuite:n[1],keyParams:n[2],sessionParams:n.slice(3)}},t.writeCryptoLine=function(e){return"a=crypto:"+e.tag+" "+e.cryptoSuite+" "+(typeof e.keyParams=="object"?t.writeCryptoKeyParams(e.keyParams):e.keyParams)+(e.sessionParams?" "+e.sessionParams.join(" "):"")+`\r
`},t.parseCryptoKeyParams=function(e){if(e.indexOf("inline:")!==0)return null;const n=e.substring(7).split("|");return{keyMethod:"inline",keySalt:n[0],lifeTime:n[1],mkiValue:n[2]?n[2].split(":")[0]:void 0,mkiLength:n[2]?n[2].split(":")[1]:void 0}},t.writeCryptoKeyParams=function(e){return e.keyMethod+":"+e.keySalt+(e.lifeTime?"|"+e.lifeTime:"")+(e.mkiValue&&e.mkiLength?"|"+e.mkiValue+":"+e.mkiLength:"")},t.getCryptoParameters=function(e,n){return t.matchPrefix(e+n,"a=crypto:").map(t.parseCryptoLine)},t.getIceParameters=function(e,n){const i=t.matchPrefix(e+n,"a=ice-ufrag:")[0],r=t.matchPrefix(e+n,"a=ice-pwd:")[0];return i&&r?{usernameFragment:i.substring(12),password:r.substring(10)}:null},t.writeIceParameters=function(e){let n="a=ice-ufrag:"+e.usernameFragment+`\r
a=ice-pwd:`+e.password+`\r
`;return e.iceLite&&(n+=`a=ice-lite\r
`),n},t.parseRtpParameters=function(e){const n={codecs:[],headerExtensions:[],fecMechanisms:[],rtcp:[]},r=t.splitLines(e)[0].split(" ");n.profile=r[2];for(let a=3;a<r.length;a++){const c=r[a],l=t.matchPrefix(e,"a=rtpmap:"+c+" ")[0];if(l){const h=t.parseRtpMap(l),d=t.matchPrefix(e,"a=fmtp:"+c+" ");switch(h.parameters=d.length?t.parseFmtp(d[0]):{},h.rtcpFeedback=t.matchPrefix(e,"a=rtcp-fb:"+c+" ").map(t.parseRtcpFb),n.codecs.push(h),h.name.toUpperCase()){case"RED":case"ULPFEC":n.fecMechanisms.push(h.name.toUpperCase());break}}}t.matchPrefix(e,"a=extmap:").forEach(a=>{n.headerExtensions.push(t.parseExtmap(a))});const o=t.matchPrefix(e,"a=rtcp-fb:* ").map(t.parseRtcpFb);return n.codecs.forEach(a=>{o.forEach(c=>{a.rtcpFeedback.find(h=>h.type===c.type&&h.parameter===c.parameter)||a.rtcpFeedback.push(c)})}),n},t.writeRtpDescription=function(e,n){let i="";i+="m="+e+" ",i+=n.codecs.length>0?"9":"0",i+=" "+(n.profile||"UDP/TLS/RTP/SAVPF")+" ",i+=n.codecs.map(o=>o.preferredPayloadType!==void 0?o.preferredPayloadType:o.payloadType).join(" ")+`\r
`,i+=`c=IN IP4 0.0.0.0\r
`,i+=`a=rtcp:9 IN IP4 0.0.0.0\r
`,n.codecs.forEach(o=>{i+=t.writeRtpMap(o),i+=t.writeFmtp(o),i+=t.writeRtcpFb(o)});let r=0;return n.codecs.forEach(o=>{o.maxptime>r&&(r=o.maxptime)}),r>0&&(i+="a=maxptime:"+r+`\r
`),n.headerExtensions&&n.headerExtensions.forEach(o=>{i+=t.writeExtmap(o)}),i},t.parseRtpEncodingParameters=function(e){const n=[],i=t.parseRtpParameters(e),r=i.fecMechanisms.indexOf("RED")!==-1,o=i.fecMechanisms.indexOf("ULPFEC")!==-1,a=t.matchPrefix(e,"a=ssrc:").map(u=>t.parseSsrcMedia(u)).filter(u=>u.attribute==="cname"),c=a.length>0&&a[0].ssrc;let l;const h=t.matchPrefix(e,"a=ssrc-group:FID").map(u=>u.substring(17).split(" ").map(g=>parseInt(g,10)));h.length>0&&h[0].length>1&&h[0][0]===c&&(l=h[0][1]),i.codecs.forEach(u=>{if(u.name.toUpperCase()==="RTX"&&u.parameters.apt){let f={ssrc:c,codecPayloadType:parseInt(u.parameters.apt,10)};c&&l&&(f.rtx={ssrc:l}),n.push(f),r&&(f=JSON.parse(JSON.stringify(f)),f.fec={ssrc:c,mechanism:o?"red+ulpfec":"red"},n.push(f))}}),n.length===0&&c&&n.push({ssrc:c});let d=t.matchPrefix(e,"b=");return d.length&&(d[0].indexOf("b=TIAS:")===0?d=parseInt(d[0].substring(7),10):d[0].indexOf("b=AS:")===0?d=parseInt(d[0].substring(5),10)*1e3*.95-2e3*8:d=void 0,n.forEach(u=>{u.maxBitrate=d})),n},t.parseRtcpParameters=function(e){const n={},i=t.matchPrefix(e,"a=ssrc:").map(a=>t.parseSsrcMedia(a)).filter(a=>a.attribute==="cname")[0];i&&(n.cname=i.value,n.ssrc=i.ssrc);const r=t.matchPrefix(e,"a=rtcp-rsize");n.reducedSize=r.length>0,n.compound=r.length===0;const o=t.matchPrefix(e,"a=rtcp-mux");return n.mux=o.length>0,n},t.writeRtcpParameters=function(e){let n="";return e.reducedSize&&(n+=`a=rtcp-rsize\r
`),e.mux&&(n+=`a=rtcp-mux\r
`),e.ssrc!==void 0&&e.cname&&(n+="a=ssrc:"+e.ssrc+" cname:"+e.cname+`\r
`),n},t.parseMsid=function(e){let n;const i=t.matchPrefix(e,"a=msid:");if(i.length===1)return n=i[0].substring(7).split(" "),{stream:n[0],track:n[1]};const r=t.matchPrefix(e,"a=ssrc:").map(o=>t.parseSsrcMedia(o)).filter(o=>o.attribute==="msid");if(r.length>0)return n=r[0].value.split(" "),{stream:n[0],track:n[1]}},t.parseSctpDescription=function(e){const n=t.parseMLine(e),i=t.matchPrefix(e,"a=max-message-size:");let r;i.length>0&&(r=parseInt(i[0].substring(19),10)),isNaN(r)&&(r=65536);const o=t.matchPrefix(e,"a=sctp-port:");if(o.length>0)return{port:parseInt(o[0].substring(12),10),protocol:n.fmt,maxMessageSize:r};const a=t.matchPrefix(e,"a=sctpmap:");if(a.length>0){const c=a[0].substring(10).split(" ");return{port:parseInt(c[0],10),protocol:c[1],maxMessageSize:r}}},t.writeSctpDescription=function(e,n){let i=[];return e.protocol!=="DTLS/SCTP"?i=["m="+e.kind+" 9 "+e.protocol+" "+n.protocol+`\r
`,`c=IN IP4 0.0.0.0\r
`,"a=sctp-port:"+n.port+`\r
`]:i=["m="+e.kind+" 9 "+e.protocol+" "+n.port+`\r
`,`c=IN IP4 0.0.0.0\r
`,"a=sctpmap:"+n.port+" "+n.protocol+` 65535\r
`],n.maxMessageSize!==void 0&&i.push("a=max-message-size:"+n.maxMessageSize+`\r
`),i.join("")},t.generateSessionId=function(){return Math.random().toString().substr(2,22)},t.writeSessionBoilerplate=function(e,n,i){let r;const o=n!==void 0?n:2;return e?r=e:r=t.generateSessionId(),`v=0\r
o=`+(i||"thisisadapterortc")+" "+r+" "+o+` IN IP4 127.0.0.1\r
s=-\r
t=0 0\r
`},t.getDirection=function(e,n){const i=t.splitLines(e);for(let r=0;r<i.length;r++)switch(i[r]){case"a=sendrecv":case"a=sendonly":case"a=recvonly":case"a=inactive":return i[r].substring(2)}return n?t.getDirection(n):"sendrecv"},t.getKind=function(e){return t.splitLines(e)[0].split(" ")[0].substring(2)},t.isRejected=function(e){return e.split(" ",2)[1]==="0"},t.parseMLine=function(e){const i=t.splitLines(e)[0].substring(2).split(" ");return{kind:i[0],port:parseInt(i[1],10),protocol:i[2],fmt:i.slice(3).join(" ")}},t.parseOLine=function(e){const i=t.matchPrefix(e,"o=")[0].substring(2).split(" ");return{username:i[0],sessionId:i[1],sessionVersion:parseInt(i[2],10),netType:i[3],addressType:i[4],address:i[5]}},t.isValidSDP=function(e){if(typeof e!="string"||e.length===0)return!1;const n=t.splitLines(e);for(let i=0;i<n.length;i++)if(n[i].length<2||n[i].charAt(1)!=="=")return!1;return!0},s.exports=t})(jr)),jr.exports}var mh=kg();const Ri=Ng(mh),Fg=Ch({__proto__:null,default:Ri},[mh]);function js(s){if(!s.RTCIceCandidate||s.RTCIceCandidate&&"foundation"in s.RTCIceCandidate.prototype)return;const t=s.RTCIceCandidate;s.RTCIceCandidate=function(n){if(typeof n=="object"&&n.candidate&&n.candidate.indexOf("a=")===0&&(n=JSON.parse(JSON.stringify(n)),n.candidate=n.candidate.substring(2)),n.candidate&&n.candidate.length){const i=new t(n),r=Ri.parseCandidate(n.candidate);for(const o in r)o in i||Object.defineProperty(i,o,{value:r[o]});return i.toJSON=function(){return{candidate:i.candidate,sdpMid:i.sdpMid,sdpMLineIndex:i.sdpMLineIndex,usernameFragment:i.usernameFragment}},i}return new t(n)},s.RTCIceCandidate.prototype=t.prototype,ii(s,"icecandidate",e=>(e.candidate&&Object.defineProperty(e,"candidate",{value:new s.RTCIceCandidate(e.candidate),writable:"false"}),e))}function Xo(s){!s.RTCIceCandidate||s.RTCIceCandidate&&"relayProtocol"in s.RTCIceCandidate.prototype||ii(s,"icecandidate",t=>{if(t.candidate){const e=Ri.parseCandidate(t.candidate.candidate);e.type==="relay"&&(t.candidate.relayProtocol={0:"tls",1:"tcp",2:"udp"}[e.priority>>24])}return t})}function Zs(s,t){if(!s.RTCPeerConnection||t.browser==="chrome"&&t.version>102||t.browser==="firefox"&&t.version>=113)return;"sctp"in s.RTCPeerConnection.prototype||Object.defineProperty(s.RTCPeerConnection.prototype,"sctp",{get(){return typeof this._sctp>"u"?null:this._sctp}});const e=function(a){if(!a||!a.sdp)return!1;const c=Ri.splitSections(a.sdp);return c.shift(),c.some(l=>{const h=Ri.parseMLine(l);return h&&h.kind==="application"&&h.protocol.indexOf("SCTP")!==-1})},n=function(a){const c=a.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);if(c===null||c.length<2)return-1;const l=parseInt(c[1],10);return l!==l?-1:l},i=function(a){let c=65536;return t.browser==="firefox"&&(t.version<57?a===-1?c=16384:c=2147483637:t.version<60?c=t.version===57?65535:65536:c=2147483637),c},r=function(a,c){let l=65536;t.browser==="firefox"&&t.version===57&&(l=65535);const h=Ri.matchPrefix(a.sdp,"a=max-message-size:");return h.length>0?l=parseInt(h[0].substring(19),10):t.browser==="firefox"&&c!==-1&&(l=2147483637),l},o=s.RTCPeerConnection.prototype.setRemoteDescription;s.RTCPeerConnection.prototype.setRemoteDescription=function(){if(this._sctp=null,t.browser==="chrome"&&t.version>=76){const{sdpSemantics:c}=this.getConfiguration();c==="plan-b"&&Object.defineProperty(this,"sctp",{get(){return typeof this._sctp>"u"?null:this._sctp},enumerable:!0,configurable:!0})}if(e(arguments[0])){const c=n(arguments[0]),l=i(c),h=r(arguments[0],c);let d;l===0&&h===0?d=Number.POSITIVE_INFINITY:l===0||h===0?d=Math.max(l,h):d=Math.min(l,h);const u={};Object.defineProperty(u,"maxMessageSize",{get(){return d}}),this._sctp=u}return o.apply(this,arguments)}}function Ks(s,t){if(!(s.RTCPeerConnection&&"createDataChannel"in s.RTCPeerConnection.prototype)||t.browser==="chrome"&&t.version>=149||t.browser==="firefox"&&t.version>60)return;function e(i,r){const o=i.send;i.send=function(){const c=arguments[0],l=c.length||c.size||c.byteLength;if(i.readyState==="open"&&r.sctp&&l>r.sctp.maxMessageSize)throw new TypeError("Message too large (can send a maximum of "+r.sctp.maxMessageSize+" bytes)");return o.apply(i,arguments)}}const n=s.RTCPeerConnection.prototype.createDataChannel;s.RTCPeerConnection.prototype.createDataChannel=function(){const r=n.apply(this,arguments);return e(r,this),r},ii(s,"datachannel",i=>(e(i.channel,i.target),i))}function $o(s){if(!s.RTCPeerConnection||"connectionState"in s.RTCPeerConnection.prototype)return;const t=s.RTCPeerConnection.prototype;Object.defineProperty(t,"connectionState",{get(){return{completed:"connected",checking:"connecting"}[this.iceConnectionState]||this.iceConnectionState},enumerable:!0,configurable:!0}),Object.defineProperty(t,"onconnectionstatechange",{get(){return this._onconnectionstatechange||null},set(e){this._onconnectionstatechange&&(this.removeEventListener("connectionstatechange",this._onconnectionstatechange),delete this._onconnectionstatechange),e&&this.addEventListener("connectionstatechange",this._onconnectionstatechange=e)},enumerable:!0,configurable:!0}),["setLocalDescription","setRemoteDescription"].forEach(e=>{const n=t[e];t[e]=function(){return this._connectionstatechangepoly||(this._connectionstatechangepoly=i=>{const r=i.target;if(r._lastConnectionState!==r.connectionState){r._lastConnectionState=r.connectionState;const o=new Event("connectionstatechange",i);r.dispatchEvent(o)}return i},this.addEventListener("iceconnectionstatechange",this._connectionstatechangepoly)),n.apply(this,arguments)}})}function qo(s,t){if(!s.RTCPeerConnection||t.browser==="chrome"&&t.version>=71||t.browser==="safari"&&t._safariVersion>=13.1)return;const e=s.RTCPeerConnection.prototype.setRemoteDescription;s.RTCPeerConnection.prototype.setRemoteDescription=function(i){if(i&&i.sdp&&i.sdp.indexOf(`
a=extmap-allow-mixed`)!==-1){const r=i.sdp.split(`
`).filter(o=>o.trim()!=="a=extmap-allow-mixed").join(`
`);s.RTCSessionDescription&&i instanceof s.RTCSessionDescription?arguments[0]=new s.RTCSessionDescription({type:i.type,sdp:r}):i.sdp=r}return e.apply(this,arguments)}}function Js(s,t){if(!(s.RTCPeerConnection&&s.RTCPeerConnection.prototype))return;const e=s.RTCPeerConnection.prototype.addIceCandidate;!e||e.length===0||(s.RTCPeerConnection.prototype.addIceCandidate=function(){return arguments[0]?(t.browser==="chrome"&&t.version<78||t.browser==="firefox"&&t.version<68||t.browser==="safari")&&arguments[0]&&arguments[0].candidate===""?Promise.resolve():e.apply(this,arguments):(arguments[1]&&arguments[1].apply(null),Promise.resolve())})}function Qs(s,t){if(!(s.RTCPeerConnection&&s.RTCPeerConnection.prototype))return;const e=s.RTCPeerConnection.prototype.setLocalDescription;!e||e.length===0||(s.RTCPeerConnection.prototype.setLocalDescription=function(){let i=arguments[0]||{};if(typeof i!="object"||i.type&&i.sdp)return e.apply(this,arguments);if(i={type:i.type,sdp:i.sdp},!i.type)switch(this.signalingState){case"stable":case"have-local-offer":case"have-remote-pranswer":i.type="offer";break;default:i.type="answer";break}return i.sdp||i.type!=="offer"&&i.type!=="answer"?e.apply(this,[i]):(i.type==="offer"?this.createOffer:this.createAnswer).apply(this).then(o=>e.apply(this,[o]))})}const Og=Object.freeze(Object.defineProperty({__proto__:null,removeExtmapAllowMixed:qo,shimAddIceCandidateNullOrEmpty:Js,shimConnectionState:$o,shimMaxMessageSize:Zs,shimParameterlessSetLocalDescription:Qs,shimRTCIceCandidate:js,shimRTCIceCandidateRelayProtocol:Xo,shimSendThrowTypeError:Ks},Symbol.toStringTag,{value:"Module"}));function Bg({window:s}={},t={shimChrome:!0,shimFirefox:!0,shimSafari:!0}){const e=_a,n=Dg(s),i={browserDetails:n,commonShim:Og,extractVersion:is,disableLog:Ig,disableWarnings:Lg,sdp:Fg};switch(n.browser){case"chrome":if(!Xc||!Ho||!t.shimChrome)return e("Chrome shim is not included in this adapter release."),i;if(n.version===null)return e("Chrome shim can not determine version, not shimming."),i;e("adapter.js shimming chrome."),i.browserShim=Xc,Js(s,n),Qs(s),Gl(s,n),Vl(s),Ho(s,n),Hl(s,n),ql(s,n),Wl(s),Xl(s,n),Yl(s,n),js(s),Xo(s),$o(s),Zs(s,n),Ks(s,n),qo(s,n);break;case"firefox":if(!$c||!Wo||!t.shimFirefox)return e("Firefox shim is not included in this adapter release."),i;e("adapter.js shimming firefox."),i.browserShim=$c,Js(s,n),Qs(s),jl(s,n),Wo(s,n),Kl(s,n),Zl(s),th(s),Jl(s),Ql(s),eh(s),nh(s,n),ih(s,n),sh(s,n),rh(s,n),js(s),$o(s),Zs(s,n),Ks(s,n);break;case"safari":if(!qc||!t.shimSafari)return e("Safari shim is not included in this adapter release."),i;e("adapter.js shimming safari."),i.browserShim=qc,Js(s,n),Qs(s),dh(s),fh(s),ch(s),oh(s),ah(s),uh(s),lh(s),ph(s),js(s),Xo(s),Zs(s,n),Ks(s,n),qo(s,n);break;default:e("Unsupported browser!");break}return i}const jc=Bg({window:typeof window>"u"?void 0:window});function si(s,t,e,n){Object.defineProperty(s,t,{get:e,set:n,enumerable:!0,configurable:!0})}class gh{constructor(){this.chunkedMTU=16300,this._dataCount=1,this.chunk=t=>{const e=[],n=t.byteLength,i=Math.ceil(n/this.chunkedMTU);let r=0,o=0;for(;o<n;){const a=Math.min(n,o+this.chunkedMTU),c=t.slice(o,a),l={__peerData:this._dataCount,n:r,data:c,total:i};e.push(l),o=a,r++}return this._dataCount++,e}}}function zg(s){let t=0;for(const i of s)t+=i.byteLength;const e=new Uint8Array(t);let n=0;for(const i of s)e.set(i,n),n+=i.byteLength;return e}const Zr=jc.default||jc,ts=new class{isWebRTCSupported(){return typeof RTCPeerConnection<"u"}isBrowserSupported(){const s=this.getBrowser(),t=this.getVersion();return this.supportedBrowsers.includes(s)?s==="chrome"?t>=this.minChromeVersion:s==="firefox"?t>=this.minFirefoxVersion:s==="safari"?!this.isIOS&&t>=this.minSafariVersion:!1:!1}getBrowser(){return Zr.browserDetails.browser}getVersion(){return Zr.browserDetails.version||0}isUnifiedPlanSupported(){const s=this.getBrowser(),t=Zr.browserDetails.version||0;if(s==="chrome"&&t<this.minChromeVersion)return!1;if(s==="firefox"&&t>=this.minFirefoxVersion)return!0;if(!window.RTCRtpTransceiver||!("currentDirection"in RTCRtpTransceiver.prototype))return!1;let e,n=!1;try{e=new RTCPeerConnection,e.addTransceiver("audio"),n=!0}catch{}finally{e&&e.close()}return n}toString(){return`Supports:
    browser:${this.getBrowser()}
    version:${this.getVersion()}
    isIOS:${this.isIOS}
    isWebRTCSupported:${this.isWebRTCSupported()}
    isBrowserSupported:${this.isBrowserSupported()}
    isUnifiedPlanSupported:${this.isUnifiedPlanSupported()}`}constructor(){this.isIOS=typeof navigator<"u"?["iPad","iPhone","iPod"].includes(navigator.platform):!1,this.supportedBrowsers=["firefox","chrome","safari"],this.minFirefoxVersion=59,this.minChromeVersion=72,this.minSafariVersion=605}},Gg=s=>!s||/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(s),_h=()=>Math.random().toString(36).slice(2),Zc={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:["turn:eu-0.turn.peerjs.com:3478","turn:us-0.turn.peerjs.com:3478"],username:"peerjs",credential:"peerjsp"}],sdpSemantics:"unified-plan"};class Vg extends gh{noop(){}blobToArrayBuffer(t,e){const n=new FileReader;return n.onload=function(i){i.target&&e(i.target.result)},n.readAsArrayBuffer(t),n}binaryStringToArrayBuffer(t){const e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n)&255;return e.buffer}isSecure(){return location.protocol==="https:"}constructor(...t){super(...t),this.CLOUD_HOST="0.peerjs.com",this.CLOUD_PORT=443,this.chunkedBrowsers={Chrome:1,chrome:1},this.defaultConfig=Zc,this.browser=ts.getBrowser(),this.browserVersion=ts.getVersion(),this.pack=Fl,this.unpack=kl,this.supports=(function(){const e={browser:ts.isBrowserSupported(),webRTC:ts.isWebRTCSupported(),audioVideo:!1,data:!1,binaryBlob:!1,reliable:!1};if(!e.webRTC)return e;let n;try{n=new RTCPeerConnection(Zc),e.audioVideo=!0;let i;try{i=n.createDataChannel("_PEERJSTEST",{ordered:!0}),e.data=!0,e.reliable=!!i.ordered;try{i.binaryType="blob",e.binaryBlob=!ts.isIOS}catch{}}catch{}finally{i&&i.close()}}catch{}finally{n&&n.close()}return e})(),this.validateId=Gg,this.randomToken=_h}}const Fe=new Vg,Hg="PeerJS: ";class Wg{get logLevel(){return this._logLevel}set logLevel(t){this._logLevel=t}log(...t){this._logLevel>=3&&this._print(3,...t)}warn(...t){this._logLevel>=2&&this._print(2,...t)}error(...t){this._logLevel>=1&&this._print(1,...t)}setLogFunction(t){this._print=t}_print(t,...e){const n=[Hg,...e];for(const i in n)n[i]instanceof Error&&(n[i]="("+n[i].name+") "+n[i].message);t>=3?console.log(...n):t>=2?console.warn("WARNING",...n):t>=1&&console.error("ERROR",...n)}constructor(){this._logLevel=0}}var At=new Wg,xa={},Xg=Object.prototype.hasOwnProperty,Ne="~";function fs(){}Object.create&&(fs.prototype=Object.create(null),new fs().__proto__||(Ne=!1));function $g(s,t,e){this.fn=s,this.context=t,this.once=e||!1}function vh(s,t,e,n,i){if(typeof e!="function")throw new TypeError("The listener must be a function");var r=new $g(e,n||s,i),o=Ne?Ne+t:t;return s._events[o]?s._events[o].fn?s._events[o]=[s._events[o],r]:s._events[o].push(r):(s._events[o]=r,s._eventsCount++),s}function tr(s,t){--s._eventsCount===0?s._events=new fs:delete s._events[t]}function Ie(){this._events=new fs,this._eventsCount=0}Ie.prototype.eventNames=function(){var t=[],e,n;if(this._eventsCount===0)return t;for(n in e=this._events)Xg.call(e,n)&&t.push(Ne?n.slice(1):n);return Object.getOwnPropertySymbols?t.concat(Object.getOwnPropertySymbols(e)):t};Ie.prototype.listeners=function(t){var e=Ne?Ne+t:t,n=this._events[e];if(!n)return[];if(n.fn)return[n.fn];for(var i=0,r=n.length,o=new Array(r);i<r;i++)o[i]=n[i].fn;return o};Ie.prototype.listenerCount=function(t){var e=Ne?Ne+t:t,n=this._events[e];return n?n.fn?1:n.length:0};Ie.prototype.emit=function(t,e,n,i,r,o){var a=Ne?Ne+t:t;if(!this._events[a])return!1;var c=this._events[a],l=arguments.length,h,d;if(c.fn){switch(c.once&&this.removeListener(t,c.fn,void 0,!0),l){case 1:return c.fn.call(c.context),!0;case 2:return c.fn.call(c.context,e),!0;case 3:return c.fn.call(c.context,e,n),!0;case 4:return c.fn.call(c.context,e,n,i),!0;case 5:return c.fn.call(c.context,e,n,i,r),!0;case 6:return c.fn.call(c.context,e,n,i,r,o),!0}for(d=1,h=new Array(l-1);d<l;d++)h[d-1]=arguments[d];c.fn.apply(c.context,h)}else{var u=c.length,f;for(d=0;d<u;d++)switch(c[d].once&&this.removeListener(t,c[d].fn,void 0,!0),l){case 1:c[d].fn.call(c[d].context);break;case 2:c[d].fn.call(c[d].context,e);break;case 3:c[d].fn.call(c[d].context,e,n);break;case 4:c[d].fn.call(c[d].context,e,n,i);break;default:if(!h)for(f=1,h=new Array(l-1);f<l;f++)h[f-1]=arguments[f];c[d].fn.apply(c[d].context,h)}}return!0};Ie.prototype.on=function(t,e,n){return vh(this,t,e,n,!1)};Ie.prototype.once=function(t,e,n){return vh(this,t,e,n,!0)};Ie.prototype.removeListener=function(t,e,n,i){var r=Ne?Ne+t:t;if(!this._events[r])return this;if(!e)return tr(this,r),this;var o=this._events[r];if(o.fn)o.fn===e&&(!i||o.once)&&(!n||o.context===n)&&tr(this,r);else{for(var a=0,c=[],l=o.length;a<l;a++)(o[a].fn!==e||i&&!o[a].once||n&&o[a].context!==n)&&c.push(o[a]);c.length?this._events[r]=c.length===1?c[0]:c:tr(this,r)}return this};Ie.prototype.removeAllListeners=function(t){var e;return t?(e=Ne?Ne+t:t,this._events[e]&&tr(this,e)):(this._events=new fs,this._eventsCount=0),this};Ie.prototype.off=Ie.prototype.removeListener;Ie.prototype.addListener=Ie.prototype.on;Ie.prefixed=Ne;Ie.EventEmitter=Ie;xa=Ie;var ri={};si(ri,"ConnectionType",()=>Fn);si(ri,"PeerErrorType",()=>ve);si(ri,"BaseConnectionErrorType",()=>Yo);si(ri,"DataConnectionErrorType",()=>ya);si(ri,"SerializationType",()=>dr);si(ri,"SocketEventType",()=>Dn);si(ri,"ServerMessageType",()=>Pe);var Fn=(function(s){return s.Data="data",s.Media="media",s})({}),ve=(function(s){return s.BrowserIncompatible="browser-incompatible",s.Disconnected="disconnected",s.InvalidID="invalid-id",s.InvalidKey="invalid-key",s.Network="network",s.PeerUnavailable="peer-unavailable",s.SslUnavailable="ssl-unavailable",s.ServerError="server-error",s.SocketError="socket-error",s.SocketClosed="socket-closed",s.UnavailableID="unavailable-id",s.WebRTC="webrtc",s})({}),Yo=(function(s){return s.NegotiationFailed="negotiation-failed",s.ConnectionClosed="connection-closed",s})({}),ya=(function(s){return s.NotOpenYet="not-open-yet",s.MessageToBig="message-too-big",s})({}),dr=(function(s){return s.Binary="binary",s.BinaryUTF8="binary-utf8",s.JSON="json",s.None="raw",s})({}),Dn=(function(s){return s.Message="message",s.Disconnected="disconnected",s.Error="error",s.Close="close",s})({}),Pe=(function(s){return s.Heartbeat="HEARTBEAT",s.Candidate="CANDIDATE",s.Offer="OFFER",s.Answer="ANSWER",s.Open="OPEN",s.Error="ERROR",s.IdTaken="ID-TAKEN",s.InvalidKey="INVALID-KEY",s.Leave="LEAVE",s.Expire="EXPIRE",s})({});const xh="1.5.5";class qg extends xa.EventEmitter{constructor(t,e,n,i,r,o=5e3){super(),this.pingInterval=o,this._disconnected=!0,this._messagesQueue=[];const a=t?"wss://":"ws://";this._baseUrl=a+e+":"+n+i+"peerjs?key="+r}start(t,e){this._id=t;const n=`${this._baseUrl}&id=${t}&token=${e}`;this._socket||!this._disconnected||(this._socket=new WebSocket(n+"&version="+xh),this._disconnected=!1,this._socket.onmessage=i=>{let r;try{r=JSON.parse(i.data),At.log("Server message received:",r)}catch{At.log("Invalid server message",i.data);return}this.emit(Dn.Message,r)},this._socket.onclose=i=>{this._disconnected||(At.log("Socket closed.",i),this._cleanup(),this._disconnected=!0,this.emit(Dn.Disconnected))},this._socket.onopen=()=>{this._disconnected||(this._sendQueuedMessages(),At.log("Socket open"),this._scheduleHeartbeat())})}_scheduleHeartbeat(){this._wsPingTimer=setTimeout(()=>{this._sendHeartbeat()},this.pingInterval)}_sendHeartbeat(){if(!this._wsOpen()){At.log("Cannot send heartbeat, because socket closed");return}const t=JSON.stringify({type:Pe.Heartbeat});this._socket.send(t),this._scheduleHeartbeat()}_wsOpen(){return!!this._socket&&this._socket.readyState===1}_sendQueuedMessages(){const t=[...this._messagesQueue];this._messagesQueue=[];for(const e of t)this.send(e)}send(t){if(this._disconnected)return;if(!this._id){this._messagesQueue.push(t);return}if(!t.type){this.emit(Dn.Error,"Invalid message");return}if(!this._wsOpen())return;const e=JSON.stringify(t);this._socket.send(e)}close(){this._disconnected||(this._cleanup(),this._disconnected=!0)}_cleanup(){this._socket&&(this._socket.onopen=this._socket.onmessage=this._socket.onclose=null,this._socket.close(),this._socket=void 0),clearTimeout(this._wsPingTimer)}}class yh{constructor(t){this.connection=t}startConnection(t){const e=this._startPeerConnection();if(this.connection.peerConnection=e,this.connection.type===Fn.Media&&t._stream&&this._addTracksToConnection(t._stream,e),t.originator){const n=this.connection,i={ordered:!!t.reliable},r=e.createDataChannel(n.label,i);n._initializeDataChannel(r),this._makeOffer()}else this.handleSDP("OFFER",t.sdp)}_startPeerConnection(){At.log("Creating RTCPeerConnection.");const t=new RTCPeerConnection(this.connection.provider.options.config);return this._setupListeners(t),t}_setupListeners(t){const e=this.connection.peer,n=this.connection.connectionId,i=this.connection.type,r=this.connection.provider;At.log("Listening for ICE candidates."),t.onicecandidate=o=>{!o.candidate||!o.candidate.candidate||(At.log(`Received ICE candidates for ${e}:`,o.candidate),r.socket.send({type:Pe.Candidate,payload:{candidate:o.candidate,type:i,connectionId:n},dst:e}))},t.oniceconnectionstatechange=()=>{switch(t.iceConnectionState){case"failed":At.log("iceConnectionState is failed, closing connections to "+e),this.connection.emitError(Yo.NegotiationFailed,"Negotiation of connection to "+e+" failed."),this.connection.close();break;case"closed":At.log("iceConnectionState is closed, closing connections to "+e),this.connection.emitError(Yo.ConnectionClosed,"Connection to "+e+" closed."),this.connection.close();break;case"disconnected":At.log("iceConnectionState changed to disconnected on the connection with "+e);break;case"completed":t.onicecandidate=()=>{};break}this.connection.emit("iceStateChanged",t.iceConnectionState)},At.log("Listening for data channel"),t.ondatachannel=o=>{At.log("Received data channel");const a=o.channel;r.getConnection(e,n)._initializeDataChannel(a)},At.log("Listening for remote stream"),t.ontrack=o=>{At.log("Received remote stream");const a=o.streams[0],c=r.getConnection(e,n);if(c.type===Fn.Media){const l=c;this._addStreamToMediaConnection(a,l)}}}cleanup(){At.log("Cleaning up PeerConnection to "+this.connection.peer);const t=this.connection.peerConnection;if(!t)return;this.connection.peerConnection=null,t.onicecandidate=t.oniceconnectionstatechange=t.ondatachannel=t.ontrack=()=>{};const e=t.signalingState!=="closed";let n=!1;const i=this.connection.dataChannel;i&&(n=!!i.readyState&&i.readyState!=="closed"),(e||n)&&t.close()}async _makeOffer(){const t=this.connection.peerConnection,e=this.connection.provider;try{const n=await t.createOffer(this.connection.options.constraints);At.log("Created offer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(n.sdp=this.connection.options.sdpTransform(n.sdp)||n.sdp);try{await t.setLocalDescription(n),At.log("Set localDescription:",n,`for:${this.connection.peer}`);let i={sdp:n,type:this.connection.type,connectionId:this.connection.connectionId,metadata:this.connection.metadata};if(this.connection.type===Fn.Data){const r=this.connection;i={...i,label:r.label,reliable:r.reliable,serialization:r.serialization}}e.socket.send({type:Pe.Offer,payload:i,dst:this.connection.peer})}catch(i){i!="OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer"&&(e.emitError(ve.WebRTC,i),At.log("Failed to setLocalDescription, ",i))}}catch(n){e.emitError(ve.WebRTC,n),At.log("Failed to createOffer, ",n)}}async _makeAnswer(){const t=this.connection.peerConnection,e=this.connection.provider;try{const n=await t.createAnswer();At.log("Created answer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(n.sdp=this.connection.options.sdpTransform(n.sdp)||n.sdp);try{await t.setLocalDescription(n),At.log("Set localDescription:",n,`for:${this.connection.peer}`),e.socket.send({type:Pe.Answer,payload:{sdp:n,type:this.connection.type,connectionId:this.connection.connectionId},dst:this.connection.peer})}catch(i){e.emitError(ve.WebRTC,i),At.log("Failed to setLocalDescription, ",i)}}catch(n){e.emitError(ve.WebRTC,n),At.log("Failed to create answer, ",n)}}async handleSDP(t,e){e=new RTCSessionDescription(e);const n=this.connection.peerConnection,i=this.connection.provider;At.log("Setting remote description",e);const r=this;try{await n.setRemoteDescription(e),At.log(`Set remoteDescription:${t} for:${this.connection.peer}`),t==="OFFER"&&await r._makeAnswer()}catch(o){i.emitError(ve.WebRTC,o),At.log("Failed to setRemoteDescription, ",o)}}async handleCandidate(t){At.log("handleCandidate:",t);try{await this.connection.peerConnection.addIceCandidate(t),At.log(`Added ICE candidate for:${this.connection.peer}`)}catch(e){this.connection.provider.emitError(ve.WebRTC,e),At.log("Failed to handleCandidate, ",e)}}_addTracksToConnection(t,e){if(At.log(`add tracks from stream ${t.id} to peer connection`),!e.addTrack)return At.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");t.getTracks().forEach(n=>{e.addTrack(n,t)})}_addStreamToMediaConnection(t,e){At.log(`add stream ${t.id} to media connection ${e.connectionId}`),e.addStream(t)}}class Sh extends xa.EventEmitter{emitError(t,e){At.error("Error:",e),this.emit("error",new Yg(`${t}`,e))}}class Yg extends Error{constructor(t,e){typeof e=="string"?super(e):(super(),Object.assign(this,e)),this.type=t}}class Mh extends Sh{get open(){return this._open}constructor(t,e,n){super(),this.peer=t,this.provider=e,this.options=n,this._open=!1,this.metadata=n.metadata}}var jo;const ls=class ls extends Mh{get type(){return Fn.Media}get localStream(){return this._localStream}get remoteStream(){return this._remoteStream}constructor(t,e,n){super(t,e,n),this._localStream=this.options._stream,this.connectionId=this.options.connectionId||ls.ID_PREFIX+Fe.randomToken(),this._negotiator=new yh(this),this._localStream&&this._negotiator.startConnection({_stream:this._localStream,originator:!0})}_initializeDataChannel(t){this.dataChannel=t,this.dataChannel.onopen=()=>{At.log(`DC#${this.connectionId} dc connection success`),this.emit("willCloseOnRemote")},this.dataChannel.onclose=()=>{At.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}addStream(t){At.log("Receiving stream",t),this._remoteStream=t,super.emit("stream",t)}handleMessage(t){const e=t.type,n=t.payload;switch(t.type){case Pe.Answer:this._negotiator.handleSDP(e,n.sdp),this._open=!0;break;case Pe.Candidate:this._negotiator.handleCandidate(n.candidate);break;default:At.warn(`Unrecognized message type:${e} from peer:${this.peer}`);break}}answer(t,e={}){if(this._localStream){At.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");return}this._localStream=t,e&&e.sdpTransform&&(this.options.sdpTransform=e.sdpTransform),this._negotiator.startConnection({...this.options._payload,_stream:t});const n=this.provider._getMessages(this.connectionId);for(const i of n)this.handleMessage(i);this._open=!0}close(){this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this._localStream=null,this._remoteStream=null,this.provider&&(this.provider._removeConnection(this),this.provider=null),this.options&&this.options._stream&&(this.options._stream=null),this.open&&(this._open=!1,super.emit("close"))}};jo=new WeakMap,Xi(ls,jo,ls.ID_PREFIX="mc_");let ir=ls;class jg{constructor(t){this._options=t}_buildRequest(t){const e=this._options.secure?"https":"http",{host:n,port:i,path:r,key:o}=this._options,a=new URL(`${e}://${n}:${i}${r}${o}/${t}`);return a.searchParams.set("ts",`${Date.now()}${Math.random()}`),a.searchParams.set("version",xh),fetch(a.href,{referrerPolicy:this._options.referrerPolicy})}async retrieveId(){try{const t=await this._buildRequest("id");if(t.status!==200)throw new Error(`Error. Status:${t.status}`);return t.text()}catch(t){At.error("Error retrieving ID",t);let e="";throw this._options.path==="/"&&this._options.host!==Fe.CLOUD_HOST&&(e=" If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer."),new Error("Could not get an ID from the server."+e)}}async listAllPeers(){try{const t=await this._buildRequest("peers");if(t.status!==200){if(t.status===401){let e="";throw this._options.host===Fe.CLOUD_HOST?e="It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key.":e="You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.",new Error("It doesn't look like you have permission to list peers IDs. "+e)}throw new Error(`Error. Status:${t.status}`)}return t.json()}catch(t){throw At.error("Error retrieving list peers",t),new Error("Could not get list peers from the server."+t)}}}var Zo,Ko;const Kn=class Kn extends Mh{get type(){return Fn.Data}constructor(t,e,n){super(t,e,n),this.connectionId=this.options.connectionId||Kn.ID_PREFIX+_h(),this.label=this.options.label||this.connectionId,this.reliable=!!this.options.reliable,this._negotiator=new yh(this),this._negotiator.startConnection(this.options._payload||{originator:!0,reliable:this.reliable})}_initializeDataChannel(t){this.dataChannel=t,this.dataChannel.onopen=()=>{At.log(`DC#${this.connectionId} dc connection success`),this._open=!0,this.emit("open")},this.dataChannel.onmessage=e=>{At.log(`DC#${this.connectionId} dc onmessage:`,e.data)},this.dataChannel.onclose=()=>{At.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}close(t){if(t!=null&&t.flush){this.send({__peerData:{type:"close"}});return}this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this.provider&&(this.provider._removeConnection(this),this.provider=null),this.dataChannel&&(this.dataChannel.onopen=null,this.dataChannel.onmessage=null,this.dataChannel.onclose=null,this.dataChannel=null),this.open&&(this._open=!1,super.emit("close"))}send(t,e=!1){if(!this.open){this.emitError(ya.NotOpenYet,"Connection is not open. You should listen for the `open` event before sending messages.");return}return this._send(t,e)}async handleMessage(t){const e=t.payload;switch(t.type){case Pe.Answer:await this._negotiator.handleSDP(t.type,e.sdp);break;case Pe.Candidate:await this._negotiator.handleCandidate(e.candidate);break;default:At.warn("Unrecognized message type:",t.type,"from peer:",this.peer);break}}};Zo=new WeakMap,Ko=new WeakMap,Xi(Kn,Zo,Kn.ID_PREFIX="dc_"),Xi(Kn,Ko,Kn.MAX_BUFFERED_AMOUNT=8388608);let sr=Kn;class Sa extends sr{get bufferSize(){return this._bufferSize}_initializeDataChannel(t){super._initializeDataChannel(t),this.dataChannel.binaryType="arraybuffer",this.dataChannel.addEventListener("message",e=>this._handleDataMessage(e))}_bufferedSend(t){(this._buffering||!this._trySend(t))&&(this._buffer.push(t),this._bufferSize=this._buffer.length)}_trySend(t){if(!this.open)return!1;if(this.dataChannel.bufferedAmount>sr.MAX_BUFFERED_AMOUNT)return this._buffering=!0,setTimeout(()=>{this._buffering=!1,this._tryBuffer()},50),!1;try{this.dataChannel.send(t)}catch(e){return At.error(`DC#:${this.connectionId} Error when sending:`,e),this._buffering=!0,this.close(),!1}return!0}_tryBuffer(){if(!this.open||this._buffer.length===0)return;const t=this._buffer[0];this._trySend(t)&&(this._buffer.shift(),this._bufferSize=this._buffer.length,this._tryBuffer())}close(t){if(t!=null&&t.flush){this.send({__peerData:{type:"close"}});return}this._buffer=[],this._bufferSize=0,super.close()}constructor(...t){super(...t),this._buffer=[],this._bufferSize=0,this._buffering=!1}}class Kr extends Sa{close(t){super.close(t),this._chunkedData={}}constructor(t,e,n){super(t,e,n),this.chunker=new gh,this.serialization=dr.Binary,this._chunkedData={}}_handleDataMessage({data:t}){const e=kl(t),n=e.__peerData;if(n){if(n.type==="close"){this.close();return}this._handleChunk(e);return}this.emit("data",e)}_handleChunk(t){const e=t.__peerData,n=this._chunkedData[e]||{data:[],count:0,total:t.total};if(n.data[t.n]=new Uint8Array(t.data),n.count++,this._chunkedData[e]=n,n.total===n.count){delete this._chunkedData[e];const i=zg(n.data);this._handleDataMessage({data:i})}}_send(t,e){const n=Fl(t);if(n instanceof Promise)return this._send_blob(n);if(!e&&n.byteLength>this.chunker.chunkedMTU){this._sendChunks(n);return}this._bufferedSend(n)}async _send_blob(t){const e=await t;if(e.byteLength>this.chunker.chunkedMTU){this._sendChunks(e);return}this._bufferedSend(e)}_sendChunks(t){const e=this.chunker.chunk(t);At.log(`DC#${this.connectionId} Try to send ${e.length} chunks...`);for(const n of e)this.send(n,!0)}}class Zg extends Sa{_handleDataMessage({data:t}){super.emit("data",t)}_send(t,e){this._bufferedSend(t)}constructor(...t){super(...t),this.serialization=dr.None}}class Kg extends Sa{_handleDataMessage({data:t}){const e=this.parse(this.decoder.decode(t)),n=e.__peerData;if(n&&n.type==="close"){this.close();return}this.emit("data",e)}_send(t,e){const n=this.encoder.encode(this.stringify(t));if(n.byteLength>=Fe.chunkedMTU){this.emitError(ya.MessageToBig,"Message too big for JSON channel");return}this._bufferedSend(n)}constructor(...t){super(...t),this.serialization=dr.JSON,this.encoder=new TextEncoder,this.decoder=new TextDecoder,this.stringify=JSON.stringify,this.parse=JSON.parse}}var Jo;const hs=class hs extends Sh{get id(){return this._id}get options(){return this._options}get open(){return this._open}get socket(){return this._socket}get connections(){const t=Object.create(null);for(const[e,n]of this._connections)t[e]=n;return t}get destroyed(){return this._destroyed}get disconnected(){return this._disconnected}constructor(t,e){super(),this._serializers={raw:Zg,json:Kg,binary:Kr,"binary-utf8":Kr,default:Kr},this._id=null,this._lastServerId=null,this._destroyed=!1,this._disconnected=!1,this._open=!1,this._connections=new Map,this._lostMessages=new Map;let n;if(t&&t.constructor==Object?e=t:t&&(n=t.toString()),e={debug:0,host:Fe.CLOUD_HOST,port:Fe.CLOUD_PORT,path:"/",key:hs.DEFAULT_KEY,token:Fe.randomToken(),config:Fe.defaultConfig,referrerPolicy:"strict-origin-when-cross-origin",serializers:{},...e},this._options=e,this._serializers={...this._serializers,...this.options.serializers},this._options.host==="/"&&(this._options.host=window.location.hostname),this._options.path&&(this._options.path[0]!=="/"&&(this._options.path="/"+this._options.path),this._options.path[this._options.path.length-1]!=="/"&&(this._options.path+="/")),this._options.secure===void 0&&this._options.host!==Fe.CLOUD_HOST?this._options.secure=Fe.isSecure():this._options.host==Fe.CLOUD_HOST&&(this._options.secure=!0),this._options.logFunction&&At.setLogFunction(this._options.logFunction),At.logLevel=this._options.debug||0,this._api=new jg(e),this._socket=this._createServerConnection(),!Fe.supports.audioVideo&&!Fe.supports.data){this._delayedAbort(ve.BrowserIncompatible,"The current browser does not support WebRTC");return}if(n&&!Fe.validateId(n)){this._delayedAbort(ve.InvalidID,`ID "${n}" is invalid`);return}n?this._initialize(n):this._api.retrieveId().then(i=>this._initialize(i)).catch(i=>this._abort(ve.ServerError,i))}_createServerConnection(){const t=new qg(this._options.secure,this._options.host,this._options.port,this._options.path,this._options.key,this._options.pingInterval);return t.on(Dn.Message,e=>{this._handleMessage(e)}),t.on(Dn.Error,e=>{this._abort(ve.SocketError,e)}),t.on(Dn.Disconnected,()=>{this.disconnected||(this.emitError(ve.Network,"Lost connection to server."),this.disconnect())}),t.on(Dn.Close,()=>{this.disconnected||this._abort(ve.SocketClosed,"Underlying socket is already closed.")}),t}_initialize(t){this._id=t,this.socket.start(t,this._options.token)}_handleMessage(t){const e=t.type,n=t.payload,i=t.src;switch(e){case Pe.Open:this._lastServerId=this.id,this._open=!0,this.emit("open",this.id);break;case Pe.Error:this._abort(ve.ServerError,n.msg);break;case Pe.IdTaken:this._abort(ve.UnavailableID,`ID "${this.id}" is taken`);break;case Pe.InvalidKey:this._abort(ve.InvalidKey,`API KEY "${this._options.key}" is invalid`);break;case Pe.Leave:At.log(`Received leave message from ${i}`),this._cleanupPeer(i),this._connections.delete(i);break;case Pe.Expire:this.emitError(ve.PeerUnavailable,`Could not connect to peer ${i}`);break;case Pe.Offer:{const r=n.connectionId;let o=this.getConnection(i,r);if(o&&(o.close(),At.warn(`Offer received for existing Connection ID:${r}`)),n.type===Fn.Media){const c=new ir(i,this,{connectionId:r,_payload:n,metadata:n.metadata});o=c,this._addConnection(i,o),this.emit("call",c)}else if(n.type===Fn.Data){const c=new this._serializers[n.serialization](i,this,{connectionId:r,_payload:n,metadata:n.metadata,label:n.label,serialization:n.serialization,reliable:n.reliable});o=c,this._addConnection(i,o),this.emit("connection",c)}else{At.warn(`Received malformed connection type:${n.type}`);return}const a=this._getMessages(r);for(const c of a)o.handleMessage(c);break}default:{if(!n){At.warn(`You received a malformed message from ${i} of type ${e}`);return}const r=n.connectionId,o=this.getConnection(i,r);o&&o.peerConnection?o.handleMessage(t):r?this._storeMessage(r,t):At.warn("You received an unrecognized message:",t);break}}}_storeMessage(t,e){this._lostMessages.has(t)||this._lostMessages.set(t,[]),this._lostMessages.get(t).push(e)}_getMessages(t){const e=this._lostMessages.get(t);return e?(this._lostMessages.delete(t),e):[]}connect(t,e={}){if(e={serialization:"default",...e},this.disconnected){At.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available."),this.emitError(ve.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}const n=new this._serializers[e.serialization](t,this,e);return this._addConnection(t,n),n}call(t,e,n={}){if(this.disconnected){At.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect."),this.emitError(ve.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}if(!e){At.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");return}const i=new ir(t,this,{...n,_stream:e});return this._addConnection(t,i),i}_addConnection(t,e){At.log(`add connection ${e.type}:${e.connectionId} to peerId:${t}`),this._connections.has(t)||this._connections.set(t,[]),this._connections.get(t).push(e)}_removeConnection(t){const e=this._connections.get(t.peer);if(e){const n=e.indexOf(t);n!==-1&&e.splice(n,1)}this._lostMessages.delete(t.connectionId)}getConnection(t,e){const n=this._connections.get(t);if(!n)return null;for(const i of n)if(i.connectionId===e)return i;return null}_delayedAbort(t,e){setTimeout(()=>{this._abort(t,e)},0)}_abort(t,e){At.error("Aborting!"),this.emitError(t,e),this._lastServerId?this.disconnect():this.destroy()}destroy(){this.destroyed||(At.log(`Destroy peer with ID:${this.id}`),this.disconnect(),this._cleanup(),this._destroyed=!0,this.emit("close"))}_cleanup(){for(const t of this._connections.keys())this._cleanupPeer(t),this._connections.delete(t);this.socket.removeAllListeners()}_cleanupPeer(t){const e=this._connections.get(t);if(e)for(const n of e)n.close()}disconnect(){if(this.disconnected)return;const t=this.id;At.log(`Disconnect peer with ID:${t}`),this._disconnected=!0,this._open=!1,this.socket.close(),this._lastServerId=t,this._id=null,this.emit("disconnected",t)}reconnect(){if(this.disconnected&&!this.destroyed)At.log(`Attempting reconnection to server with ID ${this._lastServerId}`),this._disconnected=!1,this._initialize(this._lastServerId);else{if(this.destroyed)throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");if(!this.disconnected&&!this.open)At.error("In a hurry? We're still trying to make the initial connection!");else throw new Error(`Peer ${this.id} cannot reconnect because it is not disconnected from the server!`)}}listAllPeers(t=e=>{}){this._api.listAllPeers().then(e=>t(e)).catch(e=>this._abort(ve.ServerError,e))}};Jo=new WeakMap,Xi(hs,Jo,hs.DEFAULT_KEY="peerjs");let rr=hs;class Jg{constructor(t,e){this.onStateChange=t,this.onChatMessage=e,this.peer=null,this.isHost=!1,this.roomCode=null,this.connections=new Map,this.hostConn=null,this.players=new Map,this.localPlayerId=null,this.localPlayerInfo={name:"นักซิ่งอาชิ",carId:"gt",skinId:"green_dress",color:"#ff2255",isReady:!1},this.sendInterval=null,this.lastSentPacketTime=0}generateRoomCode(){const t="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";let e="";for(let n=0;n<4;n++)e+=t.charAt(Math.floor(Math.random()*t.length));return e}createRoom(t,e,n){this.isHost=!0,this.roomCode=this.generateRoomCode(),this.localPlayerInfo={...t,isReady:!0};const i=`ashilane-${this.roomCode.toLowerCase()}`;this.initPeer(i,()=>{this.localPlayerId=this.peer.id,this.players.set(this.localPlayerId,{id:this.localPlayerId,...this.localPlayerInfo,isHost:!0}),e&&e(this.roomCode),this.notifyState()},n),this.peer.on("connection",r=>{this.handleIncomingConnection(r)})}joinRoom(t,e,n,i){this.isHost=!1,this.roomCode=t.toUpperCase().trim(),this.localPlayerInfo={...e,isReady:!1},this.initPeer(null,()=>{this.localPlayerId=this.peer.id;const r=`ashilane-${this.roomCode.toLowerCase()}`,o=this.peer.connect(r,{reliable:!0});o.on("open",()=>{this.hostConn=o,o.send({type:"JOIN",player:this.localPlayerInfo}),n&&n(this.roomCode)}),o.on("data",a=>{this.handleClientReceivedData(a)}),o.on("close",()=>{alert("หลุดการเชื่อมต่อจากเจ้าของห้อง (Host disconnected)")}),o.on("error",a=>{i&&i(a)})},i)}initPeer(t,e,n){try{this.peer=t?new rr(t):new rr,this.peer.on("open",()=>{e&&e()}),this.peer.on("error",i=>{console.error("PeerJS error:",i),n&&n(i)})}catch(i){n&&n(i)}}handleIncomingConnection(t){t.on("open",()=>{this.connections.set(t.peer,t)}),t.on("data",e=>{this.handleHostReceivedData(t.peer,e)}),t.on("close",()=>{this.connections.delete(t.peer),this.players.delete(t.peer),this.broadcast({type:"PLAYER_LEFT",peerId:t.peer}),this.notifyState()})}handleHostReceivedData(t,e){if(e.type==="JOIN"){this.players.set(t,{id:t,...e.player,isHost:!1});const n=this.connections.get(t);n&&n.send({type:"WELCOME",players:Array.from(this.players.values())}),this.broadcast({type:"PLAYER_JOINED",player:this.players.get(t)},t),this.notifyState()}else if(e.type==="UPDATE_PLAYER"){const n=this.players.get(t);n&&(Object.assign(n,e.player),this.broadcast({type:"PLAYER_UPDATED",peerId:t,player:n}),this.notifyState())}else e.type==="CAR_TRANSFORM"?this.broadcast(e,t):e.type==="CHAT"&&(this.broadcast(e),this.onChatMessage&&this.onChatMessage(e))}handleClientReceivedData(t){t.type==="WELCOME"?(this.players.clear(),t.players.forEach(e=>this.players.set(e.id,e)),this.notifyState()):t.type==="PLAYER_JOINED"?(this.players.set(t.player.id,t.player),this.notifyState()):t.type==="PLAYER_UPDATED"?(this.players.set(t.peerId,t.player),this.notifyState()):t.type==="PLAYER_LEFT"?(this.players.delete(t.peerId),this.notifyState()):t.type==="START_RACE"?this.onStartRaceCallback&&this.onStartRaceCallback(t):t.type==="CAR_TRANSFORM"?this.onRacerTransform&&this.onRacerTransform(t):t.type==="CHAT"&&this.onChatMessage&&this.onChatMessage(t)}broadcast(t,e=null){this.connections.forEach((n,i)=>{i!==e&&n.open&&n.send(t)})}sendToHost(t){this.hostConn&&this.hostConn.open&&this.hostConn.send(t)}updateLocalPlayer(t){if(this.localPlayerInfo={...this.localPlayerInfo,...t},this.isHost){const e=this.players.get(this.localPlayerId);e&&Object.assign(e,this.localPlayerInfo),this.broadcast({type:"PLAYER_UPDATED",peerId:this.localPlayerId,player:this.localPlayerInfo}),this.notifyState()}else this.sendToHost({type:"UPDATE_PLAYER",player:this.localPlayerInfo})}startRace(t={}){if(!this.isHost)return;const e={type:"START_RACE",startTime:Date.now()+3500,settings:t};this.broadcast(e),this.onStartRaceCallback&&this.onStartRaceCallback(e)}sendTransform(t){const e={type:"CAR_TRANSFORM",peerId:this.localPlayerId,...t};this.isHost?this.broadcast(e):this.sendToHost(e)}sendChat(t,e=null){const n={type:"CHAT",senderId:this.localPlayerId,senderName:this.localPlayerInfo.name,message:t,emote:e,timestamp:Date.now()};this.isHost?(this.broadcast(n),this.onChatMessage&&this.onChatMessage(n)):this.sendToHost(n)}notifyState(){this.onStateChange&&this.onStateChange({roomCode:this.roomCode,isHost:this.isHost,localPlayerId:this.localPlayerId,players:Array.from(this.players.values())})}disconnect(){this.peer&&(this.peer.destroy(),this.peer=null),this.connections.clear(),this.players.clear(),this.hostConn=null}}class Qg{constructor(){this.container=document.getElementById("canvas-container"),this.state="MENU",this.gameMode="gp",this.currentTrackId="beach",this.currentDifficulty="normal",this.currentLaps=3,this.clock=new pg,this.raceStartTime=0,this.isRacing=!1,this.countdownActive=!1,this.scene=null,this.camera=null,this.renderer=null,this.ambientLight=null,this.dirLight=null,this.cameraMode=0,this.cameraOffset=new P(0,3.8,-7.5),this.cameraLookOffset=new P(0,1.2,4),this.track=null,this.decorations=null,this.carBuilder=new vg,this.particles=null,this.audio=new yg,this.hud=new Tg,this.minimap=null,this.items=null,this.playerCar=null,this.aiCars=[],this.remotePlayers=new Map,this.garageCarMesh=null,this.garageGroup=null,this.garageAngle=.5,this.garagePitch=.26,this.garageDistance=6,this.garageTargetAngle=.5,this.garageTargetPitch=.26,this.garageTargetDistance=6,this.garageAutoSpin=!0,this.garageIsDragging=!1,this.garageDragPrevX=0,this.garageDragPrevY=0,this.multiplayer=new Jg(t=>this.onMultiplayerStateChanged(t),t=>this.onChatMessage(t)),this.multiplayer.onStartRaceCallback=t=>this.onMultiplayerStartRace(t),this.multiplayer.onRacerTransform=t=>this.onRemoteRacerTransform(t),this.ui=new wg(this),this.keys={},this.initInputs(),this.initThree(),this.animate()}initThree(){this.scene=new H0,this.camera=new Oe(65,window.innerWidth/window.innerHeight,.1,1200),this.renderer=new V0({antialias:!0,powerPreference:"high-performance"}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Jc,this.renderer.toneMapping=tl,this.container.appendChild(this.renderer.domElement),this.ambientLight=new Oc(16769732,.75),this.scene.add(this.ambientLight),this.dirLight=new Yr(16777215,1.5),this.dirLight.position.set(120,220,100),this.dirLight.castShadow=!0,this.dirLight.shadow.mapSize.width=2048,this.dirLight.shadow.mapSize.height=2048,this.dirLight.shadow.camera.near=10,this.dirLight.shadow.camera.far=600,this.dirLight.shadow.camera.left=-300,this.dirLight.shadow.camera.right=300,this.dirLight.shadow.camera.top=300,this.dirLight.shadow.camera.bottom=-300,this.scene.add(this.dirLight),this.particles=new xg(this.scene),this.loadTrack(this.currentTrackId),this.setupPlayerCar(ce[0],"Gemini_Generated_Image_4g9dic4g9dic4g9d.jpg","#ff2255"),this.positionCarAtStart(this.playerCar,0),window.addEventListener("resize",()=>this.onWindowResize())}loadTrack(t){const e=Eg(t);this.currentTrackId=e.id,this.decorations&&(this.decorations.dispose(),this.decorations=null),this.track&&(this.track.dispose(),this.track=null);const n=e.theme||{};this.scene.background=new Wt(n.sky??658456),this.scene.fog=new nr(n.fog??658456,n.fogDensity||.0035),this.renderer.toneMappingExposure=n.exposure||1.1,this.ambientLight&&(this.ambientLight.color.setHex(n.ambient??11584734),this.ambientLight.intensity=n.ambientIntensity||.7),this.dirLight&&(this.dirLight.color.setHex(n.sun??16777215),this.dirLight.intensity=n.sunIntensity||1.4),this.track=new gg(this.scene,e),this.decorations=new _g(this.scene,this.track),this.items?this.items.resetForTrack(this.track):this.items=new Mg(this.scene,this.track,this.particles,this.audio,this.hud);const i=document.getElementById("minimap-canvas");i&&(this.minimap?this.minimap.setTrack(this.track):this.minimap=new Sg(i,this.track)),this.hud.setStage(e.nameTh)}setupPlayerCar(t,e,n,i=null){var a;this.playerCar&&this.playerCar.model&&this.scene.remove(this.playerCar.model),this.playerCar=new zo(t,e,n,!0),this.playerCar.game=this;const r=i||((a=this.ui)==null?void 0:a.currentAddons),o=this.carBuilder.createCar(t.id,e,n,!1,r);this.playerCar.setModel(o),this.scene.add(this.playerCar.model),this.hud.setDriverAvatar(e,this.ui.playerName)}positionCarAtStart(t,e=0){if(!this.track||!this.track.samplePos)return;const n=this.track.samplePos[0],i=this.track.sampleTan[0],r=this.track.sampleNorm[0],o=Math.floor(e/2),c=(e%2===0?-1:1)*(this.track.roadWidth*.22),l=-10-o*8,h=n.clone().addScaledVector(i,l).addScaledVector(r,c);t.position.set(h.x,.05,h.z),t.rotationY=Math.atan2(i.x,i.z),t.speed=0,t.velocity.set(0,0,0),t.lap=1,t.hasPassedHalfway=!1,t.sampleIndexHint=0,t.totalDistance=0,t.isFinished=!1,t.spinTimer=0,t.isSpinning=!1}startSinglePlayer(t="gp",e="beach",n="normal",i=3){var l,h;this.gameMode=t,this.currentDifficulty=n,this.currentLaps=i,this.state="RACING",this.audio.init(),this.garageCarMesh&&(this.scene.remove(this.garageCarMesh.root),this.garageCarMesh=null),this.garageGroup&&(this.garageGroup.visible=!1),this.track&&this.track.group&&(this.track.group.visible=!0),this.decorations&&this.decorations.group&&(this.decorations.group.visible=!0),this.prevSceneBackground&&(this.scene.background=this.prevSceneBackground,this.scene.fog=this.prevSceneFog,this.prevSceneBackground=null,this.prevSceneFog=null),(!this.track||this.track.def.id!==e)&&this.loadTrack(e);const r=this.ui.getPlayerConfig(),o=ce.find(d=>d.id===r.carId)||ce[0];if(this.setupPlayerCar(o,r.skinFileName,r.color,r.addons),this.playerCar.totalLaps=i,this.clearOpponents(),this.positionCarAtStart(this.playerCar,0),t==="gp"){const d=((l=bg[n])==null?void 0:l.aiMul)||1;[{name:"วัลคิรี อาชิ (Cyber)",car:"hyper",skin:"Gemini_Generated_Image_kwy6itkwy6itkwy6.jpeg",color:"#00f0ff",lane:-2.8,skill:.93},{name:"บิกินี่แดง อาชิ (Hot)",car:"gt",skin:"qwen_edit_20261004_234512.png",color:"#ff0033",lane:2.8,skill:.92},{name:"แรลลี่ อสูร อาชิ",car:"rally",skin:"Gemini_Generated_Image_w62h0zw62h0zw62h.jpg",color:"#ff0055",lane:-3.2,skill:.89},{name:"เสี่ยอาชิ (CEO)",car:"f1",skin:"Gemini_Generated_Image_t2e45ct2e45ct2e4.jpeg",color:"#ffd700",lane:3.2,skill:.94},{name:"ชเร็ค อาชิ (Ogre)",car:"truck",skin:"Gemini_Generated_Image_9bccp39bccp39bcc.jpeg",color:"#38b000",lane:-1.2,skill:.9},{name:"คลาสสิก อาชิ",car:"speedster",skin:"Gemini_Generated_Image_ovar5lovar5lovar.jpeg",color:"#e0e7ff",lane:1.2,skill:.88}].forEach((f,g)=>{const _=ce.find(x=>x.id===f.car)||ce[0],m=new Gc(_,f.skin,f.color,f.name,f.lane,f.skill);m.game=this,m.totalLaps=i,m.setDifficulty(d);const p=this.carBuilder.createCar(_.id,f.skin,f.color,!0);m.setModel(p),this.scene.add(m.model),this.positionCarAtStart(m,g+1),this.aiCars.push(m)})}const a=[{name:this.ui.playerName,carName:o.nameTh,carTag:o.tag||o.name,carId:o.id,skinFileName:r.skinFileName,color:r.color,isPlayer:!0,car:this.playerCar}];this.aiCars.forEach(d=>{var u,f,g,_;a.push({name:d.name,carName:((u=d.config)==null?void 0:u.nameTh)||"รถซิ่งอาชิ",carTag:((f=d.config)==null?void 0:f.tag)||((g=d.config)==null?void 0:g.name)||"RIVAL",carId:((_=d.config)==null?void 0:_.id)||"gt",skinFileName:d.skinFileName,color:d.bodyColor,isPlayer:!1,car:d})});const c=(h=this.track)!=null&&h.def?`${this.track.def.icon||"🏁"} ${this.track.def.nameTh} (${this.track.def.name})`:"STARTING GRID";this.playGridIntro(a,c,()=>this.startCountdown())}playGridIntro(t,e,n){this.state="GRID_INTRO",this.gridIntroTimer=0,this.gridIntroRacers=t||[],this.gridIntroOnComplete=n,this.countdownActive=!0,this.isRacing=!1,this.lastGridFocusedIndex=-1,this.playerCar&&(this.playerCar.speed=0,this.playerCar.velocity.set(0,0,0),this.playerCar.inputs.throttle=0,this.playerCar.inputs.steer=0,this.playerCar.inputs.boost=!1,this.playerCar.inputs.drift=!1),this.aiCars.forEach(c=>{c.speed=0,c.velocity.set(0,0,0),c.inputs.throttle=0,c.inputs.steer=0,c.inputs.boost=!1,c.inputs.drift=!1});const i=Math.max(1,this.gridIntroRacers.length);i===1?(this.rivalSlotDuration=0,this.playerSlotDuration=3.6,this.gridIntroDuration=3.6):(this.rivalSlotDuration=2.8,this.playerSlotDuration=3.6,this.gridIntroDuration=(i-1)*this.rivalSlotDuration+this.playerSlotDuration);const r=i>1?i-1:0,o=this.gridIntroRacers[r],a=(o==null?void 0:o.car)||(r===0?this.playerCar:this.aiCars[r-1]);if(a){const c=a.position,l=a.rotationY,h=r%2===0?-1:1,d=r===0?-1.35:h===-1?-1.25:1.25,u=r===0?4.35:4.25,f=.82,g=Math.sin(l),_=Math.cos(l),m=Math.cos(l),p=-Math.sin(l),x=u*(Math.cos(d)*g+Math.sin(d)*m),S=u*(Math.cos(d)*_+Math.sin(d)*p);this.camera.position.set(c.x+x,c.y+f,c.z+S),this.camera.lookAt(c.x,c.y+.65,c.z),this.camera.fov=57,this.camera.updateProjectionMatrix(),this.slotStartCamPos=this.camera.position.clone(),this.slotStartLookTarget=new P(c.x,c.y+.65,c.z),this.lastLookTarget=this.slotStartLookTarget.clone()}else this.slotStartCamPos=null,this.slotStartLookTarget=null,this.lastLookTarget=null;this.audio&&(this.audio.playAnnouncerImpact?this.audio.playAnnouncerImpact(!1):this.audio.playGridIntroSwoosh&&this.audio.playGridIntroSwoosh()),this.ui.showGridIntro(t,e,()=>this.finishGridIntro())}updateGridIntro(t){this.gridIntroTimer+=t;const e=this.gridIntroDuration,n=this.gridIntroTimer;if(n>=e){this.finishGridIntro();return}const i=this.gridIntroRacers.length;if(i===0){this.finishGridIntro();return}const r=S=>{const v=Math.max(0,Math.min(1,S));return v*v*v*(v*(v*6-15)+10)};let o=0,a=0;if(i===1)o=0,a=Math.min(1,Math.max(0,n/this.playerSlotDuration));else{const S=(i-1)*this.rivalSlotDuration;if(n<S){const v=Math.min(i-2,Math.floor(n/this.rivalSlotDuration));o=i-1-v;const L=n-v*this.rivalSlotDuration;a=Math.min(1,Math.max(0,L/this.rivalSlotDuration))}else{o=0;const v=n-S;a=Math.min(1,Math.max(0,v/this.playerSlotDuration))}}if(o!==this.lastGridFocusedIndex){this.lastGridFocusedIndex=o;const S=this.gridIntroRacers[o],v=o+1;this.slotStartCamPos=this.camera.position.clone(),this.slotStartLookTarget=(this.lastLookTarget||new P).clone(),this.audio&&(this.audio.playAnnouncerImpact?this.audio.playAnnouncerImpact(!!(S!=null&&S.isPlayer)):this.audio.playGridIntroSwoosh&&this.audio.playGridIntroSwoosh(),this.audio.announceRacer&&S&&this.audio.announceRacer(S.name,!!S.isPlayer,v)),this.ui.updateGridBroadcast(o)}const c=this.gridIntroRacers[o],l=(c==null?void 0:c.car)||(o===0?this.playerCar:this.aiCars[o-1]),h=l?l.position:new P(0,0,0),d=l?l.rotationY:0,u=new P(h.x,h.y+.45,h.z),f=Math.sin(d),g=Math.cos(d),_=Math.cos(d),m=-Math.sin(d);let p=new P,x=u.clone();if(o>0){const S=r(a),v=o%2===0?-1:1,L=v===-1?-1.25:1.25,C=L+((v===-1?.45:-.45)-L)*S,w=4.45-Math.sin(S*Math.PI)*.35,M=.95+Math.sin(S*Math.PI)*.4,y=w*(Math.cos(C)*f+Math.sin(C)*_),R=w*(Math.cos(C)*g+Math.sin(C)*m),k=new P(h.x+y,h.y+M,h.z+R),F=u.clone().addScaledVector(new P(f,0,g),.25),H=.26;if(a<H&&this.slotStartCamPos&&this.slotStartLookTarget){const O=a/H,U=r(O);p.lerpVectors(this.slotStartCamPos,k,U),x.lerpVectors(this.slotStartLookTarget,F,U)}else p.copy(k),x.copy(F);this.camera.fov=57,this.camera.updateProjectionMatrix()}else{const S=a,v=.58,L=this.cameraOffset.clone().applyAxisAngle(new P(0,1,0),d),E=h.clone().add(L),C=this.cameraLookOffset.clone().applyAxisAngle(new P(0,1,0),d),w=h.clone().add(C);if(S<v){const M=S/v,y=r(M),R=-1.35+y*2.45,k=4.35-y*.45,F=.8+Math.sin(y*Math.PI)*.42,H=k*(Math.cos(R)*f+Math.sin(R)*_),O=k*(Math.cos(R)*g+Math.sin(R)*m),U=new P(h.x+H,h.y+F,h.z+O),Y=u.clone().addScaledVector(new P(f,0,g),.3),W=.22;if(S<W&&this.slotStartCamPos&&this.slotStartLookTarget){const ot=S/W,N=r(ot);p.lerpVectors(this.slotStartCamPos,U,N),x.lerpVectors(this.slotStartLookTarget,Y,N)}else p.copy(U),x.copy(Y);this.camera.fov=57,this.camera.updateProjectionMatrix()}else{const M=(S-v)/(1-v),y=r(M),R=-1.35+2.45,k=3.9,F=.8,H=k*(Math.cos(R)*f+Math.sin(R)*_),O=k*(Math.cos(R)*g+Math.sin(R)*m),U=new P(h.x+H,h.y+F,h.z+O),Y=h.clone().addScaledVector(new P(f,0,g),-2.2).add(new P(0,2.8,0)),W=1-y,ot=W*W,N=y*y,D=2*W*y;p.x=ot*U.x+D*Y.x+N*E.x,p.y=ot*U.y+D*Y.y+N*E.y,p.z=ot*U.z+D*Y.z+N*E.z,x.lerpVectors(u,w,y),this.camera.fov=en.lerp(57,65,y),this.camera.updateProjectionMatrix()}}this.camera.position.copy(p),this.camera.lookAt(x),this.lastLookTarget=x.clone(),this.playerCar&&this.playerCar.updateVisuals(t),this.aiCars.forEach(S=>S.updateVisuals(t)),this.remotePlayers.forEach(S=>{S.car&&S.car.updateVisuals(t)})}finishGridIntro(){if(this.state==="GRID_INTRO"){if(this.audio&&this.audio.stopSpeech&&this.audio.stopSpeech(),this.playerCar){const t=this.playerCar.position,e=this.playerCar.rotationY,n=this.cameraOffset.clone().applyAxisAngle(new P(0,1,0),e);this.camera.position.copy(t).add(n);const i=this.cameraLookOffset.clone().applyAxisAngle(new P(0,1,0),e);this.camera.lookAt(t.clone().add(i)),this.camera.fov=65,this.camera.updateProjectionMatrix()}if(this.ui.hideGridIntro(),this.ui.showView("hud"),this.state="RACING",this.gridIntroOnComplete){const t=this.gridIntroOnComplete;this.gridIntroOnComplete=null,t()}}}startCountdown(){this.countdownActive=!0,this.isRacing=!1,this.playerCar&&(this.playerCar.speed=0,this.playerCar.inputs.throttle=0,this.playerCar.inputs.steer=0,this.playerCar.inputs.boost=!1,this.playerCar.inputs.drift=!1),this.aiCars.forEach(t=>{t.speed=0,t.inputs.throttle=0,t.inputs.steer=0,t.inputs.boost=!1,t.inputs.drift=!1}),this.track&&this.track.setStartLights&&this.track.setStartLights(0,!1),this.hud.playCountdown(t=>{t===3?(this.audio.playCountdown(440,.18),this.track&&this.track.setStartLights&&this.track.setStartLights(2,!1)):t===2?(this.audio.playCountdown(440,.18),this.track&&this.track.setStartLights&&this.track.setStartLights(4,!1)):t===1?(this.audio.playCountdown(440,.18),this.track&&this.track.setStartLights&&this.track.setStartLights(5,!1)):t==="GO"&&(this.audio.playCountdown(880,.45),this.track&&this.track.setStartLights&&this.track.setStartLights(5,!0),setTimeout(()=>{this.track&&this.track.setStartLights&&this.track.setStartLights(0,!1)},1500))},()=>{this.countdownActive=!1,this.isRacing=!0,this.raceStartTime=performance.now()})}clearOpponents(){this.aiCars.forEach(t=>{t.model&&this.scene.remove(t.model)}),this.aiCars=[],this.remotePlayers.forEach(t=>{t.car&&t.car.model&&this.scene.remove(t.car.model)}),this.remotePlayers.clear()}onMultiplayerStateChanged(t){this.ui.updateLobbyPlayers(t.players,t.localPlayerId)}onMultiplayerStartRace(t){var u;this.gameMode="multiplayer",this.state="RACING",this.audio.init(),this.garageCarMesh&&(this.scene.remove(this.garageCarMesh.root),this.garageCarMesh=null),this.garageGroup&&(this.garageGroup.visible=!1),this.track&&this.track.group&&(this.track.group.visible=!0),this.decorations&&this.decorations.group&&(this.decorations.group.visible=!0),this.prevSceneBackground&&(this.scene.background=this.prevSceneBackground,this.scene.fog=this.prevSceneFog,this.prevSceneBackground=null,this.prevSceneFog=null);const e=t.settings||{},n=e.trackId||"beach",i=e.laps||3,r=e.aiCount||0;(!this.track||this.track.def.id!==n)&&this.loadTrack(n);const o=this.ui.getPlayerConfig(),a=ce.find(f=>f.id===o.carId)||ce[0];this.setupPlayerCar(a,o.skinFileName,o.color,o.addons),this.playerCar.totalLaps=i,this.clearOpponents();const c=Array.from(this.multiplayer.players.values()),l=c.findIndex(f=>f.id===this.multiplayer.localPlayerId);if(this.positionCarAtStart(this.playerCar,l>=0?l:0),c.forEach((f,g)=>{if(f.id!==this.multiplayer.localPlayerId){const _=ce.find(S=>S.id===f.carId)||ce[0],m=f.skinFileName||"Gemini_Generated_Image_4g9dic4g9dic4g9d.jpg",p=new zo(_,m,f.color,!1);p.game=this,p.totalLaps=i;const x=this.carBuilder.createCar(_.id,m,f.color,!0);p.setModel(x),this.scene.add(p.model),this.positionCarAtStart(p,g),this.remotePlayers.set(f.id,{car:p,name:f.name,skinFileName:m,targetPos:p.position.clone(),targetRotY:p.rotationY})}}),r>0){const f=c.length;for(let g=0;g<r;g++){const _=ce[g%ce.length],m=Ai[g%Ai.length].file,p=new Gc(_,m,"#ff5500",`บอทอาชิ #${g+1}`,g%2===0?-2.5:2.5,.88);p.game=this,p.totalLaps=i;const x=this.carBuilder.createCar(_.id,m,"#ff5500",!0);p.setModel(x),this.scene.add(p.model),this.positionCarAtStart(p,f+g),this.aiCars.push(p)}}const h=[];c.forEach(f=>{const g=f.id===this.multiplayer.localPlayerId,_=ce.find(p=>p.id===f.carId)||ce[0],m=this.remotePlayers.get(f.id);h.push({name:f.name,carName:_.nameTh,carTag:_.tag||_.name,carId:_.id,skinFileName:f.skinFileName||"Gemini_Generated_Image_4g9dic4g9dic4g9d.jpg",color:f.color,isPlayer:g,car:g?this.playerCar:(m==null?void 0:m.car)||null})}),this.aiCars.forEach(f=>{var g,_,m,p;h.push({name:f.name,carName:((g=f.config)==null?void 0:g.nameTh)||"รถซิ่งอาชิ",carTag:((_=f.config)==null?void 0:_.tag)||((m=f.config)==null?void 0:m.name)||"RIVAL",carId:((p=f.config)==null?void 0:p.id)||"gt",skinFileName:f.skinFileName,color:f.bodyColor,isPlayer:!1,car:f})});const d=(u=this.track)!=null&&u.def?`${this.track.def.icon||"🏁"} ${this.track.def.nameTh}`:"MULTIPLAYER GRID";this.playGridIntro(h,d,()=>this.startCountdown())}onRemoteRacerTransform(t){const e=this.remotePlayers.get(t.peerId);!e||!e.car||(e.targetPos.set(t.x,t.y,t.z),e.targetRotY=t.rotY,e.car.speed=t.speed,e.car.isDrifting=t.isDrifting,e.car.boostTimer=t.boostTimer,e.car.lap=t.lap,e.car.totalDistance=t.totalDistance,e.car.isFinished=t.isFinished)}onChatMessage(t){this.hud.showNotification(`${t.senderName}: ${t.message}`),this.hud.showReaction(t.message,3e3)}sendEmote(t){this.state==="RACING"&&(this.hud.showReaction(t,2500),this.gameMode==="multiplayer"&&this.multiplayer.sendChat(t))}setupGarageEnvironment(){if(this.garageGroup)return;this.garageGroup=new le,this.garageGroup.name="GarageShowroom";const t=.3,e=0,n=new he(36,36);n.rotateX(-Math.PI/2);const i=new Et({color:790296,roughness:.18,metalness:.65}),r=new A(n,i);r.position.set(t,-.01,e),r.receiveShadow=!0,this.garageGroup.add(r);const o=new Nt({color:54015,transparent:!0,opacity:.45}),a=(nt,tt,et,ht)=>{const pt=new he(nt,tt);pt.rotateX(-Math.PI/2);const bt=new A(pt,o);bt.position.set(et,.005,ht),this.garageGroup.add(bt)};if(a(11,.08,t,e-5.5),a(11,.08,t,e+5.5),a(.08,11,t-5.5,e),a(.08,11,t+5.5,e),typeof document<"u"){const nt=document.createElement("canvas");nt.width=256,nt.height=32;const tt=nt.getContext("2d");if(tt){tt.fillStyle="#0a0d14",tt.fillRect(0,0,256,32),tt.fillStyle="#f59e0b";for(let gt=-32;gt<288;gt+=32)tt.beginPath(),tt.moveTo(gt,32),tt.lineTo(gt+20,0),tt.lineTo(gt+36,0),tt.lineTo(gt+16,32),tt.closePath(),tt.fill();const et=new Re(nt);et.wrapS=ln,et.repeat.set(4,1);const ht=new Nt({map:et}),pt=new A(new he(8,.28),ht);pt.rotateX(-Math.PI/2),pt.position.set(t,.006,e-5.7);const bt=new A(new he(8,.28),ht);bt.rotateX(-Math.PI/2),bt.position.set(t,.006,e+5.7),this.garageGroup.add(pt,bt)}}const c=new Gt(3.7,3.95,.24,64),l=new Et({color:1316384,metalness:.84,roughness:.2}),h=new A(c,l);h.position.set(t,.12,e),h.receiveShadow=!0,this.garageGroup.add(h);const d=new Gt(3.58,3.58,.02,64),u=new Et({color:1974832,metalness:.9,roughness:.32}),f=new A(d,u);f.position.set(t,.245,e),f.receiveShadow=!0,this.garageGroup.add(f);const g=new Te(3.8,.035,16,64);g.rotateX(Math.PI/2);const _=new Nt({color:62463}),m=new A(g,_);m.position.set(t,.24,e),this.garageGroup.add(m);const p=new Te(2.35,.015,16,64);p.rotateX(Math.PI/2);const x=new Nt({color:54015,transparent:!0,opacity:.4}),S=new A(p,x);S.position.set(t,.25,e),this.garageGroup.add(S);const v=new he(.04,.6);v.rotateX(-Math.PI/2);const L=new Nt({color:61695,transparent:!0,opacity:.5});for(let nt=0;nt<4;nt++){const tt=new A(v,L),et=nt*Math.PI/2;tt.position.set(t+Math.sin(et)*2.8,.252,e+Math.cos(et)*2.8),tt.rotation.y=et,this.garageGroup.add(tt)}if(typeof document<"u"){const nt=document.createElement("canvas");nt.width=256,nt.height=256;const tt=nt.getContext("2d");if(tt){const et=tt.createRadialGradient(128,128,10,128,128,128);et.addColorStop(0,"rgba(0, 243, 255, 0.55)"),et.addColorStop(.35,"rgba(0, 210, 255, 0.28)"),et.addColorStop(.75,"rgba(0, 210, 255, 0.08)"),et.addColorStop(1,"rgba(0, 0, 0, 0)"),tt.fillStyle=et,tt.fillRect(0,0,256,256);const ht=new Re(nt),pt=new A(new he(7.2,7.2),new Nt({map:ht,transparent:!0,opacity:.85,blending:Ye,depthWrite:!1}));pt.rotateX(-Math.PI/2),pt.position.set(t,.248,e),this.garageGroup.add(pt)}}const E=new Et({color:2238008,metalness:.9,roughness:.2});for(let nt=0;nt<8;nt++){const tt=nt*Math.PI/4,et=t+Math.sin(tt)*3.82,ht=e+Math.cos(tt)*3.82,pt=new A(new Gt(.1,.12,.1,16),E);pt.position.set(et,.26,ht);const bt=nt%2===0?62463:16777215,gt=new A(new rn(.08,16),new Nt({color:bt}));gt.rotateX(-Math.PI/2),gt.position.set(et,.312,ht);const Xt=new qr(bt,.95,4.8);Xt.position.set(et,.4,ht),this.garageGroup.add(pt,gt,Xt)}const C=new Gt(.7,3.8,6.2,32,1,!0),w=new Nt({color:8972543,transparent:!0,opacity:.08,blending:Ye,side:Ue,depthWrite:!1}),M=new A(C,w);M.position.set(t,3.4,e),this.garageGroup.add(M);const y=new A(new Te(3.6,.06,12,32),new Et({color:2764869,metalness:.85,roughness:.25}));y.rotateX(Math.PI/2),y.position.set(t,5.6,e),this.garageGroup.add(y);for(let nt=0;nt<6;nt++){const tt=nt*Math.PI/3,et=t+Math.sin(tt)*3.6,ht=e+Math.cos(tt)*3.6,pt=new A(new Gt(.12,.16,.32,12),E);pt.position.set(et,5.46,ht),pt.lookAt(t,.5,e),this.garageGroup.add(pt)}const R=new Et({color:1119264,roughness:.68,metalness:.35}),k=new Et({color:1580076,roughness:.52,metalness:.55}),F=new A(new $(28,8.5,.5),R);F.position.set(t,4.25,e-12.6),this.garageGroup.add(F),[-11,-7.5,-4,.3,4.5,8,11.5].forEach(nt=>{const tt=new A(new $(.45,8.5,.35),k);tt.position.set(nt,4.25,e-12.4),this.garageGroup.add(tt)});const H=new A(new $(27.6,.06,.08),new Nt({color:62463}));H.position.set(t,1.4,e-12.3);const O=new A(new $(27.6,.06,.08),new Nt({color:16755200}));if(O.position.set(t,5.2,e-12.3),this.garageGroup.add(H,O),typeof document<"u"){const nt=document.createElement("canvas");nt.width=1024,nt.height=256;const tt=nt.getContext("2d");if(tt){tt.fillStyle="#0a0d18",tt.fillRect(0,0,1024,256),tt.strokeStyle="#00f3ff",tt.lineWidth=6,tt.strokeRect(12,12,1e3,232),tt.strokeStyle="#ff0077",tt.lineWidth=2,tt.strokeRect(20,20,984,216),tt.fillStyle="#00f3ff",tt.font='bold 74px "Kanit", sans-serif',tt.textAlign="center",tt.shadowColor="#00f3ff",tt.shadowBlur=24,tt.fillText("⚡ ASHI MOTORSPORT ⚡",512,105),tt.shadowBlur=10,tt.shadowColor="#ffd700",tt.fillStyle="#ffd700",tt.font='600 32px "Kanit", sans-serif',tt.fillText("360° HYPER TUNING SHOWROOM • DIVISION 01",512,165),tt.shadowBlur=0,tt.fillStyle="#94a3b8",tt.font="bold 24px monospace",tt.fillText("「 アシ・レーシング • TOKYO SPEED LAB 」",512,212);const et=new Re(nt),ht=new Nt({map:et}),pt=new A(new he(8.8,2.3),ht);pt.position.set(t,5.2,e-12.3);const bt=new A(new $(9,2.5,.12),new Et({color:395280,metalness:.9,roughness:.2}));bt.position.set(t,5.2,e-12.37),this.garageGroup.add(bt,pt)}}const U=new A(new $(.5,8.5,26),R);U.position.set(t-13.5,4.25,e),this.garageGroup.add(U);const Y=new Et({color:1318962,roughness:.2,metalness:.85,transparent:!0,opacity:.75}),W=new Et({color:2238008,metalness:.8,roughness:.3}),ot=new A(new $(.18,5.8,14),Y);ot.position.set(t-13.2,3,e);const N=new A(new $(.3,6.2,14.5),W);N.position.set(t-13.2,3.2,e),this.garageGroup.add(ot,N);const D=new A(new Gt(.35,.35,14.6,24),W);if(D.position.set(t-13.1,6.5,e),this.garageGroup.add(D),typeof document<"u"){const nt=document.createElement("canvas");nt.width=512,nt.height=256;const tt=nt.getContext("2d");if(tt){tt.fillStyle="#060a14",tt.fillRect(0,0,512,256),tt.strokeStyle="#00f3ff",tt.lineWidth=4,tt.strokeRect(6,6,500,244),tt.fillStyle="#00f3ff",tt.font='bold 36px "Kanit", sans-serif',tt.fillText("BAY 01 // ACTIVE",30,60),tt.fillStyle="#10b981",tt.font="28px monospace",tt.fillText("STATUS: DYNO READY",30,110),tt.fillStyle="#f59e0b",tt.fillText("TEMP: 21°C  HUMID: 48%",30,155),tt.fillStyle="#94a3b8",tt.fillText("ECU TELEMETRY: CONNECTED",30,205);const et=new Re(nt),ht=new A(new he(2.4,1.2),new Nt({map:et}));ht.position.set(t-13.2,3.4,e-8.2),ht.rotation.y=Math.PI/2,this.garageGroup.add(ht)}}const lt=new A(new $(.5,8.5,26),R);lt.position.set(t+13.5,4.25,e),this.garageGroup.add(lt);const ut=new Et({color:14222377,metalness:.65,roughness:.25}),X=new Et({color:16316922,metalness:.95,roughness:.1}),K=new A(new $(.9,1.85,3.8),ut);K.position.set(t+12.9,.95,e-2.5),[-.8,-.4,0,.4,.8].forEach(nt=>{const tt=new A(new $(.04,.05,3.2),X);tt.position.set(t+12.43,.95+nt*.7,e-2.5),this.garageGroup.add(tt)}),this.garageGroup.add(K);const at=new A(new $(.4,.02,.55),X);at.position.set(t+12.8,1.9,e-2.5);const Q=new A(new $(.02,.35,.55),new Nt({color:62463}));Q.position.set(t+12.95,2.06,e-2.5),Q.rotation.z=-.15,this.garageGroup.add(at,Q);const dt=new Et({color:1447450,roughness:.9,metalness:.1}),vt=new Nt({color:16436245}),yt=(nt,tt,et)=>{const ht=new le;ht.position.set(nt,tt,et);const pt=new A(new Gt(.48,.48,.36,24),dt);pt.rotateZ(Math.PI/2);const bt=new A(new Te(.46,.015,8,24),vt);return bt.rotateY(Math.PI/2),bt.position.x=-.185,ht.add(pt,bt),ht};for(let nt=0;nt<4;nt++)this.garageGroup.add(yt(t+12.9,.2+nt*.38,e+2)),this.garageGroup.add(yt(t+12.9,.2+nt*.38,e+3.2));const It=new Et({color:15357964,metalness:.6,roughness:.3}),Rt=new Et({color:1579035,metalness:.7,roughness:.3}),zt=(nt,tt,et)=>{const ht=new A(new Gt(.42,.42,1.15,24),et);ht.position.set(nt,.58,tt);const pt=new A(new Te(.43,.02,8,24),X);pt.rotateX(Math.PI/2),pt.position.y=.25;const bt=pt.clone();return bt.position.y=-.25,ht.add(pt,bt),ht};this.garageGroup.add(zt(t+12.8,e-6.2,It),zt(t+12.8,e-7.2,Rt),zt(t+12,e-6.7,It));const B=new he(36,36);B.rotateX(Math.PI/2);const se=new Et({color:526866,roughness:.9,metalness:.2}),Ot=new A(B,se);Ot.position.set(t,8.2,e),this.garageGroup.add(Ot);const Bt=new Et({color:1975350,metalness:.8,roughness:.3});[-8,-3,2,7].forEach(nt=>{const tt=new A(new $(27.4,.45,.35),Bt);tt.position.set(t,7.8,e+nt),this.garageGroup.add(tt)});const wt=new le;wt.position.set(t,7.55,e);const Kt=new Nt({color:16777215}),Ct=(nt,tt,et=1.35)=>{const ht=new le;ht.position.set(nt,0,tt);for(let pt=0;pt<6;pt++){const bt=pt*Math.PI/3,gt=(pt+1)*Math.PI/3,Xt=Math.cos(bt)*et,Vt=Math.sin(bt)*et,ee=Math.cos(gt)*et,z=Math.sin(gt)*et,xt=Math.hypot(ee-Xt,z-Vt),J=new A(new $(xt,.045,.06),Kt);J.position.set((Xt+ee)/2,0,(Vt+z)/2),J.rotation.y=-Math.atan2(z-Vt,ee-Xt),ht.add(J)}return ht};wt.add(Ct(0,0,1.4));for(let nt=0;nt<6;nt++){const tt=nt*Math.PI/3;wt.add(Ct(Math.cos(tt)*2.45,Math.sin(tt)*2.45,1.4))}this.garageGroup.add(wt);const I=new Oc(16775406,1.25);this.garageGroup.add(I);const T=new cs(16777215,4.8,28,Math.PI/3.4,.45,1);T.position.set(t,6.8,e),T.target.position.set(t,.4,e),this.garageGroup.add(T),this.garageGroup.add(T.target);const q=new cs(16774634,4.2,22,Math.PI/3.2,.4,1);q.position.set(t,3.8,e+5.5),q.target.position.set(t,.4,e),this.garageGroup.add(q),this.garageGroup.add(q.target);const st=new Yr(14412542,1.15);st.position.set(t-4.5,4.2,e+4.5);const ct=new Yr(16708551,1.15);ct.position.set(t+4.5,4.2,e+4.5),this.garageGroup.add(st,ct);const it=new qr(62463,2.8,24);it.position.set(t-5.2,3,e-3.8),this.garageGroup.add(it);const Pt=new qr(16711782,2.6,24);Pt.position.set(t+5.2,3,e-3.8),this.garageGroup.add(Pt);const mt=new cs(54015,3.5,26,Math.PI/2.6,.5);mt.position.set(t,1,e-10),mt.target.position.set(t,5.2,e-12.4),this.garageGroup.add(mt),this.garageGroup.add(mt.target),this.garageGroup.visible=!1,this.scene.add(this.garageGroup)}enterGaragePreview(t,e,n,i=null){var o;this.state="GARAGE",this.garageGroup||this.setupGarageEnvironment(),this.garageGroup.visible=!0,this.playerCar&&this.playerCar.model&&(this.playerCar.model.visible=!1),this.track&&this.track.group&&(this.track.group.visible=!1),this.decorations&&this.decorations.group&&(this.decorations.group.visible=!1),this.prevSceneBackground||(this.prevSceneBackground=this.scene.background,this.prevSceneFog=this.scene.fog),this.scene.background=new Wt(790298),this.scene.fog=new nr(790298,.006),this.garageCarMesh&&(this.scene.remove(this.garageCarMesh.root),this.garageCarMesh=null);const r=i||((o=this.ui)==null?void 0:o.currentAddons);this.garageCarMesh=this.carBuilder.createCar(t,e,n,!1,r),this.garageCarMesh.root.position.set(.3,.25,0),this.scene.add(this.garageCarMesh.root),this.updateGarageCamera(.016)}updateGarageSkin(t){if(this.state!=="GARAGE")return;const e=this.ui.getSelectedCar();this.enterGaragePreview(e.id,t,this.ui.currentColor,this.ui.currentAddons)}updateGarageColor(t){if(this.state!=="GARAGE")return;const e=this.ui.getSelectedCar();this.enterGaragePreview(e.id,this.ui.getSelectedSkinFile(),t,this.ui.currentAddons)}updateGarageAddons(t){if(this.state!=="GARAGE")return;const e=this.ui.getSelectedCar();this.enterGaragePreview(e.id,this.ui.getSelectedSkinFile(),this.ui.currentColor,t)}exitGaragePreview(){this.garageCarMesh&&(this.scene.remove(this.garageCarMesh.root),this.garageCarMesh=null),this.garageGroup&&(this.garageGroup.visible=!1),this.track&&this.track.group&&(this.track.group.visible=!0),this.decorations&&this.decorations.group&&(this.decorations.group.visible=!0),this.prevSceneBackground&&(this.scene.background=this.prevSceneBackground,this.scene.fog=this.prevSceneFog,this.prevSceneBackground=null,this.prevSceneFog=null);const t=this.ui.getPlayerConfig(),e=ce.find(n=>n.id===t.carId)||ce[0];this.setupPlayerCar(e,t.skinFileName,t.color,t.addons),this.positionCarAtStart(this.playerCar,0),this.playerCar&&this.playerCar.model&&(this.playerCar.model.visible=!0),this.state="MENU"}updateGarageCamera(t){this.garageAutoSpin&&!this.garageIsDragging&&(this.garageTargetAngle+=t*.32),this.garageAngle=en.damp(this.garageAngle,this.garageTargetAngle,12,t),this.garagePitch=en.damp(this.garagePitch,this.garageTargetPitch,12,t),this.garageDistance=en.damp(this.garageDistance,this.garageTargetDistance,12,t);const e=.3,n=.72,i=0,r=this.garageDistance*Math.cos(this.garagePitch),o=n+this.garageDistance*Math.sin(this.garagePitch),a=e+Math.sin(this.garageAngle)*r,c=i+Math.cos(this.garageAngle)*r;this.camera.position.set(a,o,c),this.camera.lookAt(e,n,i),this.garageCarMesh&&this.garageCarMesh.root&&this.garageCarMesh.root.position.set(e,.25,i)}toggleGarageAutoSpin(){return this.garageAutoSpin=!this.garageAutoSpin,this.garageAutoSpin}rotateGarageBy(t){this.garageTargetAngle+=t}zoomGarageBy(t){this.garageTargetDistance=Math.max(2.8,Math.min(10.5,this.garageTargetDistance+t))}setGarageCameraAngle(t,e=null,n=null){this.garageTargetAngle=t,e!==null&&(this.garageTargetPitch=e),n!==null&&(this.garageTargetDistance=n)}animate(){requestAnimationFrame(()=>this.animate());const t=Math.min(this.clock.getDelta(),.08);if(this.state==="GARAGE"){this.updateGarageCamera(t),this.renderer.render(this.scene,this.camera);return}if(this.state==="MENU"||this.state==="STAGE_SELECT"||this.state==="LOBBY"){const e=performance.now()*3e-4,n=Math.cos(e)*45,i=Math.sin(e)*45+20;this.camera.position.set(n,15,i),this.camera.lookAt(0,2,20),this.decorations&&this.decorations.update(t,this.camera),this.renderer.render(this.scene,this.camera);return}if(this.state==="GRID_INTRO"){this.updateGridIntro(t),this.track&&this.track.update(t),this.decorations&&this.decorations.update(t,this.camera),this.particles&&this.particles.update(t,this.camera),this.renderer.render(this.scene,this.camera);return}this.state==="RACING"?this.updateRace(t):this.state==="VICTORY"&&this.updateVictoryScene(t),this.track&&this.track.update(t),this.decorations&&this.decorations.update(t,this.camera),this.particles&&this.particles.update(t,this.camera),this.renderer.render(this.scene,this.camera)}updateRace(t){if(!this.isRacing){this.playerCar&&(this.playerCar.inputs.throttle=0,this.playerCar.inputs.steer=0,this.playerCar.inputs.boost=!1,this.playerCar.inputs.drift=!1,this.playerCar.speed=0,this.playerCar.updateVisuals(t)),this.aiCars.forEach(r=>{r.inputs.throttle=0,r.inputs.steer=0,r.inputs.boost=!1,r.inputs.drift=!1,r.speed=0,r.updateVisuals(t)}),this.audio.updateEngine(0,0,!1,!1),this.updateCamera(t);return}if(this.updatePlayerInputs(),this.playerCar.update(t,this.track),this.audio.updateEngine(this.playerCar.getSpeedKmh(),this.playerCar.inputs.throttle,this.playerCar.isDrifting,this.playerCar.boostTimer>0),this.playerCar.boostTimer>1.95&&this.playerCar.inputs.boost&&(this.audio.playBoostSound(),this.hud.showReaction("🚀 บูสต์ติดจรวด!",1200)),this.playerCar.isDrifting){const r=this.playerCar.position.clone().add(new P(-.6,.1,-1).applyAxisAngle(new P(0,1,0),this.playerCar.rotationY)),o=this.playerCar.position.clone().add(new P(.6,.1,-1).applyAxisAngle(new P(0,1,0),this.playerCar.rotationY));this.particles.emitTireSmoke(r),this.particles.emitTireSmoke(o),this.playerCar.driftLevel>0&&(this.particles.emitDriftSparks(r,this.playerCar.driftLevel),this.particles.emitDriftSparks(o,this.playerCar.driftLevel))}this.playerCar.boostTimer>0&&this.playerCar.exhaustPipes&&this.particles.emitExhaustFlame(this.playerCar.exhaustPipes,!0);const e=[this.playerCar,...this.aiCars,...Array.from(this.remotePlayers.values()).map(r=>r.car)];if(this.aiCars.forEach(r=>{r.updateAI(t,this.track,this.playerCar,e),r.isDrifting&&this.particles.emitTireSmoke(r.position)}),this.resolveCarCollisions(t),this.remotePlayers.forEach(r=>{r.car.position.lerp(r.targetPos,t*15),r.car.rotationY=en.lerp(r.car.rotationY,r.targetRotY,t*15),r.car.updateVisuals(t)}),this.items){const r=[...this.aiCars,...Array.from(this.remotePlayers.values()).map(o=>o.car)];this.items.update(t,this.playerCar,r)}if(this.gameMode==="multiplayer"&&this.isRacing){const r=performance.now();(!this.lastNetPacket||r-this.lastNetPacket>40)&&(this.lastNetPacket=r,this.multiplayer.sendTransform({x:this.playerCar.position.x,y:this.playerCar.position.y,z:this.playerCar.position.z,rotY:this.playerCar.rotationY,speed:this.playerCar.speed,isDrifting:this.playerCar.isDrifting,boostTimer:this.playerCar.boostTimer,lap:this.playerCar.lap,totalDistance:this.playerCar.totalDistance,isFinished:this.playerCar.isFinished}))}const n=[{name:this.ui.playerName,car:this.playerCar,isPlayer:!0,carName:this.playerCar.config.nameTh,skinFileName:this.playerCar.skinFileName},...this.aiCars.map(r=>({name:r.name,car:r,isPlayer:!1,carName:r.config.nameTh,skinFileName:r.skinFileName})),...Array.from(this.remotePlayers.values()).map(r=>({name:r.name,car:r.car,isPlayer:!1,carName:r.car.config.nameTh,skinFileName:r.skinFileName}))];n.sort((r,o)=>o.car.totalDistance-r.car.totalDistance);const i=n.findIndex(r=>r.isPlayer)+1;if(this.hud.update(this.playerCar,i,n.length),this.minimap&&this.minimap.render(this.playerCar,n.filter(r=>!r.isPlayer).map(r=>r.car)),this.playerCar.isFinished&&this.state!=="VICTORY"){this.state="VICTORY",this.audio.playVictoryChime();const r=(performance.now()-this.raceStartTime)/1e3,o=n.map(a=>({name:a.name,carName:a.carName,skinFileName:a.skinFileName,isPlayer:a.isPlayer,totalTime:a.isPlayer?r:r+(Math.random()*4-2),bestLap:a.car.bestLapTime||r/3}));setTimeout(()=>{this.ui.showVictoryScreen(o)},1500)}this.updateCamera(t)}resolveCarCollisions(t){if(!this.isRacing)return;const e=[this.playerCar,...this.aiCars],i=2.1*2;for(let r=0;r<e.length;r++)for(let o=r+1;o<e.length;o++){const a=e[r],c=e[o];if(!a||!c)continue;const l=new P().subVectors(a.position,c.position);l.y=0;const h=l.length();if(h>.001&&h<i){const d=i-h,u=l.normalize();a.position.addScaledVector(u,d*.5),c.position.addScaledVector(u,-d*.5);const f=performance.now(),g=a.lastCarHitTime||0,_=c.lastCarHitTime||0;if(f-g>400&&f-_>400){if(a.lastCarHitTime=f,c.lastCarHitTime=f,a.speed=Math.max(0,a.speed*.52),c.speed=Math.max(0,c.speed*.52),a.boostTimer=0,c.boostTimer=0,this.audio&&this.audio.playCollision(),this.particles){const m=new P().addVectors(a.position,c.position).multiplyScalar(.5);this.particles.emitDriftSparks(m,2)}(a.isPlayer||c.isPlayer)&&this.hud&&this.hud.showReaction("💥 ชนกับคู่แข่ง! ความเร็วตกฮวบ",1200)}}}}updateVictoryScene(t){if(!this.playerCar)return;this.playerCar.speed>0&&(this.playerCar.speed=Math.max(0,this.playerCar.speed-22*t),this.playerCar.updatePhysics(t,this.track)),this.playerCar.updateVisuals(t),this.aiCars.forEach(r=>{r.speed>0&&(r.speed=Math.max(0,r.speed-22*t),r.updatePhysics(t,this.track)),r.updateVisuals(t)}),this.victoryCameraAngle=(this.victoryCameraAngle||0)+t*.32;const e=this.playerCar.position,n=8.5;if(this.camera.position.set(e.x+Math.sin(this.victoryCameraAngle)*n,e.y+3,e.z+Math.cos(this.victoryCameraAngle)*n),this.camera.lookAt(e.x,e.y+.9,e.z),this.victoryFireworkTimer=(this.victoryFireworkTimer||0)+t,this.victoryFireworkTimer>.4&&(this.victoryFireworkTimer=0,this.particles)){const r=new P((Math.random()-.5)*16,4+Math.random()*4.5,(Math.random()-.5)*16);this.particles.emitCelebrationFirework(e.clone().add(r))}}updateCamera(t){if(!this.playerCar)return;const e=this.playerCar.position,n=this.playerCar.rotationY;let i=this.cameraOffset,r=this.cameraLookOffset;this.cameraMode===1?(i=new P(0,2.5,-5),r=new P(0,1,3.5)):this.cameraMode===2&&(i=new P(0,1.2,.4),r=new P(0,1.1,12));const o=Math.min(1,Math.abs(this.playerCar.speed)/55),a=this.playerCar.boostTimer>0?14:0,c=65+o*16+a;this.camera.fov=en.lerp(this.camera.fov,c,t*6),this.camera.updateProjectionMatrix();const l=i.clone().applyAxisAngle(new P(0,1,0),n),h=e.clone().add(l);this.camera.position.lerp(h,t*12);const d=r.clone().applyAxisAngle(new P(0,1,0),n),u=e.clone().add(d);this.camera.lookAt(u)}initInputs(){window.addEventListener("keydown",e=>{if(this.keys[e.code]=!0,this.state==="GRID_INTRO"&&(e.code==="Space"||e.code==="Enter"||e.code==="Escape")){this.finishGridIntro();return}if(e.code==="KeyC"){this.cameraMode=(this.cameraMode+1)%3;const n=["กล้อง: ตามหลังมุมกว้าง","กล้อง: ระยะประชิด","กล้อง: หน้ารถ"];this.hud.showReaction(n[this.cameraMode],1200)}(e.code==="KeyQ"||e.code==="KeyF")&&this.state==="RACING"&&this.items&&this.items.useItem(this.playerCar),e.code==="KeyR"&&this.state==="RACING"&&(this.playerCar.respawn(this.track),this.hud.showReaction("🔄 รีเซ็ตรถกลับแทร็ก!",1200))}),window.addEventListener("keyup",e=>{this.keys[e.code]=!1});const t=(e,n)=>{const i=document.getElementById(e);i&&(i.addEventListener("touchstart",r=>{r.preventDefault(),this.keys[n]=!0}),i.addEventListener("touchend",r=>{r.preventDefault(),this.keys[n]=!1}),i.addEventListener("mousedown",()=>{this.keys[n]=!0}),i.addEventListener("mouseup",()=>{this.keys[n]=!1}))};t("btn-touch-gas","KeyW"),t("btn-touch-brake","KeyS"),t("btn-touch-left","KeyA"),t("btn-touch-right","KeyD"),t("btn-touch-drift","Space"),t("btn-touch-boost","ShiftLeft"),t("btn-touch-item","KeyQ"),window.addEventListener("pointerdown",e=>{this.state==="GARAGE"&&(e.target.closest(".garage-console")||e.target.closest(".garage-topbar")||e.target.closest(".garage-turntable-controls")||e.target.closest("button")||e.target.closest("input")||e.target.closest(".color-swatch")||e.target.closest(".addon-pill")||e.target.closest(".skin-card")||(this.garageIsDragging=!0,this.garageDragPrevX=e.clientX,this.garageDragPrevY=e.clientY))}),window.addEventListener("pointermove",e=>{if(this.state!=="GARAGE"||!this.garageIsDragging)return;const n=e.clientX-this.garageDragPrevX,i=e.clientY-this.garageDragPrevY;this.garageDragPrevX=e.clientX,this.garageDragPrevY=e.clientY,this.garageTargetAngle-=n*.0075,this.garageTargetPitch=Math.max(-.06,Math.min(1.22,this.garageTargetPitch+i*.0065))}),window.addEventListener("pointerup",()=>{this.garageIsDragging=!1}),window.addEventListener("pointercancel",()=>{this.garageIsDragging=!1}),window.addEventListener("wheel",e=>{this.state==="GARAGE"&&(e.target.closest(".garage-tab-scroll")||e.target.closest(".skins-scroll-grid")||(e.preventDefault(),this.zoomGarageBy(e.deltaY*.005)))},{passive:!1})}updatePlayerInputs(){let t=0,e=0;(this.keys.KeyW||this.keys.ArrowUp)&&(t+=1),(this.keys.KeyS||this.keys.ArrowDown)&&(t-=1),(this.keys.KeyA||this.keys.ArrowLeft)&&(e+=1),(this.keys.KeyD||this.keys.ArrowRight)&&(e-=1);const n=navigator.getGamepads?navigator.getGamepads():[];if(n&&n[0]){const i=n[0];Math.abs(i.axes[0])>.15&&(e-=i.axes[0]),i.buttons[7]&&i.buttons[7].value>.1&&(t+=i.buttons[7].value),i.buttons[6]&&i.buttons[6].value>.1&&(t-=i.buttons[6].value),i.buttons[0]&&i.buttons[0].pressed&&(this.keys.ShiftLeft=!0),i.buttons[2]&&i.buttons[2].pressed&&(this.keys.Space=!0),i.buttons[1]&&i.buttons[1].pressed&&this.items&&this.items.useItem(this.playerCar)}this.playerCar.inputs.throttle=t,this.playerCar.inputs.steer=e,this.playerCar.inputs.drift=!!this.keys.Space,this.playerCar.inputs.boost=!!(this.keys.ShiftLeft||this.keys.ShiftRight||this.keys.KeyE)}restartRace(){this.startSinglePlayer(this.gameMode,this.currentTrackId,this.currentDifficulty,this.currentLaps)}exitToMainMenu(){this.audio&&this.audio.stopSpeech&&this.audio.stopSpeech(),this.clearOpponents(),this.state="MENU",this.audio.updateEngine(0,0,!1,!1),this.positionCarAtStart(this.playerCar,0)}onWindowResize(){!this.camera||!this.renderer||(this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight))}}window.addEventListener("DOMContentLoaded",()=>{const s=new Qg;window.game=s;const e=new URLSearchParams(window.location.search).get("room");e&&setTimeout(()=>{if(confirm(`คุณต้องการเข้าร่วมห้อง "${e.toUpperCase()}" ใช่หรือไม่?`)){const i=s.ui.getPlayerConfig();s.multiplayer.joinRoom(e,i,r=>{s.ui.setupLobbyView(r,!1)},r=>{alert("ไม่สามารถเชื่อมต่อห้องได้: "+r.message)})}},500)});
