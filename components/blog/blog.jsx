import React from 'react';

const Blog = ({ data }) => {
    return (
        <div data-section id='blog' className='mb-16 group'>
            <div className='text-surface-600'>
                {data && data.map((post, index) => (
                    <div key={index} className="mb-8">
                        <h2 className="text-xl font-medium mb-2">{post.title}</h2>
                        <p className="text-sm mb-2">{post.date}</p>
                        <p>{post.description}</p>
                    </div>
                ))}
                {(!data || data.length === 0) && (
                    <p>No blog posts yet. Check back soon!</p>
                )}
            </div>
        </div>
    );
};

export default Blog; 