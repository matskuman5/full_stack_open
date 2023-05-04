import { useParams } from 'react-router-dom';
import { Diagnosis, Patient } from '../types';
import patientService from '../services/patients';
import diagnosisService from '../services/diagnoses';
import { useEffect, useState } from 'react';

interface Props {
  patients: Patient[];
}

const PatientInfo = ({ patients }: Props) => {
  const { patientId } = useParams();

  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatient = async () => {
      if (patientId === undefined) {
        console.log('fuck');
      } else {
        const patient = await patientService.getPatient(patientId);
        setPatient(patient);
      }
    };

    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };

    void fetchPatient();
    void fetchDiagnoses();
  }, [patientId]);

  if (patient === undefined) {
    return <h2>error: patient {patientId} not found</h2>;
  }

  return (
    <div>
      <h1>
        {patient.name}, {patient.gender}
      </h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h2>entries:</h2>
      {patient.entries.map((e) => (
        <div key={e.id}>
          <p>
            {e.date} | {e.description}
          </p>
          <ul>
            {e.diagnosisCodes?.map((dc) => (
              <li key={dc}>
                {dc} {diagnoses.find((d) => d.code === dc)?.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientInfo;
