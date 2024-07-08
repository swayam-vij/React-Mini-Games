type TileProps = {
    tile: {
      id: number;
      img: string;
      isFlipped: boolean;
      isMatched: boolean;
    };
    onClick: () => void;
  };
  
  const Tile = ({ tile, onClick }: TileProps) => {
    return (
      <div
        className={`w-24 h-36 bg-gray-300 border border-gray-500 flex justify-center items-center cursor-pointer ${
          tile.isFlipped || tile.isMatched ? "" : "bg-gray-200"
        }`}
        onClick={onClick}
      >
        {tile.isFlipped || tile.isMatched ? (
          <img src={tile.img} alt="memory tile" className="w-full h-full object-cover" />
        ) : null}
      </div>
    );
  };
  
  export default Tile;
  