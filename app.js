(function(){
  const { DIAS, PAQUETES, OBLIGATORIAS, TESIS, ESPECIFICAS, TICKER } = window.MCF;
  const DRIVE = window.MCF_DRIVE || {};
  const esc = s => String(s==null?'':s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  // ---------- date helpers ----------
  const MESAB = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  const MESF  = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const MESMC = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
  const P = iso => { const a = iso.split('-').map(Number); return {y:a[0], m:a[1]-1, d:a[2], t:new Date(a[0],a[1]-1,a[2]).getTime()}; };
  const PAQ = id => PAQUETES.find(x=>x.id===id);

  // "9, 10 abr · 2026"  /  "16, 17, 23, 24, 30 abr · 7 may · 2026"
  function fechasTxt(arr){
    const g=[]; arr.forEach(iso=>{const p=P(iso);let x=g.find(o=>o.y===p.y&&o.m===p.m);if(!x){x={y:p.y,m:p.m,days:[]};g.push(x);}x.days.push(p.d);});
    const ys=new Set(g.map(o=>o.y)); const multi=ys.size>1;
    return g.map(o=>o.days.join(', ')+' '+MESAB[o.m]+(multi?' '+o.y:'')).join(' · ') + (multi?'':' · '+[...ys][0]);
  }
  // "sáb. 19 sep 2026"
  function examShort(iso){
    const p=P(iso);
    const dow=new Date(p.y,p.m,p.d).toLocaleDateString('es-AR',{weekday:'short'});
    return dow.charAt(0).toUpperCase()+dow.slice(1).replace('.','')+'. '+p.d+' '+MESAB[p.m]+' '+p.y;
  }
  // "9–10 ABR" or "16 ABR–7 MAY"
  function shortRange(arr){
    const a=P(arr[0]), b=P(arr[arr.length-1]);
    if(a.m===b.m) return a.d+'–'+b.d+' '+MESMC[a.m];
    return a.d+' '+MESMC[a.m]+'–'+b.d+' '+MESMC[b.m];
  }
  function mesLabel(arr){ const a=P(arr[0]); return MESF[a.m]+' '+a.y; }
  const inicioTxt = arr => { const a=P(arr[0]); return a.d+' '+MESAB[a.m]+' '+a.y; };
  const docResp = s => (s.resp||[]).join(' / ');

  // ---------- icons ----------
  const ICON = {
    pdf:'<svg viewBox="0 0 24 24"><path d="M6 2h7l6 6v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" fill="#fff"/><path d="M13 2v6h6" fill="rgba(0,0,0,.18)"/><path d="M8 13.4h8M8 16.4h8M8 10.4h4" stroke="rgba(0,0,0,.4)" stroke-width="1.4" stroke-linecap="round"/></svg>',
    doc:'<svg viewBox="0 0 24 24"><path d="M6 2h7l6 6v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" fill="#fff"/><path d="M13 2v6h6" fill="rgba(0,0,0,.18)"/><path d="M8 13.4h8M8 16.4h8M8 10.4h4" stroke="rgba(0,0,0,.4)" stroke-width="1.4" stroke-linecap="round"/></svg>',
    folder:'<svg viewBox="0 0 24 24"><path d="M3 7a2 2 0 0 1 2-2h4.2l2 2H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="#fff"/><path d="M3 9.6h18" stroke="rgba(0,0,0,.16)" stroke-width="1"/></svg>',
    zip:'<svg viewBox="0 0 24 24"><path d="M6 2h7l6 6v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" fill="#fff"/><path d="M13 2v6h6" fill="rgba(0,0,0,.18)"/><path d="M11 6h2M11 9h2M11 12h2M11 15h2M11 18h2" stroke="rgba(0,0,0,.4)" stroke-width="1.4" stroke-linecap="round"/></svg>'
  };
  const KLABEL = {pdf:'PDF',doc:'DOC',folder:'CARPETA',zip:'ZIP'};
  const linkIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M7 17 17 7M9 7h8v8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function matInfo(title){ const d=DRIVE[title]; if(!d) return null; return {folder:d.folder, files:d.files||[], count:(d.files||[]).length}; }

  // GPT links por materia
  const GPT_LINKS = {
    "Introducci\u00f3n al Derecho. Derecho Constitucional. Derechos Humanos": {
      url: "https://chatgpt.com/g/g-6a1cd1102bbc819186ea288a2c2282b2-introduccion-al-derecho",
      name: "GPT \u00b7 Introducci\u00f3n al Derecho",
      desc: "Asistente IA especializado en esta materia"
    },
    "Criminalística": {
      url: "https://chatgpt.com/g/g-6a1ae8ea8fa08191a8730c6e4679d1e7-el-perfilador-criminal",
      name: "GPT \u00b7 El Perfilador Criminal",
      desc: "Asistente IA especializado en Criminalística"
    }
  };
  const ESP_BY_TITLE = {}; ESPECIFICAS.forEach(s=>ESP_BY_TITLE[s.title]=s);

  // ---------- ticker ----------
  (function(){
    const track=document.getElementById('tktrack');
    if(!track) return;
    const one = TICKER.map(t=>'<span class="tkitem"><span class="tkt">'+esc(t.tag)+'</span>'+esc(t.txt)+'</span><span class="tksep">◆</span>').join('');
    track.innerHTML = one + one; // duplicate for seamless loop
  })();

  // ---------- subject card ----------
  function card(s, kind){ // kind: 'oblig' | 'esp'
    const isEsp = kind==='esp';
    const paq = isEsp ? PAQ(s.paq) : null;
    const mi = matInfo(s.title);
    const el = document.createElement('div');
    el.className='scard'+(mi?' has-mat':'')+(isEsp?' esp':'');
    el.setAttribute('role','button');
    el.tabIndex=0;
    el.dataset.subj=s.title;
    if(isEsp && paq) el.style.setProperty('--bc', paq.color);

    let flag;
    if(mi && mi.count>0) flag='<span class="matflag">'+ICON.folder+mi.count+' materiales</span>';
    else if(mi)          flag='<span class="matflag">'+ICON.folder+'Carpeta Drive</span>';
    else                 flag='<span class="matflag dim">Programa</span>';

    const left = isEsp
      ? '<span class="bchip" style="color:'+paq.color+'">Paquete '+paq.id+'</span>'
      : '<span class="num">N°'+String(s.n).padStart(2,'0')+'</span>';

    const dates = isEsp ? paq.dates : s.dates;
    const examRow = s.examen ? '<div class="cmrow exam-row"><span class="cml">📝 Examen</span><span class="cmv exam-cmv">'+examShort(s.examen)+'</span></div>' : '';
    const recupRow = s.recup ? '<div class="cmrow recup-row"><span class="cml">🔁 Recuperatorio</span><span class="cmv recup-cmv">'+examShort(s.recup)+'</span></div>' : '';
    const meta =
      '<div class="cmeta">'+
        '<div class="cmrow"><span class="cml">Fechas</span><span class="cmv">'+fechasTxt(dates)+'</span></div>'+
        '<div class="cmrow"><span class="cml">Días</span><span class="cmv">'+DIAS+'</span></div>'+
        '<div class="cmrow"><span class="cml">Docente</span><span class="cmv doc">'+esc(docResp(s))+'</span></div>'+
        examRow+recupRow+
      '</div>';

    const driveBtn = mi ? '<a class="card-drive" href="'+esc(mi.folder)+'" target="_blank" rel="noopener" aria-label="Abrir carpeta de Drive de '+esc(s.title)+'">'+ICON.folder+'Ver en Drive</a>' : '';
    el.innerHTML =
      '<div class="top">'+left+'<span class="area">'+esc(s.area)+'</span></div>'+
      '<h3>'+esc(s.title)+'</h3>'+ meta +
      '<div class="foot"><span class="jorn"><b>'+dates.length+'</b> jornadas</span>'+flag+'</div>'+
      driveBtn;
    el.addEventListener('click',e=>{ if(e.target.closest('.card-drive')) return; openModal(s,kind); });
    el.addEventListener('keydown',e=>{ if(e.target.closest('.card-drive')) return; if(e.key==='Enter'||e.key===' '){ e.preventDefault(); openModal(s,kind); } });
    return el;
  }

  // ---------- render obligatorias ----------
  const gO=document.getElementById('gridOblig');
  OBLIGATORIAS.forEach(s=>gO.appendChild(card(s,'oblig')));
  document.getElementById('tesisDate').textContent = TESIS.fechas;
  const tesisCardEl=document.getElementById('tesisCard');
  tesisCardEl.addEventListener('click',()=>openModal(TESIS,'tesis'));
  tesisCardEl.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); openModal(TESIS,'tesis'); } });

  (function(){
    const set=(sel,v)=>{ const n=document.querySelector(sel); if(n) n.textContent=v; };
    set('#hsOblig',OBLIGATORIAS.length); set('#hsEsp',ESPECIFICAS.length); set('#hsPaq',PAQUETES.length);
  })();

  // ---------- render específicas ----------
  const gE=document.getElementById('gridEsp');
  function renderPaquetes(){
    gE.innerHTML='';
    PAQUETES.forEach(b=>{
      const subs=ESPECIFICAS.filter(s=>s.paq===b.id || s.paq2===b.id);
      if(!subs.length) return;
      const sec=document.createElement('div'); sec.className='blockSec'; sec.style.setProperty('--bc',b.color);
      sec.innerHTML='<div class="blockHead">'+
        '<span class="bbadge">Paquete '+b.id+'</span>'+
        '<span class="bwhen">'+DIAS+'</span>'+
        '<span class="bdates">'+b.fechas+(b.nota?' · '+b.nota:'')+'</span>'+
        '<span class="bnote">Elegí UNA materia</span>'+
      '</div>';
      const g=document.createElement('div'); g.className='grid';
      subs.forEach(s=>g.appendChild(card(s,'esp')));
      sec.appendChild(g); gE.appendChild(sec);
    });
  }
  let curArea='Todas';
  function renderArea(area){
    gE.innerHTML='';
    const g=document.createElement('div'); g.className='grid';
    ESPECIFICAS.filter(s=>area==='Todas'||s.area===area).forEach(s=>g.appendChild(card(s,'esp')));
    gE.appendChild(g);
  }
  // area filter chips
  const areas=['Todas',...Array.from(new Set(ESPECIFICAS.map(s=>s.area)))];
  const fbar=document.getElementById('filters');
  areas.forEach((a,i)=>{
    const c=document.createElement('button'); c.className='chip'+(i===0?' on':''); c.textContent=a;
    c.addEventListener('click',()=>{fbar.querySelectorAll('.chip').forEach(x=>x.classList.remove('on'));c.classList.add('on');curArea=a;renderArea(a);});
    fbar.appendChild(c);
  });
  // view toggle
  const vtabs=document.getElementById('viewtabs');
  vtabs.querySelectorAll('.vtab').forEach(t=>{
    t.addEventListener('click',()=>{
      vtabs.querySelectorAll('.vtab').forEach(x=>x.classList.remove('on')); t.classList.add('on');
      if(t.dataset.v==='area'){fbar.style.display='';renderArea(curArea);}
      else{fbar.style.display='none';renderPaquetes();}
    });
  });
  renderPaquetes();

  // ---------- trámites cards ----------
  (function(){
    const g=document.getElementById('gridTram');
    const cards=[
      {ic:ICON.pdf, k:'pdf', t:'Cómo abonar un curso', p:'Paso a paso para pagar tu cursada: Sistema de Posgrado, PayU, tarjeta, efectivo y Pago Mis Cuentas.', u:'assets/Como-abonar-un-curso.pdf', go:'Abrir guía'},
      {ic:ICON.pdf, k:'pdf', t:'Asistencia a las clases', p:'Instructivo oficial de registro y control de asistencia a las clases de la maestría.', u:'assets/Asistencia-a-las-clases.pdf', go:'Abrir instructivo'},
      {ic:ICON.doc, k:'doc', t:'Programa completo', p:'Descargá el programa académico completo de la Maestría Interdisciplinaria en Ciencias Forenses.', u:'https://cdn.prod.website-files.com/68e44e1936db51b3d12a5be4/68e7e85d172a7054393d35b2_Maestr%C3%ADa%20Interdisciplinaria%20en%20%20Ciencias%20Forenses.pdf', go:'Descargar PDF'}
    ];
    cards.forEach(c=>{
      const a=document.createElement('a'); a.className='tcard'; a.href=c.u; a.target='_blank'; a.rel='noopener';
      a.innerHTML='<span class="tic '+c.k+'">'+c.ic+'</span><h4>'+esc(c.t)+'</h4><p>'+esc(c.p)+'</p><span class="tgo">'+esc(c.go)+' '+linkIcon+'</span>';
      g.appendChild(a);
    });
  })();

  // ---------- calendar (vertical timeline) ----------
  (function(){
    // build sorted event list
    const events=[];
    OBLIGATORIAS.forEach(s=>events.push({type:'oblig',subj:s,start:s.dates[0]}));
    events.push({type:'tesis',subj:TESIS,start:TESIS.dates[0]});
    PAQUETES.forEach(b=>{
      const subs=ESPECIFICAS.filter(s=>s.paq===b.id||s.paq2===b.id);
      if(subs.length) events.push({type:'paq',paq:b,subs,start:b.dates[0]});
    });
    events.sort((a,b)=>a.start.localeCompare(b.start));
    // group by year-month
    const byMonth=new Map();
    events.forEach(ev=>{
      const key=ev.start.slice(0,7);
      if(!byMonth.has(key)) byMonth.set(key,[]);
      byMonth.get(key).push(ev);
    });
    const host=document.getElementById('calTimeline');
    [...byMonth.entries()].forEach(([ym,evs])=>{
      const [y,m]=ym.split('-');
      const mDiv=document.createElement('div'); mDiv.className='tl-month';
      mDiv.innerHTML='<span class="tl-mh">'+MESF[+m-1].toUpperCase()+' '+y+'</span>';
      host.appendChild(mDiv);
      evs.forEach(ev=>{
        if(ev.type==='oblig'){
          const btn=document.createElement('button'); btn.type='button'; btn.className='tl-obl';
          btn.innerHTML=
            '<span class="tl-num">N°'+String(ev.subj.n).padStart(2,'0')+'</span>'+
            '<div class="tl-body">'+
              '<div class="tl-name">'+esc(ev.subj.title)+'</div>'+
              '<div class="tl-meta">'+
                '<span class="tl-area">'+esc(ev.subj.area)+'</span>'+
                '<span class="tl-dates">'+fechasTxt(ev.subj.dates)+'</span>'+
              '</div>'+
              '<div class="tl-meta" style="margin-top:5px"><span class="tl-doc">'+esc(docResp(ev.subj))+'</span></div>'+
            '</div>';
          btn.addEventListener('click',()=>openModal(ev.subj,'oblig'));
          host.appendChild(btn);
        } else if(ev.type==='tesis'){
          const btn=document.createElement('button'); btn.type='button'; btn.className='tl-tesis-row';
          btn.innerHTML=
            '<span class="tl-tesis-ico">★</span>'+
            '<div class="tl-body">'+
              '<div class="tl-name">Taller de Tesis</div>'+
              '<div class="tl-meta">'+
                '<span class="tl-area">Investigación</span>'+
                '<span class="tl-dates">'+TESIS.fechas+'</span>'+
              '</div>'+
              '<div class="tl-meta" style="margin-top:5px"><span class="tl-doc">'+esc(docResp(TESIS))+'</span></div>'+
            '</div>';
          btn.addEventListener('click',()=>openModal(TESIS,'tesis'));
          host.appendChild(btn);
        } else if(ev.type==='paq'){
          const b=ev.paq;
          const div=document.createElement('div'); div.className='tl-paq'; div.style.setProperty('--bc',b.color);
          let inner='<div class="tl-paq-hd">'+
            '<span class="tl-pbadge">Paquete '+b.id+'</span>'+
            '<span class="tl-pdates">'+DIAS+' · '+b.fechas+(b.nota?' · '+b.nota:'')+'</span>'+
            '<span class="tl-pnote">Elegí una</span>'+
          '</div><div class="tl-subs">';
          ev.subs.forEach(s=>{
            inner+='<button type="button" class="tl-sub" data-esp="'+encodeURIComponent(s.title)+'">'+
              '<span class="tl-sub-dot"></span>'+
              '<div class="tl-body">'+
                '<div class="tl-name">'+esc(s.title)+'</div>'+
                '<div class="tl-meta">'+
                  '<span class="tl-area">'+esc(s.area)+'</span>'+
                  '<span class="tl-doc">'+esc(docResp(s))+'</span>'+
                '</div>'+
              '</div>'+
            '</button>';
          });
          inner+='</div>';
          div.innerHTML=inner;
          div.querySelectorAll('.tl-sub').forEach(btn=>{
            btn.addEventListener('click',()=>{
              const s=ESP_BY_TITLE[decodeURIComponent(btn.dataset.esp)];
              if(s) openModal(s,'esp');
            });
          });
          host.appendChild(div);
        }
      });
    });
    // legend
    let lh='<span class="lg"><i style="background:#23f0ff"></i>Obligatorias</span>'+
            '<span class="lg"><i style="background:#9b6bff"></i>Taller de Tesis</span>';
    PAQUETES.forEach(b=>lh+='<span class="lg"><i style="background:'+b.color+'"></i>Paquete '+b.id+'</span>');
    document.getElementById('callegend').innerHTML=lh;
  })();

  // ---------- modal ----------
  const bg=document.getElementById('modalBg');
  const modalEl=document.getElementById('modal');
  let lastFocus=null;
  function docHtml(s){
    const resp=(s.resp||[]), eq=(s.equipo||[]);
    let h='<div class="m-label">Plantel docente</div><div class="docrow">';
    if(resp.length) h+='<div class="docline"><span class="dr">Responsable</span><span class="dn resp">'+esc(resp.join(' · '))+'</span></div>';
    if(eq.length)   h+='<div class="docline"><span class="dr">Equipo</span><span class="dn">'+esc(eq.join(' · '))+'</span></div>';
    h+='</div>';
    return h;
  }
  function openModal(s, kind){
    lastFocus = document.activeElement;
    const isEsp = kind==='esp';
    const paq = isEsp ? PAQ(s.paq) : null;
    const dates = isEsp ? paq.dates : s.dates;

    document.getElementById('mArea').textContent = s.area || 'Materia';
    document.getElementById('mTitle').textContent = s.title;

    const meta=document.getElementById('mMeta');
    let tags='';
    if(kind==='oblig') tags+='<span class="tag">Obligatoria · N°'+String(s.n).padStart(2,'0')+'</span>';
    else if(kind==='esp') tags+='<span class="tag paq" style="background:'+paq.color+'">Paquete '+paq.id+'</span>';
    else tags+='<span class="tag">Taller transversal</span>';
    tags+='<span class="tag hot">'+dates.length+' jornadas</span><span class="tag">'+DIAS+'</span>';
    meta.innerHTML=tags;

    // schedule grid
    const sd=document.getElementById('mSched');
    sd.style.setProperty('--bc', isEsp?paq.color:'#23f0ff');
    let sg='<div class="m-label">Cursada · cronograma oficial 2026–2027</div><div class="cgrid">';
    if(isEsp) sg+='<div class="cg bloque"><span>Paquete</span><b>'+paq.id+'</b></div>';
    sg+='<div class="cg"><span>Inicio</span><b>'+inicioTxt(dates)+'</b></div>'+
        '<div class="cg"><span>Jornadas</span><b>'+dates.length+'</b></div>'+
        '<div class="cg"><span>Días</span><b>'+DIAS+'</b></div>'+
        '<div class="cg wide"><span>Fechas de cursada</span><b>'+(kind==='tesis'?s.fechas:fechasTxt(dates))+'</b></div>'+
      '</div>';
    sd.innerHTML=sg;

    // docentes
    document.getElementById('mDoc').innerHTML = docHtml(s);

    // contenidos
    document.getElementById('mDesc').textContent = s.desc;

    // examen + recuperatorio
    const oldExamEl = document.getElementById('mExamen');
    if(oldExamEl) oldExamEl.remove();
    if(s.examen){
      const ed = new Date(s.examen+'T00:00:00');
      const edTxt = ed.toLocaleDateString('es-AR',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
      const box = document.createElement('div');
      box.id='mExamen';
      box.className='exam-box';
      let inner = '<div class="m-label">📝 Examen</div><div class="exam-date">'+edTxt.charAt(0).toUpperCase()+edTxt.slice(1)+'</div>';
      if(s.recup){
        const rd = new Date(s.recup+'T00:00:00');
        const rdTxt = rd.toLocaleDateString('es-AR',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
        inner += '<div class="m-label recup-label">🔁 Recuperatorio</div><div class="exam-date recup-date">'+rdTxt.charAt(0).toUpperCase()+rdTxt.slice(1)+'</div>';
      }
      inner += s.oficial
        ? '<p class="exam-note">Fechas oficiales — cronograma de exámenes de la Facultad. Sujetas a confirmación.</p>'
        : '<p class="exam-note">Fecha estimada · 60 días desde la última clase cursada. Sujeto a confirmación oficial.</p>';
      box.innerHTML = inner;
      document.getElementById('mDesc').insertAdjacentElement('afterend', box);
    }

    // simultaneous + materials
    const wrap=document.getElementById('mMatWrap');
    let html='';
    if(isEsp){
      const others=ESPECIFICAS.filter(o=>o!==s && (o.paq===paq.id || o.paq2===paq.id));
      if(others.length){
        html+='<div class="m-label">Se dicta en simultáneo</div>'+
          '<p class="simnote">Pertenece al <b style="color:'+paq.color+'">Paquete '+paq.id+'</b> ('+paq.fechas+'). Comparte fechas con estas materias — solo podés cursar una del paquete:</p>'+
          '<div class="simlist">'+others.map(o=>'<button type="button" class="simitem" data-t="'+encodeURIComponent(o.title)+'">'+o.title+'</button>').join('')+'</div>';
      }
    }
    const mi=matInfo(s.title);
    if(mi){
      html+='<div class="m-label">Materiales de cursada · Drive</div>';
      if(mi.files.length){
        html+='<div class="mats">'+mi.files.map(f=>
          '<a class="mat" href="'+esc(f.u)+'" target="_blank" rel="noopener"><span class="ic '+f.k+'">'+ICON[f.k]+'</span><span class="mt">'+esc(f.t)+'</span><span class="mk">'+KLABEL[f.k]+'</span><span class="arr">'+linkIcon+'</span></a>'
        ).join('')+'</div>';
      } else html+='<p class="no-mat">Carpeta creada — los materiales se irán cargando durante la cursada.</p>';
      html+='<a class="folder-link" href="'+esc(mi.folder)+'" target="_blank" rel="noopener">'+ICON.folder+' Abrir carpeta completa en Drive</a>';
    }
    // GPT link si existe
    const gptData = GPT_LINKS[s.title];
    if(gptData){
      html+='<div class="m-label" style="margin-top:28px">Asistente IA · ChatGPT</div>';
      html+='<a class="gpt-btn" href="'+esc(gptData.url)+'" target="_blank" rel="noopener">'+
        '<span class="gpt-icon"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z" fill="#fff"/></svg></span>'+
        '<span class="gpt-text"><strong>'+esc(gptData.name)+'</strong><span class="gpt-sub">'+esc(gptData.desc)+'</span></span>'+
        '<span class="gpt-arr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M7 17 17 7M9 7h8v8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'+
        '</a>';
    }
    html+='<div class="note" style="margin-top:20px"><i></i>Fechas y plantel docente según cronograma oficial 2026–2027 · sujeto a confirmación.</div>';
    wrap.innerHTML=html;

    wrap.querySelectorAll('.simitem').forEach(btn=>{
      btn.addEventListener('click',()=>{ openModal(ESP_BY_TITLE[decodeURIComponent(btn.dataset.t)],'esp'); document.getElementById('modal').scrollIntoView({block:'start'}); });
    });

    bg.classList.add('open'); document.body.style.overflow='hidden';
    requestAnimationFrame(()=>{ const c=document.getElementById('modalClose'); if(c) c.focus(); });
  }
  function close(){ bg.classList.remove('open'); document.body.style.overflow=''; if(lastFocus && typeof lastFocus.focus==='function') lastFocus.focus(); }
  document.getElementById('modalClose').addEventListener('click',close);
  bg.addEventListener('click',e=>{ if(e.target===bg) close(); });
  window.MCF_APP={
    openByTitle(t){
      const s=ESP_BY_TITLE[t]||OBLIGATORIAS.find(o=>o.title===t)||(TESIS.title===t?TESIS:null);
      if(!s) return;
      openModal(s, s===TESIS ? 'tesis' : (ESP_BY_TITLE[t] ? 'esp' : 'oblig'));
    }
  };
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){ close(); return; }
    if(e.key==='Tab' && bg.classList.contains('open')){
      const f=modalEl.querySelectorAll('button,a[href],select,[tabindex]:not([tabindex="-1"])');
      if(!f.length) return;
      const first=f[0], last=f[f.length-1];
      if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); }
    }
  });
})();
