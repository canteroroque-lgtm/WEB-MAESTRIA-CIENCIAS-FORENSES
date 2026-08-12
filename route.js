// Ruta del Investigador — mapa decorativo de avance por fechas (MCF UBA)
(function(){
  const M = window.MCF || {};
  const { OBLIGATORIAS = [], TESIS = {}, ESPECIFICAS = [], PAQUETES = [] } = M;
  const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const P = iso => { const a=iso.split('-').map(Number); return new Date(a[0],a[1]-1,a[2]); };
  const TODAY = new Date(); TODAY.setHours(0,0,0,0);
  const mapaEl = document.getElementById('rutaMapa');
  const listaEl = document.getElementById('rutaLista');
  const toggleBtn = document.getElementById('rutaToggle');
  if(!mapaEl || !listaEl) return;

  // ── construir estaciones (obligatorias + paquetes requeridos + tesis), orden cronológico ──
  const req = PAQUETES.filter(p=>!p.segunda);
  const stations = [];
  OBLIGATORIAS.forEach(s=>stations.push({ label:'N°'+String(s.n).padStart(2,'0')+' · '+s.title, short:s.title, min:P(s.dates[0]), kind:'foot' }));
  req.forEach(b=>{ const subs=ESPECIFICAS.filter(s=>s.paq===b.id); stations.push({ label:'Paquete '+b.id, short:'Paquete '+b.id+' ('+subs.map(s=>s.title).join(' / ')+')', min:P(b.dates[0]), kind:'print' }); });
  if(TESIS.dates && TESIS.dates.length) stations.push({ label:TESIS.title, short:TESIS.title, min:P(TESIS.dates[0]), kind:'foot' });
  stations.sort((a,b)=>a.min-b.min);

  let curIdx = -1;
  stations.forEach((s,i)=>{ if(s.min<=TODAY) curIdx=i; });
  stations.forEach((s,i)=>{ s.status = i<curIdx ? 'done' : (i===curIdx ? 'now' : 'next'); });

  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function renderLista(){
    listaEl.innerHTML = stations.map(s=>{
      const tag = s.status==='done' ? '✓ Completada' : s.status==='now' ? '● Actual' : '○ Próxima';
      return '<div class="rl-item '+s.status+'"><span class="rl-status">'+tag+'</span><span class="rl-name">'+esc(s.short)+'</span></div>';
    }).join('');
  }

  // ── vista mapa: asfalto ancho con Sherlock (rostro grande) ──
  const DEFS = '<defs>'+
    '<symbol id="rn-foot" viewBox="0 0 20 24"><g fill="currentColor">'+
      '<ellipse cx="10" cy="17" rx="5.4" ry="7"/><ellipse cx="10" cy="6.5" rx="6" ry="5.3"/>'+
      '<circle cx="4.2" cy="-1" r="1.5"/><circle cx="8.6" cy="-2.5" r="1.6"/><circle cx="13" cy="-2" r="1.5"/><circle cx="16.6" cy="0.2" r="1.3"/>'+
    '</g></symbol>'+
    '<symbol id="rn-print" viewBox="0 0 22 22"><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">'+
      '<path d="M11 4c-5 0-8 3.8-8 8.3 0 3.4 1 6 2.3 8"/><path d="M11 7c-3.3 0-5.1 2.6-5.1 5.6 0 2.4.7 4.3 1.6 5.8"/><path d="M11 10c-1.6 0-2.5 1.3-2.5 3 0 1.4.4 2.4 1 3.4"/>'+
      '<path d="M11 4c5 0 8 3.8 8 8.3 0 3.4-1 6-2.3 8"/><path d="M11 7c3.3 0 5.1 2.6 5.1 5.6 0 2.4-.7 4.3-1.6 5.8"/><path d="M11 10c1.6 0 2.5 1.3 2.5 3 0 1.4-.4 2.4-1 3.4"/>'+
      '<circle cx="11" cy="9.6" r="1" fill="currentColor" stroke="none"/>'+
    '</g></symbol>'+
    '<symbol id="rn-sherlock" viewBox="-13 -22 26 40">'+
      '<ellipse cx="0" cy="17" rx="10" ry="3" fill="rgba(0,0,0,.28)"/>'+
      '<path d="M-8 8 Q-10 -2 -6 -6 L6 -6 Q10 -2 8 8 Q8 16 0 16 Q-8 16 -8 8Z" fill="#5b4636"/>'+
      '<path d="M-8 -3 L-11.5 3.5 L-7 2 Z" fill="#42311f"/><path d="M8 -3 L11.5 3.5 L7 2 Z" fill="#42311f"/>'+
      '<circle cx="0" cy="-11" r="7.3" fill="#f2c49b"/>'+
      '<path d="M-2.2 -8.2 Q0 -7 2.2 -8.2" stroke="#3a2a1f" stroke-width="1.1" fill="none" stroke-linecap="round"/>'+
      '<circle cx="-2.7" cy="-11.6" r=".9" fill="#2a1a10"/><circle cx="2.7" cy="-11.6" r=".9" fill="#2a1a10"/>'+
      '<path d="M-8.2 -14 Q0 -21.5 8.2 -14 Q9 -17.6 0 -18.6 Q-9 -17.6 -8.2 -14Z" fill="#c9a876"/>'+
      '<path d="M-8.6 -14.2 Q-11.5 -11.8 -9.6 -5.5 Q-9.2 -9 -7 -12.2Z" fill="#c9a876"/>'+
      '<path d="M8.6 -14.2 Q11.5 -11.8 9.6 -5.5 Q9.2 -9 7 -12.2Z" fill="#c9a876"/>'+
      '<path d="M4.5 -8.8 Q7.5 -7.8 8.5 -5.6" stroke="#2a1a10" stroke-width="1.2" fill="none" stroke-linecap="round"/>'+
      '<g transform="translate(9.5,3) rotate(15)"><circle r="4" fill="none" stroke="var(--cyan)" stroke-width="2"/><line x1="2.8" y1="2.8" x2="6.5" y2="6.5" stroke="var(--cyan)" stroke-width="2" stroke-linecap="round"/></g>'+
    '</symbol>'+
  '</defs>';

  function renderMapa(){
    const n = stations.length;
    const w = 1160, stepX = w/(n+1), midY = 90, amp = 34;
    const pts = stations.map((s,i)=>({ x: stepX*(i+1), y: midY + amp*Math.sin(i*0.9) }));
    const h = midY + amp + 60;
    function build(upTo){
      if(upTo<1) return '';
      let d = 'M '+pts[0].x+' '+pts[0].y;
      for(let i=0;i<upTo-1 && i<pts.length-1;i++){ const p0=pts[i], p1=pts[i+1]; const mx=(p0.x+p1.x)/2; d += ' C '+mx+' '+p0.y+', '+mx+' '+p1.y+', '+p1.x+' '+p1.y; }
      return d;
    }
    const pathAll = build(pts.length);
    const pathDone = curIdx>0 ? build(curIdx+1) : '';
    const charPt = pts[Math.max(curIdx,0)] || pts[0];

    let svg = '<svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="Recorrido cronológico de las materias">';
    svg += DEFS;
    svg += '<path class="ruta-road edge" d="'+pathAll+'"/>';
    svg += '<path class="ruta-road" d="'+pathAll+'"/>';
    if(pathDone) svg += '<path class="ruta-road done" d="'+pathDone+'"/>';
    svg += '<path class="ruta-centerline" d="'+pathAll+'"/>';
    pts.forEach((p,i)=>{
      const s = stations[i];
      const icon = s.kind==='foot' ? 'rn-foot' : 'rn-print';
      const size = s.kind==='foot' ? 15 : 17;
      svg += '<g class="ruta-node '+s.status+'" data-tip="'+esc(s.short)+'" transform="translate('+p.x+','+p.y+')">'+
        '<use href="#'+icon+'" class="rn-icon" x="-'+(size/2)+'" y="-'+(size/2)+'" width="'+size+'" height="'+size+'"/>'+
        '<text class="rn-label" y="'+(size/2+13)+'">'+(i+1)+'</text>'+
        (s.status==='now' ? '<foreignObject x="'+(size/2+8)+'" y="'+(-(size/2))+'" width="150" height="30" class="ruta-sign"><div>'+esc(s.short)+'</div></foreignObject>' : '')+
        '</g>';
    });
    svg += '<use class="ruta-char" href="#rn-sherlock" x="'+(charPt.x-13)+'" y="'+(charPt.y-16)+'" width="26" height="26"/>';
    svg += '</svg>';
    mapaEl.innerHTML = svg + '<div class="ruta-tip" id="rutaTip"></div>';

    if(reduced){ const ch=mapaEl.querySelector('.ruta-char'); if(ch) ch.style.animation='none'; } else { const ch=mapaEl.querySelector('.ruta-char'); if(ch) ch.style.animation='moveChar 20s linear infinite'; }

    const tip = document.getElementById('rutaTip');
    mapaEl.querySelectorAll('.ruta-node').forEach(node=>{
      node.addEventListener('mouseenter', ()=>{
        const box = mapaEl.getBoundingClientRect();
        const nb = node.getBoundingClientRect();
        tip.textContent = node.dataset.tip;
        tip.style.left = (nb.left - box.left + nb.width/2)+'px';
        tip.style.top = (nb.top - box.top - 10)+'px';
        tip.classList.add('show');
      });
      node.addEventListener('mouseleave', ()=>tip.classList.remove('show'));
    });
  }

  renderMapa();
  renderLista();

  const KEY='mcf.ruta.lista.v1';
  let showLista = reduced;
  try{ if(localStorage.getItem(KEY)==='1') showLista = true; }catch(e){}
  function apply(){
    mapaEl.hidden = showLista;
    listaEl.hidden = !showLista;
    if(toggleBtn){ toggleBtn.setAttribute('aria-pressed', showLista?'true':'false'); toggleBtn.textContent = showLista?'Ver mapa':'Ver como lista'; }
  }
  apply();
  const mq = window.matchMedia('(max-width:760px)');
  function syncMobile(){ if(mq.matches) listaEl.hidden = false; }
  syncMobile();
  mq.addEventListener ? mq.addEventListener('change', syncMobile) : mq.addListener(syncMobile);
  if(toggleBtn) toggleBtn.addEventListener('click', ()=>{
    showLista = !showLista;
    try{ localStorage.setItem(KEY, showLista?'1':'0'); }catch(e){}
    apply();
  });
})();
