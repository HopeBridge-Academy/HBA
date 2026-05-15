// ══════════════════════════════════════════════════════════════════════════════
//  HopeBridge Academy — Certification Verification v2.1
//  SUCCESS panel → #cert-below-panel (full-width, BELOW the two-column grid)
//  ERROR panel   → #cert-error-panel (inside left column, below form, PERSISTS)
// ══════════════════════════════════════════════════════════════════════════════
'use strict';

// ── DATABASE ──────────────────────────────────────────────────────────────────
const CERT_DB = [
  { id:'C123',   name:'John Doe',                  nameFa:'جان دو',
    course:'English Language', courseFa:'زبان انگلیسی', level:'Advanced',     levelFa:'پیشرفته',
    completionDate:'June 15, 2025',     completionDateFa:'۲۵ خرداد ۱۴۰۴', completionYear:'2025',
    grade:'A',  certificateNumber:'HBA-2025-001', token:'hba1a2b3c4d5e6f', status:'Certified' },
  { id:'E00002', name:'Fowzia Stanakzai',           nameFa:'فوزیه ستانکزی',
    course:'English',          courseFa:'انگلیسی',       level:'Intermediate', levelFa:'میانی',
    completionDate:'August 10, 2025',   completionDateFa:'۱۹ مرداد ۱۴۰۴',  completionYear:'2025',
    grade:'B+', certificateNumber:'HBA-2025-002', token:'hba2b3c4d5e6f7a', status:'Certified' },
  { id:'E00001', name:'Mohadesa Sadat Salahshor',   nameFa:'محدثه سادات صلاحشور',
    course:'English',          courseFa:'انگلیسی',       level:'Advanced',     levelFa:'پیشرفته',
    completionDate:'July 20, 2025',     completionDateFa:'۲۹ تیر ۱۴۰۴',    completionYear:'2025',
    grade:'A-', certificateNumber:'HBA-2025-003', token:'hba3c4d5e6f7a8b', status:'Certified' },
  { id:'C124',   name:'Ahmad Karimi',               nameFa:'احمد کریمی',
    course:'Computer Skills',  courseFa:'مهارت‌های کامپیوتر', level:'Intermediate', levelFa:'میانی',
    completionDate:'September 5, 2025', completionDateFa:'۱۴ شهریور ۱۴۰۴', completionYear:'2025',
    grade:'B',  certificateNumber:'HBA-2025-004', token:'hba4d5e6f7a8b9c', status:'Certified' },
  { id:'P001',   name:'Sara Azimi',                 nameFa:'سارا عظیمی',
    course:'Psychology Workshops', courseFa:'کارگاه‌های روانشناسی', level:'General', levelFa:'عمومی',
    completionDate:'May 30, 2025',      completionDateFa:'۹ خرداد ۱۴۰۴',   completionYear:'2025',
    grade:'A',  certificateNumber:'HBA-2025-005', token:'hba5e6f7a8b9c0d', status:'Certified' },
];

// ── TRANSLATIONS ──────────────────────────────────────────────────────────────
const CT = {
  en: {
    verifying:'Verifying your certificate…',
    verified:'Certificate Verified',
    verifiedSub:'This certificate has been officially authenticated by HopeBridge Academy.',
    notFound:'Certificate Not Found',
    notFoundSub:'We could not find a certificate matching the details you entered.',
    errorTitle:'Please Review Your Information',
    hint1:'Your <strong>Student ID</strong> must be entered exactly as printed on your certificate (e.g. <code>E00001</code>). Check capitalisation and hyphens.',
    hint2:'Your <strong>Full Name</strong> must match the name on your certificate exactly — correct spelling and spacing.',
    hint3:'Both fields are <em>not</em> case-sensitive, but every letter and space must be accurate.',
    contact:'Still having trouble? Email us at <a href="mailto:hopebridgeacademy@gmail.com">hopebridgeacademy@gmail.com</a>',
    idEntered:'ID entered', nameEntered:'Name entered',
    fId:'Student ID', fName:'Full Name', fCourse:'Course', fLevel:'Level',
    fYear:'Year of Completion', fDate:'Completion Date', fGrade:'Grade',
    fCertNo:'Certificate Number', fStatus:'Status', fToken:'Verification Token',
    statusOk:'✔ Certified & Valid',
    stmt1:'This certificate was issued by <strong>HopeBridge Academy</strong> and is internationally recognised. It confirms that',
    stmt2:'successfully completed the', stmt3:'programme at', stmt4:'level in',
    stmt5:'achieving a grade of', stmt6:'This record is tamper-evident and digitally verifiable.',
    officialLabel:'Official Statement',
    shareBtn:'Share Link', printBtn:'Print',
    emptyId:'Please enter your Student ID.', emptyName:'Please enter your Full Name.',
    rateLimited:'Too many attempts. Please wait a moment.', copied:'🔗 Link copied!',
  },
  fa: {
    verifying:'در حال تأیید گواهینامه شما…',
    verified:'گواهینامه تأیید شد',
    verifiedSub:'این گواهینامه به‌طور رسمی توسط اکادمی هوپ‌بریج تأیید شده است.',
    notFound:'گواهینامه یافت نشد',
    notFoundSub:'هیچ گواهینامه‌ای با مشخصات وارد‌شده پیدا نشد.',
    errorTitle:'لطفاً اطلاعات خود را بررسی کنید',
    hint1:'<strong>شناسه دانشجویی</strong> باید دقیقاً همان‌طور که روی گواهینامه چاپ شده وارد شود (مثال: <code>E00001</code>).',
    hint2:'<strong>نام کامل</strong> باید دقیقاً با نامی که روی گواهینامه درج شده — از جمله نوشتار و فاصله‌ها — مطابقت داشته باشد.',
    hint3:'هر دو فیلد به حروف بزرگ/کوچک حساس <em>نیستند</em>، اما هر حرف و فاصله باید دقیق باشد.',
    contact:'باز هم مشکل دارید؟ با ما تماس بگیرید: <a href="mailto:hopebridgeacademy@gmail.com">hopebridgeacademy@gmail.com</a>',
    idEntered:'شناسه وارد‌شده', nameEntered:'نام وارد‌شده',
    fId:'شناسه دانشجویی', fName:'نام کامل', fCourse:'دوره', fLevel:'سطح',
    fYear:'سال تکمیل', fDate:'تاریخ تکمیل', fGrade:'نمره',
    fCertNo:'شماره گواهینامه', fStatus:'وضعیت', fToken:'کد تأیید',
    statusOk:'✔ تأیید شده و معتبر',
    stmt1:'این گواهینامه توسط <strong>اکادمی هوپ‌بریج</strong> صادر شده و بین‌المللی معتبر است. تأیید می‌کند که',
    stmt2:'با موفقیت دوره', stmt3:'را در سطح', stmt4:'در سال',
    stmt5:'با نمره', stmt6:'گذرانده است. این سند از دستکاری محفوظ و دیجیتالی قابل تأیید است.',
    officialLabel:'اطلاعیه رسمی',
    shareBtn:'اشتراک‌گذاری', printBtn:'چاپ',
    emptyId:'لطفاً شناسه دانشجویی را وارد کنید.', emptyName:'لطفاً نام کامل را وارد کنید.',
    rateLimited:'تعداد تلاش‌ها بیش از حد. لطفاً کمی صبر کنید.', copied:'🔗 لینک کپی شد!',
  }
};

// ── UTILS ─────────────────────────────────────────────────────────────────────
const _rl = { n:0, t:Date.now() };
function rlOk(){ const n=Date.now(); if(n-_rl.t>60000){_rl.n=0;_rl.t=n;} return ++_rl.n<=8; }
function lang(){ return (document.documentElement.lang||'en').startsWith('fa')?'fa':'en'; }
function tr(k){ return CT[lang()][k]||CT.en[k]||k; }
function esc(v){ return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function maskToken(t){ return (!t||t.length<10)?t:t.slice(0,4)+'••••••'+t.slice(-4); }
function fadeIn(el,ms=0){
  if(!el)return;
  el.style.cssText+=`;opacity:0;transform:translateY(18px);transition:opacity .5s ease ${ms}ms,transform .5s ease ${ms}ms`;
  requestAnimationFrame(()=>requestAnimationFrame(()=>{ el.style.opacity='1'; el.style.transform='translateY(0)'; }));
}

// ── ATTACH INPUT LISTENERS — clears both panels when user edits ───────────────
function attachInputListeners(){
  ['student-id','full-name'].forEach(id=>{
    document.getElementById(id)?.addEventListener('input',()=>{
      const ep=document.getElementById('cert-error-panel');
      const sp=document.getElementById('cert-spinner-area');
      const bp=document.getElementById('cert-below-panel');
      if(ep){ep.style.display='none';ep.innerHTML='';}
      if(sp)sp.innerHTML='';
      if(bp){bp.style.display='none';bp.innerHTML='';}
    },{passive:true});
  });
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
function verifyCertification(e){
  e.preventDefault();
  if(!rlOk()){ toast(tr('rateLimited'),'error'); return; }

  const rawId   = (document.getElementById('student-id')?.value||'').trim();
  const rawName = (document.getElementById('full-name')?.value ||'').trim();
  if(!rawId)  { toast(tr('emptyId'),  'error'); return; }
  if(!rawName){ toast(tr('emptyName'),'error'); return; }

  const id    = rawId.toUpperCase();
  const name  = rawName.toLowerCase();

  // Three DOM targets
  const spinner = document.getElementById('cert-spinner-area'); // inside left col
  const errPnl  = document.getElementById('cert-error-panel');  // inside left col, below form
  const belowPnl= document.getElementById('cert-below-panel');  // FULL WIDTH, below grid

  // Reset
  if(errPnl) { errPnl.style.display='none'; errPnl.innerHTML=''; }
  if(belowPnl){ belowPnl.style.display='none'; belowPnl.innerHTML=''; }

  // Spinner in left col
  if(spinner) spinner.innerHTML=`<div class="cv-loading"><div class="cv-spin"></div><p>${tr('verifying')}</p></div>`;

  setTimeout(()=>{
    if(spinner) spinner.innerHTML='';
    const s = CERT_DB.find(r=> r.id===id && r.name.toLowerCase()===name );

    if(s){
      // ✅ SUCCESS — render below full grid
      if(belowPnl){ belowPnl.style.display='block'; buildSuccess(s,belowPnl); }
      setTimeout(()=>belowPnl?.scrollIntoView({behavior:'smooth',block:'start'}),80);
      toast('✓ '+tr('verified'),'success');
    } else {
      // ❌ ERROR — render inside left col, stays until user edits
      buildError(rawId,rawName);
      toast(tr('notFound'),'error');
    }
  },1100);
}

// ── SUCCESS PANEL ─────────────────────────────────────────────────────────────
function buildSuccess(s, wrap){
  const fa  = lang()==='fa';
  const dir = fa?'rtl':'ltr';
  const nm  = esc(fa?s.nameFa:s.name);
  const cr  = esc(fa?s.courseFa:s.course);
  const lv  = esc(fa?s.levelFa:s.level);
  const dt  = esc(fa?s.completionDateFa:s.completionDate);

  const fields = [
    [tr('fId'),     `<span class="cv-mono">${esc(s.id)}</span>`],
    [tr('fName'),   `<strong>${nm}</strong>`],
    [tr('fCourse'), cr],
    [tr('fLevel'),  `<span class="cv-badge cv-bl">${lv}</span>`],
    [tr('fYear'),   `<span class="cv-badge cv-bg">${esc(s.completionYear)}</span>`],
    [tr('fDate'),   dt],
    [tr('fGrade'),  `<span class="cv-badge cv-by">${esc(s.grade)}</span>`],
    [tr('fCertNo'), `<span class="cv-mono">${esc(s.certificateNumber)}</span>`],
    [tr('fStatus'), `<span class="cv-pill">${tr('statusOk')}</span>`],
    [tr('fToken'),  `<span class="cv-mono cv-tok">${maskToken(s.token)}</span>`],
  ];

  const rowsHTML = fields.map(([lbl,val],i)=>
    `<div class="cv-row" data-delay="${80+i*45}" dir="${dir}">
       <dt class="cv-rlbl">${lbl}</dt>
       <dd class="cv-rval">${val}</dd>
     </div>`).join('');

  const stmt = fa
    ? `${tr('stmt1')} <strong>${nm}</strong> ${tr('stmt2')} <strong>${cr}</strong> ${tr('stmt3')} <strong>${lv}</strong> ${tr('stmt4')} <strong>${esc(s.completionYear)}</strong> ${tr('stmt5')} <strong>${esc(s.grade)}</strong>. ${tr('stmt6')}`
    : `${tr('stmt1')} <strong>${nm}</strong> ${tr('stmt2')} the <strong>${cr}</strong> ${tr('stmt3')} at <strong>${lv}</strong> ${tr('stmt4')} <strong>${esc(s.completionYear)}</strong>, ${tr('stmt5')} <strong>${esc(s.grade)}</strong>. ${tr('stmt6')}`;

  wrap.innerHTML = `
    <div class="cv-below" dir="${dir}">

      <div class="cv-divider"><span>${tr('verified')}</span></div>

      <div class="cv-card" role="region" aria-label="${tr('verified')}">

        <div class="cv-head">
          <div class="cv-ring">
            <svg viewBox="0 0 52 52" aria-hidden="true">
              <circle class="cv-cc" cx="26" cy="26" r="25" fill="none"/>
              <path   class="cv-ct" fill="none" d="M14 27l8 8 16-16"/>
            </svg>
          </div>
          <h2 class="cv-title">${tr('verified')}</h2>
          <p class="cv-sub">${tr('verifiedSub')}</p>
        </div>

        <dl class="cv-rows">${rowsHTML}</dl>

        <div class="cv-stmt" dir="${dir}">
          <div class="cv-stmt-icon"><i class="fas fa-shield-alt" aria-hidden="true"></i></div>
          <div>
            <p class="cv-stmt-label">${tr('officialLabel')}</p>
            <p class="cv-stmt-text">${stmt}</p>
          </div>
        </div>

        <div class="cv-actions">
        <button class="cv-btn cv-btn-print" onclick="downloadCertificatePDF()">
        <i class="fas fa-file-pdf"></i> Download PDF
        </button>
          <button class="cv-btn cv-btn-share" onclick="shareCert('${esc(s.certificateNumber)}','${nm}')">
            <i class="fas fa-share-alt" aria-hidden="true"></i> ${tr('shareBtn')}
          </button>
          <button class="cv-btn cv-btn-print" onclick="window.print()">
            <i class="fas fa-print" aria-hidden="true"></i> ${tr('printBtn')}
          </button>
        </div>

        <div class="cv-wm" aria-hidden="true">HBA</div>
      </div>
    </div>`;

  // Stagger rows
  wrap.querySelectorAll('.cv-row').forEach(el=>{
    fadeIn(el, +el.dataset.delay||0);
  });
  fadeIn(wrap.querySelector('.cv-below'),0);
}

// ── ERROR PANEL ───────────────────────────────────────────────────────────────
function buildError(rawId,rawName){
  const fa  = lang()==='fa';
  const dir = fa?'rtl':'ltr';
  const p   = document.getElementById('cert-error-panel');
  if(!p) return;

  p.innerHTML = `
    <div class="cv-err" dir="${dir}" role="alert">
      <div class="cv-err-icon"><i class="fas fa-exclamation-triangle" aria-hidden="true"></i></div>
      <div class="cv-err-body">
        <h3 class="cv-err-title">${tr('errorTitle')}</h3>
        <p class="cv-err-sub">${tr('notFoundSub')}</p>
        <ul class="cv-err-hints">
          <li>${tr('hint1')}</li>
          <li>${tr('hint2')}</li>
          <li>${tr('hint3')}</li>
        </ul>
        <div class="cv-err-vals" dir="${dir}">
          <span class="cv-lbl">${tr('idEntered')}:</span>
          <code>${esc(rawId)||'—'}</code>
          <span class="cv-lbl">${tr('nameEntered')}:</span>
          <code>${esc(rawName)||'—'}</code>
        </div>
        <p class="cv-err-contact">${tr('contact')}</p>
      </div>
    </div>`;

  p.style.display='block';
  fadeIn(p,0);
}

// ── SHARE ─────────────────────────────────────────────────────────────────────
function shareCert(certNo,name){
  const url=`${location.origin}${location.pathname}?cert=${encodeURIComponent(certNo)}`;
  if(navigator.share){
    navigator.share({title:'HBA Certificate',text:`${name} — ${certNo}`,url}).catch(()=>{});
  } else {
    navigator.clipboard?.writeText(url).then(()=>toast(tr('copied'),'success')).catch(()=>{});
  }
}

// ── TOAST ─────────────────────────────────────────────────────────────────────
function toast(msg,type='info'){
  if(typeof showToastMsg==='function'){showToastMsg(msg,type);return;}
  let el=document.getElementById('_cv_toast');
  if(!el){el=document.createElement('div');el.id='_cv_toast';document.body.appendChild(el);}
  el.style.cssText=`position:fixed;bottom:22px;left:50%;transform:translateX(-50%);
    background:${type==='success'?'#10b981':type==='error'?'#ef4444':'#0B1C3D'};
    color:#fff;padding:12px 26px;border-radius:9px;font-weight:600;z-index:9999;
    box-shadow:0 6px 24px rgba(0,0,0,.25);font-size:.92rem;max-width:360px;
    text-align:center;transition:opacity .35s;pointer-events:none`;
  el.textContent=msg; el.style.opacity='1';
  clearTimeout(el._t); el._t=setTimeout(()=>{el.style.opacity='0';},3800);
}

// ── URL AUTO-FILL ─────────────────────────────────────────────────────────────
function autoFill(){
  const c=new URLSearchParams(location.search).get('cert');
  if(!c)return;
  const m=CERT_DB.find(s=>s.certificateNumber===c.toUpperCase());
  if(m){
    const a=document.getElementById('student-id');
    const b=document.getElementById('full-name');
    if(a)a.value=m.id; if(b)b.value=m.name;
  }
}

// ── STYLES ────────────────────────────────────────────────────────────────────
function injectStyles(){
  if(document.getElementById('_cv_css'))return;
  const el=document.createElement('style'); el.id='_cv_css';
  el.textContent=`
/* spinner */
.cv-loading{display:flex;flex-direction:column;align-items:center;gap:.9rem;padding:2rem 1rem;color:#6b7280;font-size:.9rem}
.cv-spin{width:36px;height:36px;border:3px solid #e5e7eb;border-top-color:#C9973F;border-radius:50%;animation:_cvs .7s linear infinite}
@keyframes _cvs{to{transform:rotate(360deg)}}

/* below-panel wrapper */
#cert-below-panel{display:none}
.cv-below{margin-top:2.5rem}

/* divider */
.cv-divider{display:flex;align-items:center;gap:1rem;margin-bottom:1.8rem}
.cv-divider::before,.cv-divider::after{content:'';flex:1;height:2px;background:linear-gradient(90deg,transparent,#C9973F 40%,transparent)}
.cv-divider span{white-space:nowrap;font-family:'Playfair Display',serif;font-size:.82rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#C9973F;padding:0 .7rem}

/* card */
.cv-card{position:relative;overflow:hidden;background:#fff;border:2px solid #C9973F;border-radius:18px;padding:2.6rem 2.2rem 2rem;box-shadow:0 12px 48px rgba(11,28,61,.11)}
.cv-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(201,151,63,.055),rgba(11,28,61,.03));pointer-events:none}

/* header */
.cv-head{text-align:center;margin-bottom:2rem}
.cv-ring{width:74px;height:74px;margin:0 auto 1rem;border-radius:50%;background:linear-gradient(135deg,#b5842a,#e8c060);display:flex;align-items:center;justify-content:center;box-shadow:0 6px 22px rgba(201,151,63,.38)}
.cv-ring svg{width:36px;height:36px}
.cv-cc{stroke:#fff;stroke-width:2.2;stroke-dasharray:157;stroke-dashoffset:157;animation:_cvcc .65s ease forwards .15s}
.cv-ct{stroke:#fff;stroke-width:3.8;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:50;stroke-dashoffset:50;animation:_cvct .38s ease forwards .78s}
@keyframes _cvcc{to{stroke-dashoffset:0}} @keyframes _cvct{to{stroke-dashoffset:0}}
.cv-title{color:#0B1C3D;font-family:'Playfair Display',serif;font-size:1.7rem;margin:.4rem 0 .2rem;font-weight:700}
.cv-sub{color:#6b7280;font-size:.9rem;margin:0}

/* rows grid */
.cv-rows{display:grid;grid-template-columns:1fr 1fr;gap:.65rem;margin-bottom:1.8rem;padding:0}
@media(max-width:600px){.cv-rows{grid-template-columns:1fr}}
.cv-row{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.3rem;background:#f8f7f4;border-radius:9px;padding:.78rem 1rem;border-right:3px solid #C9973F;opacity:0}
[dir="ltr"] .cv-row{border-right:none;border-left:3px solid #C9973F}
.cv-rlbl{color:#6b7280;font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;flex-shrink:0;margin:0}
.cv-rval{color:#0B1C3D;font-size:.94rem;font-weight:600;margin:0;text-align:end}

/* badges */
.cv-badge{display:inline-block;padding:.22rem .7rem;border-radius:20px;font-size:.81rem;font-weight:700}
.cv-bl{background:#dbeafe;color:#1e40af}
.cv-bg{background:#d1fae5;color:#065f46}
.cv-by{background:#fef3c7;color:#92400e}
.cv-pill{display:inline-flex;align-items:center;gap:.3rem;background:#d1fae5;color:#065f46;padding:.3rem 1rem;border-radius:20px;font-size:.83rem;font-weight:700}
.cv-mono{font-family:'Courier New',monospace;font-size:.87rem;background:#f1f5f9;padding:.14rem .46rem;border-radius:4px;color:#334155}
.cv-tok{letter-spacing:.1em}

/* official statement */
.cv-stmt{display:flex;gap:1rem;align-items:flex-start;background:linear-gradient(135deg,rgba(11,28,61,.03),rgba(201,151,63,.065));border:1px solid rgba(201,151,63,.3);border-radius:12px;padding:1.15rem 1.25rem;margin-bottom:1.7rem}
.cv-stmt-icon{flex-shrink:0;width:38px;height:38px;border-radius:50%;background:rgba(201,151,63,.12);display:flex;align-items:center;justify-content:center;color:#C9973F;font-size:1rem}
.cv-stmt-label{color:#92400e;font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.07em;margin:0 0 .3rem}
.cv-stmt-text{color:#374151;font-size:.89rem;line-height:1.72;margin:0}

/* actions */
.cv-actions{display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap}
.cv-btn{display:inline-flex;align-items:center;gap:.5rem;padding:.72rem 1.45rem;border:none;border-radius:9px;font-size:.9rem;font-weight:700;cursor:pointer;font-family:inherit;transition:transform .2s,box-shadow .2s}
.cv-btn:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.16)}
.cv-btn-share{background:#0B1C3D;color:#fff}
.cv-btn-print{background:linear-gradient(135deg,#b5842a,#C9973F);color:#fff}

/* watermark */
.cv-wm{position:absolute;bottom:8px;right:14px;font-family:'Playfair Display',serif;font-size:5rem;font-weight:900;color:#C9973F;opacity:.04;pointer-events:none;user-select:none;letter-spacing:.12em}
[dir="rtl"] .cv-wm{right:auto;left:14px}

/* ── error panel ── */
#cert-error-panel{display:none;margin-top:1.4rem}
.cv-err{background:#fff;border:1.5px solid #fca5a5;border-radius:14px;padding:1.5rem;box-shadow:0 4px 22px rgba(239,68,68,.08);display:flex;gap:1rem;align-items:flex-start}
.cv-err-icon{flex-shrink:0;width:42px;height:42px;border-radius:50%;background:#fee2e2;display:flex;align-items:center;justify-content:center;color:#ef4444;font-size:1.1rem}
.cv-err-body{flex:1;min-width:0}
.cv-err-title{color:#b91c1c;font-size:1rem;font-weight:700;margin:0 0 .28rem}
.cv-err-sub{color:#374151;font-size:.87rem;margin:0 0 .85rem;line-height:1.6}
.cv-err-hints{color:#4b5563;font-size:.85rem;line-height:1.75;padding-right:1.1rem;margin:0 0 .85rem}
[dir="ltr"] .cv-err-hints{padding-right:0;padding-left:1.1rem}
.cv-err-hints li{margin-bottom:.28rem}
.cv-err-hints code{background:#fff0f0;color:#b91c1c;padding:.1rem .35rem;border-radius:4px;font-size:.82rem}
.cv-err-hints strong{color:#b91c1c}
.cv-err-hints em{color:#6b7280;font-style:italic}
.cv-err-vals{display:flex;flex-wrap:wrap;gap:.4rem .6rem;align-items:center;background:#fef2f2;border-radius:7px;padding:.55rem .85rem;margin-bottom:.8rem;font-size:.83rem}
.cv-lbl{color:#6b7280;font-weight:600;flex-shrink:0}
.cv-err-vals code{background:#fecaca;color:#b91c1c;padding:.1rem .4rem;border-radius:4px;font-family:monospace}
.cv-err-contact{font-size:.83rem;color:#6b7280;margin:0;line-height:1.6}
.cv-err-contact a{color:#C9973F;font-weight:600;text-decoration:none}
.cv-err-contact a:hover{text-decoration:underline}

/* responsive */
@media(max-width:560px){
  .cv-card{padding:1.5rem 1rem 1.3rem}
  .cv-title{font-size:1.3rem}
  .cv-row{flex-direction:column;align-items:flex-start}
  .cv-rval{text-align:start}
  .cv-err{flex-direction:column;gap:.7rem}
  .cv-actions{flex-direction:column}
  .cv-btn{width:100%;justify-content:center}
  .cv-stmt{flex-direction:column;gap:.6rem}
}

/* print */
@media print{
  header,footer,.floating-banner,.cv-actions,.cv-wm,
  #backToTopBtn,#cert-error-panel,.cert-trust-strip,.cv-divider{display:none!important}
  .cv-card{box-shadow:none!important;border:2px solid #C9973F;page-break-inside:avoid}
  .cv-row{opacity:1!important;transform:none!important}
  #cert-below-panel{display:block!important}
}`;
  document.head.appendChild(el);
}

// ── INIT ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded',()=>{
  injectStyles();
  attachInputListeners();
  autoFill();
});

window.verifyCertification = verifyCertification;
window.shareCert            = shareCert;
window.onbeforeprint = () => {
  document.querySelectorAll('.cv-row').forEach(el=>{
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
};
async function downloadCertificatePDF() {

  const element = document.getElementById('cert-below-panel');

  if (!element || !element.innerHTML.trim()) {
    toast("No certificate to download", "error");
    return;
  }

  toast("Generating PDF...", "info");

  // TEMP FIX: remove animations before capture
  element.querySelectorAll('*').forEach(el => {
    el.style.animation = 'none';
    el.style.transition = 'none';
  });

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff"
  });

  const imgData = canvas.toDataURL("image/png");

  const { jsPDF } = window.jspdf;

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: "a4"
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * pageWidth) / canvas.width;

  let position = 0;

  if (imgHeight < pageHeight) {
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  } else {
    // multi-page support
    while (position < imgHeight) {
      pdf.addImage(imgData, "PNG", 0, -position, imgWidth, imgHeight);
      position += pageHeight;
      if (position < imgHeight) pdf.addPage();
    }
  }

  pdf.save("HopeBridge-Certificate.pdf");

  toast("PDF downloaded!", "success");
}

window.downloadCertificatePDF = downloadCertificatePDF;
