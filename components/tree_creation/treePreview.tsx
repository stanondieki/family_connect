import React from 'react';
import dynamic from 'next/dynamic';

const Tree = dynamic(() => import('react-organizational-chart').then((mod) => mod.Tree), { ssr: false });
const TreeNode = dynamic(() => import('react-organizational-chart').then((mod) => mod.TreeNode), { ssr: false });

interface TreePreviewProps {
  treeData: any;
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
}

const TreePreview: React.FC<TreePreviewProps> = ({ treeData, selectedNodeId, setSelectedNodeId }) => {
  
  // Function to render the tree nodes
  const renderTree = (node: any) => {
    const isSelected = selectedNodeId === node.id;

    // Highlight the self-user by applying a custom class
    const nodeClass = isSelected
      ? "bg-yellow-200 border-2 border-yellow-500 rounded-lg p-2"
      : "p-2";

    return (
      <TreeNode
        label={
          <div
            className={nodeClass}
            onClick={() => setSelectedNodeId(node.id)}
          >
            <div className="text-center">
              <div className="font-semibold">{node.name}</div>
              <div className="text-sm italic">{node.relationship}</div>
            </div>
          </div>
        }
        key={node.id}
      >
        {node.children && node.children.map((child: any) => renderTree(child))}
      </TreeNode>
    );
  };

  // Function to sort children to ensure the mother/father comes first
  const sortTreeData = (node: any) => {
    const sortedChildren = node.children
      ? node.children.sort((a: any, b: any) => {
          if (a.relationship === 'Mother' || a.relationship === 'Father') return -1;
          if (b.relationship === 'Mother' || b.relationship === 'Father') return 1;
          return 0;
        })
      : [];

    return { ...node, children: sortedChildren };
  };

  // Sort the treeData so that parents are at the top
  const sortedTreeData = treeData ? sortTreeData(treeData) : null;

  return (
    <div className="bg-white-900 shadow-2xl rounded-xl p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Family Tree Preview</h2>
      <div className="overflow-x-auto">
        {sortedTreeData ? (
          <Tree
            label={
              <div
                onClick={() => setSelectedNodeId(sortedTreeData.id)}
                className="cursor-pointer bg-gradient-to-r from-red-700 to-white-700 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                {sortedTreeData.name} <span className="italic">({sortedTreeData.relationship})</span>
              </div>
            }
          >
            {sortedTreeData.children && sortedTreeData.children.map((node: any) => renderTree(node))}
          </Tree>
        ) : (
          <div className="text-center">Start by adding yourself!</div>
        )}
      </div>
    </div>
  );
};

export default TreePreview;
