import { Diagnosis, OccupationalHealthcareEntry } from '../../types';

interface Props {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntryInfo = ({ entry, diagnoses }: Props) => {
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
      <p>employer: {entry.employerName}</p>
      <p>
        sick leave: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}
      </p>
    </div>
  );
};

export default OccupationalHealthcareEntryInfo;
