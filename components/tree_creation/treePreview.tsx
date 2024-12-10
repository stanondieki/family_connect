// components/TreePreview.tsx
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
  const renderTree = (node: any) => (
    <TreeNode
      label={
        <div className="text-center">
          <div className="font-semibold">{node.name}</div>
          <div className="text-sm italic">{node.relationship}</div>
        </div>
      }
      key={node.id}
    >
      {node.children && node.children.map((child: any) => renderTree(child))}
    </TreeNode>
  );

  return (
    <div className="bg-white-900 shadow-2xl rounded-xl p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Family Tree Preview</h2>
      <div className="overflow-x-auto">
        {treeData ? (
          <Tree
            label={
              <div
                onClick={() => setSelectedNodeId(treeData.id)}
                className="cursor-pointer bg-gradient-to-r from-red-700 to-white-700 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                {treeData.name} <span className="italic">({treeData.relationship})</span>
              </div>
            }
          >
            {treeData.children && treeData.children.map((node: any) => renderTree(node))}
          </Tree>
        ) : (
          <div className="text-center">Start by adding yourself!</div>
        )}
      </div>
    </div>
  );
};

export default TreePreview;
