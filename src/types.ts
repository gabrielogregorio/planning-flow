import React from "react";

export type onChangeType = (
  event: React.ChangeEvent<HTMLTextAreaElement>,
  id: string
) => void;

export interface INodeItemType {
  id: string;
  type: "selectorNode";
  data: {
    text: string;
    onChange: onChangeType;
  };
  position: { x: number; y: number };
}

export interface IEdgeItemType {
  id: string;
  source: string;
  target: string;
}

export interface IBaseType {
  edges: IEdgeItemType[];
  nodes: INodeItemType[];
}
