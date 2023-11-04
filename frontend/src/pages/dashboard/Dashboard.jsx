import AuditLog from "../../components/auditLog/AuditLog";
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
      <ItemsTable sendHandleMountToParent={handleMount} />
    </>
  );
}

export default Dashboard;
