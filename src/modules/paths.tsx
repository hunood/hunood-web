import { openedAreaPaths } from "./openedArea";
import { onboardingPaths } from "./onboarding";
import { dashboardPaths } from "./dashboard";
import { userPaths } from "./users";

const routerPaths: string[] = ['/']
.concat(openedAreaPaths)
.concat(onboardingPaths)
.concat(dashboardPaths)
.concat(userPaths);

export { routerPaths };