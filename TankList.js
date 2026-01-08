import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NewsSidebar from './NewsSidebar';

function TankList() {
  const [tanks, setTanks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterNation, setFilterNation] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user && user.role === 'admin';
  

  useEffect(() => { loadTanks(); }, []);
  const loadTanks = () => {
    axios.get('http://localhost/api/get_tanks.php').then(res => setTanks(res.data));
  };
  const handleDelete = (id) => {
  const confirmDelete = window.confirm("Вы уверены, что хотите безвозвратно удалить этот танк?");
  
  if (confirmDelete) {
    axios.get(`http://localhost/api/delete_tank.php?id=${id}`)
      .then(res => {
        alert("Танк успешно удален из базы");
        loadTanks();
      })
      .catch(err => alert("Ошибка при удалении"));
  }
};

  const filtered = tanks.filter(t => 
  t.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
  (filterNation === 'all' || String(t.nation_id) === filterNation) &&
  (filterType === 'all' || String(t.type_id) === filterType)
);
  return (
    <div className="main-page">
      <div style={{display:'flex', justifyContent:'space-between', padding:'10px 40px'}}>
        <h1>Танкопедия</h1>
        {user ? <div style={{color:'#ff9100'}}>{user.nickname} <button onClick={() => {localStorage.removeItem('user'); window.location.reload()}}>Выйти</button></div> : <Link to="/login"><button>Войти</button></Link>}
      </div>
      <div className="content-wrapper">
        <div className="main-column">
          <div className="filter-panel">
  <input placeholder="Поиск..." onChange={e => setSearchTerm(e.target.value)} />
  
  {/* Фильтр по нациям */}
  <select onChange={e => setFilterNation(e.target.value)}>
    <option value="all">Все нации</option>
    <option value="1">СССР</option>
    <option value="2">Германия</option>
    <option value="3">США</option>
    <option value="4">Франция</option>
  </select>

  {/* Фильтр по типу техники */}
  <select onChange={e => setFilterType(e.target.value)}>
    <option value="all">Все классы</option>
    <option value="1">ЛТ</option>
    <option value="2">СТ</option>
    <option value="3">ТТ</option>
    <option value="4">ПТ</option>
  </select>

  {isAdmin && <Link to="/admin"><button>➕ Добавить</button></Link>}
</div>
          {/* СЕТКА ТАНКОВ + ЛОГИКА ДЛЯ ПРИМЕРА 5 */}
          <div className="tank-grid">
            {filtered.length > 0 ? (
              // Если танки найдены — показываем их
              filtered.map(tank => (
                <div key={tank.id} className="tank-card">
                  <div className="tank-img-container">
                    <img src={'/images/' + tank.image_url} alt={tank.name} />
                    <div className="tier-badge">{tank.tier} ур.</div>
                  </div>
                  <div className="tank-info">
                    <h3>{tank.name}</h3>
                    <p className="tank-details-text">{tank.nation_name} | {tank.type_name}</p>
                  </div>
                  <div className="card-buttons">
                    <Link to={`/tank/${tank.id}`} style={{textDecoration:'none'}}><button className="btn-more">ТТХ</button></Link>
                    {isAdmin && (
                      <>
                        <Link to={`/edit/${tank.id}`} style={{textDecoration:'none'}}><button className="btn-edit">✏️</button></Link>
                        <button className="btn-delete" onClick={() => handleDelete(tank.id)}>🗑️</button>
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              // ЕСЛИ ТАНКИ НЕ НАЙДЕНЫ (ДЛЯ СКРИНШОТА ПРИМЕРА 5)
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '100px 20px' }}>
                <h2 style={{ color: '#ff9100', textTransform: 'uppercase' }}>Танки не найдены по вашему запросу</h2>
                <p style={{ color: '#666' }}>Попробуйте выбрать другую нацию или изменить текст поиска</p>
              </div>
            )}
          </div>
        </div>

        {/* ПРАВАЯ КОЛОНКА НОВОСТЕЙ */}
        <NewsSidebar />
      </div>
    </div>
  );
}
export default TankList;