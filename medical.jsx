// medical.jsx — Раздел «Медицина»
// Exports: MedicalPage → window

const { useState: useStM, useMemo: useSmM } = React;

/* ─── MOCK DATA ───────────────────────────────────────────────── */
const MED_SPORTS_RU = ['Дзюдо','Вольная борьба','Греко-рим. борьба','Женская борьба','Бокс',
  'Плавание','Артист. плавание','Водное поло','Баскетбол','Таэквондо',
  'Велоспорт','Фехтование','Спорт. гимнастика','Гребля'];

// Active cases — each has embedded student info for standalone use
const ACTIVE_CASES_BASE = [
  {id:1,  stuId:6,  stuName:'Алибек Жанбеков',   si:4,  group:'Бокс-А',   status:'red',    desc:'Травма колена (разрыв мениска)', date:'22.05.2026', doc:'Справка №1234'},
  {id:2,  stuId:7,  stuName:'Диана Сейткали',     si:12, group:'Гимн-А',   status:'red',    desc:'Растяжение связок голеностопа',  date:'20.05.2026', doc:'Справка №1235'},
  {id:3,  stuId:8,  stuName:'Нурлан Асанов',      si:0,  group:'Дзюдо-Б',  status:'red',    desc:'Ушиб ребра (3-е ребро)',          date:'19.05.2026', doc:'Справка №1236'},
  {id:4,  stuId:9,  stuName:'Айгерим Бекова',     si:5,  group:'Плав-А',   status:'yellow', desc:'Воспаление плечевого сустава',   date:'18.05.2026', doc:''},
  {id:5,  stuId:10, stuName:'Тимур Сейткалиев',   si:1,  group:'ВБ-А',     status:'yellow', desc:'Ушиб предплечья',                 date:'17.05.2026', doc:''},
  {id:6,  stuId:13, stuName:'Зарина Абдуллина',   si:6,  group:'АртПл-А',  status:'yellow', desc:'Растяжение мышцы бедра',          date:'15.05.2026', doc:''},
  {id:7,  stuId:14, stuName:'Бауыржан Досов',     si:9,  group:'Тхэк-Б',   status:'yellow', desc:'Хроническая боль в пояснице',    date:'14.05.2026', doc:''},
  {id:8,  stuId:15, stuName:'Камила Жакупова',    si:7,  group:'ВП-А',     status:'yellow', desc:'Ушиб кисти правой руки',          date:'12.05.2026', doc:''},
];

const ARCHIVE_BASE = [
  {id:101, stuId:3,  stuName:'Ержан Касымов',    si:9, group:'Тхэк-А',  status:'yellow', desc:'Ушиб голени',            date:'10.03.2026', closedDate:'25.03.2026'},
  {id:102, stuId:1,  stuName:'Арман Сулейменов', si:4, group:'Бокс-А',  status:'red',    desc:'Перелом пальца (мизинец)',date:'02.02.2026', closedDate:'15.03.2026'},
  {id:103, stuId:22, stuName:'Дильназ Нурова',   si:0, group:'Дзюдо-А', status:'yellow', desc:'Растяжение запястья',    date:'20.01.2026', closedDate:'10.02.2026'},
  {id:104, stuId:4,  stuName:'Сабина Нурланова', si:12,group:'Гимн-А',  status:'yellow', desc:'Боль в коленном суставе',date:'05.01.2026', closedDate:'28.01.2026'},
];

/* ─── LOCAL I18N ──────────────────────────────────────────────── */
const MSTR = {
  ru: {
    redStatus:'Полное освобождение', yellowStatus:'Ограниченные нагрузки',
    addBtn:'Добавить запись', filterAll:'Все статусы', filterSport:'Все виды спорта',
    total:'Всего активных', redCount:'Полное освобождение', yellowCount:'Ограниченные нагрузки',
    colStudent:'Ученик', colSport:'Вид спорта / Группа', colDesc:'Описание',
    colStatus:'Статус', colDate:'Дата', colActions:'',
    archiveBtn:'Закрыть', archiveTitle:'Архив — вылеченные случаи',
    confirmClose:'Закрыть медицинскую запись?',
    confirmCloseBody:'Запись перейдёт в архив. При необходимости её можно найти в разделе «Архив».',
    confirmBtn:'Да, закрыть',
    archiveEmpty:'Нет архивных записей', closedDate:'Закрыта',
    activeEmpty:'Нет активных медицинских случаев',
    showArchive:'Показать архив', hideArchive:'Скрыть архив',
    // Modal
    addTitle:'Новая медицинская запись',
    fStudent:'Ученик', fDesc:'Описание травмы', fStatus:'Статус',
    fDoc:'Документ (скан справки)', fDate:'Дата',
    docPh:'Номер справки или описание документа',
    save:'Сохранить', cancel:'Отмена', req:'Обязательное поле',
  },
  kz: {
    redStatus:'Толық босату', yellowStatus:'Шектеулі жүктеме',
    addBtn:'Жазба қосу', filterAll:'Барлық мәртебе', filterSport:'Барлық спорт',
    total:'Белсенді жағдайлар', redCount:'Толық босату', yellowCount:'Шектеулі жүктеме',
    colStudent:'Оқушы', colSport:'Спорт / Топ', colDesc:'Сипаттамасы',
    colStatus:'Мәртебесі', colDate:'Күні', colActions:'',
    archiveBtn:'Жабу', archiveTitle:'Мұрағат — жазылған жағдайлар',
    confirmClose:'Медициналық жазбаны жабу?',
    confirmCloseBody:'Жазба мұрағатқа жіберіледі. Қажет болса «Мұрағат» бөлімінен табуға болады.',
    confirmBtn:'Иә, жабу',
    archiveEmpty:'Мұрағаттық жазбалар жоқ', closedDate:'Жабылды',
    activeEmpty:'Белсенді медициналық жағдайлар жоқ',
    showArchive:'Мұрағатты көрсету', hideArchive:'Мұрағатты жасыру',
    addTitle:'Жаңа медициналық жазба',
    fStudent:'Оқушы', fDesc:'Жарақат сипаттамасы', fStatus:'Мәртебесі',
    fDoc:'Құжат (анықтама сканері)', fDate:'Күні',
    docPh:'Анықтама нөмірі немесе құжат сипаттамасы',
    save:'Сақтау', cancel:'Болдырмау', req:'Міндетті өріс',
  },
};

/* ─── HELPERS ─────────────────────────────────────────────────── */
const AVA_C = ['#1D2B4F','#0055A4','#1A5C2D','#7C3AED','#BE185D','#B45309','#0E7490','#065F46'];
function avaC(id) { return AVA_C[id % AVA_C.length]; }
function inits(name) { return name.split(' ').slice(0,2).map(w=>w[0]).join(''); }

/* ─── CONFIRM ARCHIVE MODAL ───────────────────────────────────── */
function ConfirmArchiveModal({ c, s, onConfirm, onCancel }) {
  return (
    <>
      <div onClick={onCancel} style={{ position:'fixed', inset:0, background:'rgba(15,23,42,0.45)', zIndex:920, backdropFilter:'blur(2px)' }} />
      <div style={{ position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:380, background:'#fff', borderRadius:14, zIndex:921, boxShadow:'0 24px 60px rgba(0,0,0,0.2)', overflow:'hidden' }}>
        <div style={{ padding:'20px 22px 16px', textAlign:'center' }}>
          <div style={{ width:48, height:48, borderRadius:'50%', background:'#FEF9C3', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, margin:'0 auto 14px' }}>📦</div>
          <div style={{ fontWeight:700, fontSize:15, color:'#0F172A', marginBottom:8 }}>{s.confirmClose}</div>
          <div style={{ fontSize:13, color:'#64748B', lineHeight:1.6 }}>
            <strong style={{ color:'#0F172A' }}>{c.stuName}</strong> — {c.desc}
          </div>
          <div style={{ marginTop:8, fontSize:12, color:'#94A3B8' }}>{s.confirmCloseBody}</div>
        </div>
        <div style={{ padding:'12px 22px 18px', display:'flex', gap:10 }}>
          <button onClick={onCancel} style={{ flex:1, padding:'9px', border:'1px solid #E2E8F0', borderRadius:8, background:'transparent', color:'#64748B', fontSize:13, fontFamily:'inherit', cursor:'pointer', fontWeight:500 }}>{s.cancel}</button>
          <button onClick={onConfirm} style={{ flex:1, padding:'9px', border:'none', borderRadius:8, background:'#0F172A', color:'#fff', fontSize:13, fontFamily:'inherit', cursor:'pointer', fontWeight:600 }}>{s.confirmBtn}</button>
        </div>
      </div>
    </>
  );
}

/* ─── STAT STRIP ──────────────────────────────────────────────── */
function MedStat({ count, label, color, bg, icon }) {
  return (
    <div style={{ background:bg, border:`1px solid ${color}30`, borderRadius:12, padding:'16px 20px', display:'flex', alignItems:'center', gap:14, flex:1 }}>
      <div style={{ width:42, height:42, borderRadius:10, background:`${color}18`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>{icon}</div>
      <div>
        <div style={{ fontSize:32, fontWeight:800, color, lineHeight:1, letterSpacing:-1 }}>{count}</div>
        <div style={{ fontSize:12, color:`${color}CC`, fontWeight:500, marginTop:2 }}>{label}</div>
      </div>
    </div>
  );
}

/* ─── FILE UPLOAD FIELD ──────────────────────────────────────── */
function MedFileUpload({ hint, accept, onChange }) {
  const [filename, setFilename] = React.useState('');
  const [drag,     setDrag]     = React.useState(false);
  const ref = React.useRef();

  const process = file => {
    if (!file) return;
    setFilename(file.name);
    onChange && onChange(file);
  };

  return (
    <>
      <input ref={ref} type="file" accept={accept || '*'} style={{ display:'none' }} onChange={e => process(e.target.files[0])} />
      <div
        onClick={() => ref.current.click()}
        onDragOver={e => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={e => { e.preventDefault(); setDrag(false); process(e.dataTransfer.files[0]); }}
        style={{
          border: `2px dashed ${drag ? '#0055A4' : filename ? '#93C5FD' : '#E2E8F0'}`,
          borderRadius: 8, padding: '11px 14px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 12,
          background: drag ? '#EFF6FF' : filename ? '#F8FAFC' : '#fff',
          transition: 'all .15s',
        }}
        onMouseEnter={e => { if (!drag && !filename) e.currentTarget.style.borderColor = '#93C5FD'; }}
        onMouseLeave={e => { if (!drag && !filename) e.currentTarget.style.borderColor = '#E2E8F0'; }}
      >
        <div style={{ width:40, height:40, borderRadius:8, background:'#F1F5F9', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>
          {filename ? '📄' : '📎'}
        </div>
        <div style={{ minWidth:0 }}>
          <div style={{ fontSize:13, fontWeight:500, color: filename ? '#0F172A' : '#94A3B8', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
            {filename || hint}
          </div>
          <div style={{ fontSize:11, color:'#94A3B8', marginTop:2 }}>
            {filename ? 'Нажмите чтобы изменить · можно перетащить' : 'Нажмите или перетащите файл сюда'}
          </div>
        </div>
        {filename && (
          <button onClick={e => { e.stopPropagation(); setFilename(''); onChange && onChange(null); }}
            style={{ marginLeft:'auto', flexShrink:0, width:22, height:22, border:'none', borderRadius:'50%', background:'#F1F5F9', color:'#94A3B8', fontSize:12, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
            ✕
          </button>
        )}
      </div>
    </>
  );
}

/* ─── ADD RECORD MODAL ────────────────────────────────────────── */
const medInpSt = window.SHARED.inputStyle;

function MFLabel({ label, req, children }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
      <label style={{ fontSize:12, fontWeight:500, color:'#475569' }}>{label}{req&&<span style={{color:'#DC2626',marginLeft:2}}>*</span>}</label>
      {children}
    </div>
  );
}

function AddMedModal({ onClose, sports, s }) {
  const [f, setF] = useStM({ stuId:'6', desc:'', status:'yellow', doc:null, date:'25.05.2026' });
  const upd = (k,v) => setF(p=>({...p,[k]:v}));
  const allStudents = ACTIVE_CASES_BASE.map(c=>({id:c.stuId, name:c.stuName, si:c.si, group:c.group}));
  // combine with a few more from known roster
  const stuOptions = [
    {id:1,  name:'Арман Сулейменов',  si:4,  group:'Бокс-А'},
    {id:2,  name:'Малика Жанасова',   si:0,  group:'Дзюдо-А'},
    {id:3,  name:'Ержан Касымов',     si:9,  group:'Тхэк-А'},
    {id:4,  name:'Сабина Нурланова',  si:12, group:'Гимн-А'},
    {id:5,  name:'Даниил Ким',        si:11, group:'Фехт-А'},
    {id:11, name:'Серик Ахметов',     si:4,  group:'Бокс-Б'},
    {id:12, name:'Нурлан Бейсембаев', si:4,  group:'Бокс-А'},
    {id:16, name:'Алтын Жумабаев',    si:4,  group:'Бокс-В'},
    {id:17, name:'Берик Садыков',     si:4,  group:'Бокс-В'},
    {id:20, name:'Жазира Токтарова',  si:5,  group:'Плав-Б'},
    {id:21, name:'Санжар Байжанов',   si:8,  group:'Баск-А'},
    {id:25, name:'Дамир Алиев',       si:10, group:'Вело-А'},
  ];

  return (
    <>
      <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(15,23,42,0.4)', zIndex:902, backdropFilter:'blur(2px)' }} />
      <div style={{ position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:500, background:'#fff', borderRadius:16, zIndex:903, boxShadow:'0 24px 60px rgba(0,0,0,0.18)', maxHeight:'88vh', display:'flex', flexDirection:'column', overflow:'hidden' }}>
        <div style={{ padding:'18px 24px', borderBottom:'1px solid #E2E8F0', display:'flex', justifyContent:'space-between', alignItems:'center', flexShrink:0 }}>
          <div style={{ fontWeight:700, fontSize:16, color:'#0F172A' }}>{s.addTitle}</div>
          <button onClick={onClose} style={{ width:28, height:28, border:'1px solid #E2E8F0', borderRadius:6, background:'transparent', color:'#94A3B8', cursor:'pointer', fontSize:14 }}>✕</button>
        </div>
        <div style={{ padding:'20px 24px', overflowY:'auto', display:'flex', flexDirection:'column', gap:14 }}>
          <MFLabel label={s.fStudent} req>
            <select value={f.stuId} onChange={e=>upd('stuId',e.target.value)} style={medInpSt}>
              {stuOptions.map(st => <option key={st.id} value={st.id}>{st.name} — {sports[st.si]}, {st.group}</option>)}
            </select>
          </MFLabel>
          <MFLabel label={s.fDesc} req>
            <textarea value={f.desc} onChange={e=>upd('desc',e.target.value)} placeholder="Описание травмы, диагноз..."
              style={{ ...medInpSt, height:80, padding:'8px 10px', resize:'vertical', lineHeight:1.5 }} />
          </MFLabel>
          <MFLabel label={s.fStatus} req>
            <div style={{ display:'flex', gap:10 }}>
              {[['red','🔴',s.redStatus,'#FEF2F2','#DC2626'],['yellow','🟡',s.yellowStatus,'#FFFBEB','#D97706']].map(([val,icon,label,bg,c]) => (
                <button key={val} onClick={()=>upd('status',val)} style={{
                  flex:1, padding:'10px', border:`2px solid ${f.status===val?c:'#E2E8F0'}`,
                  borderRadius:10, background:f.status===val?bg:'#fff',
                  color:f.status===val?c:'#94A3B8', fontFamily:'inherit',
                  fontSize:13, fontWeight:f.status===val?600:400, cursor:'pointer',
                  display:'flex', alignItems:'center', gap:8, justifyContent:'center',
                  transition:'all .12s',
                }}>
                  <span>{icon}</span><span>{label}</span>
                </button>
              ))}
            </div>
          </MFLabel>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <MFLabel label={s.fDate} req>
              <input value={f.date} onChange={e=>upd('date',e.target.value)} placeholder="ДД.ММ.ГГГГ" style={medInpSt} />
            </MFLabel>
            <MFLabel label={s.fDoc}>
              <MedFileUpload hint="PDF, JPG, PNG — скан справки" accept="image/*,.pdf" onChange={file => upd('doc', file)} />
            </MFLabel>
          </div>
        </div>
        <div style={{ padding:'14px 24px', borderTop:'1px solid #E2E8F0', display:'flex', gap:10, justifyContent:'flex-end', flexShrink:0 }}>
          <button onClick={onClose} style={{ padding:'8px 20px', border:'1px solid #E2E8F0', borderRadius:8, background:'transparent', color:'#64748B', fontSize:13, fontFamily:'inherit', cursor:'pointer' }}>{s.cancel}</button>
          <button onClick={() => { window.TOAST?.show('Запись добавлена'); onClose(); }} style={{ padding:'8px 20px', border:'none', borderRadius:8, background:'#0055A4', color:'#fff', fontWeight:600, fontSize:13, fontFamily:'inherit', cursor:'pointer' }}>{s.save}</button>
        </div>
      </div>
    </>
  );
}

/* ─── MEDICAL PAGE ────────────────────────────────────────────── */
function MedicalPage({ t, role, lang, activeSport, onClearSport, onStudentClick }) {
  const s = MSTR[lang] || MSTR.ru;
  const TRAINER_SPORT = 4;

  const baseCases = role === 'trainer'
    ? ACTIVE_CASES_BASE.filter(c => c.si === TRAINER_SPORT)
    : ACTIVE_CASES_BASE;

  const [search,  setSearch]  = useStM('');
  const [fStatus, setFStatus] = useStM('all');
  const [fSport,  setFSport]  = useStM('all');
  const [archived, setArchived] = useStM([]);
  const [showArchive, setShowArchive] = useStM(false);
  const [showAdd, setShowAdd] = useStM(false);
  const [pendingArchive, setPendingArchive] = useStM(null);

  // Синхронизация с глобальным фильтром из сайдбара
  React.useEffect(() => {
    if (role === 'trainer') return;
    setFSport(activeSport !== null && activeSport !== undefined ? String(activeSport) : 'all');
  }, [activeSport]);

  const active = useSmM(() => {
    return baseCases
      .filter(c => !archived.includes(c.id))
      .filter(c => !search || c.stuName.toLowerCase().includes(search.toLowerCase()))
      .filter(c => fStatus === 'all' || c.status === fStatus)
      .filter(c => fSport  === 'all' || c.si === Number(fSport));
  }, [baseCases, archived, search, fStatus, fSport]);

  const archiveList = [
    ...ARCHIVE_BASE.filter(c => role !== 'trainer' || c.si === TRAINER_SPORT),
    ...ACTIVE_CASES_BASE.filter(c => archived.includes(c.id)).map(c => ({...c, closedDate:'25.05.2026'})),
  ];

  const reds    = active.filter(c=>c.status==='red').length;
  const yellows = active.filter(c=>c.status==='yellow').length;
  const canEdit = role === 'admin' || role === 'trainer';

  const selSt = window.SHARED.selectStyle;

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:18 }}>

      {/* Stat strip */}
      <div style={{ display:'flex', gap:14 }}>
        <MedStat count={reds}    label={s.redCount}    color='#DC2626' bg='#FEF2F2' icon='🔴' />
        <MedStat count={yellows} label={s.yellowCount} color='#D97706' bg='#FFFBEB' icon='🟡' />
        <div style={{ flex:2, background:'#fff', border:'1px solid #E2E8F0', borderRadius:12, padding:'16px 20px', display:'flex', alignItems:'center', gap:14 }}>
          <div style={{ width:42, height:42, borderRadius:10, background:'#F1F5F9', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>📋</div>
          <div>
            <div style={{ fontSize:32, fontWeight:800, color:'#0F172A', lineHeight:1, letterSpacing:-1 }}>{reds+yellows}</div>
            <div style={{ fontSize:12, color:'#94A3B8', fontWeight:500, marginTop:2 }}>{s.total}</div>
          </div>
          <div style={{ flex:1 }} />
          {canEdit && (
            <button onClick={()=>setShowAdd(true)} style={{ display:'flex', alignItems:'center', gap:6, height:36, padding:'0 16px', border:'none', borderRadius:8, background:'#0055A4', color:'#fff', fontWeight:600, fontSize:13, fontFamily:'inherit', cursor:'pointer', whiteSpace:'nowrap' }}>
              <span style={{ fontSize:16 }}>+</span> {s.addBtn}
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div style={{ display:'flex', gap:10, flexWrap:'wrap', alignItems:'center' }}>
        <div style={{ position:'relative', flex:'1 1 200px', minWidth:0 }}>
          <span style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:'#94A3B8', pointerEvents:'none' }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="7" cy="7" r="4.5"/><line x1="10.5" y1="10.5" x2="14" y2="14" strokeLinecap="round"/></svg>
          </span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск по ФИО..."
            style={{ width:'100%', height:36, padding:'0 10px 0 32px', border:'1px solid #E2E8F0', borderRadius:8, fontSize:13, color:'#0F172A', fontFamily:'inherit', outline:'none', background:'#fff' }} />
        </div>
        <select value={fStatus} onChange={e=>setFStatus(e.target.value)} style={{ ...selSt, minWidth:180 }}>
          <option value="all">{s.filterAll}</option>
          <option value="red">🔴 {s.redStatus}</option>
          <option value="yellow">🟡 {s.yellowStatus}</option>
        </select>
        {role !== 'trainer' && (
          <select value={fSport} onChange={e=>setFSport(e.target.value)} style={{ ...selSt, minWidth:180 }}>
            <option value="all">{s.filterSport}</option>
            {t.sports.map((sp,i) => <option key={i} value={i}>{sp}</option>)}
          </select>
        )}
        {(search||fStatus!=='all'||fSport!=='all') && (
          <button onClick={()=>{setSearch('');setFStatus('all');setFSport('all');}}
            style={{ height:36, padding:'0 12px', border:'1px solid #E2E8F0', borderRadius:8, background:'transparent', color:'#94A3B8', fontSize:12.5, fontFamily:'inherit', cursor:'pointer' }}>
            Сбросить ×
          </button>
        )}
      </div>

      {/* Active cases table */}
      <div style={{ background:'#fff', border:'1px solid #E2E8F0', borderRadius:12, overflow:'hidden' }}>
        {/* Head */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 180px 1fr 148px 110px 80px', padding:'0 20px', background:'#F8FAFC', borderBottom:'1px solid #E2E8F0' }}>
          {[s.colStudent, s.colSport, s.colDesc, s.colStatus, s.colDate, s.colActions].map((col,i) => (
            <div key={i} style={{ padding:'9px 0', fontSize:11, fontWeight:600, color:'#94A3B8', textTransform:'uppercase', letterSpacing:0.5 }}>{col}</div>
          ))}
        </div>
        {/* Rows */}
        <div style={{ maxHeight:440, overflowY:'auto' }}>
          {active.length === 0
            ? <div style={{ padding:'56px', textAlign:'center', color:'#94A3B8', fontSize:13 }}>{s.activeEmpty}</div>
            : active.map(c => (
                <MedRow key={c.id} c={c} s={s} sports={t.sports} canEdit={canEdit}
                  onArchive={()=>setPendingArchive(c)} onStudentClick={onStudentClick} />
              ))
          }
        </div>
      </div>

      {/* Archive toggle */}
      <div>
        <button onClick={()=>setShowArchive(!showArchive)} style={{
          display:'flex', alignItems:'center', gap:8, padding:'10px 16px',
          border:'1px solid #E2E8F0', borderRadius:10, background:'#fff',
          color:'#475569', fontSize:13, fontFamily:'inherit', cursor:'pointer',
          width:'100%', justifyContent:'space-between',
        }}>
          <span style={{ fontWeight:500 }}>{showArchive ? s.hideArchive : s.showArchive} ({archiveList.length})</span>
          <span style={{ fontSize:12, transform:showArchive?'rotate(180deg)':'none', transition:'transform .2s', display:'inline-block' }}>▾</span>
        </button>

        {showArchive && (
          <div style={{ marginTop:10, background:'#fff', border:'1px solid #E2E8F0', borderRadius:12, overflow:'hidden' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 180px 1fr 148px 110px 110px', padding:'0 20px', background:'#F8FAFC', borderBottom:'1px solid #E2E8F0' }}>
              {[s.colStudent, s.colSport, s.colDesc, s.colStatus, s.colDate, s.closedDate].map((col,i)=>(
                <div key={i} style={{ padding:'9px 0', fontSize:11, fontWeight:600, color:'#94A3B8', textTransform:'uppercase', letterSpacing:0.5 }}>{col}</div>
              ))}
            </div>
            {archiveList.length === 0
              ? <div style={{ padding:'40px', textAlign:'center', color:'#94A3B8', fontSize:13 }}>{s.archiveEmpty}</div>
              : archiveList.map(c => <ArchiveRow key={c.id} c={c} s={s} sports={t.sports} />)
            }
          </div>
        )}
      </div>

      {showAdd && <AddMedModal onClose={()=>setShowAdd(false)} sports={t.sports} s={s} />}
      {pendingArchive && (
        <ConfirmArchiveModal
          c={pendingArchive} s={s}
          onConfirm={() => {
            setArchived(p => [...p, pendingArchive.id]);
            setPendingArchive(null);
            window.TOAST?.show('Запись закрыта и перемещена в архив');
          }}
          onCancel={() => setPendingArchive(null)}
        />
      )}
    </div>
  );
}

/* ─── TABLE ROW (active) ──────────────────────────────────────── */
function MedRow({ c, s, sports, canEdit, onArchive, onStudentClick }) {
  const [hov, setHov] = useStM(false);
  const isRed = c.status === 'red';
  return (
    <div
      style={{ display:'grid', gridTemplateColumns:'1fr 180px 1fr 148px 110px 80px', padding:'0 20px', borderBottom:'1px solid #F1F5F9', borderLeft:`3px solid ${isRed?'#DC2626':'#D97706'}`, alignItems:'center', background:hov?'#FAFBFD':'transparent', transition:'background .1s' }}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
    >
      {/* Student */}
      <div style={{ padding:'10px 0', display:'flex', alignItems:'center', gap:10, minWidth:0 }}>
        <div style={{ width:32, height:32, borderRadius:'50%', background:avaC(c.stuId), display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:11, fontWeight:600, flexShrink:0 }}>
          {inits(c.stuName)}
        </div>
        <div style={{ minWidth:0 }}>
          <div onClick={() => onStudentClick && onStudentClick(c.stuId)}
            style={{ fontSize:13, fontWeight:500, color:'#0F172A', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', cursor: onStudentClick ? 'pointer' : 'default', transition:'color .1s' }}
            onMouseEnter={e => { if (onStudentClick) e.currentTarget.style.color='#0055A4'; }}
            onMouseLeave={e => e.currentTarget.style.color='#0F172A'}
          >{c.stuName}</div>
          <div style={{ fontSize:11, color:'#94A3B8' }}>{c.group}</div>
        </div>
      </div>
      {/* Sport */}
      <div style={{ fontSize:13, color:'#475569', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{sports[c.si]}</div>
      {/* Desc */}
      <div style={{ fontSize:13, color:'#0F172A', paddingRight:12 }}>{c.desc}
        {c.doc && <span style={{ marginLeft:6, fontSize:11, color:'#94A3B8' }}>📄</span>}
      </div>
      {/* Status */}
      <div>
        <span style={{ fontSize:11, fontWeight:600, padding:'3px 10px', borderRadius:20, background:isRed?'#FEF2F2':'#FFFBEB', color:isRed?'#DC2626':'#D97706', whiteSpace:'nowrap' }}>
          {isRed ? `🔴 ${s.redStatus}` : `🟡 ${s.yellowStatus}`}
        </span>
      </div>
      {/* Date */}
      <div style={{ fontSize:12, color:'#94A3B8' }}>{c.date}</div>
      {/* Actions */}
      <div style={{ opacity: hov&&canEdit ? 1 : 0, transition:'opacity .15s' }}>
        <button onClick={onArchive} style={{ fontSize:11, padding:'4px 10px', border:'1px solid #E2E8F0', borderRadius:6, background:'#fff', color:'#64748B', fontFamily:'inherit', cursor:'pointer' }}>
          {s.archiveBtn}
        </button>
      </div>
    </div>
  );
}

/* ─── TABLE ROW (archive) ─────────────────────────────────────── */
function ArchiveRow({ c, s, sports }) {
  const isRed = c.status === 'red';
  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 180px 1fr 148px 110px 110px', padding:'0 20px', borderBottom:'1px solid #F1F5F9', alignItems:'center', opacity:0.6 }}>
      <div style={{ padding:'9px 0', display:'flex', alignItems:'center', gap:10, minWidth:0 }}>
        <div style={{ width:28, height:28, borderRadius:'50%', background:avaC(c.stuId), display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:10, fontWeight:600, flexShrink:0 }}>{inits(c.stuName)}</div>
        <div style={{ fontSize:13, color:'#475569', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{c.stuName}</div>
      </div>
      <div style={{ fontSize:13, color:'#475569' }}>{sports[c.si]}</div>
      <div style={{ fontSize:13, color:'#475569', textDecoration:'line-through' }}>{c.desc}</div>
      <div>
        <span style={{ fontSize:10, padding:'2px 8px', borderRadius:10, background:'#F1F5F9', color:'#94A3B8', fontWeight:600 }}>
          {isRed ? s.redStatus : s.yellowStatus}
        </span>
      </div>
      <div style={{ fontSize:12, color:'#94A3B8' }}>{c.date}</div>
      <div style={{ fontSize:12, color:'#15803D', fontWeight:500 }}>✓ {c.closedDate}</div>
    </div>
  );
}

Object.assign(window, { MedicalPage });
