import React from 'react';
import PublicationItem from './publication-item';

const Publications = ({ data }) => {
    return (
        <div data-section id='publications' className='mb-16 group'>
            <div className='text-surface-600'>
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
                    <p>No publications available.</p>
                )}
            </div>
        </div>
    );
};

export default Publications; 