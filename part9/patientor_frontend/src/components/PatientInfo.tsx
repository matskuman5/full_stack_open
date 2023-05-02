import { useParams } from 'react-router-dom';
import { Patient } from '../types';
import patientService from '../services/patients';
import { useEffect, useState } from 'react';

interface Props {
  patients: Patient[];
}

const PatientInfo = ({ patients }: Props) => {
  const { patientId } = useParams();

  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (patientId === undefined) {
        console.log('fuck');
      } else {
        const patient = await patientService.getPatient(patientId);
        setPatient(patient);
      }
    };
    void fetchPatient();
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
    </div>
  );
};

export default PatientInfo;
