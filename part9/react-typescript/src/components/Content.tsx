import React from 'react';
import { ContentType } from '../types';
import { assertNever } from '../helpers';

const Content: React.FC<ContentType> = ({ courseParts }) => (
    <div>
        {courseParts.map(course => {
            switch(course.name) {
                case 'Fundamentals':
                    return (
                        <div>
                            <p>{course.name} {course.exerciseCount} {course.description}</p>
                        </div>
                    )
                case 'Using props to pass data':
                    return (
                        <div>
                            <p>{course.name} {course.exerciseCount} {course.groupProjectCount}</p>
                        </div>
                    )
                case 'Deeper type usage':
                    return (
                        <div>
                            <p>{course.name} {course.exerciseCount} {course.description} {course.exerciseSubmissionLink}</p>
                        </div>
                    )
                case 'random':
                    return (
                        <div>
                            <p>{course.name} {course.exerciseCount} {course.randomString}</p>
                        </div>
                    )
                default:
                    return assertNever(course);
            }
        })}
    </div>
)

export default Content;