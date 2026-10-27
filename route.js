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

  // la lupa avanza a una estación desde el día anterior a su primera clase (víspera)
  const EVE = new Date(TODAY); EVE.setDate(EVE.getDate()+1);
  let curIdx = -1;
  stations.forEach((s,i)=>{ if(s.min<=EVE) curIdx=i; });
  stations.forEach((s,i)=>{ s.status = i<curIdx ? 'done' : (i===curIdx ? 'now' : 'next'); });

  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const nDone = Math.max(curIdx,0), N = stations.length;
  const nextSt = stations[curIdx+1];
  const daysTo = nextSt ? Math.max(0, Math.round((nextSt.min-TODAY)/864e5)) : 0;
  function renderHud(){
    let hud = document.getElementById('rutaHud');
    if(!hud){ hud=document.createElement('div'); hud.id='rutaHud'; hud.className='ruta-hud'; mapaEl.parentNode.insertBefore(hud, mapaEl); }
    const pct = Math.round(nDone/N*100);
    hud.innerHTML =
      '<div class="hud-box"><span class="hud-k">Nivel</span><b class="hud-v">'+(curIdx+1)+'<small>/'+N+'</small></b></div>'+
      '<div class="hud-box hud-xp"><span class="hud-k">Progreso del caso</span><div class="hud-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+pct+'" aria-label="Progreso del recorrido"><i style="width:'+pct+'%"></i></div><span class="hud-s">'+nDone+' de '+N+' estaciones superadas · '+pct+'%</span></div>'+
      '<div class="hud-box hud-next"><span class="hud-k">Próximo checkpoint</span><b class="hud-n">'+(nextSt?esc(nextSt.short):'Meta alcanzada')+'</b>'+(nextSt?'<span class="hud-s">en '+daysTo+' día'+(daysTo===1?'':'s')+'</span>':'')+'</div>';
  }
  function renderLista(){
    listaEl.innerHTML = stations.map((s,i)=>{
      const tag = s.status==='done' ? '✓ Superada' : s.status==='now' ? '● En curso' : '○ Bloqueada';
      return '<div class="rl-item '+s.status+'"><span class="rl-lv">'+String(i+1).padStart(2,'0')+'</span><span class="rl-status">'+tag+'</span><span class="rl-name">'+esc(s.short)+'</span></div>';
    }).join('');
  }

  // ── vista mapa: asfalto 3D con relieve y figura sofisticada ──
  const DEFS = '<defs>'+
    '<pattern id="rgGrid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="rgba(35,240,255,.06)" stroke-width="1"/></pattern>'+
    '<radialGradient id="rgGround" cx=".5" cy=".55" r=".75"><stop offset="0" stop-color="#132a2a"/><stop offset=".6" stop-color="#0c1620"/><stop offset="1" stop-color="#070b12"/></radialGradient>'+
    '<radialGradient id="rgBeacon" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="rgba(35,240,255,.55)"/><stop offset="1" stop-color="rgba(35,240,255,0)"/></radialGradient>'+
    '<linearGradient id="rgPad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2c3a52"/><stop offset="1" stop-color="#0d121c"/></linearGradient>'+
    '<pattern id="rgChk" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#fff"/><rect width="3" height="3" fill="#111"/><rect x="3" y="3" width="3" height="3" fill="#111"/></pattern>'+
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
    // suela de calzado con dibujo de tracción (obligatorias)
    '<clipPath id="rnSoleClip"><path d="M10 1C15.2 1 17.6 5.2 17.6 10.2C17.6 15 15.6 17.8 14.6 20H5.4C4.4 17.8 2.4 15 2.4 10.2C2.4 5.2 4.8 1 10 1Z"/><path d="M5 23.2C5 21.9 6.3 21.6 10 21.6S15 21.9 15 23.2V27C15 29.8 13 31 10 31S5 29.8 5 27Z"/></clipPath>'+
    '<pattern id="rnTread" width="4" height="3.2" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)"><rect width="4" height="1.3" fill="rgba(0,0,0,.42)"/></pattern>'+
    '<symbol id="rn-foot" viewBox="0 0 20 32"><g transform="rotate(-10 10 16)">'+
      '<g clip-path="url(#rnSoleClip)"><rect width="20" height="32" fill="currentColor"/><rect width="20" height="32" fill="url(#rnTread)"/>'+
      '<ellipse cx="7" cy="8" rx="4" ry="6" fill="rgba(255,255,255,.22)"/><ellipse cx="8" cy="25" rx="3" ry="3.4" fill="rgba(255,255,255,.18)"/></g>'+
    '</g></symbol>'+
    // huella dactilar tipo verticilo (específicas)
    '<symbol id="rn-print" viewBox="-12 -14 24 28"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.15">'+
      [1.6,3.2,4.8,6.4,8,9.6,11].map((rx,i)=>'<ellipse rx="'+rx+'" ry="'+(rx*1.24).toFixed(2)+'" stroke-dasharray="'+(i%2? (6+i*2.2)+' 1.6' : (9+i*3)+' 2.2')+'" transform="rotate('+(i*23)+')"/>').join('')+
      '<path d="M-11 6 Q-6 12 0 12.6" stroke-width="1"/><circle r=".9" fill="currentColor" stroke="none"/>'+
    '</g></symbol>'+
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
    const w = 1200, stepX = w/(n+1), midY = 175, amp = 42;
    const pts = stations.map((s,i)=>({ x: stepX*(i+1), y: midY + amp*Math.sin(i*0.9) }));
    const h = midY + amp + 150;
    const samples = [];
    function build(upTo){
      if(upTo<1) return '';
      let d = 'M '+(pts[0].x-stepX*.6)+' '+pts[0].y+' L '+pts[0].x+' '+pts[0].y;
      for(let i=0;i<upTo-1 && i<pts.length-1;i++){
        const p0=pts[i], p1=pts[i+1], mx=(p0.x+p1.x)/2;
        d += ' C '+mx+' '+p0.y+', '+mx+' '+p1.y+', '+p1.x+' '+p1.y;
        for(let t=0;t<=1;t+=.1){ const u=1-t; samples.push({ x:u*u*u*p0.x+3*u*u*t*mx+3*u*t*t*mx+t*t*t*p1.x, y:u*u*u*p0.y+3*u*u*t*p0.y+3*u*t*t*p1.y+t*t*t*p1.y }); }
      }
      return d;
    }
    const last = pts[pts.length-1];
    const pathAll = build(pts.length) + ' L '+(last.x+stepX*.6)+' '+last.y;
    samples.push({x:0,y:pts[0].y},{x:w,y:last.y});
    const pathDone = curIdx>0 ? build(curIdx+1) : '';
    const charPt = pts[Math.max(curIdx,0)] || pts[0];
    const roadY = x => { let b=samples[0]; samples.forEach(s=>{ if(Math.abs(s.x-x)<Math.abs(b.x-x)) b=s; }); return b.y; };

    // texturas generadas de forma determinista
    let seed = 7; const rnd = ()=>{ seed=(seed*16807)%2147483647; return (seed-1)/2147483646; };
    let asph = ''; for(let k=0;k<70;k++) asph += '<circle cx="'+(rnd()*60).toFixed(1)+'" cy="'+(rnd()*60).toFixed(1)+'" r="'+(.3+rnd()*.7).toFixed(2)+'" fill="'+(rnd()>.5?'rgba(255,255,255,.07)':'rgba(0,0,0,.35)')+'"/>';
    let grass = ''; for(let k=0;k<26;k++){ const gx=rnd()*48, gy=rnd()*48; grass += '<path d="M'+gx.toFixed(1)+' '+gy.toFixed(1)+'l'+(rnd()*2-1).toFixed(1)+' -3" stroke="rgba(120,200,140,.10)" stroke-width=".8"/>'; }
    const TEX = '<defs>'+
      '<pattern id="rrAsph" width="60" height="60" patternUnits="userSpaceOnUse"><rect width="60" height="60" fill="#262b34"/>'+asph+'</pattern>'+
      '<pattern id="rrGrass" width="48" height="48" patternUnits="userSpaceOnUse">'+grass+'</pattern>'+
      '<radialGradient id="rrSky" cx=".5" cy=".42" r=".8"><stop offset="0" stop-color="#14302a"/><stop offset=".55" stop-color="#0b1a1c"/><stop offset="1" stop-color="#060b10"/></radialGradient>'+
      '<radialGradient id="rrVig" cx=".5" cy=".5" r=".72"><stop offset=".6" stop-color="rgba(0,0,0,0)"/><stop offset="1" stop-color="rgba(0,0,0,.6)"/></radialGradient>'+
      '<radialGradient id="rrTree" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#3f7a4c"/><stop offset=".6" stop-color="#1f4a2c"/><stop offset="1" stop-color="#0f2617"/></radialGradient>'+
      '<radialGradient id="rrRock" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#7b8494"/><stop offset="1" stop-color="#2b313b"/></radialGradient>'+
      '<radialGradient id="rrPadG" cx=".38" cy=".3" r=".8"><stop offset="0" stop-color="#3a475e"/><stop offset=".7" stop-color="#151b27"/><stop offset="1" stop-color="#0a0e15"/></radialGradient>'+
      '<filter id="rrBlur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="5"/></filter>'+
      '<filter id="rrSoft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2"/></filter>'+
    '</defs>';

    // escenografía: árboles, arbustos, rocas y faroles lejos de la calzada
    const signBox = curIdx>=0 ? { x:Math.min(Math.max(pts[curIdx].x-150,4),w-304), y:midY+amp+56, w:300, h:70 } : null;
    let props = '';
    const placed = [];
    for(let k=0;k<140 && placed.length<46;k++){
      const x = 14+rnd()*(w-28), y = 16+rnd()*(h-30);
      if(Math.abs(y-roadY(x))<84) continue;
      if(signBox && x>signBox.x-20 && x<signBox.x+signBox.w+20 && y>signBox.y-24 && y<signBox.y+signBox.h+20) continue;
      if(placed.some(p=>Math.hypot(p.x-x,p.y-y)<30)) continue;
      placed.push({x,y});
    }
    placed.sort((a,b)=>a.y-b.y).forEach(p=>{
      const t = rnd(), s = .7+rnd()*.6;
      if(t<.55){
        props += '<g transform="translate('+p.x.toFixed(1)+','+p.y.toFixed(1)+') scale('+s.toFixed(2)+')"><ellipse cx="6" cy="6" rx="14" ry="5" fill="rgba(0,0,0,.45)" filter="url(#rrSoft)"/><rect x="-1.6" y="-2" width="3.2" height="8" fill="#3b2a1c"/><circle cy="-8" r="11" fill="url(#rrTree)"/><circle cx="-5" cy="-3" r="7" fill="url(#rrTree)"/><circle cx="6" cy="-4" r="7.5" fill="url(#rrTree)"/><circle cx="-3" cy="-12" r="3.2" fill="rgba(170,255,190,.12)"/></g>';
      } else if(t<.8){
        props += '<g transform="translate('+p.x.toFixed(1)+','+p.y.toFixed(1)+') scale('+s.toFixed(2)+')"><ellipse cx="3" cy="3" rx="10" ry="3.5" fill="rgba(0,0,0,.4)" filter="url(#rrSoft)"/><circle cx="-4" r="5" fill="url(#rrTree)"/><circle cx="3" cy="-1" r="6" fill="url(#rrTree)"/></g>';
      } else {
        props += '<g transform="translate('+p.x.toFixed(1)+','+p.y.toFixed(1)+') scale('+s.toFixed(2)+')"><ellipse cx="2" cy="3" rx="8" ry="2.6" fill="rgba(0,0,0,.45)" filter="url(#rrSoft)"/><path d="M-7 2 Q-6 -5 0 -6 Q7 -5 7 2 Z" fill="url(#rrRock)"/></g>';
      }
    });
    // faroles a lo largo del borde
    let lamps = '';
    for(let x=stepX*.9; x<w-30; x+=stepX*1.6){
      const y = roadY(x)-30;
      lamps += '<g transform="translate('+x.toFixed(1)+','+y.toFixed(1)+')"><ellipse cx="0" cy="34" rx="26" ry="9" fill="rgba(255,220,140,.09)" filter="url(#rrSoft)"/><rect x="-1" y="-22" width="2" height="24" fill="#5b6577"/><rect x="-1" y="-23" width="9" height="2" rx="1" fill="#5b6577"/><circle cx="8" cy="-20.5" r="2.4" fill="#ffe7a3"/><circle cx="8" cy="-20.5" r="6" fill="rgba(255,230,160,.25)" filter="url(#rrSoft)"/></g>';
    }

    let svg = '<svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="Recorrido cronológico de las materias: nivel '+(curIdx+1)+' de '+n+'">';
    svg += DEFS + TEX;
    svg += '<rect width="'+w+'" height="'+h+'" fill="url(#rrSky)"/><rect width="'+w+'" height="'+h+'" fill="url(#rrGrass)"/>';
    svg += props;
    // calzada por capas: sombra, banquina, cordón rojo/blanco, asfalto, línea de borde, carril
    svg += '<g fill="none" stroke-linecap="butt" stroke-linejoin="round">'+
      '<path d="'+pathAll+'" stroke="rgba(0,0,0,.65)" stroke-width="58" transform="translate(0,10)" filter="url(#rrBlur)"/>'+
      '<path d="'+pathAll+'" stroke="#3a3328" stroke-width="54"/>'+
      '<path d="'+pathAll+'" stroke="#e8ecf2" stroke-width="44"/>'+
      '<path d="'+pathAll+'" stroke="#c4323c" stroke-width="44" stroke-dasharray="14 14"/>'+
      '<path d="'+pathAll+'" stroke="url(#rrAsph)" stroke-width="38"/>'+
      '<path d="'+pathAll+'" stroke="rgba(244,247,251,.82)" stroke-width="33"/>'+
      '<path d="'+pathAll+'" stroke="url(#rrAsph)" stroke-width="30"/>'+
      (pathDone?'<path d="'+pathDone+'" stroke="rgba(166,255,92,.13)" stroke-width="30"/><path d="'+pathDone+'" stroke="rgba(166,255,92,.55)" stroke-width="1.4" transform="translate(0,-13)"/><path d="'+pathDone+'" stroke="rgba(166,255,92,.55)" stroke-width="1.4" transform="translate(0,13)"/>':'')+
      '<path d="'+pathAll+'" stroke="rgba(255,255,255,.06)" stroke-width="8" transform="translate(0,-8)"/>'+
      '<path d="'+pathAll+'" stroke="#ffd23d" stroke-width="2.6" stroke-dasharray="16 14" stroke-linecap="round"/>'+
    '</g>';
    svg += lamps;
    // salida y meta: pórticos a cuadros
    const s0 = {x:pts[0].x-stepX*.6, y:pts[0].y}, s1 = {x:last.x+stepX*.6, y:last.y};
    const gate = (x,y,label)=>'<g class="ruta-flag"><rect x="'+(x-2)+'" y="'+(y-46)+'" width="4" height="70" fill="#8d9ab3"/><rect x="'+(x-2)+'" y="'+(y-46)+'" width="4" height="70" fill="url(#rgChk)" opacity=".0"/><rect x="'+(x-3)+'" y="'+(y-22)+'" width="6" height="44" fill="url(#rgChk)" opacity=".9"/><rect x="'+(x-30)+'" y="'+(y-62)+'" width="60" height="17" rx="3" fill="#0f1724" stroke="rgba(255,255,255,.3)"/><text x="'+x+'" y="'+(y-49.5)+'" class="ruta-ft" style="text-anchor:middle">'+label+'</text></g>';
    svg += gate(s0.x+10,s0.y,'INICIO') + gate(s1.x-10,s1.y,'META');
    pts.forEach((p,i)=>{
      const s = stations[i];
      const foot = s.kind==='foot';
      const iw = foot?14:17, ih = foot?22:20;
      const up = i%2===0, sy = up ? p.y-62 : p.y+40;
      svg += '<g class="ruta-node '+s.status+'" data-tip="'+esc((i+1)+'. '+s.short)+'" transform="translate('+p.x+','+p.y+')">'+
        (s.status==='now'?'<circle class="rn-beacon" r="34" fill="url(#rgBeacon)"/>':'')+
        '<ellipse cx="0" cy="6" rx="21" ry="8" fill="rgba(0,0,0,.6)" filter="url(#rrSoft)"/>'+
        '<circle r="17" fill="#0a0e15"/><circle r="16" fill="url(#rrPadG)"/>'+
        '<circle class="rn-rim" r="16"/><circle r="12.5" fill="none" stroke="currentColor" stroke-width=".6" opacity=".35"/>'+
        '<path d="M-10 -9 A14 14 0 0 1 9 -11" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="1.6" stroke-linecap="round"/>'+
        '<use href="#'+(foot?'rn-foot':'rn-print')+'" class="rn-icon" x="'+(-iw/2)+'" y="'+(-ih/2)+'" width="'+iw+'" height="'+ih+'"/>'+
        (s.status==='done'?'<g class="rn-ok" transform="translate(12,-12)"><circle r="6.4"/><path d="M-2.6 0 L-.6 2.2 L2.8 -2"/></g>':'')+
        (s.status==='next'?'<g class="rn-lock" transform="translate(12,-12)"><circle r="6"/><rect x="-2.4" y="-.6" width="4.8" height="3.6" rx=".6"/><path d="M-1.4 -.6 V-2 a1.4 1.4 0 0 1 2.8 0 V-.6"/></g>':'')+
        '<line class="rn-post" x1="0" y1="'+(up?-17:17)+'" x2="0" y2="'+(up?sy-p.y+16:sy-p.y)+'"/>'+
        '<g class="rn-plate" transform="translate(0,'+(sy-p.y)+')"><rect x="-13" y="0" width="26" height="16" rx="3"/><rect x="-11" y="2" width="22" height="12" rx="2" class="rn-plate-in"/><text y="11.5">'+(i+1)+'</text></g>'+
        '</g>';
    });
    svg += '<g class="ruta-char" aria-hidden="true"><ellipse cx="'+charPt.x+'" cy="'+(charPt.y+2)+'" rx="24" ry="8" class="ruta-char-glow"/><use href="#rn-lupa" x="'+(charPt.x-34)+'" y="'+(charPt.y-98)+'" width="68" height="86"/></g>';
    if(curIdx>=0){
      const cs = stations[curIdx], cp = pts[curIdx];
      const txt = cs.short.length>64 ? cs.short.slice(0,62)+'…' : cs.short;
      svg += '<g class="ruta-signg"><line x1="'+cp.x+'" y1="'+(cp.y+18)+'" x2="'+cp.x+'" y2="'+signBox.y+'" class="ruta-post"/>'+
        '<foreignObject x="'+signBox.x+'" y="'+signBox.y+'" width="'+signBox.w+'" height="'+signBox.h+'" class="ruta-sign"><div><small>NIVEL '+(curIdx+1)+' · '+(cs.min>TODAY?'COMIENZA MAÑANA':'EN CURSO')+'</small><span class="rs-t">'+esc(txt)+'</span></div></foreignObject></g>';
    }
    svg += '<rect width="'+w+'" height="'+h+'" fill="url(#rrVig)" pointer-events="none"/>';
    svg += '</svg>';
    mapaEl.innerHTML = '<div class="ruta-scroll" tabindex="0" aria-label="Mapa de la ruta; deslizá horizontalmente en pantallas chicas">'+svg+'</div><div class="ruta-tip" id="rutaTip"></div>';

    if(reduced){ const ch=mapaEl.querySelector('.ruta-char'); if(ch) ch.style.animation='none'; }
    // en pantallas chicas, centrar el scroll en la estación actual
    const sc = mapaEl.querySelector('.ruta-scroll');
    requestAnimationFrame(()=>{ if(sc && sc.scrollWidth>sc.clientWidth){ sc.scrollLeft = Math.max(0, charPt.x/w*sc.scrollWidth - sc.clientWidth/2); } });

    const tip = document.getElementById('rutaTip');
    const show = node=>{
      const box = mapaEl.getBoundingClientRect(), nb = node.getBoundingClientRect();
      tip.textContent = node.dataset.tip;
      tip.style.left = Math.min(Math.max(nb.left - box.left + nb.width/2, 110), box.width-110)+'px';
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
    if(sc) sc.addEventListener('scroll', hide, {passive:true});
  }

  renderHud();
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
  if(toggleBtn) toggleBtn.addEventListener('click', ()=>{
    showLista = !showLista;
    try{ localStorage.setItem(KEY, showLista?'1':'0'); }catch(e){}
    apply();
    if(!showLista) renderMapa();
  });
})();
