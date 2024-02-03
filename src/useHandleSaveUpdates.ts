import React, { useCallback, useEffect } from "react";
import { useEdgesState, useNodesState, useReactFlow } from "reactflow";
import { LocalStorageService } from "./LocalStorageService";
import { INodeItemType, IBaseType } from "./types";
import { generateId } from "./core/utils";

const idItem = "state";
const originX = 0.5;
const originY = 0.0;

export const useHandleSaveUpdates = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>, id: string) => {
      setNodes((localNodes) =>
        localNodes.map((node) => {
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
    },
    [setNodes]
  );

  useEffect(() => {
    if (nodes.length > 1) {
      LocalStorageService.setItem(idItem, { nodes, edges });
    }
  }, [nodes, edges]);

  useEffect(() => {
    const initialItems = LocalStorageService.getItem<IBaseType>(idItem);

    const initialStateNode: INodeItemType[] = [
      {
        id: "123213",
        type: "selectorNode",
        data: { text: "example", onChange },
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
  }, [onChange, setEdges, setNodes]);

  const addNewNodeItem = useCallback(
    (event: MouseEvent | TouchEvent, connectingNodeIdItem: string) => {
      const id = generateId();
      const newNode = {
        id,
        type: "selectorNode",
        position: screenToFlowPosition({
          x: (event as { clientX: number }).clientX,
          y: (event as { clientY: number }).clientY,
        }),
        data: { text: "Node", onChange },
        origin: [originX, originY],
      };

      setNodes((localNodes) => localNodes.concat(newNode));
      setEdges((localEdge) =>
        localEdge.concat({
          id,
          source: connectingNodeIdItem,
          target: id,
        })
      );
    },
    [screenToFlowPosition, setEdges, setNodes, onChange]
  );

  const deleteNode = useCallback(
    (nodeId: string) => {
      setNodes((prev) => {
        // @ts-ignore
        return prev.filter((node) => node.id !== nodeId);
      });
    },
    [setNodes]
  );

  return {
    setEdges,
    deleteNode,
    addNewNodeItem,
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
  };
};
