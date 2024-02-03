import React, { useCallback, useEffect, useRef } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  Connection,
  OnConnectStartParams,
  OnConnectEnd,
} from "reactflow";
import "reactflow/dist/style.css";
import "./index.css";
import ColorSelectorNode from "./customnode";
import { LocalStorageService } from "./LocalStorageService";
const nodeTypes = {
  selectorNode: ColorSelectorNode,
};

const idItem = "state";

const getId = () => new Date().getTime().toString();

type onChangeType = (
  event: React.ChangeEvent<HTMLTextAreaElement>,
  id: string
) => void;

type NodeItemType = {
  id: string;
  type: "selectorNode";
  data: {
    text: string;
    onChange: onChangeType;
  };
  position: { x: number; y: number };
};

type EdgeItemTpe = { id: string; source: string; target: string };

type baseType = {
  edges: EdgeItemTpe[];
  nodes: NodeItemType[];
};

const AddNodeOnEdgeDrop = () => {
  const connectingNodeId = useRef<string | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback((params: Connection) => {
    connectingNodeId.current = null;
    setEdges((edge) => addEdge(params, edge));
  }, []);

  const onConnectStart = useCallback(
    (_: unknown, { nodeId }: OnConnectStartParams) => {
      connectingNodeId.current = nodeId;
    },
    []
  );

  const onChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    id: string
  ) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id !== id) {
          return node;
        }

        return {
          ...node,
          data: {
            ...node.data,
            text: event.target.value || "",
          },
        };
      })
    );
  };

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

      const id = getId();

      const newNode = {
        id,
        type: "selectorNode",
        position: screenToFlowPosition({
          x: (event as { clientX: number }).clientX,
          y: (event as { clientY: number }).clientY,
        }),
        data: { text: "Node", onChange },
        origin: [0.5, 0.0],
      };

      setNodes((nodes) => nodes.concat(newNode));
      setEdges((edges) =>
        edges.concat({
          id,
          source: connectingNodeIdItem,
          target: id,
        })
      );
    },
    [screenToFlowPosition]
  );

  useEffect(() => {
    if (nodes.length > 1) {
      LocalStorageService.setItem(idItem, { nodes, edges });
    }
  }, [nodes, edges]);

  useEffect(() => {
    function handleKeyDownEvent(event: KeyboardEvent) {
      if (event.key === "Delete") {
        setNodes((prev) => {
          // @ts-ignore
          return prev.filter((node) => node.id !== event.target?.dataset?.id);
        });
      } else {
        console.log(event.key);
      }
    }
    window.addEventListener("keypress", handleKeyDownEvent);

    return () => {
      window.removeEventListener("keypress", handleKeyDownEvent);
    };
  }, []);

  useEffect(() => {
    const initialItems = LocalStorageService.getItem<baseType>(idItem);

    const initialStateNode: NodeItemType[] = [
      {
        id: "123213",
        type: "selectorNode",
        data: { text: "example", onChange: onChange },
        position: { x: 0, y: 50 },
      },
    ];

    const addedChangeTextNode = initialItems?.nodes?.map((node) => {
      return {
        ...node,
        data: {
          ...node.data,
          onChange,
        },
      };
    });

    setNodes(addedChangeTextNode || initialStateNode);
    setEdges(initialItems?.edges || []);
  }, []);

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
        nodeOrigin={[0.5, 0]}
      />
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
