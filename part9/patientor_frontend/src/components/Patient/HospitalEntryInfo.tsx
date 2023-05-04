import { Diagnosis, HospitalEntry } from '../../types';

interface Props {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const HospitalEntryInfo = ({ entry, diagnoses }: Props) => {
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
      <p>
        discharged: {entry.discharge.date}, reason: {entry.discharge.criteria}
      </p>
      <p>diagnosed by {entry.specialist}</p>
    </div>
  );
};

export default HospitalEntryInfo;
