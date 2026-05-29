// shared.js — Общие стили и константы
// Загружается ДО компонентных файлов (без Babel)

window.SHARED = {
  // Текстовое поле — используется во всех модалах
  inputStyle: {
    width: '100%',
    height: 34,
    padding: '0 10px',
    border: '1px solid #E2E8F0',
    borderRadius: 8,
    fontSize: 13,
    color: '#0F172A',
    fontFamily: 'inherit',
    background: '#fff',
    outline: 'none',
    boxSizing: 'border-box',
  },
  // Выпадающий список — фильтры на всех страницах
  selectStyle: {
    height: 36,
    padding: '0 10px',
    border: '1px solid #E2E8F0',
    borderRadius: 8,
    fontSize: 13,
    color: '#475569',
    background: '#fff',
    fontFamily: 'inherit',
    cursor: 'pointer',
    outline: 'none',
  },
};
