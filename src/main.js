/* ==========================================================================
   GAUTHAM BALASUBRAMANIAN - PORTFOLIO INTERACTIVITY (Vanilla JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNeuralCanvas();
  initTimezoneClocks();
  initPipelineExplorer();
  initSkillsFilter();
  initResumeModal();
  initCopyActions();
  initContactForm();
  initMobileNav();
  initScrollSpy();
});

/* ==========================================================================
   1. Interactive Neural Network / Multimodal Embedding Canvas
   ========================================================================== */
function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = window.innerWidth < 768 ? 32 : 65;
  const maxDistance = 140;
  let mouse = { x: null, y: null, radius: 150 };

  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.75;
      this.vy = (Math.random() - 0.5) * 0.75;
      this.radius = Math.random() * 2 + 1.2;
      this.color = Math.random() > 0.4 ? '#00f0ff' : '#8b5cf6';
      this.alpha = Math.random() * 0.5 + 0.3;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse repulsion / reaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 3;
          this.y -= (dy / dist) * force * 3;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting neural lines
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const opacity = (1 - dist / maxDistance) * 0.28;
          ctx.strokeStyle = '#00f0ff';
          ctx.globalAlpha = opacity;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }

    // Update and draw particles
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. Live Synchronized Regional Clocks (Canada, Singapore & India)
   ========================================================================== */
function initTimezoneClocks() {
  const clockCa = document.getElementById('clock-canada');
  const clockSg = document.getElementById('clock-singapore');
  const clockIn = document.getElementById('clock-india');
  const clockCaZone = document.getElementById('clock-canada-zone');
  if (!clockCa && !clockSg && !clockIn) return;

  function updateClocks() {
    const now = new Date();

    if (clockCa) {
      const caOptions = {
        timeZone: 'America/Toronto',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      clockCa.textContent = new Intl.DateTimeFormat('en-GB', caOptions).format(now);
    }

    if (clockCaZone) {
      try {
        const parts = new Intl.DateTimeFormat('en-US', {
          timeZone: 'America/Toronto',
          timeZoneName: 'short'
        }).formatToParts(now);
        const tzPart = parts.find(p => p.type === 'timeZoneName');
        const tzName = tzPart ? tzPart.value : 'EDT';
        const isDst = tzName === 'EDT';
        clockCaZone.textContent = `${tzName} (UTC ${isDst ? '-04:00' : '-05:00'})`;
      } catch {
        clockCaZone.textContent = 'ET (UTC -04:00)';
      }
    }

    if (clockSg) {
      const sgOptions = {
        timeZone: 'Asia/Singapore',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      clockSg.textContent = new Intl.DateTimeFormat('en-GB', sgOptions).format(now);
    }

    if (clockIn) {
      const inOptions = {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      clockIn.textContent = new Intl.DateTimeFormat('en-GB', inOptions).format(now);
    }
  }

  updateClocks();
  setInterval(updateClocks, 1000);
}

/* ==========================================================================
   3. Interactive Architecture Pipeline Explorer (Staples Platform)
   ========================================================================== */
function initPipelineExplorer() {
  const nodes = document.querySelectorAll('.pipeline-node');
  const tagEl = document.getElementById('detail-stage-tag');
  const titleEl = document.getElementById('detail-stage-title');
  const descEl = document.getElementById('detail-stage-desc');
  const statsEl = document.getElementById('detail-stage-stats');

  if (!nodes.length || !tagEl || !titleEl || !descEl || !statsEl) return;

  const stageData = {
    ingest: {
      tag: 'Stage 01: Ingestion & Taxonomy Normalization',
      title: 'Distributed Catalog Ingestion on Azure Databricks',
      desc: 'Ingests millions of unstructured catalog listings from external marketplaces and enterprise suppliers. Performs automated text classification and taxonomy alignment, boosting product onboarding velocity by up to 40%.',
      chips: ['Azure Databricks', 'Delta Lake', 'Speed: +40% Onboarding', 'Auto Taxonomy']
    },
    hybrid: {
      tag: 'Stage 02: Candidate Generation & High-Recall Retrieval',
      title: 'Hybrid Lexical BM25 & Semantic Dense Filter',
      desc: 'Blends inverted BM25 keyword matching for exact MPNs (Manufacturer Part Numbers) and SKU specs with ANN vector search to surface high-recall candidate sets (<15ms latency) from millions of items.',
      chips: ['Hybrid Search', 'BM25 + Dense Vectors', 'Sub-15ms Candidate Gen', 'High Recall']
    },
    ensemble: {
      tag: 'Stage 03: Multimodal Embedding Ensemble',
      title: 'Fused Vision-Language Representations',
      desc: 'Extracts and harmonizes embeddings from multiple deep models: CLIP for product imagery, MPNET for nuanced technical specifications, and MARQO-B for e-commerce domain representation.',
      chips: ['CLIP Vision', 'MPNET Text', 'MARQO-B Embeddings', 'Multimodal Cosine']
    },
    rerank: {
      tag: 'Stage 04: Domain-Adapted LLM Re-Ranking',
      title: 'Fine-Tuned QWEN-3 Cross-Attention Reranker',
      desc: 'Evaluates top candidate matches using an in-house fine-tuned QWEN-3 LLM. Resolves subtle discrepancy traps (dimensions, compatibility, brand equivalence, pack sizes) with deep cross-attention.',
      chips: ['Fine-Tuned QWEN-3', 'Cross-Attention Reranker', 'Sub-Second Scoring', 'Zero False-Positives']
    },
    delivery: {
      tag: 'Stage 05: Assortment Intelligence & Business Delivery',
      title: 'Automated Tender Response & RPV Lift Engine',
      desc: 'Replaced legacy manual cross-referencing, cutting bid turnaround time by 0.6 days, delivering $3M in EBITDA, and driving Own Brand growth with projected +10% Revenue Per Visitor (RPV).',
      chips: ['$10M Revenue Impact', '$3M Direct EBITDA', '+10% RPV Merchandising', '-0.6 Days Bid SLA']
    }
  };

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      const stageKey = node.getAttribute('data-stage');
      const data = stageData[stageKey];
      if (!data) return;

      tagEl.textContent = data.tag;
      titleEl.textContent = data.title;
      descEl.textContent = data.desc;

      statsEl.innerHTML = '';
      data.chips.forEach(chip => {
        const span = document.createElement('span');
        span.className = 'stat-chip';
        span.textContent = chip;
        statsEl.appendChild(span);
      });
    });
  });
}



/* ==========================================================================
   6. Skills Category Filter
   ========================================================================== */
function initSkillsFilter() {
  const tabs = document.querySelectorAll('.filter-tab-btn');
  const items = document.querySelectorAll('.skill-item');

  if (!tabs.length || !items.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const cat = tab.getAttribute('data-category');

      items.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (cat === 'all' || itemCat === cat) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   7. Resume PDF Modal Preview
   ========================================================================== */
function initResumeModal() {
  const modal = document.getElementById('resume-modal');
  const openBtns = [
    document.getElementById('btn-open-resume'),
    document.getElementById('hero-resume-btn'),
    document.getElementById('btn-quick-preview-cv')
  ].filter(Boolean);
  const closeBtn = document.getElementById('btn-close-modal');

  if (!modal) return;

  function openModal() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => btn.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   8. One-Click Copy Actions & Toast Notifications
   ========================================================================== */
function initCopyActions() {
  const copyBtns = document.querySelectorAll('.btn-copy-val');
  const toastContainer = document.getElementById('toast-container');

  function showToast(message) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-copy');
      if (!val) return;

      navigator.clipboard.writeText(val).then(() => {
        showToast(`Copied to clipboard: ${val}`);
      }).catch(() => {
        showToast(`Selected: ${val}`);
      });
    });
  });
}

/* ==========================================================================
   9. Contact Form Simulation & Feedback
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback-msg');
  const submitBtn = document.getElementById('btn-submit-message');

  if (!form || !feedback || !submitBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const topic = document.getElementById('form-topic').value;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Dispatching...</span>`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
        <span>Message Dispatched</span>
      `;

      feedback.className = 'form-feedback success';
      feedback.innerHTML = `Thank you, <strong>${name}</strong>! Your message regarding <em>${topic}</em> has been prepared. A direct notification has been dispatched to <strong>connect.gautham@live.com</strong>.`;

      form.reset();

      setTimeout(() => {
        submitBtn.innerHTML = `
          <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          <span>Dispatch Message</span>
        `;
      }, 4000);
    }, 800);
  });
}

/* ==========================================================================
   10. Mobile Menu Drawer Navigation
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  const links = document.querySelectorAll('.mobile-link');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    } else {
      drawer.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
    }
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   11. Scroll Spy & Active Nav Link Highlighting
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  if (!sections.length || !navLinks.length) return;

  function onScroll() {
    const scrollPos = window.scrollY + 160;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

import { inject } from "@vercel/analytics"

inject()