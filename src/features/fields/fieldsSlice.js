import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

export const fetchFieldsList = createAsyncThunk(
  "slice/fetchFields",
  async () => {
    const result = await fetch("https://demo1030918.mockable.io/").then((res) =>
      res.json()
    );
    return result;
  }
);
const initialState = {
  field: [],
  grid: [],
  hoveredFields: [],
  selectedMode: "PICK MODE",
};

export const fieldsSlice = createSlice({
  name: "fields",
  initialState,
  reducers: {
    setNewSelectedMode: (state, action) => {
      state.selectedMode = action.payload;
    },

    createGrid: (state, action) => {
      state.grid = action.payload;
      state.hoveredFields = [];
    },

    changeHovered: (state, action) => {
      state.grid[action.payload.arrIndex] = current(
        state.grid[action.payload.arrIndex]
      ).map((obj) => {
        return obj.id === action.payload.objIndex
          ? {
              ...obj,
              hovered: !obj.hovered,
            }
          : { ...obj };
      });
    },

    createHoveredFields: (state) => {
      state.hoveredFields = current(state.grid).map((obj) => {
        return obj.filter((o) => o.hovered === true);
      });
      console.log(state.hoveredFields);
    },
  },
  extraReducers: {
    [fetchFieldsList.fulfilled]: (state, action) => {
      state.field = action.payload;
    },
  },
});

export const {
  setNewSelectedMode,
  createGrid,
  changeHovered,
  createHoveredFields,
} = fieldsSlice.actions;

export default fieldsSlice.reducer;
