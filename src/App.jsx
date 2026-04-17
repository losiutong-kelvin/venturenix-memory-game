import { useState, useEffect, useCallback } from 'react';
import './App.css';

const initialCards = [
  { id: 1,  pairId: 1, src: '/img/animal1.jpg', alt: 'Cat' },
  { id: 2,  pairId: 1, src: '/img/animal1.jpg', alt: 'Cat' },
  { id: 3,  pairId: 2, src: '/img/animal2.jpg', alt: 'Cat 2' },
  { id: 4,  pairId: 2, src: '/img/animal2.jpg', alt: 'Cat 2' },
  { id: 5,  pairId: 3, src: '/img/animal3.jpg', alt: 'Dog' },
  { id: 6,  pairId: 3, src: '/img/animal3.jpg', alt: 'Dog' },
  { id: 7,  pairId: 4, src: '/img/animal4.jpg', alt: 'Dogs' },
  { id: 8,  pairId: 4, src: '/img/animal4.jpg', alt: 'Dogs' },
  { id: 9,  pairId: 5, src: '/img/animal5.jpg', alt: 'Dog 2' },
  { id: 10, pairId: 5, src: '/img/animal5.jpg', alt: 'Dog 2' },
  { id: 11, pairId: 6, src: '/img/animal6.jpg', alt: 'Rabbit' },
  { id: 12, pairId: 6, src: '/img/animal6.jpg', alt: 'Rabbit' },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck() {
  return shuffle(initialCards).map((card, idx) => ({
    ...card,
    uid: idx,
    flipped: false,
    matched: false,
  }));
}

function preloadImages() {
  initialCards.forEach((card) => {
    const img = new Image();
    img.src = card.src;
  });
}

export default function App() {
  const [cards, setCards] = useState(() => buildDeck());
  const [flippedUids, setFlippedUids] = useState([]);
  const [locked, setLocked] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [matches, setMatches] = useState(0);

  useEffect(() => {
    preloadImages();
  }, []);

  const handleNewGame = useCallback(() => {
    setCards(buildDeck());
    setFlippedUids([]);
    setLocked(false);
    setAttempts(0);
    setMatches(0);
  }, []);

  const handleCardClick = useCallback(
    (uid) => {
      if (locked) return;

      const card = cards.find((c) => c.uid === uid);
      if (!card || card.flipped || card.matched) return;
      if (flippedUids.includes(uid)) return;

      const newFlipped = [...flippedUids, uid];

      setCards((prev) =>
        prev.map((c) => (c.uid === uid ? { ...c, flipped: true } : c))
      );

      if (newFlipped.length === 1) {
        setFlippedUids(newFlipped);
        return;
      }

      setFlippedUids([]);
      setAttempts((prev) => prev + 1);
      setLocked(true);

      const [firstUid] = flippedUids;
      const firstCard = cards.find((c) => c.uid === firstUid);

      if (firstCard.pairId === card.pairId) {
        setMatches((prev) => prev + 1);
        setCards((prev) =>
          prev.map((c) =>
            c.uid === firstUid || c.uid === uid
              ? { ...c, flipped: true, matched: true }
              : c
          )
        );
        setLocked(false);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.uid === firstUid || c.uid === uid
                ? { ...c, flipped: false }
                : c
            )
          );
          setLocked(false);
        }, 1000);
      }
    },
    [cards, flippedUids, locked]
  );

  return (
    <div className="app">
      <h1 className="title">Venturenix LAB Memory Game</h1>

      <div className="stats-bar">
        <span className="stat">成功配對次數: <strong>{matches}</strong></span>
        <span className="stat">嘗試配對次數: <strong>{attempts}</strong></span>
        <button className="new-game-btn" onClick={handleNewGame}>
          新遊戲
        </button>
      </div>

      <div className="grid">
        {cards.map((card) => (
          <div
            key={card.uid}
            className={`card-wrapper${card.flipped || card.matched ? ' flipped' : ''}${card.matched ? ' matched' : ''}`}
            onClick={() => handleCardClick(card.uid)}
          >
            <div className="card-inner">
              <div className="card-face card-back">
                <span className="back-label">Venturenix LAB</span>
              </div>
              <div className="card-face card-front">
                <img src={card.src} alt={card.alt} draggable={false} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
