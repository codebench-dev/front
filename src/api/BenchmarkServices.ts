import axios, {AxiosResponse} from 'axios';
// import useToken from "../utils/useToken";

export class BenchmarkServices {

    static async createBenchmark(title: string, subject: string, difficulty: string): Promise<benchmarkModel> {
        const res: AxiosResponse<benchmarkModel> = await axios.post(
            'http://localhost:3000/benchmarks',
            {
                title,
                subject,
                difficulty,
            }, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                    // 'Authorization': 'Bearer ' + useToken() //
                }
            }
        );
        return res.data;
    }

    static async getAllBenchmarks(): Promise<benchmarkModel[]> {
        return axios.get('http://localhost:3000/benchmarks').then(response => {
            return response.data;
        });
    }

}