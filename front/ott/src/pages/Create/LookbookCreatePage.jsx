import CreateLookbook from '../../components/lookbook/CreateLookbook';

const LookbookCreatePage = () => {
  const handleSave = (lookbookData) => {
    // Logic to save new lookbook (e.g., API call)
    // console.log('Creating Lookbook:', lookbookData);
  };
  return (
    <>
      <CreateLookbook mode="create" onsave={handleSave} />
    </>
  );
};

export default LookbookCreatePage;
