// schedule.jsx — Раздел «Расписание»
// Exports: SchedulePage → window

const { useState: useStSc, useMemo: useSmSc } = React;

/* ─── SPORT COLORS ────────────────────────────────────────────── */
const SPORT_COLORS = [
  '#0055A4','#1D2B4F','#2563EB','#7C3AED','#DC2626',
  '#0891B2','#06B6D4','#0E7490','#EA580C','#D97706',
  '#16A34A','#BE185D','#9333EA','#92400E',
];
const SPORT_LIGHT = [
  '#EFF6FF','#F1F5F9','#DBEAFE','#F5F3FF','#FEF2F2',
  '#ECFEFF','#CFFAFE','#F0FDFA','#FFF7ED','#FFFBEB',
  '#F0FDF4','#FDF2F8','#FAF5FF','#FEF3C7',
];

/* ─── MOCK SCHEDULE ───────────────────────────────────────────── */
const SCHED_DATA = [
  // Пн (0)
  {id:1,  si:4,  group:'Бокс-А',  day:0, start:'09:00', end:'11:00', hall:'Зал №3',         trainer:'А. Петров'},
  {id:2,  si:0,  group:'Дзюдо-А', day:0, start:'09:00', end:'11:00', hall:'Зал №1',         trainer:'Р. Имашев'},
  {id:3,  si:9,  group:'Тхэк-А',  day:0, start:'10:00', end:'12:00', hall:'Зал №2',         trainer:'К. Молдаев'},
  {id:4,  si:5,  group:'Плав-А',  day:0, start:'07:00', end:'09:00', hall:'Бассейн',        trainer:'Д. Кузнецов'},
  {id:5,  si:12, group:'Гимн-А',  day:0, start:'15:00', end:'17:00', hall:'Гимн. зал',      trainer:'Е. Романова'},
  {id:6,  si:1,  group:'ВБ-А',    day:0, start:'14:00', end:'16:00', hall:'Зал №1',         trainer:'Т. Жумагалиев'},
  // Вт (1)
  {id:7,  si:4,  group:'Бокс-Б',  day:1, start:'09:00', end:'11:00', hall:'Зал №3',         trainer:'А. Петров'},
  {id:8,  si:11, group:'Фехт-А',  day:1, start:'10:00', end:'12:00', hall:'Зал №4',         trainer:'И. Сергеев'},
  {id:9,  si:6,  group:'АртПл-А', day:1, start:'08:00', end:'10:00', hall:'Бассейн',        trainer:'М. Алиева'},
  {id:10, si:8,  group:'Баск-А',  day:1, start:'15:00', end:'17:00', hall:'Спортзал',       trainer:'Н. Захаров'},
  {id:11, si:2,  group:'ГРБ-А',   day:1, start:'14:00', end:'16:00', hall:'Зал №2',         trainer:'С. Байжанов'},
  // Ср (2)
  {id:12, si:4,  group:'Бокс-В',  day:2, start:'14:00', end:'16:00', hall:'Зал №3',         trainer:'А. Петров'},
  {id:13, si:0,  group:'Дзюдо-Б', day:2, start:'09:00', end:'11:00', hall:'Зал №1',         trainer:'Р. Имашев'},
  {id:14, si:9,  group:'Тхэк-Б',  day:2, start:'10:00', end:'12:00', hall:'Зал №2',         trainer:'К. Молдаев'},
  {id:15, si:7,  group:'ВП-А',    day:2, start:'16:00', end:'18:00', hall:'Бассейн',        trainer:'Б. Сатов'},
  {id:16, si:10, group:'Вело-А',  day:2, start:'09:00', end:'11:00', hall:'Велотрек',       trainer:'О. Власов'},
  // Чт (3)
  {id:17, si:4,  group:'Бокс-А',  day:3, start:'09:00', end:'11:00', hall:'Зал №3',         trainer:'А. Петров'},
  {id:18, si:12, group:'Гимн-А',  day:3, start:'15:00', end:'17:00', hall:'Гимн. зал',      trainer:'Е. Романова'},
  {id:19, si:3,  group:'ЖБ-А',    day:3, start:'10:00', end:'12:00', hall:'Зал №1',         trainer:'А. Нурова'},
  {id:20, si:5,  group:'Плав-Б',  day:3, start:'07:00', end:'09:00', hall:'Бассейн',        trainer:'Д. Кузнецов'},
  {id:21, si:13, group:'Греб-А',  day:3, start:'08:00', end:'10:00', hall:'Гребной канал',  trainer:'В. Матвеев'},
  // Пт (4)
  {id:22, si:4,  group:'Бокс-Б',  day:4, start:'14:00', end:'16:00', hall:'Зал №3',         trainer:'А. Петров'},
  {id:23, si:0,  group:'Дзюдо-А', day:4, start:'09:00', end:'11:00', hall:'Зал №1',         trainer:'Р. Имашев'},
  {id:24, si:8,  group:'Баск-А',  day:4, start:'15:00', end:'17:00', hall:'Спортзал',       trainer:'Н. Захаров'},
  {id:25, si:6,  group:'АртПл-А', day:4, start:'08:00', end:'10:00', hall:'Бассейн',        trainer:'М. Алиева'},
  {id:26, si:1,  group:'ВБ-А',    day:4, start:'14:00', end:'16:00', hall:'Зал №1',         trainer:'Т. Жумагалиев'},
  {id:27, si:11, group:'Фехт-А',  day:4, start:'10:00', end:'12:00', hall:'Зал №4',         trainer:'И. Сергеев'},
  // Сб (5)
  {id:28, si:4,  group:'Бокс-В',  day:5, start:'10:00', end:'12:00', hall:'Зал №3',         trainer:'А. Петров'},
  {id:29, si:2,  group:'ГРБ-А',   day:5, start:'10:00', end:'12:00', hall:'Зал №2',         trainer:'С. Байжанов'},
  {id:30, si:9,  group:'Тхэк-А',  day:5, start:'11:00', end:'13:00', hall:'Зал №2',         trainer:'К. Молдаев'},
  {id:31, si:10, group:'Вело-А',  day:5, start:'09:00', end:'11:00', hall:'Велотрек',       trainer:'О. Власов'},
];

/* ─── I18N ────────────────────────────────────────────────────── */
const SCSTR = {
  ru: {
    days: ['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье'],
    daysShort: ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],
    months: ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек'],
    today:'Сегодня', noSessions:'Нет тренировок', addBtn:'Добавить тренировку',
    sessions:'тренировок', session:'тренировка',
    addTitle:'Добавить тренировку',
    fSport:'Вид спорта', fGroup:'Группа', fTrainer:'Тренер',
    fDay:'День недели', fStart:'Начало', fEnd:'Конец', fHall:'Зал / место',
    save:'Сохранить', cancel:'Отмена',
    prevWeek:'← Предыдущая', nextWeek:'Следующая →',
    weekOf:'Неделя',
    viewWeek:'Неделя', viewDay:'День', allHalls:'Все залы',
    until:'до',
  },
  kz: {
    days: ['Дүйсенбі','Сейсенбі','Сәрсенбі','Бейсенбі','Жұма','Сенбі','Жексенбі'],
    daysShort: ['Дс','Сс','Ср','Бс','Жм','Сб','Жк'],
    months: ['қаң','ақп','нау','сәу','мам','мау','шіл','там','қыр','қаз','қар','жел'],
    today:'Бүгін', noSessions:'Жаттығулар жоқ', addBtn:'Жаттығу қосу',
    sessions:'жаттығу', session:'жаттығу',
    addTitle:'Жаттығу қосу',
    fSport:'Спорт түрі', fGroup:'Топ', fTrainer:'Жаттықтырушы',
    fDay:'Апта күні', fStart:'Басталуы', fEnd:'Аяқталуы', fHall:'Зал / орын',
    save:'Сақтау', cancel:'Болдырмау',
    prevWeek:'← Алдыңғы', nextWeek:'Келесі →',
    weekOf:'Апта',
    viewWeek:'Апта', viewDay:'Күн', allHalls:'Барлық залдар',
    until:'дейін',
  },
};

/* ─── HELPERS ─────────────────────────────────────────────────── */
function getMondayOf(weekOffset) {
  // Base week: Mon May 25, 2026
  const base = new Date(2026, 4, 25); // month is 0-indexed
  base.setDate(base.getDate() + weekOffset * 7);
  return base;
}

function getDayDate(monday, dayIdx) {
  const d = new Date(monday);
  d.setDate(d.getDate() + dayIdx);
  return d;
}

function isToday(date) {
  return date.getFullYear() === 2026 && date.getMonth() === 4 && date.getDate() === 26; // May 26 2026
}

/* ─── SESSION CARD ────────────────────────────────────────────── */
function SessionCard({ session, sports, showTrainer, onEdit, canEdit }) {
  const [hov, setHov] = useStSc(false);
  const c  = SPORT_COLORS[session.si] || '#0055A4';
  const bg = SPORT_LIGHT[session.si] || '#EFF6FF';
  return (
    <div
      style={{ background: hov ? bg : '#fff', border:`1px solid ${hov ? c+'40' : '#E2E8F0'}`, borderLeft:`3px solid ${c}`, borderRadius:8, padding:'10px 12px', cursor: canEdit ? 'pointer' : 'default', transition:'all .12s', marginBottom:6 }}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      onClick={canEdit ? onEdit : undefined}
    >
      <div style={{ fontSize:13, fontWeight:600, color:'#0F172A', marginBottom:3 }}>{session.group}</div>
      <div style={{ fontSize:12, color:'#475569', fontWeight:500 }}>{session.start} – {session.end}</div>
      <div style={{ fontSize:11, color:'#94A3B8', marginTop:2 }}>{session.hall}</div>
      {showTrainer && <div style={{ fontSize:11, color:c, marginTop:2, fontWeight:500 }}>{session.trainer}</div>}
      <div style={{ display:'inline-block', marginTop:4, fontSize:10, padding:'1px 7px', borderRadius:10, background:`${c}15`, color:c, fontWeight:500 }}>{sports[session.si]}</div>
    </div>
  );
}

/* ─── DAY COLUMN ──────────────────────────────────────────────── */
function DayColumn({ dayIdx, date, sessions, sports, s, role, onAdd, todayFlag }) {
  const showTrainer = role !== 'trainer';
  const canEdit = role === 'admin';
  const sorted = [...sessions].sort((a,b) => a.start.localeCompare(b.start));
  const isWeekend = dayIdx >= 5;

  return (
    <div style={{ display:'flex', flexDirection:'column', minWidth:186 }}>
      {/* Day Header */}
      <div style={{
        padding:'10px 12px', borderRadius:'10px 10px 0 0', marginBottom:0,
        background: todayFlag ? '#1D2B4F' : isWeekend ? '#F8FAFC' : '#fff',
        border:`1px solid ${todayFlag ? '#1D2B4F' : '#E2E8F0'}`,
        borderBottom: 'none', textAlign:'center',
      }}>
        <div style={{ fontSize:11, fontWeight:600, letterSpacing:0.5, color: todayFlag ? '#FFCF00' : '#94A3B8', textTransform:'uppercase' }}>
          {s.daysShort[dayIdx]}
        </div>
        <div style={{ fontSize:20, fontWeight:800, color: todayFlag ? '#fff' : '#0F172A', lineHeight:1.2, marginTop:2 }}>
          {date.getDate()}
        </div>
        <div style={{ fontSize:10, color: todayFlag ? 'rgba(255,255,255,0.5)' : '#94A3B8', marginTop:1 }}>
          {date.getDate() === 26 && date.getMonth() === 4 ? (
            <span style={{ fontSize:9, background:'#FFCF00', color:'#1D2B4F', padding:'1px 5px', borderRadius:4, fontWeight:700 }}>{s.today}</span>
          ) : `${s.months[date.getMonth()]}`}
        </div>
      </div>

      {/* Sessions */}
      <div style={{
        flex:1, padding:'10px 10px', border:'1px solid #E2E8F0', borderTop:'none',
        borderRadius:'0 0 10px 10px', background: isWeekend ? '#FAFBFD' : '#fff',
        minHeight:200,
      }}>
        {sorted.length === 0 ? (
          <div style={{ textAlign:'center', padding:'24px 8px', color:'#CBD5E1', fontSize:12 }}>
            {s.noSessions}
          </div>
        ) : sorted.map(sess => (
          <SessionCard key={sess.id} session={sess} sports={sports} showTrainer={showTrainer} canEdit={canEdit} onEdit={()=>{}} />
        ))}
        {canEdit && (
          <button onClick={()=>onAdd(dayIdx)} style={{
            width:'100%', padding:'7px', border:'1.5px dashed #E2E8F0', borderRadius:8,
            background:'transparent', color:'#CBD5E1', fontSize:12, fontFamily:'inherit',
            cursor:'pointer', marginTop:4, transition:'all .12s',
          }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor='#0055A4';e.currentTarget.style.color='#0055A4';}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor='#E2E8F0';e.currentTarget.style.color='#CBD5E1';}}
          >+ </button>
        )}
      </div>
    </div>
  );
}

/* ─── DAY VIEW ────────────────────────────────────────────────── */
function DayView({ dayIdx, date, sessions, sports, s, role, todayFlag, onAdd }) {
  const showTrainer = role !== 'trainer';
  const canEdit = role === 'admin';
  const sorted = [...sessions].sort((a, b) => a.start.localeCompare(b.start));

  return (
    <div style={{ background:'#fff', border:'1px solid #E2E8F0', borderRadius:12, overflow:'hidden' }}>
      {/* Day header */}
      <div style={{
        padding:'18px 28px', display:'flex', justifyContent:'space-between', alignItems:'center',
        background: todayFlag ? '#1D2B4F' : '#F8FAFC', borderBottom:'1px solid #E2E8F0',
      }}>
        <div style={{ display:'flex', alignItems:'baseline', gap:12 }}>
          <span style={{ fontSize:26, fontWeight:800, color: todayFlag ? '#fff' : '#0F172A', letterSpacing:-0.5 }}>
            {date.getDate()} {s.months[date.getMonth()]}
          </span>
          <span style={{ fontSize:14, fontWeight:600, color: todayFlag ? 'rgba(255,255,255,0.55)' : '#94A3B8', textTransform:'uppercase', letterSpacing:0.5 }}>
            {s.days[dayIdx]}
          </span>
          {todayFlag && (
            <span style={{ fontSize:11, background:'#FFCF00', color:'#1D2B4F', padding:'2px 9px', borderRadius:6, fontWeight:700 }}>{s.today}</span>
          )}
        </div>
        <div style={{ fontSize:13, fontWeight:500, color: todayFlag ? 'rgba(255,255,255,0.5)' : '#94A3B8' }}>
          {sorted.length} {s.sessions}
        </div>
      </div>

      {/* Sessions */}
      <div style={{ padding:'16px 24px', display:'flex', flexDirection:'column', gap:10, minHeight:200 }}>
        {sorted.length === 0 ? (
          <div style={{ textAlign:'center', padding:'56px 0', color:'#94A3B8', fontSize:13 }}>{s.noSessions}</div>
        ) : sorted.map(sess => {
          const c  = SPORT_COLORS[sess.si] || '#0055A4';
          const bg = SPORT_LIGHT[sess.si]  || '#EFF6FF';
          return (
            <div key={sess.id} style={{
              display:'flex', gap:0, border:`1px solid ${c}22`,
              borderLeft:`4px solid ${c}`, borderRadius:10,
              background: bg, overflow:'hidden',
            }}>
              {/* Time */}
              <div style={{ width:90, flexShrink:0, padding:'14px 14px', display:'flex', flexDirection:'column', justifyContent:'center', borderRight:`1px solid ${c}18` }}>
                <div style={{ fontSize:16, fontWeight:700, color:'#0F172A', lineHeight:1 }}>{sess.start}</div>
                <div style={{ fontSize:11, color:'#94A3B8', marginTop:4 }}>{s.until} {sess.end}</div>
              </div>
              {/* Info */}
              <div style={{ flex:1, padding:'12px 16px' }}>
                <div style={{ fontSize:14, fontWeight:600, color:'#0F172A', marginBottom:2 }}>{sess.group}</div>
                <div style={{ fontSize:12, color:'#475569' }}>{sports[sess.si]}</div>
                {showTrainer && (
                  <div style={{ fontSize:12, color:c, marginTop:3, fontWeight:500 }}>{sess.trainer}</div>
                )}
              </div>
              {/* Hall */}
              <div style={{ padding:'12px 18px', display:'flex', alignItems:'center', flexShrink:0 }}>
                <span style={{ fontSize:12, fontWeight:500, color:'#64748B', background:'rgba(255,255,255,0.7)', padding:'4px 10px', borderRadius:8, whiteSpace:'nowrap' }}>
                  {sess.hall}
                </span>
              </div>
            </div>
          );
        })}
        {canEdit && (
          <button onClick={() => onAdd && onAdd(dayIdx)} style={{
            padding:'12px', border:'1.5px dashed #E2E8F0', borderRadius:10,
            background:'transparent', color:'#CBD5E1', fontSize:13, fontFamily:'inherit',
            cursor:'pointer', width:'100%', transition:'all .12s',
          }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor='#0055A4';e.currentTarget.style.color='#0055A4';}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor='#E2E8F0';e.currentTarget.style.color='#CBD5E1';}}
          >+ {s.addBtn}</button>
        )}
      </div>
    </div>
  );
}

/* ─── ADD SESSION MODAL ───────────────────────────────────────── */
const scInpSt = window.SHARED.inputStyle;

function ScFLabel({ label, req, children }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
      <label style={{ fontSize:12, fontWeight:500, color:'#475569' }}>{label}{req&&<span style={{color:'#DC2626',marginLeft:2}}>*</span>}</label>
      {children}
    </div>
  );
}

function AddSessionModal({ onClose, defaultDay, sports, s }) {
  const [f, setF] = useStSc({ si:'0', group:'', trainer:'', day: String(defaultDay ?? 0), start:'09:00', end:'11:00', hall:'' });
  const upd = (k,v) => setF(p=>({...p,[k]:v}));
  return (
    <>
      <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(15,23,42,0.4)', zIndex:902, backdropFilter:'blur(2px)' }} />
      <div style={{ position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:480, background:'#fff', borderRadius:16, zIndex:903, boxShadow:'0 24px 60px rgba(0,0,0,0.18)', display:'flex', flexDirection:'column', overflow:'hidden' }}>
        <div style={{ padding:'18px 24px', borderBottom:'1px solid #E2E8F0', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ fontWeight:700, fontSize:16, color:'#0F172A' }}>{s.addTitle}</div>
          <button onClick={onClose} style={{ width:28, height:28, border:'1px solid #E2E8F0', borderRadius:6, background:'transparent', color:'#94A3B8', cursor:'pointer', fontSize:14 }}>✕</button>
        </div>
        <div style={{ padding:'20px 24px', display:'flex', flexDirection:'column', gap:14 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <ScFLabel label={s.fSport} req>
              <select value={f.si} onChange={e=>upd('si',e.target.value)} style={scInpSt}>
                {sports.map((sp,i)=><option key={i} value={i}>{sp}</option>)}
              </select>
            </ScFLabel>
            <ScFLabel label={s.fGroup} req><input value={f.group} onChange={e=>upd('group',e.target.value)} placeholder="Бокс-А" style={scInpSt} /></ScFLabel>
          </div>
          <ScFLabel label={s.fTrainer} req><input value={f.trainer} onChange={e=>upd('trainer',e.target.value)} placeholder="А. Петров" style={scInpSt} /></ScFLabel>
          <ScFLabel label={s.fDay} req>
            <select value={f.day} onChange={e=>upd('day',e.target.value)} style={scInpSt}>
              {s.days.map((d,i)=><option key={i} value={i}>{d}</option>)}
            </select>
          </ScFLabel>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <ScFLabel label={s.fStart} req><input value={f.start} onChange={e=>upd('start',e.target.value)} placeholder="09:00" style={scInpSt} /></ScFLabel>
            <ScFLabel label={s.fEnd}   req><input value={f.end}   onChange={e=>upd('end',  e.target.value)} placeholder="11:00" style={scInpSt} /></ScFLabel>
          </div>
          <ScFLabel label={s.fHall} req><input value={f.hall} onChange={e=>upd('hall',e.target.value)} placeholder="Зал №1" style={scInpSt} /></ScFLabel>
        </div>
        <div style={{ padding:'14px 24px', borderTop:'1px solid #E2E8F0', display:'flex', gap:10, justifyContent:'flex-end' }}>
          <button onClick={onClose} style={{ padding:'8px 20px', border:'1px solid #E2E8F0', borderRadius:8, background:'transparent', color:'#64748B', fontSize:13, fontFamily:'inherit', cursor:'pointer' }}>{s.cancel}</button>
          <button onClick={() => { window.TOAST?.show('Тренировка добавлена'); onClose(); }} style={{ padding:'8px 20px', border:'none', borderRadius:8, background:'#0055A4', color:'#fff', fontWeight:600, fontSize:13, fontFamily:'inherit', cursor:'pointer' }}>{s.save}</button>
        </div>
      </div>
    </>
  );
}

/* ─── SCHEDULE PAGE ───────────────────────────────────────────── */
function SchedulePage({ t, role, lang }) {
  const s = SCSTR[lang] || SCSTR.ru;
  const TRAINER_SPORT = 4;
  const [weekOffset, setWeekOffset] = useStSc(0);
  const [addDay,     setAddDay]     = useStSc(null);
  const [viewMode,   setViewMode]   = useStSc('week');   // 'week' | 'day'
  const [selDay,     setSelDay]     = useStSc(1);        // 1 = Tuesday (today)
  const [hallFilter, setHallFilter] = useStSc('all');

  const monday = getMondayOf(weekOffset);

  const base = role === 'trainer'
    ? SCHED_DATA.filter(sc => sc.si === TRAINER_SPORT)
    : SCHED_DATA;

  // Unique halls
  const halls = useSmSc(() =>
    [...new Set(SCHED_DATA.map(sc => sc.hall))].sort()
  , []);

  // Sessions filtered by hall
  const baseFiltered = useSmSc(() =>
    base.filter(sc => hallFilter === 'all' || sc.hall === hallFilter)
  , [base, hallFilter]);

  // Sessions by day
  const byDay = useSmSc(() => {
    const map = {};
    for (let i = 0; i < 7; i++) map[i] = [];
    baseFiltered.forEach(sc => { if (map[sc.day] !== undefined) map[sc.day].push(sc); });
    return map;
  }, [baseFiltered]);

  const totalCount = useSmSc(() =>
    Object.values(byDay).reduce((acc, arr) => acc + arr.length, 0)
  , [byDay]);

  // Week label
  const endDate  = getDayDate(monday, 6);
  const weekLabel = `${monday.getDate()} ${s.months[monday.getMonth()]} – ${endDate.getDate()} ${s.months[endDate.getMonth()]} ${endDate.getFullYear()}`;

  // Day navigation
  const goPrevDay = () => {
    if (selDay > 0) setSelDay(d => d - 1);
    else { setWeekOffset(w => w - 1); setSelDay(6); }
  };
  const goNextDay = () => {
    if (selDay < 6) setSelDay(d => d + 1);
    else { setWeekOffset(w => w + 1); setSelDay(0); }
  };

  const selDayDate  = getDayDate(monday, selDay);
  const selDayLabel = `${selDayDate.getDate()} ${s.months[selDayDate.getMonth()]} ${selDayDate.getFullYear()}`;

  const selSt = window.SHARED.selectStyle;
  const btnBase = { height:34, padding:'0 14px', border:'1px solid #E2E8F0', borderRadius:8, background:'transparent', color:'#475569', fontSize:13, fontFamily:'inherit', cursor:'pointer' };

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>

      {/* Navigation bar */}
      <div style={{ display:'flex', alignItems:'center', gap:10, background:'#fff', border:'1px solid #E2E8F0', borderRadius:12, padding:'12px 20px', flexWrap:'wrap' }}>

        {/* View toggle */}
        <div style={{ display:'flex', background:'#F0F2F7', borderRadius:8, padding:3, gap:2, flexShrink:0 }}>
          {[['week', s.viewWeek],['day', s.viewDay]].map(([mode, label]) => (
            <button key={mode} onClick={() => setViewMode(mode)} style={{
              padding:'5px 14px', border:'none', borderRadius:6,
              background: viewMode===mode ? '#fff' : 'transparent',
              color: viewMode===mode ? '#0F172A' : '#94A3B8',
              fontWeight: viewMode===mode ? 600 : 400,
              fontSize:12.5, fontFamily:'inherit', cursor:'pointer',
              boxShadow: viewMode===mode ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition:'all .12s',
            }}>{label}</button>
          ))}
        </div>

        <div style={{ width:1, height:22, background:'#E2E8F0', flexShrink:0 }} />

        {/* Prev */}
        <button onClick={viewMode==='week' ? ()=>setWeekOffset(w=>w-1) : goPrevDay} style={btnBase}>←</button>

        {/* Label */}
        <div style={{ flex:1, textAlign:'center', minWidth:200 }}>
          <span style={{ fontSize:14, fontWeight:600, color:'#0F172A' }}>
            {viewMode==='week' ? weekLabel : `${s.days[selDay]}, ${selDayLabel}`}
          </span>
          <span style={{ marginLeft:10, fontSize:12, color:'#94A3B8' }}>· {totalCount} {s.sessions}</span>
        </div>

        {/* Today */}
        <button
          onClick={() => { setWeekOffset(0); setSelDay(1); }}
          style={{ ...btnBase, background: (weekOffset===0 && (viewMode==='week' || selDay===1)) ? '#F0F2F7' : 'transparent', fontWeight: weekOffset===0 ? 600 : 400, color:'#1D2B4F' }}>
          {s.today}
        </button>

        {/* Next */}
        <button onClick={viewMode==='week' ? ()=>setWeekOffset(w=>w+1) : goNextDay} style={btnBase}>→</button>

        <div style={{ width:1, height:22, background:'#E2E8F0', flexShrink:0 }} />

        {/* Hall filter */}
        <select value={hallFilter} onChange={e => setHallFilter(e.target.value)} style={{ ...selSt, minWidth:140 }}>
          <option value="all">{s.allHalls}</option>
          {halls.map(h => <option key={h} value={h}>{h}</option>)}
        </select>

        {role === 'admin' && (
          <button onClick={()=>setAddDay(viewMode==='day' ? selDay : 1)} style={{ height:34, padding:'0 16px', border:'none', borderRadius:8, background:'#0055A4', color:'#fff', fontWeight:600, fontSize:13, fontFamily:'inherit', cursor:'pointer', whiteSpace:'nowrap' }}>
            + {s.addBtn}
          </button>
        )}
      </div>

      {/* Day selector strip (day mode only) */}
      {viewMode === 'day' && (
        <div style={{ display:'flex', gap:6 }}>
          {[0,1,2,3,4,5,6].map(dayIdx => {
            const d = getDayDate(monday, dayIdx);
            const isActive = selDay === dayIdx;
            const isTod = isToday(d);
            return (
              <button key={dayIdx} onClick={() => setSelDay(dayIdx)} style={{
                flex:1, padding:'8px 4px', border:`1px solid ${isActive ? '#1D2B4F' : '#E2E8F0'}`,
                borderRadius:10, background: isActive ? '#1D2B4F' : '#fff',
                cursor:'pointer', fontFamily:'inherit', transition:'all .12s',
                display:'flex', flexDirection:'column', alignItems:'center', gap:2,
              }}>
                <span style={{ fontSize:10, fontWeight:600, textTransform:'uppercase', letterSpacing:0.5, color: isActive ? '#FFCF00' : '#94A3B8' }}>
                  {s.daysShort[dayIdx]}
                </span>
                <span style={{ fontSize:18, fontWeight:800, color: isActive ? '#fff' : '#0F172A', lineHeight:1 }}>
                  {d.getDate()}
                </span>
                {isTod && (
                  <span style={{ width:5, height:5, borderRadius:'50%', background: isActive ? '#FFCF00' : '#0055A4' }} />
                )}
                {(byDay[dayIdx]||[]).length > 0 && !isTod && (
                  <span style={{ fontSize:9, color: isActive ? 'rgba(255,255,255,0.5)' : '#94A3B8' }}>
                    {(byDay[dayIdx]||[]).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Content */}
      {viewMode === 'week' ? (
        <div style={{ overflowX:'auto', paddingBottom:8 }}>
          <div style={{ display:'grid', gridTemplateColumns:`repeat(7, minmax(186px, 1fr))`, gap:10, minWidth:1300 }}>
            {[0,1,2,3,4,5,6].map(dayIdx => {
              const date = getDayDate(monday, dayIdx);
              const todayFlag = isToday(date);
              return (
                <DayColumn
                  key={dayIdx}
                  dayIdx={dayIdx}
                  date={date}
                  sessions={byDay[dayIdx] || []}
                  sports={t.sports}
                  s={s}
                  role={role}
                  onAdd={setAddDay}
                  todayFlag={todayFlag}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <DayView
          dayIdx={selDay}
          date={getDayDate(monday, selDay)}
          sessions={byDay[selDay] || []}
          sports={t.sports}
          s={s}
          role={role}
          todayFlag={isToday(getDayDate(monday, selDay))}
          onAdd={setAddDay}
        />
      )}

      {addDay !== null && (
        <AddSessionModal onClose={()=>setAddDay(null)} defaultDay={addDay} sports={t.sports} s={s} />
      )}
    </div>
  );
}

Object.assign(window, { SchedulePage });
