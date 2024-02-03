import React, { memo } from "react";
import { Handle, Position } from "reactflow";

function CustomNode({ data, id, isConnectable }) {
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#3d3c49", left: -5 }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <div className="baseNode">
        <div style={{ minWidth: "20px" }}></div>
        <textarea
          className="nodrag customNode"
          onChange={(event) => {
            data.onChange(event, id);
          }}
          value={data.text}
        />
        <div style={{ minWidth: "20px" }}></div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ right: -5, background: "#3d3c49" }}
        isConnectable={isConnectable}
      />
    </>
  );
}

export default memo(CustomNode);
