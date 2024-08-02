import UpdateLookbook from '../../components/lookbook/UpdateLookbook';
import { useLocation, useParams } from 'react-router-dom';

const UpdateLookbookPage = () => {
  const location = useLocation();
  const lookbook = location.state?.lookbook;
  const lookbookid = useParams();
  console.log(location);
  console.log(location.state);
  console.log(lookbook);

  return (
    <>
      <UpdateLookbook lookbook={lookbook} lookbookid={lookbookid} />
    </>
  );
};

export default UpdateLookbookPage;
