// noinspection JSMethodCanBeStatic

import {SolverFunction, Test} from '../SolverFunction';

interface BarrelTest extends Test {
    input: { barrelEthanolPairs: number[][] };
}

interface Barrel {
    size: number;
    ethanol: number;
    index: number;
    bestSequenceStartingFromHere: Barrel[];
}

export default class BarrelSolver implements SolverFunction {
    longestSequence: Barrel[] = [];
    alreadyCheckedIndexes: number[] = [];

    solve(test: BarrelTest): { barrelSequence: number[] } {
        // Read input
        const pairs = test.input.barrelEthanolPairs;

        // Convert and sort input by dilution, decreasing
        const barrels: Barrel[] = pairs.map((item, index) => ({size: item[0], ethanol: item[1], index, bestSequenceStartingFromHere: []}));
        barrels.sort((a, b) => b.ethanol / b.size - a.ethanol / a.size);

        //this.findNextInSequence(barrels);
        for (let i = barrels.length - 1; i >= 0; i--) {
            const barrel = barrels[i];

            let barrelWithTheBestSequence:Barrel|undefined = undefined;
            for(let j = i + 1; j < barrels.length; j++) {
                const nextBarrel = barrels[j];
                if(nextBarrel.size > barrel.size && nextBarrel.ethanol < barrel.ethanol && (!barrelWithTheBestSequence || nextBarrel.bestSequenceStartingFromHere.length > barrelWithTheBestSequence.bestSequenceStartingFromHere.length)) {
                    barrelWithTheBestSequence = nextBarrel;
                }
            }
            barrel.bestSequenceStartingFromHere = [barrel, ...(barrelWithTheBestSequence ? barrelWithTheBestSequence.bestSequenceStartingFromHere : [])];
        }

        const bestSequenceLength = barrels.reduce((best, barrel) => Math.max(best, barrel.bestSequenceStartingFromHere.length), 0);
        const longestSequence = (barrels.find(barrel => barrel.bestSequenceStartingFromHere.length === bestSequenceLength) || {}).bestSequenceStartingFromHere || [];
        return {barrelSequence: longestSequence.map((item) => item.index + 1)};
    }

    findNextInSequence(barrels: Barrel[], minimumIndex: number = 0, sequence: Barrel[] = [], isTopLevel = true) {
        for (let i = minimumIndex; i < barrels.length; i++) {
            if (!this.alreadyCheckedIndexes.includes(barrels[i].index)) {
                const lastInSequence = sequence.length ? sequence[sequence.length - 1] : undefined;
                if (!lastInSequence || (barrels[i].size > lastInSequence.size && barrels[i].ethanol < lastInSequence.ethanol)) {
                    sequence.push(barrels[i]);
                    this.findNextInSequence(barrels, i + 1, sequence, false);
                    if (isTopLevel) { /* Optimization: Clear barrels of the longest sequence from future checks. */
                        this.alreadyCheckedIndexes.push(...this.longestSequence.map(barrel => barrel.index));
                        console.log(`Discarded ${this.longestSequence.length} barrels at i=${i}. ${barrels.length - this.alreadyCheckedIndexes.length} barrels left.`);
                    }
                    sequence.pop();
                }
            }
        }
        if (sequence.length > this.longestSequence.length) {
            this.longestSequence = JSON.parse(JSON.stringify(sequence));
        }
    }
}
