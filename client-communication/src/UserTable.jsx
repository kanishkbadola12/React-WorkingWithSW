import { useState } from "react"
import classes from "./UserTable.module.css";

const UserTable = () => {
    const [tableData, setTableData] = useState({});

    navigator.serviceWorker.addEventListener('message', ({ data }) => {
        setTableData(data);
    });

    return (
        <>

            {Object.keys(tableData).length == 0 && <p>Waiting for the form data...</p>}
            {Object.keys(tableData).length > 0 && (
                <>
                    <h3>Table generated from form data using SW</h3>
                    <table>
                        <tbody>
                            {
                                Object.keys(tableData).map((field, index) => (
                                    <tr key={index}>
                                        <td>{field}</td>
                                        <td>{tableData[field]}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </>
            )}
        </>
    )
}

export default UserTable;