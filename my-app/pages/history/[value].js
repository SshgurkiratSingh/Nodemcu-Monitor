import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { Chart } from "chart.js/auto";
import { set } from "date-fns";
import Link from "next/link";

const dd = require("../../customisation.json");

export default function HistoryPage() {
  const [current, setCurrent] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [timeAlert, setTimeAlert] = useState(false);
  const router = useRouter();
  const { value } = router.query;
  const [data, setData] = useState(null);
  const chartRef = useRef(null);
  const handleRangeChange = (event) => {
    setPerPage(parseInt(event.target.value));
  };
  useEffect(() => {
    // Fetch data from the API endpoint
    const fetchData = async () => {
      const response = await fetch(
        `https://expressjs-with-sheet-logging.gurkirat7092.repl.co/api/history/${value}?page=${current}&limit=${perPage}`
      );
      const jsonData = await response.json();
      setData(jsonData);
    };
    const startTime = Date.now();

    const interval = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const elapsedMinutes = Math.floor(elapsedTime / 60000);

      if (elapsedMinutes >= 1) {
        setTimeAlert(true);
      }
    }, 1000);
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
              borderColor: "#dca54a",
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
                color: "#dca54a",
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
      {timeAlert ? (
        <div class="alert shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="stroke-info flex-shrink-0 w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <div>
              <h3 class="font-bold">New message!</h3>
              <div class="text-xs">
                It's been more than a minute since this is last updated. Try
                refreshing!
              </div>
            </div>
          </div>
          <div class="flex-none">
            <kbd className="kbd">ctrl</kbd>+<kbd className="kbd">R</kbd>
          </div>
        </div>
      ) : (
        <></>
      )}
      <center>
        <div className="ccc-container">
          <div className="ccc">
            <div className="front-content">
              <p> History Page of {sensorTitle}</p>
            </div>
            <div className="content">
              <p className="heading">{sensorDescription}</p>
              <p>unit in {sensorUnit}</p>
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
      <div className="flex flex-col items-center justify-center">
        <div className="dda">
          {" "}
          <input
            type="range"
            min="0"
            max="30"
            value={perPage}
            className="range"
            step="10"
            onChange={handleRangeChange}
          />
          <div className="w-full flex justify-between text-xs px-2">
            <span>0</span>
            <span>10</span>
            <span>20</span>
            <span>30</span>
          </div>
        </div>
        <div className="text-sm  breadcrumbs">
          <ul className="">
            <li>
              <Link href="/"> Home</Link>
            </li>
            <li>
              <a>{value}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
