import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig'; // Adjust the path as needed
import dynamic from 'next/dynamic';

// Dynamically import Tree components
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
        <div className="text-center bg-gradient-to-br from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg shadow-md">
          <div className="font-bold">{node.name}</div>
          <div className="text-sm italic">{node.relationship}</div>
        </div>
      }
      key={node.id}
    >
      {node.children && node.children.map((child) => renderTree(child))}
    </TreeNode>
  );

  return (
    <div className="min-h-screen bg-gradient-to-bl from-gray-800 via-purple-900 to-black text-white p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">View Family Trees</h1>
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
                    <div className="cursor-pointer bg-gradient-to-r from-green-700 to-green-900 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all">
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
    </div>
  );
};

export default FamilyTreesPage;
