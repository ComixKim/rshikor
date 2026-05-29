// achievements.jsx — Раздел «Достижения»
// Exports: AchievementsPage → window

const { useState: useStA, useMemo: useSmA } = React;

/* ─── MOCK DATA ───────────────────────────────────────────────── */
const ACH_DATA = [
  {id:1,  stuId:1,  name:'Арман Сулейменов',  si:4,  group:'Бокс-А',   comp:'Чемпионат РК 2026',        medal:'gold',   place:'1', date:'15.05.2026'},
  {id:2,  stuId:12, name:'Нурлан Бейсембаев', si:4,  group:'Бокс-А',   comp:'Первенство РК 2026',        medal:'gold',   place:'1', date:'20.04.2026'},
  {id:3,  stuId:2,  name:'Малика Жанасова',   si:0,  group:'Дзюдо-А',  comp:'Кубок Азии 2026',           medal:'silver', place:'2', date:'10.05.2026'},
  {id:4,  stuId:3,  name:'Ержан Касымов',     si:9,  group:'Тхэк-А',   comp:'Чемпионат Азии 2026',       medal:'bronze', place:'3', date:'05.05.2026'},
  {id:5,  stuId:4,  name:'Сабина Нурланова',  si:12, group:'Гимн-А',   comp:'Кубок РК 2026',             medal:'gold',   place:'1', date:'28.04.2026'},
  {id:6,  stuId:5,  name:'Даниил Ким',        si:11, group:'Фехт-А',   comp:'Первенство РК 2026',        medal:'silver', place:'2', date:'20.04.2026'},
  {id:7,  stuId:11, name:'Серик Ахметов',     si:4,  group:'Бокс-Б',   comp:'Кубок РК 2026',             medal:'bronze', place:'3', date:'12.05.2026'},
  {id:8,  stuId:16, name:'Алтын Жумабаев',    si:4,  group:'Бокс-В',   comp:'Кубок Алматы 2026',         medal:'silver', place:'2', date:'10.04.2026'},
  {id:9,  stuId:17, name:'Берик Садыков',     si:4,  group:'Бокс-В',   comp:'Кубок Алматы 2026',         medal:'bronze', place:'3', date:'10.04.2026'},
  {id:10, stuId:8,  name:'Нурлан Асанов',     si:0,  group:'Дзюдо-Б',  comp:'Первенство Азии 2026',      medal:'bronze', place:'3', date:'02.04.2026'},
  {id:11, stuId:22, name:'Дильназ Нурова',    si:0,  group:'Дзюдо-А',  comp:'Кубок РК 2026',             medal:'silver', place:'2', date:'15.03.2026'},
  {id:12, stuId:9,  name:'Айгерим Бекова',    si:5,  group:'Плав-А',   comp:'Чемпионат РК 2026',         medal:'silver', place:'2', date:'20.03.2026'},
  {id:13, stuId:20, name:'Жазира Токтарова',  si:5,  group:'Плав-Б',   comp:'Первенство РК 2026',        medal:'bronze', place:'3', date:'18.03.2026'},
  {id:14, stuId:14, name:'Бауыржан Досов',    si:9,  group:'Тхэк-Б',   comp:'Кубок РК 2026',             medal:'bronze', place:'3', date:'12.03.2026'},
  {id:15, stuId:21, name:'Санжар Байжанов',   si:8,  group:'Баск-А',   comp:'Первенство РК 2026',        medal:'silver', place:'2', date:'05.03.2026'},
  {id:16, stuId:25, name:'Дамир Алиев',       si:10, group:'Вело-А',   comp:'Кубок РК 2026',             medal:'bronze', place:'3', date:'28.02.2026'},
  {id:17, stuId:4,  name:'Сабина Нурланова',  si:12, group:'Гимн-А',   comp:'Первенство РК 2026',        medal:'silver', place:'2', date:'10.02.2026'},
  {id:18, stuId:7,  name:'Диана Сейткали',    si:12, group:'Гимн-А',   comp:'Кубок Алматы 2026',         medal:'gold',   place:'1', date:'25.01.2026'},
  {id:19, stuId:1,  name:'Арман Сулейменов',  si:4,  group:'Бокс-А',   comp:'Зимнее первенство РК 2025', medal:'gold',   place:'1', date:'10.12.2025'},
  {id:20, stuId:2,  name:'Малика Жанасова',   si:0,  group:'Дзюдо-А',  comp:'Чемпионат РК 2025',         medal:'gold',   place:'1', date:'15.11.2025'},
  {id:21, stuId:3,  name:'Ержан Касымов',     si:9,  group:'Тхэк-А',   comp:'Кубок РК 2025',             medal:'silver', place:'2', date:'20.10.2025'},
  {id:22, stuId:5,  name:'Даниил Ким',        si:11, group:'Фехт-А',   comp:'Чемпионат РК 2025',         medal:'bronze', place:'3', date:'05.10.2025'},
];

/* ─── I18N ────────────────────────────────────────────────────── */
const ASTR = {
  ru: {
    addBtn:'Добавить достижение',
    allSports:'Все виды спорта', allMedals:'Все медали', allYears:'Все годы',
    reset:'Сбросить',
    gold:'Золото', silver:'Серебро', bronze:'Бронза', none:'Без медали',
    colAthlete:'Спортсмен', colSport:'Вид спорта', colComp:'Соревнование', colMedal:'Медаль', colPlace:'Место', colDate:'Дата',
    total:'Всего достижений',
    empty:'Нет достижений по выбранным фильтрам',
    addTitle:'Добавить достижение',
    fStudent:'Спортсмен', fComp:'Название соревнования', fDate:'Дата проведения',
    fMedal:'Медаль', fPlace:'Место / результат', fCert:'Сертификат / фото',
    certPh:'Номер сертификата или ссылка', placePh:'1, 2, 3 или текст',
    save:'Сохранить', cancel:'Отмена',
  },
  kz: {
    addBtn:'Жетістік қосу',
    allSports:'Барлық спорт', allMedals:'Барлық медаль', allYears:'Барлық жыл',
    reset:'Тазарту',
    gold:'Алтын', silver:'Күміс', bronze:'Қола', none:'Медальсіз',
    colAthlete:'Спортшы', colSport:'Спорт түрі', colComp:'Жарыс', colMedal:'Медаль', colPlace:'Орын', colDate:'Күні',
    total:'Жетістіктер барлығы',
    empty:'Таңдалған сүзгілер бойынша жетістіктер жоқ',
    addTitle:'Жетістік қосу',
    fStudent:'Спортшы', fComp:'Жарыс атауы', fDate:'Өткізілген күні',
    fMedal:'Медаль', fPlace:'Орын / нәтиже', fCert:'Сертификат / фото',
    certPh:'Сертификат нөмірі немесе сілтеме', placePh:'1, 2, 3 немесе мәтін',
    save:'Сақтау', cancel:'Болдырмау',
  },
};

/* ─── HELPERS ─────────────────────────────────────────────────── */
const AVA_CA = ['#1D2B4F','#0055A4','#1A5C2D','#7C3AED','#BE185D','#B45309','#0E7490','#065F46'];
function avaCa(id) { return AVA_CA[id % AVA_CA.length]; }
function initA(name) { return name.split(' ').slice(0,2).map(w=>w[0]).join(''); }
function yearOf(date) { return date.split('.')[2]; }

const MEDAL_CFG = {
  gold:   { color:'#F59E0B', bg:'#FFFBEB', border:'#FDE68A', icon:'🥇', rank:1 },
  silver: { color:'#64748B', bg:'#F8FAFC', border:'#E2E8F0', icon:'🥈', rank:2 },
  bronze: { color:'#92400E', bg:'#FEF3C7', border:'#FDE68A', icon:'🥉', rank:3 },
  none:   { color:'#94A3B8', bg:'#F8FAFC', border:'#E2E8F0', icon:'—',  rank:4 },
};

/* ─── STAT BAR ────────────────────────────────────────────────── */
function AchStatBar({ data, year, s }) {
  const yearData = year === 'all' ? data : data.filter(a => yearOf(a.date) === year);
  const counts = { gold:0, silver:0, bronze:0 };
  yearData.forEach(a => { if (counts[a.medal] !== undefined) counts[a.medal]++; });
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:14 }}>
      {[
        ['gold',   counts.gold,   s.gold],
        ['silver', counts.silver, s.silver],
        ['bronze', counts.bronze, s.bronze],
      ].map(([m, n, label]) => {
        const cfg = MEDAL_CFG[m];
        return (
          <div key={m} style={{ background:cfg.bg, border:`1px solid ${cfg.border}`, borderRadius:12, padding:'16px 20px', display:'flex', alignItems:'center', gap:14 }}>
            <span style={{ fontSize:28, lineHeight:1 }}>{cfg.icon}</span>
            <div>
              <div style={{ fontSize:34, fontWeight:800, color:cfg.color, lineHeight:1, letterSpacing:-1 }}>{n}</div>
              <div style={{ fontSize:12, color:cfg.color+'99', fontWeight:500, marginTop:2 }}>{label}</div>
            </div>
          </div>
        );
      })}
      <div style={{ background:'#fff', border:'1px solid #E2E8F0', borderRadius:12, padding:'16px 20px', display:'flex', alignItems:'center', gap:14 }}>
        <span style={{ width:42, height:42, borderRadius:10, background:'#F1F5F9', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>🏆</span>
        <div>
          <div style={{ fontSize:34, fontWeight:800, color:'#0F172A', lineHeight:1, letterSpacing:-1 }}>{yearData.length}</div>
          <div style={{ fontSize:12, color:'#94A3B8', fontWeight:500, marginTop:2 }}>{s.total}</div>
        </div>
      </div>
    </div>
  );
}

/* ─── ACH FILE UPLOAD ─────────────────────────────────────────── */
function AchFileUpload({ hint, accept, onChange }) {
  const [filename, setFilename] = React.useState('');
  const [preview,  setPreview]  = React.useState(null);
  const [drag,     setDrag]     = React.useState(false);
  const ref = React.useRef();

  const process = file => {
    if (!file) return;
    setFilename(file.name);
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = ev => setPreview(ev.target.result);
      reader.readAsDataURL(file);
    } else { setPreview(null); }
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
          border: `2px dashed ${drag ? '#F59E0B' : filename ? '#FDE68A' : '#E2E8F0'}`,
          borderRadius: 8, padding: '11px 14px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 12,
          background: drag ? '#FFFBEB' : filename ? '#FEFCE8' : '#fff',
          transition: 'all .15s',
        }}
        onMouseEnter={e => { if (!drag && !filename) e.currentTarget.style.borderColor = '#FDE68A'; }}
        onMouseLeave={e => { if (!drag && !filename) e.currentTarget.style.borderColor = '#E2E8F0'; }}
      >
        {preview
          ? <img src={preview} alt="" style={{ width:42, height:42, objectFit:'cover', borderRadius:6, flexShrink:0, border:'1px solid #FDE68A' }} />
          : <div style={{ width:40, height:40, borderRadius:8, background:'#FFFBEB', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>
              {filename ? '🏅' : '📎'}
            </div>
        }
        <div style={{ minWidth:0 }}>
          <div style={{ fontSize:13, fontWeight:500, color: filename ? '#0F172A' : '#94A3B8', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
            {filename || hint}
          </div>
          <div style={{ fontSize:11, color:'#94A3B8', marginTop:2 }}>
            {filename ? 'Нажмите чтобы изменить · можно перетащить' : 'Нажмите или перетащите файл сюда'}
          </div>
        </div>
        {filename && (
          <button onClick={e => { e.stopPropagation(); setFilename(''); setPreview(null); onChange && onChange(null); }}
            style={{ marginLeft:'auto', flexShrink:0, width:22, height:22, border:'none', borderRadius:'50%', background:'#FEF3C7', color:'#92400E', fontSize:12, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
            ✕
          </button>
        )}
      </div>
    </>
  );
}

/* ─── ADD MODAL ───────────────────────────────────────────────── */
const achInpSt = window.SHARED.inputStyle;

function AFLabel({ label, req, children }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
      <label style={{ fontSize:12, fontWeight:500, color:'#475569' }}>{label}{req&&<span style={{color:'#DC2626',marginLeft:2}}>*</span>}</label>
      {children}
    </div>
  );
}

function AddAchModal({ onClose, sports, s }) {
  const [f, setF] = useStA({ stuId:'1', comp:'', date:'26.05.2026', medal:'gold', place:'1', cert:null });
  const upd = (k,v) => setF(p=>({...p,[k]:v}));
  const stuOpts = ACH_DATA.filter((a,i,arr)=>arr.findIndex(b=>b.stuId===a.stuId)===i).map(a=>({id:a.stuId,name:a.name,si:a.si,group:a.group}));

  return (
    <>
      <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(15,23,42,0.4)', zIndex:902, backdropFilter:'blur(2px)' }} />
      <div style={{ position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:500, background:'#fff', borderRadius:16, zIndex:903, boxShadow:'0 24px 60px rgba(0,0,0,0.18)', maxHeight:'88vh', display:'flex', flexDirection:'column', overflow:'hidden' }}>
        <div style={{ padding:'18px 24px', borderBottom:'1px solid #E2E8F0', display:'flex', justifyContent:'space-between', alignItems:'center', flexShrink:0 }}>
          <div style={{ fontWeight:700, fontSize:16, color:'#0F172A' }}>{s.addTitle}</div>
          <button onClick={onClose} style={{ width:28, height:28, border:'1px solid #E2E8F0', borderRadius:6, background:'transparent', color:'#94A3B8', cursor:'pointer', fontSize:14 }}>✕</button>
        </div>
        <div style={{ padding:'20px 24px', overflowY:'auto', display:'flex', flexDirection:'column', gap:14 }}>
          <AFLabel label={s.fStudent} req>
            <select value={f.stuId} onChange={e=>upd('stuId',e.target.value)} style={achInpSt}>
              {stuOpts.map(st=><option key={st.id} value={st.id}>{st.name} — {sports[st.si]}, {st.group}</option>)}
            </select>
          </AFLabel>
          <AFLabel label={s.fComp} req>
            <input value={f.comp} onChange={e=>upd('comp',e.target.value)} placeholder="Чемпионат РК 2026" style={achInpSt} />
          </AFLabel>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <AFLabel label={s.fDate} req>
              <input value={f.date} onChange={e=>upd('date',e.target.value)} placeholder="ДД.ММ.ГГГГ" style={achInpSt} />
            </AFLabel>
            <AFLabel label={s.fPlace} req>
              <input value={f.place} onChange={e=>upd('place',e.target.value)} placeholder={s.placePh} style={achInpSt} />
            </AFLabel>
          </div>
          <AFLabel label={s.fMedal} req>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
              {['gold','silver','bronze','none'].map(m => {
                const cfg = MEDAL_CFG[m];
                const active = f.medal === m;
                return (
                  <button key={m} onClick={()=>upd('medal',m)} style={{
                    padding:'10px 6px', border:`2px solid ${active ? cfg.color : '#E2E8F0'}`,
                    borderRadius:10, background: active ? cfg.bg : '#fff',
                    color: active ? cfg.color : '#94A3B8', fontFamily:'inherit',
                    fontSize:12, fontWeight: active ? 600 : 400, cursor:'pointer',
                    display:'flex', flexDirection:'column', alignItems:'center', gap:4,
                    transition:'all .12s',
                  }}>
                    <span style={{ fontSize:20 }}>{cfg.icon}</span>
                    <span>{s[m]}</span>
                  </button>
                );
              })}
            </div>
          </AFLabel>
          <AFLabel label={s.fCert}>
            <AchFileUpload hint="Фото диплома, сертификата — JPG, PNG, PDF" accept="image/*,.pdf" onChange={file => upd('cert', file)} />
          </AFLabel>
        </div>
        <div style={{ padding:'14px 24px', borderTop:'1px solid #E2E8F0', display:'flex', gap:10, justifyContent:'flex-end', flexShrink:0 }}>
          <button onClick={onClose} style={{ padding:'8px 20px', border:'1px solid #E2E8F0', borderRadius:8, background:'transparent', color:'#64748B', fontSize:13, fontFamily:'inherit', cursor:'pointer' }}>{s.cancel}</button>
          <button onClick={() => { window.TOAST?.show('Достижение добавлено'); onClose(); }} style={{ padding:'8px 20px', border:'none', borderRadius:8, background:'#0055A4', color:'#fff', fontWeight:600, fontSize:13, fontFamily:'inherit', cursor:'pointer' }}>{s.save}</button>
        </div>
      </div>
    </>
  );
}

/* ─── ACHIEVEMENTS PAGE ───────────────────────────────────────── */
function AchievementsPage({ t, role, lang, activeSport, onClearSport, onStudentClick }) {
  const s = ASTR[lang] || ASTR.ru;
  const TRAINER_SPORT = 4;
  const base = role === 'trainer' ? ACH_DATA.filter(a=>a.si===TRAINER_SPORT) : ACH_DATA;

  const years = [...new Set(ACH_DATA.map(a=>yearOf(a.date)))].sort().reverse();

  const [search,  setSearch]  = useStA('');
  const [fSport,  setFSport]  = useStA('all');

  // Синхронизация с глобальным фильтром из сайдбара
  React.useEffect(() => {
    if (role === 'trainer') return;
    setFSport(activeSport !== null && activeSport !== undefined ? String(activeSport) : 'all');
  }, [activeSport]);
  const [fMedal,  setFMedal]  = useStA('all');
  const [fYear,   setFYear]   = useStA('all');
  const [showAdd, setShowAdd] = useStA(false);

  const filtered = useSmA(() => base
    .filter(a => !search || a.name.toLowerCase().includes(search.toLowerCase()))
    .filter(a => fSport !== 'all' ? a.si === Number(fSport) : true)
    .filter(a => fMedal !== 'all' ? a.medal === fMedal : true)
    .filter(a => fYear  !== 'all' ? yearOf(a.date) === fYear : true)
  , [base, search, fSport, fMedal, fYear]);

  const hasFilter = search||fSport!=='all'||fMedal!=='all'||fYear!=='all';
  const canEdit = role === 'admin' || role === 'trainer';
  const selSt = window.SHARED.selectStyle;

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:18 }}>

      {/* Stat bar */}
      <AchStatBar data={filtered} year={fYear} s={s} />

      {/* Filters */}
      <div style={{ display:'flex', gap:10, flexWrap:'wrap', alignItems:'center' }}>
        <div style={{ position:'relative', flex:'1 1 200px', minWidth:0 }}>
          <span style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:'#94A3B8', pointerEvents:'none' }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="7" cy="7" r="4.5"/><line x1="10.5" y1="10.5" x2="14" y2="14" strokeLinecap="round"/></svg>
          </span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск по спортсмену..."
            style={{ width:'100%', height:36, padding:'0 10px 0 32px', border:'1px solid #E2E8F0', borderRadius:8, fontSize:13, color:'#0F172A', fontFamily:'inherit', outline:'none', background:'#fff' }} />
        </div>
        {role !== 'trainer' && (
          <select value={fSport} onChange={e=>setFSport(e.target.value)} style={{ ...selSt, minWidth:180 }}>
            <option value="all">{s.allSports}</option>
            {t.sports.map((sp,i)=><option key={i} value={i}>{sp}</option>)}
          </select>
        )}
        <select value={fMedal} onChange={e=>setFMedal(e.target.value)} style={{ ...selSt, minWidth:150 }}>
          <option value="all">{s.allMedals}</option>
          <option value="gold">🥇 {s.gold}</option>
          <option value="silver">🥈 {s.silver}</option>
          <option value="bronze">🥉 {s.bronze}</option>
          <option value="none">— {s.none}</option>
        </select>
        <select value={fYear} onChange={e=>setFYear(e.target.value)} style={{ ...selSt, minWidth:120 }}>
          <option value="all">{s.allYears}</option>
          {years.map(y=><option key={y} value={y}>{y}</option>)}
        </select>
        {hasFilter && (
          <button onClick={()=>{setSearch('');setFSport('all');setFMedal('all');setFYear('all');}}
            style={{ height:36, padding:'0 12px', border:'1px solid #E2E8F0', borderRadius:8, background:'transparent', color:'#94A3B8', fontSize:12.5, fontFamily:'inherit', cursor:'pointer' }}>
            {s.reset} ×
          </button>
        )}
        <div style={{ flex:1 }} />
        {canEdit && (
          <button onClick={()=>setShowAdd(true)} style={{ display:'flex', alignItems:'center', gap:6, height:36, padding:'0 16px', border:'none', borderRadius:8, background:'#0055A4', color:'#fff', fontWeight:600, fontSize:13, fontFamily:'inherit', cursor:'pointer', whiteSpace:'nowrap' }}>
            <span style={{ fontSize:16 }}>+</span> {s.addBtn}
          </button>
        )}
      </div>

      {/* Table */}
      <div style={{ background:'#fff', border:'1px solid #E2E8F0', borderRadius:12, overflow:'hidden' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 160px 1fr 140px 70px 100px', padding:'0 20px', background:'#F8FAFC', borderBottom:'1px solid #E2E8F0' }}>
          {[s.colAthlete, s.colSport, s.colComp, s.colMedal, s.colPlace, s.colDate].map((col,i)=>(
            <div key={i} style={{ padding:'9px 0', fontSize:11, fontWeight:600, color:'#94A3B8', textTransform:'uppercase', letterSpacing:0.5 }}>{col}</div>
          ))}
        </div>
        <div style={{ maxHeight:480, overflowY:'auto' }}>
          {filtered.length === 0
            ? <div style={{ padding:'56px', textAlign:'center', color:'#94A3B8', fontSize:13 }}>{s.empty}</div>
            : filtered.map(a => <AchRow key={a.id} a={a} s={s} sports={t.sports} onStudentClick={onStudentClick} />)
          }
        </div>
      </div>

      {showAdd && <AddAchModal onClose={()=>setShowAdd(false)} sports={t.sports} s={s} />}
    </div>
  );
}

/* ─── TABLE ROW ───────────────────────────────────────────────── */
function AchRow({ a, s, sports, onStudentClick }) {
  const [hov, setHov] = useStA(false);
  const cfg = MEDAL_CFG[a.medal] || MEDAL_CFG.none;
  return (
    <div
      style={{ display:'grid', gridTemplateColumns:'1fr 160px 1fr 140px 70px 100px', padding:'0 20px', borderBottom:'1px solid #F1F5F9', alignItems:'center', background:hov?'#F8FAFC':'transparent', transition:'background .1s', borderLeft:`3px solid ${cfg.color}40` }}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
    >
      {/* Athlete */}
      <div style={{ padding:'10px 0', display:'flex', alignItems:'center', gap:10, minWidth:0 }}>
        <div style={{ width:32, height:32, borderRadius:'50%', background:avaCa(a.stuId), display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:11, fontWeight:600, flexShrink:0 }}>{initA(a.name)}</div>
        <div style={{ minWidth:0 }}>
          <div onClick={() => onStudentClick && onStudentClick(a.stuId)}
            style={{ fontSize:13, fontWeight:500, color:'#0F172A', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', cursor: onStudentClick ? 'pointer' : 'default', transition:'color .1s' }}
            onMouseEnter={e => { if (onStudentClick) e.currentTarget.style.color='#0055A4'; }}
            onMouseLeave={e => e.currentTarget.style.color='#0F172A'}
          >{a.name}</div>
          <div style={{ fontSize:11, color:'#94A3B8' }}>{a.group}</div>
        </div>
      </div>
      {/* Sport */}
      <div style={{ fontSize:13, color:'#475569', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', paddingRight:8 }}>{sports[a.si]}</div>
      {/* Competition */}
      <div style={{ fontSize:13, color:'#0F172A', paddingRight:8 }}>{a.comp}</div>
      {/* Medal */}
      <div>
        <span style={{ display:'inline-flex', alignItems:'center', gap:5, fontSize:11, fontWeight:600, padding:'3px 10px', borderRadius:20, background:cfg.bg, color:cfg.color, border:`1px solid ${cfg.border}`, whiteSpace:'nowrap' }}>
          <span>{cfg.icon}</span><span>{s[a.medal]}</span>
        </span>
      </div>
      {/* Place */}
      <div style={{ fontSize:15, fontWeight:700, color:cfg.color }}>{a.place}</div>
      {/* Date */}
      <div style={{ fontSize:12, color:'#94A3B8' }}>{a.date}</div>
    </div>
  );
}

Object.assign(window, { AchievementsPage });
