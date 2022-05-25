import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import { Node } from "../types/Node";
import { Block } from "../types/Block";
import { RootState } from "../store/configureStore";
import fetch from "cross-fetch";
import {
  ERRORED_STATE_BLOCK,
  LOADING_STATE_BLOCK,
} from "../constants/blocks";
export interface NodesState {
  list: Node[];
}

export const checkNodeStatus = createAsyncThunk(
  "nodes/checkNodeStatus",
  async (node: Node) => {
    const response = await fetch(`${node.url}/api/v1/status`);
    const response2 = await fetch(`${node.url}/api/v1/blocks`);
    const data: { node_name: string }  = await response.json();
    const blocks: { data: Block[] } = await response2.json();
    //const dataFinal = data + dataBlock;
    //console.log(data);
    //console.log(dataBlock);
    //console.log(dataFinal);
    const combined = {
      node_name: data.node_name,
      blocks: blocks.data,
    };
    return combined;
  }
);
export const checkNodesStatus = createAsyncThunk(
  "nodes/checkNodesStatus",
  async (nodes: Node[], thunkAPI) => {
    const { dispatch } = thunkAPI;
    nodes.forEach((node) => {
      dispatch(checkNodeStatus(node));
    });
  }
);
export const nodesSlice = createSlice({
  name: "nodes",
  initialState: initialState().nodes as NodesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkNodeStatus.pending, (state, action) => {
      const node = state.list.find((n) => n.url === action.meta.arg.url);
      //console.log(action)
      if (node) {
        node.loading = true;
        node.blocks = LOADING_STATE_BLOCK;
      }
      //console.log('nodesSlice');
      //console.log(node);
    });
    builder.addCase(checkNodeStatus.fulfilled, (state, action) => {
      const node = state.list.find((n) => n.url === action.meta.arg.url);
      if (node) {
        node.online = true;
        node.loading = false;
        node.name = action.payload.node_name;
        node.blocks = action.payload.blocks;
        //console.log(node.blocks);
      }
      //console.log('nodesSlice-2');
        ///-----
    });
    builder.addCase(checkNodeStatus.rejected, (state, action) => {
      const node = state.list.find((n) => n.url === action.meta.arg.url);
      if (node) {
        node.online = false;
        node.loading = false;
        node.blocks = ERRORED_STATE_BLOCK;
      }
      //console.log('nodesSlice-3');
      //console.log(node);
    });

  },

});

export const selectNodes = (state: RootState) => state.nodes.list;
export default nodesSlice.reducer;


