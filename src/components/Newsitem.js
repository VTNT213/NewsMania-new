import React from 'react';
import news from './news.png';  //for default image

export default function Newsitem({ title, description, imageUrl, newsUrl, author, date }) {
  return (
    <div className="card">
      <img 
        src={imageUrl ? imageUrl : news} 
        className="card-img-top" 
        alt="news" 
        style={{ width: '100%', height: '150px', objectFit: 'cover' }}  // Resize image
      />
      <div className="card-body">
        <h5 className="card-title" style={{ fontSize: '1.1rem' }}>{title}</h5>
        <p className="card-text" style={{ fontSize: '0.9rem' }}>{description}...</p>
        <a 
          rel="noreferrer" 
          href={newsUrl} 
          target="_blank" 
          className="btn btn-sm btn-danger">
          Read More
        </a>
        <p className="card-text text-warning">
          <small className="text-body-secondary">{author} | {new Date(date).toGMTString()}</small>
        </p>
      </div>
    </div>
  );
}
