import ApiCommunicator from './integration/ApiCommunicator';
import HttpsConnector from './integration/HttpsConnector';
import SnapsoftIntegration from './integration/SnapsoftIntegration';
import SanityCheckSolver from './problem-1/SanityCheckSolver';
import MazeSolver from './problem-2/MazeSolver';
import config from './config.json';

const problemIds = [
    'sanity-check',
    'maze'
];

const httpsConnector = new HttpsConnector();
const apiCommunicator = new ApiCommunicator(httpsConnector, config.apiToken);

const sanityCheckSolver = new SanityCheckSolver();
const mazeSolver = new MazeSolver();

async function solveFirstProblem() {
    const snapSoftIntegration = new SnapsoftIntegration(apiCommunicator);
    const solvingResult = await snapSoftIntegration.solveProblem(problemIds[0], undefined, sanityCheckSolver);
    if (solvingResult) {
        console.log('Yay!');
    }
}

async function solveSecondProblem() {
    const snapSoftIntegration = new SnapsoftIntegration(apiCommunicator);
    const solvingResult = await snapSoftIntegration.solveProblem(problemIds[1], undefined, mazeSolver);
    if (solvingResult) {
        console.log('Yay!');
    }
}

solveSecondProblem().then(() => {});