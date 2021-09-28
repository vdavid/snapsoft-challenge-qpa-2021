"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SanityCheckSolver_1 = __importDefault(require("./SanityCheckSolver"));
const sanityCheckSolver = new SanityCheckSolver_1.default();
const result = sanityCheckSolver.solve({
    testId: 'test',
    deadline: new Date,
    input: {
        'meta': {
            'set_length': 4,
        },
        'set': [
            1,
            233,
            100,
            64,
        ],
    },
});
if (result.insane_numbers.length === 1 && result.insane_numbers[0] === 233) {
    console.log('Yaay!');
}
else {
    console.log('Nay!');
    console.log(result);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2FuaXR5Q2hlY2tTb2x2ZXIudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9TYW5pdHlDaGVja1NvbHZlci50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQW9EO0FBRXBELE1BQU0saUJBQWlCLEdBQUcsSUFBSSwyQkFBaUIsRUFBRSxDQUFDO0FBRWxELE1BQU0sTUFBTSxHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBQztJQUNuQyxNQUFNLEVBQUUsTUFBTTtJQUNkLFFBQVEsRUFBRSxJQUFJLElBQUk7SUFDbEIsS0FBSyxFQUFFO1FBQ0gsTUFBTSxFQUFFO1lBQ0osWUFBWSxFQUFFLENBQUM7U0FDbEI7UUFDRCxLQUFLLEVBQUU7WUFDSCxDQUFDO1lBQ0QsR0FBRztZQUNILEdBQUc7WUFDSCxFQUFFO1NBQ0w7S0FDSjtDQUNKLENBQUMsQ0FBQztBQUVILElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO0lBQ3hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDeEI7S0FBTTtJQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUN2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTYW5pdHlDaGVja1NvbHZlciBmcm9tICcuL1Nhbml0eUNoZWNrU29sdmVyJztcclxuXHJcbmNvbnN0IHNhbml0eUNoZWNrU29sdmVyID0gbmV3IFNhbml0eUNoZWNrU29sdmVyKCk7XHJcblxyXG5jb25zdCByZXN1bHQgPSBzYW5pdHlDaGVja1NvbHZlci5zb2x2ZSh7XHJcbiAgICB0ZXN0SWQ6ICd0ZXN0JyxcclxuICAgIGRlYWRsaW5lOiBuZXcgRGF0ZSxcclxuICAgIGlucHV0OiB7XHJcbiAgICAgICAgJ21ldGEnOiB7XHJcbiAgICAgICAgICAgICdzZXRfbGVuZ3RoJzogNCxcclxuICAgICAgICB9LFxyXG4gICAgICAgICdzZXQnOiBbXHJcbiAgICAgICAgICAgIDEsXHJcbiAgICAgICAgICAgIDIzMyxcclxuICAgICAgICAgICAgMTAwLFxyXG4gICAgICAgICAgICA2NCxcclxuICAgICAgICBdLFxyXG4gICAgfSxcclxufSk7XHJcblxyXG5pZiAocmVzdWx0Lmluc2FuZV9udW1iZXJzLmxlbmd0aCA9PT0gMSAmJiByZXN1bHQuaW5zYW5lX251bWJlcnNbMF0gPT09IDIzMykge1xyXG4gICAgY29uc29sZS5sb2coJ1lhYXkhJyk7XHJcbn0gZWxzZSB7XHJcbiAgICBjb25zb2xlLmxvZygnTmF5IScpO1xyXG4gICAgY29uc29sZS5sb2cocmVzdWx0KTtcclxufSJdfQ==