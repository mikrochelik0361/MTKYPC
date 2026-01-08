import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function NewsDetail() {
  const { id } = useParams();
  const [n, setN] = useState(null);
  useEffect(() => { axios.get(`http://localhost/api/get_news_detail.php?id=${id}`).then(res => setN(res.data)); }, [id]);
  if (!n) return <div style={{color:'white'}}>Загрузка...</div>;
  return (
    <div className="news-detail-container">
      <h3 style={{color:'#ff8000'}}>{n.cat_name}</h3>
      <h1>{n.title}</h1>
      <img src={'/images/'+n.cover_image_url} alt="" className="news-main-img" />
      <div className="news-text-body">{n.content}</div>
      <Link to="/" className="back-link">← К ленте</Link>
    </div>
  );
}
export default NewsDetail;