import { openedAreaPaths } from "./openedArea";
import { onboardingPaths } from "./onboarding";
import { dashboardPaths } from "./dashboard";
import { userPaths } from "./users";
import { businessPaths } from "./business";
import { stockPaths } from "./stock";
import { supplierPaths } from "./supplier";

const routerPaths: string[] = ['/']
.concat(openedAreaPaths)
.concat(onboardingPaths)
.concat(dashboardPaths)
.concat(userPaths)
.concat(businessPaths)
.concat(stockPaths)
.concat(supplierPaths);

export { routerPaths };