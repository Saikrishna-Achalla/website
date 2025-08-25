import React from "react";

const NewsSection = ({ data = [] }) => {
    return (
        <section className='mb-16'>
            <h2 className='text-2xl font-bold mb-6'>News and Olds</h2>
            <ul className='space-y-3 text-gray-700'>
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <li key={index} className='flex'>
                            <span className='text-gray-500 mr-4 min-w-[100px]'>{item.date}</span>
                            <span dangerouslySetInnerHTML={{ __html: item.content }} />
                        </li>
                    ))
                ) : (
                    <li className='text-gray-500'>No news items yet.</li>
                )}
            </ul>
        </section>
    );
};

export default NewsSection;