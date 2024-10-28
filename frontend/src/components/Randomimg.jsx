import React, { useEffect, useState } from "react";
import axios from 'axios'


const Randomimg = () => {
    const [imgUrl, setImgUrl] = useState('')
    const accessKey = process.env.ACCESS_KEY

    useEffect(() => {

        const fetchImg = async () => {
            try {

                const response = await axios.get('https://api.unsplash.com/photos/random', {
                    params: { query: 'agriclture' },
                    headers: {
                        'Authorization': `Client-ID ${accessKey}`
                    }

                })
                setImgUrl(response.data.urls.regular)
            } catch (error) {
                console.error("Error is coming from fatching image :", error)
            }
        };
        fetchImg()
    }, [accessKey])


    return(
        imgUrl
    )
}

export default Randomimg
