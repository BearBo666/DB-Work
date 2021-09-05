import React, { Component } from "react";
import "./index.scss";

export default class index extends Component {
  render() {
    return (
      <div className="wave-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          style={{ width: "100%", height: "90px" }}
        >
          <g fill="rgba(39,134,220,0.8)">
            <path d="M 0 70 Q 75 39, 150 70 T 300 70 T 450 70 T 600 70 T 750 70 V 100 H 0 V 0"></path>
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="translate"
              from="0"
              to="-300"
              dur="4s"
              repeatCount="indefinite"
            ></animateTransform>
          </g>
          <g fill="rgba(39,134,220,0.6)">
            <path d="M 0 70 Q 87.5 47, 175 70 T 350 70 T 525 70 T 700 70 T 875 70 T 1050 70 V 100 H 0 V 0"></path>
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="translate"
              from="0"
              to="-350"
              dur="5s"
              repeatCount="indefinite"
            ></animateTransform>
          </g>
          <g fill="rgba(39,134,220,0.4)" transform="translate(-903.868 0)">
            <path
              d="M 0 70 Q 135 36, 270 70 T 540 70 T 810 70 T 1080 70 V 300 H 0 V 0"
              transform="translate(-38.232284367796474, 0)"
            ></path>
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="translate"
              from="0"
              to="-400"
              dur="3s"
              repeatCount="indefinite"
            ></animateTransform>
          </g>
          <g fill="rgba(39,134,220,0.2)" transform="translate(-903.868 0)">
            <path
              d="M 0 70 Q 135 36, 270 70 T 540 70 T 810 70 T 1080 70 V 100 H 0 V 0"
              transform="translate(-38.232284367796474, 0)"
            ></path>
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="translate"
              from="0"
              to="-450"
              dur="4s"
              repeatCount="indefinite"
            ></animateTransform>
          </g>
          <g fill="rgba(39,134,220,0.8)" transform="translate(-903.868 0)">
            <path
              d="M 0 70 Q 135 36, 270 70 T 540 70 T 810 70 T 1080 70 V 100 H 0 V 0"
              transform="translate(-38.232284367796474, 0)"
            ></path>
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="translate"
              from="0"
              to="-500"
              dur="3.5s"
              repeatCount="indefinite"
            ></animateTransform>
          </g>
        </svg>
      </div>
    );
  }
}
