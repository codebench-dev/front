import React from "react";
import {BenchmarkServices} from "../../api/BenchmarkServices";
import {Link} from "react-router-dom";

export class CreateBenchmark extends React.Component<{}, { state: String, message: String }> {
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            state: '',
            message: '',
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event: any) {
        event.preventDefault();
        const title = event.target.title.value;
        const subject = event.target.subject.value;
        const difficulty = event.target.difficulty.value;

        if (title === "" || subject === "") {
            // console.log('At least one field is blank')
            this.setState({message: 'At least one field is blank'});
            this.setState({state: 'Error'});
            return;
        }

        BenchmarkServices.createBenchmark(
            title,
            subject,
            difficulty,
        ).then(r => {
            this.setState({message: 'Your benchmark'+ r.subject +' have been saved'});
            this.setState({state: 'Success'});
        })

    }

    render() {
        return <>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">Create benchmark</h1>
                </div>
            </header>
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <form className="w-full max-w-lg" onSubmit={this.onSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-password">
                                Title
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="title" type="text" placeholder="Your benchmark title"/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-password">
                                Subject
                            </label>
                            <textarea
                                className="xl:resize-y appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="subject" placeholder="Your benchmark subject"/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-password">
                                Difficulty
                            </label>
                            <select
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="difficulty">
                                <option>Easy</option>
                                <option>Medium</option>
                                <option>Hard</option>
                            </select>
                        </div>
                    </div>
                    <div className="text-center bg-grey-light">
                        <input type="submit" value="Create"
                               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"/>
                    </div>
                </form>
                <div className="p-2 items-center">
                    {(() => {
                        if (this.state.state !== '') {
                            if (this.state.state === 'Error') {
                                return <div className="inline-flex items-center bg-white leading-none text-red-600 rounded-full p-2 shadow text-teal text-sm">
                                    <span className="inline-flex bg-red-600 text-white rounded-full h-6 px-3 justify-center items-center">{this.state.state}</span>
                                    <span className="inline-flex px-2">{this.state.message}</span>
                                </div>
                            } else if (this.state.state === 'Success') {
                                return <div className="inline-flex items-center bg-white leading-none text-green-600 rounded-full p-2 shadow text-teal text-sm">
                                    <span className="inline-flex bg-green-600 text-white rounded-full h-6 px-3 justify-center items-center">{this.state.state}</span>
                                    <span className="inline-flex px-2">{this.state.message}</span>
                                </div>
                            }
                        }
                    })()}
                </div>
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
                    <Link to="/benchmarks">Back to benchmarks</Link>
                </div>
            </div>
        </>
    }
}