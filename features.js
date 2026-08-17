// Dashboard · vista semanal · modo compacto · progreso (MCF UBA)
(function(){
  // hélice de ADN 3D decorativa
  const helix = document.querySelector('.dna3d .helix');
  if(helix && !matchMedia('(prefers-reduced-motion:reduce)').matches){
    for(let i=0;i<20;i++){
      const r=document.createElement('div');
      r.className='rung';
      r.style.top=(i*21)+'px';
      r.style.transform='rotateY('+(i*32)+'deg)';
      r.style.opacity=String(0.35+0.5*Math.abs(Math.cos(i*32*Math.PI/180)));
      helix.appendChild(r);
    }
  }
})();
(function(){
  const M = window.MCF || {};
  const { DIAS, PAQUETES = [], OBLIGATORIAS = [], TESIS = {}, ESPECIFICAS = [] } = M;
  const DRIVE = window.MCF_DRIVE || {};
  const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const MESAB = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  const P = iso => { const a=iso.split('-').map(Number); return new Date(a[0],a[1]-1,a[2]); };
  const fmt = d => d.getDate()+' '+MESAB[d.getMonth()]+' '+d.getFullYear();
  const TODAY = new Date(); TODAY.setHours(0,0,0,0);
  const PAQ = id => PAQUETES.find(p=>p.id===id);

  // ───────── progreso ─────────
  const KEY='mcf.progress.v1';
  const ESTADOS={pendiente:'Pendiente',cursada:'Cursada',aprobada:'Aprobada'};
  function load(){ try{ return JSON.parse(localStorage.getItem(KEY))||{}; }catch(e){ return {}; } }
  function save(o){ try{ localStorage.setItem(KEY,JSON.stringify(o)); }catch(e){} }
  let prog = load();
  function estado(t){ return prog[t]||'pendiente'; }
  function setEstado(t,v){ if(v==='pendiente') delete prog[t]; else prog[t]=v; save(prog); refresh(); }

  // materias que cuentan para el avance: 13 obligatorias + 1 electiva por paquete + tesis
  const PAQUETES_REQUERIDOS = PAQUETES.filter(paquete=>!paquete.segunda);
  const TOTAL = OBLIGATORIAS.length + PAQUETES_REQUERIDOS.length + 1;
  function done(){
    const okOblig = OBLIGATORIAS.filter(s=>estado(s.title)==='aprobada').length;
    const paqOk = PAQUETES_REQUERIDOS.filter(b=>ESPECIFICAS.some(s=>s.paq===b.id&&estado(s.title)==='aprobada')).length;
    const tesisOk = estado(TESIS.title)==='aprobada' ? 1 : 0;
    return okOblig+paqOk+tesisOk;
  }

  // ───────── próximos hitos ─────────
  function eventos(){
    const ev=[];
    OBLIGATORIAS.forEach(s=>s.dates.forEach(d=>ev.push({d:P(d),t:s.title,kind:'oblig',color:'#23f0ff',subj:s})));
    (TESIS.dates||[]).forEach(d=>ev.push({d:P(d),t:TESIS.title,kind:'tesis',color:'#9b6bff',subj:TESIS}));
    PAQUETES.forEach(b=>{
      const subs=ESPECIFICAS.filter(s=>s.paq===b.id||s.paq2===b.id);
      b.dates.forEach(d=>ev.push({d:P(d),t:'Paquete '+b.id,kind:'paq',color:b.color,paq:b,subs}));
    });
    return ev.sort((a,b)=>a.d-b.d);
  }
  const EV = eventos();
  function proxCursada(){ return EV.find(e=>e.d>=TODAY); }
  function proxExamen(){
    const all=[...OBLIGATORIAS,...ESPECIFICAS].filter(s=>s.examen).map(s=>({d:P(s.examen),s}));
    all.sort((a,b)=>a.d-b.d);
    return all.find(x=>x.d>=TODAY);
  }
  const diasHasta = d => Math.round((d-TODAY)/86400000);
  const materialesTotal = Object.values(DRIVE).reduce((n,v)=>n+((v.files||[]).length),0);

  // ───────── dashboard ─────────
  const dashHost=document.getElementById('dashBody');
  function renderDash(){
    if(!dashHost) return;
    const cursadas = Object.values(prog).filter(v=>v==='cursada').length;
    const pc = done(), pct = Math.round(pc/TOTAL*100);
    const pcur = proxCursada(), pex = proxExamen();
    dashHost.innerHTML =
      '<div class="dash-grid" aria-live="polite">'+
        '<div class="dash-card hero-progress">'+
          '<span class="dl">Avance del plan</span>'+
          '<div class="prog-top"><b>'+pc+'<i>/'+TOTAL+'</i></b><span class="prog-pct">'+pct+'%</span></div>'+
          '<div class="prog-bar"><span style="width:'+pct+'%"></span></div>'+
          '<p class="dash-note">'+pc+' materias aprobadas de '+TOTAL+' del plan · '+cursadas+' cursadas sin aprobar todavía</p>'+
        '</div>'+
        '<div class="dash-card">'+
          '<span class="dl">Próxima cursada</span>'+
          (pcur
            ? '<b class="dv">'+esc(pcur.t)+'</b><p class="dash-note">'+fmt(pcur.d)+' · '+(diasHasta(pcur.d)===0?'hoy':'en '+diasHasta(pcur.d)+' días')+'</p>'
            : '<b class="dv">—</b><p class="dash-note">Sin fechas futuras en el cronograma</p>')+
        '</div>'+
        '<div class="dash-card">'+
          '<span class="dl">Próximo examen</span>'+
          (pex
            ? '<b class="dv exam">'+esc(pex.s.title)+'</b><p class="dash-note">'+fmt(pex.d)+' · en '+diasHasta(pex.d)+' días</p>'
            : '<b class="dv">—</b><p class="dash-note">Sin exámenes futuros</p>')+
        '</div>'+
        '<div class="dash-card">'+
          '<span class="dl">Materiales</span>'+
          '<b class="dv">'+materialesTotal+'</b>'+
          '<p class="dash-note">documentos vinculados en Drive</p>'+
        '</div>'+
      '</div>';
  }

  // ───────── badges de estado en tarjetas ─────────
  function decorate(){
    document.querySelectorAll('.scard[data-subj]').forEach(el=>{
      const st=estado(el.dataset.subj);
      let b=el.querySelector('.st-badge');
      if(st==='pendiente'){ if(b) b.remove(); el.classList.remove('is-cursada','is-aprobada'); return; }
      if(!b){ b=document.createElement('span'); b.className='st-badge'; el.appendChild(b); }
      b.textContent = st==='aprobada'?'✓ Aprobada':'● Cursada';
      b.dataset.st = st;
      el.classList.toggle('is-aprobada',st==='aprobada');
      el.classList.toggle('is-cursada',st==='cursada');
    });
  }
  function refresh(){ renderDash(); decorate(); renderWeeks(); injectModalProgress(true); }

  const gridObs=new MutationObserver(()=>decorate());
  ['gridOblig','gridEsp'].forEach(id=>{ const n=document.getElementById(id); if(n) gridObs.observe(n,{childList:true,subtree:true}); });

  // ───────── control de progreso en el modal ─────────
  function injectModalProgress(onlyUpdate){
    const titleEl=document.getElementById('mTitle');
    const docEl=document.getElementById('mDoc');
    if(!titleEl||!docEl) return;
    const t=titleEl.textContent.trim();
    if(!t) return;
    let box=document.getElementById('mProg');
    if(!box){
      if(onlyUpdate) return;
      box=document.createElement('div'); box.id='mProg'; box.className='mprog';
      docEl.insertAdjacentElement('afterend',box);
    }
    box.dataset.t=t;
    box.innerHTML='<div class="m-label">Mi progreso</div><div class="mprog-row" role="group" aria-label="Estado de la materia">'+
      Object.keys(ESTADOS).map(k=>'<button type="button" class="mprog-btn'+(estado(t)===k?' on':'')+'" data-st="'+k+'">'+ESTADOS[k]+'</button>').join('')+
      '</div><p class="mprog-note">Se guarda en este dispositivo. Podés exportarlo o restablecerlo desde el panel inicial.</p>';
    box.querySelectorAll('.mprog-btn').forEach(btn=>btn.addEventListener('click',()=>{
      setEstado(box.dataset.t,btn.dataset.st);
      injectModalProgress();
    }));
  }
  const modalNode=document.getElementById('modal');
  if(modalNode) new MutationObserver(()=>injectModalProgress()).observe(modalNode,{childList:true,subtree:true});

  // ───────── vista semanal ─────────
  function weekKey(d){ const x=new Date(d); const dow=(x.getDay()+6)%7; x.setDate(x.getDate()-dow); return x; }
  const weekHost=document.getElementById('calWeekly');
  function renderWeeks(){
    if(!weekHost) return;
    const map=new Map();
    EV.forEach(e=>{
      const wk=weekKey(e.d), k=wk.toISOString().slice(0,10);
      if(!map.has(k)) map.set(k,{start:wk,items:[]});
      const w=map.get(k);
      const label = e.kind==='paq' ? 'Paquete '+e.paq.id : e.t;
      let it=w.items.find(i=>i.label===label);
      if(!it){ it={label,kind:e.kind,color:e.color,days:[],ev:e}; w.items.push(it); }
      it.days.push(e.d);
    });
    const weeks=[...map.values()].sort((a,b)=>a.start-b.start);
    const nextIdx=weeks.findIndex(w=>{ const end=new Date(w.start); end.setDate(end.getDate()+6); return end>=TODAY; });
    weekHost.innerHTML = weeks.map((w,i)=>{
      const end=new Date(w.start); end.setDate(end.getDate()+6);
      const past = end < TODAY;
      const isNext = i===nextIdx;
      return '<div class="wk'+(past?' past':'')+(isNext?' next':'')+'">'+
        '<div class="wk-hd"><span class="wk-n">Sem. '+(i+1)+'</span>'+
          '<span class="wk-range">'+fmt(w.start)+' – '+fmt(end)+'</span>'+
          (isNext?'<span class="wk-tag">Próxima</span>':past?'<span class="wk-tag done">Dictada</span>':'')+
        '</div>'+
        '<div class="wk-items">'+ w.items.map(it=>{
          const dias=it.days.map(d=>d.getDate()+' '+MESAB[d.getMonth()]).join(' · ');
          if(it.kind==='paq'){
            const subs=it.ev.subs||[];
            return '<div class="wk-item" style="--wc:'+it.color+'">'+
              '<div class="wk-item-hd"><b>'+esc(it.label)+'</b><span class="wk-days">'+dias+'</span></div>'+
              '<div class="wk-subs">'+subs.map(s=>'<button type="button" class="wk-chip" data-subj="'+esc(s.title)+'">'+esc(s.title)+'</button>').join('')+'</div>'+
              '<span class="wk-pick">Elegí UNA</span></div>';
          }
          return '<div class="wk-item solo" style="--wc:'+it.color+'">'+
            '<div class="wk-item-hd"><button type="button" class="wk-name" data-subj="'+esc(it.label)+'">'+esc(it.label)+'</button>'+
            '<span class="wk-days">'+dias+'</span></div></div>';
        }).join('')+'</div></div>';
    }).join('');
    weekHost.querySelectorAll('[data-subj]').forEach(b=>b.addEventListener('click',()=>{
      const api=window.MCF_APP; if(!api) return;
      api.openByTitle(b.dataset.subj);
    }));
  }

  // tabs de calendario
  const cvTabs=document.getElementById('calviews');
  if(cvTabs){
    cvTabs.querySelectorAll('.vtab').forEach(t=>t.addEventListener('click',()=>{
      cvTabs.querySelectorAll('.vtab').forEach(x=>{x.classList.remove('on');x.setAttribute('aria-selected','false');});
      t.classList.add('on'); t.setAttribute('aria-selected','true');
      const week = t.dataset.cv==='week';
      document.getElementById('calTimeline').hidden = week;
      document.getElementById('callegend').hidden = week;
      weekHost.hidden = !week;
      if(week) renderWeeks();
    }));
  }

  // ───────── modo compacto ─────────
  const CKEY='mcf.compact.v1';
  const cBtn=document.getElementById('compactBtn');
  function applyCompact(on){
    document.body.classList.toggle('compact',on);
    if(cBtn){ cBtn.setAttribute('aria-pressed',on?'true':'false'); cBtn.textContent = on?'Modo compacto: ON':'Modo compacto'; }
  }
  let compact=false;
  try{ compact = localStorage.getItem(CKEY)==='1'; }catch(e){}
  applyCompact(compact);
  if(cBtn) cBtn.addEventListener('click',()=>{
    compact=!compact;
    try{ localStorage.setItem(CKEY,compact?'1':'0'); }catch(e){}
    applyCompact(compact);
  });

  // ───────── exportar / restablecer ─────────
  const expBtn=document.getElementById('exportBtn');
  if(expBtn) expBtn.addEventListener('click',()=>{
    const data={ generado:new Date().toISOString(), plan:'Maestría Interdisciplinaria en Ciencias Forenses · UBA',
      avance:{aprobadas:done(),total:TOTAL}, materias:prog };
    const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
    const a=document.createElement('a'); a.href=URL.createObjectURL(blob);
    a.download='progreso-mcf-'+new Date().toISOString().slice(0,10)+'.json';
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(a.href);
  });
  const resetBtn=document.getElementById('resetBtn');
  if(resetBtn) resetBtn.addEventListener('click',()=>{
    if(!confirm('¿Restablecer tu progreso? Se borrarán los estados guardados en este dispositivo.')) return;
    prog={}; save(prog); refresh(); injectModalProgress(true);
  });

  refresh();
})();
