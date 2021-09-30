import config from './config.json';

import HttpsConnector from './integration/HttpsConnector';
import ApiCommunicator from './integration/ApiCommunicator';
import SnapsoftIntegration from './integration/SnapsoftIntegration';

import SanityCheckSolver from './problem-1/SanityCheckSolver';
import MazeSolver from './problem-2/MazeSolver';
import KingPinnedSolver from './problem-3/KingPinnedSolver';

const problemIds = [
    'sanity-check',
    'maze',
    'king-pinned',
];

const httpsConnector = new HttpsConnector();
const apiCommunicator = new ApiCommunicator(httpsConnector, config.apiToken);

const sanityCheckSolver = new SanityCheckSolver();
const mazeSolver = new MazeSolver();
const kingPinnedSolver = new KingPinnedSolver();

async function solve1stProblem() {
    const snapSoftIntegration = new SnapsoftIntegration(apiCommunicator);
    const solvingResult = await snapSoftIntegration.solveProblem(problemIds[0], undefined, sanityCheckSolver);
    if (solvingResult) {
        console.log('Yay!');
    }
}

async function solve2ndProblem() {
    const snapSoftIntegration = new SnapsoftIntegration(apiCommunicator);
    const solvingResult = await snapSoftIntegration.solveProblem(problemIds[1], undefined, mazeSolver);
    if (solvingResult) {
        console.log('Yay!');
    }
}

async function solve3rdProblem() {
    const snapSoftIntegration = new SnapsoftIntegration(apiCommunicator);
    const solvingResult = await snapSoftIntegration.solveProblem(problemIds[2], undefined, kingPinnedSolver);
    if (solvingResult) {
        console.log('Yay!');
    }
}

solve3rdProblem().then(() => {});