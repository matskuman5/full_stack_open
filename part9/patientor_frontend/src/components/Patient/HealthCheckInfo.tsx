import { Diagnosis, HealthCheckEntry } from '../../types';

interface Props {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

const HealthCheckInfo = ({ entry, diagnoses }: Props) => {
  return (
    <div key={entry.id}>
      <p>
        {entry.date} | {entry.description}
      </p>
      <ul>
        {entry.diagnosisCodes?.map((dc) => (
          <li key={dc}>
            {dc} {diagnoses.find((d) => d.code === dc)?.name}
          </li>
        ))}
      </ul>
      <p>rating: {entry.healthCheckRating}</p>
    </div>
  );
};

export default HealthCheckInfo;
