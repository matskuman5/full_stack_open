import { CoursePart } from '../types';

const Content = (props: CoursePart) => {
  switch (props.kind) {
    case 'basic':
      return (
        <div>
          <p>{props.name}</p>
          <p>{props.exerciseCount}</p>
          <p>{props.description}</p>
        </div>
      );
    case 'group':
      return (
        <div>
          <p>{props.name}</p>
          <p>{props.exerciseCount}</p>
          <p>{props.groupProjectCount}</p>
        </div>
      );
    case 'background':
      return (
        <div>
          <p>{props.name}</p>
          <p>{props.exerciseCount}</p>
          <p>{props.description}</p>
          <p>{props.backgroundMaterial}</p>
        </div>
      );
    case 'special':
      return (
        <div>
          <p>{props.name}</p>
          <p>{props.exerciseCount}</p>
          <p>{props.description}</p>
          <p>requirements: {props.requirements.map((r) => r + ', ')}</p>
        </div>
      );
  }
};

export default Content;
