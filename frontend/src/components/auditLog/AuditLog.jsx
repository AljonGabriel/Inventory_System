import axios from "axios";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import ButtonDeleteAllItemLogs from "../buttonDeleteAllItemLogs/ButtonDeleteAllItemLogs";
import {useSelector} from "react-redux";

const AuditLog = ({handleMountFromParent}) => {
  const [logs, setLogs] = useState([]);
  const [update, setUpdate] = useState(false);

  const {userInfo} = useSelector((state) => state.auth);

  useEffect(() => {
    getAuditLogs();
  }, [handleMountFromParent]);

  const handleUpdate = () => {
    setUpdate(!update);
  };

  const getAuditLogs = async () => {
    try {
      const res = await axios.get("/api/items/audit");
      const auditLogs = res.data;
      // Sort the logs in descending order based on 'createdAt'
      auditLogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setLogs(auditLogs);
      handleUpdate();
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <section className='my-3' style={{height: 250}}>
      <header className='d-flex align-items-center gap-3 mb-1'>
        <h3>Audit Logs</h3>
        <small className='text-black'>Legends :</small>
        <small className='text-success'>Update</small>
        <small className='text-primary'> Add</small>
        <small className='text-danger'>Delete</small>
        {userInfo.role === "admin" && <ButtonDeleteAllItemLogs />}
      </header>
      <section style={{height: 200, overflow: "auto"}}>
        {logs.length > 0 ? (
          <ul>
            {logs.map((log) => (
              <li key={log._id}>
                {log.action === "Quantity adjustment" ? (
                  <p>
                    Modification by <b>{log.user}</b>:{" "}
                    <b className='text-success'>{log.action}</b> for existing
                    Item of <b> {log.quantity} </b>{" "}
                    <i>
                      {log.itemID} {log.item}
                    </i>{" "}
                    <b>{new Date(log.createdAt).toLocaleString()}</b>{" "}
                  </p>
                ) : log.action === "Appended new Item" ? (
                  <p>
                    <b>{log.user}</b>:{" "}
                    <b className='text-primary'>{log.action}</b>{" "}
                    <i>
                      {log.itemID} {log.item}
                    </i>{" "}
                    <b>{new Date(log.createdAt).toLocaleString()}</b>
                  </p>
                ) : log.action === "Deleted Item" ? (
                  <p>
                    <b>{log.user}</b>:{" "}
                    <b className='text-danger'>{log.action}</b>{" "}
                    <i>
                      {log.itemID} {log.item}
                    </i>{" "}
                    <b>{new Date(log.createdAt).toLocaleString()}</b>
                  </p>
                ) : log.action === "Deleted multiple items" ? (
                  <>
                    <p>
                      <b>{log.user}</b>:{" "}
                      <b className='text-danger'>{log.action}</b> at{" "}
                      <b>{new Date(log.createdAt).toLocaleString()}</b>
                    </p>
                    <ul>
                      {log.itemID.split(",").map((item, index) => (
                        <li key={index}>
                          <b>ID : </b> {log.itemID.split(",")[index]}
                          <ul>
                            <li>
                              <b>Item name : {log.item.split(",")[index]}</b>
                            </li>
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : log.action === "Updated item" ? (
                  <p>
                    Modification by <b>{log.user}</b>:{" "}
                    <b className='text-success'>{log.action}</b> for existing
                    Item of <b> {log.quantity} </b>{" "}
                    <i>
                      {log.itemID} {log.item}
                    </i>{" "}
                    <b>{new Date(log.createdAt).toLocaleString()}</b>{" "}
                  </p>
                ) : (
                  "Undefined Logs"
                )}
              </li>
            ))}
          </ul>
        ) : (
          "No logs"
        )}
      </section>
    </section>
  );
};

export default AuditLog;
