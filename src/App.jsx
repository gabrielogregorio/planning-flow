import  { useCallback , useEffect, useRef} from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './index.css';
import ColorSelectorNode from './customnode';
const nodeTypes = {
  selectorNode: ColorSelectorNode,
};

const getId = () => new Date().getTime().toString();

const AddNodeOnEdgeDrop = () => {
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState( []);
  const { screenToFlowPosition } = useReactFlow();
  const onConnect = useCallback(
    (params) => {
      connectingNodeId.current = null;
      setEdges((eds) => addEdge(params, eds))
    },
    [],
  );

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = event.target.classList.contains('react-flow__pane');

      if (targetIsPane) {
        const id = getId();

        const onChange = (event, id) => {
          setNodes((nds) =>
            nds.map((node) => {
              if (node.id !== id) {
                return node;
              }
    
              const text = event.target.value;
    
              return {
                ...node,
                data: {
                  ...node.data,
                  text,
                },
              };
            })
          );
        };

        const newNode = {
          id,
          type: 'selectorNode',
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          data: { text: `Node ${id}`, onChange },
          origin: [0.5, 0.0],
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({ id, source: connectingNodeId.current, target: id }),
        );
      }
    },
    [screenToFlowPosition],
  );

  useEffect(() => {
    if(nodes.length > 1) {
      localStorage.setItem('state', JSON.stringify({ nodes, edges}))
    }
  }, [nodes, edges])


  

  useEffect(() => {

    function handleKeyDownEvent(event) {
      if(event.key === 'Delete') {
        setNodes((prev) => {

          return prev.filter((node) => node.id !== event.target.dataset.id )
        })

      } else {
        console.log(event.key)
      }
    }
    window.addEventListener('keypress',handleKeyDownEvent)

    return () => {
      window.removeEventListener('keypress', handleKeyDownEvent)
    }
  }, [])






  useEffect(() => {
    const onChange = (event, id) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== id) {
            return node;
          }

          const text = event.target.value;

          return {
            ...node,
            data: {
              ...node.data,
              text,
            },
          };
        })
      );
    };

    setNodes( 
      JSON.parse(localStorage.getItem('state'))?.nodes ??      
       [
      {
        id: '123213',
        type: 'selectorNode',
        data: { text: 'example', onChange },
        position: { x: 0, y: 50 },
      },
    ]);

    setEdges(JSON.parse(localStorage.getItem('state'))?.edges ?? []);
  }, []);




  return (
    <div className="wrapper" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        fitView
        fitViewOptions={{ padding: 2 }}
        nodeOrigin={[0.5, 0]}
      >

{/* <Controls />
        <MiniMap /> */}
        {/* <Background variant="dots" gap={12} size={1} /> */}
        </ReactFlow>
    </div>
  );
};

export default function name() {
return  (
  <ReactFlowProvider>
    <AddNodeOnEdgeDrop />
  </ReactFlowProvider>
)}
