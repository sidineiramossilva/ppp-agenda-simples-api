import http from 'k6/http';
import { sleep, check } from 'k6';
import { pegarBaseURL } from '../utils/variaveis.js';
import { obterToken } from './helpers/autenticacaoPrestador.js';

export const options = {
    stages: [
        { duration: '5s', target: 10 },
        { duration: '20s', target: 10 },
        { duration: '5s', target: 0 }
    ],
    thresholds: {
        http_req_duration: ['p(90)<3000', 'max<5000'],
        http_req_failed: ['rate<0.01']
    }
};

export default function () {
    const token = obterToken();
    const url = pegarBaseURL() + '/atendentes';

    const payload = JSON.stringify({
        nome: `João Maria ${Math.random()}`,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    };

    const res = http.post(url, payload, params);

    check(res, {
        'Validar que o Status é 201': (r) => r.status === 201,
    })

    sleep(1);
}