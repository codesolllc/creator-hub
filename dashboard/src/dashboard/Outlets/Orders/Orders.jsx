import OrderBox from "../../../components/OrderBox/OrderBox";
import styles from "./orders.module.css";
import orderIcon from "../../../assets/dashboard/order.png";
import deliveryIcon from "../../../assets/dashboard/delivery.png";
import orderBoxIcon from "../../../assets/dashboard/orderbox.png";
import customerIcon from "../../../assets/dashboard/customer.png";
import ShipmentCard from "../../../components/ShipmentCard/ShipmentCard";
import { AiOutlineRise } from "react-icons/ai";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    amt: 2100,
  },
];

const Orders = () => {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="f-bold text-dark-gray">Recent Activity</h4>
            <select className={styles.orderbox_select}>
              <option>This Month</option>
              <option>Last 3 Month</option>
              <option>Last 6 Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Order Box  */}
      <div className="row">
        <div className="col-xxl-3 col-md-6">
          <OrderBox title="Total Order" boxColor="#593BFB" imgSrc={orderIcon} />
        </div>
        <div className="col-xxl-3 col-md-6">
          <OrderBox
            title="Completed Order"
            boxColor="#593BFB"
            imgSrc={orderBoxIcon}
          />
        </div>
        <div className="col-xxl-3 col-md-6">
          <OrderBox
            title="Total Delivery"
            boxColor="#593BFB"
            imgSrc={deliveryIcon}
          />
        </div>
        <div className="col-xxl-3 col-md-6">
          <OrderBox
            title="Total Customer"
            boxColor="#593BFB"
            imgSrc={customerIcon}
          />
        </div>
      </div>

      {/* Total Sales Progress */}
      <div className="row mt-5">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="f-bold text-dark-gray">Total Sales</h4>
          </div>
        </div>
      </div>
      <div className={`${styles.sale_progress_container} row m-lg-0 m-1  mt-2 px-3 py-4`}>
        <div className="col-lg-2">
          <div>
            <div>
              <span className="text-light-gray ">New Order</span>
              <div className="mt-2 d-flex justify-content-between">
                <h2>252</h2>
                <span className="text-danger f-bold">
                  24.4% <AiOutlineRise />
                </span>
              </div>
            </div>
            <div className="mt-5">
              <span className="text-light-gray ">Revenue</span>
              <div className="mt-2 d-flex justify-content-between">
                <h2>252</h2>
                <span className="text-danger f-bold">
                  24.4% <AiOutlineRise />
                </span>
              </div>
            </div>
            <div className="mt-5">
              <span className="text-light-gray ">Average Revenue</span>
              <div className="mt-2 d-flex justify-content-between">
                <h2>252</h2>
                <span className="text-danger f-bold">
                  24.4% <AiOutlineRise />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-10">
          <div className="text-end mb-3">
            <select className={styles.saleprogress_select}>
              <option>Feb</option>
              <option>Jan</option>
              <option>Dec</option>
            </select>
          </div>
          <div style={{ width: "100%", height: "280px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 10,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis axisLine={false} tickLine={false} dataKey="name" />
                <YAxis axisLine={false} tickLine={false} />
                <Line type="monotone" dataKey="uv" stroke="#c7bff1" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Order Listing */}
      <div className="row mt-5">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="f-bold text-dark-gray">Order List</h4>
            <select className={styles.orderbox_select}>
              <option>Feb</option>
              <option>Jan</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className={`${styles.table_wrapper}`}>
            <table className={`${styles.table_container}`}>
              <thead className={`${styles.table_header}`}>
                <tr>
                  <th className="text-center">No</th>
                  <th>Order ID</th>
                  <th>Order Name</th>
                  <th>Date</th>
                  <th>Cost</th>
                  <th>Shipping Cost</th>
                  <th>Product</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className={`${styles.table_body}`}>
                {[0, 1, 2, 3, 4].map((item, i) => (
                  <tr key={item}>
                    <td className="text-center">{i + 1}</td>
                    <td>
                      {" "}
                      <button className={styles.status_btn_paid}>
                        #123122
                      </button>
                    </td>

                    <td>Lorem ispum</td>
                    <td>Mar 23, 2023</td>
                    <td>$ 521.00</td>
                    <td>$ 11.00</td>
                    <td>Plant Name</td>

                    <td>
                      <button className={styles.status_btn_progress}>
                        <span
                          className={`${styles.pending_btn_circle} mx-1`}
                        ></span>{" "}
                        PENDING
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Shipments */}
      <div className="row mt-5">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="f-bold text-dark-gray">Upcomming Shipment</h4>
            <select className={styles.orderbox_select}>
              <option>Feb</option>
              <option>Jan</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 p-3">
          <ShipmentCard />
        </div>
        <div className="col-lg-4 p-3">
          <ShipmentCard />
        </div>
        <div className="col-lg-4 p-3">
          <ShipmentCard />
        </div>
        <div className="col-lg-4 p-3">
          <ShipmentCard />
        </div>
        <div className="col-lg-4 p-3">
          <ShipmentCard />
        </div>
        <div className="col-lg-4 p-3">
          <ShipmentCard />
        </div>
      </div>
    </div>
  );
};

export default Orders;
