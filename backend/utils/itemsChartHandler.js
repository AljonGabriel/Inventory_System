import ItemsChart from "./../models/itemsChartModel.js";

const incrementItemsCount = async (action) => {
  // Check if there is a record for the current month
  const currentMonth = new Date().toLocaleString("en-us", {month: "long"});
  const currentMonthNumber = new Date().getMonth() + 1; // Adjusted this line
  const currentYear = new Date().getFullYear(); // Add this line to get the current year

  let chartRecord = await ItemsChart.findOne({month: currentMonth});

  if (!chartRecord) {
    // If no record for the current month and year, create a new one
    chartRecord = new ItemsChart({month: currentMonth, year: currentYear});
    chartRecord.number = currentMonthNumber;
  } else if (chartRecord.year !== currentYear) {
    // If there is a record for the current month but it's for a different year,
    // create a new one for the current month and year
    chartRecord = new ItemsChart({month: currentMonth, year: currentYear});
    chartRecord.number = currentMonthNumber;
  }

  action === "update"
    ? (chartRecord.updateCount += 1)
    : action === "add"
    ? (chartRecord.addCount += 1)
    : action === "delete"
    ? (chartRecord.deleteCount += 1)
    : "No actions";

  // Save the record
  await chartRecord.save();
};

export {incrementItemsCount};
