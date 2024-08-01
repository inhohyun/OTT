import UpdateLookbook from '../../components/lookbook/UpdateLookbook';
import lookbookimg from '../../../public/icon-192x192.png';
import clothesimg from '../../assets/images/clothes/shirt1.jpg';
import clothesbackimg from '../../assets/images/clothes/shirt1-1.jpg';

const UpdateLookbookPage = () => {
  const lookbook = [
    {
      id: 1,
      createdAt: '2024-07-16',
      nickname: 'John',
      images: [
        {
          clothesId: 101,
          imagePath: {
            path: clothesimg,
            itemStatus: 'FRONT',
          },
        },
        {
          clothesId: 101,
          imagePath: {
            path: clothesbackimg,
            itemStatus: 'BACK',
          },
        },
      ],
      content: 'rjfkdfjdkaslfjsdaklfjsldakfjkslafjsdalkjadsklf',
      tags: ['#여름', '#도시남'],
      salesClothes: [
        {
          clothesId: 101,
          imagePath: {
            path: clothesimg,
            itemStatus: 'BACK',
          },
        },
      ],
      thumnail: lookbookimg,
      viewCount: 1000,
      comments: [
        {
          nickname: 'kimssafy',
          msg: '이쁘네요',
          createdAt: '2024-07-30 17:20:10',
          children: [
            {
              msg: '그러게요',
              nickname: 'Hohyun',
              createdAt: '2024-07-30 17:20:50',
            },
            {
              msg: '그러게요22',
              nickname: 'gahyun',
              createdAt: '2024-07-30 17:21:50',
            },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <UpdateLookbook lookbook={lookbook} />
    </>
  );
};

export default UpdateLookbookPage;
