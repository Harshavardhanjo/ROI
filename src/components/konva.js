import { Stage, Layer, Group, Line, Rect } from "react-konva";
import React, { Component } from "react";
import './Konva.css'
import axios from 'axios'
import { Clear, Send } from "./konvaElements";



class Canvas extends Component {
    state = {
      points: [],
      curMousePos: [0, 0],
      isMouseOverStartPoint: false,
      isFinished: false
    };
  
    componentDidMount() {
      console.log(window.innerHeight);
    }
  
    getMousePos = stage => {
      return [stage.getPointerPosition().x, stage.getPointerPosition().y];
    };
    handleClick = event => {
      const {
        state: { points, isMouseOverStartPoint, isFinished },
        getMousePos
      } = this;
      const stage = event.target.getStage();
      const mousePos = getMousePos(stage);
  
      if (isFinished) {
        return;
      }
      if (isMouseOverStartPoint && points.length >= 3) {
        this.setState({
          isFinished: true
        });
      } else {
        this.setState({
          points: [...points, mousePos]
        });
      }
    };
    handleMouseMove = event => {
      const { getMousePos } = this;
      const stage = event.target.getStage();
      const mousePos = getMousePos(stage);
  
      this.setState({
        curMousePos: mousePos
      });
    };
    handleMouseOverStartPoint = event => {
      if (this.state.isFinished || this.state.points.length < 3) return;
      event.target.scale({ x: 2, y: 2 });
      this.setState({
        isMouseOverStartPoint: true
      });
    };
    handleMouseOutStartPoint = event => {
      event.target.scale({ x: 1, y: 1 });
      this.setState({
        isMouseOverStartPoint: false
      });
    };
    handleDragStartPoint = event => {
      console.log("start", event);
    };
    handleDragMovePoint = event => {
      const points = this.state.points;
      const index = event.target.index - 1;
      console.log(event.target);
      const pos = [event.target.attrs.x, event.target.attrs.y];
      console.log("move", event);
      console.log(pos);
      this.setState({
        points: [...points.slice(0, index), pos, ...points.slice(index + 1)]
      });
    };
    handleDragOutPoint = event => {
      console.log("end", event);
    };

    // handleClear = event =>
    // {
    //   layer.find('Line').destroy();
    //   layer.find('Rectangle').destroy()
    // }

    handleSend = (e,points) =>
    {
 
    }
  
    render() {
    
    
      const {
        state: { points, isFinished, curMousePos },
        handleClick,
        handleMouseMove,
        handleMouseOverStartPoint,
        handleMouseOutStartPoint,
        handleDragStartPoint,
        handleDragMovePoint,
        handleDragEndPoint
      } = this;
      // [ [a, b], [c, d], ... ] to [ a, b, c, d, ...]
      const flattenedPoints = points
        .concat(isFinished ? [] : curMousePos)
        .reduce((a, b) => a.concat(b), []);
  
        console.log('flattenedpoints',flattenedPoints)
        console.log('points',points)
      return (
        
        <div className = 'container'>
          {/* <button onClick = {() => {
            console.log("woses")
            axios.post('http://127.0.0.1:5000/test',{points}).then(response => {
              console.log('send',flattenedPoints)
              console.log(response)
            })
          }}>Send</button> */}

          <Clear>Get</Clear>
          <Stage className = 'stage'
          width={500}
          height={300}
          onMouseDown={handleClick}
          onMouseMove={handleMouseMove}
        >
          <Layer>
            <Line
              points={flattenedPoints}
              stroke="green"
              strokeWidth={5}
              closed={isFinished}
            />
            {points.map((point, index) => {
              const width = 6;
              const x = point[0] - width / 2;
              const y = point[1] - width / 2;
              const startPointAttr =
                index === 0
                  ? {
                      hitStrokeWidth: 12,
                      onMouseOver: handleMouseOverStartPoint,
                      onMouseOut: handleMouseOutStartPoint
                    }
                  : null;
              return (
                <Rect
                  key={index}
                  x={x}
                  y={y}
                  width={width}
                  height={width}
                  fill="blue"
                  stroke="black"
                  strokeWidth={3}
                  onDragStart={handleDragStartPoint}
                  onDragMove={handleDragMovePoint}
                  onDragEnd={handleDragEndPoint}
                  draggable
                  {...startPointAttr}
                />
              );
            })}
          </Layer>
        </Stage>

        <Send onClick = {() => {
            console.log("woses")
            axios.post('http://127.0.0.1:5000/test',{flattenedPoints,points}).then(response => {
              console.log('send',flattenedPoints)
              console.log(response)
            })
          }}>Send</Send>
        </div>
        
        
      );
      
    }
  }
  
  export default Canvas;