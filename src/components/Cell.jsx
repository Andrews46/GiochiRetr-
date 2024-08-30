import StyledCell from "./StyledCell";
import {FigureGeometriche } from "../FigureGeometriche";

const Cell = ({ type }) => (
  <StyledCell type={type} color={FigureGeometriche[type].color}>
  
  </StyledCell>
);

export default React.memo(Cell);