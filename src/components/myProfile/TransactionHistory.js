import React, { useState, useEffect } from "react";
import enrollService from "../../service/enrollService";
import saveAs from "file-saver";
import axios from "axios";
import Cookies from "universal-cookie";
import { URL } from "../../utils/url";
import Table from "../common/table/Table";

function TransactionHistory() {

    const [transactionHistory, setTransactions] = useState([]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return date.toLocaleDateString(undefined, options);
    }

    const handleResponse = (response) => {
        if(response.status == 200) {
            const transactions = response.data.map(tx => ({
                ...tx,
                updated: formatDate(tx.updated),
                courseID: tx.course.id
            }));
            setTransactions(transactions);
            console.log(transactions);
        } else {
            alert("something went wrong!");
        }
    }

    useEffect(() => {
        enrollService.getTransactions(handleResponse);
    }, [])


    const handleRecieptResponse = (response) => {
        if (response.status === 200) {
            // Create a Blob from the response data
            const blob = new Blob([response.data], { type: "application/pdf" });

            // Create a URL for the Blob and open it in a new tab
            const url = window.URL.createObjectURL(blob);
            window.open(url, '_blank'); // Open the PDF in a new tab
        } else {
            alert("Something went wrong!");
        }
    }

    const getReciept = (transactionId) => {
        enrollService.getReciept(transactionId, handleRecieptResponse);
    };

    const onClick = (row) => {
        enrollService.getReciept(row.id, handleRecieptResponse);
    }

return (
    <section style={{display:'flex', flexDirection:'column', gap:'16px', width:'100vw', maxWidth:'720px'}}>
        <h2>Transaction History</h2>
        <Table tableSchema={{
        "ID": "id", 
        "Date": "updated",
        "Amount": "price",
        "Currency": "currency",
        "Course ID": "courseID"
        }} 
        data={transactionHistory} 
        onClick={onClick} />
    </section>
  );
}

export default TransactionHistory;