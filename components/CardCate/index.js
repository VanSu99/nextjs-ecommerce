import React from 'react';
import styles from './card.module.css';

const fakeData = [
  {
    id: 1,
    name: 'SOLSKJAER BACKS RELIABLE DE GEA',
    imgUrl:
      'https://besthqwallpapers.com/Uploads/19-9-2017/21046/thumb2-victor-lindel%C3%B6f-manchester-united-4k-swedish-footballer-premier-league.jpg',
  },
  {
    id: 2,
    name: 'FERNANDES VOTED PREMIER LEAGUE PLAYER OF THE MONTH',
    imgUrl:
      'https://besthqwallpapers.com/Uploads/20-3-2020/125716/thumb2-bruno-fernandes-4k-goal-manchester-united-fc-premier-league.jpg',
  },
  {
    id: 3,
    name: 'SOLSKJAER BACKS RELIABLE DE GEA',
    imgUrl:
      'https://besthqwallpapers.com/Uploads/1-9-2018/64108/thumb2-david-de-gea-4k-manchester-united-art-splashes-of-paint.jpg',
  },
  {
    id: 4,
    name: 'SOLSKJAER BACKS RELIABLE DE GEA',
    imgUrl:
      'https://besthqwallpapers.com/Uploads/4-1-2019/76634/thumb2-manchester-united-stadium-4k-soccer-empty-stadium-old-trafford.jpg',
  },
];

export default function Card() {
  return (
    <>
      {fakeData.map((value) => (
        <div className="col-lg-6" key={value.id}>
          <div className={styles.card}>
            <div className={styles.imgCard}>
              <img src={value.imgUrl} alt="" />
            </div>
            <div className={styles.cardContent}>
              <p>{value.name}</p>
              <a href="/">Shop now</a>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
