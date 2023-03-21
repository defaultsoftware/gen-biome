/*! For license information please see index.js.LICENSE.txt */
(()=>{"use strict";var e={"./demo/src/biomes.ts":(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.BIOMES=void 0,t.BIOMES=[{params:{lowerBound:0,upperBound:.2},data:{name:"WATER",color:"dodgerblue"}},{params:{lowerBound:.2,upperBound:.3},data:{name:"SAND",color:"#edd665"}},{params:{lowerBound:.3,upperBound:.7},data:{name:"GRASS",color:"#9bd138"}},{params:{lowerBound:.7,upperBound:.9},data:{name:"MOUNT",color:"gray"}},{params:{lowerBound:.9},data:{name:"SNOW",color:"white"}}]},"./demo/src/interface.ts":(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ui=void 0,t.ui={screen:document.getElementById("screen"),inputs:{resetSeed:document.querySelector("[name=resetSeed]"),frequencyChange:document.querySelector("[name=frequencyChange]"),borderSmoothness:document.querySelector("[name=borderSmoothness]"),heightRedistribution:document.querySelector("[name=heightRedistribution]"),worldWidth:document.querySelector("[name=worldWidth]"),worldHeight:document.querySelector("[name=worldHeight]")},buttons:{generate:document.getElementById("generate")}}},"./demo/src/render.ts":(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.renderOnCanvas=void 0;const o=r("./demo/src/interface.ts"),i=o.ui.screen.getContext("2d"),n=2;t.renderOnCanvas=function(e){var t;o.ui.screen.width=e.width*n,o.ui.screen.height=e.height*n;for(let r=0;r<e.height;r++)for(let o=0;o<e.width;o++){const s=e.getAt({x:o,y:r});i.fillStyle=null!==(t=null==s?void 0:s.color)&&void 0!==t?t:"purple",i.fillRect(o*n,r*n,n,n)}}},"./src/index.ts":function(e,t,r){var o=this&&this.__createBinding||(Object.create?function(e,t,r,o){void 0===o&&(o=r);var i=Object.getOwnPropertyDescriptor(t,r);i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,o,i)}:function(e,t,r,o){void 0===o&&(o=r),e[o]=t[r]}),i=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||o(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),i(r("./src/world-generator.ts"),t),i(r("./src/world.ts"),t),i(r("./src/types.ts"),t)},"./src/types.ts":(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})},"./src/utils/clamp.ts":(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.clamp=void 0,t.clamp=function(e,t,r=[0,1]){return Math.max(r[0],Math.min(r[1],null!=e?e:t))}},"./src/utils/perlin.ts":(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.generateNoise=t.generateSeed=void 0;const r=4095,o=4,i=1<<o,n=256,s=.5,d=1.1;function a(e){return.5*(1-Math.cos(e*Math.PI))}t.generateSeed=function(){const e=[];for(let t=0;t<r+1;t++)e.push(Math.random());return e},t.generateNoise=function(e){let{x:t,y:r}=e;const{seed:l,frequency:u,redistribution:c,octaves:h}=e,m=l.length-1;t*=u,r*=u;let p,v,g,f,y,b=Math.floor(t),w=Math.floor(r),B=t-b,M=r-w,_=0,S=.5;for(let e=0;e<h;e++){let e=b+(w<<o);p=a(B),v=a(M),g=l[e&m],g+=p*(l[e+1&m]-g),f=l[e+i&m],f+=p*(l[e+i+1&m]-f),g+=v*(f-g),e+=n,f=l[e&m],f+=p*(l[e+1&m]-f),y=l[e+i&m],y+=p*(l[e+i+1&m]-y),f+=v*(y-f),_+=g*S,S*=s,b<<=1,B*=2,B>=1&&(b++,B--),w<<=1,M*=2,M>=1&&(w++,M--)}return _>.5?_=Math.pow(_,(1.5-_)/d):_<.5&&(_=Math.pow(_,(1.5-_)*d)),_=Math.pow(_,c),_}},"./src/world-biome.ts":(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.WorldBiome=void 0;t.WorldBiome=class{constructor(e,t){var r,o;this.lowerBound=Math.max(0,null!==(r=e.lowerBound)&&void 0!==r?r:0),this.upperBound=Math.min(1,null!==(o=e.upperBound)&&void 0!==o?o:1),this.data=t}}},"./src/world-generator.ts":(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.WorldGenerator=void 0;const o=r("./src/utils/perlin.ts"),i=r("./src/world.ts"),n=r("./src/world-layer.ts");t.WorldGenerator=class{constructor(e){this.layers=[],this.width=e.width,this.height=e.height}addLayer(e={}){const t=new n.WorldLayer(e);return this.layers.push(t),t}clearLayers(){this.layers=[]}getLayers(){return this.layers}generate(e){const t=null!=e?e:(0,o.generateSeed)(),r=[];for(const e of this.layers){const o=this.generateLayer(e,t);for(let e=0;e<this.height;e++){r[e]||(r[e]=[]);for(let t=0;t<this.width;t++)o[e][t]&&(r[e][t]=o[e][t].data)}}for(let e=0;e<this.height;e++)for(let t=0;t<this.width;t++)if(void 0===r[e][t])throw Error(`World matrix contains empty biome at ${t},${e}`);return new i.World(r,t)}generateLayer(e,t){const r=e.getGenerationParams(),i=[];for(let n=0;n<this.height;n++){i[n]=[];for(let s=0;s<this.width;s++){const d=(0,o.generateNoise)(Object.assign(Object.assign({},r),{seed:t,x:s/this.width,y:n/this.height})),a=e.getBiomeByHeight(d);a&&(i[n][s]=a)}}return i}}},"./src/world-layer.ts":(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.WorldLayer=void 0;const o=r("./src/utils/clamp.ts"),i=r("./src/world-biome.ts");t.WorldLayer=class{constructor(e={}){this.biomes=[],this.frequency=Math.round(31*(0,o.clamp)(null==e?void 0:e.frequencyChange,.3)+1),this.octaves=Math.round(14*(1-(0,o.clamp)(null==e?void 0:e.borderSmoothness,.5))+1),this.redistribution=2-(0,o.clamp)(null==e?void 0:e.heightRedistribution,1,[.5,1.5])}addBiome(e,t){const r=new i.WorldBiome(e,t);return this.biomes.push(r),r}clearBiomes(){this.biomes=[]}getBiomes(){return this.biomes}getBiomeByHeight(e){return this.getBiomes().find((t=>e>=t.lowerBound&&e<=t.upperBound))}getGenerationParams(){return{frequency:this.frequency,octaves:this.octaves,redistribution:this.redistribution}}}},"./src/world.ts":(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.World=void 0;t.World=class{constructor(e,t){this.matrix=[],this.width=e[0].length,this.height=e.length,this.matrix=e,this.seed=t}getMatrix(){return this.matrix}getAt(e){var t;return null===(t=this.matrix[e.y])||void 0===t?void 0:t[e.x]}replaceAt(e,t){if(e.y>=this.height||e.x>=this.width)throw Error("Specified position is out of world bounds");this.matrix[e.y][e.x]=t}getSeed(){return this.seed}}}},t={};function r(o){var i=t[o];if(void 0!==i)return i.exports;var n=t[o]={exports:{}};return e[o].call(n.exports,n,n.exports,r),n.exports}var o={};(()=>{var e,t,i=o;Object.defineProperty(i,"__esModule",{value:!0});const n=r("./src/index.ts"),s=r("./demo/src/render.ts"),d=r("./demo/src/biomes.ts"),a=r("./demo/src/interface.ts");let l;null===(e=a.ui.buttons.generate)||void 0===e||e.addEventListener("click",(()=>{var e,t,r,o,i,u;const c=new n.WorldGenerator({width:Number(null===(e=a.ui.inputs.worldWidth)||void 0===e?void 0:e.value),height:Number(null===(t=a.ui.inputs.worldHeight)||void 0===t?void 0:t.value)}),h=c.addLayer({frequencyChange:Number(null===(r=a.ui.inputs.frequencyChange)||void 0===r?void 0:r.value),borderSmoothness:Number(null===(o=a.ui.inputs.borderSmoothness)||void 0===o?void 0:o.value),heightRedistribution:Number(null===(i=a.ui.inputs.heightRedistribution)||void 0===i?void 0:i.value)});for(const{params:e,data:t}of d.BIOMES)h.addBiome(e,t);const m=(null===(u=a.ui.inputs.resetSeed)||void 0===u?void 0:u.checked)?void 0:l,p=c.generate(m);l=p.getSeed(),(0,s.renderOnCanvas)(p)})),null===(t=a.ui.buttons.generate)||void 0===t||t.click()})()})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxFQUN4QixNQUFNQyxFQUFZLElBQUlULEVBQVFyQyxlQUFlLENBQ3pDeEUsTUFBT3VILE9BQW1ELFFBQTNDeEgsRUFBS0wsRUFBWWYsR0FBR0ksT0FBT00sa0JBQStCLElBQVBVLE9BQWdCLEVBQVNBLEVBQUc1QixPQUM5RjhCLE9BQVFzSCxPQUFvRCxRQUE1Q2hELEVBQUs3RSxFQUFZZixHQUFHSSxPQUFPTyxtQkFBZ0MsSUFBUGlGLE9BQWdCLEVBQVNBLEVBQUdwRyxTQUU5RjJHLEVBQVF3QyxFQUFVekMsU0FBUyxDQUM3QjNGLGdCQUFpQnFJLE9BQXdELFFBQWhETCxFQUFLeEgsRUFBWWYsR0FBR0ksT0FBT0csdUJBQW9DLElBQVBnSSxPQUFnQixFQUFTQSxFQUFHL0ksT0FDN0dnQixpQkFBa0JvSSxPQUF5RCxRQUFqREosRUFBS3pILEVBQVlmLEdBQUdJLE9BQU9JLHdCQUFxQyxJQUFQZ0ksT0FBZ0IsRUFBU0EsRUFBR2hKLE9BQy9HaUIscUJBQXNCbUksT0FBNkQsUUFBckRILEVBQUsxSCxFQUFZZixHQUFHSSxPQUFPSyw0QkFBeUMsSUFBUGdJLE9BQWdCLEVBQVNBLEVBQUdqSixTQUUzSCxJQUFLLE1BQU0sT0FBRUUsRUFBTSxLQUFFRyxLQUFVdUksRUFBUzNJLE9BQ3BDMEcsRUFBTWlCLFNBQVMxSCxFQUFRRyxHQUUzQixNQUFNc0UsR0FBbUQsUUFBMUN1RSxFQUFLM0gsRUFBWWYsR0FBR0ksT0FBT0MsaUJBQThCLElBQVBxSSxPQUFnQixFQUFTQSxFQUFHRyxjQUFXekcsRUFBWWlHLEVBQzlHbEgsRUFBUXdILEVBQVU5SCxTQUFTc0QsR0FDakNrRSxFQUFZbEgsRUFBTXdHLFdBQ2xCLEVBQUlRLEVBQVNySCxnQkFBZ0JLLEVBQU0sSUFFSSxRQUExQ3lFLEVBQUs3RSxFQUFZZixHQUFHWSxRQUFRQyxnQkFBNkIsSUFBUCtFLEdBQXlCQSxFQUFHa0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nZW4tYmlvbWUvLi9kZW1vL3NyYy9iaW9tZXMudHMiLCJ3ZWJwYWNrOi8vZ2VuLWJpb21lLy4vZGVtby9zcmMvaW50ZXJmYWNlLnRzIiwid2VicGFjazovL2dlbi1iaW9tZS8uL2RlbW8vc3JjL3JlbmRlci50cyIsIndlYnBhY2s6Ly9nZW4tYmlvbWUvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZ2VuLWJpb21lLy4vc3JjL3R5cGVzLnRzIiwid2VicGFjazovL2dlbi1iaW9tZS8uL3NyYy91dGlscy9jbGFtcC50cyIsIndlYnBhY2s6Ly9nZW4tYmlvbWUvLi9zcmMvdXRpbHMvcGVybGluLnRzIiwid2VicGFjazovL2dlbi1iaW9tZS8uL3NyYy93b3JsZC1iaW9tZS50cyIsIndlYnBhY2s6Ly9nZW4tYmlvbWUvLi9zcmMvd29ybGQtZ2VuZXJhdG9yLnRzIiwid2VicGFjazovL2dlbi1iaW9tZS8uL3NyYy93b3JsZC1sYXllci50cyIsIndlYnBhY2s6Ly9nZW4tYmlvbWUvLi9zcmMvd29ybGQudHMiLCJ3ZWJwYWNrOi8vZ2VuLWJpb21lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2dlbi1iaW9tZS8uL2RlbW8vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5CSU9NRVMgPSB2b2lkIDA7XG5leHBvcnRzLkJJT01FUyA9IFtcbiAgICB7XG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgbG93ZXJCb3VuZDogMC4wLFxuICAgICAgICAgICAgdXBwZXJCb3VuZDogMC4yMCxcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgbmFtZTogJ1dBVEVSJyxcbiAgICAgICAgICAgIGNvbG9yOiAnZG9kZ2VyYmx1ZScsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgbG93ZXJCb3VuZDogMC4yLFxuICAgICAgICAgICAgdXBwZXJCb3VuZDogMC4zLFxuICAgICAgICB9LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBuYW1lOiAnU0FORCcsXG4gICAgICAgICAgICBjb2xvcjogJyNlZGQ2NjUnLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgIGxvd2VyQm91bmQ6IDAuMyxcbiAgICAgICAgICAgIHVwcGVyQm91bmQ6IDAuNyxcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgbmFtZTogJ0dSQVNTJyxcbiAgICAgICAgICAgIGNvbG9yOiAnIzliZDEzOCcsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgbG93ZXJCb3VuZDogMC43LFxuICAgICAgICAgICAgdXBwZXJCb3VuZDogMC45LFxuICAgICAgICB9LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBuYW1lOiAnTU9VTlQnLFxuICAgICAgICAgICAgY29sb3I6ICdncmF5JyxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICBsb3dlckJvdW5kOiAwLjksXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIG5hbWU6ICdTTk9XJyxcbiAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgICB9LFxuICAgIH0sXG5dO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnVpID0gdm9pZCAwO1xuZXhwb3J0cy51aSA9IHtcbiAgICBzY3JlZW46IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY3JlZW4nKSxcbiAgICBpbnB1dHM6IHtcbiAgICAgICAgcmVzZXRTZWVkOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbbmFtZT1yZXNldFNlZWRdJyksXG4gICAgICAgIGZyZXF1ZW5jeUNoYW5nZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW25hbWU9ZnJlcXVlbmN5Q2hhbmdlXScpLFxuICAgICAgICBib3JkZXJTbW9vdGhuZXNzOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbbmFtZT1ib3JkZXJTbW9vdGhuZXNzXScpLFxuICAgICAgICBoZWlnaHRSZWRpc3RyaWJ1dGlvbjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW25hbWU9aGVpZ2h0UmVkaXN0cmlidXRpb25dJyksXG4gICAgICAgIHdvcmxkV2lkdGg6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPXdvcmxkV2lkdGhdJyksXG4gICAgICAgIHdvcmxkSGVpZ2h0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbbmFtZT13b3JsZEhlaWdodF0nKSxcbiAgICB9LFxuICAgIGJ1dHRvbnM6IHtcbiAgICAgICAgZ2VuZXJhdGU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnZW5lcmF0ZScpLFxuICAgIH0sXG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnJlbmRlck9uQ2FudmFzID0gdm9pZCAwO1xuY29uc3QgaW50ZXJmYWNlXzEgPSByZXF1aXJlKFwiLi9pbnRlcmZhY2VcIik7XG5jb25zdCBjdHggPSBpbnRlcmZhY2VfMS51aS5zY3JlZW4uZ2V0Q29udGV4dCgnMmQnKTtcbmNvbnN0IHRpbGVTaXplID0gMjtcbmZ1bmN0aW9uIHJlbmRlck9uQ2FudmFzKHdvcmxkKSB7XG4gICAgdmFyIF9hO1xuICAgIGludGVyZmFjZV8xLnVpLnNjcmVlbi53aWR0aCA9IHdvcmxkLndpZHRoICogdGlsZVNpemU7XG4gICAgaW50ZXJmYWNlXzEudWkuc2NyZWVuLmhlaWdodCA9IHdvcmxkLmhlaWdodCAqIHRpbGVTaXplO1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgd29ybGQuaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB3b3JsZC53aWR0aDsgeCsrKSB7XG4gICAgICAgICAgICBjb25zdCBiaW9tZSA9IHdvcmxkLmdldEF0KHsgeCwgeSB9KTtcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAoX2EgPSBiaW9tZSA9PT0gbnVsbCB8fCBiaW9tZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmlvbWUuY29sb3IpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICdwdXJwbGUnO1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHggKiB0aWxlU2l6ZSwgeSAqIHRpbGVTaXplLCB0aWxlU2l6ZSwgdGlsZVNpemUpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5yZW5kZXJPbkNhbnZhcyA9IHJlbmRlck9uQ2FudmFzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fZXhwb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19leHBvcnRTdGFyKSB8fCBmdW5jdGlvbihtLCBleHBvcnRzKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChleHBvcnRzLCBwKSkgX19jcmVhdGVCaW5kaW5nKGV4cG9ydHMsIG0sIHApO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi93b3JsZC1nZW5lcmF0b3JcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL3dvcmxkXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi90eXBlc1wiKSwgZXhwb3J0cyk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jbGFtcCA9IHZvaWQgMDtcbmZ1bmN0aW9uIGNsYW1wKHZhbHVlLCBkZWZhdWx0VmFsdWUsIGxpbWl0ID0gWzAsIDFdKSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KGxpbWl0WzBdLCBNYXRoLm1pbihsaW1pdFsxXSwgdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHZvaWQgMCA/IHZhbHVlIDogZGVmYXVsdFZhbHVlKSk7XG59XG5leHBvcnRzLmNsYW1wID0gY2xhbXA7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2VuZXJhdGVOb2lzZSA9IGV4cG9ydHMuZ2VuZXJhdGVTZWVkID0gdm9pZCAwO1xuY29uc3QgREVGQVVMVF9QRVJMSU5fU0laRSA9IDQwOTU7XG5jb25zdCBQRVJMSU5fWVdSQVBCID0gNDtcbmNvbnN0IFBFUkxJTl9ZV1JBUCA9IDEgPDwgUEVSTElOX1lXUkFQQjtcbmNvbnN0IFBFUkxJTl9aV1JBUEIgPSA4O1xuY29uc3QgUEVSTElOX1pXUkFQID0gMSA8PCBQRVJMSU5fWldSQVBCO1xuY29uc3QgUEVSTElOX0FNUF9GQUxMT0ZGID0gMC41O1xuY29uc3QgUEVSTElOX0FWR19QT1dFUiA9IDEuMTtcbmZ1bmN0aW9uIHNjYWxlZENvc2luZShpKSB7XG4gICAgcmV0dXJuIDAuNSAqICgxLjAgLSBNYXRoLmNvcyhpICogTWF0aC5QSSkpO1xufVxuZnVuY3Rpb24gZ2VuZXJhdGVTZWVkKCkge1xuICAgIGNvbnN0IHNlZWQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IERFRkFVTFRfUEVSTElOX1NJWkUgKyAxOyBpKyspIHtcbiAgICAgICAgc2VlZC5wdXNoKE1hdGgucmFuZG9tKCkpO1xuICAgIH1cbiAgICByZXR1cm4gc2VlZDtcbn1cbmV4cG9ydHMuZ2VuZXJhdGVTZWVkID0gZ2VuZXJhdGVTZWVkO1xuZnVuY3Rpb24gZ2VuZXJhdGVOb2lzZShwYXJhbWV0ZXJzKSB7XG4gICAgbGV0IHsgeCwgeSB9ID0gcGFyYW1ldGVycztcbiAgICBjb25zdCB7IHNlZWQsIGZyZXF1ZW5jeSwgcmVkaXN0cmlidXRpb24sIG9jdGF2ZXMsIH0gPSBwYXJhbWV0ZXJzO1xuICAgIGNvbnN0IFBFUkxJTl9TSVpFID0gc2VlZC5sZW5ndGggLSAxO1xuICAgIHggKj0gZnJlcXVlbmN5O1xuICAgIHkgKj0gZnJlcXVlbmN5O1xuICAgIGxldCB4aSA9IE1hdGguZmxvb3IoeCk7XG4gICAgbGV0IHlpID0gTWF0aC5mbG9vcih5KTtcbiAgICBsZXQgeGYgPSB4IC0geGk7XG4gICAgbGV0IHlmID0geSAtIHlpO1xuICAgIGxldCByeGY7XG4gICAgbGV0IHJ5ZjtcbiAgICBsZXQgciA9IDA7XG4gICAgbGV0IGFtcGwgPSAwLjU7XG4gICAgbGV0IG4xO1xuICAgIGxldCBuMjtcbiAgICBsZXQgbjM7XG4gICAgZm9yIChsZXQgbyA9IDA7IG8gPCBvY3RhdmVzOyBvKyspIHtcbiAgICAgICAgbGV0IG9mID0geGkgKyAoeWkgPDwgUEVSTElOX1lXUkFQQik7XG4gICAgICAgIHJ4ZiA9IHNjYWxlZENvc2luZSh4Zik7XG4gICAgICAgIHJ5ZiA9IHNjYWxlZENvc2luZSh5Zik7XG4gICAgICAgIG4xID0gc2VlZFtvZiAmIFBFUkxJTl9TSVpFXTtcbiAgICAgICAgbjEgKz0gcnhmICogKHNlZWRbKG9mICsgMSkgJiBQRVJMSU5fU0laRV0gLSBuMSk7XG4gICAgICAgIG4yID0gc2VlZFsob2YgKyBQRVJMSU5fWVdSQVApICYgUEVSTElOX1NJWkVdO1xuICAgICAgICBuMiArPSByeGYgKiAoc2VlZFsob2YgKyBQRVJMSU5fWVdSQVAgKyAxKSAmIFBFUkxJTl9TSVpFXSAtIG4yKTtcbiAgICAgICAgbjEgKz0gcnlmICogKG4yIC0gbjEpO1xuICAgICAgICBvZiArPSBQRVJMSU5fWldSQVA7XG4gICAgICAgIG4yID0gc2VlZFtvZiAmIFBFUkxJTl9TSVpFXTtcbiAgICAgICAgbjIgKz0gcnhmICogKHNlZWRbKG9mICsgMSkgJiBQRVJMSU5fU0laRV0gLSBuMik7XG4gICAgICAgIG4zID0gc2VlZFsob2YgKyBQRVJMSU5fWVdSQVApICYgUEVSTElOX1NJWkVdO1xuICAgICAgICBuMyArPSByeGYgKiAoc2VlZFsob2YgKyBQRVJMSU5fWVdSQVAgKyAxKSAmIFBFUkxJTl9TSVpFXSAtIG4zKTtcbiAgICAgICAgbjIgKz0gcnlmICogKG4zIC0gbjIpO1xuICAgICAgICByICs9IG4xICogYW1wbDtcbiAgICAgICAgYW1wbCAqPSBQRVJMSU5fQU1QX0ZBTExPRkY7XG4gICAgICAgIHhpIDw8PSAxO1xuICAgICAgICB4ZiAqPSAyO1xuICAgICAgICBpZiAoeGYgPj0gMS4wKSB7XG4gICAgICAgICAgICB4aSsrO1xuICAgICAgICAgICAgeGYtLTtcbiAgICAgICAgfVxuICAgICAgICB5aSA8PD0gMTtcbiAgICAgICAgeWYgKj0gMjtcbiAgICAgICAgaWYgKHlmID49IDEuMCkge1xuICAgICAgICAgICAgeWkrKztcbiAgICAgICAgICAgIHlmLS07XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHIgPiAwLjUpIHtcbiAgICAgICAgciA9IE1hdGgucG93KHIsICgxLjUgLSByKSAvIFBFUkxJTl9BVkdfUE9XRVIpO1xuICAgIH1cbiAgICBlbHNlIGlmIChyIDwgMC41KSB7XG4gICAgICAgIHIgPSBNYXRoLnBvdyhyLCAoMS41IC0gcikgKiBQRVJMSU5fQVZHX1BPV0VSKTtcbiAgICB9XG4gICAgciA9IE1hdGgucG93KHIsIHJlZGlzdHJpYnV0aW9uKTtcbiAgICByZXR1cm4gcjtcbn1cbmV4cG9ydHMuZ2VuZXJhdGVOb2lzZSA9IGdlbmVyYXRlTm9pc2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuV29ybGRCaW9tZSA9IHZvaWQgMDtcbmNsYXNzIFdvcmxkQmlvbWUge1xuICAgIGNvbnN0cnVjdG9yKHBhcmFtcywgZGF0YSkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICB0aGlzLmxvd2VyQm91bmQgPSBNYXRoLm1heCgwLCAoX2EgPSBwYXJhbXMubG93ZXJCb3VuZCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogMCk7XG4gICAgICAgIHRoaXMudXBwZXJCb3VuZCA9IE1hdGgubWluKDEsIChfYiA9IHBhcmFtcy51cHBlckJvdW5kKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAxKTtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB9XG59XG5leHBvcnRzLldvcmxkQmlvbWUgPSBXb3JsZEJpb21lO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLldvcmxkR2VuZXJhdG9yID0gdm9pZCAwO1xuY29uc3QgcGVybGluXzEgPSByZXF1aXJlKFwiLi91dGlscy9wZXJsaW5cIik7XG5jb25zdCB3b3JsZF8xID0gcmVxdWlyZShcIi4vd29ybGRcIik7XG5jb25zdCB3b3JsZF9sYXllcl8xID0gcmVxdWlyZShcIi4vd29ybGQtbGF5ZXJcIik7XG5jbGFzcyBXb3JsZEdlbmVyYXRvciB7XG4gICAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgICAgIHRoaXMubGF5ZXJzID0gW107XG4gICAgICAgIHRoaXMud2lkdGggPSBwYXJhbXMud2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gcGFyYW1zLmhlaWdodDtcbiAgICB9XG4gICAgYWRkTGF5ZXIocGFyYW1zID0ge30pIHtcbiAgICAgICAgY29uc3QgbGF5ZXIgPSBuZXcgd29ybGRfbGF5ZXJfMS5Xb3JsZExheWVyKHBhcmFtcyk7XG4gICAgICAgIHRoaXMubGF5ZXJzLnB1c2gobGF5ZXIpO1xuICAgICAgICByZXR1cm4gbGF5ZXI7XG4gICAgfVxuICAgIGNsZWFyTGF5ZXJzKCkge1xuICAgICAgICB0aGlzLmxheWVycyA9IFtdO1xuICAgIH1cbiAgICBnZXRMYXllcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxheWVycztcbiAgICB9XG4gICAgZ2VuZXJhdGUoc2VlZCkge1xuICAgICAgICBjb25zdCBjdXJyZW50U2VlZCA9IHNlZWQgIT09IG51bGwgJiYgc2VlZCAhPT0gdm9pZCAwID8gc2VlZCA6ICgwLCBwZXJsaW5fMS5nZW5lcmF0ZVNlZWQpKCk7XG4gICAgICAgIGNvbnN0IG1hdHJpeCA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGxheWVyIG9mIHRoaXMubGF5ZXJzKSB7XG4gICAgICAgICAgICBjb25zdCBsYXllck1hdHJpeCA9IHRoaXMuZ2VuZXJhdGVMYXllcihsYXllciwgY3VycmVudFNlZWQpO1xuICAgICAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmhlaWdodDsgeSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFtYXRyaXhbeV0pIHtcbiAgICAgICAgICAgICAgICAgICAgbWF0cml4W3ldID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy53aWR0aDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXllck1hdHJpeFt5XVt4XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF0cml4W3ldW3hdID0gbGF5ZXJNYXRyaXhbeV1beF0uZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy53aWR0aDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1hdHJpeFt5XVt4XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKGBXb3JsZCBtYXRyaXggY29udGFpbnMgZW1wdHkgYmlvbWUgYXQgJHt4fSwke3l9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgd29ybGRfMS5Xb3JsZChtYXRyaXgsIGN1cnJlbnRTZWVkKTtcbiAgICB9XG4gICAgZ2VuZXJhdGVMYXllcihsYXllciwgc2VlZCkge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBsYXllci5nZXRHZW5lcmF0aW9uUGFyYW1zKCk7XG4gICAgICAgIGNvbnN0IG1hdHJpeCA9IFtdO1xuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgIG1hdHJpeFt5XSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLndpZHRoOyB4KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBoZWlnaHQgPSAoMCwgcGVybGluXzEuZ2VuZXJhdGVOb2lzZSkoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBwYXJhbXMpLCB7IHNlZWQsIHg6IHggLyB0aGlzLndpZHRoLCB5OiB5IC8gdGhpcy5oZWlnaHQgfSkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJpb21lID0gbGF5ZXIuZ2V0QmlvbWVCeUhlaWdodChoZWlnaHQpO1xuICAgICAgICAgICAgICAgIGlmIChiaW9tZSkge1xuICAgICAgICAgICAgICAgICAgICBtYXRyaXhbeV1beF0gPSBiaW9tZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hdHJpeDtcbiAgICB9XG59XG5leHBvcnRzLldvcmxkR2VuZXJhdG9yID0gV29ybGRHZW5lcmF0b3I7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuV29ybGRMYXllciA9IHZvaWQgMDtcbmNvbnN0IGNsYW1wXzEgPSByZXF1aXJlKFwiLi91dGlscy9jbGFtcFwiKTtcbmNvbnN0IHdvcmxkX2Jpb21lXzEgPSByZXF1aXJlKFwiLi93b3JsZC1iaW9tZVwiKTtcbmNsYXNzIFdvcmxkTGF5ZXIge1xuICAgIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgICAgIHRoaXMuYmlvbWVzID0gW107XG4gICAgICAgIHRoaXMuZnJlcXVlbmN5ID0gTWF0aC5yb3VuZCgoMCwgY2xhbXBfMS5jbGFtcCkocGFyYW1zID09PSBudWxsIHx8IHBhcmFtcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFyYW1zLmZyZXF1ZW5jeUNoYW5nZSwgMC4zKSAqIDMxICsgMSk7XG4gICAgICAgIHRoaXMub2N0YXZlcyA9IE1hdGgucm91bmQoKDEgLSAoMCwgY2xhbXBfMS5jbGFtcCkocGFyYW1zID09PSBudWxsIHx8IHBhcmFtcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFyYW1zLmJvcmRlclNtb290aG5lc3MsIDAuNSkpICogMTQgKyAxKTtcbiAgICAgICAgdGhpcy5yZWRpc3RyaWJ1dGlvbiA9IDIuMCAtICgwLCBjbGFtcF8xLmNsYW1wKShwYXJhbXMgPT09IG51bGwgfHwgcGFyYW1zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwYXJhbXMuaGVpZ2h0UmVkaXN0cmlidXRpb24sIDEuMCwgWzAuNSwgMS41XSk7XG4gICAgfVxuICAgIGFkZEJpb21lKHBhcmFtcywgZGF0YSkge1xuICAgICAgICBjb25zdCBiaW9tZSA9IG5ldyB3b3JsZF9iaW9tZV8xLldvcmxkQmlvbWUocGFyYW1zLCBkYXRhKTtcbiAgICAgICAgdGhpcy5iaW9tZXMucHVzaChiaW9tZSk7XG4gICAgICAgIHJldHVybiBiaW9tZTtcbiAgICB9XG4gICAgY2xlYXJCaW9tZXMoKSB7XG4gICAgICAgIHRoaXMuYmlvbWVzID0gW107XG4gICAgfVxuICAgIGdldEJpb21lcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmlvbWVzO1xuICAgIH1cbiAgICBnZXRCaW9tZUJ5SGVpZ2h0KGhlaWdodCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRCaW9tZXMoKS5maW5kKChiaW9tZSkgPT4gKGhlaWdodCA+PSBiaW9tZS5sb3dlckJvdW5kICYmIGhlaWdodCA8PSBiaW9tZS51cHBlckJvdW5kKSk7XG4gICAgfVxuICAgIGdldEdlbmVyYXRpb25QYXJhbXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmcmVxdWVuY3k6IHRoaXMuZnJlcXVlbmN5LFxuICAgICAgICAgICAgb2N0YXZlczogdGhpcy5vY3RhdmVzLFxuICAgICAgICAgICAgcmVkaXN0cmlidXRpb246IHRoaXMucmVkaXN0cmlidXRpb24sXG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0cy5Xb3JsZExheWVyID0gV29ybGRMYXllcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Xb3JsZCA9IHZvaWQgMDtcbmNsYXNzIFdvcmxkIHtcbiAgICBjb25zdHJ1Y3RvcihtYXRyaXgsIHNlZWQpIHtcbiAgICAgICAgdGhpcy5tYXRyaXggPSBbXTtcbiAgICAgICAgdGhpcy53aWR0aCA9IG1hdHJpeFswXS5sZW5ndGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gbWF0cml4Lmxlbmd0aDtcbiAgICAgICAgdGhpcy5tYXRyaXggPSBtYXRyaXg7XG4gICAgICAgIHRoaXMuc2VlZCA9IHNlZWQ7XG4gICAgfVxuICAgIGdldE1hdHJpeCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF0cml4O1xuICAgIH1cbiAgICBnZXRBdChwb3NpdGlvbikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHJldHVybiAoX2EgPSB0aGlzLm1hdHJpeFtwb3NpdGlvbi55XSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hW3Bvc2l0aW9uLnhdO1xuICAgIH1cbiAgICByZXBsYWNlQXQocG9zaXRpb24sIGRhdGEpIHtcbiAgICAgICAgaWYgKHBvc2l0aW9uLnkgPj0gdGhpcy5oZWlnaHQgfHwgcG9zaXRpb24ueCA+PSB0aGlzLndpZHRoKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignU3BlY2lmaWVkIHBvc2l0aW9uIGlzIG91dCBvZiB3b3JsZCBib3VuZHMnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1hdHJpeFtwb3NpdGlvbi55XVtwb3NpdGlvbi54XSA9IGRhdGE7XG4gICAgfVxuICAgIGdldFNlZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlZWQ7XG4gICAgfVxufVxuZXhwb3J0cy5Xb3JsZCA9IFdvcmxkO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9hLCBfYjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGluZGV4XzEgPSByZXF1aXJlKFwiLi4vLi4vc3JjL2luZGV4XCIpO1xuY29uc3QgcmVuZGVyXzEgPSByZXF1aXJlKFwiLi9yZW5kZXJcIik7XG5jb25zdCBiaW9tZXNfMSA9IHJlcXVpcmUoXCIuL2Jpb21lc1wiKTtcbmNvbnN0IGludGVyZmFjZV8xID0gcmVxdWlyZShcIi4vaW50ZXJmYWNlXCIpO1xubGV0IHNhdmVkU2VlZDtcbihfYSA9IGludGVyZmFjZV8xLnVpLmJ1dHRvbnMuZ2VuZXJhdGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZjtcbiAgICBjb25zdCBnZW5lcmF0b3IgPSBuZXcgaW5kZXhfMS5Xb3JsZEdlbmVyYXRvcih7XG4gICAgICAgIHdpZHRoOiBOdW1iZXIoKF9hID0gaW50ZXJmYWNlXzEudWkuaW5wdXRzLndvcmxkV2lkdGgpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS52YWx1ZSksXG4gICAgICAgIGhlaWdodDogTnVtYmVyKChfYiA9IGludGVyZmFjZV8xLnVpLmlucHV0cy53b3JsZEhlaWdodCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnZhbHVlKSxcbiAgICB9KTtcbiAgICBjb25zdCBsYXllciA9IGdlbmVyYXRvci5hZGRMYXllcih7XG4gICAgICAgIGZyZXF1ZW5jeUNoYW5nZTogTnVtYmVyKChfYyA9IGludGVyZmFjZV8xLnVpLmlucHV0cy5mcmVxdWVuY3lDaGFuZ2UpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy52YWx1ZSksXG4gICAgICAgIGJvcmRlclNtb290aG5lc3M6IE51bWJlcigoX2QgPSBpbnRlcmZhY2VfMS51aS5pbnB1dHMuYm9yZGVyU21vb3RobmVzcykgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLnZhbHVlKSxcbiAgICAgICAgaGVpZ2h0UmVkaXN0cmlidXRpb246IE51bWJlcigoX2UgPSBpbnRlcmZhY2VfMS51aS5pbnB1dHMuaGVpZ2h0UmVkaXN0cmlidXRpb24pID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS52YWx1ZSksXG4gICAgfSk7XG4gICAgZm9yIChjb25zdCB7IHBhcmFtcywgZGF0YSB9IG9mIGJpb21lc18xLkJJT01FUykge1xuICAgICAgICBsYXllci5hZGRCaW9tZShwYXJhbXMsIGRhdGEpO1xuICAgIH1cbiAgICBjb25zdCBzZWVkID0gKChfZiA9IGludGVyZmFjZV8xLnVpLmlucHV0cy5yZXNldFNlZWQpID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZi5jaGVja2VkKSA/IHVuZGVmaW5lZCA6IHNhdmVkU2VlZDtcbiAgICBjb25zdCB3b3JsZCA9IGdlbmVyYXRvci5nZW5lcmF0ZShzZWVkKTtcbiAgICBzYXZlZFNlZWQgPSB3b3JsZC5nZXRTZWVkKCk7XG4gICAgKDAsIHJlbmRlcl8xLnJlbmRlck9uQ2FudmFzKSh3b3JsZCk7XG59KTtcbihfYiA9IGludGVyZmFjZV8xLnVpLmJ1dHRvbnMuZ2VuZXJhdGUpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jbGljaygpO1xuIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiQklPTUVTIiwicGFyYW1zIiwibG93ZXJCb3VuZCIsInVwcGVyQm91bmQiLCJkYXRhIiwibmFtZSIsImNvbG9yIiwidWkiLCJzY3JlZW4iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaW5wdXRzIiwicmVzZXRTZWVkIiwicXVlcnlTZWxlY3RvciIsImZyZXF1ZW5jeUNoYW5nZSIsImJvcmRlclNtb290aG5lc3MiLCJoZWlnaHRSZWRpc3RyaWJ1dGlvbiIsIndvcmxkV2lkdGgiLCJ3b3JsZEhlaWdodCIsImJ1dHRvbnMiLCJnZW5lcmF0ZSIsInJlbmRlck9uQ2FudmFzIiwiaW50ZXJmYWNlXzEiLCJjdHgiLCJnZXRDb250ZXh0IiwidGlsZVNpemUiLCJ3b3JsZCIsIl9hIiwid2lkdGgiLCJoZWlnaHQiLCJ5IiwieCIsImJpb21lIiwiZ2V0QXQiLCJmaWxsU3R5bGUiLCJmaWxsUmVjdCIsIl9fY3JlYXRlQmluZGluZyIsInRoaXMiLCJjcmVhdGUiLCJvIiwibSIsImsiLCJrMiIsInVuZGVmaW5lZCIsImRlc2MiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJfX2VzTW9kdWxlIiwid3JpdGFibGUiLCJjb25maWd1cmFibGUiLCJlbnVtZXJhYmxlIiwiZ2V0IiwiX19leHBvcnRTdGFyIiwicCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImNsYW1wIiwiZGVmYXVsdFZhbHVlIiwibGltaXQiLCJNYXRoIiwibWF4IiwibWluIiwiZ2VuZXJhdGVOb2lzZSIsImdlbmVyYXRlU2VlZCIsIkRFRkFVTFRfUEVSTElOX1NJWkUiLCJQRVJMSU5fWVdSQVBCIiwiUEVSTElOX1lXUkFQIiwiUEVSTElOX1pXUkFQIiwiUEVSTElOX0FNUF9GQUxMT0ZGIiwiUEVSTElOX0FWR19QT1dFUiIsInNjYWxlZENvc2luZSIsImkiLCJjb3MiLCJQSSIsInNlZWQiLCJwdXNoIiwicmFuZG9tIiwicGFyYW1ldGVycyIsImZyZXF1ZW5jeSIsInJlZGlzdHJpYnV0aW9uIiwib2N0YXZlcyIsIlBFUkxJTl9TSVpFIiwibGVuZ3RoIiwicnhmIiwicnlmIiwibjEiLCJuMiIsIm4zIiwieGkiLCJmbG9vciIsInlpIiwieGYiLCJ5ZiIsInIiLCJhbXBsIiwib2YiLCJwb3ciLCJXb3JsZEJpb21lIiwiY29uc3RydWN0b3IiLCJfYiIsIldvcmxkR2VuZXJhdG9yIiwicGVybGluXzEiLCJ3b3JsZF8xIiwid29ybGRfbGF5ZXJfMSIsImxheWVycyIsImFkZExheWVyIiwibGF5ZXIiLCJXb3JsZExheWVyIiwiY2xlYXJMYXllcnMiLCJnZXRMYXllcnMiLCJjdXJyZW50U2VlZCIsIm1hdHJpeCIsImxheWVyTWF0cml4IiwiZ2VuZXJhdGVMYXllciIsIkVycm9yIiwiV29ybGQiLCJnZXRHZW5lcmF0aW9uUGFyYW1zIiwiYXNzaWduIiwiZ2V0QmlvbWVCeUhlaWdodCIsImNsYW1wXzEiLCJ3b3JsZF9iaW9tZV8xIiwiYmlvbWVzIiwicm91bmQiLCJhZGRCaW9tZSIsImNsZWFyQmlvbWVzIiwiZ2V0QmlvbWVzIiwiZmluZCIsImdldE1hdHJpeCIsInBvc2l0aW9uIiwicmVwbGFjZUF0IiwiZ2V0U2VlZCIsIl9fd2VicGFja19tb2R1bGVfY2FjaGVfXyIsIl9fd2VicGFja19yZXF1aXJlX18iLCJtb2R1bGVJZCIsImNhY2hlZE1vZHVsZSIsIm1vZHVsZSIsIl9fd2VicGFja19tb2R1bGVzX18iLCJpbmRleF8xIiwicmVuZGVyXzEiLCJiaW9tZXNfMSIsInNhdmVkU2VlZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJfYyIsIl9kIiwiX2UiLCJfZiIsImdlbmVyYXRvciIsIk51bWJlciIsImNoZWNrZWQiLCJjbGljayJdLCJzb3VyY2VSb290IjoiIn0=