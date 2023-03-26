interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
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
