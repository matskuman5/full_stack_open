interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescribed extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescribed {
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends CoursePartDescribed {
  backgroundMaterial: string;
  kind: 'background';
}

interface CoursePartRequirements extends CoursePartDescribed {
  requirements: string[];
  kind: 'special';
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartRequirements;

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
