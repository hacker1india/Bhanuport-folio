// Simple tilt effect for cards
document.querySelectorAll('.card').forEach(card=>{
    card.addEventListener('mousemove', e=>{
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width/2;
      const cy = rect.height/2;
      const dx = (x - cx) / cx;
      const dy = (y - cy) / cy;
      card.style.transform = `translateY(-6px) rotateX(${dy*6}deg) rotateY(${dx*6}deg)`;
    });
  
    card.addEventListener('mouseleave', ()=>{
      card.style.transform='translateY(0) rotateX(0) rotateY(0)';
    });
  
    // click open modal
    card.querySelectorAll('.view-btn').forEach(b=>{
      b.addEventListener('click', ()=>{
        const p = JSON.parse(card.getAttribute('data-project'));
        openModal(p.title, p.desc, p.img, p.tech);
      });
    });
  });
  
  // certifications click to open modal
  document.querySelectorAll('.cert').forEach(c=>{
    c.addEventListener('click', ()=>{
      const title = c.dataset.title || 'Certificate';
      const img = c.dataset.img || c.querySelector('img').src;
      openModal(title, 'Click to download/verify on LinkedIn or issuing platform', img);
    });
  });
  
  function openModal(title, desc, img, tech){
    document.getElementById('modalTitle').textContent = title + (tech ? ' — ' + tech : '');
    document.getElementById('modalDesc').textContent = desc || '';
    document.getElementById('modalImage').innerHTML = '<img src="'+img+'" alt="'+title+'" style="width:100%;max-height:420px;object-fit:contain;border-radius:8px">';
    document.getElementById('modal').style.display = 'flex';
  }
  
  document.getElementById('modalClose').addEventListener('click', ()=>{
    document.getElementById('modal').style.display='none';
  });
  
  document.getElementById('modal').addEventListener('click', (e)=>{
    if(e.target.id==='modal') document.getElementById('modal').style.display='none';
  });
  
  // Typing effect for hero (simple)
  (function typing(){
    const el = document.querySelector('.hero-left h1');
    const words = ['ML Engineer', 'Data Scientist', 'Software Developer', 'Data Analyst'];
    let i = 0, j = 0, back = false;
  
    setInterval(()=>{
      const w = words[i];
      el.querySelectorAll('span.typing').forEach(n=>n.remove());
      let typed = w.slice(0, j);
  
      const span = document.createElement('span');
      span.className='typing';
      span.textContent = typed;
  
      el.innerHTML = "Hi — I'm <span style='color:white'>Pasumarthi</span>. I build ";
      el.appendChild(span);
  
      if(!back) j++;
      else j--;
  
      if(j > w.length) back = true;
      if(j === 0 && back){
        back = false;
        i = (i+1) % words.length;
      }
    }, 150);
  })();
  
  // accessibility: keyboard open certs
  document.querySelectorAll('.cert').forEach(c=>{
    c.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' ') c.click();
    });
  });
  
  // Optional: intercept contact form to open mailto
  document.getElementById('contactForm').addEventListener('submit', (e)=>{
    e.preventDefault();
  });
  
  // fallback demo "send" button already handled in HTML
  