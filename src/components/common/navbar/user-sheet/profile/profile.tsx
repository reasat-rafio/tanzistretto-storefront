import useUserStore from "@/stores/user-store";
import AuthView from "./auth-view/auth-view";
import ProfileView from "./profile-view/profile-view";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = ({}) => {
  const user = useUserStore((state) => state.user);

  return (
    <div className="space-y-2">{!!user ? <ProfileView /> : <AuthView />}</div>
  );
};

export default Profile;
