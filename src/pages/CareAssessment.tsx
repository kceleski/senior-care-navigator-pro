
import { PageHeader } from "@/components/PageHeader";
import { CareAssessmentForm } from "@/components/CareAssessmentForm";

export default function CareAssessment() {
  return (
    <div>
      <PageHeader
        title="Care Assessment"
        description="Complete this assessment to find care facilities that match your needs"
      />
      
      <div className="mt-6">
        <CareAssessmentForm />
      </div>
    </div>
  );
}
