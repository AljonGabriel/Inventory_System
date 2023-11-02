import axios from "axios";
import {useEffect, useState} from "react";
import {Badge} from "react-bootstrap";

const AuditLog = () => {
  const [logs, setLogs] = useState([]);
  const [update, setUpdate] = useState(false);
  const [click, setClick] = useState(false);
  useEffect(() => {
    getAuditLogs();
  }, [update]);

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
      console.log(err);
    }
  };

  const handleClick = () => {
    setClick(true);
  };

  return (
    <section className='my-3' style={{height: 250}}>
      <header className='d-flex align-items-center gap-3 mb-1'>
        <h3>Audit Logs</h3>
        <small className='text-black'>Legends :</small>
        <small className='text-success'>Update</small>
        <small className='text-primary'> Add</small>
        <small className='text-danger'>Delete</small>
      </header>
      <section style={{height: 200, overflow: "auto"}}>
        {logs.length > 0 ? (
          <ul>
            {logs.map((log) => (
              <li key={log._id}>
                {log.action === "Quantity adjustment" ? (
                  <>
                    {
                      <p onClick={handleClick}>
                        Modification by <b>{log.user}</b>:{" "}
                        <b className='text-success'>{log.action}</b> for
                        existing Item{" "}
                        <i>
                          {log._id} {log.item}
                        </i>{" "}
                        <b>{new Date(log.createdAt).toLocaleString()}</b>{" "}
                        {click ? click : <Badge bg='secondary'>New</Badge>}
                      </p>
                    }
                  </>
                ) : log.action === "Appended new Item" ? (
                  <>
                    {
                      <p onClick={handleClick}>
                        <b>{log.user}</b>:{" "}
                        <b className='text-primary'>{log.action}</b>{" "}
                        <i>
                          {log._id} {log.item}
                        </i>{" "}
                        <b>{new Date(log.createdAt).toLocaleString()}</b>
                        {click ? null : <Badge bg='secondary'>New</Badge>}
                      </p>
                    }
                  </>
                ) : log.action === "Deleted Item" ? (
                  <>
                    {
                      <p onClick={handleClick}>
                        <b>{log.user}</b>:{" "}
                        <b className='text-danger'>{log.action}</b>{" "}
                        <i>
                          {log._id} {log.item}
                        </i>{" "}
                        <b>{new Date(log.createdAt).toLocaleString()}</b>
                        {click ? null : <Badge bg='secondary'>New</Badge>}
                      </p>
                    }
                  </>
                ) : (
                  <>
                    {
                      <p>
                        <b>{log.user}</b>:{" "}
                        <b className='text-primary'>{log.action}</b>{" "}
                        <i>
                          {log._id} {log.item}
                        </i>{" "}
                        <b>{new Date(log.createdAt).toLocaleString()}</b>
                      </p>
                    }
                  </>
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
