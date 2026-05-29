// students.jsx — Раздел «Ученики»
// Exports: StudentPage → window

const { useState: useStS, useMemo: useSmS } = React;

/* ─── MOCK DATA ───────────────────────────────────────────────── */
const STUDENTS_MOCK = [
  {id:1,  name:'Арман Сулейменов',  dob:'15.03.2006', gender:'M', si:4,  group:'Бокс-А',   status:'active'},
  {id:2,  name:'Малика Жанасова',   dob:'22.07.2007', gender:'F', si:0,  group:'Дзюдо-А',  status:'active'},
  {id:3,  name:'Ержан Касымов',     dob:'10.01.2005', gender:'M', si:9,  group:'Тхэк-А',   status:'active'},
  {id:4,  name:'Сабина Нурланова',  dob:'03.09.2007', gender:'F', si:12, group:'Гимн-А',   status:'active'},
  {id:5,  name:'Даниил Ким',        dob:'28.05.2006', gender:'M', si:11, group:'Фехт-А',   status:'active'},
  {id:6,  name:'Алибек Жанбеков',   dob:'14.11.2005', gender:'M', si:4,  group:'Бокс-А',   status:'active'},
  {id:7,  name:'Диана Сейткали',    dob:'19.04.2007', gender:'F', si:12, group:'Гимн-А',   status:'active'},
  {id:8,  name:'Нурлан Асанов',     dob:'07.08.2006', gender:'M', si:0,  group:'Дзюдо-Б',  status:'active'},
  {id:9,  name:'Айгерим Бекова',    dob:'25.02.2007', gender:'F', si:5,  group:'Плав-А',   status:'active'},
  {id:10, name:'Тимур Сейткалиев',  dob:'30.06.2005', gender:'M', si:1,  group:'ВБ-А',     status:'active'},
  {id:11, name:'Серик Ахметов',     dob:'12.12.2006', gender:'M', si:4,  group:'Бокс-Б',   status:'active'},
  {id:12, name:'Нурлан Бейсембаев', dob:'08.03.2005', gender:'M', si:4,  group:'Бокс-А',   status:'active'},
  {id:13, name:'Зарина Абдуллина',  dob:'17.05.2007', gender:'F', si:6,  group:'АртПл-А',  status:'active'},
  {id:14, name:'Бауыржан Досов',    dob:'21.10.2006', gender:'M', si:9,  group:'Тхэк-Б',   status:'active'},
  {id:15, name:'Камила Жакупова',   dob:'04.01.2007', gender:'F', si:7,  group:'ВП-А',     status:'active'},
  {id:16, name:'Алтын Жумабаев',    dob:'13.09.2005', gender:'M', si:4,  group:'Бокс-В',   status:'active'},
  {id:17, name:'Берик Садыков',     dob:'26.07.2006', gender:'M', si:4,  group:'Бокс-В',   status:'active'},
  {id:18, name:'Аяулым Сатова',     dob:'09.11.2007', gender:'F', si:3,  group:'ЖБ-А',     status:'active'},
  {id:19, name:'Ренат Оспанов',     dob:'18.04.2004', gender:'M', si:2,  group:'ГРБ-А',    status:'graduate'},
  {id:20, name:'Жазира Токтарова',  dob:'31.08.2008', gender:'F', si:5,  group:'Плав-Б',   status:'active'},
  {id:21, name:'Санжар Байжанов',   dob:'05.06.2006', gender:'M', si:8,  group:'Баск-А',   status:'active'},
  {id:22, name:'Дильназ Нурова',    dob:'14.02.2007', gender:'F', si:0,  group:'Дзюдо-А',  status:'active'},
  {id:23, name:'Руслан Маратов',    dob:'27.09.2005', gender:'M', si:13, group:'Греб-А',   status:'expelled'},
  {id:24, name:'Айша Дауренова',    dob:'11.03.2008', gender:'F', si:6,  group:'АртПл-А',  status:'active'},
  {id:25, name:'Дамир Алиев',       dob:'20.11.2006', gender:'M', si:10, group:'Вело-А',   status:'active'},
];

const STU_PHONE = {
  1:  {phone:'+7 777 123 45 67', pPhone:'+7 701 987 65 43', addr:'г. Алматы, ул. Абая 45, кв. 12'},
  2:  {phone:'+7 705 234 56 78', pPhone:'+7 778 876 54 32', addr:'г. Алматы, ул. Байзакова 18, кв. 5'},
  3:  {phone:'+7 700 345 67 89', pPhone:'+7 702 765 43 21', addr:'г. Алматы, пр. Назарбаева 12'},
  4:  {phone:'+7 771 456 78 90', pPhone:'+7 705 654 32 10', addr:'г. Алматы, ул. Достык 88'},
  5:  {phone:'+7 776 567 89 01', pPhone:'+7 700 543 21 09', addr:'г. Алматы, мкр. Мамыр-4, д.8'},
  6:  {phone:'+7 778 678 90 12', pPhone:'+7 771 432 10 98', addr:'г. Алматы, ул. Тимирязева 44'},
  7:  {phone:'+7 707 789 01 23', pPhone:'+7 776 321 09 87', addr:'г. Алматы, ул. Шевченко 30'},
  8:  {phone:'+7 702 890 12 34', pPhone:'+7 707 210 98 76', addr:'г. Алматы, ул. Сейфуллина 22'},
  9:  {phone:'+7 705 901 23 45', pPhone:'+7 702 109 87 65', addr:'г. Алматы, мкр. Алатау 18'},
  10: {phone:'+7 700 012 34 56', pPhone:'+7 705 098 76 54', addr:'г. Алматы, ул. Жандосова 18'},
  11: {phone:'+7 771 111 22 33', pPhone:'+7 700 222 33 44', addr:'г. Алматы, ул. Розыбакиева 55'},
  12: {phone:'+7 776 222 33 44', pPhone:'+7 771 333 44 55', addr:'г. Алматы, пр. Рыскулова 12'},
  13: {phone:'+7 778 333 44 55', pPhone:'+7 776 444 55 66', addr:'г. Алматы, ул. Панфилова 40'},
  14: {phone:'+7 707 444 55 66', pPhone:'+7 778 555 66 77', addr:'г. Алматы, мкр. Сайран 5'},
  15: {phone:'+7 702 555 66 77', pPhone:'+7 707 666 77 88', addr:'г. Алматы, ул. Навои 15'},
  16: {phone:'+7 705 666 77 88', pPhone:'+7 702 777 88 99', addr:'г. Алматы, ул. Суюнбая 80'},
  17: {phone:'+7 700 777 88 99', pPhone:'+7 705 888 99 00', addr:'г. Алматы, ул. Толе би 20'},
  18: {phone:'+7 771 888 99 00', pPhone:'+7 700 999 00 11', addr:'г. Алматы, мкр. Айнабулак 7'},
  19: {phone:'+7 776 999 00 11', pPhone:'+7 771 000 11 22', addr:'г. Алматы, ул. Горького 8'},
  20: {phone:'+7 778 000 11 22', pPhone:'+7 776 111 22 33', addr:'г. Алматы, мкр. Коктем-2'},
  21: {phone:'+7 707 111 22 33', pPhone:'+7 778 222 33 44', addr:'г. Алматы, ул. Алтынсарина 22'},
  22: {phone:'+7 702 222 33 44', pPhone:'+7 707 333 44 55', addr:'г. Алматы, пр. Сейткали 5'},
  23: {phone:'+7 705 333 44 55', pPhone:'+7 702 444 55 66', addr:'г. Алматы, ул. Манаса 30'},
  24: {phone:'+7 700 444 55 66', pPhone:'+7 705 555 66 77', addr:'г. Алматы, мкр. Думан 3'},
  25: {phone:'+7 771 555 66 77', pPhone:'+7 700 666 77 88', addr:'г. Алматы, ул. Карасай батыра 12'},
};

const STU_MED = {
  6:  [{status:'red',    desc:'Травма колена',     date:'22.05.2026', doc:'Справка №1234'}],
  7:  [{status:'red',    desc:'Растяжение связок', date:'20.05.2026', doc:'Справка №1235'}],
  8:  [{status:'red',    desc:'Ушиб ребра',         date:'19.05.2026', doc:'Справка №1236'}],
  9:  [{status:'yellow', desc:'Воспаление плеча',  date:'18.05.2026', doc:''}],
  10: [{status:'yellow', desc:'Ушиб руки',          date:'17.05.2026', doc:''}],
  13: [{status:'yellow', desc:'Растяжение мышцы',  date:'15.05.2026', doc:''}],
  14: [{status:'yellow', desc:'Боль в спине',       date:'14.05.2026', doc:''}],
  15: [{status:'yellow', desc:'Ушиб кисти',         date:'12.05.2026', doc:''}],
};

const STU_ACH = {
  1:  [{comp:'Чемпионат РК 2026',    medal:'gold',   place:'1', date:'15.05.2026'}],
  2:  [{comp:'Кубок Азии 2026',      medal:'silver', place:'2', date:'10.05.2026'}],
  3:  [{comp:'Чемпионат Азии 2026',  medal:'bronze', place:'3', date:'05.05.2026'}],
  4:  [{comp:'Кубок РК 2026',        medal:'gold',   place:'1', date:'28.04.2026'}],
  5:  [{comp:'Первенство РК 2026',   medal:'silver', place:'2', date:'20.04.2026'}],
  11: [{comp:'Кубок РК 2026',        medal:'bronze', place:'3', date:'12.05.2026'}],
  12: [{comp:'Первенство РК 2026',   medal:'gold',   place:'1', date:'20.04.2026'}],
  16: [{comp:'Кубок Алматы 2026',    medal:'silver', place:'2', date:'10.04.2026'}],
  17: [{comp:'Кубок Алматы 2026',    medal:'bronze', place:'3', date:'10.04.2026'}],
};

/* ─── LOCAL I18N ──────────────────────────────────────────────── */
const STR = {
  ru: {
    addBtn:'Добавить ученика', searchPh:'Поиск по ФИО...',
    allSports:'Все виды спорта', allStatus:'Все статусы', allGender:'Пол',
    reset:'Сбросить', total:'Всего',
    colStudent:'Ученик', colAge:'Лет', colSport:'Вид спорта / Группа', colStatus:'Статус', colMed:'Мед.',
    active:'Активен', graduate:'Выпускник', expelled:'Отчислен',
    gM:'Мальчики', gF:'Девочки',
    empty:'Нет учеников по выбранным фильтрам',
    // Drawer
    tabInfo:'Данные', tabMed:'Медицина', tabAch:'Достижения',
    dob:'Дата рождения', age:'Возраст', gender:'Пол', phone:'Телефон',
    pPhone:'Тел. родителей', addr:'Адрес', sport:'Вид спорта', group:'Группа',
    years:'лет', male:'Мужской', female:'Женский',
    noMed:'Нет медицинских записей', noAch:'Нет достижений',
    addMed:'+ Добавить запись', addAch:'+ Добавить достижение',
    redStatus:'Полное освобождение', yellowStatus:'Ограниченные нагрузки',
    place:'Место', editBtn:'Редактировать', statusBtn:'Сменить статус',
    // Modal
    addTitle:'Добавить ученика', editTitle:'Редактировать ученика', saveEdit:'Сохранить изменения',
    fio:'ФИО', dobF:'Дата рождения (ДД.ММ.ГГГГ)', genderF:'Пол',
    phonF:'Телефон', pPhonF:'Тел. родителей', addrF:'Адрес',
    sportF:'Вид спорта', groupF:'Группа', statusF:'Статус',
    photoF:'Фото ученика', photoPh:'JPG, PNG — до 5 МБ',
    save:'Сохранить', cancel:'Отмена',
  },
  kz: {
    addBtn:'Оқушы қосу', searchPh:'ТАӘ бойынша іздеу...',
    allSports:'Барлық спорт', allStatus:'Барлық мәртебе', allGender:'Жыныс',
    reset:'Тазарту', total:'Барлығы',
    colStudent:'Оқушы', colAge:'Жас', colSport:'Спорт / Топ', colStatus:'Мәртебесі', colMed:'Мед.',
    active:'Белсенді', graduate:'Түлек', expelled:'Шығарылды',
    gM:'Ер балалар', gF:'Қыз балалар',
    empty:'Таңдалған сүзгілер бойынша оқушылар жоқ',
    tabInfo:'Мәліметтер', tabMed:'Медицина', tabAch:'Жетістіктер',
    dob:'Туған күні', age:'Жасы', gender:'Жынысы', phone:'Телефон',
    pPhone:'Ата-ана телефоны', addr:'Мекенжайы', sport:'Спорт түрі', group:'Тобы',
    years:'жас', male:'Ер', female:'Әйел',
    noMed:'Медициналық жазбалар жоқ', noAch:'Жетістіктер жоқ',
    addMed:'+ Жазба қосу', addAch:'+ Жетістік қосу',
    redStatus:'Толық босату', yellowStatus:'Шектеулі жүктеме',
    place:'Орын', editBtn:'Өңдеу', statusBtn:'Мәртебені өзгерту',
    addTitle:'Оқушы қосу', editTitle:'Оқушыны өңдеу', saveEdit:'Өзгерістерді сақтау',
    fio:'ТАӘ', dobF:'Туған күні (КК.АА.ЖЖЖЖ)', genderF:'Жынысы',
    phonF:'Телефон', pPhonF:'Ата-ана тел.', addrF:'Мекенжайы',
    sportF:'Спорт түрі', groupF:'Тобы', statusF:'Мәртебесі',
    photoF:'Оқушы фотосы', photoPh:'JPG, PNG — 5 МБ дейін',
    save:'Сақтау', cancel:'Болдырмау',
  },
};

/* ─── HELPERS ─────────────────────────────────────────────────── */
function calcAge(dob) {
  const [d,m,y] = dob.split('.').map(Number);
  const now = new Date(2026, 4, 25);
  let age = now.getFullYear() - y;
  if (now.getMonth() < m - 1 || (now.getMonth() === m - 1 && now.getDate() < d)) age--;
  return age;
}
function initials(name) { return name.split(' ').slice(0,2).map(w=>w[0]).join(''); }
const AVA_COLORS = ['#1D2B4F','#0055A4','#1A5C2D','#7C3AED','#BE185D','#B45309','#0E7490','#065F46'];
function avaColor(id) { return AVA_COLORS[id % AVA_COLORS.length]; }

/* ─── STATUS BADGE ────────────────────────────────────────────── */
function SBadge({ status, s }) {
  const cfg = {
    active:   {bg:'#F0FDF4', c:'#15803D'},
    graduate: {bg:'#EFF6FF', c:'#1D4ED8'},
    expelled: {bg:'#FEF2F2', c:'#B91C1C'},
  };
  const {bg, c} = cfg[status] || cfg.active;
  const label = s[status] || status;
  return <span style={{ fontSize:11, fontWeight:600, padding:'2px 9px', borderRadius:20, background:bg, color:c, whiteSpace:'nowrap' }}>{label}</span>;
}

/* ─── MED DOT ─────────────────────────────────────────────────── */
function MedDot({ medStatus }) {
  if (!medStatus) return <span style={{ color:'#CBD5E1', fontSize:12 }}>—</span>;
  return <span style={{ display:'inline-block', width:9, height:9, borderRadius:'50%', background: medStatus === 'red' ? '#DC2626' : '#D97706' }} />;
}

/* ─── STATUS CHANGE MODAL ─────────────────────────────────────── */
function StatusChangeModal({ stu, onClose, onSave, s }) {
  const [newStatus, setNewStatus] = useStS(stu.status);
  const [confirming, setConfirming] = useStS(false);

  const handleSave = () => {
    if (newStatus === 'expelled' && !confirming) {
      setConfirming(true);
      return;
    }
    onSave(newStatus);
  };

  const OPTS = [
    ['active',   s.active,   '#F0FDF4', '#15803D'],
    ['graduate', s.graduate, '#EFF6FF', '#1D4ED8'],
    ['expelled', s.expelled, '#FEF2F2', '#B91C1C'],
  ];
  return (
    <>
      <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(15,23,42,0.35)', zIndex:910, backdropFilter:'blur(2px)' }} />
      <div style={{ position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:360, background:'#fff', borderRadius:16, zIndex:911, boxShadow:'0 24px 60px rgba(0,0,0,0.2)', overflow:'hidden' }}>
        <div style={{ padding:'16px 22px', borderBottom:'1px solid #E2E8F0', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ fontWeight:700, fontSize:15, color:'#0F172A' }}>{s.statusBtn}</div>
          <button onClick={onClose} style={{ width:26, height:26, border:'1px solid #E2E8F0', borderRadius:6, background:'transparent', color:'#94A3B8', cursor:'pointer', fontSize:13, display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
        </div>
        <div style={{ padding:'18px 22px', display:'flex', flexDirection:'column', gap:8 }}>
          <div style={{ fontSize:12.5, color:'#64748B', marginBottom:4 }}>
            Смена статуса: <strong style={{ color:'#0F172A' }}>{stu.name}</strong>
          </div>
          {OPTS.map(([val, label, bg, c]) => (
            <button key={val} onClick={() => { setNewStatus(val); setConfirming(false); }} style={{
              display:'flex', alignItems:'center', gap:12, padding:'12px 14px',
              border:`2px solid ${newStatus===val ? c : '#E2E8F0'}`,
              borderRadius:10, background: newStatus===val ? bg : '#fff',
              cursor:'pointer', fontFamily:'inherit', transition:'all .15s', width:'100%', textAlign:'left',
            }}>
              <div style={{ width:12, height:12, borderRadius:'50%', border:`2px solid ${c}`, background: newStatus===val ? c : 'transparent', flexShrink:0, transition:'background .15s' }} />
              <span style={{ fontSize:13, fontWeight: newStatus===val ? 600 : 400, color: newStatus===val ? c : '#475569' }}>{label}</span>
              {stu.status===val && <span style={{ marginLeft:'auto', fontSize:11, color:'#94A3B8' }}>текущий</span>}
            </button>
          ))}

          {/* Expulsion warning */}
          {confirming && newStatus === 'expelled' && (
            <div style={{ background:'#FEF2F2', border:'1px solid #FCA5A5', borderRadius:10, padding:'12px 14px', display:'flex', gap:10, alignItems:'flex-start', marginTop:4 }}>
              <span style={{ fontSize:16, flexShrink:0, lineHeight:1.3 }}>⚠️</span>
              <div style={{ fontSize:12.5, color:'#B91C1C', lineHeight:1.55 }}>
                <strong>Подтвердите отчисление.</strong> Ученик потеряет активный статус. Изменить статус обратно можно в любой момент.
              </div>
            </div>
          )}
        </div>
        <div style={{ padding:'12px 22px', borderTop:'1px solid #E2E8F0', display:'flex', gap:10, justifyContent:'flex-end' }}>
          <button onClick={onClose} style={{ padding:'8px 18px', border:'1px solid #E2E8F0', borderRadius:8, background:'transparent', color:'#64748B', fontSize:13, fontFamily:'inherit', cursor:'pointer' }}>Отмена</button>
          <button onClick={handleSave} style={{
            padding:'8px 18px', border:'none', borderRadius:8,
            background: confirming && newStatus==='expelled' ? '#B91C1C' : '#0055A4',
            color:'#fff', fontWeight:600, fontSize:13, fontFamily:'inherit', cursor:'pointer',
            transition:'background .15s',
          }}>
            {confirming && newStatus==='expelled' ? '⚠ Отчислить' : 'Сохранить'}
          </button>
        </div>
      </div>
    </>
  );
}

/* ─── STUDENT DRAWER ──────────────────────────────────────────── */
function StudentDrawer({ stu, onClose, sports, role, s, onEdit, onStatusChange }) {
  const [tab, setTab] = useStS('info');
  const med = STU_MED[stu.id] || [];
  const ach = STU_ACH[stu.id] || [];
  const contact = STU_PHONE[stu.id] || {};
  const MC = {gold:'#F59E0B', silver:'#64748B', bronze:'#92400E'};
  const ME = {gold:'🥇', silver:'🥈', bronze:'🥉'};
  const tabs = [['info',s.tabInfo],['medical',s.tabMed],['achievements',s.tabAch]];
  const canEdit = role === 'admin' || role === 'trainer';

  return (
    <>
      <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(15,23,42,0.38)', zIndex:900, backdropFilter:'blur(2px)' }} />
      <div style={{ position:'fixed', top:0, right:0, bottom:0, width:496, background:'#fff', zIndex:901, display:'flex', flexDirection:'column', boxShadow:'-8px 0 40px rgba(0,0,0,0.14)', animation:'drwIn .22s ease' }}>
        <style>{`@keyframes drwIn{from{transform:translateX(100%)}to{transform:translateX(0)}}`}</style>

        {/* Header */}
        <div style={{ background:'#1D2B4F', padding:'22px 24px 0', flexShrink:0 }}>
          <div style={{ display:'flex', alignItems:'flex-start', gap:14, marginBottom:16 }}>
            <div style={{ width:52, height:52, borderRadius:'50%', background:avaColor(stu.id), border:'2.5px solid rgba(255,207,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:17, flexShrink:0 }}>
              {initials(stu.name)}
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ color:'#fff', fontWeight:700, fontSize:16, lineHeight:1.3, marginBottom:4 }}>{stu.name}</div>
              <div style={{ color:'rgba(255,255,255,0.45)', fontSize:12 }}>{sports[stu.si]} · {stu.group}</div>
              <div style={{ marginTop:8, display:'flex', gap:8, alignItems:'center' }}>
                <SBadge status={stu.status} s={s} />
                {(STU_MED[stu.id]||[]).length > 0 && (
                  <span style={{ fontSize:10, padding:'2px 8px', borderRadius:10, fontWeight:600, background: STU_MED[stu.id][0].status==='red' ? 'rgba(220,38,38,0.2)' : 'rgba(217,119,6,0.2)', color: STU_MED[stu.id][0].status==='red' ? '#FCA5A5' : '#FCD34D' }}>
                    {STU_MED[stu.id][0].status==='red' ? '🔴' : '🟡'} {s[STU_MED[stu.id][0].status+'Status']}
                  </span>
                )}
              </div>
            </div>
            <button onClick={onClose} style={{ width:30, height:30, border:'1px solid rgba(255,255,255,0.18)', borderRadius:7, background:'transparent', color:'rgba(255,255,255,0.5)', fontSize:14, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>✕</button>
          </div>
          {/* Tabs */}
          <div style={{ display:'flex', gap:2 }}>
            {tabs.map(([k, label]) => (
              <button key={k} onClick={() => setTab(k)} style={{ padding:'7px 16px', border:'none', borderRadius:'6px 6px 0 0', background: tab===k ? '#fff' : 'transparent', color: tab===k ? '#1D2B4F' : 'rgba(255,255,255,0.5)', fontWeight: tab===k ? 600 : 400, fontSize:12.5, fontFamily:'inherit', cursor:'pointer', transition:'all .12s' }}>
                {label}
                {k==='medical' && med.length>0 && <span style={{ marginLeft:5, fontSize:10, padding:'1px 5px', borderRadius:10, background:'rgba(220,38,38,0.3)', color:'#FCA5A5' }}>{med.length}</span>}
                {k==='achievements' && ach.length>0 && <span style={{ marginLeft:5, fontSize:10, padding:'1px 5px', borderRadius:10, background:'rgba(245,158,11,0.3)', color:'#FCD34D' }}>{ach.length}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ flex:1, overflowY:'auto', padding:'20px 24px' }}>
          {tab === 'info' && (
            <div>
              {[
                [s.dob,    stu.dob],
                [s.age,    `${calcAge(stu.dob)} ${s.years}`],
                [s.gender, stu.gender==='M' ? s.male : s.female],
                [s.phone,  contact.phone||'—'],
                [s.pPhone, contact.pPhone||'—'],
                [s.addr,   contact.addr||'—'],
                [s.sport,  sports[stu.si]],
                [s.group,  stu.group],
              ].map(([lbl, val]) => (
                <div key={lbl} style={{ display:'grid', gridTemplateColumns:'156px 1fr', padding:'11px 0', borderBottom:'1px solid #F1F5F9', gap:12, alignItems:'start' }}>
                  <div style={{ fontSize:12, color:'#94A3B8', fontWeight:500, paddingTop:1 }}>{lbl}</div>
                  <div style={{ fontSize:13, color:'#0F172A', fontWeight:500 }}>{val}</div>
                </div>
              ))}
            </div>
          )}

          {tab === 'medical' && (
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {med.length === 0
                ? <div style={{ textAlign:'center', padding:'48px 0', color:'#94A3B8', fontSize:13 }}>{s.noMed}</div>
                : med.map((m, i) => (
                  <div key={i} style={{ border:'1px solid #E2E8F0', borderRadius:10, padding:'14px 16px', borderLeft:`4px solid ${m.status==='red'?'#DC2626':'#D97706'}` }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                      <span style={{ fontSize:11, fontWeight:600, padding:'2px 8px', borderRadius:10, background:m.status==='red'?'#FEF2F2':'#FFFBEB', color:m.status==='red'?'#DC2626':'#D97706' }}>
                        {s[m.status+'Status']}
                      </span>
                      <span style={{ fontSize:11, color:'#94A3B8' }}>{m.date}</span>
                    </div>
                    <div style={{ fontSize:13, fontWeight:500, color:'#0F172A' }}>{m.desc}</div>
                    {m.doc && <div style={{ fontSize:11, color:'#94A3B8', marginTop:5 }}>📄 {m.doc}</div>}
                  </div>
                ))
              }
              {canEdit && <button style={{ padding:'10px', border:'2px dashed #E2E8F0', borderRadius:10, background:'transparent', color:'#94A3B8', fontSize:13, fontFamily:'inherit', cursor:'pointer' }}>{s.addMed}</button>}
            </div>
          )}

          {tab === 'achievements' && (
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {ach.length === 0
                ? <div style={{ textAlign:'center', padding:'48px 0', color:'#94A3B8', fontSize:13 }}>{s.noAch}</div>
                : ach.map((a, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:12, border:'1px solid #E2E8F0', borderRadius:10, padding:'12px 16px' }}>
                    <div style={{ width:40, height:40, borderRadius:'50%', background:`${MC[a.medal]}18`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>{ME[a.medal]}</div>
                    <div>
                      <div style={{ fontSize:13, fontWeight:500, color:'#0F172A' }}>{a.comp}</div>
                      <div style={{ fontSize:11, color:'#94A3B8', marginTop:2 }}>{s.place} {a.place} · {a.date}</div>
                    </div>
                  </div>
                ))
              }
              {canEdit && <button style={{ padding:'10px', border:'2px dashed #E2E8F0', borderRadius:10, background:'transparent', color:'#94A3B8', fontSize:13, fontFamily:'inherit', cursor:'pointer' }}>{s.addAch}</button>}
            </div>
          )}
        </div>

        {/* Footer */}
        {canEdit && (
          <div style={{ padding:'14px 24px', borderTop:'1px solid #E2E8F0', display:'flex', gap:10, flexShrink:0 }}>
            <button onClick={onEdit} style={{ flex:1, padding:'9px', border:'none', borderRadius:8, background:'#0055A4', color:'#fff', fontWeight:600, fontSize:13, fontFamily:'inherit', cursor:'pointer' }}>{s.editBtn}</button>
            <button onClick={onStatusChange} style={{ padding:'9px 14px', border:'1px solid #E2E8F0', borderRadius:8, background:'transparent', color:'#64748B', fontSize:13, fontFamily:'inherit', cursor:'pointer' }}>{s.statusBtn}</button>
          </div>
        )}
      </div>
    </>
  );
}

/* ─── FILE UPLOAD FIELD ──────────────────────────────────────── */
function StuFileUpload({ hint, accept, onChange }) {
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
          border: `2px dashed ${drag ? '#0055A4' : filename ? '#93C5FD' : '#E2E8F0'}`,
          borderRadius: 8, padding: '11px 14px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 12,
          background: drag ? '#EFF6FF' : filename ? '#F8FAFC' : '#fff',
          transition: 'all .15s',
        }}
        onMouseEnter={e => { if (!drag && !filename) e.currentTarget.style.borderColor = '#93C5FD'; }}
        onMouseLeave={e => { if (!drag && !filename) e.currentTarget.style.borderColor = '#E2E8F0'; }}
      >
        {preview
          ? <img src={preview} alt="" style={{ width:42, height:42, objectFit:'cover', borderRadius:6, flexShrink:0, border:'1px solid #E2E8F0' }} />
          : <div style={{ width:42, height:42, borderRadius:8, background:'#F1F5F9', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0, color:'#94A3B8' }}>
              {accept && accept.includes('image') ? '🖼️' : '📎'}
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
            style={{ marginLeft:'auto', flexShrink:0, width:22, height:22, border:'none', borderRadius:'50%', background:'#F1F5F9', color:'#94A3B8', fontSize:12, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
            ✕
          </button>
        )}
      </div>
    </>
  );
}

/* ─── ADD STUDENT MODAL ───────────────────────────────────────── */
const addInpSt = window.SHARED.inputStyle;

function FLabel({ label, req, children }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
      <label style={{ fontSize:12, fontWeight:500, color:'#475569' }}>{label}{req && <span style={{ color:'#DC2626', marginLeft:2 }}>*</span>}</label>
      {children}
    </div>
  );
}

function AddStudentModal({ onClose, sports, s, initialData }) {
  const isEdit = !!initialData;
  const contact = initialData ? (STU_PHONE[initialData.id] || {}) : {};
  const [f, setF] = useStS(initialData ? {
    name:   initialData.name,
    dob:    initialData.dob,
    gender: initialData.gender,
    si:     String(initialData.si),
    group:  initialData.group,
    phone:  contact.phone  || '',
    pPhone: contact.pPhone || '',
    addr:   contact.addr   || '',
    status: initialData.status,
    photo:  null,
  } : { name:'', dob:'', gender:'M', si:'4', group:'', phone:'', pPhone:'', addr:'', status:'active', photo:null });
  const upd = (k, v) => setF(p => ({...p, [k]:v}));
  return (
    <>
      <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(15,23,42,0.4)', zIndex:902, backdropFilter:'blur(2px)' }} />
      <div style={{ position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:520, background:'#fff', borderRadius:16, zIndex:903, boxShadow:'0 24px 60px rgba(0,0,0,0.18)', maxHeight:'92vh', display:'flex', flexDirection:'column', overflow:'hidden' }}>
        <div style={{ padding:'18px 24px', borderBottom:'1px solid #E2E8F0', display:'flex', justifyContent:'space-between', alignItems:'center', flexShrink:0 }}>
          <div style={{ fontWeight:700, fontSize:16, color:'#0F172A' }}>{isEdit ? s.editTitle : s.addTitle}</div>
          <button onClick={onClose} style={{ width:28, height:28, border:'1px solid #E2E8F0', borderRadius:6, background:'transparent', color:'#94A3B8', cursor:'pointer' }}>✕</button>
        </div>
        <div style={{ padding:'20px 24px', overflowY:'auto', display:'flex', flexDirection:'column', gap:14 }}>
          <FLabel label={s.fio} req><input value={f.name} onChange={e=>upd('name',e.target.value)} placeholder="Иванов Иван Иванович" style={addInpSt} /></FLabel>
          <FLabel label={s.photoF}>
            <StuFileUpload hint={s.photoPh} accept="image/*" onChange={file => upd('photo', file)} />
          </FLabel>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <FLabel label={s.dobF} req><input value={f.dob} onChange={e=>upd('dob',e.target.value)} placeholder="14.03.2006" style={addInpSt} /></FLabel>
            <FLabel label={s.genderF} req>
              <div style={{ display:'flex', border:'1px solid #E2E8F0', borderRadius:8, overflow:'hidden', height:34 }}>
                {['M','F'].map(g => (
                  <button key={g} onClick={()=>upd('gender',g)} style={{ flex:1, border:'none', background:f.gender===g?'#1D2B4F':'transparent', color:f.gender===g?'#FFCF00':'#64748B', fontWeight:f.gender===g?600:400, fontSize:13, fontFamily:'inherit', cursor:'pointer', transition:'all .12s' }}>
                    {g==='M' ? s.male : s.female}
                  </button>
                ))}
              </div>
            </FLabel>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <FLabel label={s.phonF} req><input value={f.phone} onChange={e=>upd('phone',e.target.value)} placeholder="+7 700 000 00 00" style={addInpSt} /></FLabel>
            <FLabel label={s.pPhonF} req><input value={f.pPhone} onChange={e=>upd('pPhone',e.target.value)} placeholder="+7 700 000 00 00" style={addInpSt} /></FLabel>
          </div>
          <FLabel label={s.addrF} req><input value={f.addr} onChange={e=>upd('addr',e.target.value)} placeholder="г. Алматы, ул. ..." style={addInpSt} /></FLabel>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <FLabel label={s.sportF} req>
              <select value={f.si} onChange={e=>upd('si',e.target.value)} style={addInpSt}>
                {sports.map((sp,i) => <option key={i} value={i}>{sp}</option>)}
              </select>
            </FLabel>
            <FLabel label={s.groupF} req><input value={f.group} onChange={e=>upd('group',e.target.value)} placeholder="Бокс-А" style={addInpSt} /></FLabel>
          </div>
          <FLabel label={s.statusF} req>
            <select value={f.status} onChange={e=>upd('status',e.target.value)} style={addInpSt}>
              <option value="active">{s.active}</option>
              <option value="graduate">{s.graduate}</option>
              <option value="expelled">{s.expelled}</option>
            </select>
          </FLabel>
        </div>
        <div style={{ padding:'14px 24px', borderTop:'1px solid #E2E8F0', display:'flex', gap:10, justifyContent:'flex-end', flexShrink:0 }}>
          <button onClick={onClose} style={{ padding:'8px 20px', border:'1px solid #E2E8F0', borderRadius:8, background:'transparent', color:'#64748B', fontSize:13, fontFamily:'inherit', cursor:'pointer' }}>{s.cancel}</button>
          <button onClick={() => { window.TOAST?.show(isEdit ? 'Данные сохранены' : 'Ученик добавлен'); onClose(); }} style={{ padding:'8px 20px', border:'none', borderRadius:8, background:'#0055A4', color:'#fff', fontWeight:600, fontSize:13, fontFamily:'inherit', cursor:'pointer' }}>{isEdit ? s.saveEdit : s.save}</button>
        </div>
      </div>
    </>
  );
}

/* ─── STUDENT PAGE ────────────────────────────────────────────── */
function StudentPage({ t, role, lang, activeSport, onClearSport, openStudentId, onClearTarget }) {
  const s = STR[lang] || STR.ru;
  const TRAINER_SPORT = 4;
  const [students, setStudents] = useStS([...STUDENTS_MOCK]);
  const base = role === 'trainer' ? students.filter(st=>st.si===TRAINER_SPORT) : students;

  const [search,  setSearch]  = useStS('');
  const [fSport,  setFSport]  = useStS('all');
  const [fStatus, setFStatus] = useStS('all');
  const [fGender, setFGender] = useStS('all');
  const [selectedId,   setSelectedId]   = useStS(null);
  const [showAdd,      setShowAdd]      = useStS(false);
  const [editStudent,  setEditStudent]  = useStS(null);
  const [showStatusModal, setShowStatusModal] = useStS(false);

  const selected = selectedId ? students.find(st => st.id === selectedId) : null;

  const handleStatusChange = (newStatus) => {
    setStudents(p => p.map(st => st.id === selectedId ? {...st, status: newStatus} : st));
    setShowStatusModal(false);
    window.TOAST?.show('Статус изменён');
  };

  React.useEffect(() => {
    if (openStudentId != null) {
      setSelectedId(openStudentId);
      onClearTarget && onClearTarget();
    }
  }, [openStudentId]);

  // Синхронизация с глобальным фильтром из сайдбара
  React.useEffect(() => {
    if (role === 'trainer') return;
    setFSport(activeSport !== null && activeSport !== undefined ? String(activeSport) : 'all');
  }, [activeSport]);

  const filtered = useSmS(() => base.filter(st => {
    if (search && !st.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (fSport  !== 'all' && st.si     !== Number(fSport))  return false;
    if (fStatus !== 'all' && st.status !== fStatus)         return false;
    if (fGender !== 'all' && st.gender !== fGender)         return false;
    return true;
  }), [search, fSport, fStatus, fGender, base]);

  const hasFilter = search || fSport!=='all' || fStatus!=='all' || fGender!=='all';
  const selSt = window.SHARED.selectStyle;

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>

      {/* Toolbar */}
      <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
        <div style={{ position:'relative', flex:'1 1 220px', minWidth:0 }}>
          <span style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:'#94A3B8', pointerEvents:'none' }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="7" cy="7" r="4.5"/><line x1="10.5" y1="10.5" x2="14" y2="14" strokeLinecap="round"/></svg>
          </span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={s.searchPh}
            style={{ width:'100%', height:36, padding:'0 10px 0 32px', border:'1px solid #E2E8F0', borderRadius:8, fontSize:13, color:'#0F172A', fontFamily:'inherit', outline:'none', background:'#fff' }} />
        </div>

        {role !== 'trainer' && (
          <select value={fSport} onChange={e=>setFSport(e.target.value)} style={{ ...selSt, minWidth:160 }}>
            <option value="all">{s.allSports}</option>
            {t.sports.map((sp,i) => <option key={i} value={i}>{sp}</option>)}
          </select>
        )}
        <select value={fStatus} onChange={e=>setFStatus(e.target.value)} style={{ ...selSt, minWidth:140 }}>
          <option value="all">{s.allStatus}</option>
          <option value="active">{s.active}</option>
          <option value="graduate">{s.graduate}</option>
          <option value="expelled">{s.expelled}</option>
        </select>
        <select value={fGender} onChange={e=>setFGender(e.target.value)} style={{ ...selSt, minWidth:110 }}>
          <option value="all">{s.allGender}</option>
          <option value="M">{s.gM}</option>
          <option value="F">{s.gF}</option>
        </select>
        {hasFilter && (
          <button onClick={()=>{setSearch('');setFSport('all');setFStatus('all');setFGender('all');}}
            style={{ height:36, padding:'0 12px', border:'1px solid #E2E8F0', borderRadius:8, background:'transparent', color:'#94A3B8', fontSize:12.5, fontFamily:'inherit', cursor:'pointer', whiteSpace:'nowrap' }}>
            {s.reset} ×
          </button>
        )}
        <div style={{ flex:1 }} />
        {(role === 'admin' || role === 'trainer') && (
          <button onClick={()=>setShowAdd(true)} style={{ display:'flex', alignItems:'center', gap:6, height:36, padding:'0 16px', border:'none', borderRadius:8, background:'#0055A4', color:'#fff', fontWeight:600, fontSize:13, fontFamily:'inherit', cursor:'pointer', whiteSpace:'nowrap' }}>
            <span style={{ fontSize:16, lineHeight:1 }}>+</span> {s.addBtn}
          </button>
        )}
      </div>

      {/* Counter */}
      <div style={{ fontSize:12, color:'#94A3B8' }}>
        {s.total}: <strong style={{ color:'#0F172A' }}>{filtered.length}</strong>
      </div>

      {/* Table */}
      <div style={{ background:'#fff', border:'1px solid #E2E8F0', borderRadius:12, overflow:'hidden' }}>
        {/* Head */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 60px 210px 130px 64px', padding:'0 20px', background:'#F8FAFC', borderBottom:'1px solid #E2E8F0' }}>
          {[s.colStudent, s.colAge, s.colSport, s.colStatus, s.colMed].map(col => (
            <div key={col} style={{ padding:'9px 0', fontSize:11, fontWeight:600, color:'#94A3B8', textTransform:'uppercase', letterSpacing:0.5 }}>{col}</div>
          ))}
        </div>
        {/* Rows */}
        <div style={{ maxHeight:460, overflowY:'auto' }}>
          {filtered.length === 0
            ? <div style={{ padding:'56px', textAlign:'center', color:'#94A3B8', fontSize:13 }}>{s.empty}</div>
            : filtered.map(st => {
                const medRec = (STU_MED[st.id]||[])[0];
                return (
                  <div key={st.id} onClick={()=>setSelectedId(st.id)}
                    style={{ display:'grid', gridTemplateColumns:'1fr 60px 210px 130px 64px', padding:'0 20px', borderBottom:'1px solid #F1F5F9', cursor:'pointer', transition:'background .1s', alignItems:'center' }}
                    onMouseEnter={e=>e.currentTarget.style.background='#F8FAFC'}
                    onMouseLeave={e=>e.currentTarget.style.background='transparent'}
                  >
                    <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 0', minWidth:0 }}>
                      <div style={{ width:34, height:34, borderRadius:'50%', background:avaColor(st.id), display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:12, fontWeight:600, flexShrink:0 }}>{initials(st.name)}</div>
                      <div style={{ minWidth:0 }}>
                        <div style={{ fontSize:13, fontWeight:500, color:'#0F172A', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{st.name}</div>
                        <div style={{ fontSize:11, color:'#94A3B8' }}>{st.dob}</div>
                      </div>
                    </div>
                    <div style={{ fontSize:13, color:'#475569', fontWeight:500 }}>{calcAge(st.dob)}</div>
                    <div>
                      <div style={{ fontSize:13, color:'#0F172A', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{t.sports[st.si]}</div>
                      <div style={{ fontSize:11, color:'#94A3B8' }}>{st.group}</div>
                    </div>
                    <div><SBadge status={st.status} s={s} /></div>
                    <div style={{ display:'flex', justifyContent:'center' }}><MedDot medStatus={medRec?.status} /></div>
                  </div>
                );
              })
          }
        </div>
      </div>

      {selected && <StudentDrawer stu={selected} onClose={()=>setSelectedId(null)} sports={t.sports} role={role} s={s} onEdit={()=>setEditStudent(selected)} onStatusChange={()=>setShowStatusModal(true)} />}
      {showStatusModal && selected && <StatusChangeModal stu={selected} onClose={()=>setShowStatusModal(false)} onSave={handleStatusChange} s={s} />}
      {editStudent && <AddStudentModal onClose={()=>setEditStudent(null)} sports={t.sports} s={s} initialData={editStudent} />}
      {showAdd && <AddStudentModal onClose={()=>setShowAdd(false)} sports={t.sports} s={s} />}
    </div>
  );
}

Object.assign(window, { StudentPage });
