import React, { useState } from 'react';
import AddFilm from '../../components/Admin/AddFilm';

import LoadingSpinner from '../../shared/components/LoadingSpinner';
import ErrorModal from '../../shared/components/ErrorModal';

const AddMovie = () => {
  const [error, setError] = useState(null);
  const clearError = () => {
    setError(null);
  };
  const [isLoading, setIsLoading] = useState(false);
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      <div>
        <AddFilm setIsLoading={setIsLoading} setError={setError} />
      </div>
    </React.Fragment>
  );
};

export default AddMovie;
