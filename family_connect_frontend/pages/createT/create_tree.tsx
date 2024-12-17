// pages/CreateTreePage.tsx
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import TreeForm from '@/components/tree_creation/Treeform';
import TreePreview from '@/components/tree_creation/treePreview';
import SaveTreeButton from '@/components/tree_creation/saveTree';

const CreateTreePage: React.FC = () => {
  const [treeData, setTreeData] = useState<any | null>(null);
  const [isRootSet, setIsRootSet] = useState(false);
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleAddNode = () => {
    if (!name) {
      alert('Please provide a name.');
      return;
    }
  
    if (!isRootSet) {
      const rootNode = {
        id: uuidv4(),
        name,
        relationship: 'Self',
        children: [],
      };
      setTreeData(rootNode);
      setSelectedNodeId(rootNode.id);
      setIsRootSet(true);
      setName('');
    } else {
      if (!relationship) {
        alert('Please select a relationship.');
        return;
      }
  
      const newNode = {
        id: uuidv4(),
        name,
        relationship,
        children: [],
      };
  
      const updateTree = (node: any) => {
        if (node.id === selectedNodeId) {
          node.children = [...(node.children || []), newNode];
        } else if (node.children) {
          node.children.forEach(updateTree);
        }
      };
  
      if (treeData) {
        const updatedTree = { ...treeData };
        updateTree(updatedTree);
        setTreeData(updatedTree);
      }
  
      setName('');
      setRelationship('');
    }
  };

  const saveTreeToFirebase = async () => {
    if (!treeData) {
      alert('Please create a family tree before saving.');
      return;
    }
  
    setIsSaving(true);
  
    try {
      await setDoc(doc(db, 'familyTrees', treeData.id), {
        treeData,
        createdAt: new Date().toISOString(),
      });
      alert('Family tree saved successfully!');
    } catch (error) {
      console.error('Error saving family tree:', error);
      alert('Failed to save the family tree. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-yellow-800 to-white-900 text-white p-8">
      <h1 className="text-4xl font-extrabold mb-6 text-center">Design Your Family Tree</h1>
      <TreeForm
        isRootSet={isRootSet}
        name={name}
        relationship={relationship}
        onNameChange={setName}
        onRelationshipChange={setRelationship}
        onAddNode={handleAddNode}
      />
      <TreePreview
        treeData={treeData}
        selectedNodeId={selectedNodeId}
        setSelectedNodeId={setSelectedNodeId}
      />
      <SaveTreeButton isSaving={isSaving} onSave={saveTreeToFirebase} />
    </div>
  );
};

export default CreateTreePage;
