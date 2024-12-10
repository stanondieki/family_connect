// components/TreeForm.tsx
import React from 'react';

interface TreeFormProps {
  isRootSet: boolean;
  name: string;
  relationship: string;
  onNameChange: (value: string) => void;
  onRelationshipChange: (value: string) => void;
  onAddNode: () => void;
}

const TreeForm: React.FC<TreeFormProps> = ({
  isRootSet,
  name,
  relationship,
  onNameChange,
  onRelationshipChange,
  onAddNode,
}) => {
  return (
    <div className="mb-10 max-w-xl mx-auto">
      <label className="block mb-2 text-lg font-medium">{!isRootSet ? 'Add Yourself' : 'Add a Family Member'}</label>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder={!isRootSet ? 'Enter your name' : 'Enter family member name'}
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {isRootSet && (
  <select
    value={relationship}
    onChange={(e) => onRelationshipChange(e.target.value)}
    className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
        <option value="" disabled>
          Select Relationship
          </option>
          <optgroup label="Parent">
          <option value="Father">Father</option>
          <option value="Mother">Mother</option>
          </optgroup>
          <optgroup label="Sibling">
          <option value="Brother">Brother</option>
          <option value="Sister">Sister</option>
          </optgroup>
          <optgroup label="Spouse">
          <option value="Husband">Husband</option>
          <option value="Wife">Wife</option>
          </optgroup>
          <optgroup label="Child">
          <option value="Son">Son</option>
          <option value="Daughter">Daughter</option>
          </optgroup>
          <optgroup label="Grandparent">
          <option value="Grandfather">Grandfather</option>
          <option value="Grandmother">Grandmother</option>
          </optgroup>
          <optgroup label="Uncle/Aunt">
          <option value="Uncle">Uncle</option>
          <option value="Aunt">Aunt</option>
          </optgroup>
          <optgroup label="Niece/Nephew">
          <option value="Niece">Niece</option>
          <option value="Nephew">Nephew</option>
          </optgroup>
          <optgroup label="Cousin">
          <option value="Male Cousin">Male Cousin</option>
          <option value="Female Cousin">Female Cousin</option>
          </optgroup>
          <option value="Other">Other</option>
      </select>
      )}
        <button
          onClick={onAddNode}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg shadow-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
        >
          {!isRootSet ? 'Add Yourself' : 'Add Member'}
        </button>
      </div>
    </div>
  );
};

export default TreeForm;
