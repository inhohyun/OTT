import React from 'react';

const CanvasArea = ({
  canvasItems,
  showDeleteButton,
  handleDelete,
  handleMouseDown,
  handleTouchStart,
  handleMouseMove,
  handleMouseUpOrLeave,
  handleTouchMove,
  onDrop,
  onDragOver,
}) => {
  return (
    <div
      id="canvasArea"
      className="w-full h-full mb-4 relative"
      onDrop={onDrop}
      onDragOver={onDragOver}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUpOrLeave}
    >
      {canvasItems.map((item, index) => {
        console.log('Canvas item:', item); // Log item to the console
        return (
          <div
            key={item.uniqueKey}
            className="absolute w-32 h-32"
            style={{ left: item.x, top: item.y }}
          >
            <img
              src={item.image?.path || item.imagePath.path || item.imagePath}
              alt={item.name}
              className="w-full h-full cursor-move"
              onMouseDown={() => handleMouseDown(index)}
              onTouchStart={() => handleTouchStart(index)}
            />
            {showDeleteButton && (
              <button
                onClick={() => handleDelete(index)}
                className="absolute top-0 right-0 text-red-500"
                style={{ background: 'none' }}
              >
                X
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CanvasArea;
