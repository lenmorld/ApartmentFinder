import 'es6-promise';
import 'isomorphic-fetch';

export default function appMiddleware() {
    return next => action => {
        const { fetchAPI, types } = action;

        if (!fetchAPI) {
            return next(action);
        }

        const [success, failure] = types;
        const fetchSetting = {
            headers: {
                'Content-Type': 'application/json',
            },
            method: fetchAPI.method,
            body: JSON.stringify(fetchAPI.body),
        };

        return fetch(fetchAPI.path, fetchSetting)
            .then(response => response.json())
            .then((json) => {
                if (json.result !== 'ok') {
                    next(failure(json.data));
                } else {
                    next(success(json.data));
                }
                console.log(json);
            })
            .catch((err) => {
                next(failure(err));
            });
    };
}