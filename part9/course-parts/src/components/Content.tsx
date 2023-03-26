import { CoursePartProps } from '../types';
import Part from './Part';

const Content = (props: CoursePartProps) => {
  return (
    <div>
      {props.courseParts.map((cp) => (
        <Part {...cp} key={cp.name}></Part>
      ))}
    </div>
  );
};

export default Content;
