import React from "react";

const Experience = ({ data }) => {
    return (
        <section className='mb-16'>
            <h2 className='text-2xl font-bold mb-6'>Experience</h2>
            <div className='space-y-6'>
                {data && data.positions ? (
                    data.positions.map((position, index) => (
                        <div key={index} className='border-l-2 border-gray-200 pl-4'>
                            <div className='font-semibold text-lg'>{position.title}</div>
                            <div className='text-blue-600'>{position.company}</div>
                            <div className='text-gray-600 text-sm'>{position.dates} • {position.location}</div>
                            {position.description && (
                                <p className='mt-2 text-gray-700'>{position.description}</p>
                            )}
                        </div>
                    ))
                ) : (
                    <p className='text-gray-500'>No experience listed yet.</p>
                )}
            </div>
        </section>
    );
};

export default Experience;