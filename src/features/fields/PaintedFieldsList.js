import React from "react";
import { useSelector } from "react-redux";

const PaintedFieldsList = () => {
  const { hoveredFields } = useSelector((state) => state.fields);
  return (
    <div className="paintedFieldsList">
      <h3>hover squares</h3>
      <div className="container">
        {hoveredFields.length > 0 &&
          hoveredFields.map(
            (field) =>
              field.length > 0 &&
              field.map((f) => (
                <div className="item" key={Math.random()}>
                  <span>row</span> {f.row + 1} {""}
                  <span>col</span> {f.col + 1}
                </div>
              ))
          )}
      </div>
    </div>
  );
};

export default PaintedFieldsList;
