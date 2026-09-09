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

  // ── vista mapa: asfalto 3D con relieve y figura sofisticada ──
  const DEFS = '<defs>'+
    // asfalto: gradiente vertical para simular volumen
    '<linearGradient id="rgAsphalt" x1="0" y1="0" x2="0" y2="1">'+
      '<stop offset="0" stop-color="#2b3446"/><stop offset=".42" stop-color="#1d2432"/><stop offset="1" stop-color="#10141d"/>'+
    '</linearGradient>'+
    '<linearGradient id="rgAsphaltDone" x1="0" y1="0" x2="0" y2="1">'+
      '<stop offset="0" stop-color="#3a5a3f"/><stop offset=".45" stop-color="#26402d"/><stop offset="1" stop-color="#16241a"/>'+
    '</linearGradient>'+
    '<linearGradient id="rgKerb" x1="0" y1="0" x2="0" y2="1">'+
      '<stop offset="0" stop-color="rgba(244,247,251,.30)"/><stop offset="1" stop-color="rgba(244,247,251,.04)"/>'+
    '</linearGradient>'+
    // nodos: disco de vidrio
    '<radialGradient id="rgDisc" cx=".34" cy=".28" r=".85">'+
      '<stop offset="0" stop-color="rgba(255,255,255,.22)"/><stop offset=".5" stop-color="rgba(255,255,255,.05)"/><stop offset="1" stop-color="rgba(6,8,14,.55)"/>'+
    '</radialGradient>'+
    '<filter id="rgDrop" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="2.2" stdDeviation="2.4" flood-color="#000" flood-opacity=".6"/></filter>'+
    // figura: paleta de sombreado
    '<linearGradient id="rgCoat" x1=".2" y1="0" x2=".9" y2="1">'+
      '<stop offset="0" stop-color="#7d6149"/><stop offset=".45" stop-color="#5b4634"/><stop offset="1" stop-color="#33261a"/>'+
    '</linearGradient>'+
    '<linearGradient id="rgHat" x1=".15" y1="0" x2=".9" y2="1">'+
      '<stop offset="0" stop-color="#e0c294"/><stop offset=".5" stop-color="#bd9d6d"/><stop offset="1" stop-color="#7d6440"/>'+
    '</linearGradient>'+
    '<radialGradient id="rgSkin" cx=".36" cy=".3" r=".8">'+
      '<stop offset="0" stop-color="#ffe0c2"/><stop offset=".6" stop-color="#f0bf94"/><stop offset="1" stop-color="#c28b62"/>'+
    '</radialGradient>'+
    '<radialGradient id="rgGlass" cx=".34" cy=".28" r=".8">'+
      '<stop offset="0" stop-color="rgba(215,251,255,.9)"/><stop offset=".55" stop-color="rgba(40,204,255,.35)"/><stop offset="1" stop-color="rgba(23,58,140,.5)"/>'+
    '</radialGradient>'+
    '<linearGradient id="rgBrass" x1="0" y1="0" x2="1" y2="1">'+
      '<stop offset="0" stop-color="#ffe9a8"/><stop offset=".5" stop-color="#c9a24a"/><stop offset="1" stop-color="#7a5c1e"/>'+
    '</linearGradient>'+
    // huella de pisada con volumen
    '<symbol id="rn-foot" viewBox="0 0 20 24"><g>'+
      '<ellipse cx="10" cy="17.6" rx="5.4" ry="7" fill="currentColor" opacity=".92"/>'+
      '<ellipse cx="10" cy="7" rx="6" ry="5.3" fill="currentColor" opacity=".92"/>'+
      '<ellipse cx="8.4" cy="15.4" rx="3.2" ry="4" fill="rgba(255,255,255,.22)"/>'+
      '<ellipse cx="8.6" cy="6" rx="3.4" ry="2.8" fill="rgba(255,255,255,.22)"/>'+
    '</g></symbol>'+
    // huella dactilar con doble trazo (relieve)
    '<symbol id="rn-print" viewBox="0 0 22 22">'+
      '<g fill="none" stroke="rgba(0,0,0,.5)" stroke-width="2.1" stroke-linecap="round" transform="translate(.4,.6)">'+
        '<path d="M11 4c-5 0-8 3.8-8 8.3 0 3.4 1 6 2.3 8"/><path d="M11 7c-3.3 0-5.1 2.6-5.1 5.6 0 2.4.7 4.3 1.6 5.8"/><path d="M11 10c-1.6 0-2.5 1.3-2.5 3 0 1.4.4 2.4 1 3.4"/>'+
        '<path d="M11 4c5 0 8 3.8 8 8.3 0 3.4-1 6-2.3 8"/><path d="M11 7c3.3 0 5.1 2.6 5.1 5.6 0 2.4-.7 4.3-1.6 5.8"/><path d="M11 10c1.6 0 2.5 1.3 2.5 3 0 1.4-.4 2.4-1 3.4"/>'+
      '</g>'+
      '<g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">'+
        '<path d="M11 4c-5 0-8 3.8-8 8.3 0 3.4 1 6 2.3 8"/><path d="M11 7c-3.3 0-5.1 2.6-5.1 5.6 0 2.4.7 4.3 1.6 5.8"/><path d="M11 10c-1.6 0-2.5 1.3-2.5 3 0 1.4.4 2.4 1 3.4"/>'+
        '<path d="M11 4c5 0 8 3.8 8 8.3 0 3.4-1 6-2.3 8"/><path d="M11 7c3.3 0 5.1 2.6 5.1 5.6 0 2.4-.7 4.3-1.6 5.8"/><path d="M11 10c1.6 0 2.5 1.3 2.5 3 0 1.4-.4 2.4-1 3.4"/>'+
        '<circle cx="11" cy="9.6" r="1" fill="currentColor" stroke="none"/>'+
      '</g>'+
    '</symbol>'+
    // figura del investigador — busto tridimensional
    '<symbol id="rn-sherlock" viewBox="-16 -26 32 44">'+
      '<ellipse cx="0" cy="16.4" rx="11" ry="2.8" fill="#000" opacity=".34"/>'+
      // hombros / capa con volumen
      '<path d="M-9.6 9 Q-11.6 -1.4 -6.6 -5.6 L6.6 -5.6 Q11.6 -1.4 9.6 9 Q9.6 15.6 0 15.6 Q-9.6 15.6 -9.6 9Z" fill="url(#rgCoat)"/>'+
      '<path d="M-9.6 -2.2 L-13.4 4.4 L-8.2 2.6 Z" fill="#3b2c1e"/><path d="M9.6 -2.2 L13.4 4.4 L8.2 2.6 Z" fill="#3b2c1e"/>'+
      '<path d="M-6.6 -5.6 Q-8.6 4 -6 14.4" stroke="rgba(255,255,255,.14)" stroke-width="1.2" fill="none"/>'+
      '<path d="M6.6 -5.6 Q8.8 4 6.2 14.4" stroke="rgba(0,0,0,.32)" stroke-width="1.4" fill="none"/>'+
      // cuello
      '<path d="M-3.4 -6.6 L3.4 -6.6 L2.6 -3.4 L-2.6 -3.4Z" fill="#c98f64"/>'+
      // rostro
      '<circle cx="0" cy="-11.4" r="7.6" fill="url(#rgSkin)"/>'+
      '<path d="M-7.4 -10.4 Q-6 -4.8 0 -3.9 Q6 -4.8 7.4 -10.4 Q4 -6.4 0 -6 Q-4 -6.4 -7.4 -10.4Z" fill="rgba(120,72,40,.22)"/>'+
      // ojos y boca
      '<ellipse cx="-2.9" cy="-12" rx="1.05" ry="1.2" fill="#25170e"/><ellipse cx="2.9" cy="-12" rx="1.05" ry="1.2" fill="#25170e"/>'+
      '<circle cx="-2.55" cy="-12.4" r=".34" fill="#fff" opacity=".85"/><circle cx="3.25" cy="-12.4" r=".34" fill="#fff" opacity=".85"/>'+
      '<path d="M-4.4 -14.2 Q-2.9 -15 -1.5 -14.3" stroke="#3a2a1f" stroke-width=".9" fill="none" stroke-linecap="round"/>'+
      '<path d="M1.5 -14.3 Q2.9 -15 4.4 -14.2" stroke="#3a2a1f" stroke-width=".9" fill="none" stroke-linecap="round"/>'+
      '<path d="M-2.4 -8.4 Q0 -7.1 2.4 -8.4" stroke="#7d4a2c" stroke-width="1.05" fill="none" stroke-linecap="round"/>'+
      // deerstalker con volumen
      '<path d="M-8.6 -14.6 Q0 -22.6 8.6 -14.6 Q9.6 -18.6 0 -19.8 Q-9.6 -18.6 -8.6 -14.6Z" fill="url(#rgHat)"/>'+
      '<path d="M-8.6 -14.6 Q0 -17.4 8.6 -14.6 Q0 -13.2 -8.6 -14.6Z" fill="rgba(0,0,0,.26)"/>'+
      '<path d="M-4.4 -20.5 Q0 -22.4 4.4 -20.5 Q0 -20 -4.4 -20.5Z" fill="rgba(255,255,255,.24)"/>'+
      '<path d="M-9 -14.8 Q-12.4 -12 -10.2 -5.4 Q-9.6 -9.2 -7.2 -12.8Z" fill="url(#rgHat)"/>'+
      '<path d="M9 -14.8 Q12.4 -12 10.2 -5.4 Q9.6 -9.2 7.2 -12.8Z" fill="url(#rgHat)"/>'+
      '<path d="M9 -14.8 Q11.4 -12.6 10.6 -8 Q9.8 -10.8 7.8 -13Z" fill="rgba(0,0,0,.24)"/>'+
      // pipa
      '<path d="M4.8 -8.6 Q7.8 -7.6 8.9 -5.2" stroke="#2f1f14" stroke-width="1.3" fill="none" stroke-linecap="round"/>'+
      '<ellipse cx="9.6" cy="-4.4" rx="1.7" ry="1.35" fill="#442d1c"/><ellipse cx="9.6" cy="-4.9" rx="1.25" ry=".7" fill="#1b110a"/>'+
      // lupa de latón con vidrio
      '<g transform="translate(-11,4.4) rotate(-18)">'+
        '<line x1="-1.4" y1="6.4" x2="-3.6" y2="10.4" stroke="url(#rgBrass)" stroke-width="2.6" stroke-linecap="round"/>'+
        '<circle r="4.6" fill="url(#rgGlass)"/>'+
        '<circle r="4.6" fill="none" stroke="url(#rgBrass)" stroke-width="1.9"/>'+
        '<path d="M-2.6 -2.4 Q-.2 -3.9 2 -2.6" stroke="rgba(255,255,255,.75)" stroke-width="1" fill="none" stroke-linecap="round"/>'+
      '</g>'+
    '</symbol>'+
  '</defs>';

  function renderMapa(){
    const n = stations.length;
    const w = 1160, stepX = w/(n+1), midY = 128, amp = 34;
    const pts = stations.map((s,i)=>({ x: stepX*(i+1), y: midY + amp*Math.sin(i*0.9) }));
    const h = midY + amp + 92;
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
    // sombra proyectada del asfalto (da la sensación de elevación)
    svg += '<path class="ruta-shadow" d="'+pathAll+'" transform="translate(0,7)"/>';
    svg += '<path class="ruta-road kerb" d="'+pathAll+'"/>';
    svg += '<path class="ruta-road base" d="'+pathAll+'"/>';
    if(pathDone) svg += '<path class="ruta-road done" d="'+pathDone+'"/>';
    svg += '<path class="ruta-road sheen" d="'+pathAll+'" transform="translate(0,-4.6)"/>';
    svg += '<path class="ruta-centerline" d="'+pathAll+'"/>';
    pts.forEach((p,i)=>{
      const s = stations[i];
      const icon = s.kind==='foot' ? 'rn-foot' : 'rn-print';
      const size = s.kind==='foot' ? 16 : 18;
      svg += '<g class="ruta-node '+s.status+'" data-tip="'+esc(s.short)+'" transform="translate('+p.x+','+p.y+')">'+
        '<circle class="rn-disc" r="'+(size/2+5.5)+'"/>'+
        '<circle class="rn-rim" r="'+(size/2+5.5)+'"/>'+
        '<use href="#'+icon+'" class="rn-icon" x="-'+(size/2)+'" y="-'+(size/2)+'" width="'+size+'" height="'+size+'"/>'+
        '<text class="rn-label" y="'+(size/2+18)+'">'+(i+1)+'</text>'+
        '</g>';
    });
    svg += '<use class="ruta-char" href="#rn-sherlock" x="'+(charPt.x-32)+'" y="'+(charPt.y-84)+'" width="64" height="88"/>';
    // cartel de la materia actual: en una banda libre bajo la carretera
    if(curIdx>=0){
      const cs = stations[curIdx], cp = pts[curIdx];
      const txt = cs.short.length>34 ? cs.short.slice(0,32)+'…' : cs.short;
      const sw = 176, sy = midY + amp + 44, sx = Math.min(Math.max(cp.x - sw/2, 4), w - sw - 4);
      svg += '<g class="ruta-signg"><line x1="'+cp.x+'" y1="'+(cp.y+16)+'" x2="'+cp.x+'" y2="'+sy+'" class="ruta-post"/>'+
        '<foreignObject x="'+sx+'" y="'+sy+'" width="'+sw+'" height="32" class="ruta-sign"><div>'+esc(txt)+'</div></foreignObject></g>';
    }
    svg += '</svg>';
    mapaEl.innerHTML = svg + '<div class="ruta-tip" id="rutaTip"></div>';

    if(reduced){ const ch=mapaEl.querySelector('.ruta-char'); if(ch) ch.style.animation='none'; }

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
