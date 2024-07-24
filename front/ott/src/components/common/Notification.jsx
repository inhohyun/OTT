const Notification = ({ show, onClose, notifications }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-start pt-20 z-50">
      <div className="backdrop-blur-md bg-white bg-opacity-20 text-stone-400 p-6 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4 relative">
          <h3 className="text-xl font-bold absolute left-1/2 transform -translate-x-1/2">알림 목록</h3>
          <p 
            onClick={onClose} 
            className="text-xl font-bold cursor-pointer w-10 h-10 absolute right-0 top-0"
            style={{ top: '-12px' }}
          >
            &times;
          </p>
        </div>
        <div>
          {notifications.map((notification, index) => (
            <div key={index} className="mb-4 p-4 bg-white bg-opacity-20 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <p className="text-sm">{notification.who}님이 {notification.what}</p>
              </div>
              <p className="text-xs text-gray-400">{notification.when}</p>
            </div>
          ))}
        </div>
        <p
          className="mt-4 text-stone-400 py-2 px-5 rounded-full cursor-pointer text-center"
        >
          더보기
        </p>
      </div>
    </div>
  );
};

export default Notification;
