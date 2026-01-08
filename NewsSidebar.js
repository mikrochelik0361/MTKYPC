import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function NewsSidebar() {
  const [news, setNews] = useState([]);
  useEffect(() => { axios.get('http://localhost/api/get_news.php').then(res => setNews(res.data)); }, []);
  return (
    <div className="news-sidebar">
      <h2 className="news-title">Новости</h2>
      {news.map(item => (
        <div key={item.id} className="news-item">
          <div className="news-cat">{item.cat_name}</div>
          <Link to={`/news/${item.id}`} className="news-item-link"><div className="news-item-title">{item.title}</div></Link>
        </div>
      ))}
    </div>
  );
}
export default NewsSidebar;