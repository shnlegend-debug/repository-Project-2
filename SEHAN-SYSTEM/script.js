const canvas=document.getElementById("matrix");
if(canvas){
  const ctx=canvas.getContext("2d"); let w,h,cols,drops;
  const chars="01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&<>[]{}";
  function resize(){w=canvas.width=innerWidth;h=canvas.height=innerHeight;cols=Math.floor(w/14);drops=Array.from({length:cols},()=>Math.random()*-40)}
  function draw(){ctx.fillStyle="rgba(0,0,0,.07)";ctx.fillRect(0,0,w,h);ctx.font="14px monospace";ctx.fillStyle="#00f6ff";for(let i=0;i<drops.length;i++){ctx.fillText(chars[Math.floor(Math.random()*chars.length)],i*14,drops[i]*14);if(drops[i]*14>h&&Math.random()>.975)drops[i]=0;drops[i]++}}
  resize();addEventListener("resize",resize);setInterval(draw,45);
}
const clock=document.getElementById("clock");
function tick(){if(clock)clock.textContent=new Date().toLocaleTimeString("id-ID",{hour12:false})}
tick();setInterval(tick,1000);

const terminal=document.getElementById("terminalText");
const lines=["> Initializing system... ","> Loading profile... ","> Connection: Secure","> Status: Online","> Welcome, Sehan_"];
let li=0,ci=0;
function type(){if(!terminal||li>=lines.length)return;const s=lines[li];if(ci<s.length){terminal.textContent+=s[ci++];setTimeout(type,30)}else{terminal.innerHTML+="<br>";li++;ci=0;setTimeout(type,300)}} type();

document.querySelectorAll(".skill i,.status-row i").forEach(el=>{const width=el.style.width;el.style.width="0";requestAnimationFrame(()=>setTimeout(()=>el.style.width=width,120))});

console.log("%c SEHAN//SYSTEM ","color:#00f6ff;font-size:20px;font-weight:bold");
console.log("System initialized. Status: ONLINE");
