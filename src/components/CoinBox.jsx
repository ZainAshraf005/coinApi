import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CoinBox = (props) => {

    const [exchangerate, setExchangerate] = useState(null);
    const [error, setError] = useState(null)

    const code = props.e.code
    console.log(code)
   
    useEffect(() => {
        
        const fetchData = async () => {
            const apiKey = "0E4F59F6-2139-402E-80D1-FD83073AD55D";
            const url = `https://rest.coinapi.io/v1/exchangerate/BTC/USD`
            try {
                const response = await axios.get(url, {
                    headers: {
                        'X-CoinAPI-Key': apiKey
                    }
                });
                let decimal = response.data.rate.toString().split(".")[0]
                let float = response.data.rate.toString().split(".")[1].slice(0, 3)
                let final = decimal + "." + float
                setExchangerate(final)


            } catch (error) {
                setError(error)
            }
        }

        fetchData()


    }, [])
    return (
        <>
            
        </>
    )
}

export default CoinBox
