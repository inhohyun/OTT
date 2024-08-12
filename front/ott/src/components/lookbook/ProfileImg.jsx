import logo from '../../../public/icon-192x192.png';

const ProfileImg = (profileimg) => {
  if (profileimg) {
    return profileimg;
  } else {
    return logo;
  }
};

export default ProfileImg;
