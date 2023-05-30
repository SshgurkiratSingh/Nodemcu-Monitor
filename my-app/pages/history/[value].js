import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { Chart } from "chart.js/auto";
import { set } from "date-fns";
const dd = require("../../customisation.json");

export default function HistoryPage() {
  const [current, setCurrent] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const router = useRouter();
  const { value } = router.query;
  const [data, setData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    // Fetch data from the API endpoint
    const fetchData = async () => {
      const response = await fetch(
        `https://expressjs-with-sheet-logging.gurkirat7092.repl.co/api/history/${value}?page=${current}&limit=${perPage}`
      );
      const jsonData = await response.json();
      setData(jsonData);
    };

    fetchData();
  }, [value, current, perPage]);
  const goToPreviousPage = () => {
    if (current > 1) {
      setCurrent(current - 1);
    }
  };
  const goToNextPage = () => {
    setCurrent(current + 1);
  };
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    if (data) {
      // Get the latest 7 values
      const latestData = data["data"];

      // Create a new chart
      const ctx = document.getElementById("myChart").getContext("2d");
      chartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: latestData.map((entry) => entry.date),
          datasets: [
            {
              data: latestData.map((entry) => entry.value),
              label: "Sensor",
              borderColor: "#3e95cd",
              backgroundColor: "#7bb6dd",
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            x: {
              ticks: {
                color: "red",
              },
            },
            y: {
              ticks: {
                color: "blue",
              },
            },
          },
        },
      });
    }
  }, [data]);

  const sensorTitle = dd.sensor[value] ? dd.sensor[value].title : "";
  const sensorDescription = dd.sensor[value]
    ? dd.sensor[value].description
    : "";
  const sensorUnit = dd.sensor[value] ? dd.sensor[value].unit : "";

  return (
    <div>
      <center>
        <div className="ccc-container">
          <div className="ccc">
            <div className="front-content">
              <p> History Page of {sensorTitle}</p>
            </div>
            <div className="content">
              <p className="heading">{sensorDescription}</p>
              <p>{sensorUnit}</p>
            </div>
          </div>
        </div>
        <canvas
          id="myChart"
          style={{ maxWidth: "600px", maxHeight: "400px" }}
        ></canvas>
        <div className="pagination">
          <span class="badge">{current}</span>
          <button
            className="btn"
            onClick={goToPreviousPage}
            disabled={current === 1}
          >
            Previous
          </button>

          {data ? (
            <>
              <button
                className="btn"
                onClick={goToNextPage}
                disabled={current === data.totalPages}
              >
                Next Page
              </button>
              <span class="badge">{data.totalPages}</span>
            </>
          ) : (
            <></>
          )}
        </div>
        {data ? (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {data["data"].map((entry, index) => (
                  <tr className="hover" key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{entry.date}</td>
                    <td>{entry.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </center>
    </div>
  );
}
