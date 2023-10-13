import styles from "./overview.module.css";
import DBox from "../../../components/DBox/DBox";
import Mainchart from "../../../components/Mainchart/Mainchart";
import ProductPerformanceChart from "../../../components/ProductPerformanceChart/ProductPerformanceChart";
import UserSummaryItem from "../../../components/UserSummaryItem/UserSummaryItem";


const Overview = () => {
  return (
    <div className="container">
      {/* Top Boxes */}
      <div className="row mt-5">
        <div className="col-xxl-3 col-md-6">
          <DBox title="Total Number of Transactions" />
        </div>
        <div className="col-xxl-3 col-md-6">
          <DBox title="Total Number of Transactions" />
        </div>
        <div className="col-xxl-3 col-md-6">
          <DBox title="Total Number of Transactions" />
        </div>
        <div className="col-xxl-3 col-md-6">
          <DBox title="Total Number of Transactions" />
        </div>
      </div>

      {/* Monthly Progress Charts */}
      <div className="row mt-5">
        <div className="col-xl-9">
          <Mainchart />
        </div>
        <div className="col-xl-3">
          <ProductPerformanceChart />
        </div>
      </div>

      {/* User Summary  */}
      <div className="row my-5">
        <h2 className={`${styles.user_summary_heading} mb-4`}>Users Summary</h2>
        <div className="col-lg-4">
          <div>
            <h5 className="f-bold py-2">Starter Plan</h5>
            <div className="mt-3">
              {[0, 1, 2, 3].map((data) => (
                <UserSummaryItem key={data} />
              ))}
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div>
            <h5 className="f-bold py-2">Regular Plan</h5>
            <div className="mt-3">
              {[0, 1, 2, 3].map((data) => (
                <UserSummaryItem key={data} />
              ))}
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div>
            <h5 className="f-bold py-2">Advance Plan</h5>
            <div className="mt-3">
              {[0, 1, 2, 3].map((data) => (
                <UserSummaryItem key={data} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
