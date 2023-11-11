import AuditLog from "../../components/auditLog/AuditLog";
import ItemChart from "../../components/chart/ItemChart";
import ItemsTable from "../../components/itemTable/ItemsTable";
import {useState} from "react";
function Dashboard() {
  const [mount, setMount] = useState(false);

  const handleMount = () => {
    setMount(!mount);
  };
  return (
    <>
      <AuditLog handleMountFromParent={handleMount} />
      {/* <ItemChart handleMountFromParent={handleMount} /> */}
      <ItemsTable sendHandleMountToParent={handleMount} />
    </>
  );
}

export default Dashboard;
