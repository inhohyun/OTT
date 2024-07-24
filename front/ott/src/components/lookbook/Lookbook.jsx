const Lookbook = () => {
    return (
        <div className="w-60 h-60 rounded-lg overflow-hidden shadow-lg bg-white m-3 flex-shrink-0">
            <div className="px-6 py-3 flex justify-between items-center">
            <div className="font-bold text-lg mb-1">이름</div>
            <p className="text-gray-600 text-sm">몇시간전</p>
            </div>
            <div className="px-3 py-1">
            <img className="w-full h-32 object-cover" src="https://via.placeholder.com/150" alt="Lookbook Image" />
                
            </div>
            <div className="px-6 pt-1 pb-1 flex justify-end items-center">
                <div className="flex items-center space-x-1">
                    <span className="text-gray-600 text-sm">❤ 42</span>
                    <span className="text-gray-600 text-sm">🗨 2</span>
                </div>
            </div>
        </div>
    );
};

export default Lookbook;
