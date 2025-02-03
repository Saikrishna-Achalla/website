import React from "react";

const About = (props) => {
    return (
        <div data-section id='about' className='mb-16 group'>
            <div className='text-surface-600'>
                <div className='mb-6 text-primary-100'>
                    Hello and welcome!
                </div>
                <div className='mb-6'>
                    I'm Sai, a 1st year PhD student studying computer systems at UCLA,
                    co-advised by <a href="https://www.samkumar.org/" target="_blank" className="text-primary-200 transition-all">Sam Kumar </a>
                    with whom I explore ways to build secure, high performant systems, and <a href="https://remy.wang/" target="_blank" className="text-primary-200 transition-all">Remy Wang </a>  
                    with whom I work on various database ideas.
                </div>
                <div className='mb-6'>
                    I studied Computer Science during my undergrad at Berkeley. I was fortunate to be involved in the
                    <a href="https://sky.cs.berkeley.edu/" target="_blank" className="text-primary-200 transition-all"> SkyLab </a>
                    working with 
                    <a href="https://www.linkedin.com/in/conorpower23/" target="_blank" className="text-primary-200 transition-all"> Conor Power </a>
                    and 
                    <a href="https://dsf.berkeley.edu/jmh/" target="_blank" className="text-primary-200 transition-all"> Prof. Joe Hellerstein</a>. 
                    I'm extremely grateful for their advice in ever aspect of my academic journey.
                </div>
            </div>
        </div>
    )
}

export default About