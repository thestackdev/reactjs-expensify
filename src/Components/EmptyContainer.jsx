import notes from 'Images/emptyNotes.png';

const EmptyContainer = () => {
  return (
    <div className="empty-container">
      <img src={notes} alt="Empty notes" />
      <div>
        <h1>You don't have any records yet!</h1>
        <h3>Start addning your expenses to get started.</h3>
      </div>
    </div>
  );
};

export default EmptyContainer
