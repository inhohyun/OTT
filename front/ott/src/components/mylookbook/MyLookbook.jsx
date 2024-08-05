// import React, { useState, useRef, useEffect } from 'react';
// import Lookbook from '../lookbook/Lookbook';
// import LookbookList from '../lookbook/LookbookList';
// import leftArrow from '../../assets/icons/left_arrow_icon.png';
// import rightArrow from '../../assets/icons/right_arrow_icon.png';
// import plus from '../../assets/icons/plusicon.png';
// import axios from 'axios';

// const MyLookbook = () => {
//   const initialLimit = 10;
//   const [lookbooks, setLookbooks] = useState([]);
//   const [visibleLookbooks, setVisibleLookbooks] = useState({});
//   const [selectedTag, setSelectedTag] = useState(null);
//   const scrollRefs = useRef([]);
//   const [selectedLookbook, setSelectedLookbook] = useState(null);

//   useEffect(() => {
//     axios
//       .get('http://192.168.100.89:8080/api/lookbook/mylookbook', {
//         params: { uid: 1 },
//       })
//       .then((response) => {
//         const fetchedLookbooks = response.data;
//         console.log('Fetched lookbooks:', fetchedLookbooks);
//         setLookbooks(fetchedLookbooks);

//         const tags = Array.from(
//           new Set(fetchedLookbooks.flatMap((lb) => lb.tags || []))
//         );
//         console.log('Tags:', tags);

//         setVisibleLookbooks(
//           tags.reduce((acc, tag) => ({ ...acc, [tag]: initialLimit }), {})
//         );
//         scrollRefs.current = tags.map(() => React.createRef());
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   const handleDelete = (deletedLookbookId) => {
//     setLookbooks(
//       lookbooks.filter((lookbook) => lookbook.id !== deletedLookbookId)
//     );
//     setSelectedLookbook(null); // Close the detail view if it was open
//   };

//   const categorizedLookbooks = lookbooks.reduce((acc, lookbook) => {
//     (lookbook.tags || []).forEach((tag) => {
//       if (!acc[tag]) acc[tag] = [];
//       acc[tag].push(lookbook);
//     });
//     return acc;
//   }, {});

//   const tags = Object.keys(categorizedLookbooks);
//   console.log('Categorized lookbooks:', categorizedLookbooks);

//   const scrollLeft = (ref) => {
//     if (ref.current) {
//       ref.current.scrollBy({ left: -200, behavior: 'smooth' });
//     }
//   };

//   const scrollRight = (ref) => {
//     if (ref.current) {
//       ref.current.scrollBy({ left: 200, behavior: 'smooth' });
//     }
//   };

//   const showMore = (tag) => {
//     setVisibleLookbooks((prevState) => ({
//       ...prevState,
//       [tag]: prevState[tag] + initialLimit,
//     }));
//     setSelectedTag(tag);
//   };

//   const closeDetailedView = () => {
//     setSelectedTag(null);
//   };

//   if (lookbooks.length === 0) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="relative flex flex-col items-start w-full pl-2 space-y-3">
//       <style>{`
//         .scrollbar-hide::-webkit-scrollbar {
//             display: none;
//         }
//         .scrollbar-hide {
//             -ms-overflow-style: none;
//             scrollbar-width: none;
//         }
//         .lookbook-container, .show-more-button {
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             margin: 0;
//             padding: 0;
//         }
//         .lookbook-container {
//             margin-right: -10px;
//         }
//         .button-no-style {
//             background: none;
//             border: none;
//             padding: 0;
//             cursor: pointer;
//         }
//       `}</style>

//       {tags.map((tag, index) => (
//         <div key={tag} className="w-full">
//           <p className="ml-2 text-xl font-bold">{tag}</p>
//           <div className="relative">
//             {categorizedLookbooks[tag] &&
//               categorizedLookbooks[tag].length > 3 && (
//                 <button
//                   key={`${tag}-left-button`} // unique key for the button
//                   onClick={() => scrollLeft(scrollRefs.current[index])}
//                   className="absolute left-0 top-1/2 transform -translate-y-1/2 p-1 w-6 h-6"
//                   style={{
//                     backgroundImage: `url(${leftArrow})`,
//                     backgroundSize: 'contain',
//                     backgroundRepeat: 'no-repeat',
//                     backgroundPosition: 'center',
//                     border: 'none',
//                     backgroundColor: 'transparent',
//                   }}
//                 ></button>
//               )}
//             <div
//               ref={scrollRefs.current[index]}
//               className="flex overflow-x-auto py-3 scrollbar-hide"
//             >
//               {categorizedLookbooks[tag] &&
//                 categorizedLookbooks[tag]
//                   .slice(0, visibleLookbooks[tag])
//                   .map((lookbook) => (
//                     <div key={lookbook.id} className="lookbook-container">
//                       <Lookbook
//                         key={lookbook.id}
//                         data={lookbook}
//                         onDelete={handleDelete}
//                       />
//                     </div>
//                   ))}
//               {visibleLookbooks[tag] <
//                 (categorizedLookbooks[tag]?.length || 0) && (
//                 <div key={`${tag}-show-more`} className="show-more-button">
//                   <button
//                     onClick={() => showMore(tag)}
//                     className="relative bg-transparent border-none p-0 mb-32 cursor-pointer"
//                   >
//                     <img src={plus} alt="Show more" className="w-6 h-6" />
//                   </button>
//                 </div>
//               )}
//             </div>
//             {categorizedLookbooks[tag] &&
//               categorizedLookbooks[tag].length > 3 && (
//                 <button
//                   key={`${tag}-right-button`} // unique key for the button
//                   onClick={() => scrollRight(scrollRefs.current[index])}
//                   className="absolute right-0 top-1/2 transform -translate-y-1/2 p-1 mr-2 w-6 h-6"
//                   style={{
//                     backgroundImage: `url(${rightArrow})`,
//                     backgroundSize: 'contain',
//                     backgroundRepeat: 'no-repeat',
//                     backgroundPosition: 'center',
//                     border: 'none',
//                     backgroundColor: 'transparent',
//                   }}
//                 ></button>
//               )}
//           </div>
//         </div>
//       ))}
//       {selectedTag && (
//         <LookbookList
//           key={`lookbook-list-${selectedTag}`} // unique key for LookbookList
//           tag={selectedTag}
//           lookbooks={categorizedLookbooks[selectedTag]}
//           onClose={closeDetailedView}
//         />
//       )}
//     </div>
//   );
// };

// export default MyLookbook;

import React, { useEffect, useState, useRef } from 'react';
import Lookbook from '../lookbook/Lookbook';
import LookbookList from '../lookbook/LookbookList';
import leftArrow from '../../assets/icons/left_arrow_icon.png';
import rightArrow from '../../assets/icons/right_arrow_icon.png';
import plus from '../../assets/icons/plusicon.png';
import axios from 'axios';
import detailStore from '../../data/lookbook/detailStore';

const MyLookbook = () => {
  const initialLimit = 10;
  const { lookbooks, setLookbooks, deleteLookbook } = detailStore();
  const [visibleLookbooks, setVisibleLookbooks] = useState({});
  const [selectedTag, setSelectedTag] = useState(null);
  const scrollRefs = useRef([]);
  const [selectedLookbook, setSelectedLookbook] = useState(null);

  useEffect(() => {
    axios
      .get('http://192.168.100.89:8080/api/lookbook/mylookbook', {
        params: { uid: 1 },
      })
      .then((response) => {
        const fetchedLookbooks = response.data;
        console.log('Fetched lookbooks:', fetchedLookbooks);
        setLookbooks(fetchedLookbooks);

        const tags = Array.from(
          new Set(fetchedLookbooks.flatMap((lb) => lb.tags || []))
        );
        console.log('Tags:', tags);

        setVisibleLookbooks(
          tags.reduce((acc, tag) => ({ ...acc, [tag]: initialLimit }), {})
        );
        scrollRefs.current = tags.map(() => React.createRef());
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setLookbooks]);

  const categorizedLookbooks = lookbooks.reduce((acc, lookbook) => {
    (lookbook.tags || []).forEach((tag) => {
      if (!acc[tag]) acc[tag] = [];
      acc[tag].push(lookbook);
    });
    return acc;
  }, {});

  const tags = Object.keys(categorizedLookbooks);
  console.log('Categorized lookbooks:', categorizedLookbooks);

  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const showMore = (tag) => {
    setVisibleLookbooks((prevState) => ({
      ...prevState,
      [tag]: prevState[tag] + initialLimit,
    }));
    setSelectedTag(tag);
  };

  const closeDetailedView = () => {
    setSelectedTag(null);
  };

  if (lookbooks.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative flex flex-col items-start w-full pl-2 space-y-3">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        .lookbook-container, .show-more-button {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            padding: 0;
        }
        .lookbook-container {
            margin-right: -10px;
        }
        .button-no-style {
            background: none;
            border: none;
            padding: 0;
            cursor: pointer;
        }
      `}</style>

      {tags.map((tag, index) => (
        <div key={tag} className="w-full">
          <p className="ml-2 text-xl font-bold">{tag}</p>
          <div className="relative">
            {categorizedLookbooks[tag] &&
              categorizedLookbooks[tag].length > 3 && (
                <button
                  key={`${tag}-left-button`} // unique key for the button
                  onClick={() => scrollLeft(scrollRefs.current[index])}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 p-1 w-6 h-6"
                  style={{
                    backgroundImage: `url(${leftArrow})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    border: 'none',
                    backgroundColor: 'transparent',
                  }}
                ></button>
              )}
            <div
              ref={scrollRefs.current[index]}
              className="flex overflow-x-auto py-3 scrollbar-hide"
            >
              {categorizedLookbooks[tag] &&
                categorizedLookbooks[tag]
                  .slice(0, visibleLookbooks[tag])
                  .map((lookbook) => (
                    <div key={lookbook.id} className="lookbook-container">
                      <Lookbook
                        key={lookbook.id}
                        data={lookbook}
                        onDelete={deleteLookbook}
                      />
                    </div>
                  ))}
              {visibleLookbooks[tag] <
                (categorizedLookbooks[tag]?.length || 0) && (
                <div key={`${tag}-show-more`} className="show-more-button">
                  <button
                    onClick={() => showMore(tag)}
                    className="relative bg-transparent border-none p-0 mb-32 cursor-pointer"
                  >
                    <img src={plus} alt="Show more" className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>
            {categorizedLookbooks[tag] &&
              categorizedLookbooks[tag].length > 3 && (
                <button
                  key={`${tag}-right-button`} // unique key for the button
                  onClick={() => scrollRight(scrollRefs.current[index])}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 p-1 mr-2 w-6 h-6"
                  style={{
                    backgroundImage: `url(${rightArrow})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    border: 'none',
                    backgroundColor: 'transparent',
                  }}
                ></button>
              )}
          </div>
        </div>
      ))}
      {selectedTag && (
        <LookbookList
          key={`lookbook-list-${selectedTag}`} // unique key for LookbookList
          tag={selectedTag}
          lookbooks={categorizedLookbooks[selectedTag]}
          onClose={closeDetailedView}
        />
      )}
    </div>
  );
};

export default MyLookbook;
