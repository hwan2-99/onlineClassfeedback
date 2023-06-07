import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import classes from "../../component/prof/Feedback.module.css";
import profHandler from "../../lib/handler/profHandler";

const ChartFeedback = (props) => {
  const { video_num, selectedKey, content } = props;
  const [graphData, setGraphData] = useState({});

  const graphOptions = {
    // 차트 옵션을 정의하세요
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await profHandler.getProblemListByType(
        video_num,
        selectedKey
      );
      const graphData = {
        labels: content,
        datasets: [
          {
            label: "Data",
            data: result.data,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      };
      setGraphData(graphData);
    };

    fetchData();
  }, [video_num, selectedKey, content]);

  return (
    <>
      {/* ... */}
      <div className={classes.Graph}>
        <Bar data={graphData} options={graphOptions} />
      </div>
    </>
  );
};

export default ChartFeedback;
