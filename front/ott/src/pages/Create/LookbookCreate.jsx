import React, { useState } from 'react';
import backgroundImage from '../../assets/images/background_image_main.png';

const clothesData = {
    '상의': [
        { id: 1, name: 'T-Shirt', image: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg' },
        { id: 2, name: 'Blouse', image: 'https://images.pexels.com/photos/1682699/pexels-photo-1682699.jpeg' },
    ],
    '하의': [
        { id: 1, name: 'Jeans', image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg' },
        { id: 2, name: 'Shorts', image: 'https://images.pexels.com/photos/4210866/pexels-photo-4210866.jpeg' },
    ],
    '겉옷': [
        { id: 1, name: 'Jacket', image: 'https://images.pexels.com/photos/9218538/pexels-photo-9218538.jpeg' },
        { id: 2, name: 'Coat', image: 'https://images.pexels.com/photos/6044973/pexels-photo-6044973.jpeg' },
    ],
    '신발': [
        { id: 1, name: 'Sneakers', image: 'https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg' },
        { id: 2, name: 'Boots', image: 'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg' },
    ],
};

const LookbookCreate = () => {
    const [isPublic, setIsPublic] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [canvasItems, setCanvasItems] = useState([]);
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');
    const [description, setDescription] = useState('');
    const [draggedItem, setDraggedItem] = useState(null);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleDragStart = (e, item) => {
        setDraggedItem(item);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const item = draggedItem;
        const canvasRect = e.target.getBoundingClientRect();
        const x = e.clientX - canvasRect.left - 50; // Adjusting for the center of the item
        const y = e.clientY - canvasRect.top - 50;  // Adjusting for the center of the item

        setCanvasItems(prevItems => {
            const uniqueKey = `${item.category}-${item.id}`;
            const existingItemIndex = prevItems.findIndex(i => i.uniqueKey === uniqueKey);
            if (existingItemIndex !== -1) {
                const newItems = [...prevItems];
                newItems[existingItemIndex] = { ...item, x, y, uniqueKey };
                return newItems;
            }
            return [...prevItems, { ...item, x, y, uniqueKey }];
        });
        setDraggedItem(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleSave = () => {
        console.log("Canvas Items:", canvasItems);
        console.log("Tags:", tags);
        console.log("Description:", description);
        console.log("Public:", isPublic);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleAddTag();
        }
    };

    const handleAddTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            setTags([...tags, newTag.trim()]);
            setNewTag('');
        }
    };

    const handleTagDelete = (tagToDelete) => {
        setTags(tags.filter(tag => tag !== tagToDelete));
    };

    return (
        <div className="relative flex flex-col items-center w-full min-h-screen bg-cover bg-center p-4" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="bg-white bg-opacity-60 p-6 rounded-lg shadow-lg w-full max-w-md">
                <div className="mb-6 flex justify-between items-center">
                    <div className="flex items-center">
                        <div className={`relative w-[50px] h-[24px] rounded-full cursor-pointer transition-colors duration-300 ${isPublic ? 'bg-violet-300' : 'bg-stone-300'}`} onClick={() => setIsPublic(!isPublic)}>
                            <div className={`absolute top-0 left-0 w-[22px] h-[22px] bg-white rounded-full shadow-md transition-transform duration-300 ${isPublic ? 'transform translate-x-[26px]' : ''}`}></div>
                        </div>
                        <span className="ml-3 text-sm">{isPublic ? '공개' : '비공개'}</span>
                    </div>
                    <button className="bg-violet-300 text-white py-2 px-4 rounded-[5px] hover:bg-violet-500 transition" onClick={handleSave} style={{ fontFamily: 'dohyeon' }}>저장</button>
                </div>
                <div className="mb-6">
                    <div className="border-2 border-dashed border-gray-300 w-full h-[300px] mb-4 relative" onDrop={handleDrop} onDragOver={handleDragOver}>
                        {canvasItems.map((item) => (
                            <img
                                key={item.uniqueKey}
                                src={item.image}
                                alt={item.name}
                                style={{ position: 'absolute', left: item.x, top: item.y, width: '100px', height: '100px', cursor: 'move' }}
                                draggable
                                onDragStart={(e) => handleDragStart(e, item)}
                            />
                        ))}
                    </div>
                    <select className="w-full border border-gray-300 text-stone-600 rounded-[5px] p-2 mb-2 focus:ring-2 focus:ring-violet-500 focus:outline-none" value={selectedCategory || ''} onChange={handleCategoryChange} style={{ fontFamily: 'dohyeon' }}>
                        <option value="">카테고리 선택</option>
                        {Object.keys(clothesData).map((categoryName) => (
                            <option key={categoryName} value={categoryName}>{categoryName}</option>
                        ))}
                    </select>
                    <div className="flex flex-wrap">
                        {selectedCategory && clothesData[selectedCategory].map(item => (
                            <img key={item.id} src={item.image} alt={item.name} className="w-[80px] h-[80px] m-1 cursor-pointer" draggable onDragStart={(e) => handleDragStart(e, { ...item, category: selectedCategory })} />
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <input type="text" placeholder="태그를 통해 룩북을 저장하세요." value={newTag} onChange={(e) => setNewTag(e.target.value)} onKeyDown={handleKeyDown} className="border border-gray-300 rounded-[5px] p-2 w-full focus:ring-2 focus:ring-violet-500 focus:outline-none" style={{ fontFamily: 'dohyeon' }} />
                    <div className="flex flex-wrap mt-2">
                        {tags.map((tag, index) => (
                            <div key={index} className="bg-black text-white rounded-[5px] px-3 py-1 text-sm mr-2 mb-2 flex items-center">
                                {tag}
                                <button onClick={() => handleTagDelete(tag)} className="ml-2 text-white bg-transparent border-none cursor-pointer focus:outline-none">X</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mb-20">
                    <textarea placeholder="추가적인 설명이 필요하다면 문구를 입력하세요" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-violet-500 focus:outline-none" style={{ fontFamily: 'dohyeon' }}></textarea>
                </div>
            </div>
        </div>
    );
};

export default LookbookCreate;
