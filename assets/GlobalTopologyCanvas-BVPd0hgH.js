import{r as De,g as wS,j as Mt}from"./index-CVzF27pU.js";/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ml="187",Ts={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},As={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},fv=0,sp=1,dv=2,ES=3,pv=0,Vo=1,Ha=2,Rs=3,$r=0,Jn=1,lr=2,Ns=0,Go=1,op=2,ap=3,lp=4,mv=5,bS=6,Cs=100,gv=101,_v=102,vv=103,xv=104,yv=200,Sv=201,Mv=202,wv=203,Ep=204,bp=205,Ev=206,bv=207,Tv=208,Av=209,Cv=210,Rv=211,Pv=212,Iv=213,Lv=214,Tu=0,Au=1,Cu=2,Xo=3,Ru=4,Pu=5,Iu=6,Lu=7,gl=0,Nv=1,Dv=2,Gi=0,Tp=1,Ap=2,Cp=3,vh=4,Rp=5,Pp=6,Ip=7,cp="attached",Uv="detached",xh=300,Nr=301,Fs=302,Va=303,Ga=304,Qa=1e3,oi=1001,$a=1002,hn=1003,Lp=1004,TS=1004,Fo=1005,AS=1005,rn=1006,Wa=1007,CS=1007,Hi=1008,RS=1008,qn=1009,Np=1010,Dp=1011,Yo=1012,yh=1013,Pi=1014,Zn=1015,Wi=1016,Sh=1017,Mh=1018,Bs=1020,Up=35902,Op=35899,Fp=1021,Bp=1022,jn=1023,Dr=1026,Pr=1027,wh=1028,_l=1029,es=1030,Eh=1031,PS=1032,bh=1033,Xa=33776,Ya=33777,qa=33778,Za=33779,Nu=35840,Du=35841,Uu=35842,Ou=35843,Fu=36196,Bu=37492,zu=37496,ku=37488,Hu=37489,el=37490,Vu=37491,Gu=37808,Wu=37809,Xu=37810,Yu=37811,qu=37812,Zu=37813,ju=37814,Ju=37815,Ku=37816,Qu=37817,$u=37818,eh=37819,th=37820,nh=37821,ih=36492,rh=36494,sh=36495,oh=36283,ah=36284,tl=36285,lh=36286,Ov=2200,Fv=2201,Bv=2202,nl=2300,ch=2301,Su=2302,up=2303,Ps=2400,Is=2401,il=2402,Th=2500,zp=2501,IS=0,LS=1,NS=2,zv=3200,DS=3201,US=3202,OS=3203,Ur=0,kv=1,Cr="",ri="srgb",rl="srgb-linear",sl="linear",Wt="srgb",FS="",BS="rg",zS="ga",kS=0,Mu=7680,HS=7681,VS=7682,GS=7683,WS=34055,XS=34056,YS=5386,qS=512,ZS=513,jS=514,JS=515,KS=516,QS=517,$S=518,Hv=519,Vv=512,Gv=513,Wv=514,kp=515,Xv=516,Yv=517,Hp=518,Vp=519,Ah=35044,eM=35048,tM=35040,nM=35045,iM=35049,rM=35041,sM=35046,oM=35050,aM=35042,lM="100",hp="300 es",gi=2e3,zs=2001,cM={COMPUTE:"compute",RENDER:"render"},uM={PERSPECTIVE:"perspective",LINEAR:"linear",FLAT:"flat"},hM={NORMAL:"normal",CENTROID:"centroid",SAMPLE:"sample",FIRST:"first",EITHER:"either"},fM={TEXTURE_COMPARE:"depthTextureCompare"},dM={NONE:0,SHARED:1,FULL:2};function pM(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}const mM={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function Bo(r,e){return new mM[r](e)}function qv(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function ol(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Zv(){const r=ol("canvas");return r.style.display="block",r}const r0={};let ts=null;function gM(r){ts=r}function _M(){return ts}function al(...r){const e="THREE."+r.shift();ts?ts("log",e,...r):console.log(e,...r)}function jv(r){const e=r[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=r[1];t&&t.isStackTrace?r[0]+=" "+t.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function Be(...r){r=jv(r);const e="THREE."+r.shift();if(ts)ts("warn",e,...r);else{const t=r[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...r)}}function nt(...r){r=jv(r);const e="THREE."+r.shift();if(ts)ts("error",e,...r);else{const t=r[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...r)}}function Ir(...r){const e=r.join(" ");e in r0||(r0[e]=!0,Be(...r))}function vM(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const xM={[Tu]:Tu,[Cu]:Iu,[Ru]:Ru,[Xo]:Pu,[Au]:Au,[Iu]:Cu,[Lu]:Lu,[Pu]:Xo};let Yi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}};const zn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let s0=1234567;const Ds=Math.PI/180,qo=180/Math.PI;function Ii(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(zn[r&255]+zn[r>>8&255]+zn[r>>16&255]+zn[r>>24&255]+"-"+zn[e&255]+zn[e>>8&255]+"-"+zn[e>>16&15|64]+zn[e>>24&255]+"-"+zn[t&63|128]+zn[t>>8&255]+"-"+zn[t>>16&255]+zn[t>>24&255]+zn[n&255]+zn[n>>8&255]+zn[n>>16&255]+zn[n>>24&255]).toLowerCase()}function dt(r,e,t){return Math.max(e,Math.min(t,r))}function Gp(r,e){return(r%e+e)%e}function yM(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function SM(r,e,t){return r!==e?(t-r)/(e-r):0}function ja(r,e,t){return(1-t)*r+t*e}function MM(r,e,t,n){return ja(r,e,1-Math.exp(-t*n))}function wM(r,e=1){return e-Math.abs(Gp(r,e*2)-e)}function EM(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function bM(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function TM(r,e){return r+Math.floor(Math.random()*(e-r+1))}function AM(r,e){return r+Math.random()*(e-r)}function CM(r){return r*(.5-Math.random())}function RM(r){r!==void 0&&(s0=r);let e=s0+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function PM(r){return r*Ds}function IM(r){return r*qo}function LM(r){return r>0&&Number.isInteger(r)&&2**Math.round(Math.log2(r))===r}function NM(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Jv(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function DM(r,e,t,n,i){const s=Math.cos,o=Math.sin,c=s(t/2),u=o(t/2),h=s((e+n)/2),f=o((e+n)/2),p=s((e-n)/2),m=o((e-n)/2),g=s((n-e)/2),v=o((n-e)/2);switch(i){case"XYX":r.set(c*f,u*p,u*m,c*h);break;case"YZY":r.set(u*m,c*f,u*p,c*h);break;case"ZXZ":r.set(u*p,u*m,c*f,c*h);break;case"XZX":r.set(c*f,u*v,u*g,c*h);break;case"YXY":r.set(u*g,c*f,u*v,c*h);break;case"ZYZ":r.set(u*v,u*g,c*f,c*h);break;default:Be("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Ch(r){switch(r.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Ls(r,e){if(e.constructor===Float32Array)return r;const t=Ch(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(r/t,-1)}function Vn(r,e){if(e.constructor===Float32Array)return r;const t=Ch(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(r*t)}const Kv={DEG2RAD:Ds,RAD2DEG:qo,generateUUID:Ii,clamp:dt,euclideanModulo:Gp,mapLinear:yM,inverseLerp:SM,lerp:ja,damp:MM,pingpong:wM,smoothstep:EM,smootherstep:bM,randInt:TM,randFloat:AM,randFloatSpread:CM,seededRandom:RM,degToRad:PM,radToDeg:IM,isPowerOfTwo:LM,ceilPowerOfTwo:NM,floorPowerOfTwo:Jv,setQuaternionFromProperEuler:DM,normalize:Vn,denormalize:Ls},wm=class wm{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(dt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(dt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};wm.prototype.isVector2=!0;let me=wm;class Nn{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,c){let u=n[i+0],h=n[i+1],f=n[i+2],p=n[i+3],m=s[o+0],g=s[o+1],v=s[o+2],M=s[o+3];if(p!==M||u!==m||h!==g||f!==v){let y=u*m+h*g+f*v+p*M;y<0&&(m=-m,g=-g,v=-v,M=-M,y=-y);let x=1-c;if(y<.9995){const w=Math.acos(y),b=Math.sin(w);x=Math.sin(x*w)/b,c=Math.sin(c*w)/b,u=u*x+m*c,h=h*x+g*c,f=f*x+v*c,p=p*x+M*c}else{u=u*x+m*c,h=h*x+g*c,f=f*x+v*c,p=p*x+M*c;const w=1/Math.sqrt(u*u+h*h+f*f+p*p);u*=w,h*=w,f*=w,p*=w}}e[t]=u,e[t+1]=h,e[t+2]=f,e[t+3]=p}static multiplyQuaternionsFlat(e,t,n,i,s,o){const c=n[i],u=n[i+1],h=n[i+2],f=n[i+3],p=s[o],m=s[o+1],g=s[o+2],v=s[o+3];return e[t]=c*v+f*p+u*g-h*m,e[t+1]=u*v+f*m+h*p-c*g,e[t+2]=h*v+f*g+c*m-u*p,e[t+3]=f*v-c*p-u*m-h*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,c=Math.cos,u=Math.sin,h=c(n/2),f=c(i/2),p=c(s/2),m=u(n/2),g=u(i/2),v=u(s/2);switch(o){case"XYZ":this._x=m*f*p+h*g*v,this._y=h*g*p-m*f*v,this._z=h*f*v+m*g*p,this._w=h*f*p-m*g*v;break;case"YXZ":this._x=m*f*p+h*g*v,this._y=h*g*p-m*f*v,this._z=h*f*v-m*g*p,this._w=h*f*p+m*g*v;break;case"ZXY":this._x=m*f*p-h*g*v,this._y=h*g*p+m*f*v,this._z=h*f*v+m*g*p,this._w=h*f*p-m*g*v;break;case"ZYX":this._x=m*f*p-h*g*v,this._y=h*g*p+m*f*v,this._z=h*f*v-m*g*p,this._w=h*f*p+m*g*v;break;case"YZX":this._x=m*f*p+h*g*v,this._y=h*g*p+m*f*v,this._z=h*f*v-m*g*p,this._w=h*f*p-m*g*v;break;case"XZY":this._x=m*f*p-h*g*v,this._y=h*g*p-m*f*v,this._z=h*f*v+m*g*p,this._w=h*f*p+m*g*v;break;default:Be("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],c=t[5],u=t[9],h=t[2],f=t[6],p=t[10],m=n+c+p;if(m>0){const g=.5/Math.sqrt(m+1);this._w=.25/g,this._x=(f-u)*g,this._y=(s-h)*g,this._z=(o-i)*g}else if(n>c&&n>p){const g=2*Math.sqrt(1+n-c-p);this._w=(f-u)/g,this._x=.25*g,this._y=(i+o)/g,this._z=(s+h)/g}else if(c>p){const g=2*Math.sqrt(1+c-n-p);this._w=(s-h)/g,this._x=(i+o)/g,this._y=.25*g,this._z=(u+f)/g}else{const g=2*Math.sqrt(1+p-n-c);this._w=(o-i)/g,this._x=(s+h)/g,this._y=(u+f)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(dt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,c=t._x,u=t._y,h=t._z,f=t._w;return this._x=n*f+o*c+i*h-s*u,this._y=i*f+o*u+s*c-n*h,this._z=s*f+o*h+n*u-i*c,this._w=o*f-n*c-i*u-s*h,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,s=e._z,o=e._w,c=this.dot(e);c<0&&(n=-n,i=-i,s=-s,o=-o,c=-c);let u=1-t;if(c<.9995){const h=Math.acos(c),f=Math.sin(h);u=Math.sin(u*h)/f,t=Math.sin(t*h)/f,this._x=this._x*u+n*t,this._y=this._y*u+i*t,this._z=this._z*u+s*t,this._w=this._w*u+o*t,this._onChangeCallback()}else this._x=this._x*u+n*t,this._y=this._y*u+i*t,this._z=this._z*u+s*t,this._w=this._w*u+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Em=class Em{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(o0.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(o0.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,c=e.z,u=e.w,h=2*(o*i-c*n),f=2*(c*t-s*i),p=2*(s*n-o*t);return this.x=t+u*h+o*p-c*f,this.y=n+u*f+c*h-s*p,this.z=i+u*p+s*f-o*h,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this.z=dt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this.z=dt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(dt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,c=t.y,u=t.z;return this.x=i*u-s*c,this.y=s*o-n*u,this.z=n*c-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ad.copy(this).projectOnVector(e),this.sub(ad)}reflect(e){return this.sub(ad.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(dt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Em.prototype.isVector3=!0;let O=Em;const ad=new O,o0=new Nn,bm=class bm{constructor(e,t,n,i,s,o,c,u,h){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,c,u,h)}set(e,t,n,i,s,o,c,u,h){const f=this.elements;return f[0]=e,f[1]=i,f[2]=c,f[3]=t,f[4]=s,f[5]=u,f[6]=n,f[7]=o,f[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],c=n[3],u=n[6],h=n[1],f=n[4],p=n[7],m=n[2],g=n[5],v=n[8],M=i[0],y=i[3],x=i[6],w=i[1],b=i[4],T=i[7],P=i[2],R=i[5],E=i[8];return s[0]=o*M+c*w+u*P,s[3]=o*y+c*b+u*R,s[6]=o*x+c*T+u*E,s[1]=h*M+f*w+p*P,s[4]=h*y+f*b+p*R,s[7]=h*x+f*T+p*E,s[2]=m*M+g*w+v*P,s[5]=m*y+g*b+v*R,s[8]=m*x+g*T+v*E,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],c=e[5],u=e[6],h=e[7],f=e[8];return t*o*f-t*c*h-n*s*f+n*c*u+i*s*h-i*o*u}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],c=e[5],u=e[6],h=e[7],f=e[8],p=f*o-c*h,m=c*u-f*s,g=h*s-o*u,v=t*p+n*m+i*g;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/v;return e[0]=p*M,e[1]=(i*h-f*n)*M,e[2]=(c*n-i*o)*M,e[3]=m*M,e[4]=(f*t-i*u)*M,e[5]=(i*s-c*t)*M,e[6]=g*M,e[7]=(n*u-h*t)*M,e[8]=(o*t-n*s)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,c){const u=Math.cos(s),h=Math.sin(s);return this.set(n*u,n*h,-n*(u*o+h*c)+o+e,-i*h,i*u,-i*(-h*o+u*c)+c+t,0,0,1),this}scale(e,t){return Ir("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ld.makeScale(e,t)),this}rotate(e){return Ir("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ld.makeRotation(-e)),this}translate(e,t){return Ir("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ld.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};bm.prototype.isMatrix3=!0;let _t=bm;const ld=new _t,a0=new _t().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),l0=new _t().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function UM(){const r={enabled:!0,workingColorSpace:rl,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===Wt&&(i.r=Lr(i.r),i.g=Lr(i.g),i.b=Lr(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Wt&&(i.r=Wo(i.r),i.g=Wo(i.g),i.b=Wo(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Cr?sl:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[o].fromXYZ).multiply(this.spaces[s].toXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[rl]:{primaries:e,whitePoint:n,transfer:sl,toXYZ:a0,fromXYZ:l0,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ri},outputColorSpaceConfig:{drawingBufferColorSpace:ri}},[ri]:{primaries:e,whitePoint:n,transfer:Wt,toXYZ:a0,fromXYZ:l0,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ri}}}),r}const Dt=UM();function Lr(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Wo(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let fo;class Qv{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{fo===void 0&&(fo=ol("canvas")),fo.width=e.width,fo.height=e.height;const i=fo.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=fo}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ol("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Lr(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Lr(t[n]/255)*255):t[n]=Lr(t[n]);return{data:t,width:e.width,height:e.height}}else return Be("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let OM=0;class ur{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:OM++}),this.uuid=Ii(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,c=i.length;o<c;o++)i[o].isDataTexture?s.push(cd(i[o].image)):s.push(cd(i[o]))}else s=cd(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function cd(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Qv.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(Be("Texture: Unable to serialize Texture."),{})}class FM extends ur{constructor(e=null){Ir('Source: "Source" has been renamed to "TextureSource". Please update your code to use "THREE.TextureSource" instead.'),super(e),this.isSource=!0}}let BM=0;const ud=new O;class sn extends Yi{constructor(e=sn.DEFAULT_IMAGE,t=sn.DEFAULT_MAPPING,n=oi,i=oi,s=rn,o=Hi,c=jn,u=qn,h=sn.DEFAULT_ANISOTROPY,f=Cr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:BM++}),this.uuid=Ii(),this.name="",this.source=new ur(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=h,this.format=c,this.internalFormat=null,this.type=u,this.offset=new me(0,0),this.repeat=new me(1,1),this.center=new me(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new _t,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(ud).x}get height(){return this.source.getSize(ud).y}get depth(){return this.source.getSize(ud).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Be(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Be(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==xh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Qa:e.x=e.x-Math.floor(e.x);break;case oi:e.x=e.x<0?0:1;break;case $a:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Qa:e.y=e.y-Math.floor(e.y);break;case oi:e.y=e.y<0?0:1;break;case $a:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}sn.DEFAULT_IMAGE=null;sn.DEFAULT_MAPPING=xh;sn.DEFAULT_ANISOTROPY=1;const Tm=class Tm{constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const u=e.elements,h=u[0],f=u[4],p=u[8],m=u[1],g=u[5],v=u[9],M=u[2],y=u[6],x=u[10];if(Math.abs(f-m)<.01&&Math.abs(p-M)<.01&&Math.abs(v-y)<.01){if(Math.abs(f+m)<.1&&Math.abs(p+M)<.1&&Math.abs(v+y)<.1&&Math.abs(h+g+x-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(h+1)/2,T=(g+1)/2,P=(x+1)/2,R=(f+m)/4,E=(p+M)/4,C=(v+y)/4;return b>T&&b>P?b<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(b),i=R/n,s=E/n):T>P?T<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(T),n=R/i,s=C/i):P<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(P),n=E/s,i=C/s),this.set(n,i,s,t),this}let w=Math.sqrt((y-v)*(y-v)+(p-M)*(p-M)+(m-f)*(m-f));return Math.abs(w)<.001&&(w=1),this.x=(y-v)/w,this.y=(p-M)/w,this.z=(m-f)/w,this.w=Math.acos((h+g+x-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this.z=dt(this.z,e.z,t.z),this.w=dt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this.z=dt(this.z,e,t),this.w=dt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(dt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Tm.prototype.isVector4=!0;let Ot=Tm;class Wp extends Yi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:rn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Ot(0,0,e,t),this.scissorTest=!1,this.viewport=new Ot(0,0,e,t),this.textures=[];const i=n.count;for(let s=0;s<i;s++)this.textures[s]=new sn({width:e,height:t,depth:n.depth}),this.textures[s].isRenderTargetTexture=!0,this.textures[s].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:rn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new ur(i)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class vi extends Wp{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Rh extends sn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=hn,this.minFilter=hn,this.wrapR=oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class zM extends vi{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new Rh(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}}class Ph extends sn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=hn,this.minFilter=hn,this.wrapR=oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class kM extends vi{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGL3DRenderTarget=!0,this.depth=n,this.texture=new Ph(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}}const _h=class _h{constructor(e,t,n,i,s,o,c,u,h,f,p,m,g,v,M,y){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,c,u,h,f,p,m,g,v,M,y)}set(e,t,n,i,s,o,c,u,h,f,p,m,g,v,M,y){const x=this.elements;return x[0]=e,x[4]=t,x[8]=n,x[12]=i,x[1]=s,x[5]=o,x[9]=c,x[13]=u,x[2]=h,x[6]=f,x[10]=p,x[14]=m,x[3]=g,x[7]=v,x[11]=M,x[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new _h().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,i=1/po.setFromMatrixColumn(e,0).length(),s=1/po.setFromMatrixColumn(e,1).length(),o=1/po.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),c=Math.sin(n),u=Math.cos(i),h=Math.sin(i),f=Math.cos(s),p=Math.sin(s);if(e.order==="XYZ"){const m=o*f,g=o*p,v=c*f,M=c*p;t[0]=u*f,t[4]=-u*p,t[8]=h,t[1]=g+v*h,t[5]=m-M*h,t[9]=-c*u,t[2]=M-m*h,t[6]=v+g*h,t[10]=o*u}else if(e.order==="YXZ"){const m=u*f,g=u*p,v=h*f,M=h*p;t[0]=m+M*c,t[4]=v*c-g,t[8]=o*h,t[1]=o*p,t[5]=o*f,t[9]=-c,t[2]=g*c-v,t[6]=M+m*c,t[10]=o*u}else if(e.order==="ZXY"){const m=u*f,g=u*p,v=h*f,M=h*p;t[0]=m-M*c,t[4]=-o*p,t[8]=v+g*c,t[1]=g+v*c,t[5]=o*f,t[9]=M-m*c,t[2]=-o*h,t[6]=c,t[10]=o*u}else if(e.order==="ZYX"){const m=o*f,g=o*p,v=c*f,M=c*p;t[0]=u*f,t[4]=v*h-g,t[8]=m*h+M,t[1]=u*p,t[5]=M*h+m,t[9]=g*h-v,t[2]=-h,t[6]=c*u,t[10]=o*u}else if(e.order==="YZX"){const m=o*u,g=o*h,v=c*u,M=c*h;t[0]=u*f,t[4]=M-m*p,t[8]=v*p+g,t[1]=p,t[5]=o*f,t[9]=-c*f,t[2]=-h*f,t[6]=g*p+v,t[10]=m-M*p}else if(e.order==="XZY"){const m=o*u,g=o*h,v=c*u,M=c*h;t[0]=u*f,t[4]=-p,t[8]=h*f,t[1]=m*p+M,t[5]=o*f,t[9]=g*p-v,t[2]=v*p-g,t[6]=c*f,t[10]=M*p+m}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(HM,e,VM)}lookAt(e,t,n){const i=this.elements;return pi.subVectors(e,t),pi.lengthSq()===0&&(pi.z=1),pi.normalize(),Yr.crossVectors(n,pi),Yr.lengthSq()===0&&(Math.abs(n.z)===1?pi.x+=1e-4:pi.z+=1e-4,pi.normalize(),Yr.crossVectors(n,pi)),Yr.normalize(),wc.crossVectors(pi,Yr),i[0]=Yr.x,i[4]=wc.x,i[8]=pi.x,i[1]=Yr.y,i[5]=wc.y,i[9]=pi.y,i[2]=Yr.z,i[6]=wc.z,i[10]=pi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],c=n[4],u=n[8],h=n[12],f=n[1],p=n[5],m=n[9],g=n[13],v=n[2],M=n[6],y=n[10],x=n[14],w=n[3],b=n[7],T=n[11],P=n[15],R=i[0],E=i[4],C=i[8],B=i[12],N=i[1],D=i[5],Y=i[9],K=i[13],H=i[2],ne=i[6],oe=i[10],te=i[14],k=i[3],G=i[7],W=i[11],J=i[15];return s[0]=o*R+c*N+u*H+h*k,s[4]=o*E+c*D+u*ne+h*G,s[8]=o*C+c*Y+u*oe+h*W,s[12]=o*B+c*K+u*te+h*J,s[1]=f*R+p*N+m*H+g*k,s[5]=f*E+p*D+m*ne+g*G,s[9]=f*C+p*Y+m*oe+g*W,s[13]=f*B+p*K+m*te+g*J,s[2]=v*R+M*N+y*H+x*k,s[6]=v*E+M*D+y*ne+x*G,s[10]=v*C+M*Y+y*oe+x*W,s[14]=v*B+M*K+y*te+x*J,s[3]=w*R+b*N+T*H+P*k,s[7]=w*E+b*D+T*ne+P*G,s[11]=w*C+b*Y+T*oe+P*W,s[15]=w*B+b*K+T*te+P*J,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],c=e[5],u=e[9],h=e[13],f=e[2],p=e[6],m=e[10],g=e[14],v=e[3],M=e[7],y=e[11],x=e[15],w=u*g-h*m,b=c*g-h*p,T=c*m-u*p,P=o*g-h*f,R=o*m-u*f,E=o*p-c*f;return t*(M*w-y*b+x*T)-n*(v*w-y*P+x*R)+i*(v*b-M*P+x*E)-s*(v*T-M*R+y*E)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[1],o=e[5],c=e[9],u=e[2],h=e[6],f=e[10];return t*(o*f-c*h)-n*(s*f-c*u)+i*(s*h-o*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],c=e[5],u=e[6],h=e[7],f=e[8],p=e[9],m=e[10],g=e[11],v=e[12],M=e[13],y=e[14],x=e[15],w=t*c-n*o,b=t*u-i*o,T=t*h-s*o,P=n*u-i*c,R=n*h-s*c,E=i*h-s*u,C=f*M-p*v,B=f*y-m*v,N=f*x-g*v,D=p*y-m*M,Y=p*x-g*M,K=m*x-g*y,H=w*K-b*Y+T*D+P*N-R*B+E*C;if(H===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const ne=1/H;return e[0]=(c*K-u*Y+h*D)*ne,e[1]=(i*Y-n*K-s*D)*ne,e[2]=(M*E-y*R+x*P)*ne,e[3]=(m*R-p*E-g*P)*ne,e[4]=(u*N-o*K-h*B)*ne,e[5]=(t*K-i*N+s*B)*ne,e[6]=(y*T-v*E-x*b)*ne,e[7]=(f*E-m*T+g*b)*ne,e[8]=(o*Y-c*N+h*C)*ne,e[9]=(n*N-t*Y-s*C)*ne,e[10]=(v*R-M*T+x*w)*ne,e[11]=(p*T-f*R-g*w)*ne,e[12]=(c*B-o*D-u*C)*ne,e[13]=(t*D-n*B+i*C)*ne,e[14]=(M*b-v*P-y*w)*ne,e[15]=(f*P-p*b+m*w)*ne,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,c=e.y,u=e.z,h=s*o,f=s*c;return this.set(h*o+n,h*c-i*u,h*u+i*c,0,h*c+i*u,f*c+n,f*u-i*o,0,h*u-i*c,f*u+i*o,s*u*u+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,c=t._z,u=t._w,h=s+s,f=o+o,p=c+c,m=s*h,g=s*f,v=s*p,M=o*f,y=o*p,x=c*p,w=u*h,b=u*f,T=u*p,P=n.x,R=n.y,E=n.z;return i[0]=(1-(M+x))*P,i[1]=(g+T)*P,i[2]=(v-b)*P,i[3]=0,i[4]=(g-T)*R,i[5]=(1-(m+x))*R,i[6]=(y+w)*R,i[7]=0,i[8]=(v+b)*E,i[9]=(y-w)*E,i[10]=(1-(m+M))*E,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];const s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let o=po.set(i[0],i[1],i[2]).length();const c=po.set(i[4],i[5],i[6]).length(),u=po.set(i[8],i[9],i[10]).length();s<0&&(o=-o),Oi.copy(this);const h=1/o,f=1/c,p=1/u;return Oi.elements[0]*=h,Oi.elements[1]*=h,Oi.elements[2]*=h,Oi.elements[4]*=f,Oi.elements[5]*=f,Oi.elements[6]*=f,Oi.elements[8]*=p,Oi.elements[9]*=p,Oi.elements[10]*=p,t.setFromRotationMatrix(Oi),n.x=o,n.y=c,n.z=u,this}makePerspective(e,t,n,i,s,o,c=gi,u=!1){const h=this.elements,f=2*s/(t-e),p=2*s/(n-i),m=(t+e)/(t-e),g=(n+i)/(n-i);let v,M;if(u)v=s/(o-s),M=o*s/(o-s);else if(c===gi)v=-(o+s)/(o-s),M=-2*o*s/(o-s);else if(c===zs)v=-o/(o-s),M=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return h[0]=f,h[4]=0,h[8]=m,h[12]=0,h[1]=0,h[5]=p,h[9]=g,h[13]=0,h[2]=0,h[6]=0,h[10]=v,h[14]=M,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(e,t,n,i,s,o,c=gi,u=!1){const h=this.elements,f=2/(t-e),p=2/(n-i),m=-(t+e)/(t-e),g=-(n+i)/(n-i);let v,M;if(u)v=1/(o-s),M=o/(o-s);else if(c===gi)v=-2/(o-s),M=-(o+s)/(o-s);else if(c===zs)v=-1/(o-s),M=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return h[0]=f,h[4]=0,h[8]=0,h[12]=m,h[1]=0,h[5]=p,h[9]=0,h[13]=g,h[2]=0,h[6]=0,h[10]=v,h[14]=M,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};_h.prototype.isMatrix4=!0;let mt=_h;const po=new O,Oi=new mt,HM=new O(0,0,0),VM=new O(1,1,1),Yr=new O,wc=new O,pi=new O,c0=new mt,u0=new Nn;class Xi{constructor(e=0,t=0,n=0,i=Xi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],c=i[8],u=i[1],h=i[5],f=i[9],p=i[2],m=i[6],g=i[10];switch(t){case"XYZ":this._y=Math.asin(dt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-f,g),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(m,h),this._z=0);break;case"YXZ":this._x=Math.asin(-dt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(c,g),this._z=Math.atan2(u,h)):(this._y=Math.atan2(-p,s),this._z=0);break;case"ZXY":this._x=Math.asin(dt(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(-p,g),this._z=Math.atan2(-o,h)):(this._y=0,this._z=Math.atan2(u,s));break;case"ZYX":this._y=Math.asin(-dt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(m,g),this._z=Math.atan2(u,s)):(this._x=0,this._z=Math.atan2(-o,h));break;case"YZX":this._z=Math.asin(dt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-f,h),this._y=Math.atan2(-p,s)):(this._x=0,this._y=Math.atan2(c,g));break;case"XZY":this._z=Math.asin(-dt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(m,h),this._y=Math.atan2(c,s)):(this._x=Math.atan2(-f,g),this._y=0);break;default:Be("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return c0.makeRotationFromQuaternion(e),this.setFromRotationMatrix(c0,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return u0.setFromEuler(this),this.setFromQuaternion(u0,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Xi.DEFAULT_ORDER="XYZ";class Us{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let GM=0;const h0=new O,mo=new Nn,Sr=new mt,Ec=new O,Ea=new O,WM=new O,XM=new Nn,f0=new O(1,0,0),d0=new O(0,1,0),p0=new O(0,0,1),m0={type:"added"},YM={type:"removed"},go={type:"childadded",child:null},hd={type:"childremoved",child:null};class zt extends Yi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:GM++}),this.uuid=Ii(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=zt.DEFAULT_UP.clone();const e=new O,t=new Xi,n=new Nn,i=new O(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new mt},normalMatrix:{value:new _t}}),this.matrix=new mt,this.matrixWorld=new mt,this.matrixAutoUpdate=zt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Us,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return mo.setFromAxisAngle(e,t),this.quaternion.multiply(mo),this}rotateOnWorldAxis(e,t){return mo.setFromAxisAngle(e,t),this.quaternion.premultiply(mo),this}rotateX(e){return this.rotateOnAxis(f0,e)}rotateY(e){return this.rotateOnAxis(d0,e)}rotateZ(e){return this.rotateOnAxis(p0,e)}translateOnAxis(e,t){return h0.copy(e).applyQuaternion(this.quaternion),this.position.add(h0.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(f0,e)}translateY(e){return this.translateOnAxis(d0,e)}translateZ(e){return this.translateOnAxis(p0,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Sr.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ec.copy(e):Ec.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ea.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Sr.lookAt(Ea,Ec,this.up):Sr.lookAt(Ec,Ea,this.up),this.quaternion.setFromRotationMatrix(Sr),i&&(Sr.extractRotation(i.matrixWorld),mo.setFromRotationMatrix(Sr),this.quaternion.premultiply(mo.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(nt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(m0),go.child=e,this.dispatchEvent(go),go.child=null):nt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(YM),hd.child=e,this.dispatchEvent(hd),hd.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Sr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Sr.multiply(e.parent.matrixWorld)),e.applyMatrix4(Sr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(m0),go.child=e,this.dispatchEvent(go),go.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ea,e,WM),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ea,XM,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,i=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*i,s[13]+=n-s[1]*t-s[5]*n-s[9]*i,s[14]+=i-s[2]*t-s[6]*n-s[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const s=this.children;for(let o=0,c=s.length;o<c;o++)s[o].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(c=>({...c,boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(c=>({...c})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(c,u){return c[u.uuid]===void 0&&(c[u.uuid]=u.toJSON(e)),u.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const u=c.shapes;if(Array.isArray(u))for(let h=0,f=u.length;h<f;h++){const p=u[h];s(e.shapes,p)}else s(e.shapes,u)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let u=0,h=this.material.length;u<h;u++)c.push(s(e.materials,this.material[u]));i.material=c}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let c=0;c<this.children.length;c++)i.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let c=0;c<this.animations.length;c++){const u=this.animations[c];i.animations.push(s(e.animations,u))}}if(t){const c=o(e.geometries),u=o(e.materials),h=o(e.textures),f=o(e.images),p=o(e.shapes),m=o(e.skeletons),g=o(e.animations),v=o(e.nodes);c.length>0&&(n.geometries=c),u.length>0&&(n.materials=u),h.length>0&&(n.textures=h),f.length>0&&(n.images=f),p.length>0&&(n.shapes=p),m.length>0&&(n.skeletons=m),g.length>0&&(n.animations=g),v.length>0&&(n.nodes=v)}return n.object=i,n;function o(c){const u=[];for(const h in c){const f=c[h];delete f.metadata,u.push(f)}return u}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}zt.DEFAULT_UP=new O(0,1,0);zt.DEFAULT_MATRIX_AUTO_UPDATE=!0;zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class zo extends zt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const qM={type:"move"};class wu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new zo,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new zo,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new zo,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const c=this._targetRay,u=this._grip,h=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(h&&e.hand){o=!0;for(const M of e.hand.values()){const y=t.getJointPose(M,n),x=this._getHandJoint(h,M);y!==null&&(x.matrix.fromArray(y.transform.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale),x.matrixWorldNeedsUpdate=!0,x.jointRadius=y.radius),x.visible=y!==null}const f=h.joints["index-finger-tip"],p=h.joints["thumb-tip"],m=f.position.distanceTo(p.position),g=.02,v=.005;h.inputState.pinching&&m>g+v?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!h.inputState.pinching&&m<=g-v&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else u!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(u.matrix.fromArray(s.transform.matrix),u.matrix.decompose(u.position,u.quaternion,u.scale),u.matrixWorldNeedsUpdate=!0,s.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(s.linearVelocity)):u.hasLinearVelocity=!1,s.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(s.angularVelocity)):u.hasAngularVelocity=!1,u.eventsEnabled&&u.dispatchEvent({type:"gripUpdated",data:e,target:this})));c!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(c.matrix.fromArray(i.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,i.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(i.linearVelocity)):c.hasLinearVelocity=!1,i.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(i.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(qM)))}return c!==null&&(c.visible=i!==null),u!==null&&(u.visible=s!==null),h!==null&&(h.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new zo;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const $v={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},qr={h:0,s:0,l:0},bc={h:0,s:0,l:0};function fd(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class Xe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ri){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Dt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Dt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Dt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Dt.workingColorSpace){if(e=Gp(e,1),t=dt(t,0,1),n=dt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=fd(o,s,e+1/3),this.g=fd(o,s,e),this.b=fd(o,s,e-1/3)}return Dt.colorSpaceToWorking(this,i),this}setStyle(e,t=ri){function n(s){s!==void 0&&parseFloat(s)<1&&Be("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],c=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(c))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(c))return n(s[4]),this.setRGB(Math.min(100,parseFloat(s[1]))/100,Math.min(100,parseFloat(s[2]))/100,Math.min(100,parseFloat(s[3]))/100,t);break;case"hsl":case"hsla":if(s=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(c))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Be("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);Be("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ri){const n=$v[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Be("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Lr(e.r),this.g=Lr(e.g),this.b=Lr(e.b),this}copyLinearToSRGB(e){return this.r=Wo(e.r),this.g=Wo(e.g),this.b=Wo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ri){return Dt.workingToColorSpace(kn.copy(this),e),Math.round(dt(kn.r*255,0,255))*65536+Math.round(dt(kn.g*255,0,255))*256+Math.round(dt(kn.b*255,0,255))}getHexString(e=ri){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Dt.workingColorSpace){Dt.workingToColorSpace(kn.copy(this),t);const n=kn.r,i=kn.g,s=kn.b,o=Math.max(n,i,s),c=Math.min(n,i,s);let u,h;const f=(c+o)/2;if(c===o)u=0,h=0;else{const p=o-c;switch(h=f<=.5?p/(o+c):p/(2-o-c),o){case n:u=(i-s)/p+(i<s?6:0);break;case i:u=(s-n)/p+2;break;case s:u=(n-i)/p+4;break}u/=6}return e.h=u,e.s=h,e.l=f,e}getRGB(e,t=Dt.workingColorSpace){return Dt.workingToColorSpace(kn.copy(this),t),e.r=kn.r,e.g=kn.g,e.b=kn.b,e}getStyle(e=ri){Dt.workingToColorSpace(kn.copy(this),e);const t=kn.r,n=kn.g,i=kn.b;return e!==ri?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(qr),this.setHSL(qr.h+e,qr.s+t,qr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(qr),e.getHSL(bc);const n=ja(qr.h,bc.h,t),i=ja(qr.s,bc.s,t),s=ja(qr.l,bc.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const kn=new Xe;Xe.NAMES=$v;class Ih{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Xe(e),this.density=t}clone(){return new Ih(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Lh{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Xe(e),this.near=t,this.far=n}clone(){return new Lh(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Xp extends zt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Xi,this.environmentIntensity=1,this.environmentRotation=new Xi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Fi=new O,Mr=new O,dd=new O,wr=new O,_o=new O,vo=new O,g0=new O,pd=new O,md=new O,gd=new O,_d=new Ot,vd=new Ot,xd=new Ot;class si{constructor(e=new O,t=new O,n=new O){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Fi.subVectors(e,t),i.cross(Fi);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Fi.subVectors(i,t),Mr.subVectors(n,t),dd.subVectors(e,t);const o=Fi.dot(Fi),c=Fi.dot(Mr),u=Fi.dot(dd),h=Mr.dot(Mr),f=Mr.dot(dd),p=o*h-c*c;if(p===0)return s.set(0,0,0),null;const m=1/p,g=(h*u-c*f)*m,v=(o*f-c*u)*m;return s.set(1-g-v,v,g)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,wr)===null?!1:wr.x>=0&&wr.y>=0&&wr.x+wr.y<=1}static getInterpolation(e,t,n,i,s,o,c,u){return this.getBarycoord(e,t,n,i,wr)===null?(u.x=0,u.y=0,"z"in u&&(u.z=0),"w"in u&&(u.w=0),null):(u.setScalar(0),u.addScaledVector(s,wr.x),u.addScaledVector(o,wr.y),u.addScaledVector(c,wr.z),u)}static getInterpolatedAttribute(e,t,n,i,s,o){return _d.setScalar(0),vd.setScalar(0),xd.setScalar(0),_d.fromBufferAttribute(e,t),vd.fromBufferAttribute(e,n),xd.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(_d,s.x),o.addScaledVector(vd,s.y),o.addScaledVector(xd,s.z),o}static isFrontFacing(e,t,n,i){return Fi.subVectors(n,t),Mr.subVectors(e,t),Fi.cross(Mr).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Fi.subVectors(this.c,this.b),Mr.subVectors(this.a,this.b),Fi.cross(Mr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return si.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return si.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return si.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return si.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return si.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,c;_o.subVectors(i,n),vo.subVectors(s,n),pd.subVectors(e,n);const u=_o.dot(pd),h=vo.dot(pd);if(u<=0&&h<=0)return t.copy(n);md.subVectors(e,i);const f=_o.dot(md),p=vo.dot(md);if(f>=0&&p<=f)return t.copy(i);const m=u*p-f*h;if(m<=0&&u>=0&&f<=0&&u-f>0)return o=u/(u-f),t.copy(n).addScaledVector(_o,o);gd.subVectors(e,s);const g=_o.dot(gd),v=vo.dot(gd);if(v>=0&&g<=v)return t.copy(s);const M=g*h-u*v;if(M<=0&&h>=0&&v<=0)return c=h/(h-v),t.copy(n).addScaledVector(vo,c);const y=f*v-g*p;if(y<=0&&p-f>=0&&g-v>=0)return g0.subVectors(s,i),c=(p-f)/(p-f+(g-v)),t.copy(i).addScaledVector(g0,c);const x=1/(y+M+m);return o=M*x,c=m*x,t.copy(n).addScaledVector(_o,o).addScaledVector(vo,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class xn{constructor(e=new O(1/0,1/0,1/0),t=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Bi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Bi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Bi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let o=0,c=s.count;o<c;o++)e.isMesh===!0?e.getVertexPosition(o,Bi):Bi.fromBufferAttribute(s,o),Bi.applyMatrix4(e.matrixWorld),this.expandByPoint(Bi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Tc.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Tc.copy(n.boundingBox)),Tc.applyMatrix4(e.matrixWorld),this.union(Tc)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Bi),Bi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ba),Ac.subVectors(this.max,ba),xo.subVectors(e.a,ba),yo.subVectors(e.b,ba),So.subVectors(e.c,ba),Zr.subVectors(yo,xo),jr.subVectors(So,yo),ms.subVectors(xo,So);let t=[0,-Zr.z,Zr.y,0,-jr.z,jr.y,0,-ms.z,ms.y,Zr.z,0,-Zr.x,jr.z,0,-jr.x,ms.z,0,-ms.x,-Zr.y,Zr.x,0,-jr.y,jr.x,0,-ms.y,ms.x,0];return!yd(t,xo,yo,So,Ac)||(t=[1,0,0,0,1,0,0,0,1],!yd(t,xo,yo,So,Ac))?!1:(Cc.crossVectors(Zr,jr),t=[Cc.x,Cc.y,Cc.z],yd(t,xo,yo,So,Ac))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Bi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Bi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Er[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Er[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Er[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Er[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Er[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Er[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Er[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Er[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Er),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Er=[new O,new O,new O,new O,new O,new O,new O,new O],Bi=new O,Tc=new xn,xo=new O,yo=new O,So=new O,Zr=new O,jr=new O,ms=new O,ba=new O,Ac=new O,Cc=new O,gs=new O;function yd(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){gs.fromArray(r,s);const c=i.x*Math.abs(gs.x)+i.y*Math.abs(gs.y)+i.z*Math.abs(gs.z),u=e.dot(gs),h=t.dot(gs),f=n.dot(gs);if(Math.max(-Math.max(u,h,f),Math.min(u,h,f))>c)return!1}return!0}const Rr=ZM();function ZM(){const r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let u=0;u<256;++u){const h=u-127;h<-27?(n[u]=0,n[u|256]=32768,i[u]=24,i[u|256]=24):h<-14?(n[u]=1024>>-h-14,n[u|256]=1024>>-h-14|32768,i[u]=-h-1,i[u|256]=-h-1):h<=15?(n[u]=h+15<<10,n[u|256]=h+15<<10|32768,i[u]=13,i[u|256]=13):h<128?(n[u]=31744,n[u|256]=64512,i[u]=24,i[u|256]=24):(n[u]=31744,n[u|256]=64512,i[u]=13,i[u|256]=13)}const s=new Uint32Array(2048),o=new Uint32Array(64),c=new Uint32Array(64);for(let u=1;u<1024;++u){let h=u<<13,f=0;for(;!(h&8388608);)h<<=1,f-=8388608;h&=-8388609,f+=947912704,s[u]=h|f}for(let u=1024;u<2048;++u)s[u]=939524096+(u-1024<<13);for(let u=1;u<31;++u)o[u]=u<<23;o[31]=1199570944,o[32]=2147483648;for(let u=33;u<63;++u)o[u]=2147483648+(u-32<<23);o[63]=3347054592;for(let u=1;u<64;++u)u!==32&&(c[u]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:o,offsetTable:c}}function ii(r){Math.abs(r)>65504&&Be("DataUtils.toHalfFloat(): Value out of range."),r=dt(r,-65504,65504),Rr.floatView[0]=r;const e=Rr.uint32View[0],t=e>>23&511;return Rr.baseTable[t]+((e&8388607)>>Rr.shiftTable[t])}function Ba(r){const e=r>>10;return Rr.uint32View[0]=Rr.mantissaTable[Rr.offsetTable[e]+(r&1023)]+Rr.exponentTable[e],Rr.floatView[0]}class jM{static toHalfFloat(e){return ii(e)}static fromHalfFloat(e){return Ba(e)}}const gn=new O,Rc=new me;let JM=0;class Jt extends Yi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:JM++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ah,this.updateRanges=[],this.gpuType=Zn,this.version=0,this._normalizationScale=e!==void 0?Ch(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Rc.fromBufferAttribute(this,t),Rc.applyMatrix3(e),this.setXY(t,Rc.x,Rc.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)gn.fromBufferAttribute(this,t),gn.applyMatrix3(e),this.setXYZ(t,gn.x,gn.y,gn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)gn.fromBufferAttribute(this,t),gn.applyMatrix4(e),this.setXYZ(t,gn.x,gn.y,gn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)gn.fromBufferAttribute(this,t),gn.applyNormalMatrix(e),this.setXYZ(t,gn.x,gn.y,gn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)gn.fromBufferAttribute(this,t),gn.transformDirection(e),this.setXYZ(t,gn.x,gn.y,gn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){const t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):Ls(e,this.array)}_normalize(e){const t=this._normalizationScale;return t!==void 0?Math.round(e*t):Vn(e,this.array)}}class KM extends Jt{constructor(e,t,n){super(new Int8Array(e),t,n)}}class QM extends Jt{constructor(e,t,n){super(new Uint8Array(e),t,n)}}class $M extends Jt{constructor(e,t,n){super(new Uint8ClampedArray(e),t,n)}}class ew extends Jt{constructor(e,t,n){super(new Int16Array(e),t,n)}}class Yp extends Jt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class tw extends Jt{constructor(e,t,n){super(new Int32Array(e),t,n)}}class qp extends Jt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class nw extends Jt{constructor(e,t,n){super(new Uint16Array(e),t,n),this.isFloat16BufferAttribute=!0}getX(e){let t=Ba(this.array[e*this.itemSize]);return this.normalized&&(t=Ls(t,this.array)),t}setX(e,t){return this.normalized&&(t=Vn(t,this.array)),this.array[e*this.itemSize]=ii(t),this}getY(e){let t=Ba(this.array[e*this.itemSize+1]);return this.normalized&&(t=Ls(t,this.array)),t}setY(e,t){return this.normalized&&(t=Vn(t,this.array)),this.array[e*this.itemSize+1]=ii(t),this}getZ(e){let t=Ba(this.array[e*this.itemSize+2]);return this.normalized&&(t=Ls(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Vn(t,this.array)),this.array[e*this.itemSize+2]=ii(t),this}getW(e){let t=Ba(this.array[e*this.itemSize+3]);return this.normalized&&(t=Ls(t,this.array)),t}setW(e,t){return this.normalized&&(t=Vn(t,this.array)),this.array[e*this.itemSize+3]=ii(t),this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Vn(t,this.array),n=Vn(n,this.array)),this.array[e+0]=ii(t),this.array[e+1]=ii(n),this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Vn(t,this.array),n=Vn(n,this.array),i=Vn(i,this.array)),this.array[e+0]=ii(t),this.array[e+1]=ii(n),this.array[e+2]=ii(i),this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Vn(t,this.array),n=Vn(n,this.array),i=Vn(i,this.array),s=Vn(s,this.array)),this.array[e+0]=ii(t),this.array[e+1]=ii(n),this.array[e+2]=ii(i),this.array[e+3]=ii(s),this}}class qe extends Jt{constructor(e,t,n){super(new Float32Array(e),t,n)}}const iw=new xn,Ta=new O,Sd=new O;let yn=class{constructor(e=new O,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):iw.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ta.subVectors(e,this.center);const t=Ta.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Ta,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Sd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ta.copy(e.center).add(Sd)),this.expandByPoint(Ta.copy(e.center).sub(Sd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},rw=0;const Ci=new mt,Md=new zt,Mo=new O,mi=new xn,Aa=new xn,Cn=new O;class wt extends Yi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:rw++}),this.uuid=Ii(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(pM(e)?qp:Yp)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new _t().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Ci.makeRotationFromQuaternion(e),this.applyMatrix4(Ci),this}rotateX(e){return Ci.makeRotationX(e),this.applyMatrix4(Ci),this}rotateY(e){return Ci.makeRotationY(e),this.applyMatrix4(Ci),this}rotateZ(e){return Ci.makeRotationZ(e),this.applyMatrix4(Ci),this}translate(e,t,n){return Ci.makeTranslation(e,t,n),this.applyMatrix4(Ci),this}scale(e,t,n){return Ci.makeScale(e,t,n),this.applyMatrix4(Ci),this}lookAt(e){return Md.lookAt(e),Md.updateMatrix(),this.applyMatrix4(Md.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Mo).negate(),this.translate(Mo.x,Mo.y,Mo.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new qe(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&Be("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){nt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];mi.setFromBufferAttribute(s),this.morphTargetsRelative?(Cn.addVectors(this.boundingBox.min,mi.min),this.boundingBox.expandByPoint(Cn),Cn.addVectors(this.boundingBox.max,mi.max),this.boundingBox.expandByPoint(Cn)):(this.boundingBox.expandByPoint(mi.min),this.boundingBox.expandByPoint(mi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&nt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){nt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(e){const n=this.boundingSphere.center;if(mi.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const c=t[s];Aa.setFromBufferAttribute(c),this.morphTargetsRelative?(Cn.addVectors(mi.min,Aa.min),mi.expandByPoint(Cn),Cn.addVectors(mi.max,Aa.max),mi.expandByPoint(Cn)):(mi.expandByPoint(Aa.min),mi.expandByPoint(Aa.max))}mi.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)Cn.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Cn));if(t)for(let s=0,o=t.length;s<o;s++){const c=t[s],u=this.morphTargetsRelative;for(let h=0,f=c.count;h<f;h++)Cn.fromBufferAttribute(c,h),u&&(Mo.fromBufferAttribute(e,h),Cn.add(Mo)),i=Math.max(i,n.distanceToSquared(Cn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&nt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){nt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new Jt(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));const c=[],u=[],h=new Uint8Array(n.count);for(let B=0;B<n.count;B++)c[B]=new O,u[B]=new O;const f=new O,p=new O,m=new O,g=new me,v=new me,M=new me,y=new O,x=new O;function w(B,N,D){h[B]=h[N]=h[D]=1,f.fromBufferAttribute(n,B),p.fromBufferAttribute(n,N),m.fromBufferAttribute(n,D),g.fromBufferAttribute(s,B),v.fromBufferAttribute(s,N),M.fromBufferAttribute(s,D),p.sub(f),m.sub(f),v.sub(g),M.sub(g);const Y=1/(v.x*M.y-M.x*v.y);isFinite(Y)&&(y.copy(p).multiplyScalar(M.y).addScaledVector(m,-v.y).multiplyScalar(Y),x.copy(m).multiplyScalar(v.x).addScaledVector(p,-M.x).multiplyScalar(Y),c[B].add(y),c[N].add(y),c[D].add(y),u[B].add(x),u[N].add(x),u[D].add(x))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let B=0,N=b.length;B<N;++B){const D=b[B],Y=D.start,K=D.count;for(let H=Y,ne=Y+K;H<ne;H+=3)w(e.getX(H+0),e.getX(H+1),e.getX(H+2))}const T=new O,P=new O,R=new O,E=new O;function C(B){R.fromBufferAttribute(i,B),E.copy(R);const N=c[B];T.copy(N),T.sub(R.multiplyScalar(R.dot(N))).normalize(),P.crossVectors(E,N);const Y=P.dot(u[B])<0?-1:1;o.setXYZW(B,T.x,T.y,T.z,Y)}for(let B=0,N=n.count;B<N;++B)h[B]&&C(B);this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Jt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let m=0,g=n.count;m<g;m++)n.setXYZ(m,0,0,0);const i=new O,s=new O,o=new O,c=new O,u=new O,h=new O,f=new O,p=new O;if(e)for(let m=0,g=e.count;m<g;m+=3){const v=e.getX(m+0),M=e.getX(m+1),y=e.getX(m+2);i.fromBufferAttribute(t,v),s.fromBufferAttribute(t,M),o.fromBufferAttribute(t,y),f.subVectors(o,s),p.subVectors(i,s),f.cross(p),c.fromBufferAttribute(n,v),u.fromBufferAttribute(n,M),h.fromBufferAttribute(n,y),c.add(f),u.add(f),h.add(f),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(M,u.x,u.y,u.z),n.setXYZ(y,h.x,h.y,h.z)}else for(let m=0,g=t.count;m<g;m+=3)i.fromBufferAttribute(t,m+0),s.fromBufferAttribute(t,m+1),o.fromBufferAttribute(t,m+2),f.subVectors(o,s),p.subVectors(i,s),f.cross(p),n.setXYZ(m+0,f.x,f.y,f.z),n.setXYZ(m+1,f.x,f.y,f.z),n.setXYZ(m+2,f.x,f.y,f.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Cn.fromBufferAttribute(e,t),Cn.normalize(),e.setXYZ(t,Cn.x,Cn.y,Cn.z)}toNonIndexed(){function e(c,u){const h=c.array,f=c.itemSize,p=c.normalized,m=new h.constructor(u.length*f);let g=0,v=0;for(let M=0,y=u.length;M<y;M++){c.isInterleavedBufferAttribute?g=u[M]*c.data.stride+c.offset:g=u[M]*f;for(let x=0;x<f;x++)m[v++]=h[g++]}return new Jt(m,f,p)}if(this.index===null)return Be("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new wt,n=this.index.array,i=this.attributes;for(const c in i){const u=i[c],h=e(u,n);t.setAttribute(c,h)}const s=this.morphAttributes;for(const c in s){const u=[],h=s[c];for(let f=0,p=h.length;f<p;f++){const m=h[f],g=e(m,n);u.push(g)}t.morphAttributes[c]=u}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];t.addGroup(h.start,h.count,h.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const u=this.parameters;for(const h in u)u[h]!==void 0&&(e[h]=u[h]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const u in n){const h=n[u];e.data.attributes[u]=h.toJSON(e.data)}const i={};let s=!1;for(const u in this.morphAttributes){const h=this.morphAttributes[u],f=[];for(let p=0,m=h.length;p<m;p++){const g=h[p];f.push(g.toJSON(e.data))}f.length>0&&(i[u]=f,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const c=this.boundingSphere;return c!==null&&(e.data.boundingSphere=c.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const h in i){const f=i[h];this.setAttribute(h,f.clone(t))}const s=e.morphAttributes;for(const h in s){const f=[],p=s[h];for(let m=0,g=p.length;m<g;m++)f.push(p[m].clone(t));this.morphAttributes[h]=f}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let h=0,f=o.length;h<f;h++){const p=o[h];this.addGroup(p.start,p.count,p.materialIndex)}const c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());const u=e.boundingSphere;return u!==null&&(this.boundingSphere=u.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Nh{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ah,this.updateRanges=[],this.version=0,this.uuid=Ii()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});const t=_0(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);const n=new this.array.constructor(e.arrayBuffers[t]),i=new this.constructor(n,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});const t=_0(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));const n={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}}function _0(r){return r.buffer._uuid===void 0&&(r.buffer._uuid=Ii()),r.byteOffset===0&&r.byteLength===r.buffer.byteLength?r.buffer._uuid:r.buffer._uuid+":"+r.byteOffset+":"+r.byteLength}const Xn=new O;class _i{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i,this._normalizationScale=e!==void 0?Ch(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Xn.fromBufferAttribute(this,t),Xn.applyMatrix4(e),this.setXYZ(t,Xn.x,Xn.y,Xn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Xn.fromBufferAttribute(this,t),Xn.applyNormalMatrix(e),this.setXYZ(t,Xn.x,Xn.y,Xn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Xn.fromBufferAttribute(this,t),Xn.transformDirection(e),this.setXYZ(t,Xn.x,Xn.y,Xn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i),s=this._normalize(s)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){al("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Jt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new _i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){al("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){const t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):Ls(e,this.data.array)}_normalize(e){const t=this._normalizationScale;return t!==void 0?Math.round(e*t):Vn(e,this.data.array)}}const wd=new O,sw=new O,ow=new _t;class ar{constructor(e=new O(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=wd.subVectors(n,t).cross(sw.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const i=e.delta(wd),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(i,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||ow.getNormalMatrix(e),i=this.coplanarPoint(wd).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let aw=0;class Dn extends Yi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:aw++}),this.uuid=Ii(),this.name="",this.type="Material",this.blending=Go,this.side=$r,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ep,this.blendDst=bp,this.blendEquation=Cs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xe(0,0,0),this.blendAlpha=0,this.depthFunc=Xo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Hv,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Mu,this.stencilZFail=Mu,this.stencilZPass=Mu,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Be(`Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Be(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const c in s){const u=s[c];delete u.metadata,o.push(u)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Xe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new ar().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new me().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new me().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Zp extends Dn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Xe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let wo;const Ca=new O,Eo=new O,bo=new O,To=new me,Ra=new me,ex=new mt,Pc=new O,Pa=new O,Ic=new O,v0=new me,Ed=new me,x0=new me;class tx extends zt{constructor(e=new Zp){if(super(),this.isSprite=!0,this.type="Sprite",wo===void 0){wo=new wt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Nh(t,5);wo.setIndex([0,1,2,0,2,3]),wo.setAttribute("position",new _i(n,3,0,!1)),wo.setAttribute("uv",new _i(n,2,3,!1))}this.geometry=wo,this.material=e,this.center=new me(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&nt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Eo.setFromMatrixScale(this.matrixWorld),ex.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),bo.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Eo.multiplyScalar(-bo.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const o=this.center;Lc(Pc.set(-.5,-.5,0),bo,o,Eo,i,s),Lc(Pa.set(.5,-.5,0),bo,o,Eo,i,s),Lc(Ic.set(.5,.5,0),bo,o,Eo,i,s),v0.set(0,0),Ed.set(1,0),x0.set(1,1);let c=e.ray.intersectTriangle(Pc,Pa,Ic,!1,Ca);if(c===null&&(Lc(Pa.set(-.5,.5,0),bo,o,Eo,i,s),Ed.set(0,1),c=e.ray.intersectTriangle(Pc,Ic,Pa,!1,Ca),c===null))return;const u=e.ray.origin.distanceTo(Ca);u<e.near||u>e.far||t.push({distance:u,point:Ca.clone(),uv:si.getInterpolation(Ca,Pc,Pa,Ic,v0,Ed,x0,new me),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}toJSON(e){const t=super.toJSON(e);return t.object.center=this.center.toArray(),t}}function Lc(r,e,t,n,i,s){To.subVectors(r,t).addScalar(.5).multiply(n),i!==void 0?(Ra.x=s*To.x-i*To.y,Ra.y=i*To.x+s*To.y):Ra.copy(To),r.copy(e),r.x+=Ra.x,r.y+=Ra.y,r.applyMatrix4(ex)}const Nc=new O,y0=new O;class nx extends zt{constructor(){super(),this.isLOD=!0,this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]}}),this.autoUpdate=!0}copy(e){super.copy(e,!1);const t=e.levels;for(let n=0,i=t.length;n<i;n++){const s=t[n];this.addLevel(s.object.clone(),s.distance,s.hysteresis)}return this.autoUpdate=e.autoUpdate,this}addLevel(e,t=0,n=0){t=Math.abs(t);const i=this.levels;let s;for(s=0;s<i.length&&!(t<i[s].distance);s++);return i.splice(s,0,{distance:t,hysteresis:n,object:e}),this.add(e),this}removeLevel(e){const t=this.levels;for(let n=0;n<t.length;n++)if(t[n].distance===e){const i=t.splice(n,1);return this.remove(i[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(e){const t=this.levels;if(t.length>0){let n,i;for(n=1,i=t.length;n<i;n++){let s=t[n].distance;if(t[n].object.visible&&(s-=s*t[n].hysteresis),e<s)break}return t[n-1].object}return null}raycast(e,t){if(this.levels.length>0){Nc.setFromMatrixPosition(this.matrixWorld);const i=e.ray.origin.distanceTo(Nc);this.getObjectForDistance(i).raycast(e,t)}}update(e){const t=this.levels;if(t.length>1){Nc.setFromMatrixPosition(e.matrixWorld),y0.setFromMatrixPosition(this.matrixWorld);const n=Nc.distanceTo(y0)/e.zoom;t[0].object.visible=!0;let i,s;for(i=1,s=t.length;i<s;i++){let o=t[i].distance;if(t[i].object.visible&&(o-=o*t[i].hysteresis),n>=o)t[i-1].object.visible=!1,t[i].object.visible=!0;else break}for(this._currentLevel=i-1;i<s;i++)t[i].object.visible=!1}}toJSON(e){const t=super.toJSON(e);t.object.autoUpdate=this.autoUpdate,t.object.levels=[];const n=this.levels;for(let i=0,s=n.length;i<s;i++){const o=n[i];t.object.levels.push({object:o.object.uuid,distance:o.distance,hysteresis:o.hysteresis})}return t}}const br=new O,bd=new O,Dc=new O,Uc=new O;class Gs{constructor(e=new O,t=new O(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,br)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=br.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(br.copy(this.origin).addScaledVector(this.direction,t),br.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){bd.copy(e).add(t).multiplyScalar(.5),Dc.copy(t).sub(e).normalize(),Uc.copy(this.origin).sub(bd);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Dc),c=Uc.dot(this.direction),u=-Uc.dot(Dc),h=Uc.lengthSq(),f=Math.abs(1-o*o);let p,m,g,v;if(f>0)if(p=o*u-c,m=o*c-u,v=s*f,p>=0)if(m>=-v)if(m<=v){const M=1/f;p*=M,m*=M,g=p*(p+o*m+2*c)+m*(o*p+m+2*u)+h}else m=s,p=Math.max(0,-(o*m+c)),g=-p*p+m*(m+2*u)+h;else m=-s,p=Math.max(0,-(o*m+c)),g=-p*p+m*(m+2*u)+h;else m<=-v?(p=Math.max(0,-(-o*s+c)),m=p>0?-s:Math.min(Math.max(-s,-u),s),g=-p*p+m*(m+2*u)+h):m<=v?(p=0,m=Math.min(Math.max(-s,-u),s),g=m*(m+2*u)+h):(p=Math.max(0,-(o*s+c)),m=p>0?s:Math.min(Math.max(-s,-u),s),g=-p*p+m*(m+2*u)+h);else m=o>0?-s:s,p=Math.max(0,-(o*m+c)),g=-p*p+m*(m+2*u)+h;return n&&n.copy(this.origin).addScaledVector(this.direction,p),i&&i.copy(bd).addScaledVector(Dc,m),g}intersectSphere(e,t){if(e.radius<0)return null;br.subVectors(e.center,this.origin);const n=br.dot(this.direction),i=br.dot(br)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),c=n-o,u=n+o;return u<0?null:c<0?this.at(u,t):this.at(c,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,c,u;const h=1/this.direction.x,f=1/this.direction.y,p=1/this.direction.z,m=this.origin;return h>=0?(n=(e.min.x-m.x)*h,i=(e.max.x-m.x)*h):(n=(e.max.x-m.x)*h,i=(e.min.x-m.x)*h),f>=0?(s=(e.min.y-m.y)*f,o=(e.max.y-m.y)*f):(s=(e.max.y-m.y)*f,o=(e.min.y-m.y)*f),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),p>=0?(c=(e.min.z-m.z)*p,u=(e.max.z-m.z)*p):(c=(e.max.z-m.z)*p,u=(e.min.z-m.z)*p),n>u||c>i)||((c>n||n!==n)&&(n=c),(u<i||i!==i)&&(i=u),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,br)!==null}intersectTriangle(e,t,n,i,s){const o=this.origin,c=this.direction,u=c.x,h=c.y,f=c.z,p=e.x-o.x,m=e.y-o.y,g=e.z-o.z,v=t.x-o.x,M=t.y-o.y,y=t.z-o.z,x=n.x-o.x,w=n.y-o.y,b=n.z-o.z,T=Math.abs(u),P=Math.abs(h),R=Math.abs(f);let E,C,B,N,D,Y,K,H,ne,oe,te,k;if(T>=P&&T>=R?(B=u,Y=p,ne=v,k=x,u>=0?(E=h,C=f,N=m,D=g,K=M,H=y,oe=w,te=b):(E=f,C=h,N=g,D=m,K=y,H=M,oe=b,te=w)):P>=R?(B=h,Y=m,ne=M,k=w,h>=0?(E=f,C=u,N=g,D=p,K=y,H=v,oe=b,te=x):(E=u,C=f,N=p,D=g,K=v,H=y,oe=x,te=b)):(B=f,Y=g,ne=y,k=b,f>=0?(E=u,C=h,N=p,D=m,K=v,H=M,oe=x,te=w):(E=h,C=u,N=m,D=p,K=M,H=v,oe=w,te=x)),B===0)return null;const G=E/B,W=C/B,J=1/B,_e=N-G*Y,Te=D-W*Y,ae=K-G*ne,Me=H-W*ne,Pe=oe-G*k,Ye=te-W*k,Ue=Pe*Me-Ye*ae,et=_e*Ye-Te*Pe,kt=ae*Te-Me*_e;if(i){if(Ue<0||et<0||kt<0)return null}else if((Ue<0||et<0||kt<0)&&(Ue>0||et>0||kt>0))return null;const Ke=Ue+et+kt;if(Ke===0)return null;const gt=J*(Ue*Y+et*ne+kt*k);return(Ke>0?gt<0:gt>0)?null:this.at(gt/Ke,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ws extends Dn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xi,this.combine=gl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const S0=new mt,_s=new Gs,Oc=new yn,M0=new O,Fc=new O,Bc=new O,zc=new O,Td=new O,kc=new O,w0=new O,Hc=new O;class Sn extends zt{constructor(e=new wt,t=new Ws){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const c=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const c=this.morphTargetInfluences;if(s&&c){kc.set(0,0,0);for(let u=0,h=s.length;u<h;u++){const f=c[u],p=s[u];f!==0&&(Td.fromBufferAttribute(p,e),o?kc.addScaledVector(Td,f):kc.addScaledVector(Td.sub(t),f))}t.add(kc)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Oc.copy(n.boundingSphere),Oc.applyMatrix4(s),_s.copy(e.ray).recast(e.near),!(Oc.containsPoint(_s.origin)===!1&&(_s.intersectSphere(Oc,M0)===null||_s.origin.distanceToSquared(M0)>(e.far-e.near)**2))&&(S0.copy(s).invert(),_s.copy(e.ray).applyMatrix4(S0),!(n.boundingBox!==null&&_s.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,_s)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,c=s.index,u=s.attributes.position,h=s.attributes.uv,f=s.attributes.uv1,p=s.attributes.normal,m=s.groups,g=s.drawRange;if(c!==null)if(Array.isArray(o))for(let v=0,M=m.length;v<M;v++){const y=m[v],x=o[y.materialIndex],w=Math.max(y.start,g.start),b=Math.min(c.count,Math.min(y.start+y.count,g.start+g.count));for(let T=w,P=b;T<P;T+=3){const R=c.getX(T),E=c.getX(T+1),C=c.getX(T+2);i=Vc(this,x,e,n,h,f,p,R,E,C),i&&(i.faceIndex=Math.floor(T/3),i.face.materialIndex=y.materialIndex,t.push(i))}}else{const v=Math.max(0,g.start),M=Math.min(c.count,g.start+g.count);for(let y=v,x=M;y<x;y+=3){const w=c.getX(y),b=c.getX(y+1),T=c.getX(y+2);i=Vc(this,o,e,n,h,f,p,w,b,T),i&&(i.faceIndex=Math.floor(y/3),t.push(i))}}else if(u!==void 0)if(Array.isArray(o))for(let v=0,M=m.length;v<M;v++){const y=m[v],x=o[y.materialIndex],w=Math.max(y.start,g.start),b=Math.min(u.count,Math.min(y.start+y.count,g.start+g.count));for(let T=w,P=b;T<P;T+=3){const R=T,E=T+1,C=T+2;i=Vc(this,x,e,n,h,f,p,R,E,C),i&&(i.faceIndex=Math.floor(T/3),i.face.materialIndex=y.materialIndex,t.push(i))}}else{const v=Math.max(0,g.start),M=Math.min(u.count,g.start+g.count);for(let y=v,x=M;y<x;y+=3){const w=y,b=y+1,T=y+2;i=Vc(this,o,e,n,h,f,p,w,b,T),i&&(i.faceIndex=Math.floor(y/3),t.push(i))}}}}function lw(r,e,t,n,i,s,o,c){let u;if(e.side===Jn?u=n.intersectTriangle(o,s,i,!0,c):u=n.intersectTriangle(i,s,o,e.side===$r,c),u===null)return null;Hc.copy(c),Hc.applyMatrix4(r.matrixWorld);const h=t.ray.origin.distanceTo(Hc);return h<t.near||h>t.far?null:{distance:h,point:Hc.clone(),object:r}}function Vc(r,e,t,n,i,s,o,c,u,h){r.getVertexPosition(c,Fc),r.getVertexPosition(u,Bc),r.getVertexPosition(h,zc);const f=lw(r,e,t,n,Fc,Bc,zc,w0);if(f){const p=new O;si.getBarycoord(w0,Fc,Bc,zc,p),i&&(f.uv=si.getInterpolatedAttribute(i,c,u,h,p,new me)),s&&(f.uv1=si.getInterpolatedAttribute(s,c,u,h,p,new me)),o&&(f.normal=si.getInterpolatedAttribute(o,c,u,h,p,new O),f.normal.dot(n.direction)>0&&f.normal.multiplyScalar(-1));const m={a:c,b:u,c:h,normal:new O,materialIndex:0};si.getNormal(Fc,Bc,zc,m.normal),f.face=m,f.barycoord=p}return f}const Ia=new Ot,E0=new Ot,b0=new Ot,cw=new Ot,T0=new mt,Gc=new O,Ad=new yn,A0=new mt,Cd=new Gs;class ix extends Sn{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=cp,this.bindMatrix=new mt,this.bindMatrixInverse=new mt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new xn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Gc),this.boundingBox.expandByPoint(Gc)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new yn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Gc),this.boundingSphere.expandByPoint(Gc)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ad.copy(this.boundingSphere),Ad.applyMatrix4(i),e.ray.intersectsSphere(Ad)!==!1&&(A0.copy(i).invert(),Cd.copy(e.ray).applyMatrix4(A0),!(this.boundingBox!==null&&Cd.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Cd)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Ot,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===cp?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Uv?this.bindMatrixInverse.copy(this.bindMatrix).invert():Be("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;E0.fromBufferAttribute(i.attributes.skinIndex,e),b0.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(Ia.copy(t),t.set(0,0,0,0)):(Ia.set(t.x,t.y,t.z,1),t.set(0,0,0)),Ia.applyMatrix4(this.bindMatrix);for(let s=0;s<4;s++){const o=b0.getComponent(s);if(o!==0){const c=E0.getComponent(s);T0.multiplyMatrices(n.bones[c].matrixWorld,n.boneInverses[c]),t.addScaledVector(cw.copy(Ia).applyMatrix4(T0),o)}}return t.isVector4&&(t.w=Ia.w),t.applyMatrix4(this.bindMatrixInverse)}}class jp extends zt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Ri extends sn{constructor(e=null,t=1,n=1,i,s,o,c,u,h=hn,f=hn,p,m){super(null,o,c,u,h,f,i,s,p,m),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const C0=new mt,uw=new mt;class Dh{constructor(e=[],t=[]){this.uuid=Ii(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.previousBoneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Be("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new mt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new mt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const c=e[s]?e[s].matrixWorld:uw;C0.multiplyMatrices(c,t[s]),C0.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Dh(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Ri(t,e,e,jn,Zn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null),this.previousBoneTexture!==null&&(this.previousBoneTexture.dispose(),this.previousBoneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(Be("Skeleton: No bone found with UUID:",s),o=new jp),this.bones.push(o),this.boneInverses.push(new mt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const c=n[i];e.boneInverses.push(c.toArray())}return e}}class Zo extends Jt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ao=new mt,R0=new mt,Wc=[],P0=new xn,hw=new mt,La=new Sn,Na=new yn;class rx extends Sn{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Zo(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,hw)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new xn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ao),P0.copy(e.boundingBox).applyMatrix4(Ao),this.boundingBox.union(P0)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new yn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ao),Na.copy(e.boundingSphere).applyMatrix4(Ao),this.boundingSphere.union(Na)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture!==null?e.morphTexture.clone():null,this.instanceColor=e.instanceColor!==null?e.instanceColor.clone():null,this.count=e.count,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let c=0;c<n.length;c++)n[c]=i[o+c]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(La.geometry=this.geometry,La.material=this.material,La.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Na.copy(this.boundingSphere),Na.applyMatrix4(n),e.ray.intersectsSphere(Na)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Ao),R0.multiplyMatrices(n,Ao),La.matrixWorld=R0,La.raycast(e,Wc);for(let o=0,c=Wc.length;o<c;o++){const u=Wc[o];u.instanceId=s,u.object=this,t.push(u)}Wc.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Zo(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ri(new Float32Array(i*this.count),i,this.count,wh,Zn));const s=this.morphTexture.source.data.data;let o=0;for(let h=0;h<n.length;h++)o+=n[h];const c=this.geometry.morphTargetsRelative?1:1-o,u=i*e;return s[u]=c,s.set(n,u+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const vs=new yn,fw=new me(.5,.5),Xc=new O;class ks{constructor(e=new ar,t=new ar,n=new ar,i=new ar,s=new ar,o=new ar){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(n),c[3].copy(i),c[4].copy(s),c[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=gi,n=!1){const i=this.planes,s=e.elements,o=s[0],c=s[1],u=s[2],h=s[3],f=s[4],p=s[5],m=s[6],g=s[7],v=s[8],M=s[9],y=s[10],x=s[11],w=s[12],b=s[13],T=s[14],P=s[15];if(i[0].setComponents(h-o,g-f,x-v,P-w).normalize(),i[1].setComponents(h+o,g+f,x+v,P+w).normalize(),i[2].setComponents(h+c,g+p,x+M,P+b).normalize(),i[3].setComponents(h-c,g-p,x-M,P-b).normalize(),n)i[4].setComponents(u,m,y,T).normalize(),i[5].setComponents(h-u,g-m,x-y,P-T).normalize();else if(i[4].setComponents(h-u,g-m,x-y,P-T).normalize(),t===gi)i[5].setComponents(h+u,g+m,x+y,P+T).normalize();else if(t===zs)i[5].setComponents(u,m,y,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),vs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),vs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(vs)}intersectsSprite(e){vs.center.set(0,0,0);const t=fw.distanceTo(e.center);return vs.radius=.7071067811865476+t,vs.applyMatrix4(e.matrixWorld),this.intersectsSphere(vs)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Xc.x=i.normal.x>0?e.max.x:e.min.x,Xc.y=i.normal.y>0?e.max.y:e.min.y,Xc.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Xc)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const I0=new mt;class vl{constructor(){this.coordinateSystem=gi,this._frustums=[],this._count=0}setFromArrayCamera(e){const t=e.cameras,n=this._frustums;for(let i=0;i<t.length;i++){const s=t[i];I0.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),n[i]===void 0&&(n[i]=new ks),n[i].setFromProjectionMatrix(I0,s.coordinateSystem,s.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;const t=this._frustums,n=e._frustums;for(let i=0;i<e._count;i++)t[i]===void 0&&(t[i]=new ks),t[i].copy(n[i]);return this._count=e._count,this}clone(){return new vl().copy(this)}}function Rd(r,e){return r-e}function dw(r,e){return r.z-e.z}function pw(r,e){return e.z-r.z}class mw{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){const s=this.pool,o=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});const c=s[this.index];o.push(c),this.index++,c.start=e,c.count=t,c.z=n,c.index=i}reset(){this.list.length=0,this.index=0}}const ni=new mt,gw=new Xe(1,1,1),_w=new ks,vw=new vl,Yc=new xn,xs=new yn,Pd=new O,L0=new O,N0=new O,xw=new O,Id=new mw,Hn=new Sn,qc=[];function yw(r,e,t=0){const n=e.itemSize;if(r.isInterleavedBufferAttribute||r.array.constructor!==e.array.constructor){const i=r.count;for(let s=0;s<i;s++)for(let o=0;o<n;o++)e.setComponent(s+t,o,r.getComponent(s,o))}else e.array.set(r.array,t*n);e.needsUpdate=!0}function nr(r,e){if(r.constructor!==e.constructor){const t=Math.min(r.length,e.length);for(let n=0;n<t;n++)e[n]=r[n]}else{const t=Math.min(r.length,e.length);e.set(new r.constructor(r.buffer,0,t))}}class sx extends Sn{constructor(e,t,n=t*2,i){super(new wt,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=e,this._maxVertexCount=t,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._multiDrawBytesPerElement=1,this._mergedDrawCounts=new Int32Array(e),this._mergedDrawStarts=new Int32Array(e),this._mergedDrawInstanceCounts=new Int32Array(e),this._mergedDrawCount=0,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._previousMatricesTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}_initMatricesTexture(){let e=Math.sqrt(this._maxInstanceCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4),n=new Ri(t,e,e,jn,Zn);this._matricesTexture=n}_initIndirectTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Uint32Array(e*e),n=new Ri(t,e,e,_l,Pi);this._indirectTexture=n}_initColorsTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Float32Array(e*e*4).fill(1),n=new Ri(t,e,e,jn,Zn);n.colorSpace=Dt.workingColorSpace,this._colorsTexture=n}_initializeGeometry(e){const t=this.geometry,n=this._maxVertexCount,i=this._maxIndexCount;if(this._geometryInitialized===!1){for(const s in e.attributes){const o=e.getAttribute(s),{array:c,itemSize:u,normalized:h}=o,f=new c.constructor(n*u),p=new Jt(f,u,h);t.setAttribute(s,p)}if(e.getIndex()!==null){const s=n>65535?new Uint32Array(i):new Uint16Array(i);t.setIndex(new Jt(s,1))}this._geometryInitialized=!0}}_validateGeometry(e){const t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('THREE.BatchedMesh: All geometries must consistently have "index".');for(const n in t.attributes){if(!e.hasAttribute(n))throw new Error(`THREE.BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);const i=e.getAttribute(n),s=t.getAttribute(n);if(i.itemSize!==s.itemSize||i.normalized!==s.normalized)throw new Error(`THREE.BatchedMesh: Added geometry attribute "${n}" has an inconsistent itemSize or normalized value.`)}}validateInstanceId(e){const t=this._instanceInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid instanceId ${e}. Instance is either out of range or has been deleted.`)}validateGeometryId(e){const t=this._geometryInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid geometryId ${e}. Geometry is either out of range or has been deleted.`)}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xn);const e=this.boundingBox,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;const s=t[n].geometryIndex;this.getMatrixAt(n,ni),this.getBoundingBoxAt(s,Yc).applyMatrix4(ni),e.union(Yc)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yn);const e=this.boundingSphere,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;const s=t[n].geometryIndex;this.getMatrixAt(n,ni),this.getBoundingSphereAt(s,xs).applyMatrix4(ni),e.union(xs)}}addInstance(e){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("THREE.BatchedMesh: Maximum item count reached.");const n={visible:!0,active:!0,geometryIndex:e};let i=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(Rd),i=this._availableInstanceIds.shift(),this._instanceInfo[i]=n):(i=this._instanceInfo.length,this._instanceInfo.push(n));const s=this._matricesTexture;ni.identity().toArray(s.image.data,i*16),s.needsUpdate=!0;const o=this._colorsTexture;return o&&(gw.toArray(o.image.data,i*4),o.needsUpdate=!0),this._visibilityChanged=!0,i}addGeometry(e,t=-1,n=-1){this._initializeGeometry(e),this._validateGeometry(e);const i={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},s=this._geometryInfo;i.vertexStart=this._nextVertexStart,i.reservedVertexCount=t===-1?e.getAttribute("position").count:t;const o=e.getIndex();if(o!==null&&(i.indexStart=this._nextIndexStart,i.reservedIndexCount=n===-1?o.count:n),i.indexStart!==-1&&i.indexStart+i.reservedIndexCount>this._maxIndexCount||i.vertexStart+i.reservedVertexCount>this._maxVertexCount)throw new Error("THREE.BatchedMesh: Reserved space request exceeds the maximum buffer size.");let u;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(Rd),u=this._availableGeometryIds.shift(),s[u]=i):(u=this._geometryCount,this._geometryCount++,s.push(i)),this.setGeometryAt(u,e),this._nextIndexStart=i.indexStart+i.reservedIndexCount,this._nextVertexStart=i.vertexStart+i.reservedVertexCount,u}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("THREE.BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);const n=this.geometry,i=n.getIndex()!==null,s=n.getIndex(),o=t.getIndex(),c=this._geometryInfo[e];if(i&&o.count>c.reservedIndexCount||t.attributes.position.count>c.reservedVertexCount)throw new Error("THREE.BatchedMesh: Reserved space not large enough for provided geometry.");const u=c.vertexStart,h=c.reservedVertexCount;c.vertexCount=t.getAttribute("position").count;for(const f in n.attributes){const p=t.getAttribute(f),m=n.getAttribute(f);yw(p,m,u);const g=p.itemSize;for(let v=p.count,M=h;v<M;v++){const y=u+v;for(let x=0;x<g;x++)m.setComponent(y,x,0)}m.needsUpdate=!0,m.addUpdateRange(u*g,h*g)}if(i){const f=c.indexStart,p=c.reservedIndexCount;c.indexCount=t.getIndex().count;for(let m=0;m<o.count;m++)s.setX(f+m,u+o.getX(m));for(let m=o.count,g=p;m<g;m++)s.setX(f+m,u);s.needsUpdate=!0,s.addUpdateRange(f,c.reservedIndexCount)}return c.start=i?c.indexStart:c.vertexStart,c.count=i?c.indexCount:c.vertexCount,c.boundingBox=null,t.boundingBox!==null&&(c.boundingBox=t.boundingBox.clone()),c.boundingSphere=null,t.boundingSphere!==null&&(c.boundingSphere=t.boundingSphere.clone()),this._visibilityChanged=!0,e}deleteGeometry(e){const t=this._geometryInfo;if(e>=t.length||t[e].active===!1)return this;const n=this._instanceInfo;for(let i=0,s=n.length;i<s;i++)n[i].active&&n[i].geometryIndex===e&&this.deleteInstance(i);return t[e].active=!1,this._availableGeometryIds.push(e),this._visibilityChanged=!0,this}deleteInstance(e){return this.validateInstanceId(e),this._instanceInfo[e].active=!1,this._availableInstanceIds.push(e),this._visibilityChanged=!0,this}optimize(){let e=0,t=0;const n=this._geometryInfo,i=n.map((o,c)=>c).sort((o,c)=>n[o].vertexStart-n[c].vertexStart),s=this.geometry;for(let o=0,c=n.length;o<c;o++){const u=i[o],h=n[u];if(h.active!==!1){if(s.index!==null){if(h.indexStart!==t){const{indexStart:f,vertexStart:p,reservedIndexCount:m}=h,g=s.index,v=g.array,M=e-p;for(let y=f;y<f+m;y++)v[y]=v[y]+M;g.array.copyWithin(t,f,f+m),g.addUpdateRange(t,m),g.needsUpdate=!0,h.indexStart=t}t+=h.reservedIndexCount}if(h.vertexStart!==e){const{vertexStart:f,reservedVertexCount:p}=h,m=s.attributes;for(const g in m){const v=m[g],{array:M,itemSize:y}=v;M.copyWithin(e*y,f*y,(f+p)*y),v.addUpdateRange(e*y,p*y),v.needsUpdate=!0}h.vertexStart=e}e+=h.reservedVertexCount,h.start=s.index?h.indexStart:h.vertexStart}}return this._nextIndexStart=t,this._nextVertexStart=e,this._visibilityChanged=!0,this}getBoundingBoxAt(e,t){if(e>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[e];if(i.boundingBox===null){const s=new xn,o=n.index,c=n.attributes.position;for(let u=i.start,h=i.start+i.count;u<h;u++){let f=u;o&&(f=o.getX(f)),s.expandByPoint(Pd.fromBufferAttribute(c,f))}i.boundingBox=s}return t.copy(i.boundingBox),t}getBoundingSphereAt(e,t){if(e>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[e];if(i.boundingSphere===null){const s=new yn;this.getBoundingBoxAt(e,Yc),Yc.getCenter(s.center);const o=n.index,c=n.attributes.position;let u=0;for(let h=i.start,f=i.start+i.count;h<f;h++){let p=h;o&&(p=o.getX(p)),Pd.fromBufferAttribute(c,p),u=Math.max(u,s.center.distanceToSquared(Pd))}s.radius=Math.sqrt(u),i.boundingSphere=s}return t.copy(i.boundingSphere),t}setMatrixAt(e,t){this.validateInstanceId(e);const n=this._matricesTexture,i=this._matricesTexture.image.data;return t.toArray(i,e*16),n.needsUpdate=!0,this}getMatrixAt(e,t){return this.validateInstanceId(e),t.fromArray(this._matricesTexture.image.data,e*16)}setColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null&&this._initColorsTexture(),t.toArray(this._colorsTexture.image.data,e*4),this._colorsTexture.needsUpdate=!0,this}getColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null?t.isVector4?t.set(1,1,1,1):t.setRGB(1,1,1):t.fromArray(this._colorsTexture.image.data,e*4)}setVisibleAt(e,t){return this.validateInstanceId(e),this._instanceInfo[e].visible===t?this:(this._instanceInfo[e].visible=t,this._visibilityChanged=!0,this)}getVisibleAt(e){return this.validateInstanceId(e),this._instanceInfo[e].visible}setGeometryIdAt(e,t){return this.validateInstanceId(e),this.validateGeometryId(t),this._instanceInfo[e].geometryIndex=t,this._visibilityChanged=!0,this}getGeometryIdAt(e){return this.validateInstanceId(e),this._instanceInfo[e].geometryIndex}getGeometryRangeAt(e,t={}){this.validateGeometryId(e);const n=this._geometryInfo[e];return t.vertexStart=n.vertexStart,t.vertexCount=n.vertexCount,t.reservedVertexCount=n.reservedVertexCount,t.indexStart=n.indexStart,t.indexCount=n.indexCount,t.reservedIndexCount=n.reservedIndexCount,t.start=n.start,t.count=n.count,t}setInstanceCount(e){const t=this._availableInstanceIds,n=this._instanceInfo;for(t.sort(Rd);t[t.length-1]===n.length-1;)n.pop(),t.pop();if(e<n.length)throw new Error(`THREE.BatchedMesh: Instance ids outside the range ${e} are being used. Cannot shrink instance count.`);const i=new Int32Array(e),s=new Int32Array(e);nr(this._multiDrawCounts,i),nr(this._multiDrawStarts,s),this._multiDrawCounts=i,this._multiDrawStarts=s;const o=new Int32Array(e),c=new Int32Array(e),u=new Int32Array(e);nr(this._mergedDrawCounts,o),nr(this._mergedDrawStarts,c),nr(this._mergedDrawInstanceCounts,u),this._mergedDrawCounts=o,this._mergedDrawStarts=c,this._mergedDrawInstanceCounts=u,this._maxInstanceCount=e;const h=this._indirectTexture,f=this._matricesTexture,p=this._colorsTexture;h.dispose(),this._initIndirectTexture(),nr(h.image.data,this._indirectTexture.image.data),f.dispose(),this._initMatricesTexture(),nr(f.image.data,this._matricesTexture.image.data),p&&(p.dispose(),this._initColorsTexture(),nr(p.image.data,this._colorsTexture.image.data)),this._previousMatricesTexture!==null&&(this._previousMatricesTexture.dispose(),this._previousMatricesTexture=null)}setGeometrySize(e,t){const n=[...this._geometryInfo].filter(c=>c.active);if(Math.max(...n.map(c=>c.vertexStart+c.reservedVertexCount))>e)throw new Error(`THREE.BatchedMesh: Geometry vertex values are being used outside the range ${e}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(u=>u.indexStart+u.reservedIndexCount))>t)throw new Error(`THREE.BatchedMesh: Geometry index values are being used outside the range ${t}. Cannot shrink further.`);const s=this.geometry;s.dispose(),this._maxVertexCount=e,this._maxIndexCount=t,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new wt,this._initializeGeometry(s));const o=this.geometry;s.index&&nr(s.index.array,o.index.array);for(const c in s.attributes)nr(s.attributes[c].array,o.attributes[c].array);this._visibilityChanged=!0}raycast(e,t){const n=this._instanceInfo,i=this._geometryInfo,s=this.matrixWorld,o=this.geometry;Hn.material=this.material,Hn.geometry.index=o.index,Hn.geometry.attributes=o.attributes,Hn.geometry.boundingBox===null&&(Hn.geometry.boundingBox=new xn),Hn.geometry.boundingSphere===null&&(Hn.geometry.boundingSphere=new yn);for(let c=0,u=n.length;c<u;c++){if(!n[c].visible||!n[c].active)continue;const h=n[c].geometryIndex,f=i[h];Hn.geometry.setDrawRange(f.start,f.count),this.getMatrixAt(c,Hn.matrixWorld).premultiply(s),this.getBoundingBoxAt(h,Hn.geometry.boundingBox),this.getBoundingSphereAt(h,Hn.geometry.boundingSphere),Hn.raycast(e,qc);for(let p=0,m=qc.length;p<m;p++){const g=qc[p];g.object=this,g.batchId=c,t.push(g)}qc.length=0}Hn.material=null,Hn.geometry.index=null,Hn.geometry.attributes={},Hn.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._geometryInfo=e._geometryInfo.map(t=>({...t,boundingBox:t.boundingBox!==null?t.boundingBox.clone():null,boundingSphere:t.boundingSphere!==null?t.boundingSphere.clone():null})),this._instanceInfo=e._instanceInfo.map(t=>({...t})),this._availableInstanceIds=e._availableInstanceIds.slice(),this._availableGeometryIds=e._availableGeometryIds.slice(),this._nextIndexStart=e._nextIndexStart,this._nextVertexStart=e._nextVertexStart,this._geometryCount=e._geometryCount,this._maxInstanceCount=e._maxInstanceCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._multiDrawBytesPerElement=e._multiDrawBytesPerElement,this._mergedDrawCounts=e._mergedDrawCounts.slice(),this._mergedDrawStarts=e._mergedDrawStarts.slice(),this._mergedDrawInstanceCounts=e._mergedDrawInstanceCounts.slice(),this._indirectTexture=e._indirectTexture.clone(),this._indirectTexture.image.data=this._indirectTexture.image.data.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),e._colorsTexture!==null?(this._colorsTexture=e._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()):this._colorsTexture=null,this}dispose(){super.dispose(),this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null),this._previousMatricesTexture!==null&&(this._previousMatricesTexture.dispose(),this._previousMatricesTexture=null)}_updateDrawParameters(e,t,n,i="multiDraw"){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;const s=t.getIndex();let o=s===null?1:s.array.BYTES_PER_ELEMENT,c=1;n.wireframe&&(c=2,o=t.attributes.position.count>65535?4:2);const u=this._instanceInfo,h=this._multiDrawStarts,f=this._multiDrawCounts,p=this._mergedDrawStarts,m=this._mergedDrawCounts,g=this._mergedDrawInstanceCounts,v=this._geometryInfo,M=this.perObjectFrustumCulled,y=this._indirectTexture,x=y.image.data,w=e.isArrayCamera?vw:_w;M&&(e.isArrayCamera?w.setFromArrayCamera(e):(ni.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse).multiply(this.matrixWorld),w.setFromProjectionMatrix(ni,e.coordinateSystem,e.reversedDepth)));let b=0,T=0;if(this.sortObjects){ni.copy(this.matrixWorld).invert(),L0.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ni),N0.set(0,0,-1).transformDirection(e.matrixWorld).transformDirection(ni);for(let E=0,C=u.length;E<C;E++)if(u[E].visible&&u[E].active){const B=u[E].geometryIndex;this.getMatrixAt(E,ni),this.getBoundingSphereAt(B,xs).applyMatrix4(ni);let N=!1;if(M&&(N=!w.intersectsSphere(xs)),!N){const D=v[B],Y=xw.subVectors(xs.center,L0).dot(N0);Id.push(D.start,D.count,Y,E)}}const P=Id.list,R=this.customSort;R===null?P.sort(n.transparent?pw:dw):R.call(this,P,e);for(let E=0,C=P.length;E<C;E++){const B=P[E],N=B.start*o*c,D=B.count*c;i==="merged"?T>0&&p[T-1]===N&&m[T-1]===D?g[T-1]++:(p[T]=N,m[T]=D,g[T]=1,T++):(h[b]=N,f[b]=D),x[b]=B.index,b++}Id.reset()}else for(let P=0,R=u.length;P<R;P++)if(u[P].visible&&u[P].active){const E=u[P].geometryIndex;let C=!1;if(M&&(this.getMatrixAt(P,ni),this.getBoundingSphereAt(E,xs).applyMatrix4(ni),C=!w.intersectsSphere(xs)),!C){const B=v[E],N=B.start*o*c,D=B.count*c;i==="merged"?T>0&&p[T-1]===N&&m[T-1]===D?g[T-1]++:(p[T]=N,m[T]=D,g[T]=1,T++):(h[b]=N,f[b]=D),x[b]=P,b++}}y.needsUpdate=!0,this._multiDrawCount=b,this._mergedDrawCount=T,this._multiDrawBytesPerElement=o,this._visibilityChanged=!1}onBeforeRender(e,t,n,i,s){e.isWebGPURenderer===!0?(this._visibilityChanged||this.perObjectFrustumCulled||this.sortObjects)&&(this._indirectTexture.needsUpdate=!0):this._updateDrawParameters(n,i,s)}onBeforeShadow(e,t,n,i,s,o){e.isWebGPURenderer!==!0&&this._updateDrawParameters(i,s,o)}}class Kn extends Dn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Xe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const uh=new O,hh=new O,D0=new mt,Da=new Gs,Zc=new yn,Ld=new O,U0=new O;let ns=class extends zt{constructor(e=new wt,t=new Kn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)uh.fromBufferAttribute(t,i-1),hh.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=uh.distanceTo(hh);e.setAttribute("lineDistance",new qe(n,1))}else Be("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Zc.copy(n.boundingSphere),Zc.applyMatrix4(i),Zc.radius+=s,e.ray.intersectsSphere(Zc)===!1)return;D0.copy(i).invert(),Da.copy(e.ray).applyMatrix4(D0);const c=s/((this.scale.x+this.scale.y+this.scale.z)/3),u=c*c,h=this.isLineSegments?2:1,f=n.index,m=n.attributes.position;if(f!==null){const g=Math.max(0,o.start),v=Math.min(f.count,o.start+o.count);for(let M=g,y=v-1;M<y;M+=h){const x=f.getX(M),w=f.getX(M+1),b=jc(this,e,Da,u,x,w,M);b&&t.push(b)}if(this.isLineLoop){const M=f.getX(v-1),y=f.getX(g),x=jc(this,e,Da,u,M,y,v-1);x&&t.push(x)}}else{const g=Math.max(0,o.start),v=Math.min(m.count,o.start+o.count);for(let M=g,y=v-1;M<y;M+=h){const x=jc(this,e,Da,u,M,M+1,M);x&&t.push(x)}if(this.isLineLoop){const M=jc(this,e,Da,u,v-1,g,v-1);M&&t.push(M)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const c=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=s}}}}};function jc(r,e,t,n,i,s,o){const c=r.geometry.attributes.position;if(uh.fromBufferAttribute(c,i),hh.fromBufferAttribute(c,s),t.distanceSqToSegment(uh,hh,Ld,U0)>n)return;Ld.applyMatrix4(r.matrixWorld);const h=e.ray.origin.distanceTo(Ld);if(!(h<e.near||h>e.far))return{distance:h,point:U0.clone().applyMatrix4(r.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:r}}const O0=new O,F0=new O;class dr extends ns{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)O0.fromBufferAttribute(t,i),F0.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+O0.distanceTo(F0);e.setAttribute("lineDistance",new qe(n,1))}else Be("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class ox extends ns{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Jp extends Dn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Xe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const B0=new mt,fp=new Gs,Jc=new yn,Kc=new O;class ax extends zt{constructor(e=new wt,t=new Jp){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Jc.copy(n.boundingSphere),Jc.applyMatrix4(i),Jc.radius+=s,e.ray.intersectsSphere(Jc)===!1)return;B0.copy(i).invert(),fp.copy(e.ray).applyMatrix4(B0);const c=s/((this.scale.x+this.scale.y+this.scale.z)/3),u=c*c,h=n.index,p=n.attributes.position;if(h!==null){const m=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let v=m,M=g;v<M;v++){const y=h.getX(v);Kc.fromBufferAttribute(p,y),z0(Kc,y,u,i,e,t,this)}}else{const m=Math.max(0,o.start),g=Math.min(p.count,o.start+o.count);for(let v=m,M=g;v<M;v++)Kc.fromBufferAttribute(p,v),z0(Kc,v,u,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const c=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=s}}}}}function z0(r,e,t,n,i,s,o){const c=fp.distanceSqToPoint(r);if(c<t){const u=new O;fp.closestPointToPoint(r,u),u.applyMatrix4(n);const h=i.ray.origin.distanceTo(u);if(h<i.near||h>i.far)return;s.push({distance:h,distanceToRay:Math.sqrt(c),point:u,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class lx extends sn{constructor(e,t,n,i,s=rn,o=rn,c,u,h){super(e,t,n,i,s,o,c,u,h),this.isVideoTexture=!0,this.generateMipmaps=!1,this._requestVideoFrameCallbackId=0;const f=this;function p(){f.needsUpdate=!0,f._requestVideoFrameCallbackId=e.requestVideoFrameCallback(p)}"requestVideoFrameCallback"in e&&(this._requestVideoFrameCallbackId=e.requestVideoFrameCallback(p))}clone(){return new this.constructor(this.image).copy(this)}update(){const e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}dispose(){this._requestVideoFrameCallbackId!==0&&(this.source.data.cancelVideoFrameCallback(this._requestVideoFrameCallbackId),this._requestVideoFrameCallbackId=0),super.dispose()}}class Sw extends lx{constructor(e,t,n,i,s,o,c,u){super({},e,t,n,i,s,o,c,u),this.isVideoFrameTexture=!0}update(){}clone(){return new this.constructor().copy(this)}setFrame(e){this.image=e,this.needsUpdate=!0}}class Mw extends sn{constructor(e,t){super({width:e,height:t}),this.isFramebufferTexture=!0,this.magFilter=hn,this.minFilter=hn,this.generateMipmaps=!1,this.needsUpdate=!0}copy(e){return super.copy(e),this.source=new ur(Object.assign({},e.image)),this}}class Uh extends sn{constructor(e=[],t,n,i,s,o,c,u,h,f,p,m){super(null,o,c,u,h,f,i,s,p,m),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}}class ww extends Uh{constructor(e,t,n,i,s,o){super(e,t,n,s,o),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=oi,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ew extends Uh{constructor(e,t,n){super(void 0,e[0].width,e[0].height,t,n,Nr),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=e}}class xl extends sn{constructor(e=[],t=Nr,n,i,s,o,c,u,h,f){super(e,t,n,i,s,o,c,u,h,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class bw extends sn{constructor(e,t,n,i,s,o,c,u,h){super(e,t,n,i,s,o,c,u,h),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Tw extends sn{constructor(e,t,n,i,s,o,c,u,h){super(e,t,n,i,s,o,c,u,h),this.isHTMLTexture=!0,this.generateMipmaps=!1,this.needsUpdate=!0;const f=e?e.parentNode:null;f!==null&&"requestPaint"in f&&(f.onpaint=()=>{this.needsUpdate=!0},f.requestPaint())}dispose(){const e=this.image?this.image.parentNode:null;e!==null&&"onpaint"in e&&(e.onpaint=null),super.dispose()}}class Hs extends sn{constructor(e,t,n=Pi,i,s,o,c=hn,u=hn,h,f=Dr,p=1){if(f!==Dr&&f!==Pr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const m={width:e,height:t,depth:p};super(m,i,s,o,c,u,f,n,h),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ur(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class Kp extends Hs{constructor(e,t=Pi,n=Nr,i,s,o=hn,c=hn,u,h=Dr){const f={width:e,height:e,depth:1},p=[f,f,f,f,f,f];super(e,e,t,n,i,s,o,c,u,h),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Qp extends sn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Xs extends wt{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const c=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const u=[],h=[],f=[],p=[];let m=0,g=0;v("z","y","x",-1,-1,n,t,e,o,s,0),v("z","y","x",1,-1,n,t,-e,o,s,1),v("x","z","y",1,1,e,n,t,i,o,2),v("x","z","y",1,-1,e,n,-t,i,o,3),v("x","y","z",1,-1,e,t,n,i,s,4),v("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(u),this.setAttribute("position",new qe(h,3)),this.setAttribute("normal",new qe(f,3)),this.setAttribute("uv",new qe(p,2));function v(M,y,x,w,b,T,P,R,E,C,B){const N=T/E,D=P/C,Y=T/2,K=P/2,H=R/2,ne=E+1,oe=C+1;let te=0,k=0;const G=new O;for(let W=0;W<oe;W++){const J=W*D-K;for(let _e=0;_e<ne;_e++){const Te=_e*N-Y;G[M]=Te*w,G[y]=J*b,G[x]=H,h.push(G.x,G.y,G.z),G[M]=0,G[y]=0,G[x]=R>0?1:-1,f.push(G.x,G.y,G.z),p.push(_e/E),p.push(1-W/C),te+=1}}for(let W=0;W<C;W++)for(let J=0;J<E;J++){const _e=m+J+ne*W,Te=m+J+ne*(W+1),ae=m+(J+1)+ne*(W+1),Me=m+(J+1)+ne*W;u.push(_e,Te,Me),u.push(Te,ae,Me),k+=6}c.addGroup(g,k,B),g+=k,m+=te}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xs(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Oh extends wt{constructor(e=1,t=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));const o=[],c=[],u=[],h=[],f=t/2,p=Math.PI/2*e,m=t,g=2*p+m,v=n*2+s,M=i+1,y=new O,x=new O;for(let w=0;w<=v;w++){let b=0,T=0,P=0,R=0;if(w<=n){const B=w/n,N=B*Math.PI/2;T=-f-e*Math.cos(N),P=e*Math.sin(N),R=-e*Math.cos(N),b=B*p}else if(w<=n+s){const B=(w-n)/s;T=-f+B*t,P=e,R=0,b=p+B*m}else{const B=(w-n-s)/n,N=B*Math.PI/2;T=f+e*Math.sin(N),P=e*Math.cos(N),R=e*Math.sin(N),b=p+m+B*p}const E=Math.max(0,Math.min(1,b/g));let C=0;w===0?C=.5/i:w===v&&(C=-.5/i);for(let B=0;B<=i;B++){const N=B/i,D=N*Math.PI*2,Y=Math.sin(D),K=Math.cos(D);x.x=-P*K,x.y=T,x.z=P*Y,c.push(x.x,x.y,x.z),y.set(-P*K,R,P*Y),y.normalize(),u.push(y.x,y.y,y.z),h.push(N+C,E)}if(w>0){const B=(w-1)*M;for(let N=0;N<i;N++){const D=B+N,Y=B+N+1,K=w*M+N,H=w*M+N+1;o.push(D,Y,K),o.push(Y,H,K)}}}this.setIndex(o),this.setAttribute("position",new qe(c,3)),this.setAttribute("normal",new qe(u,3)),this.setAttribute("uv",new qe(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Oh(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class Fh extends wt{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const s=[],o=[],c=[],u=[],h=new O,f=new me;o.push(0,0,0),c.push(0,0,1),u.push(.5,.5);for(let p=0,m=3;p<=t;p++,m+=3){const g=n+p/t*i;h.x=e*Math.cos(g),h.y=e*Math.sin(g),o.push(h.x,h.y,h.z),c.push(0,0,1),f.x=(o[m]/e+1)/2,f.y=(o[m+1]/e+1)/2,u.push(f.x,f.y)}for(let p=1;p<=t;p++)s.push(p,p+1,0);this.setIndex(s),this.setAttribute("position",new qe(o,3)),this.setAttribute("normal",new qe(c,3)),this.setAttribute("uv",new qe(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fh(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class yl extends wt{constructor(e=1,t=1,n=1,i=32,s=1,o=!1,c=0,u=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:c,thetaLength:u};const h=this;i=Math.floor(i),s=Math.floor(s);const f=[],p=[],m=[],g=[];let v=0;const M=[],y=n/2;let x=0;w(),o===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(f),this.setAttribute("position",new qe(p,3)),this.setAttribute("normal",new qe(m,3)),this.setAttribute("uv",new qe(g,2));function w(){const T=new O,P=new O;let R=0;const E=(t-e)/n;for(let C=0;C<=s;C++){const B=[],N=C/s,D=N*(t-e)+e;for(let Y=0;Y<=i;Y++){const K=Y/i,H=K*u+c,ne=Math.sin(H),oe=Math.cos(H);P.x=D*ne,P.y=-N*n+y,P.z=D*oe,p.push(P.x,P.y,P.z),T.set(ne,E,oe).normalize(),m.push(T.x,T.y,T.z),g.push(K,1-N),B.push(v++)}M.push(B)}for(let C=0;C<i;C++)for(let B=0;B<s;B++){const N=M[B][C],D=M[B+1][C],Y=M[B+1][C+1],K=M[B][C+1];(e>0||B!==0)&&(f.push(N,D,K),R+=3),(t>0||B!==s-1)&&(f.push(D,Y,K),R+=3)}h.addGroup(x,R,0),x+=R}function b(T){const P=v,R=new me,E=new O;let C=0;const B=T===!0?e:t,N=T===!0?1:-1;for(let Y=1;Y<=i;Y++)p.push(0,y*N,0),m.push(0,N,0),g.push(.5,.5),v++;const D=v;for(let Y=0;Y<=i;Y++){const H=Y/i*u+c,ne=Math.cos(H),oe=Math.sin(H);E.x=B*oe,E.y=y*N,E.z=B*ne,p.push(E.x,E.y,E.z),m.push(0,N,0),R.x=ne*.5+.5,R.y=oe*.5*N+.5,g.push(R.x,R.y),v++}for(let Y=0;Y<i;Y++){const K=P+Y,H=D+Y;T===!0?f.push(H,H+1,K):f.push(H+1,H,K),C+=3}h.addGroup(x,C,T===!0?1:2),x+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yl(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Sl extends yl{constructor(e=1,t=1,n=32,i=1,s=!1,o=0,c=Math.PI*2){super(0,e,t,n,i,s,o,c),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:o,thetaLength:c}}static fromJSON(e){return new Sl(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class is extends wt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],o=[];c(i),h(n),f(),this.setAttribute("position",new qe(s,3)),this.setAttribute("normal",new qe(s.slice(),3)),this.setAttribute("uv",new qe(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function c(w){const b=new O,T=new O,P=new O;for(let R=0;R<t.length;R+=3)g(t[R+0],b),g(t[R+1],T),g(t[R+2],P),u(b,T,P,w)}function u(w,b,T,P){const R=P+1,E=[];for(let C=0;C<=R;C++){E[C]=[];const B=w.clone().lerp(T,C/R),N=b.clone().lerp(T,C/R),D=R-C;for(let Y=0;Y<=D;Y++)Y===0&&C===R?E[C][Y]=B:E[C][Y]=B.clone().lerp(N,Y/D)}for(let C=0;C<R;C++)for(let B=0;B<2*(R-C)-1;B++){const N=Math.floor(B/2);B%2===0?(m(E[C][N+1]),m(E[C+1][N]),m(E[C][N])):(m(E[C][N+1]),m(E[C+1][N+1]),m(E[C+1][N]))}}function h(w){const b=new O;for(let T=0;T<s.length;T+=3)b.x=s[T+0],b.y=s[T+1],b.z=s[T+2],b.normalize().multiplyScalar(w),s[T+0]=b.x,s[T+1]=b.y,s[T+2]=b.z}function f(){const w=new O;for(let b=0;b<s.length;b+=3){w.x=s[b+0],w.y=s[b+1],w.z=s[b+2];const T=y(w)/2/Math.PI+.5,P=x(w)/Math.PI+.5;o.push(T,1-P)}v(),p()}function p(){for(let w=0;w<o.length;w+=6){const b=o[w+0],T=o[w+2],P=o[w+4],R=Math.max(b,T,P),E=Math.min(b,T,P);R>.9&&E<.1&&(b<.2&&(o[w+0]+=1),T<.2&&(o[w+2]+=1),P<.2&&(o[w+4]+=1))}}function m(w){s.push(w.x,w.y,w.z)}function g(w,b){const T=w*3;b.x=e[T+0],b.y=e[T+1],b.z=e[T+2]}function v(){const w=new O,b=new O,T=new O,P=new O,R=new me,E=new me,C=new me;for(let B=0,N=0;B<s.length;B+=9,N+=6){w.set(s[B+0],s[B+1],s[B+2]),b.set(s[B+3],s[B+4],s[B+5]),T.set(s[B+6],s[B+7],s[B+8]),R.set(o[N+0],o[N+1]),E.set(o[N+2],o[N+3]),C.set(o[N+4],o[N+5]),P.copy(w).add(b).add(T).divideScalar(3);const D=y(P);M(R,N+0,w,D),M(E,N+2,b,D),M(C,N+4,T,D)}}function M(w,b,T,P){P<0&&w.x===1&&(o[b]=w.x-1),T.x===0&&T.z===0&&(o[b]=P/2/Math.PI+.5)}function y(w){return Math.atan2(w.z,-w.x)}function x(w){return Math.atan2(-w.y,Math.sqrt(w.x*w.x+w.z*w.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new is(e.vertices,e.indices,e.radius,e.detail)}}class Bh extends is{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Bh(e.radius,e.detail)}}const Qc=new O,$c=new O,Nd=new O,eu=new si;class cx extends wt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const i=Math.pow(10,4),s=Math.cos(Ds*t),o=e.getIndex(),c=e.getAttribute("position"),u=o?o.count:c.count,h=[0,0,0],f=["a","b","c"],p=new Array(3),m=new Map,g=[];for(let v=0;v<u;v+=3){o?(h[0]=o.getX(v),h[1]=o.getX(v+1),h[2]=o.getX(v+2)):(h[0]=v,h[1]=v+1,h[2]=v+2);const{a:M,b:y,c:x}=eu;if(M.fromBufferAttribute(c,h[0]),y.fromBufferAttribute(c,h[1]),x.fromBufferAttribute(c,h[2]),eu.getNormal(Nd),p[0]=`${Math.round(M.x*i)},${Math.round(M.y*i)},${Math.round(M.z*i)}`,p[1]=`${Math.round(y.x*i)},${Math.round(y.y*i)},${Math.round(y.z*i)}`,p[2]=`${Math.round(x.x*i)},${Math.round(x.y*i)},${Math.round(x.z*i)}`,!(p[0]===p[1]||p[1]===p[2]||p[2]===p[0]))for(let w=0;w<3;w++){const b=(w+1)%3,T=p[w],P=p[b],R=eu[f[w]],E=eu[f[b]],C=`${T}_${P}`,B=`${P}_${T}`,N=m.get(B);N?(Nd.dot(N.normal)<=s&&(g.push(R.x,R.y,R.z),g.push(E.x,E.y,E.z)),m.set(B,null)):m.has(C)||m.set(C,{index0:h[w],index1:h[b],normal:Nd.clone()})}}for(const v of m.values())if(v){const{index0:M,index1:y}=v;Qc.fromBufferAttribute(c,M),$c.fromBufferAttribute(c,y),g.push(Qc.x,Qc.y,Qc.z),g.push($c.x,$c.y,$c.z)}this.setAttribute("position",new qe(g,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class qi{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Be("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let i=0;const s=n.length;let o;t?o=t:o=e*n[s-1];let c=0,u=s-1,h;for(;c<=u;)if(i=Math.floor(c+(u-c)/2),h=n[i]-o,h<0)c=i+1;else if(h>0)u=i-1;else{u=i;break}if(i=u,n[i]===o)return i/(s-1);const f=n[i],m=n[i+1]-f,g=(o-f)/m;return(i+g)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const o=this.getPoint(i),c=this.getPoint(s),u=t||(o.isVector2?new me:new O);return u.copy(c).sub(o).normalize(),u}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new O,i=[],s=[],o=[],c=new O,u=new mt;for(let g=0;g<=e;g++){const v=g/e;i[g]=this.getTangentAt(v,new O)}s[0]=new O,o[0]=new O;let h=Number.MAX_VALUE;const f=Math.abs(i[0].x),p=Math.abs(i[0].y),m=Math.abs(i[0].z);f<=h&&(h=f,n.set(1,0,0)),p<=h&&(h=p,n.set(0,1,0)),m<=h&&n.set(0,0,1),c.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],c),o[0].crossVectors(i[0],s[0]);for(let g=1;g<=e;g++){if(s[g]=s[g-1].clone(),o[g]=o[g-1].clone(),c.crossVectors(i[g-1],i[g]),c.length()>Number.EPSILON){c.normalize();const v=Math.acos(dt(i[g-1].dot(i[g]),-1,1));s[g].applyMatrix4(u.makeRotationAxis(c,v))}o[g].crossVectors(i[g],s[g])}if(t===!0){let g=Math.acos(dt(s[0].dot(s[e]),-1,1));g/=e,i[0].dot(c.crossVectors(s[0],s[e]))>0&&(g=-g);for(let v=1;v<=e;v++)s[v].applyMatrix4(u.makeRotationAxis(i[v],g*v)),o[v].crossVectors(i[v],s[v])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}}class zh extends qi{constructor(e=0,t=0,n=1,i=1,s=0,o=Math.PI*2,c=!1,u=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=c,this.aRotation=u}getPoint(e,t=new me){const n=t,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(o?s=0:s=i),this.aClockwise===!0&&!o&&(s===i?s=-i:s=s-i);const c=this.aStartAngle+e*s;let u=this.aX+this.xRadius*Math.cos(c),h=this.aY+this.yRadius*Math.sin(c);if(this.aRotation!==0){const f=Math.cos(this.aRotation),p=Math.sin(this.aRotation),m=u-this.aX,g=h-this.aY;u=m*f-g*p+this.aX,h=m*p+g*f+this.aY}return n.set(u,h)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class ux extends zh{constructor(e,t,n,i,s,o){super(e,t,n,n,i,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function $p(){let r=0,e=0,t=0,n=0;function i(s,o,c,u){r=s,e=c,t=-3*s+3*o-2*c-u,n=2*s-2*o+c+u}return{initCatmullRom:function(s,o,c,u,h){i(o,c,h*(c-s),h*(u-o))},initNonuniformCatmullRom:function(s,o,c,u,h,f,p){let m=(o-s)/h-(c-s)/(h+f)+(c-o)/f,g=(c-o)/f-(u-o)/(f+p)+(u-c)/p;m*=f,g*=f,i(o,c,m,g)},calc:function(s){const o=s*s,c=o*s;return r+e*s+t*o+n*c}}}const k0=new O,H0=new O,Dd=new $p,Ud=new $p,Od=new $p;class hx extends qi{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new O){const n=t,i=this.points,s=i.length,o=(s-(this.closed?0:1))*e;let c=Math.floor(o),u=o-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/s)+1)*s:u===0&&c===s-1&&(c=s-2,u=1);let h,f;this.closed||c>0?h=i[(c-1)%s]:(H0.subVectors(i[0],i[1]).add(i[0]),h=H0);const p=i[c%s],m=i[(c+1)%s];if(this.closed||c+2<s?f=i[(c+2)%s]:(k0.subVectors(i[s-1],i[s-2]).add(i[s-1]),f=k0),this.curveType==="centripetal"||this.curveType==="chordal"){const g=this.curveType==="chordal"?.5:.25;let v=Math.pow(h.distanceToSquared(p),g),M=Math.pow(p.distanceToSquared(m),g),y=Math.pow(m.distanceToSquared(f),g);M<1e-4&&(M=1),v<1e-4&&(v=M),y<1e-4&&(y=M),Dd.initNonuniformCatmullRom(h.x,p.x,m.x,f.x,v,M,y),Ud.initNonuniformCatmullRom(h.y,p.y,m.y,f.y,v,M,y),Od.initNonuniformCatmullRom(h.z,p.z,m.z,f.z,v,M,y)}else this.curveType==="catmullrom"&&(Dd.initCatmullRom(h.x,p.x,m.x,f.x,this.tension),Ud.initCatmullRom(h.y,p.y,m.y,f.y,this.tension),Od.initCatmullRom(h.z,p.z,m.z,f.z,this.tension));return n.set(Dd.calc(u),Ud.calc(u),Od.calc(u)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new O().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function V0(r,e,t,n,i){const s=(n-e)*.5,o=(i-t)*.5,c=r*r,u=r*c;return(2*t-2*n+s+o)*u+(-3*t+3*n-2*s-o)*c+s*r+t}function Aw(r,e){const t=1-r;return t*t*e}function Cw(r,e){return 2*(1-r)*r*e}function Rw(r,e){return r*r*e}function Ja(r,e,t,n){return Aw(r,e)+Cw(r,t)+Rw(r,n)}function Pw(r,e){const t=1-r;return t*t*t*e}function Iw(r,e){const t=1-r;return 3*t*t*r*e}function Lw(r,e){return 3*(1-r)*r*r*e}function Nw(r,e){return r*r*r*e}function Ka(r,e,t,n,i){return Pw(r,e)+Iw(r,t)+Lw(r,n)+Nw(r,i)}class em extends qi{constructor(e=new me,t=new me,n=new me,i=new me){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new me){const n=t,i=this.v0,s=this.v1,o=this.v2,c=this.v3;return n.set(Ka(e,i.x,s.x,o.x,c.x),Ka(e,i.y,s.y,o.y,c.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class fx extends qi{constructor(e=new O,t=new O,n=new O,i=new O){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new O){const n=t,i=this.v0,s=this.v1,o=this.v2,c=this.v3;return n.set(Ka(e,i.x,s.x,o.x,c.x),Ka(e,i.y,s.y,o.y,c.y),Ka(e,i.z,s.z,o.z,c.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class tm extends qi{constructor(e=new me,t=new me){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new me){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new me){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class dx extends qi{constructor(e=new O,t=new O){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new O){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new O){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class nm extends qi{constructor(e=new me,t=new me,n=new me){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new me){const n=t,i=this.v0,s=this.v1,o=this.v2;return n.set(Ja(e,i.x,s.x,o.x),Ja(e,i.y,s.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class kh extends qi{constructor(e=new O,t=new O,n=new O){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new O){const n=t,i=this.v0,s=this.v1,o=this.v2;return n.set(Ja(e,i.x,s.x,o.x),Ja(e,i.y,s.y,o.y),Ja(e,i.z,s.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class im extends qi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new me){const n=t,i=this.points,s=(i.length-1)*e,o=Math.floor(s),c=s-o,u=i[o===0?o:o-1],h=i[o],f=i[o>i.length-2?i.length-1:o+1],p=i[o>i.length-3?i.length-1:o+2];return n.set(V0(c,u.x,h.x,f.x,p.x),V0(c,u.y,h.y,f.y,p.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new me().fromArray(i))}return this}}var fh=Object.freeze({__proto__:null,ArcCurve:ux,CatmullRomCurve3:hx,CubicBezierCurve:em,CubicBezierCurve3:fx,EllipseCurve:zh,LineCurve:tm,LineCurve3:dx,QuadraticBezierCurve:nm,QuadraticBezierCurve3:kh,SplineCurve:im});class px extends qi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new fh[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const o=i[s]-n,c=this.curves[s],u=c.getLength(),h=u===0?0:1-o/u;return c.getPointAt(h,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const o=s[i],c=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,u=o.getPoints(c);for(let h=0;h<u.length;h++){const f=u[h];n&&n.equals(f)||(t.push(f),n=f)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this.cacheLengths=null,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new fh[i.type]().fromJSON(i))}return this.cacheLengths=null,this}}class ll extends px{constructor(e){super(),this.type="Path",this.currentPoint=new me,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new tm(this.currentPoint.clone(),new me(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const s=new nm(this.currentPoint.clone(),new me(e,t),new me(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,o){const c=new em(this.currentPoint.clone(),new me(e,t),new me(n,i),new me(s,o));return this.curves.push(c),this.currentPoint.set(s,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new im(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,o){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absarc(e+c,t+u,n,i,s,o),this}absarc(e,t,n,i,s,o){return this.absellipse(e,t,n,n,i,s,o),this}ellipse(e,t,n,i,s,o,c,u){const h=this.currentPoint.x,f=this.currentPoint.y;return this.absellipse(e+h,t+f,n,i,s,o,c,u),this}absellipse(e,t,n,i,s,o,c,u){const h=new zh(e,t,n,i,s,o,c,u);if(this.curves.length>0){const p=h.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(h);const f=h.getPoint(1);return this.currentPoint.copy(f),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Ml extends ll{constructor(e){super(e),this.uuid=Ii(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new ll().fromJSON(i))}return this}}function Dw(r,e,t=2){const n=e&&e.length,i=n?e[0]*t:r.length;let s=mx(r,0,i,t,!0);const o=[];if(!s||s.next===s.prev)return o;let c,u,h;if(n&&(s=zw(r,e,s,t)),r.length>80*t){c=r[0],u=r[1];let f=c,p=u;for(let m=t;m<i;m+=t){const g=r[m],v=r[m+1];g<c&&(c=g),v<u&&(u=v),g>f&&(f=g),v>p&&(p=v)}h=Math.max(f-c,p-u),h=h!==0?32767/h:0}return cl(s,o,t,c,u,h,0),o}function mx(r,e,t,n,i){let s;if(i===Jw(r,e,t,n)>0)for(let o=e;o<t;o+=n)s=G0(o/n|0,r[o],r[o+1],s);else for(let o=t-n;o>=e;o-=n)s=G0(o/n|0,r[o],r[o+1],s);return s&&jo(s,s.next)&&(hl(s),s=s.next),s}function Vs(r,e){if(!r)return r;e||(e=r);let t=r,n;do if(n=!1,!t.steiner&&(jo(t,t.next)||nn(t.prev,t,t.next)===0)){if(hl(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function cl(r,e,t,n,i,s,o){if(!r)return;!o&&s&&Ww(r,n,i,s);let c=r;for(;r.prev!==r.next;){const u=r.prev,h=r.next;if(s?Ow(r,n,i,s):Uw(r)){e.push(u.i,r.i,h.i),hl(r),r=h.next,c=h.next;continue}if(r=h,r===c){o?o===1?(r=Fw(Vs(r),e),cl(r,e,t,n,i,s,2)):o===2&&Bw(r,e,t,n,i,s):cl(Vs(r),e,t,n,i,s,1);break}}}function Uw(r){const e=r.prev,t=r,n=r.next;if(nn(e,t,n)>=0)return!1;const i=e.x,s=t.x,o=n.x,c=e.y,u=t.y,h=n.y,f=Math.min(i,s,o),p=Math.min(c,u,h),m=Math.max(i,s,o),g=Math.max(c,u,h);let v=n.next;for(;v!==e;){if(v.x>=f&&v.x<=m&&v.y>=p&&v.y<=g&&za(i,c,s,u,o,h,v.x,v.y)&&nn(v.prev,v,v.next)>=0)return!1;v=v.next}return!0}function Ow(r,e,t,n){const i=r.prev,s=r,o=r.next;if(nn(i,s,o)>=0)return!1;const c=i.x,u=s.x,h=o.x,f=i.y,p=s.y,m=o.y,g=Math.min(c,u,h),v=Math.min(f,p,m),M=Math.max(c,u,h),y=Math.max(f,p,m),x=dp(g,v,e,t,n),w=dp(M,y,e,t,n);let b=r.prevZ,T=r.nextZ;for(;b&&b.z>=x&&T&&T.z<=w;){if(b.x>=g&&b.x<=M&&b.y>=v&&b.y<=y&&b!==i&&b!==o&&za(c,f,u,p,h,m,b.x,b.y)&&nn(b.prev,b,b.next)>=0||(b=b.prevZ,T.x>=g&&T.x<=M&&T.y>=v&&T.y<=y&&T!==i&&T!==o&&za(c,f,u,p,h,m,T.x,T.y)&&nn(T.prev,T,T.next)>=0))return!1;T=T.nextZ}for(;b&&b.z>=x;){if(b.x>=g&&b.x<=M&&b.y>=v&&b.y<=y&&b!==i&&b!==o&&za(c,f,u,p,h,m,b.x,b.y)&&nn(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;T&&T.z<=w;){if(T.x>=g&&T.x<=M&&T.y>=v&&T.y<=y&&T!==i&&T!==o&&za(c,f,u,p,h,m,T.x,T.y)&&nn(T.prev,T,T.next)>=0)return!1;T=T.nextZ}return!0}function Fw(r,e){let t=r;do{const n=t.prev,i=t.next.next;!jo(n,i)&&_x(n,t,t.next,i)&&ul(n,i)&&ul(i,n)&&(e.push(n.i,t.i,i.i),hl(t),hl(t.next),t=r=i),t=t.next}while(t!==r);return Vs(t)}function Bw(r,e,t,n,i,s){let o=r;do{let c=o.next.next;for(;c!==o.prev;){if(o.i!==c.i&&qw(o,c)){let u=vx(o,c);o=Vs(o,o.next),u=Vs(u,u.next),cl(o,e,t,n,i,s,0),cl(u,e,t,n,i,s,0);return}c=c.next}o=o.next}while(o!==r)}function zw(r,e,t,n){const i=[];for(let s=0,o=e.length;s<o;s++){const c=e[s]*n,u=s<o-1?e[s+1]*n:r.length,h=mx(r,c,u,n,!1);h===h.next&&(h.steiner=!0),i.push(Yw(h))}i.sort(kw);for(let s=0;s<i.length;s++)t=Hw(i[s],t);return t}function kw(r,e){let t=r.x-e.x;if(t===0&&(t=r.y-e.y,t===0)){const n=(r.next.y-r.y)/(r.next.x-r.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function Hw(r,e){const t=Vw(r,e);if(!t)return e;const n=vx(t,r);return Vs(n,n.next),Vs(t,t.next)}function Vw(r,e){let t=e;const n=r.x,i=r.y;let s=-1/0,o;if(jo(r,t))return t;do{if(jo(r,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){const p=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(p<=n&&p>s&&(s=p,o=t.x<t.next.x?t:t.next,p===n))return o}t=t.next}while(t!==e);if(!o)return null;const c=o,u=o.x,h=o.y;let f=1/0;t=o;do{if(n>=t.x&&t.x>=u&&n!==t.x&&gx(i<h?n:s,i,u,h,i<h?s:n,i,t.x,t.y)){const p=Math.abs(i-t.y)/(n-t.x);ul(t,r)&&(p<f||p===f&&(t.x>o.x||t.x===o.x&&Gw(o,t)))&&(o=t,f=p)}t=t.next}while(t!==c);return o}function Gw(r,e){return nn(r.prev,r,e.prev)<0&&nn(e.next,r,r.next)<0}function Ww(r,e,t,n){let i=r;do i.z===0&&(i.z=dp(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,Xw(i)}function Xw(r){let e,t=1;do{let n=r,i;r=null;let s=null;for(e=0;n;){e++;let o=n,c=0;for(let h=0;h<t&&(c++,o=o.nextZ,!!o);h++);let u=t;for(;c>0||u>0&&o;)c!==0&&(u===0||!o||n.z<=o.z)?(i=n,n=n.nextZ,c--):(i=o,o=o.nextZ,u--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;n=o}s.nextZ=null,t*=2}while(e>1);return r}function dp(r,e,t,n,i){return r=(r-t)*i|0,e=(e-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function Yw(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function gx(r,e,t,n,i,s,o,c){return(i-o)*(e-c)>=(r-o)*(s-c)&&(r-o)*(n-c)>=(t-o)*(e-c)&&(t-o)*(s-c)>=(i-o)*(n-c)}function za(r,e,t,n,i,s,o,c){return!(r===o&&e===c)&&gx(r,e,t,n,i,s,o,c)}function qw(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!Zw(r,e)&&(ul(r,e)&&ul(e,r)&&jw(r,e)&&(nn(r.prev,r,e.prev)||nn(r,e.prev,e))||jo(r,e)&&nn(r.prev,r,r.next)>0&&nn(e.prev,e,e.next)>0)}function nn(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function jo(r,e){return r.x===e.x&&r.y===e.y}function _x(r,e,t,n){const i=nu(nn(r,e,t)),s=nu(nn(r,e,n)),o=nu(nn(t,n,r)),c=nu(nn(t,n,e));return!!(i!==s&&o!==c||i===0&&tu(r,t,e)||s===0&&tu(r,n,e)||o===0&&tu(t,r,n)||c===0&&tu(t,e,n))}function tu(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function nu(r){return r>0?1:r<0?-1:0}function Zw(r,e){let t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&_x(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function ul(r,e){return nn(r.prev,r,r.next)<0?nn(r,e,r.next)>=0&&nn(r,r.prev,e)>=0:nn(r,e,r.prev)<0||nn(r,r.next,e)<0}function jw(r,e){let t=r,n=!1;const i=(r.x+e.x)/2,s=(r.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&i<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==r);return n}function vx(r,e){const t=pp(r.i,r.x,r.y),n=pp(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function G0(r,e,t,n){const i=pp(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function hl(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function pp(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Jw(r,e,t,n){let i=0;for(let s=e,o=t-n;s<t;s+=n)i+=(r[o]-r[s])*(r[s+1]+r[o+1]),o=s;return i}class Kw{static triangulate(e,t,n=2){return Dw(e,t,n)}}class Vi{static area(e){const t=e.length;let n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return n*.5}static isClockWise(e){return Vi.area(e)<0}static triangulateShape(e,t){const n=[],i=[],s=[];W0(e),X0(n,e);let o=e.length;t.forEach(W0);for(let u=0;u<t.length;u++)i.push(o),o+=t[u].length,X0(n,t[u]);const c=Kw.triangulate(n,i);for(let u=0;u<c.length;u+=3)s.push(c.slice(u,u+3));return s}}function W0(r){const e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function X0(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}class Hh extends wt{constructor(e=new Ml([new me(.5,.5),new me(-.5,.5),new me(-.5,-.5),new me(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],s=[];for(let c=0,u=e.length;c<u;c++){const h=e[c];o(h)}this.setAttribute("position",new qe(i,3)),this.setAttribute("uv",new qe(s,2)),this.computeVertexNormals();function o(c){const u=[],h=t.curveSegments!==void 0?t.curveSegments:12,f=t.steps!==void 0?t.steps:1,p=t.depth!==void 0?t.depth:1;let m=t.bevelEnabled!==void 0?t.bevelEnabled:!0,g=t.bevelThickness!==void 0?t.bevelThickness:.2,v=t.bevelSize!==void 0?t.bevelSize:g-.1,M=t.bevelOffset!==void 0?t.bevelOffset:0,y=t.bevelSegments!==void 0?t.bevelSegments:3;const x=t.extrudePath,w=t.UVGenerator!==void 0?t.UVGenerator:Qw;let b,T=!1,P,R,E,C;if(x){b=x.getSpacedPoints(f),T=!0,m=!1;const ge=x.isCatmullRomCurve3?x.closed:!1;P=x.computeFrenetFrames(f,ge),R=new O,E=new O,C=new O}m||(y=0,g=0,v=0,M=0);const B=c.extractPoints(h);let N=B.shape;const D=B.holes;if(!Vi.isClockWise(N)){N=N.reverse();for(let ge=0,Ie=D.length;ge<Ie;ge++){const Ce=D[ge];Vi.isClockWise(Ce)&&(D[ge]=Ce.reverse())}}function K(ge){const Ce=10000000000000001e-36;let Ge=ge[0];for(let Ne=1;Ne<=ge.length;Ne++){const pt=Ne%ge.length,Ze=ge[pt],Et=Ze.x-Ge.x,bt=Ze.y-Ge.y,It=Et*Et+bt*bt,q=Math.max(Math.abs(Ze.x),Math.abs(Ze.y),Math.abs(Ge.x),Math.abs(Ge.y)),Kt=Ce*q*q;if(It<=Kt){ge.splice(pt,1),Ne--;continue}Ge=Ze}}K(N),D.forEach(K);const H=D.length,ne=N;for(let ge=0;ge<H;ge++){const Ie=D[ge];N=N.concat(Ie)}function oe(ge,Ie,Ce){return Ie||nt("ExtrudeGeometry: vec does not exist"),ge.clone().addScaledVector(Ie,Ce)}const te=N.length;function k(ge,Ie,Ce){let Ge,Ne,pt;const Ze=ge.x-Ie.x,Et=ge.y-Ie.y,bt=Ce.x-ge.x,It=Ce.y-ge.y,q=Ze*Ze+Et*Et,Kt=Ze*It-Et*bt;if(Math.abs(Kt)>Number.EPSILON){const St=Math.sqrt(q),Ht=Math.sqrt(bt*bt+It*It),Le=Ie.x-Et/St,Zt=Ie.y+Ze/St,it=Ce.x-It/Ht,at=Ce.y+bt/Ht,F=((it-Le)*It-(at-Zt)*bt)/(Ze*It-Et*bt);Ge=Le+Ze*F-ge.x,Ne=Zt+Et*F-ge.y;const I=Ge*Ge+Ne*Ne;if(I<=2)return new me(Ge,Ne);pt=Math.sqrt(I/2)}else{let St=!1;Ze>Number.EPSILON?bt>Number.EPSILON&&(St=!0):Ze<-Number.EPSILON?bt<-Number.EPSILON&&(St=!0):Math.sign(Et)===Math.sign(It)&&(St=!0),St?(Ge=-Et,Ne=Ze,pt=Math.sqrt(q)):(Ge=Ze,Ne=Et,pt=Math.sqrt(q/2))}return new me(Ge/pt,Ne/pt)}const G=[];for(let ge=0,Ie=ne.length,Ce=Ie-1,Ge=ge+1;ge<Ie;ge++,Ce++,Ge++)Ce===Ie&&(Ce=0),Ge===Ie&&(Ge=0),G[ge]=k(ne[ge],ne[Ce],ne[Ge]);const W=[];let J,_e=G.concat();for(let ge=0,Ie=H;ge<Ie;ge++){const Ce=D[ge];J=[];for(let Ge=0,Ne=Ce.length,pt=Ne-1,Ze=Ge+1;Ge<Ne;Ge++,pt++,Ze++)pt===Ne&&(pt=0),Ze===Ne&&(Ze=0),J[Ge]=k(Ce[Ge],Ce[pt],Ce[Ze]);W.push(J),_e=_e.concat(J)}let Te;if(y===0)Te=Vi.triangulateShape(ne,D);else{const ge=[],Ie=[];for(let Ce=0;Ce<y;Ce++){const Ge=Ce/y,Ne=g*Math.cos(Ge*Math.PI/2),pt=v*Math.sin(Ge*Math.PI/2)+M;for(let Ze=0,Et=ne.length;Ze<Et;Ze++){const bt=oe(ne[Ze],G[Ze],pt);et(bt.x,bt.y,-Ne),Ge===0&&ge.push(bt)}for(let Ze=0,Et=H;Ze<Et;Ze++){const bt=D[Ze];J=W[Ze];const It=[];for(let q=0,Kt=bt.length;q<Kt;q++){const St=oe(bt[q],J[q],pt);et(St.x,St.y,-Ne),Ge===0&&It.push(St)}Ge===0&&Ie.push(It)}}Te=Vi.triangulateShape(ge,Ie)}const ae=Te.length,Me=v+M;for(let ge=0;ge<te;ge++){const Ie=m?oe(N[ge],_e[ge],Me):N[ge];T?(E.copy(P.normals[0]).multiplyScalar(Ie.x),R.copy(P.binormals[0]).multiplyScalar(Ie.y),C.copy(b[0]).add(E).add(R),et(C.x,C.y,C.z)):et(Ie.x,Ie.y,0)}for(let ge=1;ge<=f;ge++)for(let Ie=0;Ie<te;Ie++){const Ce=m?oe(N[Ie],_e[Ie],Me):N[Ie];T?(E.copy(P.normals[ge]).multiplyScalar(Ce.x),R.copy(P.binormals[ge]).multiplyScalar(Ce.y),C.copy(b[ge]).add(E).add(R),et(C.x,C.y,C.z)):et(Ce.x,Ce.y,p/f*ge)}for(let ge=y-1;ge>=0;ge--){const Ie=ge/y,Ce=g*Math.cos(Ie*Math.PI/2),Ge=v*Math.sin(Ie*Math.PI/2)+M;for(let Ne=0,pt=ne.length;Ne<pt;Ne++){const Ze=oe(ne[Ne],G[Ne],Ge);et(Ze.x,Ze.y,p+Ce)}for(let Ne=0,pt=D.length;Ne<pt;Ne++){const Ze=D[Ne];J=W[Ne];for(let Et=0,bt=Ze.length;Et<bt;Et++){const It=oe(Ze[Et],J[Et],Ge);T?et(It.x,It.y+b[f-1].y,b[f-1].x+Ce):et(It.x,It.y,p+Ce)}}}Pe(),Ye();function Pe(){const ge=i.length/3;if(m){let Ie=0,Ce=te*Ie;for(let Ge=0;Ge<ae;Ge++){const Ne=Te[Ge];kt(Ne[2]+Ce,Ne[1]+Ce,Ne[0]+Ce)}Ie=f+y*2,Ce=te*Ie;for(let Ge=0;Ge<ae;Ge++){const Ne=Te[Ge];kt(Ne[0]+Ce,Ne[1]+Ce,Ne[2]+Ce)}}else{for(let Ie=0;Ie<ae;Ie++){const Ce=Te[Ie];kt(Ce[2],Ce[1],Ce[0])}for(let Ie=0;Ie<ae;Ie++){const Ce=Te[Ie];kt(Ce[0]+te*f,Ce[1]+te*f,Ce[2]+te*f)}}n.addGroup(ge,i.length/3-ge,0)}function Ye(){const ge=i.length/3;let Ie=0;Ue(ne,Ie),Ie+=ne.length;for(let Ce=0,Ge=D.length;Ce<Ge;Ce++){const Ne=D[Ce];Ue(Ne,Ie),Ie+=Ne.length}n.addGroup(ge,i.length/3-ge,1)}function Ue(ge,Ie){let Ce=ge.length;for(;--Ce>=0;){const Ge=Ce;let Ne=Ce-1;Ne<0&&(Ne=ge.length-1);for(let pt=0,Ze=f+y*2;pt<Ze;pt++){const Et=te*pt,bt=te*(pt+1),It=Ie+Ge+Et,q=Ie+Ne+Et,Kt=Ie+Ne+bt,St=Ie+Ge+bt;Ke(It,q,Kt,St)}}}function et(ge,Ie,Ce){u.push(ge),u.push(Ie),u.push(Ce)}function kt(ge,Ie,Ce){gt(ge),gt(Ie),gt(Ce);const Ge=i.length/3,Ne=w.generateTopUV(n,i,Ge-3,Ge-2,Ge-1);ot(Ne[0]),ot(Ne[1]),ot(Ne[2])}function Ke(ge,Ie,Ce,Ge){gt(ge),gt(Ie),gt(Ge),gt(Ie),gt(Ce),gt(Ge);const Ne=i.length/3,pt=w.generateSideWallUV(n,i,Ne-6,Ne-3,Ne-2,Ne-1);ot(pt[0]),ot(pt[1]),ot(pt[3]),ot(pt[1]),ot(pt[2]),ot(pt[3])}function gt(ge){i.push(u[ge*3+0]),i.push(u[ge*3+1]),i.push(u[ge*3+2])}function ot(ge){s.push(ge.x),s.push(ge.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return $w(t,n,e)}static fromJSON(e,t){const n=[];for(let s=0,o=e.shapes.length;s<o;s++){const c=t[e.shapes[s]];n.push(c)}const i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new fh[i.type]().fromJSON(i)),new Hh(n,e.options)}}const Qw={generateTopUV:function(r,e,t,n,i){const s=e[t*3],o=e[t*3+1],c=e[n*3],u=e[n*3+1],h=e[i*3],f=e[i*3+1];return[new me(s,o),new me(c,u),new me(h,f)]},generateSideWallUV:function(r,e,t,n,i,s){const o=e[t*3],c=e[t*3+1],u=e[t*3+2],h=e[n*3],f=e[n*3+1],p=e[n*3+2],m=e[i*3],g=e[i*3+1],v=e[i*3+2],M=e[s*3],y=e[s*3+1],x=e[s*3+2];return Math.abs(c-f)<Math.abs(o-h)?[new me(o,1-u),new me(h,1-p),new me(m,1-v),new me(M,1-x)]:[new me(c,1-u),new me(f,1-p),new me(g,1-v),new me(y,1-x)]}};function $w(r,e,t){if(t.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){const s=r[n];t.shapes.push(s.uuid)}else t.shapes.push(r.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Vh extends is{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Vh(e.radius,e.detail)}}class Gh extends wt{constructor(e=[new me(0,-.5),new me(.5,0),new me(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=dt(i,0,Math.PI*2);const s=[],o=[],c=[],u=[],h=[],f=1/t,p=new O,m=new me,g=new O,v=new O,M=new O;let y=0,x=0;for(let w=0;w<=e.length-1;w++)switch(w){case 0:y=e[w+1].x-e[w].x,x=e[w+1].y-e[w].y,g.x=x*1,g.y=-y,g.z=x*0,M.copy(g),g.normalize(),u.push(g.x,g.y,g.z);break;case e.length-1:M.normalize(),u.push(M.x,M.y,M.z);break;default:y=e[w+1].x-e[w].x,x=e[w+1].y-e[w].y,g.x=x*1,g.y=-y,g.z=x*0,v.copy(g),g.x+=M.x,g.y+=M.y,g.z+=M.z,g.normalize(),u.push(g.x,g.y,g.z),M.copy(v)}for(let w=0;w<=t;w++){const b=n+w*f*i,T=Math.sin(b),P=Math.cos(b);for(let R=0;R<=e.length-1;R++){p.x=e[R].x*T,p.y=e[R].y,p.z=e[R].x*P,o.push(p.x,p.y,p.z),m.x=w/t,m.y=R/(e.length-1),c.push(m.x,m.y);const E=u[3*R+0]*T,C=u[3*R+1],B=u[3*R+0]*P;h.push(E,C,B)}}for(let w=0;w<t;w++)for(let b=0;b<e.length-1;b++){const T=b+w*e.length,P=T,R=T+e.length,E=T+e.length+1,C=T+1;s.push(P,R,C),s.push(E,C,R)}this.setIndex(s),this.setAttribute("position",new qe(o,3)),this.setAttribute("uv",new qe(c,2)),this.setAttribute("normal",new qe(h,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gh(e.points,e.segments,e.phiStart,e.phiLength)}}class wl extends is{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new wl(e.radius,e.detail)}}class $o extends wt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,c=Math.floor(n),u=Math.floor(i),h=c+1,f=u+1,p=e/c,m=t/u,g=[],v=[],M=[],y=[];for(let x=0;x<f;x++){const w=x*m-o;for(let b=0;b<h;b++){const T=b*p-s;v.push(T,-w,0),M.push(0,0,1),y.push(b/c),y.push(1-x/u)}}for(let x=0;x<u;x++)for(let w=0;w<c;w++){const b=w+h*x,T=w+h*(x+1),P=w+1+h*(x+1),R=w+1+h*x;g.push(b,T,R),g.push(T,P,R)}this.setIndex(g),this.setAttribute("position",new qe(v,3)),this.setAttribute("normal",new qe(M,3)),this.setAttribute("uv",new qe(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $o(e.width,e.height,e.widthSegments,e.heightSegments)}}class Wh extends wt{constructor(e=.5,t=1,n=32,i=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const c=[],u=[],h=[],f=[];let p=e;const m=(t-e)/i,g=new O,v=new me;for(let M=0;M<=i;M++){for(let y=0;y<=n;y++){const x=s+y/n*o;g.x=p*Math.cos(x),g.y=p*Math.sin(x),u.push(g.x,g.y,g.z),h.push(0,0,1),v.x=(g.x/t+1)/2,v.y=(g.y/t+1)/2,f.push(v.x,v.y)}p+=m}for(let M=0;M<i;M++){const y=M*(n+1);for(let x=0;x<n;x++){const w=x+y,b=w,T=w+n+1,P=w+n+2,R=w+1;c.push(b,T,R),c.push(T,P,R)}}this.setIndex(c),this.setAttribute("position",new qe(u,3)),this.setAttribute("normal",new qe(h,3)),this.setAttribute("uv",new qe(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wh(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Xh extends wt{constructor(e=new Ml([new me(0,.5),new me(-.5,-.5),new me(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],i=[],s=[],o=[];let c=0,u=0;if(Array.isArray(e)===!1)h(e);else for(let f=0;f<e.length;f++)h(e[f]),this.addGroup(c,u,f),c+=u,u=0;this.setIndex(n),this.setAttribute("position",new qe(i,3)),this.setAttribute("normal",new qe(s,3)),this.setAttribute("uv",new qe(o,2));function h(f){const p=i.length/3,m=f.extractPoints(t);let g=m.shape;const v=m.holes;Vi.isClockWise(g)===!1&&(g=g.reverse());for(let y=0,x=v.length;y<x;y++){const w=v[y];Vi.isClockWise(w)===!0&&(v[y]=w.reverse())}const M=Vi.triangulateShape(g,v);for(let y=0,x=v.length;y<x;y++){const w=v[y];g=g.concat(w)}for(let y=0,x=g.length;y<x;y++){const w=g[y];i.push(w.x,w.y,0),s.push(0,0,1),o.push(w.x,w.y)}for(let y=0,x=M.length;y<x;y++){const w=M[y],b=w[0]+p,T=w[1]+p,P=w[2]+p;n.push(b,T,P),u+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return eE(t,e)}static fromJSON(e,t){const n=[];for(let i=0,s=e.shapes.length;i<s;i++){const o=t[e.shapes[i]];n.push(o)}return new Xh(n,e.curveSegments)}}function eE(r,e){if(e.shapes=[],Array.isArray(r))for(let t=0,n=r.length;t<n;t++){const i=r[t];e.shapes.push(i.uuid)}else e.shapes.push(r.uuid);return e}class El extends wt{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,o=0,c=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:c},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const u=Math.min(o+c,Math.PI);let h=0;const f=[],p=new O,m=new O,g=[],v=[],M=[],y=[];for(let x=0;x<=n;x++){const w=[],b=x/n,T=o+b*c,P=e*Math.cos(T),R=Math.sqrt(e*e-P*P);let E=0;x===0&&o===0?E=.5/t:x===n&&u===Math.PI&&(E=-.5/t);for(let C=0;C<=t;C++){const B=C/t,N=i+B*s;p.x=-R*Math.cos(N),p.y=P,p.z=R*Math.sin(N),v.push(p.x,p.y,p.z),m.copy(p).normalize(),M.push(m.x,m.y,m.z),y.push(B+E,1-b),w.push(h++)}f.push(w)}for(let x=0;x<n;x++)for(let w=0;w<t;w++){const b=f[x][w+1],T=f[x][w],P=f[x+1][w],R=f[x+1][w+1];(x!==0||o>0)&&g.push(b,T,R),(x!==n-1||u<Math.PI)&&g.push(T,P,R)}this.setIndex(g),this.setAttribute("position",new qe(v,3)),this.setAttribute("normal",new qe(M,3)),this.setAttribute("uv",new qe(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new El(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Yh extends is{constructor(e=1,t=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Yh(e.radius,e.detail)}}class qh extends wt{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2,o=0,c=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s,thetaStart:o,thetaLength:c},n=Math.floor(n),i=Math.floor(i);const u=[],h=[],f=[],p=[],m=new O,g=new O,v=new O;for(let M=0;M<=n;M++){const y=o+M/n*c;for(let x=0;x<=i;x++){const w=x/i*s;g.x=(e+t*Math.cos(y))*Math.cos(w),g.y=(e+t*Math.cos(y))*Math.sin(w),g.z=t*Math.sin(y),h.push(g.x,g.y,g.z),m.x=e*Math.cos(w),m.y=e*Math.sin(w),v.subVectors(g,m).normalize(),f.push(v.x,v.y,v.z),p.push(x/i),p.push(M/n)}}for(let M=1;M<=n;M++)for(let y=1;y<=i;y++){const x=(i+1)*M+y-1,w=(i+1)*(M-1)+y-1,b=(i+1)*(M-1)+y,T=(i+1)*M+y;u.push(x,w,T),u.push(w,b,T)}this.setIndex(u),this.setAttribute("position",new qe(h,3)),this.setAttribute("normal",new qe(f,3)),this.setAttribute("uv",new qe(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qh(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}}class Zh extends wt{constructor(e=1,t=.4,n=64,i=8,s=2,o=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:o},n=Math.floor(n),i=Math.floor(i);const c=[],u=[],h=[],f=[],p=new O,m=new O,g=new O,v=new O,M=new O,y=new O,x=new O;for(let b=0;b<=n;++b){const T=b/n*s*Math.PI*2;w(T,s,o,e,g),w(T+.01,s,o,e,v),y.subVectors(v,g),x.addVectors(v,g),M.crossVectors(y,x),x.crossVectors(M,y),M.normalize(),x.normalize();for(let P=0;P<=i;++P){const R=P/i*Math.PI*2,E=-t*Math.cos(R),C=t*Math.sin(R);p.x=g.x+(E*x.x+C*M.x),p.y=g.y+(E*x.y+C*M.y),p.z=g.z+(E*x.z+C*M.z),u.push(p.x,p.y,p.z),m.subVectors(p,g).normalize(),h.push(m.x,m.y,m.z),f.push(b/n),f.push(P/i)}}for(let b=1;b<=n;b++)for(let T=1;T<=i;T++){const P=(i+1)*(b-1)+(T-1),R=(i+1)*b+(T-1),E=(i+1)*b+T,C=(i+1)*(b-1)+T;c.push(P,R,C),c.push(R,E,C)}this.setIndex(c),this.setAttribute("position",new qe(u,3)),this.setAttribute("normal",new qe(h,3)),this.setAttribute("uv",new qe(f,2));function w(b,T,P,R,E){const C=Math.cos(b),B=Math.sin(b),N=P/T*b,D=Math.cos(N);E.x=R*(2+D)*.5*C,E.y=R*(2+D)*B*.5,E.z=R*Math.sin(N)*.5}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zh(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}}class jh extends wt{constructor(e=new kh(new O(-1,-1,0),new O(-1,1,0),new O(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};const o=e.computeFrenetFrames(t,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const c=new O,u=new O,h=new me;let f=new O;const p=[],m=[],g=[],v=[];M(),this.setIndex(v),this.setAttribute("position",new qe(p,3)),this.setAttribute("normal",new qe(m,3)),this.setAttribute("uv",new qe(g,2));function M(){for(let b=0;b<t;b++)y(b);y(s===!1?t:0),w(),x()}function y(b){f=e.getPointAt(b/t,f);const T=o.normals[b],P=o.binormals[b];for(let R=0;R<=i;R++){const E=R/i*Math.PI*2,C=Math.sin(E),B=-Math.cos(E);u.x=B*T.x+C*P.x,u.y=B*T.y+C*P.y,u.z=B*T.z+C*P.z,u.normalize(),m.push(u.x,u.y,u.z),c.x=f.x+n*u.x,c.y=f.y+n*u.y,c.z=f.z+n*u.z,p.push(c.x,c.y,c.z)}}function x(){for(let b=1;b<=t;b++)for(let T=1;T<=i;T++){const P=(i+1)*(b-1)+(T-1),R=(i+1)*b+(T-1),E=(i+1)*b+T,C=(i+1)*(b-1)+T;v.push(P,R,C),v.push(R,E,C)}}function w(){for(let b=0;b<=t;b++)for(let T=0;T<=i;T++)h.x=b/t,h.y=T/i,g.push(h.x,h.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new jh(new fh[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class rm extends wt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){const t=[],n=new Set,i=new O,s=new O;if(e.index!==null){const o=e.attributes.position,c=e.index;let u=e.groups;u.length===0&&(u=[{start:0,count:c.count,materialIndex:0}]);for(let h=0,f=u.length;h<f;++h){const p=u[h],m=p.start,g=p.count;for(let v=m,M=m+g;v<M;v+=3)for(let y=0;y<3;y++){const x=c.getX(v+y),w=c.getX(v+(y+1)%3);i.fromBufferAttribute(o,x),s.fromBufferAttribute(o,w),Y0(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}}else{const o=e.attributes.position;for(let c=0,u=o.count/3;c<u;c++)for(let h=0;h<3;h++){const f=3*c+h,p=3*c+(h+1)%3;i.fromBufferAttribute(o,f),s.fromBufferAttribute(o,p),Y0(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new qe(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function Y0(r,e,t){const n=`${r.x},${r.y},${r.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${r.x},${r.y},${r.z}`;return t.has(n)===!0||t.has(i)===!0?!1:(t.add(n),t.add(i),!0)}var q0=Object.freeze({__proto__:null,BoxGeometry:Xs,CapsuleGeometry:Oh,CircleGeometry:Fh,ConeGeometry:Sl,CylinderGeometry:yl,DodecahedronGeometry:Bh,EdgesGeometry:cx,ExtrudeGeometry:Hh,IcosahedronGeometry:Vh,LatheGeometry:Gh,OctahedronGeometry:wl,PlaneGeometry:$o,PolyhedronGeometry:is,RingGeometry:Wh,ShapeGeometry:Xh,SphereGeometry:El,TetrahedronGeometry:Yh,TorusGeometry:qh,TorusKnotGeometry:Zh,TubeGeometry:jh,WireframeGeometry:rm});class xx extends Dn{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Xe(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}function Jo(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];if(Z0(i))i.isRenderTargetTexture?(Be("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(Z0(i[0])){const s=[];for(let o=0,c=i.length;o<c;o++)s[o]=i[o].clone();e[t][n]=s}else e[t][n]=i.slice();else e[t][n]=i}}return e}function Yn(r){const e={};for(let t=0;t<r.length;t++){const n=Jo(r[t]);for(const i in n)e[i]=n[i]}return e}function Z0(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function tE(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function yx(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Dt.workingColorSpace}const dh={clone:Jo,merge:Yn};var nE=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,iE=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class fr extends Dn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=nE,this.fragmentShader=iE,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Jo(e.uniforms),this.uniformsGroups=tE(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const i=e.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=t[i.value]||null;break;case"c":this.uniforms[n].value=new Xe().setHex(i.value);break;case"v2":this.uniforms[n].value=new me().fromArray(i.value);break;case"v3":this.uniforms[n].value=new O().fromArray(i.value);break;case"v4":this.uniforms[n].value=new Ot().fromArray(i.value);break;case"m3":this.uniforms[n].value=new _t().fromArray(i.value);break;case"m4":this.uniforms[n].value=new mt().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class sm extends fr{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class om extends Dn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Xe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ur,this.normalScale=new me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Sx extends om{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new me(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return dt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new Xe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Xe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Xe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(e){this._diffuseRoughness>0!=e>0&&this.version++,this._diffuseRoughness=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}get iridescenceThicknessRange(){return Ir('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(e){Ir('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),this.iridescenceThicknessMinimum=e[0],this.iridescenceThicknessMaximum=e[1]}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.diffuseRoughness=e.diffuseRoughness,this.diffuseRoughnessMap=e.diffuseRoughnessMap,this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum,this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Mx extends Dn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Xe(16777215),this.specular=new Xe(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ur,this.normalScale=new me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xi,this.combine=gl,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class wx extends Dn{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Xe(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ur,this.normalScale=new me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}class Ex extends Dn{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ur,this.normalScale=new me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class bx extends Dn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ur,this.normalScale=new me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xi,this.combine=gl,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class am extends Dn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=zv,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class lm extends Dn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Tx extends Dn{constructor(e){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new Xe(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ur,this.normalScale=new me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Ax extends Kn{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}function zi(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function ko(r){return r!==void 0&&r.inTangents!==void 0&&r.outTangents!==void 0}function Cx(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function mp(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const c=t[s]*e;for(let u=0;u!==e;++u)i[o++]=r[c+u]}return i}function Rx(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push(...o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}function rE(r,e,t,n,i=30){const s=r.clone();s.name=e;const o=[];for(let u=0;u<s.tracks.length;++u){const h=s.tracks[u],f=h.getValueSize(),p=[],m=[];for(let g=0;g<h.times.length;++g){const v=h.times[g]*i;if(!(v<t||v>=n)){p.push(h.times[g]);for(let M=0;M<f;++M)m.push(h.values[g*f+M])}}p.length!==0&&(h.times=zi(p,h.times.constructor),h.values=zi(m,h.values.constructor),o.push(h))}s.tracks=o;let c=1/0;for(let u=0;u<s.tracks.length;++u)c>s.tracks[u].times[0]&&(c=s.tracks[u].times[0]);for(let u=0;u<s.tracks.length;++u)s.tracks[u].shift(-1*c);return s.resetDuration(),s}function sE(r,e=0,t=r,n=30){n<=0&&(n=30);const i=t.tracks.length,s=e/n;for(let o=0;o<i;++o){const c=t.tracks[o],u=c.ValueTypeName;if(u==="bool"||u==="string")continue;const h=r.tracks.find(function(x){return x.name===c.name&&x.ValueTypeName===u});if(h===void 0)continue;let f=0;const p=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(f=p/3);let m=0;const g=h.getValueSize();h.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(m=g/3);const v=c.times.length-1;let M;if(s<=c.times[0]){const x=f,w=p-f;M=c.values.slice(x,w)}else if(s>=c.times[v]){const x=v*p+f,w=x+p-f;M=c.values.slice(x,w)}else{const x=c.createInterpolant();x.evaluate(s),M=x.resultBuffer.slice()}u==="quaternion"&&new Nn().fromArray(M).normalize().conjugate().toArray(M);const y=h.times.length;for(let x=0;x<y;++x){const w=x*g+m;if(u==="quaternion")Nn.multiplyQuaternionsFlat(h.values,w,M,0,h.values,w);else{const b=g-m*2;for(let T=0;T<b;++T)h.values[w+T]-=M[T]}}}return r.blendMode=zp,r}class oE{static convertArray(e,t){return zi(e,t)}static isTypedArray(e){return qv(e)}static hasTangents(e){return ko(e)}static getKeyframeOrder(e){return Cx(e)}static sortedArray(e,t,n){return mp(e,t,n)}static flattenJSON(e,t,n,i){Rx(e,t,n,i)}static subclip(e,t,n,i,s=30){return rE(e,t,n,i,s)}static makeClipAdditive(e,t=0,n=e,i=30){return sE(e,t,n,i)}}class ea{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let o;n:{i:if(!(e<i)){for(let c=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===c)break;if(s=i,i=t[++n],e<i)break t}o=t.length;break n}if(!(e>=s)){const c=t[1];e<c&&(n=2,s=c);for(let u=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===u)break;if(i=s,s=t[--n-1],e>=s)break t}o=n,n=0;break n}break e}for(;n<o;){const c=n+o>>>1;e<t[c]?o=c:n=c+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class Px extends ea{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ps,endingEnd:Ps}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,c=i[s],u=i[o];if(c===void 0)switch(this.getSettings_().endingStart){case Is:s=e,c=2*t-n;break;case il:s=i.length-2,c=t+i[s]-i[s+1];break;default:s=e,c=n}if(u===void 0)switch(this.getSettings_().endingEnd){case Is:o=e,u=2*n-t;break;case il:o=1,u=n+i[1]-i[0];break;default:o=e-1,u=t}const h=(n-t)*.5,f=this.valueSize;this._weightPrev=h/(t-c),this._weightNext=h/(u-n),this._offsetPrev=s*f,this._offsetNext=o*f}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,c=this.valueSize,u=e*c,h=u-c,f=this._offsetPrev,p=this._offsetNext,m=this._weightPrev,g=this._weightNext,v=(n-t)/(i-t),M=v*v,y=M*v,x=-m*y+2*m*M-m*v,w=(1+m)*y+(-1.5-2*m)*M+(-.5+m)*v+1,b=(-1-g)*y+(1.5+g)*M+.5*v,T=g*y-g*M;for(let P=0;P!==c;++P)s[P]=x*o[f+P]+w*o[h+P]+b*o[u+P]+T*o[p+P];return s}}class cm extends ea{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,c=this.valueSize,u=e*c,h=u-c,f=(n-t)/(i-t),p=1-f;for(let m=0;m!==c;++m)s[m]=o[h+m]*p+o[u+m]*f;return s}}class Ix extends ea{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Lx extends ea{interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,c=this.valueSize,u=e*c,h=u-c,f=this.inTangents,p=this.outTangents;if(!f||!p){const v=(n-t)/(i-t),M=1-v;for(let y=0;y!==c;++y)s[y]=o[h+y]*M+o[u+y]*v;return s}const m=c*2,g=e-1;for(let v=0;v!==c;++v){const M=o[h+v],y=o[u+v],x=g*m+v*2,w=p[x],b=p[x+1],T=e*m+v*2,P=f[T],R=f[T+1],E=lE(n,t,w,P,i);s[v]=Nx(E,M,b,R,y)}return s}}function Nx(r,e,t,n,i){const s=1-r;return s*s*s*e+3*s*s*r*t+3*s*r*r*n+r*r*r*i}function aE(r,e,t,n,i){const s=1-r;return 3*s*s*(t-e)+6*s*r*(n-t)+3*r*r*(i-n)}function lE(r,e,t,n,i){let s=(r-e)/(i-e);for(let o=0;o<8;o++){const c=Nx(s,e,t,n,i)-r;if(Math.abs(c)<1e-10)break;const u=aE(s,e,t,n,i);if(Math.abs(u)<1e-10)break;s=Math.max(0,Math.min(1,s-c/u))}return s}class Li{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=zi(t,this.TimeBufferType),this.values=zi(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:zi(e.times,Array),values:zi(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i),ko(e.settings)&&(n.settings={inTangents:zi(e.settings.inTangents,Array),outTangents:zi(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ix(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new cm(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Px(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){const t=new Lx(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case nl:t=this.InterpolantFactoryMethodDiscrete;break;case ch:t=this.InterpolantFactoryMethodLinear;break;case Su:t=this.InterpolantFactoryMethodSmooth;break;case up:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Be("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return nl;case this.InterpolantFactoryMethodLinear:return ch;case this.InterpolantFactoryMethodSmooth:return Su;case this.InterpolantFactoryMethodBezier:return up}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e;ko(this.settings)&&(j0(this.settings.inTangents,e),j0(this.settings.outTangents,e))}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e;ko(this.settings)&&(J0(this.settings.inTangents,e),J0(this.settings.outTangents,e))}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const c=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*c,o*c)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(nt("KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(nt("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let c=0;c!==s;c++){const u=n[c];if(typeof u=="number"&&isNaN(u)){nt("KeyframeTrack: Time is not a valid number.",this,c,u),e=!1;break}if(o!==null&&o>u){nt("KeyframeTrack: Out of order keys.",this,c,u,o),e=!1;break}o=u}if(i!==void 0&&qv(i))for(let c=0,u=i.length;c!==u;++c){const h=i[c];if(isNaN(h)){nt("KeyframeTrack: Value is not a valid number.",this,c,h),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Su,s=e.length-1;let o=1;for(let c=1;c<s;++c){let u=!1;const h=e[c],f=e[c+1];if(h!==f&&(c!==1||h!==e[0]))if(i)u=!0;else{const p=c*n,m=p-n,g=p+n;for(let v=0;v!==n;++v){const M=t[p+v];if(M!==t[m+v]||M!==t[g+v]){u=!0;break}}}if(u){if(c!==o){e[o]=e[c];const p=c*n,m=o*n;for(let g=0;g!==n;++g)t[m+g]=t[p+g]}++o}}if(s>0){e[o]=e[s];for(let c=s*n,u=o*n,h=0;h!==n;++h)t[u+h]=t[c+h];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,ko(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}}function j0(r,e){for(let t=0,n=r.length;t!==n;t+=2)r[t]+=e}function J0(r,e){for(let t=0,n=r.length;t!==n;t+=2)r[t]*=e}Li.prototype.ValueTypeName="";Li.prototype.TimeBufferType=Float32Array;Li.prototype.ValueBufferType=Float32Array;Li.prototype.DefaultInterpolation=ch;class Ys extends Li{constructor(e,t,n){super(e,t,n)}}Ys.prototype.ValueTypeName="bool";Ys.prototype.ValueBufferType=Array;Ys.prototype.DefaultInterpolation=nl;Ys.prototype.InterpolantFactoryMethodLinear=void 0;Ys.prototype.InterpolantFactoryMethodSmooth=void 0;class um extends Li{constructor(e,t,n,i){super(e,t,n,i)}}um.prototype.ValueTypeName="color";class Jh extends Li{constructor(e,t,n,i){super(e,t,n,i)}}Jh.prototype.ValueTypeName="number";class Dx extends ea{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,c=this.valueSize,u=(n-t)/(i-t);let h=e*c;for(let f=h+c;h!==f;h+=4)Nn.slerpFlat(s,0,o,h-c,o,h,u);return s}}class Kh extends Li{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Dx(this.times,this.values,this.getValueSize(),e)}}Kh.prototype.ValueTypeName="quaternion";Kh.prototype.InterpolantFactoryMethodSmooth=void 0;class qs extends Li{constructor(e,t,n){super(e,t,n)}}qs.prototype.ValueTypeName="string";qs.prototype.ValueBufferType=Array;qs.prototype.DefaultInterpolation=nl;qs.prototype.InterpolantFactoryMethodLinear=void 0;qs.prototype.InterpolantFactoryMethodSmooth=void 0;class hm extends Li{constructor(e,t,n,i){super(e,t,n,i)}}hm.prototype.ValueTypeName="vector";class fl{constructor(e="",t=-1,n=[],i=Th){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Ii(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,c=n.length;o!==c;++o)t.push(uE(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,o=n.length;s!==o;++s)t.push(Li.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let c=0;c<s;c++){let u=[],h=[];u.push((c+s-1)%s,c,(c+1)%s),h.push(0,1,0);const f=Cx(u);u=mp(u,1,f),h=mp(h,1,f),!i&&u[0]===0&&(u.push(s),h.push(h[0])),o.push(new Jh(".morphTargetInfluences["+t[c].name+"]",u,h).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let c=0,u=e.length;c<u;c++){const h=e[c],f=h.name.match(s);if(f&&f.length>1){const p=f[1];let m=i[p];m||(i[p]=m=[]),m.push(h)}}const o=[];for(const c in i)o.push(this.CreateFromMorphTargetSequence(c,i[c],t,n));return o}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function cE(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Jh;case"vector":case"vector2":case"vector3":case"vector4":return hm;case"color":return um;case"quaternion":return Kh;case"bool":case"boolean":return Ys;case"string":return qs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function uE(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=cE(r.type);if(r.times===void 0){const n=[],i=[];Rx(r.keys,n,i,"value"),r.times=n,r.values=i}let t;return e.parse!==void 0?t=e.parse(r):t=new e(r.name,r.times,r.values,r.interpolation),ko(r.settings)&&(t.settings={inTangents:zi(r.settings.inTangents,Float32Array),outTangents:zi(r.settings.outTangents,Float32Array)}),t}const hr={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(K0(r)||(this.files[r]=e))},get:function(r){if(this.enabled!==!1&&!K0(r))return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};function K0(r){try{const e=r.slice(r.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class fm{constructor(e,t,n){const i=this;let s=!1,o=0,c=0,u;const h=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(f){c++,s===!1&&i.onStart!==void 0&&i.onStart(f,o,c),s=!0},this.itemEnd=function(f){o++,i.onProgress!==void 0&&i.onProgress(f,o,c),o===c&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(f){i.onError!==void 0&&i.onError(f)},this.resolveURL=function(f){return f=f.normalize("NFC"),u?u(f):f},this.setURLModifier=function(f){return u=f,this},this.addHandler=function(f,p){return h.push(f,p),this},this.removeHandler=function(f){const p=h.indexOf(f);return p!==-1&&h.splice(p,2),this},this.getHandler=function(f){for(let p=0,m=h.length;p<m;p+=2){const g=h[p],v=h[p+1];if(g.global&&(g.lastIndex=0),g.test(f))return v}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Ux=new fm;class ai{constructor(e){this.manager=e!==void 0?e:Ux,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}}ai.DEFAULT_MATERIAL_NAME="__DEFAULT";const Tr={};class hE extends Error{constructor(e,t){super(e),this.response=t}}class Or extends ai{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=hr.get(`file:${e}`);if(s!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0);return}if(Tr[e]!==void 0){Tr[e].push({onLoad:t,onProgress:n,onError:i});return}Tr[e]=[],Tr[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",priority:this.priority,cache:this.cache,signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),c=this.mimeType,u=this.responseType;fetch(o).then(h=>{if(h.status===200||h.status===0){if(h.status===0&&Be("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||h.body===void 0||h.body.getReader===void 0)return h;const f=Tr[e],p=h.body.getReader(),m=h.headers.get("X-File-Size")||h.headers.get("Content-Length"),g=m?parseInt(m):0,v=g!==0;let M=0;const y=new ReadableStream({start(x){w();function w(){p.read().then(({done:b,value:T})=>{if(b)x.close();else{M+=T.byteLength;const P=new ProgressEvent("progress",{lengthComputable:v,loaded:M,total:g});for(let R=0,E=f.length;R<E;R++){const C=f[R];C.onProgress&&C.onProgress(P)}x.enqueue(T),w()}},b=>{x.error(b)})}}});return new Response(y)}else throw new hE(`fetch for "${h.url}" responded with ${h.status}: ${h.statusText}`,h)}).then(h=>{switch(u){case"arraybuffer":return h.arrayBuffer();case"blob":return h.blob();case"document":return h.text().then(f=>new DOMParser().parseFromString(f,c));case"json":return h.json();default:if(c==="")return h.text();{const p=/charset="?([^;"\s]*)"?/i.exec(c),m=p&&p[1]?p[1].toLowerCase():void 0,g=new TextDecoder(m);return h.arrayBuffer().then(v=>g.decode(v))}}}).then(h=>{hr.add(`file:${e}`,h);const f=Tr[e];delete Tr[e];for(let p=0,m=f.length;p<m;p++){const g=f[p];g.onLoad&&g.onLoad(h)}}).catch(h=>{const f=Tr[e];if(f===void 0)throw this.manager.itemError(e),h;delete Tr[e];for(let p=0,m=f.length;p<m;p++){const g=f[p];g.onError&&g.onError(h)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class fE extends ai{constructor(e){super(e)}load(e,t,n,i){const s=this,o=new Or(this.manager);o.setPriority(this.priority),o.setCache(this.cache),o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(c){try{t(s.parse(JSON.parse(c)))}catch(u){i?i(u):nt(u),s.manager.itemError(e)}},n,i)}parse(e){const t=[];for(let n=0;n<e.length;n++){const i=fl.parse(e[n]);t.push(i)}return t}}class dE extends ai{constructor(e){super(e)}load(e,t,n,i){const s=this,o=[],c=new Uh,u=new Or(this.manager);u.setPriority(this.priority),u.setCache(this.cache),u.setPath(this.path),u.setResponseType("arraybuffer"),u.setRequestHeader(this.requestHeader),u.setWithCredentials(s.withCredentials);let h=0;function f(p){u.load(e[p],function(m){const g=s.parse(m,!0);o[p]={width:g.width,height:g.height,format:g.format,mipmaps:g.mipmaps},h+=1,h===6&&(g.mipmapCount===1&&(c.minFilter=rn),c.image=o,c.format=g.format,c.needsUpdate=!0,t&&t(c))},n,i)}if(Array.isArray(e))for(let p=0,m=e.length;p<m;++p)f(p);else u.load(e,function(p){const m=s.parse(p,!0);if(m.isCubemap){const g=m.mipmaps.length/m.mipmapCount;for(let v=0;v<g;v++){o[v]={mipmaps:[]};for(let M=0;M<m.mipmapCount;M++)o[v].mipmaps.push(m.mipmaps[v*m.mipmapCount+M]),o[v].format=m.format,o[v].width=m.width,o[v].height=m.height}c.image=o}else c.image.width=m.width,c.image.height=m.height,c.mipmaps=m.mipmaps;m.mipmapCount===1&&(c.minFilter=rn),c.format=m.format,c.needsUpdate=!0,t&&t(c)},n,i);return c}}const Co=new WeakMap;class dl extends ai{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=hr.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0);else{let p=Co.get(o);p===void 0&&(p=[],Co.set(o,p)),p.push({onLoad:t,onError:i})}return o}const c=ol("img");function u(){f(),t&&t(this);const p=Co.get(this)||[];for(let m=0;m<p.length;m++){const g=p[m];g.onLoad&&g.onLoad(this)}Co.delete(this),s.manager.itemEnd(e)}function h(p){f(),i&&i(p),hr.remove(`image:${e}`);const m=Co.get(this)||[];for(let g=0;g<m.length;g++){const v=m[g];v.onError&&v.onError(p)}Co.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function f(){c.removeEventListener("load",u,!1),c.removeEventListener("error",h,!1)}return c.addEventListener("load",u,!1),c.addEventListener("error",h,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(c.crossOrigin=this.crossOrigin),hr.add(`image:${e}`,c),s.manager.itemStart(e),c.fetchPriority=this.priority,c.src=e,c}}class pE extends ai{constructor(e){super(e)}load(e,t,n,i){const s=new xl;s.colorSpace=ri;const o=new dl(this.manager);o.setPriority(this.priority),o.setCache(this.cache),o.setCrossOrigin(this.crossOrigin),o.setPath(this.path);let c=0;function u(h){o.load(e[h],function(f){s.images[h]=f,c++,c===6&&(s.needsUpdate=!0,t&&t(s))},void 0,i)}for(let h=0;h<e.length;++h)u(h);return s}}class mE extends ai{constructor(e){super(e)}load(e,t,n,i){const s=this,o=new Ri,c=new Or(this.manager);return c.setPriority(this.priority),c.setCache(this.cache),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setPath(this.path),c.setWithCredentials(s.withCredentials),c.load(e,function(u){let h;try{h=s.parse(u)}catch(f){i!==void 0?i(f):nt(f);return}s._applyTexData(o,h),t&&t(o,h)},n,i),o}createDataTexture(e){const t=new Ri;return this._applyTexData(t,this.parse(e)),t}_applyTexData(e,t){t.image!==void 0?e.image=t.image:t.data!==void 0&&(e.image.width=t.width,e.image.height=t.height,e.image.data=t.data),e.wrapS=t.wrapS!==void 0?t.wrapS:oi,e.wrapT=t.wrapT!==void 0?t.wrapT:oi,e.magFilter=t.magFilter!==void 0?t.magFilter:rn,e.minFilter=t.minFilter!==void 0?t.minFilter:rn,e.anisotropy=t.anisotropy!==void 0?t.anisotropy:1,t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.mipmaps!==void 0&&(e.mipmaps=t.mipmaps,e.minFilter=Hi),t.mipmapCount===1&&(e.minFilter=rn),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),e.needsUpdate=!0}}class gE extends ai{constructor(e){super(e)}load(e,t,n,i){const s=new sn,o=new dl(this.manager);return o.setPriority(this.priority),o.setCache(this.cache),o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(c){s.image=c,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class rs extends zt{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Xe(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Ox extends rs{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(zt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Xe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Fd=new mt,Q0=new O,$0=new O;class Qh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new me(512,512),this.mapType=qn,this.map=null,this.mapPass=null,this.matrix=new mt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ks,this._frameExtents=new me(1,1),this._viewportCount=1,this._viewports=[new Ot(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;Q0.setFromMatrixPosition(e.matrixWorld),t.position.copy(Q0),$0.setFromMatrixPosition(e.target.matrixWorld),t.lookAt($0),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,i){Fd.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Fd,e.coordinateSystem,e.reversedDepth);const s=this._frameExtents,o=i?i.z/s.x:1,c=i?i.w/s.y:1,u=i?i.x/s.x:0,h=i?i.y/s.y:0;e.coordinateSystem===zs||e.reversedDepth?t.set(.5*o,0,0,.5*o+u,0,.5*c,0,.5*c+h,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+u,0,.5*c,0,.5*c+h,0,0,.5,.5,0,0,0,1),t.multiply(Fd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const iu=new O,ru=new Nn,ir=new O;class bl extends zt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new mt,this.projectionMatrix=new mt,this.projectionMatrixInverse=new mt,this.coordinateSystem=gi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(iu,ru,ir),ir.x===1&&ir.y===1&&ir.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(iu,ru,ir.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(iu,ru,ir),ir.x===1&&ir.y===1&&ir.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(iu,ru,ir.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Jr=new O,e_=new me,t_=new me;class _n extends bl{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=qo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ds*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return qo*2*Math.atan(Math.tan(Ds*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Jr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Jr.x,Jr.y).multiplyScalar(-e/Jr.z),Jr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Jr.x,Jr.y).multiplyScalar(-e/Jr.z)}getViewSize(e,t){return this.getViewBounds(e,e_,t_),t.subVectors(t_,e_)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ds*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const u=o.fullWidth,h=o.fullHeight;s+=o.offsetX*i/u,t-=o.offsetY*n/h,i*=o.width/u,n*=o.height/h}const c=this.filmOffset;c!==0&&(s+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class _E extends Qh{constructor(){super(new _n(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=qo*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){const e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}}class Fx extends rs{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(zt.DEFAULT_UP),this.updateMatrix(),this.target=new zt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new _E}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class vE extends Qh{constructor(){super(new _n(90,1,.5,500)),this.isPointLightShadow=!0}}class Bx extends rs{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new vE}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Qr extends bl{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,c=i+t,u=i-t;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=h*this.view.offsetX,o=s+h*this.view.width,c-=f*this.view.offsetY,u=c-f*this.view.height}this.projectionMatrix.makeOrthographic(s,o,c,u,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class xE extends Qh{constructor(){super(new Qr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class zx extends rs{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(zt.DEFAULT_UP),this.updateMatrix(),this.target=new zt,this.shadow=new xE}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class kx extends rs{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Hx extends rs{constructor(e,t,n=10,i=10){super(e,t),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=i}get power(){return this.intensity*this.width*this.height*Math.PI}set power(e){this.intensity=e/(this.width*this.height*Math.PI)}copy(e){return super.copy(e),this.width=e.width,this.height=e.height,this}toJSON(e){const t=super.toJSON(e);return t.object.width=this.width,t.object.height=this.height,t}}class dm{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let e=0;e<9;e++)this.coefficients.push(new O)}set(e){for(let t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this}zero(){for(let e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this}getAt(e,t){const n=e.x,i=e.y,s=e.z,o=this.coefficients;return t.copy(o[0]).multiplyScalar(.282095),t.addScaledVector(o[1],.488603*i),t.addScaledVector(o[2],.488603*s),t.addScaledVector(o[3],.488603*n),t.addScaledVector(o[4],1.092548*(n*i)),t.addScaledVector(o[5],1.092548*(i*s)),t.addScaledVector(o[6],.315392*(3*s*s-1)),t.addScaledVector(o[7],1.092548*(n*s)),t.addScaledVector(o[8],.546274*(n*n-i*i)),t}getIrradianceAt(e,t){const n=e.x,i=e.y,s=e.z,o=this.coefficients;return t.copy(o[0]).multiplyScalar(.886227),t.addScaledVector(o[1],2*.511664*i),t.addScaledVector(o[2],2*.511664*s),t.addScaledVector(o[3],2*.511664*n),t.addScaledVector(o[4],2*.429043*n*i),t.addScaledVector(o[5],2*.429043*i*s),t.addScaledVector(o[6],.743125*s*s-.247708),t.addScaledVector(o[7],2*.429043*n*s),t.addScaledVector(o[8],.429043*(n*n-i*i)),t}add(e){for(let t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this}addScaledSH(e,t){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(e.coefficients[n],t);return this}scale(e){for(let t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this}lerp(e,t){for(let n=0;n<9;n++)this.coefficients[n].lerp(e.coefficients[n],t);return this}equals(e){for(let t=0;t<9;t++)if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0}copy(e){return this.set(e.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(e,t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(e,t+i*3);return this}toArray(e=[],t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(e,t+i*3);return e}static getBasisAt(e,t){const n=e.x,i=e.y,s=e.z;t[0]=.282095,t[1]=.488603*i,t[2]=.488603*s,t[3]=.488603*n,t[4]=1.092548*n*i,t[5]=1.092548*i*s,t[6]=.315392*(3*s*s-1),t[7]=1.092548*n*s,t[8]=.546274*(n*n-i*i)}}class Vx extends rs{constructor(e=new dm,t=1){super(void 0,t),this.isLightProbe=!0,this.type="LightProbe",this.sh=e}copy(e){return super.copy(e),this.sh.copy(e.sh),this}toJSON(e){const t=super.toJSON(e);return t.object.sh=this.sh.toArray(),t}}const n_={};class $h extends ai{constructor(e){super(e),this.textures={}}load(e,t,n,i){const s=this,o=new Or(s.manager);o.setPriority(s.priority),o.setCache(s.cache),o.setPath(s.path),o.setRequestHeader(s.requestHeader),o.setWithCredentials(s.withCredentials),o.load(e,function(c){try{t(s.parse(JSON.parse(c)))}catch(u){i?i(u):nt(u),s.manager.itemError(e)}},n,i)}parse(e){const t=this.createMaterialFromType(e.type);return t.fromJSON(e,this.textures),t}setTextures(e){return this.textures=e,this}createMaterialFromType(e){return $h.createMaterialFromType(e)}static createMaterialFromType(e){const n={ShadowMaterial:xx,SpriteMaterial:Zp,RawShaderMaterial:sm,ShaderMaterial:fr,PointsMaterial:Jp,MeshPhysicalMaterial:Sx,MeshStandardMaterial:om,MeshPhongMaterial:Mx,MeshToonMaterial:wx,MeshNormalMaterial:Ex,MeshLambertMaterial:bx,MeshDepthMaterial:am,MeshDistanceMaterial:lm,MeshBasicMaterial:Ws,MeshMatcapMaterial:Tx,LineDashedMaterial:Ax,LineBasicMaterial:Kn,Material:Dn,...n_}[e];let i;return n===void 0?(Ir(`MaterialLoader: Unknown material type "${e}". Use .registerMaterial() before starting the deserialization process.`),i=new Dn):i=new n,i}static registerMaterial(e,t){n_[e]=t}}class gp{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class pm extends wt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}class Gx extends ai{constructor(e){super(e)}load(e,t,n,i){const s=this,o=new Or(s.manager);o.setPriority(s.priority),o.setCache(s.cache),o.setPath(s.path),o.setRequestHeader(s.requestHeader),o.setWithCredentials(s.withCredentials),o.load(e,function(c){try{t(s.parse(JSON.parse(c)))}catch(u){i?i(u):nt(u),s.manager.itemError(e)}},n,i)}parse(e){const t={},n={};function i(g,v){if(t[v]!==void 0)return t[v];const y=g.interleavedBuffers[v],x=s(g,y.buffer),w=Bo(y.type,x),b=new Nh(w,y.stride);return b.uuid=y.uuid,y.usage!==void 0&&b.setUsage(y.usage),t[v]=b,b}function s(g,v){if(n[v]!==void 0)return n[v];const y=g.arrayBuffers[v],x=new Uint32Array(y).buffer;return n[v]=x,x}const o=e.isInstancedBufferGeometry?new pm:new wt,c=e.data.index;if(c!==void 0){const g=Bo(c.type,c.array);o.setIndex(new Jt(g,1))}const u=e.data.attributes;for(const g in u){const v=u[g];let M;if(v.isInterleavedBufferAttribute){const y=i(e.data,v.data);M=new _i(y,v.itemSize,v.offset,v.normalized)}else{const y=Bo(v.type,v.array),x=v.isInstancedBufferAttribute?Zo:Jt;M=new x(y,v.itemSize,v.normalized)}v.name!==void 0&&(M.name=v.name),v.usage!==void 0&&M.setUsage(v.usage),v.gpuType!==void 0&&(M.gpuType=v.gpuType),o.setAttribute(g,M)}const h=e.data.morphAttributes;if(h)for(const g in h){const v=h[g],M=[];for(let y=0,x=v.length;y<x;y++){const w=v[y];let b;if(w.isInterleavedBufferAttribute){const T=i(e.data,w.data);b=new _i(T,w.itemSize,w.offset,w.normalized)}else{const T=Bo(w.type,w.array);b=new Jt(T,w.itemSize,w.normalized)}w.name!==void 0&&(b.name=w.name),w.usage!==void 0&&b.setUsage(w.usage),w.gpuType!==void 0&&(b.gpuType=w.gpuType),M.push(b)}o.morphAttributes[g]=M}e.data.morphTargetsRelative&&(o.morphTargetsRelative=!0);const p=e.data.groups||e.data.drawcalls||e.data.offsets;if(p!==void 0)for(let g=0,v=p.length;g!==v;++g){const M=p[g];o.addGroup(M.start,M.count,M.materialIndex)}const m=e.data.boundingSphere;return m!==void 0&&(o.boundingSphere=new yn().fromJSON(m)),e.name&&(o.name=e.name),e.userData&&(o.userData=e.userData),o}}const Bd={};class yE extends ai{constructor(e){super(e)}load(e,t,n,i){const s=this,o=this.path===""?gp.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||o;const c=new Or(this.manager);c.setPriority(this.priority),c.setCache(this.cache),c.setPath(this.path),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(u){let h=null;try{h=JSON.parse(u)}catch(p){i!==void 0&&i(p),nt("ObjectLoader: Can't parse "+e+".",p.message);return}const f=h.metadata;if(f===void 0||f.type===void 0||f.type.toLowerCase()==="geometry"){i!==void 0&&i(new Error("THREE.ObjectLoader: Can't load "+e)),nt("ObjectLoader: Can't load "+e);return}s.parse(h,t)},n,i)}async loadAsync(e,t){const n=this,i=this.path===""?gp.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||i;const s=new Or(this.manager);s.setPriority(this.priority),s.setCache(this.cache),s.setPath(this.path),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials);const o=await s.loadAsync(e,t);let c;try{c=JSON.parse(o)}catch(h){throw new Error("THREE.ObjectLoader: Can't parse "+e+". "+h.message)}const u=c.metadata;if(u===void 0||u.type===void 0||u.type.toLowerCase()==="geometry")throw new Error("THREE.ObjectLoader: Can't load "+e);return await n.parseAsync(c)}parse(e,t){const n=this.parseAnimations(e.animations),i=this.parseShapes(e.shapes),s=this.parseGeometries(e.geometries,i),o=this.parseImages(e.images,function(){t!==void 0&&t(h)}),c=this.parseTextures(e.textures,o),u=this.parseMaterials(e.materials,c),h=this.parseObject(e.object,s,u,c,n),f=this.parseSkeletons(e.skeletons,h);if(this.bindSkeletons(h,f),this.bindLightTargets(h),t!==void 0){let p=!1;for(const m in o)if(o[m].data instanceof HTMLImageElement){p=!0;break}p===!1&&t(h)}return h}async parseAsync(e){const t=this.parseAnimations(e.animations),n=this.parseShapes(e.shapes),i=this.parseGeometries(e.geometries,n),s=await this.parseImagesAsync(e.images),o=this.parseTextures(e.textures,s),c=this.parseMaterials(e.materials,o),u=this.parseObject(e.object,i,c,o,t),h=this.parseSkeletons(e.skeletons,u);return this.bindSkeletons(u,h),this.bindLightTargets(u),u}static registerGeometry(e,t){Bd[e]=t}parseShapes(e){const t={};if(e!==void 0)for(let n=0,i=e.length;n<i;n++){const s=new Ml().fromJSON(e[n]);t[s.uuid]=s}return t}parseSkeletons(e,t){const n={},i={};if(t.traverse(function(s){s.isBone&&(i[s.uuid]=s)}),e!==void 0)for(let s=0,o=e.length;s<o;s++){const c=new Dh().fromJSON(e[s],i);n[c.uuid]=c}return n}parseGeometries(e,t){const n={};if(e!==void 0){const i=new Gx;for(let s=0,o=e.length;s<o;s++){let c;const u=e[s];switch(u.type){case"BufferGeometry":case"InstancedBufferGeometry":c=i.parse(u);break;default:u.type in q0?c=q0[u.type].fromJSON(u,t):u.type in Bd?c=Bd[u.type].fromJSON(u,t):Be(`ObjectLoader: Unknown geometry type "${u.type}". Use .registerGeometry() before starting the deserialization process.`)}c.uuid=u.uuid,u.name!==void 0&&(c.name=u.name),u.userData!==void 0&&(c.userData=u.userData),n[u.uuid]=c}}return n}parseMaterials(e,t){const n={},i={};if(e!==void 0){const s=new $h;s.setTextures(t);for(let o=0,c=e.length;o<c;o++){const u=e[o];n[u.uuid]===void 0&&(n[u.uuid]=s.parse(u)),i[u.uuid]=n[u.uuid]}}return i}parseAnimations(e){const t={};if(e!==void 0)for(let n=0;n<e.length;n++){const i=e[n],s=fl.parse(i);t[s.uuid]=s}return t}parseImages(e,t){const n=this,i={};let s;function o(u){return u=n.manager.resolveURL(u),n.manager.itemStart(u),s.load(u,function(){n.manager.itemEnd(u)},void 0,function(){n.manager.itemError(u),n.manager.itemEnd(u)})}function c(u){if(typeof u=="string"){const h=u,f=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(h)?h:n.resourcePath+h;return o(f)}else return u.data?{data:Bo(u.type,u.data),width:u.width,height:u.height}:null}if(e!==void 0&&e.length>0){const u=new fm(t);s=new dl(u),s.setPriority(this.priority),s.setCache(this.cache),s.setCrossOrigin(this.crossOrigin);for(let h=0,f=e.length;h<f;h++){const p=e[h],m=p.url;if(Array.isArray(m)){const g=[];for(let v=0,M=m.length;v<M;v++){const y=m[v],x=c(y);x!==null&&(x instanceof HTMLImageElement?g.push(x):g.push(new Ri(x.data,x.width,x.height)))}i[p.uuid]=new ur(g)}else{const g=c(p.url);i[p.uuid]=new ur(g)}}}return i}async parseImagesAsync(e){const t=this,n={};let i;async function s(o){if(typeof o=="string"){const c=o,u=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(c)?c:t.resourcePath+c;return await i.loadAsync(u)}else return o.data?{data:Bo(o.type,o.data),width:o.width,height:o.height}:null}if(e!==void 0&&e.length>0){i=new dl(this.manager),i.setPriority(this.priority),i.setCache(this.cache),i.setCrossOrigin(this.crossOrigin);for(let o=0,c=e.length;o<c;o++){const u=e[o],h=u.url;if(Array.isArray(h)){const f=[];for(let p=0,m=h.length;p<m;p++){const g=h[p],v=await s(g);v!==null&&(v instanceof HTMLImageElement?f.push(v):f.push(new Ri(v.data,v.width,v.height)))}n[u.uuid]=new ur(f)}else{const f=await s(u.url);n[u.uuid]=new ur(f)}}}return n}parseTextures(e,t){function n(s,o){return typeof s=="number"?s:(Be("ObjectLoader.parseTexture: Constant should be in numeric form.",s),o[s])}const i={};if(e!==void 0)for(let s=0,o=e.length;s<o;s++){const c=e[s];c.image===void 0&&Be('ObjectLoader: No "image" specified for',c.uuid),t[c.image]===void 0&&Be("ObjectLoader: Undefined image",c.image);const u=t[c.image],h=u.data;let f;Array.isArray(h)?(f=new xl,h.length===6&&(f.needsUpdate=!0)):(h&&h.data?f=new Ri:f=new sn,h&&(f.needsUpdate=!0)),f.source=u,f.uuid=c.uuid,c.name!==void 0&&(f.name=c.name),c.mapping!==void 0&&(f.mapping=n(c.mapping,SE)),c.channel!==void 0&&(f.channel=c.channel),c.offset!==void 0&&f.offset.fromArray(c.offset),c.repeat!==void 0&&f.repeat.fromArray(c.repeat),c.center!==void 0&&f.center.fromArray(c.center),c.rotation!==void 0&&(f.rotation=c.rotation),c.wrap!==void 0&&(f.wrapS=n(c.wrap[0],i_),f.wrapT=n(c.wrap[1],i_)),c.format!==void 0&&(f.format=c.format),c.internalFormat!==void 0&&(f.internalFormat=c.internalFormat),c.type!==void 0&&(f.type=c.type),c.colorSpace!==void 0&&(f.colorSpace=c.colorSpace),c.minFilter!==void 0&&(f.minFilter=n(c.minFilter,r_)),c.magFilter!==void 0&&(f.magFilter=n(c.magFilter,r_)),c.anisotropy!==void 0&&(f.anisotropy=c.anisotropy),c.flipY!==void 0&&(f.flipY=c.flipY),c.generateMipmaps!==void 0&&(f.generateMipmaps=c.generateMipmaps),c.mipmapsAutoUpdate!==void 0&&(f.mipmapsAutoUpdate=c.mipmapsAutoUpdate),c.premultiplyAlpha!==void 0&&(f.premultiplyAlpha=c.premultiplyAlpha),c.unpackAlignment!==void 0&&(f.unpackAlignment=c.unpackAlignment),c.compareFunction!==void 0&&(f.compareFunction=c.compareFunction),c.normalized!==void 0&&(f.normalized=c.normalized),c.userData!==void 0&&(f.userData=c.userData),i[c.uuid]=f}return i}parseObject(e,t,n,i,s){let o;function c(m){return t[m]===void 0&&Be("ObjectLoader: Undefined geometry",m),t[m]}function u(m){if(m!==void 0){if(Array.isArray(m)){const g=[];for(let v=0,M=m.length;v<M;v++){const y=m[v];n[y]===void 0&&Be("ObjectLoader: Undefined material",y),g.push(n[y])}return g}return n[m]===void 0&&Be("ObjectLoader: Undefined material",m),n[m]}}function h(m){return i[m]===void 0&&Be("ObjectLoader: Undefined texture",m),i[m]}let f,p;switch(e.type){case"Scene":o=new Xp,e.background!==void 0&&(Number.isInteger(e.background)?o.background=new Xe(e.background):o.background=h(e.background)),e.environment!==void 0&&(o.environment=h(e.environment)),e.fog!==void 0&&(e.fog.type==="Fog"?o.fog=new Lh(e.fog.color,e.fog.near,e.fog.far):e.fog.type==="FogExp2"&&(o.fog=new Ih(e.fog.color,e.fog.density)),e.fog.name!==""&&(o.fog.name=e.fog.name)),e.backgroundBlurriness!==void 0&&(o.backgroundBlurriness=e.backgroundBlurriness),e.backgroundIntensity!==void 0&&(o.backgroundIntensity=e.backgroundIntensity),e.backgroundRotation!==void 0&&o.backgroundRotation.fromArray(e.backgroundRotation),e.environmentIntensity!==void 0&&(o.environmentIntensity=e.environmentIntensity),e.environmentRotation!==void 0&&o.environmentRotation.fromArray(e.environmentRotation);break;case"PerspectiveCamera":o=new _n(e.fov,e.aspect,e.near,e.far),e.focus!==void 0&&(o.focus=e.focus),e.zoom!==void 0&&(o.zoom=e.zoom),e.filmGauge!==void 0&&(o.filmGauge=e.filmGauge),e.filmOffset!==void 0&&(o.filmOffset=e.filmOffset),e.view!==void 0&&(o.view=Object.assign({},e.view));break;case"OrthographicCamera":o=new Qr(e.left,e.right,e.top,e.bottom,e.near,e.far),e.zoom!==void 0&&(o.zoom=e.zoom),e.view!==void 0&&(o.view=Object.assign({},e.view));break;case"AmbientLight":o=new kx(e.color,e.intensity);break;case"DirectionalLight":o=new zx(e.color,e.intensity),o.target=e.target||"";break;case"PointLight":o=new Bx(e.color,e.intensity,e.distance,e.decay);break;case"RectAreaLight":o=new Hx(e.color,e.intensity,e.width,e.height);break;case"SpotLight":o=new Fx(e.color,e.intensity,e.distance,e.angle,e.penumbra,e.decay),o.target=e.target||"",e.map!==void 0&&(o.map=h(e.map));break;case"HemisphereLight":o=new Ox(e.color,e.groundColor,e.intensity);break;case"LightProbe":const m=new dm().fromArray(e.sh);o=new Vx(m,e.intensity);break;case"SkinnedMesh":f=c(e.geometry),p=u(e.material),o=new ix(f,p),e.bindMode!==void 0&&(o.bindMode=e.bindMode),e.bindMatrix!==void 0&&o.bindMatrix.fromArray(e.bindMatrix),e.skeleton!==void 0&&(o.skeleton=e.skeleton);break;case"Mesh":f=c(e.geometry),p=u(e.material),o=new Sn(f,p);break;case"InstancedMesh":f=c(e.geometry),p=u(e.material);const g=e.count,v=e.instanceMatrix,M=e.instanceColor;o=new rx(f,p,g),o.instanceMatrix=new Zo(new Float32Array(v.array),16),M!==void 0&&(o.instanceColor=new Zo(new Float32Array(M.array),M.itemSize));break;case"BatchedMesh":f=c(e.geometry),p=u(e.material),o=new sx(e.maxInstanceCount,e.maxVertexCount,e.maxIndexCount,p),o.geometry=f,o.perObjectFrustumCulled=e.perObjectFrustumCulled,o.sortObjects=e.sortObjects,o._drawRanges=e.drawRanges,o._reservedRanges=e.reservedRanges,o._geometryInfo=e.geometryInfo.map(y=>{let x=null,w=null;return y.boundingBox!==void 0&&(x=new xn().fromJSON(y.boundingBox)),y.boundingSphere!==void 0&&(w=new yn().fromJSON(y.boundingSphere)),{...y,boundingBox:x,boundingSphere:w}}),o._instanceInfo=e.instanceInfo,o._availableInstanceIds=e.availableInstanceIds,o._availableGeometryIds=e.availableGeometryIds,o._nextIndexStart=e.nextIndexStart,o._nextVertexStart=e.nextVertexStart,o._geometryCount=e.geometryCount,o._maxInstanceCount=e.maxInstanceCount,o._maxVertexCount=e.maxVertexCount,o._maxIndexCount=e.maxIndexCount,o._geometryInitialized=e.geometryInitialized,o._matricesTexture=h(e.matricesTexture.uuid),o._indirectTexture=h(e.indirectTexture.uuid),e.colorsTexture!==void 0&&(o._colorsTexture=h(e.colorsTexture.uuid)),e.boundingSphere!==void 0&&(o.boundingSphere=new yn().fromJSON(e.boundingSphere)),e.boundingBox!==void 0&&(o.boundingBox=new xn().fromJSON(e.boundingBox));break;case"LOD":o=new nx;break;case"Line":o=new ns(c(e.geometry),u(e.material));break;case"LineLoop":o=new ox(c(e.geometry),u(e.material));break;case"LineSegments":o=new dr(c(e.geometry),u(e.material));break;case"PointCloud":case"Points":o=new ax(c(e.geometry),u(e.material));break;case"Sprite":o=new tx(u(e.material)),e.center!==void 0&&o.center.fromArray(e.center);break;case"Group":o=new zo;break;case"Bone":o=new jp;break;default:o=new zt}if(o.uuid=e.uuid,e.name!==void 0&&(o.name=e.name),e.pivot!==void 0&&(o.pivot=new O().fromArray(e.pivot)),e.matrix!==void 0?(o.matrix.fromArray(e.matrix),e.matrixAutoUpdate!==void 0&&(o.matrixAutoUpdate=e.matrixAutoUpdate),o.matrixAutoUpdate&&(o.matrix.decompose(o.position,o.quaternion,o.scale),o.pivot!==null&&o.position.copy(o.pivot).applyMatrix4(o.matrix).sub(o.pivot))):(e.position!==void 0&&o.position.fromArray(e.position),e.rotation!==void 0&&o.rotation.fromArray(e.rotation),e.quaternion!==void 0&&o.quaternion.fromArray(e.quaternion),e.scale!==void 0&&o.scale.fromArray(e.scale)),e.up!==void 0&&o.up.fromArray(e.up),e.morphTargetDictionary!==void 0&&(o.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),e.morphTargetInfluences!==void 0&&(o.morphTargetInfluences=e.morphTargetInfluences.slice()),e.castShadow!==void 0&&(o.castShadow=e.castShadow),e.receiveShadow!==void 0&&(o.receiveShadow=e.receiveShadow),e.shadow&&(e.shadow.intensity!==void 0&&(o.shadow.intensity=e.shadow.intensity),e.shadow.bias!==void 0&&(o.shadow.bias=e.shadow.bias),e.shadow.normalBias!==void 0&&(o.shadow.normalBias=e.shadow.normalBias),e.shadow.radius!==void 0&&(o.shadow.radius=e.shadow.radius),e.shadow.blurSamples!==void 0&&(o.shadow.blurSamples=e.shadow.blurSamples),e.shadow.focus!==void 0&&(o.shadow.focus=e.shadow.focus),e.shadow.aspect!==void 0&&(o.shadow.aspect=e.shadow.aspect),e.shadow.mapSize!==void 0&&o.shadow.mapSize.fromArray(e.shadow.mapSize),e.shadow.mapType!==void 0&&(o.shadow.mapType=e.shadow.mapType),e.shadow.camera!==void 0&&(o.shadow.camera=this.parseObject(e.shadow.camera))),e.visible!==void 0&&(o.visible=e.visible),e.frustumCulled!==void 0&&(o.frustumCulled=e.frustumCulled),e.renderOrder!==void 0&&(o.renderOrder=e.renderOrder),e.static!==void 0&&(o.static=e.static),e.userData!==void 0&&(o.userData=e.userData),e.layers!==void 0&&(o.layers.mask=e.layers),e.children!==void 0){const m=e.children;for(let g=0;g<m.length;g++)o.add(this.parseObject(m[g],t,n,i,s))}if(e.animations!==void 0){const m=e.animations;for(let g=0;g<m.length;g++){const v=m[g];o.animations.push(s[v])}}if(e.type==="LOD"){e.autoUpdate!==void 0&&(o.autoUpdate=e.autoUpdate);const m=e.levels;for(let g=0;g<m.length;g++){const v=m[g],M=o.getObjectByProperty("uuid",v.object);M!==void 0&&o.addLevel(M,v.distance,v.hysteresis)}}return o}bindSkeletons(e,t){Object.keys(t).length!==0&&e.traverse(function(n){if(n.isSkinnedMesh===!0&&n.skeleton!==void 0){const i=t[n.skeleton];i===void 0?Be("ObjectLoader: No skeleton found with UUID:",n.skeleton):n.bind(i,n.bindMatrix)}})}bindLightTargets(e){e.traverse(function(t){if(t.isDirectionalLight||t.isSpotLight){const n=t.target,i=e.getObjectByProperty("uuid",n);i!==void 0?t.target=i:t.target=new zt}})}}const SE={UVMapping:xh,CubeReflectionMapping:Nr,CubeRefractionMapping:Fs,EquirectangularReflectionMapping:Va,EquirectangularRefractionMapping:Ga},i_={RepeatWrapping:Qa,ClampToEdgeWrapping:oi,MirroredRepeatWrapping:$a},r_={NearestFilter:hn,NearestMipmapNearestFilter:Lp,NearestMipmapLinearFilter:Fo,LinearFilter:rn,LinearMipmapNearestFilter:Wa,LinearMipmapLinearFilter:Hi},zd=new WeakMap;class ME extends ai{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Be("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Be("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=hr.get(`image-bitmap:${e}`);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(h=>{zd.has(o)===!0?(i&&i(zd.get(o)),s.manager.itemError(e),s.manager.itemEnd(e)):(t&&t(h),s.manager.itemEnd(e))});return}setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0);return}const c={};c.credentials=this.withCredentials||this.crossOrigin!=="anonymous"?"include":"same-origin",c.headers=this.requestHeader,c.priority=this.priority,c.cache=this.cache,c.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const u=fetch(e,c).then(function(h){return h.blob()}).then(function(h){return createImageBitmap(h,Object.assign({},s.options,{colorSpaceConversion:"none"}))}).then(function(h){return hr.add(`image-bitmap:${e}`,h),t&&t(h),s.manager.itemEnd(e),h}).catch(function(h){i&&i(h),zd.set(u,h),hr.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});hr.add(`image-bitmap:${e}`,u),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}let su;class mm{static getContext(){return su===void 0&&(su=new(window.AudioContext||window.webkitAudioContext)),su}static setContext(e){su=e}}class wE extends ai{constructor(e){super(e)}load(e,t,n,i){const s=this,o=new Or(this.manager);o.setPriority(this.priority),o.setCache(this.cache),o.setResponseType("arraybuffer"),o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(u){try{const h=u.slice(0),f=mm.getContext(),p=e+"#decode";s.manager.itemStart(p),f.decodeAudioData(h,function(m){t(m),s.manager.itemEnd(p)}).catch(function(m){c(m),s.manager.itemEnd(p)})}catch(h){c(h)}},n,i);function c(u){i?i(u):nt(u),s.manager.itemError(e)}}}const s_=new mt,o_=new mt,ys=new mt;class EE{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new _n,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new _n,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(e){const t=this._cache;if(t.focus!==e.focus||t.fov!==e.fov||t.aspect!==e.aspect*this.aspect||t.near!==e.near||t.far!==e.far||t.zoom!==e.zoom||t.eyeSep!==this.eyeSep){t.focus=e.focus,t.fov=e.fov,t.aspect=e.aspect*this.aspect,t.near=e.near,t.far=e.far,t.zoom=e.zoom,t.eyeSep=this.eyeSep,ys.copy(e.projectionMatrix);const i=t.eyeSep/2,s=i*t.near/t.focus,o=t.near*Math.tan(Ds*t.fov*.5)/t.zoom;let c,u;o_.elements[12]=-i,s_.elements[12]=i,c=-o*t.aspect+s,u=o*t.aspect+s,ys.elements[0]=2*t.near/(u-c),ys.elements[8]=(u+c)/(u-c),this.cameraL.projectionMatrix.copy(ys),c=-o*t.aspect-s,u=o*t.aspect-s,ys.elements[0]=2*t.near/(u-c),ys.elements[8]=(u+c)/(u-c),this.cameraR.projectionMatrix.copy(ys)}this.cameraL.matrix.copy(e.matrixWorld).multiply(o_),this.cameraL.matrixWorldNeedsUpdate=!0,this.cameraR.matrix.copy(e.matrixWorld).multiply(s_),this.cameraR.matrixWorldNeedsUpdate=!0}}const Ro=-90,Po=1;class ph extends zt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new _n(Ro,Po,e,t);i.layers=this.layers,this.add(i);const s=new _n(Ro,Po,e,t);s.layers=this.layers,this.add(s);const o=new _n(Ro,Po,e,t);o.layers=this.layers,this.add(o);const c=new _n(Ro,Po,e,t);c.layers=this.layers,this.add(c);const u=new _n(Ro,Po,e,t);u.layers=this.layers,this.add(u);const h=new _n(Ro,Po,e,t);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,c,u]=t;for(const h of t)this.remove(h);if(e===gi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),u.up.set(0,1,0),u.lookAt(0,0,-1);else if(e===zs)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),u.up.set(0,-1,0),u.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const h of t)this.add(h),h.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,c,u,h,f]=this.children,p=e.getRenderTarget(),m=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const M=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let y=!1;e.isWebGLRenderer===!0?y=e.state.buffers.depth.getReversed():y=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,i),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,i),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,3,i),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(n,4,i),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),n.texture.mipmapsAutoUpdate=M,e.setRenderTarget(n,5,i),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,f),e.setRenderTarget(p,m,g),e.xr.enabled=v,n.texture.needsPMREMUpdate=!0}}class Wx extends _n{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}}class Xx{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=bE.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function bE(){this._document.hidden===!1&&this.reset()}const Ss=new O,kd=new Nn,TE=new O,Ms=new O,ws=new O;class AE extends zt{constructor(){super(),this.type="AudioListener",this.context=mm.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._timer=new Xx}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(e){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=e,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}updateMatrixWorld(e){super.updateMatrixWorld(e),this._timer.update();const t=this.context.listener;if(this.timeDelta=this._timer.getDelta(),this.matrixWorld.decompose(Ss,kd,TE),Ms.set(0,0,-1).applyQuaternion(kd),ws.set(0,1,0).applyQuaternion(kd),t.positionX){const n=this.context.currentTime+this.timeDelta;t.positionX.linearRampToValueAtTime(Ss.x,n),t.positionY.linearRampToValueAtTime(Ss.y,n),t.positionZ.linearRampToValueAtTime(Ss.z,n),t.forwardX.linearRampToValueAtTime(Ms.x,n),t.forwardY.linearRampToValueAtTime(Ms.y,n),t.forwardZ.linearRampToValueAtTime(Ms.z,n),t.upX.linearRampToValueAtTime(ws.x,n),t.upY.linearRampToValueAtTime(ws.y,n),t.upZ.linearRampToValueAtTime(ws.z,n)}else t.setPosition(Ss.x,Ss.y,Ss.z),t.setOrientation(Ms.x,Ms.y,Ms.z,ws.x,ws.y,ws.z)}}class Yx extends zt{constructor(e){super(),this.type="Audio",this.listener=e,this.context=e.context,this.gain=this.context.createGain(),this.gain.connect(e.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(e){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=e,this.connect(),this}setMediaElementSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(e),this.connect(),this}setMediaStreamSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(e),this.connect(),this}setBuffer(e){return this.buffer=e,this.sourceType="buffer",this.autoplay&&this.play(),this}play(e=0){if(this.isPlaying===!0){Be("Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){Be("Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+e;const t=this.context.createBufferSource();return t.buffer=this.buffer,t.loop=this.loop,t.loopStart=this.loopStart,t.loopEnd=this.loopEnd,t.onended=this.onEnded.bind(this),t.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=t,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){Be("Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(e=0){if(this.hasPlaybackControl===!1){Be("Audio: this Audio has no playback control.");return}return this._progress=0,this.source!==null&&(this.source.stop(this.context.currentTime+e),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].connect(this.filters[e]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].disconnect(this.filters[e]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(e){return e||(e=[]),this._connected===!0?(this.disconnect(),this.filters=e.slice(),this.connect()):this.filters=e.slice(),this}setDetune(e){return this.detune=e,this.isPlaying===!0&&this.source.detune!==void 0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(e){return this.setFilters(e?[e]:[])}setPlaybackRate(e){if(this.hasPlaybackControl===!1){Be("Audio: this Audio has no playback control.");return}return this.playbackRate=e,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1,this._progress=0}getLoop(){return this.hasPlaybackControl===!1?(Be("Audio: this Audio has no playback control."),!1):this.loop}setLoop(e){if(this.hasPlaybackControl===!1){Be("Audio: this Audio has no playback control.");return}return this.loop=e,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(e){return this.loopStart=e,this}setLoopEnd(e){return this.loopEnd=e,this}getVolume(){return this.gain.gain.value}setVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}copy(e,t){return super.copy(e,t),e.sourceType!=="buffer"?(Be("Audio: Audio source type cannot be copied."),this):(this.autoplay=e.autoplay,this.buffer=e.buffer,this.detune=e.detune,this.loop=e.loop,this.loopStart=e.loopStart,this.loopEnd=e.loopEnd,this.offset=e.offset,this.duration=e.duration,this.playbackRate=e.playbackRate,this.hasPlaybackControl=e.hasPlaybackControl,this.sourceType=e.sourceType,this.filters=e.filters.slice(),this)}clone(e){return new this.constructor(this.listener).copy(this,e)}}const Es=new O,a_=new Nn,CE=new O,bs=new O;class RE extends Yx{constructor(e){super(e),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){return super.connect(),this.panner.connect(this.gain),this}disconnect(){return super.disconnect(),this.panner.disconnect(this.gain),this}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(e){return this.panner.refDistance=e,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(e){return this.panner.rolloffFactor=e,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(e){return this.panner.distanceModel=e,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(e){return this.panner.maxDistance=e,this}setDirectionalCone(e,t,n){return this.panner.coneInnerAngle=e,this.panner.coneOuterAngle=t,this.panner.coneOuterGain=n,this}updateMatrixWorld(e){if(super.updateMatrixWorld(e),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(Es,a_,CE),bs.set(0,0,1).applyQuaternion(a_);const t=this.panner;if(t.positionX){const n=this.context.currentTime+this.listener.timeDelta;t.positionX.linearRampToValueAtTime(Es.x,n),t.positionY.linearRampToValueAtTime(Es.y,n),t.positionZ.linearRampToValueAtTime(Es.z,n),t.orientationX.linearRampToValueAtTime(bs.x,n),t.orientationY.linearRampToValueAtTime(bs.y,n),t.orientationZ.linearRampToValueAtTime(bs.z,n)}else t.setPosition(Es.x,Es.y,Es.z),t.setOrientation(bs.x,bs.y,bs.z)}}class PE{constructor(e,t=2048){this.analyser=e.context.createAnalyser(),this.analyser.fftSize=t,this.data=new Uint8Array(this.analyser.frequencyBinCount),e.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let e=0;const t=this.getFrequencyData();for(let n=0;n<t.length;n++)e+=t[n];return e/t.length}}class qx{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,s,o;switch(t){case"quaternion":i=this._slerp,s=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,s=e*i+i;let o=this.cumulativeWeight;if(o===0){for(let c=0;c!==i;++c)n[s+c]=n[c];o=t}else{o+=t;const c=t/o;this._mixBufferRegion(n,s,0,c,i)}this.cumulativeWeight=o}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,s=this.cumulativeWeight,o=this.cumulativeWeightAdditive,c=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const u=t*this._origIndex;this._mixBufferRegion(n,i,u,1-s,t)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let u=t,h=t+t;u!==h;++u)if(n[u]!==n[u+t]){c.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let s=n,o=i;s!==o;++s)t[s]=t[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,s){if(i>=.5)for(let o=0;o!==s;++o)e[t+o]=e[n+o]}_slerp(e,t,n,i){Nn.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,s){const o=this._workIndex*s;Nn.multiplyQuaternionsFlat(e,o,e,t,e,n),Nn.slerpFlat(e,t,e,t,e,o,i)}_lerp(e,t,n,i,s){const o=1-i;for(let c=0;c!==s;++c){const u=t+c;e[u]=e[u]*o+e[n+c]*i}}_lerpAdditive(e,t,n,i,s){for(let o=0;o!==s;++o){const c=t+o;e[c]=e[c]+e[n+o]*i}}}const gm="\\[\\]\\.:\\/",IE=new RegExp("["+gm+"]","g"),_m="[^"+gm+"]",LE="[^"+gm.replace("\\.","")+"]",NE=/((?:WC+[\/:])*)/.source.replace("WC",_m),DE=/(WCOD+)?/.source.replace("WCOD",LE),UE=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",_m),OE=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",_m),FE=new RegExp("^"+NE+DE+UE+OE+"$"),BE=["material","materials","bones","map"];class zE{constructor(e,t,n){const i=n||Bt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Bt{constructor(e,t,n){this.path=t,this.parsedPath=n||Bt.parseTrackName(t),this.node=Bt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Bt.Composite(e,t,n):new Bt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(IE,"")}static parseTrackName(e){const t=FE.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);BE.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const c=s[o];if(c.name===t||c.uuid===t)return c;const u=n(c.children);if(u)return u}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=Bt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Be("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let h=t.objectIndex;switch(n){case"materials":if(!e.material){nt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){nt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){nt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let f=0;f<e.length;f++)if(e[f].name===h){h=f;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){nt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){nt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){nt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(h!==void 0){if(e[h]===void 0){nt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[h]}}const o=e[i];if(o===void 0){const h=t.nodeName;nt("PropertyBinding: Trying to update property for track: "+h+"."+i+" but it wasn't found.",e);return}let c=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?c=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(c=this.Versioning.MatrixWorldNeedsUpdate);let u=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){nt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){nt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}u=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(u=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(u=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[u],this.setValue=this.SetterByBindingTypeAndVersioning[u][c]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Bt.Composite=zE;Bt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Bt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Bt.prototype.GetterByBindingType=[Bt.prototype._getValue_direct,Bt.prototype._getValue_array,Bt.prototype._getValue_arrayElement,Bt.prototype._getValue_toArray];Bt.prototype.SetterByBindingTypeAndVersioning=[[Bt.prototype._setValue_direct,Bt.prototype._setValue_direct_setNeedsUpdate,Bt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Bt.prototype._setValue_array,Bt.prototype._setValue_array_setNeedsUpdate,Bt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Bt.prototype._setValue_arrayElement,Bt.prototype._setValue_arrayElement_setNeedsUpdate,Bt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Bt.prototype._setValue_fromArray,Bt.prototype._setValue_fromArray_setNeedsUpdate,Bt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class kE{constructor(){this.isAnimationObjectGroup=!0,this.uuid=Ii(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;const e={};this._indicesByUUID=e;for(let n=0,i=arguments.length;n!==i;++n)e[arguments[n].uuid]=n;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};const t=this;this.stats={objects:{get total(){return t._objects.length},get inUse(){return this.total-t.nCachedObjects_}},get bindingsPerObject(){return t._bindings.length}}}add(){const e=this._objects,t=this._indicesByUUID,n=this._paths,i=this._parsedPaths,s=this._bindings,o=s.length;let c,u=e.length,h=this.nCachedObjects_;for(let f=0,p=arguments.length;f!==p;++f){const m=arguments[f],g=m.uuid;let v=t[g];if(v===void 0){v=u++,t[g]=v,e.push(m);for(let M=0,y=o;M!==y;++M)s[M].push(new Bt(m,n[M],i[M]))}else if(v<h){c=e[v];const M=--h,y=e[M];t[y.uuid]=v,e[v]=y,t[g]=M,e[M]=m;for(let x=0,w=o;x!==w;++x){const b=s[x],T=b[M];let P=b[v];b[v]=T,P===void 0&&(P=new Bt(m,n[x],i[x])),b[M]=P}}else e[v]!==c&&nt("AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=h}remove(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let s=this.nCachedObjects_;for(let o=0,c=arguments.length;o!==c;++o){const u=arguments[o],h=u.uuid,f=t[h];if(f!==void 0&&f>=s){const p=s++,m=e[p];t[m.uuid]=f,e[f]=m,t[h]=p,e[p]=u;for(let g=0,v=i;g!==v;++g){const M=n[g],y=M[p],x=M[f];M[f]=y,M[p]=x}}}this.nCachedObjects_=s}uncache(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let s=this.nCachedObjects_,o=e.length;for(let c=0,u=arguments.length;c!==u;++c){const h=arguments[c],f=h.uuid,p=t[f];if(p!==void 0)if(delete t[f],p<s){const m=--s,g=e[m],v=--o,M=e[v];p!==m&&(t[g.uuid]=p),e[p]=g,m!==v&&(t[M.uuid]=m),e[m]=M,e.pop();for(let y=0,x=i;y!==x;++y){const w=n[y],b=w[m],T=w[v];w[p]=b,w[m]=T,w.pop()}}else{const m=--o,g=e[m];p!==m&&(t[g.uuid]=p),e[p]=g,e.pop();for(let v=0,M=i;v!==M;++v){const y=n[v];y[p]=y[m],y.pop()}}}this.nCachedObjects_=s}subscribe_(e,t){const n=this._bindingsIndicesByPath;let i=n[e];const s=this._bindings;if(i!==void 0)return s[i];const o=this._paths,c=this._parsedPaths,u=this._objects,h=u.length,f=this.nCachedObjects_,p=new Array(h);i=s.length,n[e]=i,o.push(e),c.push(t),s.push(p);for(let m=f,g=u.length;m!==g;++m){const v=u[m];p[m]=new Bt(v,e,t)}return p}unsubscribe_(e){const t=this._bindingsIndicesByPath,n=t[e];if(n!==void 0){const i=this._paths,s=this._parsedPaths,o=this._bindings,c=o.length-1,u=o[c],h=i[c];t[h]=n,o[n]=u,o.pop(),s[n]=s[c],s.pop(),i[n]=i[c],i.pop()}}}class Zx{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const s=t.tracks,o=s.length,c=new Array(o),u={endingStart:Ps,endingEnd:Ps};for(let h=0;h!==o;++h){const f=s[h].createInterpolant(null);c[h]=f,f.settings=u}this._interpolantSettings=u,this._interpolants=c,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._restoreTimeScale=null,this._weightInterpolant=null,this.loop=Fv,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){const i=this._clip.duration,s=e._clip.duration,o=s/i,c=i/s;e._restoreTimeScale=e.timeScale,this._restoreTimeScale=this.timeScale,e.warp(1,o,t),this.warp(c,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,s=i.time,o=this.timeScale;let c=this._timeScaleInterpolant;c===null&&(c=i._lendControlInterpolant(),this._timeScaleInterpolant=c);const u=c.parameterPositions,h=c.sampleValues;return u[0]=s,u[1]=s+n,h[0]=e/o,h[1]=t/o,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this._restoreTimeScale=null,this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const u=(e-s)*n;u<0||n===0?t=0:(this._startTime=null,t=n*u)}t*=this._updateTimeScale(e);const o=this._updateTime(t),c=this._updateWeight(e);if(c>0){const u=this._interpolants,h=this._propertyBindings;switch(this.blendMode){case zp:for(let f=0,p=u.length;f!==p;++f)u[f].evaluate(o),h[f].accumulateAdditive(c);break;case Th:default:for(let f=0,p=u.length;f!==p;++f)u[f].evaluate(o),h[f].accumulate(i,c)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(t===0?this.paused=!0:(this._restoreTimeScale!==null&&(t=this._restoreTimeScale),this.timeScale=t),this.stopWarping())}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,s=this._loopCount;const o=n===Bv;if(e===0)return s===-1?i:o&&(s&1)===1?t-i:i;if(n===Ov){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=t||i<0){const c=Math.floor(i/t);i-=t*c,s+=Math.abs(c);const u=this.repetitions-s;if(u<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(u===1){const h=e<0;this._setEndings(h,!h,o)}else this._setEndings(!1,!1,o);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:c})}}else this._loopCount=s,this.time=i;if(o&&(s&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=Is,i.endingEnd=Is):(e?i.endingStart=this.zeroSlopeAtStart?Is:Ps:i.endingStart=il,t?i.endingEnd=this.zeroSlopeAtEnd?Is:Ps:i.endingEnd=il)}_scheduleFading(e,t,n){const i=this._mixer,s=i.time;let o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);const c=o.parameterPositions,u=o.sampleValues;return c[0]=s,u[0]=t,c[1]=s+e,u[1]=n,this}}const HE=new Float32Array(1);class VE extends Yi{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,s=i.length,o=e._propertyBindings,c=e._interpolants,u=n.uuid,h=this._bindingsByRootAndName;let f=h[u];f===void 0&&(f={},h[u]=f);for(let p=0;p!==s;++p){const m=i[p],g=m.name;let v=f[g];if(v!==void 0)++v.referenceCount,o[p]=v;else{if(v=o[p],v!==void 0){v._cacheIndex===null&&(++v.referenceCount,this._addInactiveBinding(v,u,g));continue}const M=t&&t._propertyBindings[p].binding.parsedPath;v=new qx(Bt.create(n,g,M),m.ValueTypeName,m.getValueSize()),++v.referenceCount,this._addInactiveBinding(v,u,g),o[p]=v}c[p].resultBuffer=v.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,s=this._actionsByClip[i];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,s=this._actionsByClip;let o=s[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=o;else{const c=o.knownActions;e._byClipCacheIndex=c.length,c.push(e)}e._cacheIndex=i.length,i.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,o=this._actionsByClip,c=o[s],u=c.knownActions,h=u[u.length-1],f=e._byClipCacheIndex;h._byClipCacheIndex=f,u[f]=h,u.pop(),e._byClipCacheIndex=null;const p=c.actionByRoot,m=(e._localRoot||this._root).uuid;delete p[m],u.length===0&&delete o[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,s=this._bindings;let o=i[t];o===void 0&&(o={},i[t]=o),o[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,s=n.path,o=this._bindingsByRootAndName,c=o[i],u=t[t.length-1],h=e._cacheIndex;u._cacheIndex=h,t[h]=u,t.pop(),delete c[s],Object.keys(c).length===0&&delete o[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new cm(new Float32Array(2),new Float32Array(2),1,HE),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,s=t[i];e.__cacheIndex=i,t[i]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const i=t||this._root,s=i.uuid;let o=typeof e=="string"?fl.findByName(i,e):e;const c=o!==null?o.uuid:e,u=this._actionsByClip[c];let h=null;if(n===void 0&&(o!==null?n=o.blendMode:n=Th),u!==void 0){const p=u.actionByRoot[s];if(p!==void 0&&p.blendMode===n)return p;h=u.knownActions[0],o===null&&(o=h._clip)}if(o===null)return null;const f=new Zx(this,o,t,n);return this._bindAction(f,h),this._addInactiveAction(f,c,s),f}existingAction(e,t){const n=t||this._root,i=n.uuid,s=typeof e=="string"?fl.findByName(n,e):e,o=s?s.uuid:e,c=this._actionsByClip[o];return c!==void 0&&c.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,s=Math.sign(e),o=this._accuIndex^=1;for(let h=0;h!==n;++h)t[h]._update(i,e,s,o);const c=this._bindings,u=this._nActiveBindings;for(let h=0;h!==u;++h)c[h].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const o=s.knownActions;for(let c=0,u=o.length;c!==u;++c){const h=o[c];this._deactivateAction(h);const f=h._cacheIndex,p=t[t.length-1];h._cacheIndex=null,h._byClipCacheIndex=null,p._cacheIndex=f,t[f]=p,t.pop(),this._removeInactiveBindingsForAction(h)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const o in n){const c=n[o].actionByRoot,u=c[t];u!==void 0&&(this._deactivateAction(u),this._removeInactiveAction(u))}const i=this._bindingsByRootAndName,s=i[t];if(s!==void 0)for(const o in s){const c=s[o];c.restoreOriginalState(),this._removeInactiveBinding(c)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}class GE extends Wp{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isRenderTarget3D=!0,this.depth=n;for(let s=0;s<this.textures.length;s++){const o=new Ph(null,e,t,n);o.isRenderTargetTexture=!0,o.renderTarget=this,this.textures[s]=o}this._setTextureOptions(i)}}class vm{constructor(e){this.value=e}clone(){return new vm(this.value.clone===void 0?this.value:this.value.clone())}}let WE=0;class XE extends Yi{constructor(){super(),this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:WE++}),this.name="",this.usage=Ah,this.uniforms=[]}add(e){return this.uniforms.push(e),this}remove(e){const t=this.uniforms.indexOf(e);return t!==-1&&this.uniforms.splice(t,1),this}setName(e){return this.name=e,this}setUsage(e){return this.usage=e,this}dispose(){this.dispatchEvent({type:"dispose"})}copy(e){this.name=e.name,this.usage=e.usage;const t=e.uniforms;this.uniforms.length=0;for(let n=0,i=t.length;n<i;n++){const s=t[n];Array.isArray(s)?this.uniforms.push(s.map(o=>o.clone())):this.uniforms.push(s.clone())}return this}clone(){return new this.constructor().copy(this)}}class mh extends Nh{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){const t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){const t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}}class YE{constructor(e,t,n,i,s,o=!1){this.isGLBufferAttribute=!0,this.name="",this.buffer=e,this.type=t,this.itemSize=n,this.elementSize=i,this.count=s,this.normalized=o,this.version=0}set needsUpdate(e){e===!0&&this.version++}setBuffer(e){return this.buffer=e,this}setType(e,t){return this.type=e,this.elementSize=t,this}setItemSize(e){return this.itemSize=e,this}setCount(e){return this.count=e,this}}const l_=new mt;class jx{constructor(e,t,n=0,i=1/0){this.ray=new Gs(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Us,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):nt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return l_.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(l_),this}intersectObject(e,t=!0,n=[]){return _p(e,this,n,t),n.sort(c_),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)_p(e[i],this,n,t);return n.sort(c_),n}}function c_(r,e){return r.distance-e.distance}function _p(r,e,t,n){let i=!0;if(r.layers.test(e.layers)&&r.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const s=r.children;for(let o=0,c=s.length;o<c;o++)_p(s[o],e,t,!0)}}class Jx{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Be("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}class vp{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=dt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(dt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class qE{constructor(e=1,t=0,n=0){this.radius=e,this.theta=t,this.y=n}set(e,t,n){return this.radius=e,this.theta=t,this.y=n,this}copy(e){return this.radius=e.radius,this.theta=e.theta,this.y=e.y,this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+n*n),this.theta=Math.atan2(e,n),this.y=t,this}clone(){return new this.constructor().copy(this)}}const Am=class Am{constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=i,this}};Am.prototype.isMatrix2=!0;let xp=Am;const u_=new me;class Kx{constructor(e=new me(1/0,1/0),t=new me(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=u_.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,u_).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const h_=new O,ou=new O,Io=new O,Lo=new O,Hd=new O,ZE=new O,jE=new O;class Qx{constructor(e=new O,t=new O){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){h_.subVectors(e,this.start),ou.subVectors(this.end,this.start);const n=ou.dot(ou);if(n===0)return 0;let s=ou.dot(h_)/n;return t&&(s=dt(s,0,1)),s}closestPointToPoint(e,t,n){const i=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(i).add(this.start)}distanceSqToLine3(e,t=ZE,n=jE){const i=10000000000000001e-32;let s,o;const c=this.start,u=e.start,h=this.end,f=e.end;Io.subVectors(h,c),Lo.subVectors(f,u),Hd.subVectors(c,u);const p=Io.dot(Io),m=Lo.dot(Lo),g=Lo.dot(Hd);if(p<=i&&m<=i)return t.copy(c),n.copy(u),t.distanceToSquared(n);if(p<=i)s=0,o=g/m,o=dt(o,0,1);else{const v=Io.dot(Hd);if(m<=i)o=0,s=dt(-v/p,0,1);else{const M=Io.dot(Lo),y=p*m-M*M;y!==0?s=dt((M*g-v*m)/y,0,1):s=0,o=(M*s+g)/m,o<0?(o=0,s=dt(-v/p,0,1)):o>1&&(o=1,s=dt((M-v)/p,0,1))}}return t.copy(c).addScaledVector(Io,s),n.copy(u).addScaledVector(Lo,o),t.distanceToSquared(n)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}const f_=new O;class JE extends zt{constructor(e,t){super(),this.light=e,this.matrixAutoUpdate=!1,this.color=t,this.type="SpotLightHelper";const n=new wt,i=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let o=0,c=1,u=32;o<u;o++,c++){const h=o/u*Math.PI*2,f=c/u*Math.PI*2;i.push(Math.cos(h),Math.sin(h),1,Math.cos(f),Math.sin(f),1)}n.setAttribute("position",new qe(i,3));const s=new Kn({fog:!1,toneMapped:!1});this.cone=new dr(n,s),this.add(this.cone),this.update()}dispose(){super.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),this.parent?(this.parent.updateWorldMatrix(!0),this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld)):this.matrix.copy(this.light.matrixWorld),this.matrixWorldNeedsUpdate=!0;const e=this.light.distance?this.light.distance:1e3,t=e*Math.tan(this.light.angle);this.cone.scale.set(t,t,e),f_.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(f_),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}}const Kr=new O,au=new mt,Vd=new mt;class KE extends dr{constructor(e){const t=$x(e),n=new wt,i=[],s=[];for(let h=0;h<t.length;h++){const f=t[h];f.parent&&f.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),s.push(0,0,0),s.push(0,0,0))}n.setAttribute("position",new qe(i,3)),n.setAttribute("color",new qe(s,3));const o=new Kn({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,o),this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=e,this.bones=t,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1;const c=new Xe(255),u=new Xe(65280);this.setColors(c,u)}updateMatrixWorld(e){const t=this.bones,n=this.geometry,i=n.getAttribute("position");Vd.copy(this.root.matrixWorld).invert();for(let s=0,o=0;s<t.length;s++){const c=t[s];c.parent&&c.parent.isBone&&(au.multiplyMatrices(Vd,c.matrixWorld),Kr.setFromMatrixPosition(au),i.setXYZ(o,Kr.x,Kr.y,Kr.z),au.multiplyMatrices(Vd,c.parent.matrixWorld),Kr.setFromMatrixPosition(au),i.setXYZ(o+1,Kr.x,Kr.y,Kr.z),o+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(e)}setColors(e,t){const i=this.geometry.getAttribute("color");for(let s=0;s<i.count;s+=2)i.setXYZ(s,e.r,e.g,e.b),i.setXYZ(s+1,t.r,t.g,t.b);return i.needsUpdate=!0,this}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}}function $x(r){const e=[];r.isBone===!0&&e.push(r);for(let t=0;t<r.children.length;t++)e.push(...$x(r.children[t]));return e}class QE extends Sn{constructor(e,t,n){const i=new El(t,4,2),s=new Ws({wireframe:!0,fog:!1,toneMapped:!1});super(i,s),this.light=e,this.color=n,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}update(){this.matrixWorldNeedsUpdate=!0,this.light.updateWorldMatrix(!0,!1),this.color!==void 0?this.material.color.set(this.color):this.material.color.copy(this.light.color)}}const $E=new O,d_=new Xe,p_=new Xe;class e1 extends zt{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="HemisphereLightHelper";const i=new wl(t);i.rotateY(Math.PI*.5),this.material=new Ws({wireframe:!0,fog:!1,toneMapped:!1}),this.color===void 0&&(this.material.vertexColors=!0);const s=i.getAttribute("position"),o=new Float32Array(s.count*3);i.setAttribute("color",new Jt(o,3)),this.add(new Sn(i,this.material)),this.update()}dispose(){super.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){const e=this.children[0];if(this.color!==void 0)this.material.color.set(this.color);else{const t=e.geometry.getAttribute("color");d_.copy(this.light.color),p_.copy(this.light.groundColor);for(let n=0,i=t.count;n<i;n++){const s=n<i/2?d_:p_;t.setXYZ(n,s.r,s.g,s.b)}t.needsUpdate=!0}this.matrixWorldNeedsUpdate=!0,this.light.updateWorldMatrix(!0,!1),e.lookAt($E.setFromMatrixPosition(this.light.matrixWorld).negate())}}class t1 extends dr{constructor(e=10,t=10,n=4473924,i=8947848){n=new Xe(n),i=new Xe(i);const s=t/2,o=e/t,c=e/2,u=[],h=[];for(let m=0,g=0,v=-c;m<=t;m++,v+=o){u.push(-c,0,v,c,0,v),u.push(v,0,-c,v,0,c);const M=m===s?n:i;M.toArray(h,g),g+=3,M.toArray(h,g),g+=3,M.toArray(h,g),g+=3,M.toArray(h,g),g+=3}const f=new wt;f.setAttribute("position",new qe(u,3)),f.setAttribute("color",new qe(h,3));const p=new Kn({vertexColors:!0,toneMapped:!1});super(f,p),this.type="GridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}}class n1 extends dr{constructor(e=10,t=16,n=8,i=64,s=4473924,o=8947848){s=new Xe(s),o=new Xe(o);const c=[],u=[];if(t>1)for(let p=0;p<t;p++){const m=p/t*(Math.PI*2),g=Math.sin(m)*e,v=Math.cos(m)*e;c.push(0,0,0),c.push(g,0,v);const M=p&1?s:o;u.push(M.r,M.g,M.b),u.push(M.r,M.g,M.b)}for(let p=0;p<n;p++){const m=p&1?s:o,g=e-e/n*p;for(let v=0;v<i;v++){let M=v/i*(Math.PI*2),y=Math.sin(M)*g,x=Math.cos(M)*g;c.push(y,0,x),u.push(m.r,m.g,m.b),M=(v+1)/i*(Math.PI*2),y=Math.sin(M)*g,x=Math.cos(M)*g,c.push(y,0,x),u.push(m.r,m.g,m.b)}}const h=new wt;h.setAttribute("position",new qe(c,3)),h.setAttribute("color",new qe(u,3));const f=new Kn({vertexColors:!0,toneMapped:!1});super(h,f),this.type="PolarGridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}}const m_=new O,lu=new O,g_=new O;class i1 extends zt{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",t===void 0&&(t=1);let i=new wt;i.setAttribute("position",new qe([-t,t,0,t,t,0,t,-t,0,-t,-t,0,-t,t,0],3));const s=new Kn({fog:!1,toneMapped:!1});this.lightPlane=new ns(i,s),this.add(this.lightPlane),i=new wt,i.setAttribute("position",new qe([0,0,0,0,0,1],3)),this.targetLine=new ns(i,s),this.add(this.targetLine),this.update()}dispose(){super.dispose(),this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.matrixWorldNeedsUpdate=!0,this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),m_.setFromMatrixPosition(this.light.matrixWorld),lu.setFromMatrixPosition(this.light.target.matrixWorld),g_.subVectors(lu,m_),this.lightPlane.lookAt(lu),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(lu),this.targetLine.scale.z=g_.length()}}const cu=new O,an=new bl;class r1 extends dr{constructor(e){const t=new wt,n=new Kn({color:16777215,vertexColors:!0,toneMapped:!1}),i=[],s=[],o={};c("n1","n2"),c("n2","n4"),c("n4","n3"),c("n3","n1"),c("f1","f2"),c("f2","f4"),c("f4","f3"),c("f3","f1"),c("n1","f1"),c("n2","f2"),c("n3","f3"),c("n4","f4"),c("p","n1"),c("p","n2"),c("p","n3"),c("p","n4"),c("u1","u2"),c("u2","u3"),c("u3","u1"),c("c","t"),c("p","c"),c("cn1","cn2"),c("cn3","cn4"),c("cf1","cf2"),c("cf3","cf4");function c(v,M){u(v),u(M)}function u(v){i.push(0,0,0),s.push(0,0,0),o[v]===void 0&&(o[v]=[]),o[v].push(i.length/3-1)}t.setAttribute("position",new qe(i,3)),t.setAttribute("color",new qe(s,3)),super(t,n),this.type="CameraHelper",this.camera=e,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=o,this.update();const h=new Xe(16755200),f=new Xe(16711680),p=new Xe(43775),m=new Xe(16777215),g=new Xe(3355443);this.setColors(h,f,p,m,g)}setColors(e,t,n,i,s){const c=this.geometry.getAttribute("color");return c.setXYZ(0,e.r,e.g,e.b),c.setXYZ(1,e.r,e.g,e.b),c.setXYZ(2,e.r,e.g,e.b),c.setXYZ(3,e.r,e.g,e.b),c.setXYZ(4,e.r,e.g,e.b),c.setXYZ(5,e.r,e.g,e.b),c.setXYZ(6,e.r,e.g,e.b),c.setXYZ(7,e.r,e.g,e.b),c.setXYZ(8,e.r,e.g,e.b),c.setXYZ(9,e.r,e.g,e.b),c.setXYZ(10,e.r,e.g,e.b),c.setXYZ(11,e.r,e.g,e.b),c.setXYZ(12,e.r,e.g,e.b),c.setXYZ(13,e.r,e.g,e.b),c.setXYZ(14,e.r,e.g,e.b),c.setXYZ(15,e.r,e.g,e.b),c.setXYZ(16,e.r,e.g,e.b),c.setXYZ(17,e.r,e.g,e.b),c.setXYZ(18,e.r,e.g,e.b),c.setXYZ(19,e.r,e.g,e.b),c.setXYZ(20,e.r,e.g,e.b),c.setXYZ(21,e.r,e.g,e.b),c.setXYZ(22,e.r,e.g,e.b),c.setXYZ(23,e.r,e.g,e.b),c.setXYZ(24,t.r,t.g,t.b),c.setXYZ(25,t.r,t.g,t.b),c.setXYZ(26,t.r,t.g,t.b),c.setXYZ(27,t.r,t.g,t.b),c.setXYZ(28,t.r,t.g,t.b),c.setXYZ(29,t.r,t.g,t.b),c.setXYZ(30,t.r,t.g,t.b),c.setXYZ(31,t.r,t.g,t.b),c.setXYZ(32,n.r,n.g,n.b),c.setXYZ(33,n.r,n.g,n.b),c.setXYZ(34,n.r,n.g,n.b),c.setXYZ(35,n.r,n.g,n.b),c.setXYZ(36,n.r,n.g,n.b),c.setXYZ(37,n.r,n.g,n.b),c.setXYZ(38,i.r,i.g,i.b),c.setXYZ(39,i.r,i.g,i.b),c.setXYZ(40,s.r,s.g,s.b),c.setXYZ(41,s.r,s.g,s.b),c.setXYZ(42,s.r,s.g,s.b),c.setXYZ(43,s.r,s.g,s.b),c.setXYZ(44,s.r,s.g,s.b),c.setXYZ(45,s.r,s.g,s.b),c.setXYZ(46,s.r,s.g,s.b),c.setXYZ(47,s.r,s.g,s.b),c.setXYZ(48,s.r,s.g,s.b),c.setXYZ(49,s.r,s.g,s.b),c.needsUpdate=!0,this}update(){const e=this.geometry,t=this.pointMap,n=1,i=1;let s,o;if(an.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),this.camera.reversedDepth===!0)s=1,o=0;else if(this.camera.coordinateSystem===gi)s=-1,o=1;else if(this.camera.coordinateSystem===zs)s=0,o=1;else throw new Error("THREE.CameraHelper.update(): Invalid coordinate system: "+this.camera.coordinateSystem);un("c",t,e,an,0,0,s),un("t",t,e,an,0,0,o),un("n1",t,e,an,-n,-i,s),un("n2",t,e,an,n,-i,s),un("n3",t,e,an,-n,i,s),un("n4",t,e,an,n,i,s),un("f1",t,e,an,-n,-i,o),un("f2",t,e,an,n,-i,o),un("f3",t,e,an,-n,i,o),un("f4",t,e,an,n,i,o),un("u1",t,e,an,n*.7,i*1.1,s),un("u2",t,e,an,-n*.7,i*1.1,s),un("u3",t,e,an,0,i*2,s),un("cf1",t,e,an,-n,0,o),un("cf2",t,e,an,n,0,o),un("cf3",t,e,an,0,-i,o),un("cf4",t,e,an,0,i,o),un("cn1",t,e,an,-n,0,s),un("cn2",t,e,an,n,0,s),un("cn3",t,e,an,0,-i,s),un("cn4",t,e,an,0,i,s),e.getAttribute("position").needsUpdate=!0}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}}function un(r,e,t,n,i,s,o){cu.set(i,s,o).unproject(n);const c=e[r];if(c!==void 0){const u=t.getAttribute("position");for(let h=0,f=c.length;h<f;h++)u.setXYZ(c[h],cu.x,cu.y,cu.z)}}const uu=new xn;class s1 extends dr{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new Float32Array(8*3),s=new wt;s.setIndex(new Jt(n,1)),s.setAttribute("position",new Jt(i,3)),super(s,new Kn({color:t,toneMapped:!1})),this.object=e,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(){if(this.object!==void 0&&uu.setFromObject(this.object),uu.isEmpty())return;const e=uu.min,t=uu.max,n=this.geometry.attributes.position,i=n.array;i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=e.x,i[4]=t.y,i[5]=t.z,i[6]=e.x,i[7]=e.y,i[8]=t.z,i[9]=t.x,i[10]=e.y,i[11]=t.z,i[12]=t.x,i[13]=t.y,i[14]=e.z,i[15]=e.x,i[16]=t.y,i[17]=e.z,i[18]=e.x,i[19]=e.y,i[20]=e.z,i[21]=t.x,i[22]=e.y,i[23]=e.z,n.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(e){return this.object=e,this.update(),this}copy(e,t){return super.copy(e,t),this.object=e.object,this}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}}class o1 extends dr{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],s=new wt;s.setIndex(new Jt(n,1)),s.setAttribute("position",new qe(i,3)),super(s,new Kn({color:t,toneMapped:!1})),this.box=e,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(e){const t=this.box;t.isEmpty()||(t.getCenter(this.position),t.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(e))}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}}class a1 extends ns{constructor(e,t=1,n=16776960){const i=n,s=[1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],o=new wt;o.setAttribute("position",new qe(s,3)),o.computeBoundingSphere(),super(o,new Kn({color:i,toneMapped:!1})),this.type="PlaneHelper",this.plane=e,this.size=t;const c=[1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],u=new wt;u.setAttribute("position",new qe(c,3)),u.computeBoundingSphere(),this.add(new Sn(u,new Ws({color:i,opacity:.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(e){this.position.set(0,0,0),this.scale.set(.5*this.size,.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),super.updateMatrixWorld(e)}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}}const __=new O;let hu,Gd;class l1 extends zt{constructor(e=new O(0,0,1),t=new O(0,0,0),n=1,i=16776960,s=n*.2,o=s*.2){super(),this.type="ArrowHelper",hu===void 0&&(hu=new wt,hu.setAttribute("position",new qe([0,0,0,0,1,0],3)),Gd=new Sl(.5,1,5,1),Gd.translate(0,-.5,0)),this.position.copy(t),this.line=new ns(hu,new Kn({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new Sn(Gd,new Ws({color:i,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,s,o)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{__.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(__,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){super.dispose(),this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class c1 extends dr{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new wt;i.setAttribute("position",new qe(t,3)),i.setAttribute("color",new qe(n,3));const s=new Kn({vertexColors:!0,toneMapped:!1});super(i,s),this.type="AxesHelper"}setColors(e,t,n){const i=new Xe,s=this.geometry.attributes.color.array;return i.set(e),i.toArray(s,0),i.toArray(s,3),i.set(t),i.toArray(s,6),i.toArray(s,9),i.set(n),i.toArray(s,12),i.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}}class u1{constructor(){this.type="ShapePath",this.color=new Xe,this.subPaths=[],this.currentPath=null,this.userData={}}moveTo(e,t){return this.currentPath=new ll,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,n,i){return this.currentPath.quadraticCurveTo(e,t,n,i),this}bezierCurveTo(e,t,n,i,s,o){return this.currentPath.bezierCurveTo(e,t,n,i,s,o),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(){function e(u,h){let f=!1;const p=h.length;for(let m=0,g=p-1;m<p;g=m++){const v=h[m],M=h[g];v.y>u.y!=M.y>u.y&&u.x<(M.x-v.x)*(u.y-v.y)/(M.y-v.y)+v.x&&(f=!f)}return f}function t(u,h){const f=h.getCenter(new me);if(e(f,u))return f;const p=f.y,m=[],g=u.length;for(let v=0;v<g;v++){const M=u[v],y=u[(v+1)%g];if(M.y>p!=y.y>p){const x=M.x+(p-M.y)*(y.x-M.x)/(y.y-M.y);m.push(x)}}return m.length>1&&(m.sort((v,M)=>v-M),f.x=(m[0]+m[1])/2),f}let n=this.userData.style&&this.userData.style.fillRule||"nonzero";n!=="nonzero"&&n!=="evenodd"&&(Be('Fill-rule "'+n+'" is not supported, falling back to "nonzero".'),n="nonzero");const i=n==="nonzero"?u=>u!==0:u=>(u&1)!==0,s=[];for(const u of this.subPaths){const h=u.getPoints();if(h.length<3)continue;const f=Vi.area(h);if(f===0)continue;const p=new Kx;for(let m=0;m<h.length;m++)p.expandByPoint(h[m]);s.push({subPath:u,points:h,boundingBox:p,interiorPoint:t(h,p),absArea:Math.abs(f),winding:f<0?-1:1,container:null,exclude:!1,role:null})}s.sort((u,h)=>h.absArea-u.absArea);for(let u=0;u<s.length;u++){const h=s[u];let f=0;for(let p=u-1;p>=0;p--){const m=s[p];if(m.boundingBox.containsBox(h.boundingBox)&&e(h.interiorPoint,m.points)){h.container=m.exclude?m.container:m,f=m.winding,h.winding+=f;break}}i(h.winding)===i(f)&&(h.exclude=!0)}for(const u of s)u.exclude||(u.role=u.container===null||u.container.role==="hole"?"outer":"hole");const o=[],c=new Map;for(const u of s){if(u.exclude||u.role!=="outer")continue;const h=new Ml;h.curves=u.subPath.curves,o.push(h),c.set(u,h)}for(const u of s){if(u.exclude||u.role!=="hole")continue;const h=c.get(u.container);if(!h)continue;const f=new ll;f.curves=u.subPath.curves,h.holes.push(f)}return o}}class h1 extends Yi{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function f1(r,e){const t=r.image&&r.image.width?r.image.width/r.image.height:1;return t>e?(r.repeat.x=1,r.repeat.y=t/e,r.offset.x=0,r.offset.y=(1-r.repeat.y)/2):(r.repeat.x=e/t,r.repeat.y=1,r.offset.x=(1-r.repeat.x)/2,r.offset.y=0),r}function d1(r,e){const t=r.image&&r.image.width?r.image.width/r.image.height:1;return t>e?(r.repeat.x=e/t,r.repeat.y=1,r.offset.x=(1-r.repeat.x)/2,r.offset.y=0):(r.repeat.x=1,r.repeat.y=t/e,r.offset.x=0,r.offset.y=(1-r.repeat.y)/2),r}function p1(r){return r.repeat.x=1,r.repeat.y=1,r.offset.x=0,r.offset.y=0,r}function yp(r,e,t,n){const i=m1(n);switch(t){case Fp:return r*e;case wh:return r*e/i.components*i.byteLength;case _l:return r*e/i.components*i.byteLength;case es:return r*e*2/i.components*i.byteLength;case Eh:return r*e*2/i.components*i.byteLength;case Bp:return r*e*3/i.components*i.byteLength;case jn:return r*e*4/i.components*i.byteLength;case bh:return r*e*4/i.components*i.byteLength;case Xa:case Ya:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case qa:case Za:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Du:case Ou:return Math.max(r,16)*Math.max(e,8)/4;case Nu:case Uu:return Math.max(r,8)*Math.max(e,8)/2;case Fu:case Bu:case ku:case Hu:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case zu:case el:case Vu:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Gu:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Wu:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Xu:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Yu:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case qu:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Zu:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case ju:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Ju:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Ku:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case Qu:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case $u:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case eh:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case th:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case nh:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case ih:case rh:case sh:return Math.ceil(r/4)*Math.ceil(e/4)*16;case oh:case ah:return Math.ceil(r/4)*Math.ceil(e/4)*8;case tl:case lh:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function m1(r){switch(r){case qn:case Np:return{byteLength:1,components:1};case Yo:case Dp:case Wi:return{byteLength:2,components:1};case Sh:case Mh:return{byteLength:2,components:4};case Pi:case yh:case Zn:return{byteLength:4,components:1};case Up:case Op:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${r}.`)}class g1{static contain(e,t){return f1(e,t)}static cover(e,t){return d1(e,t)}static fill(e){return p1(e)}static getByteLength(e,t,n,i){return yp(e,t,n,i)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ml}}));typeof window<"u"&&(window.__THREE__?Be("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ml);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function ey(){let r=null,e=!1,t=null,n=null;function i(s,o){n=r.requestAnimationFrame(i),t(s,o)}return{start:function(){e!==!0&&t!==null&&r!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function _1(r){const e=new WeakMap;function t(c,u){const h=c.array,f=c.usage,p=h.byteLength,m=r.createBuffer();r.bindBuffer(u,m),r.bufferData(u,h,f),c.onUploadCallback();let g;if(h instanceof Float32Array)g=r.FLOAT;else if(typeof Float16Array<"u"&&h instanceof Float16Array)g=r.HALF_FLOAT;else if(h instanceof Uint16Array)c.isFloat16BufferAttribute?g=r.HALF_FLOAT:g=r.UNSIGNED_SHORT;else if(h instanceof Int16Array)g=r.SHORT;else if(h instanceof Uint32Array)g=r.UNSIGNED_INT;else if(h instanceof Int32Array)g=r.INT;else if(h instanceof Int8Array)g=r.BYTE;else if(h instanceof Uint8Array)g=r.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)g=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:m,type:g,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version,size:p}}function n(c,u,h){const f=u.array,p=u.updateRanges;if(r.bindBuffer(h,c),p.length===0)r.bufferSubData(h,0,f);else{p.sort((g,v)=>g.start-v.start);let m=0;for(let g=1;g<p.length;g++){const v=p[m],M=p[g];M.start<=v.start+v.count+1?v.count=Math.max(v.count,M.start+M.count-v.start):(++m,p[m]=M)}p.length=m+1;for(let g=0,v=p.length;g<v;g++){const M=p[g];r.bufferSubData(h,M.start*f.BYTES_PER_ELEMENT,f,M.start,M.count)}u.clearUpdateRanges()}u.onUploadCallback()}function i(c){return c.isInterleavedBufferAttribute&&(c=c.data),e.get(c)}function s(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=e.get(c);u&&(r.deleteBuffer(u.buffer),e.delete(c))}function o(c,u){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){const f=e.get(c);(!f||f.version<c.version)&&e.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}const h=e.get(c);if(h===void 0)e.set(c,t(c,u));else if(h.version<c.version){if(h.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(h.buffer,c,u),h.version=c.version}}return{get:i,remove:s,update:o}}var v1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,x1=`#ifdef USE_ALPHAHASH
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
#endif`,y1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,S1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,M1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,w1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,E1=`#ifdef USE_AOMAP
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
#endif`,b1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,T1=`#ifdef USE_BATCHING
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
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,A1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,C1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,R1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,P1=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,I1=`#ifdef USE_IRIDESCENCE
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
#endif`,L1=`#ifdef USE_BUMPMAP
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
#endif`,N1=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,D1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,U1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,O1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,F1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,B1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,z1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,k1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,H1=`#define PI 3.141592653589793
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
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
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
} // validated`,V1=`vec3 transformedNormal = objectNormal;
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
#endif`,G1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,W1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,X1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Y1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,q1="gl_FragColor = linearToOutputTexel( gl_FragColor );",Z1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,j1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,J1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,K1=`#ifdef USE_ENVMAP
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
#endif`,Q1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,$1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,eb=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,tb=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,nb=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ib=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,rb=`#ifdef USE_GRADIENTMAP
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
}`,sb=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ob=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ab=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lb=`uniform bool receiveShadow;
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
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
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
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
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
#endif
#include <lightprobes_pars_fragment>`,cb=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,ub=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,hb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,fb=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,db=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,pb=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
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
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
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
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
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
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
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
#endif`,mb=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
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
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
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
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
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
		return 0.5 / max( gv + gl, EPSILON );
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
		float roughness = max( material.clearcoatRoughness, 0.045 );
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
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
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
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
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
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
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
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
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
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
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
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,gb=`
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
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
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
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,_b=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,vb=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,xb=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,yb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Sb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Eb=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,bb=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Tb=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ab=`#if defined( USE_POINTS_UV )
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
#endif`,Cb=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Rb=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Pb=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ib=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Lb=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Nb=`#ifdef USE_MORPHTARGETS
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
#endif`,Db=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ub=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#ifdef DOUBLE_SIDED
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
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Ob=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Fb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,kb=`#ifdef USE_NORMALMAP
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
#endif`,Hb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Vb=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Gb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Wb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Xb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Yb=`vec3 packNormalToRGB( const in vec3 normal ) {
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,qb=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Zb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,jb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Jb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Kb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Qb=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,$b=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
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
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,eT=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
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
#endif`,tT=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
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
#endif`,nT=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
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
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
}`,iT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,rT=`#ifdef USE_SKINNING
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
#endif`,sT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,oT=`#ifdef USE_SKINNING
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
#endif`,aT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,lT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,cT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,uT=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,hT=`#ifdef USE_TRANSMISSION
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
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,fT=`#ifdef USE_TRANSMISSION
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
#endif`,dT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
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
#endif`,pT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
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
#endif`,mT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
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
#endif`,gT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const _T=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,vT=`uniform sampler2D t2D;
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
}`,xT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yT=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ST=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,MT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wT=`#include <common>
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
}`,ET=`#if DEPTH_PACKING == 3200
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,bT=`#define DISTANCE
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
}`,TT=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,AT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,CT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,RT=`uniform float scale;
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
}`,PT=`uniform vec3 diffuse;
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
}`,IT=`#include <common>
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
}`,LT=`uniform vec3 diffuse;
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
}`,NT=`#define LAMBERT
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
}`,DT=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,UT=`#define MATCAP
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
}`,OT=`#define MATCAP
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
}`,FT=`#define NORMAL
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
}`,BT=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
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
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,zT=`#define PHONG
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
}`,kT=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,HT=`#define STANDARD
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
}`,VT=`#define STANDARD
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
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
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
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
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
}`,GT=`#define TOON
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
}`,WT=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
}`,XT=`uniform float size;
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
}`,YT=`uniform vec3 diffuse;
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
}`,qT=`#include <common>
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
}`,ZT=`uniform vec3 color;
uniform float opacity;
#include <common>
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
	#include <premultiplied_alpha_fragment>
}`,jT=`uniform float rotation;
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
}`,JT=`uniform vec3 diffuse;
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
}`,At={alphahash_fragment:v1,alphahash_pars_fragment:x1,alphamap_fragment:y1,alphamap_pars_fragment:S1,alphatest_fragment:M1,alphatest_pars_fragment:w1,aomap_fragment:E1,aomap_pars_fragment:b1,batching_pars_vertex:T1,batching_vertex:A1,begin_vertex:C1,beginnormal_vertex:R1,bsdfs:P1,iridescence_fragment:I1,bumpmap_pars_fragment:L1,clipping_planes_fragment:N1,clipping_planes_pars_fragment:D1,clipping_planes_pars_vertex:U1,clipping_planes_vertex:O1,color_fragment:F1,color_pars_fragment:B1,color_pars_vertex:z1,color_vertex:k1,common:H1,defaultnormal_vertex:V1,displacementmap_pars_vertex:G1,displacementmap_vertex:W1,emissivemap_fragment:X1,emissivemap_pars_fragment:Y1,colorspace_fragment:q1,colorspace_pars_fragment:Z1,envmap_fragment:j1,envmap_common_pars_fragment:J1,envmap_pars_fragment:K1,envmap_pars_vertex:Q1,envmap_physical_pars_fragment:cb,envmap_vertex:$1,fog_vertex:eb,fog_pars_vertex:tb,fog_fragment:nb,fog_pars_fragment:ib,gradientmap_pars_fragment:rb,lightmap_pars_fragment:sb,lights_lambert_fragment:ob,lights_lambert_pars_fragment:ab,lights_pars_begin:lb,lights_toon_fragment:ub,lights_toon_pars_fragment:hb,lights_phong_fragment:fb,lights_phong_pars_fragment:db,lights_physical_fragment:pb,lights_physical_pars_fragment:mb,lights_fragment_begin:gb,lights_fragment_maps:_b,lights_fragment_end:vb,lightprobes_pars_fragment:xb,logdepthbuf_fragment:yb,logdepthbuf_pars_fragment:Sb,logdepthbuf_pars_vertex:Mb,logdepthbuf_vertex:wb,map_fragment:Eb,map_pars_fragment:bb,map_particle_fragment:Tb,map_particle_pars_fragment:Ab,metalnessmap_fragment:Cb,metalnessmap_pars_fragment:Rb,morphinstance_vertex:Pb,morphcolor_vertex:Ib,morphnormal_vertex:Lb,morphtarget_pars_vertex:Nb,morphtarget_vertex:Db,normal_fragment_begin:Ub,normal_fragment_maps:Ob,normal_pars_fragment:Fb,normal_pars_vertex:Bb,normal_vertex:zb,normalmap_pars_fragment:kb,clearcoat_normal_fragment_begin:Hb,clearcoat_normal_fragment_maps:Vb,clearcoat_pars_fragment:Gb,iridescence_pars_fragment:Wb,opaque_fragment:Xb,packing:Yb,premultiplied_alpha_fragment:qb,project_vertex:Zb,dithering_fragment:jb,dithering_pars_fragment:Jb,roughnessmap_fragment:Kb,roughnessmap_pars_fragment:Qb,shadowmap_pars_fragment:$b,shadowmap_pars_vertex:eT,shadowmap_vertex:tT,shadowmask_pars_fragment:nT,skinbase_vertex:iT,skinning_pars_vertex:rT,skinning_vertex:sT,skinnormal_vertex:oT,specularmap_fragment:aT,specularmap_pars_fragment:lT,tonemapping_fragment:cT,tonemapping_pars_fragment:uT,transmission_fragment:hT,transmission_pars_fragment:fT,uv_pars_fragment:dT,uv_pars_vertex:pT,uv_vertex:mT,worldpos_vertex:gT,background_vert:_T,background_frag:vT,backgroundCube_vert:xT,backgroundCube_frag:yT,cube_vert:ST,cube_frag:MT,depth_vert:wT,depth_frag:ET,distance_vert:bT,distance_frag:TT,equirect_vert:AT,equirect_frag:CT,linedashed_vert:RT,linedashed_frag:PT,meshbasic_vert:IT,meshbasic_frag:LT,meshlambert_vert:NT,meshlambert_frag:DT,meshmatcap_vert:UT,meshmatcap_frag:OT,meshnormal_vert:FT,meshnormal_frag:BT,meshphong_vert:zT,meshphong_frag:kT,meshphysical_vert:HT,meshphysical_frag:VT,meshtoon_vert:GT,meshtoon_frag:WT,points_vert:XT,points_frag:YT,shadow_vert:qT,shadow_frag:ZT,sprite_vert:jT,sprite_frag:JT},ke={common:{diffuse:{value:new Xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new _t},alphaMap:{value:null},alphaMapTransform:{value:new _t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new _t}},envmap:{envMap:{value:null},envMapRotation:{value:new _t},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new _t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new _t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new _t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new _t},normalScale:{value:new me(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new _t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new _t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new _t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new _t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new _t},alphaTest:{value:0},uvTransform:{value:new _t}},sprite:{diffuse:{value:new Xe(16777215)},opacity:{value:1},center:{value:new me(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new _t},alphaMap:{value:null},alphaMapTransform:{value:new _t},alphaTest:{value:0}}},ki={basic:{uniforms:Yn([ke.common,ke.specularmap,ke.envmap,ke.aomap,ke.lightmap,ke.fog]),vertexShader:At.meshbasic_vert,fragmentShader:At.meshbasic_frag},lambert:{uniforms:Yn([ke.common,ke.specularmap,ke.envmap,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.fog,ke.lights,{emissive:{value:new Xe(0)},envMapIntensity:{value:1}}]),vertexShader:At.meshlambert_vert,fragmentShader:At.meshlambert_frag},phong:{uniforms:Yn([ke.common,ke.specularmap,ke.envmap,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.fog,ke.lights,{emissive:{value:new Xe(0)},specular:{value:new Xe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:At.meshphong_vert,fragmentShader:At.meshphong_frag},standard:{uniforms:Yn([ke.common,ke.envmap,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.roughnessmap,ke.metalnessmap,ke.fog,ke.lights,{emissive:{value:new Xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:At.meshphysical_vert,fragmentShader:At.meshphysical_frag},toon:{uniforms:Yn([ke.common,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.gradientmap,ke.fog,ke.lights,{emissive:{value:new Xe(0)}}]),vertexShader:At.meshtoon_vert,fragmentShader:At.meshtoon_frag},matcap:{uniforms:Yn([ke.common,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.fog,{matcap:{value:null}}]),vertexShader:At.meshmatcap_vert,fragmentShader:At.meshmatcap_frag},points:{uniforms:Yn([ke.points,ke.fog]),vertexShader:At.points_vert,fragmentShader:At.points_frag},dashed:{uniforms:Yn([ke.common,ke.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:At.linedashed_vert,fragmentShader:At.linedashed_frag},depth:{uniforms:Yn([ke.common,ke.displacementmap]),vertexShader:At.depth_vert,fragmentShader:At.depth_frag},normal:{uniforms:Yn([ke.common,ke.bumpmap,ke.normalmap,ke.displacementmap,{opacity:{value:1}}]),vertexShader:At.meshnormal_vert,fragmentShader:At.meshnormal_frag},sprite:{uniforms:Yn([ke.sprite,ke.fog]),vertexShader:At.sprite_vert,fragmentShader:At.sprite_frag},background:{uniforms:{uvTransform:{value:new _t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:At.background_vert,fragmentShader:At.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new _t}},vertexShader:At.backgroundCube_vert,fragmentShader:At.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:At.cube_vert,fragmentShader:At.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:At.equirect_vert,fragmentShader:At.equirect_frag},distance:{uniforms:Yn([ke.common,ke.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:At.distance_vert,fragmentShader:At.distance_frag},shadow:{uniforms:Yn([ke.lights,ke.fog,{color:{value:new Xe(0)},opacity:{value:1}}]),vertexShader:At.shadow_vert,fragmentShader:At.shadow_frag}};ki.physical={uniforms:Yn([ki.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new _t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new _t},clearcoatNormalScale:{value:new me(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new _t},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new _t},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new _t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new _t},sheen:{value:0},sheenColor:{value:new Xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new _t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new _t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new _t},transmissionSamplerSize:{value:new me},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new _t},attenuationDistance:{value:0},attenuationColor:{value:new Xe(0)},specularColor:{value:new Xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new _t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new _t},anisotropyVector:{value:new me},anisotropyMap:{value:null},anisotropyMapTransform:{value:new _t}}]),vertexShader:At.meshphysical_vert,fragmentShader:At.meshphysical_frag};const fu={r:0,b:0,g:0},KT=new mt,ty=new _t;ty.set(-1,0,0,0,1,0,0,0,1);function QT(r,e,t,n,i,s){const o=new Xe(0);let c=i===!0?0:1,u,h,f=null,p=0,m=null;function g(w){let b=w.isScene===!0?w.background:null;if(b&&b.isTexture){const T=w.backgroundBlurriness>0;b=e.get(b,T)}return b}function v(w){let b=!1;const T=g(w);T===null?y(o,c):T&&T.isColor&&(y(T,1),b=!0);const P=r.xr.getEnvironmentBlendMode();P==="additive"?t.buffers.color.setClear(0,0,0,1,s):P==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(r.autoClear||b)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function M(w,b){const T=g(b);T&&T.isCubeTexture?(h===void 0&&(h=new Sn(new Xs(1,1,1),new fr({name:"BackgroundCubeMaterial",uniforms:Jo(ki.backgroundCube.uniforms),vertexShader:ki.backgroundCube.vertexShader,fragmentShader:ki.backgroundCube.fragmentShader,side:Jn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,R,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(h)),h.material.uniforms.envMap.value=T,h.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(KT.makeRotationFromEuler(b.backgroundRotation)).transpose(),T.isRenderTargetTexture===!1&&h.material.uniforms.backgroundRotation.value.premultiply(ty),h.material.toneMapped=Dt.getTransfer(T.colorSpace)!==Wt,(f!==T||p!==T.version||m!==r.toneMapping)&&(h.material.needsUpdate=!0,f=T,p=T.version,m=r.toneMapping),h.layers.enableAll(),w.unshift(h,h.geometry,h.material,0,0,null)):T&&T.isTexture&&(u===void 0&&(u=new Sn(new $o(2,2),new fr({name:"BackgroundMaterial",uniforms:Jo(ki.background.uniforms),vertexShader:ki.background.vertexShader,fragmentShader:ki.background.fragmentShader,side:$r,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(u)),u.material.uniforms.t2D.value=T,u.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,u.material.toneMapped=Dt.getTransfer(T.colorSpace)!==Wt,T.matrixAutoUpdate===!0&&T.updateMatrix(),u.material.uniforms.uvTransform.value.copy(T.matrix),(f!==T||p!==T.version||m!==r.toneMapping)&&(u.material.needsUpdate=!0,f=T,p=T.version,m=r.toneMapping),u.layers.enableAll(),w.unshift(u,u.geometry,u.material,0,0,null))}function y(w,b){w.getRGB(fu,yx(r)),t.buffers.color.setClear(fu.r,fu.g,fu.b,b,s)}function x(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0)}return{getClearColor:function(){return o},setClearColor:function(w,b=1){o.set(w),c=b,y(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(w){c=w,y(o,c)},render:v,addToRenderList:M,dispose:x}}function $T(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=m(null);let s=i,o=!1;function c(D,Y,K,H,ne){let oe=!1;const te=p(D,H,K,Y);s!==te&&(s=te,h(s.object)),oe=g(D,H,K,ne),oe&&v(D,H,K,ne),ne!==null&&e.update(ne,r.ELEMENT_ARRAY_BUFFER),(oe||o)&&(o=!1,T(D,Y,K,H),ne!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(ne).buffer))}function u(){return r.createVertexArray()}function h(D){return r.bindVertexArray(D)}function f(D){return r.deleteVertexArray(D)}function p(D,Y,K,H){const ne=H.wireframe===!0;let oe=n[Y.id];oe===void 0&&(oe={},n[Y.id]=oe);const te=D.isInstancedMesh===!0?D.id:0;let k=oe[te];k===void 0&&(k={},oe[te]=k);let G=k[K.id];G===void 0&&(G={},k[K.id]=G);let W=G[ne];return W===void 0&&(W=m(u()),G[ne]=W),W}function m(D){const Y=[],K=[],H=[];for(let ne=0;ne<t;ne++)Y[ne]=0,K[ne]=0,H[ne]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:Y,enabledAttributes:K,attributeDivisors:H,object:D,attributes:{},index:null}}function g(D,Y,K,H){const ne=s.attributes,oe=Y.attributes;let te=0;const k=K.getAttributes();for(const G in k)if(k[G].location>=0){const J=ne[G];let _e=oe[G];if(_e===void 0&&(G==="instanceMatrix"&&D.instanceMatrix&&(_e=D.instanceMatrix),G==="instanceColor"&&D.instanceColor&&(_e=D.instanceColor)),J===void 0||J.attribute!==_e||_e&&J.data!==_e.data)return!0;te++}return s.attributesNum!==te||s.index!==H}function v(D,Y,K,H){const ne={},oe=Y.attributes;let te=0;const k=K.getAttributes();for(const G in k)if(k[G].location>=0){let J=oe[G];J===void 0&&(G==="instanceMatrix"&&D.instanceMatrix&&(J=D.instanceMatrix),G==="instanceColor"&&D.instanceColor&&(J=D.instanceColor));const _e={};_e.attribute=J,J&&J.data&&(_e.data=J.data),ne[G]=_e,te++}s.attributes=ne,s.attributesNum=te,s.index=H}function M(){const D=s.newAttributes;for(let Y=0,K=D.length;Y<K;Y++)D[Y]=0}function y(D){x(D,0)}function x(D,Y){const K=s.newAttributes,H=s.enabledAttributes,ne=s.attributeDivisors;K[D]=1,H[D]===0&&(r.enableVertexAttribArray(D),H[D]=1),ne[D]!==Y&&(r.vertexAttribDivisor(D,Y),ne[D]=Y)}function w(){const D=s.newAttributes,Y=s.enabledAttributes;for(let K=0,H=Y.length;K<H;K++)Y[K]!==D[K]&&(r.disableVertexAttribArray(K),Y[K]=0)}function b(D,Y,K,H,ne,oe,te){te===!0?r.vertexAttribIPointer(D,Y,K,ne,oe):r.vertexAttribPointer(D,Y,K,H,ne,oe)}function T(D,Y,K,H){M();const ne=H.attributes,oe=K.getAttributes(),te=Y.defaultAttributeValues;for(const k in oe){const G=oe[k];if(G.location>=0){let W=ne[k];if(W===void 0&&(k==="instanceMatrix"&&D.instanceMatrix&&(W=D.instanceMatrix),k==="instanceColor"&&D.instanceColor&&(W=D.instanceColor)),W!==void 0){const J=W.normalized,_e=W.itemSize,Te=e.get(W);if(Te===void 0)continue;const ae=Te.buffer,Me=Te.type,Pe=Te.bytesPerElement,Ye=Me===r.INT||Me===r.UNSIGNED_INT||W.gpuType===yh;if(W.isInterleavedBufferAttribute){const Ue=W.data,et=Ue.isInterleavedBuffer===!0?Ue.stride:Ue.itemSize,kt=W.offset;if(Ue.isInstancedInterleavedBuffer||Ue.isInstancedBufferAttribute){for(let Ke=0;Ke<G.locationSize;Ke++)x(G.location+Ke,Ue.meshPerAttribute);D.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=Ue.meshPerAttribute*Ue.count)}else for(let Ke=0;Ke<G.locationSize;Ke++)y(G.location+Ke);r.bindBuffer(r.ARRAY_BUFFER,ae);for(let Ke=0;Ke<G.locationSize;Ke++)b(G.location+Ke,_e/G.locationSize,Me,J,et*Pe,(kt+_e/G.locationSize*Ke)*Pe,Ye)}else{if(W.isInstancedBufferAttribute){for(let Ue=0;Ue<G.locationSize;Ue++)x(G.location+Ue,W.meshPerAttribute);D.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let Ue=0;Ue<G.locationSize;Ue++)y(G.location+Ue);r.bindBuffer(r.ARRAY_BUFFER,ae);for(let Ue=0;Ue<G.locationSize;Ue++)b(G.location+Ue,_e/G.locationSize,Me,J,_e*Pe,_e/G.locationSize*Ue*Pe,Ye)}}else if(te!==void 0){const J=te[k];if(J!==void 0)switch(J.length){case 2:r.vertexAttrib2fv(G.location,J);break;case 3:r.vertexAttrib3fv(G.location,J);break;case 4:r.vertexAttrib4fv(G.location,J);break;default:r.vertexAttrib1fv(G.location,J)}}}}w()}function P(){B();for(const D in n){const Y=n[D];for(const K in Y){const H=Y[K];for(const ne in H){const oe=H[ne];for(const te in oe)f(oe[te].object),delete oe[te];delete H[ne]}}delete n[D]}}function R(D){if(n[D.id]===void 0)return;const Y=n[D.id];for(const K in Y){const H=Y[K];for(const ne in H){const oe=H[ne];for(const te in oe)f(oe[te].object),delete oe[te];delete H[ne]}}delete n[D.id]}function E(D){for(const Y in n){const K=n[Y];for(const H in K){const ne=K[H];if(ne[D.id]===void 0)continue;const oe=ne[D.id];for(const te in oe)f(oe[te].object),delete oe[te];delete ne[D.id]}}}function C(D){for(const Y in n){const K=n[Y],H=D.isInstancedMesh===!0?D.id:0,ne=K[H];if(ne!==void 0){for(const oe in ne){const te=ne[oe];for(const k in te)f(te[k].object),delete te[k];delete ne[oe]}delete K[H],Object.keys(K).length===0&&delete n[Y]}}}function B(){N(),o=!0,s!==i&&(s=i,h(s.object))}function N(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:c,reset:B,resetDefaultState:N,dispose:P,releaseStatesOfGeometry:R,releaseStatesOfObject:C,releaseStatesOfProgram:E,initAttributes:M,enableAttribute:y,disableUnusedAttributes:w}}function eA(r,e,t){let n;function i(u){n=u}function s(u,h){r.drawArrays(n,u,h),t.update(h,n,1)}function o(u,h,f){f!==0&&(r.drawArraysInstanced(n,u,h,f),t.update(h,n,f))}function c(u,h,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,u,0,h,0,f);let m=0;for(let g=0;g<f;g++)m+=h[g];t.update(m,n,1)}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=c}function tA(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const E=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(E){return!(E!==jn&&n.convert(E)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(E){const C=E===Wi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==qn&&E!==Zn&&!C&&n.convert(E)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE))}function u(E){if(E==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=t.precision!==void 0?t.precision:"highp";const f=u(h);f!==h&&(Be("WebGLRenderer:",h,"not supported, using",f,"instead."),h=f);const p=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),m=t.logarithmicDepthBuffer===!0&&p===!1;t.reversedDepthBuffer===!0&&p===!1&&Be("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&p===!0&&Be("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const g=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),v=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=r.getParameter(r.MAX_TEXTURE_SIZE),y=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),x=r.getParameter(r.MAX_VERTEX_ATTRIBS),w=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),b=r.getParameter(r.MAX_VARYING_VECTORS),T=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),P=r.getParameter(r.MAX_SAMPLES),R=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:u,textureFormatReadable:o,textureTypeReadable:c,precision:h,logarithmicDepthBuffer:m,reversedDepthBuffer:p,maxTextures:g,maxVertexTextures:v,maxTextureSize:M,maxCubemapSize:y,maxAttributes:x,maxVertexUniforms:w,maxVaryings:b,maxFragmentUniforms:T,maxSamples:P,samples:R}}function nA(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new ar,c=new _t,u={value:null,needsUpdate:!1};this.uniform=u,this.numPlanes=0,this.numIntersection=0,this.init=function(p,m){const g=p.length!==0||m||n!==0||i;return i=m,n=p.length,g},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(p,m){t=f(p,m,0)},this.setState=function(p,m,g){const v=p.clippingPlanes,M=p.clipIntersection,y=p.clipShadows,x=r.get(p);if(!i||v===null||v.length===0||s&&!y)s?f(null):h();else{const w=s?0:n,b=w*4;let T=x.clippingState||null;u.value=T,T=f(v,m,b,g);for(let P=0;P!==b;++P)T[P]=t[P];x.clippingState=T,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=w}};function h(){u.value!==t&&(u.value=t,u.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function f(p,m,g,v){const M=p!==null?p.length:0;let y=null;if(M!==0){if(y=u.value,v!==!0||y===null){const x=g+M*4,w=m.matrixWorldInverse;c.getNormalMatrix(w),(y===null||y.length<x)&&(y=new Float32Array(x));for(let b=0,T=g;b!==M;++b,T+=4)o.copy(p[b]).applyMatrix4(w,c),o.normal.toArray(y,T),y[T+3]=o.constant}u.value=y,u.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,y}}class ef extends vi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new xl(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Xs(5,5,5),s=new fr({name:"CubemapFromEquirect",uniforms:Jo(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Jn,blending:Ns});s.uniforms.tEquirect.value=t;const o=new Sn(i,s),c=t.minFilter;return t.minFilter===Hi&&(t.minFilter=rn),new ph(1,10,this).update(e,o),t.minFilter=c,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}const v_=256,iA=3,rA=20,ny=256,iy=16,sA=3,oA=new O,aA=new Xe;class pl{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new ph(1,10,null),this._boxMesh=new Sn(new Xs(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,i=100,s={}){const{size:o=256,position:c=oA}=s,u=this._renderer;this._setSize(o);const h=this._allocateTarget(),f=this._getSourceTarget(!0);t>0&&(f.texture.mipmapsAutoUpdate=!1);const p=u.autoClear,m=u.autoClearColor,g=u.autoClearDepth,v=u.autoClearStencil,M=e.background;u.autoClear=!0,u.autoClearColor=!0,u.autoClearDepth=!0,u.autoClearStencil=!0,M===null&&(e.background=u.getClearColor(aA));const y=new ph(n,i,f);return y.position.copy(c),y.update(u,e),u.autoClear=p,u.autoClearColor=m,u.autoClearDepth=g,u.autoClearStencil=v,e.background=M,t>0&&(f.texture.mipmapsAutoUpdate=!0,this._blur(h,t)),this._applyPMREM(h),h}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=S_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=y_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(v_,Jv(e))}_fromTexture(e,t){e.mapping===Nr||e.mapping===Fs?this._setSize(e.image.length===0?v_:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);const n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){const e=this._cubeSize,t=x_(e,!1,!1),n=Math.log2(e)-iA;for(let i=0;i<=n;i++)t.texture.mipmaps.push({width:e>>i,height:e>>i});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){const t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=x_(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){const i=this._boxMesh,s=this._cubeCamera;i.material=n,s.renderTarget=e,s.activeMipmapLevel=t;const o=e.width>>t;e.viewport.set(0,0,o,o),s.update(this._renderer,i),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===Nr||e.mapping===Fs?(this._cubemapMaterial===null&&(this._cubemapMaterial=S_()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=y_()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=lA(),this._integrationMaterial=cA());const t=this._cubeSize,n=e.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;const s=this._integrationMaterial.uniforms;s.envMap.value=this._sourceTarget.texture,s.sourceLod.value=Math.log2(t/iy);for(let o=0;o<=n;o++){const c=pl.lodToRoughness(o,n);if(o>n-sA)s.roughness.value=c,this._renderCube(e,o,this._integrationMaterial);else{const u=c>0?Math.log2(t)+.5*Math.log2(6/(ny*Math.pow(c,4)))+.5:0;i.roughness.value=c,i.lodBias.value=u,this._renderCube(e,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=uA());const n=this._blurMaterial,i=n.uniforms,s=this._sourceTarget;i.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,i.envMap.value=s.texture,this._renderCube(e,0,n),i.envMap.value=e.texture,this._renderCube(s,0,n)}}function x_(r,e,t){return new ef(r,{minFilter:Hi,generateMipmaps:e,type:Wi,colorSpace:rl,depthBuffer:t})}function Tl(r,e,t){return new fr({name:r,uniforms:e,vertexShader:At.cube_vert,fragmentShader:t,side:Jn,blending:Ns,depthTest:!1,depthWrite:!1})}function lA(){return Tl("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${ny}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function cA(){return Tl("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:iy}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function uA(){return Tl("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${rA}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function y_(){return Tl("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function S_(){return Tl("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function hA(r){let e=new WeakMap,t=new WeakMap,n=null;function i(m,g=!1){return m==null?null:g?o(m):s(m)}function s(m){if(m&&m.isTexture){const g=m.mapping;if(g===Va||g===Ga)if(e.has(m)){const v=e.get(m).texture;return c(v,m.mapping)}else{const v=m.image;if(v&&v.height>0){const M=new ef(v.height);return M.fromEquirectangularTexture(r,m),e.set(m,M),m.addEventListener("dispose",h),c(M.texture,m.mapping)}else return null}}return m}function o(m){if(m&&m.isTexture&&m.isPMREMTexture!==!0){const g=m.mapping,v=g===Va||g===Ga,M=g===Nr||g===Fs;if(v||M){let y=t.get(m);const x=y!==void 0?y.texture.pmremVersion:0;if(m.isRenderTargetTexture&&m.pmremVersion!==x)return n===null&&(n=new pl(r)),y=v?n.fromEquirectangular(m,y):n.fromCubemap(m,y),y.texture.pmremVersion=m.pmremVersion,t.set(m,y),y.texture;if(y!==void 0)return y.texture;{const w=m.image;return v&&w&&w.height>0||M&&w&&u(w)?(n===null&&(n=new pl(r)),y=v?n.fromEquirectangular(m):n.fromCubemap(m),y.texture.pmremVersion=m.pmremVersion,t.set(m,y),m.addEventListener("dispose",f),y.texture):null}}}return m}function c(m,g){return g===Va?m.mapping=Nr:g===Ga&&(m.mapping=Fs),m}function u(m){let g=0;const v=6;for(let M=0;M<v;M++)m[M]!==void 0&&g++;return g===v}function h(m){const g=m.target;g.removeEventListener("dispose",h);const v=e.get(g);v!==void 0&&(e.delete(g),v.dispose())}function f(m){const g=m.target;g.removeEventListener("dispose",f);const v=t.get(g);v!==void 0&&(t.delete(g),v.dispose())}function p(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:p}}function fA(r){const e={};function t(n){if(e[n]!==void 0)return e[n];const i=r.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Ir("WebGLRenderer: "+n+" extension not supported."),i}}}function dA(r,e,t,n){const i={},s=new WeakMap,o=new FinalizationRegistry(v=>delete i[v]);function c(v){u(v.target)}function u(v){v.index!==null&&e.remove(v.index);for(const y in v.attributes)e.remove(v.attributes[y]);v.removeEventListener("dispose",c),delete i[v.id],o.unregister(v);const M=s.get(v);M&&(e.remove(M),s.delete(v)),n.releaseStatesOfGeometry(v),v.isInstancedBufferGeometry===!0&&delete v._maxInstanceCount,t.memory.geometries--}function h(v,M){return i[M.id]!==void 0||(M.addEventListener("dispose",c),i[M.id]=new WeakRef(M),o.register(M,M.id,M),t.memory.geometries++),M}function f(v){const M=v.attributes;for(const y in M)e.update(M[y],r.ARRAY_BUFFER)}function p(v){const M=v.index,y=v.attributes.position;let x=0;if(y===void 0)return;const w=M!==null?M.array.length:y.array.length/3-1,b=y.count>=65535?qp:Yp,T=new b(Math.ceil(w/3)*6,1),P=T.array;if(M!==null){const E=M.array;x=M.version;for(let C=0,B=0;C<w;C+=3){const N=E[C+0],D=E[C+1],Y=E[C+2];P[B++]=N,P[B++]=D,P[B++]=D,P[B++]=Y,P[B++]=Y,P[B++]=N}}else{x=y.version;for(let E=0,C=0;E<w;E+=3){const B=E+0,N=E+1,D=E+2;P[C++]=B,P[C++]=N,P[C++]=N,P[C++]=D,P[C++]=D,P[C++]=B}}T.version=x;const R=s.get(v);R&&e.remove(R),s.set(v,T)}function m(v){const M=s.get(v);if(M){const y=v.index;y!==null&&M.version<y.version&&p(v)}else p(v);return s.get(v)}function g(){for(const v in i){const M=i[v].deref();M!==void 0&&u(M)}}return{get:h,update:f,getWireframeAttribute:m,dispose:g}}function pA(r,e,t){let n;function i(p){n=p}let s,o;function c(p){s=p.type,o=p.bytesPerElement}function u(p,m){r.drawElements(n,m,s,p*o),t.update(m,n,1)}function h(p,m,g){g!==0&&(r.drawElementsInstanced(n,m,s,p*o,g),t.update(m,n,g))}function f(p,m,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,s,p,0,g);let M=0;for(let y=0;y<g;y++)M+=m[y];t.update(M,n,1)}this.setMode=i,this.setIndex=c,this.render=u,this.renderInstances=h,this.renderMultiDraw=f}function mA(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,c){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=c*(s/3);break;case r.LINES:t.lines+=c*(s/2);break;case r.LINE_STRIP:t.lines+=c*(s-1);break;case r.LINE_LOOP:t.lines+=c*s;break;case r.POINTS:t.points+=c*s;break;default:nt("WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function gA(r,e,t){const n=new WeakMap,i=new Ot;function s(o,c,u){const h=o.morphTargetInfluences,f=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,p=f!==void 0?f.length:0;let m=n.get(c);if(m===void 0||m.count!==p){let B=function(){E.dispose(),n.delete(c),c.removeEventListener("dispose",B)};m!==void 0&&m.texture.dispose();const g=c.morphAttributes.position!==void 0,v=c.morphAttributes.normal!==void 0,M=c.morphAttributes.color!==void 0,y=c.morphAttributes.position||[],x=c.morphAttributes.normal||[],w=c.morphAttributes.color||[];let b=0;g===!0&&(b=1),v===!0&&(b=2),M===!0&&(b=3);let T=c.attributes.position.count*b,P=1;T>e.maxTextureSize&&(P=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const R=new Float32Array(T*P*4*p),E=new Rh(R,T,P,p);E.type=Zn,E.needsUpdate=!0;const C=b*4;for(let N=0;N<p;N++){const D=y[N],Y=x[N],K=w[N],H=T*P*4*N;for(let ne=0;ne<D.count;ne++){const oe=ne*C;g===!0&&(i.fromBufferAttribute(D,ne),R[H+oe+0]=i.x,R[H+oe+1]=i.y,R[H+oe+2]=i.z,R[H+oe+3]=0),v===!0&&(i.fromBufferAttribute(Y,ne),R[H+oe+4]=i.x,R[H+oe+5]=i.y,R[H+oe+6]=i.z,R[H+oe+7]=0),M===!0&&(i.fromBufferAttribute(K,ne),R[H+oe+8]=i.x,R[H+oe+9]=i.y,R[H+oe+10]=i.z,R[H+oe+11]=K.itemSize===4?i.w:1)}}m={count:p,texture:E,size:new me(T,P)},n.set(c,m),c.addEventListener("dispose",B)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)u.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let g=0;for(let M=0;M<h.length;M++)g+=h[M];const v=c.morphTargetsRelative?1:1-g;u.getUniforms().setValue(r,"morphTargetBaseInfluence",v),u.getUniforms().setValue(r,"morphTargetInfluences",h)}u.getUniforms().setValue(r,"morphTargetsTexture",m.texture,t),u.getUniforms().setValue(r,"morphTargetsTextureSize",m.size)}return{update:s}}function _A(r,e,t,n,i){let s=new WeakMap;function o(h){const f=i.render.frame,p=h.geometry,m=e.get(h,p);if(s.get(m)!==f&&(e.update(m),s.set(m,f)),h.isInstancedMesh&&(h.hasEventListener("dispose",u)===!1&&h.addEventListener("dispose",u),s.get(h)!==f&&(t.update(h.instanceMatrix,r.ARRAY_BUFFER),h.instanceColor!==null&&t.update(h.instanceColor,r.ARRAY_BUFFER),s.set(h,f))),h.isSkinnedMesh){const g=h.skeleton;s.get(g)!==f&&(g.update(),s.set(g,f))}return m}function c(){s=new WeakMap}function u(h){const f=h.target;f.removeEventListener("dispose",u),n.releaseStatesOfObject(f),t.remove(f.instanceMatrix),f.instanceColor!==null&&t.remove(f.instanceColor)}return{update:o,dispose:c}}const vA={[Tp]:"LINEAR_TONE_MAPPING",[Ap]:"REINHARD_TONE_MAPPING",[Cp]:"CINEON_TONE_MAPPING",[vh]:"ACES_FILMIC_TONE_MAPPING",[Pp]:"AGX_TONE_MAPPING",[Ip]:"NEUTRAL_TONE_MAPPING",[Rp]:"CUSTOM_TONE_MAPPING"};function xA(r,e,t,n,i,s){const o=new vi(e,t,{type:r,depthBuffer:i,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let c=null,u=null,h=null;const f=new wt;f.setAttribute("position",new qe([-1,3,0,-1,-1,0,3,-1,0],3)),f.setAttribute("uv",new qe([0,2,0,0,2,0],2));const p=new sm({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),m=new Sn(f,p),g=new Qr(-1,1,1,-1,0,1);let v=null,M=null,y=!1,x,w=null,b=[],T=!1;this.setSize=function(P,R){o.setSize(P,R),c!==null&&c.setSize(P,R),u!==null&&u.setSize(P,R);for(let E=0;E<b.length;E++){const C=b[E];C.setSize&&C.setSize(P,R)}},this.setEffects=function(P){b=P,T=b.length>0&&b[0].isRenderPass===!0;const R=o.width,E=o.height;b.length>0&&c===null&&(c=new vi(R,E,{type:Wi,depthBuffer:!1,stencilBuffer:!1}),u=new vi(R,E,{type:Wi,depthBuffer:!1,stencilBuffer:!1}));const C=i===!0&&b.some(B=>B.needsDepthTexture===!0);C!==(o.depthTexture!==null)&&(C===!0&&h===null&&(h=new Hs(R,E),s===!0&&(h.format=Pr,h.type=Bs)),o.dispose(),o.depthTexture=C?h:null,o.resolveDepthBuffer=C,o.storeMultisampledDepthBuffer=C);for(let B=0;B<b.length;B++){const N=b[B];N.setSize&&N.setSize(R,E),C&&N.needsDepthTexture===!0&&N.setDepthTexture&&N.setDepthTexture(h)}},this.begin=function(P,R){if(y||P.toneMapping===Gi&&b.length===0)return!1;if(w=R,R!==null){const E=R.width,C=R.height;(o.width!==E||o.height!==C)&&this.setSize(E,C)}return T===!1&&P.setRenderTarget(o),x=P.toneMapping,P.toneMapping=Gi,!0},this.hasRenderPass=function(){return T},this.end=function(P,R){P.toneMapping=x,y=!0;let E=o,C=c;for(let B=0;B<b.length;B++){const N=b[B];N.enabled!==!1&&(N.render(P,C,E,R),N.needsSwap!==!1&&(E=C,C=C===c?u:c))}if(v!==P.outputColorSpace||M!==P.toneMapping){v=P.outputColorSpace,M=P.toneMapping,p.defines={},Dt.getTransfer(v)===Wt&&(p.defines.SRGB_TRANSFER="");const B=vA[M];B&&(p.defines[B]=""),p.needsUpdate=!0}p.uniforms.tDiffuse.value=E.texture,P.setRenderTarget(w),P.render(m,g),w=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){o.dispose(),c!==null&&c.dispose(),u!==null&&u.dispose(),f.dispose(),p.dispose()}}const ry=new sn,sy=new Hs(1,1),oy=new Kp(1),ay=new Rh,ly=new Ph,cy=new xl,M_=[],w_=[],E_=new Float32Array(16),b_=new Float32Array(9),T_=new Float32Array(4);function ta(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=M_[i];if(s===void 0&&(s=new Float32Array(i),M_[i]=s),e!==0){n.toArray(s,0);for(let o=1,c=0;o!==e;++o)c+=t,r[o].toArray(s,c)}return s}function Mn(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function wn(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function tf(r,e){let t=w_[e];t===void 0&&(t=new Int32Array(e),w_[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function yA(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function SA(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mn(t,e))return;r.uniform2fv(this.addr,e),wn(t,e)}}function MA(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Mn(t,e))return;r.uniform3fv(this.addr,e),wn(t,e)}}function wA(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mn(t,e))return;r.uniform4fv(this.addr,e),wn(t,e)}}function EA(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mn(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),wn(t,e)}else{if(Mn(t,n))return;T_.set(n),r.uniformMatrix2fv(this.addr,!1,T_),wn(t,n)}}function bA(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mn(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),wn(t,e)}else{if(Mn(t,n))return;b_.set(n),r.uniformMatrix3fv(this.addr,!1,b_),wn(t,n)}}function TA(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mn(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),wn(t,e)}else{if(Mn(t,n))return;E_.set(n),r.uniformMatrix4fv(this.addr,!1,E_),wn(t,n)}}function AA(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function CA(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mn(t,e))return;r.uniform2iv(this.addr,e),wn(t,e)}}function RA(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mn(t,e))return;r.uniform3iv(this.addr,e),wn(t,e)}}function PA(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mn(t,e))return;r.uniform4iv(this.addr,e),wn(t,e)}}function IA(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function LA(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mn(t,e))return;r.uniform2uiv(this.addr,e),wn(t,e)}}function NA(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mn(t,e))return;r.uniform3uiv(this.addr,e),wn(t,e)}}function DA(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mn(t,e))return;r.uniform4uiv(this.addr,e),wn(t,e)}}function nf(r){return r.version===0&&(r.compareFunction=Vp,r.needsUpdate=!0),r}function UA(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?s=nf(sy):s=ry,t.setTexture2D(e||s,i)}function OA(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||ly,i)}function FA(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_CUBE_SHADOW?s=nf(oy):s=cy,t.setTextureCube(e||s,i)}function BA(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||ay,i)}function zA(r){switch(r){case 5126:return yA;case 35664:return SA;case 35665:return MA;case 35666:return wA;case 35674:return EA;case 35675:return bA;case 35676:return TA;case 5124:case 35670:return AA;case 35667:case 35671:return CA;case 35668:case 35672:return RA;case 35669:case 35673:return PA;case 5125:return IA;case 36294:return LA;case 36295:return NA;case 36296:return DA;case 35678:case 36198:case 36298:case 36306:case 35682:return UA;case 35679:case 36299:case 36307:return OA;case 35680:case 36300:case 36308:case 36293:return FA;case 36289:case 36303:case 36311:case 36292:return BA}}function kA(r,e){r.uniform1fv(this.addr,e)}function HA(r,e){const t=ta(e,this.size,2);r.uniform2fv(this.addr,t)}function VA(r,e){const t=ta(e,this.size,3);r.uniform3fv(this.addr,t)}function GA(r,e){const t=ta(e,this.size,4);r.uniform4fv(this.addr,t)}function WA(r,e){const t=ta(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function XA(r,e){const t=ta(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function YA(r,e){const t=ta(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function qA(r,e){r.uniform1iv(this.addr,e)}function ZA(r,e){r.uniform2iv(this.addr,e)}function jA(r,e){r.uniform3iv(this.addr,e)}function JA(r,e){r.uniform4iv(this.addr,e)}function KA(r,e){r.uniform1uiv(this.addr,e)}function QA(r,e){r.uniform2uiv(this.addr,e)}function $A(r,e){r.uniform3uiv(this.addr,e)}function eC(r,e){r.uniform4uiv(this.addr,e)}function tC(r,e,t){const n=this.cache,i=e.length,s=tf(t,i);Mn(n,s)||(r.uniform1iv(this.addr,s),wn(n,s));let o;this.type===r.SAMPLER_2D_SHADOW?o=nf(sy):o=ry;for(let c=0;c!==i;++c)t.setTexture2D(e[c]||o,s[c])}function nC(r,e,t){const n=this.cache,i=e.length,s=tf(t,i);Mn(n,s)||(r.uniform1iv(this.addr,s),wn(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||ly,s[o])}function iC(r,e,t){const n=this.cache,i=e.length,s=tf(t,i);Mn(n,s)||(r.uniform1iv(this.addr,s),wn(n,s));let o;this.type===r.SAMPLER_CUBE_SHADOW?o=nf(oy):o=cy;for(let c=0;c!==i;++c)t.setTextureCube(e[c]||o,s[c])}function rC(r,e,t){const n=this.cache,i=e.length,s=tf(t,i);Mn(n,s)||(r.uniform1iv(this.addr,s),wn(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||ay,s[o])}function sC(r){switch(r){case 5126:return kA;case 35664:return HA;case 35665:return VA;case 35666:return GA;case 35674:return WA;case 35675:return XA;case 35676:return YA;case 5124:case 35670:return qA;case 35667:case 35671:return ZA;case 35668:case 35672:return jA;case 35669:case 35673:return JA;case 5125:return KA;case 36294:return QA;case 36295:return $A;case 36296:return eC;case 35678:case 36198:case 36298:case 36306:case 35682:return tC;case 35679:case 36299:case 36307:return nC;case 35680:case 36300:case 36308:case 36293:return iC;case 36289:case 36303:case 36311:case 36292:return rC}}class oC{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=zA(t.type)}}class aC{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=sC(t.type)}}class lC{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const c=i[s];c.setValue(e,t[c.id],n)}}}const Wd=/(\w+)(\])?(\[|\.)?/g;function A_(r,e){r.seq.push(e),r.map[e.id]=e}function cC(r,e,t){const n=r.name,i=n.length;for(Wd.lastIndex=0;;){const s=Wd.exec(n),o=Wd.lastIndex;let c=s[1];const u=s[2]==="]",h=s[3];if(u&&(c=c|0),h===void 0||h==="["&&o+2===i){A_(t,h===void 0?new oC(c,r,e):new aC(c,r,e));break}else{let p=t.map[c];p===void 0&&(p=new lC(c),A_(t,p)),t=p}}}class Eu{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){const c=e.getActiveUniform(t,o),u=e.getUniformLocation(t,c.name);cC(c,u,this)}const i=[],s=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(o):s.push(o);i.length>0&&(this.seq=i.concat(s))}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const c=t[s],u=n[c.id];u.needsUpdate!==!1&&c.setValue(e,u.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function C_(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const uC=37297;let hC=0;function fC(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const c=o+1;n.push(`${c===e?">":" "} ${c}: ${t[o]}`)}return n.join(`
`)}const R_=new _t;function dC(r){Dt._getMatrix(R_,Dt.workingColorSpace,r);const e=`mat3( ${R_.elements.map(t=>t.toFixed(4))} )`;switch(Dt.getTransfer(r)){case sl:return[e,"LinearTransferOETF"];case Wt:return[e,"sRGBTransferOETF"];default:return Be("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function P_(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),s=(r.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const c=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+fC(r.getShaderSource(e),c)}else return s}function pC(r,e){const t=dC(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const mC={[Tp]:"Linear",[Ap]:"Reinhard",[Cp]:"Cineon",[vh]:"ACESFilmic",[Pp]:"AgX",[Ip]:"Neutral",[Rp]:"Custom"};function gC(r,e){const t=mC[e];return t===void 0?(Be("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const du=new O;function _C(){Dt.getLuminanceCoefficients(du);const r=du.x.toFixed(4),e=du.y.toFixed(4),t=du.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function vC(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ka).join(`
`)}function xC(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function yC(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let c=1;s.type===r.FLOAT_MAT2&&(c=2),s.type===r.FLOAT_MAT3&&(c=3),s.type===r.FLOAT_MAT4&&(c=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:c}}return t}function ka(r){return r!==""}function I_(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function L_(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const SC=/^[ \t]*#include +<([\w\d./]+)>/gm;function Sp(r){return r.replace(SC,MC)}function MC(r,e){const t=At[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return Sp(t)}const wC=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function N_(r){return r.replace(wC,EC)}function EC(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function D_(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const bC={[Vo]:"SHADOWMAP_TYPE_PCF",[Rs]:"SHADOWMAP_TYPE_VSM"};function TC(r){return bC[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const AC={[Fs]:"ENVMAP_MODE_REFRACTION"};function CC(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":AC[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const RC={[gl]:"ENVMAP_BLENDING_MULTIPLY",[Nv]:"ENVMAP_BLENDING_MIX",[Dv]:"ENVMAP_BLENDING_ADD"};function PC(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":RC[r.combine]||"ENVMAP_BLENDING_NONE"}function IC(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,c=t.fragmentShader;const u=TC(t),h=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",f=CC(t),p=PC(t),m=vC(t),g=xC(s),v=i.createProgram();let M,y,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(M=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ka).join(`
`),M.length>0&&(M+=`
`),y=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ka).join(`
`),y.length>0&&(y+=`
`)):(M=[D_(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+u:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ka).join(`
`),y=[D_(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",t.envMap?"#define "+p:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+u:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Gi?"#define TONE_MAPPING":"",t.toneMapping!==Gi?At.tonemapping_pars_fragment:"",t.toneMapping!==Gi?gC("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",At.colorspace_pars_fragment,pC("linearToOutputTexel",t.outputColorSpace),_C(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ka).join(`
`)),o=Sp(o),o=I_(o,t),o=L_(o,t),c=Sp(c),c=I_(c,t),c=L_(c,t),o=N_(o),c=N_(c),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,M=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+M,y=["#define varying in",t.glslVersion===hp?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===hp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);const w=x+M+o,b=x+y+c,T=C_(i,i.VERTEX_SHADER,w),P=C_(i,i.FRAGMENT_SHADER,b);i.attachShader(v,T),i.attachShader(v,P),t.index0AttributeName!==void 0?i.bindAttribLocation(v,0,t.index0AttributeName):t.hasPositionAttribute===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function R(N){if(r.debug.checkShaderErrors){const D=i.getProgramInfoLog(v)||"",Y=i.getShaderInfoLog(T)||"",K=i.getShaderInfoLog(P)||"",H=D.trim(),ne=Y.trim(),oe=K.trim();let te=!0,k=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(te=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,v,T,P);else{const G=P_(i,T,"vertex"),W=P_(i,P,"fragment");nt("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+H+`
`+G+`
`+W)}else H!==""?Be("WebGLProgram: Program Info Log:",H):(ne===""||oe==="")&&(k=!1);k&&(N.diagnostics={runnable:te,programLog:H,vertexShader:{log:ne,prefix:M},fragmentShader:{log:oe,prefix:y}})}i.deleteShader(T),i.deleteShader(P),E=new Eu(i,v),C=yC(i,v)}let E;this.getUniforms=function(){return E===void 0&&R(this),E};let C;this.getAttributes=function(){return C===void 0&&R(this),C};let B=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return B===!1&&(B=i.getProgramParameter(v,uC)),B},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=hC++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=T,this.fragmentShader=P,this}let LC=0;class NC{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const i=this._getShaderCacheForMaterial(e);return i.has(t)===!1&&(i.add(t),t.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new DC(e),t.set(e,n)),n}}class DC{constructor(e){this.id=LC++,this.code=e,this.usedTimes=0}}function UC(r){return r===es||r===el||r===tl}function OC(r,e,t,n,i,s){const o=new Us,c=new NC,u=new Set,h=[],f=new Map,p=n.logarithmicDepthBuffer,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(E){return u.add(E),E===0?"uv":`uv${E}`}function v(E,C,B,N,D,Y){const K=N.fog,H=D.geometry,ne=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?N.environment:null,oe=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap,te=e.get(E.envMap||ne,oe),k=m[E.type];let G=n.precision;E.precision!==null&&(G=n.getMaxPrecision(E.precision),G!==E.precision&&Be("WebGLProgram.getParameters:",E.precision,"not supported, using",G,"instead."));const W=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,J=W!==void 0?W.length:0;let _e=0;H.morphAttributes.position!==void 0&&(_e=1),H.morphAttributes.normal!==void 0&&(_e=2),H.morphAttributes.color!==void 0&&(_e=3);let Te,ae,Me,Pe;if(k){const ze=ki[k];Te=ze.vertexShader,ae=ze.fragmentShader}else{Te=E.vertexShader,ae=E.fragmentShader;const ze=c.getVertexShaderStage(E),Ft=c.getFragmentShaderStage(E);c.update(E,ze,Ft),Me=ze.id,Pe=Ft.id}const Ye=r.getRenderTarget(),Ue=r.state.buffers.depth.getReversed(),et=D.isInstancedMesh===!0,kt=D.isBatchedMesh===!0,Ke=!!E.map,gt=!!E.matcap,ot=!!te,ge=ot&&te.isPMREMTexture===!0,Ie=!!E.aoMap,Ce=!!E.lightMap,Ge=!!E.bumpMap&&E.wireframe===!1,Ne=!!E.normalMap,pt=!!E.displacementMap,Ze=!!E.emissiveMap,Et=!!E.metalnessMap,bt=!!E.roughnessMap,It=E.anisotropy>0,q=E.clearcoat>0,Kt=E.diffuseRoughness>0,St=E.dispersion>0,Ht=E.retroreflectivity>0,Le=E.iridescence>0,Zt=E.sheen>0,it=E.transmission>0,at=It&&!!E.anisotropyMap,F=q&&!!E.clearcoatMap,I=q&&!!E.clearcoatNormalMap,ie=q&&!!E.clearcoatRoughnessMap,ve=Kt&&!!E.diffuseRoughnessMap,U=Le&&!!E.iridescenceMap,re=Le&&!!E.iridescenceThicknessMap,fe=Zt&&!!E.sheenColorMap,se=Zt&&!!E.sheenRoughnessMap,ce=!!E.specularMap,Ee=!!E.specularColorMap,V=!!E.specularIntensityMap,pe=it&&!!E.transmissionMap,ue=it&&!!E.thicknessMap,we=!!E.gradientMap,xe=!!E.alphaMap,be=E.alphaTest>0,je=!!E.alphaHash,ht=!!E.extensions;let ye=Gi;E.toneMapped&&(Ye===null||Ye.isXRRenderTarget===!0)&&(ye=r.toneMapping);const st=ge?te.isCompressedCubeTexture?te.image[0].mipmaps:te.mipmaps:null,vt={shaderID:k,shaderType:E.type,shaderName:E.name,vertexShader:Te,fragmentShader:ae,defines:E.defines,customVertexShaderID:Me,customFragmentShaderID:Pe,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:G,batching:kt,batchingColor:kt&&D._colorsTexture!==null,instancing:et,instancingColor:et&&D.instanceColor!==null,instancingMorph:et&&D.morphTexture!==null,outputColorSpace:Ye===null?r.outputColorSpace:Ye.isXRRenderTarget===!0?Ye.texture.colorSpace:Dt.workingColorSpace,alphaToCoverage:!!E.alphaToCoverage,map:Ke,matcap:gt,envMap:ot,envMapMode:ot&&te.mapping,envMapPMREM:ge,envMapMaxLod:ge?st.length-1:null,envMapSize:ge?st[0].width:null,aoMap:Ie,lightMap:Ce,bumpMap:Ge,normalMap:Ne,displacementMap:pt,emissiveMap:Ze,normalMapObjectSpace:Ne&&E.normalMapType===kv,normalMapTangentSpace:Ne&&E.normalMapType===Ur,packedNormalMap:Ne&&E.normalMapType===Ur&&UC(E.normalMap.format),metalnessMap:Et,roughnessMap:bt,anisotropy:It,anisotropyMap:at,clearcoat:q,clearcoatMap:F,clearcoatNormalMap:I,clearcoatRoughnessMap:ie,diffuseRoughness:Kt,diffuseRoughnessMap:ve,dispersion:St,retroreflection:Ht,iridescence:Le,iridescenceMap:U,iridescenceThicknessMap:re,sheen:Zt,sheenColorMap:fe,sheenRoughnessMap:se,specularMap:ce,specularColorMap:Ee,specularIntensityMap:V,transmission:it,transmissionMap:pe,thicknessMap:ue,gradientMap:we,opaque:E.transparent===!1&&E.blending===Go&&E.alphaToCoverage===!1,alphaMap:xe,alphaTest:be,alphaHash:je,combine:E.combine,mapUv:Ke&&g(E.map.channel),aoMapUv:Ie&&g(E.aoMap.channel),lightMapUv:Ce&&g(E.lightMap.channel),bumpMapUv:Ge&&g(E.bumpMap.channel),normalMapUv:Ne&&g(E.normalMap.channel),displacementMapUv:pt&&g(E.displacementMap.channel),emissiveMapUv:Ze&&g(E.emissiveMap.channel),metalnessMapUv:Et&&g(E.metalnessMap.channel),roughnessMapUv:bt&&g(E.roughnessMap.channel),anisotropyMapUv:at&&g(E.anisotropyMap.channel),clearcoatMapUv:F&&g(E.clearcoatMap.channel),clearcoatNormalMapUv:I&&g(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ie&&g(E.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ve&&g(E.diffuseRoughnessMap.channel),iridescenceMapUv:U&&g(E.iridescenceMap.channel),iridescenceThicknessMapUv:re&&g(E.iridescenceThicknessMap.channel),sheenColorMapUv:fe&&g(E.sheenColorMap.channel),sheenRoughnessMapUv:se&&g(E.sheenRoughnessMap.channel),specularMapUv:ce&&g(E.specularMap.channel),specularColorMapUv:Ee&&g(E.specularColorMap.channel),specularIntensityMapUv:V&&g(E.specularIntensityMap.channel),transmissionMapUv:pe&&g(E.transmissionMap.channel),thicknessMapUv:ue&&g(E.thicknessMap.channel),alphaMapUv:xe&&g(E.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(Ne||It),vertexNormals:!!H.attributes.normal,vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!H.attributes.uv&&(Ke||xe),fog:!!K,useFog:E.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:E.wireframe===!1&&(E.flatShading===!0||H.attributes.normal===void 0&&Ne===!1&&(E.isMeshLambertMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isMeshPhysicalMaterial)),sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:Ue,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:H.attributes.position!==void 0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:J,morphTextureStride:_e,numSunLights:C.sun.length,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numSunLightShadows:C.sunShadowMap.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numLightProbeGrids:Y.filter(ze=>ze.texture!==null).length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:E.dithering,shadowMapEnabled:r.shadowMap.enabled&&B.length>0,shadowMapType:r.shadowMap.type,toneMapping:ye,decodeVideoTexture:Ke&&E.map.isVideoTexture===!0&&Dt.getTransfer(E.map.colorSpace)===Wt,decodeVideoTextureEmissive:Ze&&E.emissiveMap.isVideoTexture===!0&&Dt.getTransfer(E.emissiveMap.colorSpace)===Wt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===lr,flipSided:E.side===Jn,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:ht&&E.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ht&&E.extensions.multiDraw===!0||kt)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return vt.vertexUv1s=u.has(1),vt.vertexUv2s=u.has(2),vt.vertexUv3s=u.has(3),u.clear(),vt}function M(E){const C=[];if(E.shaderID?C.push(E.shaderID):(C.push(E.customVertexShaderID),C.push(E.customFragmentShaderID)),E.defines!==void 0)for(const B in E.defines)C.push(B),C.push(E.defines[B]);return E.isRawShaderMaterial===!1&&(y(C,E),x(C,E),C.push(r.outputColorSpace)),C.push(E.customProgramCacheKey),C.join()}function y(E,C){E.push(C.precision),E.push(C.outputColorSpace),E.push(C.envMapMode),E.push(C.envMapPMREM),E.push(C.envMapMaxLod),E.push(C.envMapSize),E.push(C.mapUv),E.push(C.alphaMapUv),E.push(C.lightMapUv),E.push(C.aoMapUv),E.push(C.bumpMapUv),E.push(C.normalMapUv),E.push(C.displacementMapUv),E.push(C.emissiveMapUv),E.push(C.metalnessMapUv),E.push(C.roughnessMapUv),E.push(C.anisotropyMapUv),E.push(C.clearcoatMapUv),E.push(C.clearcoatNormalMapUv),E.push(C.clearcoatRoughnessMapUv),E.push(C.diffuseRoughnessMapUv),E.push(C.iridescenceMapUv),E.push(C.iridescenceThicknessMapUv),E.push(C.sheenColorMapUv),E.push(C.sheenRoughnessMapUv),E.push(C.specularMapUv),E.push(C.specularColorMapUv),E.push(C.specularIntensityMapUv),E.push(C.transmissionMapUv),E.push(C.thicknessMapUv),E.push(C.combine),E.push(C.fogExp2),E.push(C.sizeAttenuation),E.push(C.morphTargetsCount),E.push(C.numSunLights),E.push(C.numDirLights),E.push(C.numPointLights),E.push(C.numSpotLights),E.push(C.numSpotLightMaps),E.push(C.numHemiLights),E.push(C.numRectAreaLights),E.push(C.numSunLightShadows),E.push(C.numDirLightShadows),E.push(C.numPointLightShadows),E.push(C.numSpotLightShadows),E.push(C.numSpotLightShadowsWithMaps),E.push(C.numLightProbes),E.push(C.numLightProbeGrids),E.push(C.shadowMapType),E.push(C.toneMapping),E.push(C.numClippingPlanes),E.push(C.numClipIntersection),E.push(C.depthPacking)}function x(E,C){o.disableAll(),C.instancing&&o.enable(0),C.instancingColor&&o.enable(1),C.instancingMorph&&o.enable(2),C.matcap&&o.enable(3),C.envMap&&o.enable(4),C.normalMapObjectSpace&&o.enable(5),C.normalMapTangentSpace&&o.enable(6),C.clearcoat&&o.enable(7),C.iridescence&&o.enable(8),C.alphaTest&&o.enable(9),C.vertexColors&&o.enable(10),C.vertexAlphas&&o.enable(11),C.vertexUv1s&&o.enable(12),C.vertexUv2s&&o.enable(13),C.vertexUv3s&&o.enable(14),C.vertexTangents&&o.enable(15),C.anisotropy&&o.enable(16),C.alphaHash&&o.enable(17),C.batching&&o.enable(18),C.dispersion&&o.enable(19),C.retroreflection&&o.enable(24),C.diffuseRoughness&&o.enable(25),C.batchingColor&&o.enable(20),C.gradientMap&&o.enable(21),C.packedNormalMap&&o.enable(22),C.vertexNormals&&o.enable(23),E.push(o.mask),o.disableAll(),C.fog&&o.enable(0),C.useFog&&o.enable(1),C.flatShading&&o.enable(2),C.logarithmicDepthBuffer&&o.enable(3),C.reversedDepthBuffer&&o.enable(4),C.skinning&&o.enable(5),C.morphTargets&&o.enable(6),C.morphNormals&&o.enable(7),C.morphColors&&o.enable(8),C.premultipliedAlpha&&o.enable(9),C.shadowMapEnabled&&o.enable(10),C.doubleSided&&o.enable(11),C.flipSided&&o.enable(12),C.useDepthPacking&&o.enable(13),C.dithering&&o.enable(14),C.transmission&&o.enable(15),C.sheen&&o.enable(16),C.opaque&&o.enable(17),C.pointsUvs&&o.enable(18),C.decodeVideoTexture&&o.enable(19),C.decodeVideoTextureEmissive&&o.enable(20),C.alphaToCoverage&&o.enable(21),C.numLightProbeGrids>0&&o.enable(22),C.hasPositionAttribute&&o.enable(23),E.push(o.mask)}function w(E){const C=m[E.type];let B;if(C){const N=ki[C];B=dh.clone(N.uniforms)}else B=E.uniforms;return B}function b(E,C){let B=f.get(C);return B!==void 0?++B.usedTimes:(B=new IC(r,C,E,i),h.push(B),f.set(C,B)),B}function T(E){if(--E.usedTimes===0){const C=h.indexOf(E);h[C]=h[h.length-1],h.pop(),f.delete(E.cacheKey),E.destroy()}}function P(E){c.remove(E)}function R(){c.dispose()}return{getParameters:v,getProgramCacheKey:M,getUniforms:w,acquireProgram:b,releaseProgram:T,releaseShaderCache:P,programs:h,dispose:R}}function FC(){let r=new WeakMap;function e(o){return r.has(o)}function t(o){let c=r.get(o);return c===void 0&&(c={},r.set(o,c)),c}function n(o){r.delete(o)}function i(o,c,u){r.get(o)[c]=u}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function BC(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.materialVariant!==e.materialVariant?r.materialVariant-e.materialVariant:r.z!==e.z?r.z-e.z:r.id-e.id}function U_(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function O_(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(m){let g=0;return m.isInstancedMesh&&(g+=2),m.isSkinnedMesh&&(g+=1),g}function c(m,g,v,M,y,x){let w=r[e];return w===void 0?(w={id:m.id,object:m,geometry:g,material:v,materialVariant:o(m),groupOrder:M,renderOrder:m.renderOrder,z:y,group:x},r[e]=w):(w.id=m.id,w.object=m,w.geometry=g,w.material=v,w.materialVariant=o(m),w.groupOrder=M,w.renderOrder=m.renderOrder,w.z=y,w.group=x),e++,w}function u(m,g,v,M,y,x,w){w.reversedDepth===!0&&(y=-y);const b=c(m,g,v,M,y,x);v.transmission>0?n.push(b):v.transparent===!0?i.push(b):t.push(b)}function h(m,g,v,M,y,x){const w=c(m,g,v,M,y,x);v.transmission>0?n.unshift(w):v.transparent===!0?i.unshift(w):t.unshift(w)}function f(m,g){t.length>1&&t.sort(m||BC),n.length>1&&n.sort(g||U_),i.length>1&&i.sort(g||U_)}function p(){for(let m=e,g=r.length;m<g;m++){const v=r[m];if(v.id===null)break;v.id=null,v.object=null,v.geometry=null,v.material=null,v.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:u,unshift:h,finish:p,sort:f}}function zC(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new O_,r.set(n,[o])):i>=s.length?(o=new O_,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function kC(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new O,color:new Xe};break;case"SpotLight":t={position:new O,direction:new O,color:new Xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new O,color:new Xe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new O,skyColor:new Xe,groundColor:new Xe};break;case"RectAreaLight":t={color:new Xe,position:new O,halfWidth:new O,halfHeight:new O};break}return r[e.id]=t,t}}}function HC(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let VC=0;function GC(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function WC(r){const e=new kC,t=HC(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new O);const i=new O,s=new mt,o=new mt;function c(h){let f=0,p=0,m=0;for(let Y=0;Y<9;Y++)n.probe[Y].set(0,0,0);let g=0,v=0,M=0,y=0,x=0,w=0,b=0,T=0,P=0,R=0,E=0,C=0,B=0,N=0;h.sort(GC);for(let Y=0,K=h.length;Y<K;Y++){const H=h[Y],ne=H.color,oe=H.intensity,te=H.distance;let k=null;if(H.shadow&&H.shadow.map&&(H.shadow.map.texture.format===es?k=H.shadow.map.texture:k=H.shadow.map.depthTexture||H.shadow.map.texture),H.isAmbientLight)f+=ne.r*oe,p+=ne.g*oe,m+=ne.b*oe;else if(H.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(H.sh.coefficients[G],oe);N++}else if(H.isSunLight){const G=e.get(H);if(G.color.copy(H.color).multiplyScalar(H.intensity),H.castShadow){const W=H.shadow,J=t.get(H);J.shadowIntensity=W.intensity,J.shadowBias=W.bias,J.shadowNormalBias=W.normalBias,J.shadowRadius=W.radius,J.shadowMapSize.copy(W.mapSize).multiply(W.getFrameExtents()),n.sunShadow[v]=J,n.sunShadowMap[v]=k;const _e=W.getViewportCount();for(let Te=0;Te<_e;Te++)n.sunShadowMatrix[M+Te]=W.getMatrix(Te),n.sunShadowCascade[M+Te]=W._cascadeData[Te];M+=_e,v++}n.sun[g]=G,g++}else if(H.isDirectionalLight){const G=e.get(H);if(G.color.copy(H.color).multiplyScalar(H.intensity),H.castShadow){const W=H.shadow,J=t.get(H);J.shadowIntensity=W.intensity,J.shadowBias=W.bias,J.shadowNormalBias=W.normalBias,J.shadowRadius=W.radius,J.shadowMapSize=W.mapSize,n.directionalShadow[y]=J,n.directionalShadowMap[y]=k,n.directionalShadowMatrix[y]=H.shadow.matrix,P++}n.directional[y]=G,y++}else if(H.isSpotLight){const G=e.get(H);G.position.setFromMatrixPosition(H.matrixWorld),G.color.copy(ne).multiplyScalar(oe),G.distance=te,G.coneCos=Math.cos(H.angle),G.penumbraCos=Math.cos(H.angle*(1-H.penumbra)),G.decay=H.decay,n.spot[w]=G;const W=H.shadow;if(H.map&&(n.spotLightMap[C]=H.map,C++,W.updateMatrices(H),H.castShadow&&B++),n.spotLightMatrix[w]=W.matrix,H.castShadow){const J=t.get(H);J.shadowIntensity=W.intensity,J.shadowBias=W.bias,J.shadowNormalBias=W.normalBias,J.shadowRadius=W.radius,J.shadowMapSize=W.mapSize,n.spotShadow[w]=J,n.spotShadowMap[w]=k,E++}w++}else if(H.isRectAreaLight){const G=e.get(H);G.color.copy(ne).multiplyScalar(oe),G.halfWidth.set(H.width*.5,0,0),G.halfHeight.set(0,H.height*.5,0),n.rectArea[b]=G,b++}else if(H.isPointLight){const G=e.get(H);if(G.color.copy(H.color).multiplyScalar(H.intensity),G.distance=H.distance,G.decay=H.decay,H.castShadow){const W=H.shadow,J=t.get(H);J.shadowIntensity=W.intensity,J.shadowBias=W.bias,J.shadowNormalBias=W.normalBias,J.shadowRadius=W.radius,J.shadowMapSize=W.mapSize,J.shadowCameraNear=W.camera.near,J.shadowCameraFar=W.camera.far,n.pointShadow[x]=J,n.pointShadowMap[x]=k,n.pointShadowMatrix[x]=H.shadow.matrix,R++}n.point[x]=G,x++}else if(H.isHemisphereLight){const G=e.get(H);G.skyColor.copy(H.color).multiplyScalar(oe),G.groundColor.copy(H.groundColor).multiplyScalar(oe),n.hemi[T]=G,T++}}b>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ke.LTC_FLOAT_1,n.rectAreaLTC2=ke.LTC_FLOAT_2):(n.rectAreaLTC1=ke.LTC_HALF_1,n.rectAreaLTC2=ke.LTC_HALF_2)),n.ambient[0]=f,n.ambient[1]=p,n.ambient[2]=m;const D=n.hash;(D.sunLength!==g||D.directionalLength!==y||D.pointLength!==x||D.spotLength!==w||D.rectAreaLength!==b||D.hemiLength!==T||D.numSunShadows!==v||D.numDirectionalShadows!==P||D.numPointShadows!==R||D.numSpotShadows!==E||D.numSpotMaps!==C||D.numLightProbes!==N)&&(n.sun.length=g,n.directional.length=y,n.spot.length=w,n.rectArea.length=b,n.point.length=x,n.hemi.length=T,n.sunShadow.length=v,n.sunShadowMap.length=v,n.sunShadowMatrix.length=M,n.sunShadowCascade.length=M,n.directionalShadow.length=P,n.directionalShadowMap.length=P,n.directionalShadowMatrix.length=P,n.pointShadow.length=R,n.pointShadowMap.length=R,n.pointShadowMatrix.length=R,n.spotShadow.length=E,n.spotShadowMap.length=E,n.spotLightMatrix.length=E+C-B,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=B,n.numLightProbes=N,D.sunLength=g,D.directionalLength=y,D.pointLength=x,D.spotLength=w,D.rectAreaLength=b,D.hemiLength=T,D.numSunShadows=v,D.numDirectionalShadows=P,D.numPointShadows=R,D.numSpotShadows=E,D.numSpotMaps=C,D.numLightProbes=N,n.version=VC++)}function u(h,f){let p=0,m=0,g=0,v=0,M=0,y=0;const x=f.matrixWorldInverse;for(let w=0,b=h.length;w<b;w++){const T=h[w];if(T.isSunLight){const P=n.sun[p];P.direction.setFromMatrixPosition(T.matrixWorld),P.direction.transformDirection(x),p++}else if(T.isDirectionalLight){const P=n.directional[m];P.direction.setFromMatrixPosition(T.matrixWorld),i.setFromMatrixPosition(T.target.matrixWorld),P.direction.sub(i),P.direction.transformDirection(x),m++}else if(T.isSpotLight){const P=n.spot[v];P.position.setFromMatrixPosition(T.matrixWorld),P.position.applyMatrix4(x),P.direction.setFromMatrixPosition(T.matrixWorld),i.setFromMatrixPosition(T.target.matrixWorld),P.direction.sub(i),P.direction.transformDirection(x),v++}else if(T.isRectAreaLight){const P=n.rectArea[M];P.position.setFromMatrixPosition(T.matrixWorld),P.position.applyMatrix4(x),o.identity(),s.copy(T.matrixWorld),s.premultiply(x),o.extractRotation(s),P.halfWidth.set(T.width*.5,0,0),P.halfHeight.set(0,T.height*.5,0),P.halfWidth.applyMatrix4(o),P.halfHeight.applyMatrix4(o),M++}else if(T.isPointLight){const P=n.point[g];P.position.setFromMatrixPosition(T.matrixWorld),P.position.applyMatrix4(x),g++}else if(T.isHemisphereLight){const P=n.hemi[y];P.direction.setFromMatrixPosition(T.matrixWorld),P.direction.transformDirection(x),y++}}}return{setup:c,setupView:u,state:n}}function F_(r){const e=new WC(r),t=[],n=[],i=[];function s(p){f.camera=p,t.length=0,n.length=0,i.length=0}function o(p){p.isLightProbeGrid?i.push(p):t.push(p)}function c(p){n.push(p)}function u(){e.setup(t),i.sort((p,m)=>p.priority-m.priority||p.id-m.id)}function h(p){e.setupView(t,p)}const f={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:f,setupLights:u,setupLightsView:h,pushLight:o,pushShadow:c}}function XC(r){let e=new WeakMap;function t(i,s=0){const o=e.get(i);let c;return o===void 0?(c=new F_(r),e.set(i,[c])):s>=o.length?(c=new F_(r),o.push(c)):c=o[s],c}function n(){e=new WeakMap}return{get:t,dispose:n}}const YC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,qC=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,ZC=[new O(1,0,0),new O(-1,0,0),new O(0,1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1)],jC=[new O(0,-1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1),new O(0,-1,0),new O(0,-1,0)],B_=new mt,Ua=new O,Xd=new O;function JC(r,e,t){let n=new ks;const i=new me,s=new me,o=new Ot,c=new am,u=new lm,h={},f=t.maxTextureSize,p={[$r]:Jn,[Jn]:$r,[lr]:lr},m=new fr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new me},radius:{value:4}},vertexShader:YC,fragmentShader:qC}),g=m.clone();g.defines.HORIZONTAL_PASS=1;const v=new wt;v.setAttribute("position",new Jt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new Sn(v,m),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Vo;let x=this.type;this.render=function(R,E,C){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||R.length===0)return;this.type===Ha&&(Be("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Vo);const B=r.getRenderTarget(),N=r.getActiveCubeFace(),D=r.getActiveMipmapLevel(),Y=r.state;Y.setBlending(Ns),Y.buffers.depth.getReversed()===!0?Y.buffers.color.setClear(0,0,0,0):Y.buffers.color.setClear(1,1,1,1),Y.buffers.depth.setTest(!0),Y.setScissorTest(!1);const K=x!==this.type;K&&E.traverse(function(H){H.material&&(Array.isArray(H.material)?H.material.forEach(ne=>ne.needsUpdate=!0):H.material.needsUpdate=!0)});for(let H=0,ne=R.length;H<ne;H++){const oe=R[H],te=oe.shadow;if(te===void 0){Be("WebGLShadowMap:",oe,"has no shadow.");continue}if(te.autoUpdate===!1&&te.needsUpdate===!1)continue;i.copy(te.mapSize);const k=te.getFrameExtents();i.multiply(k),s.copy(te.mapSize),(i.x>f||i.y>f)&&(i.x>f&&(s.x=Math.floor(f/k.x),i.x=s.x*k.x,te.mapSize.x=s.x),i.y>f&&(s.y=Math.floor(f/k.y),i.y=s.y*k.y,te.mapSize.y=s.y));const G=r.state.buffers.depth.getReversed();if(te.camera._reversedDepth=G,te.map===null||K===!0){if(te.map!==null&&(te.map.depthTexture!==null&&(te.map.depthTexture.dispose(),te.map.depthTexture=null),te.map.dispose()),this.type===Rs){if(oe.isPointLight){Be("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}te.map=new vi(i.x,i.y,{format:es,type:Wi,minFilter:rn,magFilter:rn,generateMipmaps:!1}),te.map.texture.name=oe.name+".shadowMap",te.map.depthTexture=new Hs(i.x,i.y,Zn),te.map.depthTexture.name=oe.name+".shadowMapDepth",te.map.depthTexture.format=Dr,te.map.depthTexture.compareFunction=null,te.map.depthTexture.minFilter=hn,te.map.depthTexture.magFilter=hn}else oe.isPointLight?(te.map=new ef(i.x),te.map.depthTexture=new Kp(i.x,Pi)):(te.map=new vi(i.x,i.y),te.map.depthTexture=new Hs(i.x,i.y,Pi)),te.map.depthTexture.name=oe.name+".shadowMap",te.map.depthTexture.format=Dr,this.type===Vo?(te.map.depthTexture.compareFunction=G?Hp:kp,te.map.depthTexture.minFilter=rn,te.map.depthTexture.magFilter=rn):(te.map.depthTexture.compareFunction=null,te.map.depthTexture.minFilter=hn,te.map.depthTexture.magFilter=hn);te.camera.updateProjectionMatrix()}te.map.isWebGLCubeRenderTarget!==!0&&(te.map.width!==i.x||te.map.height!==i.y)&&te.map.setSize(i.x,i.y);const W=te.map.isWebGLCubeRenderTarget?6:te.getViewportCount();oe.isPointLight!==!0&&te.updateMatrices(oe,C);const J=te.camera.layers.mask&4294967294?te.camera.layers:C.layers;for(let _e=0;_e<W;_e++){const Te=te.getCamera(_e);if(oe.isPointLight){const ae=te.camera,Me=te.matrix,Pe=oe.distance||ae.far;Pe!==ae.far&&(ae.far=Pe,ae.updateProjectionMatrix()),Ua.setFromMatrixPosition(oe.matrixWorld),ae.position.copy(Ua),Xd.copy(ae.position),Xd.add(ZC[_e]),ae.up.copy(jC[_e]),ae.lookAt(Xd),ae.updateMatrixWorld(),Me.makeTranslation(-Ua.x,-Ua.y,-Ua.z),B_.multiplyMatrices(ae.projectionMatrix,ae.matrixWorldInverse),te._frustum.setFromProjectionMatrix(B_,ae.coordinateSystem,ae.reversedDepth)}if(te.map.isWebGLCubeRenderTarget)r.setRenderTarget(te.map,_e),r.clear();else{_e===0&&(r.setRenderTarget(te.map),r.clear());const ae=te.getViewport(_e);o.set(s.x*ae.x,s.y*ae.y,s.x*ae.z,s.y*ae.w),Y.viewport(o)}n=te.getFrustum(_e),T(E,C,Te,oe,J,this.type)}te.isPointLightShadow!==!0&&this.type===Rs&&w(te,C),te.needsUpdate=!1}x=this.type,y.needsUpdate=!1,r.setRenderTarget(B,N,D)};function w(R,E){const C=e.update(M);m.defines.VSM_SAMPLES!==R.blurSamples&&(m.defines.VSM_SAMPLES=R.blurSamples,g.defines.VSM_SAMPLES=R.blurSamples,m.needsUpdate=!0,g.needsUpdate=!0),R.mapPass===null?R.mapPass=new vi(i.x,i.y,{format:es,type:Wi}):(R.mapPass.width!==R.map.width||R.mapPass.height!==R.map.height)&&R.mapPass.setSize(R.map.width,R.map.height),m.uniforms.shadow_pass.value=R.map.depthTexture,m.uniforms.resolution.value.set(R.map.width,R.map.height),m.uniforms.radius.value=R.radius,r.setRenderTarget(R.mapPass),r.clear(),r.renderBufferDirect(E,null,C,m,M,null),g.uniforms.shadow_pass.value=R.mapPass.texture,g.uniforms.resolution.value.set(R.map.width,R.map.height),g.uniforms.radius.value=R.radius,r.setRenderTarget(R.map),r.clear(),r.renderBufferDirect(E,null,C,g,M,null)}function b(R,E,C,B){let N=null;const D=C.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(D!==void 0)N=D;else if(N=C.isPointLight===!0?u:c,r.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){const Y=N.uuid,K=E.uuid;let H=h[Y];H===void 0&&(H={},h[Y]=H);let ne=H[K];ne===void 0&&(ne=N.clone(),H[K]=ne,E.addEventListener("dispose",P)),N=ne}if(N.visible=E.visible,N.wireframe=E.wireframe,B===Rs?N.side=E.shadowSide!==null?E.shadowSide:E.side:N.side=E.shadowSide!==null?E.shadowSide:p[E.side],N.alphaMap=E.alphaMap,N.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,N.map=E.map,N.clipShadows=E.clipShadows,N.clippingPlanes=E.clippingPlanes,N.clipIntersection=E.clipIntersection,N.displacementMap=E.displacementMap,N.displacementScale=E.displacementScale,N.displacementBias=E.displacementBias,N.wireframeLinewidth=E.wireframeLinewidth,N.linewidth=E.linewidth,C.isPointLight===!0&&N.isMeshDistanceMaterial===!0){const Y=r.properties.get(N);Y.light=C}return N}function T(R,E,C,B,N,D){if(R.visible===!1)return;if(R.layers.test(N)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&D===Rs)&&(!R.frustumCulled||R.intersectsFrustum(n))){R.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,R.matrixWorld);const H=e.update(R),ne=R.material;if(Array.isArray(ne)){const oe=H.groups;for(let te=0,k=oe.length;te<k;te++){const G=oe[te],W=ne[G.materialIndex];if(W&&W.visible){const J=b(R,W,B,D);R.onBeforeShadow(r,R,E,C,H,J,G),r.renderBufferDirect(C,null,H,J,R,G),R.onAfterShadow(r,R,E,C,H,J,G)}}}else if(ne.visible){const oe=b(R,ne,B,D);R.onBeforeShadow(r,R,E,C,H,oe,null),r.renderBufferDirect(C,null,H,oe,R,null),R.onAfterShadow(r,R,E,C,H,oe,null)}}const K=R.children;for(let H=0,ne=K.length;H<ne;H++)T(K[H],E,C,B,N,D)}function P(R){R.target.removeEventListener("dispose",P);for(const C in h){const B=h[C],N=R.target.uuid;N in B&&(B[N].dispose(),delete B[N])}}}function KC(r,e){function t(){let V=!1;const pe=new Ot;let ue=null;const we=new Ot(0,0,0,0);return{setMask:function(xe){ue!==xe&&!V&&(r.colorMask(xe,xe,xe,xe),ue=xe)},setLocked:function(xe){V=xe},setClear:function(xe,be,je,ht,ye){ye===!0&&(xe*=ht,be*=ht,je*=ht),pe.set(xe,be,je,ht),we.equals(pe)===!1&&(r.clearColor(xe,be,je,ht),we.copy(pe))},reset:function(){V=!1,ue=null,we.set(-1,0,0,0)}}}function n(){let V=!1,pe=!1,ue=null,we=null,xe=null;return{setReversed:function(be){if(pe!==be){const je=e.get("EXT_clip_control");be?je.clipControlEXT(je.LOWER_LEFT_EXT,je.ZERO_TO_ONE_EXT):je.clipControlEXT(je.LOWER_LEFT_EXT,je.NEGATIVE_ONE_TO_ONE_EXT),pe=be;const ht=xe;xe=null,this.setClear(ht)}},getReversed:function(){return pe},setTest:function(be){be?Ue(r.DEPTH_TEST):et(r.DEPTH_TEST)},setMask:function(be){ue!==be&&!V&&(r.depthMask(be),ue=be)},setFunc:function(be){if(pe&&(be=xM[be]),we!==be){switch(be){case Tu:r.depthFunc(r.NEVER);break;case Au:r.depthFunc(r.ALWAYS);break;case Cu:r.depthFunc(r.LESS);break;case Xo:r.depthFunc(r.LEQUAL);break;case Ru:r.depthFunc(r.EQUAL);break;case Pu:r.depthFunc(r.GEQUAL);break;case Iu:r.depthFunc(r.GREATER);break;case Lu:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}we=be}},setLocked:function(be){V=be},setClear:function(be){xe!==be&&(xe=be,pe&&(be=1-be),r.clearDepth(be))},reset:function(){V=!1,ue=null,we=null,xe=null,pe=!1}}}function i(){let V=!1,pe=null,ue=null,we=null,xe=null,be=null,je=null,ht=null,ye=null;return{setTest:function(st){V||(st?Ue(r.STENCIL_TEST):et(r.STENCIL_TEST))},setMask:function(st){pe!==st&&!V&&(r.stencilMask(st),pe=st)},setFunc:function(st,vt,ze){(ue!==st||we!==vt||xe!==ze)&&(r.stencilFunc(st,vt,ze),ue=st,we=vt,xe=ze)},setOp:function(st,vt,ze){(be!==st||je!==vt||ht!==ze)&&(r.stencilOp(st,vt,ze),be=st,je=vt,ht=ze)},setLocked:function(st){V=st},setClear:function(st){ye!==st&&(r.clearStencil(st),ye=st)},reset:function(){V=!1,pe=null,ue=null,we=null,xe=null,be=null,je=null,ht=null,ye=null}}}const s=new t,o=new n,c=new i;let u={};const h=new WeakMap;let f={},p={},m={},g=new WeakMap,v=[],M=null,y=!1,x=null,w=null,b=null,T=null,P=null,R=null,E=null,C=new Xe(0,0,0),B=0,N=!1,D=null,Y=null,K=null,H=null,ne=null;const oe=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let te=!1,k=0;const G=r.getParameter(r.VERSION);G.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(G)[1]),te=k>=1):G.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),te=k>=2);let W=null,J={};const _e=r.getParameter(r.SCISSOR_BOX),Te=r.getParameter(r.VIEWPORT),ae=new Ot().fromArray(_e),Me=new Ot().fromArray(Te);function Pe(V,pe,ue,we){const xe=new Uint8Array(4),be=r.createTexture();r.bindTexture(V,be),r.texParameteri(V,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(V,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let je=0;je<ue;je++)V===r.TEXTURE_3D||V===r.TEXTURE_2D_ARRAY?r.texImage3D(pe,0,r.RGBA,1,1,we,0,r.RGBA,r.UNSIGNED_BYTE,xe):r.texImage2D(pe+je,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,xe);return be}const Ye={};Ye[r.TEXTURE_2D]=Pe(r.TEXTURE_2D,r.TEXTURE_2D,1),Ye[r.TEXTURE_CUBE_MAP]=Pe(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ye[r.TEXTURE_2D_ARRAY]=Pe(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Ye[r.TEXTURE_3D]=Pe(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),c.setClear(0),Ue(r.DEPTH_TEST),o.setFunc(Xo),Ge(!1),Ne(sp),Ue(r.CULL_FACE),Ie(Ns);function Ue(V){f[V]!==!0&&(r.enable(V),f[V]=!0)}function et(V){f[V]!==!1&&(r.disable(V),f[V]=!1)}function kt(V,pe){return m[V]!==pe?(r.bindFramebuffer(V,pe),m[V]=pe,V===r.DRAW_FRAMEBUFFER&&(m[r.FRAMEBUFFER]=pe),V===r.FRAMEBUFFER&&(m[r.DRAW_FRAMEBUFFER]=pe),!0):!1}function Ke(V,pe){let ue=v,we=!1;if(V){ue=g.get(pe),ue===void 0&&(ue=[],g.set(pe,ue));const xe=V.textures;if(ue.length!==xe.length||ue[0]!==r.COLOR_ATTACHMENT0){for(let be=0,je=xe.length;be<je;be++)ue[be]=r.COLOR_ATTACHMENT0+be;ue.length=xe.length,we=!0}}else ue[0]!==r.BACK&&(ue[0]=r.BACK,we=!0);we&&r.drawBuffers(ue)}function gt(V){return M!==V?(r.useProgram(V),M=V,!0):!1}const ot={[Cs]:r.FUNC_ADD,[gv]:r.FUNC_SUBTRACT,[_v]:r.FUNC_REVERSE_SUBTRACT};ot[vv]=r.MIN,ot[xv]=r.MAX;const ge={[yv]:r.ZERO,[Sv]:r.ONE,[Mv]:r.SRC_COLOR,[Ep]:r.SRC_ALPHA,[Cv]:r.SRC_ALPHA_SATURATE,[Tv]:r.DST_COLOR,[Ev]:r.DST_ALPHA,[wv]:r.ONE_MINUS_SRC_COLOR,[bp]:r.ONE_MINUS_SRC_ALPHA,[Av]:r.ONE_MINUS_DST_COLOR,[bv]:r.ONE_MINUS_DST_ALPHA,[Rv]:r.CONSTANT_COLOR,[Pv]:r.ONE_MINUS_CONSTANT_COLOR,[Iv]:r.CONSTANT_ALPHA,[Lv]:r.ONE_MINUS_CONSTANT_ALPHA};function Ie(V,pe,ue,we,xe,be,je,ht,ye,st){if(V===Ns){y===!0&&(et(r.BLEND),y=!1);return}if(y===!1&&(Ue(r.BLEND),y=!0),V!==mv){if(V!==x||st!==N){if((w!==Cs||P!==Cs)&&(r.blendEquation(r.FUNC_ADD),w=Cs,P=Cs),st)switch(V){case Go:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case op:r.blendFunc(r.ONE,r.ONE);break;case ap:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case lp:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:nt("WebGLState: Invalid blending: ",V);break}else switch(V){case Go:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case op:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case ap:nt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case lp:nt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:nt("WebGLState: Invalid blending: ",V);break}b=null,T=null,R=null,E=null,C.set(0,0,0),B=0,x=V,N=st}return}xe=xe||pe,be=be||ue,je=je||we,(pe!==w||xe!==P)&&(r.blendEquationSeparate(ot[pe],ot[xe]),w=pe,P=xe),(ue!==b||we!==T||be!==R||je!==E)&&(r.blendFuncSeparate(ge[ue],ge[we],ge[be],ge[je]),b=ue,T=we,R=be,E=je),(ht.equals(C)===!1||ye!==B)&&(r.blendColor(ht.r,ht.g,ht.b,ye),C.copy(ht),B=ye),x=V,N=!1}function Ce(V,pe){V.side===lr?et(r.CULL_FACE):Ue(r.CULL_FACE);let ue=V.side===Jn;pe&&(ue=!ue),Ge(ue),V.blending===Go&&V.transparent===!1?Ie(Ns):Ie(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),o.setFunc(V.depthFunc),o.setTest(V.depthTest),o.setMask(V.depthWrite),s.setMask(V.colorWrite);const we=V.stencilWrite;c.setTest(we),we&&(c.setMask(V.stencilWriteMask),c.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),c.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),Ze(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?Ue(r.SAMPLE_ALPHA_TO_COVERAGE):et(r.SAMPLE_ALPHA_TO_COVERAGE)}function Ge(V){D!==V&&(V?r.frontFace(r.CW):r.frontFace(r.CCW),D=V)}function Ne(V){V!==fv?(Ue(r.CULL_FACE),V!==Y&&(V===sp?r.cullFace(r.BACK):V===dv?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):et(r.CULL_FACE),Y=V}function pt(V){V!==K&&(te&&r.lineWidth(V),K=V)}function Ze(V,pe,ue){V?(Ue(r.POLYGON_OFFSET_FILL),(H!==pe||ne!==ue)&&(H=pe,ne=ue,o.getReversed()&&(pe=-pe,ue=-ue),r.polygonOffset(pe,ue))):et(r.POLYGON_OFFSET_FILL)}function Et(V){V?Ue(r.SCISSOR_TEST):et(r.SCISSOR_TEST)}function bt(V){V===void 0&&(V=r.TEXTURE0+oe-1),W!==V&&(r.activeTexture(V),W=V)}function It(V,pe,ue){ue===void 0&&(W===null?ue=r.TEXTURE0+oe-1:ue=W);let we=J[ue];we===void 0&&(we={type:void 0,texture:void 0},J[ue]=we),(we.type!==V||we.texture!==pe)&&(W!==ue&&(r.activeTexture(ue),W=ue),r.bindTexture(V,pe||Ye[V]),we.type=V,we.texture=pe)}function q(){const V=J[W];V!==void 0&&V.type!==void 0&&(r.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function Kt(){try{r.compressedTexImage2D(...arguments)}catch(V){nt("WebGLState:",V)}}function St(){try{r.compressedTexImage3D(...arguments)}catch(V){nt("WebGLState:",V)}}function Ht(){try{r.texSubImage2D(...arguments)}catch(V){nt("WebGLState:",V)}}function Le(){try{r.texSubImage3D(...arguments)}catch(V){nt("WebGLState:",V)}}function Zt(){try{r.compressedTexSubImage2D(...arguments)}catch(V){nt("WebGLState:",V)}}function it(){try{r.compressedTexSubImage3D(...arguments)}catch(V){nt("WebGLState:",V)}}function at(){try{r.texStorage2D(...arguments)}catch(V){nt("WebGLState:",V)}}function F(){try{r.texStorage3D(...arguments)}catch(V){nt("WebGLState:",V)}}function I(){try{r.texImage2D(...arguments)}catch(V){nt("WebGLState:",V)}}function ie(){try{r.texImage3D(...arguments)}catch(V){nt("WebGLState:",V)}}function ve(V){return p[V]!==void 0?p[V]:r.getParameter(V)}function U(V,pe){p[V]!==pe&&(r.pixelStorei(V,pe),p[V]=pe)}function re(V){ae.equals(V)===!1&&(r.scissor(V.x,V.y,V.z,V.w),ae.copy(V))}function fe(V){Me.equals(V)===!1&&(r.viewport(V.x,V.y,V.z,V.w),Me.copy(V))}function se(V,pe){let ue=h.get(pe);ue===void 0&&(ue=new WeakMap,h.set(pe,ue));let we=ue.get(V);we===void 0&&(we=r.getUniformBlockIndex(pe,V.name),r.uniformBlockBinding(pe,we,we),ue.set(V,we))}function ce(V,pe,ue){const xe=h.get(pe).get(V);u[xe]!==ue&&(r.bindBufferBase(r.UNIFORM_BUFFER,xe,ue),u[xe]=ue)}function Ee(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),f={},p={},W=null,J={},m={},u={},g=new WeakMap,v=[],M=null,y=!1,x=null,w=null,b=null,T=null,P=null,R=null,E=null,C=new Xe(0,0,0),B=0,N=!1,D=null,Y=null,K=null,H=null,ne=null,ae.set(0,0,r.canvas.width,r.canvas.height),Me.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),c.reset()}return{buffers:{color:s,depth:o,stencil:c},enable:Ue,disable:et,bindFramebuffer:kt,drawBuffers:Ke,useProgram:gt,setBlending:Ie,setMaterial:Ce,setFlipSided:Ge,setCullFace:Ne,setLineWidth:pt,setPolygonOffset:Ze,setScissorTest:Et,activeTexture:bt,bindTexture:It,unbindTexture:q,compressedTexImage2D:Kt,compressedTexImage3D:St,texImage2D:I,texImage3D:ie,pixelStorei:U,getParameter:ve,updateUBOMapping:se,uniformBlockBinding:ce,texStorage2D:at,texStorage3D:F,texSubImage2D:Ht,texSubImage3D:Le,compressedTexSubImage2D:Zt,compressedTexSubImage3D:it,scissor:re,viewport:fe,reset:Ee}}function QC(r,e,t,n,i,s,o){const c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,u=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new me,f=new WeakMap,p=new Set;let m;const g=new WeakMap,v=new Set,M=new FinalizationRegistry(F=>v.delete(F));let y=!1;try{y=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(F,I){return y?new OffscreenCanvas(F,I):ol("canvas")}function w(F,I,ie){let ve=1;const U=at(F);if((U.width>ie||U.height>ie)&&(ve=ie/Math.max(U.width,U.height)),ve<1)if(typeof HTMLImageElement<"u"&&F instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&F instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&F instanceof ImageBitmap||typeof VideoFrame<"u"&&F instanceof VideoFrame){const re=Math.floor(ve*U.width),fe=Math.floor(ve*U.height);m===void 0&&(m=x(re,fe));const se=I?x(re,fe):m;return se.width=re,se.height=fe,se.getContext("2d").drawImage(F,0,0,re,fe),Be("WebGLRenderer: Texture has been resized from ("+U.width+"x"+U.height+") to ("+re+"x"+fe+")."),se}else return"data"in F&&Be("WebGLRenderer: Image in DataTexture is too big ("+U.width+"x"+U.height+")."),F;return F}function b(F){return F.generateMipmaps}function T(F){r.generateMipmap(F)}function P(F){return F.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:F.isWebGL3DRenderTarget?r.TEXTURE_3D:F.isWebGLArrayRenderTarget||F.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function R(F,I,ie,ve,U,re=!1){if(F!==null){if(r[F]!==void 0)return r[F];Be("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+F+"'")}let fe;ve&&(fe=e.get("EXT_texture_norm16"),fe||Be("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let se=I;if(I===r.RED&&(ie===r.FLOAT&&(se=r.R32F),ie===r.HALF_FLOAT&&(se=r.R16F),ie===r.UNSIGNED_BYTE&&(se=r.R8),ie===r.UNSIGNED_SHORT&&fe&&(se=fe.R16_EXT),ie===r.SHORT&&fe&&(se=fe.R16_SNORM_EXT)),I===r.RED_INTEGER&&(ie===r.UNSIGNED_BYTE&&(se=r.R8UI),ie===r.UNSIGNED_SHORT&&(se=r.R16UI),ie===r.UNSIGNED_INT&&(se=r.R32UI),ie===r.BYTE&&(se=r.R8I),ie===r.SHORT&&(se=r.R16I),ie===r.INT&&(se=r.R32I)),I===r.RG&&(ie===r.FLOAT&&(se=r.RG32F),ie===r.HALF_FLOAT&&(se=r.RG16F),ie===r.UNSIGNED_BYTE&&(se=r.RG8),ie===r.UNSIGNED_SHORT&&fe&&(se=fe.RG16_EXT),ie===r.SHORT&&fe&&(se=fe.RG16_SNORM_EXT)),I===r.RG_INTEGER&&(ie===r.UNSIGNED_BYTE&&(se=r.RG8UI),ie===r.UNSIGNED_SHORT&&(se=r.RG16UI),ie===r.UNSIGNED_INT&&(se=r.RG32UI),ie===r.BYTE&&(se=r.RG8I),ie===r.SHORT&&(se=r.RG16I),ie===r.INT&&(se=r.RG32I)),I===r.RGB_INTEGER&&(ie===r.UNSIGNED_BYTE&&(se=r.RGB8UI),ie===r.UNSIGNED_SHORT&&(se=r.RGB16UI),ie===r.UNSIGNED_INT&&(se=r.RGB32UI),ie===r.BYTE&&(se=r.RGB8I),ie===r.SHORT&&(se=r.RGB16I),ie===r.INT&&(se=r.RGB32I)),I===r.RGBA_INTEGER&&(ie===r.UNSIGNED_BYTE&&(se=r.RGBA8UI),ie===r.UNSIGNED_SHORT&&(se=r.RGBA16UI),ie===r.UNSIGNED_INT&&(se=r.RGBA32UI),ie===r.BYTE&&(se=r.RGBA8I),ie===r.SHORT&&(se=r.RGBA16I),ie===r.INT&&(se=r.RGBA32I)),I===r.RGB&&(ie===r.UNSIGNED_SHORT&&fe&&(se=fe.RGB16_EXT),ie===r.SHORT&&fe&&(se=fe.RGB16_SNORM_EXT),ie===r.UNSIGNED_INT_5_9_9_9_REV&&(se=r.RGB9_E5),ie===r.UNSIGNED_INT_10F_11F_11F_REV&&(se=r.R11F_G11F_B10F)),I===r.RGBA){const ce=re?sl:Dt.getTransfer(U);ie===r.FLOAT&&(se=r.RGBA32F),ie===r.HALF_FLOAT&&(se=r.RGBA16F),ie===r.UNSIGNED_BYTE&&(se=ce===Wt?r.SRGB8_ALPHA8:r.RGBA8),ie===r.UNSIGNED_SHORT&&fe&&(se=fe.RGBA16_EXT),ie===r.SHORT&&fe&&(se=fe.RGBA16_SNORM_EXT),ie===r.UNSIGNED_SHORT_4_4_4_4&&(se=r.RGBA4),ie===r.UNSIGNED_SHORT_5_5_5_1&&(se=r.RGB5_A1)}return(se===r.R16F||se===r.R32F||se===r.RG16F||se===r.RG32F||se===r.RGBA16F||se===r.RGBA32F)&&e.get("EXT_color_buffer_float"),se}function E(F,I){let ie;return F?I===null||I===Pi||I===Bs?ie=r.DEPTH24_STENCIL8:I===Zn?ie=r.DEPTH32F_STENCIL8:I===Yo&&(ie=r.DEPTH24_STENCIL8,Be("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):I===null||I===Pi||I===Bs?ie=r.DEPTH_COMPONENT24:I===Zn?ie=r.DEPTH_COMPONENT32F:I===Yo&&(ie=r.DEPTH_COMPONENT16),ie}function C(F,I){return b(F)===!0||F.isFramebufferTexture&&F.minFilter!==hn&&F.minFilter!==rn?Math.log2(Math.max(I.width,I.height))+1:F.mipmaps.length>0?F.mipmaps.length:F.isCompressedTexture&&Array.isArray(F.image)?I.mipmaps.length:1}function B(F){const I=new WeakRef(F);n.get(F).__ref=I,v.add(I),M.register(F,I,I)}function N(F){const I=n.get(F).__ref;I!==void 0&&(v.delete(I),M.unregister(I))}function D(F){K(F.target)}function Y(F){H(F.target)}function K(F){F.removeEventListener("dispose",D),N(F),oe(F),F.isVideoTexture&&f.delete(F),F.isHTMLTexture&&p.delete(F)}function H(F){F.removeEventListener("dispose",Y),N(F),k(F)}function ne(){for(const F of v){const I=F.deref();I!==void 0&&(I.isRenderTarget===!0?H(I):K(I))}v.clear(),p.clear()}function oe(F){const I=n.get(F);if(I.__webglInit===void 0)return;const ie=F.source,ve=g.get(ie);if(ve){const U=ve[I.__cacheKey];U.usedTimes--,U.usedTimes===0&&te(F),Object.keys(ve).length===0&&g.delete(ie)}n.remove(F)}function te(F){const I=n.get(F);r.deleteTexture(I.__webglTexture);const ie=F.source,ve=g.get(ie);delete ve[I.__cacheKey],o.memory.textures--}function k(F){const I=n.get(F);I.__depthDisposeCallback&&I.__depthDisposeCallback();const ie=F.depthTexture;if(ie&&ie.renderTarget===F&&K(ie),F.isWebGLCubeRenderTarget)for(let U=0;U<6;U++){if(Array.isArray(I.__webglFramebuffer[U]))for(let re=0;re<I.__webglFramebuffer[U].length;re++)r.deleteFramebuffer(I.__webglFramebuffer[U][re]);else r.deleteFramebuffer(I.__webglFramebuffer[U]);I.__webglDepthbuffer&&r.deleteRenderbuffer(I.__webglDepthbuffer[U])}else{if(Array.isArray(I.__webglFramebuffer))for(let U=0;U<I.__webglFramebuffer.length;U++)r.deleteFramebuffer(I.__webglFramebuffer[U]);else r.deleteFramebuffer(I.__webglFramebuffer);if(I.__webglDepthbuffer&&r.deleteRenderbuffer(I.__webglDepthbuffer),I.__webglMultisampledFramebuffer&&r.deleteFramebuffer(I.__webglMultisampledFramebuffer),I.__webglColorRenderbuffer)for(let U=0;U<I.__webglColorRenderbuffer.length;U++)I.__webglColorRenderbuffer[U]&&r.deleteRenderbuffer(I.__webglColorRenderbuffer[U]);I.__webglDepthRenderbuffer&&r.deleteRenderbuffer(I.__webglDepthRenderbuffer)}const ve=F.textures;for(let U=0,re=ve.length;U<re;U++){const fe=n.get(ve[U]);fe.__webglTexture&&(r.deleteTexture(fe.__webglTexture),o.memory.textures--),n.remove(ve[U])}n.remove(F)}let G=0;function W(){G=0}function J(){return G}function _e(F){G=F}function Te(){const F=G;return F>=i.maxTextures&&Be("WebGLTextures: Trying to use "+(F+1)+" texture units while this GPU supports only "+i.maxTextures),G+=1,F}function ae(F){const I=[];return I.push(F.wrapS),I.push(F.wrapT),I.push(F.wrapR||0),I.push(F.magFilter),I.push(F.minFilter),I.push(F.anisotropy),I.push(F.internalFormat),I.push(F.format),I.push(F.type),I.push(F.generateMipmaps),I.push(F.mipmapsAutoUpdate),I.push(F.premultiplyAlpha),I.push(F.flipY),I.push(F.unpackAlignment),I.push(F.colorSpace),I.join()}function Me(F,I){const ie=n.get(F);if(F.isVideoTexture&&Zt(F),F.isRenderTargetTexture===!1&&F.isExternalTexture!==!0&&F.version>0&&ie.__version!==F.version){const ve=F.image;if(ve===null)Be("WebGLRenderer: Texture marked for update but no image data found.");else if(ve.complete===!1)Be("WebGLRenderer: Texture marked for update but image is incomplete");else{Ce(ie,F,I);return}}else F.isExternalTexture&&(ie.__webglTexture=F.sourceTexture?F.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,ie.__webglTexture,r.TEXTURE0+I)}function Pe(F,I){const ie=n.get(F);if(F.isRenderTargetTexture===!1&&F.version>0&&ie.__version!==F.version){Ce(ie,F,I);return}else F.isExternalTexture&&(ie.__webglTexture=F.sourceTexture?F.sourceTexture:null);t.bindTexture(r.TEXTURE_2D_ARRAY,ie.__webglTexture,r.TEXTURE0+I)}function Ye(F,I){const ie=n.get(F);if(F.isRenderTargetTexture===!1&&F.version>0&&ie.__version!==F.version){Ce(ie,F,I);return}t.bindTexture(r.TEXTURE_3D,ie.__webglTexture,r.TEXTURE0+I)}function Ue(F,I){const ie=n.get(F);if(F.version>0&&ie.__version!==F.version){Ge(ie,F,I);return}t.bindTexture(r.TEXTURE_CUBE_MAP,ie.__webglTexture,r.TEXTURE0+I)}const et={[Qa]:r.REPEAT,[oi]:r.CLAMP_TO_EDGE,[$a]:r.MIRRORED_REPEAT},kt={[hn]:r.NEAREST,[Lp]:r.NEAREST_MIPMAP_NEAREST,[Fo]:r.NEAREST_MIPMAP_LINEAR,[rn]:r.LINEAR,[Wa]:r.LINEAR_MIPMAP_NEAREST,[Hi]:r.LINEAR_MIPMAP_LINEAR},Ke={[Vv]:r.NEVER,[Vp]:r.ALWAYS,[Gv]:r.LESS,[kp]:r.LEQUAL,[Wv]:r.EQUAL,[Hp]:r.GEQUAL,[Xv]:r.GREATER,[Yv]:r.NOTEQUAL};function gt(F,I){if(I.type===Zn&&e.has("OES_texture_float_linear")===!1&&(I.magFilter===rn||I.magFilter===Wa||I.magFilter===Fo||I.magFilter===Hi||I.minFilter===rn||I.minFilter===Wa||I.minFilter===Fo||I.minFilter===Hi)&&Be("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(F,r.TEXTURE_WRAP_S,et[I.wrapS]),r.texParameteri(F,r.TEXTURE_WRAP_T,et[I.wrapT]),(F===r.TEXTURE_3D||F===r.TEXTURE_2D_ARRAY)&&r.texParameteri(F,r.TEXTURE_WRAP_R,et[I.wrapR]),r.texParameteri(F,r.TEXTURE_MAG_FILTER,kt[I.magFilter]),r.texParameteri(F,r.TEXTURE_MIN_FILTER,kt[I.minFilter]),I.compareFunction&&(r.texParameteri(F,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(F,r.TEXTURE_COMPARE_FUNC,Ke[I.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(I.magFilter===hn||I.minFilter!==Fo&&I.minFilter!==Hi||I.type===Zn&&e.has("OES_texture_float_linear")===!1)return;if(I.anisotropy>1||n.get(I).__currentAnisotropy){const ie=e.get("EXT_texture_filter_anisotropic");r.texParameterf(F,ie.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(I.anisotropy,i.getMaxAnisotropy())),n.get(I).__currentAnisotropy=I.anisotropy}}}function ot(F,I){let ie=!1;F.__webglInit===void 0&&(F.__webglInit=!0,I.addEventListener("dispose",D),B(I));const ve=I.source;let U=g.get(ve);U===void 0&&(U={},g.set(ve,U));const re=ae(I);if(re!==F.__cacheKey){U[re]===void 0&&(U[re]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,ie=!0),U[re].usedTimes++;const fe=U[F.__cacheKey];fe!==void 0&&(U[F.__cacheKey].usedTimes--,fe.usedTimes===0&&te(I)),F.__cacheKey=re,F.__webglTexture=U[re].texture}return ie}function ge(F,I,ie){return Math.floor(Math.floor(F/ie)/I)}function Ie(F,I,ie,ve){const re=F.updateRanges;if(re.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,I.width,I.height,ie,ve,I.data);else{re.sort((V,pe)=>V.start-pe.start);let fe=0;for(let V=1;V<re.length;V++){const pe=re[fe],ue=re[V],we=pe.start+pe.count,xe=ge(ue.start,I.width,4),be=ge(pe.start,I.width,4);ue.start<=we+1&&xe===be&&ge(ue.start+ue.count-1,I.width,4)===xe?pe.count=Math.max(pe.count,ue.start+ue.count-pe.start):(++fe,re[fe]=ue)}re.length=fe+1;const se=t.getParameter(r.UNPACK_ROW_LENGTH),ce=t.getParameter(r.UNPACK_SKIP_PIXELS),Ee=t.getParameter(r.UNPACK_SKIP_ROWS);t.pixelStorei(r.UNPACK_ROW_LENGTH,I.width);for(let V=0,pe=re.length;V<pe;V++){const ue=re[V],we=Math.floor(ue.start/4),xe=Math.ceil(ue.count/4),be=we%I.width,je=Math.floor(we/I.width),ht=xe,ye=1;t.pixelStorei(r.UNPACK_SKIP_PIXELS,be),t.pixelStorei(r.UNPACK_SKIP_ROWS,je),t.texSubImage2D(r.TEXTURE_2D,0,be,je,ht,ye,ie,ve,I.data)}F.clearUpdateRanges(),t.pixelStorei(r.UNPACK_ROW_LENGTH,se),t.pixelStorei(r.UNPACK_SKIP_PIXELS,ce),t.pixelStorei(r.UNPACK_SKIP_ROWS,Ee)}}function Ce(F,I,ie){let ve=r.TEXTURE_2D;(I.isDataArrayTexture||I.isCompressedArrayTexture)&&(ve=r.TEXTURE_2D_ARRAY),I.isData3DTexture&&(ve=r.TEXTURE_3D);const U=ot(F,I),re=I.source;t.bindTexture(ve,F.__webglTexture,r.TEXTURE0+ie);const fe=n.get(re);if(re.version!==fe.__version||U===!0){if(t.activeTexture(r.TEXTURE0+ie),(typeof ImageBitmap<"u"&&I.image instanceof ImageBitmap)===!1){const ye=Dt.getPrimaries(Dt.workingColorSpace),st=I.colorSpace===Cr?null:Dt.getPrimaries(I.colorSpace),vt=I.colorSpace===Cr||ye===st?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,I.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt)}t.pixelStorei(r.UNPACK_ALIGNMENT,I.unpackAlignment);let ce=w(I.image,!1,i.maxTextureSize);ce=it(I,ce);const Ee=s.convert(I.format,I.colorSpace),V=s.convert(I.type);let pe=R(I.internalFormat,Ee,V,I.normalized,I.colorSpace,I.isVideoTexture);gt(ve,I);let ue;const we=I.mipmaps,xe=I.isVideoTexture!==!0,be=fe.__version===void 0||U===!0,je=re.dataReady,ht=C(I,ce);if(I.isDepthTexture)pe=E(I.format===Pr,I.type),be&&(xe?t.texStorage2D(r.TEXTURE_2D,1,pe,ce.width,ce.height):t.texImage2D(r.TEXTURE_2D,0,pe,ce.width,ce.height,0,Ee,V,null));else if(I.isDataTexture)if(we.length>0){xe&&be&&t.texStorage2D(r.TEXTURE_2D,ht,pe,we[0].width,we[0].height);for(let ye=0,st=we.length;ye<st;ye++)ue=we[ye],xe?je&&t.texSubImage2D(r.TEXTURE_2D,ye,0,0,ue.width,ue.height,Ee,V,ue.data):t.texImage2D(r.TEXTURE_2D,ye,pe,ue.width,ue.height,0,Ee,V,ue.data);I.generateMipmaps=!1}else xe?(be&&t.texStorage2D(r.TEXTURE_2D,ht,pe,ce.width,ce.height),je&&Ie(I,ce,Ee,V)):t.texImage2D(r.TEXTURE_2D,0,pe,ce.width,ce.height,0,Ee,V,ce.data);else if(I.isCompressedTexture)if(I.isCompressedArrayTexture){xe&&be&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ht,pe,we[0].width,we[0].height,ce.depth);for(let ye=0,st=we.length;ye<st;ye++)if(ue=we[ye],I.format!==jn)if(Ee!==null)if(xe){if(je)if(I.layerUpdates.size>0){const vt=yp(ue.width,ue.height,I.format,I.type);for(const ze of I.layerUpdates){const Ft=ue.data.subarray(ze*vt/ue.data.BYTES_PER_ELEMENT,(ze+1)*vt/ue.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ye,0,0,ze,ue.width,ue.height,1,Ee,Ft)}}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ye,0,0,0,ue.width,ue.height,ce.depth,Ee,ue.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,ye,pe,ue.width,ue.height,ce.depth,0,ue.data,0,0);else Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else xe?je&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,ye,0,0,0,ue.width,ue.height,ce.depth,Ee,V,ue.data):t.texImage3D(r.TEXTURE_2D_ARRAY,ye,pe,ue.width,ue.height,ce.depth,0,Ee,V,ue.data);I.layerUpdates.size>0&&I.clearLayerUpdates()}else{xe&&be&&t.texStorage2D(r.TEXTURE_2D,ht,pe,we[0].width,we[0].height);for(let ye=0,st=we.length;ye<st;ye++)ue=we[ye],I.format!==jn?Ee!==null?xe?je&&t.compressedTexSubImage2D(r.TEXTURE_2D,ye,0,0,ue.width,ue.height,Ee,ue.data):t.compressedTexImage2D(r.TEXTURE_2D,ye,pe,ue.width,ue.height,0,ue.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):xe?je&&t.texSubImage2D(r.TEXTURE_2D,ye,0,0,ue.width,ue.height,Ee,V,ue.data):t.texImage2D(r.TEXTURE_2D,ye,pe,ue.width,ue.height,0,Ee,V,ue.data)}else if(I.isDataArrayTexture)if(xe){if(be&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ht,pe,ce.width,ce.height,ce.depth),je)if(I.layerUpdates.size>0){const ye=yp(ce.width,ce.height,I.format,I.type);for(const st of I.layerUpdates){const vt=ce.data.subarray(st*ye/ce.data.BYTES_PER_ELEMENT,(st+1)*ye/ce.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,st,ce.width,ce.height,1,Ee,V,vt)}I.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,ce.width,ce.height,ce.depth,Ee,V,ce.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,pe,ce.width,ce.height,ce.depth,0,Ee,V,ce.data);else if(I.isData3DTexture)xe?(be&&t.texStorage3D(r.TEXTURE_3D,ht,pe,ce.width,ce.height,ce.depth),je&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,ce.width,ce.height,ce.depth,Ee,V,ce.data)):t.texImage3D(r.TEXTURE_3D,0,pe,ce.width,ce.height,ce.depth,0,Ee,V,ce.data);else if(I.isFramebufferTexture){if(be)if(xe)t.texStorage2D(r.TEXTURE_2D,ht,pe,ce.width,ce.height);else{let ye=ce.width,st=ce.height;for(let vt=0;vt<ht;vt++)t.texImage2D(r.TEXTURE_2D,vt,pe,ye,st,0,Ee,V,null),ye>>=1,st>>=1}}else if(I.isHTMLTexture){if("texElementImage2D"in r){const ye=r.canvas;if(ye.hasAttribute("layoutsubtree")||ye.setAttribute("layoutsubtree","true"),ce.parentNode!==ye){ye.appendChild(ce),p.add(I),ye.onpaint=st=>{const vt=st.changedElements;for(const ze of p)vt.includes(ze.image)&&(ze.needsUpdate=!0)},ye.requestPaint();return}if(r.texElementImage2D.length===3)r.texElementImage2D(r.TEXTURE_2D,r.RGBA8,ce);else{const vt=r.RGBA,ze=r.RGBA,Ft=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,0,vt,ze,Ft,ce)}r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(we.length>0){if(xe&&be){const ye=at(we[0]);t.texStorage2D(r.TEXTURE_2D,ht,pe,ye.width,ye.height)}for(let ye=0,st=we.length;ye<st;ye++)ue=we[ye],xe?je&&t.texSubImage2D(r.TEXTURE_2D,ye,0,0,Ee,V,ue):t.texImage2D(r.TEXTURE_2D,ye,pe,Ee,V,ue);I.generateMipmaps=!1}else if(xe){if(be){const ye=at(ce);t.texStorage2D(r.TEXTURE_2D,ht,pe,ye.width,ye.height)}je&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,Ee,V,ce)}else t.texImage2D(r.TEXTURE_2D,0,pe,Ee,V,ce);b(I)&&I.mipmapsAutoUpdate===!0&&T(ve),fe.__version=re.version,I.onUpdate&&I.onUpdate(I)}F.__version=I.version}function Ge(F,I,ie){if(I.image.length!==6)return;const ve=ot(F,I),U=I.source;t.bindTexture(r.TEXTURE_CUBE_MAP,F.__webglTexture,r.TEXTURE0+ie);const re=n.get(U);if(U.version!==re.__version||ve===!0){t.activeTexture(r.TEXTURE0+ie);const fe=Dt.getPrimaries(Dt.workingColorSpace),se=I.colorSpace===Cr?null:Dt.getPrimaries(I.colorSpace),ce=I.colorSpace===Cr||fe===se?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,I.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),t.pixelStorei(r.UNPACK_ALIGNMENT,I.unpackAlignment),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ce);const Ee=I.isCompressedTexture||I.image[0].isCompressedTexture,V=I.image[0]&&I.image[0].isDataTexture,pe=[];for(let ze=0;ze<6;ze++)!Ee&&!V?pe[ze]=w(I.image[ze],!0,i.maxCubemapSize):pe[ze]=V?I.image[ze].image:I.image[ze],pe[ze]=it(I,pe[ze]);const ue=pe[0],we=s.convert(I.format,I.colorSpace),xe=s.convert(I.type);let be=R(I.internalFormat,we,xe,I.normalized,I.colorSpace);const je=I.isVideoTexture!==!0,ht=re.__version===void 0||ve===!0,ye=U.dataReady;let st=C(I,ue);gt(r.TEXTURE_CUBE_MAP,I);let vt;if(I.isDepthTexture){if(be=E(I.format===Pr,I.type),ht)if(je)t.texStorage2D(r.TEXTURE_CUBE_MAP,1,be,ue.width,ue.height);else for(let ze=0;ze<6;ze++)t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ze,0,be,ue.width,ue.height,0,we,xe,null)}else if(Ee){je&&ht&&t.texStorage2D(r.TEXTURE_CUBE_MAP,st,be,ue.width,ue.height);for(let ze=0;ze<6;ze++){vt=pe[ze].mipmaps;for(let Ft=0;Ft<vt.length;Ft++){const fn=vt[Ft];I.format!==jn?we!==null?je?ye&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ze,Ft,0,0,fn.width,fn.height,we,fn.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ze,Ft,be,fn.width,fn.height,0,fn.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):je?ye&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ze,Ft,0,0,fn.width,fn.height,we,xe,fn.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ze,Ft,be,fn.width,fn.height,0,we,xe,fn.data)}}}else{if(vt=I.mipmaps,je&&ht){vt.length>0&&st++;const ze=at(pe[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,st,be,ze.width,ze.height)}for(let ze=0;ze<6;ze++)if(V){je?ye&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ze,0,0,0,pe[ze].width,pe[ze].height,we,xe,pe[ze].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ze,0,be,pe[ze].width,pe[ze].height,0,we,xe,pe[ze].data);for(let Ft=0;Ft<vt.length;Ft++){const Qn=vt[Ft].image[ze].image;je?ye&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ze,Ft+1,0,0,Qn.width,Qn.height,we,xe,Qn.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ze,Ft+1,be,Qn.width,Qn.height,0,we,xe,Qn.data)}}else{je?ye&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ze,0,0,0,we,xe,pe[ze]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ze,0,be,we,xe,pe[ze]);for(let Ft=0;Ft<vt.length;Ft++){const fn=vt[Ft];je?ye&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ze,Ft+1,0,0,we,xe,fn.image[ze]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ze,Ft+1,be,we,xe,fn.image[ze])}}}b(I)&&I.mipmapsAutoUpdate===!0&&T(r.TEXTURE_CUBE_MAP),re.__version=U.version,I.onUpdate&&I.onUpdate(I)}F.__version=I.version}function Ne(F,I,ie,ve,U,re){const fe=s.convert(ie.format,ie.colorSpace),se=s.convert(ie.type),ce=R(ie.internalFormat,fe,se,ie.normalized,ie.colorSpace),Ee=n.get(I),V=n.get(ie);if(V.__renderTarget=I,!Ee.__hasExternalTextures){const pe=Math.max(1,I.width>>re),ue=Math.max(1,I.height>>re);U===r.TEXTURE_3D||U===r.TEXTURE_2D_ARRAY?t.texImage3D(U,re,ce,pe,ue,I.depth,0,fe,se,null):t.texImage2D(U,re,ce,pe,ue,0,fe,se,null)}t.bindFramebuffer(r.FRAMEBUFFER,F),Le(I)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ve,U,V.__webglTexture,0,Ht(I)):(U===r.TEXTURE_2D||U>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&U<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ve,U,V.__webglTexture,re),t.bindFramebuffer(r.FRAMEBUFFER,null)}function pt(F,I,ie){if(r.bindRenderbuffer(r.RENDERBUFFER,F),I.depthBuffer){const ve=I.depthTexture,U=ve&&ve.isDepthTexture?ve.type:null,re=E(I.stencilBuffer,U),fe=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;Le(I)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ht(I),re,I.width,I.height):ie?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ht(I),re,I.width,I.height):r.renderbufferStorage(r.RENDERBUFFER,re,I.width,I.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,fe,r.RENDERBUFFER,F)}else{const ve=I.textures;for(let U=0;U<ve.length;U++){const re=ve[U],fe=s.convert(re.format,re.colorSpace),se=s.convert(re.type),ce=R(re.internalFormat,fe,se,re.normalized,re.colorSpace);Le(I)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ht(I),ce,I.width,I.height):ie?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ht(I),ce,I.width,I.height):r.renderbufferStorage(r.RENDERBUFFER,ce,I.width,I.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Ze(F,I,ie){const ve=I.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(r.FRAMEBUFFER,F),!(I.depthTexture&&I.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const U=n.get(I.depthTexture);U.__renderTarget=I;const re=ve?I.depthTexture.image[0]:I.depthTexture.image;(!U.__webglTexture||re.width!==I.width||re.height!==I.height)&&(re.width=I.width,re.height=I.height,I.depthTexture.needsUpdate=!0),ve?Ue(I.depthTexture,0):Me(I.depthTexture,0);const fe=U.__webglTexture,se=Ht(I),ce=ve?r.TEXTURE_CUBE_MAP_POSITIVE_X+ie:r.TEXTURE_2D,Ee=I.depthTexture.format===Pr?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(I.depthTexture.format===Dr)Le(I)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Ee,ce,fe,0,se):r.framebufferTexture2D(r.FRAMEBUFFER,Ee,ce,fe,0);else if(I.depthTexture.format===Pr)Le(I)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Ee,ce,fe,0,se):r.framebufferTexture2D(r.FRAMEBUFFER,Ee,ce,fe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Et(F){const I=n.get(F),ie=F.isWebGLCubeRenderTarget===!0;if(I.__boundDepthTexture!==F.depthTexture){const ve=F.depthTexture;if(I.__depthDisposeCallback&&I.__depthDisposeCallback(),ve){const U=()=>{delete I.__boundDepthTexture,delete I.__depthDisposeCallback,ve.removeEventListener("dispose",U)};ve.addEventListener("dispose",U),I.__depthDisposeCallback=U}I.__boundDepthTexture=ve}if(F.depthTexture&&!I.__autoAllocateDepthBuffer)if(ie)for(let ve=0;ve<6;ve++)Ze(I.__webglFramebuffer[ve],F,ve);else F.texture.mipmaps.length>0?Ze(I.__webglFramebuffer[0],F,0):Ze(I.__webglFramebuffer,F,0);else if(ie){I.__webglDepthbuffer=[];for(let ve=0;ve<6;ve++)if(t.bindFramebuffer(r.FRAMEBUFFER,I.__webglFramebuffer[ve]),I.__webglDepthbuffer[ve]===void 0)I.__webglDepthbuffer[ve]=r.createRenderbuffer(),pt(I.__webglDepthbuffer[ve],F,!1);else{const U=F.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,re=I.__webglDepthbuffer[ve];r.bindRenderbuffer(r.RENDERBUFFER,re),r.framebufferRenderbuffer(r.FRAMEBUFFER,U,r.RENDERBUFFER,re)}}else if(F.texture.mipmaps.length>0?t.bindFramebuffer(r.FRAMEBUFFER,I.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,I.__webglFramebuffer),I.__webglDepthbuffer===void 0)I.__webglDepthbuffer=r.createRenderbuffer(),pt(I.__webglDepthbuffer,F,!1);else{const U=F.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,re=I.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,re),r.framebufferRenderbuffer(r.FRAMEBUFFER,U,r.RENDERBUFFER,re)}t.bindFramebuffer(r.FRAMEBUFFER,null)}function bt(F,I,ie){const ve=n.get(F);I!==void 0&&Ne(ve.__webglFramebuffer,F,F.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),ie!==void 0&&Et(F)}function It(F){const I=F.texture,ie=n.get(F),ve=n.get(I);F.addEventListener("dispose",Y),B(F);const U=F.textures,re=F.isWebGLCubeRenderTarget===!0,fe=U.length>1;if(fe||(ve.__webglTexture===void 0&&(ve.__webglTexture=r.createTexture()),ve.__version=I.version,o.memory.textures++),re){ie.__webglFramebuffer=[];for(let se=0;se<6;se++)if(I.mipmaps.length>0){ie.__webglFramebuffer[se]=[];for(let ce=0;ce<I.mipmaps.length;ce++)ie.__webglFramebuffer[se][ce]=r.createFramebuffer()}else ie.__webglFramebuffer[se]=r.createFramebuffer()}else{if(I.mipmaps.length>0){ie.__webglFramebuffer=[];for(let se=0;se<I.mipmaps.length;se++)ie.__webglFramebuffer[se]=r.createFramebuffer()}else ie.__webglFramebuffer=r.createFramebuffer();if(fe)for(let se=0,ce=U.length;se<ce;se++){const Ee=n.get(U[se]);Ee.__webglTexture===void 0&&(Ee.__webglTexture=r.createTexture(),o.memory.textures++)}if(F.samples>0&&Le(F)===!1){ie.__webglMultisampledFramebuffer=r.createFramebuffer(),ie.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,ie.__webglMultisampledFramebuffer);for(let se=0;se<U.length;se++){const ce=U[se];ie.__webglColorRenderbuffer[se]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,ie.__webglColorRenderbuffer[se]);const Ee=s.convert(ce.format,ce.colorSpace),V=s.convert(ce.type),pe=R(ce.internalFormat,Ee,V,ce.normalized,ce.colorSpace,F.isXRRenderTarget===!0),ue=Ht(F);r.renderbufferStorageMultisample(r.RENDERBUFFER,ue,pe,F.width,F.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+se,r.RENDERBUFFER,ie.__webglColorRenderbuffer[se])}r.bindRenderbuffer(r.RENDERBUFFER,null),F.depthBuffer&&(ie.__webglDepthRenderbuffer=r.createRenderbuffer(),pt(ie.__webglDepthRenderbuffer,F,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(re){t.bindTexture(r.TEXTURE_CUBE_MAP,ve.__webglTexture),gt(r.TEXTURE_CUBE_MAP,I);for(let se=0;se<6;se++)if(I.mipmaps.length>0)for(let ce=0;ce<I.mipmaps.length;ce++)Ne(ie.__webglFramebuffer[se][ce],F,I,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+se,ce);else Ne(ie.__webglFramebuffer[se],F,I,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+se,0);b(I)?T(r.TEXTURE_CUBE_MAP):I.mipmaps.length>0&&r.texParameteri(r.TEXTURE_CUBE_MAP,r.TEXTURE_MAX_LEVEL,I.mipmaps.length-1),t.unbindTexture()}else if(fe){for(let se=0,ce=U.length;se<ce;se++){const Ee=U[se],V=n.get(Ee);let pe=r.TEXTURE_2D;(F.isWebGL3DRenderTarget||F.isWebGLArrayRenderTarget)&&(pe=F.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(pe,V.__webglTexture),gt(pe,Ee),Ne(ie.__webglFramebuffer,F,Ee,r.COLOR_ATTACHMENT0+se,pe,0),b(Ee)&&T(pe)}t.unbindTexture()}else{let se=r.TEXTURE_2D;if((F.isWebGL3DRenderTarget||F.isWebGLArrayRenderTarget)&&(se=F.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(se,ve.__webglTexture),gt(se,I),I.mipmaps.length>0)for(let ce=0;ce<I.mipmaps.length;ce++)Ne(ie.__webglFramebuffer[ce],F,I,r.COLOR_ATTACHMENT0,se,ce);else Ne(ie.__webglFramebuffer,F,I,r.COLOR_ATTACHMENT0,se,0);b(I)?T(se):I.mipmaps.length>0&&r.texParameteri(se,r.TEXTURE_MAX_LEVEL,I.mipmaps.length-1),t.unbindTexture()}F.depthBuffer&&Et(F)}function q(F){const I=F.textures;for(let ie=0,ve=I.length;ie<ve;ie++){const U=I[ie];if(b(U)&&U.mipmapsAutoUpdate===!0){const re=P(F),fe=n.get(U).__webglTexture;t.bindTexture(re,fe),T(re),t.unbindTexture()}}}const Kt=[];function St(F){if(F.samples>0){if(Le(F)===!1){const I=F.textures,ie=F.width,ve=F.height;let U=r.COLOR_BUFFER_BIT;const re=F.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,fe=n.get(F),se=I.length>1;if(se)for(let Ee=0;Ee<I.length;Ee++)t.bindFramebuffer(r.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ee,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,fe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ee,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,fe.__webglMultisampledFramebuffer),F.texture.mipmaps.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,fe.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,fe.__webglFramebuffer);for(let Ee=0;Ee<I.length;Ee++){if(F.resolveDepthBuffer&&(F.depthBuffer&&(U|=r.DEPTH_BUFFER_BIT),F.stencilBuffer&&F.resolveStencilBuffer&&(U|=r.STENCIL_BUFFER_BIT)),se){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,fe.__webglColorRenderbuffer[Ee]);const V=n.get(I[Ee]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,V,0)}r.blitFramebuffer(0,0,ie,ve,0,0,ie,ve,U,r.NEAREST),u===!0&&(Kt.length=0,Kt.push(r.COLOR_ATTACHMENT0+Ee),F.depthBuffer&&F.storeMultisampledDepthBuffer===!1&&Kt.push(re),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Kt))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),se)for(let Ee=0;Ee<I.length;Ee++){t.bindFramebuffer(r.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ee,r.RENDERBUFFER,fe.__webglColorRenderbuffer[Ee]);const V=n.get(I[Ee]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,fe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ee,r.TEXTURE_2D,V,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,fe.__webglMultisampledFramebuffer)}else if(F.depthBuffer&&F.storeMultisampledDepthBuffer===!1&&u){const I=F.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[I])}}}function Ht(F){return Math.min(i.maxSamples,F.samples)}function Le(F){const I=n.get(F);return F.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&I.__useRenderToTexture!==!1}function Zt(F){const I=o.render.frame;f.get(F)!==I&&(f.set(F,I),F.update())}function it(F,I){const ie=F.colorSpace,ve=F.format,U=F.type;return F.isCompressedTexture===!0||F.isVideoTexture===!0||ie!==rl&&ie!==Cr&&(Dt.getTransfer(ie)===Wt?(ve!==jn||U!==qn)&&Be("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):nt("WebGLTextures: Unsupported texture color space:",ie)),I}function at(F){return typeof HTMLImageElement<"u"&&F instanceof HTMLImageElement?(h.width=F.naturalWidth||F.width,h.height=F.naturalHeight||F.height):typeof VideoFrame<"u"&&F instanceof VideoFrame?(h.width=F.displayWidth,h.height=F.displayHeight):(h.width=F.width,h.height=F.height),h}this.allocateTextureUnit=Te,this.resetTextureUnits=W,this.getTextureUnits=J,this.setTextureUnits=_e,this.setTexture2D=Me,this.setTexture2DArray=Pe,this.setTexture3D=Ye,this.setTextureCube=Ue,this.rebindTextures=bt,this.setupRenderTarget=It,this.updateRenderTargetMipmap=q,this.updateMultisampleRenderTarget=St,this.setupDepthRenderbuffer=Et,this.setupFrameBufferTexture=Ne,this.useMultisampledRTT=Le,this.dispose=ne}function uy(r,e){function t(n,i=Cr){let s;const o=Dt.getTransfer(i);if(n===qn)return r.UNSIGNED_BYTE;if(n===Sh)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Mh)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Up)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Op)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===Np)return r.BYTE;if(n===Dp)return r.SHORT;if(n===Yo)return r.UNSIGNED_SHORT;if(n===yh)return r.INT;if(n===Pi)return r.UNSIGNED_INT;if(n===Zn)return r.FLOAT;if(n===Wi)return r.HALF_FLOAT;if(n===Fp)return r.ALPHA;if(n===Bp)return r.RGB;if(n===jn)return r.RGBA;if(n===Dr)return r.DEPTH_COMPONENT;if(n===Pr)return r.DEPTH_STENCIL;if(n===wh)return r.RED;if(n===_l)return r.RED_INTEGER;if(n===es)return r.RG;if(n===Eh)return r.RG_INTEGER;if(n===bh)return r.RGBA_INTEGER;if(n===Xa||n===Ya||n===qa||n===Za)if(o===Wt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Xa)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ya)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===qa)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Za)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Xa)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ya)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===qa)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Za)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Nu||n===Du||n===Uu||n===Ou)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Nu)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Du)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Uu)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ou)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Fu||n===Bu||n===zu||n===ku||n===Hu||n===el||n===Vu)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Fu||n===Bu)return o===Wt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===zu)return o===Wt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===ku)return s.COMPRESSED_R11_EAC;if(n===Hu)return s.COMPRESSED_SIGNED_R11_EAC;if(n===el)return s.COMPRESSED_RG11_EAC;if(n===Vu)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Gu||n===Wu||n===Xu||n===Yu||n===qu||n===Zu||n===ju||n===Ju||n===Ku||n===Qu||n===$u||n===eh||n===th||n===nh)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Gu)return o===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Wu)return o===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Xu)return o===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Yu)return o===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===qu)return o===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Zu)return o===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ju)return o===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ju)return o===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ku)return o===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Qu)return o===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===$u)return o===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===eh)return o===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===th)return o===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===nh)return o===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ih||n===rh||n===sh)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===ih)return o===Wt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===rh)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===sh)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===oh||n===ah||n===tl||n===lh)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===oh)return s.COMPRESSED_RED_RGTC1_EXT;if(n===ah)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===tl)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===lh)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Bs?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const $C=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,eR=`
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

}`;class tR{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Qp(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new fr({vertexShader:$C,fragmentShader:eR,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Sn(new $o(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class nR extends Yi{constructor(e,t){super();const n=this;let i=null,s=1,o=null,c="local-floor",u=1,h=null,f=null,p=null,m=null,g=null,v=null;const M=typeof XRWebGLBinding<"u",y=new tR,x={},w=t.getContextAttributes();let b=null,T=null;const P=[],R=[],E=new me;let C=null,B=null;const N=new _n;N.viewport=new Ot;const D=new _n;D.viewport=new Ot;const Y=[N,D],K=new Wx;let H=null,ne=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ae){let Me=P[ae];return Me===void 0&&(Me=new wu,P[ae]=Me),Me.getTargetRaySpace()},this.getControllerGrip=function(ae){let Me=P[ae];return Me===void 0&&(Me=new wu,P[ae]=Me),Me.getGripSpace()},this.getHand=function(ae){let Me=P[ae];return Me===void 0&&(Me=new wu,P[ae]=Me),Me.getHandSpace()};function oe(ae){const Me=R.indexOf(ae.inputSource);if(Me===-1)return;const Pe=P[Me];Pe!==void 0&&(Pe.update(ae.inputSource,ae.frame,h||o),Pe.dispatchEvent({type:ae.type,data:ae.inputSource}))}function te(){i.removeEventListener("select",oe),i.removeEventListener("selectstart",oe),i.removeEventListener("selectend",oe),i.removeEventListener("squeeze",oe),i.removeEventListener("squeezestart",oe),i.removeEventListener("squeezeend",oe),i.removeEventListener("end",te),i.removeEventListener("inputsourceschange",k);for(let ae=0;ae<P.length;ae++){const Me=R[ae];Me!==null&&(R[ae]=null,P[ae].disconnect(Me))}H=null,ne=null,y.reset();for(const ae in x)delete x[ae];if(e.setRenderTarget(b),g=null,m=null,p=null,i=null,T=null,Te.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(E.width,E.height,!1),B!==null){const ae=B.camera;ae.fov=B.fov,ae.zoom=B.zoom,ae.updateProjectionMatrix(),B=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ae){s=ae,n.isPresenting===!0&&Be("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ae){c=ae,n.isPresenting===!0&&Be("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||o},this.setReferenceSpace=function(ae){h=ae},this.getBaseLayer=function(){return m!==null?m:g},this.getBinding=function(){return p===null&&M&&(p=new XRWebGLBinding(i,t)),p},this.getFrame=function(){return v},this.getSession=function(){return i},this.setSession=async function(ae){if(i=ae,i!==null){if(b=e.getRenderTarget(),i.addEventListener("select",oe),i.addEventListener("selectstart",oe),i.addEventListener("selectend",oe),i.addEventListener("squeeze",oe),i.addEventListener("squeezestart",oe),i.addEventListener("squeezeend",oe),i.addEventListener("end",te),i.addEventListener("inputsourceschange",k),w.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(E),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let Pe=null,Ye=null,Ue=null;w.depth&&(Ue=w.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Pe=w.stencil?Pr:Dr,Ye=w.stencil?Bs:Pi);const et={colorFormat:t.RGBA8,depthFormat:Ue,scaleFactor:s};p=this.getBinding(),m=p.createProjectionLayer(et),i.updateRenderState({layers:[m]}),e.setPixelRatio(1),e.setSize(m.textureWidth,m.textureHeight,!1),T=new vi(m.textureWidth,m.textureHeight,{format:jn,type:qn,depthTexture:new Hs(m.textureWidth,m.textureHeight,Ye,void 0,void 0,void 0,void 0,void 0,void 0,Pe),stencilBuffer:w.stencil,colorSpace:e.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}else{const Pe={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:s};g=new XRWebGLLayer(i,t,Pe),i.updateRenderState({baseLayer:g}),e.setPixelRatio(1),e.setSize(g.framebufferWidth,g.framebufferHeight,!1),T=new vi(g.framebufferWidth,g.framebufferHeight,{format:jn,type:qn,colorSpace:e.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1,storeMultisampledDepthBuffer:g.ignoreDepthValues===!1,storeMultisampledStencilBuffer:g.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(u),h=null,o=await i.requestReferenceSpace(c),Te.setContext(i),Te.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function k(ae){for(let Me=0;Me<ae.removed.length;Me++){const Pe=ae.removed[Me],Ye=R.indexOf(Pe);Ye>=0&&(R[Ye]=null,P[Ye].disconnect(Pe))}for(let Me=0;Me<ae.added.length;Me++){const Pe=ae.added[Me];let Ye=R.indexOf(Pe);if(Ye===-1){for(let et=0;et<P.length;et++)if(et>=R.length){R.push(Pe),Ye=et;break}else if(R[et]===null){R[et]=Pe,Ye=et;break}if(Ye===-1)break}const Ue=P[Ye];Ue&&Ue.connect(Pe)}}function G(ae,Me){Me===null?ae.matrixWorld.copy(ae.matrix):ae.matrixWorld.multiplyMatrices(Me.matrixWorld,ae.matrix),ae.matrixWorldInverse.copy(ae.matrixWorld).invert()}this.updateCamera=function(ae){if(i===null)return;let Me=ae.near,Pe=ae.far;y.texture!==null&&(y.depthNear>0&&(Me=y.depthNear),y.depthFar>0&&(Pe=y.depthFar)),K.near=D.near=N.near=Me,K.far=D.far=N.far=Pe,(H!==K.near||ne!==K.far)&&(i.updateRenderState({depthNear:K.near,depthFar:K.far}),H=K.near,ne=K.far),K.layers.mask=ae.layers.mask|6,N.layers.mask=K.layers.mask&-5,D.layers.mask=K.layers.mask&-3;const Ye=ae.parent,Ue=K.cameras;G(K,Ye);for(let et=0;et<Ue.length;et++)G(Ue[et],Ye);K.projectionMatrix.copy(N.projectionMatrix),K.projectionMatrixInverse.copy(N.projectionMatrixInverse),B===null&&ae.isPerspectiveCamera&&(B={camera:ae,fov:ae.fov,zoom:ae.zoom}),W(ae,K,Ye)};function W(ae,Me,Pe){Pe===null?ae.matrix.copy(Me.matrixWorld):(ae.matrix.copy(Pe.matrixWorld),ae.matrix.invert(),ae.matrix.multiply(Me.matrixWorld)),ae.matrix.decompose(ae.position,ae.quaternion,ae.scale),ae.updateMatrixWorld(!0),ae.projectionMatrix.copy(Me.projectionMatrix),ae.projectionMatrixInverse.copy(Me.projectionMatrixInverse),ae.isPerspectiveCamera&&(ae.fov=qo*2*Math.atan(1/ae.projectionMatrix.elements[5]),ae.zoom=1)}this.getCamera=function(){return K},this.getFoveation=function(){if(!(m===null&&g===null))return u},this.setFoveation=function(ae){u=ae,m!==null&&(m.fixedFoveation=ae),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=ae)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(K)},this.getCameraTexture=function(ae){return x[ae]};let J=null;function _e(ae,Me){if(f=Me.getViewerPose(h||o),v=Me,f!==null){const Pe=f.views;g!==null&&(e.setRenderTargetFramebuffer(T,g.framebuffer),e.setRenderTarget(T));let Ye=!1;Pe.length!==K.cameras.length&&(K.cameras.length=0,Ye=!0);for(let Ke=0;Ke<Pe.length;Ke++){const gt=Pe[Ke];let ot=null;if(g!==null)ot=g.getViewport(gt);else{const Ie=p.getViewSubImage(m,gt);ot=Ie.viewport,Ke===0&&(e.setRenderTargetTextures(T,Ie.colorTexture,Ie.depthStencilTexture),e.setRenderTarget(T))}let ge=Y[Ke];ge===void 0&&(ge=new _n,ge.layers.enable(Ke),ge.viewport=new Ot,Y[Ke]=ge),ge.matrix.fromArray(gt.transform.matrix),ge.matrix.decompose(ge.position,ge.quaternion,ge.scale),ge.projectionMatrix.fromArray(gt.projectionMatrix),ge.projectionMatrixInverse.copy(ge.projectionMatrix).invert(),ge.viewport.set(ot.x,ot.y,ot.width,ot.height),Ke===0&&(K.matrix.copy(ge.matrix),K.matrix.decompose(K.position,K.quaternion,K.scale)),Ye===!0&&K.cameras.push(ge)}const Ue=i.enabledFeatures;if(Ue&&Ue.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&M){p=n.getBinding();const Ke=p.getDepthInformation(Pe[0]);Ke&&Ke.isValid&&Ke.texture&&y.init(Ke,i.renderState)}if(Ue&&Ue.includes("camera-access")&&M){e.state.unbindTexture(),p=n.getBinding();for(let Ke=0;Ke<Pe.length;Ke++){const gt=Pe[Ke].camera;if(gt){let ot=x[gt];ot||(ot=new Qp,x[gt]=ot);const ge=p.getCameraImage(gt);ot.sourceTexture=ge}}}}for(let Pe=0;Pe<P.length;Pe++){const Ye=R[Pe],Ue=P[Pe];Ye!==null&&Ue!==void 0&&Ue.update(Ye,Me,h||o)}J&&J(ae,Me),Me.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Me}),v=null}const Te=new ey;Te.setAnimationLoop(_e),this.setAnimationLoop=function(ae){J=ae},this.dispose=function(){}}}const iR=new mt,hy=new _t;hy.set(-1,0,0,0,1,0,0,0,1);function rR(r,e){function t(y,x){y.matrixAutoUpdate===!0&&y.updateMatrix(),x.value.copy(y.matrix)}function n(y,x){x.color.getRGB(y.fogColor.value,yx(r)),x.isFog?(y.fogNear.value=x.near,y.fogFar.value=x.far):x.isFogExp2&&(y.fogDensity.value=x.density)}function i(y,x,w,b,T){x.isNodeMaterial?x.uniformsNeedUpdate=!1:x.isMeshBasicMaterial?s(y,x):x.isMeshLambertMaterial?(s(y,x),x.envMap&&(y.envMapIntensity.value=x.envMapIntensity)):x.isMeshToonMaterial?(s(y,x),p(y,x)):x.isMeshPhongMaterial?(s(y,x),f(y,x),x.envMap&&(y.envMapIntensity.value=x.envMapIntensity)):x.isMeshStandardMaterial?(s(y,x),m(y,x),x.isMeshPhysicalMaterial&&g(y,x,T)):x.isMeshMatcapMaterial?(s(y,x),v(y,x)):x.isMeshDepthMaterial?s(y,x):x.isMeshDistanceMaterial?(s(y,x),M(y,x)):x.isMeshNormalMaterial?s(y,x):x.isLineBasicMaterial?(o(y,x),x.isLineDashedMaterial&&c(y,x)):x.isPointsMaterial?u(y,x,w,b):x.isSpriteMaterial?h(y,x):x.isShadowMaterial?(y.color.value.copy(x.color),y.opacity.value=x.opacity):x.isShaderMaterial&&(x.uniformsNeedUpdate=!1)}function s(y,x){y.opacity.value=x.opacity,x.color&&y.diffuse.value.copy(x.color),x.emissive&&y.emissive.value.copy(x.emissive).multiplyScalar(x.emissiveIntensity),x.map&&(y.map.value=x.map,t(x.map,y.mapTransform)),x.alphaMap&&(y.alphaMap.value=x.alphaMap,t(x.alphaMap,y.alphaMapTransform)),x.bumpMap&&(y.bumpMap.value=x.bumpMap,t(x.bumpMap,y.bumpMapTransform),y.bumpScale.value=x.bumpScale,x.side===Jn&&(y.bumpScale.value*=-1)),x.normalMap&&(y.normalMap.value=x.normalMap,t(x.normalMap,y.normalMapTransform),y.normalScale.value.copy(x.normalScale),x.side===Jn&&y.normalScale.value.negate()),x.displacementMap&&(y.displacementMap.value=x.displacementMap,t(x.displacementMap,y.displacementMapTransform),y.displacementScale.value=x.displacementScale,y.displacementBias.value=x.displacementBias),x.emissiveMap&&(y.emissiveMap.value=x.emissiveMap,t(x.emissiveMap,y.emissiveMapTransform)),x.specularMap&&(y.specularMap.value=x.specularMap,t(x.specularMap,y.specularMapTransform)),x.alphaTest>0&&(y.alphaTest.value=x.alphaTest);const w=e.get(x),b=w.envMap,T=w.envMapRotation;b&&(y.envMap.value=b,y.envMapRotation.value.setFromMatrix4(iR.makeRotationFromEuler(T)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&y.envMapRotation.value.premultiply(hy),y.reflectivity.value=x.reflectivity,y.ior.value=x.ior,y.refractionRatio.value=x.refractionRatio),x.lightMap&&(y.lightMap.value=x.lightMap,y.lightMapIntensity.value=x.lightMapIntensity,t(x.lightMap,y.lightMapTransform)),x.aoMap&&(y.aoMap.value=x.aoMap,y.aoMapIntensity.value=x.aoMapIntensity,t(x.aoMap,y.aoMapTransform))}function o(y,x){y.diffuse.value.copy(x.color),y.opacity.value=x.opacity,x.map&&(y.map.value=x.map,t(x.map,y.mapTransform))}function c(y,x){y.dashSize.value=x.dashSize,y.totalSize.value=x.dashSize+x.gapSize,y.scale.value=x.scale}function u(y,x,w,b){y.diffuse.value.copy(x.color),y.opacity.value=x.opacity,y.size.value=x.size*w,y.scale.value=b*.5,x.map&&(y.map.value=x.map,t(x.map,y.uvTransform)),x.alphaMap&&(y.alphaMap.value=x.alphaMap,t(x.alphaMap,y.alphaMapTransform)),x.alphaTest>0&&(y.alphaTest.value=x.alphaTest)}function h(y,x){y.diffuse.value.copy(x.color),y.opacity.value=x.opacity,y.rotation.value=x.rotation,x.map&&(y.map.value=x.map,t(x.map,y.mapTransform)),x.alphaMap&&(y.alphaMap.value=x.alphaMap,t(x.alphaMap,y.alphaMapTransform)),x.alphaTest>0&&(y.alphaTest.value=x.alphaTest)}function f(y,x){y.specular.value.copy(x.specular),y.shininess.value=Math.max(x.shininess,1e-4)}function p(y,x){x.gradientMap&&(y.gradientMap.value=x.gradientMap)}function m(y,x){y.metalness.value=x.metalness,x.metalnessMap&&(y.metalnessMap.value=x.metalnessMap,t(x.metalnessMap,y.metalnessMapTransform)),y.roughness.value=x.roughness,x.roughnessMap&&(y.roughnessMap.value=x.roughnessMap,t(x.roughnessMap,y.roughnessMapTransform)),x.envMap&&(y.envMapIntensity.value=x.envMapIntensity)}function g(y,x,w){y.ior.value=x.ior,x.diffuseRoughness>0&&(y.diffuseRoughness.value=x.diffuseRoughness,x.diffuseRoughnessMap&&(y.diffuseRoughnessMap.value=x.diffuseRoughnessMap,t(x.diffuseRoughnessMap,y.diffuseRoughnessMapTransform))),x.sheen>0&&(y.sheenColor.value.copy(x.sheenColor).multiplyScalar(x.sheen),y.sheenRoughness.value=x.sheenRoughness,x.sheenColorMap&&(y.sheenColorMap.value=x.sheenColorMap,t(x.sheenColorMap,y.sheenColorMapTransform)),x.sheenRoughnessMap&&(y.sheenRoughnessMap.value=x.sheenRoughnessMap,t(x.sheenRoughnessMap,y.sheenRoughnessMapTransform))),x.clearcoat>0&&(y.clearcoat.value=x.clearcoat,y.clearcoatRoughness.value=x.clearcoatRoughness,x.clearcoatMap&&(y.clearcoatMap.value=x.clearcoatMap,t(x.clearcoatMap,y.clearcoatMapTransform)),x.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=x.clearcoatRoughnessMap,t(x.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),x.clearcoatNormalMap&&(y.clearcoatNormalMap.value=x.clearcoatNormalMap,t(x.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(x.clearcoatNormalScale),x.side===Jn&&y.clearcoatNormalScale.value.negate())),x.dispersion>0&&(y.dispersion.value=x.dispersion),x.retroreflectivity>0&&(y.retroreflectivity.value=x.retroreflectivity),x.iridescence>0&&(y.iridescence.value=x.iridescence,y.iridescenceIOR.value=x.iridescenceIOR,y.iridescenceThicknessMinimum.value=x.iridescenceThicknessMinimum,y.iridescenceThicknessMaximum.value=x.iridescenceThicknessMaximum,x.iridescenceMap&&(y.iridescenceMap.value=x.iridescenceMap,t(x.iridescenceMap,y.iridescenceMapTransform)),x.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=x.iridescenceThicknessMap,t(x.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),x.transmission>0&&(y.transmission.value=x.transmission,y.transmissionSamplerMap.value=w.texture,y.transmissionSamplerSize.value.set(w.width,w.height),x.transmissionMap&&(y.transmissionMap.value=x.transmissionMap,t(x.transmissionMap,y.transmissionMapTransform)),y.thickness.value=x.thickness,x.thicknessMap&&(y.thicknessMap.value=x.thicknessMap,t(x.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=x.attenuationDistance,y.attenuationColor.value.copy(x.attenuationColor)),x.anisotropy>0&&(y.anisotropyVector.value.set(x.anisotropy*Math.cos(x.anisotropyRotation),x.anisotropy*Math.sin(x.anisotropyRotation)),x.anisotropyMap&&(y.anisotropyMap.value=x.anisotropyMap,t(x.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=x.specularIntensity,y.specularColor.value.copy(x.specularColor),x.specularColorMap&&(y.specularColorMap.value=x.specularColorMap,t(x.specularColorMap,y.specularColorMapTransform)),x.specularIntensityMap&&(y.specularIntensityMap.value=x.specularIntensityMap,t(x.specularIntensityMap,y.specularIntensityMapTransform))}function v(y,x){x.matcap&&(y.matcap.value=x.matcap)}function M(y,x){const w=e.get(x).light;y.referencePosition.value.setFromMatrixPosition(w.matrixWorld),y.nearDistance.value=w.shadow.camera.near,y.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function sR(r,e,t,n){let i={},s={};function o(w,b){const T=b.program;n.uniformBlockBinding(w,T,i[w.id])}function c(w,b){let T=i[w.id];T===void 0&&(v(w),T=u(w),i[w.id]=T,w.addEventListener("dispose",y));const P=b.program;n.updateUBOMapping(w,P);const R=e.render.frame;s[w.id]!==R&&(h(w),s[w.id]=R)}function u(w){const b=r.createBuffer(),T=w.__size,P=w.usage;return r.bindBuffer(r.UNIFORM_BUFFER,b),r.bufferData(r.UNIFORM_BUFFER,T,P),r.bindBuffer(r.UNIFORM_BUFFER,null),b}function h(w){const b=i[w.id],T=w.uniforms,P=w.__cache;r.bindBuffer(r.UNIFORM_BUFFER,b);for(let R=0,E=T.length;R<E;R++){const C=T[R];if(Array.isArray(C))for(let B=0,N=C.length;B<N;B++)f(C[B],R,B,P);else f(C,R,0,P)}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(w,b,T,P){if(m(w,b,T,P)===!0){const R=w.__offset,E=w.value;if(Array.isArray(E)){let C=0;for(let B=0;B<E.length;B++){const N=E[B],D=M(N,!0);p(N,w.__data,C),C+=D.storage/Float32Array.BYTES_PER_ELEMENT}}else p(E,w.__data,0);r.bufferSubData(r.UNIFORM_BUFFER,R,w.__data)}}function p(w,b,T){typeof w=="number"||typeof w=="boolean"?b[T]=w:w.isMatrix3?(b[T]=w.elements[0],b[T+1]=w.elements[1],b[T+2]=w.elements[2],b[T+3]=0,b[T+4]=w.elements[3],b[T+5]=w.elements[4],b[T+6]=w.elements[5],b[T+7]=0,b[T+8]=w.elements[6],b[T+9]=w.elements[7],b[T+10]=w.elements[8],b[T+11]=0):ArrayBuffer.isView(w)?b.set(w.subarray(0,b.length-T),T):w.toArray(b,T)}function m(w,b,T,P){const R=w.value,E=b+"_"+T;if(Array.isArray(R)){P[E]===void 0&&(P[E]=[]);const C=P[E];let B=!1;for(let N=0;N<R.length;N++)g(R[N],C,N)===!0&&(B=!0);return B}return g(R,P,E)}function g(w,b,T){if(b[T]===void 0)return typeof w=="number"||typeof w=="boolean"?b[T]=w:ArrayBuffer.isView(w)?b[T]=w.slice():b[T]=w.clone(),!0;{const P=b[T];if(typeof w=="number"||typeof w=="boolean"){if(P!==w)return b[T]=w,!0}else{if(ArrayBuffer.isView(w))return!0;if(P.equals(w)===!1)return P.copy(w),!0}}return!1}function v(w){const b=w.uniforms;let T=0;const P=16;for(let E=0,C=b.length;E<C;E++){const B=Array.isArray(b[E])?b[E]:[b[E]];for(let N=0,D=B.length;N<D;N++){const Y=B[N],K=Array.isArray(Y.value)?Y.value:[Y.value],H=Array.isArray(b[E])||Array.isArray(Y.value);let ne=T;for(let te=0,k=K.length;te<k;te++){const G=K[te],W=M(G,H),J=T%P,_e=J%W.boundary,Te=J+_e;T+=_e,Te!==0&&P-Te<W.storage&&(T+=P-Te),te===0&&(ne=T),T+=W.storage}const oe=Y.type==="int"?Int32Array:Y.type==="uint"?Uint32Array:Float32Array;Y.__data=new oe((T-ne)/Float32Array.BYTES_PER_ELEMENT),Y.__offset=ne}}const R=T%P;return R>0&&(T+=P-R),w.__size=T,w.__cache={},this}function M(w,b){const T={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(T.boundary=4,T.storage=4):w.isVector2?(T.boundary=8,T.storage=8):w.isVector3||w.isColor?(T.boundary=16,T.storage=12):w.isVector4?(T.boundary=16,T.storage=16):w.isMatrix3?(T.boundary=16,T.storage=48):w.isMatrix4?(T.boundary=16,T.storage=64):w.isTexture?Be("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(w)?(T.boundary=16,T.storage=w.byteLength):Be("WebGLRenderer: Unsupported uniform value type.",w),b===!0&&(T.boundary=16,T.storage=Math.ceil(T.storage/16)*16),T}function y(w){const b=w.target;b.removeEventListener("dispose",y),r.deleteBuffer(i[b.id]),delete i[b.id],delete s[b.id]}function x(){for(const w in i)r.deleteBuffer(i[w]);i={},s={}}return{bind:o,update:c,dispose:x}}const oR=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let rr=null;function aR(){return rr===null&&(rr=new Ri(oR,16,16,es,Wi),rr.name="DFG_LUT",rr.minFilter=rn,rr.magFilter=rn,rr.wrapS=oi,rr.wrapT=oi,rr.generateMipmaps=!1,rr.needsUpdate=!0),rr}class fy{constructor(e={}){const{canvas:t=Zv(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:c=!1,premultipliedAlpha:u=!0,preserveDrawingBuffer:h=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:m=!1,outputBufferType:g=qn}=e;this.isWebGLRenderer=!0;let v;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");v=n.getContextAttributes().alpha}else v=o;const M=g,y=new Set([bh,Eh,_l]),x=new Set([qn,Pi,Yo,Bs,Sh,Mh]),w=new Uint32Array(4),b=new Int32Array(4),T={textures:[],min:[],max:[],resolution:[]};let P=null,R=null;const E=[],C=[];let B=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Gi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const N=this;let D=!1,Y=null,K=null,H=null,ne=null;this._outputColorSpace=ri;let oe=0,te=0,k=null,G=-1,W=null;const J=new Ot,_e=new Ot;let Te=null;const ae=new Xe(0);let Me=0,Pe=t.width,Ye=t.height,Ue=1,et=null,kt=null;const Ke=new Ot(0,0,Pe,Ye),gt=new Ot(0,0,Pe,Ye);let ot=!1;const ge=new ks,Ie=new vl;let Ce=!1,Ge=!1;const Ne=new mt,pt=new O,Ze=new Ot,Et={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let bt=!1;function It(){return k===null?Ue:1}let q=n;function Kt(L,X){return t.getContext(L,X)}let St,Ht,Le,Zt,it,at,F,I,ie,ve,U,re,fe,se,ce,Ee,V,pe,ue,we,xe,be,je;try{const L={alpha:!0,depth:i,stencil:s,antialias:c,premultipliedAlpha:u,preserveDrawingBuffer:h,powerPreference:f,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ml}`),t.addEventListener("webglcontextlost",st,!1),t.addEventListener("webglcontextrestored",vt,!1),t.addEventListener("webglcontextcreationerror",ze,!1),q===null){const X="webgl2";if(q=Kt(X,L),q===null)throw Kt(X)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ht()}catch(L){throw t.removeEventListener("webglcontextlost",st,!1),t.removeEventListener("webglcontextrestored",vt,!1),t.removeEventListener("webglcontextcreationerror",ze,!1),nt("WebGLRenderer: "+L.message),L}function ht(){St=new fA(q),St.init(),xe=new uy(q,St),Ht=new tA(q,St,e,xe),Le=new KC(q,St),Ht.reversedDepthBuffer&&m&&Le.buffers.depth.setReversed(!0),K=q.createFramebuffer(),H=q.createFramebuffer(),ne=q.createFramebuffer(),Zt=new mA(q),it=new FC,at=new QC(q,St,Le,it,Ht,xe,Zt),F=new hA(N),I=new _1(q),be=new $T(q,I),ie=new dA(q,I,Zt,be),ve=new _A(q,ie,I,be,Zt),pe=new gA(q,Ht,at),ce=new nA(it),U=new OC(N,F,St,Ht,be,ce),re=new rR(N,it),fe=new zC,se=new XC(St),V=new QT(N,F,Le,ve,v,u),Ee=new JC(N,ve,Ht),je=new sR(q,Zt,Ht,Le),ue=new eA(q,St,Zt),we=new pA(q,St,Zt),Zt.programs=U.programs,N.capabilities=Ht,N.extensions=St,N.properties=it,N.renderLists=fe,N.shadowMap=Ee,N.state=Le,N.info=Zt}M!==qn&&(B=new xA(M,t.width,t.height,c,i,s));const ye=new nR(N,q);this.xr=ye,this.getContext=function(){return q},this.getContextAttributes=function(){return q.getContextAttributes()},this.forceContextLoss=function(){const L=St.get("WEBGL_lose_context");L&&L.loseContext()},this.forceContextRestore=function(){const L=St.get("WEBGL_lose_context");L&&L.restoreContext()},this.getPixelRatio=function(){return Ue},this.setPixelRatio=function(L){L!==void 0&&(Ue=L,this.setSize(Pe,Ye,!1))},this.getSize=function(L){return L.set(Pe,Ye)},this.setSize=function(L,X,$=!0){if(ye.isPresenting){Be("WebGLRenderer: Can't change size while VR device is presenting.");return}Pe=L,Ye=X,t.width=Math.floor(L*Ue),t.height=Math.floor(X*Ue),$===!0&&(t.style.width=L+"px",t.style.height=X+"px"),B!==null&&B.setSize(t.width,t.height),this.setViewport(0,0,L,X)},this.getDrawingBufferSize=function(L){return L.set(Pe*Ue,Ye*Ue).floor()},this.setDrawingBufferSize=function(L,X,$){Pe=L,Ye=X,Ue=$,t.width=Math.floor(L*$),t.height=Math.floor(X*$),this.setViewport(0,0,L,X)},this.setEffects=function(L){if(M===qn){nt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(L){for(let X=0;X<L.length;X++)if(L[X].isOutputPass===!0){Be("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}B.setEffects(L||[])},this.getCurrentViewport=function(L){return L.copy(J)},this.getViewport=function(L){return L.copy(Ke)},this.setViewport=function(L,X,$,Z){L.isVector4?Ke.set(L.x,L.y,L.z,L.w):Ke.set(L,X,$,Z),Le.viewport(J.copy(Ke).multiplyScalar(It()).round())},this.getScissor=function(L){return L.copy(gt)},this.setScissor=function(L,X,$,Z){L.isVector4?gt.set(L.x,L.y,L.z,L.w):gt.set(L,X,$,Z),Le.scissor(_e.copy(gt).multiplyScalar(It()).round())},this.getScissorTest=function(){return ot},this.setScissorTest=function(L){Le.setScissorTest(ot=L)},this.setOpaqueSort=function(L){et=L},this.setTransparentSort=function(L){kt=L},this.getClearColor=function(L){return L.copy(V.getClearColor())},this.setClearColor=function(){V.setClearColor(...arguments)},this.getClearAlpha=function(){return V.getClearAlpha()},this.setClearAlpha=function(){V.setClearAlpha(...arguments)},this.clear=function(L=!0,X=!0,$=!0){let Z=0;if(L){let ee=!1;if(k!==null){const Se=k.texture.format;ee=y.has(Se)}if(ee){const Se=k.texture.type,Fe=x.has(Se),Ae=V.getClearColor(),Oe=V.getClearAlpha(),He=Ae.r,ft=Ae.g,Rt=Ae.b;Fe?(w[0]=He,w[1]=ft,w[2]=Rt,w[3]=Oe,q.clearBufferuiv(q.COLOR,0,w)):(b[0]=He,b[1]=ft,b[2]=Rt,b[3]=Oe,q.clearBufferiv(q.COLOR,0,b))}else Z|=q.COLOR_BUFFER_BIT}X&&(Z|=q.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(Z|=q.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Z!==0&&q.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(L){L.setRenderer(this),Y=L},this.dispose=function(){t.removeEventListener("webglcontextlost",st,!1),t.removeEventListener("webglcontextrestored",vt,!1),t.removeEventListener("webglcontextcreationerror",ze,!1),V.dispose(),fe.dispose(),se.dispose(),at.dispose(),it.dispose(),F.dispose(),ve.dispose(),ie.dispose(),be.dispose(),je.dispose(),U.dispose(),ye.dispose(),ye.removeEventListener("sessionstart",Rl),ye.removeEventListener("sessionend",Pl),pr.stop()};function st(L){L.preventDefault(),al("WebGLRenderer: Context Lost."),D=!0}function vt(){al("WebGLRenderer: Context Restored."),D=!1;const L=Zt.autoReset,X=Ee.enabled,$=Ee.autoUpdate,Z=Ee.needsUpdate,ee=Ee.type;ht(),Zt.autoReset=L,Ee.enabled=X,Ee.autoUpdate=$,Ee.needsUpdate=Z,Ee.type=ee}function ze(L){nt("WebGLRenderer: A WebGL context could not be created. Reason: ",L.statusMessage)}function Ft(L){const X=L.target;X.removeEventListener("dispose",Ft),fn(X)}function fn(L){Qn(L),it.remove(L)}function Qn(L){const X=it.get(L).programs;X!==void 0&&(X.forEach(function($){U.releaseProgram($)}),L.isShaderMaterial&&U.releaseShaderCache(L))}this.renderBufferDirect=function(L,X,$,Z,ee,Se){X===null&&(X=Et);const Fe=ee.isMesh&&ee.matrixWorld.determinantAffine()<0,Ae=sa(L,X,$,Z,ee);Le.setMaterial(Z,Fe);let Oe=$.index,He=1;if(Z.wireframe===!0){if(Oe=ie.getWireframeAttribute($),Oe===void 0)return;He=2}const ft=$.drawRange,Rt=$.attributes.position;let Je=ft.start*He,Tt=(ft.start+ft.count)*He;Se!==null&&(Je=Math.max(Je,Se.start*He),Tt=Math.min(Tt,(Se.start+Se.count)*He)),Oe!==null?(Je=Math.max(Je,0),Tt=Math.min(Tt,Oe.count)):Rt!=null&&(Je=Math.max(Je,0),Tt=Math.min(Tt,Rt.count));const $t=Tt-Je;if($t<0||$t===1/0)return;be.setup(ee,Z,Ae,$,Oe);let Lt,Xt=ue;if(Oe!==null&&(Lt=I.get(Oe),Xt=we,Xt.setIndex(Lt)),ee.isMesh)Z.wireframe===!0?(Le.setLineWidth(Z.wireframeLinewidth*It()),Xt.setMode(q.LINES)):Xt.setMode(q.TRIANGLES);else if(ee.isLine){let En=Z.linewidth;En===void 0&&(En=1),Le.setLineWidth(En*It()),ee.isLineSegments?Xt.setMode(q.LINES):ee.isLineLoop?Xt.setMode(q.LINE_LOOP):Xt.setMode(q.LINE_STRIP)}else ee.isPoints?Xt.setMode(q.POINTS):ee.isSprite&&Xt.setMode(q.TRIANGLES);if(ee.isBatchedMesh)if(St.get("WEBGL_multi_draw"))Xt.renderMultiDraw(ee._multiDrawStarts,ee._multiDrawCounts,ee._multiDrawCount);else{const En=ee._multiDrawStarts,Qe=ee._multiDrawCounts,dn=ee._multiDrawCount,Ut=Oe?I.get(Oe).bytesPerElement:1,li=it.get(Z).currentProgram.getUniforms();for(let ln=0;ln<dn;ln++)li.setValue(q,"_gl_DrawID",ln),Xt.render(En[ln]/Ut,Qe[ln])}else if(ee.isInstancedMesh)Xt.renderInstances(Je,$t,ee.count);else if($.isInstancedBufferGeometry){const En=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,Qe=Math.min($.instanceCount,En);Xt.renderInstances(Je,$t,Qe)}else Xt.render(Je,$t)};function Cl(L,X,$,Z){Y!==null&&L.isNodeMaterial&&Y.setObject(Z,L),Ce===!0&&ce.setState(L,$,!1),L.transparent===!0&&L.side===lr&&L.forceSinglePass===!1?(L.side=Jn,L.needsUpdate=!0,ss(L,X,Z),L.side=$r,L.needsUpdate=!0,ss(L,X,Z),L.side=lr):ss(L,X,Z)}this.compile=function(L,X,$=null){$===null&&($=L),Y!==null&&Y.renderStart(L,X,$),R=se.get($),R.init(X),C.push(R),$.traverseVisible(function(ee){ee.isLight&&ee.layers.test(X.layers)&&(R.pushLight(ee),ee.castShadow&&R.pushShadow(ee))}),L!==$&&L.traverseVisible(function(ee){ee.isLight&&ee.layers.test(X.layers)&&(R.pushLight(ee),ee.castShadow&&R.pushShadow(ee))}),R.setupLights(),Y!==null&&Y.updateLights(R.state.lightsArray),Ge=this.localClippingEnabled,Ce=ce.init(this.clippingPlanes,Ge),Ce===!0&&ce.setGlobalState(this.clippingPlanes,X),Y!==null&&Ee.render(R.state.shadowsArray,$,X);const Z=new Set;return L.traverse(function(ee){if(!(ee.isMesh||ee.isPoints||ee.isLine||ee.isSprite))return;const Se=ee.material;if(Se)if(Array.isArray(Se))for(let Fe=0;Fe<Se.length;Fe++){const Ae=Se[Fe];Cl(Ae,$,X,ee),Z.add(Ae)}else Cl(Se,$,X,ee),Z.add(Se)}),R=C.pop(),Y!==null&&Y.renderEnd(),Z},this.compileAsync=function(L,X,$=null){const Z=this.compile(L,X,$);return new Promise(ee=>{function Se(){if(Z.forEach(function(Fe){const Oe=it.get(Fe).currentProgram;(Oe===void 0||Oe.isReady())&&Z.delete(Fe)}),Z.size===0){ee(L);return}setTimeout(Se,10)}St.get("KHR_parallel_shader_compile")!==null?Se():setTimeout(Se,10)})};let na=null;function rf(L){na&&na(L)}function Rl(){pr.stop()}function Pl(){pr.start()}const pr=new ey;pr.setAnimationLoop(rf),typeof self<"u"&&pr.setContext(self),this.setAnimationLoop=function(L){na=L,ye.setAnimationLoop(L),L===null?pr.stop():pr.start()},ye.addEventListener("sessionstart",Rl),ye.addEventListener("sessionend",Pl),this.render=function(L,X){if(X!==void 0&&X.isCamera!==!0){nt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;Y!==null&&Y.renderStart(L,X);const $=ye.enabled===!0&&ye.isPresenting===!0,Z=B!==null&&(k===null||$)&&B.begin(N,k);if(L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),ye.enabled===!0&&ye.isPresenting===!0&&(B===null||B.isCompositing()===!1)&&(ye.cameraAutoUpdate===!0&&ye.updateCamera(X),X=ye.getCamera()),L.isScene===!0&&L.onBeforeRender(N,L,X,k),R=se.get(L,C.length),R.init(X),R.state.textureUnits=at.getTextureUnits(),C.push(R),Ne.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),X.isArrayCamera?Ie.setFromArrayCamera(X):ge.setFromProjectionMatrix(Ne,gi,X.reversedDepth),Ge=this.localClippingEnabled,Ce=ce.init(this.clippingPlanes,Ge),P=fe.get(L,E.length),P.init(),E.push(P),this.info.render.frame++,ye.enabled===!0&&ye.isPresenting===!0){const Fe=N.xr.getDepthSensingMesh();Fe!==null&&ia(Fe,X,-1/0,N.sortObjects)}ia(L,X,0,N.sortObjects),P.finish(),Y!==null&&Y.updateLights(R.state.lightsArray),N.sortObjects===!0&&P.sort(et,kt),bt=ye.enabled===!1||ye.isPresenting===!1||ye.hasDepthSensing()===!1,bt&&V.addToRenderList(P,L),this.info.autoReset===!0&&this.info.reset(),Ce===!0&&ce.beginShadows();const ee=R.state.shadowsArray;if(Ee.render(ee,L,X),Ce===!0&&ce.endShadows(),(Z&&B.hasRenderPass())===!1){const Fe=P.opaque,Ae=P.transmissive;if(R.setupLights(),X.isArrayCamera){const Oe=X.cameras;if(Ae.length>0)for(let He=0,ft=Oe.length;He<ft;He++){const Rt=Oe[He];Il(Fe,Ae,L,Rt)}bt&&V.render(L);for(let He=0,ft=Oe.length;He<ft;He++){const Rt=Oe[He];ra(P,L,Rt,Rt.viewport)}}else Ae.length>0&&Il(Fe,Ae,L,X),bt&&V.render(L),ra(P,L,X)}k!==null&&te===0&&(at.updateMultisampleRenderTarget(k),at.updateRenderTargetMipmap(k)),Z&&B.end(N),L.isScene===!0&&L.onAfterRender(N,L,X),be.resetDefaultState(),G=-1,W=null,C.pop(),C.length>0?(R=C[C.length-1],at.setTextureUnits(R.state.textureUnits),Ce===!0&&ce.setGlobalState(N.clippingPlanes,R.state.camera)):R=null,E.pop(),E.length>0?P=E[E.length-1]:P=null,Y!==null&&Y.renderEnd()};function ia(L,X,$,Z){if(L.visible===!1)return;if(L.layers.test(X.layers)){if(L.isGroup)$=L.renderOrder;else if(L.isLOD)L.autoUpdate===!0&&L.update(X);else if(L.isLight)R.pushLight(L),L.castShadow&&R.pushShadow(L);else if(L.isSprite){const Fe=X.isArrayCamera?Ie:ge;if(!L.frustumCulled||L.intersectsFrustum(Fe)){Z&&Ze.setFromMatrixPosition(L.matrixWorld).applyMatrix4(Ne);const Ae=ve.update(L),Oe=L.material;Oe.visible&&P.push(L,Ae,Oe,$,Ze.z,null,X)}}else if(L.isMesh||L.isLine||L.isPoints){const Fe=X.isArrayCamera?Ie:ge;if(!L.frustumCulled||L.intersectsFrustum(Fe)){const Ae=ve.update(L),Oe=L.material;if(Z&&(L.boundingSphere!==void 0?(L.boundingSphere===null&&L.computeBoundingSphere(),Ze.copy(L.boundingSphere.center)):(Ae.boundingSphere===null&&Ae.computeBoundingSphere(),Ze.copy(Ae.boundingSphere.center)),Ze.applyMatrix4(L.matrixWorld).applyMatrix4(Ne)),Array.isArray(Oe)){const He=Ae.groups;for(let ft=0,Rt=He.length;ft<Rt;ft++){const Je=He[ft],Tt=Oe[Je.materialIndex];Tt&&Tt.visible&&P.push(L,Ae,Tt,$,Ze.z,Je,X)}}else Oe.visible&&P.push(L,Ae,Oe,$,Ze.z,null,X)}}}const Se=L.children;for(let Fe=0,Ae=Se.length;Fe<Ae;Fe++)ia(Se[Fe],X,$,Z)}function ra(L,X,$,Z){const{opaque:ee,transmissive:Se,transparent:Fe}=L;R.setupLightsView($),Ce===!0&&ce.setGlobalState(N.clippingPlanes,$),Z&&Le.viewport(J.copy(Z)),ee.length>0&&js(ee,X,$),Se.length>0&&js(Se,X,$),Fe.length>0&&js(Fe,X,$),Le.buffers.depth.setTest(!0),Le.buffers.depth.setMask(!0),Le.buffers.color.setMask(!0),Le.setPolygonOffset(!1)}function Il(L,X,$,Z){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(R.state.transmissionRenderTarget[Z.id]===void 0){const Je=St.has("EXT_color_buffer_half_float")||St.has("EXT_color_buffer_float");R.state.transmissionRenderTarget[Z.id]=new vi(1,1,{generateMipmaps:!0,type:Je?Wi:qn,minFilter:Hi,samples:Math.max(4,Ht.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Dt.workingColorSpace})}const Se=R.state.transmissionRenderTarget[Z.id],Fe=Z.viewport||J;Se.setSize(Fe.z*N.transmissionResolutionScale,Fe.w*N.transmissionResolutionScale);const Ae=N.getRenderTarget(),Oe=N.getActiveCubeFace(),He=N.getActiveMipmapLevel();N.setRenderTarget(Se),N.getClearColor(ae),Me=N.getClearAlpha(),Me<1&&N.setClearColor(16777215,.5),N.clear(),bt&&V.render($);const ft=N.toneMapping;N.toneMapping=Gi;const Rt=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),R.setupLightsView(Z),Ce===!0&&ce.setGlobalState(N.clippingPlanes,Z),js(L,$,Z),at.updateMultisampleRenderTarget(Se),at.updateRenderTargetMipmap(Se),St.has("WEBGL_multisampled_render_to_texture")===!1){let Je=!1;for(let Tt=0,$t=X.length;Tt<$t;Tt++){const Lt=X[Tt],{object:Xt,geometry:En,material:Qe,group:dn}=Lt;if(Qe.side===lr&&Xt.layers.test(Z.layers)){const Ut=Qe.side;Qe.side=Jn,Qe.needsUpdate=!0,Ll(Xt,$,Z,En,Qe,dn),Qe.side=Ut,Qe.needsUpdate=!0,Je=!0}}Je===!0&&(at.updateMultisampleRenderTarget(Se),at.updateRenderTargetMipmap(Se))}N.setRenderTarget(Ae,Oe,He),N.setClearColor(ae,Me),Rt!==void 0&&(Z.viewport=Rt),N.toneMapping=ft}function js(L,X,$){const Z=X.isScene===!0?X.overrideMaterial:null;for(let ee=0,Se=L.length;ee<Se;ee++){const Fe=L[ee],{object:Ae,geometry:Oe,group:He}=Fe;let ft=Fe.material;ft.allowOverride===!0&&Z!==null&&(ft=Z),Ae.layers.test($.layers)&&Ll(Ae,X,$,Oe,ft,He)}}function Ll(L,X,$,Z,ee,Se){Y!==null&&ee.isNodeMaterial&&Y.setObject(L,ee),L.onBeforeRender(N,X,$,Z,ee,Se),L.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,L.matrixWorld),L.normalMatrix.getNormalMatrix(L.modelViewMatrix),ee.onBeforeRender(N,X,$,Z,L,Se),ee.transparent===!0&&ee.side===lr&&ee.forceSinglePass===!1?(ee.side=Jn,ee.needsUpdate=!0,N.renderBufferDirect($,X,Z,ee,L,Se),ee.side=$r,ee.needsUpdate=!0,N.renderBufferDirect($,X,Z,ee,L,Se),ee.side=lr):N.renderBufferDirect($,X,Z,ee,L,Se),L.onAfterRender(N,X,$,Z,ee,Se)}function Nl(L){let X=0;for(const $ of L)$.texture!==null&&X++;return X}function ss(L,X,$){X.isScene!==!0&&(X=Et);const Z=it.get(L),ee=R.state.lights,Se=R.state.shadowsArray,Fe=ee.state.version,Ae=U.getParameters(L,ee.state,Se,X,$,R.state.lightProbeGridArray),Oe=U.getProgramCacheKey(Ae);let He=Z.programs;Z.environment=L.isMeshStandardMaterial||L.isMeshLambertMaterial||L.isMeshPhongMaterial?X.environment:null,Z.fog=X.fog;const ft=L.isMeshStandardMaterial||L.isMeshLambertMaterial&&!L.envMap||L.isMeshPhongMaterial&&!L.envMap;Z.envMap=F.get(L.envMap||Z.environment,ft),Z.envMapRotation=Z.environment!==null&&L.envMap===null?X.environmentRotation:L.envMapRotation,He===void 0&&(L.addEventListener("dispose",Ft),He=new Map,Z.programs=He,Z.programVariants=new Map);let Rt=He.get(Oe);if(Rt!==void 0){if(Z.currentProgram===Rt&&Z.lightsStateVersion===Fe)return Fr(L,Ae),Rt}else Ae.uniforms=U.getUniforms(L),Y!==null&&L.isNodeMaterial&&Y.build(L,$,Ae),L.onBeforeCompile(Ae,N),Rt=U.acquireProgram(Ae,Oe),He.set(Oe,Rt),Z.uniforms=Ae.uniforms;const Je=Z.uniforms;return(!L.isShaderMaterial&&!L.isRawShaderMaterial||L.clipping===!0)&&(Je.clippingPlanes=ce.uniform),Fr(L,Ae),Z.needsLights=of(L),Z.lightsStateVersion=Fe,Z.needsLights&&(Je.ambientLightColor.value=ee.state.ambient,Je.lightProbe.value=ee.state.probe,Je.sunLights.value=ee.state.sun,Je.sunLightShadows.value=ee.state.sunShadow,Je.directionalLights.value=ee.state.directional,Je.directionalLightShadows.value=ee.state.directionalShadow,Je.spotLights.value=ee.state.spot,Je.spotLightShadows.value=ee.state.spotShadow,Je.rectAreaLights.value=ee.state.rectArea,Je.ltc_1.value=ee.state.rectAreaLTC1,Je.ltc_2.value=ee.state.rectAreaLTC2,Je.pointLights.value=ee.state.point,Je.pointLightShadows.value=ee.state.pointShadow,Je.hemisphereLights.value=ee.state.hemi,Je.sunShadowMatrix.value=ee.state.sunShadowMatrix,Je.sunShadowCascade.value=ee.state.sunShadowCascade,Je.directionalShadowMatrix.value=ee.state.directionalShadowMatrix,Je.spotLightMatrix.value=ee.state.spotLightMatrix,Je.spotLightMap.value=ee.state.spotLightMap,Je.pointShadowMatrix.value=ee.state.pointShadowMatrix),Z.numLightProbeGrids=Nl(R.state.lightProbeGridArray),Z.currentProgram=Rt,Z.uniformsList=null,Rt}function sf(L,X,$,Z,ee){const Se=it.get(L),Fe=Se.currentProgram.id+","+Z+","+ee;let Ae=Se.programVariants.get(Fe);return Ae===void 0?(Ae=ss(L,X,$),Se.programVariants.set(Fe,Ae)):(Se.currentProgram=Ae,Se.uniformsList=null,Se.outputColorSpace=Z,Se.toneMapping=ee),Ae}function Js(L){if(L.uniformsList===null){const X=L.currentProgram.getUniforms();L.uniformsList=Eu.seqWithValue(X.seq,L.uniforms)}return L.uniformsList}function Fr(L,X){const $=it.get(L);$.outputColorSpace=X.outputColorSpace,$.batching=X.batching,$.batchingColor=X.batchingColor,$.instancing=X.instancing,$.instancingColor=X.instancingColor,$.instancingMorph=X.instancingMorph,$.skinning=X.skinning,$.morphTargets=X.morphTargets,$.morphNormals=X.morphNormals,$.morphColors=X.morphColors,$.morphTargetsCount=X.morphTargetsCount,$.numClippingPlanes=X.numClippingPlanes,$.numIntersection=X.numClipIntersection,$.vertexAlphas=X.vertexAlphas,$.vertexTangents=X.vertexTangents,$.toneMapping=X.toneMapping}function sa(L,X,$,Z,ee){X.isScene!==!0&&(X=Et),at.resetTextureUnits();const Se=X.fog,Fe=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial?X.environment:null,Ae=k===null?N.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:Dt.workingColorSpace,Oe=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial&&!Z.envMap||Z.isMeshPhongMaterial&&!Z.envMap,He=F.get(Z.envMap||Fe,Oe),ft=Z.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Rt=!!$.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Je=!!$.morphAttributes.position,Tt=!!$.morphAttributes.normal,$t=!!$.morphAttributes.color;let Lt=Gi;Z.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(Lt=N.toneMapping);const Xt=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,En=Xt!==void 0?Xt.length:0,Qe=it.get(Z),dn=R.state.lights;if(Ce===!0&&(Ge===!0||L!==W)){const Yt=L===W&&Z.id===G;ce.setState(Z,L,Yt)}let Ut=!1,li=!1;Z.version===Qe.__version?Qe.needsLights&&Qe.lightsStateVersion!==dn.state.version||ee.isBatchedMesh&&Qe.batching===!1||!ee.isBatchedMesh&&Qe.batching===!0||ee.isBatchedMesh&&Qe.batchingColor===!0&&ee._colorsTexture===null||ee.isBatchedMesh&&Qe.batchingColor===!1&&ee._colorsTexture!==null||ee.isInstancedMesh&&Qe.instancing===!1||!ee.isInstancedMesh&&Qe.instancing===!0||ee.isSkinnedMesh&&Qe.skinning===!1||!ee.isSkinnedMesh&&Qe.skinning===!0||ee.isInstancedMesh&&Qe.instancingColor===!0&&ee.instanceColor===null||ee.isInstancedMesh&&Qe.instancingColor===!1&&ee.instanceColor!==null||ee.isInstancedMesh&&Qe.instancingMorph===!0&&ee.morphTexture===null||ee.isInstancedMesh&&Qe.instancingMorph===!1&&ee.morphTexture!==null||Qe.envMap!==He||Z.fog===!0&&Qe.fog!==Se||Qe.numClippingPlanes!==void 0&&(Qe.numClippingPlanes!==ce.numPlanes||Qe.numIntersection!==ce.numIntersection)||Qe.vertexAlphas!==ft||Qe.vertexTangents!==Rt||Qe.morphTargets!==Je||Qe.morphNormals!==Tt||Qe.morphColors!==$t||Qe.morphTargetsCount!==En||Qe.numLightProbeGrids!==Nl(R.state.lightProbeGridArray)?Ut=!0:(Qe.outputColorSpace!==Ae||Qe.toneMapping!==Lt)&&(li=!0):(Ut=!0,Qe.__version=Z.version);let ln=Qe.currentProgram;(Ut===!0||li===!0)&&(ln=li===!0?sf(Z,X,ee,Ae,Lt):ss(Z,X,ee),Y&&Z.isNodeMaterial&&Y.onUpdateProgram(Z,ln,Qe));let Qs=!1,Zi=!1,Ni=!1;const Nt=ln.getUniforms(),en=Qe.uniforms;if(Le.useProgram(ln.program)&&(Qs=!0,Zi=!0,Ni=!0),Z.id!==G&&(G=Z.id,Zi=!0),Qs||W!==L){Le.buffers.depth.getReversed()&&L.reversedDepth!==!0&&(L._reversedDepth=!0,L.updateProjectionMatrix()),Nt.setValue(q,"projectionMatrix",L.projectionMatrix),Nt.setValue(q,"viewMatrix",L.matrixWorldInverse);const ut=Nt.map.cameraPosition;ut!==void 0&&ut.setValue(q,pt.setFromMatrixPosition(L.matrixWorld)),Ht.logarithmicDepthBuffer&&Nt.setValue(q,"logDepthBufFC",2/(Math.log(L.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&Nt.setValue(q,"isOrthographic",L.isOrthographicCamera===!0),W!==L&&(W=L,Zi=!0,Ni=!0)}if(Qe.needsLights&&(dn.state.sunShadowMap.length>0&&Nt.setValue(q,"sunShadowMap",dn.state.sunShadowMap,at),dn.state.directionalShadowMap.length>0&&Nt.setValue(q,"directionalShadowMap",dn.state.directionalShadowMap,at),dn.state.spotShadowMap.length>0&&Nt.setValue(q,"spotShadowMap",dn.state.spotShadowMap,at),dn.state.pointShadowMap.length>0&&Nt.setValue(q,"pointShadowMap",dn.state.pointShadowMap,at)),ee.isSkinnedMesh){Nt.setOptional(q,ee,"bindMatrix"),Nt.setOptional(q,ee,"bindMatrixInverse");const Yt=ee.skeleton;Yt&&(Yt.boneTexture===null&&Yt.computeBoneTexture(),Nt.setValue(q,"boneTexture",Yt.boneTexture,at))}ee.isBatchedMesh&&(Nt.setOptional(q,ee,"batchingTexture"),Nt.setValue(q,"batchingTexture",ee._matricesTexture,at),Nt.setOptional(q,ee,"batchingIdTexture"),Nt.setValue(q,"batchingIdTexture",ee._indirectTexture,at),Nt.setOptional(q,ee,"batchingColorTexture"),ee._colorsTexture!==null&&Nt.setValue(q,"batchingColorTexture",ee._colorsTexture,at));const ci=$.morphAttributes;if((ci.position!==void 0||ci.normal!==void 0||ci.color!==void 0)&&pe.update(ee,$,ln),(Zi||Qe.receiveShadow!==ee.receiveShadow)&&(Qe.receiveShadow=ee.receiveShadow,Nt.setValue(q,"receiveShadow",ee.receiveShadow)),(Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial)&&Z.envMap===null&&X.environment!==null&&(en.envMapIntensity.value=X.environmentIntensity),en.dfgLUT!==void 0&&(en.dfgLUT.value=aR()),Zi){if(Nt.setValue(q,"toneMappingExposure",N.toneMappingExposure),Qe.needsLights&&oa(en,Ni),Se&&Z.fog===!0&&re.refreshFogUniforms(en,Se),re.refreshMaterialUniforms(en,Z,Ue,Ye,R.state.transmissionRenderTarget[L.id]),Qe.needsLights&&Qe.numLightProbeGrids>0){const Yt=T;let ut=0;for(const xi of R.state.lightProbeGridArray)xi.texture!==null&&(Yt.textures[ut]=xi.texture,Yt.min[ut]=xi.boundingBox.min,Yt.max[ut]=xi.boundingBox.max,Yt.resolution[ut]=xi.resolution,ut++);for(const xi in Yt)Yt[xi].length=ut;en.probesSH.value=Yt.textures,en.probesMin.value=Yt.min,en.probesMax.value=Yt.max,en.probesResolution.value=Yt.resolution}Eu.upload(q,Js(Qe),en,at)}if(Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(Eu.upload(q,Js(Qe),en,at),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&Nt.setValue(q,"center",ee.center),Nt.setValue(q,"modelViewMatrix",ee.modelViewMatrix),Nt.setValue(q,"normalMatrix",ee.normalMatrix),Nt.setValue(q,"modelMatrix",ee.matrixWorld),Z.uniformsGroups!==void 0){const Yt=Z.uniformsGroups;for(let ut=0,xi=Yt.length;ut<xi;ut++){const $s=Yt[ut];je.update($s,ln),je.bind($s,ln)}}return ln}function oa(L,X){L.ambientLightColor.needsUpdate=X,L.lightProbe.needsUpdate=X,L.sunLights.needsUpdate=X,L.sunLightShadows.needsUpdate=X,L.directionalLights.needsUpdate=X,L.directionalLightShadows.needsUpdate=X,L.pointLights.needsUpdate=X,L.pointLightShadows.needsUpdate=X,L.spotLights.needsUpdate=X,L.spotLightShadows.needsUpdate=X,L.rectAreaLights.needsUpdate=X,L.hemisphereLights.needsUpdate=X}function of(L){return L.isMeshLambertMaterial||L.isMeshToonMaterial||L.isMeshPhongMaterial||L.isMeshStandardMaterial||L.isShadowMaterial||L.isShaderMaterial&&L.lights===!0}this.getActiveCubeFace=function(){return oe},this.getActiveMipmapLevel=function(){return te},this.getRenderTarget=function(){return k},this.setRenderTargetTextures=function(L,X,$){const Z=it.get(L);Z.__autoAllocateDepthBuffer=L.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),it.get(L.texture).__webglTexture=X,it.get(L.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:$,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(L,X){const $=it.get(L);$.__webglFramebuffer=X,$.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(L,X=0,$=0){k=L,oe=X,te=$;let Z=null,ee=!1,Se=!1;if(L){const Ae=it.get(L);if(Ae.__useDefaultFramebuffer!==void 0){Le.bindFramebuffer(q.FRAMEBUFFER,Ae.__webglFramebuffer),J.copy(L.viewport),_e.copy(L.scissor),Te=L.scissorTest,Le.viewport(J),Le.scissor(_e),Le.setScissorTest(Te),G=-1;return}else if(Ae.__webglFramebuffer===void 0)at.setupRenderTarget(L);else if(Ae.__hasExternalTextures)at.rebindTextures(L,it.get(L.texture).__webglTexture,it.get(L.depthTexture).__webglTexture);else if(L.depthBuffer){const ft=L.depthTexture;if(Ae.__boundDepthTexture!==ft){if(ft!==null&&it.has(ft)&&(L.width!==ft.image.width||L.height!==ft.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");at.setupDepthRenderbuffer(L)}}const Oe=L.texture;(Oe.isData3DTexture||Oe.isDataArrayTexture||Oe.isCompressedArrayTexture)&&(Se=!0);const He=it.get(L).__webglFramebuffer;L.isWebGLCubeRenderTarget?(Array.isArray(He[X])?Z=He[X][$]:Z=He[X],ee=!0):L.samples>0&&at.useMultisampledRTT(L)===!1?Z=it.get(L).__webglMultisampledFramebuffer:Array.isArray(He)?Z=He[$]:Z=He,J.copy(L.viewport),_e.copy(L.scissor),Te=L.scissorTest}else J.copy(Ke).multiplyScalar(Ue).floor(),_e.copy(gt).multiplyScalar(Ue).floor(),Te=ot;if($!==0&&(Z=K),Le.bindFramebuffer(q.FRAMEBUFFER,Z)&&Le.drawBuffers(L,Z),Le.viewport(J),Le.scissor(_e),Le.setScissorTest(Te),ee){const Ae=it.get(L.texture);q.framebufferTexture2D(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_CUBE_MAP_POSITIVE_X+X,Ae.__webglTexture,$)}else if(Se){const Ae=X;for(let Oe=0;Oe<L.textures.length;Oe++){const He=it.get(L.textures[Oe]);q.framebufferTextureLayer(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0+Oe,He.__webglTexture,$,Ae)}}else if(L!==null&&$!==0){const Ae=it.get(L.texture);q.framebufferTexture2D(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_2D,Ae.__webglTexture,$)}G=-1};function Ks(L){const X=it.get(L);return(X.__readFormat!==L.format||X.__readType!==L.type)&&(X.__readFormat=L.format,X.__readType=L.type,X.__formatReadable=Ht.textureFormatReadable(L.format),X.__typeReadable=Ht.textureTypeReadable(L.type)),X}this.readRenderTargetPixels=function(L,X,$,Z,ee,Se,Fe,Ae=0){if(!(L&&L.isWebGLRenderTarget)){nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Oe=it.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&Fe!==void 0&&(Oe=Oe[Fe],Array.isArray(Oe)&&(Oe=Oe[0])),Oe){Le.bindFramebuffer(q.FRAMEBUFFER,Oe);try{const He=L.textures[Ae],ft=He.format,Rt=He.type;L.textures.length>1&&q.readBuffer(q.COLOR_ATTACHMENT0+Ae);const Je=Ks(He);if(Je.__formatReadable===!1){nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Je.__typeReadable===!1){nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=L.width-Z&&$>=0&&$<=L.height-ee&&q.readPixels(X,$,Z,ee,xe.convert(ft),xe.convert(Rt),Se)}finally{const He=k!==null?it.get(k).__webglFramebuffer:null;Le.bindFramebuffer(q.FRAMEBUFFER,He)}}},this.readRenderTargetPixelsAsync=async function(L,X,$,Z,ee,Se,Fe,Ae=0){if(!(L&&L.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Oe=it.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&Fe!==void 0&&(Oe=Oe[Fe],Array.isArray(Oe)&&(Oe=Oe[0])),Oe)if(X>=0&&X<=L.width-Z&&$>=0&&$<=L.height-ee){Le.bindFramebuffer(q.FRAMEBUFFER,Oe);const He=L.textures[Ae],ft=He.format,Rt=He.type;L.textures.length>1&&q.readBuffer(q.COLOR_ATTACHMENT0+Ae);const Je=Ks(He);if(Je.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Je.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Tt=q.createBuffer();q.bindBuffer(q.PIXEL_PACK_BUFFER,Tt),q.bufferData(q.PIXEL_PACK_BUFFER,Se.byteLength,q.STREAM_READ),q.readPixels(X,$,Z,ee,xe.convert(ft),xe.convert(Rt),0),q.bindBuffer(q.PIXEL_PACK_BUFFER,null);const $t=k!==null?it.get(k).__webglFramebuffer:null;Le.bindFramebuffer(q.FRAMEBUFFER,$t);const Lt=q.fenceSync(q.SYNC_GPU_COMMANDS_COMPLETE,0);return q.flush(),await vM(q,Lt,4),q.bindBuffer(q.PIXEL_PACK_BUFFER,Tt),q.getBufferSubData(q.PIXEL_PACK_BUFFER,0,Se),q.bindBuffer(q.PIXEL_PACK_BUFFER,null),q.deleteBuffer(Tt),q.deleteSync(Lt),Se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(L,X=null,$=0){const Z=Math.pow(2,-$),ee=Math.floor(L.image.width*Z),Se=Math.floor(L.image.height*Z),Fe=X!==null?X.x:0,Ae=X!==null?X.y:0;at.setTexture2D(L,0),q.copyTexSubImage2D(q.TEXTURE_2D,$,0,0,Fe,Ae,ee,Se),Le.unbindTexture()},this.copyTextureToTexture=function(L,X,$=null,Z=null,ee=0,Se=0){let Fe,Ae,Oe,He,ft,Rt,Je,Tt,$t;const Lt=L.isCompressedTexture?L.mipmaps[Se]:L.image;if($!==null)Fe=$.max.x-$.min.x,Ae=$.max.y-$.min.y,Oe=$.isBox3?$.max.z-$.min.z:1,He=$.min.x,ft=$.min.y,Rt=$.isBox3?$.min.z:0;else{const Nt=Math.pow(2,-ee);Fe=Math.floor(Lt.width*Nt),Ae=Math.floor(Lt.height*Nt),L.isDataArrayTexture?Oe=Lt.depth:L.isData3DTexture?Oe=Math.floor(Lt.depth*Nt):Oe=1,He=0,ft=0,Rt=0}Z!==null?(Je=Z.x,Tt=Z.y,$t=Z.z):(Je=0,Tt=0,$t=0);const Xt=xe.convert(X.format),En=xe.convert(X.type);let Qe;X.isData3DTexture?(at.setTexture3D(X,0),Qe=q.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(at.setTexture2DArray(X,0),Qe=q.TEXTURE_2D_ARRAY):(at.setTexture2D(X,0),Qe=q.TEXTURE_2D),Le.activeTexture(q.TEXTURE0),Le.pixelStorei(q.UNPACK_FLIP_Y_WEBGL,X.flipY),Le.pixelStorei(q.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),Le.pixelStorei(q.UNPACK_ALIGNMENT,X.unpackAlignment);const dn=Le.getParameter(q.UNPACK_ROW_LENGTH),Ut=Le.getParameter(q.UNPACK_IMAGE_HEIGHT),li=Le.getParameter(q.UNPACK_SKIP_PIXELS),ln=Le.getParameter(q.UNPACK_SKIP_ROWS),Qs=Le.getParameter(q.UNPACK_SKIP_IMAGES);Le.pixelStorei(q.UNPACK_ROW_LENGTH,Lt.width),Le.pixelStorei(q.UNPACK_IMAGE_HEIGHT,Lt.height),Le.pixelStorei(q.UNPACK_SKIP_PIXELS,He),Le.pixelStorei(q.UNPACK_SKIP_ROWS,ft),Le.pixelStorei(q.UNPACK_SKIP_IMAGES,Rt);const Zi=L.isDataArrayTexture||L.isData3DTexture,Ni=X.isDataArrayTexture||X.isData3DTexture;if(L.isDepthTexture){const Nt=it.get(L),en=it.get(X),ci=it.get(Nt.__renderTarget),Yt=it.get(en.__renderTarget);Le.bindFramebuffer(q.READ_FRAMEBUFFER,ci.__webglFramebuffer),Le.bindFramebuffer(q.DRAW_FRAMEBUFFER,Yt.__webglFramebuffer);for(let ut=0;ut<Oe;ut++)Zi&&(q.framebufferTextureLayer(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,it.get(L).__webglTexture,ee,Rt+ut),q.framebufferTextureLayer(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,it.get(X).__webglTexture,Se,$t+ut)),q.blitFramebuffer(He,ft,He+Fe,ft+Ae,Je,Tt,Je+Fe,Tt+Ae,q.DEPTH_BUFFER_BIT,q.NEAREST);Le.bindFramebuffer(q.READ_FRAMEBUFFER,null),Le.bindFramebuffer(q.DRAW_FRAMEBUFFER,null)}else if(ee!==0||L.isRenderTargetTexture||it.has(L)){const Nt=it.get(L),en=it.get(X);Le.bindFramebuffer(q.READ_FRAMEBUFFER,H),Le.bindFramebuffer(q.DRAW_FRAMEBUFFER,ne);for(let ci=0;ci<Oe;ci++)Zi?q.framebufferTextureLayer(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,Nt.__webglTexture,ee,Rt+ci):q.framebufferTexture2D(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_2D,Nt.__webglTexture,ee),Ni?q.framebufferTextureLayer(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,en.__webglTexture,Se,$t+ci):q.framebufferTexture2D(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_2D,en.__webglTexture,Se),ee!==0?q.blitFramebuffer(He,ft,He+Fe,ft+Ae,Je,Tt,Je+Fe,Tt+Ae,q.COLOR_BUFFER_BIT,q.NEAREST):Ni?q.copyTexSubImage3D(Qe,Se,Je,Tt,$t+ci,He,ft,Fe,Ae):q.copyTexSubImage2D(Qe,Se,Je,Tt,He,ft,Fe,Ae);Le.bindFramebuffer(q.READ_FRAMEBUFFER,null),Le.bindFramebuffer(q.DRAW_FRAMEBUFFER,null)}else Ni?L.isDataTexture||L.isData3DTexture?q.texSubImage3D(Qe,Se,Je,Tt,$t,Fe,Ae,Oe,Xt,En,Lt.data):X.isCompressedArrayTexture?q.compressedTexSubImage3D(Qe,Se,Je,Tt,$t,Fe,Ae,Oe,Xt,Lt.data):q.texSubImage3D(Qe,Se,Je,Tt,$t,Fe,Ae,Oe,Xt,En,Lt):L.isDataTexture?q.texSubImage2D(q.TEXTURE_2D,Se,Je,Tt,Fe,Ae,Xt,En,Lt.data):L.isCompressedTexture?q.compressedTexSubImage2D(q.TEXTURE_2D,Se,Je,Tt,Lt.width,Lt.height,Xt,Lt.data):q.texSubImage2D(q.TEXTURE_2D,Se,Je,Tt,Fe,Ae,Xt,En,Lt);Le.pixelStorei(q.UNPACK_ROW_LENGTH,dn),Le.pixelStorei(q.UNPACK_IMAGE_HEIGHT,Ut),Le.pixelStorei(q.UNPACK_SKIP_PIXELS,li),Le.pixelStorei(q.UNPACK_SKIP_ROWS,ln),Le.pixelStorei(q.UNPACK_SKIP_IMAGES,Qs),Se===0&&X.generateMipmaps===!0&&X.mipmapsAutoUpdate===!0&&q.generateMipmap(Qe),Le.unbindTexture()},this.initRenderTarget=function(L){it.get(L).__webglFramebuffer===void 0&&at.setupRenderTarget(L)},this.initTexture=function(L){L.isCubeTexture?at.setTextureCube(L,0):L.isData3DTexture?at.setTexture3D(L,0):L.isDataArrayTexture||L.isCompressedArrayTexture?at.setTexture2DArray(L,0):at.setTexture2D(L,0),Le.unbindTexture()},this.resetState=function(){oe=0,te=0,k=null,Le.reset(),be.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Dt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Dt._getUnpackColorSpace()}}const lR=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:vh,AddEquation:Cs,AddOperation:Dv,AdditiveAnimationBlendMode:zp,AdditiveBlending:op,AgXToneMapping:Pp,AlphaFormat:Fp,AlwaysCompare:Vp,AlwaysDepth:Au,AlwaysStencilFunc:Hv,AmbientLight:kx,AnimationAction:Zx,AnimationClip:fl,AnimationLoader:fE,AnimationMixer:VE,AnimationObjectGroup:kE,AnimationUtils:oE,ArcCurve:ux,ArrayCamera:Wx,ArrowHelper:l1,AttachedBindMode:cp,Audio:Yx,AudioAnalyser:PE,AudioContext:mm,AudioListener:AE,AudioLoader:wE,AxesHelper:c1,BackSide:Jn,BasicDepthPacking:zv,BasicShadowMap:pv,BatchedMesh:sx,BezierInterpolant:Lx,Bone:jp,BooleanKeyframeTrack:Ys,Box2:Kx,Box3:xn,Box3Helper:o1,BoxGeometry:Xs,BoxHelper:s1,BufferAttribute:Jt,BufferGeometry:wt,BufferGeometryLoader:Gx,ByteType:Np,Cache:hr,Camera:bl,CameraHelper:r1,CanvasTexture:bw,CapsuleGeometry:Oh,CatmullRomCurve3:hx,CineonToneMapping:Cp,CircleGeometry:Fh,ClampToEdgeWrapping:oi,Clock:Jx,Color:Xe,ColorKeyframeTrack:um,ColorManagement:Dt,Compatibility:fM,CompressedArrayTexture:ww,CompressedCubeTexture:Ew,CompressedTexture:Uh,CompressedTextureLoader:dE,ConeGeometry:Sl,ConstantAlphaFactor:Iv,ConstantColorFactor:Rv,Controls:h1,CubeCamera:ph,CubeDepthTexture:Kp,CubeReflectionMapping:Nr,CubeRefractionMapping:Fs,CubeTexture:xl,CubeTextureLoader:pE,CubicBezierCurve:em,CubicBezierCurve3:fx,CubicInterpolant:Px,CullFaceBack:sp,CullFaceFront:dv,CullFaceFrontBack:ES,CullFaceNone:fv,Curve:qi,CurvePath:px,CustomBlending:mv,CustomToneMapping:Rp,CylinderGeometry:yl,Cylindrical:qE,Data3DTexture:Ph,DataArrayTexture:Rh,DataTexture:Ri,DataTextureLoader:mE,DataUtils:jM,DecrementStencilOp:GS,DecrementWrapStencilOp:XS,DefaultLoadingManager:Ux,DepthFormat:Dr,DepthStencilFormat:Pr,DepthTexture:Hs,DetachedBindMode:Uv,DirectionalLight:zx,DirectionalLightHelper:i1,DiscreteInterpolant:Ix,DodecahedronGeometry:Bh,DoubleSide:lr,DstAlphaFactor:Ev,DstColorFactor:Tv,DynamicCopyUsage:oM,DynamicDrawUsage:eM,DynamicReadUsage:iM,EdgesGeometry:cx,EllipseCurve:zh,EqualCompare:Wv,EqualDepth:Ru,EqualStencilFunc:jS,EquirectangularReflectionMapping:Va,EquirectangularRefractionMapping:Ga,Euler:Xi,EventDispatcher:Yi,ExternalTexture:Qp,ExtrudeGeometry:Hh,FileLoader:Or,Float16BufferAttribute:nw,Float32BufferAttribute:qe,FloatType:Zn,Fog:Lh,FogExp2:Ih,FramebufferTexture:Mw,FrontSide:$r,Frustum:ks,FrustumArray:vl,GLBufferAttribute:YE,GLSL1:lM,GLSL3:hp,GreaterCompare:Xv,GreaterDepth:Iu,GreaterEqualCompare:Hp,GreaterEqualDepth:Pu,GreaterEqualStencilFunc:$S,GreaterStencilFunc:KS,GridHelper:t1,Group:zo,HTMLTexture:Tw,HalfFloatType:Wi,HemisphereLight:Ox,HemisphereLightHelper:e1,IcosahedronGeometry:Vh,ImageBitmapLoader:ME,ImageLoader:dl,ImageUtils:Qv,IncrementStencilOp:VS,IncrementWrapStencilOp:WS,InstancedBufferAttribute:Zo,InstancedBufferGeometry:pm,InstancedInterleavedBuffer:mh,InstancedMesh:rx,Int16BufferAttribute:ew,Int32BufferAttribute:tw,Int8BufferAttribute:KM,IntType:yh,InterleavedBuffer:Nh,InterleavedBufferAttribute:_i,Interpolant:ea,InterpolateBezier:up,InterpolateDiscrete:nl,InterpolateLinear:ch,InterpolateSmooth:Su,InterpolationSamplingMode:hM,InterpolationSamplingType:uM,InvertStencilOp:YS,KeepStencilOp:Mu,KeyframeTrack:Li,LOD:nx,LatheGeometry:Gh,Layers:Us,LessCompare:Gv,LessDepth:Cu,LessEqualCompare:kp,LessEqualDepth:Xo,LessEqualStencilFunc:JS,LessStencilFunc:ZS,Light:rs,LightProbe:Vx,LightShadow:Qh,Line:ns,Line3:Qx,LineBasicMaterial:Kn,LineCurve:tm,LineCurve3:dx,LineDashedMaterial:Ax,LineLoop:ox,LineSegments:dr,LinearFilter:rn,LinearInterpolant:cm,LinearMipMapLinearFilter:RS,LinearMipMapNearestFilter:CS,LinearMipmapLinearFilter:Hi,LinearMipmapNearestFilter:Wa,LinearSRGBColorSpace:rl,LinearToneMapping:Tp,LinearTransfer:sl,Loader:ai,LoaderUtils:gp,LoadingManager:fm,LoopOnce:Ov,LoopPingPong:Bv,LoopRepeat:Fv,MOUSE:Ts,Material:Dn,MaterialBlending:bS,MaterialLoader:$h,MathUtils:Kv,Matrix2:xp,Matrix3:_t,Matrix4:mt,MaxEquation:xv,Mesh:Sn,MeshBasicMaterial:Ws,MeshDepthMaterial:am,MeshDistanceMaterial:lm,MeshLambertMaterial:bx,MeshMatcapMaterial:Tx,MeshNormalMaterial:Ex,MeshPhongMaterial:Mx,MeshPhysicalMaterial:Sx,MeshStandardMaterial:om,MeshToonMaterial:wx,MinEquation:vv,MirroredRepeatWrapping:$a,MixOperation:Nv,MultiplyBlending:lp,MultiplyOperation:gl,NearestFilter:hn,NearestMipMapLinearFilter:AS,NearestMipMapNearestFilter:TS,NearestMipmapLinearFilter:Fo,NearestMipmapNearestFilter:Lp,NeutralToneMapping:Ip,NeverCompare:Vv,NeverDepth:Tu,NeverStencilFunc:qS,NoBlending:Ns,NoColorSpace:Cr,NoNormalPacking:FS,NoToneMapping:Gi,NormalAnimationBlendMode:Th,NormalBlending:Go,NormalGAPacking:zS,NormalRGPacking:BS,NotEqualCompare:Yv,NotEqualDepth:Lu,NotEqualStencilFunc:QS,NumberKeyframeTrack:Jh,Object3D:zt,ObjectLoader:yE,ObjectSpaceNormalMap:kv,OctahedronGeometry:wl,OneFactor:Sv,OneMinusConstantAlphaFactor:Lv,OneMinusConstantColorFactor:Pv,OneMinusDstAlphaFactor:bv,OneMinusDstColorFactor:Av,OneMinusSrcAlphaFactor:bp,OneMinusSrcColorFactor:wv,OrthographicCamera:Qr,PCFShadowMap:Vo,PCFSoftShadowMap:Ha,PMREMGenerator:pl,Path:ll,PerspectiveCamera:_n,Plane:ar,PlaneGeometry:$o,PlaneHelper:a1,PointLight:Bx,PointLightHelper:QE,Points:ax,PointsMaterial:Jp,PolarGridHelper:n1,PolyhedronGeometry:is,PositionalAudio:RE,PropertyBinding:Bt,PropertyMixer:qx,QuadraticBezierCurve:nm,QuadraticBezierCurve3:kh,Quaternion:Nn,QuaternionKeyframeTrack:Kh,QuaternionLinearInterpolant:Dx,R11_EAC_Format:ku,RED_GREEN_RGTC2_Format:tl,RED_RGTC1_Format:oh,REVISION:ml,RG11_EAC_Format:el,RGBADepthPacking:DS,RGBAFormat:jn,RGBAIntegerFormat:bh,RGBA_ASTC_10x10_Format:eh,RGBA_ASTC_10x5_Format:Ku,RGBA_ASTC_10x6_Format:Qu,RGBA_ASTC_10x8_Format:$u,RGBA_ASTC_12x10_Format:th,RGBA_ASTC_12x12_Format:nh,RGBA_ASTC_4x4_Format:Gu,RGBA_ASTC_5x4_Format:Wu,RGBA_ASTC_5x5_Format:Xu,RGBA_ASTC_6x5_Format:Yu,RGBA_ASTC_6x6_Format:qu,RGBA_ASTC_8x5_Format:Zu,RGBA_ASTC_8x6_Format:ju,RGBA_ASTC_8x8_Format:Ju,RGBA_BPTC_Format:ih,RGBA_ETC2_EAC_Format:zu,RGBA_PVRTC_2BPPV1_Format:Ou,RGBA_PVRTC_4BPPV1_Format:Uu,RGBA_S3TC_DXT1_Format:Ya,RGBA_S3TC_DXT3_Format:qa,RGBA_S3TC_DXT5_Format:Za,RGBDepthPacking:US,RGBFormat:Bp,RGBIntegerFormat:PS,RGB_BPTC_SIGNED_Format:rh,RGB_BPTC_UNSIGNED_Format:sh,RGB_ETC1_Format:Fu,RGB_ETC2_Format:Bu,RGB_PVRTC_2BPPV1_Format:Du,RGB_PVRTC_4BPPV1_Format:Nu,RGB_S3TC_DXT1_Format:Xa,RGDepthPacking:OS,RGFormat:es,RGIntegerFormat:Eh,RawShaderMaterial:sm,Ray:Gs,Raycaster:jx,RectAreaLight:Hx,RedFormat:wh,RedIntegerFormat:_l,ReinhardToneMapping:Ap,RenderObjectRefreshType:dM,RenderTarget:Wp,RenderTarget3D:GE,RepeatWrapping:Qa,ReplaceStencilOp:HS,ReverseSubtractEquation:_v,RingGeometry:Wh,SIGNED_R11_EAC_Format:Hu,SIGNED_RED_GREEN_RGTC2_Format:lh,SIGNED_RED_RGTC1_Format:ah,SIGNED_RG11_EAC_Format:Vu,SRGBColorSpace:ri,SRGBTransfer:Wt,Scene:Xp,ShaderChunk:At,ShaderLib:ki,ShaderMaterial:fr,ShadowMaterial:xx,Shape:Ml,ShapeGeometry:Xh,ShapePath:u1,ShapeUtils:Vi,ShortType:Dp,Skeleton:Dh,SkeletonHelper:KE,SkinnedMesh:ix,Source:FM,Sphere:yn,SphereGeometry:El,Spherical:vp,SphericalHarmonics3:dm,SplineCurve:im,SpotLight:Fx,SpotLightHelper:JE,Sprite:tx,SpriteMaterial:Zp,SrcAlphaFactor:Ep,SrcAlphaSaturateFactor:Cv,SrcColorFactor:Mv,StaticCopyUsage:sM,StaticDrawUsage:Ah,StaticReadUsage:nM,StereoCamera:EE,StreamCopyUsage:aM,StreamDrawUsage:tM,StreamReadUsage:rM,StringKeyframeTrack:qs,SubtractEquation:gv,SubtractiveBlending:ap,TOUCH:As,TangentSpaceNormalMap:Ur,TetrahedronGeometry:Yh,Texture:sn,TextureLoader:gE,TextureSource:ur,TextureUtils:g1,Timer:Xx,TimestampQuery:cM,TorusGeometry:qh,TorusKnotGeometry:Zh,Triangle:si,TriangleFanDrawMode:NS,TriangleStripDrawMode:LS,TrianglesDrawMode:IS,TubeGeometry:jh,UVMapping:xh,Uint16BufferAttribute:Yp,Uint32BufferAttribute:qp,Uint8BufferAttribute:QM,Uint8ClampedBufferAttribute:$M,Uniform:vm,UniformsGroup:XE,UniformsLib:ke,UniformsUtils:dh,UnsignedByteType:qn,UnsignedInt101111Type:Op,UnsignedInt248Type:Bs,UnsignedInt5999Type:Up,UnsignedIntType:Pi,UnsignedShort4444Type:Sh,UnsignedShort5551Type:Mh,UnsignedShortType:Yo,VSMShadowMap:Rs,Vector2:me,Vector3:O,Vector4:Ot,VectorKeyframeTrack:hm,VideoFrameTexture:Sw,VideoTexture:lx,WebGL3DRenderTarget:kM,WebGLArrayRenderTarget:zM,WebGLCoordinateSystem:gi,WebGLCubeRenderTarget:ef,WebGLRenderTarget:vi,WebGLRenderer:fy,WebGLUtils:uy,WebGPUCoordinateSystem:zs,WebXRController:wu,WireframeGeometry:rm,WrapAroundEnding:il,ZeroCurvatureEnding:Ps,ZeroFactor:yv,ZeroSlopeEnding:Is,ZeroStencilOp:kS,createCanvasElement:Zv,error:nt,getConsoleFunction:_M,log:al,setConsoleFunction:gM,warn:Be,warnOnce:Ir},Symbol.toStringTag,{value:"Module"}));var dy={exports:{}},Zs={};/**
 * @license React
 * react-reconciler-constants.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */Zs.ConcurrentRoot=1;Zs.ContinuousEventPriority=4;Zs.DefaultEventPriority=16;Zs.DiscreteEventPriority=1;Zs.IdleEventPriority=536870912;Zs.LegacyRoot=0;dy.exports=Zs;var Ho=dy.exports;function cR(r){let e;const t=new Set,n=(h,f)=>{const p=typeof h=="function"?h(e):h;if(p!==e){const m=e;e=f?p:Object.assign({},e,p),t.forEach(g=>g(e,m))}},i=()=>e,s=(h,f=i,p=Object.is)=>{console.warn("[DEPRECATED] Please use `subscribeWithSelector` middleware");let m=f(e);function g(){const v=f(e);if(!p(m,v)){const M=m;h(m=v,M)}}return t.add(g),()=>t.delete(g)},u={setState:n,getState:i,subscribe:(h,f,p)=>f||p?s(h,f,p):(t.add(h),()=>t.delete(h)),destroy:()=>t.clear()};return e=r(n,i,u),u}const uR=typeof window>"u"||!window.navigator||/ServerSideRendering|^Deno\//.test(window.navigator.userAgent),z_=uR?De.useEffect:De.useLayoutEffect;function hR(r){const e=typeof r=="function"?cR(r):r,t=(n=e.getState,i=Object.is)=>{const[,s]=De.useReducer(y=>y+1,0),o=e.getState(),c=De.useRef(o),u=De.useRef(n),h=De.useRef(i),f=De.useRef(!1),p=De.useRef();p.current===void 0&&(p.current=n(o));let m,g=!1;(c.current!==o||u.current!==n||h.current!==i||f.current)&&(m=n(o),g=!i(p.current,m)),z_(()=>{g&&(p.current=m),c.current=o,u.current=n,h.current=i,f.current=!1});const v=De.useRef(o);z_(()=>{const y=()=>{try{const w=e.getState(),b=u.current(w);h.current(p.current,b)||(c.current=w,p.current=b,s())}catch{f.current=!0,s()}},x=e.subscribe(y);return e.getState()!==v.current&&y(),x},[]);const M=g?m:p.current;return De.useDebugValue(M),M};return Object.assign(t,e),t[Symbol.iterator]=function(){console.warn("[useStore, api] = create() is deprecated and will be removed in v4");const n=[t,e];return{next(){const i=n.length<=0;return{value:n.shift(),done:i}}}},t}var py={exports:{}},Yd={exports:{}},qd={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var k_;function fR(){return k_||(k_=1,function(r){function e(k,G){var W=k.length;k.push(G);e:for(;0<W;){var J=W-1>>>1,_e=k[J];if(0<i(_e,G))k[J]=G,k[W]=_e,W=J;else break e}}function t(k){return k.length===0?null:k[0]}function n(k){if(k.length===0)return null;var G=k[0],W=k.pop();if(W!==G){k[0]=W;e:for(var J=0,_e=k.length,Te=_e>>>1;J<Te;){var ae=2*(J+1)-1,Me=k[ae],Pe=ae+1,Ye=k[Pe];if(0>i(Me,W))Pe<_e&&0>i(Ye,Me)?(k[J]=Ye,k[Pe]=W,J=Pe):(k[J]=Me,k[ae]=W,J=ae);else if(Pe<_e&&0>i(Ye,W))k[J]=Ye,k[Pe]=W,J=Pe;else break e}}return G}function i(k,G){var W=k.sortIndex-G.sortIndex;return W!==0?W:k.id-G.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;r.unstable_now=function(){return s.now()}}else{var o=Date,c=o.now();r.unstable_now=function(){return o.now()-c}}var u=[],h=[],f=1,p=null,m=3,g=!1,v=!1,M=!1,y=typeof setTimeout=="function"?setTimeout:null,x=typeof clearTimeout=="function"?clearTimeout:null,w=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function b(k){for(var G=t(h);G!==null;){if(G.callback===null)n(h);else if(G.startTime<=k)n(h),G.sortIndex=G.expirationTime,e(u,G);else break;G=t(h)}}function T(k){if(M=!1,b(k),!v)if(t(u)!==null)v=!0,oe(P);else{var G=t(h);G!==null&&te(T,G.startTime-k)}}function P(k,G){v=!1,M&&(M=!1,x(C),C=-1),g=!0;var W=m;try{for(b(G),p=t(u);p!==null&&(!(p.expirationTime>G)||k&&!D());){var J=p.callback;if(typeof J=="function"){p.callback=null,m=p.priorityLevel;var _e=J(p.expirationTime<=G);G=r.unstable_now(),typeof _e=="function"?p.callback=_e:p===t(u)&&n(u),b(G)}else n(u);p=t(u)}if(p!==null)var Te=!0;else{var ae=t(h);ae!==null&&te(T,ae.startTime-G),Te=!1}return Te}finally{p=null,m=W,g=!1}}var R=!1,E=null,C=-1,B=5,N=-1;function D(){return!(r.unstable_now()-N<B)}function Y(){if(E!==null){var k=r.unstable_now();N=k;var G=!0;try{G=E(!0,k)}finally{G?K():(R=!1,E=null)}}else R=!1}var K;if(typeof w=="function")K=function(){w(Y)};else if(typeof MessageChannel<"u"){var H=new MessageChannel,ne=H.port2;H.port1.onmessage=Y,K=function(){ne.postMessage(null)}}else K=function(){y(Y,0)};function oe(k){E=k,R||(R=!0,K())}function te(k,G){C=y(function(){k(r.unstable_now())},G)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(k){k.callback=null},r.unstable_continueExecution=function(){v||g||(v=!0,oe(P))},r.unstable_forceFrameRate=function(k){0>k||125<k?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):B=0<k?Math.floor(1e3/k):5},r.unstable_getCurrentPriorityLevel=function(){return m},r.unstable_getFirstCallbackNode=function(){return t(u)},r.unstable_next=function(k){switch(m){case 1:case 2:case 3:var G=3;break;default:G=m}var W=m;m=G;try{return k()}finally{m=W}},r.unstable_pauseExecution=function(){},r.unstable_requestPaint=function(){},r.unstable_runWithPriority=function(k,G){switch(k){case 1:case 2:case 3:case 4:case 5:break;default:k=3}var W=m;m=k;try{return G()}finally{m=W}},r.unstable_scheduleCallback=function(k,G,W){var J=r.unstable_now();switch(typeof W=="object"&&W!==null?(W=W.delay,W=typeof W=="number"&&0<W?J+W:J):W=J,k){case 1:var _e=-1;break;case 2:_e=250;break;case 5:_e=1073741823;break;case 4:_e=1e4;break;default:_e=5e3}return _e=W+_e,k={id:f++,callback:G,priorityLevel:k,startTime:W,expirationTime:_e,sortIndex:-1},W>J?(k.sortIndex=W,e(h,k),t(u)===null&&k===t(h)&&(M?(x(C),C=-1):M=!0,te(T,W-J))):(k.sortIndex=_e,e(u,k),v||g||(v=!0,oe(P))),k},r.unstable_shouldYield=D,r.unstable_wrapCallback=function(k){var G=m;return function(){var W=m;m=G;try{return k.apply(this,arguments)}finally{m=W}}}}(qd)),qd}var H_;function dR(){return H_||(H_=1,Yd.exports=fR()),Yd.exports}/**
 * @license React
 * react-reconciler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var pR=function(e){var t={},n=De,i=dR(),s=Object.assign;function o(a){for(var l="https://reactjs.org/docs/error-decoder.html?invariant="+a,d=1;d<arguments.length;d++)l+="&args[]="+encodeURIComponent(arguments[d]);return"Minified React error #"+a+"; visit "+l+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var c=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,u=Symbol.for("react.element"),h=Symbol.for("react.portal"),f=Symbol.for("react.fragment"),p=Symbol.for("react.strict_mode"),m=Symbol.for("react.profiler"),g=Symbol.for("react.provider"),v=Symbol.for("react.context"),M=Symbol.for("react.forward_ref"),y=Symbol.for("react.suspense"),x=Symbol.for("react.suspense_list"),w=Symbol.for("react.memo"),b=Symbol.for("react.lazy"),T=Symbol.for("react.offscreen"),P=Symbol.iterator;function R(a){return a===null||typeof a!="object"?null:(a=P&&a[P]||a["@@iterator"],typeof a=="function"?a:null)}function E(a){if(a==null)return null;if(typeof a=="function")return a.displayName||a.name||null;if(typeof a=="string")return a;switch(a){case f:return"Fragment";case h:return"Portal";case m:return"Profiler";case p:return"StrictMode";case y:return"Suspense";case x:return"SuspenseList"}if(typeof a=="object")switch(a.$$typeof){case v:return(a.displayName||"Context")+".Consumer";case g:return(a._context.displayName||"Context")+".Provider";case M:var l=a.render;return a=a.displayName,a||(a=l.displayName||l.name||"",a=a!==""?"ForwardRef("+a+")":"ForwardRef"),a;case w:return l=a.displayName||null,l!==null?l:E(a.type)||"Memo";case b:l=a._payload,a=a._init;try{return E(a(l))}catch{}}return null}function C(a){var l=a.type;switch(a.tag){case 24:return"Cache";case 9:return(l.displayName||"Context")+".Consumer";case 10:return(l._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return a=l.render,a=a.displayName||a.name||"",l.displayName||(a!==""?"ForwardRef("+a+")":"ForwardRef");case 7:return"Fragment";case 5:return l;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return E(l);case 8:return l===p?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof l=="function")return l.displayName||l.name||null;if(typeof l=="string")return l}return null}function B(a){var l=a,d=a;if(a.alternate)for(;l.return;)l=l.return;else{a=l;do l=a,l.flags&4098&&(d=l.return),a=l.return;while(a)}return l.tag===3?d:null}function N(a){if(B(a)!==a)throw Error(o(188))}function D(a){var l=a.alternate;if(!l){if(l=B(a),l===null)throw Error(o(188));return l!==a?null:a}for(var d=a,_=l;;){var S=d.return;if(S===null)break;var A=S.alternate;if(A===null){if(_=S.return,_!==null){d=_;continue}break}if(S.child===A.child){for(A=S.child;A;){if(A===d)return N(S),a;if(A===_)return N(S),l;A=A.sibling}throw Error(o(188))}if(d.return!==_.return)d=S,_=A;else{for(var z=!1,j=S.child;j;){if(j===d){z=!0,d=S,_=A;break}if(j===_){z=!0,_=S,d=A;break}j=j.sibling}if(!z){for(j=A.child;j;){if(j===d){z=!0,d=A,_=S;break}if(j===_){z=!0,_=A,d=S;break}j=j.sibling}if(!z)throw Error(o(189))}}if(d.alternate!==_)throw Error(o(190))}if(d.tag!==3)throw Error(o(188));return d.stateNode.current===d?a:l}function Y(a){return a=D(a),a!==null?K(a):null}function K(a){if(a.tag===5||a.tag===6)return a;for(a=a.child;a!==null;){var l=K(a);if(l!==null)return l;a=a.sibling}return null}function H(a){if(a.tag===5||a.tag===6)return a;for(a=a.child;a!==null;){if(a.tag!==4){var l=H(a);if(l!==null)return l}a=a.sibling}return null}var ne=Array.isArray,oe=e.getPublicInstance,te=e.getRootHostContext,k=e.getChildHostContext,G=e.prepareForCommit,W=e.resetAfterCommit,J=e.createInstance,_e=e.appendInitialChild,Te=e.finalizeInitialChildren,ae=e.prepareUpdate,Me=e.shouldSetTextContent,Pe=e.createTextInstance,Ye=e.scheduleTimeout,Ue=e.cancelTimeout,et=e.noTimeout,kt=e.isPrimaryRenderer,Ke=e.supportsMutation,gt=e.supportsPersistence,ot=e.supportsHydration,ge=e.getInstanceFromNode,Ie=e.preparePortalMount,Ce=e.getCurrentEventPriority,Ge=e.detachDeletedInstance,Ne=e.supportsMicrotasks,pt=e.scheduleMicrotask,Ze=e.supportsTestSelectors,Et=e.findFiberRoot,bt=e.getBoundingRect,It=e.getTextContent,q=e.isHiddenSubtree,Kt=e.matchAccessibilityRole,St=e.setFocusIfFocusable,Ht=e.setupIntersectionObserver,Le=e.appendChild,Zt=e.appendChildToContainer,it=e.commitTextUpdate,at=e.commitMount,F=e.commitUpdate,I=e.insertBefore,ie=e.insertInContainerBefore,ve=e.removeChild,U=e.removeChildFromContainer,re=e.resetTextContent,fe=e.hideInstance,se=e.hideTextInstance,ce=e.unhideInstance,Ee=e.unhideTextInstance,V=e.clearContainer,pe=e.cloneInstance,ue=e.createContainerChildSet,we=e.appendChildToContainerChildSet,xe=e.finalizeContainerChildren,be=e.replaceContainerChildren,je=e.cloneHiddenInstance,ht=e.cloneHiddenTextInstance,ye=e.canHydrateInstance,st=e.canHydrateTextInstance,vt=e.canHydrateSuspenseInstance,ze=e.isSuspenseInstancePending,Ft=e.isSuspenseInstanceFallback,fn=e.registerSuspenseInstanceRetry,Qn=e.getNextHydratableSibling,Cl=e.getFirstHydratableChild,na=e.getFirstHydratableChildWithinContainer,rf=e.getFirstHydratableChildWithinSuspenseInstance,Rl=e.hydrateInstance,Pl=e.hydrateTextInstance,pr=e.hydrateSuspenseInstance,ia=e.getNextHydratableInstanceAfterSuspenseInstance,ra=e.commitHydratedContainer,Il=e.commitHydratedSuspenseInstance,js=e.clearSuspenseBoundary,Ll=e.clearSuspenseBoundaryFromContainer,Nl=e.shouldDeleteUnhydratedTailInstances,ss=e.didNotMatchHydratedContainerTextInstance,sf=e.didNotMatchHydratedTextInstance,Js;function Fr(a){if(Js===void 0)try{throw Error()}catch(d){var l=d.stack.trim().match(/\n( *(at )?)/);Js=l&&l[1]||""}return`
`+Js+a}var sa=!1;function oa(a,l){if(!a||sa)return"";sa=!0;var d=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(l)if(l=function(){throw Error()},Object.defineProperty(l.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(l,[])}catch(Re){var _=Re}Reflect.construct(a,[],l)}else{try{l.call()}catch(Re){_=Re}a.call(l.prototype)}else{try{throw Error()}catch(Re){_=Re}a()}}catch(Re){if(Re&&_&&typeof Re.stack=="string"){for(var S=Re.stack.split(`
`),A=_.stack.split(`
`),z=S.length-1,j=A.length-1;1<=z&&0<=j&&S[z]!==A[j];)j--;for(;1<=z&&0<=j;z--,j--)if(S[z]!==A[j]){if(z!==1||j!==1)do if(z--,j--,0>j||S[z]!==A[j]){var de=`
`+S[z].replace(" at new "," at ");return a.displayName&&de.includes("<anonymous>")&&(de=de.replace("<anonymous>",a.displayName)),de}while(1<=z&&0<=j);break}}}finally{sa=!1,Error.prepareStackTrace=d}return(a=a?a.displayName||a.name:"")?Fr(a):""}var of=Object.prototype.hasOwnProperty,Ks=[],L=-1;function X(a){return{current:a}}function $(a){0>L||(a.current=Ks[L],Ks[L]=null,L--)}function Z(a,l){L++,Ks[L]=a.current,a.current=l}var ee={},Se=X(ee),Fe=X(!1),Ae=ee;function Oe(a,l){var d=a.type.contextTypes;if(!d)return ee;var _=a.stateNode;if(_&&_.__reactInternalMemoizedUnmaskedChildContext===l)return _.__reactInternalMemoizedMaskedChildContext;var S={},A;for(A in d)S[A]=l[A];return _&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=l,a.__reactInternalMemoizedMaskedChildContext=S),S}function He(a){return a=a.childContextTypes,a!=null}function ft(){$(Fe),$(Se)}function Rt(a,l,d){if(Se.current!==ee)throw Error(o(168));Z(Se,l),Z(Fe,d)}function Je(a,l,d){var _=a.stateNode;if(l=l.childContextTypes,typeof _.getChildContext!="function")return d;_=_.getChildContext();for(var S in _)if(!(S in l))throw Error(o(108,C(a)||"Unknown",S));return s({},d,_)}function Tt(a){return a=(a=a.stateNode)&&a.__reactInternalMemoizedMergedChildContext||ee,Ae=Se.current,Z(Se,a),Z(Fe,Fe.current),!0}function $t(a,l,d){var _=a.stateNode;if(!_)throw Error(o(169));d?(a=Je(a,l,Ae),_.__reactInternalMemoizedMergedChildContext=a,$(Fe),$(Se),Z(Se,a)):$(Fe),Z(Fe,d)}var Lt=Math.clz32?Math.clz32:Qe,Xt=Math.log,En=Math.LN2;function Qe(a){return a>>>=0,a===0?32:31-(Xt(a)/En|0)|0}var dn=64,Ut=4194304;function li(a){switch(a&-a){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return a&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return a&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return a}}function ln(a,l){var d=a.pendingLanes;if(d===0)return 0;var _=0,S=a.suspendedLanes,A=a.pingedLanes,z=d&268435455;if(z!==0){var j=z&~S;j!==0?_=li(j):(A&=z,A!==0&&(_=li(A)))}else z=d&~S,z!==0?_=li(z):A!==0&&(_=li(A));if(_===0)return 0;if(l!==0&&l!==_&&!(l&S)&&(S=_&-_,A=l&-l,S>=A||S===16&&(A&4194240)!==0))return l;if(_&4&&(_|=d&16),l=a.entangledLanes,l!==0)for(a=a.entanglements,l&=_;0<l;)d=31-Lt(l),S=1<<d,_|=a[d],l&=~S;return _}function Qs(a,l){switch(a){case 1:case 2:case 4:return l+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return l+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Zi(a,l){for(var d=a.suspendedLanes,_=a.pingedLanes,S=a.expirationTimes,A=a.pendingLanes;0<A;){var z=31-Lt(A),j=1<<z,de=S[z];de===-1?(!(j&d)||j&_)&&(S[z]=Qs(j,l)):de<=l&&(a.expiredLanes|=j),A&=~j}}function Ni(a){return a=a.pendingLanes&-1073741825,a!==0?a:a&1073741824?1073741824:0}function Nt(a){for(var l=[],d=0;31>d;d++)l.push(a);return l}function en(a,l,d){a.pendingLanes|=l,l!==536870912&&(a.suspendedLanes=0,a.pingedLanes=0),a=a.eventTimes,l=31-Lt(l),a[l]=d}function ci(a,l){var d=a.pendingLanes&~l;a.pendingLanes=l,a.suspendedLanes=0,a.pingedLanes=0,a.expiredLanes&=l,a.mutableReadLanes&=l,a.entangledLanes&=l,l=a.entanglements;var _=a.eventTimes;for(a=a.expirationTimes;0<d;){var S=31-Lt(d),A=1<<S;l[S]=0,_[S]=-1,a[S]=-1,d&=~A}}function Yt(a,l){var d=a.entangledLanes|=l;for(a=a.entanglements;d;){var _=31-Lt(d),S=1<<_;S&l|a[_]&l&&(a[_]|=l),d&=~S}}var ut=0;function xi(a){return a&=-a,1<a?4<a?a&268435455?16:536870912:4:1}var $s=i.unstable_scheduleCallback,Cm=i.unstable_cancelCallback,By=i.unstable_shouldYield,zy=i.unstable_requestPaint,bn=i.unstable_now,af=i.unstable_ImmediatePriority,ky=i.unstable_UserBlockingPriority,lf=i.unstable_NormalPriority,Hy=i.unstable_IdlePriority,Dl=null,ji=null;function Vy(a){if(ji&&typeof ji.onCommitFiberRoot=="function")try{ji.onCommitFiberRoot(Dl,a,void 0,(a.current.flags&128)===128)}catch{}}function Gy(a,l){return a===l&&(a!==0||1/a===1/l)||a!==a&&l!==l}var Ji=typeof Object.is=="function"?Object.is:Gy,mr=null,Ul=!1,cf=!1;function Rm(a){mr===null?mr=[a]:mr.push(a)}function Wy(a){Ul=!0,Rm(a)}function Ki(){if(!cf&&mr!==null){cf=!0;var a=0,l=ut;try{var d=mr;for(ut=1;a<d.length;a++){var _=d[a];do _=_(!0);while(_!==null)}mr=null,Ul=!1}catch(S){throw mr!==null&&(mr=mr.slice(a+1)),$s(af,Ki),S}finally{ut=l,cf=!1}}return null}var Xy=c.ReactCurrentBatchConfig;function Ol(a,l){if(Ji(a,l))return!0;if(typeof a!="object"||a===null||typeof l!="object"||l===null)return!1;var d=Object.keys(a),_=Object.keys(l);if(d.length!==_.length)return!1;for(_=0;_<d.length;_++){var S=d[_];if(!of.call(l,S)||!Ji(a[S],l[S]))return!1}return!0}function Yy(a){switch(a.tag){case 5:return Fr(a.type);case 16:return Fr("Lazy");case 13:return Fr("Suspense");case 19:return Fr("SuspenseList");case 0:case 2:case 15:return a=oa(a.type,!1),a;case 11:return a=oa(a.type.render,!1),a;case 1:return a=oa(a.type,!0),a;default:return""}}function Di(a,l){if(a&&a.defaultProps){l=s({},l),a=a.defaultProps;for(var d in a)l[d]===void 0&&(l[d]=a[d]);return l}return l}var Fl=X(null),Bl=null,eo=null,uf=null;function hf(){uf=eo=Bl=null}function Pm(a,l,d){kt?(Z(Fl,l._currentValue),l._currentValue=d):(Z(Fl,l._currentValue2),l._currentValue2=d)}function ff(a){var l=Fl.current;$(Fl),kt?a._currentValue=l:a._currentValue2=l}function df(a,l,d){for(;a!==null;){var _=a.alternate;if((a.childLanes&l)!==l?(a.childLanes|=l,_!==null&&(_.childLanes|=l)):_!==null&&(_.childLanes&l)!==l&&(_.childLanes|=l),a===d)break;a=a.return}}function to(a,l){Bl=a,uf=eo=null,a=a.dependencies,a!==null&&a.firstContext!==null&&(a.lanes&l&&(fi=!0),a.firstContext=null)}function yi(a){var l=kt?a._currentValue:a._currentValue2;if(uf!==a)if(a={context:a,memoizedValue:l,next:null},eo===null){if(Bl===null)throw Error(o(308));eo=a,Bl.dependencies={lanes:0,firstContext:a}}else eo=eo.next=a;return l}var Qi=null,Br=!1;function pf(a){a.updateQueue={baseState:a.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Im(a,l){a=a.updateQueue,l.updateQueue===a&&(l.updateQueue={baseState:a.baseState,firstBaseUpdate:a.firstBaseUpdate,lastBaseUpdate:a.lastBaseUpdate,shared:a.shared,effects:a.effects})}function gr(a,l){return{eventTime:a,lane:l,tag:0,payload:null,callback:null,next:null}}function zr(a,l){var d=a.updateQueue;d!==null&&(d=d.shared,pn!==null&&a.mode&1&&!(Pt&2)?(a=d.interleaved,a===null?(l.next=l,Qi===null?Qi=[d]:Qi.push(d)):(l.next=a.next,a.next=l),d.interleaved=l):(a=d.pending,a===null?l.next=l:(l.next=a.next,a.next=l),d.pending=l))}function zl(a,l,d){if(l=l.updateQueue,l!==null&&(l=l.shared,(d&4194240)!==0)){var _=l.lanes;_&=a.pendingLanes,d|=_,l.lanes=d,Yt(a,d)}}function Lm(a,l){var d=a.updateQueue,_=a.alternate;if(_!==null&&(_=_.updateQueue,d===_)){var S=null,A=null;if(d=d.firstBaseUpdate,d!==null){do{var z={eventTime:d.eventTime,lane:d.lane,tag:d.tag,payload:d.payload,callback:d.callback,next:null};A===null?S=A=z:A=A.next=z,d=d.next}while(d!==null);A===null?S=A=l:A=A.next=l}else S=A=l;d={baseState:_.baseState,firstBaseUpdate:S,lastBaseUpdate:A,shared:_.shared,effects:_.effects},a.updateQueue=d;return}a=d.lastBaseUpdate,a===null?d.firstBaseUpdate=l:a.next=l,d.lastBaseUpdate=l}function kl(a,l,d,_){var S=a.updateQueue;Br=!1;var A=S.firstBaseUpdate,z=S.lastBaseUpdate,j=S.shared.pending;if(j!==null){S.shared.pending=null;var de=j,Re=de.next;de.next=null,z===null?A=Re:z.next=Re,z=de;var $e=a.alternate;$e!==null&&($e=$e.updateQueue,j=$e.lastBaseUpdate,j!==z&&(j===null?$e.firstBaseUpdate=Re:j.next=Re,$e.lastBaseUpdate=de))}if(A!==null){var xt=S.baseState;z=0,$e=Re=de=null,j=A;do{var lt=j.lane,qt=j.eventTime;if((_&lt)===lt){$e!==null&&($e=$e.next={eventTime:qt,lane:0,tag:j.tag,payload:j.payload,callback:j.callback,next:null});e:{var rt=a,Bn=j;switch(lt=l,qt=d,Bn.tag){case 1:if(rt=Bn.payload,typeof rt=="function"){xt=rt.call(qt,xt,lt);break e}xt=rt;break e;case 3:rt.flags=rt.flags&-65537|128;case 0:if(rt=Bn.payload,lt=typeof rt=="function"?rt.call(qt,xt,lt):rt,lt==null)break e;xt=s({},xt,lt);break e;case 2:Br=!0}}j.callback!==null&&j.lane!==0&&(a.flags|=64,lt=S.effects,lt===null?S.effects=[j]:lt.push(j))}else qt={eventTime:qt,lane:lt,tag:j.tag,payload:j.payload,callback:j.callback,next:null},$e===null?(Re=$e=qt,de=xt):$e=$e.next=qt,z|=lt;if(j=j.next,j===null){if(j=S.shared.pending,j===null)break;lt=j,j=lt.next,lt.next=null,S.lastBaseUpdate=lt,S.shared.pending=null}}while(!0);if($e===null&&(de=xt),S.baseState=de,S.firstBaseUpdate=Re,S.lastBaseUpdate=$e,l=S.shared.interleaved,l!==null){S=l;do z|=S.lane,S=S.next;while(S!==l)}else A===null&&(S.shared.lanes=0);uo|=z,a.lanes=z,a.memoizedState=xt}}function Nm(a,l,d){if(a=l.effects,l.effects=null,a!==null)for(l=0;l<a.length;l++){var _=a[l],S=_.callback;if(S!==null){if(_.callback=null,_=d,typeof S!="function")throw Error(o(191,S));S.call(_)}}}var Dm=new n.Component().refs;function mf(a,l,d,_){l=a.memoizedState,d=d(_,l),d=d==null?l:s({},l,d),a.memoizedState=d,a.lanes===0&&(a.updateQueue.baseState=d)}var Hl={isMounted:function(a){return(a=a._reactInternals)?B(a)===a:!1},enqueueSetState:function(a,l,d){a=a._reactInternals;var _=Wn(),S=Vr(a),A=gr(_,S);A.payload=l,d!=null&&(A.callback=d),zr(a,A),l=bi(a,S,_),l!==null&&zl(l,a,S)},enqueueReplaceState:function(a,l,d){a=a._reactInternals;var _=Wn(),S=Vr(a),A=gr(_,S);A.tag=1,A.payload=l,d!=null&&(A.callback=d),zr(a,A),l=bi(a,S,_),l!==null&&zl(l,a,S)},enqueueForceUpdate:function(a,l){a=a._reactInternals;var d=Wn(),_=Vr(a),S=gr(d,_);S.tag=2,l!=null&&(S.callback=l),zr(a,S),l=bi(a,_,d),l!==null&&zl(l,a,_)}};function Um(a,l,d,_,S,A,z){return a=a.stateNode,typeof a.shouldComponentUpdate=="function"?a.shouldComponentUpdate(_,A,z):l.prototype&&l.prototype.isPureReactComponent?!Ol(d,_)||!Ol(S,A):!0}function Om(a,l,d){var _=!1,S=ee,A=l.contextType;return typeof A=="object"&&A!==null?A=yi(A):(S=He(l)?Ae:Se.current,_=l.contextTypes,A=(_=_!=null)?Oe(a,S):ee),l=new l(d,A),a.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,l.updater=Hl,a.stateNode=l,l._reactInternals=a,_&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=S,a.__reactInternalMemoizedMaskedChildContext=A),l}function Fm(a,l,d,_){a=l.state,typeof l.componentWillReceiveProps=="function"&&l.componentWillReceiveProps(d,_),typeof l.UNSAFE_componentWillReceiveProps=="function"&&l.UNSAFE_componentWillReceiveProps(d,_),l.state!==a&&Hl.enqueueReplaceState(l,l.state,null)}function gf(a,l,d,_){var S=a.stateNode;S.props=d,S.state=a.memoizedState,S.refs=Dm,pf(a);var A=l.contextType;typeof A=="object"&&A!==null?S.context=yi(A):(A=He(l)?Ae:Se.current,S.context=Oe(a,A)),S.state=a.memoizedState,A=l.getDerivedStateFromProps,typeof A=="function"&&(mf(a,l,A,d),S.state=a.memoizedState),typeof l.getDerivedStateFromProps=="function"||typeof S.getSnapshotBeforeUpdate=="function"||typeof S.UNSAFE_componentWillMount!="function"&&typeof S.componentWillMount!="function"||(l=S.state,typeof S.componentWillMount=="function"&&S.componentWillMount(),typeof S.UNSAFE_componentWillMount=="function"&&S.UNSAFE_componentWillMount(),l!==S.state&&Hl.enqueueReplaceState(S,S.state,null),kl(a,d,S,_),S.state=a.memoizedState),typeof S.componentDidMount=="function"&&(a.flags|=4194308)}var no=[],io=0,Vl=null,Gl=0,Si=[],Mi=0,os=null,_r=1,vr="";function as(a,l){no[io++]=Gl,no[io++]=Vl,Vl=a,Gl=l}function Bm(a,l,d){Si[Mi++]=_r,Si[Mi++]=vr,Si[Mi++]=os,os=a;var _=_r;a=vr;var S=32-Lt(_)-1;_&=~(1<<S),d+=1;var A=32-Lt(l)+S;if(30<A){var z=S-S%5;A=(_&(1<<z)-1).toString(32),_>>=z,S-=z,_r=1<<32-Lt(l)+S|d<<S|_,vr=A+a}else _r=1<<A|d<<S|_,vr=a}function _f(a){a.return!==null&&(as(a,1),Bm(a,1,0))}function vf(a){for(;a===Vl;)Vl=no[--io],no[io]=null,Gl=no[--io],no[io]=null;for(;a===os;)os=Si[--Mi],Si[Mi]=null,vr=Si[--Mi],Si[Mi]=null,_r=Si[--Mi],Si[Mi]=null}var ui=null,hi=null,Qt=!1,aa=!1,Ui=null;function zm(a,l){var d=Ti(5,null,null,0);d.elementType="DELETED",d.stateNode=l,d.return=a,l=a.deletions,l===null?(a.deletions=[d],a.flags|=16):l.push(d)}function km(a,l){switch(a.tag){case 5:return l=ye(l,a.type,a.pendingProps),l!==null?(a.stateNode=l,ui=a,hi=Cl(l),!0):!1;case 6:return l=st(l,a.pendingProps),l!==null?(a.stateNode=l,ui=a,hi=null,!0):!1;case 13:if(l=vt(l),l!==null){var d=os!==null?{id:_r,overflow:vr}:null;return a.memoizedState={dehydrated:l,treeContext:d,retryLane:1073741824},d=Ti(18,null,null,0),d.stateNode=l,d.return=a,a.child=d,ui=a,hi=null,!0}return!1;default:return!1}}function xf(a){return(a.mode&1)!==0&&(a.flags&128)===0}function yf(a){if(Qt){var l=hi;if(l){var d=l;if(!km(a,l)){if(xf(a))throw Error(o(418));l=Qn(d);var _=ui;l&&km(a,l)?zm(_,d):(a.flags=a.flags&-4097|2,Qt=!1,ui=a)}}else{if(xf(a))throw Error(o(418));a.flags=a.flags&-4097|2,Qt=!1,ui=a}}}function Hm(a){for(a=a.return;a!==null&&a.tag!==5&&a.tag!==3&&a.tag!==13;)a=a.return;ui=a}function la(a){if(!ot||a!==ui)return!1;if(!Qt)return Hm(a),Qt=!0,!1;if(a.tag!==3&&(a.tag!==5||Nl(a.type)&&!Me(a.type,a.memoizedProps))){var l=hi;if(l){if(xf(a)){for(a=hi;a;)a=Qn(a);throw Error(o(418))}for(;l;)zm(a,l),l=Qn(l)}}if(Hm(a),a.tag===13){if(!ot)throw Error(o(316));if(a=a.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(o(317));hi=ia(a)}else hi=ui?Qn(a.stateNode):null;return!0}function ro(){ot&&(hi=ui=null,aa=Qt=!1)}function Sf(a){Ui===null?Ui=[a]:Ui.push(a)}function ca(a,l,d){if(a=d.ref,a!==null&&typeof a!="function"&&typeof a!="object"){if(d._owner){if(d=d._owner,d){if(d.tag!==1)throw Error(o(309));var _=d.stateNode}if(!_)throw Error(o(147,a));var S=_,A=""+a;return l!==null&&l.ref!==null&&typeof l.ref=="function"&&l.ref._stringRef===A?l.ref:(l=function(z){var j=S.refs;j===Dm&&(j=S.refs={}),z===null?delete j[A]:j[A]=z},l._stringRef=A,l)}if(typeof a!="string")throw Error(o(284));if(!d._owner)throw Error(o(290,a))}return a}function Wl(a,l){throw a=Object.prototype.toString.call(l),Error(o(31,a==="[object Object]"?"object with keys {"+Object.keys(l).join(", ")+"}":a))}function Vm(a){var l=a._init;return l(a._payload)}function Gm(a){function l(le,Q){if(a){var he=le.deletions;he===null?(le.deletions=[Q],le.flags|=16):he.push(Q)}}function d(le,Q){if(!a)return null;for(;Q!==null;)l(le,Q),Q=Q.sibling;return null}function _(le,Q){for(le=new Map;Q!==null;)Q.key!==null?le.set(Q.key,Q):le.set(Q.index,Q),Q=Q.sibling;return le}function S(le,Q){return le=Wr(le,Q),le.index=0,le.sibling=null,le}function A(le,Q,he){return le.index=he,a?(he=le.alternate,he!==null?(he=he.index,he<Q?(le.flags|=2,Q):he):(le.flags|=2,Q)):(le.flags|=1048576,Q)}function z(le){return a&&le.alternate===null&&(le.flags|=2),le}function j(le,Q,he,We){return Q===null||Q.tag!==6?(Q=rd(he,le.mode,We),Q.return=le,Q):(Q=S(Q,he),Q.return=le,Q)}function de(le,Q,he,We){var tt=he.type;return tt===f?$e(le,Q,he.props.children,We,he.key):Q!==null&&(Q.elementType===tt||typeof tt=="object"&&tt!==null&&tt.$$typeof===b&&Vm(tt)===Q.type)?(We=S(Q,he.props),We.ref=ca(le,Q,he),We.return=le,We):(We=Sc(he.type,he.key,he.props,null,le.mode,We),We.ref=ca(le,Q,he),We.return=le,We)}function Re(le,Q,he,We){return Q===null||Q.tag!==4||Q.stateNode.containerInfo!==he.containerInfo||Q.stateNode.implementation!==he.implementation?(Q=sd(he,le.mode,We),Q.return=le,Q):(Q=S(Q,he.children||[]),Q.return=le,Q)}function $e(le,Q,he,We,tt){return Q===null||Q.tag!==7?(Q=ps(he,le.mode,We,tt),Q.return=le,Q):(Q=S(Q,he),Q.return=le,Q)}function xt(le,Q,he){if(typeof Q=="string"&&Q!==""||typeof Q=="number")return Q=rd(""+Q,le.mode,he),Q.return=le,Q;if(typeof Q=="object"&&Q!==null){switch(Q.$$typeof){case u:return he=Sc(Q.type,Q.key,Q.props,null,le.mode,he),he.ref=ca(le,null,Q),he.return=le,he;case h:return Q=sd(Q,le.mode,he),Q.return=le,Q;case b:var We=Q._init;return xt(le,We(Q._payload),he)}if(ne(Q)||R(Q))return Q=ps(Q,le.mode,he,null),Q.return=le,Q;Wl(le,Q)}return null}function lt(le,Q,he,We){var tt=Q!==null?Q.key:null;if(typeof he=="string"&&he!==""||typeof he=="number")return tt!==null?null:j(le,Q,""+he,We);if(typeof he=="object"&&he!==null){switch(he.$$typeof){case u:return he.key===tt?de(le,Q,he,We):null;case h:return he.key===tt?Re(le,Q,he,We):null;case b:return tt=he._init,lt(le,Q,tt(he._payload),We)}if(ne(he)||R(he))return tt!==null?null:$e(le,Q,he,We,null);Wl(le,he)}return null}function qt(le,Q,he,We,tt){if(typeof We=="string"&&We!==""||typeof We=="number")return le=le.get(he)||null,j(Q,le,""+We,tt);if(typeof We=="object"&&We!==null){switch(We.$$typeof){case u:return le=le.get(We.key===null?he:We.key)||null,de(Q,le,We,tt);case h:return le=le.get(We.key===null?he:We.key)||null,Re(Q,le,We,tt);case b:var Ct=We._init;return qt(le,Q,he,Ct(We._payload),tt)}if(ne(We)||R(We))return le=le.get(he)||null,$e(Q,le,We,tt,null);Wl(Q,We)}return null}function rt(le,Q,he,We){for(var tt=null,Ct=null,yt=Q,Vt=Q=0,An=null;yt!==null&&Vt<he.length;Vt++){yt.index>Vt?(An=yt,yt=null):An=yt.sibling;var Gt=lt(le,yt,he[Vt],We);if(Gt===null){yt===null&&(yt=An);break}a&&yt&&Gt.alternate===null&&l(le,yt),Q=A(Gt,Q,Vt),Ct===null?tt=Gt:Ct.sibling=Gt,Ct=Gt,yt=An}if(Vt===he.length)return d(le,yt),Qt&&as(le,Vt),tt;if(yt===null){for(;Vt<he.length;Vt++)yt=xt(le,he[Vt],We),yt!==null&&(Q=A(yt,Q,Vt),Ct===null?tt=yt:Ct.sibling=yt,Ct=yt);return Qt&&as(le,Vt),tt}for(yt=_(le,yt);Vt<he.length;Vt++)An=qt(yt,le,Vt,he[Vt],We),An!==null&&(a&&An.alternate!==null&&yt.delete(An.key===null?Vt:An.key),Q=A(An,Q,Vt),Ct===null?tt=An:Ct.sibling=An,Ct=An);return a&&yt.forEach(function(Xr){return l(le,Xr)}),Qt&&as(le,Vt),tt}function Bn(le,Q,he,We){var tt=R(he);if(typeof tt!="function")throw Error(o(150));if(he=tt.call(he),he==null)throw Error(o(151));for(var Ct=tt=null,yt=Q,Vt=Q=0,An=null,Gt=he.next();yt!==null&&!Gt.done;Vt++,Gt=he.next()){yt.index>Vt?(An=yt,yt=null):An=yt.sibling;var Xr=lt(le,yt,Gt.value,We);if(Xr===null){yt===null&&(yt=An);break}a&&yt&&Xr.alternate===null&&l(le,yt),Q=A(Xr,Q,Vt),Ct===null?tt=Xr:Ct.sibling=Xr,Ct=Xr,yt=An}if(Gt.done)return d(le,yt),Qt&&as(le,Vt),tt;if(yt===null){for(;!Gt.done;Vt++,Gt=he.next())Gt=xt(le,Gt.value,We),Gt!==null&&(Q=A(Gt,Q,Vt),Ct===null?tt=Gt:Ct.sibling=Gt,Ct=Gt);return Qt&&as(le,Vt),tt}for(yt=_(le,yt);!Gt.done;Vt++,Gt=he.next())Gt=qt(yt,le,Vt,Gt.value,We),Gt!==null&&(a&&Gt.alternate!==null&&yt.delete(Gt.key===null?Vt:Gt.key),Q=A(Gt,Q,Vt),Ct===null?tt=Gt:Ct.sibling=Gt,Ct=Gt);return a&&yt.forEach(function(MS){return l(le,MS)}),Qt&&as(le,Vt),tt}function Ai(le,Q,he,We){if(typeof he=="object"&&he!==null&&he.type===f&&he.key===null&&(he=he.props.children),typeof he=="object"&&he!==null){switch(he.$$typeof){case u:e:{for(var tt=he.key,Ct=Q;Ct!==null;){if(Ct.key===tt){if(tt=he.type,tt===f){if(Ct.tag===7){d(le,Ct.sibling),Q=S(Ct,he.props.children),Q.return=le,le=Q;break e}}else if(Ct.elementType===tt||typeof tt=="object"&&tt!==null&&tt.$$typeof===b&&Vm(tt)===Ct.type){d(le,Ct.sibling),Q=S(Ct,he.props),Q.ref=ca(le,Ct,he),Q.return=le,le=Q;break e}d(le,Ct);break}else l(le,Ct);Ct=Ct.sibling}he.type===f?(Q=ps(he.props.children,le.mode,We,he.key),Q.return=le,le=Q):(We=Sc(he.type,he.key,he.props,null,le.mode,We),We.ref=ca(le,Q,he),We.return=le,le=We)}return z(le);case h:e:{for(Ct=he.key;Q!==null;){if(Q.key===Ct)if(Q.tag===4&&Q.stateNode.containerInfo===he.containerInfo&&Q.stateNode.implementation===he.implementation){d(le,Q.sibling),Q=S(Q,he.children||[]),Q.return=le,le=Q;break e}else{d(le,Q);break}else l(le,Q);Q=Q.sibling}Q=sd(he,le.mode,We),Q.return=le,le=Q}return z(le);case b:return Ct=he._init,Ai(le,Q,Ct(he._payload),We)}if(ne(he))return rt(le,Q,he,We);if(R(he))return Bn(le,Q,he,We);Wl(le,he)}return typeof he=="string"&&he!==""||typeof he=="number"?(he=""+he,Q!==null&&Q.tag===6?(d(le,Q.sibling),Q=S(Q,he),Q.return=le,le=Q):(d(le,Q),Q=rd(he,le.mode,We),Q.return=le,le=Q),z(le)):d(le,Q)}return Ai}var so=Gm(!0),Wm=Gm(!1),ua={},wi=X(ua),ha=X(ua),oo=X(ua);function $i(a){if(a===ua)throw Error(o(174));return a}function Mf(a,l){Z(oo,l),Z(ha,a),Z(wi,ua),a=te(l),$(wi),Z(wi,a)}function ao(){$(wi),$(ha),$(oo)}function Xm(a){var l=$i(oo.current),d=$i(wi.current);l=k(d,a.type,l),d!==l&&(Z(ha,a),Z(wi,l))}function wf(a){ha.current===a&&($(wi),$(ha))}var tn=X(0);function Xl(a){for(var l=a;l!==null;){if(l.tag===13){var d=l.memoizedState;if(d!==null&&(d=d.dehydrated,d===null||ze(d)||Ft(d)))return l}else if(l.tag===19&&l.memoizedProps.revealOrder!==void 0){if(l.flags&128)return l}else if(l.child!==null){l.child.return=l,l=l.child;continue}if(l===a)break;for(;l.sibling===null;){if(l.return===null||l.return===a)return null;l=l.return}l.sibling.return=l.return,l=l.sibling}return null}var Ef=[];function bf(){for(var a=0;a<Ef.length;a++){var l=Ef[a];kt?l._workInProgressVersionPrimary=null:l._workInProgressVersionSecondary=null}Ef.length=0}var Yl=c.ReactCurrentDispatcher,Ei=c.ReactCurrentBatchConfig,lo=0,on=null,Un=null,Tn=null,ql=!1,fa=!1,da=0,qy=0;function On(){throw Error(o(321))}function Tf(a,l){if(l===null)return!1;for(var d=0;d<l.length&&d<a.length;d++)if(!Ji(a[d],l[d]))return!1;return!0}function Af(a,l,d,_,S,A){if(lo=A,on=l,l.memoizedState=null,l.updateQueue=null,l.lanes=0,Yl.current=a===null||a.memoizedState===null?Ky:Qy,a=d(_,S),fa){A=0;do{if(fa=!1,da=0,25<=A)throw Error(o(301));A+=1,Tn=Un=null,l.updateQueue=null,Yl.current=$y,a=d(_,S)}while(fa)}if(Yl.current=Ql,l=Un!==null&&Un.next!==null,lo=0,Tn=Un=on=null,ql=!1,l)throw Error(o(300));return a}function Cf(){var a=da!==0;return da=0,a}function xr(){var a={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Tn===null?on.memoizedState=Tn=a:Tn=Tn.next=a,Tn}function er(){if(Un===null){var a=on.alternate;a=a!==null?a.memoizedState:null}else a=Un.next;var l=Tn===null?on.memoizedState:Tn.next;if(l!==null)Tn=l,Un=a;else{if(a===null)throw Error(o(310));Un=a,a={memoizedState:Un.memoizedState,baseState:Un.baseState,baseQueue:Un.baseQueue,queue:Un.queue,next:null},Tn===null?on.memoizedState=Tn=a:Tn=Tn.next=a}return Tn}function ls(a,l){return typeof l=="function"?l(a):l}function Zl(a){var l=er(),d=l.queue;if(d===null)throw Error(o(311));d.lastRenderedReducer=a;var _=Un,S=_.baseQueue,A=d.pending;if(A!==null){if(S!==null){var z=S.next;S.next=A.next,A.next=z}_.baseQueue=S=A,d.pending=null}if(S!==null){A=S.next,_=_.baseState;var j=z=null,de=null,Re=A;do{var $e=Re.lane;if((lo&$e)===$e)de!==null&&(de=de.next={lane:0,action:Re.action,hasEagerState:Re.hasEagerState,eagerState:Re.eagerState,next:null}),_=Re.hasEagerState?Re.eagerState:a(_,Re.action);else{var xt={lane:$e,action:Re.action,hasEagerState:Re.hasEagerState,eagerState:Re.eagerState,next:null};de===null?(j=de=xt,z=_):de=de.next=xt,on.lanes|=$e,uo|=$e}Re=Re.next}while(Re!==null&&Re!==A);de===null?z=_:de.next=j,Ji(_,l.memoizedState)||(fi=!0),l.memoizedState=_,l.baseState=z,l.baseQueue=de,d.lastRenderedState=_}if(a=d.interleaved,a!==null){S=a;do A=S.lane,on.lanes|=A,uo|=A,S=S.next;while(S!==a)}else S===null&&(d.lanes=0);return[l.memoizedState,d.dispatch]}function jl(a){var l=er(),d=l.queue;if(d===null)throw Error(o(311));d.lastRenderedReducer=a;var _=d.dispatch,S=d.pending,A=l.memoizedState;if(S!==null){d.pending=null;var z=S=S.next;do A=a(A,z.action),z=z.next;while(z!==S);Ji(A,l.memoizedState)||(fi=!0),l.memoizedState=A,l.baseQueue===null&&(l.baseState=A),d.lastRenderedState=A}return[A,_]}function Ym(){}function qm(a,l){var d=on,_=er(),S=l(),A=!Ji(_.memoizedState,S);if(A&&(_.memoizedState=S,fi=!0),_=_.queue,ma(Jm.bind(null,d,_,a),[a]),_.getSnapshot!==l||A||Tn!==null&&Tn.memoizedState.tag&1){if(d.flags|=2048,pa(9,jm.bind(null,d,_,S,l),void 0,null),pn===null)throw Error(o(349));lo&30||Zm(d,l,S)}return S}function Zm(a,l,d){a.flags|=16384,a={getSnapshot:l,value:d},l=on.updateQueue,l===null?(l={lastEffect:null,stores:null},on.updateQueue=l,l.stores=[a]):(d=l.stores,d===null?l.stores=[a]:d.push(a))}function jm(a,l,d,_){l.value=d,l.getSnapshot=_,Km(l)&&bi(a,1,-1)}function Jm(a,l,d){return d(function(){Km(l)&&bi(a,1,-1)})}function Km(a){var l=a.getSnapshot;a=a.value;try{var d=l();return!Ji(a,d)}catch{return!0}}function Rf(a){var l=xr();return typeof a=="function"&&(a=a()),l.memoizedState=l.baseState=a,a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ls,lastRenderedState:a},l.queue=a,a=a.dispatch=Jy.bind(null,on,a),[l.memoizedState,a]}function pa(a,l,d,_){return a={tag:a,create:l,destroy:d,deps:_,next:null},l=on.updateQueue,l===null?(l={lastEffect:null,stores:null},on.updateQueue=l,l.lastEffect=a.next=a):(d=l.lastEffect,d===null?l.lastEffect=a.next=a:(_=d.next,d.next=a,a.next=_,l.lastEffect=a)),a}function Qm(){return er().memoizedState}function Jl(a,l,d,_){var S=xr();on.flags|=a,S.memoizedState=pa(1|l,d,void 0,_===void 0?null:_)}function Kl(a,l,d,_){var S=er();_=_===void 0?null:_;var A=void 0;if(Un!==null){var z=Un.memoizedState;if(A=z.destroy,_!==null&&Tf(_,z.deps)){S.memoizedState=pa(l,d,A,_);return}}on.flags|=a,S.memoizedState=pa(1|l,d,A,_)}function Pf(a,l){return Jl(8390656,8,a,l)}function ma(a,l){return Kl(2048,8,a,l)}function $m(a,l){return Kl(4,2,a,l)}function eg(a,l){return Kl(4,4,a,l)}function tg(a,l){if(typeof l=="function")return a=a(),l(a),function(){l(null)};if(l!=null)return a=a(),l.current=a,function(){l.current=null}}function ng(a,l,d){return d=d!=null?d.concat([a]):null,Kl(4,4,tg.bind(null,l,a),d)}function If(){}function ig(a,l){var d=er();l=l===void 0?null:l;var _=d.memoizedState;return _!==null&&l!==null&&Tf(l,_[1])?_[0]:(d.memoizedState=[a,l],a)}function rg(a,l){var d=er();l=l===void 0?null:l;var _=d.memoizedState;return _!==null&&l!==null&&Tf(l,_[1])?_[0]:(a=a(),d.memoizedState=[a,l],a)}function Zy(a,l){var d=ut;ut=d!==0&&4>d?d:4,a(!0);var _=Ei.transition;Ei.transition={};try{a(!1),l()}finally{ut=d,Ei.transition=_}}function sg(){return er().memoizedState}function jy(a,l,d){var _=Vr(a);d={lane:_,action:d,hasEagerState:!1,eagerState:null,next:null},og(a)?ag(l,d):(lg(a,l,d),d=Wn(),a=bi(a,_,d),a!==null&&cg(a,l,_))}function Jy(a,l,d){var _=Vr(a),S={lane:_,action:d,hasEagerState:!1,eagerState:null,next:null};if(og(a))ag(l,S);else{lg(a,l,S);var A=a.alternate;if(a.lanes===0&&(A===null||A.lanes===0)&&(A=l.lastRenderedReducer,A!==null))try{var z=l.lastRenderedState,j=A(z,d);if(S.hasEagerState=!0,S.eagerState=j,Ji(j,z))return}catch{}finally{}d=Wn(),a=bi(a,_,d),a!==null&&cg(a,l,_)}}function og(a){var l=a.alternate;return a===on||l!==null&&l===on}function ag(a,l){fa=ql=!0;var d=a.pending;d===null?l.next=l:(l.next=d.next,d.next=l),a.pending=l}function lg(a,l,d){pn!==null&&a.mode&1&&!(Pt&2)?(a=l.interleaved,a===null?(d.next=d,Qi===null?Qi=[l]:Qi.push(l)):(d.next=a.next,a.next=d),l.interleaved=d):(a=l.pending,a===null?d.next=d:(d.next=a.next,a.next=d),l.pending=d)}function cg(a,l,d){if(d&4194240){var _=l.lanes;_&=a.pendingLanes,d|=_,l.lanes=d,Yt(a,d)}}var Ql={readContext:yi,useCallback:On,useContext:On,useEffect:On,useImperativeHandle:On,useInsertionEffect:On,useLayoutEffect:On,useMemo:On,useReducer:On,useRef:On,useState:On,useDebugValue:On,useDeferredValue:On,useTransition:On,useMutableSource:On,useSyncExternalStore:On,useId:On,unstable_isNewReconciler:!1},Ky={readContext:yi,useCallback:function(a,l){return xr().memoizedState=[a,l===void 0?null:l],a},useContext:yi,useEffect:Pf,useImperativeHandle:function(a,l,d){return d=d!=null?d.concat([a]):null,Jl(4194308,4,tg.bind(null,l,a),d)},useLayoutEffect:function(a,l){return Jl(4194308,4,a,l)},useInsertionEffect:function(a,l){return Jl(4,2,a,l)},useMemo:function(a,l){var d=xr();return l=l===void 0?null:l,a=a(),d.memoizedState=[a,l],a},useReducer:function(a,l,d){var _=xr();return l=d!==void 0?d(l):l,_.memoizedState=_.baseState=l,a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:a,lastRenderedState:l},_.queue=a,a=a.dispatch=jy.bind(null,on,a),[_.memoizedState,a]},useRef:function(a){var l=xr();return a={current:a},l.memoizedState=a},useState:Rf,useDebugValue:If,useDeferredValue:function(a){var l=Rf(a),d=l[0],_=l[1];return Pf(function(){var S=Ei.transition;Ei.transition={};try{_(a)}finally{Ei.transition=S}},[a]),d},useTransition:function(){var a=Rf(!1),l=a[0];return a=Zy.bind(null,a[1]),xr().memoizedState=a,[l,a]},useMutableSource:function(){},useSyncExternalStore:function(a,l,d){var _=on,S=xr();if(Qt){if(d===void 0)throw Error(o(407));d=d()}else{if(d=l(),pn===null)throw Error(o(349));lo&30||Zm(_,l,d)}S.memoizedState=d;var A={value:d,getSnapshot:l};return S.queue=A,Pf(Jm.bind(null,_,A,a),[a]),_.flags|=2048,pa(9,jm.bind(null,_,A,d,l),void 0,null),d},useId:function(){var a=xr(),l=pn.identifierPrefix;if(Qt){var d=vr,_=_r;d=(_&~(1<<32-Lt(_)-1)).toString(32)+d,l=":"+l+"R"+d,d=da++,0<d&&(l+="H"+d.toString(32)),l+=":"}else d=qy++,l=":"+l+"r"+d.toString(32)+":";return a.memoizedState=l},unstable_isNewReconciler:!1},Qy={readContext:yi,useCallback:ig,useContext:yi,useEffect:ma,useImperativeHandle:ng,useInsertionEffect:$m,useLayoutEffect:eg,useMemo:rg,useReducer:Zl,useRef:Qm,useState:function(){return Zl(ls)},useDebugValue:If,useDeferredValue:function(a){var l=Zl(ls),d=l[0],_=l[1];return ma(function(){var S=Ei.transition;Ei.transition={};try{_(a)}finally{Ei.transition=S}},[a]),d},useTransition:function(){var a=Zl(ls)[0],l=er().memoizedState;return[a,l]},useMutableSource:Ym,useSyncExternalStore:qm,useId:sg,unstable_isNewReconciler:!1},$y={readContext:yi,useCallback:ig,useContext:yi,useEffect:ma,useImperativeHandle:ng,useInsertionEffect:$m,useLayoutEffect:eg,useMemo:rg,useReducer:jl,useRef:Qm,useState:function(){return jl(ls)},useDebugValue:If,useDeferredValue:function(a){var l=jl(ls),d=l[0],_=l[1];return ma(function(){var S=Ei.transition;Ei.transition={};try{_(a)}finally{Ei.transition=S}},[a]),d},useTransition:function(){var a=jl(ls)[0],l=er().memoizedState;return[a,l]},useMutableSource:Ym,useSyncExternalStore:qm,useId:sg,unstable_isNewReconciler:!1};function Lf(a,l){try{var d="",_=l;do d+=Yy(_),_=_.return;while(_);var S=d}catch(A){S=`
Error generating stack: `+A.message+`
`+A.stack}return{value:a,source:l,stack:S}}function Nf(a,l){try{console.error(l.value)}catch(d){setTimeout(function(){throw d})}}var eS=typeof WeakMap=="function"?WeakMap:Map;function ug(a,l,d){d=gr(-1,d),d.tag=3,d.payload={element:null};var _=l.value;return d.callback=function(){pc||(pc=!0,Kf=_),Nf(a,l)},d}function hg(a,l,d){d=gr(-1,d),d.tag=3;var _=a.type.getDerivedStateFromError;if(typeof _=="function"){var S=l.value;d.payload=function(){return _(S)},d.callback=function(){Nf(a,l)}}var A=a.stateNode;return A!==null&&typeof A.componentDidCatch=="function"&&(d.callback=function(){Nf(a,l),typeof _!="function"&&(kr===null?kr=new Set([this]):kr.add(this));var z=l.stack;this.componentDidCatch(l.value,{componentStack:z!==null?z:""})}),d}function fg(a,l,d){var _=a.pingCache;if(_===null){_=a.pingCache=new eS;var S=new Set;_.set(l,S)}else S=_.get(l),S===void 0&&(S=new Set,_.set(l,S));S.has(d)||(S.add(d),a=pS.bind(null,a,l,d),l.then(a,a))}function dg(a){do{var l;if((l=a.tag===13)&&(l=a.memoizedState,l=l!==null?l.dehydrated!==null:!0),l)return a;a=a.return}while(a!==null);return null}function pg(a,l,d,_,S){return a.mode&1?(a.flags|=65536,a.lanes=S,a):(a===l?a.flags|=65536:(a.flags|=128,d.flags|=131072,d.flags&=-52805,d.tag===1&&(d.alternate===null?d.tag=17:(l=gr(-1,1),l.tag=2,zr(d,l))),d.lanes|=1),a)}function tr(a){a.flags|=4}function mg(a,l){if(a!==null&&a.child===l.child)return!0;if(l.flags&16)return!1;for(a=l.child;a!==null;){if(a.flags&12854||a.subtreeFlags&12854)return!1;a=a.sibling}return!0}var ga,_a,$l,ec;if(Ke)ga=function(a,l){for(var d=l.child;d!==null;){if(d.tag===5||d.tag===6)_e(a,d.stateNode);else if(d.tag!==4&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===l)break;for(;d.sibling===null;){if(d.return===null||d.return===l)return;d=d.return}d.sibling.return=d.return,d=d.sibling}},_a=function(){},$l=function(a,l,d,_,S){if(a=a.memoizedProps,a!==_){var A=l.stateNode,z=$i(wi.current);d=ae(A,d,a,_,S,z),(l.updateQueue=d)&&tr(l)}},ec=function(a,l,d,_){d!==_&&tr(l)};else if(gt){ga=function(a,l,d,_){for(var S=l.child;S!==null;){if(S.tag===5){var A=S.stateNode;d&&_&&(A=je(A,S.type,S.memoizedProps,S)),_e(a,A)}else if(S.tag===6)A=S.stateNode,d&&_&&(A=ht(A,S.memoizedProps,S)),_e(a,A);else if(S.tag!==4){if(S.tag===22&&S.memoizedState!==null)A=S.child,A!==null&&(A.return=S),ga(a,S,!0,!0);else if(S.child!==null){S.child.return=S,S=S.child;continue}}if(S===l)break;for(;S.sibling===null;){if(S.return===null||S.return===l)return;S=S.return}S.sibling.return=S.return,S=S.sibling}};var gg=function(a,l,d,_){for(var S=l.child;S!==null;){if(S.tag===5){var A=S.stateNode;d&&_&&(A=je(A,S.type,S.memoizedProps,S)),we(a,A)}else if(S.tag===6)A=S.stateNode,d&&_&&(A=ht(A,S.memoizedProps,S)),we(a,A);else if(S.tag!==4){if(S.tag===22&&S.memoizedState!==null)A=S.child,A!==null&&(A.return=S),gg(a,S,!0,!0);else if(S.child!==null){S.child.return=S,S=S.child;continue}}if(S===l)break;for(;S.sibling===null;){if(S.return===null||S.return===l)return;S=S.return}S.sibling.return=S.return,S=S.sibling}};_a=function(a,l){var d=l.stateNode;if(!mg(a,l)){a=d.containerInfo;var _=ue(a);gg(_,l,!1,!1),d.pendingChildren=_,tr(l),xe(a,_)}},$l=function(a,l,d,_,S){var A=a.stateNode,z=a.memoizedProps;if((a=mg(a,l))&&z===_)l.stateNode=A;else{var j=l.stateNode,de=$i(wi.current),Re=null;z!==_&&(Re=ae(j,d,z,_,S,de)),a&&Re===null?l.stateNode=A:(A=pe(A,Re,d,z,_,l,a,j),Te(A,d,_,S,de)&&tr(l),l.stateNode=A,a?tr(l):ga(A,l,!1,!1))}},ec=function(a,l,d,_){d!==_?(a=$i(oo.current),d=$i(wi.current),l.stateNode=Pe(_,a,d,l),tr(l)):l.stateNode=a.stateNode}}else _a=function(){},$l=function(){},ec=function(){};function va(a,l){if(!Qt)switch(a.tailMode){case"hidden":l=a.tail;for(var d=null;l!==null;)l.alternate!==null&&(d=l),l=l.sibling;d===null?a.tail=null:d.sibling=null;break;case"collapsed":d=a.tail;for(var _=null;d!==null;)d.alternate!==null&&(_=d),d=d.sibling;_===null?l||a.tail===null?a.tail=null:a.tail.sibling=null:_.sibling=null}}function Fn(a){var l=a.alternate!==null&&a.alternate.child===a.child,d=0,_=0;if(l)for(var S=a.child;S!==null;)d|=S.lanes|S.childLanes,_|=S.subtreeFlags&14680064,_|=S.flags&14680064,S.return=a,S=S.sibling;else for(S=a.child;S!==null;)d|=S.lanes|S.childLanes,_|=S.subtreeFlags,_|=S.flags,S.return=a,S=S.sibling;return a.subtreeFlags|=_,a.childLanes=d,l}function tS(a,l,d){var _=l.pendingProps;switch(vf(l),l.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Fn(l),null;case 1:return He(l.type)&&ft(),Fn(l),null;case 3:return _=l.stateNode,ao(),$(Fe),$(Se),bf(),_.pendingContext&&(_.context=_.pendingContext,_.pendingContext=null),(a===null||a.child===null)&&(la(l)?tr(l):a===null||a.memoizedState.isDehydrated&&!(l.flags&256)||(l.flags|=1024,Ui!==null&&(ed(Ui),Ui=null))),_a(a,l),Fn(l),null;case 5:wf(l),d=$i(oo.current);var S=l.type;if(a!==null&&l.stateNode!=null)$l(a,l,S,_,d),a.ref!==l.ref&&(l.flags|=512,l.flags|=2097152);else{if(!_){if(l.stateNode===null)throw Error(o(166));return Fn(l),null}if(a=$i(wi.current),la(l)){if(!ot)throw Error(o(175));a=Rl(l.stateNode,l.type,l.memoizedProps,d,a,l,!aa),l.updateQueue=a,a!==null&&tr(l)}else{var A=J(S,_,d,a,l);ga(A,l,!1,!1),l.stateNode=A,Te(A,S,_,d,a)&&tr(l)}l.ref!==null&&(l.flags|=512,l.flags|=2097152)}return Fn(l),null;case 6:if(a&&l.stateNode!=null)ec(a,l,a.memoizedProps,_);else{if(typeof _!="string"&&l.stateNode===null)throw Error(o(166));if(a=$i(oo.current),d=$i(wi.current),la(l)){if(!ot)throw Error(o(176));if(a=l.stateNode,_=l.memoizedProps,(d=Pl(a,_,l,!aa))&&(S=ui,S!==null))switch(A=(S.mode&1)!==0,S.tag){case 3:ss(S.stateNode.containerInfo,a,_,A);break;case 5:sf(S.type,S.memoizedProps,S.stateNode,a,_,A)}d&&tr(l)}else l.stateNode=Pe(_,a,d,l)}return Fn(l),null;case 13:if($(tn),_=l.memoizedState,Qt&&hi!==null&&l.mode&1&&!(l.flags&128)){for(a=hi;a;)a=Qn(a);return ro(),l.flags|=98560,l}if(_!==null&&_.dehydrated!==null){if(_=la(l),a===null){if(!_)throw Error(o(318));if(!ot)throw Error(o(344));if(a=l.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(o(317));pr(a,l)}else ro(),!(l.flags&128)&&(l.memoizedState=null),l.flags|=4;return Fn(l),null}return Ui!==null&&(ed(Ui),Ui=null),l.flags&128?(l.lanes=d,l):(_=_!==null,d=!1,a===null?la(l):d=a.memoizedState!==null,_&&!d&&(l.child.flags|=8192,l.mode&1&&(a===null||tn.current&1?vn===0&&(vn=3):nd())),l.updateQueue!==null&&(l.flags|=4),Fn(l),null);case 4:return ao(),_a(a,l),a===null&&Ie(l.stateNode.containerInfo),Fn(l),null;case 10:return ff(l.type._context),Fn(l),null;case 17:return He(l.type)&&ft(),Fn(l),null;case 19:if($(tn),S=l.memoizedState,S===null)return Fn(l),null;if(_=(l.flags&128)!==0,A=S.rendering,A===null)if(_)va(S,!1);else{if(vn!==0||a!==null&&a.flags&128)for(a=l.child;a!==null;){if(A=Xl(a),A!==null){for(l.flags|=128,va(S,!1),a=A.updateQueue,a!==null&&(l.updateQueue=a,l.flags|=4),l.subtreeFlags=0,a=d,_=l.child;_!==null;)d=_,S=a,d.flags&=14680066,A=d.alternate,A===null?(d.childLanes=0,d.lanes=S,d.child=null,d.subtreeFlags=0,d.memoizedProps=null,d.memoizedState=null,d.updateQueue=null,d.dependencies=null,d.stateNode=null):(d.childLanes=A.childLanes,d.lanes=A.lanes,d.child=A.child,d.subtreeFlags=0,d.deletions=null,d.memoizedProps=A.memoizedProps,d.memoizedState=A.memoizedState,d.updateQueue=A.updateQueue,d.type=A.type,S=A.dependencies,d.dependencies=S===null?null:{lanes:S.lanes,firstContext:S.firstContext}),_=_.sibling;return Z(tn,tn.current&1|2),l.child}a=a.sibling}S.tail!==null&&bn()>Jf&&(l.flags|=128,_=!0,va(S,!1),l.lanes=4194304)}else{if(!_)if(a=Xl(A),a!==null){if(l.flags|=128,_=!0,a=a.updateQueue,a!==null&&(l.updateQueue=a,l.flags|=4),va(S,!0),S.tail===null&&S.tailMode==="hidden"&&!A.alternate&&!Qt)return Fn(l),null}else 2*bn()-S.renderingStartTime>Jf&&d!==1073741824&&(l.flags|=128,_=!0,va(S,!1),l.lanes=4194304);S.isBackwards?(A.sibling=l.child,l.child=A):(a=S.last,a!==null?a.sibling=A:l.child=A,S.last=A)}return S.tail!==null?(l=S.tail,S.rendering=l,S.tail=l.sibling,S.renderingStartTime=bn(),l.sibling=null,a=tn.current,Z(tn,_?a&1|2:a&1),l):(Fn(l),null);case 22:case 23:return td(),_=l.memoizedState!==null,a!==null&&a.memoizedState!==null!==_&&(l.flags|=8192),_&&l.mode&1?di&1073741824&&(Fn(l),Ke&&l.subtreeFlags&6&&(l.flags|=8192)):Fn(l),null;case 24:return null;case 25:return null}throw Error(o(156,l.tag))}var nS=c.ReactCurrentOwner,fi=!1;function Gn(a,l,d,_){l.child=a===null?Wm(l,null,d,_):so(l,a.child,d,_)}function _g(a,l,d,_,S){d=d.render;var A=l.ref;return to(l,S),_=Af(a,l,d,_,A,S),d=Cf(),a!==null&&!fi?(l.updateQueue=a.updateQueue,l.flags&=-2053,a.lanes&=~S,yr(a,l,S)):(Qt&&d&&_f(l),l.flags|=1,Gn(a,l,_,S),l.child)}function vg(a,l,d,_,S){if(a===null){var A=d.type;return typeof A=="function"&&!id(A)&&A.defaultProps===void 0&&d.compare===null&&d.defaultProps===void 0?(l.tag=15,l.type=A,xg(a,l,A,_,S)):(a=Sc(d.type,null,_,l,l.mode,S),a.ref=l.ref,a.return=l,l.child=a)}if(A=a.child,!(a.lanes&S)){var z=A.memoizedProps;if(d=d.compare,d=d!==null?d:Ol,d(z,_)&&a.ref===l.ref)return yr(a,l,S)}return l.flags|=1,a=Wr(A,_),a.ref=l.ref,a.return=l,l.child=a}function xg(a,l,d,_,S){if(a!==null&&Ol(a.memoizedProps,_)&&a.ref===l.ref)if(fi=!1,(a.lanes&S)!==0)a.flags&131072&&(fi=!0);else return l.lanes=a.lanes,yr(a,l,S);return Df(a,l,d,_,S)}function yg(a,l,d){var _=l.pendingProps,S=_.children,A=a!==null?a.memoizedState:null;if(_.mode==="hidden")if(!(l.mode&1))l.memoizedState={baseLanes:0,cachePool:null},Z(co,di),di|=d;else if(d&1073741824)l.memoizedState={baseLanes:0,cachePool:null},_=A!==null?A.baseLanes:d,Z(co,di),di|=_;else return a=A!==null?A.baseLanes|d:d,l.lanes=l.childLanes=1073741824,l.memoizedState={baseLanes:a,cachePool:null},l.updateQueue=null,Z(co,di),di|=a,null;else A!==null?(_=A.baseLanes|d,l.memoizedState=null):_=d,Z(co,di),di|=_;return Gn(a,l,S,d),l.child}function Sg(a,l){var d=l.ref;(a===null&&d!==null||a!==null&&a.ref!==d)&&(l.flags|=512,l.flags|=2097152)}function Df(a,l,d,_,S){var A=He(d)?Ae:Se.current;return A=Oe(l,A),to(l,S),d=Af(a,l,d,_,A,S),_=Cf(),a!==null&&!fi?(l.updateQueue=a.updateQueue,l.flags&=-2053,a.lanes&=~S,yr(a,l,S)):(Qt&&_&&_f(l),l.flags|=1,Gn(a,l,d,S),l.child)}function Mg(a,l,d,_,S){if(He(d)){var A=!0;Tt(l)}else A=!1;if(to(l,S),l.stateNode===null)a!==null&&(a.alternate=null,l.alternate=null,l.flags|=2),Om(l,d,_),gf(l,d,_,S),_=!0;else if(a===null){var z=l.stateNode,j=l.memoizedProps;z.props=j;var de=z.context,Re=d.contextType;typeof Re=="object"&&Re!==null?Re=yi(Re):(Re=He(d)?Ae:Se.current,Re=Oe(l,Re));var $e=d.getDerivedStateFromProps,xt=typeof $e=="function"||typeof z.getSnapshotBeforeUpdate=="function";xt||typeof z.UNSAFE_componentWillReceiveProps!="function"&&typeof z.componentWillReceiveProps!="function"||(j!==_||de!==Re)&&Fm(l,z,_,Re),Br=!1;var lt=l.memoizedState;z.state=lt,kl(l,_,z,S),de=l.memoizedState,j!==_||lt!==de||Fe.current||Br?(typeof $e=="function"&&(mf(l,d,$e,_),de=l.memoizedState),(j=Br||Um(l,d,j,_,lt,de,Re))?(xt||typeof z.UNSAFE_componentWillMount!="function"&&typeof z.componentWillMount!="function"||(typeof z.componentWillMount=="function"&&z.componentWillMount(),typeof z.UNSAFE_componentWillMount=="function"&&z.UNSAFE_componentWillMount()),typeof z.componentDidMount=="function"&&(l.flags|=4194308)):(typeof z.componentDidMount=="function"&&(l.flags|=4194308),l.memoizedProps=_,l.memoizedState=de),z.props=_,z.state=de,z.context=Re,_=j):(typeof z.componentDidMount=="function"&&(l.flags|=4194308),_=!1)}else{z=l.stateNode,Im(a,l),j=l.memoizedProps,Re=l.type===l.elementType?j:Di(l.type,j),z.props=Re,xt=l.pendingProps,lt=z.context,de=d.contextType,typeof de=="object"&&de!==null?de=yi(de):(de=He(d)?Ae:Se.current,de=Oe(l,de));var qt=d.getDerivedStateFromProps;($e=typeof qt=="function"||typeof z.getSnapshotBeforeUpdate=="function")||typeof z.UNSAFE_componentWillReceiveProps!="function"&&typeof z.componentWillReceiveProps!="function"||(j!==xt||lt!==de)&&Fm(l,z,_,de),Br=!1,lt=l.memoizedState,z.state=lt,kl(l,_,z,S);var rt=l.memoizedState;j!==xt||lt!==rt||Fe.current||Br?(typeof qt=="function"&&(mf(l,d,qt,_),rt=l.memoizedState),(Re=Br||Um(l,d,Re,_,lt,rt,de)||!1)?($e||typeof z.UNSAFE_componentWillUpdate!="function"&&typeof z.componentWillUpdate!="function"||(typeof z.componentWillUpdate=="function"&&z.componentWillUpdate(_,rt,de),typeof z.UNSAFE_componentWillUpdate=="function"&&z.UNSAFE_componentWillUpdate(_,rt,de)),typeof z.componentDidUpdate=="function"&&(l.flags|=4),typeof z.getSnapshotBeforeUpdate=="function"&&(l.flags|=1024)):(typeof z.componentDidUpdate!="function"||j===a.memoizedProps&&lt===a.memoizedState||(l.flags|=4),typeof z.getSnapshotBeforeUpdate!="function"||j===a.memoizedProps&&lt===a.memoizedState||(l.flags|=1024),l.memoizedProps=_,l.memoizedState=rt),z.props=_,z.state=rt,z.context=de,_=Re):(typeof z.componentDidUpdate!="function"||j===a.memoizedProps&&lt===a.memoizedState||(l.flags|=4),typeof z.getSnapshotBeforeUpdate!="function"||j===a.memoizedProps&&lt===a.memoizedState||(l.flags|=1024),_=!1)}return Uf(a,l,d,_,A,S)}function Uf(a,l,d,_,S,A){Sg(a,l);var z=(l.flags&128)!==0;if(!_&&!z)return S&&$t(l,d,!1),yr(a,l,A);_=l.stateNode,nS.current=l;var j=z&&typeof d.getDerivedStateFromError!="function"?null:_.render();return l.flags|=1,a!==null&&z?(l.child=so(l,a.child,null,A),l.child=so(l,null,j,A)):Gn(a,l,j,A),l.memoizedState=_.state,S&&$t(l,d,!0),l.child}function wg(a){var l=a.stateNode;l.pendingContext?Rt(a,l.pendingContext,l.pendingContext!==l.context):l.context&&Rt(a,l.context,!1),Mf(a,l.containerInfo)}function Eg(a,l,d,_,S){return ro(),Sf(S),l.flags|=256,Gn(a,l,d,_),l.child}var tc={dehydrated:null,treeContext:null,retryLane:0};function nc(a){return{baseLanes:a,cachePool:null}}function bg(a,l,d){var _=l.pendingProps,S=tn.current,A=!1,z=(l.flags&128)!==0,j;if((j=z)||(j=a!==null&&a.memoizedState===null?!1:(S&2)!==0),j?(A=!0,l.flags&=-129):(a===null||a.memoizedState!==null)&&(S|=1),Z(tn,S&1),a===null)return yf(l),a=l.memoizedState,a!==null&&(a=a.dehydrated,a!==null)?(l.mode&1?Ft(a)?l.lanes=8:l.lanes=1073741824:l.lanes=1,null):(S=_.children,a=_.fallback,A?(_=l.mode,A=l.child,S={mode:"hidden",children:S},!(_&1)&&A!==null?(A.childLanes=0,A.pendingProps=S):A=Mc(S,_,0,null),a=ps(a,_,d,null),A.return=l,a.return=l,A.sibling=a,l.child=A,l.child.memoizedState=nc(d),l.memoizedState=tc,a):Of(l,S));if(S=a.memoizedState,S!==null){if(j=S.dehydrated,j!==null){if(z)return l.flags&256?(l.flags&=-257,ic(a,l,d,Error(o(422)))):l.memoizedState!==null?(l.child=a.child,l.flags|=128,null):(A=_.fallback,S=l.mode,_=Mc({mode:"visible",children:_.children},S,0,null),A=ps(A,S,d,null),A.flags|=2,_.return=l,A.return=l,_.sibling=A,l.child=_,l.mode&1&&so(l,a.child,null,d),l.child.memoizedState=nc(d),l.memoizedState=tc,A);if(!(l.mode&1))l=ic(a,l,d,null);else if(Ft(j))l=ic(a,l,d,Error(o(419)));else if(_=(d&a.childLanes)!==0,fi||_){if(_=pn,_!==null){switch(d&-d){case 4:A=2;break;case 16:A=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:A=32;break;case 536870912:A=268435456;break;default:A=0}_=A&(_.suspendedLanes|d)?0:A,_!==0&&_!==S.retryLane&&(S.retryLane=_,bi(a,_,-1))}nd(),l=ic(a,l,d,Error(o(421)))}else ze(j)?(l.flags|=128,l.child=a.child,l=mS.bind(null,a),fn(j,l),l=null):(d=S.treeContext,ot&&(hi=rf(j),ui=l,Qt=!0,Ui=null,aa=!1,d!==null&&(Si[Mi++]=_r,Si[Mi++]=vr,Si[Mi++]=os,_r=d.id,vr=d.overflow,os=l)),l=Of(l,l.pendingProps.children),l.flags|=4096);return l}return A?(_=Ag(a,l,_.children,_.fallback,d),A=l.child,S=a.child.memoizedState,A.memoizedState=S===null?nc(d):{baseLanes:S.baseLanes|d,cachePool:null},A.childLanes=a.childLanes&~d,l.memoizedState=tc,_):(d=Tg(a,l,_.children,d),l.memoizedState=null,d)}return A?(_=Ag(a,l,_.children,_.fallback,d),A=l.child,S=a.child.memoizedState,A.memoizedState=S===null?nc(d):{baseLanes:S.baseLanes|d,cachePool:null},A.childLanes=a.childLanes&~d,l.memoizedState=tc,_):(d=Tg(a,l,_.children,d),l.memoizedState=null,d)}function Of(a,l){return l=Mc({mode:"visible",children:l},a.mode,0,null),l.return=a,a.child=l}function Tg(a,l,d,_){var S=a.child;return a=S.sibling,d=Wr(S,{mode:"visible",children:d}),!(l.mode&1)&&(d.lanes=_),d.return=l,d.sibling=null,a!==null&&(_=l.deletions,_===null?(l.deletions=[a],l.flags|=16):_.push(a)),l.child=d}function Ag(a,l,d,_,S){var A=l.mode;a=a.child;var z=a.sibling,j={mode:"hidden",children:d};return!(A&1)&&l.child!==a?(d=l.child,d.childLanes=0,d.pendingProps=j,l.deletions=null):(d=Wr(a,j),d.subtreeFlags=a.subtreeFlags&14680064),z!==null?_=Wr(z,_):(_=ps(_,A,S,null),_.flags|=2),_.return=l,d.return=l,d.sibling=_,l.child=d,_}function ic(a,l,d,_){return _!==null&&Sf(_),so(l,a.child,null,d),a=Of(l,l.pendingProps.children),a.flags|=2,l.memoizedState=null,a}function Cg(a,l,d){a.lanes|=l;var _=a.alternate;_!==null&&(_.lanes|=l),df(a.return,l,d)}function Ff(a,l,d,_,S){var A=a.memoizedState;A===null?a.memoizedState={isBackwards:l,rendering:null,renderingStartTime:0,last:_,tail:d,tailMode:S}:(A.isBackwards=l,A.rendering=null,A.renderingStartTime=0,A.last=_,A.tail=d,A.tailMode=S)}function Rg(a,l,d){var _=l.pendingProps,S=_.revealOrder,A=_.tail;if(Gn(a,l,_.children,d),_=tn.current,_&2)_=_&1|2,l.flags|=128;else{if(a!==null&&a.flags&128)e:for(a=l.child;a!==null;){if(a.tag===13)a.memoizedState!==null&&Cg(a,d,l);else if(a.tag===19)Cg(a,d,l);else if(a.child!==null){a.child.return=a,a=a.child;continue}if(a===l)break e;for(;a.sibling===null;){if(a.return===null||a.return===l)break e;a=a.return}a.sibling.return=a.return,a=a.sibling}_&=1}if(Z(tn,_),!(l.mode&1))l.memoizedState=null;else switch(S){case"forwards":for(d=l.child,S=null;d!==null;)a=d.alternate,a!==null&&Xl(a)===null&&(S=d),d=d.sibling;d=S,d===null?(S=l.child,l.child=null):(S=d.sibling,d.sibling=null),Ff(l,!1,S,d,A);break;case"backwards":for(d=null,S=l.child,l.child=null;S!==null;){if(a=S.alternate,a!==null&&Xl(a)===null){l.child=S;break}a=S.sibling,S.sibling=d,d=S,S=a}Ff(l,!0,d,null,A);break;case"together":Ff(l,!1,null,null,void 0);break;default:l.memoizedState=null}return l.child}function yr(a,l,d){if(a!==null&&(l.dependencies=a.dependencies),uo|=l.lanes,!(d&l.childLanes))return null;if(a!==null&&l.child!==a.child)throw Error(o(153));if(l.child!==null){for(a=l.child,d=Wr(a,a.pendingProps),l.child=d,d.return=l;a.sibling!==null;)a=a.sibling,d=d.sibling=Wr(a,a.pendingProps),d.return=l;d.sibling=null}return l.child}function iS(a,l,d){switch(l.tag){case 3:wg(l),ro();break;case 5:Xm(l);break;case 1:He(l.type)&&Tt(l);break;case 4:Mf(l,l.stateNode.containerInfo);break;case 10:Pm(l,l.type._context,l.memoizedProps.value);break;case 13:var _=l.memoizedState;if(_!==null)return _.dehydrated!==null?(Z(tn,tn.current&1),l.flags|=128,null):d&l.child.childLanes?bg(a,l,d):(Z(tn,tn.current&1),a=yr(a,l,d),a!==null?a.sibling:null);Z(tn,tn.current&1);break;case 19:if(_=(d&l.childLanes)!==0,a.flags&128){if(_)return Rg(a,l,d);l.flags|=128}var S=l.memoizedState;if(S!==null&&(S.rendering=null,S.tail=null,S.lastEffect=null),Z(tn,tn.current),_)break;return null;case 22:case 23:return l.lanes=0,yg(a,l,d)}return yr(a,l,d)}function rS(a,l){switch(vf(l),l.tag){case 1:return He(l.type)&&ft(),a=l.flags,a&65536?(l.flags=a&-65537|128,l):null;case 3:return ao(),$(Fe),$(Se),bf(),a=l.flags,a&65536&&!(a&128)?(l.flags=a&-65537|128,l):null;case 5:return wf(l),null;case 13:if($(tn),a=l.memoizedState,a!==null&&a.dehydrated!==null){if(l.alternate===null)throw Error(o(340));ro()}return a=l.flags,a&65536?(l.flags=a&-65537|128,l):null;case 19:return $(tn),null;case 4:return ao(),null;case 10:return ff(l.type._context),null;case 22:case 23:return td(),null;case 24:return null;default:return null}}var rc=!1,cs=!1,sS=typeof WeakSet=="function"?WeakSet:Set,Ve=null;function sc(a,l){var d=a.ref;if(d!==null)if(typeof d=="function")try{d(null)}catch(_){ti(a,l,_)}else d.current=null}function Bf(a,l,d){try{d()}catch(_){ti(a,l,_)}}var Pg=!1;function oS(a,l){for(G(a.containerInfo),Ve=l;Ve!==null;)if(a=Ve,l=a.child,(a.subtreeFlags&1028)!==0&&l!==null)l.return=a,Ve=l;else for(;Ve!==null;){a=Ve;try{var d=a.alternate;if(a.flags&1024)switch(a.tag){case 0:case 11:case 15:break;case 1:if(d!==null){var _=d.memoizedProps,S=d.memoizedState,A=a.stateNode,z=A.getSnapshotBeforeUpdate(a.elementType===a.type?_:Di(a.type,_),S);A.__reactInternalSnapshotBeforeUpdate=z}break;case 3:Ke&&V(a.stateNode.containerInfo);break;case 5:case 6:case 4:case 17:break;default:throw Error(o(163))}}catch(j){ti(a,a.return,j)}if(l=a.sibling,l!==null){l.return=a.return,Ve=l;break}Ve=a.return}return d=Pg,Pg=!1,d}function us(a,l,d){var _=l.updateQueue;if(_=_!==null?_.lastEffect:null,_!==null){var S=_=_.next;do{if((S.tag&a)===a){var A=S.destroy;S.destroy=void 0,A!==void 0&&Bf(l,d,A)}S=S.next}while(S!==_)}}function xa(a,l){if(l=l.updateQueue,l=l!==null?l.lastEffect:null,l!==null){var d=l=l.next;do{if((d.tag&a)===a){var _=d.create;d.destroy=_()}d=d.next}while(d!==l)}}function zf(a){var l=a.ref;if(l!==null){var d=a.stateNode;switch(a.tag){case 5:a=oe(d);break;default:a=d}typeof l=="function"?l(a):l.current=a}}function Ig(a,l,d){if(ji&&typeof ji.onCommitFiberUnmount=="function")try{ji.onCommitFiberUnmount(Dl,l)}catch{}switch(l.tag){case 0:case 11:case 14:case 15:if(a=l.updateQueue,a!==null&&(a=a.lastEffect,a!==null)){var _=a=a.next;do{var S=_,A=S.destroy;S=S.tag,A!==void 0&&(S&2||S&4)&&Bf(l,d,A),_=_.next}while(_!==a)}break;case 1:if(sc(l,d),a=l.stateNode,typeof a.componentWillUnmount=="function")try{a.props=l.memoizedProps,a.state=l.memoizedState,a.componentWillUnmount()}catch(z){ti(l,d,z)}break;case 5:sc(l,d);break;case 4:Ke?Fg(a,l,d):gt&&gt&&(l=l.stateNode.containerInfo,d=ue(l),be(l,d))}}function Lg(a,l,d){for(var _=l;;)if(Ig(a,_,d),_.child===null||Ke&&_.tag===4){if(_===l)break;for(;_.sibling===null;){if(_.return===null||_.return===l)return;_=_.return}_.sibling.return=_.return,_=_.sibling}else _.child.return=_,_=_.child}function Ng(a){var l=a.alternate;l!==null&&(a.alternate=null,Ng(l)),a.child=null,a.deletions=null,a.sibling=null,a.tag===5&&(l=a.stateNode,l!==null&&Ge(l)),a.stateNode=null,a.return=null,a.dependencies=null,a.memoizedProps=null,a.memoizedState=null,a.pendingProps=null,a.stateNode=null,a.updateQueue=null}function Dg(a){return a.tag===5||a.tag===3||a.tag===4}function Ug(a){e:for(;;){for(;a.sibling===null;){if(a.return===null||Dg(a.return))return null;a=a.return}for(a.sibling.return=a.return,a=a.sibling;a.tag!==5&&a.tag!==6&&a.tag!==18;){if(a.flags&2||a.child===null||a.tag===4)continue e;a.child.return=a,a=a.child}if(!(a.flags&2))return a.stateNode}}function Og(a){if(Ke){e:{for(var l=a.return;l!==null;){if(Dg(l))break e;l=l.return}throw Error(o(160))}var d=l;switch(d.tag){case 5:l=d.stateNode,d.flags&32&&(re(l),d.flags&=-33),d=Ug(a),Hf(a,d,l);break;case 3:case 4:l=d.stateNode.containerInfo,d=Ug(a),kf(a,d,l);break;default:throw Error(o(161))}}}function kf(a,l,d){var _=a.tag;if(_===5||_===6)a=a.stateNode,l?ie(d,a,l):Zt(d,a);else if(_!==4&&(a=a.child,a!==null))for(kf(a,l,d),a=a.sibling;a!==null;)kf(a,l,d),a=a.sibling}function Hf(a,l,d){var _=a.tag;if(_===5||_===6)a=a.stateNode,l?I(d,a,l):Le(d,a);else if(_!==4&&(a=a.child,a!==null))for(Hf(a,l,d),a=a.sibling;a!==null;)Hf(a,l,d),a=a.sibling}function Fg(a,l,d){for(var _=l,S=!1,A,z;;){if(!S){S=_.return;e:for(;;){if(S===null)throw Error(o(160));switch(A=S.stateNode,S.tag){case 5:z=!1;break e;case 3:A=A.containerInfo,z=!0;break e;case 4:A=A.containerInfo,z=!0;break e}S=S.return}S=!0}if(_.tag===5||_.tag===6)Lg(a,_,d),z?U(A,_.stateNode):ve(A,_.stateNode);else if(_.tag===18)z?Ll(A,_.stateNode):js(A,_.stateNode);else if(_.tag===4){if(_.child!==null){A=_.stateNode.containerInfo,z=!0,_.child.return=_,_=_.child;continue}}else if(Ig(a,_,d),_.child!==null){_.child.return=_,_=_.child;continue}if(_===l)break;for(;_.sibling===null;){if(_.return===null||_.return===l)return;_=_.return,_.tag===4&&(S=!1)}_.sibling.return=_.return,_=_.sibling}}function Vf(a,l){if(Ke){switch(l.tag){case 0:case 11:case 14:case 15:us(3,l,l.return),xa(3,l),us(5,l,l.return);return;case 1:return;case 5:var d=l.stateNode;if(d!=null){var _=l.memoizedProps;a=a!==null?a.memoizedProps:_;var S=l.type,A=l.updateQueue;l.updateQueue=null,A!==null&&F(d,A,S,a,_,l)}return;case 6:if(l.stateNode===null)throw Error(o(162));d=l.memoizedProps,it(l.stateNode,a!==null?a.memoizedProps:d,d);return;case 3:ot&&a!==null&&a.memoizedState.isDehydrated&&ra(l.stateNode.containerInfo);return;case 12:return;case 13:oc(l);return;case 19:oc(l);return;case 17:return}throw Error(o(163))}switch(l.tag){case 0:case 11:case 14:case 15:us(3,l,l.return),xa(3,l),us(5,l,l.return);return;case 12:return;case 13:oc(l);return;case 19:oc(l);return;case 3:ot&&a!==null&&a.memoizedState.isDehydrated&&ra(l.stateNode.containerInfo);break;case 22:case 23:return}e:if(gt){switch(l.tag){case 1:case 5:case 6:break e;case 3:case 4:l=l.stateNode,be(l.containerInfo,l.pendingChildren);break e}throw Error(o(163))}}function oc(a){var l=a.updateQueue;if(l!==null){a.updateQueue=null;var d=a.stateNode;d===null&&(d=a.stateNode=new sS),l.forEach(function(_){var S=gS.bind(null,a,_);d.has(_)||(d.add(_),_.then(S,S))})}}function aS(a,l){for(Ve=l;Ve!==null;){l=Ve;var d=l.deletions;if(d!==null)for(var _=0;_<d.length;_++){var S=d[_];try{var A=a;Ke?Fg(A,S,l):Lg(A,S,l);var z=S.alternate;z!==null&&(z.return=null),S.return=null}catch(tt){ti(S,l,tt)}}if(d=l.child,l.subtreeFlags&12854&&d!==null)d.return=l,Ve=d;else for(;Ve!==null;){l=Ve;try{var j=l.flags;if(j&32&&Ke&&re(l.stateNode),j&512){var de=l.alternate;if(de!==null){var Re=de.ref;Re!==null&&(typeof Re=="function"?Re(null):Re.current=null)}}if(j&8192)switch(l.tag){case 13:if(l.memoizedState!==null){var $e=l.alternate;($e===null||$e.memoizedState===null)&&(jf=bn())}break;case 22:var xt=l.memoizedState!==null,lt=l.alternate,qt=lt!==null&&lt.memoizedState!==null;if(d=l,Ke){e:if(_=d,S=xt,A=null,Ke)for(var rt=_;;){if(rt.tag===5){if(A===null){A=rt;var Bn=rt.stateNode;S?fe(Bn):ce(rt.stateNode,rt.memoizedProps)}}else if(rt.tag===6){if(A===null){var Ai=rt.stateNode;S?se(Ai):Ee(Ai,rt.memoizedProps)}}else if((rt.tag!==22&&rt.tag!==23||rt.memoizedState===null||rt===_)&&rt.child!==null){rt.child.return=rt,rt=rt.child;continue}if(rt===_)break;for(;rt.sibling===null;){if(rt.return===null||rt.return===_)break e;A===rt&&(A=null),rt=rt.return}A===rt&&(A=null),rt.sibling.return=rt.return,rt=rt.sibling}}if(xt&&!qt&&d.mode&1){Ve=d;for(var le=d.child;le!==null;){for(d=Ve=le;Ve!==null;){_=Ve;var Q=_.child;switch(_.tag){case 0:case 11:case 14:case 15:us(4,_,_.return);break;case 1:sc(_,_.return);var he=_.stateNode;if(typeof he.componentWillUnmount=="function"){var We=_.return;try{he.props=_.memoizedProps,he.state=_.memoizedState,he.componentWillUnmount()}catch(tt){ti(_,We,tt)}}break;case 5:sc(_,_.return);break;case 22:if(_.memoizedState!==null){kg(d);continue}}Q!==null?(Q.return=_,Ve=Q):kg(d)}le=le.sibling}}}switch(j&4102){case 2:Og(l),l.flags&=-3;break;case 6:Og(l),l.flags&=-3,Vf(l.alternate,l);break;case 4096:l.flags&=-4097;break;case 4100:l.flags&=-4097,Vf(l.alternate,l);break;case 4:Vf(l.alternate,l)}}catch(tt){ti(l,l.return,tt)}if(d=l.sibling,d!==null){d.return=l.return,Ve=d;break}Ve=l.return}}}function lS(a,l,d){Ve=a,Bg(a)}function Bg(a,l,d){for(var _=(a.mode&1)!==0;Ve!==null;){var S=Ve,A=S.child;if(S.tag===22&&_){var z=S.memoizedState!==null||rc;if(!z){var j=S.alternate,de=j!==null&&j.memoizedState!==null||cs;j=rc;var Re=cs;if(rc=z,(cs=de)&&!Re)for(Ve=S;Ve!==null;)z=Ve,de=z.child,z.tag===22&&z.memoizedState!==null?Hg(S):de!==null?(de.return=z,Ve=de):Hg(S);for(;A!==null;)Ve=A,Bg(A),A=A.sibling;Ve=S,rc=j,cs=Re}zg(a)}else S.subtreeFlags&8772&&A!==null?(A.return=S,Ve=A):zg(a)}}function zg(a){for(;Ve!==null;){var l=Ve;if(l.flags&8772){var d=l.alternate;try{if(l.flags&8772)switch(l.tag){case 0:case 11:case 15:cs||xa(5,l);break;case 1:var _=l.stateNode;if(l.flags&4&&!cs)if(d===null)_.componentDidMount();else{var S=l.elementType===l.type?d.memoizedProps:Di(l.type,d.memoizedProps);_.componentDidUpdate(S,d.memoizedState,_.__reactInternalSnapshotBeforeUpdate)}var A=l.updateQueue;A!==null&&Nm(l,A,_);break;case 3:var z=l.updateQueue;if(z!==null){if(d=null,l.child!==null)switch(l.child.tag){case 5:d=oe(l.child.stateNode);break;case 1:d=l.child.stateNode}Nm(l,z,d)}break;case 5:var j=l.stateNode;d===null&&l.flags&4&&at(j,l.type,l.memoizedProps,l);break;case 6:break;case 4:break;case 12:break;case 13:if(ot&&l.memoizedState===null){var de=l.alternate;if(de!==null){var Re=de.memoizedState;if(Re!==null){var $e=Re.dehydrated;$e!==null&&Il($e)}}}break;case 19:case 17:case 21:case 22:case 23:break;default:throw Error(o(163))}cs||l.flags&512&&zf(l)}catch(xt){ti(l,l.return,xt)}}if(l===a){Ve=null;break}if(d=l.sibling,d!==null){d.return=l.return,Ve=d;break}Ve=l.return}}function kg(a){for(;Ve!==null;){var l=Ve;if(l===a){Ve=null;break}var d=l.sibling;if(d!==null){d.return=l.return,Ve=d;break}Ve=l.return}}function Hg(a){for(;Ve!==null;){var l=Ve;try{switch(l.tag){case 0:case 11:case 15:var d=l.return;try{xa(4,l)}catch(de){ti(l,d,de)}break;case 1:var _=l.stateNode;if(typeof _.componentDidMount=="function"){var S=l.return;try{_.componentDidMount()}catch(de){ti(l,S,de)}}var A=l.return;try{zf(l)}catch(de){ti(l,A,de)}break;case 5:var z=l.return;try{zf(l)}catch(de){ti(l,z,de)}}}catch(de){ti(l,l.return,de)}if(l===a){Ve=null;break}var j=l.sibling;if(j!==null){j.return=l.return,Ve=j;break}Ve=l.return}}var ac=0,lc=1,cc=2,uc=3,hc=4;if(typeof Symbol=="function"&&Symbol.for){var ya=Symbol.for;ac=ya("selector.component"),lc=ya("selector.has_pseudo_class"),cc=ya("selector.role"),uc=ya("selector.test_id"),hc=ya("selector.text")}function Gf(a){var l=ge(a);if(l!=null){if(typeof l.memoizedProps["data-testname"]!="string")throw Error(o(364));return l}if(a=Et(a),a===null)throw Error(o(362));return a.stateNode.current}function Wf(a,l){switch(l.$$typeof){case ac:if(a.type===l.value)return!0;break;case lc:e:{l=l.value,a=[a,0];for(var d=0;d<a.length;){var _=a[d++],S=a[d++],A=l[S];if(_.tag!==5||!q(_)){for(;A!=null&&Wf(_,A);)S++,A=l[S];if(S===l.length){l=!0;break e}else for(_=_.child;_!==null;)a.push(_,S),_=_.sibling}}l=!1}return l;case cc:if(a.tag===5&&Kt(a.stateNode,l.value))return!0;break;case hc:if((a.tag===5||a.tag===6)&&(a=It(a),a!==null&&0<=a.indexOf(l.value)))return!0;break;case uc:if(a.tag===5&&(a=a.memoizedProps["data-testname"],typeof a=="string"&&a.toLowerCase()===l.value.toLowerCase()))return!0;break;default:throw Error(o(365))}return!1}function Xf(a){switch(a.$$typeof){case ac:return"<"+(E(a.value)||"Unknown")+">";case lc:return":has("+(Xf(a)||"")+")";case cc:return'[role="'+a.value+'"]';case hc:return'"'+a.value+'"';case uc:return'[data-testname="'+a.value+'"]';default:throw Error(o(365))}}function Vg(a,l){var d=[];a=[a,0];for(var _=0;_<a.length;){var S=a[_++],A=a[_++],z=l[A];if(S.tag!==5||!q(S)){for(;z!=null&&Wf(S,z);)A++,z=l[A];if(A===l.length)d.push(S);else for(S=S.child;S!==null;)a.push(S,A),S=S.sibling}}return d}function Yf(a,l){if(!Ze)throw Error(o(363));a=Gf(a),a=Vg(a,l),l=[],a=Array.from(a);for(var d=0;d<a.length;){var _=a[d++];if(_.tag===5)q(_)||l.push(_.stateNode);else for(_=_.child;_!==null;)a.push(_),_=_.sibling}return l}var cS=Math.ceil,fc=c.ReactCurrentDispatcher,qf=c.ReactCurrentOwner,cn=c.ReactCurrentBatchConfig,Pt=0,pn=null,mn=null,Rn=0,di=0,co=X(0),vn=0,Sa=null,uo=0,dc=0,Zf=0,Ma=null,$n=null,jf=0,Jf=1/0;function ho(){Jf=bn()+500}var pc=!1,Kf=null,kr=null,mc=!1,Hr=null,gc=0,wa=0,Qf=null,_c=-1,vc=0;function Wn(){return Pt&6?bn():_c!==-1?_c:_c=bn()}function Vr(a){return a.mode&1?Pt&2&&Rn!==0?Rn&-Rn:Xy.transition!==null?(vc===0&&(a=dn,dn<<=1,!(dn&4194240)&&(dn=64),vc=a),vc):(a=ut,a!==0?a:Ce()):1}function bi(a,l,d){if(50<wa)throw wa=0,Qf=null,Error(o(185));var _=xc(a,l);return _===null?null:(en(_,l,d),(!(Pt&2)||_!==pn)&&(_===pn&&(!(Pt&2)&&(dc|=l),vn===4&&Gr(_,Rn)),ei(_,d),l===1&&Pt===0&&!(a.mode&1)&&(ho(),Ul&&Ki())),_)}function xc(a,l){a.lanes|=l;var d=a.alternate;for(d!==null&&(d.lanes|=l),d=a,a=a.return;a!==null;)a.childLanes|=l,d=a.alternate,d!==null&&(d.childLanes|=l),d=a,a=a.return;return d.tag===3?d.stateNode:null}function ei(a,l){var d=a.callbackNode;Zi(a,l);var _=ln(a,a===pn?Rn:0);if(_===0)d!==null&&Cm(d),a.callbackNode=null,a.callbackPriority=0;else if(l=_&-_,a.callbackPriority!==l){if(d!=null&&Cm(d),l===1)a.tag===0?Wy(Wg.bind(null,a)):Rm(Wg.bind(null,a)),Ne?pt(function(){Pt===0&&Ki()}):$s(af,Ki),d=null;else{switch(xi(_)){case 1:d=af;break;case 4:d=ky;break;case 16:d=lf;break;case 536870912:d=Hy;break;default:d=lf}d=$g(d,Gg.bind(null,a))}a.callbackPriority=l,a.callbackNode=d}}function Gg(a,l){if(_c=-1,vc=0,Pt&6)throw Error(o(327));var d=a.callbackNode;if(ds()&&a.callbackNode!==d)return null;var _=ln(a,a===pn?Rn:0);if(_===0)return null;if(_&30||_&a.expiredLanes||l)l=yc(a,_);else{l=_;var S=Pt;Pt|=2;var A=qg();(pn!==a||Rn!==l)&&(ho(),hs(a,l));do try{fS();break}catch(j){Yg(a,j)}while(!0);hf(),fc.current=A,Pt=S,mn!==null?l=0:(pn=null,Rn=0,l=vn)}if(l!==0){if(l===2&&(S=Ni(a),S!==0&&(_=S,l=$f(a,S))),l===1)throw d=Sa,hs(a,0),Gr(a,_),ei(a,bn()),d;if(l===6)Gr(a,_);else{if(S=a.current.alternate,!(_&30)&&!uS(S)&&(l=yc(a,_),l===2&&(A=Ni(a),A!==0&&(_=A,l=$f(a,A))),l===1))throw d=Sa,hs(a,0),Gr(a,_),ei(a,bn()),d;switch(a.finishedWork=S,a.finishedLanes=_,l){case 0:case 1:throw Error(o(345));case 2:fs(a,$n);break;case 3:if(Gr(a,_),(_&130023424)===_&&(l=jf+500-bn(),10<l)){if(ln(a,0)!==0)break;if(S=a.suspendedLanes,(S&_)!==_){Wn(),a.pingedLanes|=a.suspendedLanes&S;break}a.timeoutHandle=Ye(fs.bind(null,a,$n),l);break}fs(a,$n);break;case 4:if(Gr(a,_),(_&4194240)===_)break;for(l=a.eventTimes,S=-1;0<_;){var z=31-Lt(_);A=1<<z,z=l[z],z>S&&(S=z),_&=~A}if(_=S,_=bn()-_,_=(120>_?120:480>_?480:1080>_?1080:1920>_?1920:3e3>_?3e3:4320>_?4320:1960*cS(_/1960))-_,10<_){a.timeoutHandle=Ye(fs.bind(null,a,$n),_);break}fs(a,$n);break;case 5:fs(a,$n);break;default:throw Error(o(329))}}}return ei(a,bn()),a.callbackNode===d?Gg.bind(null,a):null}function $f(a,l){var d=Ma;return a.current.memoizedState.isDehydrated&&(hs(a,l).flags|=256),a=yc(a,l),a!==2&&(l=$n,$n=d,l!==null&&ed(l)),a}function ed(a){$n===null?$n=a:$n.push.apply($n,a)}function uS(a){for(var l=a;;){if(l.flags&16384){var d=l.updateQueue;if(d!==null&&(d=d.stores,d!==null))for(var _=0;_<d.length;_++){var S=d[_],A=S.getSnapshot;S=S.value;try{if(!Ji(A(),S))return!1}catch{return!1}}}if(d=l.child,l.subtreeFlags&16384&&d!==null)d.return=l,l=d;else{if(l===a)break;for(;l.sibling===null;){if(l.return===null||l.return===a)return!0;l=l.return}l.sibling.return=l.return,l=l.sibling}}return!0}function Gr(a,l){for(l&=~Zf,l&=~dc,a.suspendedLanes|=l,a.pingedLanes&=~l,a=a.expirationTimes;0<l;){var d=31-Lt(l),_=1<<d;a[d]=-1,l&=~_}}function Wg(a){if(Pt&6)throw Error(o(327));ds();var l=ln(a,0);if(!(l&1))return ei(a,bn()),null;var d=yc(a,l);if(a.tag!==0&&d===2){var _=Ni(a);_!==0&&(l=_,d=$f(a,_))}if(d===1)throw d=Sa,hs(a,0),Gr(a,l),ei(a,bn()),d;if(d===6)throw Error(o(345));return a.finishedWork=a.current.alternate,a.finishedLanes=l,fs(a,$n),ei(a,bn()),null}function Xg(a){Hr!==null&&Hr.tag===0&&!(Pt&6)&&ds();var l=Pt;Pt|=1;var d=cn.transition,_=ut;try{if(cn.transition=null,ut=1,a)return a()}finally{ut=_,cn.transition=d,Pt=l,!(Pt&6)&&Ki()}}function td(){di=co.current,$(co)}function hs(a,l){a.finishedWork=null,a.finishedLanes=0;var d=a.timeoutHandle;if(d!==et&&(a.timeoutHandle=et,Ue(d)),mn!==null)for(d=mn.return;d!==null;){var _=d;switch(vf(_),_.tag){case 1:_=_.type.childContextTypes,_!=null&&ft();break;case 3:ao(),$(Fe),$(Se),bf();break;case 5:wf(_);break;case 4:ao();break;case 13:$(tn);break;case 19:$(tn);break;case 10:ff(_.type._context);break;case 22:case 23:td()}d=d.return}if(pn=a,mn=a=Wr(a.current,null),Rn=di=l,vn=0,Sa=null,Zf=dc=uo=0,$n=Ma=null,Qi!==null){for(l=0;l<Qi.length;l++)if(d=Qi[l],_=d.interleaved,_!==null){d.interleaved=null;var S=_.next,A=d.pending;if(A!==null){var z=A.next;A.next=S,_.next=z}d.pending=_}Qi=null}return a}function Yg(a,l){do{var d=mn;try{if(hf(),Yl.current=Ql,ql){for(var _=on.memoizedState;_!==null;){var S=_.queue;S!==null&&(S.pending=null),_=_.next}ql=!1}if(lo=0,Tn=Un=on=null,fa=!1,da=0,qf.current=null,d===null||d.return===null){vn=1,Sa=l,mn=null;break}e:{var A=a,z=d.return,j=d,de=l;if(l=Rn,j.flags|=32768,de!==null&&typeof de=="object"&&typeof de.then=="function"){var Re=de,$e=j,xt=$e.tag;if(!($e.mode&1)&&(xt===0||xt===11||xt===15)){var lt=$e.alternate;lt?($e.updateQueue=lt.updateQueue,$e.memoizedState=lt.memoizedState,$e.lanes=lt.lanes):($e.updateQueue=null,$e.memoizedState=null)}var qt=dg(z);if(qt!==null){qt.flags&=-257,pg(qt,z,j,A,l),qt.mode&1&&fg(A,Re,l),l=qt,de=Re;var rt=l.updateQueue;if(rt===null){var Bn=new Set;Bn.add(de),l.updateQueue=Bn}else rt.add(de);break e}else{if(!(l&1)){fg(A,Re,l),nd();break e}de=Error(o(426))}}else if(Qt&&j.mode&1){var Ai=dg(z);if(Ai!==null){!(Ai.flags&65536)&&(Ai.flags|=256),pg(Ai,z,j,A,l),Sf(de);break e}}A=de,vn!==4&&(vn=2),Ma===null?Ma=[A]:Ma.push(A),de=Lf(de,j),j=z;do{switch(j.tag){case 3:j.flags|=65536,l&=-l,j.lanes|=l;var le=ug(j,de,l);Lm(j,le);break e;case 1:A=de;var Q=j.type,he=j.stateNode;if(!(j.flags&128)&&(typeof Q.getDerivedStateFromError=="function"||he!==null&&typeof he.componentDidCatch=="function"&&(kr===null||!kr.has(he)))){j.flags|=65536,l&=-l,j.lanes|=l;var We=hg(j,A,l);Lm(j,We);break e}}j=j.return}while(j!==null)}jg(d)}catch(tt){l=tt,mn===d&&d!==null&&(mn=d=d.return);continue}break}while(!0)}function qg(){var a=fc.current;return fc.current=Ql,a===null?Ql:a}function nd(){(vn===0||vn===3||vn===2)&&(vn=4),pn===null||!(uo&268435455)&&!(dc&268435455)||Gr(pn,Rn)}function yc(a,l){var d=Pt;Pt|=2;var _=qg();pn===a&&Rn===l||hs(a,l);do try{hS();break}catch(S){Yg(a,S)}while(!0);if(hf(),Pt=d,fc.current=_,mn!==null)throw Error(o(261));return pn=null,Rn=0,vn}function hS(){for(;mn!==null;)Zg(mn)}function fS(){for(;mn!==null&&!By();)Zg(mn)}function Zg(a){var l=Qg(a.alternate,a,di);a.memoizedProps=a.pendingProps,l===null?jg(a):mn=l,qf.current=null}function jg(a){var l=a;do{var d=l.alternate;if(a=l.return,l.flags&32768){if(d=rS(d,l),d!==null){d.flags&=32767,mn=d;return}if(a!==null)a.flags|=32768,a.subtreeFlags=0,a.deletions=null;else{vn=6,mn=null;return}}else if(d=tS(d,l,di),d!==null){mn=d;return}if(l=l.sibling,l!==null){mn=l;return}mn=l=a}while(l!==null);vn===0&&(vn=5)}function fs(a,l){var d=ut,_=cn.transition;try{cn.transition=null,ut=1,dS(a,l,d)}finally{cn.transition=_,ut=d}return null}function dS(a,l,d){do ds();while(Hr!==null);if(Pt&6)throw Error(o(327));var _=a.finishedWork,S=a.finishedLanes;if(_===null)return null;if(a.finishedWork=null,a.finishedLanes=0,_===a.current)throw Error(o(177));a.callbackNode=null,a.callbackPriority=0;var A=_.lanes|_.childLanes;if(ci(a,A),a===pn&&(mn=pn=null,Rn=0),!(_.subtreeFlags&2064)&&!(_.flags&2064)||mc||(mc=!0,$g(lf,function(){return ds(),null})),A=(_.flags&15990)!==0,_.subtreeFlags&15990||A){A=cn.transition,cn.transition=null;var z=ut;ut=1;var j=Pt;Pt|=4,qf.current=null,oS(a,_),aS(a,_),W(a.containerInfo),a.current=_,lS(_),zy(),Pt=j,ut=z,cn.transition=A}else a.current=_;if(mc&&(mc=!1,Hr=a,gc=S),A=a.pendingLanes,A===0&&(kr=null),Vy(_.stateNode),ei(a,bn()),l!==null)for(d=a.onRecoverableError,_=0;_<l.length;_++)d(l[_]);if(pc)throw pc=!1,a=Kf,Kf=null,a;return gc&1&&a.tag!==0&&ds(),A=a.pendingLanes,A&1?a===Qf?wa++:(wa=0,Qf=a):wa=0,Ki(),null}function ds(){if(Hr!==null){var a=xi(gc),l=cn.transition,d=ut;try{if(cn.transition=null,ut=16>a?16:a,Hr===null)var _=!1;else{if(a=Hr,Hr=null,gc=0,Pt&6)throw Error(o(331));var S=Pt;for(Pt|=4,Ve=a.current;Ve!==null;){var A=Ve,z=A.child;if(Ve.flags&16){var j=A.deletions;if(j!==null){for(var de=0;de<j.length;de++){var Re=j[de];for(Ve=Re;Ve!==null;){var $e=Ve;switch($e.tag){case 0:case 11:case 15:us(8,$e,A)}var xt=$e.child;if(xt!==null)xt.return=$e,Ve=xt;else for(;Ve!==null;){$e=Ve;var lt=$e.sibling,qt=$e.return;if(Ng($e),$e===Re){Ve=null;break}if(lt!==null){lt.return=qt,Ve=lt;break}Ve=qt}}}var rt=A.alternate;if(rt!==null){var Bn=rt.child;if(Bn!==null){rt.child=null;do{var Ai=Bn.sibling;Bn.sibling=null,Bn=Ai}while(Bn!==null)}}Ve=A}}if(A.subtreeFlags&2064&&z!==null)z.return=A,Ve=z;else e:for(;Ve!==null;){if(A=Ve,A.flags&2048)switch(A.tag){case 0:case 11:case 15:us(9,A,A.return)}var le=A.sibling;if(le!==null){le.return=A.return,Ve=le;break e}Ve=A.return}}var Q=a.current;for(Ve=Q;Ve!==null;){z=Ve;var he=z.child;if(z.subtreeFlags&2064&&he!==null)he.return=z,Ve=he;else e:for(z=Q;Ve!==null;){if(j=Ve,j.flags&2048)try{switch(j.tag){case 0:case 11:case 15:xa(9,j)}}catch(tt){ti(j,j.return,tt)}if(j===z){Ve=null;break e}var We=j.sibling;if(We!==null){We.return=j.return,Ve=We;break e}Ve=j.return}}if(Pt=S,Ki(),ji&&typeof ji.onPostCommitFiberRoot=="function")try{ji.onPostCommitFiberRoot(Dl,a)}catch{}_=!0}return _}finally{ut=d,cn.transition=l}}return!1}function Jg(a,l,d){l=Lf(d,l),l=ug(a,l,1),zr(a,l),l=Wn(),a=xc(a,1),a!==null&&(en(a,1,l),ei(a,l))}function ti(a,l,d){if(a.tag===3)Jg(a,a,d);else for(;l!==null;){if(l.tag===3){Jg(l,a,d);break}else if(l.tag===1){var _=l.stateNode;if(typeof l.type.getDerivedStateFromError=="function"||typeof _.componentDidCatch=="function"&&(kr===null||!kr.has(_))){a=Lf(d,a),a=hg(l,a,1),zr(l,a),a=Wn(),l=xc(l,1),l!==null&&(en(l,1,a),ei(l,a));break}}l=l.return}}function pS(a,l,d){var _=a.pingCache;_!==null&&_.delete(l),l=Wn(),a.pingedLanes|=a.suspendedLanes&d,pn===a&&(Rn&d)===d&&(vn===4||vn===3&&(Rn&130023424)===Rn&&500>bn()-jf?hs(a,0):Zf|=d),ei(a,l)}function Kg(a,l){l===0&&(a.mode&1?(l=Ut,Ut<<=1,!(Ut&130023424)&&(Ut=4194304)):l=1);var d=Wn();a=xc(a,l),a!==null&&(en(a,l,d),ei(a,d))}function mS(a){var l=a.memoizedState,d=0;l!==null&&(d=l.retryLane),Kg(a,d)}function gS(a,l){var d=0;switch(a.tag){case 13:var _=a.stateNode,S=a.memoizedState;S!==null&&(d=S.retryLane);break;case 19:_=a.stateNode;break;default:throw Error(o(314))}_!==null&&_.delete(l),Kg(a,d)}var Qg;Qg=function(a,l,d){if(a!==null)if(a.memoizedProps!==l.pendingProps||Fe.current)fi=!0;else{if(!(a.lanes&d)&&!(l.flags&128))return fi=!1,iS(a,l,d);fi=!!(a.flags&131072)}else fi=!1,Qt&&l.flags&1048576&&Bm(l,Gl,l.index);switch(l.lanes=0,l.tag){case 2:var _=l.type;a!==null&&(a.alternate=null,l.alternate=null,l.flags|=2),a=l.pendingProps;var S=Oe(l,Se.current);to(l,d),S=Af(null,l,_,a,S,d);var A=Cf();return l.flags|=1,typeof S=="object"&&S!==null&&typeof S.render=="function"&&S.$$typeof===void 0?(l.tag=1,l.memoizedState=null,l.updateQueue=null,He(_)?(A=!0,Tt(l)):A=!1,l.memoizedState=S.state!==null&&S.state!==void 0?S.state:null,pf(l),S.updater=Hl,l.stateNode=S,S._reactInternals=l,gf(l,_,a,d),l=Uf(null,l,_,!0,A,d)):(l.tag=0,Qt&&A&&_f(l),Gn(null,l,S,d),l=l.child),l;case 16:_=l.elementType;e:{switch(a!==null&&(a.alternate=null,l.alternate=null,l.flags|=2),a=l.pendingProps,S=_._init,_=S(_._payload),l.type=_,S=l.tag=vS(_),a=Di(_,a),S){case 0:l=Df(null,l,_,a,d);break e;case 1:l=Mg(null,l,_,a,d);break e;case 11:l=_g(null,l,_,a,d);break e;case 14:l=vg(null,l,_,Di(_.type,a),d);break e}throw Error(o(306,_,""))}return l;case 0:return _=l.type,S=l.pendingProps,S=l.elementType===_?S:Di(_,S),Df(a,l,_,S,d);case 1:return _=l.type,S=l.pendingProps,S=l.elementType===_?S:Di(_,S),Mg(a,l,_,S,d);case 3:e:{if(wg(l),a===null)throw Error(o(387));_=l.pendingProps,A=l.memoizedState,S=A.element,Im(a,l),kl(l,_,null,d);var z=l.memoizedState;if(_=z.element,ot&&A.isDehydrated)if(A={element:_,isDehydrated:!1,cache:z.cache,transitions:z.transitions},l.updateQueue.baseState=A,l.memoizedState=A,l.flags&256){S=Error(o(423)),l=Eg(a,l,_,d,S);break e}else if(_!==S){S=Error(o(424)),l=Eg(a,l,_,d,S);break e}else for(ot&&(hi=na(l.stateNode.containerInfo),ui=l,Qt=!0,Ui=null,aa=!1),d=Wm(l,null,_,d),l.child=d;d;)d.flags=d.flags&-3|4096,d=d.sibling;else{if(ro(),_===S){l=yr(a,l,d);break e}Gn(a,l,_,d)}l=l.child}return l;case 5:return Xm(l),a===null&&yf(l),_=l.type,S=l.pendingProps,A=a!==null?a.memoizedProps:null,z=S.children,Me(_,S)?z=null:A!==null&&Me(_,A)&&(l.flags|=32),Sg(a,l),Gn(a,l,z,d),l.child;case 6:return a===null&&yf(l),null;case 13:return bg(a,l,d);case 4:return Mf(l,l.stateNode.containerInfo),_=l.pendingProps,a===null?l.child=so(l,null,_,d):Gn(a,l,_,d),l.child;case 11:return _=l.type,S=l.pendingProps,S=l.elementType===_?S:Di(_,S),_g(a,l,_,S,d);case 7:return Gn(a,l,l.pendingProps,d),l.child;case 8:return Gn(a,l,l.pendingProps.children,d),l.child;case 12:return Gn(a,l,l.pendingProps.children,d),l.child;case 10:e:{if(_=l.type._context,S=l.pendingProps,A=l.memoizedProps,z=S.value,Pm(l,_,z),A!==null)if(Ji(A.value,z)){if(A.children===S.children&&!Fe.current){l=yr(a,l,d);break e}}else for(A=l.child,A!==null&&(A.return=l);A!==null;){var j=A.dependencies;if(j!==null){z=A.child;for(var de=j.firstContext;de!==null;){if(de.context===_){if(A.tag===1){de=gr(-1,d&-d),de.tag=2;var Re=A.updateQueue;if(Re!==null){Re=Re.shared;var $e=Re.pending;$e===null?de.next=de:(de.next=$e.next,$e.next=de),Re.pending=de}}A.lanes|=d,de=A.alternate,de!==null&&(de.lanes|=d),df(A.return,d,l),j.lanes|=d;break}de=de.next}}else if(A.tag===10)z=A.type===l.type?null:A.child;else if(A.tag===18){if(z=A.return,z===null)throw Error(o(341));z.lanes|=d,j=z.alternate,j!==null&&(j.lanes|=d),df(z,d,l),z=A.sibling}else z=A.child;if(z!==null)z.return=A;else for(z=A;z!==null;){if(z===l){z=null;break}if(A=z.sibling,A!==null){A.return=z.return,z=A;break}z=z.return}A=z}Gn(a,l,S.children,d),l=l.child}return l;case 9:return S=l.type,_=l.pendingProps.children,to(l,d),S=yi(S),_=_(S),l.flags|=1,Gn(a,l,_,d),l.child;case 14:return _=l.type,S=Di(_,l.pendingProps),S=Di(_.type,S),vg(a,l,_,S,d);case 15:return xg(a,l,l.type,l.pendingProps,d);case 17:return _=l.type,S=l.pendingProps,S=l.elementType===_?S:Di(_,S),a!==null&&(a.alternate=null,l.alternate=null,l.flags|=2),l.tag=1,He(_)?(a=!0,Tt(l)):a=!1,to(l,d),Om(l,_,S),gf(l,_,S,d),Uf(null,l,_,!0,a,d);case 19:return Rg(a,l,d);case 22:return yg(a,l,d)}throw Error(o(156,l.tag))};function $g(a,l){return $s(a,l)}function _S(a,l,d,_){this.tag=a,this.key=d,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=l,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=_,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ti(a,l,d,_){return new _S(a,l,d,_)}function id(a){return a=a.prototype,!(!a||!a.isReactComponent)}function vS(a){if(typeof a=="function")return id(a)?1:0;if(a!=null){if(a=a.$$typeof,a===M)return 11;if(a===w)return 14}return 2}function Wr(a,l){var d=a.alternate;return d===null?(d=Ti(a.tag,l,a.key,a.mode),d.elementType=a.elementType,d.type=a.type,d.stateNode=a.stateNode,d.alternate=a,a.alternate=d):(d.pendingProps=l,d.type=a.type,d.flags=0,d.subtreeFlags=0,d.deletions=null),d.flags=a.flags&14680064,d.childLanes=a.childLanes,d.lanes=a.lanes,d.child=a.child,d.memoizedProps=a.memoizedProps,d.memoizedState=a.memoizedState,d.updateQueue=a.updateQueue,l=a.dependencies,d.dependencies=l===null?null:{lanes:l.lanes,firstContext:l.firstContext},d.sibling=a.sibling,d.index=a.index,d.ref=a.ref,d}function Sc(a,l,d,_,S,A){var z=2;if(_=a,typeof a=="function")id(a)&&(z=1);else if(typeof a=="string")z=5;else e:switch(a){case f:return ps(d.children,S,A,l);case p:z=8,S|=8;break;case m:return a=Ti(12,d,l,S|2),a.elementType=m,a.lanes=A,a;case y:return a=Ti(13,d,l,S),a.elementType=y,a.lanes=A,a;case x:return a=Ti(19,d,l,S),a.elementType=x,a.lanes=A,a;case T:return Mc(d,S,A,l);default:if(typeof a=="object"&&a!==null)switch(a.$$typeof){case g:z=10;break e;case v:z=9;break e;case M:z=11;break e;case w:z=14;break e;case b:z=16,_=null;break e}throw Error(o(130,a==null?a:typeof a,""))}return l=Ti(z,d,l,S),l.elementType=a,l.type=_,l.lanes=A,l}function ps(a,l,d,_){return a=Ti(7,a,_,l),a.lanes=d,a}function Mc(a,l,d,_){return a=Ti(22,a,_,l),a.elementType=T,a.lanes=d,a.stateNode={},a}function rd(a,l,d){return a=Ti(6,a,null,l),a.lanes=d,a}function sd(a,l,d){return l=Ti(4,a.children!==null?a.children:[],a.key,l),l.lanes=d,l.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation},l}function xS(a,l,d,_,S){this.tag=l,this.containerInfo=a,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=et,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Nt(0),this.expirationTimes=Nt(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Nt(0),this.identifierPrefix=_,this.onRecoverableError=S,ot&&(this.mutableSourceEagerHydrationData=null)}function e0(a,l,d,_,S,A,z,j,de){return a=new xS(a,l,d,j,de),l===1?(l=1,A===!0&&(l|=8)):l=0,A=Ti(3,null,null,l),a.current=A,A.stateNode=a,A.memoizedState={element:_,isDehydrated:d,cache:null,transitions:null},pf(A),a}function t0(a){if(!a)return ee;a=a._reactInternals;e:{if(B(a)!==a||a.tag!==1)throw Error(o(170));var l=a;do{switch(l.tag){case 3:l=l.stateNode.context;break e;case 1:if(He(l.type)){l=l.stateNode.__reactInternalMemoizedMergedChildContext;break e}}l=l.return}while(l!==null);throw Error(o(171))}if(a.tag===1){var d=a.type;if(He(d))return Je(a,d,l)}return l}function n0(a){var l=a._reactInternals;if(l===void 0)throw typeof a.render=="function"?Error(o(188)):(a=Object.keys(a).join(","),Error(o(268,a)));return a=Y(l),a===null?null:a.stateNode}function i0(a,l){if(a=a.memoizedState,a!==null&&a.dehydrated!==null){var d=a.retryLane;a.retryLane=d!==0&&d<l?d:l}}function od(a,l){i0(a,l),(a=a.alternate)&&i0(a,l)}function yS(a){return a=Y(a),a===null?null:a.stateNode}function SS(){return null}return t.attemptContinuousHydration=function(a){if(a.tag===13){var l=Wn();bi(a,134217728,l),od(a,134217728)}},t.attemptHydrationAtCurrentPriority=function(a){if(a.tag===13){var l=Wn(),d=Vr(a);bi(a,d,l),od(a,d)}},t.attemptSynchronousHydration=function(a){switch(a.tag){case 3:var l=a.stateNode;if(l.current.memoizedState.isDehydrated){var d=li(l.pendingLanes);d!==0&&(Yt(l,d|1),ei(l,bn()),!(Pt&6)&&(ho(),Ki()))}break;case 13:var _=Wn();Xg(function(){return bi(a,1,_)}),od(a,1)}},t.batchedUpdates=function(a,l){var d=Pt;Pt|=1;try{return a(l)}finally{Pt=d,Pt===0&&(ho(),Ul&&Ki())}},t.createComponentSelector=function(a){return{$$typeof:ac,value:a}},t.createContainer=function(a,l,d,_,S,A,z){return e0(a,l,!1,null,d,_,S,A,z)},t.createHasPseudoClassSelector=function(a){return{$$typeof:lc,value:a}},t.createHydrationContainer=function(a,l,d,_,S,A,z,j,de){return a=e0(d,_,!0,a,S,A,z,j,de),a.context=t0(null),d=a.current,_=Wn(),S=Vr(d),A=gr(_,S),A.callback=l??null,zr(d,A),a.current.lanes=S,en(a,S,_),ei(a,_),a},t.createPortal=function(a,l,d){var _=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:h,key:_==null?null:""+_,children:a,containerInfo:l,implementation:d}},t.createRoleSelector=function(a){return{$$typeof:cc,value:a}},t.createTestNameSelector=function(a){return{$$typeof:uc,value:a}},t.createTextSelector=function(a){return{$$typeof:hc,value:a}},t.deferredUpdates=function(a){var l=ut,d=cn.transition;try{return cn.transition=null,ut=16,a()}finally{ut=l,cn.transition=d}},t.discreteUpdates=function(a,l,d,_,S){var A=ut,z=cn.transition;try{return cn.transition=null,ut=1,a(l,d,_,S)}finally{ut=A,cn.transition=z,Pt===0&&ho()}},t.findAllNodes=Yf,t.findBoundingRects=function(a,l){if(!Ze)throw Error(o(363));l=Yf(a,l),a=[];for(var d=0;d<l.length;d++)a.push(bt(l[d]));for(l=a.length-1;0<l;l--){d=a[l];for(var _=d.x,S=_+d.width,A=d.y,z=A+d.height,j=l-1;0<=j;j--)if(l!==j){var de=a[j],Re=de.x,$e=Re+de.width,xt=de.y,lt=xt+de.height;if(_>=Re&&A>=xt&&S<=$e&&z<=lt){a.splice(l,1);break}else if(_!==Re||d.width!==de.width||lt<A||xt>z){if(!(A!==xt||d.height!==de.height||$e<_||Re>S)){Re>_&&(de.width+=Re-_,de.x=_),$e<S&&(de.width=S-Re),a.splice(l,1);break}}else{xt>A&&(de.height+=xt-A,de.y=A),lt<z&&(de.height=z-xt),a.splice(l,1);break}}}return a},t.findHostInstance=n0,t.findHostInstanceWithNoPortals=function(a){return a=D(a),a=a!==null?H(a):null,a===null?null:a.stateNode},t.findHostInstanceWithWarning=function(a){return n0(a)},t.flushControlled=function(a){var l=Pt;Pt|=1;var d=cn.transition,_=ut;try{cn.transition=null,ut=1,a()}finally{ut=_,cn.transition=d,Pt=l,Pt===0&&(ho(),Ki())}},t.flushPassiveEffects=ds,t.flushSync=Xg,t.focusWithin=function(a,l){if(!Ze)throw Error(o(363));for(a=Gf(a),l=Vg(a,l),l=Array.from(l),a=0;a<l.length;){var d=l[a++];if(!q(d)){if(d.tag===5&&St(d.stateNode))return!0;for(d=d.child;d!==null;)l.push(d),d=d.sibling}}return!1},t.getCurrentUpdatePriority=function(){return ut},t.getFindAllNodesFailureDescription=function(a,l){if(!Ze)throw Error(o(363));var d=0,_=[];a=[Gf(a),0];for(var S=0;S<a.length;){var A=a[S++],z=a[S++],j=l[z];if((A.tag!==5||!q(A))&&(Wf(A,j)&&(_.push(Xf(j)),z++,z>d&&(d=z)),z<l.length))for(A=A.child;A!==null;)a.push(A,z),A=A.sibling}if(d<l.length){for(a=[];d<l.length;d++)a.push(Xf(l[d]));return`findAllNodes was able to match part of the selector:
  `+(_.join(" > ")+`

No matching component was found for:
  `)+a.join(" > ")}return null},t.getPublicRootInstance=function(a){if(a=a.current,!a.child)return null;switch(a.child.tag){case 5:return oe(a.child.stateNode);default:return a.child.stateNode}},t.injectIntoDevTools=function(a){if(a={bundleType:a.bundleType,version:a.version,rendererPackageName:a.rendererPackageName,rendererConfig:a.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:c.ReactCurrentDispatcher,findHostInstanceByFiber:yS,findFiberByHostInstance:a.findFiberByHostInstance||SS,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.0.0-fc46dba67-20220329"},typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u")a=!1;else{var l=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(l.isDisabled||!l.supportsFiber)a=!0;else{try{Dl=l.inject(a),ji=l}catch{}a=!!l.checkDCE}}return a},t.isAlreadyRendering=function(){return!1},t.observeVisibleRects=function(a,l,d,_){if(!Ze)throw Error(o(363));a=Yf(a,l);var S=Ht(a,d,_).disconnect;return{disconnect:function(){S()}}},t.registerMutableSourceForHydration=function(a,l){var d=l._getVersion;d=d(l._source),a.mutableSourceEagerHydrationData==null?a.mutableSourceEagerHydrationData=[l,d]:a.mutableSourceEagerHydrationData.push(l,d)},t.runWithPriority=function(a,l){var d=ut;try{return ut=a,l()}finally{ut=d}},t.shouldError=function(){return null},t.shouldSuspend=function(){return!1},t.updateContainer=function(a,l,d,_){var S=l.current,A=Wn(),z=Vr(S);return d=t0(d),l.context===null?l.context=d:l.pendingContext=d,l=gr(A,z),l.payload={element:a},_=_===void 0?null:_,_!==null&&(l.callback=_),zr(S,l),a=bi(S,z,A),a!==null&&zl(a,S,z),z},t};py.exports=pR;var mR=py.exports;const gR=wS(mR);var my={exports:{}},gy={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(r){function e(k,G){var W=k.length;k.push(G);e:for(;0<W;){var J=W-1>>>1,_e=k[J];if(0<i(_e,G))k[J]=G,k[W]=_e,W=J;else break e}}function t(k){return k.length===0?null:k[0]}function n(k){if(k.length===0)return null;var G=k[0],W=k.pop();if(W!==G){k[0]=W;e:for(var J=0,_e=k.length,Te=_e>>>1;J<Te;){var ae=2*(J+1)-1,Me=k[ae],Pe=ae+1,Ye=k[Pe];if(0>i(Me,W))Pe<_e&&0>i(Ye,Me)?(k[J]=Ye,k[Pe]=W,J=Pe):(k[J]=Me,k[ae]=W,J=ae);else if(Pe<_e&&0>i(Ye,W))k[J]=Ye,k[Pe]=W,J=Pe;else break e}}return G}function i(k,G){var W=k.sortIndex-G.sortIndex;return W!==0?W:k.id-G.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;r.unstable_now=function(){return s.now()}}else{var o=Date,c=o.now();r.unstable_now=function(){return o.now()-c}}var u=[],h=[],f=1,p=null,m=3,g=!1,v=!1,M=!1,y=typeof setTimeout=="function"?setTimeout:null,x=typeof clearTimeout=="function"?clearTimeout:null,w=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function b(k){for(var G=t(h);G!==null;){if(G.callback===null)n(h);else if(G.startTime<=k)n(h),G.sortIndex=G.expirationTime,e(u,G);else break;G=t(h)}}function T(k){if(M=!1,b(k),!v)if(t(u)!==null)v=!0,oe(P);else{var G=t(h);G!==null&&te(T,G.startTime-k)}}function P(k,G){v=!1,M&&(M=!1,x(C),C=-1),g=!0;var W=m;try{for(b(G),p=t(u);p!==null&&(!(p.expirationTime>G)||k&&!D());){var J=p.callback;if(typeof J=="function"){p.callback=null,m=p.priorityLevel;var _e=J(p.expirationTime<=G);G=r.unstable_now(),typeof _e=="function"?p.callback=_e:p===t(u)&&n(u),b(G)}else n(u);p=t(u)}if(p!==null)var Te=!0;else{var ae=t(h);ae!==null&&te(T,ae.startTime-G),Te=!1}return Te}finally{p=null,m=W,g=!1}}var R=!1,E=null,C=-1,B=5,N=-1;function D(){return!(r.unstable_now()-N<B)}function Y(){if(E!==null){var k=r.unstable_now();N=k;var G=!0;try{G=E(!0,k)}finally{G?K():(R=!1,E=null)}}else R=!1}var K;if(typeof w=="function")K=function(){w(Y)};else if(typeof MessageChannel<"u"){var H=new MessageChannel,ne=H.port2;H.port1.onmessage=Y,K=function(){ne.postMessage(null)}}else K=function(){y(Y,0)};function oe(k){E=k,R||(R=!0,K())}function te(k,G){C=y(function(){k(r.unstable_now())},G)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(k){k.callback=null},r.unstable_continueExecution=function(){v||g||(v=!0,oe(P))},r.unstable_forceFrameRate=function(k){0>k||125<k?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):B=0<k?Math.floor(1e3/k):5},r.unstable_getCurrentPriorityLevel=function(){return m},r.unstable_getFirstCallbackNode=function(){return t(u)},r.unstable_next=function(k){switch(m){case 1:case 2:case 3:var G=3;break;default:G=m}var W=m;m=G;try{return k()}finally{m=W}},r.unstable_pauseExecution=function(){},r.unstable_requestPaint=function(){},r.unstable_runWithPriority=function(k,G){switch(k){case 1:case 2:case 3:case 4:case 5:break;default:k=3}var W=m;m=k;try{return G()}finally{m=W}},r.unstable_scheduleCallback=function(k,G,W){var J=r.unstable_now();switch(typeof W=="object"&&W!==null?(W=W.delay,W=typeof W=="number"&&0<W?J+W:J):W=J,k){case 1:var _e=-1;break;case 2:_e=250;break;case 5:_e=1073741823;break;case 4:_e=1e4;break;default:_e=5e3}return _e=W+_e,k={id:f++,callback:G,priorityLevel:k,startTime:W,expirationTime:_e,sortIndex:-1},W>J?(k.sortIndex=W,e(h,k),t(u)===null&&k===t(h)&&(M?(x(C),C=-1):M=!0,te(T,W-J))):(k.sortIndex=_e,e(u,k),v||g||(v=!0,oe(P))),k},r.unstable_shouldYield=D,r.unstable_wrapCallback=function(k){var G=m;return function(){var W=m;m=G;try{return k.apply(this,arguments)}finally{m=W}}}})(gy);my.exports=gy;var V_=my.exports;const xm={},_R=r=>void Object.assign(xm,r);function vR(r,e){function t(f,{args:p=[],attach:m,...g},v){let M=`${f[0].toUpperCase()}${f.slice(1)}`,y;if(f==="primitive"){if(g.object===void 0)throw new Error("R3F: Primitives without 'object' are invalid!");const x=g.object;y=Uo(x,{type:f,root:v,attach:m,primitive:!0})}else{const x=xm[M];if(!x)throw new Error(`R3F: ${M} is not part of the THREE namespace! Did you forget to extend? See: https://docs.pmnd.rs/react-three-fiber/api/objects#using-3rd-party-objects-declaratively`);if(!Array.isArray(p))throw new Error("R3F: The args prop must be an array!");y=Uo(new x(...p),{type:f,root:v,attach:m,memoizedProps:{args:p}})}return y.__r3f.attach===void 0&&(y.isBufferGeometry?y.__r3f.attach="geometry":y.isMaterial&&(y.__r3f.attach="material")),M!=="inject"&&Jd(y,g),y}function n(f,p){let m=!1;if(p){var g,v;(g=p.__r3f)!=null&&g.attach?jd(f,p,p.__r3f.attach):p.isObject3D&&f.isObject3D&&(f.add(p),m=!0),m||(v=f.__r3f)==null||v.objects.push(p),p.__r3f||Uo(p,{}),p.__r3f.parent=f,wp(p),Oo(p)}}function i(f,p,m){let g=!1;if(p){var v,M;if((v=p.__r3f)!=null&&v.attach)jd(f,p,p.__r3f.attach);else if(p.isObject3D&&f.isObject3D){p.parent=f,p.dispatchEvent({type:"added"}),f.dispatchEvent({type:"childadded",child:p});const y=f.children.filter(w=>w!==p),x=y.indexOf(m);f.children=[...y.slice(0,x),p,...y.slice(x)],g=!0}g||(M=f.__r3f)==null||M.objects.push(p),p.__r3f||Uo(p,{}),p.__r3f.parent=f,wp(p),Oo(p)}}function s(f,p,m=!1){f&&[...f].forEach(g=>o(p,g,m))}function o(f,p,m){if(p){var g,v,M;if(p.__r3f&&(p.__r3f.parent=null),(g=f.__r3f)!=null&&g.objects&&(f.__r3f.objects=f.__r3f.objects.filter(T=>T!==p)),(v=p.__r3f)!=null&&v.attach)q_(f,p,p.__r3f.attach);else if(p.isObject3D&&f.isObject3D){var y;f.remove(p),(y=p.__r3f)!=null&&y.root&&bR(bu(p),p)}const w=(M=p.__r3f)==null?void 0:M.primitive,b=!w&&(m===void 0?p.dispose!==null:m);if(!w){var x;s((x=p.__r3f)==null?void 0:x.objects,p,b),s(p.children,p,b)}if(delete p.__r3f,b&&p.dispose&&p.type!=="Scene"){const T=()=>{try{p.dispose()}catch{}};typeof IS_REACT_ACT_ENVIRONMENT>"u"?V_.unstable_scheduleCallback(V_.unstable_IdlePriority,T):T()}Oo(f)}}function c(f,p,m,g){var v;const M=(v=f.__r3f)==null?void 0:v.parent;if(!M)return;const y=t(p,m,f.__r3f.root);if(f.children){for(const x of f.children)x.__r3f&&n(y,x);f.children=f.children.filter(x=>!x.__r3f)}f.__r3f.objects.forEach(x=>n(y,x)),f.__r3f.objects=[],f.__r3f.autoRemovedBeforeAppend||o(M,f),y.parent&&(y.__r3f.autoRemovedBeforeAppend=!0),n(M,y),y.raycast&&y.__r3f.eventCount&&bu(y).getState().internal.interaction.push(y),[g,g.alternate].forEach(x=>{x!==null&&(x.stateNode=y,x.ref&&(typeof x.ref=="function"?x.ref(y):x.ref.current=y))})}const u=()=>{};return{reconciler:gR({createInstance:t,removeChild:o,appendChild:n,appendInitialChild:n,insertBefore:i,supportsMutation:!0,isPrimaryRenderer:!1,supportsPersistence:!1,supportsHydration:!1,noTimeout:-1,appendChildToContainer:(f,p)=>{if(!p)return;const m=f.getState().scene;m.__r3f&&(m.__r3f.root=f,n(m,p))},removeChildFromContainer:(f,p)=>{p&&o(f.getState().scene,p)},insertInContainerBefore:(f,p,m)=>{if(!p||!m)return;const g=f.getState().scene;g.__r3f&&i(g,p,m)},getRootHostContext:()=>null,getChildHostContext:f=>f,finalizeInitialChildren(f){var p;return!!((p=f==null?void 0:f.__r3f)!=null?p:{}).handlers},prepareUpdate(f,p,m,g){var v;if(((v=f==null?void 0:f.__r3f)!=null?v:{}).primitive&&g.object&&g.object!==f)return[!0];{const{args:y=[],children:x,...w}=g,{args:b=[],children:T,...P}=m;if(!Array.isArray(y))throw new Error("R3F: the args prop must be an array!");if(y.some((E,C)=>E!==b[C]))return[!0];const R=wy(f,w,P,!0);return R.changes.length?[!1,R]:null}},commitUpdate(f,[p,m],g,v,M,y){p?c(f,g,M,y):Jd(f,m)},commitMount(f,p,m,g){var v;const M=(v=f.__r3f)!=null?v:{};f.raycast&&M.handlers&&M.eventCount&&bu(f).getState().internal.interaction.push(f)},getPublicInstance:f=>f,prepareForCommit:()=>null,preparePortalMount:f=>Uo(f.getState().scene),resetAfterCommit:()=>{},shouldSetTextContent:()=>!1,clearContainer:()=>!1,hideInstance(f){var p;const{attach:m,parent:g}=(p=f.__r3f)!=null?p:{};m&&g&&q_(g,f,m),f.isObject3D&&(f.visible=!1),Oo(f)},unhideInstance(f,p){var m;const{attach:g,parent:v}=(m=f.__r3f)!=null?m:{};g&&v&&jd(v,f,g),(f.isObject3D&&p.visible==null||p.visible)&&(f.visible=!0),Oo(f)},createTextInstance:u,hideTextInstance:u,unhideTextInstance:u,getCurrentEventPriority:()=>e?e():Ho.DefaultEventPriority,beforeActiveInstanceBlur:()=>{},afterActiveInstanceBlur:()=>{},detachDeletedInstance:()=>{},now:typeof performance<"u"&&jt.fun(performance.now)?performance.now:jt.fun(Date.now)?Date.now:()=>0,scheduleTimeout:jt.fun(setTimeout)?setTimeout:void 0,cancelTimeout:jt.fun(clearTimeout)?clearTimeout:void 0}),applyProps:Jd}}var G_,W_;const Zd=r=>"colorSpace"in r||"outputColorSpace"in r,_y=()=>{var r;return(r=xm.ColorManagement)!=null?r:null},vy=r=>r&&r.isOrthographicCamera,xR=r=>r&&r.hasOwnProperty("current"),Al=typeof window<"u"&&((G_=window.document)!=null&&G_.createElement||((W_=window.navigator)==null?void 0:W_.product)==="ReactNative")?De.useLayoutEffect:De.useEffect;function xy(r){const e=De.useRef(r);return Al(()=>void(e.current=r),[r]),e}function yR({set:r}){return Al(()=>(r(new Promise(()=>null)),()=>r(!1)),[r]),null}class yy extends De.Component{constructor(...e){super(...e),this.state={error:!1}}componentDidCatch(e){this.props.set(e)}render(){return this.state.error?null:this.props.children}}yy.getDerivedStateFromError=()=>({error:!0});const Sy="__default",X_=new Map,SR=r=>r&&!!r.memoized&&!!r.changes;function My(r){var e;const t=typeof window<"u"?(e=window.devicePixelRatio)!=null?e:2:1;return Array.isArray(r)?Math.min(Math.max(r[0],t),r[1]):r}const Oa=r=>{var e;return(e=r.__r3f)==null?void 0:e.root.getState()};function bu(r){let e=r.__r3f.root;for(;e.getState().previousRoot;)e=e.getState().previousRoot;return e}const jt={obj:r=>r===Object(r)&&!jt.arr(r)&&typeof r!="function",fun:r=>typeof r=="function",str:r=>typeof r=="string",num:r=>typeof r=="number",boo:r=>typeof r=="boolean",und:r=>r===void 0,arr:r=>Array.isArray(r),equ(r,e,{arrays:t="shallow",objects:n="reference",strict:i=!0}={}){if(typeof r!=typeof e||!!r!=!!e)return!1;if(jt.str(r)||jt.num(r)||jt.boo(r))return r===e;const s=jt.obj(r);if(s&&n==="reference")return r===e;const o=jt.arr(r);if(o&&t==="reference")return r===e;if((o||s)&&r===e)return!0;let c;for(c in r)if(!(c in e))return!1;if(s&&t==="shallow"&&n==="shallow"){for(c in i?e:r)if(!jt.equ(r[c],e[c],{strict:i,objects:"reference"}))return!1}else for(c in i?e:r)if(r[c]!==e[c])return!1;if(jt.und(c)){if(o&&r.length===0&&e.length===0||s&&Object.keys(r).length===0&&Object.keys(e).length===0)return!0;if(r!==e)return!1}return!0}};function MR(r){r.dispose&&r.type!=="Scene"&&r.dispose();for(const e in r)e.dispose==null||e.dispose(),delete r[e]}function Uo(r,e){const t=r;return t.__r3f={type:"",root:null,previousAttach:null,memoizedProps:{},eventCount:0,handlers:{},objects:[],parent:null,...e},r}function Mp(r,e){let t=r;if(e.includes("-")){const n=e.split("-"),i=n.pop();return t=n.reduce((s,o)=>s[o],r),{target:t,key:i}}else return{target:t,key:e}}const Y_=/-\d+$/;function jd(r,e,t){if(jt.str(t)){if(Y_.test(t)){const s=t.replace(Y_,""),{target:o,key:c}=Mp(r,s);Array.isArray(o[c])||(o[c]=[])}const{target:n,key:i}=Mp(r,t);e.__r3f.previousAttach=n[i],n[i]=e}else e.__r3f.previousAttach=t(r,e)}function q_(r,e,t){var n,i;if(jt.str(t)){const{target:s,key:o}=Mp(r,t),c=e.__r3f.previousAttach;c===void 0?delete s[o]:s[o]=c}else(n=e.__r3f)==null||n.previousAttach==null||n.previousAttach(r,e);(i=e.__r3f)==null||delete i.previousAttach}function wy(r,{children:e,key:t,ref:n,...i},{children:s,key:o,ref:c,...u}={},h=!1){const f=r.__r3f,p=Object.entries(i),m=[];if(h){const v=Object.keys(u);for(let M=0;M<v.length;M++)i.hasOwnProperty(v[M])||p.unshift([v[M],Sy+"remove"])}p.forEach(([v,M])=>{var y;if((y=r.__r3f)!=null&&y.primitive&&v==="object"||jt.equ(M,u[v]))return;if(/^on(Pointer|Click|DoubleClick|ContextMenu|Wheel)/.test(v))return m.push([v,M,!0,[]]);let x=[];v.includes("-")&&(x=v.split("-")),m.push([v,M,!1,x]);for(const w in i){const b=i[w];w.startsWith(`${v}-`)&&m.push([w,b,!1,w.split("-")])}});const g={...i};return f!=null&&f.memoizedProps&&f!=null&&f.memoizedProps.args&&(g.args=f.memoizedProps.args),f!=null&&f.memoizedProps&&f!=null&&f.memoizedProps.attach&&(g.attach=f.memoizedProps.attach),{memoized:g,changes:m}}function Jd(r,e){var t;const n=r.__r3f,i=n==null?void 0:n.root,s=i==null||i.getState==null?void 0:i.getState(),{memoized:o,changes:c}=SR(e)?e:wy(r,e),u=n==null?void 0:n.eventCount;r.__r3f&&(r.__r3f.memoizedProps=o);for(let m=0;m<c.length;m++){let[g,v,M,y]=c[m];if(Zd(r)){const T="srgb",P="srgb-linear";g==="encoding"?(g="colorSpace",v=v===3001?T:P):g==="outputEncoding"&&(g="outputColorSpace",v=v===3001?T:P)}let x=r,w=x[g];if(y.length&&(w=y.reduce((b,T)=>b[T],r),!(w&&w.set))){const[b,...T]=y.reverse();x=T.reverse().reduce((P,R)=>P[R],r),g=b}if(v===Sy+"remove")if(x.constructor){let b=X_.get(x.constructor);b||(b=new x.constructor,X_.set(x.constructor,b)),v=b[g]}else v=0;if(M&&n)v?n.handlers[g]=v:delete n.handlers[g],n.eventCount=Object.keys(n.handlers).length;else if(w&&w.set&&(w.copy||w instanceof Us)){if(Array.isArray(v))w.fromArray?w.fromArray(v):w.set(...v);else if(w.copy&&v&&v.constructor&&w.constructor===v.constructor)w.copy(v);else if(v!==void 0){var h;const b=(h=w)==null?void 0:h.isColor;!b&&w.setScalar?w.setScalar(v):w instanceof Us&&v instanceof Us?w.mask=v.mask:w.set(v),!_y()&&s&&!s.linear&&b&&w.convertSRGBToLinear()}}else{var f;if(x[g]=v,(f=x[g])!=null&&f.isTexture&&x[g].format===jn&&x[g].type===qn&&s){const b=x[g];Zd(b)&&Zd(s.gl)?b.colorSpace=s.gl.outputColorSpace:b.encoding=s.gl.outputEncoding}}Oo(r)}if(n&&n.parent&&r.raycast&&u!==n.eventCount){const m=bu(r).getState().internal,g=m.interaction.indexOf(r);g>-1&&m.interaction.splice(g,1),n.eventCount&&m.interaction.push(r)}return!(c.length===1&&c[0][0]==="onUpdate")&&c.length&&(t=r.__r3f)!=null&&t.parent&&wp(r),r}function Oo(r){var e,t;const n=(e=r.__r3f)==null||(t=e.root)==null||t.getState==null?void 0:t.getState();n&&n.internal.frames===0&&n.invalidate()}function wp(r){r.onUpdate==null||r.onUpdate(r)}function wR(r,e){r.manual||(vy(r)?(r.left=e.width/-2,r.right=e.width/2,r.top=e.height/2,r.bottom=e.height/-2):r.aspect=e.width/e.height,r.updateProjectionMatrix(),r.updateMatrixWorld())}function pu(r){return(r.eventObject||r.object).uuid+"/"+r.index+r.instanceId}function ER(){var r;const e=typeof self<"u"&&self||typeof window<"u"&&window;if(!e)return Ho.DefaultEventPriority;switch((r=e.event)==null?void 0:r.type){case"click":case"contextmenu":case"dblclick":case"pointercancel":case"pointerdown":case"pointerup":return Ho.DiscreteEventPriority;case"pointermove":case"pointerout":case"pointerover":case"pointerenter":case"pointerleave":case"wheel":return Ho.ContinuousEventPriority;default:return Ho.DefaultEventPriority}}function Ey(r,e,t,n){const i=t.get(e);i&&(t.delete(e),t.size===0&&(r.delete(n),i.target.releasePointerCapture(n)))}function bR(r,e){const{internal:t}=r.getState();t.interaction=t.interaction.filter(n=>n!==e),t.initialHits=t.initialHits.filter(n=>n!==e),t.hovered.forEach((n,i)=>{(n.eventObject===e||n.object===e)&&t.hovered.delete(i)}),t.capturedMap.forEach((n,i)=>{Ey(t.capturedMap,e,n,i)})}function TR(r){function e(u){const{internal:h}=r.getState(),f=u.offsetX-h.initialClick[0],p=u.offsetY-h.initialClick[1];return Math.round(Math.sqrt(f*f+p*p))}function t(u){return u.filter(h=>["Move","Over","Enter","Out","Leave"].some(f=>{var p;return(p=h.__r3f)==null?void 0:p.handlers["onPointer"+f]}))}function n(u,h){const f=r.getState(),p=new Set,m=[],g=h?h(f.internal.interaction):f.internal.interaction;for(let x=0;x<g.length;x++){const w=Oa(g[x]);w&&(w.raycaster.camera=void 0)}f.previousRoot||f.events.compute==null||f.events.compute(u,f);function v(x){const w=Oa(x);if(!w||!w.events.enabled||w.raycaster.camera===null)return[];if(w.raycaster.camera===void 0){var b;w.events.compute==null||w.events.compute(u,w,(b=w.previousRoot)==null?void 0:b.getState()),w.raycaster.camera===void 0&&(w.raycaster.camera=null)}return w.raycaster.camera?w.raycaster.intersectObject(x,!0):[]}let M=g.flatMap(v).sort((x,w)=>{const b=Oa(x.object),T=Oa(w.object);return!b||!T?x.distance-w.distance:T.events.priority-b.events.priority||x.distance-w.distance}).filter(x=>{const w=pu(x);return p.has(w)?!1:(p.add(w),!0)});f.events.filter&&(M=f.events.filter(M,f));for(const x of M){let w=x.object;for(;w;){var y;(y=w.__r3f)!=null&&y.eventCount&&m.push({...x,eventObject:w}),w=w.parent}}if("pointerId"in u&&f.internal.capturedMap.has(u.pointerId))for(let x of f.internal.capturedMap.get(u.pointerId).values())p.has(pu(x.intersection))||m.push(x.intersection);return m}function i(u,h,f,p){const m=r.getState();if(u.length){const g={stopped:!1};for(const v of u){const M=Oa(v.object)||m,{raycaster:y,pointer:x,camera:w,internal:b}=M,T=new O(x.x,x.y,0).unproject(w),P=N=>{var D,Y;return(D=(Y=b.capturedMap.get(N))==null?void 0:Y.has(v.eventObject))!=null?D:!1},R=N=>{const D={intersection:v,target:h.target};b.capturedMap.has(N)?b.capturedMap.get(N).set(v.eventObject,D):b.capturedMap.set(N,new Map([[v.eventObject,D]])),h.target.setPointerCapture(N)},E=N=>{const D=b.capturedMap.get(N);D&&Ey(b.capturedMap,v.eventObject,D,N)};let C={};for(let N in h){let D=h[N];typeof D!="function"&&(C[N]=D)}let B={...v,...C,pointer:x,intersections:u,stopped:g.stopped,delta:f,unprojectedPoint:T,ray:y.ray,camera:w,stopPropagation(){const N="pointerId"in h&&b.capturedMap.get(h.pointerId);if((!N||N.has(v.eventObject))&&(B.stopped=g.stopped=!0,b.hovered.size&&Array.from(b.hovered.values()).find(D=>D.eventObject===v.eventObject))){const D=u.slice(0,u.indexOf(v));s([...D,v])}},target:{hasPointerCapture:P,setPointerCapture:R,releasePointerCapture:E},currentTarget:{hasPointerCapture:P,setPointerCapture:R,releasePointerCapture:E},nativeEvent:h};if(p(B),g.stopped===!0)break}}return u}function s(u){const{internal:h}=r.getState();for(const f of h.hovered.values())if(!u.length||!u.find(p=>p.object===f.object&&p.index===f.index&&p.instanceId===f.instanceId)){const m=f.eventObject.__r3f,g=m==null?void 0:m.handlers;if(h.hovered.delete(pu(f)),m!=null&&m.eventCount){const v={...f,intersections:u};g.onPointerOut==null||g.onPointerOut(v),g.onPointerLeave==null||g.onPointerLeave(v)}}}function o(u,h){for(let f=0;f<h.length;f++){const p=h[f].__r3f;p==null||p.handlers.onPointerMissed==null||p.handlers.onPointerMissed(u)}}function c(u){switch(u){case"onPointerLeave":case"onPointerCancel":return()=>s([]);case"onLostPointerCapture":return h=>{const{internal:f}=r.getState();"pointerId"in h&&f.capturedMap.has(h.pointerId)&&requestAnimationFrame(()=>{f.capturedMap.has(h.pointerId)&&(f.capturedMap.delete(h.pointerId),s([]))})}}return function(f){const{onPointerMissed:p,internal:m}=r.getState();m.lastEvent.current=f;const g=u==="onPointerMove",v=u==="onClick"||u==="onContextMenu"||u==="onDoubleClick",y=n(f,g?t:void 0),x=v?e(f):0;u==="onPointerDown"&&(m.initialClick=[f.offsetX,f.offsetY],m.initialHits=y.map(b=>b.eventObject)),v&&!y.length&&x<=2&&(o(f,m.interaction),p&&p(f)),g&&s(y);function w(b){const T=b.eventObject,P=T.__r3f,R=P==null?void 0:P.handlers;if(P!=null&&P.eventCount)if(g){if(R.onPointerOver||R.onPointerEnter||R.onPointerOut||R.onPointerLeave){const E=pu(b),C=m.hovered.get(E);C?C.stopped&&b.stopPropagation():(m.hovered.set(E,b),R.onPointerOver==null||R.onPointerOver(b),R.onPointerEnter==null||R.onPointerEnter(b))}R.onPointerMove==null||R.onPointerMove(b)}else{const E=R[u];E?(!v||m.initialHits.includes(T))&&(o(f,m.interaction.filter(C=>!m.initialHits.includes(C))),E(b)):v&&m.initialHits.includes(T)&&o(f,m.interaction.filter(C=>!m.initialHits.includes(C)))}}i(y,f,x,w)}}return{handlePointer:c}}const by=r=>!!(r!=null&&r.render),Ty=De.createContext(null),AR=(r,e)=>{const t=hR((c,u)=>{const h=new O,f=new O,p=new O;function m(x=u().camera,w=f,b=u().size){const{width:T,height:P,top:R,left:E}=b,C=T/P;w.isVector3?p.copy(w):p.set(...w);const B=x.getWorldPosition(h).distanceTo(p);if(vy(x))return{width:T/x.zoom,height:P/x.zoom,top:R,left:E,factor:1,distance:B,aspect:C};{const N=x.fov*Math.PI/180,D=2*Math.tan(N/2)*B,Y=D*(T/P);return{width:Y,height:D,top:R,left:E,factor:T/Y,distance:B,aspect:C}}}let g;const v=x=>c(w=>({performance:{...w.performance,current:x}})),M=new me;return{set:c,get:u,gl:null,camera:null,raycaster:null,events:{priority:1,enabled:!0,connected:!1},xr:null,scene:null,invalidate:(x=1)=>r(u(),x),advance:(x,w)=>e(x,w,u()),legacy:!1,linear:!1,flat:!1,controls:null,clock:new Jx,pointer:M,mouse:M,frameloop:"always",onPointerMissed:void 0,performance:{current:1,min:.5,max:1,debounce:200,regress:()=>{const x=u();g&&clearTimeout(g),x.performance.current!==x.performance.min&&v(x.performance.min),g=setTimeout(()=>v(u().performance.max),x.performance.debounce)}},size:{width:0,height:0,top:0,left:0,updateStyle:!1},viewport:{initialDpr:0,dpr:0,width:0,height:0,top:0,left:0,aspect:0,distance:0,factor:0,getCurrentViewport:m},setEvents:x=>c(w=>({...w,events:{...w.events,...x}})),setSize:(x,w,b,T,P)=>{const R=u().camera,E={width:x,height:w,top:T||0,left:P||0,updateStyle:b};c(C=>({size:E,viewport:{...C.viewport,...m(R,f,E)}}))},setDpr:x=>c(w=>{const b=My(x);return{viewport:{...w.viewport,dpr:b,initialDpr:w.viewport.initialDpr||b}}}),setFrameloop:(x="always")=>{const w=u().clock;w.stop(),w.elapsedTime=0,x!=="never"&&(w.start(),w.elapsedTime=0),c(()=>({frameloop:x}))},previousRoot:void 0,internal:{active:!1,priority:0,frames:0,lastEvent:De.createRef(),interaction:[],hovered:new Map,subscribers:[],initialClick:[0,0],initialHits:[],capturedMap:new Map,subscribe:(x,w,b)=>{const T=u().internal;return T.priority=T.priority+(w>0?1:0),T.subscribers.push({ref:x,priority:w,store:b}),T.subscribers=T.subscribers.sort((P,R)=>P.priority-R.priority),()=>{const P=u().internal;P!=null&&P.subscribers&&(P.priority=P.priority-(w>0?1:0),P.subscribers=P.subscribers.filter(R=>R.ref!==x))}}}}}),n=t.getState();let i=n.size,s=n.viewport.dpr,o=n.camera;return t.subscribe(()=>{const{camera:c,size:u,viewport:h,gl:f,set:p}=t.getState();if(u.width!==i.width||u.height!==i.height||h.dpr!==s){var m;i=u,s=h.dpr,wR(c,u),f.setPixelRatio(h.dpr);const g=(m=u.updateStyle)!=null?m:typeof HTMLCanvasElement<"u"&&f.domElement instanceof HTMLCanvasElement;f.setSize(u.width,u.height,g)}c!==o&&(o=c,p(g=>({viewport:{...g.viewport,...g.viewport.getCurrentViewport(c)}})))}),t.subscribe(c=>r(c)),t};let mu,CR=new Set,RR=new Set,PR=new Set;function Kd(r,e){if(r.size)for(const{callback:t}of r.values())t(e)}function Fa(r,e){switch(r){case"before":return Kd(CR,e);case"after":return Kd(RR,e);case"tail":return Kd(PR,e)}}let Qd,$d;function ep(r,e,t){let n=e.clock.getDelta();for(e.frameloop==="never"&&typeof r=="number"&&(n=r-e.clock.elapsedTime,e.clock.oldTime=e.clock.elapsedTime,e.clock.elapsedTime=r),Qd=e.internal.subscribers,mu=0;mu<Qd.length;mu++)$d=Qd[mu],$d.ref.current($d.store.getState(),n,t);return!e.internal.priority&&e.gl.render&&e.gl.render(e.scene,e.camera),e.internal.frames=Math.max(0,e.internal.frames-1),e.frameloop==="always"?1:e.internal.frames}function IR(r){let e=!1,t=!1,n,i,s;function o(h){i=requestAnimationFrame(o),e=!0,n=0,Fa("before",h),t=!0;for(const p of r.values()){var f;s=p.store.getState(),s.internal.active&&(s.frameloop==="always"||s.internal.frames>0)&&!((f=s.gl.xr)!=null&&f.isPresenting)&&(n+=ep(h,s))}if(t=!1,Fa("after",h),n===0)return Fa("tail",h),e=!1,cancelAnimationFrame(i)}function c(h,f=1){var p;if(!h)return r.forEach(m=>c(m.store.getState(),f));(p=h.gl.xr)!=null&&p.isPresenting||!h.internal.active||h.frameloop==="never"||(f>1?h.internal.frames=Math.min(60,h.internal.frames+f):t?h.internal.frames=2:h.internal.frames=1,e||(e=!0,requestAnimationFrame(o)))}function u(h,f=!0,p,m){if(f&&Fa("before",h),p)ep(h,p,m);else for(const g of r.values())ep(h,g.store.getState());f&&Fa("after",h)}return{loop:o,invalidate:c,advance:u}}function Ay(){const r=De.useContext(Ty);if(!r)throw new Error("R3F: Hooks can only be used within the Canvas component!");return r}function Ar(r=t=>t,e){return Ay()(r,e)}function Cy(r,e=0){const t=Ay(),n=t.getState().internal.subscribe,i=xy(r);return Al(()=>n(i,e,t),[e,n,t]),null}const Ko=new Map,{invalidate:Z_,advance:j_}=IR(Ko),{reconciler:gh,applyProps:No}=vR(Ko,ER),Do={objects:"shallow",strict:!1},LR=(r,e)=>{const t=typeof r=="function"?r(e):r;return by(t)?t:new fy({powerPreference:"high-performance",canvas:e,antialias:!0,alpha:!0,...r})};function NR(r,e){const t=typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement;if(e){const{width:n,height:i,top:s,left:o,updateStyle:c=t}=e;return{width:n,height:i,top:s,left:o,updateStyle:c}}else if(typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement&&r.parentElement){const{width:n,height:i,top:s,left:o}=r.parentElement.getBoundingClientRect();return{width:n,height:i,top:s,left:o,updateStyle:t}}else if(typeof OffscreenCanvas<"u"&&r instanceof OffscreenCanvas)return{width:r.width,height:r.height,top:0,left:0,updateStyle:t};return{width:0,height:0,top:0,left:0}}function DR(r){const e=Ko.get(r),t=e==null?void 0:e.fiber,n=e==null?void 0:e.store;e&&console.warn("R3F.createRoot should only be called once!");const i=typeof reportError=="function"?reportError:console.error,s=n||AR(Z_,j_),o=t||gh.createContainer(s,Ho.ConcurrentRoot,null,!1,null,"",i,null);e||Ko.set(r,{fiber:o,store:s});let c,u=!1,h;return{configure(f={}){let{gl:p,size:m,scene:g,events:v,onCreated:M,shadows:y=!1,linear:x=!1,flat:w=!1,legacy:b=!1,orthographic:T=!1,frameloop:P="always",dpr:R=[1,2],performance:E,raycaster:C,camera:B,onPointerMissed:N}=f,D=s.getState(),Y=D.gl;D.gl||D.set({gl:Y=LR(p,r)});let K=D.raycaster;K||D.set({raycaster:K=new jx});const{params:H,...ne}=C||{};if(jt.equ(ne,K,Do)||No(K,{...ne}),jt.equ(H,K.params,Do)||No(K,{params:{...K.params,...H}}),!D.camera||D.camera===h&&!jt.equ(h,B,Do)){h=B;const W=B instanceof bl,J=W?B:T?new Qr(0,0,0,0,.1,1e3):new _n(75,0,.1,1e3);W||(J.position.z=5,B&&(No(J,B),("aspect"in B||"left"in B||"right"in B||"bottom"in B||"top"in B)&&(J.manual=!0,J.updateProjectionMatrix())),!D.camera&&!(B!=null&&B.rotation)&&J.lookAt(0,0,0)),D.set({camera:J}),K.camera=J}if(!D.scene){let W;g!=null&&g.isScene?W=g:(W=new Xp,g&&No(W,g)),D.set({scene:Uo(W)})}if(!D.xr){var oe;const W=(Te,ae)=>{const Me=s.getState();Me.frameloop!=="never"&&j_(Te,!0,Me,ae)},J=()=>{const Te=s.getState();Te.gl.xr.enabled=Te.gl.xr.isPresenting,Te.gl.xr.setAnimationLoop(Te.gl.xr.isPresenting?W:null),Te.gl.xr.isPresenting||Z_(Te)},_e={connect(){const Te=s.getState().gl;Te.xr.addEventListener("sessionstart",J),Te.xr.addEventListener("sessionend",J)},disconnect(){const Te=s.getState().gl;Te.xr.removeEventListener("sessionstart",J),Te.xr.removeEventListener("sessionend",J)}};typeof((oe=Y.xr)==null?void 0:oe.addEventListener)=="function"&&_e.connect(),D.set({xr:_e})}if(Y.shadowMap){const W=Y.shadowMap.enabled,J=Y.shadowMap.type;if(Y.shadowMap.enabled=!!y,jt.boo(y))Y.shadowMap.type=Ha;else if(jt.str(y)){var te;const _e={basic:pv,percentage:Vo,soft:Ha,variance:Rs};Y.shadowMap.type=(te=_e[y])!=null?te:Ha}else jt.obj(y)&&Object.assign(Y.shadowMap,y);(W!==Y.shadowMap.enabled||J!==Y.shadowMap.type)&&(Y.shadowMap.needsUpdate=!0)}const k=_y();k&&("enabled"in k?k.enabled=!b:"legacyMode"in k&&(k.legacyMode=b)),u||No(Y,{outputEncoding:x?3e3:3001,toneMapping:w?Gi:vh}),D.legacy!==b&&D.set(()=>({legacy:b})),D.linear!==x&&D.set(()=>({linear:x})),D.flat!==w&&D.set(()=>({flat:w})),p&&!jt.fun(p)&&!by(p)&&!jt.equ(p,Y,Do)&&No(Y,p),v&&!D.events.handlers&&D.set({events:v(s)});const G=NR(r,m);return jt.equ(G,D.size,Do)||D.setSize(G.width,G.height,G.updateStyle,G.top,G.left),R&&D.viewport.dpr!==My(R)&&D.setDpr(R),D.frameloop!==P&&D.setFrameloop(P),D.onPointerMissed||D.set({onPointerMissed:N}),E&&!jt.equ(E,D.performance,Do)&&D.set(W=>({performance:{...W.performance,...E}})),c=M,u=!0,this},render(f){return u||this.configure(),gh.updateContainer(Mt.jsx(UR,{store:s,children:f,onCreated:c,rootElement:r}),o,null,()=>{}),s},unmount(){Ry(r)}}}function UR({store:r,children:e,onCreated:t,rootElement:n}){return Al(()=>{const i=r.getState();i.set(s=>({internal:{...s.internal,active:!0}})),t&&t(i),r.getState().events.connected||i.events.connect==null||i.events.connect(n)},[]),Mt.jsx(Ty.Provider,{value:r,children:e})}function Ry(r,e){const t=Ko.get(r),n=t==null?void 0:t.fiber;if(n){const i=t==null?void 0:t.store.getState();i&&(i.internal.active=!1),gh.updateContainer(null,n,null,()=>{i&&setTimeout(()=>{try{var s,o,c,u;i.events.disconnect==null||i.events.disconnect(),(s=i.gl)==null||(o=s.renderLists)==null||o.dispose==null||o.dispose(),(c=i.gl)==null||c.forceContextLoss==null||c.forceContextLoss(),(u=i.gl)!=null&&u.xr&&i.xr.disconnect(),MR(i),Ko.delete(r)}catch{}},500)})}}gh.injectIntoDevTools({bundleType:0,rendererPackageName:"@react-three/fiber",version:De.version});const tp={onClick:["click",!1],onContextMenu:["contextmenu",!1],onDoubleClick:["dblclick",!1],onWheel:["wheel",!0],onPointerDown:["pointerdown",!0],onPointerUp:["pointerup",!0],onPointerLeave:["pointerleave",!0],onPointerMove:["pointermove",!0],onPointerCancel:["pointercancel",!0],onLostPointerCapture:["lostpointercapture",!0]};function OR(r){const{handlePointer:e}=TR(r);return{priority:1,enabled:!0,compute(t,n,i){n.pointer.set(t.offsetX/n.size.width*2-1,-(t.offsetY/n.size.height)*2+1),n.raycaster.setFromCamera(n.pointer,n.camera)},connected:void 0,handlers:Object.keys(tp).reduce((t,n)=>({...t,[n]:e(n)}),{}),update:()=>{var t;const{events:n,internal:i}=r.getState();(t=i.lastEvent)!=null&&t.current&&n.handlers&&n.handlers.onPointerMove(i.lastEvent.current)},connect:t=>{var n;const{set:i,events:s}=r.getState();s.disconnect==null||s.disconnect(),i(o=>({events:{...o.events,connected:t}})),Object.entries((n=s.handlers)!=null?n:[]).forEach(([o,c])=>{const[u,h]=tp[o];t.addEventListener(u,c,{passive:h})})},disconnect:()=>{const{set:t,events:n}=r.getState();if(n.connected){var i;Object.entries((i=n.handlers)!=null?i:[]).forEach(([s,o])=>{if(n&&n.connected instanceof HTMLElement){const[c]=tp[s];n.connected.removeEventListener(c,o)}}),t(s=>({events:{...s.events,connected:void 0}}))}}}}function J_(r,e){let t;return(...n)=>{window.clearTimeout(t),t=window.setTimeout(()=>r(...n),e)}}function FR({debounce:r,scroll:e,polyfill:t,offsetSize:n}={debounce:0,scroll:!1,offsetSize:!1}){const i=t||(typeof window>"u"?class{}:window.ResizeObserver);if(!i)throw new Error("This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills");const[s,o]=De.useState({left:0,top:0,width:0,height:0,bottom:0,right:0,x:0,y:0}),c=De.useRef({element:null,scrollContainers:null,resizeObserver:null,lastBounds:s,orientationHandler:null}),u=r?typeof r=="number"?r:r.scroll:null,h=r?typeof r=="number"?r:r.resize:null,f=De.useRef(!1);De.useEffect(()=>(f.current=!0,()=>void(f.current=!1)));const[p,m,g]=De.useMemo(()=>{const x=()=>{if(!c.current.element)return;const{left:w,top:b,width:T,height:P,bottom:R,right:E,x:C,y:B}=c.current.element.getBoundingClientRect(),N={left:w,top:b,width:T,height:P,bottom:R,right:E,x:C,y:B};c.current.element instanceof HTMLElement&&n&&(N.height=c.current.element.offsetHeight,N.width=c.current.element.offsetWidth),Object.freeze(N),f.current&&!HR(c.current.lastBounds,N)&&o(c.current.lastBounds=N)};return[x,h?J_(x,h):x,u?J_(x,u):x]},[o,n,u,h]);function v(){c.current.scrollContainers&&(c.current.scrollContainers.forEach(x=>x.removeEventListener("scroll",g,!0)),c.current.scrollContainers=null),c.current.resizeObserver&&(c.current.resizeObserver.disconnect(),c.current.resizeObserver=null),c.current.orientationHandler&&("orientation"in screen&&"removeEventListener"in screen.orientation?screen.orientation.removeEventListener("change",c.current.orientationHandler):"onorientationchange"in window&&window.removeEventListener("orientationchange",c.current.orientationHandler))}function M(){c.current.element&&(c.current.resizeObserver=new i(g),c.current.resizeObserver.observe(c.current.element),e&&c.current.scrollContainers&&c.current.scrollContainers.forEach(x=>x.addEventListener("scroll",g,{capture:!0,passive:!0})),c.current.orientationHandler=()=>{g()},"orientation"in screen&&"addEventListener"in screen.orientation?screen.orientation.addEventListener("change",c.current.orientationHandler):"onorientationchange"in window&&window.addEventListener("orientationchange",c.current.orientationHandler))}const y=x=>{!x||x===c.current.element||(v(),c.current.element=x,c.current.scrollContainers=Py(x),M())};return zR(g,!!e),BR(m),De.useEffect(()=>{v(),M()},[e,g,m]),De.useEffect(()=>v,[]),[y,s,p]}function BR(r){De.useEffect(()=>{const e=r;return window.addEventListener("resize",e),()=>void window.removeEventListener("resize",e)},[r])}function zR(r,e){De.useEffect(()=>{if(e){const t=r;return window.addEventListener("scroll",t,{capture:!0,passive:!0}),()=>void window.removeEventListener("scroll",t,!0)}},[r,e])}function Py(r){const e=[];if(!r||r===document.body)return e;const{overflow:t,overflowX:n,overflowY:i}=window.getComputedStyle(r);return[t,n,i].some(s=>s==="auto"||s==="scroll")&&e.push(r),[...e,...Py(r.parentElement)]}const kR=["x","y","top","bottom","left","right","width","height"],HR=(r,e)=>kR.every(t=>r[t]===e[t]);var VR=Object.defineProperty,GR=Object.defineProperties,WR=Object.getOwnPropertyDescriptors,K_=Object.getOwnPropertySymbols,XR=Object.prototype.hasOwnProperty,YR=Object.prototype.propertyIsEnumerable,Q_=(r,e,t)=>e in r?VR(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,$_=(r,e)=>{for(var t in e||(e={}))XR.call(e,t)&&Q_(r,t,e[t]);if(K_)for(var t of K_(e))YR.call(e,t)&&Q_(r,t,e[t]);return r},qR=(r,e)=>GR(r,WR(e)),ev,tv;typeof window<"u"&&((ev=window.document)!=null&&ev.createElement||((tv=window.navigator)==null?void 0:tv.product)==="ReactNative")?De.useLayoutEffect:De.useEffect;function Iy(r,e,t){if(!r)return;if(t(r)===!0)return r;let n=r.child;for(;n;){const i=Iy(n,e,t);if(i)return i;n=n.sibling}}function Ly(r){try{return Object.defineProperties(r,{_currentRenderer:{get(){return null},set(){}},_currentRenderer2:{get(){return null},set(){}}})}catch{return r}}const nv=console.error;console.error=function(){const r=[...arguments].join("");if(r!=null&&r.startsWith("Warning:")&&r.includes("useContext")){console.error=nv;return}return nv.apply(this,arguments)};const ym=Ly(De.createContext(null));class Ny extends De.Component{render(){return De.createElement(ym.Provider,{value:this._reactInternals},this.props.children)}}function ZR(){const r=De.useContext(ym);if(r===null)throw new Error("its-fine: useFiber must be called within a <FiberProvider />!");const e=De.useId();return De.useMemo(()=>{for(const n of[r,r==null?void 0:r.alternate]){if(!n)continue;const i=Iy(n,!1,s=>{let o=s.memoizedState;for(;o;){if(o.memoizedState===e)return!0;o=o.next}});if(i)return i}},[r,e])}function jR(){const r=ZR(),[e]=De.useState(()=>new Map);e.clear();let t=r;for(;t;){if(t.type&&typeof t.type=="object"){const i=t.type._context===void 0&&t.type.Provider===t.type?t.type:t.type._context;i&&i!==ym&&!e.has(i)&&e.set(i,De.useContext(Ly(i)))}t=t.return}return e}function JR(){const r=jR();return De.useMemo(()=>Array.from(r.keys()).reduce((e,t)=>n=>De.createElement(e,null,De.createElement(t.Provider,qR($_({},n),{value:r.get(t)}))),e=>De.createElement(Ny,$_({},e))),[r])}const KR=De.forwardRef(function({children:e,fallback:t,resize:n,style:i,gl:s,events:o=OR,eventSource:c,eventPrefix:u,shadows:h,linear:f,flat:p,legacy:m,orthographic:g,frameloop:v,dpr:M,performance:y,raycaster:x,camera:w,scene:b,onPointerMissed:T,onCreated:P,...R},E){De.useMemo(()=>_R(lR),[]);const C=JR(),[B,N]=FR({scroll:!0,debounce:{scroll:50,resize:0},...n}),D=De.useRef(null),Y=De.useRef(null);De.useImperativeHandle(E,()=>D.current);const K=xy(T),[H,ne]=De.useState(!1),[oe,te]=De.useState(!1);if(H)throw H;if(oe)throw oe;const k=De.useRef(null);Al(()=>{const W=D.current;N.width>0&&N.height>0&&W&&(k.current||(k.current=DR(W)),k.current.configure({gl:s,events:o,shadows:h,linear:f,flat:p,legacy:m,orthographic:g,frameloop:v,dpr:M,performance:y,raycaster:x,camera:w,scene:b,size:N,onPointerMissed:(...J)=>K.current==null?void 0:K.current(...J),onCreated:J=>{J.events.connect==null||J.events.connect(c?xR(c)?c.current:c:Y.current),u&&J.setEvents({compute:(_e,Te)=>{const ae=_e[u+"X"],Me=_e[u+"Y"];Te.pointer.set(ae/Te.size.width*2-1,-(Me/Te.size.height)*2+1),Te.raycaster.setFromCamera(Te.pointer,Te.camera)}}),P==null||P(J)}}),k.current.render(Mt.jsx(C,{children:Mt.jsx(yy,{set:te,children:Mt.jsx(De.Suspense,{fallback:Mt.jsx(yR,{set:ne}),children:e??null})})})))}),De.useEffect(()=>{const W=D.current;if(W)return()=>Ry(W)},[]);const G=c?"none":"auto";return Mt.jsx("div",{ref:Y,style:{position:"relative",width:"100%",height:"100%",overflow:"hidden",pointerEvents:G,...i},...R,children:Mt.jsx("div",{ref:B,style:{width:"100%",height:"100%"},children:Mt.jsx("canvas",{ref:D,style:{display:"block"},children:t})})})}),QR=De.forwardRef(function(e,t){return Mt.jsx(Ny,{children:Mt.jsx(KR,{...e,ref:t})})});function Qo(){return Qo=Object.assign?Object.assign.bind():function(r){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var n in t)({}).hasOwnProperty.call(t,n)&&(r[n]=t[n])}return r},Qo.apply(null,arguments)}const Dy=parseInt(ml.replace(/\D+/g,"")),Uy=Dy>=125?"uv1":"uv2";var $R=Object.defineProperty,eP=(r,e,t)=>e in r?$R(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,tP=(r,e,t)=>(eP(r,e+"",t),t);class nP{constructor(){tP(this,"_listeners")}addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}var iP=Object.defineProperty,rP=(r,e,t)=>e in r?iP(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,ct=(r,e,t)=>(rP(r,typeof e!="symbol"?e+"":e,t),t);const gu=new Gs,iv=new ar,sP=Math.cos(70*(Math.PI/180)),rv=(r,e)=>(r%e+e)%e;let oP=class extends nP{constructor(e,t){super(),ct(this,"object"),ct(this,"domElement"),ct(this,"enabled",!0),ct(this,"target",new O),ct(this,"minDistance",0),ct(this,"maxDistance",1/0),ct(this,"minZoom",0),ct(this,"maxZoom",1/0),ct(this,"minPolarAngle",0),ct(this,"maxPolarAngle",Math.PI),ct(this,"minAzimuthAngle",-1/0),ct(this,"maxAzimuthAngle",1/0),ct(this,"enableDamping",!1),ct(this,"dampingFactor",.05),ct(this,"enableZoom",!0),ct(this,"zoomSpeed",1),ct(this,"enableRotate",!0),ct(this,"rotateSpeed",1),ct(this,"enablePan",!0),ct(this,"panSpeed",1),ct(this,"screenSpacePanning",!0),ct(this,"keyPanSpeed",7),ct(this,"zoomToCursor",!1),ct(this,"autoRotate",!1),ct(this,"autoRotateSpeed",2),ct(this,"reverseOrbit",!1),ct(this,"reverseHorizontalOrbit",!1),ct(this,"reverseVerticalOrbit",!1),ct(this,"keys",{LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"}),ct(this,"mouseButtons",{LEFT:Ts.ROTATE,MIDDLE:Ts.DOLLY,RIGHT:Ts.PAN}),ct(this,"touches",{ONE:As.ROTATE,TWO:As.DOLLY_PAN}),ct(this,"target0"),ct(this,"position0"),ct(this,"zoom0"),ct(this,"_domElementKeyEvents",null),ct(this,"getPolarAngle"),ct(this,"getAzimuthalAngle"),ct(this,"setPolarAngle"),ct(this,"setAzimuthalAngle"),ct(this,"getDistance"),ct(this,"getZoomScale"),ct(this,"listenToKeyEvents"),ct(this,"stopListenToKeyEvents"),ct(this,"saveState"),ct(this,"reset"),ct(this,"update"),ct(this,"connect"),ct(this,"dispose"),ct(this,"dollyIn"),ct(this,"dollyOut"),ct(this,"getScale"),ct(this,"setScale"),this.object=e,this.domElement=t,this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=()=>f.phi,this.getAzimuthalAngle=()=>f.theta,this.setPolarAngle=U=>{let re=rv(U,2*Math.PI),fe=f.phi;fe<0&&(fe+=2*Math.PI),re<0&&(re+=2*Math.PI);let se=Math.abs(re-fe);2*Math.PI-se<se&&(re<fe?re+=2*Math.PI:fe+=2*Math.PI),p.phi=re-fe,n.update()},this.setAzimuthalAngle=U=>{let re=rv(U,2*Math.PI),fe=f.theta;fe<0&&(fe+=2*Math.PI),re<0&&(re+=2*Math.PI);let se=Math.abs(re-fe);2*Math.PI-se<se&&(re<fe?re+=2*Math.PI:fe+=2*Math.PI),p.theta=re-fe,n.update()},this.getDistance=()=>n.object.position.distanceTo(n.target),this.listenToKeyEvents=U=>{U.addEventListener("keydown",Le),this._domElementKeyEvents=U},this.stopListenToKeyEvents=()=>{this._domElementKeyEvents.removeEventListener("keydown",Le),this._domElementKeyEvents=null},this.saveState=()=>{n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=()=>{n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(i),n.update(),u=c.NONE},this.update=(()=>{const U=new O,re=new O(0,1,0),fe=new Nn().setFromUnitVectors(e.up,re),se=fe.clone().invert(),ce=new O,Ee=new Nn,V=2*Math.PI;return function(){const ue=n.object.position;fe.setFromUnitVectors(e.up,re),se.copy(fe).invert(),U.copy(ue).sub(n.target),U.applyQuaternion(fe),f.setFromVector3(U),n.autoRotate&&u===c.NONE&&H(Y()),n.enableDamping?(f.theta+=p.theta*n.dampingFactor,f.phi+=p.phi*n.dampingFactor):(f.theta+=p.theta,f.phi+=p.phi);let we=n.minAzimuthAngle,xe=n.maxAzimuthAngle;isFinite(we)&&isFinite(xe)&&(we<-Math.PI?we+=V:we>Math.PI&&(we-=V),xe<-Math.PI?xe+=V:xe>Math.PI&&(xe-=V),we<=xe?f.theta=Math.max(we,Math.min(xe,f.theta)):f.theta=f.theta>(we+xe)/2?Math.max(we,f.theta):Math.min(xe,f.theta)),f.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,f.phi)),f.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(g,n.dampingFactor):n.target.add(g),n.zoomToCursor&&B||n.object.isOrthographicCamera?f.radius=Te(f.radius):f.radius=Te(f.radius*m),U.setFromSpherical(f),U.applyQuaternion(se),ue.copy(n.target).add(U),n.object.matrixAutoUpdate||n.object.updateMatrix(),n.object.lookAt(n.target),n.enableDamping===!0?(p.theta*=1-n.dampingFactor,p.phi*=1-n.dampingFactor,g.multiplyScalar(1-n.dampingFactor)):(p.set(0,0,0),g.set(0,0,0));let be=!1;if(n.zoomToCursor&&B){let je=null;if(n.object instanceof _n&&n.object.isPerspectiveCamera){const ht=U.length();je=Te(ht*m);const ye=ht-je;n.object.position.addScaledVector(E,ye),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){const ht=new O(C.x,C.y,0);ht.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/m)),n.object.updateProjectionMatrix(),be=!0;const ye=new O(C.x,C.y,0);ye.unproject(n.object),n.object.position.sub(ye).add(ht),n.object.updateMatrixWorld(),je=U.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;je!==null&&(n.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(je).add(n.object.position):(gu.origin.copy(n.object.position),gu.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(gu.direction))<sP?e.lookAt(n.target):(iv.setFromNormalAndCoplanarPoint(n.object.up,n.target),gu.intersectPlane(iv,n.target))))}else n.object instanceof Qr&&n.object.isOrthographicCamera&&(be=m!==1,be&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/m)),n.object.updateProjectionMatrix()));return m=1,B=!1,be||ce.distanceToSquared(n.object.position)>h||8*(1-Ee.dot(n.object.quaternion))>h?(n.dispatchEvent(i),ce.copy(n.object.position),Ee.copy(n.object.quaternion),be=!1,!0):!1}})(),this.connect=U=>{n.domElement=U,n.domElement.style.touchAction="none",n.domElement.addEventListener("contextmenu",at),n.domElement.addEventListener("pointerdown",bt),n.domElement.addEventListener("pointercancel",q),n.domElement.addEventListener("wheel",Ht)},this.dispose=()=>{var U,re,fe,se,ce,Ee;n.domElement&&(n.domElement.style.touchAction="auto"),(U=n.domElement)==null||U.removeEventListener("contextmenu",at),(re=n.domElement)==null||re.removeEventListener("pointerdown",bt),(fe=n.domElement)==null||fe.removeEventListener("pointercancel",q),(se=n.domElement)==null||se.removeEventListener("wheel",Ht),(ce=n.domElement)==null||ce.ownerDocument.removeEventListener("pointermove",It),(Ee=n.domElement)==null||Ee.ownerDocument.removeEventListener("pointerup",q),n._domElementKeyEvents!==null&&n._domElementKeyEvents.removeEventListener("keydown",Le)};const n=this,i={type:"change"},s={type:"start"},o={type:"end"},c={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let u=c.NONE;const h=1e-6,f=new vp,p=new vp;let m=1;const g=new O,v=new me,M=new me,y=new me,x=new me,w=new me,b=new me,T=new me,P=new me,R=new me,E=new O,C=new me;let B=!1;const N=[],D={};function Y(){return 2*Math.PI/60/60*n.autoRotateSpeed}function K(){return Math.pow(.95,n.zoomSpeed)}function H(U){n.reverseOrbit||n.reverseHorizontalOrbit?p.theta+=U:p.theta-=U}function ne(U){n.reverseOrbit||n.reverseVerticalOrbit?p.phi+=U:p.phi-=U}const oe=(()=>{const U=new O;return function(fe,se){U.setFromMatrixColumn(se,0),U.multiplyScalar(-fe),g.add(U)}})(),te=(()=>{const U=new O;return function(fe,se){n.screenSpacePanning===!0?U.setFromMatrixColumn(se,1):(U.setFromMatrixColumn(se,0),U.crossVectors(n.object.up,U)),U.multiplyScalar(fe),g.add(U)}})(),k=(()=>{const U=new O;return function(fe,se){const ce=n.domElement;if(ce&&n.object instanceof _n&&n.object.isPerspectiveCamera){const Ee=n.object.position;U.copy(Ee).sub(n.target);let V=U.length();V*=Math.tan(n.object.fov/2*Math.PI/180),oe(2*fe*V/ce.clientHeight,n.object.matrix),te(2*se*V/ce.clientHeight,n.object.matrix)}else ce&&n.object instanceof Qr&&n.object.isOrthographicCamera?(oe(fe*(n.object.right-n.object.left)/n.object.zoom/ce.clientWidth,n.object.matrix),te(se*(n.object.top-n.object.bottom)/n.object.zoom/ce.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}})();function G(U){n.object instanceof _n&&n.object.isPerspectiveCamera||n.object instanceof Qr&&n.object.isOrthographicCamera?m=U:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function W(U){G(m/U)}function J(U){G(m*U)}function _e(U){if(!n.zoomToCursor||!n.domElement)return;B=!0;const re=n.domElement.getBoundingClientRect(),fe=U.clientX-re.left,se=U.clientY-re.top,ce=re.width,Ee=re.height;C.x=fe/ce*2-1,C.y=-(se/Ee)*2+1,E.set(C.x,C.y,1).unproject(n.object).sub(n.object.position).normalize()}function Te(U){return Math.max(n.minDistance,Math.min(n.maxDistance,U))}function ae(U){v.set(U.clientX,U.clientY)}function Me(U){_e(U),T.set(U.clientX,U.clientY)}function Pe(U){x.set(U.clientX,U.clientY)}function Ye(U){M.set(U.clientX,U.clientY),y.subVectors(M,v).multiplyScalar(n.rotateSpeed);const re=n.domElement;re&&(H(2*Math.PI*y.x/re.clientHeight),ne(2*Math.PI*y.y/re.clientHeight)),v.copy(M),n.update()}function Ue(U){P.set(U.clientX,U.clientY),R.subVectors(P,T),R.y>0?W(K()):R.y<0&&J(K()),T.copy(P),n.update()}function et(U){w.set(U.clientX,U.clientY),b.subVectors(w,x).multiplyScalar(n.panSpeed),k(b.x,b.y),x.copy(w),n.update()}function kt(U){_e(U),U.deltaY<0?J(K()):U.deltaY>0&&W(K()),n.update()}function Ke(U){let re=!1;switch(U.code){case n.keys.UP:k(0,n.keyPanSpeed),re=!0;break;case n.keys.BOTTOM:k(0,-n.keyPanSpeed),re=!0;break;case n.keys.LEFT:k(n.keyPanSpeed,0),re=!0;break;case n.keys.RIGHT:k(-n.keyPanSpeed,0),re=!0;break}re&&(U.preventDefault(),n.update())}function gt(){if(N.length==1)v.set(N[0].pageX,N[0].pageY);else{const U=.5*(N[0].pageX+N[1].pageX),re=.5*(N[0].pageY+N[1].pageY);v.set(U,re)}}function ot(){if(N.length==1)x.set(N[0].pageX,N[0].pageY);else{const U=.5*(N[0].pageX+N[1].pageX),re=.5*(N[0].pageY+N[1].pageY);x.set(U,re)}}function ge(){const U=N[0].pageX-N[1].pageX,re=N[0].pageY-N[1].pageY,fe=Math.sqrt(U*U+re*re);T.set(0,fe)}function Ie(){n.enableZoom&&ge(),n.enablePan&&ot()}function Ce(){n.enableZoom&&ge(),n.enableRotate&&gt()}function Ge(U){if(N.length==1)M.set(U.pageX,U.pageY);else{const fe=ve(U),se=.5*(U.pageX+fe.x),ce=.5*(U.pageY+fe.y);M.set(se,ce)}y.subVectors(M,v).multiplyScalar(n.rotateSpeed);const re=n.domElement;re&&(H(2*Math.PI*y.x/re.clientHeight),ne(2*Math.PI*y.y/re.clientHeight)),v.copy(M)}function Ne(U){if(N.length==1)w.set(U.pageX,U.pageY);else{const re=ve(U),fe=.5*(U.pageX+re.x),se=.5*(U.pageY+re.y);w.set(fe,se)}b.subVectors(w,x).multiplyScalar(n.panSpeed),k(b.x,b.y),x.copy(w)}function pt(U){const re=ve(U),fe=U.pageX-re.x,se=U.pageY-re.y,ce=Math.sqrt(fe*fe+se*se);P.set(0,ce),R.set(0,Math.pow(P.y/T.y,n.zoomSpeed)),W(R.y),T.copy(P)}function Ze(U){n.enableZoom&&pt(U),n.enablePan&&Ne(U)}function Et(U){n.enableZoom&&pt(U),n.enableRotate&&Ge(U)}function bt(U){var re,fe;n.enabled!==!1&&(N.length===0&&((re=n.domElement)==null||re.ownerDocument.addEventListener("pointermove",It),(fe=n.domElement)==null||fe.ownerDocument.addEventListener("pointerup",q)),F(U),U.pointerType==="touch"?Zt(U):Kt(U))}function It(U){n.enabled!==!1&&(U.pointerType==="touch"?it(U):St(U))}function q(U){var re,fe,se;I(U),N.length===0&&((re=n.domElement)==null||re.releasePointerCapture(U.pointerId),(fe=n.domElement)==null||fe.ownerDocument.removeEventListener("pointermove",It),(se=n.domElement)==null||se.ownerDocument.removeEventListener("pointerup",q)),n.dispatchEvent(o),u=c.NONE}function Kt(U){let re;switch(U.button){case 0:re=n.mouseButtons.LEFT;break;case 1:re=n.mouseButtons.MIDDLE;break;case 2:re=n.mouseButtons.RIGHT;break;default:re=-1}switch(re){case Ts.DOLLY:if(n.enableZoom===!1)return;Me(U),u=c.DOLLY;break;case Ts.ROTATE:if(U.ctrlKey||U.metaKey||U.shiftKey){if(n.enablePan===!1)return;Pe(U),u=c.PAN}else{if(n.enableRotate===!1)return;ae(U),u=c.ROTATE}break;case Ts.PAN:if(U.ctrlKey||U.metaKey||U.shiftKey){if(n.enableRotate===!1)return;ae(U),u=c.ROTATE}else{if(n.enablePan===!1)return;Pe(U),u=c.PAN}break;default:u=c.NONE}u!==c.NONE&&n.dispatchEvent(s)}function St(U){if(n.enabled!==!1)switch(u){case c.ROTATE:if(n.enableRotate===!1)return;Ye(U);break;case c.DOLLY:if(n.enableZoom===!1)return;Ue(U);break;case c.PAN:if(n.enablePan===!1)return;et(U);break}}function Ht(U){n.enabled===!1||n.enableZoom===!1||u!==c.NONE&&u!==c.ROTATE||(U.preventDefault(),n.dispatchEvent(s),kt(U),n.dispatchEvent(o))}function Le(U){n.enabled===!1||n.enablePan===!1||Ke(U)}function Zt(U){switch(ie(U),N.length){case 1:switch(n.touches.ONE){case As.ROTATE:if(n.enableRotate===!1)return;gt(),u=c.TOUCH_ROTATE;break;case As.PAN:if(n.enablePan===!1)return;ot(),u=c.TOUCH_PAN;break;default:u=c.NONE}break;case 2:switch(n.touches.TWO){case As.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Ie(),u=c.TOUCH_DOLLY_PAN;break;case As.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Ce(),u=c.TOUCH_DOLLY_ROTATE;break;default:u=c.NONE}break;default:u=c.NONE}u!==c.NONE&&n.dispatchEvent(s)}function it(U){switch(ie(U),u){case c.TOUCH_ROTATE:if(n.enableRotate===!1)return;Ge(U),n.update();break;case c.TOUCH_PAN:if(n.enablePan===!1)return;Ne(U),n.update();break;case c.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Ze(U),n.update();break;case c.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Et(U),n.update();break;default:u=c.NONE}}function at(U){n.enabled!==!1&&U.preventDefault()}function F(U){N.push(U)}function I(U){delete D[U.pointerId];for(let re=0;re<N.length;re++)if(N[re].pointerId==U.pointerId){N.splice(re,1);return}}function ie(U){let re=D[U.pointerId];re===void 0&&(re=new me,D[U.pointerId]=re),re.set(U.pageX,U.pageY)}function ve(U){const re=U.pointerId===N[0].pointerId?N[1]:N[0];return D[re.pointerId]}this.dollyIn=(U=K())=>{J(U),n.update()},this.dollyOut=(U=K())=>{W(U),n.update()},this.getScale=()=>m,this.setScale=U=>{G(U),n.update()},this.getZoomScale=()=>K(),t!==void 0&&this.connect(t),this.update()}};const sv=new xn,_u=new O;class Sm extends pm{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new qe(e,3)),this.setAttribute("uv",new qe(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const n=new mh(t,6,1);return this.setAttribute("instanceStart",new _i(n,3,0)),this.setAttribute("instanceEnd",new _i(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let n;e instanceof Float32Array?n=e:Array.isArray(e)&&(n=new Float32Array(e));const i=new mh(n,t*2,1);return this.setAttribute("instanceColorStart",new _i(i,t,0)),this.setAttribute("instanceColorEnd",new _i(i,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new rm(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xn);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),sv.setFromBufferAttribute(t),this.boundingBox.union(sv))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yn),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)_u.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(_u)),_u.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(_u));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}class Oy extends Sm{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setPositions(n),this}setColors(e,t=3){const n=e.length-t,i=new Float32Array(2*n);if(t===3)for(let s=0;s<n;s+=t)i[2*s]=e[s],i[2*s+1]=e[s+1],i[2*s+2]=e[s+2],i[2*s+3]=e[s+3],i[2*s+4]=e[s+4],i[2*s+5]=e[s+5];else for(let s=0;s<n;s+=t)i[2*s]=e[s],i[2*s+1]=e[s+1],i[2*s+2]=e[s+2],i[2*s+3]=e[s+3],i[2*s+4]=e[s+4],i[2*s+5]=e[s+5],i[2*s+6]=e[s+6],i[2*s+7]=e[s+7];return super.setColors(i,t),this}fromLine(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class Mm extends fr{constructor(e){super({type:"LineMaterial",uniforms:dh.clone(dh.merge([ke.common,ke.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new me(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${Dy>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(t){this.uniforms.diffuse.value=t}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(t){this.uniforms.linewidth.value=t}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(t){!!t!="USE_DASH"in this.defines&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(t){this.uniforms.dashScale.value=t}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(t){this.uniforms.dashSize.value=t}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(t){this.uniforms.dashOffset.value=t}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(t){this.uniforms.gapSize.value=t}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(t){this.uniforms.opacity.value=t}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(t){this.uniforms.resolution.value.copy(t)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(t){!!t!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),t===!0?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}const np=new Ot,ov=new O,av=new O,Pn=new Ot,In=new Ot,sr=new Ot,ip=new O,rp=new mt,Ln=new Qx,lv=new O,vu=new xn,xu=new yn,or=new Ot;let cr,Os;function cv(r,e,t){return or.set(0,0,-e,1).applyMatrix4(r.projectionMatrix),or.multiplyScalar(1/or.w),or.x=Os/t.width,or.y=Os/t.height,or.applyMatrix4(r.projectionMatrixInverse),or.multiplyScalar(1/or.w),Math.abs(Math.max(or.x,or.y))}function aP(r,e){const t=r.matrixWorld,n=r.geometry,i=n.attributes.instanceStart,s=n.attributes.instanceEnd,o=Math.min(n.instanceCount,i.count);for(let c=0,u=o;c<u;c++){Ln.start.fromBufferAttribute(i,c),Ln.end.fromBufferAttribute(s,c),Ln.applyMatrix4(t);const h=new O,f=new O;cr.distanceSqToSegment(Ln.start,Ln.end,f,h),f.distanceTo(h)<Os*.5&&e.push({point:f,pointOnLine:h,distance:cr.origin.distanceTo(f),object:r,face:null,faceIndex:c,uv:null,[Uy]:null})}}function lP(r,e,t){const n=e.projectionMatrix,s=r.material.resolution,o=r.matrixWorld,c=r.geometry,u=c.attributes.instanceStart,h=c.attributes.instanceEnd,f=Math.min(c.instanceCount,u.count),p=-e.near;cr.at(1,sr),sr.w=1,sr.applyMatrix4(e.matrixWorldInverse),sr.applyMatrix4(n),sr.multiplyScalar(1/sr.w),sr.x*=s.x/2,sr.y*=s.y/2,sr.z=0,ip.copy(sr),rp.multiplyMatrices(e.matrixWorldInverse,o);for(let m=0,g=f;m<g;m++){if(Pn.fromBufferAttribute(u,m),In.fromBufferAttribute(h,m),Pn.w=1,In.w=1,Pn.applyMatrix4(rp),In.applyMatrix4(rp),Pn.z>p&&In.z>p)continue;if(Pn.z>p){const b=Pn.z-In.z,T=(Pn.z-p)/b;Pn.lerp(In,T)}else if(In.z>p){const b=In.z-Pn.z,T=(In.z-p)/b;In.lerp(Pn,T)}Pn.applyMatrix4(n),In.applyMatrix4(n),Pn.multiplyScalar(1/Pn.w),In.multiplyScalar(1/In.w),Pn.x*=s.x/2,Pn.y*=s.y/2,In.x*=s.x/2,In.y*=s.y/2,Ln.start.copy(Pn),Ln.start.z=0,Ln.end.copy(In),Ln.end.z=0;const M=Ln.closestPointToPointParameter(ip,!0);Ln.at(M,lv);const y=Kv.lerp(Pn.z,In.z,M),x=y>=-1&&y<=1,w=ip.distanceTo(lv)<Os*.5;if(x&&w){Ln.start.fromBufferAttribute(u,m),Ln.end.fromBufferAttribute(h,m),Ln.start.applyMatrix4(o),Ln.end.applyMatrix4(o);const b=new O,T=new O;cr.distanceSqToSegment(Ln.start,Ln.end,T,b),t.push({point:T,pointOnLine:b,distance:cr.origin.distanceTo(T),object:r,face:null,faceIndex:m,uv:null,[Uy]:null})}}}class Fy extends Sn{constructor(e=new Sm,t=new Mm({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let o=0,c=0,u=t.count;o<u;o++,c+=2)ov.fromBufferAttribute(t,o),av.fromBufferAttribute(n,o),i[c]=c===0?0:i[c-1],i[c+1]=i[c]+ov.distanceTo(av);const s=new mh(i,2,1);return e.setAttribute("instanceDistanceStart",new _i(s,1,0)),e.setAttribute("instanceDistanceEnd",new _i(s,1,1)),this}raycast(e,t){const n=this.material.worldUnits,i=e.camera;i===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const s=e.params.Line2!==void 0&&e.params.Line2.threshold||0;cr=e.ray;const o=this.matrixWorld,c=this.geometry,u=this.material;Os=u.linewidth+s,c.boundingSphere===null&&c.computeBoundingSphere(),xu.copy(c.boundingSphere).applyMatrix4(o);let h;if(n)h=Os*.5;else{const p=Math.max(i.near,xu.distanceToPoint(cr.origin));h=cv(i,p,u.resolution)}if(xu.radius+=h,cr.intersectsSphere(xu)===!1)return;c.boundingBox===null&&c.computeBoundingBox(),vu.copy(c.boundingBox).applyMatrix4(o);let f;if(n)f=Os*.5;else{const p=Math.max(i.near,vu.distanceToPoint(cr.origin));f=cv(i,p,u.resolution)}vu.expandByScalar(f),cr.intersectsBox(vu)!==!1&&(n?aP(this,t):lP(this,i,t))}onBeforeRender(e){const t=this.material.uniforms;t&&t.resolution&&(e.getViewport(np),this.material.uniforms.resolution.value.set(np.z,np.w))}}class cP extends Fy{constructor(e=new Oy,t=new Mm({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}}const uP=De.forwardRef(function({points:e,color:t=16777215,vertexColors:n,linewidth:i,lineWidth:s,segments:o,dashed:c,...u},h){var f,p;const m=Ar(x=>x.size),g=De.useMemo(()=>o?new Fy:new cP,[o]),[v]=De.useState(()=>new Mm),M=(n==null||(f=n[0])==null?void 0:f.length)===4?4:3,y=De.useMemo(()=>{const x=o?new Sm:new Oy,w=e.map(b=>{const T=Array.isArray(b);return b instanceof O||b instanceof Ot?[b.x,b.y,b.z]:b instanceof me?[b.x,b.y,0]:T&&b.length===3?[b[0],b[1],b[2]]:T&&b.length===2?[b[0],b[1],0]:b});if(x.setPositions(w.flat()),n){t=16777215;const b=n.map(T=>T instanceof Xe?T.toArray():T);x.setColors(b.flat(),M)}return x},[e,o,n,M]);return De.useLayoutEffect(()=>{g.computeLineDistances()},[e,g]),De.useLayoutEffect(()=>{c?v.defines.USE_DASH="":delete v.defines.USE_DASH,v.needsUpdate=!0},[c,v]),De.useEffect(()=>()=>{y.dispose(),v.dispose()},[y]),De.createElement("primitive",Qo({object:g,ref:h},u),De.createElement("primitive",{object:y,attach:"geometry"}),De.createElement("primitive",Qo({object:v,attach:"material",color:t,vertexColors:!!n,resolution:[m.width,m.height],linewidth:(p=i??s)!==null&&p!==void 0?p:1,dashed:c,transparent:M===4},u)))}),hP=De.forwardRef(({makeDefault:r,camera:e,regress:t,domElement:n,enableDamping:i=!0,keyEvents:s=!1,onChange:o,onStart:c,onEnd:u,...h},f)=>{const p=Ar(R=>R.invalidate),m=Ar(R=>R.camera),g=Ar(R=>R.gl),v=Ar(R=>R.events),M=Ar(R=>R.setEvents),y=Ar(R=>R.set),x=Ar(R=>R.get),w=Ar(R=>R.performance),b=e||m,T=n||v.connected||g.domElement,P=De.useMemo(()=>new oP(b),[b]);return Cy(()=>{P.enabled&&P.update()},-1),De.useEffect(()=>(s&&P.connect(s===!0?T:s),P.connect(T),()=>void P.dispose()),[s,T,t,P,p]),De.useEffect(()=>{const R=B=>{p(),t&&w.regress(),o&&o(B)},E=B=>{c&&c(B)},C=B=>{u&&u(B)};return P.addEventListener("change",R),P.addEventListener("start",E),P.addEventListener("end",C),()=>{P.removeEventListener("start",E),P.removeEventListener("end",C),P.removeEventListener("change",R)}},[o,c,u,P,p,M]),De.useEffect(()=>{if(r){const R=x().controls;return y({controls:P}),()=>y({controls:R})}},[r,P]),De.createElement("primitive",Qo({ref:f,object:P,enableDamping:i},h))});function fP(r,e){const t=r+"Geometry";return De.forwardRef(({args:n,children:i,...s},o)=>{const c=De.useRef(null);return De.useImperativeHandle(o,()=>c.current),De.useLayoutEffect(()=>void(e==null?void 0:e(c.current))),De.createElement("mesh",Qo({ref:c},s),De.createElement(t,{attach:"geometry",args:n}),i)})}const uv=fP("sphere"),hv="(prefers-reduced-motion: reduce)";function dP(){const[r,e]=De.useState(()=>{var t;return typeof window<"u"&&!!((t=window.matchMedia)!=null&&t.call(window,hv).matches)});return De.useEffect(()=>{var i;const t=(i=window.matchMedia)==null?void 0:i.call(window,hv);if(!t)return;const n=()=>e(t.matches);return t.addEventListener("change",n),()=>t.removeEventListener("change",n)},[]),r}const pP="#00F0FF",mP=.22,gP=2.03,yu=(r,e,t)=>new O(r,e,t).normalize().multiplyScalar(gP),_P=()=>Mt.jsxs("group",{children:[Mt.jsx(uv,{args:[1.98,48,48],children:Mt.jsx("meshBasicMaterial",{color:"#070B12"})}),Mt.jsx(uv,{args:[2,36,24],children:Mt.jsx("meshBasicMaterial",{color:pP,wireframe:!0,transparent:!0,opacity:mP})})]}),vP=({start:r,end:e,color:t,speed:n=.6,jitter:i=!1,still:s=!1})=>{const o=De.useMemo(()=>{const h=r.clone().lerp(e,.5).normalize().multiplyScalar(2.5);return new kh(r,h,e)},[r,e]),c=De.useMemo(()=>o.getPoints(50),[o]),u=De.useRef(null);return Cy(({clock:h})=>{if(!u.current)return;const f=s?.5:h.getElapsedTime()*n%1,p=o.getPoint(f);i&&!s&&(p.x+=(Math.random()-.5)*.08,p.y+=(Math.random()-.5)*.08),u.current.position.copy(p)}),Mt.jsxs("group",{children:[Mt.jsx(uP,{points:c,color:t,lineWidth:1.5,transparent:!0,opacity:.4}),Mt.jsxs("mesh",{ref:u,children:[Mt.jsx("sphereGeometry",{args:[.05,16,16]}),Mt.jsx("meshBasicMaterial",{color:t,toneMapped:!1})]})]})};function EP({status:r="ACTIVE_SYNC",targetRegion:e="gcp-us-central1",chaosActive:t=!1}){const n=dP(),i=De.useMemo(()=>yu(1.2,1,1.2),[]),s=De.useMemo(()=>{switch(e){case"aws-us-west-2":return yu(-1.8,.8,-.6);case"azure-eastus2":return yu(1.1,.8,1.4);case"gcp-us-central1":default:return yu(-1,1.2,1.4)}},[e]),{conduitColor:o,conduitSpeed:c,statusLabel:u}=De.useMemo(()=>{if(t)return{conduitColor:"#FF3B30",conduitSpeed:.9,statusLabel:"CHAOS INJECTED • Network Jitter & Dropped Packets"};switch(r){case"ACTIVE_SYNC":return{conduitColor:"#00F0FF",conduitSpeed:.6,statusLabel:"Encrypted eBPF Replication Active"};case"TARGET_SECURED":return{conduitColor:"#00FF9D",conduitSpeed:.3,statusLabel:"Failover Secured • Target Active"};default:return{conduitColor:"#FFB800",conduitSpeed:1.8,statusLabel:"Hydrating Target & Rerouting Traffic..."}}},[r,t]),h=De.useMemo(()=>{switch(e){case"aws-us-west-2":return"AWS us-west-2 (Oregon)";case"azure-eastus2":return"Azure East US 2 (Virginia)";case"gcp-us-central1":default:return"GCP us-central1 (Iowa)"}},[e]);return Mt.jsxs("div",{className:"w-full h-72 md:h-80 rounded-2xl overflow-hidden border border-white/10 bg-[#05070B]/80 relative shadow-2xl backdrop-blur-xl mb-6",children:[Mt.jsxs("div",{className:"absolute top-4 left-4 z-10 flex items-center gap-3",children:[Mt.jsx("div",{className:"w-2.5 h-2.5 rounded-full animate-pulse transition-colors duration-500 shadow-lg",style:{backgroundColor:o,boxShadow:`0 0 10px ${o}`}}),Mt.jsxs("span",{className:"text-xs font-mono uppercase tracking-widest bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 transition-colors duration-500",style:{color:o},children:["Tunnel: CoreSite/AWS us-east-1 ➔ ",h," • ",u]})]}),Mt.jsxs("div",{className:"absolute bottom-4 right-4 z-10 hidden sm:flex items-center gap-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest bg-black/40 px-3 py-1 rounded-lg border border-white/5",children:[Mt.jsx("span",{children:"Three.js 60FPS"}),Mt.jsx("span",{children:"•"}),Mt.jsx("span",{children:"Interactive Drag / Orbit"})]}),Mt.jsxs(QR,{camera:{position:[0,0,5],fov:45},dpr:[1,1.5],children:[Mt.jsx("ambientLight",{intensity:.5}),Mt.jsx("pointLight",{position:[10,10,10],intensity:1,color:"#00F0FF"}),Mt.jsx("pointLight",{position:[-10,-10,-10],intensity:.6,color:"#00FF9D"}),Mt.jsx(_P,{}),Mt.jsxs("mesh",{position:i,children:[Mt.jsx("sphereGeometry",{args:[.07,16,16]}),Mt.jsx("meshBasicMaterial",{color:"#00F0FF",toneMapped:!1})]}),Mt.jsxs("mesh",{position:s,children:[Mt.jsx("sphereGeometry",{args:[.07,16,16]}),Mt.jsx("meshBasicMaterial",{color:t?"#FF3B30":r==="TARGET_SECURED"?"#00FF9D":"#FFB800",toneMapped:!1})]}),Mt.jsx(vP,{start:i,end:s,color:o,speed:c,jitter:t,still:n}),Mt.jsx(hP,{enableZoom:!1,enablePan:!1,autoRotate:!n,autoRotateSpeed:.5,maxPolarAngle:Math.PI/1.5,minPolarAngle:Math.PI/3})]})]})}export{EP as default};
