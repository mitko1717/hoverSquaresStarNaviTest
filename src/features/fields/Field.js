import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setNewSelectedMode,
  fetchFieldsList,
  createGrid,
  changeHovered,
  createHoveredFields,
} from "./fieldsSlice";

const Field = () => {
  const { field, selectedMode, grid } = useSelector((state) => state.fields);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFieldsList());
  }, []);

  const modeChangeHandler = (e) => {
    dispatch(setNewSelectedMode(e.target.value));
  };

  const toggleHoverHandler = (arrIndex, objIndex) => {
    dispatch(changeHovered(arrIndex, objIndex));
  };

  const filterHoveredHandler = () => {
    dispatch(createHoveredFields());
  };

  const gridArr = [];
  if (selectedMode !== "PICK MODE") {
    const rowAndColAmount = Number(field[selectedMode].field);

    for (let row = 0; row < rowAndColAmount; row++) {
      gridArr.push([]);
      for (let col = 0; col < rowAndColAmount; col++) {
        gridArr[row].push({
          hovered: false,
          number: Math.ceil(Math.random() * 10000),
          id: Math.random() * 10000,
          row: row,
          col: col,
        });
      }
    }
  }

  return (
    <div className="field">
      <div>
        <select value={selectedMode} onChange={modeChangeHandler}>
          <option value="PICK MODE" key="pick" disabled="disabled">
            PICK MODE
          </option>
          {Object.keys(field).length > 0 &&
            Object.keys(field).map((f) => {
              const fieldValue = field[f];
              return (
                <option key={f} value={f}>
                  {f} {fieldValue.field} fields
                </option>
              );
            })}
        </select>
        <button onClick={() => dispatch(createGrid(gridArr))}>START</button>
      </div>

      {grid.length > 0 && (
        <table>
          <tbody>
            {grid.map((item, index) => (
              <tr key={Math.random()}>
                {item.map((c) => {
                  return (
                    <th
                      style={
                        c.hovered === false
                          ? { background: "white" }
                          : { background: "darkcyan" }
                      }
                      onMouseEnter={() => {
                        toggleHoverHandler({ arrIndex: index, objIndex: c.id });
                        filterHoveredHandler();
                      }}
                      key={Math.random()}
                    ></th>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Field;
