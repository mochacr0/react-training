import { useParams } from "react-router";
import Submissions from "../../components/submission/Submissions";
import { useGetSubmissionsByClientIdQuery } from "../../redux/features/submission.api.slice";

const MySubmissionsPage = () => {
    const { clientId } = useParams();
    const { data, isLoading } = useGetSubmissionsByClientIdQuery(clientId ?? "");
    return <Submissions submissions={data?.data || []} isLoading={isLoading} enableActions={false} />;
};

export default MySubmissionsPage;
