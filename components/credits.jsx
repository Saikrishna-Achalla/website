import React from "react";

const Credits = (props) => {
        return (
        <div data-section id='credits' className='group mt-28'>
            <div className='text-surface-600'>
                <div className='mb-4'>
                    Built from a <a href="https://github.com/karlgrossmann/two-column-portfolio" target="_blank" rel="noopener noreferrer" className="text-primary-200">template </a> 
                    by <a href="https://github.com/karlgrossmann" target="_blank" rel="noopener noreferrer" className="text-primary-200">Karl Grossmann</a><br></br> 
                </div>
                {/* <div className='flex flex-row justify-between'>
                    <span>{props.data.name} | 2025</span>
                </div> */}
            </div>
        </div>
    )
}

export default Credits