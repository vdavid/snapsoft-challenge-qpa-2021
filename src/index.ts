import ApiCommunicator from './ApiCommunicator';
import HttpsConnector from './HttpsConnector';
import SnapsoftIntegration from './SnapsoftIntegration';
import SanityCheckSolver from './SanityCheckSolver';
import config from '../config.json';

const problemIds = [
    'sanity-check'
];

const httpsConnector = new HttpsConnector();
const apiCommunicator = new ApiCommunicator(httpsConnector, config.apiToken);
const sanityCheckSolver = new SanityCheckSolver();

async function solveFirstProblem() {
    const snapSoftIntegration = new SnapsoftIntegration(apiCommunicator);
    const solvingResult = await snapSoftIntegration.solveProblem(problemIds[0], undefined, sanityCheckSolver);
    if (solvingResult) {
        console.log('Yay!');
    }
}

solveFirstProblem().then(() => {});