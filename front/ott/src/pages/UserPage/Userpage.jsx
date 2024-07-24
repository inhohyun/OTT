const NavBar = ({ activeComponent, setActiveComponent }) => {
  return (
    <nav className="flex justify-around w-full mb-5 bg-white p-2">
      <button
        className={`bg-transparent border-none font-dohyeon text-slate-400 text-lg py-2 px-5 mx-3 cursor-pointer rounded-full ${
          activeComponent === 'recommendation' ? 'bg-violet-200 text-slate-400' : ''
        }`}
        onClick={() => setActiveComponent('recommendation')}
        style={{ fontFamily: 'dohyeon' }}
      >
      게시글
      </button>
      <button
        className={`bg-transparent border-none font-dohyeon text-slate-400 text-lg py-2 px-5 mx-3 cursor-pointer rounded-full ${
          activeComponent === 'feed' ? 'bg-violet-200 text-slate-400' : ''
        }`}
        onClick={() => setActiveComponent('feed')}
        style={{ fontFamily: 'dohyeon' }}
      >
        팔로워
      </button>
      <button
        className={`bg-transparent border-none font-dohyeon text-slate-400 text-lg py-2 px-5 mx-3 cursor-pointer rounded-full ${
          activeComponent === 'myLookbook' ? 'bg-violet-200 text-slate-400' : ''
        }`}
        onClick={() => setActiveComponent('myLookbook')}
        style={{ fontFamily: 'dohyeon' }}
      >
        팔로잉
      </button>
    </nav>
  );
};

const userPage = () => {
  return <>
    <NavBar></NavBar>
  </>
}

export default userPage;