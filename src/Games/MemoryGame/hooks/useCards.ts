import { useEffect, useRef, useState } from "react";

const images = [
  "https://plus.unsplash.com/premium_vector-1710413094507-3b780b88d00e?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_vector-1710413832371-2301551b00ed?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_vector-1710414084884-1e2443c14c16?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_vector-1710434793172-aa8f613e1ab8?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_vector-1716898780989-881b184b5c7c?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_vector-1710414670078-36f35f555909?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_vector-1710414249335-746a92692a8b?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_vector-1710419785780-e84bb1fc5e78?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const shuffleCards = () => {
  return [...images, ...images].sort(() => Math.random() - 0.5).map((img) => ({ status: "facedown", img }));
};

export default function useCards() {
  const [cards, setCards] = useState(shuffleCards());
  const [turns, setTurns] = useState(0);
  const disable = useRef(true);
  const prevIndex = useRef(-1);

  useEffect(() => {
    setTimeout(() => {
      setCards((prevCards) => prevCards.map((c) => ({ ...c, status: "facedown" })));
      disable.current = false;
    }, 3000);
  }, []);

  const updateCardStatus = (cardArr: { status: string; img: string }[], status: string) => {
    cardArr.forEach((card) => (card.status = status));
    setCards([...cards]);
  };

  const handleClick = (i: number) => {
    if (disable.current) return;

    const currCard = cards[i];
    const prevCard = cards[prevIndex.current];

    if (currCard.status === "matched") return;

    updateCardStatus([currCard], "faceup");

    if (!prevCard || prevIndex.current === i) {
      prevIndex.current = i;
      return;
    }

    if (currCard.img === prevCard.img) {
      updateCardStatus([currCard, prevCard], "matched");
    } else {
      disable.current = true;
      setTimeout(() => {
        updateCardStatus([currCard, prevCard], "facedown");
        disable.current = false;
      }, 1000);
    }

    setTurns((prevTurns) => prevTurns + 1);
    prevIndex.current = -1;
  };

  const resetGame = () => {
    setCards(shuffleCards());
    setTurns(0);
    disable.current = true;
    prevIndex.current = -1;

    setTimeout(() => {
      setCards((prevCards) => prevCards.map((c) => ({ ...c, status: "facedown" })));
      disable.current = false;
    }, 3000);
  };

  return { cards, handleClick, resetGame, turns };
}
