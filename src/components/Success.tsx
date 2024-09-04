import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

const Success = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Parse the query string parameters from the URL
        const queryParams = queryString.parse(location.search);

        // Map the query parameters to the expected format
        const paymentData = {
            cus_name: queryParams.cus_name || '',
            cus_email: queryParams.cus_email || '',
            cus_phone: queryParams.cus_phone || '',
            amount: queryParams.amount || '',
            currency: queryParams.currency || '',
            pay_time: queryParams.pay_time || ''
        };

        // Redirect to the UserHome page with payment data
        navigate('/user-home', { state: { paymentData } });
    }, [location.search, navigate]);

    return <div>Redirecting...</div>;
};

export default Success;
