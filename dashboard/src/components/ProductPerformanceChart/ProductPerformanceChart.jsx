import styles from "./productperformance.module.css";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const data = [
  {
    name: "Plant A",
    uv: 400,
    amt: 240,
  },
  {
    name: "Plant B",
    uv: 300,
    amt: 221,
  },
  {
    name: "Plant C",
    uv: 200,
    amt: 229,
  },
  {
    name: "Plant D",
    uv: 278,
    amt: 200,
  },
  {
    name: "Plant E",
    uv: 189,
    amt: 218,
  },
  {
    name: "Plant F",
    uv: 239,
    amt: 250,
  },
  {
    name: "Plant G",
    uv: 70,
    amt: 210,
  },
  {
    name: "Plant H",
    uv: 278,
    amt: 200,
  },
  {
    name: "Plant I",
    uv: 189,
    amt: 218,
  },
  {
    name: "Plant J",
    uv: 239,
    amt: 250,
  },
  {
    name: "Plant K",
    uv: 70,
    amt: 210,
  },
];   


const ProductPerformanceChart = () => {
  return (
    <div
      className={`${styles.productperformace_container} px-3 py-4 mt-lg-0 mt-5`}
    >
      {/* Head */}
      <div className="d-flex justify-content-between">
        <h2 className="f-bold">Product Progress</h2>
        <select name="lastdaysprogress" className={styles.lastdays_select}>
          <option value="A">Last 7 days</option>
          <option value="A">Last 15 days</option>
          <option value="A">Last Month</option>
        </select>
      </div>
      <div>
        <span>Plants</span>
      </div>
      {/* Chart */}
      <div className="mt-4" style={{ width: "100%", height: "100%" }}>
        <ResponsiveContainer width="100%" height="87%">
          <BarChart
            layout="vertical"
            data={data}
            barGap={10}
            barSize={10}
            barCategoryGap={20}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} />
            <Legend />
            <Bar dataKey="uv" fill="#c7bff1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};


export default ProductPerformanceChart;
