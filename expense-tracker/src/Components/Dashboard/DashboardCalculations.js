import React, { useEffect, useState } from "react";
import useFetch from "../../cutomhooks/useFetch";

function DashboardCalculations() {
  const { apiData: todayData } = useFetch(
    "http://localhost:3001/api/expense/today"
  );
  const { apiData: yesterdayData } = useFetch(
    "http://localhost:3001/api/expense/yesterday"
  );
  const { apiData: weekData } = useFetch(
    "http://localhost:3001/api/expense/week"
  );
  const { apiData: monthData } = useFetch(
    "http://localhost:3001/api/expense/month"
  );
  const { apiData: yearData } = useFetch(
    "http://localhost:3001/api/expense/year"
  );

  const { apiData: totalData } = useFetch("http://localhost:3001/api/expense/");

  const [todayExpense, setTodayExpense] = useState(0);
  const [yesterdayExpense, setyesterdayExpense] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [pieChartData, setPieChartData] = useState([]);
  const [weekExpense, setweekExpense] = useState(0);
  const [monthExpense, setmonthExpense] = useState(0);
  const [yearExpense, setyearExpense] = useState(0);
  function groupBy(arr, property) {
    let sum;
    const Data = arr?.reduce(function (memo, x) {
      if (!memo[x[property]]) {
        memo[x[property]] = [];
      }
      memo[x[property]].push(x.price);
      return memo;
    }, {});
    for (let item in Data) {
      let tempObj = {};
      let tempArr = [];
      tempObj[item] = Data[item]?.reduce((a, b) => a + b);
      tempArr.push(tempObj);
      setPieChartData((prev) => [...prev, ...tempArr]);
    }
  }

  const calculateTotal = (data) => {
    if (data?.length !== 0) {
      const total = data?.map((item) => item.price).reduce((a, b) => a + b);
      return total;
    }
  };

  useEffect(() => {
    setTodayExpense(calculateTotal(todayData));
    setTotalExpense(calculateTotal(totalData));
    setyesterdayExpense(calculateTotal(yesterdayData));
    setweekExpense(calculateTotal(weekData));
    setmonthExpense(calculateTotal(monthData));
    setyearExpense(calculateTotal(yearData));
    if (totalData?.length !== 0) {
      groupBy(totalData, "type");
    }
  }, [totalData]);
  return {
    todayExpense,
    yesterdayExpense,
    totalExpense,
    weekExpense,
    monthExpense, 
    yearExpense,
    pieChartData,
  };
}
export default DashboardCalculations;
