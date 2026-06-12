import IncidentForm from '@/components/IncidentForm';

export const metadata = {
  title: 'Report Incident — California Burrito',
  description: 'Report a new operational incident at your California Burrito location.',
};

export default function ReportPage() {
  return (
    <div className="form-page">
      <div className="page-header">
        <h1 className="page-title">Report an Incident</h1>
        <p className="page-subtitle">
          Help us keep California Burrito running smoothly — log any operational issue below
        </p>
      </div>

      <IncidentForm />
    </div>
  );
}
