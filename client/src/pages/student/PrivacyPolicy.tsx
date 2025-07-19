import React, { useEffect } from 'react';
import Footer from '../../components/student/Footer';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    
    return (
        <div className='flex flex-col items-center space-y-7 text-center pt-4'>
            <h1 className='text-3xl font-bold'>Privacy Policy</h1>
            <div className='max-w-3xl space-y-4 text-left text-base text-gray-700'>
                <p>
                    We value your privacy. This Privacy Policy outlines how we collect, use, and protect your information when you use our services.
                </p>

                <h2 className='text-xl font-semibold mt-6'>1. Information We Collect</h2>
                <p>
                    We may collect personal information that you provide to us such as your name, email address, and other contact details. We also collect usage data such as pages visited, interactions, and device/browser information.
                </p>

                <h2 className='text-xl font-semibold mt-6'>2. How We Use Your Information</h2>
                <p>
                    Your information helps us improve our services, communicate with you, provide customer support, and ensure security and compliance.
                </p>

                <h2 className='text-xl font-semibold mt-6'>3. Sharing of Information</h2>
                <p>
                    We do not sell your personal information. We may share information with trusted third-party services to help us operate and improve our services, under strict data protection agreements.
                </p>

                <h2 className='text-xl font-semibold mt-6'>4. Data Security</h2>
                <p>
                    We take reasonable measures to protect your information from unauthorized access, alteration, or destruction.
                </p>

                <h2 className='text-xl font-semibold mt-6'>5. Your Rights</h2>
                <p>
                    You may have the right to access, correct, or delete your personal information. To make such requests, please contact us.
                </p>

                <h2 className='text-xl font-semibold mt-6'>6. Changes to This Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.
                </p>

                <p className='mt-6'>
                    If you have any questions or concerns about our Privacy Policy, feel free to contact us at <a href="mailto:support@neolearn.com" className='text-primaryBlue underline'>support@example.com</a>.
                </p>
            </div>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
