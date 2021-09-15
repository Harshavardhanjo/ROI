import React, { Suspense } from "react";
import type from "prop-types";
import { CircularProgress } from "@material-ui/core";
import Canvas from "react-canvas-polygons";

class DrawCanvas extends React.PureComponent {
  handleCleanCanva = () => this.canva.cleanCanvas();

  render() {
    const { imageInfo, tool, onCompleteDraw, fenceData } = this.props;
    const imageInfoLength = Object.keys(imageInfo).length === 0;

    return (
      <Suspense fallback={<CircularProgress color="secondary" />}>
        <button
          variant="outlined"
          style={{ marginBottom: "20px" }}
          onClick={this.handleCleanCanva}
        >
          Clean Canvas
        </button>
        {imageInfoLength && <CircularProgress color="secondary" />}
        <Canvas
          ref={(canva) => (this.canva = canva)}
          imgSrc={imageInfo.url}
          height={imageInfo.height}
          width={imageInfo.width}
          tool={tool}
          onCompleteDraw={onCompleteDraw}
          initialData={fenceData}
        />
      </Suspense>
    );
  }
}

export default DrawCanvas;

DrawCanvas.propTypes = {
  tool: type.string,
  imageInfo: type.object
};