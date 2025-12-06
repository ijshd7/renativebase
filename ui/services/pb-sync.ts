import { useUserStore } from "@/stores/userStore";
import pb from "./pb";

pb.authStore.onChange(() => {
    useUserStore.setState({
        isAuthenticated: pb.authStore.isValid,
    });
});