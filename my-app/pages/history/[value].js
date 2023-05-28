import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { Chart } from "chart.js/auto";

export default function HistoryPage() {
  const router = useRouter();
  const { value } = router.query;
  const [data, setData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    // Fetch data from the API endpoint
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/api/history/${value}`
      );
      const jsonData = await response.json();
      setData(jsonData);
    };

    fetchData();
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
              label: "Value",
              borderColor: "#3e95cd",
              backgroundColor: "#7bb6dd",
              fill: false,
            },
          ],
        },
      });
    }
  }, [data]);

  return (
    <div>
      <center>
        <h1 className="text-3xl font-bold">History Page of {value}</h1>
        {data ? (
          <div className="overflow-x-auto">
            <table className="table">
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
      <canvas id="myChart"></canvas>
    </div>
  );
}
