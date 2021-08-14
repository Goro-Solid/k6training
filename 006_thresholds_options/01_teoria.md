# Thresholds,Options

W tej części poznamy kolejne elementy konfiguracyjne naszego testu: Opcje, Progi

[Thresholds (Progi)](https://k6.io/docs/using-k6/thresholds/) to mechanizmy sprawdzeń, które klasyfikują nasz test jako: PASS albo FAIL

>Thresholds are a pass/fail criteria used to specify the performance expectations of the system under test.
Thresholds can act as quality gates.

Różnica między checkami i thresholdami będzie widoczna również w exit codzie testu.

```powershell
     k6 run --iterations=1 .\02_thresholds.js;echo $?
```

[Options (Opcje)](https://k6.io/docs/using-k6/options/) pozwalają na zaawansowaną konfigurację zachowania naszego testu z poziomu kodu (nie z CLI).

```javascript
export let options = { //options allow to configure your test rum
    opcja1: wartosc1,
    opcja2: wartosc2,
    ...
};
```

Popularniejsze opcje:
```javascript
export let options = {
    vus: 10,
    duration: '1m',
    iterations: 10,
    stages: [{ duration: '3m', target: 10 },{ duration: '5m', target: 10 }], //stage służą do sterowania obciążeniem
    thresholds: { //quality gate'y
        http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
    },
    scenarios: { //pozwala definiować wiele różnych scenariuszy w ramach jednego testu
        example_scenario: {
            vus: 2,
            iterations: 2,
        },
    },
    discardResponseBodies: true,
    batch: 15, //maksymalna liczba równoległych żądań w batchu
    httpDebug: 'full'
}
```