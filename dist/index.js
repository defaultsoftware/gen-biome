"use strict";var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};const perlin_1=__importDefault(require("./perlin"));function generateMap(e){const{width:i,height:n,bioms:l,frequency:u=10,redistribution:o=1,...a}=e,f=[];for(let r=0;r<n;r++){f[r]=[];for(let e=0;e<i;e++){let t=(0,perlin_1.default)({...a,x:e/i*u,y:r/n*u});t**=o;var s=l.find(({level:e})=>t<=e);f[r][e]=(s||l[l.length-1]).tileIndex}}return f}module.exports=generateMap;