export interface HeaderType {
    courseName: string;
}

export interface ContentType {
    courseParts: Array<CoursePart>;
}

// new types
interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartBaseWithDescription extends CoursePartBase {
    description: string;
}
  
interface CoursePartOne extends CoursePartBaseWithDescription {
    name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseWithDescription {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBase {
    name: "random";
    randomString: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;