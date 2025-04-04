import React, { useState, useEffect } from 'react';

/**
 * Renders a dynamic table based on the provided schema and data.
 * 
 * @param {Object} tableSchema - An object defining the table structure.
 * The key represents the column header, and the value corresponds to the key in the data objects to display in that column.
 * 
 * Example: { "ID": "id", "Name": "name" } will render headers "ID" and "Name", and access each row's values using user["id"] and user["name"].
 * 
 * @param {Array<Object>} data - Array of objects representing the table rows.
 * @param {Function} [onClick] - Optional. A function to call when a row is clicked. Receives the row data as an argument.
 */

function Table({ tableSchema, data, onClick }) {
  const [tableData, setTableData] = useState(data || []);
  const [sortConfig, setSortConfig] = useState({ param: "", ascending: false });

  //useEffect(() => {
  //    let sorted = [...data];
  //
  //    if (sortConfig.param) {
  //      const key = tableSchema[sortConfig.param];
  //      sorted.sort((a, b) => {
  //        if (a[key] < b[key]) return sortConfig.ascending ? -1 : 1;
  //        if (a[key] > b[key]) return sortConfig.ascending ? 1 : -1;
  //        return 0;
  //      });
  //    }
  //
  //    setTableData(sorted);
  //}, [data, sortConfig, tableSchema]);

  useEffect(() => {
    let sorted = [...data];
    
    if (sortConfig.param) {
        const path = tableSchema[sortConfig.param];
        sorted.sort((a, b) => {
            const aValue = getValueByPath(a, path);
            const bValue = getValueByPath(b, path);
        
            if (aValue < bValue) return sortConfig.ascending ? -1 : 1;
            if (aValue > bValue) return sortConfig.ascending ? 1 : -1;
            return 0;
        });
    }
  
    setTableData(sorted);
  }, [data, sortConfig, tableSchema]);

    const sortBy = (param) => {
        setSortConfig((prev) => ({
            param,
            ascending: prev.param === param ? !prev.ascending : true,
        }));
    };

    const renderHeaderRow = () => {
        return Object.keys(tableSchema).map((header, index) => (
              <th onClick={() => sortBy(header)} key={index}>{header} {sortConfig.param === header && (sortConfig.ascending ? "⬆️" : "⬇️")}</th>
        ))
    }

    //const renderTableRows = () => {
    //  //if(tableData.length == 0) return <p style={{width:'100%'}}>No Results</p>;
    //    return tableData.map((row, rowIndex) => (
    //        <tr key={rowIndex} onClick={() => onClick?.(row)}>
    //            {Object.values(tableSchema).map((key, cellIndex) => (
    //              <td key={cellIndex}>{row[key] ? row[key] : "None"}</td>
    //            ))}
    //        </tr>
    //    ));
    //};

    // Helper to resolve nested paths like "roles[0].role"
    function getValueByPath(obj, path) {
        if (!path) return undefined;
        // Split by dot, but handle [index] for arrays
        return path.split('.').reduce((acc, part) => {
            const match = part.match(/^(\w+)\[(\d+)\]$/);
            if (match) {
                // e.g., roles[0]
                const prop = match[1];
                const idx = parseInt(match[2], 10);
                return acc && acc[prop] && Array.isArray(acc[prop]) ? acc[prop][idx] : undefined;
            }
            return acc ? acc[part] : undefined;
        }, obj);
    }

    // ...existing code...

    const renderTableRows = () => {
        return tableData.map((row, rowIndex) => (
            <tr key={rowIndex} onClick={() => onClick?.(row)}>
                {Object.values(tableSchema).map((path, cellIndex) => (
                    <td key={cellIndex}>{getValueByPath(row, path) ?? "None"}</td>
                ))}
            </tr>
        ));
    };


    return (
      <div className='Table-Wrapper'>
        <table>
          <thead>
            <tr>
              {renderHeaderRow()}
            </tr>
          </thead>
          <tbody>
            {renderTableRows()}
          </tbody>
        </table>
      </div>
    );
}

export default Table;