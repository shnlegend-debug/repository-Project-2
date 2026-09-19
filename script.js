/* ===================== MATRIX RAIN ===================== */
const matrixCanvas = document.getElementById("matrix");
if (matrixCanvas) {
  const ctx = matrixCanvas.getContext("2d");
  let w, h, cols, drops;
  const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&<>[]{}";
  
  function resizeMatrix() {
    w = matrixCanvas.width = innerWidth;
    h = matrixCanvas.height = innerHeight;
    cols = Math.floor(w / 16);
    drops = Array.from({ length: cols }, () => Math.random() * -40);
  }

  function drawMatrix() {
    ctx.fillStyle = "rgba(1, 5, 8, 0.08)";
    ctx.fillRect(0, 0, w, h);
    ctx.font = "15px monospace";
    
    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * 16;
      const y = drops[i] * 16;
      
      // Head of the drop is brighter
      if (Math.random() > 0.96) {
        ctx.fillStyle = "#ffffff";
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#00f6ff";
      } else {
        ctx.fillStyle = "#00f6ff";
        ctx.shadowBlur = 0;
      }
      
      ctx.fillText(char, x, y);
      
      if (y > h && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  resizeMatrix();
  addEventListener("resize", resizeMatrix);
  setInterval(drawMatrix, 40);
}

/* ===================== FLOATING PARTICLES ===================== */
const particleCanvas = document.getElementById("particles");
if (particleCanvas) {
  const pCtx = particleCanvas.getContext("2d");
  let pw, ph;
  const particles = [];
  const PARTICLE_COUNT = 55;

  function resizeParticles() {
    pw = particleCanvas.width = innerWidth;
    ph = particleCanvas.height = innerHeight;
  }

  class Particle {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * pw;
      this.y = initial ? Math.random() * ph : ph + 10;
      this.size = Math.random() * 2 + 0.5;
      this.speedY = Math.random() * 0.6 + 0.15;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.15;
      this.color = Math.random() > 0.7 ? "#00ffd5" : "#00f6ff";
    }
    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      if (this.y < -10 || this.x < -20 || this.x > pw + 20) {
        this.reset();
      }
    }
    draw() {
      pCtx.beginPath();
      pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      pCtx.fillStyle = this.color;
      pCtx.globalAlpha = this.opacity;
      pCtx.shadowBlur = 8;
      pCtx.shadowColor = this.color;
      pCtx.fill();
      pCtx.globalAlpha = 1;
      pCtx.shadowBlur = 0;
    }
  }

  function initParticles() {
    particles.length = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
  }

  function animateParticles() {
    pCtx.clearRect(0, 0, pw, ph);
    
    // Draw connecting lines between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          pCtx.beginPath();
          pCtx.moveTo(particles[i].x, particles[i].y);
          pCtx.lineTo(particles[j].x, particles[j].y);
          pCtx.strokeStyle = `rgba(0, 246, 255, ${0.12 * (1 - dist / 120)})`;
          pCtx.lineWidth = 0.6;
          pCtx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animateParticles);
  }

  resizeParticles();
  initParticles();
  addEventListener("resize", () => {
    resizeParticles();
    initParticles();
  });
  animateParticles();
}

/* ===================== RAIN EFFECT ===================== */
const rainCanvas = document.getElementById("rain");
if (rainCanvas) {
  const rCtx = rainCanvas.getContext("2d");
  let rw, rh;
  const drops = [];
  const DROP_COUNT = 180;

  function resizeRain() {
    rw = rainCanvas.width = innerWidth;
    rh = rainCanvas.height = innerHeight;
  }

  class RainDrop {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * rw;
      this.y = initial ? Math.random() * rh : -20 - Math.random() * 80;
      this.length = Math.random() * 18 + 10;
      this.speed = Math.random() * 8 + 6;
      this.opacity = Math.random() * 0.35 + 0.15;
      this.thickness = Math.random() * 1.2 + 0.4;
      // slight wind drift
      this.drift = (Math.random() - 0.5) * 1.5;
    }
    update() {
      this.y += this.speed;
      this.x += this.drift;
      if (this.y > rh + 20) {
        this.reset();
      }
    }
    draw() {
      rCtx.beginPath();
      rCtx.strokeStyle = `rgba(180, 230, 255, ${this.opacity})`;
      rCtx.lineWidth = this.thickness;
      rCtx.lineCap = "round";
      rCtx.moveTo(this.x, this.y);
      rCtx.lineTo(this.x + this.drift * 2, this.y + this.length);
      rCtx.stroke();

      // subtle cyan glow on some drops
      if (Math.random() > 0.97) {
        rCtx.beginPath();
        rCtx.strokeStyle = `rgba(0, 246, 255, ${this.opacity * 0.8})`;
        rCtx.lineWidth = this.thickness + 0.5;
        rCtx.shadowBlur = 6;
        rCtx.shadowColor = "#00f6ff";
        rCtx.moveTo(this.x, this.y);
        rCtx.lineTo(this.x + this.drift * 2, this.y + this.length);
        rCtx.stroke();
        rCtx.shadowBlur = 0;
      }
    }
  }

  function initRain() {
    drops.length = 0;
    for (let i = 0; i < DROP_COUNT; i++) {
      drops.push(new RainDrop());
    }
  }

  function animateRain() {
    rCtx.clearRect(0, 0, rw, rh);
    drops.forEach(d => {
      d.update();
      d.draw();
    });
    requestAnimationFrame(animateRain);
  }

  resizeRain();
  initRain();
  addEventListener("resize", () => {
    resizeRain();
    initRain();
  });
  animateRain();
}

/* ===================== CUSTOM CURSOR ===================== */
const glow = document.getElementById("cursor-glow");
const trail = document.getElementById("cursor-trail");
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

if (glow && trail && window.matchMedia("(pointer: fine)").matches) {
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    glow.style.left = mouseX + "px";
    glow.style.top = mouseY + "px";
  });

  function updateTrail() {
    trailX += (mouseX - trailX) * 0.18;
    trailY += (mouseY - trailY) * 0.18;
    trail.style.left = trailX + "px";
    trail.style.top = trailY + "px";
    requestAnimationFrame(updateTrail);
  }
  updateTrail();

  // Expand cursor on interactive elements
  document.querySelectorAll("a, button, .btn, .project, .card").forEach(el => {
    el.addEventListener("mouseenter", () => {
      glow.style.width = "48px";
      glow.style.height = "48px";
      glow.style.borderColor = "#00ffd5";
    });
    el.addEventListener("mouseleave", () => {
      glow.style.width = "28px";
      glow.style.height = "28px";
      glow.style.borderColor = "#00f6ff";
    });
  });
}

/* ===================== CLOCK ===================== */
const clock = document.getElementById("clock");
function tick() {
  if (clock) {
    clock.textContent = new Date().toLocaleTimeString("id-ID", { hour12: false });
  }
}
tick();
setInterval(tick, 1000);

/* ===================== TERMINAL TYPEWRITER ===================== */
const terminal = document.getElementById("terminalText");
const lines = [
  "> Initializing system... ",
  "> Loading modules... ",
  "> Connection: Secure",
  "> Firewall: Active",
  "> Status: Online",
  "> Welcome, Sehan_"
];
let li = 0, ci = 0;

function type() {
  if (!terminal || li >= lines.length) return;
  const s = lines[li];
  if (ci < s.length) {
    terminal.textContent += s[ci++];
    setTimeout(type, 28 + Math.random() * 20);
  } else {
    terminal.innerHTML += "<br>";
    li++;
    ci = 0;
    setTimeout(type, 280);
  }
}
type();

/* ===================== SKILL BARS ANIMATION ===================== */
document.querySelectorAll(".skill i, .status-row i").forEach(el => {
  const width = el.style.width;
  el.style.width = "0";
  requestAnimationFrame(() => {
    setTimeout(() => {
      el.style.width = width;
    }, 150);
  });
});

/* ===================== RANDOM STATUS FLUCTUATION ===================== */
function fluctuateStatus() {
  document.querySelectorAll(".status-row").forEach(row => {
    const bar = row.querySelector("i");
    const label = row.querySelector("b");
    if (!bar || !label) return;

    const current = parseInt(label.textContent) || 30;
    const delta = Math.floor(Math.random() * 7) - 3;
    let next = Math.max(8, Math.min(92, current + delta));
    
    bar.style.width = next + "%";
    label.textContent = next + "%";
  });
}
setInterval(fluctuateStatus, 3200);

/* ===================== CONSOLE EASTER EGG ===================== */
console.log("%c SEHAN//SYSTEM ", "color:#00f6ff;font-size:22px;font-weight:bold;text-shadow:0 0 12px #00f6ff");
console.log("%c System initialized. Status: ONLINE ", "color:#00ffd5");
console.log("%c > Access granted. Keep building. ", "color:#73a9ac");
