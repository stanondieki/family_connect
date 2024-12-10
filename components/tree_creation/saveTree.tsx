// components/SaveTreeButton.tsx
import React from 'react';

interface SaveTreeButtonProps {
  isSaving: boolean;
  onSave: () => void;
}

const SaveTreeButton: React.FC<SaveTreeButtonProps> = ({ isSaving, onSave }) => (
  <button
    onClick={onSave}
    disabled={isSaving}
    className={`mt-4 bg-gradient-to-r ${
      isSaving ? 'from-gray-400 to-gray-500' : 'from-green-600 to-green-800'
    } text-white px-6 py-2 rounded-lg shadow-lg hover:from-green-500 hover:to-green-700 transition-all duration-300`}
  >
    {isSaving ? 'Saving...' : 'Save Family Tree'}
  </button>
);

export default SaveTreeButton;
