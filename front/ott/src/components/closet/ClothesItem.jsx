const ClothesItem = ({ item }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md relative">
      <img
        src={item.img[0]}
        alt={item.category}
        className="w-full h-32 object-cover rounded-t-lg"
      />
      {item.backImage && (
        <img
          src={item.img[1]}
          alt={item.category}
          className="w-full h-32 object-cover rounded-t-lg mt-2"
        />
      )}
    </div>
  );
};

export default ClothesItem;
