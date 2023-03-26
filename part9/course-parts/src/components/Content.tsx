import { CoursePartProps } from '../types';

const Content = (props: CoursePartProps) => {
  return (
    <div>
      {props.courseParts.map((cp) => (
        <div key={cp.name}>
          <p>{cp.name}</p>
          <p>{cp.exerciseCount}</p>
        </div>
      ))}
    </div>
  );
};

export default Content;
