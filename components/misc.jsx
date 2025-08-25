import React from "react";

const Misc = ({ data }) => {
    return (
        <section className='mb-16'>
            <h2 className='text-2xl font-bold mb-6'>☕ Misc</h2>
            <div className='space-y-4 text-gray-700'>
                {data && data.items ? (
                    <ul className='list-disc list-inside space-y-2'>
                        {data.items.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                ) : (
                    <div>
                        <p>When not working, I enjoy hiking, photography, and exploring new coffee shops.</p>
                        <p className='mt-4 text-sm text-gray-500'>
                            This website was built with Next.js and Tailwind CSS.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Misc;