import React from "react";

const About = (props) => {
    return (
        <section className='mb-16'>
            <h2 className='text-2xl font-bold mb-6'>About</h2>
            <div className='text-gray-700 space-y-4'>
                <p>
                    Hello and welcome!
                </p>
                <p>
                    I'm Sai, a 1st year PhD student studying computer systems at UCLA,
                    co-advised by <a href="https://www.samkumar.org/" target="_blank" className="text-blue-600 hover:underline">Sam Kumar</a> with 
                    whom I explore ways to build secure, high performant systems, and <a href="https://remy.wang/" target="_blank" className="text-blue-600 hover:underline">Remy Wang</a> with 
                    whom I work on various database ideas.
                </p>
                <p>
                    I studied Computer Science during my undergrad at Berkeley. I was fortunate to be involved in the <a href="https://sky.cs.berkeley.edu/" target="_blank" className="text-blue-600 hover:underline">SkyLab</a> working 
                    with <a href="https://www.linkedin.com/in/conorpower23/" target="_blank" className="text-blue-600 hover:underline">Conor Power</a> and <a href="https://dsf.berkeley.edu/jmh/" target="_blank" className="text-blue-600 hover:underline">Prof. Joe Hellerstein</a>. 
                    I'm extremely grateful for their advice in every aspect of my academic journey.
                </p>
            </div>
        </section>
    )
}

export default About