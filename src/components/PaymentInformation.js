import '../App.css';
import { useEffect, useState } from 'react';

function PaymentInformation({ data, onSubmit }) {

    const [cardNumber, setCardNumber] = useState(null);
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);
    const [securityCode, setSecurityCode] = useState(null);
    const [validInput, setValidInput] = useState(true);

    const handleInput = (event) => {
        const { name, value } = event.target;

        switch(name) {
            case "cardNumber":
                setCardNumber(value.replace(/[^\d.]/g, '').slice(0, 16));
                break;
            case "month":
                setMonth(value === '' ? null : value);
                break;
            case "year":
                setYear(value === '' ? null : value);
                break;
            case "securityCode":
                setSecurityCode(value.replace(/[^\d.]/g, '').slice(0, 4));
                break;
            default:
                break;
        }
    }

    const validateInput = () => {
        return /^\d{16}$/.test(cardNumber) && month != null && year != null && /^\d{4}$/.test(securityCode);
    }

    useEffect(() => {
        setValidInput(validateInput());
    }, [cardNumber, month, year, securityCode]);

    const constructMonthDropdown = () => {
        const options = [];
        for(let i = 1; i <= 12; i++) {
            options.push(<option value={i}>{i < 10 ? `0${i}` : i}</option>)
        }
        return options;
    }

    const constructYearDropdown = () => {
        const options = [];

        const date = new Date();
        const currentYear = date.getFullYear()

        for(let i = 0; i < 11; i++) {
            options.push(<option value={currentYear + i}>{currentYear + i}</option>)
        }
        return options;
    }

    const getExpirationDate = () => {
        // uses the year and month selected to create the date object, day 0 selects the last day in that month.
        const date = new Date(year, month, 0);
        // sets time to "23:59:59"
        date.setHours(23, 59, 59);

        // formats the data object to a string of "YYYY-MM-DDTHH:MM:SS"
        const formattedDate = `${date.getFullYear()}-${(date.getMonth()+1) < 10 ? "0" + (date.getMonth()+1) : (date.getMonth()+1)}-${date.getDate()}T23:59:59`

        return formattedDate;
    }

    const submitForm = () => {
        const paymentData = {
            courseId: parseInt(data.id, 0),
            cardToken: parseInt(cardNumber, 0),
            cardExpirationDate: getExpirationDate(),
            lastFourDigits: parseInt(securityCode, 0)
        }
        if(validateInput()) {
            onSubmit(paymentData);
        }
    }

  return (
    <div className="Payment-Information-Container">
        <h2>Payment Information</h2>
        <div style={{display:'flex', flexDirection:'column'}}>
            <text>Card number</text>
            <input placeholder='0000 0000 0000 0000' name='cardNumber' type='text' value={cardNumber} onChange={handleInput}/>
        </div>
        <div style={{display:'flex', alignContent:'center', justifyContent:'space-between'}}>
            <div>
                <text>Expiration date</text>
                <div style={{ display:'flex', flexDirection:'row', justifyContent:'space-between', height:'33px', flexGrow:'1' }}>
                    <select name='month' onChange={handleInput}>
                        <option value='' disabled selected>mm</option>
                        {constructMonthDropdown()}
                    </select>
                    <select name='year' onChange={handleInput}>
                        <option value='' disabled selected>yyyy</option>
                        {constructYearDropdown()}
                    </select>
                </div>
            </div>
            <div style={{width:'187px'}}>
                <text>Security code</text>
                <input placeholder='0000' name='securityCode' type='text' value={securityCode} onChange={handleInput}/>
            </div>
        </div>
        <div>Total: {data?.price ?? 'Price not found'} {data?.currency.currency}</div>
        <button disabled={!validInput} onClick={submitForm}>Continue</button>
    </div>
  );
}

export default PaymentInformation;