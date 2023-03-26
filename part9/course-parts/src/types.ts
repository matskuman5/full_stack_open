interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  description: string;
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends CoursePartBase {
  description: string;
  backgroundMaterial: string;
  kind: 'background';
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;

interface CoursePartProps {
  courseParts: CoursePart[];
}

export type {
  CoursePartBase,
  CoursePartBasic,
  CoursePartGroup,
  CoursePartBackground,
  CoursePart,
  CoursePartProps,
};
