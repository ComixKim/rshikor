// reports.jsx — Раздел «Отчёты»
// Exports: ReportsPage → window

const { useState: useStR, useEffect: useEfR } = React;

/* ─── I18N ────────────────────────────────────────────────────── */
const RSTR = {
  ru: {
    subtitle:'Формирование и выгрузка отчётов',
    formatExcel:'Excel', formatPdf:'PDF', export:'Выгрузить',
    generating:'Формируется...', done:'Файл готов',
    allSports:'Все виды спорта', allStatus:'Все статусы', allMedals:'Все медали',
    periodYear:'За год', period2025:'2025', period2026:'2026', periodAll:'За всё время',
    filters:'Фильтры:',
    reports: [
      {
        id:'students', icon:'👥', color:'#0055A4', bg:'#EFF6FF',
        title:'Список учеников',
        desc:'Все ученики с контактами, группами и статусами.',
        count:'333 ученика', formats:['excel','pdf'],
        filters:['sport','status'],
      },
      {
        id:'medical', icon:'🏥', color:'#DC2626', bg:'#FEF2F2',
        title:'Медицинский отчёт',
        desc:'Активные и архивные травмы с цветовыми индикаторами.',
        count:'8 активных случаев', formats:['excel','pdf'],
        filters:['medStatus'],
      },
      {
        id:'achievements', icon:'🏆', color:'#F59E0B', bg:'#FFFBEB',
        title:'Отчёт по достижениям',
        desc:'Медали и результаты спортсменов за выбранный период.',
        count:'47 достижений в 2026', formats:['excel','pdf'],
        filters:['sport','medal','period'],
      },
      {
        id:'sports', icon:'📊', color:'#1D2B4F', bg:'#F1F5F9',
        title:'Статистика по видам спорта',
        desc:'Количество учеников и групп по каждому виду спорта.',
        count:'14 видов спорта', formats:['excel','pdf'],
        filters:[],
      },
      {
        id:'trainers', icon:'🎽', color:'#16A34A', bg:'#F0FDF4',
        title:'Список тренеров',
        desc:'ФИО, вид спорта, количество учеников в группах.',
        count:'14 тренеров', formats:['excel'],
        filters:[],
      },
    ],
  },
  kz: {
    subtitle:'Есептерді қалыптастыру және жүктеу',
    formatExcel:'Excel', formatPdf:'PDF', export:'Жүктеу',
    generating:'Қалыптасуда...', done:'Файл дайын',
    allSports:'Барлық спорт', allStatus:'Барлық мәртебе', allMedals:'Барлық медаль',
    periodYear:'Жыл бойынша', period2025:'2025', period2026:'2026', periodAll:'Барлық уақыт',
    filters:'Сүзгілер:',
    reports: [
      {
        id:'students', icon:'👥', color:'#0055A4', bg:'#EFF6FF',
        title:'Оқушылар тізімі',
        desc:'Контактілері, топтары және мәртебелері бар барлық оқушылар.',
        count:'333 оқушы', formats:['excel','pdf'],
        filters:['sport','status'],
      },
      {
        id:'medical', icon:'🏥', color:'#DC2626', bg:'#FEF2F2',
        title:'Медициналық есеп',
        desc:'Түс индикаторлары бар белсенді және мұрағаттық жарақаттар.',
        count:'8 белсенді жағдай', formats:['excel','pdf'],
        filters:['medStatus'],
      },
      {
        id:'achievements', icon:'🏆', color:'#F59E0B', bg:'#FFFBEB',
        title:'Жетістіктер есебі',
        desc:'Таңдалған кезең үшін спортшылардың медальдары мен нәтижелері.',
        count:'2026 жылы 47 жетістік', formats:['excel','pdf'],
        filters:['sport','medal','period'],
      },
      {
        id:'sports', icon:'📊', color:'#1D2B4F', bg:'#F1F5F9',
        title:'Спорт түрлері статистикасы',
        desc:'Әр спорт түрі бойынша оқушылар мен топтар саны.',
        count:'14 спорт түрі', formats:['excel','pdf'],
        filters:[],
      },
      {
        id:'trainers', icon:'🎽', color:'#16A34A', bg:'#F0FDF4',
        title:'Жаттықтырушылар тізімі',
        desc:'ТАӘ, спорт түрі, топтардағы оқушылар саны.',
        count:'14 жаттықтырушы', formats:['excel'],
        filters:[],
      },
    ],
  },
};

/* ─── SPORT STATS DATA ────────────────────────────────────────── */
const STATS_SPORTS = [
  {si:4, n:42},{si:0, n:38},{si:1, n:35},{si:2, n:28},{si:9, n:28},
  {si:3, n:22},{si:8, n:24},{si:5, n:26},{si:7, n:20},{si:6, n:16},
  {si:10,n:18},{si:11,n:14},{si:12,n:12},{si:13,n:10},
];

/* ─── MINI CHART (for sports stats card) ─────────────────────── */
function MiniChart({ sports }) {
  const top5 = [...STATS_SPORTS].sort((a,b)=>b.n-a.n).slice(0,5);
  const maxN = top5[0]?.n || 1;
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:5, marginTop:10 }}>
      {top5.map((item,i) => (
        <div key={i} style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:90, fontSize:11, color:'#475569', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', flexShrink:0 }}>
            {sports[item.si]}
          </div>
          <div style={{ flex:1, height:5, background:'#E2E8F0', borderRadius:3 }}>
            <div style={{ height:'100%', width:`${(item.n/maxN)*100}%`, background:'#1D2B4F', borderRadius:3, transition:'width 0.6s ease' }} />
          </div>
          <div style={{ width:24, textAlign:'right', fontSize:11, fontWeight:600, color:'#0F172A', flexShrink:0 }}>{item.n}</div>
        </div>
      ))}
    </div>
  );
}

/* ─── EXPORT BUTTON ───────────────────────────────────────────── */
function ExportBtn({ format, s, reportId }) {
  const [state, setState] = useStR('idle'); // idle | loading | done
  const isExcel = format === 'excel';
  const colors = {
    excel: {bg:'#166534', hov:'#14532D', light:'#F0FDF4', border:'#BBF7D0', text:'#15803D'},
    pdf:   {bg:'#991B1B', hov:'#7F1D1D', light:'#FEF2F2', border:'#FCA5A5', text:'#DC2626'},
  };
  const c = colors[format];

  const handleClick = () => {
    setState('loading');
    setTimeout(() => {
      setState('done');
      setTimeout(() => setState('idle'), 2000);
    }, 1200);
  };

  if (state === 'loading') {
    return (
      <button style={{ display:'flex', alignItems:'center', gap:6, padding:'7px 14px', border:`1px solid ${c.border}`, borderRadius:8, background:c.light, color:c.text, fontSize:12.5, fontFamily:'inherit', cursor:'wait' }}>
        <span style={{ animation:'spin 1s linear infinite', display:'inline-block' }}>⟳</span>
        {s.generating}
      </button>
    );
  }
  if (state === 'done') {
    return (
      <button style={{ display:'flex', alignItems:'center', gap:6, padding:'7px 14px', border:'1px solid #BBF7D0', borderRadius:8, background:'#F0FDF4', color:'#15803D', fontSize:12.5, fontFamily:'inherit', cursor:'default', fontWeight:600 }}>
        ✓ {s.done}
      </button>
    );
  }
  return (
    <button onClick={handleClick}
      style={{ display:'flex', alignItems:'center', gap:6, padding:'7px 16px', border:'none', borderRadius:8, background:c.bg, color:'#fff', fontSize:12.5, fontWeight:600, fontFamily:'inherit', cursor:'pointer', transition:'background .12s' }}
      onMouseEnter={e=>e.currentTarget.style.background=c.hov}
      onMouseLeave={e=>e.currentTarget.style.background=c.bg}
    >
      <span style={{ fontSize:13 }}>{isExcel ? '⬇' : '📄'}</span>
      {isExcel ? s.formatExcel : s.formatPdf}
    </button>
  );
}

/* ─── REPORT CARD ─────────────────────────────────────────────── */
function ReportCard({ report, s, sports, lang }) {
  const [fSport,     setFSport]     = useStR('all');
  const [fStatus,    setFStatus]    = useStR('all');
  const [fMedStatus, setFMedStatus] = useStR('all');
  const [fMedal,     setFMedal]     = useStR('all');
  const [fPeriod,    setFPeriod]    = useStR('2026');

  const selSt = { height:28, padding:'0 8px', border:'1px solid #E2E8F0', borderRadius:6, fontSize:12, color:'#475569', background:'#fff', fontFamily:'inherit', cursor:'pointer', outline:'none' };

  const hasFilters = report.filters.length > 0;

  return (
    <div style={{
      background:'#fff', border:'1px solid #E2E8F0', borderRadius:14,
      overflow:'hidden', display:'flex', flexDirection:'column',
      borderTop:`3px solid ${report.color}`,
    }}>
      {/* Card Header */}
      <div style={{ padding:'18px 22px 14px', flex:1 }}>
        <div style={{ display:'flex', alignItems:'flex-start', gap:12, marginBottom:10 }}>
          <div style={{ width:40, height:40, borderRadius:10, background:report.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>
            {report.icon}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:14, fontWeight:700, color:'#0F172A', marginBottom:3 }}>{report.title}</div>
            <div style={{ fontSize:12.5, color:'#475569', lineHeight:1.5 }}>{report.desc}</div>
          </div>
          <div style={{ fontSize:12, fontWeight:600, color:report.color, background:report.bg, padding:'3px 10px', borderRadius:20, whiteSpace:'nowrap', flexShrink:0 }}>
            {report.count}
          </div>
        </div>

        {/* Mini chart for sports stats */}
        {report.id === 'sports' && <MiniChart sports={sports} />}

        {/* Filters */}
        {hasFilters && (
          <div style={{ marginTop:12, paddingTop:12, borderTop:'1px solid #F1F5F9' }}>
            <div style={{ fontSize:11, fontWeight:600, color:'#94A3B8', textTransform:'uppercase', letterSpacing:0.5, marginBottom:8 }}>{s.filters}</div>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {report.filters.includes('sport') && (
                <select value={fSport} onChange={e=>setFSport(e.target.value)} style={selSt}>
                  <option value="all">{s.allSports}</option>
                  {sports.map((sp,i)=><option key={i} value={i}>{sp}</option>)}
                </select>
              )}
              {report.filters.includes('status') && (
                <select value={fStatus} onChange={e=>setFStatus(e.target.value)} style={selSt}>
                  <option value="all">{s.allStatus}</option>
                  <option value="active">{lang==='kz'?'Белсенді':'Активен'}</option>
                  <option value="graduate">{lang==='kz'?'Түлек':'Выпускник'}</option>
                  <option value="expelled">{lang==='kz'?'Шығарылды':'Отчислен'}</option>
                </select>
              )}
              {report.filters.includes('medStatus') && (
                <select value={fMedStatus} onChange={e=>setFMedStatus(e.target.value)} style={selSt}>
                  <option value="all">{s.allStatus}</option>
                  <option value="red">🔴 {lang==='kz'?'Толық босату':'Полное освобождение'}</option>
                  <option value="yellow">🟡 {lang==='kz'?'Шектеулі':'Ограниченные'}</option>
                </select>
              )}
              {report.filters.includes('medal') && (
                <select value={fMedal} onChange={e=>setFMedal(e.target.value)} style={selSt}>
                  <option value="all">{s.allMedals}</option>
                  <option value="gold">🥇</option>
                  <option value="silver">🥈</option>
                  <option value="bronze">🥉</option>
                </select>
              )}
              {report.filters.includes('period') && (
                <select value={fPeriod} onChange={e=>setFPeriod(e.target.value)} style={selSt}>
                  <option value="2026">{s.period2026}</option>
                  <option value="2025">{s.period2025}</option>
                  <option value="all">{s.periodAll}</option>
                </select>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Export Buttons */}
      <div style={{ padding:'12px 22px', borderTop:'1px solid #F1F5F9', background:'#FAFBFD', display:'flex', gap:8 }}>
        {report.formats.map(fmt => (
          <ExportBtn key={fmt} format={fmt} s={s} reportId={report.id} />
        ))}
      </div>
    </div>
  );
}

/* ─── REPORTS PAGE ────────────────────────────────────────────── */
function ReportsPage({ t, lang }) {
  const s = RSTR[lang] || RSTR.ru;
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <style>{`@keyframes spin { from { transform:rotate(0deg) } to { transform:rotate(360deg) } }`}</style>

      <p style={{ fontSize:13, color:'#94A3B8' }}>{s.subtitle}</p>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(440px, 1fr))', gap:16 }}>
        {s.reports.map(report => (
          <ReportCard key={report.id} report={report} s={s} sports={t.sports} lang={lang} />
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { ReportsPage });
