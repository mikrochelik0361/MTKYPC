import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

function TankForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ Добавлены nation_id и type_id в начальное состояние
  const [formData, setFormData] = useState({ 
    name: '',
    tier: '10',
    nation_id: '1',     // ← по умолчанию СССР
    type_id: '1',       // ← по умолчанию ЛТ
    image_url: '',
    
    // Огневая мощь
    dmg_1: '', dmg_2: '', dmg_3: '',
    pen_1: '', pen_2: '', pen_3: '',
    reload_time: '', aiming_time: '', dispersion: '',
    
    // Живучесть
    hp: '',
    hull_front: '', hull_side: '', hull_rear: '',
    turret_front: '', turret_side: '', turret_rear: '',
    
    // Мобильность
    weight_tons: '', engine_power: '',
    speed_forward: '', speed_backward: '',
    
    // Наблюдение
    view_range: '', radio_range: ''
  });

  // Загрузка данных при редактировании
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost/api/get_details.php?id=${id}`)
        .then(res => {
          // Убедимся, что все поля — строки (для совместимости с input/select)
          const data = res.data;
          const stringified = {};
          for (const key in data) {
            stringified[key] = data[key] == null ? '' : String(data[key]);
          }
          setFormData(stringified);
        })
        .catch(err => {
          console.error('Ошибка загрузки танка:', err);
          alert('Не удалось загрузить данные танка.');
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = id ? 'update_tank.php' : 'add_tank.php';
    const payload = id ? { ...formData, id } : formData;

    axios.post(`http://localhost/api/${url}`, payload)
      .then(() => {
        alert('Сохранено успешно!');
        navigate('/');
      })
      .catch(err => {
        console.error('Ошибка сохранения:', err);
        alert('Не удалось сохранить танк. Проверь консоль (F12 → Console).');
      });
  };

  return (
    <div className="specs-container">
      <h1 style={{ textAlign: 'center', color: '#ff8000', marginBottom: '30px' }}>
        {id ? 'РЕДАКТИРОВАНИЕ ТАНКА' : 'ДОБАВЛЕНИЕ НОВОГО ТАНКА'}
      </h1>

      <form className="wot-styled-form" onSubmit={handleSubmit}>
        
        {/* ЛЕВАЯ КОЛОНКА */}
        <div className="form-column">
          <div className="form-section">
            <div className="form-section-title">Основная информация</div>
            <label>Название танка</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Напр: Объект 140"
              required
            />
            <label>Ссылка на фото</label>
            <input
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="tank_image.png"
              required
            />
            <label>Уровень техники</label>
            <select name="tier" value={formData.tier} onChange={handleChange}>
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1} Уровень</option>
              ))}
            </select>

            {/* НАЦИЯ */}
            <label>Нация</label>
            <select name="nation_id" value={formData.nation_id} onChange={handleChange}>
              <option value="1">СССР</option>
              <option value="2">Германия</option>
              <option value="3">США</option>
              <option value="4">Франция</option>
            </select>

            {/* ТИП ТЕХНИКИ */}
            <label>Тип техники</label>
            <select name="type_id" value={formData.type_id} onChange={handleChange}>
              <option value="1">ЛТ</option>
              <option value="2">СТ</option>
              <option value="3">ТТ</option>
              <option value="4">ПТ</option>
            </select>
          </div>

          <div className="form-section">
            <div className="form-section-title">Живучесть</div>
            <label>Прочность (ед.)</label>
            <input
              name="hp"
              type="number"
              value={formData.hp}
              onChange={handleChange}
              placeholder="2500"
            />
            
            <label>Броня корпуса (Лоб / Борт / Корма)</label>
            <div className="input-row">
              <input name="hull_front" type="number" value={formData.hull_front} onChange={handleChange} placeholder="Лоб" />
              <input name="hull_side" type="number" value={formData.hull_side} onChange={handleChange} placeholder="Борт" />
              <input name="hull_rear" type="number" value={formData.hull_rear} onChange={handleChange} placeholder="Корма" />
            </div>

            <label>Броня башни (Лоб / Борт / Корма)</label>
            <div className="input-row">
              <input name="turret_front" type="number" value={formData.turret_front} onChange={handleChange} placeholder="Лоб" />
              <input name="turret_side" type="number" value={formData.turret_side} onChange={handleChange} placeholder="Борт" />
              <input name="turret_rear" type="number" value={formData.turret_rear} onChange={handleChange} placeholder="Корма" />
            </div>
          </div>

          <div className="form-section">
            <div className="form-section-title">Наблюдение</div>
            <div className="input-row">
              <div>
                <label>Обзор (м)</label>
                <input name="view_range" type="number" value={formData.view_range} onChange={handleChange} placeholder="400" />
              </div>
              <div>
                <label>Связь (м)</label>
                <input name="radio_range" type="number" value={formData.radio_range} onChange={handleChange} placeholder="750" />
              </div>
            </div>
          </div>
        </div>

        {/* ПРАВАЯ КОЛОНКА */}
        <div className="form-column">
          <div className="form-section">
            <div className="form-section-title">Огневая мощь</div>
            <label>Средний урон (ББ / КС / ОФ)</label>
            <div className="input-row">
              <input name="dmg_1" type="number" value={formData.dmg_1} onChange={handleChange} placeholder="ББ" />
              <input name="dmg_2" type="number" value={formData.dmg_2} onChange={handleChange} placeholder="КС" />
              <input name="dmg_3" type="number" value={formData.dmg_3} onChange={handleChange} placeholder="ОФ" />
            </div>
            
            <label>Бронепробиваемость (мм)</label>
            <div className="input-row">
              <input name="pen_1" type="number" value={formData.pen_1} onChange={handleChange} placeholder="ББ" />
              <input name="pen_2" type="number" value={formData.pen_2} onChange={handleChange} placeholder="КС" />
              <input name="pen_3" type="number" value={formData.pen_3} onChange={handleChange} placeholder="ОФ" />
            </div>

            <label>Характеристики орудия</label>
            <div className="input-row">
              <input name="reload_time" type="number" value={formData.reload_time} onChange={handleChange} placeholder="КД (сек)" />
              <input name="aiming_time" type="number" value={formData.aiming_time} onChange={handleChange} placeholder="Сведение" />
              <input name="dispersion" type="number" value={formData.dispersion} onChange={handleChange} placeholder="Разброс" />
            </div>
          </div>

          <div className="form-section">
            <div className="form-section-title">Мобильность</div>
            <div className="input-row two-cols">
              <div>
                <label>Масса (т)</label>
                <input name="weight_tons" type="number" value={formData.weight_tons} onChange={handleChange} placeholder="0.00" />
              </div>
              <div>
                <label>Двигатель (л.с.)</label>
                <input name="engine_power" type="number" value={formData.engine_power} onChange={handleChange} placeholder="1000" />
              </div>
            </div>
            <label>Скорость (Вперед / Назад)</label>
            <div className="input-row two-cols">
              <input name="speed_forward" type="number" value={formData.speed_forward} onChange={handleChange} placeholder="Вперед" />
              <input name="speed_backward" type="number" value={formData.speed_backward} onChange={handleChange} placeholder="Назад" />
            </div>
          </div>

          <button type="submit" className="submit-btn">Сохранить изменения</button>
        </div>
      </form>

      <Link to="/" className="back-link" style={{ display: 'block', marginTop: '20px' }}>
        ← Вернуться назад
      </Link>
    </div>
  );
}

export default TankForm;