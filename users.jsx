// users.jsx — Раздел «Пользователи» (только Admin)
// Exports: UsersPage → window

const { useState: useStU, useMemo: useSmU } = React;

/* ─── MOCK DATA ───────────────────────────────────────────────── */
const USERS_DATA = [
  // Admins
  {id:1,  name:'Сергей Иванов',       role:'admin',    email:'s.ivanov@rshik.kz',        si:null, status:'active',   created:'01.09.2024'},
  {id:2,  name:'Наталья Козлова',     role:'admin',    email:'n.kozlova@rshik.kz',       si:null, status:'active',   created:'01.09.2024'},
  // Directors
  {id:3,  name:'Бейбут Атабеков',     role:'director', email:'b.atabekov@rshik.kz',      si:null, status:'active',   created:'01.09.2024'},
  {id:4,  name:'Гульнара Сейткали',   role:'director', email:'g.seitkali@rshik.kz',      si:null, status:'active',   created:'15.09.2024'},
  {id:5,  name:'Алмас Беков',         role:'director', email:'a.bekov@rshik.kz',          si:null, status:'invited',  created:'10.05.2026'},
  // Trainers
  {id:6,  name:'Расул Имашев',        role:'trainer',  email:'r.imashev@rshik.kz',       si:0,    status:'active',   created:'01.09.2024'},
  {id:7,  name:'Тимур Жумагалиев',    role:'trainer',  email:'t.zhumagaliev@rshik.kz',   si:1,    status:'active',   created:'01.09.2024'},
  {id:8,  name:'Санат Байжанов',      role:'trainer',  email:'s.baizhanov@rshik.kz',     si:2,    status:'active',   created:'01.09.2024'},
  {id:9,  name:'Айгуль Нурова',       role:'trainer',  email:'a.nurova@rshik.kz',        si:3,    status:'active',   created:'01.09.2024'},
  {id:10, name:'Андрей Петров',       role:'trainer',  email:'a.petrov@rshik.kz',        si:4,    status:'active',   created:'01.09.2024'},
  {id:11, name:'Денис Кузнецов',      role:'trainer',  email:'d.kuznetsov@rshik.kz',     si:5,    status:'active',   created:'01.09.2024'},
  {id:12, name:'Мадина Алиева',       role:'trainer',  email:'m.alieva@rshik.kz',        si:6,    status:'active',   created:'01.09.2024'},
  {id:13, name:'Болат Сатов',         role:'trainer',  email:'b.satov@rshik.kz',         si:7,    status:'active',   created:'01.09.2024'},
  {id:14, name:'Николай Захаров',     role:'trainer',  email:'n.zakharov@rshik.kz',      si:8,    status:'active',   created:'01.09.2024'},
  {id:15, name:'Кайрат Молдаев',      role:'trainer',  email:'k.moldaev@rshik.kz',       si:9,    status:'invited',  created:'20.04.2026'},
  {id:16, name:'Олег Власов',         role:'trainer',  email:'o.vlasov@rshik.kz',        si:10,   status:'active',   created:'01.09.2024'},
  {id:17, name:'Игорь Сергеев',       role:'trainer',  email:'i.sergeev@rshik.kz',       si:11,   status:'active',   created:'01.09.2024'},
  {id:18, name:'Елена Романова',      role:'trainer',  email:'e.romanova@rshik.kz',      si:12,   status:'active',   created:'01.09.2024'},
  {id:19, name:'Виктор Матвеев',      role:'trainer',  email:'v.matveev@rshik.kz',       si:13,   status:'inactive', created:'01.09.2024'},
  {id:20, name:'Жанна Аблаева',       role:'trainer',  email:'zh.ablaeva@rshik.kz',      si:13,   status:'invited',  created:'15.05.2026'},
];

/* ─── I18N ────────────────────────────────────────────────────── */
const USTR = {
  ru: {
    addBtn:'Добавить пользователя',
    allRoles:'Все роли', allStatus:'Все статусы',
    total:'Всего пользователей', reset:'Сбросить',
    roleAdmin:'Администратор', roleDirector:'Директор', roleTrainer:'Тренер',
    statusActive:'Активен', statusInvited:'Приглашён', statusInactive:'Неактивен',
    colUser:'Пользователь', colRole:'Роль', colEmail:'Email',
    colSport:'Вид спорта', colStatus:'Статус', colCreated:'Добавлен', colActions:'',
    actionResend:'Отправить повторно', actionDeactivate:'Деактивировать', actionActivate:'Активировать',
    inviteSent:'Приглашение отправлено',
    // Stats
    activeCount:'Активных', invitedCount:'Ожидают', inactiveCount:'Неактивных',
    // Modal
    addTitle:'Новый пользователь',
    fName:'ФИО', fEmail:'Email', fRole:'Роль', fSport:'Вид спорта (для тренера)',
    fNamePh:'Иванов Иван Иванович', fEmailPh:'user@rshik.kz',
    inviteNote:'На указанный email будет отправлена ссылка для активации аккаунта.',
    createBtn:'Создать и отправить приглашение', cancel:'Отмена',
  },
  kz: {
    addBtn:'Пайдаланушы қосу',
    allRoles:'Барлық рөлдер', allStatus:'Барлық мәртебе',
    total:'Барлық пайдаланушылар', reset:'Тазарту',
    roleAdmin:'Әкімші', roleDirector:'Директор', roleTrainer:'Жаттықтырушы',
    statusActive:'Белсенді', statusInvited:'Шақырылды', statusInactive:'Белсенді емес',
    colUser:'Пайдаланушы', colRole:'Рөлі', colEmail:'Email',
    colSport:'Спорт түрі', colStatus:'Мәртебесі', colCreated:'Қосылды', colActions:'',
    activeCount:'Белсенді', invitedCount:'Күтуде', inactiveCount:'Белсенді емес',
    addTitle:'Жаңа пайдаланушы',
    fName:'ТАӘ', fEmail:'Email', fRole:'Рөлі', fSport:'Спорт түрі (жаттықтырушы үшін)',
    fNamePh:'Иванов Иван Иванович', fEmailPh:'user@rshik.kz',
    inviteNote:'Көрсетілген email-ге аккаунтты белсендіру сілтемесі жіберіледі.',
    createBtn:'Жасау және шақыру жіберу', cancel:'Болдырмау',
    actionResend:'Қайта жіберу', actionDeactivate:'Деактивациялау', actionActivate:'Белсендіру',
    inviteSent:'Шақыру жіберілді',
  },
};

/* ─── HELPERS ─────────────────────────────────────────────────── */
const UA = ['#1D2B4F','#0055A4','#1A5C2D','#7C3AED','#BE185D','#B45309','#0E7490'];
function uAva(id) { return UA[id % UA.length]; }
function uInit(name) { return name.split(' ').slice(0,2).map(w=>w[0]).join(''); }

/* ─── STAT STRIP ──────────────────────────────────────────────── */
function UStatStrip({ users, s }) {
  const active   = users.filter(u=>u.status==='active').length;
  const invited  = users.filter(u=>u.status==='invited').length;
  const inactive = users.filter(u=>u.status==='inactive').length;
  const stats = [
    {n:active,   label:s.activeCount,   bg:'#F0FDF4', c:'#15803D', border:'#BBF7D0'},
    {n:invited,  label:s.invitedCount,  bg:'#FFFBEB', c:'#D97706', border:'#FDE68A'},
    {n:inactive, label:s.inactiveCount, bg:'#F8FAFC', c:'#94A3B8', border:'#E2E8F0'},
    {n:users.length, label:s.total, bg:'#fff', c:'#0F172A', border:'#E2E8F0'},
  ];
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:14 }}>
      {stats.map(({n,label,bg,c,border}) => (
        <div key={label} style={{ background:bg, border:`1px solid ${border}`, borderRadius:12, padding:'14px 20px', display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ fontSize:32, fontWeight:800, color:c, letterSpacing:-1 }}>{n}</div>
          <div style={{ fontSize:12, color:c+'99', fontWeight:500 }}>{label}</div>
        </div>
      ))}
    </div>
  );
}

/* ─── ROLE BADGE ──────────────────────────────────────────────── */
function RoleBadge({ role, s }) {
  const cfg = {
    admin:    {bg:'#1D2B4F', c:'#FFCF00', label: s.roleAdmin},
    director: {bg:'#EFF6FF', c:'#1D4ED8', label: s.roleDirector},
    trainer:  {bg:'#F0FDF4', c:'#15803D', label: s.roleTrainer},
  };
  const {bg, c, label} = cfg[role] || cfg.trainer;
  return <span style={{ fontSize:11, fontWeight:600, padding:'2px 9px', borderRadius:20, background:bg, color:c, whiteSpace:'nowrap' }}>{label}</span>;
}

/* ─── STATUS BADGE ────────────────────────────────────────────── */
function UStatusBadge({ status, s }) {
  const cfg = {
    active:   {bg:'#F0FDF4', c:'#15803D', dot:'#15803D',  label: s.statusActive},
    invited:  {bg:'#FFFBEB', c:'#D97706', dot:'#D97706',  label: s.statusInvited},
    inactive: {bg:'#F8FAFC', c:'#94A3B8', dot:'#CBD5E1',  label: s.statusInactive},
  };
  const {bg,c,dot,label} = cfg[status] || cfg.active;
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:5, fontSize:11, fontWeight:600, padding:'2px 9px', borderRadius:20, background:bg, color:c, whiteSpace:'nowrap' }}>
      <span style={{ width:5, height:5, borderRadius:'50%', background:dot, flexShrink:0 }} />
      {label}
    </span>
  );
}

/* ─── ADD USER MODAL ──────────────────────────────────────────── */
const uInpSt = window.SHARED.inputStyle;

function UFLabel({ label, req, children }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
      <label style={{ fontSize:12, fontWeight:500, color:'#475569' }}>{label}{req&&<span style={{color:'#DC2626',marginLeft:2}}>*</span>}</label>
      {children}
    </div>
  );
}

function AddUserModal({ onClose, sports, s }) {
  const [f, setF] = useStU({ name:'', email:'', role:'trainer', si:'0' });
  const upd = (k,v) => setF(p=>({...p,[k]:v}));
  const roles = [['admin',s.roleAdmin],['director',s.roleDirector],['trainer',s.roleTrainer]];
  return (
    <>
      <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(15,23,42,0.4)', zIndex:902, backdropFilter:'blur(2px)' }} />
      <div style={{ position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:480, background:'#fff', borderRadius:16, zIndex:903, boxShadow:'0 24px 60px rgba(0,0,0,0.18)', display:'flex', flexDirection:'column', overflow:'hidden' }}>
        <div style={{ padding:'18px 24px', borderBottom:'1px solid #E2E8F0', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ fontWeight:700, fontSize:16, color:'#0F172A' }}>{s.addTitle}</div>
          <button onClick={onClose} style={{ width:28, height:28, border:'1px solid #E2E8F0', borderRadius:6, background:'transparent', color:'#94A3B8', cursor:'pointer', fontSize:14 }}>✕</button>
        </div>
        <div style={{ padding:'20px 24px', display:'flex', flexDirection:'column', gap:14 }}>
          <UFLabel label={s.fName} req>
            <input value={f.name} onChange={e=>upd('name',e.target.value)} placeholder={s.fNamePh} style={uInpSt} />
          </UFLabel>
          <UFLabel label={s.fEmail} req>
            <input value={f.email} onChange={e=>upd('email',e.target.value)} placeholder={s.fEmailPh} style={uInpSt} type="email" />
          </UFLabel>
          <UFLabel label={s.fRole} req>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
              {roles.map(([val, label]) => (
                <button key={val} onClick={()=>upd('role',val)} style={{
                  padding:'9px 8px', border:`2px solid ${f.role===val ? '#1D2B4F' : '#E2E8F0'}`,
                  borderRadius:10, background: f.role===val ? '#1D2B4F' : '#fff',
                  color: f.role===val ? '#FFCF00' : '#64748B', fontFamily:'inherit',
                  fontSize:12.5, fontWeight: f.role===val ? 600 : 400, cursor:'pointer',
                  transition:'all .12s',
                }}>{label}</button>
              ))}
            </div>
          </UFLabel>
          {f.role === 'trainer' && (
            <UFLabel label={s.fSport} req>
              <select value={f.si} onChange={e=>upd('si',e.target.value)} style={uInpSt}>
                {sports.map((sp,i) => <option key={i} value={i}>{sp}</option>)}
              </select>
            </UFLabel>
          )}
          <div style={{ background:'#F0F6FF', border:'1px solid #BFDBFE', borderRadius:10, padding:'12px 14px', fontSize:12.5, color:'#1D4ED8', lineHeight:1.5 }}>
            ✉️ {s.inviteNote}
          </div>
        </div>
        <div style={{ padding:'14px 24px', borderTop:'1px solid #E2E8F0', display:'flex', gap:10, justifyContent:'flex-end' }}>
          <button onClick={onClose} style={{ padding:'8px 20px', border:'1px solid #E2E8F0', borderRadius:8, background:'transparent', color:'#64748B', fontSize:13, fontFamily:'inherit', cursor:'pointer' }}>{s.cancel}</button>
          <button onClick={() => { window.TOAST?.show('Приглашение отправлено'); onClose(); }} style={{ padding:'8px 20px', border:'none', borderRadius:8, background:'#1D2B4F', color:'#FFCF00', fontWeight:700, fontSize:13, fontFamily:'inherit', cursor:'pointer' }}>{s.createBtn}</button>
        </div>
      </div>
    </>
  );
}

/* ─── USER ROW ────────────────────────────────────────────────── */
function UserRow({ user, sports, s, onAction }) {
  const [hov, setHov] = useStU(false);
  const [resent, setResent] = useStU(false);
  const handleResend = () => { setResent(true); setTimeout(()=>setResent(false), 2500); };

  return (
    <div
      style={{ display:'grid', gridTemplateColumns:'minmax(150px,1fr) 120px 190px 140px 110px 90px 160px', padding:'0 20px', borderBottom:'1px solid #F1F5F9', alignItems:'center', background:hov?'#F8FAFC':'transparent', transition:'background .1s', opacity: user.status==='inactive' ? 0.65 : 1 }}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
    >
      {/* User */}
      <div style={{ padding:'11px 0', display:'flex', alignItems:'center', gap:10, minWidth:0 }}>
        <div style={{ width:34, height:34, borderRadius:'50%', background:uAva(user.id), display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:12, fontWeight:600, flexShrink:0, opacity: user.status==='inactive' ? 0.5 : 1 }}>
          {uInit(user.name)}
        </div>
        <div style={{ minWidth:0 }}>
          <div style={{ fontSize:13, fontWeight:500, color:'#0F172A', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{user.name}</div>
          <div style={{ fontSize:11, color:'#94A3B8' }}>ID #{user.id}</div>
        </div>
      </div>
      {/* Role */}
      <div><RoleBadge role={user.role} s={s} /></div>
      {/* Email */}
      <div style={{ fontSize:12.5, color:'#475569', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{user.email}</div>
      {/* Sport */}
      <div style={{ fontSize:12.5, color: user.si !== null ? '#0F172A' : '#CBD5E1' }}>
        {user.si !== null ? sports[user.si] : '—'}
      </div>
      {/* Status */}
      <div><UStatusBadge status={user.status} s={s} /></div>
      {/* Created */}
      <div style={{ fontSize:12, color:'#94A3B8' }}>{user.created}</div>
      {/* Actions */}
      <div style={{ display:'flex', gap:6, opacity: hov ? 1 : 0, transition:'opacity .15s' }}>
        {user.status === 'invited' && (
          <button onClick={handleResend} style={{ fontSize:11, padding:'4px 9px', border:'1px solid #E2E8F0', borderRadius:6, background: resent ? '#F0FDF4' : '#fff', color: resent ? '#15803D' : '#475569', fontFamily:'inherit', cursor:'pointer', whiteSpace:'nowrap' }}>
            {resent ? '✓ ' + s.inviteSent : s.actionResend}
          </button>
        )}
        {user.status === 'active' && (
          <button onClick={()=>onAction(user.id,'deactivate')} style={{ fontSize:11, padding:'4px 9px', border:'1px solid #FCA5A5', borderRadius:6, background:'#FEF2F2', color:'#DC2626', fontFamily:'inherit', cursor:'pointer', whiteSpace:'nowrap' }}>
            {s.actionDeactivate}
          </button>
        )}
        {user.status === 'inactive' && (
          <button onClick={()=>onAction(user.id,'activate')} style={{ fontSize:11, padding:'4px 9px', border:'1px solid #BBF7D0', borderRadius:6, background:'#F0FDF4', color:'#15803D', fontFamily:'inherit', cursor:'pointer', whiteSpace:'nowrap' }}>
            {s.actionActivate}
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── USERS PAGE ──────────────────────────────────────────────── */
function UsersPage({ t, lang }) {
  const s = USTR[lang] || USTR.ru;
  const [users, setUsers] = useStU(USERS_DATA);
  const [fRole,   setFRole]   = useStU('all');
  const [fStatus, setFStatus] = useStU('all');
  const [search,  setSearch]  = useStU('');
  const [showAdd, setShowAdd] = useStU(false);

  const filtered = useSmU(() => {
    const q = search.trim().toLowerCase();
    return users
      .filter(u => fRole   === 'all' || u.role   === fRole)
      .filter(u => fStatus === 'all' || u.status === fStatus)
      .filter(u => !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  }, [users, fRole, fStatus, search]);

  const handleAction = (id, action) => {
    setUsers(prev => prev.map(u => {
      if (u.id !== id) return u;
      return {...u, status: action === 'deactivate' ? 'inactive' : 'active'};
    }));
  };

  const selSt = window.SHARED.selectStyle;
  const hasFilter = search || fRole !== 'all' || fStatus !== 'all';

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>

      {/* Stats */}
      <UStatStrip users={users} s={s} />

      {/* Filters + Add */}
      <div style={{ display:'flex', gap:10, alignItems:'center', flexWrap:'wrap' }}>
        {/* Search */}
        <div style={{ position:'relative', flex:'1 1 220px', minWidth:0 }}>
          <span style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:'#94A3B8', pointerEvents:'none' }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="7" cy="7" r="4.5"/><line x1="10.5" y1="10.5" x2="14" y2="14" strokeLinecap="round"/></svg>
          </span>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Поиск по ФИО или email..."
            style={{ width:'100%', height:36, padding:'0 10px 0 32px', border:'1px solid #E2E8F0', borderRadius:8, fontSize:13, color:'#0F172A', fontFamily:'inherit', outline:'none', background:'#fff' }}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{ position:'absolute', right:8, top:'50%', transform:'translateY(-50%)', width:18, height:18, border:'none', borderRadius:'50%', background:'#E2E8F0', color:'#64748B', fontSize:11, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', padding:0 }}>✕</button>
          )}
        </div>
        <select value={fRole} onChange={e=>setFRole(e.target.value)} style={{ ...selSt, minWidth:160 }}>
          <option value="all">{s.allRoles}</option>
          <option value="admin">{s.roleAdmin}</option>
          <option value="director">{s.roleDirector}</option>
          <option value="trainer">{s.roleTrainer}</option>
        </select>
        <select value={fStatus} onChange={e=>setFStatus(e.target.value)} style={{ ...selSt, minWidth:150 }}>
          <option value="all">{s.allStatus}</option>
          <option value="active">{s.statusActive}</option>
          <option value="invited">{s.statusInvited}</option>
          <option value="inactive">{s.statusInactive}</option>
        </select>
        {hasFilter && (
          <button onClick={()=>{setFRole('all');setFStatus('all');setSearch('');}}
            style={{ height:36, padding:'0 12px', border:'1px solid #E2E8F0', borderRadius:8, background:'transparent', color:'#94A3B8', fontSize:12.5, fontFamily:'inherit', cursor:'pointer' }}>
            {s.reset} ×
          </button>
        )}
        <div style={{ flex:1 }} />
        <button onClick={()=>setShowAdd(true)} style={{ display:'flex', alignItems:'center', gap:6, height:36, padding:'0 16px', border:'none', borderRadius:8, background:'#1D2B4F', color:'#FFCF00', fontWeight:700, fontSize:13, fontFamily:'inherit', cursor:'pointer', whiteSpace:'nowrap' }}>
          <span style={{ fontSize:16 }}>+</span> {s.addBtn}
        </button>
      </div>

      {/* Count */}
      <div style={{ fontSize:12, color:'#94A3B8' }}>
        {s.total}: <strong style={{ color:'#0F172A' }}>{filtered.length}</strong>
      </div>

      {/* Table */}
      <div style={{ background:'#fff', border:'1px solid #E2E8F0', borderRadius:12, overflow:'hidden' }}>
        <div style={{ display:'grid', gridTemplateColumns:'minmax(150px,1fr) 120px 190px 140px 110px 90px 160px', padding:'0 20px', background:'#F8FAFC', borderBottom:'1px solid #E2E8F0' }}>
          {[s.colUser, s.colRole, s.colEmail, s.colSport, s.colStatus, s.colCreated, s.colActions].map((col,i) => (
            <div key={i} style={{ padding:'9px 0', fontSize:11, fontWeight:600, color:'#94A3B8', textTransform:'uppercase', letterSpacing:0.5 }}>{col}</div>
          ))}
        </div>
        <div style={{ maxHeight:480, overflowY:'auto' }}>
          {filtered.map(u => (
            <UserRow key={u.id} user={u} sports={t.sports} s={s} onAction={handleAction} />
          ))}
        </div>
      </div>

      {showAdd && <AddUserModal onClose={()=>setShowAdd(false)} sports={t.sports} s={s} />}
    </div>
  );
}

Object.assign(window, { UsersPage });
