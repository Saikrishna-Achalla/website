import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFileLines} from '@fortawesome/free-solid-svg-icons'
import {faGithub} from '@fortawesome/free-brands-svg-icons'


function PublicationItem(props) {
    return (
        <div className="group flex flex-row mb-12 transition-all">
            <div>
                <div className='font-medium text-base'>{props.title}</div>
                <div className="text-surface-600"><small>{props.before_authors}<b className="text-primary-200">{props.author}</b>{props.after_authors}</small></div>
                <div className='mb-2'>{props.venue} | {props.year}</div>
                <div className='text-surface-600 mb-4'>{props.description}</div>
                <div className='flex flex-row items-center'>
                    <div className='flex flex-row'>
                        <a href={props.href} target="_blank" rel="noopener noreferrer" className="hover:text-primary-200">
                            <FontAwesomeIcon icon={faFileLines} width={28} height={28} className='object-contain object-top mr-3'/>
                        </a>
                        {props.github && (
                            <a href={props.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary-200">
                                <FontAwesomeIcon icon={faGithub} width={28} height={28}/>
                            </a>
                        )}
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default PublicationItem