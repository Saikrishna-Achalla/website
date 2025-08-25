import React from "react";
import Image from 'next/image';

const ProfileHeader = (props) => {
    return (
        <div className='flex flex-col items-center text-center mb-12'>
            <Image
                className="mb-4"
                src="/images/doe_headshot.jpg"
                alt="Profile photo"
                width={150}
                height={150}
                style={{
                    objectFit: "cover",
                    borderRadius: "50%",
                }}
            />
            <h1 className='text-4xl font-bold mb-2'>{props.data.name}</h1>
            <p className='text-lg text-gray-600 mb-3'>{props.data.headline}</p>
            
            <div className='flex flex-wrap gap-3 justify-center text-sm'>
                <a href={`mailto:${props.data.socials.email}`} className='text-blue-600 hover:underline'>
                    Email
                </a>
                <span className='text-gray-400'>•</span>
                <a href={props.data.socials.github} target="_blank" rel="noopener noreferrer" className='text-blue-600 hover:underline'>
                    GitHub
                </a>
                <span className='text-gray-400'>•</span>
                <a href={props.data.socials.linkedin} target="_blank" rel="noopener noreferrer" className='text-blue-600 hover:underline'>
                    LinkedIn
                </a>
                <span className='text-gray-400'>•</span>
                <a href={props.data.socials.twitter} target="_blank" rel="noopener noreferrer" className='text-blue-600 hover:underline'>
                    Twitter
                </a>
                {props.data.socials.scholar && (
                    <>
                        <span className='text-gray-400'>•</span>
                        <a href={props.data.socials.scholar} target="_blank" rel="noopener noreferrer" className='text-blue-600 hover:underline'>
                            Google Scholar
                        </a>
                    </>
                )}
            </div>
        </div>
    )
}

export default ProfileHeader;