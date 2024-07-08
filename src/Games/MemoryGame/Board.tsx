import { useState, useEffect } from "react";
import Tile from "./Tile";

const img1 = "https://plus.unsplash.com/premium_vector-1710413094507-3b780b88d00e?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const img2 = "https://plus.unsplash.com/premium_vector-1710413832371-2301551b00ed?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const img3 = "https://plus.unsplash.com/premium_vector-1710414084884-1e2443c14c16?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const img4 = "https://plus.unsplash.com/premium_vector-1710434793172-aa8f613e1ab8?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const img5 = "https://plus.unsplash.com/premium_vector-1716898780989-881b184b5c7c?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const img6 = "https://plus.unsplash.com/premium_vector-1710414670078-36f35f555909?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const img7 = "https://plus.unsplash.com/premium_vector-1710414249335-746a92692a8b?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const img8 = "https://plus.unsplash.com/premium_vector-1710419785780-e84bb1fc5e78?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const images = [img1, img2, img3, img4, img5, img6, img7, img8];

type TileType = {
  id: number;
  img: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const Board = () => {
  const [tiles, setTiles] = useState<TileType[]>([]);
  const [flippedTiles, setFlippedTiles] = useState<number[]>([]);
  const [matchedTiles, setMatchedTiles] = useState<number[]>([]);

  useEffect(() => {
    const doubledImages = [...images, ...images];
    const shuffledTiles = doubledImages
      .map((img, index) => ({ id: index, img, isFlipped: false, isMatched: false }))
      .sort(() => Math.random() - 0.5);
    setTiles(shuffledTiles);
  }, []);

  useEffect(() => {
    if (flippedTiles.length === 2) {
      const [firstIndex, secondIndex] = flippedTiles;
      if (tiles[firstIndex].img === tiles[secondIndex].img) {
        setMatchedTiles([...matchedTiles, firstIndex, secondIndex]);
        setTiles(prev =>
          prev.map(tile =>
            tile.id === firstIndex || tile.id === secondIndex ? { ...tile, isMatched: true } : tile
          )
        );
      } else {
        setTimeout(() => {
          setTiles(prev =>
            prev.map(tile =>
              tile.id === firstIndex || tile.id === secondIndex ? { ...tile, isFlipped: false } : tile
            )
          );
        }, 1000);
      }
      setTimeout(() => setFlippedTiles([]), 1000);
    }
  }, [flippedTiles, tiles, matchedTiles]);

  const handleTileClick = (index: number) => {
    if (flippedTiles.length < 2 && !flippedTiles.includes(index) && !tiles[index].isMatched) {
      setFlippedTiles([...flippedTiles, index]);
      setTiles(prev =>
        prev.map((tile, i) => (i === index ? { ...tile, isFlipped: true } : tile))
      );
    }
  };

  return (
    <div className="grid grid-cols-4 gap-2">
      {tiles.map((tile, index) => (
        <Tile key={tile.id} tile={tile} onClick={() => handleTileClick(index)} />
      ))}
    </div>
  );
};

export default Board;
