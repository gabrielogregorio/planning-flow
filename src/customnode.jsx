import  { memo } from 'react';
import { Handle, Position } from 'reactflow';

function CustomNode({ data, id, isConnectable })  {
    return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#3d3c49', left: -60 }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div style={{  background:'#373551', padding: '20px',}}>
        <div style={{minWidth: '20px'}}>
        </div>
        <textarea  className="nodrag customNode"  style={{width: '100%', background: 'transparent', border: 'none', minWidth: '200px',maxWidth: '200px', display: 'block', resize: 'vertical'}} onChange={(event) => {
            
            data.onChange(event, id)
            
            }} value={data.text} />
        <div style={{minWidth: '20px'}}>

        </div>

      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{  right:-60, background: '#3d3c49' }}
        isConnectable={isConnectable}
      />
    </>
  );
}

export default  memo(CustomNode)
