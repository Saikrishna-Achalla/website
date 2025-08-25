import React from "react";

const Service = ({ data }) => {
    return (
        <section className='mb-16'>
            <h2 className='text-2xl font-bold mb-6'>Professional Service</h2>
            <div className='space-y-4 text-gray-700'>
                {data && data.service ? (
                    <div>
                        {data.service.map((item, index) => (
                            <div key={index} className='mb-3'>
                                <span className='font-semibold'>{item.role}</span>
                                {item.venue && <span> - {item.venue}</span>}
                                {item.year && <span className='text-gray-600'> ({item.year})</span>}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className='text-gray-500'>No service activities listed yet.</p>
                )}
            </div>
        </section>
    );
};

export default Service;