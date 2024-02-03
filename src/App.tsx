import { useCallback, useRef } from "react";
import ReactFlow, {
  addEdge,
  ReactFlowProvider,
  Connection,
  OnConnectStartParams,
  OnConnectEnd,
  Background,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import "./index.css";
import CustomNode from "./customnode";
import { useHandleSaveUpdates } from "./useHandleSaveUpdates";
import { useKeyPress } from "./useKeyPress";

const nodeTypes = {
  selectorNode: CustomNode,
};
const originX = 0.5;
const originY = 0.0;

const AddNodeOnEdgeDrop = () => {
  const {
    setEdges,
    addNewNodeItem,
    deleteNode,
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
  } = useHandleSaveUpdates();

  const connectingNodeId = useRef<string | null>(null);
  const onConnect = useCallback((params: Connection) => {
    connectingNodeId.current = null;
    setEdges((edge) => addEdge(params, edge));
  }, []);

  const onConnectStart = useCallback(
    (_ignore: unknown, { nodeId }: OnConnectStartParams) => {
      connectingNodeId.current = nodeId;
    },
    []
  );

  const onConnectEnd: OnConnectEnd = useCallback(
    (event: MouseEvent | TouchEvent) => {
      const connectingNodeIdItem = connectingNodeId.current;

      if (!connectingNodeIdItem || !event.target) return;

      const targetIsPane = (event.target as HTMLDivElement).classList.contains(
        "react-flow__pane"
      );

      if (!targetIsPane) {
        return;
      }

      addNewNodeItem(event, connectingNodeIdItem);
    },
    [addNewNodeItem]
  );

  useKeyPress((event) => {
    if (event.key === "Delete") {
      // @ts-ignore
      deleteNode(event.target?.dataset?.id);
    }
  });

  return (
    <div className="wrapper">
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
        nodeOrigin={[originX, originY]}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default function name() {
  return (
    <ReactFlowProvider>
      <AddNodeOnEdgeDrop />
    </ReactFlowProvider>
  );
}
