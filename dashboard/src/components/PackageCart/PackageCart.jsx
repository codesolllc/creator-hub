import styles from "./packagecart.module.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import PackageUpdateModal from "../PackageUpdateModal/PackageUpdateModal";

const chartdata = [
  {
    name: "A",
    uv: 83,
    pv: 40,
    amt: 40,
  },
  {
    name: "B",
    uv: 150,
    pv: 138,
    amt: 220,
  },
  {
    name: "C",
    uv: 200,
    pv: 980,
    amt: 290,
  },
  {
    name: "D",
    uv: 270,
    pv: 398,
    amt: 200,
  },
  {
    name: "E",
    uv: 189,
    pv: 480,
    amt: 211,
  },
  {
    name: "F",
    uv: 239,
    pv: 380,
    amt: 250,
  },
  {
    name: "G",
    uv: 340,
    pv: 330,
    amt: 210,
  },
];


const PackageCart = ({data}) => {

  const [updatePackageModal, setUpdatePackageModal] = useState(false);
  const [packageData, setPackageData] = useState({});


  const updatePackage = (data)=>{
    setPackageData(data)
    setUpdatePackageModal(true)
  }
                            
  return (
    <>
    <div className={`${styles.package_cartBox} p-4 `}>
      <div className={`${styles.package_Details}`}>
        <h4 className="mb-3">{data?.category_name}</h4>
        <span>400 Users</span>
        <p className="mt-3">
          $ {(data?.price*12)?.toFixed(0)} <sup>/Annual</sup>
        </p>
        <p>
          $ {data?.price} <sup>/Monthly</sup>
        </p>
        <button
        onClick={()=>updatePackage(data)}
        >Edit Package</button>
      </div>

      <div  className={styles.AreaChartContainer}>
        <span className="ms-5 f-bold">WEEKLY PACKAGES PROGRESS</span>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartdata}
            margin={{
              top: 20,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#6e56f5"
              fill="#c7bff1"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
    {
        updatePackageModal && <PackageUpdateModal packageData={packageData} setShowModal={setUpdatePackageModal} />
    }
    </>
  );
};

export default PackageCart;
