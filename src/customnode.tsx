import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";

const CustomNode = ({ data, id, isConnectable }: NodeProps) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        style={{ background: "#3d3c49", left: -5 }}
        onConnect={() => {}}
        isConnectable={isConnectable}
      />

      <div className="baseNode">
        <div style={{ minWidth: "20px" }} />
        <textarea
          className="nodrag customNode"
          onChange={(event) => {
            data.onChange(event, id);
          }}
          value={data.text}
        />
        <div style={{ minWidth: "20px" }} />
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{ right: -5, background: "#3d3c49" }}
        isConnectable={isConnectable}
      />
    </>
  );
};

export default memo(CustomNode);
