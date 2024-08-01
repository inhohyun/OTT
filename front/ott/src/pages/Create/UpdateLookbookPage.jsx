import UpdateLookbook from '../../components/lookbook/UpdateLookbook';
import { useLocation } from 'react-router-dom';

const UpdateLookbookPage = () => {
  const location = useLocation();
  const lookbook = location.state?.lookbook;
  console.log(location);
  console.log(location.state);
  console.log(lookbook);

  return (
    <>
      <UpdateLookbook lookbook={lookbook} />
    </>
  );
};

export default UpdateLookbookPage;
