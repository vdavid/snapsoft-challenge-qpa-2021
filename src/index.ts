import ApiCommunicator from './ApiCommunicator';
import HttpsConnector from './HttpsConnector';
import SnapsoftIntegration from './SnapsoftIntegration';
import SanityCheckSolver from './SanityCheckSolver';
import config from '../config.json';

const sanityCheckProblemId = 'sanity-check';
const sanityCheckSolverFileName = 'SanityCheckSolver.mjs';

const httpsConnector = new HttpsConnector();
const apiCommunicator = new ApiCommunicator(httpsConnector, config.apiToken);
const sanityCheckSolver = new SanityCheckSolver();
const commonFileNames = [
    'HttpsConnector.mjs',
    'ApiCommunicator.mjs',
    'SnapsoftIntegration.mjs',
]

async function solveFirstProblem() {
    const snapSoftIntegration = new SnapsoftIntegration(apiCommunicator);
    const solvingResult = await snapSoftIntegration.solveProblem(sanityCheckProblemId, 1, sanityCheckSolver,
        [...commonFileNames, sanityCheckSolverFileName]);
    if (solvingResult) {
        console.log('Yay!');
    }
}

solveFirstProblem().then(() => {});