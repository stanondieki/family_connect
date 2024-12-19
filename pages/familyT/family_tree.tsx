import React, { useEffect, useState } from 'react';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import dynamic from 'next/dynamic';

const Tree = dynamic(() => import('react-organizational-chart').then((mod) => mod.Tree), { ssr: false });
const TreeNode = dynamic(() => import('react-organizational-chart').then((mod) => mod.TreeNode), { ssr: false });

interface FamilyTreeData {
  id: string;
  name: string;
  relationship: string;
  children?: FamilyTreeData[];
}

const FamilyTreesPage: React.FC = () => {
  const [familyTrees, setFamilyTrees] = useState<FamilyTreeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editTreeId, setEditTreeId] = useState<string | null>(null);
  const [editingNode, setEditingNode] = useState<FamilyTreeData | null>(null);
  const [editedName, setEditedName] = useState<string>('');
  const [editedRelationship, setEditedRelationship] = useState<string>('');

  useEffect(() => {
    const fetchFamilyTrees = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'familyTrees'));
        const trees: FamilyTreeData[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data().treeData,
        }));
        setFamilyTrees(trees);
      } catch (error) {
        console.error('Error fetching family trees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFamilyTrees();
  }, []);

  const renderTree = (node: FamilyTreeData) => (
    <TreeNode
      label={
        <div
          className="text-center bg-gradient-to-br from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg shadow-md cursor-pointer"
          onClick={() => handleEditNode(node)}
        >
          <div className="font-bold">{node.name}</div>
          <div className="text-sm italic">{node.relationship}</div>
        </div>
      }
      key={node.id}
    >
      {node.children && node.children.map((child) => renderTree(child))}
    </TreeNode>
  );

  const handleEditNode = (node: FamilyTreeData) => {
    setEditingNode(node);
    setEditedName(node.name);
    setEditedRelationship(node.relationship);
  };

  const handleSaveChanges = async () => {
    if (!editingNode || !editTreeId) return;

    const updateNode = (node: FamilyTreeData): FamilyTreeData => {
      if (node.id === editingNode.id) {
        return { ...node, name: editedName, relationship: editedRelationship };
      }
      if (node.children) {
        return { ...node, children: node.children.map(updateNode) };
      }
      return node;
    };

    const updatedTrees = familyTrees.map((tree) =>
      tree.id === editTreeId ? updateNode(tree) : tree
    );

    setFamilyTrees(updatedTrees);

    // Update Firestore
    try {
      const updatedTree = updatedTrees.find((tree) => tree.id === editTreeId);
      if (updatedTree) {
        await updateDoc(doc(db, 'familyTrees', editTreeId), { treeData: updatedTree });
        alert('Tree updated successfully!');
      }
    } catch (error) {
      console.error('Error updating family tree:', error);
      alert('Failed to save changes. Please try again.');
    }

    // Clear edit state
    setEditingNode(null);
    setEditedName('');
    setEditedRelationship('');
    setEditTreeId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-gray-800 via-purple-900 to-black text-white p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">View and Edit Family Trees</h1>
      {loading ? (
        <div className="text-center">
          <p>Loading family trees...</p>
        </div>
      ) : familyTrees.length === 0 ? (
        <div className="text-center">
          <p>No family trees available. Create one to get started!</p>
        </div>
      ) : (
        <div className="space-y-12">
          {familyTrees.map((tree) => (
            <div
              key={tree.id}
              className="bg-gray-700 rounded-lg shadow-xl p-6 max-w-4xl mx-auto"
            >
              <h2 className="text-2xl font-semibold mb-4 text-center">{tree.name}'s Family Tree</h2>
              <div className="overflow-x-auto">
                <Tree
                  label={
                    <div
                      className="cursor-pointer bg-gradient-to-r from-green-700 to-green-900 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all"
                      onClick={() => setEditTreeId(tree.id)}
                    >
                      {tree.name} <span className="italic">({tree.relationship})</span>
                    </div>
                  }
                >
                  {tree.children && tree.children.map((child) => renderTree(child))}
                </Tree>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingNode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Node</h2>
            <label className="block mb-2">
              Name:
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </label>
            <label className="block mb-4">
              Relationship:
              <input
                type="text"
                value={editedRelationship}
                onChange={(e) => setEditedRelationship(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </label>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setEditingNode(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyTreesPage;