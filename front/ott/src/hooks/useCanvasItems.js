import { useState } from 'react';

const useCanvasItems = (initialItems = []) => {
  const [canvasItems, setCanvasItems] = useState(initialItems);
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleAddToCanvas = (item) => {
    const exists = canvasItems.some(
      (canvasItem) =>
        canvasItem.id === item.id && canvasItem.category === item.category
    );
    if (!exists) {
      setCanvasItems((prevItems) => [
        ...prevItems,
        { ...item, x: 10, y: 10, uniqueKey: `${item.category}-${item.id}` },
      ]);
    }
  };

  const handleDelete = (index) => {
    setCanvasItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleMouseDown = (index) => {
    setDraggedItemIndex(index);
    setIsDragging(true);
  };

  const handleMouseUpOrLeave = () => {
    setDraggedItemIndex(null);
    setIsDragging(false);
  };

  const handleMouseMove = (e, canvasRect) => {
    if (draggedItemIndex === null || !isDragging) return;

    const x = e.clientX - canvasRect.left - 50;
    const y = e.clientY - canvasRect.top - 50;
    setCanvasItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[draggedItemIndex] = { ...newItems[draggedItemIndex], x, y };
      return newItems;
    });
  };

  return {
    canvasItems,
    draggedItem,
    setDraggedItem,
    handleAddToCanvas,
    handleDelete,
    handleMouseDown,
    handleMouseUpOrLeave,
    handleMouseMove,
  };
};

export default useCanvasItems;
