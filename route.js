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
    // lupa 3D realista: aro de latón, vidrio con refracción y mango de madera torneada
    '<linearGradient id="lpRim" x1="0" y1="0" x2="1" y2="1">'+
      '<stop offset="0" stop-color="#fff4c9"/><stop offset=".22" stop-color="#e6c166"/><stop offset=".5" stop-color="#9c7424"/><stop offset=".78" stop-color="#d9b04f"/><stop offset="1" stop-color="#5e4212"/>'+
    '</linearGradient>'+
    '<linearGradient id="lpRimIn" x1="1" y1="1" x2="0" y2="0">'+
      '<stop offset="0" stop-color="#fff0b8"/><stop offset=".5" stop-color="#8a6420"/><stop offset="1" stop-color="#3f2c0b"/>'+
    '</linearGradient>'+
    '<radialGradient id="lpLens" cx=".38" cy=".32" r=".78">'+
      '<stop offset="0" stop-color="rgba(236,252,255,.72)"/><stop offset=".35" stop-color="rgba(150,220,245,.34)"/><stop offset=".78" stop-color="rgba(40,110,160,.30)"/><stop offset="1" stop-color="rgba(10,30,60,.55)"/>'+
    '</radialGradient>'+
    '<linearGradient id="lpWood" x1="0" y1="0" x2="1" y2="0">'+
      '<stop offset="0" stop-color="#2a1509"/><stop offset=".3" stop-color="#7a4323"/><stop offset=".48" stop-color="#b06a3a"/><stop offset=".7" stop-color="#6b3a1d"/><stop offset="1" stop-color="#231107"/>'+
    '</linearGradient>'+
    '<linearGradient id="lpFerr" x1="0" y1="0" x2="1" y2="0">'+
      '<stop offset="0" stop-color="#5e4212"/><stop offset=".45" stop-color="#f3d78a"/><stop offset="1" stop-color="#6d4c14"/>'+
    '</linearGradient>'+
    '<filter id="lpBlur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.2"/></filter>'+
    '<symbol id="rn-lupa" viewBox="-30 -30 60 76">'+
      // sombra proyectada en el asfalto
      '<ellipse cx="4" cy="41" rx="17" ry="3.6" fill="#000" opacity=".5" filter="url(#lpBlur)"/>'+
      '<g transform="rotate(-28)">'+
        // mango
        '<rect x="-4.6" y="21" width="9.2" height="23" rx="4.4" fill="url(#lpWood)"/>'+
        '<rect x="-4.6" y="27" width="9.2" height="1.4" fill="rgba(0,0,0,.35)"/><rect x="-4.6" y="36" width="9.2" height="1.4" fill="rgba(0,0,0,.35)"/>'+
        '<rect x="-2.6" y="22.5" width="1.6" height="20" rx=".8" fill="rgba(255,220,180,.28)"/>'+
        // virola
        '<rect x="-5.4" y="16.4" width="10.8" height="6" rx="1.6" fill="url(#lpFerr)"/>'+
        '<rect x="-5.4" y="18.6" width="10.8" height="1" fill="rgba(0,0,0,.3)"/>'+
        '<rect x="-2.2" y="12.6" width="4.4" height="5" fill="url(#lpFerr)"/>'+
        // aro (grosor exterior + bisel interior)
        '<circle r="15.8" fill="url(#lpRim)"/>'+
        '<circle r="13" fill="url(#lpRimIn)"/>'+
        // vidrio
        '<circle r="12" fill="url(#lpLens)"/>'+
        '<circle r="12" fill="none" stroke="rgba(255,255,255,.35)" stroke-width=".6"/>'+
        // aumento: una huella vista a través del vidrio
        '<g fill="none" stroke="rgba(255,255,255,.28)" stroke-width="1" stroke-linecap="round">'+
          '<path d="M-6 5 Q-7 -4 0 -6 Q7 -4 6 5"/><path d="M-3.4 5 Q-4 -1.6 0 -3 Q4 -1.6 3.4 5"/><path d="M-1 4.6 Q-1 1 0 .2 Q1 1 1 4.6"/>'+
        '</g>'+
        // reflejos especulares
        '<path d="M-8.6 -3.6 Q-7.6 -9.2 -2.4 -10.2" stroke="rgba(255,255,255,.92)" stroke-width="2.2" fill="none" stroke-linecap="round"/>'+
        '<circle cx="-4.6" cy="-8.6" r="1.1" fill="#fff"/>'+
        '<path d="M6.4 7.6 Q8.6 5 9.2 1.6" stroke="rgba(255,255,255,.35)" stroke-width="1.2" fill="none" stroke-linecap="round"/>'+
        '<path d="M-13.6 -6 Q-11 -13 -4 -14.8" stroke="rgba(255,250,220,.85)" stroke-width="1.1" fill="none" stroke-linecap="round"/>'+
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
    svg += '<g class="ruta-char" aria-hidden="true"><use href="#rn-lupa" x="'+(charPt.x-30)+'" y="'+(charPt.y-86)+'" width="60" height="76"/></g>';
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
    const show = node=>{
      const box = mapaEl.getBoundingClientRect(), nb = node.getBoundingClientRect();
      tip.textContent = node.dataset.tip;
      tip.style.left = (nb.left - box.left + nb.width/2)+'px';
      tip.style.top = (nb.top - box.top - 10)+'px';
      tip.classList.add('show');
    };
    const hide = ()=>tip.classList.remove('show');
    mapaEl.querySelectorAll('.ruta-node').forEach(node=>{
      node.setAttribute('tabindex','0');
      node.setAttribute('role','img');
      node.setAttribute('aria-label', node.dataset.tip);
      node.addEventListener('pointerenter', ()=>show(node));
      node.addEventListener('pointerleave', hide);
      node.addEventListener('focus', ()=>show(node));
      node.addEventListener('blur', hide);
      node.addEventListener('click', ()=>show(node));
    });
    mapaEl.addEventListener('pointerleave', hide);
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
  function syncMobile(){ if(mq.matches) listaEl.hidden = false; else apply(); }
  syncMobile();
  mq.addEventListener ? mq.addEventListener('change', syncMobile) : mq.addListener(syncMobile);
  if(toggleBtn) toggleBtn.addEventListener('click', ()=>{
    showLista = !showLista;
    try{ localStorage.setItem(KEY, showLista?'1':'0'); }catch(e){}
    apply();
  });
})();
