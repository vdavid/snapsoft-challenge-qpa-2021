import ApiCommunicator from "./ApiCommunicator";
import HttpsConnector from './HttpsConnector';
import SnapSoftIntegration from "./SnapSoftIntegration";
import SanityCheckSolver from "./SanityCheckSolver";

const sanityCheckProblemId = 'sanity-check';
const sanityCheckSolverFileName = 'SanityCheckSolver.js';

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