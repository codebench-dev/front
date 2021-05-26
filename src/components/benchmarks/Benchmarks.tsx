import React from "react";
import { createBrowserHistory as history} from 'history';
import {BenchmarkServices} from "../../api/BenchmarkServices";

// @ts-ignore
function BenchmarkRow({benchmark}) {
    let difficultyEasyColor   = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
    let difficultyMediumColor = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800"
    let difficultyHardColor   = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
    return <tr key={benchmark.id}>
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
                {/*<div className="flex-shrink-0 h-10 w-10">*/}
                {/*    /!*<img className="h-10 w-10 rounded-full"*!/*/}
                {/*    /!*     src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"*!/*/}
                {/*    /!*     alt=""/>*!/*/}
                {/*</div>*/}
                <div className="ml-4">
                    <div key={benchmark.title} className="text-sm font-medium text-gray-900">
                        {benchmark.title}
                    </div>
                    {/*<div className="text-sm text-gray-500">*/}
                    {/*    jane.cooper@example.com*/}
                    {/*</div>*/}
                </div>
            </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <div key={benchmark.subject} className="text-sm text-gray-900">{benchmark.subject}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
                <span key={benchmark.difficulty}
                      className={benchmark.difficulty === 'Hard' ? difficultyHardColor : benchmark.difficulty === 'Medium' ? difficultyMediumColor : difficultyEasyColor}>
                    {benchmark.difficulty}
                </span>
        </td>
        <td key={benchmark.creator.name} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {benchmark.creator.name}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            {/*<a href="#" className="text-indigo-600 hover:text-indigo-900">View</a>*/}
            <button className="text-indigo-600 hover:text-indigo-900"  disabled>View</button>
            {/*<a className="text-indigo-600 hover:text-indigo-900">View</a>*/}
        </td>
    </tr>
}


export class Benchmarks extends React.Component<{}, { benchmarksJson: benchmarkModel[] }> {

    constructor(props: any) {
        super(props);
        this.state = {
            benchmarksJson: []
        };
    }

    onLoadData() {
        BenchmarkServices.getAllBenchmarks().then(response => {
            this.setState({benchmarksJson: response})
        });
    }

    componentDidMount() {
        this.onLoadData();
    }

    navigateToBenchCreation() {
        history().push('/benchmarks/create')
    }

    render() {
        return <>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between" >
                    <h1 className="text-3xl font-bold text-gray-900">Benchmarks</h1>
                    {/*<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">*/}

                    <button onClick={() => this.navigateToBenchCreation()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Create
                    </button>
                </div>
            </header>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Title
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Subject
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Difficulty
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Creator
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">View</span>
                                        </th>
                                    </tr>
                                    </thead>

                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {this.state.benchmarksJson.map((benchmark) => <BenchmarkRow
                                        key={benchmark.id.toString()} benchmark={benchmark}/>)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }

}