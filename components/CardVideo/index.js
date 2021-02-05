import React from 'react';
import styles from './cvideo.module.css';

const videoCard = [
  {
    id: 1,
    name: 'Hear more from Solskjaer',
    imgUrl:
      'https://assets.manutd.com/AssetPicker/images/0/0/14/160/958551/MUFC_v_SFC_65_copy_11612435266484_small.jpg',
  },
  {
    id: 2,
    name: 'Hear more from Solskjaer',
    imgUrl:
      'https://assets.manutd.com/AssetPicker/images/0/0/14/161/958882/UnitedDaily3February_11612371739935_small.jpg',
  },
  {
    id: 3,
    name: 'Hear more from Solskjaer',
    imgUrl: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/b8a93b30339823.56c50f00d8d62.png',
  },
  {
    id: 4,
    name: 'Hear more from Solskjaer',
    imgUrl: 'https://assets.manutd.com/AssetPicker/images/0/0/14/161/958747/MUFC_v_SFC_158_copy1612344111845_small.jpg',
  },
];

export default function CardVideo() {
  return (
    <>
      {videoCard.map((value) => {
        return (
          <div className="col-lg-3" key={value.id}>
            <div className={styles.card}>
              <div className={styles.imgCard}>
                <img src={value.imgUrl} alt="" />
              </div>
              <div className={styles.cardContent}>
                <div className={styles.itemPlay}>
                  <i className="fa fa-play" aria-hidden="true"></i>
                </div>
                <h2>{value.name}</h2>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
