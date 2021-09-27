import ApiCommunicator from "./ApiCommunicator.mjs";
import HttpsConnector from './HttpsConnector.mjs';
import SnapSoftIntegration from "./SnapSoftIntegration.mjs";
import SanityCheckSolver from "./SanityCheckSolver.mjs";

const sanityCheckProblemId = 'sanity-check';
const sanityCheckSolverFileName = 'SanityCheckSolver.mjs';

const apiToken = 'fmIM2RgAW7ueHMHB';
const httpsConnector = new HttpsConnector();
const apiCommunicator = new ApiCommunicator(httpsConnector, apiToken);
const sanityCheckSolver = new SanityCheckSolver();
const commonFileNames = [
    'HttpsConnector.mjs',
    'ApiCommunicator.mjs',
    'SnapsoftIntegration.mjs',
]

const snapSoftIntegration = new SnapSoftIntegration(apiCommunicator);
const solvingResult = await snapSoftIntegration.solveProblem(sanityCheckProblemId, 0, sanityCheckSolver,
    [...commonFileNames, sanityCheckSolverFileName]);
if (solvingResult) {
    console.log('Yaaay!');
}