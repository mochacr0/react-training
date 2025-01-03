import { useGetSubmissionsQuery } from "../../redux/features/submission.api.slice";
import Submissions from "../../components/submission/Submissions";

const UserSubmissionsPage = () => {
    const { data, isLoading } = useGetSubmissionsQuery();
    return <Submissions submissions={data?.data || []} isLoading={isLoading} enableActions={true} />;
};

export default UserSubmissionsPage;
