import ItemChart from "../../components/chart/ItemChart";
import UsersTable from "../../components/usersTable/UsersTable";
const Admin = () => {
  return (
    <>
      <h3 className='my-3'>Item Chart</h3>
      <ItemChart />
      <h3 className='my-3'>User Table</h3>
      <UsersTable />
    </>
  );
};

export default Admin;
