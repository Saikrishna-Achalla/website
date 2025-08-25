import React from 'react';
import PublicationItem from './publication-item';

const Publications = ({ data }) => {
    return (
        <section className='mb-16'>
            <h2 className='text-2xl font-bold mb-6'>Research</h2>
            <div className='space-y-6'>
                {data && data.map((publication, index) => (
                    <PublicationItem
                        key={index}
                        title={publication.title}
                        before_authors={publication.before_authors}
                        venue={publication.venue}
                        year={publication.year}
                        description={publication.description}
                        href={publication.href}
                        github={publication.github}
                    />
                ))}
                {(!data || data.length === 0) && (
                    <p className='text-gray-500'>No publications yet.</p>
                )}
            </div>
        </section>
    );
};

export default Publications; 