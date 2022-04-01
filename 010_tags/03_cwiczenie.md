# Tagi i thresholdy

[Tagi mogą być użyte na thresholdach](https://k6.io/docs/using-k6/thresholds/#thresholds-on-tags).

Rozszerz test 02_tags.js:
- zdefiniuj threshold na dowolną metrykę dla co drugiego żądania drugiego scenariusza np.
  `http_req_duration': ['p(95)<80']` . Do selekcji części żądań w thresholdzie wykorzystaj tagi.
  