import styles from "./mainchart.module.css";
import { BsFillCircleFill } from "react-icons/bs";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { name: "1", uv: 300, pv: 456 },
  { name: "5", uv: 100, pv: 321 },
  { name: "6", uv: 9, pv: 235 },
  { name: "7", uv: 53, pv: 267 },
  { name: "12", uv: 43, pv: 45 },
  { name: "19", uv: 222, pv: 366 },
  { name: "20", uv: 372, pv: 486 },
  { name: "21", uv: 182, pv: 512 },
  { name: "22", uv: 164, pv: 302 },
  { name: "23", uv: 316, pv: 425 },
  { name: "24", uv: 131, pv: 467 },
  { name: "32", uv: 154, pv: 33 },
  { name: "33", uv: 205, pv: 354 },
  { name: "34", uv: 70, pv: 258 },
];

const Mainchart = () => {
  return (
    <div className={`${styles.mainchart_container}`}>
      {/* Select Month (Header)... */}
      <div className="py-3 px-5" style={{ borderBottom: "2px solid #D0CECD" }}>
        <h2 className="f-bold">Filter By Date</h2>
        <div className={`d-flex justify-content-between`}>
          <select name="filteroptions" defaultValue={"DEFAULT"} className={styles.select_month_field}>
            <option value="DEFAULT" disabled>
              Select Month Seperately
            </option>
            <option value="jan">Jan</option>
            <option value="feb">Feb</option>
            <option value="mar">Mar</option>
          </select>
          <div className={styles.graph_bar_tag}>
            <span>
              <BsFillCircleFill className={styles.circle_tag} /> Income
            </span>
            <span>
              <BsFillCircleFill className={styles.circle_tag2} /> User
            </span>
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="mt-4" style={{width: "100%", height: "100%"}}>
        <ResponsiveContainer width="100%" height="75%">

        <BarChart
          data={data}
          barGap={10}
          barSize={10}
          barCategoryGap={20}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="pv" fill="#6e56f5" />
          <Bar dataKey="uv" fill="#c7bff1" />
        </BarChart>
        </ResponsiveContainer>

      </div>
    </div>
  );
};

export default Mainchart;
