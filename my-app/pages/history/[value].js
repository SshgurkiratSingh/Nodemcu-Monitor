import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { Chart } from "chart.js/auto";
const dd = require("../../customisation.json");

export default function HistoryPage() {
  const router = useRouter();
  const { value } = router.query;
  const [data, setData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    // Fetch data from the API endpoint
    const fetchData = async () => {
      const response = await fetch(
        `http://192.168.1.100:3000/api/history/${value}`
      );
      const jsonData = await response.json();
      setData(jsonData);
    };

    fetchData();

    // Refresh data every 10 seconds
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [value]);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    if (data) {
      // Get the latest 7 values
      const latestData = data.slice(-7);

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
        <canvas id="myChart"></canvas>
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
                {data.map((entry, index) => (
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
