import config from './config.json';

import HttpsConnector from './integration/HttpsConnector';
import ApiCommunicator from './integration/ApiCommunicator';
import SnapsoftIntegration from './integration/SnapsoftIntegration';

import SanityCheckSolver from './2021-problem-1/SanityCheckSolver';
import MazeSolver from './2021-problem-2/MazeSolver';
import KingPinnedSolver from './2021-problem-3/KingPinnedSolver';
import BarrelSolver from './2021-problem-4/BarrelSolver';

const problemIds = [
    'sanity-check',
    'maze',
    'king-pinned',
    'barrel',
];

const httpsConnector = new HttpsConnector();
const apiCommunicator = new ApiCommunicator(httpsConnector, config.apiToken);

const sanityCheckSolver = new SanityCheckSolver();
const mazeSolver = new MazeSolver();
const kingPinnedSolver = new KingPinnedSolver();
const barrelSolver = new BarrelSolver();

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

async function solve4rdProblem() {
    const snapSoftIntegration = new SnapsoftIntegration(apiCommunicator);
    const solvingResult = await snapSoftIntegration.solveProblem(problemIds[3], undefined, barrelSolver);
    if (solvingResult) {
        console.log('Yay!');
    }
}

solve4rdProblem().then(() => {});
