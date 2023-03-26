interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface CoursePartProps {
  courseParts: CoursePart[];
}

export type { CoursePart, CoursePartProps };
