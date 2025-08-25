import React from "react";

const Teaching = ({ data }) => {
    return (
        <section className='mb-16'>
            <h2 className='text-2xl font-bold mb-6'>Teaching & Mentoring</h2>
            <div className='space-y-4 text-gray-700'>
                {data && data.courses ? (
                    <div>
                        {data.courses.map((course, index) => (
                            <div key={index} className='mb-4'>
                                <div className='font-semibold'>{course.role}</div>
                                <div>{course.course} - {course.term}</div>
                                <div className='text-gray-600'>{course.institution}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className='text-gray-500'>No teaching experience listed yet.</p>
                )}
            </div>
        </section>
    );
};

export default Teaching;