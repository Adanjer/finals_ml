document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById("linearChart").getContext("2d");
  
    // Example data: Mileage (x-axis), Maintenance Cost (y-axis)
    const dataPoints = [
      { mileage: 1000, cost: 150 },
      { mileage: 2000, cost: 300 },
      { mileage: 3000, cost: 450 },
      { mileage: 4000, cost: 600 },
      { mileage: 5000, cost: 750 },
    ];
  
    // Extract mileage and cost values
    const xValues = dataPoints.map(point => point.mileage);
    const yValues = dataPoints.map(point => point.cost);
  
    // Function to calculate the slope (m) and y-intercept (b) for y = mx + b
    function linearRegression(x, y) {
      const n = x.length;
      const xSum = x.reduce((a, b) => a + b, 0);
      const ySum = y.reduce((a, b) => a + b, 0);
      const xySum = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
      const xSquaredSum = x.reduce((sum, xi) => sum + xi ** 2, 0);
  
      const m = (n * xySum - xSum * ySum) / (n * xSquaredSum - xSum ** 2);
      const b = (ySum - m * xSum) / n;
  
      return { m, b };
    }
  
    // Calculate regression line
    const { m, b } = linearRegression(xValues, yValues);
    
    // Generate predicted values for the regression line
    const regressionLine = xValues.map(x => m * x + b);
  
    // Chart data and configuration
    const chartData = {
      labels: xValues, // mileage
      datasets: [
        {
          label: "Maintenance Cost Data",
          data: yValues,
          backgroundColor: "blue",
          borderColor: "blue",
          fill: false,
          type: "scatter",
          showLine: false,
        },
        {
          label: "Regression Line",
          data: regressionLine,
          borderColor: "red",
          fill: false,
          type: "line",
          pointRadius: 0, // Hide points for the regression line
        },
      ],
    };
  
    const config = {
      type: "scatter",
      data: chartData,
      options: {
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Mileage",
            },
          },
          y: {
            title: {
              display: true,
              text: "Maintenance Cost ($)",
            },
          },
        },
      },
    };
  
    // Render the chart
    new Chart(ctx, config);
  });
  