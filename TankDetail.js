import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function TankDetail() {
  const { id } = useParams(); 
  const [details, setDetails] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost/api/get_details.php?id=${id}`).then(res => setDetails(res.data));
  }, [id]);

  if (!details) return <div className="loading">Загрузка...</div>;

  // Расчетные данные
  const rof = (60 / parseFloat(details.reload_time)).toFixed(2);
  const dpm = Math.round(rof * details.dmg_1);
  const hp_ton = (details.engine_power / details.weight_tons).toFixed(2);

  return (
    <div className="specs-container">
      <div className="specs-title">ТЕХНИЧЕСКИЕ ХАРАКТЕРИСТИКИ</div>

      <div className="specs-grid">
        {/* ЛЕВАЯ КОЛОНКА */}
        <div className="column">
          <div className="spec-group">
            <div className="category-header">ОГНЕВАЯ МОЩЬ ⚔️</div>
            <div className="stat-row"><span className="stat-name">Урон</span><span className="stat-value">{details.dmg_1} / {details.dmg_2} / {details.dmg_3} ед.</span></div>
            <div className="stat-row"><span className="stat-name">Бронепробиваемость</span><span className="stat-value">{details.pen_1} / {details.pen_2} / {details.pen_3} мм</span></div>
            <div className="stat-row"><span className="stat-name">Время перезарядки орудия</span><span className="stat-value">{details.reload_time} с</span></div>
            <div className="stat-row"><span className="stat-name">Скорострельность</span><span className="stat-value">{rof} выстр/мин</span></div>
            <div className="stat-row"><span className="stat-name">Урон в минуту</span><span className="stat-value">{dpm} ед/мин</span></div>
            <div className="stat-row"><span className="stat-name">Время сведения</span><span className="stat-value">{details.aiming_time} с</span></div>
            <div className="stat-row"><span className="stat-name">Разброс на 100 м</span><span className="stat-value">{details.dispersion} м</span></div>
          </div>

          <div className="spec-group" style={{marginTop:'40px'}}>
            <div className="category-header">ЖИВУЧЕСТЬ 🛡️</div>
            <div className="stat-row"><span className="stat-name">Прочность</span><span className="stat-value">{details.hp} ед.</span></div>
            <div className="stat-row"><span className="stat-name">Бронирование корпуса</span><span className="stat-value">{details.hull_front} / {details.hull_side} / {details.hull_rear} мм</span></div>
            <div className="stat-row"><span className="stat-name">Бронирование башни</span><span className="stat-value">{details.turret_front} / {details.turret_side} / {details.turret_rear} мм</span></div>
          </div>
        </div>

        {/* ПРАВАЯ КОЛОНКА */}
        <div className="column">
          <div className="spec-group">
            <div className="category-header">МОБИЛЬНОСТЬ ❱❱</div>
            <div className="stat-row"><span className="stat-name">Масса</span><span className="stat-value">{details.weight_tons} т</span></div>
            <div className="stat-row"><span className="stat-name">Мощность двигателя</span><span className="stat-value">{details.engine_power} л.с.</span></div>
            <div className="stat-row"><span className="stat-name">Удельная мощность</span><span className="stat-value">{hp_ton} л.с./т</span></div>
            <div className="stat-row"><span className="stat-name">Максимальная скорость</span><span className="stat-value">{details.speed_forward} / {details.speed_backward} км/ч</span></div>
          </div>

          <div className="spec-group" style={{marginTop:'40px'}}>
            <div className="category-header">НАБЛЮДЕНИЕ 🔭</div>
            <div className="stat-row"><span className="stat-name">Обзор</span><span className="stat-value">{details.view_range} м</span></div>
            <div className="stat-row"><span className="stat-name">Дальность связи</span><span className="stat-value">{details.radio_range} м</span></div>
          </div>
        </div>
      </div>

      <p className="footer-note" style={{marginTop:'30px', color:'#555'}}>ⓘ Технические характеристики указаны для техники с уровнем обучения экипажа 100%.</p>
      <Link to="/" className="back-link" style={{color:'#ff8000', textDecoration:'none'}}>← Назад в Танкопедию</Link>
    </div>
  );
}
export default TankDetail;