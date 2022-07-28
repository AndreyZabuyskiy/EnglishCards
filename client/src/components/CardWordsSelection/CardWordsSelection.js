import style from "./CardWordsSelection.module.css";

export const CardWordsSelection = () => {
  return (
    <div className={style.card}>
      <div className={style.header}>
        <div>Вопрос для подбора</div>
        <div>Нажмите термин, подходящий определению</div>
      </div>
      <div className={style.content}>
        <div className={style.single__card}>
          <div><button></button></div>
          <div className={style.translate}>
            <div>природа</div>
            <div>
              <img className={style.card__img}
                src='https://media-cdn.tripadvisor.com/media/photo-s/0c/bb/a3/97/predator-ride-in-the.jpg' />
            </div>
          </div>
        </div>
        <div className={style.single__card}>
          <div><button></button></div>
          <div className={style.translate}>
            <div>природа</div>
            <div>
              <img className={style.card__img}
                src='https://media-cdn.tripadvisor.com/media/photo-s/0c/bb/a3/97/predator-ride-in-the.jpg' />
            </div>
          </div>
        </div>
        <div className={style.single__card}>
          <div><button></button></div>
          <div className={style.translate}>
            <div>природа</div>
            <div>
              <img className={style.card__img}
                src='https://media-cdn.tripadvisor.com/media/photo-s/0c/bb/a3/97/predator-ride-in-the.jpg' />
            </div>
          </div>
        </div>
      </div>
      <div className={style.footer}>
        <button>honest</button>
        <button>nature</button>
        <button>polite</button>
        <button>rescue</button>
        <button>fireman</button>
      </div>
    </div>
  );
}