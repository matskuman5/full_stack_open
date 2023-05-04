import { useParams } from 'react-router-dom';
import { Diagnosis, Entry, Patient } from '../../types';
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnoses';
import { useEffect, useState } from 'react';
import HospitalEntryInfo from './HospitalEntryInfo';
import OccupationalHealthcareEntryInfo from './OccupationalHealthcareEntryInfo';
import HealthCheckInfo from './HealthCheckInfo';
import { assertNever } from 'assert-never';

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

  const EntryDetails = (entry: Entry) => {
    switch (entry.type) {
      case 'Hospital':
        return (
          <HospitalEntryInfo
            key={entry.id}
            entry={entry}
            diagnoses={diagnoses}
          ></HospitalEntryInfo>
        );
      case 'OccupationalHealthcare':
        return (
          <OccupationalHealthcareEntryInfo
            key={entry.id}
            entry={entry}
            diagnoses={diagnoses}
          ></OccupationalHealthcareEntryInfo>
        );
      case 'HealthCheck':
        return (
          <HealthCheckInfo
            key={entry.id}
            entry={entry}
            diagnoses={diagnoses}
          ></HealthCheckInfo>
        );
      default:
        return assertNever(entry);
    }
  };

  return (
    <div>
      <h1>
        {patient.name}, {patient.gender}
      </h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h2>entries:</h2>
      {patient.entries.map((e) => EntryDetails(e))}
    </div>
  );
};

export default PatientInfo;
